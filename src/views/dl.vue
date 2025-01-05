<template>
  <div class="login-container">
    <el-card class="form-container">
      <div class="form-wrapper">
        <!-- 标题栏 -->
        <div class="tabs-header">
          <div 
            class="tab-item" 
            :class="{ 'active': !isRegisterMode }"
            @click="switchMode(false)"
          >
            登录
          </div>
          <div 
            class="tab-item" 
            :class="{ 'active': isRegisterMode }"
            @click="switchMode(true)"
          >
            注册
          </div>
          <div class="sliding-bar" :class="{ 'slide': isRegisterMode }"></div>
        </div>

        <!-- 表单区域 -->
        <div 
          class="forms-container" 
          :class="{ 'slide': isRegisterMode }"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
        >
          <!-- 登录表单 -->
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            class="form"
            @submit.prevent="handleLogin"
          >
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                :prefix-icon="User"
                placeholder="用户名"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                :prefix-icon="Lock"
                type="password"
                placeholder="密码"
                show-password
              />
            </el-form-item>
            <el-form-item prop="captcha" class="captcha-item">
              <div class="captcha-wrapper">
                <el-input
                  v-model="loginForm.captcha"
                  placeholder="验证码"
                  :prefix-icon="Key"
                />
                <div class="captcha-image" @click="refreshCaptcha">
                  <img :src="captchaImg" alt="验证码" />
                </div>
              </div>
            </el-form-item>
            <el-button type="primary" class="submit-btn" native-type="submit">
              登录
            </el-button>
          </el-form>

          <!-- 注册表单 -->
          <el-form
            ref="registerFormRef"
            :model="registerForm"
            :rules="registerRules"
            @submit.prevent="handleRegister"
            class="form"
          >
            <el-form-item prop="username">
              <el-input
                v-model="registerForm.username"
                :prefix-icon="User"
                placeholder="用户名"
              />
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                v-model="registerForm.email"
                :prefix-icon="Message"
                placeholder="邮箱"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="registerForm.password"
                :prefix-icon="Lock"
                type="password"
                placeholder="密码"
                show-password
              />
            </el-form-item>
            <el-form-item prop="captcha" class="captcha-item">
              <div class="captcha-wrapper">
                <el-input
                  v-model="registerForm.captcha"
                  placeholder="验证码"
                  :prefix-icon="Key"
                />
                <div class="captcha-image" @click="refreshCaptcha">
                  <img :src="captchaImg" alt="验证码" />
                </div>
              </div>
            </el-form-item>
            <el-button 
              type="primary" 
              class="submit-btn" 
              native-type="submit"
              :loading="loading"
              :disabled="loading"
            >
              {{ loading ? '注册中...' : '注册' }}
            </el-button>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(-45deg, #e6f3ff, #f0f7ff, #e8f0ff, #f5f9ff);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  position: relative;
  overflow: hidden;
}

/* 保留渐变动画 */
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .login-container {
    background: linear-gradient(-45deg, #1a2942, #1e3148, #1c2b3e, #233044);
    background-size: 400% 400%;
  }
}

