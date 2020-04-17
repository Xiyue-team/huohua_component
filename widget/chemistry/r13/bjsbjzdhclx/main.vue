<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout v-bind="exerciseOption">
      <template slot="viewBox" slot-scope="viewBox">
        <span class="title_induction">“逆合成分析法”探究苯甲酸苯甲酯的合成路线</span>
        <div id="box" style="width: 100%; height: 100%"></div>
      </template>

      <template slot="controlPanel" slot-scope="controlPanel">
        <div  id="controlPanel" >
          <div class="button_border " style="display:inline-block;width:48px;height:40px;position: absolute;top:20px;right:24px;" id="reset" @click="resetEvent">
            <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="./../../../../static/images/chongzhi.png" alt="">
          </div>
        </div>
      </template>
    </fullScreens_layout>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import {BjsViewHandler} from './services/BjsViewHandler';
import {ViewController} from '../../../../src/core/ViewController';
import fullScreens_layout from '../../../../src/component/layout/fullScreens_layout.vue';
//const vConsole = require('vconsole');

export default Vue.extend({

    data() {
        return{
            exerciseOption: {
                exercise: {}
            },
        };
    },
    components: {
        fullScreens_layout
    },

    created() {
//        new vConsole();

        ViewController.getInstance(new BjsViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },

    mounted() {
        ViewController.getInstance().domReady();
    },

    watch: {

    },

    methods: {
        resetEvent: function() {
            (ViewController.getInstance().viewHandler as any).bjsCanvas.reset();
       }
    }
});
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
  }

  .view_div_content{
    /*width: 1024px;*/
    /*height: 576px;*/
    width: 100%;
    height: 100%;

  }

  .close_div_rt{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
</style>
