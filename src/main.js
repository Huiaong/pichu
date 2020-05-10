import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import { getStore } from '@/utils/storage'
import { userInfo } from '@/api/user'

import '@/styles/index.scss' // global css
import 'element-ui/lib/theme-chalk/index.css'
import '@/icons'

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

const whiteList = ['/login', '/register', '/forget'] // 不需要登陆的页面
router.beforeEach(function(to, from, next) {
  const params = {
    params: {
      token: getStore('token')
    }
  }
  userInfo(params).then(res => {
    if (res.success === false && res.result === null) { // 没登录
      console.log('User not login')
      if (whiteList.indexOf(to.path) !== -1) { // 白名单
        console.log('Is belong to white list')
        next()
      } else {
        console.log('Is not belong to white list')
        next('/login')
      }
    } else {
      console.log('Has been login')
      store.commit('RECORD_USERINFO', res.result)
      if (to.path === '/login') { //  跳转到
        next({ path: '/' })
      }
      next()
    }
  })
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
