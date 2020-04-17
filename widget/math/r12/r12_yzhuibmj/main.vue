<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <div class="control-panel_div_rt">
            <div class="button_border " style="display:inline-block;width:48px;height:40px;float: right;" id="reset" @click="resetEvent">
                <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="../../../../static/images/chongzhi.png" alt="" >
            </div>

            <div class="control-block_div_border radius_height_slider" style="margin-top:10px;">
                <div class="radius_text">半径<span class="text_style">r</span></div>
                <vue-slider ref="slider4" v-model="sliderNum" v-bind="sliderOption" style="margin:0 auto;position: relative;top:50px;">

                </vue-slider>

                <div class="height_text">高<span class="text_style">h</span></div>
                <vue-slider ref="slider4" v-model="sliderNum4" v-bind="sliderMathOption" style="margin:0 auto;position: relative;top:113px;margin-bottom: 14px;">

                </vue-slider>
            </div>

            <h_button title="展开" class="open" @click.native="openEvent"></h_button>
            <span id="cylinder" class="cylinder">332.92</span>
            <span id="busbarLength" class="busbarLength">11.66</span>
            <div class="gongshi">
            <img src="./sub_static/gongshidingli.png"/>
            </div>
        </div>

        <span class="title">圆锥的表面积</span>
        <div class="control-panel_div_content">
            <div  id="3dContainer" class="view_div_content"></div>
        </div>
    </div>


</template>

<script lang="ts">
import Vue from 'vue'
import "../../../../src/assets/css/core.css"
import "../../../../src/assets/css/layout.css"
import {ViewController} from "../../../../src/core/ViewController";
import {PrismViewHandler} from "./services/PrismViewHandler";
import h_button from '../../../../src/component/ui/button.vue';
import vueSlider from '../../../../src/component/ui/vue2-slider.vue';

export default Vue.extend({
    components: {
        h_button,vueSlider
    },
    data(){
      return{
          sliderNum:6,
          sliderOption:{
              min: 1,
              max: 10,
          },
          sliderNum4:10,
          sliderMathOption:{
              min: 1,
              max: 10,
          }
      }
    },
    created(){
        ViewController.getInstance(new PrismViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted(){
        ViewController.getInstance().domReady();
    },
    methods: {
        async openEvent(){

            const animation = await  (ViewController.getInstance().viewHandler as any).prismStructure.openEvent();
            (ViewController.getInstance().viewHandler as any).prismStructure.showLine();
        },

        resetEvent(){
            this.sliderNum = 6;
            this.sliderNum4 = 10;
            (ViewController.getInstance().viewHandler as any).prismStructure.reset();
        }
    },
    watch:{
        sliderNum:function (sliderNum:any) {
            (ViewController.getInstance().viewHandler as any).prismStructure.dragCircleGeometry(sliderNum, this.sliderNum4);
        },

        sliderNum4:function (sliderNum4:number) {
//            (ViewController.getInstance().viewHandler as any).prismStructure.dragHeight(sliderNum4);

            (ViewController.getInstance().viewHandler as any).prismStructure.dragCircleGeometry(this.sliderNum, this.sliderNum4);
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

    .title{
        font-size: 24px;
        color: #000000;
        position: absolute;
        top: 24px;
        left: 24px;
    }

    .radius_height_slider{
        width: 220px;
        height: 169px;
        position: absolute;
        right: 20px;
        top: 170px;
    }

    .radius_text{
        font-size: 16px;
        position: absolute;
        right: 110px;
        top: 10px;
    }

    .height_text{
        font-size: 16px;
        position: absolute;
        right: 110px;
        top: 100px;
    }

    .open{
        width: 244px;
        position: absolute;
        right: 20px;
        top: 390px;
    }

    .gongshi{
        transform: scale(0.5);
        position: absolute;
        top: 400px;
        left: -100px;

    }

    .cylinder{
        font-size: 17px;
        color:  #000000;
        position: absolute;
        top: 530px;
        left: 170px;
    }

    .busbarLength{
        font-size: 17px;
        color:  #000000;
        position: absolute;
        top: 450px;
        left: 120px;
    }

    .text_style{
        font-style: italic;
        font-family: "Times New Roman";
        font-size: 16px;
    }
</style>
