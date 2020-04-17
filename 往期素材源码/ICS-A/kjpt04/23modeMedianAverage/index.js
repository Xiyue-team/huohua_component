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
var $top = $(".showResult-top");
var $bottom = $(".showResult-bottom");

/****** 全局变量 ******/
var axisArrow = new THREE.Group();
var axis = new THREE.Group();
var radioSelect = 0;
var arr_random = [3.1,2.5,2.0,2.0,1.5,1.0,1.6,1.8,1.9,1.6,
    3.4,2.6,2.2,2.2,1.5,1.2,0.2,0.4,0.3,0.4,
    3.2,2.7,2.3,2.1,1.6,1.2,3.7,1.5,0.5,3.8,
    3.3,2.8,2.3,2.2,1.7,1.3,3.6,1.7,0.6,4.1,
    3.2,2.9,2.4,2.3,1.8,1.4,3.5,1.9,0.8,4.3,
    3.0,2.9,2.4,2.4,1.9,1.3,1.4,1.8,0.7,2.0,
    2.5,2.8,2.3,2.3,1.8,1.3,1.3,1.6,0.9,2.3,
    2.6,2.7,2.4,2.1,1.7,1.4,1.2,1.5,0.5,2.4,
    2.5,2.6,2.3,2.1,1.6,1.0,1.0,1.7,0.8,2.4,
    2.8,2.5,2.2,2.0,1.5,1.0,1.2,1.8,0.6,2.2
];
var arr_num = {
    mode:{
        a:[],
        b:[],
        c:[],
        d:[],
        e:[],
        f:[],
        g:[],
        h:[],
        i:[],
        j:[]
    }
};
var allHeight = [];


