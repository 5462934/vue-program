import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './components/App.vue';
import Home from './components/Home/Home.vue';
import Member from './components/Member/Member.vue';
import Shopcart from './components/Shopcart/Shopcart.vue';
import Search from './components/Search/Search.vue';
import MyUl from './components/Commons/MyUl.vue';
import MyLi from './components/Commons/MyLi.vue';
import NewList from './components/News/NewList.vue';
import NewDetail from './components/News/NewDetail.vue';
import NavBar from './components/commons/NavBar.vue';
// 引入moment时间插件
import Moment from 'moment';
// 设置全局组件
// 组件名称，组件
Vue.component(MyUl.name, MyUl);
Vue.component(MyLi.name, MyLi);
Vue.component(NavBar.name, NavBar);
Vue.use(VueRouter);

// 设置过滤器

// 时间格式设置
Vue.filter('convertTime', function (value) {
  return Moment(value).format('YYYY-MM-DD')
})
// 标题过长显示...
Vue.filter('convertTitle', function (value, limit) {
  if (value.length > limit) {
    return value.substr(0,limit) + '...';
  }
})
var router = new VueRouter();

router.addRoutes([
  // 重定向到首页
  {
    path: '/', redirect: {
      name: 'home'
    }
  }, {
    name: 'new.list', path: '/new/list', component: NewList
  },
  {
    name: 'news.detail', path: '/news/detail', component: NewDetail 
  },
  {
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