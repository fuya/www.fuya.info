<template>
  <div :class="$style.header">
    <header :class="$style.inner">
      <nuxt-link to="/">
        <h1 :class="$style.siteName">
          <img
            :class="$style.image"
            src="~assets/images/fi480.png"
            alt="Fuya.info"
          />
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
  @include max-screen($WIDTH_S) {
    height: $header-height / 2;
  }
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
  padding: 0;
  margin: 0;
  flex-shrink: 0;
  font-size: $x-large-font-size;
  @include max-screen($WIDTH_S) {
    margin: 0.2rem 0;
    font-size: $small-font-size;
  }
}

.image {
  width: 60px;
  @include min-screen($WIDTH_S) {
    width: 120px;
  }
}
</style>
