// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
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
  router: {
    options: {
      // 讓 NuxtLink 可以套用 .active 的樣式
      linkActiveClass: "active",
      linkExactActiveClass: "active",
    },
  },
  modules: ["@nuxt/icon", "nuxt-swiper", "@nuxtjs/google-fonts"],
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
