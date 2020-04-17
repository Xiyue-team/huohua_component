<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">集合的基本关系</div>
                <div id="3dContainer" style="width: 100%; height: 100%;">
                </div>
                <div class="sliderStyle"  v-bind:class="{'sliderStylePhone': isPhone}">
                    <div class="sliderTextA">A</div>
                    <vue-slider
                            style="position: absolute; top: 0px; right: 0"
                            v-model="sliderNum"
                            v-bind="sliderOption"
                            :tooltip="'none'"
                    ></vue-slider>
                </div>

                <div class="releation_button_style" @click="relationButtonEvent()">
                    <buttonPrimary
                            style="width: 100%"
                            v-bind:title="relationTitle"
                            type="ellipse"
                            v-bind:actived="relationActived">
                    </buttonPrimary>
                </div>
                <div class="detail_button_style" @click="detailButtonEvent()">
                    <buttonPrimary
                            style="width: 100%"
                            v-bind:title="detailTitle"
                            type="ellipse"
                            v-bind:actived="detailActived"
                            v-show="isDetail">
                    </buttonPrimary>
                </div>

                <div class="releation_button_div releation_button_div_style" v-show="oneDisable">
                    <img class="releation_button_image"   src="./sub_static/relationOne.png" />
                </div >
                <div class="releation_button_div releation_button_div_style" v-show="twoDisable">
                    <img class="releation_button_image"   src="./sub_static/relationTwo.png" />
                </div >
                <div class="releation_button_three releation_button_div_style" v-show="threeDisable">
                    <img class="releation_button_image"   src="./sub_static/relationThree.png" />
                </div >
                <div class="detail_button_div releation_button_div_style" v-show="detailDisable">
                    <img class="releation_button_image"   src="./sub_static/detail.png" />
                </div >

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
  import Component from 'vue-class-component';
  import { ViewModel } from './ViewModel';
  import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
  import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common.js';
  import 'vue-slider-component/dist-css/vue-slider-component.css';
  import 'vue-slider-component/theme/default.css';

  @Component({
    components: {
       fullScreensLayout,
       buttonPrimary,
        vueSlider
    },
    mixins: [ViewModel]
  })
  export default class App extends Vue {}
</script>

<style scoped="scoped">
    body {
        overflow: hidden !important;
    }

    .title_text {
        font-size: 24px;
        line-height: 24px;
        color: #fff;
        position: absolute;
        top:24px;
        left:24px;
        z-index: 3;
    }
    .sliderStyle {
        position: absolute;
        bottom: calc(50% + 24px);
        right: 24px;
        z-index: 99;
        width: 210px;
        height: 27px;
    }
    .releation_button_style{
        position: absolute;
        width: 80px;
        height: 42px;
        bottom: 24px;
        right: 24px;
    }
    .detail_button_style{
        position: absolute;
        width: 80px;
        height: 42px;
        bottom: 100px;
        right: 24px;
    }
    .releation_button_image{
        width: 100%;
        height: 100%;
    }

    .releation_button_div_style{
        background: rgba(81,81,81,0.50);
        border: 1px solid rgba(255,255,255,0.20);
        box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
        border-radius: 12px;
    }

    .sliderTextA {
        position: absolute;
        font-family: "Times New Roman", Times, serif;
        font-size: 24px;
        font-style: italic;
        color: #FFFFFF;
        text-align: right;
    }


    .releation_button_div{
        position: absolute;
        bottom: 10px;
        right: 110px;
        width: 144px;
        height: 62px;
    }

    .releation_button_three{
        position: absolute;
        bottom: 10px;
        right: 110px;
        width: 214px;
        height: 84px;
    }

    .detail_button_div{
        position: absolute;
        bottom: 85px;
        right: 110px;
        width: 214px;
        height: 67px;
    }
    .releation_button_two{
        position: absolute;
        bottom: 10px;
        right: 110px;
        width: 144px;
        height: 62px;
    }

</style>
