<template>
  <div  class="pg-index">
    <div class="index-container">
      <img :src="imgSrc">
      <p>一款基于VUE2.0轻量级、模块化的前端 UI 组件库</p>
    </div>
    <div class="separate-panel">
      <div class="about">
        <router-link :to="{name: 'giude'}">开始使用</router-link>
        <a target="_blank" class="btn-github" href="https://github.com/Luoyangs/me-ui">GitHub</a>
      </div>
    </div>
  </div>
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
  .pg-index {
    .index-container {
      width: 960px;
      margin: 0 auto;
      text-align: center;
      padding: 100px 0;
      p{
        margin-top: 56px;
        color: #8994C6;
        font-size: 32px;
      }
    }
    .separate-panel{
      position: relative;
      .about{
        position: absolute;
        width: 100%;
        height: 200px;
        top: 20px;
        z-index: 9;
        background: #fff;
        text-align: center;
        a {
          color: #fff;
          background-image: linear-gradient(90deg, #0bf 0%, #00b8ff 100%);
          box-shadow: 0 2px 6px 0 rgba(51,105,231,0.4);
          display: inline-block;
          width: 190px;
          height: 56px;
          margin: 0 35px;
          font-size: 18px;
          line-height: 56px;
          border-radius: 28px;
          transition: all .3s;
          cursor: pointer;
        }
        .btn-github{
          color: #0bf;
          border: 1px solid #0bf;
          background: #fff;
          box-shadow: none;
        }
      }
    }
    .separate-panel:after{
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 250px;
      background: #fff;
      box-shadow: 0 -4px 30px 0 #DFE1E6;
      transform: skewY(-4deg);
    }
  }
</style>