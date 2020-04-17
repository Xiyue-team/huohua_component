<template>
  <div id="app" class="noselect">
    <!--头部-->
    <ui-head :title="title">
      <ui-btn type="reset1" @click.native="reset"></ui-btn>
    </ui-head>
    <!--模型区域-->
    <div class="ViewSpace">
      <div :style="'zoom:'+zoomF" class="viewBox">
        <div class="leftWrap"><img :src="img1" ondragstart="return false;">
          <div class="cut">
            <ui-btn type="switch" :width="98" :height="96" :vertical="true" v-show="cutToggle" v-model="checked" @click.native='showCut'> 切割线 </ui-btn>
          </div>
        </div>
        <div class="rightWrap" id="renderCanvas">
          <div class="showImg" @click='showCanvas' v-show='isShow'> <img :src="img2" ondragstart="return false;"> </div>
        </div>
        <div class="bottomWrap">
          <ui-slider :value=value :zoom="zoomF" :boxWidth="580" :dragable="dragable" :clickable="false" :boxHeight="53" :title="false" :piecewise="true" :piecewiseLabel="false" @callback='choose' :tooltip="false" :noBlueProcess="true" :data="['0','1','2','3']" v-model="value" v-if='slideShow'> </ui-slider>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //滑块
export default {
  name: 'app',
  components: { uiHead, uiBtn, uiSlider },
  data() {
    return {
      title: '正四面体内切球半径等体积法',
      BtnSpaceStyle: 'flex',
      TODO: null,
      img1: 'static/img/sub-1.png',
      img2: 'static/img/start.png',
      isShow: true,
      zoomF: window.innerWidth / (window.innerHeight - 76) >= 1024 / 545 ? (window.innerHeight - 76) / 545 : window.innerWidth / 1024,
      dragable: false,
      value: "0",
      checked: false,
      timer2: null,
      timer3: null,
      timer4: null,
      timer5: null,
      cutToggle:false,
      slideShow: false,
      next:true
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
    this.resize();
    this.TODO = this.init();
    this.TODO.createObj();
    this.TODO.createNewObj();
  },
  watch: {
    value(val,old) {
       let diff = val - old;
        if (diff >0){
            this.next = true;
        }else{
            this.next = false;
        }
       if(val == 0){
           this.TODO.createObj();
           this.cutToggle=false;
       }
       else if(val == 1){
           this.TODO.createObj1();
           this.cutToggle=false;
       }
       else if(val == 2){
           if(!this.next) {
               this.TODO.hideObj();
               this.cutToggle=true;
               return;
           }else{
               this.TODO.createObj2();
               this.cutToggle=true;
           }
       }
       else{
           this.TODO.createObj3();
           this.cutToggle=false;
       }
      },
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
      //滑动条
      choose(v) {
          if (v == 0) {
              this.imgL("static/img/sub-2.png", (src) => {
                  this.img1 = src;
              });
          }else if (v == 1) {
              this.imgL("static/img/sub-3.png", (src) => {
                  this.img1 = src;
              });
          } else if (v == 2) {
              this.imgL("static/img/sub-4.png", (src) => {
                  this.img1 = src;
              });
          }
          else{
              this.imgL("static/img/sub-6.png", (src) => {
                  this.img1 = src;
              });
          }
      },
    //显示canvas      
    showCanvas() {
      this.TODO.showCanvas();
    },
    showCut() {
      this.TODO.showCut();
    },
    //重置函数
    reset() {
        this.TODO.reset();
    },
    //初始化
    init() {
        let scene, camera, renderer, mainWidth, mainHeight, controls;
        let face= {
            1: [-200, -200, 200],
            2: [200, -200, -200],
            3: [-200, 200, -200],
            4: [200, 200, 200],
            5: [-1, -1, -1]
        };
        let line ={
            1: [-201, -201, 201],   //B点
            2: [201, -201, -201],   //D点
            3: [-201, 201, -201],   //A点
            4: [201, 201, 201],     //C点
            5: [0, 0, 0],           //O点
            6: [67, -67, 67],       //E点
            7: [201, 0, 0],         //G
            8: [-67, -67, -67],     //G1半径
        };
        let txt = {
            1: [-220, -220, 220],       //B点
            2: [220, -220, -220],       //D点
            3: [-220, 220, -220],       //A点
            4: [220, 220, 220],         //C点
            5: [-30, 30, 0],            //O点
            6: [80, -70, 75],           //E点
            7: [20.5, -33.5, 33.5],     //r
            8: [-115.5, 100.5, -100.5], //h
            9: [-50, -50, -50]          //切割半径r
        };
        let obj = new THREE.Group();
        let obj1 = new THREE.Group();
        let obj2 = new THREE.Group();
        let obj3 = new THREE.Group();
        let newObj = new THREE.Group();
        let objG1 = new THREE.Group();
        let objG2 = null,objG3 = null,objG4 = null;
        let timer = null,
            timer1 = null,
            timer2 = null,
            timer3 = null,
            timer4 = null,
            SET=null;

        //创建场景
        mainWidth = $('#renderCanvas').width();
        mainHeight = $('#renderCanvas').height();
        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(mainWidth/-1,mainWidth/1,mainHeight/1,mainHeight/-1,-100,10000);
        camera.position.set(214, 1085, 462);
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
        //TODO 线条函数
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
        //TODO 调用线条函数
        let createLine = (n1, n2, type, color,width) => {
            let lineO;
            let vertices = [];
            if(!color){
                color = '#000';
            }
            if (!width) {
                width = 1.5;
            }
            vertices.push(line[n1][0], line[n1][1], line[n1][2]);
            vertices.push(line[n2][0], line[n2][1], line[n2][2]);
            lineO = createLineMesh(vertices, color, type,width);
            return lineO;
        };
        //TODO 球函数
        let createBall = (radius, slip, color, opacity) => {
            let sphere;
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
            sphere = new THREE.Mesh(geometry, material);
            return sphere;
        };
        //TODO 文字函数
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
        //TODO 调用文字函数
        let createTextPoint =(n,font,o) =>{
            let vertices=[];
            vertices.push(vec3(txt[n][0],txt[n][1],txt[n][2]));
            let text=createText(vertices,font,30,'#000');
            o.add(text);
        };
        //TODO 面函数
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
        //TODO 调用面函数
        let createMesh =(n1,n2,n3,o,color) =>{
            let vertices=[],mesh;
            vertices.push(vec3(face[n1][0],face[n1][1],face[n1][2]));
            vertices.push(vec3(face[n2][0],face[n2][1],face[n2][2]));
            vertices.push(vec3(face[n3][0],face[n3][1],face[n3][2]));
            mesh=createTriangleFace(vertices,color);
            o.add(mesh)
        };
        //TODO 贴图函数
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
        //TODO 创建动画线条
        let countArr = [0,0,0,0];
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
        //TODO 球体切割
        let cuting;
        let createCutBall = (o) =>{
            let result;
            let sphereG = new THREE.SphereGeometry(115, 32, 32);
            let sphereM = new THREE.MeshPhongMaterial({
                color: "#fff",
                transparent: true,
                opacity: 0.6,
                depthTest: false
            });
            let sphere = new THREE.Mesh(sphereG, sphereM);
            let cubeG = new THREE.Geometry();
            cubeG.vertices.push(
                new THREE.Vector3(-200, 200, -200),
                new THREE.Vector3(-200, -200, 200),
                new THREE.Vector3(200, -200, -200),
                new THREE.Vector3(-1, -1, -1)
            );
            cubeG.faces.push(
                new THREE.Face3(0, 1, 2),
                new THREE.Face3(0, 2, 3),
                new THREE.Face3(0, 3, 1),
                new THREE.Face3(3, 2, 1)
            );
            let cubeM = new THREE.MeshPhongMaterial({
                color: "#000",
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.1
            });
            let cube = new THREE.Mesh(cubeG, cubeM);
            let boxBSP = new ThreeBSP(cube);
            let sphereBSP = new ThreeBSP(sphere);
            let resultBSP = sphereBSP.subtract(boxBSP);
            result = resultBSP.toMesh();
            result.material = new THREE.MeshPhongMaterial({ color: '#fff' });
            result.geometry.computeVertexNormals();
            if (result != null) {
                $('#loading').hide();
                cuting = result;
                cube.scale.set(1.01, 1.01, 1.01);
                o.add(cube, cuting);
            }
        };
        //TODO 创建切割后的球
        let createNewObj = () =>{
            if(newObj != null) {
                scene.remove(newObj);
            }
            newObj = new THREE.Group();
            let vertices;
            //构建线条
            let lineNewAB = createLine(1,3,3);
            let lineNewBD = createLine(1,2,3);
            let lineNewAD = createLine(2,3,3);
            let lineNewBO = createLine(1,5,2,'#e30000');
            let lineNewDO = createLine(2,5,2,'#e30000');
            let lineNewAO = createLine(3,5,2,'#e30000');
            let lineNewR = createLine(5, 8, 3,'#7000D3');
            //构建文字
            createTextPoint(9, 'r', objG1, '#7000D3');
            createCutBall(objG1);
            objG1.add(lineNewAB, lineNewBD, lineNewAD, lineNewBO, lineNewDO, lineNewAO, lineNewR);
            //构建克隆体
            objG2 = objG1.clone();
            objG3 = objG1.clone();
            objG4 = objG1.clone();
            createTextPoint(3, 'A', objG1);
            createTextPoint(1, 'B', objG1);
            createTextPoint(2, 'D', objG1);
            //构建克隆体文字
            //组1
            vertices = [];
            vertices.push(vec3(-220, -220, 220));
            let objG2TextD = createText(vertices, 'D', 34, '#000');
            vertices = [];
            vertices.push(vec3(220, -220, -220));
            let objG2TextB = createText(vertices, 'B', 34, '#000');
            vertices = [];
            vertices.push(vec3(-220, 200, -220));
            let objG2TextC = createText(vertices, 'C', 34, '#000');
            //组2
            vertices = [];
            vertices.push(vec3(200, -200, -200));
            let objG3TextA = createText(vertices, 'A', 34, '#000');
            vertices = [];
            vertices.push(vec3(-220, 250, -230));
            let objG3TextD = createText(vertices, 'D', 34, '#000');
            vertices = [];
            vertices.push(vec3(-230, -160, 220));
            let objG3TextC = createText(vertices, 'C', 34, '#000');
            //组3
            vertices = [];
            vertices.push(vec3(-220, -180, 220));
            let objG4TextA = createText(vertices, 'A', 34, '#000');
            vertices = [];
            vertices.push(vec3(-220, 250, -230));
            let objG4TextB = createText(vertices, 'B', 34, '#000');
            vertices = [];
            vertices.push(vec3(240, -220, -220));
            let objG4TextC = createText(vertices, 'C', 34, '#000');
            objG2.add(objG2TextB,objG2TextC,objG2TextD);
            objG3.add(objG3TextA,objG3TextC,objG3TextD);
            objG4.add(objG4TextA,objG4TextB,objG4TextC);

            //构建克隆体旋转摆放位置
            objG2.rotation.set(-Math.PI, 0, -Math.PI);
            objG3.rotation.set(0, 0, -Math.PI);
            objG4.rotation.set(-Math.PI, 0, 0);
            newObj.add(objG1,objG2,objG3,objG4);
            scene.add(newObj);
            newObj.visible=false;
        };
        //TODO 第一步
        let lineOA,lineOB,lineOC,lineOD;
        let createObj = () => {
          if(obj != null){
              scene.remove(obj);
          }
          obj = new THREE.Group();
          //构建线条
          let lineAB = createLine(1, 3, 4);
          let lineAC = createLine(3, 4, 4);
          let lineAD = createLine(2, 3, 4);
          let lineBC = createLine(1, 4, 4);
          let lineCD = createLine(2, 4, 4);
          let lineBD = createLine(1, 2, 4);
          lineOA = createLine(5, 3, 2, '#E30000');
          lineOB = createLine(5, 1, 2, '#E30000');
          lineOC = createLine(5, 4, 2, '#E30000');
          lineOD = createLine(5, 2, 2, '#E30000');
          //构建文字
          createTextPoint(3, 'A', obj);
          createTextPoint(1, 'B', obj);
          createTextPoint(4, 'C', obj);
          createTextPoint(2, 'D', obj);
          createTextPoint(5, 'O', obj);
          //构建面
          createMesh(1, 3, 4, obj,'#000');
          createMesh(2, 3, 4, obj,'#000');
          createMesh(1, 2, 3, obj,'#000');
          createMesh(1, 2, 4, obj,'#000');
          //构建圆心点
          let pointO = createBall(5,9);
          pointO.position.set(0,0,0);
          obj.add(lineAB,lineAC,lineAD,lineBC,lineCD,lineBD,lineOA,lineOB,lineOC,lineOD,pointO);
          scene.add(obj);
          obj1.visible=false;
          obj2.visible=false;
          obj3.visible=false;
        };
        //TODO 第二步
        let createObj1 = () => {
          if(obj1 != null){
              scene.remove(obj1);
          }
          obj1 = new THREE.Group();
          let objBall = createBall(115,32,'#fff',0.6);
          obj1.add(objBall);
          scene.add(obj1);
          lineOA.visible = false;
          lineOB.visible = false;
          lineOC.visible = false;
          lineOD.visible = false;
          obj2.visible=false;
          obj3.visible=false;
        };

        //TODO 第三步
        let lineAnOA;
        let createObj2 = () => {
            if(obj2 != null) {
                scene.remove(obj2);
            }
            obj2 = new THREE.Group();
            this.dragable = false;
            //构建动态线条
            clearTimeout(SET);
            SET = setTimeout(()=>{
                countArr = [0,0,0];
                let lineAn =() =>{
                  if(countArr[0] >= 100){
                      cancelAnimationFrame(timer);
                      this.dragable = true;
                      return;
                  }
                  lineAnOA = createMoveLine(5, 3, '#E30000', 0, 100,2);
                  let lineAnOB = createMoveLine(5, 1, '#E30000', 0, 100,2);
                  let lineAnOC = createMoveLine(5, 4, '#E30000', 0, 100,2);
                  let lineAnOD = createMoveLine(5, 2, '#E30000', 0, 100,2);
                  timer = requestAnimationFrame(lineAn);
                  obj2.add(lineAnOA,lineAnOB,lineAnOC,lineAnOD);
                };
                lineAn();
            },180);
            scene.add(obj2);

        };

        //TODO 切割
        let showCut =() =>{
            if(this.checked){
                this.imgL("static/img/sub-5.png", (src) => {
                    this.img1 = src;
                });
                obj.visible=false;
                obj1.visible=false;
                obj2.visible=false;
                newObj.visible=true;
                newObj.scale.set(0.7, 0.7, 0.7);
                camera.position.set(214, 1085, 462);
                camera.updateProjectionMatrix();
                timer1 = cutAn(objG1, [-400, 80, 0], timer1);
                timer2 = cutAn(objG2, [300, -400, 0], timer2);
                timer3 = cutAn(objG3, [120, 500, -20], timer3);
                timer4 = cutAn(objG4, [-300, -1000, 20], timer4);
                this.dragable = false;
            }else{
                this.imgL("static/img/sub-4.png", (src) => {
                    this.img1 = src;
                });
                camera.zoom = 1;
                camera.position.set(214, 1085, 462);
                camera.updateProjectionMatrix();
                timer1 = cutAn(objG1, [0, 0, 0], timer1, function() {
                    obj.visible=true;
                    obj1.visible=true;
                    obj2.visible=true;
                    newObj.visible=false;
                });
                timer2 = cutAn(objG2, [0, 0, 0], timer2);
                timer3 = cutAn(objG3, [0, 0, 0], timer3);
                timer4 = cutAn(objG4, [0, 0, 0], timer4);
                this.dragable = true;
            }
        };
        //TODO 隐藏
        let hideObj = ()=>{
            obj3.visible=false;
        };
        //TODO 第四步
        let text2a;
        let createObj3 = () => {
            if(obj3 != null) {
                scene.remove(obj3);
            }
            obj3 = new THREE.Group();
            let vertices;
            //构建线条
            let lineOE = createLine(5, 6,3,'#7000D3'); //OE连线
            let lineBG = createLine(1, 7,3,'#0094FF'); //BG连线
            let lineAO = createLine(3, 5,3,'#E30000'); //AO连线
            //构建文字
            text2a = createImg(230, 119.5, 119.5, 64, 64, 'static/img/Slice.png');
            createTextPoint(7, 'r', obj3, '#7000D3');
            createTextPoint(8, 'h', obj3, '#E30000');
            createTextPoint(6, 'E', obj3);
            obj3.add(lineOE,lineBG,lineAO,text2a);
            scene.add(obj3);
        };
        
        //TODO 切割分离动画
        let cutAn = (O, v, timer, callback) => {
            clearInterval(timer);
            let position = O.position;
            if (v) {
                var x = v[0] - position.x,
                    y = v[1] - position.y,
                    z = v[2] - position.z;
            } else {
                var x = -position.x,
                    y = -position.y,
                    z = -position.z;
            }
            var n = 20,
                v1 = x / n,
                v2 = y / n,
                v3 = z / n;
            timer = setInterval(() => {
                n--;
                if (n < 0) {
                    clearInterval(timer);
                    callback && callback();
                    return false;
                }
                position = O.position;
                O.position.set(position.x + v1, position.y + v2, position.z + v3);
            }, 40);
            return timer;
        };
        //TODO 右侧图片点击隐藏-canvas显示
        let showCanvas = () => {
          $('.showImg').hide();
          $('canvas').show();
          this.slideShow = !this.slideShow;
          this.dragable = true;
          this.imgL("static/img/sub-2.png", (src) => {
              this.img1 = src;
          });
        };
        //TODO 页面重置
        let resetWidget = () => {
            if(newObj.visible == true) {
                cutAn(objG1, [0, 0, 0]);
                cutAn(objG2, [0, 0, 0]);
                cutAn(objG3, [0, 0, 0]);
                cutAn(objG4, [0, 0, 0]);
                clearInterval(timer1);
                clearInterval(timer2);
                clearInterval(timer3);
                clearInterval(timer4);
                newObj.visible=false;
            }

            createObj();

            $('.showImg').show();
            $('canvas').hide();
            this.cutToggle=false;
            this.value = "0";
            this.dragable = false;
            this.slideShow = false;
            newObj.visible=false;
            this.checked = false;
            this.imgL("static/img/sub-1.png", (src) => {
                this.img1 = src;
            });
            camera.position.set(214, 1085, 462);
            camera.zoom = 1;
            camera.updateProjectionMatrix();
        };

        //TODO 渲染场景
        let renderAll = () => {
          controls.update();
          renderer.clear();
          renderer.render(scene, camera);
          if (text2a != null) {
              text2a.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
          }
          requestAnimationFrame(renderAll);
        };
        renderAll();
        //TODO 回调函数
        let TODO = function() {
          return {
            reset: resetWidget,
            showCanvas: showCanvas,
            createObj: createObj,
            createObj1: createObj1,
            createObj2: createObj2,
            createObj3: createObj3,
            createNewObj:createNewObj,
            showCut:showCut,
            hideObj:hideObj
          }
        };
        return TODO();
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
    },
    //TODO 窗口大小更改
    resize() {
      const vm = this;
      window.addEventListener('resize', function() {
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

input, button {
  outline: none;
  -webkit-appearance: none;
  border-radius: 0;
}

canvas {
  outline: none;
}


/*盒模型，padding尺寸不用再减去*/

*, *:before, *:after {
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
  padding: 26px 0;
  /*background-color: #66c;*/
}

.ViewSpace .leftWrap {
  display: inline-block;
  width: 372px;
  height: 400px;
  position: absolute;
  margin-right: 24px;
  left: 0;
  float: left;
}

.ViewSpace .leftWrap>img {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.ViewSpace .rightWrap, .showImg {
  display: inline-block;
  width: 580px;
  height: 400px;
  position: absolute;
  right: 0;
  float: right;
  cursor: pointer;
}

.ViewSpace .rightWrap img {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.ViewSpace .bottomWrap {
  position: absolute;
  bottom: 24px;
  right: 0;
}

.cut {
  position: absolute;
  bottom: -96px;
  right: 5px;
}

canvas {
  width: 100%;
  height: 100%;
}

.insp-wrapper {
  width: 100%;
  height: 100%;
}
</style>