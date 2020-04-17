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
var checked =false;


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


var moved=false;
var result1 = $('.result1'),result2 = $('.result2');
var n1=0,n2=0;

function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相
    var thiz = this;
    //选择相关
    var selectobjs = [],mousedownflag = false,selectobj =null;


    //点和文字相关
    var pointJson2start = [[200,600,0],[600,0,0],[800,600,0],[166.666,500,0],[500,0,0]];
    var pointA =null,textA=null,pointB =null,textB=null,pointC =null,textC=null,pointO =null,textO=null,pointE1=null,textE1=new THREE.Group(),pointE2=null,textE2=new THREE.Group(),textC1=new THREE.Group();
    var pointJson1 = [[0,0,0],[200,600,0],[600,0,0],[800,600,0]];//O点/A点/B点/C点
    var pointJson2 = [[166.666,500,0],[500,0,0]];//E1点/E2点
    var lineOA=null,arrowOA=null,lineOB=null,arrowOB=null,lineAC=null,lineBC=null,lineOC=null,arrowOC=null,lineOE1=null,arrowOE1=null,lineOE2=null,arrowOE2=null;



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


    var spheres = [null,null,null,null,null,null];
    this.int = function () {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 3000;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
        this.createGrid();

        textO = this.createText('O',pointJson1[0],'#666');


        textA = this.createText('A',pointJson1[1],'#666');
        this.scene.add(textA);

        textB = this.createText('B',pointJson1[2],'#666');
        this.scene.add(textB);


        textC = this.createText('C',[830,630,0],'#666');
        this.scene.add(textC);

        var textO = this.createText('O',[-8,-8,0],'#666',1);
        this.scene.add(textO);


        this.scene.add(textE1);
        var text1 = this.createText('e',[0,0,0],'red',1);
        var text2 = this.createText('1',[30,-30,0],'red',1,35);
        var text3 = this.createText('→',[0,25,0],'red',1);
        textE1.add(text1);
        textE1.add(text2);
        textE1.add(text3);
        textE1.position.x =0;
        textE1.position.y =(pointJson1[0][1]+pointJson2[0][1])/2;


        this.scene.add(textE2);
        text1 = this.createText('e',[0,-10,0],'red',1);
        text2 = this.createText('2',[30,-40,0],'red',1,35);
        text3 = this.createText('→',[0,15,0],'red',1);
        textE2.add(text1);
        textE2.add(text2);
        textE2.add(text3);
        textE2.position.x =(pointJson1[0][0]+pointJson2[1][0])/2;
        textE2.position.y =0;

        this.scene.add(textC1);
        text1 = this.createText('a',[0,0,0],'#2769b9',1);
        text2 = this.createText('→',[0,25,0],'#2769b9',1);
        textC1.add(text1);
        textC1.add(text2);
        textC1.position.x =(pointJson1[3][0]+pointJson1[0][0])/2;
        textC1.position.y =(pointJson1[3][1]+pointJson1[0][1])/2;


        arrowOE1 = createLineArrow(1,pointJson2[0],'#f39800');
        thiz.scene.add(arrowOE1);

        var angle = Math.atan(pointJson2[0][1]/pointJson2[0][0]),x,y;
        if( pointJson2[0][0] >0){
            arrowOE1.rotation.z = angle;
        }else{
            arrowOE1.rotation.z = angle+Math.PI;
            angle = angle+Math.PI;
        }

        x =30*Math.cos(angle);
        y = 30*Math.sin(angle);

        arrowOE1.position.x = pointJson2[0][0]-x;
        arrowOE1.position.y = pointJson2[0][1]-y;


        arrowOE2 = createLineArrow(1,pointJson2[1],'#f39800',0);
        thiz.scene.add(arrowOE2);

        angle = Math.atan(pointJson2[1][1]/pointJson2[1][0]);
        if( pointJson2[1][0] >0){
            arrowOE2.rotation.z = angle;
        }else{
            arrowOE2.rotation.z = angle+Math.PI;
            angle = angle+Math.PI;
        }

        x =30*Math.cos(angle);
        y = 30*Math.sin(angle);

        arrowOE2.position.x = pointJson2[1][0]-x;
        arrowOE2.position.y = pointJson2[1][1]-y;

        arrowOC = createLineArrow(1,pointJson1[3],'#f39800');
        this.scene.add(arrowOC);
        arrowOC.rotation.z = Math.PI/4;

        angle = Math.atan(pointJson1[3][1]/pointJson1[3][0]);
        if( pointJson1[3][0] >0){
            arrowOC.rotation.z = angle;
        }else{
            arrowOC.rotation.z = angle+Math.PI;
            angle = angle+Math.PI;
        }

        x =30*Math.cos(angle);
        y = 30*Math.sin(angle);

        arrowOC.position.x = pointJson1[3][0]-x;
        arrowOC.position.y = pointJson1[3][1]-y;


        var m,g;
        m = new THREE.MeshBasicMaterial({color: '#f39800',opacity:0.5,transparent:true});
        g =  new THREE.SphereGeometry(40, 36, 36);
        spheres[0] = new THREE.Mesh(g, m);
        spheres[2] = spheres[0].clone();
        spheres[4] = spheres[0].clone();
        spheres[0].position.set(pointJson2[0][0],pointJson2[0][1],0);
        spheres[2].position.set(pointJson2[1][0],pointJson2[1][1],0);
        spheres[4].position.set(pointJson1[3][0],pointJson1[3][1],0);
        this.scene.add(spheres[0],spheres[2],spheres[4]);


        m = new THREE.MeshBasicMaterial({color: '#f39800',opacity:1,transparent:false});
        g =  new THREE.SphereGeometry(20, 36, 36);
        spheres[1] = new THREE.Mesh(g, m);
        spheres[3] = spheres[1].clone();
        spheres[5] = spheres[1].clone();
        spheres[1].position.set(pointJson2[0][0],pointJson2[0][1],0);
        spheres[3].position.set(pointJson2[1][0],pointJson2[1][1],0);
        spheres[5].position.set(pointJson1[3][0],pointJson1[3][1],0);
        this.scene.add(spheres[1],spheres[3],spheres[5]);

        m = new THREE.MeshBasicMaterial({color: '#f39800',opacity:0.3,transparent:true});
        g =  new THREE.SphereGeometry(60, 36, 36);
        pointE1 = new THREE.Mesh(g, m);
        pointE2 = pointE1.clone();
        pointC = pointE1.clone();
        pointE1.name = 'e1';
        pointE2.name = 'e2';
        pointE1.position.set(pointJson2[0][0],pointJson2[0][1],0);
        pointE2.position.set(pointJson2[1][0],pointJson2[1][1],0);
        pointC.position.set(pointJson1[3][0],pointJson1[3][1],0);
        this.scene.add(pointE1,pointE2,pointC);
        selectobjs.push(pointE1,pointE2,pointC);


        arrowOA = createLineArrow(1,pointJson1[1],'#1161c8');
        this.scene.add(arrowOA);
        arrowOA.rotation.z = Math.PI/2;

        arrowOB = createLineArrow(1,pointJson1[2],'#1161c8');
        this.scene.add(arrowOB);

        createLineOC();

        createLineOE1();
        createLineOE2();

        createLineOA();
        createLineOB();
        createLineAC();
        createLineBC();




        count();


    };
    this.objStyle = function (color, fontsize) {
        return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
    };
    this.createLineMesh = function (vertices, color, style) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        if (!style) {
            vertices.push(new THREE.Vector3(vertices[0].x,vertices[0].y-0.02,5));
            vertices.push(new THREE.Vector3(vertices[1].x,vertices[1].y-0.02,5));
            vertices.push(new THREE.Vector3(vertices[0].x+0.02,vertices[0].y,5));
            vertices.push(new THREE.Vector3(vertices[1].x+0.02,vertices[1].y,5));
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color,transparent:false}));
        } else {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 1,
                dashSize: 30,
                gapSize: 10
            }));
        }
        return lineMesh;
    };
    this.createText = function (content, coordinate, color,ischange,fontsize) {
        if (!color) {
            color = '#000';
        }
        if(!fontsize){
            fontsize = 60;
        }
        var fontsize = fontsize+'px Cambria Math';

        var textStyle = this.objStyle(color, fontsize),
            text = new SpriteText2D(content, textStyle),x,y,z;


        if(ischange){
            text.position.set(coordinate[0], coordinate[1], coordinate[2]);
        }else{
            if(coordinate[0]>0){ x = coordinate[0]+50;}else{x = coordinate[0]-50; }
            if(coordinate[1]>0){ y = coordinate[1]+50;}else{y = coordinate[1]-50; }
            if(coordinate[2]>0){ z = coordinate[2]+50;}else{z = coordinate[2]-50; }
            text.position.set(x, y, z);
        }



        return text;
    };
    this.createSphere = function (coordinate, radius,color) {
        var sphereG = new THREE.SphereGeometry(radius, 10, 10, 0, 2 * Math.PI, 0, 2 * Math.PI);
        var sphereM = new THREE.MeshBasicMaterial({color: color,opacity:0.5,transparent:true});
        var sphere = new THREE.Mesh(sphereG, sphereM);
        sphere.position.x = coordinate[0];
        sphere.position.y = coordinate[1];
        sphere.position.z = coordinate[2];
        return sphere;
        // this.scene.add(sphere);
        // selectObjs.push(sphere);
        // bigMeshs.push(sphere);
    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableZoom = true;
        this.controls.enableRotate = false;
    };
    this.createGrid = function(){
        var geometry = new THREE.Geometry(), bottom = -0.001, step = 100;
        var lineMaterial = new THREE.LineBasicMaterial( { color: 0x949494, transparent: true, opacity: 0.5 } );
        for ( var i = 0; i <= 20; i ++ ) {
            geometry.vertices.push( new THREE.Vector3( - 1000, bottom, i * step - 1000 ) );
            geometry.vertices.push( new THREE.Vector3(   1000, bottom, i * step - 1000 ) );

            geometry.vertices.push( new THREE.Vector3(i * step - 1000, bottom, -1000));
            geometry.vertices.push( new THREE.Vector3( i * step - 1000, bottom,  1000 ) );
        }
        grid = new THREE.LineSegments( geometry, lineMaterial, THREE.LinePieces );
        this.scene.add( grid );
        window.gridColor = 0x303030;
        grid.rotation.x = Math.PI/2;
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
            // intersects[0].object.material.opacity = 0.8;
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
                var angle ,x,y;
                if(selectobj.name == 'e1'){
                    if(obj.y > 1000){ obj.y = 1000;}
                    if(obj.y < -1000){ obj.y = -1000;}

                    spheres[0].position.x = spheres[1].position.x = pointJson2[0][0] =  pointE1.position.x = obj.x;
                    spheres[0].position.y = spheres[1].position.y = pointJson2[0][1] = pointE1.position.y = obj.y;

                    count();
                    createLineOE1();


                    angle = Math.atan(pointJson2[0][1]/pointJson2[0][0]);
                    if( obj.x >0){
                        arrowOE1.rotation.z = angle;
                    }else{
                        arrowOE1.rotation.z = angle+Math.PI;
                        angle = angle+Math.PI;
                    }

                    x =30*Math.cos(angle);
                    y = 30*Math.sin(angle);

                    arrowOE1.position.x =  obj.x - x;
                    arrowOE1.position.y =  obj.y - y;


                }else if(selectobj.name == 'e2'){
                    if(obj.x > 1000){ obj.x = 1000;}
                    if(obj.x < -1000){ obj.x = -1000;}

                    spheres[2].position.x = spheres[3].position.x =pointJson2[1][0] =  pointE2.position.x = obj.x;
                    spheres[2].position.y = spheres[3].position.y =pointJson2[1][1] =  pointE2.position.y = obj.y;

                    count();
                    createLineOE2();


                    angle = Math.atan(pointJson2[1][1]/pointJson2[1][0]);
                    if( obj.x >0){
                        arrowOE2.rotation.z = angle;
                    }else{
                        arrowOE2.rotation.z = angle+Math.PI;
                        angle = angle+Math.PI;
                    }

                    x =30*Math.cos(angle);
                    y = 30*Math.sin(angle);

                    arrowOE2.position.x =  obj.x - x;
                    arrowOE2.position.y =  obj.y - y;

                }else{

                    if(obj.x > 1000){ obj.x = 1000;}
                    if(obj.x < -1000){ obj.x = -1000;}
                    if(obj.y > 1000){ obj.y = 1000;}
                    if(obj.y < -1000){ obj.y = -1000;}

                    spheres[4].position.x = spheres[5].position.x =pointJson1[3][0] = pointC.position.x = obj.x;
                    spheres[4].position.y = spheres[5].position.y =pointJson1[3][1] = pointC.position.y =  obj.y;

                    textC.position.x = obj.x +80;
                    textC.position.y = obj.y +80;



                    angle = Math.atan(obj.y/obj.x);
                    if( obj.x >0){
                        arrowOC.rotation.z = angle;
                    }else{
                        arrowOC.rotation.z = angle + Math.PI;
                        angle = angle + Math.PI;
                    }

                    x = 30*Math.cos(angle);
                    y = 30*Math.sin(angle);

                    arrowOC.position.x =  obj.x - x;
                    arrowOC.position.y =  obj.y - y;

                    count();

                }
                createLineOC();
                createLineOA();
                createLineOB();
                createLineAC();
                createLineBC();


            }
        }
    };
    this.onDocumentMouseUp = function(event){
        event.preventDefault();
        if(selectobj!=undefined){
            mousedownflag = false;
            // selectobj.material.opacity = 0.5;
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
                // intersects[0].object.material.opacity = 0.8;
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
                    var angle ,x,y;
                    if(selectobj.name == 'e1'){
                        if(obj.y > 1000){ obj.y = 1000;}
                        if(obj.y < -1000){ obj.y = -1000;}

                        spheres[0].position.x = spheres[1].position.x = pointJson2[0][0] =  pointE1.position.x = obj.x;
                        spheres[0].position.y = spheres[1].position.y = pointJson2[0][1] = pointE1.position.y = obj.y;

                        count();
                        createLineOE1();


                        angle = Math.atan(pointJson2[0][1]/pointJson2[0][0]);
                        if( obj.x >0){
                            arrowOE1.rotation.z = angle;
                        }else{
                            arrowOE1.rotation.z = angle+Math.PI;
                            angle = angle+Math.PI;
                        }

                        x =30*Math.cos(angle);
                        y = 30*Math.sin(angle);

                        arrowOE1.position.x =  obj.x - x;
                        arrowOE1.position.y =  obj.y - y;


                    }else if(selectobj.name == 'e2'){
                        if(obj.x > 1000){ obj.x = 1000;}
                        if(obj.x < -1000){ obj.x = -1000;}

                        spheres[2].position.x = spheres[3].position.x =pointJson2[1][0] =  pointE2.position.x = obj.x;
                        spheres[2].position.y = spheres[3].position.y =pointJson2[1][1] =  pointE2.position.y = obj.y;

                        count();
                        createLineOE2();


                        angle = Math.atan(pointJson2[1][1]/pointJson2[1][0]);
                        if( obj.x >0){
                            arrowOE2.rotation.z = angle;
                        }else{
                            arrowOE2.rotation.z = angle+Math.PI;
                            angle = angle+Math.PI;
                        }

                        x =30*Math.cos(angle);
                        y = 30*Math.sin(angle);

                        arrowOE2.position.x =  obj.x - x;
                        arrowOE2.position.y =  obj.y - y;

                    }else{

                        if(obj.x > 1000){ obj.x = 1000;}
                        if(obj.x < -1000){ obj.x = -1000;}
                        if(obj.y > 1000){ obj.y = 1000;}
                        if(obj.y < -1000){ obj.y = -1000;}

                        spheres[4].position.x = spheres[5].position.x =pointJson1[3][0] = pointC.position.x = obj.x;
                        spheres[4].position.y = spheres[5].position.y =pointJson1[3][1] = pointC.position.y =  obj.y;

                        textC.position.x = obj.x +80;
                        textC.position.y = obj.y +80;



                        angle = Math.atan(obj.y/obj.x);
                        if( obj.x >0){
                            arrowOC.rotation.z = angle;
                        }else{
                            arrowOC.rotation.z = angle + Math.PI;
                            angle = angle + Math.PI;
                        }

                        x = 30*Math.cos(angle);
                        y = 30*Math.sin(angle);

                        arrowOC.position.x =  obj.x - x;
                        arrowOC.position.y =  obj.y - y;

                        count();

                    }
                    createLineOC();
                    createLineOA();
                    createLineOB();
                    createLineAC();
                    createLineBC();


                }
            }
        }
    };
    this.onDocumentTouchEnd = function(event){
        event.preventDefault();
        if(selectobj!=undefined){
            mousedownflag = false;
            // selectobj.material.opacity = 0.5;
            selectobj = null;
        }
    };
    this.reback = function(){

        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 3000;


        pointJson1[1][0] = pointJson2start[0][0];
        pointJson1[1][1] = pointJson2start[0][1];
        pointJson1[1][2] = pointJson2start[0][2];

        pointJson1[2][0] = pointJson2start[1][0];
        pointJson1[2][1] = pointJson2start[1][1];
        pointJson1[2][2] = pointJson2start[1][2];


        pointJson1[3][0] = pointJson2start[2][0];
        pointJson1[3][1] = pointJson2start[2][1];
        pointJson1[3][2] = pointJson2start[2][2];


        pointJson2[0][0] = pointJson2start[3][0];
        pointJson2[0][1] = pointJson2start[3][1];
        pointJson2[0][2] = pointJson2start[3][2];

        pointJson2[1][0] = pointJson2start[4][0];
        pointJson2[1][1] = pointJson2start[4][1];
        pointJson2[1][2] = pointJson2start[4][2];




        var angle = Math.atan(pointJson2[0][1]/pointJson2[0][0]);
        if( pointJson2[0][0] >0){
            arrowOE1.rotation.z = angle;
        }else{
            arrowOE1.rotation.z = angle+Math.PI;
            angle = angle+Math.PI;

        }
        var x =30*Math.cos(angle);
        var y = 30*Math.sin(angle);

        arrowOE1.position.x = pointJson2[0][0]-x;
        arrowOE1.position.y = pointJson2[0][1]-y;

        spheres[0].position.x = spheres[1].position.x =pointE1.position.x = pointJson2[0][0];
        spheres[0].position.y= spheres[1].position.y = pointE1.position.y = pointJson2[0][1];







        angle = Math.atan(pointJson2[1][1]/pointJson2[1][0]);
        if( pointJson2[1][0] >0){
            arrowOE2.rotation.z = angle;
        }else{
            arrowOE2.rotation.z = angle+Math.PI;
            angle =angle+Math.PI;
        }

        x =30*Math.cos(angle);
        y = 30*Math.sin(angle);

        spheres[2].position.x = spheres[3].position.x =pointE2.position.x = pointJson2[1][0];
        spheres[2].position.y = spheres[3].position.y =pointE2.position.y = pointJson2[1][1];
        arrowOE2.position.x = pointJson2[1][0] -x;
        arrowOE2.position.y =pointJson2[1][1] -y;




        textC.position.x = pointJson1[3][0]+80;
        textC.position.y = pointJson1[3][1]+80;


        angle = Math.atan(pointJson1[3][1]/pointJson1[3][0]);
        if( pointJson1[3][0] >0){
            arrowOC.rotation.z = angle;
        }else{
            arrowOC.rotation.z = angle + Math.PI;
            angle = angle + Math.PI;
        }

        x =30*Math.cos(angle);
        y = 30*Math.sin(angle);

        spheres[4].position.x = spheres[5].position.x =pointC.position.x = pointJson1[3][0];
        spheres[4].position.y = spheres[5].position.y =pointC.position.y = pointJson1[3][1];
        arrowOC.position.x =  pointJson1[3][0]-x;
        arrowOC.position.y =  pointJson1[3][1]-y;


        count();
        createLineOE1();
        createLineOE2();
        createLineOC();
        createLineOA();
        createLineOB();
        createLineAC();
        createLineBC();




    };
    this.clickEve = function(){
        createLineOE1();
        createLineOE2();
        createLineOC();
        createLineOA();
        createLineOB();
        createLineAC();
        createLineBC();

    };
    this.grid = function(){
        if(grid!=undefined){
            this.scene.remove(grid);
            grid = null;
        }else{
            this.createGrid();
        }
    };
    function createLineOE1(){
        if(lineOE1!=undefined){
            thiz.scene.remove(lineOE1);
            lineOE1 = null;
        }
        var vertices = [];
        vertices.push(new THREE.Vector3(pointJson1[0][0],pointJson1[0][1],pointJson1[0][2]));
        vertices.push(new THREE.Vector3(pointJson2[0][0],pointJson2[0][1],pointJson2[0][2]));
        lineOE1 = thiz.createLineMesh(vertices,'#f39800');
        thiz.scene.add(lineOE1);

        textE1.position.y = (pointJson1[0][1]+pointJson2[0][1])/2;
        textE1.position.x = (pointJson1[0][0]+pointJson2[0][0])/2;

    }
    function createLineOE2(){
        if(lineOE2!=undefined){
            thiz.scene.remove(lineOE2);
            lineOE2 = null;
        }
        var vertices = [];
        vertices.push(new THREE.Vector3(pointJson1[0][0],pointJson1[0][1],pointJson1[0][2]));
        vertices.push(new THREE.Vector3(pointJson2[1][0],pointJson2[1][1],pointJson2[1][2]));
        lineOE2 = thiz.createLineMesh(vertices,'#f39800',0);
        thiz.scene.add(lineOE2);

        textE2.position.y = (pointJson1[0][1]+pointJson2[1][1])/2;
        textE2.position.x = (pointJson1[0][0]+pointJson2[1][0])/2;

    }
    function createLineOC(){
        if(lineOC!=undefined){
            thiz.scene.remove(lineOC);
        }
        var vertices = [];
        vertices.push(new THREE.Vector3(pointJson1[0][0],pointJson1[0][1],pointJson1[0][2]));
        vertices.push(new THREE.Vector3(pointJson1[3][0],pointJson1[3][1],pointJson1[3][2]));
        lineOC = thiz.createLineMesh(vertices,'#f39800',0);
        thiz.scene.add(lineOC);


        textC1.position.x = (pointJson1[3][0]+pointJson1[0][0])/2;
        textC1.position.y = (pointJson1[3][1]+pointJson1[0][1])/2;

    }

    function createLineOA(){
        if(lineOA!=undefined){
            thiz.scene.remove(lineOA);
        }

        var x =0,y=0,angle1;
        var angle = Math.atan(pointJson1[1][1]/pointJson1[1][0]);
        if(pointJson1[1][0]>0){
            arrowOA.rotation.z = angle;
            angle1 = angle;
        }else{
            arrowOA.rotation.z = angle + Math.PI;
            angle1 = angle + Math.PI;
        }
        x = 15*Math.cos(angle1);
        y = 15*Math.sin(angle1);
        var vertices = [];
        vertices.push(new THREE.Vector3(pointJson1[0][0],pointJson1[0][1],pointJson1[0][2]));
        vertices.push(new THREE.Vector3(pointJson1[1][0]-x,pointJson1[1][1]-y,pointJson1[1][2]));
        lineOA = thiz.createLineMesh(vertices,'#1a67ca',1);
        thiz.scene.add(lineOA);

        textA.position.x = pointJson1[1][0]+50;
        textA.position.y = pointJson1[1][1]+50;

        arrowOA.position.x = pointJson1[1][0]-x;
        arrowOA.position.y = pointJson1[1][1]-y;


        if(checked){
            arrowOA.visible =textA.visible=lineOA.visible = true;
        }else{
            lineOA.visible = false;
            arrowOA.visible =textA.visible=lineOA.visible = false;
        }
    }

    function createLineOB(){
        if(lineOB!=undefined){
            thiz.scene.remove(lineOB);
        }

        var x =0,y=0,angle1;
        var angle = Math.atan(pointJson1[2][1]/pointJson1[2][0]);
        if(pointJson1[2][0]>0){
            arrowOB.rotation.z = angle;
            angle1 = angle;
        }else{
            arrowOB.rotation.z = angle + Math.PI;
            angle1 = angle + Math.PI;
        }

        x = 15*Math.cos(angle1);
        y = 15*Math.sin(angle1);

        var vertices = [];
        vertices.push(new THREE.Vector3(pointJson1[0][0],pointJson1[0][1],pointJson1[0][2]));
        vertices.push(new THREE.Vector3(pointJson1[2][0]-x,pointJson1[2][1]-y,pointJson1[2][2]));
        lineOB = thiz.createLineMesh(vertices,'#1a67ca',1);
        thiz.scene.add(lineOB);

        textB.position.x = pointJson1[2][0]+50;
        textB.position.y = pointJson1[2][1]+50;

        arrowOB.position.x = pointJson1[2][0];
        arrowOB.position.y = pointJson1[2][1];



        if(checked){

            arrowOB.visible = textB.visible = lineOB.visible = true;
        }else{
            arrowOB.visible = textB.visible = lineOB.visible =false;
        }

    }

    function createLineAC(){
        if(lineAC!=undefined){
            thiz.scene.remove(lineAC);
        }
        var vertices = [];
        vertices.push(new THREE.Vector3(pointJson1[1][0],pointJson1[1][1],pointJson1[1][2]));
        vertices.push(new THREE.Vector3(pointJson1[3][0],pointJson1[3][1],pointJson1[3][2]));
        lineAC = thiz.createLineMesh(vertices,'#1161c8',1);
        thiz.scene.add(lineAC);
        if(checked){
            lineAC.visible = true;
        }else{
            lineAC.visible =false;
        }
    }

    function createLineBC(){
        if(lineBC!=undefined){
            thiz.scene.remove(lineBC);
        }
        var vertices = [];
        vertices.push(new THREE.Vector3(pointJson1[2][0],pointJson1[2][1],pointJson1[2][2]));
        vertices.push(new THREE.Vector3(pointJson1[3][0],pointJson1[3][1],pointJson1[3][2]));
        lineBC = thiz.createLineMesh(vertices,'#1161c8',1);
        thiz.scene.add(lineBC);
        if(checked){
            lineBC.visible = true;
        }else{
            lineBC.visible =false;
        }
    }

    function count(){
        n1 = (pointJson2[0][1]*pointJson1[3][0] - pointJson2[0][0]*pointJson1[3][1])/(pointJson2[1][0]*pointJson2[0][1] - pointJson2[1][1]*pointJson2[0][0]);
        n2 = (pointJson2[1][1]*pointJson1[3][0] - pointJson2[1][0]*pointJson1[3][1])/(pointJson2[1][1]*pointJson2[0][0] - pointJson2[1][0]*pointJson2[0][1]);

        pointJson1[1][0] = n2*pointJson2[0][0];
        pointJson1[1][1] = n2*pointJson2[0][1];

        pointJson1[2][0] = n1*pointJson2[1][0];
        pointJson1[2][1] = n1*pointJson2[1][1];

        result1.text(''+ n2.toFixed(2));
        result2.text(''+ n1.toFixed(2));
    }

    function createLineArrow(arrow,coordinate,color){

        var vertices =[];
        if(arrow == 1){             //朝右
            vertices.push(new THREE.Vector3(-30,20,0));
            vertices.push(new THREE.Vector3(20,0,0));
            vertices.push(new THREE.Vector3(0-30,0-20,0));
        }

        var material2 = new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:0.9});
        var geom = new THREE.Geometry();
        geom.vertices = vertices;
        geom.faces.push(new THREE.Face3(0,1,2));
        geom.faces.push(new THREE.Face3(2,1,0));
        var obj = new THREE.SceneUtils.createMultiMaterialObject(geom,[material2]);

        obj.scale.x = 0.8;
        obj.scale.y = 0.8;
        obj.scale.z = 0.8;
        obj.position.x = coordinate[0];
        obj.position.y = coordinate[1];
        obj.position.z = coordinate[2];

        return obj;
    }

}
var threeDimensional = new ThreeDimensional();
threeDimensional.int();


