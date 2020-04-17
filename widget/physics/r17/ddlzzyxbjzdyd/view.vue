<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">带电粒子在圆形边界中的运动1</div>
                <div class="bg">
                    <div id="magneticContainer" style="width: 100%;height: 100%;">
                        <canvas id="magneticCanvas"  width="100%" height="100%" ></canvas>
                    </div>
                    <vue-slider id = "slider" class="sliderStyle" ref="slider4" v-bind="sliderOption" v-model="sliderNum">
                    </vue-slider>
                    <div id="font" class="font_Style">拖动调整粒子移动速度</div>
                    <div id="fontV" class="font_Style_zm">v</div>
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
  import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
  import Component from 'vue-class-component';
  import { ViewModel } from './ViewModel';

  @Component({
    components: {
      fullScreensLayout,
      vueSlider
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

    .font_Style {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
        line-height: 12px;
        position: absolute;
        left: 75%;
        bottom: 2%;
    }

    .font_Style_zm {
        font-style:  italic;
        font-family: Times New Roman !important;
        color: #333333;
        position: absolute;
        font-size: 30px;
        left: 25%;
        bottom: 0;
    }

    .sliderStyle {
        position: absolute;
        left: 35%;
        bottom: 0;
    }

    .bg {
        width: 64.5%;
        height: 90%;
        position: relative;
        left: calc(50% - 32%);
        top: 0;
    }
</style>
