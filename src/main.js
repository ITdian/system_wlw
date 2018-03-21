// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import service from './utils/request';
import validate from './utils/validate/validate';

Vue.prototype.$xttp = service;

Vue.config.productionTip = false;
Vue.use(validate);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
