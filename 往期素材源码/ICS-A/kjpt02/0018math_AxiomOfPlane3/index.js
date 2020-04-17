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
        var marginTop = ($body.width()/bodyWidth*bodyHeight-1200)/2;
        $('.body').css("margin-top",'-600px');
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
$(".con").css("margin-top",marginTop);



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
     threeWidth= $obj.width();


var a=null;
var grid = true,dynamic = false;


var getParameter = {
    angleJson:[],
    length:0,
    line1x:0,
    line2x:0
};
var oriParameter = {
    length:0
};

var threeDimension = {
    init:function(){
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.getJson();
        threeDimension.createGrid();
        threeDimension.createLine1();
        threeDimension.createLine2();
        threeDimension.createSphere();
        threeDimension.createPlane();

    },
    createScene:function(){
        threeDimension.scene = new THREE.Scene();
        threeDimension.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
        threeDimension.camera.position.x = 1200;
        threeDimension.camera.position.y = 1200;
        threeDimension.camera.position.z = 1200;
        threeDimension.camera.lookAt(threeDimension.scene.position);
        threeDimension.scene.add(threeDimension.camera);
        threeDimension.renderer = null;
        if(canWebgl){
            threeDimension.renderer = new THREE.WebGLRenderer({antialias:true});
        }else{
            threeDimension.renderer = new THREE.CanvasRenderer();
        }
        threeDimension.renderer.setPixelRatio( window.devicePixelRatio );
        threeDimension.renderer.setClearColor(0xffffff);
        threeDimension.renderer.setSize(threeWidth,threeHeight);
        $obj.append(threeDimension.renderer.domElement);
    },
    createControls:function(){
        threeDimension.controls = new THREE.OrbitControls( threeDimension.camera, threeDimension.renderer.domElement );
        threeDimension.controls.enableDamping = true;
        threeDimension.controls.dampingFactor = 0.25;
        threeDimension.controls.enableZoom = true;
    },
    vec3:function(x,y,z){
        return new THREE.Vector3(x, y, z);
    },
    createGrid:function (){
        if(threeDimension.grid){
            threeDimension.scene.remove(threeDimension.grid);
        }
        threeDimension.grid = new THREE.Object3D();
        var geometry = new THREE.Geometry();
        var size=500, bottom = - 0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( {color : 0x949494, transparent: true, opacity: 0.8} );
        for(var i = 0;i < 21;i ++){
            geometry.vertices.push( threeDimension.vec3( - size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, size ) );
        }
        var grid = new THREE.Line( geometry, lineMaterial,1 );
        var text = threeDimension.createText("α",-420,25,420,"#000000");

        threeDimension.grid.add(grid,text);
        threeDimension.scene.add(threeDimension.grid);
    },
    createText:function(texts,x,y,z,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '23px Cambria Math', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x,y,z);
        return text;
    },
    getJson:function(){
        getParameter.angleJson = [];
        getParameter.angleJson.push([0,0,0],[0,0,0],[500,350,0],[-500,350,0]);
    },

    createPlane:function(){
        if(threeDimension.plane){
            threeDimension.scene.remove(threeDimension.plane);
        }
        if(threeDimension.planeText){
            threeDimension.scene.remove(threeDimension.planeText);
        }
        var json = getParameter.angleJson;
        var geom = new THREE.Geometry();
        for(var i=0;i<4;i++){
            geom.vertices.push(threeDimension.vec3(json[i][0],json[i][1],json[i][2]));
        }
        geom.faces.push(new THREE.Face3(0,1,2));
        geom.faces.push(new THREE.Face3(2,1,0));
        geom.faces.push(new THREE.Face3(0,3,2));
        geom.faces.push(new THREE.Face3(2,3,0));
        geom.computeFaceNormals();
        var materials = [new THREE.MeshBasicMaterial({color:'#80c5f4',opacity:0.5,transparent:true})];
        threeDimension.plane = new THREE.SceneUtils.createMultiMaterialObject(geom,materials);

        threeDimension.planeText = threeDimension.createText("β",json[3][0]+80,330,json[3][2]+20,"#000000");
        threeDimension.scene.add(threeDimension.plane,threeDimension.planeText);
    },
    createLine:function(length,color){
        var line = new THREE.Object3D();
        var l = 3;
        var material = new THREE.MeshBasicMaterial({color:color, side:THREE.DoubleSide, transparent:true,opacity:0.9});
        var plane1 = new THREE.PlaneGeometry(length,l);
        var mesh1 = new THREE.Mesh(plane1,material);
        mesh1.position.z = -l/2;

        var plane2 = new THREE.PlaneGeometry(length,l);
        var mesh2 = new THREE.Mesh(plane2,material);
        mesh2.position.z = l/2;

        var plane3 = new THREE.PlaneGeometry(length,l);
        var mesh3 = new THREE.Mesh(plane3,material);
        mesh3.rotation.x = Math.PI/2;
        mesh3.position.y = l/2;

        var plane4 = new THREE.PlaneGeometry(length,l);
        var mesh4 = new THREE.Mesh(plane4,material);
        mesh4.rotation.x = Math.PI/2;
        mesh4.position.y = -l/2;

        line.add(mesh1,mesh2,mesh3,mesh4);
        return line;
    },
    createLine1:function(){
        if(threeDimension.line1){
            threeDimension.scene.remove(threeDimension.line1);
        }
        var json = getParameter.angleJson;
        threeDimension.line1 = threeDimension.createLine(getParameter.length,'#1161c8');
        threeDimension.line1.position.x = getParameter.length/2 + getParameter.line1x;
        threeDimension.line1.position.z = json[0][2];
        threeDimension.scene.add(threeDimension.line1);
    },
    createLine2:function(){
        if(threeDimension.line2){
            threeDimension.scene.remove(threeDimension.line2);
        }
        var json = getParameter.angleJson;
        threeDimension.line2 = threeDimension.createLine(getParameter.length,'#1161c8');
        threeDimension.line2.position.x = -getParameter.length/2 + getParameter.line2x;
        threeDimension.line2.position.z = json[0][2];
        threeDimension.scene.add(threeDimension.line2);
    },
    createSphere:function(){
        var material = new THREE.MeshBasicMaterial({color:'#c4dca0', transparent:true, opacity:0.9});
        var sphGeo = new THREE.SphereGeometry(16,36,36);
        threeDimension.sph = new THREE.Mesh(sphGeo,material);
        threeDimension.scene.add(threeDimension.sph);
    },
    dynamical:function(){
        var n=0;
        function open(){
            if(n>49){
                clearInterval(a);
                return;
            }
            getParameter.angleJson[0][0] -= 10;
            getParameter.angleJson[1][0] += 10;
            getParameter.length += 10;
            threeDimension.createLine1();
            threeDimension.createLine2();
            threeDimension.createPlane();
            n++;
        }
        a = setInterval(open,50);
    },
    onDocumentMouseDown:function(event){
        event.preventDefault();
        var mouse={},position={x:0,y:0};
        if(fullScreen){
            position.x =(bodyWidth-threeWidth)/2;
            position.y =(bodyHeight-threeHeight)/2;
        }else{
            position.x =offsetLeft;
            position.y =offsetTop;
        }
        mouse.x = ((event.clientX-position.x) / threeWidth ) * 2 - 1;
        mouse.y = -( (event.clientY-position.y) / threeHeight ) * 2 + 1;
        raycaster.setFromCamera(mouse, threeDimension.camera);
        var intersects = raycaster.intersectObject(threeDimension.sph);
        if (intersects.length > 0) {
            threeDimension.selectSphere = intersects[0].object;
            intersects[0].object.material.transparent = true;
            intersects[0].object.material.opacity = 0.6;
            threeDimension.controls.enabled = false;
        }
    },
    onDocumentMouseMove:function (event) { //鼠标移动事件，坐标转换
        event.preventDefault();
        var mouse={},position={x:0,y:0};
        if(fullScreen){
            position.x =(bodyWidth-threeWidth)/2;
            position.y =(bodyHeight-threeHeight)/2;
        }else{
            position.x =offsetLeft;
            position.y =offsetTop;
        }
        mouse.x = ((event.clientX-position.x) / threeWidth ) * 2 - 1;
        mouse.y = -( (event.clientY-position.y) / threeHeight ) * 2 + 1;

        var intersects = raycaster.intersectObject( threeDimension.sph );
        raycaster.setFromCamera( mouse, threeDimension.camera );
        if ( intersects.length > 0 ) {
            plane.setFromNormalAndCoplanarPoint(threeDimension.camera.getWorldDirection( plane.normal ),intersects[0].object.position );
        }

        if(threeDimension.selectSphere){
            if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                if(Math.abs(intersection.x)>500 || Math.abs(intersection.z)>500){
                    return;
                }
                if(dynamic){
                    for(var i=0;i<2;i++){
                        getParameter.angleJson[i][2] = intersection.z;
                        getParameter.angleJson[i+2][2] = intersection.z;
                    }
                    getParameter.angleJson[0][0] = intersection.x - 500;
                    getParameter.angleJson[1][0] = intersection.x + 500;
                }else{
                    for(i=0;i<2;i++){
                        getParameter.angleJson[i][0] = intersection.x;
                        getParameter.angleJson[i][2] = intersection.z;
                        getParameter.angleJson[i+2][2] = intersection.z;
                    }
                }
                getParameter.angleJson[2][0] = intersection.x + 500;
                getParameter.angleJson[3][0] = intersection.x - 500;
                threeDimension.createPlane();
                threeDimension.sph.position.set(intersection.x,0,intersection.z);
                getParameter.line1x = intersection.x;
                getParameter.line2x = intersection.x;
                threeDimension.createLine1();
                threeDimension.createLine2();
            }
        }

    },
    onDocumentMouseUp:function (event){ //鼠标离开obj或者up时的事件，移除透明度
        event.preventDefault();
        if(threeDimension.selectSphere){
            threeDimension.selectSphere.material.opacity = 0.9;
        }
        threeDimension.selectSphere = null;
        threeDimension.controls.enabled = true;
    },
    onDocumentTouchStart:function(event){
        event.preventDefault();
        if (event.touches.length === 1) {
            var mouse={},position={x:0,y:0};
            if(fullScreen){
                position.x =(bodyWidth-threeWidth)/2;
                position.y =(bodyHeight-threeHeight)/2;
            }else{
                position.x =offsetLeft;
                position.y =offsetTop;
            }
            mouse.x = ((event.touches[0].pageX-position.x) / threeWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-position.y) / threeHeight ) * 2 + 1;
            raycaster.setFromCamera(mouse, threeDimension.camera);
            var intersects = raycaster.intersectObject(threeDimension.sph);
            if (intersects.length > 0) {
                threeDimension.selectSphere = intersects[0].object;
                intersects[0].object.material.transparent = true;
                intersects[0].object.material.opacity = 0.6;
                threeDimension.controls.enabled = false;
            }
        }
    },
    onDocumentTouchMove:function (event) { //鼠标移动事件，坐标转换
        event.preventDefault();
        if (event.touches.length === 1) {
            var mouse={},position={x:0,y:0};
            if(fullScreen){
                position.x =(bodyWidth-threeWidth)/2;
                position.y =(bodyHeight-threeHeight)/2;
            }else{
                position.x =offsetLeft;
                position.y =offsetTop;
            }
            mouse.x = ((event.touches[0].pageX-position.x) / threeWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-position.y) / threeHeight ) * 2 + 1;

            var intersects = raycaster.intersectObject( threeDimension.sph );
            raycaster.setFromCamera( mouse, threeDimension.camera );
            if ( intersects.length > 0 ) {
                plane.setFromNormalAndCoplanarPoint(threeDimension.camera.getWorldDirection( plane.normal ),intersects[0].object.position );
            }

            if(threeDimension.selectSphere){
                if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                    if(Math.abs(intersection.x)>500 || Math.abs(intersection.z)>500){
                        return;
                    }
                    if(dynamic){
                        for(var i=0;i<2;i++){
                            getParameter.angleJson[i][2] = intersection.z;
                            getParameter.angleJson[i+2][2] = intersection.z;
                        }
                        getParameter.angleJson[0][0] = intersection.x - 500;
                        getParameter.angleJson[1][0] = intersection.x + 500;
                    }else{
                        for(i=0;i<2;i++){
                            getParameter.angleJson[i][0] = intersection.x;
                            getParameter.angleJson[i][2] = intersection.z;
                            getParameter.angleJson[i+2][2] = intersection.z;
                        }
                    }
                    getParameter.angleJson[2][0] = intersection.x + 500;
                    getParameter.angleJson[3][0] = intersection.x - 500;
                    threeDimension.createPlane();
                    threeDimension.sph.position.set(intersection.x,0,intersection.z);
                    getParameter.line1x = intersection.x;
                    getParameter.line2x = intersection.x;
                    threeDimension.createLine1();
                    threeDimension.createLine2();
                }
            }
        }
    },
    onDocumentTouchEnd:function (event){ //鼠标离开obj或者up时的事件，移除透明度
        event.preventDefault();
        if(threeDimension.selectSphere){
            threeDimension.selectSphere.material.opacity = 0.9;
        }
        threeDimension.selectSphere = null;
        threeDimension.controls.enabled = true;
    }

};
threeDimension.init();


