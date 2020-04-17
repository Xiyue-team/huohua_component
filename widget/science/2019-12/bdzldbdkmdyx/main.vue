<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">{{title}}</div>
                  <div id="3dContainer" style="position: absolute; width: 100%; height: 100%;"></div>
                  <div class="buttonContorl">
                      <div class="buttonContainer" style="position:absolute; left: 138px; bottom: 74px;" v-show="!isPlay">
                          <div class="tips" v-show="isShowTips">{{lang.tips}}</div>
                          <div class="tips" style="height: 20px;" v-show="!isShowTips"></div>
                          <div class="selectButton_container">
                              <div class="buttonText_container">
                                  <img :src="materialImage[0]" class="imgSize" alt="" @click="leftGlassBall" ondragstart="return false;">
                                  <div>{{lang.buttonText[0]}}</div>
                              </div>
                              <div class="buttonText_container">
                                  <img :src="materialImage[1]" class="imgSize" alt="" @click="leftBowl" ondragstart="return false;">
                                  <div>{{lang.buttonText[1]}}</div>
                              </div>
                              <div class="buttonText_container">
                                  <img :src="materialImage[2]" class="imgSize" alt="" @click="leftSteeBall" ondragstart="return false;">
                                  <div>{{lang.buttonText[2]}}</div>
                              </div>
                          </div>
                      </div>
                      <div class="buttonContainer" style="position:absolute; right: 156px; bottom: 74px;" v-show="!isPlay">
                          <div class="tips" style="height: 20px;"></div>
                          <div class="selectButton_container">
                              <div class="buttonText_container">
                                  <img :src="materialImage[0]" class="imgSize" alt="" @click="rightGlassBall" ondragstart="return false;">
                                  <div>{{lang.buttonText[0]}}</div>
                              </div>
                              <div class="buttonText_container">
                                  <img :src="materialImage[1]" class="imgSize" alt="" @click="rightBowl" ondragstart="return false;">
                                  <div>{{lang.buttonText[1]}}</div>
                              </div>
                              <div class="buttonText_container">
                                  <img :src="materialImage[2]" class="imgSize" alt="" @click="rightSteeBall" ondragstart="return false;">
                                  <div>{{lang.buttonText[2]}}</div>
                              </div>
                          </div>
                      </div>
                      <div class="playButtonContainer" @click="playAnimation()">
                          <img :src="play[0]" class="playButton" alt="" ondragstart="return false;" v-show="!isPlay">
                          <img :src="play[1]" class="playButton" alt="" ondragstart="return false;" v-show="isPlay">
                      </div>
                  </div>

              </template>
              <template slot="controlPanel" slot-scope="controlPanel">

              </template>
          </fullScreensLayout>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
import { ViewModel } from './ViewModel';
import Component from 'vue-class-component';

@Component({
  components: {
    fullScreensLayout
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .title_text{
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    #3dContainer {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
    }

    .buttonContainer {
        width: 240px;
        height: 148px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tips {
        font-size: 20px;
        color: #333333;
        line-height: 20px;
        margin-bottom: 40px;
    }

    .selectButton_container {
        width: 240px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .buttonText_container {
        font-size: 20px;
        color: #333333;
        line-height: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .imgSize {
        width: 48px;
        height: 48px;
        margin-bottom: 20px;
    }

    .buttonContorl{
        width: 1920px;
        height: 220px;
        position: absolute;
        bottom: 0;
        transform-origin: left bottom;
        cursor: pointer;
    }

    .playButton {
        width: 100%;
        height: 100%;
    }

    .playButtonContainer {
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 32px;
        bottom: 32px;
    }
</style>
<style>

</style>
