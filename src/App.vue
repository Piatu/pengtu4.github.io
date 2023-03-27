<template>
  <div>
    <Header />
    <!-- 路由组件出口的位置:不设置路由组件不知道在哪里显示 -->
    <router-view></router-view>
    <!-- 发现底部的Footer会随着路由的变化进行显示与隐藏 -->
    <!-- 添加判断有没有在路由中添加meta.isHiddrnFooter -->
    <!-- <Footer v-show="$route.path== ' /home'|| $route.path=='/search""></Footer> -->
    <Footer v-show="!$route.meta.isHiddenFooter" />
  </div>
</template>

<script>
import Footer from './components/Footer';
import Header from './components/Header';

export default {
  name: 'app',
  components: { Footer, Header },
  mounted() {
    //App.vue组件挂载一次，从而减少请求
    this.$store.dispatch('home/getCategoryListData');
  }
};
</script>

<style lang="less" scoped>
</style>