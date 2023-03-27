<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cartInfo in cartInfoList" :key="cartInfo.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="!!cartInfo.isChecked" @change="checkCartInfo(cartInfo)">
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{cartInfo.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cartInfo.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeSkuNum('decrement',cartInfo)">-</a>
            <input autocomplete="off" type="text" :value="cartInfo.skuNum" minnum="1" @change="changeSkuNum('change',cartInfo,$event)" class="itxt">
            <a href="javascript:void(0)" class="plus" @click="changeSkuNum('increment',cartInfo)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartInfo.skuPrice*cartInfo.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <!-- 点击删除按钮显示弹框 -->
            <a href="javascript:;" class="sindelet" @click="showDialogByOneInfo(cartInfo.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="checkAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="showDialogBySelectd">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{selectedCount}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{selecteMoney}}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
    <!-- 使用Dialog弹框 -->
    <!-- 传递了visible -->
    <Dialog :visible.sync="visible">
      <template v-slot:header>
        提示
      </template>
      <template>
        <p>你真的要删除<span style="color:red">{{isDelOne?"这条":"这些选中的"}}</span>数据</p>
      </template>
      <template #footer>
        <div class="btn-footer">
          <!-- 点击取消弹框消失 -->
          <button class="btn" @click="visible=false">取消</button>
          <!-- 这个确定即包括点击删除一条数据也包含点击批量删除 ，下面发送请求有-->
          <button class="btn primary" @click="deleteShopCart">确认</button>

        </div>

      </template>
    </Dialog>
  </div>

</template>

