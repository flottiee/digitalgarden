<script setup lang="ts">
import { initTheme } from '@aezakmiproject/hesoyam'
import { ME, SKILLS, PROJECTS, LINKS } from '~/data'

// синхронизирует стрелки "светлая/тёмная/системная" с классом на <html>
initTheme()

useHead({
  bodyAttrs: { class: 'antialiased' },
})
</script>

<template>
  <div class="min-h-dvh bg-background text-foreground transition-colors">
    <!-- Переключатель темы -->
    <header class="fixed top-4 right-4 z-10 sm:top-6 sm:right-6">
      <ThemeSwitcher small />
    </header>

    <main class="flex flex-col items-center">
      <!-- Hero -->
      <section class="mx-auto flex w-full max-w-3xl flex-col items-start px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24">
        <Badge class="mb-4" contrast="medium">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Открыт к обучению и новым проектам
        </Badge>

        <h1 class="text-4xl font-bold tracking-tight sm:text-6xl">
          Привет, я <span class="text-accent">{{ ME.name }}</span> 👋
        </h1>
        <p class="text-muted mt-3 text-lg sm:text-xl">{{ ME.role }}</p>
        <p class="mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
          {{ ME.tagline }}
        </p>
        <p class="text-muted mt-2 text-sm sm:text-base">📍 {{ ME.location }}</p>

        <div class="mt-8 flex flex-wrap gap-3">
          <Button href="#contacts">Связаться</Button>
          <Button href="#projects" variant="outline">Pet-проекты</Button>
        </div>
      </section>

      <!-- Навыки -->
      <section id="skills" class="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6">
        <h2 class="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl">
          <span class="text-accent mr-2">#</span>
          Навыки
        </h2>
        <ul class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <li v-for="s in SKILLS" :key="s.name">
            <Card size="sm" class="flex items-center justify-between">
              <CardTitle>{{ s.name }}</CardTitle>
              <Badge contrast="medium">{{ s.level }}</Badge>
            </Card>
          </li>
        </ul>
      </section>

      <!-- Pet-проекты -->
      <section id="projects" class="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6">
        <h2 class="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl">
          <span class="text-accent mr-2">#</span>
          Pet-проекты
        </h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ButtonLink
            v-for="p in PROJECTS"
            :key="p.title"
            :href="p.link"
            variant="outline"
            class="items-start !justify-start text-start"
          >
            <span>
              <CardTitle class="text-foreground">{{ p.title }}</CardTitle>
              <CardDescription class="mt-2 block">{{ p.description }}</CardDescription>
            </span>
          </ButtonLink>
        </div>
      </section>

      <!-- Контакты -->
      <section id="contacts" class="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6">
        <h2 class="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl">
          <span class="text-accent mr-2">#</span>
          Контакты
        </h2>
        <div class="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button
            v-for="l in LINKS"
            :key="l.label"
            :href="l.href"
            variant="outline"
            class="sm:flex-1"
          >
            {{ l.label }}
          </Button>
        </div>
      </section>

      <footer class="text-muted w-full py-8 text-center text-sm">
        © {{ ME.foundedYear }} {{ ME.name }} · flottiee.bond
      </footer>
    </main>
  </div>
</template>
