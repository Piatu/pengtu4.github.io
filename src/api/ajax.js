//1.引入axios模块
import axios from 'axios';
//7.引入进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
//引入UUID
import { getUserTempId } from '@/utils/getUserTempId';
import store from '@/store'
//2.创建axios实例对象，以后整个项目都用这个实例发送请求
const ajax = axios.create({
  baseURL: '/api',
  timeout: 5000
});
//3.设置请求拦截器
ajax.interceptors.request.use(config => {
  //启用进度条
  NProgress.start();
  //在请求头中增加上UUID
  config.headers.userTempId = getUserTempId();
  const token=store.state.user.userInfo.token
  if (token) {
  config.headers.token=token
    
  }
  return config;
});

//5.设置响应拦截
ajax.interceptors.response.use(
  response => {
    //结束进度条
    NProgress.done();
    return response.data;
  },
  error => {
    //结束进度条
    NProgress.done();
    return Promise.reject(new Error(error.message));
  }
);
//6.导出对象
export default ajax;
