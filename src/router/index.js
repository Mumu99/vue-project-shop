import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入routes
import routes from './routes'

// 解决编程式路由跳转的bug, 统一解决
const originPush = VueRouter.prototype.push
// 形参默认值, 给成功的回调函数指定一个空函数
VueRouter.prototype.push = function (location, onComplete = () => {}, onAbort) {
  return originPush.call(this, location, onComplete, onAbort)
}
const originReplace = VueRouter.prototype.replace
// 给失败的回调函数, 指定一个为空的函数
VueRouter.prototype.replace = function (location, onComplete, onAbort = () => {}) {
  return originReplace.call(this, location, onComplete, onAbort)
}
// 声明使用路由
Vue.use(VueRouter)
// 实例化路由器对象, 并暴露
export default new VueRouter({
  mode: 'history', // 设置路由地址的模式, hash--> #
  routes // 路由组件注册的数组
})