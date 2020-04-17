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
    $('#app .main_left div div').height($('#app .main_left div div').width()).css('line-height',$('#app .main_left div div').width()+'px')
    $('#app .main_left>div').css('margin-top',($('#app .main_left').height()-$('#app .main_left>div').height())/2+'px')
}
init_();
window.onresize=function(){
    init_();
}
//初始全局变量
var obj= null,obj1=new THREE.Object3D(),choose1_num=0,animateFlag=false,l=t=0;
var x1=250*Math.cos(60*Math.PI/180),y1=250*Math.sin(60*Math.PI/180);

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
    this.scene.position.set(0,-125,0);
    this.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
    
    this.controls = null;

    /****** 分割线 ******/
    this.int = function () {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 1000;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);
        // this.createControls();
        this.createObj();
    };
   /* this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate =false;
        this.controls.enablePan =false;
    };*/

    /****** 事件函数 ******/
    function createLineMesh(vertices, color, style,w) {
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
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color,linewidth:w?w:5}));
        }
        return lineMesh;
    }
    function vec3(x,y,z){
        return new THREE.Vector3(x, y, z);
    }
    function lineTo(x1,y1,x2,y2,color,callback){
    	var vertices;
    	var dx=(x2-x1)/20;
    	var dy=(y2-y1)/20;
		var j=0;
		animateFlag=true;
		var S=setInterval(function(){
			if(j>=20){
				clearInterval(S);
				animateFlag=false;
				callback&&callback();
			}
			three.scene.remove(obj_lineTo);
			vertices=[];
			vertices.push(vec3(x1,y1,0))
			vertices.push(vec3(x1+j*dx,y1+j*dy,0));
			var obj_lineTo=createLineMesh(vertices,color,3);
			thiz.scene.add(obj_lineTo);
			j++;
		},20)
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
    function createCircle(vertices,radius,color,start,step,flag){
        var CircleG = new THREE.CircleGeometry(radius, 18, start, step);
        if(flag){
        	var CircleM = new THREE.MeshBasicMaterial({color: color,transparent: false, opacity: 0});
        }else{
        	var CircleM = new THREE.MeshBasicMaterial({color: color,side:THREE.DoubleSide});
        }
        var Circle = new THREE.Mesh(CircleG, CircleM);
        Circle.position.x = vertices[0].x; 
        Circle.position.y = vertices[0].y;
        Circle.position.z = vertices[0].z;
        return Circle;
    }
    this.createObj=function(){
        if(obj!=null){
            three.scene.remove(obj);
        }
        obj=new THREE.Object3D();
        var vertices=[];
        for(var i=0;i<=180;i++){
            vertices.push(vec3(250*Math.cos(i*Math.PI/180),250*Math.sin(i*Math.PI/180),0));
        }
        vertices.push(vec3(250*Math.cos(0),250*Math.sin(0),0));
        var line=createLineMesh(vertices,"#000", 3);

        vertices=[];
        vertices.push(vec3(-265,0,0))
        var textA=createText(vertices,'A','26','#000')
        vertices=[];
        vertices.push(vec3(265,0,0))
        var textB=createText(vertices,'B','26','#000')
        vertices=[];
        vertices.push(vec3(0,-10,0))
        var textO=createText(vertices,'O','26','#000')
        vertices=[];
        vertices.push(vec3(0,0,2))
        var pointO=createCircle(vertices,5,'#000',0,Math.PI*2);
		
        obj.add(line,textA,textB,textO,pointO);
        three.scene.add(obj)
    };
	this.choose1=function(){
		if(choose1_num>3||animateFlag){
			return;
		}
		var vertices;
        var r=Math.acos(x1/250)*180/Math.PI
		if(choose1_num==0){
			vertices=[];
            vertices.push(vec3(x1,-10,0))
            var textC=createText(vertices,'C','26','#000')
	        
	        vertices=[];
	        vertices.push(vec3(x1,0,2))
        	var pointC=createCircle(vertices,5,'#000',0,Math.PI*2);
        	
        	vertices=[];
	        vertices.push(vec3(x1,0,2))
        	var pointCC=createCircle(vertices,30,'#75D712',0,Math.PI*2,true);
        	selectobjs.push(pointCC)
        	
        	three.scene.add(textC,pointC,pointCC)
        	
			lineTo(x1,0,x1,y1,'#75D712',function(){
				
                vertices=[];
                vertices.push(vec3(x1+10,y1+30,0))
                var textD=createText(vertices,'D','26','#000')
		        
		        vertices=[];
		        vertices.push(vec3(x1,y1,2))
	        	var pointD=createCircle(vertices,5,'#75D712',0,Math.PI*2);
	        

                vertices=[];
                vertices.push(vec3((x1-250)/2,-55,0))
                var texta=createText(vertices,'a','26','#000')

                vertices=[];
                vertices.push(vec3((250-x1)/2+x1,-55,0))
                var textb=createText(vertices,'b','26','#000')
            
                vertices=[];
                vertices.push(vec3(-250,-40,0))
                vertices.push(vec3(-250,-90,0));
                var line1=createLineMesh(vertices,'#000',3,3)

                vertices=[];
                vertices.push(vec3(x1,-40,0))
                vertices.push(vec3(x1,-90,0));
                var line2=createLineMesh(vertices,'#000',3,3)

                vertices=[];
                vertices.push(vec3(250,-40,0))
                vertices.push(vec3(250,-90,0));
                var line3=createLineMesh(vertices,'#000',3,3)

                vertices=[];
                vertices.push(vec3(-250,-65,0))
                vertices.push(vec3((x1-250)/2-20,-65,0));
                var line4=createLineMesh(vertices,'#000',3,3)

                vertices=[];
                vertices.push(vec3(x1,-65,0))
                vertices.push(vec3((x1-250)/2+20,-65,0));
                var line5=createLineMesh(vertices,'#000',3,3)

                vertices=[];
                vertices.push(vec3(x1,-65,0))
                vertices.push(vec3((250-x1)/2+x1-20,-65,0));
                var line6=createLineMesh(vertices,'#000',3,3)

                vertices=[];
                vertices.push(vec3(250,-65,0))
                vertices.push(vec3((250-x1)/2+x1+20,-65,0));
                var line7=createLineMesh(vertices,'#000',3,3)

		        three.scene.add(textD,pointD,texta,textb,line1,line2,line3,line4,line5,line6,line7)
		        choose1_num++;
			})
			
		}else if(choose1_num==1){
			lineTo(0,0,0,250,'#000',function(){
				vertices=[];
		        vertices.push(vec3(0,280,0))
		        var textE=createText(vertices,'E','26','#000')
		        
		        vertices=[];
		        vertices.push(vec3(0,250,2))
	        	var pointE=createCircle(vertices,5,'#2167FF',0,Math.PI*2);
	        
		        three.scene.add(textE,pointE)
		        choose1_num++;
			})
			lineTo(0,0,x1,y1,'#000',function(){})
		}else if(choose1_num==2){
			lineTo(0,250,x1,0,'#2167FF',function(){choose1_num++;})
		}else if(choose1_num==3){
			var l=Math.pow(x1,2)/Math.sqrt(Math.pow(x1,2)+Math.pow(y1,2));
			var xf=l*Math.cos(r*Math.PI/180);
			var yf=l*Math.sin(r*Math.PI/180)
			lineTo(x1,0,xf,yf,'#000',function(){
				vertices=[];
		        vertices.push(vec3(xf-10,yf+30,0))
		        var textF=createText(vertices,'F','26','#000')
		        
		        vertices=[];
		        vertices.push(vec3(xf,yf,2))
	        	var pointF=createCircle(vertices,5,'#FF240F',0,Math.PI*2);
	        
		        three.scene.add(textF,pointF);
				
				vertices=[];
				vertices.push(vec3(xf,yf,1));
				vertices.push(vec3(x1,y1,1));
				var lineFD=createLineMesh(vertices,'#FF240F',3)
				three.scene.add(lineFD)
				choose1_num++;
			})
		}
	};
	this.animate=function(x1,y1){
		clearObj();
		var vertices;
		var r=Math.acos(x1/250)*180/Math.PI
		
        if(choose1_num>=1){
            vertices=[];
            if(x1>=0){
                vertices.push(vec3(x1+10,y1+30,0));
            }else{
                vertices.push(vec3(x1-10,y1+30,0));
            }
            var textD=createText(vertices,'D','26','#000')
            
            vertices=[];
            vertices.push(vec3(x1,y1,2))
            var pointD=createCircle(vertices,5,'#75D712',0,Math.PI*2);
            
            vertices=[];
            vertices.push(vec3(x1,0,2))
            var pointCC=createCircle(vertices,30,'#75D712',0,Math.PI*2,true);
            selectobjs.push(pointCC)
            
            three.scene.add(textD,pointD,pointCC)
            
            vertices=[];
            vertices.push(vec3(x1,y1,1));
            vertices.push(vec3(x1,0,1));
            var lineDC=createLineMesh(vertices,'#75D712',3)
            three.scene.add(lineDC) 
                
            vertices=[];
            vertices.push(vec3(x1,-10,0))
            var textC=createText(vertices,'C','26','#000')
            
            vertices=[];
            vertices.push(vec3(x1,0,2))
            var pointC=createCircle(vertices,5,'#000',0,Math.PI*2);

            vertices=[];
            vertices.push(vec3((x1-250)/2,-55,0))
            var texta=createText(vertices,'a','26','#000')

            vertices=[];
            vertices.push(vec3((250-x1)/2+x1,-55,0))
            var textb=createText(vertices,'b','26','#000')
        
            vertices=[];
            vertices.push(vec3(-250,-40,0))
            vertices.push(vec3(-250,-90,0));
            var line1=createLineMesh(vertices,'#000',3,3)

            vertices=[];
            vertices.push(vec3(x1,-40,0))
            vertices.push(vec3(x1,-90,0));
            var line2=createLineMesh(vertices,'#000',3,3)

            vertices=[];
            vertices.push(vec3(250,-40,0))
            vertices.push(vec3(250,-90,0));
            var line3=createLineMesh(vertices,'#000',3,3)

            if(x1>-210&&x1<210){
                vertices=[];
                vertices.push(vec3(-250,-65,0))
                vertices.push(vec3((x1-250)/2-20,-65,0));
                var line4=createLineMesh(vertices,'#000',3,3)

                vertices=[];
                vertices.push(vec3(x1,-65,0))
                vertices.push(vec3((x1-250)/2+20,-65,0));
                var line5=createLineMesh(vertices,'#000',3,3)

                vertices=[];
                vertices.push(vec3(x1,-65,0))
                vertices.push(vec3((250-x1)/2+x1-20,-65,0));
                var line6=createLineMesh(vertices,'#000',3,3)

                vertices=[];
                vertices.push(vec3(250,-65,0))
                vertices.push(vec3((250-x1)/2+x1+20,-65,0));
                var line7=createLineMesh(vertices,'#000',3,3)

                three.scene.add(line4,line5,line6,line7)
            }else if(x1<=-210){
                vertices=[];
                vertices.push(vec3(x1,-65,0))
                vertices.push(vec3((250-x1)/2+x1-20,-65,0));
                var line6=createLineMesh(vertices,'#000',3,3)

                vertices=[];
                vertices.push(vec3(250,-65,0))
                vertices.push(vec3((250-x1)/2+x1+20,-65,0));
                var line7=createLineMesh(vertices,'#000',3,3)

                three.scene.add(line6,line7)
            }else if(x1>=210){
                vertices=[];
                vertices.push(vec3(-250,-65,0))
                vertices.push(vec3((x1-250)/2-20,-65,0));
                var line4=createLineMesh(vertices,'#000',3,3)

                vertices=[];
                vertices.push(vec3(x1,-65,0))
                vertices.push(vec3((x1-250)/2+20,-65,0));
                var line5=createLineMesh(vertices,'#000',3,3)

                three.scene.add(line4,line5)
            }
            three.scene.add(textC,pointC,texta,textb,line1,line2,line3)
        }
		if(choose1_num>=2){
            vertices=[];
            vertices.push(vec3(0,0,1));
            vertices.push(vec3(0,250,1));
            var lineOE=createLineMesh(vertices,'#000',3)
            three.scene.add(lineOE) 
                
            vertices=[];
            vertices.push(vec3(0,280,0))
            var textE=createText(vertices,'E','26','#000')
            
            vertices=[];
            vertices.push(vec3(0,250,2))
            var pointE=createCircle(vertices,5,'#2167FF',0,Math.PI*2);
        
            three.scene.add(textE,pointE)
              
            vertices=[];
            vertices.push(vec3(0,0,1));
            vertices.push(vec3(x1,y1,1));
            var lineOD=createLineMesh(vertices,'#000',3)
            three.scene.add(lineOD) 
        }
			
		
		if(choose1_num>=3){
    		vertices=[];
    		vertices.push(vec3(0,250,1));
    		vertices.push(vec3(x1,0,1));
    		var lineEC=createLineMesh(vertices,'#2167FF',3)
    		three.scene.add(lineEC)	
		}
		
        if(choose1_num>=4){
    		var l=Math.pow(x1,2)/Math.sqrt(Math.pow(x1,2)+Math.pow(y1,2));
    		var xf=l*Math.cos(r*Math.PI/180);
    		var yf=l*Math.sin(r*Math.PI/180)
    		
    		vertices=[];
    		vertices.push(vec3(x1,0,1));
    		vertices.push(vec3(xf,yf,1));
    		var lineCF=createLineMesh(vertices,'#000',3)
    		three.scene.add(lineCF)
    		
    		vertices=[];
    		if(x1>=0){
    			vertices.push(vec3(xf-10,yf+30,0))
    		}else{
    			vertices.push(vec3(xf+10,yf+30,0))
    		}
            
            var textF=createText(vertices,'F','26','#000')
            
            vertices=[];
            vertices.push(vec3(xf,yf,2))
        	var pointF=createCircle(vertices,5,'#FF240F',0,Math.PI*2);
        
            three.scene.add(textF,pointF)
    		
    		vertices=[];
    		vertices.push(vec3(xf,yf,1));
    		vertices.push(vec3(x1,y1,1));
    		var lineFD=createLineMesh(vertices,'#FF240F',3)
    		three.scene.add(lineFD)
        }
		
	};
	this.onDocumentMouseDown=function(){
        event.preventDefault();
        var mouse={};
        mouse.x = ((event.clientX-(offsetLeft-l) *scale) / (threeWidth *scale)) * 2 - 1;
        mouse.y = -( (event.clientY-(offsetTop-t) *scale) / (threeHeight*scale) ) * 2 + 1;
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
	        mouse.x = ((event.clientX-(offsetLeft-l) *scale) / (threeWidth *scale)) * 2 - 1;
	        mouse.y = -( (event.clientY-(offsetTop-t) *scale) / (threeHeight*scale) ) * 2 + 1;
	        var intersects = raycaster.intersectObjects( selectobjs );
	        raycaster.setFromCamera(mouse, thiz.camera);
	        if ( intersects.length > 0 ) {
	            if ( INTERSECTED != intersects[ 0 ].object ) {
	                INTERSECTED = intersects[ 0 ].object;
	                plane.setFromNormalAndCoplanarPoint(thiz.camera.getWorldDirection( plane.normal ),INTERSECTED.position );
	            }
	        }
	        if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
	            var obj = intersection.sub( offset ),x,y;
	            x1 = Math.round(obj.x);
	            if(x1>250){
	            	x1=250;
	            }
	            if(x1<-250){
	            	x1=-250;
	            }
	            y1 = Math.sqrt(250*250-x1*x1);
	            three.animate(x1,y1)
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
            mouse.x = ((event.touches[0].pageX-(offsetLeft-l) *scale) / (threeWidth *scale)) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-(offsetTop-t) *scale) / (threeHeight*scale) ) * 2 + 1;
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
	            mouse.x = ((event.touches[0].pageX-(offsetLeft-l) *scale) / (threeWidth *scale)) * 2 - 1;
	            mouse.y = -( (event.touches[0].pageY-(offsetTop-t) *scale) / (threeHeight*scale) ) * 2 + 1;
	            var intersects = raycaster.intersectObjects( selectobjs );
	            raycaster.setFromCamera(mouse, thiz.camera);
	            if ( intersects.length > 0 ) {
	                if ( INTERSECTED != intersects[ 0 ].object ) {
	                    INTERSECTED = intersects[ 0 ].object;
	                    plane.setFromNormalAndCoplanarPoint(thiz.camera.getWorldDirection( plane.normal ),INTERSECTED.position );
	                }
	            }
	            
	            if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
	                var obj = intersection.sub( offset ),x,y;
	                x1 = Math.round(obj.x);
                    if(x1>250){
                        x1=250;
                    }
                    if(x1<-250){
                        x1=-250;
                    }
                    y1 = Math.sqrt(250*250-x1*x1);
                    three.animate(x1,y1)
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
    // three.controls.update();
    requestAnimationFrame(renderAll);
    three.renderer.render(three.scene,three.camera);
}

