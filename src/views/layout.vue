<template>
    <!-- 根据设备类型展示不同的页面组件 -->
    <MobilePage v-if="deviceType === 'mobile'" />
    <DesktopPage v-else />
   
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import MobilePage from '../components/mobile/ydlayout.vue';
import DesktopPage from '../components/desktop/zmlayout.vue';
import { Setting, User, SwitchButton } from '@element-plus/icons-vue'

// 声明一个响应式变量来存储设备类型
const deviceType = ref('desktop');

// 判断设备类型的函数，根据当前屏幕宽度设置类型
function checkDeviceType() {
  deviceType.value = window.innerWidth <= 900 ? 'mobile' : 'desktop';
}

// 在组件挂载时初始化设备类型，并监听窗口大小变化
onMounted(() => {
  checkDeviceType(); // 初始化时检查设备类型
  window.addEventListener('resize', checkDeviceType); // 动态监听窗口大小变化
  
  nextTick(() => {
    // 确保设备类型更新后页面重新渲染
    checkDeviceType();
  });
});

// 在组件销毁前移除监听器
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkDeviceType);
});
</script>

<style scoped>
.right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-avatar {
  cursor: pointer;
}

:deep(.el-dropdown-menu__item) {
  display: flex;
  align-items: center;
  gap: 8px;
}

:deep(.el-icon) {
  margin-right: 4px;
}
</style>
