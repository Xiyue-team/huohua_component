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
var axisArrow = new THREE.Group();
var axis = new THREE.Group();

var polygon = { //多边形参数
    sides:4,
    angleJson : [],
    height:200, //高度
    radiusBtm:Math.sqrt(2)*50,
    angle:0,
    clear:5
};
var getParameter ={ //显示和改变参数
    sides:4,
    angleJson : [],
    height:200,      //高度
    radiusBtm:Math.sqrt(2)*50,
    angle:0,
    clear:5
};

var eventScale = 1;
var t,a,h,v;
var dynamic = false;
var state = false;
var axis = false;

var threeDimension={
    axis:new THREE.Object3D(),
    lines:[],
    init:function(){
        threeDimension.labelAxis(50,50,550);
        threeDimension.createAxis();
        threeDimension.getJson(4);
        threeDimension.createFaceMesh();
    },
    getJson:function(n,sideLength){
        if(!sideLength){ sideLength=Math.sqrt(2)*50; }
        var array=[],x,y;
        polygon.angleJson = [];
        polygon.angleJson.push([0,getParameter.height,0]);
        for(var i=0;i<n;i++){
            x = Math.round(sideLength * Math.sin((2*Math.PI/n)*i));
            y = Math.round(sideLength * Math.cos((2*Math.PI/n)*i));
            array = [x,0,y];
            polygon.angleJson.push(array);
        }
        var arc = getParameter.angle*(Math.PI/180 );
        var height = getParameter.height;
        for(i=1;i<(n+1);i++){
            x = polygon.angleJson[i][0]+height*Math.tan(arc);
            y = polygon.angleJson[i][2];
            array=[x,getParameter.height,y];
            polygon.angleJson.push(array);
        }
    },

    labelAxis:function (start, stepSize, stop) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={};
        // label x axis:
        textStyle = {align: textAlign.center, font: '12px Cambria Math', fillStyle: 'red', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/50, textStyle);
            text.rotation = camera.rotation;
            text.position.x = i;
            text.position.y = -5;
            threeDimension.axis.add(text);
        }
        text = new SpriteText2D('x', textStyle);
        text.rotation = camera.rotation;
        text.position.x = stop+30;
        text.position.y = -5;
        threeDimension.axis.add(text);
        // label z axis:
        textStyle = {align: textAlign.center, font: '12px Cambria Math', fillStyle: '#00F', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/50, textStyle);
            text.position.z = i;
            text.position.x = -0.2;
            text.position.y = -5;
            threeDimension.axis.add(text);
        }
        text = new SpriteText2D('z', textStyle);
        text.position.z = stop+30;
        text.position.x = -0.2;
        text.position.y = -5;
        threeDimension.axis.add(text);
        // label y axis:
        textStyle = {align: textAlign.center, font: '12px Cambria Math', fillStyle: '#00FF00', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/50, textStyle);
            text.rotation = camera.rotation;
            text.position.x = 5;
            text.position.y = i;
            text.position.z = 0.2;
            threeDimension.axis.add(text);
        }
        text = new SpriteText2D('y', textStyle);
        text.position.x = 5;
        text.position.y = stop+30;
        text.position.z = 0.2;
        threeDimension.axis.add(text);
    },
    createAxis:function(){
        var geom1 = new THREE.Geometry();
        var geom2 = new THREE.Geometry();
        var geom3 = new THREE.Geometry();
        geom1.vertices.push(threeDimension.vec3(0,0,0),threeDimension.vec3(550,0,0));
        geom2.vertices.push(threeDimension.vec3(0,0,0),threeDimension.vec3(0,550,0));
        geom3.vertices.push(threeDimension.vec3(0,0,0),threeDimension.vec3(0,0,550));
        var material1 = new THREE.LineBasicMaterial({color:0xff0000});
        var material2 = new THREE.LineBasicMaterial({color:0x00ff00});
        var material3 = new THREE.LineBasicMaterial({color:0x0000ff});
        var line1 = new THREE.Line(geom1,material1);
        var line2 = new THREE.Line(geom2,material2);
        var line3 = new THREE.Line(geom3,material3);
        threeDimension.axis.add(line1,line2,line3);
    },
    vec3:function(x,y,z){
        return new THREE.Vector3(x,y,z);
    },
    createGrid:function(){
        if(threeDimension.grid){
            scene.remove(threeDimension.grid);
        }
        var geometry = new THREE.Geometry();
        var lineMaterial = new THREE.LineBasicMaterial({color : 0x949494, transparent: true, opacity: 0.5});
        var size = 500, bottom = -0.001, step = 50;
        for(var i = 0; i< 21; i ++){
            geometry.vertices.push(threeDimension.vec3(-size, bottom, i*step-size));
            geometry.vertices.push(threeDimension.vec3(size, bottom, i*step-size));
            geometry.vertices.push(threeDimension.vec3(i*step-size, bottom, -size));
            geometry.vertices.push(threeDimension.vec3(i*step-size, bottom, size));
        }
        threeDimension.grid = new THREE.LineSegments(geometry, lineMaterial);
        scene.add(threeDimension.grid);
    },
    createControls:function(){
        threeDimension.controls = new THREE.OrbitControls( camera, renderer.domElement );
        threeDimension.controls.enableDamping = true;
        threeDimension.controls.dampingFactor = 0.25;
        threeDimension.controls.enableZoom = true;
    },
    createLine:function(){//三维边线
        if(threeDimension.lines.length>0){
            for(i=0;i<threeDimension.lines.length;i++){
                scene.remove(threeDimension.lines[i]);
            }
        }
        var geometryLine1 = new THREE.Geometry();
        var geometryLine2 = new THREE.Geometry();
        var geometryLine3 = new THREE.Geometry();
        var vertices1 =[];
        var vertices2 =[];
        var vertices3 =[];
        var lineMesh=null;
        var json1=polygon.angleJson;
        var num = polygon.sides;
        if(num>=36){
            for(var i=1;i<num+1;i++){
                vertices1.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
                vertices2.push(new THREE.Vector3(json1[i+num][0],json1[i+num][1],json1[i+num][2]));
            }
        }else{
            for(i=1;i<num+1;i++){
                vertices1.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
                vertices2.push(new THREE.Vector3(json1[i+num][0],json1[i+num][1],json1[i+num][2]));

                vertices3.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
                vertices3.push(new THREE.Vector3(json1[i+num][0],json1[i+num][1],json1[i+num][2]));

                geometryLine3.vertices = vertices3;
                lineMesh = new THREE.LineSegments(geometryLine3, new THREE.LineBasicMaterial({color: '#F39800'}));
                scene.add(lineMesh);
                threeDimension.lines.push(lineMesh);
            }
        }
        vertices1.push(new THREE.Vector3(json1[1][0],json1[1][1],json1[1][2]));
        vertices2.push(new THREE.Vector3(json1[num+1][0],json1[num+1][1],json1[num+1][2]));
        geometryLine1.vertices = vertices1;
        geometryLine2.vertices = vertices2;
        lineMesh = new THREE.Line(geometryLine1, new THREE.LineBasicMaterial({color: '#F39800'}));
        scene.add(lineMesh);
        threeDimension.lines.push(lineMesh);
        lineMesh = new THREE.Line(geometryLine2, new THREE.LineBasicMaterial({color: '#F39800'}));
        scene.add(lineMesh);
        threeDimension.lines.push(lineMesh);
        for(var i=0;i<threeDimension.lines.length;i++){
            threeDimension.lines[i].position.y = -polygon.height/2;
        }
       return threeDimension.lines;
    },
    createPrismVertices:function (){ //创建点
        threeDimension.vertices = [];
        var num = polygon.sides*2+1;
        var json1 = polygon.angleJson;
        for(var i=0;i<num;i++){
            threeDimension.vertices.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
        }
    },
    createPrismFaces:function(){ //创建面
        var faces = [];
        var num = polygon.sides;
        for(var i=1;i<num;i++){
            faces.push(new THREE.Face3(i, i+1, i+num));
            faces.push(new THREE.Face3(i+num, i+1, i));
            faces.push(new THREE.Face3(i+1, i+num, i+num+1));
            faces.push(new THREE.Face3( i+num+1, i+num,i+1));
        }
        faces.push(new THREE.Face3(1, 1+num, num));
        faces.push(new THREE.Face3(num,1+num, 1));
        faces.push(new THREE.Face3(1+num, num, num*2));
        faces.push(new THREE.Face3(num*2, num, 1+num));

        //底面
        for(i=0;i<num-2;i++){
            faces.push( new THREE.Face3(1,i+3,i+2));
            faces.push( new THREE.Face3(i+num+2,i+num+3,num+1));
        }
        return faces;
    },
    createFaceMesh:function(){//三维图形
        threeDimension.getJson(polygon.sides,getParameter.radiusBtm);
        //if(threeDimension.mesh){
            scene.remove(threeDimension.mesh);
        // }
        threeDimension.createPrismVertices();
        var faces = threeDimension.createPrismFaces();
        var geom = new THREE.Geometry();
        geom.vertices = threeDimension.vertices;
        geom.faces = faces;
        geom.computeFaceNormals();
        var materials = [
            new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.3,transparent:true})
        ];
        threeDimension.mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials);
        threeDimension.mesh.position.y = -polygon.height/2;
        scene.add(threeDimension.mesh);
        threeDimension.createLine();
    },
    createFaceMeshFill:function(){
        // if(threeDimension.mesh1){
            scene.remove(threeDimension.mesh1);
        // }
        threeDimension.createPrismVertices();
        var faces = threeDimension.createPrismFaces();
        var geom = new THREE.Geometry();
        geom.vertices = threeDimension.vertices;
        geom.faces = faces;
        geom.computeFaceNormals();
        var materials = [
            new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.3,transparent:true})
        ];
        threeDimension.mesh1 = THREE.SceneUtils.createMultiMaterialObject(geom, materials);
        threeDimension.mesh1.position.y -= polygon.height/2;
        scene.add(threeDimension.mesh1);
    }
};

