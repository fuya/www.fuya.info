<template>
  <footer :class="$style.footer">
    <small :class="$style.copyRight">
      Copyright &copy; 2019 Fuya.
    </small>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" module>
.footer {
  margin: 2rem auto;
  text-align: center;
}
.copyRight {
  font-size: $tiny-font-size;
}
</style>
