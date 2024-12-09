<template>
  <div class="image-test-container">
    <!-- 操作区域 -->
    <div class="control-panel">
      <h2 class="title">图片测试工具</h2>
      <div class="button-group">
        <el-button type="primary" @click="testImg(1)" :loading="loading">
          测试图片 1
        </el-button>
        <el-button type="success" @click="testImg(2)" :loading="loading">
          测试图片 2
        </el-button>
        <el-button type="warning" @click="testImg(3)" :loading="loading">
          测试图片 3
        </el-button>
      </div>
      <el-input
        v-model="customId"
        placeholder="输入自定义ID"
        class="custom-input"
      >
        <template #append>
          <el-button @click="testImg(customId)" :loading="loading">
            测试
          </el-button>
        </template>
      </el-input>
    </div>

    <!-- 图片显示区域 -->
    <div class="image-display" v-if="url">
      <div class="image-card">
        <div class="image-wrapper">
          <el-image
            :src="server + url"
            :preview-src-list="[server + url]"
            fit="cover"
            :loading="loading"
          >
            <template #placeholder>
              <div class="image-placeholder">
                <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zM338 304c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64z m513.9 437.1H172.1c-1.8 0-3.3-1.5-3.3-3.3V379.7c0-1.8 1.5-3.3 3.3-3.3h185.7l119.8 121.7 139.3-162.2 233.2 271.9c1.3 1.5 2 3.4 2 5.4 0 4.4-3.6 8-8 8z" fill="currentColor"/>
                </svg>
                <span>加载中...</span>
              </div>
            </template>
            <template #error>
              <div class="image-error">
                <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zM338 304c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64z m513.9 437.1H172.1c-1.8 0-3.3-1.5-3.3-3.3V379.7c0-1.8 1.5-3.3 3.3-3.3h185.7l119.8 121.7 139.3-162.2 233.2 271.9c1.3 1.5 2 3.4 2 5.4 0 4.4-3.6 8-8 8z" fill="currentColor"/>
                </svg>
                <span>加载失败</span>
              </div>
            </template>
          </el-image>
        </div>
        <div class="image-info">
          <p class="url-text">图片地址：{{ url }}</p>
          <el-button type="info" size="small" @click="copyUrl">
            复制地址
          </el-button>
        </div>
      </div>
    </div>

    <!-- 空状态显示 -->
    <div v-else class="empty-state">
      <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zM338 304c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64z m513.9 437.1H172.1c-1.8 0-3.3-1.5-3.3-3.3V379.7c0-1.8 1.5-3.3 3.3-3.3h185.7l119.8 121.7 139.3-162.2 233.2 271.9c1.3 1.5 2 3.4 2 5.4 0 4.4-3.6 8-8 8z" fill="currentColor"/>
      </svg>
      <p>请点击按钮测试图片</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const url = ref('') // 图片地址
const server = ref('http://localhost:8080')
const loading = ref(false)
const customId = ref('')

// 测试图片
const testImg = async (id) => {
  if (!id) {
    ElMessage.warning('请输入有效的ID')
    return
  }

  loading.value = true
  try {
    const response = await axios.get(`${server.value}/api/articles/${id}`)
    url.value = response.data.url
    ElMessage.success('获取图片成功')
    console.log('文章数据:', response.data.url)
  } catch (error) {
    console.error('获取文章失败:', error)
    ElMessage.error('获取图片失败')
  } finally {
    loading.value = false
  }
}

// 复制图片地址
const copyUrl = async () => {
  try {
    await navigator.clipboard.writeText(server.value + url.value)
    ElMessage.success('地址已复制到剪贴板')
  } catch (err) {
    console.error('复制失败:', err)
    ElMessage.error('复制失败')
  }
}
</script>

<style scoped>
.image-test-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.control-panel {
  margin-bottom: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0 0 20px;
  color: #333;
  font-size: 24px;
  text-align: center;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.custom-input {
  margin-top: 15px;
}

.image-display {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.image-card {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.image-wrapper {
  width: 100%;
  height: 400px;
  border-radius: 4px;
  overflow: hidden;
}

.image-wrapper :deep(.el-image) {
  width: 100%;
  height: 100%;
}

.image-placeholder,
.image-error {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #909399;
  background: #f5f7fa;
}

.icon {
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
}

.image-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;
}

.url-text {
  margin: 0;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}

.empty-state {
  text-align: center;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  color: #909399;
}

.empty-state .icon {
  margin-bottom: 16px;
}

.empty-state p {
  margin: 0;
  font-size: 16px;
}
</style>