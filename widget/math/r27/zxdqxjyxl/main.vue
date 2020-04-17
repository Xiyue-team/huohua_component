<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">
                      {{title}}
                  </div>
                  <div id="3dContainer" style="width: 100%; height: 100%">
                  </div>
                  <div class="three_buttons" v-bind:class="{'set_scale': isMobile, 'set_scale_iPad': isIpad}">
                      <buttonPrimary class="titlAngleStyle" v-bind:title="titlAngleTitle" type="ellipse" v-bind:actived="titlAngleColor" @click.native="
titlAngleEvent()"></buttonPrimary>
                      <buttonPrimary class="slopeStyle" v-bind:title="slopeTitle" type="ellipse" v-bind:actived="slopeColor" @click.native="
slopeEvent()"></buttonPrimary>
                      <buttonPrimary class="relationShipStyle" v-bind:title="relationShipTitle" type="ellipse" v-bind:actived="relationShipColor" @click.native="
relationShipEvent()"></buttonPrimary>
                      <div class="formulaImg" v-show="showFormula">
                          <img src="./sub_static/formula.png" style="width: 100%; height: 100%" ondragstart="return false"/>
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
import Component from 'vue-class-component';
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';

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
    .title_text {
        font-size: 24px;
        color: #FFFFFF;
        transparent: true;
        line-height: 24px;
        margin: 0;
        padding:0;
        position: absolute;
        top:24px;
        left:24px;
    }

    .three_buttons {
        position: absolute;
        width: 191px;
        right: 32px;
        bottom: 50%;
    }

    .titlAngleStyle, .slopeStyle, .relationShipStyle {
        width: 191px;
        height: 42px;
    }

    .slopeStyle, .relationShipStyle {
        margin-top: 20px;
    }

    .formulaImg {
        position: absolute;
        margin-top: 20px;
        width: 85px;
        height: 18px;
    }

    .set_scale {
        transform: scale(0.5);
        bottom: 30%;
        right: -24px;
    }

    .set_scale_iPad {
        transform: scale(0.7);
        bottom: 45%;
        right: 0px;
    }
</style>

