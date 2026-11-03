<script setup lang="ts">
import { ChevronLeft, ChevronRight, LogOut, Pencil, Plus, Trash2, X } from '@lucide/vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { extractApiError, useApiClient, type ScheduleEventItem, type UserItem } from '~/composables/useApi'

useHead({ title: 'Расписание — flottiee.bond' })

const api = useApiClient()

// --- авторизация -----------------------------------------------------------

const user = ref<UserItem | null>(null)
const authState = ref<'pending' | 'ready' | 'down'>('pending')
const authTab = ref<'login' | 'register'>('login')
const authError = ref<string | null>(null)
const creds = reactive({ email: '', password: '' })

async function checkAuth() {
  try {
    user.value = await api<UserItem>('/auth/me')
    authState.value = 'ready'
  }
  catch (error) {
    const { response, statusCode } = error as { response?: { status?: number }, statusCode?: number }
    if (response?.status === 401 || statusCode === 401) {
      user.value = null
      authState.value = 'ready'
    }
    else {
      authState.value = 'down' // сеть/сервер недоступны, отличаем от «не вошёл»
    }
  }
}

async function submitAuth() {
  authError.value = null
  try {
    user.value = await api<UserItem>(`/auth/${authTab.value}`, {
      method: 'POST',
      body: { email: creds.email, password: creds.password },
    })
    creds.password = ''
  }
  catch (error) {
    authError.value = extractApiError(error)
  }
}

async function logout() {
  await api('/auth/logout', { method: 'POST' }).catch(() => null)
  user.value = null
  events.value = []
}

// --- режим просмотра и навигация по датам ----------------------------------

type Mode = 'day' | 'week'
const mode = ref<Mode>('day')
const anchor = ref(new Date())
const editing = ref(false) // «карандашик»: включает режим правки

const startOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const addDays = (d: Date, n: number): Date => {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}
const startOfWeek = (d: Date) => {
  const s = startOf(d)
  return addDays(s, -((s.getDay() + 6) % 7)) // понедельник
}

const range = computed(() => {
  const from = mode.value === 'day' ? startOf(anchor.value) : startOfWeek(anchor.value)
  const days = mode.value === 'day' ? 1 : 7
  return { from, to: addDays(from, days) }
})

const isToday = computed(() => startOf(anchor.value).getTime() === startOf(new Date()).getTime())

const dayTitle = computed(() =>
  new Intl.DateTimeFormat('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' }).format(anchor.value))

const weekTitle = computed(() => {
  const fmt = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' })
  return `${fmt.format(range.value.from)} — ${fmt.format(addDays(range.value.to, -1))}`
})

const periodTitle = computed(() => (mode.value === 'day' ? dayTitle.value : weekTitle.value))

function shift(dir: -1 | 1) {
  anchor.value = addDays(anchor.value, dir * (mode.value === 'day' ? 1 : 7))
}

// --- данные событий --------------------------------------------------------

const events = ref<ScheduleEventItem[]>([])
const loadError = ref(false)

async function load() {
  if (!user.value)
    return
  loadError.value = false
  try {
    events.value = await api<ScheduleEventItem[]>('/api/events', {
      params: {
        from_at: range.value.from.toISOString(),
        to: range.value.to.toISOString(),
      },
    })
  }
  catch {
    loadError.value = true
  }
}

watch(range, load)
watch(user, load)

// --- группировка для отображения -------------------------------------------

const dateKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

const weekDays = computed(() => {
  if (mode.value !== 'week')
    return []
  const fmt = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' })
  const monday = startOfWeek(anchor.value)
  return Array.from({ length: 7 }, (_, i) => {
    const d = addDays(monday, i)
    return { label: `${fmt.format(d)}, ${d.getDate()}`, dateKey: dateKey(d), date: d }
  })
})

const byDate = computed(() => {
  const map = new Map<string, ScheduleEventItem[]>()
  for (const ev of events.value) {
    const key = dateKey(new Date(ev.starts_at))
    map.set(key, [...(map.get(key) ?? []), ev])
  }
  return map
})

