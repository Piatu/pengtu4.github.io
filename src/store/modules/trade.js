import { reqUerAddressList, reqTradeInfoData } from '@/api';
const state = {
  userAddressList: [],
  tradeInfo: {}
};
const actions = {
  //1.获取用户的收获地址
  async getUserAddressList() {
    const result = await reqUerAddressList();
    if (result.conde === 200) {
      commit('SAVE_USER_ADDRESS_LIST', result.data);
    } else {
      console.log(result.message);
    }
  },
  //获取订单的商品数据
  async getTradeInfoData({ commit }) {
    const result = await reqTradeInfoData();
    if (result.code === 200) {
      commit('SAVE_TRADE_INFO_DATA', result.data);
    } else {
      console.log(result.message);
    }
  }
};
const mutations = {
  //1.存储用户地址列表
  SAVE_USER_ADDRESS_LIST(state, addressList) {
    state.userAddressList = addressList;
  },
  //2.存储商品数据
  SAVE_TRADE_INFO_DATA(state, tradeInfo) {
    state.tradeInfo = tradeInfo;
  }
};
const getters = {
  // 商品列表
  detailArrayList(state) {
    return state.tradeInfo.detailArrayList
  },
  // 商品总金额
  originalTotalAmount() {
    return state.tradeInfo.originalTotalAmount
  },
  // 实付金额
  totalAmount() {
    return state.tradeInfo.totalAmount
  },
  // 商品数量
  totalNum() {
    return state.tradeInfo.totalNum
  },
  // 订单编号
  tradeNo() {
    return state.tradeInfo.tradeNo
  },
  //返现
  // activityReduceAmount() {
  //   return state.tradeInfo. activityReduceAmount
  // }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
