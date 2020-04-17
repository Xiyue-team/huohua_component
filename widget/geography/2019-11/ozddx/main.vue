<template>
    <div class="aspectration bg_white covered root_div_container ">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">{{lang.title}}</div>
                <div id="cardImage" class="rightContent">
                    <div id="rightCanvas">

                    </div>
                    <div id="threeControl" class="control" v-show="isShow3dContainer" v-bind:class="{'threeControlGray': isButtonGrayThreeControl}">
                        <div id="threeControl1" style="width: 100%; height: 100%; position: absolute"  v-show="isShowLeftText">
                            <div class="singleControl" style="left: 0;" v-show="true">
                                <div class="singleControlSwitch">
                                    <label for="checkbox-1" id="s1" class="control-block_div_border switch cursorPointer">
                                        <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" value="1" v-model="isShowPlateauText">
                                        <label for="checkbox-1" class="checkboxText" style="margin-left: -20px">{{lang.buttonText[0]}}</label>
                                    </label>
                                </div>
                            </div>
                            <div class="singleControl" style="left: 0; right: 0; margin: auto">
                                <div class="singleControlSwitch">
                                    <label for="checkbox-2" id="s2" class="control-block_div_border switch cursorPointer">
                                        <input type="checkbox" name="checkbox-cats[]" id="checkbox-2" value="2" v-model="isShowHillyAreaText">
                                        <label for="checkbox-2" class="checkboxText">{{lang.buttonText[1]}}</label>
                                    </label>
                                </div>
                            </div>
                            <div class="singleControl" style="right: 0;">
                                <div class="singleControlSwitch">
                                    <label for="checkbox-3" id="s3" class="control-block_div_border switch cursorPointer" v-show="true">
                                        <input type="checkbox" name="checkbox-cats[]" id="checkbox-3" value="3" v-model="isShowPlainText">
                                        <label for="checkbox-3" class="checkboxText">{{lang.buttonText[2]}}</label>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div id="threeControl2" style="width: 100%; height: 100%; position: absolute;"  v-show="!isShowLeftText">
                            <div class="singleControl cursorPointer" style="left: 0;" @click="clickReverse">
                                <div class="singleControlContent">
                                    <img  style="height: 100%; margin-right: 8px" src="./sub_static/img/button/resetIcon.png"/>
                                    <span style="float: right">{{lang.buttonText[3]}}</span>
                                </div>
                            </div>
                            <div class="singleControl cursorPointer" style="left: 0; right: 0; margin: auto" @click="previousPage" v-bind:class="{'buttonGray': isButtonGrayPreviousPage}">
                                <div class="singleControlContent">
                                    <img  style="height: 100%; margin-right: 8px" src="./sub_static/img/button/previousPageIcon.png"/>
                                    <span style="float: right">{{lang.buttonText[4]}}</span>
                                </div>
                            </div>
                            <div class="singleControl cursorPointer" style="right: 0;" @click="nextPage" v-bind:class="{'buttonGray': isButtonGrayNextPage}">
                                <div class="singleControlContent">
                                    <img  style="height: 100%; margin-right: 8px" src="./sub_static/img/button/nextPageIcon.png"/>
                                    <span style="float: right">{{lang.buttonText[5]}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="3dContainer" class="leftContent" v-show="isShow3dContainer"></div>
                <div class="leftContent" style="background-color: white" v-show="isShow3dContainerMask"></div>
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
  import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common.js';
  import 'vue-slider-component/dist-css/vue-slider-component.css';
  import 'vue-slider-component/theme/default.css';

  @Component({
    components: {
      fullScreensLayout, vueSlider
    },
    mixins: [ViewModel]
  })
  export default class App extends Vue {}
</script>

<style scoped='scoped'>
    .buttonGray {
        pointer-events: none;
        opacity: 0.3;
    }

    .threeControlGray {
        pointer-events: none;
    }

    .title_text{
        font-size: 20px;
        color: #333333;
        line-height: 20px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 26px;
        right: 100px;
        z-index: 99;
    }

    .leftContent {
        width: calc(100% - 420px);
        height: 100%;
        position: absolute;
        left: 0;
    }

    .rightContent {
        width: 100%;
        height: 100%;
        position: absolute;
        right: 0;
    }

    .control {
        width: 420px;
        height: 72px;
        position: absolute;
        right: 0;
        bottom: 0;
        box-shadow: inset 0 1px 0 0 #EAEAEA;
    }

    .singleControl {
        width: 33.33%;
        height: 100%;
        position: absolute;
        font-size: 18px;
        color: #1A1A1A;
    }

    #rightCanvas {
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .checkboxText {
        font-size: 18px;
        color: #1A1A1A;
        text-align: center;
    }

    .singleControlSwitch {
        width: 140px;
        height: 52px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -70px;
        margin-top: -26px;
    }

    .singleControlContent {
        max-width: 90px;
        height: 26px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -45px;
        margin-top: -13px;
    }

    @media screen and (max-width: 1100px) {
        .singleControl {
            font-size: 12px;
        }

        .singleControlContent {
            height: 16px;
            margin-left: -30px;
            margin-top: -8px;
        }

        .leftContent {
            width: calc(100% - 294px);
        }

        .control {
            width: 294px;
            height: 50px;
        }

        .singleControlSwitch {
            transform: scale(0.7, 0.7);
        }

        .title_text{
            right: 80px;
            font-size: 18px;
        }

    }

    @media screen and (max-width: 800px) {
        .leftContent {
            width: calc(100% - 210px);
        }

        .control {
            width: 210px;
            height: 36px;
        }

        .singleControlSwitch {
            transform: scale(0.5, 0.5);
        }

        .title_text{
            right: 70px;
            font-size: 10px;
        }
    }
</style>
<style>
    .control-panel_div_floatRight{
        z-index: -1;
        display: none;
    }

    .control-block_div_border {
        box-shadow: 0 0;
        border: 0 solid rgba( 0, 0, 0, 0);
        border-radius: 0px;
    }

    @media screen and (max-width: 740px) {
        .control_div_resetBtn {
            right: 17px;
            top: 14px;
            transform: scale(0.7);
        }
    }

</style>
