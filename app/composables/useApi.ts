/**
 * SDK общения с backend (FastAPI).
 *
 * База берётся из runtimeConfig.public.apiBase — её переопределяет
 * переменная окружения NUXT_PUBLIC_API_BASE:
 *   dev would: http://localhost:8000 (по умолчанию)
 *   prod:      https://<сервер>.<tcpnet>.ts.net (Tailscale serve)
 *
 * credentials: 'include' — JWT лежит в httpOnly cookie Домена API,
 * при cross-origin (api не на flottiee.bond) cookie нужно явно просить.
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

export interface UserItem {
  id: string
  email: string
  created_at: string
}

export interface ScheduleApi {
  <T>(url: string, opts?: Parameters<typeof $fetch>[1]): Promise<T>
}

export function useApiClient(): ScheduleApi {
  const { public: pub } = useRuntimeConfig()
  return $fetch.create({
    baseURL: pub.apiBase,
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
