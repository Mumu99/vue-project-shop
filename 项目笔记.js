/*
  1.
    脚手架3下载模版，测试打包，运行打包，干掉源码（自己写），可以设置浏览器是否自动打开
  2. 
    axios， vue-router， vuex， less，less-loader
  3. 目录的介绍
    api--> 存放ajax及接口
    components--> 普通组件
    mock--> 模拟后台数据
    pages--> 路由组件
    router--> 配置路由
    store--> vuex
    utils--> 缓存的操作
  4. 拆分组件并创建组件
    Header组件--> 顶部--> 普通组件
    Home组件----> 中间--> 路由组件
    Footer组件--> 底部--> 普通组件
    Login组件---> 登录--> 路由组件
    Register组件-> 注册-> 路由组件
    Search组件--> 搜索--> 商品列表--> 路由组件
  5. 在App中router-view, mian中routes
  6. 声明式路由跳转和编程式路由跳转, header
    登录和注册使用声明式路由跳转
    搜索按钮中使用编程式路由的跳转(bug)
      解决办法 
        在路由跳转的时候传入成功或者失败的回调, 或者调用catch方法内部传入空的回调
        在路由器对象中重写路由器的push和replace原型方法
        解决编程式路由跳转的bug, 统一解决
        const originPush = VueRouter.prototype.push
        形参默认值, 给成功的回调函数指定一个空函数
        VueRouter.prototype.push = function (location, onComplete = () => {}, onAbort) {
          return originPush.call(this, location, onComplete, onAbort)
        }
  7. 路由跳转进行传参
      路由器一旦注册后, 每个组件都会出现两个对象
      $router 路由器对象, 可以调用相关的方法实现编程式路由跳转
      $route 路由组件信息对象, 可以获取到参数
      编程式路由进行跳转并传入参数的时候, params和query的方式是有区别的
      无论是query还是params的方法, 使用对象的方式传递参数的时候, 都可以使用name属性, 但是如果使用path属性, 之能在query中, 不可能在params中
  8. 总结: 路由跳转及路由传参
      路由的跳转: 
        声明式路由跳转
          <router-link to="地址"></router-link>
          <router-view></router-view>
        编程式路由跳转
          $router.push('地址')
          $router.replcae('地址')
      编程式路由跳转传参
        字符串方法
          $router.push('地址/参数')--> params的方法(需要占位)
          $router.push('地址?参数')--> query的方法(不需要占位)
        对象的方法
          $router.push({name:'名字', params:{键: 值}})--> params的方式(需要占位和设置name)
          $router.push({path:'地址', query:{键: 值}})--> query的方式(不需要占位和设置name)
  9. 你们项目为什么使用vuex或者不用vuex
      1. 看老大
      2. 涉及到的状态数据比较多, 管理起来不是特别的方便, 而且多个组件之间要进行通信, 所以使用vuex可以解决这些问题
  10. Vuex中模块的操作, 及模块的命名
      vuex为什么使用模块化:  
        如果不进行模块化的操作, 最终state, mutaions, actions, getters, 每个对象中会出现大量的代码, 很臃肿, 维护起来不方便, 所以要进行vuex的模块化的操作
      模块的命名:
        根据功能命名
        组件的使用来命名
      vuex中模块文件怎么定以
        创建一个modules目录
      vuex模块化后, 出现的问题
        当前该文件还在引入state, mutations, actions, getters, 有什么用
        每个模块中的state, mutations, actions, getters这些都是子模块
        在store目录中的index.js文件中引入的state, mutations, actions, getters是总的
  11. TypeNav三级菜单列表默认是通过 :hover的方法切换子级菜单, 显示和隐藏display: block;
      此时鼠标进入到一级菜单后, 并没用真正的高亮显示效果(其他的功能)
      需求: 鼠标进入一级菜单后, 默认有高亮效果: 
        每个一级菜单都有索引, 定以一个表达式来存储索引, 只要一级菜单的索引值和自定义的表达式中的索引值相同, 此时当前的这个一级菜单就应用某个样式, 从而实现高亮显示效果
        自定义的表达式的值, 如何设置, 当鼠标进入到一级菜单后, 就设置自定义的表达式的值为当前的索引值, 鼠标离开后, 干掉这个自定义表达式中存储的索引值
  12. js的字符串推荐使用单引号
  13. 函数的节流和防抖(重要)
  14. 鼠标在一级菜单上切换, 出现了卡顿的问题
        多层v-for嵌套的同时
        内部生成了大量的路由链接
      每次鼠标快速移动菜单的时候, 不停的触发菜单的鼠标进入事件(减少事件的不必要的触发问题),函数的节流和防抖
  15. TypeNav组件中为了解决路由跳转及传参, 所有的三级分类菜单列表中出现了大量的router-link, 所以需要优化(内部是使用声明式路由跳转并携带参数)
      解决:
        编程式路由跳转携带参数(通过事件委托的方式)
  16. 控制一级分类列表只在首页显示(/ --> home), 其他页面隐藏
        在search内部引入当前组件
      必须要判断当前的路由地址(地址栏上的地址是不是 / )再决定是否显示
        TypeNav组件中的mounted中判断路径是否是 / 
      如何控制一级列表显示/隐藏, 通过v-if / v-show 显示
  17. ListContainer组件和Floor组件, 内部需要通过调用接口, 发送异步请求, 获取数据, 在组件内部动态显示数据操作
      在组件中调用接口--> 发送异步请求--> 获取数据, 显示到页面
      设计数据--> 调用接口--> 发送请求--> 显示到页面
         ^
         |
  数据存放在json文件中
  18. mock的使用
      yarn add mockjs
      调用mock相关的方法, 设定指定格式的接口, 如何准备好要响应回去的数据即可
  19. ListContainer组件内部在创建Swiper对象的时候, 页面中轮播图无法正常的使用
      原因:
        从Vuex中获取的轮播图数据, 动态的加载到页面上的时候, 先创建的swiper对象, 后显示轮播图, 然后就出现bug, 本身轮播图应该是先显示到页面中, 然后在创建Swiper对象, 这样就保证轮播图是正常的
        因为组件加载的时候, 发送异步请求, 此时数据还没响应回来, 但是页面已经显示了《 swiper对象在页面加载后的那一瞬间就创建完了
      解决:
        通过setTimeout()方法, 让创建swiper对象的时机晚一点, 等数据响应回来后在创建Swiper, 页面可以正常显示
      缺陷:
        如果网速慢的情况, 可能还是不正常
        最好的方法是, 数据响应回来的一瞬间就直接创建Swiper对象
      通过this.$nextTick()或者Vue.nextTick(), 讲回调延迟到下次DOM更新循环之后执行, 在修改数据之后立即使用它, 然后等待DOM更新
  20. 轮播图的结构和样式, 以及动态的数据--> 页面显示的轮播图效果在多个组件中使用, 可以把重复使用率比较高的内容, 抽取成一个组件(全局组件/高服用组件)

  21. Search组件内部需要的接口的参数的分析
      category1Id:  一级分类的id
      category2Id:  二级分类的id
      category3Id:  三级分类的id
      categoryName: 分类名字
      trademark:    品牌       值: "品牌id: 品牌名"--> "4:小米"
      order:        升序降序    值: "1: asc"--> 1--> 综合, 2--> 价格, asc--> 升序 
      pageNo:       当前第几页  数字值
      pageSize:     每页多少条数据 数字值
      keyword:      搜索关键字  在搜索框中输入的内容
      
                 ->  多个属性条件组成的数组, ['属性id: 属性值: 属性名字']
      props:  ---->   ['1: 1700-2799: 价格']          
 */