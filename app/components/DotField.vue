<script setup lang="ts">
// Интерактивное точечное поле: подсветка у курсора, ripple-волна по клику/тапу
// и опциональное медленное «дыхание». Спокойный фон по умолчанию.
const props = withDefaults(
  defineProps<{
    class?: string
    /** шаг сетки в пикселях */
    spacing?: number
    /** медленная фоновая волна яркости */
    ambient?: boolean
  }>(),
  { spacing: 26, ambient: false },
)

const canvas = ref<HTMLCanvasElement | null>(null)

function run(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx)
    return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const radius = 140
  const rippleSpeed = 320
  const rippleWidth = 90

  let spacing = props.spacing
  let width = 0
  let height = 0
  let dots: { x: number; y: number }[] = []
  let pointer: { x: number; y: number } | null = null
  let ripples: { x: number; y: number; t0: number }[] = []
  let raf = 0
  let last = performance.now()

  let fg = '128,128,128'
  let ambient = props.ambient

  const readColors = () => {
    const style = getComputedStyle(document.documentElement)
    const parse = (name: string) => {
      const raw = style.getPropertyValue(name).trim()
      const hex = raw.match(/^#([0-9a-f]{3,8})$/i)
      if (hex) {
        let h = hex[1]
        if (h.length === 3 || h.length === 4)
          h = [...h.slice(0, 3)].map(c => c + c).join('')
        return `${Number.parseInt(h.slice(0, 2), 16)},${Number.parseInt(h.slice(2, 4), 16)},${Number.parseInt(h.slice(4, 6), 16)}`
      }
      const rgb = raw.match(/\d+\s*,\s*\d+\s*,\s*\d+/)
      return rgb ? rgb[0] : '128,128,128'
    }
    fg = parse('--ds-gray-1000')
  }

  const resize = () => {
    const rect = canvas.getBoundingClientRect()
    width = rect.width
    height = rect.height
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

    dots = []
    const cols = Math.ceil(width / spacing) + 1
    const rows = Math.ceil(height / spacing) + 1
    const offsetX = (width - (cols - 1) * spacing) / 2
    const offsetY = (height - (rows - 1) * spacing) / 2
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({ x: offsetX + c * spacing, y: offsetY + r * spacing })
      }
    }
  }

  const ease = (t: number) => t * t * (3 - 2 * t)

  const frame = (now: number) => {
    const dt = Math.min(now - last, 64)
    last = now
    const time = now / 1000

    ctx!.clearRect(0, 0, width, height)

    // ripple доживает свою жизнь
    ripples = ripples.filter(r => (now - r.t0) * rippleSpeed < Math.hypot(width, height) + rippleWidth * 2)

    for (const dot of dots) {
      let t = 0

      if (pointer) {
        const d = Math.hypot(dot.x - pointer.x, dot.y - pointer.y)
        if (d < radius)
          t = Math.max(t, ease(1 - d / radius))
      }

      for (const r of ripples) {
        const age = (now - r.t0) / 1000
        const front = age * rippleSpeed
        const dist = Math.hypot(dot.x - r.x, dot.y - r.y)
        const band = Math.abs(dist - front)
        if (band < rippleWidth) {
          const strength = ease(1 - band / rippleWidth) * Math.max(0, 1 - age / 2)
          t = Math.max(t, strength * 0.9)
        }
      }

      if (ambient) {
        const wave = Math.sin(dot.x * 0.012 + dot.y * 0.009 - time * 0.9)
        t = Math.max(t, ease(Math.max(0, wave)) * 0.28)
      }

      const size = spacing / 26 + t * (spacing / 26) * 1.8
      const alpha = 0.14 + t * 0.66
      ctx!.fillStyle = `rgb(${fg} / ${alpha.toFixed(3)})`
      ctx!.beginPath()
      ctx!.arc(dot.x, dot.y, size, 0, Math.PI * 2)
      ctx!.fill()
    }
    raf = requestAnimationFrame(frame)
  }

  const onMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect()
    pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }
  const onLeave = () => {
    pointer = null
  }
  const onDown = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect()
    ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, t0: performance.now() })
  }

  const setStaticFrame = () => {
    ctx!.clearRect(0, 0, width, height)
    for (const dot of dots) {
      ctx!.fillStyle = `rgb(${fg} / 0.14)`
      ctx!.beginPath()
      ctx!.arc(dot.x, dot.y, spacing / 26, 0, Math.PI * 2)
      ctx!.fill()
    }
  }

  const onMotionChange = (e: MediaQueryListEvent) => {
    cancelAnimationFrame(raf)
    if (e.matches)
      setStaticFrame()
    else
      raf = requestAnimationFrame(frame)
  }
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener?.('change', onMotionChange)

  const themeObserver = new MutationObserver(readColors)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  watch(() => props.spacing, (next) => {
    spacing = next
    resize()
  })

  watch(() => props.ambient, (next) => {
    ambient = next
  })

  resize()
  readColors()
  if (media.matches)
    setStaticFrame()
  else
    raf = requestAnimationFrame(frame)

  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerleave', onLeave)
  window.addEventListener('pointerdown', onDown, { passive: true })

  return () => {
    cancelAnimationFrame(raf)
    themeObserver.disconnect()
    media.removeEventListener?.('change', onMotionChange)
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerleave', onLeave)
    window.removeEventListener('pointerdown', onDown)
  }
}

let cleanup: (() => void) | undefined

onMounted(() => {
  if (canvas.value)
    cleanup = run(canvas.value)
})

onBeforeUnmount(() => {
  cleanup?.()
})
</script>

<template>
  <canvas ref="canvas" :class="props.class" aria-hidden="true" />
</template>
