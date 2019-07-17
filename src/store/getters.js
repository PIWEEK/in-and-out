export default {
  todayState (state) {
    return state.today
  },
  todayStatus (s, { todayState }) {
    return todayState.status
  },
}
