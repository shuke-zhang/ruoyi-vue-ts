import type { RouteConfigModel } from '@/model/menu'
import type { UserInfoModel } from '@/model/user'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const routes = ref<RouteConfigModel[]>([])
  const userId = ref<UserInfoModel[] | null>(null)

  return {
    routes,
    userId,
  }
})
