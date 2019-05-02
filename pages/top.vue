<template>
  <div>
    <section>
      <h1>Fuya.info の 最近の投稿</h1>
      <PostCard
        v-for="(post, i) in posts"
        :key="i"
        :post="post.fields"
        with-category
      />
    </section>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { createClient } from '~/plugins/contentful.js'
import PostCard from '~/components/PostCard'

const client = createClient()

export default {
  components: { PostCard },
  asyncData() {
    return Promise.all([
      client.getEntries({
        content_type: 'post',
        order: '-fields.publishAt',
        limit: 5
      })
    ]).then(([posts]) => {
      return {
        posts: posts.items
      }
    })
  }
}
</script>
