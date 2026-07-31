import { expect, test } from '@playwright/test'

test('loads the English Markdown page from a direct about route', async ({ page }) => {
  const markdownResponse = page.waitForResponse(
    (response) => response.url().endsWith('/pages/about_en.md') && response.ok()
  )

  await page.goto('./?lng=en#/about')

  await markdownResponse
  await expect(page).toHaveURL(/#\/about$/)
  await expect(page.getByRole('heading', { level: 1, name: 'About' })).toBeVisible()
  await expect(
    page.getByRole('heading', { level: 2, name: 'Privacy and validation limits' })
  ).toBeVisible()
})

test('loads the Russian Markdown page from a direct generic page route', async ({ page }) => {
  const markdownResponse = page.waitForResponse(
    (response) => response.url().endsWith('/pages/about_ru.md') && response.ok()
  )

  await page.goto('./?lng=ru#/pages/about')

  await markdownResponse
  await expect(page).toHaveURL(/#\/pages\/about$/)
  await expect(page.getByRole('heading', { level: 1, name: 'О проекте' })).toBeVisible()
  await expect(
    page.getByRole('heading', { level: 2, name: 'Приватность и ограничения проверки' })
  ).toBeVisible()
})
