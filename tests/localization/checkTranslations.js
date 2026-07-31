import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { load as loadYaml } from 'js-yaml'

const translationsDirectory = new URL('../../public/translations/', import.meta.url)
const pagesDirectory = new URL('../../public/pages/', import.meta.url)
const supportedLanguages = ['en', 'ru']

const collectLeafPaths = (value, prefix = '') => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return [prefix]
  }

  return Object.keys(value)
    .sort()
    .flatMap((key) => collectLeafPaths(value[key], prefix ? `${prefix}.${key}` : key))
}

const translations = await Promise.all(
  supportedLanguages.map(async (language) => {
    const contents = await readFile(new URL(`${language}.yaml`, translationsDirectory), 'utf8')
    return [language, loadYaml(contents)]
  })
)

const [canonicalLanguage, canonicalTranslation] = translations[0]
const canonicalPaths = collectLeafPaths(canonicalTranslation)

for (const [language, translation] of translations.slice(1)) {
  assert.deepEqual(
    collectLeafPaths(translation),
    canonicalPaths,
    `${language}.yaml must have the same keys as ${canonicalLanguage}.yaml`
  )
}

const pageFiles = await readdir(pagesDirectory)
const localizedPages = new Map()

for (const fileName of pageFiles) {
  const match = fileName.match(/^(.*)_(en|ru)\.md$/)

  if (!match) {
    continue
  }

  const [, pageName, language] = match
  const languages = localizedPages.get(pageName) || new Set()
  languages.add(language)
  localizedPages.set(pageName, languages)
}

assert(localizedPages.size > 0, 'At least one localized Markdown page is required')

for (const [pageName, languages] of localizedPages) {
  assert.deepEqual(
    [...languages].sort(),
    supportedLanguages,
    `${pageName} must have English and Russian Markdown files`
  )
}

console.log('Translation keys and localized Markdown files are consistent.')
