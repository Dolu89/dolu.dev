// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-10-02',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      script: [
        { src: "https://embed.twentyuno.net/js/app.js" }
      ]
    }
  },

  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.includes('lightning-widget')
        }
      }
    }
  },

  modules: ['@nuxt/content'],
  content: {
  }
})