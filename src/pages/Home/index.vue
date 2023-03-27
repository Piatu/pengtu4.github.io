<template>
  <div>
    <!-- 三级导航分类 -->
    <!-- Type已经注册为全局组件就可以直接使用 -->
    <TypeNav />
    <!-- 中间轮播图+右边区域 -->
    <ListContainer />
    <Recommend />
    <Link />
    <Rank />
    <Like />
    <!-- 对组件进行遍历循环生成 -->
    <!--floor in floorsList从floorsList遍历到floor 但必须要给一个key唯一值 :floor='floor'动态绑定floor数据从json中 -->
    <Floor v-for="floor in floorsList" :key="floor.id" :floor="floor" :cname="'floor-swiper'+floor.id"></Floor>
    <Brand />
  </div>
</template>

<script>
import ListContainer from './ListContainer';
// import TypeNav from '../../components/TypeNav';
import Brand from './Brand';
import Like from './Like';
import Floor from './Floor';
import Rank from './Rank';
import Recommend from './Recommend';
//因为楼层是有两个所以就把它们放置在home组件
//home组件一挂载，就分发一个获取楼层数据actions因为home决定要生成几个floor
import { mapState } from 'vuex';
export default {
  name: 'Home',
  components: { ListContainer, Brand, Like, Floor, Rank, Recommend },
  mounted() {
    //获取楼层数据
    this.$store.dispatch('home/getFloorsListData');
  },
  //数据从仓库映射
  computed: {
    ...mapState('home', ['floorsList'])
  }
};
</script>

<style>
</style>