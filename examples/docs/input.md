# Input 输入框

----
基本表单组件，支持 input 和 textarea，并在原生控件基础上进行了功能扩展，可以组合使用。

### 基础用法

基本用法，使用v-model来绑定实现数据的双向绑定，否则在组件改变数据时，使用者的数据并没有变化。
可以直接设置 style 来改变输入框的宽度，默认 100%

<div class="demo-block">
  <me-input @change="inputChange" v-model="value1" placeholder="请输入..."></me-input>
  <me-input v-model="value2" icon="search" placeholder="请输入..."></me-input>
  <me-input type="text" v-model="value1" placeholder="请输入用户名...">
    <icon name="user" slot="prepend"></icon>
  </me-input>
  <me-input type="password" v-model="value2" placeholder="请输入密码...">
    <icon name="lock" slot="prepend"></icon>
  </me-input>
  <me-input type="textarea" v-model="value1" placeholder="请输入..."></me-input>
</div>
<script>
export default{
  data(){
    return {
      value1:'123',
      value2:'123x'
    }
  },
  methods:{
    inputChange(){
      console.log(this.value1)
    }
  }
}
</script>

::: demo
```html

<me-input v-model="value1" placeholder="请输入..."></me-input>
<me-input v-model="value2" icon="search" placeholder="请输入..."></me-input>
<me-input type="text" v-model="value1" placeholder="请输入用户名...">
  <icon name="user" slot="prepend"></icon>
</me-input>
<me-input type="password" v-model="value2" placeholder="请输入密码...">
  <icon name="lock" slot="prepend"></icon>
</me-input>
<me-input type="textarea" v-model="value1" placeholder="请输入..."></me-input>
<script>
export default{
  data(){
    return {
      value:'123'
    }
  }
}
</script>
```
:::


