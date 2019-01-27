<script>
/* eslint-disable vue/no-v-html */
import remark from 'remark'
import html from 'remark-html'

export default {
  props: {
    markdown: {
      type: String,
      required: true
    }
  },
  computed: {
    markdownHTML() {
      return remark()
        .use(html)
        .processSync(this.markdown).contents
    }
  }
}
</script>

<template>
  <div v-html="markdownHTML" />
</template>
