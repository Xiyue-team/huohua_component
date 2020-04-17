<template>
    <div id="app" class="noselect">
        <div class="container">
            <!--头部-->
            <div class="cover">
                <div class="landscape">
                    <img src="static/image/cover1.png">
                </div>
            </div>
            <div class="hint" v-if="hiddenMobTip">
                <h5>建议您在电脑或平板上打开，以获取最佳的演示效果</h5>
            </div>
            <ui-btn id="button1" type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
            <h3 v-text="title" class="app_title"></h3>
            <!--视图区-->
            <div class="ViewSpace">
                <div :style="[zoom]" class="viewBox">
                    <div class="imgWrap" ref='canvas'>
                        <img :src="'static/image/'+num+'.jpg'">
                        <img :src="'static/image/'+num+'.jpg'">
                    </div>
                </div>
            </div>
            <div class="footerTrue">
                <div class="cz">
                </div>
                <div class="footer">
                    <ui-slider id='slider' class="footerSlider" :min="0" :max="151" :title="false" :box="false"
                               :boxHeight="30" :tooltip="false" :speed="0" :timeLine="false" v-model='value'
                               :label="[['','反应物'],['','断键'],['','成键'],['','生成物']]">
                    </ui-slider>
                    <div class="footerBtn" @click="played" id="button2">
                        <img :src="changePlayImg">
                    </div>
                </div>
                <div class="cz">
                </div>
            </div>
        </div>
        <div id="notSupported" ref="notSupported">loading...</div>
        <!--侧边按钮区-->
    </div>
