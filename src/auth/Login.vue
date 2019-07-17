<template>
  <div class="flex h-full">
    <div class="flex-1 items-center flex flex-col justify-around py-20">
      <h1 class="text-primary font-title text-5xl">
        In & Out
      </h1>
      <BaseButton
        kind="primary"
        @click="login()"
      >
        {{ $t('login.log-in') }}
      </BaseButton>
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
