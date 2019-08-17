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
    return client.getEntry('1ZQ894eJ8V0QsNHivH4STq').then(entry => ({
      entry
    }))
  }
}
</script>
