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

var select1 = $('.radios1');//正多边形选择框
var select2 = $('.radios2');//非正多边形选择框
var createSphereFlag = 0;


var polygon = { //多边形参数
    sides:4,
    angleJson : [],
    height:100, //棱锥高度
    clear:5,
    shape:1,
    radius:100,
    isequ:true
};
var getParameter ={ //显示和改变参数
    sides:4,
    height:100, //选择高度
    shape:1,
    clear:5
};


var widthV = 612*scale;
var heightV =  400*scale;
offsetLeft = $('.three-small-con').offset().left*scale;
offsetTop = $('.three-small-con').offset().top*scale;
$('#three-small-2').css({'left':offsetLeft,'top':offsetTop,'z-index':1});
var shape;
var axisFlag = false, oldResult = 1, totolJson =[], oldshape = 1, countTime = 0,timing=0,dynamic=0,changeShape=0;


//控件取值结束
var axisFlag=false;
var twoDimension={
    shape:[1,2,3],
    spheres:[],
    texts:[],
    selectSphere : null,
    intersects:null,
    lines:[],
    shapeG:null,
    lineJson:[],
    getJson:function(sideLength){
        if(!sideLength){ sideLength =100;}
        var array=[],x,y,n =polygon.sides;
        polygon.angleJson = [];
        for(var i=0;i<n;i++){
            x = Math.round(sideLength * Math.sin((2*Math.PI/n)*i));
            y = Math.round(sideLength * Math.cos((2*Math.PI/n)*i));
            array = [x,0,y];
            polygon.angleJson.push(array);
        }
        polygon.isequ = true;
    },
    getLineJson:function(){ //获取棱台的上底面坐标
        twoDimension.lineJson = [];
        var json = polygon.angleJson;
        for(var i=0;i<polygon.sides;i++){
            twoDimension.lineJson.push([json[i][0]/2,polygon.height,json[i][2]/2]);
        }
    },
    drawShape:function (){ //画出图形
        var shape = new THREE.Shape();
        var json1 = [];
        var num = polygon.sides;
        json1 = polygon.angleJson;
        shape.moveTo(json1[0][0],-json1[0][2]);
        for(var i=1;i<num;i++){
            shape.lineTo(json1[i][0],-json1[i][2]);
        }
        return shape;
    },
    createText:function(){
        if(!axisFlag){ return;}
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '20px Cambria Math', fillStyle: '#000', antialias: true};
        var num = polygon.sides;
        var v3=null,x,y,text=null;
        if(num<36){
            //是否给每个顶点创建坐标
            for(var i=0;i<num;i++){
                v3 = polygon.angleJson[i];
                text = new SpriteText2D(v3[0] + ","  + v3[2], textStyle);
                x = v3[0];y=-v3[2];
                if( x > 0 ){ x = x + 20}else{ x = x -20}
                if( y > 0 ){ y = y + 35}else{ y = y -20}
                text.position.set(x,y, 0);
                text.name = ('text_'+i);
                scene.add(text);
                twoDimension.texts.push(text);
            }
        }else{
            v3 = polygon.angleJson[1];
            text = new SpriteText2D(0 + ","  + (-polygon.radius), textStyle);
            x = v3[0];y=-v3[2];
            if( x > 0 ){ x = x + 20}else{ x = x -20}
            if( y > 0 ){ y = y + 35}else{ y = y -20}
            text.position.set(x,-polygon.radius, 0);
            text.name = ('text_'+0);
            scene.add(text);
            twoDimension.texts.push(text);
        }

    },
    createLine:function(){
        //创建上底面线条
        twoDimension.getLineJson();
        var num = polygon.sides,json1=[];
        json1 = twoDimension.lineJson;
        var geometryLine1 = new THREE.Geometry();
        var vertices1 =[],lineMesh = null;
        for(var i=0;i<num;i++){
            vertices1.push(new THREE.Vector3(json1[i][0],-json1[i][2],1));
        }
        vertices1.push(new THREE.Vector3(json1[0][0],-json1[0][2],1));
        geometryLine1.vertices = vertices1;
        geometryLine1.computeLineDistances();
        //lineMesh = new THREE.Line(geometryLine1,new THREE.LineDashedMaterial( { color: 0x999999,opacity:0.5, dashSize: 5, gapSize: 5 } ) /*new THREE.LineDashedMaterial({color: '#507a93',linewidth:20,dashSize:100,gapSize:100})*/);
        //scene.add(lineMesh);
        //twoDimension.lines.push(lineMesh);
    },
    createMesh:function (geom) { //对象和材质融合，创建路径对象
        var wireFrameMat = new THREE.MeshBasicMaterial({color:0xd3d4d1,transparent:true,opacity:0.9});
        var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [ wireFrameMat]);
        return mesh;
    },
    createSphere:function(){//创建顶点
        var json1 = polygon.angleJson,i,sphereG=null,sphereM=null,sphere=null;
        if( polygon.sides >= 36){
            sphereG = new THREE.SphereGeometry(12,6,6);
            sphereM = new THREE.MeshBasicMaterial({color:'#1785f8',transparent:true,opacity:1});
            sphere = new THREE.Mesh(sphereG,sphereM);
            sphere.name = 'sphere_'+1;
            sphere.position.set(0,-polygon.radius,0);
            scene.add(sphere);
            twoDimension.spheres.push(sphere);
        }else{
            for(i=0;i<polygon.sides;i++){
                sphereG = new THREE.SphereGeometry(12,6,6);
                sphereM = new THREE.MeshBasicMaterial({color:'#1785f8',transparent:true,opacity:1});
                sphere = new THREE.Mesh(sphereG,sphereM);
                sphere.name = 'sphere_'+i;
                sphere.position.set(json1[i][0],-json1[i][2],json1[i][1]);
                scene.add(sphere);
                twoDimension.spheres.push(sphere);
            }
        }

    },
    clearSphere:function(){
        var obj = twoDimension.spheres;
        for(var i=0;i<obj.length;i++){
            scene.remove(obj[i]);
        }
        obj = null;
        twoDimension.spheres = [];
    },
    clearTexts:function(){
        var obj = twoDimension.texts;
        for(var i=0;i<obj.length;i++){
            scene.remove(obj[i]);
        }
        obj = null;
        twoDimension.texts = [];
    },
    clearLines:function(){
        var obj = twoDimension.lines;
        for(var i=0;i<obj.length;i++){
            scene.remove(obj[i]);
        }
        obj = null;
        twoDimension.lines = [];
    },
    onDocumentMouseDown:function(){
        if(countTime){ return;}
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
        if(countTime){ return;}
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
                    polygon.radius = radio;
                    twoDimension.getJson(radio);
                    twoDimension.selectSphere.position.y = -radio;

                }else{
                    if(polygon.isequ){
                        if(num==0){ return;}
                        if(sideLength>230){ return;}
                        polygon.radius = sideLength;
                        twoDimension.getJson(sideLength);
                        for(var i=0;i<num1;i++){
                            twoDimension.spheres[i].position.x =json[i][0];
                            twoDimension.spheres[i].position.y =-json[i][2];
                        }

                    }else{
                        if(intersection.x>230 || intersection.x<-230 ||intersection.y>230 || intersection.y<-230){ return;}
                        twoDimension.selectSphere.position.x = polygon.angleJson[num][0] = parseInt(intersection.x);
                        polygon.angleJson[num][2] = -parseInt(intersection.y);
                        twoDimension.selectSphere.position.y = parseInt(intersection.y);
                    }
                }
                twoDimension.createShape();
                twoDimension.clearTexts();
                twoDimension.createText();
                if(polygon.shape == 2){
                    twoDimension.clearLines();
                    //twoDimension.createLine();
                }
                return;
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
                    polygon.radius = radio;
                    twoDimension.getJson(radio);
                    twoDimension.selectSphere.position.y = -radio;

                }else{
                    if(polygon.isequ){
                        if(sideLength>230){ return;}
                        polygon.radius = sideLength;
                        twoDimension.getJson(sideLength);
                        for(var i=0;i<num1;i++){
                            twoDimension.spheres[i].position.x =json[i][0];
                            twoDimension.spheres[i].position.y =-json[i][2];
                        }
                    }else{
                        if(intersection.x>230 || intersection.x<-230 ||intersection.y>230 || intersection.y<-230){ return;}
                        twoDimension.selectSphere.position.x = polygon.angleJson[num][0] = parseInt(intersection.x);
                        polygon.angleJson[num][2] = -parseInt(intersection.y);
                        twoDimension.selectSphere.position.y = parseInt(intersection.y);
                    }
                }
                twoDimension.createShape();
                twoDimension.clearTexts();
                twoDimension.createText();
                if(polygon.shape == 2){
                    twoDimension.clearLines();
                    //twoDimension.createLine();
                }
                return;
            }
        }

    },
    onDocumentMouseUp:function (){ //鼠标离开obj或者up时的事件，移除透明度
        event.preventDefault();
        if(twoDimension.selectSphere){
            twoDimension.selectSphere.material.opacity = 1;
            threeDimensional.clearGradualMesh();
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
            threeDimensional.clearGradualMesh();
            threeDimensional.repaintMesh();
            twoDimension.selectSphere = null;
        }
    },
    getLocal:function(){
        if(window.localStorage&&localStorage.getItem('prismChange')){
            var text = localStorage.getItem('prismChange');
            var textcopy = JSON.parse(text);
            polygon.angleJson = textcopy.angleJson;
            getParameter.sides = polygon.sides = parseInt(textcopy.sides);
            getParameter.height = polygon.height = parseInt(textcopy.height);
            getParameter.shape = polygon.shape = parseInt(textcopy.shape);
            getParameter.radius = polygon.radius = parseInt(textcopy.radius);
            polygon.isequ = textcopy.isequ;
            polygon.has = textcopy.has;
        }
    },
    repaint:function(){
        scene.remove(twoDimension.shapeG);
        twoDimension.clearSphere();
        twoDimension.clearTexts();
        twoDimension.clearLines();

        twoDimension.createShape();
        twoDimension.createSphere();
        twoDimension.createText();
        if(polygon.shape == 2){
            twoDimension.clearLines();
            //twoDimension.createLine();
        }

    },
    createShape:function(){
        if(twoDimension.shapeG){ scene.remove(twoDimension.shapeG);}

        twoDimension.shapeG=null;
        if(getParameter.sides >= 36){
            //假装呃是一个圆
            var sphereG = new THREE.CircleGeometry(polygon.radius,36);
            var sphereM = new THREE.MeshBasicMaterial({color:'#d3d4d1',transparent:true,opacity:0.9});
            twoDimension.shapeG = new THREE.Mesh(sphereG,sphereM);
            twoDimension.shapeG.position.z = 0;
        }else{
            twoDimension.shapeG = twoDimension.createMesh(new THREE.ShapeGeometry(twoDimension.drawShape()));
        }
        scene.add(twoDimension.shapeG);
    }
};




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



