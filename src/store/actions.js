import { createRecord, getTodayRecords } from '@/api/record'
import { loadLanguageAsync } from '@/setup/i18n'

export default {
  async changeLanguage ({ commit }, lang) {
    await loadLanguageAsync(lang)
    commit('setLanguage', lang)
  },

  async fetchTodayStatus ({ commit }) {
    const records = await getTodayRecords()
    commit('setTodayState', { records })
  },

  async startTodayRegister ({ commit, dispatch }, date) {
    await createRecord(date)
    return dispatch('fetchTodayStatus')
  },
}