//创建3D场景
var renderer = null;
if(canWebgl){
    renderer = new THREE.WebGLRenderer({antialias:true});
}else{
    renderer = new THREE.CanvasRenderer();
}
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor(0xffffff);
renderer.setSize(threeWidth,threeWidth);
$obj.append(renderer.domElement);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(65, threeWidth/threeWidth, 0.1, 10000);
camera.position.set(0, 300, 500);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);
threeDimension.init();
threeDimension.createControls();


//重置事件
function renderAll(){
    threeDimension.controls.update();

    requestAnimationFrame(renderAll);
    renderer.render(scene,camera);
}
renderAll();
var s = 4;

$('#slider1').change(function(){
    if(dynamic || state){
        isChanging();
    }
    $('.dynamic').removeClass('on');
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;
    switch (value){
        case 1:realV=3;break;
        case 2:realV=4;break;
        case 3:realV=5;break;
        case 4:realV=6;break;
        case 5:realV=10;break;
        case 6:realV=36;break;
    }
    getParameter.sides = parseInt(realV);
    polygon.sides = getParameter.sides;
    threeDimension.getJson(polygon.sides,polygon.angleJson[1][2]);
    threeDimension.createLine();
    threeDimension.createFaceMesh();
    $('.formula-right').text('0');
});

