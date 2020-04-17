<template>
  <div id="app" class="noselect">
    <!--头部-->
    <ui-head :title="title">
      <ui-btn type="reset1" @click.native="resetWidget"></ui-btn>
    </ui-head>
    <!--模型区域-->
    <div class="container">
      <div id="renderCanvas" style="height:100%"></div>
      <ui-btn type="switch" class="switch" v-model="checked">
        显示对称点
      </ui-btn>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  export default {
    name: 'app',
    components: {uiHead,uiBtn},
    data(){
      return{
        title:'点关于直线对称',
        getParameter : {
          Px:-40,
          Py:40,
          Pxx: 80,
          Pyy: -80,
          Ax: 240,
          Ay: 200,
          Bx: -200,
          By: -240,
          Cx: 20,
          Cy:-20
        },
        selectobjs: [],
        selectobj: null,
        key: true,
        checked : false,
        px1: '-1.0',
        py1: '1.0',
        px2: '2.0',
        py2: '-2.0',
        ax1: '6',
        ay1: '5',
        bx1: '-5',
        by1: '-6',
        cx1: '0.5',
        cy1: '-0.5',
        obj1: null,
        Group1: null,
        Group2: null,
        Group3: null,
        Group4: null,
        Group5: null,
        scene: null,
        camera: null,
        renderer: null,
        controls: null,
        axis:null,
        mainWidth: null,
        mainHeight: null,
        pointP:null,
        point1:null,
        point2:null,
        isMob:null,
        raycaster : new THREE.Raycaster(),
        plane : new THREE.Plane(),
        offset : new THREE.Vector3(),
        intersection : new THREE.Vector3(),
        mouse : new THREE.Vector2(),
        INTERSECTED : null,
        mousedownflag: null,

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
      this.createScene();
      this.createControls();
      this.createAxis();
      this.renderAll();
      this.createObj();
      this.moveO();
      this.appMouse();
      window.onresize = () => {
        var height=window.innerHeight;
        this.mainWidth = $('#renderCanvas').width();
        this.mainHeight = $('#renderCanvas').height(height-76);
        var cW = $('canvas').width();
        var cH = $('canvas').height();
        var leftC=($('#renderCanvas').width()-cW)/2;
        $('canvas').css({
          'left':leftC+'px','top':($('#renderCanvas').height()-cH)/2+'px'
        });
      };
    },
    computed:{},
    watch: {
      checked(){
        if(this.checked){
          this.scene.add(this.Obj1);
        }else{
          this.scene.remove(this.Obj1);
        }
      }
    },
    methods: {
      //创建场景于相机
      createScene() {
        this.isMob = /iPad|Android/g.test(navigator.userAgent);
        if (this.isMob) {
            this.renderer = new THREE.WebGLRenderer({antialias: true});
            this.coefficient = 0.9;
        } else {
            this.renderer = new THREE.CanvasRenderer();
            this.coefficient = 1.5;
        }
        this.mainWidth = $('#renderCanvas').width();
        this.mainHeight = $('#renderCanvas').height();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, this.mainWidth / this.mainHeight, 1, 10000);
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 1200;
        this.camera.lookAt(this.scene.position);
        this.scene.add(this.camera);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(this.mainWidth, this.mainHeight);
        $("#renderCanvas").append(this.renderer.domElement);

      },
      //定义鼠标控制
      createControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableRotate = false;
        this.controls.enablePan = false;
        this.controls.enableZoom = false;
      },
      vec3(x, y, z) {
        return new THREE.Vector3(x, y, z);
      },
      //文字
      createText: function (texts, x, y, z , color, size) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {
          align: textAlign.center,
          font: size + 'px "Cambria Italic"',
          fillStyle: color,
          antialias: true
        };
        var text = new SpriteText2D(texts, textStyle);
//        text.rotation = this.camera.rotation;
        text.position.set(x, y, z);
        text.material.depthTest=false;
        return text;
      },
     //三角
      createTriangleFace: function (vertices, color) {
        var material = new THREE.MeshBasicMaterial({color: color});
        var geom = new THREE.Geometry();
        geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
        geom.vertices = vertices;
        var mesh = new THREE.Mesh(geom, material);
        return mesh;
      },

      //坐标轴
      createAxis() {
        this.axis = new THREE.Group();
        this.labelAxis(-400, 40, 400);
        this.drawAxisArrow(this.vec3(-450, 0, 0), this.vec3(450, 0, 0), 0x000000, 1);
        this.drawAxisArrow(this.vec3(0, -450, 0), this.vec3(0, 450, 0), 0x000000, 2);
        this.scene.add(this.axis);
      },
      //坐标轴分度线
      labelAxis(start, stepSize, stop) {
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
          // text.rotation = thiz.camera.rotation;
          if (i == 0) {
            text.position.x = i + 10;
          }
          else {
            text.position.x = i;
          }
          text.position.y = -5;
          this.axis.add(text);
          vertices = [];

          vertices.push(this.vec3(i, 0, 0));
          vertices.push(this.vec3(i, 10, 0));

          var line = this.createLineMesh(vertices, '#000000', 3, 2);
          this.axis.add(line);
        }
        // label y axis:
        for (var i = start; i <= stop; i = i + stepSize) {
          if (i == 0) {
            continue;
          }
          text = new SpriteText2D(i / 40, textStyle);
          // text.rotation = thiz.camera.rotation;
          text.position.x = -15;
          text.position.y = i + 7;
          text.position.z = 0.2;
          this.axis.add(text);

          vertices = [];
          vertices.push(this.vec3(0, i, 0));
          vertices.push(this.vec3(10, i, 0));

          line = this.createLineMesh(vertices, '#000000', 3, 2);
          this.axis.add(line);
        }
        this.axis.add(text);
      },
      //坐标轴
      drawAxisArrow(origin, dir, color, style) {
        var geometryLine = new THREE.Geometry();
        var vertices = [];
        vertices.push(origin);
        vertices.push(dir);
        geometryLine.vertices = vertices;
        var line = this.createLineMesh(geometryLine.vertices, color, 3, 2);
        this.axis.add(line);
        var text;
        if (style == 1) {
          vertices = [];
          vertices.push(this.vec3(dir.x - 10, 0, 0));
          vertices.push(this.vec3(dir.x - 13, 5, 0));
          vertices.push(this.vec3(dir.x + 5, 0, 0));
          var triangle1 = this.createTriangleFace(vertices, "#000");
          this.axis.add(triangle1);
          vertices = [];
          vertices.push(this.vec3(dir.x - 10, 0, 0));
          vertices.push(this.vec3(dir.x - 13, -5, 0));
          vertices.push(this.vec3(dir.x + 5, 0, 0));
          var triangle2 = this.createTriangleFace(vertices, "#000");
          this.axis.add(triangle2);
          text = this.createText('x', dir.x, -5, 0, '#000', 28);
          this.axis.add(text);
          text = this.createText('O', -14, -2, 0, '#000', 23);
          this.axis.add(text);
        } else {
          vertices = [];
          vertices.push(this.vec3(0, dir.y - 10, 0));
          vertices.push(this.vec3(5, dir.y - 13, 0));
          vertices.push(this.vec3(0, dir.y + 5, 0));
          var triangle1 = this.createTriangleFace(vertices, "#000");
          this.axis.add(triangle1);
          vertices = [];
          vertices.push(this.vec3(0, dir.y - 10, 0));
          vertices.push(this.vec3(-5, dir.y - 13, 0));
          vertices.push(this.vec3(0, dir.y + 5, 0));
          var triangle2 = this.createTriangleFace(vertices, "#000");
          this.axis.add(triangle2);
          text = this.createText('y', 20, dir.y + 10, 0, '#000', 28)
          this.axis.add(text);
        }
      },
      //线
      createLineMesh: function (vertices, color, style,width) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        if (!color) {
          color = '#000';
        }
        if (style == 1) {
          vertices.push(this.vec3(vertices[0].x, vertices[0].y - 1, vertices[0].z));
          vertices.push(this.vec3(vertices[1].x, vertices[1].y - 1, vertices[1].z));
          vertices.push(this.vec3(vertices[0].x + 1, vertices[0].y, vertices[0].z));
          vertices.push(this.vec3(vertices[1].x + 1, vertices[1].y, vertices[1].z));
          vertices.push(this.vec3(vertices[0].x - 1, vertices[0].y, vertices[0].z));
          vertices.push(this.vec3(vertices[1].x - 1, vertices[1].y, vertices[1].z));
          geometryLine.vertices = vertices;
          lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color,linewidth:2}));
        } else if (style == 2) {
          geometryLine.vertices = vertices;
          geometryLine.computeLineDistances();
          lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
            color: color,
            opacity: 0.8,
            dashSize: 7,
            gapSize: 7,
            linewidth: width
          }));
        } else if (style == 3) {
          geometryLine.vertices = vertices;
          lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({
            color: color,
            linewidth: width,
            transparent: true,
            opacity: 0.7
          }));
        }
        return lineMesh;
      },
      //圆
      createCircle: function (radius, color, end) {
        var C=new THREE.Group();
        var CircleM,CircleG;
        CircleM = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 0});
        CircleG = new THREE.CircleGeometry(radius*4, 50);
        var CircleT = new THREE.Mesh(CircleG, CircleM);

        CircleM = new THREE.MeshBasicMaterial({color: color});
        CircleG = new THREE.CircleGeometry(radius, 50);
        var Circle = new THREE.Mesh(CircleG, CircleM);

        var vertices=[];
        for(var i=0;i<361;i+=2){
          var x = radius * Math.cos(i * Math.PI / 180);
          var y = radius * Math.sin(i * Math.PI / 180);
          vertices.push(this.vec3(x, y, 0));
        }
        var Circle1=this.createLineMesh(vertices,'#000', 2,0.5);
        C.add(CircleT,Circle,Circle1)
        return C;
      },

      createImg(vertices,w,src){
        var PlaneG = new THREE.PlaneGeometry(w,w);
        var PlaneM = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture(src) ,transparent:true, overdraw : 0.2,depthTest:false} );
        var Plane = new THREE.Mesh(PlaneG, PlaneM);
        Plane.position.x = vertices[0].x; 
        Plane.position.y = vertices[0].y;
        Plane.position.z = vertices[0].z;
        return Plane;
      },
      moveO:function () {
        if(this.Obj!=null){
          this.scene.remove(this.Obj);
          this.scene.remove(this.Obj1);
        }
        this.Obj = new THREE.Group();
        this.Obj1 = new THREE.Group();

        //黑色中线
        var vertices1 = [this.vec3(this.getParameter.Ax,this.getParameter.Ay, 0), this.vec3(this.getParameter.Bx, this.getParameter.By, 0)];
        var dashLine1 = this.createLineMesh(vertices1, '#000000', 3, 3);
        this.Obj.add(dashLine1);

        this.k1 = (this.getParameter.Ay-this.getParameter.By)/(this.getParameter.Ax-this.getParameter.Bx);
        var b = (this.getParameter.Ay-(this.k1*this.getParameter.Ax))/40;
        var textAxy;
        if(this.getParameter.Ax-this.getParameter.Bx == 0){
          textAxy = this.createText('x='+(this.getParameter.Ax/40).toFixed(1),this.getParameter.Ax,this.getParameter.Ay,0,'#6D68FF',25);
        } else if(this.k1 == 0) {
          textAxy = this.createText('y='+(this.getParameter.Ay/40).toFixed(1),this.getParameter.Ax,this.getParameter.Ay,0,'#6D68FF',25);
        } else {
          if(b>0){
            textAxy = this.createText('y='+(Math.abs(this.k1).toFixed(2)==1.00?this.k1>0?'':'-':this.k1.toFixed(2))+'x+'+b.toFixed(1),this.getParameter.Ax,this.getParameter.Ay,0,'#6D68FF',25);
          } else if(b<0){
            textAxy = this.createText('y='+(Math.abs(this.k1).toFixed(2)==1.00?this.k1>0?'':'-':this.k1.toFixed(2))+'x'+b.toFixed(1),this.getParameter.Ax,this.getParameter.Ay,0,'#6D68FF',25);
          } else {
            textAxy = this.createText('y=x',this.getParameter.Ax,this.getParameter.Ay,0,'#6D68FF',25);
          }
        }
        textAxy.position.set(this.getParameter.Ax,this.getParameter.Ay+50,5);
        this.Obj.add(textAxy);

        //P到中点连线
        var vertices2 = [this.vec3(this.getParameter.Px,this.getParameter.Py, -1), this.vec3(this.getParameter.Cx, this.getParameter.Cy, -1)];
        var dashLine2 = this.createLineMesh(vertices2, '#299AED', 2, 2.5);
        this.Obj1.add(dashLine2);


        // 创建p点文字
        var textp = this.createText('P ('+(this.getParameter.Px/40).toFixed(1)+', '+(this.getParameter.Py/40).toFixed(1)+')',this.getParameter.Px,this.getParameter.Py,0,'#6D68FF',24);
        this.Obj.add(textp);
        this.scene.add(this.Obj);
        this.Group1.position.set(this.getParameter.Px,this.getParameter.Py,1);
        textp.position.set(this.getParameter.Px-90,this.getParameter.Py+20,0);

        //P1到中点连线
        var vertices3 = [this.vec3(this.getParameter.Pxx,this.getParameter.Pyy, -1), this.vec3(this.getParameter.Cx, this.getParameter.Cy, -1)];
        var dashLine3 = this.createLineMesh(vertices3, '#EF732C', 2, 3);
        // 创建p1点文字
        var textp1 = this.createText("P\' ("+(this.getParameter.Pxx/40).toFixed(1)+', '+(this.getParameter.Pyy/40).toFixed(1)+')',this.getParameter.Pxx,this.getParameter.Pyy,0,'#6D68FF',24);

        this.Group5.position.set(this.getParameter.Pxx,this.getParameter.Pyy,1);
        textp1.position.set(this.getParameter.Pxx+100,this.getParameter.Pyy+12,0);


        this.Obj1.add(textp1,dashLine3,this.Group5);

        if(this.checked){
          this.scene.add(this.Obj1);
        }
      },

      createObj: function(){
        this.scene.remove(this.obj1);
        //创建坐标组
        this.Group1 = new THREE.Group();
        this.Group2 = new THREE.Group();
        this.Group3 = new THREE.Group();
        this.Group4 = new THREE.Group();
        this.Group5 = new THREE.Group();

        //坐标圆点
        //p点坐标圆点
        if(!this.pointP){
          this.pointP = this.createImg([this.vec3(0,0,1)],52,"static/UI/A@2x.png");
        }
        this.pointP.name='P';
        this.Group1.position.set(this.getParameter.Px,this.getParameter.Py,0);
        this.Group1.add(this.pointP);
        //p1点坐标圆点
        var P2=this.createCircle(6,'#EF732C');
        this.Group5.position.set(this.getParameter.Pxx,this.getParameter.Pyy,2);
        this.Group5.add(P2);


        if(!this.point1){
          this.point1 = this.createImg([this.vec3(0,0,1)],52,"static/UI/A@2x.png");
        }
        this.point1.name = "P1";
        this.point1.position.x = this.getParameter.Ax;
        this.point1.position.y = this.getParameter.Ay;


        if(!this.point2){
          this.point2 = this.createImg([this.vec3(0,0,1)],52,"static/UI/A@2x.png");
        }
        this.point2.name = "P2";
        this.point2.position.x = this.getParameter.Bx;
        this.point2.position.y = this.getParameter.By;

        //中线三点坐标位置
        // this.Group2.position.set(this.getParameter.Ax,this.getParameter.Ay,1);
        // this.Group3.position.set(this.getParameter.Bx,this.getParameter.By,1);
        // this.Group4.position.set(this.getParameter.Cx,this.getParameter.Cy,1);
        // P点坐标
        this.selectobjs.push(this.pointP,this.point1,this.point2);
        this.scene.add(this.Group1,this.point1,this.point2);
      },

      onDocumentMouseDown:function(event){
        var offsetLeft = parseInt($('#renderCanvas').offset().left);
        var offsetTop = parseInt($('#renderCanvas').offset().top);
        event.preventDefault();
        var mouse={};
        mouse.x = ((event.clientX-offsetLeft) / this.mainWidth ) * 2 - 1;
        mouse.y = -( (event.clientY-offsetTop) / this.mainHeight ) * 2 + 1;
        this.raycaster.setFromCamera(mouse, this.camera);
        var intersects = this.raycaster.intersectObjects(this.selectobjs);
        if (intersects.length > 0) {
          this.selectobj = intersects[0].object;
          this.mousedownflag = true;
        }
      },

      onDocumentMouseMove:function(event){
        var offsetLeft = parseInt($('#renderCanvas').offset().left);
        var offsetTop = parseInt($('#renderCanvas').offset().top);
        event.preventDefault();
        var mouse={};
        mouse.x = ((event.clientX-offsetLeft) / this.mainWidth ) * 2 - 1;
        mouse.y = -( (event.clientY-offsetTop) / this.mainHeight ) * 2 + 1;
        var intersects = this.raycaster.intersectObjects( this.selectobjs );
        this.raycaster.setFromCamera(mouse, this.camera);
        if ( intersects.length > 0 ) {
          if ( this.INTERSECTED != intersects[ 0 ].object ) {
            this.INTERSECTED = intersects[ 0 ].object;
            this.plane.setFromNormalAndCoplanarPoint(this.camera.getWorldDirection( this.plane.normal ),this.INTERSECTED.position );

          }
        }
        if(this.mousedownflag){
          if ( this.raycaster.ray.intersectPlane(this.plane, this.intersection ) ) {
            var obj = this.intersection.sub( this.offset ),x,y;
            x =obj.x;
            y = obj.y;
            if(Math.abs(x)>400){
              if(x<0){
                x=-400;
              }else{
                x=400;
              }
            }
            if(Math.abs(y)>400){
              if(y<0){
                y=-400;
              }else{
                y=400;
              }
            }

            if(this.selectobj.name=='P'){
              this.getParameter.Px = parseFloat(x/40).toFixed(1)*40;
              this.getParameter.Py = parseFloat(y/40).toFixed(1)*40;
            } else if (this.selectobj.name == 'P1'){
              this.getParameter.Ax = parseFloat(x/40).toFixed(1)*40;
              this.getParameter.Ay = parseFloat(y/40).toFixed(1)*40;
            }else if (this.selectobj.name == 'P2') {
              this.getParameter.Bx = parseFloat(x/40).toFixed(1)*40;
              this.getParameter.By = parseFloat(y/40).toFixed(1)*40;
            }

            var k1  = (this.getParameter.Ay-this.getParameter.By)/(this.getParameter.Ax-this.getParameter.Bx);
            var b1 = this.getParameter.Ay/40-(k1*this.getParameter.Ax/40);
            if(k1 == 0){
              this.getParameter.Cx = this.getParameter.Px;
              this.getParameter.Cy = this.getParameter.Ay;
              this.getParameter.Pxx = this.getParameter.Px;
              this.getParameter.Pyy = 2*this.getParameter.Cy - this.getParameter.Py;
            }else if(this.getParameter.Ax-this.getParameter.Bx == 0){
              this.getParameter.Cx = this.getParameter.Ax;
              this.getParameter.Cy = this.getParameter.Py;
              this.getParameter.Pxx = 2*this.getParameter.Cx - this.getParameter.Px;
              this.getParameter.Pyy = this.getParameter.Py;
            }else{
              var k2 = -1/k1;
              var b2 =this.getParameter.Py/40-(k2*this.getParameter.Px/40);
              this.getParameter.Cx = (b2-b1)/(k1-k2)*40;
              this.getParameter.Cy = k2*this.getParameter.Cx + b2*40;
              this.getParameter.Pxx = 2*this.getParameter.Cx - this.getParameter.Px;
              this.getParameter.Pyy = 2*this.getParameter.Cy - this.getParameter.Py;
            }
            this.moveO();
            this.createObj();

          }
        }

      },

      onDocumentMouseUp:function(event){
        event.preventDefault();
        this.mousedownflag = false;
        this.selectobj = null;
      },
      onDocumentTouchStart:function(event){
        var offsetLeft = parseInt($('#renderCanvas').offset().left);
        var offsetTop = parseInt($('#renderCanvas').offset().top);
        event.preventDefault();
        if (event.touches.length === 1) {
          var mouse={};
          mouse.x = ((event.touches[0].pageX-offsetLeft) / this.mainWidth ) * 2 - 1;
          mouse.y = -( (event.touches[0].pageY-offsetTop) / this.mainHeight ) * 2 + 1;
          this.raycaster.setFromCamera(mouse, this.camera);
          var intersects = this.raycaster.intersectObjects(this.selectobjs);
          if (intersects.length > 0) {
            this.selectobj = intersects[0].object;
            this.mousedownflag = true;
          }
        }
      },

      onDocumentTouchMove:function(event){
        var offsetLeft = parseInt($('#renderCanvas').offset().left);
        var offsetTop = parseInt($('#renderCanvas').offset().top);
        event.preventDefault();
        if (event.touches.length === 1) {
          var mouse={};
          mouse.x = ((event.touches[0].pageX-offsetLeft) / this.mainWidth ) * 2 - 1;
          mouse.y = -( (event.touches[0].pageY-offsetTop) / this.mainHeight ) * 2 + 1;
          var intersects = this.raycaster.intersectObjects( this.selectobjs );
          this.raycaster.setFromCamera(mouse, this.camera);
          if ( intersects.length > 0 ) {
            if ( this.INTERSECTED != intersects[ 0 ].object ) {
              this.INTERSECTED = intersects[ 0 ].object;
              this.plane.setFromNormalAndCoplanarPoint(this.camera.getWorldDirection( this.plane.normal ),this.INTERSECTED.position );
            }
          }
          if(this.mousedownflag){
            if ( this.raycaster.ray.intersectPlane( this.plane, this.intersection ) ) {
              var obj = this.intersection.sub( this.offset ),x,y;
              x =obj.x;
              y = obj.y;
              if(Math.abs(x)>400){
                if(x<0){
                  x=-400;
                }else{
                  x=400;
                }
              }
              if(Math.abs(y)>400){
                if(y<0){
                  y=-400;
                }else{
                  y=400;
                }
              }
              if(this.selectobj.name=='P'){
              this.getParameter.Px = parseFloat(x/40).toFixed(1)*40;
              this.getParameter.Py = parseFloat(y/40).toFixed(1)*40;
            } else if (this.selectobj.name == 'P1'){
              this.getParameter.Ax = parseFloat(x/40).toFixed(1)*40;
              this.getParameter.Ay = parseFloat(y/40).toFixed(1)*40;
            }else if (this.selectobj.name == 'P2') {
              this.getParameter.Bx = parseFloat(x/40).toFixed(1)*40;
              this.getParameter.By = parseFloat(y/40).toFixed(1)*40;
            }

            var k1  = (this.getParameter.Ay-this.getParameter.By)/(this.getParameter.Ax-this.getParameter.Bx);
            var b1 = this.getParameter.Ay/40-(k1*this.getParameter.Ax/40);
            if(k1 == 0){
              this.getParameter.Cx = this.getParameter.Px;
              this.getParameter.Cy = this.getParameter.Ay;
              this.getParameter.Pxx = this.getParameter.Px;
              this.getParameter.Pyy = 2*this.getParameter.Cy - this.getParameter.Py;
            }else if(this.getParameter.Ax-this.getParameter.Bx == 0){
              this.getParameter.Cx = this.getParameter.Ax;
              this.getParameter.Cy = this.getParameter.Py;
              this.getParameter.Pxx = 2*this.getParameter.Cx - this.getParameter.Px;
              this.getParameter.Pyy = this.getParameter.Py;
            }else{
              var k2 = -1/k1;
              var b2 =this.getParameter.Py/40-(k2*this.getParameter.Px/40);
              this.getParameter.Cx = (b2-b1)/(k1-k2)*40;
              this.getParameter.Cy = k2*this.getParameter.Cx + b2*40;
              this.getParameter.Pxx = 2*this.getParameter.Cx - this.getParameter.Px;
              this.getParameter.Pyy = 2*this.getParameter.Cy - this.getParameter.Py;
            }
            this.moveO();
            this.createObj();
            }
          }
        }

      },

      onDocumentTouchEnd:function(event){
        event.preventDefault();
        this.mousedownflag = false;
        this.selectobj = null;
      },
      appMouse() {
        this.renderer.domElement.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
        window.addEventListener( 'mouseup', this.onDocumentMouseUp, false );
        this.renderer.domElement.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
        this.renderer.domElement.addEventListener( 'touchstart', this.onDocumentTouchStart, false );
        this.renderer.domElement.addEventListener( 'touchmove', this.onDocumentTouchMove, false );
        this.renderer.domElement.addEventListener( 'touchend', this.onDocumentTouchEnd, false );
      },

      renderAll() {
        this.controls.update();
        requestAnimationFrame(this.renderAll);
        this.renderer.render(this.scene, this.camera);
      },
      //重置
      resetWidget(){
        this.checked = false;
        this.getParameter.Px=-40;
        this.getParameter.Py=40;
        this.getParameter.Pxx=80;
        this.getParameter.Pyy=-80;
        this.getParameter.Ax=240;
        this.getParameter.Ay=200;
        this.getParameter.Bx=-200;
        this.getParameter.By=-240;
        this.getParameter.Cx=20;
        this.getParameter.Cy=-20;
        this.px1 ='-1.0';
        this.py1= '1.0';
        this.px2= '2.0';
        this.py2='-2.0';
        this.moveO();
        this.createObj();
      }
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
   body{
	-webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
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
  .container{
    width:100%;
    height: calc(100% - 76px);
  }
  #renderCanvas{
    position: relative;
  }
  canvas{
    width:100%;
    height: 100%;
    position: absolute;
  }
  .insp-wrapper{
    width:100%;
    height: 100%;
  }
  .switch{
    position: fixed;
    right: 20px;
    bottom:20px;
    z-index: 99999;
  }

</style>
