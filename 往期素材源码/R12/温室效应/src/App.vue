<template>
  <div id="app" class="noselect">
    <ui-head :title="title">
      <ui-btn type="reset1" @click.native="reset"></ui-btn>
    </ui-head>
    <img src="static/img/AirTop.png" alt="大气上层" class="AirTop">
    <div class="container">
      <div class="viewLeft">
        <img src="static/img/Cloud.png" alt="云层" class="Cloud">
        <div class="Arrowput_top">
          <img src="static/img/Arrow_big.png" class="TP3"/>
          <img src="static/img/Arrow_big.png" class="TP3"/>
          <img src="static/img/Arrow_big.png" class="TP3" />
        </div>
        <div class="viewLeft_mid">
          <img :src="img.src" alt="" v-for="img in imgList.src2"
               :style="'left:'+img.Left+';'+'top:'+img.Top+';'+'transform:'+'translate'+'('+img.TSX+'px'+','+img.TSY+'px'+')'+';width:'+HEIGHT/10+'px'+';height:'+HEIGHT/10+'px'+';'+'opacity:'+img.OP"
               :class="level"
          >
        </div>
        <div class="Arrowput_bottom">
          <div class="Arrowput_bottom_item">
            <img src='static/img/Arrow_big.png' alt="" class="TP1 ac"  >
            <img src='static/img/Arrow_mid.png' alt="" class="TP2 ac1" >
          </div>
          <div class="Arrowput_bottom_item">
            <img src='static/img/Arrow_big.png' alt="" class="TP1 actives1">
            <img src='static/img/Arrow_mid.png' alt="" class="TP2 actives2">
          </div>
          <div class="Arrowput_bottom_item" >
            <img src='static/img/Arrow_big.png' alt="" class="TP1 ab"  >
            <img src='static/img/Arrow_mid.png' alt="" class="TP2 ab1">
          </div>
        </div>
      </div>
    </div>
    <div class="viewRight">
      <!--温度计显示模块-->
      <div class="item1">
        <img src="static/img/Template.png"/>
      </div>
      <div class="item2">
        <img src="static/img/Template_rule.png"/>
      </div>
    </div>
    <!--滑动条-->
    <div class="sliderController">
      <img src="static/img/example_Air.png" alt="" class="imgs">
      <div class="sliders">
        <div class="slider-tip">
          <span class="low">低</span>
          <span class="height">高</span>
        </div>
        <ui-slider
          :title="false"
          :boxWidth="220"
          :boxHeight="40"
          :tooltip="true"
          :noBlueProcess="false"
          :min="0"
          :max="8"
          :speed="0"
          :value="values"
          :clickable="false"
          v-model="values">

        </ui-slider>
      </div>
    </div>
  </div>
</template>

