<template>
  <div class="h-full flex flex-col p-6">
    <BaseButton kind="secondary" @click="logout()">
      {{ $t('login.log-out') }}
    </BaseButton>
    <div class="flex-1 flex flex-col items-center justify-around">
      <div class="text-3xl text-primary">
        <BaseIconAction
          icon="play-circle"
          :loading="loading"
          @click="handlePlayClick"
        />
      </div>
    </div>
    <div>
      <RegisterMonthCalendar @date-click="goToRegisterDetail" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import RegisterMonthCalendar from '@/components/RegisterMonthCalendar'

import router from '@/router'
import { logout } from '@/api/login'

function formatDateParam (date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export default {
  name: 'ReadyToWork',
  components: { RegisterMonthCalendar },
  data () {
    return {
      loading: false,
    }
  },
  methods: {
    ...mapActions(['startTodayRegister']),
    async logout () {
      await logout()
      router.push('/login')
    },
    goToRegisterDetail (date) {
      this.$router.push({
        name: 'register-detail',
        params: { date: formatDateParam(date) },
      })
    },
    async handlePlayClick () {
      this.loading = true
      try {
        await this.startTodayRegister(new Date())
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
