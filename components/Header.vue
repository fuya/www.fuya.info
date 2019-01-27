<template>
  <header :class="$style.header">
    <nuxt-link to="/">
      <h1 :class="$style.siteName">
        Fuya.info
      </h1>
    </nuxt-link>
    <nav :class="$style.nav">
      <nuxt-link to="/about-me">
        About
      </nuxt-link>
      <nuxt-link to="/diary">
        日記
      </nuxt-link>
      <nuxt-link to="/snippets">
        snippets
      </nuxt-link>
    </nav>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" module>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $LIGHT_GRAY;
  @include min-screen($WIDTH_S) {
    padding: 0 1rem;
  }
  @include min-screen($WIDTH_M) {
    padding: 0 2rem;
  }
}

.siteName {
  flex-shrink: 0;
  font-size: $x-large-font-size;
}

.nav {
  display: flex;
  flex-shrink: 1;
  > a {
    margin: 0 0.5rem;
  }
}
</style>