function ThreeDimensional() {
    var thiz = this;

    /****** 判断是否支持WebGL ******/
    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();

    this.scene = new THREE.Scene();
    this.scene.position.set(-550,-350,0);
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
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);
        this.createControls();

        this.createAxis();
        this.showPlane();
    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = false;
        this.controls.enableRotate =false;
        this.controls.enablePan =false;
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
        var text = new SpriteText2D(font, textStyle);
        return text;
    }
    function drawAxisArrow(origin, dir,style){
        var vertices = [];
        vertices.push(new THREE.Vector3(origin.x,origin.y,origin.z));
        vertices.push(new THREE.Vector3(dir.x,dir.y,dir.z));
        var line = createLineMesh(vertices,'#000',3);
        axisArrow.add(line);

        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var text={};
        var textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};

        if(style == 1){
            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,-5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

            text =new SpriteText2D('样本资料', textStyle);
            text.position.x = dir.x+25;
            text.position.y = -15;
            axis.add(text);
        }else{
            vertices = [];
            vertices.push(new THREE.Vector3(5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(-5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

            text =new SpriteText2D('频率/组距', textStyle);
            text.position.x = 0;
            text.position.y = dir.y+30;
            text.position.z = 0.2;
            axis.add(text);
        }
    }
     function labelAxis(startx, stepSizex, stopx, starty, stepSizey, stopy) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var text={};
        // label x axis:
        var textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for(var i = startx; i <= stopx; i = i+stepSizex) {

            text = new SpriteText2D(i/stepSizex/2, textStyle);
            text.position.x = i;
            text.position.y = -20;
            axis.add(text);

            var vertices = [];
            vertices.push(new THREE.Vector3(i,0,0));
            vertices.push(new THREE.Vector3(i,-10,0));
            var line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        

        // label y axis:
        textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for( i = starty; i <= stopy; i = i+stepSizey) {
            if(i == 0){ continue;}
            text = new SpriteText2D(i/1100, textStyle);
            text.position.x = -35;
            text.position.y = i+11;
            text.position.z = 0.2;
            axis.add(text);

            vertices = [];
            vertices.push(new THREE.Vector3(0,i,0));
            vertices.push(new THREE.Vector3(-10,i,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        
    }

    function createPlane(w,h,color){
        var material = new THREE.MeshBasicMaterial({color:color});
        var planeGeo = new THREE.PlaneGeometry(w,h,1,1);
        var plane = new THREE.Mesh(planeGeo,material);
        return plane;
    }
    function judgeMode(arr){
        for(var k in arr_num.mode){
            arr_num["mode"][k] = [];
        }
        for(var i=0;i<arr.length;i++){
            var parse = parseInt(arr[i]/0.5);
            switch(parse){
                case 0:arr_num.mode.a.push(arr[i]);
                    break;
                case 1:arr_num.mode.b.push(arr[i]);
                    break;
                case 2:arr_num.mode.c.push(arr[i]);
                    break;
                case 3:arr_num.mode.d.push(arr[i]);
                    break;
                case 4:arr_num.mode.e.push(arr[i]);
                    break;
                case 5:arr_num.mode.f.push(arr[i]);
                    break;
                case 6:arr_num.mode.g.push(arr[i]);
                    break;
                case 7:arr_num.mode.h.push(arr[i]);
                    break;
                case 8:arr_num.mode.i.push(arr[i]);
                    break;
                case 9:arr_num.mode.j.push(arr[i]);
                    break;
            }
        }
        //console.log(arr_num["mode"])
    }

    /****** 其他事件 ******/
    this.createAxis = function(){
        labelAxis(0,110,1100,0,110,550);
        drawAxisArrow(vec3( -10, 0, 0 ), vec3( 1160, 0, 0 ),1);
        drawAxisArrow(vec3( 0, -10, 0 ), vec3( 0, 670, 0 ),2);
        this.scene.add(axisArrow,axis);
    };
    this.createArrow = function(x,y){
        var material = new THREE.MeshBasicMaterial({color:0x9B9B9B});
        var shape = new THREE.Shape();
        shape.moveTo(0,0,0);
        shape.lineTo(-20,20,0);
        shape.lineTo(-8,20,0);
        shape.lineTo(-8,50,0);
        shape.lineTo(8,50,0);
        shape.lineTo(8,20,0);
        shape.lineTo(20,20,0);
        shape.lineTo(0,0,0);
        var geom = new THREE.ShapeGeometry(shape);
        var mesh = new THREE.Mesh(geom,material);
        mesh.position.set(x,y+20,2);

        var vertices = [];
        vertices.push(vec3(x,y,2),vec3(x,0,2));
        var line = createLineMesh(vertices,0x000,2);

        var material1 = new THREE.MeshBasicMaterial({color:0x4D77E2});
        var cirGeo1 = new THREE.CircleGeometry(10,20,20);
        var cir1 = new THREE.Mesh(cirGeo1,material1);
        cir1.position.set(x,0,3);
        var material2 = new THREE.MeshBasicMaterial({color:0xFFFFFF});
        var cirGeo2= new THREE.CircleGeometry(8,20,20);
        var cir2 = new THREE.Mesh(cirGeo2,material2);
        cir2.position.set(x,0,4);

        var arrow = new THREE.Object3D();
        arrow.add(mesh,line,cir1,cir2);
        return arrow;
    };
    this.getRandom = function(){
        arr_random = [];
        var random,H=19,l,g;
        var randomH = Math.random()*5;
        if(randomH<0.5){
            randomH=randomH+0.5;
        }
        if(randomH>4.5){
            randomH=randomH-0.5;
        }
        var n=Math.floor(Math.random()*5);
        for(var i=0;i<H+n;i++){
            arr_random.push(randomH)
        }
        switch (parseInt(randomH*10/5)){
            case 1: l=9;g=72-n;
                break;
            case 2: l=18;g=63-n;
                break;
            case 3: l=27;g=54-n;
                break;
            case 4: l=36;g=45-n;
                break;
            case 5: l=45-n;g=36;
                break;
            case 6: l=54-n;g=27;
                break;
            case 7: l=63-n;g=18;
                break;
            case 8: l=72-n;g=9;
                break;
        }
        var randoml=parseInt(randomH*10/5)*5/10;
        var randomg=Math.ceil(randomH*10/5)*5/10;
        for(var i=1;i<=l;i++){
            random=Math.random()*randoml
            arr_random.push(random)
        }
        for(var i=1;i<=g;i++){
            random=randomg+Math.random()*(5-randomg)
            arr_random.push(random)
        }
    };
    this.showPlane = function(){
        this.scene.remove(this.group);
        this.group = new THREE.Object3D();
        allHeight = [];
        judgeMode(arr_random);
        var w = 108;
        var n = 0;
        for(var i in arr_num.mode){
            var result = arr_num["mode"][i].length/100/0.5;
            allHeight.push(result);
            var h = result*1100;
            var mesh = createPlane(w,h,0xBBE5E5);
            mesh.position.x = (2*n+1)*55;
            mesh.position.y = h/2;
            this.group.add(mesh);
            n+=1;
        }
        this.scene.add(this.group);
    };

    this.setModes = function(){
        this.scene.remove(this.arrow,this.group1);
        this.arrow = new THREE.Object3D();
        var max = 0;
        var arr = [];
        for(var i=0;i<allHeight.length;i++){
            if(allHeight[i] > max){
                max = allHeight[i];
            }
        }
        for(i=0;i<allHeight.length;i++){
            if(allHeight[i] == max){
                arr.push(i);
            }
        }

        var x = [];
        x = arr.map(function(item,index,array){
            return (item*0.5+(item+1)*0.5)/2;
        });
        x.join("、");

        var str = "众数：" + x;
        $top.text(str);
        $bottom.text("最高的矩形的中点");

        for(i=0;i<arr.length;i++){
            x = (arr[i]*0.5+(arr[i]+1)*0.5)/2*220;
            var y = max*1100;
            this.arrow.add(this.createArrow(x,y));
        }

        this.scene.add(this.arrow);

    };
    this.setMedian = function(){
        this.scene.remove(this.arrow,this.group1);
        this.arrow = null;
        this.group1 = new THREE.Object3D();
        var height = 0;
        for(var i=0;i<allHeight.length;i++){
            height += parseFloat(allHeight[i]);
        }
        var s1 = (height*0.5)/2;
        var s2 = 0;
        for(i=0;i<allHeight.length;i++){
            s2 += parseFloat(allHeight[i])*0.5;
            if((s1-s2)<0 || (s1-s2)==0){
                break;
            }
        }
        var diff = Math.abs(s1-s2);
        var x1 = (1 - (diff/(0.5*allHeight[i])))*0.5 + 0.5*i;
        var x = x1*220;
        var y = allHeight[i]*1100;
        this.arrow = this.createArrow(x,y);
        this.scene.add(this.arrow);
        //蓝色
        this.group1 = new THREE.Object3D();
        var w = 108;
        var n = i+1;
        var arr_temp = [];

        var x2 = (diff/(0.5*allHeight[i]))*0.5*220;
        var y2 = allHeight[i]*1100;
        var mesh = createPlane(x2,y2,0x80C5F4);
        mesh.position.x = x + x2/2;
        mesh.position.y = y2/2+1;
        mesh.position.z = 1;
        this.group1.add(mesh);

        for(var k in arr_num.mode){
            arr_temp.push(arr_num["mode"][k].length);
        }
        i=i+1;
        for(i;i<arr_temp.length;i++){
            var result = arr_temp[i]/100/0.5;
            var h = result*1100;
            mesh = createPlane(w,h,0x80C5F4);
            mesh.position.x = (2*n+1)*55;
            mesh.position.y = h/2+1;
            mesh.position.z = 1;
            this.group1.add(mesh);
            n+=1;
        }
        this.scene.add(this.group1);

        var str = "中位数：" + x1.toFixed(2);
        $top.text(str);
        $bottom.text("两边直方图的面积相等");
    };
    this.setAverage = function(){
        this.scene.remove(this.arrow,this.group1);
        var sum = 0;
        for(var i=0;i<allHeight.length;i++){
            sum += parseFloat(allHeight[i])*0.5*(2*i+1)*0.25;
        }

        var str = "平均数：" + sum.toFixed(3);
        $top.text(str);
        $bottom.text("每个矩形的面积与其中点的横坐标乘积之和");
    };

}


var three = new ThreeDimensional();
three.int();

renderAll();
function renderAll(){
    three.controls.update();
    requestAnimationFrame(renderAll);
    three.renderer.render(three.scene,three.camera);
}
function dynamic(){
	three.getRandom();
    three.showPlane();
    if(radioSelect==1){
        three.setModes();
    }else if(radioSelect==2){
        three.setMedian();
    }else if(radioSelect==3){
        three.setAverage();
    }
}
function renew(){
	radioSelect = 0;
    arr_random = [3.1,2.5,2.0,2.0,1.5,1.0,1.6,1.8,1.9,1.6,
        3.4,2.6,2.2,2.2,1.5,1.2,0.2,0.4,0.3,0.4,
        3.2,2.7,2.3,2.1,1.6,1.2,3.7,1.5,0.5,3.8,
        3.3,2.8,2.3,2.2,1.7,1.3,3.6,1.7,0.6,4.1,
        3.2,2.9,2.4,2.3,1.8,1.4,3.5,1.9,0.8,4.3,
        3.0,2.9,2.4,2.4,1.9,1.3,1.4,1.8,0.7,2.0,
        2.5,2.8,2.3,2.3,1.8,1.3,1.3,1.6,0.9,2.3,
        2.6,2.7,2.4,2.1,1.7,1.4,1.2,1.5,0.5,2.4,
        2.5,2.6,2.3,2.1,1.6,1.0,1.0,1.7,0.8,2.4,
        2.8,2.5,2.2,2.0,1.5,1.0,1.2,1.8,0.6,2.2
    ];
    arr_num = {
        mode:{
            a:[],
            b:[],
            c:[],
            d:[],
            e:[],
            f:[],
            g:[],
            h:[],
            i:[],
            j:[]
        }
    };
    allHeight = [];

    $('.radios').find('.radiocircle').removeClass('select');
    $(".showResult").css("display","none");

    three.scene.remove(three.arrow,three.group1);
    three.showPlane();
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
function radioChoose(){
    $('.radios').find('.radiocircle').removeClass('select');
    $(this).find('.radiocircle').addClass('select');
    radioSelect = parseInt($(this).attr('data-id'));
    $('.slider1').css('visibility','visible');
    $('.xdsoft_slider_label').css('display','block');

    $(".showResult").css("display","block");

    switch(radioSelect){
        case 1:three.setModes();three.showPlane();
            break;
        case 2:three.setMedian();three.showPlane();
            break;
        case 3:three.setAverage();three.showPlane();
    }
}
if(isMob){
	//单选框事件
	$('.radioChoose .radios').on('touchstart',radioChoose);
	//数据重置事件
	$(".dynamic").on('touchstart',dynamic);
	//重置事件
	$("#renew").on('touchstart',renew);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	//单选框事件
	$('.radioChoose .radios').on('click',radioChoose);
	//数据重置事件
	$(".dynamic").on('click',dynamic);
	//重置事件
	$("#renew").on('click',renew);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}

