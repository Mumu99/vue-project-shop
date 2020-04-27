// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 引入路由
import router from './router'
// 引入vuex中的store
import store from './store'
// 引入mock
import './mock/mockServer'
// import style
import 'swiper/css/swiper.css'
// 引入TypeNav(商品分类导航), ListContainer(列表), Rank(商品排行), Brand(商标), Like(猜你喜欢), Floor(楼层)
import TypeNav from './components/TypeNav'
import ListContainer from './pages/Home/ListContainer'
import TodayRecommend from './pages/Home/TodayRecommend'
import Rank from './pages/Home/Rank'
import Brand from './pages/Home/Brand'
import Like from './pages/Home/Like'
import Floor from './pages/Home/Floor'
// 轮播图组件
import Carousel from './components/Carouser'

// 注册全局组件
Vue.component('TypeNav', TypeNav)
Vue.component('ListContainer', ListContainer)
Vue.component('TodayRecommend', TodayRecommend)
Vue.component('Rank', Rank)
Vue.component('Brand', Brand)
Vue.component('Like', Like)
Vue.component('Floor', Floor)
Vue.component('Carousel', Carousel)

// 设置浏览器的控制台中是否显示默认提示信息
Vue.config.productionTip = false
// 创建Vue实例
new Vue({
  render: h => h(App),
  // 注册路由
  router,
  // 注册创库
  store
}).$mount('#app')