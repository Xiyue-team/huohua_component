//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});

//禁止选择
document.onselectstart=function(){return false;};

//判断设备类型进行缩放
var $threeCon = $('#threeContainer');
var scale = 1;
var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
if(!(bodyWidth == 370 && bodyHeight == 246)){
    var isMob = /iPad|Android/g.test(navigator.userAgent);
    var $body = $("body");
    // if(isMob){
        var bodyScale = scale = bodyWidth/1920;
        $('.body').css("zoom",bodyScale).height(1200);
        var marginTop = ($body.width()/bodyWidth*bodyHeight-1200)/2;$('.body').css("margin-top",'-600px');
        $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale + (bodyHeight-1200*scale)/2 ),bottom:(69*scale + (bodyHeight-1200*scale)/2 )});
        $(".threeControl").css({"zoom":bodyScale/0.7,"right":30*bodyScale,"bottom":30*bodyScale});
    // }else{
    //     scale = 0.6667;
    //     $(".body").css({"zoom":0.6667,"margin-top":'0',"top":'0'});
    //     $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale ),bottom:(69*scale)});
    // }
    $('.zoom').css("zoom",scale);
    $('body').css('background','#000');
}


// 控件区垂直居中居中
var controlHeight = $("#controlContainer").height();
var conHeight = $(".con").height();
var h2Height = $("#controlContainer h2").height();
var h2MarginTop = parseInt($("#controlContainer h2").css("margin-top"));
var marginTop = (controlHeight - h2Height - h2MarginTop - conHeight - 100)/2;
// $(".con").css("margin-top",marginTop);
var checked =false;
var chk=[false,false,false,false,false,false,false];
var chk0 = false,chk1 = false,chk2 = false,chk3 = false,chk4 = false,chk5 = false,chk6 = false;
var a=null;
var flag = 0;

var canWebgl=(function(){
    try {
        var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
    } catch ( e ) {
        return false;
    }
})();

//视图区鼠标事件操作相关变量
var raycaster = new THREE.Raycaster(),
    plane = new THREE.Plane(),
    offset = new THREE.Vector3(),
    intersection = new THREE.Vector3(),
    mouse = new THREE.Vector2(),
    INTERSECTED = null;
var offsetLeft = parseInt($threeCon.offset().left);
var offsetTop = parseInt($threeCon.offset().top);

/****** 位置相关 ******/
var $obj = $('#threeContainer'),
    threeHeight = $obj.height(),
     threeWidth= $obj.width(),styleValue = 0;

var createSphereFlag = 0;


var polygon = { //多边形参数
    sidesnum:4,
    angleJson : [],
    height:100,
    clear:5,
    isequ:true
};
var getParameter ={ //显示和改变参数
    sides:4,        //选择边的数目
    height:100,      //选择高度
    clear:5
};


var widthV = 612*scale;
var heightV =  400*scale;
offsetLeft = $('.three-small-con').offset().left*scale;
offsetTop = $('.three-small-con').offset().top*scale;
$('#three-small-2').css({'left':offsetLeft,'top':offsetTop,'z-index':1});
var shape;


