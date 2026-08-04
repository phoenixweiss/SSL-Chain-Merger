import { readFile } from 'node:fs/promises'
import { expect, test } from '@playwright/test'
import JSZip from 'jszip'

const domainName = 'example.test'
const domainCertificate = pemCertificate('domain')
const firstIntermediateCertificate = pemCertificate('intermediate-one')
const secondIntermediateCertificate = pemCertificate('intermediate-two')
const rootCertificate = pemCertificate('root')
const privateKey = [
  '-----BEGIN RSA PRIVATE KEY-----',
  'ZmFrZS10ZXN0LWtleQ==',
  '-----END RSA PRIVATE KEY-----'
].join('\n')
const certificateRequest = [
  '-----BEGIN CERTIFICATE REQUEST-----',
  'ZmFrZS10ZXN0LXJlcXVlc3Q=',
  '-----END CERTIFICATE REQUEST-----'
].join('\n')

function pemCertificate(name) {
  return [
    '-----BEGIN CERTIFICATE-----',
    Buffer.from(`fake-${name}-certificate`).toString('base64'),
    '-----END CERTIFICATE-----'
  ].join('\n')
}

async function fillCertificateForm(page, { intermediates, root, csr }) {
  await page.goto('./?lng=en#/')
  await page.locator('#domain_name').fill(domainName)
  await page.locator('#cert_domain').fill(domainCertificate)
  await page.locator('#cert_inter').fill(intermediates)

  if (root) {
    await page.locator('#cert_root').fill(root)
  }

  await page.locator('#private_key').fill(privateKey)

  if (csr) {
    await page.locator('#csr_code').fill(csr)
  }
}

async function downloadZip(page) {
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download full SSL chain' }).click()
  const download = await downloadPromise
  const downloadPath = await download.path()

  expect(download.suggestedFilename()).toBe('example_test_ssl_chain.zip')

  return JSZip.loadAsync(await readFile(downloadPath))
}

async function expectItemDownload(page, { id, buttonName, filename, content }) {
  const item = page.locator('.cert_item').filter({ has: page.locator(`#${id}`) })
  const downloadPromise = page.waitForEvent('download')

  await item.getByRole('button', { name: buttonName }).click()

  const download = await downloadPromise
  const downloadPath = await download.path()

  expect(download.suggestedFilename()).toBe(filename)
  expect(await readFile(downloadPath, 'utf8')).toBe(content)
}

test('preserves individual component downloads and filenames', async ({ page }) => {
  await fillCertificateForm(page, {
    intermediates: firstIntermediateCertificate,
    root: rootCertificate,
    csr: certificateRequest
  })

  const downloads = [
    {
      id: 'cert_domain',
      buttonName: 'Download in crt format',
      filename: 'example.test.domain.crt',
      content: domainCertificate
    },
    {
      id: 'cert_inter',
      buttonName: 'Download in crt format',
      filename: 'example.test.intermediate.crt',
      content: firstIntermediateCertificate
    },
    {
      id: 'cert_root',
      buttonName: 'Download in crt format',
      filename: 'example.test.root.crt',
      content: rootCertificate
    },
    {
      id: 'private_key',
      buttonName: 'Download in key format',
      filename: 'example.test.private.key',
      content: privateKey
    },
    {
      id: 'csr_code',
      buttonName: 'Download in csr format',
      filename: 'example.test.request.csr',
      content: certificateRequest
    }
  ]

  for (const expectedDownload of downloads) {
    await expectItemDownload(page, expectedDownload)
  }
})

test('preserves the existing single-intermediate and root download formats', async ({ page }) => {
  await fillCertificateForm(page, {
    intermediates: firstIntermediateCertificate,
    root: rootCertificate
  })

  const separateFilesZip = await downloadZip(page)

  expect(Object.keys(separateFilesZip.files).sort()).toEqual([
    'example.test.domain.crt',
    'example.test.intermediate.crt',
    'example.test.private.key',
    'example.test.root.crt'
  ])
  expect(await separateFilesZip.file('example.test.intermediate.crt').async('string')).toBe(
    firstIntermediateCertificate
  )
  expect(await separateFilesZip.file('example.test.root.crt').async('string')).toBe(rootCertificate)

  await page.getByRole('checkbox').check()
  const mergedFilesZip = await downloadZip(page)

  expect(Object.keys(mergedFilesZip.files).sort()).toEqual([
    'example.test.fullchain.crt',
    'example.test.private.key'
  ])
  expect(await mergedFilesZip.file('example.test.fullchain.crt').async('string')).toBe(
    `${domainCertificate}\n${firstIntermediateCertificate}\n${rootCertificate}\n`
  )
})

test('builds a fullchain with multiple intermediates and no root certificate', async ({ page }) => {
  const intermediates = `${firstIntermediateCertificate}\n${secondIntermediateCertificate}`

  await fillCertificateForm(page, {
    intermediates: `${firstIntermediateCertificate}\ninvalid separator\n${secondIntermediateCertificate}`
  })
  await expect(page.locator('#cert_inter')).toHaveAttribute('aria-invalid', 'true')

  await page.locator('#cert_inter').fill(intermediates)

  const separateFilesZip = await downloadZip(page)
  expect(await separateFilesZip.file('example.test.intermediate.crt').async('string')).toBe(
    intermediates
  )
  expect(separateFilesZip.file('example.test.root.crt')).toBeNull()

  await page.getByRole('checkbox').check()

  await expect(page.getByRole('button', { name: 'Download full SSL chain' })).toBeEnabled()

  const zip = await downloadZip(page)

  expect(Object.keys(zip.files).sort()).toEqual([
    'example.test.fullchain.crt',
    'example.test.private.key'
  ])
  expect(await zip.file('example.test.fullchain.crt').async('string')).toBe(
    `${domainCertificate}\n${intermediates}\n`
  )
})
