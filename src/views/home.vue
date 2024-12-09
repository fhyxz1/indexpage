<template>
  <div class="homepage-container">
    <!-- 顶部区域 -->
    <div class="top-section">
      <!-- 轮播图 -->
      <el-card class="main-carousel card-container">
        <el-carousel :interval="5000" arrow="always" height="300px" >
          <el-carousel-item v-for="item in carouselItems" :key="item.id" >
            <img :src="item.image" alt="Carousel Image" class="carousel-image" />
            <div class="carousel-caption">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-card>

      <!-- 热点模块 -->
      <el-card class="hotspot-section card-container">
        <h3 class="section-title">热点</h3>
        <div class="hotspot-items">
          <div class="hotspot-item" v-for="hot in hotspots" :key="hot.id">
            <img :src="hot.image" alt="占位" class="hotspot-image" />
            <p class="hotspot-title">{{ hot.title }}</p>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 资讯分区 -->
    <el-card class="info-section card-container">
      <h1 class="section-title">资讯</h1>
      <div class="articles-list">
        <div class="article" v-for="article in articles" :key="article.id">
          <img :src="article.image" alt="Article Image" class="article-image" />
          <div class="article-content">
            <h3>{{ article.title }}</h3>
            <p class="timestamp">{{ article.timestamp }}</p>
            <p>{{ article.description }}</p>
          </div>
          <div class="divider"></div>
        </div>
      </div>
    </el-card>

    <!-- 开发分区 -->
    <el-card class="dev-section card-container">
      <h2 class="section-title">开发专区</h2>
      <div class="articles-list">
        <div class="article" v-for="dev in devArticles" :key="dev.id">
          <img :src="dev.image" alt="Dev Article Image" class="article-image" />
          <div class="article-content">
            <h3>{{ dev.title }}</h3>
            <p class="timestamp">{{ dev.timestamp }}</p>
            <p>{{ dev.description }}</p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 数据模拟
const carouselItems = [
  { id: 1, image: 'path/to/image1.jpg', title: 'Flutter 路由探索', description: '静态路由与动态路由' },
  { id: 2, image: 'path/to/image2.jpg', title: 'Vue3 高级特性', description: '探索 Vue3 的高级功能' },
    { id: 3, image: 'path/to/image3.jpg', title: 'React 状态管理', description: '探索 React 的状态管理方案' },  
    { id: 4, image: 'path/to/image4.jpg', title: 'Node.js 实战', description: '从零开始搭建 Node.js 项目' },
    { id: 5, image: 'path/to/image5.jpg', title: 'Python 爬虫实战', description: '从零开始爬取数据' },
      { id: 6, image: 'path/to/image6.jpg', title: 'Go 语言实战', description: '从零开始构建 Web 服务' },
];

const hotspots = [
  { id: 1, image: 'path/to/hotspot1.jpg', title: '热点一' },
  { id: 2, image: 'path/to/hotspot2.jpg', title: '热点二' },
  { id: 3, image: 'path/to/hotspot3.jpg', title: '热点三' },
];

const articles = [
  { id: 1, image: 'path/to/article1.jpg', title: '如何安装 Redis？', timestamp: '2024-11-15', description: '快速搭建 Redis 环境' },
  { id: 2, image: 'path/to/article2.jpg', title: 'Tailwind CSS 优化指南', timestamp: '2024-11-14', description: '提高页面性能' },
];

const devArticles = [
  { id: 1, image: 'path/to/dev1.jpg', title: 'Docker 实战', timestamp: '2024-11-13', description: '搭建 Home Assistant' },
  { id: 2, image: 'path/to/dev2.jpg', title: 'Nuxt3 快速入门', timestamp: '2024-11-12', description: '轻松掌握 SSR 框架' },
];
</script>

<style scoped>
/* 通用样式 */
.homepage-container {
  padding: 20px;
  background-color: #f9f9f9;
}

.card-container {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
  margin-bottom: 40px;
}

/* 顶部区域样式 */
.top-section {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.main-carousel {
  width: 60%;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.carousel-caption {
  position: absolute;
  bottom: 10px;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  padding: 10px;
  border-radius: 5px;
}

.hotspot-section {
  width: 40%;
}

.hotspot-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  
}

.hotspot-item {
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 20px;
}

.hotspot-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
}

/* 内容块分割线 */

/* 资讯、开发分区 */
.articles-list {
  display: flex;
  flex-direction: column;
  gap: 20px;

}

.article {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 20px;
}

.article-image {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
}

.article-content {
  flex: 1;
}

.timestamp {
  font-size: 12px;
  color: gray;
  margin-bottom: 5px;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .top-section {
    flex-direction: column;
  }

  .main-carousel,
  .hotspot-section {
    flex: none;
    width: 100%;
  }
}
</style> 