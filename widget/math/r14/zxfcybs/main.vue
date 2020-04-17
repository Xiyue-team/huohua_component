<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <leftAndRightLayout v-bind="layoutOption">
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">直线的方程-一般式</span>
                <div style="width: 100%; height: 100%; display: flex">
                    <div  id="3dContainer" style="margin: auto;width: 100%;height: 100%">
                    </div>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" style="height: 100%">
                    <div class="button_border " style="display:inline-block;width:48px;height:40px;position: absolute;top:20px;right:24px;" id="reset" @click="resetEvent">
                        <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="./../../../../static/images/chongzhi.png" alt="">
                    </div>
                    <div style="width:100%;height: 100%;display: flex">

                        <div class="right_contanier" style="margin-top: 80px">
                            <img src="./sub_static/biaoge.png" class="biaoge_image"/>
                            <div class="fangcheng_text" id="fangchengText" style="">
                                    <span id="numberA">{{numberA}}</span><span v-show="slidernumber1 != 0" class="text_roman" id="numberX">x</span>

                                    <span id="numberB">{{numberBToStr}}</span><span v-show="slidernumber2 != 0" class="text_roman" id="numberY">y</span>

                                    <span id="numberC" style="display: inline-block;">{{numberCToStr}}</span>
                                    <span id="numberOne" >{{numberOne}}</span>
                                </div>
                                <div class="xieli_text" id="xieliText" style="">
                                    <span>{{xielv}}</span>
                                </div>
                                <div class="xieju_text" id="xiejuText" style="">
                                    <span>{{jieju}}</span>
                                </div>
                                <div style="margin-top: 0px">

                                    <span class="text_style" style="font-size: 20px; margin-top: 10px; display: inline-block; padding-left: 10px">A</span>
                                    <vue-slider ref="slider1th" v-model="slidernumber1" v-bind="sliderOption1" style="">
                                    </vue-slider>

                                    <span class="text_style"style="font-size: 20px; margin-top: 63px; display: inline-block; padding-left: 10px">B</span>
                                    <vue-slider ref="slider1th" v-model="slidernumber2" v-bind="sliderOption1" style="">
                                    </vue-slider>

                                    <span class="text_style" style="font-size: 20px; margin-top: 63px; display: inline-block; padding-left: 10px">C</span>
                                    <vue-slider ref="slider1th" v-model="slidernumber3" v-bind="sliderOption1" style="">
                                    </vue-slider>

                                </div>
                        </div>
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
    import {LineEquationViewHandler} from './services/LineEquationViewHandler';
    export default Vue.extend({
        components: {
            vueSlider,
            h_button,
            h_switch,
            leftAndRightLayout
        },
        data() {
            return{
                layoutOption: {
                  widthClass: 'w320'
                },
                axiom: false,
                jieju:'0',
                xielv:'1',
                numberA:'',
                numberB:'-',
                numberC: '',
                numberOne: '=0',
                slidernumber1:1,
                slidernumber2:-1,
                slidernumber3:0,
                sliderOption1:{
                    width: '85%',
                    min: -10,
                    max: 10,
                    piecewise: false,
                    tooltip: 'always',
                    piecewiseLabel: false,
                    piecewiseStyle: {
                        "backgroundColor": "#ccc",
                        "visibility": "visible",
                        "width": "12px",
                        "height": "12px"
                    },
                    piecewiseActiveStyle: {
                        "backgroundColor": "#3498db"
                    },
                    style: {
                        'marginTop': '-50px',
                        'marginLeft': '40px',
                    }
                },
            };
        },
        computed: {
          numberBToStr: function() {
              if(this.slidernumber1 != 0 && this.slidernumber2 > 0) {
                  return "+" + this.numberB;
              } else {
                  return this.numberB;
              }
          },

            numberCToStr: function () {
                if ( (this.slidernumber1 == 0 && this.slidernumber2 == 0 ) ) {
                    return '';
                } else {
                    if (this.slidernumber3 > 0) {
                        return '+' + this.numberC;
                    }
                    return this.numberC;
                }
            }
        },
        created() {
           ViewController.getInstance(new LineEquationViewHandler(this));
           ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted() {
           ViewController.getInstance().domReady();
        },
        methods: {
            resetEvent() {
              this.slidernumber1 = 1;
              this.slidernumber2 = -1;
              this.slidernumber3 = 0;
             (ViewController.getInstance().viewHandler as LineEquationViewHandler).reset();
            },
        },
        watch: {
            //拖动滑条触发
            //滑条A
            slidernumber1: function (slidernumber1: number) {
                    if(slidernumber1 === 0) {
                        this.numberA = '';
                    } else if (slidernumber1 === -1) {
                        this.numberA = '-'
                    } else if (slidernumber1 === 1) {
                        this.numberA = '';
                    } else if (slidernumber1 > 1 || slidernumber1 < -1) {
                        this.numberA = slidernumber1 + '';
                    }
                    this.numberOne = '=0';
                (ViewController.getInstance().viewHandler as LineEquationViewHandler).slider1Event(this.slidernumber1, this.slidernumber2, this.slidernumber3);
            },
            //滑条B
            slidernumber2: function ( slidernumber2: number) {

                if (slidernumber2 === 0) {
                    this.numberB = '';
                } else if (slidernumber2 === 1) {
                    this.numberB = '';
                } else if(slidernumber2 === -1) {
                    this.numberB = '-';
                } else if (slidernumber2 > 1) {
                    this.numberB = slidernumber2 + '';
                } else if(slidernumber2 < 1) {
                    this.numberB = slidernumber2 + '';
                }
                this.numberOne = '=0';
               (ViewController.getInstance().viewHandler as LineEquationViewHandler).slider1Event(this.slidernumber1, this.slidernumber2, this.slidernumber3 );
            },
            //滑条C
            slidernumber3: function ( slidernumber3: number) {
                    if (slidernumber3 === 0) {
                        this.numberC = '';
                    } else if (slidernumber3 > 0 ) {
                        this.numberC = slidernumber3 + '';
                    } else if (slidernumber3 < 0) {
                        this.numberC = slidernumber3 + '';
                    }
                this.numberOne = '=0';
               (ViewController.getInstance().viewHandler as LineEquationViewHandler).slider1Event(this.slidernumber1, this.slidernumber2, this.slidernumber3 );
            }

        }
    });
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
    .text_style{
        font-size: 16px;
        color: #4D4D4D;
        line-height: 16px;
        text-align: center;
        display: block;
        margin-bottom: 28px;
    }


    .text_roman{
        font-style: italic;
        font-family: "Times New Roman";
        color: #000000;
        font-size: 18px;
    }

    .fangcheng_text{
        z-index: 4;
        position: relative;
        top: -105px;
        left: 140px;
        background: #FFFFFF;
        width: 120px;
        height: 22px;
        text-align: center;
        color: #000000;
    }

    .xieli_text{
        z-index: 4;
        position: relative;
        top: -89px;
        left: 150px;
        background: #FFFFFF;
        width: 100px;
        height: 24px;
        text-align: center;
        color: #000000;
        line-height: 25px;
    }

    .xieju_text{
        z-index: 4;
        position: relative;
        top: -79px;
        left: 150px;
        background: #FFFFFF;
        width: 100px;
        height: 24px;
        text-align: center;
        color: #000000;
        line-height: 25px;
    }

    .right_contanier {
        width: 280px;
        height: 147px;
    }

    .biaoge_image{
        width: 280px;
        height: 147px
    }
</style>
<style>
    .text_style{
        font-style:  italic;
        font-family: Times New Roman !important;
    }
</style>
