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
var inputs = $('.checkboxx'),selectValue=0,checked1=false,checked2=false,turths=$('.truth1');


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
var result1 = $('.result1');

function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关

    var thiz = this;
    //选择相关
    var selectobjs = [],mousedownflag = false,selectobj =null;


    //点和文字相关

    var startjson = [[0,0,0],[400,0,0],[212,212,0]];
    var json = [[0,0,0],[400,0,0],[212,212,0]]; //O点、A点、B点
    var pointA = null,pointB=null,textA=null,textB=null,textO=null,textB1=null,textA1=null,textAngle=null,lineOA=null,lineOB=null,lineArrowOA = null,lineArrowOB=null;
    var angle=0,textOA=new THREE.Group(),textOB=new THREE.Group(),imaginaryOA = null,imageinaryOB = null;
    var verticalPoint=[[0,0,0],[0,0,0]],verticalLineA=null,lineOA1=null,lineOB1=null,verticalLineB = null;
    var angleLine=null;


    var grid=null,arcAngle=null;

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
    var shperes = [null,null,null,null];


    this.int = function () {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 1500;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
        this.createGrid();

        lineArrowOA = createLineArrow(1,json[1],'#f39800',0);
        this.scene.add(lineArrowOA);

        lineArrowOB = createLineArrow(1,json[2],'#1161c8',0);
        this.scene.add(lineArrowOB);


        var m,g;
        m = new THREE.MeshBasicMaterial({color: '#f39800',opacity:0.5,transparent:true});
        g =  new THREE.SphereGeometry(20, 36, 36);
        shperes[0] = new THREE.Mesh(g, m);
        shperes[2] = shperes[0].clone();
        shperes[2].material = new THREE.MeshBasicMaterial({color: '#1161c8',opacity:0.5,transparent:true});
        shperes[0].position.set(json[1][0],json[1][1],0);
        shperes[2].position.set(json[2][0],json[2][1],0);
        this.scene.add(shperes[0],shperes[2]);


        m = new THREE.MeshBasicMaterial({color: '#f39800',opacity:1,transparent:false});
        g =  new THREE.SphereGeometry(10, 36, 36);
        shperes[1] = new THREE.Mesh(g, m);
        shperes[3] = shperes[1].clone();
        shperes[3].material = new THREE.MeshBasicMaterial({color: '#1161c8',opacity:1,transparent:false});
        shperes[1].position.set(json[1][0],json[1][1],0);
        shperes[3].position.set(json[2][0],json[2][1],0);
        this.scene.add(shperes[1],shperes[3]);


        m = new THREE.MeshBasicMaterial({color: '#f39800',opacity:0.3,transparent:true});
        g =  new THREE.SphereGeometry(30, 36, 36);
        pointA = new THREE.Mesh(g, m);
        pointB = pointA.clone();
        pointB.material = new THREE.MeshBasicMaterial({color: '#1161c8',opacity:0.3,transparent:true});
        pointA.name = 'a';
        pointB.name = 'b';
        pointA.position.set(json[1][0],json[1][1],0);
        pointB.position.set(json[2][0],json[2][1],0);
        selectobjs.push(pointA,pointB);
        this.scene.add(pointA,pointB);


        this.scene.add(textOA);
        var text1 = this.createText('a',[0,0,0],'#f39800',1);
        var text2 = this.createText('→',[0,15,0],'#f39800',1);
        textOA.add(text1);
        textOA.add(text2);
        textOA.position.x =(json[0][0]+json[1][0])/2;
        textOA.position.y =(json[0][1]+json[1][1])/2;


        this.scene.add(textOB);
        text1 = this.createText('b',[0,0,0],'#1161c8',1);
        text2 = this.createText('→',[0,15,0],'#1161c8',1);
        textOB.add(text1);
        textOB.add(text2);
        textOB.position.x =(json[0][0]+json[2][0])/2-20;
        textOB.position.y =(json[0][1]+json[2][1])/2+20;

        textA = this.createText('A',json[1],'#666',1);
        this.scene.add(textA);


        createLineOA();
        textB = this.createText('B',json[2],'#666');
        this.scene.add(textB);

        createLineOB(Math.PI/4);
        lineArrowOB.rotation.z = Math.PI/4;

        textO = this.createText('O',json[0],'#666');
        this.scene.add(textO);

        calculateAngle();

        textAngle = this.createText('θ',[30,30,10],'#666',1);
        this.scene.add(textAngle);

        var vertices = [];
        vertices.push(new THREE.Vector3(-500,0,0));
        vertices.push(new THREE.Vector3(500,0,0));
        imaginaryOA = this.createLineMesh(vertices,'#666',1);
        this.scene.add(imaginaryOA);

        vertices = [];
        vertices.push(new THREE.Vector3(0,-500,0));
        vertices.push(new THREE.Vector3(0,500,0));
        imageinaryOB = this.createLineMesh(vertices,'#666',1);
        this.scene.add(imageinaryOB);
        imageinaryOB.rotation.z = -Math.PI/4;

        textB1 = new THREE.Group();
        textA1 = new THREE.Group();
        var text = this.createText('B',verticalPoint[1],'red',1);
        textB1.add(text);
        text = this.createText('1',[verticalPoint[1][0]+15,verticalPoint[1][1]-10,verticalPoint[1][2]],'red',1,10);
        textB1.add(text);
        this.scene.add(textB1);

        text = this.createText('A',verticalPoint[0],'red',1);
        textA1.add(text);
        text = this.createText('1',[verticalPoint[0][0]+15,verticalPoint[0][1]-10,verticalPoint[0][2]],'red',1,10);
        textA1.add(text);
        this.scene.add(textA1);

        calculateVerticalPoint();
        lineArrowOA.position.x = json[1][0]-15;

        creatArcLine(Math.PI/4,0);

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
            vertices.push(new THREE.Vector3(vertices[0].x,vertices[0].y,5));
            vertices.push(new THREE.Vector3(vertices[1].x,vertices[1].y,5));
            // vertices.push(new THREE.Vector3(vertices[0].x+1,vertices[0].y,vertices[0].z));
            // vertices.push(new THREE.Vector3(vertices[1].x+1,vertices[1].y,vertices[1].z));
            // vertices.push(new THREE.Vector3(vertices[0].x-1,vertices[0].y,vertices[0].z));
            // vertices.push(new THREE.Vector3(vertices[1].x-1,vertices[1].y,vertices[1].z));
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        } else {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 1,
                dashSize: 10,
                gapSize: 10
            }));
        }
        return lineMesh;
    };
    this.createText = function (content, coordinate, color,ischange,font) {
        if (!color) {
            color = '#000';
        }
        if(!fontsize){
            font = 25;
        }
        var fontsize = font+'px Cambria Math';

        var textStyle = this.objStyle(color, fontsize),
            text = new SpriteText2D(content, textStyle),x,y,z;


        if(ischange){
            text.position.set(coordinate[0], coordinate[1], coordinate[2]);
        }else{
            if(coordinate[0]>0){ x = coordinate[0]+20;}else{x = coordinate[0]-20; }
            if(coordinate[1]>0){ y = coordinate[1]+20;}else{y = coordinate[1]-20; }
            if(coordinate[2]>0){ z = coordinate[2]+20;}else{z = coordinate[2]-20; }
            text.position.set(x, y, z);
        }

        return text;
    };
    this.createSphere = function (coordinate, radius,color) {
        var sphereG = new THREE.SphereGeometry(radius, 20, 20, 0, 2 * Math.PI, 0, 2 * Math.PI);
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
        var geometry = new THREE.Geometry(), bottom = -0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( { color: 0x949494, transparent: true, opacity: 0.5 } );
        for ( var i = 0; i <= 20; i ++ ) {
            geometry.vertices.push( new THREE.Vector3( - 500, bottom, i * step - 500 ) );
            geometry.vertices.push( new THREE.Vector3(   500, bottom, i * step - 500 ) );

            geometry.vertices.push( new THREE.Vector3(i * step - 500, bottom, -500));
            geometry.vertices.push( new THREE.Vector3( i * step - 500, bottom,  500 ) );
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
            if(selectValue==1 && selectobj.name =='b' || selectValue==2 && selectobj.name =='a'|| !selectValue){
                intersects[0].object.material.transparent = true;
                // intersects[0].object.material.opacity = 0.8;
                mousedownflag = true;
            }
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

                if(obj.x >= 500){ obj.x = 500;}else if(obj.x <=-500){ obj.x = -500;}
                if(obj.y >= 500){ obj.y = 500;}else if(obj.y <=-500){ obj.y = -500;}

                if(selectobj.name == 'a'){
                    shperes[0].position.x = shperes[1].position.x = selectobj.position.x = json[1][0] =  obj.x;
                    shperes[0].position.y = shperes[1].position.y =selectobj.position.y = json[1][1] =  obj.y;

                    angle1 = Math.atan(obj.y/obj.x);

                    if(obj.x <= 0){
                        lineArrowOA.rotation.z = Math.PI+angle1;
                        angle1 = Math.PI+angle1;
                    }else{
                        lineArrowOA.rotation.z = angle1;
                    }
                    imaginaryOA.rotation.z = angle1;
                    createLineOA(angle1);

                }else if (selectobj.name == 'b'){
                    shperes[2].position.x = shperes[3].position.x = selectobj.position.x = json[2][0] = obj.x;
                    shperes[2].position.y = shperes[3].position.y =selectobj.position.y = json[2][1] = obj.y;

                    angle1 = Math.atan(obj.y/obj.x);

                    if(obj.x <= 0){
                        lineArrowOB.rotation.z = Math.PI+angle1;
                        angle1 = Math.PI+angle1;
                    }else{
                        lineArrowOB.rotation.z = angle1;
                    }

                    imageinaryOB.rotation.z =  Math.PI/2+angle1;

                    createLineOB(angle1);
                }

                calculateAngle();
                //textAngle.text = ''+angle+'°';
                calculateVerticalPoint();
                textAngle.position.x = (json[1][0]/4 + json[2][0]/4)/2;
                textAngle.position.y = (json[1][1]/4 + json[2][1]/4)/2;

                var dushuAngle1,dushuAngle2,max,min,totolAngle,rotationAngle,angle2;
                angle1 = Math.atan(json[1][1]/json[1][0]);
                angle2= Math.atan(json[2][1]/json[2][0]);
                dushuAngle1 = angle1*180/Math.PI;
                dushuAngle2 = angle2*180/Math.PI;

                if(json[1][1] >=0){
                    if(angle1 <0){
                        dushuAngle1 += 180;
                    }
                }else{
                    if(angle1>0){
                        dushuAngle1 += 180;
                    }else{
                        dushuAngle1 += 360;
                    }
                }

                if(json[2][1] >=0){
                    if(angle2 <0){
                        dushuAngle2 += 180;
                    }
                }else{
                    if(angle2>0){
                        dushuAngle2 += 180;
                    }else{
                        dushuAngle2 += 360;
                    }
                }

                if(dushuAngle1 > dushuAngle2){
                    max = dushuAngle1;
                    min = dushuAngle2;

                }else{
                    min = dushuAngle1;
                    max = dushuAngle2;
                }

                if(max - min <= 180){
                    totolAngle = (max - min)*Math.PI/180;
                    rotationAngle = min*Math.PI/180;
                }else{
                    totolAngle = (360 - (max - min))*Math.PI/180;
                    rotationAngle = max*Math.PI/180;

                }

                creatArcLine(totolAngle,rotationAngle);

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
                if(selectValue==1 && selectobj.name =='b' || selectValue==2 && selectobj.name =='a'|| !selectValue){
                    intersects[0].object.material.transparent = true;
                    // intersects[0].object.material.opacity = 0.8;
                    mousedownflag = true;
                }
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

                    if(obj.x >= 500){ obj.x = 500;}else if(obj.x <=-500){ obj.x = -500;}
                    if(obj.y >= 500){ obj.y = 500;}else if(obj.y <=-500){ obj.y = -500;}

                    if(selectobj.name == 'a'){
                        shperes[0].position.x = shperes[1].position.x = selectobj.position.x = json[1][0] =  obj.x;
                        shperes[0].position.y = shperes[1].position.y =selectobj.position.y = json[1][1] =  obj.y;

                        angle1 = Math.atan(obj.y/obj.x);

                        if(obj.x <= 0){
                            lineArrowOA.rotation.z = Math.PI+angle1;
                            angle1 = Math.PI+angle1;
                        }else{
                            lineArrowOA.rotation.z = angle1;
                        }
                        imaginaryOA.rotation.z = angle1;
                        createLineOA(angle1);

                    }else if (selectobj.name == 'b'){
                        shperes[2].position.x = shperes[3].position.x = selectobj.position.x = json[2][0] = obj.x;
                        shperes[2].position.y = shperes[3].position.y =selectobj.position.y = json[2][1] = obj.y;

                        angle1 = Math.atan(obj.y/obj.x);

                        if(obj.x <= 0){
                            lineArrowOB.rotation.z = Math.PI+angle1;
                            angle1 = Math.PI+angle1;
                        }else{
                            lineArrowOB.rotation.z = angle1;
                        }

                        imageinaryOB.rotation.z =  Math.PI/2+angle1;

                        createLineOB(angle1);
                    }

                    calculateAngle();
                    //textAngle.text = ''+angle+'°';
                    calculateVerticalPoint();
                    textAngle.position.x = (json[1][0]/4 + json[2][0]/4)/2;
                    textAngle.position.y = (json[1][1]/4 + json[2][1]/4)/2;

                    var dushuAngle1,dushuAngle2,max,min,totolAngle,rotationAngle,angle2;
                    angle1 = Math.atan(json[1][1]/json[1][0]);
                    angle2= Math.atan(json[2][1]/json[2][0]);
                    dushuAngle1 = angle1*180/Math.PI;
                    dushuAngle2 = angle2*180/Math.PI;

                    if(json[1][1] >=0){
                        if(angle1 <0){
                            dushuAngle1 += 180;
                        }
                    }else{
                        if(angle1>0){
                            dushuAngle1 += 180;
                        }else{
                            dushuAngle1 += 360;
                        }
                    }

                    if(json[2][1] >=0){
                        if(angle2 <0){
                            dushuAngle2 += 180;
                        }
                    }else{
                        if(angle2>0){
                            dushuAngle2 += 180;
                        }else{
                            dushuAngle2 += 360;
                        }
                    }

                    if(dushuAngle1 > dushuAngle2){
                        max = dushuAngle1;
                        min = dushuAngle2;

                    }else{
                        min = dushuAngle1;
                        max = dushuAngle2;
                    }

                    if(max - min <= 180){
                        totolAngle = (max - min)*Math.PI/180;
                        rotationAngle = min*Math.PI/180;
                    }else{
                        totolAngle = (360 - (max - min))*Math.PI/180;
                        rotationAngle = max*Math.PI/180;

                    }

                    creatArcLine(totolAngle,rotationAngle);

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
        var i,j;
        for(i=0;i<3;i++){
            for(j=0;j<3;j++){
                json[i][j] = startjson[i][j];
            }
        }
        createLineOA();
        createLineOB(Math.PI/4);
        calculateAngle();
        calculateVerticalPoint();
        //textAngle.text = ''+angle+'°';
        shperes[1].position.x = shperes[0].position.x = pointA.position.x = json[1][0];
        shperes[1].position.y = shperes[0].position.y = pointA.position.y = json[1][1];


        shperes[2].position.x = shperes[3].position.x = pointB.position.x = json[2][0];
        shperes[2].position.y = shperes[3].position.y = pointB.position.y = json[2][1];

        lineArrowOA.rotation.z = 0;
        lineArrowOB.rotation.z = Math.PI/4;
        lineArrowOA.position.x = json[1][0]-15;

        imaginaryOA.rotation.z = 0;
        imageinaryOB.rotation.z = -Math.PI/4;

        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 1500;

        creatArcLine(Math.PI/4,0);


    };
    this.grid = function(){
        if(grid!=undefined){
            this.scene.remove(grid);
            grid = null;
        }else{
            this.createGrid();
        }
    };
    this.clickShow = function(){
        if(selectValue==1){
            imaginaryOA.visible = true;
            imageinaryOB.visible = false;
            verticalLineB.visible = true;
            verticalLineA.visible = false;
            textA1.visible =false;
            textB1.visible = true;
            lineOB1.visible = true;
            lineOA1.visible = false;

        }else if(selectValue == 2){

            imaginaryOA.visible = false;
            imageinaryOB.visible = true;
            verticalLineB.visible = false;
            verticalLineA.visible = true;
            textA1.visible =true;
            textB1.visible = false;
            lineOB1.visible = false;
            lineOA1.visible = true;

        }else{
            imaginaryOA.visible = false;
            imageinaryOB.visible = false;
            verticalLineB.visible = false;
            verticalLineA.visible = false;
            textA1.visible =false;
            textB1.visible = false;
            lineOB1.visible = false;
            lineOA1.visible = false;
        }
    };
    this.pointShowAndHide = function () {
        if(selectValue == 1){
            pointA.visible = false;
            pointB.visible = true;
            shperes[0].visible = shperes[1].visible =false;
            shperes[2].visible =shperes[3].visible =true;
        }else if(selectValue == 2){
            pointA.visible = true;
            pointB.visible = false;
            shperes[0].visible = shperes[1].visible =true;
            shperes[2].visible =shperes[3].visible =false;

        }else{
            pointA.visible = true;
            pointB.visible = true;
            textAngle.position.x = 30;
            textAngle.position.y = 30;
            shperes[0].visible = shperes[1].visible =shperes[2].visible =shperes[3].visible =true;
        }
    };


    function createLineOA(angle){
        if(lineOA != undefined){
            thiz.scene.remove(lineOA);
            lineOA=null;
        }

        var vertices = [],x=0,y=0;
        if(angle){
            x = 15*Math.cos(angle);
            y = 15*Math.sin(angle);
        }
        vertices.push(new THREE.Vector3(json[0][0],json[0][1],json[0][2]));
        vertices.push(new THREE.Vector3(json[1][0]-x,json[1][1]-y,json[1][2]));
        lineOA = thiz.createLineMesh(vertices,'#f39800');
        thiz.scene.add(lineOA);

        lineArrowOA.position.x = json[1][0]-x;
        lineArrowOA.position.y = json[1][1]-y;

        textA.position.x = json[1][0]+30;
        textA.position.y = json[1][1];

        textOA.position.x = (json[0][0]+json[1][0])/2;
        textOA.position.y = (json[0][1]+json[1][1])/2-5;


    }

    function createLineOB(angle){
        if(lineOB != undefined){
            thiz.scene.remove(lineOB);
            lineOB=null;
        }

        var vertices = [],x=0,y=0;
        if(angle){
            x = 15*Math.cos(angle);
            y = 15*Math.sin(angle);
        }
        vertices.push(new THREE.Vector3(json[0][0],json[0][1],json[0][2]));
        vertices.push(new THREE.Vector3(json[2][0]-x,json[2][1]-y,json[2][2]));
        lineOB = thiz.createLineMesh(vertices,'#1161c8');
        thiz.scene.add(lineOB);


        lineArrowOB.position.x = json[2][0]-x;
        lineArrowOB.position.y = json[2][1]-y;

        textB.position.x = json[2][0]+30;
        textB.position.y = json[2][1];

        textOB.position.x = (json[0][0]+json[2][0])/2-5;
        textOB.position.y = (json[0][1]+json[2][1])/2+5;
    }

    function calculateAngle(){
        var x,y,z,angle1;
        x = Math.sqrt(Math.pow(json[0][0]-json[1][0],2) + Math.pow(json[0][1] - json[1][1],2));  //OA
        y = Math.sqrt(Math.pow(json[0][0]-json[2][0],2) + Math.pow(json[0][1] - json[2][1],2));  //OB
        z = Math.sqrt(Math.pow(json[2][0]-json[1][0],2) + Math.pow(json[2][1] - json[1][1],2));  //AB
        angle1 = Math.acos((Math.pow(x,2)+Math.pow(y,2)-Math.pow(z,2))/(2*x*y));
        angle = Math.round(angle1*180/Math.PI);
    }

    function calculateVerticalPoint(){
        var lengthOA,lengthOB,lengthOAA,lengthOBB,rateA,rateB;
        if(verticalLineA!=undefined){
            thiz.scene.remove(verticalLineA);
            thiz.scene.remove(verticalLineB);
            thiz.scene.remove(lineOA1);
            thiz.scene.remove(lineOB1);
        }

        lengthOA = Math.sqrt(Math.pow(json[1][0],2)+Math.pow(json[1][1],2));
        lengthOB = Math.sqrt(Math.pow(json[2][0],2)+Math.pow(json[2][1],2));



        lengthOAA = lengthOA*Math.cos(angle*Math.PI/180);
        rateA = lengthOAA/lengthOB;
        verticalPoint[0][0] = json[2][0]*rateA;
        verticalPoint[0][1] = json[2][1]*rateA;
        var vertices = [];
        vertices.push(new THREE.Vector3(json[1][0],json[1][1],json[1][2]));
        vertices.push(new THREE.Vector3(verticalPoint[0][0],verticalPoint[0][1],verticalPoint[0][2]));
        verticalLineA = thiz.createLineMesh(vertices,'#666',1);
        thiz.scene.add(verticalLineA);



        lengthOBB = lengthOB*Math.cos(angle*Math.PI/180);
        rateB = lengthOBB/lengthOA;
        verticalPoint[1][0] = json[1][0]*rateB;
        verticalPoint[1][1] = json[1][1]*rateB;
        vertices = [];
        vertices.push(new THREE.Vector3(json[2][0],json[2][1],json[2][2]));
        vertices.push(new THREE.Vector3(verticalPoint[1][0],verticalPoint[1][1],verticalPoint[1][2]));
        verticalLineB = thiz.createLineMesh(vertices,'#666',1);
        thiz.scene.add(verticalLineB);


        vertices = [];
        vertices.push(new THREE.Vector3(json[0][0],json[0][1],json[0][2]));
        vertices.push(new THREE.Vector3(verticalPoint[0][0],verticalPoint[0][1],10));
        lineOA1 = thiz.createLineMesh(vertices,'red',1);
        thiz.scene.add(lineOA1);


        vertices = [];
        vertices.push(new THREE.Vector3(json[0][0],json[0][1],json[0][2]));
        vertices.push(new THREE.Vector3(verticalPoint[1][0],verticalPoint[1][1],10));
        lineOB1 = thiz.createLineMesh(vertices,'red',1);
        thiz.scene.add(lineOB1);

        textB1.position.x = verticalPoint[1][0]+30;
        textB1.position.y = verticalPoint[1][1];

        textA1.position.x = verticalPoint[0][0]+30;
        textA1.position.y = verticalPoint[0][1];

        thiz.clickShow();

    }

    function createLineArrow(arrow,coordinate,color){

        var vertices =[];
        if(arrow == 1){             //朝右
            vertices.push(new THREE.Vector3(-13,13,0));
            vertices.push(new THREE.Vector3(13,0,0));
            vertices.push(new THREE.Vector3(0-13,0-13,0));
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

    function creatArcLine(totolAngle,rotationAngle){
        thiz.scene.remove(arcAngle);
        var m = new THREE.MeshBasicMaterial({color:'red'});
        var g = new THREE.TorusGeometry(50, 1, 50, 50, totolAngle);
        arcAngle = new THREE.Mesh(g,m);
        arcAngle.rotation.z = rotationAngle;
        thiz.scene.add(arcAngle);
    }

    



}
var threeDimensional = new ThreeDimensional();
threeDimensional.int();

//鼠标点击，选中顶点
threeDimensional.renderer.domElement.addEventListener( 'mousedown', threeDimensional.onDocumentMouseDown, false );
threeDimensional.renderer.domElement.addEventListener( 'mouseup', threeDimensional.onDocumentMouseUp, false );
threeDimensional.renderer.domElement.addEventListener( 'mousemove', threeDimensional.onDocumentMouseMove, false );
threeDimensional.renderer.domElement.addEventListener( 'touchstart', threeDimensional.onDocumentTouchStart, false );
threeDimensional.renderer.domElement.addEventListener( 'touchmove', threeDimensional.onDocumentTouchMove, false );
threeDimensional.renderer.domElement.addEventListener( 'touchend', threeDimensional.onDocumentTouchEnd, false );


//重置事件
function renderAll(){
    threeDimensional.controls.update();

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
        selectValue = 0;
    }else{
        $('.turn1').removeClass('on').addClass('off');
        $('.turn1').find('.span2').text('off');
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');

        if(dataId == 1){
            selectValue = 1;
        }else{
            selectValue = 2;
        }
    }
    threeDimensional.pointShowAndHide();
    threeDimensional.clickShow();
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
    selectValue = 0;
    threeDimensional.reback();
    threeDimensional.pointShowAndHide();

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





