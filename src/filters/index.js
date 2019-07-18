import Vue from 'vue'
import camelCase from 'lodash/camelCase'

const requirefilter = require.context(
  // The relative path of the filters folder
  './',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base filter filenames
  /base[A-Z]\w+\.(js)$/
)

requirefilter.keys().forEach(fileName => {
  // Get filter config
  const filterFunction = requirefilter(fileName)

  // Get PascalCase name of filter
  const filterName = camelCase(
    // Gets the file name regardless of folder depth
    fileName
      .split('/')
      .pop()
      .replace(/\.\w+$/, '')
      .replace('base', '')
  )

  // Register filter globally
  Vue.filter(filterName, filterFunction.default || filterFunction)
})
