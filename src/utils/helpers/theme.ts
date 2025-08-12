// 处理主题样式
export function handleThemeStyle(theme: string): void {
  const root = document.documentElement
  root.style.setProperty('--el-color-primary', theme)

  for (let i = 1; i <= 9; i++) {
    root.style.setProperty(
      `--el-color-primary-light-${i}`,
      getLightColor(theme, i / 10),
    )
  }
  for (let i = 1; i <= 9; i++) {
    root.style.setProperty(
      `--el-color-primary-dark-${i}`,
      getDarkColor(theme, i / 10),
    )
  }
}

// hex 颜色转 rgb（三元组）
export function hexToRgb(hex: string): [number, number, number] {
  const cleaned = hex.replace('#', '').trim().toLowerCase()

  // 这里只处理 #rrggbb 形式（与你原函数一致）
  if (!/^[0-9a-f]{6}$/.test(cleaned)) {
    throw new Error(`Invalid hex color: ${hex}`)
  }

  const parts = cleaned.match(/../g)! // 已校验长度，非空断言
  const r = Number.parseInt(parts[0], 16)
  const g = Number.parseInt(parts[1], 16)
  const b = Number.parseInt(parts[2], 16)
  return [r, g, b]
}

// rgb 转 hex
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (v: number) => {
    const n = Math.max(0, Math.min(255, Math.round(v))) // clamp
    const s = n.toString(16)
    return s.length === 1 ? `0${s}` : s
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// 变浅颜色值（level: 0~1）
export function getLightColor(color: string, level: number): string {
  const [r, g, b] = hexToRgb(color)
  const L = clamp01(level)
  const rr = Math.floor((255 - r) * L + r)
  const gg = Math.floor((255 - g) * L + g)
  const bb = Math.floor((255 - b) * L + b)
  return rgbToHex(rr, gg, bb)
}

// 变深颜色值（level: 0~1）
export function getDarkColor(color: string, level: number): string {
  const [r, g, b] = hexToRgb(color)
  const L = clamp01(level)
  const rr = Math.floor(r * (1 - L))
  const gg = Math.floor(g * (1 - L))
  const bb = Math.floor(b * (1 - L))
  return rgbToHex(rr, gg, bb)
}

// 工具：把 level 限制到 0~1
function clamp01(v: number): number {
  if (Number.isNaN(v))
    return 0
  return Math.max(0, Math.min(1, v))
}
