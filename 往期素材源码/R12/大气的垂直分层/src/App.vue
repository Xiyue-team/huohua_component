<template>
    <div id="app" class="noselect">
        <!--头部-->
        <h3 v-html="title" class="app_title"></h3>
        <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
        <div id="loading" v-show="!loadingF">
            <div style="">loading...</div>
        </div>
        <div class="container" :style="'height:'+H+'px'">
            <!--视图区-->
            <div id="ViewMain" :style="'width:'+W+'px'">
                <div class="View" :style="'width:'+VW+'px;height:'+VH+'px;'">
                    <div class="ViewSpace" :style="'transform: scale('+zoomF+');top:'+(VH-416*zoomF)/4+'px;left:'+(VW-794*zoomF)/2+'px;background-image:url(static/UI/rule.png),url(static/UI/bg.png);'">
                        <div id="line" class="line" :class="{op:!switch_checked}" :style="'height:'+lineH+'px;background-image:url(static/UI/line.png);'">
                            <img src="static/UI/T.png">
                        </div>
                        <img class="O3img" :class="{op:!(value>80)}" src="static/UI/O3.png">
                        <p class="O3" :class="{op:!(value>80)}">臭氧层</p>
                        <p class="DZ" :class="{op:!(value>170)}">带电离子</p>
                        <div id="rain" :class="{op:!(value>=0)}">
                            <img src="static/UI/rain.gif">
                        </div>
                        <div id="fly" :class="{op:!(value>50)}">
                            <img src="static/UI/fly.gif">
                        </div>
                        <div id="liuxin" :class="{op:!(value>80)}">
                            <img src="static/UI/liuxin.gif">
                        </div>
                        <div id="jiguang" :class="{op:!(value>110)}">
                            <img v-for="i in 60" :src="'static/UI/jiguang/'+i+'.png'" :class="{op:NUM.src4Num!=i}">
                        </div>
                        <div id="skyfly" :class="{op:!(value>140)}">
                            <img src="static/UI/skyfly.gif">
                        </div>
                        <div id="rocket" :class="{op:!(value>170)}">
                            <img v-for="i in 15" :src="'static/UI/rocket/'+i+'.png'" :class="{op:NUM.src6Num!=i}">
                        </div>
                    </div>
                </div>
            </div>
            <!--控件区-->
            <div class="btn_space" id="btn_space" :style="'transform: scale('+zoomE+');padding-right:'+pr+'px;transform-origin:right;'">
                <ui-slider direction="vertical" :boxWidth="128" :boxHeight="426" :min="0" :max="200" :title="false" :zoom="zoomE" :speed="0" :formatter="filterLabel" v-model="value" :style="'float:right;'"></ui-slider>
                <ui-btn type="switch" v-model="switch_checked" :style="'width:150px;margin-top:10px;position:absolute;right:'+pr+'px;bottom:25px;'">温度
                </ui-btn>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //按钮
