<template>
  <Layout>
    <template v-if="isLogged" slot="header">
      <div class="flex items-center justify-between pt-4 px-4">
        <img class="h-8" src="/in-and-out.svg">
        <BaseButton kind="secondary" outline="asd" @click="logoutUser">
          {{ $t('login.log-out') }}
        </BaseButton>
      </div>
    </template>
    <router-view />
  </Layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import coreComponents from '@/core'

export default {
  name: 'App',
  components: { ...coreComponents },
  computed: {
    ...mapState({
      isLogged: state => state.user.isLogged,
    }),
  },
  created () {
    let userLang = navigator.language
    if (typeof userLang === 'string' && userLang.length > 0) {
      userLang = userLang.slice(0, 2)
      this.changeLanguage(userLang)
    }
  },
  methods: {
    ...mapActions(['changeLanguage', 'logout']),
    async logoutUser () {
      await this.logout()
      this.$router.push({ name: 'login' })
    },
  },
}
</script>

<style src="./styles/main.css"></style>
