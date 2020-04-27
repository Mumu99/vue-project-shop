<template>
  <div class="swiper-container" id="ListSwiper" ref="listSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carouser in carouserlList" :key="carouser.id">
        <img :src="carouser.imgUrl" alt />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入swiper
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: {
    carouserlList: Array
  },
  watch: {
    // 回调函数会将在观察(data observer)开始后立即被调用
    carouserlList: {
      handler () {
        // watch执行了四次, 导致swiper对象被创建四次
        // 优化watch内部代码执行次数
        // 如果没有传入carouselList就执行return出去
        if (this.carouserlList.length === 0) return
        this.$nextTick(() => {
          new Swiper(this.$refs.listSwiper, {
            loop: true, // 循环模式选项
            autoplay: {
              delay: 2000, // 时间
              disableOnInteraction: false // 控制点击后继续播放
            },

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
          })
        })
      },
      immediate: true
    }

    // carouserlList () {
    //   console.log('watch')
    //   this.$nextTick(() => {
    //     new Swiper(this.$refs.listSwiper, {
    //       loop: true, // 循环模式选项
    //       autoplay: {
    //         delay: 2000, // 时间
    //         disableOnInteraction: false // 控制点击后继续播放
    //       },

    //       // 如果需要分页器
    //       pagination: {
    //         el: '.swiper-pagination',
    //         clickable: true,
    //       },

    //       // 如果需要前进后退按钮
    //       navigation: {
    //         nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev',
    //       }
    //     })
    //   })
    // }
  },
  // 页面加载后的声明周期
  mounted () {
    // 当前组件创建了, 此时必然会执行mounted生命周期的回调
    /**
     * mounted执行了三次, 因为在ListContainer组件的内部使用过一次当前组件, 该组件会创建, 该组件肯定会执行一次, 然后在Floor组件内部也使用过一次当前的组件, 也肯定会创建一个当前组件, 也会执行一次, 但是Floor组件在Home组件中, 通过循环遍历的方式, 产生了两次的Floor组件, 所以, 最终Floor组件通过遍历的方法, 导致了当前组件创建了两次
     * 
     * 大轮播图有四个数据, 楼层中的轮播图有三个数据
     * 明确mounted回调函数是怎么回事(内部的代码只能是在页面加载后才会执行的)? 
     * 明确该回调中的代码会执行几次(从组件的创建和组件的销毁只会执行一次)?
     * 
     * ListContainer组件中, Carousel组件是如何创建的?
     * 一开始ListContainer中使用的Carousel组件, 内部通过carouseList="banners"传入了数据, banners有没有数据都不会影响该组件的创建, 一开始banners是否有数据? banners是没有数据的, Carousel组件还是正常的创建, 此时banners还在异步请求的路上, 或者响应回来的路上, 但是Carousel组件已经开始创建了, 一旦创建了, 那么就会进入到Carousel的mounted生命周期回调中, 此时该组件接受传入进来的数据就是0.
     * 此时banners传入到Carousel组件的内部, 通过props接受了, 存储到了caruselList数组中, 但是没有数据, 没有数据, 那么轮播图为什么可以正常的显示出来？？？
     * 一开始组件创建, 没有数据 数据为0, 此时在发送异步请求, 组件被创建出来了, 数据也响应回来了, 那么组件中carouselList的数据发生了变化, 一旦变化了, 就会进入到watch中, 然后数据变化, 界面更新, Swiper被创建了, 大轮播图就能正常运作了
     * 
     * Floor组件中, Carousel组件是如何创建的?
     * Floor组件是在Home组件中使用的, 但是Floor组件的创建和该组件中使用的v-for指令关系很大
     * Floor组件中的v-for指令中的floors这个数据是一个数组, 数组有数据, v-for才能遍历, 才能创建Floor组件
     * floors是数组, 该数组的数据是从一开始就有的吗?--> 没有, 因为Home组件中的内容在加载完成只后, 才会发送异步请求, 获取floors数据, 该数据存在了, 此时才创建Floor组件, 创建的时候, floors数据被传入到Floor组件内部, 那么Floor组件内部使用了Carousel组件, 并传入的数据是存在的, 也就是意味着Carousel组件创建的时候, 轮播图的数据已经存在了, 此时进入到mounted回调的时候, 内部是可以拿到轮播图的数据的, 一共是两次, 一次是三个数据, mounted内部的代码已经执行完毕了, 而且数据没有再次更新了, 界面也就不会变化了(页面不会被重新渲染了)
     * 此时有数据, 为什么轮播图不能正常的显示???
     * 一开始组件没有创建, 没有数据, 后来有数据了, 组件才会被创建, 组件创建出来的时候, 数据已经存在了, 此时异步请求的数据已经回来了, 才会创建组件, 当组件出现在页面的时候, 数据没有再变化过, 既然没有变化, 就不会执行watch的代码, 既然代码没有被执行, 那么Swiper也不会被创建, 所以楼层中的轮播图无效
     * 
     * 结论:
     *  mounted确实执行了三次, 数据为0、3、3, watch就执行一次
     * 解决办法:
     *   让watch监视的时候, 立刻执行当前的回调
     * 
     * watch只执行一次, watch什么时候执行的??? 
     * 通过分析watch中的代码应该执行三次, 因为该组件被创建了三次, 数据也传入了三次, 只要数据变化, 最少也会执行三次, 但是结果有一次, 说明数据就变化了一次
     */
    // 第一次进入到mounted的时候0个数据, 第二次和三次进来mounted的时候3个数据
  }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
.swiper-button-prev,
.swiper-button-next {
  width: 50px;
  height: 75px;
  color: #ccc;
}
.swiper-button-prev {
  left: 0;
}
.swiper-button-next {
  right: 0;
}
.swiper-button-prev:hover,
.swiper-button-next:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
