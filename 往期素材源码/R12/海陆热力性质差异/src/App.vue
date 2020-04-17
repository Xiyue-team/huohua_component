<template>
    <div id="app" class="noselect bg"> 
        <img id="bgg" src="static/UI/121.png" :class='{op:!day}' >
    <!--  <img id="bgg1" src="static/UI/blb.png">  -->
        <!--头部-->
        <h3 v-html="title" class="app_title"></h3>
         <ui-btn type="reset1" class="aside_reset" @click.native='reset' style="z-index:1050;"></ui-btn>
        <div class="container">
            <!--<div class="viewSpace" :style="'transform: scale('+zooms+')'">-->
            <!--</div>-->
            <div class="sun" id="sun"><img :src="sun"></div>
            <div class="moon" id="moon"><img :src="moon"></div>
            <div class="hot" id="hot"><img :src="imgh"></div>
            <div class="hot1" id = "hot1"><img id="hh" :src="imghh"> <img id="hh1" :src="imghh1"></div>
            <div class="wL" id="wL"><img :src="imgwl"></div>
            <div class="wJ" id="wJ"><img id="fs" :src="imgwJ"></div>
            <div class="wL2" id="wL2"><img :src="imgwL2"></div>
            <div class="wJ2" id="wJ2"><img id="fs1" :src="imgwJ2"></div>
            <div class="wLn" id="wLn"><img :src="imgwLn"></div>
            <div class="wLn2" id="wLn2"><img :src="imgwLn2"></div>
            <div class="hotn" id="hotn"><img :src="imghotn"></div>
            <div class="hotn1" id="hotn1" ><img id="hh" :src="imgbhhn"> <img id="hh1" :src="imgbhh1n"></div>
        </div>
        <div class="ww" :style="'transform: scale('+zooms+')'">
            <div class="tmp">
                <div class="tmpL" > <img id="wl" :src="wdl">
                    <div class="Tline" id="Tline"> <img :src="wdj"> </div>
                </div>
                <div class="tmpH" > <img id="ws" :src="wds">
                    <div class="Hline" id="Hline"> <img :src="wdj"> </div>
                </div>
            </div>
        </div>
        <ui-annular :value="value" @on-result-change="onResultChange"></ui-annular>
    </div>
