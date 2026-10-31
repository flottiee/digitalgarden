// плейсхолдеры — замените на себя
export const ME = {
  name: 'Flottiee',
  foundedYear: 2026,
  role: 'Future Full-stack Developer',
  tagline: 'Изучаю Vue и Nuxt, работаю с ИИ-агентами в разработке и собираю свои первые pet-проекты.',
  location: 'Санкт-Петербург, Россия',
  email: 'you@example.com',
  telegram: 'https://t.me/yourusername',
  github: 'https://github.com/yourusername',
}

export const SKILLS = [
  { name: 'Python', level: 'Уверенно' },
  { name: 'Vue / Nuxt', level: 'Изучаю' },
  { name: 'TypeScript', level: 'Изучаю' },
  { name: 'Git', level: 'Базово' },
  { name: 'ИИ-агенты в разработке', level: 'Практикую' },
]

export const PROJECTS = [
  {
    title: 'Визитка flottiee.bond',
    description: 'Этот сайт: Nuxt, Tailwind и дизайн-система hesoyam. Деплой на Vercel.',
    link: 'https://flottiee.bond',
  },
  {
    title: 'Свой API',
    description: 'REST API на Nitro server routes — soon.',
    link: '#',
  },
  {
    title: 'Pet-проект на Python',
    description: 'Место для вашего будущего проекта.',
    link: '#',
  },
]

export const LINKS = [
  { label: 'GitHub', href: ME.github },
  { label: 'Telegram', href: ME.telegram },
  { label: `Email: ${ME.email}`, href: `mailto:${ME.email}` },
]
