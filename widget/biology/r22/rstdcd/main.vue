<template>
  <div class="aspectration bg_white covered root_div_container ">
    <fullScreens_layout v-bind="exerciseOption">
      <template slot="viewBox" slot-scope="viewBox">
        <span class="title_induction">染色体的传递</span>
        <div id="box" style="width: 100%; height: 100%"></div>
        <div @click="tipButtonEvent()">
          <buttonPrimary
                  class="relationButton"
                  v-bind:title="tipTitle"
                  type="ellipse"
                  v-bind:actived="isActived"
                  v-show="isShow">
          </buttonPrimary>
        </div>
      </template>

      <template slot="controlPanel" slot-scope="controlPanel">
        <div  id="controlPanel" >
          <div class="button_border " style="display:inline-block;width:48px;height:40px;position: absolute;top:20px;right:24px;" id="reset" @click="resetEvent">
            <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="../../../../static/images/chongzhi.png" alt="">
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
import buttonPrimary from '../../../../src/component/ui/buttonPrimary.vue';
import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
import {ViewOption} from '../../../../src/core/CoreInterface';
//const vConsole = require('vconsole');

export default Vue.extend({

    data() {
        return{
            tipTitle: '标注',
            isShow: false,
            isClick: false,
            isActived: false,
            exerciseOption:{
                exercise:{}
            },
        };
    },
    components: {
        fullScreens_layout,
        buttonPrimary
    },

    created() {
        //        new vConsole();
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = false;
        viewOption.adapterMobilePanel = false;
        ViewController.getInstance(new BjsViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },

    mounted() {
        ViewController.getInstance().domReady();
    },

    watch: {

    },

    methods: {
        resetEvent: function() {
            this.isClick = this.isActived = this.isShow = false;
            (ViewController.getInstance().viewHandler as any).bjsCanvas.reset();
       },

      tipButtonEvent: function(){
        this.isClick = !this.isClick;
        console.log(this.isClick);
        this.isActived = this.isClick;
        (ViewController.getInstance().viewHandler as any).clickDisable(this.isClick);
      }
    }
});
</script>

<style scoped='scoped'>
  .title_induction{
    width: 520px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #ffffff;
    line-height: 24px;
    position: absolute;
    left: 24px;
    top: 24px;
    z-index: 99;
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

  .relationButton{
    position: absolute;
    bottom: 32px;
    right: 32px;
    margin: auto;
    width: 80px;
    height: 42px;
  }
</style>
