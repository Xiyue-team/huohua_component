<template>
    <div class="aspectration bg_white covered root_div_container " data-ratio="16:9">
        <fullScreens_layout>
            <template slot="viewBox" slot-scope="viewBox">
                <span class="title_induction">椭圆的第二定义</span>
                <div id="box">
                    <!--中间视图区        -->
                    <div id="Container">

                    </div>

                    <div class="formula">
                        <div class="pt">
                            <div class="pt_1">{{Math.abs(c)}}</div>
                            <div class="pt_2"></div>
                            <div class="pt_3">{{a}}</div>
                        </div>
                        <div class="pt1">=</div>
                        <div class="pt2">
                            <div class="pt1_1">c</div>
                            <div class="pt1_2"></div>
                            <div class="pt2_3">a</div>
                        </div>
                    </div>
                    <div class="drawEllipse" @click="drawAllEllipse" :class="{active:active}">
                        绘制
                    </div>
                </div>

            </template>

            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
                </div>
            </template>
        </fullScreens_layout>
    </div>
</template>

<script lang='ts'>
    import Vue from "vue";
    import "../../../../src/assets/css/core.css";
    import "../../../../src/assets/css/layout.css";
    import h_button from "../../../../src/component/ui/button.vue";
    import h_switch from "../../../../src/component/ui/switch.vue";
    import h_counter from "../../../../src/component/ui/counter.vue";
    import fullScreens_layout from "../../../../src/component/layout/fullScreens_layout.vue";
    import seletIos from "../../../../src/component/ui/select.vue";
    import Component from "vue-class-component";
    import {MainComponent} from "./services/MainComponent";


    @Component({
        components: {
            h_button,
            h_switch,
            h_counter,
            fullScreens_layout,
            seletIos
        },
        mixins: [MainComponent]
    })


    export default class App extends Vue {
    }

</script>

<style scoped='scoped'>
    .control-block_div_border {
        padding-top: 20px;
        margin-top: 20px;
        background: #FFFFFF;
        border: 0 solid rgba(0, 0, 0, 0.06);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.20);
        border-radius: 6px;
    }

    .view_div_content {

    }

    .title_induction {
        height: 76px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: black;
        position: absolute;
        line-height: 76px;
        left: 0;
        padding-left: 24px;
        top: 0;
        background-color: #fff;
        z-index: 1;

        font-weight: bolder;

    }

    #box {
        width: 100%;
        height: 100%;

        position: relative;
        background-color: #ffffff;
    }

    .LeftControlPanel {
        width: 310px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;

    }

    .LeftControlPanelItem {
        margin-left: 10px;
        width: 300px;
        height: 300px;
        overflow: hidden;
        position: absolute;
        border-radius: 50%;
        border: 2px solid #97d0ff;
        /*position: absolute;*/
        /*left: 50%;*/
        top: 50%;

        transform: translateY(-50%);

    }

    .control-panel_div_floatRight, .mobile_blur, .mobile_right_control {
        right: -280px !important;
    }

    div.mobile_blur {
        right: -280px !important;
    }

    div#Container {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    div.drawEllipse {
        position: absolute;
        right: 28px;
        bottom: 28px;
        width: 72px;
        height: 45px;
        font-size: 16px;
        color: #333333;
        text-align: center;
        z-index: 1;
        line-height: 42px;
        background-color: #FFFFFF;
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 21px;
        cursor: pointer;
    }

    div.active {
        background-color: #0199FF;
        color: #fff;
    }

    div.formula {
        position: absolute;
        top: 80px;
        left: 24px;
        height: 45px;
    }

    div.pt, div.pt1, div.pt2 {
        position: absolute;
        height: 100%;
        text-align: center;
        font-size: 24px;

    }

    div.pt {
        font-family: TimesNewRomanPSMT;
    }

    div.pt div {
        height: 24px;
    }

    div.pt div.pt_2 {
        width: 28px;
        height: 0;
        border-top: 1px solid #333;
    }

    div.pt div.pt_1 {
        color: #EC5D57;
    }

    div.pt div.pt_3 {
        color: #D734FF;
    }

    div.pt1 {
        left: 34px;
        top: 0;
        line-height: 45px;
    }

    div.pt2 {
        left: 53px;
        top: -2px;
        font-family: TimesNewRomanPS-ItalicMT;
    }

    div.pt1_2 {
        width: 28px;
        height: 0;
        border-top: 1px solid #333;
    }
</style>
