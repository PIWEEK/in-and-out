<template>
  <div class="h-full flex flex-col">
    <div class="flex-1 flex flex-col items-center justify-around">
      <div class="text-3xl text-primary">
        <FaIcon size="4x" :icon="['fas', 'play-circle']" />
      </div>
      <router-link :to="{ name: 'register-detail', params: { date: todayDate } }">
        <BaseButton kind="primary">
          {{ $t('today.ready.manual-registration') }}
        </BaseButton>
      </router-link>
    </div>
    <div>asd</div>
  </div>
</template>

<script>
export default {
  name: 'ReadyToWork',
  computed: {
    todayDate () {
      const today = new Date()
      return `${today.getFullYear()}-${today.getMonth() +
        1}-${today.getDate()}`
    },
  },
}
</script>
