<template>
  <form :class="className" :autocomplete="autocomplete"><slot></slot></form>
</template>
<script>
function oneOf(value,array){
  for (var i = 0; i < array.length; i++) {
    if(array[i] === value){
      return true;
    }
  }
  return false;
}

export default {
  name:'MeForm',
  props:{
    model:Object,
    rules:Object,
    labelWidth:Number,
    labelPosition:{
      validator(value){
        return oneOf(value,['left','right','top','bottom']);
      },
      default:'right'
    },
    inline:{
      type:Boolean,
      default:false
    },
    showMessage:{
      type:Boolean,
      default:true
    },
    autocomplete:{
      validator(value){
        return oneOf(value,['on','off']);
      },
      default:'off'
    }
  },
  data(){
    return {
      fields: []
    }
  },
  computed:{
    className(){
      return [
        'me-form',
        `label-${this.labelPosition}`,
        {
          'inline':this.inline
        }
      ];
    }
  },
  watch:{
    rules(){
      this.validate();
    }
  },
  methods:{
    resetFields(){
      this.fields.forEach(field =>{
        field.resetField();
      });
    }, 
    validate(callback){
      return new Promise(resolve =>{
        let valid = true;
        let count = 0;

        this.fields.forEach(field => {
          field.validate('',errors =>{
            if(errors){
              valid = false;
            }
            if(++count === this.fields.length){
              resolve(valid);
              if(typeof callback === 'function'){
                callback(valid);
              }
            }
          });
        });
      });
    },
    validateField(prop,callback){
      const field = this.fields.filter(field => field.prop === prop)[0];
      if(!field){
        throw new Error('[warn]:must call validateField with valid prop string!');
      }

      field.validate('',callback);
    }
  },
  created(){
    this.$on('on-form-item-add',(field)=>{
      if(field){
        this.fields.push(field);
      }
      return false;
    });
    this.$on('on-form-item-remove',(field)=>{
      if(field.prop){
        this.fields.splice(this.fields.indexOf(field),1);
      }
      return false;
    });
  }
}
</script>