今天课程重点:
第一、继续开发Home首页模块
第二、函数的防抖与节流*****


一、复习
1.1对于axios进行二次封装?
axios项目当中经常会进行二次封装,封装目的即为利用人家请求、响应拦截器的功能。
注意:代理跨域写法 【路径需不需要重写】

1.2vuex集中式管理状态插件?
vuex核心概念:
state =>仓库存储数据的地方
mutations=>唯一可以修改仓库数据地方
actions=>可以书写业务、逻辑地方
getters=>仓库计算属性
modules=>仓库实现模块式开发



二、实现首页商品分类三级联动高亮效果?
老师忠告:将来进入公司写项目,以功能为主【不管利用什么手段,把功能搞定即可】

2.1比如:首页商品分类(一级分类)鼠标进入高亮效果。最简单操作完成，纯纯的样式搞定即可->hover


2.2学习阶段,利用JS实现!!!
现在这种写法:很像当年JS基础学习for训话
let currentIndex = 6;
for(let index = 0 ; index<17;i++){
    if(currentIndex==index){
        console.log('给当前元素添加类名')
    }
}


三、完成二级、三级分类动态展示数据业务?
通过动态的行内样式解决显示与隐藏业务



四、思考的问题?
第一次：用户慢慢的从0-16触发鼠标进入事件。控制台打印【处理业务：0-16】
第二次:用户快速从0-16【图书、运动健康】,正常说【控制台打印:处理业务0-16】。
但是发现控制台打印的并非想要结果。
为什么会出现这种现象那?因为用户操作过快,浏览器没有反应过来。
假如事件的回调里面有大量业务，可能会出现业务丢失(也有卡顿现象);


4.1函数的防抖与节流*****
当前的技术点:与Vue框架没有任何关系。函数的防抖与节流这门技术，面试的时候经常问题，写项目时候确实经常用。

防抖[debounce]:前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发只会执行一次

节流[throttle]:在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
小提示:尝试一下自己用原生JS实现防抖与节流
4.2首页商品分类三级联动,lodash节流



五、home模块与search模块使用商品分类TypeNav业务?

5.1Home模块与Search模块商品分类显示与隐藏业务?
通过$route.path区分路由解决
问题:  商品分类在首页,打开展示即可。【没有显示|隐藏业务】
      商品分类在search,显示与隐藏业务【过渡动画】


5.2TypeNav商品分类在Search模块一些问题?

问题:商品分类(来自于仓库的数据),当在search模块当中刷新的时候数据消失了?
第一种解决方案:Home、Search模块都通知vuex向服务器要数据【仓库存储数据】

最优秀的解决方案:App根组件完成、入口文件都可以！！！




六、路由跳转与传递参数--商品分类?
一级分类:携带的参数,一级分类的名字(categoryName),一级分类的id(category1Id)
categoryName=电脑办公&category1Id=6


二级分类:携带的参数,二级分类的名字(categoryName),二级分类的id(category2Id)
categoryName=音像&category2Id=2

三级分类:携带的参数,三级分类的名字(categoryName),三级分类的id(category3Id)
categoryName=励志&category3Id=13

6.1路由跳转的方式?
声明式导航->卡顿现象
解决从Home->Search:没有任何业务、没有任何逻辑，最终选择的是声明式导航【携带参数也能看到】
用户鼠标移动的时候会卡顿?
router-link:Vuex提供的组件，组件VueComponent构造函数。底层new这个类的时候,实例过多导致卡顿，消耗内存！！！
编程式导航解决:


一级分类a
this.$router.push({name:'search',query:{categoryName:'xxxx',category1Id:'xxxx'}})

二级分类a
this.$router.push({name:'search',query:{categoryName:'xxxx',category2Id:'xxxx'}})

三级分类a
this.$router.push({name:'search',query:{categoryName:'xxxx',category3Id:'xxxx'}})




一、实现首页商品分类三级联动高亮效果
二、完成二级、三级分类动态展示数据业务
三、函数的防抖与节流
四、Home与Search模块下,商品分类状态切换
五、TypeNav商品分类编程式导航路由跳转[dataset]






























































































