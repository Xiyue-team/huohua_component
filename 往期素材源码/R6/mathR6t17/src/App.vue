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
        title: '2014年辽宁理（7）',
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
        h: null,
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
        var dragPlane = null;
        var triangle = new THREE.Group();
        var cylinder = null;
        var upPlane = new THREE.Group();
        var cubeLine = new THREE.Group();
        var cubeLine1 = new THREE.Group();
        var cubeDashLine = new THREE.Group();
        var leftLine = new THREE.Group();
        var isMob = /iPad|Android/g.test(navigator.userAgent);

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
                TH.createCubeLine(Plane, intersection);
              }
            }
            if(mousedownflag2&&!mousedownflag){
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
              if (intersects.length > 0) {
                if (INTERSECTED != intersects[0].object) {
                  INTERSECTED = intersects[0].object;
                  Plane.setFromNormalAndCoplanarPoint(camera2.getWorldDirection(Plane.normal), INTERSECTED.position);

                }
              }
            }
            if (mousedownflag) {
              if (raycaster.ray.intersectPlane(Plane, intersection)) {
                TH.createCubeLine(Plane, intersection);
              }
            }
            if(mousedownflag2&&!mousedownflag){
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
          createCubeLine: function (Plane, intersection) {
            var obj = intersection.sub(offset), y, y1;
            y = obj.y.toFixed(1);
            y1 = y;
            thiz.h = y;
            scene1.remove(leftLine);
            leftLine = new THREE.Group();
            scene2.remove(cubeDashLine, cubeLine, cubeLine1, cylinder, triangle, upPlane);
            cubeLine = new THREE.Group();
            cubeDashLine = new THREE.Group();
            //立方体虚线
            cubeLine1 = new THREE.Group();
            //圆柱面
            cylinder = new THREE.Group();
            //三角面
            triangle = new THREE.Group();
            //表面
            upPlane = new THREE.Group();
            if (y <= -2) {
              thiz.h = -2;
              $('.right-top div').html('<span></span>');
              $('.right-top div:eq(0)').html('<span></span>确定基本图形');
              $('.right-top div:nth-child(1) span').css('background', '#5CAEFD');
              dragPlane.position.set(0, -2, 2.1);
              TH.createLine(-2, 3);
              TH.creatUpDown(-2);
              TH.createCubeDashLine();
              cubeDashLine.visible = false;
              if(thiz.switch_checked4O1 == 'yes'){
                cubeDashLine.visible = true;
              }
              return;
            } else if (y >= 2) {
              thiz.h = 2;
              y1 = 2;
              TH.createLine(2, 2);
              TH.createLine(2, 3);
              dragPlane.position.set(0, 2, 2.1);
              $('.right-top div').html('<span></span>');
              $('.right-top div:eq(2)').html('<span></span>正侧符合还原');
              $('.right-top div:nth-child(3) span').css('background', '#5CAEFD');
              TH.ImgL('static/UI/subject3.png', function () {
                $('.leftMain').css({
                  background: 'url(static/UI/subject3.png)',
                  backgroundRepeat: 'no-repeat',
                  height: '400px',
                  width: '100%',
                  backgroundSize: '100% 100%',
                  overflow: 'hidden'
                });
              });
            } else {
              $('.right-top div').html('<span></span>');
              $('.right-top div:eq(1)').html('<span></span>俯视确定基调');
              $('.right-top div:nth-child(2) span').css('background', '#5CAEFD');
              //拖动的点
              dragPlane.position.set(0, y, 2.1);

              $('.right-top div:nth-child(3) span').css('background', '#bad6f2');

              //左边的线
              TH.createHarmoniaLine(y);

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

              //右边立方体
              TH.createLine(y, 2);
              TH.createLine(y, 3);
            }
            TH.createCubeDashLine();
            cubeDashLine.visible = false;
            if(thiz.switch_checked4O1 == 'yes'){
              cubeDashLine.visible = true;
            }
            //造面
            TH.createtriangle(-2, -2, 2, -2, y1, 2, 0, y1, 2);
            TH.createtriangle(-2, -2, 2, 0, -2, 2, 0, y1, 2);

            TH.createtriangle(-2, y1, 0, -2, y1, 2, -2, -2, 2);
            TH.createtriangle(-2, -2, 2, -2, -2, 0, -2, y1, 0);

            TH.createtriangle(0, y1, -2, 2, y1, -2, 2, -2, -2);
            TH.createtriangle(2, -2, -2, 0, -2, -2, 0, y1, -2);

            TH.createtriangle(2, y1, 0, 2, y1, -2, 2, -2, -2);
            TH.createtriangle(2, -2, -2, 2, -2, 0, 2, y1, 0);

            TH.createCylindrical(parseFloat(y1) + 2);

            TH.creatUpDown(y1);
          },
          //造面
          createtriangle: function (x1, y1, z1, x2, y2, z2, x3, y3, z3) {
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

            triangle.add(mesh);//网格模型添加到场景中
            scene2.add(triangle);
          },
          //圆柱面
          createCylindrical: function (h) {
            var cylinder1, cylinder2;
            var geometry = new THREE.CylinderBufferGeometry(2, 2, h, 32, 1, true, Math.PI, Math.PI / 2);
            var material = new THREE.MeshBasicMaterial({color: '#A8F1E0', side: THREE.DoubleSide});
            cylinder1 = new THREE.Mesh(geometry, material);
            cylinder1.position.set(2, -1 + (h - 2) / 2, 2);

            var geometry1 = new THREE.CylinderBufferGeometry(2, 2, h, 32, 1, true, Math.PI * 2, Math.PI / 2);
            var material1 = new THREE.MeshBasicMaterial({color: '#A8F1E0', side: THREE.DoubleSide});
            cylinder2 = new THREE.Mesh(geometry1, material1);
            cylinder2.position.set(-2, -1 + (h - 2) / 2, -2);

            cylinder.add(cylinder1, cylinder2);
            scene2.add(cylinder);
          },
          //上下表面
          creatUpDown: function (h) {
            var shape = new THREE.Shape(), shape1 = new THREE.Shape(), upPlane1, downPlane;
            shape.moveTo(-2, 2);
            for (var i = 90; i >= 0; i--) {
              shape.lineTo(2 * Math.cos(Math.PI / 180 * i) - 2, 2 * Math.sin(Math.PI / 180 * i) - 2);
            }
            shape.lineTo(2, -2);
            for (var i = 270; i >= 180; i--) {
              shape.lineTo(2 * Math.cos(Math.PI / 180 * i) + 2, 2 * Math.sin(Math.PI / 180 * i) + 2);
            }
            var meshMaterial = new THREE.MeshBasicMaterial({color: '#A8F1E0', side: THREE.DoubleSide});

            upPlane1 = new THREE.Mesh(new THREE.ShapeGeometry(shape), meshMaterial);
            upPlane1.position.z = -h;


            shape1.moveTo(-2, 2);
            for (var i = 90; i >= 0; i--) {
              shape1.lineTo(2 * Math.cos(Math.PI / 180 * i) - 2, 2 * Math.sin(Math.PI / 180 * i) - 2);
            }
            shape1.lineTo(2, -2);
            for (var i = 270; i >= 180; i--) {
              shape1.lineTo(2 * Math.cos(Math.PI / 180 * i) + 2, 2 * Math.sin(Math.PI / 180 * i) + 2);
            }
            var meshMaterial1 = new THREE.MeshBasicMaterial({color: '#A8F1E0', side: THREE.DoubleSide});

            downPlane = new THREE.Mesh(new THREE.ShapeGeometry(shape1), meshMaterial1);
            downPlane.position.z = 2;

            upPlane.add(upPlane1, downPlane);
            upPlane.rotation.x = Math.PI / 2;
            scene2.add(upPlane);
          },
          //开始按钮
          btnClick: function () {
            if (thiz.start.color === '#000000') {
              $('.mainD').hide();
              $('canvas').show();
              thiz.start.color = '#cccccc';
              //立方体实线
              cubeLine.visible = true;
              //立方体虚线
              cubeLine1.visible = true;
              //拖动的面
              dragPlane.visible = true;

              upPlane.visible = true;
              $('.right-top div:eq(0)').html('<span></span>确定基本图形');
              $('.right-top div:first span').css('background', '#5CAEFD');
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
              thiz.yes = false;
              //辅助线
              thiz.switch_checked4 = true;
              thiz.switch_checked4O1 = 'yes';
              thiz.switch_checked4O2 = 'yes';
              cubeDashLine.visible = true;
            } else {
              thiz.yes = true;
              return;
            }
          },
          //计算界面
          setStyle: function () {
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
          //构建立方体方程
          createLine: function (h, type) {
            var vertices = [], vertices1 = [], vertices2 = [], vertices3 = [], vertices4 = [], vertices5 = [],
              vertices6 = [], vertices7 = [], line, line1, line2, line3, line4, line5,
              line6, line7, dx, dy, dx2, dy2;
            vertices.push(
              new THREE.Vector3(-2, -2, 0),
              new THREE.Vector3(-2, -2, 2),
              new THREE.Vector3(-2, h, 2),
              new THREE.Vector3(-2, h, 0),
              new THREE.Vector3(-2, -2, 0),
            );
            line = TH.createLineMesh(vertices, '#000000', type, 1);

            vertices1.push(
              new THREE.Vector3(-2, -2, 2),
              new THREE.Vector3(0, -2, 2),
              new THREE.Vector3(0, h, 2),
              new THREE.Vector3(-2, h, 2),
            );
            line1 = TH.createLineMesh(vertices1, '#000000', type, 1);

            vertices6.push(
              new THREE.Vector3(2, h, 0),
              new THREE.Vector3(2, -2, 0),
              new THREE.Vector3(2, -2, -2),
              new THREE.Vector3(2, h, -2),
              new THREE.Vector3(2, h, 0),
            );
            line6 = TH.createLineMesh(vertices6, '#000000', type, 1);

            vertices7.push(
              new THREE.Vector3(2, -2, -2),
              new THREE.Vector3(0, -2, -2),
              new THREE.Vector3(0, h, -2),
              new THREE.Vector3(2, h, -2),
            );
            line7 = TH.createLineMesh(vertices7, '#000000', type, 1);

            for (var i = 0; i <= 90; i++) {
              dx = 2 * Math.cos(Math.PI / 180 * i) - 2;
              dy = 2 * Math.sin(Math.PI / 180 * i) - 2;
              vertices2.push(new THREE.Vector3(dx, -2, dy));
              vertices3.push(new THREE.Vector3(dx, h, dy));
            }
            line2 = TH.createLineMesh(vertices2, '#000000', type, 1);
            line3 = TH.createLineMesh(vertices3, '#000000', type, 1);

            for (var a = 180; a <= 270; a++) {
              dx2 = 2 * Math.cos(Math.PI / 180 * a) + 2;
              dy2 = 2 * Math.sin(Math.PI / 180 * a) + 2;
              vertices4.push(new THREE.Vector3(dx2, h, dy2));
              vertices5.push(new THREE.Vector3(dx2, -2, dy2));
            }
            line4 = TH.createLineMesh(vertices4, '#000000', type, 1);
            line5 = TH.createLineMesh(vertices5, '#000000', type, 1);
            cubeLine.add(line, line1, line2, line3, line4, line5, line6, line7);
            scene2.add(cubeLine);
          },

          //辅助线方程
          createCubeDashLine: function () {
            var vertices = [], line, vertices1 = [], line1, vertices2 = [], line2, vertices3 = [], line3,
              vertices4 = [], line4, vertices5 = [], line5;
            vertices.push(
              new THREE.Vector3(-2, -2, 2),
              new THREE.Vector3(2, -2, 2),
              new THREE.Vector3(2, -2, -2),
              new THREE.Vector3(-2, -2, -2),
              new THREE.Vector3(-2, -2, 2),
              new THREE.Vector3(-2, 2, 2),
            );
            line = TH.createLineMesh(vertices, '#000000', 2, 1);
            if (thiz.h == 2) {
              vertices1.push(
                new THREE.Vector3(2, -2, 2),
                new THREE.Vector3(2, 2, 2),
                new THREE.Vector3(2, 2, 0),
              );
              line1 = TH.createLineMesh(vertices1, '#000000', 2, 1);

              vertices4.push(
                new THREE.Vector3(0, 2, -2),
                new THREE.Vector3(-2, 2, -2),
                new THREE.Vector3(-2, 2, 0),
              );
              line4 = TH.createLineMesh(vertices4, '#000000', 2, 1);

              vertices5.push(
                new THREE.Vector3(0, 2, 2),
                new THREE.Vector3(2, 2, 2),
              );
              line5 = TH.createLineMesh(vertices5, '#000000', 2, 1);
              cubeDashLine.add(line1, line4, line5);
            } else {
              vertices1.push(
                new THREE.Vector3(2, 2, 2),
                new THREE.Vector3(2, 2, -2),
                new THREE.Vector3(-2, 2, -2),
                new THREE.Vector3(-2, 2, 2),
                new THREE.Vector3(2, 2, 2),
                new THREE.Vector3(2, -2, 2),
              );
              line1 = TH.createLineMesh(vertices1, '#000000', 2, 1);
              cubeDashLine.add(line1);
            }
            vertices2.push(
              new THREE.Vector3(2, 2, -2),
              new THREE.Vector3(2, -2, -2),
            );
            line2 = TH.createLineMesh(vertices2, '#000000', 2, 1);

            vertices3.push(
              new THREE.Vector3(-2, 2, -2),
              new THREE.Vector3(-2, -2, -2),
            );
            line3 = TH.createLineMesh(vertices3, '#000000', 2, 1);
            cubeDashLine.add(line, line2, line3);
            scene2.add(cubeDashLine);
          },
          //左边异色的线
          createHarmoniaLine: function (y) {
            var h = (parseFloat(y) + 2) * 1.06 / 4 + 0.44;
            var vertices = [], vertices1 = [], line1, line2;
            vertices.push(
              new THREE.Vector3(-1.49, 0.415, 0),
              new THREE.Vector3(-1.49, h, 0),
              new THREE.Vector3(-0.25, h, 0),
              new THREE.Vector3(-0.25, 0.415, 0),
              new THREE.Vector3(-0.875, 0.415, 0),
              new THREE.Vector3(-0.875, h, 0),
              new THREE.Vector3(-0.875, 0.415, 0),
              new THREE.Vector3(-1.49, 0.415, 0),
            );
            line1 = TH.createLineMesh(vertices, '#5CAEFD', 3, 2.5);

            vertices1.push(
              new THREE.Vector3(0.475, 0.415, 0),
              new THREE.Vector3(0.475, h, 0),
              new THREE.Vector3(1.72, h, 0),
              new THREE.Vector3(1.72, 0.415, 0),
              new THREE.Vector3(1.095, 0.415, 0),
              new THREE.Vector3(1.095, h, 0),
              new THREE.Vector3(1.095, 0.415, 0),
              new THREE.Vector3(0.475, 0.415, 0),
            );
            line2 = TH.createLineMesh(vertices1, '#5CAEFD', 3, 2.5);
            leftLine.add(line1, line2);
            scene1.add(leftLine);
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

            camera1 = new THREE.PerspectiveCamera(40, leftCanvasWidth / leftCanvasHeight, 1, 100);
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
            camera2 = new THREE.OrthographicCamera(mainWidth / -80, mainWidth / 80, mainHeight / 80, mainHeight / -80, -10, 100);
            camera2.position.set(1, 2, 4);

            // controls
            controls2 = new THREE.OrbitControls(camera2, renderer2.domElement);
            controls2.enableDamping = true;
            controls2.dampingFactor = 0.25;
            controls2.enableZoom = true;
            controls2.enableRotate = true;
            controls2.enablePan = false;
          },
          createO: function () {
            //辅助线
            TH.createCubeDashLine();
            TH.createLine(-2, 3);
            TH.creatUpDown(-2);
            //可拖动的点
            TH.createDragPlan();

          },
          //可拖动的点
          createDragPlan: function () {
            var geometry = new THREE.PlaneGeometry(1.2, 2, 1, 1);
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
            dragPlane.position.set(0, -2, 2.1);
            dragPlane.visible = false;

            selectobjs.push(dragPlane);
            scene2.add(dragPlane);
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
              cubeDashLine.visible = true;
            } else if (thiz.switch_checked4O1 == '') {
              cubeDashLine.visible = false;
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
            scene1.remove(leftLine);
            scene2.remove(dragPlane, cubeLine, cubeLine1, cubeDashLine, triangle, cylinder, upPlane);
            cubeLine = new THREE.Group();
            cubeLine1 = new THREE.Group();
            upPlane = new THREE.Group();
            triangle = new THREE.Group(),
              upPlane = new THREE.Group(),
              cubeDashLine = new THREE.Group(),
              thiz.h = null;
            cylinder = null;
            dragPlane = null;
            TH.createO();
            thiz.yes = true;
            thiz.radio_checked1 = '';
            thiz.switch_checked4 = null;
            thiz.radio_checked1O = '';
            thiz.switch_checked4O1 = '';
            thiz.switch_checked4O2 = '';
            camera2.position.set(1, 2, 4);
            camera2.zoom = 1;
            camera2.updateProjectionMatrix();
            $('.mainD').show();
            $('canvas').hide();
          }
        }
        TH.setStyle();
        TH.init1();
        TH.init2();
        TH.createO();
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
