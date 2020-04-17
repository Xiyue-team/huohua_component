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
var scale = 1,isMob = /iPad|Android/g.test(navigator.userAgent),bodyWidth,bodyHeight;
function init_(){
    bodyWidth = $(window).width();
    bodyHeight = $(window).height();
    scale=bodyWidth/1920;
    if(1200*scale>bodyHeight){
        scale=bodyHeight/1200;
        $('#app').width(1920).css("zoom",scale);
    }else{
        $('#app').height(1200).css("zoom",scale);
    }
    $('#app .main_left div div').height($('#app .main_left div div').width())
    $('#app .main_left>div').css('margin-top',($('#app .main_left').height()-$('#app .main_left>div').height())/2+'px')
}
init_();
window.onresize=function(){
    init_();
}
//初始全局变量
var grid = null;
var obj= null;
var obj2= null;
var obj_c=null;
var obj_c2=null;
var obj_out1=null;
var obj_out2=null;
var obj_out3=null;
var obj_out4=null;
var obj_out1x=null;
var obj_out2x=null;
var obj_out3x=null;
var obj_out4x=null;
var Va=null;
var S,anmate_flag=false,back_flag=0,cut_flag=false,showed=false,a;

var point={
	1:[-200,-200,200],
	2:[200,-200,200],
	3:[200,-200,-200],
	4:[-200,-200,-200],
	5:[-200,200,-200],
	6:[-200,200,200],
	7:[200,200,200],
	8:[200,200,-200]
}
var point2={
    1:[-200.5,-200.5,200.5],
    2:[200.5,-200.5,200.5],
    3:[200.5,-200.5,-200.5],
    4:[-200.5,-200.5,-200.5],
    5:[-200.5,200.5,-200.5],
    6:[-200.5,200.5,200.5],
    7:[200.5,200.5,200.5],
    8:[200.5,200.5,-200.5]
}
var point3={
    1:[-215,-215,215],
    2:[215,-215,215],
    3:[215,-215,-215],
    4:[-215,-215,-215],
    5:[-215,215,-215],
    6:[-215,215,215],
    7:[215,215,215],
    8:[215,215,-215]
}


