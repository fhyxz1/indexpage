<!-- FloatingButton.vue -->
<template>
    <div class="floating-button" @click="handleClick">
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    icon: String,
    size: {
      type: String,
      default: '50px',
    },
  })
  
  const emits = defineEmits(['click'])
  
  function handleClick() {
    emits('click')
  }
  </script>
  
  <style scoped>
  .floating-button {
    width: var(--button-size, 50px);
    height: var(--button-size, 50px);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #409eff;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s;
  }
  
  .floating-button:hover {
    background-color: #66b1ff;
  }
  </style>
  