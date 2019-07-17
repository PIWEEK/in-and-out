<template>
  <div>
    Day: {{ date }}
  </div>
</template>

<script>
export default {
  name: 'RegisterDetail',
  props: {
    date: {
      type: String,
      required: true,
    },
  },
}
</script>