/****** 位置相关 ******/
var $obj = $('#threeContainer');
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
    this.camera = new THREE.OrthographicCamera(threeWidth/-2.5,threeWidth/2.5,threeHeight/2.5,threeHeight/-2.5,-100,10000);
    
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
        this.createGrid();
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
    function ceratemesh(n1,n2,n3,o){
        var vertices=[];
        vertices.push(vec3(point[n1][0],point[n1][1],point[n1][2]))
        vertices.push(vec3(point[n2][0],point[n2][1],point[n2][2]))
        vertices.push(vec3(point[n3][0],point[n3][1],point[n3][2]))
        var mesh=createTriangleFace(vertices,'#CFEAF8');
        o.add(mesh)
    }
    this.createA=function(a,b,c,d,o1,o2,flag){
    	ceratemesh(a,b,c,o1);
    	ceratemesh(b,c,d,o1);
		ceratemesh(c,d,a,o1);
		ceratemesh(d,a,b,o1);
		
		line_c(a,b,o1,o2);
		line_c(a,c,o1,o2);
		line_c(a,d,o1,o2);
        if(flag){
            line_c(b,c,o1,o2);
            line_c(b,d,o1,o2);
            line_c(c,d,o1,o2);
        }
    };
    this.createTextPoint=function(n,font,o){
        var vertices=[];
        vertices.push(vec3(point3[n][0],point3[n][1],point3[n][2]))
        var text=createText(vertices,font,32,'#000')
        o.add(text)
    };
    /****** 其他事件 ******/
    this.createGrid=function (){
        if(grid!=null){
            three.scene.remove(grid);
        }
        var geometry = new THREE.Geometry();
        var size=400, bottom = -1.5, step = 40;
        var lineMaterial = new THREE.LineBasicMaterial( {color : 0x949494, transparent: false, opacity: 0.5} );
        for(var i = 0;i < 21;i ++){
            geometry.vertices.push( new THREE.Vector3( - size, bottom, i*step - size ) );
            geometry.vertices.push( new THREE.Vector3( size, bottom, i*step - size ) );
            geometry.vertices.push( new THREE.Vector3( i*step - size, bottom, - size ) );
            geometry.vertices.push( new THREE.Vector3( i*step - size, bottom, size ) );
        }
        grid = new THREE.LineSegments( geometry, lineMaterial,1);
        grid.position.y = -200;
        three.scene.add(grid);

    };   
     this.createVa=function (){
        if(Va!=null){
            three.scene.remove(Va);
        }
        Va = new THREE.Object3D();
        var material = new THREE.MeshBasicMaterial({color:'#4a4a4a',side:THREE.DoubleSide});
        var cylinder1 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 60, 36, 3), material); 
        
        cylinder1.rotation.x=-Math.PI/2;
        cylinder1.position.z=350;

        var cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(6, 0, 20, 36, 3), material); 
        cylinder2.rotation.x=Math.PI/2;
        cylinder2.position.z=310;

        var vertices=[];
        vertices.push(vec3(0,-10,400))
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
        var vertices;

        //网格基础材质
        var material = new THREE.MeshBasicMaterial({color:'#CFEAF8',side:'THREE.DoubleSide'});

        var cube = new THREE.Mesh(new THREE.CubeGeometry(400, 400, 400, 1, 1, 1), material); 

        obj.add(cube); 

        //轮廓线
		line_c(1,2,obj,obj2);
		line_c(2,3,obj,obj2);
		line_c(3,4,obj,obj2);
		line_c(4,5,obj,obj2);
		line_c(5,6,obj,obj2);
		line_c(6,7,obj,obj2);
		line_c(7,8,obj,obj2);
		line_c(8,5,obj,obj2);
		line_c(1,4,obj,obj2);
		line_c(7,2,obj,obj2);
		line_c(3,8,obj,obj2);
		line_c(1,6,obj,obj2);

        //字母标识
        three.createTextPoint(1,'A',obj);
        three.createTextPoint(2,'B',obj);
        three.createTextPoint(3,'C',obj);
        three.createTextPoint(4,'D',obj);
        three.createTextPoint(5,'H',obj);
        three.createTextPoint(6,'E',obj);
        three.createTextPoint(7,'F',obj);
        three.createTextPoint(8,'G',obj);


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
        if(anmate_flag==true){
            return;
        }
        back_flag=0;
        anmate_flag=true
        $('.cut').attr('src','images/icon/cut2.png')
        if(obj_c!=null){
            three.scene.remove(obj_c,obj_out1,obj_out2,obj_out3,obj_out4);
            three.scene2.remove(obj_c2,obj_out1x,obj_out2x,obj_out3x,obj_out4x);
        }
        three.scene.remove(obj);
        three.scene2.remove(obj2);
  
        obj_c = new THREE.Object3D();
        obj_out1 = new THREE.Object3D();
        obj_out2 = new THREE.Object3D();
        obj_out3 = new THREE.Object3D();
        obj_out4 = new THREE.Object3D();
        obj_out1x = new THREE.Object3D();
        obj_out2x = new THREE.Object3D();
        obj_out3x = new THREE.Object3D();
        obj_out4x = new THREE.Object3D();
        obj_c2 = new THREE.Object3D();

        three.createCuts(1);
        
		three.createA(1,2,4,6,obj_out1,obj_out1x,true)
		three.createA(3,2,4,8,obj_out2,obj_out2x,true)
		three.createA(7,2,6,8,obj_out3,obj_out3x,true)
		three.createA(5,4,6,8,obj_out4,obj_out4x,true)

        //字母标识
        three.createTextPoint(1,'A',obj_out1);
        three.createTextPoint(2,'B',obj_out1);
        three.createTextPoint(4,'D',obj_out1);
        three.createTextPoint(6,'E',obj_out1);

        //字母标识
        three.createTextPoint(2,'B',obj_out3);
        three.createTextPoint(6,'E',obj_out3);
        three.createTextPoint(7,'F',obj_out3);
        three.createTextPoint(8,'G',obj_out3);


        //字母标识
        three.createTextPoint(8,'G',obj_out2);
        three.createTextPoint(3,'C',obj_out2);
        three.createTextPoint(4,'D',obj_out2);
        three.createTextPoint(2,'B',obj_out2);

        //字母标识
        three.createTextPoint(4,'D',obj_out4);
        three.createTextPoint(5,'H',obj_out4);
        three.createTextPoint(6,'E',obj_out4);
        three.createTextPoint(8,'G',obj_out4);

        three.scene.add(obj_out1,obj_out2,obj_out3,obj_out4)
        three.scene2.add(obj_out1x,obj_out2x,obj_out3x,obj_out4x)
        
    
        var S_t=0;
        S=setInterval(function(){
            if(S_t==50){
                clearInterval(S);
                three.scene.remove(obj_out1,obj_out2,obj_out3,obj_out4)
                three.scene2.remove(obj_out1x,obj_out2x,obj_out3x,obj_out4x)
                anmate_flag=false;
                $('.cut').attr('src','images/icon/cut.png');
                cut_flag=true;
                showed=false;
                $('.show_main img').attr('src','images/1.png');
                if($('.show_main').css('display')=='none'){
                    $('canvas').css('margin-left','-300px');
                    $('#threeContainer>div.show_main').show();
                    $('#threeContainer>div.show_main').width($('#threeContainer>div.show_main>img').width()).height($('#threeContainer>div.show_main>img').height())
                }
                return;
            }
            obj_out1.position.x-=8;
            obj_out1.position.z+=8;

            obj_out1x.position.x-=8;
            obj_out1x.position.z+=8;


            obj_out2.position.x+=8;
            obj_out2.position.z-=16;

            obj_out2x.position.x+=8;
            obj_out2x.position.z-=16;


            obj_out3.position.x+=8;
            obj_out3.position.y+=8;
            obj_out3.position.z+=8;

            obj_out3x.position.x+=8;
            obj_out3x.position.y+=8;
            obj_out3x.position.z+=8;


            obj_out4.position.x-=8;
            obj_out4.position.y+=8;
            obj_out4.position.z-=8;

            obj_out4x.position.x-=8;
            obj_out4x.position.y+=8;
            obj_out4x.position.z-=8;
            S_t++;
        },10)
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
    anmate_flag=false;
    cut_flag=false;
    showed=false;
    clearInterval(S);
    clearInterval(a);
    three.createObj();
    three.scene.remove(obj_c,obj_out1,obj_out2,obj_out3,obj_out4)
    three.scene2.remove(obj_c2,obj_out1x,obj_out2x,obj_out3x,obj_out4x)
    three.camera.position.x = 400;
    three.camera.position.y = 600;
    three.camera.position.z = 1200;
    three.camera.zoom=1;
    three.camera.updateProjectionMatrix();
    $('.view span').css({'background':'#fff','color':'#000','border':'1px solid #4a4a4a'})
    $('.cut').attr('src','images/icon/cut.png')
    $('#threeContainer>div.show_main').hide();
    $('canvas').css('margin-left','0');
    $('.show_main img').attr('src','images/x3.png');
}
function show(){
    if($('.show_main').css('display')=='none'){
        $('canvas').css('margin-left','-300px');
        $('#threeContainer>div.show_main').show();
        $('#threeContainer>div.show_main').width($('#threeContainer>div.show_main>img').width()).height($('#threeContainer>div.show_main>img').height())
    }
    if(!showed){
        $('.show_main img').attr('src','images/x3.png');
        showed=true;
    }else{
        showed=false;
        if(cut_flag){
            $('.show_main img').attr('src','images/1.png');
        }else{
            $('.show_main').hide();
            $('canvas').css('margin-left','0');
        }
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
function back(){
    if(anmate_flag==true||back_flag>3){
        return;
    }
    cut_flag=false;
    back_flag++;
    switch(back_flag){
        case 1:three.createCuts(1)
                obj_out1 = new THREE.Object3D();
                obj_out1x = new THREE.Object3D();
                three.createA(1,2,4,6,obj_out1,obj_out1x,false)
                three.createTextPoint(1,'A',obj_out1);
                three.scene.add(obj_out1);
                three.scene2.add(obj_out1x);
                obj_out1.position.x=0;
                obj_out1.position.y=0;
                obj_out1.position.z=0;
                obj_out1x.position.x=0;
                obj_out1x.position.y=0;
                obj_out1x.position.z=0;
        break;
        case 2:three.createCuts(2)
                obj_out2 = new THREE.Object3D();
                obj_out2x = new THREE.Object3D();  
                three.createA(3,2,4,8,obj_out2,obj_out2x,false)
                three.createTextPoint(3,'C',obj_out1);
                three.scene.add(obj_out2);
                three.scene2.add(obj_out2x);
                obj_out2.position.x=0;
                obj_out2.position.y=0;
                obj_out2.position.z=0;
                obj_out2x.position.x=0;
                obj_out2x.position.y=0;
                obj_out2x.position.z=0;
        break;
        case 3:three.createCuts(3)
                obj_out3 = new THREE.Object3D();
                obj_out3x = new THREE.Object3D();
                three.createA(7,2,6,8,obj_out3,obj_out3x,false)
                three.createTextPoint(7,'F',obj_out1);
                three.scene.add(obj_out3);
                three.scene2.add(obj_out3x);
                obj_out3.position.x=0;
                obj_out3.position.y=0;
                obj_out3.position.z=0;
                obj_out3x.position.x=0;
                obj_out3x.position.y=0;
                obj_out3x.position.z=0;
        break;
        case 4:three.createCuts(4)
                obj_out4 = new THREE.Object3D();
                obj_out4x = new THREE.Object3D();
                three.createA(5,4,6,8,obj_out4,obj_out4x,false)
                three.createTextPoint(5,'H',obj_out1);
                three.scene.add(obj_out4);
                three.scene2.add(obj_out4x);
                obj_out4.position.x=0;
                obj_out4.position.y=0;
                obj_out4.position.z=0;
                obj_out4x.position.x=0;
                obj_out4x.position.y=0;
                obj_out4x.position.z=0;
        break;
    }
}
if(isMob){
    $('.cut').on('touchstart',three.createCut);
    $('.reset').on('touchstart',reset);
    $('.show').on('touchstart',show);
    $('.zView').on('touchstart',zView);
    $('.cView').on('touchstart',cView);
    $('.fView').on('touchstart',fView);
    $('.back').on('touchstart',back);
}else{
    $('.cut').on('click',three.createCut);
    $('.reset').on('click',reset);
    $('.show').on('click',show);
    $('.zView').on('click',zView);
    $('.cView').on('click',cView);
    $('.fView').on('click',fView);
    $('.back').on('click',back);
}