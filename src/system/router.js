import { createRouter, createWebHistory } from 'vue-router'
import SystemLayout from './layout/SystemLayout.vue'

export const systemRouter = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/system',
      component: SystemLayout,
      redirect: '/system/dashboard',
      meta: { title: '系统管理' },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('./views/Dashboard.vue'),
          meta: { title: '控制台' }
        },
        {
          path: 'blog',
          name: 'BlogList',
          component: () => import('./views/BlogList.vue'),
          meta: { title: '博客列表' }
        },
        {
          path: 'blog/edit/:id?',
          name: 'BlogEdit',
          component: () => import('./views/BlogEdit.vue'),
          meta: { title: '编辑博客' }
        },
        {
          path: 'blog/detail/:id',
          name: 'BlogDetail',
          component: () => import('./views/BlogDetail.vue'),
          meta: { title: '博客详情' }
        },
        {
          path: 'settings/profile',
          name: 'Profile',
          component: () => import('./views/settings/Profile.vue'),
          meta: { title: '个人信息' }
        },
        {
          path: 'settings/security',
          name: 'Security',
          component: () => import('./views/settings/Security.vue'),
          meta: { title: '安全设置' }
        },
        {
          path: 'users',
          component: () => import('./views/users/UserList.vue'),
          meta: { title: '用户管理', requiresAuth: true }
        },
        {
          path: 'announcements',
          component: () => import('./views/announcements/AnnouncementList.vue'),
          meta: { title: '公告管理', requiresAuth: true }
        },
        {
          path: 'announcements/edit/:id?',
          component: () => import('./views/announcements/AnnouncementEdit.vue'),
          meta: { title: '编辑公告', requiresAuth: true }
        },
        {
          path: 'comments',
          component: () => import('./views/comments/CommentList.vue'),
          meta: { title: '留言管理', requiresAuth: true }
        },
        {
          path: 'comments/:id',
          component: () => import('./views/comments/CommentDetail.vue'),
          meta: { title: '留言详情', requiresAuth: true }
        }
      ]
    }
  ]
});

export default systemRouter;
