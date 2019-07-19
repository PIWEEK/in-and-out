const { colors, fontFamily } = require('tailwindcss/defaultTheme')

const {
  teal: primary,
  purple: secondary,
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
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
    },
  },
}
