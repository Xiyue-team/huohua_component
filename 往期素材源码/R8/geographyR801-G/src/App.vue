<template>
  <div id="app" class="noselect">
    <!--头部-->
    <ui-head :title="title" style="background-color: #fff; box-shadow: none;" >
      <ui-btn type="reset1" @click.native="resetWidget" id="button1"></ui-btn>
    </ui-head>
    <!--模型区域-->
    <div class="container">
        <div id="view">
          <div id="IMG" v-show="show1">
            <div :style="'margin-right:10px;background-image:url(./static/img/1.png)'" @click="choose(1)"></div>
            <div :style="'margin-right:10px;background-image:url(./static/img/2.png)'" @click="choose(2)"></div>
            <div :style="'background-image:url(./static/img/3.png)'" @click="choose(3)"></div>
          </div>
          <transition name="show">
            <div id="GIF" v-show="show2" :style="'background-image:url('+src+')'">
              <div id="play" v-show="played" @click="choose(4)">
                <img src="static/UI/play.png" :style="'width:44px;height;auto;'">
              </div>
            </div>
          </transition>
        </div>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  var TIM;
  export default {
    name: 'app',
    components: {uiHead,uiBtn},
    data(){
      return{
        title:'洋流的成因',
        BtnSpaceStyle: 'flex',
        show1:true,
        show2:false,
        src:'',
        played:false,
        chooseN:0
      }
    },
    mounted(){
      this.resize();
      this.getViewSize();
    },
    created() {
      document.title = this.title;
    },
    methods: {
      choose(num){
          if(num==4){
              num=this.chooseN;
          }
          this.played=false;
          this.chooseN=num;
          var tim=0;
          if(num==1){
              tim=6500;
          }else if(num==2){
              tim=7600;
          }else if(num==3){
              tim=8700;
          }
          this.ImgL('./static/img/'+num+'.gif',tim);
      },
      ImgL(src,tim){
        var I=new Image();
        I.src=src+'?'+Math.random();
        I.onload=()=>{
            this.show1=false;
            this.show2=true;
            this.src=I.src;
            TIM=setTimeout(()=>{
                clearTimeout(TIM);
                this.played=true;
            },tim)
        }
      },
      resetWidget(){
          clearTimeout(TIM);
          this.show1=true;
          this.show2=false;
          this.src='';
          this.chooseN=0;
      },
      //计算区块大小
      getViewSize() {
        var W = window.innerWidth;
        var H = window.innerHeight - 72;
        var zoom=1;
        if (W/H >= 1020/382) {
          zoom=H/382;
        } else {
          zoom=W/1020;
        }
        $('#view').css('zoom',zoom);
      },
      //窗口大小更改
      resize() {
        const vm = this;
        window.addEventListener('resize', function () {
          vm.getViewSize();
        })
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
  canvas{
    outline: none;
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
    height: calc(100% - 76px);
    position: relative;
  }
  #view{
    width:1020px;
    height: 382px;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
  }
  #IMG{
    width:980px;
    height:100%;
    margin-left: 20px;
    margin-top: -20px;
    position: absolute;
  }
  #IMG>div{
    width:320px;
    height:320px;
    background: #FFFFFF;
    border: 1px solid rgba(201,201,201,0.26);
    box-shadow: 0 1px 2px 0 rgba(108,108,108,0.34);
    border-radius: 5px;
    margin-top: 31px;
    float: left;
    padding: 10px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-origin: content-box;
    cursor: pointer;
  }
  #GIF{
    position: absolute;
    width:908px;
    height:382px;
    background: #FFFFFF;
    border: 1px solid rgba(201,201,201,0.26);
    box-shadow: 0 1px 2px 0 rgba(108,108,108,0.34);
    border-radius: 5px;
    margin-left: 56px;
    margin-top: -20px;
    padding: 10px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-origin: content-box;
  }
  #play{
    width:44px;
    height: 44px;
    position: absolute;
    bottom:8px;
    right:10px;
    cursor: pointer;
  }
  .show-enter-active {
    transition: all .5s
  }
  .show-enter, .show-leave-to {
    transform: scale(0, 0);
  }
</style>
