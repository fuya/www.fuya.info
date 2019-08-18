<template>
  <div>
    <section>
      <h1>Fuya.info</h1>
      <h2>こんにちは! Fuya.infoへようこそ</h2>
      <p>
        Fuya (Fumiya FURUYA) は、Front-End Web Developer
        (Webフロントエンド開発者)を名乗っています。
      </p>
      <p>
        東京都の会社員ですが、フリーでの仕事も募集しています。
        <a href="/old-varrey">どうぞ</a>
      </p>
      <p>
        2009年の大学入学以来、PHP、HTML、CSS、Ruby on
        Rails、jQueryなどを触りながらWeb技術で遊んできました。
        意識の高いことを言うと、 常にコードを書く以外の課題解決も選択肢に入れ、
        総合的に戦えるWebエンジニア を目指しています。
      </p>
    </section>
    <section>
      <h1>最近の投稿</h1>
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
