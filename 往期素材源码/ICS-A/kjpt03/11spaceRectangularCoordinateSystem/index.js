/**
 * Created by O2 on 2016/9/6.
 */


var scale = 1;
var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
if(!(bodyWidth == 370 && bodyHeight == 246)) {
    var isMob = /iPad|Android/g.test(navigator.userAgent), offsetLeft = 0, offsetTop = 0;
    var $body = $("body");
    // if (isMob) {
        var bodyScale = scale = bodyWidth / 1920;
        $('.body').css("zoom", bodyScale).height(1200);
        var marginTop = ($body.width() / bodyWidth * bodyHeight - 1200) / 2;
        $('.body').css("margin-top", '-600px');
        $('#threeContainer').css({
            'right': 686 * scale,
            left: 33 * scale,
            top: (69 * scale + (bodyHeight - 1200 * scale) / 2 ),
            bottom: (69 * scale + (bodyHeight - 1200 * scale) / 2 )
        });
    // } else {
    //     scale = 0.6667;
    //     $(".body").css({"zoom": 0.6667, "margin-top": '0', "top": '0'});
    //     $('#threeContainer').css({'right': 686 * scale, left: 33 * scale, top: (69 * scale ), bottom: (69 * scale)});
    // }

    offsetLeft = parseInt($('#threeContainer').offset().left);
    offsetTop = parseInt($('#threeContainer').offset().top);
    $('body').css('background','#000');
    $('#threeContainer').css({'border-radius':10*scale,'box-shadow': 6*scale + 'px '+6*scale +'px '+ 20*scale +'px rgba(0,0,0,0.30)' });

    $('.zoom').css("zoom",scale);
}
//showheight 居中
var conHeight = $("#controlContainer").height();
var showheight = $(".showheight").height();
var h2Height = $("#controlContainer h2").height();
var h2MarginTop = parseInt($("#controlContainer h2").css("margin-top"));
var marginTop = (conHeight - showheight)/2;
$(".showheight").css("margin-top",marginTop - h2Height - h2MarginTop+30);

//选中操作相关变量
var raycaster = new THREE.Raycaster(),
    plane = new THREE.Plane(),
    offset = new THREE.Vector3(),
    intersection = new THREE.Vector3(),
    mouse = new THREE.Vector2(),
    INTERSECTED = null;
document.onselectstart=function(){
    return false;
};

var selectFunction = 0,select6=0;
var opened=0;
var fullScreen=0,$threeCon = $('#threeContainer'),$obj = $('#threeContainer'),threeWidth = $obj.width(),threeHeight = $obj.height();



