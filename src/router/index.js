import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'

const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [{
  // 登录页
  path: '/',
  name: 'login',
  component: Login
},
{
  path: '/admin',
  component: Main,
  children: [{
    path: '/',
    name: 'home',
    component: () =>
      import('@/views/Home/Home')
  }, {
    path: 'mall',
    name: 'mall',
    component: () =>
      import('@/views/Mall/Mall')
  }, {
    path: 'user',
    name: 'user',
    component: () =>
      import('@/views/User/User')
  },
  {
    path: '/',
    name: 'dataAnalysis',
    children: []
  },
  {
    path: '/wordYun',
    name: 'wordYun',
    component: () =>
      import('@/views/dataAnalysis/wordYun.vue')
  },
  {
    path: '/page1',
    name: 'page1',
    component: () =>
      import('@/views/Other/other')
  }, {
    path: '/page2',
    name: 'page2',
    component: () =>
      import('@/views/Other/other')
  }
  ]
},

{
  path: '/about',
  name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import( /* webpackChunkName: "about" */ '../views/About.vue')
}
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.afterEach((to, from) => {
  console.log('后置路由守卫', to, from)
  document.title = to.meta.title || '后台管理系统'
})
export default router
