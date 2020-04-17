<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <leftAndRightLayout>
            <template slot="viewBox" scope="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">全屏布局Demo</span>
                <div style="width: 100%; height: 100%; display: flex">
                    <div  id="3dContainer" style="margin: auto;width: 100%;height: 100%">

                    </div>
                </div>
            </template>
            <template slot="controlPanel" scope="viewBox" slot-scope="controlPanel">
                <div id="controlPanel" style="height: 100%">
                    <div class="button_border " style="display:inline-block;width:48px;height:40px;position: absolute;top:20px;right:24px;" id="reset">
                        <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="./../../../../static/images/chongzhi.png" alt="" @click="resetEvent">
                    </div>

                    <div class="control-block_div_border" style="margin-top:50px;height: 200px">
                        <vue-slider ref="slider4" v-model="sliderNum4" v-bind="sliderMathOption" style="margin:0 auto;position: relative;top:40%;">
                            <template slot="label" scope="{ label, active,index }">
                                <span :class="['custom-label', { active }]" v-if="index === 0">左</span>
                                <span :class="['custom-label', { active }]" v-if="index === 4">平移</span>
                                <span :class="['custom-label', { active }]" v-if="index === 8">右</span>
                            </template>
                        </vue-slider>
                    </div>

                    <label class="control-block_div_border " style="margin-top:20px;">
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
    import leftAndRightLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import {FullScreensViewHandler} from './services/FullScreensViewHandler';
    import {SliderConfig} from '../../../../src/config/SliderConfig';
    import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
    import seletIos from '../../../../src/component/ui/select.vue';

    export default Vue.extend({
        components: {
            vueSlider,
            h_button,
            h_switch,
            leftAndRightLayout,
            seletIos
        },
        data() {
            return{
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
                    width: 200,
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
                        'backgroundColor': '#ccc',
                        'visibility': 'visible',
                        'width': '12px',
                        'height': '12px'
                    },
                    piecewiseActiveStyle: {
                        'backgroundColor': '#3498db'
                    },
                    labelActiveStyle: {
                        'color': '#3498db'
                    }
                },
                slidernumber1: 1,
                slidernumber2: -1,
                slidernumber3: 0,
                sliderOption1: {
                    width: '85%',
                    min: -10,
                    max: 10,
                    piecewise: false,
                    tooltip: 'always',
                    piecewiseLabel: false,
                    piecewiseStyle: {
                        'backgroundColor': '#ccc',
                        'visibility': 'visible',
                        'width': '12px',
                        'height': '12px'
                    },
                    piecewiseActiveStyle: {
                        'backgroundColor': '#3498db'
                    },
                    style: {
                        'marginTop': '-50px',
                        'marginLeft': '40px',
                    }
                },
                listData: Array.from({length: 12}, (value, index) => 1 + index),
                month: 2,
                Hidden: true,
            };
        },
        computed: {
        },
        created() {
           ViewController.getInstance(new FullScreensViewHandler(this));
           ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted() {
          ViewController.getInstance().domReady();
        },
        methods: {
            resetEvent() {

                (ViewController.getInstance().viewHandler as FullScreensViewHandler).reset();
            },

            showSelect() {
                this.Hidden = true;
            },

            showHidden() {
                this.Hidden = true;
            },
        },
        watch: {
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

</style>
