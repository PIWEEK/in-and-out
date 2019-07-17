<template>
  <component
    :is="activeComponent"
    v-if="activeComponent"
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
  computed: {
    ...mapGetters({ status: 'todayStatus' }),
    activeComponent () {
      return statusComponentMap[this.status]
    },
  },
  created () {
    this.fetchTodayStatus()
  },
  methods: mapActions(['fetchTodayStatus']),
}
</script>
