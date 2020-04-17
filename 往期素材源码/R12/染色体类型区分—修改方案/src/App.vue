<template>
  <div id="app" class="noselect">
    <div class="mask" v-if="!isHidden">loading...</div>
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id='show'>
        <div class="view_space">
          <div :class="yes ==='同源染色体'?'leftImg2':'leftImg'" v-show="yes === '染色体' || yes === '同源染色体' || yes === '四分体'? true :false"> <img class="IMG" :src="imgUrl" :style="yes === '四分体'?style1:''" /> <img class="IMG" :src="imgUrl" v-show="yes === '四分体'?false:true" /> </div>
          <div class="rightImg" v-show="yes === '染色体'? true :false"> <img class="IMG" :src="imgUrl" /> <img class="IMG" :src="imgUrl" /> </div>
          <div class="topImg" v-show="yes === '非同源染色体'? true :false"> <img class="IMG" :src="imgUrl" /> <img class="IMG" :src="imgUrl" /> </div>
          <div class="leftImg1" v-show="yes === '姐妹染色单体' ||yes === '非姐妹染色单体'? true :false" :class="{marginTopJ:yes ==='非姐妹染色单体'}"> <img class="IMG" :src="imgUrl" /> <img class="IMG" :src="imgUrl" /> </div> 
          <!-- <img v-for="n in arr" :src="`static/UI/${n}.png`" :style="{opacity:currentIndex ==n?1:0}"> -->
          <div class="main-img" style="background-image: url('static/UI/0.png')" ref="mainImg">
            
          </div>
           <img src="static/UI/text.png"> </div>
        <p class="contentP" v-if="start">减数第一次分裂前期</p>
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget" id="buttom7"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <ui-btn size="big" v-for="(content,index) in contents" v-html="content" :id="'buttom'+(index +1)" :key="content" :type="yes === content?'blue':''" @click.native="setActive(content,index)"></ui-btn>
      </div>
    </div>
  </div>
</template>
<script>
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiGroup from '@/components/UI/uiGroup'; //单选组
import uiSlider from '@/components/UI/uiSlider'; //滑块
export default {
  name: 'app',
  components: {
    uiHead,
    uiBtn,
    uiGroup,
    uiSlider
  },
  data() {
    return {
      title: '染色体类别区分',
      BtnSpaceStyle: 'flex',
      contents: ['染色体', '同源染色体', '非同源染色体', '四分体', '姐妹染色单体', '非姐妹染色单体'],
      yes: '',
      num: 1,
      style1: {
        margin: '44px auto auto -10px'
      },
      start: true,
      arr: [1, 2, 3, 4, 5, 6, 7],
      currentIndex: 1,
      isHidden: false,
      imgUrl: 'static/UI/jian.gif'
    }
  },
  created() {
    document.title = this.title;
    var promises = this.arr.map((value) => {
      return this.preloadImage(`static/UI/${value}.png`);
    })
    Promise.all(promises).then(() => {
      console.log("11");
      this.isHidden = true;
    })
  },
  mounted() {
    this.setSideStyle();
    window.addEventListener('resize', () => {
      this.setSideStyle();
    })
  },
  computed: {},
  watch: {},
  methods: {
    preloadImage(path) {
      return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => resolve(path);
        image.onerror = reject;
        image.src = path;
      })
    },
    //
    //计算侧边
    setSideStyle() {
      const el = document.getElementById('btn_space')
      if (el && el.scrollHeight > el.offsetHeight) {
        this.BtnSpaceStyle = 'block'
      } else {
        this.BtnSpaceStyle = 'flex'
      }
      var W = window.innerWidth - 280;
      var H = window.innerHeight - 72;
      var zoom = 1;
      if (W / H > 740 / 440) {
        zoom = H / 440;
      } else {
        zoom = W / 740;
      }
      if (zoom >= 1 || W / H > 2) {
        $('.view_space').css({
          'transform': `scale(${zoom},${zoom})`,
          'transform-origin': 'center'
        });
      } else {
        $('.view_space').css({
          'transform': `scale(${zoom},${zoom})`,
          'transform-origin': 'center left'
        });
      }
    },
    setActive(content, index) {
      this.start = false;
      var _this = this;
      if (content === this.yes) {
        return;
      } else {
        this.$refs.mainImg.style['background-position'] = `0 ${-(index+1)*390}px `;

        this.yes = '';
        // $('.IMG').attr('src', 'static/UI/jian.gif?' + Math.random());
        this.preloadImage('static/UI/jian.gif?' + Math.random()).then((path) => {
          this.currentIndex = index + 2;
          this.imgUrl = path;
          setTimeout(() => {
            this.yes = content;
          }, 50)
        })
      }
    },
    //重置
    resetWidget() {
      this.start = true;
      this.currentIndex = 1;
      // $('.IMG').attr('src', 'static/UI/jian.gif?' + Math.random());
      var _this = this;
      this.yes = '';
      this.$refs.mainImg.style['background-position'] = `0 0 `;
    },
    imgL(src, callback) {
      var img = new Image();
      img.src = src;
      img.onload = function() {
        callback && callback();
      }
    }
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
  touch-action: none;
  -ms-touch-action: none;
  position: relative;
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

