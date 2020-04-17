<template>
  <div class="aspectration bg_white root_div_container" data-ratio="16:9">
    <fullScreensLayout>
      <template slot="viewBox">
        <div class="title_text">{{title_text}}</div>
        <div id="Container" style="width: 100%; height: 100%;">
          <div id="Container3d" style="width: 100%; height: 100%;">
            <canvas
              id="renderCanvas"
              touch-action="none"
              width="1920"
              height="1080"
              tabindex="1"
              style="opacity: 1;"
            ></canvas>
          </div>
        </div>
        <div class="group">
          <div class="group1">
          <div class="msg1" :style="`background-image: url(${picmsg1})`">
     
          </div>
          <div class="button_style1" @click="ButtonEvent(1)">
            <buttonImage
           v-bind:actived="buttonActived===1"
            v-bind="Option1"
          ></buttonImage>
          </div>
          <div class="msg2" :style="`background-image: url(${picmsg2})`">
    
          </div>
          <div class="button_style1" @click="ButtonEvent(2)">
            <buttonImage
           v-bind:actived="buttonActived===2"
            v-bind="Option2"
          ></buttonImage>
          </div>
          <div class="msg3" :style="`background-image: url(${picmsg3})`">
  
          </div>
          <div class="button_style1" @click="ButtonEvent(3)">
            <buttonImage
           v-bind:actived="buttonActived===3"
            v-bind="Option3"
            ></buttonImage>
          </div>
          <div class="msg4" :style="`background-image: url(${picmsg4})`">
    
          </div>
          <div class="rule" :style="`background-image: url(${rulemsg})`">
 
          </div>
          </div>

          <div class="group2">
            <div class="txt1">
              {{textmsg1}}
            </div>
            <div class="button_style1">

            </div>
            <div class="txt2">
              {{textmsg2}}
            </div>
            <div class="button_style1">

            </div>
            <div class="txt3">
              {{textmsg3}}
            </div>
            <div class="button_style1">

            </div>
            <div class="txt4">
              {{textmsg4}}
            </div>
            <div class="rule">
            </div>
          </div>
        </div>
        <div v-if="showText" id="tip">
              {{text}}
        </div>
      </template>

      <template slot="controlPanel">
        <div id="controlPanel"></div>
      </template>
    </fullScreensLayout>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
import Component from 'vue-class-component';
import { ViewModel } from './ViewModel';
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
import buttonImage from './buttonImage.vue';
@Component({
  components: {
    fullScreensLayout,
    buttonPrimary,
    buttonImage
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped="scoped">
body {
  overflow: hidden !important;
}
#renderCanvas {
  width: 100%;
  height: 100%;
  outline: 0;
}
.title_text {
  font-size: 24px;
  line-height: 24px;
  color: #fff;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;
  pointer-events: none;
}

.group {
  position: absolute;
  width: 930px;
  height: 160px;
  top: 48px;
  left: 50%;
  margin-left: -465px;
}
.group1 {
  width: 100%;
  height: 80px;
}
.group2,.group3 {
  width: 100%;
  height: 30px;
}
.msg1,.msg2,.msg3,.msg4,.rule{
  float: left;
  width: 118.5px;
  height: 80px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  pointer-events: none;
}
.txt1,.txt2,.txt3,.txt4{
  float: left;
  width: 118.5px;
  height: 20px;
  line-height: 20px;
  color: #FF5A5A;
  font-size: 14px;
  text-align: center;
  pointer-events: none;
}
.txt2{
  color: #9BF23B;
}
.txt4{
  margin-left: 20px;
  color: #9BF23B;
}

.msg2{
  color: #9BF23B;
}
.msg4{
  margin-left: 20px;
  color: #9BF23B;
}

.rule{
  width: 214.5px;
  margin-left: 10px;
}

.button_style1 {
  float: left;
  width: 60px;
  height: 42px;
  margin-left: 10px;  
  margin-top: 19px; 
}

  #tip {
    position: absolute;
    width: 100%;
    height: 20px;
    top: 168px;
    font-family: 'PingFangSC-Regular';
    font-size: 20px;
    color: #FFD621;
    text-align: center;
    pointer-events: none;
  }

@media screen and (min-height: 600px) and (max-height: 800px) {
  .group {
    width: 660px;
    height: 80px;
    top: 60px;
    left: 50%;
    margin-left: -330px;
  }
  .group1 {
    height: 60px;
  }
  .msg1,.msg2,.msg3,.msg4,.rule{
    width: 75px;
    height: 60px;
  }
   .txt1,.txt2,.txt3,.txt4{
    width: 75px;
  }
  .rule{
    width: 130px;
    margin-left: 5px;
  }
  .button_style1 {
    margin-left: 5px;
    margin-top: 9px;
  }
  #tip {
    top: 140px;
    font-size: 16px;
  }
}

@media screen and (min-height: 450px) and (max-height: 599px) {
  .group {
    width: 660px;
    height: 80px;
    top: 60px;
    left: 50%;
    margin-left: -330px;
  }
  .group1 {
    height: 60px;
  }
  .msg1,.msg2,.msg3,.msg4,.rule{
    width: 75px;
    height: 60px;
  }
   .txt1,.txt2,.txt3,.txt4{
    width: 75px;
  }
  .rule{
    width: 130px;
    margin-left: 5px;
  }
  .button_style1 {
    margin-left: 5px;
    margin-top: 9px;
  }
  #tip {
    top: 140px;
    font-size: 16px;
  }
}

@media screen and (min-height: 300px) and (max-height: 449px) {
  .group {
    width: 500px;
    height: 60px;
    top: 60px;
    left: 50%;
    margin-left: -250px;
  }

    .group1 {
    height: 40px;
  }
    .group2 {
    height: 20px;
  }
 .msg1,.msg2,.msg3,.msg4,.rule{
    width: 60px;
    height: 40px;
  }
.msg4{
  margin-left: 10px;
}

 .txt1,.txt2,.txt3,.txt4{
    width: 60px;
    font-size: 10px;
  }
.txt4{
  margin-left: 10px;
}

  .rule{
    width: 105px;
    margin-left: 5px;
  }
  .button_style1 {
    width: 45px;
    height: 32px;
    margin-top: 5px; 
    margin-left: 0px;
  }
  #tip {
    top: 120px;
    font-size: 12px;
  }
}

#Container {
  background-color: #333333;
}

</style>

<style>
/*右侧面板*/
.control-panel_div_floatRight {
  padding: 0px !important;
}
</style>