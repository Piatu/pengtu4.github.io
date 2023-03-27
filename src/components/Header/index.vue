<template>

  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="userInfo.name">
            你好,&nbsp;&nbsp;
             <span>{{userInfo.name}}</span>
             <button @click="logout">登出</button>
          <p v-else>
            <span>请</span>
            <!-- <a href="###">登录</a> -->
            <!-- 声明式导航,当然你也可以使用编程式导航,因为不管是那个导航，都可以实现路由跳转, -->
            <!-- 但是最后为什么选择声明式导航，没有任何业务、逻辑 -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <router-link to="/shopCart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo" title="尚品汇">
          <img src="./images/logo.png">
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <!-- 添加v-module收集input中的输入文字定义为关键字 -->
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <!-- 增加点击搜索按钮 -->
          <!-- 编程式导航:因为有业务 -->
          <button @click="btnSearch" class="sui-btn btn-xlarge btn-danger" type="button">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>


<script>
import {mapState}from 'vuex'
export default {
  //给组件起个名字，开发者工具中显示这个组件的时候，显示的就是这个名字
  name: 'Header',
  data() {
    return {
      //收集input数据的方法之一，其余：1.ref：打开ref-那到dom-拿到value；
      //2.event: 由于这里给button点击事件，不是给input绑定，所以用不上
      keyword: ''
    };
  },
  methods: {
    //传递event将它的定义的自定义属性的那些拿过来
    btnSearch(event) {
      //1.获取关键字
      let { query } = this.$route;
      // 传参
      this.$router.push({
        //路由名走search
        name: 'search',
        query: {
          ...query,
          keyword: this.keyword || undefined
        }
      });
    },
    //登出
    logout(){
      this.$store.dispatch("user/userLogout")
    }
  },
  mounted() {
    this.$bus.$on('remove-keyword', () => {
      //清空搜索框内的数据
      this.keyword = '';
    });
  },
  beforeDestroy() {
    //$off解绑
    this.$bus.$off('remove-keyword');
  },
  computed:{
   ...mapState('user',['userInfo'])
  }
};
</script>

<style lang='less' scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>