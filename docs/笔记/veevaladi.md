vee-validate 基本使用

第一步：插件安装与引入
cnpm i vee-validate@2 -save  安装的插件安装2版本的

import Vue from 'vue';
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'   // 引入中文 message
Vue.use(VeeValidate)

第二步：提示信息
VeeValidate.Validator.localize('zh_CN', {
messages: {
...zh_CN.messages,
is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
},
attributes: { // 给校验的 field 属性名映射中文名称
phone: '手机号',
code: '验证码',
password:'密码',
password1:'确认密码',
isCheck:'协议'
}
})

第三步：基本使用
<input
          placeholder="请输入你的手机号"
          v-model="phone"
          name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
<span class="error-msg">{{ errors.first("phone") }}</span>

const success = await this.$validator.validateAll(); //全部表单验证
//自定义校验规则
//定义协议必须打勾同意
VeeValidate.Validator.extend('agree', {
validate: value => {
return value
},
getMessage: field => field + '必须同意'
})





   //解构出参数
      const { phone, code, password, password1 } = this;
      //目前不做表单验证
      if (phone && code && password == password1) {
        //通知vuex发请求，进行用户的注册
        try {
          //注册成功
          await this.$store.dispatch("registerUser", { phone, code, password });
          //让用户跳转到登录页面进行登录
          this.$router.push('/login');
        } catch (error) {
          //注册失败
          alert(error.message);
        }
      }