<template>
    <div id="app" class="noselect">
        <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget" id="button0"></ui-btn>
        <div class="container">
            <!--头部-->
            <h3 v-html="title" class="app_title"></h3>
            <!--视图区-->
            <div class="ViewSpace" :class="{moveRight:zoomShow}">
                <div :style="[zoom]" class="viewBox">
                    <div class="wrap" :style="'background-image:url('+wrapUrl+');background-size:cover;'">
                        <!-- 4个渔场区域图 -->
                        <div class="fisheryWrap">
                            <div v-for="n in 4" class="fishery" v-if="groups[n-1].isClick"
                                 :style="'background-image:url(./static/img/yuchang'+(n-1)+'.png);background-size:cover;'"></div>
                        </div>
                        <!-- 寒流暖流div -->
                        <div class="ocean" :style="'background:url('+oceanImg+') no-repeat center center/cover'"></div>
                        <!-- 遮罩层，显示放大区域后让背景有个filter效果 -->
                        <div class="mask" v-show="zoomShow"></div>
                        <!-- 三个点击放大区域的按钮 -->
                        <div class="zoom zoomButton1" :style="'background-image:url(./static/img/zoomin.png);'"
                             @click="zoomin(1)"></div>
                        <div class="zoom zoomButton2" :style="'background-image:url(./static/img/zoomin.png);'"
                             @click="zoomin(2)"></div>
                        <div class="zoom zoomButton3" :style="'background-image:url(./static/img/zoomin.png);'"
                             @click="zoomin(3)" ref="zoomButton3"></div>
                        <!-- 一个放大区域显示的div -->
                        <transition name="show">
                            <div class="zoomIn" v-show="zoomShow"
                                 :style="'background-image:url('+zoominUrl+');background-size:cover;'">
                                <div class="zoom zoomOut"
                                     :style="'background:url(./static/img/zoomout.png) no-repeat center center/24px ;'"
                                     @click="close"></div>
                            </div>
                        </transition>
                        <!-- 一个点击渔场显示说明文字的div -->
                        <div class='showTextExplain' v-show="isShowText"
                             :style="'background-image:url('+yuchangUrl+');background-size:cover;'">
                            <div class="close" v-show="yuchangUrl" style=" position: absolute;" :class="`pos-${posNum}`"
                                 @click="close"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--侧边按钮区-->
        <div class="app_aside" ref="sides" :class="{moveRight:zoomShow}">
            <!--重制按钮-->
            <!--清除浮动-->
            <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
                <ui-group type="button" :groups="groups" v-model="radio" id="buttonGroup"
                          @click.native='clickEvent($event)'></ui-group>
                <ui-group type="radio" :groups="groups1" v-model="radio1"></ui-group>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import uiBtn from '@/components/UI/uiBtn'; //按钮
    import uiSlider from '@/components/UI/uiSlider';
    import uiGroup from '@/components/UI/uiGroup';

    export default {
        name: 'app',
        components: {
            uiBtn,
            uiSlider,
            uiGroup
        },
        data() {
            return {
                title: '世界表层洋流的分布',
                BtnSpaceStyle: 'flex',
                zoom: {}, //区域大小
                radio: '',
                pre: '',

                wrapUrl: './static/img/earth0.png',
                yuchangUrl: '',
                posNum: -1,
                zoominUrl: '',
                radio1: 0,
                oceanImg: './static/img/clockwise.gif',
                textUrl: '',
                isShowText: false,

                zoomShow: false
            }
        },
        created() {
            document.title = this.title;
            this.textIndex = 0;
            this.groups = [{
                name: '0',
                txt: '北海渔场',
                isClick: false
            }, {
                name: '1',
                txt: '秘鲁渔场',
                isClick: false
            }, {
                name: '2',
                txt: '北海道渔场',
                isClick: false
            }, {
                name: '3',
                txt: '纽芬兰渔场',
                isClick: false
            }];
            this.groups1 = [{
                name: 0,
                txt: '冬季洋流'
            }, {
                name: 1,
                txt: '夏季洋流'
            },];
        },
        mounted() {
            this.resize();
            this.setSideStyle();
            this.getViewSize();
        },
        computed: {},
        watch: {
            radio1(v) {
                switch (v) {
                    case 0:
                        this.preloadImage('./static/img/clockwise.gif?' + Math.random()).then((path) => {
                            this.oceanImg = path;
                        })
                        break;
                    case 1:
                        this.preloadImage('./static/img/reverse.gif?' + Math.random()).then((path) => {
                            this.oceanImg = path;
                        })
                        break;
                }
            },
        },
        methods: {
            clickEvent(e) {
                if (e.target.className == '') return;
                this.groups[this.radio].isClick = !this.groups[this.radio].isClick;
                if (this.groups[this.radio].isClick) {
                    this.textIndex = this.radio;
                    this.preloadImage(`./static/img/text${this.radio}.png`).then((path) => {
                        this.yuchangUrl = path;
                        this.isShowText = true;
                        this.posNum = this.radio;
                        switch (this.radio) {
                            case 0:

                                this.$refs.zoomButton3.style.zIndex = 10;
                                break;
                            case 1:
                                this.$refs.zoomButton3.style.zIndex = 2;
                                break;
                            case 2:
                                this.$refs.zoomButton3.style.zIndex = 10;
                                break;
                            case 3:
                                this.$refs.zoomButton3.style.zIndex = 2;
                                break;
                        }
                    })
                } else {
                    if (this.textIndex == this.radio) {
                        this.isShowText = false;
                    }
                }
            },
            isSame() {
                if (this.pre == this.radio) {
                    this.radio = '';
                    this.preloadImage('./static/img/earth0.png').then((path) => {
                        this.wrapUrl = path;
                    })
                    return;
                }
            },
            insertStr(soure, start, newStr) {

                return soure.slice(0, start) + newStr + soure.slice(start);
            },
            zoomin(v) {

                this.yuchangUrl = '';
                this.imgL(`./static/img/zoomin${v}.png`, (src) => {
                    src = this.insertStr(src,0,"'");
                    src+="'"
                    this.zoominUrl = src;
                    this.zoomShow = true;
                });
            },
            close() {
                this.zoomShow = false;
                this.yuchangUrl = '';
                this.$refs.zoomButton3.style.zIndex = 10;
            },
            imgL(src, callback) {
                var img = new Image();
                img.onload = function () {
                    callback && callback(img.src);
                }
                img.src = src;
            },
            preloadImage(path) {
                return new Promise((resolve, reject) => {
                    let image = new Image();
                    image.onload = () => resolve(path);
                    image.onerror = reject;
                    image.src = path;
                })
            },
            //计算侧边
            setSideStyle() {
                const el = document.getElementById('btn_space')
                if (el && el.scrollHeight > el.offsetHeight) {
                    this.BtnSpaceStyle = 'block'
                } else {
                    this.BtnSpaceStyle = 'flex'
                }
            },
            //计算区块大小
            getViewSize() {
                const W = window.innerWidth - 200;
                const H = window.innerHeight - 72;
                if (W / H >= 775 / 470) {
                    this.zoom = {
                        zoom: H / 470
                    }
                } else {
                    this.zoom = {
                        zoom: W / 775
                    }
                }
            },
            //窗口大小更改
            resize() {
                const vm = this;
                window.addEventListener('resize', function () {
                    vm.setSideStyle();
                    vm.getViewSize();
                })
            },
            //重置
            resetWidget() {
                for (let value of this.groups) {
                    value.isClick = false;
                }
                this.imgL('./static/img/earth0.png', (src) => {
                    this.wrapUrl = src;
                });
                this.yuchangUrl = '';
                this.zoominUrl = '';
                this.radio1 = 0;
                this.radio = '';
                this.imgL('./static/img/clockwise.gif?' + Math.random(), (src) => {
                    this.oceanImg = src;
                });
            },
        },
    }