</template>
<script>
import common from '@/common/common'; //公共函数
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //滑块
import uiAnnular from '@/components/UI/uiAnnular';
var mmark = 0;
var mmark1 = 1;
export default {
    name: 'app',
    components: { uiHead, uiBtn, uiSlider, uiAnnular },
    data() {
        return {
            title: '海陆热力性质差异',
            BtnSpaceStyle: 'flex',
            TO: null,
            H: window.innerHeight - 90,
            VW: 0,
            VH: 0,
            zooms: 1,
            value: 0,
            sliderPoint: [0, 90, 180],
            mark: 0,
            imgB: "static/UI/wbb.png",
            imgB1: 'static/UI/blb.png',
            imgB2: null,
            imgh: null,
            imghh: null,
            imghh1: null,
            imgwL: null,
            imgwJ: null,
            imgwL2: null,
            imgwl: null,
            imgwJ2: null,
            imgwLn: null,
            imgwLn2: null,
            imghotn: null,
            imgbhhn: null,
            imgbhh1n: null,
            sun: 'static/UI/sun.png',
            moon: null,
            wdl: 'static/UI/wdl.png',
            wds: 'static/UI/wds.png',
            wdj: 'static/UI/wd.png',
            time1: null,
            time2: null,
            mark11: 0,
            day:true
        }
    },
    created() {
        this.getViewSize();
        document.title = this.title;
        
      
            this.wdl = 'static/UI/wdl.png';
    
            this.wds = 'static/UI/wds.png';
      
            this.wdj = 'static/UI/wd.png';
      
            this.sun = 'static/UI/sun.png';
      
      
            this.imgh = 'static/UI/wl.gif';
     
            this.imghh = 'static/UI/ws.gif';
       
            this.imghh1 = 'static/UI/yuan2-baitian.gif';
     
            this.imgwl = 'static/UI/yb.png';
      
            this.imgwJ = 'static/UI/ys.png';
       
            this.imgwL2 = 'static/UI/yb.png';
      
            this.imgwJ2 = 'static/UI/ys.png';
      
            this.imgwLn = 'static/UI/ob.png';
       
            this.imgwLn2 = 'static/UI/ob.png';
     
            this.imghotn = 'static/UI/bl.gif';
       
            this.imgbhhn = 'static/UI/bs.gif';
        
            this.imgbhh1n = 'static/UI/yuan2-wanshang.gif';
       
            this.moon = 'static/UI/moon.png';
       
        
    },
    mounted() {
        window.addEventListener('resize', () => {
            this.getViewSize();
        })
        document.onselectstart = function() {
            return false;
        };
        this.TO = this.init();
    },
    watch: {
        value(val) {
            var hy = 350 * this.zooms;
            
            var zoomyy = window.innerHeight/768
            if (this.mark == 0) {
                if (val <= 0) {
                     let ang = -val;
                    if(mmark==0){
                      mmark=1;
                   mmark1=1;
                    this.day=true;
                   
                    var hy = 300 * this.zooms
                    $("#wLn").css("display", "none");
                    $("#wLn2").css("display", "none");
                    $("#hotn").css("display", "none");
                    $("#hotn1").css("display", "none");
                    $("#wLn").css("height", "0px");
                    $("#wLn2").css("height", "0px");
                    $("#wLn").css("bottom", "25%");
                    $("#wLn2").css("bottom", "25%");
                    $("#sun").css("display", "inline");
                    $("#moon").css("display", "none");
                    $("#moon").css("top", hy + "px");
                    $("#moon").css("left", "0px");
                    $("#wL2").css("display", "inline");
                    $("#wL").css("display", "inline");
                    $("#wL").css("height", "295px");
                    $("#wL2").css("height", "295px");
                    var tL = 37 * zoomyy
                    var tll1 = 20.5 * this.zooms
                    var tll2 = 48 * this.zooms
                    $("#wL").css("top", tL + "%");
                    $("#wL2").css("top", tL + "%");
                    $("#wL").css("left", tll1 + "%");
                    $("#wJ").css("top", tL + "%");
                    $("#wJ2").css("top", tL + "%");
                    $("#wJ2").css("left", tll1 + "%");
                     $("#fs").css("display", "inline");
                            $("#fs1").css("display", "inline");
                    var wjT = 20 * this.zooms;
                    if (this.mark11 == 0) {
                       
                        this.time2 = setTimeout(() => {
                           if( mmark == 1){
                            $("#fs").css("height", "75px");
                          
                            $("#fs1").css("height", "75px");
                           }
                        }, 2500)
                        this.mark11 = 1;
                    }
                    $("#hot").css("display", "inline");
                    $("#hot1").css("display", "inline");
                }
                    if (ang >= 0 && ang <= 2 * Math.PI / 3) {
                        let TT = ang * 240 / Math.PI + 20;
                        if (ang >= 0 && ang <= Math.PI / 2) {
                            let TH = ang * 80 / Math.PI + 60;
                            this.TO.tmpMove(TT, TH);
                        }
                        if (ang > Math.PI / 2 && ang < 2 * Math.PI / 3) {
                            let TH = (ang - Math.PI / 2) * 144 / Math.PI + 100;
                            this.TO.tmpMove(TT, TH);
                        }
                    }
                    if (ang > 2 * Math.PI / 3 && ang <= Math.PI) {
                        let TH = 124 - (ang - 2 * Math.PI / 3) * 72 / Math.PI;
                        let TT = 180 - ((ang - 2 * Math.PI / 3) * 168 / Math.PI);
                        this.TO.tmpMove(TT, TH);
                    }
                    this.TO.ellipse(ang, 1);
                }
                if (val > 0) {
                    if( mmark1==1){
                     mmark = 0;
                     mmark1==0;

                    this.day=false;
                    $("#fs").css("display", "none");
                    $("#bgg1").css("top", "0");
                    $("#fs1").css("display", "none");
                    $("#fs").css("height", "0px");
                    $("#fs1").css("height", "0px");
                    // clearTimeout(this.time1);
                    clearTimeout(this.time2);
                    this.mark11 = 0;
                    var hy = 300 * this.zooms
                    var wjT2 = 380 * this.zooms;
                    // $("#bgg1").show();
                    //  $("#bgg").hide();
                    $("#moon").css("display", "inline");
                    $("#hot").css("display", "none");
                    $("#hot").css("display", "none");
                    $("#hot1").css("display", "none");
                    $("#sun").css("display", "none");
                    $("#sun").css("top", hy + "px");
                    $("#sun").css("left", "0px");
                    $("#wL").css("height", "0px");
                    $("#wL2").css("height", "0px");
                    $("#wL2").css("display", "none");
                    $("#wL").css("display", "none");
                    $("#wL").css("top", "0");
                    $("#wL2").css("top", "0");
                    $("#wLn2").css("display", "inline");
                    $("#wLn").css("display", "inline");
                    $("#wLn").css("height", "295px");
                    $("#wLn2").css("height", "295px");
                    $("#hotn").css("display", "inline");
                    $("#hotn1").css("display", "inline");
                    
                    }
                  
                    this.TO.ellipse(val, 2);
                    let ang = val;
                    let TH = 100 - (Math.PI - ang) * 40 / Math.PI;
                    let TT = 124 - (Math.PI - ang) * 104 / Math.PI;
                    this.TO.tmpMove(TT, TH);
                    this.TO.ellipse(val);
                    
                }
            } else {
                $(".Tline").css("height", 20 + "px");
                $(".Hline").css("height", 60 + "px");
                this.mark = 0
            }
        }
    },
    computed: {},
    methods: {
        //图片预加载
        imgL(src, callback) {
            var img = new Image();
            img.src = src;
            img.onload = function() {
                callback && callback(img.src);
            }
        },
        //重置函数
        reset() {
        
            clearTimeout(this.time1);
            clearTimeout(this.time2);
            mmark1 = 1;
            this.mark = 1
            this.value = 0;
            this.mark11 = 0;
             mmark=0;
           this.day=true;
            $("#sun").css("display", "inline");
            $("#moon").css("display", "none");
            var hy = 300 * this.zooms
            $("#moon").css("top", hy + "px");
            $("#moon").css("left", "0px");
            $("#sun").css("top", hy + "px");
            $("#sun").css("left", "0px");
            $("#wL2").css("display", "none");
            $("#wL").css("display", "none");
            $("#hot").css("display", "none");
            $("#hot1").css("display", "none");
            $("#wLn").css("display", "none");
            $("#wLn2").css("display", "none");
            $("#hotn").css("display", "none");
            $("#hotn1").css("display", "none");
            $("#wL").css("height", "0px");
            $("#wL2").css("height", "0px");
            $("#wL").css("top", "0");
            $("#wL2").css("top", "0");
            $("#fs").css("display", "none");
            $("#fs1").css("display", "none");
            $("#fs").css("height", "0px");
            $("#fs1").css("height", "0px");
            $("#wLn").css("height", "0px");
            $("#wLn2").css("height", "0px");
            $("#wLn").css("bottom", "25%");
            $("#wLn2").css("bottom", "25%");
           
        },
        //初始化
        init() {
            //回调函数
            var tmpMove = (TT, TH) => {
                $("#Tline").css("height", TT + "px");
                $("#Hline").css("height", TH + "px");
            }
            

            var hy = 300 * this.zooms
            var WJT = 300 * this.zooms
            var tll1 = 20.5 * this.zooms
            $("#moon").css("top", hy + "px");
            $("#sun").css("top", hy + "px");
            $("#hot").css("left", tll1 + "%");
            var ellipse = (ang, a) => {
                var longz = window.innerWidth/2
                var zoomm = window.innerWidth/1024
                if (a == 1) {
                   
                        var longz1=longz-(100*zoomm)
                       
                        var x = Math.floor(longz1 * Math.cos(Math.PI - ang)) + longz1;
                    var y = 300 - Math.floor(300 * Math.sin(Math.PI - ang));
                    y = y * this.zooms;
                    $("#sun").css("top", y + "px");
                    $("#sun").css("left", x + "px");
                }
                if (a == 2) {
                 
                       var longz1=longz-(100*zoomm)
                        var x = Math.floor(longz1 * Math.cos(ang)) + longz1;
                    var y = 300 - Math.floor(300 * Math.sin(ang));
                    y = y * this.zooms;
                    $("#moon").css("top", y + "px");
                    $("#moon").css("left", x + "px");
                }
            }
            var TO = function() {
                return {
                    tmpMove,
                    ellipse
                }
            }
            return TO();
        },
        onResultChange(val) {
            this.value = val;
        },
        //计算区块大小
        getViewSize() {
            var W = window.innerWidth;
            var H = window.innerHeight - 90;
            this.H = H;
            if (W / H > 1024 / 650) {
                this.VW = 1024 * H / 650;
                this.VH = H;
                this.zooms = (H / 650).toFixed(2);
            } else {
                this.VW = W;
                this.VH = 650 * W / 1024;
                this.zooms = (W / 1024).toFixed(2);
            }
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
    touch-action: none;
    -ms-touch-action: none;
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

.hot {
    display: none;
    width: 300px;
    height: 40px;
    top: 76%;
    left: 20.5%;
    text-align: center;
    position: absolute;
}

.hot img {
    width: 150px;
    height: 40px;
    margin: 0 auto;
}

.hot1 {
    display: none;
    width: 300px;
    height: 80px;
    top: 76%;
    left: 48%;
    text-align: center;
    position: absolute;
}

.hot1 #hh {
    width: 150px;
    height: 40px;
    margin: 0 auto;
}

.hot1 #hh1 {
    width: 300px;
    height: 80px;
}

.wL {
    width: 300px;
    height: 0px;
    text-align: center;
    top: 0;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    left: 20.5%;
    position: absolute;
    transition: height 2.5s ease, top 2.5s ease;
    -moz-transition: height 2.5s ease, top 2.5s ease;
    /* Firefox 4 */
    -webkit-transition: height 2.5s ease, top 2.5s ease;
    /* Safari 和 Chrome */
    -o-transition: height 2.5s ease, top 2.5s ease;
    display: none
    /* Opera */
}

.wL img {
    width: 47px;
    height: 295px;
}

.wL2 {
    width: 300px;
    height: 0px;
    top: 0;
    text-align: center;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    left: 48%;
    position: absolute;
    display: none;
     position: absolute;
    transition: height 2.5s ease, top 2.5s ease;
    -moz-transition: height 2.5s ease, top 2.5s ease;
    /* Firefox 4 */
    -webkit-transition: height 2.5s ease, top 2.5s ease;
    /* Safari 和 Chrome */
    -o-transition: height 2.5s ease, top 2.5s ease;
    /* Opera */
}

.wL2 img {
    width: 47px;
    height: 295px;
}

.wLn {
    display: none;
    width: 150px;
    text-align: center;
    height: 0px;
    bottom: 25%;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    left: 20.5%;
    position: absolute;
    transition: height 4s ease, bottom 4s ease;
    -moz-transition: height 4s ease, bottom 4s ease;
    /* Firefox 4 */
    -webkit-transition: height 4s ease, bottom 4s ease;
    /* Safari 和 Chrome */
    -o-transition: height 4s ease, bottom 4s ease;
    /* Opera */
}

.wLn img {
    width: 65px;
    height: 100%;
}

.wLn2 {
    display: none;
    width: 300px;
    text-align: center;
    height: 0px;
    bottom: 25%;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    left: 48%;
    position: absolute;
    transition: height 4s ease, bottom 4s ease;
    -moz-transition: height 4s ease, bottom 4s ease;
    /* Firefox 4 */
    -webkit-transition: height 4s ease, bottom 4s ease;
    /* Safari 和 Chrome */
    -o-transition: height 4s ease, bottom 4s ease;
    /* Opera */
}

.wLn2 img {
    width: 47px;
    height: 100%;
}

.hotn {
    display: none;
    width: 150px;
    height: 40px;
    top: 76%;
    left: 20.5%;
    position: absolute;
}

.hotn img {
    width: 150px;
    height: 40px;
}

.hotn1 {
    display: none;
    width: 300px;
    height: 120px;
    top: 76%;
    left: 48%;
    text-align: center;
    position: absolute;
}

.hotn1 #hh {
    width: 150px;
    height: 40px;
    margin: 0 auto;
}

