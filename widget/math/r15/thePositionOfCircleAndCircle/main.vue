<template>
    <div class="aspectration bg_white root_div_container" data-ratio="16:9">
        <fullScreensLayout>
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">圆和圆的位置关系</span>
                <transition name="fade">
                    <div v-show="showEquation">
                        <div class="equation" v-if="!initEquation">
                            (
                            <span class="italic-style">x</span>
                            <div class="wheel-wrap">
                                <div class="arrow arrow-top">
                                    <div></div>
                                </div>
                                <div class="arrow arrow-bottom">
                                    <div></div>
                                </div>
                                <selet-ios class="pos-y" :listData="listData" id="spin1" v-model="a" :parentHidden="false" v-bind="selectParameter" type="cycle"
                                    ref="spin1" @mouseOut="mouseOut" @downHandle="changeIndex">
                                </selet-ios>
                            </div>
                            )
                            <sup>2</sup> + (
                            <span class="italic-style">y</span>
                            <div class="wheel-wrap">
                                <div class="arrow arrow-top">
                                    <div></div>
                                </div>
                                <div class="arrow arrow-bottom">
                                    <div></div>
                                </div>
                                <selet-ios class="pos-y" :listData="listData" id="spin2" v-model="b" :parentHidden="false" v-bind="selectParameter" type="cycle"
                                    ref="spin2" @mouseOut="mouseOut" @downHandle="changeIndex">
                                </selet-ios>
                            </div>
                            )
                            <sup>2</sup> =
                            <div class="wheel-wrap no-plus">
                                <div class="arrow arrow-top">
                                    <div></div>
                                </div>
                                <div class="arrow arrow-bottom">
                                    <div></div>
                                </div>
                                <selet-ios class="pos-y" :listData="listData1" id="spin3" v-model="r" :parentHidden="false" v-bind="selectParameter" type="cycle"
                                    ref="spin3" @mouseOut="mouseOut" @downHandle="changeIndex">
                                </selet-ios>
                            </div>
                            <sup>2</sup>
                        </div>
                        <div class="equation" v-else>
                            (
                            <span class="italic-style">x -a</span> )
                            <sup>2</sup> + (
                            <span class="italic-style"> y -b </span>)
                            <sup>2</sup> =
                            <span class="italic-style">r</span>
                            <sup>2</sup>
                        </div>
                        <div class="equation right" v-if="!initEquation">
                            (
                            <span class="italic-style">x</span>
                            <div class="wheel-wrap">
                                <div class="arrow arrow-top">
                                    <div></div>
                                </div>
                                <div class="arrow arrow-bottom">
                                    <div></div>
                                </div>
                                <selet-ios class="pos-y" :listData="listData" id="spin4" v-model="a2" :parentHidden="false" v-bind="selectParameter" type="cycle"
                                    ref="spin4" @mouseOut="mouseOut" @downHandle="changeIndex">
                                </selet-ios>
                            </div>
                            )
                            <sup>2</sup> + (
                            <span class="italic-style">y</span>
                            <div class="wheel-wrap">
                                <div class="arrow arrow-top">
                                    <div></div>
                                </div>
                                <div class="arrow arrow-bottom">
                                    <div></div>
                                </div>
                                <selet-ios class="pos-y" :listData="listData" id="spin5" v-model="b2" :parentHidden="false" v-bind="selectParameter" type="cycle"
                                    ref="spin5" @mouseOut="mouseOut" @downHandle="changeIndex">
                                </selet-ios>
                            </div>
                            )
                            <sup>2</sup> =
                            <div class="wheel-wrap no-plus">
                                <div class="arrow arrow-top">
                                    <div></div>
                                </div>
                                <div class="arrow arrow-bottom">
                                    <div></div>
                                </div>
                                <selet-ios class="pos-y" :listData="listData1" id="spin6" v-model="r2" :parentHidden="false" v-bind="selectParameter" type="cycle"
                                    ref="spin6" @mouseOut="mouseOut" @downHandle="changeIndex">
                                </selet-ios>
                            </div>
                            <sup>2</sup>
                        </div>
                        <div class="equation right" v-else>
                            (
                            <span class="italic-style">x -a</span> )
                            <sup>2</sup> + (
                            <span class="italic-style"> y -b </span>)
                            <sup>2</sup> =
                            <span class="italic-style">r</span>
                            <sup>2</sup>
                        </div>
                        <div class="explain">
                            <ul class="explain-list">
                                <li>
                                    <div>状态</div>
                                    <div>{{pos}}</div>
                                </li>
                                <li>
                                    <div>两圆心距离</div>
                                    <div>{{dis}}</div>
                                </li>
                                <li>
                                    <div>交点个数</div>
                                    <div>{{count}}</div>
                                </li>
                                <li>
                                    <div>公切线个数</div>
                                    <div>{{lineCount}}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </transition>
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
import fullScreensLayout from '@/component/layout/fullScreens_layout.vue';
import { LineTestViewHandler } from './services/LineTestViewHandler';
import seletIos from '../../../../src/component/ui/select.vue';
import { ViewOption } from '../../../../src/core/CoreInterface';
export default Vue.extend({
    components: {
        fullScreensLayout,
        seletIos
    },
    data() {
        return {
            listData: Array.from({ length: 19 }, (value, index) => -9 + index),
            listData1: Array.from({ length: 10 }, (value, index) => index),
            r: 3,
            a: -1,
            b: -1,
            r2: 3,
            a2: -7,
            b2: -1,
            selectParameter: {
                parameter1: 2,
            },
            initEquation: true,
            timer: null,
            showEquation: true,
            dis: 0,
            pos: '点在圆外',
            count: 2,
            lineCount: 4,
        };
    },
    watch: {
        a(v) {
            (ViewController.getInstance().viewHandler as LineTestViewHandler).threeModel.changePosByVue({ x: -v, y: -this.b });
        },
        b(v) {
            (ViewController.getInstance().viewHandler as LineTestViewHandler).threeModel.changePosByVue({ x: -this.a, y: -v });
        },
        r(v) {
            (ViewController.getInstance().viewHandler as LineTestViewHandler).threeModel.changeRadius(v, false, 0);
        },
        a2(v) {
            (ViewController.getInstance().viewHandler as LineTestViewHandler).threeModel.changePosByVue2({ x: -v, y: -this.b2 });
        },
        b2(v) {
            (ViewController.getInstance().viewHandler as LineTestViewHandler).threeModel.changePosByVue2({ x: -this.a2, y: -v });
        },
        r2(v) {
            (ViewController.getInstance().viewHandler as LineTestViewHandler).threeModel.changeRadius(v, false, 2);
        },
    },
    computed: {},
    created() {
        document.addEventListener('touchmove', function(e) { e.preventDefault() }, false);
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.controlPanelAnimationDelay = 1000;
        ViewController.getInstance(new LineTestViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    },
    mounted() {
        ViewController.getInstance().domReady();
        setTimeout(() => {
            this.initEquation = false;
        }, 2000);
    },
    methods: {
        changeIndex(el: any) {
            (this.$refs.spin1 as any).$el.style.zIndex = 5;
            (this.$refs.spin2 as any).$el.style.zIndex = 5;
            (this.$refs.spin3 as any).$el.style.zIndex = 5;
            (this.$refs.spin4 as any).$el.style.zIndex = 5;
            (this.$refs.spin5 as any).$el.style.zIndex = 5;
            (this.$refs.spin6 as any).$el.style.zIndex = 5;
            (this.$refs[el.id] as any).$el.style.zIndex = 20;
        },
        mouseOut() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                (this.$refs.spin1 as any).$el.style.zIndex = 5;
                (this.$refs.spin2 as any).$el.style.zIndex = 5;
                (this.$refs.spin3 as any).$el.style.zIndex = 5;
                (this.$refs.spin4 as any).$el.style.zIndex = 5;
                (this.$refs.spin5 as any).$el.style.zIndex = 5;
                (this.$refs.spin6 as any).$el.style.zIndex = 5;
            }, 1000);
        },
    },
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
    z-index: 100;
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

.explain {
    position: fixed;
    right: 0;
    bottom: 0;
    background: #fff;
    padding: 0 24px 12px 0;
}

.explain-list {
    border: 1px solid #EBEBEB;
    border-radius: 8px;
}

.explain li:not(:last-child) {
    height: 25px;
    border-bottom: 1px solid #EBEBEB;
}

.explain li div {
    padding: 0 5px;
    font-size: 14px;
    display: inline-block;
    height: 24px;
    line-height: 24px;
}

.explain li div:first-child {
    text-align: right;
    width: 80px;
    background: #FAFAFA;
    color: #8A8A8A;
    /*border-bottom: 1px solid #EBEBEB;*/
    border-right: 1px solid #EBEBEB;
}

.explain li div:last-child {
    color: #333333;
    width: 60px;
    /*border-bottom: 1px solid #EBEBEB;*/
}

</style>
