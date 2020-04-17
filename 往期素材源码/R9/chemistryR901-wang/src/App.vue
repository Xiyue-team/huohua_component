<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-html="title" class="app_title"></h3>
      <!--视图区-->
      <div class="ViewSpace">
        <div class="viewBox" ref='view' :style='[zoom]'>
          <div class="footer"><img src="static/img/footer@2x.png" alt=""></div>
          <div class="outerView border">
            <div class="dotBox"> <span v-for="(n,index) in 8" :class="{blue:index<imgArr.length}"></span> </div>
            <div class="exText" :style="'background:url(./static/img/line@2x.png) center center/auto 100% no-repeat'">
              <div v-for="value in textArr" class='explain' :class='{highlight:value.highlight}'>{{value.text}}</div>
            </div>
          </div>
          <div class='ctrl'>
            <transition-group name="list" tag="div" class='ctrlImg border' v-on:before-enter="beforeEnter" v-on:enter="enter" :css="false">
              <div v-for="(value,index) in imgArr" :key='index' v-show='imgArr[index]' class='contentEl' v-bind:data-index="index"> <img :src='imgArr[index].url'> </div>
              <div v-for="n in 4" :key='n*10'> <img :src="'./static/img/'+n+'@2x.png'" @click='choose(n,$event)'> </div>
            </transition-group>
            <ui-btn type="button" size='big' @click.native="result" :class="{btn:imgArr.length!=0}">确认</ui-btn>
          </div>
        </div>
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget" id="button0"></ui-btn>
      <!--清除浮动-->
    </div>
  </div>
