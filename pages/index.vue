<template>
  <section class="container">
    {{ entry.fields.title }}
  </section>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  components: {},
  head() {
    return {
      title: this.entry,
      meta: [
        { hid: 'description', name: 'description', content: this.entry },
        { hid: 'og:image', name: 'og:image', content: this.entry }
      ]
    }
  },
  asyncData() {
    return client.getEntry('1Fgho4wnhcjP4XW7nDHjU5').then(entry => ({
      entry: entry
    }))
  }
}
</script>

<style>
</style>
