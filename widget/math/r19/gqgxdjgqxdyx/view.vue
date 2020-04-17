<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div style="width: 100%; height: 100%;" v-if="isPc">
                    <video src="./sub_static/animation1.mp4" v-show="isShowAnimation1" class="videoStyle"></video>
                    <video src="./sub_static/animation2.mp4" v-show="isShowAnimation2" class="videoStyle"></video>
                    <video src="./sub_static/animation3.mp4" v-show="isShowAnimation3" class="videoStyle"></video>
                    <video src="./sub_static/animation4.mp4" v-show="isShowAnimation4" class="videoStyle"></video>
                    <div class="SliderBackground" v-show="isShowSlider">
                        <vue-slider ref="slider1th" v-model="slidernumber" v-bind="sliderOption" style="top: 14px; left: 24px;">
                            <template slot="tooltip" slot-scope="tooltip">
                                <div v-if="false" class="custom-tooltip">
                                </div>
                            </template>
                        </vue-slider>
                    </div>
                </div>
                <div style="width: 100%;height: 100%" v-else>
                    <keyFrameAnimation v-bind="animationOption1"  ref="animationControl1" style=" position: absolute; top: calc(50% - 191px); left: calc(50% - 340px);" v-show="isShowAnimation1">
                    </keyFrameAnimation>
                    <keyFrameAnimation v-bind="animationOption2"  ref="animationControl2" style=" position: absolute; top: calc(50% - 191px); left: calc(50% - 340px);" v-show="isShowAnimation2">
                    </keyFrameAnimation>
                    <keyFrameAnimation v-bind="animationOption3"  ref="animationControl3" style=" position: absolute; top: calc(50% - 191px); left: calc(50% - 340px);" v-show="isShowAnimation3">
                    </keyFrameAnimation>
                    <keyFrameAnimation v-bind="animationOption4"  ref="animationControl4" style=" position: absolute; top: calc(50% - 191px); left: calc(50% - 340px);" v-show="isShowAnimation4">
                    </keyFrameAnimation>
                    <div class="SliderBackground" v-show="isShowSlider">
                        <vue-slider ref="slider1th" v-model="slidernumber" v-bind="sliderOption" style="top: 14px; left: 24px;">
                            <template slot="tooltip" slot-scope="tooltip">
                                <div v-if="false" class="custom-tooltip">
                                </div>
                            </template>
                        </vue-slider>
                    </div>
                </div>
                <div class="title_text">{{title}}</div>
                <buttonPrimary class="buttonStyle"  v-bind:title="buttonTitle" type="ellipse" v-bind:actived="isClickButton" @click.native="buttonEvent">
                </buttonPrimary>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" class="buttonControlStyle">

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
  import keyFrameAnimation from '../../../../src/component/layout/keyFrameAnimation.vue';
  import Component from 'vue-class-component';
  import { ViewModel } from './ViewModel';
  import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
  import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
  @Component({
    components: {
        fullScreensLayout, buttonPrimary, vueSlider, keyFrameAnimation
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
    .SliderBackground {
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.08);
        border-radius: 4px;
        width: 312px;
        height: 42px;
        position: absolute;
        bottom: 24px;
        left: calc(50% - 156px);
    }
    .buttonStyle {
        width: 80px;
        height: 42px;
        position: absolute;
        bottom: 24px;
        right: 24px;
        z-index: 10;
    }

    .videoStyle {
        width: 1024px;
        height: 576px;
        position: absolute;
        top: calc(50% - 288px);
        left: calc(50% - 512px);
    }

    .buttonControlStyle {
        display: flex;
        align-items: flex-end;
        flex-direction: column-reverse;
        width: 100%;
        height: 100%;
    }
</style>
