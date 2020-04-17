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


//初始全局变量
//控件取值结束
var axisFlag = false,bottomJson =[],timming=0,countTiming=0;



var polygon ={
    radius:100,
    height:150,
    opend:false
};
var getParameter={
    radius:100,
    height:150,
    opend:false
};


//三维图形开始
var threeDimensional ={
    lines : [],
    textMesh : [],
    axis : new THREE.Group(),
    grid:null,
    mesh:null,
    vertices:[],
    controlrs:null,
    top:null,
    bottom:null,
    rect:null,
    planeObj:[],
    getStartJson:function(){
        //获取底面的参数
        var array=[],x,y,n =72,sideLength = polygon.radius;
        bottomJson=[];
        for(var i=0;i<n;i++){
            x = sideLength * Math.sin((2*Math.PI/n)*i);
            y = sideLength * Math.cos((2*Math.PI/n)*i);
            array = [x,0,y];
            bottomJson.push(array);
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
        var len = threeDimensional.lines.length,i,height = polygon.height;
        if( len>0){
            for(i=0;i<len;i++){
                sceneT.remove(threeDimensional.lines[i]);
            }
        }
        threeDimensional.lines = [];
        var geometryLine1 = new THREE.Geometry(),
            geometryLine2 = new THREE.Geometry(),
            geometryLine3 = new THREE.Geometry(),
            geometryLine4 = new THREE.Geometry(),
            vertices1 =[], vertices2 =[], vertices3 =[],vertices4 =[],lineMesh=null,
            json1 = bottomJson;
        for(i=0;i<72;i++){
            vertices1.push(new THREE.Vector3(json1[i][0],0,json1[i][2]));
            vertices2.push(new THREE.Vector3(json1[i][0],height,json1[i][2]));
        }


        vertices1.push(new THREE.Vector3(json1[0][0],0,json1[0][2]));
        vertices2.push(new THREE.Vector3(json1[0][0],height,json1[0][2]));

        vertices3.push(new THREE.Vector3(0,height,0));
        vertices3.push(new THREE.Vector3(polygon.radius,height,0));

        vertices4.push(new THREE.Vector3(-polygon.radius,0,0));
        vertices4.push(new THREE.Vector3(-polygon.radius,height,0));

        geometryLine1.vertices = vertices1;
        geometryLine2.vertices = vertices2;
        geometryLine3.vertices = vertices3;
        geometryLine4.vertices = vertices4;

        lineMesh = new THREE.Line(geometryLine1, new THREE.LineBasicMaterial({color: '#F39800'}));
        sceneT.add(lineMesh);
        threeDimensional.lines.push(lineMesh);
        lineMesh = new THREE.Line(geometryLine2, new THREE.LineBasicMaterial({color: '#F39800'}));
        sceneT.add(lineMesh);
        threeDimensional.lines.push(lineMesh);

        geometryLine3.computeLineDistances();
        lineMesh = new THREE.LineSegments(geometryLine3, new THREE.LineDashedMaterial({ color: '#F39800',opacity:0.5, dashSize: 5, gapSize: 5 }));
        sceneT.add(lineMesh);
        threeDimensional.lines.push(lineMesh);

        geometryLine4.computeLineDistances();
        lineMesh = new THREE.LineSegments(geometryLine4, new THREE.LineDashedMaterial({ color: '#F39800',opacity:0.5, dashSize: 5, gapSize: 5 }));
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

        var height = polygon.height,radius = polygon.radius,
            SpriteText2D = THREE_Text.SpriteText2D,
            textAlign = THREE_Text.textAlign,
            textStyle = {align: textAlign.center, font: '48px Cambria Math', fillStyle: '#000', antialias: true};
        var v3 =[radius/2,height+20,0];
        var text = new SpriteText2D('r', textStyle);
        text.material.depthTest = false;
        text.position.set(v3[0], v3[1]+20, v3[2]);
        sceneT.add(text);
        threeDimensional.textMesh.push(text);

        v3 =[-radius-20,height/2,0];
        text = new SpriteText2D('h', textStyle);
        text.material.depthTest = false;
        text.position.set(v3[0], v3[1], v3[2]);
        sceneT.add(text);
        threeDimensional.textMesh.push(text);


    },
    createPlaneText:function(){
        if(threeDimensional.planeObj.length >0){
            for(var i=0;i<threeDimensional.planeObj.length;i++){
                sceneT.remove(threeDimensional.planeObj[i]);
            }
        }
        threeDimensional.planeObj =[];

        var height = polygon.height,radius = polygon.radius,
            SpriteText2D = THREE_Text.SpriteText2D,
            textAlign = THREE_Text.textAlign,l=2*Math.PI*radius,
            textStyle = {align: textAlign.center, font: '48px Cambria Math', fillStyle: '#000', antialias: true};

        var v3 =[radius/2,height+radius,10];
        var text = new SpriteText2D('r', textStyle);
        text.material.depthTest = false;
        text.position.set(v3[0], v3[1], v3[2]);
        sceneT.add(text);
        threeDimensional.textMesh.push(text);

        v3 =[-l/2-10,height/2,0];
        text = new SpriteText2D('h', textStyle);
        text.material.depthTest = false;
        text.position.set(v3[0], v3[1], v3[2]);
        sceneT.add(text);
        threeDimensional.textMesh.push(text);

        v3 =[0,height-10,10];
        text = new SpriteText2D('2πr', textStyle);
        text.material.depthTest = false;
        text.position.set(v3[0], v3[1], v3[2]+20);
        sceneT.add(text);
        threeDimensional.textMesh.push(text);

        var  geometryLine1 = new THREE.Geometry(),vertices1 =[],lineMesh=null;
        vertices1.push(new THREE.Vector3(0,height+radius,1));
        vertices1.push(new THREE.Vector3(radius,height+radius,1));
        geometryLine1.vertices = vertices1;
        geometryLine1.computeLineDistances();
        lineMesh = new THREE.LineSegments(geometryLine1, new THREE.LineDashedMaterial({ color: '#F39800',opacity:0.1, dashSize: 10, gapSize: 5 }));
        sceneT.add(lineMesh);
        threeDimensional.lines.push(lineMesh);

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
        for ( var i = 0; i <= 20; i ++ ) {
            geometry.vertices.push( threeDimensional.vec3( - 500, bottom, i * step - 500 ) );
            geometry.vertices.push( threeDimensional.vec3(   500, bottom, i * step - 500 ) );

            geometry.vertices.push( threeDimensional.vec3( i * step - 500, bottom, -500 ) );
            geometry.vertices.push( threeDimensional.vec3( i * step - 500, bottom,  500 ) );
        }
        threeDimensional.grid = new THREE.LineSegments( geometry, lineMaterial, THREE.LinePieces );
        sceneT.add( threeDimensional.grid );
        window.gridColor = 0x303030;
    },
    createAxis:function(){
        threeDimensional.axis = new THREE.Group();
        threeDimensional.labelAxis(50, 50, 550);
        threeDimensional.drawAxisArrow(threeDimensional.vec3( 0, 0, 0 ), threeDimensional.vec3( 600, 0, 0 ), 0xFF0000);
        threeDimensional.drawAxisArrow(threeDimensional.vec3( 0, 0, 0 ), threeDimensional.vec3( 0, 600, 0 ), 0x00FF00);
        threeDimensional.drawAxisArrow(threeDimensional.vec3( 0, 0, 0 ), threeDimensional.vec3( 0, 0, 600 ), 0x0000FF);
        sceneT.add( threeDimensional.axis);
    },
    repaintMesh:function(){
        threeDimensional.getStartJson();
        threeDimensional.createFaceMesh();
        threeDimensional.countSurfaceArea();
        threeDimensional.createTextMesh();
    },
    createFaceMesh:function(){
        //三维图形
        if(threeDimensional.mesh!=null){
            sceneT.remove(threeDimensional.mesh);
            threeDimensional.mesh=null;
        }
        var geoG = new THREE.CylinderGeometry(polygon.radius,polygon.radius,polygon.height,72,72);
        var geoM = new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.3,transparent:true});
        threeDimensional.mesh = new THREE.Mesh(geoG,geoM);
        threeDimensional.mesh.position.y = polygon.height/2;
        sceneT.add(threeDimensional.mesh);
        threeDimensional.createLine();
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
        threeDimensional.getStartJson();
        threeDimensional.createFaceMesh();
        threeDimensional.countSurfaceArea();
        threeDimensional.createTextMesh();
    },
    countSurfaceArea:function(){
        var r = polygon.radius/50,
            h = polygon.height/50,
            PI = Math.PI;
        var result = 2*PI*r*r +2*PI*r*h;
        $('.surfaceArea').html('<span>'+result.toFixed(2)+'</span>');

    },
    secondOpend:function(){
        if(countTiming >=100){
            clearTimeout(timming);
            countTiming =0;
            threeDimensional.createPlaneText();
            threeDimensional.rect.position.z = threeDimensional.bottom.position.z = threeDimensional.top.position.z =0;
            //$('#liquid-desc').removeClass('on');
            return;
        }
        if(threeDimensional.mesh != null){
            sceneT.remove(threeDimensional.mesh);
            threeDimensional.mesh = null;
            for(var i=0;i<threeDimensional.textMesh.length;i++){
                sceneT.remove(threeDimensional.textMesh[i]);
            }
            threeDimensional.textMesh = [];
            for(i=0;i<threeDimensional.lines.length;i++){
                sceneT.remove(threeDimensional.lines[i]);
            }
            threeDimensional.textMesh = [];
        }
        countTiming++;
        threeDimensional.opendRect();
        timming = setTimeout(function(){
            threeDimensional.secondOpend();
        },50)
    },
    changeOpend:function(){
        if(countTiming>=50){
            clearTimeout(timming);
            timming =0;
            threeDimensional.secondOpend();
            return;
        }
        countTiming++;
        threeDimensional.opendCircle();
        timming= setTimeout(function(){
            threeDimensional.changeOpend();
        },50);
    },
    createCircle:function(){
        var radius = polygon.radius,height = polygon.height;
        var circle1G = new THREE.CircleGeometry(radius,40);
        var circle1M = new THREE.MeshBasicMaterial({color:'#F39800',side:THREE.DoubleSide});
        threeDimensional.bottom = new THREE.Mesh(circle1G,circle1M);
        threeDimensional.bottom.position.set(0,0,0);
        threeDimensional.bottom.rotation.x = -Math.PI/2 ;
        sceneT.add(threeDimensional.bottom);

        var circle2G = new THREE.CircleGeometry(radius,40);
        var circle2M = new THREE.MeshBasicMaterial({color:'#F39800',side:THREE.DoubleSide});
        threeDimensional.top = new THREE.Mesh(circle2G,circle2M);
        threeDimensional.top.position.set(0,height,0);
        threeDimensional.top.rotation.x = -Math.PI/2 ;
        sceneT.add(threeDimensional.top);

    },
    opendCircle:function(){
        var height = polygon.height,radius = polygon.radius;
        var arc = countTiming*Math.PI/100,x,y,z;
        x =0;y=-Math.sin(arc)*radius;z=-radius + Math.cos(arc)*radius;
        threeDimensional.bottom.rotation.x = -Math.PI/2 +arc;
        threeDimensional.bottom.position.set(x,y,z);

        threeDimensional.top.rotation.x = -Math.PI/2 -arc;
        threeDimensional.top.position.set(x,height-y,z);
    },
    opendRect:function() {
        if (threeDimensional.rect != null) {
            sceneT.remove(threeDimensional.rect);
            threeDimensional.rect = null;
        }
        var r = polygon.radius, l = 2 * Math.PI * r, step = l / 100, rectJson = [], i, h = polygon.height;
        var nowStep = (countTiming - 50) * step;
        rectJson.push([nowStep, 0, -r]);
        rectJson.push([nowStep, h, -r]);
        rectJson.push([-nowStep, h, -r]);
        rectJson.push([-nowStep, 0, -r]);


        var shape = new THREE.Shape();
        shape.moveTo(rectJson[0][0], rectJson[0][1]);
        for (i = 1; i < 4; i++) {
            shape.lineTo(rectJson[i][0], rectJson[i][1]);
        }
        var shapeM = new THREE.MeshBasicMaterial({color: '#F39800', side: THREE.DoubleSide});
        var shapeRect = new THREE.ShapeGeometry(shape);

        threeDimensional.rect = THREE.SceneUtils.createMultiMaterialObject(shapeRect, [shapeM]);
        threeDimensional.rect.position.z = -r;
        sceneT.add(threeDimensional.rect);

    }
};

