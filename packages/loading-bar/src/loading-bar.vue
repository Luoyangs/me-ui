<template>
  <div class="me-loading-bar">
    <div class="bar" :class="isError?'error':''" role="bar" :style="{transform:'translate3d(-'+(100-progress)+'%,0,0)'}">
      <div class="peg"></div>
    </div>
    <div class="spinner" role="spinner" v-if="showSpinner">
      <div class="icon" :class="isError?'error':''" :style="{'animation':'loading-spinner 400ms ' + easing + ' infinite'}"></div>
    </div>
  </div>
</template>
<script>
export default {
  name:'MeLoadingBar',
  data(){
    return {
      speed:5,
      percent:0,
      easing:'linear',
      progress:0,
      showSpinner:true,
      isError:false
    }
  }
}
</script>

<style lang="less">
.me-loading-bar{
  .bar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    z-index: 9999;
    transition: all 200ms ease;
    transform:  translate3d(-100%,0,0);
    background: #0bf;
    .error{
      background: #ff4949;
    }
  }
  .peg{
    display: block;
    position: absolute;
    right: 0;
    width:100px;
    height: 100%;
    box-shadow: 0 0 10px #ffdc00, 0 0 5px #ffdc00;
    opacity: 1.0;
    transform: rotate(3deg) translate(0,-4px);
  }
  .spinner{
    display: black;
    position: fixed;
    top:15px;
    right: 15px;
    z-index: 1031;
    .icon{
      width:18px;
      height: 18px;
      box-sizing: border-box;
      border: solid 2px transparent;
      border-top-color: #0bf;
      border-left-color: #0bf;
      border-radius: 50%;
    }
    .error{
      border-top-color: #ff4949;;
      border-left-color: #ff4949;;
    }
  }
}
@keyframes loading-spinner {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
