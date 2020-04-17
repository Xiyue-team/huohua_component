<template>
    <div class="aspectration bg_white root_div_container">

        <div class="control-panel_div_rt">

            <div id="flatLine" @click="flatLine" style="width: 240px;height: 44px;margin-top: 52px" v-bind:class="{'event_disabled':gmzx}">
                <h_button  title="共面直线" style="width: 240px;height: 44px; "></h_button>
            </div>

            <div class="control-block_div_border edge_height_slider background_scale" style="position: relative " v-bind:class="{'event_disabled':ymzx}">

                <span class="text_style" style="left: 53px">重合</span>
                <span class="text_style" style="right: 12px;">垂直</span>

                <vue-slider ref="slider1th" v-model="slidernumber" v-bind="sliderOption1" style="position: absolute;top:40px;">
                    <template slot="tooltip" scope="tooltip">
                        <div v-if="tooltip.value >= -30 && tooltip.value < 0" class="custom-tooltip">
                                    <span class="vue-slider-tooltip background_style">
                                        平行
                                    </span>
                        </div>
                        <div v-if="tooltip.value < 90 && tooltip.value > 0" class="custom-tooltip">
                                   <span class="vue-slider-tooltip background_style">
                                        斜交
                                   </span>
                        </div>
                    </template>
                </vue-slider>
            </div>


            <div id="differentLine" @click="differentLine" style="width: 240px;height: 44px;margin-top: 12px" v-bind:class="{'event_disabled':ymzx}">
                <h_button  title="异面直线" style="width: 240px;height: 44px;"></h_button>
            </div>

            <label class="control-block_div_border " style="margin-top:12px;width: 100px;height: 24px;display: inline-block;padding: 15px 10px 15px 0px; margin-right: 16px" v-bind:class="{'event_disabled':gmzx}">
                <input class="radio-default " type="radio" id="test1" name="radio-group" value="0" v-model="vertical">
                <label for="test1" style="margin-left: 10px">垂直</label>
            </label>

            <label class="control-block_div_border " style="margin-top:12px;width: 100px;height: 24px;display: inline-block;padding: 15px 10px 15px 0px;float: right" v-bind:class="{'event_disabled':gmzx}">
                <input class="radio-default " type="radio" id="test2" name="radio-group" value="1" v-model="vertical">
                <label for="test2" style="margin-left: 10px">非垂直</label>
            </label >

            <label class="control-block_div_border switch" id="s1" style="margin-top: 15px;" v-on:mouseover="shou" v-on:mouseout="shubiao">
                <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" v-model="atlas" checked >
                <label for="checkbox-1">知识图谱</label>
            </label>
            <div style="margin-top: 10px">
                <img src="./sub_static/zxyzxwzgx.png" style="width: 245px " v-show="atlas">
            </div>

        </div>
        <span class="title_text">空间中直线与直线的位置关系</span>
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
    import vueSlider from "../../../../src/component/ui/vue2-slider.vue";
    export default Vue.extend({
        components: {
            vueSlider,
            h_button,
            h_switch,
        },
        data(){
            return{
                gmzx:true,
                ymzx:false,
                vertical:'',
                verCtrl:'0',
                text1th_control: false,
                text2th_control:true,
                atlas:false,
                slidernumber:-30,
                sliderOption1:{
                    width:"100%",
                    min:-30,
                    max: 90,
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
            shou(){
                document.getElementById('s1').style.cursor = 'pointer';
            },
            shubiao(){
                document.getElementById('s1').style.cursor = 'default';
            },
            flatLine() {
                (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.CoplanarLineshow();
                this.vertical = '';
                this.gmzx = true;
                this.ymzx = false;
                if (this.verCtrl === '1'){
                    (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.initAngle();
                }
            },
            differentLine() {
                this.slidernumber = -30;
                (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.differentLineshow();
                this.vertical = '0';
                this.gmzx = false;
                this.ymzx = true;
            }
        },
        watch:{
            slidernumber: function (number: number , lastnumber: number) {


                let distance = number * 2;
                if ( number >= 0 && lastnumber <= 0 ) {
                    distance = 0;
                    (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.setdistance(distance , number);
                }
                if ( number <= 0 && lastnumber <= 0){
                    (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.setdistance(distance , number);
                }
                if (number <= 0&& lastnumber >= 0){
                    (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.setdistance(distance , number);
                }



                if ( number >= 0 && lastnumber <= 0 ) {
                    lastnumber = 0;
                }
                if ( number <= 0 && lastnumber >= 0 ) {
                    number = 0;
                }
                let angle = number - lastnumber;
                (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.rotateLine(angle , number);


            },
            vertical: function (value: string, lastValue: string) {
                this.verCtrl = value;
                (ViewController.getInstance().viewHandler as CentrumViewHandler).mountaion.different(value , lastValue);
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
        margin-top: 12px;
        padding: 0;
    }
    .text_style{
        position: absolute;
        top: 16px;
        font-size: 16px;
        color: #000000;
        font-family: '宋体';
        line-height: 14px;
    }
    .single_style{
        width: 110px;
        height: 44px;
        margin-right: 20px;
        display: block;

    }



</style>
