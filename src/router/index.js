import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import store from '@/store';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    { path: '/auth/login', name: 'login', component: (resolve) => require(["@/page/auth/login"], resolve) },
    { path: '/auth/logout', component: (resolve) => require(["@/page/auth/logout"], resolve) },
    {
      path: '/home',
      redirect: '/home/cusManage',
      component: App,
      children: [
        {
          path: 'cusManage',
          redirect: '/home/cusManage/list',
          component: (resolve) => require(["@/page/home/_res"], resolve),
          children: [
            {
              name: 'list',
              path: 'list',
              component: (resolve) => require(["@/page/home/cusManage/list"], resolve)
            }]
        },
        {
          path: 'projectManage',
          redirect: '/home/projectManage/list',
          component: (resolve) => require(["@/page/home/_res"], resolve),
          children: [
            {
              name: 'list',
              path: 'list',
              component: (resolve) => require(["@/page/home/projectManage/list"], resolve)
            }]
        },
      ]
    }
  ]
})
let errorList = ['/home/nav/side/garageport','/home/nav/side/carport','/home/nav/propertyService/onlineService'];//记录暂时没开发的
router.beforeEach((to, from, next) => {
  if(errorList.find((val) => { return val == to.path})) {
    alert('该功能未开发');
    next(false);
  }else {
    store.dispatch('updateDirect',to.path);
    next();
  }

  // if(to.path == a)
  
})
export default router;

