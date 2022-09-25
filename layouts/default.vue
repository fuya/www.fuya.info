<template>
  <div>
    <Header />
    <section :class="$style.main">
      <nuxt />
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Footer,
  },
  head() {
    return {
      script: [
        {
          async: 'async',
          src: 'https://platform.twitter.com/widgets.js',
          charset: 'utf-8',
        },
      ],
    }
  },
}
</script>

<style lang="scss" module>
.main {
  padding: 0 1.5rem;

  @include min-screen($WIDTH_M) {
    max-width: $WIDTH_M;
    padding: 0 2rem;
    margin: 0 auto;
  }
}
</style>
