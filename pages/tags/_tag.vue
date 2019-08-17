<template>
  <div>
    <h1>タグ 「{{ $route.params.tag }}」 を含む記事</h1>
    <PostCard
      v-for="post in posts.items"
      :key="post.id"
      :post="post.fields"
      with-category
    />
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
          href: `https://fuya.info/tags/${this.$route.params.tag}/`
        }
      ]
    }
  },
  components: { PostCard },
  computed: {
    pageTitle() {
      return `タグ 「${this.$route.params.tag}」を含む記事`
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
      'fields.tag': params.tag,
      order: '-fields.publishAt'
    })

    return {
      posts
    }
  }
}
</script>
