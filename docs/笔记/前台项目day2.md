一、今天课程重点。
完成部分首页业务

二、小复习

1、配置路由 vue-router@3
export default new VueRouter({
      //配置路由的模式
      mode:'hash',
      routes:[
        {
             path:'/home',
             component:Home,
             //命名路由：后台管理系统项目
             name:'home',
             //给路由组件传递props
             props:true,
             //路由元信息
             meta:{a:1,b:2},
             redirect:'xxx',
             children:[]
        }

    ]
});

2、路由面试
2.1路由传递参数params可传递|不传递?
2.2路由组件能否传递props?

三、Home路由组件业务?
第一步:home路由组件里面静态结构 + CSS样式【less】
第二步：Home路由组件拆分子组件!!!
拆分组件的时候:HTML + LESS + 图片资源 。缺一不可。
注意1:商品分类组件，在首页、搜索页、详情页都会被使用到。把他拆分为全局组件即可。！
第三步:找服务器要数据【后台提供活的数据】，项目永远展示静态数据!!!

四、axios二次封装?
面试题:工作中是否封装过axios，封装axios作用?

axios二次封装，目的利用axios请求、响应拦截器，比如请求拦截器可以通过请求头携带给服务器公共参数,
比如响应拦截器，可以简化服务器返回的数据等等.

4.1测试一下axios二次封装是否OK;【解决代理服务器跨域问题】
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭eslint
  lintOnSave: false,
  //让浏览器自动打开
  devServer: {
    //设置本地服务器打开的域名
    host: '127.0.0.1',
    //设置本地服务器打开端口号
    port: 8080,
    proxy: {
       ///api:请求路径当中需要携带/api,代理服务器才会工作
      '/api': {
        target: 'http://39.98.123.211',
        // pathRewrite: { '^/api': '' }, 因为咱们学校真实服务器路径当中携带/api,因此不能重写/api
      },
    },
  }
})

4.2添加进度条业务?
利用的是nprogress插件，实现进度条的业务。

五、接口统一管理!!!!

第一个问题：项目组件很多,获取商品分类的数据，在很多组件里面都使用的?
比如服务器更新:接口地址更新！！！

第二问：1000个组件，都是获取商品分类这个数据。1000个组件书写代码？
//出现复用代码->封装
import requests from '@/api/requests'
export default {
  name: "TypeNav",
  mounted(){
    //项目本地服务器:8080
    //获取学校这台服务器的数据:http://39.98.123.211
    //因此需要解决代理跨域
    //底下的代码测试axios二次封装能不能ok
     requests.get('/product/getBaseCategoryList').then(res=>{
        console.log(res);
     });
  }
};

六、仓库的配置?

上午主要做的事情:

第一:把home模块相应的子组件拆分完毕
第二:axios进行二次封装【服务器代理跨域】
第三:统一接口进行管理

6.1vuex目前有几个核心概念?

state = {a:1,b:2};//存储数据VC共享数据地方

mutations={};//唯一可以修改仓库数据地方

actions = {};//可以书写业务逻辑【if、异步语句】

getters = {};//计算属性

modules = {};//仓库进行模块式开发

6.2vuex仓库进行模块式开发-modules?

小仓库仓库：A B C  D
state
mutaions
actions
getters

七、展示商品分类的数据?

将vuex,计数器案例。基础讲解的案例写法
state = {
  count:1
}
//数组里面放置的是state对象的K
...mapState(['count'])

项目中的state

state = {
   detail:{},
   home:{
      category:[],
   },
   search:{},
   user:{}
}

//数组的写法
...mapState([''])

八、一级分类高亮效果!!!
第一种做法:纯纯CSS hover解决!!! 工作时候以实现功能为主.
第二种做法:JS.学习阶段【学习套路】

九、思考的世间?

第一：vuex存储数据是持久化吗? 电脑关机、网页关闭数据还有！！
本地存储

第二:路由组件A->B?

A路由组件会被销毁的
