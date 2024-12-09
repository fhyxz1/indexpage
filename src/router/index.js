import { createRouter, createWebHistory } from 'vue-router'
import index from '../views/index.vue'
import layout from '../views/layout.vue'
import login from '../views/login.vue'
import Home from '../views/home.vue'
import blog from '../views/blog.vue'
import test from '../test/testimg.vue'
import systemRoutes from '../system/router'

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
        path: '/test',
        name: 'test',
        component: test,
        meta: { title: '测试' }
      },
    ]
  },
  {
    path: '/q',
    name: 'index',
    component: index,
    meta: { title: '首页' }
  },
  // 集成后台管理路由
  ...systemRoutes
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 保存当前页面的标题
  const originalTitle = document.title;
  
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - ylab` : 'ylab';

  // 检查是否需要管理员权限
  if (to.path.startsWith('/system')) {
    // 这里应该检查用户是否是管理员
    const isAdmin = true; // 临时模拟管理员检查
    if (!isAdmin) {
      // 如果不是管理员，重定向回用户原本试图访问的页面，并且保持原标题
      document.title = originalTitle; // 保持原页面标题
      next(from.fullPath); // 重定向回原页面
      return;
    }
  }

  // 如果一切正常，继续跳转
  next();
});


export default router
