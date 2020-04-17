<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div class="main">
        <div class="body">
          <div v-show="mainShow" style="width: 100%;height: 100%;position: relative">
            <img src="static/UI/jian.png" class="jian" alt="">
            <div id="accept1"><img :src="'static/UI/'+src1+'.png'" alt=""><img :src="'static/UI/'+duo()+'.gif'"
                                                                               style='margin-top: -128%' class="qipao1"
                                                                               alt=""></div>
            <div id="accept2"><img :src="'static/UI/'+src2+'.png'" alt=""><img :src="'static/UI/'+shao()+'.gif'"
                                                                               style='margin-top: -128%' class="qipao2"
                                                                               alt=""><img src="static/UI/hun.png"
                                                                                           style='margin: -147% auto auto 4%;width: 94%;height:93%'
                                                                                           class="hun1" alt=""></div>
            <div id="accept3"><img :src="'static/UI/'+src3+'.png'" alt=""><img src="static/UI/duo.gif"
                                                                               style='margin-top: -128%' class="qipao3"
                                                                               alt=""><img src="static/UI/hun.png"
                                                                                           style='margin: -147% auto auto 4%;width: 94%;height:93%'
                                                                                           class="hun2" alt=""></div>
            <div id="body1"></div>
            <div id="body2"></div>
            <div id="body3"></div>
            <img src="static/UI/guanzi.png" class="guanzi1" alt="">
            <img src="static/UI/guanzi.png" class="guanzi2" alt="">
          </div>
          <div v-show="!mainShow" style="width: 100%;height: 100%;position: absolute">
            <div id="accept4"><img src="static/UI/dong.gif" alt="" id="chongzai"></div>
          </div>
        </div>
        <ui-btn type="play" v-model="played" class="playBtn" v-if="Result"></ui-btn>
        <div class="err" v-if="err">×</div>
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
      <div class="center">
        <div id="drag_div1">
          <img src="static/UI/1.png" class="draggable"  id="m1">
        </div>
        <div id="drag_div2">
          <img src="static/UI/2.png" class="draggable" id="m2">
        </div>
        <div id="drag_div3">
          <img src="static/UI/3.png" class="draggable" id="m3">
        </div>
        <div id="drag_div4">
          <img src="static/UI/4.png" class="draggable" id="m4">
        </div>
        <ui-btn type="switch" v-model="switch_checked" v-if="Verification">
          验证
        </ui-btn>
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
        title: '探究酵母菌细胞呼吸的方式',
        played: false,
        switch_checked: false,
        drag_index: '',
        idindex: '',
        src1: '1',
        src2: '1',
        src3: '1',
        Result: false,
        mainShow: true,
        err: false,
        Verification: false,
        arr: [],
        arr1: [],
        an: null,
        an1: null,
        an2: null,
        an3: null,
        an4: null,
        an5: null,
      }
    },
    created() {
      document.title = this.title;
    },
    mounted() {
      this.setSideStyle();
      window.addEventListener('resize', () => {
        this.setSideStyle();
      });
      var vm=this;
      $('.draggable').draggable({
          revert: "invalid",
          start: function () {
              vm.idindex = 'm' + ($(this).parent('div').index() + 1);

              if ($(this).parent('div').index() == 1) {
                  $('#body1').addClass('active');
              } else {
                  $('#body1').addClass('active');
                  $('#body2').addClass('active');
                  $('#body3').addClass('active');
              }

          },
          stop: function () {
              $('#body1').removeClass('active');
              $('#body2').removeClass('active');
              $('#body3').removeClass('active');
          }
      });
      $('#body1').droppable({
          accept: '#m1,#m2,#m3,#m4',
          drop() {
              vm.drag_index = 'body1';
              vm.addImg();
          }
      });
      $('#body2').droppable({
          accept: '#m1,#m3,#m4',
          drop() {
              vm.drag_index = 'body2';
              vm.addImg();
          }
      });
      $('#body3').droppable({
          accept: '#m1,#m3,#m4',
          drop() {
              vm.drag_index = 'body3';
              vm.addImg();
          }
      });
    },
    computed: {},
    watch: {
      switch_checked() {
        if (this.switch_checked) {
          this.mainShow = false;
          this.imgL('static/UI/dong.gif', (src) => {
            $('#chongzai').attr('src', src);
          });
        } else {
          this.mainShow = true;
        }
      },
      played() {
        if (this.played) {
          this.Result = false;
          if (this.arr.length > 2) {
            $('.jian').css('opacity', '1');
            $('.qipao3').css('opacity', '1');
            var num = 0;
            var an = () => {
              if (num >= 1) {
                cancelAnimationFrame(this.an4);
                return;
              }
              num = num + 0.003;
              $('.hun2').css('opacity', num);
              this.an4 = requestAnimationFrame(an);
            };
            an();
          } else {
            $('.jian').css('opacity', '0');
            var num = 0;
            var an = () => {
              if (num >= 0.7) {
                cancelAnimationFrame(this.an5);
                this.Verification = true;
                return;
              }
              num = num + 0.003;
              $('.hun1').css('opacity', num);
              this.an5 = requestAnimationFrame(an);
            };
            an();
          }
          $('.qipao1').css('opacity', '1');
          $('.qipao2').css('opacity', '1');
        }
      }
    },
    methods: {
      imgL(src, callback) {
        var img = new Image();
        img.src = src + '?' + Math.random();
        img.onload = function () {
          callback && callback(img.src);
        }
      },
      duo() {
        return this.arr[0] === 'm2' ? 'qipao' : 'duo';
      },
      shao() {
        return this.arr[0] === 'm2' ? 'shao' : 'duo';
      },
      addImg() {
        if (this.drag_index === 'body1') {
          this.src1 = this.idindex.substring(1);
        } else if (this.drag_index === 'body2') {
          this.src2 = this.idindex.substring(1);
        } else if (this.drag_index === 'body3') {
          this.src3 = this.idindex.substring(1);
        }
        $('#' + this.idindex).css({
          opacity: '0',
          left: '0',
          top: '0'
        }).attr('ondragstart', 'return false');
        $('#' + this.drag_index).remove();
        this.arr.push(this.idindex);
        this.arr1.push(this.drag_index);
        if (this.arr.length == 1 && this.arr[0] === 'm2') {
          $('#body3').remove();
          $('#accept3').css('opacity', '0');
        } else if (this.arr.length == 2) {
          var num = 0;
          if (this.arr1[0] === 'body1' && this.arr1[1] === 'body2' || this.arr1[0] === 'body2' && this.arr1[1] === 'body1') {
            var an1 = () => {
              if (num >= 15) {
                cancelAnimationFrame(this.an2);
                if (this.arr[0] === 'm2' && this.arr[1] === 'm4' && this.arr1[0] === 'body1' && this.arr1[1] === 'body2' || this.arr[0] === 'm4' && this.arr[1] === 'm2' && this.arr1[0] === 'body2' && this.arr1[1] === 'body1') {
                  this.Result = true;
                  this.err = false;
                  $('#body3').remove();
                  $('#accept3').css('opacity', '0');
                } else if (this.arr[0] === 'm2' && this.arr[1] !== 'm4' || this.arr[0] !== 'm4' && this.arr[1] === 'm2') {
                  this.Result = false;
                  this.err = true;
                }
                return;
              }
              num = num + 0.2;
              $('.guanzi1').css('width', num + '%');
              this.an2 = requestAnimationFrame(an1);
            };
            an1();
          } else if (this.arr1[0] === 'body2' && this.arr1[1] === 'body3' || this.arr1[0] === 'body3' && this.arr1[1] === 'body2') {
            var an1 = () => {
              if (num >= 15) {
                cancelAnimationFrame(this.an1);
                if (this.arr[0] === 'm2' && this.arr[1] === 'm4' && this.arr1[0] === 'body1' && this.arr1[1] === 'body2' || this.arr[0] === 'm4' && this.arr[1] === 'm2' && this.arr1[0] === 'body2' && this.arr1[1] === 'body1') {
                  this.Result = true;
                  this.err = false;
                  $('#body3').remove();
                  $('#accept3').css('opacity', '0');
                } else if (this.arr[0] === 'm2' && this.arr[1] !== 'm4' || this.arr[0] !== 'm4' && this.arr[1] === 'm2') {
                  this.Result = false;
                  this.err = true;
                }
                return;
              }
              num = num + 0.2;
              $('.guanzi2').css('width', num + '%');
              this.an1 = requestAnimationFrame(an1);
            };
            an1();
          }
        } else if (this.arr.length == 3) {
          var num = 0, num1 = 0;
          var an2 = () => {
            if (num1 >= 15) {
              cancelAnimationFrame(this.an3);
              if (this.arr[0] === 'm3' && this.arr[1] === 'm1' && this.arr[2] === 'm4' && this.arr1[0] === 'body1' && this.arr1[1] === 'body2' && this.arr1[2] === 'body3' || this.arr[0] === 'm4' && this.arr[1] === 'm3' && this.arr[2] === 'm1' && this.arr1[0] === 'body3' && this.arr1[1] === 'body2' && this.arr1[2] === 'body1' || this.arr[0] === 'm1' && this.arr[1] === 'm2' && this.arr[2] === 'm3' && this.arr1[0] === 'body1' && this.arr1[1] === 'body3' && this.arr1[2] === 'body2' || this.arr[0] === 'm1' && this.arr[1] === 'm4' && this.arr[2] === 'm3' && this.arr1[0] === 'body2' && this.arr1[1] === 'body3' && this.arr1[2] === 'body1' || this.arr[0] === 'm1' && this.arr[1] === 'm3' && this.arr[2] === 'm4' && this.arr1[0] === 'body2' && this.arr1[1] === 'body1' && this.arr1[2] === 'body3' || this.arr[0] === 'm4' && this.arr[1] === 'm3' && this.arr[2] === 'm1' && this.arr1[0] === 'body3' && this.arr1[1] === 'body1' && this.arr1[2] === 'body2' || this.arr[0] === 'm4' && this.arr[1] === 'm1' && this.arr[2] === 'm3' && this.arr1[0] === 'body3' && this.arr1[1] === 'body2' && this.arr1[2] === 'body1' || this.arr[0] === 'm3' && this.arr[1] === 'm4' && this.arr[2] === 'm1' && this.arr1[0] === 'body1' && this.arr1[1] === 'body3' && this.arr1[2] === 'body2') {
                this.Result = true;
                this.err = false;
              } else {
                this.Result = false;
                this.err = true;
              }
              return;
            }
            num1 = num1 + 0.2;
            $('.guanzi1').css('width', num1 + '%');
            this.an3 = requestAnimationFrame(an2);
          };
          var an1 = () => {
            if (num >= 15) {
              cancelAnimationFrame(this.an);
              if (this.arr[0] === 'm3' && this.arr[1] === 'm1' && this.arr[2] === 'm4' && this.arr1[0] === 'body1' && this.arr1[1] === 'body2' && this.arr1[2] === 'body3' || this.arr[0] === 'm4' && this.arr[1] === 'm3' && this.arr[2] === 'm1' && this.arr1[0] === 'body3' && this.arr1[1] === 'body2' && this.arr1[2] === 'body1' || this.arr[0] === 'm1' && this.arr[1] === 'm2' && this.arr[2] === 'm3' && this.arr1[0] === 'body1' && this.arr1[1] === 'body3' && this.arr1[2] === 'body2' || this.arr[0] === 'm1' && this.arr[1] === 'm4' && this.arr[2] === 'm3' && this.arr1[0] === 'body2' && this.arr1[1] === 'body3' && this.arr1[2] === 'body1' || this.arr[0] === 'm1' && this.arr[1] === 'm3' && this.arr[2] === 'm4' && this.arr1[0] === 'body2' && this.arr1[1] === 'body1' && this.arr1[2] === 'body3' || this.arr[0] === 'm4' && this.arr[1] === 'm3' && this.arr[2] === 'm1' && this.arr1[0] === 'body3' && this.arr1[1] === 'body1' && this.arr1[2] === 'body2' || this.arr[0] === 'm4' && this.arr[1] === 'm1' && this.arr[2] === 'm3' && this.arr1[0] === 'body3' && this.arr1[1] === 'body2' && this.arr1[2] === 'body1' ||this.arr[0] === 'm3' && this.arr[1] === 'm4' && this.arr[2] === 'm1' && this.arr1[0] === 'body1' && this.arr1[1] === 'body3' && this.arr1[2] === 'body2') {
                this.Result = true;
                this.err = false;
              } else {
                this.Result = false;
                this.err = true;
              }
              return;
            }
            num = num + 0.2;
            $('.guanzi2').css('width', num + '%');
            this.an = requestAnimationFrame(an1);
          };
          if ($('.guanzi1').width() <= 0) {
            an2();
          }
          if ($('.guanzi2').width() <= 0) {
            an1();
          }
        }
      },
      //计算侧边
      setSideStyle() {
        var zoomF;
        const W = window.innerWidth - 280;
        const H = window.innerHeight - 96;
        if (W / H >= 700 / 285) {
          zoomF = H / 285;
        } else {
          zoomF = W / 700;
        }
        $('.body').css({
          width: 700 * zoomF + 'px',
          height: 285 * zoomF + 'px',
        })
      },
      //重置
      resetWidget() {
        this.Result = false;
        cancelAnimationFrame(this.an);
        cancelAnimationFrame(this.an1);
        cancelAnimationFrame(this.an2);
        cancelAnimationFrame(this.an3);
        cancelAnimationFrame(this.an4);
        cancelAnimationFrame(this.an5);
        this.an = null;
        this.an1 = null;
        this.an2 = null;
        this.an3 = null;
        this.an4 = null;
        this.an5 = null;
        this.arr = [];
        this.arr1 = [];
        this.played = false;
        this.switch_checked = false;
        this.drag_index = '';
        this.idindex = '';
        this.src1 = '1';
        this.src2 = '1';
        this.src3 = '1';
        this.Result = false;
        this.mainShow = true;
        this.err = false;
        this.Verification = false;
        var thiz = this;
        $('.jian').css('opacity', '0');
        $('.qipao1').css('opacity', '0');
        $('.qipao2').css('opacity', '0');
        $('.qipao3').css('opacity', '0');
        $('.guanzi1').css('width', '0');
        $('.guanzi2').css('width', '0');
        $('.hun1').css('opacity', '0');
        $('.hun2').css('opacity', '0');
        $('#body1,#body2,#body3').remove();
        $('#accept3').after('<div id="body1" class="ui-droppable"></div>');
        $('#body1').after('<div id="body2" class="ui-droppable"></div>');
        $('#body2').after('<div id="body3" class="ui-droppable"></div>');
        $('#accept3').css('opacity', '1');
        $('#m1,#m2,#m3,#m4').css({
          left: '0',
          top: '0',
          opacity: '1'
        }).attr('ondragstart', 'return true');

        $('#body1').droppable({
          accept: '#m1,#m2,#m3,#m4',
          drop() {
            thiz.drag_index = 'body1';
            thiz.addImg();
          }
        });
        $('#body2').droppable({
          accept: '#m1,#m3,#m4',
          drop() {
            thiz.drag_index = 'body2';
            thiz.addImg();
          }
        });
        $('#body3').droppable({
          accept: '#m1,#m3,#m4',
          drop() {
            thiz.drag_index = 'body3';
            thiz.addImg();
          }
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

  .container h3 {
    font-size: 24px;
    color: #000;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
  }

  .main {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .body {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 100px;
    overflow: hidden;
  }

  .app_aside {
    position: relative;
    float: left;
    width: 280px;
    background-color: #F7F7F7;
    height: 100%;
    box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);
  }

  .insp-wrapper {
    width: 100%;
    height: 100%;
  }

  .aside_reset {
    margin: 20px 24px;
    float: right;
  }

  #accept1, #accept2, #accept3 {
    width: 28%;
    height: 100%;
    float: left;
    border: 1px dashed #d2d2d2;
    border-radius: 5px;
    margin-right: 1%;
  }

  #accept3 {
    margin-right: 0;
  }

  #accept4 {
    width: 28%;
    height: 100%;
    border: 1px dashed #d2d2d2;
    border-radius: 5px;
    margin: 0 auto;
  }

  #body1 {
    position: absolute;
    width: 28%;
    height: 100%;
    border: 1px dashed #d2d2d2;
    border-radius: 5px;
    left: 13%;
    background: #ffffff;
  }

  #body2 {
    position: absolute;
    width: 28%;
    height: 100%;
    border: 1px dashed #d2d2d2;
    border-radius: 5px;
    left: 42%;
    background: #ffffff;
  }

  #body3 {
    position: absolute;
    width: 28%;
    height: 100%;
    border: 1px dashed #d2d2d2;
    border-radius: 5px;
    right: 1%;
    background: #ffffff;
  }

  #accept1 img, #accept2 img, #accept3 img, #accept4 img {
    width: 75%;
    height: 80%;
    margin: 15% auto;
    display: block;
  }

  .center {
    width: 240px;
    height: 400px;
    position: absolute;
    top: 60px;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }

  #drag_div1, #drag_div3 {
    width: 114px;
    height: 160px;
    float: left;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    cursor: pointer;
    margin: auto 12px 12px auto;
    background: #ffffff;
  }

  #drag_div2, #drag_div4 {
    width: 114px;
    height: 160px;
    float: left;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    cursor: pointer;
    margin: auto auto 12px auto;
    background: #ffffff;
  }

  #m1, #m2, #m3, #m4 {
    width: 79px;
    height: 122px;
    display: block;
    margin: 20px auto;
  }

  .jian {
    width: 9%;
    height: 17%;
    display: block;
    float: left;
    margin: 0 2%;
    opacity: 0;
  }

  .guanzi1 {
    width: 0;
    position: absolute;
    height: 2.8%;
    top: 13%;
    left: 34%;
    z-index: 999;
  }

  .guanzi2 {
    width: 0;
    position: absolute;
    height: 2.8%;
    top: 13%;
    left: 63%;
    z-index: 999;
  }

  .playBtn {
    position: absolute;
    right: 20px;
    bottom: 90px;
  }

  .active {
    border: 2px solid #D2D2D2;
    box-shadow: inset 0 0 15px 0 #5CAEFD;
    border-radius: 6px;
  }

  .err {
    width: 60px;
    height: 60px;
    background-color: #ffffff;
    text-align: center;
    position: absolute;
    right: 20px;
    bottom: 90px;
    line-height: 60px;
    font-size: 60px;
    color: #dc988d;
    font-weight: 400;
  }

  .qipao1 {
    opacity: 0;
  }

  .qipao2 {
    opacity: 0;
  }

  .qipao3 {
    opacity: 0;
  }

  .hun1 {
    opacity: 0;
  }

  .hun2 {
    opacity: 0;
  }
</style>
