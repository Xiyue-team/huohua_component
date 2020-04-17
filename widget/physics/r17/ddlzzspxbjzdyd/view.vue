<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div class="title_text">带电粒子在平行边界中的运动2</div>
                <div class="bg_style">
                    <div id="magneticContainer" style="width: 100%;height: 90%;">
                        <canvas id="magneticCanvas"  width="100%" height="100%" ></canvas>
                    </div>
                    <vue-slider ref="slider1th" v-model="slidernumber" v-bind="sliderOption" style="position: absolute;left:224px;bottom: 0%">
                        <template slot="tooltip" scope="tooltip">
                            <div v-if="false" class="custom-tooltip">
                            </div>
                        </template>
                    </vue-slider>
                    <div class="font_Style">拖动调整粒子移动速度</div>
                    <div class="font_Style_zm">v</div>
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
  import vueSlider from '../../../../src/component/ui/vue2-slider.vue';

  @Component({
    components: {
      fullScreensLayout, vueSlider
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
        bottom: 0%;
        right: 18px;
    }

    .font_Style_zm {
        font-style:  italic;
        font-family: Times New Roman !important;
        color: #333333;
        position: absolute;
        left: 190px;
        bottom: 0%;
        font-size: 30px;
    }

    .bg_style {
        width: 660px;
        height: 430px;
        position: absolute;
        left: calc(50% - 330px);
        top: calc(50% - 215px);
        /*background: #000;*/
    }
</style>
