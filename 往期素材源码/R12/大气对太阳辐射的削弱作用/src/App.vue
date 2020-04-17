<template>
  <div id="app" class="noselect">
    <!--头部-->
    <h3 v-html="title" class="app_title"></h3>
    <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
    <div class="container" :style="'height:'+H+'px'">
      <!--视图区-->
      <div class="View" :style="'width:'+VW+'px;height:'+VH+'px'">
        <div class="ViewSpace" :style="'transform: scale('+zoomF+')'">
          <div class="dqUp">
            <img src="static/UI/air.png" draggable="false" alt="大气上界">
          </div>
          <ul class="bigArrow">
            <li v-for="items in itemsA">
              <img :src="items.src" draggable="false" alt="大箭头">
            </li>
          </ul>
          <ul class="middleArrow middleArrowA">
            <li v-for="items in itemsB">
              <img :src="items.src" draggable="false" alt="中箭头1">
            </li>
          </ul>
          <ul class="middleArrow middleArrowB">
            <li v-for="items in itemsB">
              <img :src="items.src" draggable="false" alt="中箭头2">
            </li>
          </ul>
          <ul class="smallArrow">
            <li v-for="items in itemsC">
              <img :src="items.src" draggable="false" alt="小箭头">
            </li>
          </ul>
          <ul class="member">
            <li v-for="items in itemD">
              <img :src="items.src" draggable="false" alt="分子" id="dnaMove">
            </li>
          </ul>
          <ul class="dust">
            <li v-for='items in itemE'>
              <img :src="items.src1" draggable="false">
              <img :src="items.src2" draggable="false">
            </li>
          </ul>
          <div class="cloud">
            <img :src="cloudSrc" draggable="false" alt="云层">
          </div>
          <div class="animateBox">
            <img :src="src" draggable="false">
          </div>
          <div class="radioGroup">
            <ui-group type="radio" :groups="groups" v-model="radio" @callback="choose"></ui-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiGroup from '@/components/UI/uiGroup'; //按钮
