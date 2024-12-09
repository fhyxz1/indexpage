<template>
    <div
      class="clickable-box"
      :class="{ active: isActive }"
      @click="handleClick"
    >
      <slot></slot>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps } from 'vue';
  import { useRouter } from 'vue-router';
  
  const props = defineProps<{
    to: string; // 跳转的路径
    isActive: boolean; // 是否为活动状态
  }>();
  
  const router = useRouter();
  
  const handleClick = () => {
    router.push(props.to); // 跳转到指定路径
  };
  </script>
  
  <style scoped>
  .clickable-box {
    display: flex; /* 使内容居中 */
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    padding: 10px;
    transition: background-color 0.3s, box-shadow 0.3s;
    cursor: pointer; /* 鼠标悬停时显示为手型 */
    text-align: center;
    min-width: 100px;
   height: 100%; /* 确保高度一致 */
  }
  
  .clickable-box:hover {
    background-color: #e6f7ff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .clickable-box.active {
    border-bottom: 3px solid #409eff; /* 下滑条样式 */
    background-color: #e6f7ff; /* 高亮背景 */
  }
  </style>
  