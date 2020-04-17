<template>
    <div id="app" class="noselect">
        <div class="container" :style="'position: relative;'">
            <!--头部-->
            <h3 v-text="title" class="app_title"></h3>
            <!--视图区-->
            <div id='show'>
                <div class="view_space">
                    <img :src="'static/image/a'+num+'.png'" alt="">
                </div>
            </div>
            <ui-slider direction="vertical"
                       :boxWidth="80"
                       :boxHeight="440"
                       id="slider"
                       title="时间"
                       :speed='0'
                       :noBlueProcess="false"
                       :min="1"
                       :max="90"
                       v-model='value'
                       :realTime="true"
                       :processWidth="6"></ui-slider>
        </div>
        <!--侧边按钮区-->
        <div class="app_aside">
            <!--重制按钮-->
            <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
            <!--清除浮动-->
            <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
                <div style='width: 244px;height: 232px;margin:0 auto;'>
                    <img src="../static/image/bj.png" style='width: 244px;height: 232px;'/>
                </div>
                <ui-btn type="play" v-model="played" style='margin:20px auto 0 auto;'></ui-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import uiHead from '@/components/UI/uiHead';//头部
    import uiBtn from '@/components/UI/uiBtn';//按钮
    import uiSlider from '@/components/UI/uiSlider';//滑块
    export default {
        name: 'app',
        components: {uiHead, uiBtn, uiSlider},
        data() {
            return {
                title: '江淮准静止锋的移动路径',
                BtnSpaceStyle: 'flex',
                played: true,
                num: 1,
                value: 1,
                TM: null,
            }
        },
        created() {
            document.title = this.title;
        },
        watch: {
            value(v) {
                var I = new Image();
                I.src = './static/image/a' + v + '.png';
                var thiz = this;
                I.onload = function () {
                    thiz.num = v;
                }
                if (v <= 90 && v > 45) {
                    $('#s2').css('background', '#5caefd');
                    $('#s3').css('background', '#5caefd');
                } else if (v <= 45 && v >= 1) {
                    $('#s2').css('background', '#f0f0f0');
                    $('#s3').css('background', '#5caefd');
                }
            },
            played() {
                var thiz = this;
                if (!this.played) {
                    if (thiz.value == 90) {
                        thiz.value = 1;
                    }
                    this.TM = setInterval(function () {
                        if (thiz.value == 89) {
                            thiz.played = true;
                            clearInterval(thiz.TM);
                        }
                        thiz.value++;
                    }, 100)
                } else {
                    clearInterval(thiz.TM);
                }
            }
        },
        mounted() {
            this.setSideStyle();
            $('#slider').append('<div id="sliderP"><span id="s1"><h5>7月中旬</h5></span><span id="s2"><h5>6月中旬</h5></span><span id="s3"><h5>5月中旬</h5></span></div>');
            window.addEventListener('resize', () => {
                this.setSideStyle();
            });
        },
        methods: {
            //计算侧边
            setSideStyle() {
                var W = window.innerWidth - 280;
                var H = window.innerHeight - 140;
                var zoom;
                if (W / H > 740 / 440) {
                    zoom = H / 440;
                } else {
                    zoom = W / 740;
                }
                $('#show').css({
                    'transform':'scale('+zoom+') translateY(-45%)',
                    '-moz-transform':'scale('+zoom+') translateY(-45%)',
                    '-moz-transform-origin':'top left',
                    'transform-origin':'top left',
                    'width':W/zoom,
                });
                let n = -50/zoom;
                $('.view_space').css({
                    'transform':' translateX('+n+'px)'
                })
            },
            //重置
            resetWidget() {
                clearInterval(this.TM);
                this.value = 1;
                this.num = 1;
                this.played = true;
            }
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

    input, button {
        outline: none;
        -webkit-appearance: none;
        border-radius: 0;
    }

    #slider > div#sliderP {
        position: absolute;
        background: transparent;
        top: 42px;
        width: calc(100% - 44px);
        height: 14px;
    }

    #slider > div#sliderP > span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: #f0f0f0;
        border-radius: 50%;
        position: absolute;
        top: -1px;
    }

    #sliderP h5 {
        font-size: 11px;
        font-weight: 600;
        margin-top: -2px;
        width: 50px;
        height: 20px;
        margin-left: 14px;
        text-align: center;
    }

    #slider > div#sliderP > span#s1 {
        left: 2px;
        top: 4px;
    }

    #slider > div#sliderP > span#s2 {
        left: 2px;
        top: 182px;
    }

    #slider > div#sliderP > span#s3 {
        left: 2px;
        top: 363px;
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

    html, body, #app {
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
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently not supported by any browser */
    }

    /*ui*/
    .UI-camera {
        width: 80px;
        height: 80px;
        cursor: pointer;
    }

    #renderCanvas {
        border: 1px solid rgba(0, 0, 0, 0.15);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        border-radius: 6px;
        padding: 10px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-origin: content-box;
    }

    .canvas_item {
        float: left;
        width: 50%;
        height: 50%;
    }

    .canvas_item img {
        width: 100%;
        height: 100%;
    }

    /*内容区*/
    .container {
        width: calc(100% - 280px);
        float: left;
        height: 100%;
    }

    .container > h3 {
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
    .view_space {
        width: 559px;
        height: 421px;
        padding: 10px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.20);
        border-radius: 5px;
        background-origin: content-box;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #fff;
        background-size: contain;
        margin:0 auto;
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
        padding:0 20px;
        width: 100%;
        height: calc(100% - 80px);
        clear: both;
        /*display: flex;*/
        /*align-items: center;*/
        justify-content: center;
        flex-direction: column;
        overflow: hidden;
        overflow-y: auto;
    }

    #slider {
        position: absolute;
        display: block;
        float: right;
        top: 50%;
        transform: translateY(-50%);
        right: 20px;
    }
    #show{
        position: absolute;
        top:50%;
    }
</style>
