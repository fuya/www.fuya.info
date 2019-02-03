<template>
  <nav :class="[$style[design]]">
    <ul>
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
</template>

<script>
export default {
  props: {
    design: {
      required: true,
      type: String,
      validate: val => ['header', 'footer'].includes(val)
    }
  }
}
</script>

<style lang="scss" module>
.header {
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    li {
      display: inline-block;
      a {
        display: block;
        padding: 1rem;
      }
      &:not(:last-of-type):after {
        margin: 0 1rem;
      }
    }
  }
}

.footer {
  margin: 1rem 0;
  font-size: $x-small-font-size;
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    li {
      display: inline;
      &:not(:last-of-type):after {
        margin: 0 1rem;
        content: '|';
      }
    }
  }
}
</style>
