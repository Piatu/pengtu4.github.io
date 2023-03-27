<template>
  <div class="outer">
    <!-- 三级分类导航 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑导航-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <span href="#">全部结果</span>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 左侧导航的面包屑 -->
            <li class="with-x" v-show="searchParams.categoryName">{{searchParams.categoryName}}
              <!-- 面包屑小叉叉增加点击删除的事件 -->
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-show="trademarkName">{{trademarkName}}
              <i @click="removeTrademark">×</i>
            </li>
            <!-- 详情面包屑如内存等等 -->
            <li class="with-x" v-for="(prop,index) in searchParams.props" :key="prop">
              {{prop}}
              <!-- 根据下标移除 -->
              <i @click="removeProp(index)">×</i>
            </li>
            <!-- 在搜索框内搜索点击跳转增加面包屑 -->
            <li class="with-x" v-show="searchParams.keyword">{{searchParams.keyword}}
              <!-- 给搜索关键字叉叉加事件 -->
              <i @click="removeKeyword">×</i>
            </li>
          </ul>
        </div>

        <!-- 搜索器 -->
        <!-- 给搜索页面组件增加自定义事件，给它写上对应的方法来接受搜索页面传递的参数并发请求以获取单击搜索出现对应的商品 -->
        <SearchSelector @get-trademark='saveTrademark' @get-attr="saveAtrrVaule" />

        <!--商品展示区-->
        <div class="details clearfix">
          <!-- 列表操作区 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 判断是否高亮 -->
                <!-- 当它默认为1综合要高亮，所以isPrice不为2为false在active那取反为true -->
                 <li :class="{active:!isPrice}" @click="changeOrder(1)">
                  <!-- 当默认值传递的为asc就为下箭头，否则dec的为下箭头 -->
                  <a>综合<span class="iconfont":class="{'icon-shangfan':isUp,'icon-xiafan':!isUp}"></span></a>
                </li>
                <!-- 价格为不取反 -->
                  <li :class="{active:isPrice}" @click="changeOrder(2)">
                  <a>价格<span class="iconfont":class="{'icon-shangfan':isUp,'icon-xiafan':!isUp}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 此时路由跳转，给它了/detail和它的id也拼接上了因为每个图片都有id通过good.id去出来传过去 -->
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/detail/${good.id}`" :title="good.title">{{good.title}}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- 直接在组件绑数据和传递 -->
          <Pagination :total="total" :pageSize="searchParams.pageSize" :continues="5" :pageNo="searchParams.pageNo" :changePageNo="getPageNo"></Pagination>
          <!-- <div class="fr page"> -->
          <!-- <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div> -->
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector';
import { mapActions, mapGetters } from 'vuex';
import './fontlcon/iconfont.css';
export default {
  name: 'Search',
  components: {
    SearchSelector
  },
  data() {
    return {
      searchParams: {
        category1Id: '', //一级分类id
        category2Id: '', //二级分类的id
        category3Id: '', //三级分类id
        categoryName: '', //分类的名称
        keyword: '', //关键词
        props: [], //商品属性
        //必需要给品牌初始占位
        trademark: '', //商品品牌
        order: '1:asc', //排序规则  1是代表综合，2代表价格，此时给一个默认值为1为综合，asc为升序，dec为降序，这些标准都是后端给的文档规定的
        pageNo: 1, //页码
        pageSize: 10 //每页的数量显示
      }
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(newValue) {
        //  1. 先将原来的那些categoryId设置为undefined 因为路由对象会忽略值为undefined的参数
        Object.assign(this.searchParams, {
          category1Id: undefined,
          category2Id: undefined,
          category3Id: undefined,
          categoryName: undefined,
          keyword: undefined
        });
        //2.接受传递过来的参数
        let { query, params } = newValue;
        //3.重新处理一下参数
        Object.assign(this.searchParams, query, params);
        //4.调ajax请求
        this.$store.dispatch('search/getSearchListData', this.searchParams);
      }
    }
  },
  computed: {
    ...mapGetters('search', ['goodsList', 'total']),
    //因为trademark中有id去掉它就留名存入 trademarkName,.split(':')[1]截取到：留下第2项
    trademarkName() {
      const { trademark } = this.searchParams;
      // 当从主页面进入是品牌为点击为空所以要做判断让它为空
      return trademark ? trademark.split(':')[1] : '';
    },
    //详情面包屑名
    props() {
      this.searchParams.props.map(item => {
        const [id, attrName, attrValue] = item.split(':');
        return `${attrName}:${attrValue}`;
      });
    },
    //判断是价格亮还是综合亮
    isPrice() {
      return this.searchParams.order.split(":")[0]==='2';
    },
    //判断箭头是朝上还是下
    isUp(){
      return this.searchParams.order.split(":")[1]==="asc"
    }
  },
  methods: {
    ...mapActions('search', ['getSearchListData']),
    //移除的是左导航的面包屑叉叉
    removeCategoryName() {
      //单击了删除按钮后后台走的逻辑
      //keyword的这是留下了关键字
      const { keyword } = this.$route.params;
      //路由变了自动发请求
      this.$router.push({
        name: 'search',
        params: { keyword }
      });
    },
    //移除关键字
    removeKeyword() {
      //留下左导航的
      const { query } = this.$route;
      this.$router.push({
        name: 'search',
        query: {
          ...query,
          keyword: undefined
        }
      });
      //触发事件清空文本框
      this.$bus.$emit('remove-keyword');
    },
    //保存searchSelector传递过来的trademark
    saveTrademark(trademark) {
      //结构赋值
      const { tmId, tmName } = trademark;
      //反引后的传品牌id与名时接口文档定义的
      this.searchParams.trademark = `${tmId}:${tmName}`;
      //第一种调用，必需要用辅助函数映射后在调，因为搜索后获取了商品信息所以要重新发送信息
      this.getSearchListData(this.searchParams);
      //第二中调用
      // this.$store.dispatch('search/getSearchListData', this.searchParams);
    },
    //移除面包屑品牌名称
    removeTrademark(trademark) {
      this.searchParams.trademark = undefined;
      this.getSearchListData(this.searchParams);
    },
    //添加详细属性参数
    saveAtrrVaule(attr, attrValue) {
      const { props } = this.searchParams;
      const prop = `${attr.attrName}
      :${attrValue}`;
      if (!props.includes(prop)) {
        props.push(prop);
        this.getSearchListData(this.searchParams);
      }
    },
    //移除面包屑详细数据
    removeProp(index) {
      //到searchparam中删除一项
      this.searchParams.props.splice(index, 1);
      this.getSearchListData(this.searchParams);
    },
    //点击页码获取新数据
    getPageNo(pageNo) {
      //将传递过来的页码值，重新赋值给searchParams.pageNo
      this.searchParams.pageNo = pageNo;
      //根据新页码重新发送ajax请求
      this.getSearchListData(this.searchParams);
    },
    //点击changeOrder让它传递你给定的综合与价格中的1或2就知道你点击的是那个按钮,让它高亮
    changeOrder(newNum){
      //当单击对应项的时候，其实相当于有两件事情需要解决
      //1.判断当前项是否高亮，如果有则变换升序或者降序
      //2.如果当前项没有高亮，则要有高亮
     //将获取点击传入的值，用：分割存入oldNum，oldType
     const[oldNum,oldType]=this.searchParams.order.split(":")
     //判断传入的值oldNum与点击接受的值newNum是否相同
     //当传入的值与接受的值一样就代表点击的是同一个按钮是，只需要改变箭头的方向
     if(newNum==oldNum){
         this.searchParams.order=`${oldNum}:${oldType==='asc'?'desc':'asc'}`
     }else{
      //将新值拼接上同时也需要要将箭头的方向改变
      this.searchParams.order=`${newNum}:'asc'`
     }
     //重新发送请求
     this.getSearchListData(this.searchParams);
    
    }
    
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

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
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>