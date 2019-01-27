<template>
  <div>
    <Markdown :markdown="post.fields.bodyMd" />
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import Markdown from '~/components/Markdown'
const client = createClient()

export default {
  layout: 'post',
  head() {
    return {
      title: `${this.post.fields.title} | Fuya.info`,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: `${this.post.fields.title} | 目黒周辺のFront-end post.`
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content:
            'Meguro.es は 目黒(区|駅)周辺で2か月に1回行われるフロントエンド開発者のpost(勉強会)です。' +
            '目黒周辺にお住まいの方・お勤めの方はもちろんのこと、フロントエンドに興味がある方はどなたでも参加大歓迎です'
        }
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
      ['post', 'diary'].includes(params.category)
    )
  }
}
</script>
