<template>
    <div id="app">
        <ui-head :title="title">
            <ui-btn type="reset1" @click.native="reset"></ui-btn>
        </ui-head>
        <div class="container">
            <!--左侧图区-->
            <div class="viewSpace" :style="{'height':VH+'px','width':VW+'px'}">
                <div class="mainContent" ref="can">
                    <img src="static/img/imgList1/img0.jpg">
                    <img src="static/img/imgList1/img0.jpg">
                </div>
            </div>
            <!--右侧工具栏-->
            <div class="sliderBar">
                <div class="control1">
                    <ui-group type="radio" class="Rd" :groups="groups" v-model="radio" :margin="20"></ui-group>
                </div>
                <div class="control2">
                    <ui-btn type="switch" v-model="isReservoir" class="Res">水库</ui-btn>
                </div>
                <div class="riverCount">
                    <div class="cover"></div>
                    <img :src="src1" alt="" v-show="isShowLine">
                </div>
                <div class="control3">
                    <div class="cover1" v-show="canClick"></div>
                    <ui-btn type="switch" v-model="isShowLine" class="rain">降雨曲线</ui-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import uiHead from './components/UI/uiHead'
    import uiGroup from './components/UI/uiGroup'
    import uiBtn from './components/UI/uiBtn'

    export default {
        name: 'App',
        components: {uiBtn, uiHead, uiGroup},
        data() {
            return {
                title: '人类活动对河流径流量的影响',
                ck1: true,
                isReservoir: false,
                isShowLine: false,
                src: 'static/img/imgList1/img0.jpg',
                src1: 'static/img/Line1.png',
                VW: 0,
                VH: 0,
                zooms: 0,
                radio: '',
                groups: [{
                    name: 'tree',
                    src: "static/img/Tree.png"
                },
                    {
                        name: 'city',
                        src: "static/img/City.png"
                    }],
                num: 0,
                timer: null,
                Cls: 1,
                isOver: false,
                canClick: true,
                store: [
                    [],
                    [],
                    [],
                    []
                ],
            }
        },
        created() {
            this.getViewSize();
            this.LoadImg(1, 0);
        },
        mounted() {
            var that = this;
            this.getViewSize();
            window.addEventListener('resize', that.getViewSize);

        },

        computed: {},
        watch: {
            radio(val) {
                this.changeImg(val)
            },
            isReservoir(val) {
                this.changeImg(this.radio)
            },
        },
        methods: {
            reset() {
                this.isOver = true;
                this.radio = '';
                this.isReservoir = false;
                this.changeImg('tree');
                this.isShowLine = false;
                this.num = 0;
                var tm = setTimeout(() => {
                    this.isOver = false;
                    $(".cover").width("calc(100% - 50px)");
                    this.canClick = true;
                }, 10);
                clearTimeout(this.timer)
                tm = null;
            },
            changeImg(ct1) {
                if (ct1 === 'tree' && this.isReservoir) {
                    this.canClick = false;
                    this.src1 = 'static/img/Line2.png';
                    this.Cls = 2;
                    this.PlayImg(this.Cls)
                }
                if (ct1 === 'city' && this.isReservoir) {
                    this.canClick = false;
                    this.src1 = 'static/img/Line4.png';
                    this.Cls = 4;
                    this.PlayImg(this.Cls)
                }
                if (ct1 === 'tree' && !this.isReservoir) {
                    this.canClick = false;
                    this.src1 = 'static/img/Line1.png';
                    this.Cls = 1;
                    this.PlayImg(this.Cls);
                }
                if (ct1 === 'city' && !this.isReservoir) {
                    this.canClick = false;
                    this.src1 = 'static/img/Line3.png';
                    this.Cls = 3;
                    this.PlayImg(this.Cls);
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
            LoadImg(Cls, max) {
                var that = this;
                return new Promise(function (resolve, reject) {
                    that.preLoadImg(`static/img/imgList${Cls}/img${max}.jpg`).then(function (img) {
                        if (!that.store[Cls - 1][max]) {
                            that.store[Cls - 1][max] = img;
                        }
                        resolve();
                    });
                })
            },
            PlayImg(Cls) {
                var can = this.$refs.can;
                var cover = $('.cover1');
                var w1 = cover.width() - 80;
                var i = 0;
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                this.LoadImg(Cls, i).then(function () {
                    run();
                });

                let run = () => {
                    can.appendChild(this.store[Cls - 1][i]);
                    i += 2;
                    w1 -= 4;
                    $('.cover').css({'width': w1 + 'px'});
                    this.LoadImg(Cls, i).then(() => {
                        if ($('.mainContent img').length > 1)
                            can.removeChild(can.firstChild);
                    });
                    this.timer = setTimeout(run, 150);
                    if (i > 77 || this.isOver) {
                        clearTimeout(this.timer);
                        this.timer = null;
                    }
                }
            },
            getViewSize() {
                var W = window.innerWidth - 330;
                var H = window.innerHeight - 80;
                if (W / H > 1024 / 768) {
                    this.VH = H - 130;
                    this.VW = 1024 * this.VH / 576;
                }
                else {
                    this.VW = W - 20;
                    this.VH = this.VW * 576 / 1024;
                }
            }
        }
    }
</script>

<style>

    *,
    *:before,
    *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
        margin: 0;
        padding: 0;
    }

    html,
    body,
    #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
        background-color: #fff;
        touch-action: none;
        -ms-touch-action: none;
        position: relative;
    }

    div.Ui-head {
        background-color: #fff;

        box-shadow: none;
        top: 0;
        left: 0;
        line-height: 76px;
    }

    .Ui-head > h3 {
        position: absolute;
        left: 20px;
        top: 15px;

    }

    .container {
        width: 100%;
        position: relative;
        height: 100%;
        margin: 0;
        padding: 0;

    }

    .viewSpace {
        position: absolute;

        width: calc(100% - 300px);
        height: 100%;
        left: 30px;
        top: calc(50% - 40px);
        transform: translateY(-50%);

    }

    .mainContent {
        width: 100%;
        height: 100%;

        padding: 5px;

    }

    .mainContent img {
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 6px;
        padding: 5px;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;

    }
