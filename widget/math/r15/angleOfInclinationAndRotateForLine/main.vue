<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">直线的倾斜角与旋转角</span>
                <div style="width: 100%; height: 100%; display: flex">
                    <div id="3dContainer" style="margin: auto;width: 100%;height: 100%">
                    </div>
                </div>
            </template>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">
                </div>
            </template>
        </fullScreensLayout>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import '../../../../src/assets/css/core.css';
import '../../../../src/assets/css/layout.css';
import { ViewController } from '../../../../src/core/ViewController';
import leftAndRightLayout from '@/component/layout/leftAndRight_layout.vue';
import fullScreensLayout from '@/component/layout/fullScreens_layout.vue';
import { LineTestViewHandler } from './services/LineTestViewHandler';
import { ViewOption } from '../../../../src/core/CoreInterface';
export default Vue.extend({
    components: {
        fullScreensLayout,
    },
    data() {
        return {
            showEquation: true,
        };
    },
    watch: {},
    computed: {},
    created() {
        document.addEventListener('touchmove', function(e) { e.preventDefault() }, false);
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        viewOption.controlPanelAnimationDelay = 1000;
        ViewController.getInstance(new LineTestViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted() {
        ViewController.getInstance().domReady();
    },
    methods: {},
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

.text_style {
    font-style: italic;
    font-family: Times New Roman !important;
}

.btn-ctrl {
    position: fixed;
    right: 24px;
    bottom: 24px;
    width: 72px;
    height: 40px;
    font-size: 16px;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 21px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
}

.btn-ctrl.active {
    color: #fff;
    background: #0199FF;
    border-radius: 21px;
}

.equation {
    padding-top: 112px;
    padding-left: 24px;
    position: fixed;
    left: 0;
    top: 0;
    /*font-family: 'TimesNewRomanPS-ItalicMT';*/
    font-family: 'Times new roman';
    /*font-style: italic;*/
    font-size: 24px;
    color: #000000;
    line-height: 24px;
    z-index: 9;
    background: #fff;
    height: 80px;
}

@media screen and (max-height: 300px) {
    .equation {
        transform: scale(0.8, 0.8);
        transform-origin: left top;
    }
    .equation.right {
        transform-origin: right top;
    }
}

.equation.right {
    right: 0;
    left: auto;
    padding-right: 24px;
}

.wheel-wrap {
    display: inline-block;
    min-width: 24px;
    min-height: 24px;
    line-height: 24px;
    /*width:40px;*/
    position: relative;
    text-align: center;
    /*font-family: 'Times new roman';*/
    font-style: normal;
}

.arrow {
    position: absolute;
    height: 50px;
    width: 24px;
    z-index: 10;
    background: #fff;
}

.arrow-top div,
.arrow-bottom div {
    width: 10px;
    height: 10px;
    border-top: 2px solid #e0e0e0;
    border-right: 2px solid #e0e0e0;
    margin: 0 auto;
    margin-top: 20px;
    transform: rotateZ(-45deg);
}

.arrow-top {
    top: -48px;
    /*top: -10px;*/
    /*transform: translateX(-50%) rotateZ(-45deg);*/
}

.arrow-bottom {
    bottom: -56px;
    transform: rotateZ(180deg);
}

.pos-y {
    top: -30px;
}

.no-plus>>>.pd-select-wheel-item span {
    display: none !important;
}

.no-plus>>>.pd-select-list-item span {
    display: none !important;
}

.reset_btn {
    position: fixed;
    right: 24px;
    top: 24px;
    height: 50px;
    width: 60px;
    background: url('./sub_static/reset.png');
    background-size: 100% 100%;
    z-index: 10;
}

.italic-style {
    font-style: italic;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

</style>
