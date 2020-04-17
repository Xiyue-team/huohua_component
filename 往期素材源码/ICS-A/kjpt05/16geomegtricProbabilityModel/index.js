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

//转盘2图片预加载
var img_y=document.createElement('img');
img_y.src='images/2.png'

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
var radioSelect=1,num=0,radioSelect_old,over=false;
var content1={
    0:0,
    1:0,
};


var threeDimension = {
    //初始化
    init:function(){
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.createAxis();
        threeDimension.createObj();
    },
    //创建场景于相机
    createScene:function(){
        threeDimension.scene = new THREE.Scene();
        threeDimension.scene.position.set(-400,-150,0)
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
        threeDimension.axis = new THREE.Group();
        threeDimension.labelAxis(100,120,90,90,450);
        threeDimension.drawAxisArrow(threeDimension.vec3( 0, 0, 0 ), threeDimension.vec3( 350, 0, 0 ), 0x000000,1);
        threeDimension.drawAxisArrow(threeDimension.vec3( 0, 0, 0 ), threeDimension.vec3( 0, 500, 0 ), 0x000000,2);
        threeDimension.scene.add( threeDimension.axis);
    },
    //坐标轴分度线
    labelAxis:function (startx,stepSizex,starty,stepSizey,stopy) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={},line=null,vertices=null;
        // label x axis:
        textStyle = {align: textAlign.center, font: '18px "Cambria Math"', fillStyle: 'black', antialias: true};
        text = new SpriteText2D('A', textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.x = startx;
        text.position.y = -5;
        threeDimension.axis.add(text);

        text = new SpriteText2D('B', textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.x = startx+stepSizex;
        text.position.y = -5;
        threeDimension.axis.add(text);

        // label y axis:
        textStyle = {align: textAlign.center, font: '18px "Cambria Math"', fillStyle: 'black', antialias: true};
        for(var i = starty; i <= stopy; i = i+stepSizey) {
            text = new SpriteText2D(i/stepSizey*20+'%', textStyle);
            text.rotation = threeDimension.camera.rotation;
            text.position.x = -25;
            text.position.y = i+7;
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
        threeDimension.axis.add(line);
        var text;
        if(style == 1){
            text=threeDimension.createText('结果',dir.x,-10,0,'#000',20)
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

            text=threeDimension.createText('频率',-30,dir.y+12,0,'#000',20)
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
                dashSize: 7,
                gapSize: 7
            }));
        }else if( style == 3){
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }
        return lineMesh;
    },
    createObj:function(){
        if(threeDimension.Obj!=null){
            threeDimension.scene.remove(threeDimension.Obj);
        }
        var vertices;
        threeDimension.Obj = new THREE.Group();
        if(num!=0){
            for(var i=0;i<2;i++){
                H=content1[i]/num;
                if(H>0){
                    shape = new THREE.Shape();
                    shape.moveTo(i*120+60,1,0);
                    shape.lineTo(i*120+60,450*H,0);
                    shape.lineTo(i*120+140,450*H,0);
                    shape.lineTo(i*120+140,1,0);
                    shape.lineTo(i*120+60,1,0);
                    mesh=new THREE.Mesh(new THREE.ShapeGeometry(shape), new THREE.MeshBasicMaterial({color: i==0?'#AADFDF':'#80C5F4'}))
                    threeDimension.Obj.add(mesh);
                }
            }
            
        }
        threeDimension.scene.add(threeDimension.Obj)
    },
}  
threeDimension.init();

function renderAll(){
    threeDimension.controls.update();
    requestAnimationFrame(renderAll);
    threeDimension.renderer.render(threeDimension.scene,threeDimension.camera);
}
renderAll();

