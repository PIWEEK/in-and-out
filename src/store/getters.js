import sortBy from 'lodash/sortBy'
import values from 'lodash/values'
import get from 'lodash/get'
import last from 'lodash/last'

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
        : last(todaySortedRecords).endTime === null
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
    return last(todaySortedRecords)
  },
  todayPauses (s, { todaySortedRecords }) {
    return todaySortedRecords
      .filter(record => record.endTime !== null)
      .map((record, i) => ({
        start: record.endTime,
        end: get(todaySortedRecords, `${i + 1}.startTime`),
      }))
  },
}
