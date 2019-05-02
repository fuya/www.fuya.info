<template>
  <div :class="$style.wrap">
    <section :class="[$style.section, $style.hero]">
      <div :class="$style.heroHGroup">
        <h1 :class="$style.heroHeading">
          Fuya.info
        </h1>
        <h2 :class="$style.heroSubHeading">
          Fumiya FURUYA
        </h2>
      </div>
      <div :class="$style.heroPosts">
        <PostCard
          v-for="(post, i) in posts"
          :key="i"
          :post="post.fields"
          with-category
          transparent
        />
      </div>
    </section>
    <section id="about" name="about" :class="[$style.about]">
      <h1 :class="$style.aboutHeading">
        ~ Frontend Web Developer ~
      </h1>
      <h2 :class="$style.aboutSubHeading">
        こんにちは! Fuya.infoへようこそ
      </h2>
      <p :class="$style.paragraph">
        Fuya (Fumiya FURUYA) は、Front-End Web Developer
        (Webフロントエンド開発者)を名乗っています。
        会社員ですが、フリーでの仕事も募集しています。
        <nuxt-link to="/old-valley">
          どうぞ
        </nuxt-link>
      </p>
      <p :class="$style.paragraph">
        2009年の大学入学以来、PHP、HTML、CSS、Ruby on
        Rails、jQueryなどを触りながらWeb技術で遊んできました。
        意識の高いことを言うと、
        常にコードを書く以外の課題解決も選択肢に入れ、総合的に戦えるエンジニア
        を目指しています。
      </p>
      <p :class="$style.paragraph">
        今年は、 しっかり休むことで倍の濃さで働く を目標にしています。
      </p>
      <p :class="$style.paragraph">
        この背景の写真は、自分で撮ったものをけっこう圧縮しています
      </p>
    </section>
    <div :class="[$style.skill]">
      Skill is undefined!
    </div>
    <div :class="[$style.section, $style.footer]">
      <div>
        <a
          href="https://twitter.com/_fuya"
          target="_blank"
          rel="noopener noreferrer"
          :class="$style.socialIcon"
        >
          <img
            src="~/assets/images/icon/Twitter_Social_Icon_Circle_Color.png"
            width="64px"
            height="64px"
          />
        </a>
        <a
          href="https://github.com/fuya"
          target="_blank"
          rel="noopener noreferrer"
          :class="$style.socialIcon"
        >
          <img
            src="~/assets/images/icon/GitHub-Mark-120px-plus.png"
            width="64px"
            height="64px"
          />
        </a>
      </div>
      <small :class="$style.copyright">
        <span :class="$style.copyrightText">Copyright </span>
        &copy; 2019 Fuya.
      </small>
    </div>
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import PostCard from '~/components/PostCard'

const client = createClient()

export default {
  layout: 'index',
  head() {
    return {
      title: 'Fuya.info'
    }
  },
  components: { PostCard },
  asyncData() {
    return Promise.all([
      client.getEntries({
        content_type: 'post',
        limit: 3,
        order: '-fields.publishAt'
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
@mixin text-shadow($_shadowColor: rgba($WHITE, 0.08), $_shadowSize: 1px) {
  text-shadow: $_shadowSize $_shadowSize 0 $_shadowColor,
    -1 * $_shadowSize -1 * $_shadowSize 0 $_shadowColor,
    -1 * $_shadowSize $_shadowSize 0 $_shadowColor,
    $_shadowSize -1 * $_shadowSize 0 $_shadowColor,
    0px $_shadowSize 0 $_shadowColor, 0 -1 * $_shadowSize 0 $_shadowColor,
    -1 * $_shadowSize 0 0 $_shadowColor, $_shadowSize 0 0 $_shadowColor;
}

.section {
  position: sticky;
  top: $header-height;
  @include max-screen($WIDTH_S) {
    top: $header-height / 2;
  }
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: url(~assets/images/photo1.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  height: 1080px;
  max-height: calc(100vh - #{$header-height});

  @include max-screen($WIDTH_S) {
    display: block;
    max-height: calc(100vh - #{$header-height / 2});
  }

  &:after {
    position: absolute;
    color: $GRAY;
    bottom: 2rem;
    right: 2rem;
    font-size: 3rem;
    content: '↓';
    animation: scroll-arrow 2s 5s infinite;
    opacity: 0;
  }

  @keyframes scroll-arrow {
    0% {
      opacity: 0;
      transform: translateY(-30px);
    }
    100% {
      opacity: 0.5;
      transform: translateY(0px);
    }
  }
}

.heroHGroup {
  margin: 0 24px;
}

.heroHeading {
  margin: 0;
  font-size: 4rem;
  color: $GRAY;
  @include text-shadow();

  @include max-screen($WIDTH_S) {
    font-size: 3rem;
  }
}

.heroSubHeading {
  margin: 0;
  font-size: 3rem;
  color: $GRAY;
  opacity: 0.25;
  @include text-shadow();

  @include max-screen($WIDTH_S) {
    font-size: 2.5rem;
  }
}

.heroPosts {
  margin: 0 48px;
  width: 580px;
  flex-grow: 10;
  flex-shrink: 10;
  overflow: hidden;
  opacity: 0;
  animation: growl 2s 5s forwards;

  @include max-screen($WIDTH_M) {
    & > *:not(:first-child) {
      display: none;
    }
  }

  @include max-screen($WIDTH_S) {
    width: 80vw;
  }

  @keyframes growl {
    0% {
      opacity: 0;
      transform: translateX(30px);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }
}

.about {
  position: relative;
  padding: 3rem 2rem;
  min-height: 1080px;
  color: $WHITE;
  z-index: 0;

  &:before {
    position: absolute;
    display: block;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-image: url(~assets/images/photo2.jpg);
    background-size: cover;
    background-repeat: no-repeat;
  }

  &:after {
    position: absolute;
    display: block;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background: rgba($BLACK, 0.7);
  }
}

.aboutHeading {
  margin: 0;
  font-size: 3rem;
  @include text-shadow();

  @include max-screen($WIDTH_S) {
    display: none;
  }
}

.aboutSubHeading {
  margin: 0;
}

.skill {
  position: relative;
  padding: 3rem 2rem;
  min-height: 1080px;
  color: $WHITE;
  z-index: 0;

  &:before {
    position: absolute;
    display: block;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background-image: url(~assets/images/photo3.jpg);
    background-size: cover;
    background-repeat: no-repeat;
  }

  &:after {
    position: absolute;
    display: block;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    background: rgba($BLACK, 0.7);
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 2rem;
  background: $GRAY;
  color: $WHITE;
}

.socialIcon {
  display: inline-block;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.copyrightText {
  display: inline;
  @include max-screen($WIDTH_M) {
    display: none;
  }
}

.paragraph {
  margin: 0;
  padding: 1rem 0;
  line-height: 1.8;
  font-size: $large-font-size;
}
</style>
