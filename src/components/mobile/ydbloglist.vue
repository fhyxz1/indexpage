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
      <div v-for="article in articles" :key="article.id" class="blog-card">
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

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
import CategorySelector from '../common/CategorySelector.vue';

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
  
  // 接收父组件传递的数据
  const props = defineProps({
    categories: {
      type: Array as () => Category[],
      required: true,
    },
    articles: {
      type: Array as () => Article[],
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  });
  
  const selectedCategory = ref<Category>({ name: '全部文章', subCategories: [] });
  const filteredArticles = ref<Article[]>(props.articles);
  
  watch(() => props.articles, (newArticles) => {
    filteredArticles.value = newArticles;
  });
  
  onMounted(() => {
    filteredArticles.value = props.articles;
  });
  
  const filterArticles = () => {
    filteredArticles.value = props.articles.filter((article) => {
      return !selectedCategory.value.name || 
             selectedCategory.value.name === '全部文章' || 
             article.category === selectedCategory.value.name;
    });
  };
  
  const selectCategory = (category: Category) => {
    selectedCategory.value = category;
    filterArticles();
  };
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
