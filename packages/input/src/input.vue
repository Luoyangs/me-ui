<template>
  <div :class="wrapClass">
    <template v-if="type !== 'textarea'">
      <div class="group-prepend" v-if="prepend" v-show="slotReady"><slot name="prepend"></slot></div>  
      <i class="icon" :class="'me-icon-'+icon" v-if="icon" @click="handleIconClick"></i>
      <input
        :id="eleId"
        :autocomplete="autocomplete"
        :spellcheck="spellcheck"
        :type="type"
        :class="inputClass"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        :readonly="readonly"
        :name="name"
        v-bind="$props"
        :value="currentValue"
        :number="number"
        @keyup.enter="handleEnter"
        @keyup="handleKeyup"
        @keypress="hanleKeypree"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @change="handleChange"
        ref="input">
      <div class="group-append" v-if="append" v-show="slotReady"><slot name="append"></slot></div>
    </template>
    <textarea
      v-else
      :id="eleId"
      :autocomplete="autocomplete"
      :spellcheck="spellcheck"
      :class="textareaClass"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :maxlength="maxlength"
      :readonly="readonly"
      :name="name"
      :style="textareaStyles"
      v-bind="$props"
      :value="currentValue"
      @keyup.enter="handleEnter"
      @keyup="handleKeyup"
      @keypress="hanleKeypree"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @change="handleChange"
      ref="textarea"></textarea>
  </div>
</template>
<script>
import calcTextareaHeight from '../../../src/utils/calcTextareaHeight';
import Emitter from '../../../src/mixins/emitter';

function oneOf(value,array){
  for (var i = 0; i < array.length; i++) {
    if(array[i] === value){
      return true;
    }
  }
  return false;
}

function findComponentUpward(context,componentName,componentNames){
  if(typeof componentName === 'string'){
    componentNames = [componentName];
  }else{
    componentNames = componentName;
  }

  let parent = context.$parent;
  let name = parent.$options.name;
  while(parent && (!name || componentNames.indexOf(name) === -1)){
    parent = parent.$parent;
    if(parent){
      name = parent.$options.name;
    }
  }
  return parent;
}

export default {
  name:'MeInput',
  mixins:[Emitter],
  props:{
    type:{
      validator(value){
        return oneOf(value,['text','password','textarea']);
      },
      default:'text'
    },
    value:{
      type:[String,Number],
      default:''
    },
    placeholder:{
      type:String,
      default:''
    },
    maxlength:Number,
    disabled:{
      type:Boolean,
      default:false
    },
    icon:String,
    autosize:{
      type:[Boolean,Object],
      default:true
    },
    rows:{
      type:Number,
      default:4
    },
    readonly:{
      type:Boolean,
      default:false
    },
    name:String,
    number:{
      type:Boolean,
      default:false
    },
    spellcheck:{
      type:Boolean,
      default:false
    },
    autocomplete:{
      validator(value){
        return oneOf(value,['on','off']);
      },
      default:'off'
    },
    eleId:String
  },
  data(){
    return {
      currentValue:this.value,
      prepend: true,
      append: true,
      slotReady: false,
      textareaStyles: {}
    }
  },
  computed:{
    wrapClass(){
      return [
        'me-input-wrapper',
        {
          'me-input-group':this.prepend|| this.append,
          'group-width-prepend':this.prepend,
          'group-width-append':this.append,
          'hide-icon':this.append
        }
      ];
    },
    inputClass(){
      return [
        'me-input',
        {
          'me-input-disabled':this.disabled
        }
      ]
    },
    textareaClass(){
      return [
        'me-input',
        'me-textarea',
        {
          'me-input-disabled':this.disabled
        }
      ]
    }
  },
  methods:{
    handleEnter(event){
      this.$emit('enter',event);
    },
    handleKeydown(event){
      this.$emit('keydown',event);
    },
    hanleKeypree(event){
      this.$emit('keypress',event);
    },
    handleKeyup(event){
      this.$emit('keyup',event);
    },
    handleFocus(event){
      this.$emit('focus',event);
    },
    handleBlur(event){
      this.$emit('blur',event);
      if(!findComponentUpward(this,['DatePicker','TimePicker','Search'])){
        this.dispatch('MeFormItem','form-blur',this.currentValue);
      }
    },
    handleIconClick(event){
      this.$emit('click',event);
    },
    handleInput(event){
      let value = event.target.value;
      if(this.number){
        value = Number.isNaN(Number(value))?value:Number(value)
      }
      this.$emit('input',value);
      this.setCurrentValue(value);
    },
    handleChange(event){
      this.$emit('change',event.target.value);
    },
    setCurrentValue(value){
      if(value === this.currentValue) return;
      this.$nextTick(() => {
        this.resizeTextarea();
      });

      this.currentValue = value;
      if(!findComponentUpward(this,['DatePicker','TimePicker','Search'])){
        this.dispatch('MeFormItem','on-form-change',this.currentValue);
      }
    },
    resizeTextarea(){
      const autosize = this.autosize;
      if(!autosize || this.type !== 'textarea'){
        return false;
      }

      const minRows = autosize.minRows;
      const maxRows = autosize.maxRows;
      this.textareaStyles = calcTextareaHeight(this.$refs.textarea,minRows,maxRows);
    }
  },
  watch:{
    value(val){
      this.setCurrentValue(val);
    }
  },
  mounted(){
    if(this.type !== 'textarea'){
      this.prepend = this.$slots.prepend!== undefined;
      this.append = this.$slots.append !== undefined;
    }else{
      this.prepend = false;
      this.append = false;
    }
    this.slotReady = true;
    this.resizeTextarea();
  }
}
</script>