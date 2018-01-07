## Rate 评分

评分组件

### 基础用法

评分被分为三个等级，可以利用颜色对分数及情感倾向进行分级

<div class="demo-block">
  <me-rate v-model="value"></me-rate>
  <me-rate v-model="value1"></me-rate>
  <me-rate v-model="value2"></me-rate>
  <me-rate v-model="value3"></me-rate>
</div>
<script>
  export default {
    data() {
      return {
        value:0,
        value1:5,
        value2:3,
        value3:3.5
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

<div class="demo-block">
  <me-rate v-model="value"></me-rate>
  <me-rate v-model="value1"></me-rate>
  <me-rate v-model="value2"></me-rate>
  <me-rate v-model="value3"></me-rate>
</div>
<script>
  export default {
    data() {
      return {
        value:0,
        value1:5,
        value2:3,
        value3:3.5
      };
    }
  };
</script>
```
:::

### 辅助文字

用辅助文字直接地表达对应分数

为组件设置 `show-text` 属性会在右侧显示辅助文字。通过设置 `texts` 可以为每一个分值指定对应的辅助文字。`texts` 为一个数组，长度应等于最大值 `max`。
<div class="demo-block">
  <me-rate v-model="value3" :max="6"></me-rate>
  <me-rate v-model="value3" show-text></me-rate>
  <me-rate v-model="value3" show-score></me-rate>
</div>

::: demo
```html

<div class="demo-block">
  <me-rate v-model="value3" :max="6"></me-rate>
  <me-rate v-model="value3" show-text></me-rate>
  <me-rate v-model="value3" show-score></me-rate>
</div>
<script>
  export default {
    data() {
      return {
        value3:3.5
      };
    }
  };
</script>
```
:::

### 只读

只读的评分用来展示分数，允许出现半星

为组件设置 `disabled` 属性表示组件为只读，支持小数分值。此时若设置 `show-score`，则会在右侧显示目前的分值。
<div class="demo-block">
  <me-rate v-model="value3" disabled></me-rate>
  <me-rate v-model="value3" show-score disabled></me-rate>
  <me-rate v-model="value3" show-text disabled></me-rate>
</div>

::: demo
```html

<div class="demo-block">
  <me-rate v-model="value3" disabled></me-rate>
  <me-rate v-model="value3" show-score disabled></me-rate>
  <me-rate v-model="value3" show-text disabled></me-rate>
</div>
<script>
  export default {
    data() {
      return {
        value3:3.5
      };
    }
  };
</script>
```
:::