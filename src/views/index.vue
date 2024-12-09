<template>

  <div class="navigation-container">
    <!-- 顶部导航栏（小屏幕设备显示） -->
    <div v-if="isMobile" class="top-navigation">
      <el-menu
        :default-active="selectedCategory"
        mode="horizontal"
        background-color="#1f2937"
        text-color="#ffffff"
        active-text-color="#facc15"
        :popper-offset="16"
        @select="handleMenuSelect"
      >
        <el-menu-item
          v-for="category in categories"
          :key="category.id"
          :index="category.id"
        >
          <el-icon :size="12">
            <component :is="category.icon" />
          </el-icon>
        </el-menu-item>
      </el-menu>
    </div>
 
    <!-- 左侧菜单栏（大屏幕设备显示） -->
    <el-menu
      v-else
      :default-active="selectedCategory"
      class="menu"
      @select="handleMenuSelect"
      background-color="#1f2937"
      text-color="#ffffff"
      active-text-color="#facc15"
    >
      <el-menu-item
        v-for="category in categories"
        :key="category.id"
        :index="category.id"
      >
        <el-icon :size="12">
          <component :is="category.icon" />
        </el-icon>
        <span class="menu-item-text">{{ category.name }}</span>
      </el-menu-item>
    </el-menu>

    <!-- 网格内容展示 -->
    <div class="grid-container">
      <el-row :gutter="20">
        <el-col
          v-for="link in filteredLinks"
          :key="link.url"
          :span="isMobile ? 24 : 6"
          class="grid-item"
        >
          <el-card shadow="hover" class="card">
            <template #header>
              <a :href="link.url" target="_blank" class="link-header">
                {{ link.name }}
              </a>
            </template>
            <div
              class="image-container"
              :style="{ backgroundImage: `url(${link.image})` }"
              @click="openLink(link.url)"
            ></div>
            <div class="card-description">{{ link.description }}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>



</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { ElIcon } from 'element-plus';
import { Document, ChatRound, Tools, User } from '@element-plus/icons-vue'; 

// 分类数据
const categories = [
  { id: '1', name: '常用开发文档', icon: Document },
  { id: '2', name: '博客/论坛网站', icon: ChatRound },
  { id: '3', name: '开发工具/ai', icon: Tools },
  { id: '4', name: '教程网站', icon: User },
];

const breadcrumbs = ref([
  { path: '/', label: 'ylab' },
  { path: '/q', label: '学习导航' },
]);


