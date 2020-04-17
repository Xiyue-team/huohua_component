<template>
  <div id="app" class="noselect">
    <!--头部-->
    <ui-head :title="title" type="head_btn">
      <ui-btn type="reset1" style="top: 20px;" @click.native="resetWidget"></ui-btn>
      <ui-btn :type="blue1" @click.native="btnFunction(1)">染色体</ui-btn>
      <ui-btn :type="blue2" @click.native="btnFunction(2)">染色单体</ui-btn>
      <ui-btn :type="blue3" @click.native="btnFunction(3)">同源染色体</ui-btn>
      <ui-btn :type="blue4" @click.native="btnFunction(4)">非同源染色体</ui-btn>
      <ui-btn :type="blue5" @click.native="btnFunction(5)">四分体</ui-btn>
      <ui-btn :type="blue6" @click.native="btnFunction(6)">姐妹染色单体</ui-btn>
      <ui-btn :type="blue7" @click.native="btnFunction(7)">非姐妹染色单体</ui-btn>
    </ui-head>
    <!--模型区域-->
    <div class="container">
      <div :style="[zoom]" class="showDiv">
        <div class="showTitle">
          <span class="showTitleBtn" @click="btn(1)" v-bind:class="{ 'opacity1': opacityShowTop }">a</span>
          <span class="showTitleBtn" @click="btn(2)" v-bind:class="{ 'opacity1': opacityShowTop }">a'</span>
          <span class="showTitleBtn" style="margin-left: 80px" @click="btn(3)"
                v-bind:class="{ 'opacity1': opacityShowTop }">b</span>
          <span class="showTitleBtn" @click="btn(4)" v-bind:class="{ 'opacity1': opacityShowTop }">b'</span>
          <span class="showTitleBtn" style="margin-left: 78px" @click="btn(5)"
                v-bind:class="{ 'opacity1': opacityShowTop }">c</span>
          <span class="showTitleBtn" @click="btn(6)" v-bind:class="{ 'opacity1': opacityShowTop }">c'</span>
          <span class="showTitleBtn" style="margin-left: 57px" @click="btn(7)"
                v-bind:class="{ 'opacity1': opacityShowTop }">d</span>
          <span class="showTitleBtn" @click="btn(8)" v-bind:class="{ 'opacity1': opacityShowTop }">d'</span>
        </div>
        <div class="showMid">
          <img :src="src1" alt="">
          <img :src="src2" alt="">
          <img :src="src3" alt="">
          <img :src="src4" alt="">
        </div>
        <div class="showBottom">
          <span class="showBottomBtn" @click="btn(9)" v-bind:class="{ 'opacity1': opacityShowBot }">A</span>
          <span class="showBottomBtn" style="margin-left: 110px" @click="btn(10)"
                v-bind:class="{ 'opacity1': opacityShowBot }">B</span>
          <span class="showBottomBtn" style="margin-left: 105px" @click="btn(11)"
                v-bind:class="{ 'opacity1': opacityShowBot }">C</span>
          <span class="showBottomBtn" style="margin-left: 89px" @click="btn(12)"
                v-bind:class="{ 'opacity1': opacityShowBot }">D</span>
        </div>
      </div>
    </div>
    <div v-show="true1" class="true" :style="truebackground"></div>
    <div v-show="error1" class="error" :style="errorbackground"></div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import uiHead from '@/components/UI/uiHead'; //头部
  import uiBtn from '@/components/UI/uiBtn'; //按钮
  export default {
    name: 'app',
    components: {uiHead, uiBtn},
    data() {
      return {
        title: '染色体关系探究',
        blue1: '',
        blue2: '',
        blue3: '',
        blue4: '',
        blue5: '',
        blue6: '',
        blue7: '',
        blue8: '',
        blue9: '',
        src1: 'static/UI/ab.png',
        src2: 'static/UI/ab.png',
        src3: 'static/UI/ab.png',
        src4: 'static/UI/ab.png',
        zoom: {},
        true1: false,
        error1: false,
        opacityShowTop: true,
        opacityShowBot: true,
        clickNum: 0,
        clickObj: null,
        truebackground: {
          backgroundImage: 'url(static/UI/true.png)',
        },
        errorbackground: {
          backgroundImage: 'url(static/UI/error.png)',
        },
      }
    },
    mounted() {
      document.title = this.title;
      this.setStyle();
      window.onresize = () => {
        this.setStyle();
      }
    },
    methods: {
      //重置
      resetWidget() {
        this.blue1 = '';
        this.blue2 = '';
        this.blue3 = '';
        this.blue4 = '';
        this.blue5 = '';
        this.blue6 = '';
        this.blue7 = '';
        this.blue8 = '';
        this.blue9 = '';
        this.src1 = 'static/UI/ab.png';
        this.src2 = 'static/UI/ab.png';
        this.src3 = 'static/UI/ab.png';
        this.src4 = 'static/UI/ab.png';
        this.true1 = false;
        this.error1 = false;
        this.opacityShowTop = true;
        this.opacityShowBot = true;
        this.clickNum = 0;
        this.clickObj = null;
      },
      setStyle() {
        let windowW = window.innerWidth - 200, windowH = window.innerHeight - 200;
        if (windowW / windowH >= 546 / 276) {
          this.zoom = {
            'transform': 'scale(' + windowH / 276 + ')',
            'transform-origin': 'center center',
            '-moz-transform': 'scale(' + windowH / 276 + ')',
            '-moz-transform-origin': 'center center',
          }
        } else {
          this.zoom = {
            'transform': 'scale(' + windowW / 546 + ')',
            'transform-origin': 'center center',
            '-moz-transform': 'scale(' + windowW / 546 + ')',
            '-moz-transform-origin': 'center center',
          }
        }
        if (windowW < 910) {
          $('.Ui-head.type2 .UI-btn').css('margin-right', '10px');
          $('.UI-btn').css({
            'padding': '0 10px',
            'font-size': '14px'
          });
        } else {
          $('.Ui-head.type2 .UI-btn').css('margin-right', '20px');
          $('.UI-btn').css({
            'padding': '0 16px',
            'font-size': '16px'
          });
        }
      },
      imgL(src, callback) {
        var img = new Image();
        img.src = src + '?' + Math.random();
        img.onload = function () {
          callback && callback(img.src);
        }
      },
      //大按钮选择
      btnFunction(type) {
        $('.showTitleBtn').removeClass('xuanzhong');
        $('.showBottomBtn').removeClass('xuanzhong');
        this.src1 = 'static/UI/ab.png';
        this.src2 = 'static/UI/ab.png';
        this.src3 = 'static/UI/ab.png';
        this.src4 = 'static/UI/ab.png';
        this.clickNum = 0;
        this.clickObj = null;
        this.blue1 = '';
        this.blue2 = '';
        this.blue3 = '';
        this.blue4 = '';
        this.blue5 = '';
        this.blue6 = '';
        this.blue7 = '';
        if (type == 1) {
          this.opacityShowTop = false;
          this.opacityShowBot = false;
          this.blue1 = 'blue';
        } else if (type == 2) {
          this.opacityShowTop = false;
          this.opacityShowBot = false;
          this.blue2 = 'blue'
        } else if (type == 3) {
          this.opacityShowTop = true;
          this.opacityShowBot = false;
          this.blue3 = 'blue'
        } else if (type == 4) {
          this.opacityShowTop = true;
          this.opacityShowBot = false;
          this.blue4 = 'blue'
        } else if (type == 5) {
          this.opacityShowTop = true;
          this.opacityShowBot = false;
          this.blue5 = 'blue'
        } else if (type == 6) {
          this.opacityShowTop = false;
          this.opacityShowBot = true;
          this.blue6 = 'blue'
        } else if (type == 7) {
          this.opacityShowTop = false;
          this.opacityShowBot = true;
          this.blue7 = 'blue'
        }
        this.pointerFun();
      },
      //判断是否可以点击
      pointerFun() {
        if (this.blue1 === 'blue' || this.blue2 === 'blue') {
          $('.showTitleBtn').css('pointer-events', 'auto');
          $('.showBottomBtn').css('pointer-events', 'auto');
        } else if (this.blue3 === 'blue' || this.blue4 === 'blue' || this.blue5 === 'blue') {
          $('.showBottomBtn').css('pointer-events', 'auto');
          $('.showTitleBtn').css('pointer-events', 'none');
        } else if (this.blue6 === 'blue' || this.blue7 === 'blue') {
          $('.showTitleBtn').css('pointer-events', 'auto');
          $('.showBottomBtn').css('pointer-events', 'none');
        }
      },
      //选中后情空状态
      choosed(type) {
        if (type) {
          setTimeout(() => {
            this.error1 = false;
            this.true1 = false;
            $('.showTitleBtn').removeClass('xuanzhong');
            $('.showBottomBtn').removeClass('xuanzhong');
            this.pointerFun();
            this.src1 = 'static/UI/ab.png';
            this.src2 = 'static/UI/ab.png';
            this.src3 = 'static/UI/ab.png';
            this.src4 = 'static/UI/ab.png';
            this.clickObj = null;
          }, 1000);
        }
      },
      //换图
      changeImg(type) {
        if (type == 1) {
          this.imgL('static/UI/lefta.png', (src) => {
            this.src1 = src;
          });
        } else if (type == 2) {
          this.imgL('static/UI/righta.png', (src) => {
            this.src1 = src;
          });
        } else if (type == 3) {
          this.imgL('static/UI/leftb.png', (src) => {
            this.src2 = src;
          });
        } else if (type == 4) {
          this.imgL('static/UI/rightb.png', (src) => {
            this.src2 = src;
          });
        } else if (type == 5) {
          this.imgL('static/UI/lefta.png', (src) => {
            this.src3 = src;
          });
        } else if (type == 6) {
          this.imgL('static/UI/righta.png', (src) => {
            this.src3 = src;
          });
        } else if (type == 7) {
          this.imgL('static/UI/leftb.png', (src) => {
            this.src4 = src;
          });
        } else if (type == 8) {
          this.imgL('static/UI/rightb.png', (src) => {
            this.src4 = src;
          });
        } else if (type == 9) {
          this.imgL('static/UI/aa.png', (src) => {
            this.src1 = src;
          });
        } else if (type == 10) {
          this.imgL('static/UI/bb.png', (src) => {
            this.src2 = src;
          });
        } else if (type == 11) {
          this.imgL('static/UI/aa.png', (src) => {
            this.src3 = src;
          });
        } else if (type == 12) {
          this.imgL('static/UI/bb.png', (src) => {
            this.src4 = src;
          });
        }
      },
      //选择下面的按钮
      btn(type) {
        if (this.clickObj == type) {
          return;
        }
        //换图开始判断
        if ((this.blue6 == 'blue' || this.blue7 == 'blue') && this.clickObj) {
          let val = Math.abs(this.clickObj - type);
          if (val == 1) {
            if (this.clickObj == 1 && type == 2 || this.clickObj == 2 && type == 1) {
              this.imgL('static/UI/aa.png', (src) => {
                this.src1 = src;
              });
            } else if (this.clickObj == 3 && type == 4 || this.clickObj == 4 && type == 3) {
              this.imgL('static/UI/bb.png', (src) => {
                this.src2 = src;
              });
            } else if (this.clickObj == 5 && type == 6 || this.clickObj == 6 && type == 5) {
              this.imgL('static/UI/aa.png', (src) => {
                this.src3 = src;
              });
            } else if (this.clickObj == 7 && type == 8 || this.clickObj == 8 && type == 7) {
              this.imgL('static/UI/bb.png', (src) => {
                this.src4 = src;
              });
            } else {
              this.changeImg(type);
            }
          } else {
            this.changeImg(type);
          }
        } else {
          this.changeImg(type);
        }
        let endTrue = true;
        if (this.blue1 !== 'blue' && this.blue2 !== 'blue') {
          if (this.clickNum >= 1) {
            this.clickNum = 0;
          } else {
            //点击了一次还需要点击一次
            this.clickNum++;
            this.clickObj = type;
            endTrue = false;
          }
        } else if (this.blue1 == 'blue' || this.blue2 == 'blue') {
          $('.showTitleBtn').css('pointer-events', 'none');
          $('.showBottomBtn').css('pointer-events', 'none');
        }
        setTimeout(() => {
          //判断对错
          if (this.blue1 == 'blue') {
            if (type <= 8) {
              this.error1 = true;
            } else {
              this.true1 = true;
            }
          } else if (this.blue2 == 'blue') {
            if (type <= 8) {
              this.true1 = true;
            } else {
              this.error1 = true;
            }
          } else if (this.blue3 == 'blue') {
            if (endTrue) {
              let val = Math.abs(this.clickObj - type);
              if (val > 1) {
                this.error1 = true;
              } else {
                let val1 = this.clickObj % 2;
                let val2 = this.clickObj - type;
                if (val1 > 0) {
                  //奇数
                  val2 > 0 ? this.error1 = true : this.true1 = true;
                } else {
                  val2 > 0 ? this.true1 = true : this.error1 = true;
                }
              }
            }
          } else if (this.blue4 == 'blue') {
            if (endTrue) {
              let val = Math.abs(this.clickObj - type);
              if (val > 1) {
                this.true1 = true;
              } else {
                let val1 = this.clickObj % 2;
                let val2 = this.clickObj - type;
                if (val1 > 0) {
                  //奇数
                  val2 > 0 ? this.true1 = true : this.error1 = true;
                } else {
                  val2 > 0 ? this.error1 = true : this.true1 = true;
                }
              }
            }
          } else if (this.blue5 == 'blue') {
            if (endTrue) {
              let val = Math.abs(this.clickObj - type);
              if (val > 1) {
                this.error1 = true;
              } else {
                let val1 = this.clickObj % 2;
                let val2 = this.clickObj - type;
                if (val1 > 0) {
                  //奇数
                  val2 > 0 ? this.error1 = true : this.true1 = true;
                } else {
                  val2 > 0 ? this.true1 = true : this.error1 = true;
                }
              }
            }
          } else if (this.blue6 == 'blue') {
            if (endTrue) {
              let val = Math.abs(this.clickObj - type);
              if (val > 1) {
                this.error1 = true;
              } else {
                let val1 = this.clickObj % 2;
                let val2 = this.clickObj - type;
                if (val1 > 0) {
                  //奇数
                  val2 > 0 ? this.error1 = true : this.true1 = true;
                } else {
                  val2 > 0 ? this.true1 = true : this.error1 = true;
                }
              }
            }
          } else if (this.blue7 == 'blue') {
            if (endTrue) {
              if (this.clickObj <= 4 && type <= 4 || this.clickObj >= 5 && type >= 5) {
                let val = Math.abs(this.clickObj - type);
                if (val > 1) {
                  this.true1 = true;
                } else {
                  let val1 = this.clickObj % 2;
                  let val2 = this.clickObj - type;
                  if (val1 > 0) {
                    //奇数
                    val2 > 0 ? this.true1 = true : this.error1 = true;
                  } else {
                    val2 > 0 ? this.error1 = true : this.true1 = true;
                  }
                }
              } else {
                this.error1 = true;
              }
            }
          }
          //清空选中状态
          this.choosed(endTrue);
        }, 500);
        //添加选中状态
        if (type <= 8) {
          $('.showTitleBtn:nth-child(' + type + ')').addClass('xuanzhong');
        } else {
          let num = type - 8;
          $('.showBottomBtn:nth-child(' + num + ')').addClass('xuanzhong');
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

  /*盒模型，padding尺⼨寸不不⽤用再减去*/
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
    font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans- serif;
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
    user-select: none;
    /* Non-prefixed version, currently not supported by
  any browser */
  }

  /*内容区*/
  .container {
    width: 100%;
    height: calc(100% - 120px);
  }

  .showDiv {
    overflow: hidden;
    width: 546px;
    height: 276px;
    position: absolute;
    top: 75px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .showTitle {
    height: 33px;
    margin-top: 20px;
  }

  .showMid {
    height: 179px;
  }

  .showBottom {
    height: 46px;
  }

  .showMid img:nth-child(1) {
    width: 67px;
    height: 143px;
    display: inline-block;
    margin: 18px 89px 18px 6px;
  }

  .showMid img:nth-child(2) {
    width: 67px;
    height: 143px;
    display: inline-block;
    margin: 18px 100px 18px 0;
  }

  .showMid img:nth-child(3) {
    width: 42px;
    height: 89px;
    display: inline-block;
    margin: 35px 93px 43px auto;
  }

  .showMid img:nth-child(4) {
    width: 42px;
    height: 89px;
    display: inline-block;
    margin: 35px 0 43px auto;
  }

  .showTitleBtn {
    width: 36px;
    height: 33px;
    display: inline-block;
    background: #FFFFFF;
    border: 0 solid rgba(0, 0, 0, 0.10);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    line-height: 33px;
    text-align: center;
    cursor: pointer;
  }

  .showBottomBtn {
    width: 48px;
    height: 43px;
    display: inline-block;
    background: #FFFFFF;
    border: 0 solid rgba(0, 0, 0, 0.10);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    line-height: 44px;
    text-align: center;
    margin: auto auto 1px 16px;
    cursor: pointer;
  }

  .showTitleBtn:nth-child(1) {
    margin-left: 1px;
    margin-top: 1px;
  }

  .true, .error {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .opacity1 {
    opacity: 0.3;
    pointer-events: none;
  }

  .xuanzhong {
    background-color: #5badfd;
    color: #ffffff;
  }
</style>
