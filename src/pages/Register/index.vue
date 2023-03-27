<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <ValidationObserver v-slot="{handleSubmit}">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider class="content" rules="phoneRequired|phoneNumber" v-slot="{ errors }" tag="div" mode="lazy">
            <label>手机号:</label>
            <input type="text" v-model="user.phone" placeholder="请输入你的手机号" />
            <span class="error-msg">{{errors[0]}}</span>
          </ValidationProvider>
          <ValidationProvider class="content" rules="codeRequired|codeNumber" v-slot="{ errors }" tag="div" mode="lazy">
            <label>验证码:</label>
            <input type="text" v-model="user.code" placeholder="请输入验证码" />
            <input type="button" value="获取验证码" style="width:100px;cursor:pointer;padding:0 4px;" @click="getVerifyCode">
            <span class="error-msg">{{errors[0]}}</span>
          </ValidationProvider>
          <ValidationProvider class="content" rules="passWordRequired|passWordNumber" v-slot="{ errors }" tag="div" name="passNum" mode="lazy">
            <label>登录密码:</label>
            <input type="text" v-model="user.password" placeholder="请输入你的登录密码" />
            <span class="error-msg">{{errors[0]}}</span>
          </ValidationProvider>
          <ValidationProvider rules="passWordRequired|passWordNumber|rePassNumber:@passNum" v-slot="{ errors }" tag="div" mode="lazy" class="content">
            <label>确认密码:</label>
            <input type="text" v-model="user.rePassNumber" placeholder="请输入确认密码" />
            <span class="error-msg">{{errors[0]}}</span>
          </ValidationProvider>
          <ValidationProvider tag="div" rules="agress" v-slot="{ errors }" mode="lazy" class="controls">
            <input name="m1" v-model="user.agress" type="checkbox" />
            <span>同意协议并注册《尚品汇用户协议》</span>
            <span class="error-msg">{{errors[0]}}</span>
          </ValidationProvider>
          <div class="btn">
            <button>完成注册</button>
          </div>
        </form>
      </ValidationObserver>

      <!-- 底部 -->
      <div class="copyright">
        <ul>
          <li>关于我们</li>
          <li>联系我们</li>
          <li>联系客服</li>
          <li>商家入驻</li>
          <li>营销中心</li>
          <li>手机尚品汇</li>
          <li>销售联盟</li>
          <li>尚品汇社区</li>
        </ul>
        <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
        <div class="beian">京ICP备19006430号
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { phoneNumderReg, codeNumberReg, passWordNumberReg } from '../../utils/reg';
import { reqVerifyCode, reqUserRegister } from '@/api';
//1.手机号不能为空
extend('phoneRequired', {
  ...required,
  message: '请输入手机号'
});
//2.手机验证信息
extend('phoneNumber', {
  validate(val) {
    return phoneNumderReg.test(val);
  },
  message: '手机号格式不正确'
});
//3.验证码非空规则
extend('codeRequired', {
  ...required,
  message: '请输入验证码'
});
//4.验证码规则
extend('codeNumber', {
  validate(val) {
    return codeNumberReg.test(val);
  },
  message: '验证码格式不正确'
});
//5.登录密码非空
extend('passWordRequired', {
  ...required,
  message: '请输入登录密码'
});
//6.登录密码规则
extend('passWordNumber', {
  validate(val) {
    return passWordNumberReg.test(val);
  },
  message: '登录密码格式不正确'
});
//7.确认登录密码
extend('rePassNumber', {
  validate(val, { passNum }) {
    // val表示要验证的数据
    return val === passNum;
  },
  message: '两次密码不一样',
  params: ['passNum']
});
//8.是否勾选了协议
extend('agress', {
  validate(value) {
    // val表示要验证的数据
    return value;
  },
  message: '请勾选用户协议'
});
export default {
  name: 'Register',
  components: {
    ValidationProvider,
    ValidationObserver,
    extend
  },
  data() {
    return {
      user: {
        phone: '',
        password: '',
        rePassword: '',
        code: '',
        isAgree: false
      }
    };
  },

  methods: {
    async getVerifyCode(e) {
      if (!this.user.phone) return alert('请先输入手机号码...');
      let num = 6;
      e.target.disabled = true; // 禁用按钮
      const timeId = setInterval(() => {
        num--;
        e.target.value = num + '秒后重发验证码';
        if (num === 0) {
          clearInterval(timeId);
          e.target.value = '获取验证码';
          e.target.disabled = false; // 恢复原样
          return; // 阻止继续向下执行
        }
      }, 1000);
      const result = await reqVerifyCode(this.user.phone);
      if (result.code === 200) {
        console.log('code', result);
        this.user.code = result.data;
      } else {
        console.log(result.message);
      }
    },
    //实现注册
    async onSubmit() {
      const result = await reqUserRegister(this.user);
      if (result.code === 200) {
        // console.log(result);
        // 跳转到登陆页面
        this.$router.push('/login');
      } else {
        console.log(result.message);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }
      .disabled {
        cursor: not-allowed;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>