// 链接数据
const links = [
  // 常用开发文档
    { name: 'React', url: 'https://zh-hans.reactjs.org/', image: 'https://reactjs.org/logo-og.png', category: '1', description: '用于构建用户界面的 JavaScript 库' },
  { name: 'Vue.js', url: 'https://vuejs.org/', image: 'https://vuejs.org/images/logo.png', category: '1', description: '渐进式 JavaScript 框架' },
  {name:'sass中文网',url:'https://www.sass.hk/',image:'https://www.sass.hk/favicon.ico',category:'1',description:'主流css预处理语言'},
  {name:'echarts',url:'https://echarts.apache.org/en/index.html',image:'https://echarts.apache.org/en/images/logo.png?_v_=20240226',category:'1',description:'主流数据可视化大屏js库'},
  {name:'bootstrap中文网',url:'  https://v5.bootcss.com/',image:'https://v5.bootcss.com/favicon.ico',category:'1',description:'功能强大、功能丰富的前端工具库'},
  { name: 'Element Plus', url: 'https://element-plus.org/', image: 'https://element-plus.org/images/element-plus-logo.svg', category: '1', description: 'Vue 3 的组件库' },
  { name: 'MDN中文文档', url: 'https://developer.mozilla.org/zh-CN/docs/Web', image: 'https://developer.mozilla.org/favicon.ico', category: '1', description: 'Web 开发技术文档' },
  { name: 'springboot中文文档', url: ' https://springdoc.cn/spring-boot/', image: 'https://springdoc.cn/logo-512.webp', category: '1', description: 'java后端主流开发框架' },
  { name: 'mybaties中文文档', url: ' https://mybatis.net.cn/', image: 'https://mybatis.net.cn/Application/Home/View/Public/img/mybatis-logo.png', category: '1', description: 'java后端主流持久层框架' },
  {name:'redis中文文档',url:' https://www.redis.net.cn/',image:'https://www.redis.net.cn/Application/Home/View/Public/img/redis-white.png',category:'1',description:'主流非关系型数据库'},

  //开发工具
  { name: 'gitee', url: 'https://gitee.com/', image: "https://e-assets.gitee.com/gitee-community-web/_next/static/media/logo-white.a5b0e29c.svg", category: '3', description: '码云，github的国内平替' }, 
  { name: 'GitHub', url: 'https://github.com/', image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png', category: '3', description: '代码托管与协作平台' },
  {name:'bolt ai',url:'https://bolt.new/',image:'https://bolt.new//favicon.svg',category:'3',description:'全栈ai，需要github'},
  {name:'openui',url:'https://openui.fly.dev/ai/new',image:'https://raw.githubusercontent.com/wandb/openui/refs/heads/main/assets/openui.png',category:'3',description:'前端界面原型生成ai，需要github'},
  {name:'draw.io',url:'https://app.diagrams.net/',image:'https://avatars.githubusercontent.com/u/1769238?s=200&v=4',category:'3',description:'桌面端UML等图表绘制工具'},
  //博客网站
  { name: '博客园', url: 'https://www.cnblogs.com/', image: 'https://www.cnblogs.com/images/logo.svg?v=2SMrXdIvlZwVoB1akyXm38WIKuTHVqvGD0CweV-B6cY', category: '2', description: '中文博客社区' },
  { name: '思否', url: 'https://segmentfault.com/', image: 'https://static.segmentfault.com/main_site_next/a8de6007/_next/static/media/logo-b.1ef53c6e.svg', category: '2', description: '中文博客交流社区' },
  { name: '掘金', url: 'https://juejin.cn/', image: '//lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg', category: '2', description: '中文技术社区' },
  { name: 'stackoverfolw', url: 'https://stackoverflow.com/', image: ' https://cdn.sstatic.net/Sites/stackoverflow/img/apple-touch-icon.png?v=73d79a89bded', category: '2', description: '面向全球开发者的技术社区' },

  //入门教程网站
  {name:'极客教程',url:'https://geek-docs.com/',image:'https://th.bing.com/th?id=ODLS.a8121ecd-4679-43d0-98f4-ee6d62a88412&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2',category:'4',description:'通俗易懂的编程各领域教程集'},
  {name:'w3cschool',url:'https://www.w3school.com.cn/',image:'https://th.bing.com/th?id=ODLS.02efee8f-741d-46ed-ad96-4d4439fd77db&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2',category:'4',description:'web开发教程网站'},
  {name:'菜鸟教程',url:'',image:'https://th.bing.com/th?id=ODLS.cc1244f4-c576-40dc-8423-06895c0f5444&w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2',category:'4',description:'初学者必备的教程网站'},
  {name:'菜鸟鸭',url:'  https://cainiaoya.com/',image:'https://cdn.cainiaoya.com/wp-content/themes/wiki/images/logo.png',category:'4',description:'收录各类优质编程教程的网站'},

  //模版
{name:'',url:'',image:'',category:'',description:''}
];

// 状态变量
const selectedCategory = ref('1');
const isMobile = ref(window.innerWidth <= 768);

// 计算过滤后的链接
const filteredLinks = computed(() =>
  links.filter(link => link.category === selectedCategory.value)
);

// 方法：处理菜单选择
const handleMenuSelect = (key) => {
  selectedCategory.value = key;
};

// 方法：打开链接
const openLink = (url) => {
  window.open(url, '_blank');
};

// 监听窗口尺寸变化
const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});
</script>

<style scoped>
.navigation-container {
  display: flex;
  height: 100vh;
  background-color: #f3f4f6;
  padding: 20px;
  overflow: hidden;
}



.top-navigation {
  width: 100%;
  background-color: #1f2937;
  padding: 10px 0;
}


.menu {
  width: 220px;
  border-right: 1px solid #d3dce6;
  padding-top: 10px;
}

.menu-icon {
  margin-right: 8px;
}

.menu-item-text {
  font-size: 16px;
  font-weight: 500;
}

.grid-container {
  flex: 1;
  padding-left: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.grid-item {
  margin-bottom: 20px;
}

.card {
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

.image-container {
  width: 100%;
  height: 160px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.image-container:hover {
  transform: scale(1.05);
}

.card-description {
  margin-top: 10px;
  font-size: 14px;
  color: #606266;
}

.link-header {
  font-size: 18px;
  font-weight: bold;
  color: #409eff;
  text-decoration: none;
}

.link-header:hover {
  color: #66b1ff;
}

@media (max-width: 768px) {
  .navigation-container {
    flex-direction: column;
    padding: 10px;
  }

  .menu {
    display: none;
  }

  .grid-container {
    padding-left: 0;
    margin-top: 10px;
  }

  .grid-item {
    margin-bottom: 10px;
  }
}
@media (max-width: 400px) {
  .navigation-container {
    padding: 5px;
  }

  .link-header {
    font-size: 16px; /* Smaller font size for links */
  }

  .card-description {
    font-size: 12px; /* Smaller font size for descriptions */
  }

  .grid-item {
    margin-bottom: 5px; /* Reduce margin for grid items */
  }

  .image-container {
    height: 120px; /* Adjust height for smaller screens */
  }
}
@media (max-width: 300px) {
  .navigation-container {
    padding: 2px; /* Even smaller padding */
  }

  .link-header {
    font-size: 14px; /* Further reduced font size for links */
  }

  .card-description {
    font-size: 10px; /* Further reduced font size for descriptions */
  }

  .grid-item {
    margin-bottom: 2px; /* Minimized margin for grid items */
  }

  .image-container {
    height: 100px; /* Further reduced height for images */
  }
}
body {
  overflow: hidden;
}
.footer {
  background-color: #f9f9f9;
  padding: 10px;
  text-align: center;
  border-top: 1px solid #eaeaea;
}
.footer-content p {
  margin: 5px 0;
  color: #666;
}
</style>
