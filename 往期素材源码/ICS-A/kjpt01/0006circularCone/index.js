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
// $(".con").css("margin-top",marginTop);
var arcJson = [];
var ismoving = false,speed=1,changeFlag=0;
var dynamic = 0;

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


var polygon = { //多边形参数
    angleJson : [],
    height:150,
    angle:0,
    radius:100,
    clear:5
};
var getParameter ={ //显示和改变参数
    height:150,      //选择高度
    angle:0,   //选择边的数目
    radius:100,
    clear:5
};


if(canWebgl){
    renderer = new THREE.WebGLRenderer({antialias:true});
    speed = 180;
}else{
    renderer = new THREE.CanvasRenderer();
    speed = 60;
}

//控件取值结束
var axisFlag=false;
var twoDimension={
    spheres:[],
    texts:[],
    selectSphere : null,
    intersects:null,
    getJson:function(){
        var arrayAll =[];
        polygon.angleJson = [];
        arrayAll[0] = [0,0,0];
        arrayAll[1] = [0,0,-polygon.height];
        arrayAll[2] = [polygon.radius,0,0];
        polygon.angleJson = arrayAll;
    },
    getArcJson:function(){
        arcJson=[];
        var angle = -polygon.angle;
        var radius = polygon.radius;
        arcJson[0] = [0,0,0];
        arcJson[1] = [0,polygon.height,0];
        arcJson[2] = [Math.round(radius*Math.cos(angle)),0,Math.round(radius*Math.sin(angle))];
    },
    createMesh:function (geom) { //对象和材质融合，创建路径对象
        var wireFrameMat = new THREE.MeshBasicMaterial({color:'#F39800',transparent:true,opacity:0.7,side:THREE.DoubleSide});
        var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [ wireFrameMat]);
        return mesh;
    }
};

twoDimension.getJson();