<script>
import { reqshopCart, reqDeletOnShop, reqDeletAllShop, reqAddUpdateCart } from '@/api';
import { reqcheckShopCartInfo, reqAllChangeState } from '@/api';
import Dialog from '../../components/Dialog';
import { skuNumReg } from '../../utils/reg';
export default {
  name: 'ShopCart',
  components: { Dialog },
  data() {
    return {
      cartInfoList: [],
      //给visible初始值
      visible: false,
      //点击删除按钮把id传入设置id的初始值为空
      skuId: 0,
      isDelOne: false,
      //批量删除的id收集初始值
      skuIdList: [],
      //剩余未删除的商品
      leaveCartInfoList: [],
      timeId:'',
      num:0
    };
  },
  async mounted() {
    const result = await reqshopCart();
    if (result.code === 200) {
      console.log(result);
      this.cartInfoList = result.data[0].cartInfoList;
    } else {
      console.log(result.message);
    }
  },
  methods: {
    //checkCartInfo这是绑定input自定义事件
    async checkCartInfo(cartInfo) {
      let isChecked = 1 - cartInfo.isChecked;
      const result = await reqcheckShopCartInfo(cartInfo.skuId, isChecked);
      //更新服务器数据成功后，重新更新页面
      cartInfo.isChecked = isChecked;
    },
    // 2. 删除出弹框一条购物车商品
    // delOneCartInfo(cartInfo) {
    showDialogByOneInfo(skuId) {
      // 在这个函数当中要做的事有:
      // 2.1 弹出对话框
      this.visible = true;
      // 2.2 收集要删除商品的skuId
      this.skuId = skuId;
      //2.3判断是删除一天商品
      this.isDelOne = true;
    },

    // //删除一条数据
    async deleteOne() {
      if (this.isDelOne) {
        const result = await reqDeletOnShop(this.skuId);
        if (result.code === 200) {
          this.visible = false;
          this.cartInfoList = this.cartInfoList.filter(cartInfo => cartInfo.skuId !== this.skuId);
        } else {
          console.log(result.message);
        }
        return;
      }
    },
    //点击批量删除出弹框
    showDialogBySelectd() {
      this.leaveCartInfoList = [];
      //1.弹出对话框
      this.visible = true;
      //2.收集被选中的商品的id
      this.cartInfoList.forEach(cartInfo => {
        //遍历所有选中或没选中的选择框
        //将选中的id存入skuIdList
        if (cartInfo.isChecked) {
          this.skuIdList.push(cartInfo.skuId);
        } else {
          this.leaveCartInfoList.push(cartInfo);
        }
      });
      //3.区分批量删除
      this.isDelOne = false;
    },
    //真正的批量删除数据,与单条数据删除
    async deleteShopCart() {
      if (this.isDelOne) {
        const result = await reqDeletOnShop(this.skuId);
        if (result.code === 200) {
          this.visible = false;
          this.cartInfoList = this.cartInfoList.filter(cartInfo => cartInfo.skuId !== this.skuId);
        } else {
          console.log(result.message);
        }
        return;
      }
      const result = await reqDeletAllShop(this.skuIdList);
      if (result.code === 200) {
        this.visible = false;
        this.cartInfoList = this.leaveCartInfoList;
      } else {
        console.log(result.message);
      }
    },
    // $event能获取输入框的内容
    async changeSkuNum(type, cartInfo, $event) {
      let num = 0;
      let { skuId,skuNum } = cartInfo;
      switch (type) {
        case 'increment':
          this.num++
          cartInfo.skuNum++
          if (cartInfo.skuNum >200) {
            cartInfo.skuNum=200;
            this.num=0;
          }
          break;
        case 'decrement':
          //减操作
          this.num--
          cartInfo.skuNum--
          if (cartInfo.skuNum <1) {
            cartInfo.skuNum=1;
           this.num=0;
          }
          break;
        case 'change':
          let newSkuNum = $event.target.value;
          let oldNum=cartInfo.skuNum
          if (skuNumReg.test(newSkuNum)) {
            //发给服务器的是你新的数量减原先没点击添加的数量，因为服务器之前存的是你的旧数据
            //加上差值就是正确的数据
            this.num = newSkuNum - cartInfo.skuNum;
            cartInfo.skuNum = newSkuNum;
            if (newSkuNum > 200) {
              this.num = 200 - oldNum;
              cartInfo.skuNum = 200;
            }
          } else {
            // cartInfo.skuNum = 1;
            e.target.value = oldNum;
          }
          break;
      }
      //增加防抖,用增加定时器的方法
      if(this.timeId) clearTimeout(this.timeId)
      this.timeId=setTimeout(async()=>{
         //购物车中没有数据
      if (this.num ===0) return;
      const result = await reqAddUpdateCart(skuId, num);
     if(result.code===200){
      this.num=0
      console.log('更改数据成功...')
     }else{
      console.log('更改数据失败...')
     }

     },500)

    
    }
  },
  //对全选做处理
  computed: {
    checkAll: {
      get() {
        //判断一开始传递过来的值是否全部被选中
        return this.cartInfoList.every(cartInfo => cartInfo.isChecked === 1);
      },
      async set(val) {
        //定义数组来存储所有要更新状态的商品skuId
        const skuIdList = [];
        let isChecked = val ? 1 : 0;
        this.cartInfoList.forEach(item => {
          item.isChecked = isChecked;
          skuIdList.push(item.skuId);
          // //去发请求以条条更新
          // this.checkCartInfo({skuId:cartInfo.skuId,isChecked:1-isChecked})
        });
        //批量更新状态
        const result = await reqAllChangeState(isChecked, skuIdList);
        if (result.code === 200) {
          alert('更新成功..');
        } else {
          console.log('更新失败...');
        }
      }
    },
    //已经选中商品的个数
    selectedCount() {
      return this.cartInfoList.reduce((prev, current) => prev + current.isChecked, 0);
    },
    //统计总金额
    selecteMoney() {
      return this.cartInfoList.reduce((prev, current) => prev + current.isChecked * current.skuPrice * current.skuNum, 0);
    }
  },
  watch: {
    visible: {
      immediate: true, //一开始就立即监视
      handler() {
        //加判断, document.documentElemen获取html
        if (this.visible) {
          document.documentElement.style.overflow = 'hidden';
        } else {
          document.documentElement.style.overflow = 'auto';
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }
  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;
      & > div {
        float: left;
      }
      .cart-th1 {
        width: 25%;
        input {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
      .cart-th2 {
        width: 25%;
      }
      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }
    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;
      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        & > li {
          float: left;
        }
        .cart-list-con1 {
          width: 15%;
        }
        .cart-list-con2 {
          width: 35%;
          img {
            width: 82px;
            height: 82px;
            float: left;
          }
          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }
        .cart-list-con5 {
          width: 17%;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }
  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>