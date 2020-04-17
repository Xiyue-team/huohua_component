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
var scale = 1,bodyWidth,bodyHeight,isMob = /iPad|Android/g.test(navigator.userAgent);
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
var obj=null,obj1=null,obj2=null;
var point={
	1:[-200,-120,100],
	2:[100,-120,100],
	3:[200,-120,-100],
	4:[-100,-120,-100],
	5:[-200,-100,100],
	6:[100,-100,100],
	7:[200,-100,-100],
	8:[-100,-100,-100],
	9:[-1400,-400,1400],
	10:[1000,-400,1400],
	11:[1600,-400,-900],
	12:[-600,-400,-900],
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
    /*this.renderer = null;
    if(canWebgl){
        this.renderer = new THREE.WebGLRenderer({antialias:true});
    }else{*/
        this.renderer = new THREE.CanvasRenderer();
    /*}*/
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(threeWidth/-2.5,threeWidth/2.5,threeHeight/2.5,threeHeight/-2.5,-100,10000);
    
    this.controls = null;

    /****** 分割线 ******/
    this.int = function () {
        this.camera.position.x = 0;
        this.camera.position.y = 500;
        this.camera.position.z = 1200;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0x838383);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);
        this.createControls();
        this.createObj();
        this.createObj1();
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
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color,linewidth: 10 }));
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
        var material = new THREE.MeshBasicMaterial({color:color,side:THREE.DoubleSide});
        var geom = new THREE.Geometry();
        geom.faces.push(new THREE.Face3(0,1,2),new THREE.Face3(2,1,0));
        geom.vertices = vertices;
        var mesh = new THREE.SceneUtils.createMultiMaterialObject(geom,[material]);
        return mesh;
    }
    function ceratemesh(n1,n2,n3,o,color){
        var vertices=[];
        vertices.push(vec3(point[n1][0],point[n1][1],point[n1][2]))
        vertices.push(vec3(point[n2][0],point[n2][1],point[n2][2]))
        vertices.push(vec3(point[n3][0],point[n3][1],point[n3][2]))
        var mesh=createTriangleFace(vertices,color);
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
       	ceratemesh(5,6,8,obj,'#FFEEBE')
       	ceratemesh(8,6,7,obj,'#FFEEBE')
       	ceratemesh(1,5,2,obj,'#C9B578')
       	ceratemesh(5,2,6,obj,'#C9B578')
       	ceratemesh(2,6,7,obj,'#C9B578')
       	ceratemesh(2,7,3,obj,'#C9B578')

       	/*ceratemesh(1,2,3,obj,'#C9B578')
       	ceratemesh(1,3,4,obj,'#C9B578')
       	ceratemesh(1,4,5,obj,'#C9B578')
       	ceratemesh(5,4,8,obj,'#C9B578')
       	ceratemesh(3,4,8,obj,'#C9B578')
       	ceratemesh(8,7,3,obj,'#C9B578')*/

       	ceratemesh(9,10,11,obj,'#DBDBDB') 
       	ceratemesh(9,12,11,obj,'#DBDBDB') 

        three.scene.add(obj)
    };
    this.createObj1=function(){
    	if(obj1!=null){
            three.scene.remove(obj1);
        }
        obj1 = new THREE.Object3D(); 

       	ceratemesh(13,14,15,obj1,'#9B9B9B') 
       	ceratemesh(13,15,16,obj1,'#9B9B9B') 

       	// obj1.position.set(-160,0,0)

       	line_c(17,13,obj1)
       	line_c(17,14,obj1)
       	line_c(17,15,obj1)
       	line_c(17,16,obj1)

        three.scene.add(obj1)
       
    };
    this.createObj2=function(){
    	if(obj2!=null){
            three.scene.remove(obj2);
        }
        obj2 = new THREE.Object3D(); 

       	ceratemesh(18,19,20,obj2,'#9B9B9B') 
       	ceratemesh(18,20,21,obj2,'#9B9B9B') 

       	// obj1.position.set(-160,0,0)

       	line_c(22,18,obj2)
       	line_c(23,19,obj2)
       	line_c(24,20,obj2)
       	line_c(25,21,obj2)

        three.scene.add(obj2)
    }
}
$('.ht div').on('touchstart',touchStart);
$('.ht div').on('touchmove',touchMove);
$('.ht div').on('touchend',touchEnd);
$('.ht div').on('mousedown',mouseDown);
$('.ht div').on('mousemove',mouseMove);
$('.ht div').on('mouseup',mouseUp);
var TX,TY,TX2,TY2,mX,mY,touch_flage=false,TXO,TYO,mX2,mY2;
var L,pL=$('.ht div').width(),rL=$('.ht').width();
var centerL=(rL-pL)/2;
$('.ht div').css('left',centerL);
function touchStart(e){
	TX=event.touches[0].clientX;
	TY=event.touches[0].clientY;
	L=parseInt($('.ht div').css('left'))
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
	var LL=L+mX/scale;
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
			9:[-1400,-400,1400],
			10:[1000,-400,1400],
			11:[1600,-400,-900],
			12:[-600,-400,-900],
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
			point[i][0]=point[i][0]-mX2/scale/2.5
		}
		for(var i=22;i<26;i++){
			point[i][0]=point[i][0]+mX2/scale/2.5*360/220
		}
	}
	three.createObj2();
	$('.ht div').css({'left':LL+'px'});
}
function touchEnd(e){

}
function mouseDown(e){
	TX=event.clientX;
	TY=event.clientY;
	touch_flage=true;
	L=parseInt($('.ht div').css('left'));
}
function mouseMove(e){
	if(touch_flage){
		TX2=event.clientX;
		TY2=event.clientY;
		mX=TX2-TX
		mY=TY2-TY
		var LL=L+mX/scale;
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
				9:[-1400,-400,1400],
				10:[1000,-400,1400],
				11:[1600,-400,-900],
				12:[-600,-400,-900],
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
				point[i][0]=point[i][0]-mX2/scale/2.5
			}
			for(var i=22;i<26;i++){
				point[i][0]=point[i][0]+mX2/scale/2.5*360/220
			}
		}
		three.createObj2();
		$('.ht div').css({'left':LL+'px'});
	}
}
function mouseUp(e){
	touch_flage=false;
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
function points(){
	$('.point').attr('src','images/icon/point_l1.png');
	$('.light').attr('src','images/icon/light.png');
	$('.sd').show()
	$('.ht').hide()
	obj1.visible=true;
	point={
		1:[-200,-120,100],
		2:[100,-120,100],
		3:[200,-120,-100],
		4:[-100,-120,-100],
		5:[-200,-100,100],
		6:[100,-100,100],
		7:[200,-100,-100],
		8:[-100,-100,-100],
		9:[-1400,-400,1400],
		10:[1000,-400,1400],
		11:[1600,-400,-900],
		12:[-600,-400,-900],
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
	$('.ht div').css({'left':centerL+'px'});
	three.scene.remove(obj2)
	three.createObj2();
	three.scene.remove(obj2)
}
function lights(){
	$('.light').attr('src','images/icon/light1.png');
	$('.point').attr('src','images/icon/point_l.png');
	$('.sd').hide()
	$('.ht').show()
	obj1.visible=false;
	three.createObj2();
}
if(isMob){
    $('.point').on('touchstart',points);
    $('.light').on('touchstart',lights);
}else{
    $('.point').on('click',points);
    $('.light').on('click',lights);
}






