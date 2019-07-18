<template>
  <div class="h-full flex flex-col p-8">
    <div class="text-2xl">
      <div class="flex items-center">
        <FaIcon icon="play-circle" class="mr-4" />
        <div class="flex-1">
          {{ startRecord.startTime | hourAndMinute }}
        </div>
      </div>
      <div v-if="pauses.length" class="flex my-2">
        <FaIcon icon="pause-circle" class="mr-4" />
        <div class="flex-1">
          <div v-for="pause in pauses" :key="pause.start.getTime()" class="leading-none">
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
        icon="play-circle"
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
    }
  },
  computed: {
    ...mapGetters({
      startRecord: 'todayStartRecord',
      records: 'todaySortedRecords',
      pauses: 'todayPauses',
    }),
    isPaused () {
      return this.records[this.records.length - 1].endTime !== null
    },
  },
  methods: {
    ...mapActions(['pauseTodayRegister', 'resumeTodayRegister']),
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
    handleStopClick () {},
  },
}
</script>
