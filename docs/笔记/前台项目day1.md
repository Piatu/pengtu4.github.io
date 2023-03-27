1:将来工作了,公司一般会给你一台新的电脑!【mac】
程序员:开发项目需要安装哪些东西
谷歌浏览器 + vscode + node[npm->cnpm] + git + vue-cli + 开发者工具

项目地址:http://82.156.11.187/#/home

2:小忠告!!!
项目阶段:
1:解决bug能力----出现bug截图
2:基础(让你回首复习知识点切记要复习)
3:项目阶段不在与基础一样的。每天老师书写代码你们要书写三遍以上！！！



三、利用vue-cli脚手架工具创建项目大框!!!!
创建脚手架项目指令：vue create 项目名字【都是英文的】

node_modules:项目依赖的地方
public:放置静态资源地方【静态页面】,public文件夹里面静态资源，原封不动打包到dist里面。
src:程序员源代码区域
        assets文件夹:也是放置静态资源的地方,webpack打包的时候，这里面的静态资源会当中webpack模块，打包js文件里面。
        components:一般放置非路由组件。components文件夹里面一般放置【全局组件】
        .....
        vue.config.js:配置代理跨域。


四、脚手架一些其他的配置?
4.1浏览器自动打开
package.json文件  
 "scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
}

vue.config.js文件
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //让浏览器自动打开
  devServer:{
    //设置本地服务器打开的域名
     host:'127.0.0.1',
     //设置本地服务器打开端口号
     port:8080,
  }
})

4.2eslint校验工具务必关闭!!!
组件起名字的时候，还是可以按照以前习惯书写【首字母大写，只需要一个单词】



五、项目分析
项目分析：
首页、搜索、登录、注册:需要四个路由组件【4个K,对应4个V】
头部、底部全局组件:
头部全局组件,首页、搜索、登录、注册
底部全局组件,在首页、搜索页中出现，登录、注册是没有底部组件！！！
总结:需要2个全局组件、4个路由组件

5.1以后开发项目的时候,把你项目中的全局组件，放到components文件夹里面
辉洪老师: HTML +  样式 + 图片
样式采用的是less样式，但是别忘记安装插件：cnpm install --save less less-loader


六、配置路由vue-router@3  务必手写下来






七、解决Footer全局组件的显示与隐藏的业务?
Footer全局组件:首页、搜索显示
Footer全局组件:登录、注册隐藏
元素|组件，显示或者隐藏，v-if|v-show|动态行内样式


第一种解决方案:通过VC组件实例$route属性里面path数值，监测K的变化，达到Footer显现与隐藏的切换!!!!【不采用】

第二种解决方案:路由元信息meta配置项!!!!
meta称之为路由元信息:右侧一般需要对象


八、路由传递参数?*********

8.1Vue框架实现路由的跳转有几种手段?

第一种:声明式导航链接.router-link全局组件(务必书写to)
第二种:编程式导航【VC.$router.push|replace】方法实现
区别:
router-link  ->HTML
push|replace -> JS  编程式导航可以额外的进行业务逻辑判断!!!!


8.2vue-router进行路由跳转传递参数，有几种形式?
params参数：算路径当中一部分，query参数不算路径当中一部分
query参数: http://localhost:8080/#/home?a=1&b=2   
params参数:http://localhost:8080/#/home/1/2

第一种传递query参数
  this.$router.push({path: ' /search ' ,query : {keyword:this.keyword}}):
第二种传递params参数[一定要注意,面试的时候经常问]
  this.$router.push({name : 'search ' , params : {keyword:this.keyword}})
//第三种传递query+params
this.$router.push({name: 'search',params: {fkeyword:this.keyword} , query: {keyword:'ABC'}})




九、路由相关面试题!!!******


问题:你写项目的时候,经常路由传递参数[query|params],如何实现params参数可传可不传?
http://82.156.11.187/#/search/华为  ---->search路由传递params参数
http://82.156.11.187/#/search?categoryName=手机&category3Id=61 ---->search携带query参数

问题:如何实现一个路由传参,params可以传递|不传递?
//下面含义:代表占位params参数可以传递|或者不传递
path: '/search/:keyword?',



问题2:你们写项目的时候,应该玩过params参数可以传递|不传递套路?如果传递params参数是空串怎么处理怎么处理!!!!
传递params参数:123
http://localhost:8080/#/search/123
传递params参数为:''
http://localhost:8080/#/search/
答:利用未定义undefined解决此类问题!!!!





问题3:如何实现路由组件传递props?
props:父子组件通信。
<App>
    <TodoHeader :todo="todo"></TodoHeader>
</App>
可以实现:在配置路由的时候,通过配置项props实现！！！
有三种写法:
props:布尔值[会把当前params参数作为props数值传递给路由组件]
props:对象写法[会把当前对象KV,作为props数值传递给路由组件]
props:箭头函数[一般箭头函数返回对象，对象KV作为props传递给路由组件]



十：重写push与replace方法?

注意:声明式导航router-link是没有这类问题。

小问题:[编程式导航],进行路由传递参数的时候,如果参数相同，点击第二次的时候，会出现警告!!!
Avoided redundant navigation to current location 【警告:对于程序没有任何影响】

你进行两次路由传递参数：而且参数相同,它认为你第二次操作没必要。【小警告】


由于vue-router@3从三版本以后,引入promise技术。


























