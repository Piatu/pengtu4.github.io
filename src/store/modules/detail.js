//所有的接口都在api中的index中
import { reqGoodDetailData } from '@/api';
const state = {
  goodDetailInfo: {}
};
const actions = {
  async getGoodDetailData({ commit }, skuid) {
    console.log(skuid);
    const result = await reqGoodDetailData(skuid);
    if (result.code === 200) {
      commit('storageDetail', result.data);
    } else {
      console.log(result.message);
    }
  }
};
const mutations = {
  storageDetail(state, goodDetailInfo) {
    state.goodDetailInfo = goodDetailInfo; //是个对象形式
  },
  //2.更改放大镜图片默认图片链接
  upDateImgUrl(state, imgUrl) {
    state.goodDetailInfo.skuInfo.skuDefaultImg=imgUrl
  }
};
//获取具体数据
const getters = {
  categoryView(state) {
    // 研究这个问题:
    // 起始状态:state.detailInfo起始状态空对象,空对象.categoryView->undefined
    // 当服务器数据回来之后state.detailInfo,并非空对象,获取的即为服务器返回的数据{7个K}
    // 但是v-for 遍历undefined是没有警告的
    return state.goodDetailInfo.categoryView || {};
  },  
  skuInfo(state) {
    return state.goodDetailInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.goodDetailInfo.spuSaleAttrList || {};
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
