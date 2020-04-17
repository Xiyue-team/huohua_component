/**
 * Created by O2 on 2016/9/6.
 */


var scale = 1;
var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
if(!(bodyWidth == 370 && bodyHeight == 246)) {
    var isMob = /iPad|Android/g.test(navigator.userAgent), offsetLeft = 0, offsetTop = 0;
    var $body = $("body");
    // if (isMob) {
        var bodyScale = scale = bodyWidth / 1920;
        $('.body').css("zoom", bodyScale).height(1200);
        var marginTop = ($body.width() / bodyWidth * bodyHeight - 1200) / 2;
        $('.body').css("margin-top", '-600px');
        $('#threeContainer').css({
            'right': 686 * scale,
            left: 33 * scale,
            top: (69 * scale + (bodyHeight - 1200 * scale) / 2 ),
            bottom: (69 * scale + (bodyHeight - 1200 * scale) / 2 )
        });
    // } else {
    //     scale = 0.6667;
    //     $(".body").css({"zoom": 0.6667, "margin-top": '0', "top": '0'});
    //     $('#threeContainer').css({'right': 686 * scale, left: 33 * scale, top: (69 * scale ), bottom: (69 * scale)});
    // }

    offsetLeft = parseInt($('#threeContainer').offset().left);
    offsetTop = parseInt($('#threeContainer').offset().top);
    $('body').css('background','#000');
    $('#threeContainer').css({'border-radius':10*scale,'box-shadow': 6*scale + 'px '+6*scale +'px '+ 20*scale +'px rgba(0,0,0,0.30)' });

    $('.zoom').css("zoom",scale);
}

//showheight 居中
//var conHeight = $("#controlContainer").height();
//var showheight = $(".showheight").height();
//var h2Height = $("#controlContainer h2").height();
//var h2MarginTop = parseInt($("#controlContainer h2").css("margin-top"));
//var marginTop = (conHeight - showheight)/2;
//$(".showheight").css("margin-top",marginTop - h2Height - h2MarginTop);



//选中操作相关变量
var raycaster = new THREE.Raycaster(),
    plane = new THREE.Plane(),
    offset = new THREE.Vector3(),
    intersection = new THREE.Vector3(),
    mouse = new THREE.Vector2(),
    INTERSECTED = null;
document.onselectstart=function(){
    return false;
};

var selectFunction = 1,radioSelect = 0,move=0;
var aa=60;
var bb=45;
var cc=6;

//var json1=[[0,300,0],[aa*50,300,0]];
//var json2=[[0,150,0],[bb*50,150,0]];
//var json3=[[0,0,0],[50,0,0],[0,0,0],[50*Math.cos(Math.PI/180*cc),50*Math.sin(Math.PI/180*cc),0]];
var line1=null;
var line2=null;
var line3=null;
var line4=null;
var group1=null;
var group2=null;
var texta=null;
var textb=null;
var textA=null;
var textaa=null;
var textbb=null;
var text4=null;
var text5=null;

var a1=null;
var a2=null;
var a3=null;
var a4=null;
var a5=null;

var lastTexta=null;
var lastTextb=null;
var lastTextc=null;
var lastTextA=null;
var lastTextB=null;
var lastTextC=null;

var fullScreen=0,$threeCon = $('#threeContainer'),$obj = $('#threeContainer'),threeWidth = $obj.width(),threeHeight = $obj.height();


