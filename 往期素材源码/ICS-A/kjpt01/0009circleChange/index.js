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
var bodyHeight = $(window).height(),timg;
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
var $p = $('.formula-control p');



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


//控件取值结束
var axisFlag = false;
var oldResult = 1;
var totolJson =[],countTime=0,timing=0,oldshape=1,radiuschange=0,shapechange=1,radiochange=1;




var polygon = { //多边形参数
    height:100, //棱锥高度
    clear:5,
    shape:1,
    radius:100
};
var getParameter ={ //显示和改变参数
    height:100, //选择高度
    shape:1,
    clear:5,
    radius:100
};
var threeDimensional ={
    prismJson:[],
    lines : [],
    textMesh : [],
    axis : new THREE.Group(),
    grid:null,
    mesh:null,
    vertices:[],
    controlrs:null,
    extend:[],
    getJson:function(sideLength){
        totolJson=[];
        if(!sideLength){ sideLength =100;}
        var array=[],x,y,n =72;
        for(var i=0;i<72;i++){
            x = sideLength * Math.sin((2*Math.PI/n)*i);
            y = sideLength * Math.cos((2*Math.PI/n)*i);
            array = [x,0,y];
            totolJson.push(array);
        }
    },
    labelAxis:function (start, stepSize, stop) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={};
        // label x axis:
        textStyle = {align: textAlign.center, font: '10px Cambria Math', fillStyle: 'red', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i, textStyle);
            text.rotation = cameraT.rotation;
            text.position.x = i;
            text.position.y = -5;
            threeDimensional.axis.add(text);
        }
        text = new SpriteText2D('x', textStyle);
        text.rotation = cameraT.rotation;
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
            text.rotation = cameraT.rotation;
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
    createLine:function(){//三维边线
        if( threeDimensional.lines.length){
            for(var i=0;i< threeDimensional.lines.length;i++){
                sceneT.remove(threeDimensional.lines[i]);
            }

        }
        threeDimensional.lines = [];

        var num= 72,
            json1 = totolJson,
            geometryLine1 = new THREE.Geometry(),
            geometryLine2 = new THREE.Geometry(),
            vertices1 =[],
            vertices2=[],
            lineMesh = null,
            shape = polygon.shape,
            height = polygon.height,
            radio = 1/2;

        if(countTime){
            shape = shapechange;
            radio=radiochange;
        }

        if(shape == 1){
            for(i=0;i<num;i++){
                vertices1.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
            }
        }else if(shape == 2){
            for(i=0;i<num;i++){
                vertices1.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
            }
            for(i=0;i<num;i++){
                vertices2.push(new THREE.Vector3(json1[i][0]*radio,Math.round(height),json1[i][2]*radio));
            }
            vertices2.push(new THREE.Vector3(json1[0][0]*radio,Math.round(height),json1[0][2]*radio));
            geometryLine2.vertices = vertices2;
            geometryLine2.computeLineDistances();
            lineMesh = new THREE.Line(geometryLine2,new THREE.LineBasicMaterial( {color: '#F39800'} ) /*new THREE.LineDashedMaterial({color: '#507a93',linewidth:20,dashSize:100,gapSize:100})*/);
            sceneT.add(lineMesh);
            threeDimensional.lines.push(lineMesh);

        }else{
            for(i=0;i<num;i++){
                vertices1.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
            }
            for(i=0;i<num;i++){
                vertices2.push(new THREE.Vector3(json1[i][0],height,json1[i][2]));
            }
            vertices2.push(new THREE.Vector3(json1[0][0],height,json1[0][2]));
            geometryLine2.vertices = vertices2;
            geometryLine2.computeLineDistances();
            lineMesh = new THREE.Line(geometryLine2,new THREE.LineBasicMaterial( {color: '#F39800'} ) /*new THREE.LineDashedMaterial({color: '#507a93',linewidth:20,dashSize:100,gapSize:100})*/);
            sceneT.add(lineMesh);
            threeDimensional.lines.push(lineMesh);
        }

        vertices1.push(new THREE.Vector3(json1[0][0],json1[0][1],json1[0][2]));
        geometryLine1.vertices = vertices1;
        geometryLine1.computeLineDistances();
        lineMesh = new THREE.Line(geometryLine1,new THREE.LineBasicMaterial( {color: '#F39800'} ) /*new THREE.LineDashedMaterial({color: '#507a93',linewidth:20,dashSize:100,gapSize:100})*/);
        sceneT.add(lineMesh);
        threeDimensional.lines.push(lineMesh);
    },
    createTextMesh:function(){
        if(threeDimensional.textMesh.length){
            for(var i=0;i<threeDimensional.textMesh.length;i++){
                sceneT.remove(threeDimensional.textMesh[i]);
            }
        }
        threeDimensional.textMesh=[];

        if(polygon.shape === 3 || polygon.shape === 2 ||!axisFlag){
            return;
        }
        var v3 = [0,polygon.height,0],x,y;
        var textAlign = THREE_Text.textAlign;
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textStyle = {align: textAlign.center, font: '10px Cambria Math', fillStyle: '#000', antialias: true};
        var text = new SpriteText2D(v3[0] + ","  + v3[1]+","  + v3[2], textStyle);
        if(v3[1]>0){
            text.position.set((v3[0]+5), (v3[1]+25), (v3[2]+5));
        }else{
            if(v3[0] < 0){ x= v3[0]-20;}else{ x= v3[0]+20}
            if(v3[2] < 0){ y= v3[2]-20;}else{ y= v3[2]+20}
            text.position.set(x, v3[1], y);
        }
        sceneT.add(text);
        threeDimensional.textMesh.push(text);
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
    repaintMesh:function(){
        threeDimensional.getJson(getParameter.radius);
        if(threeDimensional.mesh){
            sceneT.remove(threeDimensional.mesh);
        }
        threeDimensional.createFaceMesh();
        threeDimensional.createLine();
    },
    createFaceMesh:function(){//三维图形
        var geomM,geomG;
        var radius1 =0 ,radius2=polygon.radius,height=polygon.height;


        if(!countTime){
            if(polygon.shape == 1){
                radius1 = 0;

            }else if(polygon.shape == 2){
                radius1 = Math.round(polygon.radius/2);
            }else{
                radius1 = polygon.radius;
            }
        }else{
            radius1 = radiuschange;
        }

        geomG = new THREE.CylinderGeometry(radius1,radius2,height,72,72);
        geomM = new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.2,transparent:true,side:THREE.DoubleSide});
        threeDimensional.mesh = new THREE.Mesh(geomG,geomM);
        threeDimensional.mesh.position.y = height/2;
        sceneT.add(threeDimensional.mesh);
        threeDimensional.createLine();
        threeDimensional.createTextMesh();
    },
    createControls:function(){
        threeDimensional.controls = new THREE.OrbitControls( cameraT, rendererT.domElement );
        //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
        threeDimensional.controls.enableDamping = true;
        threeDimensional.controls.dampingFactor = 0.25;
        threeDimensional.controls.enableZoom = true;
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
    int:function(){
        // threeDimensional.createGrid();
        // threeDimensional.createAxis();
        threeDimensional.getJson(polygon.radius);
        threeDimensional.createFaceMesh();
    },
    dynamicCreate:function(){
        if(countTime>=50){
            clearTimeout(timing);
            timing=0;
            setTimeout(function(){
                countTime=0;
                oldshape = polygon.shape;
            },100);
            return;
        }
        countTime = countTime+5;
        timing = setTimeout(function(){
            if(threeDimensional.mesh!=undefined){
                sceneT.remove(threeDimensional.mesh);
                threeDimensional.mesh=null;
            }
            var radius2 = polygon.radius;
            if(oldshape == 1 && polygon.shape == 2){
                radiuschange = countTime*radius2/100;
                shapechange = 2;
                radiochange = radiuschange/radius2;
            }else if(oldshape == 1 && polygon.shape == 3){
                radiuschange = countTime*radius2/50;
                shapechange = 2;
                radiochange = radiuschange/radius2;
            }else if(oldshape == 2 && polygon.shape == 1){

                radiuschange = radius2/2-countTime*radius2/100;
                shapechange = 2;
                radiochange = radiuschange/radius2;

            }else if(oldshape == 2 && polygon.shape == 3){

                radiuschange = radius2/2+countTime*radius2/100;
                shapechange = 2;
                radiochange = radiuschange/radius2;

            }else if(oldshape == 3 && polygon.shape == 1){

                radiuschange = (50-countTime)*radius2/50;
                shapechange = 2;
                radiochange = radiuschange/radius2;

            }else if(oldshape == 3 && polygon.shape == 2){

                radiuschange = (50-countTime)*radius2/100+radius2/2;
                shapechange = 2;
                radiochange = radiuschange/radius2;

            }
            threeDimensional.repaintMesh();
            threeDimensional.dynamicCreate();
        },50);


    }
};

