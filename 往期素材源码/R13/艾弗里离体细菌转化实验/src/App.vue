<template>
  <div id="app" class="noselect">

    <div class="menu" @click="sliderMenu(1)" v-show="isSmall" ref="menu"></div>

    <div class="container" @click="sliderMenu(2)" ref="container">
      <ui-head :title="title" class="tl"></ui-head>
      <div class="Tip" v-if="needTip">建议您在电脑或平板上打开，以获取最佳的演示效果</div>


      <!--视图区-->
      <div class="View_area">
        <!--在培养皿上面的菌落-->
        <div class="selectedImgs" :style="{'left':C1/2+'px','width':W1 +'px'}">
          <img src="static/img/n1.png" :style="{'zoom':zoomF}"/>
          <img src="static/img/n3.png" :style="{'zoom':zoomF}"/>
          <img src="static/img/n4.png" :style="{'zoom':zoomF}"/>
          <img src="static/img/n2.png" :style="{'zoom':zoomF}"/>
        </div>

        <div class="imgBox" :style="{'width':W+'px','height':H+'px','left':C1/2-15+'px'}">
          <img src='static/img/Smooth_Germ.png' alt="菌落">
          <img src="static/img/n6.png" class="S_all"/>
          <img src='static/img/Rough_Germ.png' alt="菌落" id="Smooth">

        </div>

      </div>
    </div>


    <!--侧边栏-->
    <div class="Right_slider" ref="slides" :style="{'zoom':zoomF1}">

      <ui-btn id="clear" type="reset1" @click.native="reset"></ui-btn>
      <div class="box">

        <div class="category">
          <div class="imgShow">
            <img src="static/img/S_DNA.png" alt="S型菌DNA" @click="selectImgs(0)">
            <p class="imgDesc">S型菌DNA</p>
          </div>

          <div class="imgShow">
            <img src="static/img/S_Pro.png" alt="S型菌蛋白质" @click="selectImgs(1)">
            <p class="imgDesc">S型菌蛋白质</p>
          </div>

          <div class="imgShow">
            <img src="static/img/S_Poly.png" alt="S型菌多糖" @click="selectImgs(2)">
            <p class="imgDesc">S型菌多糖</p>
          </div>


          <div class="imgShow">
            <img src="static/img/DNAFerment.png" alt="DNA酶" @click="selectImgs(3)">
            <p class="imgDesc">DNA酶 </p>
          </div>
          <div class="btn_control">
            <ui-btn class="add" @click.native="ImgAnimate">加入</ui-btn>
          </div>
        </div>

      </div>
    </div>
    <!--旋转提示-->
    <div class="hen" v-if="isHp">
      <div><img src="static/img/xuanzhuan.png" alt=""><span>请将屏幕自动旋转功能打开并横屏使用</span></div>
    </div>
  </div>
</template>

