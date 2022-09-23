import { defineNuxtConfig } from '@nuxt/bridge'
import { createClient } from './plugins/contentful.js'
const client = createClient()

export default defineNuxtConfig({
  ssr: false,
  target: 'static',

  env: {
    CONTENTFUL_HOST: process.env.CONTENTFUL_HOST,
    CONTENTFUL_TOKEN: process.env.CONTENTFUL_TOKEN,
  },

  /*
   ** Headers of the page
   */
  head: {
    title: 'Fuya.info',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Fuya.info は Fuyaのウェブサイトです。いろいろなことを書きます。',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        property: 'og:title',
        content: `Fuya.info`,
      },
      {
        hid: 'og:description',
        name: 'og:description',
        property: 'og:description',
        content:
          'Fuya.info は Fuyaのウェブサイトです。いろいろなことを書きます。',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        property: 'og:image',
        content: 'https://fuya.info/default_og_image.png',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        property: 'twitter:card',
        content: 'summary',
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        property: 'twitter:site',
        content: '@_fuya',
      },
    ],
    link: [
      {
        hid: 'alternate',
        rel: 'alternate',
        type: 'application/rss+xml',
        href: 'https://fuya.info/feed.rss',
        title: 'RSS2.0',
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['normalize.css', '~/assets/scss/base.scss'],
  styleResources: {
    scss: ['~/assets/scss/variables.scss'],
  },

  router: {
    middleware: 'redirect_endwith_dothtml',
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/scroll.js'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/feed',
    '@nuxtjs/sitemap',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-25035763-1',
      },
    ],
    '@/modules/ogp',
  ],

  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // ctx.loaders.cssModules.localIdentName =
      //   process.env.NODE_ENV === 'development'
      //     ? '[path]--[local]---[hash:base64:7]'
      //     : '_[hash:base64:7]'
      // https://github.com/nuxt/nuxt.js/issues/5030
      ctx.loaders.cssModules.camelCase = true
    },
  },
  buildModules: ['@nuxtjs/eslint-module'],
  generate: {
    fallback: true,
    interval: 100,
    async routes() {
      const posts = await client.getEntries({
        content_type: 'post',
      })

      const t = [
        posts.items.map((post) => [
          {
            route: `${post.fields.category}/${post.fields.slug}/`,
            payload: post,
          },
          {
            route: `posts/${post.fields.slug}/`,
            payload: post,
          },
        ]),
        ['/posts/', '/diary/', '/snippets/', '/meetup/', '/voice/'],
      ]
        .flat(Infinity)
        .map((o) => {
          console.log(o)
          if (typeof o === 'string') return o
          return `/${o.route}`
        })
        .map((s) => {
          if (s.endsWith('/')) {
            return s.slice(0, -1)
          }
          return s
        })
      return t
    },
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://fuya.info',
    cacheTime: 1000 * 60 * 60 * 3,
    routes() {
      return client
        .getEntries({
          content_type: 'post',
        })
        .then((posts) =>
          [
            posts.items.map((post) => [
              `/${post.fields.category}/${post.fields.slug}/`,
              `/posts/${post.fields.slug}/`,
            ]),
            ['/posts/', '/diary/', '/snippets/', '/meetup/', '/voice/'],
          ].flat(Infinity)
        )
    },
  },
  feed: [
    {
      path: '/feed.rss',
      async create(feed) {
        feed.options = {
          title: 'Fuya.info',
          link: 'https://fuya.info/feed.rss',
          description: 'Fuya のブログです。日記や技術記事などを書きます。',
        }
        const posts = await client.getEntries({
          content_type: 'post',
          order: '-fields.publishAt',
          limit: 10,
        })
        posts.items.forEach((post) =>
          feed.addItem({
            title: post.fields.title,
            id: post.fields.slug,
            link: `https://fuya.info/${post.fields.category}/${post.fields.slug}/`,
            description: post.fields.summary || '',
            date: new Date(post.fields.publishAt),
            image: `https://fuya.info/ogimages/${post.fields.slug}.png`,
          })
        )
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
  ],
})
