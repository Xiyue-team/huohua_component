<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">圆锥曲线的第二定义</div>
                <div style="width: 100%; height: 100%; display: flex">
                    <div  id="3dContainer" style="margin: auto;width: 100%;height: 100%">
                    </div>
                    <div class="threeEquation" v-bind:class="{ 'set_scale': isMobile }">
                        <div class="formulaOne" @click="showFormulaOne" >
                            <img src="./sub_static/firstFormula.png" style="width: 100%"/>
                        </div>

                        <div class="formulaTwo" @click="showFormulaTwo"  >
                            <img src="./sub_static/secondFormula.png" style="width: 100%"/>
                        </div>

                        <div class="formulaThree" @click="showFormulaThree"  >
                            <img src="./sub_static/thirdFormula.png" style="width: 100%"/>
                        </div>
                    </div>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" style="width: 100%; height: 100%">
                        <div @click="drawEvent" v-bind:class="{ event_disabled: disableButtonDraw }">
                            <buttonPrimary class="drawButton" v-bind:title="drawTitle" type="ellipse" v-bind:actived="drawColor">
                            </buttonPrimary>
                        </div>

                        <div @click="showEvent" v-bind:class="{ event_disabled: disableButtonShow }">
                            <buttonPrimary class="showButton" v-bind:title="showTitle" type="ellipse" v-bind:actived="showColor">
                            </buttonPrimary>
                        </div>

                        <div v-show="selectButton" v-bind:class="{ event_disabled: disableButtonSelect }">
                            <div class="leftButtonExhibition" @click="leftButtonExhibitionEvent">
                                <img style="width: 100%; height: 100%" src="./sub_static/whitePoint.png" v-show="!(showExhibition === 1)"/>
                                <img style="width: 100%; height: 100%" src="./sub_static/bluePoint.png"  v-show="showExhibition === 1"/>
                            </div>
                            <div class="rightButtonExhibition" @click="rightButtonExhibitionEvent">
                                <img style="width: 100%; height: 100%" src="./sub_static/whitePoint.png" v-show="!(showExhibition === 2)"/>
                                <img style="width: 100%; height: 100%" src="./sub_static/bluePoint.png"  v-show="showExhibition === 2"/>
                            </div>
                            <div class="topButtonExhibition" @click="topButtonExhibitionEvent">
                                <img style="width: 100%; height: 100%" src="./sub_static/whitePoint.png" v-show="!(showExhibition === 3)"/>
                                <img style="width: 100%; height: 100%" src="./sub_static/bluePoint.png"  v-show="showExhibition === 3"/>
                            </div>
                            <div class="bottomButtonExhibition" @click="bottomButtonExhibitionEvent">
                                <img style="width: 100%; height: 100%" src="./sub_static/whitePoint.png" v-show="!(showExhibition === 4)"/>
                                <img style="width: 100%; height: 100%" src="./sub_static/bluePoint.png"  v-show="showExhibition === 4"/>
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
  import Component from 'vue-class-component';
  import { ViewModel } from './ViewModel';
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

    .drawButton {
        position: absolute;
        width: 90px;
        height: 44px;
        bottom: 60px;
        right: 188px;
        font-size: 18px;
    }

    .showButton {
        position: absolute;
        width: 90px;
        height: 44px;
        bottom: 60px;
        right: 48px;
        font-size: 18px;
    }

    .leftButtonExhibition {
        width: 36px;
        height: 36px;
        position: absolute;
        bottom: 64px;
        right: 150px;
        margin: auto;
    }

    .leftButtonExhibition:hover {
        cursor: pointer;
    }

    .rightButtonExhibition {
        width: 36px;
        height: 36px;
        position: absolute;
        bottom: 64px;
        right: 0px;
        margin: auto;
    }

    .rightButtonExhibition:hover {
        cursor: pointer;
    }

    .topButtonExhibition {
        width: 36px;
        height: 36px;
        position: absolute;
        bottom: 116px;
        right: 75px;
        margin: auto;
    }

    .topButtonExhibition:hover {
        cursor: pointer;
    }

    .bottomButtonExhibition {
        width: 36px;
        height: 36px;
        position: absolute;
        bottom: 16px;
        right: 75px;
        margin: auto;
    }

    .bottomButtonExhibition:hover {
        cursor: pointer;
    }

    .threeEquation {
        position: absolute;
        width: 300px;
        height: 196px;
        top: 96px;
        left: 24px;
    }

    .formulaOne {
        width: 146px;
        height: 68px;
        position: absolute;
        top: 0;
    }

    .formulaTwo {
        width: 146px;
        height: 68px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        opacity: 0.5;
    }

    .formulaThree {
        width: 146px;
        height: 68px;
        position: absolute;
        bottom: 0;
        opacity: 0.5;
    }

    .set_scale {
        transform: scale(0.7);
        position: absolute;
        top: 48px;
        left: 12px;
    }

</style>

