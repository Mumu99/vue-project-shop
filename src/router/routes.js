// 引入组件, 并注册成路由组件
// 目前使用@符号无提示, @就相对应src目录
import Home from '@/pages/Home'
// 引入登录组件
import Login from '@/pages/Login'
// 引入注册组件
import Register from '@/pages/Register'
// 引入搜索组件
import Search from '@/pages/Search'
export default [
  // 首页路由组件注册
  {
    path: '/',
    component: Home
  },
  // 登录路由组件注册
  {
    path: '/login',
    component: Login,
    meta: {
      isHideFooter: true //? 是否隐藏Footer组件
    }
  },
  // 注册路由组件注册
  {
    path: '/register',
    component: Register,
    meta: {
      isHideFooter: true //? 是否隐藏Footer组件
    }
  },
  // 搜索路由组件注册
  { // 路由传参
    name: 'search', // 命名路由
    path: '/search/:keyVal?', //?--> params可传可不传
    component: Search
  },
  // 重定向
  {
    path: '',
    redirect: '/'
  }
]