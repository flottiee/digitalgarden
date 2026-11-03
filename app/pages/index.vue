<script setup lang="ts">
// Свои composables логики темы больше не нужны: ThemeSwitcher самодостаточен.

useHead({
  bodyAttrs: { class: 'antialiased' },
  title: 'flottiee.bond',
})

const spacing = ref(26)
const ambient = ref(false)

function setSpacing(e: Event) {
  spacing.value = Number((e.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="relative flex min-h-dvh flex-col overflow-hidden bg-background text-foreground">
    <!-- Интерактивный фон: точечное поле -->
    <DotField class="absolute inset-0 h-full w-full" :spacing="spacing" :ambient="ambient" />

    <!-- Переключатель темы -->
    <header class="fixed top-4 right-4 z-10 sm:top-6 sm:right-6">
      <ThemeSwitcher />
    </header>

    <main class="relative z-[1] flex flex-1 flex-col items-center justify-center px-6 text-center">
      <h1 class="text-5xl font-semibold tracking-tight sm:text-7xl">
        flottiee<span class="text-muted">.bond</span>
      </h1>
      <p class="text-muted mt-4 max-w-sm text-base leading-relaxed sm:text-lg">
        Страница собирается. Пока здесь почти пусто — но не совсем.
      </p>
      <p class="text-muted/70 mt-10 text-xs tracking-wide sm:text-sm">
        водите курсором · покликайте · крутите настройки внизу
      </p>
    </main>

    <!-- Панель управления полем -->
    <section
      class="relative z-[1] mx-auto mb-4 flex w-full max-w-md flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl border border-border bg-card/80 px-5 py-4 backdrop-blur-md sm:justify-between"
      aria-label="Настройки фона"
    >
      <label class="flex items-center gap-3">
        <span class="text-muted text-xs whitespace-nowrap">плотность</span>
        <input
          type="range"
          min="16"
          max="44"
          step="1"
          :value="spacing"
          class="h-1 w-32 cursor-pointer appearance-none rounded-full bg-border sm:w-36 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:shadow-sm"
          @input="setSpacing"
        >
      </label>

      <button
        type="button"
        role="switch"
        :aria-checked="ambient"
        class="group flex items-center gap-2 outline-none"
        @click="ambient = !ambient"
      >
        <span class="text-muted text-xs">дыхание</span>
        <span
          class="relative inline-flex h-5 w-9 items-center rounded-full bg-border transition-colors duration-300"
          :class="ambient && 'bg-foreground'"
        >
          <span
            class="absolute left-0.5 size-4 rounded-full bg-background shadow-sm transition-transform duration-300 ease-out"
            :class="ambient && 'translate-x-4'"
          />
        </span>
      </button>
    </section>

    <footer class="relative z-[1] w-full pb-6 text-center text-xs">
      <span class="text-muted">© {{ new Date().getFullYear() }} flottiee</span>
    </footer>
  </div>
</template>
