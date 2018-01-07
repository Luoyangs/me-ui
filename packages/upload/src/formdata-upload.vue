<script>
import ajax from './ajax';

export default {
  props:{
    type:String,
    action:String,
    name:{
      type:String,
      default:'file'
    },
    data:Object,
    headers:Object,
    withCredentials:Boolean,
    multiple:Boolean,
    accept:String,
    onStart:Function,
    onProgress:Function,
    onSuccess:Function,
    onError:Function,
    onPreview:Function,
    onRemove:Function,
    onExced:Function,
    beforeUpload:Function,
    fileList:Array,
    autoUpload:Boolean,
    listType:String,
    httpRequest:{
      type:Function,
      default:ajax
    },
    disabled:Boolean,
    limit:Number    
  },
  data(){
    return {
      reqs: {}
    }
  },
  methods:{
    handleClick(){
      if(!this.disabled){
        this.$refs.input.value = null;
        this.$refs.input.click();
      }
    },
    handleChange(ev){
      const files = ev.target.files;

      if(!files) return;
      this.uploadFiles(files);
    },
    uploadFiles(files){
      if(this.limit && this.fileList.length + files.length > this.limit){
        this.onExced &&  this.onExced(files,this.fileList);
        return;
      }

      let postFiles = Array.prototype.slice.call(files);
      if(!this.multiple) postFiles = postFiles.slice(0,1);
      if(postFiles.length === 0) return;

      postFiles.forEach(file => {
        this.onStart(file);
        if(this.autoUpload) this.upload(file);
      });
    },
    upload(file){
      this.$refs.input.value = null;

      if(!this.beforeUpload){
        return this.post(file);
      }

      const before = this.beforeUpload(file);
      if(before && before.then){
        before.then(item => {
          const fileType = Object.prototype.toString.call(item);
          if(fileType === '[object File]' || fileType === '[object Blob]'){
            this.post(item);
          }else {
            this.post(file);
          }
        },() => {
          this.onRemove(null,file);
        });
      }else if(before !== false){
        this.post(file);
      }else{
        this.onRemove(null,file);
      }
    },
    post(file){
      const {uid} = file;
      const options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: file,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: e => {
          this.onProgress(e, file);
        },
        onSuccess: res => {
          this.onSuccess(res,file)
        },
        onError: err => {
          this.onError(err,file);
          delete this.reqs[uid];
        }
      };

      const req = this.httpRequest(options);
      this.reqs[uid] = req;
      if(req && req.then){
        req.then(options.onSuccess,options.onError);
      }
    },
    abort(file){
      const {reqs} = this;
      if(file){
        let uid = file;
        if(file.uid) uid = file.uid;
        if(reqs[uid]){
          reqs[uid].abort();
        }
      }else{
        Object.keys(reqs).forEach(uid => {
          if(reqs[uid]) reqs[uid].abort();
          delete reqs[uid];
        });
      }
    }
  },
  render(h){
    let {handleClick,handleChange,name,multiple,accept,listType,uploadFiles,disabled} = this;
    const data = {
      class: {
        'me-upload': true
      },
      on: {
        click: handleClick
      }
    };
    data.class[`is-${listType}`] = true;

    return (
      <div {...data} tabindex="0">
        {this.$slots.default}
        <input class="me-upload-input" type="file" ref="input" name={name} on-change={handleChange} multiple={multiple} accept={accept} ></input>
      </div>
    );
  }
}
</script>