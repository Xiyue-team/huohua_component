<template>
    <div id="app" class="noselect bg"> <img id="bgg" :src="imgB">
        <!--头部-->
        <h3 v-html="title" class="app_title"></h3>
        <ui-btn type="reset1" class="aside_reset" @click.native='reset' style="z-index:300;"></ui-btn>
        <div class="container" :style="'height:'+H+'px'">
           <!--  <div class="box" :style="'width:'+VW+'px;height:'+VH+'px'"> -->
                <div class="viewSpace" >
                    <div class="rightWrap" :style="'transform: scale('+zooms+')'">
                        <div class="temp" >
                            <div class="tempT"> <img id="wl" :src="wdl">
                                <div class="Tline"><img :src="wdj"></div>
                            </div>
                            <div class="tempH"> <img id="ws" :src="wds">
                                <div class="Hline"><img :src="wdj"></div>
                            </div>
                            <div style="position:absolute;bottom:0px">
                                <ui-slider id='slider' v-model='value' :tooltip="false" :min="0" :max="180" :clickable="false" :label="['6','12','18']" :boxWidth="200" :zoom="zooms" :noBlueProcess="true"> </ui-slider>
                            </div>
                        </div>
                    </div>
                    <div class="leftWrap" id="renderCanvas" :style="'transform: scale('+zooms+')'"> </div>
                </div>
            </div>
        <!-- </div> -->
    </div>
