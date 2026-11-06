/**
 * SDK общения с backend (FastAPI).
 *
 * Ходим на СОБСТВЕННЫЙ origin: Nuxt (Nitro) проксирует /auth/** и /api/**
 * на серверный FastAPI (см. server/routes/, server/utils/apiProxy.ts).
 * Так JWT-cookie является first-party (domain сайта) и не блокируется
 * браузерами как сторонняя — главный фикс прод-авторизации в Safari/iPhone.
 */

export interface ScheduleEventItem {
  id: string
  title: string
  description: string | null
  starts_at: string
  ends_at: string | null
  created_at: string
  updated_at: string
}

export interface TodoItem {
  id: string
  title: string
  description: string | null
  completed: boolean
  created_at: string
  updated_at: string
}

export interface UserItem {
  id: string
  email: string
  created_at: string
}

export interface ScheduleApi {
  <T>(url: string, opts?: Parameters<typeof $fetch>[1]): Promise<T>
}

export function useApiClient(): ScheduleApi {
  // baseURL не указываем → запросы уходят на домен самой страницы,
  // где их встречает Nitro-прокси (это верно и в dev, и в проде).
  return $fetch.create({
    credentials: 'include',
  }) as ScheduleApi
}

/** Ошибку API → человекочитаемый текст для форм. */
export function extractApiError(error: unknown): string {
  const detail = (error as { data?: { detail?: unknown } })?.data?.detail
  if (typeof detail === 'string')
    return detail
  // массив pydantic-ошибок (422) — сейчас можем только обобщить
  return 'Проверьте заполнение полей'
}
