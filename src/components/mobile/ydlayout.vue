<template>
    <van-nav-bar title="ylab" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" size="18" @click="showSearch" />
      </template>
      <template #left>
        <van-icon name="bars" @click="toggleMenu" />
      </template>
    </van-nav-bar>
  
    <!-- Search Popup -->
    <van-popup v-model:show="isSearchVisible" position="top">
        <van-search
        v-model="searchtext"
        show-action
        placeholder="请输入搜索关键词"
        @search="handleSearch"
      >
        <template #action>
          <div @click="handleSearch">搜索</div>
        </template>
      </van-search>
      
      <van-button type="close" block @click="isSearchVisible = false"></van-button>
    </van-popup>
  
    <!-- Fullscreen Navigation Menu -->
    <van-popup
      v-model:show="isMenuVisible"
      position="left"
      :style="{ width: '60%', height: '100vh' }" >
      <div class="menu-content">
        <!-- User Profile Section -->
        <!-- <div class="user-profile">
          <van-cell title="用户名" value="ylab_user" is-link />
          <van-cell title="邮箱" value="user@example.com" is-link />
        </div> -->
  
        <!-- Navigation Items -->
        <div class="navigation-items">
          <div class="login-section">
            <div class="welcome-text">
              <van-icon name="user-o" size="24" />
              <p class="title">欢迎来到 ylab</p>
              <p class="subtitle">登录后体验更多功能</p>
            </div>
            <div class="auth-buttons">
              <van-button 
                type="primary" 
                size="small"
                class="login-btn"
                @click="handleLogin">
                登录
              </van-button>
              <van-button 
                plain 
                type="primary" 
                size="small"
                class="register-btn"
                @click="handleRegister">
                注册
              </van-button>
            </div>
          </div>
          
          <!-- 基础导航菜单 -->
          <div class="menu-section">
            <div class="section-title">导航菜单</div>
            <div class="menu-list">
              <div v-for="(item, index) in menuItems" 
                :key="index" 
                class="menu-item"
                :class="{ active: currentPath === item.value }"
                @click="handleMenuItemClick(item)">
                <van-icon :name="item.icon" class="menu-icon" />
                <span class="menu-text">{{ item.label }}</span>
                <van-icon name="arrow" class="arrow-icon" />
              </div>
            </div>
          </div>

          <!-- 用户功能菜单 -->
          <div class="menu-section" v-if="userRole !== 'guest'">
            <div class="section-title">用户功能</div>
            <div class="menu-list">
              <div v-for="(item, index) in userMenuItems" 
                :key="index"
                class="menu-item"
                @click="handleUserMenuClick(item)">
                <van-icon :name="getVantIcon(item.icon)" class="menu-icon" />
                <span class="menu-text">{{ item.label }}</span>
                <van-icon name="arrow" class="arrow-icon" />
              </div>
            </div>
          </div>
        </div>
  
        <!-- Action Buttons -->
        <div class="action-buttons">
          <div class="role-switcher">
            <span class="role-label">当前角色：</span>
            <van-dropdown-menu>
              <van-dropdown-item v-model="userRole" :options="roleOptions" />
            </van-dropdown-menu>
          </div>
          <div class="logout-button" @click="confirmLogout" v-if="userRole !== 'guest'">
            <van-icon name="logout" class="logout-icon"/>
            <span>退出登录</span>
          </div>
        </div>
      </div>
    </van-popup>
    
