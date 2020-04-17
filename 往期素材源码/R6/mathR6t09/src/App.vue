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
        显示对称直线
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
        title:'直线关于点对称',
        getParameter : {
          Px:-40,
          Py:40,
          Ax:80,
          Ay:200,
          Ax1:-200,
          Ay1:-80,
          Bx:120,
          By:160,
          Bx1:-160,
          By1:-120
        },
        selectobjs: [],
        selectobj: null,
        key: true,
        checked : false,
        p:null,
        point1:null,
        point2:null,
        px1: '-1.0',
        py1: '1.0',
        ax1: '2.0',
        ay1: '5.0',
        ax2: '-5.0',
        ay2: '-2.0',
        bx1: '3.0',
        by1: '4.0',
        bx2: '-4.0',
        by2: '-3.0',
        k: '1.0',
        k1: 1,
        k2: 1,
        obj1: null,  //隐藏的隐藏的两点、线以及y=x+1.0
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
        isMob:null,
        coefficient:1,
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
          vertices.push(this.vec3(x, y, 1));
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
        var vertices1 = [this.vec3(this.getParameter.Ax,this.getParameter.Ay, -1), this.vec3(this.getParameter.Ax1, this.getParameter.Ay1, -1)];
        var dashLine1 = this.createLineMesh(vertices1, '#299AED', 3, 3);
        this.Obj.add(dashLine1);
        var vertices2 = [this.vec3(this.getParameter.Bx,this.getParameter.By, -1), this.vec3(this.getParameter.Bx1, this.getParameter.By1, -1)];
        var dashLine2 = this.createLineMesh(vertices2, '#EF732C', 3, 3);
        // if(this.k==0){
        //   var textBxy = this.createText("y=x",this.getParameter.Bx,this.getParameter.By,0,'#6D68FF',20);
        // } else{
        //    textBxy = this.createText(this.k>0?"y=x+"+this.k:"y=x"+this.k,this.getParameter.Bx,this.getParameter.By,0,'#6D68FF',25);
        // }
        this.k2 = (this.getParameter.By-this.getParameter.By1)/(this.getParameter.Bx-this.getParameter.Bx1);
        var b1 = (this.getParameter.By-(this.k2*this.getParameter.Bx))/40;
        var textBxy;
        if(this.getParameter.Bx-this.getParameter.Bx1 == 0){
          textBxy = this.createText('x='+(this.getParameter.Bx/40).toFixed(1),this.getParameter.Bx,this.getParameter.By,0,'#6D68FF',25);
        } else if (this.k2==0){
          textBxy = this.createText('y='+(this.getParameter.By/40).toFixed(1),this.getParameter.Bx,this.getParameter.By,0,'#6D68FF',25);
        }else{
          if(b1>0){
            textBxy = this.createText('y='+(Math.abs(this.k2).toFixed(2)==1.00?this.k2>0?'':'-':this.k2.toFixed(2))+'x+'+b1.toFixed(1),this.getParameter.Bx,this.getParameter.By,0,'#6D68FF',25);
          } else if(b1<0){
            textBxy = this.createText('y='+(Math.abs(this.k2).toFixed(2)==1.00?this.k2>0?'':'-':this.k2.toFixed(2))+'x'+b1.toFixed(1),this.getParameter.Bx,this.getParameter.By,0,'#6D68FF',25);
          } else {
            textBxy = this.createText('y=x',this.getParameter.Bx,this.getParameter.By,0,'#6D68FF',25);
          }
        }

        textBxy.position.set(this.getParameter.Bx+60,this.getParameter.By-20,0);
        this.Obj1.add(textBxy,dashLine2);

        if(this.checked){
          this.scene.add(this.Obj1);
        }

        // P点
        var textp = this.createText('P ('+this.px1+' , '+this.py1+')',this.getParameter.Px,this.getParameter.Py,0,'#6D68FF',22);
        this.Obj.add(textp);
        this.scene.add(this.Obj);
        this.Group1.position.set(this.getParameter.Px,this.getParameter.Py,1);
        textp.position.set(this.getParameter.Px,this.getParameter.Py-15,0);


        //直线1方程
        this.k1 = (this.getParameter.Ay-this.getParameter.Ay1)/(this.getParameter.Ax-this.getParameter.Ax1);
        var b = (this.getParameter.Ay-(this.k1*this.getParameter.Ax))/40;
        var textAxy;
        if(this.getParameter.Ax-this.getParameter.Ax1 == 0){
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
        this.Obj.add(textAxy);
        this.scene.add(this.Obj);
        textAxy.position.set((this.getParameter.Ax+this.getParameter.Ax1)/2-90,(this.getParameter.Ay+this.getParameter.Ay1)/2+30,5);
      },

      createObj: function(){
        this.scene.remove(this.Obj1);
        //创建坐标组
        this.Group1 = new THREE.Group();
        this.Group2 = new THREE.Group();
        this.Group3 = new THREE.Group();
        this.Group4 = new THREE.Group();
        this.Group5 = new THREE.Group();

        //创建坐标圆点

        //P点
        if(!this.p){
          this.p = this.createImg([this.vec3(0,0,1)],52,"static/UI/A@2x.png");
        }
        this.p.name='P';
        this.Group1.position.set(this.getParameter.Px,this.getParameter.Py,1);
        this.Group1.add(this.p);

        //直线两端点
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
        this.point2.position.x = this.getParameter.Ax1;
        this.point2.position.y = this.getParameter.Ay1;

        // y=x+3,y=x+1直线两点
        this.Group2.position.set(this.getParameter.Ax,this.getParameter.Ay,1);
        this.Group3.position.set(this.getParameter.Ax1,this.getParameter.Ay1,1);
        this.Group4.position.set(this.getParameter.Bx,this.getParameter.By,1);
        this.Group5.position.set(this.getParameter.Bx1,this.getParameter.By1,1);

        // P点坐标
        this.selectobjs.push(this.p,this.point1,this.point2);
        this.scene.add(this.Group1,this.Group2,this.Group3,this.Group4,this.Group5,this.point1,this.point2);
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
              this.px1 = parseFloat(x/40).toFixed(1)==0?0:parseFloat(x/40).toFixed(1);
              this.py1 = parseFloat(y/40).toFixed(1)==0?0:parseFloat(y/40).toFixed(1);
            }else if (this.selectobj.name == "P1") {
                this.getParameter.Ax = parseFloat(x/40).toFixed(1)*40;
                this.getParameter.Ay = parseFloat(y/40).toFixed(1)*40;
                // this.moveO();
                this.createObj();
            }else if (this.selectobj.name == "P2") {
                this.getParameter.Ax1 = parseFloat(x/40).toFixed(1)*40;
                this.getParameter.Ay1 = parseFloat(y/40).toFixed(1)*40;
                // this.moveO();
                this.createObj();
              }

            // this.bx1 = 2*this.px1-this.ax2;
            // this.by1 = 2*this.py1-this.ay2;
            // this.bx1=parseFloat(this.bx1).toFixed(1)==0?0:parseFloat(this.bx1).toFixed(1);
            // this.by1=parseFloat(this.by1).toFixed(1)==0?0:parseFloat(this.by1).toFixed(1);
            // this.getParameter.Bx =  this.bx1*40;
            // this.getParameter.By =  this.by1*40;

            // this.bx2 = 2*this.px1-this.ax1;
            // this.by2 = 2*this.py1-this.ay1;
            // this.bx2=parseFloat(this.bx2).toFixed(1)==0?0:parseFloat(this.bx2).toFixed(1);
            // this.by2=parseFloat(this.by2).toFixed(1)==0?0:parseFloat(this.by2).toFixed(1);
            // this.getParameter.Bx1 =  this.bx2*40;
            // this.getParameter.By1 =  this.by2*40;
            // this.k=(this.by2-this.bx2).toFixed(1);
            this.getParameter.Bx = 2*this.getParameter.Px - this.getParameter.Ax1;
            this.getParameter.By = 2*this.getParameter.Py - this.getParameter.Ay1;
            this.getParameter.Bx1 = 2*this.getParameter.Px - this.getParameter.Ax;
            this.getParameter.By1 = 2*this.getParameter.Py - this.getParameter.Ay;
            this.moveO();
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
              this.px1 = parseFloat(x/40).toFixed(1)==0?0:parseFloat(x/40).toFixed(1);
              this.py1 = parseFloat(y/40).toFixed(1)==0?0:parseFloat(y/40).toFixed(1);
            }else if (this.selectobj.name == "P1") {
                this.getParameter.Ax = parseFloat(x/40).toFixed(1)*40;
                this.getParameter.Ay = parseFloat(y/40).toFixed(1)*40;
                // this.moveO();
                this.createObj();
            }else if (this.selectobj.name == "P2") {
                this.getParameter.Ax1 = parseFloat(x/40).toFixed(1)*40;
                this.getParameter.Ay1 = parseFloat(y/40).toFixed(1)*40;
                // this.moveO();
                this.createObj();
              }

            // this.bx1 = 2*this.px1-this.ax2;
            // this.by1 = 2*this.py1-this.ay2;
            // this.bx1=parseFloat(this.bx1).toFixed(1)==0?0:parseFloat(this.bx1).toFixed(1);
            // this.by1=parseFloat(this.by1).toFixed(1)==0?0:parseFloat(this.by1).toFixed(1);
            // this.getParameter.Bx =  this.bx1*40;
            // this.getParameter.By =  this.by1*40;

            // this.bx2 = 2*this.px1-this.ax1;
            // this.by2 = 2*this.py1-this.ay1;
            // this.bx2=parseFloat(this.bx2).toFixed(1)==0?0:parseFloat(this.bx2).toFixed(1);
            // this.by2=parseFloat(this.by2).toFixed(1)==0?0:parseFloat(this.by2).toFixed(1);
            // this.getParameter.Bx1 =  this.bx2*40;
            // this.getParameter.By1 =  this.by2*40;
            // this.k=(this.by2-this.bx2).toFixed(1);
            this.getParameter.Bx = 2*this.getParameter.Px - this.getParameter.Ax1;
            this.getParameter.By = 2*this.getParameter.Py - this.getParameter.Ay1;
            this.getParameter.Bx1 = 2*this.getParameter.Px - this.getParameter.Ax;
            this.getParameter.By1 = 2*this.getParameter.Py - this.getParameter.Ay;
            this.moveO();
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
        this.getParameter.Ax=80;
        this.getParameter.Ay=200;
        this.getParameter.Ax1=-200;
        this.getParameter.Ay1=-80;
        this.getParameter.Bx=120;
        this.getParameter.By=160;
        this.getParameter.Bx1=-160;
        this.getParameter.By1=-120;
        this.px1='-1.0';
        this.py1='1.0';
        this.k='1.0';
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
