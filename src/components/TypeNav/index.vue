<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 只有首页一开始左侧导航是显示的其他的一开始不显示的 -->
      <div class="nav-left" @mouseleave="handleMouseLeave">
        <!-- 鼠标移入全部商品分类会显示左侧导航栏 -->
        <!-- -商品分类的地方:虽然刚开始的时候商品分类结构在底部,调整到当前位置，但是页面结构没有太大的变化,因为老师们已经把样式搞定了- -->
        <h2 class="all" @mouseenter="isShowNav=true">全部商品分类</h2>
        <div class="sort" v-show="isShowNav">
          <div class="all-sort-list2" @click="btnSearch">
            <!-- 遍历循环一级导航 -->
            <div class="item" v-for="c1 in categoryList.slice(0,-1)" :key="c1.categoryId">
              <h3>
                <!-- 增加自定义属性data-开头 -->
                <a data-level="1" :data-id="c1.categoryId" :data-name="c1.categoryName">{{c1.categoryName}}</a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <!-- 循环遍历二级导航 -->
                  <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dt>
                      <a data-level="2" :data-id="c2.categoryId" :data-name="c2.categoryName">{{c2.categoryName}}</a>
                    </dt>
                    <dd>
                      <!-- 三级分类 -->
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a data-level="3" :data-id="c3.categoryId" :data-name="c3.categoryName">{{c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 利用辅助函数获取仓库state数据-- -> mapstate
import { mapState } from 'vuex';
export default {
  name: 'TypeNav',
  //增加一个data保证每个组件都是一个独立的数据源
  data() {
    return {
      //利用响应式属性,将来存储用户鼠标进入哪一个一级分类的索引值  currentIndex: ·-1,
      isShowNav: false
    };
  },
  mounted() {
    //发送请求，获取对应的数据
    // reqCategoryListData().then(
    //   result => console.log(result),
    //   error => console.log(error.message)
    // );
    //此时把发请求获取的数据已经存入到了state中
    //加模块化后数据就在home中了home/找
    // this.$store.dispatch('home/getCategoryListData');
    //判断显示与否
    //home有路由元且为真所以展示其它的就不展示
    if (this.$route.meta.isHiddenNav) {
      this.isShowNav = true;
    }
  },
  //获取数据用辅助函数
  computed: {
    ...mapState('home', ['categoryList'])
  },
  methods: {
    //点击a标签跳转
    btnSearch(event) {  
      //获取自定义属性
      const { id, level, name: categoryName } = event.target.dataset;
      //传递参数
      //增加判断排除点击空白跳转，让它只能点击a标签才跳转,无等级级返归
      if (!level) return;
      const { keyword } = this.$route.query;
      this.$router.push({
        name: 'search',
        query: {
          keyword,
          ['category' + level + 'Id']: id,
          categoryName
        }
      });
    },
    //鼠标移出全部商品这个按钮隐藏
    handleMouseLeave() {
      //如果没有路由元鼠标移出不展示
      if (!this.$route.meta.isHiddenNav) {
        this.isShowNav = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          //导航高亮
          &:hover {
            background-color: coral;
            cursor: pointer;
          }
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>