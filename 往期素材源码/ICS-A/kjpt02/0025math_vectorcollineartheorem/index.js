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
    //位置相关
    var thiz = this;
    //选择相关
    var selectobjs = [],mousedownflag = false,selectobj =null;


    //点和文字相关

    var jsonA = [[0,400,0],[400,400,0]];
    var jsonB = [[0,0,0],[600,0,0]];
    var pointB = null,lineA=null,lineArrowA=null,lineB=null,lineArrowB=null,textA =new THREE.Group(),textB=new THREE.Group(),lineother=null;


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


    var spheres = [null,null];
    this.int = function () {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 3000;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
        //this.createGrid();

        var vertices = [];
        vertices.push(new THREE.Vector3(jsonA[0][0],jsonA[0][1],jsonA[0][2]));
        vertices.push(new THREE.Vector3(jsonA[1][0],jsonA[1][1],jsonA[1][2]));
        lineA = this.createLineMesh(vertices,'#2769b9');
        this.scene.add(lineA);

        lineArrowA = createLineArrow(1,jsonA[1],'#2769b9',0);
        this.scene.add(lineArrowA);


        var text1 = this.createText('a',[(jsonA[0][0]+jsonA[1][0])/2,jsonA[0][1]+62,0],'#2769b9');
        var text2 = this.createText('→',[(jsonA[0][0]+jsonA[1][0])/2,jsonA[0][1]+92,0],'#2769b9');
        textA.add(text1);
        textA.add(text2);
        this.scene.add(textA);



        this.scene.add(textB);
        var text3 = this.createText('b',[0,-20,0],'#f39800',1);
        textB.add(text3);
        var text4 = this.createText('→',[0,25,0],'#f39800',1);
        textB.add(text4);
        textB.position.x = (jsonB[0][0]+jsonB[1][0])/2;
        textB.position.y = -20;

        createLineB();

        lineArrowB = createLineArrow(1,jsonB[1],'#f39800');
        thiz.scene.add(lineArrowB);
        lineArrowB.position.set(jsonB[1][0]-25,jsonB[1][1],jsonB[1][2]);


        var m,g;
        m = new THREE.MeshBasicMaterial({color: '#f39800',opacity:0.5,transparent:true});
        g =  new THREE.SphereGeometry(40, 36, 36);
        spheres[0] = new THREE.Mesh(g, m);
        spheres[0].position.set(jsonB[1][0],jsonB[1][1],0);
        this.scene.add(spheres[0]);

        m = new THREE.MeshBasicMaterial({color: '#f39800',opacity:1,transparent:false});
        g =  new THREE.SphereGeometry(20, 36, 36);
        spheres[1] = new THREE.Mesh(g, m);
        spheres[1].position.set(jsonB[1][0],jsonB[1][1],0);
        this.scene.add(spheres[1]);

        m = new THREE.MeshBasicMaterial({color: '#f39800',opacity:0.3,transparent:true});
        g =  new THREE.SphereGeometry(60, 36, 36);
        pointB = new THREE.Mesh(g, m);
        pointB.position.set(jsonB[1][0],jsonB[1][1],0);
        this.scene.add(pointB);
        selectobjs.push(pointB);

        vertices = [];
        vertices.push(new THREE.Vector3(-1000,0,0));
        vertices.push(new THREE.Vector3(1000,0,0));
        lineother = this.createLineMesh(vertices,'#666',1);
        this.scene.add(lineother);

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
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color,transparent:false,opacity:1}));
        } else {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.5,
                dashSize: 20,
                gapSize: 10
            }));
        }
        return lineMesh;
    };
    this.createText = function (content, coordinate, color,ischange) {
        if (!color) {
            color = '#000';
        }
        var fontsize = '70px Cambria Math';

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
        this.controls.enableZoom = false;
        this.controls.enableRotate = false;
    };
    this.createGrid = function(){
        var geometry = new THREE.Geometry(), bottom = -0.001, step = 200;
        var lineMaterial = new THREE.LineBasicMaterial( { color: 0x949494, transparent: true, opacity: 0.5 } );
        for ( var i = 0; i <= 10; i ++ ) {
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
                if(obj.x > 1000){ obj.x = 1000;}
                if(obj.x < -1000){ obj.x = -1000;}

                spheres[0].position.x = spheres[1].position.x = selectobj.position.x = jsonB[1][0] = obj.x;
                lineArrowB.position.y = jsonB[1][1];

                if(jsonB[1][0]<0){
                    lineArrowB.visible =true;
                    lineArrowB.rotation.z = Math.PI;
                    createLineB(1);
                    lineArrowB.position.x = jsonB[1][0]+25;
                }else if(jsonB[1][0]>0){
                    lineArrowB.visible =true;
                    lineArrowB.rotation.z = 0;
                    lineArrowB.position.x = jsonB[1][0]-25;
                    createLineB();
                }else{
                    lineArrowB.visible =false;
                }

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

                    selectobj.position.x = jsonB[1][0] = obj.x;
                    createLineB();

                    spheres[0].position.x = spheres[1].position.x = selectobj.position.x = jsonB[1][0] = obj.x;
                    lineArrowB.position.y = jsonB[1][1];

                    if(jsonB[1][0]<0){
                        lineArrowB.visible =true;
                        lineArrowB.rotation.z = Math.PI;
                        createLineB(1);
                        lineArrowB.position.x = jsonB[1][0]+25;
                    }else if(jsonB[1][0]>0){
                        lineArrowB.visible =true;
                        lineArrowB.rotation.z = 0;
                        lineArrowB.position.x = jsonB[1][0]-25;
                        createLineB();
                    }else{
                        lineArrowB.visible =false;
                    }

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

        jsonB = [[0,0,0],[600,0,0]];
        createLineB();
        spheres[0].position.x = spheres[1].position.x = pointB.position.x = jsonB[1][0];
        lineArrowB.position.x = jsonB[1][0]-25;
        lineArrowB.rotation.z = 0;

    };
    this.grid = function(){
        if(grid!=undefined){
            this.scene.remove(grid);
            grid = null;
        }else{
            this.createGrid();
        }
    };

    function createLineB(length){
        if(lineB!=undefined){
            thiz.scene.remove(lineB);
        }
        var vertices = [],x=0;
        if(length){
            x = 25;
        }else{
            x = -25;
        }
        vertices.push(new THREE.Vector3(jsonB[0][0],jsonB[0][1],jsonB[0][2]));
        vertices.push(new THREE.Vector3(jsonB[1][0]-x,jsonB[1][1],jsonB[1][2]));
        lineB = thiz.createLineMesh(vertices,'#f39800');
        thiz.scene.add(lineB);
        var style=1;
        if(jsonB[1][0]<0){
            style = 2;
        }
        result1.text(''+ (jsonB[1][0]/400).toFixed(2));
        textB.position.x = (jsonB[0][0]+jsonB[1][0])/2;

    }


    function createLineArrow(arrow,coordinate,color){

        var vertices =[];
        if(arrow == 1){             //朝右
            vertices.push(new THREE.Vector3(-25,18,0));
            vertices.push(new THREE.Vector3(25,0,0));
            vertices.push(new THREE.Vector3(0-25,0-18,0));
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

    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');


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





