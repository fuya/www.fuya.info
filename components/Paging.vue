<template>
  <span>
    <nuxt-link
      v-for="i in endPage - beginPage + 1"
      :key="i"
      role="link"
      :class="[
        $style.page,
        {
          [$style.current]: currentPage === i - 1 + beginPage,
        },
      ]"
      :to="page(i - 1 + beginPage)"
    >
      {{ i - 1 + beginPage }}
    </nuxt-link>
  </span>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    beginPage() {
      return Math.max(1, this.currentPage - 3)
    },
    endPage() {
      return Math.min(this.currentPage + 3, this.totalPage)
    },
  },
  methods: {
    page(pageNumber) {
      return {
        query: { page: pageNumber },
      }
    },
  },
}
</script>

<style lang="scss" module>
a.page:link {
  display: inline-block;
  width: 2rem;
  padding: 0.5rem;
  margin-right: 1rem;
  text-align: center;
  text-decoration: none;
  border: 1px solid $DARK_SKY;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
  }
  &.current {
    color: $WHITE;
    background: rgba($LIGHT_GRAY, 0.4);
  }
}
</style>
