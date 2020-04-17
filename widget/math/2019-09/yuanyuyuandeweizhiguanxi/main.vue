<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">{{title}}</span>
                <div class="title_box">{{titleBox}}</div>
                <div class="rightBox" id="rightBox">
                    <div id="maodian" style="position:absolute;top:0"></div>
                    <div class="textImg" >
                        <img src="./sub_static/UI/text.png" style="width:100%;height:100%"/>
                        <div class="text_yuan1">{{buttonArr[1]}}</div>
                        <div class="text_yuan2">{{buttonArr[1]}}</div>
                    </div>
                    <div class="slide">
                        <div class="sliderBox1">
                            <div class="textTip"><img src="./sub_static/UI/m1.png"/></div>
                            <vue-slider class="vueSlider" v-model="value1" v-bind="sliderOption1"></vue-slider>
                        </div>
                        <div class="sliderBox2">
                            <div class="textTip"><img src="./sub_static/UI/m2.png"/></div>
                            <vue-slider2 class="vueSlider" v-model="value2" v-bind="sliderOption2"></vue-slider2>
                        </div>
                        <div class="dTextBox">
                            <div class="dText"><img src="./sub_static/UI/m3.png"/></div>
                            <div class="distance">{{dis}}</div>
                        </div>
                    </div>
                    <div :class="{btn:have,blue:isChecked}" @click="clickbutton">{{buttonArr[0]}}</div>
                    <div class="textImg2" id="textImg2">
                        <img src="./sub_static/UI/tab.png"/>
                        <div class="tab_text1">{{tableArr[0]}}</div>
                        <div class="tab_text2">{{tableArr[1]}}</div>
                        <div class="tab_text3">{{tableArr[2]}}</div>
                        <div class="tab_text4">{{tableArr[3]}}</div>
                        <div class="tab_text5">{{tableArr[4]}}</div>
                        <div class="tab_text6">{{tableArr[5]}}</div>
                        <div  class="tab_text7">{{tableArr[6]}}</div>
                    </div>
                    
                    
                </div>
                <div style="width: 100%; height: 100%; display: flex">
                    <div id="3dContainer" style="margin: auto;width: 100%;height: 100%;background: #2C2C2C">
                    </div>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
                </div>
            </template>
        </fullScreensLayout>
    </div>
</template>
<script lang="ts">
  import "../../../../src/assets/css/core.css";
  import "../../../../src/assets/css/layout.css";
  import fullScreensLayout from "../../../../src/component/layout/fullScreens_layout.vue";
  import Component from "vue-class-component";
  import { MainVueComponent } from "./mainVueComponent.ts";
  import vueSlider from "vue-slider-component/dist-css/vue-slider-component.common.js";
  import vueSlider2 from "vue-slider-component/dist-css/vue-slider-component.common.js";
  import "vue-slider-component/dist-css/vue-slider-component.css";
  import "vue-slider-component/theme/default.css";
  @Component({
    components: {
      fullScreensLayout,
      vueSlider,
      vueSlider2
    }
  })
  export default class App extends MainVueComponent {
  }
