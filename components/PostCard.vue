<template>
  <nuxt-link :to="path" :class="$style.card">
    <div :class="$style.title">
      {{ post.title }}
    </div>
    <div :class="$style.summary">
      {{ post.summary }}
    </div>
    <div :class="$style.meta">
      <span :class="$style.publishAt">{{ post.publishAt | formatDate }}</span>
      <span v-for="(tag, i) in post.tag" :class="$style.tag" :key="i">
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
  background: $WHITE;
  border: 2px solid $LIGHT_GRAY;
  border-radius: 8px;
  transition: background 0.2s ease-in;

  &:link {
    text-decoration: none;
  }

  &:hover,
  &:active {
    background: $REAL_WHITE;
    border: 2px solid $GRAY;
    opacity: 0.8;
  }
}

.title {
  margin: 0.5rem 0;
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

  .publishAt {
    margin-right: 1rem;
    font-weight: bold;
    white-space: nowrap;
  }

  .tag {
    padding: 0.25rem 0.5rem;
    margin: 0 0.2rem;
    color: $DARK_ORANGE;
    white-space: nowrap;
    border: 1px solid $DARK_ORANGE;
    border-radius: 4px;
  }
}
</style>
