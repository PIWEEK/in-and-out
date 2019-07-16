const { colors, fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: colors.teal,
        secondary: colors.yellow,
        tertiary: colors.indigo,
      },
      fontFamily: {
        title: ['Roboto', ...fontFamily.sans],
        serif: ['Lato', ...fontFamily.serif],
      },
    },
  },
}
