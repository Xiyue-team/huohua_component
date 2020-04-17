<template>
    <div class="aspectration bg_white covered root_div_container">
        <fullScreens_layout>
            <template slot="viewBox" slot-scope="viewBox">
                <span class="title_induction">使用高倍镜观察细胞</span>
                <div class="LeftControlPanel">
                    <div class="LeftControlPanelItem">
                        <img :src='imgSrc' id="viewOpacity"
                             :style="{'filter':'blur('+filterval+'px'+')','opacity':viewOpacity}"/>
                    </div>
                </div>
                <div id="box">
                    <!--中间视图区-->
                    <div id="Container" style="width: 100%;height: 100%;">
                    </div>
                </div>
                <div class="RightResponse">
                    <p class="desc" v-show="step1">
                        请拖动调整<span class="lightHeight">反光镜</span>使视野明亮
                    </p>
                    <div class="desc step2" v-show="step2">
                        <div class="descItem">
                            <img :src="imgObj" @click="addPiece"
                                 :class="{checked:isChecked}"/>
                            <span class="descInfo">洋葱鳞片叶内表皮细胞</span>
                        </div>
                        <div class='zaiwu'>
                            点击在<span class="lightHeight">载物台</span>添加制备好的装片
                        </div>
                    </div>
                    <div class="desc pullTop" v-show="step3">
                        再转动<span class="lightHeight ">粗准焦螺旋</span>观察清楚
                    </div>
                    <!--步骤四，换镜头-->
                    <div class="desc step4Desc" v-show="step4">
                        <div class="descItem">
                            <div class="descItem_box" @click="rotateCamera2">
                                <img :src="imgObj1" :class="{checked:isChecked2}"/>
                                <div class="cameraRate">x40</div>
                            </div>
                            <div class="descItem_box" @click="rotateCamera1">
                                <img :src="imgObj2" :class="{checked:isChecked1}"/>
                                <div class="cameraRate">x10</div>
                            </div>
                        </div>
                        <div class="step4">
                            选择<span class="lightHeight">高倍物镜</span>
                        </div>
                    </div>

                    <div class="desc step4Desc1" v-show="step5">
                        <div class="descItem">

                        </div>
                        拖动调整<span class="lightHeight">细准焦螺旋</span>调焦
                    </div>
                    <div class="desc step4Desc1 " v-show="step6">
                        <div class="descItem pullTop1 ">
                            观察细胞 <span class="lightHeight"></span>
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
    import Vue from 'vue';
    import '../../../../src/assets/css/core.css';
    import '../../../../src/assets/css/layout.css';
    import h_button from '../../../../src/component/ui/button.vue';
    import h_switch from '../../../../src/component/ui/switch.vue';
    import h_counter from '../../../../src/component/ui/counter.vue';
    import fullScreens_layout from '../../../../src/component/layout/fullScreens_layout.vue';
    import {UseMicroscopeViewHandler} from './services/UseMicroscopeViewHandler';
    import {ViewController} from '../../../../src/core/ViewController';
    import {ViewOption} from '../../../../src/core/CoreInterface';

    export default Vue.extend({
        data() {
            return {
                imgSrc: null,
                //控制显示第一步骤
                step1: true,
                //控制显示第二步骤
                step2: false,
                //控制显示第三步骤
                step3: false,
                //控制显示第四步骤
                step4: false,
                //控制显示第五步骤
                step5: false,
                //控制显示第六步骤
                step6: false,
                //四个存储图片的变量
                imgObj: null,
                imgObj1: null,
                imgObj2: null,
                imgObj3: null,
                step1ImgSrc: null,
                step2ImgSrc: null,
                step3ImgSrc: null,
                step4ImgSrc: null,
                zoom: 0,
                viewOpacity: 1,
                isChecked: false,
                //X10
                isChecked1: false,
                //X40
                isChecked2: false,
                //控制模糊程度
                filterval: 0
            };
        },
        components: {
            h_button,
            h_switch,
            h_counter,
            fullScreens_layout
        },

        created() {
            const viewOption = new ViewOption();
            viewOption.mobilePanelAlpha = true;
            viewOption.showMobileExpandIco = false;
            viewOption.controlPanelAnimationDelay = 1000;
            ViewController.getInstance(new UseMicroscopeViewHandler(this), viewOption);
            ViewController.getInstance().viewHandler.beforeRenderElement();

            const imgObj = require(`./sub_static/images/yangcong.png`);
            const sp1 =  require(`./sub_static/images/Step1.png`);
            const sp2 = require(`./sub_static/images/Step4.png`);
            const sp3 = require(`./sub_static/images/Step6.png`);
            const sp4 = require(`./sub_static/images/Step8.png`);
            const imgSrc = require(`./sub_static/images/Step1.png`);
            const imgObj1 = require(`./sub_static/images/camerax40.png`);
            const imgObj2 = require(`./sub_static/images/camerax10.png`);
            const imgObj3 = require(`./sub_static/images/chongzhi.png`);

            this.preloadImage(sp1).then((src) => {
                this.step1ImgSrc = src;
            });
            this.preloadImage(sp2).then((src) => {
                this.step2ImgSrc = src;
            });

            this.preloadImage(sp3).then((src) => {
                this.step3ImgSrc = src;
            });

            this.preloadImage(sp4).then((src) => {
                this.step4ImgSrc = src;
            });

            this.preloadImage(imgObj).then((src) => {
                this.imgObj = src;
            });

            this.preloadImage(imgSrc).then((src) => {
                this.imgSrc = src;
            });
            this.preloadImage(imgObj1).then((src) => {
                this.imgObj1 = src;
            });
            this.preloadImage(imgObj2).then((src) => {
                this.imgObj2 = src;
            });
            this.preloadImage(imgObj3).then((src) => {
                this.imgObj3 = src;
            });
        },

        mounted() {
            ViewController.getInstance().domReady();
            const that = this;
            window.addEventListener('resize', () => {
                that.resizeDom();
            });
        },
        watch: {
            disabled: function (val: any) {
            }
        },
        methods: {
            //播放装镜片动画
            addPiece() {
                this.viewOpacity = 0;
                if (!this.isChecked) {
                    (ViewController.getInstance().viewHandler as UseMicroscopeViewHandler).animateImg();
                }
                this.isChecked = true;
            },
            //播放转x10镜头动画
            rotateCamera1() {
                if (this.isChecked1 || this.isChecked2) {
                    return;
                }
                this.filterval = 0;
                this.isChecked1 = true;
                this.isChecked2 = false;
                this.imgSrc = this.step1ImgSrc;
                (ViewController.getInstance().viewHandler as UseMicroscopeViewHandler).animateImg1();
            },
            //播放转x40镜头动画
            rotateCamera2() {
                if (this.isChecked2 || this.isChecked1) {
                    return;
                }
                this.filterval = 0;
                this.imgSrc = this.step1ImgSrc;
                this.isChecked2 = true;
                this.isChecked1 = false;
                (ViewController.getInstance().viewHandler as UseMicroscopeViewHandler).animateImg2();
            },
            preloadImage(path: any) {
                return new Promise((resolve, reject) => {
                    const image = new Image();
                    image.onload = () => resolve(image.src);
                    image.onerror = reject;
                    image.src = path;
                });
            },

            reset() {
                this.step5 = false;
                (ViewController.getInstance().viewHandler as UseMicroscopeViewHandler).reset();
            },
            resizeDom() {
                const W = window.innerWidth;
                const H = window.innerHeight;
                if (W / H > 1024 / 750) {
                    this.zoom = H / 750;
                } else {
                    this.zoom = W / 1024;
                }
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

    .title_induction {
        width: 400px;
        height: 76px;
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #000000;
        position: absolute;
        line-height: 76px;
        left: 24px;
        top: 0;
        z-index: 1;
    }
    * { touch-action: pan-y; }
    #box {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .LeftControlPanel {
        width: 30%;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        left: 3%;
    }

    .LeftControlPanelItem {
        width: 300px;
        height: 300px;
        overflow: hidden;
        position: absolute;
        border-radius: 50%;
        border: 2px solid #97d0ff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .LeftControlPanelItem img {
        width: 100%;
        height: 100%;
        position: absolute;
        pointer-events: none;
        left: 0;
        top: 0;
    }

    div#Container {

        width: 450px;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0;
    }

    .descItem {

        height: 70px;
        line-height: 70px;
        position: relative;

        margin-left: 15px;
    }

    .descItem img {
        height: 100%;
        float: left;

    }

    .descItem span {
        float: left;
        height: 100%;
        line-height: 70px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #6B6B6B;
        margin-left: 20px;

    }

    .RightResponse {
        width: 30%;
        height: 100%;
        position: absolute;
        display: inline-block;
        right: 0;
        top: 0;
    }

    .zaiwu {
        margin-left: 10px;
    }

    .desc {
        width: 100%;
        height: 280px;
        line-height: 45px;
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #333333;
        margin: 0;
        padding: 0;
        position: absolute;
        left: 50%;
        top: 65%;
        transform: translateX(-50%);
    }

    .pullTop {
        top: 30% !important;
    }

    .step4Desc {
        top: 50% !important;
    }

    .step4Desc1 {
        top: 30% !important;
        margin-left: 30px;
    }

    .descItem_box {
        position: absolute;
        left: 0;
        top: 0;
        height: 150px;
    }

    .descItem_box:nth-child(1) {
        left: 120px;
    }

    .descItem_box img {
        width: 100px;
        height: 100px;
    }

    span.lightHeight {
        color: #ff4a4a;

    }

    div.step2 {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%);
    }

    div.cameraRate {
        height: 30px;
        position: absolute;
        top: 80px;
        left: 30px;
        width: 120px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #6B6B6B;

    }

    .step4 {
        position: absolute;
        top: 120px;
        left: 15px;
    }

    .checked {
        filter: drop-shadow(1px 1px 5px #2ef7ff);

    }

    .cover {
        width: 100%;
        height: 100%;
        background-color: #fff;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
    }

    @media screen and (max-height: 500px) {
        .LeftControlPanel {

        }
        .LeftControlPanelItem {
            width: 150px;
            height: 150px;
        }

        .RightResponse {
            width: 240px;
            height: 100%;
            right: 0;
        }

        .desc {
            font-size: 16px;

        }

        .descItem {
            margin-left: 0;
            padding-left: 10px;
        }

        .descItem img {
            width: 60px;
            height: 60px;
            margin-left: 10px;
        }

        .descItem_box {
            position: absolute;
            left: 0;
            top: 0;
            height: 120px;
        }

        div.cameraRate {
            top: 60px !important;
        }

        .descItem img {
            margin-left: 0;
        }

        span.descInfo {
            font-size: 16px;
            position: absolute;
            right: 5px;
            top: 0;
        }

        .descItem_box {
            margin-left: 30px;
        }

        .zaiwu {

            position: absolute;
            left: -18px;
            top: 80px;
        }

        div.step4Desc {
            top: 30% !important;
        }

        .pullTop1 {
            height: 20px !important;
        }
    }

    @media screen and (max-height: 320px) {
        .RightResponse {
            width: 220px;
            height: 100%;

        }

        .LeftControlPanel {
            width: 200px;
            height: 100%;
        }

        .RightResponse {
            transform: scale(0.8);
        }

        span.descInfo {
            font-size: 16px;
            position: absolute;
            right: -15px;
            top: 0;
        }
    }

</style>
