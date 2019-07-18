<template>
  <div class="h-full flex flex-col p-8">
    <div class="text-2xl">
      <div class="flex items-center">
        <FaIcon icon="play-circle" class="mr-4" />
        <div class="flex-1">
          {{ startRecord.startTime | hourAndMinute }}
        </div>
      </div>
      <div v-if="pauses.length" class="flex pt-2">
        <FaIcon icon="pause-circle" class="mr-4" />
        <div class="flex-1">
          <div v-for="pause in pauses" :key="pause.start.getTime()" class="leading-none pb-2">
            {{ pause.start | hourAndMinute }}
            <template v-if="pause.end">
              <FaIcon class="mx-2" icon="long-arrow-alt-right" />
              {{ pause.end | hourAndMinute }}
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col items-center justify-around text-3xl text-primary">
      <BaseIconAction
        v-if="isPaused"
        icon="resume-circle"
        :loading="resumeLoading"
        @click="handleResumeClick"
      />
      <BaseIconAction
        v-else
        icon="pause-circle"
        :loading="pauseLoading"
        @click="handlePauseClick"
      />
      <BaseIconAction icon="stop-circle" :loading="stopLoading" @click="handleStopClick" />
    </div>
    <div class="flex flex-col items-center justify-around text-xl text-primary">
      TOTAL: {{ runningTotal | duration }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NowWorking',
  data () {
    return {
      pauseLoading: false,
      resumeLoading: false,
      stopLoading: false,
      runningTotal: 0,
      timer: undefined,
    }
  },
  computed: {
    ...mapGetters({
      startRecord: 'todayStartRecord',
      records: 'todaySortedRecords',
      pauses: 'todayPauses',
      total: 'todayTotal',
      startOfCurrentRecord: 'startOfCurrentRecord',
    }),
    isPaused () {
      return this.records[this.records.length - 1].endTime !== null
    },
  },
  async created () {
    this.timer = setInterval(() => {
      let acum = this.total
      if (this.startOfCurrentRecord) {
        acum += (Date.now() - this.startOfCurrentRecord.getTime())
      }
      this.runningTotal = acum
    }, 1000)
  },
  async beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    ...mapActions(['pauseTodayRegister', 'resumeTodayRegister', 'finishTodayRegister']),
    async handlePauseClick () {
      this.pauseLoading = true
      try {
        await this.pauseTodayRegister()
      } finally {
        this.pauseLoading = false
      }
    },
    async handleResumeClick () {
      this.resumeLoading = true
      try {
        await this.resumeTodayRegister()
      } finally {
        this.resumeLoading = false
      }
    },
    async handleStopClick () {
      this.stopLoading = true
      try {
        await this.finishTodayRegister()
      } finally {
        this.stopLoading = false
      }
    },
  },
}
</script>
