<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">
                      {{title}}
                  </div>
                  <div id="3dContainer" style="width: 100%; height: 100%">
                  </div>
                  <div class="right_buttons" v-bind:class="{'set_scale': isMobile}">
                      <div class="converseStyle" @click="converseEvent()">
                          <buttonPrimary v-bind:title="converseTitle" type="ellipse"></buttonPrimary>
                      </div>
                      <div class="relationShipStyle" @click="relationShipEvent()">
                          <buttonPrimary v-bind:title="relationShipTitle" type="ellipse" v-bind:actived="relationShipColor" ></buttonPrimary>
                      </div>
                      <div class="formula_class" v-show="showFormula">
                          <img src="./sub_static/formula.png" style="width: 100%; height: 100%"/>
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

    .right_buttons {
        position: absolute;
        right: 2%;
        top: 55%;
        width: 178px;
        height: 300px;
    }

    .converseStyle {
        position: relative;
    }

    .relationShipStyle {
        position: relative;
        margin-top: 20px;
    }

    .formula_class {
        margin-top: 20px;
        width: 179px;
        height: 148px;
    }

    .set_scale {
        transform: scale(0.6);
        right: -24px;
        top: 20%;
    }
</style>

