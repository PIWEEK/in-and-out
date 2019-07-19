<template>
  <div class="flex flex-wrap rounded">
    <div
      v-for="dateData in monthDatesData"
      :key="dateData.instance.toString()"
      class="p-1 border border-tertiary flex flex-col"
      :class="{
        'cursor-pointer': !dateData.isFuture,
        [`w-1/${daysPerWeek}`]: daysPerWeek,
      }"
      @click="!dateData.isFuture && handleDateClick(dateData)"
    >
      <div
        class="text-xs leading-none pb-1"
        :class="{
          'text-primary': !dateData.isFuture,
        }"
      >
        {{ dateData.date }}
      </div>
      <div class="self-end text-secondary">
        <FaIcon
          class="block"
          :class="{ 'text-transparent': dateData.isFuture }"
          :icon="['fas', dateData.icon]"
        />
      </div>
    </div>
  </div>
</template>

<script>
const today = new Date()
const todayMonth = today.getMonth()
const todayYear = today.getFullYear()

export default {
  name: 'RegisterMonthCalendar',
  props: {
    records: {
      type: Array,
      default () { return [] },
    },
    month: {
      type: Number,
      default () { return todayMonth },
    },
    daysPerWeek: {
      type: Number,
      default: 7,
    },
  },
  computed: {
    monthDatesData () {
      const indexModif = (new Date(todayYear, this.month, 1)).getDay() - 1
      const weeks = 6 + (indexModif < 5 ? -1 : 0)
      return Array(7 * weeks).fill()
        .map((v, i) => new Date(todayYear, this.month, (i + 1) - indexModif))
        .filter(date =>
          this.daysPerWeek === 7 || (date.getDay() && date.getDay() < this.daysPerWeek + 1)
        )
        .map(date => ({
          instance: date,
          icon: this.getDateIcon(date),
          date: date.getDate(),
          isFuture: date > today,
        }))
    },
  },
  methods: {
    getDateIcon () {
      let icon = 'plus'
      return icon
    },
    handleDateClick (dateData) {
      this.$emit('date-click', dateData.instance)
    },
  },
}
</script>
