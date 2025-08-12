import type { CacheTime } from './cache'

import type { LoginFormModel } from '@/model/login'
import { name, version } from '../../../package.json'
import { Cache } from './cache'

interface CacheType {
  /**
   * 登录凭证
   */
  TOKEN: string
  /**
   * 登录用户密码
   */
  LOGIN_INFO: LoginFormModel
  /**
   * 侧边栏状态
   * 0 - 折叠
   * 1 - 展开
   */
  SIDEBAR_STATUS: 0 | 1
  /**
   *  屏幕尺寸
   * - default --- 默认
   * - large --- 大屏
   * - small --- 小屏
   */
  SIZE: 'default' | 'large' | 'small'
  /**
   * 布局设置
   */
  LAYOUT_SETTING: {
    /**
     * 网页标题
     */
    title: string
    /**
     * 侧边栏主题 深色主题-theme-dark，浅色主题-theme-light
     */
    sideTheme: 'theme-dark' | 'theme-light'
    /**
     * 是否系统布局配置
     */
    showSettings: boolean
    /**
     * 是否显示顶部导航
     */
    topNav: boolean
    /**
     * 是否显示 tagsView
     */
    tagsView: boolean
    /**
     * 显示页签图标
     */
    tagsIcon: boolean
    /**
     * 是否固定头部
     */
    fixedHeader: boolean
    /**
     * 是否显示logo
     */
    sidebarLogo: boolean
    /**
     * 是否显示动态标题
     */
    dynamicTitle: boolean
    /**
     * 是否显示底部版权
     */
    footerVisible: boolean
    /**
     * 底部版权文本内容
     */
    footerContent: string
  }
}
/**
 * 缓存
 */
const cache = new Cache<CacheType>(name, version)

/** */
export function getCacheToken() {
  return cache.get('TOKEN')
}

export function setCacheToken(token: string) {
  return cache.set('TOKEN', token, -1)
}

export function removeCacheToken() {
  return cache.remove('TOKEN')
}

/**
 * 限制 T 必须是 CacheType[keyof CacheType] 中的某一种
 */
/**
 * 通用 getCache，要求传入的 T 类型必须是 CacheType[keyof CacheType] 的某种
 * 同时传入 key 限制为 CacheType 的 key，确保类型一致
 */
export function getCache<K extends CacheType[keyof CacheType]>(
  key: string,
) {
  return cache.get<K>(key)
}
/**
 * 通用缓存方案 - set
 * @param key 缓存的键
 * @param value 缓存的值
 * @param expires 缓存的过期时间
 */
export function setCache<K extends keyof CacheType>(
  key: K,
  value: CacheType[K],
  expires?: number | Partial<CacheTime>,
) {
  return cache.set(key, value, expires)
}
/** 通用缓存方案 - remove */
export function removeCache(key: keyof CacheType) {
  return cache.remove(key)
}
