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

//多边形参数
var polygon = {
    sides:4,
    angleJson : [],
    angleJson2 : [],
    height:150,
    height1:0,
    radiusBtm:100,
    radiusTop:50,
    clear:5
};

//显示和改变参数
var getParameter ={
    sides:4,
    angleJson : [],
    angleJson2 : [],
    height:150,
    height1:0,
    radiusBtm:100,
    radiusTop:50,
    clear:5
};


var shape=null;
var eventScale = 1;
var dynamic = false;
var state = false;
var axis = false;
var a=null, v=null, r=null;
var s1 = 8, s2 = 2,flag=0;

var maxRadius = Math.round(Math.sqrt(20*2/(polygon.sides*Math.sin(2*Math.PI/polygon.sides)))*50);
var minRadius = Math.round(Math.sqrt(2/(polygon.sides*Math.sin(2*Math.PI/polygon.sides)))*50);



var twoDimension = {
    spheres:[],
    lines:[],
    init:function(){
        shape = twoDimension.createMesh(new THREE.ShapeGeometry(twoDimension.drawShape()));
        twoDimension.scene.add(shape);
    },
    getJson:function(n,radiusBtm,radiusTop){
        var array=[],x,y;
        polygon.angleJson.push([0,polygon.height1,0]);

        //下底面
        for(var i=0;i<n;i++){
            x = Math.round(radiusBtm * Math.sin((2*Math.PI/n)*i));
            y = Math.round(radiusBtm * Math.cos((2*Math.PI/n)*i));
            array = [x,0,y];
            polygon.angleJson.push(array);
        }
        //上底面
        for(i=0;i<n;i++){
            x = Math.round(radiusTop * Math.sin((2*Math.PI/n)*i));
            y = Math.round(radiusTop * Math.cos((2*Math.PI/n)*i));
            array = [x,getParameter.height,y];
            polygon.angleJson.push(array);
        }
    },
    getJson2:function(n){
        var array=[],x,y;
        polygon.angleJson2 = [];
        polygon.angleJson2.push([0,300,0]);
        for(var i=1;i<n+1;i++){
            x = polygon.angleJson[i][0];
            y = polygon.angleJson[i][2];
            array = [x,0,y];
            polygon.angleJson2.push(array);
        }
        for(i=1;i<n+1;i++){
            x = 0;
            y = 0;
            array=[x,0,y];
            polygon.angleJson2.push(array);
        }
    }
};

twoDimension.getJson(polygon.sides,polygon.radiusBtm,polygon.radiusTop);

