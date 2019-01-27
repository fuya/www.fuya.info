<template>
  <header :class="$style.header">
    <a href="/">
      <h1 :class="$style.siteName">
        Fuya.info
      </h1>
    </a>
    <nav :class="$style.nav">
      <a href="">
        About
      </a>
      <a href="">
        日記
      </a>
      <a href="">
        snippets
      </a>
      <a href="">
        リンク
      </a>
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
