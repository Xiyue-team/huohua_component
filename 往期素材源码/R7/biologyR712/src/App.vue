<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div class="view_space">
        <div id="renderCanvas" :style="viewSize">
          <!--<img id="img"/>-->
          <div class="describeText" v-if="dynamicText[index]">
            <p v-for="item in dynamicText[index]">{{item}}</p>
          </div>
          <div :style="play" @click="play1" id="play"></div>
        </div>
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <ui-btn size="big" :type="blue1" @click.native="blueClick(1)">间期</ui-btn>
        <ui-btn :type="blue2" size="big" @click.native="blueClick(2)">减数第一次分裂</ui-btn>
        <div class="frist">
          <ui-group type="radio" :groups="groups" v-model="radio"></ui-group>
        </div>
        <ui-btn :type="blue3" size="big" @click.native="blueClick(3)">减数第二次分裂</ui-btn>
        <div class="second">
          <ui-group type="radio" :groups="groups1" v-model="radio1"></ui-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  import uiGroup from '@/components/UI/uiGroup';//单选组
  export default {
    name: 'app',
    components: {uiHead, uiBtn, uiGroup},
    data() {
      return {
        title: '卵原细胞的减数分裂',
        viewSize: {
          width: (window.innerWidth - 326) + 'px',
          height: (window.innerWidth - 326) * 9 / 16 + 'px',
        },//区域大小
        index:0,
        play: {
          width: '44px',
          height: '44px',
          backgroundImage: 'url(static/UI/play.png)',
          backgroundSize: '100% 100%',
          position: 'absolute',
          bottom: '1px',
          right: '4px',
          cursor: 'pointer'
        },
        BtnSpaceStyle: 'flex',
        blue1: '',
        blue2: '',
        blue3: '',
        radio: 'one',
        radio1: 'one',
        groups: [{
          name: 'one',
          txt: '前期'
        }, {
          name: 'two',
          txt: '中期'
        }, {
          name: 'three',
          txt: '后期'
        }, {
          name: 'four',
          txt: '末期'
        }],
        groups1: [{
          name: 'one',
          txt: '前期'
        }, {
          name: 'two',
          txt: '中期'
        }, {
          name: 'three',
          txt: '后期'
        }, {
          name: 'four',
          txt: '末期'
        }],
        S:null,
        dynamicText: [
          '',
          ['分裂间期','占细胞周期时间的90%-95%,卵原细胞的体积增大,染色体复制'],
          ['减数第一次分裂前期','同源染色体两两配对'],
          ['减数第一次分裂中期','各对同源染色体排列在赤道板上，每条染色体的着丝点都附着在纺锤丝上'],
          ['减数第一次分裂后期','在纺锤丝的牵引下，配对的同源染色体彼此分离，分别向细胞的两极移动'],
          ['减数第一次分裂末期','初级卵母细胞经过减数第一次分裂，形成大小不同的两个细胞，大的叫次级卵母细胞，小的叫极体'],
          ['减数第二次分裂前期'],
          ['减数第二次分裂中期','染色体排列在赤道板，每条染色体的着丝点都附着在纺锤丝上'],
          ['减数第二次分裂后期','每条染色体的着丝点分裂，两条姐妹染色单体也随之分开，成为两条染色体。在纺锤丝的牵引下，这两条染色体分别向细胞的两极移动'],
          ['减数第二次分裂末期','次级卵母细胞进行减数第二次分裂，形成一个大的卵细胞和一个小的极体，在减数第一次分裂过程中形成的极体也分裂为两个极体']
        ]
      }
    },
    created() {
      document.title = this.title;
      this.getViewSize();
    },
    mounted() {
      this.resize();
      this.setSideStyle();
      this.ImgL('./static/img/1.png');
    },
    computed: {},
    watch: {
      radio(val) {
        $('#play').css('display','none');
        window.clearTimeout(this.S);
        if (val === 'one') {
          this.ImgL('./static/img/02.gif',()=>{
            this.index=2;
          });
          this.num='02';
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },8800);
        } else if (val === 'two') {
          this.ImgL('./static/img/03.gif',()=>{
            this.index=3;
          });
            this.num='03';
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },6000);
        } else if (val === 'three') {
          this.ImgL('./static/img/04.gif',()=>{
            this.index=4;
          });
            this.num='04';
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },5300);
        } else if (val === 'four') {
          this.ImgL('./static/img/05.gif',()=>{
            this.index=5;
          });
            this.num='05';
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },7000);
        }
      },
      radio1(val) {
        $('#play').css('display','none');
        window.clearTimeout(this.S);
        if (val === 'one') {
          this.ImgL('./static/img/06.gif',()=>{
            this.index=6;
          });
            this.num='06';
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },6000);
        } else if (val === 'two') {
          this.ImgL('./static/img/07.gif',()=>{
            this.index=7;
          });
            this.num='07';
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },3200);
        } else if (val === 'three') {
          this.ImgL('./static/img/08.gif',()=>{
            this.index=8;
          });
            this.num='08';
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },5300);
        } else {
          this.ImgL('./static/img/09.gif',()=>{
            this.index=9;
          });
            this.num='09';
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },11000);
        }
      }
    },
    methods: {
      play1() {
        $('#play').css('display','none');
        window.clearTimeout(this.S);
        var num = this.num;
        if (num == '01') {
          this.ImgL('./static/img/01.gif');
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },6000);
        } else if (num == '02') {
          this.ImgL('./static/img/02.gif');
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },8800);
        } else if (num == '03') {
          this.ImgL('./static/img/03.gif');
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },6000);
        } else if (num == '04') {
          this.ImgL('./static/img/04.gif');
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },5300);
        } else if (num == '05') {
          this.ImgL('./static/img/05.gif');
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },7000);
        } else if (num == '06') {
          this.ImgL('./static/img/06.gif');
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },6000);
        } else if (num == '07') {
          this.ImgL('./static/img/07.gif');
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },3200);
        } else if (num == '08') {
          this.ImgL('./static/img/08.gif');
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },5300);
        } else if (num == '09') {
          this.ImgL('./static/img/09.gif');
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },11000);
        }
      },
      ImgL(src,callback) {
        var img = new Image();
        img.src = src+'?'+Math.random();
        img.onload = function () {
           $('#renderCanvas').css('background-image', 'url('+img.src+')');
          callback && callback();
        }
      },
      blueClick(val) {
        $('#play').css('display','none');
        window.clearTimeout(this.S);
        if (val == 1) {
          if (this.blue1 == '') {
            this.S = setTimeout(function () {
              $('#play').css('display','block');
            },6000);
            this.ImgL('./static/img/01.gif',()=>{
              this.index=1;
            });
            this.num='01';
            $('.frist').slideUp(800);
            $('.second').slideUp(800);
            this.blue1 = 'blue';
            this.blue2 = '';
            this.blue3 = '';
          }
        } else if (val == 2) {
          if (this.blue2 == '') {
            this.S = setTimeout(function () {
              $('#play').css('display','block');
            },8800);
            this.radio = 'one';
            this.ImgL('./static/img/02.gif',()=>{
              this.index=2;
            });
            this.num='02';
            $('.second').slideUp(800);
            $('.frist').slideDown(800);
            this.blue2 = 'blue';
            this.blue1 = '';
            this.blue3 = '';
          }
        } else {
          if (this.blue3 == '') {
            this.S = setTimeout(function () {
              $('#play').css('display','block');
            },6000);
            this.radio1 = 'one';
            this.ImgL('./static/img/06.gif',()=>{
              this.index=6;
            });
            this.num='06';
            $('.frist').slideUp(800);
            $('.second').slideDown(800);
            this.blue3 = 'blue';
            this.blue2 = '';
            this.blue1 = '';
          }
        }
      },
      //计算侧边
      setSideStyle() {
        const el = document.getElementById('btn_space');
        if (el && el.scrollHeight > el.offsetHeight) {
          this.BtnSpaceStyle = 'block'
        } else {
          this.BtnSpaceStyle = 'flex'
        }
        var marginL = $('#renderCanvas').width() - 38;
        this.play.marginLeft = marginL + 'px';
      },
      //计算区块大小
      getViewSize() {
        const ratio = {x: 16, y: 9};
        const h1 = (window.innerWidth - 326) * ratio.y / ratio.x;
        const h2 = window.innerHeight - 84 - 40 - 72;
        if (h1 >= h2) {
          this.viewSize = {
            width: h2 * ratio.x / ratio.y + 'px',
            height: h2 + 'px'
          }
        } else {
          this.viewSize = {
            width: (window.innerWidth - 326) + 'px',
            height: h1 + 'px'
          }
        }
        var marginL = $('#renderCanvas').width() - 38;
        this.play.marginLeft = marginL + 'px';
      },
      //窗口大小更改
      resize() {
        const vm = this;
        window.addEventListener('resize', function () {
          vm.getViewSize();//计算视图区大小
          vm.setSideStyle();//计算操作区大小
        })
      },
      //重置
      resetWidget() {
        $('#play').css('display','none');
        window.clearTimeout(this.S);
        $('.frist').fadeOut(500);
        $('.second').fadeOut(500);
        this.blue1 = '';
        this.blue2 = '';
        this.blue3 = '';
        this.index=0;
        this.ImgL('./static/img/1.png');
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
  }

  #play {
    display: none;
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

  /*ui*/
  .UI-camera {
    width: 80px;
    height: 80px;
    cursor: pointer;
  }

  #renderCanvas {
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    padding: 10px;
    position: relative;
    background-size:contain ;
    background-origin: content-box;
    background-position: center;
    background-repeat: no-repeat;
  }

  /*内容区*/
  .container {
    width: calc(100% - 280px);
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

  .app_aside {
    float: left;
    width: 280px;
    background-color: #F7F7F7;
    height: 100%;
    box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);
  }

  .view_space {
    margin: 5px 22px 84px 22px;
    width: calc(100% - 46px);
    height: calc(100% - 196px);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .insp-wrapper {
    width: 100%;
    height: 100%;
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
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
  }

  .btn_space .UI-btn {
    margin-bottom: 40px;
  }

  .frist {
    height: 216px;
    width: 100%;
    margin: -25px auto 30px auto;
    display: none;
  }

  .second {
    display: none;
    height: 216px;
    width: 100%;
    margin: -25px auto 30px auto;
  }
  .describeText {
    position: absolute;
    bottom: -105px;
    height:100px;
    right: 0;
    width: 90%;
    padding: 0 1% 2% 3%;
    line-height: 4vh;
    font-size: 2vh;
    /*border-radius: 6px;*/
    /*background-color: #ffffff;*/
    /*box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);*/
    /*border: solid 0.5px rgba(0, 0, 0, 0.06);*/
  }

  .describeText p:first-child {
    margin-bottom: 1vh;
  }
</style>
