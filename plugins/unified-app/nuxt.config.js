import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: false,
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-04-03',
  css: [
    'vuetify/dist/vuetify.min.css',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: [
      'unified-form',
      'unified-form-vuetify'
    ]
  },
  watch: [
    'routes.js',
  ],
  vite: {
    ssr: {
      noExternal: [
        'vuetify',
      ],
    },
    define: {
      'process.env.DEBUG': false,
    },
  },
  modules: [
    async (_, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => config.plugins.push(
        vuetify()
      ));
    },
  ],
});
