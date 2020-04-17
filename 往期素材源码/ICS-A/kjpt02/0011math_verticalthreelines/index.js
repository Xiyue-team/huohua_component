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
    threeWidth = $obj.width();


//初始全局变量
var a1=null,a2=null,b1=null,b2=null,c1=null,c2=null,d1=null,d2=null,e1=null,e2=null,f1=null,f2=null;
var moved=false,length = 5,timg=0,PA = null,OA=null,PO=null;



function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var thiz = this;



    var json = [[0,0,0],[-300,500,300],[-300,0,300],[-500,0,500],[-300,0,-400],[400,0,300]]; //A点、P点、O点、延伸点、l线两点
    var line=null,pointA =null,pointP=null,pointO=null,pointface=null,pointl,gradualLine = null;



    var grid=null;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
    this.renderer = null;
    if(canWebgl){
        this.renderer = new THREE.WebGLRenderer({antialias:true});
    }else{
        this.renderer = new THREE.CanvasRenderer();
    }
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.controls = null;


    this.int = function () {
        this.camera.position.x = 1500;
        this.camera.position.y = 1500;
        this.camera.position.z = 1500;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
        this.createGrid();

        var vertices = [];
        vertices.push(new THREE.Vector3(json[0][0],json[0][1],json[0][2]));
        vertices.push(new THREE.Vector3(json[1][0],json[1][1],json[1][2]));
        PA = this.createLineMesh(vertices,'#f5a92a');
        this.scene.add(PA);

        vertices = [];
        vertices.push(new THREE.Vector3(json[0][0],json[0][1],json[0][2]));
        vertices.push(new THREE.Vector3(json[3][0],json[3][1],json[3][2]));
        OA = this.createLineMesh(vertices,'blue');
        this.scene.add(OA);

        vertices = [];
        vertices.push(new THREE.Vector3(json[1][0],json[1][1],json[1][2]));
        vertices.push(new THREE.Vector3(json[2][0],json[2][1],json[2][2]));
        PO = this.createLineMesh(vertices,'#666',1);
        this.scene.add(PO);

        vertices = [];
        vertices.push(new THREE.Vector3(json[4][0],json[4][1],json[4][2]));
        vertices.push(new THREE.Vector3(json[5][0],json[5][1],json[5][2]));
        line = this.createLineMesh(vertices,'#f5a92a');
        this.scene.add(line);
        line.position.x = 3;

        pointA = this.createText('A',[json[0][0],json[0][1],json[0][2]],'#000');
        this.scene.add(pointA);

        pointP = this.createText('P',[json[1][0],json[1][1],json[1][2]],'#000');
        this.scene.add(pointP);

        pointO = this.createText('O',[json[2][0],json[2][1],json[2][2]],'#000');
        this.scene.add(pointO);

        pointface = this.createText('a',[-6,0,6],'#000');
        this.scene.add(pointface);

        pointl = this.createText('l',[(json[4][0]+json[5][0])/2,(json[4][1]+json[5][1])/2,(json[4][2]+json[5][2])/2],'#000');
        this.scene.add(pointl);
        pointl.position.x +=3.5;

        this.linesHide();


    };
    this.objStyle = function (color, fontsize) {
        return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
    };
    this.createLineMesh = function (vertices, color, style) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        geometryLine.vertices = vertices;
        if (!color) {
            color = '#000';
        }
        if (!style) {
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        } else {
            geometryLine.computeLineDistances();
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 5,
                gapSize: 5
            }));
        }
        return lineMesh;
    };
    this.createText = function (content, coordinate, color,ischange) {
        if (!color) {
            color = '#000';
        }
        var fontsize = '30px Cambria Math';

        var textStyle = this.objStyle(color, fontsize),
            text = new SpriteText2D(content, textStyle),x,y,z;


        if(ischange){
            text.position.set(coordinate[0], coordinate[1], coordinate[2]);
        }else{
            if(coordinate[0]>0){ x = coordinate[0]+30;}else{x = coordinate[0]-30; }
            if(coordinate[1]>0){ y = coordinate[1]+30;}else{y = coordinate[1]-30; }
            if(coordinate[2]>0){ z = coordinate[2]+30;}else{z = coordinate[2]-30; }
            text.position.set(x, y, z);
        }

        return text;
    };
    this.createSphere = function (coordinate, radius) {
        var sphereG = new THREE.SphereGeometry(radius, 10, 10, 0, 2 * Math.PI, 0, 2 * Math.PI);
        var sphereM = new THREE.MeshBasicMaterial({color: 'red'});
        var sphere = new THREE.Mesh(sphereG, sphereM);
        sphere.position.x = coordinate[0];
        sphere.position.y = coordinate[1];
        sphere.position.z = coordinate[2];
        return sphere;
        // this.scene.add(sphere);
        // selectObjs.push(sphere);
        // bigMeshs.push(sphere);
    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
    };
    this.createGrid = function(){
        var geometry = new THREE.Geometry(), bottom = -0.001, step = 100;
        var lineMaterial = new THREE.LineBasicMaterial( { color: 0x949494, transparent: true, opacity: 0.5 } );
        for ( var i = 0; i <= 10; i ++ ) {
            geometry.vertices.push( new THREE.Vector3( - 500, bottom, i * step - 500 ) );
            geometry.vertices.push( new THREE.Vector3(   500, bottom, i * step - 500 ) );

            geometry.vertices.push( new THREE.Vector3(i * step - 500, bottom, -500));
            geometry.vertices.push( new THREE.Vector3( i * step - 500, bottom,  500 ) );
        }
        grid = new THREE.LineSegments( geometry, lineMaterial, THREE.LinePieces );
        this.scene.add( grid );
        window.gridColor = 0x303030;
    };
    this.grid = function(){
        if(grid!=undefined){
            this.scene.remove(grid);
            grid = null;
        }else{
            this.createGrid();
        }

    };
    this.linesHide = function(){
        PO.visible = false;
        pointO.visible = false;
    };
    this.linesShow = function(){
        PO.visible = true;
        pointO.visible = true;
    };
    this.gradualcreate = function(){
        if(length <= 0){
            clearTimeout(timg);
            timg=0;
            return;
        }
        length -= 0.5;
        timg = setTimeout(function(){
            thiz.scene.remove(gradualLine);
            var vertices = [];
            vertices.push(new THREE.Vector3(json[1][0],json[1][1],json[1][2]));
            vertices.push(new THREE.Vector3(json[1][0],length,json[1][2]));
            gradualLine = thiz.createLineMesh(vertices,'green',1);
            thiz.scene.add(gradualLine);
            thiz.gradualcreate();

        },300);
    };
    this.clearGradualMesh = function(){
        clearTimeout(timg);
        this.scene.remove(gradualLine);
    }

}


