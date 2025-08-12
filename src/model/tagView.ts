import type { DynamicRoutesModel } from './menu'

export interface TagView {
  /**
   *  路由路径
   */
  fullPath: string
  /**
   *  路由名称
   */
  hash: string
  /**
   * 所属路由
   */
  matched: DynamicRoutesModel[]
}
