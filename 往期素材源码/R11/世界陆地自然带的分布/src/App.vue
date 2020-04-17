<template>
  <div id="app" class="noselect">
    <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget" id="button0"></ui-btn>
    <div class="container">
      <!--头部-->
      <h3 v-html="title" class="app_title"></h3>
      <!--视图区-->
      <div class="ViewSpace">
        <div :style="[zoom]" class="viewBox">
          <div class="wrap">
            <img v-for="(img,index) in imgs" class="wrapSrc" :class="{op:!(index==src)}" :src="img" alt="">
            <div class="clickBtn" v-if="nowIndex==index" v-for="(item,index) in radioGroup" :style="{left:item.left+'px',top:item.top+'px',position:'absolute'}"  @click="dialogClick(index)">
            </div>
            <!-- 遮罩层，显示放大区域后让背景有个filter效果 -->
            <div class="mask" v-show="zoomShow"></div>
            <!-- 一个放大区域显示的div -->
            <transition name="show">
              <div class="Dialog" v-if="dialogToggle" :style="'background-image:url('+dialogSrc+');'">
                <span class="dialog-close" @click="dialogClose()"></span>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside" ref="sides">
      <!--重制按钮-->
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <div class="btnWrap" :class="{opev:opev}">
          <div class="btnGroup clearfix" v-for="(item,index) in btnGroup" @click="btnClick(index)" >
            <i class="icon" :style="'background-image:url('+btnGroup[index].src+')'" :class="{active:index == nowIndex}"></i>
            <span class="text" v-html="item.text"></span>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script type="text/javascript">
