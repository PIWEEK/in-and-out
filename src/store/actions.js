import { loadLanguageAsync } from '@/setup/i18n'
import { createRecord } from '@/api/record'

export default {
  async changeLanguage ({ commit }, lang) {
    await loadLanguageAsync(lang)
    commit('setLanguage', lang)
  },

  async fetchTodayStatus ({ commit }) {
    // await new Promise(resolve => setTimeout(resolve, 2000))
    commit('setTodayState', { status: 'ready' })
  },

  async startTodayRegister ({ commit }, date) {
    await createRecord(date)
    // await new Promise(resolve => setTimeout(resolve, 2000))
    commit('setTodayStart', date)
  },
}
