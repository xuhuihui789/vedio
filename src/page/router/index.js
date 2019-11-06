import Vue from 'vue'
import Router from 'vue-router'

import login from '../../views/login/login'

Vue.use(Router)

// import * as type from 'store/mutations/type'


const router = new Router({
  routes: [
    {
       path: '/',
       redirect: '/login'
    },
   {
	   path: '/login',
	   component: login,
    },
  ]
})


router.beforeEach(function (to, from, next) {

  const routerArr = ['tizure', 'audit', 'psPlugin', 'ideas', 'flight', 'bbs', 'practice',
    'labReport', 'dataCenter', 'modeling', 'knowledge', 'details', 'assessment', 'shop', 'hope', 'main'];
  const auth = localStorage.TOKEN
  //跳转至上述页面

  if (routerArr.indexOf(to.name) >= 0) {
    //未登录
    if (!auth) {
      router.push({
        path: '/login'
      })
    }
  }
  //已登录的情况再去登录页，跳转至首页
  if (to.name === 'login') {
    if (auth) {
      router.push({
        path: '/main'
      })
    }
  }
  next();
});


export default router

