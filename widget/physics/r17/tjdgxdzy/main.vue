<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span class="title_style">透镜对光线的作用</span>
                <div class="btn" v-text="concave?'切换凸透镜':'切换凹透镜'" id="btn" @click="btnEvent"></div>
                <div id="3dContainer" :style="{'background-image': 'url(\'' +bg +'\')'} " class="Container"></div>
                <button class="save" @click="save">保存</button>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
                    <div class="button_border " style="width:48px;height:40px;position: absolute;top:20px;right:24px;" id="reset" @click="resetEvent">
                        <img style="width: 24px;  margin-top: 8px;margin-left: 12px"
                             src="../../../../static/images/chongzhi.png" alt="">
                    </div>
                    </div>
            </template>
        </fullScreensLayout>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import "../../../../src/assets/css/core.css";
import "../../../../src/assets/css/layout.css";
import { ViewController } from "../../../../src/core/ViewController";
import h_button from "../../../../src/component/ui/button.vue";
import fullScreensLayout from "../../../../src/component/layout/fullScreens_layout.vue";
import { tjdgxdzyViewHandler } from "./service/tjdgxdzyViewHandler";
import * as bg from "./sub_static/bg.png";
import { ViewOption } from "../../../../src/core/CoreInterface";

export default Vue.extend({

    components: {
        h_button,
        fullScreensLayout
    },

    data() {
        return {
            concave: true,
            bg: null
        };
    },
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        viewOption.controlPanelAnimationDelay = 1000;
        this.bg = bg;
        ViewController.getInstance(new tjdgxdzyViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted() {
        ViewController.getInstance().domReady();
    },

    methods: {
        resetEvent() {
            setTimeout(() => {
                (ViewController.getInstance().viewHandler as tjdgxdzyViewHandler).mountaion.reset();
            });
        },
        btnEvent() {
            this.concave = !this.concave;
            (ViewController.getInstance().viewHandler as tjdgxdzyViewHandler).mountaion.btnEvent();
        },
        save() {
            (ViewController.getInstance().viewHandler as tjdgxdzyViewHandler).mountaion.save();
        }
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

.title_style {
    width: 336px;
    height: 24px;
    font-size: 24px;
    color: #ffffff;
    line-height: 24px;
    position: absolute;
    left: 24px;
    top: 24px;
}

.arrow_UpImg1 {
    position: absolute;
    width: 40px;
    height: 40px;
    margin-left: 90px;
    margin-top: -120px;
    z-index: 6;
    background-color: #FFFFFF
}

.arrow_UpImg2 {

    position: absolute;
    width: 40px;
    height: 40px;
    margin-left: 140px;
    margin-top: -120px;
    z-index: 6;
    background-color: #FFFFFF
}

.arrow_UpImg3 {
    position: absolute;
    width: 40px;
    height: 40px;
    margin-left: 193px;
    margin-top: -120px;
    z-index: 6;
    background-color: #FFFFFF
}

.arrow_DownImg1 {
    position: absolute;
    width: 40px;
    height: 40px;
    margin-left: 90px;
    margin-top: -50px;
    z-index: 6;
    background-color: #FFFFFF
}

.arrow_DownImg2 {
    position: absolute;
    width: 40px;
    height: 40px;
    margin-left: 140px;
    margin-top: -50px;
    z-index: 6;
    background-color: #FFFFFF
}

.arrow_DownImg3 {
    position: absolute;
    width: 40px;
    height: 40px;
    margin-left: 193px;
    margin-top: -50px;
    z-index: 6;
    background-color: #FFFFFF
}

.Container {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
}

.btn {
    opacity: 0.9;
    background: #5B5B5B;
    border-radius: 22px;
    width: 144px;
    height: 42px;
    line-height: 42px;
    position: absolute;
    bottom: 10%;
    left: calc(50% - 72px);
    text-align: center;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #CCCCCC;
    cursor: pointer;
}

.save {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 100;
    background: #5B5B5B;
    border-radius: 22px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #fff;
    padding:0 16px;
    cursor: pointer;
}
</style>