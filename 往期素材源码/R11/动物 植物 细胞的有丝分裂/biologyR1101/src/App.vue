<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div class="view_space">
        <div id="renderCanvas" :style="viewSize" style="background-image: url(./static/img/bg.png)">
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
          <ui-group type="radio" :groups="groups" v-model="radio"></ui-group>
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
        title: '植物细胞有丝分裂',
        viewSize: {
          width: (window.innerWidth - 326) + 'px',
          height: (window.innerWidth - 326) * 19 / 35 + 'px',
        },//区域大小
        index:0,
        play: {
          width: '44px',
          height: '44px',
          backgroundImage: 'url(static/UI/play.png)',
          backgroundSize: '100% 100%',
          position: 'absolute',
          bottom: '8px',
          right: '10px',
          cursor: 'pointer'
        },
        BtnSpaceStyle: 'flex',
        radio: '',
        groups: [{
          name: 'zero',
          txt: '间期'
        },{
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
          ['间期','DNA复制，有关蛋白质合成，细胞适度生长'],
          ['前期','膜仁消失显两体'],
          ['中期','形数清晰赤道齐'],
          ['后期','点裂数增均两极'],
          ['末期','两消两现重开始'],
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
        if(val==''){
          return;
        }
        $('#play').css('display','none');
        window.clearTimeout(this.S);
        if (val === 'zero') {
          this.ImgL('static/img/01.gif', ()=> {
            this.index=1;
            $('#img').attr('src', 'static/img/01.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },5600);
        }else if (val === 'one') {
          this.ImgL('static/img/02.gif', ()=> {
            this.index=2;
            $('#img').attr('src', 'static/img/02.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },5600);
        } else if (val === 'two') {
          this.ImgL('static/img/03.gif', ()=> {
            this.index=3;
            $('#img').attr('src', 'static/img/03.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },5200);
        } else if (val === 'three') {
          this.ImgL('static/img/04.gif', ()=> {
            this.index=4;
            $('#img').attr('src', 'static/img/04.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },4500);
        } else {
          this.ImgL('static/img/05.gif', ()=> {
            this.index=5;
            $('#img').attr('src', 'static/img/05.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },8500);
        }
      },
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
          },5600);
        } else if (num == '02') {
          this.ImgL('static/img/02.gif', ()=> {
            $('#img').attr('src', 'static/img/02.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },5600);
        } else if (num == '03') {
          this.ImgL('static/img/03.gif', ()=> {
            $('#img').attr('src', 'static/img/03.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },5200);
        } else if (num == '04') {
          this.ImgL('static/img/04.gif', ()=> {
            $('#img').attr('src', 'static/img/04.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },4500);
        } else if (num == '05') {
          this.ImgL('static/img/05.gif', ()=> {
            $('#img').attr('src', 'static/img/05.gif');
          });
          this.S = setTimeout(function () {
            $('#play').css('display','block');
          },8500);
        }
      },
      ImgL(src, callback) {
        var img = new Image();
        img.src = src;
        img.onload = ()=> {
          callback && callback();
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
      },
      //计算区块大小
      getViewSize() {
        const ratio = {x: 35, y: 19};
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
        this.ImgL('static/img/1.png', ()=> {
          this.index=0;
          this.radio='';
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
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-origin: content-box;
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
    margin: 40px 22px 84px 22px;
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
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
  }

  .btn_space .UI-btn {
    margin-bottom: 40px;
  }

  .describeText {
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    right: 1%;
    width: 28%;
    padding: 2% 3%;
    line-height: 4.5vh;
    font-size: 3.6vh;
    color: #fff;
    /*border-radius: 6px;*/
    /*background-color: #ffffff;*/
    /*box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);*/
    /*border: solid 0.5px rgba(0, 0, 0, 0.06);*/
  }

  .describeText p:first-child {
    margin-bottom: 2.5vh;
  }
  #btn_space>div div:last-child {
    margin-bottom: 40px !important;
  }
</style>
