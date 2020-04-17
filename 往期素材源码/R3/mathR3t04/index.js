//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}
$(function () {
    FastClick.attach(document.body);
});
$(document).on('touchmove',function (e){
    e.preventDefault();
});

//禁止选择
document.onselectstart = function () {
    return false;
};

var isMob = /iPad|Android/g.test(navigator.userAgent);

var width = window.innerWidth;
var height = window.innerHeight;
var zoom = 1;
var zoom1 = 1;
if (height>300&&height < 580) {
    zoom = 0.6;
    zoom1 = 1.3;
    $('#right').css('zoom', zoom);
    $('#reset').css('zoom', zoom1);
}else if (height<300){
    zoom = 0.5;
    zoom1 = 1.2;
    $('#right').css('zoom', zoom);
    $('#reset').css('zoom', zoom1);
} 
$('#left').width(width - 280 * zoom);
$('#main').height(height-80);
window.onresize = function () {
    width = window.innerWidth;
    height = window.innerHeight;
    if (width <= 580) width = 580;
    if (height < 580) {
        zoom = 0.6;
        $('#right').css('zoom', zoom);
    } else {
        zoom = 1;
        $('#right').css('zoom', zoom);
    }
    $('#left').width(width - 280 * zoom);
    $('#main').height(height-80);
    var cW = $('canvas').width();
    var cH = $('canvas').height();
    // $('canvas').css({'left': ($('#main').width() - cW) / 2 + 'px', 'top': ($('#main').height() - cH) / 2 + 'px'});
};
var one = height / zoom;
$('#right').css('height', one);
//初始全局变量
var grid = null;
var obj= null;
var obj2= null;
var obj_c=null;
var obj_c2=null;
var obj_out1=null;
var obj_out1x=null;
var Va=null;
var S,anmate_flag=false,showed=false,cut_ed=false,a;

var point={
    1:[-200,-200,-200],
    2:[200,-200,200],
    3:[200,-200,-200],
    4:[200,300,-200],
    5:[-200,300,-200],
    6:[200,300,200],
}
var point2={
    1:[-200.5,-200.5,-200.5],
    2:[200.5,-200.5,200.5],
    3:[200.5,-200.5,-200.5],
    4:[200.5,300.5,-200.5],
    5:[-200.5,300.5,-200.5],
    6:[200.5,300.5,200.5],
}
var point3={
    1:[-215,-215,-215],
    2:[215,-215,215],
    3:[215,-215,-215],
    4:[215,315,-215],
    5:[-215,315,-215],
    6:[215,315,215],
}


