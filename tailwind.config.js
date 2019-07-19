const { colors, fontFamily } = require('tailwindcss/defaultTheme')

const {
  gray: tertiary,
} = colors

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          lightest: '#cafbe3',
          light: '#9af8ca',
          default: '#6af6b1',
          dark: '#39f397',
          darkest: '#0eeb7e',
        },
        secondary: {
          lightest: '#e0aef8',
          light: '#cf7ef5',
          default: '#be51f2',
          dark: '#ab1fee',
          darkest: '#8f0fcc',
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
