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
        <ui-slider :label="['0°','360°']" :min="0" :max="360" title="绘制" ref="slider" v-model="value"  formatter="{value}°"></ui-slider>
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
        title: '椭圆的参数方程',
        BtnSpaceStyle: 'flex',
        value:45,
        valueO:45,
        angle:45,
        blue: '',
        isFirst:true
      }
    },
    created(){
      document.title = this.title;
    },
    mounted(){
      //禁止选择
      document.onselectstart = function () {
        return false;
      };
      this.setSideStyle();
      this.init();
      window.onresize = () => {
        // this.mainWidth = $('#renderCanvas').width();
        // this.mainHeight = $('#renderCanvas').height();
        var cW = $('canvas').width();
        var cH = $('canvas').height();
        $('canvas').css({
          'left': ($('#renderCanvas').width() - cW) / 2 + 'px',
          'top': ($('#renderCanvas').height() - cH) / 2 + 'px'
        });
      };
    },
    computed: {},
    watch: {},
    methods: {

      init(){
          var scene = null,
              camera = null,
              renderer = null,
              mainWidth = null,
              mainHeight = null,
              obj = null,
              axis = null,
              isMob = null;
            

          var createScene = ()=>{
            isMob = /iPad|Android/g.test(navigator.userAgent);
            if (isMob) {
                renderer = new THREE.WebGLRenderer({antialias: true});
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
            camera.lookAt(scene.position);
            scene.add(camera);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(0xffffff);
            renderer.setSize(mainWidth, mainHeight);
            $("#renderCanvas").append(renderer.domElement);
          };
          var vec3 = (x,y,z)=>{
             return new THREE.Vector3(x, y, z);
          };

          var createLineMesh = (vertices, color, style,width) => {
            var lineMesh = null, geometryLine = new THREE.Geometry();
            if (!color) {
              color = '#000';
            }
            if(!width){
              width = 1;
            }
            if (style == 2) {
              geometryLine.vertices = vertices;
              geometryLine.computeLineDistances();
              lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                dashSize: 5,
                gapSize: 5,
                depthTest: false,
                linewidth:width
              }));
            } else if (style == 3) {
              geometryLine.vertices = vertices;
              lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color,linewidth:width}));
            }
            return lineMesh;
          };

          var createTriangleFace = (vertices, color) => {
            var material = new THREE.MeshBasicMaterial({color: color});
            var geom = new THREE.Geometry();
            geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
            geom.vertices = vertices;
            var mesh = new THREE.Mesh(geom, material);
            return mesh;
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
          var createAxis = () => {
            axis = new THREE.Group();
            labelAxis(-400, 40, 400);
            drawAxisArrow(vec3(-450, 0, 0), vec3(450, 0, 0), 0x000000, 1);
            drawAxisArrow(vec3(0, -450, 0), vec3(0, 450, 0), 0x000000, 2);
            scene.add(axis);
          };
          var labelAxis = (start, stepSize, stop) => {
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

                var line = createLineMesh(vertices, '#000000', 3, 2);
                axis.add(line);
            }
            // label y axis:
            for (var i = start; i <= stop; i = i + stepSize) {
                if (i == 0) {
                    continue;
                }
                text = new SpriteText2D(i / 40, textStyle);
                text.position.x = -15;
                text.position.y = i + 7;
                text.position.z = 0.2;
                axis.add(text);

                vertices = [];
                vertices.push(vec3(0, i, 0));
                vertices.push(vec3(10, i, 0));

                line = createLineMesh(vertices, '#000000', 3, 2);
                axis.add(line);
            }
            axis.add(text);
          };
          var drawAxisArrow = (origin, dir, color, style) => {
              var geometryLine = new THREE.Geometry();
              var vertices = [];
              vertices.push(origin);
              vertices.push(dir);
              geometryLine.vertices = vertices;
              var line = createLineMesh(geometryLine.vertices, color, 3, 2);
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
                  text = createText('x', dir.x, -5, 0, '#000', 28);
                  axis.add(text);
                  text = createText('0', -14, -2, 0, '#000', 18);
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
                  text = createText('y', 20, dir.y + 10, 0, '#000', 28)
                  axis.add(text);
              }
          };
          var createCircle = (vertices, radius, color, end) => {
            var CircleM = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 1});
            if (!end) {
                end = Math.PI * 2;
                var CircleM = new THREE.MeshBasicMaterial({color: color});
            }
            var CircleG = new THREE.CircleGeometry(radius, 50, 0, end);
            var Circle = new THREE.Mesh(CircleG, CircleM);
            Circle.position.x = vertices[0];
            Circle.position.y = vertices[1];
            Circle.position.z = vertices[2];
            return Circle;
          };
          var createObj = () => {
            var vertices = [];
            for(var i=0;i<361;i=i+4){
                vertices.push(new THREE.Vector3(240*Math.cos(i*Math.PI/180),240*Math.sin(i*Math.PI/180),2));
            }
            var circleBig = createLineMesh(vertices,'#299AED',3,3);
            vertices = [];
            for(var i=0;i<361;i=i+4){
                vertices.push(new THREE.Vector3(160*Math.cos(i*Math.PI/180),160*Math.sin(i*Math.PI/180),2));
            }
            var circleSmall = createLineMesh(vertices,'#299AED',3,3);
            scene.add(circleBig,circleSmall);
          };
          var createEllipse = () => {
            if(obj){
              scene.remove(obj);
            }
            obj = new THREE.Object3D();
            var pointB = [0,0,0], pointS = [0,0,0], vertices = [];
            pointB[0] = 240*Math.cos(this.angle*Math.PI/180);
            pointB[1] = 240*Math.sin(this.angle*Math.PI/180);
            pointS[0] = 160*Math.cos(this.angle*Math.PI/180);
            pointS[1] = 160*Math.sin(this.angle*Math.PI/180);
            vertices.push(vec3(0,0,1));
            vertices.push(vec3(pointB[0],pointB[1],1));
            var line  = createLineMesh(vertices,'#ea6a37',3,2);

            vertices = [];
            vertices.push(vec3(240*Math.cos(this.angle*Math.PI/180),0,1));
            vertices.push(vec3(240*Math.cos(this.angle*Math.PI/180),160*Math.sin(this.angle*Math.PI/180),1));
            vertices.push(vec3(0,160*Math.sin(this.angle*Math.PI/180),1));
            var line1  = createLineMesh(vertices,'#7ED321',2,1);

            vertices = [];
            vertices.push(vec3(160*Math.cos(this.angle*Math.PI/180),0,1));
            vertices.push(vec3(160*Math.cos(this.angle*Math.PI/180),160*Math.sin(this.angle*Math.PI/180),1));
            var line2  = createLineMesh(vertices,'#000',2,1);

            vertices = [];
            vertices.push(vec3(0,240*Math.sin(this.angle*Math.PI/180),1));
            vertices.push(vec3(240*Math.cos(this.angle*Math.PI/180),240*Math.sin(this.angle*Math.PI/180),1));
            var line3  = createLineMesh(vertices,'#000',2,1);

            vertices = [];
            vertices.push(vec3(240*Math.cos(this.angle*Math.PI/180),240*Math.sin(this.angle*Math.PI/180),1));
            vertices.push(vec3(240*Math.cos(this.angle*Math.PI/180),160*Math.sin(this.angle*Math.PI/180),1));
            var line4  = createLineMesh(vertices,'#000',2,1);
            //画M点
            var groupM = new THREE.Object3D();
            var circleM = createCircle([0,0,0],6,"#6D68FF");
            vertices = [];
            for(var i=0;i<361;i=i+4){
                vertices.push(new THREE.Vector3(6*Math.cos(i*Math.PI/180),6*Math.sin(i*Math.PI/180),2));
            }
            var mM = createLineMesh(vertices,'#000000',3,1);
            
            groupM.add(circleM,mM);
            groupM.position.x = 240*Math.cos(this.angle*Math.PI/180)
            groupM.position.y = 160*Math.sin(this.angle*Math.PI/180)
            groupM.position.z = 5;

            vertices = [];
            for(var i = 0; i<this.angle;i++){
              vertices.push(new THREE.Vector3(240*Math.cos(i*Math.PI/180),160*Math.sin(i*Math.PI/180),3));
            }
            if(this.angle !=0) {
              var ellipse = createLineMesh(vertices,'#6D68FF',3,2);
              obj.add(ellipse);
            }
            
            obj.add(line,groupM,line1,line2,line3,line4);
            scene.add(obj);
          };
          var animate = () => {
            requestAnimationFrame(animate);
            //this.controls.update();
            renderer.clear();
            //面和实线场景
            renderer.render(scene, camera);
            //虚线场景
            if(this.value!=this.valueO){
              this.angle = this.value;
              createEllipse();
            }else{
              return;
            }
            this.valueO=this.value;
          };
          if(this.isFirst){
            createScene();
            animate();
            createAxis();
            createObj();
            createEllipse();
            this.isFirst = false;
          }
          
      },


      
      //计算侧边
      setSideStyle(){
        const el = document.getElementById('btn_space');
        if (el && el.scrollHeight > el.offsetHeight) {
          this.BtnSpaceStyle = 'block'
        } else {
          this.BtnSpaceStyle = 'flex'
        }
      },
      
      //重置
      resetWidget(){
        this.angle = 45;
        this.value = 45;
        this.init();
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

  /*ui*/
  .UI-camera {
    width: 80px;
    height: 80px;
    cursor: this.pointer;
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
</style>
