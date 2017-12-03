import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './components/App.vue';
import Home from './components/Home/Home.vue';
import Member from './components/Member/Member.vue';
import Shopcart from './components/Shopcart/Shopcart.vue';
import Search from './components/Search/Search.vue';
import MyUl from './components/Commons/MyUl.vue';
import MyLi from './components/Commons/MyLi.vue';
// 设置全局组件
// 组件名称，组件
Vue.component(MyUl.name, MyUl);
Vue.component(MyLi.name, MyLi);
Vue.use(VueRouter);

var router = new VueRouter();

router.addRoutes([
  // 重定向到首页
  {
    path: '/', redirect: {
      name: 'home'
    }
  }, {
    name: 'home', path: '/home', component: Home
  },
  {
    name: 'member', path: '/member', component: Member
  },
  {
    name: 'shopcart', path: '/shopcart', component: Shopcart
  },
  {
    name: 'search', path: '/search', component: Search
  },
]);


// 引入mint-ui
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUi);


// 引入css文件
import './static/css/global.css'

// Axios开始
import Axios from 'axios';
Vue.prototype.$axios = Axios;
Axios.defaults.baseURL = "http://vue.studyit.io/api/";

new Vue({
  el: '#app',
  router,
  render: c => c(App)
})