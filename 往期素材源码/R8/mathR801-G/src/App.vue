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
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <ui-btn type="radio" @callback="choose(1)" :value="radio1" :width="119" :height="44"><img src="static/UI/b1.png" /></ui-btn>
        <ui-btn type="radio" @callback="choose(2)" :value="radio2" :width="119" :height="44"><img src="static/UI/b2.png" /></ui-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  export default {
    name: 'app',
    components: {uiHead, uiBtn},
    data() {
      return {
        title: '平面向量的三边性质',
        BtnSpaceStyle: 'flex',
        radio1:false,
        radio2:false,
        TO:null,
        X:300,
        Y:200
      }
    },
    watch:{
      radio1(){
          if(this.radio1){
              this.TO.dragLine(this.X,this.Y);
              this.TO.showAhide(true);
          }
      },
      radio2(){
          if(this.radio2){
              this.TO.dragLine(this.X,this.Y);
              this.TO.showAhide(false);
          }
      },
    },
    created() {
      document.title = this.title;
    },
    mounted() {
      //禁止选择
      document.onselectstart = function () {
        return false;
      };
      this.setSideStyle();
      this.TO = this.init();
      window.onresize = () => {
        this.setSideStyle();
      };
    },
    methods: {
      choose(num){
          this.radio1=false;
          this.radio2=false;
          this['radio'+num]=true;
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
      //初始化
      init() {
        var scene = null,
          camera = null,
          renderer = null,
          mainWidth = null,
          mainHeight = null,
          controls = null,
          isMob = /iPad|Android/g.test(navigator.userAgent),
          selectobjs = [],
          selectobj = null,
          raycaster = new THREE.Raycaster(),
          plane = new THREE.Plane(),
          offset = new THREE.Vector3(),
          intersection = new THREE.Vector3(),
          INTERSECTED = null,
          mousedownflag = false;

        if (isMob) {
          renderer = new THREE.WebGLRenderer({
            antialias: true
          });
        } else {
          renderer = new THREE.CanvasRenderer();
        }
        mainWidth = $('#renderCanvas').width();
        mainHeight = $('#renderCanvas').height();
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(50, mainWidth / mainHeight, 1, 10000);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 1200;
        // camera.lookAt(scene.position);
        // scene.add(camera);
        scene.position.set(0,80,0)
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0xffffff);
        renderer.setSize(mainWidth, mainHeight);
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = false;
        controls.enableRotate = false;
        controls.enablePan = false;
        $("#renderCanvas").append(renderer.domElement);

        var vec3 = (x, y, z) => {
          return new THREE.Vector3(x, y, z);
        };
        var createLineMesh = (vertices, color, style, width) => {
          var lineMesh = null,
            geometryLine = new THREE.Geometry();
          if (!color) {
            color = '#000';
          }
          if (style == 2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            var M=new THREE.LineDashedMaterial({
              color: color,
              dashSize: 15,
              gapSize: 15,
              linewidth: width
            });
            if(isMob){
              lineMesh = new THREE.Line(geometryLine,M);
            }else{
              lineMesh = new THREE.LineSegments(geometryLine,M);
            }
          } else if (style == 3) {
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({
              color: color,
              linewidth: width
            }));
          }
          return lineMesh;
        };
        var createTriangleFace = (vertices, color) => {
            var material = new THREE.MeshBasicMaterial({
                color: color
            });
            var geom = new THREE.Geometry();
            geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
            geom.vertices = vertices;
            var mesh = new THREE.Mesh(geom, material);
            return mesh;
        };
        var createImg = (x,y,z, w, h, src) => {
            var PlaneG = new THREE.PlaneGeometry(w, h);
            var PlaneM = new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture(src),
                transparent: true,
                overdraw: 0.2,
                depthTest: false
            });
            var Plane = new THREE.Mesh(PlaneG, PlaneM);
            Plane.position.x = x;
            Plane.position.y = y;
            Plane.position.z = z;
            return Plane;
        };
        var createText = (texts, x, y, z, color, size) => {
            var SpriteText2D = THREE_Text.SpriteText2D;
            var textAlign = THREE_Text.textAlign;
            var textStyle = {
                align: textAlign.center,
                font: size + 'px "Cambria Italic"',
                fillStyle: color,
                antialias: true
            };
            var text = new SpriteText2D(texts, textStyle);
            text.position.set(x, y, z);
            return text;
        };
        //画圆圈
        var createYuan = (r, val) => {
            var dx, dy, vertices = [];
            for (var i = 0; i < val; i++) {
                dx = r * Math.cos(Math.PI / 180 * i);
                dy = r * Math.sin(Math.PI / 180 * i);
                vertices.push(vec3(dx, dy, 0));
            }
            var yuan = createLineMesh(vertices, '#1B8B72', 3, 1);
            return yuan;
        };
        //画圆面
        var createCircle = (r,val) => {
            var geometry = new THREE.CircleBufferGeometry(r, 12,0,val);
            var material = new THREE.MeshBasicMaterial({color: '#75B9AA' ,transparent:true,opacity:0.6,side:THREE.DoubleSide});
            var circle = new THREE.Mesh(geometry, material);
            return circle;
        };

        var piontDrag;
        var textB,textC,textD,bl,fbl,aAbl,aRbl,textt,ANG,G1,G2;
        var createBase=()=>{
            piontDrag=createImg(50,50,5,118,118,'./static/UI/arrow.png');
            selectobjs.push(piontDrag);
            scene.add(piontDrag);

            //向量a
            var vertices=[];
            vertices.push(vec3(-40,0,0),vec3(-500,0,0));
            var linea=createLineMesh(vertices,'#0094FF',3,3);
            var lineA=new THREE.Group();
            vertices=[];
            vertices.push(vec3(-40,10,0),vec3(-40,-10,0),vec3(0,0,0));
            var lineap=createTriangleFace(vertices,'#0094FF');
            lineA.add(linea,lineap);

            //辅助虚线
            vertices=[];
            vertices.push(vec3(0,0,0),vec3(500,0,0));
            var linedesh=createLineMesh(vertices,'#4CB100',2,2);

            // A
            var textA=createText('A',-530,25,0,'#000',40);
            // B
            textB=createText('B',0,-5,0,'#000',40);

            // C
            textC=createText('C',this.X-50,this.Y+25,5,'#000',40);

            // D
            textD=createText('D',-this.X,-this.Y,5,'#000',40);
            textD.visible=false;

            var al=createImg(-250,-35,3,141,71,'./static/UI/a.png');
            bl=createImg(170,80,3,141,71,'./static/UI/b.png');
            fbl=createImg(-130,-120,3,141,71,'./static/UI/fb.png');
            fbl.visible=false;
            aAbl=createImg(0,0,3,141,71,'./static/UI/aAb.png');
            aAbl.visible=false;
            aRbl=createImg(0,0,3,141,71,'./static/UI/aRb.png');
            aRbl.visible=false;

            textt=createImg(0,0,3,30,30,'./static/UI/t.png');
            textt.visible=false;

            G1=createImg(100,-520,3,600*2,80*2,'./static/UI/1.png');
            G1.visible=false;
            G2=createImg(100,-520,3,600*2,80*2,'./static/UI/2.png');
            G2.visible=false;
            scene.add(lineA,linedesh,textA,textB,textC,textD,al,bl,fbl,aAbl,textt,aRbl,G1,G2);
        }
        createBase();


        var lineB=null;
        var lineB1=null;
        var lineC=null;
        var dragLine=(x,y)=>{
            if(lineB!=null){
                scene.remove(lineB,lineC,lineB1,ANG);
            }
            if(x<-650){
                x=-650;
            }else if(x>650){
                x=650;
            }
            if(y>400){
                y=400;
            }else if(y<-400){
                y=-400;
            }
            this.X=x;
            this.Y=y;
            piontDrag.position.set(x,y,5);
            var L=Math.sqrt(x*x+y*y,2);
            var ang=Math.atan(y/x);
            if(x>=0){
                ang=ang;
                textC.position.set(x-50,y+25,5);
            }else{
                ang=ang+Math.PI;
                textC.position.set(x+50,y+25,5);
            }
            if(y/x>0){
                bl.position.set(L/2*Math.cos(ang)+40,L/2*Math.sin(ang)-20,3);
            }else{
                bl.position.set(L/2*Math.cos(ang)-40,L/2*Math.sin(ang)-20,3);
            }

            //向量b
            var vertices=[];
            vertices.push(vec3(0,0,0),vec3(L-40,0,0));
            var lineb=createLineMesh(vertices,'#0094FF',3,3);
            lineB=new THREE.Group();
            vertices=[];
            vertices.push(vec3(L-40,10,0),vec3(L-40,-10,0),vec3(L,0,0));
            var linebp=createTriangleFace(vertices,'#0094FF');
            lineB.add(lineb,linebp);
            lineB.rotation.z=ang;
            piontDrag.rotation.z=ang-Math.PI/2;
            scene.add(lineB);
            if(this.radio1){
                //向量c1
                var L1=Math.sqrt((x+500)*(x+500)+y*y,2);
                var ang1=Math.atan(y/(x+500));
                if(x>-500){
                    ang1=ang1;
                }else{
                    ang1=ang1+Math.PI
                }

                if(y<0){
                    aAbl.position.set(L1/2*Math.cos(ang1)-70-500,L1/2*Math.sin(ang1)-30,3);
                    textB.position.y=60;
                }else{
                    aAbl.position.set(L1/2*Math.cos(ang1)-70-500,L1/2*Math.sin(ang1)+30,3);
                    textB.position.y=-5;
                }

                var vertices=[];
                vertices.push(vec3(0,0,4),vec3(L1-40,0,4));
                var linec=createLineMesh(vertices,'#E30000',3,3);
                lineC=new THREE.Group();
                var lineC1=new THREE.Group();
                vertices=[];
                vertices.push(vec3(L1-40,10,4),vec3(L1-40,-10,4),vec3(L1,0,4));
                var linecp=createTriangleFace(vertices,'#E30000');
                lineC1.add(linec,linecp);
                lineC1.rotation.z=ang1;
                lineC.add(lineC1);
                lineC.position.x=-500;

                var tang=0;
                ANG=new THREE.Group();
                tang=ang;
                if(ang<0){
                    tang=ang;
                    ang=-ang;
                    ANG.rotation.x=Math.PI;
                }else if(ang>Math.PI){
                    ang=Math.PI*2-ang;
                    tang=-ang;
                    ANG.rotation.x=Math.PI;
                }

                textt.position.set(70*Math.cos(tang/2),70*Math.sin(tang/2),3);

                var angP=createCircle(50,ang);
                var angL=createYuan(50,ang/Math.PI*180);
                ANG.add(angP,angL);
                scene.add(lineC,ANG);
            }else if(this.radio2){
                lineB1=lineB.clone();
                lineB1.rotation.z+=Math.PI;
                scene.add(lineB1);

                if(-y>0){
                    textD.position.set(-x,-y+50,5);
                    textB.position.y=-5;
                }else{
                    textD.position.set(-x,-y,5);
                    textB.position.y=60;
                }

                var L1=Math.sqrt((-x+500)*(-x+500)+y*y,2);
                var ang1=Math.atan(-y/(-x+500));
                if(-x>-500){
                    ang1=ang1;
                }else{
                    ang1=ang1+Math.PI
                }

                if(y/x>0){
                    fbl.position.set(-L/2*Math.cos(ang)+40,-L/2*Math.sin(ang)-20,3);
                }else{
                    fbl.position.set(-L/2*Math.cos(ang)-40,-L/2*Math.sin(ang)-20,3);
                }

                if(y<0){
                    aRbl.position.set(L1/2*Math.cos(ang1)-70-500,L1/2*Math.sin(ang1)+20,3);
                }else{
                    aRbl.position.set(L1/2*Math.cos(ang1)-70-500,L1/2*Math.sin(ang1)-20,3);
                }

                var vertices=[];
                vertices.push(vec3(0,0,4),vec3(L1-40,0,4));
                var linec=createLineMesh(vertices,'#7000D3',3,3);
                lineC=new THREE.Group();
                var lineC1=new THREE.Group();
                vertices=[];
                vertices.push(vec3(L1-40,10,4),vec3(L1-40,-10,4),vec3(L1,0,4));
                var linecp=createTriangleFace(vertices,'#7000D3');
                lineC1.add(linec,linecp);
                lineC1.rotation.z=ang1;
                lineC.add(lineC1);
                lineC.position.x=-500;

                var tang=0;
                ANG=new THREE.Group();
                if(ang<0){
                    ang=Math.PI+ang;
                    tang=ang;
                }else if(ang<Math.PI){
                    ang=Math.PI-ang;
                    ANG.rotation.x=Math.PI;
                    tang=-ang;
                }else if(ang>Math.PI){
                    ang=ang-Math.PI;
                    tang=ang;
                }

                textt.position.set(70*Math.cos(tang/2),70*Math.sin(tang/2),3);

                var angP=createCircle(50,ang);
                var angL=createYuan(50,ang/Math.PI*180);
                ANG.add(angP,angL);
                scene.add(lineC,ANG);
            }
        }
        dragLine(this.X,this.Y);

        var showAhide=(f)=>{
            if(f){
                textt.visible=true;
                textD.visible=false;
                fbl.visible=false;
                aRbl.visible=false;
                aAbl.visible=true;
                G1.visible=true;
                G2.visible=false;
            }else{
                aAbl.visible=false;
                textD.visible=true;
                fbl.visible=true;
                aRbl.visible=true;
                textt.visible=true;
                G1.visible=false;
                G2.visible=true;
            }
        }

        var onDocumentMouseDown = (event) => {
            var offsetLeft = parseInt($('#renderCanvas').offset().left);
            var offsetTop = parseInt($('#renderCanvas').offset().top);
            event.preventDefault();
            var mouse = {};
            mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
            mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(selectobjs);
            if (intersects.length > 0) {
                selectobj = intersects[0].object;
                mousedownflag = true;
            }
        };
        var onDocumentMouseMove = (event) => {
            var offsetLeft = parseInt($('#renderCanvas').offset().left);
            var offsetTop = parseInt($('#renderCanvas').offset().top);
            event.preventDefault();
            var mouse = {};
            mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
            mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(selectobjs);
            raycaster.setFromCamera(mouse, camera);
            if (intersects.length > 0) {
                if (INTERSECTED != intersects[0].object) {
                    INTERSECTED = intersects[0].object;
                    plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
                }
            }
            if (mousedownflag) {
                if (raycaster.ray.intersectPlane(plane, intersection)) {
                    var obj = intersection.sub(offset),x, y;
                    x=obj.x;
                    y=obj.y;
                    dragLine(x,y-80);
                }
            }
        };
        var onDocumentMouseUp = (event) => {
            event.preventDefault();
            mousedownflag = false;
            selectobj = null;
        };
        var onDocumentTouchStart = (event) => {
            var offsetLeft = parseInt($('#renderCanvas').offset().left);
            var offsetTop = parseInt($('#renderCanvas').offset().top);
            event.preventDefault();
            if (event.touches.length === 1) {
                var mouse = {};
                mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
                mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                var intersects = raycaster.intersectObjects(selectobjs);
                if (intersects.length > 0) {
                    selectobj = intersects[0].object;
                    mousedownflag = true;
                }
            }
        };
        var onDocumentTouchMove = (event) => {
            var offsetLeft = parseInt($('#renderCanvas').offset().left);
            var offsetTop = parseInt($('#renderCanvas').offset().top);
            event.preventDefault();
            if (event.touches.length === 1) {
                var mouse = {};
                mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
                mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                var intersects = raycaster.intersectObjects(selectobjs);
                if (intersects.length > 0) {
                    if (INTERSECTED != intersects[0].object) {
                        INTERSECTED = intersects[0].object;
                        plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
                    }
                }
                if (mousedownflag) {
                    if (raycaster.ray.intersectPlane(plane, intersection)) {
                        var obj = intersection.sub(offset),x, y;
                        x=obj.x;
                        y=obj.y;
                        dragLine(x,y-80);
                    }
                }
            }
        };
        var onDocumentTouchEnd = (event) => {
            event.preventDefault();
            mousedownflag = false;
            selectobj = null;
        };

        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
        renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
        renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
        renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);

        var resetW = () => {
            this.radio1=false;
            this.radio2=false;
            textD.visible=false;
            fbl.visible=false;
            aRbl.visible=false;
            aAbl.visible=false;
            textt.visible=false;
            G1.visible=false;
            G2.visible=false;
            dragLine(300,200);
        };
        var renderAll = () => {
          controls.update();
          renderer.clear();
          renderer.render(scene, camera);
          requestAnimationFrame(renderAll);
        };
        renderAll();
        var TO = function () {
          return {
            resetW:resetW,
            dragLine:dragLine,
            showAhide:showAhide
          }
        };
        return TO();
      },

      //重置
      resetWidget() {
        this.TO.resetW();
      }
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
    position: absolute;
    width: 100%;
    height: 100%;
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
    width: calc(100% - 167px);
    float: left;
    height: 100%;
    z-index: 1;
    position: relative;
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
    width: 167px;
    height: 100%;
    z-index: 999;
    position: relative;
    padding:0 24px;
  }

  #renderCanvas {
    overflow: hidden;
    width: 100%;
    height: calc(100% - 72px);
    position: relative;
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
    width: 100%;
    height: calc(100% - 80px);
    clear: both;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
  }

  .btn_space .UI-btn {
    margin-bottom: 20px;
  }

  .btn_space img{
    height:24px;
    width:auto;
  }
</style>
