<template>
    <div id="app" class="noselect">
        <!--头部-->
        <ui-head :title="title">
            <ui-btn type="reset1" @click.native="reset"></ui-btn>
        </ui-head>
        <!--模型区域-->
        <div class="container" :style="'height:'+H+'px'">
            <div class="View" :style="'width:'+VW+'px;height:'+VH+'px'">
                <div class="ViewSpace" :style="'transform: scale('+zoom+')'">
                    <div class="leftWrap"><img :src="imgDemo" ondragstart="return false;"> </div>
                    <div class="rightWrap" id="renderCanvas">
                        <div class="showImg" @click='showCanvas' v-show='isShow'> <img :src="img2" ondragstart="return false;"> </div>
                    </div>
                </div>
            </div>
            <div class="bottomWrap">
                <ui-btn type="switch" :width="150" :height="130" :vertical="true" v-show='waterShow' v-model='waterCheck'>注水</ui-btn>
                <ui-btn type="switch" :width="150" :height="130" :vertical="true" v-model='ballCheck' v-show='ballShow'>铁球</ui-btn>
                <ui-btn type="switch" :width="150" :height="130" :vertical="true" v-model='lineHelpCheck' v-show='lineHelpShow'>辅助线</ui-btn>
            </div>
        </div>
    </div>
