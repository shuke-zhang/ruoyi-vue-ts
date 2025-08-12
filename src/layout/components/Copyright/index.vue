<script setup lang="ts">
const settingsStore = useSettingsStore()

const visible = computed(() => settingsStore.footerVisible)
const content = computed(() => settingsStore.footerContent)
</script>

<template>
  <footer
    v-if="visible"
    class="
    fixed
    bottom-[0]
    left-[0]
    right-[0]
    h-[36px]
    px-[20px]
    py-[10px]
    text-right
    bg-[#f8f8f8]
    text-[#666]
    text-[14px]
    border-t-[1px]
    border-t-[#e7e7e7]
    z-[999]
    "
  >
    <span>{{ content }}</span>
  </footer>
</template>

<style scoped>
</style>
