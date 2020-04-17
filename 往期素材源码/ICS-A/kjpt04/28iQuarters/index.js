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
        $('table').css("zoom",bodyScale)
        var marginTop = ($body.width()/bodyWidth*bodyHeight-1200)/2;
        $('.body').css("margin-top",'-600px');
        $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale + (bodyHeight-1200*scale)/2 ),bottom:(69*scale + (bodyHeight-1200*scale)/2 )});
        $('.threeControl').css({'zoom':bodyScale/0.7,'right':30*scale,'bottom':30*scale});
    // }else{
    //     scale = 0.6667;
    //     $(".body").css({"zoom":0.6667,"margin-top":'0',"top":'0'});
    //     $('table').css("zoom",'0.6667')
    //     $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale ),bottom:(69*scale)});
    // }
    $('.zoom').css("zoom",scale);
    $('body').css('background','#000');
}


// 控件区垂直居中
var controlHeight = $("#controlContainer").height();
var conHeight = $(".con").height();
var h2Height = $("#controlContainer h2").height();
var h2MarginTop = parseInt($("#controlContainer h2").css("margin-top"));
var marginTop = (controlHeight - h2Height - h2MarginTop - conHeight - 100)/2;
$(".con").css("margin-top",marginTop);

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

var widthT = $("#threeContainer").width();
var heightT = $("#threeContainer").height();

$('.domE').css({'width':widthT+'px','height':heightT+'px'})
//判断是否支持webGL
var canWebgl = ( function () {
    try {
        var canvas = document.createElement( 'canvas' );
        return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
    } catch ( e ) {
        return false;
    }
} )();
var key1=false,key2=false,figure,num=0,p;
var content={
    0:0,
    1:0
};

