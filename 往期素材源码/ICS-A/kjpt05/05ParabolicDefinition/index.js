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
var p=2;
var demo=0;
var line1=null,line2=null,line3=null,dashline1=null,dashline2=null,dashline3=null,dashline4=null;
var sphere1=null,sphereM1=null,sphereM2=null;
var text1=null,text2=null,text3=null,text4=null,texth1=null,texth2=null,texth3=null,textk=null,textl=null;
var selectobjs=[],selectobj=null,mousedownflag;
var a1=null;


function ThreeDimensional() {
    var mousedownflag = false;
    var thiz = this;
    var selectobjs=[],selectobj=null;



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
        this.camera.position.z = 1400;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);
        this.createControls();

        this.createAxis();
        this.createLine();
        this.createsphereF();
        this.createsphereM();

    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate =false;
        this.controls.enablePan =false;
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
        var text = new SpriteText2D(font, textStyle);
        return text;
    }
    function createText(texts,x,y,z,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '25px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.position.set(x,y,z);
        return text;
    }
    function cretaeTriangleFace(vertices,color){
        var material = new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:0.8});
        var geom = new THREE.Geometry();
        geom.faces.push(new THREE.Face3(0,1,2),new THREE.Face3(2,1,0));
        geom.vertices = vertices;
        var mesh = new THREE.SceneUtils.createMultiMaterialObject(geom,[material]);
        return mesh;
    }
    function drawAxisArrow(origin, dir,style){
        var vertices = [];
        vertices.push(new THREE.Vector3(origin.x,origin.y,origin.z));
        vertices.push(new THREE.Vector3(dir.x,dir.y,dir.z));
        var line = createLineMesh(vertices,'#000',3);
        axisArrow.add(line);

        if(style == 1){
            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,-5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);
        }else{
            vertices = [];
            vertices.push(new THREE.Vector3(5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(-5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);
        }
    }
    function labelAxis(startx, stepSizex, stopx, starty, stepSizey, stopy) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var text={};
        // label x axis:
        var textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for(var i = startx; i <= stopx; i = i+stepSizex) {
            if(i==0){
                continue;
            }
             text = new SpriteText2D(i/stepSizex, textStyle);
             text.position.x = i;
             text.position.y = -10;
             axis.add(text);

            var vertices = [];
            vertices.push(new THREE.Vector3(i,0,0));
            vertices.push(new THREE.Vector3(i,10,0));
            var line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        text = new SpriteText2D('x', textStyle);
        text.position.x = stopx+30;
        text.position.y = -20;
        axis.add(text);

        // label y axis:
        textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for( i = starty; i <= stopy; i = i+stepSizey) {
            //if(i == 0){ continue;}
             text = new SpriteText2D(i/stepSizey, textStyle);
             text.position.x = -20;
             text.position.y = i;
             text.position.z = 0.2;
             axis.add(text);

            vertices = [];
            vertices.push(new THREE.Vector3(0,i,0));
            vertices.push(new THREE.Vector3(-10,i,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        text = new SpriteText2D('y', textStyle);
        text.position.x = -30;
        text.position.y = stopy+30;
        axis.add(text);
    }
    function createCircle(vertices,radius,color,opacity=1){
        var CircleG = new THREE.CircleGeometry(radius, 50, 0, 2 * Math.PI);
        var CircleM = new THREE.MeshBasicMaterial({color: color,transparent:true,opacity:opacity});
        var Circle = new THREE.Mesh(CircleG, CircleM);
        Circle.position.x = vertices[0];
        Circle.position.y = vertices[1];
        Circle.position.z = vertices[2];
        return Circle;
    }

    /****** 其他事件 ******/
    this.createAxis = function(){
        labelAxis(-400,50,400,-400,50,400);
        drawAxisArrow(vec3( -420, 0, 0 ), vec3( 440, 0, 0 ),1);
        drawAxisArrow(vec3( 0, -420, 0 ), vec3( 0, 440, 0 ),2);
        this.scene.add(axisArrow,axis);
    };
    this.createFixedText = function(){
        var x = text("x",30,"#000000");
        var y = text("y",30,"#000000");
        var o = text("O",34,"#000000");
        x.position.set(500,-5,0);
        y.position.set(-15,500,0);
        o.position.set(-15,-10,0);
        this.scene.add(x,y,o);
    };
    this.createLine=function(){
        if(line1!=null){
            this.scene.remove(line1,line2,line3,dashline1,dashline2,dashline3,dashline4,texth3,textk,textl);
        }
        if(texth1!=null){
            this.scene.remove(texth1,texth2);
        }
        var point1=[];
        var num=((p/2)+6)/100;
        var resultx=0;
        var resulty=0;

        line1 = new THREE.Object3D();
        line2 = new THREE.Object3D();
        line3 = new THREE.Object3D();

        //准线
        var vertices2=[];
        vertices2.push(vec3((-p/2)*50,400,0));
        vertices2.push(vec3((-p/2)*50,-400,0));
        var geometryLine2 = new THREE.Geometry();
        geometryLine2.vertices = vertices2;
        line3 = new THREE.LineSegments(geometryLine2, new THREE.LineBasicMaterial({color: 0x1161c8}));
        this.scene.add(line3);

        texth3=createText("H",-p*25-30,350,0,"#000000");
        textk=createText("K",-p*25-30,-30,0,"#000000");
        textl=createText("l",-p*25-30,-350,0,"#000000");
        this.scene.add(texth3,textk,textl);


        //抛物线
        for(var i=num*demo;i>=0;i-=0.01){
            resulty=Math.pow((2*p*i),1/2);
            point1.push(new THREE.Vector3(i*50,resulty*50,0));
        }
        for(var k=0;k<=num*demo;k+=0.01){
            resulty=Math.pow((2*p*k),1/2);
            point1.push(new THREE.Vector3(k*50,-resulty*50,0));
        }
        var curve1 = new THREE.CatmullRomCurve3(point1);
        var geometry1 = new THREE.Geometry();
        geometry1.vertices = curve1.getPoints(1000);
        var material1 = new THREE.LineBasicMaterial({color : 0x1161c8});
        line1 = new THREE.Line(geometry1, material1);

        this.scene.add(line1);

        if(demo==0){
            return;
        }
        //虚线
        resultx=num*demo;
        resulty=Math.pow((2*p*(num)*demo),1/2);

        texth1=createText("H",-30,resulty*50,0,"#000000");
        texth2=createText("H",-30,-resulty*50,0,"#000000");
        this.scene.add(texth1,texth2);

        var vertices1=[];
        vertices1.push(vec3(resultx*50,resulty*50,-1));
        vertices1.push(vec3(p*25,0,-1));
        var geometryLine1 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        geometryLine1.computeLineDistances();
        dashline1 = new THREE.Line(geometryLine1,new THREE.LineDashedMaterial( { color: 0xff0000,opacity:0.9, dashSize: 5, gapSize: 5 } ));
        this.scene.add(dashline1);

        vertices1=[];
        vertices1.push(vec3(resultx*50,-resulty*50,-1));
        vertices1.push(vec3(p*25,0,-1));
        geometryLine1 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        geometryLine1.computeLineDistances();
        dashline2 = new THREE.Line(geometryLine1,new THREE.LineDashedMaterial( { color: 0xff0000,opacity:0.9, dashSize: 5, gapSize: 5 } ));
        this.scene.add(dashline2);

        vertices1=[];
        vertices1.push(vec3(resultx*50,resulty*50,-1));
        vertices1.push(vec3(-p*25,resulty*50,-1));
        geometryLine1 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        geometryLine1.computeLineDistances();
        dashline3 = new THREE.Line(geometryLine1,new THREE.LineDashedMaterial( { color: 0xff0000,opacity:0.9, dashSize: 5, gapSize: 5 } ));
        this.scene.add(dashline3);

        vertices1=[];
        vertices1.push(vec3(resultx*50,-resulty*50,-1));
        vertices1.push(vec3(-p*25,-resulty*50,-1));
        geometryLine1 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        geometryLine1.computeLineDistances();
        dashline4 = new THREE.Line(geometryLine1,new THREE.LineDashedMaterial( { color: 0xff0000,opacity:0.9, dashSize: 5, gapSize: 5 } ));
        this.scene.add(dashline4);


    };
    var group1 = null;
    this.createsphereF=function(){
        if(group1!=null){
            this.scene.remove(sphere1,group1);
            this.scene.remove(text1);
            selectobjs = [];
        }
        group1 = new THREE.Group();

        var vertices1=[];
        vertices1.push(p*25,0,1);
        sphere1=createCircle([0, 0, 1],30,'#65B2EE',0);
               sphere1.material.depthTest = false;
               var sphere11=createCircle([0, 0, 0],10,'#65B2EE');
               sphere1.name="p1";
               selectobjs.push(sphere1);
               group1.add(sphere1, sphere11);
               group1.position.set(p*25,0,1);

        text1=createText("F",p*25,30,0,"#000000");

        this.scene.add(group1,text1);
    };
    this.createsphereM=function(){
        if(sphereM1!=null){
            this.scene.remove(sphereM1);
            this.scene.remove(sphereM2);
            this.scene.remove(text3);
            this.scene.remove(text4);
        }
        var num=((p/2)+6)/100;
        var resultx=num*demo;
        var resulty=Math.pow((2*p*(num)*demo),1/2);
        var vertices1=[];
        vertices1.push(resultx*50,resulty*50,1);
        sphereM1=createCircle(vertices1,10,'#F55B23');
        var vertices2=[];
        vertices2.push(resultx*50,-resulty*50,1);
        sphereM2=createCircle(vertices2,10,'#F55B23');

        text3=createText("M",resultx*50,resulty*50+30,0,"#000000");
        text4=createText("M",resultx*50,-resulty*50+30,0,"#000000");
        if(demo==0){
            this.scene.add(sphereM1,text3);
        }else{
            this.scene.add(sphereM1,sphereM2,text3,text4);
        }
    };
    this.dynamic=function(){
        demo=0;
        if(a1!=null){
            clearInterval(a1);
        }
        a1=setInterval(function(){
            if(demo>100){
                clearInterval(a1);
                return;
            }
            $('.slider1').find('.sliderLeft').css({'width':(demo*41/10)+'px'});
            $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':(demo*41/10)+'px'});
            $('.slider1').find('.xdsoft_slider_label').text(demo/10);
            $('.slider1').attr('value',''+demo+'|0');
            thiz.createLine();
            thiz.createsphereM();
            demo++;
        },20)
    };


    this.onDocumentMouseDown=function(){
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
        raycaster.setFromCamera(mouse, thiz.camera);
        var intersects = raycaster.intersectObjects(selectobjs);
        if (intersects.length > 0) {
            selectobj = intersects[0].object;
            // console.log(selectobj.name);
            mousedownflag = true;
        }
    };
    this.onDocumentMouseMove=function(){
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
        var intersects = raycaster.intersectObjects( selectobjs );
        raycaster.setFromCamera(mouse, thiz.camera);
        if ( intersects.length > 0 ) {
            if ( INTERSECTED != intersects[ 0 ].object ) {
                INTERSECTED = intersects[ 0 ].object;
                plane.setFromNormalAndCoplanarPoint(thiz.camera.getWorldDirection( plane.normal ),INTERSECTED.position );
            }
        }
        if(mousedownflag){
            if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                var obj = intersection.sub( offset ),x,y;
                x = Math.round(obj.x/50);
                y = Math.round(obj.y/50);
                if(x>8){
                    x=8;
                }
                if(x<1){
                    x=1
                }
                if(selectobj.name=='p1'){
                    p=2*x;
                }
                thiz.createsphereF();
                thiz.createsphereM();
                thiz.createLine();
            }
        }
    };
    this.onDocumentMouseUp=function(){
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;
    };
    this.onDocumentTouchStart=function(){
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
            raycaster.setFromCamera(mouse, thiz.camera);
            var intersects = raycaster.intersectObjects(selectobjs);
            if (intersects.length > 0) {
                selectobj = intersects[0].object;
                mousedownflag = true;
            }
        }
    };
    this.onDocumentTouchMove=function(){
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
            var intersects = raycaster.intersectObjects( selectobjs );
            raycaster.setFromCamera(mouse, thiz.camera);
            if ( intersects.length > 0 ) {
                if ( INTERSECTED != intersects[ 0 ].object ) {
                    INTERSECTED = intersects[ 0 ].object;
                    plane.setFromNormalAndCoplanarPoint(thiz.camera.getWorldDirection( plane.normal ),INTERSECTED.position );
                }
            }
            if(mousedownflag){
                if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                    var obj = intersection.sub( offset ),x,y;
                    x = Math.round(obj.x/50);
                    y = Math.round(obj.y/50);
                    if(x>8){
                        x=8;
                    }
                    if(x<1){
                        x=1
                    }
                    if(selectobj.name=='p1'){
                        p=2*x;
                    }
                    thiz.createsphereF();
                    thiz.createsphereM();
                    thiz.createLine();
                }
            }
        }
    };
    this.onDocumentTouchEnd=function(){
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;
    };
}


