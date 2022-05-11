import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('../views/Article.vue')
  },
  {
    path: '/article/:id',  //根据文章id加载文章详情组件
    name: 'ArticleDetails',
    component: () => import('../views/ArticleDetails.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/Message.vue')
  },
  {
    path: '/link',
    name: 'Link',
    component: () => import('../views/Link.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/updateUser',
    name: 'user',
    component: () => import('../views/UpdateUser.vue')
  },
  {
    path: '/admin',  //后台管理的组件
    name: 'Admin',
    component: () => import('../views/Admin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
