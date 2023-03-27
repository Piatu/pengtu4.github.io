import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import TypeNav from './components/TypeNav';
import Paginnation from './components/Pagination';
import VueLazyload from 'vue-lazyload';
import load from '@/assets/aa.gif'

//出过错
import '../src/mockServer';
import 'swiper/css/swiper.min.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
//因为TypeNa，在很多地方都用到了，如search注册为全局组件TypeNav.name读取组件名
Vue.component(TypeNav.name, TypeNav);
//分页器注册为全局组件
Vue.component(Paginnation.name, Paginnation);
Vue.use(ElementUI);
Vue.use(VueLazyload, {
  loading:load
})
new Vue({
  render: h => h(App),
  //下面代码作用:给项目添加路由功能,给全部VC实例身上拥有两个属性,$router|$route
  router,
  //添加全局事件总线,这拿到绑定事件如@click其他的在全局事件中心就能拿到
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  //2.注册仓库
  store
}).$mount('#app');