$('#slider2').change(function(){
    if(dynamic || state){
        isChanging();
    }
    $('.dynamic').removeClass('on');
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]);
    s = parseInt(value);
    getParameter.radiusBtm = 2*value/(polygon.sides*Math.sin(Math.PI*2/polygon.sides))*50;
    //volumeChanged();
    polygon.radiusBtm = getParameter.radiusBtm;
    threeDimension.getJson(polygon.sides,getParameter.radiusBtm);
    threeDimension.createLine();
    threeDimension.createFaceMesh();
    $('.formula-right').text('0');
});

$('#slider3').change(function(){
    if(dynamic || state){
        isChanging();
    }

    $('.dynamic').removeClass('on');
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]);
    getParameter.height = value*50;
    polygon.height = getParameter.height;
    for(var i=1; i<polygon.sides+1; i++){
        polygon.angleJson[polygon.sides+i][1] = getParameter.height;
    }
    threeDimension.createLine();
    threeDimension.createFaceMesh();
    $('.formula-right').text('0');

});

$('#slider4').change(function(){
    if(dynamic || state){
        isChanging();
    }
    $('.dynamic').removeClass('on');
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]);
    value = value<2?2:value;
    getParameter.angle = 90-value;
    polygon.angle = getParameter.angle;
    threeDimension.createLine();
    threeDimension.createFaceMesh();
    $('.formula-right').text('0');
});


