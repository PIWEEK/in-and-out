import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faPlayCircle, faCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'

library.add(faPlus, faPlayCircle, faCircle, faSpinner)

Vue.component('FaIcon', FontAwesomeIcon)
Vue.component('FaLayers', FontAwesomeLayers)
