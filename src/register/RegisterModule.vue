<template>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RegisterModule',
  created () {
    this.fetchUserRecords()
  },
  methods: mapActions(['fetchUserRecords']),
}
</script>
