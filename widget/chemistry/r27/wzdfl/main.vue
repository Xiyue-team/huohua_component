<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div id="3dContainer"></div>
                  <div class="background">
                      <div style=" z-index: 0; width: 100%; height: 100%;position: absolute;" @click="closeBanner()"></div>
                      <div class="container">
                          <div style="width: 877px;height: 535px; position: relative; margin-top: 100px;">
                              <div class="buttonStyle buttonColor1 buttonText1" @click="moveAnimate()" >{{title.redText[0]}}</div>
                              <div class="clickTip">{{title.tip}}</div>

                              <img src="./sub_static/line1.png" class="lineImage" id="line1" draggable="false" style="width: 56px;height: 260px; position:absolute;top: calc(50% - 130px);left: calc(268px - 172px)" alt="">
                              <div class="buttonStyle buttonColor2 buttonText1 animateStyle" @click="showAnimate(1)" style="position: absolute; left: calc(324px - 172px);top: calc(50% - 154px)">{{title.purpleText[0]}}</div>
                              <div class="buttonStyle buttonColor2 buttonText1 animateStyle" @click="showAnimate(2)" style="position: absolute; left: calc(324px - 172px);top: calc(50% + 106px)">{{title.purpleText[1]}}</div>

                              <img src="./sub_static/line2.png" class="lineImage" id="line2" draggable="false" style="width: 56px;height: 164px;position: absolute;left: calc(420px - 172px);top: calc(50% - 212px)" alt="">
                              <div class="buttonStyle buttonColor3 buttonText1 animateStyle" @click="showAnimate(3)" style="position: absolute;left: calc(476px - 172px);top: calc(50% - 236px);">{{title.yellowText[0]}}</div>
                              <div class="buttonStyle buttonColor3 buttonText1 animateStyle" @click="showAnimate(4)" style="position: absolute;left: calc(476px - 172px);top: calc(50% - 72px);">{{title.yellowText[1]}}</div>

                              <img src="./sub_static/line3.png" class="lineImage" id="line3" draggable="false" style="width: 56px;height: 140px;position: absolute; top: calc(50% + 60px);left: calc(420px - 172px)" alt="">
                              <div class="buttonStyle buttonColor4 buttonText1 animateStyle" @click="openBanner(1)" style="position: absolute;left: calc(476px - 172px); top: calc(50% + 36px);">{{title.verdantText[0]}}</div>
                              <div class="buttonStyle buttonColor4 buttonText1 animateStyle" @click="openBanner(2)" style="position: absolute;left: calc(476px - 172px); top: calc(50% + 106px);">{{title.verdantText[1]}}</div>
                              <div class="buttonStyle buttonColor4 buttonText1 animateStyle" @click="openBanner(3)"style="position: absolute;left: calc(476px - 172px); top: calc(50% + 176px);">{{title.verdantText[2]}}</div>
                              <div class="smallButton" @click="openBanner(1)" style="left: calc(576px - 172px); top: calc(50% + 54px);"></div>
                              <div class="smallButton" @click="openBanner(2)" style="left: calc(576px - 172px); top: calc(50% + 123px);"></div>
                              <div class="smallButton" @click="openBanner(3)" style="left: calc(576px - 172px); top: calc(50% + 192px);"></div>


                              <img src="./sub_static/line4.png" class="lineImage" id="line4" draggable="false" style="width: 56px;height: 140px; position: absolute; left: calc(570px - 172px);top: calc(50% - 280px);" alt="">
                              <div class="buttonStyle buttonColor5 buttonText2 animateStyle" @click="openBanner(4)" style="position: absolute; left: calc(626px - 172px);top: calc(50% - 306px);">{{title.blueText[0]}}</div>
                              <div class="buttonStyle buttonColor5 buttonText3 animateStyle" @click="openBanner(5)" style="position: absolute; left: calc(626px - 172px);top: calc(50% - 236px);">{{title.blueText[1]}}</div>
                              <div class="buttonStyle buttonColor5 buttonText2 animateStyle" @click="openBanner(6)" style="position: absolute; left: calc(626px - 172px);top: calc(50% - 166px);">{{title.blueText[2]}}</div>
                              <div class="smallButton" @click="openBanner(4)" style="left: calc(726px - 172px); top: calc(50% - 290px);"></div>
                              <div class="smallButton" @click="openBanner(5)" style="left: calc(726px - 172px); top: calc(50% - 220px);"></div>
                              <div class="smallButton" @click="openBanner(6)" style="left: calc(726px - 172px); top: calc(50% - 147px);"></div>


                              <img src="./sub_static/line5.png" class="lineImage" id="line5" draggable="false" style="width: 56px; height: 72px; position: absolute; left: calc(570px - 172px); top: calc(50% - 48px);" alt="">
                              <div class="buttonStyle buttonColor6 buttonText3 animateStyle" @click="showAnimate(5)" style="position: absolute; left: calc(626px - 172px); top: calc(50% - 72px); ">{{title.aquamarineText[0]}}</div>
                              <div class="buttonStyle buttonColor6 buttonText3 animateStyle" @click="openBanner(7)" style="position: absolute; left: calc(626px - 172px); top:50%; ">{{title.aquamarineText[1]}}</div>
                              <div class="smallButton" @click="openBanner(7)" style="left: calc(726px - 172px); top: calc(50% + 16px);"></div>


                              <img src="./sub_static/line6.png" class="lineImage" id="line6" draggable="false" style="width: 56px;height: 208px; position: absolute; top: calc(50% - 150px);left: calc(722px - 172px); z-index: 1" alt="">
                              <div class="buttonStyle buttonColor7 buttonText1 animateStyle" @click="showAnimate(6)" style="position: absolute;left: calc(778px - 172px);top: calc(50% - 177px);">{{title.greenText[0]}}</div>
                              <div class="buttonStyle buttonColor7 buttonText1 animateStyle" @click="openBanner(8)" style="position: absolute;left: calc(778px - 172px);top: calc(50% - 107px);">{{title.greenText[1]}}</div>
                              <div class="buttonStyle buttonColor7 buttonText1 animateStyle" @click="openBanner(9)" style="position: absolute;left: calc(778px - 172px);top: calc(50% - 37px);">{{title.greenText[2]}}</div>
                              <div class="buttonStyle buttonColor7 buttonText1 animateStyle" @click="openBanner(10)" style="position: absolute;left: calc(778px - 172px);top: calc(50% + 33px);">{{title.greenText[3]}}</div>
                              <div class="smallButton" @click="openBanner(8)" style="left: calc(878px - 172px); top: calc(50% - 91px);"></div>
                              <div class="smallButton" @click="openBanner(9)" style="left: calc(878px - 172px); top: calc(50% - 21px);"></div>
                              <div class="smallButton" @click="openBanner(10)" style="left: calc(878px - 172px); top: calc(50% + 49px);"></div>

                              <img src="./sub_static/line7.png" class="lineImage" id="line7" draggable="false" style="width: 56px;height: 72px; position: absolute; left: calc(874px - 172px); top: calc(50% - 188px);" alt="">
                              <div class="buttonStyle buttonColor8 buttonText3 animateStyle" @click="openBanner(11)" style="position: absolute; left: calc(930px - 172px); top: calc(50% - 213px);">{{title.oliveText[0]}}</div>
                              <div class="buttonStyle buttonColor8 buttonText4 animateStyle" @click="openBanner(12)" style="position: absolute; left: calc(930px - 172px); top: calc(50% - 141px);">{{title.oliveText[1]}}</div>
                              <div class="smallButton" @click="openBanner(11)" style="left: calc(1030px - 172px); top: calc(50% - 197px);"></div>
                              <div class="smallButton" @click="openBanner(12)" style="left: calc(1030px - 172px); top: calc(50% - 125px);"></div>

                              <div class="imageStyle">
                                  <img id="banner" src="./sub_static/jgs.png" style="width: 100%; height: 100%;" draggable="false" alt="">
                                  <img id="close" src="./sub_static/close.png" style="width: 32px;height: 32px;position: absolute; right: 17px; top: 17px;" @click="closeBanner()" draggable="false" alt="">
                                  <div class="imageText">{{title.jingangshi}}</div>
                              </div>
                              <div id="tips">
                                  <div style="display: flex; flex-wrap: wrap; ">
                                      <img src="./sub_static/More.png" style="width: 24px; height: 24px;margin-right: 8px" alt="">
                                      <div  style="line-height: 24px;font-size: 18px; color: #FFFFFF;">
                                          <div id="bottomTip">{{title.wuzhitishi}}</div>
                                      </div>
                                  </div>
                              </div>
                          </div>

                      </div>
                  </div>
                  <div class="title_text">{{title.title}}</div>
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
        color: #FFFFFF;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    .imageText {
        position: absolute;
        bottom: 32px;
        right: 32px;
        font-size: 42px;
        color: #FFFFFF;
        line-height: 42px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.60);
    }

    .imageStyle {
        position: absolute;
        width: 1152px;
        height: 648px;
        top:50%;
        left: 50%;
        transform: translate(-50%, calc(-50% - 37px));
        display: none;
        z-index: 3;
    }


    @media screen and (max-height: 500px) {
        .imageStyle {
            width: 960px;
            height: 540px;
        }
        .container {
            transform: scale(0.4)!important;
        }
    }

    @media screen and (max-width: 1280px) and (min-height: 500px){
        .container {
            transform: scale(0.8)!important;
        }
    }

    @media screen and (max-width: 854px) and (max-height: 534px) {
        .container {
            transform: scale(0.5)!important;
        }
    }

    @media screen and (max-width: 640px) and (max-height: 360px) {
        .container {
            transform: scale(0.4)!important;
        }
    }

    @media screen and (max-width: 730px) and (max-height: 330px) {
        .container {
            transform: scale(0.4)!important;
        }
    }

    .background {
        width: 100%;
        height: 100%;
        background: url("./sub_static/background.png") no-repeat;
        background-size: 100% 150%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .container {
        width: 877px;
        height: 535px;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: scale(1.2);
    }

    .buttonStyle {
        width: 90px;
        height: 42px;
        border: 3px solid rgba(255,255,255,0.60);
        border-radius: 16px;
        color: #FFFFFF;
        text-align: center;
        line-height: 44px;
        cursor:pointer;
    }

    .smallButton {
        width: 16px;
        height: 16px;
        position: absolute;
        background: url("./sub_static/xiaotubiao.png") no-repeat;
        background-size: 16px 16px;
        opacity: 0;
        cursor:pointer;
        display: none;
        z-index: 2;
    }

    .lineImage {
        opacity: 0;
        z-index: 1;
    }

    .animateStyle {
        opacity: 0;
        display: none;
    }

    .buttonColor1 {
        background: #FF5A5A;
        position: absolute;
        top:calc(50% - 24px);
        left: calc(50% - 48px);
        z-index: 2;

    }
    .buttonColor2 {
        background: #AC84FF;
    }
    .buttonColor3 {
        background: #F3C912;
    }
    .buttonColor4 {
        background: #92DD3F;
    }
    .buttonColor5 {
        background: #18A2FF;
    }
    .buttonColor6 {
        background: #50E3C2;
    }
    .buttonColor7 {
        background: #43CA59;
    }
    .buttonColor8 {
        background: #B6C938;
    }

    .buttonText1 {
        font-size: 20px;
    }
    .buttonText2 {
        font-size: 17px;
    }
    .buttonText3 {
        font-size: 16px;
    }
    .buttonText4 {
        font-size: 14px;
    }

    #tips {
        width: 100%;
        height: 24px;
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: -10px;
        z-index: 2;
        display: none;

    }

    .clickTip {
        min-width: 110px;
        position: absolute;
        left: calc(50% - 50px);
        top:calc(50% + 80px);
        width: 100px;
        height: 20px;
        font-size: 20px;
        color: #B8B8B8;
        line-height: 20px;
    }
</style>
<style>

</style>