img{
    pointer-events: none;
}
    .mainContent img:nth-child(3) {
        z-index: 100;
    }

    .sliderBar {
        width: 250px;
        height: 450px;
        position: absolute;
        right: 16px;
        top: calc(50% - 40px);
        transform: translateY(-50%);
        text-align: center;

        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #4D4D4D;

    }

    .control1 {

        padding: 10px 0;
        display: inline-block;
    }

    .control2 {
        padding: 10px 5px;
        width: 100%;

    }

    div.btn-switch {
        position: relative;
        width: 180px;
        height: 40px;
        box-shadow: #aaa 1px 1px 2px;

    }

    .btn-switch p {
        color: #666;
        position: absolute;
        left: 10px;
        top: 8px;
        padding: 0;
    }

    .riverCount {
        padding: 10px 5px;
        width: 100%;
        position: relative;
        height: 200px;

    }

    .riverCount img {
        width: 100%;
        height: 100%;
        transition: opacity 0.5s;
    }

    .control3 {
        position: relative;
        padding: 10px 10px;
    }

    .rain {
        width: 100% !important;

    }

    .Rd {
        width: 100%;
        text-align: center;
        width: 100%;
    }

    .Res, .rain {
        width: 100% !important;

    }

    div.btn-radio {
        position: relative;
        width: 115px;
        height: 70px;
        display: inline-block !important;

    }

    .btn-48, .Res, .rain, div.btn-radio {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4) !important;
    }

    div.btn-radio p {
        position: absolute;
        left: 50px;
        top: 0;
        width: 80px;
        height: 80px;
        margin: 0;
    }

    div.btn-radio span {
        position: absolute;
        top: 24px;
        left: 20px;
    }

    div.btn-radio p img {
        width: 80%;
        height: 80%;
    }

    div.btn-radio:nth-child(2) {
        margin-left: 15px;
        vertical-align: top;
    }

    .cover {
        width: calc(100% - 100px);
        height: calc(100% - 100px);
        background-color: white;
        position: absolute;
        right: 15px;
        top: 30px;
        z-index: 1;
    }

    .cover1 {
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        opacity: 0.01;
        z-index: 10;

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
</style>
