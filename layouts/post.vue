<template>
  <div>
    <Header />
    <section>
      <nuxt />
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  head() {
    return {
      script: [
        {
          async: 'async',
          src: 'https://platform.twitter.com/widgets.js',
          charset: 'utf-8'
        }
      ]
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>
