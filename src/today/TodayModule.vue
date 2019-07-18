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
import WorkDone from './WorkDone'

const statusComponentMap = {
  ready: ReadyToWork,
  working: NowWorking,
  done: WorkDone,
}

export default {
  name: 'TodayModule',
  components: {
    ReadyToWork,
    NowWorking,
    WorkDone,
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
    } finally {
      this.loading = false
    }
  },
  methods: mapActions(['fetchTodayStatus']),
}
</script>
