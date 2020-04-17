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
var checked =false;


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


var moved=false;
var result1 = $('.result1');
var demo=1.5;

function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var thiz = this;

    //点和文字相关

    var jsonA = [[0,200,0],[200,200,0]];
    var jsonB = [[0,0,0],[200,0,0]];
    var lineA=null,lineArrowA=null,lineB=null,lineArrowB=null,textA =new THREE.Group(),textB=new THREE.Group(),lineother=null;

    $('.three').height(threeHeight);

    var grid=null;
    var canWebgl = ( function () {
        try {
            var canvas = document.createElement( 'canvas' );
            return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    } )();

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
    this.renderer=null;
    if(canWebgl){
        this.renderer = new THREE.WebGLRenderer({antialias:true});
    }else{
        this.renderer = new THREE.CanvasRenderer();
    }
    this.controls = null;


    this.int = function () {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 1600;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
        //this.createGrid();

        var vertices = [];
        vertices.push(new THREE.Vector3(jsonA[0][0],jsonA[0][1],jsonA[0][2]));
        vertices.push(new THREE.Vector3(jsonA[1][0],jsonA[1][1],jsonA[1][2]));
        lineA = this.createLineMesh(vertices,'#2769b9');
        this.scene.add(lineA);

        lineArrowA = createLineArrow(1,jsonA[1],'#2769b9',0);
        this.scene.add(lineArrowA);


        this.scene.add(textA);
        var text1 = this.createText('a',[0,0,0],'#2769b9',1);
        var text2 = this.createText('→',[0,15,0],'#2769b9',1);
        textA.add(text1);
        textA.add(text2);
        textA.position.x =(jsonA[0][0]+jsonA[1][0])/2;
        textA.position.y =jsonA[0][1]+30;



        this.scene.add(textB);
        text1 = this.createText('b',[0,0,0],'red',1);
        text2 = this.createText('→',[0,15,0],'red',1);
        textB.add(text1);
        textB.add(text2);
        textB.position.x =(jsonB[0][0]+jsonB[1][0])/2;
        textB.position.y =-10;

        createLineB();

        vertices = [];
        vertices.push(new THREE.Vector3(-600,0,0));
        vertices.push(new THREE.Vector3(600,0,0));
        lineother = this.createLineMesh(vertices,'#888',1);
        this.scene.add(lineother);


    };
    this.objStyle = function (color, fontsize) {
        return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
    };
    this.createLineMesh = function (vertices, color, style) {
        var lineMesh = null, geometryLine = new THREE.Geometry();

        if (!color) {
            color = '#000';
        }
        if (!style) {
            vertices.push(new THREE.Vector3(vertices[0].x,vertices[0].y-0.4,5));
            vertices.push(new THREE.Vector3(vertices[1].x,vertices[1].y-0.4,5));
            vertices.push(new THREE.Vector3(vertices[0].x+0.4,vertices[0].y,5));
            vertices.push(new THREE.Vector3(vertices[1].x+0.4,vertices[1].y,5));
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        } else {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 1,
                dashSize: 20,
                gapSize: 5
            }));
        }
        return lineMesh;
    };
    this.createText = function (content, coordinate, color,ischange) {
        if (!color) {
            color = '#000';
        }
        var fontsize = '25px Cambria Math';

        var textStyle = this.objStyle(color, fontsize),
            text = new SpriteText2D(content, textStyle),x,y,z;


        if(ischange){
            text.position.set(coordinate[0], coordinate[1], coordinate[2]);
        }else{
            if(coordinate[0]>0){ x = coordinate[0]+0.5;}else{x = coordinate[0]-0.5; }
            if(coordinate[1]>0){ y = coordinate[1]+0.5;}else{y = coordinate[1]-0.5; }
            if(coordinate[2]>0){ z = coordinate[2]+0.5;}else{z = coordinate[2]-0.5; }
            text.position.set(x, y, z);
        }


        //text.scale.x = 0.05;
        //text.scale.y = 0.05;
        //text.scale.z = 0.05;

        return text;
    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableZoom = true;
        this.controls.enableRotate = false;
    };
    this.createGrid = function(){
        var geometry = new THREE.Geometry(), bottom = -0.001, step = 100;
        var lineMaterial = new THREE.LineBasicMaterial( { color: 0x949494, transparent: true, opacity: 0.5 } );
        for ( var i = 0; i <= 12; i ++ ) {
            geometry.vertices.push( new THREE.Vector3( - 600, bottom, i * step - 600 ) );
            geometry.vertices.push( new THREE.Vector3(   600, bottom, i * step - 600 ) );

            geometry.vertices.push( new THREE.Vector3(i * step - 600, bottom, -600));
            geometry.vertices.push( new THREE.Vector3( i * step - 600, bottom,  600 ) );
        }
        grid = new THREE.LineSegments( geometry, lineMaterial, THREE.LinePieces );
        this.scene.add( grid );
        window.gridColor = 0x303030;
        grid.rotation.x = Math.PI/2;
    };
    this.reback = function(){
        jsonB[1][0]=200;
        demo=1.5;
        createLineB();
        backZero();
        this.camera.position.z = 1600;

    };
    this.grid = function(){
        if(grid!=undefined){
            this.scene.remove(grid);
            grid = null;
        }else{
            this.createGrid();
        }
    };
    this.changevector=function(){
        createLineB();
        jsonB[1][0]=4;
    };

    function createLineB(){
        if(lineB!=undefined){
            thiz.scene.remove(lineB);
            thiz.scene.remove(lineArrowB);
        }
        var vertices = [];
        jsonB[1][0]=200;
        jsonB[1][0]=jsonB[1][0]*demo;
        vertices.push(new THREE.Vector3(jsonB[0][0],jsonB[0][1],jsonB[0][2]));
        vertices.push(new THREE.Vector3(jsonB[1][0],jsonB[1][1],jsonB[1][2]));
        lineB = thiz.createLineMesh(vertices,'red');
        thiz.scene.add(lineB);
        var style=1;
        if(jsonB[1][0]<0){
            style = 2;
        }
        if(demo){
            lineArrowB = createLineArrow(1,jsonB[1],'red');
            thiz.scene.add(lineArrowB);
            if(jsonB[1][0]<0){
                lineArrowB.rotation.z = Math.PI;
            }
        }else{
            var g = new THREE.CircleGeometry(10,10,0,Math.PI*2);
            var m = new THREE.MeshBasicMaterial({color:'red',transparent:true,opacity:0.9});
            lineArrowB = new THREE.Mesh(g,m);
            thiz.scene.add(lineArrowB);
        }



        textB.position.x = (jsonB[0][0]+jsonB[1][0])/2;
        demo=1.5;
    }


    function backZero(){
        $(' .demo .pointer.high').css("left",'171px');
        $("#sides-slider-value1").val('1.50');
        $('.choose-select').find('.selected-bar').css('width','180px');
        $('.choose-select').find('.pointer.high').css('left','171px');
        $('.choose-select').find('.pointer-label.high').css('left','162.5px').html('1.50');
    }


    function createLineArrow(arrow,coordinate,color){

        var vertices =[];
        if(arrow == 1){             //朝右
            vertices.push(new THREE.Vector3(-13,13,0));
            vertices.push(new THREE.Vector3(13,0,0));
            vertices.push(new THREE.Vector3(0-13,0-13,0));
        }

        var material2 = new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:0.9});
        var geom = new THREE.Geometry();
        geom.vertices = vertices;
        geom.faces.push(new THREE.Face3(0,1,2));
        geom.faces.push(new THREE.Face3(2,1,0));
        var obj = new THREE.SceneUtils.createMultiMaterialObject(geom,[material2]);

        obj.scale.x = 0.8;
        obj.scale.y = 0.8;
        obj.scale.z = 0.8;
        obj.position.x = coordinate[0];
        obj.position.y = coordinate[1];
        obj.position.z = coordinate[2];

        return obj;
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



$('#slider1').change(function(){
    var result = $(this).val();
    var value = result.split('|')[0];
    value = parseFloat(parseFloat(value).toFixed(1));
    demo = value;
    threeDimensional.changevector();
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
    threeDimensional.reback();

    $('.slider1').find('.sliderLeft').css({'width':'307px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'307px'});
    $('.slider1').find('.xdsoft_slider_label').text('1.5');
    $('.slider1').attr('value',''+1.5+'|0');
}

if(!isMob){
    $('#scale').on('click',fullEve);
    $('#renew').on('click',renewEve);
}else{
    $('#scale').on('touchstart',fullEve);
    $('#renew').on('touchstart',renewEve);
}




