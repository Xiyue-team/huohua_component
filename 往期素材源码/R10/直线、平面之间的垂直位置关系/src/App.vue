<template>
    <div id="app" class="noselect">
        <!--头部-->
        <ui-head :title="title.title">
            <ui-btn type="reset1" @click.native="reset" v-if="resetToggle"></ui-btn>
        </ui-head> <!--模型区域-->
        <div class="ViewSpace">
            <div :style="'zoom:'+zoomF" class="viewBox">
                <ul class="viewList" v-if="toggle">
                    <li>
                        <div @click="btnClick(1)">三垂线定理</div>
                        <div @click="btnClick(2)">三垂线逆定理</div>
                    </li>
                    <li class="icon" :style="'background-image:url('+icon3Src+')'"></li>
                    <li class="text">线线</li>
                    <li class="line">
                        <div @click="btnClick(3)">判定</div>
                        <span :style="'background-image:url('+icon5Src+')'"></span>
                        <div @click="btnClick(4)">性质</div>
                    </li>
                    <li class="text">线面</li>
                    <li class="line">
                        <div @click="btnClick(5)">判定</div>
                        <span :style="'background-image:url('+icon5Src+')'"></span>
                        <div @click="btnClick(6)">性质</div>
                    </li>
                    <li class="text" style="margin-right: 0;">面面</li>
                </ul>
                <div class="leftWrap" v-show='isShow'>
                    <p v-html="text"></p>
                    <img :src="src">
                </div>
                <div class="rightWrap" id="renderCanvas"></div>
                <div class='bottomWrap' v-show='isShow'>
                    <div class="play" :style="'background-image:url('+playSrc+')'" @click="play" v-if="isPlay"></div>
                    <div class="back" :style="'background-image:url('+backSrc+')'" @click="back"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import uiHead from '@/components/UI/uiHead'; //TODO 头部
    import uiBtn from '@/components/UI/uiBtn'; //TODO 按钮
    export default {
        name: 'app',
        components: {uiHead, uiBtn},
        data() {
            return {
                title: '直线、平面之间的垂直位置关系',
                BtnSpaceStyle: 'flex',
                TO: null,
                playSrc: "static/img/play.png",
                backSrc: "static/img/back.png",
                zoomF: window.innerWidth / (window.innerHeight - 76) >= 1024 / 545 ? (window.innerHeight - 76) / 545 : window.innerWidth / 1024,
                toggle: true,
                isShow: false,
                resetToggle:false,
                isPlay:true,
                resolution:'',
                icon3Src:"static/img/icon3.png",
                icon5Src:"static/img/icon5.png",
                leftArr: [
                    {
                        title: '直线、平面之间的垂直位置关系',
                    },
                    {
                        title: '三垂线定理',
                        text: "定理：<br/>平面内的一条直线，如果与穿过这个平面的一条斜线在这个平面上的射影垂直，那么它也和这条斜线垂直。",
                        src: "static/img/L1.png"
                    },
                    {
                        title: '三垂线逆定理',
                        text: "定理：<br/> 平面内的一条直线，如果与穿过这个平面的一条斜线垂直，那么它也和这条斜线在这个面的射影垂直。",
                        src: "static/img/L2.png"
                    },
                    {
                        title: '线面垂直判定定理   ',
                        text: "定理：<br/>一条直线与平面内两条相交直线都垂直，则该直线与此平面垂直。",
                        src: "static/img/L6.png"
                    },
                    {
                        title: '线面垂直性质定理  ',
                        text: "定理：<br/>一条直线垂直于一个平面，则该直线垂直于平面内的任意一条直线。",
                        src: "static/img/L5.png"
                    },
                    {
                        title: '面面垂直判定定理  ',
                        text: "定理：<br/>一个平面过另一个平面的垂线，则两个平面垂直。",
                        src: "static/img/L4.png"
                    },
                    {
                        title: '面面垂直性质定理 ',
                        text: "定理：<br/>如果两个平面垂直，则一个平面内垂直于交线的直线与另一个平面垂直。",
                        src: "static/img/L3.png"
                    },
                ],

                index: null,
                src:'',
                text:''
            }
        },
        created() {
            document.title = this.title;
        },
        mounted() {
                document.onselectstart = function () {
                    return false;
                };
                this.getViewSize();
                this.resize();
                this.loopInit();
                this.title = this.leftArr[0];
        },
        watch: {
        },

        methods: {
            loopInit() {
      if (!window.innerWidth || !window.innerHeight) {
        setTimeout(() => {
          this.loopInit();
        }, 250)
        return false;
      }
      this.TO = this.init();
      this.TO.createObj();
    },
            btnClick(val) {
                if (val == 1) {
                    this.index = 1;
                    this.title = this.leftArr[this.index];
                    this.text = this.leftArr[1].text;
                    this.imgL(this.leftArr[1].src,(src)=>{
                        this.src = src;
                    });

                } else if (val == 2) {
                    this.index = 2;
                    this.title = this.leftArr[this.index];
                    this.text = this.leftArr[2].text;
                    this.imgL(this.leftArr[2].src,(src)=>{
                        this.src = src;
                    });
                } else if (val == 3) {
                    this.index = 3;
                    this.title = this.leftArr[this.index];
                    this.text = this.leftArr[3].text;
                    this.imgL(this.leftArr[3].src,(src)=>{
                        this.src = src;
                    });
                } else if (val == 4) {
                    this.index = 4;
                    this.title = this.leftArr[this.index];
                    this.text = this.leftArr[4].text;
                    this.imgL(this.leftArr[4].src,(src)=>{
                        this.src = src;
                    });
                } else if (val == 5) {
                    this.index = 5;
                    this.title = this.leftArr[this.index];
                    this.text = this.leftArr[5].text;
                    this.imgL(this.leftArr[5].src,(src)=>{
                        this.src = src;
                    });
                } else if (val == 6) {
                    this.index = 6;
                    this.title = this.leftArr[this.index];
                    this.text = this.leftArr[6].text;
                    this.imgL(this.leftArr[6].src,(src)=>{
                        this.src = src;
                    });
                }
            },

            //TODO 播放动画
            play() {
                this.isPlay=false;
                if(this.index==1){
                    this.TO.createObj1();
                }
                else if(this.index==2){
                    this.TO.createObj2();
                }
                else if(this.index==3){
                    this.TO.createObj3();
                }
                else if(this.index==4){
                    this.TO.createObj4();
                }
                else if(this.index==5){
                    this.TO.createObj5();
                }
                else{
                    this.TO.createObj6();
                }

            },
            imgL(src, callback) {
                let img = new Image();
                img.src = src;
                img.onload = ()=> {
                    this.toggle = false;
                    this.isShow = true;
                    $('canvas').show();
                    this.resetToggle=true;
                    callback && callback(img.src);
                }
            },
            //TODO 重置函数
            reset() {
               this.TO.reset();
            },
            back(){
                this.TO.back();
            },
            //TODO 初始化
            init() {
                let scene, camera, renderer, mainWidth, mainHeight, controls;
                let timer1=null, timer2=null, timer3=null, timer4=null, timer5=null, timer6=null;
                let timeNum =0;
                //TODO 创建场景
                let obj = new THREE.Group();
                let obj1 = new THREE.Group();
                let obj2 = new THREE.Group();
                let obj3 = new THREE.Group();
                let obj4 = new THREE.Group();
                let obj5 = new THREE.Group();
                let obj6 = new THREE.Group();
                let face= {
                    1: [-200, 200, -200],
                        2: [-200, 200, 200],
                        3: [200, 200, -200],
                        4: [200, 200, 200],
                        5: [-200, -200, -200],
                        6: [-200, -200, 200],
                        7: [200, -200, -200],
                        8: [200, -200, 200]
                };
                let line= {
                    1: [-201, 201, -201],
                    2: [-201, 201, 201],
                    3: [201, 201, -201],
                    4: [201, 201, 201],
                    5: [-201, -201, -201],
                    6: [-201, -201, 201],
                    7: [201, -201, -201],
                    8: [201, -201, 201]
                };
                let txt = {
                    1: [-215, 215, -215],
                    2: [-215, 215, 215],
                    3: [215, 210, -215],
                    4: [215, 215, 215],
                    5: [-220,-180,-200],
                    6: [-215, -180, 215],
                    7: [215, -180, -215],
                    8: [215, -215, 215],
                    9:[-150, -160, 160],
                    10:[-200, 140, -140]
                };
                let peal= {
                    1: [0, 0, 30],
                    2: [30, 0, 30],
                    3: [30, 0, 0],
                    4: [-200, -180, -200],
                    5: [-180, -180, -200],
                    6: [-180, -200, -200],
                    7: [-180, -200, -200],
                    8: [-180, -200, -180],
                    9: [-200, -200, -180],
                    10: [-200, -180, -200],
                    11: [-200, -180, -180],
                    12: [-200, -202, -180]
                };
                mainWidth = $('#renderCanvas').width();
                mainHeight = $('#renderCanvas').height();
                console.log(mainWidth, mainHeight);
                scene = new THREE.Scene();
                camera = new THREE.OrthographicCamera(mainWidth / -1, mainWidth / 1, mainHeight / 1, mainHeight / -1, -100, 10000);
                camera.position.set(200, 300, 1000);
                camera.lookAt(new THREE.Vector3(3, 0, 0));
                scene.add(camera);
                //TODO 灯光
                let dirLight1 = new THREE.DirectionalLight(0xf0f0f0, 0.5);
                dirLight1.position.set(200, 200, 100);
                let dirLight2 = new THREE.DirectionalLight(0xf0f0f0, 0.5);
                dirLight2.position.set(-200, -200, -100);
                scene.add(dirLight1, dirLight2);
                let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.65);
                hemiLight.color.setHSL(0.6, 1, 0.6);
                hemiLight.groundColor.setHSL(0.095, 1, 0.75);
                hemiLight.position.set(0, 0, 0);
                scene.add(hemiLight);
                renderer = new THREE.WebGLRenderer({ antialias: true ,alpha:true});
                renderer.setPixelRatio(window.devicePixelRatio*this.zoomF);
                renderer.autoClear = false;
                renderer.setClearColor(0xffffff,0.0);
                renderer.setSize(mainWidth, mainHeight);
                controls = new THREE.OrbitControls(camera, renderer.domElement);
                controls.enableDamping = true;
                controls.dampingFactor = 0.25;
                controls.enableZoom = true;
                controls.enableRotate = true;
                controls.enablePan = false;
                $("#renderCanvas").append(renderer.domElement);
                $('canvas').hide();
                //TODO  坐标位置函数
                let vec3 = (x, y, z) => {
                    return new THREE.Vector3(x, y, z);
                };
                //TODO  线条函数
                this.resolution=new THREE.Vector2(mainWidth, mainHeight);
                let createLineMesh = (vertices, color, style, width) => {
                    if (!color) {
                        color = '#000';
                    }
                    if (!width) {
                        width = 1.4;
                    }
                    let lineMesh,matLine;
                    let geometry = new THREE.LineGeometry();
                    geometry.setPositions( vertices );
                    if (style == 2) {
                        matLine = new THREE.LineMaterial( {
                            color: color,
                            linewidth: width,
                            resolution: this.resolution,
                            dashed: false,
                            dashSize : 10,
                            gapSize :10,
                            dashScale:1,
                            depthTest: false,
                            transparent:true
                        } );
                        matLine.defines.USE_DASH = ""
                    } else if (style == 3) {
                        matLine = new THREE.LineMaterial( {
                            color: color,
                            linewidth: width,
                            resolution: this.resolution,
                            transparent: true,
                            depthTest: false
                        });
                    }else if (style == 4) {
                        matLine = new THREE.LineMaterial( {
                            color: color,
                            linewidth: width,
                            resolution: this.resolution,
                        });
                    }
                    lineMesh = new THREE.Line2( geometry, matLine );
                    lineMesh.computeLineDistances();
                    return lineMesh;
                };
                //TODO  调用线条函数
                let createLine = (n1, n2, type, color,width) => {
                    let lineO;
                    let vertices = [];
                    if(!color){
                        color = '#000';
                    }
                    if (!width) {
                        width = 2;
                    }
                    vertices.push(line[n1][0], line[n1][1], line[n1][2]);
                    vertices.push(line[n2][0], line[n2][1], line[n2][2]);
                    lineO = createLineMesh(vertices, color, type,width);
                    return lineO;
                };
                //TODO  文字函数
                let createText =(vertices,font,size,color) =>{
                    let SpriteText2D = THREE_Text.SpriteText2D;
                    let textAlign = THREE_Text.textAlign;
                    let textStyle = {
                        align: textAlign.center,
                        font: size + 'px "Cambria Math"',
                        fillStyle: color,
                        antialias: true,
                    };
                    let text = new SpriteText2D(font, textStyle);
                    text.position.x=vertices[0].x;
                    text.position.y=vertices[0].y;
                    text.position.z=vertices[0].z;
                    text.material.depthTest=false;
                    return text;
                };
                //TODO  调用文字函数
                let createTextPoint =(n,font,o) =>{
                    let vertices=[];
                    vertices.push(vec3(txt[n][0],txt[n][1],txt[n][2]));
                    let text=createText(vertices,font,180,'#000');
                    text.scale.set(1/6,1/6,1/6);
                    o.add(text);
                };
                //TODO  面函数
                let createTriangleFace = (vertices, color) => {
                    if (!color) {
                        color = '#E8FBFF';
                    }
                    let mesh1;
                    let material = new THREE.MeshBasicMaterial({
                        color: color,
                        transparent:true,
                        opacity:0.1,
                    });
                    let geom = new THREE.Geometry();
                    geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
                    geom.vertices = vertices;
                    mesh1 = new THREE.Mesh(geom, material);
                    return mesh1;
                };
                //TODO  调用面函数
                let createMesh =(n1,n2,n3,color) =>{
                    let vertices=[],mesh;
                    if(!color){
                        color='#E8FBFF';
                    }
                    vertices.push(vec3(face[n1][0],face[n1][1],face[n1][2]));
                    vertices.push(vec3(face[n2][0],face[n2][1],face[n2][2]));
                    vertices.push(vec3(face[n3][0],face[n3][1],face[n3][2]));
                    mesh=createTriangleFace(vertices,color);
                    return mesh;
                };
                //TODO  创建箭头
                let createArrow = () => {
                    let light = new THREE.Group();
                    let objLight = new THREE.Group();
                    let material = new THREE.MeshBasicMaterial({
                        color: '#FF5D00',
                        side: THREE.DoubleSide,
                        transparent: true,
                        opacity: 0
                    });
                    let cylinder1 = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 150, 36, 3), material);
                    cylinder1.rotation.x = Math.PI;
                    cylinder1.position.set(0, 500, 0);
                    let cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(8, 0, 20, 36, 3), material);
                    cylinder2.rotation.x = Math.PI * 2;
                    cylinder2.position.set(0, 420, 0);
                    light.add(cylinder1, cylinder2);
                    let light1 = light.clone();
                    light1.position.x = 120;
                    let light2 = light.clone();
                    light2.position.x = 240;
                    let light3 = light.clone();
                    light3.position.x = -120;
                    let light4 = light.clone();
                    light4.position.x = -240;
                    objLight.add(light, light1, light2, light3, light4);
                    return objLight;
                };
                //TODO  贴图函数
                let createImg = (x,y,z, src) => {
                    let PlaneG = new THREE.PlaneGeometry(288,288);

                    let PlaneM = new THREE.MeshBasicMaterial({
                        map: THREE.ImageUtils.loadTexture(src),
                        transparent: true,
                        overdraw: 0.2,
                        depthTest: false
                    });
                    let Plane = new THREE.Mesh(PlaneG, PlaneM);
                    Plane.position.x = x;
                    Plane.position.y = y;
                    Plane.position.z = z;
                    Plane.scale.set(1/6,1/6,1/6);
                    return Plane;
                };
                //TODO  创建面
                let planMesh = (color) =>{
                    let geometry,material,plane;
                    if(!color){
                        color='#c6e7ff';
                    }
                    geometry = new THREE.PlaneGeometry( 400, 400, 8 );
                    material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide,transparent: true} );
                    plane = new THREE.Mesh( geometry, material );
                    return plane;
                };
                //TODO  创建动画线条
                let countArr = [0,0,0,0];
                let createMoveLine = (n1, n2, type, color, index, count,width) => {
                    let lineO;
                    let x, y, z;
                    let vertices = [];
                    if (!width) {
                        width = 2;
                    }
                    x = (line[n1][0] - line[n2][0]) / count;
                    y = (line[n1][1] - line[n2][1]) / count;
                    z = (line[n1][2] - line[n2][2]) / count;
                    countArr[index] += 6;
                    vertices.push(line[n1][0], line[n1][1], line[n1][2]);
                    vertices.push(line[n1][0] - countArr[index] * x, line[n1][1] - countArr[index] * y, line[n1][2] - countArr[index] * z);
                    lineO = createLineMesh(vertices, color, type, width);
                    return lineO;
                };
                //TODO  构造垂足
                let createPedal = (n1, n2, n3, py, pr, color) => {
                    let p1, p2;
                    let vertices = [];
                    if (!color) {
                        color = '#000';
                    }
                    vertices.push(peal[n1][0], peal[n1][1], peal[n1][2]);
                    vertices.push(peal[n2][0], peal[n2][1], peal[n2][2]);
                    vertices.push(peal[n3][0], peal[n3][1], peal[n3][2]);
                    p1 = createLineMesh(vertices, color, 4);
                    p2 = new THREE.Group();
                    p2.add(p1);
                    p2.position.y = py;
                    p1.rotation.y = pr;
                    return p2;
                };

                //TODO  初始正方体
                let createObj = () => {
                    if (obj != null) {
                        scene.remove(obj);
                    }
                    obj = new THREE.Group();
                    //TODO 线条
                    let line1 = createLine(1, 2, 4);
                    let line2 = createLine(1, 3, 4);
                    let line3 = createLine(3, 4, 4);
                    let line4 = createLine(2, 4, 4);
                    let line5 = createLine(2, 6, 4);
                    let line6 = createLine(4, 8, 4);
                    let line7 = createLine(3, 7, 4);
                    let line8 = createLine(7, 8, 4);
                    let line9 = createLine(6, 8, 4);
                    let line10 = createLine(1, 5, 4);
                    let line11 = createLine(5, 6, 4);
                    let line12 = createLine(5, 7, 4);
                    obj.add(line1, line2, line3, line4, line5, line6, line7, line8, line9, line10, line11, line12);
                    scene.add(obj);
                };
                //TODO 面变量
                let mesh1,mesh3,downMesh;
                //TODO 线条变量
                let lineM1,lineM2,lineL,lineL1,lineOp,chuizu;
                //TODO 文字变量
                let  textβ,texta, textl,textl1, textl2,textp,lightOp;
                let objM = new THREE.Group();
                let chuizuG = new THREE.Group();
                let chuizuG1 = new THREE.Group();

                //TODO 三垂线定理
                let createObj1 = () =>{
                    if(obj1 != null){
                        scene.remove(obj1);
                    }
                    let vertices,op=0;
                    obj1 = new THREE.Group();

                    //TODO 构建下底面
                    downMesh = planMesh();
                    downMesh.rotation.x = Math.PI / 2;
                    downMesh.position.y=-200;
                    //TODO 底面淡入动画
                    op =0;
                    let meshAn =() =>{
                        if(op>=0.6){
                            clearTimeout(timer1);
                            createTextPoint(9,'α',obj1);
                            timer1 = null;
                            //TODO 下底对角线动画
                            countArr=[0,0];
                            let lineAn =() =>{
                                if(countArr[0] >= 60){
                                    clearTimeout(timer1);
                                    //TODO 构建文字
                                    createTextPoint(7,'A',obj1);
                                    createTextPoint(6,'O',obj1);
                                    chuizu = createPedal(1, 2, 3, -201, Math.PI / 4);
                                    textl = createImg(120, -170, 80 , 'static/img/textl.png');
                                    obj1.add(chuizu, textl);
                                    timer1 = null;
                                    //TODO 平行光束动画
                                    op =0;
                                    let lightAn =()=>{
                                        if (op>=1){
                                            clearTimeout(timer1);
                                            timer1 =null;
                                            lineM1.visible=false;
                                            let lineM3 = createLine(7,6,2,'#e30000');
                                            obj1.add(lineM3);
                                            //TODO 线条动画
                                            let n =0;
                                            let lineAnimate =()=>{
                                                if(lineOp !== null){
                                                    obj1.remove(lineOp);
                                                }
                                                if(textp !== null){
                                                    obj1.remove(textp);
                                                }

                                                if(n>=400){
                                                    clearTimeout(timer1);
                                                    obj1.remove(lineOp);
                                                    lineOp = createLine(3,6,4,'#e30000');
                                                    obj1.add(lineOp,textp);
                                                    return;
                                                }
                                                n+=10;
                                                vertices = [];
                                                vertices.push(-201,-201,201,201,-201+n,-201);
                                                lineOp=createLineMesh(vertices,'#e30000',4);
                                                vertices = [];
                                                vertices.push(vec3(220, -180 + n, -220));
                                                textp = createText(vertices, 'P', 180, '#000');
                                                textp.scale.set(1/6,1/6,1/6);
                                                timer1 = setTimeout(lineAnimate,60);
                                                obj1.add(lineOp, textp);
                                            };
                                            lineAnimate();
                                            return;
                                        }
                                        op+=0.1;
                                        lightOp = createArrow();
                                        for(let i in lightOp.children){
                                            lightOp.children[i].children[1].material.opacity=op;
                                        }
                                        timer1 = setTimeout(lightAn,100);
                                        obj1.add(lightOp);

                                    };
                                    lightAn();
                                    return;
                                }
                                obj1.remove(lineM1,lineM2);
                                lineM1 = createMoveLine(6, 7, 3, '#e30000', 0, 60);
                                lineM2 = createMoveLine(5, 8, 3, '#7000d3', 1, 60);
                                timer1 = setTimeout(lineAn,80);
                                obj1.add(lineM1,lineM2);
                            };
                            lineAn();
                            return;
                        }
                        op+=0.1;
                        downMesh.material.opacity=op;
                        timer1 = setTimeout(meshAn,100);
                    };
                    meshAn();
                    obj1.add(downMesh);
                    scene.add(obj1);
                };
                let lineOA;
                //TODO 三垂线逆定理
                let createObj2 = () =>{
                    if (obj2 != null) {
                        scene.remove(obj2);
                    }
                    let vertices,op=0;
                    obj2 = new THREE.Group();
                    //TODO 构建下底面
                    downMesh = planMesh();
                    downMesh.rotation.x = Math.PI / 2;
                    downMesh.position.y=-200;
                    //TODO 底面淡入动画
                    op =0;
                    let meshAn =() =>{
                        if(op>=0.6) {
                            clearTimeout(timer2);
                            createTextPoint(9,'α',obj2);
                            timer2 = null;
                            //TODO  对角线动画
                            countArr=[0,0];
                            let lineAn =() =>{
                                if(countArr[0] >= 60){
                                    clearTimeout(timer2);
                                    //TODO 构建文字
                                    vertices =[];
                                    vertices.push(vec3(215, 210, -215));
                                    textp = createText(vertices,'P',180,'#000');
                                    textp.scale.set(1/6,1/6,1/6);
                                    createTextPoint(6,'O',obj2);
                                    textl = createImg(120, -170, 80, 'static/img/textl.png');
                                    obj2.add(textl,textp);
                                    timer2 = null;
                                    //TODO 平行光束动画
                                    let lightAn =()=>{
                                        if (op>=1) {
                                            clearTimeout(timer2);
                                            timer2 = null;
                                            //TODO 虚线OA 文字A 垂足线
                                            lineOA = createLine(6,7,2,'#e30000');
                                            chuizu = createPedal(1, 2, 3, -201, Math.PI / 4);
                                            vertices =[];
                                            vertices.push(vec3(215, -180, -215));
                                            texta = createText(vertices,'A',180,'#000');
                                            texta.scale.set(1/6,1/6,1/6);
                                            //TODO 虚线OA 文字A 垂足线 淡入动画
                                            op =0;
                                            let lineAn2 =()=>{
                                                if(op>=1){
                                                    clearTimeout(timer2);
                                                    timer2 =null;
                                                    //TODO 线条向下移动动画
                                                    let n =0;
                                                    let lineAnimate =() =>{
                                                        lineM2.visible=false;
                                                        if (lineOp !== null) {
                                                            obj2.remove(lineOp);
                                                        }
                                                        if (textp !== null) {
                                                            obj2.remove(textp);
                                                        }
                                                        if(n>=400){
                                                            clearTimeout(timer2);
                                                            lineOA.visible=false;
                                                            textp.visible=false;
                                                            obj2.add(lineOp);
                                                            return;
                                                        }
                                                        n+=10;
                                                        vertices = [];
                                                        vertices.push(-200,-200,200,200,200-n,-200);
                                                        lineOp=createLineMesh(vertices,'#e30000',4);
                                                        vertices = [];
                                                        vertices.push(vec3(215, 210-n, -215));
                                                        textp = createText(vertices,'P',180,'#000');
                                                        textp.scale.set(1/6,1/6,1/6);
                                                        timer2 = setTimeout(lineAnimate,60);
                                                        obj2.add(lineOp, textp);
                                                    };
                                                    lineAnimate();
                                                    return;
                                                }
                                                op+=0.1;
                                                texta.material.opacity=op;
                                                lineOA.material.opacity=op;
                                                for(let i in chuizu.children){
                                                    chuizu.children[i].material.opacity=op;
                                                }
                                                timer2 = setTimeout(lineAn2,100);
                                                obj2.add(lineOA,chuizu,texta);
                                            };
                                            lineAn2();
                                            return;
                                        }
                                        op+=0.1;
                                        lightOp = createArrow();
                                        for(let i in lightOp.children){
                                            lightOp.children[i].children[1].material.opacity=op;
                                        }
                                        timer2 = setTimeout(lightAn,100);
                                        obj2.add(lightOp);
                                    };
                                    lightAn();
                                    return;
                                }
                                obj2.remove(lineM1,lineM2);
                                lineM1 = createMoveLine(5, 8, 3, '#7000d3', 0, 60);
                                lineM2 = createMoveLine(6, 3, 3, '#e30000', 1, 60);
                                timer2 = setTimeout(lineAn,80);
                                obj2.add(lineM1,lineM2);

                            };
                            lineAn();
                            
                            return;
                        }
                        op+=0.1;
                        downMesh.material.opacity=op;
                        timer2 = setTimeout(meshAn,100);
                    };
                    meshAn();
                    obj2.add(downMesh);
                    scene.add(obj2);
                };

                //TODO 线面垂直判定定理
                let createObj3 = () =>{
                   if(obj3 !=null){
                       scene.remove(obj3);
                   }
                   obj3 = new THREE.Group();
                   let vertices;
                   //TODO 文字阿尔法
                    createTextPoint(9,'α',obj3);
                    //TODO l1,l2线条动画
                    countArr =[0,0];
                    let lineAn =() =>{
                        if(countArr[0] >=60){
                            clearTimeout(timer3);
                            //TODO 构建文字
                            textl1 = createImg(-220, -175, -60, 'static/img/textl1.png');
                            textl2 = createImg(-20, -175, -215, 'static/img/textl2.png');
                            createTextPoint(5,'P',obj3);
                            obj3.add(textl1,textl2);
                            timer3 =null;
                            //TODO l线条动画
                            countArr=[0];
                            let lineAn2 =() =>{
                                if(countArr[0] >= 60){
                                    clearTimeout(timer3);
                                    //TODO 构建文字 l
                                    textl = createImg(-220, -175, 60, 'static/img/textl.png');
                                    obj3.add(textl);
                                    chuizuG1 = new THREE.Group();
                                    chuizu = createPedal(7, 8, 9, 0, -Math.PI * 2, '#7000d3');
                                    chuizu.position.set(200, 200, 200);
                                    chuizuG1.add(chuizu);
                                    chuizuG1.position.set(-200, -200, -200);
                                    timer3 = null;
                                    //TODO l 线段向上移动动画
                                    let n =0;
                                    let lineAnimate =()=>{
                                        if (lineL !== null) {
                                            obj3.remove(lineL);
                                        }
                                        if (textl !== null) {
                                            obj3.remove(textl);
                                        }
                                        if(n>=400){
                                            clearTimeout(timer3);
                                            lineL.visible=false;
                                            textl.visible=false;
                                            timer3=null;
                                            n=0;
                                            let lineAnimate2 =() =>{
                                                if (lineL !== null) {
                                                    obj3.remove(lineL);
                                                }
                                                if (textl !== null) {
                                                    obj3.remove(textl);
                                                }
                                                if(n>=400){
                                                    clearTimeout(timer3);
                                                    obj3.remove(lineL);
                                                    lineL = createLine(1,5,3,'#e30000');
                                                    let chuizu1 =createPedal(10, 11, 12, 1, Math.PI * 2, '#7000d3');
                                                    //TODO 创建下底面
                                                    let objG = new THREE.Group();
                                                    mesh1 = planMesh('#c6e7ff');
                                                    mesh1.rotation.x = Math.PI / 2;
                                                    mesh1.position.set(200,0,200);
                                                    mesh1.material.opacity=0.65;
                                                    objG.position.set(-200,-200,-200);
                                                    objG.add(mesh1);
                                                    obj3.add(lineL,textl,objG,chuizu1);
                                                    timer3=null;
                                                    //TODO 下底面铺开动画
                                                    n=0;
                                                    let meshAn =() =>{
                                                        if(n>=1){
                                                            clearTimeout(timer3);
                                                            mesh1.scale.set(1,1,1);
                                                            timer3=null;
                                                            //TODO 闪光效果
                                                            timeNum=0;
                                                            timer3=setInterval(()=>{
                                                               if(timeNum>5){
                                                                   clearInterval(timer3);
                                                                   return;
                                                               }
                                                               timeNum++;
                                                                lineL.visible=!lineL.visible;
                                                                mesh1.visible=!mesh1.visible;
                                                            },300);
                                                            return;
                                                        }
                                                        n+=0.05;
                                                        objG.scale.set(n,n,n);
                                                        timer3 = setTimeout(meshAn,60);
                                                    };
                                                    meshAn();
                                                    return;
                                                }
                                                n+=20;
                                                vertices = [];
                                                vertices.push(-200,-200,-200,-200,200,(200-n)-0.3);
                                                lineL=createLineMesh(vertices,'#ff5d00',3);
                                                textl = createImg(-220, 140, -n/2, 'static/img/textl.png');
                                                chuizuG1.rotation.x-= Math.PI / 80;
                                                obj3.add(lineL,textl,chuizuG1);
                                                timer3 = setTimeout(lineAnimate2,80);

                                            };
                                            lineAnimate2();
                                            return;
                                        }
                                        n+=20;
                                        vertices = [];
                                        vertices.push(-200,-200,-200,-200,-200+n,200);
                                        lineL=createLineMesh(vertices,'#ff5d00',3);
                                        textl = createImg(-220, -175+n, 60, 'static/img/textl.png');
                                        chuizuG1.rotation.x-= Math.PI / 80;
                                        obj3.add(lineL,textl,chuizuG1);
                                        timer3 = setTimeout(lineAnimate,80);
                                    };
                                    lineAnimate();
                                    return;
                                }
                                obj3.remove(lineL);
                                lineL = createMoveLine(6, 5,3, '#ff5d00', 0, 60);
                                timer3 = setTimeout(lineAn2,80);
                                obj3.add(lineL);
                            };
                            lineAn2();
                            return;
                        }
                        obj3.remove(lineM1,lineM2);
                        lineM1 = createMoveLine(6, 5,3, '#7000d3', 0, 60);
                        lineM2 = createMoveLine(7, 5,3, '#7000d3', 1, 60);
                        timer3 = setTimeout(lineAn,80);
                        obj3.add(lineM1, lineM2);
                    };
                    lineAn();
                    scene.add(obj3);
                };

                //TODO 线面垂直性质定理
                let createObj4 =() =>{
                    if(obj4 != null){
                        scene.remove(obj4);
                    }
                    obj4 = new THREE.Group();
                    let vertices ;
                    //TODO 创建 l 线条动画
                    countArr =[0];
                    let lineAn =() =>{
                        if(countArr[0] >= 60){
                            clearTimeout(timer4);
                            //TODO 贴图文字l 底面
                            textl = createImg(-220, 50, -200, 'static/img/textl.png');
                            downMesh = planMesh();
                            downMesh.rotation.x = Math.PI / 2;
                            downMesh.position.y=-200;
                            obj4.add(textl,downMesh);
                            timer4=null;
                            //TODO 底面淡入动画
                            let op =0;
                            let meshAn =()=>{
                                if(op>=0.6){
                                    clearTimeout(timer4);
                                    //TODO 构建文字 阿尔法
                                    createTextPoint(9,'α',obj4);
                                    timer4=null;
                                    //TODO 创建 l1 线条动画
                                    countArr=[0];
                                    let lineAn2 =() =>{
                                      if(countArr[0] >= 60){
                                         clearTimeout(timer4);
                                          //TODO 构建文字 l1 垂足
                                          textl1 = createImg(-200, -160, 0, 'static/img/textl1.png');
                                          chuizuG = new THREE.Group();
                                          chuizu = createPedal(10, 11, 12, 1, Math.PI * 2, '#7000d3');
                                          chuizu.position.set(200, 200, 200);
                                          chuizuG.add(chuizu);
                                          chuizuG.position.set(-200, -198, -200);
                                          obj4.add(chuizuG,textl1);
                                         timer4=null;
                                         //TODO  线条转动动画
                                          let n=0;
                                          let lineAnimate =() =>{
                                              if(lineL1 !== null){
                                                  obj4.remove(lineL1);
                                              }
                                              if(textl1 !== null){
                                                  obj4.remove(textl1);
                                              }
                                              if(chuizuG !== null){
                                                  obj4.remove(chuizuG);
                                              }
                                              if(n>=400){
                                                  clearTimeout(timer4);
                                                  lineL1.visible=false;
                                                  textl1.visible=false;
                                                  timer4=null;
                                                  n=0;
                                                  let lineAnimate2 =()=>{
                                                      if (lineL1 !== null) {
                                                          obj4.remove(lineL1);
                                                      }
                                                      if (textl1 !== null) {
                                                          obj4.remove(textl1);
                                                      }
                                                      if(n>=400){
                                                          clearTimeout(timer4);
                                                          obj4.remove(lineL1);
                                                          lineL1 = createLine(5,7,3,'#7000d3');
                                                          obj4.add(lineL1,textl1);
                                                          timer4=null;
                                                          return;
                                                      }
                                                      n+=20;
                                                      vertices = [];
                                                      vertices.push(-200,-199,-200,200, -199, 200-n);
                                                      lineL1 =createLineMesh(vertices,'#7000d3',3);
                                                      textl1 = createImg(0,-160,(100-n)/1.2, 'static/img/textl1.png');
                                                      chuizuG.rotation.y += Math.PI / 78;
                                                      obj4.add(lineL1,textl1,chuizuG);
                                                      timer4 = setTimeout(lineAnimate2,80);
                                                  };
                                                  lineAnimate2();
                                                  return;
                                              }
                                              n+=20;
                                              vertices = [];
                                              vertices.push(-200,-199,-200,-200+n,-199,200);
                                              lineL1 =createLineMesh(vertices,'#7000d3',3);
                                              textl1 = createImg(-200+(n/2), -160, n/4, 'static/img/textl1.png');
                                              chuizuG.rotation.y+= Math.PI / 78;
                                              timer4 = setTimeout(lineAnimate,80);
                                              obj4.add(lineL1,textl1,chuizuG);

                                          };
                                          lineAnimate();
                                         return;
                                      }
                                    obj4.remove(lineL1);
                                    lineL1 = createMoveLine(5, 6, 3, '#7000d3', 0, 60);
                                    timer4 = setTimeout(lineAn2,80);
                                    obj4.add(lineL1);
                                    };
                                    lineAn2();
                                    return;
                                }
                                op+=0.1;
                                downMesh.material.opacity=op;
                                timer4 = setTimeout(meshAn,100);
                            };
                            meshAn();
                            return;
                        }
                        obj4.remove(lineL);
                        lineL = createMoveLine(1, 5, 3, '#e30000', 0, 60);
                        timer4 = setTimeout(lineAn,80);
                        obj4.add(lineL);
                    };
                    lineAn();
                    scene.add(obj4);
                };

                //TODO 面面垂直判定定理
                let createObj5 = () =>{
                    if (obj5 != null) {
                        scene.remove(obj5);
                    }
                    obj5 = new THREE.Group();
                    let vertices,op=0;
                    //TODO 构建下底面
                    downMesh = planMesh();
                    downMesh.rotation.x = Math.PI / 2;
                    downMesh.position.y=-200;
                    //TODO 底面淡入动画
                    op =0;
                    let meshAn =() =>{
                        if(op>=0.6) {
                            clearTimeout(timer5);
                            createTextPoint(9, 'α', obj5);
                            timer5 = null;
                            //TODO 构建l线条动画
                            countArr=[0];
                            let lineAn =()=>{
                                if(countArr[0] >=60){
                                    clearTimeout(timer5);
                                    //TODO 构建文字l
                                    textl = createImg(-228,80,-200, 'static/img/textl.png');
                                    //TODO 创建β面 文字
                                    objM = new THREE.Group();
                                    mesh3 = planMesh('#fee3b8');
                                    mesh3.rotation.y = -Math.PI / 2;
                                    mesh3.position.set(0, 0, 200);
                                    objM.position.set(-201, 0, -201);
                                    vertices = [];
                                    vertices.push(vec3(0, -100, 300));
                                    textβ = createText(vertices, 'β', '180', '#000');
                                    textβ.scale.set(1/6,1/6,1/6);
                                    objM.add(mesh3,textβ);
                                    obj5.add(objM,textl);
                                    timer5 =null;
                                    //TODO 构建β面 文字淡入动画
                                    op =0;
                                    let meshAn2 =()=>{
                                        if(op>=0.6){
                                            clearTimeout(timer5);
                                            timer5=null;
                                            //TODO 构建β面 文字旋转动画
                                            let n=0;
                                            let meshAnimate =() =>{
                                                if(n>=400){
                                                    clearTimeout(timer5);
                                                    return;
                                                }
                                                n+=10;
                                                objM.rotation.y += Math.PI / 80;
                                                timer5 = setTimeout(meshAnimate,60);
                                            };
                                            meshAnimate();
                                            return;
                                        }
                                        op+=0.1;
                                        for(let i in objM.children){
                                            objM.children[i].material.opacity=op;
                                        }
                                        timer5=setTimeout(meshAn2,100);
                                    };
                                    meshAn2();
                                    return;
                                }
                                obj5.remove(lineL);
                                lineL = createMoveLine(1, 5, 3, '#e30000', 0, 60);
                                timer5 =  setTimeout(lineAn,80);
                                obj5.add(lineL);
                            };
                            lineAn();
                            return;
                        }
                        op+=0.1;
                        downMesh.material.opacity=op;
                        timer5 = setTimeout(meshAn,100);
                    };
                    meshAn();
                    obj5.add(downMesh);
                    scene.add(obj5);
                };
                let leftMesh;
                //TODO 面面垂直性质定理
                let createObj6 =() =>{
                    if (obj6 != null) {
                        scene.remove(obj6);
                    }
                    obj6 = new THREE.Group();
                    let vertices,op=0;
                    //TODO 构建下底面
                    downMesh = planMesh();
                    downMesh.rotation.x = Math.PI / 2;
                    downMesh.position.y=-200;
                    //TODO 底面淡入动画
                    op =0;
                    let meshAn1 =() =>{
                        if(op>0.6){
                            clearTimeout(timer6);
                            createTextPoint(9,'α',obj6);
                            //TODO 创建β面
                            leftMesh = planMesh('#fee3b8');
                            leftMesh.rotation.y = -Math.PI / 2;
                            leftMesh.position.set(-200, 0, 0);
                            obj6.add(leftMesh);
                            timer6=null;
                            //TODO 创建β面 文字
                            op=0;
                            let meshAn2 =()=>{
                                if(op>=0.6){
                                    clearTimeout(timer6);
                                    createTextPoint(10,'β',obj6);
                                    timer6=null;
                                    //TODO 构建 线条l 延长动画
                                    countArr=[0];
                                    let lineAn1=()=>{
                                        if(countArr[0] >=60){
                                            clearTimeout(timer6);
                                            //TODO  构建贴图文字l
                                            textl = createImg(-150, -150, 0, 'static/img/textl.png');
                                            obj6.add(textl);
                                            timer6=null;
                                            //TODO 构建 线条l1 延长动画
                                            countArr=[0,0];
                                            let lineAn2 =() =>{
                                              if(countArr[0]>=60){
                                                  clearTimeout(timer6);
                                                  //TODO  构建贴图文字l1  垂足
                                                  textl1 = createImg(-165, 140, -200, 'static/img/textl1.png');
                                                  chuizuG=new THREE.Group();
                                                  chuizu = createPedal(10, 11, 12, 1, Math.PI * 2, '#6f00d1');
                                                  chuizu.position.set(200, 200, 200);
                                                  chuizuG.add(chuizu);
                                                  chuizuG.position.set(-200, -198, -200);
                                                  obj6.add(textl1,chuizuG);
                                                  timer6=null;
                                                  //TODO 构建线条l1 移动动画
                                                  let n=0;
                                                  let lineAnimate =() =>{
                                                      if(lineL1 !== null){
                                                          obj6.remove(lineL1);
                                                      }
                                                      if(textl1 !== null){
                                                          obj6.remove(textl1);
                                                      }
                                                      if(n >=400){
                                                          clearTimeout(timer6);
//                                                          obj6.remove(lineL1,chuizuG);
                                                          lineL1.visible=false;
                                                          chuizuG.visible=false;
                                                          lineL1 = createLine(2,6,3,'#e30000');
                                                          chuizuG.rotation.y = -Math.PI;
                                                          chuizuG.position.x = -199;
                                                          chuizuG.visible=true;
                                                          obj6.add(lineL1);
                                                          return;
                                                      }
                                                      n+=10;
                                                      vertices = [];
                                                      vertices.push(-200,200,-200+n,-200,-200,-200+n);
                                                      lineL1=createLineMesh(vertices,'#e30000',3);
                                                      textl1 = createImg(-165, 140, -200+n, 'static/img/textl1.png');
                                                      chuizuG.position.z = -200 + n;
                                                      obj6.add(lineL1,textl1,chuizuG);
                                                      timer6 = setTimeout(lineAnimate,60);
                                                  };
                                                  lineAnimate();
                                                  return;
                                              }
                                                obj6.remove(lineL1);
                                                lineL1 = createMoveLine(1, 5,3, '#e30000', 0, 60);
                                                timer6 = setTimeout(lineAn2,80);
                                                obj6.add(lineL1);
                                            };
                                            lineAn2();
                                            return;
                                        }
                                        obj6.remove(lineL);
                                        lineL = createMoveLine(5, 6, 3, '#7000d3', 0, 60);
                                        timer6 = setTimeout(lineAn1,80);
                                        obj6.add(lineL);
                                    };
                                    lineAn1();
                                    return;
                                }
                                op+=0.1;
                                leftMesh.material.opacity=op;
                                timer6 = setTimeout(meshAn2,100);

                            };
                            meshAn2();
                            return;
                        }
                        op+=0.1;
                        downMesh.material.opacity=op;
                        timer6 = setTimeout(meshAn1,100);

                    };
                    meshAn1();
                    obj6.add(downMesh);
                    scene.add(obj6);
                };

                //TODO 重置
                let resetWidget = () => {
                    this.isPlay=true;
                    camera.position.set(200, 300, 1000);
                    camera.zoom = 1;
                    camera.updateProjectionMatrix();
                    if(this.index==1){
                        clearTimeout(timer1);
                        obj1.visible=false;
                    }
                    if(this.index==2){
                        clearTimeout(timer2);
                        obj2.visible=false;
                    }
                    if(this.index==3){
                        clearTimeout(timer3);
                        clearInterval(timer3);
                        timeNum=0;
                        obj3.visible=false;
                    }
                    if(this.index==4){
                        clearTimeout(timer4);
                        obj4.visible=false;
                    }
                    if(this.index==5){
                        clearTimeout(timer5);
                        obj5.visible=false;
                    }
                    if(this.index==6){
                        clearTimeout(timer6);
                        obj6.visible=false;
                    }

                };
                //TODO 返回上一级
                let resetReturn = () =>{
                    this.title = this.leftArr[0];
                    this.toggle=true;
                    this.isShow=false;
                    this.isPlay=true;
                    this.resetToggle=false;
                    $('canvas').hide();
                    this.text='';
                    this.src='';
                    camera.position.set(200, 300, 1000);
                    camera.zoom = 1;
                    camera.updateProjectionMatrix();
                    if(this.index==1){
                        clearTimeout(timer1);
                        obj1.visible=false;
                    }
                    if(this.index==2){
                        clearTimeout(timer2);
                        obj2.visible=false;
                    }
                    if(this.index==3){
                        clearTimeout(timer3);
                        clearInterval(timer3);
                        timeNum=0;
                        obj3.visible=false;
                    }
                    if(this.index==4){
                        clearTimeout(timer4);
                        obj4.visible=false;
                    }
                    if(this.index==5){
                        clearTimeout(timer5);
                        obj5.visible=false;
                    }
                    if(this.index==6){
                        clearTimeout(timer6);
                        obj6.visible=false;
                    }

                };
                //TODO 渲染场景
                let renderAll = () => {
                    controls.update();
                    renderer.clear();
                    renderer.render(scene, camera);
                    requestAnimationFrame(renderAll);
                    if(textl!=null){
                        textl.rotation.set(camera.rotation.x,camera.rotation.y,camera.rotation.z);
                    }
                    if(textl1!=null){
                        textl1.rotation.set(camera.rotation.x,camera.rotation.y,camera.rotation.z);
                    }
                    if(textl2!=null){
                        textl2.rotation.set(camera.rotation.x,camera.rotation.y,camera.rotation.z);
                    }
                }
                renderAll();
                //TODO 回调函数
                let TO = function () {
                    return {
                        reset: resetWidget,
                        back:resetReturn,
                        createObj: createObj,
                        createObj1: createObj1,
                        createObj2: createObj2,
                        createObj3: createObj3,
                        createObj4: createObj4,
                        createObj5: createObj5,
                        createObj6: createObj6,
                    }
                }
                return TO();
            },
            //TODO 计算区块大小
            getViewSize() {
                const W = window.innerWidth;
                const H = window.innerHeight - 76;
                if (W / H >= 1024 / 545) {
                    this.zoomF = H / 545
                } else {
                    this.zoomF = W / 1024
                }
                $('.ViewSpace').css({
                    '-moz-transform':'scale('+this.zoomF+')',
                    '-moz-transform-origin':'center'
                });
            },
            //TODO 窗口大小更改
            resize() {
                const vm = this;
                window.addEventListener('resize', function () {
                    vm.getViewSize();
                })
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
    body{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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

    /*内容区*/

    .ViewSpace {
        width: 100%;
        height: calc(100% - 76px);
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        padding: 26px 24px;
        -moz-transform:scale(1);
        -moz-transform-origin:top left;
        /*background-color: #ccc;*/
    }

    .ViewSpace .viewBox {
        position: relative;
        width: 1024px;
        height: 545px;
        /*-moz-transform:scale(0.5);*/
        /*padding: 26px 0;*/
        /*zoom:2; transform:scale(1);*/
    }

    .insp-wrapper {
        width: 100%;
        height: 100%;
    }

    .viewList {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .viewList li div {
        background: #FFFFFF;
        border: 0 solid rgba(0, 0, 0, 0.10);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
        border-radius: 6px;
        font-size: 16px;
        padding: 13px 30px;
        margin-bottom: 15px;
        color: #000;
        text-align: center;
        cursor: pointer;
    }

    .viewList li.icon {
        width: 50px;
        height: 50px;
        margin: 0 30px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-origin: content-box;
    }

    .viewList li.text {
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #000000;
        margin-right: 50px;
    }

    .viewList li.line {
        margin-right: 65px;
    }

    .viewList li.line a {
        margin-bottom: 0;
    }

    .viewList li.line span {
        display: block;
        width: 129px;
        height: 21px;
        margin: 8px 0;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-origin: content-box;
    }

    .showTime {
        width: 100%;
        height: 100%;
    }

    .leftWrap {
        width: 25%;
        height: 100%;
        float: left;
    }

    .leftWrap p {
        font-family: PingFangSC-Medium;
        font-size: 20px;
        margin-bottom: 33px;
        line-height: 32px;
        color: #000000;
    }

    .leftWrap img {
        width: 256px;
        height: 88px;
    }

    .rightWrap {
        float: right;
        width: 73.5%;
        height: 100%;
        background: transparent;
    }

     .rightWrap canvas {
        width: 100%!important;
        height: 100%!important;
    }

    .bottomWrap {
        position: fixed;
        right: 0;
        bottom: 0;
    }

    .bottomWrap div {
        width: 60px;
        height: 60px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-origin: content-box;
        margin-bottom: 24px;
        cursor: pointer;
    }
    @media (max-width: 800px){
        .bottomWrap>div{
            position: relative;
            bottom: 120px;
            right: 30px;
        }
    }
</style>