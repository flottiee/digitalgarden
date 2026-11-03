import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@aezakmiproject/hesoyam/nuxt'],

  css: ['~/assets/css/main.css'],

  // backend API: где Worker ищет FastAPI на проде.
  // Непубличный ключ — браузер НЕ видит адрес и ходит через наш прокси
  // (server/routes/auth + server/routes/api → server/utils/apiProxy.ts).
  runtimeConfig: {
    apiOrigin: 'http://localhost:8000',
  },

  nitro: {
    preset: 'cloudflare_module',
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      // пакеты поставляются как .vue-исходники — их нельзя пре-бандлить
      exclude: ['@aezakmiproject/hesoyam'],
    },
  },

  compatibilityDate: '2026-10-30',

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'Flottiee — визитка',
      meta: [
        {
          name: 'description',
          content: 'Личный сайт-визитка: обо мне, pet-проекты и контакты.',
        },
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Geologica:wght@400;500;600;700&family=Geist+Mono:wght@400;600&display=swap',
        },
      ],
      script: [
        // ставит тему до первой отрисовки, чтобы не было мигания
        {
          innerHTML: `(function(){try{var t=localStorage.getItem('hesoyam-theme')||'dark';if(t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()`,
        },
      ],
    },
  },
})
