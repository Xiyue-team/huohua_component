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
        <ui-slider :label="['0','5']"
                   :interval="0.1"
                   title="离心率e"
                   v-model="value1"
                   :min="0"
                   :max="5"
                   :speed ="0"
                   :infinity="true"
                   :style="'margin-bottom:20px'"></ui-slider>
        <ui-slider :max="360" title="绘制" :tooltip="false" :speed ="0" ref="slider"v-model="value2"></ui-slider>
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
    components: {uiHead, uiBtn, uiSlider},
    data(){
      return {
        title: '圆锥曲线的第三定义',
        BtnSpaceStyle: 'flex',
        value1:1.2,
        value2:0,
        scene:null,
      }
    },
    created(){
      document.title = this.title;
    },
    watch:{
      value1(){
        this.draw();
      },
      value2(){
        this.draw();
      }
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
      draw(){
        var a,b,r,e=this.value1,ang=this.value2;
        while(this.scene.children.length!=6){
            for(var c in this.scene.children){
                if(c>=6){
                    this.scene.remove(this.scene.children[c]);
                }
            }
        }
        if(ang==0){
            return;
        }
        if(e==0){
            r=120;
            var vertices=[];
            for(var i=0;i<=ang;i++){
                var x=r*Math.cos(i*Math.PI/180);
                var y=r*Math.sin(i*Math.PI/180);
                vertices.push(new THREE.Vector3(x, y, 1));
            }
            var L=this.createLineMesh(vertices,'#6BCD00',3,1.5);
            this.scene.add(L);

            var xm=r*Math.cos(ang*Math.PI/180);
            var ym=r*Math.sin(ang*Math.PI/180);

        }else if(e>0 && e<1){
            a=120;
            b=a*Math.sqrt(1-e*e);
            var vertices=[];
            for(var i=0;i<=ang;i++){
                var x=a*Math.cos(i*Math.PI/180);
                var y=b*Math.sin(i*Math.PI/180);
                vertices.push(new THREE.Vector3(x, y, 1))
            }
            var L=this.createLineMesh(vertices,'#6BCD00',3,1.5);
            this.scene.add(L);

            var xm=a*Math.cos(ang*Math.PI/180);
            var ym=b*Math.sin(ang*Math.PI/180);

        }else if(e==1){
            var x=2.9*40;
            if(ang/90>3){
              x=x/90*(ang-270);
            }else if(ang/90>2){
              x=x/90*(ang-180)-x;
            }else if(ang/90>1){
              x=-x/90*(ang-90);
            }else if(ang/90>0){
              x=x-x/90*ang;
            }
            var CM=this.createCircle(5,'#6D68FF');
            CM.position.set(x,0,2);
            var textP=this.createText('P',x-20, 40, 5 , '#6D68FF', 24);
            this.scene.add(CM,textP);
        }else if(e>1) {
            a = 120;
            b = a * Math.sqrt(e * e - 1);
            if (ang >= 0 && ang < 90) {
                var vertices = [];
                for (var i = 0; i <= ang; i++) {
                    var x = a / Math.cos(i * Math.PI / 180);
                    var y = b * Math.tan(i * Math.PI / 180);
                    vertices.push(new THREE.Vector3(x, y, 1))
                }
                var L = this.createLineMesh(vertices, '#6BCD00', 3, 1.5);
                this.scene.add(L);
            } else if (ang > 90 && ang < 270) {
                var vertices = [];
                for (var i = 0; i < 90; i++) {
                    var x = a / Math.cos(i * Math.PI / 180);
                    var y = b * Math.tan(i * Math.PI / 180);
                    vertices.push(new THREE.Vector3(x, y, 1))
                }
                var L = this.createLineMesh(vertices, '#6BCD00', 3, 1.5);
                this.scene.add(L);
                var vertices = [];
                for (var i = 91; i <= ang; i++) {
                    var x = a / Math.cos(i * Math.PI / 180);
                    var y = b * Math.tan(i * Math.PI / 180);
                    vertices.push(new THREE.Vector3(x, y, 1))
                }
                var L = this.createLineMesh(vertices, '#6BCD00', 3, 1.5);
                this.scene.add(L);
            } else if (ang > 270 && ang <= 360) {
                var vertices = [];
                for (var i = 0; i < 90; i++) {
                    var x = a / Math.cos(i * Math.PI / 180);
                    var y = b * Math.tan(i * Math.PI / 180);
                    vertices.push(new THREE.Vector3(x, y, 1))
                }
                var L = this.createLineMesh(vertices, '#6BCD00', 3, 1.5);
                this.scene.add(L);
                var vertices = [];
                for (var i = 91; i < 270; i++) {
                    var x = a / Math.cos(i * Math.PI / 180);
                    var y = b * Math.tan(i * Math.PI / 180);
                    vertices.push(new THREE.Vector3(x, y, 1))
                }
                var L = this.createLineMesh(vertices, '#6BCD00', 3, 1.5);
                this.scene.add(L);
                var vertices = [];
                for (var i = 271; i <= ang; i++) {
                    var x = a / Math.cos(i * Math.PI / 180);
                    var y = b * Math.tan(i * Math.PI / 180);
                    vertices.push(new THREE.Vector3(x, y, 1))
                }
                var L = this.createLineMesh(vertices, '#6BCD00', 3, 1.5);
                this.scene.add(L);
            }
            if(ang==90){
                ang=89;
            }else if(ang==270){
                ang=269;
            }

            var xm=a/Math.cos(ang*Math.PI/180);
            var ym=b*Math.tan(ang*Math.PI/180);

        }
        if(e!=1){
            var kA=ym/(xm+120);
            var angA=Math.atan(kA);
            var kB=ym/(xm-120);
            var angB=Math.atan(kB);

            vertices=[];
            vertices.push(new THREE.Vector3(0, 0, 2),new THREE.Vector3(160, 0, 2));
            var LA1=this.createLineMesh(vertices,'#EF732C',3,3);
            LA1.rotation.z=angA;
            vertices=[];
            vertices.push(new THREE.Vector3(0, 0, 2),new THREE.Vector3(160, 0, 2));
            var LA2=this.createLineMesh(vertices,'#EF732C',3,3);
            LA2.rotation.z=angA+Math.PI;
            if(kA!='Infinity' && kA!='-Infinity'){
                this.scene.add(LA1,LA2);
            }

            vertices=[];
            vertices.push(new THREE.Vector3(0, 0, 2),new THREE.Vector3(160, 0, 2));
            var LB1=this.createLineMesh(vertices,'#299AED',3,3);
            LB1.rotation.z=angB;
            vertices=[];
            vertices.push(new THREE.Vector3(0, 0, 2),new THREE.Vector3(160, 0, 2));
            var LB2=this.createLineMesh(vertices,'#299AED',3,3);
            LB2.rotation.z=angB+Math.PI;
            if(kB!='Infinity' && kB!='-Infinity'){
                this.scene.add(LB1,LB2);
            }

            if(e<1){
                LA1.position.set(xm,ym,2);
                LA2.position.set(-120,0,2);

                LB2.position.set(xm,ym,2);
                LB1.position.set(120,0,2);
            }else{
                if(x>0){
                    LA1.position.set(xm,ym,2);
                    LA2.position.set(-120,0,2);

                    LB1.position.set(xm,ym,2);
                    LB2.position.set(120,0,2);
                }else{
                    LA2.position.set(xm,ym,2);
                    LA1.position.set(-120,0,2);

                    LB2.position.set(xm,ym,2);
                    LB1.position.set(120,0,2);
                }
            }
            vertices=[];
            vertices.push(new THREE.Vector3(xm, ym, 2),new THREE.Vector3(-120, 0, 2));
            var LA=this.createLineMesh(vertices,'#EF732C',3,3);
            this.scene.add(LA);

            vertices=[];
            vertices.push(new THREE.Vector3(xm, ym, 2),new THREE.Vector3(120, 0, 2));
            var LB=this.createLineMesh(vertices,'#299AED',3,3);
            this.scene.add(LB);

            var CM=this.createCircle(5,'#6D68FF');
            CM.position.set(xm,ym,3);
            var textP=this.createText('P',xm-20, ym-5, 5 , '#6D68FF', 24);
            this.scene.add(CM,textP);
        }
      },
      createLineMesh:function(vertices, color, style,width) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        if (style == 2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                dashSize: 6,
                gapSize: 6,
                linewidth: width
            }));
        } else if (style == 3) {
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({
                color: color,
                linewidth: width
            }));
        }
        return lineMesh;
      },
      createCircle:function (radius, color) {
        var C=new THREE.Group();
        var CircleM,CircleG;

        CircleM = new THREE.MeshBasicMaterial({color: color});
        CircleG = new THREE.CircleGeometry(radius, 50);
        var Circle = new THREE.Mesh(CircleG, CircleM);
        Circle.position.z=3;

        var vertices=[];
        for(var i=0;i<361;i+=2){
            var x = radius * Math.cos(i * Math.PI / 180);
            var y = radius * Math.sin(i * Math.PI / 180);
            vertices.push(new THREE.Vector3(x, y, 3));
        }
        var Circle1=this.createLineMesh(vertices,'#000', 3,1);
        C.add(Circle,Circle1)
        return C;
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
      //初始化
      init(){
          this.setSideStyle();
          var threeWidth=window.innerWidth-280;
          var threeHeight=window.innerHeight-72;
          this.scene = new THREE.Scene();
          var thiz=this;
          var scene=this.scene;
          var camera = new THREE.PerspectiveCamera(50, threeWidth / threeHeight, 1, 10000);
          camera.position.x = 0;
          camera.position.y = 0;
          camera.position.z = 1200;
          camera.lookAt(scene.position);
          scene.add(camera);
          var renderer=null;
          var isMob = /iPad|Android/g.test(navigator.userAgent);
          if (isMob) {
              renderer = new THREE.WebGLRenderer();
          } else {
              renderer = new THREE.CanvasRenderer();
          }
          renderer.setPixelRatio(window.devicePixelRatio);
          renderer.setClearColor(0xffffff);
          renderer.setSize(threeWidth, threeHeight);
          $("#renderCanvas").append(renderer.domElement);

          var axis = new THREE.Group();
          function vec3(x, y, z) {
              return new THREE.Vector3(x, y, z);
          }
          function createTriangleFace(vertices, color) {
              var material = new THREE.MeshBasicMaterial({color: color});
              var geom = new THREE.Geometry();
              geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
              geom.vertices = vertices;
              var mesh = new THREE.Mesh(geom, material);
              return mesh;
          }
          function createAxis() {
              labelAxis(-400, 40, 400);
              drawAxisArrow(vec3(-450, 0, 0), vec3(450, 0, 0), 0x000000, 1);
              drawAxisArrow(vec3(0, -450, 0), vec3(0, 450, 0), 0x000000, 2);
              scene.add(axis);
          }
          //坐标轴分度线
          function labelAxis(start, stepSize, stop) {
              var SpriteText2D = THREE_Text.SpriteText2D;
              var textAlign = THREE_Text.textAlign;
              var textStyle = {align: textAlign.center, font: '18px "Cambria Math"', fillStyle: '#000000', antialias: true};
              var text = {}, line = null, vertices = null;
              // label x axis:
              for (var i = start; i <= stop; i = i + stepSize) {
                  if (i == 0) {
                      continue;
                  }
                  text = new SpriteText2D(i / 40, textStyle);
//                  text.rotation = camera.rotation;
                  if (i == 0) {
                      text.position.x = i + 10;
                  }
                  else {
                      text.position.x = i;
                  }
                  text.position.y = -5;
                  axis.add(text);
                  vertices = [];

                  vertices.push(vec3(i, 0, 0));
                  vertices.push(vec3(i, 10, 0));

                  // x轴分点线
                  line = thiz.createLineMesh(vertices, '#000000', 3, 2);
                  axis.add(line);
              }
              // label y axis:
              for (var i = start; i <= stop; i = i + stepSize) {
                  if (i == 0) {
                      continue;
                  }
                  text = new SpriteText2D(i / 40, textStyle);
//                  text.rotation = camera.rotation;
                  text.position.x = -15;
                  text.position.y = i + 7;
                  text.position.z = 0.2;
                  axis.add(text);

                  vertices = [];
                  vertices.push(vec3(0, i, 0));
                  vertices.push(vec3(10, i, 0));

                  line = thiz.createLineMesh(vertices, '#000000', 3, 2);
                  axis.add(line);
              }
              axis.add(text);
          }
          //坐标轴
          function drawAxisArrow(origin, dir, color, style) {
              var geometryLine = new THREE.Geometry();
              var vertices = [];
              vertices.push(origin);
              vertices.push(dir);
              geometryLine.vertices = vertices;
              var line = thiz.createLineMesh(geometryLine.vertices, color, 3, 2);
              axis.add(line);
              var text;
              if (style == 1) {
                  vertices = [];
                  vertices.push(vec3(dir.x - 10, 0, 0));
                  vertices.push(vec3(dir.x - 13, 5, 0));
                  vertices.push(vec3(dir.x + 5, 0, 0));
                  var triangle1 = createTriangleFace(vertices, "#000");
                  axis.add(triangle1);
                  vertices = [];
                  vertices.push(vec3(dir.x - 10, 0, 0));
                  vertices.push(vec3(dir.x - 13, -5, 0));
                  vertices.push(vec3(dir.x + 5, 0, 0));
                  var triangle2 = createTriangleFace(vertices, "#000");
                  axis.add(triangle2);
                  text = thiz.createText('x', dir.x, -5, 0, '#000', 28);
                  axis.add(text);
                  text = thiz.createText('O', -14, -2, 0, '#000', 23);
                  axis.add(text);
              } else {
                  vertices = [];
                  vertices.push(vec3(0, dir.y - 10, 0));
                  vertices.push(vec3(5, dir.y - 13, 0));
                  vertices.push(vec3(0, dir.y + 5, 0));
                  var triangle1 = createTriangleFace(vertices, "#000");
                  axis.add(triangle1);
                  vertices = [];
                  vertices.push(vec3(0, dir.y - 10, 0));
                  vertices.push(vec3(-5, dir.y - 13, 0));
                  vertices.push(vec3(0, dir.y + 5, 0));
                  var triangle2 = createTriangleFace(vertices, "#000");
                  axis.add(triangle2);
                  text = thiz.createText('y', 20, dir.y + 10, 0, '#000', 28);
                  axis.add(text);
              }
          }


          createAxis();
          var CA=this.createCircle(5,'#6D68FF');
          CA.position.set(-120,0,3);
          var textA=this.createText('A',-140, 40, 3 , '#6D68FF', 24);
          var CB=this.createCircle(5,'#6D68FF');
          CB.position.set(120,0,3);
          var textB=this.createText('B',140, 40, 3 , '#6D68FF', 24);
          scene.add(CA,CB,textA,textB);

          function renderAll() {
              requestAnimationFrame(renderAll);
              renderer.render(scene, camera);
          }
          renderAll();
      },
      //重置
      resetWidget(){
          while(this.scene.children.length!=6){
              for(var c in this.scene.children){
                  if(c>=6){
                      this.scene.remove(this.scene.children[c]);
                  }
              }
          }
          this.value1=1.2;
          this.value2=0;
      }
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
