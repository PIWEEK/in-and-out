import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCircle,
  faPauseCircle,
  faPlayCircle,
  faPlus,
  faSpinner,
  faStopCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import Vue from 'vue'

library.add(faPlus, faPlayCircle, faCircle, faSpinner, faPauseCircle, faStopCircle)

Vue.component('FaIcon', FontAwesomeIcon)
Vue.component('FaLayers', FontAwesomeLayers)
