<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

onMounted(async () => {
  // 如果有 token，验证并恢复会话
  if (userStore.token) {
    await userStore.checkAuth()
  }
})
</script>

<template>
  <router-view />
</template>