//控件取值结束
var axisFlag=false;
var twoDimension={
    spheres:[],
    texts:[],
    selectSphere : null,
    intersects:null,
    getJson:function(n,sideLength){
        var arrayAll =[];
        if(!sideLength){
            sideLength = 100;
        }
        polygon.angleJson = [];
        for(var i=0;i<n;i++){
            var x = Math.round(sideLength * Math.sin((2*Math.PI/n)*i));
            var y = Math.round(sideLength * Math.cos((2*Math.PI/n)*i));
            var array = [x,0,y];
            arrayAll.push(array);
        }
        polygon.angleJson = arrayAll;
        polygon.angleJson.push([0,polygon.height,0]);
        polygon.sidesnum = polygon.angleJson.length-1;
        polygon.isequ = true;
    },
    drawShape:function (){ //画出图形
        var shape = new THREE.Shape();
        var json1 = [];
        json1 = polygon.angleJson;
        shape.moveTo(json1[0][0],-json1[0][2]);
        if(createSphereFlag<polygon.sidesnum){
            for(var i=0;i<polygon.angleJson.length;i++){
                twoDimension.createSphere(i,json1[i][0],json1[i][1],-json1[i][2]);
            }
        }
        for(i=1;i<polygon.sidesnum;i++){
            shape.lineTo(json1[i][0],-json1[i][2]);
        }
        if(axisFlag){
            twoDimension.createText();
        }

        return shape;
    },
    createText:function(){
        //是否给每个顶点创建坐标
        if(polygon.sidesnum>=36){return;}
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '20px Cambria Math', fillStyle: '#000', antialias: true};
        for(var i=0;i<polygon.sidesnum+1;i++){
            if(scene.getObjectByName('text_'+i)){ scene.remove(scene.getObjectByName('text_'+i));}
            var v3 = polygon.angleJson[i];
            var text = new SpriteText2D(v3[0] + ","  + v3[2], textStyle);
            var x = v3[0],y=-v3[2];
            if( x > 0 ){ x = x + 20}else{ x = x -20}
            if( y > 0 ){ y = y + 35}else{ y = y -20}
            text.position.set(x,y, 1);
            text.name = ('text_'+i);
            scene.add(text);
            twoDimension.texts.push(text);
        }
    },
    createMesh:function (geom) { //对象和材质融合，创建路径对象
        var wireFrameMat = new THREE.MeshBasicMaterial({color:'#d3d4d1',transparent:true,opacity:0.9});
        var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [ wireFrameMat]);
        return mesh;
    },
    createSphere:function(num,x,z,y){//创建顶点
        ++createSphereFlag;
        var sphereG = new THREE.SphereGeometry(12,6,6);
        var sphereM = new THREE.MeshBasicMaterial({color:'#1785f8',transparent:true,opacity:1});
        var sphere = new THREE.Mesh(sphereG,sphereM);
        if(num==0||num){
            sphere.name = 'sphere_'+num;
        }
        sphere.position.set(x,y,z);
        scene.add(sphere);
        twoDimension.spheres.push(sphere);
    },
    onDocumentMouseDown:function(){
        event.preventDefault();
        offsetLeft = parseFloat($('#three-small-2').css('left'));
        offsetTop = parseFloat($('#three-small-2').css('top'));
        mouse.x = ((event.clientX-offsetLeft) / widthV ) * 2 - 1;
        mouse.y = -( (event.clientY-offsetTop) / heightV ) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(twoDimension.spheres);
        if (intersects.length > 0) {
            twoDimension.selectSphere = intersects[0].object;
            intersects[0].object.material.transparent = true;
            intersects[0].object.material.opacity = 0.8;
        }
    },
    onDocumentTouchStart:function(){
        if (event.touches.length === 1) {
            event.preventDefault();
            twoDimension.intersects = null;

            offsetLeft = parseFloat($('#three-small-2').css('left'));
            offsetTop = parseFloat($('#three-small-2').css('top'));
            mouse.x = ((event.touches[0].pageX-offsetLeft) / widthV ) * 2 - 1;
            mouse.y = -((event.touches[0].pageY-offsetTop) / heightV ) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            twoDimension.intersects = raycaster.intersectObjects(twoDimension.spheres);
            if (twoDimension.intersects.length > 0) {
                twoDimension.selectSphere = twoDimension.intersects[0].object;
                twoDimension.intersects[0].object.material.transparent = true;
                twoDimension.intersects[0].object.material.opacity = 0.8;
            }
        }
    },
    onDocumentTouchMove:function (event) { //鼠标移动事件，坐标转换
        if (event.touches.length === 1) {
            event.preventDefault();
            if(twoDimension.selectSphere){
                offsetLeft = parseFloat($('#three-small-2').css('left'));
                offsetTop = parseFloat($('#three-small-2').css('top'));
                mouse.x = ((event.touches[0].pageX-offsetLeft) / widthV ) * 2 - 1;
                mouse.y = -((event.touches[0].pageY-offsetTop) / heightV ) * 2 + 1;
                plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection( plane.normal ),twoDimension.selectSphere.position );
                raycaster.setFromCamera( mouse, camera );
                raycaster.ray.intersectPlane( plane, intersection );
                if(intersection.x>210 || intersection.x<-210 ||intersection.y>210 || intersection.y<-210){ return;}
                var num = parseInt(twoDimension.selectSphere.name.slice(7));

                if(polygon.isequ){

                    if(num < getParameter.sides){
                        var sideLength_x = Math.pow(Math.floor(Math.abs(parseInt(intersection.x))),2);
                        var sideLength_y = Math.pow(Math.floor(Math.abs(parseInt(intersection.y))),2);
                        var sideLength =Math.floor(Math.sqrt(sideLength_x+sideLength_y));
                        twoDimension.getJson(getParameter.sides,sideLength);
                        for(var i=0;i<polygon.angleJson.length;i++){
                            twoDimension.spheres[i].position.x =polygon.angleJson[i][0];
                            twoDimension.spheres[i].position.y =-polygon.angleJson[i][2];
                        }
                        scene.remove(shape);
                        shape = twoDimension.createMesh(new THREE.ShapeGeometry(twoDimension.drawShape()));
                        scene.add(shape);
                    }else{
                        return;
                    }

                }else{
                    twoDimension.selectSphere.position.x = polygon.angleJson[num][0] = parseInt(intersection.x);
                    polygon.angleJson[num][2] = -parseInt(intersection.y);
                    twoDimension.selectSphere.position.y = parseInt(intersection.y);
                    scene.remove(shape);
                    shape = twoDimension.createMesh(new THREE.ShapeGeometry(twoDimension.drawShape()));
                    scene.add(shape);
                }
            }
        }

    },
    onDocumentMouseMove:function (event) { //鼠标移动事件，坐标转换
        event.preventDefault();
        offsetLeft = parseFloat($('#three-small-2').css('left'));
        offsetTop = parseFloat($('#three-small-2').css('top'));
        mouse.x = ((event.clientX-offsetLeft) / widthV ) * 2 - 1;
        mouse.y = -( (event.clientY-offsetTop) / heightV ) * 2 + 1;

        var intersects = raycaster.intersectObjects( twoDimension.spheres );
        if ( intersects.length > 0 ) {
            if ( INTERSECTED != intersects[ 0 ].object ) {
                INTERSECTED = intersects[ 0 ].object;
                plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection( plane.normal ),INTERSECTED.position );
            }
        }
        raycaster.setFromCamera( mouse, camera );
        if(twoDimension.selectSphere){
            if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                var num = parseInt(twoDimension.selectSphere.name.slice(7));
                if(intersection.x>210 || intersection.x<-210 ||intersection.y>210 || intersection.y<-210){ return;}
                var obj = intersection.sub( offset );


                if(polygon.isequ){

                    if(num < getParameter.sides){
                        var sideLength_x = Math.pow(Math.floor(Math.abs(parseInt(intersection.x))),2);
                        var sideLength_y = Math.pow(Math.floor(Math.abs(parseInt(intersection.y))),2);
                        var sideLength =Math.floor(Math.sqrt(sideLength_x+sideLength_y));
                        twoDimension.getJson(getParameter.sides,sideLength);
                        for(var i=0;i<polygon.angleJson.length;i++){
                            twoDimension.spheres[i].position.x =polygon.angleJson[i][0];
                            twoDimension.spheres[i].position.y =-polygon.angleJson[i][2];
                        }
                        scene.remove(shape);
                        shape = twoDimension.createMesh(new THREE.ShapeGeometry(twoDimension.drawShape()));
                        scene.add(shape);
                    }else{
                        return;
                    }

                }else{
                    twoDimension.spheres[num].position.x = polygon.angleJson[num][0] = parseInt(obj.x);
                    polygon.angleJson[num][2] = -parseInt(obj.y);
                    twoDimension.spheres[num].position.y = parseInt(obj.y);
                    scene.remove(shape);
                    shape = twoDimension.createMesh(new THREE.ShapeGeometry(twoDimension.drawShape()));
                    scene.add(shape);
                }



            }
        }

    },
    onDocumentMouseUp:function (){ //鼠标离开obj或者up时的事件，移除透明度
        event.preventDefault();
        if(twoDimension.selectSphere){
            twoDimension.selectSphere.material.opacity = 1;
            threeDimensional.repaintMesh();
        }
        if ( INTERSECTED ) {
            twoDimension.selectSphere = null;
        }
    },
    onDocumentTouchEnd:function (){ //鼠标离开obj或者up时的事件，移除透明度
        event.preventDefault();
        if(twoDimension.selectSphere){
            twoDimension.selectSphere.material.opacity = 1;
            threeDimensional.repaintMesh();
            twoDimension.selectSphere = null;
        }
    },
    repaint:function(){
        twoDimension.getJson(getParameter.sides);
        scene.remove(shape);
        for(var i=0;i<twoDimension.spheres.length;i++){
            scene.remove(twoDimension.spheres[i]);
        }
        for(var j=0;j<twoDimension.texts.length;j++){
            scene.remove(twoDimension.texts[j]);
        }
        twoDimension.spheres = [];
        twoDimension.texts = [];
        createSphereFlag = 0;
        //边数无限大时，假装是圆
        if(getParameter.sides >= 36){
            //假装呃是一个圆
            var sphereG = new THREE.SphereGeometry(100,20,20);
            var sphereM = new THREE.MeshBasicMaterial({color:'#d3d4d1',transparent:true,opacity:0.9});
            shape = new THREE.Mesh(sphereG,sphereM);
        }else{
            shape = twoDimension.createMesh(new THREE.ShapeGeometry(twoDimension.drawShape()));
        }
        scene.add(shape);
    }
};



