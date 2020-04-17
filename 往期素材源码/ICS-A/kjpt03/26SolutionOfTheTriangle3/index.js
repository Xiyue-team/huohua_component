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
var aa=3;
var bb=4;
var cc=6;

var line1=null;
var line2=null;
var line3=null;
var line4=null;
var group1=null;
var texta=null;
var textb=null;
var textc=null;
var textaa=null;
var textbb=null;
var textcc=null;


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
        this.createLine2();
        this.createLine3();
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
        texta=createText("a",-100,320,0,"#000000");
        textb=createText("b",-100,170,0,"#000000");
        textc=createText("c",-100,20,0,"#000000");
        this.scene.add(texta);
        this.scene.add(textb);
        this.scene.add(textc);
    };
    this.removeText=function(){
        if(textaa!=null){
            this.scene.remove(textaa)
        }
        if(textbb!=null){
            this.scene.remove(textbb)
        }
        if(textcc!=null){
            this.scene.remove(textcc)
        }
        if(texta!=null){
            this.scene.remove(texta)
        }
        if(textb!=null){
            this.scene.remove(textb)
        }
        if(textc!=null){
            this.scene.remove(textc)
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
        if(line1!=null){
            this.scene.remove(line1)
        }
        if(textaa!=null){
            this.scene.remove(textaa)
        }
        var vertices1=[];
        vertices1.push(vec3(-aa*25,0,0));
        vertices1.push(vec3(aa*25,0,0));
        var geometryLine1 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        line1 = new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: 0x000000}));
        textaa =createText(aa,aa*50/2,290,0,"#000000");
        line1.position.x=aa*25;
        line1.position.y=300;
        this.scene.add(line1);
        this.scene.add(textaa);
    };
    this.createLine2=function(){
        if(line2!=null){
            this.scene.remove(line2)
        }
        if(textbb!=null){
            this.scene.remove(textbb)
        }
        var vertices2=[];
        vertices2.push(vec3(-bb*25,0,0));
        vertices2.push(vec3(bb*25,0,0));
        var geometryLine2 = new THREE.Geometry();
        geometryLine2.vertices = vertices2;
        line2 = new THREE.LineSegments(geometryLine2, new THREE.LineBasicMaterial({color: 0x000000}));
        textbb =createText(bb,bb*50/2,140,0,"#000000");
        line2.position.x=bb*25;
        line2.position.y=150;
        this.scene.add(line2);
        this.scene.add(textbb);
    };
    this.createLine3=function(){
        if(line3!=null){
            this.scene.remove(line3)
        }
        if(textcc!=null){
            this.scene.remove(textcc)
        }
        var vertices1=[];
        vertices1.push(vec3(-cc*25,0,0));
        vertices1.push(vec3(cc*25,0,0));
        var geometryLine1 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        line3=new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: 0x000000}));
        textcc =createText(cc,cc*50/2,-10,0,"#000000");
        line3.position.x=cc*25;
        this.scene.add(line3);
        this.scene.add(textcc);

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
            num2+=cc*25/40;
            if(num1>=400){
                clearInterval(a1);
                line3.position.x=-0;
                line3.position.y=-400;
                changeline2();
                return;
            }
            line3.position.x=cc*25-num2;
            line3.position.y=0-num1;
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
    function changeline2(){
        var result1=(Math.pow(bb,2)+Math.pow(cc,2)-Math.pow(aa,2))/(2*bb*cc);
        var A=Math.acos(result1)*180/Math.PI;
        var changex=bb*25-bb*25*Math.cos(Math.PI/180*A)+cc*25;
        var changey=150-bb*25*Math.sin(Math.PI/180*A)+400;
        var num1=0;
        var num2=0;
        var num3=0;
        a2=setInterval(function(){
            num1+=(Math.PI/180*A)/10;
            if(num1>=Math.PI/180*A){
                clearInterval(a2);
                line2.rotation.z=A*Math.PI/180;
                a3=setInterval(function(){
                    num2+=changex/10;
                    num3+=changey/10;
                    if(num2>=changex){
                        clearInterval(a3);
                        line2.position.x=bb*25-changex;
                        line2.position.y=150-changey;
                        changeline1();
                        return;
                    }
                    line2.position.x=bb*25-num2;
                    line2.position.y=150-num3;
                },50);
                return;
            }
            line2.rotation.z=num1;
        },50);

    }
    function changeline1(){
        var B=Math.acos((Math.pow(cc,2)+Math.pow(aa,2)-Math.pow(bb,2))/(2*aa*cc))*180 /Math.PI;
        var x1=aa*25+aa*25*Math.cos(Math.PI/180*B);
        var y1=300-aa*25*Math.sin(Math.PI/180*B);
        var x2=cc*25;
        var y2=-400;
        var changex=x1-x2;
        var changey=y1-y2;
        var num1=0;
        var num2=0;
        var num3=0;
        a4=setInterval(function(){
            num1+=(Math.PI/180*B)/10;
            if(num1>=Math.PI/180*B){
                clearInterval(a4);
                line1.rotation.z=-(Math.PI/180*B);
                a5=setInterval(function(){
                    num2+=changex/20;
                    num3+=changey/20;
                    if(num3>changey){
                        clearInterval(a5);
                        line1.position.x=aa*25-changex;
                        line1.position.y=300-changey;
                        createLastText();
                        return;
                    }
                    line1.position.x=aa*25-num2;
                    line1.position.y=300-num3;
                },50);
                return;
            }
            line1.rotation.z=-num1;
        },50)

    }

    function createLastText(){
        var result1=(Math.pow(bb,2)+Math.pow(cc,2)-Math.pow(aa,2))/(2*bb*cc);
        var A=Math.acos(result1)*180/Math.PI;
        var x1=-cc*25+(bb*50*Math.cos(Math.PI/180*A));
        var y1=-400+(bb*50*Math.sin(Math.PI/180*A));
        lastTexta=createText("a",(cc*25+x1)/2+20,(-400+y1)/2+20,0,"#000000");
        lastTextb=createText("b",(-cc*25+x1)/2-20,(-400+y1)/2+20,0,"#000000");
        lastTextc=createText("c",0,-420,0,"#000000");
        lastTextA=createText("A",-cc*25-20,-400-20,0,"#000000");
        lastTextB=createText("B",cc*25+20,-400-20,0,"#000000");
        lastTextC=createText("C",x1-20,y1+20,0,"#000000");
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
    $('.showtruth').css('display','none');
    $('.slider1 .sliderLeft').css('width','40px');
    $('.slider2 .sliderLeft').css('width','60px');
    $('.slider3 .sliderLeft').css('width','127px');
    $('#slider1').range2DSlider({
        template:'horizontal',
        value:[[3,0]],
//        onlyGridPoint:true,
//        round:true,
//        width:383,
        axis:[[1,20]],
        showLegend:false,
        printLabel:function(val){
            var ss= parseInt(val[0])
            var result=ss;
            return result;
        }
    });
    $('#slider2').range2DSlider({
        template:'horizontal',
        value:[[4,0]],
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
    aa=3;
    bb=4;
    cc=6;
    threeDimensional.removeText();
    threeDimensional.clearall();
    threeDimensional.scene.remove(line1);
    threeDimensional.scene.remove(line2);
    threeDimensional.scene.remove(line3);
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
    threeDimensional.int();
    var s = parseInt(this.value);
    aa= s;
    threeDimensional.createLine1();
});
$('#slider2').on('change',function(){
    $('.showtruth').css('display','none');
    threeDimensional.clearall();
    threeDimensional.removeText();
    threeDimensional.scene.remove(line1);
    threeDimensional.scene.remove(line2);
    threeDimensional.scene.remove(line3);
    threeDimensional.int();
    var s = parseInt(this.value);
    bb= s;
    threeDimensional.createLine2();
});
$('#slider3').on('change',function(){
    $('.showtruth').css('display','none');
    threeDimensional.clearall();
    threeDimensional.removeText();
    threeDimensional.scene.remove(line1);
    threeDimensional.scene.remove(line2);
    threeDimensional.scene.remove(line3);
    threeDimensional.int();
    var s = parseInt(this.value);
    cc= s;
    threeDimensional.createLine3();
});

function renew(){
    reset();
    threeDimensional.camera.position.set(0,0,1500);
}
function dynamic(){
    if(aa+bb<=cc||aa+cc<=bb||cc+bb<=aa){
        $('.showtruth').css('display','block')
    }
    else{
        threeDimensional.clearall();
        threeDimensional.removeText();
        threeDimensional.scene.remove(line1);
        threeDimensional.scene.remove(line2);
        threeDimensional.scene.remove(line3);
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


