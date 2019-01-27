import { createClient } from './plugins/contentful.js'
const client = createClient()

module.exports = {
  mode: 'universal',

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
          'Fuya.info は Fuyaのウェブサイトです。いろいろなことを書きます。'
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: `Fuya.info`
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content:
          'Fuya.info は Fuyaのウェブサイトです。いろいろなことを書きます。'
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: 'https://fuya.info/default_og_image.png'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['normalize.css', '~/assets/scss/base.scss'],
  sassResources: ['~/assets/scss/variables.scss'],

  router: {
    middleware: 'redirect_endwith_dothtml'
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-sass-resources-loader'
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
      const vueloader = config.module.rules.find(e => {
        return e.test.toString() === '/\\.vue$/'
      })

      vueloader.options.cssModules = {
        localIdentName:
          process.env.NODE_ENV !== 'production'
            ? '[path]--[local]---[hash:base64:8]'
            : '[hash:base64:8]',
        camelCase: true
      }

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    fallback: true,
    interval: 100,
    routes() {
      return Promise.all([
        client.getEntries({
          content_type: 'post'
        })
      ]).then(([posts]) => {
        return [
          ...posts.items.map(post => [
            {
              route: `${post.fields.category}/${post.fields.slug}`,
              payload: post
            },
            {
              route: `posts/${post.fields.slug}`,
              payload: post
            }
          ])
        ]
      })
    }
  }
}
