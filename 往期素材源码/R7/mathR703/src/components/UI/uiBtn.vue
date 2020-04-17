<template>
  <div class="UI-btn" :class="classObj" :value="value" @click="clickEvent">
    <!--重置按钮-->
    <img src="static/UI/chongzhi@2x.png" v-if="type==='reset1'" alt="">
    <img src="static/UI/last@2x.png" v-if="type==='reset2'" alt="">
    <!--允许自定义内容-->
    <slot v-if="this.type!='radio' && this.type!='checkbox' && this.type!='switch'"></slot>
    <!--play--> <!--pause-->
    <img :src="playSrc" v-if="type==='play'" alt="">
    <!--单选框-->
    <span :class="{checked:value}" v-if="this.type==='radio'"><em></em></span>
    <p v-if="this.type==='radio'"> <slot></slot></p>
    <!--多选框-->
    <span :class="{checked:value}" v-if="this.type==='checkbox'"><img src="static/UI/nike@2x.png"/></span>
    <p v-if="this.type==='checkbox'"><slot></slot></p>
    <!--switch-->
    <p v-if="this.type==='switch'"><slot></slot></p>
    <span :class="{checked:value}" v-if="this.type==='switch'"><em></em></span>
  </div>
</template>

<script>
  export default{
    props: {
      type:String,//按钮类型，不填则为内联按钮样式，根据文字决定按钮大小
      size:String,//按钮大小，只有'big'，尺寸为240，后可继续增加
      value: { type: Boolean,default:false}//用v-model设置是否选中
    },
    components: {},
    created(){},
    watch:{
      //监听value的改变
      value(val){
        //如果是播放按钮，则点击改变图片
        if(this.type==='play'){
          if(val){this.playSrc = 'static/UI/play icon@2x.png';
          }else{this.playSrc = 'static/UI/Combined Shape@2x.png'}
        }
      },
    },
    computed:{
      //规定不同的type对应不同的class
      classObj(){
        return {
          'btn-48':this.type==='reset1' || this.type==='reset2',
          'btn-blue':this.type==='blue',
          'btn-240':this.size==='big' || this.size === '240',
          'UI-circle': this.type==='play',
          'btn-radio': this.type==='radio',
          'btn-checkbox': this.type==='checkbox',
          'btn-switch': this.type==='switch',
        }
      },
    },
    data(){
      return {
        playSrc:'static/UI/play icon@2x.png'
      }
    },
    methods: {
      //点击事件
      clickEvent(){
        this.$emit('input',!this.value)
      },
    },
  };
</script>

<style>
  .UI-btn {
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    line-height: 44px;
    font-size: 16px;
    color: #000000;
    display: inline-block;
    padding: 0 16px;
  }
  .btn-48 {
    width: 48px;
    height: 40px;
    padding: 0;
  }

  .btn-48 img {
    width: 24px;
    margin-top: 8px;
  }
  /*240宽度btn*/

  .btn-240 {
    width: 240px;
    height: 44px;
    padding: 0;
  }


  /*蓝色背景btn*/

  .btn-blue {
    background-color: #5badfd;
    color: #ffffff;
  }
  /*播放与暂停*/

  .UI-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #ffffff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.24);
    border: solid 0.5px rgba(0, 0, 0, 0.06);
    text-align: center;
    cursor: pointer;
  }

  .UI-circle img {
    width: 18px;
    height: 20px;
    margin-top: 20px;
    cursor: pointer;
  }

  /*单选*/

  .btn-radio {
    width: 240px;
    height: 44px;
    text-align: left;
    padding: 10px 12px;
  }

  .btn-radio span {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: #f0f0f0;
    border-radius: 50%;
    float: left;
    transition: all 0.2s;
  }

  .btn-radio p {
    font-size: 14px;
    color: #191919;
    float: left;
    width: calc(100% - 36px);
    line-height: 24px;
    margin-left: 12px;
  }

  .btn-radio span.checked {
    background-color: #5caefd;
  }
  .btn-radio span em {
    transition: all 0.1s 0.2s;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: block;
    margin: 7px auto;
  }
  .btn-radio span.checked em {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    display: block;
    margin: 7px auto;
  }
  /*多选*/

  .btn-checkbox {
    width: 240px;
    height: 44px;
    text-align: left;
    padding: 10px 12px;
  }

  .btn-checkbox span {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: #f0f0f0;
    border-radius: 4px;
    float: left;
    transition: all 0.2s;
  }

  .btn-checkbox span img {
    display: none;
    width: 14px;
    height: 10px;
    margin: 7px auto;
  }

  .btn-checkbox p {
    font-size: 14px;
    color: #191919;
    float: left;
    width: calc(100% - 36px);
    line-height: 24px;
    margin:-10px auto auto 12px;
  }

  .btn-checkbox span.checked {
    background-color: #5caefd;
  }

  .btn-checkbox span.checked img {
    display: block;

  }
  /*switch*/

  .btn-switch {
    width: 240px;
    height: 44px;
    text-align: left;
    padding: 9px 12px 9px 10px;
  }

  .btn-switch p {
    line-height: 26px;
    float: left;
    font-size: 14px;
    font-weight: 500;
    color: #4c4c4c;
  }

  .btn-switch span {
    width: 44px;
    height: 26px;
    border-radius: 26px;
    background-color: #f0f0f0;
    float: right;
    transition: all 0.3s;
  }

  .btn-switch span em {
    width: 20px;
    height: 20px;
    background-color: #ffffff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    border: solid 0.5px rgba(0, 0, 0, 0.06);
    display: block;
    border-radius: 50%;
    margin-top: 3px;
    margin-left: 3px;
    transition: all 0.4s 0.1s;
  }

  .btn-switch span.checked {
    background-color: #5caefd;
  }

  .btn-switch span.checked em {
    float: right;
    margin-top: 3px;
    margin-left: 0;
    margin-right: 3px;
  }


</style>
