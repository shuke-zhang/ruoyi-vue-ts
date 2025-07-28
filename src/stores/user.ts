import type { UserInfoModel } from '@/model/user'
import { defineStore } from 'pinia'
import { getUserInfo as _getUserInfo, loginApi } from '@/api/login'
import defAva from '@/assets/images/profile.jpg'
import router from '@/router'
import { removeCacheToken, setCacheToken } from '@/utils/cache'

const SUPER_ADMIN = 'admin'

export const useUserStore = defineStore('user', () => {
  /** 用户id */
  const userId = ref<UserInfoModel['userId'] | null>(null)
  /** 用户姓名 */
  const userName = ref<UserInfoModel['userName'] | null>(null)
  /** 用户昵称 */
  const userNickName = ref<UserInfoModel['nickName'] | null>(null)
  /** 用户头像 */
  const avater = ref('')
  /** 用户角色 */
  const roles = ref<string[]>([])
  /** 用户权限 */
  const permissions = ref<string[]>([])

  return {
    userName,
    roles,
    permissions,
    avater,
    login,
    logout,
    getInfo,
    resetAllState,
    hasPermission,
    hasRole,
  }

  function login(...args: Parameters<typeof loginApi>) {
    return new Promise((resolve, reject) => {
      loginApi(...args).then((res) => {
        setCacheToken(res.accessToken)
        resolve(true)
      }).catch((error) => {
        reject(error)
      })
    })
  }
  function logout() {
    return new Promise<''>((resolve) => {
      resetAllState()
      removeCacheToken()
      resolve('')
    })
  }

  function getInfo() {
    return new Promise((resolve, reject) => {
      _getUserInfo().then((res) => {
        const user = res.user
        let avatar = user.avatar || ''
        if (!isHttp(avatar)) {
          avatar = (isEmpty(avatar)) ? defAva : import.meta.env.VITE_APP_BASE_API + avatar
        }
        if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          roles.value = res.roles
          permissions.value = res.permissions
        }
        else {
          roles.value = ['ROLE_DEFAULT']
        }
        userId.value = user.userId
        userName.value = user.userName
        userNickName.value = user.nickName
        if (res.isDefaultModifyPwd) {
          confirmWarning('您的密码还是初始密码，请修改密码！', '安全提示', { confirmButtonText: '确定', cancelButtonText: '取消' }).then(() => {
            router.push({ name: 'Profile', params: { activeTab: 'resetPwd' } })
          }).catch(() => {
            console.log('取消')
          })
        }
        if (!res.isDefaultModifyPwd && res.isPasswordExpired) {
          confirmWarning('您的密码已过期，请尽快修改密码！', '安全提示', { confirmButtonText: '确定', cancelButtonText: '取消' }).then(() => {
            router.push({ name: 'Profile', params: { activeTab: 'resetPwd' } })
          }).catch(() => { })
        }
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  function resetAllState() {
    userId.value = null
    userName.value = null
    userNickName.value = null
    avater.value = ''
    roles.value = []
    permissions.value = []
    removeCacheToken()
  }

  function hasPermission(requiredPermission: string): boolean {
    return permissions.value.includes(requiredPermission)
  }

  function hasRole(requiredRole: string): boolean {
    if (roles.value.includes(SUPER_ADMIN))
      return true
    return roles.value.includes(requiredRole)
  }
})
