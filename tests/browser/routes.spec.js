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

test('loads the certificate guide from its direct route and switches its language', async ({
  page
}) => {
  const englishGuideResponse = page.waitForResponse(
    (response) => response.url().endsWith('/pages/guide_en.md') && response.ok()
  )

  await page.goto('./?lng=en#/guide')

  await englishGuideResponse
  await expect(page).toHaveURL(/#\/guide$/)
  await expect(
    page.getByRole('heading', { level: 1, name: 'SSL certificates in plain language' })
  ).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'What fullchain means' })).toBeVisible()

  const tableOfContents = page.getByRole('navigation', { name: 'Contents' })
  const certificateTypesLink = tableOfContents.getByRole('link', {
    name: 'Common certificate types'
  })
  const domainCoverageLink = tableOfContents.getByRole('link', { name: 'By domain coverage' })

  await expect(tableOfContents).toBeVisible()
  await expect(certificateTypesLink.locator('..')).toHaveClass(/toc_level_2/)
  await expect(domainCoverageLink.locator('..')).toHaveClass(/toc_level_3/)

  const tocContainer = page.locator('.markdown_toc')
  const tocBox = await tocContainer.boundingBox()
  const contentBox = await page.locator('.markdown_content').boundingBox()

  expect(tocBox.x).toBeLessThan(contentBox.x)
  await tocContainer.locator('summary').evaluate((summary) => summary.click())
  await expect(tocContainer).toHaveAttribute('open', '')

  await domainCoverageLink.click()

  await expect(page).toHaveURL(/#\/guide\?section=by-domain-coverage$/)
  await expect(page.getByRole('heading', { level: 3, name: 'By domain coverage' })).toHaveAttribute(
    'id',
    'by-domain-coverage'
  )

  const russianGuideResponse = page.waitForResponse(
    (response) => response.url().endsWith('/pages/guide_ru.md') && response.ok()
  )

  await page.getByRole('button', { name: 'Selected language: EN' }).click()
  await page.getByRole('link', { name: 'RU', exact: true }).click()

  await russianGuideResponse
  await expect(
    page.getByRole('heading', { level: 1, name: 'SSL-сертификаты простым языком' })
  ).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Что такое fullchain' })).toBeVisible()
  await expect(
    page.getByRole('navigation', { name: 'Содержание' }).getByRole('link', {
      name: 'По охвату доменов'
    })
  ).toBeVisible()
})

test('collapses the guide table of contents above the article on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('./?lng=ru#/guide')

  const tableOfContents = page.locator('.markdown_toc')
  const article = page.locator('.markdown_content')

  await expect(tableOfContents).not.toHaveAttribute('open', '')
  await expect(tableOfContents.getByText('Содержание', { exact: true })).toBeVisible()

  const tocBox = await tableOfContents.boundingBox()
  const articleBox = await article.boundingBox()

  expect(tocBox.y).toBeLessThan(articleBox.y)
})
