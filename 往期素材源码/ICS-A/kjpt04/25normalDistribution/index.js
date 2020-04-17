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
var isMob = /iPad|Android/g.test(navigator.userAgent);
if(!(bodyWidth == 370 && bodyHeight == 246)){
    var $body = $("body");
    // if(isMob){
        var bodyScale = scale = bodyWidth/1920;
        $('.body').css("zoom",bodyScale).height(1200);
        var marginTop = ($body.width()/bodyWidth*bodyHeight-1200)/2;
        $('.body').css("margin-top",'-600px');
        $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale + (bodyHeight-1200*scale)/2 ),bottom:(69*scale + (bodyHeight-1200*scale)/2 )});
        $(".threeControl").css({"zoom":bodyScale/0.7,"right":30*bodyScale,"bottom":30*bodyScale});
        $(".box").css({"zoom":bodyScale});
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

//表格居中
function setTableCenter(){
    var $box = $(".box");
    var tableWidth = $box.width();
    var threeconWidth = $threeCon.width();
    var tableLeft = (threeconWidth - tableWidth)/2;
    if(isMob && bodyWidth<1920){
        tableLeft = (threeconWidth/scale - tableWidth)/2;
    }
    $box.css("left",tableLeft);
}
setTableCenter();



/****** 位置相关 ******/
var $obj = $('#threeContainer'),
    threeHeight = $obj.height(),
    threeWidth = $obj.width();


/****** 全局变量 ******/
var axisArrow = new THREE.Group();
var axis = new THREE.Group();
var vertices_normal = [];

