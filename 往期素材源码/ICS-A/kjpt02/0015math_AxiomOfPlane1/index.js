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
     threeWidth= $obj.width();


var a1=null,a2=null,b1=null,b2=null,c1=null,c2=null,d1=null,d2=null;
var dynamic = false;
var grid = false;
var selectobjs = [],mousedownflag = false,textA,textB,timg;


var getParameter = {
    angleJson:[],
    angle1:Math.PI/180*45,
    height:400,
    length:700
};

var threeDimension = {
    init:function(){
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.getJson(getParameter.length/2);
        threeDimension.createLine1();
        threeDimension.createSphere1();
        threeDimension.createSphere2();
        threeDimension.createGradulGrid();

    },
    createScene:function(){
        threeDimension.scene = new THREE.Scene();
        threeDimension.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
        threeDimension.camera.position.x = 1200;
        threeDimension.camera.position.y = 1200;
        threeDimension.camera.position.z = 1200;
        threeDimension.camera.lookAt(threeDimension.scene.position);
        threeDimension.scene.add(threeDimension.camera);
        threeDimension.renderer = null;
        if(canWebgl){
            threeDimension.renderer = new THREE.WebGLRenderer({antialias:true});
        }else{
            threeDimension.renderer = new THREE.CanvasRenderer();
        }
        threeDimension.renderer.setPixelRatio( window.devicePixelRatio );
        threeDimension.renderer.setClearColor(0xffffff);
        threeDimension.renderer.setSize(threeWidth,threeHeight);
        $obj.append(threeDimension.renderer.domElement);
    },
    createControls:function(){
        threeDimension.controls = new THREE.OrbitControls( threeDimension.camera, threeDimension.renderer.domElement );
        threeDimension.controls.enableDamping = true;
        threeDimension.controls.dampingFactor = 0.25;
        threeDimension.controls.enableZoom = true;
    },
    vec3:function(x,y,z){
        return new THREE.Vector3(x, y, z);
    },
    createGrid:function (){
        if(threeDimension.grid){
            threeDimension.scene.remove(threeDimension.grid);
        }
        threeDimension.grid = new THREE.Object3D();
        var geometry = new THREE.Geometry();
        var size=500, bottom = - 0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( {color : 0x949494, transparent: true, opacity: 0.9} );
        for(var i = 0;i < 21;i ++){
            geometry.vertices.push( threeDimension.vec3( - size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, size ) );
        }
        var grid = new THREE.Line( geometry, lineMaterial,1 );
        var text = threeDimension.createText("α",-420,25,420,"#000000");

        threeDimension.grid.add(grid,text);
        threeDimension.scene.add(threeDimension.grid);
    },
    createText:function(texts,x,y,z,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '23px Cambria Math', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x,y,z);
        return text;
    },
    getJson:function(length){
        var x,y;
        getParameter.angleJson = [];
        x = Math.round(length*Math.cos(getParameter.angle1));
        y = Math.round(length*Math.sin(getParameter.angle1));
        getParameter.angleJson.push([x,0,-y]);
        getParameter.angleJson.push([-x,0,y]);

    },

    createLine:function(){
        var json = getParameter.angleJson;
        var material1 = new THREE.LineBasicMaterial({color:'#1161c8'});
        var geom1 = new THREE.Geometry();
        geom1.vertices.push(threeDimension.vec3(json[0][0],json[0][1],json[0][2]));
        geom1.vertices.push(threeDimension.vec3(json[1][0],json[1][1],json[1][2]));


        var lines = new THREE.Group();
        var line = new THREE.Line(geom1,material1);
        lines.add(line);

        line = new THREE.Line(geom1,material1);
        lines.add(line);

        line = new THREE.Line(geom1,material1);
        lines.add(line);
        return line;
    },
    createLine1:function(){
        if(threeDimension.line1){
            threeDimension.scene.remove(threeDimension.line1);
        }
        threeDimension.line1 = new THREE.Object3D();
        var json = getParameter.angleJson;
        var line = threeDimension.createLine();
        var text = threeDimension.createText("l1",(json[0][0]+json[1][0])/2+20,20,(json[0][2]+json[1][2])/2+20,"#1161c8");
        threeDimension.line1.add(line,text);
        threeDimension.scene.add(threeDimension.line1);
    },
    createGradulGrid:function(){
        threeDimension.scene.remove(threeDimension.grid);
        threeDimension.grid = new THREE.Group();
        var num = 0,start = -500;
        var lineMaterial = new THREE.LineBasicMaterial( {color : 0x949494, transparent: true, opacity: 0.9} );

       /* timg = setInterval(function(){
            if(num>=20){
                num = 0;
                clearInterval(timg);
                return;
            }

            createLines();
            num++;
        },100);*/
        for(var i=0;i<20;i++){
            createLines();
            num++
        }

        var vertices = [];
        vertices.push(new THREE.Vector3(-500, 0, -500));
        vertices.push(new THREE.Vector3(500, 0, -500));
        var line = threeDimension.creatLineMesh(vertices,0x949494);
        threeDimension.grid.add(line);

        function createLines(){
            var vertices = [];
            for(var i=0;i<=20;i++){
                vertices = [];
                vertices.push(new THREE.Vector3(start+i*50, 0, start+num*50));
                vertices.push(new THREE.Vector3(start+i*50, 0, start+(num+1)*50));
                var line = threeDimension.creatLineMesh(vertices,0x949494);
                threeDimension.grid.add(line);
            }
            vertices = [];
            vertices.push(new THREE.Vector3(-500, 0, start+(num+1)*50));
            vertices.push(new THREE.Vector3(500, 0, start+(num+1)*50));
            line = threeDimension.creatLineMesh(vertices,0x949494);
            threeDimension.grid.add(line);
        }

        threeDimension.scene.add(threeDimension.grid);

    },

    createDashedLine1:function(x,y,z){
        if(threeDimension.dash1){
            threeDimension.scene.remove(threeDimension.dash1);
        }
        if(threeDimension.dash2){
            threeDimension.scene.remove(threeDimension.dash2);
        }
        var material = new THREE.LineDashedMaterial({color:0x333333,dashSize:10,gapSize:10});
        var geom1 = new THREE.Geometry();
        var geom2 = new THREE.Geometry();

        geom1.vertices.push(threeDimension.vec3(x,getParameter.height,z));
        geom1.vertices.push(threeDimension.vec3(x,y,z));
        threeDimension.dash1 = new THREE.Line(geom1,material);
        geom1.computeLineDistances();
        threeDimension.scene.add(threeDimension.dash1);

        geom2.vertices.push(threeDimension.vec3(-x,getParameter.height,-z));
        geom2.vertices.push(threeDimension.vec3(-x,y,-z));
        threeDimension.dash2 = new THREE.Line(geom2,material);
        geom2.computeLineDistances();
        threeDimension.scene.add(threeDimension.dash2);
    },
    creatLineMesh:function(vertices, color, style){
        var lineMesh = null, geometryLine = new THREE.Geometry();
        //geometryLine.vertices = vertices;
        if (!color) {
            color = '#000';
        }
        if (!style) {
            vertices.push(new THREE.Vector3(vertices[0].x,vertices[0].y,vertices[0].z));
            vertices.push(new THREE.Vector3(vertices[1].x,vertices[1].y,vertices[1].z));

            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));

        } else {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 5,
                gapSize: 5
            }));
        }
        return lineMesh;
    },

    createSphere:function(x,z){
        var material = new THREE.MeshBasicMaterial({color:0x7ECAF0, transparent:true, opacity:0.9});
        var sphGeo = new THREE.SphereGeometry(15,36,36);
        var mesh = new THREE.Mesh(sphGeo,material);
        mesh.position.x = x;
        mesh.position.z = z;
        threeDimension.scene.add(mesh);
        return mesh;
    },
    createSphere1:function(){
        threeDimension.sph1 = new THREE.Object3D();
        var json = getParameter.angleJson;
        var sph = threeDimension.createSphere(json[0][0],json[0][2]);
        sph.name = 'a';
        textA = threeDimension.createText("A",json[0][0]+30,25,json[0][2]+30,"#333333");
        threeDimension.sph1.add(sph,textA);
        threeDimension.scene.add(threeDimension.sph1);
        selectobjs.push(sph);
    },
    createSphere2:function(){
        threeDimension.sph2 = new THREE.Object3D();
        var json = getParameter.angleJson;
        var sph = threeDimension.createSphere(json[1][0],json[1][2]);
        sph.name = 'b';
        textB = threeDimension.createText("B",json[1][0]-30,25,json[1][2]-30,"#333333");
        threeDimension.sph2.add(sph,textB);
        threeDimension.scene.add(threeDimension.sph2);
        selectobjs.push(sph);
    },
    dynamical:function(){
        threeDimension.scene.add(threeDimension.line1);
    },
    onDocumentMouseDown:function(event){
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
        raycaster.setFromCamera(mouse, threeDimension.camera);
        var intersects = raycaster.intersectObjects(selectobjs);
        if (intersects.length > 0) {
            threeDimension.selectSphere = intersects[0].object;
            intersects[0].object.material.transparent = true;
            intersects[0].object.material.opacity = 0.5;

            mousedownflag = true;
            threeDimension.controls.enableRotate =false ;
            threeDimension.scene.remove(threeDimension.controls);
        }
    },
    onDocumentMouseMove:function(event){
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
        raycaster.setFromCamera(mouse, threeDimension.camera);
        if ( intersects.length > 0 ) {
            if ( INTERSECTED != intersects[ 0 ].object ) {
                INTERSECTED = intersects[ 0 ].object;
                plane.setFromNormalAndCoplanarPoint(threeDimension.camera.getWorldDirection( plane.normal ),INTERSECTED.position );
            }
        }
        if(mousedownflag){
            var intersection = new THREE.Vector3();
            if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                var obj = intersection.sub( offset );


                if(threeDimension.selectSphere.name=='a'){
                    getParameter.angleJson[0][0] =  obj.x;
                    getParameter.angleJson[0][2] = obj.z;

                    selectobjs[0].position.x =  getParameter.angleJson[0][0];
                    selectobjs[0].position.z =  getParameter.angleJson[0][2];

                    textA.position.x =  getParameter.angleJson[0][0]+30;
                    textA.position.z =  getParameter.angleJson[0][2]+30;

                    threeDimension.createLine1();
                }
                if(threeDimension.selectSphere.name=='b'){
                    getParameter.angleJson[1][0] = obj.x;
                    getParameter.angleJson[1][2] = obj.z;


                    selectobjs[1].position.x =  getParameter.angleJson[1][0];
                    selectobjs[1].position.z =  getParameter.angleJson[1][2];

                    textB.position.x =  getParameter.angleJson[1][0]+30;
                    textB.position.z =  getParameter.angleJson[1][2]+30;

                    threeDimension.createLine1();
                }
            }
        }
    },
    onDocumentMouseUp:function(){
        event.preventDefault();
        if(threeDimension.selectSphere){
            threeDimension.selectSphere.material.opacity = 1;
            threeDimension.selectSphere.transparent = false;
            threeDimension.controls.enableRotate =true;
            mousedownflag = false;
            //threeDimensional.repaintMesh();
        }
        if ( INTERSECTED ) {
            threeDimension.selectSphere = null;
        }
    },
    onDocumentTouchStart:function(event){
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
            raycaster.setFromCamera(mouse, threeDimension.camera);
            var intersects = raycaster.intersectObjects(selectobjs);
            if (intersects.length > 0) {
                mousedownflag = true;
                threeDimension.controls.enableRotate =false;
                threeDimension.scene.remove(threeDimension.controls);
                threeDimension.selectSphere =intersects[0].object;
                intersects[0].object.material.transparent = true;
                intersects[0].object.material.opacity = 0.5;
            }
        }
    },
    onDocumentTouchMove:function(event){
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
            raycaster.setFromCamera(mouse, threeDimension.camera);
            if ( intersects.length > 0 ) {
                if ( INTERSECTED != intersects[ 0 ].object ) {
                    INTERSECTED = intersects[ 0 ].object;
                    plane.setFromNormalAndCoplanarPoint(threeDimension.camera.getWorldDirection( plane.normal ),INTERSECTED.position );
                }
            }
            if(mousedownflag){
                var intersection = new THREE.Vector3();
                if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                    var obj = intersection.sub( offset );


                    if(threeDimension.selectSphere.name=='a'){
                        getParameter.angleJson[0][0] =  obj.x;
                        getParameter.angleJson[0][2] = obj.z;

                        selectobjs[0].position.x =  getParameter.angleJson[0][0];
                        selectobjs[0].position.z =  getParameter.angleJson[0][2];

                        textA.position.x =  getParameter.angleJson[0][0]+30;
                        textA.position.z =  getParameter.angleJson[0][2]+30;

                        threeDimension.createLine1();
                    }
                    if(threeDimension.selectSphere.name=='b'){
                        getParameter.angleJson[1][0] = obj.x;
                        getParameter.angleJson[1][2] = obj.z;


                        selectobjs[1].position.x =  getParameter.angleJson[1][0];
                        selectobjs[1].position.z =  getParameter.angleJson[1][2];

                        textB.position.x =  getParameter.angleJson[1][0]+30;
                        textB.position.z =  getParameter.angleJson[1][2]+30;

                        threeDimension.createLine1();
                    }
                }
            }
        }
    },
    onDocumentTouchEnd:function(event){
        event.preventDefault();
        threeDimension.controls.enableRotate =true;
        mousedownflag = false;
        threeDimension.selectSphere.material.transparent = false;
        threeDimension.selectSphere.material.opacity = 1;
    }

};
threeDimension.init();


