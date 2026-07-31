import { expect, test } from '@playwright/test'

const fakeDomain = 'example.test'
const fakeDomainCertificate = [
  '-----BEGIN CERTIFICATE-----',
  'ZmFrZS1kb21haW4tY2VydA==',
  '-----END CERTIFICATE-----'
].join('\n')
const fakeRootCertificate = [
  '-----BEGIN CERTIFICATE-----',
  'ZmFrZS1yb290LWNlcnQ=',
  '-----END CERTIFICATE-----'
].join('\n')
const fakePrivateKey = [
  '-----BEGIN RSA PRIVATE KEY-----',
  'ZmFrZS10ZXN0LWtleQ==',
  '-----END RSA PRIVATE KEY-----'
].join('\n')
const sensitiveValues = [
  fakeDomain,
  fakeDomainCertificate,
  fakeRootCertificate,
  fakePrivateKey,
  'ZmFrZS1kb21haW4tY2VydA==',
  'ZmFrZS10ZXN0LWtleQ=='
]

test('keeps entered PEM data out of requests and persistent browser storage', async ({
  context,
  page
}) => {
  const requests = []

  page.on('request', (request) => {
    requests.push({ url: request.url(), postData: request.postData() || '' })
  })

  await page.goto('./?lng=en#/')
  await page.locator('#domain_name').fill(fakeDomain)
  await page.locator('#cert_domain').fill(fakeDomainCertificate)
  await page.locator('#cert_root').fill(fakeRootCertificate)
  await page.locator('#private_key').fill(fakePrivateKey)

  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download full SSL chain' }).click()
  const download = await downloadPromise

  expect(download.suggestedFilename()).toBe('example_test_ssl_chain.zip')

  for (const request of requests) {
    expect(new URL(request.url).origin).toBe('http://127.0.0.1:4173')

    for (const sensitiveValue of sensitiveValues) {
      expect(request.url).not.toContain(sensitiveValue)
      expect(request.postData).not.toContain(sensitiveValue)
    }
  }

  const browserStorage = await page.evaluate(() => ({
    local: Object.fromEntries(Object.entries(localStorage)),
    session: Object.fromEntries(Object.entries(sessionStorage))
  }))
  const serializedStorage = JSON.stringify(browserStorage)

  expect(Object.keys(browserStorage.local)).toEqual(['i18nextLng'])
  expect(browserStorage.session).toEqual({})
  expect(await context.cookies()).toEqual([])

  for (const sensitiveValue of sensitiveValues) {
    expect(serializedStorage).not.toContain(sensitiveValue)
  }

  await page.reload()
  await expect(page.locator('#domain_name')).toHaveValue('')
  await expect(page.locator('#cert_domain')).toHaveValue('')
  await expect(page.locator('#cert_root')).toHaveValue('')
  await expect(page.locator('#private_key')).toHaveValue('')
})
