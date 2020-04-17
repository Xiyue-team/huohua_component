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
        var marginTop = ($body.width()/bodyWidth*bodyHeight-1200)/2;$('.body').css("margin-top",'-600px');
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
var checked =false;
var chk=[false,false,false,false,false,false,false];
var chk0 = false,chk1 = false,chk2 = false,chk3 = false,chk4 = false,chk5 = false,chk6 = false;
var a=null;
var flag = 0;

var canWebgl=(function(){
    try {
        var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
    } catch ( e ) {
        return false;
    }
})();

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
     threeWidth= $obj.width(),styleValue = 0;

var changeCount=0,timg=0,moved=false;
var moved=false;
var inputs = $('.checkboxx'),checked1=false,turths=$('.truth1');

function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var thiz = this;
    //选择相关
    var selectobjs = [],mousedownflag = false,selectobj =null;


    //点和文字相关
    var startjson = [[-50,0,0],[150,0,0],[-100,-100,0],[-50,100,0]];
    var json = [[-50,0,0],[150,0,0],[-100,-100,0],[-50,100,0]];
    var cuttingLine = null,lineOA=null,lineOB = null,pointA=null,pointB=null,pointC=null,pointD=null,arrowAB = null,arrowCD=null,textA=new THREE.Group(),textB=new THREE.Group();
    var changingMesh =[],group1= new THREE.Group(),group2 = new THREE.Group();
    var changingEndJson = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]],lineAB=null,lineABArrow=null,lineCD=null,lineCDArrow=null,textA1=null,textB1=null,textA11=null,textB11=null;
    var removeDistance = [0,0,0,0],texts=[],redLineAC=[];



    var grid=null;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();
    this.renderer = null;
    if(canWebgl){
        this.renderer = new THREE.WebGLRenderer({antialias:true});
    }else{
        this.renderer = new THREE.CanvasRenderer();
    }
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.controls = null;

    var shperes = [null,null,null,null,null,null,null,null];


    this.int = function () {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 1500;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();

        var vertices = [];
        vertices.push(new THREE.Vector3(-500,0,0));
        vertices.push(new THREE.Vector3(500,0,0));
        cuttingLine = this.createLineMesh(vertices,'#6089ba',2);
        this.scene.add(cuttingLine);



        this.scene.add(textA);
        var text1 = this.createText('a',[0,0,0],'#f39800',1);
        var text2 = this.createText('→',[0,20,0],'#f39800',1);
        textA.add(text1);
        textA.add(text2);
        textA.position.x =(json[0][0]+json[1][0])/2;
        textA.position.y =(json[0][1]+json[1][1])/2+250-10;


        this.scene.add(textB);
        text1 = this.createText('b',[0,0,0],'#2769b9',1);
        text2 = this.createText('→',[0,20,0],'#2769b9',1);
        textB.add(text1);
        textB.add(text2);
        textB.position.x =(json[2][0]+json[3][0])/2;
        textB.position.y =(json[2][1]+json[3][1])/2+250;


        createLineOA(0);
        createLineOB(0);

        arrowAB = createLineArrow(1,[json[1][0]-15,json[1][1]+250,json[1][2]],'#f39800');
        this.scene.add(arrowAB);

        arrowCD = createLineArrow(1,[json[3][0],json[3][1]+250,json[3][2]],'#1161c8');
        this.scene.add(arrowCD);
        arrowCD.rotation.z = 70*Math.PI/180;
        var x,y;
        var angle = Math.atan((json[2][1]-json[3][1])/(json[2][0]-json[3][0]));
        x = 15*Math.cos(angle);
        y = 15*Math.sin(angle);
        arrowCD.position.set(json[3][0]-x,json[3][1]+250-y,json[3][2]);

        var m,g;
        m = new THREE.MeshBasicMaterial({color: '#f39800',opacity:0.5,transparent:true});
        g =  new THREE.SphereGeometry(20, 36, 36);
        shperes[0] = new THREE.Mesh(g, m);
        shperes[2] = shperes[0].clone();
        shperes[4] = shperes[0].clone();
        shperes[6] = shperes[0].clone();
        shperes[0].position.set(json[0][0],json[0][1]+250,0);
        shperes[2].position.set(json[1][0],json[1][1]+250,0);

        shperes[4].material = new THREE.MeshBasicMaterial({color: '#1161c8',opacity:0.5,transparent:true});
        shperes[6].material = new THREE.MeshBasicMaterial({color: '#1161c8',opacity:0.5,transparent:true});
        shperes[4].position.set(json[2][0],json[2][1]+250,0);
        shperes[6].position.set(json[3][0],json[3][1]+250,0);
        this.scene.add(shperes[0],shperes[2],shperes[4],shperes[6]);

        m = new THREE.MeshBasicMaterial({color: '#f39800',opacity:1,transparent:false});
        g =  new THREE.SphereGeometry(10, 36, 36);
        shperes[1] = new THREE.Mesh(g, m);
        shperes[3] = shperes[1].clone();
        shperes[5] = shperes[1].clone();
        shperes[7] = shperes[1].clone();
        shperes[1].position.set(json[0][0],json[0][1]+250,0);
        shperes[3].position.set(json[1][0],json[1][1]+250,0);

        shperes[5].material = new THREE.MeshBasicMaterial({color: '#1161c8',opacity:1,transparent:false});
        shperes[7].material = new THREE.MeshBasicMaterial({color: '#1161c8',opacity:1,transparent:false});
        shperes[5].position.set(json[2][0],json[2][1]+250,0);
        shperes[7].position.set(json[3][0],json[3][1]+250,0);
        this.scene.add(shperes[1],shperes[3],shperes[5],shperes[7]);

        m = new THREE.MeshBasicMaterial({color: '#f39800',opacity:0.3,transparent:true});
        g =  new THREE.SphereGeometry(30, 36, 36);
        pointA = new THREE.Mesh(g, m);
        pointB = pointA.clone();
        pointC = pointA.clone();
        pointD = pointA.clone();
        pointA.name = 'a';
        pointB.name = 'b';
        pointC.name = 'c';
        pointD.name = 'd';
        pointC.material = new THREE.MeshBasicMaterial({color: '#1161c8',opacity:0.3,transparent:true});
        pointD.material = new THREE.MeshBasicMaterial({color: '#1161c8',opacity:0.3,transparent:true});
        pointA.position.set(json[0][0],json[0][1]+250,0);
        pointB.position.set(json[1][0],json[1][1]+250,0);
        pointC.position.set(json[2][0],json[2][1]+250,0);
        pointD.position.set(json[3][0],json[3][1]+250,0);
        selectobjs.push(pointA,pointB,pointC,pointD);
        this.scene.add(pointA,pointB,pointC,pointD);

    };
    this.objStyle = function (color, fontsize) {
        return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
    };
    this.createLineMesh = function (vertices, color, style) {
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
                dashSize: 5,
                gapSize: 5
            }));
        }else if( style == 3){
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }
        return lineMesh;
    };
    this.createText = function (content, coordinate, color,ischange) {
        if (!color) {
            color = '#000';
        }
        var fontsize = '25px Cambria Math';

        var textStyle = this.objStyle(color, fontsize),
            text = new SpriteText2D(content, textStyle),x,y,z;


        if(ischange){
            text.position.set(coordinate[0], coordinate[1], coordinate[2]);
        }else{
            if(coordinate[0]>0){ x = coordinate[0]+25;}else{x = coordinate[0]-25; }
            if(coordinate[1]>0){ y = coordinate[1]+25;}else{y = coordinate[1]-25; }
            if(coordinate[2]>0){ z = coordinate[2]+25;}else{z = coordinate[2]-25; }
            text.position.set(x, y, z);
        }


        return text;
    };
    this.createSphere = function (coordinate, radius,color,opacity) {
        var sphereG = new THREE.SphereGeometry(radius, 36, 36);
        var sphereM;
        if(opacity >=0.8){
            sphereM = new THREE.MeshBasicMaterial({color: color,opacity:opacity,transparent:false});
        }else{
            sphereM = new THREE.MeshBasicMaterial({color: color,opacity:opacity,transparent:true});
        }
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
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableZoom = true;
        this.controls.enableRotate = false;
    };
    this.onDocumentMouseDown = function(event){
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
            intersects[0].object.material.transparent = true;
            intersects[0].object.material.opacity = 0.3;
            mousedownflag = true;
        }
    };
    this.onDocumentMouseMove = function(event){
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
                var obj = intersection.sub( offset );

                var angle1 ;

                deleteChangingMesh();
                $('.turn1').removeClass('on').addClass('off');
                $('.turn1').find('.span2').text('' +'off');

                if(obj.x >= 500){ obj.x = 500;}else if(obj.x <= -500){ obj.x = -500;}
                if(obj.y >= 500){ obj.y = 500;}else if(obj.y <= 100){ obj.y = 100;}
                var x,y;
                if(selectobj.name == 'a'){
                    shperes[0].position.x = shperes[1].position.x = selectobj.position.x = json[0][0] = obj.x;
                    shperes[0].position.y = shperes[1].position.y =selectobj.position.y = obj.y;

                    json[0][1] = obj.y - 250;

                    angle1 = Math.atan((json[0][1]-json[1][1])/(json[0][0]-json[1][0]));

                    if(json[0][0] > json[1][0]){
                        angle1 = angle1+Math.PI ;
                        arrowAB.rotation.z = angle1 ;
                    }else{
                        arrowAB.rotation.z = angle1;
                    }
                    x = 15*Math.cos(angle1);
                    y = 15*Math.sin(angle1);
                    arrowAB.position.x = json[1][0]-x;
                    arrowAB.position.y = json[1][1]+250-y;

                    createLineOA(angle1);
                }else if (selectobj.name == 'b'){
                    shperes[2].position.x = shperes[3].position.x = selectobj.position.x = json[1][0] = obj.x;
                    shperes[2].position.y = shperes[3].position.y =selectobj.position.y = obj.y;
                    json[1][1] = obj.y - 250;


                    angle1 = Math.atan((json[0][1]-json[1][1])/(json[0][0]-json[1][0]));
                    if(json[0][0] >= json[1][0]){
                        arrowAB.rotation.z = Math.PI+angle1;
                        angle1 = Math.PI+angle1;

                    }else{

                        arrowAB.rotation.z = angle1;
                    }

                    x = 15*Math.cos(angle1);
                    y = 15*Math.sin(angle1);
                    arrowAB.position.x = json[1][0]-x;
                    arrowAB.position.y = obj.y-y;
                    createLineOA(angle1);

                }else if(selectobj.name == 'c'){
                    shperes[4].position.x = shperes[5].position.x =selectobj.position.x = json[2][0] = obj.x;
                    shperes[4].position.y = shperes[5].position.y =selectobj.position.y = obj.y;
                    json[2][1] = obj.y - 250;


                    angle1 = Math.atan((json[2][1]-json[3][1])/(json[2][0]-json[3][0]));
                    if(json[2][0] >= json[3][0]){
                        arrowCD.rotation.z = Math.PI+angle1;
                        angle1 = Math.PI+angle1;
                    }else{
                        arrowCD.rotation.z = angle1;

                    }

                    x = 15*Math.cos(angle1);
                    y = 15*Math.sin(angle1);

                    arrowCD.position.x = json[3][0]-x;
                    arrowCD.position.y =json[3][1]+250-y;
                    createLineOB(angle1);
                }else{
                    shperes[6].position.x = shperes[7].position.x =selectobj.position.x = json[3][0] = obj.x;
                    shperes[6].position.y= shperes[7].position.y =selectobj.position.y = obj.y;
                    json[3][1] = obj.y - 250;


                    angle1 = Math.atan((json[2][1]-json[3][1])/(json[2][0]-json[3][0]));

                    if(json[2][0] >= json[3][0]){
                        arrowCD.rotation.z = Math.PI+angle1;
                        angle1 = Math.PI+angle1;
                    }else{
                        arrowCD.rotation.z = angle1;

                    }
                    x = 15*Math.cos(angle1);
                    y = 15*Math.sin(angle1);
                    arrowCD.position.x = json[3][0]-x;
                    arrowCD.position.y =json[3][1]+250-y;

                    createLineOB(angle1);
                }



            }
        }
    };
    this.onDocumentMouseUp = function(event){
        event.preventDefault();
        if(selectobj!=undefined){
            mousedownflag = false;
            selectobj.material.opacity = 0.3;
        }
        if ( INTERSECTED ) {
            selectobj = null;
        }

    };
    this.onDocumentTouchStart = function(event){
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
                intersects[0].object.material.transparent = true;
                intersects[0].object.material.opacity = 0.3;
                mousedownflag = true;
            }
        }
    };
    this.onDocumentTouchMove = function(event){
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
                    var obj = intersection.sub( offset );

                    var angle1 ;

                    deleteChangingMesh();

                    $('.turn1').removeClass('on').addClass('off');
                    $('.turn1').find('.span2').text('' +'off');

                    if(obj.x >= 500){ obj.x = 500;}else if(obj.x <= -500){ obj.x = -500;}
                    if(obj.y >= 500){ obj.y = 500;}else if(obj.y <= 100){ obj.y = 100;}

                    var x,y;
                    if(selectobj.name == 'a'){
                        shperes[0].position.x = shperes[1].position.x = selectobj.position.x = json[0][0] = obj.x;
                        shperes[0].position.y = shperes[1].position.y =selectobj.position.y = obj.y;

                        json[0][1] = obj.y - 250;

                        angle1 = Math.atan((json[0][1]-json[1][1])/(json[0][0]-json[1][0]));

                        if(json[0][0] > json[1][0]){
                            angle1 = angle1+Math.PI ;
                            arrowAB.rotation.z = angle1 ;
                        }else{
                            arrowAB.rotation.z = angle1;
                        }
                        x = 15*Math.cos(angle1);
                        y = 15*Math.sin(angle1);
                        arrowAB.position.x = json[1][0]-x;
                        arrowAB.position.y = json[1][1]+250-y;

                        createLineOA(angle1);
                    }else if (selectobj.name == 'b'){
                        shperes[2].position.x = shperes[3].position.x = selectobj.position.x = json[1][0] = obj.x;
                        shperes[2].position.y = shperes[3].position.y =selectobj.position.y = obj.y;
                        json[1][1] = obj.y - 250;


                        angle1 = Math.atan((json[0][1]-json[1][1])/(json[0][0]-json[1][0]));
                        if(json[0][0] >= json[1][0]){
                            arrowAB.rotation.z = Math.PI+angle1;
                            angle1 = Math.PI+angle1;

                        }else{

                            arrowAB.rotation.z = angle1;
                        }

                        x = 15*Math.cos(angle1);
                        y = 15*Math.sin(angle1);
                        arrowAB.position.x = json[1][0]-x;
                        arrowAB.position.y = obj.y-y;
                        createLineOA(angle1);

                    }else if(selectobj.name == 'c'){
                        shperes[4].position.x = shperes[5].position.x =selectobj.position.x = json[2][0] = obj.x;
                        shperes[4].position.y = shperes[5].position.y =selectobj.position.y = obj.y;
                        json[2][1] = obj.y - 250;


                        angle1 = Math.atan((json[2][1]-json[3][1])/(json[2][0]-json[3][0]));
                        if(json[2][0] >= json[3][0]){
                            arrowCD.rotation.z = Math.PI+angle1;
                            angle1 = Math.PI+angle1;
                        }else{
                            arrowCD.rotation.z = angle1;

                        }

                        x = 15*Math.cos(angle1);
                        y = 15*Math.sin(angle1);

                        arrowCD.position.x = json[3][0]-x;
                        arrowCD.position.y =json[3][1]+250-y;
                        createLineOB(angle1);
                    }else{
                        shperes[6].position.x = shperes[7].position.x =selectobj.position.x = json[3][0] = obj.x;
                        shperes[6].position.y= shperes[7].position.y =selectobj.position.y = obj.y;
                        json[3][1] = obj.y - 250;


                        angle1 = Math.atan((json[2][1]-json[3][1])/(json[2][0]-json[3][0]));

                        if(json[2][0] >= json[3][0]){
                            arrowCD.rotation.z = Math.PI+angle1;
                            angle1 = Math.PI+angle1;
                        }else{
                            arrowCD.rotation.z = angle1;

                        }
                        x = 15*Math.cos(angle1);
                        y = 15*Math.sin(angle1);
                        arrowCD.position.x = json[3][0]-x;
                        arrowCD.position.y =json[3][1]+250-y;

                        createLineOB(angle1);
                    }



                }
            }
        }
    };
    this.onDocumentTouchEnd = function(event){
        event.preventDefault();
        if(selectobj!=undefined){
            mousedownflag = false;
            selectobj.material.opacity = 0.3;
            selectobj = null;
        }
    };
    this.reback = function(){
        var i,j;
        if(checked1){
            deleteChangingMesh();
        }

        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 1500;

        for(i=0;i<4;i++){
            for(j=0;j<3;j++){
                json[i][j] = startjson[i][j];
            }
        }
        createLineOA();
        createLineOB();

        arrowAB.position.x = json[1][0]-15;
        arrowAB.position.y = json[1][1]+250;
        arrowAB.rotation.z = 0;

        arrowCD.rotation.z = 70*Math.PI/180;
        var x,y;
        var angle = Math.atan((json[2][1]-json[3][1])/(json[2][0]-json[3][0]));
        x = 15*Math.cos(angle);
        y = 15*Math.sin(angle);
        arrowCD.position.set(json[3][0]-x,json[3][1]+250-y,json[3][2]);


        pointA.position.x = shperes[0].position.x= shperes[1].position.x=json[0][0];
        pointA.position.y = shperes[0].position.y= shperes[1].position.y=json[0][1]+250;

        pointB.position.x = shperes[2].position.x= shperes[3].position.x=json[1][0];
        pointB.position.y = shperes[2].position.y= shperes[3].position.y=json[1][1]+250;

        pointC.position.x = shperes[4].position.x= shperes[5].position.x=json[2][0];
        pointC.position.y = shperes[4].position.y= shperes[5].position.y=json[2][1]+250;

        pointD.position.x = shperes[6].position.x=shperes[7].position.x=json[3][0];
        pointD.position.y = shperes[6].position.y=shperes[7].position.y=json[3][1]+250;

        for( i=0;i<selectobjs.length;i++){
            selectobjs[i].visible = true;
        }
        for(i=0;i<shperes.length;i++){
            shperes[i].visible = true;
        }


    };
    this.grid = function(){
        if(grid!=undefined){
            this.scene.remove(grid);
            grid = null;
        }else{
            this.createGrid();
        }
    };
    this.changing = function(){
        if(changeCount > 75){
            clearTimeout(timg);
            timg=0;
            changeCount=0;

            for( var i=0;i<selectobjs.length;i++){
                selectobjs[i].visible = true;
            }
            for(i=0;i<shperes.length;i++){
                shperes[i].visible = true;
            }
            return;
        }
        changeCount++;
        timg = setTimeout(function(){
            var distance1,distance2,i;
            if(changeCount<=30){
                distance1 = changeCount*removeDistance[0]/30;
                distance2 = changeCount*removeDistance[1]/30;
                group1.position.x = distance1;
                group1.position.y = distance2;
            }else if(changeCount <= 60){
                distance1 = (changeCount-30)*removeDistance[2]/30;
                distance2 = (changeCount-30)*removeDistance[3]/30;
                group2.position.x = distance1;
                group2.position.y = distance2;
            }else if(changeCount<=65){
                for(i=0;i<texts.length;i++){
                    texts[i].visible = true;
                }
            }else if(changeCount<=70){
                for(i=0;i<redLineAC.length;i++){
                    redLineAC[i].visible = true;
                }
            }else {
                $(turths[0]).css('visibility','visible');
            }

            thiz.changing();
        },50);
    };
    this.clickEve = function(){
        if(timg){
            clearTimeout(timg);
            timg=0;
            changeCount=0;
        }
        if(checked1){
            for(var i=0;i<selectobjs.length;i++){
                selectobjs[i].visible = false;
            }
            for(i=0;i<shperes.length;i++){
                shperes[i].visible = false;
            }
            createChangingMesh();
        }else{
            for( i=0;i<selectobjs.length;i++){
                selectobjs[i].visible = true;
            }
            for(i=0;i<shperes.length;i++){
                shperes[i].visible = true;
            }
            deleteChangingMesh();
        }

    };

    function createLineOA(angle){
        if(lineOA != undefined){
            thiz.scene.remove(lineOA);
        }

        var vertices = [],x=0,y=0;
        if(angle){
            x = 15*Math.cos(angle);
            y = 15*Math.sin(angle);
        }
        vertices.push(new THREE.Vector3(json[0][0],json[0][1]+250,json[0][2]));
        vertices.push(new THREE.Vector3(json[1][0]-x,json[1][1]+250-y,json[1][2]));
        lineOA = thiz.createLineMesh(vertices,'#f39800',3);
        thiz.scene.add(lineOA);

        textA.position.x = (json[0][0]+json[1][0])/2 +30;
        textA.position.y = (json[0][1]+json[1][1])/2+250 -15;
        textA.position.z = (json[0][2]+json[1][2])/2;


    }
    function createLineOB(angle){
        if(lineOB != undefined){
            thiz.scene.remove(lineOB);
        }

        var vertices = [],x=0,y=0;
        if(angle){
            x = 15*Math.cos(angle);
            y = 15*Math.sin(angle);
        }

        vertices.push(new THREE.Vector3(json[2][0],json[2][1]+250,json[2][2]));
        vertices.push(new THREE.Vector3(json[3][0]-x,json[3][1]+250-y,json[3][2]));
        lineOB = thiz.createLineMesh(vertices,'#6089ba',3);
        thiz.scene.add(lineOB);

        textB.position.x = (json[2][0]+json[3][0])/2-30;
        textB.position.y = (json[2][1]+json[3][1])/2+250-10;
        textB.position.z = (json[2][2]+json[3][2])/2;
    }

    function createLineArrow(arrow,coordinate,color){

        var vertices =[];
        if(arrow == 1){             //朝右
            vertices.push(new THREE.Vector3(-10,8,0));
            vertices.push(new THREE.Vector3(15,0,0));
            vertices.push(new THREE.Vector3(0-10,0-8,0));
        }

        var material2 = new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:0.9});
        var geom = new THREE.Geometry();
        geom.vertices = vertices;
        geom.faces.push(new THREE.Face3(0,1,2));
        geom.faces.push(new THREE.Face3(2,1,0));
        var obj = new THREE.SceneUtils.createMultiMaterialObject(geom,[material2]);

        // obj.scale.x = 0.8;
        // obj.scale.y = 0.8;
        // obj.scale.z = 0.8;
        obj.position.x = coordinate[0];
        obj.position.y = coordinate[1];
        obj.position.z = coordinate[2];

        return obj;
    }

    function createChangingMesh(){
        var i;
        lineAB = lineOA.clone();
        group1.add(lineAB);
        lineABArrow = arrowAB.clone();
        group1.add(lineABArrow);


        textA1 = thiz.createText('a',[(json[0][0]+json[1][0])/2+30,(json[0][1]+json[1][1])/2+250-10,(json[0][2]+json[1][2])/2],'#f39800',1);
        textA11 = thiz.createText('→',[(json[0][0]+json[1][0])/2+30,(json[0][1]+json[1][1])/2+270-10,(json[0][2]+json[1][2])/2],'#f39800',1);
        group1.add(textA1);
        group1.add(textA11);

        // textA1 = thiz.createText('a',[(json[0][0]+json[1][0])/2,(json[0][1]+json[1][1])/2+250,(json[0][2]+json[1][2])/2],'#2769b9',1);
        // group1.add(textA1);


        lineCD = lineOB.clone();
        group2.add(lineCD);
        lineCDArrow = arrowCD.clone();
        group2.add(lineCDArrow);// arrow的position为真实，line为创建点开始
        // textB1 = thiz.createText('b',[(json[2][0]+json[3][0])/2,(json[2][1]+json[3][1])/2+250,(json[2][2]+json[3][2])/2],'#666',1);
        // group2.add(textB1);


        textB1 = thiz.createText('b',[(json[2][0]+json[3][0])/2-30,(json[2][1]+json[3][1])/2+250-10,(json[2][2]+json[3][2])/2],'#2769b9',1);
        textB11 = thiz.createText('→',[(json[2][0]+json[3][0])/2-30,(json[2][1]+json[3][1])/2+270-10,(json[2][2]+json[3][2])/2],'#2769b9',1);

        group2.add(textB1);
        group2.add(textB11);

        thiz.scene.add(group1);
        thiz.scene.add(group2);

        changingEndJson[0][0] =  json[0][0];
        changingEndJson[0][1] =  json[0][1];
        changingEndJson[0][2] =  json[0][2];

        changingEndJson[1][0] =  json[1][0];
        changingEndJson[1][1] =  json[1][1];
        changingEndJson[1][2] =  json[1][2];

        changingEndJson[2][0] = json[1][0];
        changingEndJson[2][1] = json[1][1];
        changingEndJson[2][2] = json[1][2];

        changingEndJson[3][0] = json[3][0] + json[1][0] - json[2][0];
        changingEndJson[3][1] = json[3][1] + json[1][1] - json[2][1];
        changingEndJson[3][2] = json[3][2] + json[1][2] - json[2][2];


        var center=[0,0],removeCenter=[0,0];


        center[0] = (changingEndJson[0][0]+changingEndJson[1][0]+changingEndJson[3][0])/3;
        center[1] = (changingEndJson[0][1]+changingEndJson[1][1]+changingEndJson[3][1])/3;


        removeCenter[0] = -center[0];
        removeCenter[1] = -500 - center[1];


        for(i=0;i<4;i++){
            changingEndJson[i][0] =  changingEndJson[i][0] + removeCenter[0];
            changingEndJson[i][1] =  changingEndJson[i][1] + removeCenter[1];
        }

        removeDistance[0] = (changingEndJson[0][0]+changingEndJson[1][0])/2 - (json[0][0]+json[1][0])/2;
        removeDistance[1] = (changingEndJson[0][1]+changingEndJson[1][1])/2 - (json[0][1]+json[1][1])/2 - 250;
        removeDistance[2] = (changingEndJson[2][0]+changingEndJson[3][0])/2 - (json[2][0]+json[3][0])/2;
        removeDistance[3] = (changingEndJson[2][1]+changingEndJson[3][1])/2 - (json[2][1]+json[3][1])/2 - 250;


        var textMesh = thiz.createText('A',changingEndJson[0],'#666',0);
        textMesh.visible = false;
        thiz.scene.add(textMesh);
        texts.push(textMesh);
        changingMesh.push(textMesh);
        textMesh = thiz.createText('B',changingEndJson[1],'#666',0);
        textMesh.visible = false;
        thiz.scene.add(textMesh);
        texts.push(textMesh);
        changingMesh.push(textMesh);
        textMesh = thiz.createText('C',changingEndJson[3],'#666',0);
        textMesh.visible = false;
        thiz.scene.add(textMesh);
        texts.push(textMesh);
        changingMesh.push(textMesh);

        var vertices = [];
        vertices.push(new THREE.Vector3(changingEndJson[0][0],changingEndJson[0][1],changingEndJson[0][2]));
        vertices.push(new THREE.Vector3(changingEndJson[3][0],changingEndJson[3][1],changingEndJson[3][2]));
        var lineMesh = thiz.createLineMesh(vertices,'red',1);
        lineMesh.visible = false;
        redLineAC.push(lineMesh);
        thiz.scene.add(lineMesh);
        changingMesh.push(lineMesh);

        var arrow = createLineArrow(1,changingEndJson[3],'red');
        var angle2 = Math.atan((changingEndJson[3][1]-changingEndJson[0][1])/(changingEndJson[3][0]-changingEndJson[0][0]));
        if(changingEndJson[0][0]  <= changingEndJson[1][0]){
            arrow.rotation.z = angle2;
        }else{
            arrow.rotation.z = angle2-Math.PI;
        }

        var x = 15*Math.cos(angle2);
        var y = 15*Math.sin(angle2);
        arrow.position.x -= x;
        arrow.position.y -= y;



        arrow.visible =false;
        thiz.scene.add(arrow);
        changingMesh.push(arrow);
        redLineAC.push(arrow);
        changingMesh.push(arrow);

        textMesh = thiz.createText('a',[(changingEndJson[0][0]+changingEndJson[3][0])/2,(changingEndJson[0][1]+changingEndJson[3][1])/2,0],'red',1);
        textMesh.visible =false;
        thiz.scene.add(textMesh);
        changingMesh.push(textMesh);
        redLineAC.push(textMesh);
        changingMesh.push(textMesh);

        textMesh = thiz.createText('→',[(changingEndJson[0][0]+changingEndJson[3][0])/2,(changingEndJson[0][1]+changingEndJson[3][1])/2+20,0],'red',1);
        textMesh.visible =false;
        thiz.scene.add(textMesh);
        changingMesh.push(textMesh);
        redLineAC.push(textMesh);
        changingMesh.push(textMesh);

        textMesh = thiz.createText('+',[(changingEndJson[0][0]+changingEndJson[3][0])/2+30,(changingEndJson[0][1]+changingEndJson[3][1])/2,0],'red',1);
        textMesh.visible =false;
        thiz.scene.add(textMesh);
        changingMesh.push(textMesh);
        redLineAC.push(textMesh);
        changingMesh.push(textMesh);

        textMesh = thiz.createText('b',[(changingEndJson[0][0]+changingEndJson[3][0])/2+50,(changingEndJson[0][1]+changingEndJson[3][1])/2,0],'red',1);
        textMesh.visible =false;
        thiz.scene.add(textMesh);
        changingMesh.push(textMesh);
        redLineAC.push(textMesh);
        changingMesh.push(textMesh);

        textMesh = thiz.createText('→',[(changingEndJson[0][0]+changingEndJson[3][0])/2+50,(changingEndJson[0][1]+changingEndJson[3][1])/2+20,0],'red',1);
        textMesh.visible =false;
        thiz.scene.add(textMesh);
        changingMesh.push(textMesh);
        redLineAC.push(textMesh);
        changingMesh.push(textMesh);

        thiz.changing();

    }
    function deleteChangingMesh(){
        if(changingMesh.length>0){
            for(var i=0;i<changingMesh.length;i++){
                thiz.scene.remove(changingMesh[i]);
            }
        }
        thiz.scene.remove(group1);
        thiz.scene.remove(group2);
        texts=[];
        changingMesh=[];
        redLineAC=[];
        group1 = new THREE.Group();
        group2 = new THREE.Group();
    }

}


