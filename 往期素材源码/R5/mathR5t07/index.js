// 2.视图：
// ①平面直角坐标系；
// ②点P（-1，1）, 显示点的坐标；
// ③点M（1，2）,显示点的坐标 ；
// ④连接P,M两点的实线；
// 3.控件：
// ①显示对称点按钮
// ②重置按钮。

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
    Px:-40,
    Py:40,
    Mx:40,
    My:80,
    P2x: 120,
    P2y: 120
};
var selectobjs=[],selectobj=null,mousedownflag,key=false,checked = false;
var x1='-1.0',y1='1.0',x2='1.0',y2='2.0',x3='3.0',y3='3.0';
var textp1,textp2,textM,P3;
var Group1,Group2,Group3;
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
        //PM两点之间的连接线
        vertices1 = [threeDimension.vec3(getParameter.Px,getParameter.Py, -1), threeDimension.vec3(getParameter.Mx, getParameter.My, -1)];
        var dashLine1 = threeDimension.createLineMesh(vertices1, '#000', 3, 2);

        if(key ){
            vertices2 = [threeDimension.vec3(getParameter.Mx, getParameter.My, -1), threeDimension.vec3(getParameter.P2x, getParameter.P2y, -1)];
            var dashLine2 = threeDimension.createLineMesh(vertices2, '#000', 2, 2);
            threeDimension.Obj.add(dashLine2,textp2);
        }

        // P点 p·点 M点的坐标
        textp1 = threeDimension.createText('P('+x1+' , '+y1+')',getParameter.Px,getParameter.Py+15,0,'#6D68FF',25);
        textM = threeDimension.createText('M('+x2+' , '+y2+')',getParameter.Mx,getParameter.My+15,0,'#6D6EFF',25);
        textp2 = threeDimension.createText('P`('+x3+' , '+y3+')',getParameter.P2x,getParameter.P2y+15,0,'#F5A623',25);
        threeDimension.Obj.add(dashLine1,textp1,textM);
        threeDimension.scene.add(threeDimension.Obj);
        Group1.position.set(getParameter.Px,getParameter.Py,1);
        Group2.position.set(getParameter.Mx,getParameter.My,1);
        Group3.position.set(getParameter.P2x,getParameter.P2y,1);
        textp1.position.set(getParameter.Px-85,getParameter.Py+33,0);
        textM.position.set(getParameter.Mx+78,getParameter.My+15,0);
        textp2.position.set(getParameter.P2x+80,getParameter.P2y+40,0);

        if(getParameter.Px > 0 && getParameter.Py > 0){
            textp1.position.set(getParameter.Px+80,getParameter.Py+37,0);
        }
        if(getParameter.Px > 0 && getParameter.Py < 0){
            textp1.position.set(getParameter.Px+85,getParameter.Py+20,0);
        }

        if(getParameter.P2x < 0 ){
            textp2.position.set(getParameter.P2x-90,getParameter.P2y+33,0);
        }
        if(getParameter.P2x > 0 && getParameter.P2y < 0){
            textp2.position.set(getParameter.P2x+85,getParameter.P2y+25,0);
        }

    },

    createObj: function(){
        threeDimension.scene.remove(Group1,Group2,Group3);
        // P点坐标组
        Group1 = new THREE.Group();
        var P1=threeDimension.createCircle(6,'#6D68FF');
        P1.children[0].name='A';
        Group1.position.set(getParameter.Px,getParameter.Py,1);
        Group1.add(P1);

        // M点坐标组
        Group2 = new THREE.Group();
        var P2=threeDimension.createCircle(6,'#6D6EFF');
        P2.children[0].name='B';
        Group2.position.set(getParameter.Mx,getParameter.My,1);
        Group2.add(P2);

        // P1点坐标
        Group3 = new THREE.Group();
        P3=threeDimension.createCircle(6,'#F5A623');
        Group3.position.set(getParameter.P2x,getParameter.P2y,1);


        selectobjs.push(P1.children[0],P2.children[0]);
        threeDimension.scene.add(Group1,Group2,Group3);
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
                    getParameter.Px = parseFloat(x/40).toFixed(1)*40;
                    getParameter.Py = parseFloat(y/40).toFixed(1)*40;

                    x1 = parseFloat(x/40).toFixed(1)==0?0:parseFloat(x/40).toFixed(1);
                    y1 = parseFloat(y/40).toFixed(1)==0?0:parseFloat(y/40).toFixed(1);
                    console.log(x3,y3);


                }else if(selectobj.name=='B'){
                    getParameter.Mx = parseFloat(x/40).toFixed(1)*40;
                    getParameter.My = parseFloat(y/40).toFixed(1)*40;
                    x2 = parseFloat(x/40).toFixed(1)==0?0:parseFloat(x/40).toFixed(1);
                    y2 = parseFloat(y/40).toFixed(1)==0?0:parseFloat(y/40).toFixed(1);

                }
                x3 = 2*x2-x1;
                y3 = 2*y2-y1;
                x3=parseFloat(x3).toFixed(1)==0?0:parseFloat(x3).toFixed(1);
                y3=parseFloat(y3).toFixed(1)==0?0:parseFloat(y3).toFixed(1);
                getParameter.P2x =  x3*40;
                getParameter.P2y =  y3*40;
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
                    getParameter.Px = parseFloat(x/40).toFixed(1)*40;
                    getParameter.Py = parseFloat(y/40).toFixed(1)*40;

                    x1 = parseFloat(x/40).toFixed(1)==0?0:parseFloat(x/40).toFixed(1);
                    y1 = parseFloat(y/40).toFixed(1)==0?0:parseFloat(y/40).toFixed(1);
                    console.log(x3,y3);


                }else if(selectobj.name=='B'){
                    getParameter.Mx = parseFloat(x/40).toFixed(1)*40;
                    getParameter.My = parseFloat(y/40).toFixed(1)*40;
                    x2 = parseFloat(x/40).toFixed(1)==0?0:parseFloat(x/40).toFixed(1);
                    y2 = parseFloat(y/40).toFixed(1)==0?0:parseFloat(y/40).toFixed(1);

                }
                x3 = 2*x2-x1;
                y3 = 2*y2-y1;
                x3=parseFloat(x3).toFixed(1)==0?0:parseFloat(x3).toFixed(1);
                y3=parseFloat(y3).toFixed(1)==0?0:parseFloat(y3).toFixed(1);
                getParameter.P2x =  x3*40;
                getParameter.P2y =  y3*40;
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
        Group3.remove(P3);
        key=false;
        checked=false;
    }
    else {
        $('#check>span').css('background','#5CAEFD').children().css({'right':'2px','left':'auto'});
        Group3.add(P3);
        key=true;
        checked=true;
    }
    threeDimension.moveO();

}
function reset() {
    $('#check>span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
    key=false;
    checked = false;
   getParameter = {
        Px:-40,
        Py:40,
        Mx:40,
        My:80,
        P2x: 120,
        P2y: 120
    };
    x1='-1.0',y1='1.0',x2='1.0',y2='2.0',x3='3.0',y3='3.0';
    threeDimension.createObj();
    threeDimension.moveO();
}

if (isMob) {
    $('#reset img').on('touchstart', reset);
    $('#check').on('touchstart',check);

} else {
    $('#reset img').on('click', reset);
    $('#check').on('click',check);

}

