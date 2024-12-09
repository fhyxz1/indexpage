<template>
  <div class="blog-detail">
    <div class="header">
      <h2>博客详情</h2>
      <el-button @click="handleBack">返回</el-button>
    </div>
    
    <div class="content">
      <h1 class="title">{{ blog.title }}</h1>
      <div class="meta">
        <span>作者：{{ blog.author }}</span>
        <span>创建时间：{{ blog.createTime }}</span>
      </div>
      <div class="blog-content" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const blog = ref({
  title: '',
  author: '',
  createTime: '',
  content: ''
})

onMounted(() => {
  // 实际项目中这里应该调用API获取博客详情
  blog.value = {
    title: '示例博客标题',
    author: '作者',
    createTime: '2024-12-07 12:00:00',
    content: '<p>这是博客的详细内容...</p><p>支持<strong>富文本</strong>格式</p>'
  }
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
