<template>
  <section class="container">
    {{ entry.fields.title }}
    ---
    {{ /* eslint-disable-next-line vue/no-v-html */}}
    <div v-html="bodyHTML" />
  </section>
</template>

<script>
/* eslint-disable no-console */
import { createClient } from '~/plugins/contentful.js'
import remark from 'remark'
import html from 'remark-html'

const client = createClient()

export default {
  components: {},
  computed: {
    bodyHTML() {
      return remark()
        .use(html)
        .processSync(this.entry.fields.bodyMd).contents
    }
  },
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
