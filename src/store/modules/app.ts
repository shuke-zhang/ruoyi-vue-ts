export const useAppStore = defineStore('app', () => {
  /**
   * @description: 侧边栏状态
   */
  const sidebar = ref({
    /** 是否折叠侧边栏 */
    opened: true,
    /** 是否无动画切换侧边栏 */
    withoutAnimation: false,
    /** 是否完全隐藏侧边栏 */
    hide: false,
  })
  /**
   * @description: 设备类型
   */
  const device = ref('desktop')
  /**
   * @description: 屏幕尺寸
   * - default --- 默认
   * - large --- 大屏
   * - small --- 小屏
   */
  const size = ref('default')

  /**
   * @description: 切换侧边栏状态
   * @param withoutAnimation 是否无动画切换侧边栏
   */
  function toggleSideBar(withoutAnimation: boolean) {
    if (sidebar.value.hide) {
      return sidebar.value.hide = false
    }
    sidebar.value.opened = !sidebar.value.opened
    sidebar.value.withoutAnimation = withoutAnimation
    if (sidebar.value.opened) {
      // 缓存为1
      setCache('SIDEBAR_STATUS', 1)
    }
    else {
      // 缓存为0
      setCache('SIDEBAR_STATUS', 0)
    }
  }
  /**
   *  @description: 关闭侧边栏
   */
  function closeSideBar(withoutAnimation: boolean) {
    sidebar.value.opened = false
    sidebar.value.withoutAnimation = withoutAnimation
    // 缓存为0
    setCache('SIDEBAR_STATUS', 0)
  }

  /**
   * @description: 切换设备类型
   */
  function toggleDevice(newDevice: string) {
    device.value = newDevice
  }
  /**
   * @description: 设置屏幕尺寸
   */
  function setSize(newSize: 'default' | 'large' | 'small') {
    size.value = newSize
    setCache('SIZE', newSize)
  }

  function toggleSideBarHide(status: boolean) {
    sidebar.value.hide = status
  }
  return {
    sidebar,
    device,
    size,
    toggleSideBar,
    closeSideBar,
    toggleDevice,
    setSize,
    toggleSideBarHide,
  }
})
