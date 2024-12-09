<template>
  <div class="blog-container">
    <CategorySelector
      v-model:selectedCategory="selectedCategory"
      :categories="categories"
      :isMobile="false"
    />

    <!-- 骨架屏显示 -->
    <el-row v-if="isLoading" class="blog-row">
      <el-col :span="20" v-for="n in 5" :key="n">
        <el-card class="blog-card skeleton-card">
          <template #header>
            <el-skeleton :loading="true" :rows="1" style="height: 200px;" />
          </template>
          <el-skeleton :loading="true" :rows="4" />
        </el-card>
      </el-col>
    </el-row>

    <!-- 博客文章数据展示 -->
    <el-row v-else class="blog-row">
      <el-col :span="20" v-for="article in filteredArticles" :key="article.id">
        <el-card class="blog-card">
          <img :src="article.image" alt="Article Image" class="blog-image" />
          <div class="blog-text">
            <h3 class="blog-title">{{ article.title }}</h3>
            <p class="blog-summary">{{ article.summary }}</p>
            <p class="blog-author">By {{ article.author }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElCard, ElRow, ElCol, ElSkeleton } from 'element-plus';
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

const blogArticles = ref<Article[]>([]);
const isLoading = ref(true);
const selectedCategory = ref<Category>({name: '全部文章', subCategories: []});
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

const filteredArticles = ref<Article[]>([]);

onMounted(() => {
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
    filteredArticles.value = blogArticles.value;
  }, 2000);
});

const filterArticles = () => {
  filteredArticles.value = blogArticles.value.filter((article) => {
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
  padding: 16px;
  background-color: #f8f8f8;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
  animation: titleAnimation 2s ease-in-out infinite;
}

@keyframes titleAnimation {
  0% { transform: scale(1); color: #409eff; }
  50% { transform: scale(1.1); color: #f56c6c; }
  100% { transform: scale(1); color: #409eff; }
}

.category-selector {
  background-color: #ffffff;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.category-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.category-item {
  padding: 10px 20px;
  background-color: #f1f1f1;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;
}

.category-item:hover {
  background-color: #e0e0e0;
  transform: scale(1.05);
}

.category-item.active {
  background-color: #409eff;
  color: white;
}

.blog-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.blog-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.skeleton-card {
  height: 100%;
}

.blog-image {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
}

.blog-text {
  margin-top: 16px;
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

.el-row + .el-row {
  margin-top: 16px;
}

.el-col {
  margin-bottom: 16px;
}
</style>