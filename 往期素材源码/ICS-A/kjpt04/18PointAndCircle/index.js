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
var marginTop = (controlHeight - h2Height - h2MarginTop - conHeight - 100)/2-100;
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


//初始全局变量
var axisArrow = new THREE.Group();
var axis = new THREE.Group();
var x0=2,y0=1,r=1,a=0,b=0;
var circle1=null,circle2=null;
var line1=null;
var dashline=null;
var text1=null,text2=null,text3=null;
var linegroup=null;


function ThreeDimensional() {
    var mousedownflag = false;
    var thiz = this;
    var selectobjs=[],selectobj=null;



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
        this.createCircle();
        this.createLine();
        this.showresult();

    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate =false;
        // this.controls.enablePan =false;
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
    function createText(texts,x,y,z,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '25px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.position.set(x,y,z);
        return text;
    }
    function cretaeTriangleFace(vertices,color){
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
                text = new SpriteText2D(i/stepSizex/2, textStyle);
                text.position.x = i+10;
                text.position.y = -10;
                axis.add(text);
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
        text = new SpriteText2D('x', textStyle);
        text.position.x = stopx+30;
        text.position.y = -20;
        axis.add(text);

        // label y axis:
        textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for( i = starty; i <= stopy; i = i+stepSizey) {
            if(i == 0){ continue;}
             text = new SpriteText2D(i/stepSizey, textStyle);
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
        text = new SpriteText2D('y', textStyle);
        text.position.x = -30;
        text.position.y = stopy+30;
        axis.add(text);
    }
    function createMesh(geom,color){

        var meshMaterial = new THREE.MeshNormalMaterial();
        meshMaterial.side = THREE.DoubleSide;
        var wireFrameMat = new THREE.MeshBasicMaterial({color:color});
        wireFrameMat.wireframe = true;

        var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

        return mesh;
    }

    /****** 其他事件 ******/
    this.createAxis = function(){
        labelAxis(-500,50,500,-500,50,500);
        drawAxisArrow(vec3( -520, 0, 0 ), vec3( 540, 0, 0 ),1);
        drawAxisArrow(vec3( 0, -520, 0 ), vec3( 0, 540, 0 ),2);
        this.scene.add(axisArrow,axis);
    };
    this.createFixedText = function(){
        var x = text("x",30,"#000000");
        var y = text("y",30,"#000000");
        var o = text("O",34,"#000000");
        x.position.set(500,-5,0);
        y.position.set(-15,500,0);
        o.position.set(-15,-10,0);
        this.scene.add(x,y,o);
    };
    this.createCircle=function(){
        if(circle1!=null){
            this.scene.remove(circle1);
            this.scene.remove(circle2);
            this.scene.remove(text1);
            this.scene.remove(text2);
        }
        circle1=new THREE.Group();
        var circle11 = createMesh(new THREE.TorusGeometry(r*50,0.1,2,200),"#F55B23");
        var circle111 = createMesh(new THREE.TorusGeometry(5,5,20,20),"#60B6F1");
        circle2 = createMesh(new THREE.TorusGeometry(5,5,20,20),"#7ED321");
        circle1.add(circle11,circle111);
        text1=createText("A",a*50-20,b*50+20,0,"#000000");
        text2=createText("P("+x0+","+y0+")",x0*50+50,y0*50+20,0,"#000000");
        this.scene.add(circle1,text1,circle2,text2);
        circle1.position.x=a*50;
        circle1.position.y=b*50;
        circle2.position.x=x0*50;
        circle2.position.y=y0*50;

    };
    this.createLine=function(){
        if(dashline!=null){
            this.scene.remove(dashline);
            this.scene.remove(text3);
        }
        if(x0==a&&y0==b){
            return;
        }
        var vertices1=[];
        vertices1.push(vec3(a*50,b*50,1));
        vertices1.push(vec3(x0*50,y0*50,1));

        var geometryLine1 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        geometryLine1.computeLineDistances();
        dashline = new THREE.Line(geometryLine1,new THREE.LineDashedMaterial( { color: 0xff0000,opacity:0.9, dashSize: 5, gapSize: 5 } ));
        text3=createText("d",(x0+a)*25,(y0+b)*25,0,"#ff0000");
        this.scene.add(dashline,text3);
    };
    this.showresult=function(){
        $('#result2').html(r);
        var d=Math.pow((Math.pow((x0-a),2)+Math.pow((y0-b),2)),1/2);
        $('#result1').html(parseFloat(d).toFixed(1));
        if(d>r){
            $('#result3').html("点在圆外");
        }
        else if(d==r){
            $('#result3').html("点在圆上");
        }
        else{
            $('#result3').html("点在圆内");
        }
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
    var s2 = parseInt(this.value);
    x0=s2;
    three.createCircle();
    three.createLine();
    three.showresult();
});
$("#slider2").change(function(){
    var s2 = parseInt(this.value);
    y0=s2;
    three.createCircle();
    three.createLine();
    three.showresult();


});
$("#slider3").change(function(){
    var s2 = parseInt(this.value);
    r=s2;
    three.createCircle();
    three.showresult();

});
$("#slider4").change(function(){
    var s2 = parseInt(this.value);
    a=s2;
    three.createCircle();
    three.createLine();
    three.showresult();

});
$("#slider5").change(function(){
    var s2 = parseInt(this.value);
    b=s2;
    three.createCircle();
    three.createLine();
    three.showresult();
});


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
function renew(){
    x0=2;
    y0=1;
    r=1;
    a=0;
    b=0;
    three.createLine();
    three.createCircle();
    three.showresult();
    if($('#div1').parent().parent().hasClass('on')){
        $('#div1').parent().parent().removeClass('on').addClass('off');
        $('#div1').parent().parent().find('.span2').text('' +'off');
    }
    if($('#div2').parent().parent().hasClass('off')){
        $('#div2').parent().parent().removeClass('off').addClass('on');
        $('#div2').parent().parent().find('.span2').text('' +'on');
    }
    if($('#div3').parent().parent().hasClass('on')){
        $('#div3').parent().parent().removeClass('on').addClass('off');
        $('#div3').parent().parent().find('.span2').text('' +'off');
    }

    $('.slider1').find('.sliderLeft').css({'width':'286px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'286px'});
    $('.slider1').find('.xdsoft_slider_label').text('2');
    $('.slider1').attr('value',''+2+'|0');
    $('.slider2').find('.sliderLeft').css({'width':'245px'});
    $('.slider2').find('.xdsoft_range2dslider_runner').css({'left':'245px'});
    $('.slider2').find('.xdsoft_slider_label').text('1');
    $('.slider2').attr('value',''+1+'|0');
    $('.slider3').find('.sliderLeft').css({'width':'0px'});
    $('.slider3').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
    $('.slider3').find('.xdsoft_slider_label').text('1');
    $('.slider3').attr('value',''+1+'|0');
    $('.slider4').find('.sliderLeft').css({'width':'205px'});
    $('.slider4').find('.xdsoft_range2dslider_runner').css({'left':'205px'});
    $('.slider4').find('.xdsoft_slider_label').text('0');
    $('.slider4').attr('value',''+0+'|0');
    $('.slider5').find('.sliderLeft').css({'width':'205px'});
    $('.slider5').find('.xdsoft_range2dslider_runner').css({'left':'205px'});
    $('.slider5').find('.xdsoft_slider_label').text('0');
    $('.slider5').attr('value',''+0+'|0');
    three.camera.position.x = 0;
    three.camera.position.y = 0;
    three.camera.position.z = 1500;
}
function div1(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        if($('#div2').parent().parent().hasClass('on')){
            $('#div2').parent().parent().removeClass('on').addClass('off');
            $('#div2').parent().parent().find('.span2').text('' +'off');
        }
        $('#slider1').range2DSlider({
            template:'horizontal',
            value:[[x0,0]],
            width:410,
            showLegend:false,
            round:true,
            axis:[[-5,5]],
            printLabel:function(val){
                return parseInt(val[0]);
            }
        });
        $('#slider2').range2DSlider({
            template:'horizontal',
            value:[[y0,0]],
            width:410,
            showLegend:false,
            round:true,
            axis:[[-5,5]],
            printLabel:function(val){
                return parseInt(val[0]);
            }
        });
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
    }
}
function div2(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        if($('#div1').parent().parent().hasClass('on')){
            $('#div1').parent().parent().removeClass('on').addClass('off');
            $('#div1').parent().parent().find('.span2').text('' +'off');
        }
        $('#slider3').range2DSlider({
            template:'horizontal',
            value:[[r,0]],
            width:410,
            round:true,
            onlyGridPoint:true,
            axis:[[1,2,3,4,5]],
            printLabel:function(val){
                return parseInt(val[0]);
            }
        });
        $('#slider4').range2DSlider({
            template:'horizontal',
            value:[[a,0]],
            width:410,
            showLegend:false,
            round:true,
            axis:[[-5,5]],
            printLabel:function(val){
                return parseInt(val[0]);
            }
        });
        $('#slider5').range2DSlider({
            template:'horizontal',
            value:[[b,0]],
            width:410,
            showLegend:false,
            round:true,
            axis:[[-5,5]],
            printLabel:function(val){
                return parseInt(val[0]);
            }
        });
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
    }
}
function div3(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
    }
}
if(isMob){
    //reset
    $('#renew').on('touchstart',renew);
    /*全屏事件*/
    $('#scale').on('touchstart',scalef);
    /*on/off事件*/
    $('#div1').on('touchstart',div1);
    $('#div2').on('touchstart',div2);
    $('#div3').on('touchstart',div3);
}else{
    //reset
    $('#renew').on('click',renew);
    /*全屏事件*/
    $('#scale').on('click',scalef);
    /*on/off事件*/
    $('#div1').on('click',div1);
    $('#div2').on('click',div2);
    $('#div3').on('click',div3);

}