/* 移动端优化 */
@media (max-width: 480px) {
  .login-container {
    background: linear-gradient(-45deg, #f0f7ff, #ffffff, #e8f0ff, #f8faff);
    background-size: 400% 400%;
    animation: gradientBG 20s ease infinite; /* 移动端放慢动画速度 */
  }
}

.form-container {
  width: 420px;
  padding: 0;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.form-wrapper {
  padding: 20px;
}

/* 标题栏样式 */
.tabs-header {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  padding: 5px;
  border-radius: 8px;
  background: var(--el-fill-color-light);
}

.tab-item {
  position: relative;
  z-index: 1;
  padding: 12px 40px;
  font-size: 16px;
  color: var(--el-text-color-secondary);
  cursor: pointer;
  transition: color 0.3s ease;
}

.tab-item.active {
  color: var(--el-color-primary);
}

.sliding-bar {
  position: absolute;
  left: 5px;
  top: 5px;
  width: calc(50% - 10px);
  height: calc(100% - 10px);
  background: white;
  border-radius: 6px;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.sliding-bar.slide {
  transform: translateX(100%);
}

/* 表单容器样式 */
.forms-container {
  position: relative;
  width: 100%;
  height: 380px;
  overflow: hidden;
  touch-action: pan-x;
  user-select: none;
}

.form {
  position: absolute;
  width: 100%;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.forms-container.slide .form:first-child {
  transform: translateX(-100%);
  opacity: 0;
}

.forms-container.slide .form:last-child {
  transform: translateX(0);
  opacity: 1;
}

.form:first-child {
  transform: translateX(0);
  opacity: 1;
}

.form:last-child {
  transform: translateX(100%);
  opacity: 0;
}

/* 表单项动画 */
.el-form-item {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form .el-form-item:nth-child(1) { animation-delay: 0.1s; }
.form .el-form-item:nth-child(2) { animation-delay: 0.2s; }
.form .el-form-item:nth-child(3) { animation-delay: 0.3s; }

/* 按钮样式 */
.submit-btn {
  width: 100%;
  height: 40px;
  margin-top: 20px;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(var(--el-color-primary-rgb), 0.3);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-container {
    padding: 15px;
    background: linear-gradient(135deg, #e6f3ff, #ffffff, #f0f7ff);
  }

  .form-container {
    width: 100%;
    margin: 0;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  }

  .form-wrapper {
    padding: 15px;
  }

  /* 标题栏移动端样式 */
  .tabs-header {
    margin-bottom: 25px;
    padding: 4px;
    border-radius: 10px;
  }

  .tab-item {
    padding: 10px 20px;
    font-size: 15px;
  }

  /* 表单容器移动端样式 */
  .forms-container {
    height: 420px;
    min-height: 380px;
  }

  .form {
    padding: 0 5px;
  }

  /* 输入框移动端样式 */
  .el-input :deep(.el-input__wrapper) {
    padding: 8px 12px;
    border-radius: 8px;
  }

  .el-input :deep(.el-input__inner) {
    font-size: 14px;
  }

  /* 表单项间距调整 */
  .el-form-item {
    margin-bottom: 16px;
  }

  /* 按钮移动端样式 */
  .submit-btn {
    height: 42px;
    margin-top: 15px;
    font-size: 15px;
    border-radius: 10px;
  }

  /* 动画优化 */
  .forms-container.slide .form:first-child {
    transform: translateX(-80%);
  }

  .form:last-child {
    transform: translateX(80%);
  }

  /* 添加底部安全距 */
  .form:last-child {
    margin-bottom: 20px;
  }

  /* 优化表单项动画 */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 减少动画延迟时间 */
  .form .el-form-item:nth-child(1) { animation-delay: 0.05s; }
  .form .el-form-item:nth-child(2) { animation-delay: 0.1s; }
  .form .el-form-item:nth-child(3) { animation-delay: 0.15s; }
}

/* 添加深色模式支持 */
@media (prefers-color-scheme: dark) {
  .login-container {
    background: linear-gradient(-45deg, #2c1810, #2c1018, #0a1f2c, #0a2c1f);
    background-size: 400% 400%;
    animation: gradientBG 15s ease infinite;
  }

  .form-container {
    background: #2c2c2c;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .tabs-header {
    background: rgba(255, 255, 255, 0.05);
  }

  .sliding-bar {
    background: rgba(255, 255, 255, 0.1);
  }

  .tab-item {
    color: rgba(255, 255, 255, 0.6);
  }

  .tab-item.active {
    color: var(--el-color-primary);
  }
}

/* 添加横屏模式支持 */
@media (max-width: 480px) and (orientation: landscape) {
  .login-container {
    padding: 10px;
  }

  .form-container {
    max-height: 90vh;
    overflow-y: auto;
  }

  .forms-container {
    height: 360px;
    min-height: 340px;
  }

  .form-wrapper {
    padding: 12px;
  }

  /* 化横屏时的表单间距 */
  .el-form-item {
    margin-bottom: 12px;
  }

  .submit-btn {
    margin-top: 12px;
  }
}

/* 添加 iPhone 安全域支持 */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .login-container {
    padding-bottom: env(safe-area-inset-bottom);
  }
}

/* 化触摸交互 */
@media (hover: none) {
  .submit-btn:active {
    transform: scale(0.98);
  }

  .tab-item {
    -webkit-tap-highlight-color: transparent;
  }
}

/* 输入框基础样式优化 */
.el-input :deep(.el-input__wrapper) {
  padding: 12px 15px;
  height: 52px;
  border-radius: 12px;
  background: #f8faff;
  border: 1px solid #e8eeff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.el-input :deep(.el-input__wrapper):hover {
  background: #fff;
  border-color: var(--el-color-primary-light-5);
  box-shadow: 0 4px 16px rgba(var(--el-color-primary-rgb), 0.1);
}

.el-input :deep(.el-input__wrapper.is-focus) {
  background: #fff;
  border-color: var(--el-color-primary);
  box-shadow: 0 4px 16px rgba(var(--el-color-primary-rgb), 0.15);
}

.el-input :deep(.el-input__inner) {
  font-size: 16px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.el-input :deep(.el-input__prefix-inner) {
  font-size: 20px;
  color: var(--el-text-color-secondary);
  transition: all 0.3s ease;
}

.el-input :deep(.el-input__inner::placeholder) {
  color: #a1a8c3;
  font-size: 15px;
  font-weight: 400;
}

/* 表单项间距 */
.el-form-item {
  margin-bottom: 20px;
}

/* 移动端输入框样式优化 */
@media (max-width: 480px) {
  .el-input :deep(.el-input__wrapper) {
    height: 48px;
    padding: 10px 14px;
    border-radius: 10px;
  }

  .el-input :deep(.el-input__inner) {
    font-size: 15px;
  }

  .el-input :deep(.el-input__prefix-inner) {
    font-size: 18px;
  }
  
  /* 添加滑动提示 */
  .forms-container::after {
    content: '';
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 4px;
    background: rgba(var(--el-color-primary-rgb), 0.2);
    border-radius: 2px;
    opacity: 0.6;
  }
}

/* 深色模式输入框样式 */
@media (prefers-color-scheme: dark) {
  .el-input :deep(.el-input__wrapper) {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }

  .el-input :deep(.el-input__wrapper):hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--el-color-primary-light-5);
  }

  .el-input :deep(.el-input__wrapper.is-focus) {
    background: rgba(255, 255, 255, 0.12);
    border-color: var(--el-color-primary);
  }

  .el-input :deep(.el-input__inner) {
    color: rgba(255, 255, 255, 0.9);
  }

  .el-input :deep(.el-input__inner::placeholder) {
    color: rgba(255, 255, 255, 0.45);
  }
}

/* 横屏模式输入框优化 */
@media (max-width: 480px) and (orientation: landscape) {
  .el-input :deep(.el-input__wrapper) {
    height: 40px;
    padding: 8px 12px;
  }

  .el-form-item {
    margin-bottom: 12px;
  }
}

/* 输入框动画优化 */
.el-input :deep(.el-input__wrapper) {
  will-change: transform, box-shadow;
}

/* 输入框图标动画 */
.el-input :deep(.el-input__prefix-inner) {
  transition: color 0.3s ease;
}

.el-input:hover :deep(.el-input__prefix-inner) {
  color: var(--el-color-primary);
}

/* 输入框占位符样式 */
.el-input :deep(.el-input__inner::placeholder) {
  color: var(--el-text-color-placeholder);
  font-size: 14px;
}

/* 输入框聚焦时的图标颜色 */
.el-input :deep(.el-input__wrapper.is-focus) .el-input__prefix-inner {
  color: var(--el-color-primary);
}

/* 表单验证错误状态样式 */
.el-form-item.is-error :deep(.el-input__wrapper) {
  background: #fff5f5;
  border-color: var(--el-color-danger);
  box-shadow: 0 2px 12px rgba(245, 108, 108, 0.1);
}

/* iPhone SE 等小屏设备适配 */
@media (max-width: 320px) {
  .el-input :deep(.el-input__wrapper) {
    height: 40px;
    padding: 8px 10px;
  }

  .el-input :deep(.el-input__inner) {
    font-size: 13px;
  }

  .el-input :deep(.el-input__prefix) {
    font-size: 15px;
    margin-right: 6px;
  }
}

/* 添加滑动反馈动画 */
@keyframes slideHint {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
}

/* 表单验证状态样式优化 */
.el-form-item.is-error :deep(.el-input__wrapper) {
  background: #fff5f5;
  border-color: var(--el-color-danger);
  box-shadow: 0 2px 12px rgba(245, 108, 108, 0.1);
}

.el-form-item.is-success :deep(.el-input__wrapper) {
  background: #f6fff6;
  border-color: var(--el-color-success);
  box-shadow: 0 2px 12px rgba(103, 194, 58, 0.1);
}

/* 验证码样式 */
.captcha-item {
  margin-bottom: 20px;
}

/* 验证码布局调整 */
.captcha-wrapper {
  display: flex;
  gap: 12px;
  align-items: stretch;
  min-height: 52px;
}

/* 验证码输入框宽度调整为55% */
.captcha-wrapper .el-input {
  width: 55% !important;
}

/* 验证码图片容器宽度调整为45% */
.captcha-image {
  flex: none;
  width: calc(45% - 12px); /* 减去gap的宽度 */
  height: 52px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 12px;
  background: #f8faff;
  border: 1px solid #e8eeff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

/* 移动端适配 */
@media (max-width: 480px) {
  .captcha-wrapper .el-input {
    width: 55% !important;
  }
  
  .captcha-image {
    width: calc(45% - 10px); /* 移动端gap为10px */
  }
}

/* 小屏幕设备适配 */
@media (max-width: 320px) {
  .captcha-wrapper {
    min-height: 44px;
    gap: 8px;
  }

  .captcha-input {
    width: 42% !important; /* 小屏幕更小的输入框宽度 */
  }

  .captcha-image {
    width: 120px;
    height: 44px;
  }
}

/* 验证码输入框样式优化 */
.captcha-input :deep(.el-input__wrapper) {
  height: 100%;
  padding: 0 12px; /* 减小输入框内边距 */
}

.captcha-input :deep(.el-input__inner) {
  text-align: center;
  letter-spacing: 3px; /* 增加字符间距 */
  font-size: 18px;
  font-weight: 600;
  padding: 0;
}

/* 验证码图片样式 */
.captcha-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  image-rendering: -webkit-optimize-contrast; /* 提高图片清晰度 */
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .captcha-image {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .captcha-image:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--el-color-primary-light-5);
  }
}

/* 加载动画 */
@keyframes captchaLoading {
  0% { opacity: 0.6; }
  50% { opacity: 0.8; }
  100% { opacity: 0.6; }
}

.captcha-image.loading {
  animation: captchaLoading 1.5s infinite;
}
</style>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { User, Lock, Message, Key } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const router = useRouter()


const isRegisterMode = ref(false)
const loginFormRef = ref(null)
const registerFormRef = ref(null)

// 验证码相关
const captchaImg = ref('')
const captchaKey = ref('')

// 表单验证规则
const loginRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' }
  ]
}

const registerRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' }
  ]
}

