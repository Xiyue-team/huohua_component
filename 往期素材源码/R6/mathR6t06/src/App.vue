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
      <ui-btn type="reset1" class="aside_reset"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <ui-slider :label="[-10,10]" :max="10" :min="-10" title="P"  ref="slider" v-model="value"></ui-slider>
        <ui-btn type="switch" v-model="checked" style="margin-top: 20px;">
          生成圆
        </ui-btn>
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
        title: '抛物线中以焦半径为直径的圆',
        BtnSpaceStyle: 'flex',
        value:4,
        p:4,
        point: {
          f : [this.p/2,0,1],
          a : [4,5.65,1],
          l1 : [-this.p/2,12,1],
          l2 : [-this.p/2,-12,1],
          p : [-2,6,1],
          m : [4.5,0,1],
          r : [this.p/2,0,1]
        },
        blue: '',
        checked:false,
        isMob:null,
        isFirst:true,
        valueO:4
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
        this.mainWidth = $('#renderCanvas').width();
        this.mainHeight = $('#renderCanvas').height();
        var cW = $('canvas').width();
        var cH = $('canvas').height();
        $('canvas').css({
          'left': ($('#renderCanvas').width() - cW) / 2 + 'px',
          'top': ($('#renderCanvas').height() - cH) / 2 + 'px'
        });
      };
    },
    computed: {},
    watch: {
      
    },
    methods: {
      init(){
        var scene = null,
            camera = null,
            renderer = null,
            mainWidth = null,
            mainHeight = null,
            a = 2,
            b = 0,
            count = 1,
            obj = null,
            obj1 = null,
            obj2 = null,
            axis = null,
            isMob = null,
            touchA = null,
            selectobjs = [],
            selectobj = null,
            raycaster = new THREE.Raycaster(),
            plane = new THREE.Plane(),
            offset = new THREE.Vector3(),
            intersection = new THREE.Vector3(),
            mouse = new THREE.Vector2(),
            INTERSECTED = null,
            mousedownflag = false;
          

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
          // text.rotation = threeDimension.camera.rotation;
          text.position.set(x, y, z);
          return text;
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
        var createCircle = (vertices, radius, color,start, end,opacity) => {
           if(opacity===undefined){
              opacity = 1;
            }
            var CircleM = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: opacity});
            if(!start){
              start = 0
            }
            if (!end) {
                end = Math.PI * 2;
                var CircleM = new THREE.MeshBasicMaterial({color: color});
            }
            var CircleG = new THREE.CircleGeometry(radius, 50, start, end);
            var Circle = new THREE.Mesh(CircleG, CircleM);
            Circle.position.x = vertices[0];
            Circle.position.y = vertices[1];
            Circle.position.z = vertices[2];
            return Circle;
        };

        var createImg = (vertices,w,src) => {
          var PlaneG = new THREE.PlaneGeometry(w,w);
          var PlaneM = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture(src) ,transparent:true, overdraw : 0.2,depthTest:false} );
          var Plane = new THREE.Mesh(PlaneG, PlaneM);
          Plane.position.x = vertices[0].x; 
          Plane.position.y = vertices[0].y;
          Plane.position.z = vertices[0].z;
          return Plane;
        };

        var createObj1 = () => {
          if(obj != null) {
              scene.remove(obj);
          }
          if(this.p == 0) {
              scene.remove(obj1,obj2);
              return;
          }
          obj = new THREE.Object3D();
          // 画抛物线
          var vertices = [],y;
          if(this.p>0) {
              for (var i = 0; i<11; i+=0.1) {
                  y = Math.pow(2*this.p*i,1/2);
                  vertices.push(vec3(i*40,y*40,1));
              }
              var line1 = createLineMesh(vertices,"#299AED",3,3);

              var vertices = [];

              for (var i = 0; i<11; i+=0.1) {
                  y = Math.pow(2*this.p*i,1/2);
                  vertices.push(vec3(i*40,-y*40,1));
              }
              var line2 = createLineMesh(vertices,"#299AED",3,3);
          } else if(this.p<0) {
              for (var i = 0; i>-11; i-=0.1) {
                  y = Math.pow(2*this.p*i,1/2);
                  vertices.push(vec3(i*40,y*40,1));
              }
              var line1 = createLineMesh(vertices,"#299AED",3,3);

              var vertices = [];

              for (var i = 0; i>-11; i-=0.1) {
                  y = Math.pow(2*this.p*i,1/2);
                  vertices.push(vec3(i*40,-y*40,1));
              }
              var line2 = createLineMesh(vertices,"#299AED",3,3);
          } else {
              return;
          }
          

          //准线
          this.point["l1"][0] = -this.p/2;
          this.point["l2"][0] = -this.p/2;
          if(this.p>7||this.p<-7){
              this.point['l1'][1] = 13;
              this.point['l2'][1] = -13;
          } else {
              this.point['l1'][1] = 12;
              this.point['l2'][1] = -12;
          }
          vertices = [];
          vertices.push(vec3(this.point["l1"][0]*40,this.point["l1"][1]*40,3));
          vertices.push(vec3(this.point["l2"][0]*40,this.point["l2"][1]*40,3));
          var line = createLineMesh(vertices,"#EF732C",3,3);
          var textL = createText("l",-this.p/2*40+15,this.point['l1'][1]*40+20,0,"#6D6EFF",28)
          obj.add(line,line1,line2,textL);
          scene.add(obj);
          createObj();
        };

        var createObj = () => {
          var vertices = [];
          if (obj2 != null) {
              scene.remove(obj2);
              scene.remove(obj1);
              selectobjs = [];
              
          }
          
          obj2 = new THREE.Object3D();
          //求点坐标

          //F点坐标
          this.point['f'][0] = this.p/2; 
          

          //焦点
          var groupF = new THREE.Object3D();
          var circleF = createCircle([,0,2],6,"#6D68FF");
          var circleF = createCircle([0,0,0],6,"#6D68FF");
          vertices = [];
          for(var i=0;i<361;i=i+4){
              vertices.push(new THREE.Vector3(6*Math.cos(i*Math.PI/180),6*Math.sin(i*Math.PI/180),2));
          }
          var fF = createLineMesh(vertices,'#000000',3,1);
          var textF = createText("F",this.point['f'][0]>0?-20:20,-5,0,"#6D6EFF",24)
          groupF.add(circleF,fF,textF);
          groupF.position.x = this.point["f"][0]*40;
          groupF.position.y = 0;
          groupF.position.z = 2;
          
          
          //画准线
          
          //点A
          var groupA = new THREE.Object3D();
          var textA = createText("A",this.point['a'][0]>0?10:-10,this.point['a'][1]>0?50:-25,0,"#6D6EFF",24)
          if(!touchA){
            touchA = createImg([vec3(0,0,0)],52,"static/UI/A@2x.png");
            
          }
          groupA.add(touchA,textA);
          groupA.position.x = this.point["a"][0]*40;
          groupA.position.y = this.point["a"][1]*40;
          groupA.position.z = 2;
          selectobjs.push(touchA);

          //画AF线
          vertices = [];
          vertices.push(vec3(this.point["a"][0]*40,this.point["a"][1]*40,1));
          vertices.push(vec3(this.point["f"][0]*40,this.point["f"][1]*40,1));
          var lineAF = createLineMesh(vertices,"#7ED321",3,2);

          obj2.add(lineAF,groupA,groupF);
          scene.add(obj2);


          //计算M点位置和AF的长度

          obj1 = new THREE.Object3D();
          this.point['m'][0] = (this.point["a"][0]+this.point["f"][0])/2;
          this.point['m'][1] = (this.point["a"][1]+this.point["f"][1])/2;
          this.point['p'][1] = this.point['a'][1];
          this.point['r'][1] = this.point['m'][1];

          var d = 0;
          d = Math.pow(Math.pow(this.point["a"][0]-this.point["f"][0],2)+Math.pow(this.point["a"][1],2),1/2);

          //画M点
          var groupM = new THREE.Object3D();
          var circleM = createCircle([,0,2],6,"#6D68FF");
          var circleM = createCircle([0,0,0],6,"#6D68FF");
          vertices = [];
          for(var i=0;i<361;i=i+4){
              vertices.push(new THREE.Vector3(6*Math.cos(i*Math.PI/180),6*Math.sin(i*Math.PI/180),2));
          }
          var mM = createLineMesh(vertices,'#000000',3,1);
          var textM = createText("M",this.point['m'][0]>0?20:-20,this.point['m'][1]+12,0,"#6D6EFF",24)

          groupM.add(circleM,mM,textM);
          groupM.position.x = this.point["m"][0]*40;
          groupM.position.y = this.point["m"][1]*40;
          groupM.position.z = 2;

          //画圆
          vertices = [];
          for(var i=0;i<361;i=i+4){
              vertices.push(new THREE.Vector3(d/2*Math.cos(i*Math.PI/180)*40,d/2*Math.sin(i*Math.PI/180)*40,0));
          }
          var yuan = createLineMesh(vertices,'#6D6EFF',3,2);
          yuan.position.x = this.point['m'][0]*40;
          yuan.position.y = this.point['m'][1]*40;
          yuan.position.z = 1;


          //显示辅助线的时候
          //画AP
          vertices = [];
          this.point["p"][0] = -this.p/2;
          this.point["p"][1] = this.point["a"][1];
          vertices.push(vec3(this.point["a"][0]*40,this.point["a"][1]*40,1));
          vertices.push(vec3(this.point["p"][0]*40,this.point["p"][1]*40,1));
          var lineAP = createLineMesh(vertices,"#CE21D3",2,2);

          //画MR
          vertices = [];
          this.point["r"][0] = -this.p/2;
          this.point["r"][1] = this.point["m"][1];
          vertices.push(vec3(this.point["r"][0]*40,this.point["r"][1]*40,1));
          vertices.push(vec3(this.point["m"][0]*40,this.point["m"][1]*40,1));
          var lineMR = createLineMesh(vertices,"#D32121",2,2);

          //P,R,S
          var textP = createText("P",this.p>0?-this.p/2*40-20:-this.p/2*40+20,this.point['p'][1]*40+14,0,"#6D6EFF",24);
          var textR = createText("R",this.p>0?-this.p/2*40-20:-this.p/2*40+20,this.point['r'][1]*40+14,0,"#6D6EFF",24);
          var textS = createText("S",this.p>0?-this.p/2*40-20:-this.p/2*40+20,30,0,"#6D6EFF",24);
          //画垂角
          vertices = [];
          vertices.push(vec3(this.point["p"][0]*40,this.point["p"][1]*40>0?this.point["p"][1]*40-10:this.point["p"][1]*40+10,1));
          vertices.push(vec3(this.point["p"][0]*40>0?this.point["p"][0]*40-10:this.point["p"][0]*40+10,this.point["p"][1]*40>0?this.point["p"][1]*40-10:this.point["p"][1]*40+10,1));
          vertices.push(vec3(this.point["p"][0]*40>0?this.point["p"][0]*40-10:this.point["p"][0]*40+10,this.point["p"][1]*40,1));
          var angle1 = createLineMesh(vertices,"#CE21D3",3);

          vertices = [];
          vertices.push(vec3(-this.p/2*40,10,1));
          vertices.push(vec3(this.p>0?-this.p/2*40+10:-this.p/2*40-10,10,1));
          vertices.push(vec3(this.p>0?-this.p/2*40+10:-this.p/2*40-10,0,1));
          var angle2 = createLineMesh(vertices,"#7ED321",3);

          vertices = [];
          vertices.push(vec3(this.point["r"][0]*40,this.point["r"][1]*40>0?this.point["r"][1]*40-10:this.point["r"][1]*40+10,1));
          vertices.push(vec3(this.point["r"][0]*40>0?this.point["r"][0]*40-10:this.point["r"][0]*40+10,this.point["r"][1]*40>0?this.point["r"][1]*40-10:this.point["r"][1]*40+10,1));
          vertices.push(vec3(this.point["r"][0]*40>0?this.point["r"][0]*40-10:this.point["r"][0]*40+10,this.point["r"][1]*40,1));
          var angle3 = createLineMesh(vertices,"#D32121",3);

          obj1.add(lineAP,lineMR,yuan,groupM,textP,textR,textS,angle3,angle2,angle1);
         
          if(this.checked) {
            scene.add(obj1);
          }
        };
        
        var onDocumentMouseDown = (event) => {
          var offsetLeft = parseInt($('#renderCanvas').offset().left);
          var offsetTop = parseInt($('#renderCanvas').offset().top);
          event.preventDefault();
          var mouse={};
          mouse.x = ((event.clientX-offsetLeft) / mainWidth ) * 2 - 1;
          mouse.y = -( (event.clientY-offsetTop) / mainHeight ) * 2 + 1;
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
          var mouse={};
          mouse.x = ((event.clientX-offsetLeft) / mainWidth ) * 2 - 1;
          mouse.y = -( (event.clientY-offsetTop) / mainHeight ) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(selectobjs);
          raycaster.setFromCamera(mouse, camera);
          if ( intersects.length > 0 ) {
              if ( INTERSECTED != intersects[ 0 ].object ) {
                  INTERSECTED = intersects[ 0 ].object;
                  plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection( plane.normal ),INTERSECTED.position );
              }
          }
          if(mousedownflag){
              if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                  var obj = intersection.sub( offset ),x,y,b;
                  x =obj.x;
                  y = obj.y;
                  if(this.p>0) {
                      b = this.p>5?this.p*0.8:this.p;
                  }else {
                      b = this.p<-5?this.p*0.8:this.p;
                  }

                  if(Math.abs(y)>120+(b>0?b:-b)*60){
                      if(x>0){
                          if(y<0){
                              y=-120-b*60;
                          }else{
                              y=120+b*60;
                          }
                      }else {
                          if(y<0){
                              y=-120+b*60;
                          }else{
                              y=120-b*60;
                          }
                      }
                      
                  }
                  this.point['a'][1] = y / 40;
                  this.point["a"][0] = Math.pow(Math.abs(y)/40,2)/2/this.p;
                  createObj();
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
            var mouse={};
            mouse.x = ((event.touches[0].pageX-offsetLeft) / mainWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-offsetTop) / mainHeight ) * 2 + 1;
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
            var mouse={};
            mouse.x = ((event.touches[0].pageX-offsetLeft) / mainWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-offsetTop) / mainHeight ) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            var intersects = raycaster.intersectObjects(selectobjs);
            raycaster.setFromCamera(mouse, camera);
            if ( intersects.length > 0 ) {
                if ( INTERSECTED != intersects[ 0 ].object ) {
                    INTERSECTED = intersects[ 0 ].object;
                    plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection( plane.normal ),INTERSECTED.position );

                }
            }
          }
            
          if(mousedownflag){
              if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                  var obj = intersection.sub( offset ),x,y,b;
                  x =obj.x;
                  y = obj.y;
                  if(this.p>0) {
                      b = this.p>5?this.p*0.8:this.p;
                  }else {
                      b = this.p<-5?this.p*0.8:this.p;
                  }

                  if(Math.abs(y)>120+(b>0?b:-b)*60){
                      if(x>0){
                          if(y<0){
                              y=-120-b*60;
                          }else{
                              y=120+b*60;
                          }
                      }else {
                          if(y<0){
                              y=-120+b*60;
                          }else{
                              y=120-b*60;
                          }
                      }
                      
                  }
                  this.point['a'][1] = y / 40;
                  this.point["a"][0] = Math.pow(Math.abs(y)/40,2)/2/this.p;
                  createObj();
              }
          }
        };
        var onDocumentTouchEnd = (event) => {
          event.preventDefault();
          mousedownflag = false;
          selectobj = null;

        };

        var animate = () => {
          requestAnimationFrame(animate);
          renderer.clear();
          //面和实线场景
          renderer.render(scene, camera);
          //虚线场景
          if(this.p == 0) {
            this.checked = false;
          }
          if(this.checked){
            if(count == 1){
              scene.add(obj1);
            }
            count = count>2?2:++count;
          }else{
            count = 1;
            scene.remove(obj1);
          }
          if(this.value!=this.valueO){
            if(this.value<this.valueO&&this.value<0&&this.valueO>0){
              this.checked = false;
            } else if(this.value>this.valueO&&this.value>0&&this.valueO<0) {
              this.checked = false;
            }
            this.p = this.value;
            this.point['a'][1] = Math.pow(8*Math.abs(this.p),1/2);
            if(this.p>0) {
              this.point['a'][0] = 4;
            }else if (this.p<0) {
              this.point['a'][0] = -4;
            }
            createObj1();
          }else{
            return;
          }
          this.valueO=this.value;
        };
        
        if(this.isFirst){
          createScene();
          animate();
          createAxis();
          createObj1();
          renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
          renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
          window.addEventListener( 'mouseup', onDocumentMouseUp, false );
          renderer.domElement.addEventListener( 'touchstart', onDocumentTouchStart, false );
          renderer.domElement.addEventListener( 'touchmove', onDocumentTouchMove, false );
          renderer.domElement.addEventListener( 'touchend', onDocumentTouchEnd, false );
          this.isFirst = false;
        }

        var resetWidget = () => {
          this.p = 4;
          this.value = 4;
          this.point['a'][0] = 4;
          this.point['a'][1] = Math.pow(8*this.p,1/2);
          this.checked = false;
          createObj();
        }

        if(isMob){
          $(".aside_reset").on("touchstart",resetWidget);
        }else{
          $(".aside_reset").on("click",resetWidget);
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
        this.p = 4;
        this.value = 4;
        this.point['a'][0] = 4;
        this.point['a'][1] = Math.pow(8*this.p,1/2);
        this.checked = false;
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
