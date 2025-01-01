<template>
  <div class="category-selector" :class="{ mobile: isMobile }">
    <h2 class="title" :class="{ 'animated-title': !isMobile }">博客分类</h2>
    <div class="category-list">
      <div
        v-for="category in categories"
        :key="category.category_name"
        class="category-item"
        :class="{ active: selectedCategory.category_name === category.category_name }"
        @click="selectCategory(category)"
      >
        <span class="category-name">{{ category.category_name }}</span>
        <span v-if="category.tags?.length" class="sub-count">
          {{ category.tags.length }}
        </span>
      </div>
    </div>
  </div>
</template>


<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  selectedCategory: {
    type: Object,
    required: true
  },
  categories: {
    type: Array,
    required: true
  },
  isMobile: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:selectedCategory']);

// 修改了字段引用，确保逻辑与新字段一致
const selectCategory = (category) => {
  emit('update:selectedCategory', category);
};
</script>


<style scoped>
.category-selector {
  margin-bottom: 24px;
  justify-content: center;
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--el-text-color-primary);
  text-align: center;
}

.mobile .title {
  font-size: 18px;
  margin-bottom: 12px;
  color: var(--van-text-color);
}

.animated-title {
  position: relative;
  display: inline-block;
}

.animated-title::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--el-color-primary);
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease-out;
}

.animated-title:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.mobile .category-list {
  gap: 8px;
}

.category-item {
  padding: 8px 16px;
  border-radius: 20px;
  background-color: var(--el-fill-color-light);
  color: var(--el-text-color-regular);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mobile .category-item {
  padding: 6px 12px;
  background-color: var(--van-background-2);
  color: var(--van-text-color);
}

.category-item:hover {
  background-color: var(--el-color-primary-light-9);
}

.mobile .category-item:hover {
  background-color: var(--van-primary-light);
}

.category-item.active {
  background-color: var(--el-color-primary);
  color: white;
}

.mobile .category-item.active {
  background-color: var(--van-primary-color);
  color: white;
}

.sub-count {
  font-size: 12px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 10px;
}

.mobile .sub-count {
  padding: 1px 4px;
}
</style>
