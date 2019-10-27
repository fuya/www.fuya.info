<script>
import 'highlight.js/styles/dark.css'

/* eslint-disable vue/no-v-html */
import remark from 'remark'
import html from 'remark-html'
import highlightjs from 'remark-highlight.js'

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
        .data('settings', { footnotes: true })
        .use(highlightjs)
        .use(html)
        .processSync(this.markdown).contents
    }
  },
  created() {
    setTimeout(() => {
      try {
        // eslint-disable-next-line no-undef
        twttr.widgets.load()
      } catch (e) {}
    }, 20)
  }
}
</script>

<template>
  <div class="md" v-html="markdownHTML" />
</template>

<style lang="scss">
.md {
  counter-reset: number;

  .footnote-ref {
    position: relative;
    top: -200px;
    left: -10000px;
    display: inline-block;
    width: 1.8rem;
    color: transparent;
    counter-increment: number;
    opacity: 1;

    &:before {
      position: relative;
      top: 200px;
      left: 10000px;
      margin: 0 0.2rem;
      font-size: $large-font-size;
      font-weight: bold;
      color: $DARK_SKY;
      content: '[' counter(number) ']';
    }
  }

  code {
    line-height: 1.2;
  }
}
</style>
