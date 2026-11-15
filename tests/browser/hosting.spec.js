import { expect, test } from '@playwright/test'
import { readFile } from 'node:fs/promises'
import JSZip from 'jszip'

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 }
]) {
  test(`serves the custom-domain build at root (${viewport.width}px)`, async ({
    page,
    request
  }) => {
    await page.setViewportSize(viewport)
    const errors = []
    const missing = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })
    page.on('response', (response) => {
      if (response.status() >= 400) missing.push(response.url())
    })
    await page.goto('./?lng=en#/')
    await expect(page.locator('#domain_name')).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://ssl.phoenixweiss.me/'
    )
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      'https://ssl.phoenixweiss.me/'
    )
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary')

    const iconPaths = await page
      .locator('link[rel="icon"], link[rel="apple-touch-icon"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href')))
    for (const path of iconPaths) {
      const response = await request.get(path)
      expect(response.ok()).toBe(true)
      expect(response.headers()['content-type']).toMatch(/^image\//)
    }
    const manifestPath = await page.locator('link[rel="manifest"]').getAttribute('href')
    const manifestResponse = await request.get(manifestPath)
    expect(manifestResponse.ok()).toBe(true)
    const manifest = await manifestResponse.json()
    expect(manifest.start_url).toBe('/')
    expect(manifest.scope).toBe('/')
    for (const icon of manifest.icons) {
      const response = await request.get(icon.src)
      expect(response.ok()).toBe(true)
      expect(response.headers()['content-type']).toMatch(/^image\//)
    }
    const socialImage = await page.locator('meta[property="og:image"]').getAttribute('content')
    expect(new URL(socialImage).origin).toBe('https://ssl.phoenixweiss.me')
    expect((await request.get(new URL(socialImage).pathname)).ok()).toBe(true)

    await page.getByRole('link', { name: 'About', exact: true }).click()
    await expect(page.getByRole('heading', { level: 1, name: 'About', exact: true })).toBeVisible()
    await page.getByRole('link', { name: 'Guide', exact: true }).click()
    await expect(
      page.getByRole('heading', { level: 1, name: 'SSL certificates in plain language' })
    ).toBeVisible()
    await page.locator('a.logo').click()
    await expect(page.locator('#domain_name')).toBeVisible()
    expect(new URL(page.url()).pathname).toBe('/')

    const pem = (label) => `-----BEGIN ${label}-----\nZmFrZS10ZXN0\n-----END ${label}-----`
    const certificate = pem('CERTIFICATE')
    const key = pem('PRIVATE KEY')
    await page.locator('#domain_name').fill('example.test')
    await page.locator('#cert_domain').fill(certificate)
    await page.locator('#cert_inter').fill(certificate)
    await page.locator('#private_key').fill(key)
    const keyDownload = page.waitForEvent('download')
    await page
      .locator('.cert_item')
      .filter({ has: page.locator('#private_key') })
      .getByRole('button')
      .click()
    const downloadedKey = await keyDownload
    expect(downloadedKey.suggestedFilename()).toBe('example.test.private.key')
    expect(await readFile(await downloadedKey.path())).toEqual(Buffer.from(key))
    for (const merged of [false, true]) {
      await page.getByRole('checkbox').setChecked(merged)
      const zipDownload = page.waitForEvent('download')
      await page.getByRole('button', { name: 'Download full SSL chain' }).click()
      const downloadedZip = await zipDownload
      expect(downloadedZip.suggestedFilename()).toBe('example_test_ssl_chain.zip')
      const zip = await JSZip.loadAsync(await readFile(await downloadedZip.path()))
      expect(await zip.file('example.test.private.key').async('string')).toBe(key)
      if (merged) {
        expect(await zip.file('example.test.fullchain.crt').async('string')).toBe(
          `${certificate}\n${certificate}\n`
        )
      } else {
        expect(await zip.file('example.test.domain.crt').async('string')).toBe(certificate)
        expect(await zip.file('example.test.intermediate.crt').async('string')).toBe(certificate)
      }
    }

    await page.goto('./?lng=en#/guide?section=by-domain-coverage')
    await expect(page.locator('h3#by-domain-coverage')).toBeVisible()
    expect(missing).toEqual([])
    expect(errors).toEqual([])
  })
}
