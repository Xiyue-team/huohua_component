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
                <ui-btn type="switch" id="buttom2" v-model="checked" style="margin-bottom: 50px;"
                        @click.native="btnClick">
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
                dragAble: true,
                title: '环形电流的磁场',
                BtnSpaceStyle: 'flex',
                TO: null,
                radio: '',
                checked: false,
                groups: [{
                    name: 'one',
                    txt: '侧视图',
                    id: 'buttom3'
                }, {
                    name: 'two',
                    txt: '横剖面图',
                    id: 'buttom4'
                }, {
                    name: 'three',
                    txt: '纵剖面图',
                    id: 'buttom5'
                }],
                isMob: /iPad|Android/g.test(navigator.userAgent),
                top: false,
            }
        },
        created() {
            document.title = this.title;
        },
        watch: {
            radio() {
                this.TO.reset1();
                if (this.radio === 'one') {
                    this.checked = false;
                    this.top = true;
                    this.TO.rotate([10000, 0, 0]);
                    this.dragAble = false;
                    this.TO.unimportanceHide();
                    $('#buttom2').addClass('nodrag');
                    this.TO.allRunHide();
                } else if (this.radio === 'two') {
                    this.checked = false;
                    this.top = false;
                    this.TO.rotate([0, 10000, 1]);
                    this.dragAble = false;
                    this.TO.unimportanceHide();
                    $('#buttom2').addClass('nodrag');
                    this.TO.CrossSection();
                } else if (this.radio === 'three') {
                    // this.checked = true;
                    this.top = false;
                    this.TO.rotate([0, 0, 10000]);
                    $('#buttom2').removeClass('nodrag');
                    this.dragAble = true;
                    this.TO.LongitudinalSectionHide();
                }
            }
        },
        methods: {
            btnClick() {
                if (this.dragAble) {
                    if (this.checked) {
                        if (this.radio === 'three') {
                            this.TO.LongitudinalSectionShow();
                        } else {
                            this.TO.unimportanceShow();
                        }
                    } else {
                        if (this.radio === 'three') {
                            this.TO.runLineHide();
                        } else {
                            this.TO.unimportanceHide();
                        }
                    }
                } else {
                    this.checked = false;
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
                var Indicator = new THREE.Group();
                var camera = new THREE.OrthographicCamera(mainWidth / -0.8, mainWidth / 0.8, mainHeight / 0.8, mainHeight / -0.8, -100, 100000);
                camera.position.set(0, 8000, 20000);
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
                controls.minZoom=0.7;
                controls.maxZoom=1.3;

                //创建基本模型
                var createObj = () => {
                    //中央大圆环
                    var bigTorus = this.createTorus(300, 10, '#4A4A4A', Math.PI * 1.8);
                    bigTorus.rotation.z = -Math.PI / 2.5;
                    //大圆环上的指示线
                    var smallTorus = this.createTorus(300, 1, '#F8E71C', Math.PI / 5);
                    smallTorus.material.depthTest = false;
                    smallTorus.rotation.z = Math.PI / 2.6;

                    //指示线的头
                    var cylinder = this.createCylinder(0, 6, 20, '#F8E71C');
                    cylinder.rotation.z = Math.PI / 1.7;
                    cylinder.material.depthTest = false;
                    cylinder.position.set(-90, 285, 0);
                    Indicator.add(smallTorus, cylinder);
                    //指示线的文字
                    var text = this.createText([0, 360, 0], "I", 38, '#1A1A1A');
                    scene.add(bigTorus, text, Indicator);
                };
                createObj();
                //电极
                var createPlan = () => {
                    var geometry = new THREE.PlaneBufferGeometry(644, 206, 1);
                    var material = new THREE.MeshBasicMaterial({
                        map: new THREE.TextureLoader().load("static/UI/tt.png"),
                        side: THREE.DoubleSide,
                        transparent: true
                    });
                    var plane = new THREE.Mesh(geometry, material);
                    plane.position.set(0, -390, 0);
                    scene.add(plane);
                };
                createPlan();
                //电线圈
                var createXian = () => {
                    var G = new THREE.Group();
                    var group = new THREE.Group();
                    var r = 50;
                    var cylinder = this.createCylinder(0, 6, 25, '#5CAEFD');
                    cylinder.rotation.z = Math.PI / 2;
                    var YUAN = this.createYuan(r, 361);
                    var scaleY=1;
                    for (var i = 1; i <= 12; i++) {
                        var yuan=YUAN.clone();
                        yuan.scale.set(scaleY,scaleY,scaleY);
                        yuan.position.set(0, 0, 0);
                        scaleY*=1.5;
                        var cylinder11=cylinder.clone();
                        cylinder11.rotation.y = Math.PI / 2;
                        cylinder11.position.set(r, 0, 0);
                        var cylinder12 = cylinder.clone();
                        cylinder12.rotation.y = -Math.PI / 2;
                        cylinder12.position.set(-r, 0, 0);
                        var group11 = new THREE.Group();
                        var group1 = new THREE.Group();
                        group11.add(cylinder11, cylinder12);
                        group1.add(yuan, group11);
                        group1.position.x -= (r - 50 - i * 20);
                        group.add(group1);
                        r *= 1.5;
                    }
                    group.position.set(-320, 0, 0);
                    G.add(group);
                    return G;
                };
                //静止线圈
                var creatDStatic = () => {
                    var G = new THREE.Group();
                    var group = new THREE.Group();
                    var r = 50;
                    var geometry = new THREE.CircleBufferGeometry(5, 32);
                    var material = new THREE.MeshBasicMaterial({color: '#5CAEFD'});
                    var cylinder = new THREE.Mesh(geometry, material);
                    var cylinderX = createImg([0, 0, 0], 40, 40, 'static/UI/arrow.png');
                    for (var i = 1; i <= 12; i++) {
                        var cylinder11=cylinder.clone();
                        cylinder11.rotation.z = Math.PI / 2;
                        var cylinder12=cylinderX.clone();
                        cylinder11.position.set(r, 0, 0);
                        cylinder12.position.set(-r, 0, 0);
                        var group1 = new THREE.Group();
                        group1.add(cylinder11, cylinder12);
                        group1.position.x -= (r - 50 - i * 20);
                        group.add(group1);
                        r *= 1.5;
                    }
                    group.position.set(-320, 0, 0);
                    G.add(group);
                    return G;
                };
                var createImg = (vertices, w, h, src) => {
                    var PlaneG = new THREE.PlaneGeometry(w, h);
                    var PlaneM = new THREE.MeshBasicMaterial({
                        map: new THREE.TextureLoader().load(src),
                        transparent: true,
                        overdraw: 0.2,
                        depthTest: false
                    });
                    var Plane = new THREE.Mesh(PlaneG, PlaneM);
                    Plane.position.x = vertices[0].x;
                    Plane.position.y = vertices[0].y;
                    Plane.position.z = vertices[0].z;
                    return Plane;
                };
                //中间的线圈
                var createMid = () => {
                    var cylinder = this.createCylinder(0, 6, 25, '#5CAEFD');
                    cylinder.rotation.z = Math.PI;
                    var vertices = [];
                    vertices.push(this.vec3(0, -500, 0), this.vec3(0, 500, 0));
                    var line = this.createLineMesh(vertices, '#5CAEFD', 3);
                    line.rotation.x = Math.PI / 2;
                    cylinder.rotation.x = -Math.PI / 2;
                    scene.add(line, cylinder);
                    return cylinder;
                };
                //运动的线圈循环
                var G = new THREE.Group();
                var group = createXian();
                group.rotation.z = Math.PI / 4;
                G.add(group);
                var JT=[];
                for (var i = 0; i < 7; i++) {
                    var g = group.clone();
                    for(var j in g.children[0].children){
                        JT.push(g.children[0].children[j].children[1])
                    }
                    g.rotation.z = -i * Math.PI / 4;
                    G.add(g);
                }

                //纵剖面静止的线圈
                var G1 = new THREE.Group();
                var group1 = creatDStatic();
                group1.rotation.z = Math.PI / 4;
                G1.add(group1);
                for (var i = 0; i < 6; i++) {
                    var group = group1.clone();
                    group.rotation.z = -i * Math.PI / 4;
                    G1.add(group);
                }
                G1.visible = false;

                //横剖面静止的线圈
                var cylinderMid = createMid();
                scene.add(G, cylinderMid, G1);

                var touchF = false;
                var step1 = () => {
                    touchF = true;
                }
                var step2=()=>{
                    this.dragAble = true;
                    $('#buttom2').removeClass('nodrag');
                    this.radio = '';
                    cancelAnimationFrame(this.timer);
                    //铁圈显示 点和叉隐藏
                    PointForkHide();
                    //运动线圈显示，静止线圈隐藏
                    runLineShow();
                    touchF = false;
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
                //状态重置
                var reset1 = () => {
                    scene.children[6].children[0].visible = false;
                    scene.children[6].children[2].visible = false;
                    cancelAnimationFrame(this.timer);
                    //铁圈显示 点和叉隐藏
                    PointForkHide();
                    //运动线圈显示，静止线圈隐藏
                    runLineShow();
                };
                //点击纵剖面图 运动线圈隐藏 静止线圈显示
                var LongitudinalSectionHide = () => {
                    G1.visible = true;
                    if (this.checked) {
                        for (var i in G1.children) {
                            G1.children[i].visible = true;
                        }
                        for (var i in scene.children[6].children) {
                            scene.children[6].children[i].visible = false;
                        }
                    } else {
                        for (var i in G1.children) {
                            if (i == 1 || i == 5) {
                                continue;
                            }
                            G1.children[i].visible = false;
                        }
                        for (var i in scene.children[6].children) {
                            scene.children[6].children[i].visible = false;
                        }
                    }
                };
                //选中纵剖面图 所有静止线圈显示
                var LongitudinalSectionShow = () => {
                    G1.visible = true;
                    for (var i in scene.children[6].children) {
                        scene.children[6].children[i].visible = false;
                    }
                    for (var i = 0; i < G1.children.length; i++) {
                        G1.children[i].visible = true;
                    }
                };
                //选中纵剖面图 只有左右静止线圈显示
                var runLineHide = () => {
                    G1.visible = true;
                    for (var i in G1.children) {
                        if (i == 1 || i == 5) {
                            continue;
                        }
                        G1.children[i].visible = false;
                    }
                };
                //所有运动线圈隐藏
                var allRunHide = () => {
                    scene.children[6].children[3].visible = true;
                    scene.children[6].children[7].visible = true;
                    scene.children[6].children[1].visible = false;
                    scene.children[6].children[5].visible = false;
                };
                //滑动相机所有静止线圈隐藏，运动线圈显示
                var runLineShow = () => {
                    G1.visible = false;
                    if (this.top) {
                        scene.children[6].children[3].visible = false;
                    }
                    if (this.radio === 'one') {
                        for (var i in scene.children[6].children) {
                            if (i == 3 || i == 7) {
                                scene.children[6].children[i].visible = true;
                            }
                        }
                    } else {
                        if (this.checked) {
                            for (var i in scene.children[6].children) {
                                scene.children[6].children[i].visible = true;
                            }
                            scene.children[6].children[7].visible = false;
                        } else {
                            scene.children[6].children[7].visible = false;
                            for (var i in scene.children[6].children) {
                                if (i == 1 || i == 5) {
                                    scene.children[6].children[i].visible = true;
                                }
                            }
                        }
                    }
                };
                //无关线圈隐藏
                var unimportanceHide = () => {
                    for (var i in scene.children[6].children) {
                        if (i == 1 || i == 5) {
                            continue;
                        }
                        scene.children[6].children[i].visible = false;
                    }
                };
                unimportanceHide();
                //无关线圈显示
                var unimportanceShow = () => {
                    for (var i in scene.children[6].children) {
                        if (i == 1 || i == 5 || i == 7) {
                            continue;
                        }
                        scene.children[6].children[i].visible = true;
                    }
                };
                //横剖面图 铁圈隐藏 点和叉显示
                var CrossSection = () => {
                    for (var i = 1; i < 5; i++) {
                        scene.children[i].visible = false;
                    }
                    Pointforkshow();
                };
                //点和叉Point and fork
                var point, fork = new THREE.Group(), quan1, quan2;
                var createFork=()=>{
                    var geometry = new THREE.CircleBufferGeometry(10, 32);
                    var material = new THREE.MeshBasicMaterial({color: '#5CAEFD'});
                    point = new THREE.Mesh(geometry, material);
                    point.position.x = 300;
                    point.rotation.x = -Math.PI / 2;

                    var vertices = [], vertices1 = [];
                    vertices.push(this.vec3(-315, 0, 15), this.vec3(-285, 0, -15));
                    vertices1.push(this.vec3(-315, 0, -15), this.vec3(-285, 0, 15));
                    var l1 = this.createLineMesh(vertices, '#5CAEFD', 3);
                    var l2 = this.createLineMesh(vertices1, '#5CAEFD', 3);
                    fork.add(l1, l2);

                    quan1 = this.createYuan(21, 361, '#000');
                    quan1.position.x = 300;
                    quan2 = quan1.clone();
                    quan2.position.x = -300;
                    point.visible=false;
                    fork.visible=false;
                    quan1.visible=false;
                    quan2.visible=false;
                    scene.add(point,fork,quan1,quan2);
                }
                createFork();
                var Pointforkshow = () => {
                    point.visible=true;
                    fork.visible=true;
                    quan1.visible=true;
                    quan2.visible=true;
                };
                //铁圈显示 点和叉隐藏
                var PointForkHide = () => {
                    for (var i = 1; i < 5; i++) {
                        scene.children[i].visible = true;
                    }
                    point.visible=false;
                    fork.visible=false;
                    quan1.visible=false;
                    quan2.visible=false;
                };
                var rotate = (aim) => {
                    camera.zoom = 1;
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
                            camera.position.set(aim[0],aim[1],aim[2]);
                            cancelAnimationFrame(this.timer);
                            return false;
                        }
                        position = camera.position;
                        camera.position.set(position.x + v1, position.y + v2, position.z + v3);
                        this.timer = requestAnimationFrame(a);
                    };
                    a();
                };
                //动画
                var rotateAng=0;
                var IndicatorPosz=0;
                var renderAll = () => {
                    controls.update();
                    requestAnimationFrame(renderAll);
                    renderer.render(scene, camera);
                    cylinderMid.position.z > 500?cylinderMid.position.z = -500:cylinderMid.position.z += 5;
                    IndicatorPosz=Indicator.rotation.z;
                    if (this.radio === 'one') {
                        if (IndicatorPosz > 6.27) {
                            Indicator.rotation.z = 0;
                        } else if (IndicatorPosz < 6.27 && IndicatorPosz > 3.16) {
                            Indicator.visible = true;
                            Indicator.rotation.z += 0.0105;
                        } else {
                            Indicator.visible = false;
                            Indicator.rotation.z += 0.0105;
                        }
                    } else if (this.radio === 'two') {
                        Indicator.visible = false;
                    } else {
                        Indicator.visible = true;
                        if (IndicatorPosz > 6.27) {
                            Indicator.rotation.z = 0;
                        } else if (IndicatorPosz < 3.85 && IndicatorPosz > 2.45) {
                            Indicator.rotation.z = 3.85;
                        }
                        Indicator.rotation.z += 0.0105;
                    }
                    // 线圈上箭头移动
                    rotateAng -= 0.01;
                    if(rotateAng<=-Math.PI*2){
                        rotateAng=0;
                    }
                    for (var j in JT) {
                        JT[j].rotation.y = rotateAng;
                    }
                };
                renderAll();

                var resetA=()=>{
                    this.dragAble = true;
                    this.radio = '';
                    this.checked = false;
                    $('#buttom2').removeClass('nodrag');
                    camera.position.set(0, 8000, 20000);
                    camera.zoom = 1;
                    camera.updateProjectionMatrix();
                    this.top = false;
                    if (this.radio === 'three') {
                        this.TO.runLineHide();
                    } else {
                        this.TO.unimportanceHide();
                    }
                }

                var TO = () => {
                    return {
                        unimportanceHide,
                        unimportanceShow,
                        rotate,
                        CrossSection,
                        LongitudinalSectionShow,
                        LongitudinalSectionHide,
                        runLineHide,
                        step2,
                        reset1,
                        allRunHide,
                        resetA
                    }
                };
                return TO();
            },
            //画圆圈
            createYuan: function (r, val, color) {
                var dx, dy, vertices = [], color1;
                for (var i = 0; i < val; i+=2) {
                    dx = r * Math.cos(Math.PI / 180 * i);
                    dy = r * Math.sin(Math.PI / 180 * i);
                    vertices.push(this.vec3(dx, 0, dy));
                }
                if (color) {
                    color1 = color;
                } else {
                    color1 = '#5CAEFD';
                }
                var yuan = this.createLineMesh(vertices, color1, 3);
                return yuan;
            },
            //线条
            createLineMesh: function (vertices, color, style) {
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
                        linewidth: 2
                    }));
                }
                return lineMesh;
            },
            //圆环
            createTorus(radius, tube, color, arc) {
                var geometry = new THREE.TorusBufferGeometry(radius, tube, 16, 72, arc);
                var material = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide});
                var torus = new THREE.Mesh(geometry, material);
                return torus;
            },
            //创建圆柱或圆锥
            createCylinder(radiusTop, radiusBottom, height, color) {
                var geometry = new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, 9);
                var material = new THREE.MeshBasicMaterial({color: color});
                var cylinder = new THREE.Mesh(geometry, material);
                return cylinder;
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
                this.TO.resetA();
            }
        },
        mounted() {
            //禁止选择
            document.onselectstart = function () {
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

    .nodrag {
        opacity: 0.5;
    }
</style>
