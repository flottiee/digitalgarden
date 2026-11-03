/**
 * Прокси: /auth/** → backend /auth/**
 * (регистрация, вход, выход, /auth/me)
 */
export default defineEventHandler(event => proxyToApi(event, 'auth'))