function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var $obj = $('#threeContainer'),
        threeHeight = $obj.height(),
        threeWidth = $obj.width();

    var axis={},funcMode=null,funcs=[null,null,null,null];

    $('.verticalCenter').css('margin-top',(threeHeight-119 - $('.verticalCenter').height() - 45)/2);

    var thiz = this;
    var grid=null;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();
    this.renderer = null;
    if(canWebgl){
        this.renderer = new THREE.WebGLRenderer({antialias:true});
    }else{
        this.renderer = new THREE.CanvasRenderer();
    }
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.controls = null;


    this.int = function () {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 1500;
        this.scene.position.x=-100;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);
        this.createControls();
        this.createLine1();
        this.createAngle1();
        this.createAngle2();
        this.createThreeText();
        //changeline2();

    };
    this.objStyle = function (color, fontsize) {
        return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
       this.controls.enableZoom = true;
        this.controls.enableRotate =false;
        this.controls.enablePan =false;
    };
    this.createThreeText=function(){
        texta=createText("A",-100,320,0,"#000000");
        textb=createText("B",-100,170,0,"#000000");
        textA=createText("c",-100,20,0,"#000000");
        this.scene.add(texta);
        this.scene.add(textb);
        this.scene.add(textA);
    };
    this.removeText=function(){
        if(textaa!=null){
            this.scene.remove(textaa)
        }
        if(textbb!=null){
            this.scene.remove(textbb)
        }
        if(texta!=null){
            this.scene.remove(texta)
        }
        if(textb!=null){
            this.scene.remove(textb)
        }
        if(textA!=null){
            this.scene.remove(textA)
        }
        if(lastTextA!=null){
            this.scene.remove(lastTextA)
        }
        if(lastTextB!=null){
            this.scene.remove(lastTextB)
        }
        if(lastTextC!=null){
            this.scene.remove(lastTextC)
        }
        if(lastTexta!=null){
            this.scene.remove(lastTexta)
        }
        if(lastTextb!=null){
            this.scene.remove(lastTextb)
        }
        if(lastTextc!=null){
            this.scene.remove(lastTextc)
        }
    };
    this.createLine1=function(){
        if(line1){
            this.scene.remove(line1)
        }
        if(textaa){
            this.scene.remove(textaa)
        }
        var vertices1=[];
        vertices1.push(vec3(-cc*25,0,0));
        vertices1.push(vec3(cc*25,0,0));
        var geometryLine1 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        line1 = new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: 0x000000}));
        textaa =createText(cc,cc*50/2,-10,0,"#000000");
        line1.position.x=cc*25;
        this.scene.add(line1);
        this.scene.add(textaa);
    };
    this.createAngle1=function(){
        if(group1){
            this.scene.remove(group1)
        }
        if(text4){
            this.scene.remove(text4)
        }
        var vertices1=[];
        var vertices2=[];
        vertices1.push(vec3(0,0,0));
        vertices1.push(vec3(50,0,0));
        vertices2.push(vec3(0,0,0));
        vertices2.push(vec3(50*Math.cos(Math.PI/180*aa),50*Math.sin(Math.PI/180*aa),0));
        var geometryLine1 = new THREE.Geometry();
        var geometryLine2 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        geometryLine2.vertices = vertices2;
        var line11=new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: 0x000000}));
        var line22=new THREE.LineSegments(geometryLine2, new THREE.LineBasicMaterial({color: 0x000000}));
        text4=createText(aa+"°",45,35,0,"#000000");
        group1=new THREE.Group();
        group1.add(line11,line22,text4);
        group1.position.y=300;
        this.scene.add(group1);

    };
    this.createAngle2=function(){
        if(group2){
            this.scene.remove(group2)
        }
        if(text5){
            this.scene.remove(text5)
        }
        var vertices1=[];
        var vertices2=[];
        vertices1.push(vec3(0,0,0));
        vertices1.push(vec3(50,0,0));
        vertices2.push(vec3(0,0,0));
        vertices2.push(vec3(50*Math.cos(Math.PI/180*bb),50*Math.sin(Math.PI/180*bb),0));
        var geometryLine1 = new THREE.Geometry();
        var geometryLine2 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        geometryLine2.vertices = vertices2;
        var line11=new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: 0x000000}));
        var line22=new THREE.LineSegments(geometryLine2, new THREE.LineBasicMaterial({color: 0x000000}));
        text5=createText(bb+"°",45,35,0,"#000000");
        group2=new THREE.Group();
        group2.add(line11,line22,text5);
        group2.position.y=150;
        this.scene.add(group2);
    };
    this.dynamic=function(){
        this.removeText();
        if(a1!=null){
            clearInterval(a1)
        }
        var num1=0;
        var num2=0;
        a1=setInterval(function(){
            num1+=10;
            // num2+=(cc*25-0)/40;
            if(num1>=400){
                clearInterval(a1);
                line1.position.x=cc*25;
                line1.position.y=-400;
                changeAngle1();
                return;
            }
            // line1.position.x=cc*25+num2;
            line1.position.y=0-num1;
        },50);
    };
    this.clearall=function(){
        if(a1!=null){
            clearInterval(a1)
        }
        if(a2!=null){
            clearInterval(a2)
        }
        if(a3!=null){
            clearInterval(a3)
        }
        if(a4!=null){
            clearInterval(a4)
        }
        if(a5!=null){
            clearInterval(a5)
        }
    };
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
                dashSize: 20,
                gapSize: 20
            }));
        }else if( style == 3){
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }
        return lineMesh;
    }
    function changeAngle2(){
        var changex=0+cc*50;
        var changey=550;
        var num1=0;
        var num2=0;
        var num3=0;
        if(a2!=null){
            clearInterval(a2)
        }
        a2=setInterval(function(){
            num1+=changex/10;
            num2+=changey/10;
            if(num1>=changex){
                clearInterval(a2);
                group2.position.x=cc*50;
                group2.position.y=150-changey;
                createLineC();
                createLastText();
                return;
            }
            group2.position.x=num1;
            group2.position.y=150-num2;
        },50)
    }
    function changeAngle1(){
        var changex=0;
        var changey=700;
        var num1=0;
        var num2=0;
        if(a3!=null){
            clearInterval(a3)
        }
        a3=setInterval(function(){
            num1+=changex/10;
            num2+=changey/10;
            if(num2>=changey){
                clearInterval(a3);
                group1.position.x=changex;
                group1.position.y=300-changey;
                group2.rotation.y=Math.PI;
                changeAngle2();
                return;
            }
            group1.position.x=num1;
            group1.position.y=300-num2;
        },50)
    }
    function createLineC(){
        var C=180-aa-bb;
        var resultb=Math.sin(Math.PI/180*bb)/Math.sin(Math.PI/180*C)*cc;
        var x1=0+(resultb*50*Math.cos(Math.PI/180*aa));
        var y1=-400+(resultb*50*Math.sin(Math.PI/180*aa));
        var vertice3=[];
        var vertice4=[];
        vertice3.push(vec3(0,-400,0));
        vertice3.push(vec3(x1,y1,0));
        vertice4.push(vec3(cc*50,-400,0));
        vertice4.push(vec3(x1,y1,0));
        var geometryLine3 = new THREE.Geometry();
        var geometryLine4 = new THREE.Geometry();
        geometryLine3.vertices = vertice3;
        geometryLine4.vertices = vertice4;
        line3 = new THREE.LineSegments(geometryLine3, new THREE.LineBasicMaterial({color: 0x000000}));
        line4 = new THREE.LineSegments(geometryLine4, new THREE.LineBasicMaterial({color: 0x000000}));
        thiz.scene.add(line3);
        thiz.scene.add(line4);
    }
    function createLastText(){
        var C=180-aa-bb;
        var resultb=Math.sin(Math.PI/180*bb)/Math.sin(Math.PI/180*C)*cc;
        var x1=0+(resultb*50*Math.cos(Math.PI/180*aa));
        var y1=-400+(resultb*50*Math.sin(Math.PI/180*aa));
        lastTexta=createText("a",(cc*50+x1)/2+10,(-400+y1)/2+20,0,"#000000");
        lastTextb=createText("b",(0+x1)/2-10,(-400+y1)/2+20,0,"#000000");
        lastTextc=createText("c",cc*25,-420,0,"#000000");
        lastTextA=createText("A",-20,-410,0,"#000000");
        lastTextB=createText("B",cc*50+20,-410,0,"#000000");
        lastTextC=createText("C",x1,y1+20,0,"#000000");
        thiz.scene.add(lastTexta);
        thiz.scene.add(lastTextb);
        thiz.scene.add(lastTextc);
        thiz.scene.add(lastTextA);
        thiz.scene.add(lastTextB);
        thiz.scene.add(lastTextC);
    }
    function vec3(x,y,z){
        return new THREE.Vector3(x, y, z);
    }
    function createText(texts,x,y,z,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '25px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.position.set(x,y,z);
        return text;
    }
    function createMesh(geom,color){//对象和材质融合，创建路径对象
        var wireFrameMat = new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:0.9});
        var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [ wireFrameMat]);
        return mesh;
    }
}