import uiBtn from '@/components/UI/uiBtn'; //按钮
export default {
  name: 'app',
  components: {
    uiBtn,
  },
  data() {
    return {
      title: '世界陆地自然带的分布',
      BtnSpaceStyle: 'flex',
      zoom: {}, //区域大小
      src: 0,
      btnToggle:false,
      dialogToggle:false,
      nowIndex:-1,
      zoomShow:false,
      dialogSrc:'',
      opev:false,
      imgs:[
          'static/img/index-0.png',
          'static/img/index-1.png',
          'static/img/index-2.png',
          'static/img/index-3.png',
          'static/img/index-4.png',
          'static/img/index-5.png',
          'static/img/index-6.png',
          'static/img/index-7.png',
          'static/img/index-8.png',
          'static/img/index-9.png',
          'static/img/index-10.png',
          'static/img/index-11.png',
      ],
      btnGroup: [
        {
          src: 'static/img/bgColor-1.png',
          text: '热带雨林带'
        },
        {
          src: 'static/img/bgColor-2.png',
          text: '热带草原带'
        },
        {
          src: 'static/img/bgColor-3.png',
          text: '荒漠带'
        },
        {
          src: 'static/img/bgColor-4.png',
          text: '亚热带常绿阔叶林带'
        },
        {
          src: 'static/img/bgColor-5.png',
          text: '亚热带常绿硬叶林带'
        },
        {
          src: 'static/img/bgColor-6.png',
          text: '温带混交林和<br/>温带落叶阔叶林带'
        },
        {
          src: 'static/img/bgColor-7.png',
          text: '温带草原带'
        },
        {
          src: 'static/img/bgColor-8.png',
          text: '亚寒带针叶林带'
        },
        {
          src: 'static/img/bgColor-9.png',
          text: '高山植物区'
        },
        {
          src: 'static/img/bgColor-10.png',
          text: '苔原带'
        },
        {
          src: 'static/img/bgColor-11.png',
          text: '冰原带'
        },
      ],
      radioGroup:[
        {left: 628, top: 213},
        {left: 32,  top: 174},
        {left: 111, top: 137},
        {left: 276, top: 132},
        {left: 111, top: 84},
        {left: 91,  top: 66},
        {left: 233, top: 87},
        {left: 164, top: 46},
        {left: 229, top: 116},
        {left: 318, top: 41},
        {left: 270, top: 387},
      ]
    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    for(var i=1;i<=11;i++){
        this.imgL(`static/img/dialog-${i}.png`);
    }
    this.resize();
    this.setSideStyle();
    this.getViewSize();
  },
  computed: {},

  methods: {
    //关闭弹框dialog
    dialogClose(){
      this.dialogToggle=false;
      this.zoomShow=false;
      this.opev=false;
    },
    //点击城市按钮出现弹框
    dialogClick(val){
      this.opev=true;
      let num = val+1;
      // this.preloadImage(`static/img/dialog-${num}.png`).then((path) => {
      //    this.dialogSrc = path;
      //   this.dialogToggle=true;
      //   this.zoomShow=true;
      // });
      this.imgL(`static/img/dialog-${num}.png`, (src) => {
        this.dialogSrc = src;
        this.dialogToggle=true;
        this.zoomShow=true;
      });
    },

    //侧边栏按钮切换图片
    btnClick(val) {
      let num = val+1;
      this.nowIndex=val;
      this.btnToggle=true;
      this.src = num;
    },
    imgL(src, callback) {
      var img = new Image();
      img.onload = function() {
        callback && callback(img.src);
      }
      img.src = src;
    },
    //计算侧边
    setSideStyle() {
      const el = document.getElementById('btn_space')
      if (el && el.scrollHeight > el.offsetHeight) {
        this.BtnSpaceStyle = 'block'
      } else {
        this.BtnSpaceStyle = 'flex'
      }
    },
    //计算区块大小
    getViewSize() {
      const W = window.innerWidth - 200;
      const H = window.innerHeight - 72;
      if (W / H >= 775 / 470) {
        this.zoom = {
          zoom: H / 470
        }
      } else {
        this.zoom = {
          zoom: W / 775
        }
      }
      $('.ViewSpace').css({
        '-moz-transform': 'scale(' + this.zoom.zoom + ')',
        '-moz-transform-origin': 'center center',
      });

    },
    //窗口大小更改
    resize() {
      const vm = this;
      window.addEventListener('resize', function() {
        vm.setSideStyle();
        vm.getViewSize();
      })
    },
    //重置
    resetWidget() {
      this.src=0;
      this.nowIndex=-1;
      this.dialogToggle=false;
      this.zoomShow=false;
      this.dialogSrc='';
      this.opev=false;
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
  ;
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

.clearfix:after {
  content: '';
  display: block;
  clear: both;
}

/*内容区*/

.container {
  width: calc(100% - 200px);
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
  float: right;
  width: 200px;
  height: 100%;
}



.insp-wrapper {
  width: 100%;
  height: 100%;
}

.aside_reset {
  margin: 20px 24px;
  float: right;
}

#button0 {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
}
.app_title{
  position: relative;
  z-index: 999;
}
.btn_space {
  padding: 20px;
  width: 100%;
  height: 100%;
  clear: both;
  /*display: flex;*/
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
}

.btn_space .UI-btn {
  line-height: 44px;
}

.btn_space .UI-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn_space h3 {
  font-size: 18px;
  font-weight: normal;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
}

.UI-btn.btn-blue {
  color: #000;
}
/*视图区*/

.ViewSpace {
  width: 100%;
  height: calc(100% - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
}


.ViewSpace .viewBox {
  width: 705px;
  height: 430px;
  overflow:hidden;
}

.wrap {
  position: relative;
  width: 100%;
  height: 100%;
  overflow:hidden;
}

.wrapSrc {
  position:absolute;
  top:0;
  right: 0;
  width: 100%;
  height: 100%;
}
.op{
  opacity: 0;
}
/*侧边栏部分*/

.btnWrap {
  position: relative;
  z-index: 10;
  margin-top: 45px;
}

.btnGroup {
  width: 150px;
  padding: 4px 0;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
}
.btnGroup .icon{
  display: block;
  width: 25px;
  height: 20px;
  background-size: cover;
  float: left;
  margin-right: 8px;
  border-radius: 6px;
  box-shadow: 0 1px 4px 0 rgba(97,97,97,0.50);
}
.btnGroup .text{
  display: block;
  float: left;
  font-size: 13px;
  font-weight: normal;
  vertical-align: middle;
}
.btnGroup .icon.active{
  border: 2px solid #080808;
}
.btnGroup:nth-child(6) .icon{
  margin-top: 9px;
}
.clickBtn{
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.Dialog{
  position: absolute;
  z-index: 100;
  width: 474px;
  height: 318px;
  left: 50%;
  top:50%;
  transition: all 0.5s 0.5s;
  margin-left: -237px;
  margin-top: -159px;
  background-size: cover;
}
.dialog-close{
  display: block;
  width: 35px;
  height: 35px;
  position: absolute;
  right: 7px;
  top: 6px;
  cursor: pointer;
}

.mask{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 20;
}

/*过渡样式*/

.show-enter-active, .show-leave-active {
  transition: all .5s
}

.show-enter, .show-leave-to {
  transform: scale(0, 0);
}

.opev{
  pointer-events: none;
  opacity: 0.5;
}
</style>