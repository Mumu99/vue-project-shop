<template>
  <div class="container">
    <Header />
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHideFooter" />
  </div>
</template>

<script>
// 引入Header组件, Footer组件
import Header from './components/Header'
import Footer from './components/Footer'
// import { reqBaseCategoryList } from './api'

// BaseCategoryList = async () => {
//   const result = await reqBaseCategoryList()
// }
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  // 页面加载完成之后的回调
  mounted () {
    // 通过dispatch提交对应的action, 获取分类信息数据(没有必要多次请求)
    this.$store.dispatch('getBaseCategoryList')
    // this.BaseCategoryList
    // const result = await reqBaseCategoryList()
    // console.log(result)
    // this.$store.dispatch('getBaseCategoryList')
    // console.log(this.$store)
    // console.log(this.$store.state.home.baseCategoryList)
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>
