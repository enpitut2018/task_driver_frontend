module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'task_driver',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/earlyaccess/notosansjp.css' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.5.0/css/all.css', integrity: 'sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU', crossorigin: 'anonymous' }
    ]
  },
  css: [
    '~/static/stylesheets/style.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  /*
  **
  */
  modules: [
    ['nuxt-sass-resources-loader', [
      '@/assets/sass/foundation/variable.scss',
      '@/assets/sass/foundation/mixin.scss',
      '@/assets/sass/global.scss',
    ]],
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo',
    '@nuxtjs/pwa',
  ],

  manifest: {
    name: 'Folivora',
    lang: 'ja',
    short_name: 'Foli',
    description: 'ナマケモノ',
    start_url: '/'
  },

  workbox: {
    skipwaiting: true,
    clientsClaim: true,
    dev: true
  },

  axios: {
    baseURL:  process.env.NODE_ENV == 'production' ? 'https://task-driver.sukiyaki.party/v1' : 'http://localhost:3001/v1'
  },

  apollo: {
    errorHandler (error) {
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    },
    clientConfigs: {
      default: {
        httpEndpoint: process.env.NODE_ENV == 'production' ? 'https://task-driver.sukiyaki.party/v1/' : 'http://localhost:3001/v1/',
        httpLinkOptions: {
          fetchOptions: { mode: 'cors' },
        },
      },
    },
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  watchers: {
    webpack: {
      poll: 500
    }
  }
}

