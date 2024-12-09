<template>
  <el-container style="height: 100vh;">
    <el-main class="main-container">
      <div class="card-container" :class="{ flipped: isFlipped }">
        <el-card class="login-box">
          <h2 class="login-title">登录</h2>
          <el-form :model="loginForm">
            <el-form-item>
              <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
          </el-form>
          <div class="toggle-link" @click="toggleForm">没有账号？点击注册</div>
        </el-card>
        <el-card class="register-box">
          <h2 class="login-title">注册</h2>
          <el-form :model="registerForm">
            <el-form-item>
              <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="registerForm.password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="registerForm.confirmPassword" placeholder="确认密码" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleRegister">注册</el-button>
            </el-form-item>
          </el-form>
          <div class="toggle-link" @click="toggleForm">已有账号？点击登录</div>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isFlipped = ref(false);
const loginForm = ref({
  username: '',
  password: '',
});
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
});

const handleLogin = () => {
  console.log('登录', loginForm.value);
  router.push('/index');
};

const handleRegister = () => {
  console.log('注册', registerForm.value);
  // 在这里添加注册逻辑
};

const toggleForm = () => {
  isFlipped.value = !isFlipped.value;
};
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  perspective: 1000px;
  background-image: url('../static/bg.jpg');
}

.card-container {
  width: 90%;
  max-width: 350px;
  height: 100%;
  max-height: 450px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s;
}

.card-container.flipped {
  transform: rotateY(180deg);
}

.login-box,
.register-box {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  color: white;
  padding: 20px;
  box-sizing: border-box;
}

.login-box {
  background-color: #2c3e50;
}

.register-box {
  background-color: #34495e;
  transform: rotateY(180deg);
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  color: #3498db;
}

.el-input,
.el-button {
  width: 100%;
}

.toggle-link {
  text-align: center;
  margin-top: 10px;
  color: #3498db;
  cursor: pointer;
}

@media (min-width: 768px) {
  .card-container {
    width: 300px;
    height: 350px;
  }
}

@media (max-width: 767px) {
  .card-container {
    width: 100%;
    height: 100%;
    padding: 10px;
  }

  .login-box,
  .register-box {
    padding: 15px;
  }

  .login-title {
    font-size: 1.2em;
  }
}
</style>
