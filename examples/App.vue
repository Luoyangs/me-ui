<template>
  <div id="app">
    <min-header></min-header>
    <div class="main" v-if="!isIndex">
      <div class="nav-box">
        <side-nav class="nav"></side-nav>
        <!-- <div class="list">
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
          <p class="text">1000000000000000</p>
        </div> -->
      </div>
      <router-view class="view"></router-view>
    </div> 
    <router-view class="page" v-else/>
    <!-- <min-footer v-if="!isIndex"></min-footer> -->
  </div>
</template>

<script>
import minHeader from './components/header.vue';
import minFooter from './components/footer.vue';
import sideNav from './components/side-nav.vue';

export default {
  name: 'app',
  data(){
    return {
      isIndex: true
    }
  },
  watch:{
    $route(){
      this.isIndex = this.$route.name === 'index';
    }
  },
  components:{
    minHeader,
    minFooter,
    sideNav
  }
}
</script>
<style lang="less">
@import './assets/less/md';

.main{
  width: 100%;
  height: 100%;
  margin-top: 80px;
  display: flex;
  .nav-box{
    position: fixed;
    top: 82px;
    height: 94%;
    width: 210px;
    flex: 0 0 210px;
    overflow: hidden;
    .nav{
      width: 223px;
      overflow-y: scroll;
      height: 100%;
    }
  }
  .view{
    flex: 1;
    position: relative;
    margin-left: 210px;
    padding: 32px 48px 48px;
    box-sizing: border-box;
    width: calc(100% - 240px);
  }
}
.main:after{
  content:'';
  clear: both;
  display: black;
}
</style>