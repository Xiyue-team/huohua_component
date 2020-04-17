<template>
<div id="app" class="noselect">
    <!--头部-->
    <ui-head :title="title.title">
        <ui-btn type="reset1" @click.native="reset" v-if="resetToggle"></ui-btn>
    </ui-head> <!--模型区域-->
    <div class="ViewSpace">
        <div :style="'zoom:'+zoomF" class="viewBox">
            <div class="viewList" v-if="toggle">
                <div class="first-box fl-box">
                    <div class="btn f-btn" @click="btnClick(1)">推论</div>
                    <span class="arrow t-arrow" :style="'background-image:url('+icon2Src+')'"></span>
                </div>
                <ul class="viewMenu">
                    <li> <div class="btn" @click="btnClick(2)">传递性</div></li>
                    <li class="icon icon1" :style="'background-image:url('+icon3Src+')'"></li>
                    <li class="text">线线</li>
                    <li class="line line1">
                        <div class="btn" @click="btnClick(3)">判定</div>
                        <span :style="'background-image:url('+icon5Src+')'"></span>
                        <div class="btn" @click="btnClick(4)">性质</div>
                    </li>
                    <li class="text">线面</li>
                    <li class="line line2">
                        <div class="btn" @click="btnClick(5)">判定</div>
                        <span :style="'background-image:url('+icon5Src+')'"></span>
                        <div class="btn" @click="btnClick(6)">推论</div>
                    </li>
                    <li class="text">面面</li>
                    <li class="icon icon2" :style="'background-image:url('+icon4Src+')'"></li>
                    <li> <div class="btn" @click="btnClick(7)">传递性</div></li>
                </ul>
                <div class="last-box fl-box">
                    <span class="arrow b-arrow" :style="'background-image:url('+icon1Src+')'"></span>
                    <div class="btn b-btn" @click="btnClick(8)">性质</div>
                </div>

            </div>

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
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
export default {
    name: 'app',
    components: {
        uiHead,
        uiBtn
    },
    data() {
        return {
            title: '直线、平面之间的平行位置关系',
            BtnSpaceStyle: 'flex',
            TO: null,
            playSrc: "static/img/play.png",
            backSrc: "static/img/back.png",
            icon1Src:"static/img/icon1.png",
            icon2Src:"static/img/icon2.png",
            icon3Src:"static/img/icon3.png",
            icon4Src:"static/img/icon4.png",
            icon5Src:"static/img/icon5.png",
            zoomF: window.innerWidth / (window.innerHeight - 76) >= 1024 / 545 ? (window.innerHeight - 76) / 545 : window.innerWidth / 1024,
            toggle: true,
            isShow: false,
            isPlay:true,
            resetToggle:false,
            leftArr: [
                {
                    title: '直线、平面之间的平行位置关系',
                },
                {
                    title: '线线平行推论',
                    text: "定理：<br/>一个平面内两条相交直线与另一个平面的两条相交平行，则这两个平面平行。",
                    src: "static/img/L1.png"
                },
                {
                    title: '平行线的传递性',
                    text: "定理：<br/>平行于同一条直线的两条直线互相平行。",
                    src: "static/img/L2.png"
                },
                {
                    title: '线面平行判定定理',
                    text: "定理：<br/>平面外一条直线与此平面内一条直线平行，则该直线与此平面平行。",
                    src: "static/img/L3.png"
                },
                {
                    title: '线面平行性质定理',
                    text: "定理：<br/>一条直线与一个平面平行，则过这条直线的任一平面与此平面的交线与该直线平行。",
                    src: "static/img/L4.png"
                },
                {
                    title: '面面平行判定定理',
                    text: "定理：<br/>一个平面内两条相交直线与另一个平面平行，则这两个平面平行。",
                    src: "static/img/L5.png"
                },
                {
                    title: '面面平行推论',
                    text: "定理：<br/>两个面互相平行，则一个平面内的任意一条直线都平行于另一个平面。",
                    src: "static/img/L6.png"
                },
                {
                    title: '平行面的传递性',
                    text: "定理：<br/>如果两个平面同时和第三个平面平行，那么这两个平面平行。",
                    src: "static/img/L7.png"
                },
                {
                    title: '面面平行性质定理 ',
                    text: "定理：<br/>如果两个平行平面同时和第三个平面相交，那么它们的交线平行。",
                    src: "static/img/L8.png"
                }

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
        this.TO = this.init();
        this.TO.createObj();
        this.title = this.leftArr[0];
    },
    methods: {
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
            }else if (val == 7) {
                this.index = 7;
                this.title = this.leftArr[this.index];
                this.text = this.leftArr[7].text;
                this.imgL(this.leftArr[7].src,(src)=>{
                    this.src = src;
                });
            }
            else if (val == 8) {
                this.index = 8;
                this.title = this.leftArr[this.index];
                this.text = this.leftArr[8].text;
                this.imgL(this.leftArr[8].src,(src)=>{
                    this.src = src;
                });
            }

        },
        //播放动画
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
            else if(this.index==6){
                this.TO.createObj6();
            }
            else if(this.index==7){
                this.TO.createObj7();
            }
            else{
                this.TO.createObj8();
            }


        },

        //图片预加载
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

        //重置函数
        reset() {
           this.TO.reset();
        },

        back(){
            this.TO.back();
        },


        //初始化
        init() {
            let scene, camera, renderer, mainWidth, mainHeight, controls;
            let timer1=null, timer2=null, timer3=null, timer4=null, timer5=null, timer6=null,timer7=null,timer8=null,timeNum =0;
            //创建场景
            let obj = new THREE.Group();
            let obj1 = new THREE.Group();
            let obj2 = new THREE.Group();
            let obj3 = new THREE.Group();
            let obj4 = new THREE.Group();
            let obj5 = new THREE.Group();
            let obj6 = new THREE.Group();
            let obj7 = new THREE.Group();
            let obj8 = new THREE.Group();
            let face= {
                1: [-200, 200, -200],
                2: [-200, 200, 200],
                3: [200, 200, -200],
                4: [200, 200, 200],
                5: [-200, -200, -200],
                6: [-200, -200, 200],
                7: [200, -200, -200],
                8: [200, -200, 200],
                //中间平面坐标点
                9:[-200,0,-200],
                10:[-200,0,200],
                11:[200,0,-200],
                12:[200,0,200]
            };
            let line= {
                1: [-201, 201, -201],
                2: [-201, 201, 201],
                3: [201, 201, -201],
                4: [201, 201, 201],
                5: [-201, -201, -201],
                6: [-201, -201, 201],
                7: [201, -201, -201],
                8: [201, -201, 201],
                9: [-201,201,0],
                10:[201,201,0],
                11:[-201,-201,0],
                12:[201,-201,0],
                13:[0,201,-201],
                14:[0,201,201],
                15:[0,-201,-201],
                16:[0,-201,201],
                //中间平面坐标点
                17:[-201,0,-201],
                18:[-201,0,201],
                19:[201,0,-201],
                20:[201,0,201]
            };
            let txt = {
                //obj1
                1: [0,245,0],  //文字P
                2: [0,-160,0,], //文字P1
                3: [-155,240,145],  //文字α
                4: [-150, -160, 160], //文字β
                5: [-200,170,-100], //obj4β
                6: [-100,235,-50], //obj5 文字b
                7: [-150, 35, 140],//obj7 文字α
                8: [215, -215, 215]
            };
            mainWidth = $('#renderCanvas').width();
            mainHeight = $('#renderCanvas').height();
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
            window.resolution=new THREE.Vector2(mainWidth, mainHeight);
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
                        resolution: resolution,
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
                        resolution: resolution,
                        transparent: true,
                        depthTest: false
                    });
                }else if (style == 4) {
                    matLine = new THREE.LineMaterial( {
                        color: color,
                        linewidth: width,
                        resolution: resolution,
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
            let createTextPoint =(n,font,o,color) =>{
                if(!color){
                    color="#000";
                }
                let vertices=[];
                vertices.push(vec3(txt[n][0],txt[n][1],txt[n][2]));
                let text=createText(vertices,font,180,color);
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
            let planMesh = (color,w,h) =>{
                let geometry,material,plane;
                if(!color){
                    color='#c6e7ff';
                }
                if(!w){
                    w=400;
                }
                if(!h){
                    h=400;
                }
                geometry = new THREE.PlaneGeometry( w, h, 8 );
                material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide,transparent: true} );
                plane = new THREE.Mesh( geometry, material );
                return plane;
            };
            //TODO  创建动画线条
            let countArr = [0,0,0,0,0,0,0,0];
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
            //TODO 画球
            let createBall = (color) => {
                if (!color) {
                    color = '#000';
                }
                let geometry,material,sphere;
                geometry = new THREE.SphereGeometry( 5, 9, 9 );
                material = new THREE.MeshBasicMaterial( {color: color,transparent:true,depthTest:false} );
                sphere = new THREE.Mesh( geometry, material );
                return sphere;
            };

            //线条变量
            let lineM1,lineM2,lineM3,lineM4,lineL,lineL1,linea,lineb;

            //文字变量
            let texta,textl,texta1,textl1,textl2,ballPoint,ballPoint1;
            let textGama;
            //中间线条
            let lineC1,lineC2,lineC3,lineC4;
            //虚线
            let lineDash1,lineDash2,lineDash3,lineDash4,lineDash5,lineDash6,lineDash7,lineDash8,lineDashA,lineDashB,lineDashC,lineDashD;
            let line1,line2,line3,line4,line5,line6,line7,line8,line9,line10,line11,line12;
            let objG = new THREE.Group();
            let upMesh,downMesh,downMesh2,skewMesh,middleMesh;
            //TODO  初始正方体
            let createObj = () => {
                if (obj != null) {
                    scene.remove(obj);
                }
                obj = new THREE.Group();
                //TODO 线条
                line1 = createLine(1, 2, 4);
                line2 = createLine(1, 3, 4);
                line3 = createLine(3, 4, 4);
                line4 = createLine(2, 4, 4);
                line5 = createLine(2, 6, 4);
                line6 = createLine(4, 8, 4);
                line7 = createLine(3, 7, 4);
                line8 = createLine(7, 8, 4);
                line9 = createLine(6, 8, 4);
                line10 = createLine(1, 5, 4);
                line11 = createLine(5, 6, 4);
                line12 = createLine(5, 7, 4);
                obj.add(line1, line2, line3, line4, line5, line6, line7, line8, line9, line10, line11, line12);
                scene.add(obj);
            };

            //TODO 线线平行推论
            let createObj1 = () =>{
                if (obj1 != null) {
                    scene.remove(obj1);
                }
                obj1 = new THREE.Group();
                //TODO 顶面对角线线条动画
                countArr=[0,0];
                let lineAn1 =() =>{
                    if(countArr[0] >= 60){
                        clearTimeout(timer1);
                        //TODO 构建文字P 贴图文字a l 圆点 虚线
                        createTextPoint(1,'P',obj1);
                        ballPoint =  createBall('#6D6EFF');
                        ballPoint.position.set(0, 201, 0);
                        textl = createImg(-100,220,-50,'static/img/textl.png');
                        texta = createImg(-35,220,100,'static/img/texta.png');
                        lineDash1 = createLine(1,5,2,'#828282');
                        lineDash2 = createLine(4,8,2,'#828282');
                        obj1.add(ballPoint,textl,texta,lineDash1,lineDash2);
                        //TODO 隐藏线条
                        line6.visible=false;
                        line10.visible=false;
                        timer1=null;
                        //TODO 底面线条l1动画
                        countArr=[0];
                        let lineAn2 =()=>{
                            if(countArr[0]>=60){
                                clearTimeout(timer1);
                                //TODO 构建文字l1 虚线
                                textl1 = createImg(-100,-170,-50, 'static/img/textL1.png');
                                lineDash3 = createLine(2,6,2,'#828282');
                                lineDash4 = createLine(3,7,2,'#828282');
                                obj1.add(textl1,lineDash3,lineDash4);
                                line5.visible=false;
                                line7.visible=false;
                                timer1=null;
                                //TODO 底面线条a1动画
                                countArr=[0];
                                let lineAn3 =()=>{
                                    if(countArr[0]>=60){
                                        clearTimeout(timer1);
                                        //TODO 构建文字P1 贴图文字a1 l1 圆点
                                        createTextPoint(2,'P₁',obj1);
                                        texta1 = createImg(-35,-180,100,'static/img/texta1.png');
                                        ballPoint1 =  createBall(5, '#6D6EFF');
                                        ballPoint1.position.set(0, -201, 0);
                                        obj1.add(texta1,ballPoint1);
                                        timer1=null;
                                        //TODO 构建上下面
                                        upMesh = planMesh('#ffd3d3');
                                        upMesh.position.set(0,201,0);
                                        upMesh.rotation.x = Math.PI / 2;
                                        upMesh.material.opacity=0.5;
                                        downMesh = planMesh('#ffd3d3');
                                        downMesh.position.set(0,-201,0);
                                        downMesh.rotation.x = Math.PI / 2;
                                        downMesh.material.opacity=0.5;
                                        obj1.add(upMesh,downMesh);
                                        //TODO 构建上下面铺展开动画
                                        let n=0;
                                        let meshAnimate =() =>{
                                            if(n>=1){
                                                clearTimeout(timer1);
                                                //TODO 构建文字 α β
                                                createTextPoint(3,'α',obj1);
                                                createTextPoint(4,'β',obj1);
                                                timer1=null;
                                                //TODO 面闪光动画
                                                timeNum=0;
                                                timer1 = setInterval(()=>{
                                                    if(timeNum>5){
                                                        clearInterval(timer1);
                                                        return;
                                                    }
                                                    timeNum++;
                                                    upMesh.visible=!upMesh.visible;
                                                    downMesh.visible=!downMesh.visible;
                                                },200);
                                                return;
                                            }
                                            n+=0.05;
                                            upMesh.scale.set(n,n,n);
                                            downMesh.scale.set(n,n,n);
                                            timer1 = setTimeout(meshAnimate,60);
                                        };
                                        meshAnimate();
                                        return;
                                    }
                                    obj1.remove(lineM4);
                                    lineM4 = createMoveLine(6, 7,3, '#e30000', 0, 60);
                                    timer1 = setTimeout(lineAn3,80);
                                    obj1.add(lineM4);
                                };
                                lineAn3();
                                return;
                            }
                            obj1.remove(lineM3);
                            lineM3 = createMoveLine(5, 8,3, '#0094ff', 0, 60);
                            timer1 = setTimeout(lineAn2,80);
                            obj1.add(lineM3);
                        };
                        lineAn2();
                        return;
                    }
                    obj1.remove(lineM1,lineM2);
                    lineM1 = createMoveLine(1, 4, 3, '#0094ff', 0, 60);
                    lineM2 = createMoveLine(3, 2, 3, '#e30000', 1, 60);
                    timer1 = setTimeout(lineAn1,80);
                    obj1.add(lineM1,lineM2);
                };
                lineAn1();

                scene.add(obj1);
            };

            //TODO 平行面的传递性
            let createObj2 = () =>{
                if (obj2 != null) {
                    scene.remove(obj2);
                }
                obj2 = new THREE.Group();
                //TODO 构建线条l 延长动画
                countArr=[0];
                let lineAn1 =() =>{
                    if(countArr[0]>=60){
                        clearTimeout(timer2);
                        //TODO 构建贴图文字l 隐藏线条
                        textl = createImg(-215,-170,-45, 'static/img/textl.png');
                        obj2.add(textl);
                        line5.visible=false;
                        line9.visible=false;
                        line10.visible=false;
                        line12.visible=false;
                        timer2=null;
                        //TODO 构建两对虚线 延长动画
                        countArr=[0,0,0,0];
                        let lineAn2 =() =>{
                          if(countArr[0]>=60){
                              clearTimeout(timer2);
                              //TODO 构建线条颜色 文字l1 l2
                              line1.material.color.set('#1500FF');
                              line8.material.color.set('#1500FF');
                              textl1 = createImg(-220,225,0, 'static/img/textl1.png');
                              textl2 = createImg(220,-200,0, 'static/img/textl2.png');
                              obj2.add(textl1,textl2);
                              timer2=null;
                              //TODO 构建线条l1到l2的延长动画
                              countArr=[0,0];
                              let lineAn3 =() =>{
                                if(countArr[0]>=60){
                                    clearTimeout(timer2);
                                    line1.material.color.set('#E30000');
                                    line8.material.color.set('#E30000');
                                    timer2=null;
                                    //TODO 构建线条闪光
                                    timeNum=0;
                                    timer2 = setInterval(()=>{
                                        if(timeNum>5){
                                            clearInterval(timer2);
                                            timer2=null;
                                            return;
                                        }
                                        timeNum++;
                                        line1.visible=!line1.visible;
                                        line8.visible=!line8.visible;
                                    },200);
                                    return;
                                }
                                obj2.remove(lineDash5,lineDash6);
                                lineDash5 = createMoveLine(1, 7, 2, '#E30000', 0, 60);
                                lineDash6 = createMoveLine(2, 8, 2, '#E30000', 1, 60);
                                timer2=setTimeout(lineAn3,80);
                                obj2.add(lineDash5,lineDash6);
                              };
                              lineAn3();
                              return;
                          }
                          obj2.remove(lineDash1,lineDash2,lineDash3,lineDash4);
                          lineDash1 = createMoveLine(5, 1, 2, '#828282', 0, 60);
                          lineDash2 = createMoveLine(6, 2, 2, '#828282', 1, 60);
                          lineDash3 = createMoveLine(5, 7, 2, '#828282', 2, 60);
                          lineDash4 = createMoveLine(6, 8, 2, '#828282', 3, 60);
                          timer2=setTimeout(lineAn2,80);
                          obj2.add(lineDash1,lineDash2,lineDash3,lineDash4);
                        };
                        lineAn2();
                        return;

                    }
                    lineL= createMoveLine(5, 6, 3,'#0094FF', 0, 60);
                    timer2=setTimeout(lineAn1,80);
                    obj2.add(lineL);
                };
                lineAn1();
                scene.add(obj2);
            };

            //TODO 线面平行判定定理
            let createObj3 = () =>{
                if (obj3 != null) {
                    scene.remove(obj3);
                }
                obj3 = new THREE.Group();
                //TODO 构建底面 文字
                downMesh=planMesh();
                downMesh.rotation.x = Math.PI / 2;
                downMesh.position.set(0,-201,0);
                downMesh.material.opacity=0.6;
                createTextPoint(4,'α',obj3);
                //TODO 构建线条a 延长线
                countArr =[0];
                let lineAn1 =() =>{
                  if(countArr[0] >=60){
                      clearTimeout(timer3);
                      //TODO 构建文字a 线条b
                      texta = createImg(0,220,0, 'static/img/texta.png');
                      lineb = createLine(9,10,4,'#e30000');
                      obj3.add(texta,lineb);
                      timer3=null;
                      //TODO 构建线条b落下动画
                      countArr =[0,0];
                      let n =0;
                      let lineAn2 =()=>{
                          if(countArr[0]>=60){
                              clearTimeout(timer3);
                              timer3=null;
                              //TODO 构建上下线条闪光动画
                              timeNum=0;
                              timer3 = setInterval(()=>{
                                  if(timeNum>5){
                                      clearInterval(timer3);
                                      //TODO 构建文字b
                                      createTextPoint(2,'b',obj3);
                                      downMesh2=planMesh('#ffd3d3');
                                      downMesh2.rotation.x = Math.PI / 2;
                                      downMesh2.position.set(0,-200,0);
                                      downMesh2.material.opacity=0.6;
                                      downMesh2.scale.set(1,0,1);
                                      obj3.add(downMesh2);
                                      timer3=null;
                                      //TODO 构建底面缩放动画
                                      n=0;
                                      let meshAn =() =>{
                                        if(n>=1){
                                            clearTimeout(timer3);
                                            downMesh2.scale.y=1;
                                            downMesh.visible=false;
                                            timer3=null;
                                            //TODO 构建线条a 底面闪光动画
                                            timeNum=0;
                                            timer3=setInterval(()=>{
                                                if(timeNum>3){
                                                    clearInterval(timer3);
                                                    return;
                                                }
                                                timeNum++;
                                                linea.visible=!linea.visible;
                                                downMesh2.visible=!downMesh2.visible;
                                            },150);
                                            return;
                                        }
                                        n+=0.1;
                                        downMesh2.scale.y=n;
                                        timer3 = setTimeout(meshAn,60);
                                      };
                                      meshAn();
                                      return;
                                  }
                                  timeNum++;
                                  linea.visible=!linea.visible;
                                  lineb.visible=!lineb.visible;
                              },100);

                              return;
                          }
                          n-=40;
                          lineb.position.y=n;
                          obj3.remove(lineDash1,lineDash2);
                          lineDash1 = createMoveLine(9, 11, 2,'#828282', 0, 60);
                          lineDash2 = createMoveLine(10, 12,2, '#828282', 1,60);
                          timer3 = setTimeout(lineAn2,80);
                          obj3.add(lineDash1,lineDash2);
                      };
                      lineAn2();
                      return;
                  }
                  obj3.remove(linea);
                  linea = createMoveLine(9, 10,3, '#e30000', 0,60);
                  timer3 = setTimeout(lineAn1,80);
                  obj3.add(linea);
                };
                lineAn1();
                obj3.add(downMesh);
                scene.add(obj3);
            };

            //TODO 线面平行性质定理
            let createObj4 =() =>{
                if(obj4 != null){
                    scene.remove(obj4);
                }
                let vertices;
                obj4 = new THREE.Group();
               //TODO 构建底面 文字阿尔法
                downMesh = planMesh('#ffd3d3');
                downMesh.rotation.x = Math.PI / 2;
                downMesh.position.y=-200;
                downMesh.material.opacity=0.6;
                createTextPoint(4,'α',obj4);
                obj4.add(downMesh);
                //TODO 构建线条l 延长动画
                countArr=[0];
                let lineAn =()=>{
                    if(countArr[0]>=60){
                        clearTimeout(timer4);
                        //TODO 构建贴图文字l 平面β
                        textl = createImg(-220,225,0, 'static/img/textl.png');
                        objG = new THREE.Group();
                        skewMesh = planMesh('#fee3b8',565,400);
                        skewMesh.rotation.x = Math.PI / 2;
                        skewMesh.rotation.y=-Math.PI / 4;
                        skewMesh.position.x = -200;
                        skewMesh.position.y = 200;
                        skewMesh.material.opacity=0.6;
                        objG.add(skewMesh);
                        obj4.add(textl,objG);
                        timer4=null;
                        //TODO 构建斜面β 延长动画
                        let n =0;
                        let meshAn =() =>{
                            if(n>=1){
                                clearTimeout(timer4);
                                skewMesh.scale.x=1;
                                //TODO 构建贴图文字l1 面文字β 线条l1
                                lineL1 = createLine(7,8,3,'#e30000');
                                createTextPoint(5,'β',obj4);
                                textl1 = createImg(235,-140,0,'static/img/textl1.png');
                                obj4.add(lineL1,textl1);
                                timer4=null;
                                //TODO 线条闪光动画
                                timeNum=0;
                                timer4=setInterval(()=>{
                                   if(timeNum>5){
                                       clearInterval(timer4);
                                       timer4=null;
                                       //TODO 构建面线移动动画
                                       n=0;
                                       let lineMeshAnimate =()=>{
                                           skewMesh.position.set(200,-200,0);
                                           objG.position.set(-200,200,0);
                                           lineL1.visible=false;
                                           textl1.visible=false;
                                           if(n>=400){
                                               clearTimeout(timer4);
                                               obj4.remove(lineL1);
                                               textl1.visible=true;
                                               lineL1 = createLine(5,6,3,'#e30000');
                                               obj4.add(lineL1);
                                               timer4=null;
                                               return;
                                           }
                                           n+=4;
                                           let ang = 45-45/402*n;
                                           vertices = [];
                                           let stepx=402-402*Math.tan(ang/180*Math.PI);
                                           vertices.push(201-stepx, -201, -201,201-stepx, -201, 201);
                                           lineL1=createLineMesh(vertices,'#e30000',3);
                                           //文字l1
                                           textl1 = createImg(235-stepx,-140,0, 'static/img/textl1.png');
                                           //平面旋转
                                           objG.rotation.z-= Math.PI /400;
                                           objG.scale.x=201/Math.cos(ang/180*Math.PI)/282.5;
                                           objG.scale.y=201/Math.cos(ang/180*Math.PI)/282.5;
                                           timer4 = setTimeout(lineMeshAnimate,30);
                                           obj4.add(lineL1,textl1);
                                       };
                                       lineMeshAnimate();
                                       return;
                                   }
                                   timeNum++;
                                   lineL.visible=!lineL.visible;
                                   lineL1.visible=!lineL1.visible;
                                },200);
                                return;
                            }
                            n+=0.01;
                            skewMesh.scale.x=n;
                            skewMesh.position.x += 2;
                            skewMesh.position.y -= 2;
                            timer4 = setTimeout(meshAn,20);
                        };
                        meshAn();
                        return;
                    }
                    obj4.remove(lineL);
                    lineL = createMoveLine(1,2,3,'#E30000',0,60);
                    timer4=setTimeout(lineAn,80);
                    obj4.add(lineL);
                };
                lineAn();
                scene.add(obj4);
            };

            //TODO 面面平行判定定理
            let createObj5 = () =>{
                if (obj5 != null) {
                    scene.remove(obj5);
                }
                obj5 = new THREE.Group();
                let vertices,op=0;
                //TODO 构建顶面
                upMesh = planMesh('#fee3b8');
                upMesh.rotation.x = Math.PI / 2;
                upMesh.position.y=200;
                obj5.add(upMesh);
                //TODO 构建顶面 β淡入动画
                op=0;
                let meshAn1=()=>{
                    if(op>=0.6){
                        clearTimeout(timer5);
                        //TODO 构建β面文字 底面
                        createTextPoint(3,'β',obj5);
                        downMesh=planMesh('#ffd3d3');
                        downMesh.rotation.x = Math.PI / 2;
                        downMesh.position.y=-200;
                        obj5.add(downMesh);
                        timer5=null;
                        //TODO 构建底面 α淡入动画
                        op=0;
                        let meshAn2 =()=>{
                            if(op>=0.6) {
                                clearTimeout(timer5);
                                //TODO 构建α面文字
                                createTextPoint(4,'α',obj5);
                                timer5 = null;
                                //TODO 构建线条a延长动画
                                countArr=[0];
                                let lineAn1=()=>{
                                    if(countArr[0]>=60) {
                                        clearTimeout(timer5);
                                        //TODO 构建文字a
                                        texta = createImg(-35,230,125, 'static/img/texta.png');
                                        line5.visible=false;
                                        line7.visible=false;
                                        obj5.add(texta);
                                        timer5=null;
                                        //TODO 构建线条a两侧虚线
                                        countArr=[0,0];
                                        let lineAn2 =()=>{
                                            if(countArr[0]>=60) {
                                                clearTimeout(timer5);
                                                timer5=null;
                                                //TODO 上下面 线条a闪光动画
                                                timeNum=0;
                                                timer5=setInterval(()=>{
                                                    if(timeNum>3){
                                                        clearInterval(timer5);
                                                        timer5=null;
                                                        //TODO 构建线条b延长动画
                                                        countArr=[0];
                                                        let lineAn3 =() =>{
                                                            if(countArr[0]>=60) {
                                                                clearTimeout(timer5);
                                                                //TODO 构建文字b,p,圆点P
                                                                createTextPoint(6,'b',obj5,'#1500FF');
                                                                createTextPoint(1,'P',obj5);
                                                                ballPoint =  createBall('#6D6EFF');
                                                                ballPoint.position.set(0, 201, 0);
                                                                obj5.add(ballPoint);
                                                                line6.visible=false;
                                                                line10.visible=false;
                                                                timer5 = null;
                                                                //TODO 构建线条b两侧虚线
                                                                countArr=[0,0];
                                                                let lineAn4=()=>{
                                                                    if(countArr[0]>=60) {
                                                                        clearTimeout(timer5);
                                                                        timer5 = null;
                                                                        //TODO 构建线条a与底面闪光动画
                                                                        timeNum=0;
                                                                        timer5=setInterval(()=>{
                                                                            if(timeNum>3){
                                                                                clearInterval(timer5);
                                                                                timer5=null;
                                                                                //TODO 构建上下面闪光动画
                                                                                timeNum=0;
                                                                                timer5=setInterval(()=>{
                                                                                    if(timeNum>5){
                                                                                        clearInterval(timer5);
                                                                                        upMesh.material.color.set('#ffd3d3');
                                                                                        timer5=null;
                                                                                        return;
                                                                                    }
                                                                                    timeNum++;
                                                                                    downMesh.visible=!downMesh.visible;
                                                                                    upMesh.visible=!upMesh.visible;
                                                                                },400);
                                                                                return;
                                                                            }
                                                                            timeNum++;
                                                                            lineb.visible=!lineb.visible;
                                                                            downMesh.visible=!downMesh.visible;
                                                                        },200);
                                                                        return;
                                                                    }
                                                                    obj5.remove(lineDash3,lineDash4);
                                                                    lineDash3 =createMoveLine(1, 5, 2,'#828282', 0,60);
                                                                    lineDash4 =createMoveLine(4, 8, 2,'#828282', 1,60);
                                                                    timer5 = setTimeout(lineAn4,80);
                                                                    obj5.add(lineDash3,lineDash4);
                                                                };
                                                                lineAn4();

                                                                return;
                                                            }
                                                            obj5.remove(lineb);
                                                            lineb = createMoveLine(1, 4, 4, '#7000d3', 0, 60);
                                                            timer5=setTimeout(lineAn3,80);
                                                            obj5.add(lineb);
                                                        };
                                                        lineAn3();
                                                        return;
                                                    }
                                                    timeNum++;
                                                    linea.visible=!linea.visible;
                                                    downMesh.visible=!downMesh.visible;
                                                    upMesh.visible=!upMesh.visible;
                                                },200);
                                                return;
                                            }
                                            obj5.remove(lineDash1,lineDash2);
                                            lineDash1 =createMoveLine(2, 6, 2,'#828282', 0, 60);
                                            lineDash2 =createMoveLine(3, 7, 2,'#828282', 1, 60);
                                            timer5 = setTimeout(lineAn2,80);
                                            obj5.add(lineDash1,lineDash2);
                                        };
                                        lineAn2();
                                        return;
                                    }
                                    obj5.remove(linea);
                                    linea = createMoveLine(2, 3, 4,'#e30000', 0, 60);
                                    timer5=setTimeout(lineAn1,80);
                                    obj5.add(linea);
                                };
                                lineAn1();
                                return;
                            }
                            op+=0.1;
                            downMesh.material.opacity=op;
                            timer5=setTimeout(meshAn2,100);
                        };
                        meshAn2();
                        return;
                    }
                    op+=0.1;
                    upMesh.material.opacity=op;
                    timer5=setTimeout(meshAn1,100);
                };
                meshAn1();
                scene.add(obj5);
            };

            //TODO 面面平行性质定理
            let createObj6 =() =>{
                if (obj6 != null) {
                    scene.remove(obj6);
                }
                let vertices,op=0;
                obj6 = new THREE.Group();
                objG = new THREE.Group();
                //TODO 构建顶面
                upMesh = planMesh('#FEE3B8');
                upMesh.rotation.x = Math.PI / 2;
                upMesh.position.y=200;
                obj6.add(upMesh);
                //TODO 顶面淡入动画
                op=0;
                let meshAn1 =()=>{
                    if(op>=0.6) {
                        clearTimeout(timer6);
                        //TODO 构建顶面文字α
                        createTextPoint(3,'α',obj6);
                        // //TODO 构建底面
                        downMesh = planMesh('#FEE3B8');
                        downMesh.rotation.x = Math.PI / 2;
                        downMesh.position.y=-200;
                        obj6.add(downMesh);
                        timer6=null;
                        //TODO 顶面淡入动画
                        op=0;
                        let meshAn2 =() =>{
                            if(op>=0.6) {
                                clearTimeout(timer6);
                                //TODO 构建底面文字β
                                createTextPoint(4,'β',obj6);
                                timer6 = null;
                                //TODO 构建线条l延长动画
                                countArr=[0];
                                let lineAn1 =()=>{
                                    if(countArr[0]>=60) {
                                        clearTimeout(timer6);
                                        textl = createImg(-25,230,0, 'static/img/textl.png');
                                        obj6.add(textl);
                                        timer6=null;
                                        //TODO 构建线条l两侧虚线延长动画
                                        countArr=[0,0];
                                        let lineAn2 =()=>{
                                            if(countArr[0]>=60){
                                                clearTimeout(timer6);
                                                //TODO 构建线条l1 贴图文字l1 底面
                                                lineL1 = createLine(15,16,3,'#E30000');
                                                textl1 = createImg(-25,-170,0, 'static/img/textl1.png');
                                                downMesh2=planMesh('#ffd3d3');
                                                downMesh2.rotation.x = Math.PI / 2;
                                                downMesh2.position.set(0,-199,0);
                                                downMesh2.material.opacity=0.6;
                                                objG.add(lineL1);
                                                obj6.add(textl1,downMesh2);
                                                timer6=null;
                                                //TODO 构建底面缩放动画
                                                let n =0;
                                                let meshAnimate =()=>{
                                                    if(n>=1){
                                                        clearTimeout(timer6);
                                                        obj6.remove(downMesh);
                                                        timer6=null;
                                                        //TODO 构建底面 线条l1闪光动画
                                                        timeNum=0;
                                                        timer6=setInterval(()=>{
                                                           if(timeNum>3){
                                                               clearInterval(timer6);
                                                               timer6=null;
                                                               //TODO 构建线条旋转动画
                                                               n=0;
                                                               let rotationAn=()=>{
                                                                   if(n>=360){
                                                                       clearTimeout(timer6);
                                                                       return;
                                                                   }
                                                                   n+=6;
                                                                   objG.rotation.y-=Math.PI/60;
                                                                   timer6=setTimeout(rotationAn,60);
                                                               };
                                                               rotationAn();
                                                               return;
                                                           }
                                                            timeNum++;
                                                            lineL1.visible=!lineL1.visible;
                                                            downMesh2.visible=!downMesh2.visible;

                                                        },150);
                                                        return;
                                                    }
                                                    n+=0.05;
                                                    downMesh2.scale.x=n;
                                                    timer6 = setTimeout(meshAnimate,60);

                                                };
                                                meshAnimate();
                                                return;
                                            }
                                            objG.remove(lineDash1,lineDash2);
                                            lineDash1 = createMoveLine(13, 15, 2,'#828282', 0,60);
                                            lineDash2 = createMoveLine(14, 16, 2,'#828282', 1,60);
                                            timer6 = setTimeout(lineAn2,80);
                                            objG.add(lineDash1,lineDash2);
                                        };
                                        lineAn2();
                                        return;
                                    }
                                    objG.remove(lineL);
                                    lineL = createMoveLine(13, 14, 4,'#e30000', 0, 60);
                                    timer6 = setTimeout(lineAn1,80);
                                    objG.add(lineL);
                                };
                                lineAn1();
                                return;
                            }
                            op+=0.1;
                            downMesh.material.opacity=op;
                            timer6 = setTimeout(meshAn2,100);
                        };
                        meshAn2();
                        return;
                    }
                    op+=0.1;
                    upMesh.material.opacity=op;
                    timer6 = setTimeout(meshAn1,100);
                };
                meshAn1();
                obj6.add(objG)
                scene.add(obj6);
            };

            //TODO 平行面的传递性
            let createObj7 =() =>{
                if (obj7 != null) {
                    scene.remove(obj7);
                }
                obj7 = new THREE.Group();
                let vertices,op=0;
                //TODO 构建中面
                middleMesh = planMesh('#E2F6CF');
                middleMesh.rotation.x = Math.PI / 2;
                //TODO 构建中面连线
                lineC1 = createLine(17, 18, 4);
                lineC2 = createLine(17, 19, 4);
                lineC3 = createLine(18, 20, 4);
                lineC4 = createLine(19, 20, 4);
                obj7.add(middleMesh,lineC1,lineC2,lineC3,lineC4);
                //TODO 构建中面淡入动画
                let meshAn =()=>{
                    if(op>=0.6){
                        clearTimeout(timer7);
                        //TODO 构建中面文字α
                        createTextPoint(7,'α',obj7);
                        //TODO 隐藏线条
                        line5.visible=false;
                        line6.visible=false;
                        line7.visible=false;
                        line10.visible=false;
                        timer7=null;
                        //TODO 构建沿中面点向上下线条延长动画
                        countArr = [0,0,0,0,0,0,0,0];
                        let lineAn1 =() =>{
                            if(countArr[0]>=60){
                                clearTimeout(timer7);
                                //TODO 构建上下面颜色
                                upMesh = planMesh('#f8e8be');
                                upMesh.rotation.x = Math.PI / 2;
                                upMesh.position.y=200;
                                upMesh.material.opacity=0.6;
                                downMesh = planMesh('#deebf7');
                                downMesh.rotation.x = Math.PI / 2;
                                downMesh.position.y=-200;
                                downMesh.material.opacity=0.6;
                                //TODO 构建上下面文字
                                createTextPoint(3,'β',obj7);
                                createTextPoint(4,'γ',obj7);
                                obj7.add(upMesh,downMesh);
                                lineDash1.visible=false;
                                lineDash2.visible=false;
                                lineDash3.visible=false;
                                lineDash4.visible=false;
                                lineDash5.visible=false;
                                lineDash6.visible=false;
                                lineDash7.visible=false;
                                lineDash8.visible=false;
                                timer7=null;
                                //TODO 构建红色虚线
                                countArr = [0,0,0,0];
                                let lineAn2 =()=>{
                                    if(countArr[0]>=60){
                                        clearTimeout(timer7);
                                        //TODO 构建上下底面颜色
                                        upMesh.material.color.set('#ffe5e5');
                                        downMesh.material.color.set('#ffe5e5');
                                        timer7=null;
                                        //TODO 构建上下面闪光动画
                                        timer7=setInterval(()=>{
                                            if(timeNum>3){
                                                clearInterval(timer7);
                                                return;
                                            }
                                            timeNum++;
                                            upMesh.visible=!upMesh.visible;
                                            downMesh.visible=!downMesh.visible;
                                        },300);
                                        return;
                                    }
                                    obj7.remove(lineDashA,lineDashB,lineDashC,lineDashD);
                                    lineDashA = createMoveLine(1,5,2,'#E30000',0,60);
                                    lineDashB = createMoveLine(2,6,2,'#E30000',1,60);
                                    lineDashC = createMoveLine(3,7,2,'#E30000',2,60);
                                    lineDashD = createMoveLine(4,8,2,'#E30000',3,60);
                                    timer7=setTimeout(lineAn2,80);
                                    obj7.add(lineDashA,lineDashB,lineDashC,lineDashD);
                                };
                                lineAn2();
                                return;
                            }
                            obj7.remove(lineDash1,lineDash2,lineDash3,lineDash4,lineDash5,lineDash6,lineDash7,lineDash8);
                            lineDash1 = createMoveLine(17,1,2,'#828282',0,60);
                            lineDash2 = createMoveLine(18,2,2,'#828282',1,60);
                            lineDash3 = createMoveLine(19,3,2,'#828282',2,60);
                            lineDash4 = createMoveLine(20,4,2,'#828282',3,60);
                            lineDash5 = createMoveLine(17,5,2,'#828282',4,60);
                            lineDash6 = createMoveLine(18,6,2,'#828282',5,60);
                            lineDash7 = createMoveLine(19,7,2,'#828282',6,60);
                            lineDash8 = createMoveLine(20,8,2,'#828282',7,60);
                            timer7 = setTimeout(lineAn1,80);
                            obj7.add(lineDash1,lineDash2,lineDash3,lineDash4,lineDash5,lineDash6,lineDash7,lineDash8);
                        };
                        lineAn1();
                        return;
                    }
                    op+=0.1;
                    middleMesh.material.opacity=op;
                    lineC1.material.opacity=op;
                    lineC2.material.opacity=op;
                    lineC3.material.opacity=op;
                    lineC4.material.opacity=op;
                    timer7=setTimeout(meshAn,100);
                };
                meshAn();
                scene.add(obj7);
            };

            //面面平行性质定理
            let createObj8 =() =>   {
                if (obj8 != null) {
                    scene.remove(obj8);
                }
                obj8 = new THREE.Group();
                let vertices,op=0;
                //TODO 构建顶面
                upMesh=planMesh('#f8e8be');
                upMesh.rotation.x = Math.PI / 2;
                upMesh.position.y=200;
                obj8.add(upMesh);
                //TODO 构建顶面淡入动画
                op=0;
                let meshAn1=()=>{
                    if(op>=0.6){
                        clearTimeout(timer8);
                        //TODO 构建顶面文字β
                        createTextPoint(3,'β',obj8);
                        //TODO 构建底面
                        downMesh = planMesh('#f8e8be');
                        downMesh.rotation.x = Math.PI / 2;
                        downMesh.position.y=-200;
                        obj8.add(downMesh);
                        timer8=null;
                        //TODO 构建底面淡入动画
                        op=0;
                        let meshAn2=()=>{
                            if(op>=0.6){
                                clearTimeout(timer8);
                                //TODO 构建底面文字α
                                createTextPoint(4,'α',obj8);
                                timer8=null;
                                //TODO 构建线条l延长动画
                                countArr=[0];
                                let lineAn =()=>{
                                    if(countArr[0]>=60) {
                                        clearTimeout(timer8);
                                        //TODO 构建贴图文字l
                                        textl = createImg(-210,235,0,'static/img/textl.png');
                                        //TODO 构建斜面γ 文字γ
                                        skewMesh = planMesh('#e2f6cf',565,400);
                                        skewMesh.material.opacity=0.65;
                                        skewMesh.rotation.x = Math.PI / 2;
                                        skewMesh.rotation.y=-Math.PI / 4;
                                        skewMesh.scale.x=0;
                                        skewMesh.position.x = -200;
                                        skewMesh.position.y = 200;
                                        vertices=[];
                                        vertices.push(vec3(-190,220,50));
                                        textGama = createText(vertices, 'γ', 180, '#000');
                                        textGama.scale.set(1/6,1/6,1/6);
                                        obj8.add(textl,skewMesh,textGama);
                                        timer8 = null;
                                        //TODO 构建斜面γ延伸动画
                                        let n=0;
                                        let meshAnimate=()=>{
                                            if(n>=1){
                                                clearTimeout(timer8);
                                                //TODO 构建线条l1 贴图文字l1
                                                lineL1 = createLine(7,8,3,'#E30000');
                                                textl1 = createImg(230,-180,0,'static/img/textl1.png');
                                                obj8.add(lineL1,textl1);
                                                timer8=null;
                                                //TODO 构建线条l l1 双闪动画
                                                timeNum = 0;
                                                timer8 = setInterval(()=>{
                                                    if(timeNum>3){
                                                        clearInterval(timer8);
                                                        timer8=null;
                                                        //TODO 构建线面移动动画
                                                        n=0;
                                                        let lineMeshAnimate=()=>{
                                                            if(textl !== null){
                                                                obj8.remove(textl);
                                                            }
                                                            if(textl1 !== null){
                                                                obj8.remove(textl1);
                                                            }
                                                            if(textGama !== null){
                                                                obj8.remove(textGama);
                                                            }
                                                            if(lineL !== null){
                                                                obj8.remove(lineL);
                                                            }
                                                            if(lineL1 !== null){
                                                                obj8.remove(lineL1);
                                                            }
                                                            if(n>=400){
                                                                clearTimeout(timer8);
                                                                obj8.remove(lineL,lineL1);
                                                                lineL = createLine(3,4,3,'#e30000');
                                                                lineL1 = createLine(5,6,3,'#e30000');
                                                                obj8.add(lineL,lineL1,textl,textl1,textGama);
                                                                return;
                                                            }
                                                            n+=4;
                                                            textl.position.x=(-210+n)+40;
                                                            textl1.position.x=(230-n)-60;
                                                            textGama.position.x=(190-n)+15;

                                                            vertices = [];
                                                            vertices.push(-201+n, 201, -201,-201+n, 201, 201);
                                                            lineL=createLineMesh(vertices,'#e30000',4);
                                                            vertices = [];
                                                            vertices.push(201-n, -201, -201,201-n, -201, 201);
                                                            lineL1=createLineMesh(vertices,'#e30000',3);
                                                            skewMesh.rotation.y-= Math.PI /200;
                                                            let ang;
                                                            if(n<200){
                                                                ang=45-45/200*n;
                                                                skewMesh.scale.x=200/Math.cos(ang/180*Math.PI)/282.5;
                                                            }else{
                                                                ang=45/200*(n-200);
                                                                skewMesh.scale.x=200/Math.cos(ang/180*Math.PI)/282.5;
                                                            }
                                                            obj8.add(textl,textl1,textGama,lineL,lineL1);
                                                            timer8=setTimeout(lineMeshAnimate,30);
                                                        };
                                                        lineMeshAnimate();
                                                        return;
                                                    }
                                                    timeNum++;
                                                    lineL.visible=!lineL.visible;
                                                    lineL1.visible=!lineL1.visible;
                                                },200);
                                                return;
                                            }
                                            n+=0.01;
                                            skewMesh.scale.x=n;
                                            skewMesh.position.x += 2;
                                            skewMesh.position.y -= 2;
                                            textGama.position.x +=3.5;
                                            textGama.position.y -=3.5;
                                            timer8 = setTimeout(meshAnimate,20);
                                        };
                                        meshAnimate();
                                        return;
                                    }
                                    obj8.remove(lineL);
                                    lineL = createMoveLine(1,2,3,'#E30000',0,60);
                                    timer8=setTimeout(lineAn,80);
                                    obj8.add(lineL);
                                };
                                lineAn();
                                return;
                            }
                            op+=0.1;
                            downMesh.material.opacity=op;
                            timer8=setTimeout(meshAn2,100);
                        };
                        meshAn2();
                        return;
                    }
                    op+=0.1;
                    upMesh.material.opacity=op;
                    timer8=setTimeout(meshAn1,100);
                };
                meshAn1();
                scene.add(obj8);
            };

            //重置
            let resetWidget = () => {
                this.isPlay=true;
                camera.position.set(200, 300, 1000);
                camera.zoom = 1;
                camera.updateProjectionMatrix();
                if(this.index==1){
                    line5.visible=true;
                    line6.visible=true;
                    line7.visible=true;
                    line10.visible=true;
                    clearInterval(timer1);
                    cancelAnimationFrame(timer1);
                    obj1.visible=false;
                }
                if(this.index==2){
                    line5.visible=true;
                    line9.visible=true;
                    line10.visible=true;
                    line12.visible=true;
                    line1.material.color.set('#000');
                    line8.material.color.set('#000');
                    clearInterval(timer2);
                    cancelAnimationFrame(timer2);
                    obj2.visible=false;
                }
                if(this.index==3){
                    clearInterval(timer3);
                    cancelAnimationFrame(timer3);
                    obj3.visible=false;
                }
                if(this.index==4){
                    clearInterval(timer4);
                    cancelAnimationFrame(timer4);
                    obj4.visible=false;
                }
                if(this.index==5){
                    clearInterval(timer5);
                    cancelAnimationFrame(timer5);
                    line5.visible=true;
                    line6.visible=true;
                    line7.visible=true;
                    line10.visible=true;
                    obj5.visible=false;
                }
                if(this.index==6){
                    clearInterval(timer6);
                    cancelAnimationFrame(timer6);
                    obj6.visible=false;
                }
                if(this.index==7){
                    clearInterval(timer7);
                    cancelAnimationFrame(timer7);
                    line5.visible=true;
                    line6.visible=true;
                    line7.visible=true;
                    line10.visible=true;
                    obj7.visible=false;
                }
                if(this.index==8){
                    clearInterval(timer8);
                    cancelAnimationFrame(timer8);
                    obj8.visible=false;
                }
            };
            //返回上一级
            let resetReturn = () =>{
                this.title = this.leftArr[0];
                this.toggle=true;
                this.isShow=false;
                this.resetToggle=false;
                this.text='';
                this.src='';
                $('canvas').hide();
                this.isPlay=true;
                camera.position.set(200, 300, 1000);
                camera.zoom = 1;
                camera.updateProjectionMatrix();
                if(this.index==1){
                    line5.visible=true;hh
                    line6.visible=true;
                    line7.visible=true;
                    line10.visible=true;
                    cancelAnimationFrame(timer1);
                    clearInterval(timer1);
                    obj1.visible=false;
                }
                if(this.index==2){
                    line5.visible=true;
                    line9.visible=true;
                    line10.visible=true;
                    line12.visible=true;
                    line1.material.color.set('#000');
                    line8.material.color.set('#000');
                    cancelAnimationFrame(timer2);
                    clearInterval(timer2);
                    obj2.visible=false;
                }
                if(this.index==3){
                    cancelAnimationFrame(timer3);
                    clearInterval(timer3);
                    obj3.visible=false;
                }
                if(this.index==4){
                    cancelAnimationFrame(timer4);
                    clearInterval(timer4);
                    obj4.visible=false;
                }
                if(this.index==5){
                    line5.visible=true;
                    line6.visible=true;
                    line7.visible=true;
                    line10.visible=true;
                    cancelAnimationFrame(timer5);
                    clearInterval(timer5);
                    obj5.visible=false;
                }
                if(this.index==6){
                    cancelAnimationFrame(timer6);
                    clearInterval(timer6);
                    obj6.visible=false;
                }
                if(this.index==7){
                    line5.visible=true;
                    line6.visible=true;
                    line7.visible=true;
                    line10.visible=true;
                    cancelAnimationFrame(timer7);
                    clearInterval(timer7);
                    obj7.visible=false;
                }
                if(this.index==8){
                    cancelAnimationFrame(timer8);
                    clearInterval(timer8);
                    obj8.visible=false;
                }
            };
            //渲染场景
            let renderAll = () => {
                controls.update();
                renderer.clear();
                renderer.render(scene, camera);
                requestAnimationFrame(renderAll);
                if(texta!=null){
                    texta.rotation.set(camera.rotation.x,camera.rotation.y,camera.rotation.z);
                }
                if(texta1!=null){
                    texta1.rotation.set(camera.rotation.x,camera.rotation.y,camera.rotation.z);
                }
                if(textl!=null){
                    textl.rotation.set(camera.rotation.x,camera.rotation.y,camera.rotation.z);
                }
                if(textl1!=null){
                    textl1.rotation.set(camera.rotation.x,camera.rotation.y,camera.rotation.z);
                }
                if(textl2!=null){
                    textl2.rotation.set(camera.rotation.x,camera.rotation.y,camera.rotation.z);
                }
            };
            renderAll();
            //回调函数
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
                    createObj7: createObj7,
                    createObj8: createObj8,
                }
            }
            return TO();
        },
        //计算区块大小
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
        //窗口大小更改
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
    /*background-color: #ccc;*/
}

