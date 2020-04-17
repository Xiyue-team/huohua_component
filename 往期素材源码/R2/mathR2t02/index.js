//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});

var zoom=1;
var height=window.innerHeight-120;
var width=window.innerWidth;
$('#main').height(height)
var TWO=1024,THO=648;
if(width/height>1024/648){
    var TH=height;
    zoom=TH/THO;
}else{
    var TW=width;
    zoom=TW/TWO;
}
$('#threeContainer').css('zoom',zoom);
window.onresize=function(){
	height=window.innerHeight-120;
    width=window.innerWidth;
    $('#main').height(height)
    if(width/height>1024/648){
        var TH=height;
        zoom=TH/THO;
    }else{
        var TW=width;
        zoom=TW/TWO;
    }
    $('#threeContainer').css('zoom',zoom);
}

var isMob = /iPad|Android/g.test(navigator.userAgent);
var chooseNum=0;
//初始全局变量
var obj=null,obj1=null,obj2=null,obj1y;
var point={
    1:[-200,-120,100],
    2:[100,-120,100],
    3:[200,-120,-100],
    4:[-100,-120,-100],
    5:[-200,-100,100],
    6:[100,-100,100],
    7:[200,-100,-100],
    8:[-100,-100,-100],
    9:[-1400,-500,1400],
    10:[1000,-500,1400],
    11:[1600,-500,-900],
    12:[-600,-500,-900],
    13:[-300-140,-330,150],
    14:[150-140,-330,150],
    15:[300-140,-330,-150],
    16:[-150-140,-330,-150],
    17:[305,400,0],
    18:[-200,-330,100],
    19:[100,-330,100],
    20:[200,-330,-100],
    21:[-100,-330,-100],
    22:[-200,250,100],
    23:[100,250,100],
    24:[200,250,-100],
    25:[-100,250,-100]
}
/****** 位置相关 ******/
var $obj=$('#threeContainer'),threeHeight = 648,threeWidth = 1024;

function ThreeDimensional() {
    var mousedownflag = false;
    var thiz = this;
    var selectobjs=[],selectobj=null;

    /****** 判断是否支持WebGL ******/
    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();
    this.renderer = null;
    if(canWebgl){
        this.renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
    }else{
        this.renderer = new THREE.CanvasRenderer({antialias:true,alpha:true});
    }
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-threeWidth/1.2,threeWidth/1.2,threeHeight/1.2,-threeHeight/1.2,-100,10000);
    
    this.controls = null;

    /****** 分割线 ******/
    this.int = function () {
        this.camera.position.x = 0;
        this.camera.position.y = 400;
        this.camera.position.z = 1200;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff,0);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);
        this.createControls();
        this.createObj();
    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = false;
        this.controls.enableRotate = false;
        this.controls.enablePan = false;
    };

    /****** 事件函数 ******/
    function createLineMesh(vertices, color, style) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        if(style==2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 10,
                gapSize: 10,
                depthTest:false
            }));
        }else if( style == 3){
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color,linewidth: 2 }));
        }
        return lineMesh;
    }
    function vec3(x,y,z){
        return new THREE.Vector3(x, y, z);
    }
    function createText(vertices,font,size,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(font, textStyle);
        text.position.x=vertices[0].x
        text.position.y=vertices[0].y
        text.position.z=vertices[0].z
        return text;
    }
    function createTriangleFace(vertices,color,o){
        if(!o){
            o=1;
        }
        var material = new THREE.MeshBasicMaterial({color:color,side:THREE.DoubleSide,transparent:true,opacity:o});
        var geom = new THREE.Geometry();
        geom.faces.push(new THREE.Face3(0,1,2),new THREE.Face3(2,1,0));
        geom.vertices = vertices;
        var mesh = new THREE.SceneUtils.createMultiMaterialObject(geom,[material]);
        return mesh;
    }
    function ceratemesh(n1,n2,n3,o,color,op){
        var vertices=[];
        vertices.push(vec3(point[n1][0],point[n1][1],point[n1][2]))
        vertices.push(vec3(point[n2][0],point[n2][1],point[n2][2]))
        vertices.push(vec3(point[n3][0],point[n3][1],point[n3][2]))
        var mesh=createTriangleFace(vertices,color,op);
        o.add(mesh)
    }
    function line_c(n1,n2,o1){
        var line;
        var vertices=[];
        vertices.push(vec3(point[n1][0],point[n1][1],point[n1][2]))
        vertices.push(vec3(point[n2][0],point[n2][1],point[n2][2]))
        line=createLineMesh(vertices,'#ffffff',3)
        o1.add(line);
    }
    /****** 其他事件 ******/
    this.createObj=function(){
        if(obj!=null){
            three.scene.remove(obj);
        }
        obj = new THREE.Object3D();
        ceratemesh(5,6,8,obj,'#FFEFBF')
        ceratemesh(8,6,7,obj,'#FFEFBF')
        ceratemesh(1,5,2,obj,'#F2E0A9')
        ceratemesh(5,2,6,obj,'#F2E0A9')
        ceratemesh(2,6,7,obj,'#F2E0A9')
        ceratemesh(2,7,3,obj,'#F2E0A9')

        ceratemesh(9,10,11,obj,'#E5B39E') 
        ceratemesh(9,12,11,obj,'#E5B39E') 

        three.scene.add(obj)
    };
    this.createObj1=function(){
        if(obj1!=null){
            three.scene.remove(obj1,obj1y);
        }
        obj1 = new THREE.Object3D(); 
        obj1y = new THREE.Object3D(); 

        ceratemesh(13,14,15,obj1y,'#000000',0.15) 
        ceratemesh(13,15,16,obj1y,'#000000',0.15) 

        // obj1.position.set(-160,0,0)

        line_c(17,13,obj1)
        line_c(17,14,obj1)
        line_c(17,15,obj1)
        line_c(17,16,obj1)

        three.scene.add(obj1,obj1y)
       
    };
    this.createObj2=function(){
        if(obj2!=null){
            three.scene.remove(obj2);
        }
        obj2 = new THREE.Object3D(); 

        ceratemesh(18,19,20,obj2,'#000000',0.15) 
        ceratemesh(18,20,21,obj2,'#000000',0.15) 

        // obj1.position.set(-160,0,0)

        line_c(22,18,obj2)
        line_c(23,19,obj2)
        line_c(24,20,obj2)
        line_c(25,21,obj2)

        three.scene.add(obj2)
    }
}
$('.ht div').bind('touchstart',touchStart);
$('.ht div').bind('mousedown',mouseDown);

