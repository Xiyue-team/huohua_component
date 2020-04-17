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
    sides:4,
    angleJson : [],
    height:100, //棱台高度
    height1:200,//棱锥高度
    ratio:0.5,
    clear:5,
    isequ:true
};
var getParameter ={ //显示和改变参数
    sides:4,
    height:100,      //选择高度
    height1:200,      //选择高度
    ratio:0.5,
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
    lines:[],
    spheres1:[],
    getJson:function(n,sideLength){
        if(!sideLength){ sideLength=100; }
        var array=[],x,y;
        polygon.angleJson = [];
        polygon.angleJson.push([0,polygon.height1,0]);
        for(var i=0;i<n;i++){
            x = sideLength * Math.sin((2*Math.PI/n)*i);
            y = sideLength * Math.cos((2*Math.PI/n)*i);
            array = [x,0,y];
            polygon.angleJson.push(array);
        }
        for(i=1;i<(n+1);i++){
            x = (polygon.angleJson[i][0]-polygon.angleJson[0][0])*polygon.ratio+polygon.angleJson[0][0];
            y = (polygon.angleJson[i][2]-polygon.angleJson[0][2])*polygon.ratio+polygon.angleJson[0][2];
            array=[x,getParameter.height,y];
            polygon.angleJson.push(array);
        }
        polygon.isequ = true;
    },
    drawShape:function (){ //画出图形
        var shape = new THREE.Shape();
        var json1 = [];
        var num = polygon.sides;
        json1 = polygon.angleJson;
        shape.moveTo(json1[1][0],-json1[1][2]);
        if(createSphereFlag<num+1 && polygon.sides<36){
            twoDimension.createSphere(0,json1[0][0],0,-json1[0][2]);
            twoDimension.createSphere(1,json1[1][0],0,-json1[1][2]);
        }
        for(var i=2;i<num+1;i++){
            shape.lineTo(json1[i][0],-json1[i][2]);
            if(createSphereFlag<num+1&& num<36){
                twoDimension.createSphere(i,json1[i][0],0,-json1[i][2]);
            }
        }
        if(axisFlag){
            twoDimension.createText();
        }
        twoDimension.createLine();
        return shape;
    },
    createText:function(){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '20px Cambria Math', fillStyle: '#000', antialias: true};
        var num = polygon.sides;
        var v3=null,x,y,text=null;
        if(num<36){
            //是否给每个顶点创建坐标
            for(var i=0;i<(num+1);i++){
                if(scene.getObjectByName('text_'+i)){ scene.remove(scene.getObjectByName('text_'+i));}
                v3 = polygon.angleJson[i];
                text = new SpriteText2D(v3[0] + ","  + v3[2], textStyle);
                x = v3[0];y=-v3[2];
                if( x > 0 ){ x = x + 20}else{ x = x -20}
                if( y > 0 ){ y = y + 35}else{ y = y -20}
                text.position.set(x,y, 1);
                text.name = ('text_'+i);
                scene.add(text);
                twoDimension.texts.push(text);
            }
        }else{
            if(scene.getObjectByName('text_'+0)){ scene.remove(scene.getObjectByName('text_'+0));}
            v3 = polygon.angleJson[1];
            text = new SpriteText2D(v3[0] + ","  + v3[2], textStyle);
            x = v3[0];y=-v3[2];
            if( x > 0 ){ x = x + 20}else{ x = x -20}
            if( y > 0 ){ y = y + 35}else{ y = y -20}
            text.position.set(x,y, 1);
            text.name = ('text_'+0);
            scene.add(text);
            twoDimension.texts.push(text);

        }

    },
    createLine:function(){
        //创建上底面线条
        var num = polygon.sides,json1=[];
        json1 = polygon.angleJson;
        var geometryLine1 = new THREE.Geometry();
        var vertices1 =[],lineMesh = null;
        for(var i=(num+1);i<(2*num+1);i++){
            vertices1.push(new THREE.Vector3(json1[i][0],-json1[i][2],1));
        }
        vertices1.push(new THREE.Vector3(json1[num+1][0],-json1[num+1][2],2));
        geometryLine1.vertices = vertices1;
        geometryLine1.computeLineDistances();
        lineMesh = new THREE.Line(geometryLine1,new THREE.LineDashedMaterial( { color: 0xff0,opacity:0.5, dashSize: 5, gapSize: 5 } ) /*new THREE.LineDashedMaterial({color: '#507a93',linewidth:20,dashSize:100,gapSize:100})*/);
        scene.add(lineMesh);
        twoDimension.lines.push(lineMesh);
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
                var num1 = polygon.sides;
                offsetLeft = parseFloat($('#three-small-2').css('left'));
                offsetTop = parseFloat($('#three-small-2').css('top'));
                mouse.x = ((event.touches[0].pageX-offsetLeft) / widthV ) * 2 - 1;
                mouse.y = -((event.touches[0].pageY-offsetTop) / heightV ) * 2 + 1;
                plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection( plane.normal ),twoDimension.selectSphere.position );
                raycaster.setFromCamera( mouse, camera );
                raycaster.ray.intersectPlane( plane, intersection );
                var num = parseInt(twoDimension.selectSphere.name.slice(7));
                polygon.ratio = polygon.ratio = (getParameter.height1-getParameter.height)/getParameter.height1;
                var json = polygon.angleJson;
                var num1 = polygon.sides;
                var sideLength_x = Math.pow(Math.floor(Math.abs(parseInt(intersection.x))),2);
                var sideLength_y = Math.pow(Math.floor(Math.abs(parseInt(intersection.y))),2);
                var sideLength =Math.floor(Math.sqrt(sideLength_x+sideLength_y));

                if(num1 >=36){
                    if(sideLength>230){ return;}
                    if( polygon.isequ && num==0){return;}
                    if(intersection.y>=0){ return;}
                    var radio = Math.floor(Math.abs(parseInt(intersection.y)));
                    twoDimension.getJson(polygon.sides,radio);
                    twoDimension.selectSphere.position.y = -radio;
                }else{
                    if(polygon.isequ){
                        if(num==0){ return;}
                        if(sideLength>230){ return;}
                        twoDimension.getJson(polygon.sides,sideLength);
                        json = polygon.angleJson;
                        for(var i=1;i<num1+1;i++){
                            twoDimension.spheres[i].position.x =json[i][0];
                            twoDimension.spheres[i].position.y =-json[i][2];
                        }
                    }else{
                        if(intersection.x>230 || intersection.x<-230 ||intersection.y>230 || intersection.y<-230){ return;}
                        if(num==0){
                            twoDimension.selectSphere.position.x = polygon.angleJson[0][0] = parseInt(intersection.x);
                            polygon.angleJson[0][2] = -parseInt(intersection.y);
                            twoDimension.selectSphere.position.y = parseInt(intersection.y);
                            twoDimension.changeRatio();
                        }else{
                            twoDimension.selectSphere.position.x = polygon.angleJson[num][0] = parseInt(intersection.x);
                            polygon.angleJson[num][2] = -parseInt(intersection.y);
                            twoDimension.selectSphere.position.y = parseInt(intersection.y);
                            polygon.angleJson[num+num1][0] = parseInt((polygon.angleJson[num][0]-polygon.angleJson[0][0])*polygon.ratio+polygon.angleJson[0][0]);
                            polygon.angleJson[num+num1][2] = parseInt((polygon.angleJson[num][2]-polygon.angleJson[0][2])*polygon.ratio+polygon.angleJson[0][2]);
                        }
                    }
                }

                for(i=0;i<twoDimension.lines.length;i++){
                    scene.remove(twoDimension.lines[i]);
                }
                twoDimension.lines=[];
                scene.remove(shape);
                shape = twoDimension.createMesh(new THREE.ShapeGeometry(twoDimension.drawShape()));
                scene.add(shape);
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
                var obj = intersection.sub( offset );
                polygon.ratio = polygon.ratio = (getParameter.height1-getParameter.height)/getParameter.height1;
                var num1 = polygon.sides;
                var json = polygon.angleJson;
                var sideLength_x = Math.pow(Math.floor(Math.abs(parseInt(intersection.x))),2);
                var sideLength_y = Math.pow(Math.floor(Math.abs(parseInt(intersection.y))),2);
                var sideLength =Math.floor(Math.sqrt(sideLength_x+sideLength_y));

                if(num1 >=36){
                    if(sideLength>230){ return;}
                    if( polygon.isequ && num==0){return;}
                    if(intersection.y>=0){ return;}
                    var radio = Math.floor(Math.abs(parseInt(intersection.y)));
                    twoDimension.getJson(polygon.sides,radio);
                    twoDimension.selectSphere.position.y = -radio;
                }else{
                    if(polygon.isequ){
                        if(num==0){ return;}
                        if(sideLength>230){ return;}
                        twoDimension.getJson(polygon.sides,sideLength);
                        for(var i=1;i<num1+1;i++){
                            twoDimension.spheres[i].position.x =json[i][0];
                            twoDimension.spheres[i].position.y =-json[i][2];
                        }
                    }else{
                        if(intersection.x>230 || intersection.x<-230 ||intersection.y>230 || intersection.y<-230){ return;}
                        if(num==0){
                            twoDimension.selectSphere.position.x = polygon.angleJson[0][0] = parseInt(intersection.x);
                            polygon.angleJson[0][2] = -parseInt(intersection.y);
                            twoDimension.selectSphere.position.y = parseInt(intersection.y);
                            twoDimension.changeRatio();
                        }else{
                            twoDimension.selectSphere.position.x = polygon.angleJson[num][0] = parseInt(intersection.x);
                            polygon.angleJson[num][2] = -parseInt(intersection.y);
                            twoDimension.selectSphere.position.y = parseInt(intersection.y);
                            polygon.angleJson[num+num1][0] = parseInt((polygon.angleJson[num][0]-polygon.angleJson[0][0])*polygon.ratio+polygon.angleJson[0][0]);
                            polygon.angleJson[num+num1][2] = parseInt((polygon.angleJson[num][2]-polygon.angleJson[0][2])*polygon.ratio+polygon.angleJson[0][2]);
                        }
                    }
                }

                for(i=0;i<twoDimension.lines.length;i++){
                    scene.remove(twoDimension.lines[i]);
                }
                twoDimension.lines=[];
                scene.remove(shape);
                shape = twoDimension.createMesh(new THREE.ShapeGeometry(twoDimension.drawShape()));
                scene.add(shape);

                return;
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
    getLocal:function(){
        if(window.localStorage&&localStorage.getItem('trustumPyramid')){
            var text = localStorage.getItem('trustumPyramid');
            var textcopy = JSON.parse(text);
            polygon.angleJson = textcopy.angleJson;
            getParameter.sides = polygon.sides = parseInt(textcopy.sides);
            getParameter.height = polygon.height = parseInt(textcopy.height);
            getParameter.height1 = polygon.height1 = parseInt(textcopy.height1);
            getParameter.ratio = polygon.ratio = textcopy.ratio;
            polygon.isequ = textcopy.isequ;
            polygon.has = textcopy.has;
        }
    },
    repaint:function(tadio){
        if(!tadio){ tadio = 100;}
        scene.remove(shape);
        for(var i=0;i<twoDimension.spheres.length;i++){
            scene.remove(twoDimension.spheres[i]);
        }
        for(i=0;i<twoDimension.texts.length;i++){
            scene.remove(twoDimension.texts[i]);
        }
        for(i=0;i<twoDimension.lines.length;i++){
            scene.remove(twoDimension.lines[i]);
        }
        twoDimension.spheres = [];
        twoDimension.texts = [];
        twoDimension.lines=[];
        createSphereFlag = 0;
        //边数无限大时，假装是圆
        if(twoDimension.spheres1.length){ scene.remove(twoDimension.spheres1[0]);twoDimension.spheres1=[]}
        if(getParameter.sides >= 36){
            //假装呃是一个圆
            var sphereG = new THREE.CircleGeometry(100,36);
            var sphereM = new THREE.MeshBasicMaterial({color:0xd3d4d1,transparent:true,opacity:0.9});
            shape = new THREE.Mesh(sphereG,sphereM);
            twoDimension.createLine();
            var json1 = polygon.angleJson;
            twoDimension.createSphere(1,json1[1][0],0,-json1[1][2]);
            if(axisFlag){
                twoDimension.createText();
            }
        }else{
            shape = twoDimension.createMesh(new THREE.ShapeGeometry(twoDimension.drawShape()));
        }
        scene.add(shape);
    },
    changeRatio:function(){
        var num = polygon.sides;
        var height = polygon.angleJson[0][1] = getParameter.height1;
        for(var i=1;i<num+1;i++){
            polygon.angleJson[i+num][0] = (polygon.angleJson[i][0]-polygon.angleJson[0][0])*polygon.ratio+polygon.angleJson[0][0];
            polygon.angleJson[i+num][1] = polygon.height;
            polygon.angleJson[i+num][2] = (polygon.angleJson[i][2]-polygon.angleJson[0][2])*polygon.ratio+polygon.angleJson[0][2];
        }
    }
};

