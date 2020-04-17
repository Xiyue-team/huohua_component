
var scale = 1;
var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
var isMob = /iPad|Android/g.test(navigator.userAgent),offsetLeft=0,offsetTop=0;
var $body = $("body");
// if(isMob){
    var bodyScale = scale = bodyWidth/1920;
    $('.body').css("zoom",bodyScale).height(1200);
    var marginTop = ($body.width()/bodyWidth*bodyHeight-1200)/2;
    $('.body').css("margin-top",'-600px');
    $('#threeContainer').css({'right':686*scale,left:33*scale,top:(69*scale + (bodyHeight-1200*scale)/2 ),bottom:(69*scale + (bodyHeight-1200*scale)/2 )});
// }else{
//     scale = 0.6667;
//     $(".body").css({"zoom":0.6667,"margin-top":'0',"top":'0'});
//     $('#threeContainer').css({'right':686*scale,left:33*scale,top:(69*scale ),bottom:(69*scale)});
// }

offsetLeft = parseInt($('#threeContainer').offset().left);
offsetTop = parseInt($('#threeContainer').offset().top);
$('body').css('background','#000');

$('.zoom').css("zoom",scale);
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

var dashcircle1=null;
var dashcircle2=null;
var lineAC=null;
var lineCB=null;
var lineCD=null;
var lineOD=null;
var lineAD=null;
var lineBD=null;
var textA=null;
var textB=null;
var textC=null;
var textD=null;
var textO=null;
var aa=2;
var group1=null;
var group2=null;
var group3=null;
var fullScreen=0,$threeCon = $('#threeContainer'),$obj = $('#threeContainer'),threeWidth = $obj.width(),threeHeight = $obj.height();


function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var $obj = $('#threeContainer'),
        threeHeight = $obj.height(),
        threeWidth = $obj.width();

    var array1=[[0,0,0],[500,0,0],[500,500,0],[0,500,0]]; //A/B/C/D
    var array2=[[350,230,0],[265,350,0],[150,265,0],[230,150,0]]; //E/F/G/H


    $('.verticalCenter').css('margin-top',($('#controlContainer').height() -119 - $('.verticalCenter').height() )/2);

    var thiz = this;
    var sphere1=null,sphere2=null,selectobjs=[],selectobj=null,text=null;
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
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);


        this.createControls();

        this.createAllLine();

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
        // this.controls.enablePan =false;
    };
    this.createDashCircle=function(){
        if(dashcircle1!=null){
            this.scene.remove(dashcircle1);
        }
        if(dashcircle2!=null){
            this.scene.remove(dashcircle2);
        }
        var geometryLine1 = new THREE.Geometry();
        var geometryLine2 = new THREE.Geometry();
        var vertices1 = [];
        var vertices2 = [];
        for(var i=-5;i<=5;i+=0.01){
            var resulty=Math.pow((25-Math.pow(i,2)),1/2);
            vertices1.push(new THREE.Vector3(i*100,resulty*100,0));
            vertices2.push(new THREE.Vector3(i*100,-resulty*100,0));
        }
        geometryLine1.vertices = vertices1;
        geometryLine2.vertices = vertices2;
        geometryLine1.computeLineDistances();
        geometryLine2.computeLineDistances();
//        var dashlinetext =createText("z=2x+3y",vertices3[length1].x-50,vertices3[length1].y,0,"#ff0000");
        dashcircle1 = new THREE.Line(geometryLine1,new THREE.LineDashedMaterial( { color: 0x0000ff,opacity:0.9, dashSize: 5, gapSize: 5 } ));
        dashcircle2 = new THREE.Line(geometryLine2,new THREE.LineDashedMaterial( { color: 0x0000ff,opacity:0.9, dashSize: 5, gapSize: 5 } ));
        this.scene.add(dashcircle1);
        this.scene.add(dashcircle2);
    };
    this.createText=function(){
        if(textA!=null){
            this.scene.remove(textA);
            this.scene.remove(textB);
            this.scene.remove(textC);
            this.scene.remove(textD);
            this.scene.remove(textO);
        }
        var resulty=Math.pow((25-Math.pow(aa,2)),1/2);
        textA=createText("A",-520,10,0,"#000000");
        textB=createText("B",520,10,0,"#000000");
        textC=createText("C",aa*100+20,30,0,"#000000");
        textD=createText("D",aa*100,resulty*100+40,0,"#000000");
        textO=createText("O",0,30,0,"#000000");
        this.scene.add(textA);
        this.scene.add(textB);
        this.scene.add(textC);
        this.scene.add(textD);
        this.scene.add(textO);
    };
    this.createlineAC=function(){
        if(lineAC!=null){
            this.scene.remove(lineAC)
        }
        var vertices1=[];
        lineAC=new THREE.Object3D();
        vertices1.push(vec3(-500,0,0));
        vertices1.push(vec3(aa*100,0,0));
        var geometryLine1 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        var line1 = new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: 0x00ff00}));
        var textac =createText("a",(-500+aa*100)/2,-20,0,"#000000");
        lineAC.add(line1,textac);
        this.scene.add(lineAC);
    };
    this.createlineCB=function(){
        if(lineCB!=null){
            this.scene.remove(lineCB)
        }
        var vertices1=[];
        lineCB=new THREE.Object3D();
        vertices1.push(vec3(500,0,0));
        vertices1.push(vec3(aa*100,0,0));
        var geometryLine1 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        var line1 = new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: 0xff0000}));
        var textbc =createText("b",(500+aa*100)/2,-20,0,"#000000");
        lineCB.add(line1,textbc);
        this.scene.add(lineCB);
    };
    this.createlineCD=function(){
        if(lineCD!=null){
            this.scene.remove(lineCD)
        }
        var resulty =Math.pow((25-Math.pow(aa,2)),1/2);
        var vertices1=[];
        lineCD=new THREE.Object3D();

        vertices1.push(vec3(aa*100,resulty*100,0));
        vertices1.push(vec3(aa*100,0,0));
        var geometryLine1 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        var line1 = new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: 0xffA500}));
