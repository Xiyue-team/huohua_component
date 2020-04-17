<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-html="title" class="app_title"></h3>
      <!--视图区-->
      <div class="ViewSpace">
        <div :style="[zoom]" class="viewBox">
          <div class="wrap">
            <div class="femaleCate">
              <div class="peizi">配子</div>
              <transition-group name="female" class="femaleChildrenOne" tag="ul" mode="out-in">
                <li v-for="(item,index) in femaleChildrenOne" v-bind:key="item.id" v-bind:data-index="index"> <span>{{item.msg}}</span> </li>
              </transition-group>
            </div>
            <transition-group name="female" class="femaleChildren" tag="ul" mode="out-in">
              <li v-bind:key="0" :style="{opacity:isOpacity}"></li>
              <li v-for="(item,index) in femaleChildren" v-bind:key="item.id" v-bind:data-index="index"> <span>{{item.msg}}</span> </li>
            </transition-group>
            <div class="tableWrap">
              <transition-group name="male" class="maleChildrenOne" tag="ul" mode="out-in">
                <li v-for="(item,index) in maleChildrenOne" v-bind:key="item.id" v-bind:data-index="index"> <span>{{item.msg}}</span> </li>
              </transition-group>
              <transition-group name="male" class="maleChildren" tag="ul" mode="out-in">
                <li v-for="(item,index) in maleChildren" v-bind:key="item.id" v-bind:data-index="index"> <span>{{item.msg}}</span> </li>
              </transition-group>
              <transition-group name="children" class="tableList" tag="ul" mode="out-in">
                <div class="female" v-bind:key="20" :style="'background-image:url(./static/img/'+maleImg+'.png);background-size:100% 100%'" :class="{isBoxed:maleData}"> {{male}} </div>
                <div class="male" v-bind:key="30" :style="'background-image:url(./static/img/'+femaleImg+'.png);background-size:100% 100%'" :class="{isBoxed:femaleData}"> {{female}} </div>
                <li v-if="item" v-for="(item,index) in childrenData" v-bind:key="item?item.id:item" v-bind:data-index="index">
                  <div v-if="item" :style="'background-image:url(./static/img/'+item.msg+'.png);background-size:100% 100%'"></div>
                </li>
              </transition-group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget" id="button0"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <div class="sideWrap">
          <ul class="maleSide sideStyle" :class="{noClick:!canClick}">
            <li>父本</li>
            <li :class="{active:maleData=='One'}" id="button2">
              <input type="radio" id="One" value="One" v-model="maleData">
              <label for="One"> <img src="static/img/parent1.png" /> </label>
            </li>
            <li :class="{active:maleData=='Two'}" id="button3">
              <input type="radio" value="Two" id="Two" v-model="maleData">
              <label for="Two"> <img src="static/img/parent2.png" /> </label>
            </li>
            <li :class="{active:maleData=='Three'}" id="button4">
              <input type="radio" value="Three" id="Three" v-model="maleData">
              <label for="Three"> <img src="static/img/parent3.png" /> </label>
            </li>
          </ul>
          <ul class="femaleSide sideStyle" :class="{noClick:!canClick}">
            <li>母本</li>
            <li :class="{active:femaleData=='Four'}" id="button5">
              <input type="radio" id="Four" value="Four" v-model="femaleData">
              <label for="Four"> <img src="static/img/parent1.png" /> </label>
            </li>
            <li :class="{active:femaleData=='Five'}" id="button6">
              <input type="radio" value="Five" id="Five" v-model="femaleData">
              <label for="Five"> <img src="static/img/parent2.png" /> </label>
            </li>
            <li :class="{active:femaleData=='Six'}" id="button7">
              <input type="radio" value="Six" id="Six" v-model="femaleData">
              <label for="Six"> <img src="static/img/parent3.png" /> </label>
            </li>
          </ul>
        </div>
        <ui-btn id="button1" type="switch" size="big" :class="{show:maleData&&femaleData}" v-model="checked1">子代</ui-btn>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider';
