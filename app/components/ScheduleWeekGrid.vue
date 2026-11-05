<script setup lang="ts">
/**
 * Недельная сетка: колонки — дни недели, строки — 24 часа.
 * События — цветные плитки, позиционируемые в % от суток:
 * точные минуты (17:20 не «прилипает» к часам). Пересечения
 * раскладываются по дорожкам.
 *
 * Геометрия на % позволяет: большой экран — вся сетка без скролла,
 * маленький — час держит минимальную высоту и появляется скролл.
 */
import { Plus, Trash2 } from '@lucide/vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { ScheduleEventItem } from '~/composables/useApi'

const MIN_HOUR = 40 // px на один час минимум на малых экранах (включает скролл)

export interface WeekDay {
  weekday: string
  daynum: number
  dateKey: string
  date: Date
}

const props = defineProps<{
  days: WeekDay[]
  events: ScheduleEventItem[]
  editing: boolean
  pendingDelete: string | null
}>()

const emit = defineEmits<{
  (e: 'edit' | 'remove', ev: ScheduleEventItem): void
  (e: 'create', date: Date): void
}>()

// --- текущее время (обновляем раз в минуту — «линия сейчас») ----------------

const now = ref(new Date())
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  timer = setInterval(() => (now.value = new Date()), 30_000)
})
onBeforeUnmount(() => clearInterval(timer))

const fmtTime = (iso: string) =>
  new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' }).format(new Date(iso))

const dateKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

// --- цвет плитки: стабильный по id события ----------------------------------

// оттенки подобраны приглушёнными, тоника через color-mix с токенами темы
const HUES = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#3b82f6', '#8b5cf6', '#ec4899']

function colorClass(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i++)
    hash = (hash * 31 + id.charCodeAt(i)) | 0
  return `sw${Math.abs(hash) % HUES.length}`
}

// --- раскладка плиток --------------------------------------------------------

interface Tile {
  ev: ScheduleEventItem
  topFrac: number // 0..1 доля суток
  heightFrac: number
  lane: number
  lanes: number
  ranOver: boolean // заканчивается за полночь — визуально обрезаем
  startText: string
  endText: string
}

function layout(events: ScheduleEventItem[], dayStartMs: number): Tile[] {
  const dayEndMs = dayStartMs + 86_400_000
  const sorted = [...events].sort((a, b) => +new Date(a.starts_at) - +new Date(b.starts_at))
  const laneEnds: number[] = []
  const raw = sorted.map((ev) => {
    const s = +new Date(ev.starts_at)
    const e = ev.ends_at ? +new Date(ev.ends_at) : Math.min(s + 3_600_000, dayEndMs)
    let lane = laneEnds.findIndex(end => end <= s)
    if (lane === -1) {
      lane = laneEnds.length
      laneEnds.push(e)
    }
    else {
      laneEnds[lane] = e
    }
    return { ev, s, e, lane }
  })
  const lanes = Math.max(laneEnds.length, 1)
  return raw.map(({ ev, s, e, lane }) => ({
    ev,
    lane,
    lanes,
    topFrac: (s - dayStartMs) / 86_400_000,
    heightFrac: (Math.min(e, dayEndMs) - s) / 86_400_000,
    ranOver: e > dayEndMs - 1,
    startText: fmtTime(ev.starts_at),
    endText: ev.ends_at ? fmtTime(ev.ends_at) : '',
  }))
}

const tilesByDay = computed(() => {
  const map = new Map<string, Tile[]>()
  for (const day of props.days) {
    const d = new Date(day.date)
    d.setHours(0, 0, 0, 0)
    const dayEvents = props.events.filter((ev) => {
      const s = +new Date(ev.starts_at)
      return s >= +d && s < +d + 86_400_000
    })
    map.set(day.dateKey, layout(dayEvents, +d))
  }
  return map
})

const laneStyle = (t: Tile) => ({
  top: `${t.topFrac * 100}%`,
  height: `${t.heightFrac * 100}%`,
  minHeight: '20px',
  left: `calc(${(t.lane * 100) / t.lanes}% + 3px)`,
  width: `calc(${100 / t.lanes}% - 6px)`,
})

// --- линия «сейчас» и подсветка сегодня --------------------------------------

const todayKey = computed(() => dateKey(now.value))