<div class="main-content">
<router-view></router-view>
</div>
<div class="footer">
    <div class="footer-content">
      <p> 2024 Your Company. All Rights Reserved.</p>
    </div>
  </div>

  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'; 
  import { ref, computed } from 'vue';
  import { showDialog } from 'vant';
  import { ElMessage } from 'element-plus'
  const router = useRouter();
  const isSearchVisible = ref(false);  
  const isMenuVisible = ref(false);    
  const searchtext=ref('');
  const currentPath = ref(window.location.pathname);
  
  // 用户角色选项
  const roleOptions = [
    { text: '访客', value: 'guest' },
    { text: '用户', value: 'user' },
    { text: '博主', value: 'blogger' },
    { text: '管理员', value: 'admin' }
  ];

  // 用户角色状态
  const userRole = ref('guest'); // 可能的值: 'guest', 'user', 'blogger', 'admin'

  // 基础导航菜单
  const menuItems = [
    { label: '首页', value: '/home', icon: 'home-o' },
    { label: '学习导航', value: '/q', icon: 'guide-o' },
    { label: '博客文章', value: '/blog', icon: 'notes-o' },
  ];

  // 计算用户功能菜单
  const userMenuItems = computed(() => {
    // 基础菜单项（所有登录用户可见）
    const baseItems = [
      {
        label: '个人中心',
        icon: 'User',
        path: '/user/profile'
      },
      {
        label: '我的收藏',
        icon: 'Star',
        path: '/user/favorites'
      },
      {
        label: '消息中心',
        icon: 'Message',
        path: '/user/messages'
      }
    ];

    // 博主和管理员可见的菜单项
    const bloggerItems = [
      {
        label: '写文章',
        icon: 'Edit',
        path: '/system/blog/edit'
      },
      {
        label: '我的文章',
        icon: 'Document',
        path: '/user/articles'
      }
    ];

    // 仅管理员可见的菜单项
    const adminItems = [
      {
        label: '后台管理',
        icon: 'Setting',
        path: '/system/dashboard'
      }
    ];

    let items = [...baseItems];

    if (userRole.value === 'blogger' || userRole.value === 'admin') {
      items = [...items, ...bloggerItems];
    }

    if (userRole.value === 'admin') {
      items = [...items, ...adminItems];
    }

    return items;
  });

  // Element Plus 图标转换为 Vant 图标
  const getVantIcon = (elementIcon) => {
    const iconMap = {
      'User': 'user-o',
      'Star': 'star-o',
      'Message': 'chat-o',
      'Edit': 'edit',
      'Document': 'description',
      'Setting': 'setting-o'
    };
    return iconMap[elementIcon] || 'apps-o';
  };

  const handleSearch = () => {
        if (searchtext.value.trim()) {
          console.log(`搜索内容: ${searchtext.value}`);
          ElMessage({
        message: '搜索施工中....',
        type: 'success',
      })
    
          // 这里发送请求并响应
          //清空searchtext
    
          searchtext.value=' ';
        } else {
            ElMessage({
        message: '请输入搜索内容!!',
        type: 'warning',
      })
        }
      };
  const showSearch = () => {
    isSearchVisible.value = true;
  };
  const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
  };
  const handleMenuItemClick = (item) => {
    currentPath.value = item.value;
    router.push(item.value);
    isMenuVisible.value = false;
  };
  const handleUserMenuClick = (item) => {
    router.push(item.path);
    isMenuVisible.value = false;
  };
  const handleLogout = () => {
    ElMessage.success('退出成功');
    userRole.value = 'guest';
    router.push('/login');
    isMenuVisible.value = false;
  };
  const confirmLogout = () => {
    showDialog({
      title: '确认退出',
      message: '是否确认退出登录？',
      confirmButtonText: '退出',
      cancelButtonText: '取消',
      confirmButtonColor: '#ee0a24',
    })
      .then(() => {
        handleLogout();
      })
      .catch(() => {
        // 取消退出
      });
  };
  const handleLogin = () => {
    console.log('登录');
  };
  const handleRegister = () => {
    console.log('注册');
  };
  </script>
  
  <style scoped>

  .van-popup {
    padding: 0;
  }
  
  .menu-content {
    display: flex;
    flex-direction: column;
    height: 100%; 
    padding: 20px;
    box-sizing: border-box; 
    background: var(--van-background-2);
  }
  
  .user-profile {
    margin-bottom: 20px;
  }
  
  .navigation-items {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .van-cell {
    padding: 15px;
    font-size: 16px;
  }
  
  .van-cell--border {
    border-bottom: 1px solid #eee;
  }
  
  .van-icon {
    color: #666;
  }
  
  .van-button {
    margin-top: 20px;
  }
  
  .van-popup__overlay {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .login-section {
    padding: 16px;
    background: var(--van-background-2);
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .welcome-text {
    text-align: center;
    margin-bottom: 12px;
    width: 100%;
  }

  .welcome-text .van-icon {
    margin-bottom: 6px;
    color: var(--van-primary-color);
  }

  .welcome-text .title {
    margin: 3px 0;
    font-size: 15px;
    color: var(--van-text-color);
    font-weight: 500;
  }

  .welcome-text .subtitle {
    font-size: 13px;
    color: var(--van-gray-6);
    margin: 0;
  }

  .auth-buttons {
    display: flex;
    justify-content: center;
    gap: 12px;
    width: 100%;
    max-width: 240px;
    margin-top: 12px;
  }

  .login-btn,
  .register-btn {
    flex: 1;
    min-width: 80px;
    max-width: 100px;
    height: 32px;
    font-size: 14px;
    border-radius: 16px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .login-btn {
    background: var(--van-primary-color);
    border: none;
  }

  .login-btn:active {
    transform: scale(0.95);
    opacity: 0.9;
  }

  .register-btn {
    border: 1px solid var(--van-primary-color);
    color: var(--van-primary-color);
  }

  .register-btn:active {
    transform: scale(0.95);
    background-color: rgba(var(--van-primary-color-rgb), 0.1);
  }

  .menu-section {
    margin-bottom: 20px;
  }

  .section-title {
    padding: 0 16px;
    margin-bottom: 8px;
    font-size: 14px;
    color: var(--van-gray-6);
    font-weight: 500;
  }

  .menu-list {
    background: var(--van-background);
    border-radius: 8px;
    overflow: hidden;
  }

  .menu-item {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    background: var(--van-background);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }

  .menu-item:not(:last-child) {
    border-bottom: 1px solid var(--van-gray-2);
  }

  .menu-item:active {
    background: var(--van-gray-1);
  }

  .menu-item.active {
    color: var(--van-primary-color);
    background: var(--van-gray-1);
  }

  .menu-icon {
    font-size: 18px;
    margin-right: 12px;
    color: inherit;
  }

  .menu-text {
    flex: 1;
    font-size: 15px;
    color: inherit;
  }

  .arrow-icon {
    font-size: 14px;
    color: var(--van-gray-5);
    transition: transform 0.2s ease;
  }

  .menu-item.active .arrow-icon {
    transform: translateX(2px);
    color: var(--van-primary-color);
  }

  .menu-item::after {
    content: '';
    position: absolute;
    left: 0;
    width: 4px;
    height: 0;
    background: var(--van-primary-color);
    transition: height 0.2s ease;
  }

  .menu-item.active::after {
    height: 100%;
  }

  .action-buttons {
    margin-top: auto;
    padding: 16px;
    border-top: 1px solid var(--van-gray-2);
  }

  .role-switcher {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background: var(--van-background);
    border-radius: 8px;
    margin-bottom: 12px;
  }

  .role-label {
    font-size: 14px;
    color: var(--van-gray-6);
    margin-right: 8px;
  }

  :deep(.van-dropdown-menu) {
    flex: 1;
    height: 32px;
    background: transparent;
    box-shadow: none;
  }

  :deep(.van-dropdown-menu__bar) {
    height: 32px;
    background: transparent;
  }

  :deep(.van-dropdown-menu__title) {
    font-size: 14px;
    color: var(--van-primary-color);
  }

  .logout-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    background: var(--van-background);
    border-radius: 8px;
    color: var(--van-danger-color);
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s ease;
    gap: 8px;
  }

  .logout-button:active {
    background: var(--van-gray-1);
    transform: scale(0.98);
  }

  .logout-icon {
    font-size: 18px;
  }
  </style>