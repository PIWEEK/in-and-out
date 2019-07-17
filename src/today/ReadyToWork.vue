<template>
  <div class="h-full flex flex-col p-6">
    <div class="flex-1 flex flex-col items-center justify-around">
      <div class="text-3xl text-primary">
        <FaIcon size="4x" :icon="['fas', 'play-circle']" />
      </div>
      <BaseButton kind="primary" @click="gotToRegisterDetail(new Date())">
        {{ $t('today.ready.manual-registration') }}
      </BaseButton>
    </div>
    <div>
      <RegisterMonthCalendar @date-click="gotToRegisterDetail" />
    </div>
  </div>
</template>

<script>
import RegisterMonthCalendar from '@/components/RegisterMonthCalendar'

function formatDateParam (date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export default {
  name: 'ReadyToWork',
  components: { RegisterMonthCalendar },
  methods: {
    gotToRegisterDetail (date) {
      this.$router.push({
        name: 'register-detail',
        params: { date: formatDateParam(date) },
      })
    },
  },
}
</script>
