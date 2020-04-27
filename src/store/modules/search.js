import {
  reqProductList
} from '@/api'
// 状态数据
const state = {
  // 搜索到的商品数据列表对象
  productList: {}
}

const mutations = {
  // 直接修改状态数据
  RECEIVE_PRODUCT_LIST(state, productList) {
    state.productList = productList
  }
}

const actions = {
  async getProductList({
    commit
  }, searchParams) {
    const result = await reqProductList(searchParams)
    const {
      code,
      data
    } = result
    if (code === 200) {
      commit('RECEIVE_PRODUCT_LIST', data)
    }
  }
}

const getters = {
  // 品牌的列表数据
  trademarkList(state) {
    return state.productList.trademarkList
  },
  // 属性列表数据
  attrsList(state) {
    return state.productList.attrsList
  },
  // 商品列表数据
  goodsList(state) {
    return state.productList.goodsList
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}