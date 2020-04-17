<template>
    <div id="app" class="noselect">
        <!--菜单icon      -->
        <div class="menu" ref="menu" v-show="isSmall" @click="sliderMenu(1)"></div>
        <!--微件名       -->
        <div class="container" ref="container" @click="sliderMenu(2)">
            <h3 v-html="title" style="z-index: 10;" class="app_title title"></h3>
            <div class="Tip" v-if="needTip">建议您在电脑或平板上打开，以获取最佳的演示效果</div>
            <!--序列帧视图-->
            <div class="View_area" ref="view">
                <img :src="src" :style="{'width':W+'px','height':H+'px','left':Cw/2+'px'}"/>
            </div>
        </div>
        <!--侧边栏-->
        <div class="App_slider" ref="slides">
            <ui-btn type="reset1" class="ret" @click.native="reset"></ui-btn>
            <div class="control_group">
                <div @click="ChooseFn(1)" class="water" :class="{active:cls}">黄色反应</div>
                <div @click="ChooseFn(2)" class="change" :class="{active:cls1}">双缩脲反应</div>
            </div>
        </div>
        <div class="hen" v-if="isHp">
            <div><img src="static/img/xuanzhuan.png" alt=""><span>请将屏幕自动旋转功能打开并横屏使用</span></div>
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
                title: '蛋白质的颜色反应',
                isSmall: false,
                src: "static/img/init.png",
                W: 0,
                H: 0,
                isOver: false,
                timer: null,
                isHp: false,
                isMob: 0,
                needTip: false,
                Cw: 0,
                cls: false,
                cls1: false
            }
        },
        created() {
            this.isMob = /iPhone|Android|SymbianOS|Windows Phone/g.test(navigator.userAgent);
        },
        mounted() {
            this.listenResize();
            let that = this;
            window.addEventListener('resize', function () {
                that.listenResize();
            });
        },
        watch: {},
        methods: {
            ChooseFn(val) {
                this.isOver = false;
                let number = Math.random();
                if (val === 1) {
                    this.cls = true;
                    this.cls1 = false;
                    this.preLoadImg(`static/img/yellow100.gif?${number}`).then((imgs) => {
                        this.src = imgs.src
                    })
                }
                else {
                    this.cls = false;
                    this.cls1 = true;
                    this.preLoadImg(`static/img/other100.gif?${number}`).then((imgs) => {
                        this.src = imgs.src
                    })
                }
            },
            listenResize() {
                let W1 = window.innerWidth;
                let H1 = window.innerHeight;
                let boxW = $(".View_area").width();
                let boxH = $(".View_area").height();
                if (W1 === 0 || H1 === 0) {
                    return;
                }
                if (W1 < 500 || H1 < 500) {
                    this.isSmall = true;
                    $('.App_slider').css({'right': '-290px'});
                    $('.menu').css({'top': "0px"});
                    $('.container').css({'width': '100%'});
                    this.Cw = W1;
                    if (H1 > W1 && this.isMob) {
                        this.isHp = true;
                    }
                    else {
                        this.isHp = false;
                    }
                    this.needTip = true;
                    setTimeout(() => {
                        this.needTip = false;
                    }, 3000)
                }
                else {
                    this.isSmall = false;
                    this.isHp = false;
                    $('.container').css({'width': W1 - '290' + 'px'});
                    $('.App_slider').css({'right': '0'});
                    this.Cw = boxW;
                }
                boxW = $(".View_area").width();
                boxH = $(".View_area").height();
                if (W1 / H1 >= 700 / 360) {
                    if (W1 < 500 || H1 < 500) {
                        this.H = boxH - 70;
                        this.W = this.H * 1360 / 720
                    }
                    else {
                        this.H = boxH - 180;
                        this.W = this.H * 1360 / 720
                    }
                }
                else {
                    this.W = boxW - 120;
                    this.H = this.W * 750 / 1360;
                }
            },

            sliderMenu(val) {
                let W1 = window.innerWidth;
                if (val === 1) {
                    $('.container').css({'width': W1 - '290' + 'px'});
                    $('.menu').css({'top': "-50px"});
                    $('.App_slider').css({'right': '0'});
                }
                if (val === 2 && this.isSmall) {
                    this.isSmall = true;
                    $('.container').css({'width': '100%'});
                    $('.menu').css({'top': "0px"});
                    $('.App_slider').css({'right': '-290px'});
                }
            },
            preLoadImg(src) {
                return new Promise((resolve, reject) => {
                    var image = new Image();
                    image.onload = () => {
                        resolve(image);
                    };
                    image.onerror = () => {
                        reject(image);
                    };
                    image.src = src;
                })
            },
            reset() {
                this.isOver = true;
                this.src = 'static/img/init.png';
                this.cls = false;
                this.cls1 = false;
            }
        },
    }
