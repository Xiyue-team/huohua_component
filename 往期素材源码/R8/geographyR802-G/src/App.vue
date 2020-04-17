<template>
  <div id="app" class="noselect">
    <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget" id="button0"></ui-btn>
    <h3 v-html="title" class="app_title"></h3>
    <transition name="show">
      <div class="container" v-show="show1">
        <!--视图区-->
        <div class="ViewSpace">
          <div :style="[zoom]" class="viewBox">
            <div class="wrap" :style="'background-image:url('+wrapUrl+');'"></div>
            <div class="bt" v-show='b1' style="top:178px;left:411px;" @click="choose(1)"><img src="static/img/bt.png" ></div>
            <div class="bt" v-show='b2' style="top:260px;left:586px;" @click="choose(2)"><img src="static/img/bt.png" ></div>
            <div class="bt" v-show='b3' style="top:80px;left:72px;" @click="choose(3)"><img src="static/img/bt.png" ></div>
          </div>
        </div>
      </div>
    </transition>
      <!--侧边按钮区-->
    <!--<transition name="show">-->
      <!--<div class="app_aside" v-show="show1">-->
        <!--&lt;!&ndash;重制按钮&ndash;&gt;-->
        <!--&lt;!&ndash;清除浮动&ndash;&gt;-->
        <!--<div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">-->
          <!--<ui-btn :type="blue1" style="margin-bottom: 20px;" @click.native='clickEvent(1)'>风海流</ui-btn>-->
          <!--<ui-btn :type="blue2" style="margin-bottom: 20px;" @click.native='clickEvent(2)'>补偿流</ui-btn>-->
          <!--<ui-btn :type="blue3" style="margin-bottom: 20px;" @click.native='clickEvent(3)'>密度流</ui-btn>-->
        <!--</div>-->
      <!--</div>-->
    <!--</transition>-->
    <transition name="show">
      <div id="view" v-show="show2">
          <div id="GIF" :style="'background-image:url('+src+');zoom:'+zoomF">
            <div :style="'position:absolute;right:10px;width:40px;height;40px;cursor: pointer;'" @click="closeG"><img src="static/UI/close.png" :style="'width:40px;height;40px;'"></div>
            <div id="play" v-show="played" @click="choose(4)">
              <img src="static/UI/play.png" :style="'width:41px;height;auto;'">
            </div>
          </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/javascript">
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider';
import uiGroup from '@/components/UI/uiGroup';
var TIM=null;
export default {
  name: 'app',
  components: {
    uiBtn,
    uiSlider,
    uiGroup
  },
  data() {
    return {
      title: '洋流的成因',
      // BtnSpaceStyle: 'flex',
      zoom: {}, //区域大小
      blue1:'',
      blue2:'',
      blue3:'',
      wrapUrl: './static/img/0.png',
      show1:true,
      show2:false,
      src:'',
      zoomF:1,
      played:false,
      b1:true,
      b2:true,
      b3:true,
    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    this.resize();
    this.setSideStyle();
    this.getViewSize();
  },
  methods: {
    clickEvent(num) {
        this.blue1='';
        this.blue2='';
        this.blue3='';
        this.b1=false;
        this.b2=false;
        this.b3=false;
        this['blue'+num]='blue';
        this['b'+num]='blue';
        this.imgL('./static/img/'+num+'.png',(src)=>{
            this.wrapUrl=src;
        });
    },
    closeG(){
        clearTimeout(TIM);
        this.show1=true,
        this.show2=false,
        this.src='',
        this.played=false;
    },
    choose(num){
        if(num==4){
            num=this.chooseN;
        }
        this.played=false;
        this.chooseN=num;
        var tim=0;
        if(num==1){
            tim=13000;
        }else if(num==2){
            tim=20000;
        }else if(num==3){
            tim=15000;
        }
        this.ImgL1('./static/img/'+num+'.gif',tim);
    },
    ImgL1(src,tim){
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
    imgL(src, callback) {
      var img = new Image();
      img.src = src;
      img.onload = function() {
        callback && callback(img.src);
      }
    },
    //计算侧边
    setSideStyle() {
      // const el = document.getElementById('btn_space')
      // if (el && el.scrollHeight > el.offsetHeight) {
      //   this.BtnSpaceStyle = 'block'
      // } else {
      //   this.BtnSpaceStyle = 'flex'
      // }
    },
    //计算区块大小
    getViewSize() {
      const W = window.innerWidth;
      const H = window.innerHeight - 72;
      if (W / H >= 775 / 470) {
        this.zoom = {
          zoom: H / 470
        }
      } else {
        this.zoom = {
          zoom: W / 775
        }
      }
      var W1 = window.innerWidth;
      if (W1/H >= 1020/382) {
          this.zoomF=H/382;
      } else {
          this.zoomF=W1/1020;
      }
    },
    //窗口大小更改
    resize() {
      const vm = this;
      window.addEventListener('resize', function() {
        vm.setSideStyle();
        vm.getViewSize();
      })
    },
    //重置
    resetWidget() {
        clearTimeout(TIM);
        this.blue1='';
        this.blue2='';
        this.blue3='';
        this.imgL('./static/img/0.png',(src)=>{
            this.wrapUrl=src;
        });
        this.show1=true,
        this.show2=false,
        this.src='',
        this.played=false;
        this.b1=true;
        this.b2=true;
        this.b3=true;
    },
  },
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

input, button {
  outline: none;
  -webkit-appearance: none;
  border-radius: 0;
}

canvas {
  outline: none;
}


/*盒模型，padding尺寸不用再减去*/

*, *:before, *:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}

html, body, #app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  background-color: #fff;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.noselect {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Chrome/Safari/Opera */
  -khtml-user-select: none;
  /* Konqueror */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently not supported by any browser */
}


/*ui*/

.UI-camera {
  width: 80px;
  height: 80px;
  cursor: pointer;
}

.clearfix:after {
  content: '';
  display: block;
  clear: both;
}


/*内容区*/

.container {
  width: 100%;
  float: left;
  height: calc(100% - 72px);
}

 h3 {
  font-size: 24px;
  color: #000;
  line-height: 1.0;
  padding: 24px;
  font-weight: normal;
   position: relative;
   z-index: 88;
}

.app_aside {
  float: right;
  width: 200px;
  height: calc(100% - 72px);
}

.aside_reset {
  margin: 20px 24px;
  float: right;
  position: relative;
  z-index: 99;
}

#button0 {
  position: fixed;
  right: 0;
  top: 0;
}

