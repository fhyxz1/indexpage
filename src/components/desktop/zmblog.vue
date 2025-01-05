<template>
  <div class="blog-container">
    <!-- 后续施工TODO -->
    <!-- 左侧栏 -->
    <!-- <div class="sidebar-left">
      <el-card class="author-card" shadow="hover">
        <template #header>作者介绍</template>
        <div>作者介绍内容</div>
      </el-card>

      <el-card class="comments-list" shadow="hover">
        <template #header>评论列表</template>
        <div>评论列表内容</div>
      </el-card>

      <el-card class="tags" shadow="hover">
        <template #header>文章标签</template>
        <div>标签内容</div>
      </el-card>
    </div> -->

    <!-- 主内容区 -->
    <el-card class="main-content" shadow="hover">
      <template #header> <h2 style="text-align: center;">{{posttitle}}</h2></template>
      <div class="markdown-body" v-html="articleHtml"></div>
    </el-card>

    <!-- 悬浮按钮 -->
    <div class="floating-buttons">
      <FloatingButton @click="handleLike">
        <el-icon><Star /></el-icon>
      </FloatingButton>
      <FloatingButton @click="handleComment">
        <el-icon><Comment /></el-icon>
      </FloatingButton>
      <FloatingButton @click="handleBackToTop">
        <el-icon><Top /></el-icon>
      </FloatingButton>
    </div>
  </div>
</template>

<script setup>
import FloatingButton from '../module/button.vue'
import axios from 'axios'
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue'
 import { useRoute } from 'vue-router';
 const router = useRoute();
 const articleId = router.params.id // 文章 ID
const articleHtml = ref('') // 用于存储文章 HTML 内容
const posttitle = ref('') // 文章标题
// 从后端获取文章 HTML
const fetchArticle = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/articles/${id}`) // 请求文章数据
    articleHtml.value = response.data.content // 设置文章 HTML 内容
    posttitle.value = response.data.title // 设置文章标题
  } catch (error) {
    console.error('获取文章失败:', error)
  }
}

// 页面加载时获取文章
onMounted(() => {
  fetchArticle(articleId) // 示例文章 ID 为 1
})

// 悬浮按钮点击事件
function handleLike() {
  ElMessage.success('点赞成功,但是功能没做')
}

function handleComment() {
  ElMessage.success('点击评论成功,但是功能没做')
}

function handleBackToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
/* 引入 GitHub Markdown 样式 */
@import 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.min.css';


.blog-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  position: relative;
}

/* 左侧栏样式 */
.sidebar-left {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
}

.author-card,
.comments-list,
.tags {
  padding: 15px;
}

/* 主内容区样式 */
.main-content {
  flex: 3;
  padding: 20px;
}

.markdown-body {
  font-size: 14px;
  line-height: 1.6;
  padding: 20px;
}

/* 悬浮按钮样式 */
.floating-buttons {
  position: fixed;
  top: 40%;
  right: 30px;
  display: flex;
  gap: 20px;
  flex-direction: column;
}

.el-button {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
