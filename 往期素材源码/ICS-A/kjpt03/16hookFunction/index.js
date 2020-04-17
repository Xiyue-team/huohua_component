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
    $('body').css('background', '#000');
    $('#threeContainer').css({
        'border-radius': 10 * scale,
        'box-shadow': 6 * scale + 'px ' + 6 * scale + 'px ' + 20 * scale + 'px rgba(0,0,0,0.30)'
    });


    $('.zoom').css("zoom", scale);
}
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

var selectFunction = 1,valueA=1,valueB=1;
var opened=1,select1=1,select2=0,select3=0,select4 =0;
var fullScreen=0,$threeCon = $('#threeContainer'),$obj = $('#threeContainer'),threeWidth = $obj.width(),threeHeight = $obj.height();


function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var $obj = $('#threeContainer'),
        threeHeight = $obj.height(),
        threeWidth = $obj.width();

    var axis={},funcs=[null,null,null],textA=null,textB=null;

    $('.verticalCenter').css('margin-top',($('#controlContainer').height() -119 - $('.verticalCenter').height() )/2);

    var thiz = this;
    var grid=null,textA=null,textB=null;
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
       // this.createGrid();
        this.createAxis();

        countFunction();

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
    this.createGrid = function(){
        var geometry = new THREE.Geometry(), bottom = -0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( { color: 0x949494, transparent: true, opacity: 0.5 } );
        for ( var i = 0; i <= 20; i ++ ) {
            geometry.vertices.push( new THREE.Vector3( - 1000, bottom, i * step - 1000 ) );
            geometry.vertices.push( new THREE.Vector3(   1000, bottom, i * step - 1000 ) );

            geometry.vertices.push( new THREE.Vector3(i * step - 1000, bottom, -1000));
            geometry.vertices.push( new THREE.Vector3( i * step - 1000, bottom,  1000 ) );
        }
        grid = new THREE.LineSegments( geometry, lineMaterial, THREE.LinePieces );
        this.scene.add( grid );
        window.gridColor = 0x303030;
        grid.rotation.x = Math.PI/2;
    };
    this.createAxis = function(){
        axis = new THREE.Group();
        labelAxis(-500, 50, 500);
        drawAxisArrow(vec3( -600, 0, 0 ), vec3( 600, 0, 0 ), 0x000000,1);
        drawAxisArrow(vec3( 0, -600, 0 ), vec3( 0, 600, 0 ), 0x000000,2);
        this.scene.add( axis);
    };
    this.reback = function(){
        createline0();
        createLine1();
        createLine2();
        createAB();
        for(var i=0;i<funcs.length;i++){
            funcs[i].visible = false;
        }

        funcs[0].visible = true;
        this.camera.position.z = 1500;
        textA.visible = textB.visible = false;
    };
    this.changeRange = function(){

        createline0();
        createLine1();
        createLine2();
        createAB();

        funcs[0].visible = funcs[1].visible = funcs[2].visible = textA.visible = textB.visible = false ;

        if(select1 ){
            funcs[0].visible = true;
        }
        if(select2){
            funcs[1].visible = true;
        }
        if(select3){
            funcs[2].visible = true;
        }
        if(select4){
            textA.visible = true;
            textB.visible = true;
        }

    };
    this.clickEve = function(){
        if(opened == 1){//打开
            if(selectFunction == 4){
                createAB();
            }else{
                funcs[selectFunction-1].visible = true;
            }
        }else if(opened == 2){
            if(selectFunction == 4){
               textA.visible =  textB.visible = false;
            }else{
                funcs[selectFunction-1].visible = false;
            }
        }


    };

    function countFunction(){

        createline0();
        createLine1();
        createLine2();
        funcs[0].visible = true;
        funcs[1].visible = false;
        funcs[2].visible = false;

    }
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
    function drawAxisArrow(origin, dir, _color,style){
        var vertices = [];

        vertices.push(new THREE.Vector3(origin.x,origin.y,origin.z));
        vertices.push(new THREE.Vector3(dir.x,dir.y,dir.z));

        var line = createLineMesh(vertices,'#000',3);
        axis.add(line);

        if(style == 1){
            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,-5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }else{

            vertices = [];
            vertices.push(new THREE.Vector3(5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(-5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);

        }
        // line = createLineMesh()

    }
    function labelAxis(start, stepSize, stop) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={},line=null,vertices=null;
        // label x axis:
        textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/10, textStyle);

            if(i == 0){
                text.position.x = i - 10;
            }else{
                text.position.x = i;
            }

            text.position.y = -15;
            axis.add(text);

            vertices = [];

            vertices.push(new THREE.Vector3(i,0,0));
            vertices.push(new THREE.Vector3(i,10,0));

            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }

        textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for( i = start; i <= stop; i = i+stepSize) {
            if(i == 0){ continue;}
            text = new SpriteText2D(i/10, textStyle);
            text.position.x = -30;
            text.position.y = i+10;
            text.position.z = 0.2;
            axis.add(text);

            vertices = [];

            vertices.push(new THREE.Vector3(0,i,0));
            vertices.push(new THREE.Vector3(-10,i,0));

            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }

    }
    function vec3(x,y,z){
        return new THREE.Vector3(x, y, z);
    }

    function createline0(){
        if(funcs[0] != undefined){
            thiz.scene.remove(funcs[0]);
        }

        if(valueA==0&&valueB==0){
            return;
        }

        var i,y,array=[];
        array = [];
        funcs[0] = new THREE.Group();
        for(i=-50;i<= 0;){
            y= valueA*i + valueB/i;
            if(y<=50&&y>=-50){
                array.push(new THREE.Vector3(i*10, y*10, 0));
            }
            i = i+0.01;
        }

        var curve = new THREE.CatmullRomCurve3(array);
        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        var material = new THREE.LineBasicMaterial({color : 'red'});
        var line = new THREE.Line(geometry, material);
        funcs[0].add(line);

        array = [];
        for(i=0;i<= 50;){
            y= valueA*i + valueB/i;
            if(y<=50&&y>=-50){
                array.push(new THREE.Vector3(i*10, y*10, 0));
            }
            i = i+0.01;
        }

        curve = new THREE.CatmullRomCurve3(array);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : 'red'});
        line = new THREE.Line(geometry, material);
        funcs[0].add(line);
        thiz.scene.add(funcs[0]);
    }
    function createLine1(){
        if(funcs[1] != undefined){
            thiz.scene.remove(funcs[1]);
        }
        var i,y,array=[];
        array = [];
        for(i=-50;i<= 50;){
            y= valueA*i;
            if(y<=50&&y>=-50){
                array.push(new THREE.Vector3(i*10, y*10, 0));
            }
            i = i+0.1;
        }

        var curve = new THREE.CatmullRomCurve3(array);
        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        var material = new THREE.LineBasicMaterial({color : '#1161c8'});
        funcs[1] = new THREE.Line(geometry, material);
        thiz.scene.add(funcs[1]);
    }
    function createLine2(){
        if(funcs[2] != undefined){
            thiz.scene.remove(funcs[2]);
        }

        if(valueB==0){
            return;
        }

        var i,y,array=[];
        array = [];
        funcs[2] = new THREE.Group();
        for(i=-50;i<= 0;){
            y= valueB/i;
            if(y<=50&&y>=-50){
                array.push(new THREE.Vector3(i*10, y*10, 0));
            }
            i = i+0.01;
        }

        var curve = new THREE.CatmullRomCurve3(array);
        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        var material = new THREE.LineBasicMaterial({color : '#7ed321'});
        var line = new THREE.Line(geometry, material);
        funcs[2].add(line);

        array = [];
        for(i=0;i<= 50;){
            y= valueB/i;
            if(y<=50&&y>=-50){
                array.push(new THREE.Vector3(i*10, y*10, 0));
            }
            i = i+0.01;
        }

        curve = new THREE.CatmullRomCurve3(array);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : '#7ed321'});
        line = new THREE.Line(geometry, material);
        funcs[2].add(line);
        thiz.scene.add(funcs[2]);
    }
    function createAB(){
        if(textA!=null){
            thiz.scene.remove(textA);
            thiz.scene.remove(textB);
        }
        var value1 = (Math.sqrt(valueB/valueA)).toFixed(1);
        var value2 = (2*Math.sqrt(valueB*valueA)).toFixed(1);
        var textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};
        textA = new SpriteText2D('A('+value1+','+value2+')', textStyle);
        textA.position.x = parseFloat(value1)*10 + 50;
        textA.position.y = parseFloat(value2)*10;
        thiz.scene.add(textA);
        textB = new SpriteText2D('B(-'+value1+',-'+value2+')', textStyle);
        textB.position.x = -parseFloat(value1)*10 + 50;
        textB.position.y = -parseFloat(value2)*10+20;
        thiz.scene.add(textB);

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


