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
var r=1,x0=0,y0=0,aa=-1,bb=0,cc=1;
var circle=null;
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
        this.createAllLine();
        this.createAngle();
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
        if(circle!=null){
            this.scene.remove(circle);
            this.scene.remove(text2);
        }
        circle=new THREE.Group();
        var circle1 = createMesh(new THREE.TorusGeometry(r*50,0.1,2,200),"#F55B23");
        var circle2 = createMesh(new THREE.TorusGeometry(5,5,20,20),"#60B6F1");
        circle.add(circle1,circle2);
        text2=createText("A",x0*50-20,y0*50+20,0,"#000000");
        this.scene.add(circle,text2);
        circle.position.x=x0*50;
        circle.position.y=y0*50;

    };
    this.createLine=function(){
        if(line1!=null){
            this.scene.remove(line1);
            this.scene.remove(text1);
        }
        if(aa==0&&bb==0){
            return;
        }
        var A=aa*10;
        var B=bb*10;
        var C=cc*10;
        var vertices1=[];
        var vertices2=[];
        if(B==0){
            vertices1.push(vec3((-C/A)*50,-550,1));
            vertices1.push(vec3((-C/A)*50,550,1));
        }
        else{
            vertices1.push(vec3(-500,((-A*(-10)/B)-C/B)*50,1));
            vertices1.push(vec3(500,((-A*(10)/B)-C/B)*50,1));
        }
        var geometryLine1 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        line1 = new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: 0x7ED321}));
        text1=createText("l",-220,((-A*(-4)/B)-C/B)*50,0,"#000000");
        this.scene.add(line1,text1);
    };
    this.createAllLine=function(){
        if(dashline!=null){
            this.scene.remove(dashline);
        }
        if(aa==0&&bb==0){
            return;
        }
        dashline=new THREE.Group();
        var vertices1=[];
        var b=y0-(bb/aa)*x0;
        var resultx=((-cc/bb)-b)/(bb/aa+aa/bb);
        var resulty=0;
        if(aa==0){
            resultx=x0;
            resulty=(-aa*resultx/bb)-cc/bb;
            vertices1.push(vec3(x0*50,((-aa*x0/bb)-cc/bb)*50,0));
        }else if(bb==0){
            resultx=x0;
            resulty=(-aa*resultx/bb)-cc/bb;
            vertices1.push(vec3((-cc/aa)*50,y0*50,0));
        }
        else{
            resulty=(-aa*resultx/bb)-cc/bb;
            vertices1.push(vec3(resultx*50,((-aa*resultx/bb)-cc/bb)*50,0));
        }
        vertices1.push(vec3(x0*50,y0*50,0));
        var geometryLine1 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        geometryLine1.computeLineDistances();
        var dashlinemesh = new THREE.Line(geometryLine1,new THREE.LineDashedMaterial( { color: 0xff0000,opacity:0.9, dashSize: 5, gapSize: 5 } ));
        var text1=createText("P",resultx*50+30,resulty*50+20,0,"#000000");
        if((-aa*x0/bb)-cc/bb!=y0){
            dashline.add(dashlinemesh,text1);
        }
        else{
            dashline.add(dashlinemesh);
        }
        this.scene.add(dashline);





    };
    this.createAngle=function(){
        if(linegroup!=null){
            this.scene.remove(linegroup);
        }
        if(aa==0&&bb==0){
            return;
        }
        if((-aa*x0/bb)-cc/bb==y0){
            return;
        }
        linegroup=new THREE.Group();
        var vertices1=[];
        var vertices2=[];
        var b=y0-(bb/aa)*x0;
        var resultx=((-cc/bb)-b)/(bb/aa+aa/bb);
        if(aa==0){
            resultx=x0;
        }else if(bb==0){
            resultx=-cc/aa;
        }
        else{

        }
        vertices1.push(vec3(15,0,0));
        vertices1.push(vec3(15,15,0));
        vertices2.push(vec3(0,15,0));
        vertices2.push(vec3(15,15,0));
        var geometryLine1 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        var linemesh1 = new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: 0x000000}));
        var geometryLine2 = new THREE.Geometry();
        geometryLine2.vertices = vertices2;
        var linemesh2 = new THREE.LineSegments(geometryLine2, new THREE.LineBasicMaterial({color: 0x000000}));
        linegroup.add(linemesh1,linemesh2);
        this.scene.add(linegroup);
        linegroup.position.x=resultx*50;
        if(bb==0){
            linegroup.position.y=y0*50;
        }
        else{
            linegroup.position.y=((-aa*resultx/bb)-cc/bb)*50;
        }

        var k=-aa/bb;
        var angle1=Math.atan(k);
        linegroup.rotation.z=angle1;
        if(y0<(-aa*resultx/bb)-cc/bb){
            linegroup.rotation.z=angle1-Math.PI/2;
        }
    };
    this.showresult=function(){
        $('#result2').html(r);
        var A=aa*10;
        var B=bb*10;
        var C=cc*10;
        var d=0;
        if(A==0&&B==0){
            $('#result1').html("");
        }
        else{
            if(A==0){
                d=Math.abs(y0-(-C/B));
            }
            else if(B==0){
                d=Math.abs(x0-(-C/A));
            }
            else{
                d=(Math.abs(A*x0+B*y0+C))/Math.pow((Math.pow(A,2)+Math.pow(B,2)),1/2);
            }
            d=parseFloat(d).toFixed(2);
            $('#result1').html(d);
        }

        if(d>r){
            $('#result3').html("相离");
        }
        else if(d==r){
            $('#result3').html("相切");
        }
        else{
            $('#result3').html("相交");
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
    r=s2;
    three.createCircle();
    three.showresult();
});
$("#slider2").change(function(){
    var s2 = parseInt(this.value);
    x0=s2;
    three.createCircle();
    three.createAllLine();
    three.createAngle();
    three.showresult();
});
$("#slider3").change(function(){
    var s2 = parseInt(this.value);
    y0=s2;
    three.createCircle();
    three.createAllLine();
    three.createAngle();
    three.showresult();
});
$("#slider4").change(function(){
    var s2 = parseFloat(this.value).toFixed(1);
    var string = s2.slice(-1);
    if(string == 0){
        s2=parseInt(s2);
    }
    aa= s2;
    three.createLine();
    three.createAllLine();
    three.createAngle();
    three.showresult();



    if(bb==0&&aa==0){
        cc=0;
        $('#slider6').range2DSlider({
            template:'horizontal',
            value:[[0,0]],
            width:410,
            showLegend:false,
//        round:true,
            axis:[[-5,5]],
            printLabel:function(val){
                var ss= parseFloat(val[0]).toFixed(1);
                var string = ss.slice(-1);
                if(string == 0){
                    ss=parseInt(ss);
                }
                return ss;
            }
        });
        $('.slider6 .sliderLeft').css('width','205px');
    }
});
$("#slider5").change(function(){
    var s2 = parseFloat(this.value).toFixed(1);
    var string = s2.slice(-1);
    if(string == 0){
        s2=parseInt(s2);
    }
    bb= s2;
    three.createLine();
    three.createAllLine();
    three.createAngle();
    three.showresult();
    if(bb==0&&aa==0){
        cc=0;
        $('#slider6').range2DSlider({
            template:'horizontal',
            value:[[0,0]],
            width:410,
            showLegend:false,
//        round:true,
            axis:[[-5,5]],
            printLabel:function(val){
                var ss= parseFloat(val[0]).toFixed(1);
                var string = ss.slice(-1);
                if(string == 0){
                    ss=parseInt(ss);
                }
                return ss;
            }
        });
        $('.slider6 .sliderLeft').css('width','205px');
    }
});
$("#slider6").change(function(){
    if(bb==0&&aa==0){
        cc=0;
        $('#slider6').range2DSlider({
            template:'horizontal',
            value:[[0,0]],
            width:410,
            showLegend:false,
//        round:true,
            axis:[[-5,5]],
            printLabel:function(val){
                var ss= parseFloat(val[0]).toFixed(1);
                var string = ss.slice(-1);
                if(string == 0){
                    ss=parseInt(ss);
                }
                return ss;
            }
        });
        $('.slider6 .sliderLeft').css('width','205px');
        $('.slider6 .xdsoft_range2dslider_runner').css('left','205px');
        return;
    }
    var s2 = parseFloat(this.value).toFixed(1);
    var string = s2.slice(-1);
    if(string == 0){
        s2=parseInt(s2);
    }
    cc= s2;
    three.createLine();
    three.createAllLine();
    three.createAngle();
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
    r=1;
    x0=0;
    y0=0;
    aa=-1;
    bb=0;
    cc=1;
    three.createLine();
    three.createCircle();
    three.createAllLine();
    three.createAngle();
    three.showresult();
    if($('#div1').parent().parent().hasClass('off')){
        $('#div1').parent().parent().removeClass('off').addClass('on');
        $('#div1').parent().parent().find('.span2').text('' +'on');
    }
    if($('#div2').parent().parent().hasClass('on')){
        $('#div2').parent().parent().removeClass('on').addClass('off');
        $('#div2').parent().parent().find('.span2').text('' +'off');
    }
    if($('#div3').parent().parent().hasClass('on')){
        $('#div3').parent().parent().removeClass('on').addClass('off');
        $('#div3').parent().parent().find('.span2').text('' +'off');
    }

    $('.slider1').find('.sliderLeft').css({'width':'0px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
    $('.slider1').find('.xdsoft_slider_label').text('1');
    $('.slider1').attr('value',''+1+'|0');
    $('.slider2').find('.sliderLeft').css({'width':'205px'});
    $('.slider2').find('.xdsoft_range2dslider_runner').css({'left':'205px'});
    $('.slider2').find('.xdsoft_slider_label').text('0');
    $('.slider2').attr('value',''+0+'|0');
    $('.slider3').find('.sliderLeft').css({'width':'205px'});
    $('.slider3').find('.xdsoft_range2dslider_runner').css({'left':'205px'});
    $('.slider3').find('.xdsoft_slider_label').text('0');
    $('.slider3').attr('value',''+0+'|0');

    $('.slider4').find('.sliderLeft').css({'width':'164px'});
    $('.slider4').find('.xdsoft_range2dslider_runner').css({'left':'164px'});
    $('.slider4').find('.xdsoft_slider_label').text('-1');
    $('.slider4').attr('value',''+(-1)+'|0');
    $('.slider5').find('.sliderLeft').css({'width':'164px'});
    $('.slider5').find('.xdsoft_range2dslider_runner').css({'left':'164px'});
    $('.slider5').find('.xdsoft_slider_label').text('0');
    $('.slider5').attr('value',''+0+'|0');
    $('.slider6').find('.sliderLeft').css({'width':'245px'});
    $('.slider6').find('.xdsoft_range2dslider_runner').css({'left':'245px'});
    $('.slider6').find('.xdsoft_slider_label').text('1');
    $('.slider6').attr('value',''+1+'|0');
    three.camera.position.x = 0;
    three.camera.position.y = 0;
    three.camera.position.z = 1400;
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
            value:[[r,0]],
            width:410,
            round:true,
            onlyGridPoint:true,
            axis:[[1,2,3]],
            printLabel:function(val){
                return parseInt(val[0]);
            }
        });
        $('#slider2').range2DSlider({
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
        $('#slider3').range2DSlider({
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
        $('#slider4').range2DSlider({
            template:'horizontal',
            value:[[aa,0]],
            width:410,
            showLegend:false,
//        round:true,
            axis:[[-5,5]],
            printLabel:function(val){
                var ss= parseFloat(val[0]).toFixed(1);
                var string = ss.slice(-1);
                if(string == 0){
                    ss=parseInt(ss);
                }
                return ss;
            }
        });
        $('#slider5').range2DSlider({
            template:'horizontal',
            value:[[bb,0]],
            width:410,
            showLegend:false,
//        round:true,
            axis:[[-5,5]],
            printLabel:function(val){
                var ss= parseFloat(val[0]).toFixed(1);
                var string = ss.slice(-1);
                if(string == 0){
                    ss=parseInt(ss);
                }
                return ss;
            }
        });
        $('#slider6').range2DSlider({
            template:'horizontal',
            value:[[cc,0]],
            width:410,
            showLegend:false,
//        round:true,
            axis:[[-5,5]],
            printLabel:function(val){
                var ss= parseFloat(val[0]).toFixed(1);
                var string = ss.slice(-1);
                if(string == 0){
                    ss=parseInt(ss);
                }
                return ss;
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





