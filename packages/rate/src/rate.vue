<template>
  <div class="me-rate">
    <span 
      class="item"
      v-for="item in max" 
      :key="item"  
      @mousemove="handleMousemove(item,$event)"
      @mouseleave="handleMouseleave"
      @click="handleClick(item)"
      :style="{cursor: disabled ? 'auto' : 'pointer'}">
      <i class="icon" :class="[iconClass[item-1],{'active':index === item}]"></i>
    </span>
    <span v-if="showText || showScore" class="text">{{text}}</span>
  </div>
</template>
<script>
export default {
  name:'MeRate',
  data(){
    return {
      current: this.value,
      index: -1
    }
  },
  props:{
    value:{
      type:Number,
      default:0
    },
    max:{
      type:Number,
      default:5
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showText: {
      type: Boolean,
      default: false
    },
    showScore: {
      type: Boolean,
      default: false
    },
    texts: {
      type: Array,
      default() {
        return ['极差', '失望', '一般', '满意', '惊喜'];
      }
    }
  },
  computed:{
    text(){
      return this.showText ?  this.texts[Math.ceil(this.current) - 1] : (this.disabled ? this.value : this.current);
    },
    iconClass(){
      let results = [];
      let i = 0;
      let half = false;
      let cur = this.current;
      if(cur !== Math.floor(cur)){
        cur--;
        half = true;
      }
      for(; i < cur; i++){
        results.push('me-icon-star-full');
      }
      if(half){
        results.push('me-icon-star-half');
      }
      for(; i < this.max; i++){
        results.push('me-icon-star-empty');
      }
      return results;
    }
  },
  watch:{
    value(val){
      this.current = val;
    }
  },
  methods:{
    handleMousemove(value,event){
      if(this.disabled) return;

      this.current = value;
      this.index = value;
    },
    handleMouseleave(){
      if(this.disabled) return;

      this.current = this.value;
      this.index = -1;
    },
    handleClick(value){
      if(this.disabled) return;

      this.$emit('input', value);
      this.$emit('change', value);
    }
  },
  created(){
    if(!this.value){
      this.$emit('input',0);
    }
  }
}
</script>

