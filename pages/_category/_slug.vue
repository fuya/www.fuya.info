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
      ['post', 'diary'].includes(params.category)
    )
  }
}
</script>
