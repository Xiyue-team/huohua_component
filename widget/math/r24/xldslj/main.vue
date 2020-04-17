<template>
  <div class="aspectration bg_white covered root_div_container ">
      <fullScreensLayout>
              <template slot="viewBox" slot-scope="viewBox">
                  <div class="title_text">向量的数量积</div>
                  <div class="calcImageBox" v-bind:class="{'calcImageBoxMobile': isMobile, 'calcImageBoxIpad': isIpad}" v-show="calculationFormulaActived">
                      <img src="./sub_static/gongshib.png" v-show="!axisActived" style="width: 100%;height: 100%;">
                      <img src="./sub_static/gongshi.png" v-show="axisActived" style="width: 100%;height: 100%;">
                  </div>
                  <div class="definitionImage" v-show="definitionActived" v-bind:class="{'definitionImageMobile': isMobile}">
                      <img src="./sub_static/dingyi.png" style="width: 100%;height: 100%;">
                  </div>
                  <div id="3dContainer"></div>
                  <div class="buttonBox" v-bind:class="{'buttonBoxMobile': isMobile}">
                      <buttonPrimary style="height: 52px;" v-bind:title="definition" type="ellipse" v-bind:actived="definitionActived" @click.native="definitionEvent()"></buttonPrimary>
                      <buttonPrimary class='buttonStyle' v-bind:title="axis" type="ellipse" v-bind:actived="axisActived" @click.native="axisEvent()"></buttonPrimary>
                      <buttonPrimary class='buttonStyle' v-bind:title="calculationFormula" type="ellipse" v-bind:actived="calculationFormulaActived" @click.native="calculationFormulaEvent()"></buttonPrimary>
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
    fullScreensLayout, buttonPrimary
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
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
    .calcImageBox {
        position: absolute;
        top: 92px;
        left: 24px;
        width: 236px;
        height: 124px;
    }

    .calcImageBoxMobile {
        width: 118px;
        height: 62px;
    }

    .calcImageBoxIpad {
        width: 165px;
        height: 89px;
    }

    .definitionImage {
        width: 242px;
        height: 194px;
        position: absolute;
        top: calc(37.8% - 152px);
        right: 115px;
    }

    .definitionImageMobile {
        width: 121px;
        height: 97px;
        top: calc(20% - 55px);
        right: 92px;
    }
    .buttonBox {
        position: absolute;
        top: 37.8%;
        right: 32px;
        height: 186px;
        width: 135px;
        display: flex;
        flex-direction:  column;
        align-items: flex-end;
    }
    .buttonBoxMobile {
        top: 20%;
        right: 20px;
    }

    .buttonStyle {
        margin-top: 30px;
        width: 130px;
        height: 52px;
    }
</style>
<style>

</style>
