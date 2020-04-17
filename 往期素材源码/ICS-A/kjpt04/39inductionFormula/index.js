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

var value1=30,value2=1,selectFun=0,open=1;



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
    var changeObj=null,line1=null,line2=null,angleObj = null;



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
        this.createAxis();

        var line = new THREE.Group,vertices1=[],vertices2=[];

        for(var i=-5;i<=5.0001;){
            y=Math.sqrt(25 - Math.pow(i,2));
            // if(y<=5&&y>=-5){
            vertices1.push(new THREE.Vector3(i*50, y*50, 0));
            vertices2.push(new THREE.Vector3(i*50, -y*50, 0));
            // }
            i = i+0.01;
        }
        var curve = new THREE.CatmullRomCurve3(vertices1);
        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        var material = new THREE.LineBasicMaterial({color : '#1161c8'});
        var obj = new THREE.Line(geometry, material);
        line.add(obj);

        curve = new THREE.CatmullRomCurve3(vertices2);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : '#1161c8'});
        obj = new THREE.Line(geometry, material);
        line.add(obj);

        thiz.scene.add(line);


        creatLines();
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
        this.clickEve();
        this.rangeChangeEve();
        thiz.camera.position.z = 1700;

    };
    this.rangeChangeEve = function(){
        changePosition();
    };
    this.clickEve = function(){
        createObj();
        if(open == 1){
            changeObj.visible = false;
        }else if(open == 2){
            changeObj.visible = true;
        }
    };
    this.createSphere = function (coordinate, radius,color) {
        var sphereG = new THREE.SphereGeometry(radius, 15, 15, 0, 2 * Math.PI, 0, 2 * Math.PI);
        var sphereM = new THREE.MeshBasicMaterial({color: color,opacity:0.8,transparent:true});
        var sphere = new THREE.Mesh(sphereG, sphereM),x,y;
        // if(angle1===0||angle1){
        //     x = radius*Math.cos(angle1);
        //     y = radius*Math.sin(angle1);
        //     x += coordinate[0];
        //     y += coordinate[1];
        // }else{
        x = coordinate[0];
        y = coordinate[1];
        // }
        sphere.position.x = x;
        sphere.position.y = y;
        sphere.position.z = coordinate[2];
        return sphere;
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

            tex = text('x',30,'#000');
            tex.position.x = (dir.x-20);
            tex.position.y = dir.y-10;
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


            tex = text('y',30,'#000');
            tex.position.x = (dir.x-40);
            tex.position.y = dir.y;
            tex.position.z = 0;
            axisArrow.add(tex);

        }

        thiz.scene.add(axisArrow)
    }

    /****** 其他事件 ******/
    this.createAxis = function(){
        labelAxis(-500, 50, 500);
        drawAxisArrow(vec3( -600, 0, 0 ), vec3( 600, 0, 0 ),1);
        drawAxisArrow(vec3( 0, -600, 0 ), vec3( 0, 600, 0 ),2);
    };

    function labelAxis(start, stepSize, stop) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={},line=null,vertices=null;
        // label x axis:
        textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};
        var start1=-2.0;
        for(var i = start; i <= stop; i = i+stepSize) {
            if(i == 0){
                text = new SpriteText2D(0, textStyle);
                text.position.x = i - 10;

            }else{
                text = new SpriteText2D(start1.toFixed(0), textStyle);
                text.position.x = i;
            }

            text.position.y = -15;
            if(i==0){
                text.position.y = - 10;
            }


            vertices = [];

            vertices.push(new THREE.Vector3(i,0,0));
            vertices.push(new THREE.Vector3(i,10,0));

            line = createLineMesh(vertices,'#000',3);


            if(i == 250||i==-250){
                axis.add(text);
                axis.add(line);
            }



            start1 += 0.2;
        }

        // label y axis:
        start1=-2.0;
        textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for( i = start; i <= stop; i = i+stepSize) {
            if(i == 0){ start1 += 0.2;continue;}
            text = new SpriteText2D(start1.toFixed(0), textStyle);
            text.position.x = -30;
            text.position.y = i+10;
            text.position.z = 0.2;
            vertices = [];
            vertices.push(new THREE.Vector3(0,i,0));
            vertices.push(new THREE.Vector3(-10,i,0));

            line = createLineMesh(vertices,'#000',3);

            if(i == 250||i==-250){
                axis.add(text);
                axis.add(line);
            }

            start1 += 0.2;
        }

        thiz.scene.add(axis);

    }
    function creatLines(){
        var vertices = [],obj=null;
        line1 = new THREE.Group();
        vertices.push(new THREE.Vector3(0,0,0));
        vertices.push(new THREE.Vector3(250,0,0));
        obj = createLineMesh(vertices,'#9013fe',3);
        line1.add(obj);
        obj = thiz.createSphere([250,0,0],10,'#9013fe');
        line1.add(obj);
        thiz.scene.add(line1);
        line2 = new THREE.Group();
        obj = thiz.createSphere([250,0,0],10,'#f55b23');
        line2.add(obj);

        vertices = [];
        vertices.push(new THREE.Vector3(0,0,0));
        vertices.push(new THREE.Vector3(250,0,0));
        obj = createLineMesh(vertices,'#f55b23',3);
        line2.add(obj);
        thiz.scene.add(line2);
        // line2.rotation.z = 30*Math.PI/180+Math.PI/2;
        changePosition();

    }

    function changePosition(){
        var angle = value1,rate = value2,x,y,vertices=[],start,end,radius,step;
        angle =angle*Math.PI/180;
        line1.rotation.z = angle;
        line2.rotation.z = angle + rate*Math.PI/2;
        
        thiz.scene.remove(angleObj);
        angleObj = new THREE.Group();


        vertices.push(new THREE.Vector3(0, 0, 0));
        for(var i=0;i<=angle;){
            x = 0.5*Math.cos(i);
            y = 0.5*Math.sin(i);
            vertices.push(new THREE.Vector3(x*50, y*50, 0));
            i = i+0.1;
        }

        var curve = new THREE.CatmullRomCurve3(vertices);
        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        var material = new THREE.LineBasicMaterial({color : '#9013fe'});
        var obj = new THREE.Line(geometry, material);
        angleObj.add(obj);

        vertices=[];
        angle = angle + rate*Math.PI/2;
        if(angle >= 6.28 || angle <= -6.28){
            step = 0.005;
        }else{
            step = 0;
        }
        radius = 1;
        if(angle >0){
            start=0;
            end = angle;
        }else{
            start = angle;
            end=0;
        }
        vertices.push(new THREE.Vector3(0, 0, 0));
        for(i=start;i<=end;){
            x = radius*Math.cos(i);
            y = radius*Math.sin(i);
            vertices.push(new THREE.Vector3(x*50, y*50, 0));
            i = i+0.1;
            radius += step;
        }

        curve = new THREE.CatmullRomCurve3(vertices);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : '#f55b23'});
        obj = new THREE.Line(geometry, material);
        angleObj.add(obj);

        thiz.scene.add(angleObj);
        createObj();

    }



    function createObj(){
        thiz.scene.remove(changeObj);
        changeObj = new THREE.Group();

        var line=null,x,y,x1,y1,i,angle = value1,rate=value2,vertices = [],position={x:0,y:0};
        angle = angle*Math.PI/180;

        x = 5*Math.cos(angle);
        y = 5*Math.sin(angle);
        x1 = 5*Math.cos(angle+rate*Math.PI/2);
        y1 = 5*Math.sin(angle+rate*Math.PI/2);

        if(selectFun == 1){

            vertices.push(new THREE.Vector3(x*50,y*50,1));
            vertices.push(new THREE.Vector3(x*50,0,1));
            line = createLineMesh(vertices,'#d0021b',3);
            changeObj.add(line);

            vertices=[];
            vertices.push(new THREE.Vector3(x1*50,y1*50,1));
            vertices.push(new THREE.Vector3(x1*50,0,1));
            line = createLineMesh(vertices,'#d0021b',3);
            changeObj.add(line);


        }else if(selectFun == 2){

            vertices.push(new THREE.Vector3(x*50,y*50,1));
            vertices.push(new THREE.Vector3(x*50,0,1));
            line = createLineMesh(vertices,'#7ed321',2);
            changeObj.add(line);

            vertices=[];
            vertices.push(new THREE.Vector3(0,0,1));
            vertices.push(new THREE.Vector3(x*50,0,1));
            line = createLineMesh(vertices,'red',3);
            changeObj.add(line);

            vertices=[];
            vertices.push(new THREE.Vector3(x1*50,y1*50,1));
            vertices.push(new THREE.Vector3(x1*50,0,1));
            line = createLineMesh(vertices,'#7ed321',2);
            changeObj.add(line);

            vertices=[];
            vertices.push(new THREE.Vector3(0,0,1));
            vertices.push(new THREE.Vector3(x1*50,0,1));
            line = createLineMesh(vertices,'red',3);
            changeObj.add(line);

        }else if(selectFun == 3){
            if(x1 >0){position.x = 5;}else{position.x = -5;}
            position.y = 5*Math.tan(angle+rate*Math.PI/2);
            if(x1 <0){position.y = -position.y;}

            vertices=[];
            vertices.push(new THREE.Vector3(position.x*50,0,1));
            vertices.push(new THREE.Vector3(position.x*50,position.y*50,1));
            line = createLineMesh(vertices,'red',3);
            changeObj.add(line);

            vertices=[];
            vertices.push(new THREE.Vector3(position.x*50,position.y*50,1));
            vertices.push(new THREE.Vector3(x1*50,y1*50,1));
            line = createLineMesh(vertices,'#f55b23',2);
            changeObj.add(line);

            if(rate%2!= 0){

                if((x1 >0 && x< 0)|| (x1 <0 && x> 0) ){ //符号不一样
                    position.y = 5*Math.tan(angle+Math.PI);
                    if(position.x<0){position.y = -position.y;}
                    vertices=[];
                    vertices.push(new THREE.Vector3(0,0,1));
                    vertices.push(new THREE.Vector3(position.x*50,position.y*50,1));
                    line = createLineMesh(vertices,'#9013fe',2);
                    changeObj.add(line);

                    vertices=[];
                    vertices.push(new THREE.Vector3(position.x*50,position.y*50,1));
                    vertices.push(new THREE.Vector3(position.x*50,0,1));
                    line = createLineMesh(vertices,'red',3);
                    changeObj.add(line);

                }else{//符号一样
                    position.y = 5*Math.tan(angle);
                    if(y > 0){ position.y = Math.abs(position.y) }else{ position.y = -Math.abs(position.y)}

                    vertices=[];
                    vertices.push(new THREE.Vector3(position.x*50,0,1));
                    vertices.push(new THREE.Vector3(position.x*50,position.y*50,1));
                    line = createLineMesh(vertices,'red',3);
                    changeObj.add(line);

                    vertices=[];
                    vertices.push(new THREE.Vector3(position.x*50,position.y*50,1));
                    vertices.push(new THREE.Vector3(x*50,y*50,1));
                    line = createLineMesh(vertices,'#9013fe',2);
                    changeObj.add(line);

                }


            }

        }else{

        }

        thiz.scene.add(changeObj);


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

$('#slider1').change(function(){
    var result = $(this).val();
    value1 =parseFloat(result.split('|')[0])*5;
    three.rangeChangeEve();
});
$('#slider2').change(function(){
    var result = $(this).val();
    var value = parseFloat(result.split('|')[0]);
    value2 = value;
    three.rangeChangeEve();
});

function renew(){
    value1=30;value2=1;selectFun=0;open=1;
    rangeBack();
    $('.turn1').removeClass('on').addClass('off');
    three.reback();
}

//on/off事件
function clickEve1(){
    var dataId =  parseInt($(this).attr('data-id'));
    if($(this).parent().parent().hasClass('on')){
        open =  1;//关闭
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        open =  2;//打开
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        if(dataId != 4){
            selectFun = dataId;
            $(this).parent().parent().siblings().removeClass('on').addClass('off');
            $(this).parent().parent().siblings().find('.span2').text('' +'off');
        }
        
    }
    
    
    three.clickEve();
}


function rangeBack(){
    value1=30;
    $('.slider1').find('.sliderLeft').css({'width':'34px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'34px'});
    $('.slider1').find('.xdsoft_slider_label').text('30°');
    $('#slider1').attr('value',''+6+'|0');
    value2=1;
    $('.slider2').find('.sliderLeft').css({'width':'239px'});
    $('.slider2').find('.xdsoft_range2dslider_runner').css({'left':'239px'});
    $('.slider2').find('.xdsoft_slider_label').text('1');
    $('#slider2').attr('value',''+1+'|0');
    $('.turnRight').parent().parent().find('.span2').text('' +'off');
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
	$('#renew').on('touchstart',renew);
	$('.turnRight').on('touchstart',clickEve1);
	$('#scale').on('touchstart',scalef);
}else{
	$('#renew').on('click',renew);
	$('.turnRight').on('click',clickEve1);
	$('#scale').on('click',scalef);
}
	




