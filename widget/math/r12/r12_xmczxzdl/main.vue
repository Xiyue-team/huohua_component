<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <div class="control-panel_div_rt">
           <div style="display:flex;height: 100%; ">
               <div style="position: absolute;top: calc(33%)">
                   <label for="checkbox-1" id="s1" class="control-block_div_border switch enableAnim" v-on:mouseover="shou" v-on:mouseout="shubiao" style="margin-top:10px;">
                       <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" value="1" v-model="enableAnim">
                       <label for="checkbox-1">线面垂直性质定理的推论</label>
                   </label>
               </div>
               <div class="xmdingli" v-show="gongshi">
                   垂直于同一个平面的两条直线平<br/>行。
               </div>
               <div class="control-block_div_border enableAngle" style="margin: auto">
                   <div class="angle_text">转动<span class="xieti_style">l₂</span></div>
                   <vue-slider ref="slider4" v-model="sliderNum" v-bind="sliderOption"  style="margin:0 auto;position: relative;top:30px;">
                       <template slot="tooltip" scope="tooltip">
                           <div v-if="false" class="custom-tooltip">

                           </div>
                       </template>
                   </vue-slider>
               </div>
           </div>

        </div>

        <span class="title">线面垂直性质定理的推论</span>
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
import {Simple3DModel} from "../../../../src/three/Simple3DModel";
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
          sliderNum: 0,
          sliderOption:{
              min: -90,
              max: 0,
          },
          gongshi: false,
          enableAnim: false,
      }
    },
    created(){
        ViewController.getInstance(new LineFaceViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted(){
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
    }

    .enableAngle{
        width: 220px;
        height: 50px;
        position: absolute;
        top: calc(33% + 120px);
    }

    .angle_text{
        position: absolute;
        left: 90px;
    }
    .xmdingli{
        transform: scale(0.9);
        position: absolute;
        top: calc(33% + 70px);
        font-size: 16px;
        font-family: '宋体';
    }


    .xieti_style{
        font-style: italic;
        font-family: "Times New Roman";
        font-size: 16px;
        color: #000000;
    }
</style>