const nowTopFrac = computed(() => {
  const d = new Date(now.value)
  d.setHours(0, 0, 0, 0)
  return (+now.value - +d) / 86_400_000
})

// --- стартовый скролл: открываем день с ~7 утра ------------------------------

const scroller = ref<HTMLElement | null>(null)
watch(
  () => props.days[0]?.dateKey,
  () => {
    if (scroller.value)
      scroller.value.scrollTop = (7 / 24) * MIN_HOUR * 24 - 20
  },
  { immediate: true },
)
</script>

<template>
  <div
    ref="scroller"
    class="mt-6 flex max-h-[calc(100dvh-160px)] min-h-[360px] w-full flex-col overflow-auto overscroll-contain rounded-2xl border border-border bg-card/40 lg:mt-3 lg:min-h-0 lg:max-h-none lg:flex-1"
  >
    <div
      class="grid min-w-[760px] flex-1"
      :style="{
        gridTemplateColumns: `52px repeat(${days.length}, minmax(92px, 1fr))`,
        gridTemplateRows: 'auto 1fr',
      }"
    >
      <!-- шапка: уголок -->
      <div class="sticky top-0 left-0 z-30 border-r border-border/60 bg-card" />

      <!-- шапка: дни -->
      <div
        v-for="d in days"
        :key="`${d.dateKey}-head`"
        class="sticky top-0 z-20 flex items-center justify-center gap-1.5 border-l border-border/60 bg-card/95 py-2.5 backdrop-blur-sm"
      >
        <span class="text-muted text-[10px] tracking-wide uppercase">{{ d.weekday }}</span>
        <span
          class="grid size-6 place-items-center rounded-full text-xs tabular-nums"
          :class="dateKey(d.date) === todayKey ? 'bg-foreground font-medium text-background' : 'text-muted'"
        >
          {{ d.daynum }}
        </span>
        <button
          v-if="editing"
          type="button"
          title="Добавить событие на этот день"
          class="text-muted outline-none transition-colors hover:text-foreground"
          @click="emit('create', d.date)"
        >
          <Plus class="size-3.5" />
        </button>
      </div>

      <!-- левая колонка: подписи часов -->
      <div class="sticky left-0 z-20 col-start-1 row-start-2 min-h-[960px] border-r border-border/60 bg-card/95 backdrop-blur-sm lg:min-h-0">
        <div class="relative h-full">
          <span
            v-for="h in 24"
            :key="h"
            class="text-muted absolute left-2 text-[10px] tabular-nums"
            :style="{ top: `${((h - 1) / 24) * 100}%`, transform: 'translateY(-50%)' }"
          >
            {{ String(h - 1).padStart(2, '0') }}
          </span>
        </div>
      </div>

      <!-- колонки дней -->
      <div
        v-for="d in days"
        :key="d.dateKey"
        class="relative row-start-2 min-h-[960px] border-l border-border/60 lg:min-h-0"
        :class="dateKey(d.date) === todayKey && 'bg-foreground/[0.03]'"
      >
        <!-- часовые линии -->
        <div class="pointer-events-none absolute inset-0">
          <div v-for="h in 23" :key="h" class="absolute w-full border-t border-border/40" :style="{ top: `${(h / 24) * 100}%` }" />
        </div>

        <!-- плитки событий -->
        <article
          v-for="t in tilesByDay.get(d.dateKey)"
          :key="t.ev.id"
          class="absolute z-1 overflow-hidden rounded-lg border text-foreground shadow-sm"
          :class="[
            colorClass(t.ev.id),
            editing ? 'cursor-pointer hover:brightness-110' : 'cursor-default',
            pendingDelete === t.ev.id && editing ? 'ring-1 ring-foreground/40' : '',
          ]"
          :style="laneStyle(t)"
          :title="`${t.startText}${t.endText ? ` – ${t.endText}` : ''} · ${t.ev.title}`"
          @click="editing && emit('edit', t.ev)"
        >
          <!-- полная при >=14% суток (~3.4 часа), средняя при >=8%, компактная ниже -->
          <div v-if="t.heightFrac >= 0.14 && !editing" class="flex flex-col gap-0.5 px-1.5 py-1 text-left">
            <span class="time text-[9px] tabular-nums leading-none">
              {{ t.startText }}{{ t.endText ? ` – ${t.endText}` : '' }}{{ t.ranOver ? ' …' : '' }}
            </span>
            <span class="truncate text-xs leading-tight">{{ t.ev.title }}</span>
            <span v-if="t.ev.description && t.heightFrac >= 0.3" class="line-clamp-2 text-[10px] leading-snug opacity-70">
              {{ t.ev.description }}
            </span>
          </div>
          <div v-else-if="!editing" class="flex items-center justify-center px-1 text-center">
            <span class="time truncate text-[9px] tabular-nums">
              {{ t.startText }} {{ t.ev.title }}
            </span>
          </div>

          <!-- режим правки: клик по плитке — форма, мусорка справа -->
          <div v-if="editing" class="flex h-full flex-col items-start gap-0.5 px-1.5 py-1">
            <span class="time text-[9px] tabular-nums leading-none">
              {{ t.startText }}{{ t.endText ? ` – ${t.endText}` : '' }}
            </span>
            <button
              type="button"
              :title="pendingDelete === t.ev.id ? 'Точно удалить?' : 'Удалить'"
              class="del absolute top-0.5 right-0.5 grid size-6 place-items-center rounded outline-none"
              @click.stop="emit('remove', t.ev)"
            >
              <Trash2 class="size-3" />
            </button>
          </div>
        </article>

        <!-- линия «сейчас» -->
        <div
          v-if="dateKey(d.date) === todayKey"
          class="pointer-events-none absolute left-0 right-0 z-10"
          :style="{ top: `${nowTopFrac * 100}%` }"
        >
          <div class="h-px bg-accent" />
          <div class="absolute -top-1 left-0 size-2 rounded-full bg-accent" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Плитки: тоника через color-mix с токенами темы — сами цвета адаптируются
   под светлую и тёмную тему, жёстких hex-значений в тексте нет.
   Классы глобальные (не scoped), т.к. генерируются из JS. */
