//1.引入依赖项
import store from '@/store';
import Vue from 'vue';
import VueRouter from 'vue-router';
//2.注册组件
Vue.use(VueRouter);
//1.原型上修改push方法
//1.1将先前的存储到一个变量中
const originPush = VueRouter.prototype.push;
//1.2同样将replace也存入
const originReplae = VueRouter.prototype.replace;
//1.3修改VueRouter原型上的push用于解决重复跳转时报错的问题
(VueRouter.prototype.push = function (location, okCallBack, errCallBack) {
  if (okCallBack === undefined && errCallBack === undefined) {
    //1.4上面的判断成立的话，表示没有传递这两个参数
    originPush.call(this, location).catch(() => {});
  } else {
    originPush.call(this, location, okCallBack, errCallBack);
  }
}),
  (VueRouter.prototype.replace = function (location, okCallBack, errCallBack) {
    if (okCallBack === undefined && errCallBack === undefined) {
      //1.4上面的判断成立的话，表示没有传递这两个参数
      originReplae.call(this, location).catch(() => {});
    } else {
      originReplae.call(this, location, okCallBack, errCallBack);
    }
  });
//3.配置路由,注销的这部分剪切到单独文件中去了
// import Home from '../pages/Home';
// import Login from '../pages/Login';
// import Register from '../pages/Register';
// import Search from '../pages/Search';
// import Detail from '../pages/Detail'
import routes from './routes';
const router = new VueRouter({
  //浏览器访问方式
  mode: 'history',
  routes,
  //解决跳转详情页的时候页面会在底部,在vue文档中
  scrollBehavior(to, from, savedPosition) {
    //如果在页面起始位置就返回起始位
    if (savedPosition) {
      return savedPosition;
    } else {
      //否则让它到左上角
      return { x: 0, y: 0 };
    }
  }
  // routes: [
  //   {
  //     name: 'home',
  //     path: '/home',
  //     component: Home,
  //     //给home增加路由元后面通过路由元有无判断隐藏与显示
  //     meta: {
  //       isHiddenNav: true
  //     }
  //   },
  //   {
  //     name: 'login',
  //     path: '/login',
  //     component: Login,
  //     //添加meta路由元信息，来添加自定义属性一些信息等
  //     meta: {
  //       //是否隐藏是的
  //       isHiddenFooter: true
  //     }
  //   },
  //   {
  //     name: 'register',
  //     path: '/register',
  //     component: Register,
  //     meta: {
  //       //是否隐藏是的
  //       isHiddenFooter: true
  //     }
  //   },
  //   {
  //     name: 'search',
  //     //?相于1个或0个
  //     path: '/search/:keyword?',
  //     component: Search
  //   },
  //   {
  //     path: '/',
  //     redirect: '/home'
  //   },
  //   {
  //     name: 'detail',
  //     path: '/detail/:id',
  //     component:Detail
  //   }
  // ]
});
//路由守卫让一些没有登录的界面不允许查看
const whiteList = [
  //这些是可以看得
  'home',
  'login',
  'register',
  'detail',
  'addCartsuccess',
  'shopcart'
];
//定义路由去全局导航守卫
router.beforeEach((to, from, next) => {
  //如果有用户名密码或token就可以进入登录的页面
  if (whiteList.includes(to.name) || store.state.user.userInfo.token) {
    next();
    return;
  }
  //否则跳转到登录界面
  next({
    name: 'login',
    query: {
      redirect: to.path
    }
  });
});
export default router;
