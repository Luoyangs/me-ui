<template>
  <div class="me-radio-group" role="radio-group" @keydown="handleKeydown">
    <slot></slot>
  </div>
</template>
<script>
import Emitter from '../../../src/mixins/emitter';

const keyCode = Object.freeze({
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
});  
  
export default {
  name:'MeRadioGroup',
  mixins:[Emitter],
  props:{
    value:{},
    disabled:Boolean
  },
  methods:{
    handleKeydown(e){
      const target = e.target;
      const className = target.nodeName === 'INPUT' ? '[type=radio]' : '[role=radio]';
      const radios = this.$el.querySelectorAll(className);
      const length = radios.length;
      const index = [].indexOf.call(radios, target);
      const roleRadios = this.$el.querySelectorAll('[role=radio]');
      switch (e.keyCode) {
        case keyCode.LEFT:
        case keyCode.UP:
          e.stopPropagation();
          e.preventDefault();
          if (index === 0) {
            roleRadios[length - 1].click();
          } else {
            roleRadios[index - 1].click();
          }
          break;
        case keyCode.RIGHT:
        case keyCode.DOWN:
          if (index === (length - 1)) {
            e.stopPropagation();
            e.preventDefault();
            roleRadios[0].click();
          } else {
            roleRadios[index + 1].click();
          }
          break;
        default:
          break;
      }
    }
  },
  created(){
    this.$on('handleChange',value => {
      this.$emit('change',value);
    });
  },
  watch:{
    value(val){
      this.dispatch('MeFormItem','on-form-change',[this.value]);
    }
  }
}
</script>