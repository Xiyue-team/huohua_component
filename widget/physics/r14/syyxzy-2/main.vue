<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">发声扬声器旁的烛焰</span>
                <!--音量滑动杆-->
                <div class='volumeSlider_item' style="left: calc(50% - 210px);">
                    <img src="./sub_static/reduce_volume.png" style="width:23px; height:16px;margin-top: 14px">
                    <div style="margin-top: 7px">
                        <vue-slider ref="slider1th" v-model="sliderNumber1" v-bind="sliderOption1" style="margin-bottom: 0px"></vue-slider>
                    </div>
                    <img src="./sub_static/add_volume.png" style="width: 23px;height:16px;margin-top: 14px">
                </div>

                <div style="width: 100%;height: 100%; display: flex; position: absolute">
                    <div id="ios_audioMask" class="audioMask_item"  v-show="isShow">
                        <img id='ios_audioPlayBtn' @click="playSound" class="audioPlay_Btn"
                             src="./sub_static/ios_audioPlay@2x.png"/>
                    </div>

                    <div  id="3dContainer" style=" width: 420px; height: 340px; display:flex;margin: auto">

                        <div id="audioCanvas" style="height:100%; width:50%;float:left;">
                            <div  id="3dModel" class="model3d_content" style="width:100%; height: 100%"></div>
                        </div>

                        <div id="candle_flame" style="width:50%; height:100%;float: left">
                            <div id='candle' class="candle_item">
                                <div class='flame' ></div>
                                <div class='flame' ></div>
                                <div class='flame' ></div>
                                <div class='flame' ></div>
                                <div class='flame' ></div>
                            </div>
                        </div>
                    </div>
                </div>

            </template>
        </fullScreensLayout>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import './sub_static/css/flame.css';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import {ViewController} from '../../../../src/core/ViewController';

    import h_button from '../../../../src/component/ui/button.vue';
    import h_switch from '../../../../src/component/ui/switch.vue';
    import leftAndRightLayout from '../../../../src/component/layout/leftAndRight_layout.vue'
    import fullScreensLayout from '../../../../src/component/layout/fullScreens_layout.vue'
    import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
    import {VolumeViewHandle} from "./services/VolumeViewHandle";
    import {FlameControl} from "./services/FlameControl";
    import {ViewOption} from "../../../../src/core/CoreInterface";

    export default Vue.extend({
        components: {
            vueSlider,
            h_button,
            h_switch,
            leftAndRightLayout,
            fullScreensLayout
        },
        data() {
            return{
                isShow: false,
                axiom: false,
                sliderNumber1:0,
                flameControl:new FlameControl(),
                sliderOption1:{
                    width:'370px',
                    min:0,
                    max:10,
                    piecewise: false,
                    tooltip: 'always',
                    piecewiseLabel: false,
                    speed: 0.5,
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
            };
        },
        created() {
            const viewOption = new ViewOption();
            viewOption.showMobileExpandIco = false;
            ViewController.getInstance(new VolumeViewHandle(this), viewOption);
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted() {
            ViewController.getInstance().domReady();
            this.sliderNumber1 = 2;
        },
        methods: {
            resetEvent(){
                this.sliderNumber1 = 2;
                (ViewController.getInstance().viewHandler as VolumeViewHandle).reset();
            },
            playSound() {
              this.isShow = false;
              (ViewController.getInstance().viewHandler as any).gltf.playSound();
            }
        },
        watch: {
            sliderNumber1: function (sliderNumber1: number) {
                this.flameControl.changeStatus(sliderNumber1);
                (ViewController.getInstance().viewHandler as any).gltf.changeVolume(sliderNumber1);

            }
        }
    });
</script>

<style>
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
        z-index: 10;
    }
    .img_style{
        position: absolute;
        top: calc(50% + 40px);
        /*left: 17px;*/
        font-size: 16px;
        font-family: '宋体';
        color: #000000;
    }
    .background_scale{
        background: #FFFFFF;
        border: 0 solid rgba(0,0,0,0.10);
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
        border-radius: 6px;
        margin-top: 180px;
    }
    .text_style{
        font-size: 16px;
        color: #4D4D4D;
        line-height: 16px;
        text-align: center;
        display: block;
        margin-bottom: 21px;
    }

    .control-panel_div_floatRight {
        display: none;
    }
    #expandBtn{
        display:none;
    }


</style>
<style>
    .text_style{
        font-style:  italic;
        font-family: Times New Roman !important;
    }
</style>