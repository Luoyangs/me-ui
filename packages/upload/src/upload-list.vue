<template>
  <transition-group tag="ul" :class="['me-upload-list','is-'+listType,{'is-disabled':disabled}]" name="me-list">
    <li v-for="(file,index) in files" :class="['mul-item','is-'+file.status]" :key="index">
      <img v-if="file.status !== 'uploading' && ['picture','card'].indexOf(listType) > -1" :src="file.url" alt="" class="muli-thumbnail">
      <span class="muli-name">{{file.name}}</span>
      <span class="status"><i class="me-icon-success muli-icon"></i></span>
      <i class="me-icon-close muli-icon" v-if="!disabled" @click="$emit('remove',file)"></i>
      <me-progress v-if="file.status === 'uploading'" :type="listType === 'card'?'circle':'line'" :stroke-width="listType=== 'card' ? 6 : 2" :percentage="file.percentage"></me-progress>
      <span class="muli-actions" v-if="listType === 'card'">
        <i class="me-icon-eye muli-icon" v-if="handlePreview && listType === 'card'" @click="handlePreview(file)"></i>
        <i class="me-icon-delete muli-icon" @click="$emit('remove',file)"></i>
      </span>
    </li>
  </transition-group>
</template>
<script>
import MeProgress from '../../progress';

export default{
  props:{
    files:{
      type:Array,
      default(){
        return [];
      }
    },
    listType:{
      type:String,
      validator(val){
        return ['text','picture','card'].indexOf(val) > -1;
      }
    },
    disabled:Boolean,
    handlePreview:Function
  },
  components:{
    MeProgress
  }
}
</script>