//三维图形绘画
// var widthT = $('#WebGL-output-big').width();
// var heightT = window.innerHeight;
// $('.three').height(heightT);
var sceneT = new THREE.Scene();
sceneT.position.y=-150;
var cameraT = new THREE.PerspectiveCamera(55, threeWidth / threeHeight, 1, 10000);
cameraT.position.x = 0;
cameraT.position.y = 600;
cameraT.position.z = 1200;
cameraT.lookAt(sceneT.position);
// sceneT.add(cameraT);

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



//重置事件
function renderAll(){
    threeDimensional.controls.update();


    requestAnimationFrame(renderAll);
    rendererT.render(sceneT,cameraT);
}
renderAll();
var s = 4;
$('#slider1').change(function(){
    if(getParameter.opend){
        clearTimeout(timming);
        sceneT.remove(threeDimensional.top);
        sceneT.remove(threeDimensional.bottom);
        sceneT.remove(threeDimensional.rect);
        getParameter.opend =false;
        countTiming = 0;
    }
    $('#liquid-desc').removeClass('on');
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;
    getParameter.radius = value*50;
    polygon.radius = getParameter.radius;
    threeDimensional.repaintMesh();
    calculate();
});
$('#slider3').change(function(){
    if(getParameter.opend){
        clearTimeout(timming);
        sceneT.remove(threeDimensional.top);
        sceneT.remove(threeDimensional.bottom);
        sceneT.remove(threeDimensional.rect);
        getParameter.opend =false;
        countTiming=0;
    }
    $('#liquid-desc').removeClass('on');
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;

    getParameter.height = value*50;
    polygon.height = getParameter.height;
    threeDimensional.repaintMesh();
    calculate();
});