// --- время ------------------------------------------------------------------

const fmtTime = (iso: string) =>
  new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' }).format(new Date(iso))

const fmtRange = (ev: ScheduleEventItem) => {
  const start = fmtTime(ev.starts_at)
  return ev.ends_at ? `${start} – ${fmtTime(ev.ends_at)}` : start
}

const toLocalInput = (iso: string) => {
  const d = new Date(iso)
  return `${dateKey(d)}T${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

// --- форма события ----------------------------------------------------------

const formOpen = ref(false)
const editingId = ref<string | null>(null)
const formError = ref<string | null>(null)
const form = reactive({
  title: '',
  description: '',
  startsAt: '',
  endsAt: '',
})

function openCreate(date?: Date) {
  editingId.value = null
  formError.value = null
  form.title = ''
  form.description = ''
  const base = date ?? anchor.value
  form.startsAt = `${dateKey(base)}T09:00`
  form.endsAt = ''
  formOpen.value = true
}

function openEdit(ev: ScheduleEventItem) {
  editingId.value = ev.id
  formError.value = null
  form.title = ev.title
  form.description = ev.description ?? ''
  form.startsAt = toLocalInput(ev.starts_at)
  form.endsAt = ev.ends_at ? toLocalInput(ev.ends_at) : ''
  formOpen.value = true
}

function closeForm() {
  formOpen.value = false
  editingId.value = null
  formError.value = null
}

async function submitEvent() {
  formError.value = null
  if (!form.title.trim()) {
    formError.value = 'Заполните название'
    return
  }
  const starts = new Date(form.startsAt)
  const ends = form.endsAt ? new Date(form.endsAt) : null
  if (Number.isNaN(starts.getTime()) || (ends && ends.getTime() <= starts.getTime())) {
    formError.value = 'Конец должен быть позже начала'
    return
  }
  const body = {
    title: form.title.trim(),
    description: form.description.trim() || null,
    starts_at: starts.toISOString(),
    ends_at: ends?.toISOString() ?? null,
  }
  try {
    await (editingId.value
      ? api(`/api/events/${editingId.value}`, { method: 'PATCH', body })
      : api('/api/events', { method: 'POST', body }))
    closeForm()
    await load()
  }
  catch (error) {
    formError.value = extractApiError(error)
  }
}

// --- удаление (двухшаговое подтверждение) -----------------------------------

const pendingDelete = ref<string | null>(null)

async function removeEvent(ev: ScheduleEventItem) {
  if (pendingDelete.value !== ev.id) {
    pendingDelete.value = ev.id
    return
  }
  pendingDelete.value = null
  events.value = events.value.filter(e => e.id !== ev.id)
  await api(`/api/events/${ev.id}`, { method: 'DELETE' }).catch(() => load())
  await load()
}

function toggleEdit() {
  editing.value = !editing.value
  pendingDelete.value = null
}

// --- старт -------------------------------------------------------------------

onMounted(checkAuth)
</script>

<template>
  <div class="flex min-h-dvh flex-col bg-background text-foreground">
    <header class="fixed top-4 right-4 z-20 flex items-center gap-3 sm:top-6 sm:right-6">
      <ThemeSwitcher />
      <template v-if="user">
        <button
          type="button"
          :aria-pressed="editing"
          :title="editing ? 'Закончить редактирование' : 'Редактировать расписание'"
          class="grid size-10 place-items-center rounded-full border border-border bg-card/80 text-muted shadow-sm backdrop-blur-md outline-none transition-colors hover:text-foreground"
          @click="toggleEdit"
        >
          <X v-if="editing" class="size-4" />
          <Pencil v-else class="size-4" />
        </button>
        <button
          type="button"
          title="Выйти"
          class="grid size-10 place-items-center rounded-full border border-border bg-card/80 text-muted shadow-sm backdrop-blur-md outline-none transition-colors hover:text-foreground"
          @click="logout"
        >
          <LogOut class="size-4" />
        </button>
      </template>
    </header>

    <main class="relative z-[1] mx-auto w-full max-w-3xl flex-1 px-4 pt-16 pb-20 sm:px-6 sm:pt-24">
      <!-- состояние: проверяем доступ -->
      <p v-if="authState === 'pending'" class="pt-10 text-center text-sm text-muted">
        Загрузка…
      </p>

      <!-- состояние: API недоступен -->
      <div v-else-if="authState === 'down'" class="pt-16 text-center">
        <h1 class="text-xl font-semibold sm:text-2xl">
          Расписание недоступно
        </h1>
        <p class="text-muted mx-auto mt-3 max-w-sm text-sm leading-relaxed">
          Нет соединения с сервером. Если вы не дома — включите Tailscale и повторите.
        </p>
        <button
          type="button"
          class="mt-6 rounded-full border border-border px-5 py-2 text-sm outline-none transition-colors hover:bg-card"
          @click="checkAuth"
        >
          Повторить
        </button>
      </div>

      <!-- состояние: не авторизован -->
      <section v-else-if="!user" class="mx-auto w-full max-w-sm pt-10 text-center">
        <h1 class="text-2xl font-semibold tracking-tight sm:text-3xl">
          Приватная зона
        </h1>
        <p class="text-muted mt-3 text-sm leading-relaxed">
          Расписание видит только его владелец. Войдите или создайте аккаунт.
        </p>

        <div
          role="radiogroup"
          aria-label="Вход или регистрация"
          class="relative mx-auto mt-8 flex w-fit items-center rounded-full border border-border bg-card/80 p-1 shadow-sm"
        >
          <span
            aria-hidden="true"
            class="pointer-events-none absolute top-1 h-[calc(100%-8px)] w-[68px] rounded-full bg-foreground transition-transform duration-300 ease-out"
            :style="{ transform: `translateX(${authTab === 'login' ? 0 : 68}px)` }"
          />
          <button
            v-for="t in [['login', 'Вход'], ['register', 'Регистрация']] as const"
            :key="t[0]"
            role="radio"
            :aria-checked="authTab === t[0]"
            class="relative z-1 h-9 w-[68px] rounded-full text-xs transition-colors duration-200 outline-none"
            :class="authTab === t[0] ? 'text-background' : 'text-muted hover:text-foreground'"
            @click="authTab = t[0]"
          >
            {{ t[1] }}
          </button>
        </div>

        <form class="mt-6 flex flex-col gap-4 text-left" @submit.prevent="submitAuth">
          <label class="flex flex-col gap-1.5">
            <span class="text-muted text-xs">почта</span>
            <input
              v-model="creds.email"
              type="email"
              autocomplete="email"
              required
              class="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            >
          </label>
          <label class="flex flex-col gap-1.5">
            <span class="text-muted text-xs">пароль</span>
            <input
              v-model="creds.password"
              type="password"
              :autocomplete="authTab === 'login' ? 'current-password' : 'new-password'"
              minlength="8"
              required
              class="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            >
            <span v-if="authTab === 'register'" class="text-muted/70 text-[11px]">минимум 8 символов</span>
          </label>
          <p v-if="authError" class="text-xs" role="alert">
            {{ authError }}
          </p>
          <button
            type="submit"
            class="mt-1 w-full rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Продолжить
          </button>
        </form>
      </section>

      <!-- состояние: расписание -->
      <template v-else>
        <h1 class="text-2xl font-semibold tracking-tight sm:text-3xl">
          Моё расписание
        </h1>
        <p class="text-muted mt-1 text-sm tabular-nums">
          {{ user.email }}
        </p>

        <!-- панель управления -->
        <div class="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div
            role="radiogroup"
            aria-label="Режим"
            class="relative flex items-center rounded-full border border-border bg-card/80 p-1 shadow-sm backdrop-blur-md"
          >
            <span
              aria-hidden="true"
              class="pointer-events-none absolute top-1 h-[calc(100%-8px)] w-16 rounded-full bg-foreground transition-transform duration-300 ease-out"
              :style="{ transform: `translateX(${mode === 'day' ? 0 : 64}px)` }"
            />
            <button
              v-for="m in [['day', 'День'], ['week', 'Неделя']] as const"
              :key="m[0]"
              role="radio"
              :aria-checked="mode === m[0]"
              class="relative z-1 h-8 w-16 rounded-full text-xs transition-colors duration-200 outline-none"
              :class="mode === m[0] ? 'text-background' : 'text-muted hover:text-foreground'"
              @click="mode = m[0]"
            >
              {{ m[1] }}
            </button>
          </div>

          <div class="flex items-center gap-1">
            <button
              v-if="editing"
              type="button"
              class="mr-2 flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs outline-none transition-colors hover:bg-card"
              @click="openCreate(range.from)"
            >
              <Plus class="size-3.5" />
              Добавить
            </button>
            <button
              type="button"
              title="Назад"
              class="grid size-8 place-items-center rounded-full border border-border text-muted outline-none transition-colors hover:text-foreground"
              @click="shift(-1)"
            >
              <ChevronLeft class="size-4" />
            </button>
            <span class="w-24 text-center text-xs tabular-nums text-muted">
              {{ mode === 'day' ? dayTitle.split(', ')[1] : '' }}
            </span>
            <button
              type="button"
              title="Вперёд"
              class="grid size-8 place-items-center rounded-full border border-border text-muted outline-none transition-colors hover:text-foreground"
              @click="shift(1)"
            >
              <ChevronRight class="size-4" />
            </button>
          </div>
        </div>

        <div v-if="!isToday" class="mt-2">
          <button
            type="button"
            class="text-muted text-xs underline underline-offset-4 outline-none hover:text-foreground"
            @click="anchor = new Date()"
          >
            сегодня
          </button>
        </div>

        <!-- период -->
        <section class="mt-8" aria-live="polite">
          <h2 class="text-sm font-medium">
            <span class="sr-only">Период: </span>{{ periodTitle }}
          </h2>

          <p v-if="loadError" class="text-muted mt-4 text-sm" role="alert">
            Не удалось загрузить события.
            <button type="button" class="underline underline-offset-4 outline-none" @click="load">
              Повторить
            </button>
          </p>

          <!-- день -->
          <ul v-else-if="mode === 'day'" class="mt-4 divide-y divide-border">
            <li
              v-for="ev in events"
              :key="ev.id"
              class="flex items-start gap-4 py-3"
            >
              <time class="text-muted w-28 shrink-0 pt-1 text-xs tabular-nums">
                {{ fmtRange(ev) }}
              </time>
              <div class="min-w-0 flex-1">
                <p>{{ ev.title }}</p>
                <p v-if="ev.description" class="text-muted mt-0.5 text-sm leading-relaxed">
                  {{ ev.description }}
                </p>
              </div>
              <div v-if="editing" class="flex items-center gap-1">
                <button
                  type="button"
                  title="Изменить"
                  class="grid size-8 place-items-center rounded-full text-muted outline-none hover:text-foreground"
                  @click="openEdit(ev)"
                >
                  <Pencil class="size-3.5" />
                </button>
                <button
                  type="button"
                  :title="pendingDelete === ev.id ? 'Точно удалить?' : 'Удалить'"
                  class="grid size-8 place-items-center rounded-full outline-none transition-colors"
                  :class="pendingDelete === ev.id ? 'text-foreground' : 'text-muted hover:text-foreground'"
                  @click="removeEvent(ev)"
                >
                  <Trash2 class="size-3.5" />
                </button>
              </div>
            </li>
            <li v-if="!events.length && !editing" class="py-4">
              <p class="text-muted text-sm">
                На этот день событий нет.
              </p>
            </li>
          </ul>

          <!-- неделя -->
          <ol v-else class="mt-4 divide-y divide-border">
            <li v-for="d in weekDays" :key="d.dateKey" class="py-3">
              <div class="flex items-center justify-between">
                <h3 class="text-muted text-xs tabular-nums uppercase">
                  {{ d.label }}
                </h3>
                <button
                  v-if="editing"
                  type="button"
                  title="Добавить событие на этот день"
                  class="grid size-7 place-items-center rounded-full text-muted outline-none hover:text-foreground"
                  @click="openCreate(d.date)"
                >
                  <Plus class="size-3.5" />
                </button>
              </div>
              <template v-if="byDate.get(d.dateKey)?.length">
                <div
                  v-for="ev in byDate.get(d.dateKey)"
                  :key="ev.id"
                  class="flex items-start gap-4 py-2"
                >
                  <time class="text-muted w-24 shrink-0 text-xs tabular-nums">
                    {{ fmtRange(ev) }}
                  </time>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm">{{ ev.title }}</p>
                    <p v-if="ev.description" class="text-muted/80 mt-0.5 text-xs leading-relaxed">
                      {{ ev.description }}
                    </p>
                  </div>
                  <div v-if="editing" class="flex items-center gap-1">
                    <button
                      type="button"
                      title="Изменить"
                      class="grid size-7 place-items-center rounded-full text-muted outline-none hover:text-foreground"
                      @click="openEdit(ev)"
                    >
                      <Pencil class="size-3" />
                    </button>
                    <button
                      type="button"
                      :title="pendingDelete === ev.id ? 'Точно удалить?' : 'Удалить'"
                      class="grid size-7 place-items-center rounded-full outline-none transition-colors"
                      :class="pendingDelete === ev.id ? 'text-foreground' : 'text-muted hover:text-foreground'"
                      @click="removeEvent(ev)"
                    >
                      <Trash2 class="size-3" />
                    </button>
                  </div>
                </div>
              </template>
            </li>
          </ol>
        </section>
      </template>
    </main>

    <!-- форма события -->
    <div
      v-if="formOpen"
      class="fixed inset-0 z-30 grid place-items-end bg-black/30 p-4 backdrop-blur-[2px] sm:place-items-center"
      @click.self="closeForm"
    >
      <form
        class="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg"
        @submit.prevent="submitEvent"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold">
            {{ editingId ? 'Изменить событие' : 'Новое событие' }}
          </h3>
          <button
            type="button"
            class="text-muted outline-none hover:text-foreground"
            @click="closeForm"
          >
            <X class="size-4" />
          </button>
        </div>

        <div class="mt-5 flex flex-col gap-4">
          <label class="flex flex-col gap-1.5">
            <span class="text-muted text-xs">название</span>
            <input
              v-model="form.title"
              type="text"
              maxlength="200"
              class="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            >
          </label>
          <label class="flex flex-col gap-1.5">
            <span class="text-muted text-xs">описание <span class="text-muted/60">(необязательно)</span></span>
            <textarea
              v-model="form.description"
              rows="2"
              maxlength="5000"
              class="resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </label>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label class="flex flex-col gap-1.5">
              <span class="text-muted text-xs">начало</span>
              <input
                v-model="form.startsAt"
                type="datetime-local"
                required
                class="rounded-lg border border-border bg-background px-3 py-2 text-sm tabular-nums outline-none focus:border-accent"
              >
            </label>
            <label class="flex flex-col gap-1.5">
              <span class="text-muted text-xs">конец <span class="text-muted/60">(необязательно)</span></span>
              <input
                v-model="form.endsAt"
                type="datetime-local"
                class="rounded-lg border border-border bg-background px-3 py-2 text-sm tabular-nums outline-none focus:border-accent"
              >
            </label>
          </div>
          <p v-if="formError" class="text-xs" role="alert">
            {{ formError }}
          </p>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              class="rounded-full px-4 py-2 text-xs text-muted outline-none hover:text-foreground"
              @click="closeForm"
            >
              Отмена
            </button>
            <button
              type="submit"
              class="rounded-full bg-foreground px-5 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
              Сохранить
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
