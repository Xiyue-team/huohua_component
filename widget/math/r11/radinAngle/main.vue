<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">

        <div class="control-panel_div_floatRight" style="">
            <div>
            <div style="float: left;width: 50px;height:16px;font-size:16px;position: absolute;bottom: 122px;right: 118px;z-index: 2">半径</div>
            <div style="float: left;width: 50px;height:16px;font-size:16px;position: absolute;bottom: 119px;right: 85px;z-index: 2; font-family: 'Times New Roman';font-style:  italic;">R</div>
            <div class="control-block_div_border" style=" width: 240px;height:96px;position: absolute;bottom: 39px;right:20px ;">
                <vue-slider ref="sliderC" v-model="sliderNum" v-bind="sliderOption" :drag-start="dragStart" style="margin-top: 70px;">
                    <template slot="label"  slot-scope ="{ label, active,index }">
                        <span :class="['custom-label', { active }]"  v-if="label == 1"> {{ label }}</span>
                        <span :class="['custom-label', { active }]"  v-if="label == 4"> {{ label }} </span>
                    </template>
                </vue-slider>
            </div>
            </div>
            <div class="button_border " style="display:inline-block;width:48px;height:40px;position: absolute; top: 20px; right: 24px;" id="reset" @click="resetEvent">
                <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="../../../../static/images/chongzhi.png" alt="" >
            </div>
        </div>

        <!--<div id="box" class="control-panel_div_content"></div>-->

        <div class="control-panel_div_content fill_parent" style="background-color: #FFFFFF;color: #000000;font-size: 24px;">
            <div style="position: absolute;left: 2.3%;top:4.2%;">1弧度的角</div>
            <div class="view_div_content" style="background-color: #FFFFFF;width: 406px;height: 406px;" data-ratio="1:1" >
                <div  id="box" style="width: 100%;height: 100%;"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import Vue from 'vue'
import "../../../../src/assets/css/core.css"
import "../../../../src/assets/css/layout.css"
import {ViewController} from "../../../../src/core/ViewController";
import {JsxViewHandler} from "./services/JsxViewHandler";
import {SliderConfig} from "../../../../src/config/SliderConfig";
import vueSlider from "../../../../src/component/ui/vue2-slider.vue";
//Returned expression type   is not assignable to type Data
export default Vue.extend({
    data(){
        return{
            sliderNum:1,
            sliderOption:{
                width:"240px",
                data:[
                  1,2,3,4
                ],
                piecewise: false,
                piecewiseLabel: true,
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
        ViewController.getInstance(new JsxViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted(){
        ViewController.getInstance().domReady();
    },
    watch:{
        sliderNum:function (sliderNum:number) {
            if(sliderNum == 0){
                console.log(1);
                 this.sliderNum = 1;
            }else{
                (ViewController.getInstance().viewHandler as JsxViewHandler).event(sliderNum);
            }

        }

    },
    methods: {
        resetEvent(){
            (ViewController.getInstance().viewHandler as JsxViewHandler).reset();
        },
        dragStart(){
            console.log(222)
        }
    }
})
</script>

<style scoped="scoped">
    .view_div_content{
        width:502px;
        height:502px;
    }

</style>
<style>
    .text_style{
        font-style:  italic;
        font-family: Times New Roman !important;
    }
</style>
