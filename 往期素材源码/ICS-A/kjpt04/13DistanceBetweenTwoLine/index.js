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
var aa=-1,bb=-1,c1=4,c2=-4,x1=2,y1=2;
var sphere1=null;
var sphere=null;
var text1=null;
var textgroup1=null;
var textgroup2=null;
var line1=null,line2=null,line3=null,dashline=null;
var selectobjs=[],selectobj=null,mousedownflag;
var linegroup=null;


function ThreeDimensional() {
    var thiz = this;
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
        this.camera.position.z = 1500;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);
        this.createControls();

        this.createAxis();
        this.createLine();
        this.createsphere();
         this.createAllLine();
        this.showfangchen1();
        this.showfangchen2();
        this.createAngle();
        this.createPlane();

    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate =false;
        // this.controls.enablePan =false;
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
    function createMesh(geom,color){//对象和材质融合，创建路径对象
        var wireFrameMat = new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:0.6});
        var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [ wireFrameMat]);
        return mesh;
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
            // text = new SpriteText2D(i/stepSizex/2, textStyle);
            // text.position.x = i;
            // text.position.y = -10;
            // axis.add(text);

            var vertices = [];
            vertices.push(new THREE.Vector3(i,0,0));
            vertices.push(new THREE.Vector3(i,10,0));
            var line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        text = new SpriteText2D('x', textStyle);
        text.position.x = stopx;
        text.position.y = -20;
        axis.add(text);

        // label y axis:
        textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for( i = starty; i <= stopy; i = i+stepSizey) {
            if(i == 0){ continue;}
            // text = new SpriteText2D(i/stepSizey/2, textStyle);
            // text.position.x = -20;
            // text.position.y = i;
            // text.position.z = 0.2;
            // axis.add(text);

            vertices = [];
            vertices.push(new THREE.Vector3(0,i,0));
            vertices.push(new THREE.Vector3(-10,i,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        text = new SpriteText2D('y', textStyle);
        text.position.x = -30;
        text.position.y = stopy;
        axis.add(text);
    }
    function createCircle(vertices,radius,color){
        var CircleG = new THREE.CircleGeometry(radius, 50, 0, 2 * Math.PI);
        var CircleM = new THREE.MeshBasicMaterial({color: color});
        var Circle = new THREE.Mesh(CircleG, CircleM);
        Circle.position.x = vertices[0];
        Circle.position.y = vertices[1];
        Circle.position.z = vertices[2];
        return Circle;
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
        if(aa==0&&bb==0){
            return;
        }
        var vertices1=[];
        var vertices2=[];
        if(bb==0){
            vertices1.push(vec3((-c1/aa)*50,-550,1));
            vertices1.push(vec3((-c1/aa)*50,550,1));
            vertices2.push(vec3((-c2/aa)*50,-550,0));
            vertices2.push(vec3((-c2/aa)*50,550,0));
        }
        else{
            vertices1.push(vec3(-5000,((-aa*(-100)/bb)-c1/bb)*50,1));
            vertices1.push(vec3(5000,((-aa*(100)/bb)-c1/bb)*50,1));
            vertices2.push(vec3(-5000,((-aa*(-100)/bb)-c2/bb)*50,0));
            vertices2.push(vec3(5000,((-aa*(100)/bb)-c2/bb)*50,0));
        }
        var geometryLine1 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        line1 = new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: 0x7ED321}));

        var geometryLine2 = new THREE.Geometry();
        geometryLine2.vertices = vertices2;
        line2 = new THREE.LineSegments(geometryLine2, new THREE.LineBasicMaterial({color: 0xF55B23}));
        this.scene.add(line1,line2);
    };
    this.createsphere=function(){
        if(sphere1!=null){
            this.scene.remove(sphere1);
            this.scene.remove(text1);
        }
        if(sphere!=null){
            this.scene.remove(sphere);
        }
        var vertices=[];
        if(bb==0){
            x1=-c1/aa;
        }
        else{
            y1=(-aa*(x1)/bb)-c1/bb;
            if(Math.abs(y1)>10){
                if(y1<0){
                    y1=-10;
                }else{
                    y1=10;
                }
                x1=(-bb*y1)/aa-(c1/aa);
            }
        }
        vertices.push(x1*50,y1*50,1);
        sphere1=createCircle(vertices,10,'#65B2EE');
        sphere=createCircle(vertices,40,'#65B2EE');
        sphere.name="p1";
        selectobjs.push(sphere,sphere1);
        var num1=x1;
        var num2=y1;
        if(x1.toString().length>3){
            num1=parseFloat(x1).toFixed(1);
        }
        if(y1.toString().length>3){
            num2=parseFloat(y1).toFixed(1);
        }
        text1=createText("P("+num1+","+num2+")",x1*50-15,y1*50-20,0,"#000000");
        this.scene.add(sphere,sphere1,text1);

    };
    this.createAllLine=function(){
         if(dashline!=null){
             this.scene.remove(dashline);
         }
         if(aa==0&&bb==0){
             return;
         }

         dashline=new THREE.Group();
         var vertices1=[];
        var b=y1-(bb/aa)*x1;
        var resultx=((-c2/bb)-b)/(bb/aa+aa/bb);
        var resulty=0;
        if(aa==0){
            resultx=x1;
            resulty=(-aa*resultx/bb)-c2/bb;
            vertices1.push(vec3(x1*50,((-aa*x1/bb)-c2/bb)*50,0));
        }else if(bb==0){
            resultx=x1;
            resulty=(-aa*resultx/bb)-c2/bb;
            vertices1.push(vec3((-c2/aa)*50,y1*50,0));
        }
        else{
            resulty=(-aa*resultx/bb)-c2/bb;
            vertices1.push(vec3(resultx*50,((-aa*resultx/bb)-c2/bb)*50,0));
        }
         vertices1.push(vec3(x1*50,y1*50,0));
        var geometryLine1 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        geometryLine1.computeLineDistances();
        var dashlinemesh = new THREE.Line(geometryLine1,new THREE.LineDashedMaterial( { color: 0x000000,opacity:0.9, dashSize: 5, gapSize: 5 } ));
         var text1=createText("d",(resultx+x1)*25,(y1+resulty)*25+30,0,"#000000");
        dashline.add(dashlinemesh,text1);
         this.scene.add(dashline);




    };
    this.showresult=function(){

        if(aa==0&&bb==0){
            $('#result').html("");
        }
        else{
            if(aa==0){
                var d=Math.abs((-c1/bb)-(-c2/bb));
            }
            else{
                var d=(Math.abs(c1-c2))/Math.pow((Math.pow(aa,2)+Math.pow(bb,2)),1/2);
            }
            d=parseFloat(d).toFixed(2);
            $('#result').html(d);
        }
    };
    this.showfangchen1=function(){
        if(textgroup1!=null){
            this.scene.remove(textgroup1);
        }
        var A=aa;
        var B=bb;
        var C=c1;
        var a=aa;
        var b=bb;
        var c=c1,text=null;
        textgroup1=new THREE.Group();
        if(a==0&&b==0){
            return;
        }


        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = null;
        var position=0;

        if(a!=0){
            if(a==1){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('x', textStyle);
                text.position.x = position;
                textgroup1.add(text);
                position+=30;
            }
            else if(a==-1){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('-x', textStyle);
                text.position.x = position;
                textgroup1.add(text);
                position+=30;
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
                    position+=30;
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
                        position+=40;
                    }
                }
                else {
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

            }
            if(b<0){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('-', textStyle);
                text.position.x = position;
                textgroup1.add(text);
                position+=20;
                if(b==-1){
                    textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                    text = new SpriteText2D('y', textStyle);
                    text.position.x = position;
                    textgroup1.add(text);
                    position+=40;
                }
                else{
                    b=-b;
                    textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                    text = new SpriteText2D(b+'y', textStyle);
                    text.position.x = position;
                    textgroup1.add(text);
                    position+=50;
                }
            }
        }
        if(c!=0){
            if(c>0){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('+'+c, textStyle);
                text.position.x = position;
                textgroup1.add(text);
                position+=50;
            }else{
                c=-c;
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('-'+c, textStyle);
                text.position.x = position;
                textgroup1.add(text);
                position+=50;
            }
        }
        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
        text = new SpriteText2D('=0', textStyle);
        text.position.x = position;
        textgroup1.add(text);
        position+=20;

        textgroup1.position.x=430;
        textgroup1.position.y=530;
        this.scene.add(textgroup1);

    };
    this.showfangchen2=function(){
        if(textgroup2!=null){
            this.scene.remove(textgroup2);
        }
        var A=aa;
        var B=bb;
        var C=c2;
        var a=aa;
        var b=bb;
        var c=c2,text=null;
        textgroup2=new THREE.Group();
        if(a==0&&b==0){
            return;
        }


        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = null;
        var position=0;

        if(a!=0){
            if(a==1){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('x', textStyle);
                text.position.x = position;
                textgroup2.add(text);
                position+=30;
            }
            else if(a==-1){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('-x', textStyle);
                text.position.x = position;
                textgroup2.add(text);
                position+=30;
            }
            else{
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D(a+'x', textStyle);
                text.position.x = position;
                textgroup2.add(text);
                position+=40;
            }

        }
        if(b!=0){
            if(b>0){
                if(a!=0){
                    textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                    text = new SpriteText2D('+', textStyle);
                    text.position.x = position;
                    textgroup2.add(text);
                    position+=30;
                    if(b==1){
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D('y', textStyle);
                        text.position.x = position;
                        textgroup2.add(text);
                        position+=30;
                    }
                    else{
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D(b+'y', textStyle);
                        text.position.x = position;
                        textgroup2.add(text);
                        position+=40;
                    }
                }
                else {
                    if(b==1){
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D('y', textStyle);
                        text.position.x = position;
                        textgroup2.add(text);
                        position+=30;
                    }
                    else{
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D(b+'y', textStyle);
                        text.position.x = position;
                        textgroup2.add(text);
                        position+=50;
                    }
                }

            }
            if(b<0){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('-', textStyle);
                text.position.x = position;
                textgroup2.add(text);
                position+=20;
                if(b==-1){
                    textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                    text = new SpriteText2D('y', textStyle);
                    text.position.x = position;
                    textgroup2.add(text);
                    position+=40;
                }
                else{
                    b=-b;
                    textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                    text = new SpriteText2D(b+'y', textStyle);
                    text.position.x = position;
                    textgroup2.add(text);
                    position+=50;
                }
            }
        }
        if(c!=0){
            if(c>0){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('+'+c, textStyle);
                text.position.x = position;
                textgroup2.add(text);
                position+=50;
            }else{
                c=-c;
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('-'+c, textStyle);
                text.position.x = position;
                textgroup2.add(text);
                position+=50;
            }
        }
        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
        text = new SpriteText2D('=0', textStyle);
        text.position.x = position;
        textgroup2.add(text);
        position+=20;

        textgroup2.position.x=430;
        textgroup2.position.y=460;
        this.scene.add(textgroup2);

    };
    this.createAngle=function(){
        if(linegroup!=null){
            this.scene.remove(linegroup);
        }
        if(aa==0&&bb==0){
            return;
        }
        if(c1==c2){
            return;
        }
        linegroup=new THREE.Group();
        var vertices1=[];
        var vertices2=[];
        var b=y1-(bb/aa)*x1;
        var resultx=((-c2/bb)-b)/(bb/aa+aa/bb);
        if(aa==0){
            resultx=x1;
        }else if(bb==0){
            resultx=-c2/aa;
        }
        else{

        }
        vertices1.push(vec3(20,0,0));
        vertices1.push(vec3(20,20,0));
        vertices2.push(vec3(0,20,0));
        vertices2.push(vec3(20,20,0));
        var geometryLine1 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        var linemesh1 = new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: 0x000000}));
        var geometryLine2 = new THREE.Geometry();
        geometryLine2.vertices = vertices2;
        var linemesh2 = new THREE.LineSegments(geometryLine2, new THREE.LineBasicMaterial({color: 0x000000}));
        linegroup.add(linemesh1,linemesh2);
        this.scene.add(linegroup);
        linegroup.position.x=resultx*50;
        if(bb==0){
            linegroup.position.y=y1*50;
        }
        else{
            linegroup.position.y=((-aa*resultx/bb)-c2/bb)*50;
        }

        var k=-aa/bb;
        var angle1=Math.atan(k);
        linegroup.rotation.z=angle1;
        if(y1<((-aa*resultx/bb)-c2/bb)){
            linegroup.rotation.z=angle1+Math.PI;
        }
    };
    this.createPlane=function(){
        var shape1 = new THREE.Shape();
        shape1.moveTo(370,500);
        shape1.lineTo(370,540);
        shape1.lineTo(410,540);
        shape1.lineTo(410,500);
        var plane1 =createMesh(new THREE.ShapeGeometry(shape1),0x7ED321);
        plane1.position.z = 1;
        this.scene.add(plane1);

        var shape2 = new THREE.Shape();
        shape2.moveTo(370,430);
        shape2.lineTo(370,470);
        shape2.lineTo(410,470);
        shape2.lineTo(410,430);
        var plane2 =createMesh(new THREE.ShapeGeometry(shape2),0xF55B23);
        plane2.position.z = 1;
        this.scene.add(plane2);
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
                if(Math.abs(x)>10){
                    if(x<0){
                        x=-10;
                    }else{
                        x=10;
                    }
                }
                if(Math.abs(y)>10){
                    if(y<0){
                        y=-10;
                    }else{
                        y=10;
                    }
                }
                if(selectobj.name=='p1'){
                    x1 = x;
                    y1 = y;
                }
                thiz.createsphere();
                thiz.createAllLine();
                thiz.showresult();
                thiz.createAngle();
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
                    if(Math.abs(x)>10){
                        if(x<0){
                            x=-10;
                        }else{
                            x=10;
                        }
                    }
                    if(Math.abs(y)>10){
                        if(y<0){
                            y=-10;
                        }else{
                            y=10;
                        }
                    }
                    if(selectobj.name=='p1'){
                        x1 = x;
                        y1 = y;
                    }
                    thiz.createsphere();
                    thiz.createAllLine();
                    thiz.showresult();
                    thiz.createAngle();
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
    var s2 = parseInt(this.value);
    aa=s2;
    three.createLine();
    three.showresult();
    three.createsphere();
    three.createAllLine();
    three.showfangchen1();
    three.showfangchen2();
    three.createAngle();

    if(bb==0&&aa==0){
        c1=0;
        c2=0;
        three.showfangchen1();
        three.showfangchen2();
        $('#slider3').range2DSlider({
            template:'horizontal',
            value:[[0,0]],
            width:410,
            showLegend:false,
            round:true,
            axis:[[-5,5]],
            printLabel:function(val){
                var ss= parseInt(val[0])
                return ss;
            }
        });
        $('#slider4').range2DSlider({
            template:'horizontal',
            value:[[0,0]],
            width:410,
            showLegend:false,
            round:true,
            axis:[[-5,5]],
            printLabel:function(val){
                var ss= parseInt(val[0])
                return ss;
            }
        });
        $('.slider3 .sliderLeft').css('width','205px');
        $('.slider4 .sliderLeft').css('width','205px');
    }

});
$("#slider2").change(function(){
    var s2 = parseInt(this.value);
    bb=s2;
    three.createLine();
    three.showresult();
    three.createsphere();
    three.createAllLine();
    three.showfangchen1();
    three.showfangchen2();
    three.createAngle();
    if(bb==0&&aa==0){
        c1=0;
        c2=0;
        three.showfangchen1();
        three.showfangchen2();
        $('#slider3').range2DSlider({
            template:'horizontal',
            value:[[0,0]],
            width:410,
            showLegend:false,
            round:true,
            axis:[[-5,5]],
            printLabel:function(val){
                var ss= parseInt(val[0])
                return ss;
            }
        });
        $('#slider4').range2DSlider({
            template:'horizontal',
            value:[[0,0]],
            width:410,
            showLegend:false,
            round:true,
            axis:[[-5,5]],
            printLabel:function(val){
                var ss= parseInt(val[0])
                return ss;
            }
        });
        $('.slider3 .sliderLeft').css('width','205px');
        $('.slider4 .sliderLeft').css('width','205px');
    }

});
$("#slider3").change(function(){
    if(bb==0&&aa==0){
        c1=0;
        c2=0;
        $('#slider3').range2DSlider({
            template:'horizontal',
            value:[[0,0]],
            width:410,
            showLegend:false,
            round:true,
            axis:[[-5,5]],
            printLabel:function(val){
                var ss= parseInt(val[0])
                return ss;
            }
        });
        $('#slider4').range2DSlider({
            template:'horizontal',
            value:[[0,0]],
            width:410,
            showLegend:false,
            round:true,
            axis:[[-5,5]],
            printLabel:function(val){
                var ss= parseInt(val[0])
                return ss;
            }
        });
        $('.slider3 .sliderLeft').css('width','205px');
        $('.slider4 .sliderLeft').css('width','205px');
        return;
    }
    var s2 = parseInt(this.value);
    c1=s2;
    if(bb==0){
        x1=-c1/aa;
    }
    else{
        y1=(-aa*(x1)/bb)-c1/bb;
        if(Math.abs(y1)>10){
            if(y1<0){
                y1=-10;
            }else{
                y1=10;
            }
            x1=(-bb*y1)/aa-(c1/aa);
        }
    }
    three.createLine();
    three.createAllLine();
    three.createsphere();
    three.showresult();
    three.showfangchen1();
    three.showfangchen2();
    three.createAngle();
});
$("#slider4").change(function(){
    if(bb==0&&aa==0){
        c1=0;
        c2=0;
        $('#slider3').range2DSlider({
            template:'horizontal',
            value:[[0,0]],
            width:410,
            showLegend:false,
            round:true,
            axis:[[-5,5]],
            printLabel:function(val){
                var ss= parseInt(val[0])
                return ss;
            }
        });
        $('#slider4').range2DSlider({
            template:'horizontal',
            value:[[0,0]],
            width:410,
            showLegend:false,
            round:true,
            axis:[[-5,5]],
            printLabel:function(val){
                var ss= parseInt(val[0])
                return ss;
            }
        });
        $('.slider3 .sliderLeft').css('width','205px');
        $('.slider4 .sliderLeft').css('width','205px');
        return;
    }
    var s2 = parseInt(this.value);
    c2=s2;
    three.createLine();
    three.createAllLine();
    three.showresult();
    three.showfangchen1();
    three.showfangchen2();
    three.createAngle();
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
    aa=-1;
    bb=-1;
    c1=4;
    c2=-4;
    x1=2;
    y1=2;
    three.createLine();
    three.createsphere();
    three.createAllLine();
    three.showfangchen1();
    three.showfangchen2();
    three.createAngle();
    $('#result').html("5.68");

    $('.slider1').find('.sliderLeft').css({'width':'164px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'164px'});
    $('.slider1').find('.xdsoft_slider_label').text('-1');
    $('.slider1').attr('value',''+(-1)+'|0');
    $('.slider2').find('.sliderLeft').css({'width':'164px'});
    $('.slider2').find('.xdsoft_range2dslider_runner').css({'left':'164px'});
    $('.slider2').find('.xdsoft_slider_label').text('-1');
    $('.slider2').attr('value',''+(-1)+'|0');
    $('.slider3').find('.sliderLeft').css({'width':'368px'});
    $('.slider3').find('.xdsoft_range2dslider_runner').css({'left':'368px'});
    $('.slider3').find('.xdsoft_slider_label').text('4');
    $('.slider3').attr('value',''+4+'|0');
    $('.slider4').find('.sliderLeft').css({'width':'41px'});
    $('.slider4').find('.xdsoft_range2dslider_runner').css({'left':'41px'});
    $('.slider4').find('.xdsoft_slider_label').text('-4');
    $('.slider4').attr('value',''+(-4)+'|0');
    three.camera.position.x = 0;
    three.camera.position.y = 0;
    three.camera.position.z = 1500;
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





