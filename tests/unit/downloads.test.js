import assert from 'node:assert/strict'
import { test } from 'node:test'
import { downloadFile } from '../../src/lib/fileHandlingFunctions.js'

function mockDownload(t, failure) {
  const state = { revoked: [], appended: false, removed: false }
  const link = {
    click() {
      if (failure === 'click') throw new Error('Synthetic click failure')
    },
    remove() {
      state.removed = true
    }
  }
  const originalDocument = Object.getOwnPropertyDescriptor(globalThis, 'document')
  t.after(() => {
    if (originalDocument) Object.defineProperty(globalThis, 'document', originalDocument)
    else delete globalThis.document
  })
  Object.defineProperty(globalThis, 'document', {
    value: {
      createElement() {
        if (failure === 'create') throw new Error('Synthetic element failure')
        return link
      },
      body: {
        appendChild() {
          state.appended = true
        }
      }
    },
    configurable: true
  })
  t.mock.method(URL, 'createObjectURL', (blob) => {
    state.blob = blob
    return 'blob:test-download'
  })
  t.mock.method(URL, 'revokeObjectURL', (url) => state.revoked.push(url))
  t.mock.method(globalThis, 'setTimeout', (callback) => {
    state.cleanup = callback
  })
  return { state, link }
}

test('preserves PEM bytes, filename, MIME and releases the URL after dispatch', async (t) => {
  const { state, link } = mockDownload(t)
  const content = '-----BEGIN PRIVATE KEY-----\r\nZmFrZQ==\r\n-----END PRIVATE KEY-----\r\n'
  downloadFile(content, 'example.test.private', 'key')
  assert.equal(state.blob.type, 'application/x-pem-file')
  assert.deepEqual(
    new Uint8Array(await state.blob.arrayBuffer()),
    new TextEncoder().encode(content)
  )
  assert.equal(link.download, 'example.test.private.key')
  assert.equal(state.appended, true)
  assert.equal(state.removed, true)
  assert.deepEqual(state.revoked, [])
  state.cleanup()
  assert.deepEqual(state.revoked, ['blob:test-download'])
})

test('passes an existing ZIP Blob through unchanged', async (t) => {
  const { state } = mockDownload(t)
  const blob = new Blob([new Uint8Array([0x50, 0x4b, 0, 255, 128])], { type: 'application/zip' })
  downloadFile(blob, 'example_test_ssl_chain', 'zip')
  assert.equal(state.blob, blob)
  assert.equal(state.blob.type, 'application/zip')
  assert.deepEqual(
    new Uint8Array(await state.blob.arrayBuffer()),
    new Uint8Array([0x50, 0x4b, 0, 255, 128])
  )
  state.cleanup()
})

for (const failure of ['create', 'click']) {
  test(`releases the URL when ${failure} fails and propagates the error`, (t) => {
    const { state } = mockDownload(t, failure)
    assert.throws(() => downloadFile('fake', 'test', 'crt'), /Synthetic/)
    assert.deepEqual(state.revoked, ['blob:test-download'])
    assert.equal(state.cleanup, undefined)
    if (failure === 'click') assert.equal(state.removed, true)
  })
}
