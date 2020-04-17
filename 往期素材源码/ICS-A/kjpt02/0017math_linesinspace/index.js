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



var canWebgl=(function(){
    try {
        var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
    } catch ( e ) {
        return false;
    }
})();

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
     threeWidth= $obj.width();


var valueStyle = 1,timg=0,timgcount=0,changeAngle = 0,oldAngle=0,hasGrid=true,select1=true,select2=false;

function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var thiz = this;


    var samefaceJson = [[-400,0,400],[400,0,-400],[-600,0,200],[200,0,-600]],differentfaceJson =[[-600,500,200],[0,0,-400]];
    var samefaceLine1 = null,samefaceLine2=null,samefaceL1=null,samefaceL2=null,samefaceAngle=null;
    var differentLine2=null,differentL2 = null;
    var group1 = new THREE.Group(), group2 = new THREE.Group();

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
        this.camera.position.x = 1500;
        this.camera.position.y = 1500;
        this.camera.position.z = 1500;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
        this.createGrid();
        //grid.visible =false;

        var vertices = [];
        vertices.push(new THREE.Vector3(samefaceJson[0][0],samefaceJson[0][1],samefaceJson[0][2]));
        vertices.push(new THREE.Vector3(samefaceJson[1][0],samefaceJson[1][1],samefaceJson[1][2]));
        samefaceLine1 = this.createLineMesh(vertices,'#1161c8');
        this.scene.add(samefaceLine1);


        vertices = [];
        vertices.push(new THREE.Vector3(samefaceJson[2][0],samefaceJson[2][1],samefaceJson[2][2]));
        vertices.push(new THREE.Vector3(samefaceJson[3][0],samefaceJson[3][1],samefaceJson[3][2]));
        samefaceLine2 = this.createLineMesh(vertices,'red');
        group1.add(samefaceLine2);


        samefaceL1 = this.createText('l1',[samefaceJson[0][0],samefaceJson[0][1],samefaceJson[0][2]],'#000');
        this.scene.add(samefaceL1);

        samefaceL2 = this.createText('l2',[samefaceJson[2][0],samefaceJson[2][1],samefaceJson[2][2]],'#000');
        group1.add(samefaceL2);

        samefaceAngle = this.createText('0°',[(samefaceJson[2][0]+samefaceJson[3][0])/2+1,(samefaceJson[2][1]+samefaceJson[3][1])/2+0.5,(samefaceJson[2][2]+samefaceJson[3][2])/2+1],'#000');
        group1.add(samefaceAngle);
        samefaceAngle.visible = false;

        this.scene.add(group1);


        vertices = [];
        vertices.push(new THREE.Vector3(differentfaceJson[0][0],differentfaceJson[0][1],differentfaceJson[0][2]));
        vertices.push(new THREE.Vector3(differentfaceJson[1][0],differentfaceJson[1][1],differentfaceJson[1][2]));
        differentLine2 = this.createLineMesh(vertices,'red');
        group2.add(differentLine2);


        differentL2 = this.createText('l2',[differentfaceJson[0][0],differentfaceJson[0][1],differentfaceJson[0][2]],'#000');
        group2.add(differentL2);
        group2.rotation.y = Math.PI/2;
        group2.visible =false;

        this.scene.add(group2);


    };
    this.objStyle = function (color, fontsize) {
        return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
    };
    this.createLineMesh = function (vertices, color, style) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        geometryLine.vertices = vertices;
        if (!color) {
            color = '#000';
        }
        if (!style) {
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        } else {
            geometryLine.computeLineDistances();
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 5,
                gapSize: 5
            }));
        }
        return lineMesh;
    };
    this.createText = function (content, coordinate, color,ischange) {
        if (!color) {
            color = '#000';
        }
        var fontsize = '40px Cambria Math';

        var textStyle = this.objStyle(color, fontsize),
            text = new SpriteText2D(content, textStyle),x,y,z;


        if(ischange){
            text.position.set(coordinate[0], coordinate[1], coordinate[2]);
        }else{
            if(coordinate[0]>0){ x = coordinate[0]+30;}else{x = coordinate[0]-30; }
            if(coordinate[1]>0){ y = coordinate[1]+30;}else{y = coordinate[1]-30; }
            if(coordinate[2]>0){ z = coordinate[2]+30;}else{z = coordinate[2]-30; }
            text.position.set(x, y, z);
        }

        return text;
    };
    this.createCube = function(coordinate,radius,length){
        var cubeG = new THREE.CylinderGeometry(radius,radius,length,3,3,false);
        var cubeM = new THREE.MeshBasicMaterial({color: '#00b050'});
        var cube = new THREE.Mesh(cubeG,cubeM);
        cube.position.x = coordinate[0];
        cube.position.y = coordinate[1];
        cube.position.z = coordinate[2];
        cube.rotation.z = Math.PI/2;
        return cube;
    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
    };
    this.createGrid = function(){
        var geometry = new THREE.Geometry(), bottom = -0.001, step = 200;
        var lineMaterial = new THREE.LineBasicMaterial( { color: 0x949494, transparent: true, opacity: 0.5 } );

        for(var i=0;i<=10;i++){
            geometry.vertices.push( new THREE.Vector3( - 1000, bottom, i * step - 1000 ) );
            geometry.vertices.push( new THREE.Vector3(   1000, bottom, i * step - 1000 ) );

            geometry.vertices.push( new THREE.Vector3(i * step - 1000, bottom, -1000));
            geometry.vertices.push( new THREE.Vector3( i * step - 1000, bottom,  1000 ) );
        }


        grid = new THREE.LineSegments( geometry, lineMaterial, THREE.LinePieces );
        this.scene.add( grid );
        window.gridColor = 0x303030;
    };
    this.rotationsamefaceline = function(){
        if(timgcount >= 20){
            clearTimeout(timg);
            timgcount=0;
            if(valueStyle<=3){
                group1.rotation.y = changeAngle;
                oldAngle = changeAngle;
            }else{
                if(valueStyle == 4){
                    group2.rotation.y = Math.PI/2;
                }else{
                    group2.rotation.y = Math.PI/4;
                }
            }
            return;
        }
        timgcount++;

        if(valueStyle == 1){
            samefaceAngle.visible = false;
        }else if(valueStyle == 2){
            samefaceAngle.visible = true;
            samefaceAngle.text = '45°';
        }else if(valueStyle == 3){
            samefaceAngle.visible = true;
            samefaceAngle.text = '90°';
        }

        timg = setTimeout(function(){
            var angle;
            if(valueStyle<=3){
                angle = timgcount*(changeAngle - oldAngle)/20;
                group1.rotation.y = oldAngle+angle;
            }else{
                if(valueStyle == 4){
                    angle = timgcount*(Math.PI/2 - Math.PI/4)/20;
                    group2.rotation.y = Math.PI/4 + angle;
                }else{
                    angle = timgcount*(Math.PI/4 - Math.PI/2)/20;
                    group2.rotation.y = Math.PI/2 + angle;
                }
            }

            thiz.rotationsamefaceline();
        },100);
    };
    this.samefaceShow = function(){
        group2.visible = false;
        group1.visible = true;
        group1.rotation.y = 0;
    };
    this.differentShow = function(){
        group1.visible = false;
        group2.visible = true;
        group2.rotation.y = Math.PI/2;
    };
    this.grid = function(){
        if(hasGrid){
            grid.visible = true;
            hasGrid = false;
        }else{
            grid.visible = false;
            hasGrid = true;
        }

    };
    this.reback = function(){
        group2.visible = false;
        samefaceAngle.visible = false;
        group1.visible = true;
        group1.rotation.y = 0;
        group2.rotation.y = Math.PI/2;
        valueStyle=1;
        timgcount=20;
        clearTimeout(timg);
        timgcount=0;
        oldAngle=0;
        this.camera.position.x = 1500;
        this.camera.position.y = 1500;
        this.camera.position.z = 1500;
    }
}


