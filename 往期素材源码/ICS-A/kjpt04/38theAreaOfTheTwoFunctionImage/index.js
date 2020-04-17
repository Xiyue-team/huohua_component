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
        $('.threeControl').css({'zoom':bodyScale/0.7,'right':30*scale,'bottom':30*scale});
    // }else{
    //     scale = 0.6667;
    //     $(".body").css({"zoom":0.6667,"margin-top":'0',"top":'0'});
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

//判断是否支持webGL
var canWebgl = ( function () {
    try {
        var canvas = document.createElement( 'canvas' );
        return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
    } catch ( e ) {
        return false;
    }
} )();

var getParameter = {
    n:0
};
var data_id=1;
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
        threeDimension.camera = new THREE.PerspectiveCamera(45, widthT / heightT, 1, 10000);
        threeDimension.camera.position.x = 0;
        threeDimension.camera.position.y = 0;
        threeDimension.camera.position.z = 1200;
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
        threeDimension.renderer.setSize(widthT,heightT);
        $("#threeContainer").append(threeDimension.renderer.domElement);

    },
    //定义鼠标控制
    createControls:function(){
        threeDimension.controls = new THREE.OrbitControls( threeDimension.camera, threeDimension.renderer.domElement );
        threeDimension.controls.enableDamping = true;
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
        threeDimension.labelAxis(-400, 50, 400,-400,100,400);
        threeDimension.drawAxisArrow(threeDimension.vec3( -450, 0, 0 ), threeDimension.vec3( 450, 0, 0 ), 0x000000,1);
        threeDimension.drawAxisArrow(threeDimension.vec3( 0, -450, 0 ), threeDimension.vec3( 0, 450, 0 ), 0x000000,2);
        threeDimension.scene.add( threeDimension.axis);
    },
    //坐标轴分度线
    labelAxis:function (startx, stepSizex, stopx,starty, stepSizey, stopy) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={},line=null,vertices=null;
        // label x axis:
        textStyle = {align: textAlign.center, font: '18px "Cambria Math"', fillStyle: 'black', antialias: true};
        for(var i = startx; i <= stopx; i = i+stepSizex) {
            text = new SpriteText2D(i/100, textStyle);
            text.rotation = threeDimension.camera.rotation;
            if(i==0){
                text.position.x = i+10;
            }
            else{
                text.position.x = i;
            }
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
            if(i==0){
                continue;
            }
            text = new SpriteText2D(i/100, textStyle);
            text.rotation = threeDimension.camera.rotation;
            text.position.x = -15;
            text.position.y = i+7;
            text.position.z = -1;
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
            vertices = [];
            vertices.push(threeDimension.vec3(dir.x-20,5,0));
            vertices.push(threeDimension.vec3(dir.x,0,0));
            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);

            vertices = [];
            vertices.push(threeDimension.vec3(dir.x-20,-5,0));
            vertices.push(threeDimension.vec3(dir.x,0,0));
            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);

            text=threeDimension.createText('x',dir.x,-5,0,'#000',24)
            threeDimension.axis.add(text);
        }else{

            vertices = [];
            vertices.push(threeDimension.vec3(5,dir.y-20,0));
            vertices.push(threeDimension.vec3(0,dir.y,0));
            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);

            vertices = [];
            vertices.push(threeDimension.vec3(-5,dir.y-20,0));
            vertices.push(threeDimension.vec3(0,dir.y,0));
            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);

            text=threeDimension.createText('y',-15,dir.y+10,0,'#000',24)
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

        //f(x)
        var fx,fy,gx,gy,x,y,Gx,line1,line2,mesh,shape,N,x1,y1,x2,y2,J,S=0,Sj,W;
        vertices = [];
        var textF;
        for(var i=-2.1;i<=2.15;i=i+0.05){
            fx = i*100;
            fy = Math.pow(i,2)*100;
            vertices.push(threeDimension.vec3(fx,fy,0));
        }
        var Fx = threeDimension.createLineMesh(vertices,0xFF0E0E,3);
        if(data_id==2){
            textF=threeDimension.createText('f(x)',fx-30,fy+30,0,'#000',24)
        }else{
            textF=threeDimension.createText('f(x)',fx+30,fy+30,0,'#000',24)
        }
        //g(x)
        vertices = [];
        if(data_id==1){
            for(var i=-1;i<=4;i=i+0.05){
                gx = i*100;
                gy = (-Math.pow(i,2)+3*i+2)*100;
                vertices.push(threeDimension.vec3(gx,gy,0));
            }
            Gx = threeDimension.createLineMesh(vertices,0x0FCE0F,3);
            //辅助线
            vertices=[];
            vertices.push(threeDimension.vec3(-50,0,0));
            vertices.push(threeDimension.vec3(-50,25,0));
            line1 = threeDimension.createLineMesh(vertices,0x989898,2);
            vertices=[];
            vertices.push(threeDimension.vec3(200,0,0));
            vertices.push(threeDimension.vec3(200,400,0));
            line2 = threeDimension.createLineMesh(vertices,0x989898,2);
            threeDimension.Obj.add(line1,line2);
            Sj=(-1/3*Math.pow(2,3)+3/2*Math.pow(2,2)+2*2-(-1/3*Math.pow(-0.5,3)+3/2*Math.pow(-0.5,2)-0.5*2)-(1/3*Math.pow(2,3)-1/3*Math.pow(-0.5,3))).toFixed(2);
            $('.formula3 .formula-right').html(Sj);
            if(getParameter.n>0){
                //等分矩形
                N=2.5/getParameter.n;
                for(var i=0;i<getParameter.n;i++){
                    vertices=[];
                    x1 = (-0.5+i*N)*100;
                    y1 = Math.pow(-0.5+i*N,2)*100;
                    x2 = (-0.5+i*N+N)*100;
                    y2 = (-Math.pow(-0.5+i*N+N,2)+3*(-0.5+i*N+N)+2)*100;
                    vertices.push(threeDimension.vec3(x1,y1,1));
                    vertices.push(threeDimension.vec3(x1,y2,1));
                    vertices.push(threeDimension.vec3(x2,y2,1));
                    vertices.push(threeDimension.vec3(x2,y1,1));
                    vertices.push(threeDimension.vec3(x1,y1,1));
                    J=threeDimension.createLineMesh(vertices,'#32A7F6',3);
                    S+=(x2-x1)/100*(y2-y1)/100;
                    threeDimension.Obj.add(J);
                }
                $('.formula1 .formula-right').html((Math.abs(-0.5-2)/getParameter.n).toFixed(2));
                $('.formula2 .formula-right').html(S.toFixed(2));
            }else{
                //相交区域
                vertices=[];
                shape = new THREE.Shape();
                shape.moveTo(-50,25,0);
                for(var j=-0.5;j<=2;j=j+0.05){
                    x = j*100;
                    y = (-Math.pow(j,2)+3*j+2)*100;
                    shape.lineTo( x, y ,0);
                }
                for(var k=2;k>=-0.5;k=k-0.05){
                    x = k*100;
                    y = Math.pow(k,2)*100;
                    shape.lineTo( x, y ,0);
                }
                mesh = new THREE.Mesh( new THREE.ShapeGeometry( shape ), new THREE.MeshBasicMaterial( { color: 0xFFCAA6 } ) ) ;
                threeDimension.Obj.add(mesh)
            }
        }else if(data_id==2){
            for(var i=-2.5;i<=2.5;i=i+5){
                gx = i*100;
                gy = (i+2)*100;
                vertices.push(threeDimension.vec3(gx,gy,0));
            }
            Gx = threeDimension.createLineMesh(vertices,0x0FCE0F,3);
            //辅助线
            vertices=[];
            vertices.push(threeDimension.vec3(-100,0,0));
            vertices.push(threeDimension.vec3(-100,100,0));
            line1 = threeDimension.createLineMesh(vertices,0x989898,2);
            vertices=[];
            vertices.push(threeDimension.vec3(200,0,0));
            vertices.push(threeDimension.vec3(200,400,0));
            line2 = threeDimension.createLineMesh(vertices,0x989898,2);
            threeDimension.Obj.add(line1,line2);
            Sj=((1/2*Math.pow(2,2)+2*2-(1/2*Math.pow(-1,2)-2))-(1/3*Math.pow(2,3)-1/3*Math.pow(-1,3))).toFixed(2);
            $('.formula3 .formula-right').html(Sj);
            if(getParameter.n>0){
                //等分矩形
                N=3/getParameter.n;
                for(var i=0;i<getParameter.n;i++){
                    vertices=[];
                    x1 = (-1+i*N)*100;
                    y1 = Math.pow(-1+i*N,2)*100;
                    x2 = (-1+i*N+N)*100;
                    y2 = (-1+i*N+N+2)*100;
                    vertices.push(threeDimension.vec3(x1,y1,1));
                    vertices.push(threeDimension.vec3(x1,y2,1));
                    vertices.push(threeDimension.vec3(x2,y2,1));
                    vertices.push(threeDimension.vec3(x2,y1,1));
                    vertices.push(threeDimension.vec3(x1,y1,1));
                    J=threeDimension.createLineMesh(vertices,'#32A7F6',3);
                    S+=(x2-x1)/100*(y2-y1)/100;
                    threeDimension.Obj.add(J);
                }
                $('.formula1 .formula-right').html((Math.abs(-0.5-2)/getParameter.n).toFixed(2));
                $('.formula2 .formula-right').html(S.toFixed(2));
            }else{
                //相交区域
                vertices=[];
                shape = new THREE.Shape();
                shape.moveTo(-100,100,0);
                for(var j=-1;j<=2;j=j+0.05){
                    x = j*100;
                    y = (j+2)*100;
                    shape.lineTo( x, y ,0);
                }
                for(var k=2;k>=-1;k=k-0.05){
                    x = k*100;
                    y = Math.pow(k,2)*100;
                    shape.lineTo( x, y ,0);
                }
                mesh = new THREE.Mesh( new THREE.ShapeGeometry( shape ), new THREE.MeshBasicMaterial( { color: 0xFFCAA6 } ) ) ;
                threeDimension.Obj.add(mesh)
            }
        }else{
            for(var i=0;i<=4;i=i+0.05){
                gx = i*100;
                gy = Math.sqrt(2*i)*100;
                vertices.push(threeDimension.vec3(gx,gy,0));
            }
            Gx = threeDimension.createLineMesh(vertices,0x0FCE0F,3);

            //辅助线
            vertices=[];
            vertices.push(threeDimension.vec3(Math.pow(2,1/3)*100,0,0));
            vertices.push(threeDimension.vec3(Math.pow(2,1/3)*100,Math.sqrt(Math.pow(2,1/3)*2)*100,0));
            line2 = threeDimension.createLineMesh(vertices,0x989898,2);
            threeDimension.Obj.add(line2);

            Sj=(2/3*Math.pow(Math.pow(2,1/3),3/2)*Math.sqrt(2)-1/3*Math.pow(Math.pow(2,1/3),3)).toFixed(2);
            $('.formula3 .formula-right').html(Sj);

            if(getParameter.n>0){
                //等分矩形
                N=Math.pow(2,1/3)/getParameter.n;
                for(var i=0;i<getParameter.n;i++){
                    vertices=[];
                    x1 = i*N*100;
                    y1 = Math.pow(i*N,2)*100;
                    x2 = (i*N+N)*100;
                    y2 = Math.sqrt(2*(i*N+N))*100;
                    vertices.push(threeDimension.vec3(x1,y1,1));
                    vertices.push(threeDimension.vec3(x1,y2,1));
                    vertices.push(threeDimension.vec3(x2,y2,1));
                    vertices.push(threeDimension.vec3(x2,y1,1));
                    vertices.push(threeDimension.vec3(x1,y1,1));
                    J=threeDimension.createLineMesh(vertices,'#32A7F6',3);
                    S+=(x2-x1)/100*(y2-y1)/100;
                    threeDimension.Obj.add(J);
                }
                $('.formula1 .formula-right').html((1/getParameter.n).toFixed(2));
                $('.formula2 .formula-right').html(S.toFixed(2));
            }else{
                //相交区域
                vertices=[];
                shape = new THREE.Shape();
                shape.moveTo(0,0,0);
                for(var j=0;j<=Math.pow(2,1/3);j=j+0.05){
                    x = j*100;
                    y = Math.sqrt(2*j)*100;
                    shape.lineTo( x, y ,0);
                }
                for(var k=Math.pow(2,1/3);k>=0;k=k-0.05){
                    x = k*100;
                    y = Math.pow(k,2)*100;
                    shape.lineTo( x, y ,0);
                }
                mesh = new THREE.Mesh( new THREE.ShapeGeometry( shape ), new THREE.MeshBasicMaterial( { color: 0xFFCAA6 } ) ) ;
                threeDimension.Obj.add(mesh)  
            }
        }
        var textG=threeDimension.createText('g(x)',gx+30,gy,0,'#000',24)

        W=((S-Sj)/Sj*100).toFixed(2)
        if(getParameter.n==0){
            $('.formula1 .formula-right').html('');
            $('.formula2 .formula-right').html('0.00');
            $('.formula4 .formula-right').html('');
        }else{
            $('.formula4 .formula-right').html(W+'%');
        }
        threeDimension.Obj.add(Fx,textF,Gx,textG);
        threeDimension.scene.add(threeDimension.Obj);
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

