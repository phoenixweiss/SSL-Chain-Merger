export const APP_NAME = '🛡️ SSL Certificate Merger'
export const SUPPORTED_LANGUAGES = ['en', 'ru']
export const DEFAULT_LANGUAGE = 'en'

export const normalizeLanguage = (language) => {
  const normalizedLanguage = language?.toLowerCase().split('-')[0]

  return SUPPORTED_LANGUAGES.includes(normalizedLanguage) ? normalizedLanguage : DEFAULT_LANGUAGE
}
