/**
 * @description 判断url是否是http或https
 * @param {string} url - 待检测的 URL 字符串
 * @returns {boolean} 返回 true 表示是 http/https，false 表示不是
 */
export function isHttp(url: string) {
  return url.includes('http://') || url.includes('https://')
}

/**
 * @description 判断value字符串是否为空
 * @param {string} value
 * @returns {boolean} true-空数据
 */
export function isEmpty(value: null | string | undefined) {
  if (value == null || value === '' || value === undefined || value === 'undefined') {
    return true
  }
  return false
}
