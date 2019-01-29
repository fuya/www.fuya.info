<template>
  <nuxt-link :to="path" :class="$style.card">
    <div :class="$style.title">
      {{ post.title }}
    </div>
    <div :class="$style.summary">
      {{ post.summary }}
    </div>
    <div :class="$style.meta">
      <span v-if="withCategory" :class="$style.category">
        {{ post.category }}
      </span>
      <span :class="$style.publishAt">
        {{ post.publishAt | formatDate }}
      </span>
      <span v-for="(tag, i) in post.tag" :key="i" :class="$style.tag">
        {{ tag }}
      </span>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  filters: {
    formatDate: value => new Date(value).toLocaleString()
  },
  props: {
    post: {
      type: Object,
      required: true,
      validate: post => post.title
    },
    withCategory: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    path() {
      return {
        name: 'category-slug',
        params: {
          category: this.post.category,
          slug: this.post.slug
        }
      }
    }
  }
}
</script>

<style lang="scss" module>
.card {
  display: block;
  padding: 1rem 2rem;
  margin: 2rem 0;
  color: $DARK_SKY;
  background: $WHITE;
  border: 2px solid $LIGHT_GRAY;
  border-radius: 8px;

  &:link {
    text-decoration: none;
    transition: all 0.6s ease-in;
  }

  &:hover,
  &:active {
    color: inherit;
    background: $REAL_WHITE;
    border: 2px solid $GRAY;
    opacity: 0.8;
    transition: all 0.2s ease-in;
  }
}

.title {
  margin-bottom: 1rem;
  font-size: $x-large-font-size;
  font-weight: bold;
  color: $DARK_ORANGE;
}

.summary {
  margin: 0.5rem 0;
  overflow: hidden;
  font-size: $x-small-font-size;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: $small-font-size;

  .category {
    padding: 0.125rem 0.5rem;
    margin-right: 0.2rem;
    font-weight: bold;
    color: $WHITE;
    text-transform: capitalize;
    white-space: nowrap;
    background: $DARK_ORANGE;
    border: 1px solid $DARK_ORANGE;
    border-radius: 4px;
  }

  .publishAt {
    margin-right: 0.2rem;
    font-weight: bold;
    white-space: nowrap;
  }

  .tag {
    padding: 0.125rem 0.25rem;
    margin-right: 0.2rem;
    color: $DARK_ORANGE;
    white-space: nowrap;
    border: 1px solid $DARK_ORANGE;
    border-radius: 4px;
  }
}
</style>
