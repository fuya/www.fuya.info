<script>
import 'highlight.js/styles/dark.css'

/* eslint-disable vue/no-v-html */
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import rehypeHighlight from 'rehype-highlight'
import remarkFrontmatter from 'remark-frontmatter'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import rehypeStringify from 'rehype-stringify'

export default {
  props: {
    markdown: {
      type: String,
      required: true,
    },
  },
  data() {
    return { markdownHTML: '' }
  },
  watch: {
    markdown() {
      this.updateMarkdown()
    },
  },
  created() {
    setTimeout(() => {
      try {
        // eslint-disable-next-line no-undef
        twttr.widgets.load()
      } catch (e) {}
      this.updateMarkdown()

    }, 20)
  },
  methods: {
    async updateMarkdown() {
      const t = await unified()
        .use(remarkParse)
        .use(remarkFrontmatter)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(this.markdown)
      this.markdownHTML = t.value
    },
  },
}
</script>

<template>
  <div class="md" v-html="markdownHTML" />
</template>

<style lang="scss">
.md {
  counter-reset: number;

  code {
    line-height: 1.2;
  }
}
</style>
