<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">诱导公式(2、3、4)</div>
                <div class="imgBackground" v-bind:class="{'imgBackgroundMobile': isMobile}">
                    <img src="./sub_static/alpha.png" alt="" ondragstart="return false" class="image"
                         v-bind:class="{'imageMobile': isMobile}" v-show="isClickButton4 && isClickButton5">
                    <img src="./sub_static/yellow.png" alt="" ondragstart="return false" class="image"
                         v-bind:class="{'imageMobile': isMobile}" v-show="(isClickButton4 && isClickButton6)">
                    <img src="./sub_static/green.png" alt="" ondragstart="return false" class="image"
                         v-bind:class="{'imageMobile': isMobile}" v-show="(isClickButton4 && isClickButton7)">
                </div>
                <img src="./sub_static/moren.png" class="imageStyle" alt="" v-bind:class="{'imageMobileStyle': isMobile}">
                <div id="3dContainer" style="width: 100%;height: 100%; ">
                </div>

                <div>
                    <buttonPrimary class="button1 publicButtonStyle"  v-bind:class="{'button1backAnimation': backAnimateControl, 'button1Click': animateControl && !isMobile,'button1ClickMobile': animateControl && isMobile ,'button1Mobile': isMobile }"
                                   v-bind:title="buttonTitle1" type="ellipse" v-bind:actived="isClickButton1" @click.native="buttonEvent1">
                    </buttonPrimary>
                </div>

                <div>
                    <buttonPrimary class="button2 publicButtonStyle" v-bind:class="{'button2backAnimation': backAnimateControl, 'button2Click': animateControl && !isMobile,'button2ClickMobile': animateControl && isMobile,'button2Mobile': isMobile}"
                                   v-bind:title="buttonTitle2" type="ellipse" v-bind:actived="isClickButton2" @click.native="buttonEvent2">
                    </buttonPrimary>
                </div>

                <div>
                    <buttonPrimary class="button3 publicButtonStyle" v-bind:class="{'button3backAnimation': backAnimateControl, 'button3Click': animateControl && !isMobile,'button3ClickMobile': animateControl && isMobile, 'button3Mobile': isMobile }"
                                   v-bind:title="buttonTitle3" type="ellipse" v-bind:actived="isClickButton3" @click.native="buttonEvent3">
                    </buttonPrimary>
                </div>

                <div >
                    <buttonPrimary class="button4 publicButtonStyle" v-bind:class="{'button4backAnimation': backAnimateControl, 'button4Click': animateControl && !isMobile,'button4ClickMobile': animateControl && isMobile,'button4Mobile': isMobile}"
                                   v-bind:title="buttonTitle4" type="ellipse" v-bind:actived="isClickButton4" @click.native="buttonEvent4">
                    </buttonPrimary>
                </div>

                <div >
                    <buttonPrimary class="button5 buttonZIndex" v-bind:class="{'button5backAnimation': backAnimateControl, 'button5Click': animateControl && !isMobile,'button5ClickMobile': animateControl && isMobile,'button5Mobile': isMobile }"
                                   v-bind:title="buttonTitle5" style="width: 74px;" type="ellipse" v-bind:actived="isClickButton5" @click.native="buttonEvent5">
                    </buttonPrimary>
                </div>
                <div >
                    <buttonPrimary class="button6 buttonZIndex" v-bind:class="{'button6backAnimation': backAnimateControl, 'button6Click': animateControl && !isMobile,'button6ClickMobile': animateControl && isMobile,'button6Mobile': isMobile }"
                                   v-bind:title="buttonTitle6" style="width: 74px;" type="ellipse" v-bind:actived="isClickButton6" @click.native="buttonEvent6">
                    </buttonPrimary>
                </div>

                <div >
                    <buttonPrimary class="button7 buttonZIndex" v-bind:class="{'button7backAnimation': backAnimateControl, 'button7Click': animateControl && !isMobile,'button7ClickMobile': animateControl && isMobile,'button7Mobile': isMobile }"
                                   v-bind:title="buttonTitle7" style="width: 74px;" type="ellipse" v-bind:actived="isClickButton7" @click.native="buttonEvent7">
                    </buttonPrimary>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" class="buttonControlStyle" v-bind:class="{'buttonControlMobileStyle': isMobile}">


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
  import { ViewModel } from './ViewModel';
  import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
  @Component({
    components: {
        fullScreensLayout, buttonPrimary
    },
    mixins: [ViewModel]
  })
  export default class App extends Vue {}

</script>

