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
    zoom1 = 1.3;
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
    // var cW = $('canvas').width();
    // var cH = $('canvas').height();
    // $('canvas').css({'left': ($('#main').width() - cW) / 2 + 'px', 'top': ($('#main').height() - cH) / 2 + 'px'});
};
var one = height / zoom;
$('#right').css('height', one);
//初始全局变量
var grid = null;
var obj= null;
var obj1=null;
var obj2= null;
var obj_b= null;
var obj_c=null;
var obj_out=null;
var obj_b2= null;
var obj_c2=null;
var obj_out2=null;
var Va=null;
var S1,S2,anmate1_flag=false,showed=false,cut_ed=false,a;
var lineMesh21,lineMesh11,lineMesh31;

var point={
	1:[0,0,0],
	2:[0,200,0],
	3:[0,0,200],
	4:[-200,0,0]
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
    var H = window.innerHeight;
    if (H < 300) {
        this.camera = new THREE.OrthographicCamera(threeWidth/-0.5,threeWidth/0.5,threeHeight/0.5,threeHeight/-0.5,-100,10000);
    } else {
        this.camera = new THREE.OrthographicCamera(threeWidth/-0.8,threeWidth/0.8,threeHeight/0.8,threeHeight/-0.8,-100,10000);
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
        text.position.x=vertices[0].x;
        text.position.y=vertices[0].y;
        text.position.z=vertices[0].z;
        return text;
    }
    function createTriangleFace(vertices,color){
        var material = new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:0.8});
        var geom = new THREE.Geometry();
        geom.faces.push(new THREE.Face3(0,1,2),new THREE.Face3(2,1,0));
        geom.vertices = vertices;
        var mesh = new THREE.SceneUtils.createMultiMaterialObject(geom,[material]);
        return mesh;
    }
    function createCircle(vertices,radius,color,start,step){
        var CircleG = new THREE.CircleGeometry(radius, 18, start, step);
        var CircleM = new THREE.MeshBasicMaterial({color: color,side:THREE.DoubleSide});
        var Circle = new THREE.Mesh(CircleG, CircleM);
        Circle.position.x = vertices[0].x;
        Circle.position.y = vertices[0].y;
        Circle.position.z = vertices[0].z;
        return Circle;
    }
    function line_c(n1,n2,o1,o2){
    	var line;
    	var vertices=[];
    	vertices.push(vec3(point[n1][0],point[n1][1],point[n1][2]))
    	vertices.push(vec3(point[n2][0],point[n2][1],point[n2][2]))
    	line=createLineMesh(vertices,'#000000',3)
    	o1.add(line);
    	line=createLineMesh(vertices,'#000000',2)
    	o2.add(line);
    }
    /****** 其他事件 ******/
    // this.createGrid=function (){
    //     if(grid!=null){
    //         three.scene.remove(grid);
    //     }
    //     var geometry = new THREE.Geometry();
    //     var size=400, bottom = -1, step = 40;
    //     var lineMaterial = new THREE.LineBasicMaterial( {color : 0x949494, transparent: false, opacity: 0.5} );
    //     for(var i = 0;i < 21;i ++){
    //         geometry.vertices.push( new THREE.Vector3( - size, bottom, i*step - size ) );
    //         geometry.vertices.push( new THREE.Vector3( size, bottom, i*step - size ) );
    //         geometry.vertices.push( new THREE.Vector3( i*step - size, bottom, - size ) );
    //         geometry.vertices.push( new THREE.Vector3( i*step - size, bottom, size ) );
    //     }
    //     grid = new THREE.LineSegments( geometry, lineMaterial,1);
    //     grid.position.y = -200;
    //     three.scene.add(grid);
    //
    // };
    //视角指示
    this.createVa=function (){
        if(Va!=null){
            three.scene.remove(Va);
        }
        Va = new THREE.Object3D();
        var material = new THREE.MeshBasicMaterial({color:'#4a4a4a',side:THREE.DoubleSide});
        var cylinder1 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 60, 36, 3), material);

        cylinder1.rotation.x=-Math.PI/2;
        cylinder1.position.z=260;

        var cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(6, 0, 20, 36, 3), material);
        cylinder2.rotation.x=Math.PI/2;
        cylinder2.position.z=220;

        var vertices=[];
        vertices.push(vec3(0,-10,300))
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
        obj1 = new THREE.Object3D();
        obj2 = new THREE.Object3D();
        var vertices;
        var material = new THREE.MeshBasicMaterial({color:'#CFEAF8',transparent:true,side:THREE.DoubleSide});
        var sph = new THREE.SphereGeometry(200,36,36);
        var mesh = new THREE.Mesh(sph,material);

        var vertices1 =[];
        for(var i=0;i<361;i=i+4){
            vertices1.push(new THREE.Vector3(200.5*Math.cos(i*Math.PI/180),0,200.5*Math.sin(i*Math.PI/180)));
        }
        var line1 =  createLineMesh(vertices1,'#000000',3);

        obj.add(mesh);
        obj1.add(line1)

        var line1 =  createLineMesh(vertices1,'#000000',2);

        obj2.add(line1);

        three.scene.add(obj,obj1)
        three.scene2.add(obj2)

        //圆环
        lineMesh11 = createLineMesh(vertices1,'#000000',3);
        lineMesh21 = createLineMesh(vertices1,'#000000',3);
        lineMesh31= createLineMesh(vertices1,'#000000',3);
        lineMesh11.rotation.y = -Math.PI/2;

        lineMesh21.rotation.z = Math.PI/2;
        lineMesh21.rotation.y = -Math.PI/2;

        lineMesh31.rotation.z = Math.PI/2;
        three.scene.add(lineMesh11,lineMesh21,lineMesh31);
        lineMesh11.visible=false;
        lineMesh21.visible=false;
        lineMesh31.visible=false;
    };
    //切割
    this.createCut=function(){
        $('#check').css('display','block');
        $("#center>p").removeClass('pNoActive').addClass('pActive');
        if(anmate1_flag==true){
            return;
        }
        anmate1_flag=true;
        var vertices1 =[];
        var i=0;
        S1=setInterval(function(){
            if(i>90){
                clearInterval(S1);
                three.scene.remove(obj,obj1);
                three.scene2.remove(obj2);

				line_c(1,3,obj_c,obj_c2);
				line_c(1,2,obj_c,obj_c2);
				line_c(1,4,obj_c,obj_c2);

                three.scene.add(obj_c)
                three.scene2.add(obj_c2)

                if(obj_b!=null){
                    three.scene.remove(obj_b);
                    three.scene2.remove(obj_b2);
                }
                obj_b = new THREE.Object3D();
                obj_b2 = new THREE.Object3D();

                var vertices;
                var material = new THREE.MeshBasicMaterial({color:'#CFEAF8',side:THREE.DoubleSide});

                //切割剩余部分
                var sph1 = new THREE.SphereGeometry(200,36,36,Math.PI*0.5, Math.PI * 1.5, 0, Math.PI );
                var mesh1 = new THREE.Mesh(sph1,material);

                var sph2 = new THREE.SphereGeometry(200,36,36, 0,Math.PI/2,Math.PI/2,Math.PI);
                var mesh2 = new THREE.Mesh(sph2,material);

                obj_b.add(mesh1,mesh2);

                obj_out = new THREE.Group();
                obj_out2 = new THREE.Group();

                //切下部分
                //面
                var sph3 = new THREE.SphereGeometry(200,36,36, 0,Math.PI/2,0,Math.PI/2);
                var mesh3 = new THREE.Mesh(sph3,material);
                obj_out.add(mesh3)

                //弧线
                var lineMesh1 = createLineMesh(vertices1,'#000000',3);
                var lineMesh2 = createLineMesh(vertices1,'#000000',3);
                var lineMesh3 = createLineMesh(vertices1,'#000000',3);
                lineMesh1.rotation.y = -Math.PI/2;

                lineMesh2.rotation.z = Math.PI/2;
                lineMesh2.rotation.y = -Math.PI/2;

                lineMesh3.rotation.z = Math.PI/2;
                obj_out.add(mesh3,lineMesh1,lineMesh2,lineMesh3);

                var lineMesh1 = createLineMesh(vertices1,'#000000',2);
                var lineMesh2 = createLineMesh(vertices1,'#000000',2);
                var lineMesh3 = createLineMesh(vertices1,'#000000',2);
                lineMesh1.rotation.y = -Math.PI/2;

                lineMesh2.rotation.z = Math.PI/2;
                lineMesh2.rotation.y = -Math.PI/2;

                lineMesh3.rotation.z = Math.PI/2;
                obj_out2.add(lineMesh1,lineMesh2,lineMesh3);


                //半径线
                line_c(1,3,obj_out,obj_out2);
				line_c(1,2,obj_out,obj_out2);
				line_c(1,4,obj_out,obj_out2);

                //切割面
                vertices=[];
                vertices.push(new THREE.Vector3(0,0,0));
                var mesh_1=createCircle(vertices,200,'#CFEAF8',Math.PI/2,Math.PI/2)
                var mesh_2=createCircle(vertices,200,'#CFEAF8',Math.PI/2,Math.PI/2)
                mesh_2.rotation.z = -Math.PI/2;
                mesh_2.rotation.y = -Math.PI/2;

                obj_out.add(mesh_1,mesh_2);

                three.scene.add(obj_b,obj_out);
                three.scene2.add(obj_b2,obj_out2);

                var S2_t=0;
                S2=setInterval(function(){
                    if(S2_t==40){
                        clearInterval(S2);
                        three.scene.remove(obj_out);
                        three.scene2.remove(obj_out2);
                        cut_ed=true;
                        anmate1_flag=false;
                        showed=false;
                        if($('.show_main').css('display')=='none'){
                            // $('canvas').css('margin-left','-140px');
                            $('#main>div.show_main').show();
                            $('#check>span').css('background', '#5CAEFD').children().css({'right': '2px', 'left': 'auto'});
                            checked = true;
                        }
                        return;
                    }
                    obj_out.position.x-=6;
                    obj_out.position.y+=3;
                    obj_out.position.z+=6;
                    obj_out2.position.x-=6;
                    obj_out2.position.y+=3;
                    obj_out2.position.z+=6;
                    S2_t++;
                },20)
                return
            }
            if(obj_c!=null){
                three.scene.remove(obj_c);
                three.scene2.remove(obj_c2);
            }
            obj_c = new THREE.Object3D();
            obj_c2 = new THREE.Object3D();
            vertices1.push(vec3(200.5*Math.cos(i*Math.PI/180),0,200.5*Math.sin(i*Math.PI/180)));

            var lineMesh1_1 = createLineMesh(vertices1,'#000000',3);
            var lineMesh2_2 = createLineMesh(vertices1,'#000000',3);
            var lineMesh3_3 = createLineMesh(vertices1,'#000000',3);
            lineMesh1_1.rotation.y = -Math.PI/2;

            lineMesh2_2.rotation.z = Math.PI/2;
            lineMesh2_2.rotation.y = -Math.PI/2;

            lineMesh3_3.rotation.z = Math.PI/2;

            obj_c.add(lineMesh1_1,lineMesh2_2,lineMesh3_3);

            var lineMesh1_1 = createLineMesh(vertices1,'#000000',2);
            var lineMesh2_2 = createLineMesh(vertices1,'#000000',2);
            var lineMesh3_3 = createLineMesh(vertices1,'#000000',2);

            lineMesh1_1.rotation.y = -Math.PI/2;

            lineMesh2_2.rotation.z = Math.PI/2;
            lineMesh2_2.rotation.y = -Math.PI/2;

            lineMesh3_3.rotation.z = Math.PI/2;
            obj_c2.add(lineMesh1_1,lineMesh2_2,lineMesh3_3);

            three.scene.add(obj_c)
            three.scene2.add(obj_c2)

            i=i+3;
        },10)
    }
}