</script>
<style>
    * {
        margin: 0;
        padding: 0;
    }

    li {
        list-style: none;
    }

    input,
    button {
        outline: none;
        -webkit-appearance: none;
        border-radius: 0;
    }

    canvas {
        outline: none;
    }

    /*盒模型，padding尺寸不用再减去*/

    *,
    *:before,
    *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
    }

    html,
    body,
    #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
        background-color: #fff;
    }

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .noselect {
        -webkit-touch-callout: none;
        /* iOS Safari */
        -webkit-user-select: none;
        /* Chrome/Safari/Opera */
        -khtml-user-select: none;
        /* Konqueror */
        -moz-user-select: none;
        /* Firefox */
        -ms-user-select: none;
        /* Internet Explorer/Edge */
        user-select: none;
        /* Non-prefixed version, currently not supported by any browser */
    }

    /*ui*/

    .UI-camera {
        width: 80px;
        height: 80px;
        cursor: pointer;
    }

    .clearfix:after {
        content: '';
        display: block;
        clear: both;
    }

    /*内容区*/

    .container {
        width: calc(100% - 200px);
        float: left;
        height: 100%;
    }

    .container h3 {
        font-size: 24px;
        color: #000;
        line-height: 1.0;
        padding: 24px;
        font-weight: normal;
    }

    .app_aside {
        float: right;
        width: 200px;
        height: 100%;
        transition: all .5s;
    }

    .app_aside.moveRight {
        transform: translate3d(200px, 0, 0);
    }

    .insp-wrapper {
        width: 100%;
        height: 100%;
    }

    .aside_reset {
        margin: 20px 24px;
        float: right;
    }

    #button0 {
        position: fixed;
        right: 0;
        top: 0;
    }

    .btn_space {
        padding: 20px;
        width: 100%;
        height: 100%;
        clear: both;
        /*display: flex;*/
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        overflow: hidden;
        overflow-y: auto;
    }

    .btn_space .UI-btn {
        /*margin-bottom: 15px;*/
        line-height: 44px;
    }

    .btn_space .UI-btn.disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .btn_space h3 {
        font-size: 18px;
        font-weight: normal;
        color: #333;
        margin-bottom: 15px;
        text-align: center;
    }

    .UI-btn.btn-blue {
        color: #000;
    }

    sup {
        font-size: 14px;
        color: #373334;
    }

    sup.small {
        color: #FF546B;
    }

    /*视图区*/

    .ViewSpace {
        width: 100%;
        height: calc(100% - 72px);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.5s;
    }

    .ViewSpace.moveRight {
        transform: translate3d(100px, 0, 0);
    }

    .ViewSpace .viewBox {
        width: 705px;
        height: 430px;
    }

    .wrap {
        position: relative;
        width: 100%;
        height: 100%;
    }

    /*四个渔场图片的样式*/

    .fisheryWrap,
    .fishery {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .ocean {
        position: absolute;
        left: 129px;
        top: 159px;
        width: 120px;
        height: 96px;
    }

    .mask {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.5);
        z-index: 20;
    }

    .zoomIn {
        position: absolute;
        z-index: 100;
        width: 430px;
        height: 430px;
        left: 50%;
        margin-left: -215px;
        transition: all 0.5s 0.5s;
        border-radius: 6px;
        border: 6px solid #fff;
        background-clip: content-box;
        box-shadow: 0 0 1px 0 #000;
    }

    .zoom {
        position: absolute;
        height: 44px;
        width: 44px;
        z-index: 10;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
    }

    .zoom.zoomButton1,
    .zoom.zoomButton2,
    .zoom.zoomButton3 {
        background-size: 24px 24px;
    }

    .zoom.zoomButton1 {
        left: 18px;
        top: 257px;
    }

    .zoom.zoomButton2 {
        left: 186px;
        top: 257px;
    }

    .zoom.zoomButton3 {
        left: 460px;
        top: 257px;
    }

    .zoom.zoomOut {
        right: 10px;
        top: 10px;
    }

    .showTextExplain {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 5;
    }

    .zoom.ship {
        width: 17px;
        height: 17px;
        background-size: cover;
        left: 219px;
        top: 175px;
        z-index: 0;
        cursor: default;
    }

    .close {
        cursor: pointer;
        width: 20px;
        height: 20px;
    }

    .pos-0 {
        left: 214px;
        top: 77px;
    }

    .pos-1 {
        left: 673px;
        top: 262px;
    }

    .pos-2 {
        left: 440px;
        top: 122px;
    }

    .pos-3 {
        left: 671px;
        top: 123px;
    }

    /*侧边栏部分*/

    .sideWrap {
        width: 220px;
        display: flex;
        justify-content: space-between;
    }

    #buttonGroup {
        position: relative;
        top: 72px;
    }

    /*过渡样式*/

    .show-enter-active,
    .show-leave-active {
        transition: all .5s
    }

    .show-enter,
    .show-leave-to {
        transform: scale3d(0, 0, 0);
    }
</style>