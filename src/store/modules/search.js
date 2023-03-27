import { reqCateSearchListData } from '@/api';
const state = {
  goodsInfo: {}
};
const actions = {
  //根据参数获取搜索数据
  async getSearchListData({ commit }, searchParams) {
    //请求
    const result = await reqCateSearchListData(searchParams);
    //判断请求发送是否成功
    if (result.code === 200) {
      commit('storageSearch', result.data);
    } else {
      console.log(result.message);
    }
  }
};
const mutations = {
  //1，存储搜索到的数据
  storageSearch(state, goodsInfo) {
    state.goodsInfo = goodsInfo;
  }
};
//2.相当于vuex的计算属性
const getters = {
  // 1. 属性列表
  attrsList(state) {
    return state.goodsInfo.attrsList;
  },
  // 2. 商品列表
  goodsList(state) {
    return state.goodsInfo.goodsList;
  },
  // 3. 商品品牌列表
  trademakList(state) {
    return state.goodsInfo.trademarkList;
  },
  //4.商品总数量
  total(state) {
    return state.goodsInfo.total;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