//重置事件
function renderAll(){
    threeDimensional.controls.update();

    requestAnimationFrame(renderAll);
    threeDimensional.renderer.render(threeDimensional.scene,threeDimensional.camera);
}
renderAll();

//鼠标点击，选中顶点
threeDimensional.renderer.domElement.addEventListener( 'mousedown', threeDimensional.onDocumentMouseDown, false );
threeDimensional.renderer.domElement.addEventListener( 'mouseup', threeDimensional.onDocumentMouseUp, false );
threeDimensional.renderer.domElement.addEventListener( 'mousemove', threeDimensional.onDocumentMouseMove, false );
threeDimensional.renderer.domElement.addEventListener( 'touchstart', threeDimensional.onDocumentTouchStart, false );
threeDimensional.renderer.domElement.addEventListener( 'touchmove', threeDimensional.onDocumentTouchMove, false );
threeDimensional.renderer.domElement.addEventListener( 'touchend', threeDimensional.onDocumentTouchEnd, false );



//on/off事件
function clickEve1(){
    var dataId = $(this).attr('data-id');

    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');

        if(dataId == 1){
            checked = false;
            threeDimensional.clickEve();
        }
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        if(dataId == 1){
            checked = true;
            threeDimensional.clickEve();
        }
    }

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

    checked =false;
    threeDimensional.reback();
    $('.turn1').removeClass('on').addClass('off');
    $('.turn1').find('.span2').text('off');
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



