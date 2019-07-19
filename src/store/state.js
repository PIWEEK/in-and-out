import { defaultLang } from '@/setup/i18n'

export const initialState = {
  i18n: {
    lang: defaultLang,
  },
  user: {
    isLogged: false,
    data: undefined,
  },
  today: {
    records: {},
  },
  register: {
    records: {},
    detail: {
      date: undefined,
    },
  },
}

export default initialState