twoDimension.getJson(4);


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45,widthV/heightV,1,10000);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 500;
camera.lookAt(scene.position);
scene.add(camera);
var renderer = null;
if(canWebgl){
    renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
}else{
    renderer = new THREE.CanvasRenderer({alpha:true});
}
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor(0xffffff,0);
renderer.setSize(widthV,heightV);


shape = twoDimension.createMesh(new THREE.ShapeGeometry(twoDimension.drawShape()));

scene.add(shape);


//鼠标点击，选中顶点
renderer.domElement.addEventListener( 'mousedown', twoDimension.onDocumentMouseDown, false );
renderer.domElement.addEventListener( 'touchstart', twoDimension.onDocumentTouchStart, false );
renderer.domElement.addEventListener( 'mousemove', twoDimension.onDocumentMouseMove, false );
renderer.domElement.addEventListener( 'touchmove', twoDimension.onDocumentTouchMove, false );
renderer.domElement.addEventListener( 'mouseup', twoDimension.onDocumentMouseUp, false );
renderer.domElement.addEventListener( 'touchend', twoDimension.onDocumentTouchEnd, false );
document.addEventListener( 'mouseup', twoDimension.onDocumentMouseUp, false );


//三维图形开始
var threeDimensional ={
    prismJson:[],
    lines : [],
    textMesh : [],
    axis :new THREE.Group(),
    grid:null,
    mesh:null,
    vertices:[],
    controlrs:null,
    labelAxis:function (start, stepSize, stop) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={};
        // label x axis:
        textStyle = {align: textAlign.center, font: '10px Cambria Math', fillStyle: 'red', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i, textStyle);
            text.rotation = camera.rotation;
            text.position.x = i;
            text.position.y = -5;
            threeDimensional.axis.add(text);
        }
        text = new SpriteText2D('x', textStyle);
        text.rotation = camera.rotation;
        text.position.x = stop+30;
        text.position.y = -5;
        threeDimensional.axis.add(text);

        // label z axis:
        textStyle = {align: textAlign.center, font: '10px Cambria Math', fillStyle: '#00F', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i, textStyle);
            text.position.z = i;
            text.position.x = -0.2;
            text.position.y = -5;
            threeDimensional.axis.add(text);
        }
        text = new SpriteText2D('z', textStyle);
        text.position.z = stop+30;
        text.position.x = -0.2;
        text.position.y = -5;
        threeDimensional.axis.add(text);
        // label y axis:
        textStyle = {align: textAlign.center, font: '10px Cambria Math', fillStyle: '#00FF00', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i, textStyle);
            text.rotation = camera.rotation;
            text.position.x = 5;
            text.position.y = i;
            text.position.z = 0.2;
            threeDimensional.axis.add(text);
        }
        text = new SpriteText2D('y', textStyle);
        text.position.x = 5;
        text.position.y = stop+30;
        text.position.z = 0.2;
        threeDimensional.axis.add(text);
    },
    createLine:function(){//三维边线
        threeDimensional.lines = [];
        var geometryLine1 = new THREE.Geometry();
        var geometryLine2 = new THREE.Geometry();
        var vertices1 =[];
        var vertices2 =[];
        var lineMesh=null;
        if(polygon.sidesnum>=36){
            var json1=polygon.angleJson;
            for(var i=0;i<polygon.sidesnum;i++){
                vertices2.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
            }
            vertices2.push(new THREE.Vector3(json1[0][0],json1[0][1],json1[0][2]));
        }else{
            var json1=polygon.angleJson;
            var num = polygon.sidesnum;
            for(var i=0;i<num;i++){
                vertices1.push(new THREE.Vector3(json1[num][0],json1[num][1],json1[num][2]));
                vertices1.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
                if(i<num-1){
                    vertices2.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
                    vertices2.push(new THREE.Vector3(json1[i+1][0],json1[i+1][1],json1[i+1][2]));
                }else{
                    vertices2.push(new THREE.Vector3(json1[0][0],json1[0][1],json1[0][2]));
                    vertices2.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
                }
                geometryLine1.vertices = vertices1;
                var lineMesh = new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: '#F39800'}));
                sceneT.add(lineMesh);
                threeDimensional.lines.push(lineMesh);
            }
        }

        geometryLine2.vertices = vertices2;
        lineMesh = new THREE.Line(geometryLine2, new THREE.LineBasicMaterial({color: '#F39800'}));
        sceneT.add(lineMesh);
        threeDimensional.lines.push(lineMesh);
        return threeDimensional.lines;
    },
    createTextMesh:function(){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '12px Cambria Math', fillStyle: '#000', antialias: true};
        var v3=[],text=null,x,y;
        if(polygon.sidesnum>=36){
            v3 = polygon.angleJson[polygon.sidesnum];
            text = new SpriteText2D(v3[0] + ","  + v3[1]+","  + v3[2], textStyle);
            y= parseInt(getParameter.height)+20;
            text.position.set(v3[0], y ,v3[2]);
            sceneT.add(text);
            threeDimensional.textMesh.push(text);
            return;
        }
        var num = polygon.sidesnum+1;
        for(var i=0;i<num;i++){
            v3 = polygon.angleJson[i];
            text = new SpriteText2D(v3[0] + ","  + v3[1]+","  + v3[2], textStyle);
            if(v3[0] < 0){ x= v3[0]-20;}else{ x= v3[0]+20}
            if(v3[2] < 0){ y= v3[2]-20;}else{ y= v3[2]+20}
            text.position.set(x, v3[1], y);
            sceneT.add(text);
            threeDimensional.textMesh.push(text);
        }
    },
    vec3:function(x,y,z){
        return new THREE.Vector3(x, y, z);
    },
    drawAxisArrow:function(origin, dir, _color) {
        var geometryLine = new THREE.Geometry();
        var vertices = [];
        vertices.push(origin);
        vertices.push(dir);
        geometryLine.vertices = vertices;
        var line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: _color}));
        threeDimensional.axis.add(line);

    },
    createGrid:function (){
        threeDimensional.grid=null;
        var geometry = new THREE.Geometry(), bottom = -0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( { color: 0x949494, transparent: true, opacity: 0.5 } );
        for ( var i = 0; i <= 12; i ++ ) {
            geometry.vertices.push( threeDimensional.vec3( - 300, bottom, i * step - 300 ) );
            geometry.vertices.push( threeDimensional.vec3(   300, bottom, i * step - 300 ) );

            geometry.vertices.push( threeDimensional.vec3( i * step - 300, bottom, -300 ) );
            geometry.vertices.push( threeDimensional.vec3( i * step - 300, bottom,  300 ) );
        }
        threeDimensional.grid = new THREE.LineSegments( geometry, lineMaterial, THREE.LinePieces );
        sceneT.add( threeDimensional.grid );
        window.gridColor = 0x303030;
    },
    createAxis:function(){
        threeDimensional.axis = new THREE.Group();
        threeDimensional.labelAxis(50, 50, 300);
        threeDimensional.drawAxisArrow(threeDimensional.vec3( 0, 0, 0 ), threeDimensional.vec3( 350, 0, 0 ), 0xFF0000);
        threeDimensional.drawAxisArrow(threeDimensional.vec3( 0, 0, 0 ), threeDimensional.vec3( 0, 350, 0 ), 0x00FF00);
        threeDimensional.drawAxisArrow(threeDimensional.vec3( 0, 0, 0 ), threeDimensional.vec3( 0, 0, 350 ), 0x0000FF);
        sceneT.add( threeDimensional.axis);
    },
    repaintMesh:function(){
        sceneT.remove(threeDimensional.mesh);
        for(var i=0;i<threeDimensional.textMesh.length;i++){
            sceneT.remove(threeDimensional.textMesh[i]);
        }
        threeDimensional.textMesh=[];
        for(var j=0;j<threeDimensional.lines.length;j++){
            sceneT.remove(threeDimensional.lines[j]);
        }
        threeDimensional.lines=[];
        threeDimensional.createFaceMesh();
    },
    createPrismVertices:function (){ //创建点
        threeDimensional.vertices = [];
        var num = polygon.angleJson.length;
        var json1 = polygon.angleJson;
        for(var i=0;i<num;i++){
            threeDimensional.vertices.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
        }
    },
    createPrismFaces:function(){ //创建面
        var faces = [];
        var peak = polygon.sidesnum;
        for(var i=0;i<polygon.sidesnum-1;i++){
            faces.push(new THREE.Face3(peak, i, i+1));
        }
        faces.push(new THREE.Face3(peak, 0, peak-1));
        for(i=0;i<(polygon.sidesnum-2);i++){
            faces.push( new THREE.Face3(0,i+1,i+2));
        }
        return faces;
    },
    createFaceMesh:function(){//三维图形
        if(axisFlag&&polygon.sidesnum >= 36){
            var meshG = new THREE.CylinderGeometry(0,100,getParameter.height,1000);
            var meshM = new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.5,transparent:true,side:THREE.DoubleSide});
            threeDimensional.mesh = new THREE.Mesh(meshG,meshM);
            threeDimensional.mesh.position.y = getParameter.height/2;
            sceneT.add(threeDimensional.mesh);
            threeDimensional.createLine();
            threeDimensional.createTextMesh();
            return;
        }
        threeDimensional.createPrismVertices();
        var faces = threeDimensional.createPrismFaces();
        var geom = new THREE.Geometry();
        geom.vertices = threeDimensional.vertices;
        geom.faces = faces;
        geom.computeFaceNormals();
        var materials = [
            //new THREE.MeshLambertMaterial({opacity:0.7,transparent:true}),
            new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.2,transparent:true,side:THREE.DoubleSide})
        ];
        threeDimensional.mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials);
        sceneT.add(threeDimensional.mesh);
        threeDimensional.createLine();
        if( axisFlag){
            threeDimensional.createTextMesh();
        }
    },
    createControls:function(){
        threeDimensional.controls = new THREE.OrbitControls( cameraT, rendererT.domElement );
        //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
        threeDimensional.controls.enableDamping = true;
        threeDimensional.controls.dampingFactor = 0.25;
        threeDimensional.controls.enableZoom = true;
    },
    int:function(){
        threeDimensional.createFaceMesh();
        // threeDimensional.createGrid();
        // threeDimensional.createAxis();
    },
    onGesturechange:function(event){
        var result = $('#sides-slider-value4').val();
        var value = parseInt(result.split('|')[1]);

        if(event.originalEvent.scale < eventScale){//缩小
            if(value <=1){
                return;
            }
            getParameter.clear = --value;
        }
        if(event.originalEvent.scale > eventScale){//增大
            if(value >=9){
                return;
            }
            getParameter.clear = ++value;
        }
        clearEvent(value);
        eventScale = event.originalEvent.scale;

    }
};
//三维图形绘画

