<template>
  <div class="h-full p-8">
    <div class="text-4xl text-center text-primary pb-2 mb-2 border-b-1 border-white">
      {{ dateObject | date }}
    </div>
    <div class="text-2xl">
      <div class="flex items-center pb-2">
        <FaIcon icon="play-circle" class="mr-4" />
        <div class="flex-1">
          {{ start | hourAndMinute }}
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
      <div class="flex items-center pt-2">
        <FaIcon icon="stop-circle" class="mr-4" />
        <div class="flex-1">
          {{ end | hourAndMinute }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import first from 'lodash/first'
import last from 'lodash/last'
import get from 'lodash/get'

export default {
  name: 'RegisterDetail',
  props: {
    date: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      dateObject: 'registerDetailDate',
      records: 'registerDetailSortedRecords',
      pauses: 'registerDetailPauses',
    }),
    start () { return get(first(this.records), 'startTime') },
    end () { return get(last(this.records), 'endTime') },
  },
  watch: {
    date: {
      handler: 'handleDateParamChange',
      immediate: true,
    },
  },
  methods: {
    ...mapMutations(['setRegisterDetailDate']),
    handleDateParamChange (newDate) {
      const dateParts = newDate.split('-')
      const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
      this.setRegisterDetailDate(date)
    },
  },
}
</script>