</script>
<style>
    * {
        margin: 0;
        padding: 0;
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
        position: relative;
        margin: 0;
        padding: 0;
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

    .menu {
        position: absolute;
        right: 20px;
        top: -50px;
        width: 48px;
        height: 48px;
        background: url("../static/img/menu.png") no-repeat no-repeat;
        background-size: contain;
        background-position: center center;
        z-index: 10;
        cursor: pointer;
        transition: all 1s;
    }

    img {
        pointer-events: none;
    }

    .app_title {
        font-size: 24px;
        margin-left: 15px;
        height: 45px;
        line-height: 45px;
        padding: 10px;
        font-weight: normal;
        color: #000;
    }

    .container {
        width: calc(100% - 280px);
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;

    }

    .App_slider {
        position: absolute;
        right: 0;
        top: 0;
        background-color: #f7f7f7;
        width: 280px;
        height: 100%;
        transition: all 1s;
        z-index: 105;
    }

    .ret {
        position: absolute;
        right: 20px;
        top: 20px;
    }

    .control_group {
        width: 100%;
        padding: 30px 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
    }

    .btn-radio {
        position: relative;
        display: inline-block !important;
        width: 80px !important;
        height: 60px !important;
        vertical-align: top;
        margin: 0 3px;

    }

    .btn-radio > p {
        width: 100% !important;
        position: absolute;
        left: 0;
        top: 10px;
        font-size: 16px !important;
        color: black !important;
    }

    .btn-radio span {
        position: absolute;
        top: 35px;
    }

    #sliderer {

        outline: none;
        box-shadow: none;
    }

    .control_group > div, .water, .change {
        width: 258px;
        margin: 3% 0;
        display: inline-block;
        background-color: #fff;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        font-size: 20px;
    }

    .water, .change {
        font-family: PingFangSC-Medium;
        height: 45px;
        outline: none;
        padding: 0;
        line-height: 45px;
        cursor: pointer;

    }

    .View_area {
        width: 100%;
        height: 100%;
        position: relative;
        display: inline-block;
        margin: 0 auto;
        text-align: center;

    }

    .View_area img {
        position: absolute;

        top: calc(50% - 20px);
        left: 50%;

        transform: translate(-50%, -50%);
        padding: 10px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
        border-radius: 5px;
    }

    .hen {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background-color: #fff;

    }

    .hen div {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
    }

    .Tip {
        padding: 0 10px;
        position: fixed;
        display: inline-block;
        width: 450px;
        height: 48px;
        border-radius: 100px;
        z-index: 200;

        border: 2px solid #ddd;
        font-size: 18px;
        color: #333;

        line-height: 46px;
        margin: 0 auto;
        left: 50%;
        background-color: white;
        transform: translateX(-50%);
    }

    .active {
        background-color: #5CAEFD !important;
        color: white;
    }

    @media all and (orientation: landscape) {
        .App_slider {
            opacity: 0.8;
        }

    }
</style>