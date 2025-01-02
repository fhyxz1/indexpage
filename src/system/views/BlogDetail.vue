<template>
  <div class="blog-detail">
    <div class="header">
      <h2>博客详情</h2>
      <el-button @click="handleBack">返回</el-button>
    </div>
    
    <div class="content" v-loading="loading">
      <template v-if="blog.title">
        <h1 class="title">{{ blog.title }}</h1>
        <div class="meta">
          <span>作者：{{ blog.author }}</span>
          <span>创建时间：{{ blog.createTime }}</span>
        </div>
        <div class="blog-content" v-html="blog.content"></div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()

const blog = ref({
  title: '',
  author: '',
  createTime: '',
  content: ''
})

const loading = ref(false)

const loadBlogDetail = async () => {
  loading.value = true
  try {
    const blogId = route.params.id
    console.log('当前文章ID:', blogId)
    
    const response = await axios.get(`http://localhost:8080/api/articles/${blogId}`)
    console.log('API返回数据:', response.data)
    
    const data = response.data
    blog.value = {
      title: data.title,
      author: data.author,
      createTime: data.fbDate,
      content: data.content
    }
  } catch (error) {
    console.error('获取博客详情失败:', error)
    ElMessage.error('获取博客详情失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadBlogDetail()
})

const handleBack = () => {
  router.back()
}
</script>

<style scoped>
.blog-detail {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.content {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-size: 24px;
  margin-bottom: 16px;
}

.meta {
  color: #666;
  margin-bottom: 24px;
}

.meta span {
  margin-right: 20px;
}

.blog-content {
  line-height: 1.8;
}

:deep(.blog-content img) {
  max-width: 100%;
  height: auto;
}
</style>
