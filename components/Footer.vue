<template>
  <footer :class="$style.footer">
    <a
      href="https://twitter.com/share?ref_src=twsrc%5Etfw"
      class="twitter-share-button"
      data-size="large"
      data-related="_fuya"
      data-lang="ja"
      data-show-count="false"
    >
      Tweet
    </a>
    <Menu design="footer" />
    <small :class="$style.copyRight">
      Copyright &copy; 2019 Fuya.
    </small>
  </footer>
</template>

<script>
import Menu from '~/components/Menu'

export default {
  components: { Menu }
}
</script>

<style lang="scss" module>
.footer {
  margin: 4rem auto 0;
  padding: 0 2rem;
  text-align: center;
  @include max-screen($WIDTH_M) {
    margin: 4rem auto;
  }
}

.copyRight {
  font-size: $small-font-size;
}
</style>
