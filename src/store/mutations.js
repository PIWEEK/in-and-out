export default {
  setLanguage (state, lang) {
    state.i18n.lang = lang
  },

  setTodayRecords (state, records) {
    state.today.records = records
      .reduce((recordsMap, record) => ({ ...recordsMap, [record.uri]: record }), {})
  },
  setTodayRecord (state, record) {
    state.today.records = {
      ...state.today.records,
      [record.uri]: record,
    }
  },
  updateTodayRecord (state, { uri, data }) {
    state.today.records = {
      ...state.today.records,
      [uri]: {
        ...state.today.records[uri],
        ...data,
      },
    }
  },
}
