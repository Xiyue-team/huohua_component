<template>
    <div id="app" class="noselect">
        <div class="container">
            <!--头部-->
            <h3 v-text="title" class="app_title"></h3>
            <!--视图区-->
            <div id="renderCanvas"></div>
        </div>
        <!--侧边按钮区-->
        <div class="app_aside">
            <!--重制按钮-->
            <ui-btn type="reset1" id="buttom1" class="aside_reset" @click.native="resetWidget"></ui-btn>
            <!--清除浮动-->
            <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
                <ui-btn type="switch" id="buttom2" v-model="checked" style="margin-bottom: 50px;">
                    多层磁感线
                </ui-btn>
                <ui-group type="radio" :margin="12" :groups="groups" v-model="radio"></ui-group>
            </div>
        </div>
    </div>
</template>
<script>
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiGroup from '@/components/UI/uiGroup'; //单选组
export default {
    name: 'app',
    components: {
        uiHead,
        uiBtn,
        uiGroup
    },
    data() {
        return {
            title: '直线电流的磁场',
            BtnSpaceStyle: 'flex',
            TO: null,
            radio: '',
            checked: false,
            groups: [{
                name: 'one',
                txt: '横剖面图',
                id: 'buttom3'
            }, {
                name: 'two',
                txt: '纵剖面图',
                id: 'buttom4'
            }],
            isMob: /iPad|Android/g.test(navigator.userAgent),
            ratio: 5, // 设置线圈模型大小的系数
        }
    },
    created() {
        document.title = this.title;
    },
    watch: {
        checked() {
            this.TO.isShow();
        },
        radio(v) {
            if (v == 'one') {
                this.TO.rotate([0, 1200, 1]);
            } else if (v == 'two') {
                this.TO.rotate([0, 0, 1200]);
            }
            this.TO.specialCro();
        }
    },
    methods: {
        //计算侧边
        setSideStyle() {
            const el = document.getElementById('btn_space');
            if (el && el.scrollHeight > el.offsetHeight) {
                this.BtnSpaceStyle = 'block'
            } else {
                this.BtnSpaceStyle = 'flex'
            }
            var cW = $('canvas').width();
            var cH = $('canvas').height();
            $('canvas').css({
                'left': ($('#renderCanvas').width() - cW) / 2 + 'px',
                'top': ($('#renderCanvas').height() - cH) / 2 + 'px'
            });
        },

        //创建模型
        init() {
            var mainWidth = $('#renderCanvas').width();
            var mainHeight = $('#renderCanvas').height();
            var scene = new THREE.Scene();
            var camera = new THREE.OrthographicCamera(mainWidth / -1.5, mainWidth / 1.5, mainHeight / 1.5, mainHeight / -1.5, -100, 10000);
            camera.position.x = -200;
            camera.position.y = 720;
            camera.position.z = 1200;
            camera.zoom = 1.1;
            camera.updateProjectionMatrix();
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);
            var renderer = new THREE.WebGLRenderer({
                antialias: true //抗锯齿
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(0xffffff);
            renderer.setSize(mainWidth, mainHeight);
            $("#renderCanvas").append(renderer.domElement);
            var controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            controls.enableZoom = true;
            controls.enableRotate = true;
            controls.enablePan = false;
            var torusArrow = null;
            var cloneTorusGroup = null;
            var cenArrowImg = null;
            var arrowImgGroup = null;
            var dirArrow = null;
            var bluePoint = null;
            var timer;
            var me = this;
            var topImg = null;
            var bottomImg = null;
            var cylinder = null;

            var rotate = (aim) => {
                cancelAnimationFrame(timer);
                camera.zoom = 1.1;
                camera.updateProjectionMatrix();
                var position = camera.position;
                var x = aim[0] - position.x,
                    y = aim[1] - position.y,
                    z = aim[2] - position.z;
                var n = 25,
                    v1 = x / n,
                    v2 = y / n,
                    v3 = z / n;
                var a = () => {
                    n--;
                    if (n < 0) {
                        cancelAnimationFrame(timer);
                        isShow();
                        camera.position.set(aim[0],aim[1],aim[2]);
                        return false;
                    }
                    position = camera.position;
                    camera.position.set(position.x + v1, position.y + v2, position.z + v3);
                    timer = requestAnimationFrame(a);
                }
                a();
            }
            //创建基本模型
            var createObj = () => {
                //创建圆柱和黄色箭头
                dirArrow = new THREE.Object3D();
                cylinder = this.createCylinder(8, 8, 500, '#4A4A4A', 1);
                var yellowC = this.createCylinder(2, 2, 100, '#F8E71C');
                yellowC.material.depthTest = false;
                var yellowA = this.createCylinder(0, 5, 15, '#F8E71C');
                yellowA.position.y = 50;
                yellowA.material.depthTest = false;
                dirArrow.add(yellowA, yellowC);
                dirArrow.position.y = -150;
                scene.add(cylinder, dirArrow);

                //创建上下贴图
                topImg = this.createImg([0, 0, 0], 40, 40, 'static/UI/top.png');
                topImg.rotation.x = -Math.PI/2;
                topImg.position.y = 251;
                topImg.visible = false;
                bottomImg = this.createImg([0, 0, 0], 40, 40, 'static/UI/bottom.png');
                bottomImg.rotation.x = Math.PI/2;
                bottomImg.position.y = -251;
                bottomImg.visible = false;
                //创建电流磁场圆环
                [torusArrow, cenArrowImg] = this.createArrow();
                cenArrowImg.visible = false;
                //创建文字
                var textI = this.createText([30, 265, 0], "I", 40, '#1A1A1A');
                var textB = this.createText([250, 20, 0], "B", 30, '#1A1A1A');
                [cloneTorusGroup, arrowImgGroup] = createCloneA();
                cloneTorusGroup.visible = false;
                arrowImgGroup.visible = false;
                scene.add(cenArrowImg, cloneTorusGroup, arrowImgGroup, torusArrow, textB, textI,bottomImg,topImg);

            }
            var specialCro = () => {

                arrowImgGroup.visible = false;
                cenArrowImg.visible = false;
                torusArrow.visible = true;
                if (this.checked) {
                    cloneTorusGroup.visible = true;
                } else {
                    cloneTorusGroup.visible = false;
                }

            }
            var cloneArrowImg = () => {
                arrowImgGroup = new THREE.Object3D();
                let arrowImg = null;
                for (let i = -4; i < 5; i++) {
                    if (i == 0) {
                        continue;
                    }
                    arrowImg = cenArrowImg.clone();
                    arrowImg.position.y = i * 50;
                    arrowImg.visible = true;
                    //克隆时会把圆环的旋转角度也给克隆了，手动重置为0;
                    arrowImgGroup.add(arrowImg);
                }
                scene.add(arrowImgGroup)
            }
            var isShow = () => {
                if (this.checked) {
                    if (this.radio == 'one') {
                        cloneTorusGroup.visible = true;
                        arrowImgGroup.visible = false;
                        cenArrowImg.visible = false;
                        torusArrow.visible = true;
                    } else if (this.radio == 'two') {
                        cloneTorusGroup.visible = false;
                        arrowImgGroup.visible = true;
                        cenArrowImg.visible = true;
                        torusArrow.visible = false;
                    } else {
                        cloneTorusGroup.visible = true;
                    }
                } else {
                    if (this.radio == 'one') {
                        cloneTorusGroup.visible = false;
                        arrowImgGroup.visible = false;
                        cenArrowImg.visible = false;
                        torusArrow.visible = true;
                    } else if (this.radio == 'two') {
                        cloneTorusGroup.visible = false;
                        arrowImgGroup.visible = false;
                        cenArrowImg.visible = true;
                        torusArrow.visible = false;
                    } else {
                        cloneTorusGroup.visible = false;
                        arrowImgGroup.visible = false;
                        cenArrowImg.visible = false;
                        torusArrow.visible = true;
                    }
                }

            }
            var createCloneA = () => {
                let group = new THREE.Object3D();
                let group1 = new THREE.Object3D();
                let copyTorus = null;
                let arrowImg = null;

                for (let i = -4; i < 5; i++) {
                    if (i == 0) {
                        continue;
                    }
                    copyTorus = torusArrow.clone();
                    copyTorus.position.y = i * 50;
                    arrowImg = cenArrowImg.clone();
                    arrowImg.position.y = i * 50;
                    arrowImg.visible = true;
                    //克隆时会把圆环的旋转角度也给克隆了，手动重置为0;
                    copyTorus.rotation.y = 0;
                    group.add(copyTorus);
                    group1.add(arrowImg);
                }
                return [group, group1];

            }
            createObj();
            var touchF = false;
            var step1 = () => {
                touchF = true;
            }
            var step2=()=>{
                cancelAnimationFrame(this.timer);
                this.radio = '';
                torusArrow.visible = true;
                if (this.checked) {
                    cloneTorusGroup.visible = true;
                }
                cenArrowImg.visible = false;
                arrowImgGroup.visible = false;
            }
            var step2M = () => {
                if (touchF) {
                    step2();
                }
            }
            var step2T = (event) => {
                if(event.touches.length>=2){
                    return;
                }
                if (touchF) {
                    step2();
                }
            }
            var step3 = () => {
                touchF = false;
            }
            var canvas = $('#renderCanvas canvas')[0];
            canvas.addEventListener('mousedown', step1);
            canvas.addEventListener('mousemove', step2M);
            window.addEventListener('mouseup', step3);
            canvas.addEventListener('touchstart', step1);
            canvas.addEventListener('touchmove', step2T);
            window.addEventListener('touchend', step3);

            function renderAll() {
                controls.update();
                if (camera.zoom <= 0.8) {
                    camera.zoom = 0.8000001;
                } else if (camera.zoom >= 1.9) {
                    camera.zoom = 1.99999999;
                }
                camera.updateProjectionMatrix();
                renderer.render(scene, camera);
                dirArrow.position.y = dirArrow.position.y > 180 ? -180 : dirArrow.position.y += 2;
                if (torusArrow.rotation.y == Math.PI * 2) {
                    torusArrow.rotation.y = 0;
                }
                torusArrow.rotation.y += Math.PI / 360;

                if (cloneTorusGroup != null) {
                    cloneTorusGroup.rotation.y = torusArrow.rotation.y;
                }
                if(Math.abs(camera.position.x)<=2 && Math.abs(camera.position.z)<=2 && camera.position.y>0){
                    topImg.visible = true;
                    cylinder.visible =false;
                    dirArrow.visible = false;
                }else if(Math.abs(camera.position.x)<=2 && Math.abs(camera.position.z)<=2 && camera.position.y<0){
                    bottomImg.visible =true;
                    cylinder.visible = false;
                    dirArrow.visible = false;
                }else{
                    topImg.visible = false;
                    bottomImg.visible =false;
                    cylinder.visible =true;
                    dirArrow.visible = true;
                }
                requestAnimationFrame(renderAll);
            }
            renderAll();
            var resetWidget = () => {
                camera.position.x = -200;
                camera.position.y = 720;
                camera.position.z = 1200;
                camera.zoom = 1.1;
                camera.updateProjectionMatrix();
                this.checked = false;
                this.radio = '';
                isShow();
            }
            var TO = () => {
                return {
                    rotate,
                    resetWidget,
                    isShow,
                    specialCro
                }
            }
            return TO();
        },

        createImg(vertices, w, h, src) {
            var PlaneG = new THREE.PlaneGeometry(w, h);
            var PlaneM = new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture(src),
                transparent: true,
                overdraw: 0.2,
                depthTest: false
            });
            var Plane = new THREE.Mesh(PlaneG, PlaneM);
            Plane.position.x = vertices[0];
            Plane.position.y = vertices[1];
            Plane.position.z = vertices[2];
            return Plane;
        },
        createCircle(vertices, radius, color, start = 0, end = Math.PI * 2, opacity = 1) {

            var CircleM = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: opacity
            });
            var CircleG = new THREE.CircleGeometry(radius, 50, start, end);
            var Circle = new THREE.Mesh(CircleG, CircleM);
            Circle.position.x = vertices[0];
            Circle.position.y = vertices[1];
            Circle.position.z = vertices[2];
            return Circle;
        },

        //线条
        createLineMesh: function(vertices, color, style) {
            var lineMesh = null,
                geometryLine = new THREE.Geometry();
            if (!color) {
                color = '#000';
            }
            if (style == 2) {
                geometryLine.vertices = vertices;
                geometryLine.computeLineDistances();
                lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
                    color: color,
                    transparent: true,
                    opacity: 0.5,
                    dashSize: 15,
                    gapSize: 15,
                    depthTest: false,
                    linewidth: 1
                }));
            } else if (style == 3) {
                geometryLine.vertices = vertices;
                lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({
                    color: color,
                    linewidth: 2,
                }));
            }
            return lineMesh;
        },
        //创建圆柱和圆锥
        createCylinder(radiusTop, radiusBottom, height, color = '#5CAEFD') {
            var CylinderM = new THREE.MeshBasicMaterial({
                color
            });
            var CylinderG = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 36, 1, false);
            var Cylinder = new THREE.Mesh(CylinderG, CylinderM);
            return Cylinder;
        },
        //创建圆环和箭头
        createArrow() {
            let group = new THREE.Object3D();
            let group1 = new THREE.Object3D();
            let arrow = null;
            let arrow1 = null;
            let arrowImg = null;
            // let vertices = [];
            for (let i = 1; i < 7; i++) {
                this.ratio *= 1.2;
                group.add(this.createCircleLine(this.ratio**2));

                //创建静止时的叉和箭头
                arrowImg = this.createImg([0, 0, 0], 20, 20, 'static/UI/arrow.png');
                arrowImg.position.x = this.ratio**2 * Math.cos(0 * Math.PI / 180);
                arrowImg.position.y = 0;
                arrowImg.position.z = this.ratio**2 * Math.sin(0 * Math.PI / 180);
                arrow1 = this.createCylinder(0, 3, 10);
                arrow1.position.x = this.ratio**2 * Math.cos(180 * Math.PI / 180);
                arrow1.position.y = 0;
                arrow1.position.z = this.ratio**2 * Math.sin(180 * Math.PI / 180);
                arrow1.rotation.x = -Math.PI / 2;

                group1.add(arrowImg, arrow1);

                for (let j = 0; j < 2; j++) {
                    arrow = this.createCylinder(0, 3, 10);
                    arrow.position.x = this.ratio**2 * Math.cos(j * 180 * Math.PI / 180);
                    arrow.position.z = this.ratio**2 * Math.sin(j * 180 * Math.PI / 180);
                    if (j == 0) {
                        arrow.rotation.x = -Math.PI / 2;
                    } else if (j == 1) {
                        arrow.rotation.x = -Math.PI / 2;
                        arrow.rotation.z = -Math.PI;
                    }
                    group.add(arrow);

                }
            }
            return [group, group1];
        },
        createCircleLine(r) {
            let vertices = [];
            for (let i = 0; i < 361; i = i + 4) {
                vertices.push(new THREE.Vector3(r * Math.cos(i * Math.PI / 180), 0, r * Math.sin(i * Math.PI / 180)));
            }
            let line = this.createLineMesh(vertices, '#5CAEFD', 3, 1);
            return line;
        },
        vec3(x, y, z) {
            return new THREE.Vector3(x, y, z);
        },
        //文字
        createText(vertices, font, size, color) {
            var SpriteText2D = THREE_Text.SpriteText2D;
            var textAlign = THREE_Text.textAlign;
            var textStyle = {
                align: textAlign.center,
                font: size + 'px "Cambria Math"',
                fillStyle: color,
                antialias: true
            };
            var text = new SpriteText2D(font, textStyle);
            text.position.x = vertices[0];
            text.position.y = vertices[1];
            text.position.z = vertices[2];
            return text;
        },


        //重置
        resetWidget() {
            this.TO.resetWidget();
        }
    },
    mounted() {
        //禁止选择
        document.onselectstart = function() {
            return false;
        };
        this.setSideStyle();
        this.TO = this.init();
        window.addEventListener('resize', () => {
            this.setSideStyle();
        })
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

body {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
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

#renderCanvas {
    width: 100%;
    height: calc(100% - 72px);
    outline: none;
    position: relative;
    overflow: hidden;
}

canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    /*margin-left: -142px;*/
}

.show_main {
    width: 300px;
    height: 300px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
    margin: auto;
    text-align: center;
    z-index: 999;
}

.show_main img {
    display: block;
    width: 100%;
    height: 100%;
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
    /*display: flex;*/
    /*align-items: center;*/
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
}

.btn_space .UI-btn {
    margin-bottom: 10px;
}

.step {
    margin-bottom: 60px;
}

.step .add,
.step #remove {
    display: block;
    width: 60px;
    height: 60px;
    padding: 0;
    line-height: 63px;
    font-size: 45px;
    text-align: center;
    border-radius: 50%;
    border: 0 solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.24);
    background-color: #ffffff;
    color: #5caefd;
    float: left;
    cursor: pointer;
    margin-left: 90px;
}

.step #remove {
    float: right;
}

#cell {
    float: left;
    display: inline-block;
    height: 12px;
    position: relative;
    top: 28px;
    left: 38px;
    text-align: center;
    font-size: 0;
}

#cell span {
    display: inline-block;
    width: 6px;
    height: 12px;
    background: rgb(213, 213, 213);
    border-radius: 2px;
    text-align: center;
    margin: 0 2px;
}

#cell span.active {
    background: #5CAEFD;
}
</style>