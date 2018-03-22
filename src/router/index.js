import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store';
import basis from './modules/basis';
import jobmangement from './modules/jobmangement'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    { path: '/auth/login', name: 'login', component: (resolve) => require(["@/page/auth/login"], resolve) },
    { path: '/auth/logout', component: (resolve) => require(["@/page/auth/logout"], resolve) },
    //主页
    {
      path: '/home',
      name: 'home',
      redirect: '/contractManage',
    },
    ...basis,...jobmangement]
})
let errorList = ['/home/nav/side/garageport','/home/nav/side/carport','/home/nav/propertyService/onlineService'];//记录暂时没开发的
router.beforeEach((to, from, next) => {
  //校验是否有权限
  //建议用to.name做比较
  // console.log(to)
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

