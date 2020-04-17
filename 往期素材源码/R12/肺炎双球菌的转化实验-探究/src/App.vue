<template>
  <div id="app" class="noselect">
    <!--头部-->
    <h3 v-html="title" class="app_title"></h3>
    <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
    <div class="container" :style="'height:'+H+'px'">
      <!--视图区-->
      <div class="View" :style="'width:'+VW+'px;height:'+VH+'px'">
        <div class="ViewSpace" :style="'transform: scale('+zoomF+')'">
          <div class="ViewImg" style="position: relative;">
            <h4>猜一猜<br/>小鼠会死亡吗？</h4>
            <img class="dna" src="static/UI/dna.png" draggable="false">
            <img class="mouse" src="static/UI/mouse.png" draggable="false">
            <img class="zhen" src="static/UI/zhen.png" draggable="false">
            <img class="arrow" src="static/UI/arrow.png" draggable="false">
            <img class="mouse1" src="static/UI/mouse.png" draggable="false">
            <img class="nodie" src="static/UI/nodie.png" draggable="false">
            <ui-btn :type="blue1" id="button2" @click.native="btnClick">注射</ui-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //按钮
export default {
  name: 'app',
  components: {
    uiBtn,
    uiSlider
  },
  data() {
    return {
      title: '肺炎双球菌的转化实验-探究',
      H: 0,
      VW:0,
      VH: 0,
      zoomF: 1,
      blue: 0,
      blue1: '',
      timer:null,
    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    this.getViewSize();
    window.addEventListener('resize', () => {
      this.getViewSize();
    })
  },
  computed: {},
  watch: {

  },
  methods: {
    btnClick() {
      if (this.blue1 == 'blue') {
        return;
      }
      this.blue1 = 'blue';
      $('.zhen').animate({opacity:1,top:'107px'},1500,function(){
        $('.arrow').animate({opacity:1},1500,function(){
             $('.mouse1').animate({opacity:1},1500,function(){
                $('.nodie').addClass('nodieO');
             })
        })
      })
    },
    //计算区块大小
    getViewSize() {
      var W = window.innerWidth;
      var H = window.innerHeight - 72;
      this.H = H;
      if (W / H > 976 / 492) {
        this.VW = parseInt(976 * H / 492);
        this.VH = H;
        this.zoomF = (H / 492).toFixed(2);
      } else {
        this.VW = W;
        this.VH = parseInt(492 * W / 976);
        this.zoomF = (W / 976).toFixed(2);
      }
    },
    //重置
    resetWidget() {
      this.blue1 = "";
      $('.zhen').stop(true).css({top:'67px',opacity:0});
      $('.arrow').stop(true).css({opacity:0});
      $('.mouse1').stop(true).css({opacity:0});
      $('.nodie').removeClass('nodieO');
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

h3 {
  font-size: 24px;
  color: #000;
  line-height: 1.0;
  padding: 24px;
  font-weight: normal;
}

.container {
  width: 100%;
  position: relative;
}

.aside_reset {
  position: fixed;
  right: 0;
  top: 0;
  margin: 20px 24px;
}

.View {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.ViewSpace {
  width: 976px;
  height: 492px;
  padding: 10px 24px 24px;
  transform-origin: left top;
}

.ViewSpace>img {
  position: absolute;
}

.ViewSpace h4 {
  display: inline-block;
  height: auto;
  position: absolute;
  left: 0;
  top: 0;
  font-weight: normal;
  font-size: 24px;
  color: #4A90E2;
}

.ViewImg {
  position: relative;
  width: 100%;
  height: 100%;
}

.ViewSpace .UI-btn {
  width: 120px;
  height: 44px;
  position: absolute;
  right: 0;
  bottom: 0;
}

.dna {
  position:absolute;
  top:172px;
  width: 254px;
  height: 114px;
}

.mouse {
  position:absolute;
  top:162px;
  left:250px;
  width:auto;
  height: 160px;
}

.arrow {
  position:absolute;
  top:212px;
  left:500px;
  width: 114px;
  height: 37px;
  opacity:0;
}
.zhen{
    position: absolute;
    left: 382px;
    top: 67px;
    width: 150px;
    height: 81px;
  z-index: 5;
    opacity: 0;
  transition: All 0s;
}
.zhen.zhenO{
  opacity: 1;
  top:107px;
  transition: All 1.5s;
}
.mouse1{
    position:absolute;
    top:162px;
    left:650px;
    width:auto;
    height: 160px;
    right:0;
    opacity: 0;
}
.nodie{
    opacity: 0;
    position: absolute;
    right: 66px;
    top: 35px;
    width: 206px;
    height: 87px;
}
.nodie.nodieO{
  opacity: 1;
  top:70px;
  transition: All 1.2s;
}
</style>