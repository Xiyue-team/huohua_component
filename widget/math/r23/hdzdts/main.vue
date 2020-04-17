<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">弧度制的探索</div>
                  <div id="3dContainer" style="width: 100%; height: 100%">

                  </div>
                  <div class="formulaClass" v-show="showFormula">
                      <img src="./sub_static/formula.png" style="width: 100%; height: 100%"/>
                  </div>

                  <div class="allButtons" v-bind:class="{'buttonsForMobile': isMobile}">
                      <div class="topButtons">
                          <div @click="addCircleEvent()">
                              <buttonPrimary class="addCircleButton" v-bind:title="addTitle" type="ellipse" v-bind:class="{ event_disabled: addFlag }">
                              </buttonPrimary>
                          </div>

                          <div @click="cutCircleEvent()">
                              <buttonPrimary class="cutCircleButton" v-bind:title="cutTitle" type="ellipse" v-bind:class="{ event_disabled: cutFlag }">
                              </buttonPrimary>
                          </div>
                      </div>

                      <div class="centerButtons">
                          <div @click="meaningfulEvent()">
                              <buttonPrimary class="meaningfulButton" v-bind:title="meaningfulTitle" type="ellipse" v-bind:actived="meaningColor">
                              </buttonPrimary>
                          </div>

                          <div @click="formulaEvent()">
                              <buttonPrimary class="formulaButton" v-bind:title="formulaTitle" type="ellipse" v-bind:actived="formulaColor">
                              </buttonPrimary>
                          </div>
                      </div>

                      <div class="bottomButtons_top">
                          <div @click="oneRadianEvent()">
                              <buttonPrimary class="oneRadianButton" v-bind:title="oneRadianTitle" type="ellipse" v-bind:actived="oneRadianColor">
                              </buttonPrimary>
                          </div>

                          <div @click="twoRadianEvent()">
                              <buttonPrimary class="twoRadianButton" v-bind:title="twoRadianTitle" type="ellipse" v-bind:actived="twoRadianColor">
                              </buttonPrimary>
                          </div>

                      </div>

                      <div class="bottomButtons_bottom">
                          <div @click="threeRadianEvent()">
                              <buttonPrimary class="threeRadianButton" v-bind:title="threeRadianTitle" type="ellipse" v-bind:actived="threeRadianColor">
                              </buttonPrimary>
                          </div>

                          <div @click="fourRadianEvent()">
                              <buttonPrimary class="fourRadianButton" v-bind:title="fourRadianTitle" type="ellipse" v-bind:actived="fourRadianColor">
                              </buttonPrimary>
                          </div>
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
    .title_text{
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

    .allButtons {
        position: absolute;
        top: 28.6%;
        right: 24px;
        width: 168px;
        height: 290px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .topButtons {
        display: flex;
        justify-content: space-between;
    }

    .centerButtons {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 20px;
        height: 104px;
        width: 140px;
    }

    .bottomButtons_top {
        display: flex;
        justify-content: space-between;
    }

    .bottomButtons_bottom {
        display: flex;
        justify-content: space-between;
    }

    .addCircleButton, .cutCircleButton {
        width: 84px;
        height: 42px;
        margin-left: 20px;
    }

    .meaningfulButton, .formulaButton {
        width: 140px;
        height: 42px;
    }

    .oneRadianButton, .twoRadianButton, .threeRadianButton, .fourRadianButton {
        width: 84px;
        height: 42px;
        margin-left: 20px;
        margin-top: 20px;
    }

    .buttonsForMobile {
        transform: scale(0.7);
        right: 9px;
        top: 20%;
    }

    .formulaClass {
        position: absolute;
        left: 2.7%;
        top: 13.6%;
        width: 20.2%;
        height: 10.1%
    }

</style>

