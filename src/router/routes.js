const Home = () => import('@/pages/Home');
const Login = () => import('@/pages/Login');
const Register = () => import('@/pages/Register');
const Search = () => import('@/pages/Search');
const Detail = () => import('@/pages/Detail');
const AddCartSuccess =() =>import('@/pages/AddCartSuccess');
const shopCart = () => import('@/pages/ShopCart');
const Trade = () => import('@/pages/Trade');
const Center = () => import('@/pages/Center');
const Pay = () => import('@/pages/Pay');
const PaySuccess = () => import('@/pages/PaySuccess');
export default [
  {
    name: 'home',
    path: '/home',
    component: Home,
    //路由元信息,新学习的一个配置项!!!!给当前路由添加一些额外数据'它的右侧是一个对象[可以有多个键值对]
    //给home增加路由元后面通过路由元有无判断隐藏与显示
    meta: {
      isHiddenNav: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    //添加meta路由元信息，来添加自定义属性一些信息等
    meta: {
      //是否隐藏是的
      // meta: {show :true}
      isHiddenFooter: true
    }
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
    meta: {
      //是否隐藏是的
      isHiddenFooter: true
    }
  },
  {
    name: 'search',
    //?相于1个或0个
    //在注册路由的时候,如果这里占位，切记务必要传递params
    path: '/search/:keyword?',
    component: Search
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    name: 'detail',
    //此时路径通过路由跳转时拼接了id
    path: '/detail/:id',
    component: Detail,
    props: true //加入此行代码就会将之前插传入的params参数直接用props接收
  },
  {
    name: 'addCartsuccess',
    path: '/addCartSuccess',
    component: AddCartSuccess
  },
  //购物车页面
  {
    name: 'shopCart',
    path: '/shopCart',
    component: shopCart
  },
  {
    name: 'trade',
    path: '/trade',
    component: Trade
  },
  {
    name: 'pay',
    path: '/pay',
    component: Pay
  },
  {
    name: 'paysuccess',
    path: '/paysuccess',
    component: PaySuccess
  },
  {
    name: 'center',
    path: '/center',
    component: Center
  }
];