function ThreeDimensional() {

    /****** 判断是否支持WebGL ******/
    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();

    this.scene = new THREE.Scene();
    this.scene.position.set(0,-180,0);
    this.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
    this.renderer = null;
    if(canWebgl){
        this.renderer = new THREE.WebGLRenderer({antialias:true});
    }else{
        this.renderer = new THREE.CanvasRenderer();
    }
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.controls = null;

    /****** 分割线 ******/
    this.int = function () {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 1500;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);
        this.createControls();

        var light = new THREE.SpotLight('#CEF5F0',1,0,Math.PI );
        light.position.x = 10;
        light.position.y = 300;
        light.position.z = 1500;
        this.scene.add(light);
        var light = new THREE.SpotLight('#F0D1F5',0.8);
        light.position.x = 10;
        light.position.y = -1500;
        light.position.z = 600;
        this.scene.add(light);
        var light = new THREE.DirectionalLight('#E5F5D1');
        light.position.x = 10;
        light.position.y = 900;
        light.position.z = 600;
        this.scene.add(light);

        this.createAxis();
        this.createNormal();

    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = false;
        this.controls.enableRotate =false;
        this.controls.enablePan =false;
    };

    /****** 事件函数 ******/
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
    function vec3(x,y,z){
        return new THREE.Vector3(x, y, z);
    }
    function text(font,size,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(font, textStyle);
        return text;
    }
    function drawAxisArrow(origin, dir,style){
        var vertices = [];
        vertices.push(new THREE.Vector3(origin.x,origin.y,origin.z));
        vertices.push(new THREE.Vector3(dir.x,dir.y,dir.z));
        var line = createLineMesh(vertices,'#000',3);
        axisArrow.add(line);

        if(style == 1){
            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,-5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);
        }else{
            vertices = [];
            vertices.push(new THREE.Vector3(dir.x+5,dir.y-20,0));
            vertices.push(new THREE.Vector3(dir.x,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-5,dir.y-20,0));
            vertices.push(new THREE.Vector3(dir.x,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);
        }
    }
     function labelAxis(startx, stepSizex, stopx, starty, stepSizey, stopy) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var text={};
        // label x axis:
        var textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for(var i = startx; i <= stopx; i = i+stepSizex) {
            var a = null;
            if(i==0){
                a = "μ";
            }else{
                if(i<0){
                    if(i/stepSizex == -1){
                        a = "μ - " + "σ";
                    }else{
                        a = "μ " + i/stepSizex + "σ";
                    }
                }else{
                    if(i/stepSizex == 1){
                        a = "μ + " + "σ";
                    }else{
                        a = "μ + " + i/stepSizex + "σ";
                    }
                }
            }
            text = new SpriteText2D(a, textStyle);
            text.position.x = i;
            text.position.y = -10;
            axis.add(text);

            var vertices = [];
            vertices.push(new THREE.Vector3(i,0,0));
            vertices.push(new THREE.Vector3(i,10,0));
            var line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        // text = new SpriteText2D('x', textStyle);
        // text.position.x = stop+100;
        // text.position.y = -15;
        // axis.add(text);

        // label y axis:
         if(stepSizey != 0){
             textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
             for( i = starty; i <= stopy; i = i+stepSizey) {
                 if(i == 0){ continue;}
                 text = new SpriteText2D(i/stepSizey/2, textStyle);
                 text.position.x = -20;
                 text.position.y = i;
                 text.position.z = 0.2;
                 axis.add(text);

                 vertices = [];
                 vertices.push(new THREE.Vector3(0,i,0));
                 vertices.push(new THREE.Vector3(-10,i,0));
                 line = createLineMesh(vertices,'#000',3);
                 axis.add(line);
             }
             // text = new SpriteText2D('y', textStyle);
             // text.position.x = -15;
             // text.position.y = stop+100;
             // text.position.z = 0.2;
             // axis.add(text);
         }

    }

    /****** 其他事件 ******/
    this.createAxis = function(){
        labelAxis(-390,130,390,0,0,0);
        drawAxisArrow(vec3( -600, 0, 0 ), vec3( 600, 0, 0 ),1);
        drawAxisArrow(vec3( -600, 0, 0 ), vec3( -600, 600, 0 ),2);
        this.scene.add(axisArrow,axis);
    };
    this.createNormal = function(){
        var vertices1 = [], x=0, y=0;
        for(var i=0;i<40;i++){
            x = i*0.1;
            y = 1/(Math.pow(2*Math.PI,1/2))*Math.pow(Math.E,-Math.pow(((x)/2),2));
            vertices1.push(vec3(x*130,y*1000,0));
        }
        var vertices2 = [];
        for(i=0;i<vertices1.length;i++){
            vertices2.push(vec3(-vertices1[i].x,vertices1[i].y,0));
        }
        vertices2.reverse();
        vertices_normal = vertices2.concat(vertices1);
        var line1 = createLineMesh(vertices_normal,0x6095DA,3);

        var vertices3 = [];
        vertices3.push(vec3(vertices1[0].x,vertices1[0].y,0),vec3(vertices1[0].x,0,0));
        var line2 = createLineMesh(vertices3,0x6095DA,2);

        this.scene.add(line1,line2);
    };
    this.dynamicLine = function(x){
        this.scene.remove(this.lines);
        this.lines = new THREE.Object3D();
        var vertices1 = [],
            vertices2 = [];
        var y = 1/(Math.pow(2*Math.PI,1/2))*Math.pow(Math.E,-Math.pow(((x)/2),2))*1000;
        vertices1.push(vec3(x*130,y,0), vec3(x*130,0,0));
        vertices2.push(vec3(-x*130,y,0), vec3(-x*130,0,0));
        var line1 = createLineMesh(vertices1,0x6095DA,2);
        var line2 = createLineMesh(vertices2,0x6095DA,2);
        

        var material1 = new THREE.MeshBasicMaterial({color:0x4D77E2});
        var cirGeo1 = new THREE.CircleGeometry(8,20,20);
        var material2 = new THREE.MeshBasicMaterial({color:0xFFFFFF});
        var cirGeo2= new THREE.CircleGeometry(6,20,20);

        var cir1 = new THREE.Mesh(cirGeo1,material1);
        cir1.position.set(x*130,y,3);
        var cir2 = new THREE.Mesh(cirGeo2,material2);
        cir2.position.set(x*130,y,3);
        var cir3 = new THREE.Mesh(cirGeo1,material1);
        cir3.position.set(x*130,0,3);
        var cir4 = new THREE.Mesh(cirGeo2,material2);
        cir4.position.set(x*130,0,3);
        var cir5 = new THREE.Mesh(cirGeo1,material1);
        cir5.position.set(-x*130,y,3);
        var cir6 = new THREE.Mesh(cirGeo2,material2);
        cir6.position.set(-x*130,y,3);
        var cir7 = new THREE.Mesh(cirGeo1,material1);
        cir7.position.set(-x*130,0,3);
        var cir8 = new THREE.Mesh(cirGeo2,material2);
        cir8.position.set(-x*130,0,3);
        
        this.lines.add(line1,line2,cir1,cir2,cir3,cir4,cir5,cir6,cir7,cir8);

        var x1 = -x*130;
        this.createShadow(x1);

        this.scene.add(this.lines);
    };
    this.createShadow = function(x){
        this.scene.remove(this.mesh);
        for(var i=0;i<vertices_normal.length;i++){
            if(parseInt(vertices_normal[i].x) == x){
                break;
            }
        }
        var n = vertices_normal.length/2 - i;
        var vertices = [];
        for(var j=0;j<2*n;j++){
            vertices.push(vertices_normal[i+j]);
        }
        vertices.push(vec3(-x,0,0),vec3(x,0,0),vertices_normal[i]);
        var shape = new THREE.Shape();
        shape.moveTo(vertices[0].x,vertices[0].y);
        for(j=1;j<vertices.length;j++){
            shape.lineTo(vertices[j].x,vertices[j].y);
        }
        var shapeGeo = new THREE.ShapeGeometry(shape);
        var material = new THREE.MeshPhongMaterial({color:0x5858FA});
        this.mesh = new THREE.Mesh(shapeGeo,material);
        this.mesh.position.z = -1;
        this.scene.add(this.mesh);
    };
}

