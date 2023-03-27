"use strict";(self["webpackChunkthree"]=self["webpackChunkthree"]||[]).push([[337],{5337:function(a,s,t){t.r(s),t.d(s,{default:function(){return g}});var e=function(){var a=this,s=a._self._c;return s("div",{staticClass:"outer"},[s("TypeNav"),s("div",{staticClass:"main"},[s("div",{staticClass:"py-container"},[s("div",{staticClass:"bread"},[a._m(0),s("ul",{staticClass:"fl sui-tag"},[s("li",{directives:[{name:"show",rawName:"v-show",value:a.searchParams.categoryName,expression:"searchParams.categoryName"}],staticClass:"with-x"},[a._v(a._s(a.searchParams.categoryName)+" "),s("i",{on:{click:a.removeCategoryName}},[a._v("×")])]),s("li",{directives:[{name:"show",rawName:"v-show",value:a.trademarkName,expression:"trademarkName"}],staticClass:"with-x"},[a._v(a._s(a.trademarkName)+" "),s("i",{on:{click:a.removeTrademark}},[a._v("×")])]),a._l(a.searchParams.props,(function(t,e){return s("li",{key:t,staticClass:"with-x"},[a._v(" "+a._s(t)+" "),s("i",{on:{click:function(s){return a.removeProp(e)}}},[a._v("×")])])})),s("li",{directives:[{name:"show",rawName:"v-show",value:a.searchParams.keyword,expression:"searchParams.keyword"}],staticClass:"with-x"},[a._v(a._s(a.searchParams.keyword)+" "),s("i",{on:{click:a.removeKeyword}},[a._v("×")])])],2)]),s("SearchSelector",{on:{"get-trademark":a.saveTrademark,"get-attr":a.saveAtrrVaule}}),s("div",{staticClass:"details clearfix"},[s("div",{staticClass:"sui-navbar"},[s("div",{staticClass:"navbar-inner filter"},[s("ul",{staticClass:"sui-nav"},[s("li",{class:{active:!a.isPrice},on:{click:function(s){return a.changeOrder(1)}}},[s("a",[a._v("综合"),s("span",{staticClass:"iconfont",class:{"icon-shangfan":a.isUp,"icon-xiafan":!a.isUp}})])]),s("li",{class:{active:a.isPrice},on:{click:function(s){return a.changeOrder(2)}}},[s("a",[a._v("价格"),s("span",{staticClass:"iconfont",class:{"icon-shangfan":a.isUp,"icon-xiafan":!a.isUp}})])])])])]),s("div",{staticClass:"goods-list"},[s("ul",{staticClass:"yui3-g"},a._l(a.goodsList,(function(t){return s("li",{key:t.id,staticClass:"yui3-u-1-5"},[s("div",{staticClass:"list-wrap"},[s("div",{staticClass:"p-img"},[s("router-link",{attrs:{to:`/detail/${t.id}`}},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.defaultImg,expression:"good.defaultImg"}]})])],1),s("div",{staticClass:"price"},[s("strong",[s("em",[a._v("¥")]),s("i",[a._v(a._s(t.price))])])]),s("div",{staticClass:"attr"},[s("router-link",{attrs:{to:`/detail/${t.id}`,title:t.title}},[a._v(a._s(t.title))])],1),a._m(1,!0),a._m(2,!0)])])})),0)]),s("Pagination",{attrs:{total:a.total,pageSize:a.searchParams.pageSize,continues:5,pageNo:a.searchParams.pageNo,changePageNo:a.getPageNo}})],1)],1)])],1)},r=[function(){var a=this,s=a._self._c;return s("ul",{staticClass:"fl sui-breadcrumb"},[s("li",[s("span",{attrs:{href:"#"}},[a._v("全部结果")])])])},function(){var a=this,s=a._self._c;return s("div",{staticClass:"commit"},[s("i",{staticClass:"command"},[a._v("已有"),s("span",[a._v("2000")]),a._v("人评价")])])},function(){var a=this,s=a._self._c;return s("div",{staticClass:"operate"},[s("a",{staticClass:"sui-btn btn-bordered btn-danger",attrs:{href:"success-cart.html",target:"_blank"}},[a._v("加入购物车")]),s("a",{staticClass:"sui-btn btn-bordered",attrs:{href:"javascript:void(0);"}},[a._v("收藏")])])}],i=function(){var a=this,s=a._self._c;return s("div",{staticClass:"clearfix selector"},[s("div",{staticClass:"type-wrap logo"},[s("div",{staticClass:"fl key brand"},[a._v("品牌")]),s("div",{staticClass:"value logos"},[s("ul",{staticClass:"logo-list"},a._l(a.trademakList,(function(t){return s("li",{key:t.tmId,on:{click:function(s){return a.handleTrademark(t)}}},[a._v(a._s(t.tmName))])})),0)])]),a._l(a.attrsList,(function(t){return s("div",{key:t.attrId,staticClass:"type-wrap"},[s("div",{staticClass:"fl key"},[a._v(a._s(t.attrName))]),s("div",{staticClass:"fl value"},[s("ul",{staticClass:"type-list"},a._l(t.attrValueList,(function(e){return s("li",{key:e},[s("a",{on:{click:function(s){return a.handleAttr(t,e)}}},[a._v(a._s(e))])])})),0)])])}))],2)},c=[],o=t(3822),n={name:"SearchSelector",computed:{...(0,o.Se)("search",["trademakList","attrsList"])},methods:{handleTrademark(a){this.$emit("get-trademark",a)},handleAttr(a,s){this.$emit("get-attr",a,s)}}},l=n,h=t(3736),d=(0,h.Z)(l,i,c,!1,null,"b84a5050",null),m=d.exports,u={name:"Search",components:{SearchSelector:m},data(){return{searchParams:{category1Id:"",category2Id:"",category3Id:"",categoryName:"",keyword:"",props:[],trademark:"",order:"1:asc",pageNo:1,pageSize:10}}},watch:{$route:{immediate:!0,handler(a){Object.assign(this.searchParams,{category1Id:void 0,category2Id:void 0,category3Id:void 0,categoryName:void 0,keyword:void 0});let{query:s,params:t}=a;Object.assign(this.searchParams,s,t),this.$store.dispatch("search/getSearchListData",this.searchParams)}}},computed:{...(0,o.Se)("search",["goodsList","total"]),trademarkName(){const{trademark:a}=this.searchParams;return a?a.split(":")[1]:""},props(){this.searchParams.props.map((a=>{const[s,t,e]=a.split(":");return`${t}:${e}`}))},isPrice(){return"2"===this.searchParams.order.split(":")[0]},isUp(){return"asc"===this.searchParams.order.split(":")[1]}},methods:{...(0,o.nv)("search",["getSearchListData"]),removeCategoryName(){const{keyword:a}=this.$route.params;this.$router.push({name:"search",params:{keyword:a}})},removeKeyword(){const{query:a}=this.$route;this.$router.push({name:"search",query:{...a,keyword:void 0}}),this.$bus.$emit("remove-keyword")},saveTrademark(a){const{tmId:s,tmName:t}=a;this.searchParams.trademark=`${s}:${t}`,this.getSearchListData(this.searchParams)},removeTrademark(a){this.searchParams.trademark=void 0,this.getSearchListData(this.searchParams)},saveAtrrVaule(a,s){const{props:t}=this.searchParams,e=`${a.attrName}\n      :${s}`;t.includes(e)||(t.push(e),this.getSearchListData(this.searchParams))},removeProp(a){this.searchParams.props.splice(a,1),this.getSearchListData(this.searchParams)},getPageNo(a){this.searchParams.pageNo=a,this.getSearchListData(this.searchParams)},changeOrder(a){const[s,t]=this.searchParams.order.split(":");this.searchParams.order=a==s?`${s}:${"asc"===t?"desc":"asc"}`:`${a}:'asc'`,this.getSearchListData(this.searchParams)}}},v=u,p=(0,h.Z)(v,e,r,!1,null,"ad0d9748",null),g=p.exports}}]);
//# sourceMappingURL=337.c30efae7.js.map