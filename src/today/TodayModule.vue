<template>
  <component
    :is="activeComponent"
    v-if="!loading && activeComponent"
  />
  <div v-else>
    We are fetching your work status...
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ReadyToWork from './ReadyToWork'
import NowWorking from './NowWorking'

const statusComponentMap = {
  ready: ReadyToWork,
  working: NowWorking,
  paused: NowWorking,
}

function formatDateParam (date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export default {
  name: 'TodayModule',
  components: {
    ReadyToWork,
    NowWorking,
  },
  data () {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapGetters({ status: 'todayStatus' }),
    activeComponent () {
      return statusComponentMap[this.status]
    },
  },
  async created () {
    this.loading = true
    try {
      await this.fetchTodayStatus()
      if (this.status === 'done') {
        this.$router.replace({
          name: 'register-detail',
          params: { date: formatDateParam(new Date()) },
        })
      }
    } finally {
      this.loading = false
    }
  },
  methods: mapActions(['fetchTodayStatus']),
}
</script>
