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


var angle=45,timg = 0,clickValue=0;

function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var thiz = this;
    //选择相关
    var selectobjs = [],mousedownflag = false;
    //角度相关
    var angleMesh=null;


    var planeTop = null,planeBottom=null;


    var face1 = ['α',[0,0,0],[0,0,500],[0,-500,0]]; //面α、点O、点A、点B
    var face2 = ['β'];
    var AO = null,OB=null,pointA=null,pointB=null,pointO=null,faceA = null,faceB=null,line=null,anc;
    var group = new THREE.Group();


    var grid=null;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();
    this.renderer = null;
    if(canWebgl){
        this.renderer = new THREE.WebGLRenderer({antialias:true});
    }else{
        this.renderer = new THREE.CanvasRenderer();
    }
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.controls = null;


    this.int = function () {
        this.camera.position.x = -2500;
        this.camera.position.y = 1500;
        this.camera.position.z = 2500;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
        this.createGrid();

        this.creategrid2();


        var vertices = [];
        vertices.push(new THREE.Vector3(face1[2][0],face1[2][1],face1[2][2]));
        vertices.push(new THREE.Vector3(face1[1][0],face1[1][1],face1[1][2]));
        AO = this.createLineMesh(vertices,'#1161c8');
        this.scene.add(AO);

        vertices = [];
        vertices.push(new THREE.Vector3(face1[3][0],face1[3][1],face1[3][2]));
        vertices.push(new THREE.Vector3(face1[1][0],face1[1][1],face1[1][2]));
        OB= this.createLineMesh(vertices,'#1161c8');
        group.add(OB);

        line =this.createCube([0,0,0],5,2000);
        this.scene.add(line);

        pointA = this.createText('A',[face1[2][0],face1[2][1],face1[2][2]],'#000');
        this.scene.add(pointA);

        pointB = this.createText('B',[face1[1][0],face1[1][1],face1[1][2]+0.5],'#000');
        group.add(pointB);

        pointO = this.createText('O',[face1[1][0],face1[1][1],face1[1][2]],'#000');
        this.scene.add(pointO);

        faceB = this.createText(face2[0],[-900,500,50],'#000');
        group.add(faceB);

        faceA = this.createText(face1[0],[900,50,900],'#000');
        this.scene.add(faceA);

    };
    this.objStyle = function (color, fontsize) {
        return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
    };
    this.createLineMesh = function (vertices, color, style) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        //geometryLine.vertices = vertices;
        if (!color) {
            color = '#000';
        }
        if (!style) {
            vertices.push(new THREE.Vector3(vertices[0].x,vertices[0].y-2,vertices[0].z));
            vertices.push(new THREE.Vector3(vertices[1].x,vertices[1].y-2,vertices[1].z));
            vertices.push(new THREE.Vector3(vertices[0].x+2,vertices[0].y,vertices[0].z));
            vertices.push(new THREE.Vector3(vertices[1].x+2,vertices[1].y,vertices[1].z));
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        } else {
            geometryLine.vertices = vertices;
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
    this.createCube = function(coordinate,radius,length){
        var cubeG = new THREE.CylinderGeometry(radius,radius,length,3,3,false);
        var cubeM = new THREE.MeshBasicMaterial({color: '#417505'});
        var cube = new THREE.Mesh(cubeG,cubeM);
        cube.position.x = coordinate[0];
        cube.position.y = coordinate[1];
        cube.position.z = coordinate[2];
        cube.rotation.z = Math.PI/2;
        return cube;
    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
    };
    this.createGrid = function(){
        var geometry = new THREE.Geometry(), bottom = -0.001, step = 200;
        var lineMaterial = new THREE.LineBasicMaterial( { color: 0x949494, transparent: true, opacity: 0.5 } );

        for(var i=0;i<10;i=i+2){
            geometry.vertices.push( new THREE.Vector3( - 1000, bottom, i*100 ) );
            geometry.vertices.push( new THREE.Vector3(  1000, bottom, i*100 ) );
            geometry.vertices.push( new THREE.Vector3(  1000, bottom, 1000-i*100 ) );
            geometry.vertices.push( new THREE.Vector3( - 1000, bottom, 1000-i*100 ) );

            geometry.vertices.push( new THREE.Vector3( -1000+i*100, bottom, 0 ) );
            geometry.vertices.push( new THREE.Vector3(  -1000+i*100, bottom, 1000 ) );

            geometry.vertices.push( new THREE.Vector3( 1000-i*100, bottom, 0 ) );
            geometry.vertices.push( new THREE.Vector3(  1000-i*100, bottom, 1000 ) );
        }

        geometry.vertices.push( new THREE.Vector3( 0, bottom, 0 ) );
        geometry.vertices.push( new THREE.Vector3( 0, bottom, 1000 ) );

        grid = new THREE.LineSegments( geometry, lineMaterial, THREE.LinePieces );
        this.scene.add( grid );
        window.gridColor = 0x303030;
    };
    this.creategrid2 = function(){
        var planeG = new THREE.PlaneGeometry(2000,1000,5,5);
        var planeM = new THREE.MeshBasicMaterial({color:'#bbe5e5',side:THREE.DoubleSide,transparent:true,opacity:0.8});
        planeTop = new THREE.Mesh(planeG,planeM);
        group.add(planeTop);
        this.scene.add(group);

        this.calculatePosition(45);

    };
    this.calculatePosition = function(arc){
        var length = 500;
        var angle1 = (90-arc)*Math.PI/180;
        var halfangle = (90-arc)*Math.PI*0.5/180;
        var inclineLength = 2*length * Math.sin(halfangle);
        var x = Math.cos(halfangle)*inclineLength;
        var y = Math.sin(halfangle)*inclineLength;

        group.position.z = x;
        group.position.y = length-y;
        group.rotation.x = angle1;

        if(angleMesh!=undefined){
            thiz.scene.remove(angleMesh);
            thiz.scene.remove(anc)
        }
        angleMesh = this.createText(''+angle+'°',[0,10,50],'#000');
        this.scene.add(angleMesh);

        var array = [];
        for(var i=0;i< arc;){
            x = 10*Math.cos(3.14*i/180);
            y= Math.sqrt(100-Math.pow(x,2));
            array.push(new THREE.Vector3(0, y*5,x*5));
            i = i+1;
        }


        var curve = new THREE.CatmullRomCurve3(array);
        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(50);
        var material = new THREE.LineBasicMaterial({color : '#f39800'});
        anc = new THREE.Line(geometry, material);
        thiz.scene.add(anc);


    };
    this.createFlash = function(){

        var materialfaceA = null,materialfaceB=null,materialLine = null,materialAO=null,materialOB=null;
        materialfaceA = new THREE.LineBasicMaterial( { color: 'red', transparent: true, opacity: 0.5 } );
        materialfaceB = new THREE.MeshBasicMaterial({color:'red',side:THREE.DoubleSide,transparent:true,opacity:0.8});
        materialLine = new THREE.MeshBasicMaterial({color: 'red'});
        materialAO = new THREE.LineBasicMaterial({color: 'red'});
        materialOB = new THREE.LineBasicMaterial({color: 'red'});
        if(clickValue == 1){         //二面角
            line.material = materialLine;
            grid.material = materialfaceA;
            planeTop.material = materialfaceB;


        }else if(clickValue == 2){   //二面角的棱

            line.material = materialLine;

        }else if(clickValue == 3){   //二面角的面

            grid.material = materialfaceA;
            planeTop.material = materialfaceB;

        }else if(clickValue == 4){   //二面角的平面角
            AO.material = materialAO;
            OB.material = materialOB;
        }



    };
    this.colorReback = function(){
        clearTimeout(timg);
        timg=0;
        line.material = new THREE.MeshBasicMaterial({color: '#00b050'});
        grid.material = new THREE.LineBasicMaterial( { color: 0x949494, transparent: true, opacity: 0.5 } );
        planeTop.material = new THREE.MeshBasicMaterial({color:'#bbe5e5',side:THREE.DoubleSide,transparent:true,opacity:0.8});
        AO.material = new THREE.LineBasicMaterial({color: '#1161c8'});
        OB.material = new THREE.LineBasicMaterial({color: '#1161c8'});
        this.camera.position.x = -2500;
        this.camera.position.y = 1500;
        this.camera.position.z = 2500;
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


var checked =true;

$('#slider1').change(function(){
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;
    angle = value;
    threeDimensional.calculatePosition(angle);

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
    threeDimensional.colorReback();
    $('.dynamic').removeClass('on');
    angle = 45;

    $('.slider1').find('.sliderLeft').css({'width':'101px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'101px'});
    $('.slider1').find('.xdsoft_slider_label').text('45');
    $('#slider1').attr('value',''+45+'|0');
    threeDimensional.calculatePosition(angle);
}
function dynamicEve(){
    var dataId = $(this).attr('data-id');
    $('.dynamic').removeClass('on');
    $(this).addClass('on');
    if(dataId == 1){
        threeDimensional.colorReback();
        clickValue = 1;
        threeDimensional.createFlash();

    }else if(dataId == 2){
        threeDimensional.colorReback();
        clickValue = 2;
        threeDimensional.createFlash();


    }else if(dataId == 3){
        threeDimensional.colorReback();
        clickValue = 3;
        threeDimensional.createFlash();

    }else{
        threeDimensional.colorReback();
        clickValue = 4;
        threeDimensional.createFlash();
    }
}

if(!isMob){
    $('#scale').on('click',fullEve);
    $('#renew').on('click',renewEve);
    $('.dynamic').on('click',dynamicEve);
}else{
    $('#scale').on('touchstart',fullEve);
    $('#renew').on('touchstart',renewEve);
    $('.dynamic').on('touchstart',dynamicEve);
}






