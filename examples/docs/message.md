# Message 消息提醒
----
悬浮出现在页面角落，显示全局的通知提醒消息。

### 基础用法
适用性广泛的通知栏

Message 组件提供通知功能，Element 注册了`$message`方法，接收一个`options`字面量参数，在最简单的情况下，你可以设置`title`字段和`message`字段，用于设置通知的标题和正文。默认情况下，经过一段时间后 Message 组件会自动关闭，但是通过设置`duration`，可以控制关闭的时间间隔，特别的是，如果设置为`0`，则不会自动关闭。注意：`duration`接收一个`Number`，单位为毫秒，默认为`4500`。

<script>
export default{
  methods: {
    open () {
      const h = this.$createElement;
      this.$message({
        title: '标题名称',
        message: h('i', { style: 'color: teal'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
      });
    },
    open2 () {
      this.$message({
        title: '提示',
        message: '这是一条不会自动关闭的消息',
        duration: 0
      });
    },
    open3() {
      this.$message({
        title: '成功',
        message: '这是一条成功的提示消息',
        type: 'success'
      });
    },
    open4() {
      this.$message({
        title: '警告',
        message: '这是一条警告的提示消息',
        type: 'warning'
      });
    },
    open5() {
      this.$message.info({
        title: '消息',
        message: '这是一条消息的提示消息'
      });
    },
    open6() {
      this.$message.error({
        title: '错误',
        message: '这是一条错误的提示消息'
      });
    }
  }
}
</script>
<div class="demo-block">
   <me-button type="primary" @click="open">可自动关闭</me-button>
   <me-button type="success" @click="open2">不会自动关闭</me-button>
</div>

::: demo

```html
<me-button type="primary" @click="open">可自动关闭</me-button>
<me-button type="success" @click="open2">不会自动关闭</me-button>
<script>
  export default{
    methods: {
      open () {
        const h = this.$createElement;
        this.$message({
          title: '标题名称',
          message: h('i', { style: 'color: teal'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
        });
      },
      open2 () {
        this.$message({
          title: '警告',
          message: '这是一条警告的提示消息',
          type: 'warning'
        });
      }
    }
  }
</script>

```
:::

### 带有倾向性
带有 icon，常用来显示「成功、警告、消息、错误」类的系统消息

Element 为 Message 组件准备了四种通知类型：`success`, `warning`, `info`, `error`。通过`type`字段来设置，除此以外的值将被忽略。同时，我们也为 Message 的各种 type 注册了方法，可以在不传入`type`字段的情况下像`open5`和`open6`那样直接调用。

<div class="demo-block">
   <me-button type="success" @click="open3">成功</me-button>
   <me-button type="warning" @click="open4">警告</me-button>
   <me-button type="info" @click="open5">消息</me-button>
   <me-button type="danger" @click="open6">错误</me-button>
</div>

::: demo

```html
<me-button type="success" @click="open3">成功</me-button>
<me-button type="warning" @click="open4">警告</me-button>
<me-button type="info" @click="open5">消息</me-button>
<me-button type="danger" @click="open6">错误</me-button>
<script>
  export default{
    methods: {
      open3() {
        this.$message({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
        });
      },
      open4() {
        this.$message({
          title: '警告',
          message: '这是一条警告的提示消息',
          type: 'warning'
        });
      },
      open5() {
        this.$message.info({
          title: '消息',
          message: '这是一条消息的提示消息'
        });
      },
      open6() {
        this.$message.error({
          title: '错误',
          message: '这是一条错误的提示消息'
        });
      }
    }
  }
</script>

```
:::
