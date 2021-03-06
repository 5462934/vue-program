import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/App.vue';
import Home from './components/Home/Home.vue';
import Member from './components/Member/Member.vue';
import Shopcart from './components/Shopcart/Shopcart.vue';
import Search from './components/Search/Search.vue';
import NewList from './components/News/NewList.vue';
import NewDetail from './components/News/NewDetail.vue';
import PicShare from './components/Photo/Share.vue';
import PhotoDetail from './components/Photo/PhotoDetail.vue';
import GoodsList from './components/Goods/GoodsList.vue';
import GoodsDetail from './components/Goods/GoodsDetail.vue';


// 引入moment时间插件
import Moment from 'moment';
//引入vue-preview
import VuePreview from 'vue-preview'
//使用vue-preview
Vue.use(VuePreview)

// 设置全局组件 组件名称，组件
import MyUl from './components/Commons/MyUl.vue';
import MyLi from './components/Commons/MyLi.vue';
import NavBar from './components/commons/NavBar.vue';
import Comments from './components/Commons/Comment.vue';
import Swipe from './components/Commons/Swipe.vue';
Vue.component(MyUl.name, MyUl);
Vue.component(MyLi.name, MyLi);
Vue.component(NavBar.name, NavBar);
Vue.component(Comments.name, Comments);
Vue.component(Swipe.name, Swipe);


Vue.use(VueRouter);


// 设置过滤器
// 时间格式设置
Vue.filter('convertTime', function (value) {
  return Moment(value).format('YYYY-MM-DD')
})
// 标题过长显示...
Vue.filter('convertTitle', function (value, limit) {
  if (!value) return;
  if (value.length > limit) {
    return value.substr(0, limit) + '...';
  }
  return value;
})

// 过滤器结束

var router = new VueRouter();

router.addRoutes([
  // 重定向到首页
  {
    path: '/', redirect: { name: 'home' }
  }, 
  {
    name: 'new.list', path: '/new/list', component: NewList
  },
  {
    name: 'news.detail', path: '/news/detail', component: NewDetail
  },// 图文分享
  {
    name: 'picshare', path: '/photo/list/:categoryId', component: PicShare
  },
  {
    name: 'picdetail', path: '/photo/detail', component: PhotoDetail
  },
  {
    name: 'goods.list', path: '/goods/list', component: GoodsList
  },
  {
    name: 'goods.detail', path: '/goods/detail', component: GoodsDetail
  },
  {
    name: 'goods.comments', path: '/goods/comments', component: Comments
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



// 拦截器中实现loadding图标
Axios.interceptors.request.use( config => {
  MintUi.Indicator.open({
    text: '玩命加载中..',
    spinnerType: 'triple-bounce'
  })
  return config;
})
Axios.interceptors.response.use(response => {
  MintUi.Indicator.close();
  return response;
});

new Vue({
  el: '#app',
  router,
  render: c => c(App)
})