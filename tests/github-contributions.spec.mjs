// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import GitHubContributions from '../app/components/GitHubContributions.vue'
import { CACHE_KEY, CONTRIBUTIONS_URL, contributionCalendar, parseContributions } from '../app/utils/githubContributions'

const today = new Date().toISOString().slice(0, 10)
const payload = { contributions: [{ date: today, count: 7, level: 3 }] }
let wrapper
function render() { wrapper = mount(GitHubContributions); return wrapper }
afterEach(() => { wrapper?.unmount(); localStorage.clear(); vi.unstubAllGlobals(); vi.restoreAllMocks() })

describe('GitHub contributions', () => {
  it('filters to 12 months, aligns Sundays and excludes future days', () => {
    const result = contributionCalendar([
      { date: '2025-11-06', count: 100, level: 4 },
      { date: '2025-11-07', count: 2, level: 1 },
      { date: '2026-11-06', count: 3, level: 2 },
      { date: '2026-11-07', count: 100, level: 4 },
    ], new Date('2026-11-06T12:00:00Z'))
    expect(result.total).toBe(5)
    expect(result.weeks[0].slice(0, 5)).toEqual(Array(5).fill(null))
    expect(result.weeks[0][5].date).toBe('2025-11-07')
  })
  it('rejects malformed, duplicate and missing days rather than inventing data', () => {
    for (const contributions of [
      [{ date: '2026-02-30', count: 1, level: 1 }],
      [{ date: today, count: -1, level: 1 }],
      [...payload.contributions, ...payload.contributions],
      [{ date: '2026-01-01', count: 0, level: 0 }, { date: '2026-01-03', count: 0, level: 0 }],
    ]) expect(() => parseContributions({ contributions })).toThrow()
    expect(() => parseContributions({ error: 'upstream error' })).toThrow()
  })
  it('loads the correct user, renders real counts and exposes day details', async () => {
    const fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => payload })
    vi.stubGlobal('fetch', fetch)
    const w = render()
    expect(w.text()).toContain('Загружаю')
    await flushPromises()
    expect(fetch.mock.calls[0][0]).toBe(CONTRIBUTIONS_URL)
    expect(w.text()).toContain('7 contributions')
    expect(w.get('a').attributes('href')).toBe('https://github.com/flottiee')
    const day = w.get('button[data-level="3"]')
    await day.trigger('click')
    expect(w.get('[aria-live]').text()).toContain('7 contributions')
    expect(day.attributes('title')).toContain('7 contributions')
  })
  it('uses fresh cache without a network request', async () => {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), ...payload }))
    const fetch = vi.fn()
    vi.stubGlobal('fetch', fetch)
    render()
    await flushPromises()
    expect(fetch).not.toHaveBeenCalled()
    expect(wrapper.text()).toContain('7 contributions')
  })
  it('shows an error without fake cells and supports retry', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue({ ok: true, json: async () => payload }))
    const w = render()
    await flushPromises()
    expect(w.text()).toContain('Не удалось загрузить')
    expect(w.findAll('button[data-level]')).toHaveLength(0)
    await w.get('button').trigger('click')
    await flushPromises()
    expect(w.text()).toContain('7 contributions')
  })
  it('handles empty data and blocked local storage', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked') })
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ contributions: [] }) }))
    render()
    await flushPromises()
    expect(wrapper.text()).toContain('данных пока нет')
  })
})
