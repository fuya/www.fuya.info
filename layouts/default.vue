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
    Footer
  }
}
</script>

<style lang="scss" module>
.main {
  padding: 0 4px;
  @include min-screen($WIDTH_S) {
    padding: 0 1rem;
  }
  @include min-screen($WIDTH_M) {
    padding: 0 2rem;
  }
}
</style>