function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var $obj = $('#threeContainer'),
        threeHeight = $obj.height(),
        threeWidth = $obj.width();

    var objs=[null,null,null,null,null,null],pointP=null,textP=null;


    $('.verticalCenter').css('margin-top',(threeHeight-119 - $('.verticalCenter').height() )/2);

    var arrayStart=[100,100,0];
    var changePoint = [100,100,0];
    var signStart = [[1,1,1],[1,1,0],[1,0,1],[1,0,0],[0,1,1],[0,1,0],[0,0,1],[0,0,0]];
    var nowSignStart = [[1,1,0],[1,0,1],[1,0,0],[0,1,1],[0,1,0],[0,0,1],[0,0,0]];
    var count=2;

    var thiz = this;
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
        this.camera.position.x = 1000;
        this.camera.position.y = 1000;
        this.camera.position.z = 1000;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
       // this.createGrid();
        this.createAxis('#000');
        createObjs();

        var textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};
        textP =  new SpriteText2D('P', textStyle);
        thiz.scene.add(textP);
        // textP.visible =false;
        pointP = createSphere(changePoint,10,0x78cdf8);
        thiz.scene.add(pointP);

        createPointP();
        createFuzhuLines();

    };
    this.objStyle = function (color, fontsize) {
        return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        // this.controls.enableRotate =false;
        // this.controls.enablePan =false;
    };
    this.createGrid = function(){
        var geometry = new THREE.Geometry(), bottom = -0.001, step = 50;
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
    this.createAxis = function(color){
        objs[1] = new THREE.Group();
        labelAxis(-500, 50, 500,color);
        drawAxisArrow(vec3( -550, 0, 0 ), vec3( 550, 0, 0 ), color,1);
        drawAxisArrow(vec3( 0, -550, 0 ), vec3( 0, 550, 0 ), color,2);
        drawAxisArrow(vec3( 0, 0, -550 ), vec3( 0, 0, 550 ), color,3);
        this.scene.add( objs[1]);
    };
    this.reback = function(){
        thiz.scene.remove(objs[1]);
        thiz.createAxis('#000');
        objs[0].visible = objs[2].visible = objs[3].visible = objs[4].visible = objs[4].visible = false;

        changePoint = [100,100,0];
        nowSignStart = [[1,1,0],[1,0,1],[1,0,0],[0,1,1],[0,1,0],[0,0,1],[0,0,0]];
        count=2;
        createPointP();
        createFuzhuLines();
        this.camera.position.x = 1000;
        this.camera.position.y = 1000;
        this.camera.position.z = 1000;
    };
    this.changeRange = function(){
        createChangeLine();
    };
    this.clickEve = function(){
        if(opened == 1){//打开
            if( selectFunction == 2){
                thiz.scene.remove(objs[1]);
                thiz.createAxis('red');
            }else if(selectFunction == 6){
                objs[5].visible = true;
            }else{
                objs[selectFunction-1].visible = true;
            }
        }else if(opened == 2){
            if(selectFunction == 2){
                thiz.scene.remove(objs[1]);
                thiz.createAxis('#000');
            }else if(selectFunction == 6){
                objs[5].visible = false;
            }else{
                objs[selectFunction-1].visible = false;
            }
        }

    };
    this.renewP = function(){
        var i,array=[];
        count++;

        var num = Math.floor(Math.random()*nowSignStart.length);
        array= nowSignStart[num];
        nowSignStart.splice(num,1);

        for(i=0;i<3;i++){
            num = Math.random()*10;
            if(array[i] == 1){
                changePoint[i] = num*50;
            }else{
                changePoint[i] = -num*50;
            }
        }
        createPointP();
        createFuzhuLines();

        if(select6){
            objs[5].visible = true;
        }

        if(count >8){
            count = 1;
            nowSignStart=[];
            for(i=0;i<signStart.length;i++){
                array = [signStart[i][0],signStart[i][1],signStart[i][2]];
                nowSignStart.push(array);
            }
        }




    };

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
    function drawAxisArrow(origin, dir, _color,style){
        var vertices = [];

        vertices.push(new THREE.Vector3(origin.x,origin.y,origin.z));
        vertices.push(new THREE.Vector3(dir.x,dir.y,dir.z));

        var line = createLineMesh(vertices,_color,3);
        objs[1].add(line);

        if(style == 1){
            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,_color,3);
            objs[1].add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,-5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,_color,3);
            objs[1].add(line);
        }else if(style == 2){

            vertices = [];
            vertices.push(new THREE.Vector3(5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,_color,3);
            objs[1].add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(-5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,_color,3);
            objs[1].add(line);

        }else{
            vertices = [];
            vertices.push(new THREE.Vector3(5,0,-dir.z+20));
            vertices.push(new THREE.Vector3(0,0,-dir.z));
            line = createLineMesh(vertices,_color,3);
            objs[1].add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(-5,0,-dir.z+20));
            vertices.push(new THREE.Vector3(0,0,-dir.z));
            line = createLineMesh(vertices,_color,3);
            objs[1].add(line);
        }
        // line = createLineMesh()

    }
    function labelAxis(start, stepSize, stop,color) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={},line=null,vertices=null;
        // label x axis:
        textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            if(i == 0){
                text = new SpriteText2D('O', textStyle);
                text.position.x = i - 10;
                text.position.y = - 10;
                objs[1].add(text);
            }
            // text = new SpriteText2D(i/50, textStyle);
            //
            // if(i == 0){
            //     text = new SpriteText2D(i/50, textStyle);
            //     text.position.x = i - 10;
            // }else{
            //     text.position.x = i;
            // }
            //
            // text.position.y = -15;
            // axis.add(text);

            vertices = [];

            vertices.push(new THREE.Vector3(i,0,0));
            vertices.push(new THREE.Vector3(i,10,0));

            line = createLineMesh(vertices,'#000',3);
            objs[1].add(line);
        }
        text = new SpriteText2D('x', textStyle);
        text.position.x = stop+50;
        text.position.y = -15;
        objs[1].add(text);

        // label y axis:
        textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for( i = start; i <= stop; i = i+stepSize) {
            if(i == 0){ continue;}
            // text = new SpriteText2D(i/50, textStyle);
            // text.position.x = -30;
            // text.position.y = i+10;
            // text.position.z = 0.2;
            // axis.add(text);

            vertices = [];

            vertices.push(new THREE.Vector3(0,i,0));
            vertices.push(new THREE.Vector3(-10,i,0));

            line = createLineMesh(vertices,'#000',3);
            objs[1].add(line);
        }
        text = new SpriteText2D('z', textStyle);
        text.position.x = -15;
        text.position.y = stop+50;
        text.position.z = 0.2;
        objs[1].add(text);

        for( i = start; i <= stop; i = i+stepSize) {
            if(i == 0){ continue;}
            // text = new SpriteText2D(i/50, textStyle);
            // text.position.y = -30;
            // text.position.z = i+10;
            // text.position.x = 0.2;
            // axis.add(text);

            vertices = [];

            vertices.push(new THREE.Vector3(0,10,i));
            vertices.push(new THREE.Vector3(0,0,i));

            line = createLineMesh(vertices,'#000',3);
            objs[1].add(line);
        }

        text = new SpriteText2D('y', textStyle);
        text.position.x = 0;
        text.position.y = -15;
        text.position.z = -stop-50;
        objs[1].add(text);
    }
    function vec3(x,y,z){
        return new THREE.Vector3(x, y, z);
    }
    function createSphere(coordinate, radius,color) {
        var sphereG = new THREE.SphereGeometry(radius, 15, 15, 0, 2 * Math.PI, 0, 2 * Math.PI);
        var sphereM = new THREE.MeshBasicMaterial({color: color});
        var sphere = new THREE.Mesh(sphereG, sphereM),x,y;
        x = coordinate[0];
        y = coordinate[1];
        sphere.position.x = x;
        sphere.position.y = y;
        sphere.position.z = coordinate[2];
        return sphere;
    }
    function createPlane(width,height,color){
        // var mesh = new THREE.Group();
        // var i,line=null,vertices=[];
        // for(i=-width/2;i<=width/2;){
        //     vertices=[];
        //     vertices.push(new THREE.Vector3(i,height/2,0));
        //     vertices.push(new THREE.Vector3(i,-height/2,0));
        //     line = createLineMesh(vertices,color,2);
        //     mesh.add(line);
        //     i=i+100;
        // }
        //
        // for(i=-height/2;i<=height/2;){
        //     vertices=[];
        //     vertices.push(new THREE.Vector3(width/2,i,0));
        //     vertices.push(new THREE.Vector3(-width/2,i,0));
        //     line = createLineMesh(vertices,color,2);
        //     mesh.add(line);
        //     i=i+100;
        // }

        var obj = new THREE.PlaneGeometry(width,height);
        var material = new THREE.MeshBasicMaterial({color:color,opacity:0.8,transparent:true,side:THREE.DoubleSide});
        var mesh = new THREE.Mesh(obj,material);
        return mesh;
    }

    function createObjs(){
        objs[0] = createSphere([0,0,0],18,0x78cdf8);
        thiz.scene.add(objs[0]);
        objs[0].visible = false;



        objs[3] = createPlane(1000,1000,'#aadfdf');
        thiz.scene.add(objs[3]);
        objs[3].visible =false;
        //
        objs[4] = createPlane(1000,1000,'#60b5f1');
        objs[4].rotation.y = Math.PI/2;
        thiz.scene.add(objs[4]);
        objs[4].visible =false;

        objs[2] = createPlane(1000,1000,'#e2d96b');
        objs[2].rotation.x = Math.PI/2;
        thiz.scene.add(objs[2]);
        objs[2].visible =false;




    }
    function createPointP(){
        pointP.position.x = changePoint[0];
        pointP.position.y = changePoint[2];
        pointP.position.z = -changePoint[1];

        textP.text = 'P('+(changePoint[0]/50).toFixed(0)+','+(changePoint[1]/50).toFixed(0)+','+(changePoint[2]/50).toFixed(0)+')';
        //
        //
        textP.position.x = changePoint[0];
        textP.position.y =  changePoint[2]+40;
        textP.position.z = -changePoint[1];
    }
    function createFuzhuLines(){
        if(objs[5]!=null){
            thiz.scene.remove(objs[5]);
        }
        objs[5] = new THREE.Group();
        var vertices=[];
        vertices.push(new THREE.Vector3(changePoint[0],changePoint[2],-changePoint[1]));
        vertices.push(new THREE.Vector3(changePoint[0],0,-changePoint[1]));
        var line = createLineMesh(vertices,'#000',2);
        objs[5].add(line);

        vertices=[];
        vertices.push(new THREE.Vector3(changePoint[0],changePoint[2],-changePoint[1]));
        vertices.push(new THREE.Vector3(changePoint[0],changePoint[2],0));
        line = createLineMesh(vertices,'#000',2);
        objs[5].add(line);

        vertices=[];
        vertices.push(new THREE.Vector3(changePoint[0],changePoint[2],-changePoint[1]));
        vertices.push(new THREE.Vector3(0,changePoint[2],-changePoint[1]));
        line = createLineMesh(vertices,'#000',2);
        objs[5].add(line);
        thiz.scene.add(objs[5]);
        objs[5].visible =false;

    }
}