var $turnDiv = $('.turnDiv'), $turnRight = $('.turnRight'),$slider = $('.slider');

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

function sliderChange1(){
    var result = $(this).val();
    var value = parseFloat((result.split('|')[0])).toFixed(1);
    valueA = parseFloat(value);
    threeDimensional.changeRange();
}
function sliderChange2(){
    var result = $(this).val();
    var value = parseFloat((result.split('|')[0])).toFixed(1);
    valueB = parseFloat(value);
    threeDimensional.changeRange();
}

$('#slider1').bind('change',sliderChange1);
$('#slider2').bind('change',sliderChange2);

function returnRange(){

    $('#slider1,#slider2').attr('value',''+1+'|0');
    $('.xdsoft_slider_label').text(''+1);

    var perLength = 410;
    var value = 1/30;
    var left = parseInt(perLength*value);
    $('.xdsoft_range2dslider_runner ').css('left',left);
    $('.sliderLeft').css('width',left);
    valueA =valueB = 1;
}
function turnRight(){
	var dataId = $(this).attr('data-id');

    selectFunction = dataId;

    if($(this).parent().hasClass('on')){
        opened = 2;
        $(this).parent().removeClass('on').addClass('off');
        $(this).parent().find('.span2').text('' +'off');
        if(dataId == 1){
            select1 = 0;
        }else if(dataId == 2){
            select2 = 0;
        }else if(dataId == 3){
            select3 = 0;
        }else if(dataId == 4){
            select4 = 0;
        }
    }else{
        opened = 1;
        $(this).parent().removeClass('off').addClass('on');
        $(this).parent().find('.span2').text('' +'on');
        if(dataId == 1){
            select1 = 1;
        }else if(dataId == 2){
            select2 =1;
        }else if(dataId == 3){
            select3 = 1;
        }else if(dataId == 4){
            select4 = 1;
        }
    }
    threeDimensional.clickEve();
}
function renew(){
    returnRange();
    selectFunction = 1;
    $turnDiv.removeClass('on').addClass('off');
    $turnDiv.find('.span2').text('' +'off');

    $('.turn1').removeClass('off').addClass('on');
    $('.turn1').find('.span2').text('' +'on');

    threeDimensional.reback();
    // $('.slider').css('visibility','visible');
    // $('.xdsoft_slider_label').css('display','block');

}
if(isMob){
	$('.turnRight').on('touchstart',turnRight);
	$('#renew').on('touchstart',renew);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	$('.turnRight').on('click',turnRight);
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





