<template>
  <component :is="spinnerView"></component>
</template>
<script>
const SPINNERS = {
  BUBBLES:{
    render(createElement){
      return createElement('span',{
        attrs:{
          class:'loading-bubbles'
        }
      },Array.apply(Array,Array(8)).map(() => createElement('span',{
        attrs:{
          class:'bubble-item'
        }
      })));
    }
  },
  CIRCLES:{
    render(createElement){
      return createElement('span',{
        attrs:{
          class:'loading-circle'
        }
      },Array.apply(Array,Array(8)).map(() => createElement('span',{
        attrs:{
          class:'circle-item'
        }
      })));
    }
  },
  DEFAULT:{
    render(createElement){
      return createElement('i',{
        attrs:{
          class:'loading-default'
        }
      });
    }
  },
  SPIRAL:{
    render(createElement){
      return createElement('i',{
        attrs:{
          class:'loading-spiral'
        }
      });
    }
  },
  WAVEDOTS:{
    render(createElement){
      return createElement('span',{
        attrs:{
          class:'loading-wavedots'
        }
      },Array.apply(Array,Array(5)).map(() => createElement('span',{
        attrs:{
          class:'wave-item'
        }
      })));
    }
  }
};
export default {
  name:'spinner',
  props:{
    spinner:String
  },
  computed:{
    spinnerView(){
      return SPINNERS[(this.spinner || '').toUpperCase()] || SPINNERS.BUBBLES;
    }
  }
}
</script>