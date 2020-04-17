<template>
    <div class='aspectration bg_white covered root_div_container '>
        <leftAndRightLayout>
            <template slot="controlPanel" slot-scope="controlPanel">
                <div id="controlPanel">

                    <div class="btn_Control1" id="sj_btn">
                        <label @click="sjEvent()">
                            <h_button title="蛋白质水解" v-bind:class="{active:disabledSJ}"
                                      style="width: 240px;height: 44px; margin-top: 14px;font-size: 16px;"></h_button>
                        </label>
                    </div>

                    <div class="control-block_div_border " style="margin-top:20px;" v-show="show_Radio1">
                        <label for="b1" style="display: inline-block;" @click="resetAnimation()">
                            <label for="b1" style="margin-left: -8px; font-size: 14px">未水解</label>
                            <input class="radio-default" type="radio" id="b1" name="radio-group" checked value="0"
                                   v-model="vertical1">
                            <label for="b1" style="display: table-cell;vertical-align: middle;height: 24px;"></label>
                        </label>

                        <label for="b2" style="display: inline-block;margin-left: calc(30% - 19px);"
                               @click="partHydrolysis()">
                            <label for="b2" style="margin-left: -18px; font-size: 14px">部分水解</label>
                            <input class="radio-default" type="radio" id="b2" name="radio-group" value="1"
                                   v-model="vertical1">

                            <label for="b2" style="display: table-cell;vertical-align: middle;height: 24px;  "></label>
                        </label>

                        <label for="b3" style="display: inline-block;float:right;" @click="allHydrolysis()">
                            <label for="b3" style="margin-left: -18px; font-size: 14px">完全水解</label>
                            <input class="radio-default" type="radio" id="b3" name="radio-group" value="2"
                                   v-model="vertical1">
                            <label for="b3" style="display: table-cell;vertical-align: middle;height: 24px;"></label>
                        </label>
                    </div>

                    <div class="btn_Control2">
                        <label @click="bxEvent()">
                            <h_button title="蛋白质变性" v-bind:class="{active:disabledBX}"
                                      style="width: 240px;height: 44px; font-size: 16px;"></h_button>
                        </label>
                    </div>

                    <div class="control-block_div_border " style="margin-top:20px;" v-show="show_Radio2">
                        <label for="b4" style="display: inline-block; margin-left: 25px" @click="resetAnimation()">
                            <label for="b4" style="margin-left: -23px; font-size: 14px">活性蛋白质</label>
                            <input class="radio-default" type="radio" id="b4" name="radio-group2" checked value="0"
                                   v-model="vertical2">
                            <label for="b4"
                                   style="display: table-cell;vertical-align: middle;height: 24px; margin-top: 20px"></label>
                        </label>

                        <label for="b5" style="display: inline-block;margin-left: calc(30% - 26px);"
                               @click="partTranssexual()">
                            <label for="b5" style="margin-left: -3px; font-size: 14px">变性</label>
                            <input class="radio-default" type="radio" id="b5" name="radio-group2" value="1"
                                   v-model="vertical2">
                            <label for="b5" style="display: table-cell;vertical-align: middle;height: 24px;  "></label>
                        </label>

                        <label for="b6" style="display: inline-block;float:right; margin-left: 10px"
                               @click="allTranssexual()">
                            <label for="b6" style="margin-left: -3px; font-size: 14px">复性</label>
                            <input class="radio-default" type="radio" id="b6" name="radio-group2" value="2"
                                   v-model="vertical2">
                            <label for="b6" style="display: table-cell;vertical-align: middle;height: 24px;"></label>
                        </label>
                    </div>

                </div>
            </template>
            <template slot="viewBox" slot-scope="viewBox">
                <span id="title" class="title_text">蛋白质的水解和变性</span>
                <div id="3dContainer" style="width: 100%;height: 100%; display: flex;"
                     v-bind:class="{'set_scale': isMobile}">

                    <div v-if="isPC" style="margin: auto">

                        <img src="./sub_static/background.png" style="width: 680px; height: 380px;"
                             v-show="ctrl1"/>

                        <video src="./sub_static/part_hydrolysis.mp4" style="width: 680px;height: 380px;"
                               id="animationVideo1" v-show="ctrl2">

                        </video>

                        <video src="./sub_static/all_hydrolysis.mp4" style="width: 680px;height: 380px;"
                               id="animationVideo2" v-show="ctrl3">

                        </video>

                        <video src="./sub_static/part_transsexual.mp4" style="width: 680px;height: 380px;"
                               id="animationVideo3" v-show="ctrl4">

                        </video>

                        <video src="./sub_static/all_transsexual.mp4" style="width: 680px;height: 380px;"
                               id="animationVideo4" v-show="ctrl5">

                        </video>
                    </div>


                    <div v-else style="margin:auto;">
                        <img src="./sub_static/background.png" style="width: 680px; height: 380px;"
                             v-show="ctrl1"/>

                        <div class="part_hydrolysis" v-show="ctrl2">
                            <keyFrameAnimation v-bind="part_hydrolysis" ref="hydrolysis1">
                            </keyFrameAnimation>
                        </div>

                        <div class="all_hydrolysis" v-show="ctrl3">
                            <keyFrameAnimation v-bind="all_hydrolysis" ref="hydrolysis2">
                            </keyFrameAnimation>
                        </div>

                        <div class="part_transsexual" v-show="ctrl4">
                            <keyFrameAnimation v-bind="part_transsexual" ref="transsexual1">
                            </keyFrameAnimation>
                        </div>

                        <div class="all_transsexual" v-show="ctrl5">
                            <keyFrameAnimation v-bind="all_transsexual" ref="transsexual2">
                            </keyFrameAnimation>
                        </div>
                    </div>

                </div>

            </template>
        </leftAndRightLayout>
    </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import h_switch from '../../../../src/component/ui/switch.vue';
    import h_button from '../../../../src/component/ui/button.vue';
    import {DbzdsjhbxViewHanlder} from './services/DbzdsjhbxViewHanlder';
    import leftAndRightLayout from '../../../../src/component/layout/leftAndRight_layout.vue';
    import {ViewController} from '../../../../src/core/ViewController';
    import keyFrameAnimation from '../../../../src/component/layout/keyFrameAnimation.vue';
    import {BrowserUtil} from '../../../../src/util/BrowserUtil';
    import {DbzdsjhbxViewHanlderForPC} from './services/DbzdsjhbxViewHanlderForPC';

    export default Vue.extend({

        data() {
            return {
                disabledSJ: false,
                disabledBX: false,
                show_Radio1: false,
                show_Radio2: false,
                isMobile: false,
                isPC: false,
                vertical1: '0',
                vertical2: '0',
                ctrl1: true,
                ctrl2: false,
                ctrl3: false,
                ctrl4: false,
                ctrl5: false,

                part_hydrolysis: {
                    showSlider: false,
                    animationName: 'step1',
                    zipUrl: require('./sub_static/part_hydrolysis.zip'),
                    imageNum: 69,
                },
                all_hydrolysis: {
                    showSlider: false,
                    animationName: 'step2',
                    zipUrl: require('./sub_static/all_hydrolysis.zip'),
                    imageNum: 51,
                },
                part_transsexual: {
                    showSlider: false,
                    animationName: 'step3',
                    zipUrl: require('./sub_static/part_transsexual.zip'),
                    imageNum: 62,
                },
                all_transsexual: {
                    showSlider: false,
                    animationName: 'step4',
                    zipUrl: require('./sub_static/all_transsexual.zip'),
                    imageNum: 62,
                },
            };
        },
        components: {
            h_switch,
            h_button,
            leftAndRightLayout,
            keyFrameAnimation
        },

        created() {
            if (BrowserUtil.getBrowserInfo().os === 'Windows') {
                this.isPC = true;
                ViewController.getInstance(new DbzdsjhbxViewHanlderForPC(this));

            } else {
                this.isPC = false;
                ViewController.getInstance(new DbzdsjhbxViewHanlder(this));
            }
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },

        mounted() {
            if (BrowserUtil.getBrowserInfo().isSmallDevice) {
                this.isMobile = true;
                document.getElementById('sj_btn').style.marginTop = 120 + 'px';
            }
            ViewController.getInstance().domReady();
        },

        watch: {},

        methods: {
            //蛋白质水解
            sjEvent() {
                this.show_Radio1 = true;
                this.show_Radio2 = false;
                this.vertical2 = '0';

                if ((this.ctrl4 === true && this.ctrl5 === false) || (this.ctrl4 === false && this.ctrl5 === true)) {
                    this.ctrl1 = true;
                    this.ctrl4 = false;
                    this.ctrl5 = false;
                    if (this.isPC) {
                        (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation3();
                        (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation4();
                    } else {
                        (this.$refs.transsexual1 as any).reset();
                        (this.$refs.transsexual2 as any).reset();
                    }
                }
            },

            //蛋白质变性
            bxEvent() {
                this.show_Radio1 = false;
                this.show_Radio2 = true;
                this.vertical1 = '0';

                if ((this.ctrl2 === true && this.ctrl3 === false) || (this.ctrl2 === false && this.ctrl3 === true)) {
                    this.ctrl1 = true;
                    this.ctrl2 = false;
                    this.ctrl3 = false;

                    if (this.isPC) {
                        (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation1();
                        (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation2();
                    } else {
                        (this.$refs.hydrolysis1 as any).reset();
                        (this.$refs.hydrolysis2 as any).reset();
                    }

                }
            },

            //部分水解
            partHydrolysis() {
                this.ctrl1 = false;
                this.ctrl2 = true;
                this.ctrl3 = false;
                this.ctrl4 = false;
                this.ctrl5 = false;

                if (this.isPC) {
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).playAnimation1();
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation2();
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation3();
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation4();
                } else {
                    (this.$refs.hydrolysis1 as any).reset();
                    (this.$refs.hydrolysis1 as any).play();
                }
            },

            //完全水解
            allHydrolysis() {
                this.ctrl1 = false;
                this.ctrl2 = false;
                this.ctrl3 = true;
                this.ctrl4 = false;
                this.ctrl5 = false;
                if (this.isPC) {
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).playAnimation2();
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation1();
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation3();
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation4();
                } else {
                    (this.$refs.hydrolysis2 as any).reset();
                    (this.$refs.hydrolysis2 as any).play();
                }

            },

            //部分变性
            partTranssexual() {
                this.ctrl1 = false;
                this.ctrl2 = false;
                this.ctrl3 = false;
                this.ctrl4 = true;
                this.ctrl5 = false;
                if (this.isPC) {
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).playAnimation3();
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation1();
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation2();
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation4();
                } else {
                    (this.$refs.transsexual1 as any).reset();
                    (this.$refs.transsexual1 as any).play();
                }


            },

            //完全变性
            allTranssexual() {
                this.ctrl1 = false;
                this.ctrl2 = false;
                this.ctrl3 = false;
                this.ctrl4 = false;
                this.ctrl5 = true;
                if (this.isPC) {
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).playAnimation4();
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation1();
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation2();
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation3();
                } else {
                    (this.$refs.transsexual2 as any).reset();
                    (this.$refs.transsexual2 as any).play();
                }

            },

            //未水解/未变性
            resetAnimation() {
                this.ctrl1 = true;
                this.ctrl2 = false;
                this.ctrl3 = false;
                this.ctrl4 = false;
                this.ctrl5 = false;
                if (this.isPC) {
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation1();
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation2();
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation3();
                    (ViewController.getInstance().viewHandler as DbzdsjhbxViewHanlderForPC).resetAnimation4();
                } else {
                    (this.$refs.hydrolysis1 as any).reset();
                    (this.$refs.hydrolysis2 as any).reset();
                    (this.$refs.transsexual1 as any).reset();
                    (this.$refs.transsexual2 as any).reset();
                }

            },
        }
    });
</script>

<style scoped='scoped'>

    .title_text {
        margin-top: 24px;
        margin-left: 24px;
        position: absolute;
        font-size: 24px;
        color: #000000;
    }

    .btn_Control1 {
        margin-top: 326px;
    }

    .btn_Control2 {
        margin-top: 20px;
    }

    .part_hydrolysis {
        width: 680px;
        height: 380px;
        margin: auto;
        position: relative;
    }

    .all_hydrolysis {
        width: 680px;
        height: 380px;
        margin: auto;
        position: relative;
    }

    .part_transsexual {
        width: 680px;
        height: 380px;
        margin: auto;
        position: relative;
    }

    .all_transsexual {
        width: 680px;
        height: 380px;
        margin: auto;
        position: relative;
    }

    .set_scale {
        transform: scale(0.4);
    }
</style>
