<template>
  <div class="homepage-container">
    <div class="particle-background">
      <!-- 移除粒子相关代码 -->
    </div>
    
    <div class="content">
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

        <!-- 个人名片模块 -->
        <el-card class="profile-card card-container">
          <div class="profile-header">
            <img src="../static/avtar.jpg" alt="头像" class="profile-avatar" />
            <h2 class="profile-name">ylab</h2>
            <p class="profile-title">全不占开发工程师</p>
          </div>
          <div class="profile-info">
            <!-- <div class="info-item">
              <el-icon><Platform /></el-icon>
              <span>在不断学习中攀升</span>
            </div> -->
            <div class="info-item">
              <el-icon><Message /></el-icon>
              <span>followellrobbi@gmail.com</span>
            </div>
            <div class="info-item">
              <el-icon><Link /></el-icon>
              <span 
                class="social-link"
                @click="handleSocialClick('github')"
              >https://github.com/fhyxz1</span>
            </div>
          </div>
          <div class="social-links">
            <el-button 
              type="primary" 
              circle
              @click="handleSocialClick('github')"
            >
              <svg t="1711099331144" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4066" width="16" height="16">
                <path d="M512 42.666667A464.64 464.64 0 0 0 42.666667 502.186667 460.373333 460.373333 0 0 0 363.52 938.666667c23.466667 4.266667 32-9.813333 32-22.186667v-78.08c-130.56 27.733333-158.293333-61.44-158.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667" fill="#ffffff" p-id="4067"></path>
              </svg>
            </el-button>
            <el-button 
              type="success" 
              circle
              @click="handleSocialClick('gitee')"
            >
              <svg t="1711099361492" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5114" width="16" height="16">
                <path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#ffffff" p-id="5115"></path>
              </svg>
            </el-button>
          </div>
          <div class="profile-stats">
            <div class="stat-item">
              <h3>文章</h3>
              <span>没有</span>
            </div>
            <div class="stat-item">
              <h3>项目</h3>
              <span>没有</span>
            </div>
            <div class="stat-item">
              <h3>粉丝</h3>
              <span>没有</span>
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

      <!-- 留言板 -->
      <el-card class="message-board card-container">
        <h2 class="section-title">留言板</h2>
        <div class="danmaku-container" ref="danmakuContainer">
          <div 
            v-for="message in messages" 
            :key="message.id" 
            class="danmaku-item"
            :style="message.style"
          >
            {{ message.content }}
          </div>
        </div>
        <div class="message-input">
          <el-input
            v-model="newMessage"
            placeholder="说点什么吧..."
            @keyup.enter="sendMessage"
          >
            <template #append>
              <el-button type="primary" @click="sendMessage">发送</el-button>
            </template>
          </el-input>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Platform, Message, Location, Link } from '@element-plus/icons-vue'
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

const messages = ref([]);
const newMessage = ref('');
const danmakuContainer = ref(null);

const createDanmaku = (content) => {
  const id = Date.now();
  const top = Math.random() * 70; // 随机垂直位置
  const style = {
    top: `${top}%`,
    animationDuration: '10s',
    animationDelay: '0s'
  };
  
  return {
    id,
    content,
    style
  };
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  
  const danmaku = createDanmaku(newMessage.value);
  messages.value.push(danmaku);
  
  // 3秒后移除弹幕
  setTimeout(() => {
    const index = messages.value.findIndex(m => m.id === danmaku.id);
    if (index !== -1) {
      messages.value.splice(index, 1);
    }
  }, 10000);
  
  newMessage.value = '';
};

//仓库跳转
const handleSocialClick = (platform) => {
  const urls = {
    github: 'https://github.com/fhyxz1',
    gitee: 'https://gitee.com/fhyxz1lab'
  };
  window.open(urls[platform], '_blank');
};
</script>

<style scoped>
.homepage-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
}

.particle-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #a1c4fd 0%, #c2e9fb 100%);
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
}

/* 保持卡片容器的磨砂玻璃效果 */
.card-container {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(5px);
}

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
  margin-bottom: 20px;
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


.profile-card {
  width: 40%;
}
@media (max-width: 768px) {
  .top-section {
    flex-direction: column;
  }
  .profile-card {
    width: 100%;
  }
  .main-carousel,
  .hotspot-section {
    flex: none;
    width: 100%;
  }
}
.profile-header {
  text-align: center;
  margin-bottom: 15px;
}

.profile-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 8px;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-name {
  font-size: 1.3em;
  margin: 8px 0 3px;
  color: #333;
}

.profile-title {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 12px;
}

.profile-info {
  padding: 0 15px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  color: #666;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  border-top: 1px solid #ebeef5;
}

.stat-item {
  text-align: center;
}

.stat-item h3 {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 5px;
}

.stat-item span {
  font-size: 1.2em;
  font-weight: bold;
  color: #409EFF;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 15px 0;
  padding: 0 20px;
}

.social-links .el-button {
  width: 40px;
  height: 40px;
}

.social-link {
  color: #409EFF;  /* Element Plus 的主题蓝色 */
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-link:hover {
  color: #66b1ff;  /* 更浅的蓝色 */
  text-decoration: underline;
}

.message-board {
  position: relative;
  overflow: hidden;
  min-height: 300px;
}

.danmaku-container {
  position: relative;
  height: 250px;
  overflow: hidden;
  margin-bottom: 20px;
  background-color: #90f4ff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
}

.danmaku-item {
  position: absolute;
  white-space: nowrap;
  color: #333;
  font-size: 12px;
  animation: danmaku linear;
  transform: translateX(100vw);
  background-color: white;
  border-radius: 10px;
  padding: 8px;
  opacity: 0.6;
}

@keyframes danmaku {
  from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(-100%);
  }
}

.message-input {
  margin-top: 20px;
}
</style> 