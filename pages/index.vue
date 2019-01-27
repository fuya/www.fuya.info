<template>
  <div>
    <section>
      <Markdown :markdown="entry.fields.bodyMd" />
    </section>
    <section>
      <h1>最近の投稿</h1>
      <PostCard v-for="(post, i) in posts" :key="i" :post="post.fields" with-category />
    </section>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { createClient } from '~/plugins/contentful.js'
import Markdown from '~/components/Markdown'
import PostCard from '~/components/PostCard'

const client = createClient()

export default {
  components: { Markdown, PostCard },
  head() {
    return {
      title: this.entry.fields.title
    }
  },
  asyncData() {
    return Promise.all([
      client.getEntry('1Fgho4wnhcjP4XW7nDHjU5'),
      client.getEntries({
        content_type: 'post',
        order: '-fields.publishAt',
        limit: 5
      })
    ]).then(([entry, posts]) => {
      return {
        entry: entry,
        posts: posts.items
      }
    })
  }
}
</script>