function clearObj(){
	for(var i=0;i<=10;i++){
		var O=three.scene.children;
		for(j in O){
			if(j!=0){
				three.scene.remove(three.scene.children[j])
			}
		}
	}
}

function reset(){
    clearObj();
    choose1_num=choose2_num=l=t=0,animateFlag=false,choose3_flag=false;
    x1=250*Math.cos(60*Math.PI/180),y1=250*Math.sin(60*Math.PI/180);
    $('#threeContainer').css({'left':'0','top':'0'});
    $('.gl,.gd').hide();
    $('.gl div,.gd div').stop().css('opacity','0');
}
var choose2_num=0;
function choose2(){
    if(choose2_num>3){
        return;
    }
    if(choose2_num==0){
        $('#threeContainer').css('left','-15%');
        l=threeWidth*0.15;
        $('.gl').show();
        $('.gl .gl1').animate({'opacity':'1'},800);
        choose2_num++;
    }else if(choose2_num==1){
        $('.gl .gl2').animate({'opacity':'1'},800);
        choose2_num++;
    }else if(choose2_num==2){
        $('.gl .gl3').animate({'opacity':'1'},800);
        choose2_num++;
    }else if(choose2_num==3){
        $('.gl .gl4').animate({'opacity':'1'},800);
        choose2_num++;
    }
}
/*var choose3_num=0;*/
var choose3_flag=false;
function choose3(){
    if(choose3_flag){
        return;
    }
    choose3_flag=true;
    /*if(choose3_num>1){
        return;
    }*/
    /*if(choose3_num==0){*/
        $('#threeContainer').css('top','-10%');
        t=threeHeight*0.1;
        $('.gd').show();
        $('.gd .gd1').animate({'opacity':'1'},800);
       /* choose3_num++;
    }else if(choose3_num==1){*/
        $('.gd .gd2').animate({'opacity':'1'},800);
        /*choose3_num++;
    }*/
}

if(isMob){
	$('.choose1').on('touchstart',three.choose1);
    $('.choose2').on('touchstart',choose2);
    $('.choose3').on('touchstart',choose3);
    $('.reset').on('touchstart',reset);
}else{
	$('.choose1').on('click',three.choose1)
    $('.choose2').on('click',choose2);
    $('.choose3').on('click',choose3);
    $('.reset').on('click',reset);
}