#show {
  width: 100%;
  height: calc(100% - 72px);
  position: relative;
}


/*ui*/

.UI-camera {
  width: 80px;
  height: 80px;
  cursor: pointer;
}


/*内容区*/

.container {
  width: calc(100% - 280px);
  float: left;
  height: 100%;
  position: relative;
}

.marginTopJ {
  margin-top: 37px;
}

.container h3 {
  font-size: 24px;
  color: #000;
  line-height: 1.0;
  padding: 24px;
  font-weight: normal;
}

.app_aside {
  float: left;
  width: 280px;
  background-color: #F7F7F7;
  height: 100%;
  box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);
}

.view_space {
  width: 740px;
  height: 440px;
  background-origin: content-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  /* padding: 20px; */
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/
  background-color: #fff;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  transform-origin: center left;
}

.aside_reset {
  margin: 20px 24px;
  float: right;
}

.btn_space {
  padding: 20px;
  width: 100%;
  height: calc(100% - 80px);
  clear: both;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
}

.btn_space .UI-btn {
  margin-bottom: 15px;
}

.leftImg {
  position: absolute;
  top: calc(50% - 80px);
  left: 30px;
  width: 170px;
  height: 170px;
}

.leftImg img,
.rightImg img,
.leftImg1 img,
.leftImg2 img {
  width: 170px;
  height: 85px;
}

.leftImg img:last-child,
.rightImg img:last-child {
  margin-top: -12px;
}

.rightImg {
  position: absolute;
  top: calc(50% - 90px);
  right: 30px;
  width: 170px;
  height: 170px;
  transform: rotate(180deg);
}

.topImg {
  z-index: 10;
  position: absolute;
  top: 43px;
  left: calc(50% - 115px);
  width: 260px;
  height: 150px;
}

.topImg img {
  display: block;
  transform: rotate(90deg);
  width: 150px;
  height: 75px;
  float: left;
}

.topImg img:first-child {
  transform: rotate(123deg);
}

.topImg img:last-child {
  transform: rotate(57deg);
  margin-left: -60px;
}

.leftImg1 {
  position: absolute;
  top: calc(50% - 90px);
  left: 30px;
  width: 170px;
  height: 270px;
}

.leftImg1 img:first-child {
  transform: rotate(-5deg);
}

.leftImg1 img:last-child {
  transform: rotate(5deg);
  margin-top: -66px;
}

.leftImg2 {
  position: absolute;
  top: calc(50% - 65px);
  left: 35px;
  width: 170px;
  height: 270px;
}

.leftImg2 img:first-child {
  transform: rotate(-15deg);
}

.leftImg2 img:last-child {
  transform: rotate(15deg);
  margin-top: -37px;
}

.contentP {
  position: absolute;
  right: 20px;
  bottom: 20px;
}

.bg {
  width: 100%;
  height: 100%;
  background-origin: content-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  left: 0;
  top: 0;
}

.view_space>img {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: auto;
  height: 85%;
  z-index: 0;
}

.mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  margin: auto;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-img {
  position: absolute;
  left: 50%;
  transform:translate(-50%,-50%);
  top:50%;
  width:390px;
  height:390px;
  background-size: 100% auto;
}
</style>
