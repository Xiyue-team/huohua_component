<template>
  <div class="aspectration bg_white covered root_div_container">
    <fullScreens_layout>
      <template slot="viewBox" slot-scope="viewBox">
        <span class="title_induction">点动成线</span>
        <div id="box" style="width: 100%; height: 100%;"></div>
      </template>

      <template slot="controlPanel" slot-scope="controlPanel">
        <div  id="controlPanel" >

        </div>
      </template>
    </fullScreens_layout>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import {DdcxViewHandler} from './services/DdcxViewHandler';
import {ViewController} from '../../../../src/core/ViewController';
import fullScreens_layout from '../../../../src/component/layout/fullScreens_layout.vue';
import {ViewOption} from '../../../../src/core/CoreInterface';

export default Vue.extend({

    data() {
        return{
            showGuideLine: true
        };
    },
    components: {
        fullScreens_layout
    },

    created() {
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new DdcxViewHandler(this), viewOption);
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
</style>
