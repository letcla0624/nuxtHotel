// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-21",
  devtools: { enabled: true },
  app: {
    head: {
      // 要改變的內容
      title: "享樂酒店｜Enjoyment Luxury Hotel",
    },
  },
  // 全域套用的 scss 樣式
  css: ["@/assets/styles/all.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // 自定義的 scss 變數樣式，修改 Bootstrap 預設樣式
          additionalData: `@import "@/assets/styles/_variables.scss";`,
        },
      },
    },
  },
  modules: [
    "@nuxt/icon",
    "nuxt-swiper",
    "@nuxtjs/google-fonts",
    "@samk-dev/nuxt-vcalendar",
  ],
  googleFonts: {
    families: {
      "Noto+Serif+TC": {
        wght: "200..900",
      },
    },
  },
  icon: {
    serverBundle: {
      collections: ["mdi", "ic", "bi"],
    },
  },
});
