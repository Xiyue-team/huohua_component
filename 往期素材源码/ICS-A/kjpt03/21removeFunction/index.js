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

var selectFunction = 1,radioSelect = 0,move=0,valueLeft=0,valueTop=0;
var shadeText =['y = f(x) + k','y = f(x + k)'];
var fullScreen=0,$threeCon = $('#threeContainer'),$obj = $('#threeContainer'),threeWidth = $obj.width(),threeHeight = $obj.height();


function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var $obj = $('#threeContainer'),
        threeHeight = $obj.height(),
        threeWidth = $obj.width();

    var axis={},funcMode=[null,null,null,null],funcs=[null,null,null,null];

    $('.verticalCenter').css('margin-top',($('#controlContainer').height() -119 - $('.verticalCenter').height() )/2);


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
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
       // this.createGrid();
        this.createAxis();

        countFunction()

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
    this.clickEve = function(){
        for(var i=0;i<funcs.length;i++){
            funcs[i].visible =false;
        }
        funcs[selectFunction-1].visible = true;

    };
    this.clickEveM = function(){
        for(var i=0;i<funcMode.length;i++){
            funcMode[i].visible =false;
        }
        funcMode[selectFunction-1].visible = true;
    };
    this.moveEve = function(){
        if(radioSelect == 2){
            funcs[selectFunction-1].position.x = valueLeft*50;
        }else{
            funcs[selectFunction-1].position.y = valueTop*50;
        }
    };
    this.positionReback = function(){
        for(var i=0;i<funcs.length;i++){
            funcs[i].position.x = 0;
            funcs[i].position.y = 0;
        }
    };
    this.reback = function(){
        for(var i=0;i<funcs.length;i++){
            funcs[i].visible = false;
            funcMode[i].visible = false;
        }
        funcs[0].visible = true;
        funcMode[0].visible = true;
        this.camera.position.z = 1500;

    };

    function countFunction(){
        var i,array=[],y;

        for(i=-5;i<5;){
            y=Math.pow(i,2);
            if(y<=10&&y>=-10){
                array.push(new THREE.Vector3(i*50, y*50, 0));
            }
            i = i+1;
        }

        var curve = new THREE.CatmullRomCurve3(array);
        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        var material = new THREE.LineBasicMaterial({color : '#1161c8'});
        funcs[0] = new THREE.Line(geometry, material);
        thiz.scene.add(funcs[0]);
        // funcs[0].visible = false;


        curve = new THREE.CatmullRomCurve3(array);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineDashedMaterial({
            color : '#d0021b',
            opacity: 0.8,
            dashSize: 200,
            gapSize: 200
        });
        funcMode[0] = new THREE.Line(geometry, material);
        thiz.scene.add(funcMode[0]);
        // funcMode[0].visible = false;


        array=[];
        for(i=-10;i<5;){
            y=Math.pow(2,i);
            if(y<=10&&y>=-10){
                array.push(new THREE.Vector3(i*50, y*50, 0));
            }
            i = i+0.1;
        }
        curve = new THREE.CatmullRomCurve3(array);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : '#1161c8'});
        funcs[1] = new THREE.Line(geometry, material);
        thiz.scene.add(funcs[1]);
        funcs[1].visible = false;

        curve = new THREE.CatmullRomCurve3(array);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineDashedMaterial({
            color : '#d0021b',
            opacity: 0.8,
            dashSize: 200,
            gapSize: 200
        });
        funcMode[1] = new THREE.Line(geometry, material);
        thiz.scene.add(funcMode[1]);
        funcMode[1].visible = false;

        array=[];
        for(i=-6;i<6;){
            y=2*i;
            if(y<=10&&y>=-10){
                array.push(new THREE.Vector3(i*50, y*50, 0));
            }

            i = i+1;
        }

        curve = new THREE.CatmullRomCurve3(array);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : '#1161c8'});
        funcs[2] = new THREE.Line(geometry, material);
        thiz.scene.add(funcs[2]);
        funcs[2].visible = false;

        curve = new THREE.CatmullRomCurve3(array);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineDashedMaterial({
            color : '#d0021b',
            opacity: 0.8,
            dashSize: 200,
            gapSize: 200
        });
        funcMode[2] = new THREE.Line(geometry, material);
        thiz.scene.add(funcMode[2]);
        funcMode[2].visible = false;


        array=[];
        funcs[3] = new THREE.Group();
        funcMode[3] = new THREE.Group();
        for(i=-10;i<0;){
            y= Math.pow(i,-1);
            if(y<=10&&y>=-10){
                array.push(new THREE.Vector3(i*50, y*50, 0));
            }

            i = i+0.1;
        }
        curve = new THREE.CatmullRomCurve3(array);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : '#1161c8'});
        var line  = new THREE.Line(geometry, material);
        funcs[3].add(line);

        curve = new THREE.CatmullRomCurve3(array);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineDashedMaterial({
            color : '#d0021b',
            opacity: 0.8,
            dashSize: 200,
            gapSize: 200
        });
        line  = new THREE.Line(geometry, material);
        funcMode[3].add(line);

        array=[];
        for(i=0.001;i<10;){
            y= Math.pow(i,-1);
            if(y<=10&&y>=-10){
                array.push(new THREE.Vector3(i*50, y*50, 0));
            }

            i = i+0.1;
        }
        curve = new THREE.CatmullRomCurve3(array);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : '#1161c8'});
        line  = new THREE.Line(geometry, material);
        funcs[3].add(line);
        thiz.scene.add(funcs[3]);
        funcs[3].visible = false;

        curve = new THREE.CatmullRomCurve3(array);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineDashedMaterial({
            color : '#d0021b',
            opacity: 0.8,
            dashSize: 200,
            gapSize: 200
        });
        line  = new THREE.Line(geometry, material);
        funcMode[3].add(line);
        thiz.scene.add(funcMode[3]);
        funcMode[3].visible = false;



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
            text = new SpriteText2D(i/50, textStyle);

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
        // text = new SpriteText2D('x', textStyle);
        // text.position.x = stop+100;
        // text.position.y = -15;
        // axis.add(text);

        // label y axis:
        textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for( i = start; i <= stop; i = i+stepSize) {
            if(i == 0){ continue;}
            text = new SpriteText2D(i/50, textStyle);
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
        // text = new SpriteText2D('y', textStyle);
        // text.position.x = -15;
        // text.position.y = stop+100;
        // text.position.z = 0.2;
        // axis.add(text);
    }
    function vec3(x,y,z){
        return new THREE.Vector3(x, y, z);
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

var $optionChoose = $('.optionChoose'),$slider1 = $('.slider1'),$radio = $('.radios');

function clickEve1(){
    if(!radioSelect){ return;}
    if($(this).parent().hasClass('on')){
        $(this).parent().removeClass('on').addClass('off');
        $(this).parent().find('.span2').text('' +'off')
    }else{
        $(this).parent().removeClass('off').addClass('on');
        $(this).parent().find('.span2').text('' +'on')
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
    $optionChoose.html($(this).html());
    selectFunction = parseInt($('.option.choose').attr('data-id'));
    threeDimensional.clickEveM();
    valueLeft = valueTop =0;
    $('.selectChoose').removeClass('open');
    $radio.find('.radiocircle').removeClass('select');
    $slider1.css('visibility','hidden');
    $('.xdsoft_slider_label').css('display','none');
    $('.turn1').removeClass('on').addClass('off');
    threeDimensional.clickEve();
    threeDimensional.positionReback();
    returnRange();
    radioSelect = 0;
}


function radioChoose(){
    var value =parseInt($(this).attr('data-id'));
    if(radioSelect == value){
        $radio.find('.radiocircle').removeClass('select');
        $slider1.css('visibility','hidden');
        $('.xdsoft_slider_label').css('display','none');
        radioSelect =0;
        $('.turn1').removeClass('on').addClass('off');
    }else{
        $radio.find('.radiocircle').removeClass('select');
        $(this).find('.radiocircle').addClass('select');
        radioSelect = parseInt($(this).attr('data-id'));
        $slider1.css('visibility','visible');
        $('.xdsoft_slider_label').css('display','block');
        returnRange();
        $('.turnShade img').attr('src','images/'+radioSelect+'.png');
    }
}


$('#slider1').change(function(){
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]);
    if(radioSelect == 1){
        valueTop  = value;
    }else if(radioSelect == 2){
        valueLeft = value;
    }
    threeDimensional.moveEve();
});

