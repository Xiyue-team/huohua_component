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
var dynamic = false;



var canWebgl=(function(){
    try {
        var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
    } catch ( e ) {
        return false;
    }
})();

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
    threeWidth= $obj.width();

var angle = 0,angleMesh=null,flage=false;;
var selectobjs = [],mousedownflag = false,pointP1,pointP2;

var getParameter = {
    angle1:-Math.PI/180*45,
    angle_a:'',
    angle_b:'',
    angle_c:'',
    checked1:false,
    startjson:[[-350,0,200],[0,0,200],[200,200,200],[350,0,0]],//可移动
    line2json:[[-350,0,200],[0,0,200],[200,200,200],[350,0,0]],//可移动
    line1json:[[-350,0,0],[0,0,0],[200,200,0],[350,0,0]]//不可移动
};

var threeDimension={
    controls:null,
    selectSphere:null,
    camera:null,
    init:function(){
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.createGrid();
        threeDimension.createLine1();
        threeDimension.createLine2();
        threeDimension.createLine3();
        threeDimension.createLine4();
        threeDimension.createAngle();


        pointP1=threeDimension.createSphere(getParameter.line2json[0],10);
        pointP1.name="p1";
        threeDimension.scene.add(pointP1);
        selectobjs.push(pointP1);

        pointP2=threeDimension.createSphere(getParameter.line2json[2],10);
        pointP2.name='p2';
        threeDimension.scene.add(pointP2);
        selectobjs.push(pointP2);

        //初始化
    },
    createScene:function(){
        threeDimension.scene = new THREE.Scene();
        threeDimension.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
        threeDimension.camera.position.x = 0;
        threeDimension.camera.position.y = 1400;
        threeDimension.camera.position.z = 1400;
        threeDimension.camera.lookAt(threeDimension.scene.position);
        threeDimension.scene.add(threeDimension.camera);
        threeDimension.renderer = null;
        if(canWebgl){
            threeDimension.renderer = new THREE.WebGLRenderer({antialias:true});
        }else{
            threeDimension.renderer = new THREE.CanvasRenderer();
        }
        threeDimension.renderer.setClearColor(0xeeeeee);
        threeDimension.renderer.setSize(threeWidth,threeHeight);
        $obj.append(threeDimension.renderer.domElement);

    },
    createControls:function(){
        threeDimension.controls = new THREE.OrbitControls( threeDimension.camera, threeDimension.renderer.domElement );
        threeDimension.controls.enableDamping = true;
        threeDimension.controls.dampingFactor = 0.25;
        threeDimension.controls.enableZoom = true;
    },
    vec3:function(x,y,z){
        return new THREE.Vector3(x, y, z);
    },
    createText:function(texts,x,y,z,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '20px Cambria Math', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x,y,z);
        return text;
    },
    createGrid:function (){
        if(threeDimension.grid){
            threeDimension.scene.remove(threeDimension.grid);
        }
        var geometry = new THREE.Geometry();
        var size=500, bottom = - 0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( {color : 0x949494, transparent: true, opacity: 0.5} );
        for(var i = 0;i < 21;i ++){
            geometry.vertices.push( threeDimension.vec3( - size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, size ) );
        }
        threeDimension.grid = new THREE.Line( geometry, lineMaterial,1 );
        threeDimension.grid.rotation.y = Math.PI/180*45;
        threeDimension.grid.position.y = -100;
        threeDimension.scene.add(threeDimension.grid);

    },
    createLine1:function(){
        var material1 = new THREE.LineBasicMaterial({color:'#1161c8'});
        var geom1 = new THREE.Geometry();
        var json=getParameter.line2json;
        geom1.vertices.push(threeDimension.vec3(json[0][0],json[0][1],json[0][2]));
        geom1.vertices.push(threeDimension.vec3(json[1][0],json[1][1],json[1][2]));
        threeDimension.line1 = new THREE.Line(geom1,material1);
        threeDimension.line1Text = threeDimension.createText("L1",json[0][0]-30,json[0][1],json[0][2]-20,"#black");
        threeDimension.line1aText = threeDimension.createText("α",json[1][0]-20,json[1][1]+40,json[1][2],"#black");
        threeDimension.scene.add(threeDimension.line1);
        threeDimension.scene.add(threeDimension.line1Text);
        threeDimension.scene.add(threeDimension.line1aText);
    },
    createLine2:function(){
        var material2 = new THREE.LineBasicMaterial({color:'#1161c8'});
        var geom2 = new THREE.Geometry();
        var json=getParameter.line1json;
        geom2.vertices.push(threeDimension.vec3(json[0][0],json[0][1],json[0][2]));
        geom2.vertices.push(threeDimension.vec3(json[3][0],json[3][1],json[3][2]));
        threeDimension.line2 = new THREE.Line(geom2,material2);
        threeDimension.line2Text = threeDimension.createText("L2",json[0][0]-30,json[0][1],json[0][2]-20,"black");
        threeDimension.line2aText = threeDimension.createText("γ",json[1][0]-20,json[1][1]+40,json[1][2],"black");
        threeDimension.line2bText = threeDimension.createText("β",json[1][0]+50,json[1][1]+40,json[1][2],"black");
        threeDimension.scene.add(threeDimension.line2);
        threeDimension.scene.add(threeDimension.line2Text);
        threeDimension.scene.add(threeDimension.line2aText);
        threeDimension.scene.add(threeDimension.line2bText);

    },
    createLine3:function(){
        var material3 = new THREE.LineBasicMaterial({color:0xff0000});
        var geom3 = new THREE.Geometry();
        var json=getParameter.line2json;
        geom3.vertices.push(threeDimension.vec3(json[2][0],json[2][1],json[2][2]));
        geom3.vertices.push(threeDimension.vec3(json[1][0],json[1][1],json[1][2]));
        threeDimension.line3 = new THREE.Line(geom3,material3);
        threeDimension.line3Text = threeDimension.createText("L3",json[2][0]-30,json[2][1],json[2][2]-20,"#black");
        threeDimension.scene.add(threeDimension.line3);
        threeDimension.scene.add(threeDimension.line3Text);

    },
    createLine4:function(){
        var material4 = new THREE.LineBasicMaterial({color:0xff0000});
        var geom4 = new THREE.Geometry();
        var json=getParameter.line1json;
        geom4.vertices.push(threeDimension.vec3(json[2][0],json[2][1],json[2][2]));
        geom4.vertices.push(threeDimension.vec3(json[1][0],json[1][1],json[1][2]));
        threeDimension.line4 = new THREE.Line(geom4,material4);
        threeDimension.line4Text = threeDimension.createText("L4",json[2][0]-30,json[2][1],json[2][2]-20,"#black");
        threeDimension.scene.add(threeDimension.line4);
        threeDimension.scene.add(threeDimension.line4Text);

    },
    createSphere:function(coordinate,radius){
        var sphereG = new THREE.SphereGeometry(radius, 50, 50, 0, 2 * Math.PI, 0, 2 * Math.PI);
        var sphereM = new THREE.MeshBasicMaterial({color: 'red'});
        var sphere = new THREE.Mesh(sphereG, sphereM);
        sphere.position.x = coordinate[0];
        sphere.position.y = coordinate[1];
        sphere.position.z = coordinate[2];
        return sphere;
    },
    repaintLine1:function(){
        if(threeDimension.line1!=undefined) {
            threeDimension.scene.remove(threeDimension.line1);
            this.scene.remove(threeDimension.line1Text);
            threeDimension.line1 = null
        }

        if(threeDimension.line2!=undefined){
            this.scene.remove(threeDimension.line2);
            this.scene.remove(threeDimension.line2Text);
            //this.scene.remove(threeDimension.line2aText);
            //this.scene.remove(threeDimension.line2bText);
            threeDimension.line2 = null;
        }

        var material1 = new THREE.LineBasicMaterial({color:'#1161c8'});
        var geom1 = new THREE.Geometry();
        var json=getParameter.line2json;
        geom1.vertices.push(threeDimension.vec3(json[0][0],json[0][1],json[0][2]));
        geom1.vertices.push(threeDimension.vec3(json[1][0],json[1][1],json[1][2]));
        threeDimension.line1 = new THREE.Line(geom1,material1);
        threeDimension.line1Text = threeDimension.createText("L1",json[0][0]-30,json[0][1],json[0][2]-20,"#black");
        threeDimension.scene.add(threeDimension.line1);
        threeDimension.scene.add(threeDimension.line1Text);

        var material2 = new THREE.LineBasicMaterial({color:'#1161c8'});
        var geom2 = new THREE.Geometry();
        geom2.vertices.push(threeDimension.vec3(json[0][0],json[0][1],json[0][2]-200));
        geom2.vertices.push(threeDimension.vec3(-json[0][0],-json[0][1],-(json[0][2]-200)));
        threeDimension.line2 = new THREE.Line(geom2,material2);
        threeDimension.line2Text = threeDimension.createText("L2",json[0][0]-30,json[0][1],json[0][2]-220,"#black");
        threeDimension.createAngle();
        threeDimension.scene.add(threeDimension.line2);
        threeDimension.scene.add(threeDimension.line2Text);


        if(getParameter.checked1==true){
            if(threeDimension.line1aaText!=undefined){
                threeDimension.scene.remove(threeDimension.line1aaText);
                threeDimension.scene.remove(threeDimension.line2aaText);
                threeDimension.scene.remove(threeDimension.line2bbText);
            }
            threeDimension.line1aaText = threeDimension.createText(getParameter.angle_a,json[1][0]-20,json[1][1]+40,json[1][2],"#black");
            threeDimension.line2aaText = threeDimension.createText(getParameter.angle_a,json[1][0]-20,json[1][1]+40,json[1][2]-200,"#black");
            threeDimension.line2bbText = threeDimension.createText(getParameter.angle_b,json[1][0]+80,json[1][1]+40,json[1][2]-200,"#black");
            threeDimension.scene.add(threeDimension.line1aaText);
            threeDimension.scene.add(threeDimension.line2aaText);
            threeDimension.scene.add(threeDimension.line2bbText);
        }


    },
    repaintLine3:function(){
        if(threeDimension.line3!=undefined){
            threeDimension.scene.remove(threeDimension.line3);
            threeDimension.scene.remove(threeDimension.line3Text);
            threeDimension.line3= null;
        }
        if(threeDimension.line4!=undefined){
            threeDimension.scene.remove(threeDimension.line4);
            threeDimension.scene.remove(threeDimension.line4Text);
            threeDimension.line4= null;
        }
        var material3 = new THREE.LineBasicMaterial({color:0xff0000});
        var geom3 = new THREE.Geometry();
        var json=getParameter.line2json;
        geom3.vertices.push(threeDimension.vec3(json[2][0],json[2][1],json[2][2]));
        geom3.vertices.push(threeDimension.vec3(json[1][0],json[1][1],json[1][2]));
        threeDimension.line3 = new THREE.Line(geom3,material3);
        threeDimension.line3Text = threeDimension.createText("L3",json[2][0]-30,json[2][1],json[2][2]-20,"#black");
        threeDimension.scene.add(threeDimension.line3);
        threeDimension.scene.add(threeDimension.line3Text);

        var material4 = new THREE.LineBasicMaterial({color:0xff0000});
        var geom4 = new THREE.Geometry();
        threeDimension.createAngle();
        geom4.vertices.push(threeDimension.vec3(json[2][0],json[2][1],json[2][2]-200));
        geom4.vertices.push(threeDimension.vec3(json[1][0],json[1][1],json[1][2]-200));
        threeDimension.line4 = new THREE.Line(geom4,material4);
        threeDimension.line4Text = threeDimension.createText("L4",json[2][0]-30,json[2][1],json[2][2]-220,"#black");
        threeDimension.scene.add(threeDimension.line4);
        threeDimension.scene.add(threeDimension.line4Text);

        if(getParameter.checked1==true){
            if(threeDimension.line1aaText!=undefined){
                threeDimension.scene.remove(threeDimension.line1aaText);
                threeDimension.scene.remove(threeDimension.line2aaText);
                threeDimension.scene.remove(threeDimension.line2bbText);
            }
            threeDimension.line1aaText = threeDimension.createText(getParameter.angle_a,json[1][0]-20,json[1][1]+40,json[1][2],"#black");
            threeDimension.line2aaText = threeDimension.createText(getParameter.angle_a,json[1][0]-20,json[1][1]+40,json[1][2]-200,"#black");
            threeDimension.line2bbText = threeDimension.createText(getParameter.angle_b,json[1][0]+80,json[1][1]+40,json[1][2]-200,"#black");
            threeDimension.scene.add(threeDimension.line1aaText);
            threeDimension.scene.add(threeDimension.line2aaText);
            threeDimension.scene.add(threeDimension.line2bbText);
        }

    },
    createAngle:function(){
        if(angleMesh!=undefined){
            threeDimension.scene.remove(angleMesh);
            angleMesh = null;
        }
        var json=getParameter.line2json;
        var a=Math.sqrt(Math.pow(json[2][0]-json[1][0],2)+Math.pow(json[2][1]-json[1][1],2)+Math.pow(json[2][2]-json[1][2],2));
        var b=Math.sqrt(Math.pow(json[0][0]-json[1][0],2)+Math.pow(json[0][1]-json[1][1],2)+Math.pow(json[0][2]-json[1][2],2));
        var c=Math.sqrt(Math.pow(json[2][0]-json[0][0],2)+Math.pow(json[2][1]-json[0][1],2)+Math.pow(json[2][2]-json[0][2],2));
        var abc=Math.pow(a,2)+Math.pow(b,2)-Math.pow(c,2);
        var ab =2*a*b;
        var angleP=Math.acos(abc/ab);
        getParameter.angle_a = (angleP*180/Math.PI).toFixed(2)+'°';
        getParameter.angle_b= (180-angleP*180/Math.PI).toFixed(2)+'°';

       /* angleMesh = this.createText(angle,[line1json[0][0]+0.3,line1json[0][1]+0.3,line1json[0][2]+0.3],'black',1);
        threeDimension.scene.add(angleMesh);*/
    },
    dynamical:function(){
        var json=getParameter.line2json;
        // threeDimension.camera.position.set(0,1400,1400);
        threeDimension.scene.remove(threeDimension.line1aText);
        threeDimension.scene.remove(threeDimension.line2aText);
        threeDimension.scene.remove(threeDimension.line2bText);

        
        threeDimension.scene.remove(threeDimension.line1aaText);
        threeDimension.scene.remove(threeDimension.line2aaText);
        threeDimension.scene.remove(threeDimension.line2bbText);

        threeDimension.line1aaText = threeDimension.createText(getParameter.angle_a,json[1][0]-20,json[1][1]+40,json[1][2],"#black");
        threeDimension.line2aaText = threeDimension.createText(getParameter.angle_a,json[1][0]-20,json[1][1]+40,json[1][2]-200,"#black");
        threeDimension.line2bbText = threeDimension.createText(getParameter.angle_b,json[1][0]+80,json[1][1]+40,json[1][2]-200,"#black");
        threeDimension.scene.add(threeDimension.line1aaText);
        threeDimension.scene.add(threeDimension.line2aaText);
        threeDimension.scene.add(threeDimension.line2bbText);   
    },
    onDocumentMouseDown:function(event){
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
        raycaster.setFromCamera(mouse, threeDimension.camera);
        var intersects = raycaster.intersectObjects(selectobjs);
        if (intersects.length > 0) {
            threeDimension.selectSphere = intersects[0].object;
            intersects[0].object.material.transparent = true;
            intersects[0].object.material.opacity = 0.5;

            mousedownflag = true;
            threeDimension.controls.enableRotate =false ;
            threeDimension.scene.remove(threeDimension.controls);
        }
    },
    onDocumentMouseMove:function(event){
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
        var intersects = raycaster.intersectObjects( selectobjs );
        raycaster.setFromCamera(mouse, threeDimension.camera);
        if ( intersects.length > 0 ) {
            if ( INTERSECTED != intersects[ 0 ].object ) {
                INTERSECTED = intersects[ 0 ].object;
                plane.setFromNormalAndCoplanarPoint(threeDimension.camera.getWorldDirection( plane.normal ),INTERSECTED.position );
            }
        }
        if(mousedownflag){
            var intersection = new THREE.Vector3();
            if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                var obj = intersection.sub( offset );


                // if(obj.x >10){ obj.x = 10}
                // if(obj.y >10){ obj.y = 10}
                // if(obj.z >10){ obj.z = 10}
                //
                // if(obj.x <-10){ obj.x = -10}
                // if(obj.y <-10){ obj.y = -10}
                // if(obj.z <-10){ obj.z = -10}
                if(threeDimension.selectSphere.name=='p1'){
                    threeDimension.selectSphere.position.x = getParameter.line2json[0][0] = obj.x;
                    threeDimension.selectSphere.position.y = getParameter.line2json[0][1] = obj.y;
                    threeDimension.selectSphere.position.z = getParameter.line2json[0][2] =obj.z;
                    threeDimension.repaintLine1();
                }
                if(threeDimension.selectSphere.name=='p2'){
                    threeDimension.selectSphere.position.x = getParameter.line2json[2][0] = obj.x;
                    threeDimension.selectSphere.position.y = getParameter.line2json[2][1] = obj.y;
                    threeDimension.selectSphere.position.z = getParameter.line2json[2][2] =obj.z;
                    threeDimension.repaintLine3();
                }
                threeDimension.createAngle()
                if(flage){
                    threeDimension.dynamical()
                }
            }
        }
    },
    onDocumentMouseUp:function(){
        event.preventDefault();
        if(threeDimension.selectSphere){
            threeDimension.selectSphere.material.opacity = 1;
            threeDimension.selectSphere.transparent = false;
            threeDimension.controls.enableRotate =true;
            mousedownflag = false;
            //threeDimensional.repaintMesh();
        }
        if ( INTERSECTED ) {
            threeDimension.selectSphere = null;
        }
    },
    onDocumentTouchStart:function(event){
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
            mouse.x = ((event.touches[0].pageX-position.x) / threeWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-position.y) / threeHeight ) * 2 + 1;
            raycaster.setFromCamera(mouse, threeDimension.camera);
            var intersects = raycaster.intersectObjects(selectobjs);
            if (intersects.length > 0) {
                mousedownflag = true;
                threeDimension.controls.enableRotate =false;
                threeDimension.scene.remove(threeDimension.controls);
                threeDimension.selectSphere =intersects[0].object;
                intersects[0].object.material.transparent = true;
                intersects[0].object.material.opacity = 0.5;
            }
        }
    },
    onDocumentTouchMove:function(event){
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
            mouse.x = ((event.touches[0].pageX-position.x) / threeWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-position.y) / threeHeight ) * 2 + 1;
            var intersects = raycaster.intersectObjects( selectobjs );
            raycaster.setFromCamera(mouse, threeDimension.camera);
            if ( intersects.length > 0 ) {
                if ( INTERSECTED != intersects[ 0 ].object ) {
                    INTERSECTED = intersects[ 0 ].object;
                    plane.setFromNormalAndCoplanarPoint(threeDimension.camera.getWorldDirection( plane.normal ),INTERSECTED.position );
                }
            }
            if(mousedownflag){
                if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                    var obj = intersection.sub( offset );

                    // if(obj.x >10){ obj.x = 10}
                    // if(obj.y >10){ obj.y = 10}
                    // if(obj.z >10){ obj.z = 10}
                    //
                    // if(obj.x <-10){ obj.x = -10}
                    // if(obj.y <-10){ obj.y = -10}
                    // if(obj.z <-10){ obj.z = -10}
                    if(intersects[0].object.name=='p1'){
                        intersects[ 0 ].object.position.x = getParameter.line2json[0][0] = obj.x;
                        intersects[ 0 ].object.position.y = getParameter.line2json[0][1] = obj.y;
                        intersects[ 0 ].object.position.z = getParameter.line2json[0][2] =obj.z;
                        threeDimension.repaintLine1();
                    }
                    if(intersects[0].object.name=='p2'){
                        intersects[ 0 ].object.position.x = getParameter.line2json[2][0] = obj.x;
                        intersects[ 0 ].object.position.y = getParameter.line2json[2][1] = obj.y;
                        intersects[ 0 ].object.position.z = getParameter.line2json[2][2] =obj.z;
                        threeDimension.repaintLine3();
                    }
                    threeDimension.createAngle()
                    if(flage){
                        threeDimension.dynamical()
                    }
                }
            }
        }
    },
    onDocumentTouchEnd:function(event){
        event.preventDefault();
        threeDimension.controls.enableRotate =true;
        mousedownflag = false;
        if(threeDimension.selectSphere){
            threeDimension.selectSphere.material.opacity = 1;
            threeDimension.selectSphere.transparent = false;
            threeDimension.controls.enableRotate =true;
            mousedownflag = false;
            //threeDimensional.repaintMesh();
        }
    }
};