.hotn1 #hh1 {
    width: 300px;
    height: 80px;
}

.wJ {
    width: 300px;
    height: 295px;
    top: 35%;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    left: 48%;
   /* display: none;*/
    position: absolute;
    transition: top 2s ease, left 2s ease;
    -moz-transition: top 2s ease, left 2s ease;
    /* Firefox 4 */
    -webkit-transition: top 2s ease, left 2s ease;
    /* Safari 和 Chrome */
    -o-transition: top 2s ease, left 2s ease;
    /* Opera */
}

.wJ img {
    position: absolute;
    right: 90px;
    bottom: 20px;
    width: 57px;
    height: 0px;
    transform:rotateZ(33deg);
    transition: width 2s ease, height 2s ease,right 2s ease;
    -moz-transition: width 2s ease, height 2s ease,right 2s ease;
    /* Firefox 4 */
    -webkit-transition: width 2s ease, height 2s ease,right 2s ease;
    /* Safari 和 Chrome */
    -o-transition: width 2s ease, height 2s ease,right 2s ease;
    transform-origin: left bottom;
}

.wJ2 {
    width: 300px;
    height: 295px;
    top: 35%;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    left: 20.5%;
   /* display: none;*/
    position: absolute;
    transition: top 2s ease, left 2s ease;
    -moz-transition: top 2s ease, left 2s ease;
    /* Firefox 4 */
    -webkit-transition: top 2s ease, left 2s ease;
    /* Safari 和 Chrome */
    -o-transition: top 2s ease, left 2s ease;
    /* Opera */
}

