<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { CACHE_KEY, CACHE_TTL, CONTRIBUTIONS_URL, contributionCalendar, parseContributions, type Contribution } from '../utils/githubContributions'

const days = ref<Contribution[]>([])
const pending = ref(true)
const error = ref(false)
const selected = ref<Contribution | null>(null)
const now = ref(new Date())
const calendar = computed(() => contributionCalendar(days.value, now.value))
const dateFormat = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
const monthFormat = new Intl.DateTimeFormat('ru-RU', { month: 'short', timeZone: 'UTC' })
let controller: AbortController | undefined
let timer: ReturnType<typeof setInterval> | undefined
let lastAttempt = 0

function description(day: Contribution) {
  return `${dateFormat.format(new Date(day.date))}: ${day.count.toLocaleString('ru-RU')} contributions`
}

const months = computed(() => {
  let previous = ''
  return calendar.value.weeks.map(week => {
    const day = week.find(day => day && day.date.slice(8) === '01') ?? week.find(Boolean)
    const month = day?.date.slice(0, 7) ?? ''
    const label = month !== previous && day ? monthFormat.format(new Date(day.date)).replace('.', '') : ''
    previous = month
    return label
  })
})

async function refresh() {
  if (controller) return
  now.value = new Date()
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null')
    if (cached && Number.isFinite(cached.at) && Date.now() >= cached.at && Date.now() - cached.at < CACHE_TTL) {
      days.value = parseContributions(cached)
      pending.value = false
      error.value = false
      return
    }
  } catch { /* Storage may be unavailable or contain an invalid cache. */ }
  lastAttempt = Date.now()
  pending.value = true
  error.value = false
  controller = new AbortController()
  const timeout = setTimeout(() => controller?.abort(), 15000)
  try {
    const response = await fetch(CONTRIBUTIONS_URL, { signal: controller.signal, credentials: 'omit' })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    days.value = parseContributions(await response.json())
    selected.value = null
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), contributions: days.value }))
    } catch { /* Caching is optional. */ }
  } catch {
    error.value = true
  } finally {
    clearTimeout(timeout)
    controller = undefined
    pending.value = false
  }
}

function refreshIfVisible() {
  if (document.visibilityState === 'visible' && Date.now() - lastAttempt >= CACHE_TTL) void refresh()
}

onMounted(() => {
  void refresh()
  timer = setInterval(refreshIfVisible, CACHE_TTL)
  document.addEventListener('visibilitychange', refreshIfVisible)
})
onBeforeUnmount(() => {
  controller?.abort()
  clearInterval(timer)
  document.removeEventListener('visibilitychange', refreshIfVisible)
})
</script>

<template>
  <section class="github-calendar mt-8 w-full max-w-3xl rounded-2xl border border-border bg-card/80 p-4 text-left backdrop-blur-md sm:p-6" aria-label="Активность GitHub" :aria-busy="pending">
    <div class="flex flex-wrap items-baseline justify-between gap-2">
      <h2 class="text-sm font-medium">GitHub Contributions</h2>
      <a href="https://github.com/flottiee" target="_blank" rel="noopener noreferrer" class="text-xs text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4">@flottiee ↗</a>
    </div>
    <p class="mt-2 text-xs text-muted">Последние 12 месяцев · <template v-if="calendar.days.length">{{ calendar.total.toLocaleString('ru-RU') }} contributions</template><template v-else>публичная активность</template></p>

    <div v-if="pending && !calendar.days.length" role="status" class="flex h-36 items-center justify-center text-sm text-muted">Загружаю активность…</div>
    <div v-else-if="!calendar.days.length && !error" role="status" class="flex h-36 items-center justify-center text-sm text-muted">За этот период данных пока нет.</div>

    <template v-if="calendar.days.length">
      <div class="mt-5 overflow-x-auto pb-2" tabindex="0" role="region" aria-label="Календарь активности; на узких экранах прокручивается горизонтально">
        <div class="calendar-grid" :style="{ gridTemplateColumns: `repeat(${calendar.weeks.length}, minmax(10px, 1fr))` }">
          <span v-for="(month, i) in months" :key="`month-${i}`" class="h-5 overflow-visible whitespace-nowrap text-[10px] text-muted">{{ month }}</span>
          <div v-for="(week, i) in calendar.weeks" :key="i" class="grid gap-[3px]">
            <template v-for="(day, j) in week" :key="day?.date ?? `blank-${j}`">
              <button v-if="day" type="button" class="contribution-cell" :data-level="day.level" :aria-label="description(day)" :title="description(day)" @mouseenter="selected = day" @mouseleave="selected = null" @focus="selected = day" @blur="selected = null" @click="selected = day" @keydown.esc="selected = null" />
              <span v-else class="aspect-square" aria-hidden="true" />
            </template>
          </div>
        </div>
      </div>
      <p class="mt-2 min-h-8 text-xs leading-4 text-muted" aria-live="polite">{{ selected ? description(selected) : calendar.total === 0 ? 'За этот период contributions пока нет.' : 'Наведите на день или коснитесь его, чтобы увидеть подробности.' }}</p>
      <div class="mt-2 flex items-center justify-end gap-1.5 text-[10px] text-muted" aria-label="Интенсивность активности: от меньшей к большей">
        <span>Меньше</span><span v-for="level in 5" :key="level" class="contribution-cell size-2.5" :data-level="level - 1" aria-hidden="true" /><span>Больше</span>
      </div>
    </template>
    <p v-if="error" role="status" class="mt-4 text-xs leading-relaxed text-muted">
      {{ calendar.days.length ? 'Не удалось обновить активность. Показаны ранее загруженные данные.' : 'Не удалось загрузить активность GitHub.' }}
      <button type="button" class="ml-1 underline underline-offset-4 hover:text-foreground disabled:opacity-50" :disabled="pending" @click="refresh">Повторить</button>
    </p>
  </section>
</template>

<style scoped>
.calendar-grid { display: grid; gap: 3px; min-width: 686px; }
.contribution-cell { display: block; aspect-ratio: 1; border-radius: 2px; background: var(--color-border); transition: background-color 200ms; }
.contribution-cell[data-level="1"] { background: color-mix(in srgb, var(--color-foreground) 25%, var(--color-card)); }
.contribution-cell[data-level="2"] { background: color-mix(in srgb, var(--color-foreground) 45%, var(--color-card)); }
.contribution-cell[data-level="3"] { background: color-mix(in srgb, var(--color-foreground) 70%, var(--color-card)); }
.contribution-cell[data-level="4"] { background: var(--color-foreground); }
button.contribution-cell:hover, button.contribution-cell:focus-visible { outline: 2px solid var(--color-foreground); outline-offset: 1px; }
@media (prefers-reduced-motion: reduce) { .contribution-cell { transition: none; } }
</style>
