# Form 表单

### 概述 
具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。

### 基础用法

<div class="demo-block">
  <me-form ref="formInline" :model="formInline" :rules="ruleInline" style="width:500px;" inline>
    <me-form-item prop="user">
      <me-input type="text" v-model="formInline.user" placeholder="Username">
      <icon name="user" slot="prepend"></icon>
     </me-input>
    </me-form-item>
    <me-form-item prop="password">
      <me-input type="password" v-model="formInline.password" placeholder="Password">
        <icon name="lock" slot="prepend"></icon>
      </me-input>
    </me-form-item>
    <me-form-item>
      <me-button type="default" @click="handleReset('formInline')">重置</me-button>
      <me-button type="primary" @click="handleSubmit('formInline')">登录</me-button>
    </me-form-item>
  </me-form>
</div>
<script>
export default {
  data() {
    return {
      formInline: {
        user: 'Luoyangs',
        password: '123456'
      },
      ruleInline: {
        user: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      },
      formLeft: {
        input1: '',
        input2: '',
        input3: ''
      },
      formRight: {
        input1: '',
        input2: '',
        input3: ''
      },
      formTop: {
        input1: '',
        input2: '',
        input3: ''
      }
    }
  },
  methods: {
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$message.success('提交成功!');
        } else {
          this.$message.error('表单验证失败!');
        }
      });
    }
  }
}
</script>

::: demo
```html

<me-form ref="formInline" :model="formInline" :rules="ruleInline" style="width:500px;" inline>
  <me-form-item prop="user">
    <me-input type="text" v-model="formInline.user" placeholder="Username">
    <icon name="user" slot="prepend"></icon>
    </me-input>
  </me-form-item>
  <me-form-item prop="password">
    <me-input type="password" v-model="formInline.password" placeholder="Password">
      <icon name="lock" slot="prepend"></icon>
    </me-input>
  </me-form-item>
  <me-form-item>
    <me-button type="default" @click="handleReset('formInline')">重置</me-button>
    <me-button type="primary" @click="handleSubmit('formInline')">登录</me-button>
  </me-form-item>
</me-form>
<script>
export default {
  data() {
    return {
      formInline: {
        user: 'Luoyangs',
        password: '123456'
      },
      ruleInline: {
        user: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$message.success('提交成功!');
        } else {
          this.$message.error('表单验证失败!');
        }
      });
    }
  }
}
</script>

```
:::

### 对齐方式
设置属性 label-position，可以改变表单域标签的位置，left 为左对齐，right 为右对齐，top 会置于表单域顶部。

<div class="demo-block">
  <me-form :model="formLeft" label-position="left" :label-width="100" style="width:500px;">
    <me-form-item label="标题">
      <me-input v-model="formLeft.input1"></me-input>
    </me-form-item>
    <me-form-item label="标题名称">
      <me-input v-model="formLeft.input2"></me-input>
    </me-form-item>
    <me-form-item label="标题名称对齐">
      <me-input v-model="formLeft.input3"></me-input>
    </me-form-item>
  </me-form>
  <me-form :model="formRight" label-position="right" :label-width="100" style="width:500px;">
    <me-form-item label="标题">
      <me-input v-model="formRight.input1"></me-input>
    </me-form-item>
    <me-form-item label="标题名称">
      <me-input v-model="formRight.input2"></me-input>
    </me-form-item>
    <me-form-item label="标题名称对齐">
      <me-input v-model="formRight.input3"></me-input>
    </me-form-item>
  </me-form>
  <me-form :model="formTop" label-position="top" style="width:500px;">
    <me-form-item label="标题">
      <me-input v-model="formTop.input1"></me-input>
    </me-form-item>
    <me-form-item label="标题名称">
      <me-input v-model="formTop.input2"></me-input>
    </me-form-item>
    <me-form-item label="标题名称对齐">
      <me-input v-model="formTop.input3"></me-input>
    </me-form-item>
  </me-form>
</div>


::: demo
```html

<me-form :model="formLeft" label-position="left" :label-width="100" style="width:500px;">
  <me-form-item label="标题">
    <me-input v-model="formLeft.input1"></me-input>
  </me-form-item>
  <me-form-item label="标题名称">
    <me-input v-model="formLeft.input2"></me-input>
  </me-form-item>
  <me-form-item label="标题名称对齐">
    <me-input v-model="formLeft.input3"></me-input>
  </me-form-item>
</me-form>
<me-form :model="formRight" label-position="right" :label-width="100" style="width:500px;">
  <me-form-item label="标题">
    <me-input v-model="formRight.input1"></me-input>
  </me-form-item>
  <me-form-item label="标题名称">
    <me-input v-model="formRight.input2"></me-input>
  </me-form-item>
  <me-form-item label="标题名称对齐">
    <me-input v-model="formRight.input3"></me-input>
  </me-form-item>
</me-form>
<me-form :model="formTop" label-position="top" style="width:500px;">
  <me-form-item label="标题">
    <me-input v-model="formTop.input1"></me-input>
  </me-form-item>
  <me-form-item label="标题名称">
    <me-input v-model="formTop.input2"></me-input>
  </me-form-item>
  <me-form-item label="标题名称对齐">
    <me-input v-model="formTop.input3"></me-input>
  </me-form-item>
</me-form>
<script>
export default {
  data() {
    return {
      formLeft: {
        input1: '',
        input2: '',
        input3: ''
      },
      formRight: {
        input1: '',
        input2: '',
        input3: ''
      },
      formTop: {
        input1: '',
        input2: '',
        input3: ''
      }
    }
  }
}
</script>

```
:::