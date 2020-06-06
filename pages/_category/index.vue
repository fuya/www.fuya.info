<template>
  <div>
    <h1>
      <template v-if="isAllPostPage">
        記事一覧
      </template>
      <template v-else>
        カテゴリ「{{ $route.params.category }}」の記事
      </template>
    </h1>

    <PostCard
      v-for="post in posts.items"
      :key="post.id"
      :post="post.fields"
      :with-category="isAllPostPage"
    />
    <Paging :current-page="currentPageNumber" :total-page="totalPageCount" />
  </div>
</template>

<script>
import PostCard from '~/components/PostCard'
import Paging from '~/components/Paging'
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

const POST_PER_PAGE = 7

export default {
  components: { PostCard, Paging },
  computed: {
    pageTitle() {
      return this.$route.params.category === 'posts'
        ? '記事一覧'
        : `カテゴリ ${this.$route.params.category}`
    },
    isAllPostPage() {
      return this.$route.params.category === 'posts'
    },
    currentPageNumber() {
      return +this.$route.query.page || 1
    },
    totalPageCount() {
      return Math.ceil(this.posts.total / POST_PER_PAGE)
    },
    hasNextPage() {
      return this.currentPageNumber < this.totalPageCount
    },
    nextPage() {
      return {
        name: this.$route.name,
        query: { page: this.currentPageNumber + 1 }
      }
    }
  },
  async asyncData({ params, query, error, payload }) {
    if (payload) {
      return {
        post: payload
      }
    }
    const category = params.category === 'posts' ? undefined : params.category
    const posts = await client.getEntries({
      content_type: 'post',
      'fields.category': category,
      order: '-fields.publishAt',
      skip: ((query.page || 1) - 1) * POST_PER_PAGE,
      limit: POST_PER_PAGE
    })

    return {
      posts
    }
  },
  watchQuery: ['page'],
  head() {
    return {
      title: `${this.pageTitle} | Fuya.info`,
      link: [
        {
          hid: 'cannonical',
          href: `https://fuya.info/${this.$route.params.category}/`
        }
      ]
    }
  },
  validate({ params }) {
    return ['posts', 'diary', 'snippets', 'meetup', 'voice'].includes(
      params.category
    )
  }
}
</script>
