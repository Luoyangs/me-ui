<script>
export default {
  props:{
    type:String,
    data:{},
    action:String,
    name:{
      type:String,
      default:'file'
    },
    withCredentials:Boolean,
    accept:String,
    onStart:Function,
    onProgress:Function,
    onSuccess:Function,
    onError:Function,
    beforeUpload:Function,
    onPreview:Function,
    onRemove:Function,
    onExced:Function,
    listType:String,
    disabled:Boolean,
    limit:Number
  },
  data(){
    return {
      domain:'',
      files: null,
      submitting:false,
      frameName: 'frame-'+Date.now()
    }
  },
  methods:{
    handleClick(){
      if(!this.disabled){
        this.$refs.input.click();
      }
    },
    handleChange(ev){
      const files = ev.target.value;
      if(files){
        this.uploadFiles(files);
      }
    },
    uploadFiles(files){
      //判断是否超过最大允许上传个数
      if(this.limit && this.$parent.uploadFiles.length + files.length > this.limit){
        this.onExced && this.onExced(this.fileList);
        return;
      }

      if(this.submitting) return;
      this.submitting = true;
      this.files = files;
      this.onStart(files);

      const formNode = this.$refs.form;
      const formdataNode = this.$refs.data;
      let data = this.data;

      if(typeof data === 'function'){
        data = data(files);
      }

      const inputs = [];
      for(let key in data){
        if(data.hasOwnProperty(key)){
          inputs.push(`<input name="${key}" value="${data[key]}"/>`);
        }
      }

      formdataNode.innerHTML = inputs.join('');
      formNode.submit();
      formdataNode.innerHTML = '';
    }
  },
  mounted(){
    !this.$isServer && window.addEventListener('message',(ev) =>{
      if(!this.files) return;

      var origin = new URL(this.action).origin;
      if(ev.origin !== origin) return;

      var response = ev.data;
      if(response.result === 'success'){
        this.onSuccess(response,this.files);
      }else if(response.result === 'failed'){
        this.onError(response,this.files);
      }

      this.submitting = false;
      this.files = null;
    });
  },
  render(h){
    const {uploadFiles,listType,frameName,disabled} = this;
    const classes = {'me-upload':true};
    classes[`is-${listType}`] = true;

    return (
      <div class={classes} on-click={this.handleClick}>
        <iframe on-load={this.onload} ref="iframe" name={frameName}></iframe>
        <form ref="form" action={this.action} target={frameName} enctype="multipart/form-data" method="POST">
          <input class="mu-input" type="file" ref="input" on-change={this.handleChange} accept={this.accept} />
          <input type="hidden" name="documentDomain" value={this.$isServer ? '' : document.domain} />
          <span ref="data"></span>
        </form>
        { this.$slots.default }
      </div>
    );
  }
}
</script>