<template>
  <div>
    <section>
      <h1 :class="$style.sectionTitle">
        Fuya.info
      </h1>
      <p>
        Fuya (Fumiya FURUYA) は、Front-End Web Developer
        (Webフロントエンド開発者)を名乗っています。
      </p>
      <p>
        東京都の会社員ですが、フリーでの仕事も募集しています。
        <a href="/old-valley">どうぞ</a>
      </p>
      <p>
        2009年の大学入学以来、PHP、HTML、CSS、Ruby on
        Rails、jQueryなどを触りながらWeb技術で遊んできました。
        意識の高いことを言うと、 常にコードを書く以外の課題解決も選択肢に入れ、
        総合的に戦えるWebエンジニア を目指しています。
      </p>
    </section>
    <section>
      <h1 :class="$style.sectionTitle">
        最近の投稿
      </h1>
      <PostCard
        v-for="(post, i) in posts"
        :key="i"
        :post="post.fields"
        with-category
      />
    </section>
    <small :class="$style.analytics">
      ※このサイトでは、Google Analytics
      を利用し、cookieを用いた情報収集をしています
    </small>
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
        limit: 10
      })
    ]).then(([posts]) => {
      return {
        posts: posts.items
      }
    })
  }
}
</script>

<style lang="scss" module>
.sectionTitle {
  font-size: $x-huge-font-size;
  font-weight: 300;
}

.analytics {
  font-size: $x-small-font-size;
}
</style>
