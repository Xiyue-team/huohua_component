<template>
   <div id="app" class="noselect">
      <div class="container">
         <!--头部-->
         <h3 v-html="title" class="app_title"></h3>
         <!--视图区-->
         <div class="ViewSpace">
            <div class="viewBox" :style="'zoom:'+zoom+';background-image:url('+src+')'">
               <div class="fog"></div>
               <div class="leftImg">
                  <div class="img1"  v-model='check1' :class="{ev:not1}" :type='blue1' :style="'opacity:'+po+';background-image:url('+bsrc1+')'" @click='btnClick(1)'></div>
                  <div class="img2"  v-model='check2' :class="{ev:not2}" :type="blue2" :style="'opacity:'+pe+';background-image:url('+bsrc2+')'" @click='btnClick(2)'></div>
               </div>
               <span class="lf1 fill"></span><span class="rf1 fill"></span>
               <div class="textDiv td1" :type='count1' :class="{op:fade1}" @click='setClick(1)'>
                  <p class="text" v-html='textSrcs[0].text'></p>
                  <div class="textImg" :style="'background-image:url('+textSrcs[0].src+')'">
                     <img :src='playSrc' class="play" v-if='played1'>
                  </div>
               </div>
               <span class="lf2 fill"></span><span class="rf2 fill"></span>
               <div class="textDiv td2" :type="count2" :class="{op:fade2}" @click='setClick(2)'>
                  <p class="text" v-html='textSrcs[1].text'></p>
                  <div class="textImg" :style="'background-image:url('+textSrcs[1].src+')'">
                     <img :src='playSrc' class="play" v-if='played2'>
                  </div>
               </div>
               <span class="lf3 fill"></span><span class="rf3 fill"></span>
               <div class="textDiv td3" :type="count3" :class="{op:fade3}" @click='setClick(3)'>
                  <p class="text1" v-html='textSrcs[2].text'></p>
                  <div class="bgImg" :style="'background-image:url('+textSrcs[2].bgsrc+')'">
                     <div class="textImg1" :style="'background-image:url('+textSrcs[2].src+')'"></div>
                     <div class="textImg1" :style="'background-image:url('+textSrcs[2].src1+')'"></div>
                     <img :src='playSrc' class="play play1" v-if='played3'>
                  </div>
               </div>
               <span class="lf4 fill"></span><span class="rf4 fill"></span>
               <div class="textDiv td4" :type="count4" :class="{op:fade4}" @click='setClick(4)'>
                  <p class="text" v-html='textSrcs[3].text'></p>
                  <div class="textImg" :style="'background-image:url('+textSrcs[3].src+')'">
                     <img :src='playSrc' class="play" v-if='played4'>
                  </div>
               </div>
               <span class="lf5 fill"></span><span class="rf5 fill"></span>
               <div class="textDiv td5" :type="count5" :class="{op:fade5}" @click='setClick(5)'>
                  <p class="text" v-html='textSrcs[4].text'></p>
                  <div class="textImg" :style="'background-image:url('+textSrcs[4].src+')'">
                     <img :src='playSrc' class="play" v-if='played5'>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget" id="button0"></ui-btn>
   </div>
