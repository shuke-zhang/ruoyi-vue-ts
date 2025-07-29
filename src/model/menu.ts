import type { Component } from 'vue'

/**
 * 基础路由类型（支持多级嵌套）
 */
export interface RouteConfigModel {
  /** 路由名称（唯一标识） */
  name?: string
  /** 路由路径 */
  path: string
  /** 是否隐藏菜单项（不显示在侧边栏） */
  hidden?: boolean
  /** 组件路径（由前端动态导入） */
  component?: string | Component
  /** 重定向地址 */
  redirect?: string
  /** 是否总是显示根路由（即使只有一个子路由） */
  alwaysShow?: boolean
  /** 路由元数据 */
  meta?: RouteMetaModel
  /** 子路由列表 */
  children?: RouteConfigModel[]
}
/**
 * 路由元信息类型
 */
export interface RouteMetaModel {
  /** 路由标题，用于显示在侧边栏、面包屑等位置 */
  title: string
  /** 图标名称（与前端 icon 系统对应） */
  icon?: string
  /** 是否缓存该路由页面 */
  noCache?: boolean
  /** 外链地址（如果是外链） */
  link?: string | null
}
/**
 * 动态路由类型（用于权限控制）
 */
export interface RouteMetaModel {
  /** 路由标题，用于显示在侧边栏、面包屑等位置 */
  title: string
  /** 图标名称（与前端 icon 系统对应） */
  icon?: string
  /** 是否固定在标签页（如首页） */
  affix?: boolean
  /** 是否不缓存该页面（默认缓存） */
  noCache?: boolean
  /** 被激活的菜单路径（用于高亮菜单） */
  activeMenu?: string
  /** 外链地址（如果是外链） */
  link?: string | null
}

/**
 * 动态路由类型（支持权限控制、菜单隐藏、嵌套路由）
 */
export interface DynamicRoutesModel {
  /** 路由路径 */
  path: string

  /** 路由名称（可选，建议唯一） */
  name?: string

  /**
   * 路由对应组件
   * - 支持直接传入组件对象（Component）
   * - 支持字符串路径（由 loadView 动态导入）
   * - 支持函数懒加载组件 () => import(...)
   */
  component?: string | Component | (() => Promise<any>)

  /** 是否隐藏菜单项（不显示在侧边栏） */
  hidden?: boolean

  /** 重定向地址 */
  redirect?: string

  /** 始终显示根菜单项（即使只有一个子路由） */
  alwaysShow?: boolean

  /** 权限标识列表（控制访问权限） */
  permissions?: string[]

  /** 角色标识列表（控制访问权限） */
  roles?: string[]

  /** 路由元信息（用于菜单、标签、缓存控制等） */
  meta?: RouteMetaModel

  /** 子路由列表（支持递归） */
  children?: DynamicRoutesModel[]
}
