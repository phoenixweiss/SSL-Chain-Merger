import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, normalizeLanguage } from '@/constants'
import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import yaml from 'js-yaml'

const syncDocumentLanguage = (language) => {
  document.documentElement.lang = normalizeLanguage(language)
}

i18next.on('languageChanged', syncDocumentLanguage)

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    debug: import.meta.env.DEV,
    load: 'languageOnly',
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      convertDetectedLanguage: normalizeLanguage
    },
    backend: {
      loadPath: `${import.meta.env.BASE_URL}translations/{{lng}}.yaml`,
      parse: (data) => yaml.load(data)
    }
  })

export default async function (app) {
  await i18next
  app.use(I18NextVue, { i18next })
  return app
}
