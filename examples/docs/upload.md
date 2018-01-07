<script>
  export default {
    data() {
      return {
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          status: 'finished'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          status: 'finished'
        }],
        fileList2: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          status: 'finished'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          status: 'finished'
        }],
        fileList3: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          status: 'finished'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          status: 'finished'
        }],
        imageUrl: '',
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      beforeUpload(file) {
        if (file.size > 40000000) {
          console.warn(file.name + ' is too large!');
          return false;
        }
        return true;
      },
      handlePreview(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3);
      },
      handleExced(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      }
    }
  }
</script>




## Upload 上传组件
支持FormData和Iframe两种兼容性上传方式，采用POST方式提交数据到服务器


### 点击上传
通过 slot 你可以传入自定义的上传按钮类型和文字提示。可通过设置 `limit` 和 `on-exced` 来限制上传文件的个数和定义超出限制时的行为。 

<div class="demo-block">
  <me-upload class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  multiple
  :limit="3"
  :on-exced="handleExced"
  :file-list="fileList">
  <me-button size="small" type="primary">点击上传</me-button>
  <div slot="tip" class="upload-tip">只能上传jpg/png文件，且不超过500kb</div>
  </me-upload>
</div>


### 用户头像上传

使用 `before-upload` 限制用户上传的图片格式和大小。

<div class="demo-block">
  <me-upload 
    class="avatar-uploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="me-icon-add avatar-uploader-icon"></i>
  </me-upload>
</div>
<style>
  .avatar-uploader .me-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .me-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


### 照片墙

使用 `list-type` 属性来设置文件列表的样式。

<div class="demo-block">
  <me-upload class="avatar-uploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    list-type="card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove">
    <i class="me-icon-add"></i>
  </me-upload>
</div>


### 图片列表缩略图

<div class="demo-block">
  <me-upload class="avatar-uploader"
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList2"
    list-type="picture">
    <me-button size="small" type="primary">点击上传</me-button>
    <div slot="tip" class="upload-tip">只能上传jpg/png文件，且不超过500kb</div>
  </me-upload>
</div>


### 上传文件列表控制

通过 `on-change` 钩子函数来对列表进行控制

<div class="demo-block">
  <me-upload
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-change="handleChange"
    :file-list="fileList3">
    <me-button size="small" type="primary">点击上传</me-button>
    <div slot="tip" class="upload-tip">只能上传jpg/png文件，且不超过500kb</div>
  </me-upload>
</div>


### 手动上传
<div class="demo-block">
  <me-upload
    class="upload-demo"
    ref="upload"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="false">
    <me-button slot="trigger" size="small" type="primary">选取文件</me-button>
    <me-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</me-button>
    <div slot="tip" class="upload-tip">只能上传jpg/png文件，且不超过500kb</div>
  </me-upload>
</div>
