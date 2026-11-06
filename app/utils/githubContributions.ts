export interface Contribution {
  date: string
  count: number
  level: number
}

export const CONTRIBUTIONS_URL = 'https://github-contributions-api.jogruber.de/v4/flottiee?y=last'
export const CACHE_KEY = 'flottiee:github-contributions:v1'
export const CACHE_TTL = 60 * 60 * 1000

const DAY = 86400000

export function parseContributions(value: unknown): Contribution[] {
  const days = (value as { contributions?: unknown } | null)?.contributions
  if (!Array.isArray(days)) throw new Error('Invalid contributions response')
  const seen = new Set<string>()
  const result = days.map((day) => {
    if (!day || typeof day.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(day.date)
      || !Number.isFinite(Date.parse(day.date))
      || new Date(day.date).toISOString().slice(0, 10) !== day.date
      || !Number.isSafeInteger(day.count) || day.count < 0
      || !Number.isInteger(day.level) || day.level < 0 || day.level > 4
      || seen.has(day.date)) throw new Error('Invalid contribution day')
    seen.add(day.date)
    return { date: day.date, count: day.count, level: day.level }
  }).sort((a, b) => a.date.localeCompare(b.date))
  for (let i = 1; i < result.length; i++) {
    if (Date.parse(result[i]!.date) - Date.parse(result[i - 1]!.date) !== DAY)
      throw new Error('Incomplete contributions calendar')
  }
  return result
}

export function contributionCalendar(days: Contribution[], now = new Date()) {
  const end = now.toISOString().slice(0, 10)
  const start = new Date(`${end}T00:00:00Z`)
  start.setUTCFullYear(start.getUTCFullYear() - 1)
  const startKey = start.toISOString().slice(0, 10)
  const period = days.filter(day => day.date > startKey && day.date <= end)
  const cells: (Contribution | null)[] = []
  if (period.length) {
    cells.push(...Array(new Date(`${period[0]!.date}T00:00:00Z`).getUTCDay()).fill(null))
    cells.push(...period)
    while (cells.length % 7) cells.push(null)
  }
  const weeks = Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7))
  return { weeks, total: period.reduce((sum, day) => sum + day.count, 0), days: period }
}
