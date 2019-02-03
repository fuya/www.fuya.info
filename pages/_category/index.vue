<template>
  <div>
    <PostCard v-for="post in posts.items" :key="post.id" :post="post.fields" :with-category="withCategory" />
  </div>
</template>

<script>
import PostCard from '~/components/PostCard'
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  head() {
    return {
      title: `${this.pageTitle} | Fuya.info`,
      link: [
        {
          hid: 'cannonical',
          href: `https://fuya.info/${this.$route.params.category}`
        }
      ]
    }
  },
  components: { PostCard },
  async asyncData({ params, error, payload }) {
    if (payload) {
      return {
        post: payload
      }
    }
    const category = params.category === 'posts' ? undefined : params.category
    const posts = await client.getEntries({
      content_type: 'post',
      'fields.category': category,
      order: '-fields.publishAt'
    })

    return {
      posts
    }
  },
  computed: {
    pageTitle: function() {
      return this.$route.params.category === 'posts'
        ? '記事一覧'
        : `カテゴリ ${this.$route.params.category}`
    },
    withCategory: function() {
      return this.$route.params.category === 'posts'
    }
  },
  validate({ params }) {
    return ['posts', 'diary', 'snippets', 'meetup'].includes(params.category)
  }
}
</script>
