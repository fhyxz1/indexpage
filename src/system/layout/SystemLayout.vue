<template>
  <div class="system-layout">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'" class="aside">
        <div class="logo-container">
          <img src="../../static/ylablogo.svg" alt="Logo" class="logo" />
          <span v-show="!isCollapse">博客后台系统</span>
        </div>
        
        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical"
          :collapse="isCollapse"
          @select="handleSelect"
          background-color="#304156"
          text-color="#fff"
          active-text-color="#409EFF"
        >
          <el-menu-item index="/system/dashboard">
            <el-icon><Odometer /></el-icon>
            <template #title>控制台</template>
          </el-menu-item>

          <el-sub-menu index="/system/blog">
            <template #title>
              <el-icon><Document /></el-icon>
              <span>博客管理</span>
            </template>
            <el-menu-item index="/system/blog">博客列表</el-menu-item>
            <el-menu-item index="/system/blog/edit">新建博客</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="/system/settings">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/system/settings/profile">个人信息</el-menu-item>
            <el-menu-item index="/system/settings/security">安全设置</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 顶部导航 -->
        <el-header class="header" :class="{'collapsed': isCollapse}">
          <div class="header-left">
            <el-icon 
              class="collapse-btn"
              @click="toggleCollapse"
            >
              <component :is="isCollapse ? 'Expand' : 'Fold'" />
            </el-icon>
            
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/system/dashboard' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-for="(item, index) in breadcrumbItems" 
                :key="index"
                :to="item.path"
              >
                {{ item.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <div class="header-right">
            <el-space>
              <el-tooltip content="全屏" placement="bottom">
                <el-icon class="action-icon" @click="toggleFullScreen">
                  <FullScreen />
                </el-icon>
              </el-tooltip>

              <el-dropdown trigger="click">
                <el-space>
                  <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                  <span>管理员</span>
                  <el-icon><CaretBottom /></el-icon>
                </el-space>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="router.push('/system/settings/profile')">
                      <el-icon><User /></el-icon>个人信息
                    </el-dropdown-item>
                    <el-dropdown-item @click="router.push('/system/settings/security')">
                      <el-icon><Lock /></el-icon>安全设置
                    </el-dropdown-item>
                    <el-dropdown-item divided @click="handleLogout">
                      <el-icon><SwitchButton /></el-icon>退出登录
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-space>
          </div>
        </el-header>

        <!-- 主要内容区域 -->
        <el-main class="main">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import {
  Odometer,
  Document,
  Setting,
  Expand,
  Fold,
  FullScreen,
  CaretBottom,
  User,
  Lock,
  SwitchButton
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const isCollapse = ref(false)

// 计算当前激活的菜单项
const activeMenu = computed(() => {
  return route.path
})

// 计算面包屑项
const breadcrumbItems = computed(() => {
  const { matched } = route
  return matched.slice(1).map(item => ({
    title: item.meta?.title || item.name,
    path: item.path
  }))
})

// 切换侧边栏折叠状态
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

// 处理菜单选择
const handleSelect = (index) => {
  router.push(index)
}

// 切换全屏
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// 处理退出登录
const handleLogout = () => {
  ElMessageBox.confirm(
    '确定要退出登录吗？',
    '退出确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 实际项目中这里应该调用退出登录API
    router.push('/login')
  })
}
</script>

<style scoped>
.system-layout {
  height: 100vh;
  display: flex;
}

.system-layout :deep(.el-container) {
  height: 100%;
}

.aside {
  height: 100vh;
  background-color: #304156;
  transition: width 0.3s;
  overflow: hidden;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #1f2d3d;
}
.header-right {
  display: flex;
  align-items: center;
  margin-right:10vh;
  margin-left: auto;
}
.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 200px;
  z-index: 1000;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  padding: 0 20px;
  transition: left 0.3s;
}

.header.collapsed {
  left: 64px;
}

.main {
  margin-top: 60px;
  background-color: #f0f2f5;
  padding: 20px;
  min-height: calc(100vh - 60px);
  box-sizing: border-box;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

:deep(.el-menu) {
  border-right: none;
}

:deep(.el-menu-item.is-active) {
  background-color: #263445;
}

:deep(.el-sub-menu__title:hover),
:deep(.el-menu-item:hover) {
  background-color: #263445 !important;
}
</style>
