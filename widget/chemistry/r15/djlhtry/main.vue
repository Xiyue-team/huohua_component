<template>
    <div class="aspectration bg_white covered root_div_container " data-ratio="16:9">
        <fullScreens_layout>
            <template slot="viewBox" slot-scope="viewBox">
                <span class="title_induction">电解氯化铜溶液</span>
                <div id="box">
                    <!--中间视图区        -->
                    <div id="Container">
                        <div class="topBtn" @click="nextStep2" v-if="step2">
                            <img src="./sub_static/images/wire.png">
                            <div class="Textdesc">添加导线</div>
                        </div>

                        <div class="topBtn" @click="nextStep3" v-if="step3">
                            <img src="./sub_static/images/dianchi.png">
                            <div class="Textdesc">添加电池</div>
                        </div>

                        <div class="mainView">
                            <img :src='src1' :style="{'width':W+'px','height':H+'px'}" v-if="viewShow" class="sp">
                            <img :src='src1' :style="{'width':W+'px','height':H+'px'}" v-if="viewShow1" class="sp1">
                            <div class="cupBox" :style="{'height':Hp+'px'}">
                                <img :src='src1' :style="{'width':W+'px','height':Hp+'px'}" v-if="viewShow2" class="sp2">
                                <img :src="src2" class="cellArea" v-if="step4"
                                     :style="{'width':W1+'px','height':H1+'px'}">
                            </div>

                        </div>

                    </div>

                    <div class="formula" v-if="step4">
                        <img class="formula_img" src="./sub_static/images/fangcheng.png" v-show="isCheck">

                        <div class="formula_btn">
                            <img src="./sub_static/images/gs1.png" alt="" @click="showFormat(2)" v-show="!isCheck">
                            <img src="./sub_static/images/gs2.png" alt="" @click="showFormat(1)" v-show="isCheck">
                        </div>
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
    import {DemoViewHandler} from "./services/EletricViewHandler";
    import {ViewController} from "../../../../src/core/ViewController";
    import {ViewOption } from '../../../../src/core/CoreInterface';
    export default Vue.extend({
        data() {
            return {
                imgObj: require("./sub_static/images/chongzhi.png"),
                src1: require("./sub_static/imgList1/img1.png"),
                src2: require("./sub_static/imgList3/fenzi/img1.png"),
                //控制顶部按钮的显示与隐藏
                step2: true,
                step3: false,
                step4: false,
                //保存四个定时器
                timer: null,
                timer1: null,
                timer2: null,
                timer3: null,
                //存储四个序列帧的图片数组
                store1: [],
                store2: [],
                store3: [],
                store4: [],
                //控制视图区显示与隐藏
                viewShow: true,
                viewShow1: false,
                viewShow2: false,
                isCheck: false,
                //不带导线的宽高
                W: 320,
                H: 340,
                //带导线的宽高
                W1: 300,
                H1: 200,
                Hp:452,
                //缩放比例
                zoom1: 1
            };

        },
        components: {
            h_button,
            h_switch,
            h_counter,
            fullScreens_layout,
        },
        created() {
            const viewOption = new ViewOption();
            viewOption.mobilePanelAlpha = true;
            viewOption.showMobileExpandIco = false;
            viewOption.controlPanelAnimationDelay = 1000;
            ViewController.getInstance(new DemoViewHandler(this),viewOption);
            ViewController.getInstance().viewHandler.beforeRenderElement();
        },
        mounted() {
            this.resize();
            const that: any = this;
            window.addEventListener("resize", function () {
                that.resize();
            });
            //四个临时数组
            const imgArr1: any = [];
            const imgArr2: any = [];
            const imgArr3: any = [];
            const imgArr4: any = [];

            //存储预加载图片数组
            const imgStore1: any = [];
            const imgStore2: any = [];
            const imgStore3: any = [];
            const imgStore4: any = [];

            for (let i = 0; i < 54; i++) {
                imgArr1[i] = i;
                imgArr2[i] = i;
            }
            for (let i = 0; i < 33; i++) {
                imgArr3[i] = i;
                imgArr4[i] = i;
            }

            const promise1 = new Promise((resolve, reject) => {
                imgArr1.forEach((val: any, index: any) => {
                    const srcString1 = require(`./sub_static/imgList1/img${val + 1}.png`);
                    this.preloadImage(srcString1).then(function (img) {
                        imgStore1[val] = img;
                        if (val >= 53) {
                            resolve();
                        }
                    });
                });


            });

            const promise2 = new Promise((resolve, reject) => {
                imgArr2.forEach((val: any, index: any) => {
                    const srcString2 = require(`./sub_static/imgList2/img${val + 1}.png`);
                    this.preloadImage(srcString2).then(function (img) {
                        imgStore2[val] = img;
                        if (val >= 53) {
                            resolve();
                        }
                    });
                });

            });

            const promise3 = new Promise((resolve, reject) => {

                imgArr3.forEach((val: any, index: any) => {
                    const srcString3 = require(`./sub_static/imgList3/addDianchi/img${val + 1}.png`);
                    this.preloadImage(srcString3).then(function (img) {
                        imgStore3[val] = img;
                        if (val >= 32) {
                            resolve();
                        }
                    });
                });


            });

            const promise4 = new Promise((resolve, reject) => {
                imgArr4.forEach((val: any, index: any) => {
                    const srcString4 = require(`./sub_static/imgList3/fenzi/img${val + 1}.png`);
                    this.preloadImage(srcString4).then(function (img) {
                        imgStore4[val] = img;
                        if (val >= 32) {
                            resolve();
                        }
                    });
                });

            });

            Promise.all([promise1, promise2, promise3, promise4]).then(() => {
                this.store1 = imgStore1;
                this.store2 = imgStore2;
                this.store3 = imgStore3;
                this.store4 = imgStore4;
                ViewController.getInstance().domReady();
                (ViewController.getInstance().viewHandler as DemoViewHandler).nextStep1(imgStore1);
            });


        },
        watch: {
            disabled: function (val: any) {
            }
        },
        methods: {
            nextStep2() {
                (ViewController.getInstance().viewHandler as DemoViewHandler).nextStep2(this.store2);
            },
            nextStep3() {
                (ViewController.getInstance().viewHandler as DemoViewHandler).nextStep3(this.store3, this.store4);
            },
            showFormat(val: number) {

                if (val === 1) {
                    this.isCheck = false;
                }
                else {
                    this.isCheck = true;
                }
            },
            preloadImage(path: any) {
                return new Promise((resolve, reject) => {
                    const image = new Image();
                    image.onload = () => resolve(image.src);
                    image.onerror = reject;
                    image.src = path;
                });
            },
            init() {

            },
            resetEvent() {
                this.isCheck = false;
                (ViewController.getInstance().viewHandler as DemoViewHandler).reset();
            },
            resize() {
                let W1 = window.innerWidth;
                let H1 = window.innerHeight;
                if (W1 / H1 > 1024 / 750) {
                    this.zoom1 = H1 / 650;
                }
                else {
                    this.zoom1 = W1 / 1024;
                }
                this.W = 320 * this.zoom1;
                this.H = 340 * this.zoom1;
                this.W1 = 300 * this.zoom1;
                this.H1 = 200 * this.zoom1;
            },


            //重置页面
            reset() {
                clearTimeout(this.timer);
                clearTimeout(this.timer1);
                clearTimeout(this.timer2);
                clearTimeout(this.timer3);
                this.step2 = true;
                this.step3 = false;
                this.step4 = false;
                this.viewShow = true;
                this.viewShow1 = false;
                this.viewShow2 = false;
                this.W = 320 * (window as any).viewHandler.viewModel.$data.zoom1;
                this.H = 340 * (window as any).viewHandler.viewModel.$data.zoom1;
            }
        }
    });
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
        width: 100%;
        height: 76px;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #525252;
        position: absolute;
        line-height: 76px;
        left: 0;
        padding-left: 24px;
        top: 0;
        background-color: #f0f0f0;
    }

    #box {
        width: 100%;
        margin-top: 76px;
        height: calc(100% - 76px);
        position: relative;
        background-color: #f0f0f0;
    }

    .mainView {

        width: 100%;
        height: calc(100% - 50px);
        position: absolute;
        left: 0;
        top: 50px;
    }

    .mainView img {
        pointer-events: none !important;
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
.control-panel_div_floatRight,.mobile_blur,.mobile_right_control{
    right: -280px !important;
}

div.mobile_blur{
    right: -280px !important;
}

div#Container {
        width: 550px;
        height: 100%;
        margin: 0 auto;
        position: relative;
    }

    .topBtn {
        cursor: pointer;
        position: absolute;
        left: 50%;
        top: 10px;
        text-align: center;
        height: auto;
        transform: translateX(-50%);
        display: inline-block;
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #050505;
        z-index: 1;
    }

    .topBtn img {
        width: 36px;
        height: 26px;
    }

    .sp, .mainView img {
        position: absolute;
        left: 50%;
        bottom: 15%;
        transform: translateX(-50%);
        width: 70%;
        height: 65%;
    }

    img.sp1 {
        position: absolute;
        left: 50%;
        bottom: 15%;
        transform: translateX(-50%);
        width: 70%;
        height: 65%;
    }

    div.cupBox {
        position: absolute;
        left: 50%;
        bottom: 15%;
        transform: translateX(-50%);
        width: 70%;
        height: 65%;
    }

    img.sp2 {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
    }

    img.cellArea {
        width: 300px;
        height: 200px;
        left: 50%;
        transform: translateX(-50%);
        bottom: 10px;
    }

    .formula {
        width: 28%;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
    }

    .formula_img {
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .formula_btn {
        position: absolute;
        bottom: 10%;
        right: 10%;
        display: inline-block;
        width: 72px;
        height: 42px;
    }

    .formula_btn img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    @media screen and (max-height: 500px) {

        .sp, .cupBox, .sp1 {
            bottom: 10px !important;
        }

        div.topBtn {
            top: -35px;
        }
    }

</style>
