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
var radioSelect=1,key1=false,key2=false,figure1,figure2,figure,s,num1=0,num2=0,maxArr=[],max=1,p;
var content1={
    1:0,
    2:0,
    3:0,
    4:0,
    5:0,
    6:0
};
var content2={
    2:0,
    3:0,
    4:0,
    5:0,
    6:0,
    7:0,
    8:0,
    9:0,
    10:0,
    11:0,
    12:0
};
var color1=['#FFCC80','#BEBEFF','#FFB3CC','#B2CC80','#E6B3FF','#CCE6FF'];
var color2=['#FFCC80','#BEBEFF','#FFB3CC','#B2CC80','#E6B3FF','#CCE6FF','#E6B3FF','#B2CC80','#FFB3CC','#BEBEFF','#FFCC80'];;
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
        if(threeDimension.axis!=null){
            threeDimension.scene.remove(threeDimension.axis);
        }
        threeDimension.axis = new THREE.Group();
        if(radioSelect==1){
            if(max>0.5){
                threeDimension.labelAxis(100,80,580,90,90,450,2,1);
            }else{
                threeDimension.labelAxis(100,80,580,90,90,450,1,1);
            }
        }else{
            if(max>0.5){
                threeDimension.labelAxis(40,50,590,90,90,450,2,2);
            }else{
                threeDimension.labelAxis(40,50,590,90,90,450,1,2);
            }
        }
        threeDimension.drawAxisArrow(threeDimension.vec3( 0, 0, 0 ), threeDimension.vec3( 600, 0, 0 ), 0x000000,1);
        threeDimension.drawAxisArrow(threeDimension.vec3( 0, 0, 0 ), threeDimension.vec3( 0, 500, 0 ), 0x000000,2);
        threeDimension.scene.add( threeDimension.axis);
    },
    //坐标轴分度线
    labelAxis:function (startx,stepSizex,stopx,starty,stepSizey,stopy,texty,start) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={},line=null,vertices=null;
        // label x axis:
        textStyle = {align: textAlign.center, font: '18px "Cambria Math"', fillStyle: 'black', antialias: true};
        for(var i = startx,j=start; i < stopx; i = i+stepSizex,j++) {
            text = new SpriteText2D(j, textStyle);
            text.rotation = threeDimension.camera.rotation;
            text.position.x = i;
            text.position.y = -5;
            threeDimension.axis.add(text);
        }
        // label y axis:
        textStyle = {align: textAlign.center, font: '18px "Cambria Math"', fillStyle: 'black', antialias: true};
        for(var i = starty; i <= stopy; i = i+stepSizey) {
            text = new SpriteText2D(i/stepSizey*10*texty+'%', textStyle);
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
            if(radioSelect==1){
                text=threeDimension.createText('点数',dir.x,-10,0,'#000',20)
                threeDimension.axis.add(text);
            }else{
                text=threeDimension.createText('点数总和',dir.x+15,-10,0,'#000',20)
                threeDimension.axis.add(text);
            }
            
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
        var vertices,mesh,shape,t;
        threeDimension.Obj = new THREE.Group();
        if(radioSelect==1){
            if(num1!=0){
                for(var i=0;i<6;i++){
                    H=content1[i+1]/num1;
                    maxArr.push(H);
                }
                max = maxArr[0];
                for(var j = 1; j < maxArr.length; j++){
                  if( max < maxArr[j] ){
                    max = maxArr[j];
                  }
                }
                if(max>0.5){
                    t=1
                }else{
                    t=2
                }
                maxArr=[];
            }

            for(var i=0;i<6;i++){
                if(num1!=0){
                    H=content1[i+1]/num1;
                    if(H>0){
                        shape = new THREE.Shape();
                        shape.moveTo(i*80+60,1,0);
                        shape.lineTo(i*80+60,450*H*t,0);
                        shape.lineTo(i*80+140,450*H*t,0);
                        shape.lineTo(i*80+140,1,0);
                        shape.lineTo(i*80+60,1,0);
                        mesh=new THREE.Mesh(new THREE.ShapeGeometry(shape), new THREE.MeshBasicMaterial({color: color1[i]}))
                        threeDimension.Obj.add(mesh);
                    }
                }
            }
        }else{
            if(num2!=0){
                for(var i=0;i<11;i++){
                    H=content2[i+2]/num2;
                    maxArr.push(H);
                }
                max = maxArr[0];
                for(var j = 1; j < maxArr.length; j++){
                  if( max < maxArr[j] ){
                    max = maxArr[j];
                  }
                }
                if(max>0.5){
                    t=1
                }else{
                    t=2
                }
                maxArr=[];
            }
            for(var i=0;i<11;i++){
                if(num2!=0){
                    H=content2[i+2]/num2;
                    if(H>0){
                        shape = new THREE.Shape();
                        shape.moveTo(i*50+15,1,0);
                        shape.lineTo(i*50+15,450*H*t,0);
                        shape.lineTo(i*50+65,450*H*t,0);
                        shape.lineTo(i*50+65,1,0);
                        shape.lineTo(i*50+15,1,0);
                        mesh=new THREE.Mesh(new THREE.ShapeGeometry(shape), new THREE.MeshBasicMaterial({color: color2[i]}))
                        threeDimension.Obj.add(mesh);
                    }
                }
            }
        }
        threeDimension.scene.add(threeDimension.Obj)
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

function renew(){
   $('.radios').find('.radiocircle').removeClass('select')
   $('.radios1').find('.radiocircle').addClass('select');
   $('.wrap2').hide();
   $('.wrap1').show();
   $('.dice').attr("class","dice dice_1");
   num1=0;
   num2=0;
   max=1;
   radioSelect=1;
   content1={
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0
    };
    content2={
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
        7:0,
        8:0,
        9:0,
        10:0,
        11:0,
        12:0
    };
    threeDimension.createObj();
    threeDimension.createAxis();
    $('.table1').show()
    $('.table2').hide()
    $('table .cishu td:gt(0)').html('0');
    $('table .pinlv td:gt(0)').html('0%');
}
function dynamic1(){
	$('body').css('pointer-events','none')
    key1=true; 
    if(key1&&!key2){
        if(radioSelect==1){
            num1++;
            figure=Math.floor(Math.random()*6)+1
        
			$('#dice').attr("class","dice");//清除上次动画后的点数
			$('#dice').animate({left: '+2px'}, 100,function(){
				$('#dice').addClass("dice_t");
			}).delay(200).animate({top:'-2px'},100,function(){
				$('#dice').removeClass("dice_t").addClass("dice_s");
			}).delay(200).animate({opacity: 'show'},600,function(){
				$('#dice').removeClass("dice_s").addClass("dice_e");
			}).delay(100).animate({left:'-2px',top:'2px'},100,function(){
				$('#dice').removeClass("dice_e").addClass("dice_"+figure);
			});
			setTimeout(function(){
				content1[figure]=content1[figure]+1
				$('.table1 .cishu td').eq(figure).html(content1[figure])
	            for(var i=1;i<=6;i++){
	                p=content1[i]/num1*100;
	                $('.table1 .pinlv td').eq(i).html(p==0?'0%':p.toFixed(1)+'%')
	            }
				threeDimension.createObj()
    			threeDimension.createAxis()
                $('body').css('pointer-events','auto')
			},800)
        }else{
            num2++;
            figure1=Math.floor(Math.random()*6)+1
            figure2=Math.floor(Math.random()*6)+1
            figure=figure1+figure2;

            $('#dice1').attr("class","dice");//清除上次动画后的点数
			$('#dice1').animate({left: '+2px'}, 100,function(){
				$('#dice1').addClass("dice_t");
			}).delay(200).animate({top:'-2px'},100,function(){
				$('#dice1').removeClass("dice_t").addClass("dice_s");
			}).delay(200).animate({opacity: 'show'},600,function(){
				$('#dice1').removeClass("dice_s").addClass("dice_e");
			}).delay(100).animate({left:'-2px',top:'2px'},100,function(){
				$('#dice1').removeClass("dice_e").addClass("dice_"+figure1);
			});

			$('#dice2').attr("class","dice");//清除上次动画后的点数
			$('#dice2').animate({left: '+2px'}, 100,function(){
				$('#dice2').addClass("dice_t");
			}).delay(200).animate({top:'-2px'},100,function(){
				$('#dice2').removeClass("dice_t").addClass("dice_s");
			}).delay(200).animate({opacity: 'show'},600,function(){
				$('#dice2').removeClass("dice_s").addClass("dice_e");
			}).delay(100).animate({left:'-2px',top:'2px'},100,function(){
				$('#dice2').removeClass("dice_e").addClass("dice_"+figure2);
			});

			setTimeout(function(){
				content2[figure]=content2[figure]+1
	            $('.table2 .cishu td').eq(figure-1).html(content2[figure])
	            for(var i=2;i<=12;i++){
	                p=content2[i]/num2*100
	                $('.table2 .pinlv td').eq(i-1).html(p==0?'0%':p.toFixed(1)+'%')
	            }
				threeDimension.createObj()
    			threeDimension.createAxis()
                $('body').css('pointer-events','auto')
			},800)
        }
        key1=false;
    }
}
function dynamic2(){
	$('body').css('pointer-events','none')
    key2=true;
    if(key2&&!key1){
        var i=0;
        var S=setInterval(function(){
            if(radioSelect==1){
                num1++;
                figure=Math.floor(Math.random()*6)+1
                content1[figure]=content1[figure]+1
                $('.table1 .cishu td').eq(figure).html(content1[figure])
                $('#dice').attr("class","dice dice_"+figure);
                for(var j=1;j<=6;j++){
                    p=content1[j]/num1*100;
                    $('.table1 .pinlv td').eq(j).html(p==0?'0%':p.toFixed(1)+'%')
                }
            }else{
                num2++;
                figure1=Math.floor(Math.random()*6)+1
                figure2=Math.floor(Math.random()*6)+1
                $('#dice1').attr("class","dice dice_"+figure1);
                $('#dice2').attr("class","dice dice_"+figure2);
                figure=figure1+figure2;
                content2[figure]=content2[figure]+1
                $('.table2 .cishu td').eq(figure-1).html(content2[figure])
                for(var j=2;j<=12;j++){
                    p=content2[j]/num2*100;
                    $('.table2 .pinlv td').eq(j-1).html(p==0?'0%':p.toFixed(1)+'%')
                }
            }
            i++;
            threeDimension.createObj()
            threeDimension.createAxis()
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
        // threeDimension.camera.position.z = 1100;
        $('canvas,.domE').css({'position':'absolute','left':(bodyWidth-threeWidth)/2,'top':(bodyHeight-threeHeight)/2});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','hidden');
    }
}
function radioChoose(){
    $('.radios').find('.radiocircle').removeClass('select');
    $(this).find('.radiocircle').addClass('select');
    radioSelect = parseInt($(this).attr('data-id'));
    if(radioSelect==1){
        $('.table2').hide();
        $('.table1').show();
        $('.wrap2').hide();
        $('.wrap1').show();
        num2=0;
        content2={
            2:0,
            3:0,
            4:0,
            5:0,
            6:0,
            7:0,
            8:0,
            9:0,
            10:0,
            11:0,
            12:0
        };
        $('.table2 .cishu td:gt(0)').html('0');
        $('.table2 .pinlv td:gt(0)').html('0%');
    }else{
        $('.table1').hide();
        $('.table2').show();
        $('.wrap1').hide();
        $('.wrap2').show();
        num1=0;
        content1={
            1:0,
            2:0,
            3:0,
            4:0,
            5:0,
            6:0
        };
        $('.table1 .cishu td:gt(0)').html('0');
        $('.table1 .pinlv td:gt(0)').html('0%');
    }
    max=1;
    $('.slider1').css('visibility','visible');
    $('.xdsoft_slider_label').css('display','block');
    threeDimension.createAxis();
    threeDimension.createObj();
}
if(isMob){
	//reset
	$('#renew').on('touchstart',renew);
	//投掷
	$('.dynamic1').on('touchstart',dynamic1);
	$('.dynamic2').on('touchstart',dynamic2);
	//单选框事件
	$('.radioChoose .radios').on('touchstart',radioChoose);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	//reset
	$('#renew').on('click',renew);
	//投掷
	$('.dynamic1').on('click',dynamic1);
	$('.dynamic2').on('click',dynamic2);
	//单选框事件
	$('.radioChoose .radios').on('click',radioChoose);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}