var threeDimension = {
    vertices:[],
    axis:new THREE.Object3D(),
    grid:null,
    lines:[],
    init:function(){
        threeDimension.createThreeScene();
        threeDimension.createControls();
        threeDimension.createFaceMesh();
        threeDimension.createGrid();
        threeDimension.labelAxis(50,50,500);
        threeDimension.createAxis();
        threeDimension.scene.remove(threeDimension.grid);
        threeDimension.grid = null;
    },
    createThreeScene:function(){
        threeDimension.scene = new THREE.Scene();
        threeDimension.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
        threeDimension.camera.position.x = 800;
        threeDimension.camera.position.y = 800;
        threeDimension.camera.position.z = 800;
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
    labelAxis:function (start, stepSize, stop) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        // label x axis:
        var textStyle = {align: textAlign.center, font: '10px Arial', fillStyle: 'red', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            var text = new SpriteText2D(i/50, textStyle);
            text.rotation = threeDimension.camera.rotation;
            text.position.x = i;
            text.position.y = -5;
            threeDimension.axis.add(text);
        }
        text = new SpriteText2D('x', textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.x = stop+30;
        text.position.y = -5;
        threeDimension.axis.add(text);

        // label z axis:
        textStyle = {align: textAlign.center, font: '10px Arial', fillStyle: '#00F', antialias: true};
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
        textStyle = {align: textAlign.center, font: '10px Arial', fillStyle: '#00FF00', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/50, textStyle);
            text.rotation = threeDimension.camera.rotation;
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
        return new THREE.Vector3(x, y, z);
    },
    createGrid:function (){
        if(threeDimension.grid){
            threeDimension.scene.remove(threeDimension.grid);
        }
        var geometry = new THREE.Geometry();
        var size=500, bottom = - 0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( {color : 0x949494, transparent: true, opacity: 0.5} );
        for(var i = 0;i < 21;i ++){
            geometry.vertices.push( threeDimension.vec3( - size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, size ) );
        }
        threeDimension.grid = new THREE.Line( geometry, lineMaterial,1 );
        threeDimension.scene.add(threeDimension.grid);
    },
    createControls:function(){
        threeDimension.controls = new THREE.OrbitControls( threeDimension.camera, threeDimension.renderer.domElement );
        threeDimension.controls.enableDamping = true;
        threeDimension.controls.dampingFactor = 0.25;
        threeDimension.controls.enableZoom = true;
    },
    createLine:function(){//三维边线
        threeDimension.lines = [];
        var geometryLine1 = new THREE.Geometry();
        var geometryLine2 = new THREE.Geometry();
        var geometryLine3 = new THREE.Geometry();
        var vertices1 =[];
        var vertices2 =[];
        var vertices3 =[];
        var lineMesh=null;
        var json1=[];
        var num = polygon.sides;
        json1=polygon.angleJson;
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
                lineMesh = new THREE.LineSegments(geometryLine3, new THREE.LineBasicMaterial({color: '#F39800',side:THREE.DoubleSide}));
                threeDimension.scene.add(lineMesh);
                threeDimension.lines.push(lineMesh);
            }
        }
        vertices1.push(new THREE.Vector3(json1[1][0],json1[1][1],json1[1][2]));
        vertices2.push(new THREE.Vector3(json1[num+1][0],json1[num+1][1],json1[num+1][2]));
        geometryLine1.vertices = vertices1;
        geometryLine2.vertices = vertices2;
        lineMesh = new THREE.Line(geometryLine1, new THREE.LineBasicMaterial({color: '#F39800',side:THREE.DoubleSide}));
        threeDimension.scene.add(lineMesh);
        threeDimension.lines.push(lineMesh);
        lineMesh = new THREE.Line(geometryLine2, new THREE.LineBasicMaterial({color: '#F39800',side:THREE.DoubleSide}));
        threeDimension.scene.add(lineMesh);
        threeDimension.lines.push(lineMesh);
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
        if(threeDimension.mesh){
            threeDimension.scene.remove(threeDimension.mesh);
        }
        if(threeDimension.lines.length>0){
            for(var i=0;i<threeDimension.lines.length;i++){
                threeDimension.scene.remove(threeDimension.lines[i]);
            }
        }
        threeDimension.createPrismVertices();
        var faces = threeDimension.createPrismFaces();
        var geom = new THREE.Geometry();
        geom.vertices = threeDimension.vertices;
        geom.faces = faces;
        var materials = [
            new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.3,transparent:true})
        ];
        threeDimension.mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials);
        threeDimension.scene.add(threeDimension.mesh);
        threeDimension.createLine();
    },
    createPrismVerticesFill:function (){ //创建点
        threeDimension.vertices2 = [];
        var num = polygon.sides*2+1;
        var json2 = polygon.angleJson2;
        for(var i=0;i<num;i++){
            threeDimension.vertices2.push(new THREE.Vector3(json2[i][0],json2[i][1],json2[i][2]));
        }
    },
    createPrismFacesFill:function(){ //创建面
        var faces2 = [];
        var num = polygon.sides;
        for(var i=1;i<num;i++){
            faces2.push(new THREE.Face3(i, i+1, i+num));
            faces2.push(new THREE.Face3(i+num, i+1, i));
            faces2.push(new THREE.Face3(i+1, i+num, i+num+1));
            faces2.push(new THREE.Face3( i+num+1, i+num,i+1));
        }

        faces2.push(new THREE.Face3(1, 1+num, num));
        faces2.push(new THREE.Face3(num,1+num, 1));
        faces2.push(new THREE.Face3(1+num, num, num*2));
        faces2.push(new THREE.Face3(num*2, num, 1+num));

        //底面
        for(i=0;i<num-2;i++){
            faces2.push( new THREE.Face3(1,i+3,i+2));
            faces2.push( new THREE.Face3(i+num+2,i+num+3,num+1));
        }
        return faces2;
    },
    createFaceMeshFill:function(){//三维图形
        if(threeDimension.mesh2){
            threeDimension.scene.remove(threeDimension.mesh2);
        }
        threeDimension.createPrismVerticesFill();
        var faces2 = threeDimension.createPrismFacesFill();
        var geom = new THREE.Geometry();
        geom.vertices = threeDimension.vertices2;
        geom.faces = faces2;
        var materials = [
            new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.3,transparent:true})
        ];
        threeDimension.mesh2 = THREE.SceneUtils.createMultiMaterialObject(geom, materials);
        threeDimension.scene.add(threeDimension.mesh2);
    },
    repaintMesh:function(){
        threeDimension.scene.remove(threeDimension.mesh);
        for(var i=0;i<threeDimension.lines.length;i++){
            threeDimension.scene.remove(threeDimension.lines[i]);
        }
        threeDimension.lines=[];
        threeDimension.createFaceMesh();
    }

};