function volumeChanged(){
    var v = s*getParameter.height/50;
    $('.formula-right').html(v.toFixed(2));
}

function isChanging(){
    dynamic = false;
    state = false;
    clearInterval(a);
    if(threeDimension.mesh1){
        scene.remove(threeDimension.mesh1);
    }
    threeDimension.getJson(polygon.sides,getParameter.radiusBtm);
    threeDimension.createFaceMesh();
}

//on/off事件
function clickEve1(){
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
    $('.slider1').find('.sliderLeft').css({'width':'82px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'82px'});
    $('.slider1').find('.xdsoft_slider_label').text('4');
    $('#slider1').attr('value',''+4+'|0');

    $('.slider2').find('.sliderLeft').css({'width':'65px'});
    $('.slider2').find('.xdsoft_range2dslider_runner').css({'left':'65px'});
    $('.slider2').find('.xdsoft_slider_label').text('4');
    $('#slider2').attr('value',''+4+'|0');

    $('.slider3').find('.sliderLeft').css({'width':'136px'});
    $('.slider3').find('.xdsoft_range2dslider_runner').css({'left':'136px'});
    $('.slider3').find('.xdsoft_slider_label').text('4');
    $('#slider3').attr('value',''+4+'|0');


    $('.slider4').find('.sliderLeft').css({'width':'409px'});
    $('.slider4').find('.xdsoft_range2dslider_runner').css({'left':'409px'});
    $('.slider4').find('.xdsoft_slider_label').text('90°');
    $('#slider4').attr('value',''+90+'|0');
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

    if(dynamic){
        return;
    }
    polygon = {
        sides:4,
        angleJson : [],
        height:200, //高度
        radiusBtm:Math.sqrt(2)*50,
        angle:0,
        clear:5
    };
    getParameter ={ //显示和改变参数
        sides:4,
        angleJson : [],
        height:200, //高度
        radiusBtm:Math.sqrt(2)*50,
        angle:0,
        clear:5
    };
    resetPart();
    if(threeDimension.mesh1){
        scene.remove(threeDimension.mesh1);
    }
    dynamic = false;
    state = false;
    threeDimension.init();
    camera.position.set(0, 300, 500);
    $('.turn1').removeClass('on').addClass('off');
    $('.span2').text('' +'off');
    $('.formula-right').text('0');
    $('.dynamic').removeClass('on')


}
function dynamicEve(){

    if(state){
        return;
    }
    dynamic = !dynamic;
    state = !state;
    t = 0;
    clearInterval(a);
    $('.dynamic').addClass('on');
    if(threeDimension.mesh){
        scene.remove(threeDimension.mesh);
    }
    var arc = getParameter.angle*(Math.PI/180 );
    $('.formula-right').text('0');
    function fill(){
        if(!dynamic){
            clearInterval(a);
            volumeChanged();
            return
        }
        if(t>getParameter.height-2){
            clearInterval(a);
            getParameter.liquid = v.toFixed(2);
            dynamic = !dynamic;
            volumeChanged();
            return
        }
        t += 2;
        for(var i=polygon.sides+1;i<(2*polygon.sides+1);i++){
            polygon.angleJson[i][0] = polygon.angleJson[i-polygon.sides][0]+t*Math.tan(arc);
            polygon.angleJson[i][1] = t;
            polygon.angleJson[i][2] = polygon.angleJson[i-polygon.sides][2];
        }
        threeDimension.createFaceMeshFill();

        h = (t-2)/50;
        v = s*h;
        $('.formula-right').html(v.toFixed(2));

    }
    a = setInterval(fill,20);

}



if(!isMob){
    $('#renew').on('click',renewEve);
    $('#scale').on('click',fullEve);
    $('#liquid-desc').on('click',dynamicEve);
    $('#div1').on('click',clickEve1);
}else{
    $('#renew').on('touchstart',renewEve);
    $('#scale').on('touchstart',fullEve);
    $('#liquid-desc').on('touchstart',dynamicEve);
    $('#div1').on('touchstart',clickEve1);
}



