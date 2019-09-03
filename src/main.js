import '@/components'
import '@/filters'
import '@/setup/font-awesome'
import '@/setup/registerServiceWorker'

import App from '@/App'
import router from '@/router'
import i18n from '@/setup/i18n'
import store from '@/store'
import Vue from 'vue'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