<style scoped="scoped">
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

    .button1 {
        width: 108px;
        height: 42px;
        position: absolute;
        bottom: 186px;
        right: 0px;
        transition: bottom 0.4s ease-in;
    }

    .button1Mobile {
        bottom: 174px;
        right: 12px;
    }

    .button1Click {
        bottom: 348px;
    }

    .button1ClickMobile {
        bottom: 336px;
    }

    .button2 {
        width: 108px;
        height: 42px;
        position: absolute;
        bottom: 132px;
        right: 0px;
        transition: bottom 0.4s ease-in 0.1s;
    }

    .button2Mobile {
        bottom: 120px;
        right: 12px;
    }

    .button2Click{
        bottom: 294px;
    }

    .button2ClickMobile {
        bottom: 282px;
    }

    .button3 {
        width: 108px;
        height: 42px;
        float: right;
        position: absolute;
        bottom: 78px;
        right: 0px;
        transition: bottom 0.4s ease-in 0.2s;
    }

    .button3Mobile {
        bottom: 66px;
        right: 12px;
    }

    .button3Click{
        bottom: 240px;
    }

    .button3ClickMobile {
        bottom: 228px;
    }

    .button4 {
        width: 125px;
        height: 42px;
        float: right;
        position: absolute;
        bottom: 24px;
        right: 0px;
        transition: bottom 0.4s ease-in 0.3s;
    }

    .button4Mobile {
        bottom: 12px;
        right: 12px;
    }

    .button4Click {
        bottom: 186px;
    }

    .button4ClickMobile {
        bottom: 174px;
    }

    .button5 {
        width: 125px;
        height: 42px;
        float: right;
        position: absolute;
        bottom: 24px;
        right: 0px;
        opacity: 0;
        z-index: 1;
        transition: bottom 0.4s ease-in 0.4s,
                opacity 0.4s linear 0.4s;
    }

    .button5Mobile {
        bottom: 12px;
        right: 12px;
    }

    .button5Click {
        bottom: 132px;
        opacity: 1;
    }

    .button5ClickMobile {
        bottom: 120px;
        opacity: 1;
    }

    .button6 {
        width: 125px;
        height: 42px;
        float: right;
        position: absolute;
        bottom: 24px;
        right: 0px;
        opacity: 0;
        z-index: 1;
        transition: bottom 0.4s ease-in 0.5s,
                opacity 0.4s linear 0.5s;
    }

    .button6Mobile {
        bottom: 12px;
        right: 12px;
    }

    .button6Click {
        bottom: 78px;
        opacity: 1;
    }

    .button6ClickMobile {
        bottom: 66px;
        opacity: 1;
    }

    .button7 {
        width: 125px;
        height: 42px;
        float: right;
        position: absolute;
        bottom: 24px;
        right: 0px;
        opacity: 0;
        z-index: 1;
        transition: opacity 0.4s linear 0.6s;
    }

    .button7Mobile {
        bottom: 12px;
        right: 12px;
    }

    .button7Click {
        opacity: 1;
    }

    .button7ClickMobile {
        opacity: 1;
    }


    .buttonControlStyle {
        width: 0px;
        height: 0%;
    }

    .buttonControlMobileStyle {
        height: 424px;
    }

    .buttonMobileStyle {
        height: 40px;
        margin-bottom: 12px;
    }

    .image {
        height: 170px;
    }

    .imageMobile {
        height: 160px;
    }

    .animationLayerStyle {
        width: 100%;
        height: 242px;
        position: absolute;
        bottom: 0px;
        right: 0px;
    }

    .imgBackground {
        width: 154px;
        height: 170px;
        position: absolute;
        left: 200px;
        /*bottom: 215px;*/
        top: 100px;
    }
    .imgBackgroundMobile {
        top: 80px;
        left: 140px;
    }

    .imageStyle {
        width: 97px;
        position: absolute;
        top: 100px;
        left: 80px;
    }

    .imageMobileStyle {
        width: 60px;
        top: 100px;
        left: 40px;
    }

    .publicButtonStyle {
        right: 24px;
        z-index: 11;
    }

    .buttonZIndex {
        right: 24px;
        z-index: 10;
    }

    .button1backAnimation {
        transition: bottom 0.4s ease-in 0.6s;
    }
    .button2backAnimation {
        transition: bottom 0.4s ease-in 0.5s;
    }
    .button3backAnimation {
        transition: bottom 0.4s ease-in 0.4s;
    }
    .button4backAnimation {
        transition: bottom 0.4s ease-in 0.3s;
    }
    .button5backAnimation {
        transition: bottom 0.4s ease-in 0.2s,
        opacity 0.4s linear 0.2s;
    }
    .button6backAnimation {
        transition: bottom 0.4s ease-in 0.1s,
        opacity 0.4s linear 0.1s;
    }
    .button7backAnimation {
        transition: opacity 0.4s linear;
    }

    .button1.active {
        background: #ae27d3;
        color: #FFFFFF;
        border-color: #ae27d3;
    }
    .button2.active {
        background: #ff9d1e;
        color: #FFFFFF;
        border-color: #ff9d1e;
    }
    .button3.active {
        background: #49f0ca;
        color: #FFFFFF;
        border-color: #49f0ca;
    }
    .button1:active {
        background: #ae27d3;
        color: #FFFFFF;
        border-color: #ae27d3;
    }
    .button2:active {
        background: #ff9d1e;
        color: #FFFFFF;
        border-color: #ff9d1e;
    }
    .button3:active {
        background: #49f0ca;
        color: #FFFFFF;
        border-color: #49f0ca;
    }
    .button5.active {
        background: #ae27d3;
        color: #FFFFFF;
        border-color: #ae27d3;
    }
    .button6.active {
        background: #ff9d1e;
        color: #FFFFFF;
        border-color: #ff9d1e;
    }
    .button7.active {
        background: #49f0ca;
        color: #FFFFFF;
        border-color: #49f0ca;
    }
    .button5:active {
        background: #ae27d3;
        color: #FFFFFF;
        border-color: #ae27d3;
    }
    .button6:active {
        background: #ff9d1e;
        color: #FFFFFF;
        border-color: #ff9d1e;
    }
    .button7:active {
        background: #49f0ca;
        color: #FFFFFF;
        border-color: #49f0ca;
    }
</style>
<style>

</style>