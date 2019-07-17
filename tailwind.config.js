const { colors, fontFamily } = require('tailwindcss/defaultTheme')

const {
  teal: primary,
  green: secondary,
  gray: tertiary,
} = colors

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          lightest: primary['100'],
          light: primary['300'],
          default: primary['500'],
          dark: primary['700'],
          darkest: primary['900'],
        },
        secondary: {
          lightest: secondary['100'],
          light: secondary['300'],
          default: secondary['500'],
          dark: secondary['700'],
          darkest: secondary['900'],
        },
        tertiary: {
          lightest: tertiary['100'],
          light: tertiary['300'],
          default: tertiary['500'],
          dark: tertiary['700'],
          darkest: tertiary['900'],
        },
      },
      fontFamily: {
        title: ['Roboto', ...fontFamily.sans],
        serif: ['Lato', ...fontFamily.serif],
      },
    },
  },
}
