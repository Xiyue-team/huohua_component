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

var classInterval = 0.5,classNumber=8.2, classRange =4.1; //租距、组数、极差 极差   组数 = 极差/租距
var $max = $('.class-max .classContent'),$float = $('.float'),$int = $('.int'),$pic1=$('.pic1'),$pic2=$('.pic2'),$slider=$('.sliderContainer ');
var select=0;



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

    var array1 = [3.1,2.5,2.0,2.0,1.5,1.0,1.6,1.8,1.9,1.6,3.4,2.6,2.2,2.2,1.5,1.2,0.2,0.4,0.3,0.4, 3.2,2.7,2.3,2.1,1.6,1.2,3.7,1.5,0.5,3.8,3.3,2.8,2.3,2.2,1.7,1.3,3.6,1.7,0.6,4.1, 3.2,2.9,2.4,2.3,1.8,1.4,3.5,1.9,0.8,4.3,3.0,2.9,2.4,2.4,1.9,1.3,1.4,1.8,0.7,2.0,2.5,2.8,2.3,2.3,1.8,1.3,1.3,1.6,0.9,2.3,2.6,2.7,2.4,2.1,1.7,1.4,1.2,1.5,0.5,2.4, 2.5,2.6,2.3,2.1,1.6,1.0,1.0,1.7,0.8,2.4,2.8,2.5,2.2,2.0,1.5,1.0,1.2,1.8,0.6,2.2];
    var min,max,array2=[],array3=[],classObj = [];//最小值、最大值、时下用的数组、确定组数
    var obj2=null,obj3=null,title1=null,title2=null,divHeight=0,shadowMaterial=null,biggerThan=true;



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
        this.camera.position.z = 1700;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);
        this.createControls();

        // this.createAxis();

        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var text={};
        // label x axis:
        var textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000000', antialias: true};
        title1 = new SpriteText2D(' ', textStyle);
        title2 = new SpriteText2D(' ', textStyle);
        title1.position.x = title2.position.x =0;
        title1.position.y = title2.position.y = 600;

        thiz.scene.add(title1);
        thiz.scene.add(title2);


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

        renewArray2(1);
        findMaxAndMin();
        findClassNum();
        findClassInterval();
        createTable();
        createObj2();

        divHeight = $pic1.find('.picdiv div').height();
        $pic1.find('.picdiv div').css('line-height',divHeight+'px');
    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate =false;
        // this.controls.enablePan =false;
    };
    this.renew = function(){
       renewArray2();
        findMaxAndMin();
        findClassNum();
        findClassInterval();
        createTable();
        createObj2();
    };
    this.clickEve = function(){
        if(select == 2){
            obj2.visible = title1.visible =  true;

            obj3.visible = title2.visible = false;

        }else if(select == 3){
            obj2.visible =true;
            obj3.visible = title2.visible = true;
            title1.visible = false;
        }else{
            obj2.visible = obj3.visible =title1.visible = title2.visible =false;

        }
    };
    this.reback = function(){
        biggerThan=true;
        classInterval = 0.5;
        renewArray2(1);
        findMaxAndMin();
        findClassNum();
        findClassInterval();
        createTable();
        createObj2();
        thiz.clickEve();
        this.camera.position.z = 1700;
    };
    this.rangeChangeEve = function(){
        findClassNum();
        findClassInterval();
        createTable();
        createObj2();
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

    /****** 其他事件 ******/
    this.createAxis = function(obj){
        drawAxisArrow(vec3( -550, -500, 0 ), vec3( 700, -500, 0 ),1);
        drawAxisArrow(vec3( -500, -510, 0 ), vec3( -500, 550, 0 ),2);
        obj.add(axisArrow,axis);
    };

    function findMaxAndMin(){
        min = Math.min.apply(null, array2);
        max = Math.max.apply(null, array2);
        classRange = parseFloat((max-min).toFixed(1));
        $max.text(classRange);
    }
    function findClassNum(){
        classNumber = parseFloat((classRange/classInterval).toFixed(1));
        //var num = parseFloat((classNumber/classInterval).toFixed(1));
        $float.text(classNumber);
        $int.html(Math.ceil(classNumber));
    }
    function findClassInterval(){
        var  i,j,key,num,interval,arr=[];
        biggerThan = true;
        classObj=[];
        var range1=0,range2=0;
        for(i=0;i<classNumber;i++){
            num = 0;

            range1 = min + classInterval*i;
            range2 = min + classInterval*(i+1);

            for(j=0;j<array2.length;j++){
                if(array2[j] < range2 && array2[j] >=range1 ){
                    num++;
                }
            }
            key = ''+range1.toFixed(1)+'-'+range2.toFixed(1);
            arr = [];
            arr.push(key);
            arr.push(num);
            classObj.push(arr);
        }
        range1 = min + classInterval*i;
        if(range1 == range1){
            for(j=0;j<array2.length;j++){
                if( array2[j] == max ){
                    num++;
                }
            }
            classObj[classObj.length-1][1] = num;
        }

    }
    function renewArray2(num){
        var i=0,randomnum,array=[],slice;
        array =[];
        array2=[];
        if(num == 1){
            for(i=0;i<100;i++){
                array2.push(array1[i]);
            }
        }else{
            for(i=0;i<100;i++){
                if(i<50){
                    randomnum = parseFloat(Math.random().toFixed(1)) + 2;
                }else if(i<70){
                    randomnum = parseFloat(Math.random().toFixed(1)) + 1;
                }else if(i<90){
                    randomnum = parseFloat(Math.random().toFixed(1)) + 3;

                }else if(i<95){

                    randomnum = parseFloat(Math.random().toFixed(1));
                    if(randomnum == 0){
                        i--;
                        continue;
                    }
                }else{
                    randomnum = parseFloat(Math.random().toFixed(1)) + 4;
                    if(randomnum == 5){
                        i--;
                        continue;
                    }
                }
                array.push(randomnum);
            }
            for(i=100;i>0;i--) {
                randomnum = Math.floor(array.length * Math.random());
                slice = array.splice(randomnum, 1);
                array2.push(slice[0]);
            }
        }





    }
    function createTable(){
        var result ='<div class="picdiv">';
        for(var i=0;i<array2.length;i++){
            if(array2[i]%1 == 0){
                result += "<div>"+array2[i]+".0</div>";
            }else{
                result += "<div>"+array2[i]+"</div>";
            }

        }
        $pic1.html(result);
        result = "<table class='pic2table'>";
        for(i=0;i<classObj.length;i++){
            result += "<tr><td>"+classObj[i][0]+"</td><td>"+classObj[i][1]+"</td><td>"+(classObj[i][1]/100)+"</td></tr>";
            //result += "<tr><td>"+(i*classInterval).toFixed(1)+'-'+((i+1)*classInterval).toFixed(1)+"</td><td>"+classObj[i][1]+"</td><td>"+(classObj[i][1]/100)+"</td></tr>";
        }
        result += "<tr><td>总计</td><td>100</td><td>1</td></tr>";
        result += "</table>";
        $pic2.find('.pic2div').html(result);
        $pic1.find('.picdiv div').css('line-height',divHeight+'px');
    }
    function createObj2(){
        if(obj2 !=null){
            thiz.scene.remove(obj2);
            thiz.scene.remove(obj3);
        }
        obj2 = new THREE.Group();
        obj3 = new THREE.Group();
        thiz.createAxis(obj2);

        var line = createLableAxisShu();
        obj2.add(line);


        line = createLabelAxisHen();
        obj2.add(line);

        line = text('样本资料',30,'#000');
        line.position.x = 680;
        line.position.y = -450;
        obj2.add(line);

        line = text('频率/组距',30,'#000');
        line.position.x = -500;
        line.position.y = 600;
        obj2.add(line);


        obj2.position.z = -5;
        obj3.position.z = 5;
        thiz.scene.add(obj2);
        thiz.scene.add(obj3);
        obj2.visible = obj3.visible =false;


        thiz.clickEve();


    }
    function createLabelAxisHen(){
        var num = Math.ceil(classNumber);
        var per = parseInt(1000/num); //每个格子的宽度
        var xStart = min*(per/classInterval);


        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var text={};
        // label x axis:
        var textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
        var gruop = new THREE.Group(),frequency,height,line=null,vertices=[];
        var nowStart = min;
        var arrobj3=[];

        vertices = [];
        vertices.push(new THREE.Vector3(-500 + xStart,-500,0));
        vertices.push(new THREE.Vector3(-500 + xStart,-500 -10,0));
        line = createLineMesh(vertices,'#000',3);
        gruop.add(line);

        for(var i=0;i<= num;i++){

            if(classInterval == 0.1){
                textStyle = {align: textAlign.center, font: '16px "Cambria Math"', fillStyle: '#000000', antialias: true};
                text = new SpriteText2D((nowStart).toFixed(1), textStyle);
                text.position.y = -500 -30;
            }else{
                textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
                text = new SpriteText2D((nowStart).toFixed(1), textStyle);
                text.position.y = -500 -30;
            }
            text.position.x = -500 + i*per-5 + xStart;

            gruop.add(text);
            nowStart += classInterval;



            if(i==0){
                vertices = [];
                vertices.push(new THREE.Vector3(-500,-500,0));
                vertices.push(new THREE.Vector3(-500,-500 -10,0));
                line = createLineMesh(vertices,'#000',3);
                gruop.add(line);
            }else{
                vertices = [];
                vertices.push(new THREE.Vector3(-500 + i*per + xStart,-500,0));
                vertices.push(new THREE.Vector3(-500 + i*per + xStart,-500 -10,0));
                line = createLineMesh(vertices,'#000',3);
                gruop.add(line);
            }



            if(i<num){
                vertices=[];
                vertices.push([-500 + i*per+1 + xStart,-500]);
                vertices.push([-500 + (i+1)*per-1 + xStart,-500]);

                frequency = classObj[i][1];
                height = 20*frequency/classInterval;
                if(biggerThan){
                    height = height/2;
                }

                vertices.push([-500 + (i+1)*per-1 + xStart,-500+height]);
                vertices.push([-500 + i*per+1 + xStart,-500+height]);

                arrobj3.push([((-500 + i*per+1)+(-500 + (i+1)*per-1))/2 + xStart,-500+height]);
                if(height!=0){
                    line = createShape(vertices);
                    gruop.add(line);
                }


            }

        }

        for(i=0;i<arrobj3.length;i++){
            if(i<arrobj3.length-1){
                vertices=[];
                vertices.push(new THREE.Vector3(arrobj3[i][0],arrobj3[i][1],0));
                vertices.push(new THREE.Vector3(arrobj3[i+1][0],arrobj3[i+1][1],0));
                line = createLineMesh(vertices,'#1196dc',3);
                obj3.add(line);
            }

            line = createCircle(arrobj3[i]);
            obj3.add(line);
        }



        return gruop;


    }
    function createLableAxisShu(){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var text={};
        // label x axis:
        var textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
        var gruop = new THREE.Group();
        for(var i = 1; i <= 5; i++) {
            if(i==0){
                text = new SpriteText2D(0, textStyle);
                text.position.x = -500-30;
                text.position.y = -500 + i*200 - 10;
                gruop.add(text);
            }else{
                if(biggerThan){
                    text = new SpriteText2D(i/5, textStyle);

                }else{
                    text = new SpriteText2D(i/10, textStyle);
                }

                text.position.x = -500-30;
                text.position.y = -500 + i*200 +10;
                gruop.add(text);

                var vertices = [];
                vertices.push(new THREE.Vector3(-500,-500 + i*200,0));
                vertices.push(new THREE.Vector3(-510,-500 + i*200,0));
                var line = createLineMesh(vertices,'#000',3);
                gruop.add(line);
            }

        }

        return gruop;
    }
    function createShape(arr){


        var width = arr[1][0] - arr[0][0];
        var height = arr[2][1] - arr[1][1];

        var shadowGeo = new THREE.PlaneBufferGeometry( width, height, 1, 1 );
        var  mesh = new THREE.Mesh(shadowGeo,shadowMaterial);
        mesh.position.x = arr[0][0] + width/2;
        mesh.position.y = height/2 -500;

        return mesh;

    }
    function createCircle(position){
        var shape = new THREE.CircleGeometry(10,8,0,2*Math.PI);
        var materia = new THREE.MeshBasicMaterial({'color':'#1196dc'});
        var mesh = new THREE.Mesh(shape,materia);
        mesh.position.x = position[0];
        mesh.position.y = position[1];
        return mesh;

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
$('#slider1').change(function(){
    var result = $(this).val();
    var value = result.split('|')[0];
    value = parseFloat(parseFloat(value).toFixed(1));
    classInterval = value;
    three.rangeChangeEve();
});
//on/off事件
function clickEve1(){
    var dateId = parseInt($(this).attr('data-id'));

    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
        $(this).parent().parent().siblings().find('.span2').text('off');
    }
    if(select != dateId){  //打开
        select = dateId;

        if(select == 1){
            $pic1.css({'display':'none'});
            $pic2.css({'display':'block'});
        }else{
            $pic1.css({'display':'none'});
            $pic2.css({'display':'none'});
        }
    }else{//关闭
        select=0;
        $pic1.css({'display':'block'});
        $pic2.css({'display':'none'});
    }
    three.clickEve();
}
function renewa(){
    select=0;
    $slider.find('.sliderLeft').css({'width':'182px'});
    $slider.find('.xdsoft_range2dslider_runner').css({'left':'182px'});
    $slider.find('.xdsoft_slider_label').text(''+0.5);
    $('#slider1').attr('value',''+0.5+'|0');
    three.reback();
    $pic1.css({'display':'block'});
    $pic2.css({'display':'none'});
    $('.turn1').removeClass('on').addClass('off');
    $('.turnRight').parent().parent().find('.span2').text('' +'off');
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

    }else{
        fullScreen = 1;
        $('#scale img').attr('src','images/icon/back.png');
        $obj.css({'left':0,'top':0,'right':0,'bottom':0,'border-radius':'0'});
        $('canvas').css({'position':'absolute','left':(bodyWidth-threeWidth)/2,'top':(bodyHeight-threeHeight)/2});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','hidden');

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





