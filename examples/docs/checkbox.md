##  Checkbox复选框

### 基础用法

单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。
在`me-checkbox`元素中定义`v-model`绑定变量，单一的`checkbox`中，默认绑定变量的值会是`Boolean`，选中为`true`。

<div class="demo-block">
  <me-checkbox v-model="checked" @change="handleChange" label="备选备选项"></me-checkbox>
  <me-checkbox v-model="checked2" @change="handleChange2" label="备选项"></me-checkbox>
  <me-checkbox v-model="checked3" @change="handleChange2" label="备选项"></me-checkbox>
  <me-checkbox v-model="checked4" @change="handleChange" label="备选项"></me-checkbox>
</div>
<script>
  export default {
    data() {
      return {
        checked: true,
        checked2:true,
        checked3: true,
        checked4:true,
        citys: ['上海', '北京', '广州', '深圳'],
        checkList: ['上海', '北京'],
        checkList2: ['北京']
      };
    },
    methods:{
      handleChange(){
        console.log("1："+this.checked)
      },
      handleChange2(){
        console.log("2："+this.checked2)
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

<me-checkbox v-model="checked" @change="handleChange" label="备选备选项"></me-checkbox>
<me-checkbox v-model="checked2" @change="handleChange2" label="备选项"></me-checkbox>
<me-checkbox v-model="checked3" @change="handleChange2" label="备选项"></me-checkbox>
<me-checkbox v-model="checked4" @change="handleChange" label="备选项"></me-checkbox>
<script>
export default{
  data(){
    return {
      checked: true,
      checked2:true,
      checked3: true,
      checked4:true
    }
  },
  methods:{
    handleChange(){
      console.log("1："+this.checked)
    },
    handleChange2(){
      console.log("2："+this.checked2)
    }
  }
}
</script>
```
:::



### 禁用状态
多选框不可用状态。

<div class="demo-block">
  <me-checkbox v-model="checked" @change="handleChange" disabled label="备选备选项"></me-checkbox>
  <me-checkbox v-model="checked2" @change="handleChange2" disabled label="备选项"></me-checkbox>
</div>

::: demo
```html

<me-checkbox v-model="checked" @change="handleChange" disabled label="备选备选项"></me-checkbox>
<me-checkbox v-model="checked2" @change="handleChange2" disabled label="备选项"></me-checkbox>
<script>
export default{
  data(){
    return {
      checked: true,
      checked2:true
    }
  },
  methods:{
    handleChange(){
      console.log("1："+this.checked)
    },
    handleChange2(){
      console.log("2："+this.checked2)
    }
  }
}
</script>
```
:::


### 多选框组
适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

checkbox-group元素能把多个 checkbox 管理为一组，只需要在 Group 中使用v-model绑定Array类型的变量即可。 el-checkbox 的 label属性是该 checkbox 对应的值，若该标签中无内容，则该属性也充当 checkbox 按钮后的介绍。label与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。

<div class="demo-block">
  <me-checkbox-group v-model="checkList" disabled @change="handleGroupChange">
    <me-checkbox v-for="(item,index) in citys" :label="item" :key="index"></me-checkbox>
  </me-checkbox-group>
</div>

::: demo
```html

<me-checkbox-group v-model="checkList" @change="handleGroupChange">
  <me-checkbox v-for="(item,index) in citys" :label="item" :key="index"></me-checkbox>
</me-checkbox-group>
<script>
export default{
  data(){
    return {
      citys: ['上海', '北京', '广州', '深圳'],
      checkList1: ['上海','北京']
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
  <me-checkbox-group v-model="checkList2" @change="handleGroupChange2">
    <me-checkbox v-for="(item,index) in citys" border :label="item" :key="index"></me-checkbox>
  </me-checkbox-group>
</div>

::: demo
```html

<me-checkbox-group v-model="checkList2" @change="handleGroupChange2">
  <me-checkbox v-for="(item,index) in citys" border :label="item" :key="index"></me-checkbox>
</me-checkbox-group>
<script>
export default{
  data(){
    return {
      citys: ['上海', '北京', '广州', '深圳'],
      checkList2: ['北京']
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
| label     | 选中状态的值（只有在`checkbox-group`或者绑定对象类型为`array`时有效）| string / number / boolean  |       —        |     —    |
| disabled  | 是否禁用    | boolean   |  — | false   |
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