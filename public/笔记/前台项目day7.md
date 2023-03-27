前台项目第七天:
1:完成商品详情业务
2:放大镜业务
3:轮播图业务







思考一个问题:你们写项目的时候没有问题吗？
你有问题你就喊我呗?


复习:
1:商品属性搜索条件【子组件->父组件通信:自定义事件】
2:阿里图标库【一般都是用线上的样式】
3:分页器功能[独立设计出来]

一、完成商品详情的业务

1.1完成详情模块的路由的配置 + 静态组件的业务
---找到老师准备好的静态组件
---配置详情模块的路由 [把router/index.js,将路由配置项专门搞了一个文件routes.js]
---search模块跳转到详情模块,有个需求,滚动条应该在最上方!!



1.2滚动条的业务---出现在详情页最上方!!! [百度是程序员的好朋友]
A->B:在A路由跳转到B路由的时候,设置滚动条的位置【路由跳转与vue-router相关】！！！
 scrollBehavior


1.3看一下详情模块的静态组件的结构







二、动态展示详情数据

2.1VC组件通知Vuex发请求、仓库获取详情数据进行存储
请求地址:/api/item/{ skuId }  请求方式:GET请求   携带参数：商品的ID


2.2完成面包屑展示动态数据的业务?
下面是Vue抛出的一个警告:对于程序没有任何影响。【分析为啥有这个警告】
Error in render: "TypeError: Cannot read properties of undefined (reading 'category1Name')"


2.3完成展示商品名字、商品描述、价格等的部分，解决假的报错!!!




2.4完成商品的属性与属性值展示业务?
点击不同的属性值，点击谁，谁高亮? 排他操作







三、放大镜业务

3.1放大镜假报错的流程
let skuInfo = {};

1:获取skuImageList属性的属性值【本身服务器返回的是数组】
skuInfo.skuImageList[0] ->获取数组里面的元素，但是skuInfo.skuImageList并非数组 undfined[0]

2:skuInfo.skuImageList经过处理,至少是一个空数组    ---->[]

skuInfo.skuImageList[0],但是你获取到的不是对象【undefined】   skuInfo.skuImageList[0].imgUrl

 skuInfo.skuImageList[0]你需要保证前面代码至少是一个空对象。



 3.2鼠标位置。
 clientX|clinetY:鼠标可视区域位置
 pageX|pageY:获取鼠标在网页中位置
 offsetX|offsetY



 3.3完成放大镜底部的小图列表的展示?


 作业：明天休息?
 分页器
 今天的业务多写几遍

兴趣作业:Vue框架中实现富文本功能有哪些插件?
http://fex.baidu.com/ueditor/




1:放大镜业务
2:swiper展示多个slider
3:$bus兄弟组件通信
4:销售属性排他业务