var threeDimensional = new ThreeDimensional();
threeDimensional.int();


//重置事件
function renderAll(){
    threeDimensional.controls.update();

    if(select2){
        $('.s1').find('.sliderLeft').css({'width':'0px'});
        $('.s1').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
        $('.s1').attr('value',''+0+'|0');
    }

    if(select1){
        $('.s2').find('.sliderLeft').css({'width':'0px'});
        $('.s2').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
        $('.s2').attr('value',''+0+'|0');
    }

    requestAnimationFrame(renderAll);
    threeDimensional.renderer.render(threeDimensional.scene,threeDimensional.camera);
}
renderAll();


$('#slider1').change(function(){

    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;
    
    if(select1){

        if(value == 1){
            valueStyle = 1;
            changeAngle=0;
            threeDimensional.rotationsamefaceline();
        }else if(value == 2){
            valueStyle = 2;
            changeAngle =Math.PI/4;
            threeDimensional.rotationsamefaceline();

        }else if(value == 3){
            valueStyle = 3;
            changeAngle =Math.PI/2;
            threeDimensional.rotationsamefaceline();
        }

    }

});

$('#slider2').change(function(){

    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;

    if(select2){
        if(value == 1){
            valueStyle = 4;
            threeDimensional.rotationsamefaceline();
        }else if(value == 2){
            valueStyle = 5;
            threeDimensional.rotationsamefaceline();
        }
    }
    
});



