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


var result1 = $('.result1');
var a1 = $('.a1'),a2=$('.a2'),a3=$('.a3'),b1=$('.b1'),b2=$('.b2'),b3=$('.b3'),dangle=$('.angle'),danglePI = $('.anglePI'),result=$('.result');


function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;

    var thiz = this;
    //选择相关
    var selectobjs = [],mousedownflag = false,selectobj =null;


    //点和文字相关
    var startjson = [[0,0,0],[300,0,0],[200,200,0]];
    var json = [[0,0,0],[300,0,0],[200,200,0]],verticalPoint=[0,0,0];
    var axisX = new THREE.Group(),lineOA=null,arrowLineOA=null,lineOB=null,arrowLineOB=null,pointA=null,pointB=null;
    var textOA = new THREE.Group(),textOB=new THREE.Group(),angleMesh=null,angle=45,imaginaryLine=null;


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


    var spheres = [null,null,null,null];
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


        createAxisX();

        arrowLineOA =  createLineArrow(1,json[1],'#f39800',3);
        this.scene.add(arrowLineOA);

        arrowLineOB =  createLineArrow(1,json[2],'#1161c8',3);
        this.scene.add(arrowLineOB);
        arrowLineOB.rotation.z = Math.PI/4;



        this.scene.add(textOA);
        var text1 = this.createText('a',[0,10,0],'#f39800',1,30);
        var text2 = this.createText('→',[0,20,0],'#f39800',1);
        textOA.add(text1);
        textOA.add(text2);
        textOA.position.x =(json[0][0]+json[1][0])/2;
        textOA.position.y =(json[0][1]+json[1][1])/2;


        this.scene.add(textOB);
        text1 = this.createText('b',[0,0,0],'#1161c8',1,30);
        text2 = this.createText('→',[0,15,0],'#1161c8',1);
        textOB.add(text1);
        textOB.add(text2);
        textOB.position.x =(json[0][0]+json[2][0])/2;
        textOB.position.y =(json[0][1]+json[2][1])/2;


        createLineOA(0);
        createLineOB(Math.PI/4);

        var m,g;
        m = new THREE.MeshBasicMaterial({color: '#f39800',opacity:0.5,transparent:true});
        g =  new THREE.SphereGeometry(20, 36, 36);
        spheres[0] = new THREE.Mesh(g, m);
        spheres[2] = spheres[0].clone();
        spheres[2].material = new THREE.MeshBasicMaterial({color: '#1161c8',opacity:0.5,transparent:true});
        spheres[0].position.set(json[1][0],json[1][1],0);
        spheres[2].position.set(json[2][0],json[2][1],0);
        this.scene.add(spheres[0],spheres[2]);

        m = new THREE.MeshBasicMaterial({color: '#f39800',opacity:1,transparent:false});
        g =  new THREE.SphereGeometry(10, 36, 36);
        spheres[1] = new THREE.Mesh(g, m);
        spheres[3] = spheres[1].clone();
        spheres[3].material = new THREE.MeshBasicMaterial({color: '#1161c8',opacity:1,transparent:false});
        spheres[1].position.set(json[1][0],json[1][1],0);
        spheres[3].position.set(json[2][0],json[2][1],0);
        this.scene.add(spheres[1],spheres[3]);

        m = new THREE.MeshBasicMaterial({color: '#f39800',opacity:0.3,transparent:true});
        g =  new THREE.SphereGeometry(30, 36, 36);
        pointA = new THREE.Mesh(g, m);
        pointB = pointA.clone();
        pointB.material = new THREE.MeshBasicMaterial({color: '#1161c8',opacity:0.3,transparent:true});
        pointA.name='a';
        pointB.name='b';
        pointA.position.set(json[1][0],json[1][1],0);
        pointB.position.set(json[2][0],json[2][1],0);
        this.scene.add(pointA,pointB);
        selectobjs.push(pointA,pointB);


        calculateAngle();
        angleMesh = this.createText(angle+'°',[40,30,0],'#000',1);
        this.scene.add(angleMesh);

        calculateVerticalPoint();
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
        if (style == 1) {
            vertices.push(new THREE.Vector3(vertices[0].x,vertices[0].y,vertices[0].z));
            vertices.push(new THREE.Vector3(vertices[1].x,vertices[1].y,vertices[1].z));
            // vertices.push(new THREE.Vector3(vertices[0].x+2,vertices[0].y,vertices[0].z));
            // vertices.push(new THREE.Vector3(vertices[1].x+2,vertices[1].y,vertices[1].z));
            // vertices.push(new THREE.Vector3(vertices[0].x-2,vertices[0].y,vertices[0].z));
            // vertices.push(new THREE.Vector3(vertices[1].x-2,vertices[1].y,vertices[1].z));
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
    this.createText = function (content, coordinate, color,ischange,size) {
        if (!color) {
            color = '#000';
        }
        if(size){
            var fontsize = size+'px Cambria Math';
        }else {
            var fontsize = '25px Cambria Math';
        }
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
    this.createSphere = function (coordinate, radius,color,angle1) {
        var sphereG = new THREE.SphereGeometry(radius, 10, 10, 0, 2 * Math.PI, 0, 2 * Math.PI);
        var sphereM = new THREE.MeshBasicMaterial({color: color,opacity:0.5,transparent:true});
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

                var angle1 ,angle2;

                if(obj.x >= 500){ obj.x = 500;}else if(obj.x <=-500){ obj.x = -500;}
                if(obj.y >= 500){ obj.y = 500;}else if(obj.y <=-500){ obj.y = -500;}

                if(selectobj.name == 'a'){
                    spheres[0].position.x = spheres[1].position.x = selectobj.position.x = json[1][0] =  obj.x;
                    spheres[0].position.y = spheres[1].position.y = selectobj.position.y = json[1][1] =  obj.y;

                    angle1 = Math.atan(obj.y/obj.x);

                    if(obj.x <= 0){
                        arrowLineOA.rotation.z = Math.PI+angle1;
                        angle1 = Math.PI+angle1;
                    }else{
                        arrowLineOA.rotation.z = angle1;
                    }
                    axisX.rotation.z = angle1;
                    createLineOA(angle1);





                }else if (selectobj.name == 'b'){
                    spheres[2].position.x = spheres[3].position.x = selectobj.position.x = json[2][0] = obj.x;
                    spheres[2].position.y = spheres[3].position.y = selectobj.position.y = json[2][1] = obj.y;
                    angle1 = Math.atan(obj.y/obj.x);

                    if(obj.x <= 0){
                        arrowLineOB.rotation.z = Math.PI+angle1;
                        angle1 = Math.PI+angle1;
                    }else{
                        arrowLineOB.rotation.z = angle1;
                    }
                    createLineOB(angle1);
                }
                calculateAngle();
                calculateVerticalPoint();

                angleMesh.position.x = (json[1][0]/4 + json[2][0]/4)/2;
                angleMesh.position.y = (json[1][1]/4 + json[2][1]/4)/2;

                var dushuAngle1,dushuAngle2,max,min,totolAngle,rotationAngle;
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

                    var angle1 ,angle2;

                    if(obj.x >= 500){ obj.x = 500;}else if(obj.x <=-500){ obj.x = -500;}
                    if(obj.y >= 500){ obj.y = 500;}else if(obj.y <=-500){ obj.y = -500;}

                    if(selectobj.name == 'a'){
                        spheres[0].position.x = spheres[1].position.x = selectobj.position.x = json[1][0] =  obj.x;
                        spheres[0].position.y = spheres[1].position.y = selectobj.position.y = json[1][1] =  obj.y;

                        angle1 = Math.atan(obj.y/obj.x);

                        if(obj.x <= 0){
                            arrowLineOA.rotation.z = Math.PI+angle1;
                            angle1 = Math.PI+angle1;
                        }else{
                            arrowLineOA.rotation.z = angle1;
                        }
                        axisX.rotation.z = angle1;


                        createLineOA(angle1);

                    }else if (selectobj.name == 'b'){
                        spheres[2].position.x = spheres[3].position.x = selectobj.position.x = json[2][0] = obj.x;
                        spheres[2].position.y = spheres[3].position.y = selectobj.position.y = json[2][1] = obj.y;
                        angle1 = Math.atan(obj.y/obj.x);

                        if(obj.x <= 0){
                            arrowLineOB.rotation.z = Math.PI+angle1;
                            angle1 = Math.PI+angle1;
                        }else{
                            arrowLineOB.rotation.z = angle1;
                        }
                        createLineOB(angle1);
                    }
                    calculateAngle();
                    calculateVerticalPoint();


                    var dushuAngle1,dushuAngle2,max,min,totolAngle,rotationAngle;
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
        for( i=0;i<3;i++){
            for(j=0;j<3;j++){
                json[i][j] = startjson[i][j];
            }
        }
        calculateAngle();
        createLineOA(0);
        createLineOB(Math.PI/4);
        calculateVerticalPoint();
        axisX.rotation.z = 0;
        arrowLineOA.rotation.z = 0;
        arrowLineOB.rotation.z = Math.PI/4;
        spheres[0].position.x = spheres[1].position.x = pointA.position.x = json[1][0];
        spheres[0].position.y = spheres[1].position.y = pointA.position.y = json[1][1];
        spheres[2].position.x = spheres[3].position.x = pointB.position.x = json[2][0];
        spheres[2].position.y = spheres[3].position.y = pointB.position.y = json[2][1];
        this.camera.position.z = 1500;
        creatArcLine(Math.PI/4,0);




        angleMesh.position.x = 40;
        angleMesh.position.y = 30;
    };
    this.grid = function(){
        if(grid!=undefined){
            this.scene.remove(grid);
            grid = null;
        }else{
            this.createGrid();
        }
    };


    function createAxisX(){
        var vertices =[],i,text=null;
        vertices.push(new THREE.Vector3(-1100,0,0));
        vertices.push(new THREE.Vector3(1100,0,0));
        var line = thiz.createLineMesh(vertices,'#000',3);
        axisX.add(line);
        for(i=-15;i<16;i++){
            vertices=[];
            vertices.push(new THREE.Vector3(i*50,0,0));
            vertices.push(new THREE.Vector3(i*50,-10,0));
            line = thiz.createLineMesh(vertices,'#000',3);
            axisX.add(line);

            text = thiz.createText(''+i,[i*50,-15,0],'#000',1);
            axisX.add(text);
        }

        thiz.scene.add(axisX);

    }

    function createLineOA(angle){
        if(lineOA != undefined){
            thiz.scene.remove(lineOA);
        }
        var x,y;

        if(angle){
            x = 15*Math.cos(angle);
            y = 15*Math.sin(angle);
        }else{
            x = 15;
            y = 0;
        }



        var vertices = [];
        vertices.push(new THREE.Vector3(json[0][0],json[0][1],json[0][2]));
        vertices.push(new THREE.Vector3(json[1][0],json[1][1],json[1][2]));
        lineOA = thiz.createLineMesh(vertices,'#f39800',1);
        thiz.scene.add(lineOA);

        arrowLineOA.position.x =json[1][0]-x;
        arrowLineOA.position.y = json[1][1]-y;

        textOA.position.x =(json[0][0]+json[1][0])/2+20;
        textOA.position.y =(json[0][1]+json[1][1])/2+20;

        a1.text((json[1][0]/50).toFixed(1)==0?0:(json[1][0]/50).toFixed(1)-(json[1][0]/50).toFixed(0)==0?(json[1][0]/50).toFixed(0):(json[1][0]/50).toFixed(1));
        a2.text((json[1][1]/50).toFixed(1)==0?0:(json[1][1]/50).toFixed(1)-(json[1][1]/50).toFixed(0)==0?(json[1][1]/50).toFixed(0):(json[1][1]/50).toFixed(1));
        a33=Math.sqrt(Math.pow(json[1][0]/50,2)+Math.pow(json[1][1]/50,2))
        a3.text(a33.toFixed(1)==0?0:a33.toFixed(1)-a33.toFixed(0)==0?a33.toFixed(0):a33.toFixed(1));

    }
    function createLineOB(angle){
        if(lineOB != undefined){
            thiz.scene.remove(lineOB);
            lineOB=null;
        }
        var x,y;

        if(angle){
            x = 15*Math.cos(angle);
            y = 15*Math.sin(angle);
        }else{
            x = 15;
            y = 0;
        }

        var vertices = [];
        vertices.push(new THREE.Vector3(json[0][0],json[0][1],json[0][2]));
        vertices.push(new THREE.Vector3(json[2][0],json[2][1],json[2][2]));
        lineOB = thiz.createLineMesh(vertices,'#1161c8',1);
        thiz.scene.add(lineOB);

        arrowLineOB.position.x =json[2][0]-x;
        arrowLineOB.position.y = json[2][1]-y;


        textOB.position.x =(json[0][0]+json[2][0])/2+20;
        textOB.position.y =(json[0][1]+json[2][1])/2+20;


        b1.text((json[2][0]/50).toFixed(1)==0?0:(json[2][0]/50).toFixed(1)-(json[2][0]/50).toFixed(0)==0?(json[2][0]/50).toFixed(0):(json[2][0]/50).toFixed(1));
        b2.text((json[2][1]/50).toFixed(1)==0?0:(json[2][1]/50).toFixed(1)-(json[2][1]/50).toFixed(0)==0?(json[2][1]/50).toFixed(0):(json[2][1]/50).toFixed(1));
        b33=Math.sqrt(Math.pow(json[2][0]/50,2)+Math.pow(json[2][1]/50,2))
        b3.text(b33.toFixed(1)==0?0:b33.toFixed(1)-b33.toFixed(0)==0?b33.toFixed(0):b33.toFixed(1));

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
        if(imaginaryLine!=undefined){
            thiz.scene.remove(imaginaryLine);
        }

        lengthOA = Math.sqrt(Math.pow(json[1][0],2)+Math.pow(json[1][1],2));
        lengthOB = Math.sqrt(Math.pow(json[2][0],2)+Math.pow(json[2][1],2));
        lengthOBB = lengthOB*Math.cos(angle*Math.PI/180);
        rateB = lengthOBB/lengthOA;
        verticalPoint[0] = json[1][0]*rateB;
        verticalPoint[1] = json[1][1]*rateB;
        var vertices = [];
        vertices.push(new THREE.Vector3(json[2][0],json[2][1],json[2][2]));
        vertices.push(new THREE.Vector3(verticalPoint[0],verticalPoint[1],verticalPoint[2]));
        imaginaryLine = thiz.createLineMesh(vertices,'#666',2);
        thiz.scene.add(imaginaryLine);

        angleMesh.text = angle+'°';
        dangle.text(angle+'°');
        danglePI.text((Math.cos(angle*Math.PI/180)).toFixed(2));
        result11=json[1][0]*json[2][0]/2500 + json[1][1]*json[2][1]/2500
        result.text(result11.toFixed(1)==0?0:result11.toFixed(1)-result11.toFixed(0)==0?result11.toFixed(0):result11.toFixed(1));
    }
    function createLineArrow(arrow,coordinate,color){

        var vertices =[];
        if(arrow == 1){             //朝右
            vertices.push(new THREE.Vector3(-12,8,0));
            vertices.push(new THREE.Vector3(10,0,0));
            vertices.push(new THREE.Vector3(0-12,0-8,0));
        }

        var material2 = new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:0.9});
        var geom = new THREE.Geometry();
        geom.vertices = vertices;
        geom.faces.push(new THREE.Face3(0,1,2));
        geom.faces.push(new THREE.Face3(2,1,0));
        var obj = new THREE.SceneUtils.createMultiMaterialObject(geom,[material2]);

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

        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');

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
    checked1=checked2=false;
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



