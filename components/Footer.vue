<template>
  <footer :class="$style.footer">
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
  text-align: center;
}

.copyRight {
  font-size: $small-font-size;
}
</style>
