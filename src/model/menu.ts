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
export interface DynamicRoutesModel {
  /** 路由路径 */
  path: string
  /** 组件 */
  component: Component
  /** 是否隐藏 */
  hidden?: boolean
  /** 权限 */
  permissions?: string[]
  /** 角色列表 */
  roles?: string[]
  /** 子路由列表 */
  children?: DynamicChildrenRoutesModel[]
}
export interface DynamicChildrenRoutesModel {
  /** 路由路径 */
  path: string
  /** 组件 */
  component: Component
  /** 名称 */
  name?: string
  /** 元数据 */
  meta?: {
    /** 路由标题 */
    title: string
    /** 激活菜单 */
    activeMenu?: string
  }
}