export default {
  name: 'app',
  components: {
    uiBtn,
    uiGroup
  },
  data() {
    return {
      title: '大气对太阳辐射的削弱作用',
      H: window.innerHeight - 72,
      VW: 0,
      VH: 0,
      zoomF: 0,
      radio: "",
      radio1: false,
      radio2: false,
      radio3: false,
      timer: null,
      timer1: null,
      SET1: null,
      SET2: null,
      SET3: null,
      SET4: null,
      SET:null,
      src:'static/img/0.jpg',
      num: 0,
      totalNum: '',
      prefix: '',
      prefixO: '',
      cloudSrc: 'static/UI/yun.png',
      itemsA: [{
          src: 'static/UI/a1.png'
        },
        {
          src: 'static/UI/a1.png'
        },
        {
          src: 'static/UI/a1.png'
        }
      ],
      itemsB: [{
          src: 'static/UI/a2.png'
        },
        {
          src: 'static/UI/a2.png'
        },
        {
          src: 'static/UI/a2.png'
        }
      ],
      itemsC: [{
          src: 'static/UI/a3.png'
        },
        {
          src: 'static/UI/a3.png'
        },
        {
          src: 'static/UI/a3.png'
        }
      ],
      itemD: [{
          src: 'static/UI/2.png'
        },
        {
          src: 'static/UI/2.png'
        },
        {
          src: 'static/UI/2.png'
        },
        {
          src: 'static/UI/2.png'
        },
        {
          src: 'static/UI/2.png'
        },
        {
          src: 'static/UI/2.png'
        }
      ],
      itemE: [{
          src1: 'static/UI/bigSrc.png',
          src2: 'static/UI/smallSrc.png'
        },
        {
          src1: 'static/UI/bigSrc.png',
          src2: 'static/UI/smallSrc.png'
        },
        {
          src1: 'static/UI/bigSrc.png',
          src2: 'static/UI/smallSrc.png'
        },
        {
          src1: 'static/UI/bigSrc.png',
          src2: 'static/UI/smallSrc.png'
        },
        {
          src1: 'static/UI/bigSrc.png',
          src2: 'static/UI/smallSrc.png'
        }
      ],
      groups: [{
          name: '1',
          imgSrc: ' static/UI/1.png',
          txt: '云'
        },
        {
          name: '2',
          imgSrc: ' static/UI/2.png',
          txt: '气体分子'
        },
        {
          name: '3',
          imgSrc: ' static/UI/3.png',
          txt: '尘埃颗粒'
        }
      ],
    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    this.getViewSize();
     this.src = 'static/img/0.jpg';
    window.addEventListener('resize', () => {
      this.getViewSize();
    })
  },
  watch: {
    radio(v) {
      if (this.radio == 1) {
        $('.cloud').stop().animate({ 'opacity': 1 }, 800, () => {
          $('.middleArrowA').addClass('animated fadeInDown');
          $('.smallArrow').addClass('animated  fadeInLeftUp');
        });
        clearInterval(this.timer);
        clearInterval(this.timer1);
        clearTimeout(this.SET1);
        clearTimeout(this.SET2);
        clearTimeout(this.SET3);
        clearTimeout(this.SET4);
        $('.animateBox').css({'background':'#fff'});
        $('.member').stop(true).css({ 'opacity': 0 });
        $('.middleArrowB').removeClass('animated fadeInDown');
        $('.member li').removeClass('redFilter');
        $('.dust').stop(true).css({ 'opacity': 0 });
        $('.dust li').children("img:first-child").removeClass('light1');
        $('.dust li').children("img:last-child").removeClass('light2');
      } else if (this.radio == 2) {
        $('.member').stop().animate({ 'opacity': 1 }, 500, () => {
          $('.middleArrowB').addClass('animated fadeInDown');
          this.SET1 = setTimeout(() => {
            this.Animate($('.member li'), 6, 'img');
          }, 1000)
          this.SET2 = setTimeout(() => {
            $('.member li').addClass('redFilter');
          }, 2000)
        });
        clearInterval(this.timer1);
        clearTimeout(this.SET3);
        clearTimeout(this.SET4);
        $('.animateBox').css({'background':'#fff'});
        $('.cloud').stop(true).css({ 'opacity': 0 });
        $('.middleArrowA').removeClass('animated fadeInDown');
        $('.smallArrow').removeClass('animated  fadeInLeftUp');
        $('.dust').stop(true).css({ 'opacity': 0 });
        $('.dust li').children("img:first-child").removeClass('light1');
        $('.dust li').children("img:last-child").removeClass('light2');

      } else if (this.radio == 3) {
        
        $('.dust').stop().animate({ 'opacity': 1 }, 800, () => {
          this.SET3 = setTimeout(() => {
            this.Animate1($('.dust li'), 5, 'img');
          }, 1000);
          this.SET4 = setTimeout(() => {
            $('.dust li').children("img:first-child").addClass('light1');
            $('.dust li').children("img:last-child").addClass('light2');
          }, 2000)
        });
        $('.animateBox').css({'background':'#333'});
        clearInterval(this.timer);
        clearTimeout(this.SET1);
        clearTimeout(this.SET2);
        $('.cloud').stop(true).css({ 'opacity': 0 });
        $('.middleArrowA').removeClass('animated fadeInDown');
        $('.smallArrow').removeClass('animated  fadeInLeftUp');
        $('.member').stop(true).css({ 'opacity': 0 });
        $('.middleArrowB').removeClass('animated fadeInDown');
        $('.member li').removeClass('redFilter');
      }

    }
  },
  methods: {
    choose(v){
      clearTimeout(this.SET);
      if(v==1){
        this.totalNum = 297;
        this.prefix = 'a';
        this.imgAni('a'); 
      }
      else if(v==2){
        this.totalNum = 149;
        this.prefix = 'b';
        this.imgAni('b'); 
      }else if(v==3){
        this.totalNum = 174;
        this.prefix = 'c';
        this.imgAni('c'); 
      }
    },
   
    imgAni(type) {
      let thiz = this;
      if (type != this.prefixO) {
        this.num = 0;
      }
      this.prefixO = type;
      function ani() {
        if (thiz.num > thiz.totalNum) {
          thiz.num = 0;
          clearTimeout(thiz.SET);
          thiz.SET=null;
          return;
        }
        thiz.preloadImage(`static/img/${thiz.prefix+thiz.num}.jpg`).then((path) => {
          if(thiz.SET!=null){
            thiz.src = path;
          }
        });
        thiz.num++;
        thiz.SET = setTimeout(ani, 80);
      }
      ani();
    },
     preloadImage(path) {
      return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => resolve(path);
        image.onerror = reject;
        image.src = path;
      })
    },
    //重置
    resetWidget() {
      
      
      clearInterval(this.timer);
      clearInterval(this.timer1);
      clearTimeout(this.SET1);
      clearTimeout(this.SET2);
      clearTimeout(this.SET3);
      clearTimeout(this.SET4);    
      clearTimeout(this.SET);
      this.SET = null;
      this.num= 0;
      this.src = 'static/img/0.jpg';
      this.radio = "";
      this.totalNum= '';
      this.prefix= '';
      this.prefixO= '';
      $('.animateBox').css({'background':'#fff'});
      $('.cloud').stop(true).css({ 'opacity': 0 });
      $('.middleArrowA').removeClass('animated fadeInDown');
      $('.smallArrow').removeClass('animated  fadeInLeftUp');
      $('.member').stop(true).css({ 'opacity': 0 });
      $('.middleArrowB').removeClass('animated fadeInDown');
      $('.member li').removeClass('redFilter');
      $('.dust').stop(true).css({ 'opacity': 0 });
      $('.dust li').children("img:first-child").removeClass('light1');
      $('.dust li').children("img:last-child").removeClass('light2');
      console.log(this.src);

    },
    Animate(obj, count, child, callback) {
      clearInterval(this.timer);
      this.timer = setInterval(function() {
        for (var i = 0; i < count; i++) {
          obj.eq(i).children(child).css({ 'left': 2 - Math.ceil(Math.random() * 5) + "px", 'top': 2 - Math.ceil(Math.random() * 5) + "px" });
        }
        callback && callback();
      }, 80);
    },
    Animate1(obj, count, child) {
      clearInterval(this.timer1);
      this.timer1 = setInterval(function() {
        for (var i = 0; i < count; i++) {
          obj.eq(i).children(child).css({ 'left': 2 - Math.ceil(Math.random() * 2) + "px", 'top': 2 - Math.ceil(Math.random() * 2) + "px" });
        }
      }, 80);
    },
    //计算区块大小
    getViewSize() {
      var W = window.innerWidth;
      var H = window.innerHeight - 72;
      this.H = H;
      if (W / H > 976 / 432) {
        this.VW = parseInt(976 * H / 432);
        this.VH = H;
        this.zoomF = (H / 432).toFixed(2);
      } else {
        this.VW = W;
        this.VH = parseInt(432 * W / 976);
        this.zoomF = (W / 976).toFixed(2);
      }
    },

  },
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  line-height: 0;
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
html,
body{
  -webkit-user-select: none; 
  user-select: none;
  overflow: hidden;
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

h3 {
  font-size: 24px;
  color: #000;
  line-height: 1.0;
  padding: 24px;
  font-weight: normal;
}

.container {
  width: 100%;
  position: relative;
}

.aside_reset {
  position: fixed;
  right: 0;
  top: 0;
  margin: 20px 24px;
}

.View {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.ViewSpace {
  width: 976px;
  height: 432px;
  padding: 5px 10px;
  position: relative;
  transform-origin: top left;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
}

.ViewSpace>img {
  position: absolute;
}

.animateBox {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 300px;
  height: 225px;
  background: #FFFFFF;
  padding: 7px;
  box-sizing: border-box;
  border: 0 solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.23);
  border-radius: 6px;
  
}
.animateBox >img{
  display: block;
  width: 100%;
  height: 168px;
  margin-top: 22px;

}

.radioGroup {
  position: absolute;
  right: 10px;
  bottom: 5px;
  background-color: #fff;
  border-radius: 6px;
}

.radioGroup .UI-btn {
  border-radius: 0;
  display: block;
}

.radioGroup .UI-btn:first-child {
  border-radius: 6px 6px 0px 0px;
}

.radioGroup .UI-btn:last-child {
  border-radius: 0px 0px 6px 6px;
}

.radioGroup .UI-btn img {
  display: block;
  width: 58%;
  height: 100%;
  float: left;
  margin-top: 13px;
}

.radioGroup .UI-btn i {
  width: 40%;
  height: 30px;
  line-height: 30px;
  font-style: normal;
  display: block;
  float: right;
  font-size: 12px;
  vertical-align: middle;
  /*background-color: red;*/
  position: relative;
  bottom: -20px;
  text-align: left;
}

.dqUp {
  position: absolute;
  top: 15px;
  width: 647px;
  height: 84px;
}

.bigArrow {
  display: inline-block;
  position: absolute;
}

.bigArrow li {
  display: inline-block;
  width: 47px;
  height: 295px;
}

.middleArrow {
  position: absolute;
  bottom: 15px;
  opacity: 0;
  z-index: 999;
}

.smallArrow {
  position: absolute;
  top: 160px;
  left: 40px;
  opacity: 0;
}


.bigArrow li {
  display: inline-block;
  width: 47px;
  height: 295px;
}

.middleArrow li {
  display: inline-block;
  width: 40px;
  height: 85px;
}


.smallArrow li {
  display: inline-block;
  width: 65px;
  height: 78px;
}

.bigArrow li:first-child,
.middleArrowA li:first-child {
  margin-left: 157px;
  margin-right: 110px;
}

.bigArrow li:last-child {
  margin-left: 110px;
}

.middleArrowA li:first-child {
  margin-left: 161px;
  margin-right: 117px;
}

.middleArrowB li:first-child {
  margin-left: 230px;
  margin-right: 123px;
}

.middleArrowB li:last-child {
  display: none;
}

.middleArrowA li:last-child {
  margin-left: 117px;
}

.smallArrow li:first-child {
  margin-left: 195px;
  margin-right: 90px;
}

.smallArrow li:last-child {
  margin-left: 90px;
}

.cloud {
  position: absolute;
  width: 592px;
  height: 66px;
  top: 263px;
  left: 70px;
  opacity: 0;
}

.member {
  position: absolute;
  bottom: 100px;
  opacity: 0;
}

.member li {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 21px;
}

.redFilter {
  filter: drop-shadow(20px 20px 10px red);
}

.light1 {
  filter: drop-shadow(6px 6px 10px #6c6c6c);
}

.light2 {
  filter: drop-shadow(5px 5px 4px #2194ff);
}

.member li>img {
  position: relative;
}

.member li:first-child {
  margin-left: 160px;
}

.member li:nth-child(2) {
  top: -15px;
}

.member li:nth-child(3) {
  top: 5px;
}

.member li:nth-child(4) {
  top: -5px;
}

.member li:nth-child(5) {
  top: 5px;
}

.dust {
  position: absolute;
  bottom: 100px;
  opacity: 0;
}

.dust li {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 35px;
}

.dust li img {
  position: absolute;
  left: 0;
  top: 0;
}

.redFilter {
  filter: drop-shadow(5px 5px 10px red);
}

.dust li:first-child {
  margin-left: 105px;
}

.dust li:nth-child(2) {
  top: -5px;
}

.dust li:nth-child(3) {
  top: 5px;
}

.dust li:nth-child(4) {
  top: -5px;
}

.dust li:nth-child(5) {
  top: 5px;
}

.bigArrow img,
.middleArrow img,
.smallArrow img,
.cloud img,
.dqUp img,
.member img,
.dust img {
  display: block;
  width: 100%;
  height: 100%;
}

.middleArrowA,
.smallArrow {
  animation-duration: 2s;
  animation-delay: .2s;
  animation-iteration-count: 6;
}

.middleArrowB {
  animation-duration: 1.2s;
  animation-delay: .2s;
  animation-iteration-count: 4;
}
</style>