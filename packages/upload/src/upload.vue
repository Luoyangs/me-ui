<script>
import UploadList from './upload-list.vue';
import FormdataUpload from './formdata-upload.vue';
import IframeUpload from './iframe-upload.vue';

function noop(){};

export default {
  name: 'MeUpload',
  components:{
    UploadList,
    FormdataUpload,
    IframeUpload
  },
  props:{
    action:String,
    headers:{
      type:Object,
      default(){
        return {};
      }
    },
    data:Object,
    multiple:Boolean,
    name:{
      type:String,
      default:'file'
    },
    withCredentials:Boolean,
    showFileList:{
      type:Boolean,
      default:true
    },
    accept:String,
    type:{
      type:String,
      default:'select'
    },
    beforeUpload:Function,
    onRemove:{
      type:Function,
      default:noop
    },
    onChange:{
      type:Function,
      default:noop
    },
    onPreview:{
      type:Function,
      default:noop
    },
    onProgress:{
      type:Function,
      default:noop
    },
    onSuccess:{
      type:Function,
      default:noop
    },
    onError:{
      type:Function,
      default:noop
    },
    onExced:{
      type:Function,
      default:noop
    },
    fileList:{
      type:Array,
      default(){
        return [];
      }
    },
    autoUpload:{
      type:Boolean,
      default:true
    },
    listType:{
      type:String,
      default:'text'
    },
    httpRequest:Function,
    disabled:Boolean,
    limit:Number
  },
  data(){
    return {
      uploadFiles: [],
      tempIndex: 1
    }
  },
  watch:{
    fileList:{
      immediate: true,
      handler(fileList){
        this.uploadFiles = fileList.map(item => {
          item.uid = item.uid || (Date.now() + this.tempIndex++);
          item.status = 'success';
          return item;
        });
      }
    }
  },
  methods:{
    handleStart(file){
      file.uid = Date.now() + this.tempIndex++;
      let item = {
        status: 'uploading',
        name: file.name,
        size: file.size,
        percentage: 0,
        uid: file.uid,
        raw: file
      };

      try {
        item.url = URL.createObjectURL(file);
      } catch (err) {
        console.log(err);
        return err;
      }

      this.uploadFiles.push(item);
      this.onChange(item,this.uploadFiles);
    },
    handleProgress(ev, rawFile) {
      const file = this.getFile(rawFile);
      this.onProgress(ev, file, this.uploadFiles);
      file.status = 'uploading';
      file.percentage = ev.percent || 0;
    },
    handleSuccess(res,file){
      const item = this.getFile(file);

      if(item){
        item.status = 'success';
        item.response = res;

        this.onSuccess(res,item,this.uploadFiles);
        this.onChange(item,this.uploadFiles);
      }
    },
    handleError(err,file){
      const item = this.getFile(file);
      const fileList = this.uploadFiles;

      item.status = 'fail';
      fileList.splice(fileList.indexOf(item),1);

      this.onError(err,item,this.uploadFiles);
      this.onChange(item,this.uploadFiles);
    },
    handleRemove(file,raw){
      if(raw) file = this.getFile(raw);

      this.abort(file);
      let fileList = this.uploadFiles;
      fileList.splice(fileList.indexOf(file),1);
      this.onRemove(file,fileList);
    },
    getFile(file){
      let fileList = this.uploadFiles;
      let target;
      
      fileList.every(item => {
        target = file.uid === item.uid ? item : null;
        return !target;
      });
      return target;
    },
    abort(file){
      this.$refs['upload-inner'].abort(file);
    },
    clearFiles(){
      this.uploadFiles = [];
    },
    submit(){
      this.uploadFiles
        .filter(file =>file.status === 'ready')
        .forEach(file => {
          this.$refs['upload-inner'].upload(file.raw);
        });
    }
  },
  render(h){
    let uploadList;

    if(this.showFileList){
      uploadList = (
        <UploadList
          disabled={this.disabled} 
          listType={this.listType} 
          files={this.uploadFiles} 
          on-remove={this.handleRemove} 
          handlePreview={this.onPreview}>
        </UploadList>
      );
    }

    const uploadData = {
      props:{
        type: this.type,
        action: this.action,
        multiple: this.multiple,
        'before-upload': this.beforeUpload,
        'with-credentials': this.withCredentials,
        headers: this.headers,
        name: this.name,
        data: this.data,
        accept: this.accept,
        fileList: this.uploadFiles,
        autoUpload: this.autoUpload,
        listType: this.listType,
        disabled: this.disabled,
        limit: this.limit,
        'on-exced': this.onExced,
        'on-start': this.handleStart,
        'on-progress': this.handleProgress,
        'on-success': this.handleSuccess,
        'on-error': this.handleError,
        'on-preview': this.onPreview,
        'on-remove': this.handleRemove,
        'http-request': this.httpRequest
      },
      ref: 'upload-inner'
    };

    const trigger = this.$slots.trigger || this.$slots.default;
    const uploadComponent = (typeof FormData !== 'undefined' || this.$isServer)
      ? <FormdataUpload {...uploadData}>{trigger}</FormdataUpload>
      : <IframeUpload {...uploadData}>{trigger}</IframeUpload>;

    return (
      <div>
        {this.listType === 'card' ? uploadList : ''}
        {this.$slots.trigger ? [uploadComponent,this.$slots.default]:uploadComponent}
        {this.$slots.tip}
        {this.listType !== 'card' ? uploadList : ''}
      </div>
    );
  }
}
</script>