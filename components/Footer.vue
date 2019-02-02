<template>
  <footer :class="$style.footer">
    <nav :class="$style.nav">
      <ul>
        <li>
          <nuxt-link to="/">
            Fuya.info
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about-me">
            About
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/diary">
            日記
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/snippets">
            snippets
          </nuxt-link>
        </li>
      </ul>
    </nav>
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
  margin: 4rem auto 0;
  text-align: center;
}

.nav {
  margin: 1rem 0;
  font-size: $x-small-font-size;
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  li {
    display: inline;
    &:not(:last-of-type):after {
      margin: 0 1rem;
      content: '|';
    }
  }
}

.copyRight {
  font-size: $small-font-size;
}
</style>