.wJ2 img {
    position: absolute;
    right: 90px;
    bottom: 20px;
    width: 57px;
    height: 0px;
    transform:rotateZ(33deg);
    transition: width 2s ease, height 2s ease,right 2s ease;
    -moz-transition: width 2s ease, height 2s ease,right 2s ease;
    /* Firefox 4 */
    -webkit-transition: width 2s ease, height 2s ease,right 2s ease;
    /* Safari 和 Chrome */
    -o-transition: width 2s ease, height 2s ease,right 2s ease;
    transform-origin: left bottom;
    /* Opera */
}

.bg {}

#bgg {
    width: 100%;
    height: 200%;
    position:absolute;
   

   
   
}
#bgg1 {
    width: 100%;
    height: 100%;
     /*display: none;*/
     position:absolute;
     top:100%;
     
   
}

.sun {
    width: 200px;
    height: 200px;
    top: 43%;
    left: 0px;
    position: absolute;
}

.sun img {
    width: 100%;
    height: 100%;
}

.moon {
    width: 200px;
    height: 200px;
    top: 350px;
    left: -5px;
    position: absolute;
    display: none;
}

.moon img {
    width: 100%;
    height: 100%;
}

.app_title {
    font-size: 24px;
    color: #000;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
    z-index: 600;
    position: absolute;
    top: 20px;
    /*width: 100%;*/
}

