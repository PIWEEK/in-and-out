export default {
  setLanguage (state, lang) {
    state.i18n.lang = lang
  },

  setTodayState (state, todayState) {
    state.today = todayState
  },
  setTodayStart (state, date) {
    state.today.start = date.getTime()
    state.today.status = 'working'
  },
}
