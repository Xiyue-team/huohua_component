<template>
  <div id="app" class="noselect">
    <!--头部-->
    <ui-head :title="title">
      <ui-btn type="reset1" class="reset"></ui-btn>
    </ui-head>
    <!--模型区域-->
    <div class="container">
      <div class="left">
        <div class="leftBody">
          <div class="leftMain" :style="leftMain">
            <div id="leftCanvas">

            </div>
          </div>
        </div>
      </div>
      <div id="main" :style="'position:relative;'">
        <div class="mainD" :style="'border:1px dashed #ccc;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;width:430px;height:282px;'">
          <p class="startC" :style="'cursor: pointer;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;text-align:center;width:100px;height:20px;line-height:20px;'">点击开始</p>
        </div>
      </div>
      <div class="right">
        <div class="right-top">
          <div class="step">
            <span></span>
          </div>
          <div class="step">
            <span></span>
          </div>
          <div class="step">
            <span></span>
          </div>
        </div>
        <div :style="'height:310px;position:absolute;top:0;bottom:0;margin:auto;'">
          <ui-group type="radio"
                    :margin="12"
                    :width="98"
                    :height="44"
                    :disabled="yes"
                    :groups="groups"
                    v-model="radio_checked1"></ui-group>
          <ui-btn type="switch"
                  :width="98"
                  :height="96"
                  :vertical="true"
                  v-model="switch_checked4"
                  style="margin-top: 30px">辅助线
          </ui-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  import uiGroup from '@/components/UI/uiGroup';//按钮
  export default {
    name: 'app',
    components: {uiHead, uiBtn, uiGroup},
    data() {
      return {
        title: '2017年全国2理（4）',
        leftMain: {
          height: '400px',
          width: '100%',
          backgroundImage: 'url(static/UI/subject.png)',
          backgroundRepeat:' no-repeat',
          backgroundSize: '100% 100%',
          overflow: 'hidden'
        },
        radio_checked1: '',
        radio_checked1O: '',
        switch_checked4: false,
        switch_checked4O1: '',
        switch_checked4O2: '',
        yes: true,
        start: {
          color: '#000000',
          marginBottom: '40px'
        },
        groups: [{
          name: 'one',
          txt: '正视'
        }, {
          name: 'two',
          txt: '侧视'
        }, {
          name: 'three',
          txt: '俯视'
        }],
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
      this.init();
    },
    methods: {
      //拖动事件
      init() {
        var thiz = this;
        var camera1 = null;
        var camera2 = null;
        var scene1 = null;
        var scene2 = null;
        var renderer1 = null;
        var renderer2 = null;
        var mainWidth = null;
        var mainHeight = null;
        var isMob = /iPad|Android/g.test(navigator.userAgent);
        var FZ=new THREE.Group();
        var dragP1=null;
        var dragP2=null;
        var LT=new THREE.Group();
        var LL=new THREE.Group();
        var SS=new THREE.Group();

        //视图区鼠标事件操作相关变量
        var raycaster = new THREE.Raycaster();
        var Plane = new THREE.Plane();
        var offset = new THREE.Vector3();
        var intersection = new THREE.Vector3();
        var mouse = new THREE.Vector2();
        var INTERSECTED = null;
        var mousedownflag = false;
        var mousedownflag2 = false;
        var selectobj = null;
        var selectobjs = [];
        var controls2 = null;
        var a;
        var TH = {
          onDocumentMouseDown: function (event) {
            var offsetLeft = parseInt($('#main').offset().left);
            var offsetTop = parseInt($('#main').offset().top);
            event.preventDefault();
            var mouse = {};
            mouse.x = ((event.clientX - offsetLeft) / mainWidth ) * 2 - 1;
            mouse.y = -( (event.clientY - offsetTop) / mainHeight ) * 2 + 1;
            raycaster.setFromCamera(mouse, camera2);
            var intersects = raycaster.intersectObjects(selectobjs);
            mousedownflag2=true;
            if (intersects.length > 0) {
              selectobj = intersects[0].object;
              mousedownflag = true;
              controls2.enableRotate = false;
            }
          },
          onDocumentMouseMove: function (event) {
            var offsetLeft = parseInt($('#main').offset().left);
            var offsetTop = parseInt($('#main').offset().top);
            event.preventDefault();
            var mouse = {};
            mouse.x = ((event.clientX - offsetLeft) / mainWidth ) * 2 - 1;
            mouse.y = -( (event.clientY - offsetTop) / mainHeight ) * 2 + 1;
            raycaster.setFromCamera(mouse, camera2);
            var intersects = raycaster.intersectObjects(selectobjs);
            if (intersects.length > 0) {
              if (INTERSECTED != intersects[0].object) {
                INTERSECTED = intersects[0].object;
                Plane.setFromNormalAndCoplanarPoint(camera2.getWorldDirection(Plane.normal), INTERSECTED.position);
              }
            }
            if (mousedownflag) {
              if (raycaster.ray.intersectPlane(Plane, intersection)) {
                var obj = intersection.sub(offset);
                TH.draw(obj);
              }
            }
            if(mousedownflag2 && !mousedownflag){
                thiz.radio_checked1='';
            }
          },
          onDocumentMouseUp: function (event) {
            event.preventDefault();
            mousedownflag = false;
            mousedownflag2=false;
            selectobj = null;
            controls2.enableRotate = true;
          },
          onDocumentTouchStart: function (event) {
            var offsetLeft = parseInt($('#main').offset().left);
            var offsetTop = parseInt($('#main').offset().top);
            event.preventDefault();
            if (event.touches.length === 1) {
              var mouse = {};
              mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth ) * 2 - 1;
              mouse.y = -( (event.touches[0].pageY - offsetTop) / mainHeight ) * 2 + 1;
              raycaster.setFromCamera(mouse, camera2);
              var intersects = raycaster.intersectObjects(selectobjs);
              mousedownflag2=true;
              if (intersects.length > 0) {
                selectobj = intersects[0].object;
                mousedownflag = true;
                controls2.enableRotate = false;
              }
            }
          },
          onDocumentTouchMove: function (event) {
            var offsetLeft = parseInt($('#main').offset().left);
            var offsetTop = parseInt($('#main').offset().top);
            event.preventDefault();
            if (event.touches.length === 1) {
              var mouse = {};
              mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth ) * 2 - 1;
              mouse.y = -( (event.touches[0].pageY - offsetTop) / mainHeight ) * 2 + 1;
              raycaster.setFromCamera(mouse, camera2);
              var intersects = raycaster.intersectObjects(selectobjs);
              raycaster.setFromCamera(mouse, camera2);
              if (intersects.length > 0) {
                if (INTERSECTED != intersects[0].object) {
                  INTERSECTED = intersects[0].object;
                  Plane.setFromNormalAndCoplanarPoint(camera2.getWorldDirection(Plane.normal), INTERSECTED.position);

                }
              }
            }
            if (mousedownflag) {
              if (raycaster.ray.intersectPlane(Plane, intersection)) {
                var obj = intersection.sub(offset);
                TH.draw(obj);
              }
            }
            if(mousedownflag2 && !mousedownflag){
                thiz.radio_checked1='';
            }
          },
          onDocumentTouchEnd: function (event) {
            event.preventDefault();
            mousedownflag = false;
            mousedownflag2=false;
            selectobj = null;
            controls2.enableRotate = true;
          },
          draw:function (obj) {
              var y=obj.y;
              if(y>5){
                  y=5;
              }else if(y<-5){
                  y=-5;
              }
              if(selectobj.name=='ctrl1'){
                  var yD=y-dragP1.position.y;
                  dragP1.position.y=y;
                  dragP2.position.y+=yD;
                  if(dragP2.position.y<-5){
                      dragP2.position.y=-5;
                  }
                  if(dragP1.position.y>-5){
                      dragP2.visible=true;
                  }else{
                      dragP2.visible=false;
                  }
              }else{
                  if(y>-1.5 && y<-0.5){
                      y=-1;
                  }
                  if(y<dragP1.position.y){
                      dragP2.position.y=y;
                  }else{
                      dragP2.position.y=dragP1.position.y;
                  }
              }
              scene2.remove(LT);
              LT=new THREE.Group();
              var y1=dragP1.position.y;
              var y2=dragP2.position.y;
              var YD=Math.abs(y1-y2)/2;
              var YC=YD+y2;
              var a=3;
              var b=Math.sqrt(Math.pow(y1-y2,2)+Math.pow(-3-3,2))/2;
              var sinT=a/b;
              var cosT=YD/b;
              var PI=Math.PI/180;
              var vertices1=[];
              for(var i=0;i<361;i+=2){
                  var xz=a*Math.cos(i*PI);
                  var yz=-b*Math.sin(i*PI)*cosT+YC;
                  var zz=b*Math.sin(i*PI)*sinT;
                  vertices1.push(new THREE.Vector3(xz,yz,zz));
              }
              var line1=TH.createLineMesh(vertices1,'#000',3,1.5);
              var line2=TH.createLineMesh(vertices1,'#000',2,1);
              var shape = new THREE.Shape();
              shape.moveTo(a*Math.cos(0*PI),b*Math.sin(0*PI),0 );
              for (var i = 4; i <361; i+=4) {
                  shape.lineTo(a*Math.cos(i*PI),b*Math.sin(i*PI),0);
              }
              var meshMaterial = new THREE.MeshBasicMaterial({color: '#A8F1E0', side: THREE.DoubleSide});
              var PT = new THREE.Mesh(new THREE.ShapeGeometry(shape), meshMaterial);
              PT.position.y=YC;
              PT.rotation.x=-Math.acos(cosT);

              var d=18;
              for(var i=0;i<=342;i+=d){
                  var vertices1 = [],vertices2=[];
                  var xz=a*Math.cos(i*PI);
                  var yz=-b*Math.sin(i*PI)*cosT+YC;
                  var zz=b*Math.sin(i*PI)*sinT;
                  var xz1=a*Math.cos((i+d)*PI);
                  var yz1=-b*Math.sin((i+d)*PI)*cosT+YC;
                  var zz1=b*Math.sin((i+d)*PI)*sinT;
                  var xz2=3*Math.cos((i+d)*PI);
                  var yz2=-5;
                  var zz2=3*Math.sin((i+d)*PI);
                  var xz3=3*Math.cos(i*PI);
                  var yz3=-5;
                  var zz3=3*Math.sin(i*PI);
                  vertices1.push(new THREE.Vector3(xz,yz,zz),new THREE.Vector3(xz1,yz1,zz1),new THREE.Vector3(xz2,yz2,zz2));
                  vertices2.push(new THREE.Vector3(xz,yz,zz),new THREE.Vector3(xz2,yz2,zz2),new THREE.Vector3(xz3,yz3,zz3));
                  var PY1 = TH.createP(vertices1);
                  var PY2 = TH.createP(vertices2);
                  LT.add(PY1,PY2);
              }
              LT.add(line1,line2,PT);
              scene2.add(LT);

              scene1.remove(LL);
              LL=new THREE.Group();
              $('.right-top div').html('<span></span>');
              SS.visible=true;
              if(y1==5 && y2==-1){
                  TH.ImgL('static/UI/subject3.png',function(){
                      $('.leftMain').css({
                          backgroundImage:'url(static/UI/subject3.png)'
                      });
                  });
                  $('.right-top div:eq(2)').html('<span></span>正侧符合还原');
                  $('.right-top div:nth-child(3) span').css('background', '#5CAEFD');
              }else if(y1!=-5){
                  TH.ImgL('static/UI/subject2.png',function(){
                      $('.leftMain').css({
                          backgroundImage:'url(static/UI/subject2.png)'
                      });
                  });
                  var vertices=[];
                  vertices.push(new THREE.Vector3(2.04,-5.08,0),new THREE.Vector3(8.1,-5.08,0),new THREE.Vector3(8.1,y2,0),new THREE.Vector3(2.04,y1,0),new THREE.Vector3(2.04,-5.08,0));
                  var line3=TH.createLineMesh(vertices,'#5CAEFD',3,2.1);

                  vertices=[];
                  vertices.push(new THREE.Vector3(-8.1,YC,0),new THREE.Vector3(-8.1,-5.08,0),new THREE.Vector3(-2.03,-5.08,0),new THREE.Vector3(-2.03,YC,0));
                  var line4=TH.createLineMesh(vertices,'#5CAEFD',3,2.1);

                  vertices=[];
                  for(var i=0;i<361;i+=4){
                      var xz=a*Math.cos(i*PI)-5.08;
                      var yz=-b*Math.sin(i*PI)*cosT+YC;
                      var zz=b*Math.sin(i*PI)*sinT;
                      vertices.push(new THREE.Vector3(xz,yz,zz));
                  }
                  var line5=TH.createLineMesh(vertices,'#5CAEFD',3,2.1);
                  LL.add(line3,line4,line5);
                  scene1.add(LL);
                  $('.right-top div:eq(1)').html('<span></span>俯视确定基调');
                  $('.right-top div:nth-child(2) span').css('background', '#5CAEFD');
              }else{
                  LT.visible=false;
                  $('.right-top div:eq(0)').html('<span></span>确定基本图形');
                  $('.right-top div:first span').css('background', '#5CAEFD');
              }
          },
          rotate1: function (aim) {
            var position = camera2.position;
            var x = aim[0] - position.x,
              y = aim[1] - position.y,
              z = aim[2] - position.z;
            var n = 20, v1 = x / n, v2 = y / n, v3 = z / n;
            a = setInterval(() => {
              n--;
              if (n < 0) {
                clearInterval(a);
                return false;
              }
              position = camera2.position;
              camera2.position.set(position.x + v1, position.y + v2, position.z + v3);
            }, 40);
          },
          //拖动事件结束
          //造面
          createP: function (vertices) {
            var geometry = new THREE.Geometry(); //声明一个空几何体对象
            var p1 = vertices[0]; //顶点1坐标
            var p2 = vertices[1]; //顶点2坐标
            var p3 = vertices[2]; //顶点3坐标

            geometry.vertices.push(p1, p2, p3); //顶点坐标添加到geometry对象

            var face = new THREE.Face3(0, 1, 2); //创建三角面
            geometry.faces.push(face); //三角面添加到几何体
            var material = new THREE.MeshBasicMaterial({
              color: '#A8F1E0',//三角面颜色
              side: THREE.DoubleSide//两面可见
            });//材质对象
            var mesh = new THREE.Mesh(geometry, material);//网格模型对象
            return mesh;
          },
          //开始按钮
          btnClick: function () {
            if (thiz.start.color === '#000000') {
              $('.mainD').hide();
              $('canvas').show();
              thiz.start.color = '#cccccc';

              $('.right-top div:eq(0)').html('<span></span>确定基本图形');
              $('.right-top div:first span').css('background', '#5CAEFD');
              thiz.yes = false;

              TH.ImgL('static/UI/subject2.png',function(){
                  $('.leftMain').css({
                      backgroundImage:'url(static/UI/subject2.png)'
                  });
              });
              //辅助线
              thiz.switch_checked4 = true;
              thiz.switch_checked4O1 = 'yes';
              thiz.switch_checked4O2 = 'yes';

              FZ.visible=true;
            } else {
              thiz.yes = true;
              return;
            }
          },
          //计算界面
          setStyle: function () {
              var zoom,zoom1;
              if(window.innerHeight<600){
                  zoom1=0.6;
              }else{
                  zoom1=1;
              }
              var mainHeight = $(window).height()-120 ;
              var mainWidth = $(window).width() -400*zoom1-160;
              if(mainWidth>430){
                  zoom=1;
              }else{
                  zoom=mainWidth/430;
              }
              $('.left').css('zoom',zoom1);
              $('#main .mainD').css('zoom',zoom);
              $('#main').css({
                  width: mainWidth + 'px',
                  height: mainHeight + 'px',
                  marginTop: '10px',
              });
          },
          //造线
          createLineMesh: function (vertices, color, style, width) {
            var lineMesh = null, geometryLine = new THREE.Geometry();
            if (!color) {
              color = '#000';
            }
            if (style == 2) {
              geometryLine.vertices = vertices;
              geometryLine.computeLineDistances();
              lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                dashSize: 0.15,
                gapSize: 0.15,
                depthTest: false,
                transparent: true,
                linewidth: width,
                opacity: 0.5,
              }));
            } else if (style == 3) {
              geometryLine.vertices = vertices;
              lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color, linewidth: width}));
            }
            return lineMesh;
          },
          //初始化
          init1: function () {
            var leftCanvasWidth = $('#leftCanvas').width();
            var leftCanvasHeight = $('#leftCanvas').height();
            //canvas渲染
            if (isMob) {
              renderer1 = new THREE.WebGLRenderer({antialias: true, alpha: true});
            } else {
              renderer1 = new THREE.CanvasRenderer({antialias: true, alpha: true});
            }
            renderer1.setPixelRatio(window.devicePixelRatio);
            renderer1.autoClear = false;
            renderer1.setSize(leftCanvasWidth, leftCanvasHeight);
            renderer1.setClearColor(0xffffff, 0);
            document.getElementById('leftCanvas').appendChild(renderer1.domElement);

            scene1 = new THREE.Scene();
            scene1.position.set(1,2,0);

            camera1 = new THREE.OrthographicCamera(leftCanvasWidth / -25.1, leftCanvasWidth / 25.1, leftCanvasHeight / 25.1, leftCanvasHeight / -25.1, -10, 100);
            camera1.position.set(0, 0, 5);
          },
          init2: function () {
            mainWidth = $('#main').width();
            mainHeight = $('#main').height();
            //canvas渲染
            renderer2 = new THREE.WebGLRenderer({antialias: true});
            // renderer
            renderer2.setPixelRatio(window.devicePixelRatio);
            renderer2.autoClear = false;
            renderer2.setSize(mainWidth, mainHeight);
            renderer2.setClearColor(0xffffff);
            document.getElementById('main').appendChild(renderer2.domElement);

            // scene
            scene2 = new THREE.Scene();

            // camera
            camera2 = new THREE.OrthographicCamera(mainWidth / -40, mainWidth / 40, mainHeight / 40, mainHeight / -40, -10, 100);
            camera2.position.set(0, 8, 20);

            // controls
            controls2 = new THREE.OrbitControls(camera2, renderer2.domElement);
            controls2.enableDamping = true;
            controls2.dampingFactor = 0.25;
            controls2.enableZoom = true;
            controls2.enableRotate = true;
            controls2.enablePan = false;

            var verticesC=[],vertices;
            for(var i=0;i<361;i++){
                var x=3*Math.cos(i*Math.PI/180);
                var z=3*Math.sin(i*Math.PI/180);
                verticesC.push(new THREE.Vector3(x,5,z));
            }
            var line1=TH.createLineMesh(verticesC,'#000',2,1);
            vertices=[];
            vertices.push(new THREE.Vector3(-3,-5,0),new THREE.Vector3(-3,5,0));
            var line2=TH.createLineMesh(vertices,'#000',2,1);
            vertices=[];
            vertices.push(new THREE.Vector3(3,-5,0),new THREE.Vector3(3,5,0));
            var line3=TH.createLineMesh(vertices,'#000',2,1);
            FZ.add(line1,line2,line3);
            FZ.visible=false;

            var lineBP1=TH.createLineMesh(verticesC,'#000',2,1);
            var lineBP2=TH.createLineMesh(verticesC,'#000',3,1.5);
            lineBP1.position.y=-10;
            lineBP2.position.y=-10;
            var material = new THREE.MeshBasicMaterial({color: '#A8F1E0',side:THREE.DoubleSide});
            var cube = new THREE.Mesh(new THREE.CircleGeometry(3, 36), material);
            cube.rotation.x=Math.PI/2;
            cube.position.y=-5;
            SS.add(cube,lineBP1,lineBP2);

            dragP1=TH.createDragPlan();
            dragP1.position.set(0,-5,-3);
//            dragP1.rotation.y=Math.PI/2;
            dragP1.name='ctrl1';
            dragP2=TH.createDragPlan();
            dragP2.position.set(0,-5,3);
            dragP2.name='ctrl2';
            dragP2.visible=false;
            selectobjs.push(dragP1,dragP2);
            scene2.add(FZ,SS,dragP1,dragP2);
          },
          //可拖动的点
          createDragPlan: function () {
            var geometry = new THREE.PlaneGeometry(1.8, 3, 1, 1);
            var texture = THREE.ImageUtils.loadTexture('./static/UI/arrow.png');
            // material
            var material = new THREE.MeshBasicMaterial({
              map: texture,
              color: '#ffffff',
              side: THREE.DoubleSide,
              transparent: true,
            });
            // mesh
            var p = new THREE.Mesh(geometry, material);
            return p;
          },
          animate: function () {
            requestAnimationFrame(TH.animate);
            renderer1.clear();
            //面和实线场景
            renderer1.render(scene1, camera1);

            controls2.update();
            renderer2.clear();
            //面和实线场景
            renderer2.render(scene2, camera2);
            if (thiz.radio_checked1 === thiz.radio_checked1O) {
              //不做任何操作
            } else if (thiz.radio_checked1 === 'one') {
              clearInterval(a);
              TH.rotate1([0, 0, 18]);
            } else if (thiz.radio_checked1 === 'two') {
              clearInterval(a);
              TH.rotate1([-12, 0, 0]);
            } else if (thiz.radio_checked1 === 'three') {
              clearInterval(a);
              TH.rotate1([0, 16, 0.01]);
            }
            if (thiz.switch_checked4) {
              thiz.switch_checked4O1 = 'yes';
            } else {
              thiz.switch_checked4O1 = '';
            }
            if (thiz.switch_checked4O1 == thiz.switch_checked4O2) {
              //不做任何操作
            } else if (thiz.switch_checked4O1 == 'yes') {
               FZ.visible = true;
            } else if (thiz.switch_checked4O1 == '') {
               FZ.visible = false;
            }
            thiz.radio_checked1O = thiz.radio_checked1;
            thiz.switch_checked4O2 = thiz.switch_checked4O1;
          },
          ImgL: function (src, callback) {
            var img = new Image();
            img.src = src;
            img.onload = function () {
              callback && callback();
            }
          },
          //重置
          resetWidget: function () {
            thiz.start.color = '#000000';
            $('.right-top div').html('<span></span>');
            $('.right-top div span').css('background', '#bad6f2');
            TH.ImgL('static/UI/subject.png',function(){
                $('.leftMain').css({
                    backgroundImage:'url(static/UI/subject.png)'
                });
            });
            FZ.visible=false;
            dragP1.position.y=-5;
            dragP2.position.y=-5;
            dragP2.visible=false;
            scene2.remove(LT);
            scene1.remove(LL);
            thiz.yes = true;
            thiz.radio_checked1 = '';
            thiz.switch_checked4 = null;
            thiz.radio_checked1O = '';
            thiz.switch_checked4O1 = '';
            thiz.switch_checked4O2 = '';
            camera2.position.set(0, 8, 20);
            camera2.zoom = 1;
            camera2.updateProjectionMatrix();
            $('.mainD').show();
            $('canvas').hide();
          }
        }
        TH.setStyle();
        TH.init1();
        TH.init2();
        TH.animate();
        renderer2.domElement.addEventListener('mousedown', TH.onDocumentMouseDown, false);
        renderer2.domElement.addEventListener('mousemove', TH.onDocumentMouseMove, false);
        renderer2.domElement.addEventListener('mouseup', TH.onDocumentMouseUp, false);
        renderer2.domElement.addEventListener('touchstart', TH.onDocumentTouchStart, false);
        renderer2.domElement.addEventListener('touchmove', TH.onDocumentTouchMove, false);
        renderer2.domElement.addEventListener('touchend', TH.onDocumentTouchEnd, false);
        if (isMob) {
          $('.startC').on('touchstart', TH.btnClick);
          $('.reset').on('touchstart', TH.resetWidget);
        } else {
          $('.startC').on('click', TH.btnClick);
          $('.reset').on('click', TH.resetWidget);
        }
        window.onresize = () => {
          TH.setStyle();
        };
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
  .container {
    width: 100%;
    height: calc(100% - 76px);
    overflow: hidden;
  }

  canvas {
    width: 100%;
    height: 100%;
    display: none;
  }

  .insp-wrapper {
    width: 100%;
    height: 100%;
  }

  .left {
    width: 372px;
    height: 100%;
    float: left;
    margin: auto auto auto 24px;
    position: relative;
  }

  .leftBody {
    height: 460px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0
  }

  #leftCanvas {
    width: 300px;
    height: 250px;
    margin: 110px auto auto auto;
  }

  #main {
    float: left;
    margin-left: 20px;
  }

  .right {
    float: right;
    width: 100px;
    height: 100%;
    margin-right: 24px;
    position: relative
  }

  .right-top {
    width: 221px;
    margin: auto auto 27px -121px;
    height: 32px;
  }

  .step {
    width: 72px;
    margin-left: 1px;
    height: 100%;
    float: left;
    text-align: center;
    font-size: 12px;
    color: #4D4D4D;
  }

  .step span {
    width: 72px;
    height: 6px;
    background: #bad6f2;
    border-radius: 100px;
    display: block;
    margin-bottom: 6px;
  }

</style>
