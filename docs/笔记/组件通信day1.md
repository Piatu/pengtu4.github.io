作业
1:登录、注册的业务重新搞一遍
2:分页器重新封装一遍
3:购物车

今天课程重点:
1:前台项目收尾工作
2:组件通信手段

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

一、用户登录以后判断?
例如 1:用户的登录什么都没有买,在地址栏输入 trade，访问交易页面！！！不正常
例如 2:用户的登录什么都没有买,在地址栏输入 pay，访问支付页面！！！不正常
例如 3:用户的登录什么都没有买,在地址栏输入 paysuccess，访问支付成功页面！！！不正常

导航守卫:全局导航守卫、路由独享守卫、组件内守卫！！！

1:全局导航守卫:工作当中常用的。只要有路由发生变化,全局守卫就可以检测到，进行判断！！！
全局前置守卫
router.beforeEach
全局后置守卫
router.afterEach

2:路由独享守卫?不怎么常用
路由独享守卫:这种守卫只是负责某一个路由!!!
beforeEnter

第一:用户登录比如访问交易页面，最基本要保证是从购物车而来！！！
第二:用户登录想访问支付页面，最基本的是从交易页而来！！！
第二:用户登录想访问支付成功页面，最基本的是从支付页面而来！！！

3:组件内守卫?不怎么常用
组件内守卫：它的功能与路由独享守卫是一样的，也是负责某一个路由！！！只不过书写地方不同而已。
beforeRouteEnter
beforeRouteUpdate
beforeRouteLeave

导航守卫三种:全局守卫【大家共用保镖 2】、路由独享守卫【私人保镖 1】、组件内守卫【私人保镖 3】
工作当中：常用的是全局守卫
路由独享守卫:1 beforeEnter
全局守卫:2 beforeEach【更重要】、afterEach **\*\***
组件内守卫:3 beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave

二、路由懒加载?

2.1 面试题问题:在开发项目的时候，项目性能优化手段你了解哪些?
v-if|v-show 指令选择,选择 v-show 好一些
按需引入
防抖与节流
请求次数约束
路由懒加载

2.2 路由懒加载?
npm run build 项目上线打包的时候:webpack 会按照 import 依赖关系进行一次打包
打包的时候.map【文件对于项目上线没有任何用:项目上线的时候，在控制台给打印提示信息】
{
path: '/home',
name: 'erha',
component:()=>import('@/pages/home'),
//路由元信息,新学习的一个配置项!!!!给当前路由添加一些额外数据
//它的右侧是一个对象[可以有多个键值对]
//路由配置项：书写的时候不要胡写、乱写、瞎写【在 VC 组件身上获取不到,没有任何意义】
meta: { show: true },
}

2.3 图片懒加载- vue-lazyload 插件!!!!
服务器的数据没有回来之前【是没有图片】，但是用不能让他啥都看不到。先整一个 loading 展示一张图片。
当服务器的数据回来之后，图片在替换！！！

2.4表单验证插件-了解即可!!!!vee-validate。这个插件费力不讨好！！！
vee-validate:需要了解一下.
表单验证：一定在项目当中会出现的。市场当中表单验证插件有很多，主流的element-UI表单验证!!!

使用步骤:3|4版本不好用.

第一步安装插件: cnpm i vee-validate@2 -save
第二步:在utils文件夹里面创建了validate.js->使用表单验证插件【可以书写在main,不建议】

第三步:安装插件
import VeeValidate from 'vee-validate'
import Vue from 'vue';
import zh_CN from 'vee-validate/dist/locale/zh_CN' //这个插件提供中文提示文件
Vue.use(VeeValidate)

第四步:配置需要表单验证字段
VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
    },
    attributes: { // 给校验的 field 属性名映射中文名称
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password1: '确认密码',
        agree: '协议'
    }
})

第五步:开始使用这个插件进行表单验证！！！！

v-validate="{ required: true, regex: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ }"
