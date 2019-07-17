import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlayCircle)

Vue.component('FaIcon', FontAwesomeIcon)
