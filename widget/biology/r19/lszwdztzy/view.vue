<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <span class="title_induction">绿色植物的蒸腾作用</span>
        <div id="box" style="width: 100%; height: 100%"></div>

        <div id="buttonLeft" style="width: 106px; height: 38px; position: absolute; z-index: 100" v-show="showButtonLeft" @click="buttonLeftEvent">
          <h_button class="h_button2" style="position: absolute; top: 0; left: 0; right: 0; margin: auto"  title="查看现象"
                    v-bind:clickNumber.sync="clickNumber1"></h_button>
        </div>
        <div id="buttonRight" style="width: 106px; height: 38px; position: absolute; z-index: 100" v-show="showButtonRight" @click="buttonRightEvent">
          <h_button class="h_button2" style="position: absolute; top: 0; left: 0; right: 0; margin: auto"  title="查看现象"
                    v-bind:clickNumber.sync="clickNumber2"></h_button>
        </div>
      </template>

      <template slot="controlPanel" slot-scope="controlPanel">

      </template>
    </fullScreens_layout>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import fullScreens_layout from '../../../../src/component/layout/fullScreens_layout.vue';
import { ViewModel } from './ViewModel';
import Component from 'vue-class-component';
import h_button from '../../../../src/component/ui/buttonEllipse.vue';

@Component({
  components: {
    fullScreens_layout,
    h_button
  },
  mixins: [ViewModel]
})
export default class App extends Vue {}
</script>

<style scoped='scoped'>
  .title_induction{
    width: 520px;
    height:100px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #000000;
    line-height: 24px;
    position: absolute;
    left: 24px;
    top: 24px;
    z-index: 99;
  }
</style>
<style>

    .konvajs-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .control-panel_div_floatRight {
      z-index: -1;
    }

    #box {
        position: absolute;
        z-index: 98;
    }

    #reset {
        z-index: 99;
    }
</style>
