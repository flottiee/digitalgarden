<script setup lang="ts">
// Свой переключатель темы: сегментированный контрол с солнцем/системой/луной
// и плавно скользящим индикатором. Логика своя, без Tabs из hesoyam.
import { Monitor, Moon, Sun } from '@lucide/vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'flottiee-theme'
const LEGACY_KEY = 'hesoyam-theme'

const options: { value: Theme; title: string; icon: unknown }[] = [
  { value: 'light', title: 'Светлая', icon: Sun },
  { value: 'system', title: 'Системная', icon: Monitor },
  { value: 'dark', title: 'Тёмная', icon: Moon },
]

const theme = ref<Theme>('system')
const index = computed(() => options.findIndex(o => o.value === theme.value))

function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function apply(next: Theme) {
  const resolved = next === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : next
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

function onSystemChange() {
  if (theme.value === 'system')
    apply('system')
}

let media: MediaQueryList | undefined
let offMedia: (() => void) | undefined

onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system')
    theme.value = stored
  apply(theme.value)

  media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', onSystemChange)
  offMedia = () => media?.removeEventListener('change', onSystemChange)
})

onBeforeUnmount(() => offMedia?.())

watch(theme, (next) => {
  localStorage.setItem(STORAGE_KEY, next)
  apply(next)
})

function select(value: Theme) {
  theme.value = value
}
</script>

<template>
  <div
    role="radiogroup"
    aria-label="Тема"
    class="relative flex items-center rounded-full border border-border bg-card/80 p-1 shadow-sm backdrop-blur-md"
  >
    <!-- скользящий индикатор -->
    <span
      aria-hidden="true"
      class="pointer-events-none absolute top-1 h-[calc(100%-8px)] w-9 rounded-full bg-foreground transition-transform duration-300 ease-out"
      :style="{ transform: `translateX(${index * 36}px)` }"
    />
    <button
      v-for="o in options"
      :key="o.value"
      role="radio"
      :aria-checked="theme === o.value"
      :title="o.title"
      class="relative z-1 grid h-9 w-9 place-items-center rounded-full transition-colors duration-200 outline-none"
      :class="theme === o.value ? 'text-background' : 'text-muted hover:text-foreground'"
      @click="select(o.value)"
    >
      <component :is="o.icon" class="size-4" />
    </button>
  </div>
</template>
