<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <span class="title_induction">热力环流原理</span>
        <div id="box" style="width: 100%; height: 100%"></div>

        <div  id="controlPanel" >
          <div style="position: absolute; bottom: 24px; width: 136px; right: 24px" @click="cloudTopAnimation" v-show="showCloudTopAnimation">
              <h_button title="地面受热不均" style="width: 100%;" ></h_button>
          </div>

          <div style="position: absolute; bottom: 24px; width: 136px; right: 24px" @click="mappingAnimation" v-show="showMappingAnimation">
              <h_button title="作图" style="width: 96px; margin-left: 40px"></h_button>
          </div>
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
        z-index: 98;
    }

    #reset {
        z-index: 99;
    }
</style>
