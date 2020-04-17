<!--<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">-->
<template>
  <div class="aspectration bg_white covered root_div_container">

    <div class="control-panel_div_content" style="background-color: white;color: #FFFFFF;">

      <h2 class="title_induction">诱导公式</h2>
      <div class="view_div_content" style="background-color: white;" data-ratio="1:1" >
        <div  id="box" style="width: 100%;height: 100%;"></div>
      </div>

    </div>
    <div class="control-panel_div_rt">
      <div class="button_border " style="display:inline-block;width:48px;height:40px;float: right;" id="reset" @click="resetEvent">
        <img style="width: 24px;height: 24px;  margin-top: 8px;margin-left: 12px" src="../../../../static/images/chongzhi.png" alt="">
      </div>
      <div style="float: left;position: absolute;bottom: 130px;right: 135px;z-index: 2">k</div>
      <div class="control-block_div_border" style="">
        <vue-slider ref="sliderC" v-model="sliderNum" v-bind="sliderOption">
          <template slot="label"  slot-scope ="{ label, active,index }">
            <span :class="['custom-label', { active }]"  v-if="label == -8"> {{ label }}</span>
            <span :class="['custom-label', { active }]"  v-if="label == 8"> {{ label }} </span>
          </template>
        </vue-slider>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import "../../../../src/assets/css/core.css"
import "../../../../src/assets/css/layout.css"
import {ViewController} from "../../../../src/core/ViewController";
import {InductionHandler} from "./services/InductionHandler";
import {SliderConfig} from "../../../../src/config/SliderConfig";
let vueSlider = require('vue-slider-component');
//let VConsole = require("vconsole");
export default Vue.extend({

    data(){
        return{
            sliderNum:1,
            sliderOption:{
                width:"100%",
                min:-8,
                max:8,
                show:true,
                tooltip: "always",
                piecewise: false,
                interval: 1,
                disabled:false,
                piecewiseLabel: true,
                dotSize: 20,
                piecewiseStyle: {
                    "backgroundColor": "#ccc",
                    "visibility": "visible",
                    "width": "12px",
                    "height": "12px"
                },
                piecewiseActiveStyle: {
                    "backgroundColor": "#FFFFFF",
                    "color": "#000000"
                }
            },
            tooltipStyle:{
                "backgroundColor": "#666",
                "borderColor": "#666"
            },

        }
    },

    components: {
        vueSlider
    },

    created(){
      // new VConsole();
        ViewController.getInstance(new InductionHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },

    mounted(){
        ViewController.getInstance().domReady();

    },

    watch:{

          sliderNum:function (sliderNum:number) {

              (ViewController.getInstance().viewHandler as InductionHandler).createSlidingEvent(sliderNum);

              console.log('123');
          }
    },

    methods: {
        resetEvent(){
            (ViewController.getInstance().viewHandler as InductionHandler).reset();
        }

    }
})
</script>

<style scoped="scoped">
  .control-block_div_border{
    position: absolute;
    padding-top: 100px;
    width: 200px;
    bottom: 24px;
    right: 20px;
  }
  .title_induction{
    width: 400px;
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
    width: 470px;
    height: 470px;
  }
</style>