var TX,TY,TX2,TY2,mX,mY,touch_flage=false,TXO,TYO,mX2,mY2;
var L,pL=$('.ht div').width(),rL=$('.ht').width();
var centerL=(rL-pL)/2;
$('.ht div').css('left',centerL);
function touchStart(e){
    TX=event.touches[0].clientX;
    TY=event.touches[0].clientY;
    L=parseInt($('.ht div').css('left'))
    $('#threeContainer').bind('touchmove',touchMove);
    $('#threeContainer').bind('touchend',touchEnd);
}
function touchMove(e){
    TX2=event.touches[0].clientX;
    TY2=event.touches[0].clientY;
    mX=TX2-TX
    mY=TY2-TY
    setTimeout(function(){
        TXO=TX2;
        TYO=TY2;
    },10)
    mX2=TX2-TXO;
    mY2=TY2-TYO;
    var LL=L+mX;
    if(LL<0){
        LL=0;
    }else if(rL-LL<pL){
        LL=rL-pL
    }else if(centerL-50<LL&&LL<centerL+50){
        LL=centerL;
        point={
            1:[-200,-120,100],
            2:[100,-120,100],
            3:[200,-120,-100],
            4:[-100,-120,-100],
            5:[-200,-100,100],
            6:[100,-100,100],
            7:[200,-100,-100],
            8:[-100,-100,-100],
            9:[-1400,-500,1400],
            10:[1000,-500,1400],
            11:[1600,-500,-900],
            12:[-600,-500,-900],
            13:[-300-140,-330,150],
            14:[150-140,-330,150],
            15:[300-140,-330,-150],
            16:[-150-140,-330,-150],
            17:[305,400,0],
            18:[-200,-330,100],
            19:[100,-330,100],
            20:[200,-330,-100],
            21:[-100,-330,-100],
            22:[-200,250,100],
            23:[100,250,100],
            24:[200,250,-100],
            25:[-100,250,-100]
        }
    }else{
        for(var i=18;i<22;i++){
            point[i][0]=point[i][0]-mX2
        }
        for(var i=22;i<26;i++){
            point[i][0]=point[i][0]+mX2*360/220
        }
    }
    three.createObj2();
    $('.ht div').css({'left':LL+'px'});
}
function touchEnd(e){
    $('#threeContainer').unbind('touchmove',touchMove);
    $('#threeContainer').unbind('touchend',touchEnd);
}
function mouseDown(e){
    TX=event.clientX;
    TY=event.clientY;
    touch_flage=true;
    L=parseInt($('.ht div').css('left'));
    $('#threeContainer').bind('mousemove',mouseMove);
    $('#threeContainer').bind('mouseup',mouseUp);
}
function mouseMove(e){
    if(touch_flage){
        TX2=event.clientX;
        TY2=event.clientY;
        mX=TX2-TX
        mY=TY2-TY
        var LL=L+mX;
        setTimeout(function(){
            TXO=TX2;
            TYO=TY2;
        },10)
        mX2=TX2-TXO;
        mY2=TY2-TYO;
        if(LL<0){
            LL=0;
        }else if(rL-LL<pL){
            LL=rL-pL
        }else if(centerL-50<LL&&LL<centerL+50){
            LL=centerL;
            point={
                1:[-200,-120,100],
                2:[100,-120,100],
                3:[200,-120,-100],
                4:[-100,-120,-100],
                5:[-200,-100,100],
                6:[100,-100,100],
                7:[200,-100,-100],
                8:[-100,-100,-100],
                9:[-1400,-500,1400],
                10:[1000,-500,1400],
                11:[1600,-500,-900],
                12:[-600,-500,-900],
                13:[-300-140,-330,150],
                14:[150-140,-330,150],
                15:[300-140,-330,-150],
                16:[-150-140,-330,-150],
                17:[305,400,0],
                18:[-200,-330,100],
                19:[100,-330,100],
                20:[200,-330,-100],
                21:[-100,-330,-100],
                22:[-200,250,100],
                23:[100,250,100],
                24:[200,250,-100],
                25:[-100,250,-100]
            }
        }else{
            for(var i=18;i<22;i++){
                point[i][0]=point[i][0]-mX2
            }
            for(var i=22;i<26;i++){
                point[i][0]=point[i][0]+mX2*360/220
            }
        }
        three.createObj2();
        $('.ht div').css({'left':LL+'px'});
    }
}
function mouseUp(e){
    touch_flage=false;
    $('#threeContainer').unbind('mousemove',mouseMove);
    $('#threeContainer').unbind('mouseup',mouseUp);
}

