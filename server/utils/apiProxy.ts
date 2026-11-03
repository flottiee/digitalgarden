/**
 * BFF-прокси к backend API (FastAPI на сервере), серверная часть.
 *
 * Зачем: сайт и API живут на разных доменах (flottiee.bond и *.ts.net),
 * поэтому JWT-cookie для браузера — «сторонняя» (third-party), и Safari/iPhone
 * такие cookie режет полностью. Через прокси браузер общается со своим же
 * origin (flottiee.bond/api/**): cookie становится первичной и работает везде.
 *
 * Прокси — глупый: пересылает метод, тело и cookie 1:1, не лезет в бизнес-логику.
 * Адрес API (NUXT_API_ORIGIN) знает лишь Worker на Cloudflare, не браузер.
 */

export async function proxyToApi(event: Parameters<Parameters<typeof defineEventHandler>[0]>[0], prefix: string) {
  const config = useRuntimeConfig(event)
  const tail = getRouterParam(event, 'path') ?? ''
  const method = getMethod(event)
  const query = getQuery(event)

  const headers: Record<string, string> = {}
  const contentType = getRequestHeader(event, 'content-type')
  if (contentType)
    headers['content-type'] = contentType
  const cookie = getRequestHeader(event, 'cookie')
  if (cookie)
    headers.cookie = cookie

  // json/empty тела — читаем как текст (FastAPI принимает JSON; тело может отсутствовать)
  const body = method === 'GET' || method === 'HEAD' ? undefined : await readRawBody(event)

  let res: Response
  try {
    // query аккуратно склеиваем сами: у нативного fetch нет опции query
    const u = new URL(`${config.apiOrigin}/${[prefix, tail].filter(Boolean).join('/')}`)
    for (const [k, v] of Object.entries(query))
      u.searchParams.set(k, String(v))

    res = await fetch(u, {
      method,
      headers,
      body: body ?? undefined,
      redirect: 'manual',
    })
  }
  catch {
    setResponseStatus(event, 502)
    return { detail: 'Расписание недоступно: сервер не отвечает' }
  }

  setResponseStatus(event, res.status)

  // Set-Cookie может быть несколько — getSetCookie, иначе они склеятся
  for (const c of res.headers.getSetCookie())
    appendResponseHeader(event, 'set-cookie', c)

  setResponseHeader(event, 'content-type', res.headers.get('content-type') ?? 'application/json')
  return res.body ?? null
}