threeDimension.init();
threeDimension.createControls();


//重置事件
function renderAll(){
    threeDimension.controls.update();

    requestAnimationFrame(renderAll);
    threeDimension.renderer.render(threeDimension.scene,threeDimension.camera);
}
renderAll();
var s = 4;

$('#slider1').change(function(){
    if(dynamic || state){
        isChanging();
        $('.dynamic').removeClass('on');

    }
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


    if(getParameter.sides >= 36){
        maxRadius = Math.round(Math.sqrt(20/Math.PI)*100);
        minRadius = Math.round(Math.sqrt(1/Math.PI)*100);
    }else{
        maxRadius = Math.round(Math.sqrt(20*2/(realV*Math.sin(2*Math.PI/realV)))*50);
        minRadius = Math.round(Math.sqrt(2/(realV*Math.sin(2*Math.PI/realV)))*50);
    }
    polygon.sides = getParameter.sides;
    polygon.angleJson = [];

    twoDimension.getJson(polygon.sides,polygon.radiusBtm,polygon.radiusTop);
    threeDimension.repaintMesh();
    $('.formula-right').text('0');

});

$('#slider2').change(function(){
    if(dynamic || state){
        isChanging();
        $('.dynamic').removeClass('on');

    }
    var result = $(this).val();
    var split = result.split(';');
    var value = parseInt(split[0].split('|')[0]),realV;
    var value2 = parseInt(split[1].split('|')[0]);

    s1 = value;
    s2 = value2;
    if(s1 > s2){
	    s1 = s2;
	    flag = true;
	    var left = parseInt($('.slider1 .xdsoft_range2dslider_runner1').css('left'));
	    left-=21*(s1-s2);
	    $('.slider1 .xdsoft_range2dslider_runner0').css('left',left+'px');
	    $(this).range2DSlider({
	        template:'horizontal',
	        value:[[s1,0],[s2,0]],
	        width:420,
	        showLegend:false,
	        round:true,
	        axis:[[1,20]]
	    });
	}

    var r1 = Math.sqrt(2*s1/(polygon.sides*Math.sin(2*Math.PI/polygon.sides)))*50;
    var r2 = Math.sqrt(2*s2/(polygon.sides*Math.sin(2*Math.PI/polygon.sides)))*50;
    getParameter.radiusBtm = r2;
    getParameter.radiusTop = r1;

    if(getParameter.radiusBtm > getParameter.radiusTop){
        polygon.radiusBtm = getParameter.radiusBtm;
        polygon.radiusTop = getParameter.radiusTop;

        polygon.angleJson = [];
        twoDimension.getJson(polygon.sides,polygon.radiusBtm,polygon.radiusTop);
        setTimeout(function(){
            threeDimension.repaintMesh();
        },50);
    }else{
        getParameter.radiusTop = getParameter.radiusBtm;
        polygon.radiusBtm = getParameter.radiusBtm;
        polygon.radiusTop = getParameter.radiusTop;

        var left = parseInt($('.slider2 .xdsoft_range2dslider_runner1').css('left'));
        left-=21*(s2-s1);
        $('.slider2 .xdsoft_range2dslider_runner0').css('left',left+'px');
        $(this).range2DSlider({
            template:'horizontal',
            value:[[s2,0],[s1,0]],
            width:420,
            showLegend:false,
            round:true,
            axis:[[1,20]]
        });

        polygon.angleJson = [];
        twoDimension.getJson(polygon.sides,polygon.radiusBtm,polygon.radiusTop);
        setTimeout(function(){
            threeDimension.repaintMesh();
        },50);

    }
    $('.formula-right').text('0');
});



$('#slider4').change(function(){
    if(dynamic || state){
        isChanging();
        $('.dynamic').removeClass('on');

    }
    $('.dynamic').removeClass('on');
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]);
    getParameter.height = value*50;

    polygon.height = getParameter.height;
    polygon.angleJson = [];
    twoDimension.getJson(polygon.sides,polygon.radiusBtm,polygon.radiusTop);

    threeDimension.repaintMesh();
    $('.formula-right').text('0');

});



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




