// //1.引入模块
// import { reqCategoryListData } from '@/api';
import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';
import user from './modules/user';
//将search的ajax请求及获取的数据引入仓库
import search from './modules/search';
import detail from './modules/detail';
import trade from './modules/trade'
//2.注册插件
Vue.use(Vuex);
// //3.定义state等
const state = {
  //5.定义个方法获取侧边栏的数据将它存入到state中
  // categoryList: []
};
//6.获取三级分路由数据
const actions = {};
const mutations = {};
const getters = {};

//4.创建store实例
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: { home, search, detail,user,trade}
});
