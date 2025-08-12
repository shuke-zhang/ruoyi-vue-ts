import defaultSettings from '@/setting'

/**
 * @description 动态修改标题
 * 如果开启了动态标题，则将当前页面标题设置为 `当前页面标题 - 系统标题`
 * 如果未开启动态标题，则将标题设置为系统标题
 */
export function useDynamicTitle() {
  const settingsStore = useSettingsStore()
  if (settingsStore.dynamicTitle) {
    document.title = `${settingsStore.title} - ${defaultSettings.title}`
  }
  else {
    document.title = defaultSettings.title
  }
}