.app_aside {
    float: left;
    width: 280px;
    height: 100%;
    z-index: 200
}

#app .aside_reset {
    position: absolute;
    right: 24px;
    top: 24px;
    z-index: 800;
}


/*ui*/

.UI-camera {
    width: 80px;
    height: 80px;
    cursor: pointer;
}

div.Ui-head {
    background-color: #fff;
    --webkit-box-shadow: none;
    box-shadow: none;
}

.container {
    width: 100%;
    float: left;
    height: 100%;
}


/*内容区*/

.leftWrap {
    display: inline-block;
    position: absolute;
    width: 700px;
    height: 500px;
    /*margin-right: 24px;*/
    margin-left: 15px;
    left: 0;
    bottom: 10px;
    float: left;
}

canvas {
    width: 100%;
    height: 100%;
}

.insp-wrapper {
    width: 100%;
    height: 100%;
}

.rightWrap {
    width: 280px;
    height: 280px;
    float: right;
    position: absolute;
    bottom: 0;
    right: 0;
}

.box {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}

.viewSpace {
    width: 1024px;
    height: 650px;
    transform-origin: top left;
    position: relative;
}

.tmp {
    position: absolute;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 300px;
    width: 170px;
}

.ww {
    text-align: center;
    position: absolute;
    right: 24px;
    top: 100px;
    height: 300px;
    width: 20vw;
    height: 300px;
    width: 20vw;
}

.tmpL {
    position: absolute;
    width: 68px;
    height: 279px;
    right: 12px;
}

#wl {
    width: 100%;
    height: 100%;
}

.tmpH {
    position: absolute;
    width: 68px;
    height: 279px;
    left: 12px;
}

#ws {
    width: 100%;
    height: 100%;
}

.Tline {
    position: absolute;
    right: 35px;
    bottom: 70px;
    width: 10px;
    height: 20px;
}

.Tline img {
    width: 100%;
    height: 100%;
}

.Hline {
    position: absolute;
    right: 35px;
    bottom: 70px;
    width: 10px;
    height: 60px;
}

.Hline img {
    width: 100%;
    height: 100%;
}
.op{
     bottom:0;
}
</style>