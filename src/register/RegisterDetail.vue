<template>
  <div class="h-full p-8 flex flex-col">
    <div class="text-4xl text-center text-primary pb-2 mb-4">
      {{ dateObject | date }}
    </div>
    <div class="flex-1">
      <div class="text-3xl">
        <div class="flex pb-2">
          <FaIcon icon="play-circle" class="mr-4 text-primary" />
          <div class="flex-1">
            <div class="text-xl">
              Hora de entrada
            </div>
            {{ start | hourAndMinute }}
          </div>
        </div>
        <div v-if="pauses.length" class="flex pt-2">
          <FaIcon icon="pause-circle" class="mr-4 text-primary" />
          <div class="flex-1">
            <div class="text-xl">
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
        <div class="flex pt-2">
          <FaIcon icon="stop-circle" class="mr-4 text-primary" />
          <div class="flex-1">
            <div class="text-xl">
              Hora de salida
            </div>
            {{ end | hourAndMinute }}
          </div>
        </div>
      </div>
      <div class="my-4 pt-4 text-xl border-t border-gray-600">
        <span class="ml-12">Total</span>
        <div class="text-3xl text-center text-primary">
          {{ duration | duration }}
        </div>
      </div>
    </div>
    <div>
      <RegisterMonthCalendar
        :records="allRecords"
        @date-click="goToRegisterDetail"
      />
    </div>
    <div class="text-center pt-4">
      <BaseButton
        kind="secondary"
        class="w-full"
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

import RegisterMonthCalendar from '@/components/RegisterMonthCalendar'

function formatDateParam (date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export default {
  name: 'RegisterDetail',
  components: { RegisterMonthCalendar },
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
      allRecords: 'registerRecordsList',
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
    goToRegisterDetail (date) {
      this.$router.push({
        name: 'register-detail',
        params: { date: formatDateParam(date) },
      })
    },
    async clear () {
      await this.clearData()
      router.push('/today')
    },
  },
}
</script>