var three = new ThreeDimensional();
three.int();

renderAll();

var check=false;
function renderAll(){
    three.controls.update();
    requestAnimationFrame(renderAll);
    three.renderer.render(three.scene,three.camera);
}
var chooseNum=2;
function choose(){
    point={
        1:[-200,-120,100],
        2:[100,-120,100],
        3:[200,-120,-100],
        4:[-100,-120,-100],
        5:[-200,-100,100],
        6:[100,-100,100],
        7:[200,-100,-100],
        8:[-100,-100,-100],
        9:[-1400,-500,1400],
        10:[1000,-500,1400],
        11:[1600,-500,-900],
        12:[-600,-500,-900],
        13:[-300-140,-330,150],
        14:[150-140,-330,150],
        15:[300-140,-330,-150],
        16:[-150-140,-330,-150],
        17:[305,400,0],
        18:[-200,-330,100],
        19:[100,-330,100],
        20:[200,-330,-100],
        21:[-100,-330,-100],
        22:[-200,250,100],
        23:[100,250,100],
        24:[200,250,-100],
        25:[-100,250,-100]
    }
    var index=$(this).index();
    if(chooseNum==index) return;
    $('.sd').css({'top':'28%','right':'18%','left':'auto'});
    $('#title p span').css({'color':'#000','background':'#fff'});
    $(this).css({'color':'#fff','background':'#5caefd'});
    if(index==0){
        $('.sd').show()
        $('.ht').hide()
        $('.ht div').css({'left':centerL+'px'});
        three.createObj1();
        three.scene.remove(obj2)
    }else{
        $('.sd').hide()
        $('.ht').show()
        $('.ht div').css({'left':centerL+'px'});
        three.createObj2();
        three.scene.remove(obj1,obj1y)
    }
}
function reset(){
    $('#title p span').css({'color':'#000','background':'#fff'});
    chooseNum=2;
    three.scene.remove(obj1,obj1y,obj2);
    $('.sd,.ht').hide();
    $('.sd').css({'top':'28%','right':'18%','left':'auto'});
    point={
        1:[-200,-120,100],
        2:[100,-120,100],
        3:[200,-120,-100],
        4:[-100,-120,-100],
        5:[-200,-100,100],
        6:[100,-100,100],
        7:[200,-100,-100],
        8:[-100,-100,-100],
        9:[-1400,-500,1400],
        10:[1000,-500,1400],
        11:[1600,-500,-900],
        12:[-600,-500,-900],
        13:[-300-140,-330,150],
        14:[150-140,-330,150],
        15:[300-140,-330,-150],
        16:[-150-140,-330,-150],
        17:[305,400,0],
        18:[-200,-330,100],
        19:[100,-330,100],
        20:[200,-330,-100],
        21:[-100,-330,-100],
        22:[-200,250,100],
        23:[100,250,100],
        24:[200,250,-100],
        25:[-100,250,-100]
    }
}
// 拖拽灯泡
var LDP=(1024-615)/2;
$( ".sd" ).draggable({
    containment: "parent",
    drag:function (event,ui) {
        var L=parseInt(event.target.style.left)+15;
        var T=parseInt(event.target.style.top)+30;
        var x1=(LDP+L)/1024*1700-850;
        var y1=575-T/324*575;
        point[17]=[x1,y1,0];
        var z1=0;
        var p={
            1:[-200,-110,100],
            2:[100,-110,100],
            3:[200,-110,-100],
            4:[-100,-110,-100]
        }
        var y=-330;
        var y2=-110;
        var result=[];
        for(var i=0;i<4;i++){
            var x2=p[i+1][0];
            var z2=p[i+1][2];
            var x=(y-y1)/(y2-y1)*(x2-x1)+x1;
            var z=(y-y1)/(y2-y1)*(z2-z1)+z1;
            result.push(x,z);
        }
        point[13]=[result[0],-330,result[1]],
        point[14]=[result[2],-330,result[3]],
        point[15]=[result[4],-330,result[5]],
        point[16]=[result[6],-330,result[7]],
        three.createObj1();
    }
});
if(isMob){
    $('#title p span').on('touchstart',choose);
    $('#reset img').on('touchstart',reset);
}else{
    $('#title p span').on('click',choose);
    $('#reset img').on('click',reset);
}