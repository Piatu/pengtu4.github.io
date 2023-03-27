//1.引入模块
import { reqCategoryListData, reqCateBannerListData, reqGetFloorsListData } from '@/api';
// import { reqCateBannerListData } from '@/api';
//3.定义state等
const state = {
  //5.定义个方法获取侧边栏的数据将它存入到state中
  categoryList: [],
  //轮播图数据
  bannerList: [],
  //获取楼层数据
  floorsList: []
};
//6.获取三级分路由数据
const actions = {
  //在action写逻辑到对应的获取数据页面进行dispatch调用它触发mounation
  async getCategoryListData(context) {
    //reqCategoryListData调用接口获取数据存入result中
    const result = await reqCategoryListData();
    //判断获取的数据是否成功
    if (result.code === 200) {
      //如果成功，则提交给mutations中的方法
      context.commit('storage', result);
    } else {
      console.log(result.message);
    }
  },
  //发送轮播图ajax
  async getCateBannerListData(context) {
    //reqCategoryListData调用接口获取数据存入result中

    const result = await reqCateBannerListData();
    //判断获取的数据是否成功
    // console.log(result);
    if (result.code === 200) {
      //如果成功，则提交给mutations中的方法
      context.commit('storageList', result);
    } else {
      console.log(result.message);
    }
  },
  //获取楼层数据
  async getFloorsListData({ commit }) {
    const result = await reqGetFloorsListData();
    if (result.code === 200) {
      commit('storageFoolr', result);
    }
  }
};

const mutations = {
  //将获取的数据存入state中
  storage(state, payload) {
    //将获取的数据payload中的categoryList存入state中
    state.categoryList = payload.data;
  },
  //获取轮播图数据
  storageList(state, payload) {
    //将获取的数据payload中的categoryList存入state中
    state.bannerList = payload.data;
    // console.log(state.categoryList);
  },
  //获取楼层的数据
  storageFoolr(state, payload) {
    state.floorsList = payload.data;
  }
};
const getters = {};
export default {
  //分了模块就要加命名空间
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
