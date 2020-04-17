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
    threeWidth = $obj.width();

var moved=false,timg,count=0,flage=false,obj_offset;

function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var thiz = this;
    //选择相关
    var selectobjs = [],mousedownflag = false;
    //角度相关
    var angle = 0,angleMesh=null;



    var start2json = [[0,0,100],[0,500,600]];
    var line1json = [[-400,0,0],[400,0,0],'l1','M','N']; //不可移动
    var line2json =[[0,0,100],[0,500,600],'l2','O','P']; //可移动
    var line2json_old =[0,500,600] //可移动
    var line1mesh=null,text11mesh=null,text12mesh=null,text13mesh=null;
    var line2mesh=null,text21mesh=null,text22mesh=null,text23mesh=null,pointP = null,pointP1 = null;
    var changeAngle=[[0,0,0],[0,0,0]];



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


    this.int = function () {
        this.camera.position.x = 1500;
        this.camera.position.y = 1500;
        this.camera.position.z = 1500;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xfffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
        this.createGrid();
        var vertices = [];
        vertices.push(new THREE.Vector3(line1json[0][0],line1json[0][1],line1json[0][2]));
        vertices.push(new THREE.Vector3(line1json[1][0],line1json[1][1],line1json[1][2]));
        line1mesh = this.createLineMesh(vertices,'#1161c8');
        this.scene.add(line1mesh);

        vertices = [];
        vertices.push(new THREE.Vector3(line2json[0][0],line2json[0][1],line2json[0][2]));
        vertices.push(new THREE.Vector3(line2json[1][0],line2json[1][1],line2json[1][2]));
        line2mesh = this.createLineMesh(vertices,'red');
        this.scene.add(line2mesh);


        pointP= this.createSphere(line2json[1],10);
        this.scene.add(pointP);
        pointP1= this.createSphere(line2json[1],60);
        pointP1.material.transparent=true;
        pointP1.material.opacity=0;
        this.scene.add(pointP1);
        selectobjs.push(pointP1);

        text11mesh=new THREE.Group();


        var line = this.createText("l",[0,0,0],'#1161c8',50,1);
        text11mesh.add(line);

        line = this.createText('1',[20,-20,0],'#1161c8',30,1);
        text11mesh.add(line);

        this.scene.add(text11mesh);

        text12mesh = this.createText(line1json[3],[line1json[0][0],line1json[0][1],line1json[0][2]],'black'); //M
        this.scene.add(text12mesh);

        text13mesh = this.createText(line1json[4],[line1json[1][0],line1json[1][1],line1json[1][2]],'black');
        this.scene.add(text13mesh);

        text21mesh=new THREE.Group();
        line = this.createText("l",[0,0,0],'red',50,1);
        text21mesh.add(line);

        line = this.createText('2',[20,-20,0],'red',30,1);
        text21mesh.add(line);

        text21mesh.position.x = (line2json[0][0]+line2json[1][0])/2;
        text21mesh.position.y = (line2json[0][1]+line2json[1][1])/2;
        text21mesh.position.z = (line2json[0][2]+line2json[1][2])/2;

        this.scene.add(text21mesh)

        text22mesh = this.createText(line2json[3],[line2json[0][0],line2json[0][1],line2json[0][2]],'black');//O
        this.scene.add(text22mesh);

        text23mesh = this.createText(line2json[4],[line2json[1][0]+10,line2json[1][1]+10,line2json[1][2]+10],'black');//P
        this.scene.add(text23mesh);


    };
    this.objStyle = function (color, fontsize) {
        return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
    };
    this.createLineMesh = function (vertices, color, style) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        geometryLine.vertices = vertices;
        if (!color) {
            color = '#000';
        }
        if (!style) {
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        } else {
            geometryLine.computeLineDistances();
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 5,
                gapSize: 5
            }));
        }
        return lineMesh;
    };
    this.createText = function (content, coordinate, color,size,ischange) {
        if (!color) {
            color = '#000';
        }
        if(!size){
            size = 50;
        }
        var fontsize = size+'px Cambria Math';

        var textStyle = this.objStyle(color, fontsize),
            text = new SpriteText2D(content, textStyle),x,y,z;


        if(ischange){
            text.position.set(coordinate[0], coordinate[1], coordinate[2]);
        }else{
            if(coordinate[0]>0){ x = coordinate[0]+30;}else{x = coordinate[0]-30; }
            if(coordinate[1]>0){ y = coordinate[1]+30;}else{y = coordinate[1]-30; }
            if(coordinate[2]>0){ z = coordinate[2]+30;}else{z = coordinate[2]-30; }
            text.position.set(x, y, z);
        }
        text.material.depthTest=false;
        return text;
    };
    this.createSphere = function (coordinate, radius) {
        var sphereG = new THREE.SphereGeometry(radius, 32, 32, 0, 2 * Math.PI, 0, 2 * Math.PI);
        var sphereM = new THREE.MeshBasicMaterial({color: 'red'});
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
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
    };
    this.createGrid = function(){
        var geometry = new THREE.Geometry(), bottom = -0.001, step = 100;
        var lineMaterial = new THREE.LineBasicMaterial( { color: 0x949494, transparent: true, opacity: 0.5 } );
        for ( var i = 0; i <= 10; i ++ ) {
            geometry.vertices.push( new THREE.Vector3( - 500, bottom, i * step - 500 ) );
            geometry.vertices.push( new THREE.Vector3(   500, bottom, i * step - 500 ) );

            geometry.vertices.push( new THREE.Vector3(i * step - 500, bottom, -500));
            geometry.vertices.push( new THREE.Vector3( i * step - 500, bottom,  500 ) );
        }
        grid = new THREE.LineSegments( geometry, lineMaterial, THREE.LinePieces );
        this.scene.add( grid );
        window.gridColor = 0x303030;
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
            mousedownflag = true;
            thiz.controls.enableRotate =false ;
            thiz.scene.remove(thiz.controls);
            pointP.material.transparent = true;
            pointP.material.opacity = 0.5;
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
                obj_offset = intersection.sub( offset );


                pointP.position.x = line2json[1][0] = obj_offset.x;
                pointP.position.y = line2json[1][1] = obj_offset.y;
                pointP.position.z = line2json[1][2] =obj_offset.z;
                pointP1.position.x = line2json[1][0] = obj_offset.x;
                pointP1.position.y = line2json[1][1] = obj_offset.y;
                pointP1.position.z = line2json[1][2] =obj_offset.z;

                thiz.repaintLine();

                if(moved){
                    thiz.createAngleMesh();
                }
                flage=true;
            }
        }
    };
    this.onDocumentMouseUp = function(){
        thiz.controls.enableRotate =true;
        mousedownflag = false;
        pointP.material.transparent = false;
        pointP.material.opacity = 1;
        if(obj_offset&&line2json[0][0]!=-400){
            line2json_old[0] = obj_offset.x;
            line2json_old[1] = obj_offset.y;
            line2json_old[2] =obj_offset.z;
        }else{
            line2json_old[0] = obj_offset.x+400;
            line2json_old[1] = obj_offset.y;
            line2json_old[2] =obj_offset.z+100;
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
                mousedownflag = true;
                thiz.controls.enableRotate =false;
                thiz.scene.remove(thiz.controls);
                pointP.material.transparent = true;
                pointP.material.opacity = 0.5;
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
                    obj_offset = intersection.sub( offset );

                    pointP.position.x = line2json[1][0] = obj_offset.x;
                    pointP.position.y = line2json[1][1] = obj_offset.y;
                    pointP.position.z = line2json[1][2] =obj_offset.z;
                    pointP1.position.x = line2json[1][0] = obj_offset.x;
                    pointP1.position.y = line2json[1][1] = obj_offset.y;
                    pointP1.position.z = line2json[1][2] =obj_offset.z;

                    thiz.repaintLine();

                    if(moved){
                        thiz.createAngleMesh();
                    }
                    flage=true;
                }
            }
        }
    };
    this.onDocumentTouchEnd = function(event){
        event.preventDefault();
        thiz.controls.enableRotate =true;
        mousedownflag = false;
        pointP.material.transparent = false;
        pointP.material.opacity = 1;
        if(obj_offset&&line2json[0][0]!=-400){
            line2json_old[0] = obj_offset.x;
            line2json_old[1] = obj_offset.y;
            line2json_old[2] =obj_offset.z;
        }else{
            line2json_old[0] = obj_offset.x+400;
            line2json_old[1] = obj_offset.y;
            line2json_old[2] =obj_offset.z+100;
        }
    };
    this.repaintLine = function(){
        if(line2mesh!=undefined){
            this.scene.remove(line2mesh);
            line2mesh = null;
        }
        var vertices = [];
        vertices.push(new THREE.Vector3(line2json[0][0],line2json[0][1],line2json[0][2]));
        vertices.push(new THREE.Vector3(line2json[1][0],line2json[1][1],line2json[1][2]));
        line2mesh = this.createLineMesh(vertices,'red');
        this.scene.add(line2mesh);

        text21mesh.position.x = (line2json[0][0]+line2json[1][0])/2;
        text21mesh.position.y = (line2json[0][1]+line2json[1][1])/2;
        text21mesh.position.z = (line2json[0][2]+line2json[1][2])/2;


        text22mesh.position.x = line2json[0][0];
        text22mesh.position.y = line2json[0][1];
        text22mesh.position.z = line2json[0][2];

        text23mesh.position.x = line2json[1][0]+30;
        text23mesh.position.y = line2json[1][1]+30;
        text23mesh.position.z = line2json[1][2]+30;
    };
    this.lineMove = function(){
        moved = true;
        if(!flage){
            line2json =[[0,0,100],[0,500,600],'l2','O','P'];
        }else{
            line2json=[[0,0,100],[line2json_old[0],line2json_old[1],line2json_old[2]],'l2','O','P'];
        }

        changeAngle = [[-400,0,0],[line1json[0][0] - line2json[0][0],line1json[0][1] - line2json[0][1],line1json[0][2] - line2json[0][2]],[line2json[1][0],line2json[1][1],line2json[1][2]]];
        var x,y,z;
        x = changeAngle[1][0]/30;
        y = changeAngle[1][1]/30;
        z = changeAngle[1][2]/30;

        timg = setInterval(function(){
            count++;
            if(count>30){
                clearInterval(timg);

                line2json[0][0] = line1json[0][0];
                line2json[0][1] = line1json[0][1];
                line2json[0][2] = line1json[0][2];

                line2json[1][0] = changeAngle[2][0]+changeAngle[1][0];
                line2json[1][1] = changeAngle[2][1]+changeAngle[1][1];
                line2json[1][2] = changeAngle[2][2]+changeAngle[1][2];

                thiz.repaintLine();

                thiz.createAngleMesh();

                text12mesh.visible = false;
                text22mesh.visible = false;
                text13mesh.visible = false;
                text23mesh.visible = false;

                pointP.position.x = line2json[1][0];
                pointP.position.y = line2json[1][1];
                pointP.position.z = line2json[1][2];
               return;
            }

            line2json[0][0] =  x*count;
            line2json[0][1] =  line1json[0][1] + y*count;
            line2json[0][2] =   -(30 - count)*z;


            line2json[1][0] = changeAngle[2][0]+x*count;
            line2json[1][1] = changeAngle[2][1]+y*count;
            line2json[1][2] = changeAngle[2][2]+z*count;


            pointP.position.x = line2json[1][0];
            pointP.position.y = line2json[1][1];
            pointP.position.z = line2json[1][2];

            thiz.repaintLine();
        },15);


    };
    this.createAngleMesh = function(){
        if(angleMesh!=undefined){
            this.scene.remove(angleMesh);
            angleMesh = null;
        }
        angleMesh = new THREE.Group();
        if(line2json[1][0]<-400){
            angleP=Math.asin(Math.sqrt(Math.pow(line2json[1][1],2)+Math.pow(line2json[1][2],2))/Math.sqrt(Math.pow(line2json[1][0]+400,2)+Math.pow(line2json[1][1],2)+Math.pow(line2json[1][2],2)))
            angleP=Math.PI-angleP
        }else{
            angleP=Math.asin(Math.sqrt(Math.pow(line2json[1][1],2)+Math.pow(line2json[1][2],2))/Math.sqrt(Math.pow(line2json[1][0]+400,2)+Math.pow(line2json[1][1],2)+Math.pow(line2json[1][2],2)))
        }
        angle = (angleP*180/Math.PI).toFixed(0)+'°';
        var angleText = this.createText(angle,[line1json[0][0]+20,line1json[0][1]+5,line1json[0][2]+10],'black',40,1);
        angleMesh.add(angleText);
        this.scene.add(angleMesh);
    };
    this.reback = function(){
        moved= false;
        this.scene.remove(angleMesh);
        angleMesh = null;
        line2json[0][0] = start2json[0][0];
        line2json[0][1] = start2json[0][1];
        line2json[0][2] = start2json[0][2];

        line2json[1][0] = start2json[1][0];
        line2json[1][1] = start2json[1][1];
        line2json[1][2] = start2json[1][2];


        pointP.position.x = line2json[1][0];
        pointP.position.y = line2json[1][1];
        pointP.position.z = line2json[1][2];

        text12mesh.visible = true;
        text22mesh.visible = true;
        text13mesh.visible = true;
        text23mesh.visible = true;

        this.repaintLine();
    };
    this.grid = function(){
        if(grid!=undefined){
            this.scene.remove(grid);
            grid = null;
        }else{
            this.createGrid();
        }

    };
    this.gradualMove = function(){

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

threeDimensional.renderer.domElement.addEventListener( 'mousedown', threeDimensional.onDocumentMouseDown, false );
threeDimensional.renderer.domElement.addEventListener( 'mouseup', threeDimensional.onDocumentMouseUp, false );
threeDimensional.renderer.domElement.addEventListener( 'mousemove', threeDimensional.onDocumentMouseMove, false );
threeDimensional.renderer.domElement.addEventListener( 'touchstart', threeDimensional.onDocumentTouchStart, false );
threeDimensional.renderer.domElement.addEventListener( 'touchmove', threeDimensional.onDocumentTouchMove, false );
threeDimensional.renderer.domElement.addEventListener( 'touchend', threeDimensional.onDocumentTouchEnd, false );


function moveEve(){
    count = 0;
    threeDimensional.lineMove();
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
}

if(!isMob){
    $('#scale').on('click',fullEve);
    $('#renew').on('click',renewEve);
    $('#move').on('click',moveEve);
}else{
    $('#scale').on('touchstart',fullEve);
    $('#renew').on('touchstart',renewEve);
    $('#move').on('touchstart',moveEve);
}




