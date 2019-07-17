import { loadLanguageAsync } from '@/setup/i18n'

export default {
  async changeLanguage ({ commit }, lang) {
    await loadLanguageAsync(lang)
    commit('setLanguage', lang)
  },

  async fetchTodayStatus ({ commit }) {
    commit('setTodayState', { status: 'ready' })
  },
}
