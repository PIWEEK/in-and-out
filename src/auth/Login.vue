<template>
  <div class="flex h-full p-8 flex-col">
    <div class="flex-1 items-center justify-center flex">
      <img src="/in-and-out.svg">
    </div>
    <div class="text-center">
      <p class="text-sm pb-10">
        {{ $t('login.current-pod') }}<br>
        https://pod2.projects.kaleidos.net
      </p>
      <BaseButton
        kind="secondary"
        class="block w-full"
        @click="loginUser"
      >
        {{ $t('login.log-in') }}
      </BaseButton>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  methods: {
    ...mapActions(['login']),
    async loginUser () {
      await this.login()
      router.push({ name: 'today' })
    },
  },
}
</script>
