<template>
  <div class="h-full flex flex-col p-8">
    <div class="font-title text-2xl">
      <FaIcon icon="play-circle" class="mr-2" />
      {{ startRecord.startTime | hourAndMinute }}
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
      <BaseIconAction
        icon="stop-circle"
        :loading="stopLoading"
        @click="handleStopClick"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
    }),
    isPaused () {
      return this.records[this.records.length - 1].endTime !== null
    },
  },
  methods: {
    handlePauseClick () {},
    handleResumeClick () {},
    handleStopClick () {},
  },
}
</script>
