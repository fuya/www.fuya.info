import { createClient } from './plugins/contentful.js'
const client = createClient()

module.exports = {
  mode: 'universal',

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
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
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
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

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

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
  generate: {
    fallback: true,
    interval: 100,
    routes() {
      return Promise.all([
        client.getEntries({
          content_type: 'post',
        }),
      ]).then(([posts]) => {
        return [
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
        ].flat(Infinity)
      })
    },
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://fuya.info',
    cacheTime: 1000 * 60 * 60 * 3,
    generate: true,
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
}
