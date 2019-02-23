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
  data() {
    return {
      markdownHTML: (this.markdownHTML = remark()
        .data('settings', { footnotes: true })
        .use(html)
        .processSync(this.markdown).contents)
    }
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
}
</style>
