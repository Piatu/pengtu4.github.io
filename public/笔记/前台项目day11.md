账号:
13810270001
13810270002
13810270003
13810270004
13810270005
13810270006
13810270007
13810270008
13810270009
13810270010

密码:111111


一、今天项目重点
1:登录、注册业务
2:交易模块
3:element-ui组件库使用
4:展示二维码



一、登录、注册复习

1.1token什么时候会出现?

当用户登录成功以后,服务器通过响应返回的【字符串】,用户身份凭证，凭证它是有效期有限的！！！

1.2token在项目中经常干什么?
token在项目中经常使用方向,获取用户信息【用户名、头像等等】

1.3token过期改如何操作?---高频的面试题
销毁token、重新让用户登录获取新的令牌！！！


二、导航守卫!!!vue-router提供的
导航:表示路由正在发生改变. A-B|B-C|D-F
守卫:符合条件,放行.不符合条件，别想访问！！！
导航守卫分类三大类:全局守卫、路由独享守卫、组件内守卫！！
全局守卫:当项目中任意的路由发生变化，全局守卫都会触发。
全局前置守卫:
router.beforeEach((to,from,next)){

})
//全局后置守卫
router.afterEach((to, from) => {

})



三、整个前台项目用户身份凭证?
身份凭证：token为大?
游客身份：购物车里面的东西,不能进行支付的,如果用户有了正式账号,游客身份商品转移到正式的用户账号上面。UUID
正式用户身份:游客身份里面买的东西！！！ TOKEN





四、开发交易页面!!![用户是登录状态，进入交易页面]
4.1配置交易页面路由
4.2获取用户地址信息  
/api/user/userAddress/auth/findUserAddressList  GET
4.3默认地址切换 ，排他操作

4.4获取商品清单的数据---用户购物车的数据【将来你要支付的商品信息】
/api/order/auth/trade   GET请求


4.5提交订单

地址: /api/order/auth/submitOrder?tradeNo={tradeNo}   POST

{
    "consignee": "admin",//收件人姓名
    "consigneeTel": "15011111111",//收件人的电话
    "deliveryAddress": "北京市昌平区2",//收件人的地址
    "paymentWay": "ONLINE",//支付方式   在线方式
    "orderComment": "xxx",//买家留言
    "orderDetailList": []//购物车商品的数据
}
 



 五、element-ui组件库?
 当年你们学习过React框架中的一个UI组件库，ant!!!

Vue框架中也有类似的UI组件库:比较出名element-ui、iview等等 PC端的UI组件库。
Vue移动端经常用的UI组件库:vant

官网地址:https://element.eleme.cn/#/zh-CN       最新版本2.15.7【版本不同,写法是不一样的】


5.1element-ui基本使用

完整引入形式
第一步:安装element-ui插件！！！！

第二步:完整引入  [vue-helper:VSCODE插件]
main.js文件
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
Vue.use(ElementUI);
new Vue({
  el: '#app',
  render: h => h(App)
});
第三步:el-row|el-col,栅格系统,响应式布局!!!!



5.2按需引入

第一步：先安装element-ui组件库
第二步:cnpm install babel-plugin-component -D
第三步:修改babel.config.js文件 [配置项发生变化：重启项目]
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}








