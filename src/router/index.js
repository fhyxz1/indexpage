import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import index from '../views/index.vue'
import layout from '../views/layout.vue'
import login from '../views/dl.vue'
import Home from '../views/home.vue'
import blog from '../views/blog.vue'
import test from '../test/testimg.vue'
import systemRoutes from '../system/router'
import user from '../components/usercenter.vue'
import { useUserStore } from '@/stores/user'

const routes = [
  {
    path: '/',
    name: 'about',
    component: layout,
    redirect: '/home',
    children: [
      {
        path: '/login',
        name: 'login',
        component: login 
      },
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: { title: '首页' }
      },
      {
        path: '/blog',
        name: 'blog',
        component: blog,
        meta: { title: '博客' }
      },
      {
        path: '/user',
        name: 'user',
        component: user,
        meta: { title: '测试' }
      },
      {
        path: '/message',
        name: 'message',
        component: () => import('../components/message.vue'),
        meta: { title: '测试' }
      },
      {
        path: '/favorite',
        name: 'favorite',
        component: () => import('../components/favorite.vue'),
        meta: { title: '收藏测试' }
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('../components/search.vue'),
        meta: { title: '搜索' }
      },
    ]
  },
  {
    path: '/q',
    name: 'index',
    component: index,
    meta: { title: '首页' }
  },
  {
    path: '/test',
    name: 'test',
    component: test,
    meta: { title: '测试' }
  },
  // 集成后台管理路由
  ...systemRoutes
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 定义需要登录才能访问的路由
const authRoutes = ['/user', '/favorite', '/message']

// 定义需要管理员权限的路由
const adminRoutes = ['/system']

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  
  // 如果有 token 但没有用户信息，尝试自动登录
  if (localStorage.getItem('satoken') && !userStore.userInfo.username) {
    await userStore.checkAuth()
  }

  // 检查是否需要登录权限
  const needAuth = authRoutes.some(path => to.path.startsWith(path))
  // 检查是否需要管理员权限
  const needAdmin = adminRoutes.some(path => to.path.startsWith(path))
  
  if (needAdmin) {
    // 检查管理员权限
    if (!userStore.token) {
      ElMessage.warning('请先登录')
      next('/login')
    } else if (userStore.userInfo.role !== 'admin') {
      ElMessage.error('需要管理员权限')
      next('/home')
    } else {
      next()
    }
  } else if (needAuth && !userStore.token) {
    // 需要登录但未登录，重定向到登录页
    ElMessage.warning('请先登录')
    next('/login')
  } else if (to.path === '/login' && userStore.token) {
    // 已登录用户访问登录页面，重定向到首页
    next('/home')
  } else {
    // 其他情况正常放行
    next()
  }
})

export default router
