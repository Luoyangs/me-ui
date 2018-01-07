<template>
  <button 
    @click="$emit('click',$event)"
    class="me-button"
    :disabled="disabled"
    :class="[type,{'plain':plain,'disabled':disabled,'round':round},'size-'+size]">
    <i v-if="icon !== ''" :class="'me-icon-'+icon"></i>
    <slot></slot>
  </button>
</template>
<script>
export default {
  name:'MeButton',
  props:{
    type:{
      type:String,
      default:'default'
    },
    size:{
      type:String,
      default:'default'
    },
    icon:{
      type:String,
      default:''
    },
    plain:Boolean,
    disabled:Boolean,
    round:Boolean
  }
}
</script>
<style lang="less">
.me-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  border-radius: 4px;
  padding: 12px 20px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  transform: translate3d(0,0,0);
  &::after{
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10,10);
    opacity: 0;
    transition: transform .5s,opacity 1s;
  }
  &:active::after{
    transform: scale(0,0);
    opacity: .2;
    transition: 0s;
  }
  &.size-medium {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
  &.size-small {
    padding: 8px 15px;
    font-size: 12px;
    border-radius: 3px;
  }
  &.round {
    border-radius: 20px;
  }

  &.default {
    background: #fff;
    border: 1px solid rgb(125,125,125);
    color: rgb(125,125,125);
    &:hover,
    &:focus {
      border-color: rgb(125,125,125);
      color: rgb(125,125,125);
    }
    &:disabled {
      opacity: 0.3;
      background: #fff;
      border: 1px solid rgb(125,125,125);
      color: rgb(125,125,125);
    }
    &:active {
      background: #fff;
      outline: none;
    }
    &.plain {
      color: #555;
      &:hover,
      &:focus {
        background: #fff;
        border-color: rgb(125,125,125);
        color: rgb(125,125,125);
      }
      &:disabled {
        background: #fff;
        color: rgb(125,125,125);
      }
    }
  }

  &.primary{
    background: #3FAAF5;
    border: 1px solid #3FAAF5;
    color: #fff;
    &:hover,
    &:focus {
      opacity: 0.7;
    }
    &:disabled {
      opacity: 0.3;
    }
    &.plain {
      background: none;
      color: #3FAAF5;
      &:hover,
      &:focus {
        opacity: 1;
        background: #3FAAF5;
        border: 1px solid #3FAAF5;
        color: #fff;
      }
      &:disabled {
        opacity: 0.3;
        background: #3FAAF5;
        border-color: #3FAAF5;
        color: #3FAAF5;
      }
    }
  }

  &.success {
    background: #13ce66;
    border: 1px solid #13ce66;
    color: #fff;
    &:hover,
    &:focus {
      opacity: 0.7;
    }
    &:disabled {
      opacity: 0.3;
    }
    &.plain {
      background: none;
      color: #13ce66;
      &:hover,
      &:focus {
        opacity: 1;
        background: #13ce66;
        border: 1px solid #13ce66;
        color: #fff;
      }
      &:disabled {
        opacity: 0.3;
        background: #13ce66;
        border-color: #13ce66;
        color: #13ce66;
      }
    }
  }

  &.info {
    background: #50bfff;
    border: 1px solid #50bfff;
    color: #fff;
    &:hover,
    &:focus {
      opacity: 0.7;
    }
    &:disabled {
      opacity: 0.3;
    }
    &.plain {
      background: none;
      color: #50bfff;
      &:hover,
      &:focus {
        opacity: 1;
        background: #50bfff;
        border: 1px solid #50bfff;
        color: #fff;
      }
      &:disabled {
        opacity: 0.3;
        background: #50bfff;
        border-color: #50bfff;
        color: #50bfff;
      }
    }
  }

  &.warning {
    background: #f7ba2a;
    border: 1px solid #f7ba2a;
    color: #fff;
    &:hover,
    &:focus {
      opacity: 0.7;
    }
    &:disabled {
      opacity: 0.3;
    }
    &.plain {
      background: none;
      color: #f7ba2a;
      &:hover,
      &:focus {
        opacity: 1;
        background: #f7ba2a;
        border: 1px solid #f7ba2a;
        color: #fff;
      }
      &:disabled {
        opacity: 0.3;
        background: #f7ba2a;
        border-color: #f7ba2a;
        color: #f7ba2a;
      }
    }
  }

  &.danger {
    background: #ff4949;
    border: 1px solid #ff4949;
    color: #fff;
    &:hover,
    &:focus {
      opacity: 0.7;
    }
    &:disabled {
      opacity: 0.3;
    }
    &.plain {
      background: none;
      color: #ff4949;
      &:hover,
      &:focus {
        opacity: 1;
        background: #ff4949;
        border: 1px solid #ff4949;
        color: #fff;
      }
      &:disabled {
        opacity: 0.3;
        background: #ff4949;
        border-color: #ff4949;
        color: #ff4949;
      }
    }
  }
}
</style>

