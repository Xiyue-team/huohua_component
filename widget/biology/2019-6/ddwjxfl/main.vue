<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox" slot-scope="viewBox">
        <span class="title_style" :style="{zoom: zoom1}">{{title}}</span>
        <button class="opation" id="opation" v-show="!flags">点击出现下级分支</button>
        <div class="max_box" :style="{'background-image': 'url(\"" +bg5 +'\')'} ">
          <div class="min_box">
            <div class="button_box" :style="{zoom: zoom1}">
              <div
                class="box"
                v-for="(item, index) in buttonBox1"
                :key="index"
                :id="'box'+index"
                :class="flag?'block':'none'"
              >
                <img :id="'index' + ( index + 1 )" ondragstart="return false" :src="item.src" />
                <span :id="'optiontext'+ index">{{item.name}}</span>
              </div>
            </div>
          </div>
          <!-- 下面文字 --> 
          <div
            class="srcArr"
            v-for="(item, index) in srcArr"
            :key="'index' + index" 
            :id="'imgbox' + index"
            :class="(index<7)?(thired1?'block':'none'):(thired2?'block':'none')"
          >
            <img :src="item.src" v-show="item.src" />
          </div>

          <button
            class="optiontext"
            v-for="(item,index) in optionTextleft"
            :key="index"
            :id="'optiontextleft' + ( index + 1 )"
            :class="(index<7)?(thired1?'block':'none'):(thired2?'block':'none')"
          >{{item}}</button>

          <div id="3dContainer" class="Container"></div>
          <div>
            <button class="firstBox first" id="firstBox" @click="firstBox">动物</button>
            <button
              class="firstBox"
              :class="secend?'block':'none'"
              id="vertebrate"
              @click="vertebrate_click"
            >{{vertebratebtn}}</button>
            <button
              class="firstBox"
              :class="secend?'block':'none'"
              id="invertebrate"
              @click="invertebrate_click"
            >{{invertebratebtn}}</button>
            <button
              class="firstBox textbox"
              v-for="(item,index) in vertebrate"
              :key="index"
              :id="'button'+index"
              v-html="item"
              :class="(index<7)?(thired1?'block':'none'):(thired2?'block':'none')"
            ></button>
          </div>
        </div>
      </template>
    </fullScreensLayout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
import Component from 'vue-class-component';
import { MainVueComponent } from './mainVueComponent';
@Component({
  components: {
    fullScreensLayout
  },

  mixins: [MainVueComponent]
})
export default class App extends Vue {}
</script>

<style>
.control_div_resetBtn > img {
  height: 24px !important;
}
body {
  overflow: hidden !important;
  overflow-x: hidden;
  overflow-y: hidden;
}

.title_style {
  width: 420px;
  height: 28px;
  font-size: 24px;
  color: #ffffff;
  line-height: 28px;
  position: absolute;
  left: 24px;
  top: 24px;
}
.firstBox {
  position: absolute;
  font-size: 1.2vw;
  font-weight: bold;
  color: #666;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000;
  visibility: visible;
}
.block {
  visibility: visible !important;
  z-index: 2000;
}
.none {
  visibility: hidden !important;
  z-index: 2000;
}
.max_box {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
}

.first {
  font-size: 1.3vw !important;
}

.Container {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.opation {
  position: absolute;
  opacity: 0.3;
  font-size: 10vh;
  background-color: rgba(0, 0, 0, 0);
  font-family: SourceHanSansSC-Medium;
  color: #ffffff;
  text-align: center;
  z-index: 1000;
  left: 42%;
  top: 45%;
  transform: translate(-50%, -50%);
}
.min_box {
  background: 0;
  height: 100%;
  position: absolute;
  right: 0;
}
.textbox {
  visibility: visible;
}
.button_box {
  width: 11.5vw;
  position: absolute;
  top: 35%;
  right: 2vw;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-line-pack: center;
  align-content: center;
  z-index: 1000;
  top: 46%;
  transform: translate(0%, -41%);
}
.box {
  width: 5vw;
  height: 100%;
  cursor: pointer;
  margin-bottom: 21px;
}
.box > img {
  width: 100%;
  display: block;
  z-index: 2000;
  padding-top: 11px;
}
.box > span {
  display: block;
  text-align: center;
  color: #fff;
  margin-top: 4px;
  position: absolute;
  width: 5vw;
}
.srcArr {
  position: absolute;
  opacity: 0.3;
  background: #ffffff;
  border-radius: 11px;
  z-index: 50;
  visibility: visible;
}
.srcArr > img {
  width: 100%;
  height: 100%;
  visibility: visible;
}
.optiontext {
  position: absolute;
  color: #fff;
  font-size: 1.1vw;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1000;
}

@media (max-width: 1028px) {
  .opation {
    font-size: 9vh;
  }
}
@media (max-width: 800px) {
  .min_box {
    height: 476px;
  }
  .button_box {
    top: 61%;
    transform: translate(0%, -53%);
    height: 477px;
    display: block;
    width: 9.5vw;
  }
  .box {
    width: 6vw;
    height: auto;
    margin: 0 auto;
    margin-bottom: 17px;
  }
  .box > span {
    width: 6vw;
  }
}
@media (max-width: 668px) {
  .button_box {
    top: 62%;
    transform: translate(0%, -44%);
  }
}
@media (max-height: 360px) {
  .button_box {
    top: 62%;
    transform: translate(0%, -44%);
  }
  .box {
    margin-bottom: 15px;
  }
}
@media (max-height: 336px) {
  .button_box {
    top: 58%;
  }
}
</style>
