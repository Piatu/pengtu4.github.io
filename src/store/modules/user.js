import { reqLogout, reqUserLogin } from '@/api';
const state = {
  userInfo: {
    name: window.localStorage.getItem('userName'),
    token: window.localStorage.getItem('token')
  }
};

const actions = {
  //登录
  async userLogin({ commit }, obj) {
    const result = await reqUserLogin(obj);
    //如果登录成功触发mutations将获取的登录名和密码出入本地存储中
    if (result.code === 200) {
      commit('SAVE_USER_INFO', result.data);
      window.localStorage.setItem('userName', result.data.name);
      window.localStorage.setItem('token', result.data.token);
    } else {
      console.log(result.message);
    }
  },
  //登出
  async userLogout({ commit }) {
    const result = await reqLogout();
    if (result.code === 200) {
      window.localStorage.removeItem('userName');
      window.localStorage.removeItem('token');
      commit('REMOVE_USER_INFO');
    } else {
      console.log(result.message);
    }
  }
};
const mutations = {
  SAVE_USER_INFO(state, payload) {
    state.userInfo = payload;
  },
  REMOVE_USER_INFO(state) {
    state.userInfo.name = '';
    state.userInfo.token = '';
  }
};
const getters = {};
export default {
  namespaced: true,
  mutations,
  state,
  actions,
  getters
};
