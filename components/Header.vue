<template>
  <div :class="$style.header">
    <header :class="$style.inner">
      <nuxt-link to="/">
        <h1 :class="$style.siteName">
          Fuya.info
        </h1>
      </nuxt-link>
      <Menu design="header" />
    </header>
  </div>
</template>

<script>
import Menu from '~/components/Menu'

export default {
  components: { Menu }
}
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

    a {
      &:link {
        color: $DARK_SKY;
        text-decoration: none;
      }

      &:hover {
        color: $DARK_SKY;
        text-decoration: underline;
      }

      &:active,
      &:focus {
        color: $SKY;
      }
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