.btn_space {
  padding: 20px;
  width: 100%;
  height: 100%;
  clear: both;
  /*display: flex;*/
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
}

.btn_space .UI-btn {
  /*margin-bottom: 15px;*/
  line-height: 44px;
}

.btn_space .UI-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn_space h3 {
  font-size: 18px;
  font-weight: normal;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
}

.UI-btn.btn-blue {
  color: #000;
}
sup {
  font-size: 14px;
  color: #373334;
}
sup.small {
  color: #FF546B;
}

/*视图区*/

.ViewSpace {
  width: 100%;
  height: calc(100% - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;
}
.ViewSpace .viewBox {
  width: 705px;
  height: 430px;
  position: relative;
}
.wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size:contain;
}
.bt{
  width: 40px;
  height: 40px;
  position: absolute;
  z-index: 66;
  cursor: pointer;
}
.bt>img{
  width: 100%;
  height: auto;
}
#view{
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 55;
  top:0;
}
#GIF{
  position: absolute;
  width:908px;
  height:382px;
  top:0;
  bottom:0;
  left:0;
  right:0;
  margin: auto;
  background: #FFFFFF;
  border: 1px solid rgba(201,201,201,0.26);
  box-shadow: 0 1px 2px 0 rgba(108,108,108,0.34);
  border-radius: 5px;
  padding: 10px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-origin: content-box;
}
#play{
  width:41px;
  height: 41px;
  position: absolute;
  bottom:8px;
  right:9px;
  cursor: pointer;
}

.show-enter-active{
  transition: all .5s
}

.show-enter, .show-leave-to {
  transform: scale(0, 0);
}
</style>