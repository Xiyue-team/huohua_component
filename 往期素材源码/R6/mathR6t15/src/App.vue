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
      <ui-btn type="reset1" id="reset" class="aside_reset"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <ui-slider :max="360" title="转动" :tooltip="false" :speed="0" v-model="value" ref="slider" :style="'margin-bottom:40px;'"></ui-slider>
        <div>
          <p :style="'text-align:center;height:14px;font-size:14px;color:#1A1A1A;line-height:14px;'">显示法向量</p>
          <ui-group type="radio"
                    :margin="12"
                    :groups="groups"
                    v-model="radio"
                    :style="'margin-top:12px;'"></ui-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//组
  import uiGroup from '@/components/UI/uiGroup';//组
  import uiSlider from '@/components/UI/uiSlider';//滑块
  export default {
    name: 'app',
    components: {uiHead, uiGroup,uiBtn, uiSlider},
    data(){
      return {
        title: '向量法求二面角',
        BtnSpaceStyle: 'flex',
        BP:Math.PI/180,
        isMob : /iPad|Android/g.test(navigator.userAgent),
        value:120,
        valueO:120,
        radio:'',
        radioO:'',
        groups:[{
            name:'one',
            txt:'同侧'
        },{
            name:'two',
            txt:'异侧'
        }]
      }
    },
    created(){
      document.title = this.title;
    },
    methods: {
      //计算侧边
      setSideStyle(){
        const el = document.getElementById('btn_space');
        if (el && el.scrollHeight > el.offsetHeight) {
          this.BtnSpaceStyle = 'block';
        } else {
          this.BtnSpaceStyle = 'flex';
        }
        var cW=$('canvas').width();
        var cH=$('canvas').height();
        var leftC=($('#renderCanvas').width()-cW)/2;
        $('canvas').css({'left':leftC+'px','top':($('#renderCanvas').height()-cH)/2+'px'});
      },
      createText:function(texts, x, y, z , color, size) {
          var SpriteText2D = THREE_Text.SpriteText2D;
          var textAlign = THREE_Text.textAlign;
          var textStyle = {
              align: textAlign.center,
              font: size + 'px "Cambria Italic"',
              fillStyle: color,
              antialias: true
          };
          var text = new SpriteText2D(texts, textStyle);
    //    text.rotation = camera.rotation;
          text.position.set(x, y, z);
          text.material.depthTest=false;
          return text;
      },
      vec3:function (x, y, z) {
          return new THREE.Vector3(x, y, z);
      },
      createRect(color){
          var geometry = new THREE.PlaneGeometry(250,200);
          var material = new THREE.MeshBasicMaterial({color:color,transparent:true,side:THREE.DoubleSide,opacity:0.3});
          var rect = new THREE.Mesh(geometry,material);
          return rect;
      },
      createLineMesh:function(vertices, color, style,width) {
          var lineMesh = null, geometryLine = new THREE.Geometry();
          if (!color) {
              color = '#000';
          }
          if (style == 2) {
              geometryLine.vertices = vertices;
              geometryLine.computeLineDistances();
              lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
                  color: color,
                  dashSize: 6,
                  gapSize: 6,
                  linewidth: width,
                  depthTest:false
              }));
          } else if (style == 3) {
              geometryLine.vertices = vertices;
              lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({
                  color: color,
                  linewidth: width,
                  depthTest:false
              }));
          }
          return lineMesh;
      },
      createCircle:function (radius, color,end,text) {
          var C=new THREE.Group();
          var CircleM,CircleG;

          CircleM = new THREE.MeshBasicMaterial({color: color,side:THREE.DoubleSide,transparent:true,opacity:0.5});
          CircleG = new THREE.CircleGeometry(radius, Math.ceil(36/360*Math.abs(end)),0,end*this.BP);
          var Circle = new THREE.Mesh(CircleG, CircleM);

          var textx,texty;
          var vertices=[];
          if(end>=0){
              for(var i=0;i<=end+1;i++){
                  var x = radius * Math.cos(i * this.BP);
                  var y = radius * Math.sin(i * this.BP);
                  vertices.push(new THREE.Vector3(x, y, 0));
              }
              textx=radius * Math.cos(end/2 * this.BP)+8;
              texty=radius * Math.sin(end/2 * this.BP)+20;
          }else{
              for(var i=0;i>=end-1;i--){
                  var x = radius * Math.cos(i * this.BP);
                  var y = radius * Math.sin(i * this.BP);
                  vertices.push(new THREE.Vector3(x, y, 0));
              }
              textx=radius * Math.cos(end/2 * this.BP);
              texty=radius * Math.sin(end/2 * this.BP);
          }
          var Circle1=this.createLineMesh(vertices,color, 3,1);

          var textj=this.createText(text,textx,texty,0,'#6D68FF',18);

          C.add(Circle,Circle1,textj);
          return C;
      },
      creatThreeFace(x1, x2, x3, y1, y2, y3, z1, z2, z3, color){
          var geometry = new THREE.Geometry(); //声明一个空几何体对象
          var p1 = new THREE.Vector3(x1, y1, z1); //顶点1坐标
          var p2 = new THREE.Vector3(x2, y2, z2); //顶点2坐标
          var p3 = new THREE.Vector3(x3, y3, z3); //顶点3坐标

          geometry.vertices.push(p1, p2, p3); //顶点坐标添加到geometry对象

          var face = new THREE.Face3(0, 1, 2); //创建三角面
          geometry.faces.push(face); //三角面添加到几何体
          var material = new THREE.MeshBasicMaterial({
              color: color,
              side: THREE.DoubleSide
          });//材质对象
          var mesh = new THREE.Mesh(geometry, material);//网格模型对象

          return mesh;
      },
      //初始化
      init(){
          this.setSideStyle();
          var threeWidth=window.innerWidth-280;
          var threeHeight=window.innerHeight-72;
          var scene = new THREE.Scene();
          var thiz=this;
          var rand;
          if(window.innerHeight<540){
              rand=1.5;
          }else{
              rand=1.8;
          }
          var camera = new THREE.OrthographicCamera(threeWidth/-rand,threeWidth/rand,threeHeight/rand,threeHeight/-rand,1,2000);
          camera.position.x = 0;
          camera.position.y = 500;
          camera.position.z = 700;
          camera.lookAt(scene.position);
          scene.add(camera);

          var renderer=null;
          if (this.isMob) {
              renderer = new THREE.WebGLRenderer({antialias: true});
          } else {
              renderer = new THREE.CanvasRenderer({antialias: true});
          }
          renderer.setPixelRatio(window.devicePixelRatio);
          renderer.setClearColor(0xffffff);
          renderer.setSize(threeWidth, threeHeight);
          $("#renderCanvas").append(renderer.domElement);

          var controls = new THREE.OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.25;
          controls.enableRotate = true;
          controls.enablePan = false;
          controls.enableZoom = false;

          var Plane=new THREE.Group(),X1=new THREE.Group(),X2=new THREE.Group();
          this.createBase(scene,Plane,X1,X2);
          this.draw(scene,Plane);

          renderAll();
          function renderAll() {
              if(thiz.radio!=thiz.radioO){
                  if(thiz.radio=='one'){
                      X1.visible=true;
                      X2.visible=true;
                      X1.rotation.x=Math.PI;
                  }else if(thiz.radio=='two'){
                      X1.rotation.x=0;
                      X1.visible=true;
                      X2.visible=true;
                  }else if(thiz.radio==''){
                      X1.visible=false;
                      X2.visible=false;
                  }
                  thiz.draw(scene,Plane);
              }
              if(thiz.value!=thiz.valueO){
                  thiz.draw(scene,Plane);
              }
              thiz.valueO=thiz.value;
              thiz.radioO=thiz.radio;


              controls.update();
              requestAnimationFrame(renderAll);
              renderer.render(scene, camera);
          }
          function reset() {
              thiz.value=120;
              thiz.radio='';
              thiz.draw(scene,Plane);
              camera.position.set(0,500,700);
          }
          if(this.isMob){
              $('#reset').on('touchstart',reset);
          }else{
              $('#reset').on('click',reset);
          }
      },
      createBase(scene,Plane,X1,X2){
          var Plane1=this.createRect('#AEDDFF');
          Plane1.position.x=125;
          Plane1.rotation.x=Math.PI/2;
          scene.add(Plane1);

          var vertices=[];
          vertices.push(this.vec3(0,0,-100),this.vec3(250,0,-100),this.vec3(250,0,100),this.vec3(0,0,100),this.vec3(0,0,-100));
          var PlaneC1=this.createLineMesh(vertices,'#000',3,1.5);

          vertices=[];
          vertices.push(this.vec3(2,0,0),this.vec3(125,0,0));
          var line1=this.createLineMesh(vertices,'#2989ED',3,2);

          var texta=this.createText('α',230,20,90,'#000',18);

          scene.add(PlaneC1,texta,line1);

          var Plane2=this.createRect('#FFC1C1');
          Plane2.position.x=125;
          Plane2.rotation.x=Math.PI/2;
          Plane.add(Plane2);

          vertices=[];
          vertices.push(this.vec3(0,0,-100),this.vec3(250,0,-100),this.vec3(250,0,100),this.vec3(0,0,100));
          var PlaneC2=this.createLineMesh(vertices,'#000',3,1.5);
          var textb=this.createText('β',230,20,90,'#000',18);

          vertices=[];
          vertices.push(this.vec3(2,0,0),this.vec3(125,0,0));
          var line2=this.createLineMesh(vertices,'#EF2C2C',3,2);

          vertices=[];
          vertices.push(this.vec3(125,0,0),this.vec3(125,200,0));
          var X11=this.createLineMesh(vertices,'#EF2C2C',3,2);
          vertices=[];
          vertices.push(this.vec3(115,0,0),this.vec3(115,10,0),this.vec3(125,10,0));
          var X14=this.createLineMesh(vertices,'#EF2C2C',3,2);
          var X12=this.creatThreeFace(125,125,120,200,210,198,0,0,0,'#EF2C2C');
          var X13=this.creatThreeFace(125,125,130,200,210,198,0,0,0,'#EF2C2C');

          var textn=this.createText('n',140,200,0,'#6D68FF',18);

          X1.add(X11,X12,X13,X14,textn);
          X1.visible=false;

          Plane.add(PlaneC2,textb,line2,X1);

          var sphere = new THREE.Mesh(
              new THREE.SphereGeometry(3,9,9),
              new THREE.MeshLambertMaterial({ color: 0x6D6EFF })
          );
          var textp=this.createText('p',-10,0,0,'#000',18);

          vertices=[];
          vertices.push(this.vec3(125,0,0),this.vec3(125,200,0));
          var X21=this.createLineMesh(vertices,'#2989ED',3,2);
          vertices=[];
          vertices.push(this.vec3(115,0,0),this.vec3(115,10,0),this.vec3(125,10,0));
          var X24=this.createLineMesh(vertices,'#2989ED',3,2);
          var X22=this.creatThreeFace(125,125,120,200,210,198,0,0,0,'#2989ED');
          var X23=this.creatThreeFace(125,125,130,200,210,198,0,0,0,'#2989ED');

          var textm=this.createText('m',140,200,0,'#6D68FF',18);
          X2.add(X21,X22,X23,X24,textm);
          X2.visible=false;

          scene.add(Plane,sphere,textp,X2);
      },
      draw(scene,Plane){
          scene.remove(scene.children[9]);
          var ang=this.value;
          Plane.rotation.z=ang*this.BP;
          var OBJ=new THREE.Group(),Cang,CT,k,ang2,xA,yA,sphere,vertices,vertices1,vertices2,x1,y1,line1,line2,line3,line4,Cang1,CT2;
          if(ang<=180){
              Cang=ang;
          }else{
              Cang=ang-360;
          }
          CT=this.createCircle(20,'#A1E459',Cang,'θ');

          if(this.radio!=''){
              if(ang!=0 && ang!=90 && ang!=270 && ang!=360){
                  if(ang>0 && ang <90){
                      ang2=(90+ang)*this.BP;
                      k=Math.tan(ang2);
                  }else if(ang>90 && ang<270){
                      ang2=(ang-90)*this.BP;
                      k=Math.tan(ang2);
                  }else if(ang>270 && ang<360){
                      ang2=(ang-270)*this.BP;
                      k=Math.tan(ang2);
                  }
                  xA=125;
                  yA=125*(k-k*Math.cos(ang*this.BP)+Math.sin(ang*this.BP));

                  sphere = new THREE.Mesh(
                      new THREE.SphereGeometry(2,9,9),
                      new THREE.MeshLambertMaterial({ color: 0x6D6EFF })
                  );
                  sphere.position.set(xA,yA,0);

                  vertices1=[];
                  vertices2=[];
                  x1=125*Math.cos(ang*this.BP);
                  y1=125*Math.sin(ang*this.BP);

                  vertices1.push(this.vec3(125,0,0),this.vec3(xA,yA,0));
                  vertices2.push(this.vec3(x1,y1,0),this.vec3(xA,yA,0));

                  line1=this.createLineMesh(vertices1,'#2989ED',2,1.5);

                  line2=this.createLineMesh(vertices2,'#EF2C2C',2,1.5);
                  if(this.radio=='one'){
                      Cang1=180-Math.abs(Cang);
                      CT2=this.createCircle(20,'#A1E459',Cang1,'φ');
                      CT2.position.set(xA,yA,0);
                      if(yA<0){
                          CT2.rotation.z=Math.PI/2;
                      }else{
                          if(k>0){
                              CT2.rotation.z=ang2;
                          }else{
                              CT2.rotation.z=ang2+Math.PI;
                          }
                      }
                  }else{
                      Cang1=Math.abs(Cang);
                      CT2=this.createCircle(20,'#A1E459',Cang1,'φ');
                      CT2.position.set(xA,yA,0);
                      if(yA<0){
                          if(k>0){
                              CT2.rotation.z=ang2;
                          }else{
                              CT2.rotation.z=ang2+Math.PI;
                          }
                      }else{
                          CT2.rotation.z=Math.PI/2;
                      }
                  }

                  vertices=[];
                  vertices.push(this.vec3(0,0,0),this.vec3(50,0,0));
                  line3=this.createLineMesh(vertices,'#2989ED',2,1.5);
                  line3.position.set(xA,yA,0);

                  line4=this.createLineMesh(vertices,'#EF2C2C',2,1.5);
                  line4.position.set(xA,yA,0);

                  if(yA<0){
                      line3.rotation.z=-Math.PI/2;
                  }else{
                      line3.rotation.z=Math.PI/2;
                  }
                  if(k<0){
                      line4.rotation.z=Math.PI+ang2;
                  }else{
                      line4.rotation.z=ang2;
                  }
                  OBJ.add(sphere,line1,line2,line3,line4,CT2);
              }else if(ang==90){
                  vertices=[];
                  vertices.push(this.vec3(0,125,0),this.vec3(175,125,0));
                  line4=this.createLineMesh(vertices,'#EF2C2C',2,1.5);

                  CT2=this.createCircle(20,'#A1E459',90,'𝜑');
                  CT2.position.set(125,125,0);
                  if(this.radio=='two'){
                      CT2.rotation.z=Math.PI/2;
                  }
                  OBJ.add(line4,CT2);
              }else if(ang==270){
                  vertices=[];
                  vertices.push(this.vec3(125,0,0),this.vec3(125,-175,0));
                  line3=this.createLineMesh(vertices,'#2989ED',2,1.5);

                  vertices=[];
                  vertices.push(this.vec3(0,-125,0),this.vec3(175,-125,0));
                  line4=this.createLineMesh(vertices,'#EF2C2C',2,1.5);

                  CT2=this.createCircle(20,'#A1E459',90,'𝜑');
                  CT2.position.set(125,-125,0);
                  if(this.radio=='one'){
                      CT2.rotation.z=Math.PI/2;
                  }
                  OBJ.add(line3,line4,CT2);
              }
          }
          OBJ.add(CT);
          scene.add(OBJ);
      },
    },
    mounted(){
        this.init();
        window.onresize=()=>{
            this.setSideStyle();
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
</style>
