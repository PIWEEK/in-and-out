<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script>
import { mapActions } from 'vuex'

import coreComponents from '@/core'

export default {
  name: 'App',
  components: { ...coreComponents },
  created () {
    let userLang = navigator.language
    if (typeof userLang === 'string' && userLang.length > 0) {
      userLang = userLang.slice(0, 2)
      this.changeLanguage(userLang)
    }
  },
  methods: mapActions(['changeLanguage']),
}
</script>

<style src="./styles/main.css"></style>
