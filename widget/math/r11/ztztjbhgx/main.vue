<template>
    <div class="aspectration bg_white root_div_container">

        <div class="control-panel_div_rt">

                <div class="button_border " style="display:inline-block;width:48px;height:40px;position: absolute;top:20px;right:24px;float: right;" id="reset" @click="resetEvent">
                    <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="./../../../../static/images/chongzhi.png" alt=""   v-bind:class="{'event_disabled':disabledReset}">
                </div>
                    <div class="control-block_div_border edge_height_slider background_scale" style="">
                        <div class="edge_text" style="position: absolute; left: 104px; top: 12px">模型</div>
                        <vue-slider ref="slider1th" v-model="arris" v-bind="sliderOption1" style="position: absolute;margin: 0 auto;top:65px;">
                            <template slot="tooltip" scope="tooltip">
                                <div v-if="tooltip.value == 1" class="custom-tooltip">
                                    <span class="vue-slider-tooltip background_style">
                                        锥体
                                    </span>
                                </div>
                                <div v-if="tooltip.value <200 && tooltip.value >1" class="custom-tooltip">
                                   <span class="vue-slider-tooltip background_style">
                                        台体
                                   </span>
                                </div>
                                <div v-if="tooltip.value == 200" class="custom-tooltip">
                                     <span class="vue-slider-tooltip background_style">
                                        柱体
                                     </span>
                                </div>
                            </template>
                        </vue-slider>


                    </div>
            <div class="control-block_div_border edge_height_slider background_scale1th" style="">
                <div class="height_text" style="position: absolute; left: 107px; top: 12px">边数</div>
                <vue-slider ref="slider2th" v-model="volume" v-bind="sliderp" style="position: absolute;margin: 0 auto;top:65px">
                </vue-slider>
            </div>

        </div>
        <span class="title_text">锥体、台体、柱体的体积变化关系</span>
        <div>
            <img src="./sub_static/zi.png" alt="" class="text_hanzi">
        </div>
        <div style="">
            <img src="./sub_static/zhu.png" v-show="zhu" class="text_zhu">
            <img src="./sub_static/zhub.png" v-show="zhub" class="text_zhu">
        </div>
        <div style="">
            <img src="./sub_static/zhui.png" v-show="zhui" class="text_zhui">
            <img src="./sub_static/zhuib.png" v-show="zhuib" class="text_zhui">
        </div>
        <div style="">
            <img src="./sub_static/tai.png" v-show="tai" class="text_tai">
            <img src="./sub_static/taib.png" v-show="taib" class="text_tai">
        </div>
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
import {CentrumViewHandler} from "./services/CentrumViewHandler";
import vueSlider from "../../../../src/component/ui/vue2-slider.vue";
//Returned expression type   is not assignable to type Data
export default Vue.extend({
    components: {
        vueSlider,
        h_button,
    },
    data(){
      return{
          zhu:true,
          zhub:false,
          zhui:true,
          zhuib:false,
          tai:false,
          taib:true,
          disabledButton:false,
          disabledReset:false,
          arris:100,
          volume:5,
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
              data:[
                  3,4,5,6,7,10,'+∞'
              ],
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
        resetEvent(){
            (ViewController.getInstance().viewHandler as CentrumViewHandler).reset();
            this.disabledButton = false;
        },
    },
    watch:{
        arris:function(num:number){
            if(num === 1){
             setTimeout(()=>{
                 this.zhui  = false;
                 this.zhuib = true;
                 this.zhu   = true;
                 this.zhub  = false;
                 this.tai   = true;
                 this.taib  = false;
             },0)
            }
            if(num === 200){
                setTimeout(()=>{
                    this.zhui  = true;
                    this.zhuib = false;
                    this.zhu   = false;
                    this.zhub  = true;
                    this.tai   = true;
                    this.taib  = false;
                },0)
            }
            if(num>1 && num<200){
                setTimeout(()=>{
                    this.zhui  = true;
                    this.zhuib = false;
                    this.zhu   = true;
                    this.zhub  = false;
                    this.tai   = false;
                    this.taib  = true;
                },0)
            }
            ( ViewController.getInstance().viewHandler as any).mountaion.edge(num);
        },
        volume:function(sliderNum2th:any){
            ( ViewController.getInstance().viewHandler as any).mountaion.edgeEvent(sliderNum2th);
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
    height:108px;
    position: absolute;
    top: 174px;
    right:20px;
    padding:0;
    margin:0;
}
.background_scale1th{
    width:240px;
    height:108px;
    position: absolute;
    top: 294px;
    padding:0;
    margin:0;
}
.text_hanzi{
    width: 120px;

    margin:0;
    padding:0;
    position: absolute;
    left: 24px;
    top: 68px;
}
.text_zhu{
    width: 75px;
    height: 29px;
    margin:0;
    padding:0;
    position: absolute;
    left: 24px;
    top:240px;

}
.text_zhui{
    width: 98px;
    height: 47px;
    margin:0;
    padding:0;
    position: absolute;
    left: 24px;
    top: 115px;
}
.text_tai{
    width: 290px;
    height: 50px;
    margin:0;
    padding:0;
    position: absolute;
    left: 24px;
    top: 174px;
}
.text_lable{
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #999999;
    line-height: 14px;
    margin: 0;
    padding: 0;
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
