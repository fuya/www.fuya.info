<template>
  <div>
    <section>
      <Markdown :markdown="entry.fields.bodyMd" />
    </section>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { createClient } from '~/plugins/contentful.js'
import Markdown from '~/components/Markdown'

const client = createClient()

export default {
  components: { Markdown },
  async asyncData({ params, error }) {
    const secretId = params.secret_id
    const entries = await client.getEntries({
      content_type: 'page',
      'fields.slug': `profile_secret_${secretId}`,
    })

    if (!entries.total) {
      error({ statusCode: 404, message: 'ページが見つかりません' })
    }

    const entry = entries.items[0]
    return {
      entry,
    }
  },
  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }],
      title: 'Fuya.info',
    }
  },
}
</script>