/****** 位置相关 ******/
var $obj = $('#main');
    threeHeight = $obj.height(),
    threeWidth = $obj.width();

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
        this.renderer = new THREE.WebGLRenderer({antialias:true});
    }else{
        this.renderer = new THREE.CanvasRenderer();
    }
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.autoClear = false;
    this.scene = new THREE.Scene();
    this.scene2 = new THREE.Scene();
    var W = window.innerWidth;
    if (W < 800) {
        this.camera = new THREE.OrthographicCamera(threeWidth / -0.3, threeWidth / 0.3, threeHeight / 0.3, threeHeight / -0.3, -100, 10000);
    } else {
        this.camera = new THREE.OrthographicCamera(threeWidth / -0.8, threeWidth / 0.8, threeHeight / 0.8, threeHeight / -0.8, -100, 10000);
    }


    this.controls = null;

    /****** 分割线 ******/
    this.int = function () {
        this.camera.position.x = 400;
        this.camera.position.y = 600;
        this.camera.position.z = 1200;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);
        this.createControls();
        this.createObj();
        // this.createGrid();
        this.createVa();

    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate =true;
        this.controls.enablePan =false;
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
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
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
    function createTriangleFace(vertices,color){
        var material = new THREE.MeshBasicMaterial({color:color,opacity:0.8});
        var geom = new THREE.Geometry();
        geom.faces.push(new THREE.Face3(0,1,2),new THREE.Face3(2,1,0));
        geom.vertices = vertices;
        var mesh = new THREE.SceneUtils.createMultiMaterialObject(geom,[material]);
        return mesh;
    }
    function ceratemesh(n1,n2,n3,o){
        var vertices=[];
        vertices.push(vec3(point[n1][0],point[n1][1],point[n1][2]))
        vertices.push(vec3(point[n2][0],point[n2][1],point[n2][2]))
        vertices.push(vec3(point[n3][0],point[n3][1],point[n3][2]))
        var mesh=createTriangleFace(vertices,'#CFEAF8');
        o.add(mesh)
    }
    function line_c(n1,n2,o1,o2){
        var line;
        var vertices=[];
        vertices.push(vec3(point2[n1][0],point2[n1][1],point2[n1][2]))
        vertices.push(vec3(point2[n2][0],point2[n2][1],point2[n2][2]))
        line=createLineMesh(vertices,'#000000',3)
        o1.add(line);
        line=createLineMesh(vertices,'#000000',2)
        o2.add(line);
    }
    function createA(a,b,c,d,o1,o2){
        vertices=[];
        vertices.push(vec3(point[a][0],point[a][1],point[a][2]))
        vertices.push(vec3(point[b][0],point[b][1],point[b][2]))
        vertices.push(vec3(point[c][0],point[c][1],point[c][2]))
        var mesho1=createTriangleFace(vertices,'#CFEAF8')

        vertices=[];
        vertices.push(vec3(point[b][0],point[b][1],point[b][2]))
        vertices.push(vec3(point[c][0],point[c][1],point[c][2]))
        vertices.push(vec3(point[d][0],point[d][1],point[d][2]))
        var mesho2=createTriangleFace(vertices,'#CFEAF8')

        vertices=[];
        vertices.push(vec3(point[c][0],point[c][1],point[c][2]))
        vertices.push(vec3(point[d][0],point[d][1],point[d][2]))
        vertices.push(vec3(point[a][0],point[a][1],point[a][2]))
        var mesho3=createTriangleFace(vertices,'#CFEAF8')

        vertices=[];
        vertices.push(vec3(point[d][0],point[d][1],point[d][2]))
        vertices.push(vec3(point[a][0],point[a][1],point[a][2]))
        vertices.push(vec3(point[b][0],point[b][1],point[b][2]))
        var mesho4=createTriangleFace(vertices,'#CFEAF8')

        o1.add(mesho1,mesho2,mesho3,mesho4)

        line_c(a,b,o1,o2)
        line_c(a,c,o1,o2)
        line_c(a,d,o1,o2)
        line_c(b,c,o1,o2)
        line_c(b,d,o1,o2)
        line_c(c,d,o1,o2)
    };
    this.createTextPoint=function(n,font,o){
        var vertices=[];
        vertices.push(vec3(point3[n][0],point3[n][1],point3[n][2]))
        var text=createText(vertices,font,32,'#000')
        o.add(text)
    };

    this.createVa=function (){
        if(Va!=null){
            three.scene.remove(Va);
        }
        Va = new THREE.Object3D();
        var material = new THREE.MeshBasicMaterial({color:'#4a4a4a',side:THREE.DoubleSide});
        var cylinder1 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 60, 36, 3), material);

        cylinder1.rotation.x=-Math.PI/2;
        cylinder1.position.z=280;
        cylinder1.position.y=50;

        var cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(6, 0, 20, 36, 3), material);
        cylinder2.rotation.x=Math.PI/2;
        cylinder2.position.z=240;
        cylinder2.position.y=50;

        var vertices=[];
        vertices.push(vec3(0,40,330))
        var text=createText(vertices,'正视角',26,'#000')

        Va.add(cylinder1,cylinder2,text)

        three.scene.add(Va);
    };
    this.createObj=function(){
        if(obj!=null){
            three.scene.remove(obj);
            three.scene2.remove(obj2);
        }
        obj = new THREE.Object3D();
        obj2 = new THREE.Object3D();
        if(obj!=null){
            this.scene.remove(obj);
        }
        obj = new THREE.Group();


        ceratemesh(1,2,3,obj);
        ceratemesh(1,2,5,obj);
        ceratemesh(2,6,5,obj);
        ceratemesh(4,5,6,obj);
        ceratemesh(1,5,4,obj);
        ceratemesh(3,1,4,obj);
        ceratemesh(2,3,4,obj);
        ceratemesh(2,4,6,obj);

        //轮廓线
        line_c(1,2,obj,obj2);
        line_c(2,3,obj,obj2);
        line_c(3,4,obj,obj2);
        line_c(4,5,obj,obj2);
        line_c(5,6,obj,obj2);
        line_c(6,4,obj,obj2);
        line_c(1,3,obj,obj2);
        line_c(2,6,obj,obj2);
        line_c(1,5,obj,obj2);

        //字母标识
        three.createTextPoint(1,'A',obj);
        three.createTextPoint(2,'B',obj);
        three.createTextPoint(3,'C',obj);
        three.createTextPoint(4,'F',obj);
        three.createTextPoint(5,'D',obj);
        three.createTextPoint(6,'E',obj);

        three.scene.add(obj)
        three.scene2.add(obj2)
    };
    this.createCuts=function(step){

        three.scene.remove(obj_c);
        three.scene2.remove(obj_c2);

        obj_c = new THREE.Object3D();
        obj_c2 = new THREE.Object3D();

        ceratemesh(2,6,8,obj_c);
        ceratemesh(4,6,8,obj_c);
        ceratemesh(2,4,6,obj_c);
        ceratemesh(2,4,8,obj_c);

        if(step==1){
            line_c(2,4,obj_c,obj_c2);
            line_c(2,6,obj_c,obj_c2);
            line_c(2,8,obj_c,obj_c2);
            line_c(4,6,obj_c,obj_c2);
            line_c(4,8,obj_c,obj_c2);
            line_c(6,8,obj_c,obj_c2);
        }else if(step==2){
            line_c(2,6,obj_c,obj_c2);
            line_c(2,8,obj_c,obj_c2);
            line_c(4,6,obj_c,obj_c2);
            line_c(4,8,obj_c,obj_c2);
            line_c(6,8,obj_c,obj_c2);
        }else if(step==3){
            line_c(4,6,obj_c,obj_c2);
            line_c(4,8,obj_c,obj_c2);
            line_c(6,8,obj_c,obj_c2);
        }else if(step==4){

        }

        //字母标识
        three.createTextPoint(2,'B',obj_c);
        three.createTextPoint(4,'D',obj_c);
        three.createTextPoint(6,'E',obj_c);
        three.createTextPoint(8,'G',obj_c);

        three.scene.add(obj_c)
        three.scene2.add(obj_c2)
    }
    this.createCut=function(){
        $('#check').css('display','block');
        $("#center>p").removeClass('pNoActive').addClass('pActive');
        if(anmate_flag==true){
            return;
        }
        anmate_flag=true
        if(obj_c!=null){
            three.scene.remove(obj_c,obj_out1);
            three.scene2.remove(obj_c2,obj_out1x);
        }
        three.scene.remove(obj);
        three.scene2.remove(obj2);

        obj_out1 = new THREE.Object3D();
        obj_out1x = new THREE.Object3D();
        obj_c = new THREE.Object3D();
        obj_c2 = new THREE.Object3D();

        line_c(5,6,obj_c,obj_c2);
        line_c(3,6,obj_c,obj_c2);
        line_c(3,5,obj_c,obj_c2);
        line_c(5,1,obj_c,obj_c2);
        line_c(1,2,obj_c,obj_c2);
        line_c(2,6,obj_c,obj_c2);
        line_c(1,3,obj_c,obj_c2);
        line_c(2,3,obj_c,obj_c2);
        ceratemesh(2,3,6,obj_c);
        ceratemesh(1,3,5,obj_c);
        ceratemesh(1,2,5,obj_c);
        ceratemesh(2,5,6,obj_c);
        ceratemesh(1,2,3,obj_c);
        ceratemesh(3,5,6,obj_c);

        //字母标识
        three.createTextPoint(1,'A',obj_c);
        three.createTextPoint(2,'B',obj_c);
        three.createTextPoint(3,'C',obj_c);
        three.createTextPoint(5,'D',obj_c);
        three.createTextPoint(6,'E',obj_c);

        three.scene.add(obj_c);
        three.scene2.add(obj_c2);

        //字母标识
        three.createTextPoint(3,'C',obj_out1);
        three.createTextPoint(4,'F',obj_out1);
        three.createTextPoint(5,'D',obj_out1);
        three.createTextPoint(6,'E',obj_out1);

        line_c(5,6,obj_out1,obj_out1x);
        line_c(3,6,obj_out1,obj_out1x);
        line_c(3,5,obj_out1,obj_out1x);

        createA(3,4,5,6,obj_out1,obj_out1x)

        three.scene.add(obj_out1);
        three.scene2.add(obj_out1x);


        S=setTimeout(function () {
            clearTimeout(S);
            var S_t=0;
            S=setInterval(function(){
                if(S_t==50){
                    clearInterval(S);
                    three.scene.remove(obj_out1)
                    three.scene2.remove(obj_out1x)
                    anmate_flag=false;
                    cut_flag=true;
                    showed=false;
                    if($('.show_main').css('display')=='none'){
                        // $('canvas').css('margin-left','-140px');
                        $('#main>div.show_main').show();
                        $('#check>span').css('background', '#5CAEFD').children().css({'right': '2px', 'left': 'auto'});
                        checked = true;
                    }
                    return;
                }
                obj_out1.position.x+=8;
                obj_out1.position.z-=8;

                obj_out1x.position.x+=8;
                obj_out1x.position.z-=8;

                S_t++;
            },10)
        },1000);
    }
}