.sw0 { background: color-mix(in srgb, #ef4444 20%, var(--color-card)); border-color: color-mix(in srgb, #ef4444 48%, var(--color-card)); color: color-mix(in srgb, #ef4444 60%, var(--color-foreground)); }
.sw1 { background: color-mix(in srgb, #f97316 20%, var(--color-card)); border-color: color-mix(in srgb, #f97316 48%, var(--color-card)); color: color-mix(in srgb, #f97316 60%, var(--color-foreground)); }
.sw2 { background: color-mix(in srgb, #eab308 20%, var(--color-card)); border-color: color-mix(in srgb, #eab308 48%, var(--color-card)); color: color-mix(in srgb, #eab308 60%, var(--color-foreground)); }
.sw3 { background: color-mix(in srgb, #22c55e 20%, var(--color-card)); border-color: color-mix(in srgb, #22c55e 48%, var(--color-card)); color: color-mix(in srgb, #22c55e 60%, var(--color-foreground)); }
.sw4 { background: color-mix(in srgb, #14b8a6 20%, var(--color-card)); border-color: color-mix(in srgb, #14b8a6 48%, var(--color-card)); color: color-mix(in srgb, #14b8a6 60%, var(--color-foreground)); }
.sw5 { background: color-mix(in srgb, #3b82f6 20%, var(--color-card)); border-color: color-mix(in srgb, #3b82f6 48%, var(--color-card)); color: color-mix(in srgb, #3b82f6 60%, var(--color-foreground)); }
.sw6 { background: color-mix(in srgb, #8b5cf6 20%, var(--color-card)); border-color: color-mix(in srgb, #8b5cf6 48%, var(--color-card)); color: color-mix(in srgb, #8b5cf6 60%, var(--color-foreground)); }
.sw7 { background: color-mix(in srgb, #ec4899 20%, var(--color-card)); border-color: color-mix(in srgb, #ec4899 48%, var(--color-card)); color: color-mix(in srgb, #ec4899 60%, var(--color-foreground)); }

/* время внутри плитки чуть блёклее, но остаётся в той же гаме */
article .time {
  color: color-mix(in srgb, currentColor 78%, var(--color-card));
}

/* мусорка: нейтральная в общем токе плитки */
article .del {
  color: color-mix(in srgb, currentColor 80%, var(--color-card));
}
article .del:hover {
  color: var(--color-foreground);
}
</style>

<style scoped>
/* приятная прокрутка: тонкий браунованный борд вместо жирных нативных скроллов */
::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}
::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-border) 100%, transparent);
}
::-webkit-scrollbar-track {
  background: transparent;
}
</style>
