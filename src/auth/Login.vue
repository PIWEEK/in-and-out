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
import router from '@/router'
import { login } from '@/api/login'

export default {
  name: 'Login',
  methods: {
    async login () {
      await login()
      router.push('/today')
    },
  },
}
</script>
