/****** start ******/
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

/****** end ******/


/****** 位置相关 ******/
var $obj = $('#threeContainer'),
    threeHeight = $obj.height(),
    threeWidth = $obj.width();


/****** 全局变量 ******/
var flag1 = false;
var flag2 = false;
var arr_temp = [];
var arr_random = [];
var pos = {
    x:70,
    y:350
};
var stem1 = {
    a:[],
    b:[],
    c:[],
    d:[],
    e:[],
    f:[]
};
var stem2 = {
    a:[],
    b:[],
    c:[],
    d:[],
    e:[],
    f:[]
};


function ThreeDimensional() {
    this.group = new THREE.Object3D();

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

        this.createLine();
        this.fixedText();

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
    function getStemLeaf(arr){
        for(var k in stem1){
            stem1[k]=[];
            stem2[k]=[];
        }
        for(var i=0;i<arr.length/2;i++){
            var ten = parseInt(arr[i]/10);
            var single = arr[i]%10;
            switch(ten){
                case 0:stem1.a.push(single);
                    continue;
                case 1:stem1.b.push(single);
                    continue;
                case 2:stem1.c.push(single);
                    continue;
                case 3:stem1.d.push(single);
                    continue;
                case 4:stem1.e.push(single);
                    continue;
                case 5:stem1.f.push(single);
            }
        }
        for(i;i<arr.length;i++){
            ten = parseInt(arr[i]/10);
            single = arr[i]%10;
            switch(ten){
                case 0:stem2.a.push(single);
                    continue;
                case 1:stem2.b.push(single);
                    continue;
                case 2:stem2.c.push(single);
                    continue;
                case 3:stem2.d.push(single);
                    continue;
                case 4:stem2.e.push(single);
                    continue;
                case 5:stem2.f.push(single);
            }
        }
    }

    /****** 其他事件 ******/
    this.random = function(){
        arr_temp = [];
        for(var i=0;i<10;i++){
            var random = Math.floor(Math.random()*50+1);
            arr_temp.push(random);
            arr_random.push(random);
        }
    };
    this.fill = function(){
        arr_random = [];
        this.random();
        var $block1 = $("#block1").find(".formula-right");
        for(var i=0;i<$block1.length;i++){
            $($block1[i]).text(arr_temp[i]);
        }
        this.random();
        var $block2 = $("#block2").find(".formula-right");
        for(i=0;i<$block2.length;i++){
            $($block2[i]).text(arr_temp[i]);
        }
    };
    this.createLine = function(){
        var vertices1 = [],
            vertices2 = [],
            vertices3 = [];
        vertices1.push(vec3(-500,pos.y,0),vec3(500,pos.y,0));
        vertices2.push(vec3(-pos.x,450,0),vec3(-pos.x,-450,0));
        vertices3.push(vec3(pos.x,450,0),vec3(pos.x,-450,0));
        var line1 = createLineMesh(vertices1,0x000000,3);
        var line2 = createLineMesh(vertices2,0x000000,3);
        var line3 = createLineMesh(vertices3,0x000000,3);
        this.scene.add(line1,line2,line3);
    };
    this.fixedText = function(){
        var a = text("甲",34,"#000");
        var b = text("乙",34,"#000");
        a.position.set(-250,pos.y+50,0);
        b.position.set(250,pos.y+50,0);
        this.scene.add(a,b);
        //
        var n0 = text("0",34,"#000");
        var n1 = text("1",34,"#000");
        var n2 = text("2",34,"#000");
        var n3 = text("3",34,"#000");
        var n4 = text("4",34,"#000");
        var n5 = text("5",34,"#000");
        n0.position.set(0,pos.y-100,0);
        n1.position.set(0,pos.y-2*100,0);
        n2.position.set(0,pos.y-3*100,0);
        n3.position.set(0,pos.y-4*100,0);
        n4.position.set(0,pos.y-5*100,0);
        n5.position.set(0,pos.y-6*100,0);
        this.scene.add(n0,n1,n2,n3,n4,n5);
    };
    this.setStemLeaf = function(){
        this.scene.remove(this.group);
        this.group.children = [];
        this.group = new THREE.Object3D();
        getStemLeaf(arr_random);
        var j=1;
        for(var k in stem1){
            if(stem1[k].length>0){
                for(var i=0;i<stem1[k].length;i++){
                    var texts = text(stem1[k][i],34,"#000");
                    texts.position.set(-pos.x-50*(i+1),pos.y-j*100,0);
                    this.group.add(texts);
                }
                j++;
            }
        }
        j = 1;
        for(k in stem2){
            if(stem2[k].length>0){
                for(i=0;i<stem2[k].length;i++){
                    texts = text(stem2[k][i],34,"#000");
                    texts.position.set(pos.x+50*(i+1),pos.y-j*100,0);
                    this.group.add(texts);
                }
                j++;
            }
        }
        if(flag2){
            this.scene.add(this.group);
        }
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

function clickEve1(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
    }
}
var $div1 = $("#div1");
function renew(){
	$(".random").text("随机填充");
    $("#block1").find(".formula-right").text("");
    $("#block2").find(".formula-right").text("");

    $("#div1").parent().parent().removeClass('on').addClass('off');
    $("#div1").parent().parent().find('.span2').text('' +'off');

    flag1 = flag2 = false;
    three.scene.remove(three.group);
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
function random_num(){
    flag1 = true;
    three.fill();
    three.setStemLeaf();
    $(this).text("数据重置");
}
if(isMob){
	//随机填充事件
	$(".random").on("touchstart",random_num);
	//on/off事件
	$div1.on('touchstart',clickEve1);
	$div1.on('touchstart',function(){
	    if(flag2){
	        three.scene.remove(three.group);
	    }else{
	        three.scene.add(three.group);
	    }
	    flag2 = !flag2;
	});
	//重置事件
	$("#renew").on('touchstart',renew);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	//随机填充事件
	$(".random").on("click",random_num);
	//on/off事件
	$div1.on('click',clickEve1);
	$div1.on('click',function(){
	    if(flag2){
	        three.scene.remove(three.group);
	    }else{
	        three.scene.add(three.group);
	    }
	    flag2 = !flag2;
	});
	//重置事件
	$("#renew").on('click',renew);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}