var sceneT = new THREE.Scene();
var cameraT = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
cameraT.position.x = 600;
cameraT.position.y = 600;
cameraT.position.z = 600;
cameraT.lookAt(sceneT.position);
var rendererT =null;
if(canWebgl){
    rendererT = new THREE.WebGLRenderer({antialias:true});
}else{
    rendererT = new THREE.CanvasRenderer();
}
rendererT.setPixelRatio( window.devicePixelRatio );
rendererT.setClearColor(0xffffff);
rendererT.setSize(threeWidth,threeHeight);

threeDimensional.int();
threeDimensional.repaintMesh();
threeDimensional.createControls();
var eventScale = 1;


$('#three-small-2').append(renderer.domElement);
$obj.append(rendererT.domElement);

//重置事件
function renderAll(){

    threeDimensional.controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true

    requestAnimationFrame(renderAll);
    renderer.render(scene,camera);
    rendererT.render(sceneT,cameraT);
}
renderAll();



$('#slider1').change(function(){

    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;

    if(value == 7){
        realV =  10;
    }else if(value == 8){
        realV =  36;
    }else{
        realV = value;
    }
    getParameter.sides = realV;
    $('.radios').find('.radiocircle').removeClass('select');
    $('.radios1').find('.radiocircle').addClass('select');

    polygon.sidesnum = getParameter.sides;
    twoDimension.repaint();
    threeDimensional.repaintMesh();


});


