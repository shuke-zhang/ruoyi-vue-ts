export interface CacheTime {
  /**
   * 天
   */
  day?: number
  /**
   * 小时
   */
  hour?: number
  /**
   * 分钟
   */
  minutes?: number
  /**
   * 秒
   */
  second?: number
}

export interface CacheData {
  value: any
  expires: number
}

export interface CacheStatus {
  /**
   * @description 缓存状态
   * - valid --- 缓存中未过期
   * - expired --- 缓存已过期
   * - not_found --- 未找到缓存
   */
  status: 'valid' | 'expired' | 'not_found'
}
export type CacheResult<T> = Partial<T> & {
  /**
   * 缓存状态
   * - valid --- 缓存中未过期
   * - expired --- 缓存已过期
   * - not_found --- 未找到缓存
   */
  status: 'valid' | 'expired' | 'not_found'
}
/**
 * 缓存
 */
export class Cache<CacheType extends AnyObject> {
  packageName: string
  packageVersion: string
  defaultExpires = 864e5 * 7

  constructor(name: string, version: string) {
    this.packageName = name
    this.packageVersion = version
  }

  formatTime(data: Partial<CacheTime> | number): number {
    if (typeof data == 'number')
      return data

    const { day, hour, minutes, second } = data
    const dataDay = (day ? day * 24 : 0) * 864e2// 秒
    const dataHours = (hour || 0) * 60 * 60// 秒
    const dataMinutes = (minutes || 0) * 60// 秒
    const dataSeconds = (second || 0) * 60// 秒
    return (dataDay + dataHours + dataMinutes + dataSeconds) * 1000
  }

  getExpires(time?: Partial<CacheTime> | number): number {
    let expires = this.defaultExpires
    if (time === -1)
      expires = Number.MAX_SAFE_INTEGER

    else if (time)
      expires = this.formatTime(time)

    return new Date().getTime() + expires
  }

  get perfixKey() {
    return `${this.packageName}_${this.packageVersion}_`
  }

  stringifyJson<T = any>(data: T): string {
    try {
      return JSON.stringify(data)
    }
    catch (error) {
      throw new Error(error as any)
    }
  }

  parseJson(data: string): object {
    try {
      return JSON.parse(data)
    }
    catch (error) {
      throw new Error(error as any)
    }
  }

  getRealKey<K extends keyof CacheType>(key: K) {
    return `${this.perfixKey}${String(key)}`
  }

  /**
   * 设置缓存项到 localStorage 中（带过期时间）
   *
   * @template K - 缓存键的类型，来自泛型 CacheType 的键
   * @param {K} key - 缓存项的键名
   * @param {CacheType[K]} value - 缓存项的值，类型自动根据 key 推断
   * @param {number | Partial<CacheTime>} [options] - 过期时间配置，可以是毫秒数或配置对象
   *
   * @returns {void}
   *
   * @example
   * set('userInfo', { name: '张三' }, 3600_000) // 缓存 1 小时
   */
  set<K extends keyof CacheType>(key: K, value: CacheType[K], options: number | Partial<CacheTime> = this.defaultExpires) {
    if (typeof localStorage === 'undefined')
      return
    const _key = this.getRealKey(key)
    const data = this.stringifyJson({
      value,
      expires: this.getExpires(options),
    })
    try {
      data && localStorage.setItem(_key, data)
    }

    catch (_e) {
      // handle exceptions, possibly by removing older items
    }
  }

  get<T>(key: string): CacheResult<T> {
    const empty = {} as Partial<T>

    if (typeof localStorage === 'undefined') {
      return { ...empty, status: 'not_found' }
    }

    const raw = localStorage.getItem(this.getRealKey(key as any))
    if (!raw) {
      return { ...empty, status: 'not_found' }
    }

    try {
      const { expires, value } = this.parseJson(raw) as CacheData
      const now = Date.now()

      if (expires < now) {
        this.remove(key as any)
        return { ...(value as Partial<T>), status: 'expired' }
      }

      return {
        ...(value as T),
        status: 'valid',
      }
    }
    catch (_e) {
      this.remove(key as any)
      return { ...empty, status: 'not_found' }
    }
  }

  remove<K extends keyof CacheType>(key: K) {
    // uni.removeStorageSync(this.getRealKey(key) as string);
    localStorage.removeItem(this.getRealKey(key) as string)
  }

  clear() {
    if (typeof localStorage === 'undefined')
      return
    const keysToDelete: string[] = []
    for (let i = 0, len = localStorage.length; i < len; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(this.perfixKey))
        keysToDelete.push(key)
    }
    keysToDelete.forEach(key => localStorage.removeItem(key))
  }
}
