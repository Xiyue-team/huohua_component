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
                <img :src="img2"  ondragstart="return false;">
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
                :piecewise="true"
                :piecewiseLabel="false"
                :tooltip="false"
                @callback='choose'
                :noBlueProcess="true"
                :data="['0','1','2','3']"
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
                title:'正四面体内切球半径方程法',
                BtnSpaceStyle: 'flex',
                TODO: null,
                dragToggle:true,
                img1:'static/img/sub-1.png',
                img2:'static/img/start.png',
                isShow:true,
                zoomF:window.innerWidth/(window.innerHeight - 76)>=1024/545?(window.innerHeight - 76)/545:window.innerWidth/1024,
                value:"0",
                slideShow:false,
                next:true
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
            value(val,old){
                let diff = val - old;
                if(diff >0){
                    this.next = true;
                }else{
                    this.next = false;
                }
                if(val==0){
                    this.TODO.createObj();
                }
                else if(val==1){
                    this.TODO.createObj1();
                }
                else if(val==2){
                    if(!this.next){
                        this.TODO.hideObj2();
                        return;
                    }else{
                        this.TODO.createObj2();
                    }
                }
                else{
                    this.TODO.createObj3();
                }
            }
        },

        methods: {
            //图片预加载
            imgL(src, callback) {
                let img = new Image();
                img.src = src;
                img.onload = function () {
                    callback && callback(img.src);
                }
            },
           choose(val){
                 if(val==0){
                    this.imgL("static/img/sub-2.png",(src)=>{
                        this.img1=src;
                    });
                }
                else if(val==1){
                    this.imgL("static/img/sub-3.png",(src)=>{
                        this.img1=src;
                    });
                }
                else if(val==2){
                    this.imgL("static/img/sub-4.png",(src)=>{
                        this.img1=src;
                    });
                }
                else{
                    this.imgL("static/img/sub-5.png",(src)=>{
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
                let face ={
                    1:[-200,-200,200],
                    2:[200,-200,-200],
                    3:[-200,200,-200],
                    4:[200,200,200]
                };
                let line ={
                    1:[-201,-201,201],  //B点
                    2:[201,-201,-201],  //D点
                    3:[-201,201,-201],  //A点
                    4:[201,201,201],    //C点
                    5:[201,0,0],        //E点
                    6:[0,0,201],        //M点
                    7:[67,-67,67],      //F点
                    8:[0,0,0],           //O点
                    9:[67,67,-67]       //G点
                };
                let txt ={
                    1:[-220,-220,220],
                    2:[220,-220,-220],
                    3:[-220,220,-220],
                    4:[220,220,220],
                    5:[225,30,0],
                    6:[30,30,220],
                    7:[80,-80,75],
                    8:[-25,20,0],
                    9:[80,80,-80]
                };
                let obj = new THREE.Group();
                let obj1 = new THREE.Group();
                let obj2 = new THREE.Group();
                let obj3 = new THREE.Group();
                let lineAF,lineAE,lineFE,text2a;
                let timer = null,SET=null;
                //创建场景
                mainWidth = $('#renderCanvas').width();
                mainHeight = $('#renderCanvas').height();
                scene = new THREE.Scene();
                camera = new THREE.OrthographicCamera(mainWidth/-1,mainWidth/1,mainHeight/1,mainHeight/-1,-100,10000);
                camera.position.set(214,1085,463);
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
                        width = 2;
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
                    let material = new THREE.MeshPhongMaterial({
                        color: color,
                        transparent:true,
                        opacity:0.1,
                    });
                    let geom = new THREE.Geometry();
                    geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
                    geom.vertices = vertices;
                    let mesh = new THREE.Mesh(geom, material);
                    return mesh;
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
                let ceratemesh =(n1,n2,n3,o) =>{
                    let vertices=[];
                    vertices.push(vec3(face[n1][0],face[n1][1],face[n1][2]));
                    vertices.push(vec3(face[n2][0],face[n2][1],face[n2][2]));
                    vertices.push(vec3(face[n3][0],face[n3][1],face[n3][2]));
                    let mesh=createTriangleFace(vertices,'#E8FBFF');
                    o.add(mesh)
                };
                //构造文字
                let createTextPoint =(n,font,o) =>{
                    let vertices=[];
                    vertices.push(vec3(txt[n][0],txt[n][1],txt[n][2]));
                    let text=createText(vertices,font,30,'#000');
                    o.add(text);
                };
                //创建动态线条
                let countArr = [0,0,0];
                let createMoveLine = (n1, n2, color, index, count,type) => {
                    let lineO;
                    let x, y, z;
                    let vertices = [];
                    x = (line[n1][0] - line[n2][0]) / count;
                    y = (line[n1][1] - line[n2][1]) / count;
                    z = (line[n1][2] - line[n2][2]) / count;
                    countArr[index] += 2;
                    vertices.push(line[n1][0], line[n1][1], line[n1][2]);
                    vertices.push(line[n1][0] - countArr[index] * x, line[n1][1] - countArr[index] * y, line[n1][2] - countArr[index] * z);
                    lineO = createLineMesh(vertices, color, type);
                    return lineO;
                };

                //初始正四面体
                let createObj =() =>{
                   if(obj != null) {
                       scene.remove(obj);
                   }
                   obj = new THREE.Group();

                   //构建线条
                    let lineBD = createLine(1,2,4);
                    let lineAB = createLine(1,3,4);
                    let lineBC = createLine(1,4,4);
                    let lineAD = createLine(2,3,4);
                    let lineCD = createLine(2,4,4);
                    let lineAC = createLine(3,4,4);

                    //构建文字
                    createTextPoint(3,'A',obj);
                    createTextPoint(1,'B',obj);
                    createTextPoint(4,'C',obj);
                    createTextPoint(2,'D',obj);

                    //构建面
                    ceratemesh(1,3,4,obj);
                    ceratemesh(2,3,4,obj);
                    ceratemesh(1,2,3,obj);
                    ceratemesh(1,2,4,obj);
                    obj.add(lineBD,lineAB,lineBC,lineAD,lineCD,lineAC);
                    scene.add(obj);
                    obj1.visible=false;
                    obj2.visible=false;
                    obj3.visible=false;
                };
                let createObj1 =() =>{
                    if(obj1 != null) {
                        scene.remove(obj1);
                    }
                    obj1 = new THREE.Group();
                    //构建线条
                    let lineBE = createLine(1, 5,4,'#0094FF');
                    let lineDM = createLine(2, 6,4,'#0094FF');
                    //构建文字
                    createTextPoint(5, 'E', obj1);
                    createTextPoint(7, 'F', obj1);
                    //构建圆点
                    let pointF = createBall(5,9);
                    pointF.position.set(67, -67, 67);
                    //构建垂足
                    let vertices = [];
                    let pealG1 = new THREE.Group();
                    let peal11 = new THREE.Group();
                    vertices.push(0, 20, 0,20, 20, 0,20, 0, 0);
                    let pealBEC = createLineMesh(vertices,'#000', 4);
                    pealBEC.rotation.set(Math.PI / 4, 6 * Math.PI / 5, 0);
                    peal11.add(pealBEC);
                    peal11.position.set(200, 0, 0);
                    pealG1.add(peal11);
                    obj1.add(lineBE,lineDM,pointF,pealG1);
                    scene.add(obj1);
                    obj2.visible=false;
                    obj3.visible=false;
                };
                let createObj2 =() => {
                    if(obj2 != null) {
                        scene.remove(obj2);
                    }
                    obj2 = new THREE.Group();
                    this.dragToggle  = false;
                    //线条动画
                    clearTimeout(SET);
                    SET = setTimeout(()=>{
                        countArr =[0,0,0];
                        let lineAn = () =>{
                            if(countArr[0]>=50) {
                                cancelAnimationFrame(timer);
                                //构建AFE垂足
                                let vertices = [];
                                let pealG2 = new THREE.Group();
                                let peal12 = new THREE.Group();
                                vertices.push(0, 20, 0,20, 20, 0,20, 0, 0);
                                let pealAFE = createLineMesh(vertices,'#000',4);
                                pealAFE.rotation.set(-Math.PI/4,0,Math.PI/5);
                                peal12.add(pealAFE);
                                peal12.position.set(67,-67,67);
                                pealG2.add(peal12);
                                //构建球文字圆心
                                let pointO = createBall(5,9);
                                pointO.position.set(0,0,0);
                                createTextPoint(8,'O',obj2);
                                timer = null;
                                let step = 0;
                                let objBall = createBall(Math.hypot(115),64,'#fff',0.6);
                                let lineBall = () =>{
                                    if(step >=1){
                                        cancelAnimationFrame(timer);
                                        this.dragToggle  = true;
                                        //构建线条OG
                                        let lineOG = createLine(8,9,4,'#7000D3');
                                        createTextPoint(9,'G',obj2);
                                        obj2.add(lineOG);
                                        return;
                                    }
                                    step+=0.08;
                                    objBall.scale.x=step;
                                    objBall.scale.y=step;
                                    objBall.scale.z=step;
                                    timer = requestAnimationFrame(lineBall);
                                };
                                lineBall();
                                obj2.add(objBall,pointO,pealG2);
                                return;
                            }
                            lineAF = createMoveLine(3, 7, '#E30000', 0, 50,3);
                            lineAE = createMoveLine(3, 5, '#E30000', 1, 50,3);
                            lineFE = createMoveLine(7, 5, '#E30000', 2, 50,3);
                            timer = requestAnimationFrame(lineAn);
                            obj2.add(lineAF,lineAE,lineFE);
                        };
                        lineAn();
                    },180);
                    scene.add(obj2);
                };
                let hideObj2 =() =>{
                    obj3.visible=false;
                };
                let createObj3 =() =>{
                    if(obj3 != null) {
                        scene.remove(obj3);
                    }
                    obj3 = new THREE.Group();
                    let vertices;

                    //构建文字
                    vertices = [];
                    vertices.push(vec3(-225, 0, 0));
                    let texta = createText(vertices, 'a', 25, '#000');

                    vertices = [];
                    vertices.push(vec3(20, 50, -40));
                    let textr = createText(vertices, 'r', 25, '#7000D3');

                    vertices = [];
                    vertices.push(vec3(20.5, -33.5, 33.5));
                    let textr2 = createText(vertices, 'r', 25, '#FF5D00');

                    vertices = [];
                    vertices.push(vec3(-87, 67, -67));
                    let texth = createText(vertices, 'h', 25, '#FF5D00');
                    text2a = createImg(230, 119.5, 119.5, 35, 70, 'static/img/Slice1.png');
                    obj3.add(texta,textr,textr2,texth,text2a);
                    scene.add(obj3);
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
                     $('.showImg').show();
                     $('canvas').hide();
                     this.value = "0";
                    this.dragToggle  = true;
                      this.slideShow=false;
                     this.imgL("static/img/sub-1.png",()=>{
                        this.img1='static/img/sub-1.png';
                     });
                      createObj();
                      camera.position.set(214,1085,463);
                      camera.zoom=1;
                      camera.updateProjectionMatrix();             
                };

                //渲染场景
                let renderAll=()=>{
                    controls.update();
                    renderer.clear();
                    renderer.render(scene, camera);
                    if(text2a!=null){
                        text2a.rotation.set(camera.rotation.x,camera.rotation.y,camera.rotation.z);
                    }
                    requestAnimationFrame(renderAll);
                }
                renderAll();
                //回调函数
                let TODO = function() {
                    return {
                        reset: resetWidget,
                        showCanvas: showCanvas,
                        createObj:createObj,
                        createObj1:createObj1,
                        createObj2:createObj2,
                        hideObj2: hideObj2,
                        createObj3:createObj3
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