const loginForm = reactive({
  username: '',
  password: '',
  captcha: ''
})

const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  captcha: ''
})

const switchMode = (isRegister) => {
  isRegisterMode.value = isRegister
  // 重置表单
  if (isRegister) {
    loginFormRef.value?.resetFields()
  } else {
    registerFormRef.value?.resetFields()
  }
}

// 调整验证码生成尺寸和位置
const generateCaptcha = () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  // 增加画布尺寸
  canvas.width = 140
  canvas.height = 52
  
  // 生成随机验证码
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  captchaKey.value = code.toLowerCase()

  // 调整字体大小和位置
  ctx.font = 'bold 30px Arial'
  for (let i = 0; i < code.length; i++) {
    ctx.fillStyle = `rgb(${Math.random() * 80}, ${Math.random() * 80}, ${Math.random() * 80})`
    ctx.shadowBlur = 2
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
    const x = 32 + i * 28 // 增加字符间距
    const y = canvas.height / 2 + Math.random() * 6 - 3
    ctx.fillText(code[i], x, y)
  }

  // 优化干扰线位置
  ctx.shadowBlur = 0
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = `rgba(${Math.random() * 120}, ${Math.random() * 120}, ${Math.random() * 120}, 0.3)`
    ctx.beginPath()
    ctx.moveTo(20 + Math.random() * 100, Math.random() * canvas.height)
    ctx.lineTo(20 + Math.random() * 100, Math.random() * canvas.height)
    ctx.stroke()
  }

  // 调整噪点分布
  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = `rgba(${Math.random() * 120}, ${Math.random() * 120}, ${Math.random() * 120}, 0.2)`
    ctx.beginPath()
    ctx.arc(20 + Math.random() * 100, Math.random() * canvas.height, 1, 0, 2 * Math.PI)
    ctx.fill()
  }

  captchaImg.value = canvas.toDataURL('image/png')
}

