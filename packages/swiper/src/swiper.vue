<template>
  <div 
    class="me-swiper"
    :class="{'is-card':type === 'card'}"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave">
    <div class="container" :style="{height:height}">
      <transition name="move-left">
        <button 
          v-if="arrow !== 'never'"
          v-show="arrow === 'always' || hover"
          @mouseenter="handleBtnEnter('left')"
          @mouseleave="handleBtnLeave"
          @click.stop="handleBtnClick(activeIndex - 1)"
          class="arrow arrow-left">
          <i class="me-icon-left"></i>
        </button>
      </transition>
      <transition name="move-right">
        <button
          v-if="arrow !== 'never'"
          v-show="arrow === 'always' || hover"
          @mouseenter="handleBtnEnter('right')"
          @mouseleave="handleBtnLeave"
          @click.stop="handleBtnClick(activeIndex + 1)"
          class="arrow arrow-right">
          <i class="me-icon-right"></i>
        </button>
      </transition>
      <slot></slot>
    </div>
    <ul 
      v-if="indicatorPosition !== 'none'"
      class="indicators" 
      :class="{'is-label':hasLabel,'is-outside':indicatorPosition === 'outside' || type === 'card'}">
      <li 
        v-for="(item,index) in items" 
        :key="index" class="indicator" 
        :class="{'is-active':index === activeIndex}" 
        @mouseenter="handleIndicatorHover(index)" 
        @click.stop="handleIndicatorClick(index)">
        <button class="button">
          <span v-if="hasLabel">{{item.label}}</span>
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
import throttle from '../../../src/utils/throttle-debounce/throttle';
import {addResizeListener,removeResizeListener} from '../../../src/utils/resize-event';

export default {
  name:'MeSwiper',
  props:{
    initialIndex:{
      type:Number,
      default:0
    },
    height:String,
    trigger:{
      type:String,
      default:'hover'
    },
    autoplay:{
      type:Boolean,
      default: true
    },
    interval:{
      type:Number,
      default:3000
    },
    indicatorPosition:String,
    indicator:{
      type:Boolean,
      default:true
    },
    arrow:{
      type:String,
      default:'hover'
    },
    type:String
  },
  data(){
    return{
      items:[],
      activeIndex: -1,
      containerWidth:0,
      timer:null,
      hover:false
    }
  },
  computed:{
    hasLabel(){
      return this.items.some(item => item.label.toString().length > 0);
    }
  },
  watch:{
    items(val){
      if(val.length >0) this.setActiveItem(this.initialIndex);
    },
    activeIndex(val,oldVal){
      this.resetItemPosition(oldVal);
      this.$emit('change',val,oldVal);
    },
    autoplay(val){
      val ? this.startTimer() : this.pauseTimer();
    }
  },
  methods:{
    handleMouseEnter(){
      this.hover = true;
      this.pauseTimer();
    },
    handleMouseLeave(){
      this.hover = false;
      this.startTimer();
    },
    itemsInStage(item,index){
      const len = this.items.length;

      if(index === len -1 && item.inStage && this.items[0].active ||
      (item.inStage && this.items[index+1] && this.items[index+1].active)){
        return 'left';
      }else if(index === 0 && item.inStage && this.items[len -1].active ||
      (item.inStage && this.items[index-1] && this.items[index-1].active)){
        return 'right';
      }
      return false;
    },
    handleBtnEnter(arrow){
      this.items.forEach((item,index) => {
        if(arrow === this.itemsInStage(item,index)){
          item.hover = true;
        }
      });
    },
    handleBtnLeave(){
      this.items.forEach(item => {
        item.hover = false;
      });
    },
    updateItems(){
      this.items = this.$children.filter(child => child.$options.name === 'MeSwiperItem');
    },
    resetItemPosition(oldIndex){
      this.items.forEach((item,index) => {
        item.translateItem(index,this.activeIndex,oldIndex);
      });
    },
    playSlides(){
      if(this.activeIndex < this.items.length - 1){
        this.activeIndex++;
      }else{
        this.activeIndex = 0;
      }
    },
    pauseTimer(){
      clearInterval(this.timer);
    },
    startTimer(){
      if(this.interval <= 0 || !this.autoplay) return;
      this.timer = setInterval(this.playSlides,this.interval);
    },
    setActiveItem(index){
      if(typeof index === 'string'){
        const filteredItems = this.items.filter(item => item.name === index);
        if(filteredItems.length > 0){
          index = this.items.indexOf(filteredItems[0]);
        }
      }
      index = Number(index);
      if(isNaN(index) || index !== Math.floor(index)){
        return;
      }
      let len = this.items.length;
      if(index < 0){
        this.activeIndex = len - 1;
      }else if(index >= len){
        this.activeIndex = 0;
      }else{
        this.activeIndex = index;
      }
    },
    handleIndicatorClick(index){
      this.activeIndex = index;
    }
  },
  created(){
    this.handleBtnClick = throttle(300,true,index =>{
      this.setActiveItem(index);
    });
    this.handleIndicatorHover = throttle(300,index =>{
      if(this.trigger === 'hover' && index !== this.activeIndex){
        this.activeIndex = index;
      }
    });
  },
  mounted(){
    this.updateItems();
    this.$nextTick(() =>{
      //addResizeListener(this.$el,this.resetItemPosition);
      if(this.initialIndex < this.items.length && this.initialIndex >= 0){
        this.activeIndex = this.initialIndex;
      }
      this.startTimer();
    });
  },
  beforeDestroy(){
    if(this.$el){
      //removeResizeListener(this.$el,this.resetItemPosition);
    }
  }
}
</script>