 <template>
  <div class="pagination">
    <button @click="changePageNo(pageNo-1)" :disabled="pageNo===1">上一页</button>
    <button v-show="startAndEnd.start>1" @click="changePageNo(1)">1</button>
    <span v-show="startAndEnd.start>2">...</span>
    <!-- 起始页 -->
    <button v-for="(_,index) in (startAndEnd.end-startAndEnd.start+1)" :key="_" :class="{ active:index+startAndEnd.start==pageNo}"
    @click="changePageNo(index+startAndEnd.start)"
    >{{index+startAndEnd.start}}</button>
    <button v-show="startAndEnd.end<totalPage-1">···</button>
    <button v-show="startAndEnd.end<totalPage"
    @click="changePageNo(totalPage)"
    >总页数：{{totalPage}}</button>
    <button @click="changePageNo(pageNo+1)":disabled="pageNo===totalPage">下一页</button>

    <span>共{{total}}条</span>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['total', 'pageNo', 'pageSize', 'continues','changePageNo'],
  computed: {
    //总页码
    totalPage() {
      const { total, pageSize } = this;
      //页数不为小数
      return Math.ceil(total / pageSize);
    },
    //2.计算起始页
    startAndEnd() {
      const { pageNo, continues,totalPage} = this;
      let start, end;
      if(continues>totalPage){
        //如果连续页数大于了总页数的情况，也就是没有那么多的连续页
        start=1;
        end=totalPage
      }else{
       //起始页，pageNo当前页码，continues连续页
      start = pageNo - parseInt(continues / 2);
      end = pageNo + parseInt(continues / 2);
      if(start<1){
        //如果起始页小于了1
        start=1;//起始页也就是1
        end=continues//结束也就是continues
       }
       if(end>totalPage){
        //如果结束页大于总页码
        end=totalPage;//结束页必须是总页码
        start=totalPage-continues+1 //开始页要从后往前算
       }   
      }
     return{start,end};
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #c81623;
      color: #fff;
    }
  }
  span {
    display: inline-block;
    line-height: 28px;
    font-size: 14px;
    color: gray;
    vertical-align: middle;
  }
}
</style>