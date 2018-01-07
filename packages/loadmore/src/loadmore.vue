<template>
  <div class="scroll-container">
    <div v-show="isLoading" class="spinner">
      <me-spinner :spinner="spinner"></me-spinner>
      <span class="text">加载中...</span>
    </div>
    <div class="status" v-show="isNoResults">
      <slot name="no-result">No Results :(</slot>
    </div>
    <div class="status" v-show="isNoMore">
      <slot name="no-more">No More :)</slot>
    </div>
  </div>
</template>
<script>
import MeSpinner from './spinner.vue';

export default {
  name:'MeLoadMore',
  props:{
    offset:{
      type:Number,
      default:100
    },
    onInfinite:Function,
    spinner:String,
    position:{
      type:String,
      default:'bottom'
    },
    forceUseInfiniteWrapper:null
  },
  data(){
    return {
      scrollParent:null,
      scrollHandler:null,
      isLoading:false,
      isComplete:false,
      isFirstLoad:true,
      debounceTimer:null,
      debounceDuration:50,
      loopChecked:false,
      loopTimer:null,
      callTimes: 0
    }
  },
  components:{
    MeSpinner
  },
  computed:{
    isNoResults:{
      cache:false,
      get(){
        const slot = this.$slots['no-result'];
        const isBlank = (slot && slot[0].elm && slot[0].elm.textContent === '');
        return !this.isLoading && this.isComplete && this.isFirstLoad && !isBlank;
      }
    },
    isNoMore:{
      cache:false,
      get(){
        const slot = this.$slots['no-more'];
        const isBlank = (slot && slot[0].elm && slot[0].elm.textContent === '');
        return !this.isLoading && this.isComplete && !this.isFirstLoad && !isBlank;
      }
    }
  },
  mounted(){
    this.scrollParent = this.getScrollParent();

    this.scrollHandler = function scrollHandlerOriginal(event){
      if(!this.isLoading){
        clearTimeout(this.debounceTimer);
        if(event && event.constructor === Event){
          this.debounceTimer = setTimeout(this.attemptLoad,this.debounceDuration);
        }else{
          this.attemptLoad();
        }
      }
    }.bind(this);

    setTimeout(this.scrollHandler,1);
    this.scrollParent.addEventListener('scroll',this.scrollHandler);
    this.$on('$MeScroll:loaded',(event) => {
      this.isFirstLoad = false;

      if(this.isLoading){
        this.$nextTick(this.attemptLoad.bind(null,true));
      }
    });
    this.$on('$MeScroll:complete',(event) => {
      this.isLoading = false;
      this.isComplete = true;

      this.$nextTick(() => this.$forceUpdate());
      this.scrollParent.removeEventListener('scroll',this.scrollHandler);
    });
    this.$on('$MeScroll:reset',() => {
      this.isLoading = false;
      this.isComplete = false;
      this.isFirstLoad = true;
      this.scrollParent.addEventListener('scroll',this.scrollHandler);
      setTimeout(this.scrollHandler,1);
    });

    this.stateChanger = {
      loaded: () => {
        this.$emit('$MeScroll:loaded',{ target:this });
      },
      complete: () => {
        this.$emit('$MeScroll:complete',{ target:this });
      },
      reset: () => {
        this.$emit('$MeScroll:reset',{ target: this });
      }
    };
    this.$watch('forceUseInfiniteWrapper', () => {
      this.scrollParent = this.getScrollParent();
    });
  },
  deactivated(){
    this.isLoading = false;
    this.scrollParent.removeEventListener('scroll',this.scrollHandler);
  },
  activated(){
    this.scrollParent.addEventListener('scroll',this.scrollHandler);
  },
  methods:{
    attemptLoad(isContinuousCall){
      const offset = this.getCurrentOffset();

      if(!this.isComplete && offset <= this.offset && (this.$el.offsetWidth + this.$el.offsetHeight) > 0){
        this.isLoading = true;
        
        if(typeof this.onInfinite === 'function'){
          this.onInfinite.call(null,this.stateChanger);
        }else{
          this.$emit('scroll',this.stateChanger);
        }

        if(isContinuousCall && !this.forceUseInfiniteWrapper && !this.loopChecked){
          this.callTimes += 1;
          clearTimeout(this.loopTimer);

          this.loopTimer = setTimeout(() => {
            this.loopChecked = true;
          },1000);

          if(this.callTimes > 10){
            this.loopChecked = true;
          }
        }
      }else{
        this.isLoading = false;
      }
    },
    getCurrentOffset(){
      let offset;
      
      if(this.position === 'top'){
        offset = isNaN(this.scrollParent.scrollTop) ? this.scrollParent.pageYOffset : this.scrollParent.scrollTop;
      }else{
        const infiniteElmOffsetTopFromBottom = this.$el.getBoundingClientRect().top;
        const scrollElmOffsetTopFromBottom = this.scrollParent === window ? window.innerHeight : this.scrollParent.getBoundingClientRect().bottom;
        offset = infiniteElmOffsetTopFromBottom - scrollElmOffsetTopFromBottom;
      }
      return offset;
    },
    getScrollParent(elm = this.$el){
      let result;

      if(!this.forceUseInfiniteWrapper && ['scroll','auto'].indexOf(getComputedStyle(elm).overflowY) > -1){
        result = elm;
      }else if(elm.hasAttribute('scroll-wrapper') || elm.hasAttribute('data-scroll-wrapper')){
        result = elm;
      }else if(elm.tagName === 'BODY'){
        result = window;
      }

      return result || this.getScrollParent(elm.parentNode);
    }
  },
  destroyed(){
    if(!this.isComplete){
      this.scrollParent.removeEventListener('scroll',this.scrollHandler);
    }
  }
}
</script>