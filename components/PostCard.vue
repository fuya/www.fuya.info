<template>
  <div :class="[$style.card, { [$style.transparent]: transparent }]">
    <div v-if="post.isShortPost" :class="$style.title">
      {{ post.title }}
    </div>
    <nuxt-link v-else :to="path" :class="$style.title">
      {{ post.title }}
    </nuxt-link>
    <div :class="$style.summary">
      {{ post.summary }}
    </div>
    <div :class="$style.meta">
      <span v-if="withCategory" :class="$style.category">
        <nuxt-link :to="categoryPath">
          {{ post.category }}
        </nuxt-link>
      </span>
      <span :class="$style.publishAt">
        {{ post.publishAt | formatDate }}
      </span>
      <span v-for="(tag, i) in post.tag" :key="i" :class="$style.tag">
        <nuxt-link :to="tagPath(tag)">
          {{ tag }}
        </nuxt-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    formatDate: (value) => new Date(value).toLocaleString(),
  },
  props: {
    post: {
      type: Object,
      required: true,
      validate: (post) => post.title,
    },
    transparent: {
      type: Boolean,
      required: false,
      default: false,
    },
    withCategory: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    path() {
      return {
        name: 'category-slug',
        params: {
          category: this.post.category,
          slug: this.post.slug,
        },
      }
    },
    categoryPath() {
      return {
        name: 'category',
        params: {
          category: this.post.category,
        },
      }
    },
    tagPath() {
      return (tag) => ({
        name: 'tags-tag',
        params: {
          tag,
        },
      })
    },
  },
  methods: {
    jumpTo() {
      this.$router.push(this.path)
    },
  },
}
</script>

<style lang="scss" module>
.card {
  display: block;
  margin: 2rem 0 8rem;
  background: $WHITE;
  border-radius: 8px;

  &:link {
    text-decoration: none;
    transition: all 0.6s ease-in;
  }
}

.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-start;
  font-size: $small-font-size;

  .category {
    padding: 0 1rem;
    margin-right: 0.5rem;
    text-transform: capitalize;
    white-space: nowrap;
    background: $DARK_ORANGE;
    border: 1px solid $DARK_ORANGE;
    border-radius: 4px;
    &:hover {
      opacity: 0.7;
    }
    a {
      color: $WHITE;
      text-decoration: none;
    }
  }

  .publishAt {
    margin-right: 0.2rem;
    white-space: nowrap;
  }

  .tag {
    margin: 0 0.2rem;
    white-space: nowrap;
    &:hover {
      opacity: 0.7;
    }
    a {
      color: $DARK_ORANGE;
      text-decoration: none;
    }
  }
}

.title {
  font-size: $huge-font-size;
  font-weight: 100;
}

a.title {
  text-decoration: none;
}

.summary {
  margin: 0.5rem 0;
  overflow: hidden;
  font-size: $small-font-size;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
