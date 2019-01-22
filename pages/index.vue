<template>
  <section class="container">
    <span v-html="r" />
  </section>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'

const endpoint = 'https://fuya.prismic.io/api/v2'

export default {
  components: {},
  computed: {
    r() {
      return this.res && PrismicDOM.RichText.asHtml(this.res.data.title)
    }
  },
  asyncData({ params }) {
    return Prismic.getApi(endpoint, {})
      .then(api => api.getSingle('top_page'))
      .then(response => ({
        res: response
      }))
  }
}
</script>

<style>
</style>
