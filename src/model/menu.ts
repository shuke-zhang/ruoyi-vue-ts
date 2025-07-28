/**
 * 基础路由类型（支持多级嵌套）
 */
export interface RouteConfigModel {
  /** 路由名称（唯一标识） */
  name: string
  /** 路由路径 */
  path: string
  /** 是否隐藏菜单项（不显示在侧边栏） */
  hidden?: boolean
  /** 组件路径（由前端动态导入） */
  component?: string
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
