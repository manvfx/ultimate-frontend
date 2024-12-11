export default defineNuxtConfig({
  extends: [
    './domains/auth',
    './domains/admin',
    './plugins/unified-app/',
    './plugins/unified-network/',
  ],

  routeRules: {
    '/**': { ssr: false },
  },

  compatibilityDate: '2024-08-27',
});