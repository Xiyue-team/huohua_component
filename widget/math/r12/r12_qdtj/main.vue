<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <div class="control-panel_div_rt">
            <div class="button_border " style="display:inline-block;width:48px;height:40px;float: right;" id="reset" @click="resetEvent">
                <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="../../../../static/images/chongzhi.png" alt="" >
            </div>

            <div style="display: flex;height: 100%;">
                <div class="control-block_div_border radius_slider" style="margin-top:10px;">
                    <div class="radius_text">半径<span class="text_style">R</span></div>
                    <vue-slider ref="slider4" v-model="sliderNum" v-bind="sliderOption" style="margin:0 auto;position: relative;top:50px;">

                    </vue-slider>

                </div>

                <h_button title="注满液体" class="open" @click.native="openEvent"></h_button>

                <div id="volume_number" class="volume_number">0</div>
                <div class="formula">
                    <img src="./sub_static/gongshidingli.png"/>
                </div>
            </div>
        </div>

        <span class="title">球的体积</span>
        <div>

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
import {PrismViewHandler} from "./services/PrismViewHandler";
import h_button from '../../../../src/component/ui/button.vue';
import vueSlider from '../../../../src/component/ui/vue2-slider.vue';

export default Vue.extend({
    components: {
        h_button,vueSlider
    },
    data(){
      return{
          sliderNum:5,
          sliderOption:{
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
        openEvent(){
//            (ViewController.getInstance().viewHandler as any).prismStructure.createReFill();
            (ViewController.getInstance().viewHandler as any).prismStructure.clickEvent();
//            (ViewController.getInstance().viewHandler as any).prismStructure.createTop(20 , 20);
        },

        resetEvent(){
            this.sliderNum = 5;
            (ViewController.getInstance().viewHandler as any).prismStructure.reset();
        }
    },
    watch:{
        sliderNum:function (sliderNum:any) {
            setTimeout(() => {
                (ViewController.getInstance().viewHandler as any).prismStructure.dragRadius(sliderNum);
            }, 16);

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

    .radius_slider{
        width: 220px;
        height: 92px;
        position: absolute;
        /*right: 20px;*/
        top: calc(30%);
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.12);
    }

    .radius_text{
        font-size: 16px;
        position: absolute;
        right: 110px;
        top: 10px;
    }

    .open{
        width: 110px;
        height: 44px;
        position: absolute;
        /*left: 15px;*/
        /*top: 460px;*/
        top: calc(30% + 150px);
        /*left: calc(10%);*/
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.12);
    }

    .volume_number{
        width: 110px;
        height: 42px;
        border: 1px solid white;
        background-color: white;
        position: absolute;
        right: 20px;
        top: calc(30% + 150px);
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.12);

        font-size: 16px;
        text-align: center;
        line-height: 42px;
    }

    .formula{
        zoom: 0.5;
        position: absolute;
        top: calc(30% + 420px);
        /*top: 1050px;*/
        /*left: 45px;*/
    }


    .text_style{
        font-size: 16px;
        font-family: "Times New Roman";
        font-style: italic;
    }
</style>
