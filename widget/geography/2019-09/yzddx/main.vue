<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
          <template slot="viewBox" slot-scope="viewBox">
              <div class="title_text">{{lang.title}}</div>
              <div id="cardImage" class="rightContent">
                  <canvas id="cardImageCanvas" ></canvas>
                  <div class="control" v-show="isShow3dContainer">
                    <div style="width: 100%; height: 100%; position: absolute">

                    </div>
                    <div style="width: 100%; height: 100%; position: absolute" >
                        <div class="singleControl" style="left: 0;" @click="clickReverse">
                            返回
                        </div>
                        <div class="singleControl" style="left: 0; right: 0; margin: auto">
                            上一页
                        </div>
                        <div class="singleControl" style="right: 0;">
                            下一页
                        </div>
                    </div>
                  </div>
              </div>
              <div id="3dContainer" class="leftContent" v-show="isShow3dContainer"></div>
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
    .title_text{
        font-size: 24px;
        color: #ffffff;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
    }

    .leftContent {
        width: calc(100% - 420px);
        height: 100%;
        position: absolute;
        left: 0;
        background-color: #fa824c;
    }

    .rightContent {
        /*width: 420px;*/
        width: 100%;
        height: 100%;
        position: absolute;
        right: 0;
        background-color: #0d542a;
        /*z-index: -1;*/
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
        text-align: center;
        line-height: 72px;
        /*background-color: #5caefd;*/
        /*border: 1px white solid;*/
    }

</style>
<style>
    .control-panel_div_floatRight{
        z-index: -1;
    }
</style>
