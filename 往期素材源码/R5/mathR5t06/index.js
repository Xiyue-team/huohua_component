
//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}
$(function () {
    FastClick.attach(document.body);
});

//禁止选择
document.onselectstart = function () {
    return false;
};


var height=window.innerHeight;
var $threeCon = $('#threeContainer');
$('#threeContainer').height(height-76);
window.onresize=function(){
    height=window.innerHeight;
    $('#threeContainer').height(height-76);
    var cW=$('canvas').width();
    var cH=$('canvas').height();
    leftC=($('#threeContainer').width()-cW)/2;
    $('canvas').css({'left':leftC+'px','top':($('#threeContainer').height()-cH)/2+'px'});
}
var isMob = /iPad|Android/g.test(navigator.userAgent);
var threeWidth = $('#threeContainer').width();
var threeHeight = $('#threeContainer').height();

//视图区鼠标事件操作相关变量
var raycaster = new THREE.Raycaster(),
    plane = new THREE.Plane(),
    offset = new THREE.Vector3(),
    intersection = new THREE.Vector3(),
    mouse = new THREE.Vector2(),
    INTERSECTED = null;
var offsetLeft = parseInt($threeCon.offset().left);
var offsetTop = parseInt($threeCon.offset().top);

var getParameter = {
    p1x:120,
    p1y:120,
    p2x:40,
    p2y:80,
    p3x:80,
    p3y:100
};
var selectobjs=[],selectobj=null,mousedownflag,key=false,checked = false;
var textA,textB,textM,text1X,text1A,text1Y,text2A,text2X,text1B,text2Y,text2B,text3X,text1M,text3Y,text2M;
var Group1,Group2,P3;
var threeDimension = {
    init: function () {
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.createAxis();
        threeDimension.createObj();
        threeDimension.moveO();
    },

    //创建场景于相机
    createScene: function () {
        threeDimension.scene = new THREE.Scene();
        threeDimension.camera = new THREE.PerspectiveCamera(50, threeWidth / threeHeight, 1, 10000);
        threeDimension.camera.position.x = 0;
        threeDimension.camera.position.y = 0;
        threeDimension.camera.position.z = 1200;
        threeDimension.camera.lookAt(threeDimension.scene.position);
        threeDimension.scene.add(threeDimension.camera);
        if (isMob) {
            threeDimension.renderer = new THREE.WebGLRenderer();
        } else {
            threeDimension.renderer = new THREE.CanvasRenderer();
        }
        threeDimension.renderer.setPixelRatio(window.devicePixelRatio);
        threeDimension.renderer.setClearColor(0xffffff);
        threeDimension.renderer.setSize(threeWidth, threeHeight);
        $("#threeContainer").append(threeDimension.renderer.domElement);

    },
    //定义鼠标控制
    createControls: function () {
        threeDimension.controls = new THREE.OrbitControls(threeDimension.camera, threeDimension.renderer.domElement);
        threeDimension.controls.enableDamping = true;
        threeDimension.controls.dampingFactor = 0.25;
        threeDimension.controls.enableRotate = false;
        threeDimension.controls.enablePan = false;
        threeDimension.controls.enableZoom = false;
    },
    vec3: function (x, y, z) {
        return new THREE.Vector3(x, y, z);
    },
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
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x, y, z);
        text.material.depthTest=false;
        return text;
    },
    createTriangleFace: function (vertices, color) {
        var material = new THREE.MeshBasicMaterial({color: color});
        var geom = new THREE.Geometry();
        geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
        geom.vertices = vertices;
        var mesh = new THREE.Mesh(geom, material);
        return mesh;
    },
    createAxis: function () {
        threeDimension.axis = new THREE.Group();
        threeDimension.labelAxis(-400, 40, 400);
        threeDimension.drawAxisArrow(threeDimension.vec3(-450, 0, 0), threeDimension.vec3(450, 0, 0), 0x000000, 1);
        threeDimension.drawAxisArrow(threeDimension.vec3(0, -450, 0), threeDimension.vec3(0, 450, 0), 0x000000, 2);
        threeDimension.scene.add(threeDimension.axis);
    },
    //坐标轴分度线
    labelAxis: function (start, stepSize, stop) {
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
            text.rotation = threeDimension.camera.rotation;
            if (i == 0) {
                text.position.x = i + 10;
            }
            else {
                text.position.x = i;
            }
            text.position.y = -5;
            threeDimension.axis.add(text);
            vertices = [];

            vertices.push(threeDimension.vec3(i, 0, 0));
            vertices.push(threeDimension.vec3(i, 10, 0));

            // x轴分点线
            line = threeDimension.createLineMesh(vertices, '#000000', 3, 2);
            threeDimension.axis.add(line);
        }
        // label y axis:
        for (var i = start; i <= stop; i = i + stepSize) {
            if (i == 0) {
                continue;
            }
            text = new SpriteText2D(i / 40, textStyle);
            text.rotation = threeDimension.camera.rotation;
            text.position.x = -15;
            text.position.y = i + 7;
            text.position.z = 0.2;
            threeDimension.axis.add(text);

            vertices = [];
            vertices.push(threeDimension.vec3(0, i, 0));
            vertices.push(threeDimension.vec3(10, i, 0));

            line = threeDimension.createLineMesh(vertices, '#000000', 3, 2);
            threeDimension.axis.add(line);
        }
        threeDimension.axis.add(text);
    },
    //坐标轴
    drawAxisArrow: function (origin, dir, color, style) {
        var geometryLine = new THREE.Geometry();
        var vertices = [];
        vertices.push(origin);
        vertices.push(dir);
        geometryLine.vertices = vertices;
        var line = threeDimension.createLineMesh(geometryLine.vertices, color, 3, 2);
        threeDimension.axis.add(line);
        var text;
        if (style == 1) {
            vertices = [];
            vertices.push(threeDimension.vec3(dir.x - 10, 0, 0));
            vertices.push(threeDimension.vec3(dir.x - 13, 5, 0));
            vertices.push(threeDimension.vec3(dir.x + 5, 0, 0));
            var triangle1 = threeDimension.createTriangleFace(vertices, "#000");
            threeDimension.axis.add(triangle1);
            vertices = [];
            vertices.push(threeDimension.vec3(dir.x - 10, 0, 0));
            vertices.push(threeDimension.vec3(dir.x - 13, -5, 0));
            vertices.push(threeDimension.vec3(dir.x + 5, 0, 0));
            var triangle2 = threeDimension.createTriangleFace(vertices, "#000");
            threeDimension.axis.add(triangle2);
            text = threeDimension.createText('x', dir.x, -5, 0, '#000', 28);
            threeDimension.axis.add(text);
            text = threeDimension.createText('O', -14, -2, 0, '#000', 23);
            threeDimension.axis.add(text);
        } else {
            vertices = [];
            vertices.push(threeDimension.vec3(0, dir.y - 10, 0));
            vertices.push(threeDimension.vec3(5, dir.y - 13, 0));
            vertices.push(threeDimension.vec3(0, dir.y + 5, 0));
            var triangle1 = threeDimension.createTriangleFace(vertices, "#000");
            threeDimension.axis.add(triangle1);
            vertices = [];
            vertices.push(threeDimension.vec3(0, dir.y - 10, 0));
            vertices.push(threeDimension.vec3(-5, dir.y - 13, 0));
            vertices.push(threeDimension.vec3(0, dir.y + 5, 0));
            var triangle2 = threeDimension.createTriangleFace(vertices, "#000");
            threeDimension.axis.add(triangle2);
            text = threeDimension.createText('y', 20, dir.y + 10, 0, '#000', 28);
            threeDimension.axis.add(text);
        }
    },
    createLineMesh: function (vertices, color, style,width) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        if (style == 1) {
            vertices.push(threeDimension.vec3(vertices[0].x, vertices[0].y - 1, vertices[0].z));
            vertices.push(threeDimension.vec3(vertices[1].x, vertices[1].y - 1, vertices[1].z));
            vertices.push(threeDimension.vec3(vertices[0].x + 1, vertices[0].y, vertices[0].z));
            vertices.push(threeDimension.vec3(vertices[1].x + 1, vertices[1].y, vertices[1].z));
            vertices.push(threeDimension.vec3(vertices[0].x - 1, vertices[0].y, vertices[0].z));
            vertices.push(threeDimension.vec3(vertices[1].x - 1, vertices[1].y, vertices[1].z));
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
            vertices.push(threeDimension.vec3(x, y, 1));
        }
        var Circle1=threeDimension.createLineMesh(vertices,'#000', 3,1);
        C.add(CircleT,Circle,Circle1)
        return C;
    },
    moveO:function () {
        if(threeDimension.Obj!=null){
            threeDimension.scene.remove(threeDimension.Obj);
        }
        threeDimension.Obj = new THREE.Group();
        //AB两点之间的连接虚线
        vertices1 = [threeDimension.vec3(getParameter.p1x,getParameter.p1y, -1), threeDimension.vec3(getParameter.p2x, getParameter.p2y, -1)];
        var dashLine1 = threeDimension.createLineMesh(vertices1, '#000', 2, 2);

        // A点xy轴连接虚线
        vertices1 = [threeDimension.vec3(0,getParameter.p1y, -1), threeDimension.vec3(getParameter.p1x,getParameter.p1y, -1), threeDimension.vec3(getParameter.p1x, 0, -1)];
        var dashLine2 = threeDimension.createLineMesh(vertices1, '#000000', 2, 2);

        // B点xy轴连接虚线
        vertices1 = [threeDimension.vec3(0,getParameter.p2y, -1), threeDimension.vec3(getParameter.p2x,getParameter.p2y, -1), threeDimension.vec3(getParameter.p2x, 0, -1)];
        var dashLine3 = threeDimension.createLineMesh(vertices1, '#000000', 2, 2);

        // M点xy轴连接虚线
        vertices1 = [threeDimension.vec3(0,getParameter.p3y, -1), threeDimension.vec3(getParameter.p3x,getParameter.p3y, -1), threeDimension.vec3(getParameter.p3x, 0, -1)];
        var dashLine4 = threeDimension.createLineMesh(vertices1, '#000000', 2, 2);


        if(key){
            text1X.position.set(getParameter.p1x+5,-20,0);
            text1A.position.set(getParameter.p1x+15,-35,0);
            text1Y.position.set(-35,getParameter.p1y+30,0);
            text2A.position.set(-28,getParameter.p1y+10,0);
            text2X.position.set(getParameter.p2x+5,-20,0);
            text1B.position.set(getParameter.p2x+15,-35,0);
            text2Y.position.set(-35,getParameter.p2y+10,0);
            text2B.position.set(-28,getParameter.p2y-10,0);
            text3X.position.set(getParameter.p3x+5,-20,0);
            text1M.position.set(getParameter.p3x+15,-35,0);
            text3Y.position.set(-35,getParameter.p3y+20,0);
            text2M.position.set(-26,getParameter.p3y,0);

            if(getParameter.p1x < 0 && getParameter.p1y < 0){
                text1X.position.set(getParameter.p1x+5,45,0);
                text1A.position.set(getParameter.p1x+15,28,0);
                text1Y.position.set(35,getParameter.p1y+20,0);
                text2A.position.set(45,getParameter.p1y,0);
            }else if(getParameter.p1x < 0 && getParameter.p1y > 0){
                text1Y.position.set(30,getParameter.p1y+20,0);
                text2A.position.set(40,getParameter.p1y,0);
            }else if(getParameter.p1x > 0 && getParameter.p1y < 0){
                text1X.position.set(getParameter.p1x+5,45,0);
                text1A.position.set(getParameter.p1x+15,28,0);
            }

            if(getParameter.p2x < 0 && getParameter.p2y < 0){
                text2X.position.set(getParameter.p2x+5,45,0);
                text1B.position.set(getParameter.p2x+15,28,0);
                text2Y.position.set(35,getParameter.p2y+20,0);
                text2B.position.set(45,getParameter.p2y,0);
            }else if(getParameter.p2x < 0 && getParameter.p2y > 0){
                text2Y.position.set(30,getParameter.p2y+20,0);
                text2B.position.set(40,getParameter.p2y,0);
            }else if(getParameter.p2x > 0 && getParameter.p2y < 0){
                text2X.position.set(getParameter.p2x+5,45,0);
                text1B.position.set(getParameter.p2x+15,28,0);
            }


            if(getParameter.p3x < 0 && getParameter.p3y < 0){
                text3X.position.set(getParameter.p3x+5,45,0);
                text1M.position.set(getParameter.p3x+15,28,0);
                text3Y.position.set(35,getParameter.p3y+20,0);
                text2M.position.set(45,getParameter.p3y,0);
            }else if(getParameter.p3x < 0 && getParameter.p3y > 0){
                text3Y.position.set(30,getParameter.p3y+20,0);
                text2M.position.set(40,getParameter.p3y,0);
            }else if(getParameter.p3x > 0 && getParameter.p3y < 0){
                text3X.position.set(getParameter.p3x+5,45,0);
                text1M.position.set(getParameter.p3x+15,28,0);
                textM.position.set(getParameter.p3x-10,getParameter.p3y-6,0);
            }
            threeDimension.Obj.add(dashLine2,dashLine3,dashLine4,text1X,text1A,text1Y,text2A,text2X,text1B,text2Y,text2B,text3X,text1M,text3Y,text2M);

        }
        threeDimension.Obj.add(dashLine1);
        threeDimension.scene.add(threeDimension.Obj);

        Group1.position.set(getParameter.p1x,getParameter.p1y,1);
        Group2.position.set(getParameter.p2x,getParameter.p2y,1);
        P3.position.set(getParameter.p3x,getParameter.p3y,1);
        textA.position.set(getParameter.p1x+20,getParameter.p1y+5,0);
        textB.position.set(getParameter.p2x+12,getParameter.p2y-6,0);
        textM.position.set(getParameter.p3x+12,getParameter.p3y-6,0);

         if(getParameter.p3x > getParameter.p1x && getParameter.p3y > getParameter.p1y) {
             textA.position.set(getParameter.p1x-20,getParameter.p1y+15,0);
         }else if(getParameter.p3x > getParameter.p1x && getParameter.p3y < getParameter.p1y) {
            textA.position.set(getParameter.p1x-20,getParameter.p1y+10,0);
         }else if(getParameter.p3x < getParameter.p1x && getParameter.p3y > getParameter.p1y){
             textA.position.set(getParameter.p1x+20,getParameter.p1y+15,0);
         }

        if(getParameter.p3x < getParameter.p2x && getParameter.p3y < getParameter.p2y) {
            textB.position.set(getParameter.p2x+20,getParameter.p2y+20,0);
        }else if(getParameter.p3x > getParameter.p2x && getParameter.p3y < getParameter.p2y) {
            textB.position.set(getParameter.p2x-20,getParameter.p2y+20,0);
        }else if(getParameter.p3x < getParameter.p2x && getParameter.p3y > getParameter.p2y){
            textB.position.set(getParameter.p2x+20,getParameter.p2y+5,0);
        }
        if(getParameter.p3x > 0 && getParameter.p3y < 0){
            textM.position.set(getParameter.p3x-10,getParameter.p3y-6,0);
        }
        if(getParameter.p3x < 0 && getParameter.p3y > 0){
            textM.position.set(getParameter.p3x-20,getParameter.p3y-2,0);
        }
    },
    createObj: function(){
        // A点坐标组
        Group1 = new THREE.Group();
        var P1=threeDimension.createCircle(6,'#F5A623');
        P1.children[0].name='A';
        textA = threeDimension.createText('A',getParameter.p1x,getParameter.p1y,0,'#F5A623',18);
        Group1.position.set(getParameter.p1x,getParameter.p1y,1);
        Group1.add(P1);

        // B点坐标组
        Group2 = new THREE.Group();
        var P2=threeDimension.createCircle(6,'#6D6EFF');
        P2.children[0].name='B';
        textB = threeDimension.createText('B',getParameter.p2x,getParameter.p2y,0,'#6D6EFF',18);
        Group2.position.set(getParameter.p2x,getParameter.p2y,1);
        Group2.add(P2);

        //M点坐标
        P3=threeDimension.createCircle(6,'#6D6EFF');
        P3.position.set(getParameter.p3x,getParameter.p3y,1);
        textM = threeDimension.createText('M',getParameter.p3x,getParameter.p3y-6,0,'#6D6EFF',18);

        text1X = threeDimension.createText('x',getParameter.p1x,0,0,'#6D6EFF',24);
        text1A = threeDimension.createText('A',getParameter.p1x,0,0,'#6D6EFF',12);
        text1Y = threeDimension.createText('y',0,getParameter.p1y,0,'#6D6EFF',24);
        text2A = threeDimension.createText('A',0,getParameter.p1y,0,'#6D6EFF',12);
        text2X = threeDimension.createText('x',getParameter.p2x,0,0,'#6D6EFF',24);
        text1B = threeDimension.createText('B',getParameter.p2x,0,0,'#6D6EFF',12);
        text2Y = threeDimension.createText('y',0,getParameter.p2y,0,'#6D6EFF',24);
        text2B = threeDimension.createText('B',0,getParameter.p2y,0,'#6D6EFF',12);
        text3X = threeDimension.createText('x',getParameter.p3x,0,0,'#6D6EFF',24);
        text1M = threeDimension.createText('M',getParameter.p3x,0,0,'#6D6EFF',12);
        text3Y = threeDimension.createText('y',0,getParameter.p3y,0,'#6D6EFF',24);
        text2M = threeDimension.createText('M',0,getParameter.p3y,0,'#6D6EFF',12);

        selectobjs.push(P1.children[0],P2.children[0]);
        threeDimension.scene.add(Group1,Group2,P3,textA,textB,textM);
    },
    onDocumentMouseDown:function(event){
        event.preventDefault();
        var mouse={};
        mouse.x = ((event.clientX-offsetLeft) / threeWidth ) * 2 - 1;
        mouse.y = -( (event.clientY-offsetTop) / threeHeight ) * 2 + 1;
        raycaster.setFromCamera(mouse, threeDimension.camera);
        var intersects = raycaster.intersectObjects(selectobjs);
        if (intersects.length > 0) {
            selectobj = intersects[0].object;
            mousedownflag = true;
        }
    },
    onDocumentMouseMove:function(event){
        event.preventDefault();
        var mouse={};
        mouse.x = ((event.clientX-offsetLeft) / threeWidth ) * 2 - 1;
        mouse.y = -( (event.clientY-offsetTop) / threeHeight ) * 2 + 1;
        var intersects = raycaster.intersectObjects( selectobjs );
        raycaster.setFromCamera(mouse, threeDimension.camera);
        if ( intersects.length > 0 ) {
            if ( INTERSECTED != intersects[ 0 ].object ) {
                INTERSECTED = intersects[ 0 ].object;
                plane.setFromNormalAndCoplanarPoint(threeDimension.camera.getWorldDirection( plane.normal ),INTERSECTED.position );

            }
        }
        if(mousedownflag){
            if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                var obj = intersection.sub( offset ),x,y;
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
                if(selectobj.name=='A'){
                    getParameter.p1x = x;
                    getParameter.p1y = y;
                    getParameter.p3x = (x+getParameter.p2x)/2;
                    getParameter.p3y = (y+getParameter.p2y)/2;


                }else if(selectobj.name=='B'){
                    getParameter.p3x = (x+getParameter.p1x)/2;
                    getParameter.p3y = (y+getParameter.p1y)/2;
                    getParameter.p2x = x;
                    getParameter.p2y = y;
                }
                // if(getParameter.p1x>400||getParameter.p1x<-400||getParameter.p1y>400||getParameter.p1y<-400||getParameter.p2x>400||getParameter.p2x<-400||getParameter.p2y>400||getParameter.p2y<-400){
                //     return;
                // }
                threeDimension.moveO();
            }
        }
    },
    onDocumentMouseUp:function(event){
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;

    },
    onDocumentTouchStart:function(event){
        event.preventDefault();

        if (event.touches.length === 1) {
            var mouse={};
            mouse.x = ((event.touches[0].pageX-offsetLeft) / threeWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-offsetTop) / threeHeight ) * 2 + 1;
            raycaster.setFromCamera(mouse, threeDimension.camera);
            var intersects = raycaster.intersectObjects(selectobjs);
            if (intersects.length > 0) {
                selectobj = intersects[0].object;
                mousedownflag = true;
            }
        }
    },
    onDocumentTouchMove:function(event){
        event.preventDefault();
        if (event.touches.length === 1) {
            var mouse={};
            mouse.x = ((event.touches[0].pageX-offsetLeft) / threeWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-offsetTop) / threeHeight ) * 2 + 1;
            var intersects = raycaster.intersectObjects( selectobjs );
            raycaster.setFromCamera(mouse, threeDimension.camera);
            if ( intersects.length > 0 ) {
                if ( INTERSECTED != intersects[ 0 ].object ) {
                    INTERSECTED = intersects[ 0 ].object;
                    plane.setFromNormalAndCoplanarPoint(threeDimension.camera.getWorldDirection( plane.normal ),INTERSECTED.position );
                }
            }
            if(mousedownflag){
            if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                var obj = intersection.sub( offset ),x,y;
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
                if(selectobj.name=='A'){
                    getParameter.p1x = x;
                    getParameter.p1y = y;
                    getParameter.p3x = (x+getParameter.p2x)/2;
                    getParameter.p3y = (y+getParameter.p2y)/2;


                }else if(selectobj.name=='B'){
                    getParameter.p3x = (x+getParameter.p1x)/2;
                    getParameter.p3y = (y+getParameter.p1y)/2;
                    getParameter.p2x = x;
                    getParameter.p2y = y;
                }
                // if(getParameter.p1x>400||getParameter.p1x<-400||getParameter.p1y>400||getParameter.p1y<-400||getParameter.p2x>400||getParameter.p2x<-400||getParameter.p2y>400||getParameter.p2y<-400){
                //     return;
                // }
                threeDimension.moveO();
            }
        }
        }
    },
    onDocumentTouchEnd:function(event){
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;
    }
};

