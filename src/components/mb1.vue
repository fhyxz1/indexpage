<template>
    <div class="blog-container"
      <!-- 分类选择区域 -->
      <div class="category-selector">
        <h1 class="blog-title animated-title">博客分类</h1>
        <div class="category-group">
          <!-- 遍历所有分类 -->
          <div
            v-for="(category, index) in categories"
            :key="category.name"
            class="category-item"
            :class="{ active: selectedCategory.name === category.name }"
            @click="$emit('category-selected', category)"
          >
            {{ category.name }}
          </div>
        </div>
      </div>

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
        <el-col :span="20" v-for="article in articles" :key="article.id">
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
import { ElCard, ElRow, ElCol, ElSkeleton } from 'element-plus';

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

// 定义props
defineProps<{
  categories: Category[];
  selectedCategory: Category;
  articles: Article[];
  isLoading: boolean;
}>();

// 定义emit事件
defineEmits<{
  (e: 'category-selected', category: Category): void;
}>();
</script>

<style scoped>
  .blog-container {
    padding: 16px;
    background-color: #f8f8f8;
  }

  .blog-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 16px;
    text-align: center;
    animation: titleAnimation 2s ease-in-out infinite; /* 添加动画效果 */
  }

  @keyframes titleAnimation {
    0% {
      transform: scale(1);
      color: #409eff;
    }
    50% {
      transform: scale(1.1);
      color: #f56c6c;
    }
    100% {
      transform: scale(1);
      color: #409eff;
    }
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

  .category-more {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #409eff;
    font-size: 14px;
    font-weight: bold;
  }
</style>in-top: 16px;
  }
  
  .el-col {
    margin-bottom: 16px;
  }
  
  .category-more {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #409eff;
    font-size: 14px;
    font-weight: bold;
  }
  </style>
  -top: 16px;
  }
  
  .el-col {
    margin-bottom: 16px;
  }
  
  .category-more {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #409eff;
    font-size: 14px;
    font-weight: bold;
  }
  </style>
  