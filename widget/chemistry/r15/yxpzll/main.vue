<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" scope="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">四棱锥</span>
                <div style="width: 100%; height: 100%; display: flex">
                    <div  id="3dContainer" style="margin: auto;width: 100%;height: 100%">

                    </div>
                </div>
            </template>
            <template slot="controlPanel" scope="viewBox" slot-scope="controlPanel">

                <div style="width: 200px; height: 100%">
                    <div style="position: absolute; top: 60%; right: calc(50% - 24px)">
                        <div class="backgroundImage">
                            <img src="./sub_static/backgroundImage.png" style="width: 100%"/>
                        </div>

                        <div class="cue_bar">
                            <img src="./sub_static/cueBar.png" style="width: 100%"/>
                        </div>

                        <div class="erect_slider" >
                            <vue-slider ref="slider3" v-model="sliderDotNum"   v-bind="demo2" >
                                <template slot="tooltip" scope="tooltip">
                                    <div class="custom-tooltip">
                                        <img src="./sub_static/image01.png" style="width: 44px;height: 24px;" />
                                    </div>
                                </template>

                                <template slot="label" scope="{ label, active }">
                          <span :class="['thermo-label', { active }]" v-if="label  === 0" style="position: absolute; left: -7px; z-index: 2">
                              <div style="width: 24px;height: 24px;background-color: #56B1FF;border-radius: 50%;">

                              </div>
                          </span>
                                </template>
                            </vue-slider>
                        </div>
                    </div>
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
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue';
    import {FourPyramidViewHandler} from './services/FourPyramidViewHandler';
    import {ViewOption} from '../../../../src/core/CoreInterface';
    let vueSlider = require('vue-slider-component');

    export default Vue.extend({
        components: {
            vueSlider,
            h_button,
            fullScreensLayout,
        },
        data() {
            return{
                sliderDotNum: 20,
                demo2: {

                    width: 10,
                    height: 160,
                    dotSize: 0,
                    eventType: 'auto',
                    min: 0,
                    max: 100,
                    interval: 1,
                    clickable: false,
                    disabled: false,
                    show: true,
                    tooltip: 'always',
                    tooltipDir: 'right',
                    piecewiseLabel: true,
                    style: {
                        display: 'inline-block',
                        marginLeft: '30px'
                    },
                    direction: 'vertical',
                    speed: 0.5,
                    processStyle: {
                        backgroundImage: "-webkit-linear-gradient(top, #f05b72, #3498db)",
                    },

                    piecewise: false,

                    piecewiseStyle: {
                        backgroundColor: '#fff',
                        visibility: 'visible',
                        width: '12px',
                        height: '12px'
                    },

                    sliderStyle: {
                        left: '20px',
                        width: '0px',
                        height: '0px',
                        'box-shadow':'0.5px 0.5px 2px 1px rgba(0,0,0,0)'
                    },

                    bgStyle: {
                        backgroundColor: '#fff',
                    },

                    tooltipStyle: {
                        width: '44px',
                        height:'24px',
                        backgroundColor: '#FFFFFF'
                    },

                },
            };
        },
        computed: {
        },
        created() {
            const viewOption = new ViewOption();
            ViewController.getInstance(new FourPyramidViewHandler(this), viewOption);
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted() {
            ViewController.getInstance().domReady();
        },
        methods: {
            resetEvent() {
                (ViewController.getInstance().viewHandler as FourPyramidViewHandler).fourPyramid.reset();
            },
        },
        watch: {

        }
    });
</script>

<style >
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

    .erect_slider{
        width: 50px;
        height: 200px;
        position: absolute;
        left: 0;
        top: calc(50% - 92px);
    }

    .backgroundImage{
        /*background-image: url('sub_static/backgroundImage.png');*/
        width: 50px;
        height: 200px;
        position: absolute;
        top: calc(50% - 100px);
        left: 10px;
    }

    .cue_bar{
        width: 40px;
        height: 2px;

        position: absolute;
        top: calc(50% - 70px);
        left: 60px;
    }
</style>