var threeDimensional = new ThreeDimensional();
threeDimensional.int();


//重置事件
function renderAll(){
    threeDimensional.controls.update();

    requestAnimationFrame(renderAll);
    threeDimensional.renderer.render(threeDimensional.scene,threeDimensional.camera);

}
renderAll();


var select1c = false,select2c=false;

//on/off事件
function clickEve1(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');

    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
        $(this).parent().parent().siblings().find('.span2').text('' +'off');

    }

    var dataId = $(this).attr('data-id');
    if(dataId == 1){
        select1c = !select1c;
        select2c =false;
        var met1 = new THREE.LineBasicMaterial({color: 'red'});
        PA.material = met1;
        var met2 = new THREE.LineBasicMaterial({color: 'blue'});
        OA.material = met2;
        threeDimensional.clearGradualMesh();
        threeDimensional.linesHide();
        if(select1c){
            //$('.bubble').css({'display':'block'}).find('.bg').attr('src','images/1.png');
            threeDimensional.linesShow();
        }else{
            //$('.bubble').css({'display':'none'});
            threeDimensional.linesHide();

            met1 = new THREE.LineBasicMaterial({color: '#f5a92a'});
            PA.material = met1;
            met2 = new THREE.LineBasicMaterial({color: 'blue'});
            OA.material = met2;
        }


    }else if(dataId == 2){

        select2c = !select2c;
        select1c =false;

        var met1 = new THREE.LineBasicMaterial({color: '#f5a92a'});
        PA.material = met1;
        var met2 = new THREE.LineBasicMaterial({color: 'red'});
        OA.material = met2;

        threeDimensional.clearGradualMesh();
        threeDimensional.linesHide();

        if(select2c){
            //$('.bubble').css({'display':'block'}).find('.bg').attr('src','images/2.png');
            if(length <=0 ){ length = 5;}
            threeDimensional.gradualcreate();
        }else{
            //$('.bubble').css({'display':'none'});
            threeDimensional.clearGradualMesh();
        }
    }

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
    select1c = select2c = false;
    if(timg){
        clearTimeout(timg);
    }

    //$('.bubble').css({'display':'none'}).find('.bg').attr('src','images/1.png');

    var met1 = new THREE.LineBasicMaterial({color: '#f5a92a'});
    PA.material = met1;
    var met2 = new THREE.LineBasicMaterial({color: 'blue'});
    OA.material = met2;
    threeDimensional.linesHide();
    threeDimensional.clearGradualMesh();

    threeDimensional.camera.position.x = 1500;
    threeDimensional.camera.position.y = 1500;
    threeDimensional.camera.position.z = 1500;

    $('.turn1').removeClass('on').addClass('off');
    $('.span2').text('off');
}

if(!isMob){
    $('#scale').on('click',fullEve);
    $('#renew').on('click',renewEve);
    $('.turnRight').on('click',clickEve1);
}else{
    $('#scale').on('touchstart',fullEve);
    $('#renew').on('touchstart',renewEve);
    $('.turnRight').on('touchstart',clickEve1);
}




