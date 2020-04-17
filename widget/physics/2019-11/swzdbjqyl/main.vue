<template>
  <div class="aspectration bg_white covered root_div_container " style="background: #53585F">
      <fullScreensLayout >
              <template slot="viewBox" slot-scope="viewBox" >
                  <div class="title_text">{{title}}</div>
                  <div id="3dContainer" style="position: absolute; width:100%; height:100%;background: #0A1E20">
                        <canvas id="canvas" width="1200" height="675"></canvas>
                  </div>
                  <div class="rightControl">
                      <div  @click="addEvent">
                          <buttonPrimary class="buttonStyle "
                                         v-bind:title="buttonTitle[0]"
                                         v-bind:actived="activeIndex === 1"
                                         v-bind:class="{'event_disabled': riseButtonDisable}"
                                         type="ellipse"
                          ></buttonPrimary>
                      </div>

                      <div @click="releaseEvent">
                          <buttonPrimary class="buttonStyle"
                                         v-bind:title="buttonTitle[1]"
                                         v-bind:actived="activeIndex === 2"
                                         v-bind:class="{'event_disabled': releaseButtonDisable}"
                                         type="ellipse"
                          ></buttonPrimary>
                      </div>
                      <div @click="pauseEvent">
                          <buttonPrimary class="buttonStyle"
                                         v-bind:title="buttonTitle[2]"
                                         v-bind:actived="activeIndex === 3"
                                         v-bind:class="{'event_disabled': pauseButtonDisable}"
                                         type="ellipse"
                          ></buttonPrimary>
                      </div>
                  </div>

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
    .rightControl{
        position: absolute;
        right: 24px;
        top: calc(50% - 90px);
    }
    .buttonStyle{
        display: list-item;
        margin: 12px 0;
        cursor: pointer;
    }
    @media screen and (max-width: 610px), screen and (max-height: 610px) {
        .title_text {
            top: 12px;
            left: 12px;
            line-height: 18px;
            font-size: 18px;
        }
        .rightControl{
            right: 12px;
            transform: scale(0.7);
        }
    }
</style>
<style>
.control-panel_div_floatRight{
     display: none;
 }
@media screen and (max-width: 610px), screen and (max-height: 610px) {
    .control_div_resetBtn {
        right: 12px;
        top: 0;
        transform: scale(0.7);
    }
}
</style>
