<script setup lang="ts">
// Корень приложения: общий для всех страниц.
// С появлением app/pages/ Nuxt включает роутер, поэтому контент главной
// переехал в app/pages/index.vue без изменений.

useHead({ bodyAttrs: { class: 'antialiased' } })
</script>

<template>
  <NuxtPage />
</template>