.ViewSpace .viewBox {
    position: relative;
    width: 1024px;
    height: 545px;
    padding: 0;
}
.insp-wrapper {
    width: 100%;
    height: 100%;
}
.viewList{
    width: 100%;
    height: 100%;
    padding: 0 30px;
}
.viewMenu {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.viewList .first-box{
    margin-top: 50px;
}
.viewList .fl-box{
    width: 100%;
    text-align: center;
}
.viewList .fl-box div.btn {
    display: inline-block;
}
.viewList div.btn{
    width: 100px;
    height: 44px;
    margin: 0 auto;
    line-height: 44px;
    background: #FFFFFF;
    border: 0 solid rgba(0, 0, 0, 0.10);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    font-size: 16px;
    color: #000;
    text-align: center;
    cursor: pointer;
}
.viewList .arrow{
    display: block;
    margin: 0 auto;
    width: 556px;
    height: 70px;
    position: relative;
}
.viewList .t-arrow{
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-origin: content-box;
    top: 16px;
}
.viewList .b-arrow{
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-origin: content-box;
    bottom: 16px;
}

.viewList li.icon1 {
    width: 50px;
    height: 50px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-origin: content-box;
}
.viewList li.icon2 {
    width: 50px;
    height: 50px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-origin: content-box;
}
.viewList li.icon1{
    margin-left: 30px;
}
.viewList li.icon2{
    margin-right: 30px;
}
.viewList li.text {
    width: 100px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #000000;
    text-align: center;
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



.viewList li.line1 {
    margin-right: 30px;
    margin-left: 20px;
}
.viewList li.line2 {
    margin-left: 30px;
    margin-right: 20px;
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
    height: 110px;
}

.rightWrap {
    float: right;
    width: 73.5%;
    height: 100%;
    background: transparent;
}

canvas {
    width: 100%;
    height: 100%;
}

.bottomWrap {
    position: absolute;
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
</style>