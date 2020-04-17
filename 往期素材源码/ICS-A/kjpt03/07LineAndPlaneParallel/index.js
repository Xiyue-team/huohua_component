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
var conHeight = $("#controlContainer").height();
var showheight = $(".showheight").height();
var h2Height = $("#controlContainer h2").height();
var h2MarginTop = parseInt($("#controlContainer h2").css("margin-top"));
var marginTop = (conHeight - showheight)/2;
$(".showheight").css("margin-top",marginTop - h2Height - h2MarginTop);

var fullScreen=0,$threeCon = $('#threeContainer'),$obj = $('#threeContainer'),threeWidth = $obj.width(),threeHeight = $obj.height();


var widthT = $("#threeContainer").width();
var heightT = $("#threeContainer").height();

var grid = true;
var group = new THREE.Group();
var sphere1=null;
var sphere2=null;
var a1=null,a2=null,b1=null,b2=null,c1=null,c2=null,d1=null,d2=null;
var dynamic = false;


var canWebgl = ( function () {
    try {
        var canvas = document.createElement( 'canvas' );
        return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
    } catch ( e ) {
        return false;
    }
} )();

var getParameter = {
    angleJson:[],
    angle1:0,
    height:300,
    length:500,
    abc:300,
    angle:0
};

var threeDimension = {
    init:function(){
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.getJson(getParameter.length/2);
        threeDimension.createGrid();
        threeDimension.createLine1();
        threeDimension.createLine2();

    },
    createScene:function(){
        threeDimension.scene = new THREE.Scene();
        threeDimension.scene.position.z=200;
        threeDimension.camera = new THREE.PerspectiveCamera(45, widthT / heightT, 1, 10000);
        threeDimension.camera.position.x = 1200;
        threeDimension.camera.position.y = 1200;
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
        threeDimension.renderer.setClearColor(0xeeeeee);
        threeDimension.renderer.setSize(widthT,heightT);
        $("#threeContainer").append(threeDimension.renderer.domElement);
    },
    createControls:function(){
        threeDimension.controls = new THREE.OrbitControls( threeDimension.camera, threeDimension.renderer.domElement );
        threeDimension.controls.enableDamping = true;
        threeDimension.controls.dampingFactor = 0.25;
        threeDimension.controls.enableZoom = true;
    },
    vec3:function(x,y,z){
        return new THREE.Vector3(x, y, z);
    },
    createGrid:function (){
        if(threeDimension.grid){
            threeDimension.scene.remove(threeDimension.grid);
        }
        threeDimension.grid = new THREE.Object3D();
        var geometry = new THREE.Geometry();
        var size=500, bottom = - 0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( {color : 0x949494, transparent: true, opacity: 0.9} );
        for(var i = 0;i < 21;i ++){
            geometry.vertices.push( threeDimension.vec3( - size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, size ) );
        }
        var grid = new THREE.Line( geometry, lineMaterial,1 );
        var text = threeDimension.createText("α",-420,25,420,"#000000");

        threeDimension.grid.add(grid,text);
        threeDimension.grid.position.z=-200;
        threeDimension.scene.add(threeDimension.grid);
    },
    createText:function(texts,x,y,z,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x,y,z);
        return text;
    },
    getJson:function(length){
        var x,y;
        getParameter.angleJson = [];
        x = Math.round(length*Math.cos(getParameter.angle1));
        y = Math.round(length*Math.sin(getParameter.angle1));
        getParameter.angleJson.push([x,0,y]);
    },

    createLine:function(length,color,angle){
        var line = new THREE.Object3D();
        var l = 3;
        var material = new THREE.MeshBasicMaterial({color:color, side:THREE.DoubleSide, transparent:true,opacity:0.9});
        var plane1 = new THREE.PlaneGeometry(length,l,4,4);
        var mesh1 = new THREE.Mesh(plane1,material);
        mesh1.position.z = -l/2;

        var plane2 = new THREE.PlaneGeometry(length,l,4,4);
        var mesh2 = new THREE.Mesh(plane2,material);
        mesh2.position.z = l/2;

        var plane3 = new THREE.PlaneGeometry(length,l,4,4);
        var mesh3 = new THREE.Mesh(plane3,material);
        mesh3.rotation.x = Math.PI/2;
        mesh3.position.y = l/2;

        var plane4 = new THREE.PlaneGeometry(length,l,4,4);
        var mesh4 = new THREE.Mesh(plane4,material);
        mesh4.rotation.x = Math.PI/2;
        mesh4.position.y = -l/2;

        line.add(mesh1,mesh2,mesh3,mesh4);
        line.rotation.y = angle;
        return line;
    },
    createLine1:function(){
        if(threeDimension.line1){
            threeDimension.scene.remove(threeDimension.line1);
        }
        threeDimension.line1 = new THREE.Object3D();
        var json = getParameter.angleJson;
        var line = threeDimension.createLine(getParameter.length,0x52c518,getParameter.angle1);
        var text = threeDimension.createText("l",json[0][0]+25,20,-json[0][2]+25,"#000000");
        threeDimension.line1.add(line,text);
        threeDimension.line1.position.z = -getParameter.height;
        threeDimension.line1.position.y = getParameter.height;
        threeDimension.scene.add(threeDimension.line1);
    },
    createLine2:function(){
        if(threeDimension.line2){
            threeDimension.scene.remove(threeDimension.line2);
        }
        threeDimension.line2 = new THREE.Object3D();
        var json = getParameter.angleJson;
        var line = threeDimension.createLine(getParameter.length+300,0xff0100,getParameter.angle1);
        var text = threeDimension.createText("l1",json[0][0]+25,20,-json[0][2]+25,"#000000");
        threeDimension.line2.add(line,text);
        threeDimension.line2.position.y = 0;
        threeDimension.line2.position.x = 0;
        //threeDimension.scene.add(threeDimension.line2);
    },
    createPlane:function(length){
        if(threeDimension.group1){
            threeDimension.scene.remove(threeDimension.group1);
        }
        var json = [[-300,length,-length],[-300,getParameter.height+50,-getParameter.height-50],[300,length,-length],[300,getParameter.height+50,-getParameter.height-50]];
        var geom = new THREE.Geometry();
        for(var i=0;i<4;i++){
            geom.vertices.push(threeDimension.vec3(json[i][0],json[i][1],json[i][2]));
        }
        geom.faces.push(new THREE.Face3(0,1,3));
        geom.faces.push(new THREE.Face3(3,1,0));
        geom.faces.push(new THREE.Face3(0,3,2));
        geom.faces.push(new THREE.Face3(2,3,0));
        geom.computeFaceNormals();
        var materials = [new THREE.MeshBasicMaterial({color:'#d66c6c',opacity:0.5,transparent:true})];
        threeDimension.plane1 = new THREE.SceneUtils.createMultiMaterialObject(geom,materials);
        threeDimension.plane1text = threeDimension.createText("β",json[1][0]+20,json[1][1]+20,json[1][2],"#000000");
        threeDimension.group1=new THREE.Group();
        var g=new THREE.Group();
        threeDimension.plane1.position.z=300;
        threeDimension.plane1.position.y=-300;
        threeDimension.plane1text.position.z=40;
        threeDimension.plane1text.position.y=40;
        g.add(threeDimension.plane1);
        g.add(threeDimension.plane1text);
        // threeDimension.group1.add(threeDimension.line1);
        threeDimension.group1.add(g)
        g.position.z=-300;
        g.position.y=300;
        threeDimension.scene.add(threeDimension.group1);
        //threeDimension.scene.add(threeDimension.group1);
        //threeDimension.scene.add(threeDimension.plane1);
        //threeDimension.scene.add(threeDimension.plane1text);

    },
    dynamical:function(){
        a1=setInterval(function(){
            getParameter.abc-=2;
            if(getParameter.abc<=0){
                clearInterval(a1);
                for(var i=0;i<threeDimension.line1.children[0].children.length;i++){
                    threeDimension.line1.children[0].children[i].material.color = new THREE.Color("red");
                }
                threeDimension.scene.add(threeDimension.line2);
            }
            threeDimension.createPlane(getParameter.abc);
        },10);

    }

};

