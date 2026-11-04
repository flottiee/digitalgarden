/**
 * Рендер-тест недельной сетки: гоняем настоящий Vue-парс и рендер
 * компонента, ловим runtime-ошибки, из-за которых сетка пропадает на проде.
 * @vitest-environment happy-dom
 */
import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, defineComponent } from 'vue'
import ScheduleWeekGrid from '../app/components/ScheduleWeekGrid.vue'

const ev = (id, title, startsAt, endsAt) => ({
  id,
  title,
  description: null,
  starts_at: startsAt,
  ends_at: endsAt || null,
  created_at: startsAt,
  updated_at: startsAt,
})

const days = Array.from({ length: 7 }, (_, i) => {
  const monday = new Date(2026, 10, 2) // понедельник
  const d = new Date(monday)
  d.setDate(d.getDate() + i)
  const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  const weekday = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'][i]
  return { weekday, daynum: d.getDate(), dateKey: key, date: d }
})

function mountGrid(events = [], editing = false) {
  return mount(
    defineComponent({ render: () => h(ScheduleWeekGrid, { days, events, editing, pendingDelete: null }) }),
    { attachTo: document.body },
  )
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('ScheduleWeekGrid', () => {
  it('рендерит сетку 7×24 без ошибок', () => {
    const w = mountGrid()
    expect(w.findAll('article').length).toBe(0)
    expect(w.text()).toContain('00') // подпись часа
  })

  it('рисует плитку с точным временем (17:20, не кратно часу)', () => {
    const w = mountGrid([
      ev('e1', 'Йога', '2026-11-03T17:20:00', '2026-11-03T18:35:00'),
    ])
    const tile = w.find('article')
    expect(tile.exists()).toBe(true)
    expect(tile.text()).toContain('17:20')
    expect(tile.text()).toContain('Йога')
    const style = tile.attributes('style') ?? ''
    // позиция в % от суток: 17:20 → ~72.2% суток (не зависит от таймзоны)
    expect(style).toMatch(/top:\s*[\d.]+%/)
    expect(style).toMatch(/height:\s*[\d.]+%/)
    expect(Number.parseFloat(String(style.match(/top: ([\d.]+)%/)?.[1]))).toBeCloseTo(72.2, 0)
  })

  it('пересекающиеся события делят колонку по дорожкам', () => {
    const w = mountGrid([
      ev('a', 'A', '2026-11-03T09:00:00', '2026-11-03T10:30:00'),
      ev('b', 'B', '2026-11-03T10:00:00', '2026-11-03T11:00:00'),
    ])
    const tiles = w.findAll('article')
    expect(tiles.length).toBe(2)
    // обе плитки пересекаются → делят колонку на две дорожки
    tiles.forEach((t) => {
      expect(t.attributes('style') ?? '').toMatch(/width: calc\(50% - 6px\)/)
    })
  })

  it('в режиме правки на плитке есть кнопка удаления', () => {
    const w = mountGrid([
      ev('e1', 'Дело', '2026-11-03T12:00:00'),
    ], true)
    expect(w.find('button[title="Удалить"]').exists()).toBe(true)
  })
})
