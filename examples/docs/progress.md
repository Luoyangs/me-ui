# Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

### 线形进度条 — 百分比外显
Progress 组件设置`percentage`属性即可，表示进度条对应的百分比，**必填**，必须在 0-100。

<div class="demo-block">
  <me-progress :percentage="0"></me-progress>
  <me-progress :percentage="70"></me-progress>
  <me-progress :percentage="100" status="success"></me-progress>
  <me-progress :percentage="50" status="error"></me-progress>
</div>

::: demo
```html

<me-progress :percentage="0"></me-progress>
<me-progress :percentage="70"></me-progress>
<me-progress :percentage="100" status="success"></me-progress>
<me-progress :percentage="50" status="exception"></me-progress>

```
:::


### 线形进度条 — 百分比内显
百分比不占用额外控件，适用于文件上传等场景

<div class="demo-block">
  <me-progress :text-inside="true" :stroke-width="18" :percentage="0"></me-progress>
  <me-progress :text-inside="true" :stroke-width="18" :percentage="70"></me-progress>
  <me-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></me-progress>
  <me-progress :text-inside="true" :stroke-width="18" :percentage="50" status="error"></me-progress>
</div>

::: demo
```html

<me-progress :text-inside="true" :stroke-width="18" :percentage="0"></me-progress>
<me-progress :text-inside="true" :stroke-width="18" :percentage="70"></me-progress>
<me-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></me-progress>
<me-progress :text-inside="true" :stroke-width="18" :percentage="50" status="error"></me-progress>

```
:::



### 环形进度条
<div class="demo-block">
  <me-progress type="circle" :percentage="0"></me-progress>
  <me-progress type="circle" :percentage="25"></me-progress>
  <me-progress type="circle" :percentage="100" status="success"></me-progress>
  <me-progress type="circle" :percentage="50" status="error"></me-progress>
</div>

::: demo
```html
<me-progress :percentage="0"></me-progress>
<me-progress :percentage="70"></me-progress>
<me-progress :percentage="100" status="success"></me-progress>
<me-progress :percentage="50" status="exception"></me-progress>
<me-progress :text-inside="true" :stroke-width="18" :percentage="0"></me-progress>
<me-progress :text-inside="true" :stroke-width="18" :percentage="70"></me-progress>
<me-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></me-progress>
<me-progress :text-inside="true" :stroke-width="18" :percentage="50" status="error"></me-progress>
<me-progress type="circle" :percentage="0"></me-progress>
<me-progress type="circle" :percentage="25"></me-progress>
<me-progress type="circle" :percentage="100" status="success"></me-progress>
<me-progress type="circle" :percentage="50" status="error"></me-progress>

```
:::

### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| **percentage** | **百分比（必填）**   | number          |     0-100          |     0    |
| type          | 进度条类型           | string         | line/circle | line |
| stroke-width  | 进度条的宽度，单位 px | number          | — | 6 |
| text-inside  | 进度条显示文字内置在进度条内（只在 type=line 时可用） | Boolean | — | false |
| status  | 进度条当前状态 | string | success/exception | — |
| width  | 环形进度条画布宽度（只在 type=circle 时可用） | number |  | 126 |
| show-text  | 是否显示进度条文字内容 | boolean | — | true |