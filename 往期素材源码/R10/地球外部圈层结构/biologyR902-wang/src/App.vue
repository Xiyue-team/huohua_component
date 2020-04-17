<template>
    <div id="app" class="noselect">
        <div class="container">
            <!--头部-->
            <ui-btn id="button1" type="reset1" class="aside_reset" @click.native="resetWidget" v-show="isShow"></ui-btn>
            <div @click="textBtn" v-show="num!==0&&isShow" id="textB"><img :src="textBp"></div>
            <div v-show="textBpF" id="textM"><img :src="textPic"></div>
            <h3 v-text="title" class="app_title"></h3>
            <!--视图区-->
            <div id="view" :style="'width:'+W+'px;height:'+H+'px;'" ref="view">
                <div class="ViewSpace">
                    <div id="bg">
                        <img src="static/UI/bg.png">
                    </div>
                    <div id="viewM" :class="{op:num===0}">
                        <img :class="{op:num!==1}" :src="'static/UI/bg1.png'">
                        <img :class="{op:num!==2}" :src="'static/UI/bg2.png'">
                        <img :class="{op:num!==3}" :src="'static/UI/bg3.png'">
                    </div>
                </div>
                <div :class="{vi:num!==0}">
                    <img class='btn' @click="choose(1)" :style="'bottom:'+ .19*H+'px;right:'+.38*W+'px;width:'+.03*W+'px;height:auto;'" src="static/UI/click.png">
                    <img class='btn' @click="choose(2)" :style="'bottom:'+.44*H+'px;right:'+.31*W+'px;width:'+.03*W+'px;height:auto;'" src="static/UI/click.png">
                    <img class='btn' @click="choose(3)" :style="'bottom:'+.29*H+'px;right:'+.14*W+'px;width:'+.03*W+'px;height:auto;'" src="static/UI/click.png">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider';
export default {
    name: 'app',
    components: { uiBtn, uiSlider },
    data() {
        return {
            title: '地球的外部圈层结构 ',
            num: 0,
            W: 0,
            H: 0,
            textBp: 'static/UI/textBtn1.png',
            textBpF: false,
            textPic: '',
            isShow: true,
        }
    },
    created() {
        document.title = this.title;
        this.timer = null;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    },
    mounted() {
        this.resize();
        this.sizeChange();
    },
    methods: {
        textBtn() {
            if (this.num == 0) {
                return;
            }
            if (this.textBpF) {
                this.textBp = 'static/UI/textBtn1.png';
                this.textBpF = false;
            } else {
                this.textBp = 'static/UI/textBtn2.png';
                this.textBpF = true;
            }
        },
        //窗口大小更改
        resize() {
            const vm = this;
            window.addEventListener('resize', function() {
                vm.sizeChange();
            });
        },
        sizeChange() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            if (this.width /  this.height > 1039 / 867) {
                this.W = this.width;
                this.H = parseInt(this.width / 1039 * 867);
            } else {
                this.W = parseInt(this.height / 867 * 1039);
                this.H = this.height;
            }
        },
        choose(num) {
            if (num == this.num) {
                return;
            }
            let view = this.$refs.view;
            this.isShow = false;
            this.num = num;
            setTimeout(() => {
                this.textPic = `static/UI/${num}.png`;
                this.isShow = true;
            }, 1000);
            var CW, CH, HS, WS, zoom;
            CW = this.W;
            CH = this.H;
            if (num == 1) { //水圈 
                HS = 0;
                WS = (CW * 1.2 - this.width);
                zoom = 1.2;
            } else if (num == 2) { //大气圈
                HS = (CH * 1.1 - this.height);
                WS = 0;
                zoom = 1.1;
            } else if (num == 3) { //生物圈
                HS = 0;
                WS = 0;
                zoom = 1.2;
            }
            var CWZ=parseInt(CW * zoom);
            var CHZ=parseInt(CH * zoom);
            // setTimeout(() => {
                // $('#view').animate({
                //     width: CWZ + 'px',
                //     height: CHZ + 'px',
                //     bottom: -HS + 'px',
                //     right: -WS + 'px',
                // }, 1000);
                $('#view').velocity({
                    width: CWZ + 'px',
                    height: CHZ + 'px',
                    bottom: -HS + 'px',
                    right: -WS + 'px',
                },  {
                    /* Velocity 动画配置项的默认值 */
                    duration: 800,         // 动画执行时间
                    mobileHA: true         // 移动端硬件加速（默认开启）
                });
                // view.style.willchange='transform';
                // view.style.width = CW * zoom + 'px';
                // view.style.height = CH * zoom + 'px';
                // view.style.bottom = -HS + 'px';
                // view.style.right = -WS + 'px';
            // }, 50)
        },
        //重置
        resetWidget() {
            // clearTimeout(this.timer);
            this.num = 0;
            this.textBp = 'static/UI/textBtn1.png';
            this.textBpF = false;
            this.textPic = '';
            // this.timer = setTimeout(() => {
                $('#view').velocity("stop").css({
                    bottom: '0px',
                    right: '0px',
                    width: this.W + 'px',
                    height: this.H + 'px'
                });
                // this.$refs.view.style.width = this.W + 'px';
                // this.$refs.view.style.height = this.H + 'px';
                // this.$refs.view.style.bottom = 0;
                // this.$refs.view.style.right = 0;
            // }, 50)
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
/*内容区*/

.container {
    width: 100%;
    float: left;
    height: 100%;
    overflow: hidden;
    position: relative;
}

.container h3 {
    font-size: 24px;
    color: #000;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
    position: relative;
    z-index: 888;
}

.aside_reset {
    margin: 16px 24px 10px;
    float: right;
    position: relative;
    z-index: 999;
}

#view {
    position: absolute;
    bottom: 0;
    right: 0;
}

/*视图区*/

.ViewSpace {
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
    position: absolute;
    top: 0;
    left: 0;
}

.ViewSpace div {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
}

.ViewSpace div>img {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
}
img.btn {
    position: absolute;
    z-index: 999;
    cursor: pointer;
    width: 100%;
    height: auto;
}
#textB {
    position: absolute;
    top: 70px;
    right: 20px;
    z-index: 999;
    cursor: pointer;
}

#textM {
    position: absolute;
    top: 58px;
    right: 75px;
    z-index: 999;
}

#textM>img {
    width: 346px;
    height: 276px;
}
.op{
    opacity: 0;
}
.vi{
    visibility: hidden;
}
/*#view {
    transition: all 1s ease-in;
    transform: translateZ(0);
}*/
</style>