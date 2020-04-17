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


// 控件区垂直居中
var controlHeight = $("#controlContainer").height();
var conHeight = $(".con").height();
var h2Height = $("#controlContainer h2").height();
var h2MarginTop = parseInt($("#controlContainer h2").css("margin-top"));
var marginTop = (controlHeight - h2Height - h2MarginTop - conHeight - 100)/2;
$(".con").css("margin-top",marginTop);

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

//判断是否支持webGL
var canWebgl = ( function () {
    try {
        var canvas = document.createElement( 'canvas' );
        return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
    } catch ( e ) {
        return false;
    }
} )();

var xM=-1,yM=1,selectobjs=[],selectobj=null,mousedownflag;
var group1 = null;
var threeDimension = {
    //初始化
    init:function(){
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.createAxis();
        threeDimension.createObject();
    },
    //创建场景于相机
    createScene:function(){
        threeDimension.scene = new THREE.Scene();
        threeDimension.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
        threeDimension.camera.position.x = 0;
        threeDimension.camera.position.y = 0;
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
        $("#threeContainer").append(threeDimension.renderer.domElement);

    },
    //定义鼠标控制
    createControls:function(){
        threeDimension.controls = new THREE.OrbitControls( threeDimension.camera, threeDimension.renderer.domElement );
        threeDimension.controls.enableDamping = true;
        threeDimension.controls.dampingFactor = 0.25;
        threeDimension.controls.enableRotate =false;
        threeDimension.controls.enablePan =false;
    },
    vec3:function(x,y,z){
        return new THREE.Vector3(x, y, z);
    },
    createText:function(texts,x,y,z,color,size){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x,y,z);
        return text;
    },
    createAxis:function(){
        threeDimension.axis = new THREE.Group();
        threeDimension.labelAxis(-400, 40, 400);
        threeDimension.drawAxisArrow(threeDimension.vec3( -450, 0, 0 ), threeDimension.vec3( 450, 0, 0 ), 0x000000,1);
        threeDimension.drawAxisArrow(threeDimension.vec3( 0, -450, 0 ), threeDimension.vec3( 0, 450, 0 ), 0x000000,2);
        threeDimension.scene.add( threeDimension.axis);
    },
    //坐标轴分度线
    labelAxis:function (start, stepSize, stop) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={},line=null,vertices=null;
        // label x axis:
        textStyle = {align: textAlign.center, font: '18px "Cambria Math"', fillStyle: 'black', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/40, textStyle);
            text.rotation = threeDimension.camera.rotation;
            if(i==0){
                text.position.x = i+10;
            }
            else{
                text.position.x = i;
            }
            text.position.y = -5;
            threeDimension.axis.add(text);
            vertices = [];

            vertices.push(threeDimension.vec3(i,0,0));
            vertices.push(threeDimension.vec3(i,10,0));

            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);
        }


        // label y axis:
        textStyle = {align: textAlign.center, font: '18px "Cambria Math"', fillStyle: 'black', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            if(i==0){
                continue;
            }
            text = new SpriteText2D(i/40, textStyle);
            text.rotation = threeDimension.camera.rotation;
            text.position.x = -15;
            text.position.y = i+7;
            text.position.z = 0.2;
            threeDimension.axis.add(text);

            vertices = [];
            vertices.push(threeDimension.vec3(0,i,0));
            vertices.push(threeDimension.vec3(10,i,0));

            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);
        }
        threeDimension.axis.add(text);
    },
    //坐标轴
    drawAxisArrow:function(origin, dir,color,style) {
        var geometryLine = new THREE.Geometry();
        var vertices = [];
        vertices.push(origin);
        vertices.push(dir);
        geometryLine.vertices = vertices;
        var line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        threeDimension.axis.add(line);
        var text;
        if(style == 1){
            vertices = [];
            vertices.push(threeDimension.vec3(dir.x-20,5,0));
            vertices.push(threeDimension.vec3(dir.x,0,0));
            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);

            vertices = [];
            vertices.push(threeDimension.vec3(dir.x-20,-5,0));
            vertices.push(threeDimension.vec3(dir.x,0,0));
            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);

            text=threeDimension.createText('x',dir.x,-5,0,'#000',24)
            threeDimension.axis.add(text);

        }else{

            vertices = [];
            vertices.push(threeDimension.vec3(5,dir.y-20,0));
            vertices.push(threeDimension.vec3(0,dir.y,0));
            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);

            vertices = [];
            vertices.push(threeDimension.vec3(-5,dir.y-20,0));
            vertices.push(threeDimension.vec3(0,dir.y,0));
            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);

            text=threeDimension.createText('y',-15,dir.y+10,0,'#000',24)
            threeDimension.axis.add(text);
        }
    },
    createLineMesh:function(vertices, color, style) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        if (style == 1) {
            vertices.push(threeDimension.vec3(vertices[0].x,vertices[0].y-1,vertices[0].z));
            vertices.push(threeDimension.vec3(vertices[1].x,vertices[1].y-1,vertices[1].z));
            vertices.push(threeDimension.vec3(vertices[0].x+1,vertices[0].y,vertices[0].z));
            vertices.push(threeDimension.vec3(vertices[1].x+1,vertices[1].y,vertices[1].z));
            vertices.push(threeDimension.vec3(vertices[0].x-1,vertices[0].y,vertices[0].z));
            vertices.push(threeDimension.vec3(vertices[1].x-1,vertices[1].y,vertices[1].z));
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        } else if(style==2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 7,
                gapSize: 7
            }));
        }else if( style == 3){
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }
        return lineMesh;
    },
    createCircle:function(vertices,radius,color,opacity=1){
        var CircleG = new THREE.CircleGeometry(radius, 50, 0, 2 * Math.PI);
        var CircleM = new THREE.MeshBasicMaterial({color: color,transparent:true,opacity:opacity});
        var Circle = new THREE.Mesh(CircleG, CircleM);
        Circle.position.x = vertices[0]; 
        Circle.position.y = vertices[1];
        Circle.position.z = vertices[2];
        return Circle;
    },

    createObject:function(){
        if(threeDimension.obj!=null){
            threeDimension.scene.remove(threeDimension.obj);
            selectobjs = [];
        }
        threeDimension.obj = new THREE.Group();
        threeDimension.group1 = new THREE.Group();
        var vertices;

        //椭圆
        vertices=[];
        for(var i=-4;i<=4.01;i=i+0.01){
            vertices.push(threeDimension.vec3(i*40,Math.sqrt(9*(1-Math.pow(i/4,2)))*40,1))
        }
        var line1=threeDimension.createLineMesh(vertices,'#1161c8',3)
        vertices=[];
        for(var i=-4;i<=4+0.01;i=i+0.01){
            vertices.push(threeDimension.vec3(i*40,-Math.sqrt(9*(1-Math.pow(i/4,2)))*40,1))
        }
        var line2=threeDimension.createLineMesh(vertices,'#1161c8',3)
        threeDimension.obj.add(line1,line2)

        //M点
        vertices=[];
        vertices.push(xM*40,yM*40,1);
        var M=threeDimension.createCircle([0,0,1],28,'#60b6f1',0)
        M.material.depthTest = false;
        var M1=threeDimension.createCircle([0,0,0],8,'#60b6f1')
        threeDimension.group1.add(M,M1);
        threeDimension.group1.position.set(xM*40,yM*40,1);
        threeDimension.obj.add(threeDimension.group1);

        selectobjs.push(M);

        var textM1=threeDimension.createText('M(x',xM*40+30,yM*40-10,1,'#000',18)
        var text1=threeDimension.createText('0',xM*40+49,yM*40-18,1,'#000',8)
        var textM2=threeDimension.createText(',y',xM*40+60,yM*40-10,1,'#000',18)
        var text2=threeDimension.createText('0',xM*40+69,yM*40-18,1,'#000',8)
        var textM3=threeDimension.createText(')',xM*40+75,yM*40-10,1,'#000',18)
        threeDimension.obj.add(textM1,text1,textM2,text2,textM3)

        var a=81*xM*xM+144*yM*yM;
        var b=-18*xM*(9*xM*xM+16*yM*yM);
        var c=Math.pow(9*xM*xM+16*yM*yM,2)-144*16*yM*yM;        

        if(yM.toFixed(2)==0){
            var x1=xM;
            var y1=Math.sqrt(9*(1-x1*x1/16))
            vertices=[];
            vertices.push(x1*40,y1*40,1);
            var A=threeDimension.createCircle(vertices,8,'#60b6f1');
            threeDimension.obj.add(A);

            var x2=xM
            var y2=-Math.sqrt(9*(1-x1*x1/16))
            vertices=[];
            vertices.push(x2*40,y2*40,1);
            var B=threeDimension.createCircle(vertices,8,'#60b6f1');
            threeDimension.obj.add(B);

            vertices=[];
            vertices.push(threeDimension.vec3(x1*40,y1*40,1));
            vertices.push(threeDimension.vec3(x1*40,y2*40,1));
            var line3=threeDimension.createLineMesh(vertices,'#1161c8',3);
            threeDimension.obj.add(line3);

            $('.title_math2').html('<img src="images/7.png" style="height: 38px;width: auto;margin-top: 23px;margin-left:7px;"/> 不存在')
            $('.turnShade').html('<img src="images/4.png" style="height:40px;width:auto;"/>')
        }else{
            var x1=(-b+Math.sqrt(b*b-4*a*c))/(2*a)
            var y1=(9*xM*xM+16*yM*yM-9*xM*x1)/(16*yM)
            vertices=[];
            vertices.push(x1*40,y1*40,1);
            var A=threeDimension.createCircle(vertices,8,'#60b6f1')
            threeDimension.obj.add(A)

            var x2=(-b-Math.sqrt(b*b-4*a*c))/(2*a)
            var y2=(9*xM*xM+16*yM*yM-9*xM*x2)/(16*yM)
            vertices=[];
            vertices.push(x2*40,y2*40,1);
            var B=threeDimension.createCircle(vertices,8,'#60b6f1')
            threeDimension.obj.add(B)

            vertices=[];
            vertices.push(threeDimension.vec3(x1*40,y1*40,1));
            vertices.push(threeDimension.vec3(x2*40,y2*40,1));
            var line3=threeDimension.createLineMesh(vertices,'#1161c8',3)
            threeDimension.obj.add(line3)
            if(x1.toFixed(1)==-x2.toFixed(1)&&y1.toFixed(1)==y2.toFixed(1)){
                $('.title_math2').html('<img src="images/6.png" style="height: 37px;width: auto;margin-top: 21px;margin-left:2px;"/>')
                $('.turnShade').html('<img src="images/5.png" style="height:40px;width:auto;"/>')
            }else{
                $('.title_math2').html('<img src="images/2.png" style="height: 80px;width: auto;margin-left:5px;"/>')
                $('.turnShade').html('<img src="images/3.png" style="height:80px;width:auto;"/>')
            }
            
        }
        var textA=threeDimension.createText('A('+x1.toFixed(1)+','+y1.toFixed(1)+')',x1*40+50,y1*40+20,1,'#000',18)
        threeDimension.obj.add(textA)

        var textB=threeDimension.createText('B('+x2.toFixed(1)+','+y2.toFixed(1)+')',x2*40-50,y2*40,1,'#000',18)
        threeDimension.obj.add(textB)

        threeDimension.scene.add(threeDimension.obj)
    },
    onDocumentMouseDown:function(event){
        event.preventDefault();
        var mouse={},position={x:0,y:0};;
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
        var intersects = raycaster.intersectObjects(selectobjs);
        if (intersects.length > 0) {
            selectobj = intersects[0].object;
            mousedownflag = true;
        }
    },
    onDocumentMouseMove:function(event){
        event.preventDefault();
        var mouse={},position={x:0,y:0};;
        if(fullScreen){
            position.x =(bodyWidth-threeWidth)/2;
            position.y =(bodyHeight-threeHeight)/2;
        }else{
            position.x =offsetLeft;
            position.y =offsetTop;
        }
        mouse.x = ((event.clientX-position.x) / threeWidth ) * 2 - 1;
        mouse.y = -( (event.clientY-position.y) / threeHeight ) * 2 + 1;
        var intersects = raycaster.intersectObjects( selectobjs );
        raycaster.setFromCamera(mouse, threeDimension.camera);
        if ( intersects.length > 0 ) {
            if ( INTERSECTED != intersects[ 0 ].object ) {
                INTERSECTED = intersects[ 0 ].object;
                plane.setFromNormalAndCoplanarPoint(threeDimension.camera.getWorldDirection( plane.normal ),INTERSECTED.position );
            }
        }
        if(mousedownflag){
            if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                var obj = intersection.sub( offset ),x,y;
                x = obj.x/40
                y = obj.y/40
                if((x*x/16+y*y/9)>1||(x.toFixed(1)==0&&y.toFixed(1)==0)){
                    return false;
                }else{
                    xM=x;
                    yM=y;
                }
                threeDimension.createObject();
            }
        }
    },
    onDocumentMouseUp:function(event){
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;

    },
    onDocumentTouchStart:function(event){
        event.preventDefault();
        
        if (event.touches.length === 1) {
            var mouse={},position={x:0,y:0};;
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
            var intersects = raycaster.intersectObjects(selectobjs);
            if (intersects.length > 0) {
                selectobj = intersects[0].object;
                mousedownflag = true;
            }
        }
    },
    onDocumentTouchMove:function(event){
        event.preventDefault();
        if (event.touches.length === 1) {
            var mouse={},position={x:0,y:0};;
            if(fullScreen){
	            position.x =(bodyWidth-threeWidth)/2;
	            position.y =(bodyHeight-threeHeight)/2;
	        }else{
	            position.x =offsetLeft;
	            position.y =offsetTop;
	        }
            mouse.x = ((event.touches[0].pageX-position.x) / threeWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-position.y) / threeHeight ) * 2 + 1;
            var intersects = raycaster.intersectObjects( selectobjs );
            raycaster.setFromCamera(mouse, threeDimension.camera);
            if ( intersects.length > 0 ) {
                if ( INTERSECTED != intersects[ 0 ].object ) {
                    INTERSECTED = intersects[ 0 ].object;
                    plane.setFromNormalAndCoplanarPoint(threeDimension.camera.getWorldDirection( plane.normal ),INTERSECTED.position );
                }
            }
            if(mousedownflag){
                if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                    var obj = intersection.sub( offset ),x,y;
                    x = obj.x/40
                    y = obj.y/40
                    if((x*x/16+y*y/9)>1){
                        return false;
                    }else{
                        xM=x;
                        yM=y;
                    }
                    threeDimension.createObject();
                }
            }
        }
    },
    onDocumentTouchEnd:function(event){
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;
    }
};


threeDimension.init();

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

var fullScreen=0;
function renew(){
	$('#div1').parent().parent().removeClass('on').addClass('off');
    $('#div1').parent().parent().find('.span2').text('' +'off');
    xM=-1;
    yM=1;
    threeDimension.camera.position.x = 0;
    threeDimension.camera.position.y = 0;
    threeDimension.camera.position.z = 1200;
    threeDimension.createObject();
}
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
function clickEve1(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
    }
}
if(isMob){
	//reset
	$('#renew').on('touchstart',renew);
	//on/off
	$('#div1').on('touchstart',clickEve1);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	//reset
	$('#renew').on('click',renew);
	//on/off
	$('#div1').on('click',clickEve1);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}


