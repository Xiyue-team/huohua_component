<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span class="title_style">圆的一般方程</span>

                <transition name="fade">
                    <div class="formula_Container" v-show="leftFormula1">

                        <div class="formulaOne" v-show="formula" id="formula1">
                            <img src="./sub_static/formula.png" ondragstart='return false;'
                                 style="width: 280px; height: 130px"/>
                        </div>

                        <div class="formulaTwo" v-show="emptyFormula" id="formula2">
                            <img src="./sub_static/emptyFormula.png" ondragstart='return false;'
                                 style="width: 280px; height: 130px"/>


                            <div class="arrow_UpImg1">
                                <img src="./sub_static/up.png" style="margin-left: 10px; margin-top: 10px"
                                     ondragstart='return false;'/>
                            </div>
                            <div class="spin_One" id="spin1">
                                <selet-ios :listData="listData" v-model="month"
                                           type="cycle" v-bind="selectParameter" ref="spinOne"
                                >
                                </selet-ios>
                            </div>
                            <div class="arrow_DownImg1">
                                <img src="./sub_static/down.png" style="margin-left: 10px; margin-top: 15px"
                                     ondragstart='return false;'/>
                            </div>


                            <div class="arrow_UpImg2">
                                <img src="./sub_static/up.png" style="margin-left: 10px; margin-top: 10px"
                                     ondragstart='return false;'/>
                            </div>
                            <div class="spin_Two" id="spin2">
                                <selet-ios :listData="listData1" v-model="day"
                                           type="cycle" v-bind="selectParameter" ref="spinTwo"
                                >
                                </selet-ios>
                            </div>
                            <div class="arrow_DownImg2">
                                <img src="./sub_static/down.png" style="margin-left: 10px; margin-top: 15px"
                                     ondragstart='return false;'/>
                            </div>


                            <div class="arrow_UpImg3">
                                <img src="./sub_static/up.png" style="margin-left: 10px; margin-top: 10px"
                                     ondragstart='return false;'/>
                            </div>
                            <div class="spin_Three" id="spin3">
                                <selet-ios :listData="listData2" v-model="year" type="cycle" v-bind="selectParameter"
                                           ref="spinThree"
                                >
                                </selet-ios>
                            </div>
                            <div class="arrow_DownImg3">
                                <img src="./sub_static/down.png" style="margin-left: 10px; margin-top: 15px"
                                     ondragstart='return false;'/>
                            </div>
                        </div>
                    </div>
                </transition>

                <transition name="fade">
                    <div class="formulaThree" v-show="leftFormula2">
                        <img src="./sub_static/formula2.png" ondragstart='return false;'
                             style="width: 196px; height: 60px;"/>
                    </div>
                </transition>

                <transition name="fade">
                    <div class="formulaFour" v-show="leftFormula3">
                        <img src="./sub_static/formula3.png" ondragstart='return false;'
                             style="width: 212px; height: 60px;"/>
                    </div>
                </transition>

                <div id="3dContainer" style="width: 100%;height: 100%;">

                </div>
            </template>


            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
                </div>
            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import {ViewController} from '../../../../src/core/ViewController';
    import h_button from '../../../../src/component/ui/button.vue';
    import h_switch from '../../../../src/component/ui/switch.vue';
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue'
    import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
    import {YdfcViewHandler} from "./service/ydfcViewHandler";
    import seletIos from '../../../../src/component/ui/select.vue';
    import {ViewOption} from "../../../../src/core/CoreInterface";

    export default Vue.extend({

        components: {
            vueSlider,
            h_button,
            h_switch,
            fullScreensLayout,
            seletIos
        },

        data() {
            return {
                formula: true,
                emptyFormula: false,
                leftFormula1: true,
                leftFormula2: true,
                leftFormula3: true,

                listData: Array.from({length: 19}, (value, index) => -9 + index),
                month: 7,

                listData1: Array.from({length: 19}, (value, index) => -9 + index),
                day: 3,

                listData2: Array.from({length: 19}, (value, index) => -9 + index),
                year: 7,

                selectParameter: {
                    parameter1: 2,
                },
            };
        },
        created() {
            const viewOption = new ViewOption();
            viewOption.mobilePanelAlpha = true;
            viewOption.controlPanelAnimationDelay = 1000;
            ViewController.getInstance(new YdfcViewHandler(this), viewOption);
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted() {
            ViewController.getInstance().domReady();

            //初始公式2秒后隐藏
            setTimeout(() => {
                this.formula = false;
                this.emptyFormula = true;
            }, 2000);

            // 点击滑轮，箭头图片消失，离开后2秒箭头图片出现
            (this.$refs.spinOne as any).expandFunction = function () {
                document.getElementById('spin1').style.zIndex = '7';
            };

            (this.$refs.spinTwo as any).expandFunction = function () {
                document.getElementById('spin2').style.zIndex = '7';
            };

            (this.$refs.spinThree as any).expandFunction = function () {
                document.getElementById('spin3').style.zIndex = '7';
            };


            (this.$refs.spinOne as any).expandFunctionTwo = function () {
                setTimeout(() => {
                    document.getElementById('spin1').style.zIndex = '5';
                }, 3000)
            };

            (this.$refs.spinTwo as any).expandFunctionTwo = function () {
                setTimeout(() => {
                    document.getElementById('spin2').style.zIndex = '5';
                }, 3000)
            };

            (this.$refs.spinThree as any).expandFunctionTwo = function () {
                setTimeout(() => {
                    document.getElementById('spin3').style.zIndex = '5';
                }, 3000)
            };
        },

        methods: {
            resetEvent() {
                this.month = 7;
                this.day = 3;
                this.year = 7;
                this.formula = true;
                this.emptyFormula = false;
                (this.$refs.spinOne as any).reset();
                (this.$refs.spinTwo as any).reset();
                (this.$refs.spinThree as any).reset();
                document.getElementById('spin1').style.zIndex = '5';
                document.getElementById('spin2').style.zIndex = '5';
                document.getElementById('spin3').style.zIndex = '5';
                setTimeout(() => {
                    this.formula = false;
                    this.emptyFormula = true;
                }, 2000);
            },

        },
        watch: {
            month: function () {

                (ViewController.getInstance().viewHandler as YdfcViewHandler).mountaion.createCirclePoint(this.month, this.day);
                if ((Math.pow(this.month, 2) + Math.pow(this.day, 2) - 4 * this.year) > 0) {

                    (ViewController.getInstance().viewHandler as YdfcViewHandler).mountaion.createCircleDashLine(this.month, this.day, this.year);
                } else {
                    (ViewController.getInstance().viewHandler as YdfcViewHandler).mountaion.removeCircle();
                }

            },

            day: function () {

                (ViewController.getInstance().viewHandler as YdfcViewHandler).mountaion.createCirclePoint(this.month, this.day);
                if ((Math.pow(this.month, 2) + Math.pow(this.day, 2) - 4 * this.year) > 0) {

                    (ViewController.getInstance().viewHandler as YdfcViewHandler).mountaion.createCircleDashLine(this.month, this.day, this.year);
                } else {
                    (ViewController.getInstance().viewHandler as YdfcViewHandler).mountaion.removeCircle();
                }

            },

            year: function () {

                if ((Math.pow(this.month, 2) + Math.pow(this.day, 2) - 4 * this.year) > 0) {
                    (ViewController.getInstance().viewHandler as YdfcViewHandler).mountaion.createCircleDashLine(this.month, this.day, this.year);
                    (ViewController.getInstance().viewHandler as YdfcViewHandler).mountaion.createCirclePoint(this.month, this.day);
                } else {
                    (ViewController.getInstance().viewHandler as YdfcViewHandler).mountaion.removeCircle();
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

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .title_style {
        width: 336px;
        height: 24px;
        font-size: 24px;
        color: #000000;
        line-height: 24px;
        position: absolute;
        left: 24px;
        top: 24px;
    }

    .formula_Container {
        position: absolute;
        width: 280px;
        height: 130px;
        margin-top: 30px;
    }

    .formulaOne {
        margin-top: 24px;
        margin-left: 24px;
        position: relative;
    }

    .formulaTwo {
        margin-left: 24px;
        margin-top: 24px;
        position: absolute;
    }

    .formulaThree {
        width: 196px;
        height: 60px;
        margin-top: 170px;
        margin-left: 24px;
        position: absolute;
    }

    .formulaFour {
        width: 212px;
        height: 60px;
        margin-top: 230px;
        margin-left: 24px;
        position: absolute;
    }

    .spin_One {
        position: absolute;
        left: 85px;
        top: 20px;
    }

    .spin_Two {
        position: absolute;
        left: 135px;
        top: 20px;
    }

    .spin_Three {
        position: absolute;
        left: 188px;
        top: 20px;
    }

    .arrow_UpImg1 {
        position: absolute;
        width: 40px;
        height: 40px;
        margin-left: 88px;
        margin-top: -120px;
        z-index: 6;
        background-color: #FFFFFF
    }

    .arrow_UpImg2 {

        position: absolute;
        width: 40px;
        height: 40px;
        margin-left: 138px;
        margin-top: -120px;
        z-index: 6;
        background-color: #FFFFFF
    }

    .arrow_UpImg3 {
        position: absolute;
        width: 40px;
        height: 40px;
        margin-left: 191px;
        margin-top: -120px;
        z-index: 6;
        background-color: #FFFFFF
    }

    .arrow_DownImg1 {
        position: absolute;
        width: 40px;
        height: 40px;
        margin-left: 88px;
        margin-top: -50px;
        z-index: 6;
        background-color: #FFFFFF
    }

    .arrow_DownImg2 {
        position: absolute;
        width: 40px;
        height: 40px;
        margin-left: 138px;
        margin-top: -50px;
        z-index: 6;
        background-color: #FFFFFF
    }

    .arrow_DownImg3 {
        position: absolute;
        width: 40px;
        height: 40px;
        margin-left: 191px;
        margin-top: -50px;
        z-index: 6;
        background-color: #FFFFFF
    }

</style>