<script>
  import uiSlider from '@/components/UI/uiSlider'
  import uiHead from '@/components/UI/uiHead'
  import uiBtn from '@/components/UI/uiBtn'

  export default {
    name: 'App',
    components: {
      uiSlider, uiHead, uiBtn
    },
    data() {
      return {
        title: '温室效应',
        values: 0,
        V:0,
        level: 'level1',
        Fn: null,
        imgList: {
          src2: [
            {
              src: "static/img/img1.png",
              Left: '20%',
              Top: '20%',
              TSX: 0,
              TSY: 0
            },
            {
              src: "static/img/img3.png",
              Left: '40%',
              Top: '20%',
              TSX: 0,
              TSY: 0
            },
            {
              src: "static/img/img2.png",
              Left: '80%',
              Top: '20%',
              TSX: 0,
              TSY: 0
            },
            {
              src: "static/img/img2.png",
              Left: '30%',
              Top: '60%',
              TSX: 0,
              TSY: 0
            },
            {
              src: "static/img/img5.png",
              Left: '50%',
              Top: '60%',
              TSX: 0,
              TSY: 0
            },
            {
              src: "static/img/img3.png",
              Left: '70%',
              Top: '60%',
              TSX: 0,
              TSY: 0
            },
            {
              src: "static/img/img2.png",
              Left: '10%',
              Top: '60%',
              TSX: 0,
              TSY: 0,
              OP:0
            },
            {
              src: "static/img/img3.png",
              Left: '5%',
              Top: '10%',
              TSX: 0,
              TSY: 0,
              OP:0
            },
            {
              src: "static/img/img1.png",
              Left: '55%',
              Top: '20%',
              TSX: 0,
              TSY: 0,
              OP:0
            },
            {
              src: "static/img/img2.png",
              Left: '65%',
              Top: '10%',
              TSX: 0,
              TSY: 0,
              OP:0
            },
            {
              src: "static/img/img4.png",
              Left: '85%',
              Top: '60%',
              TSX: 0,
              TSY: 0,
              OP:0
            },
            {
              src: "static/img/img4.png",
              Left: '30%',
              Top: '10%',
              TSX: 0,
              TSY: 0,
              OP:0
            },
            {
              src: "static/img/img1.png",
              Left: '60%',
              Top: '50%',
              TSX: 0,
              TSY: 0,
              OP:0
            },
            {
              src: "static/img/img2.png",
              Left: '90%',
              Top: '10%',
              TSX: 0,
              TSY: 0,
              OP:0
            },




          ],
          src3: [
            {
              imgM: "static/img/Arrow_mid.png",
              imgB: "static/img/Arrow_big.png",
            }
          ]
        },
        HEIGHT: 0,
        WIDTH: 0,
        timeTip1:null,
        timeTip2:null,
        tm :null

      };
    },
    watch: {
      values(val) {
        var that=this;
        this.timeTip2 = new Date().getTime();
        if (this.timeTip2 - this.timeTip1 < 100 || this.val == 1) {
            this.timeTip1 = this.timeTip2;

            setTimeout( ()=>{
              this.Fn.templateChange(val);
            },200);

         clearTimeout(that.tm);
          this.tm = setTimeout(() => {
            if (val > 2) {
              $('.ab').addClass('actives1');
              $('.ab1').addClass('actives2');
            }
            else {
              $('.ab').removeClass('actives1');
              $('.ab1').removeClass('actives2');
            }
            if (val > 3) {
              $('.TP3').eq(2).addClass('shows');
            }
            else {
              $('.TP3').eq(2).removeClass('shows');
            }

            if (val > 5) {
              $('.TP3').eq(0).addClass('shows');
              $('.ac').addClass('actives1');
              $('.ac1').addClass('actives2');
            }
            else {
              $('.TP3').eq(0).removeClass('shows');
              $('.ac').removeClass('actives1');
              $('.ac1').removeClass('actives2');
            }
            this.Fn.ParticleNumber(val);
            this.Fn.changeParticle(val);
            this.Fn.ParticleMove(val);
            this.timeTip1 = this.timeTip2;
          }, 600);

        }
        else {
          if (val > 2) {
            $('.ab').addClass('actives1');
            $('.ab1').addClass('actives2');
          }
          else {
            $('.ab').removeClass('actives1');
            $('.ab1').removeClass('actives2');
          }
          if (val > 3) {
            $('.TP3').eq(2).addClass('shows');
          }
          else {
            $('.TP3').eq(2).removeClass('shows');
          }

          if (val > 5) {
            $('.TP3').eq(0).addClass('shows');
            $('.ac').addClass('actives1');
            $('.ac1').addClass('actives2');
          }
          else {
            $('.TP3').eq(0).removeClass('shows');
            $('.ac').removeClass('actives1');
            $('.ac1').removeClass('actives2');
          }
          this.Fn.ParticleNumber(val);
          this.Fn.changeParticle(val);
          this.Fn.ParticleMove(val);
          this.Fn.templateChange(val);
          this.timeTip1 = this.timeTip2;

        }
      }
    },
    created() {
      document.title = this.title;
    },
    mounted() {

      this.getViewSize();
      this.Fn = this.init();
      window.addEventListener('resize', () => {
        this.getViewSize();
      });

      this.Fn.ParticleMove(3);
    },
    methods: {
      getViewSize() {
        this.WIDTH = $('.viewLeft').width();
        this.HEIGHT = $('.viewLeft').height();

        $('.AirTop').height(this.WIDTH * 125 / 853 + 'px');
        $('.Cloud,.Arrowput_top').height(this.WIDTH * 66 / 729 + 'px');
        $('.TP3').height(this.WIDTH * 66 / 729 + 'px');


        //窄屏
        if(this.WIDTH/this.WIDTH<(1050/893)&&(this.WIDTH<1050)){
          $('.viewLeft_mid').height((this.HEIGHT/3) +'px');
          $('.Arrowput_bottom').height(this.HEIGHT/3 + 'px');

        }
        //宽屏
        else if(this.WIDTH/this.HEIGHT>(1300/893)){
          $('.viewLeft_mid').height(this.HEIGHT/3  + 'px');
          $('.Arrowput_bottom').height(this.HEIGHT/2.3 + 'px');
          $('.Arrowput_bottom').width(this.WIDTH/1.2 + 'px');
        }
        //正常屏
        else {
          $('.viewLeft_mid').height((this.WIDTH-100)/3 +'px');
          $('.Arrowput_bottom').height(this.WIDTH/4 + 'px');
        }


      },
      init() {
        var timer = null;
        var item2 = $('.item2 img');
        var pos=[
          {x:10,y:65},
          {x:65,y:10},
          {x:5,y:15},
          {x:85,y:55},
          {x:55,y:22},
          {x:20,y:65},
          {x:30,y:5},
          {x:60,y:75},

        ];

        //温度计温度改变

        var templateChange = (val) => {

          var targeH = 40 + val * 12;
          item2.css('height', targeH);
        };
        //粒子震动
        var ParticleMove = (A) => {

          var that = this;
          if (timer) {
            clearTimeout(timer)
          }
          var flag = 0;
          if (Math.random() >= 0.5) {
            flag = 1
          } else {
            flag = -1
          }
          A < 1 ? A = 1 : null;
          var VA = A * flag;
          if (timer) {
            clearTimeout(timer)
          }

          function run() {
            that.imgList.src2.forEach((val, index) => {
              var tp1 = (Math.random()* VA).toFixed(1);
              var tp2 = (Math.random() * VA).toFixed(1);
              that.imgList.src2[index].TSX = tp1;
              that.imgList.src2[index].TSY = tp2;
            });
            timer = setTimeout(run, 120)
          }

          run();
        };
        //粒子的外圈颜色改变
        var changeParticle = (number) => {

          var LV = Math.ceil(number / 1.5);
          if (LV <= 1) {
            LV = 1;
          }
          this.level = 'level' + LV;
        };
        var ParticleNumber = (number) => {
          //随机选择粒子
          var TL = number + 6;
          var L = this.imgList.src2.length;
         for(var i=6;i<TL;i++){
           this.imgList.src2[i].OP=1
         }
         for(var i=TL;i<L;i++){
           this.imgList.src2[i].OP=0
         }
        };
        var TO = function () {
          return {
            templateChange,
            ParticleMove,
            changeParticle,
            ParticleNumber
          }
        };
        return TO();
      },
      reset() {
        this.values = 0;
        this.level = 'level1';
        $('.item2 img').css('height', '40px');
      },
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

  html,
  body,
  #app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    background-color: #fff;
    touch-action: none;
    -ms-touch-action: none;
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

  div.Ui-head {
    height: 70px;
    position: relative;
    background: -webkit-linear-gradient(#fcd242, #f2e59c, #e0e9d9); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#fcd242, #f2e59c, #e0e9d9); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#fcd242, #f2e59c, #e0e9d9); /* Firefox 3.6 - 15 */
    background: linear-gradient(#fcd242, #f2e59c, #e0e9d9); /* 标准的语法 */
    box-shadow: none;
  }

  div.Ui-head h3 {
    position: absolute;
    left: 30px;
    top: 0;
  }

  .sliderController {
    position: absolute;
    bottom: 25px;
    right: 10px;
    height: 110px;
    width: 220px;
    overflow: hidden;
    border-radius: 8px;
    z-index: 999;
    background-color: #fff;
  }

  .imgs {
    display: inline-block;
    width: 204px;
    height: 41px;
    margin: 4px 35px 0 14px;
  }

  .container {
    height: 100%;
    width: 100%;
    position: relative;
    background: -webkit-linear-gradient(#e0e9d9, #a5d5fa, #59a9cf); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#e0e9d9, #a5d5fa, #59a9cf); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#e0e9d9, #a5d5fa, #59a9cf); /* Firefox 3.6 - 15 */
    background: linear-gradient(#e0e9d9, #a5d5fa, #59a9cf); /* 标准的语法 */
  }



  .viewLeft {
    width: 90%;
    height: 100%;
    position: absolute;
    left: 2%;
  }



  .viewRight {
    width: 60px;
    height: 278px;
    position: absolute;
    right: 20px;
    z-index: 9;
    bottom: 90px;
    top: 0;
    margin: auto;
  }

  .uiSlider, .ui-box {
    box-shadow: none !important;
    border: none !important;
  }

  div.uiSlider {
    position: absolute;
    left: -30px;
    top: 20px;
  }

  .sliders {
    position: relative;
  }

  .slider-tip {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
  }

  .slider-tip span {
    display: inline-block;
    color: #999;
  }

  .slider-tip span.low {
    margin-left: 10px;
    float: left;
  }

  .slider-tip span.height {
    float: right;
    margin-right: 10px;
  }

  .viewLeft_mid {
    padding: 30px;
    width: 100%;
    position: relative;
  }

  .Arrowput_top {
    width: 100%;
    top: 10%;
    position: absolute;
    z-index: 999;
  }

  .Arrowput_bottom {
    width: calc(100% - 150px);
    position: relative;
  }

  .Arrowput_bottom_item {
    margin-top: 20px;
    height: 100%;
    line-height: 100%;
    width: 31%;
    position: absolute;
  }

  .Arrowput_bottom_item:nth-child(1) {
    left: 1%;
  }

  .Arrowput_bottom_item:nth-child(2) {
    left: 32%;
  }

  .Arrowput_bottom_item:nth-child(3) {
    left: 65%;
  }

  @keyframes Animates1 {
    0% {
      transform: translateY(40px);
      opacity: 0;
    }

    100% {
      opacity: 1;
     transform: translateY(0px);
    }
  }

  @keyframes Animates2 {
    0% {
      opacity: 0;
     transform: translateY(-40px);
    }
  52%{
    opacity: 0;
  transform: translateY(-40px);
  }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  .TP1 {
    width: 55%;
    height: 60%;
    position: absolute;
    opacity: 0;

  }



  .TP2 {
    width: 41%;
    height: 40%;
    position: absolute;
    left: 57%;
    top: -20px;
    opacity: 0;
  }

  .TP3 {
    position: absolute;
    display: inline-block;
  }


  .TP3:nth-child(1) {
    left: 10%;
  }

  .TP3:nth-child(2) {
    left: 40%;
  }

  .TP3:nth-child(3) {
    right: 25%;
  }

  .actives1{
    animation: Animates1 300ms linear forwards;
opacity: 1;
  }
  .actives2{
    animation: Animates2 800ms linear forwards;
opacity: 1;
  }
  div.imgBox {
    float: left;
    width: 200px;
    height: 70px;
    margin-left: 10px;
    position: relative;
  }

  div.uiSlider {
    position: absolute;
    left: -15px;
    top: 20px;
  }

  div.vue-slider {
    position: absolute;
    left: 0;
    top: 0;
    margin-top: 20px !important;
  }

  .level1 {
    filter: drop-shadow(2px 2px 15px #ff7e78)
  }

  .level2 {
    filter: drop-shadow(2px 2px 10px #ff856a)
  }

  .level3 {
    filter: drop-shadow(2px 2px 10px #ff7443)
  }

  .level4 {
    filter: drop-shadow(2px 2px 10px #ff6031)
  }

  .level5 {
    filter: drop-shadow(2px 2px 10px #ff4617)
  }

  .level6 {
    filter: drop-shadow(2px 2px 10px #ff0000)
  }

  .item1 {
    width: 60px;
    height: 278px;
  }

  .item2 {
    width: 9px;
    height: 191px;
    position: absolute;
    left: 25px;
    top: 16px;
    overflow: hidden;

  }

  .item1 img, .item2 img {
    width: 100%;
    height: 100%;
  }

  .item2 img {
    height: 45px;
    position: absolute;
    bottom: -5px;
    width: 9px;
    padding: 3px 0;
  }

  .AirTop {
    width: 90%;
    position: absolute;
    top: 20px;
    left: 2%;
    z-index: 999;

  }

  .Cloud {
    margin-top: 6%;
    width: 100%;
    position: relative;
    z-index: 999;
  }
.shows{
  opacity: 0;
}
  .viewLeft_mid img {
    position: absolute;
  }
</style>
