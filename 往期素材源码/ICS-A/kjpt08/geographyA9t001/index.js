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
}
init_();
window.onresize=function(){
    init_();
}
//初始全局变量
var obj= null,objP=null,objQ=null;
var xp=100,yp=150,xq=-100,yq=100;
var grid=null,cylinderP,cylinderQ;

//视图区鼠标事件操作相关变量
var raycaster = new THREE.Raycaster(),
    plane = new THREE.Plane(),
    offset = new THREE.Vector3(),
    intersection = new THREE.Vector3(),
    mouse = new THREE.Vector2(),
    INTERSECTED = null;
var selectobjs=[],selectobj=null;
var offsetLeft = parseInt($threeCon.offset().left);
var offsetTop = parseInt($threeCon.offset().top);

/****** 位置相关 ******/
var $obj = $('#threeContainer');
    threeHeight = $obj.height(),
    threeWidth = $obj.width();

function ThreeDimensional() {
    var mousedownflag = false;
    var thiz = this;
    
    this.renderer = null;
    this.renderer = new THREE.CanvasRenderer();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.scene = new THREE.Scene();
    this.scene.position.set(-280,0,0)
    this.camera = new THREE.OrthographicCamera(threeWidth/-2.2,threeWidth/2.2,threeHeight/2.2,threeHeight/-2.2,-100,10000);
    
    this.controls = null;

    /****** 分割线 ******/
    this.int = function () {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 600;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);
        /*this.createControls();*/
        this.createObj();
        this.createGrid()
    };
    /*this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate =false;
        this.controls.enablePan =false;
    };*/

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
                depthTest:false,
                linewidth:5
            }));
        }else if( style == 3){
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color,linewidth:5}));
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
    function createCircle(vertices,radius,src){
        var CircleG = new THREE.CircleGeometry(radius, 36, 0, Math.PI*2);
        var CircleM = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture(src) ,overdraw : true} );
        var Circle = new THREE.Mesh(CircleG, CircleM);
        Circle.position.x = vertices[0].x; 
        Circle.position.y = vertices[0].y;
        Circle.position.z = vertices[0].z;
        return Circle;
    }
     this.createGrid=function (){
        if(grid!=null){
            three.scene.remove(grid);
        }
        var geometry = new THREE.Geometry();
        var size1=400,size2=480,bottom = -1, step = 40;
        var lineMaterial = new THREE.LineBasicMaterial( {color : 0x949494, transparent: false, opacity: 0.5} );
        for(var i = 0;i < 21;i ++){
            geometry.vertices.push( new THREE.Vector3( - size2, bottom, i*step - size1 ) );
            geometry.vertices.push( new THREE.Vector3( size2, bottom, i*step - size1) );
        }
        for(var i = 0;i < 25;i ++){
            geometry.vertices.push( new THREE.Vector3( i*step - size2, bottom, - size1 ) );
            geometry.vertices.push( new THREE.Vector3( i*step - size2, bottom, size1 ) );
        }
        grid = new THREE.LineSegments( geometry, lineMaterial,1);
        grid.rotation.x=Math.PI/2
        three.scene.add(grid);

    };
    this.createObj=function(){
    	if(obj!=null){
            three.scene.remove(obj);
        }
        obj=new THREE.Object3D();
        var vertices=[];
        vertices.push(vec3(-200,-100,1));
        var cylinder1 = createCircle(vertices,30,'images/A.png');
        
        vertices=[];
        vertices.push(vec3(-200,-100-50,0));
        var text1=createText(vertices,'原料','26','#000')
        
        vertices=[];
        vertices.push(vec3(200,0,1));
        var cylinder2 = createCircle(vertices,30,'images/B.png');
        
        vertices=[];
        vertices.push(vec3(200,-50,0));
        var text2=createText(vertices,'市场','26','#000')
        
        vertices=[];
        vertices.push(vec3(200,0,0));
        vertices.push(vec3(-200,-100,0));
        var line=createLineMesh(vertices, '#000', 3);
        
        vertices=[];
        vertices.push(vec3(xp,yp,2));
        cylinderP = createCircle(vertices,30,'images/p.png');
        cylinderP.name='P';
        cylinderP.visible=false;
        
        vertices=[];
        vertices.push(vec3(xq,yq,2));
        cylinderQ = createCircle(vertices,30,'images/q.png');
        cylinderQ.name='Q';
        cylinderQ.visible=false;
        
        selectobjs.push(cylinderP,cylinderQ)
        
        obj.add(line,cylinder1,cylinder2,cylinderP,cylinderQ,text1,text2);
        
        three.scene.add(obj);
    };
    this.createObjQ=function(){
    	if(objQ!=null){
            three.scene.remove(objQ);
        }
    	objQ=new THREE.Object3D();
    	vertices=[];
        vertices.push(vec3(xq,yq,0));
        vertices.push(vec3(-200,-100,0));
        var line1=createLineMesh(vertices, '#F39800', 3);
        
        vertices=[];
        vertices.push(vec3(200,0,0));
        vertices.push(vec3(xq,yq,0));
        var line2=createLineMesh(vertices, '#F39800', 3);
        
        vertices=[];
        vertices.push(vec3(xq,yq+60,3));
        var textQ=createText(vertices,'Q','26','#000')
        
        objQ.add(line1,line2,textQ);
        
        var q=(0.8*Math.sqrt(Math.pow(xq+200,2)+Math.pow(yq+100,2))+2*Math.sqrt(Math.pow(xq-200,2)+Math.pow(yq,2)))/2852*80;
		$('.ql').css('height',q+'%');
        
        three.scene.add(objQ);
    };
    this.createObjP=function(){
    	if(objP!=null){
            three.scene.remove(objP);
        }
    	objP=new THREE.Object3D();
    	
    	vertices=[];
        vertices.push(vec3(xp,yp,0));
        vertices.push(vec3(-200,-100,0));
        var line1=createLineMesh(vertices, '#AAB440', 3);
        
        vertices=[];
        vertices.push(vec3(200,0,0));
        vertices.push(vec3(xp,yp,0));
        var line2=createLineMesh(vertices, '#AAB440', 3);
        
    	vertices=[];
        vertices.push(vec3(xp,yp+60,3));
        var textP=createText(vertices,'P','26','#000')
    	
    	objP.add(line1,line2,textP);
        
        var p=(3*Math.sqrt(Math.pow(xp+200,2)+Math.pow(yp+100,2))+Math.sqrt(Math.pow(xp-200,2)+Math.pow(yp,2)))/2852*80;
		$('.pl').css('height',p+'%');
        
        three.scene.add(objP);
    };
	this.onDocumentMouseDown=function(){
        event.preventDefault();
        var mouse={};
        mouse.x = ((event.clientX-offsetLeft *scale) / (threeWidth *scale)) * 2 - 1;
        mouse.y = -( (event.clientY-offsetTop *scale) / (threeHeight*scale) ) * 2 + 1;
        raycaster.setFromCamera(mouse, thiz.camera);

        var intersects = raycaster.intersectObjects(selectobjs);
        if (intersects.length > 0) {
            selectobj = intersects[0].object;
            mousedownflag = true;
        }
    };
    this.onDocumentMouseMove=function(){
    	if(mousedownflag){
	        event.preventDefault();
	        var mouse={};
	        mouse.x = ((event.clientX-offsetLeft *scale) / (threeWidth *scale)) * 2 - 1;
	        mouse.y = -( (event.clientY-offsetTop *scale) / (threeHeight*scale) ) * 2 + 1;
	        var intersects = raycaster.intersectObjects( selectobjs );
	        raycaster.setFromCamera(mouse, thiz.camera);
	        if ( intersects.length > 0 ) {
	            if ( INTERSECTED != intersects[ 0 ].object ) {
	                INTERSECTED = intersects[ 0 ].object;
	                plane.setFromNormalAndCoplanarPoint(thiz.camera.getWorldDirection( plane.normal ),INTERSECTED.position );
	            }
	            if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
		            var obj = intersection.sub( offset ),x,y;
	                x = Math.round(obj.x)+280;
	                y = Math.round(obj.y);
	                if(x>450){
	                    x=450;
	                }
	                if(x<-450){
	                    x=-450;
	                }
	                if(y>370){
	                    y=370;
	                }
	                if(y<-370){
	                    y=-370;
	                }
	                if(intersects[0].object.name=='Q'){
	                	xq=x;
	                	yq=y;
	                	three.createObjQ();
	                	cylinderP.position.z=2;
	                	cylinderQ.position.set(x,y,3)
	                	var q=(0.8*Math.sqrt(Math.pow(x+200,2)+Math.pow(y+100,2))+2*Math.sqrt(Math.pow(x-200,2)+Math.pow(y,2)))/2852*80;
						$('.ql').css('height',q+'%');
	                }else if(intersects[0].object.name=='P'){
	                	xp=x;
	                	yp=y;
	                	three.createObjP();
	                	cylinderQ.position.z=2;
	                	cylinderP.position.set(x,y,3);
	                	var p=(3*Math.sqrt(Math.pow(x+200,2)+Math.pow(y+100,2))+Math.sqrt(Math.pow(x-200,2)+Math.pow(y,2)))/2852*80;
	                	$('.pl').css('height',p+'%');
	                }
		        }
	        }
        }
    };
    this.onDocumentMouseUp=function(){
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;
    };
    this.onDocumentTouchStart=function(){
        event.preventDefault();
        if (event.touches.length === 1) {
            var mouse={};
            mouse.x = ((event.touches[0].pageX-offsetLeft *scale) / (threeWidth *scale)) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-offsetTop *scale) / (threeHeight*scale) ) * 2 + 1;
            raycaster.setFromCamera(mouse, thiz.camera);
            var intersects = raycaster.intersectObjects(selectobjs);
            if (intersects.length > 0) {
                selectobj = intersects[0].object;
                mousedownflag = true;
            }
        }
    };
    this.onDocumentTouchMove=function(){
    	if(mousedownflag){
	        event.preventDefault();
	        if (event.touches.length === 1) {
	            var mouse={};
	            mouse.x = ((event.touches[0].pageX-offsetLeft *scale) / (threeWidth *scale)) * 2 - 1;
	            mouse.y = -( (event.touches[0].pageY-offsetTop *scale) / (threeHeight*scale) ) * 2 + 1;
	            var intersects = raycaster.intersectObjects( selectobjs );
	            raycaster.setFromCamera(mouse, thiz.camera);
	            if ( intersects.length > 0 ) {
	                if ( INTERSECTED != intersects[ 0 ].object ) {
	                    INTERSECTED = intersects[ 0 ].object;
	                    plane.setFromNormalAndCoplanarPoint(thiz.camera.getWorldDirection( plane.normal ),INTERSECTED.position );
	                }
	                if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
		                var obj = intersection.sub( offset ),x,y;
		                x = Math.round(obj.x)+280;
		                y = Math.round(obj.y);
		                if(x>450){
		                    x=450;
		                }
		                if(x<-450){
		                    x=-450;
		                }
		                if(y>370){
		                    y=370;
		                }
		                if(y<-370){
		                    y=-370;
		                }
		                if(intersects[0].object.name=='Q'){
		                	xq=x;
		                	yq=y;
		                	three.createObjQ();
		                	cylinderP.position.z=2;
		                	cylinderQ.position.set(x,y,3)
		                	var q=(0.8*Math.sqrt(Math.pow(x+200,2)+Math.pow(y+100,2))+2*Math.sqrt(Math.pow(x-200,2)+Math.pow(y,2)))/2852*80;
							$('.ql').css('height',q+'%');
		                }else if(intersects[0].object.name=='P'){
		                	xp=x;
		                	yp=y;
		                	three.createObjP();
		                	cylinderQ.position.z=2;
		                	cylinderP.position.set(x,y,3);
		                	var p=(3*Math.sqrt(Math.pow(x+200,2)+Math.pow(y+100,2))+Math.sqrt(Math.pow(x-200,2)+Math.pow(y,2)))/2852*80;
		                	$('.pl').css('height',p+'%');
		                }
		            }
	            }
	        }
        }
    };
    this.onDocumentTouchEnd=function(){
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;
    };

}
var three = new ThreeDimensional();
three.int();