//三维图形开始
var threeDimensional ={
    lines : [],
    textMesh : [],
    axis : new THREE.Group(),
    grid:null,
    mesh:null,
    controlrs:null,
    cylinder:null,
    clyinderLines:[],
    rectangle:[],
    labelAxis:function (start, stepSize, stop) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={};
        // label x axis:
        textStyle = {align: textAlign.center, font: '10px Cambria Math', fillStyle: 'red', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i, textStyle);
            text.rotation = camera.rotation;
            text.position.x = i;
            text.position.y = -5;
            threeDimensional.axis.add(text);
        }
        text = new SpriteText2D('x', textStyle);
        text.rotation = camera.rotation;
        text.position.x = stop+30;
        text.position.y = -5;
        threeDimensional.axis.add(text);

        // label z axis:
        textStyle = {align: textAlign.center, font: '10px Cambria Math', fillStyle: '#00F', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i, textStyle);
            text.position.z = i;
            text.position.x = -0.2;
            text.position.y = -5;
            threeDimensional.axis.add(text);
        }
        text = new SpriteText2D('z', textStyle);
        text.position.z = stop+30;
        text.position.x = -0.2;
        text.position.y = -5;
        threeDimensional.axis.add(text);
        // label y axis:
        textStyle = {align: textAlign.center, font: '10px Cambria Math', fillStyle: '#00FF00', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i, textStyle);
            text.rotation = camera.rotation;
            text.position.x = 5;
            text.position.y = i;
            text.position.z = 0.2;
            threeDimensional.axis.add(text);
        }
        text = new SpriteText2D('y', textStyle);
        text.position.x = 5;
        text.position.y = stop+30;
        text.position.z = 0.2;
        threeDimensional.axis.add(text);
    },
    createCylinder:function(){
        if(threeDimensional.cylinder instanceof THREE.Mesh){
            sceneT.remove(threeDimensional.cylinder);
            threeDimensional.cylinder = null;
        }
        var meshG = new THREE.CylinderGeometry(0,polygon.radius,polygon.height,72,72);
        var meshM = new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.3,transparent:true});
        threeDimensional.cylinder = new THREE.Mesh(meshG,meshM);
        threeDimensional.cylinder.position.y = polygon.height/2;
        sceneT.add(threeDimensional.cylinder);
    },
    createClyinderLine:function(){
        if(threeDimensional.clyinderLines.length){
            for(var i=0;i<threeDimensional.clyinderLines.length;i++){
                sceneT.remove(threeDimensional.clyinderLines[i]);
            }
            threeDimensional.clyinderLines=[];
        }
        var geometryLine1 =new THREE.Geometry();
        var vertices1 =[];
        var radius = polygon.radius;
        for(i=0;i<73;i++){
            vertices1.push(new THREE.Vector3(radius*Math.cos(i*5*Math.PI/180),0,radius*Math.sin(i*5*Math.PI/180)));
        }
        geometryLine1.vertices = vertices1;
        var lineMesh1 = new THREE.Line(geometryLine1, new THREE.LineBasicMaterial({color: '#F39800'}));
        sceneT.add(lineMesh1);
        threeDimensional.clyinderLines.push(lineMesh1);
    },
    createTextMesh:function(){
        if(!axisFlag){ return;}
        if(threeDimensional.textMesh.length){
            for(var i=0;i<threeDimensional.textMesh.length;i++){
                sceneT.remove(threeDimensional.textMesh[i]);
            }
            threeDimensional.textMesh=[];
        }
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '12px Cambria Math', fillStyle: '#000', antialias: true};
        for(i=0;i<arcJson.length;i++){
            var v3 = arcJson[i];
            var text = new SpriteText2D(v3[0] + ","  + v3[1]+","  + v3[2], textStyle);
            var x,y;
            if(v3[0] < 0){ x= v3[0]-20;}else{ x= v3[0]+20}
            if(v3[1] >0){ y = v3[1] +20;}else{ y=v3[1]-20}
            text.position.set(x, y, v3[2]);
            sceneT.add(text);
            threeDimensional.textMesh.push(text);
        }
    },
    vec3:function(x,y,z){
        return new THREE.Vector3(x, y, z);
    },
    drawAxisArrow:function(origin, dir, _color) {
        var geometryLine = new THREE.Geometry();
        var vertices = [];
        vertices.push(origin);
        vertices.push(dir);
        geometryLine.vertices = vertices;
        var line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: _color}));
        threeDimensional.axis.add(line);

    },
    createGrid:function (){
        threeDimensional.grid=null;
        var geometry = new THREE.Geometry(), bottom = -0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( { color: 0x949494, transparent: true, opacity: 0.5 } );
        for ( var i = 0; i <= 12; i ++ ) {
            geometry.vertices.push( threeDimensional.vec3( - 300, bottom, i * step - 300 ) );
            geometry.vertices.push( threeDimensional.vec3(   300, bottom, i * step - 300 ) );

            geometry.vertices.push( threeDimensional.vec3( i * step - 300, bottom, -300 ) );
            geometry.vertices.push( threeDimensional.vec3( i * step - 300, bottom,  300 ) );
        }
        threeDimensional.grid = new THREE.LineSegments( geometry, lineMaterial, THREE.LinePieces );
        sceneT.add( threeDimensional.grid );
        window.gridColor = 0x303030;
    },
    createAxis:function(){
        threeDimensional.axis = new THREE.Group();
        threeDimensional.labelAxis(50, 50, 300);
        threeDimensional.drawAxisArrow(threeDimensional.vec3( 0, 0, 0 ), threeDimensional.vec3( 350, 0, 0 ), 0xFF0000);
        threeDimensional.drawAxisArrow(threeDimensional.vec3( 0, 0, 0 ), threeDimensional.vec3( 0, 350, 0 ), 0x00FF00);
        threeDimensional.drawAxisArrow(threeDimensional.vec3( 0, 0, 0 ), threeDimensional.vec3( 0, 0, 350 ), 0x0000FF);
        sceneT.add( threeDimensional.axis);
    },
    drawRectangle:function(){
        if(threeDimensional.rectangle.length){
            sceneT.remove(threeDimensional.rectangle[0]);
            threeDimensional.rectangle = [];
        }

        var shape = new THREE.Shape();
        shape.moveTo(0,0,0);
        shape.lineTo(0,polygon.height,0);
        shape.lineTo(polygon.radius,0,0);


        var obj =new THREE.ShapeGeometry(shape);
        var mesh = twoDimension.createMesh(obj);
        mesh.rotation.y = polygon.angle;
        sceneT.add(mesh);
        threeDimensional.rectangle.push(mesh);

        // for(var i=0;threeDimensional.lines.length;i++){
        //     sceneT.remove(threeDimensional.lines[i]);
        //     threeDimensional.lines = [];
        // }
        // var geometryLine1 =new THREE.Geometry();
        // var vertices1 =[];
        // vertices1.push(new THREE.Vector3(0,0,0));
        // vertices1.push(new THREE.Vector3(0,polygon.height,0));
        // vertices1.push(new THREE.Vector3(polygon.radius,polygon.height,0));
        // vertices1.push(new THREE.Vector3(polygon.radius,0,0));
        //
        // geometryLine1.vertices = vertices1;
        // var lineMesh1 = new THREE.Line(geometryLine1, new THREE.LineBasicMaterial({color: '#ed78a1',side:THREE.DoubleSide}));
        // sceneT.add(lineMesh1);
        // threeDimensional.lines.push(lineMesh1);
    },
    repaintMesh:function(){
        threeDimensional.createCylinder();
        threeDimensional.createClyinderLine();
        twoDimension.getArcJson();
        threeDimensional.drawRectangle();
        if(axisFlag){
            threeDimensional.createTextMesh();
        }
        threeDimensional.createShape();
    },
    createControls:function(){
        threeDimensional.controls = new THREE.OrbitControls( cameraT, rendererT.domElement );
        //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
        threeDimensional.controls.enableDamping = true;
        threeDimensional.controls.dampingFactor = 0.25;
        threeDimensional.controls.enableZoom = true;
    },
    int:function(){
        // threeDimensional.createGrid();
        // threeDimensional.createAxis();
        threeDimensional.repaintMesh();
    },
    onGesturechange:function(event){
        var result = $('#sides-slider-value4').val();
        var value = parseInt(result.split('|')[1]);

        if(event.originalEvent.scale < eventScale){//缩小
            if(value <=1){
                return;
            }
            getParameter.clear = --value;
        }
        if(event.originalEvent.scale > eventScale){//增大
            if(value >=9){
                return;
            }
            getParameter.clear = ++value;
        }
        clearEvent(value);
        eventScale = event.originalEvent.scale;

    },
    dynamicMove:function(){
        var arc = polygon.angle;
        polygon.angle =getParameter.angle = Math.PI/speed + arc;
        if(polygon.angle > 6.28){
            polygon.angle= 0;
            dynamic = 0;
            setTimeout(function(){
                sceneT.remove(threeDimensional.circlrBottom);
                $('.dynamic').removeClass('on');
            },100)
        }
        threeDimensional.rectangle[0].rotation.y =polygon.angle;
        //threeDimensional.lines[0].rotation.y =polygon.angle;

        twoDimension.getArcJson();
        if(axisFlag){
            threeDimensional.createTextMesh();
        }
        var angle =Math.floor(polygon.angle*180/Math.PI);
        changeRange(4,angle);
        threeDimensional.createShape();

    },
    createShape:function(angle){
        angle = -polygon.angle;
        sceneT.remove(threeDimensional.circlrBottom);
        var g = new THREE.CircleGeometry(polygon.radius,50,0,angle);
        var m = new THREE.MeshBasicMaterial({color:'#F39800',side:THREE.DoubleSide,opacity:1,transparent:false});
        threeDimensional.circlrBottom = new THREE.Mesh(g,m);
        threeDimensional.circlrBottom.rotation.x = Math.PI/2;
        sceneT.add(threeDimensional.circlrBottom);

    }
};
//三维图形绘画

