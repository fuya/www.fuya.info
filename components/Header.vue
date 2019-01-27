<template>
  <div :class="$style.header">
    <header :class="$style.inner">
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
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" module>
.header {
  position: sticky;
  top: 0;
  z-index: 3;
  height: $header-height - 1px;
  background: $WHITE;
  border-bottom: 1px solid $LIGHT_GRAY;
  @include min-screen($WIDTH_S) {
    padding: 0 1rem;
  }
  @include min-screen($WIDTH_M) {
    padding: 0 2rem;
  }
  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
    @include min-screen($WIDTH_L) {
      max-width: $WIDTH_L + 240px;
    }
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
