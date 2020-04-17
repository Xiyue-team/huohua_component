<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <div id="magneticContainer" style="width: 100%;height: 100%;">
                    <canvas id="magneticCanvas"  width="100%" height="100%" ></canvas>
                    <div class="widgetTitle">带电粒子矩形边界中的运动</div>
                    <div class="background-div" >
                        <div class="title">v</div>
                        <div class="tip">拖动调整粒子移动速度</div>
                        <img v-if="showImg" class="playImg" src="./sub_static/play@2x.png" @click="playTracker1"/>
                    </div>
                    <div v-bind:class="{'event_disabled': disableSlider}" class="slider">

                        <vue-slider v-model="speedModel" v-bind="sliderOption" ></vue-slider>
                    </div>
                </div>
            </template>
           <!--<template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">

                </div>
            </template>-->
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
      fullScreensLayout, vueSlider
    },
    mixins: [ViewModel]
  })
  export default class App extends Vue {}

</script>

<style scoped="scoped">
.background-div {
    width: 660px;
    height: 400px;
    position: absolute;
    left:  calc(50% - 330px);
    top:  calc(50% - 200px);
}
.slider {
    position: absolute;
    top: calc(50% + 157px);
    left:  calc(50% - 115px);
    width: 200px;
}
.title {
    color: #333333;
    font-size: 30px;
    font-family: "Times New Roman";
    font-style: italic;
    position: absolute;
    bottom: 21px;
    left:  165px;
}
.tip {
    font-size: 13px;
    color: #999999;
    position: absolute;
    bottom: 28px;
    left: 490px;
}
.playImg {
    width: 54px;
    height: 54px;
    position: absolute;
    left: 303px;
    top: 172px;
}
.playImg:hover {
    cursor: pointer;
}
.widgetTitle {
    font-size: 24px;
    color: #333333;
    line-height: 24px;
    position: absolute;
    left: 24px;
    top:24px;
}
</style>
