<template>
  <ul class="me-pager">
    <li class="total" v-if="total">共计{{total || 0}}条</li>

    <li class="number" @click="handleClick(current -1)">上一页</li>

    <li :class="{active:current === 1}" v-if="pagers[0] > 1" @click="handleClick(1)" class="number">1</li>
  
    <li class="icon pre me-icon-more" v-if="showPreMore"></li>
  
    <li v-for="pager in pagers" @click="handleClick(pager)" :class="{active:current === pager}" :key="pager" class="number">{{pager}}</li>
  
    <li class="icon next me-icon-more" v-if="showNextMore"></li>
    
    <li :class="{active:current === count}" v-if="pagers[0] <= count - groups"  @click="handleClick(count)" class="number">{{count}}</li>
  
    <li class="number" @click="handleClick(current + 1)">下一页</li>

    <li class="jumper" v-if="jump">
      <span class="jtext">到第</span>
      <input type="number" class="input" @blur="jumpTo" v-model="input">
      <span class="jtext">页</span>
      <span class="number btn">确定</span>
    </li>
  </ul>
</template>
<script>
export default {
  name:'MePager',
  props:{
    total:Number, //总条数
    count:Number, //总页数
    groups:{
      type:Number,
      default:5
    }, // 一组显示几页
    jump:Boolean //是否显示跳转
  },
  data(){
    return {
      showPreMore:false,
      showNextMore:false,
      input:'',
      current:1
    }
  },
  watch:{
    input(val){
      return this.input = (val < 1 || val > this.count) ? 1: val;
    }
  },
  computed:{
    pagers(){
      let from,to;
      const {count,current,groups} = this;
      const diff = (groups - 1) / 2;

      from = current - Math.floor(diff);
      to = current + Math.ceil(diff);
      
      if(from < 1){
        from = 1;
        to = groups;
      }
      if(to >= count){
        to = count;
        from = to - groups + 1;
      }

      if(count > groups){
        if(current > groups - diff + 1){
          this.showPreMore = true;
        }else{
          this.showPreMore = false;
        }

        if(current < count - diff - 1){
          this.showNextMore = true;
        }else{
          this.showNextMore = false;
        }
      }

      const arrs = [];

      while(from <= to){
        arrs.push(from++);
      }

      return arrs;
    }
  },
  methods:{
    handleClick(index){
      if(index < 1 || index > this.count) return;
      this.current = index;
      this.$emit('change',index);
    },
    jumpTo(){
      var num = parseInt(this.input,10);
      if(num || isNaN(num)) return;
      this.input = '';
      this.handleClick(num);
    }
  }
}
</script>
<style lang="less" scoped>
.me-pager{
  font-size: 0;
	clear: both;
  color: #666;
  margin: 0;
  padding: 0;
  .icon{
    margin: 0 3px 10px;
    padding: 2px 12px;
    border: 1px solid #ccc;
  }
  .number{
    height: 26px;
    line-height: 26px;
    margin: 0 3px 6px;
    padding: 2px 12px;
    border: 1px solid #ccc;
    list-style: none;
    display: inline-block;
    font-size: 12px;
    &.active{
      color:#fff;
      background: #18b4ed;
    }
    &:hover{
      cursor: pointer;
    }
  }
  .total,.jumper{
    list-style: none;
    display: inline-block;
    font-size: 12px;
    margin-right: 12px;
    font-weight: 400;
    vertical-align: middle;
  }
  .jumper{
    margin-left: 18px;
    margin-right: 0;
    height: 26px;
    line-height: 26px;
    font-weight: 400;
    vertical-align: top;
    .input{
      display: inline-block;
      width: 40px;
      margin: 0 3px;
      padding: 0 5px;
      height: 26px;
	    line-height: 26px;
    }
    .btn:hover{
      background-color: #18b4ed;
      color: #fff;
    }
  }
}
</style>
