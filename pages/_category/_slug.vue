<template>
  <div>
    <div :class="$style.meta">
      <span :class="$style.title">
        {{ post.fields.title }}
      </span> 
      <span :class="$style.category">
        {{ post.fields.category }}
      </span>
      <span :class="$style.publishAt">
        {{ post.fields.publishAt | formatDate }}
      </span>
      <span v-for="(tag, i) in post.fields.tag" :key="i" :class="$style.tag">
        {{ tag }}
      </span>
    </div>
    <Markdown :class="$style.post" :markdown="post.fields.bodyMd" />
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import Markdown from '~/components/Markdown'
const client = createClient()

export default {
  filters: {
    formatDate: value => new Date(value).toLocaleDateString()
  },
  head() {
    return {
      title: `${this.post.fields.title} | Fuya.info`,
      link: [
        {
          hid: 'cannonical',
          href: `https://fuya.info/${this.post.fields.category}/${
            this.post.fields.slug
          }`
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.post.fields.sumally}`
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: `${this.post.fields.title} | Fuya.info`
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: `${this.post.fields.sumally}`
        },
        this.post.fields.ogImage
          ? {
              hid: 'og:image',
              name: 'og:image',
              content: `${this.post.fields.ogImage.fields.file.url}`
            }
          : {}
      ]
    }
  },
  components: { Markdown },
  async asyncData({ params, error, payload }) {
    if (payload) {
      return {
        post: payload
      }
    }
    const posts = await client.getEntries({
      content_type: 'post',
      'fields.slug': params.slug
    })

    if (!posts.total) {
      error({ statusCode: 404, message: 'ページが見つかりません' })
    }
    const post = posts.items[0]

    if (!['post', post.fields.category].includes(params.category)) {
      error({ statusCode: 404, message: 'ページが見つかりません' })
    }

    return {
      post
    }
  },
  validate({ params }) {
    return (
      /^[-0-9a-z_]+$/.test(params.slug) &&
      ['post', 'diary', 'snippets', 'meetup'].includes(params.category)
    )
  }
}
</script>

<style lang="scss" module>
.meta {
  position: sticky;
  top: $header-height;
  z-index: 2;
  display: flex;
  align-items: center;
  height: $post-meta-stickey-height;
  font-size: $small-font-size;
  background: $WHITE;

  .title {
    max-width: 320px;
    margin-right: 0.2rem;
    overflow: hidden;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

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
    @include max-screen($WIDTH_M) {
      display: none;
    }
  }
}

.post {
  line-height: 2;

  p {
    margin: 2rem 0;
  }
  h1 {
    margin: 5rem 0 2rem;
  }
  h2 {
    position: sticky;
    top: 80px;
    margin: 5rem 0 2rem;
    background: $WHITE;
  }
  h3 {
    margin: 4rem 0 2rem;
  }
  img {
    max-width: 100%;
  }
}
</style>
