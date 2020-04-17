<template>
  <div id="app" class="noselect">
    <!--头部-->
    <ui-head :title="title" style="background-color: #fff; box-shadow: none;">
      <ui-btn type="reset1" @click.native="resetWidget" id="button1"></ui-btn>
    </ui-head>
    <!--模型区域-->
    <div class="container">
      <div :style="[zoom]" class="viewBox">
        <dl>
          <dd>
            <div class='title'>杂种子一代</div>
            <div class='placeholder'>1</div>
            <div class='title'>隐性纯合子</div>
          </dd>
          <dd class="top-img"> <img :src="o.src" :class="o.class" v-for="o in first_dd"> </dd>
          <dd class="top-line"> <img :src="line_top"> </dd>
          <dd class="center-text"> <span v-for="t in inputs" v-html="t"></span> </dd>
          <dd class="bottom-line"> <img :src="g" v-for="g in last_line"> </dd>
          <dd class="bottom-img"> <img :src="l" v-for="l in last_dd" class="img"> </dd>
        </dl>
        <ul class="tips">
          <div class="btn1">
            <ui-btn :type="blue1" class="btn btn-1" id="button2" @click.native="btn1">配子</ui-btn>
          </div>
          <div class="btn2 ">
            <ui-btn :type="blue2" :style="'cursor:'+pointer+';'" class="btn btn-2" id="button3" @click.native="btn2">子代</ui-btn>
          </div>
        </ul>
        <ul class="text">
          <div class="btn1 btn-1">
            配子
          </div>
          <div class="btn2 text-2">
            测交后代
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
export default {
  name: 'app',
  components: { uiHead, uiBtn },
  data() {
    return {
      title: '两对相对性状的测交实验',
      BtnSpaceStyle: 'flex',
      zoom: {}, //区域大小
      line_top: 'static/Arrow/line-1.png',
      inputs: ['RY', 'Ry', 'rY', 'ry', 'ry'],
      first_dd: [{ class: 'img', src: 'static/img/t1.png' }, { class: 'icon', src: 'static/img/or.png' }, { class: 'img', src: 'static/img/t2.png' }, ],
      last_dd: ['static/img/t1.png', 'static/img/b1.png', 'static/img/b2.png', 'static/img/t2.png', ],
      last_line: ['static/Arrow/line-2.png', 'static/Arrow/line-3.png', 'static/Arrow/line-4.png', 'static/Arrow/line-5.png', ],
      blue1: '',
      blue2: '',
      pointer: 'auto'
    }
  },
  mounted() {
    this.resize();
    this.getViewSize();
  },
  computed: {},
  created() {
    document.title = this.title;
  },
  methods: {
    btn1() {
      this.blue1 = 'blue';
      var thiz = this;
      $('.top-line img').animate({ opacity: 1 }, 500, function() {
        $('.center-text span').animate({ opacity: 1 }, 500, function() {
          thiz.pointer = 'pointer';
          $('.btn-2').animate({ opacity: 1 }, 500);
        });
      });
      $('.text .btn-1').animate({ opacity: 1 });
    },
    btn2() {
      if (this.blue1 != 'blue') {
        return;
      }
      this.blue2 = 'blue';
      $('.bottom-line img').eq(0).animate({ opacity: 1 }, 500, function() {
        $('.bottom-img img').eq(0).animate({ opacity: 1 }, 500, function() {
          $('.bottom-line img').eq(1).animate({ opacity: 1 }, 500, function() {
            $('.bottom-img img').eq(1).animate({ opacity: 1 }, 500, function() {
              $('.bottom-line img').eq(2).animate({ opacity: 1 }, 500, function() {
                $('.bottom-img img').eq(2).animate({ opacity: 1 }, 500, function() {
                  $('.bottom-line img').eq(3).animate({ opacity: 1 }, 500, function() {
                    $('.bottom-img img').eq(3).animate({ opacity: 1 }, 500);
                  })
                })
              })
            })
          })
        });
      });
      $('.text-2').animate({ opacity: 1 });
    },
    resetWidget() {
      $('.top-line img,.center-text span,.btn-2').stop(true).animate({ opacity: 0 });
      $('.bottom-line img').stop(true).animate({ opacity: 0 });
      $('.bottom-img img').stop(true).animate({ opacity: 0 });
      $('.text .btn-1').stop(true).animate({opacity:0});
      $('.text-2').stop(true).animate({opacity:0});
      this.blue1 = '';
      this.blue2 = '';
      this.pointer = 'auto';
    },
    //计算区块大小
    getViewSize() {
      const W = window.innerWidth;
      const H = window.innerHeight - 72;
      if (W / H >= 744 / 505) {
        this.zoom = {
          zoom: H / 505
        }
      } else {
        this.zoom = {
          zoom: W / 744
        }
      }
    },
    //窗口大小更改
    resize() {
      const vm = this;
      window.addEventListener('resize', function() {
        vm.getViewSize();
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
  touch-action: none;
  -ms-touch-action: none;
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


/*内容区*/

.container {
  width: 100%;
  height: calc(100% - 76px);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.viewBox {
  position: relative;
  width: 744px;
  height: 505px;
  padding: 20px 0;
}

dd {
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

dd .img {
  display: inline-block;
  width: 110px;
  height: 110px;
}

dd .icon {
  display: inline-block;
  width: 33px;
  height: 33px;
  margin: 38px 33px;
}

.top-line {
  margin-top: 4px;
  margin-bottom: 5px;
  width: 377px;
  height: 47px;
}

.top-line img {
  opacity: 0;
  width: 100%;
  height: 100%;
  margin-left: 213px;
}

.center-text {
  margin: 4px 0 8px -185px;
}

.center-text span {
  opacity: 0;
  width: 37px;
  height: 37px;
  line-height: 32px;
  background: url("../static/img/circle.png") 0 0 no-repeat;
  background-size: 100% 100%;
  font-family: Arial-Black;
  text-align: center;
  margin-right: 40px;
  font-size: 18px;
  color: #000000;
}

.center-text span:last-child {
  position: relative;
  left: 65px;
}

.bottom-line {
  position: relative;
  height: 74px;
  margin-bottom: 9px;
}

.bottom-line img {
  opacity: 0;
  position: absolute;
  height: 100%;
  left: 100px;
  width: 425px;
}

.bottom-img {
  margin-left: -50px;
}

.bottom-img img {
  opacity: 0;
  margin-right: 35px;
}

.tips {
  float: right;
  position: absolute;
  right: 0px;
  bottom: 120px;
}
.text {
   /*float: right;*/
  position: absolute;
  left: 0;
  bottom: 120px;
  line-height: 44px;
  color:#333;
  font-size:14px;

}
.text .btn {
  display: block;
  width: 98px;
  height: 44px;
}
.tips .btn {
  display: block;
  width: 98px;
  height: 34px;
  line-height: 34px;
  border: 0 solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  font-family: PingFangSC-Medium;
  font-size: 14px;
  /*color: #000000;*/
}

.btn1,
.btn2 {
  width: 98px;
  height: 44px;
}

.tips .btn1 {
  position: relative;
  bottom: 120px;
}

.tips .btn-2 {
  opacity: 0;
}
.text .btn1 {
  position: relative;
  bottom: 120px;
}
.tips .btn-2 {
  opacity: 0;
}
.text .btn-1 {
  opacity: 0;
}
.text .text-2 {
  opacity: 0;
}
.title {
  width:110px;
  text-align:center;
  color:#333;
  line-height: 1.5;
  font-size: 14px;
}
.placeholder {
  width:100px;
  opacity: 0;
}
dl {
  transform: translateX(30px);
}
</style>
