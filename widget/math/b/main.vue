<template>
    <div class="aspectration bg_white" data-ratio="16:9">
        <div class="control-panel_div_rt">
            <h_button title="测试按钮"></h_button>

            <div class="button_border " style="display:inline-block;width:48px;height:40px;float: right;">
                <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="http://huohua-component.oss-cn-hangzhou.aliyuncs.com/widget/c26c2451043fd2ceac0305f12728ce89_unzip/static/UI/chongzhi@2x.png" alt="">
            </div>
            <br></br>

            <div class="control-block_div_border" style="margin-top:10px;">
                <vue-slider ref="slider" v-model="sliderNum" v-bind="sliderOption" min="20" max="200" interval="2"  v-tooltipStyle="tooltipStyle" ></vue-slider>
            </div>



            <div class="control-block_div_border" style="margin-top:10px;">
                <vue-slider ref="slider2" v-model="sliderNums" v-bind="sliderOption" min="20" max="200" interval="2"  v-tooltipStyle="tooltipStyle" ></vue-slider>
            </div>
            <div class="control-block_div_border" style="margin-top:10px;">
                <vue-slider ref="slider3" v-model="sliderDotNum"   v-bind="demo2" ></vue-slider>
            </div>

            <div class="control-block_div_border" style="margin-top:10px;height: 200px">
                <vue-slider ref="slider4" v-model="sliderNum4" v-bind="sliderMathOption" style="margin:0 auto;position: relative;top:60px;">
                   <!-- <template slot="label" scope="{ label, active,index }">
                        <span :class="['custom-label', { active }]" v-if="index === 0">左</span>
                        <span :class="['custom-label', { active }]" v-if="index === 4">平移</span>
                        <span :class="['custom-label', { active }]" v-if="index === 8">右</span>
                    </template>-->
                </vue-slider>
            </div>


            <div class="control-block_div_border switch" style="margin-top:10px;">
                <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" value="1" checked>
                <label for="checkbox-1">状态开关</label>
            </div>

            <br></br>

            <label class="control-block_div_border " style="margin-top:10px;">
                <input class="radio-default" type="radio" id="test1" name="radio-group" checked><label for="test1">单选A</label>
            </label>

            <label class="control-block_div_border " style="margin-top:10px;">
                <input class="radio-default" type="radio" id="test2" name="radio-group" checked><label for="test2">单选B</label>
            </label >


            <div class="control-block_div_border" style="margin-top:10px;">
                <label class="label-checkbox">One
                    <input type="checkbox" >
                    <span class="checkmark"></span>
                </label>
            </div>


          <!--  <div class="control-block_div_border" style="margin-top:10px;">
                <span style="display: inline-block;width: 100%;font-size: 16px;text-align: center;">标题</span>
                <span style="position: relative;bottom: -20px;float: left;">1</span>
                <span style="position: relative;bottom: -20px;float: right;">100</span>
                <h_slider></h_slider>
            </div>-->

            <div class="control-block_div_border" style="margin-top:10px;text-align: justify;">
                <h_counter></h_counter>
            </div>

            <div class="control-block_div_border " style="margin-top:10px;">
                <span style="display: inline-block;width: 100%;font-size: 16px;text-align: center;">烧杯内溶液</span>
                <input class="radio-default" type="radio" id="a1" name="radio-group" checked><label for="a1" style="display: block;margin-top: 18px;">清水</label>
                <input class="radio-default" type="radio" id="a2" name="radio-group" checked><label for="a2" style="display: block;margin-top: 18px;">低浓度蔗糖溶液</label>
                <input class="radio-default" type="radio" id="a3" name="radio-group" checked><label for="a3" style="display: block;margin-top: 18px;">高浓度蔗糖溶液</label>
                <input class="radio-default" type="radio" id="a4" name="radio-group" checked><label for="a4" style="display: block;margin-top: 18px;">低浓度葡萄糖溶液</label>
            </div>

            <div class="control-block_div_border " style="margin-top:10px;">
                <span style="display: inline-block;width: 100%;font-size: 16px;text-align: center;">氢键作用力</span>
                <br/>  <br/>

                <label for="b1" style="display: inline-block;">
                    <label for="b1" style="margin-left: 5px;">弱</label>
                    <input class="radio-default" type="radio" id="b1" name="radio-group" checked><label for="b1" style="display: table-cell;vertical-align: middle;height: 24px;"></label>
                </label>

                <label for="b2" style="display: inline-block;margin-left: calc(30% - 19px);">
                    <label for="b2" style="margin-left: 5px;">中</label>
                    <input class="radio-default" type="radio" id="b2" name="radio-group" checked><label for="b2" style="display: table-cell;vertical-align: middle;height: 24px;  "></label>
                </label>

                <label for="b3" style="display: inline-block;float:right;">
                    <label for="b3" style="margin-left: 5px;">强</label>
                    <input class="radio-default" type="radio" id="b3" name="radio-group" checked><label for="b3" style="display: table-cell;vertical-align: middle;height: 24px;"></label>
                </label>
            </div>
            <br><br>
            <div style="height:160px;">
                <div style="display:inline-block;float:left;">
                    <label for="" style="display: block;text-align: center;margin-bottom:20px;">父本</label>
                    <div class="button_border" style="width:75px;height:75px;margin-bottom:10px;">
                        <img style="width:100%;height:100%" src="http://huohua-component.oss-cn-hangzhou.aliyuncs.com/widget/4c65c5e225953126b6d08e40d39f62b9_unzip/static/img/parent3.png" alt="">
                    </div>
                    <label for="" style="display: block;text-align: center;">rryy</label>
                </div>

                <div style="display:inline-block;float:right;">
                    <label for="" style="display: block;text-align: center;margin-bottom:20px;">母本</label>
                    <div class="button_border" style="width:75px;height:75px;margin-bottom:10px;">
                        <img style="width:100%;height:100%" src="http://huohua-component.oss-cn-hangzhou.aliyuncs.com/widget/4c65c5e225953126b6d08e40d39f62b9_unzip/static/img/parent1.png" alt="">
                    </div>
                    <label for="" style="display: block;text-align: center;">RRYY</label>
                </div>
            </div>
                <!--<div class="tooltip_bottom" >
                     <div>测试提示区域</div>
                     <span class="tooltip_bottom_arrow"></span>
                </div>-->

                <div class="top arrow_box"><div>提示框</div></div>
                <br><br>
                <div class="bottom arrow_box"><div>提示框</div></div>
                <br><br>
                <div class="left arrow_box" style="width:50%;"><div>提示框</div></div>
                <br><br>
                <div class="right arrow_box" style="width:50%;"><div>提示框</div></div>
        </div>

        <div class="control-panel_div_content">
            math/b
        </div>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import "../../../src/assets/css/core.css"
    import "../../../src/assets/css/layout.css"
    import "./static/base.css"
    import h_button from '../../../src/component/ui/button.vue';
    import h_counter from '../../../src/component/ui/counter.vue';
    import {SliderConfig} from '../../../src/config/SliderConfig';
    import {Detector} from "../../../src/util/Detector";
    let vueSlider = require('vue-slider-component');

    interface Data {
        welcomeMsg: string,
        appName: string,
        browser: string
    }

    //Returned expression type   is not assignable to type Data
    export default Vue.extend({
        components: {
            h_button,  h_counter,vueSlider
        },
        data() {
            return {
                welcomeMsg: 'Welcome to Your',
                appName: 'Vue.js App',
                browser: "",
                sliderNum:20,
                sliderOption:SliderConfig,
                sliderDotNum:20,
                tooltipStyle:{
                    "backgroundColor": "#666",
                    "borderColor": "#666"
                },
                sliderNums:[30,80],
                pointArry:[40,60,80,100],
                sliderNum4:0,
                sliderMathOption:{
                    width:"80%",
                    data:[
                        4,3,2,1,0,1,2,3,4
                    ],
                    piecewise: true,
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
                demo2: {
                    value: 0,
                    width: 4,
                    height: 300,
                    dotSize: 24,
                    eventType: 'auto',
                    min: 0,
                    max: 100,
                    interval: 1,
                    disabled: false,
                    show: true,
                    tooltip: false,
                    piecewise: true,
                    piecewiseLabel: true,
                    data: [
                        0,
                        20,
                        40,
                        60,
                        80,
                        100
                    ],
                    style: {
                        display: 'inline-block',
                        marginLeft: '30px'
                    },
                    direction: 'vertical',
                    speed: 0.5,
                    piecewiseStyle: {
                        "backgroundColor": "#ccc",
                        "visibility": "visible",
                        "width": "12px",
                        "height": "12px"
                    },
                    piecewiseActiveStyle: {
                        "backgroundColor": "#3498db"
                    },
                    labelActiveStyle: {
                        "color": "#3498db"
                    }
                   /* processStyle: {
                        backgroundColor: '#fff'
                    }*/
                }
            } ;
        },
        created(){
            console.log("created");
            console.log(document.querySelector("div"));
            Detector.forceMobildLandscape();
        },
        mounted(){

        },
        computed: {
            msg(): string {
                return this.welcomeMsg + ' ' + this.appName
            }
        },

        methods: {
            reverseAppName(): void {
                // BrowserUtil.getBrowserInfo();
                // new Demo();
                this.appName = this.appName.split('').reverse().join('')
            },
            play(): void {
                console.log("play");
            }
        }
    })
</script>

<style>
</style>
