import sortBy from 'lodash/sortBy'
import values from 'lodash/values'

export default {
  todayState (state) {
    return state.today
  },
  todayRecordsList (s, { todayState }) {
    return values(todayState.records)
  },
  todaySortedRecords (s, { todayRecordsList }) {
    return sortBy(todayRecordsList, 'startTime')
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
  todayLastRecord (s, { todaySortedRecords }) {
    return todaySortedRecords[todaySortedRecords.length - 1]
  },
  todayPauses (s, { todaySortedRecords }) {
    return todaySortedRecords
      .slice(1)
      .map((record, i) => ({ start: todaySortedRecords[i].endTime, end: record.startTime }))
  },
}
