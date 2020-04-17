<template>
  <div id="app" class="noselect">
    <!--头部-->
    <ui-head :title="title">
      <ui-btn type="reset1" @click.native="reset"></ui-btn>
    </ui-head>
    <!--模型区域-->
    <div class="ViewSpace">
      <div :style="'zoom:'+zoomF" class="viewBox">
          <div class="leftWrap"><img :src="img1" ondragstart="return false;"></div>
          <div class="rightWrap" id="renderCanvas">
            <div class="showImg" @click='showCanvas' v-show='isShow'>
                <img :src="img2" ondragstart="return false;">
            </div>
          
          </div>
          <div class="bottomWrap">
            <ui-slider
                :value=value
                :zoom="zoomF"
                :boxWidth="580"
                :dragable="dragToggle"
                :clickable="false"
                :boxHeight="53"
                :title="false"
                @callback='choose'
                :piecewise="true"
                :piecewiseLabel="false"
                :tooltip="false"
                :noBlueProcess="true"
                :data="['0','1','2']"
                v-model="value"
                v-if='slideShow'>
            </ui-slider>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
    import uiHead from '@/components/UI/uiHead';//头部
    import uiBtn from '@/components/UI/uiBtn';//按钮
    import uiSlider from '@/components/UI/uiSlider';//滑块
    export default {
        name: 'app',
        components: {uiHead,uiBtn,uiSlider},
        data(){
            return{
                title:'正四面体外接球半径补图法',
                BtnSpaceStyle: 'flex',
                TODO: null,
                img1:'static/img/sub-1.png',
                img2:'static/img/start.png',
                isShow:true,
                zoomF:window.innerWidth/(window.innerHeight - 76)>=1024/545?(window.innerHeight - 76)/545:window.innerWidth/1024,
                value:"0",
                slideShow:false,
                dragToggle:true
            }
        },
        created() {
            document.title = this.title;
        },
        mounted(){
            document.onselectstart = function() {
                return false;
            };
            this.getViewSize();
            this.resize();
            this.TODO = this.init();
            this.TODO.createObj();
        },
        watch: {
            value(val){
                if(val==0){
                    this.TODO.createObj();
                }else if(val==1){
                    this.TODO.createObj1();
                }else{
                    this.TODO.createObj2();
                }
            }
        },

        methods: {
            //图片预加载
            imgL(src, callback) {
                var img = new Image();
                img.src = src;
                img.onload = function () {
                    callback && callback(img.src);
                }
            },
            //滑动条
            choose(val){
                 if(val==0){
                    this.imgL("static/img/sub-2.png",(src)=>{
                        this.img1=src;
                    });
                }else if(val==1){
                    this.imgL("static/img/sub-3.png",(src)=>{
                        this.img1=src;
                    });
                }else{
                    this.imgL("static/img/sub-4.png",(src)=>{
                        this.img1=src;
                    });
                }   

            },
            //重置函数
            reset() {
                this.TODO.reset();
            },
            //显示canvas      
            showCanvas() {
                this.TODO.showCanvas();
            },

            //初始化
            init() {
                let scene, camera,renderer,mainWidth,mainHeight,controls;
                let timer=null,SET=null,text2a;
                let face = {
                    1:[-200,-200,200],
                    2:[200,-200,200],
                    3:[200,-200,-200],
                    4:[-200,-200,-200],
                    5:[-200,200,-200],
                    6:[-200,200,200],
                    7:[200,200,200],
                    8:[200,200,-200]
                };
                let line = {
                    1:[-200.5,-200.5,200.5],    //D
                    2:[200.5,-200.5,200.5],
                    3:[200.5,-200.5,-200.5],    //C
                    4:[-200.5,-200.5,-200.5],
                    5:[-200.5,200.5,-200.5],    //A
                    6:[-200.5,200.5,200.5],     //E
                    7:[200.5,200.5,200.5],      //B
                    8:[200.5,200.5,-200.5],
                    9:[0,0,0]                   //O

                };
                let txt ={
                    1:[-215,-215,215],
                    2:[215,-215,215],
                    3:[215,-215,-215],
                    4:[-215,-215,-215],
                    5:[-215,220,-215],
                    6:[-215,215,215],
                    7:[215,240,215],
                    8:[215,215,-215],
                    9:[15,15,15]
                };
                //四面体连线
                let obj = new THREE.Group();
                let obj1 = new THREE.Group();
                let obj2 = new THREE.Group();
                //创建场景
                mainWidth = $('#renderCanvas').width();
                mainHeight = $('#renderCanvas').height();
                scene = new THREE.Scene();
                camera = new THREE.OrthographicCamera(mainWidth/-1,mainWidth/1,mainHeight/1,mainHeight/-1,-100,10000);
                camera.position.set(1091,370,-327);
                camera.lookAt(new THREE.Vector3(0,0,0));
                scene.add(camera);
                //灯光
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
                //坐标位置函数
                let vec3 = (x, y, z) => {
                    return new THREE.Vector3(x, y, z);
                };
                //线条函数
                window.resolution=new THREE.Vector2(mainWidth, mainHeight);
                let createLineMesh = (vertices, color, style, width) => {
                    if (!color) {
                        color = '#000';
                    }
                    if (!width) {
                        width = 1.2;
                    }
                    var lineMesh,matLine;
                    var geometry = new THREE.LineGeometry();
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
                //画球
                let createBall = (radius, slip, color, opacity) => {
                    if (!color) {
                        color = '#000';
                    }
                    if (!opacity) {
                        opacity = 1;
                    }
                    let geometry = new THREE.SphereGeometry(radius, slip, slip);
                    let material = new THREE.MeshPhongMaterial({
                        color: color,
                        transparent: true,
                        opacity: opacity,
                        depthTest: false
                    });
                    let sphere = new THREE.Mesh(geometry, material);
                    return sphere;
                }
                //文字
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
                //mian
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
                //构造线
                let createLine = (n1, n2, type, color) => {
                    let lineO;
                    let vertices = [];
                    if(!color){
                        color = '#000';
                    }
                    vertices.push(line[n1][0], line[n1][1], line[n1][2]);
                    vertices.push(line[n2][0], line[n2][1], line[n2][2]);
                    lineO = createLineMesh(vertices, color, type);
                    return lineO;
                };
                let createImg = (x,y,z, w, h, src) => {
                    let PlaneG = new THREE.PlaneGeometry(w, h);
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
                    return Plane;
                };
                //构造面
                let createMesh =(n1,n2,n3,o,color) =>{
                    let vertices=[],mesh;
                    vertices.push(vec3(face[n1][0],face[n1][1],face[n1][2]));
                    vertices.push(vec3(face[n2][0],face[n2][1],face[n2][2]));
                    vertices.push(vec3(face[n3][0],face[n3][1],face[n3][2]));
                    mesh=createTriangleFace(vertices,color);
                    o.add(mesh)
                };
                //构造文字
                let createTextPoint =(n,font,o) =>{
                    let vertices=[];
                    vertices.push(vec3(txt[n][0],txt[n][1],txt[n][2]));
                    let text=createText(vertices,font,30,'#000');
                    o.add(text);
                };
                //初始正四面体
                let createObj =() =>{
                    if(obj != null){scene.remove(obj);}
                    obj = new THREE.Group();
                    //构建线条
                    let line1=createLine(1,3,4,'#E30000');
                    let line2=createLine(1,5,4,'#E30000');
                    let line3=createLine(1,7,4,'#E30000');
                    let line4=createLine(3,5,4,'#E30000');
                    let line5=createLine(3,7,4,'#E30000');
                    let line6=createLine(5,7,4,'#E30000');
                    //构建文字
                    createTextPoint(5,'A',obj);
                    createTextPoint(7,'B',obj);
                    createTextPoint(3,'C',obj);
                    createTextPoint(1,'D',obj);
                    //构建面
                    createMesh(1,5,7,obj,'#E30000');
                    createMesh(3,5,7,obj,'#E30000');
                    createMesh(1,3,5,obj,'#E30000');
                    createMesh(1,3,7,obj,'#E30000');
                    obj.add(line1,line2,line3,line4,line5,line6);
                    scene.add(obj);
                    obj1.visible=false;
                    obj2.visible=false;
                };
                let createObj1 =() =>{
                    if(obj1 != null){scene.remove(obj1);}
                    obj1 = new THREE.Group();
                    //构建线
                    let lineA = createLine(5,6,2);
                    let lineB = createLine(5,8,2);
                    let lineC = createLine(7,8,2);
                    let lineD = createLine(6,7,2);
                    let lineE = createLine(2,7,2);
                    let lineF = createLine(1,2,2);
                    let lineG = createLine(1,6,2);
                    let lineH = createLine(1,4,2);
                    let lineI = createLine(2,3,2);
                    let lineJ = createLine(3,4,2);
                    let lineK = createLine(4,5,2);
                    let lineL = createLine(3,8,2);

                    //构建面
                    createMesh(5,6,7,obj1,'#000');
                    createMesh(5,7,8,obj1,'#000');
                    createMesh(1,6,7,obj1,'#000');
                    createMesh(1,2,7,obj1,'#000');
                    createMesh(1,5,6,obj1,'#000');
                    createMesh(1,4,5,obj1,'#000');
                    createMesh(3,7,8,obj1,'#000');
                    createMesh(2,3,7,obj1,'#000');
                    createMesh(1,2,3,obj1,'#000');
                    createMesh(1,3,4,obj1,'#000');
                    createMesh(3,4,5,obj1,'#000');
                    createMesh(3,5,8,obj1,'#000');
                    obj1.add(lineA,lineB, lineC, lineD, lineE, lineF, lineG, lineH, lineI, lineJ, lineK, lineL);
                    scene.add(obj1);
                    obj2.visible=false;
                };

                let createObj2 =() => {
                    if(obj2 != null){scene.remove(obj2);}
                    obj2 = new THREE.Group();
                    this.dragToggle=false;
                    let vertices =[];
                    //构建球心文字
                    let pointO = createBall(5,9);
                    pointO.position.set(0,0,0);
                    createTextPoint(9, 'O', obj2);
                    let step = 0;
                    let objBall  = createBall(Math.hypot(348), 64, '#fff', 0.5);
                    clearTimeout(SET);
                    SET = setTimeout(()=>{
                        let an =() =>{
                            if (step >= 1) {
                                cancelAnimationFrame(timer);
                                this.dragToggle=true;
                                //构建参数文字
                                createTextPoint(6, 'E', obj2);
                                vertices = [];
                                vertices.push(vec3(60.25, -60.25, -100.25));
                                let textR = createText(vertices, 'R', 30, '#0094FF');
                                vertices = [];
                                vertices.push(vec3(0, 240, 0));
                                let texta = createText(vertices, 'a', 30, '#E30000');
                                text2a = createImg(-200.5, 240.5, 0, 85, 85, 'static/img/Slice.png');
                                //构建线条CE
                                let lineCE = createLine(3, 6,4, '#0094FF');
                                obj2.add(textR,texta,text2a,lineCE);
                                return;
                            }
                            step += 0.06;
                            objBall.scale.x = step;
                            objBall.scale.y = step;
                            objBall.scale.z = step;
                            timer = requestAnimationFrame(an);
                            obj2.add(objBall);
                        };
                        an();
                    },500);
                    obj2.add(pointO);
                    scene.add(obj2);
                };
                //右侧图片点击隐藏-canvas显示
                let showCanvas = () =>{
                     $('.showImg').hide();
                     $('canvas').show();
                     this.slideShow=!this.slideShow;
                     this.imgL("static/img/sub-2.png",()=>{
                        this.img1='static/img/sub-2.png';
                     });
                    
                };

                //重置
                let resetWidget = () => {
                    cancelAnimationFrame(timer);
                    clearTimeout(SET);
                     $('.showImg').show();
                     $('canvas').hide();
                     this.slideShow=false;
                     this.dragToggle=true;
                     this.value = "0";
                     this.imgL("static/img/sub-1.png",(src)=>{
                        this.img1=src;
                     });
                      createObj();
                      camera.position.set(1091,370,-327);
                      camera.zoom=1;
                      camera.updateProjectionMatrix();
               
                };

                //渲染场景
                let renderAll=()=>{
                    controls.update();
                    renderer.clear();
                    renderer.render(scene, camera);
                    requestAnimationFrame(renderAll);
                    if(text2a!=null){
                        text2a.rotation.set(camera.rotation.x,camera.rotation.y,camera.rotation.z);
                    }

                }
                renderAll();
                //回调函数
                let TODO = function() {
                    return {
                        reset: resetWidget,
                        showCanvas: showCanvas,
                        createObj:createObj,
                        createObj1:createObj1,
                        createObj2:createObj2
                    }
                }
                return TODO();
            },

            //计算区块大小
            getViewSize() {
                const W = window.innerWidth;
                const H = window.innerHeight - 76;
                if (W/H >= 1024/545) {
                    this.zoomF= H/545
                } else {
                    this.zoomF=W/1024
                }
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
  *{
    margin: 0;
    padding: 0;
  }
  li{
    list-style: none;
  }
 
  input,button{
    outline: none;
    -webkit-appearance: none;
    border-radius: 0;
  }
  canvas{
    outline: none;
  }
  /*盒模型，padding尺寸不用再减去*/
  *,
  *:before,
  *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
  }
  html,body,#app{
    width:100%;
    height: 100%;
    overflow: hidden;
    font-family: "PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif;
    background-color:#fff;
    touch-action: none;
    -ms-touch-action: none;
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
   div.Ui-head{
    background-color: #fff;
    --webkit-box-shadow: none;
    box-shadow: none;
  }

  /*内容区*/
  .ViewSpace{
    width:100%;
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
  .ViewSpace .viewBox{
        position: relative;
        width: 1024px;
        height: 545px;
        padding:  26px 0;
        /*background-color: #66c;*/
  }

  .ViewSpace .leftWrap{
    display: inline-block;
    width: 372px;
    height: 400px;
    position: absolute;
    margin-right: 24px;
    left: 0;
    float: left;
  }
  .ViewSpace .leftWrap>img{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .ViewSpace .rightWrap,.showImg{
    display: inline-block;
    width: 580px;
    height: 400px ;
    position: absolute;
    right: 0;
    float: right;
    cursor: pointer;
  }
  .ViewSpace .rightWrap img{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .ViewSpace .bottomWrap{
        position: absolute;
        bottom: 24px;
        right: 0;

  }
  canvas{
    width:100%;
    height: 100%;
  }
  .insp-wrapper{
    width:100%;
    height: 100%;
  }
</style>