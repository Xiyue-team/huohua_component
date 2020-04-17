<template>
  <div class="aspectration bg_white covered root_div_container" >
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div id="3dContainer"></div>
                  <div class="select">
                      <div class="mainView">
                          <img style="border-radius: 9px" src="" alt="" class="mainImage" v-bind:class="{'mainImageElection': isElection , 'twoImageStyle': twoImage, 'iPadStyle': fourAndFive && isIpad}" draggable="false" onclick="return false">
                      </div>
                      <div class="selectImage1 selectSize" @click="selectEvent1()">
                          <img style="border-radius: 9px" src="" alt="" class="selectImage" draggable="false">
                      </div>
                      <div class="selectImage2 selectSize" @click="selectEvent2()">
                          <img style="border-radius: 9px" src="" alt="" class="selectImage" draggable="false">
                      </div>
                      <div class="selectImage3 selectSize" @click="selectEvent3()">
                          <img style="border-radius: 9px" src="" alt="" class="selectImage" draggable="false">
                      </div>
                      <div class="selectImage4 selectSize" @click="selectEvent4()">
                          <img style="border-radius: 9px" src="" alt="" class="selectImage" draggable="false">
                      </div>
                      <div class="selectImage5 selectSize" @click="selectEvent5()">
                          <img style="border-radius: 9px" src="" alt="" class="selectImage" draggable="false">
                      </div>
                      <div class="tips">
                          <span class="tipsStyle" v-show="tipsControl">
                              {{lang.tips[0]}}
                          </span>
                          <span class="tipsStyle" id="tips" v-show="errorFeedback">
                              {{lang.tips[1]}}
                          </span>
                      </div>
                  </div>
                  <buttonPrimary class="rectButton position1" v-bind:class="{'position1Mobile': isMobile,'rectButtonMobile': isMobile}" v-bind:title="general" type="ellipse" v-bind:actived="gActived" @click.native="gActivedEvent()"></buttonPrimary>
                  <buttonPrimary class="rectButton position2" v-bind:class="{'position2Mobile': isMobile, 'rectButtonMobile': isMobile}" v-bind:title="jingwei" type="ellipse" v-bind:actived="pActived" @click.native="pActivedEvent()"></buttonPrimary>
                  <buttonPrimary class="rectButton position3" v-bind:class="{'position3Mobile': isMobile, 'rectButtonMobile': isMobile}" v-bind:title="pointing" type="ellipse" v-bind:actived="jActived" @click.native="jActivedEvent()"></buttonPrimary>
                  <div id="compass" class="compass" v-bind:class="{'compassMobile': isMobile}">
                      <img src="./sub_static/direction.png" alt="" class="compassImage">
                  </div>
                  <div id="compassRange" class="compassRange" v-bind:class="{'compassMobile': isMobile}"></div>
                  <div class="title_text" v-bind:class="{'title_text_Mobile': isMobile}">{{title}}</div>
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
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
@Component({
  components: {
    fullScreensLayout,
    buttonPrimary
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

    img[src=""],img:not([src]){
        opacity:0;
    }

    .title_text_Mobile {
        font-size: 20px;
        color: #000000;
        line-height: 20px;
        margin: 0;
        padding:0;
        position: absolute;
        top:15px;
        left:24px;
    }

    .rectButton {
        position: absolute;
        right: 7.8%;
        width: 19.5%;
        min-width: 135px;
        height: 8.3%;
        min-height: 48px;
        border-radius: 9px;
    }

    .rectButtonMobile {
        height: 7.8% !important;
        min-height: 32px;
        right: 7.8% !important;
    }

    .position1{
        top: 12.5%;
    }
    .position2{
        top: 25%;
    }
    .position3{
        top: 37.5%;
    }
    .position1Mobile{
        top: 16.5%;
    }

    .position2Mobile {
        top: 33.5%;
    }

    .position3Mobile {
        top: 50.8%;
    }

    .select div{
        border: 1px solid rgba(0,0,0,0.12);
        background: #FFFFFF;
        border-radius: 9px;
        position: absolute;
    }
    .selectSize {
        display: flex;
        width: 10.9%;
        height: 12.5%;
    }
    .mainView {
        width: 62.5%;
        height: 62.5%;
        top: 12.5%;
        left: 8.2%;
        display: flex;
    }

    .mainImage {
        height: 90%;
        margin: auto;
    }

    .mainImageElection {
        height: 100% !important;
        width: 100% !important;
    }

    .twoImageStyle {
        height: 100%;
        width: 100%;
    }

    .iPadStyle {
        width: 100%;
        height: 100%;
    }

    .selectImage {
        width: 100%;
        height: 100%;
        margin: auto;
    }
    .selectImage1{
        left: 8.2%;
        bottom: 8.3%;
    }
    .selectImage2{
        left: 21.1%;
        bottom: 8.3%;
    }
    .selectImage3{
        left: 34%;
        bottom: 8.3%;
    }
    .selectImage4{
        left: 46.9%;
        bottom: 8.3%;
    }
    .selectImage5{
        left: 59.8%;
        bottom: 8.3%;
    }

    .select {
        width: 100%;
        height: 100%;
        position: relative;
        background: #FAFAFA;
    }
    .compass {
        width: 19.1%;
        height: 25%;
        border: 1px solid rgba(0,0,0,0.12);
        border-radius: 9px;
        position: absolute;
        right: 7.8%;
        bottom: 25%;
        display: flex;
        cursor: pointer;
    }

    .compassMobile {
        bottom: 8% !important;
    }

    .compassImage {
        margin: auto;
        height: 80%;
        transform-origin: 50%;
    }
    .compassRange {
        width: 19.1%;
        height: 25%;
        border: 1px solid rgba(0,0,0,0.12);
        border-radius: 9px;
        position: absolute;
        right: 7.8%;
        bottom: 25%;
        cursor: pointer;
    }

    .tips {
        width: 62.5%;
        height: 62.5%;
        top: 12.5%;
        left: 8.2%;
        background: none!important;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tipsStyle {
        box-shadow: 0 0 4px 0 rgba(255,255,255,0.80);
        padding: 9px 24px;
        background: rgba(255, 255, 255, 0.60);
        font-size: 24px;
        color: #525252;
        line-height: 24px;
    }

    @media screen and (max-width: 740px) {
        .tipsStyle {
            font-size: 14px;
        }
    }
</style>
<style>
@media screen and (max-width: 730px) {
    .control_div_resetBtn {
        transform-origin: right top;
        transform: scale(0.5);
    }
}
</style>