twoDimension.getJson();
twoDimension.createShape();
twoDimension.createSphere();
twoDimension.createText();


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
    gradualMesh:null,
    gradualJson:[],
    getPrismJson:function(){
        totolJson=[];
        var i,num = polygon.sides;
        if(polygon.shape == 1){
            //最后为顶点
            for(i=0;i<num;i++){
                totolJson[i] = polygon.angleJson[i];
            }
            totolJson.push([0,polygon.height,0]);

        }else if(polygon.shape == 2){
            //顶点+下底面+上底面
            totolJson.push([0,2*polygon.height,0]);

            for(i=0;i<num;i++){
                totolJson.push([polygon.angleJson[i][0],polygon.angleJson[i][1],polygon.angleJson[i][2]]);
            }
            for(i=0;i<num;i++){
                totolJson.push([polygon.angleJson[i][0]/2,polygon.height,polygon.angleJson[i][2]/2]);
            }
        }else{
            //下底面+上底面
            for(i=0;i<num;i++){
                totolJson.push([polygon.angleJson[i][0],polygon.height,polygon.angleJson[i][2]]);
            }

        }

    },
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
        if( threeDimensional.lines.length){
            for(var i=0;i< threeDimensional.lines.length;i++){
                sceneT.remove(threeDimensional.lines[i]);
            }
        }
        threeDimensional.lines = [];
        var geometryLine1 = new THREE.Geometry();
        var geometryLine2 = new THREE.Geometry();
        var geometryLine3 = new THREE.Geometry();
        var vertices1 =[];
        var vertices2 =[];
        var vertices3 =[];
        var lineMesh=null;
        var json1=totolJson;
        var num = polygon.sides,i,json2=[];

        if(countTime){
            var shape = changeShape;
        }else{
            shape = polygon.shape;
        }

        if(shape == 1){
            if(num>=36){
                for(i=0;i<num;i++){
                    vertices2.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
                }
                vertices2.push(new THREE.Vector3(json1[0][0],json1[0][1],json1[0][2]));
            }else{
                for(i=0;i<num;i++){
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
                    lineMesh = new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: '#F39800'}));
                    sceneT.add(lineMesh);
                    threeDimensional.lines.push(lineMesh);
                }
            }
            geometryLine2.vertices = vertices2;
            lineMesh = new THREE.Line(geometryLine2, new THREE.LineBasicMaterial({color: '#F39800'}));
            sceneT.add(lineMesh);
            threeDimensional.lines.push(lineMesh);
            return threeDimensional.lines;
        }else if(shape == 2){
            if(num>=36){
                for(i=1;i<num+1;i++){
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

        }else {

            if (num >= 36) {
                threeDimensional.getPrismJson();
                json1 = polygon.angleJson;
                json2 = totolJson;
                for (i = 0; i < num + 1; i++) {
                    if (i < num) {
                        vertices1.push(new THREE.Vector3(json1[i][0], json1[i][1], json1[i][2]));
                        vertices2.push(new THREE.Vector3(json2[i][0], json2[i][1], json2[i][2]));
                    } else {
                        vertices1.push(new THREE.Vector3(json1[0][0], json1[0][1], json1[0][2]));
                        vertices2.push(new THREE.Vector3(json2[0][0], json2[0][1], json2[0][2]));
                    }
                }
            } else {
                json1 = polygon.angleJson;
                json2 = totolJson;
                vertices3 = [];
                for (i = 0; i < num + 1; i++) {
                    if (i < num) {
                        vertices1.push(new THREE.Vector3(json1[i][0], json1[i][1], json1[i][2]));
                        vertices2.push(new THREE.Vector3(json2[i][0], json2[i][1], json2[i][2]));
                        if (i % 2 == 0) {
                            vertices3.push(new THREE.Vector3(json1[i][0], json1[i][1], json1[i][2]));
                            vertices3.push(new THREE.Vector3(json2[i][0], json2[i][1], json2[i][2]));
                        } else {
                            vertices3.push(new THREE.Vector3(json2[i][0], json2[i][1], json2[i][2]));
                            vertices3.push(new THREE.Vector3(json1[i][0], json1[i][1], json1[i][2]));
                        }
                    } else {
                        vertices1.push(new THREE.Vector3(json1[0][0], json1[0][1], json1[0][2]));
                        vertices2.push(new THREE.Vector3(json2[0][0], json2[0][1], json2[0][2]));
                    }
                    geometryLine3.vertices = vertices3;
                    lineMesh = new THREE.LineSegments(geometryLine3, new THREE.LineBasicMaterial({color: '#F39800'}));
                    sceneT.add(lineMesh);
                    threeDimensional.lines.push(lineMesh);
                }
            }
            geometryLine1.vertices = vertices1;
            geometryLine2.vertices = vertices2;
            lineMesh = new THREE.Line(geometryLine1, new THREE.LineBasicMaterial({color: '#F39800'}));
            sceneT.add(lineMesh);
            threeDimensional.lines.push(lineMesh);
            lineMesh = new THREE.Line(geometryLine2, new THREE.LineBasicMaterial({color: '#F39800'}));
            sceneT.add(lineMesh);
            threeDimensional.lines.push(lineMesh);
            return threeDimensional.lines;
        }
    },
    createTextMesh:function(){
        if(!axisFlag){ return;}
        if(threeDimensional.textMesh.length){
            for(var i=0;i<threeDimensional.textMesh.length;i++){
                sceneT.remove(threeDimensional.textMesh[i]);
            }
        }
        threeDimensional.textMesh=[];
        var num = totolJson.length;
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '12px Cambria Math', fillStyle: '#000', antialias: true};
        var v3=[],text=null,x,y;
        if(polygon.sides>=36){
            if(polygon.shape == 1){
                v3 = totolJson[num-1];
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
            return;}

        var startnum = 0;
        if(countTime || (polygon.shape == 2 && !countTime)){
            startnum=1;
        }

        for(i=startnum;i<num;i++){
            v3 = totolJson[i];
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
        // return;
        // if(polygon.shape == 3 && !countTime){
        //     for(i=0;i<num;i++){
        //         v3 = polygon.angleJson[i];
        //         text = new SpriteText2D(v3[0] + ","  + v3[1]+","  + v3[2], textStyle);
        //         if(v3[1]>0){
        //             text.position.set((v3[0]+5), (v3[1]+25), (v3[2]+5));
        //         }else{
        //             if(v3[0] < 0){ x= v3[0]-20;}else{ x= v3[0]+20;}
        //             if(v3[2] < 0){ y= v3[2]-20;}else{ y= v3[2]+20;}
        //             text.position.set(x, v3[1], y);
        //         }
        //         sceneT.add(text);
        //         threeDimensional.textMesh.push(text);
        //     }
        // }

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
        threeDimensional.getPrismJson();
        if(threeDimensional.mesh){
            sceneT.remove(threeDimensional.mesh);
        }
        // threeDimensional.createFaceMesh();
        if(polygon.shape == 2 && polygon.sides<36){
            //threeDimensional.createExtend();
        }else if(threeDimensional.extend.length>0){
            for(var i=0;i<threeDimensional.extend.length;i++){
                sceneT.remove(threeDimensional.extend[i]);
            }

        }
        
            threeDimensional.createFaceMesh();
        
        
    },
    createPrismVertices:function (){ //创建点
        threeDimensional.vertices = [];
        var json1 =totolJson,i,num=json1.length;

        if(countTime){
            var shape = changeShape;
        }else{
            shape = polygon.shape;
        }

        if(shape == 1){
            for(i=0;i<num;i++){
                threeDimensional.vertices.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
            }
        }else if(shape == 2){
            for(i=0;i<num;i++){
                threeDimensional.vertices.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
            }
        }else{
            json1 = polygon.angleJson;
            var json2 = totolJson;
            for(i=0;i<num;i++){
                threeDimensional.vertices.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
                threeDimensional.vertices.push(new THREE.Vector3(json2[i][0],json2[i][1],json2[i][2]));
            }
        }
    },
    createPrismFaces:function(){ //创建面
        var faces = [];
        var num = polygon.sides,i;

        if(countTime){
            var shape = changeShape;
        }else{
            shape = polygon.shape;
        }

        if(shape == 1){
            var peak = polygon.sides;
            for(i=0;i<peak-1;i++){
                faces.push(new THREE.Face3(peak, i, i+1));
                faces.push(new THREE.Face3( i+1, i,peak));
            }
            faces.push(new THREE.Face3(peak, 0, peak-1));
            for(i=0;i<(peak-2);i++){
                faces.push( new THREE.Face3(0,i+1,i+2));
                faces.push( new THREE.Face3(i+2,i+1,0));
            }
            return faces;
        }else if(shape == 2){

            for(i=1;i<num;i++){
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


        }else{
            if(num ==3){
                faces.push( new THREE.Face3(0,2,4));
                faces.push( new THREE.Face3(1,3,5));
                faces.push( new THREE.Face3(0,2,1));
                faces.push( new THREE.Face3(1,2,3));
                faces.push( new THREE.Face3(2,3,4));
                faces.push( new THREE.Face3(3,5,4));
                faces.push( new THREE.Face3(4,5,0));
                faces.push( new THREE.Face3(0,5,1));
            }else{
                for( i=0;i<(num-1)*2;){
                    faces.push(new THREE.Face3(i+2, i, i+1));
                    faces.push(new THREE.Face3( i+2,i+1, i+3));
                    faces.push(new THREE.Face3(i+1, i, i+2));
                    faces.push(new THREE.Face3(i+3, i+1, i+2));
                    i=i+2;
                }
                faces.push( new THREE.Face3(0,  threeDimensional.vertices.length-1,1));
                faces.push( new THREE.Face3(0, threeDimensional.vertices.length-2, threeDimensional.vertices.length-1));
                faces.push( new THREE.Face3(1,  threeDimensional.vertices.length-1,0));
                faces.push( new THREE.Face3(threeDimensional.vertices.length-1, threeDimensional.vertices.length-2, 0));
                for( i=0;i<(num-2);i++){
                    faces.push( new THREE.Face3(1,(i+1)*2+1,(i+2)*2+1));
                    //console.log(1,(i+1)*2+1,(i+2)*2+1);
                    //faces.push( new THREE.Face3(0,(i+1)*2,(i+2)*2));
                    //console.log(0,(i+1)*2,(i+2)*2);
                    // faces.push( new THREE.Face3((i+2)*2+1,(i+1)*2+1,1));
                    faces.push( new THREE.Face3((i+2)*2,(i+1)*2,0));
                }
            }
            return faces;
        }

    },
    createFaceMesh:function(){//三维图形
        var geomM=null,geomG=null,faces = null,geom=null;
        if(polygon.sides >=36){
            var radius1 =0 ,radius2=polygon.radius,height=polygon.height;

            if(polygon.shape == 1){
                radius1 = 0;

            }else if(polygon.shape == 2){
                radius1 = polygon.radius/2;
                height=polygon.height;
            }else{
                radius1 = polygon.radius;
            }

            geomG = new THREE.CylinderGeometry(radius1,radius2,height,36,36);
            geomM = new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.3,transparent:true,side:THREE.DoubleSide});
            threeDimensional.mesh = new THREE.Mesh(geomG,geomM);
            threeDimensional.mesh.position.y = height/2;
            sceneT.add(threeDimensional.mesh);
            if(axisFlag){
                threeDimensional.createTextMesh();
            }
            threeDimensional.createLine();
            return;
        }
        threeDimensional.createPrismVertices();
        faces = threeDimensional.createPrismFaces();
        geom = new THREE.Geometry();
        geom.vertices = threeDimensional.vertices;
        geom.faces = faces;
        geom.computeFaceNormals();
        var materials = [
            new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.3,transparent:true})
        ];
        threeDimensional.mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials);
        sceneT.add(threeDimensional.mesh);
        if(axisFlag){
            threeDimensional.createTextMesh();
        }
        threeDimensional.createLine();
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
        threeDimensional.getPrismJson();
        threeDimensional.createFaceMesh();
        threeDimensional.createTextMesh();
        //if(polygon.shape !== 2){ return;}
        //threeDimensional.createExtend();
    },
    createExtend:function(){
        var num = polygon.sides;
        if(num >= 36 || !axisFlag || polygon.shape!=2){ return; }
        if(threeDimensional.extend.length>0){
            for(var i=0;i<threeDimensional.extend.length;i++){
                sceneT.remove(threeDimensional.extend[i]);
            }

        }
        var geometryLine1 = new THREE.Geometry();
        var vertices1 =[],lineMesh=null;
        var v3 = totolJson[0];
        for(i=num+1;i<num*2+1;i++){
            vertices1.push(new THREE.Vector3(v3[0],v3[1],v3[2]));
            vertices1.push(new THREE.Vector3(totolJson[i][0],totolJson[i][1],totolJson[i][2]));
            geometryLine1.vertices = vertices1;
            geometryLine1.computeLineDistances();
            lineMesh = new THREE.Line(geometryLine1, new THREE.LineDashedMaterial({color: '#999999'}));
            sceneT.add(lineMesh);
            threeDimensional.extend.push(lineMesh);
        }
    },
    dynamicCreate:function(){
        if(countTime>=50){
            cancelAnimationFrame(timing);
            timing=null;
            setTimeout(function(){
                countTime=0;
                oldshape = polygon.shape;
            },50);
            return;
        }
        if(countTime==1){
            if(threeDimensional.mesh!=undefined){
                sceneT.remove(threeDimensional.mesh);
                threeDimensional.mesh=null;
            }
        }
        countTime++;
        threeDimensional.dynamicCreateMesh();
        timing = requestAnimationFrame(threeDimensional.dynamicCreate);
    },
    dynamicCreateMesh:function(){
        var nowshape = polygon.shape;
        var num = polygon.sides;
        var json = polygon.angleJson;
        var oldHeight = polygon.height;
        var geom=null,height,ratio,height1,radius1,radius2=polygon.radius;
        totolJson=[];

        threeDimensional.clearGradualMesh();
        if(oldshape == 1){
            if(nowshape==2){
                //棱锥变棱台
                changeShape=2;
                height = oldHeight/2+ (50-countTime)*oldHeight/100;
                ratio = (oldHeight - height)/oldHeight;

                //顶点+下底面+上底面
                totolJson.push([0,2*oldHeight,0]);

                for(var i=0;i<num;i++){
                    totolJson.push([json[i][0],polygon.angleJson[i][1],json[i][2]]);
                }
                for(i=0;i<num;i++){
                    totolJson.push([json[i][0]*ratio,oldHeight,json[i][2]*ratio]);
                }

                if(num >=36){
                    radius1 = countTime*radius2/100;
                    height = oldHeight;
                }

            }else{
                //棱锥变棱柱
                changeShape=2;
                height = oldHeight;
                ratio = countTime/50;

                //顶点+下底面+上底面
                totolJson.push([0,polygon.height,0]);

                for(i=0;i<num;i++){
                    totolJson.push([json[i][0],0,json[i][2]]);
                }
                for(i=0;i<num;i++){
                    totolJson.push([json[i][0]*ratio,height,json[i][2]*ratio]);
                }



                if(num >=36){
                    height=polygon.height;

                    radius1 = countTime*radius2/50;

                }else{
                    if(threeDimensional.extend.length>0){
                        sceneT.remove(threeDimensional.extend[i]);
                    }
                    threeDimensional.extend = [];
                }

            }
        }else if(oldshape == 2){
            if(nowshape==1){
                //棱台边棱锥

                changeShape=2;
                height = oldHeight/2+ countTime*oldHeight/100;
                ratio = (oldHeight - height)/oldHeight;

                //顶点+下底面+上底面
                totolJson.push([0,polygon.height,0]);

                for(i=0;i<num;i++){
                    totolJson.push([json[i][0],polygon.angleJson[i][1],json[i][2]]);
                }
                for(i=0;i<num;i++){
                    totolJson.push([json[i][0]*ratio,oldHeight,json[i][2]*ratio]);
                }


                if(num >=36){
                    radius1 = radius2/2 -countTime*radius2/100;
                    height = oldHeight;

                }else{
                    //threeDimensional.createExtend();
                }

            }else{
                //棱台边棱柱

                changeShape=2;
                height = oldHeight/2 + countTime*oldHeight/100;
                ratio = height/oldHeight;

                //顶点+下底面+上底面
                totolJson.push([0,polygon.height,0]);

                for(i=0;i<num;i++){
                    totolJson.push([json[i][0],0,json[i][2]]);
                }
                for(i=0;i<num;i++){
                    totolJson.push([json[i][0]*ratio,oldHeight,json[i][2]*ratio]);
                }

                if(num >=36){

                    radius1 = radius2/2 +countTime*radius2/100;
                    height = oldHeight;

                }


            }
        }else if(oldshape == 3){
            if(nowshape == 1){
                //棱柱变棱锥

                changeShape=2;
                height = oldHeight;
                ratio = (50-countTime)/50;

                //顶点+下底面+上底面
                totolJson.push([0,polygon.height,0]);

                for(i=0;i<num;i++){
                    totolJson.push([json[i][0],0,json[i][2]]);
                }
                for(i=0;i<num;i++){
                    totolJson.push([json[i][0]*ratio,height,json[i][2]*ratio]);
                }


                if(num >=36){
                    radius1 = (50-countTime)*radius2/50;
                }else{
                    //threeDimensional.createExtend();
                }

            }else{
                //棱柱变棱台

                changeShape=2;
                height = oldHeight/2 + (50-countTime)*oldHeight/100;
                ratio = height/oldHeight;

                //顶点+下底面+上底面
                totolJson.push([0,polygon.height,0]);

                for(i=0;i<num;i++){
                    totolJson.push([json[i][0],0,json[i][2]]);
                }
                for(i=0;i<num;i++){
                    totolJson.push([json[i][0]*ratio,oldHeight,json[i][2]*ratio]);
                }

                if(num >=36){
                    radius1 = (50-countTime)*radius2/100 + radius2/2;
                    height = oldHeight;
                }

            }
        }

        if(num<36){
            threeDimensional.createPrismVertices();
            geom = new THREE.Geometry();
            geom.vertices = threeDimensional.vertices;
            geom.faces = threeDimensional.createPrismFaces();
            geom.computeFaceNormals();
            var materials = [
                new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.3,transparent:true})
            ];
            threeDimensional.gradualMesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials);

            sceneT.add(threeDimensional.gradualMesh);

            threeDimensional.createLine();
            threeDimensional.createTextMesh();

            if(threeDimensional.extend.length>0){
                for(var i=0;i<threeDimensional.extend.length;i++){
                    sceneT.remove(threeDimensional.extend[i]);
                }

            }
            threeDimensional.extend = [];
        }else{

            var geomG = new THREE.CylinderGeometry(radius1,radius2,height,100,100);
            var geomM = new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.3,transparent:true,side:THREE.DoubleSide});
            threeDimensional.gradualMesh = new THREE.Mesh(geomG,geomM);
            threeDimensional.gradualMesh.position.y = height/2;
            sceneT.add(threeDimensional.gradualMesh);
            if(axisFlag){
                threeDimensional.createTextMesh();
            }
            threeDimensional.createLine();

        }
    },
    clearGradualMesh:function(){
        if(threeDimensional.gradualMesh!= undefined){
            sceneT.remove(threeDimensional.gradualMesh);
            threeDimensional.gradualMesh=null;
        }
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
    if(countTime){ deleteAnimate(); }
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
    threeDimensional.clearGradualMesh();

    polygon.sides = getParameter.sides;
    twoDimension.getJson(polygon.radius);
    twoDimension.repaint();
    threeDimensional.repaintMesh();


});

