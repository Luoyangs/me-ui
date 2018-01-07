<template>
  <div class="me-progress" 
    :class="['is-'+type,status?'is-'+status:'',{'widthout-text':!showText,'text-inside':textInside}]"
    :aria-valuenow="percentage"
    aria-valuemin="0"
    aria-valuemax="100"
    role="progressbar">
    <div class="bar" v-if="type==='line'">
      <div class="outer" :style="{height:strokeWidth+'px'}">
        <div class="inner" :style="{width:percentage+'%'}">
          <div class="innerText" v-if="showText && textInside">{{percentage}}%</div>
        </div>
      </div>
    </div>
    <div v-else class="circle" :style="{height:width+'px',width:width+'px'}">
      <svg viewBox="0 0 100 100">
        <path class="circle-track" :d="trackPath" stroke="#e5e9f2" :stroke-width="relativeStrokeWidth" fill="none"></path>
        <path class="circle-path" :d="trackPath" stroke-linecap="round" :stroke="stroke" :stroke-width="relativeStrokeWidth" fill="none" :style="circlePathStyle"></path>
      </svg>
    </div>
    <div class="text" v-if="showText && !textInside" :style="{fontSize:textSize}+'px'">
      <template v-if="!status">{{percentage}}%</template>
      <i v-else :class="'me-icon-'+iconClass"></i>
    </div>
  </div>
</template>
<script>
export default {
  name:'MeProgress',
  props:{
    type:{
      type:String,
      default:'line',
      validator:val => ['line','circle'].indexOf(val) > -1
    },
    percentage:{
      type:Number,
      default:0,
      required:true,
      validator:val => val >=0 && val <= 100
    },
    status:String,
    strokeWidth:{
      type:Number,
      default:5
    },
    textInside:Boolean,
    width:{
      type:Number,
      default:126
    },
    showText:{
      type:Boolean,
      default:true
    }
  },
  computed:{
    relativeStrokeWidth(){
      return (this.strokeWidth/this.width*100).toFixed(1);
    },
    trackPath(){
      var radius = parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);
      return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
    },
    perimeter(){
      var radius = 50 - parseFloat(this.relativeStrokeWidth) / 2;
      return 2 * Math.PI * radius;
    },
    circlePathStyle(){
      var perimeter = this.perimeter;
      return {
        strokeDasharray: `${perimeter}px,${perimeter}px`,
        strokeDashoffset: (1 - this.percentage / 100) * perimeter + 'px',
        transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      };
    },
    stroke(){
      var ret;
      switch (this.status) {
        case 'success':
          ret = '#13ce66';
          break;
        case 'error':
          ret = '#ff4949';
          break;
        default:
          ret = '#20a0ff';
      }
      return ret;
    },
    iconClass(){
      if(this.type === 'line'){
        return this.status === 'success' ? 'success':'cross';
      }else{
        return this.status === 'success' ? 'success':'close';
      }
    },
    textSize() {
      return this.type === 'line'
        ? 12 + this.strokeWidth * 0.4
        : this.width * 0.111111 + 2 ;
    }
  }
}
</script>