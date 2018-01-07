## LoadMore 无限滚动

### 概述
常用于滚动至底部时，触发加载更多数据。

#### 代码示例 
<style scoped>
.item{line-height:45px;border-bottom:1px solid #ccc;}
</style>
<div class="demo-block">
  <div v-for="(item,index) in list" :key="index">
    <p class="item">这是第 {{item}} 个项目...</p>
  </div>
  <me-load-more @scroll="scrollHandler">
    <div slot="no-result">暂时没有数据...</div>
    <div slot="no-more">没有更多了...</div>
  </me-load-more>
</div>
<script>
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  methods: {
    scrollHandler($state) {
      if (this.list.length > 40) {
        $state.complete();
      } else {
        setTimeout(() =>{
          var temp = [];
          for (var len = this.list.length, i = len; i <= len + 10; i++) {
            temp.push(i);
          }
          this.list = this.list.concat(temp);
          $state.loaded();
        }, 1500);
      }
    }
  }
}  
</script>