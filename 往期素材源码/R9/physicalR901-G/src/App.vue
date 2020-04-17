<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="render">
        <div id="renderCanvas" :style="'zoom:'+zoomF">
          <ui-btn type="play" v-model="played" :style="'zoom:2;position:absolute;right:30px;bottom:35px;z-index:999;'"></ui-btn>
          <div id="time" style="position: absolute;top:-10px;right:60px;z-index: 999;width:170px;height:100px;line-height: 100px;font-size: 40px;">
            <div style="font-size:50px;text-align:center;width:100px;height:100px;line-height: 100px;display:inline-block;background: #FFFFFF;border: 0 solid rgba(0,0,0,1);box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);border-radius: 6px;">
              {{time}}
            </div> 秒
          </div>
          <div id="zl" style="width:160px;height:80px;line-height:80px;text-align:center;font-size:50px;position:absolute;top:138px;left:0;right:0;margin:0 auto;z-index:999;">{{value2}}kg</div>
          <div id="bg" style="width:1000px;height:518px;position:absolute;bottom:50px;left:0;right:0;margin:0 auto;z-index:999;background: transparent;border: 0 solid rgba(0,0,0,1);box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);border-radius: 6px;"></div>
          <div id="car" style="width:193px;height:156px;position:absolute;top:107px;left:0;right:0;margin:0 auto;z-index:999;background: transparent;">
            <img src="static/img/car.png" alt=""></div>
        </div>
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
      <div id="btn_space" class="btn_space" :class="{opc:opc}" :style="'display:'+BtnSpaceStyle">
        <div :style="'width:240px;height:216px;background: #FFFFFF;border: 1 solid rgba(0,0,0,0.06);box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08);border-radius: 6px;'">
          <ui-slider :label="['0N','1N']" :min="0" :max="1" :title="'推力'" :interval="0.01" :speed="0"
                     class="slider slider1"  :noBlueProcess="false" v-model="value1" :style="'border:none;box-shadow:none;'"></ui-slider>
          <ui-slider :label="['0.2kg','1kg']" :min="0.2" :max="1" :title="'质量'" :interval="0.01" :speed="0"
                    class="slider"  :noBlueProcess="false" v-model="value2" :style="'border:none;box-shadow:none;'"></ui-slider>
        </div>
        <ui-btn :type="blue1" size="big" @click.native="choose(1)" :style="'margin:15px 0 15px;'">绘制 a-F 曲线</ui-btn>
        <ui-btn type="switch" v-show="blue1!=''" v-model="switch_checked1" :style="'margin-bottom:12px;'">描点</ui-btn>
        <ui-btn type="switch" v-show="blue1!=''" :class="{opc:opc1}" v-model="switch_checked2">绘制</ui-btn>
        <ui-btn :type="blue2" size="big" @click.native="choose(2)" :style="'margin:15px 0 15px;'">绘制 a-m 曲线</ui-btn>
        <ui-btn type="switch" v-show="blue2!=''" v-model="switch_checked3" :style="'margin-bottom:12px;'">描点</ui-btn>
        <ui-btn type="switch" v-show="blue2!=''" :class="{opc:opc1}" v-model="switch_checked4">绘制</ui-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  import uiGroup from '@/components/UI/uiGroup';//单选组
  import uiSlider from '@/components/UI/uiSlider';//滑块
  var SET=null;
  export default {
    name: 'app',
    components: {uiHead, uiBtn, uiGroup, uiSlider},
    data() {
      return {
        title: '加速度与力、质量的关系',
        BtnSpaceStyle: 'block',
        value1:0,
        value2:0.2,
        zoomF:1,
        played:true,
        blue1:'blue',
        blue2:'',
        switch_checked1:false,
        switch_checked2:false,
        switch_checked3:false,
        switch_checked4:false,
        time:0,
        chooseN:0,
        S:0,
        drawF:false,
        opc:false,
        opc1:true
      }
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
      // $('.slider1').append('<div class="sliderP"><div class="blueLine"></div></div>');
      // this.countWidth(0);
    },
    watch: {
      value1(value) {
        // this.countWidth(value);
          clearTimeout(SET);
          this.time=0;
          this.played=true;
          this.TO.resetKDP();
          this.drawF=false;
          this.switch_checked2=false;
          this.switch_checked4=false;
          if(this.blue2=='blue'){
              this.TO.clearPoint();
          }
      },
      value2(value) {
          clearTimeout(SET);
          this.time=0;
          this.played=true;
          this.drawF=false;
          this.TO.resetKDP();
          this.switch_checked2=false;
          this.switch_checked4=false;
          if(this.blue1=='blue'){
              this.TO.clearPoint();
          }
      },
      played(value){
          if(!value){
            this.opc=true;
            this.TO.animate();
          }else{
            clearTimeout(SET);
            this.opc=false;
            if(this.drawF){
               return;
            }
            if(this.blue1=='blue' && this.switch_checked1){
                this.TO.drawPoint1();
            }else if(this.blue2=='blue' && this.switch_checked3){
                this.TO.drawPoint2();
            }
          }
      },
      switch_checked1(v){
          if(!v){
              this.switch_checked2=false;
              this.opc1=true;
          }else{
              this.opc1=false;
          }
      },
      switch_checked2(v){
          if(v){
            this.TO.drawLine();
          }else{
            this.TO.clearLine();
          }
      },
      switch_checked3(v){
          if(!v){
              this.switch_checked4=false;
              this.opc1=true;
          }else{
              this.opc1=false;
          }
      },
      switch_checked4(v){
          if(v){
            this.TO.drawLine();
          }else{
            this.TO.clearLine();
          }
      }
    },
    methods: {
      choose(num){
          if(num==this.chooseN){
              return;
          }
          this.TO.clearPoint();
          this.TO.resetKDP();
          this.TO.showFm(num);
          this.switch_checked1=false;
          this.switch_checked2=false;
          this.switch_checked3=false;
          this.switch_checked4=false;
          this.chooseN=num;
          this.drawF=false;
          if(num==1){
              this.blue1='blue';
              this.blue2='';
          }else if(num==2){
              this.blue1='';
              this.blue2='blue';
          }
      },
      //滑动条移动蓝条
      // countWidth(v) {
      //   let dis = Math.abs(0 - v);
      //   $('.blueLine').css('width', dis / 20 * 195);
      //   if (v > 0) {
      //     $('.blueLine').css({
      //       'left': 1 / 2 * 195,
      //       'right': ''
      //     });
      //   } else {
      //     $('.blueLine').css({
      //       'left': '',
      //       'right': 1 / 2 * 195
      //     });
      //   }
      // },
      //计算侧边
      setSideStyle() {
        // const el = document.getElementById('btn_space');
        // if (el && el.scrollHeight > el.offsetHeight) {
        //   this.BtnSpaceStyle = 'block'
        // } else {
        //   this.BtnSpaceStyle = 'flex'
        // }
        var W=$('#render').width();
        var H=$('#render').height();
        if(W/H>1480/1060){
            this.zoomF=H/1060;
        }else{
            this.zoomF=W/1480;
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
          stepNumber = null,
          isMob = /iPad|Android/g.test(navigator.userAgent);
        if (isMob) {
          renderer = new THREE.WebGLRenderer({
            antialias: true
          });
          stepNumber = 1;
        } else {
          stepNumber =8;
          renderer = new THREE.CanvasRenderer();
        }
        mainWidth = $('#renderCanvas').width();
        mainHeight = $('#renderCanvas').height();
        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(mainWidth/-1.9,mainWidth/1.9,mainHeight/1.9,mainHeight/-1.9,1,10000);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 1200;
        camera.lookAt(scene.position);
        scene.add(camera);
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
        //平面
        var creatPlane = (width,height,src,f) =>{
          var geometry = new THREE.PlaneBufferGeometry( width, height);
          var material;
          if(f){
              material = new THREE.MeshBasicMaterial( {
                  transparent:true,
                  color:'#fff'
              });
          }else{
              material = new THREE.MeshBasicMaterial( {
                  transparent:true,
                  map: THREE.ImageUtils.loadTexture(src)
              });
          }
          var plane = new THREE.Mesh( geometry, material );
          return plane;
        };
        var createLineMesh = (vertices, color, style, width) => {
          var lineMesh = null,geometryLine = new THREE.Geometry();
          if (style == 2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            var M=new THREE.LineDashedMaterial({
              color: color,
              dashSize: 10,
              gapSize: 10,
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
        var createText = (texts, x, y, z, color, size) => {
          var SpriteText2D = THREE_Text.SpriteText2D;
          var textAlign = THREE_Text.textAlign;
          var textStyle = {
            align: textAlign.center,
            font: size + 'px "Cambria Italic"',
            fillStyle: color,
            antialias: true,
          };
          var text = new SpriteText2D(texts, textStyle);
          text.position.set(x, y, z+2);
          return text;
        };
        var createTriangleFace = (vertices, color) => {
          var material = new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.DoubleSide
          });
          var geom = new THREE.Geometry();
          geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
          geom.vertices = vertices;
          var mesh = new THREE.Mesh(geom, material);
          return mesh;
        };
        var createCircle=(x,y)=>{
            var CircleG = new THREE.CircleGeometry(6, 36);
            var CircleM = new THREE.MeshBasicMaterial({color: '#f00'});
            var Circle = new THREE.Mesh(CircleG, CircleM);
            Circle.position.x = x-400;
            Circle.position.y = y-420;
            Circle.position.z = 8;
            return Circle;
        }
        var kd=new THREE.Group();
        var textF=new THREE.Group(),textm=new THREE.Group();
        var XY=new THREE.Group();
        var createBase=()=>{
            //坐标轴
            var vertices=[];
            vertices.push(vec3(0,350,8),vec3(0,0,8),vec3(750,0,8));
            var linexy=createLineMesh(vertices,'#000',3,3);

            vertices=[];
            vertices.push(vec3(0,0,8),vec3(10,0,8));
            var linek=createLineMesh(vertices,'#000',3,2);
            for(var i=0;i<6;i++){
                var line=linek.clone();
                line.position.y=60*i;
                XY.add(line);
                if(i!=0){
                    var text=createText(i,-20,i*60+22,0,'#000',30);
                    XY.add(text);
                }
            }

            for(var i=0;i<11;i++){
                linek.rotation.z=Math.PI/2;
                var line=linek.clone();
                line.position.x=70*i;
                XY.add(line);
                if(i!=0){
                    var text=createText((i*0.1).toFixed(1),i*70,0,0,'#000',30);
                    XY.add(text);
                }
            }
            vertices=[];
            vertices.push(vec3(-8,350,8),vec3(8,350,8),vec3(0,380,8));
            var V1=createTriangleFace(vertices,'#000');

            vertices=[];
            vertices.push(vec3(750,8,8),vec3(750,-8,8),vec3(780,0,8));
            var V2=createTriangleFace(vertices,'#000');

            var texta=createText('a/',-30,440,8,'#000',50);
            var textms=createText('m s',30,430,8,'#000',40);
            var textd=createText('•',37,420,8,'#000',30);
            var text2=createText('-2',75,430,8,'#000',20);


            var tF=createText('F/',810,40,8,'#000',50);
            var tN=createText('N',850,30,8,'#000',40);
            textF.add(tF,tN);

            var tm=createText('m/',820,40,8,'#000',50);
            var tkg=createText('kg',875,30,8,'#000',40);
            textm.add(tm,tkg);

            textm.visible=false;

            XY.add(linexy,V1,V2,texta,textd,textms,text2,textF,textm);
            XY.position.set(-400,-420,0);

            scene.add(XY);

//            var car=creatPlane(193,156,'./static/img/car.png');
//            car.position.y=360;
            // var bg=creatPlane(1070,538,'./static/img/bg.png');
            // bg.position.y=-260;

            var bgm1=creatPlane(300,3000,'',true);
            var bgm2=bgm1.clone();
            bgm1.position.set(-800,0,10);
            bgm2.position.set(800,0,10);

            scene.add(bgm1,bgm2);
            var vertices=[];
            vertices.push(vec3(-700,0,0),vec3(90000,0,0));
            var lbase=createLineMesh(vertices,'#000',3,3);
            kd.add(lbase);
            vertices=[];
            vertices.push(vec3(0,0,0),vec3(0,-15,0));
            var l=createLineMesh(vertices,'#000',3,3);
            vertices=[];
            vertices.push(vec3(0,0,0),vec3(0,-8,0));
            var l1=createLineMesh(vertices,'#000',3,3);
            for(var i=0;i<90000;i+=300){
                var lc=l.clone();
                lc.position.x=i;
                for(var j=1;j<=9;j++){
                    var lx=l1.clone();
                    lx.position.x=i+j*30;
                    kd.add(lx);
                }
                var text=createText(i/300+'m',i,-20,0,'#000',50);
                kd.add(lc,text);
            }
            kd.position.y=280;
            scene.add(kd)

        }
          createBase();

        var pointXY,point,pointN=0;
        var clearPoint=()=>{
            cancelAnimationFrame(SETA);
            scene.remove(point,lineTX);
            point=new THREE.Group();
            pointXY=[];
            pointN=0;
            scene.add(point);
        }
        clearPoint();

        var drawPoint1=()=>{
            pointN++;
            var x=this.value1*700;
            var y=this.value1/this.value2*60;
            for(var i in pointXY){
                if(x==pointXY[i][x]){
                    return;
                }
            }
            pointXY.push({x:x,y:y});
            var P=createCircle(x,y);
            point.add(P);
            this.drawF=true;
        }
        var drawPoint2=()=>{
            pointN++;
            var x=this.value2*700;
            var y=this.value1/this.value2*60;
            for(var i in pointXY){
                if(x==pointXY[i][x]){
                    return;
                }
            }
            pointXY.push({x:x,y:y});
            var P=createCircle(x,y);
            point.add(P);
            this.drawF=true;
        }
        var SETA=null;
        var lineTX=new THREE.Group();
        var drawLine=()=> {
            scene.remove(lineTX);
            lineTX = new THREE.Group();
            lineTX.position.set(-400,-420,0);
            scene.add(lineTX);
            if (pointXY.length < 2) {
                return;
            }
            function compare(propertyName) {
                return function (object1, object2) {
                    var value1 = object1[propertyName];
                    var value2 = object2[propertyName];
                    if (value2 < value1) {
                        return 1;
                    } else if (value2 > value1) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            }

            //使用方法
            pointXY.sort(compare("x"));
            var xs = pointXY[0].x/700-0.05;
            var xe = pointXY[pointXY.length - 1].x/700+0.05;
            xs=xs<0?0:xs;
//            xe=xe>1?1:xe;
            var step = (xe - xs) / 50;
            var i = 0;
            var m=this.value2;
            var F=this.value1;
            var an = () => {
                if (i == 50) {
                    cancelAnimationFrame(SETA);
                    return;
                }
                var xn1=xs+step*i;
                var xn2=xs+step*(i+1);
                if (this.blue1 == 'blue') {
                  var x1=xn1*700;
                  var y1=xn1/m*60;
                  var x2=xn2*700;
                  var y2=xn2/m*60
                } else if (this.blue2 == 'blue') {
                  var x1=xn1*700;
                  var y1=F/xn1*60;
                  var x2=xn2*700;
                  var y2=F/xn2*60;
                }
                i++;
                var vertices = [];
                vertices.push(vec3(x1, y1, 7), vec3(x2, y2, 7));
                var line=createLineMesh(vertices,'#4A90E2',3,5);
                lineTX.add(line);
                SETA = requestAnimationFrame(an);
            }
            an();
        }
        var clearLine=()=>{
            scene.remove(lineTX);
        }
        var resetKDP=()=>{
            kd.position.x=0;
            this.time=0;
        }
        var showFm=(num)=>{
            if(num==1){
                textF.visible=true;
                textm.visible=false;
            }else{
                textF.visible=false;
                textm.visible=true;
            }
        }

        var animate=()=>{
            var a=this.value1/this.value2;
            if(this.time==10){
                kd.position.x=0;
                this.time=0;
            }
            var an=()=>{
                SET=setTimeout(()=>{
                    this.time+=0.1;
                    this.time=(this.time).toFixed(1)*1;
                    this.S=a*(this.time*this.time)/2*300;
                    kd.position.x=-this.S;
                    if(this.time==10){
                        clearTimeout(SET);
                        this.played=true;
                        return;
                    }
                    an();
                },100)
            }
            an();
        }

        //重置
        var resetWidget = () => {
            this.value1=0;
            this.value2=0.2;
            this.switch_checked1=false;
            this.switch_checked2=false;
            this.switch_checked3=false;
            this.switch_checked4=false;
            this.chooseN=0;
            this.blue1='blue';
            this.blue2='';
            this.time=0;
            this.S=0;
            this.drawF=false;
            this.opc=false;
            this.played=true;
            cancelAnimationFrame(SETA);
            clearTimeout(SET);
            clearPoint();
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
            reset: resetWidget,
            animate:animate,
            resetKDP:resetKDP,
            showFm:showFm,
            clearPoint:clearPoint,
            drawPoint1:drawPoint1,
            drawPoint2:drawPoint2,
            drawLine:drawLine,
            clearLine:clearLine
          }
        };
        return TO();
      },

      //重置
      resetWidget() {
        this.TO.reset();
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
    width: calc(100% - 280px);
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
    width: 280px;
    height: 100%;
    z-index: 999;
    position: absolute;
    right: 0;
    background: #F7F7F7;
    box-shadow: 0 0 0 0 rgba(0,0,0,0.12);
  }

  .container>div {
    overflow: hidden;
    width: 100%;
    height: calc(100% - 72px);
    position: relative;
  }
  #renderCanvas{
    width:1480px;
    height:1060px;
    position:absolute;
    top:0;
    bottom:0;
    right:0;
    left:0;
    margin: auto;
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
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
  }
  .btn_space.opc{
    pointer-events: none;
    opacity: 0.5;
  }
  .blueLine{
    position: absolute;
    height: 6px;
    width: calc(3 / 20 * 195px);
    background: #5caefd;
    top: 4px;
  }
  .slider > div.sliderP{
    position: absolute;
    background: transparent;
    top: 76px;
    width: calc(100% - 44px);
    height: 14px;
    z-index: 1
  }
  .opc{
    pointer-events: none;
    opacity: 0.5;
  }
</style>