var threeDimensional = new ThreeDimensional();
threeDimensional.int();

renderAll();
function renderAll(){
    threeDimensional.controls.update();
    requestAnimationFrame(renderAll);
    threeDimensional.renderer.render(threeDimensional.scene,threeDimensional.camera);
}
function reset(){
    if($('#div1').hasClass('on')){
        $('#div1').removeClass('on').addClass('off');
        $('#div1').find('.span2').text('' +'off')
    }
    $('.slider1 .sliderLeft').css('width','127px');
    $('.slider2 .sliderLeft').css('width','94px');
    $('.slider3 .sliderLeft').css('width','101px');
    $('.showtruth').css('display','none');
    $('#slider1').range2DSlider({
        template:'horizontal',
        value:[[60,0]],
//        onlyGridPoint:true,
//        round:true,
//        width:383,
        axis:[[1,179]],
        showLegend:false,
        printLabel:function(val){
            var ss= parseInt(val[0])
            var result=ss+"°";
            return result;
        }

    });
    $('#slider2').range2DSlider({
        template:'horizontal',
        value:[[45,0]],
//        onlyGridPoint:true,
//        round:true,
        axis:[[1,179]],
        showLegend:false,
        printLabel:function(val){
            var ss= parseInt(val[0])
            var result=ss+"°";
            return result;
        }
    });
    $('#slider3').range2DSlider({
        template:'horizontal',
        value:[[6,0]],
//        onlyGridPoint:true,
//        round:true,
        axis:[[1,20]],
        showLegend:false,
        printLabel:function(val){
            var ss= parseInt(val[0])
            var result=ss;
            return result;
        }
    });
    aa=60;
    bb=45;
    cc=6;
    threeDimensional.removeText();
    threeDimensional.clearall();
    threeDimensional.scene.remove(line1);
    threeDimensional.scene.remove(line2);
    threeDimensional.scene.remove(line3);
    threeDimensional.scene.remove(line4);
    threeDimensional.scene.remove(group1);
    threeDimensional.scene.remove(group2);
    threeDimensional.int();


}


