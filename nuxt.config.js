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
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
  ],
  axios: {
    baseURL: 'http://localhost:3001/v1'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/users/sign_in', method: 'post' },
          logout: { url: '/users/sign_out', method: 'delete' },
          user: { url: '/users/current' }
        }
      }
    }
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

