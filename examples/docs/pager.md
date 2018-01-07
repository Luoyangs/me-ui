<script>
  export default {
    methods: {
      handleChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {
        current: 5
      };
    }
  }
</script>

## Pager 分页组件

### 基本效果
<div class="demo-block">
  <me-pager :count="50"></me-pager>
</div>

::: demo
```html

<div class="demo-block">
  <me-pager :count="50"></me-pager>
</div>
```
:::


### 显示总条数
<div class="demo-block">
  <me-pager :count="1000" :total="10000"></me-pager>
</div>

::: demo
```html

<div class="demo-block">
  <me-pager :count="1000" :total="10000"></me-pager>
</div>
```
:::


### 显示跳转
<div class="demo-block">
  <me-pager
    @change="handleChange"
    :current="current"
    :jump="true"
    :count="1000"></me-pager>
</div>

::: demo
```html

<div class="demo-block">
  <me-pager
    @change="handleChange"
    :current="current"
    :jump="true"
    :count="1000"></me-pager>
</div>
<script>
  export default {
    methods: {
      handleChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {
        current: 5
      };
    }
  };
</script>
```
:::

### 完整版

<div class="demo-block">
  <me-pager
    @change="handleChange"
    :current="current"
    :count="1000" 
    :total="10000"
    :jump="true"></me-pager>
</div>

::: demo
```html

<div class="demo-block">
  <me-pager
    @change="handleChange"
    :current="current"
    :count="1000" 
    :total="10000"
    :jump="true"></me-pager>
</div>
<script>
  export default {
    methods: {
      handleChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {
        current: 5
      };
    }
  };
</script>
```
:::


### Attributes
| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
| total | 总条目数 | Number | — | — |
| count | 总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性 | Number | — | — |
| current | 当前页数 | Number | — | 1 |
| jump | 是否显示跳转 | Boolean | — | — |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| change | current 改变时会触发 | 当前页`current` |