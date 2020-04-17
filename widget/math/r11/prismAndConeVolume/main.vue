<template>
    <leftAndRightLayout>
        <template slot="viewBox" slot-scope="viewBox">
            <span class="title_text">棱台及圆台的体积</span>
            <div class ="title_img">
                <img src="./sub_static/prismAndCone.png" alt="" class="imgStyle" v-bind:class="{'imgMobileStyle': isMobile}" onclick=" return false">
            </div>
            <div id="3dContainer"></div>
        </template>
        <template slot="controlPanel" slot-scope="controlPanel">
            <div id="controlPanel" style="width: 100%;height: 100%;">
                <div class="control-block_div_border edge_height_slider background_scale"   v-bind:class="{'set_scale': isMobile}">
                    <div class="edge_text" style="position: absolute; left: 104px; top: 12px">棱数</div>
                    <vue-slider ref="slider1th" v-model="arris" v-bind="sliderOption" style="position: absolute;margin: 0 auto;top:65px;">

                    </vue-slider>

                    <div class="height_text" style="position: absolute; left: 91px; top: 92px">底面积S</div>
                    <vue-slider ref="slider2th" v-model="volume" v-bind="sliderp" style="position: absolute;margin: 0 auto;top:145px;">

                    </vue-slider>

                    <div class="height_text"style="position: absolute; left: 107px; top: 172px">高h</div>
                    <vue-slider ref="slider3th" v-model="mheight" v-bind="sliderheight" style="position: absolute;margin: 0 auto;top:225px;">
                    </vue-slider>
                </div>
                <div class="buttomButtonStyle" v-bind:class="{'buttomButtonMobileStyle': isMobile}">
                    <input class="shownum" id="shownum" type="text" readonly="true" value="0" style="position: absolute;right: 0;: 0;top: 0;">
                    <div @click="button" v-bind:class="{'event_disabled':disabledButton}" style="position: absolute;left: 0;top: 0;">
                        <h_button  title="注满液体"  style="height: 44px;width: 110px;font-family: PingFangSC-Medium;" ></h_button>
                    </div>
                </div>
            </div>
        </template>
    </leftAndRightLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import "../../../../src/assets/css/core.css"
import "../../../../src/assets/css/layout.css"
import {ViewController} from "../../../../src/core/ViewController";
import h_button from '../../../../src/component/ui/button.vue';
import {CentrumViewHandler} from "./service/CentrumViewHandler";
import vueSlider from "../../../../src/component/ui/vue2-slider.vue";
import { BrowserUtil } from "../../../../src/util/BrowserUtil";
import leftAndRightLayout from '../../../../src/component/layout/leftAndRight_layout.vue';
//Returned expression type   is not assignable to type Data
export default Vue.extend({
    components: {
        vueSlider,
        h_button,
        leftAndRightLayout
    },
    data(){
      return{
          tooltipStyle:{
              "backgroundColor": "#666",
              "borderColor": "#666"
          },
          disabledButton:false,
          disabledReset:false,
          volume:[5,10],
          arris:4,
          mheight:6,
          angle:90,
          isMobile: false,
          sliderOption:{
              width:"240px",
              data:[
                  3,4,5,6,10,'+∞'
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
          sliderp:{
              width:"240px",
              min:1,
              max:20,
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
              max:10,
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
      if(BrowserUtil.getBrowserInfo().isSmallDevice){
        this.isMobile = true;
      }
        ViewController.getInstance().domReady();
    },
    methods: {
        button(){
            ( ViewController.getInstance().viewHandler as any).mountaion.liquid();
            this.disabledButton = true;
            this.disabledReset = true;
        }

    },
    watch:{
        arris:function(sliderNum1th:any){
            this.disabledButton = false;
            this.disabledReset  = false;
            ( ViewController.getInstance().viewHandler as any).mountaion.setControl(true);
            ( ViewController.getInstance().viewHandler as any).mountaion.resetNum();
            ( ViewController.getInstance().viewHandler as any).mountaion.edge(sliderNum1th);
            //( ViewController.getInstance().viewHandler as any).mountaion.setControl(false);
        },
        volume:function(sliderNum1th:any){
            this.disabledButton = false;
            this.disabledReset  = false;
            ( ViewController.getInstance().viewHandler as any).mountaion.setControl(true);
            ( ViewController.getInstance().viewHandler as any).mountaion.resetNum();
            ( ViewController.getInstance().viewHandler as any).mountaion.areaEvent(sliderNum1th);
        },
        mheight:function(sliderNum3th:number){
            this.disabledButton = false;
            this.disabledReset  = false;
            ( ViewController.getInstance().viewHandler as any).mountaion.setControl(true);
            ( ViewController.getInstance().viewHandler as any).mountaion.resetNum();
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
    bottom:88px;
    right:20px;
    padding:0;
    margin:0;
}

.buttomButtonStyle {
    position: absolute;
    right: 20px;
    width: 240px;
    height: 80px;
    bottom: 0;
}
.buttomButtonMobileStyle {
    top: 350px;
}
.shownum{
    border: 1px solid #636363;
    border-radius: 6px;
    font-size: 16px;
    color: #000000;
    line-height: 16px;
    text-align: center;
    margin: 0;
    padding: 0;
    width: 110px;
    height: 44px;
    position: absolute;
    bottom: -52px;
    right: 0px;
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
.title_img{
    margin: 0;
    padding: 0;
    width: 179px;
    height: 35px;
    position: absolute;
    top:72px;
    left: 24px;

}
.imgStyle {
    width: 365px;
}
.imgMobileStyle {
    width: 182px;
}
.set_scale {
    top: 73px;
}
</style>
