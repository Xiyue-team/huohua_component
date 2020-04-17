<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">台风源地的时空分布特点（2013—2018年度）</div>
                <div id="3dContainer" class="note">
                </div>
            </template>

            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
                    <div style="width: 550px; height: 500px;position: absolute;top: 0px; right: 24px" v-show="table" id="container">
                        <img src="./sub_static/table.png" style="width: 550px; height: 500px" id="tableImg"/>
                        <!--konva  sprite图-->
                        <i id="oneImg" class="imgOne"></i>
                        <i id="twoImg" class="imgTwo"></i>
                        <i id="threeImg" class="imgThree"></i>
                        <i id="fourImg" class="imgFour"></i>
                        <i id="fiveImg" class="imgFive"></i>
                        <i id="sixImg" class="imgSix"></i>
                    </div>

                    <div @click="startEvent" v-show="startBtn">
                        <buttonPrimary class="startButton" v-bind:title="startTitle" type="ellipse">
                        </buttonPrimary>
                    </div>

                    <div @click="openEvent" v-show="openTable">
                        <buttonPrimary class="tableButton" v-bind:title="tableTitle" type="ellipse">
                        </buttonPrimary>
                    </div>
                    <div id="turnBtn">
                        <div style="position: absolute; bottom: 4.5%; right: 1.9%; width: 144px; height: 44px" v-show="showBtn" v-bind:class="{ event_disabled: flag }">
                            <h_button class="h_button3" style="position: absolute; bottom: 0px" v-bind:titleValue.sync="textValue"
                                      v-bind:titleArray.sync="titleText" v-bind:pageTurning.sync="pageTurningCallBack" ></h_button>
                        </div>
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
  import h_button from '../../../../src/component/ui/buttonLeftRightPageTurning.vue';
  import Component from 'vue-class-component';
  import { MainVueComponent } from './mainVueComponent';
  import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';

  @Component({
    components: {
       fullScreensLayout,
       h_button,
       buttonPrimary
    },
    mixins: [MainVueComponent]
  })
  export default class App extends Vue {}
</script>

<style scoped="scoped">
    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .startButton {
        position: absolute;
        bottom: 4.2%;
        right: 2.3%;
        width: 80px;
    }

    .tableButton {
        position: absolute;
        bottom: 13.9%;
        right: 2.3%;
        width: 120px;
    }

    .note {
        width: 100%;
        height: 100%;
        background-image: url('./sub_static/backgroud.png');
        background-size: 100% 100%;
    }

    .title_text {
        font-size: 24px;
        color: #fff;
        padding-top: 10px;
        padding-left: 8px;
        position: absolute;
        top:24px;
        left:24px;
        background: #080529;
        width: 495px;
        height: 44px;
    }

    .imgOne {
        background: url("./sub_static/one.png") 0 0 no-repeat;
    }

    .imgTwo {
        background: url("./sub_static/two.png") 0 0 no-repeat;
    }

    .imgThree {
        background: url("./sub_static/three.png") 0 0 no-repeat;
    }

    .imgFour {
        background: url("./sub_static/four.png") 0 0 no-repeat;
    }

    .imgFive {
        background: url("./sub_static/five.png") 0 0 no-repeat;
    }

    .imgSix {
        background: url("./sub_static/six.png") 0 0 no-repeat;
    }

    .imgOne, .imgTwo, .imgThree, .imgFour, .imgFive, .imgSix {
        display: block;
        width: 0px;
        height: 500px;
        background-size: cover;
        position: absolute;
        top: 0px;
        left: 0px;
    }

</style>
