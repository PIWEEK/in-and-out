<template>
  <div class="flex h-full p-8 flex-col">
    <div class="flex-1 items-center justify-center flex">
      <h1 class="text-primary font-title text-6xl">
        <span>In &</span>
        <span class="text-secondary"> Out</span>
      </h1>
    </div>
    <div class="text-center">
      <p class="text-sm pb-10">
        {{ $t('login.current-pod') }}<br>
        https://pod2.projects.kaleidos.net
      </p>
      <BaseButton
        kind="secondary"
        class="block w-full"
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