//表面积计算
function calculate(){
    var r = polygon.radius/50,
        h = polygon.height/50,
        PI = Math.PI;
    var result = 2*PI*r*r +2*PI*r*h;
    $('#surarea-num').text(''+result.toFixed(2)+'');
}
//on/off事件
/*function clickEve1(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
        $(this).parent().parent().siblings().find('.span2').text('' +'off');
    }
}*/



//重置
function resetPart(){
    $('.slider1').find('.sliderLeft').css({'width':'45px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'45px'});
    $('.slider1').find('.xdsoft_slider_label').text('2');
    $('#slider1').attr('value',''+2+'|0');

    $('.slider3').find('.sliderLeft').css({'width':'91px'});
    $('.slider3').find('.xdsoft_range2dslider_runner').css({'left':'91px'});
    $('.slider3').find('.xdsoft_slider_label').text('3');
    $('#slider3').attr('value',''+3+'|0');
    calculate()

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

    if(getParameter.opend){
        clearTimeout(timming);
        sceneT.remove(threeDimensional.top);
        sceneT.remove(threeDimensional.bottom);
        getParameter.opend =false;
        countTiming=0;
    }

    sceneT.remove(threeDimensional.top);
    sceneT.remove(threeDimensional.bottom);

    polygon ={
        radius:100,
        height:150,
        opend:false
    };
    getParameter={
        radius:100,
        height:150,
        opend:false
    };

    resetPart();


    if(threeDimensional.rect != undefined){
        sceneT.remove(threeDimensional.rect);
        sceneT.remove(threeDimensional.top);
        sceneT.remove(threeDimensional.bottom);

        for(var i=0;i<threeDimensional.planeObj;i++){
            sceneT.remove(threeDimensional.planeObj[i]);
        }

        threeDimensional.rect = null;
        threeDimensional.top = null;
        threeDimensional.bottom = null;
        threeDimensional.planeObj = [];

    }

    $('.turn1').removeClass('on').addClass('off');
    $('.span2').text('off');


    threeDimensional.repaintMesh();

    cameraT.position.x = 0;
    cameraT.position.y = 600;
    cameraT.position.z = 1200;

    $('#liquid-desc').removeClass('on');
}
function dynamicEve(e){
    if(getParameter.opend){
        return;
    }
    e.preventDefault();
    if(countTiming){ return; }
    getParameter.opend = true;
    threeDimensional.createCircle();
    threeDimensional.changeOpend();
    $('#liquid-desc').addClass('on');
}



if(!isMob){
    $('#renew').on('click',renewEve);
    $('#scale').on('click',fullEve);
    $('#liquid-desc').on('click',dynamicEve);
    /*$('#div1').on('click',clickEve1);*/
}else{
    $('#renew').on('touchstart',renewEve);
    $('#scale').on('touchstart',fullEve);
    $('#liquid-desc').on('touchstart',dynamicEve);
    /*$('#div1').on('touchstart',clickEve1);*/
}



