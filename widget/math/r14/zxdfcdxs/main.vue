<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <leftAndRightLayout v-bind="layoutOption">
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">直线的方程-点斜式</span>
                <div style="width: 100%; height: 100%; display: flex">
                    <div id="box" style="width: 100%;height: 100%; margin: auto;">
                    </div>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
                    <div class="button_border "
                         style="display:inline-block;width:48px;height:40px;position: absolute;top:20px;right:24px;"
                         id="reset" @click="resetEvent">
                        <img style="width: 24px; margin-top: 8px;margin-left: 12px"
                             src="./../../../../static/images/chongzhi.png" alt="" >
                    </div>

                    <div style="margin-top: 90px">
                        <img src="./sub_static/table.png" style="width: 280px; height: 146px"/>

                        <div style="position: relative; top: -65px; left: 160px; width: 60px; text-align: center;background-color: #FFFFFF; height: 20px">
                            <span class="text_style_K">{{displayK}}</span>
                        </div>
                        <div style="position: relative; top: -51px; left: 106px; width: 172px; text-align: center;height: 20px;background-color: #FFFFFF;">
                            <div v-show="ctrl && !ctrl2" style="color: #000000; font-size: 16px">
                                <span class="text_style text_size">x=</span>
                                <span class="text_size">{{specialX}}</span>
                            </div>
                            <div v-show="ctrl2" style="width: 160px; background: #fff; z-index: 2">
                                <span class="text_style text_size">y</span>
                                <span class="text_size">{{specialK}}</span>
                                <span class="text_size">=0</span>
                            </div>
                            <div v-show="!ctrl && !ctrl2">
                                <span class="text_style text_size">y</span>
                                <span class="text_size" id="ytext">{{displayY}}</span>
                                <span class="text_style text_size">=</span>
                                <span class="text_size">{{displayK}}</span>
                                <span class="text_size">(</span>
                                <span class="text_style text_size">x</span>
                                <span class="text_size" id="xtext">{{displayX}}</span>
                                <span class="text_size">)</span>
                            </div>
                        </div>

                    </div>

                    <div style="margin-top: 10px; width: 280px; height: 78px">
                        <div style="width: 280px; height: 78px; position: relative;">
                            <span class="text_style roman_text"
                                  style="position: absolute; top: 43px;left: -10px;">θ</span>
                            <div style="width: 280px;height: 6px; position: absolute;left: 5px;top: 38px;">
                                <vue-slider ref="slider1th" v-model="slidernumber" v-bind="sliderOption" style="">
                                    <template slot="tooltip" scope="tooltip">
                                        <div class="custom-tooltip">
                                            {{ tooltip.value % 180 + '°'}}
                                        </div>
                                    </template>
                                </vue-slider>
                            </div>

                        </div>
                    </div>

                    <div style="width: 232px; height: 216px; position: relative;margin-top: 60px; margin-left: 20px">
                        <img src="./sub_static/function.png" style="width: 232px; height: 216px"/>

                        <!--sprite图-->
                        <i id="waveImg" class="wave"></i>
                    </div>
                </div>
            </template>
        </leftAndRightLayout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import {ViewController} from '../../../../src/core/ViewController';
    import h_button from '../../../../src/component/ui/button.vue';
    import h_switch from '../../../../src/component/ui/switch.vue';
    import leftAndRightLayout from '../../../../src/component/layout/leftAndRight_layout.vue'
    import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
    import {JsxViewHandler} from "./service/JsxViewHandler";

    export default Vue.extend({
        components: {
            vueSlider,
            h_button,
            h_switch,
            leftAndRightLayout
        },
        data() {
            return {
                layoutOption: {
                    widthClass: 'w320'
                },
                slidernumber: 45,
                displayK: '1',
                displayX: '-1',
                displayY: '-1',
                specialK: '',
                specialX: '',
                ctrl: false,
                ctrl1: true,
                ctrl2: false,
                sliderCtrl: true,
                zxfangcheng: 'y-1=1(x-1)',
                sliderOption: {
                    width: "100%",
                    min: 0,
                    max: 360,
                    piecewise: false,
                    tooltip: 'always',
                    piecewiseLabel: false,
                    speed: 0,
                    piecewiseStyle: {
                        "backgroundColor": "#FFFFFF",
                        "visibility": "visible",
                        "width": "24px",
                        "height": "24px"
                    },
                    piecewiseActiveStyle: {
                        "backgroundColor": "#5CAEFD"
                    }
                },
            };
        },
        created() {
            ViewController.getInstance(new JsxViewHandler(this));
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted() {
            ViewController.getInstance().domReady();
        },
        methods: {
            resetEvent() {
                this.slidernumber = 45;
                (ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.reset();
            },
        },
        watch: {
            slidernumber: function (currentNum: number, lastNum: number) {
                const angle = currentNum - lastNum;
                if (currentNum === 90 || currentNum === 270) {
                    this.displayK = '不存在';
                    this.ctrl = true;
                    this.ctrl2 = false;
                    if ((ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.pPoint.position.x.toFixed(1) != 0) {
                        this.specialX = ((ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.pPoint.position.x / 10).toFixed(1);
                        if ((ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.pPoint.position.x.toFixed(0) == -0 || (ViewController.getInstance().viewHandler as                                JsxViewHandler).mountaion.pPoint.position.x.toFixed(0) == 0) {
                            this.specialX = '0';
                        }
                    } else {
                        this.specialX = '0';
                    }
                } else {
                    this.ctrl = false;
                    this.ctrl2 = false;
                    this.displayK = (parseFloat(Math.tan(this.slidernumber * Math.PI / 180).toFixed(1))).toString();
                    if (((ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.pPoint.position.y / 10) > 0) {
                        this.displayY = '-' + ((ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.pPoint.position.y / 10).toFixed(1);
                    } else {
                        this.displayY = '+' + (-(ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.pPoint.position.y / 10).toFixed(1);
                    }

                    if (((ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.pPoint.position.x / 10) > 0) {
                        this.displayX = '-' + ((ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.pPoint.position.x / 10).toFixed(1);
                        if (this.displayX === '+0.0' || this.displayX === '-0.0') {
                            this.displayX = '-0'; //可能错误的位置 0 || -0
                        }
                    } else {
                        this.displayX = '+' + (-(ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.pPoint.position.x / 10).toFixed(1);
                    }
                    if (((ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.pPoint.position.x / 10).toFixed(0) === '0' ||
                        ((ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.pPoint.position.x / 10).toFixed(0) === '-0') {
                        this.displayX = '-0'
                    }
                    if (((ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.pPoint.position.y / 10).toFixed(0) === '0' ||
                        ((ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.pPoint.position.y / 10).toFixed(0) === '-0') {
                        this.displayY = '-0'
                    }

                }
                if (this.displayK === '0') {
                    this.ctrl2 = true;
                    if ((ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.pPoint.position.y.toFixed(1) > 0) {
                        this.specialK = '-' + (parseFloat((ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.pPoint.position.y) / 10).toFixed(1);
                        if ((ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.pPoint.position.y.toFixed(0) == 0) {
                            this.specialK = '';
                        }
                    } else if ((ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.pPoint.position.y.toFixed(1) < 0) {
                        this.specialK = '+' + (-parseFloat((ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.pPoint.position.y) / 10).toFixed(1);
                        if ((ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.pPoint.position.y.toFixed(0) == -0) {
                            this.specialK = '';
                        }
                    } else {
                        this.specialK = '';
                    }

                }
                (ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.getSliderNumber(currentNum);
                if (this.sliderCtrl) {
                    (ViewController.getInstance().viewHandler as JsxViewHandler).mountaion.rotateLineBySlider(angle, currentNum);
                }

            }

        }
    });
</script>

<style scoped="scoped">
    body {
        overflow: hidden !important;
        overflow-x: hidden;
        overflow-y: hidden;

    }

    .title_text {
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 24px;
        left: 24px;
    }

    .wave {
        display: block;
        width: 58px;
        height: 216px;
        background: url("./sub_static/wave.png") 0 0 no-repeat;
        background-size: cover;
        position: absolute;
        top: 0px;
        left: 0px;
    }

    .text_style.roman_text {
        font-size: 20px;
        color: #4D4D4D;
        text-align: center;
        line-height: 16px;
    }

    .text_style.text_size {
        color: #000000;
        font-size: 16px;
    }

    .text_size {
        color: #000000;
        font-size: 14px;
    }

    .text_style_K {
        color: #000000;
        font-size: 14px;
    }

</style>
<style>
    .text_style {
        font-style: italic;
        font-family: Times New Roman !important;
    }
</style>
