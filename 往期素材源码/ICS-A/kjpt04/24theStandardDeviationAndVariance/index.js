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
        $('.threeControl').css({'zoom':bodyScale/0.7,'right':30*scale,'bottom':30*scale});
        if(164*scale < 130){
            $('.pic1').css({'left':125*scale,'top': 130});
        }else{
            $('.pic1').css({'left':125*scale,'top': 164*scale});

        }
    // }else{
    //     scale = 0.6667;
    //     $(".body").css({"zoom":0.6667,"margin-top":'0',"top":'0'});
    //     $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale ),bottom:(69*scale)});
    //     $('.pic1').css({'left':15*scale,'top': 200*scale,'text-align':'center'});
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

var select=1,$pic1Cos1 = $('.pic1Cos1 .content span'),$pic1Cos2=$('.pic1Cos2 .content span'),$value1=$('.pic1Cos1 .end span'),$value2=$('.pic1Cos2 .end span');



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


function ThreeDimensional() {
    var mousedownflag = false;
    var thiz = this;
    var selectobjs=[],selectobj=null;
    var arrO1 = [7,8,7,9,5,4,9,10,7,4],arr1 = [7,8,7,9,5,4,9,10,7,4],ave1,standD1,standD1Text,variD1,variD1Text;
    var arrO2 = [9,5,7,8,7,6,8,6,7,7],arr2 = [9,5,7,8,7,6,8,6,7,7],ave2,standD2,standD2Text,variD2,variD2Text;
    var obj1=null,obj2=null,text2,text3,shadowMaterial=null;




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

        var canvas = document.createElement( 'canvas' );
        canvas.width = 128;
        canvas.height = 512;

        var context = canvas.getContext( '2d' );
        var gradient = context.createLinearGradient( canvas.width / 2, 0, canvas.width / 2, canvas.height );
        gradient.addColorStop( 0.5, '#fad961' );
        gradient.addColorStop( 1, '#f76b1c' );

        context.fillStyle = gradient;
        context.fillRect( 0, 0, canvas.width, canvas.height );

        var shadowTexture = new THREE.Texture( canvas );
        shadowTexture.needsUpdate = true;

        shadowMaterial = new THREE.MeshBasicMaterial( { map: shadowTexture } );

        createArr();
        createObjs();
        this.clickEve();
    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = false;
        this.controls.enableRotate =false;
        // this.controls.enablePan =false;
    };
    this.clickEve = function(){
        if(select == 1){
            obj1.visible = true;
            obj2.visible = text2.visible = text3.visible= false;

        }else if(select == 2){

            obj2.visible = text2.visible =  true;
            obj1.visible =  text3.visible= false;


        }else if(select == 3){
            obj2.visible = text3.visible =  true;
            obj1.visible =  text2.visible= false;

        }else{
            obj1.visible = obj2.visible = text2.visible = text3.visible= false;
        }
    };
    this.renew = function(){
        var i,val;
        for(i=0;i<10;i++){
            val = 4 + Math.round(Math.random()*6);
            arr1[i] = val;
            val = 4 + Math.round(Math.random()*6);
            arr2[i] = val;
        }
        createArr();
        createObjs();
        three.clickEve();
    };

    this.reback = function(){

        for(var i=0;i<10;i++){
            arr1[i] = arrO1[i];
            arr2[i] = arrO2[i];
        }
        createArr();
        createObjs();
        this.clickEve();

        this.camera.position.z = 1500;
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
        return new SpriteText2D(font, textStyle);
    }

    function drawAxisArrow(origin, dir,style){
        var vertices = [];
        vertices.push(new THREE.Vector3(origin.x,origin.y,origin.z));
        vertices.push(new THREE.Vector3(dir.x,dir.y,dir.z));
        var line = createLineMesh(vertices,'#000',3);
        axisArrow.add(line);

        if(style == 1){
            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,dir.y+5,0));
            vertices.push(new THREE.Vector3(dir.x,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,dir.y-5,0));
            vertices.push(new THREE.Vector3(dir.x,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

        }else{
            vertices = [];
            vertices.push(new THREE.Vector3(dir.x+5,dir.y-20,0));
            vertices.push(new THREE.Vector3(dir.x,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-5,dir.y-20,0));
            vertices.push(new THREE.Vector3(dir.x,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);
        }
    }
    function createAxisText(origin,dir,style){
        var line=null,i,vertices=[],start,obj;
        obj = new THREE.Group();

        if(style == 1){  //横向
            start = origin[0];
            for(i=0;i<8;i++){
                vertices=[];
                vertices.push(new THREE.Vector3(start,-400,0));
                vertices.push(new THREE.Vector3(start,-405,0));
                line = createLineMesh(vertices,'#000',3);
                obj.add(line);
                if(i == 0){
                    line = text(0,20,'#000');
                }else{
                    line = text(i+3,20,'#000');
                }
                line.position.x = start;
                line.position.y = -410;
                obj.add(line);
                start += 50;
            }
        }else if(style == 2){
            start = origin[1]+50;
            for(i=1;i<6;i++){
                vertices=[];
                vertices.push(new THREE.Vector3(origin[0],start,0));
                vertices.push(new THREE.Vector3(origin[0]+5,start,0));
                line = createLineMesh(vertices,'#000',3);
                obj.add(line);
                line = text(i/10,20,'#000');
                line.position.x = origin[0]-20;
                line.position.y = start+5;
                obj.add(line);
                start += 50;
            }
            line = text('频率',20,'#000');
            line.position.x = origin[0]-10;
            line.position.y = start+30;
            obj.add(line);

        }

        return obj;

    }

    /****** 其他事件 ******/
    this.createAxis = function(obj){
        drawAxisArrow(vec3( -550, -500, 0 ), vec3( 700, -500, 0 ),1);
        drawAxisArrow(vec3( -500, -510, 0 ), vec3( -500, 550, 0 ),2);
        obj.add(axisArrow,axis);
    };
    function createArr(){
        var i,result1=0,result2=0;
        for(i=0;i<10;i++){
            $($pic1Cos1[i]).text(''+arr1[i]);
            $($pic1Cos2[i]).text(''+arr2[i]);
            result1 += arr1[i];
            result2 += arr2[i];
        }

        ave1 = result1/10;
        ave2 = result2/10;
        $value1.text(''+ave1);
        $value2.text(''+ave2);

    }
    function createObjs(){
        thiz.scene.remove(obj1);
        thiz.scene.remove(obj2);
        thiz.scene.remove(text2);
        thiz.scene.remove(text3);
        obj1 = new THREE.Group();
        obj2 = new THREE.Group();

        text2 = new THREE.Group();
        text3 = new THREE.Group();

        var line=null,vertices=[],i,start,x,y,arr=[],j;

        drawAxisArrow(vec3( -400, -400, 0 ), vec3( -400, -100, 0 ),2);
        drawAxisArrow(vec3( -400, -400, 0 ), vec3( 0, -400, 0 ),1);
        obj1.add(axisArrow,axis);

        drawAxisArrow(vec3( 100, -400, 0 ), vec3( 500, -400, 0 ),1);
        drawAxisArrow(vec3( 100, -400, 0 ), vec3( 100,-100, 0 ),2);
        obj1.add(axisArrow,axis);

        line = createAxisText([-400,-400,0],[-400,0,0],1);
        obj1.add(line);

        line = createAxisText([100,-400,0],[500,-400,0],1);
        obj1.add(line);

        line = createAxisText([-400,-400,0],[0,-400,0],2);
        obj1.add(line);

        line = createAxisText([100,-400,0],[100,0,0],2);
        obj1.add(line);


        line = text('甲',30,'#000');
        line.position.x = -200;
        line.position.y = -450;
        obj1.add(line);

        line = text('乙',30,'#000');
        line.position.x = 300;
        line.position.y = -450;
        obj1.add(line);

        arr=[0,0,0,0,0,0,0];
        for(i=0;i<arr1.length;i++){
            switch (arr1[i]){
                case 4:arr[0]++;break;
                case 5:arr[1]++;break;
                case 6:arr[2]++;break;
                case 7:arr[3]++;break;
                case 8:arr[4]++;break;
                case 9:arr[5]++;break;
                case 10:arr[6]++;break;
            }

        }

        start = -360;
        for(i=0;i<arr.length;i++){
            vertices =[];
            y = 50*arr[i];
            if(y == 0){start += 50;continue;}
            vertices.push([start,-400,0]);
            vertices.push([start+20,-400,0]);
            vertices.push([start+20,-400+y,0]);
            vertices.push([start,-400+y,0]);
            line = createShape(vertices);
            obj1.add(line);

            start += 50;

        }


        start = -250;
        for(i=0;i<arr.length;i++){
            if(arr[i] == 0){ start += 100;continue;}
            x = -120;
            for(j=0;j<arr[i];j++){
                line = createCircle();
                line.position.x = start;
                line.position.y = x;
                x += 50;
                obj2.add(line);
            }
            start += 100;
        }


        arr=[0,0,0,0,0,0,0];
        for(i=0;i<arr1.length;i++){
            switch (arr2[i]){
                case 4:arr[0]++;break;
                case 5:arr[1]++;break;
                case 6:arr[2]++;break;
                case 7:arr[3]++;break;
                case 8:arr[4]++;break;
                case 9:arr[5]++;break;
                case 10:arr[6]++;break;
            }

        }

        start = 140;
        for(i=0;i<arr.length;i++){
            vertices =[];
            y = 50*arr[i];
            if(y == 0){start += 50;continue;}
            vertices.push([start,-400,0]);
            vertices.push([start+20,-400,0]);
            vertices.push([start+20,-400+y,0]);
            vertices.push([start,-400+y,0]);
            line = createShape(vertices);
            obj1.add(line);

            start += 50;

        }
        thiz.scene.add(obj1);
        obj1.visible =false;


        vertices=[];
        vertices.push(new THREE.Vector3(-500,-200,0));
        vertices.push(new THREE.Vector3(500,-200,0));
        line = createLineMesh(vertices,'#000',3);
        obj2.add(line);


        start = -250;
        for(i=4;i<11;i++){
            vertices=[];
            vertices.push(new THREE.Vector3(start,-200,0));
            vertices.push(new THREE.Vector3(start,-190,0));
            line = createLineMesh(vertices,'#000',3);
            obj2.add(line);
            line = text(i,30,'#000');
            line.position.x = start;
            line.position.y = -210;
            obj2.add(line);
            start += 100;
        }


        start = -250;
        for(i=0;i<arr.length;i++){
            if(arr[i] == 0){ start += 100;continue;}
            x = -280;
            for(j=0;j<arr[i];j++){
                line = createCircle();
                line.position.x = start;
                line.position.y = x;
                x -= 50;
                obj2.add(line);
            }
            start += 100;
        }

        thiz.scene.add(obj2);
        obj2.visible = false;


        start = 0;
        for(i=0;i<arr1.length;i++){
            y = Math.pow(arr1[i]-ave1,2);
            start += y;
        }

        standD1 = start/10;
        variD1 = Math.sqrt(standD1);



        line = text('S ',30,'#000');
        line.position.x = -465;
        line.position.y = -150;
        text2.add(line);
        line = text('S ',30,'#000');
        line.position.x = -465;
        line.position.y = -150;
        text3.add(line);

        line = text('甲 ',25,'#000');
        line.position.x = -445;
        line.position.y = -160;
        text2.add(line);
        line = text('甲 ',25,'#000');
        line.position.x = -445;
        line.position.y = -160;
        text3.add(line);

        line = text(2,15,'#000');
        line.position.x = -460;
        line.position.y = -141;
        text3.add(line);


        if(((standD1*10)%10) == 0){
            standD1 = parseInt(standD1);
            standD1Text = text('= '+standD1,30,'#000');
            standD1Text.position.x = -389;
            standD1Text.position.y = -150;
        }else{
            standD1 = standD1.toFixed(3);
            standD1Text = text('= '+standD1,30,'#000');
            standD1Text.position.x = -370;
            standD1Text.position.y = -150;
        }



        if(((variD1*10)%10) == 0){
            variD1 = parseInt(variD1);
            variD1Text = text('= '+variD1,30,'#000');
            variD1Text.position.x = -389;
            variD1Text.position.y = -150;
        }else{
            variD1 = variD1.toFixed(3);
            variD1Text = text('= '+variD1,30,'#000');
            variD1Text.position.x = -370;
            variD1Text.position.y = -150;
        }



        start = 0;
        for(i=0;i<arr2.length;i++){
            y = Math.pow(arr2[i]-ave2,2);
            start += y;
        }

        standD2 = start/10;
        variD2 =  Math.sqrt(standD2);


        line = text('S ',30,'#000');
        line.position.x = -465;
        line.position.y = -230;
        text2.add(line);
        line = text('S ',30,'#000');
        line.position.x = -465;
        line.position.y = -230;
        text3.add(line);

        line = text('乙 ',25,'#000');
        line.position.x = -445;
        line.position.y = -240;
        text2.add(line);
        line = text('乙 ',25,'#000');
        line.position.x = -445;
        line.position.y = -240;
        text3.add(line);

        line = text(2,15,'#000');
        line.position.x = -460;
        line.position.y = -220;
        text3.add(line);


        if(((standD2*10)%10) == 0){
            standD2 = parseInt(standD2);
            standD2Text = text('= '+standD2,30,'#000');
            standD2Text.position.x = -389;
            standD2Text.position.y = -230;
        }else{
            standD2 = standD2.toFixed(3);
            standD2Text = text('= '+standD2,30,'#000');
            standD2Text.position.x = -370;
            standD2Text.position.y = -230;
        }



        if(((variD2*10)%10) == 0){
            variD2 = parseInt(variD2);
            variD2Text = text('= '+variD2,30,'#000');
            variD2Text.position.x = -389;
            variD2Text.position.y = -230;
        }else{
            variD2 = variD2.toFixed(3);
            variD2Text = text('= '+variD2,30,'#000');
            variD2Text.position.x = -370;
            variD2Text.position.y = -230;
        }


        text3.add(standD2Text);
        text3.add(standD1Text);
        text2.add(variD2Text);
        text2.add(variD1Text);




        thiz.scene.add(text3);
        thiz.scene.add(text2);
        text2.visible = false;
        text3.visible = false;

    }
    function createShape(arr){
        var width = arr[1][0] - arr[0][0];
        var height = arr[2][1] - arr[1][1];

        var shadowGeo = new THREE.PlaneBufferGeometry( width, height, 1, 1 );
        var  mesh = new THREE.Mesh(shadowGeo,shadowMaterial);
        mesh.position.x = arr[0][0] + width/2;
        mesh.position.y = height/2 -400;

        return mesh;
    }
    function createCircle(){
        var shape = new THREE.CircleGeometry(15,20,0,2*Math.PI);
        var material = new THREE.MeshBasicMaterial({'color':'#b8e986'});
        return new THREE.Mesh(shape,material);
    }



}


