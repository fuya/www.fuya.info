<template>
  <section class="container">
    <Markdown :markdown="entry.fields.bodyMd" />
  </section>
</template>

<script>
/* eslint-disable no-console */
import { createClient } from '~/plugins/contentful.js'
import Markdown from '~/components/Markdown'

const client = createClient()

export default {
  components: { Markdown },
  head() {
    return {
      title: this.entry.fields.title
    }
  },
  asyncData() {
    return client.getEntry('1Fgho4wnhcjP4XW7nDHjU5').then(entry => ({
      entry: entry
    }))
  }
}
</script>
