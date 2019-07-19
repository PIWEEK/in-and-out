<template>
  <div class="h-full p-8 flex flex-col">
    <div class="text-4xl text-center text-primary pb-2 mb-4 border-b border-primary">
      {{ dateObject | date }}
    </div>
    <div class="flex-1">
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
      <div class="mt-4 text-2xl text-right">
        <span class="mr-2">Total:</span>
        {{ duration | duration }}
      </div>
    </div>
    <div class="text-center">
      <BaseButton
        kind="secondary"
        @click="clear()"
      >
        {{ $t('register.clear-data') }}
      </BaseButton>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import first from 'lodash/first'
import last from 'lodash/last'
import get from 'lodash/get'
import router from '@/router'

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
      duration: 'registerDetailDuration',
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
    ...mapActions(['clearData']),
    ...mapMutations(['setRegisterDetailDate']),
    handleDateParamChange (newDate) {
      const dateParts = newDate.split('-')
      const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
      this.setRegisterDetailDate(date)
    },
    async clear () {
      await this.clearData()
      router.push('/today')
    },
  },
}
</script>
