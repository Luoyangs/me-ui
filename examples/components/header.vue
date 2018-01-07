<template>
  <header class="pager-header" :style="$route.name==='index'?'box-shadow:none':'box-shadow:0 10px 60px 0 rgba(29,29,31,0.07)'">
    <div class="header-container">
      <router-link :to="{name:'index'}"><img :src="imgSrc" width="100"/><span>UI</span></router-link>
      <router-link :to="{name:'giude'}">组件系统</router-link>
    </div>
  </header>
</template>
<script>
import logo from '../assets/logo.png';

export default {
  data(){
    return {
      imgSrc:logo
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/md';

.pager-header{
  background: #fff;
  position: fixed;
  box-shadow: 0 10px 60px 0 rgba(29,29,31,0.07);
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 80px;
  transition: all .3s;
  z-index: 100;
  .header-container{
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 80px;
    justify-content: space-between;
    img{
      display: inline-block;
      width: 60px;
    }
    a{
      color:#555;
    }
    span{
      color: #0bf;
      display: inline-block;
      position: relative;
      left: -8px;
      top:-2px;
    }
  }
}
</style>
