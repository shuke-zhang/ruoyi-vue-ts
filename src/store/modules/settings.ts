import { useDark, useToggle } from '@vueuse/core'
import defaultSettings from '@/setting'

const {
  sideTheme: _sideTheme,
  showSettings: _showSettings,
  topNav: _topNav,
  tagsView: _tagsView,
  tagsIcon: _tagsIcon,
  fixedHeader: _fixedHeader,
  sidebarLogo: _sidebarLogo,
  dynamicTitle: _dynamicTitle,
  footerVisible: _footerVisible,
  footerContent: _footerContent,
} = defaultSettings
/**
 *  - true 表示暗黑模式
 *  - false 表示亮色模式
 */
const _isDark = useDark()
const toggleDark = useToggle(_isDark)
const storageSetting = JSON.parse(JSON.stringify(localStorage.getItem('layout-setting'))) || ''

/**
 * useSettingsStore 是一个用于管理系统布局和主题设置的 Pinia 仓库。
 *
 * 该仓库包含以下功能：
 * - 管理网页标题、侧边栏主题、顶部导航、标签视图、标签图标、固定头部、侧边栏Logo、动态标题、页脚可见性和内容、暗黑模式等设置项。
 * - 每个设置项都优先从本地存储（storageSetting）中读取，否则使用默认值。
 * - 提供响应式的设置项，便于在组件中实时响应变化。
 *
 * @returns {object} 包含所有系统设置项的响应式引用和对象。
 */
export const useSettingsStore = defineStore('settings', () => {
  /** 网页标题 */
  const title = ref('')
  /** 侧边栏主题 深色主题-theme-dark，浅色主题-theme-light */
  const theme = ref(storageSetting.sideTheme || '#409EFF')
  /** 侧边栏主题 深色主题-theme-dark，浅色主题-theme-light */
  const sideTheme = ref(storageSetting.sideTheme || _sideTheme)
  /** 是否系统布局配置 */
  const showSettings = ref(_showSettings)
  /** 是否显示顶部导航 */
  const topNav = ref(storageSetting.topNav === undefined ? _topNav : storageSetting.topNav)
  /** 是否显示 tagsView */
  const tagsView = ref(storageSetting.tagsView === undefined ? _tagsView : storageSetting.tagsView)
  /** 显示页签图标 */
  const tagsIcon = ref(storageSetting.tagsIcon === undefined ? _tagsIcon : storageSetting.tagsIcon)
  /** 是否固定头部 */
  const fixedHeader = ref(storageSetting.fixedHeader === undefined ? _fixedHeader : storageSetting.fixedHeader)
  /** 是否显示logo */
  const sidebarLogo = ref(storageSetting.sidebarLogo === undefined ? _sidebarLogo : storageSetting.sidebarLogo)
  /** 是否显示底部版权 */
  const footerVisible = ref(storageSetting.footerVisible === undefined ? _footerVisible : storageSetting.footerVisible)
  /** 底部版权文本内容 */
  const dynamicTitle = ref(storageSetting.dynamicTitle === undefined ? _dynamicTitle : storageSetting.dynamicTitle)
  /** 是否显示动态标题 */
  const footerContent = ref(storageSetting.footerContent || _footerContent)
  /** 是否暗黑模式 */
  const isDark = ref(_isDark.value)
  const stateMap = {
    title,
    theme,
    sideTheme,
    showSettings,
    topNav,
    tagsView,
    tagsIcon,
    fixedHeader,
    sidebarLogo,
    dynamicTitle,
    footerVisible,
    footerContent,
    isDark,
  }
  /**
   * 修改布局设置
   */
  function changeSetting<K extends keyof typeof stateMap>(data: {
    key: keyof typeof stateMap
    value: typeof stateMap[K]['value']
  }) {
    const { key, value } = data
    if (Object.prototype.hasOwnProperty.call(stateMap, key)) {
      stateMap[key].value = value
    }
  }
  /**
   * 设置网页标题
   */
  function setTitle(newTitle: string) {
    title.value = newTitle
    useDynamicTitle()
  }
  /**
   * 切换暗黑模式
   */
  function toggleTheme() {
    isDark.value = !isDark.value
    toggleDark()
  }
  return {
    ...stateMap,
    changeSetting,
    setTitle,
    toggleDark,
    toggleTheme,
  }
})