var sceneT = new THREE.Scene();
var cameraT = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
cameraT.position.x = 600;
cameraT.position.y = 600;
cameraT.position.z = 600;
cameraT.lookAt(sceneT.position);
sceneT.add(cameraT);
var canWebgl=(function(){
    try {
        var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
    } catch ( e ) {
        return false;
    }
})();
var rendererT = null;
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

renderAll();


//重置事件
function renderAll(){
    threeDimensional.controls.update();

    requestAnimationFrame(renderAll);
    rendererT.render(sceneT,cameraT);
}
renderAll();




$('#slider1').change(function(){
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;

    getParameter.radius = parseInt(value);
    polygon.radius = getParameter.radius;
    threeDimensional.repaintMesh();

});

$('#slider2').change(function(){
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;

    getParameter.height = parseInt(value);
    polygon.height = getParameter.height;
    threeDimensional.repaintMesh();

});

$('#slider3').change(function(){
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;

    getParameter.shape = polygon.shape = value;
    threeDimensional.dynamicCreate();
    $p.removeClass('red').eq(value-1).addClass('red');

});

//on/off事件
function clickEve1(){
    if($(this).parent().parent().parent().hasClass('turnBox1')){
        var dataId = parseInt($(this).attr('data-id'));
        getParameter.shape = polygon.shape = dataId;
        threeDimensional.dynamicCreate();
        $p.removeClass('red').eq(dataId-1).addClass('red');
    }

    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
        $(this).parent().parent().siblings().find('.span2').text('' +'off');
    }
}


//重置
function resetPart(){
    $('.slider1').find('.sliderLeft').css({'width':'205px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'205px'});
    $('.slider1').find('.xdsoft_slider_label').text('100');
    $('#slider1').attr('value',''+100+'|0');

    $('.s3').find('.sliderLeft').css({'width':'0px'});
    $('.s3').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
    $('.s3').find('.xdsoft_slider_label').text('圆锥');
    $('#slider3').attr('value',''+1+'|0');
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

    getParameter ={ //显示和改变参数
        height:100, //棱锥高度
        clear:5,
        shape:1,
        radius:100
    };
    polygon = { //多边形参数
        height:100, //选择高度
        shape:1,
        clear:5,
        radius:100
    };
    oldshape =1;

    resetPart();
    threeDimensional.getJson();
    threeDimensional.repaintMesh();


    cameraT.position.x = 600;
    cameraT.position.y = 600;
    cameraT.position.z = 600;
}


if(!isMob){
    $('#renew').on('click',renewEve);
    $('#scale').on('click',fullEve);
    $('.turnRight').on('click',clickEve1);
}else{
    $('#renew').on('touchstart',renewEve);
    $('#scale').on('touchstart',fullEve);
    $('.turnRight').on('touchstart',clickEve1);
}