var threeDimensional = new ThreeDimensional();
threeDimensional.int();

renderAll();
function renderAll(){
    threeDimensional.controls.update();
    requestAnimationFrame(renderAll);
    threeDimensional.renderer.render(threeDimensional.scene,threeDimensional.camera);
}

var $turnDiv = $('.turnDiv'), $turnRight = $('.turnRight'),$slider = $('.slider');

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
function turnRight(){
    var dataId = $(this).attr('data-id');
    selectFunction = dataId;
    if($(this).parent().hasClass('on')){
        opened = 2;
        $(this).parent().removeClass('on').addClass('off');
        $(this).parent().find('.span2').text('' +'off');

        if(dataId == 6){
            select6 = 0;
        }
    }else{
        opened = 1;
        $(this).parent().removeClass('off').addClass('on');
        $(this).parent().find('.span2').text('' +'on');

        if(dataId == 6){
            select6 = 1;
        }
    }
    threeDimensional.clickEve();
}
function renew(){
    selectFunction = 0;
    $turnDiv.removeClass('on').addClass('off');
    $turnDiv.find('.span2').text('' +'off');
    select6 = 0;
    threeDimensional.reback();
}
if(isMob){
    $('.turnRight').on('touchstart',turnRight);
    $('#createP').on('touchstart',threeDimensional.renewP);
    $('#renew').on('touchstart',renew);
    /*全屏事件*/
    $('#scale').on('touchstart',scalef);
}else{
    $('.turnRight').on('click',turnRight);
    $('#createP').on('click',threeDimensional.renewP);
    $('#renew').on('click',renew);
    /*全屏事件*/
    $('#scale').on('click',scalef);
}

//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});
