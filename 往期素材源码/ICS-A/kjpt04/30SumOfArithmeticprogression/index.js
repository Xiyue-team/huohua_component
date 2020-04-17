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
var isMob = /iPad|Android/g.test(navigator.userAgent);
if(!(bodyWidth == 370 && bodyHeight == 246)){
    var $body = $("body");
    // if(isMob){
        var bodyScale = scale = bodyWidth/1920;
        $('.body').css("zoom",bodyScale).height(1200);
        var marginTop = ($body.width()/bodyWidth*bodyHeight-1200)/2;
        $('.body').css("margin-top",'-600px');
        $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale + (bodyHeight-1200*scale)/2 ),bottom:(69*scale + (bodyHeight-1200*scale)/2 )});
        $(".threeControl").css({"zoom":bodyScale/0.7,"right":30*bodyScale,"bottom":30*bodyScale});
        $(".box").css({"zoom":bodyScale});
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

var value1=1,value2=2,value3=1;
var showline=false;



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
var axisArrow = new THREE.Group();
var axis = new THREE.Group();


function ThreeDimensional() {
    var mousedownflag = false;
    var thiz = this;
    var selectobjs=[],selectobj=null;

    var funcCircle=null,curveLine=null;



    /****** 判断是否支持WebGL ******/
    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();

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

    /****** 分割线 ******/
    this.int = function () {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 1700;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        this.scene.position.x = -375;
        this.scene.position.y = 0;
        this.scene.position.z = 0;
        $obj.append(this.renderer.domElement);
        this.createControls();
        createGrid();
        this.createAxis();
        var axis = createaxis();
        thiz.scene.add(axis);

        thiz.scene.add(axisArrow);
        createFunction();

    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate =false;
        // this.controls.enablePan =false;
    };
    this.reback = function(){
        this.camera.position.z = 1700;
        this.rangeChangeEve();
    };
    this.rangeChangeEve = function(){
        createFunction();
    };


    /****** 事件函数 ******/
    function createLineMesh(vertices, color, style) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        if (style == 1) {
            vertices.push(new THREE.Vector3(vertices[0].x,vertices[0].y-1,vertices[0].z));
            vertices.push(new THREE.Vector3(vertices[1].x,vertices[1].y-1,vertices[1].z));
            vertices.push(new THREE.Vector3(vertices[0].x+1,vertices[0].y,vertices[0].z));
            vertices.push(new THREE.Vector3(vertices[1].x+1,vertices[1].y,vertices[1].z));
            vertices.push(new THREE.Vector3(vertices[0].x-1,vertices[0].y,vertices[0].z));
            vertices.push(new THREE.Vector3(vertices[1].x-1,vertices[1].y,vertices[1].z));
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        } else if(style==2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 10,
                gapSize: 10
            }));
        }else if( style == 3){
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }
        return lineMesh;
    }
    function vec3(x,y,z){
        return new THREE.Vector3(x, y, z);
    }
    function text(font,size,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
        return new SpriteText2D(font, textStyle);
    }

    function drawAxisArrow(origin, dir,style){
        var vertices = [],tex =null;
        vertices.push(new THREE.Vector3(origin.x,origin.y,origin.z));
        vertices.push(new THREE.Vector3(dir.x,dir.y,dir.z));
        var line = createLineMesh(vertices,'#000',3);
        axisArrow.add(line);

        if(style == 1){
            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,dir.y+5,0));
            vertices.push(new THREE.Vector3(dir.x,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,dir.y-5,0));
            vertices.push(new THREE.Vector3(dir.x,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

            tex = text('n',30,'#000');
            tex.position.x = (dir.x-20);
            tex.position.y = dir.y;
            tex.position.z = 0;
            axisArrow.add(tex);

        }else{
            vertices = [];
            vertices.push(new THREE.Vector3(dir.x+5,dir.y-20,0));
            vertices.push(new THREE.Vector3(dir.x,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-5,dir.y-20,0));
            vertices.push(new THREE.Vector3(dir.x,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);


            tex = text('a',30,'#000');
            tex.position.x = (dir.x-30);
            tex.position.y = dir.y;
            tex.position.z = 0;
            axisArrow.add(tex);

            tex = text('n',18,'#000');
            tex.position.x = (dir.x-15);
            tex.position.y = dir.y-10;
            tex.position.z = 0;
            axisArrow.add(tex);
        }
    }

    /****** 其他事件 ******/
    this.createAxis = function(){
        drawAxisArrow(vec3( -350, 0, 0 ), vec3( 950, 0, 0 ),1);
        drawAxisArrow(vec3( -100, -3300, 0 ), vec3( -100, 3300, 0 ),2);
    };

    function createFunction(){
        if(funcCircle!=null){
            thiz.scene.remove(funcCircle);
            thiz.scene.remove(curveLine);
        }
        //if(value2 == 0){ return;}
        var i=0,y,array=[],line=null;
        funcCircle = new THREE.Group();
        for(i=1;i<=value3;i++){
            y =value1*i+(i*(i-1)/2)*value2;
            array.push(new THREE.Vector3(i*50, y*50, 0));
            line = createCircle([array[i-1].x-100 ,array[i-1].y]);
            funcCircle.add(line);
        }


        //array=[];
        if(value3>1){
            var geometryLine1 = new THREE.Geometry();
            var vertices1 = [];
            vertices1.push(new THREE.Vector3(-100, 0, -1));
            for(i=1;i<value3+0.01;){
                y =value1*i+(i*(i-1)/2)*value2;
                vertices1.push(new THREE.Vector3(i*50-100, y*50, -1));
                i=i+0.1;
            }
            geometryLine1.vertices = vertices1;
            geometryLine1.computeLineDistances();
            curveLine = new THREE.Line(geometryLine1,new THREE.LineDashedMaterial( { color: 0x0000ff,opacity:0.9, dashSize: 5, gapSize: 5 } ));
            thiz.scene.add(curveLine);
        }

        //for(i=0;i<value3+0.01;){
        //    y =value1*i+(i*(i-1)/2)*value2;
        //    array.push(new THREE.Vector3(i*50-100, y*50, -1));
        //    i=i+0.1;
        //}
        //var curve = new THREE.CatmullRomCurve3(array);
        //var geometry = new THREE.Geometry();
        //geometry.vertices = curve.getPoints(100);
        //var material = new THREE.LineBasicMaterial({color : '#d0021b'});
        //curveLine = new THREE.Line(geometry, material);
        //thiz.scene.add(curveLine);
        thiz.scene.add(funcCircle);

    }
    function createCircle(position){
        var shape = new THREE.CircleGeometry(15,15,0,2*Math.PI);
        var materia = new THREE.MeshBasicMaterial({'color':'#ff0000'});
        var mesh = new THREE.Mesh(shape,materia);
        mesh.position.x = position[0];
        mesh.position.y = position[1];
        return mesh;
    }
    function createaxis(){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var text={};
        var textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
        var gruop = new THREE.Group();
        for(var i = -64; i <= 64; i++) {
            if(i==0){
                text = new SpriteText2D(i, textStyle);
                text.position.x = -100-30;
                text.position.y = i*50 - 10;
                gruop.add(text);
            }else{
                text = new SpriteText2D(i, textStyle);
                text.position.x = -100-30;
                text.position.y = i*50 +10;
                gruop.add(text);

                var vertices = [];
                vertices.push(new THREE.Vector3(-100, i*50,0));
                vertices.push(new THREE.Vector3(-110,i*50,0));
                var line = createLineMesh(vertices,'#000',3);
                gruop.add(line);
            }

        }
        for( i = 1; i <= 20; i++) {
            text = new SpriteText2D(i, textStyle);
            text.position.x = -100+i*50;
            text.position.y = -10;
            gruop.add(text);

            vertices = [];
            vertices.push(new THREE.Vector3(-100+i*50, 0,0));
            vertices.push(new THREE.Vector3(-100+i*50,10,0));
            line = createLineMesh(vertices,'#000',3);
            gruop.add(line);
        }


        return gruop;
    }
    function createGrid(){
        var i,j,line=null,vertices =[];
        var group=new THREE.Group();
        for(i=1;i<21;i++){
            vertices=[];
            vertices.push(new THREE.Vector3(i*50-100, 64*50,0));
            vertices.push(new THREE.Vector3(i*50-100,-64*50,0));
            line = createLineMesh(vertices,'#afb0ae',3);
            group.add(line);
        }
        for(i=-64;i<65;i++){
            if(i==0){continue};
            vertices=[];
            vertices.push(new THREE.Vector3(-100, i*50,0));
            vertices.push(new THREE.Vector3(900,i*50,0));
            line = createLineMesh(vertices,'#afb0ae',3);
            group.add(line);
        }

        thiz.scene.add(group);
    }

}


