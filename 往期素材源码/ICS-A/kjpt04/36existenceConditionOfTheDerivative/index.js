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

var value1=0,value2=0,$daoshu = $('.daoshu'),$isOk = $('.isOk'),$changeImg = $('.changeImg'),clickFun=1,selectFun=1;



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
    var funcs=[],tangentObj=null;



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
        createFun();
        this.clickEve();
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
        thiz.camera.position.z = 1700;
    };
    this.rangeChangeEve = function(){

        createTangent();
    };
    this.clickEve = function(){
        funcs[0].visible =false;
        funcs[1].visible =false;
        funcs[2].visible =false;

        funcs[selectFun-1].visible = true;

        createTangent();

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


            tex = text('f(x)',30,'#000');
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
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/stepSize, textStyle);

            if(i == 0){
                text.position.x = i - 10;
            }else{
                text.position.x = i;
            }

            text.position.y = -15;
            axis.add(text);

            vertices = [];

            vertices.push(new THREE.Vector3(i,0,0));
            vertices.push(new THREE.Vector3(i,10,0));

            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }

        // label y axis:
        textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for( i = start; i <= stop; i = i+stepSize) {
            if(i == 0){ continue;}
            text = new SpriteText2D(i/stepSize, textStyle);
            text.position.x = -30;
            text.position.y = i+10;
            text.position.z = 0.2;
            axis.add(text);

            vertices = [];

            vertices.push(new THREE.Vector3(0,i,0));
            vertices.push(new THREE.Vector3(-10,i,0));

            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }

        thiz.scene.add(axis);
    }

    function createFun(){
        var line,vertices=[],i,y;
        funcs[0] = new THREE.Group();
        for(i=-10;i<=0;){
            y=Math.pow(i,-1);
            if(y<=10&&y>=-10){
                vertices.push(new THREE.Vector3(i*50, y*50, 0));
            }
            i = i+0.01;
        }

        var curve = new THREE.CatmullRomCurve3(vertices);
        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        var material = new THREE.LineBasicMaterial({color : '#d0021b'});
        line = new THREE.Line(geometry, material);
        funcs[0].add(line);

        vertices=[];
        for(i=0;i<=10;){
            y=Math.pow(i,-1);
            if(y<=10&&y>=-10){
                vertices.push(new THREE.Vector3(i*50, y*50, 0));
            }
            i = i+0.01;
        }

        curve = new THREE.CatmullRomCurve3(vertices);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : '#d0021b'});
        line = new THREE.Line(geometry, material);
        funcs[0].add(line);

        vertices=[];
        funcs[1] = new THREE.Group();
        for(i=-10;i<=0;){
            y=Math.pow(5,i)-1;
            if(y<=10&&y>=-10){
                vertices.push(new THREE.Vector3(i*50, y*50, 0));
            }
            i = i+0.01;
        }

        curve = new THREE.CatmullRomCurve3(vertices);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : '#d0021b'});
        line = new THREE.Line(geometry, material);
        funcs[1].add(line);

        vertices=[];
        for(i=0;i<=10;){
            y=Math.pow(1.5,i);
            if(y<=10&&y>=-10){
                vertices.push(new THREE.Vector3(i*50, y*50, 0));
            }
            i = i+0.01;
        }

        curve = new THREE.CatmullRomCurve3(vertices);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : '#d0021b'});
        line = new THREE.Line(geometry, material);
        funcs[1].add(line);


        vertices=[];
        funcs[2] = new THREE.Group();
        for(i=-10;i<=0;){
            y=Math.pow(5,i);
            if(y<=10&&y>=-10){
                vertices.push(new THREE.Vector3(i*50, y*50, 0));
            }
            i = i+0.01;
        }

        curve = new THREE.CatmullRomCurve3(vertices);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : '#d0021b'});
        line = new THREE.Line(geometry, material);
        funcs[2].add(line);

        vertices=[];
        for(i=0;i<=10;){
            y=Math.pow(1.5,i);
            if(y<=10&&y>=-10){
                vertices.push(new THREE.Vector3(i*50, y*50, 0));
            }
            i = i+0.01;
        }

        curve = new THREE.CatmullRomCurve3(vertices);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : '#d0021b'});
        line = new THREE.Line(geometry, material);
        funcs[2].add(line);


         thiz.scene.add(funcs[0]);
        thiz.scene.add(funcs[1]);
        thiz.scene.add(funcs[2]);
        funcs[1].visible = funcs[2].visible = false;

    }
    function createTangent(){
        thiz.scene.remove(tangentObj);
        tangentObj = new THREE.Group();
        var line=null,vertices=[],x,y,angle;
        vertices = [];
        vertices.push(new THREE.Vector3(-8*50,0,0));
        vertices.push(new THREE.Vector3(8*50,0,0));
        line = createLineMesh(vertices,'#1161c8',3);
        x = value1;
        if(selectFun == 1){
            if(value1 != 0){
                y = -1*Math.pow(x,-2);
                angle = Math.atan(y);
                line.rotation.z = angle;
                y = Math.pow(x,-1);
                line.position.x = x*50;
                line.position.y = y*50;
                tangentObj.add(line);
                value2 = 1;

                line = thiz.createSphere([x*50,y*50,0],12,'#60b6f1');
                tangentObj.add(line);
            }else {
                value2 = 0;
            }
        }else if(selectFun == 2){

            if(x>=0){
                y = Math.log(1.5)*Math.pow(1.5,x);
                angle = Math.atan(y);
                line.rotation.z = angle;
                y = Math.pow(1.5,x);
                line.position.x = x*50;
                line.position.y = y*50;
                tangentObj.add(line);
                value2 = 1;
            }else{
                y =Math.log(5)*Math.pow(5,x);
                angle = Math.atan(y);
                line.rotation.z = angle;
                y = Math.pow(5,x)-1;
                line.position.x = x*50;
                line.position.y = y*50;
                tangentObj.add(line);
                value2 = 1;
            }

            line = thiz.createSphere([x*50,y*50,0],12,'#60b6f1');
            tangentObj.add(line);

            if(x==0){
                vertices = [];
                vertices.push(new THREE.Vector3(-8*50,0,0));
                vertices.push(new THREE.Vector3(8*50,0,0));
                line = createLineMesh(vertices,'#f39800',3);
                y =Math.log(5)*Math.pow(5,x);
                angle = Math.atan(y);
                line.rotation.z = angle;
                y = Math.pow(5,x)-1;
                line.position.x = x*50;
                line.position.y = y*50;
                tangentObj.add(line);
                value2 = 0;

                line = thiz.createSphere([x*50,y*50,0],12,'#60b6f1');
                tangentObj.add(line);
            }

        }else if(selectFun == 3){

            if(x>=0){
                y = Math.log(1.5)*Math.pow(1.5,x);
                angle = Math.atan(y);
                line.rotation.z = angle;
                y = Math.pow(1.5,x);
                line.position.x = x*50;
                line.position.y = y*50;
                tangentObj.add(line);
                value2 = 1;
            }else{
                y =Math.log(5)*Math.pow(5,x);
                angle = Math.atan(y);
                line.rotation.z = angle;
                y = Math.pow(5,x);
                line.position.x = x*50;
                line.position.y = y*50;
                tangentObj.add(line);
                value2 = 1;
            }

            line = thiz.createSphere([x*50,y*50,0],12,'#60b6f1');
            tangentObj.add(line);

            if(x==0){
                vertices = [];
                vertices.push(new THREE.Vector3(-8*50,0,0));
                vertices.push(new THREE.Vector3(8*50,0,0));
                line = createLineMesh(vertices,'#f39800',3);
                y =Math.log(5)*Math.pow(5,x);
                angle = Math.atan(y);
                line.rotation.z = angle;
                y = Math.pow(5,x);
                line.position.x = x*50;
                line.position.y = y*50;
                tangentObj.add(line);
                value2 = 0;
            }

        }

        thiz.scene.add(tangentObj);
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
    rangeBack();
    selectFun=1;
    value2=0;
    $changeImg.attr('src',"images/9.png");
    three.reback();
    rangeSlider();
    $('.dynamic').removeClass('selected');
    $('.select1').addClass('selected');
}

function rangeSlider(){
    $daoshu.text(''+value1);
    if(value2){
        $isOk.text('可导');
    }else{
        $isOk.text('不可导');
    }
}
function dynamic(){
    var dataId = parseInt($(this).attr('data-id'));
    selectFun = dataId;
    rangeBack();
    value2=0;
    rangeSlider();
    if(dataId == 1){
        $changeImg.attr('src',"images/9.png");
    }else if(dataId == 2){
        $changeImg.attr('src',"images/10.png");
    }else if(dataId == 3){
        $changeImg.attr('src',"images/11.png");
    }
    three.clickEve();
    $('.dynamic').removeClass('selected');
    $(this).addClass('selected');
}
function rangeBack(){
    value1=0;
    $('.slider1').find('.sliderLeft').css({'width':'205px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'205px'});
    $('.slider1').find('.xdsoft_slider_label').text('0');
    $('#slider1').attr('value',''+0+'|0');
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
	$('#scale').on('touchstart',scalef);
	$('#renew').on('touchstart',renew);
	$('.dynamic').on('touchstart',dynamic);
}else{
	$('#scale').on('click',scalef);
	$('#renew').on('click',renew);
	$('.dynamic').on('click',dynamic);
}



