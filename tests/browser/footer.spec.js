import { expect, test } from '@playwright/test'
import { readFile } from 'node:fs/promises'

const version = (await readFile(new URL('../../VERSION', import.meta.url), 'utf8')).trim()

test('renders the build version in the localized footer', async ({ page }) => {
  await page.goto('./?lng=en#/')
  await expect(
    page.locator('footer').getByText(`Version ${version}`, { exact: true })
  ).toBeVisible()

  await page.goto('./?lng=ru#/')
  await expect(page.locator('footer').getByText(`Версия ${version}`, { exact: true })).toBeVisible()
})
