<template>
  <div>
    <section>
      <Markdown :markdown="entry.fields.bodyMd" />
    </section>
  </div>
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
      title: this.entry.fields.title + ' | Fuya.info'
    }
  },
  asyncData() {
    return client.getEntry('6R2ONst8fLaqdjlNpxi2Fj').then(entry => ({
      entry: entry
    }))
  }
}
</script>
