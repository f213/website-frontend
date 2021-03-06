/* eslint-disable object-curly-newline */
module.exports = {
  telemetry: false,

  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'ru',
    },
    titleTemplate: '%s — Фёдор Борщёв',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'Фёдор Борщёв' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=Edge' },
      { property: 'og:site_name', content: 'Блог Фёдора Борщёва' },
      { property: 'fb:admins', content: '100006565443356' },
      { property: 'article:author', content: 'https://facebook.com/Fedor213' },
      { property: 'fb:profile_id', content: '100006565443356' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' },

      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans:400,700&amp;subset=cyrillic" rel="stylesheet' },
      { rel: 'stylesheet', href: '/css/legacy.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/ilyabirman-likely/2.4.0/likely.css' },
    ],
    __dangerouslyDisableSanitizers: ['script'],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/ilyabirman-likely/2.4.0/likely.js' },
      { innerHTML: '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(25756085, "init", { id:25756085, accurateTrackBounce:true, trackHash:true });' },
    ],
  },

  loading: {
    color: '#363636',
    failedColor: '#363636',
    height: '1px',
  },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/bulma.scss',
    '~/assets/vars.css',
    '~/assets/content.css',
    '~/assets/lists.css',
    '~/assets/books.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/ghost-auth.js',
    { src: '~/plugins/ya-metrika.js', ssr: false },
    '~/plugins/jsonld',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/font-awesome',
    '@nuxtjs/redirect-module',
    '@nuxtjs/sentry',
  ],
  buildModules: [
    '@nuxtjs/google-analytics',
  ],
  googleAnalytics: {
    id: 'UA-155215393-1',
  },
  serverMiddleware: [
    '~/middleware/redirect-to-trailing-slash',
  ],
  redirect: [
    { from: '/tags/favorites/', to: '/featured/', statusCode: 301 },
    { from: '/rss/index.xml', to: '/rss/', statusCode: 301 },
    { from: '/book/', to: 'http://savvycal.com/f213/chat', statusCode: 302 },
  ],
  sentry: {
    dsn: 'https://563a1267525f4438bc73cccebd671a15@sentry.io/1865868',
  },
  /*
  ** Axios module configuration
  */
  axios: {
    prefix: '/api/v2/content',
    proxy: true,
  },
  router: {
    extendRoutes(routes) {
      routes = routes.map((route) => (route.path.endsWith('/') ? route : { ...route, path: `${route.path}/` }));
      routes = routes.map((route) => ({ ...route, pathToRegexpOptions: { endsWith: '/', strict: true } }));
      return routes;
    },
  },
  env: {
    ghostAPIKey: process.env.GHOST_API_KEY || '881fcfad416468563d3eec62c1',
    perPage: 5,
    absoluteHost: 'https://borshev.com',
    facebook: 'https://facebook.com/Fedor213',
    youtube: 'https://www.youtube.com/channel/UCO8aN1B8ncJM09rohGvOiCQ',
    telegram: 'https://tgclick.ru/pmdaily/722',
    copyrightYears: '2014–2021',
    email: 'fedor@borshev.com',
    yaMetrikaCounterID: '25756085',
  },

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    postcss: {
      preset: {
        stage: 1,
        features: {
          customProperties: true,
        },
      },
      plugins: {
        'postcss-nested': {},
      },
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
