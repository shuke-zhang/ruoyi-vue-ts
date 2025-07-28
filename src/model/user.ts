export interface UserInfoModel {
  /** 创建人用户名 */
  createBy: string
  /** 创建时间 */
  createTime: string
  /** 最后更新人用户名 */
  updateBy?: string
  /** 最后更新时间 */
  updateTime?: string
  /** 备注信息 */
  remark: string
  /** 用户ID */
  userId: number
  /** 所属部门ID */
  deptId: number
  /** 登录账号 */
  userName: string
  /** 用户昵称 */
  nickName: string
  /** 邮箱 */
  email: string
  /** 手机号 */
  phonenumber: string
  /** 性别 1-男 2-女  */
  sex: string
  /** 用户头像地址 */
  avatar: string
  /** 加密后的密码 */
  password: string
  /** 用户状态（0正常 1停用） */
  status: string
  /** 删除标志（0存在 2删除） */
  delFlag: string
  /** 上次登录IP地址 */
  loginIp: string
  /** 上次登录时间（ISO 格式） */
  loginDate: string
  /** 密码最后更新时间（用于密码过期判断） */
  pwdUpdateDate: string
  /** 所属部门信息 */
  dept: Dept
  /** 所拥有的角色列表 */
  roles: Role[]
  /** 拥有的角色ID数组 */
  roleIds?: number[]
  /** 拥有的岗位ID数组 */
  postIds?: number[]
  /** 当前选中的角色ID */
  roleId?: number
  /** 是否为超级管理员 */
  admin: boolean
}
/**
 * 获取用户详情接口返回
 */
export interface ResponseUserInfo<T> {
  /**
   * 请求状态码
   */
  code: number
  /**
   * 用户首次登录后 强制修改密码
   */
  isDefaultModifyPwd: boolean
  /**
   * 密码是否已过期
   */
  isPasswordExpired: boolean
  /**
   * 权限
   */
  permissions: string[]
  /**
   * 角色
   */
  roles: string[]
  /**
   * 个人信息
   */
  user: T
}

/** 部门信息 */
export interface Dept {
  /** 创建人用户名 */
  createBy?: string
  /** 创建时间 */
  createTime?: string
  /** 最后更新人用户名 */
  updateBy?: string
  /** 最后更新时间 */
  updateTime?: string
  /** 备注信息 */
  remark?: string
  /** 部门ID */
  deptId: number
  /** 父部门ID */
  parentId: number
  /** 所有上级部门ID，格式如 0,100,101 */
  ancestors: string
  /** 部门名称 */
  deptName: string
  /** 排序编号 */
  orderNum: number
  /** 部门负责人 */
  leader: string
  /** 联系电话 */
  phone?: string
  /** 联系邮箱 */
  email?: string
  /** 部门状态（0正常 1停用） */
  status: string
  /** 删除标志（0代表存在 2代表删除） */
  delFlag?: string
  /** 上级部门名称 */
  parentName?: string
  /** 子部门列表 */
  children: any[] // 可进一步细化结构
}

/** 角色信息 */
export interface Role {
  /** 创建人用户名 */
  createBy?: string
  /** 创建时间 */
  createTime?: string
  /** 最后更新人用户名 */
  updateBy?: string
  /** 最后更新时间 */
  updateTime?: string
  /** 备注信息 */
  remark?: string
  /** 角色ID */
  roleId: number
  /** 角色名称 */
  roleName: string
  /** 角色权限字符串 */
  roleKey: string
  /** 角色排序 */
  roleSort: number
  /** 数据权限范围（1：全部数据权限） */
  dataScope: string
  /** 菜单树选择项是否关联显示 */
  menuCheckStrictly: boolean
  /** 部门树选择项是否关联显示 */
  deptCheckStrictly: boolean
  /** 角色状态（0正常 1停用） */
  status: string
  /** 删除标志 */
  delFlag?: string
  /** 是否已分配该角色 */
  flag: boolean
  /** 关联菜单ID列表 */
  menuIds?: any[]
  /** 关联部门ID列表 */
  deptIds?: any[]
  /** 权限标识集合 */
  permissions?: any[]
  /** 是否为超级管理员角色 */
  admin: boolean
}
