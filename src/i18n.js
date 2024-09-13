import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '@/constants'
import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import HttpApi from 'i18next-http-backend'
import yaml from 'js-yaml'

i18next.use(HttpApi)

export default async function (app) {
  await i18next.init({
    debug: true,
    load: 'languageOnly',
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,

    backend: {
      loadPath: `${import.meta.env.BASE_URL}translations/{{lng}}.yaml`,
      parse: function (data) {
        return yaml.load(data)
      }
    }
  })

  app.use(I18NextVue, { i18next })
  return app
}
