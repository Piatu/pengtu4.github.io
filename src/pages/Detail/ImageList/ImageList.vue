<template>
  <div class="swiper-container skuImg-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(skuImg,index) in skuInfo.skuImageList" :key="skuImg.id"@click="hanlerImgUrl(skuImg.imgUrl)" >
        <!-- 点击小图将小图的地址给大图就能实现点小图显示到大图 -->
        <!-- active绑定判断是否是当前点击的小图图片是高亮 -->
        <img :src="skuImg.imgUrl" :class="{active:skuImg.imgUrl===skuInfo.skuDefaultImg}">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'ImageList',
  computed: {
    ...mapGetters('detail', ['skuInfo'])
  },
  watch: {
    skuInfo() {
      this.$nextTick(() => {
        var mySwiper = new Swiper('.skuImg-container', {
          slidesPerView: 'auto', // 显示几张图片
          spaceBetween: 100, // 两张图片之间的间距

          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        });
      });
    }
  },
  methods: {
    ...mapMutations('detail', ['upDateImgUrl']),

    hanlerImgUrl(imgUrl) {
      // 调用mutations中的方法
      // 当不涉及异步操作的时候，可以直接操作mutaions中的方法
      //本质将小图的地址给到大图，state的值只能mutation修改
      this.upDateImgUrl(imgUrl);
    }

    //  hanlerImgUrl(index,imgUrl){
    //   this.current = index
    //   this.$router.$emit('get-img',imgUrl)
    //  }
  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>