<template>
  <div class="blog-container">
    <CategorySelector
      v-model:selectedCategory="selectedCategory"
      :categories="categories"
      :isMobile="true"
    />

    <!-- 骨架屏显示 -->
    <div v-if="isLoading">
      <van-skeleton v-for="n in 5" :key="n" class="blog-card">
        <template #template>
          <div class="skeleton-content">
            <van-skeleton-image />
            <div class="skeleton-text">
              <van-skeleton-paragraph row-width="60%" />
              <van-skeleton-paragraph />
              <van-skeleton-paragraph />
              <van-skeleton-paragraph />
            </div>
          </div>
        </template>
      </van-skeleton>
    </div>

    <!-- 博客文章数据展示 -->
    <div v-else>
      <div v-for="article in blogArticles" :key="article.id" class="blog-card">
        <img :src="article.image" alt="Article Image" class="blog-image" />
        <div class="blog-text">
          <h3 class="blog-title">{{ article.title }}</h3>
          <p class="blog-summary">{{ article.summary }}</p>
          <p class="blog-author">By {{ article.author }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import CategorySelector from '../common/CategorySelector.vue';

// 分类数据
const selectedCategory = ref({name: '全部文章', subCategories: []});
const categories = ref([
  { name: '全部文章', subCategories: [] },
  { name: 'Web开发', subCategories: ['Vue.js', 'React', 'Node.js'] },
  { name: '移动端开发', subCategories: ['Flutter', 'React Native', 'Swift'] },
  { name: '数据分析', subCategories: ['Service Workers', 'Web App Manifest', 'Caching Strategies'] },
  { name: '机器学习', subCategories: ['TensorFlow', 'PyTorch', 'Scikit-Learn'] },
  { name: '数据结构与算法', subCategories: ['AWS', 'Azure', 'Google Cloud'] },
]);

// 模拟博客文章数据
const allBlogArticles = ref([
  {
    id: 1,
    image: "https://via.placeholder.com/150",
    title: "Exploring Vue 3",
    summary: "Learn the basics of Vue 3 and its powerful composition API.",
    author: "John Doe",
    category: 'Web开发'
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150",
    title: "Mastering Vant UI",
    summary: "Create stunning mobile interfaces with Vant UI components.",
    author: "Jane Smith",
    category: '移动端开发'
  },
  {
    id: 3,
    image: "https://via.placeholder.com/150",
    title: "Building Progressive Web Apps",
    summary: "Dive into the world of PWAs and enhance user experiences.",
    author: "Alice Johnson",
    category: 'Progressive Web Apps'
  },
]);

const isLoading = ref(true);

// 根据选择的分类过滤文章
const blogArticles = computed(() => {
  if (selectedCategory.value.name === '全部文章') {
    return allBlogArticles.value;
  }
  return allBlogArticles.value.filter(article => 
    article.category === selectedCategory.value.name
  );
});

onMounted(() => {
  // 模拟数据请求延迟
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>

<style scoped>
.blog-container {
  padding: 8px;
  background-color: #f8f8f8;
}

.blog-card {
  display: flex;
  align-items: flex-start;
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.skeleton-content {
  display: flex;
  width: 100%;
}

.skeleton-text {
  flex: 1;
  margin-left: 16px;
}

.blog-image {
  width: 120px; /* 调整图片宽度 */
  height: 80px; /* 调整图片高度 */
  border-radius: 8px;
  object-fit: cover;
}

.blog-text {
  margin-left: 16px;
  flex: 1;
}

.blog-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 8px;
}

.blog-summary {
  font-size: 14px;
  color: #666;
  margin: 0 0 8px;
}

.blog-author {
  font-size: 12px;
  color: #999;
  margin: 0;
}
</style>
