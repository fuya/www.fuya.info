<template>
  <div>
    <PostCard v-for="post in posts.items" :key="post.id" :post="post.fields" />
  </div>
</template>

<script>
import PostCard from '~/components/PostCard'
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  head() {
    return {
      title: `カテゴリ ${this.$route.params.category} | Fuya.info`,
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
    const category = params.category === 'post' ? undefined : params.category
    const posts = await client.getEntries({
      content_type: 'post',
      'fields.category': category
    })

    return {
      posts
    }
  },
  validate({ params }) {
    return ['post', 'diary', 'snippets', 'meetup'].includes(params.category)
  }
}
</script>
