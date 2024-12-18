<template>
    <div class="parent-container">
      <BlogContainer 
        :categories="categories"
        :articles="blogArticles"
        :isLoading="isLoading"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import BlogContainer from '../components/test/list.vue';
  
  // 定义类型
  interface Category {
    name: string;
    subCategories: string[];
  }
  
  interface Article {
    id: number;
    image: string;
    title: string;
    summary: string;
    author: string;
    category: string;
    subCategory: string;
  }
  
  // categories 类型为 Category[]
  const categories = ref<Category[]>([
    { name: '全部文章', subCategories: [] },
    { name: 'Web开发', subCategories: ['Vue.js', 'React', 'Node.js'] },
    { name: '移动端开发', subCategories: ['Flutter', 'React Native', 'Swift'] },
    { name: 'Progressive Web Apps', subCategories: ['Service Workers', 'Web App Manifest', 'Caching Strategies'] },
    { name: '机器学习', subCategories: ['TensorFlow', 'PyTorch', 'Scikit-Learn'] },
    { name: 'Cloud Computing', subCategories: ['AWS', 'Azure', 'Google Cloud'] },
    { name: 'Blockchain', subCategories: ['Ethereum', 'Solana', 'Bitcoin'] },
    { name: '数据结构与算法', subCategories: ['Sorting', 'Graph Theory', 'Dynamic Programming'] },
    { name: '数据分析', subCategories: ['SQL', 'Python', 'R'] },
  ]);
  
  // blogArticles 类型为 Article[]
  const blogArticles = ref<Article[]>([]);
  const isLoading = ref<boolean>(true);
  
  onMounted(() => {
    // 模拟 API 请求
    setTimeout(() => {
      blogArticles.value = [
        {
          id: 1,
          image: 'https://via.placeholder.com/300x200',
          title: 'Exploring Vue 3',
          summary: 'Learn the basics of Vue 3 and its powerful composition API.',
          author: 'John Doe',
          category: 'Web开发',
          subCategory: 'Vue.js',
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/300x200',
          title: 'Mastering Vant UI',
          summary: 'Create stunning mobile interfaces with Vant UI components.',
          author: 'Jane Smith',
          category: '移动端开发',
          subCategory: 'Flutter',
        },
        {
          id: 3,
          image: 'https://via.placeholder.com/300x200',
          title: 'Building Progressive Web Apps',
          summary: 'Dive into the world of PWAs and enhance user experiences.',
          author: 'Alice Johnson',
          category: 'Progressive Web Apps',
          subCategory: 'Service Workers',
        },
      ];
      isLoading.value = false;
    }, 2000);
  });
  </script>
  
  <style scoped>
  /* 父组件样式 */
  .parent-container {
    padding: 16px;
  }
  </style>
  