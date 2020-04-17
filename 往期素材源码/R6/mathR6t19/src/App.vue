<template>
  <div id="app" class="noselect">
    <!--头部-->
    <ui-head :title="title">
      <ui-btn type="reset1" class="resetWidget"></ui-btn>
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
        <div class="mainD"
             :style="'border:1px dashed #ccc;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;width:430px;height:282px;'">
          <p class="startC"
             :style="'cursor: pointer;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;text-align:center;width:100px;height:20px;line-height:20px;'">
            点击开始</p>
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
                  style="margin-top: 30px" class="btnClick4">辅助线
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
        title: '2014年安徽理（7）',
        leftMain: {
          height: '400px',
          width: '100%',
          background: 'url(static/UI/subject.png) no-repeat',
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
        h1:-4,
        h2:4,
        l1Show:false,
        l2Show:false,
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
    computed: {},
    methods: {
      //初始化
      init() {
        var camera1 = null;
        var camera2 = null
        var scene1 = new THREE.Scene()
        var scene2 = new THREE.Scene();
        var renderer1 = null;
        var renderer2 = null;
        var controls1 = null;
        var controls2 = null;
        //拖动的面
        var dragPlane = null;
        var dragPlane1 = null;
        //立方体实线
        var cubeLine = new THREE.Group();
        //立方体虚线
        var cubeLineDash = new THREE.Group();
        //三角面
        var triangle = new THREE.Group();
        //辅助线
        var guide = new THREE.Group();
        //左边的线
        var leftLine = new THREE.Group();
        var leftLine1 = new THREE.Group();
        //四个点
        var circle = new THREE.Group();
        //视图区鼠标事件操作相关变量
        var raycaster = new THREE.Raycaster();
        var Plane = new THREE.Plane();
        var Plane1 = new THREE.Plane();
        var offset = new THREE.Vector3();
        var intersection = new THREE.Vector3();
        var intersection1 = new THREE.Vector3();
        var mouse = new THREE.Vector2();
        var INTERSECTED = null;
        var INTERSECTED1 = null;
        var mousedownflag = false;
        var mousedownflag1 = false;
          var mousedownflag2 = false;
        var a = null;
        var selectobjs = [];
        var selectobjs1 = [];
        var selectobjs2 = [];
        var selectobjs3 = [];
        var selectobjs4 = [];
        var selectobjs5 = [];
        var isMob = /iPad|Android/g.test(navigator.userAgent);
        var selectobj = null, selectobj1 = null;
        var selectobj2 = null;
        var selectobj3 = null;
        var selectobj4 = null;
        var selectobj5 = null;
        var thiz = this;
        var mainHeight = null;
        var mainWidth = null;
        var lineLeftDash = null;
        var lineRight = null;
        var TH = {
          init1() {
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
            camera1 = new THREE.PerspectiveCamera(40, leftCanvasWidth / leftCanvasHeight, 1, 100);
            camera1.position.set(0, 0, 5);
            controls1 = new THREE.OrbitControls(camera1, renderer1.domElement);
            controls1.enableDamping = true;
            controls1.dampingFactor = 0.25;
            controls1.enableZoom = false;
            controls1.enableRotate = false;
            controls1.enablePan = false;
          },
          init2() {
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
            // camera
            camera2 = new THREE.OrthographicCamera(mainWidth / -50, mainWidth / 50, mainHeight / 50, mainHeight / -50, -10, 100);
            camera2.position.set(18, 12, 27);
            // controls
            controls2 = new THREE.OrbitControls(camera2, renderer2.domElement);
            controls2.enableDamping = true;
            controls2.dampingFactor = 0.25;
            controls2.enableZoom = true;
            controls2.enableRotate = true;
            controls2.enablePan = false;

            //虚线
            TH.createLine(2,1);
            cubeLineDash.visible = false;

            TH.createSpot();
            circle.visible = false;

            TH.createDragPlane();
          },
          //画点
          createSpot() {
            var CircleM = new THREE.MeshBasicMaterial({color: '#F5A623'});
            var CircleM1 = new THREE.MeshBasicMaterial({color: '#7ED321'});
            var CircleG = new THREE.SphereGeometry(0.3, 16, 16);

            var big = new THREE.MeshBasicMaterial({color: '#f53c77',transparent: true, opacity: 0});
            var bigG = new THREE.SphereGeometry(1);

            var Circle = new THREE.Mesh(CircleG, CircleM);
            var Circle1 = new THREE.Mesh(CircleG, CircleM);
            var Circle2 = new THREE.Mesh(CircleG, CircleM1);
            var Circle3 = new THREE.Mesh(CircleG, CircleM1);

            var Circle21 = new THREE.Mesh(bigG, big);
            var Circle22 = new THREE.Mesh(bigG, big);
            var Circle23 = new THREE.Mesh(bigG, big);
            var Circle24 = new THREE.Mesh(bigG, big);

            Circle.position.set(0, -4, 4);
            Circle1.position.set(-4, -4, 0);
            Circle2.position.set(4, 4, 0);
            Circle3.position.set(0, 4, -4);

            Circle21.position.set(0, -4, 4);
            Circle22.position.set(-4, -4, 0);
            Circle23.position.set(4, 4, 0);
            Circle24.position.set(0, 4, -4);

            circle.add(Circle, Circle1, Circle2, Circle3,Circle21,Circle22,Circle23,Circle24);
            selectobjs2.push(Circle21);
            selectobjs3.push(Circle22);
            selectobjs4.push(Circle23);
            selectobjs5.push(Circle24);
            scene2.add(circle);
          },
          //造线
          createLineMesh(vertices, color, style, width) {
            var lineMesh = null, geometryLine = new THREE.Geometry();
            if (!color) {
              color = '#000';
            }
            if (style == 2) {
              geometryLine.vertices = vertices;
              geometryLine.computeLineDistances();
              lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                dashSize: 0.233,
                gapSize: 0.233,
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
          //立方体实线虚线方程
          createLine(type,lineWidth) {
            var vertices = [], line, vertices1 = [], line1, vertices2 = [], line2, vertices3 = [], line3,
              vertices4 = [],
              line4, vertices5 = [], line5, vertices6 = [], line6, vertices7 = [], line7;
            //左面
            vertices.push(
              new THREE.Vector3(-4, 0, 4),
              new THREE.Vector3(-4, 4, 4),

              new THREE.Vector3(-4, 4, 4),
              new THREE.Vector3(-4, 4, -4),

              new THREE.Vector3(-4, 4, -4),
              new THREE.Vector3(-4, -4, -4),

              new THREE.Vector3(-4, -4, -4),
              new THREE.Vector3(-4, -4, 0),
            );
            line = TH.createLineMesh(vertices, '#000000', type, lineWidth);

            //右面
            vertices1.push(
              new THREE.Vector3(4, 4, 0),
              new THREE.Vector3(4, 4, 4),

              new THREE.Vector3(4, 4, 4),
              new THREE.Vector3(4, -4, 4),

              new THREE.Vector3(4, -4, 4),
              new THREE.Vector3(4, -4, -4),

              new THREE.Vector3(4, -4, -4),
              new THREE.Vector3(4, 0, -4),
            );
            line1 = TH.createLineMesh(vertices1, '#000000', type, lineWidth);

            //前下
            vertices2.push(
              new THREE.Vector3(4, -4, 4),
              new THREE.Vector3(0, -4, 4),
            );
            line2 = TH.createLineMesh(vertices2, '#000000', type, lineWidth);

            //前上
            vertices3.push(
              new THREE.Vector3(-4, 4, 4),
              new THREE.Vector3(4, 4, 4),
            );
            line3 = TH.createLineMesh(vertices3, '#000000', type, lineWidth);

            //后上
            vertices4.push(
              new THREE.Vector3(-4, 4, -4),
              new THREE.Vector3(0, 4, -4),
            );
            line4 = TH.createLineMesh(vertices4, '#000000', type, lineWidth);

            //后下
            vertices5.push(
              new THREE.Vector3(-4, -4, -4),
              new THREE.Vector3(4, -4, -4),
            );
            line5 = TH.createLineMesh(vertices5, '#000000', type, lineWidth);

            //三棱锥
            //左下三棱锥面
            if (thiz.h1 == -4) {
              vertices6.push(
                new THREE.Vector3(-4, -4, 0),

                new THREE.Vector3(-4, -4, 4),
                new THREE.Vector3(0, -4, 4),
              );
              var vertices66=[];
              vertices66.push(
                  new THREE.Vector3(-4, 0, 4),

                  new THREE.Vector3(-4, -4, 4)
              );
              var line66 = TH.createLineMesh(vertices66, '#000000', type, lineWidth);
              if (type == 2) {
                  cubeLineDash.add(line66);
              } else {
                  cubeLine.add(line66);
              }
            } else {
              vertices6.push(
                new THREE.Vector3(-4, thiz.h1, 4),
                new THREE.Vector3(0, -4, 4),

                new THREE.Vector3(0, -4, 4),
                new THREE.Vector3(-4, -4, 0),

                new THREE.Vector3(-4, -4, 0),
                new THREE.Vector3(-4, thiz.h1, 4),

                new THREE.Vector3(-4, thiz.h1, 4),
                new THREE.Vector3(-4, 0, 4),
              );
            }
            line6 = TH.createLineMesh(vertices6, '#000000', type, lineWidth);

            //右上三棱锥面
            if (thiz.h2 == 4) {
              vertices7.push(
                new THREE.Vector3(0, 4, -4),
                new THREE.Vector3(4, 4, -4),
                new THREE.Vector3(4, 4, 0),
              );
              var vertices77=[];
              vertices77.push(
                  new THREE.Vector3(4, 4, -4),
                  new THREE.Vector3(4, 0, -4),
              );
              var line77 = TH.createLineMesh(vertices77, '#000000', type, lineWidth);
              if (type == 2) {
                  cubeLineDash.add(line77);
              } else {
                  cubeLine.add(line77);
              }
            } else {
              vertices7.push(
                new THREE.Vector3(4, thiz.h2, -4),
                new THREE.Vector3(0, 4, -4),

                new THREE.Vector3(0, 4, -4),
                new THREE.Vector3(4, 4, 0),

                new THREE.Vector3(4, 4, 0),
                new THREE.Vector3(4, thiz.h2, -4),

                new THREE.Vector3(4, thiz.h2, -4),
                new THREE.Vector3(4, 0, -4),
              );
            }
            line7 = TH.createLineMesh(vertices7, '#000000', type, lineWidth);

            if (type == 2) {
              cubeLineDash.add(line, line1, line2, line3, line4, line5, line6, line7);
              scene2.add(cubeLineDash);
            } else {
              cubeLine.add(line, line1, line2, line3, line4, line5, line6, line7);
              scene2.add(cubeLine);
            }
          },
          //可拖动的两个面
          createDragPlane() {
            //可拖动的点
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
            dragPlane = new THREE.Mesh(geometry, material);
            dragPlane.position.set(-4, -4, 4.1);
            dragPlane.visible = false;
            selectobjs.push(dragPlane);

            var geometry1 = new THREE.PlaneGeometry(1.8, 3, 1, 1);
            var texture1 = THREE.ImageUtils.loadTexture('./static/UI/arrow.png');
            // material
            var material1 = new THREE.MeshBasicMaterial({
              map: texture1,
              color: '#ffffff',
              side: THREE.DoubleSide,
              transparent: true,
            });
            // mesh
            dragPlane1 = new THREE.Mesh(geometry1, material1);
            dragPlane1.position.set(4, 4, -4.1);
            dragPlane1.visible = false;
            selectobjs1.push(dragPlane1);
            scene2.add(dragPlane, dragPlane1);
            dragPlane.visible = false;
            dragPlane1.visible = false;
          },
          //辅助线
          createGuide() {
            guide = new THREE.Group();
            if(thiz.h1!=-4){
                var vertices = [];
                vertices.push(new THREE.Vector3(-4,-4,0),new THREE.Vector3(-4,-4,4),new THREE.Vector3(0,-4,4));
                var line1=TH.createLineMesh(vertices,'#000',2,1);
                vertices = [];
                vertices.push(new THREE.Vector3(-4,-4,4),new THREE.Vector3(-4,0,4));
                var line2=TH.createLineMesh(vertices,'#000',2,1);
                guide.add(line1,line2);
            }
            if(thiz.h2!=4){
                var vertices = [];
                vertices.push(new THREE.Vector3(4,4,0),new THREE.Vector3(4,4,-4),new THREE.Vector3(0,4,-4));
                var line1=TH.createLineMesh(vertices,'#000',2,1);
                vertices = [];
                vertices.push(new THREE.Vector3(4,4,-4),new THREE.Vector3(4,0,-4));
                var line2=TH.createLineMesh(vertices,'#000',2,1);
                guide.add(line1,line2);
            }
            scene2.add(guide);
          },
          //开始按钮
          btnClick() {
              $('canvas').show();
              $('.mainD').hide();
              thiz.start.color = '#cccccc';
              //实线
              cubeLine.visible = true;
              //虚线
              cubeLineDash.visible = true;
              //点
              circle.visible = true;
              //三角面
              triangle.visible = true;
              //辅助线
              thiz.yes = false;
              thiz.switch_checked4 = true;
              $('.right-top div:eq(0)').html('<span></span>确定基本图形');
              $('.right-top div:first span').css('background', '#5CAEFD');
          },
          //计算界面
          setStyle() {
            var zoom, zoom1;
            if (window.innerHeight < 600) {
              zoom1 = 0.6;
            } else {
              zoom1 = 1;
            }
            var mainHeight = $(window).height() - 120;
            var mainWidth = $(window).width() - 400 * zoom1 - 160;
            if (mainWidth > 430) {
              zoom = 1;
            } else {
              zoom = mainWidth / 430;
            }
            $('.left').css('zoom', zoom1);
            $('#main .mainD').css('zoom', zoom);
            $('#main').css({
              width: mainWidth + 'px',
              height: mainHeight + 'px',
              marginTop: '10px',
            });
          },
          //造面
          createTriangle(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
          	var x1=x1>0?x1-0.01:x1+0.01;
          	var z1=z1>0?z1-0.01:z1+0.01;
          	var x2=x2>0?x2-0.01:x2+0.01;
          	var z2=z2>0?z2-0.01:z2+0.01;
          	var x3=x3>0?x3-0.01:x3+0.01;
          	var z3=z3>0?z3-0.01:z3+0.01;
            var geometry = new THREE.Geometry(); //声明一个空几何体对象
            var p1 = new THREE.Vector3(x1, y1, z1); //顶点1坐标
            var p2 = new THREE.Vector3(x2, y2, z2); //顶点2坐标
            var p3 = new THREE.Vector3(x3, y3, z3); //顶点3坐标

            geometry.vertices.push(p1, p2, p3); //顶点坐标添加到geometry对象

            var face = new THREE.Face3(0, 1, 2); //创建三角面
            geometry.faces.push(face); //三角面添加到几何体
            var material = new THREE.MeshBasicMaterial({
              color: '#A8F1E0',//三角面颜色
              side: THREE.DoubleSide//两面可见
            });//材质对象
            var mesh = new THREE.Mesh(geometry, material);//网格模型对象
            triangle.add(mesh);
            scene2.add(triangle);//网格模型添加到场景中
          },
          //左边异色的线
          createHarmoniaLine(h) {
            var vertices = [], vertices1 = [], line1, line2;
            vertices.push(
              new THREE.Vector3(-1.37, 0.238, 0),
              new THREE.Vector3(-0.8, 0.238, 0),
              new THREE.Vector3(-1.37, h + 0.238, 0),
              new THREE.Vector3(-1.37, 0.238, 0),
            );
            line1 = TH.createLineMesh(vertices, '#5CAEFD', 3, 2.5);

            vertices1.push(
              new THREE.Vector3(0.99, 0.238, 0),
              new THREE.Vector3(1.56, 0.238, 0),
              new THREE.Vector3(1.56, h + 0.238, 0),
              new THREE.Vector3(0.99, 0.238, 0),
            );
            line2 = TH.createLineMesh(vertices1, '#5CAEFD', 3, 2.5);
            leftLine.add(line1, line2);
            scene1.add(leftLine);
          },
          createHarmoniaLine1(h) {
            var vertices = [], vertices1 = [], line1, line2;
            vertices.push(
              new THREE.Vector3(-0.82, 1.35, 0),
              new THREE.Vector3(-0.26, 1.35, 0),
              new THREE.Vector3(-0.26, 1.35 + h, 0),
              new THREE.Vector3(-0.82, 1.35, 0),
            );
            line1 = TH.createLineMesh(vertices, '#5CAEFD', 3, 2.5);

            vertices1.push(
              new THREE.Vector3(1, 1.35, 0),
              new THREE.Vector3(0.44, 1.35, 0),
              new THREE.Vector3(0.44, h + 1.35, 0),
              new THREE.Vector3(1, 1.34, 0),
            );
            line2 = TH.createLineMesh(vertices1, '#5CAEFD', 3, 2.5);
            leftLine1.add(line1, line2);
            scene1.add(leftLine1);
          },
          animate() {
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
              TH.createGuide();
            } else if (thiz.switch_checked4O1 == '') {
              scene2.remove(guide);
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
          resetWidget() {
            thiz.l1Show = false;
            thiz.l2Show = false;
            clearInterval(a);
            thiz.start.color = '#000000';
            $('.right-top div').html('<span></span>');
            $('.right-top div span').css('background', '#bad6f2');
            TH.ImgL('static/UI/subject.png', function () {
              $('.leftMain').css({
                background: 'url(static/UI/subject.png)',
                backgroundRepeat: 'no-repeat',
                height: '400px',
                width: '100%',
                backgroundSize: '100% 100%',
                overflow: 'hidden'
              });
            });
            scene2.remove( cubeLine, cubeLineDash, triangle, guide,lineLeftDash,lineRight);
            scene1.remove(leftLine, leftLine1);
            dragPlane.visible = false;
            dragPlane1.visible = false;
            dragPlane.position.set(-4, -4, 4.1);
            dragPlane1.position.set(4, 4, -4.1);
            leftLine = new THREE.Group();
            leftLine1 = new THREE.Group();
            guide = new THREE.Group();
            cubeLine = new THREE.Group();
            cubeLineDash = new THREE.Group();
            triangle = new THREE.Group();
            thiz.yes = true;
            //虚线
            thiz.h1 = -4;
            thiz.h2 = 4;
            TH.createLine(2,1);
            cubeLineDash.visible = false;
            circle.visible = false;
            thiz.radio_checked1 = '';
            thiz.radio_checked1O = '';
            thiz.switch_checked4 = false;
            thiz.switch_checked4O1 = '';
            thiz.switch_checked4O2 = '';
            camera2.position.set(18, 12, 27);
            camera2.zoom = 1;
            camera2.updateProjectionMatrix();
            $('.mainD').show();
            $('canvas').hide();
          },
          createMouseL1:function (callback) {
            thiz.l1Show = true;
            dragPlane.visible = true;
            var vertices = [];
            vertices.push(
              new THREE.Vector3(0, -4, 4),
              new THREE.Vector3(-4, -4, 0),
            );
            lineLeftDash = TH.createLineMesh(vertices, '#000000', 2, 1);
            scene2.add(lineLeftDash);
            if(dragPlane1.visible){
              TH.ImgL('static/UI/subject5.png', function () {
                $('.leftMain').css({
                  background: 'url(static/UI/subject5.png)',
                  backgroundRepeat: 'no-repeat',
                  height: '400px',
                  width: '100%',
                  backgroundSize: '100% 100%',
                  overflow: 'hidden'
                });
                if(dragPlane1.visible == true){
                    callback && callback();
                }
              });
            }else {
              TH.ImgL('static/UI/subject3.png', function () {
                $('.leftMain').css({
                  background: 'url(static/UI/subject3.png)',
                  backgroundRepeat: 'no-repeat',
                  height: '400px',
                  width: '100%',
                  backgroundSize: '100% 100%',
                  overflow: 'hidden'
                });
                  if(dragPlane1.visible == true){
                      callback && callback();
                  }
              });
            }
          },
          createMouseL2:function (callback) {
            thiz.l2Show = true;
            dragPlane1.visible = true;
            var vertices = [];
            vertices.push(
              new THREE.Vector3(0, 4, -4),
              new THREE.Vector3(4, 4, 0),
            );
            lineRight = TH.createLineMesh(vertices, '#000000', 3, 1);
            scene2.add(lineRight);
            if(dragPlane.visible){
              TH.ImgL('static/UI/subject5.png', function () {
                $('.leftMain').css({
                  background: 'url(static/UI/subject5.png)',
                  backgroundRepeat: 'no-repeat',
                  height: '400px',
                  width: '100%',
                  backgroundSize: '100% 100%',
                  overflow: 'hidden'
                });
                  if(dragPlane.visible == true){
                      callback && callback();
                  }
              });
            }else {
              TH.ImgL('static/UI/subject4.png', function () {
                $('.leftMain').css({
                  background: 'url(static/UI/subject4.png)',
                  backgroundRepeat: 'no-repeat',
                  height: '400px',
                  width: '100%',
                  backgroundSize: '100% 100%',
                  overflow: 'hidden'
                });
                  if(dragPlane.visible == true){
                      callback && callback();
                  }
              });
            }
          },
          //拖动事件
          onDocumentMouseDown: function (event) {
            var offsetLeft = parseInt($('#main').offset().left);
            var offsetTop = parseInt($('#main').offset().top);
            event.preventDefault();
            var mouse = {};
            mouse.x = ((event.clientX - offsetLeft) / mainWidth ) * 2 - 1;
            mouse.y = -( (event.clientY - offsetTop) / mainHeight ) * 2 + 1;
            raycaster.setFromCamera(mouse, camera2);
            var intersects = raycaster.intersectObjects(selectobjs);
            var intersects1 = raycaster.intersectObjects(selectobjs1);
            var intersects2 = raycaster.intersectObjects(selectobjs2);
            var intersects3 = raycaster.intersectObjects(selectobjs3);
            var intersects4 = raycaster.intersectObjects(selectobjs4);
            var intersects5 = raycaster.intersectObjects(selectobjs5);
              mousedownflag2=true;
            if (intersects.length > 0) {
              selectobj = intersects[0].object;
              mousedownflag = true;
              controls2.enableRotate = false;
            }
            if (intersects1.length > 0) {
              selectobj1 = intersects1[0].object;
              mousedownflag1 = true;
              controls2.enableRotate = false;
            }
            if (intersects2.length > 0) {
                  if(thiz.l1Show != true){
                    TH.createMouseL1(TH.changeImg);
                  }
              selectobj2 = intersects2[0].object;
            }
            if (intersects3.length > 0) {

                  if(thiz.l1Show != true){
                    TH.createMouseL1(TH.changeImg);
                  }
              selectobj3 = intersects3[0].object;
            }
            if (intersects4.length > 0) {
                  if(thiz.l2Show != true){
                    TH.createMouseL2(TH.changeImg);
                  }
              selectobj4 = intersects4[0].object;
            }
            if (intersects5.length > 0) {

                  if(thiz.l2Show != true){
                    TH.createMouseL2(TH.changeImg);
                  }
              selectobj5 = intersects5[0].object;
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
            var intersects1 = raycaster.intersectObjects(selectobjs1);
            if (intersects.length > 0) {
              if (INTERSECTED != intersects[0].object) {
                INTERSECTED = intersects[0].object;
                Plane.setFromNormalAndCoplanarPoint(camera2.getWorldDirection(Plane.normal), INTERSECTED.position);
              }
            }
            if (intersects1.length > 0) {
              if (INTERSECTED1 != intersects1[0].object) {
                INTERSECTED1 = intersects1[0].object;
                Plane1.setFromNormalAndCoplanarPoint(camera2.getWorldDirection(Plane1.normal), INTERSECTED1.position);
              }
            }
            if (mousedownflag) {
              if (raycaster.ray.intersectPlane(Plane, intersection)) {
                var obj = intersection.sub(offset), h;
                thiz.h1 = obj.y.toFixed(1);
                h = (4 + parseFloat(thiz.h1)) * 0.55 / 4;
                scene2.remove(cubeLine, cubeLineDash, triangle, guide);
                scene1.remove(leftLine);
                cubeLine = new THREE.Group();
                cubeLineDash = new THREE.Group();
                triangle = new THREE.Group();
                leftLine = new THREE.Group();
                if (thiz.h1 <= -4) {
                  //实线
                  thiz.h1 = -4;
                  //虚线
                  TH.createLine(2,1);
                  dragPlane.position.set(-4, -4, 4.1);
                  if (thiz.h2 == 4) {
                    $('.right-top div').html('<span></span>');
                    $('.right-top div:eq(0)').html('<span></span>确定基本图形');
                    $('.right-top div:first span').css('background', '#5CAEFD');
                  }
                } else if (thiz.h1 >= 0) {
                  thiz.h1 = 0;
                  dragPlane.position.set(-4, 0, 4.1);
                  if (thiz.h2 == 0) {
                    TH.createLine(3,1.5);
                    $('.right-top div').html('<span></span>');
                    $('.right-top div:eq(2)').html('<span></span>正侧符合还原');
                    $('.right-top div:nth-child(3) span').css('background', '#5CAEFD');
                  }
                } else {
                  $('.right-top div:nth-child(3) span').css('background', '#bad6f2');
                  dragPlane.position.set(-4, thiz.h1, 4.1);
                  //左边的线
                  TH.createHarmoniaLine(h);

                  $('.right-top div').html('<span></span>');
                  $('.right-top div:eq(1)').html('<span></span>俯视确定基调');
                  $('.right-top div:nth-child(2) span').css('background', '#5CAEFD');
                }
                if (thiz.switch_checked4) {
                  //辅助线
                  TH.createGuide();
                }
                //虚线
                TH.createLine(2,1);
                //面
                TH.changeImg();
                if(thiz.h1 == -4 && thiz.h2 == 4){
                  return;
                }
                TH.createTriangle(-4, -4, 0, 0, -4, 4, -4, thiz.h1, 4);
                TH.createTriangle(0, 4, -4, 4, 4, 0, 4, thiz.h2, -4);

                TH.createTriangle(-4, 4, 4, -4, thiz.h1, 4, 4, 4, 4);
                TH.createTriangle(4, 4, 4, -4, thiz.h1, 4, 0, -4, 4);
                TH.createTriangle(4, 4, 4, 0, -4, 4, 4, -4, 4);

                TH.createTriangle(4, 4, 0, 4, 4, 4, 4, -4, 4);
                TH.createTriangle(4, 4, 0, 4, -4, 4, 4, thiz.h2, -4);
                TH.createTriangle(4, thiz.h2, -4, 4, -4, 4, 4, -4, -4);

                TH.createTriangle(-4, -4, -4, -4, 4, -4, 0, 4, -4);
                TH.createTriangle(-4, -4, -4, 0, 4, -4, 4, thiz.h2, -4);
                TH.createTriangle(4, thiz.h2, -4, 4, -4, -4, -4, -4, -4);

                TH.createTriangle(-4, 4, -4, -4, -4, -4, -4, -4, 0);
                TH.createTriangle(-4, 4, -4, -4, thiz.h1, 4, -4, -4, 0);
                TH.createTriangle(-4, thiz.h1, 4, -4, 4, 4, -4, 4, -4);

                TH.createTriangle(-4, -4, 0, 4, -4, -4, -4, -4, -4);
                TH.createTriangle(4, -4, -4, -4, -4, 0, 0, -4, 4);
                TH.createTriangle(0, -4, 4, 4, -4, 4, 4, -4, -4);

                TH.createTriangle(-4, 4, -4, 0, 4, -4, -4, 4, 4);
                TH.createTriangle(-4, 4, 4, 0, 4, -4, 4, 4, 0);
                TH.createTriangle(4, 4, 0, 4, 4, 4, -4, 4, 4);
              }
            }
            if (mousedownflag1) {
              if (raycaster.ray.intersectPlane(Plane1, intersection1)) {
                var obj = intersection1.sub(offset);
                thiz.h2 = obj.y.toFixed(1);
                h = (parseFloat(thiz.h2) - 4) * 0.55 / 4;
                scene2.remove(cubeLine, cubeLineDash, triangle, guide);

                scene1.remove(leftLine1);

                cubeLine = new THREE.Group();
                cubeLineDash = new THREE.Group();
                triangle = new THREE.Group();
                leftLine1 = new THREE.Group();
                if (thiz.h2 <= 0) {
                  //实线
                  thiz.h2 = 0;
                  //虚线
                  TH.createLine(2,1);
                  dragPlane1.position.set(4, thiz.h2, -4.1);
                  if (thiz.h1 == 0) {
                    TH.createLine(3,1.5);
                    $('.right-top div').html('<span></span>');
                    $('.right-top div:eq(2)').html('<span></span>正侧符合还原');
                    $('.right-top div:nth-child(3) span').css('background', '#5CAEFD');
                  }
                } else if (thiz.h2 >= 4) {
                  thiz.h2 = 4;
                  dragPlane1.position.set(4, thiz.h2, -4.1);
                  if (thiz.h1 == -4) {
                    $('.right-top div').html('<span></span>');
                    $('.right-top div:eq(0)').html('<span></span>确定基本图形');
                    $('.right-top div:first span').css('background', '#5CAEFD');
                  }
                } else {
                  TH.createTriangle(0, 4, -4, 4, 4, 0, 4, thiz.h2, -4);
                  $('.right-top div:nth-child(3) span').css('background', '#bad6f2');
                  dragPlane1.position.set(4, thiz.h2, -4.1);
                  //左边的线
                  TH.createHarmoniaLine1(h);
                  $('.right-top div').html('<span></span>');
                  $('.right-top div:eq(1)').html('<span></span>俯视确定基调');
                  $('.right-top div:nth-child(2) span').css('background', '#5CAEFD');
                }
                if (thiz.switch_checked4) {
                  //辅助线
                  TH.createGuide();
                }
                //虚线
                TH.createLine(2,1);
                //面
                TH.changeImg();
                if(thiz.h1 == -4 && thiz.h2 == 4){
                  return;
                }
                TH.createTriangle(-4, -4, 0, 0, -4, 4, -4, thiz.h1, 4);
                TH.createTriangle(0, 4, -4, 4, 4, 0, 4, thiz.h2, -4);

                TH.createTriangle(-4, 4, 4, -4, thiz.h1, 4, 4, 4, 4);
                TH.createTriangle(4, 4, 4, -4, thiz.h1, 4, 0, -4, 4);
                TH.createTriangle(4, 4, 4, 0, -4, 4, 4, -4, 4);

                TH.createTriangle(4, 4, 0, 4, 4, 4, 4, -4, 4);
                TH.createTriangle(4, 4, 0, 4, -4, 4, 4, thiz.h2, -4);
                TH.createTriangle(4, thiz.h2, -4, 4, -4, 4, 4, -4, -4);

                TH.createTriangle(-4, -4, -4, -4, 4, -4, 0, 4, -4);
                TH.createTriangle(-4, -4, -4, 0, 4, -4, 4, thiz.h2, -4);
                TH.createTriangle(4, thiz.h2, -4, 4, -4, -4, -4, -4, -4);

                TH.createTriangle(-4, 4, -4, -4, -4, -4, -4, -4, 0);
                TH.createTriangle(-4, 4, -4, -4, thiz.h1, 4, -4, -4, 0);
                TH.createTriangle(-4, thiz.h1, 4, -4, 4, 4, -4, 4, -4);

                TH.createTriangle(-4, -4, 0, 4, -4, -4, -4, -4, -4);
                TH.createTriangle(4, -4, -4, -4, -4, 0, 0, -4, 4);
                TH.createTriangle(0, -4, 4, 4, -4, 4, 4, -4, -4);

                TH.createTriangle(-4, 4, -4, 0, 4, -4, -4, 4, 4);
                TH.createTriangle(-4, 4, 4, 0, 4, -4, 4, 4, 0);
                TH.createTriangle(4, 4, 0, 4, 4, 4, -4, 4, 4);
              }
            }
            if(mousedownflag2&&!mousedownflag&&!mousedownflag1){
                thiz.radio_checked1='';
            }
          },
          onDocumentMouseUp: function (event) {
            event.preventDefault();
            mousedownflag = false;
            mousedownflag1 = false;
              mousedownflag2=false;
            selectobj = null;
            selectobj1 = null;
            controls2.enableRotate = true;
          },
          //移动端
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
                var intersects1 = raycaster.intersectObjects(selectobjs1);
                var intersects2 = raycaster.intersectObjects(selectobjs2);
                var intersects3 = raycaster.intersectObjects(selectobjs3);
                var intersects4 = raycaster.intersectObjects(selectobjs4);
                var intersects5 = raycaster.intersectObjects(selectobjs5);
                mousedownflag2=true;
                if (intersects.length > 0) {
                    selectobj = intersects[0].object;
                    mousedownflag = true;
                    controls2.enableRotate = false;
                }
                if (intersects1.length > 0) {
                    selectobj1 = intersects1[0].object;
                    mousedownflag1 = true;
                    controls2.enableRotate = false;
                }
                if (intersects2.length > 0) {

                          if(thiz.l1Show != true){
                            TH.createMouseL1(TH.changeImg);
                          }

                    selectobj2 = intersects2[0].object;
                }
                if (intersects3.length > 0) {

                          if(thiz.l1Show != true){
                            TH.createMouseL1(TH.changeImg);
                          }

                    selectobj3 = intersects3[0].object;
                }
                if (intersects4.length > 0) {

                          if(thiz.l2Show != true){
                            TH.createMouseL2(TH.changeImg);
                          }

                    selectobj4 = intersects4[0].object;
                }
                if (intersects5.length > 0) {

                          if(thiz.l2Show != true){
                            TH.createMouseL2(TH.changeImg);
                          }

                    selectobj5 = intersects5[0].object;
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
              var intersects1 = raycaster.intersectObjects(selectobjs1);
              raycaster.setFromCamera(mouse, camera2);
              if (intersects.length > 0) {
                if (INTERSECTED != intersects[0].object) {
                  INTERSECTED = intersects[0].object;
                  Plane.setFromNormalAndCoplanarPoint(camera2.getWorldDirection(Plane.normal), INTERSECTED.position);
                }
              }
              if (intersects1.length > 0) {
                if (INTERSECTED1 != intersects1[0].object) {
                  INTERSECTED1 = intersects1[0].object;
                  Plane1.setFromNormalAndCoplanarPoint(camera2.getWorldDirection(Plane1.normal), INTERSECTED1.position);
                }
              }
            }
            if (mousedownflag) {
              if (raycaster.ray.intersectPlane(Plane, intersection)) {
                var obj = intersection.sub(offset), h;
                thiz.h1 = obj.y.toFixed(1);
                h = (4 + parseFloat(thiz.h1)) * 0.55 / 4;
                scene2.remove(cubeLine, cubeLineDash, triangle, guide);
                scene1.remove(leftLine);
                cubeLine = new THREE.Group();
                cubeLineDash = new THREE.Group();
                triangle = new THREE.Group();
                leftLine = new THREE.Group();
                if (thiz.h1 <= -4) {
                  //实线
                  thiz.h1 = -4;
                  //虚线
                  TH.createLine(2,1);
                  dragPlane.position.set(-4, -4, 4.1);
                  if (thiz.h2 == 4) {
                    $('.right-top div').html('<span></span>');
                    $('.right-top div:eq(0)').html('<span></span>确定基本图形');
                    $('.right-top div:first span').css('background', '#5CAEFD');
                  }
                } else if (thiz.h1 >= 0) {
                  thiz.h1 = 0;
                  dragPlane.position.set(-4, 0, 4.1);
                  if (thiz.h2 == 0) {
                    TH.createLine(3,1.5);
                    $('.right-top div').html('<span></span>');
                    $('.right-top div:eq(2)').html('<span></span>正侧符合还原');
                    $('.right-top div:nth-child(3) span').css('background', '#5CAEFD');
                  }
                } else {
                  $('.right-top div:nth-child(3) span').css('background', '#bad6f2');
                  dragPlane.position.set(-4, thiz.h1, 4.1);
                  //左边的线
                  TH.createHarmoniaLine(h);
                  $('.right-top div').html('<span></span>');
                  $('.right-top div:eq(1)').html('<span></span>俯视确定基调');
                  $('.right-top div:nth-child(2) span').css('background', '#5CAEFD');
                }
                if (thiz.switch_checked4) {
                  //辅助线
                  TH.createGuide();
                }
                //虚线
                TH.createLine(2,1);
                //面
                  TH.changeImg();
                if(thiz.h1 == -4 && thiz.h2 == 4){
                  return;
                }
                TH.createTriangle(-4, -4, 0, 0, -4, 4, -4, thiz.h1, 4);
                TH.createTriangle(0, 4, -4, 4, 4, 0, 4, thiz.h2, -4);

                TH.createTriangle(-4, 4, 4, -4, thiz.h1, 4, 4, 4, 4);
                TH.createTriangle(4, 4, 4, -4, thiz.h1, 4, 0, -4, 4);
                TH.createTriangle(4, 4, 4, 0, -4, 4, 4, -4, 4);

                TH.createTriangle(4, 4, 0, 4, 4, 4, 4, -4, 4);
                TH.createTriangle(4, 4, 0, 4, -4, 4, 4, thiz.h2, -4);
                TH.createTriangle(4, thiz.h2, -4, 4, -4, 4, 4, -4, -4);

                TH.createTriangle(-4, -4, -4, -4, 4, -4, 0, 4, -4);
                TH.createTriangle(-4, -4, -4, 0, 4, -4, 4, thiz.h2, -4);
                TH.createTriangle(4, thiz.h2, -4, 4, -4, -4, -4, -4, -4);

                TH.createTriangle(-4, 4, -4, -4, -4, -4, -4, -4, 0);
                TH.createTriangle(-4, 4, -4, -4, thiz.h1, 4, -4, -4, 0);
                TH.createTriangle(-4, thiz.h1, 4, -4, 4, 4, -4, 4, -4);

                TH.createTriangle(-4, -4, 0, 4, -4, -4, -4, -4, -4);
                TH.createTriangle(4, -4, -4, -4, -4, 0, 0, -4, 4);
                TH.createTriangle(0, -4, 4, 4, -4, 4, 4, -4, -4);

                TH.createTriangle(-4, 4, -4, 0, 4, -4, -4, 4, 4);
                TH.createTriangle(-4, 4, 4, 0, 4, -4, 4, 4, 0);
                TH.createTriangle(4, 4, 0, 4, 4, 4, -4, 4, 4);
              }
            }
            if (mousedownflag1) {
              if (raycaster.ray.intersectPlane(Plane1, intersection1)) {
                var obj = intersection1.sub(offset);
                thiz.h2 = obj.y.toFixed(1);
                h = (parseFloat(thiz.h2) - 4) * 0.55 / 4;
                scene2.remove(cubeLine, cubeLineDash, triangle, guide);
                scene1.remove(leftLine1);
                cubeLine = new THREE.Group();
                cubeLineDash = new THREE.Group();
                triangle = new THREE.Group();
                leftLine1 = new THREE.Group();
                if (thiz.h2 <= 0) {
                  //实线
                  thiz.h2 = 0;
                  //虚线
                  TH.createLine(2,1);
                  dragPlane1.position.set(4, thiz.h2, -4.1);
                  if (thiz.h1 == 0) {
                    TH.createLine(3,1.5);
                    $('.right-top div').html('<span></span>');
                    $('.right-top div:eq(2)').html('<span></span>正侧符合还原');
                    $('.right-top div:nth-child(3) span').css('background', '#5CAEFD');
                  }
                } else if (thiz.h2 >= 4) {
                  thiz.h2 = 4;
                  dragPlane1.position.set(4, thiz.h2, -4.1);
                  if (thiz.h1 == -4) {
                    $('.right-top div').html('<span></span>');
                    $('.right-top div:eq(0)').html('<span></span>确定基本图形');
                    $('.right-top div:first span').css('background', '#5CAEFD');
                  }
                } else {
                  TH.createTriangle(0, 4, -4, 4, 4, 0, 4, thiz.h2, -4);
                  $('.right-top div:nth-child(3) span').css('background', '#bad6f2');
                  dragPlane1.position.set(4, thiz.h2, -4.1);
                  //左边的线
                  TH.createHarmoniaLine1(h);
                  $('.right-top div').html('<span></span>');
                  $('.right-top div:eq(1)').html('<span></span>俯视确定基调');
                  $('.right-top div:nth-child(2) span').css('background', '#5CAEFD');
                }
                if (thiz.switch_checked4) {
                  //辅助线
                  TH.createGuide();
                }
                //立方体虚线
                TH.createLine(2,1);
                //面
                  TH.changeImg();
                if(thiz.h1 == -4 && thiz.h2 == 4){
                  return;
                }
                TH.createTriangle(-4, -4, 0, 0, -4, 4, -4, thiz.h1, 4);
                TH.createTriangle(0, 4, -4, 4, 4, 0, 4, thiz.h2, -4);

                TH.createTriangle(-4, 4, 4, -4, thiz.h1, 4, 4, 4, 4);
                TH.createTriangle(4, 4, 4, -4, thiz.h1, 4, 0, -4, 4);
                TH.createTriangle(4, 4, 4, 0, -4, 4, 4, -4, 4);

                TH.createTriangle(4, 4, 0, 4, 4, 4, 4, -4, 4);
                TH.createTriangle(4, 4, 0, 4, -4, 4, 4, thiz.h2, -4);
                TH.createTriangle(4, thiz.h2, -4, 4, -4, 4, 4, -4, -4);

                TH.createTriangle(-4, -4, -4, -4, 4, -4, 0, 4, -4);
                TH.createTriangle(-4, -4, -4, 0, 4, -4, 4, thiz.h2, -4);
                TH.createTriangle(4, thiz.h2, -4, 4, -4, -4, -4, -4, -4);

                TH.createTriangle(-4, 4, -4, -4, -4, -4, -4, -4, 0);
                TH.createTriangle(-4, 4, -4, -4, thiz.h1, 4, -4, -4, 0);
                TH.createTriangle(-4, thiz.h1, 4, -4, 4, 4, -4, 4, -4);

                TH.createTriangle(-4, -4, 0, 4, -4, -4, -4, -4, -4);
                TH.createTriangle(4, -4, -4, -4, -4, 0, 0, -4, 4);
                TH.createTriangle(0, -4, 4, 4, -4, 4, 4, -4, -4);

                TH.createTriangle(-4, 4, -4, 0, 4, -4, -4, 4, 4);
                TH.createTriangle(-4, 4, 4, 0, 4, -4, 4, 4, 0);
                TH.createTriangle(4, 4, 0, 4, 4, 4, -4, 4, 4);
              }
            }
            if(mousedownflag2&&!mousedownflag&&!mousedownflag1){
                thiz.radio_checked1='';
            }
          },
          onDocumentTouchEnd: function (event) {
            event.preventDefault();
            mousedownflag = false;
            mousedownflag1 = false;
              mousedownflag2 = false;
            selectobj = null;
            selectobj1 = null;
            controls2.enableRotate = true;
          },
          //拖动事件结束
          //三视图旋转
          changeImg:function (f) {
              if(thiz.h1!=0 && thiz.h2!=0){
                  TH.ImgL('static/UI/subject1.png', function () {
                      $('.leftMain').css({
                          background: 'url(static/UI/subject1.png)',
                          backgroundRepeat: 'no-repeat',
                          height: '400px',
                          width: '100%',
                          backgroundSize: '100% 100%',
                          overflow: 'hidden'
                      });
                  });
              }
              if(thiz.h1==0 && thiz.h2!=0){
                  TH.ImgL('static/UI/subject6.png', function () {
                      $('.leftMain').css({
                          background: 'url(static/UI/subject6.png)',
                          backgroundRepeat: 'no-repeat',
                          height: '400px',
                          width: '100%',
                          backgroundSize: '100% 100%',
                          overflow: 'hidden'
                      });
                  });
              }
              if(thiz.h1!=0 && thiz.h2==0){
                  TH.ImgL('static/UI/subject7.png', function () {
                      $('.leftMain').css({
                          background: 'url(static/UI/subject7.png)',
                          backgroundRepeat: 'no-repeat',
                          height: '400px',
                          width: '100%',
                          backgroundSize: '100% 100%',
                          overflow: 'hidden'
                      });
                  });
              }
              if(thiz.h1==0 && thiz.h2==0){
                  TH.ImgL('static/UI/subject2.png', function () {
                      $('.leftMain').css({
                          background: 'url(static/UI/subject2.png)',
                          backgroundRepeat: 'no-repeat',
                          height: '400px',
                          width: '100%',
                          backgroundSize: '100% 100%',
                          overflow: 'hidden'
                      });
                  });
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
        };
        //计算main div 的宽高
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
          $('.resetWidget').on('touchstart', TH.resetWidget);
        } else {
          $('.startC').on('click', TH.btnClick);
          $('.resetWidget').on('click', TH.resetWidget);
        }
        window.onresize = () => {
          TH.setStyle();
        };
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
    display: none;
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

  .leftMain {

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