</template>
<script type="text/javascript">
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider';
import uiGroup from '@/components/UI/uiGroup';
export default {
  name: 'app',
  components: {
    uiBtn,
    uiSlider,
    uiGroup
  },
  data() {
    return {
      title: '物质的分类',
      BtnSpaceStyle: 'flex',
      zoom: {}, //区域大小
      isShow: false,
      imgArr: [],
      num: 0,
      posArr: [{ x: 450+20, y: 160 }, { x: 580+20, y: 250 }, { x: 320+20, y: 250 }, { x: 450+20, y: 50 }, { x: 700+20, y: 150 }, { x: 200+20, y: 150 }, { x: 620+20, y: 50 }, { x: 270+20, y: 50 }],
      clickPos: {
        x: 0,
        y: 0
      },
      exText: '',
      textArr: [{ text: '物质的分类', highlight: false }, { text: '混合物', highlight: false }, { text: '纯净物', highlight: false }, { text: '单质', highlight: false }, { text: '化合物', highlight: false }, { text: '氧化物', highlight: false }]
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
  computed: {},
  watch: {},
  methods: {
    result() {
      if (this.imgArr.length == 0) return;
      let arr = [];
      this.textArr.forEach((value, index) => {
        value.highlight = false;
      })
      this.textArr[0].highlight = true;
      for (let value of this.imgArr) {
        arr.push(value.type);
      }
      arr = [...new Set(arr)];
      if (arr.length == 1) {
        switch (arr[0]) {
          case 1:
          this.textArr[2].highlight = true;
          this.textArr[3].highlight = true;
            break;
          case 2:
            this.textArr[2].highlight = true;
            this.textArr[4].highlight = true;
            break;
          case 3:
            this.textArr[2].highlight = true;
            this.textArr[4].highlight = true;
            break;
          case 4:
            this.textArr[2].highlight = true;
            this.textArr[4].highlight = true;
            this.textArr[5].highlight = true;
            break;
          default:
            return;
        }
      } else {
        this.textArr[1].highlight = true;
      }
    },
    beforeEnter(el) {
      el.style.left = `0px`;
      el.style.top = `${this.clickPos.y}px`;
      // el.style.transform = `translate(${x}px,${y}px)`;
      Velocity(el, { translateX: 0, translateY: 0 }, { duration: 0 })
    },
    enter(el, done) {
      var index = el.dataset.index;
      Velocity(el, { translateX: `-${this.posArr[index].x}px`, translateY: `${this.posArr[index].y-this.clickPos.y}px`, scaleX: 1.2, scaleY: 1.2 }, { duration: 500 }, { complete: done })
    },
    choose(v, event) {
      if (this.imgArr.length > 7) {
        return;
      }
      this.textArr.forEach((value)=>{
        value.highlight = false;
      })
      this.clickPos.x = event.target.offsetLeft;
      this.clickPos.y = event.target.offsetTop;
      this.imgArr.push({ url: `./static/img/${v}@2x.png`, type: v });
    },
    imgL(src, callback) {
      var img = new Image();
      img.onload = function() {
        callback && callback(img.src);
      }
      img.src = src;
    },
    preloadImage(path) {
      return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => resolve(path);
        image.onerror = reject;
        image.src = path;
      })
    },
    //计算侧边
    setSideStyle() {
      const el = document.getElementById('btn_space')
      if (el && el.scrollHeight > el.offsetHeight) {
        this.BtnSpaceStyle = 'block'
      } else {
        this.BtnSpaceStyle = 'flex'
      }
    },
    //计算区块大小
    getViewSize() {
      const W = window.innerWidth;
      const H = window.innerHeight - 72;
      if (W / H >= 1000 / 550) {
        this.zoom = {
          zoom: H / 550
          // transform: 'scale(' + H / 505 + ')'
        }
      } else {
        this.zoom = {
          zoom: W / 1000
          // transform: 'scale(' + W / 1000+','+W / 1000 + ')'
        }
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
      this.imgArr = [];
      this.textArr.forEach((value)=>{
        value.highlight = false;
      })
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
  height: 100%;
}

.container h3 {
  font-size: 24px;
  color: #000;
  line-height: 1.0;
  padding: 24px;
  font-weight: normal;
}

.insp-wrapper {
  width: 100%;
  height: 100%;
}

.aside_reset {
  margin: 20px 24px;
  float: right;
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
  align-items: center;
  justify-content: space-between;
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

.border {
  background: #FFFFFF;
  border: 1px solid rgba(151, 151, 151, 0.22);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.17);
  border-radius: 6px;
}

.ViewSpace {
  width: 100%;
  padding: 0 24px;
  height: calc(100% - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ViewSpace .viewBox {
  width: 976px;
  height: 410px;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: -60px;
}

.outerView {
  position: relative;
  width: 752px;
  height: 354px;
  padding: 6px;
  background: linear-gradient(to bottom, rgba(125, 220, 207, 0.6), rgba(18, 54, 120, 0.6)) no-repeat;
  background-clip: content-box;
}

.outerView .dotBox {
  position: absolute;
  left: 0;
  right: 0;
  top: 21px;
  margin: 0 auto;
  z-index: 10;
  text-align: center;
}

.outerView .dotBox span {
  display: inline-block;
  height: 12px;
  width: 6px;
  border-radius: 2px;
  background-color: #C2C2C2;
}

.outerView .dotBox span:not(:last-child) {
  margin-right: 5px;
}

.outerView .dotBox span.blue {
  background-color: #5CAEFD;
}

.outerView .exText {
  position: absolute;
  left: 0;
  right: 0;
  font-size: 16px;
  text-align: center;
  bottom: -120px;
  height: 80px;
  margin: 0 auto;
}

.view {
  position: relative;
}

.ctrl {
  width: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ctrlImg {
  height: 354px;
  padding-top: 20px;
  position: relative;
}

.contentEl {
  position: absolute;
  width: 200px;
}

.ctrlImg div {
  width: 100px;
  margin: 0 auto 15px;
}

.ctrlImg div img {
  width: 100px;
  height: auto;
}

.footer {
  position: absolute;
  right: 0;
  bottom: -50px;
}

.footer img {
  width: 300px;
  height: auto;
}

.explain {
  position: absolute;
  height: 36px;
  line-height: 36px;
  padding: 0 16px;
  background: #DBE7FF;
  border: 1px solid #314D92;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.17);
  border-radius: 6px;
}

.explain.highlight {
  background: #14F8A3;
}

.explain:nth-child(1) {
  left: 120px;
  top: 8px;
}

.explain:nth-child(2) {
  left: 265px;
  top: -20px;
}

.explain:nth-child(3) {
  left: 265px;
  top: 38px;
}

.explain:nth-child(4) {
  left: 370px;
  top: 16px;
}

.explain:nth-child(5) {
  left: 370px;
  top: 60px;
}

.explain:nth-child(6) {
  left: 500px;
  top: 60px;
}
.btn:active {
  background-color: #5badfd;
}
</style>