// 后端验证码接口（注释后续启用）
/*
const getCaptcha = async () => {
  try {
    const res = await axios.get('/api/captcha')
    captchaImg.value = res.data.image
    captchaKey.value = res.data.key
  } catch (error) {
    ElMessage.error('获取验证码失败')
  }
}
*/

// 刷新验证码
const refreshCaptcha = () => {
  generateCaptcha() // 使用模拟方式
  // getCaptcha() // 后续启用后端接口
}

// 验证码验证
const validateCaptcha = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入验证码'))
  } else if (value.toLowerCase() !== captchaKey.value) {
    callback(new Error('验证码错误'))
    refreshCaptcha() // 验证失败刷新验证码
  } else {
    callback()
  }
}

// 登录处理
const handleLogin = async () => {
  if (!loginFormRef.value) return
  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // 发送登录请求到后端
        const res = await axios.post('http://localhost:8080/api/users/login', {
          username: loginForm.username,
          password: loginForm.password
        })

        // 打印原始响应数据
        console.log('登录响应数据:', res.data)

        // 解构响应数据，使用正确的字段名
        const { userid, token, role, fullname } = res.data

        // 使用 Pinia store 存储用户信息
        userStore.setUserInfo({
          userid: userid,
          username: loginForm.username,
          role: role.toLowerCase(), // 转换为小写以保持一致性
          fullname: fullname
        })
        userStore.setToken(token)
        
        // 打印存储后的状态以验证
        console.log('存储的用户信息:', {
          token: userStore.token,
          userInfo: userStore.userInfo,
          userRole: userStore.userRole
        })
        
        ElMessage.success('登录成功')
        router.push('/home')
      } catch (error) {
        console.error('登录错误:', error)
        if (error.response?.status === 401) {
          ElMessage.error('用户名或密码错误')
        } else {
          ElMessage.error('登录失败，请稍后重试')
        }
      }
    }
  })
}