//重置事件
function renderAll(){
    threeDimension.controls.update();

    requestAnimationFrame(renderAll);
    threeDimension.renderer.render(threeDimension.scene,threeDimension.camera);
}
renderAll();

//鼠标点击，选中顶点
threeDimension.renderer.domElement.addEventListener( 'mousedown', threeDimension.onDocumentMouseDown, false );
threeDimension.renderer.domElement.addEventListener( 'mouseup', threeDimension.onDocumentMouseUp, false );
threeDimension.renderer.domElement.addEventListener( 'mousemove', threeDimension.onDocumentMouseMove, false );
threeDimension.renderer.domElement.addEventListener( 'touchstart', threeDimension.onDocumentTouchStart, false );
threeDimension.renderer.domElement.addEventListener( 'touchmove', threeDimension.onDocumentTouchMove, false );
threeDimension.renderer.domElement.addEventListener( 'touchend', threeDimension.onDocumentTouchEnd, false );

var checked =false;
//on/off事件
function clickEve1(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
        checked = false;
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
        $(this).parent().parent().siblings().find('.span2').text('' +'off');
        checked = true;
    }
    /*if(checked){
        threeDimension.dynamical();
        // threeDimension.createGradulGrid();
    }else{
        clearInterval(timg);
        threeDimension.scene.remove(threeDimension.grid);
    }*/
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
    getParameter = {
        angleJson:[[247,0,-247],[-247,0,247]],
        angle1:Math.PI/180*45,
        height:400,
        length:700
    };

    threeDimension.camera.position.set(1200,1200,1200);
    selectobjs[0].position.x =  getParameter.angleJson[0][0];
    selectobjs[0].position.z =  getParameter.angleJson[0][2];

    textA.position.x =  getParameter.angleJson[0][0]+30;
    textA.position.z =  getParameter.angleJson[0][2]+30;

    selectobjs[1].position.x =  getParameter.angleJson[1][0];
    selectobjs[1].position.z =  getParameter.angleJson[1][2];

    textB.position.x =  getParameter.angleJson[1][0]-30;
    textB.position.z =  getParameter.angleJson[1][2]-30;
    threeDimension.createLine1();

    $('#div1').parent().parent().removeClass('on').addClass('off');
    $('#div1').parent().parent().find('.span2').text('' +'off');
    /*clearInterval(timg);
    threeDimension.scene.remove(threeDimension.grid);*/
}

if(!isMob){
    $('#scale').on('click',fullEve);
    $('#renew').on('click',renewEve);
    $('#div1').on('click',clickEve1);
}else{
    $('#scale').on('touchstart',fullEve);
    $('#renew').on('touchstart',renewEve);
    $('#div1').on('touchstart',clickEve1);
}



