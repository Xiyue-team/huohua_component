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
var obj = new THREE.Group();
var value2=5,value1=4,radioSelect;

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
            if(i==0){
                continue;
            }
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
        labelAxis(-500,50,500,-500,50,500);
        drawAxisArrow(vec3( -550, 0, 0 ), vec3( 550, 0, 0 ),1);
        drawAxisArrow(vec3( 0, -550, 0 ), vec3( 0, 550, 0 ),2);
        this.scene.add(axisArrow,axis);
    };
    this.createObj=function(){
        if(obj!=null){
            this.scene.remove(obj);
        }
        obj = new THREE.Group();
        var vertices;
        var a=value2;
        var b=value1;
        var c=Math.sqrt(Math.pow(value2,2)-Math.pow(value1,2)).toFixed(1)
        if(a!=b){
            //F1,A
            vertices=[];
            vertices.push(vec3(-c*50,0,1))
            var F1=createCircle(vertices,10,'#f55b23')

            vertices=[];
            vertices.push(vec3(-c*50,45,1))
            var text1=createText(vertices,'F1',24,'#000')

            vertices=[];
            vertices.push(vec3(-a*50-25,35,1))
            var textA=createText(vertices,'A',24,'#000')
            //F2,B
            vertices=[];
            vertices.push(vec3(c*50,0,1))
            var F2=createCircle(vertices,10,'#f55b23')

            vertices=[];
            vertices.push(vec3(c*50,45,1))
            var text2=createText(vertices,'F2',24,'#000')

            vertices=[];
            vertices.push(vec3(a*50+25,35,1))
            var textB=createText(vertices,'B',24,'#000')
            //M
            vertices=[];
            if(radioSelect==2){
                vertices.push(vec3(-20,b*50+35,1))
            }else{
                vertices.push(vec3(20,b*50+25,1))
            }
            var M=createText(vertices,'M',24,'#000')
            obj.add(F1,F2,text1,text2,textA,textB,M)
        }else{
            vertices=[];
            vertices.push(vec3(0,0,1))
            var O=createCircle(vertices,10,'#f55b23')
            vertices=[];
            vertices.push(vec3(25,35,1))
            var textO=createText(vertices,'O',24,'#000')
            obj.add(O,textO)
        }
        vertices=[];
        for(var i=-a;i<=a+0.01;i=i+0.01){
            vertices.push(vec3(i*50,Math.sqrt(Math.pow(b,2)*(1-Math.pow(i/a,2)))*50,1))
        }
        var line1=createLineMesh(vertices,'#426BAE',3)
        vertices=[];
        for(var i=-a;i<=a+0.01;i=i+0.01){
            vertices.push(vec3(i*50,-Math.sqrt(Math.pow(b,2)*(1-Math.pow(i/a,2)))*50,1))
        }
        var line2=createLineMesh(vertices,'#426BAE',3)

        vertices=[];
        vertices.push(vec3(-10,-5,1));
        var textO=createText(vertices,'O',24,'#000')

        obj.add(textO,line1,line2)
        if(radioSelect==2){
            obj.rotateZ(-Math.PI/2)    
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
$("#slider1").change(function(){
    var val = $(this).val().split(";");
    value2 = parseInt(val[1]);
    value1=parseInt(val[0]);
    if(value1>=value2){
        var l=parseInt($('.xdsoft_range2dslider_runner0').css('left'));
        l-=42*(value1-value2);
        $('.xdsoft_range2dslider_runner0').css('left',l+'px');
        value1-=value1-value2; 
    }
    $(this).range2DSlider({
        template:'horizontal',
        value:[[value1,0],[value2,0]],
        width:420,
        showLegend:false,
        round:true,
        axis:[[1,10]],
        printLabel:function(val){
            return parseInt(val[0]);
        }
    });
    three.createObj();
})
var fullScreen=0;
function renew(){
	$('#slider1').range2DSlider({
        template:'horizontal',
        value:[[4,0],[5,0]],
        width:420,
        showLegend:false,
        round:true,
        axis:[[1,10]],
        printLabel:function(val){
            return parseInt(val[0]);
        }
    });
    $('.radiocircle').removeClass('select');
    $('.radios1 .radiocircle').addClass('select');
    value2=5;value1=4;
    radioSelect=1;
    three.camera.position.set(0,0,1500);
    three.createObj();
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
function radioChoose(){
    $('.radios').find('.radiocircle').removeClass('select');
    $(this).find('.radiocircle').addClass('select');
    radioSelect = parseInt($(this).attr('data-id'));
    $('.slider1').css('visibility','visible');
    $('.xdsoft_slider_label').css('display','block');
    three.createObj();
}
if(isMob){
	//单选框事件
	$('.radioChoose .radios').on('touchstart',radioChoose);
	//重置
	$("#renew").on('touchstart',renew);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	//单选框事件
	$('.radioChoose .radios').on('click',radioChoose);
	//重置
	$("#renew").on('click',renew);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}





