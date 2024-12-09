<template>
  <div class="profile-settings">
    <el-card class="profile-card">
      <template #header>
        <div class="card-header">
          <span>个人信息设置</span>
          <el-button type="primary" @click="handleSave" :loading="saving">
            保存修改
          </el-button>
        </div>
      </template>

      <el-form 
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="profile-form"
      >
        <el-row :gutter="20">
          <el-col :span="16">
            <!-- 基本信息 -->
            <div class="section-title">基本信息</div>
            <el-form-item label="头像" prop="avatar">
              <el-upload
                class="avatar-uploader"
                action="/api/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <el-avatar
                  v-if="form.avatar"
                  :size="100"
                  :src="form.avatar"
                />
                <el-icon v-else class="avatar-uploader-icon" :size="30">
                  <Plus />
                </el-icon>
              </el-upload>
            </el-form-item>

            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" />
            </el-form-item>

            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="form.nickname" />
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" />
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone" />
            </el-form-item>

            <!-- 个人简介 -->
            <div class="section-title">个人简介</div>
            <el-form-item label="职位">
              <el-input v-model="form.position" />
            </el-form-item>

            <el-form-item label="个人简介">
              <el-input
                v-model="form.bio"
                type="textarea"
                :rows="4"
                placeholder="请输入个人简介"
              />
            </el-form-item>

            <!-- 社交账号 -->
            <div class="section-title">社交账号</div>
            <el-form-item label="GitHub">
              <el-input v-model="form.github" placeholder="请输入 GitHub 主页地址">
                <template #prefix>
                  <el-icon><Position /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="网站">
              <el-input v-model="form.website" placeholder="请输入个人网站地址">
                <template #prefix>
                  <el-icon><Link /></el-icon>
                </template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-card class="tips-card" shadow="never">
              <template #header>
                <div class="tips-header">
                  <el-icon><InfoFilled /></el-icon>
                  <span>温馨提示</span>
                </div>
              </template>
              <div class="tips-content">
                <p>• 头像支持 jpg、png 格式，大小不超过 2MB</p>
                <p>• 邮箱和手机号用于登录和密码找回</p>
                <p>• 个人简介最多支持 200 字</p>
                <p>• 社交账号请填写完整的 URL 地址</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Position, Link, InfoFilled } from '@element-plus/icons-vue'

const formRef = ref(null)
const saving = ref(false)

const form = ref({
  avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
  username: 'admin',
  nickname: '管理员',
  email: 'admin@example.com',
  phone: '13800138000',
  position: '全栈开发工程师',
  bio: '热爱技术，热爱生活',
  github: 'https://github.com',
  website: 'https://example.com'
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ]
}

const handleAvatarSuccess = (res) => {
  form.value.avatar = res.url
  ElMessage.success('头像上传成功')
}

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('头像只能是 JPG 或 PNG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('头像大小不能超过 2MB!')
  }
  return isJPG && isLt2M
}

const handleSave = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    saving.value = true
    // 模拟API调用
    setTimeout(() => {
      ElMessage.success('保存成功')
      saving.value = false
    }, 1000)
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}
</script>

<style scoped>
.profile-settings {
  min-height: calc(100vh - 160px);
}

.profile-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin: 24px 0 16px;
  padding-left: 10px;
  border-left: 4px solid #409EFF;
}

.section-title:first-child {
  margin-top: 0;
}

.avatar-uploader {
  text-align: center;
}

.avatar-uploader :deep(.el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-uploader :deep(.el-upload:hover) {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  color: #8c939d;
}

.tips-card {
  background-color: #f8f9fa;
}

.tips-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #909399;
}

.tips-content {
  color: #606266;
  font-size: 14px;
  line-height: 1.8;
}

.tips-content p {
  margin: 8px 0;
}

:deep(.el-input-group__prepend) {
  padding: 0 12px;
}
</style>
