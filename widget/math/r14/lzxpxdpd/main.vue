<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <leftAndRightLayout v-bind="layoutOption">
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">两直线平行的判定</span>
                <div style=" width: 100%; height: 100%;">
                    <div  id="3dContainer" style="width: 100%; height: 100%;"></div>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" style="height: 100%">
                    <div class="button_border " style="display:inline-block;width:48px;height:40px;position: absolute;top:20px;right:24px; z-index: 5" id="reset" @click="resetEvent">
                        <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="./../../../../static/images/chongzhi.png" alt="">
                    </div>
                    <div style="width: 100%; height: 100%; position: relative;">
                        <img src="./sub_static/table.png" alt="" style="width: 280px; position: absolute; top: 150px;">
                        <div style="background: #ffffff; width: 95px;height: 25px;position: absolute; top:156px; left: 173px;text-align: center; line-height: 25px;">
                            <span style="font-weight: bold;color: #000000">{{angle}}</span>
                        </div>
                        <div style="background: #FFFFFF; width: 95px;height: 25px;position: absolute; top:193px; left: 173px;text-align: center; line-height: 25px;">
                            <span style="font-weight: bold;color: #000000">{{k1}}</span>
                        </div>
                        <div style="background: #FFFFFF; width: 95px;height: 25px;position: absolute; top:230px; left: 173px;text-align: center; line-height: 25px;">
                            <span style="font-weight: bold;color: #000000">{{k2}}</span>
                        </div>
                        <div style="background: #FFFFFF; width: 95px;height: 25px;position: absolute; top:266px; left: 173px;text-align: center; line-height: 25px;">
                            <span style="font-weight: bold;color: #000000">{{c1}}</span>
                        </div>
                        <div style="background: #FFFFFF; width: 95px;height: 25px;position: absolute; top:303px; left: 173px;text-align: center; line-height: 25px;">
                            <span style="font-weight: bold;color: #000000">{{c2}}</span>
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
    import leftAndRightLayout from '../../../../src/component/layout/leftAndRight_layout.vue';
    import vueSlider from '../../../../src/component/ui/vue2-slider.vue';
    import {LzxpxdpdViewHandler} from './services/LzxpxdpdViewHandler';
    //Returned expression type   is not assignable to type Data
    export default Vue.extend({
        components: {
            vueSlider,
            h_button,
            h_switch,
            leftAndRightLayout
        },
        data() {
            return {
                axiom: false,
                slidernumber1: 0,
                slidernumber2: 0,
                slidernumber3: 0,
                angle: '53.13°',
                k1: '0.75',
                k2: '不存在',
                c1: '3',
                c2: '0',
                layoutOption: {
                    widthClass:'w320'
                },
                sliderOption1: {
                    width: '100%',
                    min: 0,
                    max: 360,
                    piecewise: false,
                    tooltip: false,
                    piecewiseLabel: false,
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
            };
        },
        created() {
            ViewController.getInstance(new LzxpxdpdViewHandler(this));
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted() {
            ViewController.getInstance().domReady();
        },
        methods: {
            resetEvent() {
                (ViewController.getInstance().viewHandler as LzxpxdpdViewHandler).reset();
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


</style>
<style>
    .text_style{
        font-style:  italic;
        font-family: Times New Roman !important;
    }
</style>