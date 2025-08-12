<script setup lang="ts">
import router from '@/router'

const emit = defineEmits<{
  (e: 'setLayout'): void
}>()
const appStore = useAppStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()

/**
 * 切换侧边栏状态
 */
function toggleSideBar() {
  appStore.toggleSideBar()
}

/**
 * 处理命令
 */
function handleCommand(command: 'setLayout' | 'logout') {
  switch (command) {
    case 'setLayout':
      setLayout()
      break
    case 'logout':
      logout()
      break
    default:
      break
  }
}

function setLayout() {
  emit('setLayout')
}

/**
 * 注销登录
 */
function logout() {
  confirmWarning('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(() => {
    userStore.logout().then(() => {
      // 清除缓存
      location.href = '/index'
    })
  }).catch(() => {
    // 取消操作
  })
}

function toggleTheme() {
  settingsStore.toggleTheme()
}
</script>

<template>
  <div class="h-[50px] overflow-hidden relative bg-[var(--navbar-bg)] shadow-[0_1px_4px_rgba(0,21,41,0.08)]">
    navbar
  </div>
</template>

<style scoped lang="scss">
</style>