var three = new ThreeDimensional();
three.int();

renderAll();
function renderAll(){
    three.controls.update();
    requestAnimationFrame(renderAll);
    three.renderer.render(three.scene,three.camera);
}

//滑动条事件
var $box = $(".box");
$("#slider1").change(function(){
    var val = parseInt($(this).val());
    var result = parseFloat((val/10).toFixed(1));
    $box.find("tr").css("color","#000");
    switch(val/10){
        case 1:$box.find("tr").eq(1).css("color","#f00");
            break;
        case 2:$box.find("tr").eq(2).css("color","#f00");
            break;
        case 3:
            $box.find("tr").eq(3).css("color","#f00");
            break;
    }
    $box.find("tr").eq(0).css("color",'#fff')
    three.dynamicLine(result);
});


function clickEve1(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
    }
}
function renew(){
    $('#slider1').attr('value','0|0');
    $('.slider1 .sliderLeft').css('width','0');
    $('.slider1 .xdsoft_range2dslider_runner ').css('left','0');
    $("#div1").parent().parent().removeClass("on").addClass('off').find(".span2").text(" "+"off");
    $box.find("tr").css("color","#000");
    $box.find("tr").eq(0).css("color",'#fff')
    three.scene.remove(three.lines,three.mesh);
}
var fullScreen=0;
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
        setTableCenter();
    }else{
        fullScreen = 1;
        $('#scale img').attr('src','images/icon/back.png');
        $obj.css({'left':0,'top':0,'right':0,'bottom':0,'border-radius':'0'});
        $('canvas').css({'position':'absolute','left':(bodyWidth-threeWidth)/2,'top':(bodyHeight-threeHeight)/2});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','hidden');
        setTableCenter();
    }
}
if(isMob){
	//on/off事件
	$('#div1').on('touchstart',clickEve1);
	//重置事件
	$("#renew").on('touchstart',renew);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	//on/off事件
	$('#div1').on('click',clickEve1);
	//重置事件
	$("#renew").on('click',renew);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}





