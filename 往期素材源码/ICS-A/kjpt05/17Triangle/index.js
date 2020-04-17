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


//初始全局变量
var axisArrow = new THREE.Object3D();
var axis = new THREE.Object3D();
var n=0,arr_obj=[],pos=[],radioSelect,radioSelect_old;
var obj = obj1 = obj2 = obj3 = new THREE.Object3D();

function ThreeDimensional() {
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

    this.scene = new THREE.Scene();
    this.scene.position.set(0,-80,0)
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
        this.camera.position.z = 1300;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);
        this.createControls();
        this.createObjC();
        this.createObj();
    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate =false;
        this.controls.enablePan =false;
    };

    /****** 事件函数 ******/
    function createLineMesh(vertices, color, style,size) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        if(style==2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: size,
                gapSize: size
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
    function createText(x,y,z,font,size,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(font, textStyle);
        text.position.x=x
        text.position.y=y
        text.position.z=z
        return text;
    }
    function createCircle(radius,color){
        var CircleG = new THREE.CircleGeometry(radius, 50);
        var CircleM = new THREE.MeshBasicMaterial({color: color,side:THREE.DoubleSide});
        var Circle1 = new THREE.Mesh(CircleG, CircleM);
        var vertices=[];
       	var x,y;
        for(var i=0;i<51;i++){
        	x = radius*Math.cos(Math.PI/180*7.2*i);
        	y = radius*Math.sin(Math.PI/180*7.2*i);
        	vertices.push(vec3(x,y,0));
        }
        
        var Circle2 =createLineMesh(vertices,'#000',3)
        var Circle=new THREE.Object3D();
        Circle.add(Circle1,Circle2)
        return Circle;
    }
    /****** 其他事件 ******/
    this.createObjC=function(){
        var index,objn,num,num1,num2;
        for(var i=0;i<=8;i++){
            index=0;
            for(var j=0;j<=i;j++){
                num=Combination(i,index)
                if(num<10){
                    objn=yuan(num,i,j,410-70*i);
                }else{
                    num1=(num-num%10)/10;
                    num2=num%10;
                    objn=yuan(num1,i,j,410-70*i,num2);
                }
                objn.position.x=j*90-i*45;
                arr_obj.push(objn)
                objn.children[0].children[0].nameh=i+1
                objn.children[0].children[0].namel=j+1
                selectobjs.push(objn.children[0].children[0]);
                index++;
            }
        }
        function yuan(A,C,D,y,B){
            var O= new THREE.Object3D();
            var Cl=createCircle(30,'#B2D8FC')
            O.add(Cl)
            if(B||B==0){
                var T1=createText(-8,14,5,A,30,'#000')
                var T2=createText(8,14,5,B,30,'#000')
                O.add(T1,T2)
            }else{
                var T1=createText(0,14,5,A,30,'#000')
                O.add(T1)
            }
            var T3=createText(-7,14,-5,'C',30,'#000')
            var T4=createText(-14,0,-5,C,18,'#000')
            var T5=createText(-14,18,-5,D,18,'#000')
            O.add(T3,T4,T5)  
            O.position.set(0,y,0);
            O.key=0;
            O.flage=false;
            return O;
        }
        function Combination(m,n){  
            if(n == 0) return 1;  //每行第一个数为1  
            else if(m == n) return 1; //最后一个数为1  
            //其余都是相加而来   
            else return Combination(m-1,n-1)+Combination(m-1,n);  
        } 
    };
    this.createObj=function(){
        if(obj!=null){
            this.scene.remove(obj);
            obj=new THREE.Object3D();
        }
        var vertices;

        for(var i=0;i<(n+1)*(n+2)/2;i++){
            obj.add(arr_obj[i])  
        }   
            
        vertices=[];
        vertices.push(vec3(-(90*n+60)/2,400-(n+1)*70,0))
        vertices.push(vec3((90*n+60)/2,400-(n+1)*70,0))
        var line_3=createLineMesh(vertices,'#000',2,4)
        obj.add(line_3);
        this.scene.add(obj)  
    };
    this.createObj2=function() {
        if(obj2!=null){
            this.scene.remove(obj2);
            obj2=new THREE.Object3D();
        }
        if(pos.length!=0){
            vertices=[];
            for(var i=0;i<pos.length;i++){
                vertices.push(pos[i]);
            }
            var line_x=createLineMesh(vertices,'#f00',3)
            obj2.add(line_x) 
            obj2.position.z=-1
            this.scene.add(obj2)
            pos=[];
        }
    };
    this.createObj3=function() {
        if(obj3!=null){
            this.scene.remove(obj3);
            obj3=new THREE.Object3D();
        }
        if(radioSelect==3){
            for(var i=0;i<=n;i++){
                var line=new THREE.Object3D();
                if(i<=(n-n%2)/2){
                    var geometry = new THREE.PlaneGeometry( -155*i, 20, 32 );
                }else{
                    var geometry = new THREE.PlaneGeometry( -155*(n-i), 20, 32 );
                }
                var material = new THREE.MeshBasicMaterial( {color: 0xFCF06A, side: THREE.DoubleSide} );
                var plane = new THREE.Mesh( geometry, material );
                line.add(plane)
                line.rotation.z=27.5/180*Math.PI
                if(i<=(n-n%2)/2){
                    line.position.set(i*45-140*i/2,410-i*70-Math.sin(27.5/180*Math.PI)*158*i/2,-1)
                }else{
                    line.position.set(i*45-140*(n-i)/2,410-i*70-Math.sin(27.5/180*Math.PI)*158*(n-i)/2,-1)
                }
                obj3.add(line)

                for(var j=0;j<=i;j++){
                    var num=(Math.pow(i+1,2)-i-1)/2+i+1;
                    var index=num-1-j*2;
                    if(index>=num-(i+1)){
                        arr_obj[index].children[0].children[0].material.color.set('#FCF06A')
                    }
                } 
            }
            var textN=new THREE.Object3D();
            for(var k=1;k<=n+1;k++){
                var an=1/Math.sqrt(5)*(Math.pow((1+Math.sqrt(5))/2,k)-Math.pow((1-Math.sqrt(5))/2,k))
                var N=new THREE.Object3D();
                var text=createText(0,410-(k-1)*43,0,an,26,'#f00');
                N.add(text);
                N.rotateZ(34/180*Math.PI)
                textN.add(N)
            }
            var N=new THREE.Object3D();
            var vertices=[];
            vertices.push(vec3(0,410-(n+1)*43,0))
            vertices.push(vec3(0,410-(n+1)*43-36,0))
            var lined=createLineMesh(vertices,'#f00',2,3);
            N.add(lined);
            N.rotation.z=34/180*Math.PI
            textN.add(N)

            textN.position.y+=115
            textN.position.x+=270
            obj3.add(textN)
            this.scene.add(obj3)
        }
    };
    this.onDocumentMouseDown=function(){
        event.preventDefault();
        var mouse={},position={x:0,y:0};
        if(fullScreen){
            position.x =(bodyWidth-threeWidth)/2;
            position.y =(bodyHeight-threeHeight)/2;
        }else{
            position.x =offsetLeft;
            position.y =offsetTop;
        }
        mouse.x = ((event.clientX-position.x) / threeWidth ) * 2 - 1;
        mouse.y = -( (event.clientY-position.y) / threeHeight ) * 2 + 1;
        raycaster.setFromCamera(mouse, thiz.camera);
        var intersects = raycaster.intersectObjects(selectobjs);
        if (intersects.length > 0) {
            selectobj = intersects[0].object;
        }
    };
    this.onDocumentMouseUp=function(){
        event.preventDefault();
        if((radioSelect==1||radioSelect==2)&&selectobj.parent.parent.flage==false){
            if(selectobj){
                var h=selectobj.nameh;
                var l=selectobj.namel;
                for(var i=0;i<arr_obj.length;i++){
                    arr_obj[i].children[0].children[0].material.color.set('#B2D8FC')
                    arr_obj[i].flage=false;
                }
                if(h>=3&&l>=2&&l<h){
                    var num=(Math.pow(h-1,2)-h+1)/2+h-1,num1;
                    pos=[]
                    selectobj.material.color.set('#FF5200')
                    selectobj.parent.parent.flage=true;
                    var p1=selectobj.parent.parent.position
                    if(radioSelect==1){
                        num1=num-(h-1)+l
                        arr_obj[num1-1].children[0].children[0].material.color.set('#6CFF00')
                        arr_obj[num1-1].flage=true;
                        var p2=arr_obj[num1-1].position
                        arr_obj[num1-2].children[0].children[0].material.color.set('#6CFF00')
                        arr_obj[num1-2].flage=true;
                        var p3=arr_obj[num1-2].position
                        pos.push(p2,p1,p3)
                    }else{
                        pos.push(p1)
                        num1=num+l;
                        for(var j=0;j<h-l+1;j++){
                            num1=num1-h+1+j
                            arr_obj[num1-2].children[0].children[0].material.color.set('#6CFF00')
                            arr_obj[num1-2].flage=true;
                            var p4=arr_obj[num1-2].position
                            pos.push(p4)
                        }
                    } 
                }
                thiz.createObj2()
            }
        }else{
            if(selectobj.nameh!=1){
                if(selectobj.parent.parent.key==1){
                    rf(selectobj.parent.parent);
                    selectobj.parent.parent.key=0
                }else if(selectobj.parent.parent.key==0){
                    rz(selectobj.parent.parent);
                    selectobj.parent.parent.key=1
                }
            }
        }
        selectobj = null;
    };
    this.onDocumentTouchStart=function(){
        event.preventDefault();
        if (event.touches.length === 1) {
            var mouse={},position={x:0,y:0};
            if(fullScreen){
                position.x =(bodyWidth-threeWidth)/2;
                position.y =(bodyHeight-threeHeight)/2;
            }else{
                position.x =offsetLeft;
                position.y =offsetTop;
            }
            mouse.x = ((event.touches[0].pageX-offsetLeft) / threeWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-offsetTop) / threeHeight ) * 2 + 1;
            raycaster.setFromCamera(mouse, thiz.camera);
            var intersects = raycaster.intersectObjects(selectobjs);
            if (intersects.length > 0) {
                selectobj = intersects[0].object;
                mousedownflag = true;
            }
        }
    };
    this.onDocumentTouchEnd=function(){
        event.preventDefault();
        if((radioSelect==1||radioSelect==2)&&selectobj.parent.parent.flage==false){
            if(selectobj){
                var h=selectobj.nameh;
                var l=selectobj.namel;
                for(var i=0;i<arr_obj.length;i++){
                    arr_obj[i].children[0].children[0].material.color.set('#B2D8FC')
                    arr_obj[i].flage=false;
                }
                if(h>=3&&l>=2&&l<h){
                    var num=(Math.pow(h-1,2)-h+1)/2+h-1,num1;
                    pos=[]
                    selectobj.material.color.set('#FF5200')
                    selectobj.parent.parent.flage=true;
                    var p1=selectobj.parent.parent.position
                    if(radioSelect==1){
                        num1=num-(h-1)+l
                        arr_obj[num1-1].children[0].children[0].material.color.set('#6CFF00')
                        arr_obj[num1-1].flage=true;
                        var p2=arr_obj[num1-1].position
                        arr_obj[num1-2].children[0].children[0].material.color.set('#6CFF00')
                        arr_obj[num1-2].flage=true;
                        var p3=arr_obj[num1-2].position
                        pos.push(p2,p1,p3)
                    }else{
                        pos.push(p1)
                        num1=num+l;
                        for(var j=0;j<h-l+1;j++){
                            num1=num1-h+1+j
                            arr_obj[num1-2].children[0].children[0].material.color.set('#6CFF00')
                            arr_obj[num1-2].flage=true;
                            var p4=arr_obj[num1-2].position
                            pos.push(p4)
                        }
                    } 
                }
                thiz.createObj2()
            }
        }else{
            if(selectobj.nameh!=1){
                if(selectobj.parent.parent.key==1){
                    rf(selectobj.parent.parent);
                    selectobj.parent.parent.key=0
                }else if(selectobj.parent.parent.key==0){
                    rz(selectobj.parent.parent);
                    selectobj.parent.parent.key=1
                }
            }
        }
        selectobj = null;
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

//鼠标点击，选中顶点
three.renderer.domElement.addEventListener( 'mousedown', three.onDocumentMouseDown, false );
three.renderer.domElement.addEventListener( 'mouseup', three.onDocumentMouseUp, false );
three.renderer.domElement.addEventListener( 'touchstart', three.onDocumentTouchStart, false );
three.renderer.domElement.addEventListener( 'touchend', three.onDocumentTouchEnd, false );
 
function rz(O){ //第一次反方向
    var i=0;
    var S=setInterval(function(){
    	if(i>=Math.PI){
            clearInterval(S)
            return;
        }
        O.rotateY(Math.PI/10)
        i+=Math.PI/10;
    },20)
}
function rf(O){ //第二次正方向
    var i=Math.PI;
    var S=setInterval(function(){
        if(i<=0){
            clearInterval(S)
            return;
        }
        O.rotateY(-Math.PI/10)
        i-=Math.PI/10;
    },20)
}
//on/off事件
function clickEve1(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
        for(var j=1;j<arr_obj.length;j++){
            if(arr_obj[j].key==1){
                rf(arr_obj[j]);
                arr_obj[j].key=0
            }
        }
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        for(var i=1;i<arr_obj.length;i++){
            if(arr_obj[i].key==0){
                rz(arr_obj[i]);
                arr_obj[i].key=1
            }
        }
    }
}
//滑条
$("#slider1").change(function(){
    for(var i=0;i<arr_obj.length;i++){
        arr_obj[i].children[0].children[0].material.color.set('#B2D8FC')
        arr_obj[i].flage=false;
    }
    var val=parseInt(this.value);
    n=val;
    three.createObj();
    three.createObj2();
    three.createObj3();
});
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
        $('#controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','visible');
        $('#threeContainer').css({'border-radius':10*scale,'box-shadow': 6*scale + 'px '+6*scale +'px '+ 20*scale +'px rgba(0,0,0,0.30)' });
    }else{
        fullScreen = 1;
        $('#scale img').attr('src','images/icon/back.png');
        $obj.css({'left':0,'top':0,'right':0,'bottom':0,'border-radius':'0'});
        $('canvas').css({'position':'absolute','left':(bodyWidth-threeWidth)/2,'top':(bodyHeight-threeHeight)/2});
        $('#controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','hidden');
    }
}
function renew(){
	n=0;flage=false;pos=[];
    $('.turnRight').parent().parent().removeClass('on').addClass('off');
    $('.turnRight').parent().parent().find('.span2').text('' +'off');
    $('.slider1').find('.sliderLeft').css({'width':'0px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
    $('.slider1').find('.xdsoft_slider_label').text('0');
    $('.slider1').attr('value',''+0+'|0');
    $('.radios').find('.radiocircle').removeClass('select');
    $('.radioShade').hide();
    radioSelect=''
    radioSelect_old=''
    three.camera.position.set(0,0,1500);
    for(var i=0;i<arr_obj.length;i++){
        if(arr_obj[i].key==1){
            rf(arr_obj[i]);
            arr_obj[i].key=0
        }
        arr_obj[i].children[0].children[0].material.color.set('#B2D8FC')
        arr_obj[i].flage=false;
    }
    three.createObj();
    three.createObj2();
    three.createObj3();
}
function radioChoose(){
    $('.radios').find('.radiocircle').removeClass('select');
    $(this).find('.radiocircle').addClass('select');
    radioSelect = parseInt($(this).attr('data-id'));
    if(radioSelect_old!=radioSelect){
        for(var i=0;i<arr_obj.length;i++){
            if(arr_obj[i].key==1){
                rf(arr_obj[i]);
                arr_obj[i].key=0
            }
            arr_obj[i].children[0].children[0].material.color.set('#B2D8FC')
            arr_obj[i].flage=false;
        }
        three.createObj2();
        three.createObj3();
        radioSelect_old=radioSelect;
    }
    $('.radios').find('.radioShade').hide();
    $(this).find('.radioShade').show();
}
if(isMob){
	$('#div1').on('touchstart',clickEve1);
	$('#div2').on('touchstart',clickEve1);
	//单选框事件
	$('.radioChoose .radios').on('touchstart',radioChoose);
	//重置
	$("#renew").on('touchstart',renew);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	$('#div1').on('click',clickEve1);
	$('#div2').on('click',clickEve1);
	//单选框事件
	$('.radioChoose .radios').on('click',radioChoose);
	//重置
	$("#renew").on('click',renew);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}






