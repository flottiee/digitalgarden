<script setup lang="ts">
/**
 * Недельная сетка: колонки — дни недели, строки — 24 часа.
 * События — абсолютные плитки: позиция строго по минутам события
 * (17:20 не «прилипает» к часам), пересечения раскладываются по дорожкам.
 */
import { Plus, Trash2 } from '@lucide/vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { ScheduleEventItem } from '~/composables/useApi'

const HOUR = 48 // px на один час — вся геометрия сетки отсюда

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

// --- раскладка плиток --------------------------------------------------------

interface Tile {
  ev: ScheduleEventItem
  top: number
  height: number
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
  return raw.map(({ ev, s, e, lane }) => {
    const top = ((s - dayStartMs) / 3_600_000) * HOUR
    const h = ((Math.min(e, dayEndMs) - s) / 3_600_000) * HOUR
    return {
      ev,
      lane,
      lanes,
      top,
      height: Math.max(h, 20),
      ranOver: e > dayEndMs - 1,
      startText: fmtTime(ev.starts_at),
      endText: ev.ends_at ? fmtTime(ev.ends_at) : '',
    }
  })
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

const laneStyle = (t: Tile) => {
  const w = 100 / t.lanes
  return {
    top: `${t.top}px`,
    height: `${t.height}px`,
    left: `calc(${t.lane * w}% + 3px)`,
    width: `calc(${w}% - 6px)`,
  }
}

// --- линия «сейчас» и подсветка сегодня --------------------------------------

const todayKey = computed(() => dateKey(now.value))

const nowTop = computed(() => {
  const d = new Date(now.value)
  d.setHours(0, 0, 0, 0)
  return ((+now.value - +d) / 3_600_000) * HOUR
})

// --- стартовый скролл: открываем день с ~7 утра ------------------------------

const scroller = ref<HTMLElement | null>(null)
watch(
  () => props.days[0]?.dateKey,
  () => {
    if (scroller.value)
      scroller.value.scrollTop = 7 * HOUR - 20
  },
  { immediate: true },
)
</script>

<template>
  <div
    ref="scroller"
    class="mt-6 max-h-[calc(100dvh-150px)] overflow-auto overscroll-contain rounded-2xl border border-border bg-card/40"
  >
    <div
      class="grid min-w-[760px]"
      :style="{ gridTemplateColumns: `52px repeat(${days.length}, minmax(92px, 1fr))`, gridTemplateRows: 'auto 1fr' }"
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
      <div class="sticky left-0 z-20 col-start-1 row-start-2 border-r border-border/60 bg-card/95 backdrop-blur-sm">
        <div class="relative" :style="{ height: `${HOUR * 24}px` }">
          <span
            v-for="h in 24"
            :key="h"
            class="text-muted absolute left-2 text-[10px] tabular-nums"
            :style="{ top: `${(h - 1) * HOUR}px`, transform: 'translateY(-50%)' }"
          >
            {{ String(h - 1).padStart(2, '0') }}
          </span>
        </div>
      </div>

      <!-- колонки дней -->
      <div
        v-for="d in days"
        :key="d.dateKey"
        class="relative row-start-2 border-l border-border/60"
        :class="dateKey(d.date) === todayKey && 'bg-foreground/[0.03]'"
        :style="{ height: `${HOUR * 24}px` }"
      >
        <!-- часовые линии -->
        <div class="pointer-events-none absolute inset-0">
          <div v-for="h in 23" :key="h" class="absolute w-full border-t border-border/40" :style="{ top: `${h * HOUR}px` }" />
        </div>

        <!-- плитки событий -->
        <article
          v-for="t in tilesByDay.get(d.dateKey)"
          :key="t.ev.id"
          class="absolute z-1 cursor-pointer overflow-hidden rounded-lg border bg-card text-foreground shadow-sm"
          :class="[
            editing ? 'cursor-pointer hover:border-foreground/50' : 'cursor-default border-border',
            pendingDelete === t.ev.id && editing ? 'border-foreground ring-1 ring-foreground/20' : '',
          ]"
          :style="laneStyle(t)"
          :title="`${t.startText}${t.endText ? ` – ${t.endText}` : ''} · ${t.ev.title}`"
          @click="editing && emit('edit', t.ev)"
        >
          <!-- компактная при <40px, полная при высокой -->
          <div v-if="t.height >= 40 && !editing" class="flex flex-col gap-0.5 px-1.5 py-1 text-left">
            <span class="text-muted text-[9px] tabular-nums leading-none">
              {{ t.startText }}{{ t.endText ? ` – ${t.endText}` : '' }}{{ t.ranOver ? ' …' : '' }}
            </span>
            <span class="truncate text-xs leading-tight">{{ t.ev.title }}</span>
            <span v-if="t.ev.description && t.height >= 96" class="text-muted/80 line-clamp-2 text-[10px] leading-snug">
              {{ t.ev.description }}
            </span>
          </div>
          <div v-else-if="!editing" class="flex items-center justify-center px-1 text-center">
            <span class="text-muted truncate text-[9px] tabular-nums" :class="t.height >= 26 && 'text-foreground'">
              {{ t.startText }} {{ t.ev.title }}
            </span>
          </div>

          <!-- режим правки: клик по плитке — форма, мусорка справа -->
          <div v-if="editing" class="flex h-full flex-col items-start gap-0.5 px-1.5 py-1">
            <span class="text-muted text-[9px] tabular-nums leading-none">
              {{ t.startText }}{{ t.endText ? ` – ${t.endText}` : '' }}
            </span>
            <button
              type="button"
              :title="pendingDelete === t.ev.id ? 'Точно удалить?' : 'Удалить'"
              class="absolute top-0.5 right-0.5 grid size-6 place-items-center rounded text-muted outline-none transition-colors hover:text-foreground"
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
          :style="{ top: `${nowTop}px` }"
        >
          <div class="h-px bg-accent" />
          <div class="absolute -top-1 left-0 size-2 rounded-full bg-accent" />
        </div>
      </div>
    </div>
  </div>
</template>

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
