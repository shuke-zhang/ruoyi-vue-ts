<script setup lang="ts">
function handleTest() {
  // ElMessage.error('下载文件出现错误，请联系管理员！')
  confirmWarning('您的密码还是初始密码，请修改密码！', '安全提示', { confirmButtonText: '确定', cancelButtonText: '取消' }).then(() => {
    console.log('确定')
  }).catch(() => {
    console.log('取消')
  })
}
</script>

<template>
  <div class="container">
    ces
    <el-button type="primary" @click="handleTest">
      点击显示
    </el-button>
  </div>
</template>

<style scoped lang="scss">
</style>
