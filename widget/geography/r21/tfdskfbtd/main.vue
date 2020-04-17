<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">台风源地的时空分布特点（2013—2018年度）</div>
                <div id="3dContainer" class="note">
                </div>

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

                <buttonPrimary class="thirteenButton" v-bind:class="{isActived13: flag13}" v-bind:title="thirteenTitle" @click.native="thirteenEvent" type="ellipse">
                </buttonPrimary>

                <buttonPrimary class="fourteenButton" v-bind:class="{isActived14: flag14}" v-bind:title="fourteenTitle" @click.native="fourteenEvent" type="ellipse">
                </buttonPrimary>

                <buttonPrimary class="fifteenButton" v-bind:class="{isActived15: flag15}" v-bind:title="fifteenTitle" @click.native="fifteenEvent" type="ellipse">
                </buttonPrimary>

                <buttonPrimary class="sixteenButton" v-bind:class="{isActived16: flag16}" v-bind:title="sixteenTitle" @click.native="sixteenEvent" type="ellipse">
                </buttonPrimary>

                <buttonPrimary class="seventeenButton" v-bind:class="{isActived17: flag17}" v-bind:title="seventeenTitle" @click.native="seventeenEvent" type="ellipse">
                </buttonPrimary>

                <buttonPrimary class="eighteenButton" v-bind:class="{isActived18: flag18}" v-bind:title="eighteenTitle" @click.native="eighteenEvent" type="ellipse">
                </buttonPrimary>

                <div @click="openEvent">
                    <buttonPrimary class="tableButton" v-bind:title="tableTitle" type="ellipse">
                    </buttonPrimary>
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

    .thirteenButton, .fourteenButton, .fifteenButton, .sixteenButton,
    .seventeenButton, .eighteenButton {
        position: absolute;
        bottom: 4.2%;
        color: #B7B7B7!important;
        background-color: #2D2B45!important;
        border: 2px solid rgba(255,255,255,0.20)!important;
    }

    .thirteenButton {
        left: 24.2%;
    }

    .isActived13 {
        background-color: #FF5147!important;
        color: #FFFFFF!important;
    }

    .fourteenButton {
        left: 34.8%;
    }

    .isActived14 {
        background-color: #8DB614!important;
        color: #FFFFFF!important;
    }

    .fifteenButton {
        left: 45.3%;
    }

    .isActived15 {
        background-color: #358EE5!important;
        color: #FFFFFF!important;
    }

    .sixteenButton {
        left: 55.9%;
    }

    .isActived16 {
        background-color: #D15ED8!important;
        color: #FFFFFF!important;
    }

    .seventeenButton {
        left: 66.4%;
    }

    .isActived17 {
        background-color: #C6AE42!important;
        color: #FFFFFF!important;
    }

    .eighteenButton {
        left: 77%;
    }

    .isActived18 {
        background-color: #0BBF96!important;
        color: #FFFFFF!important;
    }

    .tableButton {
        position: absolute;
        color: #B7B7B7!important;
        background-color: #2D2B45!important;
        border: 2px solid rgba(255,255,255,0.20)!important;
        bottom: 4.2%;
        left: 87.5%;
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