export default {
    name: 'app',
    components: {
        uiBtn,
        uiSlider
    },
    data() {
        return {
            title: '大气的垂直分层',
            H: window.innerHeight - 72,
            W: 0,
            VW: 0,
            VH: 0,
            zoomF: 1,
            zoomE: window.innerHeight - 72 < 525 ? (window.innerHeight - 72) / 525 : 1,
            pr: 24,
            lineH: 0,
            value: 0,
            switch_checked: false,
            SET: null,
            SET2: null,
            loadingF: false,
            moveF: false,
            NUM: {
                src4Num: 1,
                src6Num: 1
            }
        }
    },
    created() {
        document.title = this.title;
    },
    mounted() {
        this.getViewSize();
        var load_img = [];
        load_img.push('static/UI/rain.gif');
        load_img.push('static/UI/fly.gif');
        load_img.push('static/UI/liuxin.gif');
        load_img.push('static/UI/skyfly.gif');
        load_img.push('static/UI/T.png');
        load_img.push('static/UI/line.png');
        for (let k = 1; k <= 60; k++) {
            load_img.push('static/UI/jiguang/' + k + '.png');
        }
        for (let k = 1; k <= 15; k++) {
            load_img.push('static/UI/rocket/' + k + '.png');
        }
        //资源图片加载
        var thiz = this;
        $.imgpreload(load_img, {
            all: function() {
                thiz.loadingF = true;
                var NUM = thiz.NUM;
                var animateStart = () => {
                    thiz.SET = setTimeout(() => {
                        clearTimeout(thiz.SET);
                        thiz.SET = null;
                        animateStart();
                        if (thiz.value > 110) {
                            NUM.src4Num >= 60 ? NUM.src4Num = 1 : NUM.src4Num++;
                        }
                        if (thiz.value > 170) {
                            NUM.src6Num >= 15 ? NUM.src6Num = 1 : NUM.src6Num++;
                        }
                    }, 80);
                }
                animateStart();
            }
        });
        window.addEventListener('resize', () => {
            this.getViewSize();
        })
    },
    computed: {},
    watch: {
        value(v) {
            if (v <= 160) {
                this.lineH = 1.5625 * v;
            } else {
                this.lineH = 250;
            }
        }
    },
    methods: {
        filterLabel() {
            var v = this.value;
            if (v < 50) {
                return '对流层';
            } else if (v >= 50 && v < 80) {
                return '平流层';
            } else if (v >= 80 && v < 110) {
                return '中间层';
            } else if (v >= 110 && v < 140) {
                return '暖层';
            } else if (v >= 140 && v < 170) {
                return '电离层';
            } else if (v >= 170 && v <= 200) {
                return '散逸层';
            }
        },
        //计算区块大小
        getViewSize() {
            var H = window.innerHeight - 72;
            this.H = H;
            if (H < 525) {
                this.zoomE = H / 525;
                this.pr = 24 / this.zoomE;
            } else {
                this.zoomE = 1;
                this.pr = 24;
            }
            var W = window.innerWidth - 190 * this.zoomE;
            this.W = W;
            if (W / H > 794 / 416) {
                this.VW = parseInt(794 * H / 416);
                this.VH = H;
                this.zoomF = H / 416 * 0.95;
            } else {
                this.VW = W;
                this.VH = parseInt(416 * W / 794);
                this.zoomF = W / 794 * 0.95;
            }
        },
        //重置
        resetWidget() {
            this.value = 0;
            this.switch_checked = false;
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

h3 {
    position: absolute;
    z-index: 2;
    font-size: 24px;
    color: #000;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
}

.aside_reset {
    position: fixed;
    right: 0;
    top: 0;
    margin: 20px 24px;
    z-index: 2;
}

.container {
    width: 100%;
    position: absolute;
    top: 72px;
}

.btn_space {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    right: 0;
    padding: 15px 24px 25px 16px;
    width: 190px;
    height: 525px;
}

#loading {
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    top: -3px;
    left: 0;
    z-index: 1;
}

#loading>div {
    width: 100%;
    height: 20px;
    position: absolute;
    top: 50%;
    left: 0;
    text-align: center;
    transform: translateY(-50%);
}

#ViewMain {
    height: 100%;
    position: absolute;
    left: 0;
}

.View {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}

.ViewSpace {
    width: 794px;
    height: 416px;
    padding: 10px;
    transform-origin: left top;
    position: relative;
    background: #FFFFFF;
    border: 0 solid rgba(0, 0, 0, 0.12);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    background-position: 12px 13px, center bottom;
    background-repeat: no-repeat;
    background-size: 85%, cover;
    background-origin: content-box;
}

.ViewSpace>.line {
    width: 135px;
    /*height: 250x;*/
    position: absolute;
    left: 95px;
    bottom: 45px;
    z-index: 10;
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: cover;
    background-origin: content-box;
}

.ViewSpace>.line>img {
    width: 275px;
    height: auto;
    position: absolute;
    bottom: -26px;
}

.ViewSpace>div {
    position: absolute;
    background-color: transparent;
}

.ViewSpace>div>img {
    width: 100%;
    height: 100%;
    position: absolute;
}

.ViewSpace>div>img.op {
    visibility: hidden;
}

.op {
    visibility: hidden;
}

.O3img {
    height: 95px;
    width: auto;
    position: absolute;
    top: 185px;
    left: 30px;
    z-index: 3;
}

.O3 {
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #FFFFFF;
    text-shadow: 0 2px 4px #FF91B6;
    position: absolute;
    left: 110px;
    top: 215px;
}

.DZ {
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #FFFFFF;
    text-shadow: 0 2px 4px #F5A623;
    position: absolute;
    left: 145px;
    top: 55px;
}

#rain {
    width: 570px;
    height: 150px;
    top: 284px;
    left: 98px;
}

#fly {
    width: 340px;
    height: 80px;
    top: 264px;
    left: 188px;
}

#liuxin {
    width: 281px;
    height: 125px;
    top: 145px;
    left: 247px;
}

#jiguang {
    width: 128px;
    height: 148px;
    top: 45px;
    left: 427px;
}

#skyfly {
    width: 448px;
    height: 168px;
    top: 65px;
    left: 183px;
}

#rocket {
    width: 344px;
    height: 102px;
    top: 16px;
    left: 95px;
}
</style>