function compute(){
    s1 = 1/2*polygon.sides*Math.pow(getParameter.radiusBtm/50,2)*Math.sin(Math.PI*2/polygon.sides);
    s2 = 1/2*polygon.sides*Math.pow(getParameter.radiusTop/50,2)*Math.sin(Math.PI*2/polygon.sides);
    v = 1/3*(s1+s2+Math.sqrt(s1*s2))*getParameter.height/50;
    $('.formula-right').html(v.toFixed(2));
    polygon.liquid = v.toFixed(2);
}
function isChanging(){
    dynamic = false;
    state = false;
    clearInterval(a);

    if(threeDimension.mesh2){
        threeDimension.scene.remove(threeDimension.mesh2);
    }
    threeDimension.createFaceMesh();
}
function changeRange(slider,num){
    var rate,value;

    if(slider == 2){
        rate = 410/20;
    }else if(slider == 3){
        rate = 410/20;
    }else if(slider == 4){
        rate = 410/10;
    }

    value = rate*num;
    var obj = $('.slider'+slider);
    obj.find('.sliderLeft').css({'width':value+'px'});
    obj.find('.xdsoft_range2dslider_runner').css({'left':value+'px'});
    obj.find('.xdsoft_slider_label').text(''+num);
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
    if(dynamic){
        isChanging();
    }
    polygon = {
        sides:4,
        angleJson : [],
        angleJson2 : [],
        height:150,
        height1:0,
        radiusBtm:100,
        radiusTop:50,
        clear:5
    };
    getParameter ={
        sides:4,
        angleJson : [],
        angleJson2 : [],
        height:150,
        height1:0,
        radiusBtm:100,
        radiusTop:50,
        clear:5
    };


    twoDimension.getJson(polygon.sides,polygon.radiusBtm,polygon.radiusTop);
    if(threeDimension.mesh2){
        threeDimension.scene.remove(threeDimension.mesh2);
    }
    threeDimension.createFaceMesh();
    dynamic = false;
    state = false;


    $('.formula-right').text('0');

    changeRange(4,3);

    $('.slider1').find('.sliderLeft').css({'width':'82px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'82px'});
    $('.slider1').find('.xdsoft_slider_label').text(''+4);
    $('#slider1').attr('value',''+4+'|0');

    $('.turn1').removeClass('on').addClass('off');
    $('.turn1').find('.span2').text('off');

    $('.dynamic').removeClass('on');

    threeDimension.camera.position.x = 800;
    threeDimension.camera.position.y = 800;
    threeDimension.camera.position.z = 800;

    $('#slider2').range2DSlider({
        template:'horizontal',
        value:[[2,0],[8,0]],
        width:410,
        showLegend:false,
        round:true,
        axis:[[1,20]]
    });
}
function dynamicEve(){
    if(state){
        return;
    }
    dynamic = !dynamic;
    state = !state;

    clearInterval(a);
    if(threeDimension.mesh){
        threeDimension.scene.remove(threeDimension.mesh);
    }
    if(threeDimension.mesh2){
        threeDimension.scene.remove(threeDimension.mesh2);
    }
    twoDimension.getJson2(polygon.sides);
    getParameter.height1 = 0;
    var b = getParameter.radiusBtm - getParameter.radiusTop;
    var c = b/getParameter.height;
    $('.dynamic').addClass('on');


    function fill(){
        if(getParameter.height1>getParameter.height-2 || !dynamic){
            clearInterval(a);
            dynamic = false;
            polygon.liquid = v.toFixed(2);
            return;
        }
        getParameter.height1 += 2;
        r = getParameter.radiusBtm - getParameter.height1*c;
        var num = polygon.sides;
        for(var i=1;i<num+1;i++){
            polygon.angleJson2[i+num][0] = Math.round(r * Math.sin((2*Math.PI/num)*(i-1)));
            polygon.angleJson2[i+num][1] = getParameter.height1;
            polygon.angleJson2[i+num][2] = Math.round(r * Math.cos((2*Math.PI/num)*(i-1)));
        }
        threeDimension.createFaceMeshFill();
        v = 1/3*(s1+s2+Math.sqrt(s1*s2))*(getParameter.height1-2)/50;

        $('.formula-right').text(v.toFixed(2));
    }
    a = setInterval(fill,30);
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




