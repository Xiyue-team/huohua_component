<template>
    <div class="aspectration bg_white covered root_div_container ">
        <fullScreens_layout>
            <template slot="viewBox" slot-scope="viewBox">
                <div style="width: 100%; height: 100%; position: absolute; background-color: #2d2d2d"
                     @click="hideArea">
                    <span class="title_induction">{{lang.title}}</span>
                    <div id="zbz" style="position: absolute; width: 100%; height: 100%; ">
                    </div>

                    <div class="controllerPart">
                        <i_button class="btna" :title="lang.buttonTitle1" v-bind:isActive.sync="isActive1"
                                  v-bind:clickNumber.sync="clickNumber1" :fontsize="4"
                                  @click.native="buttonClickEvent1">
                        </i_button>
                        <i_button class="btnb" :title="lang.buttonTitle2" v-bind:isActive.sync="isActive2"
                                  v-bind:clickNumber.sync="clickNumber2" @click.native="buttonClickEvent2">
                        </i_button>
                        <div v-show="slider2Show">
                            <img src="./sub_static/brace.png" class="symbol">
                        </div>
                        <div class="t_xa" v-show="slider1Show">
                            <input type="text" value="x"
                                   class="t_xa_x" disabled="disabled" style="cursor: auto">
                        </div>


                        <div class="select_Container checkBox1 " style="position: absolute;"
                             v-show="slider1Show" @click.stop="listLeftArea">
                            <div class="select_left">
                                <div class="border_text" v-model="defaultSymbolLeft">
                                    {{defaultSymbolLeft}}
                                </div>
                            </div>
                            <div class="select_right">
                                <img src="./sub_static/select.png" style="width: 9px;height: 7px;"
                                     ondragstart="return false;" alt="">
                            </div>
                        </div>
                        <div class="select1_list" v-show="list1show">
                            <ul class="member_ul">
                                <li><a @click="changeSymbolLeft('>', 0)"> ></a></li>
                                <li><a @click="changeSymbolLeft('<', 1)"> <</a></li>
                                <li><a @click="changeSymbolLeft('≥', 2)"> ≥</a></li>
                                <li><a @click="changeSymbolLeft('≤', 3)"> ≤</a></li>
                            </ul>
                        </div>


                        <div class="t_xb" v-show="slider1Show">
                            <input type="text" value="a"
                                   class="t_xb_a" disabled="disabled" style="cursor: auto">
                        </div>
                        <div class="t_xaa" v-show="slider2Show">
                            <input type="text" value="x"
                                   class="t_xaa_x" disabled="disabled" style="cursor: auto">
                        </div>


                        <div class=" select_Container checkBox2  " style="position: absolute;"
                             v-show="slider2Show" @click.stop="listRightArea">
                            <div class="select_left">
                                <div class="border_text" v-model="defaultSymbolRight">
                                    {{defaultSymbolRight}}
                                </div>
                            </div>
                            <div class="select_right">
                                <img src="./sub_static/select.png" style="width: 9px;height: 7px;"
                                     ondragstart="return false;" alt="">
                            </div>
                        </div>
                        <div class="select2_list" v-show="list2show">
                            <ul class="member_ul">
                                <li><a @click="changeSymbolRight('<', 0)"> <</a></li>
                                <li><a @click="changeSymbolRight('>', 1)"> ></a></li>
                                <li><a @click="changeSymbolRight('≤', 2)"> ≤</a></li>
                                <li><a @click="changeSymbolRight('≥', 3)"> ≥</a></li>
                            </ul>
                        </div>


                        <div class="t_xbb" v-show="slider2Show">
                            <input type="text" value="b"
                                   class="t_xbb_b" disabled="disabled" style="cursor: auto">
                        </div>


                        <div class="text1" v-show="slider1Show">
                            <input type="text" value="a"
                                   class="text1_a" disabled="disabled" style="cursor: auto">
                        </div>
                        <div class="slider1" v-show="slider1Show">
                            <vueSlider
                                    v-model="sliderValueLeft"
                                    v-bind="sliderOption1">
                            </vueSlider>
                        </div>
                        <div class="text2" v-show="slider2Show">
                            <input type="text" value="b"
                                   class="text2_b" disabled="disabled" style="cursor: auto">
                        </div>
                        <div class="slider2" v-show="slider2Show">
                            <vueSlider
                                    v-model="sliderValueRight"
                                    class="sliderOption1"
                                    v-bind="sliderOption2">
                            </vueSlider>
                        </div>
                    </div>
                </div>
            </template>
        </fullScreens_layout>
    </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import fullScreens_layout from '../../../../src/component/layout/fullScreens_layout.vue';
    import {ViewModel} from './ViewModel';
    import Component from 'vue-class-component';
    import 'vue-slider-component/dist-css/vue-slider-component.css';
    import 'vue-slider-component/theme/default.css';
    // import buttonPrimary from '../../../../src/component/ui/buttonPrimary';
    import i_button from './buttonInXAxis.vue';
    import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common.js';


    @Component({
        components: {
            fullScreens_layout,
            vueSlider,
            i_button,
            // buttonEllipse
        },
        mixins: [ViewModel]
    })
    export default class App extends Vue {
    }