renderAll();

//鼠标点击，选中顶点
three.renderer.domElement.addEventListener( 'mousedown', three.onDocumentMouseDown, false );
three.renderer.domElement.addEventListener( 'mouseup', three.onDocumentMouseUp, false );
three.renderer.domElement.addEventListener( 'mousemove', three.onDocumentMouseMove, false );
three.renderer.domElement.addEventListener( 'touchstart', three.onDocumentTouchStart, false );
three.renderer.domElement.addEventListener( 'touchmove', three.onDocumentTouchMove, false );
three.renderer.domElement.addEventListener( 'touchend', three.onDocumentTouchEnd, false );

var check=false;
function renderAll(){
//  three.controls.update();
    requestAnimationFrame(renderAll);
    three.renderer.render(three.scene,three.camera);
}

function reset(){
	xp=100,yp=150,xq=-100,yq=100;
    cylinderP.visible=false;
    cylinderQ.visible=false;
    cylinderP.position.set(100,150,1);
    cylinderQ.position.set(-100,100,1);
    three.scene.remove(objP,objQ);
    $('.pl').css('height','0');
    $('.ql').css('height','0');
    $('.ql span,.pl span').hide();
}
function choose1(){
	if(cylinderP.visible==false){
		$('.pl span').show();
		cylinderP.visible=true;
		three.createObjP();
	}
}
function choose2(){
	if(cylinderQ.visible==false){
		$('.ql span').show();
		cylinderQ.visible=true;
		three.createObjQ();
	}
}
if(isMob){
	$('.choose1').on('touchstart',choose1)
	$('.choose2').on('touchstart',choose2)
    $('.reset').on('touchstart',reset);
}else{
	$('.choose1').on('click',choose1)
	$('.choose2').on('click',choose2)
    $('.reset').on('click',reset);
}