var sceneT = new THREE.Scene();
var cameraT = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
cameraT.position.x = 600;
cameraT.position.y = 600;
cameraT.position.z = 600;
cameraT.lookAt(sceneT.position);
var rendererT =null;
if(canWebgl){
    rendererT = new THREE.WebGLRenderer({antialias:true});
}else{
    rendererT = new THREE.CanvasRenderer();
}
rendererT.setPixelRatio( window.devicePixelRatio );
rendererT.setClearColor(0xffffff);
rendererT.setSize(threeWidth,threeHeight);

threeDimensional.int();
threeDimensional.createControls();
var eventScale = 1;


$obj.append(rendererT.domElement);

//重置事件
function renderAll(){

    threeDimensional.controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true

    requestAnimationFrame(renderAll);
    rendererT.render(sceneT,cameraT);

    if(dynamic){
        threeDimensional.dynamicMove();
    }
}
renderAll();



$('#slider2').change(function(){
    if(dynamic){
        dynamic =false;
        $('.dynamic').removeClass('on');
    }
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;

    getParameter.radius = value;

    polygon.radius = getParameter.radius;
    getParameter.radius=parseInt(getParameter.radius);
    threeDimensional.repaintMesh();

});

$('#slider3').change(function(){
    if(dynamic){
        dynamic =false;
        $('.dynamic').removeClass('on');
    }
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;
    getParameter.height = value;

    polygon.height = getParameter.height;
    polygon.angleJson[1][2]=-parseInt(getParameter.height);
    getParameter.height = parseInt(getParameter.height);
    threeDimensional.repaintMesh();

});

