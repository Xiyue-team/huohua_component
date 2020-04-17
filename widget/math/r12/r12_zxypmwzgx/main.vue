<template>
    <div class="aspectration bg_white root_div_container">

        <div class="control-panel_div_rt">

            <div class="control-block_div_border edge_height_slider background_scale" style="position: relative;" v-bind:class="{'set_scale': isMobile}">

                <span class="text_style" v-show="text1th_control" style="left: 12px">包含</span>
                <span class="text_style" v-show="text2th_control" style="right: 12px;">垂直</span>

                <vue-slider ref="slider1th" v-model="slidernumber" v-bind="sliderOption1" style="position: absolute;top:40px;">
                    <template slot="tooltip" scope="tooltip">
                        <div v-if="tooltip.value === 0" class="custom-tooltip">
                                    <span class="vue-slider-tooltip background_style">
                                        包含
                                    </span>
                        </div>
                        <div v-if="tooltip.value >0 && tooltip.value < 50" class="custom-tooltip">
                                    <span class="vue-slider-tooltip background_style">
                                        平行
                                    </span>
                        </div>
                        <div v-if="tooltip.value <140 && tooltip.value >50" class="custom-tooltip">
                                   <span class="vue-slider-tooltip background_style">
                                        斜交
                                   </span>
                        </div>
                        <div v-if="tooltip.value == 140" class="custom-tooltip">
                                     <span class="vue-slider-tooltip background_style">
                                        垂直
                                     </span>
                        </div>
                    </template>
                </vue-slider>
            </div>
            <label class="control-block_div_border switch" id="s1" style="margin-top: 20px;" v-on:mouseover="shou" v-on:mouseout="shubiao">
                <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" v-model="atlas" checked >
                <label for="checkbox-1">知识图谱</label>
            </label>
            <div style="margin-top: 20px">
                <img src="./sub_static/zxypmwzgx.png" style="width: 245px " v-show="atlas">
            </div>


        </div>
        <span class="title_text">空间中直线与平面的位置关系</span>
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
    import h_switch from '../../../../src/component/ui/switch.vue';
    import {CentrumViewHandler} from "./services/CentrumViewHandler";
    import {BrowserUtil} from '../../../../src/util/BrowserUtil';
    /*    let vueSlider = require('vue-slider-component');*/
    import vueSlider from "../../../../src/component/ui/vue2-slider.vue";
    //Returned expression type   is not assignable to type Data
    export default Vue.extend({
        components: {
            vueSlider,
            h_button,
            h_switch,
        },
        data(){
            return{
                text1th_control: false,
                text2th_control:true,
                atlas:false,
                isMobile: false,
                slidernumber:0,
                sliderOption1:{
                    width:"100%",
                    min:0,
                    max:140,
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
            shou(){
                document.getElementById('s1').style.cursor = 'pointer';
            },
            shubiao(){
                document.getElementById('s1').style.cursor = 'default';
            },
        },
        watch:{
            slidernumber: function (number: number , lastnumber: number) {
                /*let angle = number - lastnumber;
                (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.Animation(angle);*/
                if (number === 0){
                    this.text1th_control = false;
                } else {
                    this.text1th_control = true;
                }
                if(number === 140){
                    this.text2th_control = false;
                } else{
                    this.text2th_control = true;
                }
                if(number <=50){
                    let distance = number / 2;
                    (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.setposition(distance);
                }

                if( number >= 50 && lastnumber <= 50 ){
                    lastnumber = 50;
                }
                if( number <= 50 && lastnumber >= 50 ){
                    number = 50;
                }
                    let angle = number - lastnumber;
                    (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.rotateLine(angle , number);


            }
        }
    })
</script>

<style scoped="scoped">
    body{
        overflow:hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;

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
    .reset_button{
        display:inline-block;
        width:48px;
        height:40px;
        position: absolute;
        top:20px;
        right:24px;
    }
    .reset_img{
        width: 24px;
        margin-top: 8px;
        margin-left: 12px
    }
    .background_scale{
        height: 80px;
        margin-top: 158px;
        padding: 0;
    }
    .text_style{
        position: absolute;
        top: 16px;
        font-size: 14px;
        color: #000000;
        line-height: 14px;
    }
    .set_scale {
        margin-top: 52px;
    }


</style>
