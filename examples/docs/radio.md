## Radio 单选框
在一组备选项中进行单选

### 基础用法

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

<div class="demo-block">
  <me-radio v-model="checked" @change="handleChange" label="备选项1"></me-radio>
  <me-radio v-model="checked" @change="handleChange" label="备选项2"></me-radio>
  <me-radio v-model="checked" @change="handleChange" label="备选项3"></me-radio>
  <me-radio v-model="checked" @change="handleChange" label="备选项4"></me-radio>
</div>
<script>
  export default {
    data() {
      return {
        checked: '备选项1',
        citys: ['上海', '北京', '广州', '深圳'],
        checkList: '上海',
        checkList2: '北京'
      };
    },
    methods:{
      handleChange(){
        console.log("1："+this.checked)
      },
      handleGroupChange(){
        console.log("list："+this.checkList)
      },
      handleGroupChange2(){
        console.log("list："+this.checkList2)
      }
    }
  };
</script>

::: demo
```html

<me-radio v-model="checked" @change="handleChange" label="备选项1"></me-radio>
<me-radio v-model="checked" @change="handleChange" label="备选项2"></me-radio>
<me-radio v-model="checked" @change="handleChange" label="备选项3"></me-radio>
<me-radio v-model="checked" @change="handleChange" label="备选项4"></me-radio>
<script>
export default{
  data(){
    return {
      checked: '备选项1'
    }
  },
  methods:{
    handleChange(){
      console.log("1："+this.checked)
    }
  }
}
</script>
```
:::



### 禁用状态
多选框不可用状态。

<div class="demo-block">
  <me-radio v-model="checked" @change="handleChange" disabled label="备选备选项"></me-radio>
  <me-radio v-model="checked" @change="handleChange" disabled label="备选项"></me-radio>
</div>

::: demo
```html

<me-radio v-model="checked" @change="handleChange" disabled label="备选备选项"></me-radio>
<me-radio v-model="checked" @change="handleChange" disabled label="备选项"></me-radio>
<script>
export default{
  data(){
    return {
      checked: true
    }
  },
  methods:{
    handleChange(){
      console.log("1："+this.checked)
    }
  }
}
</script>
```
:::


### 多选框组
适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

结合radio-group元素和子元素radio可以实现单选组，在radio-group中绑定v-model，在radio中设置好label即可，无需再给每一个radio绑定变量，另外，还提供了change事件来响应变化，它会传入一个参数value

<div class="demo-block">
  <me-radio-group v-model="checkList" @change="handleGroupChange">
    <me-radio v-for="(item,index) in citys" :label="item" :key="index"></me-radio>
  </me-radio-group>
</div>

::: demo
```html

<me-radio-group v-model="checkList" @change="handleGroupChange">
  <me-radio v-for="(item,index) in citys" :label="item" :key="index"></me-radio>
</me-radio-group>
<script>
export default{
  data(){
    return {
      citys: ['上海', '北京', '广州', '深圳'],
      checkList1: '上海'
    }
  },
  methods:{
    handleGroupChange1(){
      console.log("list："+this.checkList1)
    }
  }
}
</script>
```
:::


### 带有边框
设置border属性可以渲染为带有边框的多选框。

<div class="demo-block">
  <me-radio-group v-model="checkList2" @change="handleGroupChange2">
    <me-radio v-for="(item,index) in citys" border :label="item" :key="index"></me-radio>
  </me-radio-group>
</div>

::: demo
```html

<me-radio-group v-model="checkList2" @change="handleGroupChange2">
  <me-radio v-for="(item,index) in citys" border :label="item" :key="index"></me-radio>
</me-radio-group>
<script>
export default{
  data(){
    return {
      citys: ['上海', '北京', '广州', '深圳'],
      checkList2: '北京'
    }
  },
  methods:{
    handleGroupChange2(){
      console.log("list："+this.checkList2)
    }
  }
}
</script>
```
:::


### Checkbox Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 选中状态的值（只有在`radio-group`或者绑定对象类型为`array`时有效）| string / number / boolean  |       —        |     —    |
|  | 是否禁用    | boolean   |  — | false   |
| border  | 是否显示边框  | boolean   | — | false   |
| name | 原生 name 属性 | string    |      —         |     —    |
| checked  | 当前是否勾选    | boolean   |  — | false   |

### Checkbox Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件 | 更新后的值 |

### Checkbox-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| disabled  | 是否禁用    | boolean   | — | false   |

### Checkbox-group Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件 | 更新后的值 |