//        var textcd =createText("",aa*100-40,resulty*100/2,0,"#000000");
        lineCD.add(line1);
        this.scene.add(lineCD);
    };
    this.createText1=function(){
        if(group2!=null){
            this.scene.remove(group2);
            this.scene.remove(group3);
        }
        var resulty=Math.pow((25-Math.pow(aa,2)),1/2);
        var text1 =createText("√",aa*100-43,resulty*100/2-5,0,"#000000");
        var text2 =createText("—",aa*100-25,resulty*100/2+13,0,"#000000");
        var text3 =createText("ab",aa*100-25,resulty*100/2-5,0,"#000000");
        var dashlinetext1 =createText("a+b",aa*100/2-40,resulty*100/2+20,0,"#000000");
        var dashlinetext2 =createText("____",aa*100/2-40,resulty*100/2+15,0,"#000000");
        var dashlinetext3 =createText("2",aa*100/2-40,resulty*100/2-10,0,"#000000");
        group2=new THREE.Group();
        group3=new THREE.Group();
        group2.add(text1,text2,text3);
        group3.add(dashlinetext1,dashlinetext2,dashlinetext3);
        this.scene.add(group2);
        this.scene.add(group3);
    };
    this.removeText=function(){
        if(group1!=null){
            this.scene.remove(group1);
            this.scene.remove(group2);
            this.scene.remove(group3);
            this.scene.remove(lineOD);
            this.scene.remove(lineCD);
            this.scene.remove(lineAC);
            this.scene.remove(lineCB);
        }
    };
    this.createLineOD=function(){
        if(lineOD!=null){
            this.scene.remove(lineOD)
        }
        lineOD=new THREE.Object3D();
        var resulty=Math.pow((25-Math.pow(aa,2)),1/2);
        var geometryLine1 = new THREE.Geometry();
        var vertices1 = [];
        vertices1.push(vec3(aa*100,resulty*100,0));
        vertices1.push(vec3(0,0,0));
        geometryLine1.vertices = vertices1;
        geometryLine1.computeLineDistances();
//        var dashlinetext =createText("",aa*100/2-40,resulty*100/2,0,"#000000");
        var dashline = new THREE.Line(geometryLine1,new THREE.LineDashedMaterial( { color: 0x0000ff,opacity:0.9, dashSize: 5, gapSize: 5 } ));
        lineOD.add(dashline);
        this.scene.add(lineOD);
    };
    this.createLineADB=function(){
        if(lineAD!=null){
            this.scene.remove(lineAD);
            this.scene.remove(lineBD);
        }
        var resulty=Math.pow((25-Math.pow(aa,2)),1/2);
        var vertices1=[];
        var vertices2=[];
        vertices1.push(vec3(-500,0,0));
        vertices1.push(vec3(aa*100,resulty*100,0));
        vertices2.push(vec3(aa*100,resulty*100,0));
        vertices2.push(vec3(500,0,0));
        var geometryLine1 = new THREE.Geometry();
        var geometryLine2 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        geometryLine2.vertices = vertices2;
        lineAD = new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: 0x0000ff}));
        lineBD = new THREE.LineSegments(geometryLine2, new THREE.LineBasicMaterial({color: 0x0000ff}));
        this.scene.add(lineAD);
        this.scene.add(lineBD);
    };
    this.createAngle=function(){
        if(group1!=null){
            this.scene.remove(group1);
        }
//        var vertices1=[vec3(-15,15,0),vec3(15,15,0)];
//        var vertices2=[vec3(15,15,0),vec3(15,-15,0)];
//        var vertices3=[vec3(15,-15,0),vec3(-15,-15,0)];
//        var vertices4=[vec3(-15,-15,0),vec3(-15,15,0)];
        var vertices1=[vec3(0,0,0),vec3(0,30,0)];
        var vertices2=[vec3(0,0,0),vec3(30,0,0)];
        var vertices3=[vec3(30,30,0),vec3(0,30,0)];
        var vertices4=[vec3(30,30,0),vec3(30,0,0)];
        var geometryLine1 = new THREE.Geometry();
        var geometryLine2 = new THREE.Geometry();
        var geometryLine3 = new THREE.Geometry();
        var geometryLine4 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        geometryLine2.vertices = vertices2;
        geometryLine3.vertices = vertices3;
        geometryLine4.vertices = vertices4;
        var line1 = new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: 0x0000ff}));
        var line2 = new THREE.LineSegments(geometryLine2, new THREE.LineBasicMaterial({color: 0x0000ff}));
        var line3 = new THREE.LineSegments(geometryLine3, new THREE.LineBasicMaterial({color: 0x0000ff}));
        var line4 = new THREE.LineSegments(geometryLine4, new THREE.LineBasicMaterial({color: 0x0000ff}));
        group1=new THREE.Group();
        group1.add(line1,line2,line3,line4);
        var resulty=Math.pow((25-Math.pow(aa,2)),1/2);
        var tanB=resulty/(5-aa);
        var B=Math.atan(tanB)*180/Math.PI;
        group1.position.x=aa*100;
        group1.position.y=resulty*100;
        group1.rotation.z=-(B*Math.PI/180+Math.PI/2);
        this.scene.add(group1);

    };
    this.createAllLine=function(){
        this.createDashCircle();
        this.createText();
        this.createlineAC();
        this.createlineCB();
        this.createlineCD();
        this.createLineOD();
        this.createLineADB();
        this.createAngle();
        this.createText1();
    };
    this.reback=function(){
        aa=2;
        this.createAllLine();
        $('#slider1').range2DSlider({
            template:'horizontal',
            value:[[2,0]],
//        onlyGridPoint:true,
//        round:true,
//        width:383,
            axis:[[-5,5]],
            showLegend:false
        });
        $('.slider1 .sliderLeft').css('width','267px');
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
    function createText(texts,x,y,z,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '25px "Arial"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.position.set(x,y,z);
        return text;
    }
}


var threeDimensional = new ThreeDimensional();
threeDimensional.int();

renderAll();
function renderAll(){

//    threeDimensional.controls.update();

    requestAnimationFrame(renderAll);

    threeDimensional.renderer.render(threeDimensional.scene,threeDimensional.camera);

}
$('#slider1').on('change',function(){
    var s = parseInt(this.value);
    if(s==-5){
       aa=-4;
    }else if(s==5){
        aa=4;
    }
    else{
        aa=s;
    }
    threeDimensional.createAllLine();
});

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

var $turnDiv = $('.turnDiv'), $turnRight = $('.turnRight');
function turnRight(){
    if($(this).parent().hasClass('on')){
        $(this).parent().removeClass('on').addClass('off');
        $(this).parent().find('.span2').text('' +'off');
    }else{
        $(this).parent().removeClass('off').addClass('on');
        $(this).parent().find('.span2').text('' +'on');
    }
}
function renew(){
    $turnDiv.removeClass('on').addClass('off');
    $turnDiv.find('.span2').text('' +'off');
    threeDimensional.reback();
}
if(isMob){
	$turnRight.on('touchstart',turnRight);
	$('#renew').on('touchstart',renew);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	$turnRight.on('click',turnRight);
	$('#renew').on('click',renew);
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