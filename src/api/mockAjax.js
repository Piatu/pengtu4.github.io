//1.引入axios模块
import axios from 'axios';
//7.引入进度条
import NProgress from 'nprogress';
//2.创建axios实例对象，以后整个项目都用这个实例发送请求
const mockAjax = axios.create({
  baseURL: '/mock',
  timeout: 1000
});
//3.设置请求拦截器
mockAjax.interceptors.request.use(config => {
  //启用进度条
  NProgress.start();
  return config;
});

//5.设置响应拦截
mockAjax.interceptors.response.use(
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
export default mockAjax;
