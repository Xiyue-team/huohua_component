<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <leftAndRightLayout v-bind="layoutOption" >
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">两直线垂直的判定</span>
                <div style="width: 100%; height: 100%; display: flex">
                    <div  id="3dContainer" style="margin: auto;width: 100%;height: 100%">
                    </div>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel" style="height: 100%">
                    <div class="button_border " style="display:inline-block;width:48px;height:40px;position: absolute;top:20px;right:24px;" id="reset"  @click="resetEvent">
                        <img style="width: 24px;  margin-top: 8px;margin-left: 12px" src="./../../../../static/images/chongzhi.png" alt="">
                    </div>
                    <div style="display: flex;height: 100%">
                        <div style="margin-top: 90px;width:280px;height: 147px">
                            <img src="./sub_static/czbiaoge.png" style="width: 280px;height: 147px;"/>
                        </div>
                        <div style="position: absolute">
                            <div class="line_jAngle" id="line_jAngle">{{jangle}}{{dunumber}} </div>
                            <div class="xielv_1" id="xielv_1">{{xielv1}}</div>
                            <div class="xielv_2" id="xielv_2">{{xielv2}}</div>
                            <div class="xielv_chenji" id="xielv_chenji">{{xielvchenji}}</div>
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
    import {LineVerticalViewHandler} from "./services/LineVerticalViewHandler";
    export default Vue.extend({
        components: {
            h_button,
            h_switch,
            leftAndRightLayout
        },
        data() {
            return{
                layoutOption: {
                    widthClass: 'w320'
                },
                jangle: '53.13',
                xielv1: '0.75',
                xielv2: '不存在',
                xielvchenji: '不存在',
                dunumber: '°'
            };
        },
        computed: {
        },
        created() {
           ViewController.getInstance(new LineVerticalViewHandler(this));
           ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted() {
          ViewController.getInstance().domReady();
        },
        methods: {
            resetEvent() {
                this.jangle = '53.13';
                this.xielv1 = '0.75';
                this.xielv2 = '不存在';
                this.xielvchenji = '不存在';
                 (ViewController.getInstance().viewHandler as LineVerticalViewHandler).reset();
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
    .line_jAngle{
        width: 100px;
        height: 20px;
        position: absolute;
        top: 100px;
        left: 165px;
        color: #000000;
        background-color: #FFFFFF;
        text-align: center;
    }
    .xielv_1{
        width: 100px;
        height: 20px;
        position: absolute;
        top: 135px;
        left: 165px;
        color: #000000;
        background-color: #FFFFFF;
        text-align: center;
    }

    .xielv_2{
        width: 100px;
        height: 20px;
        position: absolute;
        top: 172px;
        left: 165px;
        color: #000000;
        background-color: #FFFFFF;
        text-align: center;
    }

    .xielv_chenji{
        width: 100px;
        height: 20px;
        position: absolute;
        top: 210px;
        left: 165px;
        color: #000000;
        background-color: #FFFFFF;
        text-align: center;
    }
</style>
<style>
    .text_style{
        font-style:  italic;
        font-family: Times New Roman !important;
    }
</style>