var threeDimension = {
    //初始化
    init:function(){
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.createAxis();
    },
    //创建场景于相机
    createScene:function(){
        threeDimension.scene = new THREE.Scene();
        threeDimension.scene.position.set(-425,-160,0)
        threeDimension.camera = new THREE.PerspectiveCamera(45, widthT / heightT, 1, 20000);
        threeDimension.camera.position.x = 0;
        threeDimension.camera.position.y = 0;
        threeDimension.camera.position.z = 1200;
        threeDimension.camera.lookAt(threeDimension.scene.position);
        // threeDimension.scene.add(threeDimension.camera);
        threeDimension.renderer = null;
        if(canWebgl){
            threeDimension.renderer = new THREE.WebGLRenderer({antialias:true});
        }else{
            threeDimension.renderer = new THREE.CanvasRenderer();
        }
        threeDimension.renderer.setPixelRatio( window.devicePixelRatio );
        threeDimension.renderer.setClearColor(0xffffff);
        threeDimension.renderer.setSize(widthT,heightT);
        $("#threeContainer").append(threeDimension.renderer.domElement);
    },
    //定义鼠标控制
    createControls:function(){
        threeDimension.controls = new THREE.OrbitControls( threeDimension.camera, threeDimension.renderer.domElement );
        threeDimension.controls.enableDamping = true;
        threeDimension.controls.enableZoom=false;
        threeDimension.controls.dampingFactor = 0.25;
        threeDimension.controls.enableRotate =false;
        threeDimension.controls.enablePan =false;
    },
    vec3:function(x,y,z){
        return new THREE.Vector3(x, y, z);
    },
    createText:function(texts,x,y,z,color,size){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x,y,z);
        return text;
    },
    createAxis:function(){
        if(threeDimension.axis!=null){
            threeDimension.scene.remove(threeDimension.axis)
        }
        threeDimension.axis = new THREE.Group();
        threeDimension.labelAxis(0,80,800,90,90,450);
        threeDimension.drawAxisArrow(threeDimension.vec3( 0, 0, 0 ), threeDimension.vec3( 870, 0, 0 ), 0x000000,1);
        threeDimension.drawAxisArrow(threeDimension.vec3( 0, 0, 0 ), threeDimension.vec3( 0, 500, 0 ), 0x000000,2);
        threeDimension.scene.add( threeDimension.axis);
    },
    //坐标轴分度线
    labelAxis:function (startx,stepSizex,stopx,starty,stepSizey,stopy) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={},line=null,vertices=null;
        // label x axis:
        textStyle = {align: textAlign.center, font: '18px "Cambria Math"', fillStyle: 'black', antialias: true};
        for(var i = startx; i <=stopx; i = i+stepSizex) {
            text = new SpriteText2D(i/8+(num-num%100), textStyle);
            text.rotation = threeDimension.camera.rotation;
            text.position.x = i;
            text.position.y = -5;
            threeDimension.axis.add(text);
            vertices = [];
            vertices.push(threeDimension.vec3(i,0,0));
            vertices.push(threeDimension.vec3(i,10,0));

            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);
        }
        // label y axis:
        textStyle = {align: textAlign.center, font: '18px "Cambria Math"', fillStyle: 'black', antialias: true};
        for(var i = starty; i <= stopy; i = i+stepSizey) {
            text = new SpriteText2D(i/stepSizey*20+'%', textStyle);
            text.rotation = threeDimension.camera.rotation;
            text.position.x = -25;
            text.position.y = i+10;
            text.position.z = 0.2;
            threeDimension.axis.add(text);

            vertices = [];
            vertices.push(threeDimension.vec3(0,i,0));
            vertices.push(threeDimension.vec3(10,i,0));

            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);
        }
        threeDimension.axis.add(text);
    },
    //坐标轴
    drawAxisArrow:function(origin, dir,color,style) {
        var geometryLine = new THREE.Geometry();
        var vertices = [];
        vertices.push(origin);
        vertices.push(dir);
        geometryLine.vertices = vertices;
        var line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        vertices=[];
        vertices.push(threeDimension.vec3(0,225,0),threeDimension.vec3(850,225,0));
        var line1=threeDimension.createLineMesh(vertices, '#000', 2)
        threeDimension.axis.add(line,line1);
        var text;
        if(style == 1){
            vertices = [];
            vertices.push(threeDimension.vec3(dir.x-15,5,0));
            vertices.push(threeDimension.vec3(dir.x,0,0));
            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);

            vertices = [];
            vertices.push(threeDimension.vec3(dir.x-15,-5,0));
            vertices.push(threeDimension.vec3(dir.x,0,0));
            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);

            text=threeDimension.createText('投掷次数',dir.x+10,-10,0,'#000',20)
            threeDimension.axis.add(text);
            
        }else{

            vertices = [];
            vertices.push(threeDimension.vec3(5,dir.y-15,0));
            vertices.push(threeDimension.vec3(0,dir.y,0));
            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);

            vertices = [];
            vertices.push(threeDimension.vec3(-5,dir.y-15,0));
            vertices.push(threeDimension.vec3(0,dir.y,0));
            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);

            text=threeDimension.createText('正面朝上的频率',0,dir.y+25,0,'#000',20)
            threeDimension.axis.add(text);
        }
    },
    createLineMesh:function(vertices, color, style) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        if (style == 1) {
            vertices.push(threeDimension.vec3(vertices[0].x,vertices[0].y-1,vertices[0].z));
            vertices.push(threeDimension.vec3(vertices[1].x,vertices[1].y-1,vertices[1].z));
            vertices.push(threeDimension.vec3(vertices[0].x+1,vertices[0].y,vertices[0].z));
            vertices.push(threeDimension.vec3(vertices[1].x+1,vertices[1].y,vertices[1].z));
            vertices.push(threeDimension.vec3(vertices[0].x-1,vertices[0].y,vertices[0].z));
            vertices.push(threeDimension.vec3(vertices[1].x-1,vertices[1].y,vertices[1].z));
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        } else if(style==2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
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
    },
    createObj:function(){
        if(num==1){
            threeDimension.Obj = new THREE.Group();
        }
        if(num!=1&&num/100!=0&&num%100==1||num==0){
            if(threeDimension.Obj!=null){
                threeDimension.scene.remove(threeDimension.Obj)
            }
            threeDimension.Obj = new THREE.Group();
            threeDimension.createAxis();
        }
        if(num>0){
            if(num%100!=0){
                vertices=[];
                vertices.push((num%100-1)*8+4,content[0]/num*450,1)
            }else{
                vertices=[];
                vertices.push(99*8+4,content[0]/num*450,1)              
            }
            var cir=threeDimension.createCircle(vertices, 4, '#CE7C46');
            threeDimension.Obj.add(cir);
            threeDimension.scene.add(threeDimension.Obj)
        } 
    },
    createCircle:function(vertices,radius,color){
        var CircleG = new THREE.CircleGeometry(radius, 50, 0, 2 * Math.PI);
        var CircleM = new THREE.MeshBasicMaterial({color: color});
        var Circle = new THREE.Mesh(CircleG, CircleM);
        Circle.position.x = vertices[0]; 
        Circle.position.y = vertices[1];
        Circle.position.z = vertices[2];
        return Circle;
    }
}  
threeDimension.init();

