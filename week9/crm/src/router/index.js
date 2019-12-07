import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Org from './org'
import Crm from './customer'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect:'/org',
    component: Index,
    children:[
      {
        path:'/org',
        name:"org",
        component: () => import(/* webpackChunkName: "org" */ '../views/org.vue'),
        children:Org
      },
      {
        path:'crm',
        name:'crm',
        component: () => import(/* webpackChunkName: "crm" */ '../views/crm.vue'),
        children:Crm
      }
    ],
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 路由懒加载
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    path:'*', //走到不存在的路径时，重新跳转到首页
    redirect:'/'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
