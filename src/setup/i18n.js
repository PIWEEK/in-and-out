import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export const defaultLang = process.env.VUE_APP_I18N_LOCALE || 'en'
export const fallbackLang = process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en'
export const defaultLangMessages = require(`@/../locales/${defaultLang}`)

export const i18n = new VueI18n({
  locale: defaultLang,
  fallbackLocale: fallbackLang,
  messages: { [defaultLang]: defaultLangMessages },
})

const loadedLanguages = [defaultLang]

function setI18nLanguage (lang) {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      const messagesModule =
        await import(/* webpackChunkName: "lang-[request]" */ `@/../locales/${lang}`)
      i18n.setLocaleMessage(lang, messagesModule.default)
      loadedLanguages.push(lang)
    }
    setI18nLanguage(lang)
  }
  return lang
}

export default i18n