function div1(){
    if($(this).hasClass('on')){
        $(this).removeClass('on').addClass('off');
        $(this).find('.span2').text('' +'off')
    }else{
        $(this).removeClass('off').addClass('on');
        $(this).find('.span2').text('' +'on')
    }
}
$('#slider1').on('change',function(){
    $('.showtruth').css('display','none');
    threeDimensional.clearall();
    threeDimensional.removeText();
    threeDimensional.scene.remove(line1);
    threeDimensional.scene.remove(line2);
    threeDimensional.scene.remove(line3);
    threeDimensional.scene.remove(line4);
    threeDimensional.scene.remove(group1);
    threeDimensional.scene.remove(group2);
    threeDimensional.int();
    var s = parseInt(this.value);
    aa= s;
    threeDimensional.createAngle1();
});
$('#slider2').on('change',function(){
    $('.showtruth').css('display','none');
    threeDimensional.clearall();
    threeDimensional.removeText();
    threeDimensional.scene.remove(line1);
    threeDimensional.scene.remove(line2);
    threeDimensional.scene.remove(line3);
    threeDimensional.scene.remove(line4);
    threeDimensional.scene.remove(group1);
    threeDimensional.scene.remove(group2);
    threeDimensional.int();
    var s = parseInt(this.value);
    bb= s;
    threeDimensional.createAngle2();
});
$('#slider3').on('change',function(){
    $('.showtruth').css('display','none');
    threeDimensional.clearall();
    threeDimensional.removeText();
    threeDimensional.scene.remove(line1);
    threeDimensional.scene.remove(line2);
    threeDimensional.scene.remove(line3);
    threeDimensional.scene.remove(line4);
    threeDimensional.scene.remove(group1);
    threeDimensional.scene.remove(group2);
    threeDimensional.int();
    var s = parseInt(this.value);
    cc= s;
    threeDimensional.createLine1();
});

function renew(){
    reset();
    threeDimensional.camera.position.set(0,0,1500);
}
function dynamic(){
    if(aa+bb>=180){
        $('.showtruth').css('display','block');
    }
    else{
        threeDimensional.clearall();
        threeDimensional.removeText();
        threeDimensional.scene.remove(line1);
        threeDimensional.scene.remove(line2);
        threeDimensional.scene.remove(line3);
        threeDimensional.scene.remove(line4);
        threeDimensional.scene.remove(group1);
        threeDimensional.scene.remove(group2);
        threeDimensional.int();
        threeDimensional.dynamic();
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
	$('#div1').on('touchstart',div1);
	$("#renew").on('touchstart',renew);
	$(".dynamic").on('touchstart',dynamic);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	$('#div1').on('click',div1);
	$("#renew").on('click',renew);
	$(".dynamic").on('click',dynamic);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}

//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});

