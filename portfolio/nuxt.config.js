import { project } from './config/project.js'

const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/portfolio/'
  }
} : {}

export default {
  ...routerBase,
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  ssr: true,
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: project.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: project.description
      },
      {
        hid: 'og:og:title',
        name: 'og:og:title',
        content: project.name
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: project.description
      },
      {
        hid: 'og:url',
        name: 'og:url',
        content: project.url
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: project.ogImage
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: project.favicon }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    { src: '@/assets/fontawesome/fontawesome.min.css', lang: 'css' },
    { src: '@/assets/icomoon/_icomoon.scss', lang: 'scss' },
    { src: '@/assets/styles/global.scss', lang: 'scss' }
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,

  manifest: {
    title: project.name,
    name: project.name,
    description: project.description,
    lang: project.lang,
    theme_color: project.themeColor
  },

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    ['@nuxtjs/google-analytics', {
      id: 'UA-173944984-1'
    }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    // Doc: https://www.npmjs.com/package/@nuxtjs/style-resources
    '@nuxtjs/style-resources',
    // Doc: https://www.npmjs.com/package/nuxt-webfontloader
    'nuxt-webfontloader',
    // Doc: https://www.npmjs.com/package/nuxt-user-agent
    'nuxt-user-agent',
    // Doc: https://www.npmjs.com/package/vue-scrollto
    'vue-scrollto/nuxt'
  ],
  webfontloader: {
    google: {
      families: [
        'Roboto:300,400,500,700,900&display=swap'
      ]
    }
  },
  styleResources: {
    scss: [
      '@/assets/styles/variables/_fonts.scss',
      '@/assets/styles/variables/_colors.scss',
      '@/assets/styles/variables/_zIndex.scss',
      '@/assets/styles/variables/_mixins.scss'
    ]
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Content module configuration
  ** See https://content.nuxtjs.org/configuration
  */
  content: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
