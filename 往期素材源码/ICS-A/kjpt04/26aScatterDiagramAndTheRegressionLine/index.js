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
        $('.threeControl').css({'zoom':bodyScale/0.7,'right':30*scale,'bottom':30*scale});
        if(150*scale < 130){
            $('.pic1').css({'top': 130});
        }else{
            $('.pic1').css({'top': 150*scale});
        }
    // }else{
    //     scale = 0.6667;
    //     $(".body").css({"zoom":0.6667,"margin-top":'0',"top":'0'});
    //     $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale ),bottom:(69*scale)});
    //     $('.pic1').css({'left':15*scale,'top': 200*scale,'text-align':'center'});
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

var select=false,$pic1Cos1 = $('.pic1Cos1 .content span'),$pic1Cos2=$('.pic1Cos2 .content span');



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

var axis = new THREE.Group();


function ThreeDimensional() {
    var mousedownflag = false;
    var thiz = this;
    var selectobjs=[],selectobj=null;
    var arrO1 = [23,27,39,41,45,49,50,53,54,56,57,58,60,61],arr1 =  [23,27,39,41,45,49,50,53,54,56,57,58,60,61];
    var arrO2 = [9.5,17.5,21.2,25.9,27.5,26.3,28.2,29.6,30.2,31.4,30.8,33.5,35.2,34.6],arr2 = [9.5,17.5,21.2,25.9,27.5,26.3,28.2,29.6,30.2,31.4,30.8,33.5,35.2,34.6],ave2;
    var changeObj=null,stateObj=null,valueK=0.672,valueB=-5.956,lineObj=null;




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
        this.camera.position.z = 2200;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);
        this.createControls();
        showArr();
        createObj();
        createChangeObj();
        var vertices =[];
        vertices.push(new THREE.Vector3(-600+20*20,-600+(valueK*20 + valueB)*20,0));
        vertices.push(new THREE.Vector3(-600+70*20,-600+(valueK*70 + valueB)*20,0));
        lineObj = createLineMesh(vertices,'#f57a23',3);
        thiz.scene.add(lineObj);

        this.clickEve();
    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = false;
        this.controls.enableRotate =false;
        // this.controls.enablePan =false;
    };
    this.renew = function(){
        createFun();
        showArr();
        thiz.clickEve();
    };
    this.clickEve = function(){
        if(select){
            lineObj.visible = true;
        }else{
            lineObj.visible = false;
        }
    };
    this.reback = function(){
        for(var i=0;i<14;i++){
            arr1[i] = arrO1[i];
            arr2[i] = arrO2[i];
        }
        showArr();

        thiz.scene.remove(lineObj);
        var vertices =[];
        vertices.push(new THREE.Vector3(-600+20*20,-600+(valueK*20 + valueB)*20,0));
        vertices.push(new THREE.Vector3(-600+70*20,-600+(valueK*70 + valueB)*20,0));
        lineObj = createLineMesh(vertices,'#f57a23',3);
        thiz.scene.add(lineObj);
        createChangeObj();
        thiz.clickEve();

        this.camera.position.z = 1700;
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
        var axisArrow = new THREE.Group();
        var vertices = [];
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
        }
        return axisArrow;
    }
    function createAxisText(origin,dir,style){
        var line=null,i,vertices=[],start,obj,end;
        obj = new THREE.Group();

        if(style == 1){  //横向
            start = origin[0];
            end = origin[1];
            for(i=0;i<15;i++){
                vertices=[];
                vertices.push(new THREE.Vector3(start,end,0));
                vertices.push(new THREE.Vector3(start,end-10,0));
                line = createLineMesh(vertices,'#000',3);
                obj.add(line);
                if(i == 0){
                    line = text(0,30,'#000');
                    line.position.x = start-15;
                    line.position.y = end-15 ;
                }else{
                    line = text(i*5,30,'#000');
                    line.position.x = start;
                    line.position.y = end-15 ;
                }
                obj.add(line);
                start += 100;
            }
            line = text('x',30,'#000');
            line.position.x = dir[0];
            line.position.y = dir[1];
            obj.add(line);
        }else if(style == 2){
            start = origin[1]+100;
            end = origin[0];
            for(i=1;i<8;i++){
                vertices=[];
                vertices.push(new THREE.Vector3(end,start,0));
                vertices.push(new THREE.Vector3(end+10,start,0));
                line = createLineMesh(vertices,'#000',3);
                obj.add(line);
                line = text(i*5,30,'#000');
                line.position.x = origin[0]-30;
                line.position.y = start+5;
                obj.add(line);
                start += 100;
            }
            line = text('y',30,'#000');
            line.position.x = dir[0]-30;
            line.position.y = dir[1]+5;
            obj.add(line);
        }

        return obj;

    }

    /****** 其他事件 ******/
    this.createAxis = function(obj){
        drawAxisArrow(vec3( -550, -500, 0 ), vec3( 700, -500, 0 ),1);
        drawAxisArrow(vec3( -500, -510, 0 ), vec3( -500, 550, 0 ),2);
        obj.add(axisArrow,axis);
    };
    function showArr(){
        for(var i=0;i<14;i++){
            $($pic1Cos1[i]).text(arr1[i]);
            $($pic1Cos2[i]).text(arr2[i].toFixed(1));
        }
    }
    function createObj(){
        thiz.scene.remove(stateObj);
        stateObj=new THREE.Group();
        var vertices = [],line=null;


        line = drawAxisArrow(vec3( -650, -600, 0 ),vec3( 850, -600, 0 ),1);
        stateObj.add(line);

        line = drawAxisArrow(vec3( -600, -650, 0 ),vec3( -600, 200, 0 ),2);
        stateObj.add(line);

        line = createAxisText([-600,-600,0],[850,-600,0],1);
        stateObj.add(line);

        line = createAxisText([-600,-600,0],[-600,200,0],2);
        stateObj.add(line);

        thiz.scene.add(stateObj);
    }
    function createChangeObj(){
        thiz.scene.remove(changeObj);
        changeObj = new THREE.Group();
        var vertices=[0,0],line=null;
        for(var i=0;i<14;i++){
            vertices[0] = -600+20*arr1[i];
            vertices[1] = -600+20*arr2[i];

            line = createCircle(vertices);
            changeObj.add(line);
        }
        
        thiz.scene.add(changeObj);
    }

    function createFun(){
        thiz.scene.remove(lineObj);
        var value = 2*2/7,arr11=[],start,i,vertices=[],result;
        valueK =parseFloat((value*Math.random()-value/2).toFixed(1));
        valueB = 25 - valueK*40;
        start = 5;
        for(i=0;i<14;i++){
            start += Math.ceil(Math.random()*6);
            x = start;
            y = valueK*x + valueB;
            arr11.push([x,y]);
        }
        vertices.push(new THREE.Vector3(-600+5*20,-600+(valueK*5 + valueB)*20,0));
        vertices.push(new THREE.Vector3(-600+70*20,-600+(valueK*70 + valueB)*20,0));
        lineObj = createLineMesh(vertices,'#f57a23',3);
        thiz.scene.add(lineObj);
        lineObj.visible =false;


        arr1=[];
        arr2=[];
        var pom = false;
        for(i=0;i<14;i++){
            arr1.push(arr11[i][0]);
            if(pom){
                result = arr11[i][1] - (Math.random()*5);
            }else{
                result = arr11[i][1] + (Math.random()*5);
            }

            arr2.push(result);

            pom=!pom;
        }
        showArr();
        createChangeObj();
    }
    function createCircle(position){
        var shape = new THREE.CircleGeometry(10,8,0,2*Math.PI);
        var materia = new THREE.MeshBasicMaterial({'color':'#1196dc'});
        var mesh = new THREE.Mesh(shape,materia);
        mesh.position.x = position[0];
        mesh.position.y = position[1];
        return mesh;

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
function clickEve1(){
    var dateId = parseInt($(this).attr('data-id'));

    if($(this).parent().parent().hasClass('on')){
        select = false;
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        select = true;
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
    }

    three.clickEve();
}
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
        if(164*scale < 130){
            $('.pic1').css({'top': 130});
        }else{
            $('.pic1').css({'top': 164*scale});
        }
    }else{
        fullScreen = 1;
        $('#scale img').attr('src','images/icon/back.png');
        $obj.css({'left':0,'top':0,'right':0,'bottom':0,'border-radius':'0'});
        $('canvas').css({'position':'absolute','left':(bodyWidth-threeWidth)/2,'top':(bodyHeight-threeHeight)/2});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','hidden');
    }
}

if(isMob){
	$('.turnRight').on('touchstart',clickEve1);
	$('.dynamic').on('touchstart',three.renew);
	$('#renew').on('touchstart',function(){
	    select = false;
	    $('.turn1').removeClass('on').addClass('off');
	    $('.turn1 .span2').text('' +'off')
	    three.reback();
	});
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	$('.turnRight').on('click',clickEve1);
	$('.dynamic').on('click',three.renew);
	$('#renew').on('click',function(){
	    select = false;
	    $('.turn1').removeClass('on').addClass('off');
	    $('.turn1 .span2').text('' +'off')
	    three.reback();
	});
	/*全屏事件*/
	$('#scale').on('click',scalef);
}