threeDimension.init();

function renderAll(){
    threeDimension.controls.update();

    if(getParameter.checked1){
        $('#formula').css('display','block');

    }else{
        $('#formula').css('display','none');
    }
    requestAnimationFrame(renderAll);
    threeDimension.renderer.render(threeDimension.scene,threeDimension.camera);
}
renderAll();

function reset(){
    if(!grid){
        grid = !grid;
        threeDimension.scene.add(threeDimension.grid);
    }
    for(var i=0;i<threeDimension.line1.children[0].children.length;i++){
        threeDimension.line1.children[0].children[i].material.color = new THREE.Color("green");
    }
    getParameter.abc=300;
    clearInterval(a1);
    $('.slider').css('visibility','hidden');
    threeDimension.scene.remove(threeDimension.group1);
    threeDimension.scene.remove(threeDimension.line2);
    threeDimension.scene.add(threeDimension.line1);
    if($('#div1').hasClass('on')){
        $('#div1').removeClass('on').addClass('off');
        $('#div1').find('.span2').text('' +'off')
    }
    $('#slider1').range2DSlider({
        template:'horizontal',
        value:[[45,0]],
//        onlyGridPoint:true,
        round:true,
//        width:383,
        axis:[[45,135]],
        showLegend:false,
    });
    $('.slider1 .sliderLeft').css('width','0px');
    threeDimension.line2.position.z=0;
}

$('#slider1').on('change',function(){
    var s = parseInt(this.value);
    getParameter.angle = (s-45)*Math.PI/180;
    threeDimension.group1.children[0].rotation.x=getParameter.angle;
    if(getParameter.angle<Math.PI/2){
        var z=-300+300*Math.tan(Math.PI/2- s*Math.PI/180);
    }else{
        var z=-300-300*Math.tan(s*Math.PI/180-Math.PI/2);
    }
    threeDimension.line2.position.z=z;
    // threeDimension.line1.rotation.x=getParameter.angle;
});

function div1(){
	if($('#div1').hasClass('on')){
        reset();
        $('#div1').removeClass('on').addClass('off');
        $('#div1').find('.span2').text('' +'off')
    }else{
        threeDimension.dynamical();
        $('.slider').css('visibility','visible');
        $('#slider1').range2DSlider({
            template:'horizontal',
            value:[[45,0]],
//        onlyGridPoint:true,
            round:true,
            width:383,
            axis:[[45,135]],
            showLegend:false
        });
        $('#div1').removeClass('off').addClass('on');
        $('#div1').find('.span2').text('' +'on')
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
	$("#renew").on('touchstart',function(){
	    reset();
	    threeDimension.camera.position.set(1200,1200,1200);
	});
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	$('#div1').on('click',div1);
	$("#renew").on('click',function(){
	    reset();
	    threeDimension.camera.position.set(1200,1200,1200);
	});
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
