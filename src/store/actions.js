import { loadLanguageAsync } from '@/setup/i18n'

export default {
  async changeLanguage ({ commit }, lang) {
    await loadLanguageAsync(lang)
    commit('setLanguage', lang)
  },

  async fetchTodayStatus ({ commit }) {
    // await new Promise(resolve => setTimeout(resolve, 2000))
    commit('setTodayState', { status: 'ready' })
  },
}