twoDimension.getJson(4);


var scene = new THREE.Scene();
scene.position.y=-50;
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
    axis : new THREE.Group(),
    grid:null,
    mesh:null,
    vertices:[],
    controlrs:null,
    extend:[],
    cylinder:null,
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
        var geometryLine3 = new THREE.Geometry();
        var vertices1 =[];
        var vertices2 =[];
        var vertices3 =[];
        var lineMesh=null;
        var json1=polygon.angleJson;
        var num = polygon.sides;
        if(num>=36){
            for(var i=1;i<num+1;i++){
                vertices1.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
                vertices2.push(new THREE.Vector3(json1[i+num][0],json1[i+num][1],json1[i+num][2]));
            }
        }else{
            for(i=1;i<num+1;i++){
                vertices1.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
                vertices2.push(new THREE.Vector3(json1[i+num][0],json1[i+num][1],json1[i+num][2]));

                vertices3.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
                vertices3.push(new THREE.Vector3(json1[i+num][0],json1[i+num][1],json1[i+num][2]));

                geometryLine3.vertices = vertices3;
                lineMesh = new THREE.LineSegments(geometryLine3, new THREE.LineBasicMaterial({color: '#F39800'}));
                sceneT.add(lineMesh);
                threeDimensional.lines.push(lineMesh);
            }
        }
        vertices1.push(new THREE.Vector3(json1[1][0],json1[1][1],json1[1][2]));
        vertices2.push(new THREE.Vector3(json1[num+1][0],json1[num+1][1],json1[num+1][2]));
        geometryLine1.vertices = vertices1;
        geometryLine2.vertices = vertices2;
        lineMesh = new THREE.Line(geometryLine1, new THREE.LineBasicMaterial({color: '#F39800'}));
        sceneT.add(lineMesh);
        threeDimensional.lines.push(lineMesh);
        lineMesh = new THREE.Line(geometryLine2, new THREE.LineBasicMaterial({color: '#F39800'}));
        sceneT.add(lineMesh);
        threeDimensional.lines.push(lineMesh);
        return threeDimensional.lines;
    },
    createTextMesh:function(){
        var num = polygon.sides;
        if(num>=36){ return;}
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '12px Cambria Math', fillStyle: '#000', antialias: true};
        var v3=[],text=null,x,y;
        for(var i=1;i<num*2+1;i++){
            v3 = polygon.angleJson[i];
            text = new SpriteText2D(v3[0] + ","  + v3[1]+","  + v3[2], textStyle);
            if(v3[1]>0){
                text.position.set((v3[0]+5), (v3[1]+25), (v3[2]+5));
            }else{
                if(v3[0] < 0){ x= v3[0]-20;}else{ x= v3[0]+20}
                if(v3[2] < 0){ y= v3[2]-20;}else{ y= v3[2]+20}
                text.position.set(x, v3[1], y);
            }
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
        for(i=0;i<threeDimensional.lines.length;i++){
            sceneT.remove(threeDimensional.lines[i]);
        }
        if(threeDimensional.extend.length){
            for(i=0;i<threeDimensional.extend.length;i++){
                sceneT.remove(threeDimensional.extend[i]);
            }
            threeDimensional.extend=[];
            threeDimensional.createExtend();
        }
        threeDimensional.lines=[];
        threeDimensional.createFaceMesh();

    },
    createPrismVertices:function (){ //创建点
        threeDimensional.vertices = [];
        var num = polygon.sides*2+1;
        var json1 = polygon.angleJson;
        for(var i=0;i<num;i++){
            threeDimensional.vertices.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
        }
    },
    createPrismFaces:function(){ //创建面
        var faces = [];
        var num = polygon.sides;
        for(var i=1;i<num;i++){
            faces.push(new THREE.Face3(i, i+1, i+num));
            faces.push(new THREE.Face3(i+num, i+1, i));
            faces.push(new THREE.Face3(i+1, i+num, i+num+1));
            faces.push(new THREE.Face3( i+num+1, i+num,i+1));
        }

        faces.push(new THREE.Face3(1, 1+num, num));
        faces.push(new THREE.Face3(num,1+num, 1));
        faces.push(new THREE.Face3(1+num, num, num*2));
        faces.push(new THREE.Face3(num*2, num, 1+num));

        //底面
        for(i=0;i<num-2;i++){
            faces.push( new THREE.Face3(1,i+3,i+2));
            faces.push( new THREE.Face3(i+num+2,i+num+3,num+1));
        }
        return faces;
    },
    createFaceMesh:function(){//三维图形
        threeDimensional.createPrismVertices();
        var faces = threeDimensional.createPrismFaces();
        var geom = new THREE.Geometry();
        geom.vertices = threeDimensional.vertices;
        geom.faces = faces;
        geom.computeFaceNormals();
        var materials = [
            //new THREE.MeshLambertMaterial({opacity:0.7,transparent:true}),
            new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.3,transparent:true})
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

    },
    int:function(){
        // threeDimensional.createGrid();
        // threeDimensional.createAxis();
        threeDimensional.createFaceMesh();
        //threeDimensional.createExtend();
    },
    createExtend:function(){
        var num = polygon.sides;
        if(num >= 36){ return; }
        var geometryLine1 = new THREE.Geometry();
        var vertices1 =[],lineMesh=null;
        var v3 = polygon.angleJson[0];
        for(var i=num+1;i<num*2+1;i++){
            vertices1.push(new THREE.Vector3(v3[0],v3[1],v3[2]));
            vertices1.push(new THREE.Vector3(polygon.angleJson[i][0],polygon.angleJson[i][1],polygon.angleJson[i][2]));
            geometryLine1.vertices = vertices1;
            geometryLine1.computeLineDistances();
            lineMesh = new THREE.Line(geometryLine1, new THREE.LineDashedMaterial({ color: '#F39800',opacity:0.5, dashSize: 5, gapSize: 5 }));
            sceneT.add(lineMesh);
            threeDimensional.extend.push(lineMesh);
        }


        // var SpriteText2D = THREE_Text.SpriteText2D;
        // var textAlign = THREE_Text.textAlign;
        // var textStyle = {align: textAlign.center, font: '12px Arial', fillStyle: '#000', antialias: true};
        // var v3=polygon.angleJson[0];
        // var text = new SpriteText2D(v3[0] + ","  + v3[1]+","  + v3[2], textStyle);
        // if(v3[0]>0){ text.position.x = v3[0] +10;}else{ text.position.x = v3[0] -10}
        // text.position.y = v3[1]+20;
        // if(v3[2]>0){ text.position.z = v3[2] +10;}else{ text.position.z = v3[2] -10}
        // sceneT.add(text);
        // threeDimensional.extend.push(text);
    }


};
//三维图形绘画

