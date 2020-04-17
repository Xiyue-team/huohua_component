<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">汤姆孙气体放电管</div>
                <div id="3dContainer" style="width: 100%;height: 100%;">

                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
                    <div style="width: 200px;">
                        <div @click="accelerateElectricField">
                            <buttonPrimary class="accelerateButton" v-bind:title="accelerateTitle" type="ellipse" v-bind:actived="accelerateColor">
                            </buttonPrimary>
                        </div>
                        <div class="offsetText">
                            <span style="color: #fff">偏转电场电压</span>
                        </div>
                        <div class="sliderClass">
                            <span style="position: absolute; bottom: 25px;left: -15px; color: #fff">-20</span>
                            <vue-slider ref="slider1th" v-model="sliderNumber" v-bind="sliderOption" style="position: absolute; bottom: 41px; right: 14px;">
                            </vue-slider>
                            <span style="position: absolute; bottom: 25px;left: 165px; color: #fff">20</span>
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
  import vueSlider from '../../../../src/component/ui/vue2-slider.vue';

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
    .title_text{
        font-size: 24px;
        color: #fff;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    .accelerateButton {
        position: absolute;
        width: 120px;
        height: 44px;
        bottom: 147px;
        right: 24px;
        font-size: 16px;
    }

    .offsetText {
        position: absolute;
        width: 120px;
        height: 44px;
        bottom: 90px;
        right: 24px;
        font-size: 16px;
        text-align: center;
    }

    .sliderClass {
        position: absolute;
        bottom: 8px;
        right: 10px;
        width: 200px;
    }

</style>

