<template>
  <div class="blog-container">
    <CategorySelector
      v-model:selectedCategory="selectedCategory"
      :categories="allCategories"
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
          <img :src="server+article.imgUrl" alt="Article Image" class="blog-image" />
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
import { ElCard, ElRow, ElCol, ElSkeleton } from 'element-plus';
import { ref, onMounted, watch, computed } from 'vue';
import CategorySelector from '../common/CategorySelector.vue';
const server = ref('http://localhost:8080')
interface Category {
  category_name: string;
    tags: string[];
  }
  
  interface Article {
    id: number;
    imgUrl: string;
    title: string;
    summary: string;
    author: string;
    category: string;
    tags: string;
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
  
  const selectedCategory = ref<Category>({ category_name: '全部文章', tags: [] });
  const filteredArticles = ref<Article[]>(props.articles);
  // 添加计算属性来合并全部文章选项和后端分类
  const allCategories = computed(() => {
    const allArticlesCategory: Category = { category_name: '全部文章', tags: [] };
    return [allArticlesCategory, ...props.categories];
  });
  
  watch(
    [() => selectedCategory.value, () => props.articles],
    () => {
      filterArticles();
    }
  );
  
  onMounted(() => {
    filteredArticles.value = props.articles;
  });
  
  const filterArticles = () => {
    if (!selectedCategory.value || selectedCategory.value.category_name === '全部文章') {
      filteredArticles.value = props.articles;
    } else {
      filteredArticles.value = props.articles.filter((article) => {
        return article.category === selectedCategory.value.category_name;
      });
    }
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