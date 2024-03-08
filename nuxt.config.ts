import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  // https://nuxt.com/docs/getting-started/deployment#static-hosting
  ssr: true,
  app: {
    baseURL: import.meta.env.VITE_ROOT_PATH,
    head: {
      title: 'data.vlaanderen.be',
      htmlAttrs: {
        lang: 'nl',
      },
      script: [
        { src: 'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-polyfill/dist/index.js', },
        { src: 'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/node_modules/@govflanders/vl-widget-client/dist/index.js' },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        {
          rel: 'icon',
          sizes: '192x192',
          href: 'https://dij151upo6vad.cloudfront.net/2.latest/icons/app-icon/icon-highres-precomposed.png',
        },
        {
          rel: 'apple-touch-icon',
          href: 'https://dij151upo6vad.cloudfront.net/2.latest/icons/app-icon/touch-icon-iphone-precomposed.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '76x76',
          href: 'https://dij151upo6vad.cloudfront.net/2.latest/icons/app-icon/touch-icon-ipad-precomposed.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '120x120',
          href: 'https://dij151upo6vad.cloudfront.net/2.latest/icons/app-icon/touch-icon-iphone-retina-precomposed.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '152x152',
          href: 'https://dij151upo6vad.cloudfront.net/2.latest/icons/app-icon/touch-icon-ipad-retina-precomposed.png',
        },
      ],
    },
  },
  // Alias declaration for easier access to components directory
  alias: {
    "@components": fileURLToPath(new URL('./components', import.meta.url)),
    "@content": fileURLToPath(new URL('./content', import.meta.url)),
    "@constants": fileURLToPath(new URL('./constants', import.meta.url)),
    "@types": fileURLToPath(new URL('./types', import.meta.url)),
  },
  // Global CSS: https://nuxt.com/docs/api/configuration/nuxt-config#css
  css: ['~/css/styles.scss'],
  build: {
    transpile: ['@govflanders/vl-widget-polyfill'],
  },
  // Plugins to run before rendering page: https://nuxt.com/docs/api/configuration/nuxt-config#plugins-1
  plugins: [
    { src: '~/plugins/webcomponents.js', mode: 'client' },
  ],
  // Modules: https://nuxt.com/docs/api/configuration/nuxt-config#modules-1
  modules: [
    // https://github.com/davestewart/nuxt-content-assets
    'nuxt-content-assets', // make sure to add before content!
    // https://content.nuxtjs.org/
    '@nuxt/content',
    // https://i18n.nuxtjs.org/
    '@nuxtjs/i18n',
  ],
  content: {
    documentDriven: true,
    highlight: {
      theme: 'light-plus'
    }
  },
  i18n: {
    //https://i18n.nuxtjs.org/docs/guide#strategies
    strategy: 'no_prefix',
    locales: [
      {
        code: 'nl',
        name: 'NL',
        file: 'nl.json'
      },
      {
        code: 'en',
        name: 'EN',
        file: 'en.json'
      },
    ],
    detectBrowserLanguage: {
      alwaysRedirect: true,
    },
    lazy: false,
    langDir: "locales/",
    defaultLocale: 'nl',
    compilation: {
      strictMessage: false,
      escapeHtml: false
    },
    vueI18n: './i18n.config.ts' // if you are using custom path, default
  }
})