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
var $obj = $('#threeContainer');
    threeHeight = $obj.height(),
    threeWidth = $obj.width();


//初始全局变量
var axisArrow = new THREE.Group();
var axis = new THREE.Group();
var obj=new THREE.Group();
var j=0.2,Ax=2,Ay=3,Bx=3,By=4,Cx=4,Cy=2,Dx=5,Dy=5,Ex=6,Ey=3,flage1=false,flage2=false,index;

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
    this.scene.position.set(-400,-400,0)
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
        this.createObj();

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
    function createText(vertices,font,size,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(font, textStyle);
        text.position.x=vertices[0].x
        text.position.y=vertices[0].y
        text.position.z=vertices[0].z
        return text;
    }
    function createTriangleFace(vertices,color){
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

            vertices=[]
            vertices.push(new THREE.Vector3(dir.x,-5,0));
            var textx = createText(vertices,'x', 26,'#000000');
            axis.add(textx);
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

            vertices=[]
            vertices.push(new THREE.Vector3(-15,dir.y+5,0));
            var texty = createText(vertices,'y', 26,'#000000');
            axis.add(texty);
        }
    }
     function labelAxis(startx, stepSizex, stopx, starty, stepSizey, stopy) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var text={};
        // label x axis:
        var textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for(var i = startx; i <= stopx; i = i+stepSizex) {
            if(i==0){continue;}
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

        // label y axis:
        textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for( i = starty; i <= stopy; i = i+stepSizey) {
            if(i == 0){ continue;}
            text = new SpriteText2D(i/stepSizey, textStyle);
            text.position.x = -20;
            text.position.y = i+10;
            text.position.z = 0.2;
            axis.add(text);

            vertices = [];
            vertices.push(new THREE.Vector3(0,i,0));
            vertices.push(new THREE.Vector3(10,i,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        vertices=[];
        vertices.push(vec3(-12,-8,0))
        var text0=createText(vertices,'0',26,"#000000")
        axis.add(text0)
    }
    function createCircle(vertices,radius,color){
        var CircleG = new THREE.CircleGeometry(radius, 50, 0, 2 * Math.PI);
        var CircleM = new THREE.MeshBasicMaterial({color: color});
        var Circle = new THREE.Mesh(CircleG, CircleM);
        Circle.position.x = vertices[0].x; 
        Circle.position.y = vertices[0].y;
        Circle.position.z = vertices[0].z;
        return Circle;
    }
    /****** 其他事件 ******/
    this.createAxis = function(){
        labelAxis(0,80,800,0,80,800);
        drawAxisArrow(vec3( -50, 0, 0 ), vec3( 850, 0, 0 ),1);
        drawAxisArrow(vec3( 0, -50, 0 ), vec3( 0, 850, 0 ),2);
        this.scene.add(axisArrow,axis);
    };
    this.min_index=function(){
        var NUM=0;
        var array_min=[];
        for(var i=-4;i<=5;i=i+0.01){
            NUM=Math.pow(Ay-(Ax*0.8+i),2)+Math.pow(By-(Bx*0.8+i),2)+Math.pow(Cy-(Cx*0.8+i),2)+Math.pow(Dy-(Dx*0.8+i),2)+Math.pow(Ey-(Ex*0.8+i),2);
            array_min.push(NUM);
        }
        index=array_min.indexOf(Math.min.apply(null,array_min))-400;
        return index;
    };
    this.createObj=function(){
        if(obj!=null){
            this.scene.remove(obj);
        }
        obj = new THREE.Group();
        var vertices;

        //A
        vertices=[];
        vertices.push(vec3(Ax*80,Ay*80,1));
        var A=createCircle(vertices,10,'#1161c8')
        A.name='A'
        vertices=[];
        vertices.push(vec3(Ax*80+20,Ay*80+20,1));
        var textA=createText(vertices,'A',26,'#1161c8')

        //B
        vertices=[];
        vertices.push(vec3(Bx*80,By*80,1));
        var B=createCircle(vertices,10,'#1161c8')
        B.name='B'
        vertices=[];
        vertices.push(vec3(Bx*80+20,By*80+20,1));
        var textB=createText(vertices,'B',26,'#1161c8')

        //C
        vertices=[];
        vertices.push(vec3(Cx*80,Cy*80,1));
        var C=createCircle(vertices,10,'#1161c8')
        C.name='C'
        vertices=[];
        vertices.push(vec3(Cx*80+20,Cy*80+20,1));
        var textC=createText(vertices,'C',26,'#1161c8')

        //D
        vertices=[];
        vertices.push(vec3(Dx*80,Dy*80,1));
        var D=createCircle(vertices,10,'#1161c8')
        D.name='D'
        vertices=[];
        vertices.push(vec3(Dx*80+20,Dy*80+20,1));
        var textD=createText(vertices,'D',26,'#1161c8')
        
        //E
        vertices=[];
        vertices.push(vec3(Ex*80,Ey*80,1));
        var E=createCircle(vertices,10,'#1161c8')
        E.name='E'
        vertices=[];
        vertices.push(vec3(Ex*80+20,Ey*80+20,1));
        var textE=createText(vertices,'E',26,'#1161c8')

        selectobjs.push(A,B,C,D,E);
        obj.add(A,textA,B,textB,C,textC,D,textD,E,textE)

        //直线
        vertices=[];
        vertices.push(vec3(0,j*80,1))
        vertices.push(vec3(10*80,(10*0.8+j)*80,1))
        if(j==index/100&&flage2){
            var line=createLineMesh(vertices,"#f00",3)
        }else{
            var line=createLineMesh(vertices,"#000",3)
        }
        
        obj.add(line)

        //虚线
        if(flage1){
            //A
            vertices=[];
            vertices.push(vec3(Ax*80,Ay*80,1))
            vertices.push(vec3(Ax*80,(Ax*0.8+j)*80,1))
            var lineA=createLineMesh(vertices,"#1161c8",2)

            //B
            vertices=[];
            vertices.push(vec3(Bx*80,By*80,1))
            vertices.push(vec3(Bx*80,(Bx*0.8+j)*80,1))
            var lineB=createLineMesh(vertices,"#1161c8",2)

            //C
            vertices=[];
            vertices.push(vec3(Cx*80,Cy*80,1))
            vertices.push(vec3(Cx*80,(Cx*0.8+j)*80,1))
            var lineC=createLineMesh(vertices,"#1161c8",2)

            //D
            vertices=[];
            vertices.push(vec3(Dx*80,Dy*80,1))
            vertices.push(vec3(Dx*80,(Dx*0.8+j)*80,1))
            var lineD=createLineMesh(vertices,"#1161c8",2)

            //E
            vertices=[];
            vertices.push(vec3(Ex*80,Ey*80,1))
            vertices.push(vec3(Ex*80,(Ex*0.8+j)*80,1))
            var lineE=createLineMesh(vertices,"#1161c8",2)

            obj.add(lineA,lineB,lineC,lineD,lineE)
        }
        //面积
        if(flage2){
            //A
            mesh(Ax,Ay);
            
            //B
            mesh(Bx,By);

            //C
            mesh(Cx,Cy);

            //D
            mesh(Dx,Dy);

            //E
            mesh(Ex,Ey);

            function mesh(namex,namey,namey2){
                vertices=[];
                vertices.push(vec3(namex*80,namey*80,0))
                var y2=namex*0.8+j;
                vertices.push(vec3(namex*80,y2*80,0))
                vertices.push(vec3((y2-namey+namex)*80,y2*80,0))
                vertices.push(vec3((y2-namey+namex)*80,namey*80,0))
                vertices.push(vec3(namex*80,namey*80,0))
                var line=createLineMesh(vertices,"#D1A594",3)

                vertices=[];
                vertices.push(vec3(namex*80,namey*80,0))
                vertices.push(vec3(namex*80,y2*80,0))
                vertices.push(vec3((y2-namey+namex)*80,y2*80,0))
                var face1=createTriangleFace(vertices,"#B2D8DD")

                vertices=[];
                vertices.push(vec3(namex*80,namey*80,0))
                vertices.push(vec3((y2-namey+namex)*80,y2*80,0))
                vertices.push(vec3((y2-namey+namex)*80,namey*80,0))
                var face2=createTriangleFace(vertices,"#B2D8DD")
                obj.add(line,face1,face2)
            }
            var NUM_mesh=Math.pow(Ay-(Ax*0.8+j),2)+Math.pow(By-(Bx*0.8+j),2)+Math.pow(Cy-(Cx*0.8+j),2)+Math.pow(Dy-(Dx*0.8+j),2)+Math.pow(Ey-(Ex*0.8+j),2);
            $('.formula-right').text(NUM_mesh.toFixed(2))
        }
        this.scene.add(obj)
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
                x = (obj.x+400)/80;
                y = (obj.y+400)/80;
                if(selectobj.name=='A'){
                    Ax=x<0?0:x>10?10:x;
                    Ay=y<0?0:y>10?10:y;
                }else if(selectobj.name=="B"){
                    Bx=x<0?0:x>10?10:x;
                    By=y<0?0:y>10?10:y;
                }else if(selectobj.name=="C"){
                    Cx=x<0?0:x>10?10:x;
                    Cy=y<0?0:y>10?10:y;
                }else if(selectobj.name=="D"){
                    Dx=x<0?0:x>10?10:x;
                    Dy=y<0?0:y>10?10:y;
                }else{
                    Ex=x<0?0:x>10?10:x;
                    Ey=y<0?0:y>10?10:y;
                }
                thiz.min_index();
                thiz.createObj()
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
                    x = (obj.x+400)/80;
                    y = (obj.y+400)/80;
                    array_min=[];
                    if(selectobj.name=='A'){
                        Ax=x<0?0:x>10?10:x;
                        Ay=y<0?0:y>10?10:y;
                    }else if(selectobj.name=="B"){
                        Bx=x<0?0:x>10?10:x;
                        By=y<0?0:y>10?10:y;
                    }else if(selectobj.name=="C"){
                        Cx=x<0?0:x>10?10:x;
                        Cy=y<0?0:y>10?10:y;
                    }else if(selectobj.name=="D"){
                        Dx=x<0?0:x>10?10:x;
                        Dy=y<0?0:y>10?10:y;
                    }else{
                        Ex=x<0?0:x>10?10:x;
                        Ey=y<0?0:y>10?10:y;
                    }
                    thiz.min_index();
                    thiz.createObj()
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

//滑条
$("#slider1").change(function(){
    var val=parseInt(this.value);
    if(flage2){
        three.min_index();
    }
    if(val>=index-5&&val<=index+5&&flage2){
        j=index/100;
        $('.slider1').find('.sliderLeft').css({'width':410/900*(index+400)+'px'});
        $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':410/900*(index+400)+'px'});
        $('.slider1').attr('value',''+(index+400)/100+'|0');
    }else{
        j=val/100;
    }
    three.createObj();
});

var fullScreen=0;
function clickEve1(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
        if($(this).attr('id')=='div1'){
            flage1=false;
        }else{
            flage2=false;
        }
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
        $(this).parent().parent().siblings().find('.span2').text('' +'off');
        if($(this).attr('id')=='div1'){
            flage1=true;
            flage2=false;
        }else{
            flage2=true;
            flage1=false;
            three.min_index();
        }
    }
    three.createObj()
}
function renew(){
	$('.slider1').find('.sliderLeft').css({'width':'16px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'16px'});
    $('.slider1').find('.xdsoft_slider_label').text('0.2');
    $('.slider1').attr('value',''+0.2+'|0');
    j=0.2;Ax=2;Ay=3;Bx=3;By=4;Cx=4;Cy=2;Dx=5;Dy=5;Ex=6;Ey=3;flage1=false;flage2=false;
    $('.turnRight').parent().parent().removeClass('on').addClass('off');
    $('.turnRight').parent().parent().find('.span2').text('' +'off');
    three.camera.position.set(0,0,1500);
    three.createObj();
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


if(isMob){
	//on/off事件
	$('#div1').on('touchstart',clickEve1);
	$('#div2').on('touchstart',clickEve1);

	//重置
	$("#renew").on('touchstart',renew);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	//on/off事件
	$('#div1').on('click',clickEve1);
	$('#div2').on('click',clickEve1);

	//重置
	$("#renew").on('click',renew);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}

$('#slider1').range2DSlider({
    template:'horizontal',
    value:[[20,0]],
    width:410,
    showLegend:false,
    round:true,
    axis:[[-400,500]],
    printLabel:function(val){
        if(val[0]>=index-5&&val[0]<=index+5){
            return index/100;
        }else{
            return parseInt(val[0])/100;
        }
    }
});