/*全屏事件*/
var fullScreen=0;
function fullEve(){
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
function renewEve(){
    threeDimensional.reback();
    select2=false;
    select1 = true;

    $('.turn1').removeClass('on').addClass('off');
    $('.turn1').find('.span2').text('off');

    $('.dynamic1').addClass('on');
    $('.dynamic2').removeClass('on');
    $('.s1').find('.sliderLeft').css({'width':'0px'});
    $('.s1').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
    $('.s1').attr('value',''+0+'|0');
    $('.s2').find('.sliderLeft').css({'width':'0px'});
    $('.s2').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
    $('.s2').attr('value',''+0+'|0');

}
function clickEve1(){
    if($(this).parent().parent().hasClass('on')) {
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('off');
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('on');
    }
}
function clickEve2(){
    var dataId = parseInt($(this).attr('data-id'));
    if($(this).hasClass('on')){
        return;
    }


    if(dataId == 6){
        valueStyle = 1;
        checked = 1;
        threeDimensional.samefaceShow();
        select1 = true;
        select2= false;
        $('.dynamic1').addClass('on');
        $('.dynamic2').removeClass('on');

        $('.s2').find('.sliderLeft').css({'width':'0px'});
        $('.s2').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
        $('.s2').find('.xdsoft_slider_label').text('垂直');
        $('.s2').attr('value',''+0+'|0');

    }else if(dataId == 7){
        valueStyle = 4;
        checked = 2;
        threeDimensional.differentShow();
        select2 = true;
        select1= false;
        $('.dynamic1').removeClass('on');
        $('.dynamic2').addClass('on');

        $('.s1').find('.sliderLeft').css({'width':'0px'});
        $('.s1').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
        $('.s1').find('.xdsoft_slider_label').text('平行');
        $('.s1').attr('value',''+0+'|0');
    }

}

if(!isMob){
    $('#scale').on('click',fullEve);
    $('#renew').on('click',renewEve);
    $('.turnKno .turnRight').on('click',clickEve1);
    $('.dynamic').on('click',clickEve2);
}else{
    $('#scale').on('touchstart',fullEve);
    $('#renew').on('touchstart',renewEve);
    $('.turnKno .turnRight').on('touchstart',clickEve1);
    $('.dynamic').on('touchstart',clickEve2);
}



