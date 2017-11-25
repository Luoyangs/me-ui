<template>
  <div class="side-nav">
    <div v-for="(title,index) in (Object.keys(navs))" :key="index" class="group-container">
      <p class="title">{{title}}</p>
      <div class="items" v-for="(nav,index) in navs[title]" :key="index" v-if="nav.desc">
        <router-link :class="$route.name === nav.name ? 'active':''" v-if="nav.name" :to="{name: nav.name}">{{nav.desc}}</router-link>
        <p v-else class="group">{{nav.desc}}</p>
        <div v-for="(item,index) in nav.items">
          <router-link :to="{name:item.name}" :class="$route.name === item.name?'active':''" class="comp">{{item.desc}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
 import { navsConf } from "../router/navs.json";
 
 export default{
   data(){
     return {
       navs: navsConf
     }
   }
 }
</script>
<style scoped lang="less">
.side-nav{
  display: inline-block;
  margin: 32px 0;
  padding: 0;
  color: #3F536E;
  background-color: #fff;
  z-index: 99;
  .group-container{
    margin-bottom: 32px;
  }
  .title{
    padding: 0 24px 8px;
    color: #8DABC4;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .items{
    font-size: 14px;
    font-weight: normal;
    line-height: 1.8;
    a{
      display: block;
      position: relative;
      padding: 8px 24px;
      color: #3F536E;
      font-weight: normal;
      line-height: 1.5;
      cursor: pointer;
    }
    .group{
      display: block;
      position: relative;
      padding: 6px 0 6px 24px;
      color: #2C405A;
      font-weight: bold;
    }
    .comp{
      display: block;
      position: relative;
      padding: 6px 24px 6px 32px;
      color: #616367;
      font-size: 14px;
    }
    .active{
      color: #3FAAF5;
    }
  }
}
</style>