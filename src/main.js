import Vue from 'vue'

import App from '@/App'
import '@/components'
import router from '@/router'
import '@/setup/font-awesome'
import i18n from '@/setup/i18n'
import '@/setup/registerServiceWorker'
import store from '@/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
