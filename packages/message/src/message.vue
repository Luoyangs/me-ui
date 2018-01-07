<template>
  <transition name="me-message-fade">
    <div 
      :class="['me-message',customClass,horizontalClass]"
      v-show="visible"
      :style="positionStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      @click="click"
      role="message">

      <i class="me-icon" :class="typeClass" v-if="type"></i>
      <div class="group" :class="{'is-with-icon':typeClass}">
        <h2 class="title" v-text="title"></h2>
        <div class="content">
          <slot>
            <p v-if="!htmlString">{{message}}</p>
            <p v-else v-html="message"></p>
          </slot>
        </div>
        <div class="me-icon-close" v-if="showClose" @click.stop="close"></div>
      </div>
    </div>
  </transition>
</template>
<script>
const typeMap = {
  success: 'success',
  info:'info',
  warning:'warning',
  error:'error'
};

export default {
  data(){
    return {
      visible:false,
      title:'提示',
      message:'',
      duration:4500,
      type:'',
      showClose:true,
      customClass:'',
      onClose:null,
      onClick:null,
      closed:false,
      verticalOffset:0,
      timer:null,
      htmlString:false,
      position:'top-right'
    }
  },
  computed:{
    typeClass(){
      return this.type && typeMap[this.type]? `me-icon-${typeMap[this.type]}`:'';
    },
    horizontalClass(){
      return this.position.indexOf('right')>-1?'right':'left';
    },
    verticalProperty(){
      return /^top-/.test(this.position) ?'top':'bottom';
    },
    positionStyle(){
      return {
        [this.verticalProperty]:`${this.verticalOffset}px`
      };
    }
  },
  watch:{
    closed(val){
      if(val){
        this.visible = false;
        this.$el.addEventListener('transitionend',this.destroyElement);
      }
    }
  },
  methods:{
    destroyElement(){
      this.$el.removeEventListener('transitionend',this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    click(){
      if(typeof this.onClick === 'function'){
        this.onClick();
      }
    },
    close(){
      this.closed = true;
      if(typeof this.onClose === 'function'){
        this.onClose();
      }
    },
    clearTimer(){
      clearTimeout(this.timer);
    },
    startTimer(){
      if(this.duration >　0){
        this.timer = setTimeout(()=>{
          if(!this.closed){
            this.close();
          }
        },this.duration);
      }
    },
    keydown(e){
      if(e.keyCode === 46 || e.keyCode === 8){
        this.clearTimer();
      }else if(e.keyCode === 27){
        if(!this.closed){
          this.close();
        }
      }else{
        this.startTimer();
      }
    }
  },
  mounted(){
    this.startTimer();
    document.addEventListener('keydown',this.keydown);
  },
  beforeDestroy(){
    document.removeEventListener('keydown',this.keydown);
  }
}
</script>
<style lang="less" scoped>
.me-message{
  display: flex;
  width: 330px;
  padding: 14px 26px 14px 13px;
  border-radius:4px;
  box-sizing: border-box;
  border: 1px solid #e6ebf5;
  position: fixed;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: opacity .3s, transform .3s, left .3s, right .3s, top 0.4s, bottom .3s;
  overflow: hidden;
  &.left{
    left: 16px;
  }
  &.right{
    right: 16px;
  }
  .me-icon{
    height: 30px;
    width: 30px;
    font-size: 32px;
    transform: translateY(4px);
    &.me-icon-success{
      color: #67c23a;
    }
    &.me-icon-warning{
      color: #f7ba2a;
    }
    &.me-icon-error{
      color: #ff4949;
    }
    &.me-icon-info{
      color: #50bfff;
    }
  }
  .group{
    margin-left: 13px;
    .title{
      font-weight: bold;
      font-size: 16px;
      color: #2d2f33;
      margin: 0;
    }
    .content{
      font-size: 14px;
      line-height: 21px;
      margin: 6px 0 0 0;
      color: #5a5e66;
      text-align: justify;
      p {
        margin: 0;
      }
    }
    .me-icon-close{
      position: absolute;
      top: 12px;
      right: 15px;
      cursor: pointer;
      color: #878d99;
      font-size: 20px;
      &:hover {
        color: #5a5e66;
      }
    }
  }
}
.me-message-fade-enter {
  &.right {
    right: 0;
    transform: translateX(100%);
  }
  &.left {
    left: 0;
    transform: translateX(-100%);
  }
}
.me-message-fade-leave-active {
  opacity: 0;
}
</style>
