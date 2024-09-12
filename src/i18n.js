import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import HttpApi from 'i18next-http-backend'
import yaml from 'js-yaml'

i18next.use(HttpApi).init({
  debug: true,
  load: 'languageOnly',
  fallbackLng: 'en',
  locales: ['en', 'ru'],

  backend: {
    loadPath: `${import.meta.env.BASE_URL}translations/{{lng}}.yaml`,
    parse: function (data) {
      return yaml.load(data)
    }
  }
})

export default function (app) {
  app.use(I18NextVue, { i18next })
  return app
}
