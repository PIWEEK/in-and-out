import sortBy from 'lodash/sortBy'
import values from 'lodash/values'
import get from 'lodash/get'
import last from 'lodash/last'

function formatDateParam (date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export default {
  registerRecordsList (state) {
    return values(state.register.records)
  },

  getRegisterDateRecords: (s, { registerRecordsList }) => date => {
    return registerRecordsList.filter(
      record => formatDateParam(record.startTime) === formatDateParam(date)
    )
  },

  registerDetailDate (state) {
    return new Date(state.register.detail.date)
  },

  registerDetailRecords (s, { getRegisterDateRecords, registerDetailDate }) {
    return getRegisterDateRecords(registerDetailDate)
  },

  registerDetailSortedRecords (s, { registerDetailRecords }) {
    return sortBy(registerDetailRecords, 'startTime')
  },

  registerDetailPauses (s, { registerDetailSortedRecords }) {
    return registerDetailSortedRecords
      .slice(0, -1)
      .map((record, i) => ({
        start: record.endTime,
        end: get(registerDetailSortedRecords, `${i + 1}.startTime`),
      }))
  },

  registerDetailDuration (s, { registerDetailRecords }) {
    return registerDetailRecords
      .map(record => record.endTime.getTime() - record.startTime.getTime())
      .reduce((total, recordDuration) => total + recordDuration, 0)
  },

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

  todayTotal (s, { todaySortedRecords }) {
    return todaySortedRecords
      .filter((record) => !!record.endTime)
      .reduce(
        (acum, record) => acum + record.endTime.getTime() - record.startTime.getTime(),
        0
      )
  },

  startOfCurrentRecord (s, { todaySortedRecords }) {
    const activeRecord = todaySortedRecords.find((record) => !record.endTime)
    if (activeRecord) {
      return activeRecord.startTime
    }
    return null
  },
}
