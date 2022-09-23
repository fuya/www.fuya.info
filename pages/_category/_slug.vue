<template>
  <div>
    <div v-scroll="handleScroll" :class="$style.meta">
      <transition
        :enter-class="$style.enterFrom"
        :enter-active-class="$style.enterActive"
        :enter-to-class="$style.enterTo"
      >
        <span v-if="showTitle" :class="$style.title" :title="post.fields.title">
          {{ post.fields.title }}
        </span>
      </transition>
      <nuxt-link :to="{ path: './' }" :class="$style.category">
        {{ post.fields.category }}
      </nuxt-link>
      <span :class="$style.publishAt">
        {{ formatDate(post.fields.publishAt) }}
      </span>
      <nuxt-link
        v-for="(tag, i) in post.fields.tag"
        :key="i"
        :to="tagPath(tag)"
        :class="$style.tag"
      >
        {{ tag }}
      </nuxt-link>
    </div>
    <Markdown :class="$style.post" :markdown="post.fields.bodyMd" />
    <a
      href="https://twitter.com/share?ref_src=twsrc%5Etfw"
      class="twitter-share-button"
      data-size="large"
      data-related="_fuya"
      data-lang="ja"
      data-show-count="false"
    >
      Tweet
    </a>
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import Markdown from '~/components/Markdown'
const client = createClient()

export default {
  components: { Markdown },
  validate({ params }) {
    return (
      /^[-0-9a-z_]+$/.test(params.slug) &&
      ['posts', 'diary', 'snippets', 'meetup', 'voice'].includes(
        params.category
      )
    )
  },
  async asyncData({ params, error, payload }) {
    if (payload) {
      return {
        post: payload,
      }
    }
    const posts = await client.getEntries({
      content_type: 'post',
      'fields.slug': params.slug,
    })

    if (!posts.total) {
      error({ statusCode: 404, message: 'ページが見つかりません' })
    }
    const post = posts.items[0]

    if (!['posts', post.fields.category].includes(params.category)) {
      error({ statusCode: 404, message: 'ページが見つかりません' })
    }

    return {
      post,
    }
  },
  data() {
    return {
      showTitle: false,
    }
  },
  head() {
    return {
      title: `${this.post.fields.title} | Fuya.info`,
      link: [
        {
          hid: 'cannonical',
          href: `https://fuya.info/${this.post.fields.category}/${this.post.fields.slug}/`,
        },
      ],
      script: [
        {
          async: 'async',
          src: 'https://speakerdeck.com/assets/embed.js',
          charset: 'utf-8',
        },
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.post.fields.summary}`,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: `${this.post.fields.title} | Fuya.info`,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: `${this.post.fields.summary || this.post.fields.title}`,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          property: 'og:image',
          content: `https://fuya.info/ogimage/${this.post.fields.slug}.png`,
        },
      ],
    }
  },
  computed: {
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
    handleScroll(t) {
      this.showTitle = window.scrollY > 300
    },
    formatDate(value) {
      return new Date(value).toLocaleDateString()
    },
  },
}
</script>

<style lang="scss" module>
.meta {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  height: $post-meta-stickey-height;
  padding: 2px 0;
  font-size: $small-font-size;
  background: $WHITE;

  .title {
    display: inline-block;
    max-width: 340px;
    margin-right: 0.2rem;
    overflow: hidden;
    font-size: $large-font-size;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .category {
    padding: 0 1rem;
    margin: 0 0.5rem;
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
    margin-right: 0.5rem;
    white-space: nowrap;
  }

  .tag {
    margin-right: 0.5rem;
    color: $DARK_ORANGE;
    text-decoration: none;
    white-space: nowrap;
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
  line-height: 2.2;

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
    top: $post-meta-stickey-height;
    z-index: 100;
    margin: 5rem 0 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: $WHITE;
    @include max-screen($WIDTH_S) {
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
}

.enterActive {
  transition: 0.3s opacity ease-out;
}

.enterFrom {
  opacity: 0;
}

.enterTo {
  opacity: 0.8;
}
</style>
