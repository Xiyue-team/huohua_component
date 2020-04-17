<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <div class="control-panel_div_rt">
            <div style="display: flex;height: 100%;" v-bind:class="{'set_scale': isMobile}">
               <div style="position: absolute;top: calc(30% + 20px);" >
                   <label for="checkbox-1" class="control-block_div_border switch enableAnim" id="s1" v-on:mouseover="shou" v-on:mouseout="shubiao" style="margin-top:10px;">
                       <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" value="1" v-model="enableAnim">
                       <label for="checkbox-1">线面平行性质定理</label>
                   </label>
               </div>

                <div class="xmdingli" v-show="gongshi">
                    一条直线与一个平面平行，则过这条直线的任一平面与此平面的交线与该直线平行。
                </div>

                <div class="control-block_div_border enableAngle" v-if="enableAngle" style="margin-top:10px;">
                    <div class="angle_text">转到平面<span class="text_style">β</span></div>
                    <vue-slider ref="slider4" v-model="sliderNum" v-bind="sliderOption"  style="margin:0 auto;position: relative;top:30px;">
                        <template slot="tooltip" scope="tooltip">
                            <div v-if="false" class="custom-tooltip">

                            </div>
                        </template>
                    </vue-slider>
                </div>
            </div>

        </div>

        <span class="title">线面平行性质定理</span>
        <div class="control-panel_div_content">
            <div  id="3dContainer" class="view_div_content"></div>
        </div>
    </div>


</template>

<script lang="ts">
import Vue from 'vue'
import "../../../../src/assets/css/core.css"
import "../../../../src/assets/css/layout.css"
import {BrowserUtil} from "../../../../src/util/BrowserUtil";
import {Simple3DModel} from '../../../../src/three/Simple3DModel';
import {Gltf3DModel} from "../../../../src/three/Gltf3DModel";
import {ViewController} from "../../../../src/core/ViewController";
import {LineFaceViewHandler} from "./services/LineFaceViewHandler";
import h_button from '../../../../src/component/ui/button.vue';
import vueSlider from "../../../../src/component/ui/vue2-slider.vue";

export default Vue.extend({
    components: {
        h_button,vueSlider
    },
    data(){
      return{
          sliderNum: -45,
          sliderOption:{
              min: -45,
              max: 45,
          },
          gongshi: false,
          enableAnim: false,
          enableAngle: false
      }
    },
    created(){
        ViewController.getInstance(new LineFaceViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted(){
      if(BrowserUtil.getBrowserInfo().isSmallDevice){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
        ViewController.getInstance().domReady();
    },
    methods: {
        shou(){
            document.getElementById('s1').style.cursor = 'pointer';
        },
        shubiao(){
            document.getElementById('s1').style.cursor = 'default';
        },

    },
    watch:{
        enableAnim: function(enableAxis: any){
            this.gongshi = enableAxis;
            this.enableAngle = enableAxis;
            if (enableAxis === false) {
                this.sliderNum = -45;
            }
            (ViewController.getInstance().viewHandler as any).lineFace3dModel.open(enableAxis);

//            setTimeout(() => {
//                (ViewController.getInstance().viewHandler as any).lineFace3dModel.showLine(enableAxis);
//            }, 100)
        },

        sliderNum:function(sliderNum: any){

            (ViewController.getInstance().viewHandler as any).lineFace3dModel.ratateB(sliderNum);
        },
    }
})
</script>

<style scoped="scoped">


    .title{
        font-size: 24px;
        color: #000000;
        position: absolute;
        top: 24px;
        left: 24px;
    }

    .enableAnim{
        width: 215px;
        /*position: absolute;*/
        /*top: 250px;*/
    }

    .enableAngle{
        width: 220px;
        height: 50px;
        position: absolute;
        top: calc(30% + 150px);
        /*top: 470px;*/
        /*right: 20px;*/
    }

    .angle_text{
        position: absolute;
        left: 90px;
    }
    .xmdingli{
        width: 240px;
        height: 66px;
        transform: scale(0.9);
        position: absolute;
        top: calc(30% + 90px);
        /*top: 400px;*/
        /*left: 12px;*/
        font-size: 16px;
        font-family: '宋体';
        color: #000000;

    }

    .text_style{
        font-size: 16px;
        font-family: "Times New Roman";
        font-style: italic;
        color: #000000;
    }

    .set_scale {
        position: absolute;
        top: -46px;
    }

</style>