var three = new ThreeDimensional();
three.int();

renderAll();
function renderAll(){
    three.controls.update();
    requestAnimationFrame(renderAll);
    three.renderer.render(three.scene,three.camera);
}

//鼠标点击，选中顶点
three.renderer.domElement.addEventListener( 'mousedown', three.onDocumentMouseDown, false );
three.renderer.domElement.addEventListener( 'mouseup', three.onDocumentMouseUp, false );
three.renderer.domElement.addEventListener( 'mousemove', three.onDocumentMouseMove, false );
three.renderer.domElement.addEventListener( 'touchstart', three.onDocumentTouchStart, false );
three.renderer.domElement.addEventListener( 'touchmove', three.onDocumentTouchMove, false );
three.renderer.domElement.addEventListener( 'touchend', three.onDocumentTouchEnd, false );





$("#slider1").change(function(){
    var s1=parseInt(this.value);
    demo=s1;
    three.createsphereM();
    three.createLine();
});

function reset(){
    three.camera.position.z = 1400;
    demo=0;
    p=2;
    if(a1!=null){
        clearInterval(a1);
    }
    three.createLine();
    three.createsphereF();
    three.createsphereM();
    $('.slider1').find('.sliderLeft').css({'width':'0px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
    $('.slider1').find('.xdsoft_slider_label').text('0');
    $('.slider1').attr('value',''+0+'|0');

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
    }else{
        fullScreen = 1;
        $('#scale img').attr('src','images/icon/back.png');
        $obj.css({'left':0,'top':0,'right':0,'bottom':0,'border-radius':'0'});
        $('canvas').css({'position':'absolute','left':(bodyWidth-threeWidth)/2,'top':(bodyHeight-threeHeight)/2});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','hidden');
    }
}
if(isMob){
    //重置
    $("#renew").on('touchstart',reset);
    //动态绘制
    $('.dynamic').on('touchstart',three.dynamic);
    /*全屏事件*/
    $('#scale').on('touchstart',scalef);
}else{
    //重置
    $("#renew").on('click',reset);
    //动态绘制
    $('.dynamic').on('click',three.dynamic);
    /*全屏事件*/
    $('#scale').on('click',scalef);
}





