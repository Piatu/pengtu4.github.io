<template>
  <!--搜索选择器-->
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <ul class="logo-list">
          <!-- 遍历了品牌的图标，且给它增加一个点击事件给它点击能搜索商品事件中给它品牌数据为参让它知道点击当前的哪一个品牌的标签传了id与品牌名对应搜索 -->
          <li v-for="trademark in trademakList" :key="trademark.tmId" @click="handleTrademark(trademark)">{{trademark.tmName}}</li>
        </ul>
      </div>
    </div>
    <div class="type-wrap" v-for="attr in attrsList" :key="attr.attrId">
      <div class="fl key">{{attr.attrName}}</div>
      <div class="fl value">
        <ul class="type-list">
          <li v-for="attrValue in attr.attrValueList" :key="attrValue">
            <a @click="handleAttr(attr,attrValue)">{{attrValue}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
//从vuex获取品牌数据
import { mapGetters } from 'vuex';
export default {
  name: 'SearchSelector',
  computed: {
    //获取存在仓库中的数据
    ...mapGetters('search', ['trademakList', 'attrsList'])
  },
  //增加方法点击的搜索品牌就会出来对应的商品
  methods: {
    //传递品牌数据给父组件
    handleTrademark(trademark) {
      this.$emit('get-trademark', trademark);
    },
    //传递详细数据
   handleAttr(attr ,attrValue){
    this.$emit('get-attr',attr,attrValue);
   }
  }
};
</script>

<style lang="less" scoped>
.selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;

  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    .key {
      padding-bottom: 87px !important;
    }
  }

  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;

    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }

    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;

      .logo-list {
        li {
          float: left;
          border: 1px solid #e4e4e4;
          margin: -1px -1px 0 0;
          width: 105px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          color: #e1251b;
          font-style: italic;
          font-size: 14px;

          img {
            max-width: 100%;
            vertical-align: middle;
          }
        }
      }

      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;
          line-height: 26px;

          a {
            text-decoration: none;
            color: #666;
          }
        }
      }
    }

    .ext {
      position: absolute;
      top: 10px;
      right: 10px;

      .sui-btn {
        display: inline-block;
        padding: 2px 14px;
        box-sizing: border-box;
        margin-bottom: 0;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        padding: 0 10px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }

      a {
        color: #666;
      }
    }
  }
}
</style>