</template>
<script>
    import uiBtn from '@/components/UI/uiBtn'; //按钮
    import uiSlider from '@/components/UI/uiSlider';

    export default {
        name: 'app',
        components: {uiBtn, uiSlider},
        data() {
            return {
                title: '乙醛与氢氰酸的加成反应',
                BtnSpaceStyle: 'flex',
                zoom: {}, //区域大小
                isPlayed: false,
                value: 0,
                num: 0,
                timer: null,
                changePlayImg: "static/image/play@2x.png",
                sliderPoint: [0, 50, 100, 151],
                sliderPoint1: [0, 50, 100, 151],
                index: 0,
                f: "",
                store: "",
                mark: 0,
                hiddenMobTip: false,
                spanDown: false
            }
        },
        created() {
            document.title = this.title;
            this.arr = [];
            this.store = {};
            for (let i = 0; i < 152; i++) {
                this.arr.push(i);
            }
            let promises = this.arr.map((value, index) => {
                return this.preloadImage(`static/image/${value}.jpg`).then((image) => {
                    this.store[index] = image;
                })
            });
            Promise.all(promises).then(() => {
                this.$refs.notSupported.style.display = 'none';
            })
        },
        mounted() {
            this.f = document.getElementById("canvas");
            this.resize();
            this.getViewSize();
            $('#slider').append('<div id="sliderP"><span id="s1"></span><span id="s2"></span><span id="s3"></span><span id="s4"></span></div>');

            this.setSliderPonint();
            let thiz = this;

            let mql = window.matchMedia("(orientation: portrait)");

            function onMatchMeidaChange(mql) {
                clearTimeout(thiz.tipTimer);
                if (mql.matches) {
                    // 竖屏
                    thiz.isLandscape = false
                } else {
                    thiz.isLandscape = true;
                    if (window.innerWidth < 500 || window.innerHeight < 500) {
                        thiz.hiddenMobTip = true;
                        thiz.tipTimer = setTimeout(() => {
                            thiz.hiddenMobTip = false;
                        }, 3000)
                    }
                }
            }

            onMatchMeidaChange(mql);
            mql.addListener(onMatchMeidaChange);
        },
        computed: {},
        watch: {
            value(v) {
                let dom = this.$refs.canvas;
                this.num = v;
                dom.appendChild(this.store[v]); //先添加后删除 入栈速度略高于出栈
                if (this.store[v]) {
                    dom.removeChild(dom.firstChild);
                }
                let indexArr = this.sliderPoint.filter(function (value) {
                    return value <= v;
                });
                $('#sliderP span:lt(' + (indexArr.length) + ')').css('background', '#5caefd');
                $('#sliderP span:gt(' + (indexArr.length - 1) + ')').css('background', '#f0f0f0');
            }
        },
        methods: {
            preloadImage(path) {
                return new Promise((resolve, reject) => {
                    let image = new Image();
                    image.onload = () => resolve(image);
                    image.onerror = reject;
                    image.src = path;
                })
            },
            //计算滑条各点的位置
            setSliderPonint() {
                let vm = this;
                let sliderW = $('#slider').width();
                $('#sliderP span').each(function () {
                    $(this).index();
                    $(this).css("left", sliderW * vm.sliderPoint[$(this).index()] / 151 - 7)
                });
                $('.ui-label li').each(function () {
                    $(this).index();
                    $(this).css("left", sliderW * vm.sliderPoint[$(this).index()] / 151 + 22)
                })
            },
            //计算区块大小
            getViewSize() {
                const W = this.W = window.innerWidth;
                const H = this.H = window.innerHeight - 150;
                if (W / H >= 1024 / 426) {
                    this.zoom = {
                        zoom: H / 426,
                    }
                } else {
                    this.zoom = {
                        zoom: W / 1024,
                    }
                }
            },
            //窗口大小更改
            resize() {
                const vm = this;
                window.addEventListener('resize', function () {
                    vm.getViewSize();
                    vm.setSliderPonint();
                    clearTimeout(vm.timer);
                    //若直接调用该函数，会出现当窗口大小改变过快时，js获取的滑条宽度和实际滑条宽度不一样，从而导致渐变色不在需求点上，
                    //分析原因可能为函数调用栈顺序出错；开启延时定时器，让函数进入队列，永远在resize事件后闲时触发；
                })
            },
            //play按钮
            played() {
                let thiz = this;
                if (!this.isPlayed) {
                    this.changePlayImg = 'static/image/pause@2x.png';
                    if (thiz.value === 151) {
                        thiz.value = 2;
                        thiz.index = -1;
                    }
                    let p = function () {
                        if (thiz.value === 151) {
                            thiz.isPlayed = false;
                            thiz.index = -1;
                            thiz.changePlayImg = 'static/image/play@2x.png';
                            clearTimeout(thiz.timer);
                            return;
                        }
                        thiz.value++;
                        thiz.timer = setTimeout(p, 100);
                    };
                    p();
                } else {
                    clearTimeout(thiz.timer);
                    this.changePlayImg = 'static/image/play@2x.png'
                }
                this.isPlayed = !this.isPlayed;
            },
            //重置
            resetWidget() {
                clearTimeout(this.timer);
                this.value = 0;
                this.isPlayed = false;
                this.changePlayImg = 'static/image/play@2x.png';
                this.mark = 1;
                this.spanDown = false
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

    img {
        pointer-events: none;
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

    .imgWrap video {
        width: 100%;
        height: 100%;
        position: absolute;
    }

    /*ui*/

    .UI-camera {
        width: 80px;
        height: 80px;
        cursor: pointer;
    }

    /*内容区*/

    .container {
        width: 100%;
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
        float: left;
        width: 280px;
        background-color: #F7F7F7;
        height: 100%;
        box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);
    }

    .insp-wrapper {
        width: 100%;
        height: 100%;
    }

    .aside_reset {
        margin: 20px 24px;
        float: right;
    }

    .btn_space {
        padding: 20px;
        width: 100%;
        height: calc(100% - 80px);
        clear: both;
        /*display: flex;*/
        align-items: center;
        justify-content: center;
        flex-direction: column;
        overflow: hidden;
        overflow-y: auto;
    }

    #notSupported {
        color: #232F32;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background-color: #ffffff;
        text-align: center;
        padding-top: 0;
        font-size: 30px;
        z-index: 999;
        cursor: default
    }

    .btn_space .UI-btn {
        margin-bottom: 15px;
        line-height: 35px;
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

    .hidden {
        display: none
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

    img {
        pointer-events: none;
    }

    /*视图区*/

    .ViewSpace {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ViewSpace .viewBox {
        position: relative;
        width: 720px;
        height: 380px;
        padding: 20px 11px;
        background: #FFFFFF;
        border-radius: 10px;
        border: 0 solid rgba(0, 0, 0, 0.12);
        box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.35);
        margin: 5px;
    }

    .viewBox .imgWrap {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 98%;
        height: 98%;
        margin: auto;
    }

    .imgWrap .describeText {
        position: absolute;
        top: -10px;
        right: 20px;
        width: 300px;
        padding: 16px 20px;
        line-height: 26px;
        font-size: 16px;
        border-radius: 6px;
        background-color: #ffffff;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
        border: solid 0.5px rgba(0, 0, 0, 0.06);
    }

    .imgWrap .describeText p:first-child {
        margin-bottom: 16px;
    }

    .imgWrap .view_space {
        display: inline-block;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .footer {
        display: flex;
        align-items: center;
        margin: 30px 0px 24px 0px;
        width: 50%;
        padding-right: 20px;
        padding-left: 10px;
        height: 60px;
        font-size: 16px;
        border-radius: 6px;
        background-color: #ffffff;
        box-shadow: 0 0px 5px 1px rgba(0, 0, 0, 0.2);
        border: solid 0.5px rgba(0, 0, 0, 0.06);
    }

    .footerTrue {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 15px 0px 24px 0px;
        padding-right: 0px;
        padding-left: 0px;
        height: 60px;
        font-size: 16px;
    }

    .footerSlider {
        margin: 0 30px;
    }

    .cz {
        height: 70px;
        width: 15%;
        margin: 30px 0px 24px 10px;
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .cz div {
        width: 65%;
        margin: 5px 8px 5px 0px;
    }

    .vue-slider {
        /* margin:45px auto !important;*/
    }

    .ui-label {
        width: 95% !important;
    }

    @media screen and (max-width: 834px) {
        #slider .ui-label li div {
            font-size: 14px;
        }
    }

    @media screen and (max-width: 834px) {
        .footerSlider {
            padding: 0 22px !important;
            margin: 0;
        }
    }

    #slider > div#sliderP {
        position: absolute;
        background: transparent;
        top: 18px;
        width: calc(100% - 44px);
        height: 14px;
        z-index: 1
    }

    #slider > div#sliderP > span {
        display: inline-block;
        width: 14px;
        height: 14px;
        background: #f0f0f0;
        border-radius: 50%;
        position: absolute;
    }

    .footerSlider {
        flex-grow: 1;
        font-size: 16px;
    }

    .footerBtn {
        position: relative;
        z-index: 10;
        width: 60px;
        height: 60px;
        cursor: pointer;
    }

    .footerBtn img {
        position: absolute;
        width: 100%;
        height: auto;
        top: 0;
        bottom: 0;
        margin: auto;
    }

    .rightBtn {
        height: 30px;
        font-size: 14px !important;
        /* color:#666 !important;*/
        font-weight: 600 !important
    }

    .imgWrap img {
        width: 100%;
        height: 100%;
        position: absolute;
    }

    @media all and (orientation: portrait) {

        .landscape {
            width: 260px;
            height: 198px;
            margin: auto;
            background: rgba(255, 255, 255, 0.92);
            border: 1px solid rgba(0, 0, 0, 0.06);
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.09);
            border-radius: 12px;
            z-index: 1000;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .landscape img {
            width: 100%;
            height: auto;
            position: absolute;
            margin: auto;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .cover {
            width: 100%;
            height: 100%;
            z-index: 1000;
            position: absolute;
            background-color: rgba(255, 255, 255, 1);
        }

        .hint {
            display: none;
        }
    }

    @media all and (orientation: landscape) {

        .landscape {
            display: none;
        }

        .landscape img {
            display: none;
        }

        .cover {
            display: none;
        }

        .hint {
            position: absolute;
            margin-left: auto;
            margin-right: auto;
            top: 10px;
            width: 60%;
            height: 40px;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(0, 0, 0, 0.06);
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.09);
            border-radius: 100px;
            transition: display 1s;
            line-height: 40px;
        }

        .hint h5 {
            margin: auto;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            position: absolute;
            text-align: center;
        }
    }
</style>