var fullScreen=0;
function renew(){
	$('.radios').find('.radiocircle').removeClass('select')
    $('.radios1').find('.radiocircle').addClass('select');
    $('.demo').css('background-image','url(images/1.png)')
    radioSelect=1;
    radioSelect_old='';
    content1={
        0:0,
        1:0,
    };
    num=0;
    $('#img_s').css({'transform':'rotate(0deg)'})
    $('table .cishu td:gt(0)').html('0');
    $('table .pinlv td:gt(0)').html('0%');
    threeDimension.createObj()
    $('body').css('pointer-events','auto')
    over=true;
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
        $('canvas,.domE').css({'position':'absolute','left':0,'top':0});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','visible');
        $('#threeContainer').css({'border-radius':10*scale,'box-shadow': 6*scale + 'px '+6*scale +'px '+ 20*scale +'px rgba(0,0,0,0.30)' });
    }else{
        fullScreen = 1;
        $('#scale img').attr('src','images/icon/back.png');
        $obj.css({'left':0,'top':0,'right':0,'bottom':0,'border-radius':'0'});
        $('canvas,.domE').css({'position':'absolute','left':(bodyWidth-threeWidth)/2,'top':(bodyHeight-threeHeight)/2});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','hidden');
    }
}
function dynamic1(){
	$('body').css('pointer-events','none')
    $('#renew').css('pointer-events','auto')
    num++;
    var ang=Math.ceil(Math.random()*360);
    rotate_s(ang);
    if(radioSelect==1){
        if(ang>0&&ang<=37||ang>89&&ang<=181||ang>233&&ang<=271){
            content1[0]=content1[0]+1;
        }else{
            content1[1]=content1[1]+1;  
        }
    }else{
        if(ang>43&&ang<=118||ang>193&&ang<=251){
            content1[0]=content1[0]+1;
        }else{
            content1[1]=content1[1]+1;  
        }
    }
    setTimeout(function () {
        $('table .cishu td').eq(1).html(content1[0]);
        $('table .pinlv td').eq(1).html((content1[0]/num*100).toFixed(2)+'%');
        $('table .cishu td').eq(2).html(content1[1]);
        $('table .pinlv td').eq(2).html((content1[1]/num*100).toFixed(2)+'%');
        threeDimension.createObj();
        $('body').css('pointer-events','auto')
    },800+ang/360*800);
}
function dynamic2(){
	$('body').css('pointer-events','none')
    $('#renew').css('pointer-events','auto')
    var j=0;
    var S=setInterval(function(){
        if(j>=100||over){
            clearInterval(S);
            $('body').css('pointer-events','auto')
            over=false;
            return false;
        }
        var ang=Math.ceil(Math.random()*360);
        $('#img_s').css({'transform':'rotate('+ang+'deg)'});
        num++;
        if(radioSelect==1){
            if(ang>0&&ang<=37||ang>89&&ang<=181||ang>233&&ang<=271){
                content1[0]=content1[0]+1;
            }else{
                content1[1]=content1[1]+1;  
            }
        }else{
            if(ang>43&&ang<=118||ang>193&&ang<=251){
                content1[0]=content1[0]+1;
            }else{
                content1[1]=content1[1]+1;  
            }
        }
        $('table .cishu td').eq(1).html(content1[0]);
        $('table .pinlv td').eq(1).html((content1[0]/num*100).toFixed(2)+'%');
        $('table .cishu td').eq(2).html(content1[1]);
        $('table .pinlv td').eq(2).html((content1[1]/num*100).toFixed(2)+'%');
        threeDimension.createObj();
        j++;
    },100); 
}
function rotate_s(ang){
    var i=0;
    var sum=0;
    var S=setInterval(function(){
        if(sum>ang+360||over){
            clearInterval(S);
            over=false;
            return false;
        }
        i++;
        $('#img_s').css({'transform':'rotate('+i*11+'deg)'})
        sum=i*11;
    },20)
}
function radioChoose(){
    $('.radios').find('.radiocircle').removeClass('select');
    $(this).find('.radiocircle').addClass('select');
    radioSelect = parseInt($(this).attr('data-id'));
    if(radioSelect_old!=radioSelect){
        content1={
            0:0,
            1:0,
        };
        num=0;
        $('#img_s').css({'transform':'rotate(0deg)'})
        if(radioSelect==1){
            $('table .cishu td:gt(0)').html('0');
            $('table .pinlv td:gt(0)').html('0%');
            $('.demo').css('background-image','url(images/1.png)')
        }else{
            $('table .cishu td:gt(0)').html('0');
            $('table .pinlv td:gt(0)').html('0%');
            $('.demo').css('background-image','url(images/2.png)')
        }
        threeDimension.createObj()
        radioSelect_old=radioSelect
    }
    
}
if(isMob){
	//旋转
	$('.dynamic1').on('touchstart',dynamic1);
	$('.dynamic2').on('touchstart',dynamic2);
	//单选框事件
	$('.radioChoose .radios').on('touchstart',radioChoose);
	//reset
	$('#renew').on('touchstart',renew);
	/*全屏事件*/
	$('#scale').on("touchstart",scalef);
}else{
	//旋转
	$('.dynamic1').on('click',dynamic1);
	$('.dynamic2').on('click',dynamic2);
	//单选框事件
	$('.radioChoose .radios').on('click',radioChoose);
	//reset
	$('#renew').on('click',renew);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}