</template>
<script type="text/javascript">
import uiBtn from '@/components/UI/uiBtn'; //按钮
var SET;
export default {
   name: 'app',
   components: {
      uiBtn,
   },
   data() {
      return {
         title: '基因工程的原理',
         zoom: {}, //区域大小
         blue1: '',
         blue2: '',
         count1: '',
         count2: '',
         count3: '',
         count4: '',
         count5: '',
         num:0,
         changeop:0,
         check1: true,
         check2: true,
         played1:false,
         played2:false,
         played3:false,
         played4:false,
         played5:false,
         blue: 0,
         count: 0,
         po:1,
         pe:1,
         src: 'static/img/bg.png',
         bsrc1: 'static/img/btn1.png',
         bsrc2: 'static/img/btn2.png',
         playSrc:'static/img/play.png',
         fade1: true,
         fade2: true,
         fade3: true,
         fade4: true,
         fade5: true,
         not1:false,
         not2:false,
         timer1:null,
         timer2:null,
         timer3:null,
         timer4:null,
         timer5:null,
         timer6:null,
         timer7:null,
         textSrcs: [{
               text: '取出DNA',
               src: '',
            },
            {
               text: '限制酶切断DNA',
               src: '',
            },
            {
               text: '连接酶连接DNA',
               src: '',
               src1: '',
               bgsrc:''
            },
            {
               text: '重组DNA分子导入受体细胞',
               src: '',
            },
            {
               text: '目的基因表达',
               src: '',
            }
         ],

         arrdp:[
            'static/img/dp-1.png',
            'static/img/dp-2.png',
            'static/img/dp-3.png',
         ],
         arrxp:[
            'static/img/xp-1.png',
            'static/img/xp-2.png',
            'static/img/xp-3.png',
         ],
         arrdxp:[
            'static/img/dxp-1.png',
            'static/img/dxp-2.png',
         ],
         arrdg:[
            'static/img/dg-1.gif',  
            'static/img/dg-2.gif'    
         ],
         arrxg:[
            'static/img/xg-1.gif',   
            'static/img/xg-2.gif'
         ],
         arrdxg:[
            'static/img/dxg-1.gif', 
            'static/img/dxg-2.gif',    
            'static/img/dxg-3.gif'
         ],
      }
   },
   created() {
      document.title = this.title;
   },
   mounted() {
      this.getViewSize();
      window.addEventListener('resize', () => {
         this.getViewSize();
      })
   },
   computed: {},
   watch: {
      num(v){
         if(v == 1){
            this.po=1;
            this.pe=1;
         }
         if(v ==2){
            this.fade3=false;
            this.not1=true;
            this.not2=true;
            this.played3=true;
            
         }
      },
      changeop(v){
         if(v == 2){
            this.po=1;
            this.pe=1;
         }
      }
   },
   methods: {

      imgL(src, callback) {
         var img = new Image();
         img.src = src+'?'+Math.random();
         img.onload = function() {
            callback && callback(img.src);
         }
      },
      btnClick(val) {
         if (this.blue == val) {
            return;
         }
         this.blue = val;
         if (val == 1) {
            if (this.check1) {
               this.played1 = true;
               $('.fog').css('display','none');
               this.pe=0.5;
               this.not1=true;
               this.not2=true;
               this.check2=false;
               this.bsrc1 = 'static/img/btn1-h.png';
               this.imgL(this.arrdp[0], (src) => {
                  this.textSrcs[0].src = src;
                  this.fade1 = false;
               })
               this.textSrcs[0].text='取出质粒';
               this.changeop++;
            }
         }
         if (val == 2) {
            if (this.check2) {
               this.played1 = true;
               $('.fog').css('display','none');
               this.po=0.5;
               this.not1=true;
               this.not2=true;
               this.check1=false;
               this.bsrc2 = 'static/img/btn2-h.png';
               this.imgL(this.arrxp[0], (src) => {
                  this.textSrcs[0].src = src;
                  this.fade1 = false;
               })
               this.textSrcs[0].text='取出DNA';
               this.changeop++;
            }
         }
      },
      setClick(val) {
         if (this.count == val) {
            return;
         }
         this.count = val;
         if (val == 1) {
            if(this.check1){
               this.imgL(this.arrdg[0], (src) => {
                  this.played1=false;
                  this.textSrcs[0].src = src;
                  clearTimeout(this.timer1);
                  this.timer1 = setTimeout(() =>{
                     this.textSrcs[0].src = '';
                     this.fade1 = true;
                     this.textSrcs[1].src = this.arrdp[1];
                     this.fade2 = false;
                     this.played2=true;
                  },5450);
               });
            }
            if(this.check2){
                  this.imgL(this.arrxg[0], (src) => {
                  this.played1=false;
                  this.textSrcs[0].src = src;
                  clearTimeout(this.timer2);
                  this.timer2 = setTimeout(() =>{
                     this.textSrcs[0].src = '';
                     this.fade1 = true;
                     this.textSrcs[1].src = this.arrxp[1];
                     this.fade2 = false;
                     this.played2=true;
                  },5000);
               });
            }
         }
         else if(val == 2){
            if(this.check1){
                  this.imgL(this.arrdg[1], (src) => {
                  this.played2=false;
                  this.textSrcs[1].src = src;
                  clearTimeout(this.timer3);
                  this.timer3 = setTimeout(() =>{
                     this.textSrcs[1].src = '';
                     this.fade2=true;
                     this.textSrcs[2].src = this.arrdp[2];
                     this.check2= true;
                     this.not2=false;
                     this.pe=1;
                     this.po=1;
                     this.num++;
                  },4000);
                });  
             }
            if(this.check2){
               this.imgL(this.arrxg[1], (src) => {
                  this.played2=false;
                  this.textSrcs[1].src = src;
                  clearTimeout(this.timer4);
                  this.timer4=setTimeout(() =>{
                     this.textSrcs[1].src = '';
                     this.fade2=true;
                     this.textSrcs[2].src1 = this.arrxp[2];
                     this.check1=true;
                     this.not1=false;
                     this.po=1;
                     this.pe=1;
                     this.num++;
                  },3450);
                });  
            }
         }
         else if(val == 3){
            this.imgL(this.arrdxg[0], (src) =>{
               this.played3=false;
               this.textSrcs[2].src = '';
               this.textSrcs[2].src1 = '';
               this.textSrcs[2].bgsrc = src;
               clearTimeout(this.timer5);
               this.timer5=setTimeout(() =>{
                  this.textSrcs[2].bgsrc = '';
                  this.fade3=true;
                  this.textSrcs[3].src = this.arrdxp[0];
                  this.fade4=false;
                  this.played4=true;
               },4500);
               });
         }
         else if(val == 4){
            this.imgL(this.arrdxg[1], (src) =>{
               this.played4=false;
               this.textSrcs[3].src = src;
               clearTimeout(this.timer6);
               this.timer6=setTimeout(()=>{
                  this.textSrcs[3].src = '';
                  this.fade4=true;
                  this.textSrcs[4].src = this.arrdxp[1];
                  this.fade5=false;
                  this.played5=true;
               },4390);
            });
         }
         else if(val == 5){
            this.imgL(this.arrdxg[2], (src) =>{
               this.played5=false;
               this.textSrcs[4].src = src;
               clearTimeout(this.timer7);
               this.timer7 =setTimeout(()=>{
                  this.fade5=true;
               },5900);
            });
         }
      },

      //计算区块大小
      getViewSize() {
         const W = window.innerWidth - 30;
         const H = window.innerHeight - 72;
         if (W / H >= 1093 / 545) {
            this.zoom = H / 545
         } else {
            this.zoom = W / 1093
         }
      },
      //重置
      resetWidget() {
         clearTimeout(this.timer1);
         clearTimeout(this.timer2);
         clearTimeout(this.timer3);
         clearTimeout(this.timer4);
         clearTimeout(this.timer5);
         clearTimeout(this.timer6);
         clearTimeout(this.timer7);
         this.textSrcs[0].src = '';
         this.textSrcs[1].src = '';
         this.textSrcs[2].src = '';
         this.textSrcs[2].src1 = '';
         this.textSrcs[2].bgsrc = '';
         this.textSrcs[3].src = '';
         this.textSrcs[4].src = '';
         this.blue1= '';
         this.blue2= '';
         this.count1= '';
         this.count2= '';
         this.count3= '';
         this.count4= '';
         this.count5= '';
         this.blue=0;
         this.count= 0;
         this.changeop=0;
         this.po=1;
         this.pe=1;
         this.check1=true;
         this.check2=true;
         this.num=0;
         this.bsrc1= 'static/img/btn1.png';
         this.bsrc2= 'static/img/btn2.png';
         this.fade1= true;
         this.fade2= true;
         this.fade3= true;
         this.fade4= true;
         this.fade5= true;
         this.not1=false;
         this.not2=false;
         this.played1=false;
         this.played2=false;
         this.played3=false;
         this.played4=false;
         this.played5=false;
         this.textSrcs[0].text='取出DNA';
         $('.fog').css('display','block');
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

input,
button {
   outline: none;
   -webkit-appearance: none;
   border-radius: 0;
}

canvas {
   outline: none;
}






/*盒模型，padding尺寸不用再减去*/

*,
*:before,
*:after {
   -moz-box-sizing: border-box;
   -webkit-box-sizing: border-box;
   box-sizing: border-box;
   -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
   -webkit-tap-highlight-color: transparent;
}

html,
body,
#app {
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

.container {
   width: 100%;
   height: 100%;
   background-repeat: no-repeat;
   background-size: cover;
   background-color: #000;
}

.container h3 {
   font-size: 24px;
   color: #fff;
   line-height: 1.0;
   padding: 20px;
   font-weight: normal;
}

.aside_reset {
   margin: 20px 20px;
   float: right;
}

#button0 {
   position: fixed;
   right: 0;
   top: 0;
}

.ViewSpace {
   width: calc(100% - 30px);
   margin: 0 15px;
   height: calc(100% - 72px);
   position: relative;
}

.ViewSpace .viewBox {
   width: 1093px;
   height: 545px;
   position: absolute;
   top: 0px;
   bottom: 0px;
   left: 0px;
   right: 0px;
   background-size: contain;
   background-repeat: no-repeat;
   background-position: center;
   background-origin: content-box;
   margin: auto;
}
.fog{
   position: absolute;
   width: 956px;
   height: 100%;
   z-index: 9999;
   right: 0px;
   top: 0;
   background-color: #000;
   opacity: 0.6;
}

.leftImg {
   position: absolute;
   z-index: 9px;
   width: 130px;
   height: 375px;
   top: 34px;
   text-align: center;
}

.leftImg div {
   width: 120px;
   height: 120px;
   display: inline-block;
   background-size: contain;
   background-repeat: no-repeat;
   background-position: center;
   background-origin: content-box;
   position: relative;
   cursor: pointer;
}

.img1 {
   top: 90px;
}

.img2 {
   top: 110px;
}

.textDiv {
   position: absolute;
   z-index: 9;
   text-align: center;
   color: #000;
}

.fill {
   position: absolute;
   width: 46px;
   height: 34px;
   z-index: 999;
}

.lf1 {
   top: 2px;
   left: 158px;
}

.rf1 {
   top: 2px;
   left: 401px;
}

.lf2 {
   top: 2px;
   left: 488px;
}

.rf2 {
   top: 2px;
   left: 732px;
}

.lf3 {
   top: 2px;
   left: 828px;
}

.rf3 {
   top: 2px;
   left: 1027px;
}

.lf4 {
   top: 275px;
   left: 488px;
}

.rf4 {
   top: 275px;
   left: 732px;
}

.lf5 {
   top: 275px;
   left: 158px;
}

.rf5 {
   top: 275px;
   left: 401px;
}

.td1 {
   left: 160px;
   top: 2px;
}

.td2 {
   left: 490px;
   top: 2px;
}

.td3 {
   left: 840px;
   top: 2px;
}

.td4 {
   left: 490px;
   top: 274px;
}

.td5 {
   left: 160px;
   top: 274px;
}

.textDiv p.text {
   display: inline-block;
   width: 199px;
   height: 35px;
   line-height: 25px;
   font-family: PingFangSC-Medium;
   font-size: 14px;
   cursor: pointer;
}

.textDiv .textImg {
   width: 286px;
   height: 176px;
   background-size: contain;
   background-repeat: no-repeat;
   background-position: center;
   background-origin: content-box;
   cursor: pointer;
   position: relative;
   left: 0;
   top: 0;
}

.textDiv p.text1 {
   display: inline-block;
   width: 155px;
   position: absolute;
   left: 33px;
   height: 34px;
   line-height: 25px;
   font-family: PingFangSC-Medium;
   font-size: 14px;
   cursor: pointer;
}

.textDiv .textImg1 {
   width: 220px;
   height: 225px;
   position: relative;
   right: 0;
   top: 0;
   z-index: 999;
   background-size: contain;
   background-repeat: no-repeat;
   background-position: center;
   background-origin: content-box;
   cursor: pointer;

}

.textDiv .bgImg{
   display: inline-block;
   position: absolute;
   top: 33px;
   left: 0px;
   width: 220px;
   height: 450px;
   z-index: 999;
   background-size: contain;
   background-repeat: no-repeat;
   background-position: center;
   background-origin: content-box;
   cursor: pointer;
}



.textDiv.op {
   color: #bbb;
   pointer-events: none;
}
.ev{
   pointer-events: none;
}
.play{
   width: 65px;
   height: 65px;
   text-align: center;
   position: absolute;
   opacity: 0.9;
   top: 70%;
   left: 65%;
   margin-top: -64px;
   margin-left: -78px;
}
.play1{
   top: 58%;
   left: 70%;
}

</style>