threeDimension.init();

function renderAll(){
    threeDimension.controls.update();
    if(dynamic){
        threeDimension.controls.enabled = true;
    }else{
        threeDimension.controls.enabled = true;
    }

    if(getParameter.checked1){
        $('#formula').css('display','block');

    }else{
        $('#formula').css('display','none');
    }
    requestAnimationFrame(renderAll);
    threeDimension.renderer.render(threeDimension.scene,threeDimension.camera);
}
renderAll();


//鼠标点击，选中顶点
threeDimension.renderer.domElement.addEventListener( 'mousedown', threeDimension.onDocumentMouseDown, false );
threeDimension.renderer.domElement.addEventListener( 'mouseup', threeDimension.onDocumentMouseUp, false );
threeDimension.renderer.domElement.addEventListener( 'mousemove', threeDimension.onDocumentMouseMove, false );
threeDimension.renderer.domElement.addEventListener( 'touchstart', threeDimension.onDocumentTouchStart, false );
threeDimension.renderer.domElement.addEventListener( 'touchmove', threeDimension.onDocumentTouchMove, false );
threeDimension.renderer.domElement.addEventListener( 'touchend', threeDimension.onDocumentTouchEnd, false );


function clickEve1(){
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');

        threeDimension.scene.add(threeDimension.line1aText);
        threeDimension.scene.add(threeDimension.line2aText);
        threeDimension.scene.add(threeDimension.line2bText);

        threeDimension.scene.remove(threeDimension.line1aaText);
        threeDimension.scene.remove(threeDimension.line2aaText);
        threeDimension.scene.remove(threeDimension.line2bbText);
        flage=false;
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
        $(this).parent().parent().siblings().find('.span2').text('' +'off');
        flage=true;
        threeDimension.dynamical();
    }
}



