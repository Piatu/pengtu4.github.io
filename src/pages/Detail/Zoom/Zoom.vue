<template>
  <div class="spec-preview">
    <img :src="skuInfo.skuDefaultImg" />
    <!-- 给大框增加一个鼠标移动事件，然后让蒙版跟着鼠标移动 -->
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <!-- 蒙版走大图走 -->
      <img :src="skuInfo.skuDefaultImg" :style="{left:-2*left+'px',top:-2*top+'px'}" />
    </div>
    <!-- 蒙版，将获取的鼠标位置给蒙版,:style给蒙版绑定样式 -->
    <div class="mask" :style="{left:left+'px',top:top+'px'}"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {debounce} from 'lodash'
export default {
  name: 'Zoom',
  computed: {
    ...mapGetters('detail', ['skuInfo'])
  },
  data(){
    return {
      left:0,
      top:0
    }
  },
  methods: {
    //鼠标移动event大框的位置event.offsetX为鼠标水平移动位置offsetY为垂直位置
     // 100这个数值是mask这个盒子的宽度或是高度的一半 因为要让鼠标在mask的中心点
    move:debounce(
     function (event) {
      // console.log(event)
      //100梦蒙版的框=宽
      let x = event.offsetX - 100;
      //卡住左右
      if (x < 0) x = 0;
      if (x > 200) x = 200;
      let y = event.offsetY - 100;
      //卡住上下
      if (y < 0) y = 0;
      if (y > 200) y = 200;
      //将它判断好的x,y给鼠标
      this.left = x;
      this.top = y;
    },1000/60
     
    )
  },
  mounted(){
    this.$bus.$on('get-image',imgUrl=>{
      this.skuInfo.skuDefaultImg=imgUrl
    })
  }
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>