// 添加加载状态
const loading = ref(false)

// 注册处理
const handleRegister = async () => {
  if (!registerFormRef.value) return
  await registerFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true // 开始加载
      try {
        const res = await axios.post('http://localhost:8080/api/users/register', {
          username: registerForm.username,
          email: registerForm.email,
          password: registerForm.password,
          captcha: registerForm.captcha,
          captchaKey: captchaKey.value
        })

        // 注册成功
        ElMessage.success('注册成功')
        // 切换到登录模式
        switchMode(false)
        // 清空注册表单
        registerFormRef.value.resetFields()
        // 刷新验证码
        refreshCaptcha()

      } catch (error) {
        // 处理具体的错误情况
        if (error.response) {
          switch (error.response.status) {
            case 400:
              ElMessage.error(error.response.data.message || '请求参数错误')
              break
            case 409:
              ElMessage.error('用户名或邮箱已存在')
              break
            case 422:
              ElMessage.error('验证码错误')
              break
            default:
              ElMessage.error('注册失败，请稍后重试')
          }
        } else {
          ElMessage.error('网络错误，请检查网络连接')
        }
        console.error('注册错误:', error)
        refreshCaptcha()
      } finally {
        loading.value = false // 结束加载
      }
    }
  })
}

// 组件挂载时生成验证码
onMounted(() => {
  refreshCaptcha()
})

// 添加触摸滑动处理
const touchStartX = ref(0)
const touchEndX = ref(0)

const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].clientX
  const swipeDistance = touchEndX.value - touchStartX.value
  
  // 设置最小滑动距离为50px
  if (Math.abs(swipeDistance) > 50) {
    if (swipeDistance > 0 && isRegisterMode.value) {
      // 向右滑动，切换到登录
      switchMode(false)
    } else if (swipeDistance < 0 && !isRegisterMode.value) {
      // 向左滑动，切换到注册
      switchMode(true)
    }
  }
}
</script>
