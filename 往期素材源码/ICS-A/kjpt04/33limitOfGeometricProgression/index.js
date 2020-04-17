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

var value1=0,$gongshi1=$('.gongshidiv1'),$gongshi2=$('.gongshidiv2');



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

    var funcs=[],texts=[],text0=null,border0=null;



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
        this.scene.position.x = 0;
        this.scene.position.y = 0;
        this.scene.position.z = 0;
        $obj.append(this.renderer.domElement);
        this.createControls();

        text0 = new THREE.Group();
        var tex = text('a',30,'#000');
        text0.add(tex);
        tex = text('0',20,'#000');
        tex.position.x = 13;
        tex.position.y = -12;
        text0.add(tex);

        thiz.scene.add(text0);

        border0 = createBorder([[500,500,0],[500,-500,0],[-500,-500,0],[-500,500,0]]);
        thiz.scene.add(border0);

        createRect();


    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate =false;
        // this.controls.enablePan =false;
    };
    this.reback = function(){
        this.camera.position.z = 1700;
        this.rangeChangeEve();
    };
    this.rangeChangeEve = function(){
        var i;
        for(i=0;i<11;i++){
            funcs[i].visible =false;
            texts[i].visible =false;
            // if(i<9){
            //     texts[i].visible =false;
            // }
        }
        if(value1 == 0){
            text0.visible = true;
        }else{
            text0.visible = false;
            for(i=0;i<value1;i++){
                funcs[i].visible = true;
                texts[i].visible = true;
                // if(i<9){
                //     texts[i].visible = true;
                // }
            }


        }
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
        var vertices = [],tex =null;
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

            tex = text('n',30,'#000');
            tex.position.x = (dir.x-20);
            tex.position.y = dir.y;
            tex.position.z = 0;
            axisArrow.add(tex);

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


            tex = text('a',30,'#000');
            tex.position.x = (dir.x-30);
            tex.position.y = dir.y;
            tex.position.z = 0;
            axisArrow.add(tex);

            tex = text('n',18,'#000');
            tex.position.x = (dir.x-15);
            tex.position.y = dir.y-10;
            tex.position.z = 0;
            axisArrow.add(tex);
        }
    }

    /****** 其他事件 ******/
    this.createAxis = function(){
        drawAxisArrow(vec3( -350, 0, 0 ), vec3( 350, 0, 0 ),1);
        drawAxisArrow(vec3( -100, -3300, 0 ), vec3( -100, 3300, 0 ),2);
    };

    function createRect(){
        var line=null,func=null,vertices=[],tex=null;
        vertices=[[0,500,1],[0,-500,1],[-500,-500,1],[-500,500,1]];
        func = createShape(vertices);
        line = createBorder(vertices);
        funcs[0] = new THREE.Group();
        funcs[0].add(func);
        funcs[0].add(line);
        texts[0] = new THREE.Group();
        tex = text('a',30,'#000');
        texts[0].add(tex);
        tex = text('1',20,'#000');
        tex.position.x = 13;
        tex.position.y = -15;
        texts[0].add(tex);
        texts[0].position.x = -250;
        texts[0].position.y = 0;
        thiz.scene.add(texts[0]);
        thiz.scene.add(funcs[0]);

        vertices=[[0,500,1],[0,0,1],[500,0,1],[500,500,1]];
        func = createShape(vertices);
        line = createBorder(vertices);
        funcs[1] = new THREE.Group();
        funcs[1].add(func);
        funcs[1].add(line);
        texts[1] = new THREE.Group();
        tex = text('a',30,'#000');
        texts[1].add(tex);
        tex = text('2',20,'#000');
        tex.position.x = 13;
        tex.position.y = -12;
        texts[1].add(tex);
        texts[1].position.x = 250;
        texts[1].position.y = 250;
        thiz.scene.add(texts[1]);
        thiz.scene.add(funcs[1]);

        vertices=[[0,0,1],[0,-500,1],[250,-500,1],[250,0,1]];
        func = createShape(vertices);
        line = createBorder(vertices);
        funcs[2] = new THREE.Group();
        funcs[2].add(func);
        funcs[2].add(line);
        texts[2] = new THREE.Group();
        tex = text('a',30,'#000');
        texts[2].add(tex);
        tex = text('3',20,'#000');
        tex.position.x = 13;
        tex.position.y = -12;
        texts[2].add(tex);
        texts[2].position.x = 125;
        texts[2].position.y = -250;
        thiz.scene.add(texts[2]);
        thiz.scene.add(funcs[2]);

        vertices=[[250,0,1],[250,-250,1],[500,-250,1],[500,0,1]];
        func = createShape(vertices);
        line = createBorder(vertices);
        funcs[3] = new THREE.Group();
        funcs[3].add(func);
        funcs[3].add(line);
        texts[3] = new THREE.Group();
        tex = text('a',30,'#000');
        texts[3].add(tex);
        tex = text('4',20,'#000');
        tex.position.x = 13;
        tex.position.y = -12;
        texts[3].add(tex);
        texts[3].position.x = 350;
        texts[3].position.y = -125;
        thiz.scene.add(texts[3]);
        thiz.scene.add(funcs[3]);

        vertices=[[250,-250,1],[250,-500,1],[375,-500,1],[375,-250,1]];
        func = createShape(vertices);
        line = createBorder(vertices);
        funcs[4] = new THREE.Group();
        funcs[4].add(func);
        funcs[4].add(line);
        texts[4] = new THREE.Group();
        tex = text('a',30,'#000');
        texts[4].add(tex);
        tex = text('5',20,'#000');
        tex.position.x = 13;
        tex.position.y = -12;
        texts[4].add(tex);
        texts[4].position.x = 310;
        texts[4].position.y = -375;
        thiz.scene.add(texts[4]);
        thiz.scene.add(funcs[4]);

        vertices=[[375,-250,1],[375,-375,1],[500,-375,1],[500,-250,1]];
        func = createShape(vertices);
        line = createBorder(vertices);
        funcs[5] = new THREE.Group();
        funcs[5].add(func);
        funcs[5].add(line);
        texts[5] = new THREE.Group();
        tex = text('a',30,'#000');
        texts[5].add(tex);
        tex = text('6',20,'#000');
        tex.position.x = 13;
        tex.position.y = -12;
        texts[5].add(tex);
        texts[5].position.x = 435;
        texts[5].position.y = -305;
        thiz.scene.add(texts[5]);
        thiz.scene.add(funcs[5]);

        vertices=[[375,-375,1],[375,-500,1],[437.5,-500,1],[437.5,-375,1]];
        func = createShape(vertices);
        line = createBorder(vertices);
        funcs[6] = new THREE.Group();
        funcs[6].add(func);
        funcs[6].add(line);
        texts[6] = new THREE.Group();
        tex = text('a',30,'#000');
        texts[6].add(tex);
        tex = text('7',20,'#000');
        tex.position.x = 13;
        tex.position.y = -12;
        texts[6].add(tex);
        texts[6].position.x = 405;
        texts[6].position.y = -430;
        thiz.scene.add(texts[6]);
        thiz.scene.add(funcs[6]);

        vertices=[[437.5,-437.5,1],[437.5,-375,1],[500,-375,1],[500,-437.5,1]];
        func = createShape(vertices);
        line = createBorder(vertices);
        funcs[7] = new THREE.Group();
        funcs[7].add(func);
        funcs[7].add(line);
        texts[7] = new THREE.Group();
        tex = text('a',30,'#000');
        texts[7].add(tex);
        tex = text('8',20,'#000');
        tex.position.x = 13;
        tex.position.y = -12;
        texts[7].add(tex);
        texts[7].position.x = 470;
        texts[7].position.y = -390;
        thiz.scene.add(texts[7]);
        thiz.scene.add(funcs[7]);

        vertices=[[437.5,-437.5,1],[468.75,-437.5,1],[468.75,-500,1],[437.5,-500,1]];
        func = createShape(vertices);
        line = createBorder(vertices);
        funcs[8] = new THREE.Group();
        funcs[8].add(func);
        funcs[8].add(line);

        texts[8] = new THREE.Group();
        tex = text('a',30,'#000');
        texts[8].add(tex);
        tex = text('9',20,'#000');
        tex.position.x = 13;
        tex.position.y = -12;
        texts[8].add(tex);
        texts[8].position.x = 449;
        texts[8].position.y = -445;
        thiz.scene.add(texts[8]);
        thiz.scene.add(funcs[8]);

        vertices=[[468.75,-437.5,1],[500,-437.5,1],[500,-468.75,1],[468.75,-468.75,1]];
        func = createShape(vertices);
        line = createBorder(vertices);
        funcs[9] = new THREE.Group();
        funcs[9].add(func);
        funcs[9].add(line);

        texts[9] = new THREE.Group();
        tex = text('a',30,'#000');
        texts[9].add(tex);
        tex = text('10',15,'#000');
        tex.position.x = 13;
        tex.position.y = -13;
        texts[9].add(tex);
        texts[9].position.x = 479;
        texts[9].position.y = -435;
        thiz.scene.add(texts[9]);
        thiz.scene.add(funcs[9]);

        vertices=[[468.75,-468.75,1],[500,-468.75,1],[500,-500,1],[468.75,-500,1]];
        func = createShape(vertices);
        line = createBorder(vertices);
        funcs[10] = new THREE.Group();
        funcs[10].add(func);
        funcs[10].add(line);

        texts[10] = new THREE.Group();
        tex = text('a',30,'#000');
        texts[10].add(tex);
        tex = text('n',15,'#000');
        tex.position.x = 13;
        tex.position.y = -15;
        texts[10].add(tex);
        texts[10].position.x = 479;
        texts[10].position.y = -470;
        thiz.scene.add(texts[10]);
        thiz.scene.add(funcs[10]);



        for(var i=0;i<funcs.length;i++){
            funcs[i].visible = false;
            texts[i].visible = false;
        }


    }

    function createShape(arr){
        var shape = new THREE.Shape();
        var material = new THREE.MeshBasicMaterial({'color':0x78cdf8});
        shape.moveTo(arr[0][0],arr[0][1]);
        shape.lineTo(arr[1][0],arr[1][1]);
        shape.lineTo(arr[2][0],arr[2][1]);
        shape.lineTo(arr[3][0],arr[3][1]);
        return new THREE.Mesh(new THREE.ShapeGeometry(shape),material);
    }
    function createBorder(arr){
        var gruop=new THREE.Group(),line=null,vertices=[];
        vertices.push(new THREE.Vector3(arr[0][0],arr[0][1],arr[0][2]));
        vertices.push(new THREE.Vector3(arr[1][0],arr[1][1],arr[1][2]));
        line=createLineMesh(vertices,'#000',3);
        gruop.add(line);
        vertices=[];
        vertices.push(new THREE.Vector3(arr[2][0],arr[2][1],arr[2][2]));
        vertices.push(new THREE.Vector3(arr[1][0],arr[1][1],arr[1][2]));
        line=createLineMesh(vertices,'#000',3);
        gruop.add(line);
        vertices=[];
        vertices.push(new THREE.Vector3(arr[2][0],arr[2][1],arr[2][2]));
        vertices.push(new THREE.Vector3(arr[3][0],arr[3][1],arr[3][2]));
        line=createLineMesh(vertices,'#000',3);
        gruop.add(line);
        vertices=[];
        vertices.push(new THREE.Vector3(arr[0][0],arr[0][1],arr[0][2]));
        vertices.push(new THREE.Vector3(arr[3][0],arr[3][1],arr[3][2]));
        line=createLineMesh(vertices,'#000',3);
        gruop.add(line);

        return gruop;

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

$('#slider1').change(function(){
    var result = $(this).val();
    var value = result.split('|')[0];
    value = parseFloat(parseFloat(value).toFixed(1));
    value1 = value;
    three.rangeChangeEve();
    countChange();
});


function renew(){
    value1 = 0;
    $('.slider1').find('.sliderLeft').css({'width':'0px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
    $('.slider1').find('.xdsoft_slider_label').text('0');
    $('#slider1').attr('value',''+0+'|0');
    three.reback();
    countChange();
}
function countChange(){
    var value = Math.pow(2,value1);
    if(value1 == 0){
        $('.value1').css({'display':'block'});
        $('.value2').css({'display':'none'});
        $gongshi1.find('span').css({'display':'none'});
        $gongshi2.find('span').css({'display':'none'});

    }else if(value1 == 11){
        $('.value1').css({'display':'none'});
        $('.value2').css({'display':'block'});
        $gongshi1.find('span').css({'display':'none'});
        $gongshi2.find('span').css({'display':'none'});
    }else{
        $('.value1').css({'display':'none'});
        $('.value2').css({'display':'none'});
        $gongshi1.find('span').css({'display':'block'});
        $gongshi2.find('span').css({'display':'block'});
        $gongshi1.find('.bottom').text(''+value);
        $gongshi2.find('.bottom').text(''+value);
        $gongshi2.find('.top').text(''+(value-1));
    }

}


/*全屏事件*/
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
	$('#renew').on('touchstart',renew);
	$('#scale').on('touchstart',scalef);
}else{
	$('#renew').on('click',renew);
	$('#scale').on('click',scalef);
}
	




