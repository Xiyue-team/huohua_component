<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">{{title}}</div>
                  <div id="3dContainer"></div>
                  <div class="maximumValue" @click="maximumValueEvent">
                      <h_button title="极值" style="width: 100%;" v-bind:isActive.sync="isActive" v-bind:clickNumber.sync="clickNumber"></h_button>
                  </div>
                  <div class="maxValue" @click="maxValueEvent">
                      <h_button title="最值" style="width: 100%;" v-bind:isActive.sync="isActive2" v-bind:clickNumber.sync="clickNumber2"></h_button>
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
import switch2 from '../../../../src/component/ui/switch2.vue';
import Component from 'vue-class-component';
import h_button from '../../../../src/component/ui/buttonEllipse.vue';

@Component({
  components: {
    fullScreensLayout, switch2, h_button
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

    .maximumValue {
        width: 72px;
        height: 45px;
        position: absolute;
        bottom: 20.7%;
        right: 1.5%;
        z-index: 99;
    }

    .maxValue {
        width: 72px;
        height: 45px;
        position: absolute;
        bottom: 8.6%;
        right: 1.5%;
        z-index: 99;
    }

    @media (min-width: 740px) and (max-width: 2000px) {
        .maximumValue {
            width: 72px;
            height: 45px;
            position: absolute;
            bottom: 20.7%;
            right: 1.5%;
        }

        .maxValue {
            width: 72px;
            height: 45px;
            position: absolute;
            bottom: 8.6%;
            right: 1.5%;
        }
    }


    @media (min-width: 0px) and (max-width: 740px) {
        .maximumValue {
            width: 72px;
            height: 45px;
            position: absolute;
            bottom: 20.7%;
            right: 1.5%;
        }

        .maxValue {
            width: 72px;
            height: 45px;
            position: absolute;
            bottom: 5.6%;
            right: 1.5%;
        }
    }
</style>
<style>
    .control-panel_div_floatRight{
        z-index: -1;
    }
</style>
