<template>
  <div class="me-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>
<script>
import Emitter from '../../../src/mixins/emitter';

export default {
  name:'MeCheckboxGroup',
  mixins:[Emitter],
  props:{
    value:{},
    disabled:Boolean
  },
  watch:{
    value(val){
      this.dispatch('MeFormItem','on-form-change',[val]);
    }
  }
}
</script>
