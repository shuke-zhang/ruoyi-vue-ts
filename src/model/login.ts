/**
 * 登录参数
 */
export interface LoginFormModel {
  /**
   * 是否记住密码
   */
  rememberMe: boolean
  /**
   * 用户名
   */
  username: string
  /**
   * 密码
   */
  password: string
  /**
   * 验证码
   */
  code?: string
  /**
   * 验证码uuid
   */
  uuid?: string
}

/**
 * 验证码参数
 */
export interface CodeImgModel {
  /**
   * 请求状态的msg
   */
  msg: string
  /**
   * 图片的base64数据、需要添加前缀
   */
  img: string
  /**
   * 请求的状态码
   */
  code: string
  /**
   * 是否启用验证码功能
   */
  captchaEnabled: boolean
  /**
   * 验证码uuid
   */
  uuid: string
}