function returnRange(){
    move =0;
    var value=0;
    if(radioSelect == 1){
        value = valueTop;
    }else if(radioSelect == 2){
        value = valueLeft;
    }else{
        value = 0;
    }
    $('#slider1').attr('value',''+value+'|0');
    $('.xdsoft_slider_label').text(''+value);
    var perLength = 410/20;
    value = value+10;
    var left = parseInt(perLength*value);
    $('.xdsoft_range2dslider_runner ').css('left',left);
    $('.sliderLeft').css('width',left);
}
function renew(){
    radioSelect = valueLeft = valueTop = 0;
    selectFunction =1;
    returnRange();
    $slider1.css('visibility','hidden');
    $('.xdsoft_slider_label').css('display','none');
    $optionChoose.html('<p><img src="images/i1.png" class="img1" /></p>');
    $('.option').removeClass('choose').eq(0).addClass('choose');
    $('.turn1').removeClass('on').addClass('off').find('.span2').text('' +'off');
    $('.radioChoose .radios .radiocircle').removeClass('select');
    threeDimensional.positionReback();
    threeDimensional.reback();
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
	$('#div2').on('touchstart',clickEve1);
	$('.optionChoose,.arrow').on('touchstart',optionChoose);
	$('.option').on('touchstart',option);
	$('.radioChoose .radios').on('touchstart',radioChoose);
	$('#renew').on('touchstart',renew);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	$('#div2').on('click',clickEve1);
	$('.optionChoose,.arrow').on('click',optionChoose);
	$('.option').on('click',option);
	$('.radioChoose .radios').on('click',radioChoose);
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