$('#slider2').change(function(){
    if(countTime){ deleteAnimate(); }
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;
    value = value<1?1:value;
    if(value==0){
        value=0.05;
    }
    getParameter.height =value;
    threeDimensional.repaintMesh();
    polygon.height = getParameter.height;
    threeDimensional.clearGradualMesh();
    polygon.height = getParameter.height;
    threeDimensional.repaintMesh();

});

$('#slider3').change(function(){

    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;

    if(polygon.sidesnum >= 36){
        polygon.inclination = getParameter.inclination = 0;
    }

    getParameter.inclination = value;
    threeDimensional.repaintMesh();
    polygon.inclination =getParameter.inclination;

    $('.radios').find('.radiocircle').removeClass('select');
    $('.radios2').find('.radiocircle').addClass('select');

});



function deleteAnimate(){
    clearTimeout(timing);
    timing=0;
    countTime=0;
    oldshape = polygon.shape;
}

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
    deleteAnimate();

    getParameter ={ //显示和改变参数
        sides:4,
        height:100, //选择高度
        shape:1,
        clear:5
    };
    polygon = { //多边形参数
        sides:4,
        angleJson : [],
        height:100, //棱锥高度
        clear:5,
        shape:1,
        radius:100,
        isequ:true
    };

    threeDimensional.clearGradualMesh();
    oldshape = 1;





    $('.radios').find('.radiocircle').removeClass('select');
    $('.radios1').find('.radiocircle').addClass('select');

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

    twoDimension.getJson(polygon.radius);
    twoDimension.repaint();
    threeDimensional.repaintMesh();
}
function radiosEve(){
    var dataId = parseInt($(this).attr('data-Id'));

    if($(this).find('.radiocircle ').hasClass('select')){
        return;
    }

    $(this).siblings().find('.radiocircle ').removeClass('select');
    $(this).find('.radiocircle').addClass('select');



    switch (dataId){
        case 1:
            getParameter.shape = 1;
            polygon.shape = getParameter.shape;
            threeDimensional.dynamicCreate();
            break;
        case 2:
            getParameter.shape = 2;
            polygon.shape = getParameter.shape;
            threeDimensional.dynamicCreate();
            break;
        case 3:
            getParameter.shape = 3;
            polygon.shape = getParameter.shape;
            threeDimensional.dynamicCreate();
            break;
        case 4:
            polygon.isequ = true;
            twoDimension.getJson();
            twoDimension.repaint();
            threeDimensional.repaintMesh();break;
        case 5:
            polygon.isequ = false;
            threeDimensional.repaintMesh();break;
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