var three = new ThreeDimensional();
three.int();

renderAll();
function renderAll(){
    three.controls.update();
    requestAnimationFrame(renderAll);
    three.renderer.clear();
    three.renderer.render(three.scene,three.camera);
    three.renderer.render(three.scene2,three.camera);
}
$('canvas').on('touchmove',function(){
    $('.view span').css({'background':'#fff','color':'#000','border':'1px solid #4a4a4a'})
})
var mouse_flag=false;
$('canvas').on('mousedown',function(){
    mouse_flag=true;
})
$('canvas').on('mousemove',function(){
    if(mouse_flag){
        $('.view span').css({'background':'#fff','color':'#000','border':'1px solid #4a4a4a'})
    }
})
$('canvas').on('mouseup',function(){
    mouse_flag=false;
})
function reset(){
    $('#center>p').removeClass('pActive').addClass('pNoActive');
    anmate_flag=false;
    cut_flag=false;
    showed=false;
    clearInterval(S);
    clearInterval(a);
    clearTimeout(S);
    three.createObj();
    three.scene.remove(obj_c,obj_out1)
    three.scene2.remove(obj_c2,obj_out1x)
    three.camera.position.x = 400;
    three.camera.position.y = 600;
    three.camera.position.z = 1200;
    three.camera.zoom=1;
    three.camera.updateProjectionMatrix();
    checked = true;
    $('#check>span').css('background', '#5CAEFD').children().css({'right': '2px', 'left': 'auto'});
    // $('canvas').css('margin-left','-140px');
    $('#step>div span').css('background', '#f0f0f0');
    $('.show_main').show();
}

