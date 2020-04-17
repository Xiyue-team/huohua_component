<template>
    <div class="aspectration bg_white root_div_container">

        <div class="control-panel_div_rt">

                    <div class="control-block_div_border edge_height_slider background_scale" style="position: absolute;margin-top: -20px">

                        <div class="edge_text" style="position: absolute; left: 104px; top: 12px">模型</div>
                        <vue-slider ref="slider1th" v-model="arris" v-bind="sliderOption1" style="position: absolute;margin: 0 auto;top:65px;">
                            <template slot="tooltip" scope="tooltip">
                                <div v-if="tooltip.value == 1" class="custom-tooltip">
                                    <span class="vue-slider-tooltip background_style">
                                        圆锥
                                    </span>
                                </div>
                                <div v-if="tooltip.value <200 && tooltip.value >1" class="custom-tooltip">
                                   <span class="vue-slider-tooltip background_style">
                                        圆台
                                   </span>
                                </div>
                                <div v-if="tooltip.value == 200" class="custom-tooltip">
                                     <span class="vue-slider-tooltip background_style">
                                        圆柱
                                     </span>
                                </div>
                            </template>
                        </vue-slider>

                        <div class="height_text" style="position: absolute; left: 91px; top: 92px">底面积S</div>
                        <vue-slider ref="slider2th" v-model="volume" v-bind="sliderp" style="position: absolute;margin: 0 auto;top:145px;">

                        </vue-slider>

                        <div class="height_text" style="position: absolute; left: 107px; top: 172px">高h</div>
                        <vue-slider ref="slider3th" v-model="mheight" v-bind="sliderheight" style="position: absolute;margin: 0 auto;top:225px;">
                        </vue-slider>
                    </div>

        </div>
        <span class="title_text">圆锥、圆台、圆柱的变化关系</span>
        <div id="3dContainer" class="control-panel_div_content">

        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import "../../../../src/assets/css/core.css"
import "../../../../src/assets/css/layout.css"
import {ViewController} from "../../../../src/core/ViewController";
import h_button from '../../../../src/component/ui/button.vue';
import {CentrumViewHandler} from "./service/CentrumViewHandler";
import vueSlider from "../../../../src/component/ui/vue2-slider.vue";
export default Vue.extend({
    components: {
        vueSlider,
        h_button,
    },
    data(){
      return{
          disabledButton:false,
          disabledReset:false,
          arris:100,
          volume:100,
          mheight:100,
          angle:90,
          sliderOption1:{
              width:"240px",
              min:1,
              max:200,
              piecewise: false,
              piecewiseLabel: false,
              piecewiseStyle: {
                  "backgroundColor": "#ccc",
                  "visibility": "visible",
                  "width": "12px",
                  "height": "12px"
              },
              piecewiseActiveStyle: {
                  "backgroundColor": "#3498db"
              }
          },
          sliderp:{
              width:"240px",
              min:1,
              max:200,
              piecewise: false,
              piecewiseLabel: false,
              piecewiseStyle: {
                  "backgroundColor": "#ccc",
                  "visibility": "visible",
                  "width": "12px",
                  "height": "12px"
              },
              piecewiseActiveStyle: {
                  "backgroundColor": "#3498db"
              }
          },
          sliderheight:{
              width:"240px",
              min:1,
              max:200,
              piecewise: false,
              piecewiseLabel: false,
              piecewiseStyle: {
                  "backgroundColor": "#ccc",
                  "visibility": "visible",
                  "width": "12px",
                  "height": "12px"
              },
              piecewiseActiveStyle: {
                  "backgroundColor": "#3498db"
              }
          },
      }
    },
    created(){
        ViewController.getInstance(new CentrumViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted(){
        ViewController.getInstance().domReady();
    },
    methods: {
    },
    watch:{
        arris:function(num:number){
            ( ViewController.getInstance().viewHandler as any).mountaion.edge(num);
        },
        volume:function(sliderNum2th:number){
            ( ViewController.getInstance().viewHandler as any).mountaion.areaEvent(sliderNum2th);
        },
        mheight:function(sliderNum3th:number){
            ( ViewController.getInstance().viewHandler as any).mountaion.heightEvent(sliderNum3th);
        },
    }
})
</script>

<style scoped="scoped">
body{
    overflow:hidden !important;
    overflow-x: hidden;
    overflow-y: hidden;

}
.background_scale{
    width:240px;
    height:264px;
    position: absolute;
    top:28.1%;
    right:20px;
    padding:0;
    margin:0;
}
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

</style>
