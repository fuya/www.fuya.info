<template>
  <div>
    <div :class="$style.meta">
      <span :class="$style.title">
        {{ post.fields.title }}
      </span> 
      <nuxt-link :to="{path: './'}" :class="$style.category">
        {{ post.fields.category }}
      </nuxt-link>
      <span :class="$style.publishAt">
        {{ post.fields.publishAt | formatDate }}
      </span>
      <nuxt-link v-for="(tag, i) in post.fields.tag" :key="i" :to="tagPath(tag)" :class="$style.tag">
        {{ tag }}
      </nuxt-link>
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
      script: [
        {
          async: 'async',
          src: 'https://platform.twitter.com/widgets.js',
          charset: 'utf-8'
        },
        {
          async: 'async',
          src: 'https://speakerdeck.com/assets/embed.js',
          charset: 'utf-8'
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.post.fields.summary}`
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: `${this.post.fields.title} | Fuya.info`
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: `${this.post.fields.summary || this.post.fields.title}`
        },
        this.post.fields.ogImage
          ? {
              hid: 'og:image',
              name: 'og:image',
              property: 'og:image',
              content: `${this.post.fields.ogImage.fields.file.url}`
            }
          : {}
      ]
    }
  },
  components: { Markdown },
  computed: {
    tagPath() {
      return tag => ({
        name: 'tags-tag',
        params: {
          tag: tag
        }
      })
    }
  },
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

    if (!['posts', post.fields.category].includes(params.category)) {
      error({ statusCode: 404, message: 'ページが見つかりません' })
    }

    return {
      post
    }
  },
  validate({ params }) {
    return (
      /^[-0-9a-z_]+$/.test(params.slug) &&
      ['posts', 'diary', 'snippets', 'meetup'].includes(params.category)
    )
  }
}
</script>

<style lang="scss" module>
.meta {
  position: sticky;
  top: $header-height;
  @include max-screen($WIDTH_S) {
    top: $header-height / 2;
  }
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

    &:link {
      text-decoration: none;
    }
    &:hover,
    &:active {
      opacity: 0.7;
    }
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
    text-decoration: none;
    white-space: nowrap;
    border: 1px solid $DARK_ORANGE;
    border-radius: 4px;
    &:hover {
      opacity: 0.7;
    }
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
    @include max-screen($WIDTH_S) {
      margin: 3rem 0 1rem;
      font-size: $huge-font-size;
    }
  }
  h2 {
    position: sticky;
    top: $header-height + 32px;
    z-index: 100;
    margin: 5rem 0 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: $WHITE;
    @include max-screen($WIDTH_S) {
      top: $header-height / 2 + 32px;
      margin: 3rem 0 1rem;
      font-size: $x-large-font-size;
    }
  }
  h3 {
    margin: 4rem 0 2rem;
    @include max-screen($WIDTH_S) {
      margin: 2rem 0 1rem;
      font-size: $large-font-size;
    }
  }
  img {
    max-width: 100%;
  }
  code {
    padding: 0 0.25rem;
    margin: 0 0.25rem;
    color: $WHITE;
    background: $DARK_GRAY;
    border-radius: 4px;
  }
  pre {
    padding: 2rem;
    color: $WHITE;
    background: $DARK_GRAY;
    border-radius: 32px 4px 32px 4px;
    code {
      padding: 0;
      margin: 0;
    }
  }
}
</style>
