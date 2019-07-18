import { createRecord, getTodayRecords, pauseRecording, resumeRecording } from '@/api/record'
import { loadLanguageAsync } from '@/setup/i18n'

export default {
  async changeLanguage ({ commit }, lang) {
    await loadLanguageAsync(lang)
    commit('setLanguage', lang)
  },

  async fetchTodayStatus ({ commit }) {
    const records = await getTodayRecords()
    commit('setTodayRecords', records)
  },
  async startTodayRegister ({ commit, dispatch }, date) {
    await createRecord(date)
    return dispatch('fetchTodayStatus')
  },
  async pauseTodayRegister ({ commit, dispatch, getters }) {
    await pauseRecording()
    const { uri } = getters.todayLastRecord
    commit('updateTodayRecord', { uri, data: { endTime: new Date() } })
  },
  async resumeTodayRegister ({ commit, dispatch, getters }) {
    await resumeRecording()
    return dispatch('fetchTodayStatus')
  },
}