var sceneT = new THREE.Scene();
var cameraT = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
cameraT.position.x = 600;
cameraT.position.y = 350;
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

    if(polygon.height != getParameter.height ){
        polygon.height = getParameter.height;
        twoDimension.changeRatio();
        for(var i=0;i<twoDimension.lines.length;i++){
            scene.remove(twoDimension.lines[i]);
        }
        twoDimension.lines=[];
        twoDimension.createLine();
        threeDimensional.repaintMesh();
    }

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

    polygon.sides = getParameter.sides;
    twoDimension.getJson(polygon.sides);
    twoDimension.repaint();
    threeDimensional.repaintMesh();

});

$('#slider2').change(function(){

    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;
    getParameter.height =value;

    polygon.ratio = getParameter.ratio = (getParameter.height1-getParameter.height)/getParameter.height1;

});


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
        sides:4,
        height:100,      //选择高度
        height1:200,      //选择高度
        ratio:0.5,
        clear:5
    };
    polygon = { //多边形参数
        sides:4,
        angleJson : [],
        height:100, //棱台高度
        height1:200,//棱锥高度
        ratio:0.5,
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
    cameraT.position.y = 350;
    cameraT.position.z = 600;
}
function radiosEve(){
    $('.radios').find('.radiocircle').removeClass('select');
    $(this).find('.radiocircle').addClass('select');
    if($(this).hasClass('radios1')){
        polygon.isequ = true;
        twoDimension.getJson(polygon.sides);
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