/*全屏事件*/
var fullScreen=0;
function fullEve(){
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
function renewEve(){
    threeDimension.scene.remove(threeDimension.line1aaText);
    threeDimension.scene.remove(threeDimension.line2aaText);
    threeDimension.scene.remove(threeDimension.line2bbText);

    threeDimension.scene.add(threeDimension.line1aText);
    threeDimension.scene.add(threeDimension.line2aText);
    threeDimension.scene.add(threeDimension.line2bText);

    getParameter.line2json[0][0]=getParameter.startjson[0][0];
    getParameter.line2json[0][1]=getParameter.startjson[0][1];
    getParameter.line2json[0][2]=getParameter.startjson[0][2];
    getParameter.line2json[2][0]=getParameter.startjson[2][0];
    getParameter.line2json[2][1]=getParameter.startjson[2][1];
    getParameter.line2json[2][2]=getParameter.startjson[2][2];


    pointP1.position.x = getParameter.line2json[0][0];
    pointP1.position.y = getParameter.line2json[0][1];
    pointP1.position.z = getParameter.line2json[0][2];

    pointP2.position.x = getParameter.line2json[2][0];
    pointP2.position.y = getParameter.line2json[2][1];
    pointP2.position.z = getParameter.line2json[2][2];


    threeDimension.repaintLine1();
    threeDimension.repaintLine3();
    threeDimension.camera.position.set(0,1400,1400);

    $('.turn1').removeClass('on').addClass('off');
    $('.span2').text('off');
    flage=false;
}

if(!isMob){
    $('#scale').on('click',fullEve);
    $('#renew').on('click',renewEve);
    $('.turnRight').on('click',clickEve1);
}else{
    $('#scale').on('touchstart',fullEve);
    $('#renew').on('touchstart',renewEve);
    $('.turnRight').on('touchstart',clickEve1);
}




