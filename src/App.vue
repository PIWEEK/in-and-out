<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script>
import coreComponents from './core'

export default {
  name: 'App',
  components: { ...coreComponents },
}
</script>

<style src="./styles/main.css"></style>
