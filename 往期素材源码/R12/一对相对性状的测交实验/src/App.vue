<template>
  <div id="app" class="noselect">
    <h3 v-html="title" class="app_title"></h3>
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <div class="container flex">
      <div class="content">
        <div class="title height5">
          <div>杂种子一代</div>
          <div></div>
          <div>隐性纯合子</div>
        </div>
        <div class='first height15'>
          <div><img src="static/img/d.png"></div>
          <div><img src="static/img/x.png"></div>
          <div><img src="static/img/dd.png"></div>
        </div>
        <div class="arrow1 hidden" :class="{show:num>0}"> <img src="static/img/toparrow.png"> </div>
        <div class="second height5">
          <div class="hidden" :class="{show:num>0}">配子</div>
          <div class="separate hidden" :class="{show:num>0}"> <img src="static/img/1.png" alt=""> <img src="static/img/2.png" alt=""> </div>
          <div></div>
          <div class="hidden" :class="{show:num>0}"> <img src="static/img/2.png" alt=""> </div>
          <div class="right_btn">
            <ui-btn @click.native="show(1)" :type="num>0?'blue':''">配子</ui-btn>
           </div>
        </div>
        <div class="arrow2 hidden" :class="{show:num>1}"> <img src="static/img/bottomarrow.png"> </div>
        <div class='last height15'>
          <div class="hidden" :class="{show:num>1}">测交后代</div>
          <div class="hidden" :class="{show:num>1}"><img src="static/img/d.png"></div>
          <div></div>
          <div class="hidden" :class="{show:num>1}"><img src="static/img/dd.png"></div>
          <div class="right_btn">
            <ui-btn @click.native="show(2)" v-if='num>0' :type="num>1?'blue':''">子代</ui-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import common from '@/common/common'; //引入公共函数;
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //滑块
export default {
  name: 'app',
  components: {
    uiHead,
    uiBtn,
    uiSlider
  },
  data() {
    return {
      title: '一对相对性状的测交实验',
      BtnSpaceStyle: 'flex',
      num : 0,
    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    this.setSideStyle();
    //禁止选择
    window.addEventListener('resize', () => {
      this.setSideStyle();
    })
    document.onselectstart = function() {
      return false;
    };
  },
  computed: {},
  watch: {},
  methods: {
    show(v){
      if(this.num==2)return;
      this.num = v;
    },
    setSideStyle() {
      var W = window.innerWidth;
      var H = window.innerHeight - 72;
      var zoom = 1;
      if (W / H > 850 / 500) {
        zoom = H / 500;
      } else {
        zoom = W / 850;
      }
      // if (zoom >= 1 ||W<850||H<500) {
      //   $('.content').css({
      //     'transform': `scale(${zoom},${zoom})`,
      //     'transform-origin': 'center'
      //   });
      // } else {
      //   $('.content').css({
      //     'transform': `scale(${zoom},${zoom})`,
      //     'transform-origin': 'center left'
      //   });
      // }
    },
    reset() {
      this.num =0;
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


/*ui*/


/*内容区*/

#app .aside_reset {
  position: fixed;
  right: 24px;
  top: 24px;
}

.app_title {
  font-size: 24px;
  color: #000;
  line-height: 1.0;
  padding: 24px;
  font-weight: normal;
  position: fixed;
  left:0;
  top:0;
  /*width: 100%;*/
}

.container {
  /*position: relative;*/
  display: flex;
  height: 100%;
  padding: 10vh 0 10vh 0;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.app_aside {
  width: 200px;
}

.UI-btn.notClick {
  color: #999;
}

.content {
  flex-shrink: 1;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.content>div:not(:first-child) {
  width: 100%;
  display: flex;
}
.height15 {
  height:20vh;
}
.height5 {
  height:5vh;
}
.title {
  line-height: 32px;
  font-size: 16px;
  height:32px;
}
.title div {
  width:15vh;
}
.content>div {
  display: flex;
  justify-content: center;
  text-align: center;
}
.second >div:first-child,.second >div:last-child{
  flex-grow: 1;
}
.last >div:first-child,.last >div:last-child{
  flex-grow: 1;
}
.content .right_btn {
  /*margin-right:24px;*/
  justify-content: flex-end;
  padding-right:24px;
}
.content>div>div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20vh;
}

.first img {
  width: 100%;
  height: auto;
}

.first>div:nth-child(even) img {
  width: 30%;
}
.arrow1 img {
  width: 60vh;
  height:8vh;
}

.second .separate {
  display: flex;
  justify-content: space-between;
}

.second>div img {
  width: 30%;
}

.arrow2 img {
  width: 60vh;
  height: 13.5vh;
}

.last img {
  width: 100%;
  height: auto;
}
.content .show {
  opacity: 1;
  transition: all 1.5s;
}
.hidden {
  opacity: 0;
}
</style>
