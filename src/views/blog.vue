<template>
  <div>
    <!-- 根据设备类型展示不同的页面组件 -->
    <MobilePage 
      :categories="categories"
      :articles="blogArticles"
      :isLoading="isLoading"
      v-if="deviceType === 'mobile'" 
    />
    <DesktopPage 
      :categories="categories"
      :articles="blogArticles"
      :isLoading="isLoading"
      v-else 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import MobilePage from '../components/mobile/ydbloglist.vue';
import DesktopPage from '../components/desktop/zmbloglist.vue';
import axios from 'axios';
// 声明一个响应式变量来存储设备类型
const deviceType = ref('desktop');

interface Category {
  category_name: string;
  tags: string[];
}

interface Article {
  id: number;
  image: string;
  title: string;
  summary: string; 
  author: string;
  category: string;
  tags: string;
}

// categories 类型为 Category[]
const categories = ref<Category[]>([]);

// blogArticles 类型为 Article[]
const blogArticles = ref<Article[]>([]);
const isLoading = ref<boolean>(true);


// 获取分类数据
const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/categories');
    console.log(response.data)
    categories.value = response.data;
  } catch (error) {
    console.error('获取分类失败:', error);
    // 可以添加错误处理逻辑
  }
};

// 获取文章列表数据
const fetchArticles = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get('http://localhost:8080/api/articles');
    blogArticles.value = response.data;
  } catch (error) {
    console.error('获取文章列表失败:', error);
    // 可以添加错误处理逻辑
  } finally {
    isLoading.value = false;
  }
};


// 判断设备类型的函数
const checkDeviceType = () => {
  deviceType.value = window.innerWidth <= 900 ? 'mobile' : 'desktop';
};

// 在组件挂载时初始化设备类型，并监听窗口大小变化
onMounted(() => {
  checkDeviceType();
  fetchCategories(); // 获取分类数据
  fetchArticles();   // 获取文章列表
  window.addEventListener('resize', checkDeviceType);
});

// 在组件销毁前移除监听器
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkDeviceType);
});
</script>
