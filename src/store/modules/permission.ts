import type { RouteRecordRaw } from 'vue-router'
import type { DynamicRoutesModel, RouteConfigModel } from '@/model/menu'
import { defineStore } from 'pinia'
import { getRouters } from '@/api/menu'
import ParentView from '@/components/ParentView/index.vue'
import InnerLink from '@/layout/components/InnerLink/index.vue'
import Layout from '@/layout/index.vue'
import auth from '@/plugins/auth'
import router, { constantRoutes, dynamicRoutes } from '@/router'
// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

export const usePermissionStore = defineStore('permission', (): {
  routes: Ref<RouteConfigModel[]>
  addRoutes: Ref<RouteConfigModel[]>
  defaultRoutes: Ref<RouteConfigModel[]>
  topbarRouters: Ref<RouteConfigModel[]>
  sidebarRouters: Ref<RouteConfigModel[]>
  setRoutes: (routes: RouteConfigModel[]) => void
  setDefaultRoutes: (routes: RouteConfigModel[]) => void
  setTopbarRoutes: (routes: RouteConfigModel[]) => void
  setSidebarRouters: (routes: RouteConfigModel[]) => void
  generateRoutes: () => Promise<RouteConfigModel[]>
} => {
  /** 最终合成的路由 */
  const routes = ref<RouteConfigModel[]>([])
  const addRoutes = ref<RouteConfigModel[]>([])
  const defaultRoutes = ref<RouteConfigModel[]>([])
  const topbarRouters = ref<RouteConfigModel[]>([])
  const sidebarRouters = ref<RouteConfigModel[]>([])

  function setRoutes(routes: RouteConfigModel[]) {
    addRoutes.value = routes
  }
  function setDefaultRoutes(routes: RouteConfigModel[]) {
    defaultRoutes.value = routes
  }

  function setTopbarRoutes(routes: RouteConfigModel[]) {
    topbarRouters.value = routes
  }
  function setSidebarRouters(routes: RouteConfigModel[]) {
    sidebarRouters.value = routes
  }

  /**
   * 请求路由函数
   */
  function generateRoutes() {
    return new Promise<RouteConfigModel[]>((resolve, reject) => {
      getRouters().then((res) => {
        const sdata = JSON.parse(JSON.stringify(res.data))
        const rdata = JSON.parse(JSON.stringify(res.data))
        const defaultData = JSON.parse(JSON.stringify(res.data))
        // 用于左侧菜单
        const sidebarRoutes = filterAsyncRouter(sdata)
        // 用于顶部菜单
        const rewriteRoutes = filterAsyncRouter(rdata, false, true)
        // 用于默认路由
        const defaultRoutes = filterAsyncRouter(defaultData)
        // 合并静态路由和动态路由
        const asyncRoutes = filterDynamicRoutes(dynamicRoutes)
        asyncRoutes.forEach((route) => {
          router.addRoute(route as RouteRecordRaw)
        })
        setRoutes(rewriteRoutes)
        setSidebarRouters(constantRoutes.concat(sidebarRoutes))
        setDefaultRoutes(sidebarRoutes)
        setTopbarRoutes(defaultRoutes)
        resolve(rewriteRoutes)
      }).catch((error) => {
        reject(error)
      })
    })
  }
  return {
    routes,
    addRoutes,
    defaultRoutes,
    topbarRouters,
    sidebarRouters,
    setRoutes,
    setDefaultRoutes,
    setTopbarRoutes,
    setSidebarRouters,
    generateRoutes,
  }
})

/**
 * 遍历后台传来的路由字符串，转换为组件对象
 * @param asyncRouterMap 后端返回的原始路由表
 * @param _lastRouter 父路由对象（用于拼接路径）
 * @param type 是否用于顶部导航栏，若为 true 则处理 children（子路由）
 */
function filterAsyncRouter(asyncRouterMap: RouteConfigModel[], _lastRouter = false, type = false) {
  return asyncRouterMap.filter((route) => {
    // 扁平化处理 主要是用于顶部菜单
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    // 有组件的情况
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      }
      else if (route.component === 'ParentView') {
        route.component = ParentView
      }
      else if (route.component === 'InnerLink') {
        route.component = InnerLink
      }
      else {
        // 普通组件处理
        route.component = loadView(route.component as string)
      }
    }
    // 递归处理
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, !!route, type)
    }
    else {
      delete route.children
      delete route.redirect
    }
    return true
  })
}

/**
 * 处理子路由，拼接路径，展开 ParentView 子路由
 * @param childrenMap 子路由列表
 * @param lastRouter 父级路由（用于拼接路径）
 */
function filterChildren(childrenMap: RouteConfigModel[], lastRouter: RouteConfigModel | false = false) {
  let children: RouteConfigModel[] = []
  childrenMap.forEach((el) => {
    el.path = lastRouter ? `${lastRouter.path}/${el.path}` : el.path
    if (el.children && el.children.length && el.component === 'ParentView') {
      children = children.concat(filterChildren(el.children, el))
    }
    else {
      children.push(el)
    }
  })
  return children
}

/**
 * 权限过滤动态路由（根据 route.permissions 或 route.roles 判断） 动态路由遍历，验证是否具备权限
 * @param routes 动态路由列表
 * @returns 过滤后的路由列表
 */
export function filterDynamicRoutes(routes: DynamicRoutesModel[]) {
  const res: RouteConfigModel[] = []
  routes.forEach((route) => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route)
      }
    }
    else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route)
      }
    }
  })
  return res
}

/**
 * 动态导入组件
 * @param view 路由中的 component 字段，例如 "system/user/index"
 * @returns 组件的异步导入函数
 */
export function loadView(view: string) {
  let res
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0]
    if (dir === view) {
      res = () => modules[path]()
    }
  }
  return res
}