</template>
<script>
import common from '@/common/common'; //公共函数
import uiSlider from '@/components/UI/uiSlider'; //滑块
import uiBtn from '@/components/UI/uiBtn'; //滑块
export default {
    name: 'app',
    components: { uiSlider, uiBtn },
    data() {
        return {
            title: '地面和大气增温的时间差',
            BtnSpaceStyle: 'flex',
            TO: null,
            H: window.innerHeight - 90,
            VW: 0,
            VH: 0,
            zooms: 1,
            zoomx:1,
            zoomy:1,
            value: 0,
            sliderPoint: [0, 90, 180, ],
            imgB: null,
            wdj: null,
            wdl: null,
            wds: null,
        }
    },
    created() {
        this.getViewSize();
        // this.imgL("static/UI/bg.png", (src) => {
            this.imgB = "static/UI/bg.png";
        // });
        // this.imgL("static/UI/earth.png", (src) => {});
        // this.imgL("static/UI/jbfr1.png", (src) => {});
        // this.imgL("static/UI/sun.png", (src) => {});
        // this.imgL("static/UI/1-1.png", (src) => {});
        // this.imgL("static/UI/wl.png", (src) => {
            this.wdl = "static/UI/wl.png"
        // });
        // this.imgL("static/UI/whh.png", (src) => {
            this.wdj = "static/UI/whh.png"
        // });
        // this.imgL("static/UI/wh.png", (src) => {
            this.wds = "static/UI/wh.png"
        // });
        document.title = this.title;
    },
    mounted() {
        window.addEventListener('resize', () => {
            this.getViewSize();
        })
        document.onselectstart = function() {
            return false;
        };
        $('#slider').append('<div id="sliderP"><span id="s1"></span><span id="s2"></span><span id="s3"></span></div>');
        this.setSliderPonint();
        this.TO = this.init();
    },
    watch: {
        value(val, oldVal) {
            this.TO.ellipse((val - 180) * (-1), (oldVal - 180) * (-1));
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
            this.TO.reset();
        },
        setSliderPonint() {
            let vm = this;
            let sliderW = $('#slider').width();
            $('#sliderP span').each(function() {
                $(this).index();
                $(this).css("left", sliderW * vm.sliderPoint[$(this).index()] / 180 - 7)
            })
            $('.ui-label li').each(function() {
                $(this).index();
                $(this).css("left", sliderW * vm.sliderPoint[$(this).index()] / 180 + 22)
            })
        },
        //初始化
        init() {
            var scene, camera, renderer, mainWidth, mainHeight;
            var aR = 800;
            var bR = 800;
            var sun = null;
            var sunLine = null;
            var TL = null;
            var Ts = null;
            var hot = null;
            var earth = null;
            var group = null;
            var group1 = null;
            var offsetLeft = parseInt($('#renderCanvas').offset().left);
            var offsetTop = parseInt($('#renderCanvas').offset().top);
            //创建场景
            mainWidth = $('#renderCanvas').width();
            mainHeight = $('#renderCanvas').height();
            scene = new THREE.Scene();
            scene.position.y = -350;
            camera = new THREE.PerspectiveCamera(60, mainWidth / mainHeight, 1, 10000);
            camera.position.set(0, 0, 930);
            camera.zoom = 1;
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            // scene.add(camera);
            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setClearColor(0xFFFFFF, 0.0);
            renderer.setPixelRatio(window.devicePixelRatio * this.zooms);
            renderer.autoClear = false;
            renderer.setSize(mainWidth, mainHeight);
            $("#renderCanvas").append(renderer.domElement);
            var pointPos = {
                o: { x: 0, y: 263, z: 200 },
                o1: { x: -737, y: 319, z: 0 },
                o2: { x: -390, y: 0, z: -5 },
                o3: { x: 0, y: 0, z: 220 }
            };
            var basic = () => {
                if (sunLine != null) {
                    scene.remove(earth, sun, group, group1, hot);
                    group = null;
                    group1 = null;
                }
                group = new THREE.Group();
                group1 = new THREE.Group();
                earth = common.createImg([pointPos.o], 910, 474, 'static/UI/earth@2x.png', false);
                hot = common.createImg([pointPos.o3], 500, 500, 'static/UI/jbfr1.png', false);
                sun = common.createImg([pointPos.o1], 190, 190, 'static/UI/sun.png');
                sunLine = common.createImg([pointPos.o2], 765, 60, 'static/UI/1-1.png', true);
                var aaaa = common.drawCircleLine(800, { style: 2,line_width: 2,color:"#fff" });
               scene.add(aaaa);
                aaaa.position.y= 0
                group.add(sunLine);
                group.position.y=319
                scene.add(group);
                scene.add(sun);
                scene.add(hot);
                hot.material.opacity = 0.5;
                hot.scale.set(0.5, 0.3, 1);
                 // hot.scale.set(1, 1, 1);
                hot.position.y = 339;
                sun.scale.set(1.1, 1.1, 1.1);
                aaaa.rotation.z=-0.024*Math.PI;
                scene.add(earth);
                $(".Tline").css("height", "20px");
                $(".Hline").css("height", "60px");
                
            }
            basic();
            var sunshineMobil = (x, y) => {
                sun.position.x = x;
                sun.position.y = y;
                
            }
            var sunLineMobil = (x, y, ang, oldAng) => {
                if (ang >= 90) {
                    group.scale.set((ang - 90) * 0.0028889 + 0.65, 1, 1);
                    var TT = (180 - ang) * 1.333 + 20;
                    hot.material.opacity = (180 - ang) * 0.0055 + 0.5;
                    var bx = (180 - ang) * 0.00556 + 0.5;
                    var by = ((180 - ang) * 0.00778 + 0.3);
                    var ty =  (180 - ang)*0.22222
                    if (bx >= 1 && by >= 1) {
                        hot.scale.set(1, 1, 1);
                    } else {
                        hot.scale.set(bx, by, 1);
                    }
                    hot.position.y = -ty+339;
                    
                   
                } else if (ang < 90) {
                     group.scale.set((90-ang) * 0.0028889 + 0.65, 1, 1);
                    var TT = (ang) * 1.333 + 20;
                    hot.material.opacity = (ang) * 0.0055 + 0.5;
                    var bx = (ang) * 0.00556 + 0.5;
                    var by = ((ang) * 0.00778 + 0.3);
                    var ty = (ang) * 0.22222;
                    if (bx <= 0.5 && by <= 0.3) {
                        hot.scale.set(0.5, 0.3, 1);
                    } else {
                        hot.scale.set(bx, by, 1);
                    }
                     hot.position.y = -ty+339;
                }
                if (ang >= 60) {
                    var TH = (180 - ang) * 0.667 + 60;
                } else if (ang < 60) {
                    var TH = (ang + 60) * 0.667 + 60;
                }
                $(".Tline").css("height", TT + "px");
                $(".Hline").css("height", TH + "px");
                group.rotation.z = Math.atan2(y-319, x) - Math.PI;
            }
            var ellipse = (ang2, oldAng) => {
                // var v = [];
                
                var ang = ang2*0.75+22.5;
                var ang1 = Math.PI / 180 * (ang);
                var x = Math.floor(aR * Math.cos(ang1));
                var y = Math.floor(bR * Math.sin(ang1));
                sunshineMobil(x, y);
                sunLineMobil(x, y, ang2, oldAng);
            }
            //重置
            var resetWidget = () => {
                this.value = 0;
                // basic();
            };
            //渲染场景
            var renderAll = () => {
                renderer.clear();
                renderer.render(scene, camera);
                requestAnimationFrame(renderAll);
            }
            renderAll();
            //回调函数
            var TO = function() {
                return {
                    reset: resetWidget,
                    ellipse: ellipse,
                }
            }
            return TO();
        },
        //计算区块大小
        getViewSize() {
            var W = window.innerWidth;
            var H = window.innerHeight - 90;
            this.H = H+90;
            this.zoomx = window.innerWidth/1024;
            this.zoomy = window.innerHeight/768;
            if (W / H > 1024 / 576) {
                this.VW = 1024 * H / 576;
                this.VH = H;
                this.zooms = (H / 576).toFixed(2);
            } else {
                this.VW = W;
                this.VH = 576 * W / 1024;
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

#bgg {
    width: 100%;
    height: 100%;
}

.app_title {
    font-size: 24px;
    color: #000;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
    position:absolute;
    top:0;
    /*width: 100%;*/
}

#app .aside_reset {
    position: fixed;
    right: 24px;
    top: 24px;
    z-index: 150;
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
    height: 100%;
    top: 0px;
    position: absolute;
}


/*内容区*/

.leftWrap {
    display: inline-block;
    position: absolute;
    width:850px;
    height: 515px;
    left: 2.5%;
    bottom: 0px;
    transform-origin: left bottom;
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
    width: 200px;
    height: 600px;
    float: right;
    right: 10px;
    bottom:10px;
    z-index:100;
    position: absolute;
    transform-origin: right bottom;
}

.temp {
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 10px;
    right: 5px;
}

.tempT {
    position: absolute;
    width: 68px;
    height: 279px;
    bottom: 200px;
    right: 12px;
}

.tempH {
    position: absolute;
    width: 68px;
    height: 279px;
    bottom: 200px;
    left: 12px;
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

#ws {
    width: 100%;
    height: 100%;
}

#wl {
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

#slider>div#sliderP {
    position: absolute;
    background: transparent;
    top: 76px;
    width: calc(100% - 44px);
    height: 14px;
    z-index: 1
}

#slider>div#sliderP>span {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: #f0f0f0;
    border-radius: 50%;
    position: absolute;
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
    width: 100%;
    height: 100%;
    transform-origin: top left;
    position: relative;
}


/*.ctrl {
  position: absolute;
  bottom: 0px;
  right: 150px;
}*/


/*.ctrl {
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 150px;
    height: 150px;
    z-index: 200
}*/
</style>