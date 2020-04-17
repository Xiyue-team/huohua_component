<template>
    <div id="app" class="noselect">
        <!--菜单icon-->
        <div class="menu" ref="menu" v-show="isSmall" @click="sliderMenu(1)"></div>
        <div class="container" ref="container" @click="sliderMenu(2)">
            <!--微件名 -->
            <h3 v-html="title" style="z-index: 10;" class="app_title title"></h3>
            <div class="Tip" v-if="needTip">建议您在电脑或平板上打开，以获取最佳的演示效果</div>
            <!--序列帧视图-->
            <div class="View_area" ref="can">
                <img src="static/img/init.png" :style="{'width':W+'px','height':H+'px','left':Cw/2+'px'}"/>
                <img src="static/img/init.png" :style="{'width':W+'px','height':H+'px','left':Cw/2+'px'}"/>
            </div>
        </div>
        <!--侧边栏-->
        <div class="App_slider" ref="slides">
            <ui-btn type="reset1" class="ret" @click.native="reset"></ui-btn>
            <div class="control_group">
                <div @click="ChooseFn(1)" class="water">蛋白质水解</div>
                <ui-group type="radio" v-show="fn1"
                          :margin="20"
                          :groups="groups1"
                          v-model="radio1">
                </ui-group>
                <div @click="ChooseFn(2)" class="change">蛋白质变性</div>
                <ui-group type="radio" v-show="fn2"
                          :margin="20"
                          :groups="groups2"
                          v-model="radio2">
                </ui-group>
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
                title: '蛋白质的水解和变性',
                isSmall: false,
                src: "static/img/init.png",
                src1: "static/img/init.png",
                store: [
                    [],
                    [],
                    [],
                    []
                ],
                radio1: 'begin',
                radio2: 'begin1',

                groups1: [{
                    name: 'begin',
                    txt: '未水解'
                },
                    {
                        name: 'then',
                        txt: '部分水解'
                    },
                    {
                        name: 'end',
                        txt: '完全水解'
                    }

                ],
                groups2: [{
                    name: 'begin1',
                    txt: '活性蛋白质'
                },
                    {
                        name: 'then1',
                        txt: '变性'
                    },
                    {
                        name: 'end1',
                        txt: '复性'
                    }
                ],
                fn1: false,
                fn2: false,
                W: 0,
                H: 0,
                isOver: false,
                timer: null,
                isHp: false,
                isMob: 0,
                needTip: false,
                Cw: 0,
            }
        },
        created() {
            //检测是否为手机
            this.isMob = /iPhone|Android|SymbianOS|Windows Phone/g.test(navigator.userAgent);
        },
        mounted() {
            this.listenResize();
            var that = this;
            var tm = null;
            window.addEventListener('resize', function () {
                that.listenResize();
            });
            $('#sliderer span').each(function (index, v) {
                //按钮上方的文字颜色问题
                if ($(v).hasClass('checked')) {
                    $(v).parent().find('p').addClass('actv')
                }
                else {
                    $(v).parent().find('p').removeClass('actv')
                }
            });
            $('#sliderer span').click(function (e) {
                //延时的作用是防止点击未响应
                tm = setTimeout(function () {
                    $('#sliderer span').each(function (index, v) {
                        //按钮上方的文字颜色问题
                        if ($(v).hasClass('checked')) {
                            $(v).parent().find('p').addClass('actv')
                        }
                        else {
                            $(v).parent().find('p').removeClass('actv')
                        }
                    })
                }, 20);
                tm = null;
            });


        },
        watch: {
            radio1(val) {
                this.ChangeImg(val);
            },
            radio2(val) {
                this.ChangeImg(val);
            }
        },
        methods: {
            ChooseFn(val) {
                if (val === 1) {
                    //一次只显示一个操作面板
                    this.fn1 = true;
                    this.fn2 = false;
                    this.LoadImg(1, 49, 0);
                    this.LoadImg(2, 49, 0);
                }
                else {
                    this.fn1 = false;
                    this.fn2 = true;
                    this.LoadImg(3, 62, 0);
                    this.LoadImg(4, 62, 0);
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
                if ((W1 < 500 || H1 < 500) && this.isMob) {
                    this.isSmall = true;
                    this.Cw = W1;
                    $('.App_slider').css({'right': '-290px'});
                    $('.menu').css({'top': "0px"});
                    $('.container').css({'width': '100%'});
                    //提示信息
                    if (H1 > W1 && this.isMob) {
                        this.isHp = true;
                    } else {
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
                    this.Cw = boxW + 15;
                }
//再次获取宽高，因为前面的宽高已经改变
                boxW = $(".View_area").width();
                boxH = $(".View_area").height();
                if (W1 / H1 > 1024 / 576) {
                    if (W1 < 500 || H1 < 500) {
                        this.H = boxH - 70;
                        this.W = this.H * 1024 / 576
                    } else {
                        this.H = boxH - 200;
                        this.W = this.H * 1024 / 576
                    }
                }
                else {
                    if (W1 < 500 || H1 < 500) {
                        this.W = boxW - 120;
                        this.H = this.W * 576 / 1020;
                    } else {
                        this.W = boxW - 55;
                        this.H = this.W * 576 / 1020;
                    }
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
            //图片预加载
            preLoadImg(src) {
                return new Promise((resolve, reject) => {
                    let image = new Image();
                    let Cw = this.Cw;
                    let W = this.W;
                    let H = this.H;

                    $(image).css({'width': W + 'px', 'height': H + 'px', 'left': Cw / 2 + 'px'});
                    image.src = src;
                    image.onload = () => {
                        resolve(image);
                    };
                    image.onerror = () => {
                        reject(image);
                    };

                })
            },

            ChangeImg(type) {

                if (type === 'then') {
                    this.isOver = false;
                    this.PlayImg(1, 49, 0);
                }
                if (type === 'end') {
                    this.isOver = false;
                    this.PlayImg(2, 49, 0);
                }
                if (type === 'then1') {
                    this.isOver = false;
                    this.PlayImg(3, 62, 0);

                }
                if (type === 'end1') {
                    this.isOver = false;
                    this.PlayImg(4, 62, 0)
                }
                if (type === 'begin') {
                    this.isOver = true;
                    let that = this;
                    let can = this.$refs.can;
                    clearTimeout(that.timer);
                    if(can.firstChild){
                        can.removeChild(can.firstChild);
                        can.appendChild(that.store[0][0]);
                    }
                }


                if (type === 'begin1') {
                    this.isOver = true;
                    let that = this;
                    let can = this.$refs.can;
                    clearTimeout(that.timer);
                    if(can.firstChild){
                        can.removeChild(can.firstChild);
                        can.appendChild(that.store[2][0]);
                    }
                }

            },
            LoadImg(Cls, max, begin) {
                let that = this;
                let arr = [];
                for (var i = 0; i <= max; i++) {
                    arr.push(i)
                }
                arr.map((value, index) => {
                    this.preLoadImg(`static/img/TB${Cls}/a${value}.png`).then(function (img) {
                        that.store[Cls - 1][index] = img
                    })
                });
            },
            PlayImg(Cls, max, begin) {
                let that = this;
                let can = this.$refs.can;
                begin = begin || 0;
                let i = begin;
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                function run() {
                    if(can.firstChild){
                        can.removeChild(can.firstChild);
                        can.appendChild(that.store[Cls - 1][i]);
                    }
                    i++;
                    that.timer = setTimeout(run, 100);
                    if (i > max || that.isOver) {
                        clearTimeout(that.timer)
                    }
                }
                run();
            },
            reset() {
                this.fn1 = false;
                this.fn2 = false;
                this.radio1 = 'begin';
                this.radio2 = 'begin';
                this.isOver = true;
                $('#sliderer p').removeClass('actv');
                $('.btn-radio').eq(3).find('p').addClass('actv');
                $('.btn-radio').eq(0).find('p').addClass('actv');



            }
        },
    }
</script>
<style>
    /*盒模型，padding尺寸不用再减去*/
    *,
    *:before,
    *:after {
        margin: 0;
        padding: 0;
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
        right: 20px;
        top: -50px;
        width: 48px;
        height: 48px;
        background: url("./img/menu.png") no-repeat no-repeat;
        background-size: contain;
        background-position: center center;
        z-index: 10;
        cursor: pointer;
        transition: all 1s;
    }

    .menu, .container, .App_slider, .ret, .control_group {
        position: absolute;
    }

    div.UI-btn {
        box-shadow: 0 0 #fff !important;
    }

    .app_title {
        font-weight: normal;
        font-size: 24px;
        margin-left: 15px;
        height: 45px;
        line-height: 45px;
        padding: 10px;
        color: #000000;

    }

    img {
        pointer-events: none;
    }

    .container {
        width: calc(100% - 300px);
        height: 100%;
        left: 0;
        top: 0;

    }

    .App_slider {
        right: 0;
        top: 0;
        background-color: #f7f7f7;
        width: 290px;
        height: 100%;
        transition: all 1s;
        z-index: 105;
    }

    .ret {
        right: 20px;
        top: 20px;
        z-index: 99999;
    }

    .control_group {
        width: 100%;
        padding: 30px 0;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
    }

    .btn-radio {
        position: relative;
        display: inline-block !important;
        width: 81px !important;
        height: 60px !important;
        vertical-align: top;

    }

    div.btn-radio p {
        width: 100% !important;
        position: absolute;
        left: 0;
        top: 10px;
        font-size: 16px !important;
        color: #999;
    }

    .control_group div:nth-child(4) div.btn-radio:nth-child(1) p {
        padding: 0;
        left: 2px;
    }

    .control_group div:nth-child(4) div.btn-radio:nth-child(2) p {
        padding: 0;
        left: 2px;
    }

    .control_group div:nth-child(4) div.btn-radio:nth-child(3) p {
        padding: 0;
        left: 2px;
    }

    .btn-radio span {
        position: absolute;
        top: 35px;
        margin: 10px 17px;
    }

    .control_group > div, .water, .change {

        margin: 3% 0;
        display: inline-block;
        background-color: #fff;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        font-size: 20px;
    }

    .water, .change {

        line-height: 45px;
        height: 45px;
        outline: none;
        padding: 0;
        cursor: pointer;
    }

    .control_group > div {
        width: calc(100% - 45px) !important;
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
        border: 1px solid #ccc;

        top: calc(50% - 20px);
        left: 50%;

        border-radius: 6px;
        transform: translate(-50%, -50%);
        z-index: 10;
    }

    .View_area img:nth-child(1) {
        z-index: 1000;
    }

    .View_area img:nth-child(2) {
        z-index: 100;
    }

    .View_area img:nth-child(3) {
        z-index: 10;
    }
    .View_area img:last-child{
        z-index: 10001 !important;
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

    .actv {
        color: #000 !important;
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

    @media all and (orientation: landscape) {
        .App_slider {
            opacity: 0.8;
        }

        .control_group {
            margin-top: 30px;
        }
    }
</style>