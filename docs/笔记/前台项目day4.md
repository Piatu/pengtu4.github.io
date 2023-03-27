前台项目第四天:
lodash、nprogress、swiper
一、swiper插件【轮播图、日历、分页三剑客】
二、$nextTick 
三、Home模块收尾


一、合并参数
合并TypeNav与Header全局组件的query与params参数



二、前端三剑客:轮播图、日历、分页---swiper插件！！！
官网:https://www.swiper.com.cn/
提示:swiper插件[JS库],PC端你可以使用、移动端也可以,经常开发轮播图功能。【angular、react、vue】




三、思考一个问题?

3.1组件mounted一定能获取到真实DOM节点?
A:对   B:不对





四、mock数据[模拟]

4.1项目起步流程?

技术部门:前端【web、iOS、安卓】   后台[Java、PHP、C++、scala]      产品经理      测试  
项目立项:[0-1],开完会。
前后端数据联调:前端与后台。

前端接下来干什么?
第一步:HTML + CSS 整上
第二步:vue-cli拆分静态组件
第三步:动态渲染服务器数据[没有接口：自己造一些假的接口,后台有真实接口替换、没有真实的接口mock数据也能照常上线]






4.2mock数据流程,它利用的是mockjs插件实现!!!
安装的时候没有js:cnpm install --save mockjs
第一步:src/mock,就是咱们创建mock数据地方。
第二步:找到JSON数据,豪哥给你们的vue全家桶的笔记里面。[JSON数据里面空格格式化一下]
第三步:public根目录【上线的根目录】,需要图片资源。
第四步：在入口文件引入MockServe.js一次【要不然这个文件都没有执行过,指定没有接口】
第五步：测试mock接口能否使用!!!
直接利用咱们以前的axios是获取不到的，因为咱们当年axios二次封装BASEURL:'/api'



五、开发首页轮播图的业务?

安装5版本的swiper


1:mock数据
2:S