<script>
  import uiBtn from './components/uiBtn'
  import uiHead from './components/uiHead'
  export default {
    name: 'App',
    components: {
      uiBtn, uiHead
    },
    data() {
      return {
        title: '艾弗里离体细菌转化实验',
        W: 0,
        H: 0,
        zoomF: 1,
        zoomF1: 1,
        canSlide: true,
        isHidden: false,
        flag: false,
        //是否是移动端
        isMob: /iPhone|Android|SymbianOS|Windows Phone/g.test(navigator.userAgent),
        //是否是横屏
        isHp: false,
        isSmall: false,
        needTip: false,
        C1: 0,
        //保存被选中要不加入的图片信息
        checkList: [0, 0, 0, 0],
        W1: 0,
        tm1: null,
        Step:0,
        timer:null
      }
    },
    created() {
      document.title = this.title;
    },
    mounted() {
      // this.selectImgs();
      this.listenResize();
      var that = this;
      var Cw = $(".container").width();
      this.C1 = Cw;
      window.addEventListener('resize', function () {
        that.listenResize();
      });
    },
    methods: {

      //选择图片事件
      selectImgs: function (index) {
        var that = this;
        var IMG=$(".imgShow");
            IMG.eq(index).toggleClass("active");
      },
      //点击加入时触发的事件
      ImgAnimate: function () {

        var timer1 = null;
        var Dis = $('.View_area').height() / 2 - $('.selectedImgs').height() / 2;
        var that = this;
        var imgshow = $(".imgShow");

        //表示没有加过
        if(!$('.add').hasClass('cked'))
        {
            var number = 0;
            //统计个数
            imgshow.each(function (index, v) {
              if ($(v).hasClass('active')) {
                that.checkList[index] = true;
                number++;
              }
            });
            if(imgshow.hasClass('active')){
              $('.add').addClass('cked');
              imgshow.addClass('Disabled')
            }
            //判断选择一个还是多个
            this.checkList.forEach((v, index) => {
              if (this.checkList[index]) {
                //只有一个时居中显示
                if (number === 1) {
                  $('.selectedImgs img').eq(index).addClass('single')
                }
                $('.selectedImgs img').eq(index).addClass('Tp1');
                $('.selectedImgs img').eq(index).animate({opacity:1},500);
              }
            });

          //第一张和第四张不能同时选中
          if (imgshow.eq(0).hasClass('active') && !imgshow.eq(3).hasClass("active")) {
            //待掉落动画结束后
            this.tm1 = setTimeout(function () {
              $("#Smooth").fadeOut(2000, function () {
                setTimeout(function () {
                  $('.S_all').addClass('Tp2')
                }, 100)
              });
            }, 1500)
          }


          //添加掉落动画
          var TX=Math.ceil(Dis/this.zoomF)+'px';
          $('.Tp1').css({'-webkit-transform':'translateY('+TX+')','transform':'translateY('+TX+')'})


          //掉落动画结束后物料的行为
          that.timer=setTimeout(function () {
            $('.selectedImgs img').animate({opacity:0},600);
            setTimeout(function () {
              $('.selectedImgs img').removeClass('Tp1');
            }, 400);
          },1200);


        }
      },
      reset() {
        this.checkList = [];
        var Img = $('.selectedImgs img');
        var imgShow = $('.imgShow');
        var that = this;
        //取消定时器
        clearTimeout(that.tm1);
        //停止切换图
        $('#Smooth').stop();
        //恢复原状态
        $('#Smooth').css({'display': 'inline-block', 'opacity': 1});
        $('.S_all').removeClass('Tp2');
        imgShow.removeClass("active");
        imgShow.removeClass("Disabled");

        clearTimeout(that.timer);
        clearTimeout(that.tm1);
        Img.stop();
        Img.removeClass('Tp1');
        Img.addClass('Tp3');
        setTimeout(function () {
          Img.removeClass('single');
          Img.removeClass('Tp3');
          Img.css({
            'display':'inline-block',
            'opacity':0,
            'transform':'translateY(0)'
          });

        },100);
        $('.add').removeClass('cked');
      },
      listenResize() {
        var W1 = window.innerWidth;
        var H1 = window.innerHeight;
        if(W1 == 0 || H1 == 0){
          return;
        }
        if (W1 < 500 || H1 < 500) {
          this.isSmall = true;
          $('.Right_slider').css({'right':'-290px'});
          $('.menu').css({'top':"0px"});
          $('.container').css({'width':'100%'});

          if (H1 > W1 && this.isMob) {
            this.isHp = true;
          }
          else {
            this.isHp = false;
          }
          this.needTip = true;
          setTimeout(() => {
            this.needTip = false;
          }, 3000)
        }
        else {
          this.isSmall = false;
          this.isHp = false;
          $('.container').css({'width':W1-'310'+'px'});
          $('.Right_slider').css({'right':'0'});

        }

        var Cw = $(".container").width();
        this.C1 = Cw;
        if (W1 / H1 > 680 / 400) {
          var boxH = $(".View_area").height();
          if(W1>900||H1>500){
            this.H = boxH - 160;
            this.W = this.H * 650 / 400;
            this.zoomF = (H1 / 850).toFixed(2);
            this.W1 = this.W / 4;
          }
          else {
            this.H = boxH - 100;
            this.W = this.H * 720 / 406;
            this.zoomF = (H1 / 550).toFixed(2);
            this.W1 = this.W *5/ 12;
          }
        }
        else {

          var boxW = $(".View_area").width();
          this.W = boxW - 50;
          this.H = this.W * 400 / 720;
          if(W1>900||H1>500){
            this.W = boxW - 70;
            this.zoomF = (W1 / 1500).toFixed(2);
            this.W1 = this.W / 4;
          }
          else {
            this.W = boxW-20;
            this.zoomF = (W1 / 1100).toFixed(2);
            this.W1 = this.W *5/ 12;
          }
        }
      },

      sliderMenu(val) {
        var W1 = window.innerWidth;
        var H1 = window.innerHeight;
        if (val == 1) {
          $('.container').css({'width':W1-'310'+'px'});
          $('.menu').css({'top':"-50px"});
          $('.Right_slider').css({'right':'0'});

        }
        if (val == 2 && this.isSmall) {
          this.isSmall = true;
          $('.container').css({'width':'100%'});
          $('.menu').css({'top':"0px"});
          $('.Right_slider').css({'right':'-290px'});

        }
      }
    }
  }
</script>

