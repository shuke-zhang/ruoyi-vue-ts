function authPermission(permission: string | string[] | null): boolean {
  if (!permission)
    return false
  const all_permission = '*:*:*'
  const permissions = useUserStore().permissions
  const permissionList = Array.isArray(permission) ? permission : [permission]
  return permissionList.some(p =>
    permissions.some((v: string) => v === all_permission || v === p),
  )
}

function authRole(role: string) {
  const super_admin = 'admin'
  const roles = useUserStore().roles
  const roleList = Array.isArray(role) ? role : [role]

  return roleList.some(r =>
    roles.some((v: string) => v === super_admin || v === r),
  )
}

export default {
  /**
   * 验证用户是否具备某权限
   */
  hasPermi(permission: string) {
    return authPermission(permission)
  },
  /**
   * 验证用户是否含有指定权限，只需包含其中一个
   */
  hasPermiOr(permissions: string[]) {
    return permissions.some((item) => {
      return authPermission(item)
    })
  },
  /**
   * 验证用户是否含有指定权限，必须全部拥有
   */
  hasPermiAnd(permissions: string[]) {
    return permissions.every((item) => {
      return authPermission(item)
    })
  },
  /**
   * 验证用户是否具备某角色
   */
  hasRole(role: string) {
    return authRole(role)
  },
  /**
   * 验证用户是否含有指定角色，只需包含其中一个
   */
  hasRoleOr(roles: string[]) {
    return roles.some((item) => {
      return authRole(item)
    })
  },
  /**
   * 验证用户是否含有指定角色，必须全部拥有
   */
  hasRoleAnd(roles: string[]) {
    return roles.every((item) => {
      return authRole(item)
    })
  },
}
