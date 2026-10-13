import assert from 'node:assert/strict'
import { test } from 'node:test'
import { isValidCertItemText, isAriaInvalidCertContent } from '../../src/lib/customValidators.js'

function pem(label, newline = '\n') {
  return [`-----BEGIN ${label}-----`, 'ZmFrZS10ZXN0', `-----END ${label}-----`].join(newline)
}

for (const [type, labels] of Object.entries({
  cert: ['CERTIFICATE'],
  csr: ['CERTIFICATE REQUEST', 'NEW CERTIFICATE REQUEST'],
  key: ['RSA PRIVATE KEY', 'PRIVATE KEY', 'ENCRYPTED PRIVATE KEY', 'EC PRIVATE KEY']
})) {
  for (const label of labels) {
    test(`accepts ${label} with LF/CRLF and optional final newline`, () => {
      for (const newline of ['\n', '\r\n']) {
        for (const ending of ['', newline]) {
          const content = pem(label, newline) + ending
          assert.equal(isValidCertItemText(content, type), true)
          assert.equal(isAriaInvalidCertContent(content, type), false)
        }
      }
    })
  }
}

test('accepts multiple intermediate blocks with whitespace separators', () => {
  assert.equal(
    isValidCertItemText(
      `${pem('CERTIFICATE', '\r\n')}\r\n\r\n${pem('CERTIFICATE')}\n`,
      'cert_chain'
    ),
    true
  )
})

test('accepts surrounding whitespace and legacy encrypted RSA headers without parsing the payload', () => {
  const key = [
    '-----BEGIN RSA PRIVATE KEY-----',
    'Proc-Type: 4,ENCRYPTED',
    'DEK-Info: AES-128-CBC,00000000000000000000000000000000',
    '',
    'ZmFrZS10ZXN0',
    '-----END RSA PRIVATE KEY-----'
  ].join('\r\n')
  assert.equal(isValidCertItemText(`\n ${key}\r\n\t`, 'key'), true)
  assert.equal(isValidCertItemText(pem('CERTIFICATE').replace('ZmFrZS10ZXN0', 'placeholder')), true)
  assert.equal(isValidCertItemText(`${pem('PRIVATE KEY')}\n${pem('PRIVATE KEY')}`, 'key'), false)
  assert.equal(
    isValidCertItemText(`${pem('CERTIFICATE REQUEST')}\n${pem('CERTIFICATE REQUEST')}`, 'csr'),
    false
  )
})

test('rejects wrong types, mismatched, nested, empty and incomplete blocks or extra text', () => {
  const certificate = pem('CERTIFICATE')
  for (const content of [
    null,
    undefined,
    '',
    '   ',
    pem('PRIVATE KEY'),
    certificate.replace('END CERTIFICATE', 'END PRIVATE KEY'),
    '-----BEGIN CERTIFICATE-----\n-----END CERTIFICATE-----',
    '-----BEGIN CERTIFICATE-----\n \n-----END CERTIFICATE-----',
    '-----BEGIN CERTIFICATE-----\nZmFrZQ==',
    `prefix\n${certificate}`,
    `${certificate}\nsuffix`,
    `-----BEGIN CERTIFICATE-----\n${certificate}\n-----END CERTIFICATE-----`,
    `${certificate}\ninvalid separator\n${certificate}`
  ]) {
    assert.equal(isValidCertItemText(content, 'cert'), false)
    assert.equal(isValidCertItemText(content, 'cert_chain'), false)
  }
  assert.equal(isValidCertItemText(`${certificate}\n${certificate}`, 'cert'), false)
  assert.equal(
    isValidCertItemText(
      pem('PRIVATE KEY').replace('END PRIVATE KEY', 'END RSA PRIVATE KEY'),
      'key'
    ),
    false
  )
  assert.equal(isValidCertItemText(pem('NEW CERTIFICATE REQUEST'), 'key'), false)
  assert.equal(isValidCertItemText(pem('EC PRIVATE KEY'), 'csr'), false)
  assert.equal(isAriaInvalidCertContent(''), undefined)
})
