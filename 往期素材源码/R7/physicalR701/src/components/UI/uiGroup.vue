<template>
  <div :value="value">
      <ui-btn :id="item.id" v-for="(item,index) in groups"
              :key="item.name"
              :value="item.name === value"
              @click.native="clickEvent(item)"
              :style="{marginBottom:index === groups.length-1?0: (margin || 10) +'px',display:'block'}"
              :type="type">
        {{item.txt}}
      </ui-btn>
    <slot></slot>
  </div>

</template>

<script>
  import UiBtn from '@/components/UI/uiBtn';
  export default {
    props: {
      value: String,
      groups:Array,
      type:String,
      margin:Number,
    },
    components: {UiBtn},
    data () {
      return {}
    },
    watch:{},
    created(){},
    methods:{
      clickEvent(item){
          this.$emit('input',item.name)
          this.$emit('callback',item.name)
      },
    },
  }
</script>

<style>
  /*组合控件*/
  .switchWithSlider{
    width: 350px;
    height: 108px;
    border-radius: 6px;
    background-color: #ffffff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    border: solid 1px rgba(0, 0, 0, 0.06);
  }
  .switchWithSlider .uiSlider,
  .switchWithSlider .UI-btn{
    float: left;
  }
  .switchWithSlider .UI-btn{
    width: 100px;
    height: 100%;
    background-color: transparent;
    box-shadow:none;
    border-radius: 0;
    cursor: pointer;
    padding: 0;
    text-align: center;
    border-left: solid 1px rgba(0, 0, 0, 0.08);
  }
  .switchWithSlider .UI-btn p{
    font-size: 16px;
    font-weight: 500;
    line-height: 1.0;
    text-align: center;
    color: #4d4d4d;
    float: none;
    width:100%;
    padding-top: 12px;
    padding-bottom: 30px;
  }
  .switchWithSlider .UI-btn span{
    float: none;
    display: inline-block;
  }
</style>

