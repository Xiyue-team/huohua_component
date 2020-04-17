<template>
  <div id="app" class="noselect">
    <h3 v-html="title" class="app_title"></h3>
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <div class="container">
      <div class="content">
        <div>
          <div class="left_text">P</div>
          <div class="main_view flex">
            <div> <img src="static/img/4.png"> </div>
            <div class="symbol"><img src="static/img/x.png"></div>
            <div> <img src="static/img/1.png"> </div>
          </div>
          <div class="right_btn"></div>
        </div>
        <div class="hidden" :class="{show:num>0}">
          <div class="left_text flex"></div>
          <div class="main_view flex">
            <div> <img src="static/img/arrow1.png"> </div>
          </div>
          <div class="right_btn"></div>
        </div>
        <div>
          <div class="left_text hidden" :class="{show:num>0}">F<sub>1</sub></div>
          <div class="main_view flex hidden" :class="{show:num>0}">
            <div> <img src="static/img/4.png"> </div>
          </div>
          <div class="right_btn flex">
            <ui-btn @click.native="show(1)" :type="num>0?'blue':''">杂交</ui-btn>
          </div>
        </div>
        <div :class="{show:num>1}" class="hidden">
          <div class="left_text"></div>
          <div class="main_view flex">
            <div> <img src="static/img/arrow2.png"> </div>
          </div>
          <div class="right_btn"></div>
        </div>
        <div>
          <div class="left_text hidden" :class="{show:num>1}">F<sub>2</sub></div>
          <div class="main_view flex hidden" :class="{show:num>1}">
            <div> <img src="static/img/4.png"> </div>
            <div> <img src="static/img/2.png"> </div>
            <div> <img src="static/img/3.png"> </div>
            <div> <img src="static/img/1.png"> </div>
          </div>
          <div class="right_btn flex">
            <ui-btn @click.native="show(2)" v-if="num>0" :type="num>1?'blue':''">自交</ui-btn>
          </div>
        </div>
      </div>
      <!-- <div class="app_aside flex">
      <ui-slider id="slider" v-model="value" :boxWidth="120" direction="vertical" :boxHeight="330" :piecewise="true" :realTime="true" :piecewiseLabel="true" :title="false" :clickable="false" :tooltip="false" :noBlueProcess="true" :data="['第一步','自交','杂交']"></ui-slider>
    </div> --></div>
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
      title: '两对相对性状的杂交实验',
      BtnSpaceStyle: 'flex',
      value: '',
      num: 0,
    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    //禁止选择
    document.onselectstart = function() {
      return false;
    };
  },
  computed: {},
  watch: {
    // value(val) {
    //   if (val == '自交') {
    //     this.showStep2 = true;
    //     this.showStep3 = false;
    //   } else if (val == '杂交') {
    //     this.showStep2 = this.showStep3 = true;
    //   } else if (val == '第一步') {
    //     this.showStep2 = this.showStep3 = false;
    //   }
    // }
  },
  methods: {
    show(val) {
      if (this.num == 2) return;
      this.num = val;
    },
    reset() {
      this.num = 0;
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
  padding: 2vh 4vh;
  font-weight: normal;
  position: fixed;
  left: 0;
  top: 0;
  /*width: 100%;*/
}

.container {
  /*position: relative;*/
  display: flex;
  height: 100%;
  padding: 10vh 0 10vh 0;
}

.content {
  flex-shrink: 1;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
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

.content>div {
  width: 100%;
  display: flex;
  height: 15vh;
  color:#000;
}

.content>div:first-child {
  opacity: 1;
}


/* .content>div:nth-child(2n+1) {
  height: 18vh;
}

.content>div:nth-child(2) {
  height: 18vh;
}

.content>div:nth-child(4) {
  height: 18vh;
} */

.left_text {
  width: 15vh;
  font-size: 18px;
  text-align: right;
  line-height: 18vh;
}

.main_view {
  flex-grow: 1;
}

.main_view div {
  width: 15vh;
}
.content div:last-child .main_view div {
  margin:0 15px;
}
.main_view img {
  width: 100%;
  height: 100%;
  vertical-align: top;
}

.symbol {
  text-align: center;
}

.symbol img {
  width: 50%;
  height: 50%;
}

.content .show {
  opacity: 1;
  transition: opacity 1.5s;
}

.hidden {
  opacity: 0;
}

#slider {
  transform: translateX(-24px);
}

.ui-piecewise-item:first-child .ui-piecewise-label {
  opacity: 0;
}

.ui-piecewise-item .ui-piecewise-label {
  transform: translateY(70px);
}

.right_btn {
  width: 15vh;
  margin-right: 24px;
}

</style>
