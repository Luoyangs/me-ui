<template>
  <div 
    class="me-checkbox" 
    :class="[
      size ? 'is-' + size : '',
      {'is-disabled':isDisabled},
      {'is-bordered':border},
      {'is-checked':isChecked} ]">
    <label 
      :class="[
        size ? 'is-' + size : '',
        {'is-disabled':isDisabled},
        {'is-bordered':border}
      ]"
      role="checkbox"
      :id="id">
      <input class="input" :disabled="isDisabled" v-model="model" @blur="focus=false" @focus="focus=true" @change="handleChange" :value="label" type="checkbox" :name="name">
      <span class="label">{{label}}</span>
    </label>
  </div>
</template>
<script>
import Emitter from '../../../src/mixins/emitter';

export default {
  name:'MeCheckbox',
  mixins:[Emitter],
  props:{
    label:{},
    value:{},
    all:Boolean,
    disabled:Boolean,
    checked:Boolean,
    name:String,
    id:String,// 当all为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系
    border:Boolean,
    size:String
  },
  data(){
    return {
      controls:false, //当all为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系
      selfModel:false,
      focus:false
    }
  },
  computed:{
    model:{
      get(){
        return this.isGroup ? this.store : (this.value !== undefined ? this.value : this.selfModel);
      },
      set(val){
        if(this.isGroup){
          this.dispatch('MeCheckboxGroup','input',[val])
        }else{
          this.$emit('input',val);
          this.selfModel = val;
        }
      }
    },
    isChecked(){
      if({}.toString.call(this.model)=== '[object Boolean]'){
        return this.model;
      }else if(Array.isArray(this.model)){
        return this.model.indexOf(this.label) > -1;
      }
    },
    isGroup(){
      let parent = this.$parent;
      while(parent){
        if(parent.$options.name !== 'MeCheckboxGroup'){
          parent = parent.$parent;
        }else{
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },
    store(){
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },
    isDisabled(){
      return this.isGroup ? this._checkboxGroup.disabled || this.disabled : this.disabled;
    }
  },
  methods:{
    handleChange(event){
      this.$emit('change',event.target.checked,event);
      this.$nextTick(() => {
        if(this.isGroup){
          this.dispatch('MeCheckboxGroup','change',[this._checkboxGroup.value]);
        }
      });
    }
  },
  created(){
    if(this.checked){
      if(Array.isArray(this.model) && this.model.indexOf(this.label) === -1){
        this.model.push(this.label);
      }else{
        this.model = true;
      }
    }
  }
}
</script>
