<template>
  <div class="search-page">
    <!-- 页面标题 -->
    <header class="page-header">
      <h2 class="title animated-title">搜索结果</h2>
    </header>

    <!-- 搜索结果统计 -->
    <div class="search-stats">
      找到 {{ mockResults.length }} 条相关结果
    </div>

    <!-- 搜索结果列表 -->
    <div class="search-content">
      <div v-for="item in mockResults" :key="item.id" class="result-item">
        <div class="result-header">
          <h3 class="item-title">{{ item.title }}</h3>
          <span class="date">{{ item.date }}</span>
        </div>
        
        <div class="result-preview">
          <img v-if="item.thumbnail" :src="item.thumbnail" :alt="item.title" class="thumbnail">
          <p class="description">{{ item.description }}</p>
        </div>
        
        <div class="result-meta">
          <span class="category">{{ item.category }}</span>
          <span class="views">浏览量: {{ item.views }}</span>
          <div class="tags">
            <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <button class="page-btn" :disabled="currentPage === 1">上一页</button>
      <span class="page-info">第 {{ currentPage }} 页</span>
      <button class="page-btn">下一页</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  data() {
    return {
      currentPage: 1,
      mockResults: [
        {
          id: 1,
          title: "Vue.js 3.0 新特性详解",
          date: "2024-03-15",
          thumbnail: "https://picsum.photos/200/300",
          description: "Vue.js 3.0 带来了许多激动人心的新特性，包括 Composition API、更好的 TypeScript 支持、更小的包体积等。本文将详细介绍这些新特性的使用方法和最佳实践。",
          category: "前端开发",
          views: 1234,
          tags: ["Vue", "JavaScript", "前端框架"]
        },
        {
          id: 2,
          title: "React Hooks 实战指南",
          date: "2024-03-14",
          thumbnail: "https://picsum.photos/200/301",
          description: "深入探讨 React Hooks 的使用技巧，包括 useState、useEffect、useContext 等常用 Hooks 的实际应用场景和注意事项。",
          category: "技术教程",
          views: 856,
          tags: ["React", "Hooks", "前端"]
        },
        {
          id: 3,
          title: "微服务架构设计实践",
          date: "2024-03-13",
          thumbnail: "https://picsum.photos/200/302",
          description: "分享一个真实的微服务架构设计案例，包括服务拆分、通信方式、数据一致性等关键问题的解决方案。",
          category: "架构设计",
          views: 2341,
          tags: ["微服务", "架构", "后端"]
        },
        {
          id: 4,
          title: "Flutter 跨平台开发入门",
          date: "2024-03-12",
          thumbnail: "https://picsum.photos/200/303",
          description: "Flutter 作为一个跨平台开发框架，如何快速上手？本文将介绍 Flutter 的基础概念、开发环境搭建和简单应用开发。",
          category: "移动开发",
          views: 567,
          tags: ["Flutter", "移动开发", "跨平台"]
        }
      ]
    }
  }
}
</script>

<style scoped>
.search-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  margin-bottom: 24px;
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--el-text-color-primary);
  display: inline-block;
}

.animated-title {
  position: relative;
}

.animated-title::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--el-color-primary);
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease-out;
}

.animated-title:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.search-stats {
  margin-bottom: 20px;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  text-align: center;
}

.result-item {
  padding: 20px;
  border-radius: 8px;
  background-color: var(--el-fill-color-light);
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.result-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.item-title {
  font-size: 18px;
  color: var(--el-text-color-primary);
  margin: 0;
  font-weight: 500;
}

.date {
  color: var(--el-text-color-secondary);
  font-size: 14px;
}

.result-preview {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.thumbnail {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.description {
  margin: 0;
  color: var(--el-text-color-regular);
  font-size: 14px;
  line-height: 1.6;
}

.result-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13px;
}

.category {
  color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
  padding: 2px 8px;
  border-radius: 12px;
}

.views {
  color: var(--el-text-color-secondary);
}

.tags {
  display: flex;
  gap: 8px;
}

.tag {
  background-color: var(--el-fill-color);
  padding: 2px 8px;
  border-radius: 12px;
  color: var(--el-text-color-regular);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
}

.page-btn {
  padding: 8px 16px;
  border: 1px solid var(--el-border-color);
  background-color: var(--el-fill-color-blank);
  border-radius: 20px;
  color: var(--el-text-color-regular);
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  border-color: var(--el-color-primary-light-7);
}

.page-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.page-info {
  color: var(--el-text-color-secondary);
}
</style>
