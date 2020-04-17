<template>
    <div id="app" class="noselect">
        <div class="container">
            <!--头部-->
            <h3 v-text="title" class="app_title"></h3>
            <!--视图区-->
            <div class="view_space">
                <div id="renderCanvas" :style="'background-image:url('+src+')'">
                    <div v-show="loading" style="background:#fff;position:absolute;z-index:99;width:100%;height:100%;text-align: center;line-height: 360px;">loading...</div>
                    <div v-show="yes" @click="blueClick(3)"
                         style="cursor: pointer;position:absolute;right:15px;bottom:10px;z-index:9;"><img
                            src="static/UI/play.png" :style="'width:44px;height:44px;'" alt=""></div>
                </div>
            </div>
        </div>
        <!--侧边按钮区-->
        <div class="app_aside" :style="'pointer-events:'+pe">
            <!--重制按钮-->
            <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget" id="button1"></ui-btn>
            <!--清除浮动-->
            <div class="btn_space" id="btn_space">
                <div :class="{opc:imgt==''}" class="space_img_text"><img :style="'width:240px;height:auto;'" :src="imgt"
                                                                         id="imgt"></div>
                <ui-btn size="big" :class="{op:pe1}" :type="blue1" @click.native="blueClick(1)" id="button2">自由扩散</ui-btn>
                <ui-btn size="big" :class="{op:pe2}" :type="blue2" @click.native="blueClick(2)" id="button3">协助扩散</ui-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import uiHead from '@/components/UI/uiHead';//头部
    import uiBtn from '@/components/UI/uiBtn';//按钮
    export default {
        name: 'app',
        components: {uiHead, uiBtn},
        data() {
            return {
                title: '被动运输',
                //区域大小
                BtnSpaceStyle: 'flex',
                blue1: '',
                blue2: '',
                blue: 0,
                imgt: '',
                yes: false,
                SET:null,
                src: './static/img/1.png',
                pe1: false,
                pe2: false,
                src1: './static/img/01.gif?'+Math.random(),
                src2: './static/img/02.gif?'+Math.random(),
                loading:true,
                pe:'none'
            }
        },
        created() {
            document.title = this.title;
        },
        mounted() {
            this.resize();
            this.getViewSize();
            this.setSideStyle();
            var l1=false,l2=false;
            var I1=new Image();
            I1.src=this.src1;
            I1.onload=()=>{
                l1=true;
                if(l2){
                    this.loading=false;
                    this.pe='auto';
                }
            }
            var I2=new Image();
            I2.src=this.src1;
            I2.onload=()=>{
                l2=true;
                if(l1){
                    this.loading=false;
                    this.pe='auto';
                }
            }
        },
        methods: {
            blueClick(val) {
                if (this.blue == val) {
                    return;
                }
                if (val != 3) {
                    this.blue = val;
                }
                this.yes = false;
                clearTimeout(this.SET);
                if (this.blue == 1) {
                    this.blue1 = 'blue';
                    this.blue2 = '';
                    this.pe2 = true;
                    this.imgt = './static/img/it_1.png';
                    this.imgLi(this.src1, 5300,true);
                    this.imgL('./static/img/01.gif', 1);
                } else if (this.blue == 2) {
                    this.blue2 = "blue";
                    this.blue1 = "";
                    this.pe1 = true;
                    this.imgt = './static/img/it_2.png';
                    this.imgLi(this.src2, 9500,true);
                    this.imgL('./static/img/02.gif', 2);
                }
            },
            imgLi(src, tim,f) {
                var I = new Image();
                I.src = src;
                I.onload = () => {
                    if(this.blue==0&&f){
                        return;
                    }
                    this.src = I.src;
                    if (tim) {
                        this.SET = setTimeout(() => {
                            this.yes = true;
                            clearTimeout(this.SET);
                            return;
                        }, tim);
                    }
                }
            },
            imgL(src, num) {
                var I = new Image();
                I.src = src + '?' + Math.random();
                I.onload = () => {
                    this['src' + num] = I.src;
                    if (num == 1) {
                        this.pe2 = false;
                    } else if (num == 2) {
                        this.pe1 = false;
                    }
                }
            },
            //计算侧边
            setSideStyle() {
                const el = document.getElementById('btn_space');
                if (el && el.scrollHeight > el.offsetHeight) {
                    this.BtnSpaceStyle = 'block'
                } else {
                    this.BtnSpaceStyle = 'flex'
                }
            },
            //计算区块大小
            getViewSize() {
                var w = $('.view_space').width();
                var h = $('.view_space').height();
                var zoom = 1;
                if (w / h > 700 / 380) {
                    zoom = h / 380;
                } else {
                    zoom = w / 700;
                }
                $('#renderCanvas').css('zoom', zoom);
            },
            //窗口大小更改
            resize() {
                const vm = this;
                window.addEventListener('resize', function () {
                    vm.getViewSize();//计算视图区大小
                    vm.setSideStyle();//计算操作区大小
                })
            },
            //重置
            resetWidget() {
                this.blue1 = '';
                this.blue2 = '';
                this.blue = 0;
                this.yes = false;
                this.imgt = '';
                this.imgLi('./static/img/1.png');
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
        width: 700px;
        height: 380px;
        /*border: 1px solid rgba(0, 0, 0, 0.15);*/
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        border-radius: 6px;
        padding: 10px;
        position: relative;
        background-size: contain;
        background-repeat: no-repeat;
        background-origin: content-box;
        background-position: center;
    }

    /*内容区*/
    .container {
        width: calc(100% - 280px);
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

    .view_space {
        margin: 40px 22px 84px 22px;
        width: calc(100% - 44px);
        height: calc(100% - 196px);
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
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
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        overflow: hidden;
        overflow-y: auto;
    }

    .btn_space .UI-btn {
        margin-bottom: 20px;
    }

    .space_img_text {
        position: relative;
        bottom: 58px;
        width: 240px;
        height: 100px;
    }

    .opc {
        opacity: 0;
    }

    .op {
        pointer-events: none;
        opacity: 0.5;
    }

</style>
