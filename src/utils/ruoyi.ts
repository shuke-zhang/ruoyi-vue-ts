/**
 * 通用 TS 工具方法
 * 基于原始 JS 版本补充了类型与边界处理
 */

// ========================== 日期格式化 ==========================
export function parseTime(
  time: Date | string | number | null | undefined,
  pattern = '{y}-{m}-{d} {h}:{i}:{s}',
): string | null {
  if (time == null || time === '') {
    return null
  }

  let date: Date

  if (time instanceof Date) {
    date = time
  }
  else {
    let t: string | number = time

    if (typeof t === 'string' && /^\d+$/.test(t)) {
      t = Number.parseInt(t, 10)
    }
    else if (typeof t === 'string') {
      t = t.replace(/-/g, '/').replace('T', ' ').replace(/\.\d{3}/g, '')
    }

    if (typeof t === 'number' && t.toString().length === 10) {
      t = t * 1000
    }
    date = new Date(t)
  }

  const formatObj: Record<string, number> = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }

  const timeStr = pattern.replace(/\{([ymdhisa])+\}/g, (result, key: string) => {
    let value: number | string = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && Number(value) < 10) {
      value = `0${value}`
    }
    return (value ?? 0).toString()
  })

  return timeStr
}

// ========================== 表单重置（Options API 场景） ==========================
/**
 * 仅在 Vue Options API 且使用 this.$refs 时有意义；Vue3 setup 请直接用 formRef.resetFields()
 */
export function resetForm(ctx: { $refs: Record<string, any> }, refName: string): void {
  const ref = ctx?.$refs?.[refName]
  if (ref && typeof ref.resetFields === 'function') {
    ref.resetFields()
  }
}

// ========================== 添加日期范围 ==========================
export function addDateRange<
  T extends { params?: Record<string, any> }, // 这里约束 T 至少有 params
>(
  params: T,
  dateRange: any[] | null | undefined,
  propName?: string,
): T {
  const search = params
  const p = (search.params
    = typeof search.params === 'object' && search.params !== null && !Array.isArray(search.params)
      ? search.params
      : {})

  const range = Array.isArray(dateRange) ? dateRange : []

  if (propName === undefined) {
    p.beginTime = range[0]
    p.endTime = range[1]
  }
  else {
    p[`begin${propName}`] = range[0]
    p[`end${propName}`] = range[1]
  }
  return search
}

// ========================== 字典回显 ==========================
export interface DictItem {
  label: string
  value: string | number
}

export function selectDictLabel(datas: DictItem[] | Record<string, DictItem>, value: string | number | undefined): string {
  if (value === undefined) {
    return ''
  }
  const list: DictItem[] = Array.isArray(datas) ? datas : Object.values(datas)
  const hit = list.find(d => d.value === String(value))
  return hit ? hit.label : String(value)
}

export function selectDictLabels(
  datas: DictItem[] | Record<string, DictItem>,
  value: string | number | (string | number)[] | undefined,
  separator = ',',
): string {
  if (value === undefined || (Array.isArray(value) && value.length === 0)) {
    return ''
  }
  const list: DictItem[] = Array.isArray(datas) ? datas : Object.values(datas)
  const valStr = Array.isArray(value) ? value.join(',') : String(value)
  const parts = valStr.split(separator)
  const out: string[] = []

  for (const v of parts) {
    const hit = list.find(d => d.value === v)
    out.push((hit?.label ?? v) + separator)
  }
  const joined = out.join('')
  return joined.substring(0, Math.max(0, joined.length - 1))
}

// ========================== 字符串格式化（%s） ==========================
export function sprintf(str: string, ...args: any[]): string {
  let i = 0
  let ok = true
  const result = str.replace(/%s/g, () => {
    const arg = args[i++]
    if (typeof arg === 'undefined') {
      ok = false
      return ''
    }
    return String(arg)
  })
  return ok ? result : ''
}

// ========================== 空字符串转换 ==========================
export function parseStrEmpty(str: any): string {
  if (!str || str === 'undefined' || str === 'null') {
    return ''
  }
  return String(str)
}

// ========================== 数据合并（浅递归） ==========================
export function mergeRecursive<T extends Record<string, any>, U extends Record<string, any>>(
  source: T,
  target: U,
): T & U {
  const src = (source ?? {}) as Record<string, any>
  const tar = (target ?? {}) as Record<string, any>

  for (const p in tar) {
    if (Object.prototype.hasOwnProperty.call(tar, p)) {
      try {
        if (tar[p]?.constructor === Object) {
          src[p] = mergeRecursive(src[p] ?? {}, tar[p])
        }
        else {
          src[p] = tar[p]
        }
      }
      catch {
        src[p] = tar[p]
      }
    }
  }
  return src as T & U
}

// ========================== 构造树型结构 ==========================
/**
 * @param data 平铺数组
 * @param id id 字段名，默认 'id'
 * @param parentId 父字段名，默认 'parentId'
 * @param children 子数组字段名，默认 'children'
 */
export function handleTree<T extends Record<string, any>>(
  data: T[],
  id: keyof T = 'id' as keyof T,
  parentId: keyof T = 'parentId' as keyof T,
  children: string = 'children',
): T[] {
  const idKey = id as string
  const pKey = parentId as string
  const cKey = children

  const map: Record<string | number, T> = {}
  const tree: T[] = []

  // 初始化 map，并确保 children 数组存在
  for (const d of data) {
    const key = d[idKey] as unknown as string | number
    map[key] = d
    if (!Array.isArray(d[cKey])) {
      (d as any)[cKey] = []
    }
  }

  for (const d of data) {
    const pid = d[pKey] as unknown as string | number
    const parentObj = map[pid]
    if (!parentObj) {
      tree.push(d)
    }
    else {
      (parentObj as any)[cKey].push(d)
    }
  }
  return tree
}

// ========================== 参数序列化 ==========================
export function tansParams(params: Record<string, any>): string {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    const part = `${encodeURIComponent(propName)}=`
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object' && !Array.isArray(value)) {
        for (const key of Object.keys(value)) {
          const v = value[key]
          if (v !== null && v !== '' && typeof v !== 'undefined') {
            const paramName = `${propName}[${key}]`
            const subPart = `${encodeURIComponent(paramName)}=`
            result += `${subPart + encodeURIComponent(v)}&`
          }
        }
      }
      else {
        result += `${part + encodeURIComponent(value)}&`
      }
    }
  }
  return result
}

// ========================== 规范化路径 ==========================
export function getNormalPath(p?: string | null): string | null | undefined {
  if (!p || p === 'undefined') {
    return p as any
  }
  let res = p.replace(/\/\//g, '/')
  if (res.endsWith('/')) {
    res = res.slice(0, -1)
  }
  return res
}

// ========================== Blob 校验 ==========================
export function blobValidate(data: any): boolean {
  // 兼容性判断：有 type 字段，且不是 application/json，则视为“有效 blob”
  if (data && typeof data === 'object' && 'type' in data) {
    return (data as { type?: string }).type !== 'application/json'
  }
  // 若没有 type 字段，保守返回 true（维持原逻辑宽松性）
  return true
}
