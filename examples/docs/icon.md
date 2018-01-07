<script>
  import IconList from '../icon.json';
  export default {
    data() {
      return {
        icons: IconList
      };
    }
  }
</script>
<style lang="less">
  .demo-block > i {
    font-size: 36px;
    color: #0bf;
    margin: 0 20px;
    vertical-align: middle;
  }
  .icon-list {
    overflow: hidden;
    list-style: none;
    padding: 0;
    border: solid 1px #eaeefb;
    border-radius: 4px;
  }
  .icon-list li {
    float: left;
    width: 16.66%;
    text-align: center;
    height: 120px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    transition: color .15s linear;

    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;
    span {
      display: inline-block;
      line-height: normal;
      vertical-align: middle;
      font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',SimSun,sans-serif;
      color: #99a9bf;
    }
    i {
      display: block;
      font-size: 32px;
      margin-bottom: 15px;
      color: #3f536e;
      -webkit-transition: font-size 0.25s ease-out 0s;
      -moz-transition: font-size 0.25s ease-out 0s;
      transition: font-size 0.25s ease-out 0s;
      &:hover{
        color: rgb(92, 182, 255);
        font-size:100px;
      }
    }
  }
</style>

# Icon 图标

----
语义化的矢量图形，```ME-UI``` 使用开源的 Iconfont (阿里妈妈MUX倾力打造的矢量图标管理、交流平台) 作为图标库，并制作成了 ```icon font```，作为系统常用的图标库，方便开发使用。
### 如何使用

使用 ```class="icon"``` 来声明图标，具体图标的名称请 ```copy``` 相应的标签,或者使用内置的icon标签，只需要配置name（如：goods、user、lock）

<div class="demo-block">
  <icon name="goods"></icon>
  <icon name="menu"></icon>
  <icon name="loading"></icon>
  <icon name="list"></icon>
  <i class="me-icon-search"></i>
  <i class="me-icon-edit"></i>
  <i class="me-icon-like"></i>
  <me-button type="primary" class="me-icon-search">搜索</me-button>
  <me-button icon="download" type="primary">下载</me-button>
</div>

::: demo
```html

<icon name="goods"></icon>
<icon name="menu"></icon>
<icon name="loading"></icon>
<icon name="list"></icon>
<i class="me-icon-search"></i>
<i class="me-icon-edit"></i>
<i class="me-icon-like"></i>
<me-button type="primary" class="me-icon-search">搜索</me-button>
<me-button icon="download" type="primary">下载</me-button>
```
:::

### 图标示例

<ul class="icon-list">
  <li v-for="name in icons" :key="name">
    <span>
      <i :class="'me-icon-' + name"></i>
      {{'me-icon-' + name}}
    </span>
  </li>
</ul>