$('#slider2').change(function(){

    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;
    value = value<1?1:value;

    getParameter.height =value;
    polygon.height = getParameter.height;
    polygon.angleJson[polygon.angleJson.length-1][1] = getParameter.height;
    threeDimensional.repaintMesh();

});

//单选框事件
// $('.radioChoose .radios').click(function(){
//     $('.radios').find('.radiocircle').removeClass('select');
//     $(this).find('.radiocircle').addClass('select');
// });

/*全屏事件*/
var fullScreen=0;

function fullEve(){
    if(fullScreen){
        fullScreen = 0;
        $('#scale img').attr('src','images/icon/all.png');
        if(isMob){
            $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale + (bodyHeight-1200*scale)/2 ),bottom:(69*scale + (bodyHeight-1200*scale)/2 )});
        }else{
            $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale ),bottom:(69*scale)});
        }
        $('canvas').css({'position':'absolute','left':0,'top':0});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','visible');
        $('#threeContainer').css({'border-radius':10*scale,'box-shadow': 6*scale + 'px '+6*scale +'px '+ 20*scale +'px rgba(0,0,0,0.30)' });
    }else{
        fullScreen = 1;
        $('#scale img').attr('src','images/icon/back.png');
        $obj.css({'left':0,'top':0,'right':0,'bottom':0,'border-radius':'0'});
        $('canvas').css({'position':'absolute','left':(bodyWidth-threeWidth)/2,'top':(bodyHeight-threeHeight)/2});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','hidden');
    }
}
function renewEve(){
    getParameter ={ //显示和改变参数
        sides:4,        //选择边的数目
        height:100,      //选择高度
        clear:5
    };
    polygon = { //多边形参数
        sidesnum:4,
        angleJson : [],
        height:100,
        clear:5,
        isequ:true
    };


    $('.radios').find('.radiocircle').removeClass('select');
    $('.radios1').find('.radiocircle').addClass('select');

    twoDimension.getJson(4);
    twoDimension.repaint();
    threeDimensional.repaintMesh();



    $('.slider1').find('.sliderLeft').css({'width':'82px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'82px'});
    $('.slider1').find('.xdsoft_slider_label').text('4');
    $('.slider1').attr('value',''+4+'|0');

    $('.slider2').find('.sliderLeft').css({'width':'205px'});
    $('.slider2').find('.xdsoft_range2dslider_runner').css({'left':'205px'});
    $('.slider2').find('.xdsoft_slider_label').text('100');
    $('.slider2').attr('value',''+100+'|0');

    cameraT.position.x = 600;
    cameraT.position.y = 600;
    cameraT.position.z = 600;
}

function radiosEve(){
    $('.radios').find('.radiocircle').removeClass('select');
    $(this).find('.radiocircle').addClass('select');
    if($(this).hasClass('radios1')){
        polygon.isequ = true;
        twoDimension.repaint();
        threeDimensional.repaintMesh();
    }else{
        polygon.isequ = false;
    }
}


if(!isMob){
    $('#renew').on('click',renewEve);
    $('#scale').on('click',fullEve);
    $('.radioChoose .radios').on('click',radiosEve);
}else{
    $('#renew').on('touchstart',renewEve);
    $('#scale').on('touchstart',fullEve);
    $('.radioChoose .radios').on('touchstart',radiosEve);
}