function rotate(aim){
    var position = three.camera.position;
    var x = aim[0] - position.x,
        y = aim[1] - position.y,
        z = aim[2] - position.z;
    var n = 20, v1 = x/n, v2 = y/n, v3 = z/n;
    a = setInterval(function(){
        n--;
        if(n<0){
            clearInterval(a);
            return false;
        }
        position = three.camera.position;
        three.camera.position.set(position.x+v1,position.y+v2,position.z+v3);
    },40);
}
//选取三视图
var clickTrue;
function step() {
    if (clickTrue) {
        return;
    }
    $('#step>div span').css('background', '#f0f0f0');
    $(this).children('span').css('background', '#5caefd');
    var index = $(this).index() + 1;
    if (index == 1) {
        zView();
    } else if (index == 2) {
        cView();
    } else if (index == 3) {
        fView();
    }
}
function zView(){
    clearInterval(a);
    rotate([0,0,1200]);
    $('.view span').css({'background':'#fff','color':'#000','border':'1px solid #4a4a4a'})
    $(this).css({'background':'#F5A623','color':'#fff','border':'1px solid #F5A623'})
}
function cView(){
    clearInterval(a);
    rotate([-1200,0,0]);
    $('.view span').css({'background':'#fff','color':'#000','border':'1px solid #4a4a4a'})
    $(this).css({'background':'#F5A623','color':'#fff','border':'1px solid #F5A623'})
}
function fView(){
    clearInterval(a);
    rotate([0,1200,0.1]);
    $('.view span').css({'background':'#fff','color':'#000','border':'1px solid #4a4a4a'})
    $(this).css({'background':'#F5A623','color':'#fff','border':'1px solid #F5A623'})
}

var checked = true;
$('#check>span').css('background', '#5CAEFD').children().css({'right': '2px', 'left': 'auto'});
// $('canvas').css('margin-left','-140px');
$('.show_main').show();
function check1(){
    if (checked) {
        $(this).children('span').css('background', '#F0F0F0').children().css({'left': '2px', 'right': 'auto'});
        checked = false;
        $('canvas').css('margin-left','0px');
        $('.show_main').hide();
    } else {
        $(this).children('span').css('background', '#5CAEFD').children().css({'right': '2px', 'left': 'auto'});
        checked = true;
        // $('canvas').css('margin-left','-140px');
        $('.show_main').show();
    }
}
if(isMob){
    $('#reset').on('touchstart',reset);
    $('#step>div').on('touchstart',step);
    $('#center>p').on('touchstart',three.createCut);
    $('#check').on('touchstart',check1);
}else{
    $('#reset').on('click',reset);
    $('#step>div').on('click',step);
    $('#center>p').on('click',three.createCut);
    $('#check').on('click',check1);
}






