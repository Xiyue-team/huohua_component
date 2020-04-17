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


/****** 位置相关 ******/
var $obj = $('#threeContainer');
    threeHeight = $obj.height(),
    threeWidth = $obj.width();


//初始全局变量
var axisArrow = new THREE.Group();
var axis = new THREE.Group();
var obj=new THREE.Group();
var r=0;

function ThreeDimensional() {
    var thiz = this;

    /****** 判断是否支持WebGL ******/
    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();

    this.scene = new THREE.Scene();
    this.scene.position.set(-400,-300,0)
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
        this.createAxis();
        this.createObj();

    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
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
    function createText(vertices,font,size,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(font, textStyle);
        text.position.x=vertices[0].x
        text.position.y=vertices[0].y
        text.position.z=vertices[0].z
        return text;
    }
    function createTriangleFace(vertices,color){
        var material = new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:0.8});
        var geom = new THREE.Geometry();
        geom.faces.push(new THREE.Face3(0,1,2),new THREE.Face3(2,1,0));
        geom.vertices = vertices;
        var mesh = new THREE.SceneUtils.createMultiMaterialObject(geom,[material]);
        return mesh;
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

            vertices=[]
            vertices.push(new THREE.Vector3(dir.x,-5,0));
            var textx = createText(vertices,'x', 26,'#000000');
            axis.add(textx);
        }else{
            vertices = [];
            vertices.push(new THREE.Vector3(5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(-5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

            vertices=[]
            vertices.push(new THREE.Vector3(-15,dir.y+5,0));
            var texty = createText(vertices,'y', 26,'#000000');
            axis.add(texty);
        }
    }
     function labelAxis(startx, stepSizex, stopx, starty, stepSizey, stopy) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var text={};
        // label x axis:
        var textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for(var i = startx; i <= stopx; i = i+stepSizex) {
            if(i==0){continue;}
            text = new SpriteText2D(i/stepSizex, textStyle);
            text.position.x = i;
            text.position.y = -10;
            axis.add(text);

            var vertices = [];
            vertices.push(new THREE.Vector3(i,0,0));
            vertices.push(new THREE.Vector3(i,10,0));
            var line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }

        // label y axis:
        textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for( i = starty; i <= stopy; i = i+stepSizey) {
            if(i == 0){ continue;}
            text = new SpriteText2D(i/stepSizey, textStyle);
            text.position.x = -20;
            text.position.y = i+10;
            text.position.z = 0.2;
            axis.add(text);

            vertices = [];
            vertices.push(new THREE.Vector3(0,i,0));
            vertices.push(new THREE.Vector3(10,i,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        vertices=[];
        vertices.push(vec3(-12,-8,0))
        var text0=createText(vertices,'0',26,"#000000")
        axis.add(text0)
    }
    function createCircle(vertices,radius,color){
        var CircleG = new THREE.CircleGeometry(radius, 50, 0, 2 * Math.PI);
        var CircleM = new THREE.MeshBasicMaterial({color: color});
        var Circle = new THREE.Mesh(CircleG, CircleM);
        Circle.position.x = vertices[0].x; 
        Circle.position.y = vertices[0].y;
        Circle.position.z = vertices[0].z;
        return Circle;
    }
    /****** 其他事件 ******/
    this.createAxis = function(){
        labelAxis(0,90,720,0,90,540);
        drawAxisArrow(vec3( -50, 0, 0 ), vec3( 850, 0, 0 ),1);
        drawAxisArrow(vec3( 0, -50, 0 ), vec3( 0, 650, 0 ),2);
        this.scene.add(axisArrow,axis);
    };
    this.createObj=function(){
        if(obj!=null){
            this.scene.remove(obj);
        }
        obj = new THREE.Group();
        r_j=(1-Math.abs(r))*3
        if(r==-1){
            var vertices;
            for(var i=0;i<=80;i++){
                vertices=[];
                vertices.push(vec3(i/10*90,(i/10*-3/4+6)*90,1))
                var piont=createCircle(vertices,4,'#426BAE')
                obj.add(piont)
            }
        }else if(r>-1&&r<0){
            var vertices;
            for(var i=0;i<=80;i=i+2){
                vertices=[];
                y=i/10*-3/4+6+Math.random()*r_j;
                if(y>6){
                    y=6-Math.random()*r_j;
                }
                vertices.push(vec3(i/10*90,y*90,1))
                var piont=createCircle(vertices,4,'#426BAE')
                obj.add(piont)
            }
            for(var i=1;i<=80;i=i+2){
                vertices=[];
                y=i/10*-3/4+6-Math.random()*r_j
                if(y<0){
                    y=-y
                }
                vertices.push(vec3(i/10*90,y*90,1))
                var piont=createCircle(vertices,4,'#426BAE')
                obj.add(piont)
            }
        }else if(r==0){
            var vertices;
            for(var i=0;i<=80;i++){
                vertices=[];
                vertices.push(vec3(i/10*90,Math.random()*6*90,1))
                var piont=createCircle(vertices,4,'#426BAE')
                obj.add(piont)
            }
        }else if(r>0&&r<1){
            var vertices;
            for(var i=0;i<=80;i=i+2){
                vertices=[];
                y=i/10*3/4+Math.random()*r_j;
                if(y>6){
                    y=6-Math.random()*r_j;
                }
                vertices.push(vec3(i/10*90,y*90,1))
                var piont=createCircle(vertices,4,'#426BAE')
                obj.add(piont)
            }
            for(var i=1;i<=80;i=i+2){
                vertices=[];
                y=i/10*3/4-Math.random()*r_j
                if(y<0){
                    y=-y;
                }
                vertices.push(vec3(i/10*90,y*90,1))
                var piont=createCircle(vertices,4,'#426BAE')
                obj.add(piont)
            }
        }else{
            var vertices;
            for(var i=0;i<=80;i++){
                vertices=[];
                vertices.push(vec3(i/10*90,i/10*3/4*90,1))
                var piont=createCircle(vertices,4,'#426BAE')
                obj.add(piont)
            }
        }
        this.scene.add(obj)
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

//滑条
var timer = null;
$("#slider1").change(function(){
    var val=parseInt(this.value);
    r=val/100;
    clearTimeout(timer);
    timer = setTimeout(function(){
        if(r==-1){
            $('.turnShade').text('完全负相关')
        }else if(r>-1&&r<=-0.75){
            $('.turnShade').text('负相关：很强')
        }else if(r>-0.75&&r<=-0.3){
            $('.turnShade').text('负相关：一般')
        }else if(r>-0.3&&r<0){
            $('.turnShade').text('负相关：较弱')
        }else if(r==0){
            $('.turnShade').text('无线性相关')
        }else if(r>0&&r<0.3){
            $('.turnShade').text('正相关：较弱')
        }else if(r>=0.3&&r<0.75){
            $('.turnShade').text('正相关：一般')
        }else if(r>=0.75&&r<1){
            $('.turnShade').text('正相关：很强')
        }else{
            $('.turnShade').text('完全正相关')
        }
        three.createObj();
    },100)
    
});

var fullScreen=0;
function renew(){
	$('.slider1').find('.sliderLeft').css({'width':'205px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'205px'});
    $('.slider1').find('.xdsoft_slider_label').text('r = 0');
    $('.slider1').attr('value',''+0+'|0');
    r=0;
    $('.turnShade').text('无线性相关')
    $('.turnRight').parent().parent().removeClass('on').addClass('off');
    $('.turnRight').parent().parent().find('.span2').text('' +'off');
    three.camera.position.set(0,0,1500);
    three.createObj();
}
function clickEve1(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
    }
}
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
if(isMob){
	//on/off事件
	$('#div1').on('touchstart',clickEve1);
	//重置
	$("#renew").on('touchstart',renew);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	//on/off事件
	$('#div1').on('click',clickEve1);
	//重置
	$("#renew").on('click',renew);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}





