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
var a1=2,a2=1,b1=-1,b2=-1,c1=-2,c2=0;
var line1=null;
var line2=null;
var dashline1=null;
var dashline2=null;
var sphere1=null;
var text1=null;
var textgroup=null;
var textgroup1=null;

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
        this.createSphere();
        this.createPlane();
        this.showfangchen1();
        this.showfangchen2();

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
        text.position.x = stopx+25;
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
    function createMesh(geom,color){//对象和材质融合，创建路径对象
        var wireFrameMat = new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:0.6});
        var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [ wireFrameMat]);
        return mesh;
    }

    /****** 其他事件 ******/
    this.createAxis = function(){
        labelAxis(-500,50,500,-500,50,500);
        drawAxisArrow(vec3( -520, 0, 0 ), vec3( 540, 0, 0 ),1);
        drawAxisArrow(vec3( 0, -520, 0 ), vec3( 0, 540, 0 ),2);
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
            this.scene.remove(line1);
            this.scene.remove(line2);
        }
        line1=new THREE.Object3D();
        line2=new THREE.Object3D();
        var vertices1=[];
        var vertices2=[];
        vertices1.push(vec3(-1000,((-a1/b1)*(-20)-(c1/b1))*50,0));
        vertices1.push(vec3(1000,((-a1/b1)*20-(c1/b1))*50,0));
        vertices2.push(vec3(-1000,((-a2/b2)*(-20)-(c2/b2))*50,0));
        vertices2.push(vec3(1000,((-a2/b2)*20-(c2/b2))*50,0));
        var geometryLine1 = new THREE.Geometry();
        var geometryLine2 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        geometryLine2.vertices = vertices2;
        var linemesh1 = new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: 0x60B6F1}));
        var text1=createText("l1",320,((-a1/b1)*6-(c1/b1))*50,0,"#000000");
        var linemesh2 = new THREE.LineSegments(geometryLine2, new THREE.LineBasicMaterial({color: 0X7ED321}));
        var text2=createText("l2",320,((-a2/b2)*6-(c2/b2))*50,0,"#000000");
        line1.add(linemesh1,text1);
        line2.add(linemesh2,text2);
        this.scene.add(line1);
        this.scene.add(line2);
    };
    this.createSphere=function(){
        if(sphere1!=null){
            this.scene.remove(sphere1);
            this.scene.remove(dashline1);
            this.scene.remove(dashline2);
            this.scene.remove(text1);
        }
        if(a1*b2==a2*b1){
            return;
        }
        var resultx=((b2*c1)/b1-c2)/(a2-(b2*a1)/b1);
        var resulty=(-a1*resultx)/b1-(c1/b1);
        var sphereG = new THREE.SphereGeometry(10, 50, 50, 0, 2 * Math.PI, 0, 2 * Math.PI);
        var sphereM = new THREE.MeshBasicMaterial({color: '#F55B23'});
        sphere1= new THREE.Mesh(sphereG, sphereM);
        sphere1.position.x = resultx*50;
        sphere1.position.y = resulty*50;
        this.scene.add(sphere1);

        var geometryLine1 = new THREE.Geometry();
        var geometryLine2 = new THREE.Geometry();
        var vertices1 = [];
        var vertices2 = [];
        vertices1.push(vec3(0,resulty*50,0));
        vertices1.push(vec3(resultx*50,resulty*50,0));
        vertices2.push(vec3(resultx*50,0,0));
        vertices2.push(vec3(resultx*50,resulty*50,0));
        geometryLine1.vertices = vertices1;
        geometryLine1.computeLineDistances();
        geometryLine2.vertices = vertices2;
        geometryLine2.computeLineDistances();
        dashline1 = new THREE.Line(geometryLine1,new THREE.LineDashedMaterial( { color: 0x000000,opacity:0.9, dashSize: 5, gapSize: 5 } ));
        dashline2 = new THREE.Line(geometryLine2,new THREE.LineDashedMaterial( { color: 0x000000,opacity:0.9, dashSize: 5, gapSize: 5 } ));
        this.scene.add(dashline1,dashline2);


        if(resultx.toString().length>2){
            var num1=parseFloat(resultx).toFixed(1);
        }
        else{
            var num1=resultx;
        }
        if(resulty.toString().length>2){
            var num2=parseFloat(resulty).toFixed(1);
        }
        else{
            var num2=resulty;
        }
        text1=createText("P("+num1+","+num2+")",resultx*50+80,resulty*50+30,0,"#000000");
        this.scene.add(text1);


    };
    this.createPlane=function(){
        var shape1 = new THREE.Shape();
        shape1.moveTo(340,500);
        shape1.lineTo(340,540);
        shape1.lineTo(380,540);
        shape1.lineTo(380,500);
        var plane1 =createMesh(new THREE.ShapeGeometry(shape1),0x60B6F1);
        plane1.position.z = 1;
        this.scene.add(plane1);

        var shape2 = new THREE.Shape();
        shape2.moveTo(340,430);
        shape2.lineTo(340,470);
        shape2.lineTo(380,470);
        shape2.lineTo(380,430);
        var plane2 =createMesh(new THREE.ShapeGeometry(shape2),0X7ED321);
        plane2.position.z = 1;
        this.scene.add(plane2);
    };
    this.showfangchen1=function(){
        if(textgroup!=null){
            this.scene.remove(textgroup);
        }
        var a=a1;
        var b=b1;
        var c=c1,text=null;
        textgroup=new THREE.Group();


        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = null;
        var position=0;

        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
        text = new SpriteText2D('l1:', textStyle);
        text.position.x = 0;
        textgroup.add(text);
        position+=50;

        if(a!=0){
            if(a==1){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('x', textStyle);
                text.position.x = position;
                textgroup.add(text);
                position+=35;
            }
            else if(a==-1){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('-x', textStyle);
                text.position.x = position;
                textgroup.add(text);
                position+=45;
            }
            else{
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D(a+'x', textStyle);
                text.position.x = position;
                textgroup.add(text);
                position+=40;
            }

        }
        if(b!=0){
            if(b>0){
                if(a!=0){
                    textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                    text = new SpriteText2D('+', textStyle);
                    text.position.x = position;
                    textgroup.add(text);
                    position+=35;
                    if(b==1){
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D('y', textStyle);
                        text.position.x = position;
                        textgroup.add(text);
                        position+=30;
                    }
                    else{
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D(b+'y', textStyle);
                        text.position.x = position;
                        textgroup.add(text);
                        position+=50;
                    }
                }
                else {
                    if(b==1){
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D('y', textStyle);
                        text.position.x = position;
                        textgroup.add(text);
                        position+=40;
                    }
                    else{
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D(b+'y', textStyle);
                        text.position.x = position;
                        textgroup.add(text);
                        position+=53;
                    }
                }

            }
            if(b<0){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('-', textStyle);
                text.position.x = position;
                textgroup.add(text);
                position+=35;
                if(b==-1){
                    textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                    text = new SpriteText2D('y', textStyle);
                    text.position.x = position;
                    textgroup.add(text);
                    position+=30;
                }
                else{
                    b=-b;
                    textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                    text = new SpriteText2D(b+'y', textStyle);
                    text.position.x = position;
                    textgroup.add(text);
                    position+=55;
                }
            }
        }
        if(b==0){
            position+=20;
        }
        if(c!=0){
            if(c>0){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('+'+c, textStyle);
                text.position.x = position;
                textgroup.add(text);
                position+=45;
            }else{
                c=-c;
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('-'+c, textStyle);
                text.position.x = position;
                textgroup.add(text);
                position+=45;
            }
        }
        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
        text = new SpriteText2D('=0', textStyle);
        text.position.x = position;
        textgroup.add(text);
        position+=20;

        textgroup.position.x=400;
        textgroup.position.y=530;
        this.scene.add(textgroup);
    };
    this.showfangchen2=function(){
        if(textgroup1!=null){
            this.scene.remove(textgroup1);
        }

        var a=a2;
        var b=b2;
        var c=c2,text=null;
        textgroup1=new THREE.Group();
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = null;
        var position=0;

        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
        text = new SpriteText2D('l2:', textStyle);
        text.position.x = 0;
        textgroup1.add(text);
        position+=50;

        if(a!=0){
            if(a==1){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('x', textStyle);
                text.position.x = position;
                textgroup1.add(text);
                position+=35;
            }
            else if(a==-1){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('-x', textStyle);
                text.position.x = position;
                textgroup1.add(text);
                position+=45;
            }
            else{
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D(a+'x', textStyle);
                text.position.x = position;
                textgroup1.add(text);
                position+=40;
            }

        }
        if(b!=0){
            if(b>0){
                if(a!=0){
                    textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                    text = new SpriteText2D('+', textStyle);
                    text.position.x = position;
                    textgroup1.add(text);
                    position+=35;
                    if(b==1){
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D('y', textStyle);
                        text.position.x = position;
                        textgroup1.add(text);
                        position+=30;
                    }
                    else{
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D(b+'y', textStyle);
                        text.position.x = position;
                        textgroup1.add(text);
                        position+=50;
                    }
                }
                else {
                    if(b==1){
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D('y', textStyle);
                        text.position.x = position;
                        textgroup1.add(text);
                        position+=40;
                    }
                    else{
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D(b+'y', textStyle);
                        text.position.x = position;
                        textgroup1.add(text);
                        position+=53;
                    }
                }

            }
            if(b<0){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('-', textStyle);
                text.position.x = position;
                textgroup1.add(text);
                position+=35;
                if(b==-1){
                    textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                    text = new SpriteText2D('y', textStyle);
                    text.position.x = position;
                    textgroup1.add(text);
                    position+=30;
                }
                else{
                    b=-b;
                    textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                    text = new SpriteText2D(b+'y', textStyle);
                    text.position.x = position;
                    textgroup1.add(text);
                    position+=55;
                }
            }
        }
        if(b==0){
            position+=20;
        }
        if(c!=0){
            if(c>0){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('+'+c, textStyle);
                text.position.x = position;
                textgroup1.add(text);
                position+=45;
            }else{
                c=-c;
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('-'+c, textStyle);
                text.position.x = position;
                textgroup1.add(text);
                position+=45;
            }
        }
        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
        text = new SpriteText2D('=0', textStyle);
        text.position.x = position;
        textgroup1.add(text);
        position+=20;

        textgroup1.position.x=400;
        textgroup1.position.y=460;
        this.scene.add(textgroup1);
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


$("#slider1").change(function(){
    var s1=parseInt(this.value);
    a1=s1/2;
    three.createLine();
    three.createSphere();
    three.showfangchen1();
});
$("#slider2").change(function(){
    var s1=parseInt(this.value);
    b1=s1/2;
    three.createLine();
    three.createSphere();
    three.showfangchen1();
});
$("#slider3").change(function(){
    var s1=parseInt(this.value);
    c1=s1/2;
    three.createLine();
    three.createSphere();
    three.showfangchen1();
});
$("#slider4").change(function(){
    var s1=parseInt(this.value);
    a2=s1/2;
    three.createLine();
    three.createSphere();
    three.showfangchen2();
});
$("#slider5").change(function(){
    var s1=parseInt(this.value);
    b2=s1/2;
    three.createLine();
    three.createSphere();
    three.showfangchen2();
});
$("#slider6").change(function(){
    var s1=parseInt(this.value);
    c2=s1/2;
    three.createLine();
    three.createSphere();
    three.showfangchen2();
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
    a1=2;
    a2=1;
    b1=-1;
    b2=-1;
    c1=-2;
    c2=0;
    three.camera.position.x = 0;
    three.camera.position.y = 0;
    three.camera.position.z = 1400;
    three.createLine();
    three.createSphere();
    three.showfangchen1();
    three.showfangchen2();
    $('.slider1').find('.sliderLeft').css({'width':'286px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'286px'});
    $('.slider1').find('.xdsoft_slider_label').text('2');
    $('.slider1').attr('value',''+4+'|0');
    $('.slider2').find('.sliderLeft').css({'width':'164px'});
    $('.slider2').find('.xdsoft_range2dslider_runner').css({'left':'164px'});
    $('.slider2').find('.xdsoft_slider_label').text('-1');
    $('.slider2').attr('value',''+(-2)+'|0');
    $('.slider3').find('.sliderLeft').css({'width':'123px'});
    $('.slider3').find('.xdsoft_range2dslider_runner').css({'left':'123px'});
    $('.slider3').find('.xdsoft_slider_label').text('-2');
    $('.slider3').attr('value',''+(-4)+'|0');

    $('.slider4').find('.sliderLeft').css({'width':'245px'});
    $('.slider4').find('.xdsoft_range2dslider_runner').css({'left':'245px'});
    $('.slider4').find('.xdsoft_slider_label').text('1');
    $('.slider4').attr('value',''+2+'|0');
    $('.slider5').find('.sliderLeft').css({'width':'164px'});
    $('.slider5').find('.xdsoft_range2dslider_runner').css({'left':'164px'});
    $('.slider5').find('.xdsoft_slider_label').text('-1');
    $('.slider5').attr('value',''+(-2)+'|0');
    $('.slider6').find('.sliderLeft').css({'width':'205px'});
    $('.slider6').find('.xdsoft_range2dslider_runner').css({'left':'205px'});
    $('.slider6').find('.xdsoft_slider_label').text('0');
    $('.slider6').attr('value',''+0+'|0');
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





