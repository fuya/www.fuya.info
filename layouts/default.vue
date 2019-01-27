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
  components: {
    Header,
    Footer
  }
}
</script>