var three = new ThreeDimensional();
three.int();

renderAll();
function renderAll(){
    three.controls.update();
    requestAnimationFrame(renderAll);
    three.renderer.render(three.scene,three.camera);
}

//on/off事件

$('#slider1').change(function(){
    var result = $(this).val();
    var value = result.split('|')[0];
    value = parseFloat(parseFloat(value).toFixed(1));
    value1 = value;
    three.rangeChangeEve();

});
$('#slider2').change(function(){
    var result = $(this).val();
    var value = result.split('|')[0];
    value = parseFloat(parseFloat(value).toFixed(1));
    value2=value;
    three.rangeChangeEve();
});
$('#slider3').change(function(){
    var result = $(this).val();
    var value = result.split('|')[0];
    value = parseInt(value);
    value3=value;
    three.rangeChangeEve();
});

$('#renew').click(function(){

});


var fullScreen=0;
function scalef(){
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
function renew(){
    value1 = 1;
    value2 = 2;
    value3=1;
    $('.slider1').find('.sliderLeft').css({'width':'245px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'245px'});
    $('.slider1').find('.xdsoft_slider_label').text('1');
    $('.slider1').attr('value',''+1+'|0');
    $('.slider2').find('.sliderLeft').css({'width':'286px'});
    $('.slider2').find('.xdsoft_range2dslider_runner').css({'left':'286px'});
    $('.slider2').find('.xdsoft_slider_label').text('2');
    $('.slider2').attr('value',''+2+'|0');
    $('.slider3').find('.sliderLeft').css({'width':'0px'});
    $('.slider3').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
    $('.slider3').find('.xdsoft_slider_label').text('1');
    $('.slider3').attr('value',''+1+'|0');
    three.reback();
}

if(isMob){
    //reset
    $('#renew').on('touchstart',renew);
    /*全屏事件*/
    $('#scale').on('touchstart',scalef);
}else{
    //reset
    $('#renew').on('click',renew);
    /*全屏事件*/
    $('#scale').on('click',scalef);
}