$("#slider1").change(function(){
    var val = parseInt(this.value);
    getParameter.n = val;
    threeDimension.createObj();
});


function renew(){
	$('.selectChoose').removeClass('open');
    $('.optionChoose').html('<p><img src="images/5.png" style="height: 45px;width: auto;" /></p>');
    $('.option').removeClass('choose')
    $('.option').eq(0).addClass('choose')
    $('.slider1').find('.sliderLeft').css({'width':'0'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'0'});
    $('.slider1').find('.xdsoft_slider_label').text('0');
    $('.slider1').attr('value',''+0+'|0');
    getParameter = {
        n:0
    };
    data_id=1;
    threeDimension.camera.position.x = 0;
    threeDimension.camera.position.y = 0;
    threeDimension.camera.position.z = 1200;
    threeDimension.createObj();
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
    }else{
        fullScreen = 1;
        $('#scale img').attr('src','images/icon/back.png');
        $obj.css({'left':0,'top':0,'right':0,'bottom':0,'border-radius':'0'});
        $('canvas').css({'position':'absolute','left':(bodyWidth-threeWidth)/2,'top':(bodyHeight-threeHeight)/2});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','hidden');
    }
}
function optionChoose(){
    if($(this).parent().hasClass('open')){
        $(this).parent().removeClass('open');
    }else{
        $(this).parent().addClass('open');
        $('.optionContainer').css('visibility','hidden');
        setTimeout(function(){
        	$('.optionContainer').css('visibility','visible');
        },50);
    } 
}
function option(){ 
    $(this).siblings().removeClass('choose').end().addClass('choose');
    $('.optionChoose').html($(this).html());
    $('.selectChoose').removeClass('open');
    $('.turn1').removeClass('on').addClass('off');
    data_id=$(this).attr('data-id');
    threeDimension.createObj();
}
if(isMob){
	//reset
	$('#renew').on('touchstart',renew);
	//下拉框事件
	$('.optionChoose,.arrow').on('touchstart',optionChoose);
	$('.option').on('touchstart',option);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	//reset
	$('#renew').on('click',renew);
	//下拉框事件
	$('.optionChoose,.arrow').on('click',optionChoose);
	$('.option').on('click',option);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}