</script>

<style scoped='scoped'>
    ul {
        padding: 0;
        margin: 0;
        height: 72px;
    }

    ul li {
        list-style-type: none;
        text-align: center;
        color: #FFFFFF;
        font-size: 16px;
        line-height: 18px;
    }

    .border_text {
        font-size: 16px;
        background-color: transparent;
        color: #FFFFFF;
    }


    .text2_b {
        font-size: 22px;
        background-color: transparent;
        font-family: 'Times New Roman';
        font-style: italic;
        color: #FFFFFF
    }

    .text1_a {
        font-size: 22px;
        background-color: transparent;
        font-family: 'Times New Roman';
        font-style: italic;
        color: #FFFFFF
    }

    .t_xbb_b {
        font-size: 22px;
        background-color: transparent;
        font-family: 'Times New Roman';
        font-style: italic;
        color: #FFFFFF
    }

    .t_xaa_x {
        font-size: 22px;
        background-color: transparent;
        font-family: 'Times New Roman';
        font-style: italic;
        color: #FFFFFF
    }

    .t_xb_a {
        font-size: 22px;
        background-color: transparent;
        font-family: 'Times New Roman';
        font-style: italic;
        color: #FFFFFF;
    }

    .t_xa_x {
        font-size: 22px;
        background-color: transparent;
        font-family: 'Times New Roman';
        font-style: italic;
        color: #FFFFFF
    }

    .title_induction {
        width: 100%;
        font-family: PingFangSC-Medium;
        font-size: 28px;
        color: #ffffff;
        line-height: 28px;
        position: absolute;
        left: 32px;
        top: 32px;
        z-index: 99;
    }

    .controllerPart {
        position: absolute;
        width: 220px;
        height: 330px;
        bottom: 19%;
        right: 2%;
    }

    .btna {
        position: absolute;
        width: 100px;
        height: 44px;
        top: 0;
        left: 5px;
        font-size: 16px
    }

    .btnb {
        position: absolute;
        width: 100px;
        height: 44px;
        top: 0;
        right: 0;
        font-size: 16px;
    }

    .symbol {
        position: absolute;
        width: 20px;
        height: 88px;
        top: 85px;
        right: 140px;
    }

    .t_xa {
        position: absolute;
        width: 21px;
        height: 25px;
        top: 84px;
        right: 113px;
    }

    .t_xb {
        position: absolute;
        width: 21px;
        height: 25px;
        top: 84px;
        right: 35px;
    }

    .checkBox1 {
        position: absolute;
        top: 84px;
        right: 60px;
    }

    .select1_list {
        position: absolute;
        width: 33px;
        height: 72px;
        top: 118px;
        right: 81px;
        border-radius: 4px;
        opacity: 1;
        background-color: black;
        z-index: 9;
        cursor: pointer;
    }

    .checkBox2 {
        position: absolute;
        top: 145px;
        right: 60px;
    }

    .select2_list {
        position: absolute;
        width: 33px;
        height: 72px;
        top: 179px;
        right: 81px;
        border-radius: 4px;
        opacity: 1;
        background-color: black;
        position: absolute;
        z-index: 9;
        cursor: pointer;
    }

    .t_xaa {
        position: absolute;
        width: 21px;
        height: 25px;
        top: 143px;
        right: 113px;
    }

    .t_xbb {
        position: absolute;
        width: 21px;
        height: 25px;
        top: 145px;
        right: 35px;
    }

    .text1 {
        position: absolute;
        top: 221px;
        font-size: 22px;
    }

    .slider1 {
        position: absolute;
        top: 221px;
        width: 200px;
        height: 43px;
        left: 25px;
    }


    .text2 {
        position: absolute;
        top: 282px;
        font-size: 22px;
    }

    .slider2 {
        position: absolute;
        top: 282px;
        width: 200px;
        height: 43px;
        left: 25px;
    }

    .select_Container {
        width: 54px;
        height: 24px;
        background: rgba(81, 81, 81, 0.50);
        border: 1px solid rgba(255, 255, 255, 0.15);
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.20);
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .select_left {
        height: 24px;
        width: 33px;
        font-size: 16px;
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .select_right {
        width: 21px;
        height: 24px;
        background: rgba(81, 81, 81, 0.50);
        border: 1px solid rgba(255, 255, 255, 0.15);
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.20);
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media screen and (min-width: 1700px) {
    }

    @media screen and (min-width: 1200px) {

    }

    @media screen and (max-width: 900px) {
        ul {
            padding: 0;
            margin: 0;
            height: 72px;
        }

        ul li {
            list-style-type: none;
            text-align: center;
            color: #FFFFFF;
            font-size: 13px;
            line-height: 15px;
        }

        .select_Container {
            width: 46px;
            height: 20px;
            background: rgba(81, 81, 81, 0.50);
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.20);
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        .select_left {
            height: 20px;
            width: 28px;
            font-size: 16px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .select_right {
            width: 18px;
            height: 20px;
            background: rgba(81, 81, 81, 0.50);
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.20);
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .select1_list {
            position: absolute;
            width: 28px;
            height: 60px;
            top: 68px;
            right: 52px;
            border-radius: 4px;
            opacity: 1;
            background-color: black;
            z-index: 9;
        }

        .select2_list {
            position: absolute;
            width: 28px;
            height: 60px;
            top: 113px;
            right: 52px;
            border-radius: 4px;
            opacity: 1;
            background-color: black;
            z-index: 9;
        }

        .border_text {
            font-size: 16px;
            background-color: transparent;
            color: #FFFFFF;
        }

        .title_induction {
            font-size: 20px;
            left: 10px;
            top: 10px;
        }

        .controllerPart {
            position: absolute;
            width: 120px;
            height: 140px;
            bottom: 33%;
            right: 2%;
        }

        .checkBox1 {
            position: absolute;
            top: 41px;
            right: 32px;
        }

        .checkBox2 {
            position: absolute;
            top: 85px;
            right: 32px;
        }


        .btna {
            position: absolute;
            width: 54px;
            height: 26px;
            top: 0;
            left: 3px;
            font-size: 10px;
        }

        .btnb {
            position: absolute;
            width: 54px;
            height: 26px;
            top: 0;
            right: 0;
            font-size: 10px;
        }

        .symbol {
            position: absolute;
            width: 13px;
            height: 68px;
            top: 41px;
            right: 105px;
            font-size: 20px;
        }

        .t_xa {
            position: absolute;
            width: 15px;
            height: 18px;
            top: 39px;
            right: 85px;
        }

        .t_xb {
            position: absolute;
            width: 15px;
            height: 18px;
            top: 39px;
            right: 14px;
        }

        .t_xaa {
            position: absolute;
            width: 15px;
            height: 18px;
            top: 84px;
            right: 85px;
        }

        .t_xbb {
            position: absolute;
            width: 15px;
            height: 17px;
            top: 85px;
            right: 14px;
        }

        .text2_b {
            font-size: 18px;
            background-color: transparent;
            font-family: 'Times New Roman';
            font-style: italic;
            color: #FFFFFF
        }

        .text1_a {
            font-size: 18px;
            background-color: transparent;
            font-family: 'Times New Roman';
            font-style: italic;
            color: #FFFFFF
        }

        .t_xbb_b {
            font-size: 18px;
            background-color: transparent;
            font-family: 'Times New Roman';
            font-style: italic;
            color: #FFFFFF
        }

        .t_xaa_x {
            font-size: 18px;
            background-color: transparent;
            font-family: 'Times New Roman';
            font-style: italic;
            color: #FFFFFF
        }

        .t_xb_a {
            font-size: 18px;
            background-color: transparent;
            font-family: 'Times New Roman';
            font-style: italic;
            color: #FFFFFF;
        }

        .t_xa_x {
            font-size: 18px;
            background-color: transparent;
            font-family: 'Times New Roman';
            font-style: italic;
            color: #FFFFFF
        }

        .text1 {
            position: absolute;
            width: 15px;
            height: 17px;
            top: 137px;
            margin-right: 6px;
        }

        .slider1 {
            position: absolute;
            top: 140px;
            width: 130px;
            height: 33px;
            left: 20px;
        }

        .text2 {
            position: absolute;
            top: 195px;
            width: 15px;
            height: 17px;
            font-size: 22px;
            margin-right: 6px;
        }

        .slider2 {
            position: absolute;
            top: 196px;
            width: 130px;
            height: 33px;
            left: 20px;
        }

        @media screen and (min-width: 768px) {

        }

        @media screen and (min-width: 600px) {

        }
    }
</style>
<style>

    #box {
        position: absolute;
        z-index: 98;
    }

    .control-panel_div_floatRight {
        display: none;
    }

    #container {
        position: absolute;
        z-index: 98;
    }

    #reset {
        z-index: 99;
    }

    canvas {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
</style>