var threeDimensional = new ThreeDimensional();
threeDimensional.int();

threeDimensional.renderer.domElement.addEventListener( 'mousedown', threeDimensional.onDocumentMouseDown, false );
threeDimensional.renderer.domElement.addEventListener( 'mouseup', threeDimensional.onDocumentMouseUp, false );
threeDimensional.renderer.domElement.addEventListener( 'mousemove', threeDimensional.onDocumentMouseMove, false );
threeDimensional.renderer.domElement.addEventListener( 'touchstart', threeDimensional.onDocumentTouchStart, false );
threeDimensional.renderer.domElement.addEventListener( 'touchmove', threeDimensional.onDocumentTouchMove, false );
threeDimensional.renderer.domElement.addEventListener( 'touchend', threeDimensional.onDocumentTouchEnd, false );


//重置事件
function renderAll(){
    //threeDimension.controls.update();

    requestAnimationFrame(renderAll);
    threeDimensional.renderer.render(threeDimensional.scene,threeDimensional.camera);
}
renderAll();


//on/off事件
function clickEve1(){
    var dataId = $(this).attr('data-id');
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
        checked1 = false;
    }else{
        checked1 = true;
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
    }

    threeDimensional.clickEve();
}





/*全屏事件*/
var fullScreen=0;
function fullEve(){
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
function renewEve(){
    threeDimensional.reback();
    $('.turn1').removeClass('on').addClass('off');
    $('.turn1').find('.span2').text('' +'off');
}

if(!isMob){
    $('#scale').on('click',fullEve);
    $('#renew').on('click',renewEve);
    $('.turnRight').on('click',clickEve1);
}else{
    $('#scale').on('touchstart',fullEve);
    $('#renew').on('touchstart',renewEve);
    $('.turnRight').on('touchstart',clickEve1);
}



