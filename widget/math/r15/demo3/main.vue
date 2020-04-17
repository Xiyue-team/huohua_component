<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <leftAndRightLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">左右布局Demo</span>
                <div style="width: 100%; height: 100%; display: flex">
                    <div id="3dContainer" style="margin: auto;width: 100%;height: 100%">

                    </div>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" style="height: 100%">
                    <div class="button_border "
                         style="display:inline-block;width:48px;height:40px;position: absolute;top:20px;right:24px;"
                         id="reset">
                        <img style="width: 24px;  margin-top: 8px;margin-left: 12px"
                             src="./../../../../static/images/chongzhi.png" alt="" @click="resetEvent">
                    </div>

                    <h_button title="测试按钮"></h_button>

                    <!--<div class="control-block_div_border top_buttom_slider" style="margin-top:10px;">-->
                    <!--<vue-slider ref="slider" v-model="sliderNum" v-bind="demo2"   ></vue-slider>-->
                    <!--</div>-->

                    <div class="control-block_div_border" style="margin-top:10px;height: 200px">
                        <vue-slider ref="slider4" v-model="sliderNum4" v-bind="sliderMathOption"
                                    style="margin:0 auto;position: relative;top:60px;">
                            <template slot="label" scope="{ label, active,index }">
                                <span :class="['custom-label', { active }]" v-if="index === 0">左</span>
                                <span :class="['custom-label', { active }]" v-if="index === 4">平移</span>
                                <span :class="['custom-label', { active }]" v-if="index === 8">右</span>
                            </template>
                        </vue-slider>
                    </div>


                    <div class="control-block_div_border switch" style="margin-top:10px;">
                        <input type="checkbox" name="checkbox-cats[]" id="checkbox-1" value="1" checked>
                        <label for="checkbox-1">状态开关</label>
                    </div>

                    <br>

                    <label class="control-block_div_border " style="margin-top:10px;">
                        <input class="radio-default" type="radio" id="test1" name="radio-group" checked><label
                            for="test1">单选A</label>
                    </label>

                    <label class="control-block_div_border " style="margin-top:10px;">
                        <input class="radio-default" type="radio" id="test2" name="radio-group" checked><label
                            for="test2">单选B</label>
                    </label>


                    <div class="control-block_div_border" style="margin-top:10px;">
                        <label class="label-checkbox">One
                            <input type="checkbox">
                            <span class="checkmark"></span>
                        </label>
                    </div>

                    <div class="control-block_div_border " style="margin-top:10px;">
                        <span style="display: inline-block;width: 100%;font-size: 16px;text-align: center;">烧杯内溶液</span>
                        <input class="radio-default" type="radio" id="a1" name="radio-group" checked><label for="a1"
                                                                                                            style="display: block;margin-top: 18px;">清水</label>
                        <input class="radio-default" type="radio" id="a2" name="radio-group" checked><label for="a2"
                                                                                                            style="display: block;margin-top: 18px;">低浓度蔗糖溶液</label>
                        <input class="radio-default" type="radio" id="a3" name="radio-group" checked><label for="a3"
                                                                                                            style="display: block;margin-top: 18px;">高浓度蔗糖溶液</label>
                        <input class="radio-default" type="radio" id="a4" name="radio-group" checked><label for="a4"
                                                                                                            style="display: block;margin-top: 18px;">低浓度葡萄糖溶液</label>
                    </div>

                    <div class="control-block_div_border " style="margin-top:10px;">
                        <span style="display: inline-block;width: 100%;font-size: 16px;text-align: center;">氢键作用力</span>
                        <br/> <br/>

                        <label for="b1" style="display: inline-block;">
                            <label for="b1" style="margin-left: 5px;">弱</label>
                            <input class="radio-default" type="radio" id="b1" name="radio-group" checked><label for="b1"
                                                                                                                style="display: table-cell;vertical-align: middle;height: 24px;"></label>
                        </label>

                        <label for="b2" style="display: inline-block;margin-left: calc(30% - 19px);">
                            <label for="b2" style="margin-left: 5px;">中</label>
                            <input class="radio-default" type="radio" id="b2" name="radio-group" checked><label for="b2"
                                                                                                                style="display: table-cell;vertical-align: middle;height: 24px;  "></label>
                        </label>

                        <label for="b3" style="display: inline-block;float:right;">
                            <label for="b3" style="margin-left: 5px;">强</label>
                            <input class="radio-default" type="radio" id="b3" name="radio-group" checked><label for="b3"
                                                                                                                style="display: table-cell;vertical-align: middle;height: 24px;"></label>
                        </label>
                    </div>
                    <br><br>

                    <div style="height:160px;">
                        <div style="display:inline-block;float:left;">
                            <label style="display: block;text-align: center;margin-bottom:20px;">父本</label>
                            <div class="button_border" style="width:75px;height:75px;margin-bottom:10px;">
                                <img style="width:100%;height:100%"
                                     src="http://huohua-component.oss-cn-hangzhou.aliyuncs.com/widget/4c65c5e225953126b6d08e40d39f62b9_unzip/static/img/parent3.png"
                                     alt="">
                            </div>
                            <label style="display: block;text-align: center;">rryy</label>
                        </div>

                        <div style="display:inline-block;float:right;">
                            <label style="display: block;text-align: center;margin-bottom:20px;">母本</label>
                            <div class="button_border" style="width:75px;height:75px;margin-bottom:10px;">
                                <img style="width:100%;height:100%"
                                     src="http://huohua-component.oss-cn-hangzhou.aliyuncs.com/widget/4c65c5e225953126b6d08e40d39f62b9_unzip/static/img/parent1.png"
                                     alt="">
                            </div>
                            <label style="display: block;text-align: center;">RRYY</label>
                        </div>
                    </div>

                    <div class="top arrow_box">
                        <div>提示框</div>
                    </div>
                    <br><br>
                    <br><br>
                    <div class="bottom arrow_box">
                        <div>提示框</div>
                    </div>
                    <br><br>
                    <div class="left arrow_box" style="width:50%;">
                        <div>提示框</div>
                    </div>
                    <br><br>
                    <div class="right arrow_box" style="width : 50%;">
                        <div>提示框</div>
                    </div>
                    <br><br>

                    <!--<div @click="showSelect" style="font-size: 20px; position: absolute; left: 200px; top: 200px;">{{month}}</div>-->
                    <!--<div style="position: absolute; left: 150px; top: 150px;" >-->
                    <!--<selet-ios :listData="listData" v-model="month" :parentHidden="Hidden"-->
                    <!--v-on:show="showHidden" type="other">-->
                    <!--</selet-ios>-->
                    <!--</div>-->
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
    import {LeftAndRightViewHandler} from './services/leftAndRightViewHandler';
    import {SliderConfig} from '../../../../src/config/SliderConfig';
    import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
    // import seletIos from '../../../../src/component/ui/select.vue';

    export default Vue.extend({
        components: {
            vueSlider,
            h_button,
            h_switch,
            leftAndRightLayout,
            // seletIos
        },
        data() {
            return {
                switchOption: {
                    id: 'openSwitch',
                    title: '开关',
                    value: true,
                    direction: 'left'
                },
                sliderNum: 40,
                sliderOption: SliderConfig,
                sliderDotNum: 20,
                tooltipStyle: {
                    'backgroundColor': '#666',
                    'borderColor': '#666'
                },
                sliderNums: [30, 80],
                pointArry: [40, 60, 80, 100],
                sliderNum4: 0,
                sliderMathOption: {
                    width: '80%',
                    data: [
                        4, 3, 2, 1, 0, 1, 2, 3, 4
                    ],
                    piecewise: true,
                    piecewiseLabel: true,
                    piecewiseStyle: {
                        'backgroundColor': '#ccc',
                        'visibility': 'visible',
                        'width': '12px',
                        'height': '12px'
                    },
                    piecewiseActiveStyle: {
                        'backgroundColor': '#3498db'
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
                    piecewise: false,
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
                        'backgroundColor': '#ccc',
                        'visibility': 'visible',
                        'width': '12px',
                        'height': '12px',
                    },
                    piecewiseActiveStyle: {
                        'backgroundColor': '#3498db'
                    },
                    labelActiveStyle: {
                        'color': '#3498db'
                    }
                },
                // listData: Array.from({length: 12}, (value, index) => 1 + index),
                // month: 2,
                // Hidden: true,
            };
        },
        computed: {},
        created() {
            ViewController.getInstance(new LeftAndRightViewHandler(this));
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted() {
            ViewController.getInstance().domReady();
        },
        methods: {
            resetEvent() {

                (ViewController.getInstance().viewHandler as LeftAndRightViewHandler).reset();
            },

            // showSelect() {
            //     this.Hidden = true;
            // },
            //
            // showHidden(content: any) {
            //     this.Hidden = true;
            // },
        },
        watch: {}
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

    /*.top_buttom_slider{*/
    /*width: 40%;*/
    /*}*/

</style>