export default {
  name: 'app',
  components: {
    uiBtn,
    uiSlider
  },
  data() {
    return {
      title: '自由组合定律',
      BtnSpaceStyle: 'flex',
      zoom: {}, //区域大小
      male: '父本',
      female: '母本',
      femaleChildren: null,
      femaleChildrenOne: null,
      maleChildren: null,
      maleChildrenOne: null,
      maleData: '',
      femaleData: '',
      maleText: null,
      femaleText: null,
      childrenData: Array(16),
      showBtn: false,
      count: 0,
      maleImg: 'white',
      femaleImg: 'white',
      isOpacity: 0,
      checked1: false,
      canClick: true
    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    this.resize();
    this.setSideStyle();
    this.getViewSize();
  },
  computed: {},
  watch: {
    maleData(val) {
      if (val == 'One') {
        this.maleText = ['RY1', 'RY1', 'RY1', 'RY1'];
        this.maleChildrenOne = [{ msg: 'RY', id: 1 }];
        this.maleImg = 'parent1';
      } else if (val == 'Two') {
        this.maleText = ['RY1', 'Ry2', 'rY4', 'ry3'];
        this.maleChildrenOne = [{
          msg: 'RY',
          id: 5
        }, {
          msg: 'Ry',
          id: 6
        }, {
          msg: 'rY',
          id: 7
        }, {
          msg: 'ry',
          id: 8
        }]
        this.maleImg = 'parent2';
      } else if (val == 'Three') {
        this.maleText = ['ry3', 'ry3', 'ry3', 'ry3'];
        this.maleChildrenOne = [{ msg: 'ry', id: 9 }];
        this.maleImg = 'parent3';
      }
      this.male = !!this.maleData ? '' : '父本';
      this.isOpacity = this.maleData || this.femaleData ? 1 : 0;
    },
    femaleData(val) {
      if (val == 'Four') {
        this.femaleText = ['RY1', 'RY1', 'RY1', 'RY1'];
        this.femaleChildrenOne = [{ msg: 'RY', id: 1 }];
        this.femaleImg = 'parent1';
      } else if (val == 'Five') {
        this.femaleText = ['RY1', 'Ry2', 'rY4', 'ry3'];
        this.femaleChildrenOne = [{
          msg: 'RY',
          id: 5
        }, {
          msg: 'Ry',
          id: 6
        }, {
          msg: 'rY',
          id: 7
        }, {
          msg: 'ry',
          id: 8
        }]
        this.femaleImg = 'parent2';
      } else if (val == 'Six') {
        this.femaleText = ['ry3', 'ry3', 'ry3', 'ry3'];
        this.femaleChildrenOne = [{ msg: 'ry', id: 9 }];
        this.femaleImg = 'parent3';
      }
      this.female = !!this.femaleData ? '' : '母本';
      this.isOpacity = this.maleData || this.femaleData ? 1 : 0;
    },
    checked1() {
      if (this.checked1) {
        if (this.maleData == 'One') {
          this.maleChildren = [{
            msg: 'RY',
            id: 1
          }, {
            msg: 'RY',
            id: 2
          }, {
            msg: 'RY',
            id: 3
          }, {
            msg: 'RY',
            id: 4
          }]
        } else if (this.maleData == 'Two') {
          this.maleChildren = [{
            msg: 'RY',
            id: 5
          }, {
            msg: 'Ry',
            id: 6
          }, {
            msg: 'rY',
            id: 7
          }, {
            msg: 'ry',
            id: 8
          }]
        } else if (this.maleData == 'Three') {
          this.maleChildren = [{
            msg: 'ry',
            id: 9
          }, {
            msg: 'ry',
            id: 10
          }, {
            msg: 'ry',
            id: 11
          }, {
            msg: 'ry',
            id: 12
          }]
        }
        if (this.femaleData == 'Four') {
          this.femaleChildren = [{
            msg: 'RY',
            id: 1
          }, {
            msg: 'RY',
            id: 2
          }, {
            msg: 'RY',
            id: 3
          }, {
            msg: 'RY',
            id: 4
          }]
        } else if (this.femaleData == 'Five') {
          this.femaleChildren = [{
            msg: 'RY',
            id: 5
          }, {
            msg: 'Ry',
            id: 6
          }, {
            msg: 'rY',
            id: 7
          }, {
            msg: 'ry',
            id: 8
          }]
        } else if (this.femaleData == 'Six') {
          this.femaleChildren = [{
            msg: 'ry',
            id: 9
          }, {
            msg: 'ry',
            id: 10
          }, {
            msg: 'ry',
            id: 11
          }, {
            msg: 'ry',
            id: 12
          }]
        }
        this.canClick = false;
        this.childrenData = [];
        for (let i = 0; i < this.maleText.length; i++) {
          for (let j = 0; j < this.femaleText.length; j++) {
            this.childrenData.push({
              id: this.count * 16 + i * 4 + j,
              msg: this.maleText[i] + this.femaleText[j]
            });
          }
        }
      } else {
        this.childrenData = [];
        this.femaleChildren = this.maleChildren = [];
        
        this.canClick = true;
      }
    }
  },
  methods: {
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
      const W = window.innerWidth - 280;
      const H = window.innerHeight - 72;
      if (W / H >= 600 / 600) {
        this.zoom = {
          zoom: H / 600
        }
      } else {
        this.zoom = {
          zoom: W / 600
        }
      }
    },
    enter(el) {
      // var delay = el.dataset.index / 4;
      let delay = 0.5;
      el.style.transitionDelay = delay + "s";
    },
    leave(el) {
      el.style.transitionDelay = 0 + "s";
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
      this.femaleChildren = this.femaleChildrenOne = this.maleChildrenOne = null;
      this.maleChildren = null;
      this.maleData = '';
      this.femaleData = '';
      this.maleText = null;
      this.femaleText = null;
      this.childrenData = Array(16);
      this.showBtn = false;
      this.count = 0;
      this.maleImg = 'white';
      this.femaleImg = 'white';
      this.male = '父本';
      this.female = '母本';
      this.checked1 = false;
      this.canClick = true;
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
  justify-content: space-between;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
}

.btn_space .UI-btn {
  /*margin-bottom: 15px;*/
  line-height: 35px;
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

sup {
  font-size: 14px;
  color: #373334;
}

sup.small {
  color: #FF546B;
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
  width: 968px;
  height: 755px;
  padding: 20px 0;
  display: flex;
  align-items: center;
}

.viewBox .wrap {
  width: 404px;
  margin: 0 auto;
  height: 344px;
}

.viewBox .femaleChildren {
  display: flex;
  text-align: center;
}

.viewBox .femaleChildren li {
  width: 76px;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
}

.viewBox .femaleChildren li:first-child {
  width: 100px;
  font-weight: normal;
}

.viewBox .tableWrap {
  display: flex;
}

.viewBox .maleChildren {
  width: 50px;
  text-align: center;
  line-height: 76px;
}

.viewBox .maleChildren li {
  height: 76px;
  font-weight: bold;
}

.viewBox .tableList {
  position: relative;
  box-sizing: content-box;
  width: 304px;
  height: 304px;
}

.viewBox .tableList li div {
  width: 76px;
  height: 76px;
}

.male,
.female {
  position: absolute;
  border: 2px dashed #ccc;
  border-radius: 6px;
  width: 76px;
  height: 76px;
  background-size: 100% 100%;
  line-height: 76px;
  text-align: center;
  color: #b5b5b5;
}

.male.isBoxed,
.female.isBoxed {
  border: none;
}

.male {
  left: 50%;
  transform: translateX(-50%);
  top: -148px;
}

.female {
  top: 50%;
  transform: translateY(-50%);
  left: -165px;
}

.viewBox .tableList li {
  float: left;
  width: 76px;
  height: 76px;
  text-align: center;
  line-height: 76px;
}


/*侧边栏部分*/

.sideWrap {
  width: 220px;
  display: flex;
  justify-content: space-between;
}

.sideWrap ul {
  width: 83px;
}

.sideStyle li {
  width: 83px;
  height: 83px;
  text-align: center;
  margin-bottom: 10px;
  border-radius: 6px;
  overflow: hidden;
}

.sideStyle li:first-child {
  height: 55px;
  line-height: 55px;
  font-size: 16px;
}

.sideStyle li img {
  width: 100%;
  height: 100%;
}

li.active {
  box-shadow: 0 2px 10px 0 rgba(5, 189, 249, 0.58);
}

.sideStyle li input {
  display: none;
}

.sideStyle li label {
  display: inline-block;
  width: 100%;
  height: 100%;
  line-height: 100px;
  cursor: pointer;
}

.sideStyle.noClick li label {
  pointer-events: none;
}

#button1 {
  transition: all 1s;
  visibility: hidden;
  opacity: 0;
  /*display: none;*/
}

#button1.show {
  visibility: visible;
  opacity: 1;
  /*display: block;*/
}


/*过渡的样式*/

.female-enter-active,
.male-enter-active {
  transition: all 1s;
}

.female-leave,
.male-leave {
  display: none;
}

.female-enter,
.female-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.male-enter,
.male-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.children-enter-active {
  transition: all 2s 0.5s;
}

.children-enter {
  opacity: 0;
}

.children-leave {
  display: none;
}

.maleChildrenOne {
  width: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-weight: bold;
}

.maleChildrenOne li {
  height: 76px;
  text-align: center;
  line-height: 76px;
}

.femaleCate {
  display: flex;
  height: 40px;
  text-align: center;
  font-weight: bold;
  line-height: 40px;
}

.peizi {
  text-indent: 12px;
  text-align: left;
  width: 100px;
}

.femaleCate ul {
  display: flex;
  flex-grow: 1;
  justify-content: center;
}

.femaleCate ul li {
  width: 76px;
}
</style>