//重置事件
function renderAll(){
    threeDimension.controls.update();

    requestAnimationFrame(renderAll);
    threeDimension.renderer.render(threeDimension.scene,threeDimension.camera);
}
renderAll();

//鼠标点击，选中顶点
threeDimension.renderer.domElement.addEventListener( 'mousedown', threeDimension.onDocumentMouseDown, false );
threeDimension.renderer.domElement.addEventListener( 'mouseup', threeDimension.onDocumentMouseUp, false );
threeDimension.renderer.domElement.addEventListener( 'mousemove', threeDimension.onDocumentMouseMove, false );
threeDimension.renderer.domElement.addEventListener( 'touchstart', threeDimension.onDocumentTouchStart, false );
threeDimension.renderer.domElement.addEventListener( 'touchmove', threeDimension.onDocumentTouchMove, false );
threeDimension.renderer.domElement.addEventListener( 'touchend', threeDimension.onDocumentTouchEnd, false );

var checked =true;
//on/off事件
function clickEve1(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
        dynamic = false;
        var json1 = getParameter.angleJson[0][0];
        var json2 = getParameter.angleJson[1][0];
        for(var i=0;i<2;i++){
            getParameter.angleJson[i][0] = (json1+json2)/2;
        }
        reset();
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
        $(this).parent().parent().siblings().find('.span2').text('' +'off');
        dynamic = true;
        threeDimension.dynamical();
    }
    
}



function reset(){


    clearInterval(a);

    getParameter.length = 0;

    threeDimension.createLine1();
    threeDimension.createLine2();
    threeDimension.createPlane();
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
    dynamic = getParameter.checked1 = false;
    threeDimension.camera.position.set(1200,1200,1200);
    threeDimension.getJson();
    getParameter.line1x = 0;
    getParameter.line2x = 0;
    threeDimension.sph.position.set(0,0,0);
    reset();

    $('.turn1').removeClass('on').addClass('off');
    $('.turn1').find('.span2').text('' +'off');
}

if(!isMob){
    $('#scale').on('click',fullEve);
    $('#renew').on('click',renewEve);
    $('#div1').on('click',clickEve1);
}else{
    $('#scale').on('touchstart',fullEve);
    $('#renew').on('touchstart',renewEve);
    $('#div1').on('touchstart',clickEve1);
}




