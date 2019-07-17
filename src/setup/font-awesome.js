import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlus, faPlayCircle)

Vue.component('FaIcon', FontAwesomeIcon)