</script>
<style scoped="scoped">
    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    *{
         /* touch-action: none; */
         border:none;

    }

    img {
        width: 100%;
       /* height: 100%;*/
       pointer-events: none;
    }
    .title_text {

        font-size: 28px;
        color: #FFFFFF;
        line-height: 28px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
        z-index: 100;
    }

    .title_box {
        width: 88px;
        height: 42px;
        background: rgba(81, 81, 81, 0.50);
        border: 1px solid rgba(255, 255, 255, 0.20);
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.20);
        border-radius: 8px;
        font-size: 20px;
        color: #FFFFFF;
        position: absolute;
        top: 92px;
        left: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .vueSlider {
        margin-left: 10px;
        width: calc( 100% - 60px) !important;
    }

    .rightBox {
        width: 313px;
        height: 100%;
        position: absolute;
        overflow-y: auto;
        overflow-x: hidden; 
        padding-top: 50px;
        right: 20px;
        /*transform: translateY(-50%);*/
        /*display: flex;
        flex-direction: column;
        justify-content: space-between;*/
        box-sizing: border-box;
    }

    .textImg {
        width: 100%;
        height: auto;
        position: relative;
    }
    .text_yuan1{
        font-size: 20px;
        color: #fff;
        width: 20px;
        height: 20px;
        position: absolute;
        top: -4px;
        left: 0px;
    }
    .text_yuan2{
        font-size: 20px;
        color: #fff;
        width: 20px;
        height: 20px;
        position: absolute;
        bottom:0.6vh ;
        left: 0px;
        line-height: 20px;
    }
    .slide {
        width: 220px;
        height: 140px;
       /* display: flex;
        flex-direction: column;*/
    }

    .sliderBox1 {
        width: 220px;
        display: flex;
        flex-direction: row;
        margin-top: 40px;
    }

    .sliderBox1 .textTip {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        /*color: #fff;*/
        /*line-height: 22px;*/
    }

    .sliderBox2 {
        width: 220px;
        display: flex;
        flex-direction: row;
        margin-top: 30px;
    }

    .sliderBox2 .textTip {
        width: 20px;
        height: 20px;
        /*color: #fff;*/
        /*line-height: 22px;*/
        margin-right: 10px;
    }

    .dTextBox {
        width: 120px;
        height: 39px;
        display: flex;
        flex-direction: row;
       /* justify-content: space-between;*/
        align-items: center;
        margin-top: 10px;
    }

    .dText {
        width: 33px;
        height: 20px;
        /*margin-right: 10px;*/
    }

    .distance {
        width: 56px;
        height: 36px;
        background: rgba(81, 81, 81, 0.50);
        border: 1px solid rgba(255, 255, 255, 0.20);
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.20);
        border-radius: 8px;
        margin-left: 15px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn {
        width: 88px;
        height: 42px;
        background: #EBEBEB;
        border-radius: 21px;
        font-size: 16px;
        color: #525252;
        margin-top: 10px;
         display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .blue {
        background: #0291FF;
        border-radius: 21px;
        color: #FFFFFF;
    }

    .textImg2 {
        opacity: 0;
        width: 100%;
        /*height: 254px;*/
        margin-top: 10px;
        position: relative;
    }

    .tab_text1 {
        font-size: 20px;
        color: #fff;
        position: absolute;
        top: 10px;
        right: 160px;
    }

    .tab_text2 {
        font-size: 20px;
        color: #fff;
        position: absolute;
        top: 10px;
        right: 17px;
    }

    .tab_text3 {
        font-size: 20px;
        color: #fff;
        position: absolute;
        top: 54px;
        right: 17px;
    }

    .tab_text4 {
        font-size: 20px;
        color: #fff;
        position: absolute;
        top: 100px;
        right: 17px;
    }

    .tab_text5 {
        font-size: 20px;
        color: #fff;
        position: absolute;
        top: 144px;
        right: 17px;
    }

    .tab_text6 {
        font-size: 20px;
        color: #fff;
        position: absolute;
        top: 188px;
        right: 17px;
    }

    .tab_text7 {
        font-size: 20px;
        color: #fff;
        position: absolute;
        top: 233px;
        right: 17px;
    }
  
    @media (width: 1280px) {
        .text_yuan2 {
            position: absolute;
            bottom: 0.9vh;
        }
        .tab_text3 {
            top: 53px;
        }
        .tab_text4 {
            top: 98px;
        }
        .tab_text5 {
            top: 144px;
        }
        .tab_text6 {
            top: 190px;
        }
        .tab_text7 {
            top:233px;
        }

    }
    @media(width: 730px){
         .slide{
             height: 117px;
         }
         .textImg2 {
            margin-top: 5px;
        }
    }
    @media(height: 336px){
         .slide{
             height: 117px;
         }
         .textImg2 {
            margin-top: 5px;
        }
    }
    
</style>
<style>
    @media (max-width: 1024px) {
        .title_text {
            font-size: 20px !important;
        }
        .rightBox {
            width: 220px !important;
        }
        .text_yuan1 {
            font-size: 17px !important;
            /* top: 45px !important; */
        }
        .text_yuan2 {
            font-size: 17px !important;
            /* top: 72px !important; */
        }
        .tab_text1 {
            top: 4px !important;
            right: 116px !important;
        }
        .tab_text2 {
            top: 4px !important;
            right: 9px !important;
        }
        .tab_text3 {
            top: 35px !important;
            right: 9px !important;
        }
        .tab_text4 {
            top: 66px !important;
            right: 9px !important;
        }
        .tab_text5 {
            top: 98px !important;
            right: 9px !important;
        }
        .tab_text6 {
            top: 130px !important;
            right: 9px !important;
        }
        .tab_text7 {
            top: 162px !important;
            right: 9px !important;
        }
    }
    @media (min-width: 800px) {
        .rightBox {
            padding-top: 75px!important;
        }
    }
    @media (max-width: 1024px) {
        .control_div_resetBtn {
            position: absolute;
            right: 4px!important;
            top: 4px!important;
            /*transform: scale(0.7);*/
        }
    }
    @media (max-height: 450px) {
        .control_div_resetBtn {
            position: absolute;
            right: 0!important;
            top: 0!important;
           /* transform: scale(0.6);*/
        }
    }
</style>