</template>
<script>
import common from '@/common/common'; //公共函数
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //滑块
const { sin, cos, PI, tan, pow, abs, sqrt } = Math;
const SCALE = 30; //放大系数
const coneR = 10 * SCALE; //圆锥的半径
const R = coneR / 2; // 球半径
const coneH = coneR * Math.sqrt(3); //圆锥的高
export default {
    name: 'app',
    components: { uiHead, uiBtn, uiSlider },
    data() {
        return {
            title: '球外切圆锥',
            BtnSpaceStyle: 'flex',
            TO: null,
            img1: 'static/img/sub-1.png',
            img2: 'static/img/start.png',
            isShow: true,
            waterShow: false,
            ballShow: false,
            lineHelpShow: false,
            waterCheck: false,
            ballCheck: false,
            lineHelpCheck: false,
            H: window.innerHeight - 76,
            VW: window.innerWidth / (window.innerHeight - 76) ? 1024 * window.innerHeight / 545 : window.innerWidth,
            VH: window.innerWidth / (window.innerHeight - 76) ? window.innerHeight : 545 * window.innerHeight / 1024,
            zoom: window.innerWidth / (window.innerHeight - 76) ? (window.innerHeight - 76) / 545 : window.innerWidth / 1024,
            value: 0,
            canvasShow: false,
        }
    },
    created() {
        document.title = this.title;
    },
    mounted() {
        document.onselectstart = function() {
            return false;
        };
        this.getViewSize();
        window.addEventListener('resize', () => {
            this.getViewSize();
        })
        this.TO = this.init();
        this.TO.createObj();
    },
    watch: {
        waterCheck(val) {
            this.TO.createObj1(val);
        },
        ballCheck(val) {
            this.TO.createObj2(val);
        },
        lineHelpCheck(val) {
            this.TO.createObj3(val);
        }
    },
    computed: {
        imgDemo() {
            let str = '';
            if (this.waterCheck && this.ballCheck && this.lineHelpCheck) {
                str = 'static/img/sub-5.png';
            } else if (this.waterCheck && this.ballCheck && !this.lineHelpCheck) {
                str = 'static/img/sub-4.png';
            } else if (this.waterCheck && !this.ballCheck && !this.lineHelpCheck) {
                str = 'static/img/sub-3.png';
            } else if (!this.waterCheck && !this.ballCheck && !this.lineHelpCheck && this.canvasShow) {
                str = 'static/img/sub-2.png';
            } else if (!this.waterCheck && !this.ballCheck && !this.lineHelpCheck && !this.canvasShow) {
                str = 'static/img/sub-1.png';
            }
            return str;
        }
    },
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
        //显示canvas
        showCanvas() {
            this.TO.showCanvas();
        },
        //初始化
        init() {
            var scene, camera, renderer, mainWidth, mainHeight, controls;
            var obj = null;
            var obj1 = new THREE.Group();
            var obj2 = new THREE.Group();
            var obj3 = new THREE.Group();
            var timer1, timer2, timer3, timer4;
            var EFtimer;
            var ABtimer;
            var water;
            var waterSave;
            let waterGeometry;
            let waterMaterial;
            let mark = 0;
            let mark1 = 0;
            let texture = new THREE.TextureLoader().load('static/img/water1.jpg');
            let textureBall = new THREE.TextureLoader().load('static/img/ball.jpg');
            //创建场景
            mainWidth = $('#renderCanvas').width();
            mainHeight = $('#renderCanvas').height();
            scene = new THREE.Scene();
            // camera = new THREE.PerspectiveCamera(50, mainWidth / mainHeight, 1, 10000);
            camera = new THREE.OrthographicCamera(mainWidth / -1, mainWidth / 1, mainHeight / 1, mainHeight / -1, -100, 10000);
            camera.position.set(0, 200, 1000);
            // camera.position.set(500,0,500);
            camera.zoom = 1;
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);
            //灯光
            var dirLight1 = new THREE.DirectionalLight(0xf0f0f0, 0.5);
            dirLight1.position.set(200, 200, 100);
            var dirLight2 = new THREE.DirectionalLight(0xf0f0f0, 0.5);
            dirLight2.position.set(-200, -200, -100);
            scene.add(dirLight1, dirLight2);
            var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.7);
            hemiLight.color.setHSL(0.6, 1, 0.6);
            hemiLight.groundColor.setHSL(0.095, 1, 0.75);
            hemiLight.position.set(0, 0, 0);
            scene.add(hemiLight);
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio * this.zoom);
            renderer.autoClear = false;
            renderer.setClearColor(0xffffff);
            renderer.setSize(mainWidth, mainHeight);
            // controls = new THREE.OrbitControls(camera, renderer.domElement);
            // controls.enableDamping = true;
            // controls.dampingFactor = 0.25;
            // controls.enableZoom = true;
            // controls.enableRotate = true;
            // controls.enablePan = false;
            $("#renderCanvas").append(renderer.domElement);
            $('canvas').hide();
            var pointPos = {
                o: [0, 0, 0],
                a: [-R * sqrt(3), R - 11, 0],
                b: [R * sqrt(3), R - 11, 0],
                c: [0, R - 11, 0],
                d: [-R / 2 * sqrt(3), -R / 2, 0],
                e: [-2.5 * R / sqrt(3), R / 2-2, 0],
                f: [2.5 * R / sqrt(3), R / 2-2, 0],
                p: [0, -2 * R, 0],
                h: [0, R / 2, 0]
            };
            //初始桶
            var createObj = () => {
                if (obj != null) {
                    scene.remove(obj, obj1, obj2, obj3);
                }
                obj = new THREE.Group();
                let pailI = common.createCircle(2 * R + 76, { color: '#a0a0a0', segments: 3, opacity: 1, depthTest: false });
                var texture1 = new THREE.TextureLoader().load('static/img/map.jpg');
                pailI.material.map = texture1;
                pailI.rotation.z = Math.PI / 6;
                pailI.position.y = 45;
                obj.add(pailI);
                let pailE = common.createCircle(2 * R + 56, { color: '', segments: 3, opacity: 1, depthTest: false });
                pailE.material.map = texture1
                pailE.rotation.z = Math.PI / 6;
                pailE.position.y = 55;
                obj.add(pailE);
                scene.add(obj);
            };
            // 初次注水面
            var createObj1 = (val) => {
                if (!val) {
                    clearTimeout(timer1);
                    clearTimeout(timer2);
                    clearTimeout(EFtimer);
                    clearTimeout(ABtimer);
                    this.ballShow = false;
                    this.lineHelpShow = false;
                    this.lineHelpCheck = false;
                    if (this.canvasShow && this.ballCheck) {
                        mark = 1;
                    }
                    if (mark1 == 1 && this.ballCheck) {
                        mark = 1;
                    }
                    mark1 = 0;
                    this.ballCheck = false;
                    scene.remove(obj1, obj2, obj3, water);
                } else if (val) {
                    let i = 0.01;
                    let l = 0;
                    obj1 = new THREE.Group;
                    let watershap = new THREE.Shape();
                    watershap.moveTo(0, -2 * R);
                    watershap.lineTo(-2.5 * R / sqrt(3), R / 2);
                    watershap.lineTo(2.5 * R / sqrt(3), R / 2);
                    waterGeometry = new THREE.ShapeGeometry(watershap);
                    waterMaterial = new THREE.MeshBasicMaterial({
                        transparent: true,
                        opacity: 0.5,
                        side: THREE.DoubleSide,
                        depthTest: false
                    });
                    water = new THREE.Mesh(waterGeometry, waterMaterial);
                    water.material.map = texture;
                    water.position.set(0, 0, 0);
                    scene.add(water);
                    scene.add(obj1);
                    water.translateY(-2 * R);
                    let EFline = common.createStraightLine([pointPos.e, pointPos.f], 2, 3, '#000');
                    let textE = common.createText('E', -3 * R / sqrt(3), R / 2, 0);
                    let textF = common.createText('F', 3 * R / sqrt(3), R / 2, 0);
                    EFline.material.opacity = 0;
                    var watering = () => {
                        timer1 = setTimeout(watering, 50);
                        water.scale.set(i, i, i);
                        water.translateY(3);
                        i = i + 0.01;
                        if (i >= 1) {
                            clearTimeout(timer1);
                            obj1.add(EFline);
                            EFlineing();
                        }
                    }
                    // EF线
                    var EFlineing = () => {
                        EFtimer = setTimeout(EFlineing, 10);
                        l = l + 0.01;
                        EFline.material.opacity = l;
                        if (l >= 1) {
                            clearTimeout(EFtimer);
                            obj1.add(textE);
                            obj1.add(textF);
                            this.ballShow = true;
                        }
                    }
                    watering();
                }
            };
            // 铁球 
            var createObj2 = (val) => {
                if (!val) {
                    clearTimeout(timer2);
                    clearTimeout(ABtimer);
                    this.lineHelpShow = false;
                    this.lineHelpCheck = false;
                    scene.remove(obj2, obj3, water);
                    if (mark == 0) {
                        water = new THREE.Mesh(waterGeometry, waterMaterial);
                        water.material.map = texture;
                        water.position.set(0, 0, 0);
                        scene.add(water);
                    }
                } else if (val) {
                    let i = 1;
                    let l = 0;
                    mark = 0;
                    obj2 = new THREE.Group();
                    let textA = common.createText('A', -R * sqrt(3) - 50, R, 0);
                    let textB = common.createText('B', R * sqrt(3) + 50, R, 0);
                    let ABline = common.createStraightLine([pointPos.a, pointPos.b], 2, 3, '#000');
                    ABline.material.opacity = 0;
                    let ball = common.createCircle(R, { color: '', segments: 36, opacity: 1, depthTest: false });
                    ball.material.map = textureBall;
                    ball.position.y = 500;
                    scene.add(obj2);
                    obj2.add(ball);
                    var ballMoving = () => {
                        timer2 = setTimeout(ballMoving, 25);
                        ball.translateY(-5);
                        if (ball.position.y <= ((3 * R / 2) - 33)) {
                            i = i + 0.0045
                            water.scale.set(i, i, i);
                            water.translateY(1.3);
                        }
                        if (ball.position.y <= 0 - 6) {
                            clearTimeout(timer2);
                            obj2.add(ABline);
                            ABlineing();
                        }
                    }
                    var ABlineing = () => {
                        ABtimer = setTimeout(ABlineing, 5);
                        l = l + 0.01;
                        ABline.material.opacity = l;
                        if (l >= 1) {
                            clearTimeout(ABtimer);
                            obj2.add(textA);
                            obj2.add(textB);
                            this.lineHelpShow = true;
                            // this.ballShow = true;
                        }
                    }
                    ballMoving();
                }
            };
            var createObj3 = (val) => {
                if (!val) {
                    scene.remove(obj3);
                    cancelAnimationFrame(obj3.timer);
                } else if (val) {
                    obj3 = new THREE.Group();
                    let CPline = common.createStraightLine([pointPos.c, pointPos.p], 2, 3, '#000');
                    let textC = common.createText('C', 20, R - 20, 0);
                    let textP = common.createText('P', 20, -2 * R, 0);
                    let textH = common.createText('H', 20, R / 2, 0);
                    let textO = common.createText('O', 20, 0, 0);
                    let textD = common.createText('D', -R / 2 * sqrt(3) - 30, -R / 2, 0);
                    obj3.add(CPline, textC, textP, textH, textO, textD);
                    common.getLong(pointPos.a, pointPos.o, obj3, obj3, { style: 2, line_width: 3, color: '#FF1F3A' }).then(() => {
                        common.getLong(pointPos.d, pointPos.o, obj3, obj3, { style: 2, line_width: 3, color: '#FF1F3A' }).then(() => {


                        });
                    });
                    scene.add(obj3);
                }
            };
            //右侧图片点击隐藏-canvas显示
            var showCanvas = () => {
                this.canvasShow = true;
                $('.showImg').hide();
                this.waterShow = true;
                $('canvas').show();
                this.slideShow = true;
            };
            //重置
            var resetWidget = () => {
                $('.showImg').show();
                $('canvas').hide();
                this.value = 0;
                mark1 = 1;
                this.waterShow = false;
                this.canvasShow = false;
                this.slideShow = false;
                this.ballShow = false;
                this.lineHelpShow = false;
                this.waterCheck = false;
                waterSave = null;
                waterGeometry = null;
                waterMaterial = null;
                this.imgL("static/img/sub-1.png", () => {
                    this.img1 = 'static/img/sub-1.png';
                });
                createObj();
                camera.position.set(0, 200, 1000);
                camera.zoom = 1;
                camera.updateProjectionMatrix();
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
                    showCanvas: showCanvas,
                    createObj: createObj,
                    createObj1: createObj1,
                    createObj2: createObj2,
                    createObj3: createObj3,
                }
            }
            return TO();
        },
        //计算区块大小
        getViewSize() {
            var W = window.innerWidth;
            var H = window.innerHeight - 76;
            this.H = H;
            if (W / H > 1024 / 545) {
                this.zoom = (H / 545).toFixed(2);
                this.VW = 1024 * H / 545;
                this.VH = H;
            } else {
                this.zoom = (W / 1024).toFixed(2);
                this.VW = W;
                this.VH = 545 * W / 1024;
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
    position: relative;
}


/*内容区*/

.View {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}

.ViewSpace {
    position: relative;
    width: 1024px;
    height: 545px;
    padding: 26px 0;
    transform-origin: top left;
}

.ViewSpace .leftWrap {
    display: inline-block;
    width: 372px;
    height: 400px;
    position: absolute;
    /*margin-right: 24px;*/
    margin-left: 15px;
    left: 0;
    float: left;
}

.ViewSpace .leftWrap>img {
    display: inline-block;
    width: 100%;
    height: 100%;
}

.ViewSpace .rightWrap,
.showImg {
    display: inline-block;
    width: 580px;
    height: 400px;
    position: absolute;
    margin-right: 15px;
    right: 0;
    float: right;
    cursor: pointer;
}

.ViewSpace .rightWrap img {
    display: inline-block;
    width: 100%;
    height: 100%;
}

.bottomWrap {
    position: absolute;
    bottom: 24px;
    width: 150px;
    margin-right: 15px;
    height: auto;
    right: 0;
}

canvas {
    width: 100%;
    height: 100%;
}

.insp-wrapper {
    width: 100%;
    height: 100%;
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