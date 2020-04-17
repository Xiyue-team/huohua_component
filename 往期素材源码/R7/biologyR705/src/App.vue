<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id='show'>
        <div class="view_space" :style="style">
          <div :class="yes ==='同源染色体'?'leftImg2':'leftImg'"
              v-if="yes === '染色体' || yes === '同源染色体' || yes === '四分体'? true :false">
            <img class="IMG" src="static/UI/jian.gif" :style="yes === '四分体'?style1:''"/>
            <img class="IMG" src="static/UI/jian.gif" v-if="yes === '四分体'?false:true"/>
          </div>
          <div class="rightImg" v-if="yes === '染色体'? true :false">
            <img class="IMG" src="static/UI/jian.gif"/>
            <img class="IMG" src="static/UI/jian.gif"/>
          </div>
          <div class="topImg" v-if="yes === '非同源染色体'? true :false">
            <img class="IMG" src="static/UI/jian.gif"/>
            <img class="IMG" src="static/UI/jian.gif"/>
          </div>
          <div class="leftImg1" v-if="yes === '姐妹染色单体' ||yes === '非姐妹染色单体'? true :false"
              :class="{marginTopJ:yes ==='非姐妹染色单体'}">
            <img class="IMG" src="static/UI/jian.gif"/>
            <img class="IMG" src="static/UI/jian.gif"/>
          </div>
        </div>
        <p class="contentP" v-if="start">精原细胞减数第一次分裂中期</p>
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget" id="buttom7"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <ui-btn size="big"
                v-for="(content,index) in contents"
                v-html="content"
                :id="'buttom'+(index +1)"
                :key="content"
                :type="yes === content?'blue':''"
                @click.native="setActive(content)"
        ></ui-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  import uiGroup from '@/components/UI/uiGroup';//单选组
  import uiSlider from '@/components/UI/uiSlider';//滑块
  export default {
    name: 'app',
    components: {uiHead, uiBtn, uiGroup, uiSlider},
    data() {
      return {
        title: '染色体类别区分',
        BtnSpaceStyle: 'flex',
        contents: [
          '染色体',
          '同源染色体',
          '非同源染色体',
          '四分体',
          '姐妹染色单体',
          '非姐妹染色单体'
        ],
        yes: '',
        style: {
            backgroundImage: 'url(./static/UI/1.png)',
        },
        style1: {
          margin: '44px auto auto -10px'
        },
        start:true,
      }
    },
    created() {
      document.title = this.title;
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
        $('.view_space').css('zoom', zoom);
      },
      setActive(content) {
        this.start = false;
        var _this = this;
        if (content === this.yes) {
          return;
        } else {
          $('.IMG').attr('src','static/UI/jian.gif?'+Math.random());
          this.yes = content;
          if (this.yes === '染色体') {
            _this.imgL('./static/UI/2.png', function () {
              _this.style.backgroundImage = 'url(./static/UI/2.png)';
            });

          } else if (this.yes === '同源染色体') {
            _this.imgL('./static/UI/3.png', function () {
              _this.style.backgroundImage = 'url(./static/UI/3.png)';
            });
          } else if (this.yes === '非同源染色体') {
            _this.imgL('./static/UI/4.png', function () {
              _this.style.backgroundImage = 'url(./static/UI/4.png)';
            });
          } else if (this.yes === '四分体') {
            _this.imgL('./static/UI/5.png', function () {
              _this.style.backgroundImage = 'url(./static/UI/5.png)';
            });
          } else if (this.yes === '姐妹染色单体') {
            _this.imgL('./static/UI/6.png', function () {
              _this.style.backgroundImage = 'url(./static/UI/6.png)';
            });
          } else if (this.yes === '非姐妹染色单体') {
            _this.imgL('./static/UI/7.png', function () {
              _this.style.backgroundImage = 'url(./static/UI/7.png)';
            });
          }
        }
      },
      //重置
      resetWidget() {
        this.start = true;
        $('.IMG').attr('src','static/UI/jian.gif?'+Math.random());
        var _this = this;
        this.yes = '';
        this.imgL('./static/UI/1.png', function () {
          _this.style.backgroundImage = 'url(./static/UI/1.png)';
        });
      },
      imgL(src, callback) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
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

  input, button {
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

  html, body, #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    background-color: #fff;
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
  #show{
    width:100%;
    height:calc(100% - 72px);
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
    padding: 20px;
    background-origin: content-box;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
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

  .leftImg img, .rightImg img, .leftImg1 img, .leftImg2 img {
    width: 170px;
    height: 85px;
  }

  .leftImg img:last-child, .rightImg img:last-child {
    margin-top: -12px;
  }

  .rightImg {
    position: absolute;
    top: calc(50% - 90px);
    right: 20px;
    width: 170px;
    height: 170px;
    transform: rotate(180deg);
  }

  .topImg {
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
    margin-left:-60px;
  }

  .leftImg1 {
    position: absolute;
    top: calc(50% - 90px);
    left: 40px;
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
    left: 40px;
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
  .contentP{
    position: absolute;
    right:20px;
    bottom: 20px;
  }
</style>
