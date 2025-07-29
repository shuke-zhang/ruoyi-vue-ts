<script setup lang="ts">
import type { LoginFormModel } from '@/model/login'
import { getCodeImg } from '@/api/login'

const title = import.meta.env.VITE_APP_TITLE
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const _test = ref('')

const loginRef = useTemplateRef('loginFormRef')
const imgLoading = ref(false)
const loginForm = ref<LoginFormModel>({
  username: 'admin',
  password: 'admin123',
  rememberMe: false,
  code: '',
  uuid: '',
})

const loginRules = {
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
  code: [{ required: true, trigger: 'change', message: '请输入验证码' }],
}
const codeUrl = ref('data:image/gif;base64,')
const loading = ref(false)
/** 是否启用验证码开关 */
const captchaEnabled = ref(true)
/** 注册开关 */
const register = ref(false)
const redirect = ref<string | undefined>(undefined)

/**
 * 获取验证码
 */
function getCode() {
  imgLoading.value = true
  getCodeImg().then((res) => {
    captchaEnabled.value
      = res.captchaEnabled === undefined ? true : res.captchaEnabled
    if (captchaEnabled.value) {
      codeUrl.value = `data:image/gif;base64,${res.img}`
      loginForm.value.uuid = res.uuid
    }
  }).finally(() => {
    imgLoading.value = false
  })
}

/**
 * 登录方法
 */
function handleLogin() {
  loginRef.value?.validate((valid) => {
    if (valid) {
      console.log('验证通过')
      loading.value = true
      if (loginForm.value.rememberMe) {
        const data = {
          username: loginForm.value.username,
          password: encrypt(loginForm.value.password),
          rememberMe: loginForm.value.rememberMe,
        }
        setCache('LOGIN_INFO', data, { day: 2 })
      }
      else {
        removeCache('LOGIN_INFO')
      }

      userStore
        .login(loginForm.value)
        .then(() => {
          const query = route.query
          const otherQueryParams = Object.keys(query).reduce(
            (acc: { [key: string]: any }, cur) => {
              if (cur !== 'redirect') {
                acc[cur] = query[cur]
              }
              return acc
            },
            {},
          )
          router.push({ path: redirect.value || '/', query: otherQueryParams })
          console.log('登录成功')
        })
        .catch(() => {
          loading.value = false
          // 重新获取验证码
          if (captchaEnabled.value) {
            getCode()
          }
        })
    }
  })
}

/**
 * 通过缓存来获取数据
 */
function getCatchForm() {
  const { username, password, rememberMe, status } = getCache<LoginFormModel>('LOGIN_INFO')
  console.log(status, 'status缓存状态')

  if (status === 'expired') {
    showMessageWarning('登录信息已过期，请重新输入')
    return
  }
  loginForm.value = {
    username: username === undefined ? loginForm.value.username : username,
    password:
      password === undefined ? loginForm.value.password : decrypt(password),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
  }
}

watch(
  route,
  (newRoute) => {
    redirect.value = newRoute.query && (newRoute.query.redirect as string)
  },
  { immediate: true },
)

onMounted(() => {
  getCode()
  getCatchForm()
})
</script>

<template>
  <div class="login-container flex justify-center items-center h-full bg-cover">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="z-[1] w-[400px] rounded-[6px] bg-white px-[25px] pt-[25px] pb-[5px]"
    >
      <h3 class="text-[#707070] mx-auto mb-[30px] text-center">
        {{ title }}
      </h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="账号"
        >
          <template #prefix>
            <icon-font name="user" class="el-input__icon input-icon" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          size="large"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="handleLogin"
        >
          <template #prefix>
            <icon-font name="account-lock" class="el-input__icon input-icon" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        v-if="captchaEnabled"
        prop="code"
      >
        <div class="w-full flex justify-between">
          <el-input
            v-model="loginForm.code"
            size="large"
            auto-complete="off"
            placeholder="验证码"
            style="width: 65%"
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <icon-font
                name="setting"
                class="el-input__icon input-icon"
              />
            </template>
          </el-input>
          <div class="w-[33%] h-[40px] float-right">
            <!-- <img
              :src="codeUrl"
              class="cursor-pointer align-middle h-[40px] pl-[12px]"
              @click="getCode"
            > -->
            <el-image v-loading="imgLoading" :src="codeUrl" class="cursor-pointer align-middle h-[40px] w-full pl-[12px]" @click="getCode">
              <template #error>
                <div class="cursor-pointer align-middle h-[40px] pl-[12px]" />
              </template>
            </el-image>
          </div>
        </div>
      </el-form-item>
      <el-checkbox
        v-model="loginForm.rememberMe"
        style="margin: 0px 0px 25px 0px"
      >
        记住密码
      </el-checkbox>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="large"
          type="primary"
          style="width: 100%"
          @click.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div v-if="register" class="w-full flex justify-end ">
          <router-link class="text-[#337ab7] hover:text-[rgb(32,160,255)] cursor-pointer focus:text-[#337ab7]" to="/register">
            立即注册
          </router-link>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  background-image: url('../assets/images/login-background.jpg');
}
.el-input {
  height: 40px;
  input {
    height: 40px;
  }
}
.input-icon {
  height: 39px;
  width: 14px;
  margin-left: 0px;
}
</style>
