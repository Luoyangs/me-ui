<template>
  <div 
    class="me-radio" 
    :class="[
      {'is-disabled':isDisabled},
      {'is-bordered':border},
      {'is-checked':model === label} ]"
      role="radio">
    <label>
      <input class="input" :disabled="isDisabled" v-model="model" @blur="focus=false" @focus="focus=true" @change="handleChange" :value="label" type="radio" :name="name">
      <span class="label">{{label}}</span>
    </label>
  </div>
</template>
<script>
import Emitter from '../../../src/mixins/emitter';

export default {
  name:'MeRadio',
  mixins:[Emitter],
  props:{
    value:{},
    label:{},
    disabled:Boolean,
    name:String,
    border:Boolean
  },
  data(){
    return {
      focus:false
    }
  },
  computed:{
    isGroup(){
      let parent = this.$parent;
      while(parent){
        if(parent.$options.name !== 'MeRadioGroup'){
          parent = parent.$parent;
        }else{
          this._radioGroup = parent;
          return true;
        }
      }
      return false;
    },
    model:{
      get(){
        return this.isGroup ? this._radioGroup.value : this.value;
      },
      set(val){
        if(this.isGroup){
          this.dispatch('MeRadioGroup','input',[val]);
        }else{
          this.$emit('input',val);
        }
      }
    },
    isDisabled(){
      return this.isGroup ? this._radioGroup.disabled || this.disabled : this.disabled;
    }
  },
  methods:{
    handleChange(){
      this.$nextTick(() => {
        this.$emit('change',this.model);
        this.isGroup && this.dispatch('MeRadioGroup','handleChange',this.model)
      });
    }
  }
}
</script>