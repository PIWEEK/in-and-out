<template>
  <div class="h-full flex flex-col p-8">
    <div class="text-2xl">
      <div class="flex pb-2">
        <FaIcon icon="play-circle" class="mr-4 text-primary" />
        <div class="flex-1">
          <div class="text-lg">
            Hora de entrada
          </div>
          {{ startRecord.startTime | hourAndMinute }}
        </div>
      </div>
      <div v-if="pauses.length" class="flex pt-2">
        <FaIcon icon="pause-circle" class="mr-4 text-primary" />
        <div class="flex-1">
          <div class="text-lg">
            Pausas
          </div>
          <div v-for="pause in pauses" :key="pause.start.getTime()" class="">
            {{ pause.start | hourAndMinute }}
            <template v-if="pause.end">
              - {{ pause.end | hourAndMinute }}
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col items-center justify-around text-3xl text-primary py-2">
      <div v-if="isPaused" class="py-2">
        <BaseIconAction
          icon="resume-circle"
          :loading="resumeLoading"
          @click="handleResumeClick"
        />
      </div>
      <div v-else class="py-2">
        <BaseIconAction
          icon="pause-circle"
          :loading="pauseLoading"
          @click="handlePauseClick"
        />
      </div>
      <div class="py-2">
        <BaseIconAction icon="stop-circle" :loading="stopLoading" @click="handleStopClick" />
      </div>
    </div>
    <div class="mt-4 pt-2 text-lg border-t border-gray-600">
      <span class="ml-12">Total</span>
      <div class="text-2xl text-center text-primary">
        {{ runningTotal | duration }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

function formatDateParam (date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

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
        this.$router.replace({
          name: 'register-detail',
          params: { date: formatDateParam(this.startRecord.startTime) },
        })
      } finally {
        this.stopLoading = false
      }
    },
  },
}
</script>
