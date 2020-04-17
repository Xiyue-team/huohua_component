<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div class="view_space">
        <div id="renderCanvas" :style="viewSize">
          <img id="img"/>
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
        title: '精原细胞的减数分裂',
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
          marginTop: '-40px',
          marginLeft: '',
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
          ['分裂间期', '占细胞周期时间的90%-95%,精原细胞的体积增大,染色体复制'],
          ['减数第一次分裂前期', '同源染色体两两配对'],
          ['减数第一次分裂中期', '各对同源染色体排列在赤道板上，每条染色体的着丝点附着在纺锤丝上'],
          ['减数第一次分裂后期', '在纺锤丝的牵引下，配对的同源染色体彼此分离，分别向细胞的两极移动'],
          ['减数第一次分裂末期', '一个初级精母细胞分裂成了两个次级精母细胞'],
          ['减数第二次分裂前期'],
          ['减数第二次分裂中期', '染色体排列在赤道板上，每条染色体的着丝点附着在纺锤丝上'],
          ['减数第二次分裂后期', '每条染色体的着丝点分裂，两条姐妹染色单体也随之分开，成为两条染色体。在纺锤丝的牵引下，这两条染色体分别向细胞的两极移动'],
          ['减数第二次分裂末期', '两个次级精母细胞经过减数第二次分裂，形成了四个精细胞']
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
      this.ImgL('static/img/1.png', function () {
        $('#img').attr('src', 'static/img/1.png');
      });
    },
    computed: {},
    watch: {
      radio(val) {
        $('#play').css('display','none');
        window.clearTimeout(this.S);
        if (val === 'one') {
          this.ImgL('static/img/02.gif', ()=> {
            this.index=2;
            $('#img').attr('src', 'static/img/02.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },8500);
        } else if (val === 'two') {
          this.ImgL('static/img/03.gif', ()=> {
            this.index=3;
            $('#img').attr('src', 'static/img/03.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },5800);
        } else if (val === 'three') {
          this.ImgL('static/img/04.gif', ()=> {
            this.index=4;
            $('#img').attr('src', 'static/img/04.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },5000);
        } else {
          this.ImgL('static/img/05.gif', ()=> {
            this.index=5;
            $('#img').attr('src', 'static/img/05.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },7000);
        }
      },
      radio1(val) {
        $('#play').css('display','none');
        window.clearTimeout(this.S);
        if (val === 'one') {
          this.ImgL('static/img/06.gif', ()=> {
            this.index=6;
            $('#img').attr('src', 'static/img/06.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },5500);
        } else if (val === 'two') {
          this.ImgL('static/img/07.gif', ()=> {
            this.index=7;
            $('#img').attr('src', 'static/img/07.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },4500);
        } else if (val === 'three') {
          this.ImgL('static/img/08.gif', ()=> {
            this.index=8;
            $('#img').attr('src', 'static/img/08.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },7500);
        } else {
          this.ImgL('static/img/09.gif', ()=> {
            this.index=9;
            $('#img').attr('src', 'static/img/09.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },6000);
        }
      }
    },
    methods: {
      play1() {
        $('#play').css('display','none');
        window.clearTimeout(this.S);
        var num = $('#img').attr('src').substring(11, 13);
        if (num == '01') {
          this.ImgL('static/img/01.gif', ()=> {
            $('#img').attr('src', 'static/img/01.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },6000);
        } else if (num == '02') {
          this.ImgL('static/img/02.gif', ()=> {
            $('#img').attr('src', 'static/img/02.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },8500);
        } else if (num == '03') {
          this.ImgL('static/img/03.gif', ()=> {
            $('#img').attr('src', 'static/img/03.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },5800);
        } else if (num == '04') {
          this.ImgL('static/img/04.gif', ()=> {
            $('#img').attr('src', 'static/img/04.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },5000);
        } else if (num == '05') {
          this.ImgL('static/img/05.gif', ()=> {
            $('#img').attr('src', 'static/img/05.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },7000);
        } else if (num == '06') {
          this.ImgL('static/img/06.gif', ()=> {
            $('#img').attr('src', 'static/img/06.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },5500);
        } else if (num == '07') {
          this.ImgL('static/img/07.gif', ()=> {
            $('#img').attr('src', 'static/img/07.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },4500);
        } else if (num == '08') {
          this.ImgL('static/img/08.gif', ()=> {
            $('#img').attr('src', 'static/img/08.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },7500);
        } else if (num == '09') {
          this.ImgL('static/img/09.gif', ()=> {
            $('#img').attr('src', 'static/img/09.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },6000);
        }
      },
      ImgL(src, callback) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
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
            this.ImgL('static/img/01.gif', ()=> {
              this.index=1;
              $('#img').attr('src', 'static/img/01.gif');
            });
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
            },8500);
            this.radio = 'one';
            this.ImgL('static/img/02.gif', ()=> {
              this.index=2;
              $('#img').attr('src', 'static/img/02.gif');
            });
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
            },5500);
            this.radio1 = 'one';
            this.ImgL('static/img/06.gif', ()=> {
              this.index=6;
              $('#img').attr('src', 'static/img/06.gif');
            });
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
        this.ImgL('static/img/1.png', ()=> {
          this.index=0;
          $('#img').attr('src', 'static/img/1.png');
        });
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
  }

  #renderCanvas img {
    width: 100%;
    height: 100%;
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
