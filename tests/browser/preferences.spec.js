import { expect, test } from '@playwright/test'

const openApp = (page, language) => page.goto(`./?lng=${language}#/`)

test('normalizes regional locales and falls back to English', async ({ page }) => {
  await openApp(page, 'ru-RU')
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru')
  await expect(page.locator('summary')).toHaveText('Выбран язык: RU')

  await openApp(page, 'en-US')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('summary')).toHaveText('Selected language: EN')

  await openApp(page, 'de-DE')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('summary')).toHaveText('Selected language: EN')
})

test('persists the selected theme across reloads', async ({ page }) => {
  await openApp(page, 'en')

  const documentRoot = page.locator('html')
  const themeSwitch = page.getByRole('button', { name: 'Switch to dark theme' })

  await expect(documentRoot).toHaveAttribute('data-theme', 'light')
  await themeSwitch.click()
  await expect(documentRoot).toHaveAttribute('data-theme', 'dark')
  await expect(page.getByRole('button', { name: 'Switch to light theme' })).toBeVisible()
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('ssl-chain-merger-theme')))
    .toBe('dark')

  await page.reload()
  await expect(documentRoot).toHaveAttribute('data-theme', 'dark')
  await expect(page.getByRole('button', { name: 'Switch to light theme' })).toBeVisible()
})
