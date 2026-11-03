/**
 * Прокси: /api/** → backend /api/**
 * (CRUD событий расписания)
 */
export default defineEventHandler(event => proxyToApi(event, 'api'))