<style>
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
    margin: 0;
    padding: 0;
    position: relative;
  }

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }

  .Ui-head {
    background-color: #fff !important;
    box-shadow: none !important;
    position: absolute;
    left: 10px;
    top: 10px;
  }

  .Ui-head h3 {
    padding: 0;
    margin: 0;
  }

  .container {
    position: absolute;
    top: 0;
    height: 100%;
    width: calc(100% - 300px);
  }

  .Right_slider {

    position: absolute;
    right: 0;
    top: 0;
    width: 280px;
    height: 100%;
    background-color: #f7f7f7;

  }

  .box {

height: calc(100% - 65px);
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin-top: 30px;
    z-index: 12;
    overflow: hidden;
    overflow-y: auto;
  }

  .category{

    width: 100%;
    margin-top: 45px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .UI-btn {
    position: absolute;
    right: 24px;
    top: 20px;

  }

  .View_area {
    width: 100%;
    height: 100%;
    position: relative;
    display: inline-block;

  }

  .View_area div.imgBox img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
  }

  .imgBox {
    display: inline-block;
    position: absolute;
    top: calc(50% - 35px);
    transform: translate(-50%, -50%);
margin-left: 18px;
  }
.imgBox img{
  pointer-events: none;
}
  div.imgBox img.S_all {
    opacity: 0;
  }

  .imgShow {

    display: inline-block;
    width: 48%;
    text-align: center;
    margin: 4% 0;
    cursor: pointer;

  }

  .imgShow img {
    width: 80px;
    height: 80px;

    z-index: 9999;
  }

  .active {
    filter: drop-shadow(2px 2px 10px #35c7ff)
  }

  .btn_control {

    width: 100%;
    height: 45px;
    text-align: center;
    margin-top: 10px;
    position: relative;
    text-align: center;
  }

  .tl {
    padding: 10px 0 !important;
    margin: -5px 24px !important;
  }

  .add {
    width: calc(100% - 30px);
    text-align: center;
    font-size: 16px;
    display: inline-block;
    padding: 0 16px;
    position: absolute;
    height: 35px;
    line-height: 35px !important;
    left: 10px;
    top: 0;

  }

  .selectImg {
    overflow: hidden;
  }

  .selectedImgs {
    position: absolute;
    top: 0;
    left: 50%;
    width: 400px;
    height: 100px;
    transform: translateX(-50%);
    z-index: 200;

  }

  .selectedImgs img {
    z-index: 999;
    opacity: 0 ;
    transform: translateY(0);
    -webkit-transform: translateY(0);
    -o-transform: translateY(0);
    -ms-transform: translateY(0);
  }

  .selectedImgs img:nth-child(1) {
    position: absolute;
    left: 5%;
    top: 0;
    width: 50px;
    height: 50px;
  }

  .selectedImgs img:nth-child(2) {
    position: absolute;
    left: 25%;
    top: 0;
    width: 80px;
    height: 55px;
  }

  .selectedImgs img:nth-child(3) {
    position: absolute;
    left: 55%;
    top: 0;
    width: 80px;
    height: 57px;
  }

  .selectedImgs img:nth-child(4) {
    position: absolute;
    left: 83%;
    top: 0;
    width: 55px;
    height: 64px;
  }

  .selectedImgs img.single {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

  }

  img.Tp1 {
    transition: transform 1200ms !important;
    -moz-transition:transform 1200ms !important;	/* Firefox 4 */
    -webkit-transition: transform 1200ms !important;	/* Safari 和 Chrome */
    -o-transition: transform 1200ms !important;	/* Opera */
  }



  .Tp2 {

    opacity: 1 !important;

  }
img.Tp3{
  opacity: 0 !important;
}
  .imgDesc {
    text-align: center;
    margin: 0;
    color: #4d4d4d;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    line-height: 30px;

  }




  .menu {
    position: fixed;
    height: 48px;
    width: 48px;
    right: 30px;
    top: -40px;
    cursor: pointer;
    background: url('./img/menu.png') no-repeat;
    background-size: contain;
    background-position: center center;
    z-index: 101;
    transition: all linear 1s;
  }

  .hen {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: #fff;
  }

  .hen div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }

  .Tip {
    padding: 0 10px;
    position: fixed;
    display: inline-block;
    width: 450px;
    height: 48px;
    border-radius: 100px;
    z-index: 99;
    line-height: 46px;
    font-weight: normal;
    border: 2px solid #ddd;
    font-size: 18px;
    color: #333;
    margin: 0 auto;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;

  }

  div.Disabled {
    filter: drop-shadow(2px 2px 10px #aaa);
    opacity: 0.5;
    cursor: default;

  }

  @media all and (orientation: landscape) {
    .Right_slider {
      position: absolute;
      right: 0;
      top: 0;
      width: 280px;
      height: 100%;
      background-color: rgba(247, 247, 247, 0.8);
      z-index: 999;
      transition: all linear 1s;

    }

  }

  @media screen and (max-height: 500px) {
    .selectedImgs {
      position: absolute;
      width: 150px;
      top: 0;
      left: 80%;
      transform: translateX(-50%);
      z-index: 200;
    }

  }

  .cked {
    background-color: #25a3ff !important;
    color: white !important;
  }


</style>
