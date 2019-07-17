<template>
  <div class="flex h-full">
    <div class="flex-1 items-center flex flex-col justify-around py-20">
      <h1 class="text-primary-500 font-title text-5xl">
        In & Out
      </h1>
      <button
        class="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
        @click="login()"
      >
        {{ $t('login.log-in') }}
      </button>
    </div>
  </div>
</template>

<script>
import { login, currentUserWebId, currentUserVCard } from '@/api/login'

export default {
  name: 'Login',
  methods: {
    async login () {
      let userWebId = await currentUserWebId()
      if (!userWebId) {
        userWebId = await login()
      }
      console.log(`Logado usuario ${userWebId}`)

      const user = await currentUserVCard()
      console.log(`Eres ${user.fullName}`)
      console.log(`Organización ${user.organizationName}`)
      console.log(`Rol ${user.role}`)
    },
  },
}
</script>
