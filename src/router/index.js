import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Main,
    children: [{
      path: '/',
      name: 'home',
      component: () => import('@/views/Home/Home')
    }, {
      path: '/mall',
      name: 'mall',
      component: () => import('@/views/Mall/Mall')
    }, {
      path: '/user',
      name: 'user',
      component: () => import('@/views/User/User')
    }, {
      path: '/page1',
      name: 'page1',
      component: () => import('@/views/Other/other')
    }]
  },
  {
    // 登录页
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
