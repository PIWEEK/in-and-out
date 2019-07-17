<template>
  <div class="flex h-full">
    <div class="flex-1 items-center flex flex-col justify-around py-20">
      <h1 class="text-primary font-title text-5xl">
        In & Out
      </h1>
      <button
        class="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        @click="login()"
      >
        {{ $t('login.log-in') }}
      </button>
    </div>
  </div>
</template>

<script>
import auth from 'solid-auth-client'

export default {
  name: 'Login',
  methods: {
    async login () {
      let session = await auth.currentSession()
      if (!session) {
        session = await auth.popupLogin({ popupUri: '/login-popup.html' })
      }
      console.log('Hay sesión en ', session.webId)
    },
  },
}
</script>