$('#slider4').change(function(){
    if(dynamic){
        dynamic =false;
        $('.dynamic').removeClass('on');
    }
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;
    getParameter.angle = value*Math.PI/180;

    polygon.angle = getParameter.angle;
    threeDimensional.rectangle[0].rotation.y = polygon.angle;
    // threeDimensional.lines[0].rotation.y = polygon.angle;
    twoDimension.getArcJson();
    threeDimensional.createTextMesh();
    threeDimensional.createShape();

});


function changeRange(slider,num){
    var rate,value;

    if(slider == 1){
        rate = 410/150;
    }else if(slider == 2){
        rate = 410/200;
    }else if(slider == 3){
        rate = 410/300;
    }else{
        rate = 410/360;
    }

    value = rate*num;
    var obj = $('.s'+slider);
    obj.find('.sliderLeft').css({'width':value+'px'});
    obj.find('.xdsoft_range2dslider_runner').css({'left':value+'px'});
    obj.find('.xdsoft_slider_label').text(''+num);
    if(slider == 4){
        obj.find('.xdsoft_slider_label').text(''+num+'°');
    }

    $('#slider'+slider).attr('value',''+num+'|0');
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

    polygon = { //多边形参数
        angleJson : [],
        height:150,
        topradius:50,
        angle:0,
        radius:100,
        clear:5
    };
    getParameter ={ //显示和改变参数
        height:150,      //选择高度
        angle:0,   //选择边的数目
        topradius:50,
        radius:100,
        clear:5
    };

    twoDimension.getJson();

    dynamic = 0;
    threeDimensional.repaintMesh();


    changeRange(2,100);
    changeRange(3,150);
    changeRange(4,0);


    cameraT.position.x = 600;
    cameraT.position.y = 600;
    cameraT.position.z = 600;
    $('.dynamic').removeClass('on');
}
function dynamicEve(){
    if(dynamic){return;}
    if(polygon.angle > 0){
        polygon.angle = getParameter.angle = 0;
    }
    dynamic = true;

    if(dynamic){
        $('.dynamic').addClass('on');
    }else{
        $('.dynamic').removeClass('on');
    }
}



if(!isMob){
    $('#renew').on('click',renewEve);
    $('#scale').on('click',fullEve);
    $('.dynamic').on('click',dynamicEve);
}else{
    $('#renew').on('touchstart',renewEve);
    $('#scale').on('touchstart',fullEve);
    $('.dynamic').on('touchstart',dynamicEve);
}

