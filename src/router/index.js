import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import login from '@/views/login/login'
import forget from '@/views/login/forget'
import Layout from '@/views/layout'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/home'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/user',
    component: Layout,
    // redirect: '/user/index',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'role',
        component: () => import('@/views/user/role'),
        name: '角色管理',
        meta: { title: '角色管理', icon: 'user' }
      },
      {
        path: 'power',
        component: () => import('@/views/user/power'),
        name: '权限管理',
        meta: { title: '权限管理', icon: 'user' }
      },
      {
        path: 'account',
        component: () => import('@/views/user/account'),
        name: '账号管理',
        meta: { title: '账号管理', icon: 'user' }
      }
    ]
  },

  {
    path: '/goods',
    component: Layout,
    name: '商品管理',
    meta: { title: '商品管理', icon: 'editor' },
    children: [
      {
        path: 'property',
        component: () => import('@/views/goods/property'),
        name: '商品属性',
        meta: { title: '商品属性', icon: 'edit' }
      },
      {
        path: 'category',
        component: () => import('@/views/goods/category'),
        name: '商品类目',
        meta: { title: '商品类目', icon: 'list' }
      },
      {
        path: 'list',
        component: () => import('@/views/goods'),
        name: '商品列表',
        meta: { title: '商品列表', icon: 'list' }
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    name: '订单管理',
    meta: { title: '订单管理', icon: 'editor' },
    children: [
      {
        path: 'purchase',
        component: () => import('@/views/order/purchase'),
        name: '采购订单',
        meta: { title: '采购订单', icon: 'edit' }
      }, {
        path: 'production',
        component: () => import('@/views/order/production'),
        name: '生产订单',
        meta: { title: '生产订单', icon: 'edit' }
      }
    ]
  },

  {
    path: '/contract',
    component: Layout,
    name: '合同管理',
    meta: { title: '合同管理', icon: 'editor' },
    children: [
      {
        path: 'information',
        component: () => import('@/views/contract/information'),
        name: '合同信息',
        meta: { title: '合同信息', icon: 'edit' }
      },
      {
        path: 'pricing',
        component: () => import('@/views/contract/pricing'),
        name: '合同定价',
        meta: { title: '合同定价', icon: 'list' }
      }
    ]
  },

  {
    path: '/statement',
    component: Layout,
    name: '报表中心',
    meta: { title: '报表中心', icon: 'editor' },
    children: [
      {
        path: 'purchase',
        component: () => import('@/views/statement/purchase'),
        name: '采购报表',
        meta: { title: '合同信息', icon: 'edit' }
      },
      {
        path: 'production',
        component: () => import('@/views/statement/production'),
        name: '生产报表',
        meta: { title: '生产报表', icon: 'list' }
      },
      {
        path: 'contract',
        component: () => import('@/views/statement/contract'),
        name: '合同报表',
        meta: { title: '合同定价', icon: 'list' }
      }
    ]
  },

  {
    path: '/information',
    component: Layout,
    name: '资讯管理',
    meta: { title: '资讯管理', icon: 'editor' },
    children: [
      {
        path: 'notification',
        component: () => import('@/views/information/notification'),
        name: '通知管理',
        meta: { title: '通知管理', icon: 'edit' }
      },
      {
        path: 'feedback',
        component: () => import('@/views/information/feedback'),
        name: '意见反馈',
        meta: { title: '意见反馈', icon: 'list' }
      }
    ]
  },

  {
    path: '/login',
    component: login
  }, {
    path: '/forget',
    component: forget
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