var three = new ThreeDimensional();
three.int();

renderAll();
function renderAll(){
    three.controls.update();
    requestAnimationFrame(renderAll);
    three.renderer.render(three.scene,three.camera);
}

//on/off事件
function clickEve1(){
    var dateId = parseInt($(this).attr('data-id'));

    if($(this).parent().parent().hasClass('on')){
        select = 0;
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        select = dateId;
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
        $(this).parent().parent().siblings().find('.span2').text('off');
    }

    three.clickEve();


}
function renewa(){
    select = 1;
    $('.turn1').removeClass('on').addClass('off');
    $('.turn2').removeClass('off').addClass('on');
     $('.turn1 .span2').text('' +'off');
    $('.turn2 .span2').text('' +'on');
    three.reback();
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
        $('canvas').css({'position':'absolute','left':0,'top':0});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','visible');
        $('#threeContainer').css({'border-radius':10*scale,'box-shadow': 6*scale + 'px '+6*scale +'px '+ 20*scale +'px rgba(0,0,0,0.30)' });
        if( scale != 0.6667){
            if(164*scale < 130){
                $('.pic1').css({'left':125*scale,'top': 130,'text-align':'left'});
            }else{
                $('.pic1').css({'left':125*scale,'top': 164*scale,'text-align':'left'});
            }
        }
    }else{
        fullScreen = 1;
        $('#scale img').attr('src','images/icon/back.png');
        $obj.css({'left':0,'top':0,'right':0,'bottom':0,'border-radius':'0'});
        $('canvas').css({'position':'absolute','left':(bodyWidth-threeWidth)/2,'top':(bodyHeight-threeHeight)/2});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','hidden');
        if( scale != 0.6667){
            $('.pic1').css({'left':0,'text-align':'center'});
        }
    }
}

if(isMob){
	$('.turnRight').on('touchstart',clickEve1);
	$('.dynamic').on('touchstart',three.renew);
	$('#renew').on('touchstart',renewa);
	$('#scale').on('touchstart',scalef);
}else{
	$('.turnRight').on('click',clickEve1);
	$('.dynamic').on('click',three.renew);
	$('#renew').on('click',renewa);
	$('#scale').on('click',scalef);
}
	




