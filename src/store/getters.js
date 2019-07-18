export default {
  todayState (state) {
    return state.today
  },
  todayRecords (s, { todayState }) {
    return todayState.records
  },
  todaySortedRecords (s, { todayState }) {
    return [...todayState.records].sort((a, b) => a.startTime - b.startTime)
  },
  todayStatus (s, { todaySortedRecords }) {
    let status
    if (todaySortedRecords.length > 0) {
      status = todaySortedRecords[0].actionStatus === 'completed'
        ? 'done'
        : todaySortedRecords[todaySortedRecords.length - 1].endTime === null
          ? 'working' : 'paused'
    } else {
      status = 'ready'
    }
    return status
  },
  todayStartRecord (s, { todaySortedRecords }) {
    return todaySortedRecords[0]
  },
}