threeDimension.init();
function renderAll() {
    threeDimension.controls.update();
    requestAnimationFrame(renderAll);
    threeDimension.renderer.render(threeDimension.scene, threeDimension.camera);
}
renderAll();

threeDimension.renderer.domElement.addEventListener( 'mousedown', threeDimension.onDocumentMouseDown, false );
window.addEventListener( 'mouseup', threeDimension.onDocumentMouseUp, false );
threeDimension.renderer.domElement.addEventListener( 'mousemove', threeDimension.onDocumentMouseMove, false );
threeDimension.renderer.domElement.addEventListener( 'touchstart', threeDimension.onDocumentTouchStart, false );
threeDimension.renderer.domElement.addEventListener( 'touchmove', threeDimension.onDocumentTouchMove, false );
window.addEventListener( 'touchend', threeDimension.onDocumentTouchEnd, false );


function check() {
    if(checked){
        $('#check>span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
       key=false;
        checked=false;
        console.log('关闭');
    }
    else {
        $('#check>span').css('background','#5CAEFD').children().css({'right':'2px','left':'auto'});
        key=true;
        checked=true;
        console.log('开启');
    }
    threeDimension.moveO();

}
function reset() {
    $('#check>span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
    key=false;
    checked = false;
    getParameter = {
        p1x:120,
        p1y:120,
        p2x:40,
        p2y:80,
        p3x:80,
        p3y:100
    };
    threeDimension.moveO();
}

if (isMob) {
    $('#reset img').on('touchstart', reset);
    $('#check').on('touchstart',check);

} else {
    $('#reset img').on('click', reset);
    $('#check').on('click',check);

}

