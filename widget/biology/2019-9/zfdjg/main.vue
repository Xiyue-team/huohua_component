<template>
  <div class="aspectration bg_white covered root_div_container " style="background: #53585F">
      <fullScreensLayout >
              <template slot="viewBox" slot-scope="viewBox" >
                  <div class="title_text">{{title}}</div>
                  <div style="width: 100%; height: 100%;position: absolute">
                      <img src="./sub_static/background.png" style="width: 100%; height: 100%">
                  </div>
                  <div id="3dContainer">
                        <canvas id="canvas" width="100%" height="100%"></canvas>
                  </div>

                  <div class="rightButtonControl">
                      <div @click="buttonEvent(0)">
                          <buttonPrimary class="buttonStyle" v-bind:title="buttonText[0]"
                                         type="ellipse" v-bind:actived="activeIndex === 0"
                                         style="border: 1px solid #EBEBEB"
                          ></buttonPrimary>
                      </div>
                      <div @click="buttonEvent(1)">
                          <buttonPrimary class="buttonStyle" v-bind:title="buttonText[1]"
                                         type="ellipse" v-bind:actived="activeIndex === 1"
                                         style="border: 1px solid #EBEBEB"
                          ></buttonPrimary>
                      </div>
                      <div @click="buttonEvent(2)">
                          <buttonPrimary class="buttonStyle" v-bind:title="buttonText[2]"
                                         type="ellipse" v-bind:actived="activeIndex === 2"
                                         style="border: 1px solid #EBEBEB"
                          ></buttonPrimary>
                      </div>
                      <div @click="buttonEvent(3)">
                          <buttonPrimary class="buttonStyle" v-bind:title="buttonText[3]"
                                         type="ellipse" v-bind:actived="activeIndex === 3"
                                         style="border: 1px solid #EBEBEB"
                          ></buttonPrimary>
                      </div>
                      <div @click="buttonEvent(4)">
                          <buttonPrimary class="buttonStyle" v-bind:title="buttonText[4]"
                                         type="ellipse" v-bind:actived="activeIndex === 4"
                                         style="border: 1px solid #EBEBEB"
                          ></buttonPrimary>
                      </div>
                      <div @click="buttonEvent(5)">
                          <buttonPrimary class="buttonStyle" v-bind:title="buttonText[5]"
                                         type="ellipse" v-bind:actived="activeIndex === 5"
                                         style="border: 1px solid #EBEBEB"
                          ></buttonPrimary>
                      </div>
                  </div>


              </template>

              <template slot="controlPanel" slot-scope="controlPanel">

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
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
import Component from 'vue-class-component';

@Component({
  components: {
    fullScreensLayout,
    buttonPrimary
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
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
        z-index: 99;
    }
    .rightButtonControl{
        position: absolute;
        right: 24px;
        top: calc(50% - 138px);
        z-index: 99;
    }
    .buttonStyle{
        width: 100%;
        margin: 6px 0;
        cursor: pointer;
    }
    @media screen and (max-width: 610px), screen and (max-height: 610px) {
        .title_text {
            top: 12px;
            left: 12px;
            line-height: 18px;
            font-size: 18px;
        }
        .rightButtonControl{
            transform: scale(.7);
            right: 18px;
        }
    }
</style>
<style>
.canvas-container {
    margin: 0 auto;
}
@media screen and (max-width: 610px), screen and (max-height: 610px) {
    .control_div_resetBtn {
        right: 12px;
        top: 0;
        transform: scale(0.7);
    }
}
</style>
