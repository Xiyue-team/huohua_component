<template>
  <div id="app" class="noselect">
    <!--头部-->
    <ui-head :title="title">
      <ui-btn type="reset1" @click.native="resetWidget"></ui-btn>
    </ui-head>
    <!--模型区域-->
    <div class="container">
      <div class="main">
        <div class="imgContainer">
          <div class="img" :style="'background:rgba(238,68,41,'+colorFun()+')'">
            <img v-show="gas!=''" :src="gas" alt="" class="gasCSS">
            <img v-show="goods!=''" :src="goods" alt="" class="goodsCSS">
            <img v-show="file!=''" :src="file" alt="" class="fileCSS">
          </div>
        </div>
        <div class="combustibles">
          <ui-group type="radio"
                    :groups="groups1"
                    v-model="radio1"></ui-group>
          <p v-if="radio1 === 'one' || radio1 === 'three'">可燃物</p>
          <p v-if="radio1 === 'two'">非可燃物</p>
        </div>
        <div class="noCombustion">
          <ui-group type="radio"
                    :groups="groups"
                    v-model="radio"></ui-group>
          <p v-if="radio === 'two'">助燃剂</p>
          <p v-if="radio === 'one'">非助燃剂</p>
        </div>
        <div class="thermo">
          <div class="thermometer" :style="thermometerBg">
            <ui-slider direction="vertical"
                       :boxWidth="60"
                       :boxHeight="285"
                       :title="false"
                       :noBlueProcess="true"
                       :zoom="zoomF"
                       :realTime="true"
                       v-model="value"
                       :processWidth="10" style="margin-bottom: 65px;z-index:999"></ui-slider>
            <p v-if="wu">温度</p>
            <p v-if="fireShow">温度达到着火点</p>
            <p v-if="none">温度未达到着火点</p>
          </div>
          <div class="gradient" :style="'background-image:url(static/UI/thermometerBg1.png);'"></div>
          <div class="gradient gradientBG" :style="'top:'+(-height)+'px;background-image:url(static/UI/thermometerBg3.png);'"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  import uiSlider from '@/components/UI/uiSlider';//按钮
  import uiGroup from '@/components/UI/uiGroup';//按钮
  export default {
    name: 'app',
    components: {uiHead,uiBtn,uiSlider,uiGroup},
    data(){
      return{
        title:'探究燃烧条件',
        zoomF:(window.innerWidth-80)/(window.innerHeight-140)>1000/420?(window.innerHeight-140)/420:(window.innerWidth-80)/1000,
        thermometerBg:{
          background:'url(static/UI/thermometerBg2.png) 50% 50% no-repeat',
          backgroundSize:'108px 320px'
        },
        value:0,
        color:'',
        height:0,
        fireShow:false,
        none:false,
        wu:false,
        goods:'',
        gas:'',
        file:'',
        radio:'',
        radio1:'',
        groups:[{
          name:'one',
          img:'static/UI/n.png',
          margin:'60px 0 0 0',
          width:'60px',
        },{
          name:'two',
          img:'static/UI/o.png',
          margin:'60px 0 91px 0',
          width:'73px',
        }],
        groups1:[{
          name:'one',
          img:'static/UI/woodBg.png',
          margin:'20px 0 0 0',
        },{
          name:'two',
          img:'static/UI/naBg.png',
          margin:'20px 0 0 0',
        },{
          name:'three',
          img:'static/UI/lBg.png',
          margin:'20px 0 70px 0',
        }]
      }
    },
    created(){
      document.title='探究燃烧条件'
    },
    mounted(){
      this.setSideStyle();
      window.addEventListener('resize', ()=>{
        this.setSideStyle();
      });
    },
    watch:{
      value(val){
        if(val > 0 && this.radio1 === 'two'){
          this.wu = true;
        }else if(val > 0 && this.radio1 === ''){
          this.wu = true;
        }else {
          this.wu = false;
        }
        this.height = val*2.36;
        this.color=val/100;
        this.imgShow();
      },
      radio(val){
        this.imgShow();
        if(val === 'one'){
          this.gas = 'static/UI/ng.gif';
        }else if(val === 'two'){
          this.gas = 'static/UI/og.gif';
        }
      },
      radio1(val){
        if(this.value != 0){
          if(val !== 'two'){
            this.wu = false;
          }else {
            this.wu = true;
          }
        }
        this.imgShow();
        if(val === 'one'){
          this.goods = 'static/UI/wood.png';
        }else if(val === 'two'){
          this.goods = 'static/UI/na.png';
        }else if(val === 'three'){
          this.goods = 'static/UI/l.png';
        }
      },
    },
    computed:{},
    methods: {
      colorFun () {
        return this.color === ''?0.15:this.color/3+0.15;
      },
      imgShow(){
        if(this.radio1 === 'one' && this.radio === 'two' && this.value >81){
          this.file = 'static/UI/yellowfire.gif';
        }else if(this.radio1 === 'three' && this.radio === 'two' && this.value >12){
          this.file = 'static/UI/bluefire.gif';
        }else {
          this.file = '';
        }
        if(this.radio1 === 'one' && this.value >81){
          this.fireShow = true;
        }else if(this.radio1 === 'three' &&  this.value >12){
          this.fireShow = true;
        }else {
          this.fireShow = false;
        }
        if((this.radio1 === 'one' && this.value <= 81 && this.value != 0) || (this.radio1 === 'three' && this.value <= 12 && this.value != 0)){
          this.none = true;
        }else{
          this.none = false;
        }
      },
      //重置
      resetWidget(){
        this.value=0;
        this.color='';
        this.fireShow=false;
        this.none=false;
        this.goods='';
        this.gas='';
        this.file='';
        this.radio='';
        this.radio1='';
      },
      setSideStyle(){
        var W=window.innerWidth-80;
        var H=window.innerHeight-140;
        if( W/H > 1000/420){
          this.zoomF=H/420;
        }else{
          this.zoomF=W/1000;
        }
        $('.main').css({
          zoom:this.zoomF,
        });
      },
    },
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  li{
    list-style: none;
  }
  input,button{
    outline: none;
    -webkit-appearance: none;
    border-radius: 0;
  }
  /*盒模型，padding尺寸不用再减去*/
  *,
  *:before,
  *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
  }
  html,body,#app{
    width:100%;
    height: 100%;
    overflow: hidden;
    font-family: "PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif;
    background-color:#fff;
    touch-action: none;
    -ms-touch-action: none;
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently not supported by any browser */
  }
  /*内容区*/
  .container{
    width:100%;
    height:100%;
    position: relative;
  }
  .main{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 1000px;
    height: 420px;
    overflow: hidden;
  }
  .imgContainer{
    width: 442px;
    height: 410px;
    background: #FFFFFF;
    border: 1px solid rgba(151,151,151,0.22);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.17);
    border-radius: 6px;
    margin: 4px 20px 5px 0;
    float: left;
    position: relative;
  }
  .img{
    width: 422px;
    height: 390px;
    margin: 10px auto;
    position: relative;
  }
  .combustibles{
    width: 180px;
    height: 354px;
    background: #FFFFFF;
    border: 1px solid rgba(151,151,151,0.22);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.17);
    border-radius: 6px;
    float: left;
    margin-top: 4px;
  }
  .noCombustion{
    width: 180px;
    height: 354px;
    background: #FFFFFF;
    border: 1px solid rgba(151,151,151,0.22);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.17);
    border-radius: 6px;
    margin: 4px 15px;
    float: left;
  }
  .noCombustion img{
    height: 49px;
    margin-top: 10px;
  }
  .thermo{
    width: 140px;
    height: 354px;
    background: #FFFFFF;
    float: left;
    margin-top: 4px;
    position: relative;
  }
  .thermometer{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0px;
    z-index: 999;
    border: 1px solid rgba(151,151,151,0.22);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.17);
    border-radius: 6px;
  }
  .thermometer img{
    width: 28px;
    height: 40px;
    position: absolute;
    bottom: 30px;
    left: 28px;
  }
  .gradient{
    width: 100%;
    height:100%;
    position: absolute;
    top:0;
    left:15px;
    z-index: 666;
    background-size:108px 320px;
    background-repeat: no-repeat;
    background-position:  50% 50%;
  }
  .gradientBG{
    z-index: 777;
  }
  .combustibles img{
    width: 120px;
    height:84px;
  }
  .main p{
    text-align: center;
  }
  .goodsCSS{
    width: 240px;
    height: 153px;
    position: absolute;
    bottom: 40px;
    left: 95px;
  }
  .gasCSS{
    width: 422px;
    height: 390px;
    z-index: 2;
    position: absolute;
  }
  .fileCSS{
    width: 273px;
    height: 323px;
    z-index: 1;
    position: absolute;
    opacity: 0.7;
    bottom: 65px;
    left: 70px;
  }
</style>
