<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/" class="logo">
          <img src="./images/Logo.png" alt />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyVal" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      keyVal: ''
    }
  },
  methods: {
    toSearch () {
      // 跳转到Search组件的界面内容
      // 通过编程式路由
      // this.$router.push('/search') // 有记录, 多次点击会报错
      // 方案一, 每次路由跳转都要设置成功的回调(push和replace原理一致)
      // this.$router.push('/search', () => { }) // 传入成功的回调
      // this.$router.push('/search', null, () => { }) // 传入失败的回调
      // this.$router.push('/search').then(() => { }) // 指定then()无效
      // this.$router.push('/search').catch(() => { }) // 指定catch()可以解决
      // this.$router.replace() // 无记录
      // 方案二, 使用统一用一种方法解决项目中所有的编程式路由跳转的问题, router目录中的index.js文件为路由器重写push || replace方法
      // this.$router.push('/search')
      // 路由传参: params, props, query, meta

      // 路由传参: params传参
      // 字符串方式
      // this.$router.push(`/search/${this.keyVal}`)
      // 对象方式
      // this.$router.push({ name: 'search', params: { keyVal: this.keyVal } })

      // 路由传参: query传参
      // 字符串方式
      // this.$router.push(`/search?keyVal=${keyVal}`)
      // 对象方式
      // this.$router.push({ path: '/search', query: { keyVal: this.keyVal } })

      // 搜索框是否输入了, 有参数就携带传参跳转
      if (this.keyVal) {
        this.$router.push({ name: 'search', params: { keyVal: this.keyVal } })
      } else {
        // 没有就直接跳转到search
        this.$router.push({ name: 'search' })
      }
    }
  }
}
// 路由器一旦注册后, 每个组件都会出现两个对象
// $router 路由器对象, 可以调用相关的方法实现编程式路由跳转
// $route 路由组件信息对象, 可以获取到参数
// 编程式路由进行跳转并传入参数的时候, params和query的方式是有区别的
// 无论是query还是params的方法, 使用对象的方式传递参数的时候, 都可以使用name属性, 但是如果使用path属性, 之能在query中, 不可能在params中
</script>

<style lang='less' rel='stylesheet/less' scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;
    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      .loginList {
        float: left;
        p {
          float: left;
          margin-right: 10px;
          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }
      .typeList {
        float: right;
        a {
          padding: 0 10px;
          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }
  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .logoArea {
      float: left;
      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }
    .searchArea {
      float: right;
      margin-top: 35px;
      .searchForm {
        overflow: hidden;
        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;
          &:focus {
            outline: none;
          }
        }
        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
