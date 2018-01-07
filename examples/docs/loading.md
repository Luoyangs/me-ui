## Vue指令Loading

<style>
.demo{height:300px;border:1px solid #ccc;margin:14px 0;}
</style>

<div class="demo-block">
  <div class="demo" v-loading="isLoading1"></div>
  <me-button @click="isLoading1 = true">加载1</me-button>
</div>
<script>
export default{
  data(){
    return {
      isLoading1:false,
    }
  }
}
</script>