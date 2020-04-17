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

var value1=1,selectFun=0,value2=0,value3=0,$arrayBoxs = $('.arrayBox');



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
var arrayBox = [0,1,1,2,3,5,8,13,21,34,'...'];


function ThreeDimensional() {
    var mousedownflag = false;
    var thiz = this;
    var selectobjs=[],selectobj=null;
    var funcs=[],allGroup=null,rate=10,border0=[],curve=[];



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
        this.scene.position.x = 0;
        this.scene.position.y = 0;
        this.scene.position.z = 0;
        $obj.append(this.renderer.domElement);
        this.createControls();

        createFuncs();
        // this.createAxis();

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
        for(var i=0;i<funcs.length;i++){
            funcs[i].visible =false;
            border0[i].visible =false;
            curve[i].visible =false;
        }

        if(value2){
            for(i=0;i<value1-1;i++){
                funcs[i].visible =true;
            }
            if(value1>1){
                border0[0].visible = true;
            }
        }else{
            for(i=0;i<value1-1;i++){
                border0[i].visible =true;
            }

        }

    };
    this.clickEve = function(){
        this.rangeChangeEve();

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

        thiz.scene.add(axisArrow)
    }

    /****** 其他事件 ******/
    this.createAxis = function(){
        drawAxisArrow(vec3( -350, 0, 0 ), vec3( 350, 0, 0 ),1);
        drawAxisArrow(vec3( 0, -3300, 0 ), vec3( 0, 3300, 0 ),2);
    };


    function createBorder(arr){
        var gruop=new THREE.Group(),line=null,vertices=[];
        vertices.push(new THREE.Vector3(arr[0][0],arr[0][1],arr[0][2]));
        vertices.push(new THREE.Vector3(arr[1][0],arr[1][1],arr[1][2]));
        line=createLineMesh(vertices,'#000',3);
        gruop.add(line);
        vertices=[];
        vertices.push(new THREE.Vector3(arr[2][0],arr[2][1],arr[2][2]));
        vertices.push(new THREE.Vector3(arr[1][0],arr[1][1],arr[1][2]));
        line=createLineMesh(vertices,'#000',3);
        gruop.add(line);
        vertices=[];
        vertices.push(new THREE.Vector3(arr[2][0],arr[2][1],arr[2][2]));
        vertices.push(new THREE.Vector3(arr[3][0],arr[3][1],arr[3][2]));
        line=createLineMesh(vertices,'#000',3);
        gruop.add(line);
        vertices=[];
        vertices.push(new THREE.Vector3(arr[0][0],arr[0][1],arr[0][2]));
        vertices.push(new THREE.Vector3(arr[3][0],arr[3][1],arr[3][2]));
        line=createLineMesh(vertices,'#000',3);
        gruop.add(line);

        return gruop;

    }
    function createCurve(radius,color){
        var array=[],curve,geometry,material,line;
        if(!color){ color='#d0021b';}
        var group = new THREE.Group();
        for(var i=0;i<radius+0.001;){
            y=Math.sqrt(Math.pow(radius,2)-Math.pow(i,2));
            array.push(new THREE.Vector3(i*20, y*20, 0));
            i +=0.01;
        }
        curve = new THREE.CatmullRomCurve3(array);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : color});
        line = new THREE.Line(geometry, material);
        group.add(line);
        return group;
    }
    function createFuncs(){
        funcs[0] = new THREE.Group();
        border0[0] = new THREE.Group();
        curve[0] = new THREE.Group();
        var line = createBorder([[0,0,0],[0,20,0],[20,20,0],[20,0,0]]);
        funcs[0].add(line);

        line = createBorder([[0,0,0],[0,20,0],[20,20,0],[20,0,0]]);
        border0[0].add(line);

        var value = 2*rate;

        funcs[1] = new THREE.Group();
        border0[1] = new THREE.Group();
        curve[1] = new THREE.Group();
        line = createCurve(1);
        funcs[1].add(line);
        line = createBorder([[0,0,0],[0,value,0],[value,value,0],[value,0,0]]);
        funcs[1].add(line);
        funcs[1].position.y = value;
        thiz.scene.add(funcs[1]);


        line = createBorder([[0,0,0],[0,value,0],[value,value,0],[value,0,0]]);
        line.position.y = value;
        border0[1].add(line);

        line = createCurve(1,'#000');
        line.position.y = value;
        curve[1].add(line);

        funcs[2] = new THREE.Group();
        border0[2] = new THREE.Group();
        curve[2] = new THREE.Group();
        line = createCurve(2);
        line.position.x -= value;
        line.position.y -= value;
        funcs[2].add(line);
        line = createBorder([[-value,value,0],[value,value,0],[value,-value,0],[-value,-value,0]]);
        funcs[2].add(line);
        funcs[2].rotation.z = Math.PI/2;
        funcs[2].position.x += -value;
        funcs[2].position.y += value;
        thiz.scene.add(funcs[2]);

        line = createBorder([[-value,value,0],[value,value,0],[value,-value,0],[-value,-value,0]]);
        line.position.x += -value;
        line.position.y += value;
        border0[2].add(line);

        line = createCurve(2,'#000');
        line.rotation.z = Math.PI/2;
        curve[2].add(line);

        value = 3*rate;
        funcs[3] = new THREE.Group();
        border0[3] = new THREE.Group();
        curve[3] = new THREE.Group();
        line = createCurve(3);
        line.position.x -= value;
        line.position.y -= value;
        funcs[3].add(line);
        line = createBorder([[-value,value,0],[value,value,0],[value,-value,0],[-value,-value,0]]);
        funcs[3].add(line);
        funcs[3].rotation.z = Math.PI;
        funcs[3].position.x -= 10;
        funcs[3].position.y += -value;
        thiz.scene.add(funcs[3]);

        line = createBorder([[-value,value,0],[value,value,0],[value,-value,0],[-value,-value,0]]);
        line.position.x -= 10;
        line.position.y += -value;
        border0[3].add(line);


        line = createCurve(3,'#000');
        line.position.x += 20;
        line.rotation.z = Math.PI;
        curve[3].add(line);

        value = 5*rate;
        funcs[4] = new THREE.Group();
        border0[4] = new THREE.Group();
        curve[4] = new THREE.Group();
        line = createCurve(5);
        line.position.x -= value;
        line.position.y -= value;
        funcs[4].add(line);
        line = createBorder([[-value,value,0],[value,value,0],[value,-value,0],[-value,-value,0]]);
        funcs[4].add(line);
        funcs[4].rotation.z = -Math.PI/2;
        funcs[4].position.x += (20+value);
        funcs[4].position.y -= 10;
        thiz.scene.add(funcs[4]);
        line = createBorder([[-value,value,0],[value,value,0],[value,-value,0],[-value,-value,0]]);
        line.position.x += (20+value);
        line.position.y -= 10;
        border0[4].add(line);

        line = createCurve(5,'#000');
        line.position.x += 20;
        line.position.y += 40;
        line.rotation.z = -Math.PI*2/4;
        curve[4].add(line);

        value = 8*rate;
        funcs[5] = new THREE.Group();
        border0[5] = new THREE.Group();
        curve[5] = new THREE.Group();
        line = createCurve(8);
        line.position.x -= value;
        line.position.y -= value;
        funcs[5].add(line);
        line = createBorder([[-value,value,0],[value,value,0],[value,-value,0],[-value,-value,0]]);
        funcs[5].add(line);
        // funcs[5].rotation.z = -Math.PI/2;
        funcs[5].position.x += 40;
        funcs[5].position.y += (40+value);
        thiz.scene.add(funcs[5]);
        line = createBorder([[-value,value,0],[value,value,0],[value,-value,0],[-value,-value,0]]);
        line.position.x += 40;
        line.position.y += (40+value);
        border0[5].add(line);


        line = createCurve(8,'#000');
        line.position.x -= 40;
        line.position.y += 40;
        // line.rotation.z = -Math.PI*2/4;
        curve[5].add(line);

        value = 13*rate;
        funcs[6] = new THREE.Group();
        border0[6] = new THREE.Group();
        curve[6] = new THREE.Group();
        line = createCurve(13);
        line.position.x -= value;
        line.position.y -= value;
        funcs[6].add(line);
        line = createBorder([[-value,value,0],[value,value,0],[value,-value,0],[-value,-value,0]]);
        funcs[6].add(line);
        funcs[6].rotation.z = Math.PI/2;
        funcs[6].position.x -= (40+value);
        funcs[6].position.y += 70;
        thiz.scene.add(funcs[6]);
        line =createBorder([[-value,value,0],[value,value,0],[value,-value,0],[-value,-value,0]]);
        line.position.x -= (40+value);
        line.position.y += 70;
        border0[6].add(line);


        line = createCurve(13,'#000');
        line.position.x -= 40;
        line.position.y -= 60;
        line.rotation.z = Math.PI/2;
        curve[6].add(line);

        value = 21*rate;
        funcs[7] = new THREE.Group();
        border0[7] = new THREE.Group();
        curve[7] = new THREE.Group();
        line = createCurve(21);
        line.position.x -= value;
        line.position.y -= value;
        funcs[7].add(line);
        line = createBorder([[-value,value,0],[value,value,0],[value,-value,0],[-value,-value,0]]);
        funcs[7].add(line);
        funcs[7].rotation.z = Math.PI;
        funcs[7].position.x -= 90;
        funcs[7].position.y -= 270;
        thiz.scene.add(funcs[7]);

        line =createBorder([[-value,value,0],[value,value,0],[value,-value,0],[-value,-value,0]]);
        line.position.x  -= 90;
        line.position.y -= 270;
        border0[7].add(line);

        line = createCurve(21,'#000');
        line.position.x += 120;
        line.position.y -= 60;
        line.rotation.z = Math.PI;
        curve[7].add(line);


        value = 34*rate;
        funcs[8] = new THREE.Group();
        border0[8] = new THREE.Group();
        curve[8] = new THREE.Group();
        line = createCurve(34);
        line.position.x -= value;
        line.position.y -= value;
        funcs[8].add(line);
        line = createBorder([[-value,value,0],[value,value,0],[value,-value,0],[-value,-value,0]]);
        funcs[8].add(line);
        funcs[8].rotation.z = -Math.PI/2;
        funcs[8].position.x += 460;
        funcs[8].position.y -= 140;
        thiz.scene.add(funcs[8]);

        line =createBorder([[-value,value,0],[value,value,0],[value,-value,0],[-value,-value,0]]);
        line.position.x += 460;
        line.position.y -= 140;
        border0[8].add(line);

        line = createCurve(34,'#000');
        line.position.x += 120;
        line.position.y += 200;
        line.rotation.z = -Math.PI/2;
        curve[8].add(line);





        for(var i=0;i<funcs.length;i++){
            thiz.scene.add(border0[i]);
            thiz.scene.add(curve[i]);
            curve[i].position.x -= 250;
            curve[i].position.y += 100;
            funcs[i].position.x -= 250;
            funcs[i].position.y += 100;
            border0[i].position.x -= 250;
            border0[i].position.y += 100;
            border0[i].visible =false;
            curve[i].visible =false;
            funcs[i].visible =false;
        }



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
    rangeSlider();
});
function renew(){
    value1 = 1;
    $('.slider1').find('.sliderLeft').css({'width':'0px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
    $('.slider1').find('.xdsoft_slider_label').text('1');
    $('#slider1').attr('value',''+1+'|0');
    $('.turn1').removeClass('on').addClass('off');
    $('.turn1 .span2').text('' +'off');
    value2=0;
    value3=0;
    three.reback();
    rangeSlider();
}



function rangeSlider(){
    $arrayBoxs.text(' ');
    for(var i=1;i<value1+1;i++){
        $($arrayBoxs.eq(i-1)).text(''+arrayBox[i-1]);
    }
    if(value1 == 10 ){
        $($arrayBoxs.eq(10)).text(''+arrayBox[10]);
    }else{
        $($arrayBoxs.eq(11)).text('');
    }

}
//on/off事件
function clickEve1(){
    var dataId = parseInt($(this).attr('data-id'));
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
    }

    if(dataId == 1){
        value2 = !value2;
    }else{
        value3 = !value3;
    }
    three.clickEve();

}

/*全屏事件*/
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
if(isMob){
	$('.turnRight').on('touchstart',clickEve1);
	$('#renew').on('touchstart',renew);
	$('#scale').on('touchstart',scalef);
}else{
	$('.turnRight').on('click',clickEve1);
	$('#renew').on('click',renew);
	$('#scale').on('click',scalef);
}
	




