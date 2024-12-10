<template>
  <!-- 桌面端布局 -->
  <div class="header">
      <div class="artistic-text" ref="textRef" @click="handlelogo">
          ylab
        </div>
        <div>
          <div style="margin-left: 50px;margin-right: 50px;">
          <el-input
          v-model="searchtext"
          placeholder="请输入您要搜索的内容"
          class="input-with-select"
          @keydown.enter="handleSearch"
        >
          <template #append>
            <el-button :icon="Search" circle="true" @click="handleSearch" class="icon_btn"/>
          </template>
        </el-input>
      </div>
       </div>
       <div class="col1">
       <boxnu
       v-for="(item, index) in navItems"
       :key="index"
       :to="item.path"
       :isActive="selectedIndex === index"
       @click="selectBox(index)"
       style="
       justify-content: flex;"
     >
       {{ item.label }}
     </boxnu>
     <el-dropdown>
      <div class="avatar-container">
          <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </div>
      <template #dropdown>
          <el-dropdown-menu>
              <template v-for="(item, index) in menuItems" :key="index">
                  <el-dropdown-item 
                      :divided="item.divided"
                      @click="item.action ? item.action() : handlerouter(item.path)"
                  >
                      <el-icon><component :is="item.icon" /></el-icon>
                      {{ item.label }}
                  </el-dropdown-item>
              </template>
          </el-dropdown-menu>
      </template>
  </el-dropdown>
</div>
     </div>

  
  <div class="main">
    <router-view></router-view>
  </div>
  <div class="footer">
    <div class="footer-content">
      <p>© 2024 Your Company. All Rights Reserved.</p>
      <div class="social-links">
      
      </div>
    </div>
  </div>
  
  
  
    </template>
    
    <script setup>
  import anime from 'animejs/lib/anime.es.js';
  import { ref, onMounted, computed } from 'vue';
import { 
  Search, 
  Setting, 
  Edit, 
  User, 
  Star,
  Message,
  Document,
  SwitchButton 
} from '@element-plus/icons-vue'
  import { ElMessage } from 'element-plus'
  import boxnu from '../module/menubox.vue';
  import router from '../../router';
  const textRef = ref(null);
  const searchtext=ref('');
  // 用户角色状态
const userRole = ref('admin') // 可能的值: 'user', 'blogger', 'admin'

const menuItems = computed(() => {
  // 基础菜单项（所有用户可见）
  const baseItems = [
      {
          label: '个人中心',
          icon: 'User',
          path: '/user'
      },
      {
          label: '我的收藏',
          icon: 'Star',
          path: '/user/favorites'
      },
      {
          label: '消息中心',
          icon: 'Message',
          path: '/user/message'
      }
  ]

  // 博主和管理员可见的菜单项
  const bloggerItems = [
      {
          label: '写文章',
          icon: 'Edit',
          path: '/system/blog/edit',
          divided: true
      },
      {
          label: '我的文章',
          icon: 'Document',
          path: '/user/articles'
      }
  ]

  // 仅管理员可见的菜单项
  const adminItems = [
      {
          label: '后台管理',
          icon: 'Setting',
          path: '/system/dashboard',
          divided: true
      }
  ]

  let items = [...baseItems]

  if (userRole.value === 'blogger' || userRole.value === 'admin') {
      items = [...items, ...bloggerItems]
  }

  if (userRole.value === 'admin') {
      items = [...items, ...adminItems]
  }

  // 添加退出登录选项
  items.push({
      label: '退出登录',
      icon: 'SwitchButton',
      path: '/login',
      divided: true,
      action: handleLogout
  })

  return items
})
  const handlerouter = (path) => {
    router.push(path);
  };

  onMounted(() => {
    const text = textRef.value;
    const letters = text.innerText.split('').map((letter) => {
      return `<span class="letter">${letter}</span>`;
    }).join('');
    
    text.innerHTML = letters;
  
    anime({
      targets: '.letter',
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 700,
      easing: 'easeOutExpo',
      delay: anime.stagger(200,400,800,1600), // 每个字母的延迟
    });
  });
    
  
  const selectedIndex = ref('/home'); // 默认选中的索引
  const handlelogo = () => {
      selectedIndex.value = '/home';
    router.push('/home')
    
  };
  const navItems = [
    { path: '/home', label: '首页' },
    { path: '/q', label: '学习导航' },
    { path: '/blog', label: '博客文章' },
  ];

  const userset = [
    { path: '/home', label: '个人主页' },
    { path: '/q', label: '我的收藏' },
    { path: '/blog', label: '我的消息' },
    { path: '/test', label: '测试页面' },
  ];
  const handleLogout = () => {
  ElMessage.success('退出成功');
  userRole.value = 'user'; // 重置用户角色
  router.push('/login');
};
  const selectBox = (index) => {
    selectedIndex.value = index; // 更新选中索引
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
  
        searchtext.value='';
      } else {
          ElMessage({
      message: '请输入搜索内容!!',
      type: 'warning',
    })
      }
    };
    </script>
    
    <style >

    .header {
      display: flex;
      justify-content: start;
      flex:   1000px;
      flex-direction: row;
      align-items: center;
      height: 100px;
      background-color: #fff;
      padding: 0 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width:100%;
      position: relative;
    }
    .avatar-container {
      cursor: pointer;
      display: flex;
      align-items: center; 
      justify-content: center; /* 水平居中 */
      padding: 20px;
      text-align: center;
      min-width: 10vh;
     height: 100%;

  }
    .col1{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin-left: auto;
    }
  .input-with-select {
      height: 40px;
  }
  
  .artistic-text {
      font-size: 2em;
      font-weight: bold;
      text-align: center;
      width: 100px;
      margin-left: 40px;
    }
    
    /* 针对 700px 到 900px 屏幕宽度的样式 */
    @media (min-width: 700px) and (max-width: 900px) {
      .artistic-text {
        font-size: 1.5em;  /* 修改字体大小 */
        width: 120px;      /* 修改宽度 */
        margin-left: 20px; /* 修改左边距 */
      }
    }
    
    .icon_btn {
      border-radius: 0px 0px 10px 10px;
    }
    .letter {
      color: #3498db; /* 字体颜色 */
    }

    .footer {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      border-top: 1px solid #e0e0e0;
      font-size: 14px;
      color: #6c757d;
      width: 100%;
    }
    
    .footer-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .el-input__wrapper {
      
      align-items: center;
      background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
      background-image: none;
       border-radius: 10px;
      box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
      cursor: text;
      display: inline-flex;
      flex-grow: 1;
      justify-content: center;
      padding: 1px 11px;
      transform: translateZ(0);
      transition: var(--el-transition-box-shadow);
      width: 250px;
  }
    </style>
    