function renderAll(){
    threeDimension.controls.update();
    requestAnimationFrame(renderAll);
    threeDimension.renderer.render(threeDimension.scene,threeDimension.camera);
}
renderAll();

function renew() {
	num=0;
    array_num=[];
	content={
	    0:0,
	    1:0
	};
    $('.wrap img').attr('src','images/0.png');
	$('table .cishu td:gt(0)').html('0');
    $('table .pinlv td:gt(0)').html('0%');
    threeDimension.createAxis();
	threeDimension.scene.remove(threeDimension.Obj)
}
function dynamic1(){
	key1=true; 
    if(key1&&!key2){
        $('body').css('pointer-events','none')
        num++;
        figure=Math.floor(Math.random()*2)
        $('.wrap img').attr('src','images/gif'+figure+'.gif');
		setTimeout(function(){
			content[figure]=content[figure]+1
			$('table .cishu td').eq(figure+1).html(content[figure])
            for(var i=0;i<2;i++){
                p=content[i]/num*100;
                $('table .pinlv td').eq(i+1).html(p==0?'0%':p.toFixed(1)+'%')
            }
			threeDimension.createObj()
            $('.wrap img').attr('src','images/'+figure+'.png');
            $('body').css('pointer-events','auto')
		},1000)
        key1=false;
    }
}
function dynamic2(){
	key2=true;
    if(key2&&!key1){
        $('body').css('pointer-events','none')
        var i=0;
        var S=setInterval(function(){
            num++;
            figure=Math.floor(Math.random()*2)
            content[figure]=content[figure]+1
            $('table .cishu td').eq(figure+1).html(content[figure])
            $('.wrap img').attr('src','images/'+figure+'.png');
            for(var j=0;j<2;j++){
                p=content[j]/num*100;
                $('table .pinlv td').eq(j+1).html(p==0?'0%':p.toFixed(1)+'%')
            }
            i++;
            threeDimension.createObj()
            if(i==100){
                clearInterval(S)
                key2=false;
                $('body').css('pointer-events','auto')
            }
        },100)
    } 
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
        // threeDimension.camera.position.z = 1200;
        $('canvas,.domE').css({'position':'absolute','left':0,'top':0});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','visible');
        $('#threeContainer').css({'border-radius':10*scale,'box-shadow': 6*scale + 'px '+6*scale +'px '+ 20*scale +'px rgba(0,0,0,0.30)' });
    }else{
        fullScreen = 1;
        $('#scale img').attr('src','images/icon/back.png');
        $obj.css({'left':0,'top':0,'right':0,'bottom':0,'border-radius':'0'});
        $('canvas,.domE').css({'position':'absolute','left':(bodyWidth-threeWidth)/2,'top':(bodyHeight-threeHeight)/2});
        // threeDimension.camera.position.z = 1100;
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','hidden');
    }
}

if(isMob){
	//reset
	$('#renew').on('touchstart',renew);
	//投掷
	$('.dynamic1').on('touchstart',dynamic1);
	$('.dynamic2').on('touchstart',dynamic2);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	//reset
	$('#renew').on('click',renew);
	//投掷
	$('.dynamic1').on('click',dynamic1);
	$('.dynamic2').on('click',dynamic2);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}