var three = new ThreeDimensional();
three.int();

renderAll();

var check=false;
function renderAll(){
    three.controls.update();
    requestAnimationFrame(renderAll);
    three.renderer.clear();
    three.renderer.render(three.scene,three.camera);
    three.renderer.render(three.scene2,three.camera);
    if(!check){
        obj1.visible=true;
        obj2.visible=true;
        lineMesh11.visible=false;
        lineMesh21.visible=false;
        lineMesh31.visible=false;
    }else{
        obj1.visible=false;
        obj2.visible=false;
    }
}
$('canvas').on('touchmove',function(){
    check=false;
})
var mouse_flag=false;
$('canvas').on('mousedown',function(){
    mouse_flag=true;
})
$('canvas').on('mousemove',function(){
    if(mouse_flag){
        check=false;
    }
})
$('canvas').on('mouseup',function(){
    mouse_flag=false;
})

function reset(){
    $('#center>p').removeClass('pActive').addClass('pNoActive');
    checked = false;
    anmate1_flag=false;
    check=false;
    showed=false;
    cut_ed=false;
    clearInterval(S1);
    clearInterval(S2);
    clearInterval(a);
    three.scene.remove(obj_b,obj_c,obj_out,lineMesh11,lineMesh21,lineMesh31)
    three.scene2.remove(obj_b2,obj_c2,obj_out2)
    three.createObj();
    three.camera.position.x = 400;
    three.camera.position.y = 600;
    three.camera.position.z = 1200;
    three.camera.zoom=1;
    three.camera.updateProjectionMatrix();
    // $('canvas').css('margin-left','-140px');
    $('#check>span').css('background', '#5CAEFD').children().css({'right': '2px', 'left': 'auto'});
    checked = true;
    $('#step>div span').css('background', '#f0f0f0');
     $('.show_main').show();
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
function zView(){
    clearInterval(a);
    rotate([0,0,1200]);
    check=true;
    obj1.visible=false;
    obj2.visible=false;
    lineMesh11.visible=false;
    lineMesh21.visible=true;
    lineMesh31.visible=false;
}
function cView(){
    check=true;
    clearInterval(a);
    rotate([-1200,0,0]);
    obj1.visible=false;
    obj2.visible=false;
    lineMesh11.visible=false;
    lineMesh21.visible=false;
    lineMesh31.visible=true;
}
function fView(){
    check=true;
    clearInterval(a);
    rotate([0,1200,0.1]);
    obj1.visible=false;
    obj2.visible=false;
    lineMesh11.visible=true;
    lineMesh21.visible=false;
    lineMesh31.visible=false;
}
//三视图显示与不显示
var checked = true;
$('#check>span').css('background', '#5CAEFD').children().css({'right': '2px', 'left': 'auto'});
// $('canvas').css('margin-left','-140px');
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






