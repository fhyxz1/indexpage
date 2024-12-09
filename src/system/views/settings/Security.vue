<template>
  <div class="security-settings">
    <el-card class="security-card">
      <template #header>
        <div class="card-header">
          <span>安全设置</span>
        </div>
      </template>

      <!-- 密码修改 -->
      <div class="section">
        <div class="section-header">
          <div class="section-title">
            <el-icon><Lock /></el-icon>
            <span>密码修改</span>
          </div>
          <el-button type="primary" @click="showPasswordDialog">
            修改密码
          </el-button>
        </div>
        <div class="section-content">
          <p class="description">定期修改密码可以提高账号安全性</p>
          <p class="last-modified">上次修改时间：2024-01-01</p>
        </div>
      </div>

      <!-- 登录验证 -->
      <div class="section">
        <div class="section-header">
          <div class="section-title">
            <el-icon><Message /></el-icon>
            <span>登录验证</span>
          </div>
          <el-switch
            v-model="settings.twoFactorAuth"
            @change="handleTwoFactorChange"
          />
        </div>
        <div class="section-content">
          <p class="description">开启后，登录时需要输入手机验证码</p>
          <p class="status">
            当前状态：
            <el-tag :type="settings.twoFactorAuth ? 'success' : 'info'" size="small">
              {{ settings.twoFactorAuth ? '已开启' : '未开启' }}
            </el-tag>
          </p>
        </div>
      </div>

      <!-- 登录设备 -->
      <div class="section">
        <div class="section-header">
          <div class="section-title">
            <el-icon><Monitor /></el-icon>
            <span>登录设备</span>
          </div>
          <el-button link type="primary" @click="handleRefreshDevices">
            刷新
          </el-button>
        </div>
        <div class="section-content">
          <el-table :data="loginDevices" style="width: 100%">
            <el-table-column prop="device" label="设备" />
            <el-table-column prop="location" label="登录地点" />
            <el-table-column prop="time" label="登录时间" />
            <el-table-column prop="status" label="状态">
              <template #default="{ row }">
                <el-tag :type="row.status === '当前设备' ? 'success' : 'info'" size="small">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template #default="{ row }">
                <el-button
                  v-if="row.status !== '当前设备'"
                  type="danger"
                  link
                  @click="handleRemoveDevice(row)"
                >
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>

    <!-- 修改密码对话框 -->
    <el-dialog
      v-model="passwordDialog.visible"
      title="修改密码"
      width="500px"
      @close="handleDialogClose"
    >
      <el-form
        ref="passwordFormRef"
        :model="passwordForm"
        :rules="passwordRules"
        label-width="100px"
      >
        <el-form-item label="当前密码" prop="currentPassword">
          <el-input
            v-model="passwordForm.currentPassword"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="passwordForm.newPassword"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input
            v-model="passwordForm.confirmPassword"
            type="password"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="passwordDialog.visible = false">取消</el-button>
          <el-button type="primary" @click="handleChangePassword" :loading="passwordDialog.loading">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Lock, Message, Monitor } from '@element-plus/icons-vue'

const settings = ref({
  twoFactorAuth: false
})

const loginDevices = ref([
  {
    device: 'Chrome / Windows 10',
    location: '广东省广州市',
    time: '2024-01-07 12:00:00',
    status: '当前设备'
  },
  {
    device: 'Safari / macOS',
    location: '北京市',
    time: '2024-01-06 18:30:00',
    status: '已登录'
  },
  {
    device: 'Firefox / Windows 11',
    location: '上海市',
    time: '2024-01-05 09:15:00',
    status: '已登录'
  }
])

const passwordDialog = ref({
  visible: false,
  loading: false
})

const passwordFormRef = ref(null)
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== passwordForm.value.newPassword) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const passwordRules = {
  currentPassword: [
    { required: true, message: '请输入当前密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}

const showPasswordDialog = () => {
  passwordDialog.value.visible = true
}

const handleDialogClose = () => {
  if (passwordFormRef.value) {
    passwordFormRef.value.resetFields()
  }
}

const handleChangePassword = async () => {
  if (!passwordFormRef.value) return

  try {
    await passwordFormRef.value.validate()
    passwordDialog.value.loading = true
    
    // 模拟API调用
    setTimeout(() => {
      ElMessage.success('密码修改成功')
      passwordDialog.value.loading = false
      passwordDialog.value.visible = false
    }, 1000)
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

const handleTwoFactorChange = (value) => {
  if (value) {
    ElMessage.success('已开启两步验证')
  } else {
    ElMessage.warning('已关闭两步验证')
  }
}

const handleRefreshDevices = () => {
  ElMessage.success('设备列表已更新')
}

const handleRemoveDevice = (device) => {
  ElMessageBox.confirm(
    '确定要移除该设备的登录状态吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    loginDevices.value = loginDevices.value.filter(d => d !== device)
    ElMessage.success('设备已移除')
  })
}
</script>

<style scoped>
.security-settings {
  min-height: calc(100vh - 160px);
}

.security-card {
  margin-bottom: 20px;
}

.section {
  padding: 24px 0;
  border-bottom: 1px solid #ebeef5;
}

.section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: bold;
}

.section-content {
  color: #606266;
}

.description {
  margin: 0;
  font-size: 14px;
  color: #909399;
}

.last-modified {
  margin: 8px 0 0;
  font-size: 12px;
  color: #909399;
}

.status {
  margin: 8px 0 0;
  font-size: 14px;
}

:deep(.el-table) {
  margin-top: 16px;
}

:deep(.el-dialog__body) {
  padding-top: 20px;
}
</style>
