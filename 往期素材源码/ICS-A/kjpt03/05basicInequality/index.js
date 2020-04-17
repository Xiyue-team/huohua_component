
var scale = 1;

var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
if(!(bodyWidth == 370 && bodyHeight == 246)){
    var isMob = /iPad|Android/g.test(navigator.userAgent),offsetLeft=0,offsetTop=0;
    var $body = $("body");
    // if(isMob){
        var bodyScale = scale = bodyWidth/1920;
        $('.body').css("zoom",bodyScale).height(1200);
        var marginTop = ($body.width()/bodyWidth*bodyHeight-1200)/2;
        $('.body').css("margin-top",'-600px');
        $('#threeContainer').css({'right':686*scale,left:33*scale,top:(69*scale + (bodyHeight-1200*scale)/2 ),bottom:(69*scale + (bodyHeight-1200*scale)/2 )});
    // }else{
    //     scale = 0.6667;
    //     $(".body").css({"zoom":0.6667,"margin-top":'0',"top":'0'});
    //     $('#threeContainer').css({'right':686*scale,left:33*scale,top:(69*scale ),bottom:(69*scale)});
    // }

    offsetLeft = parseInt($('#threeContainer').offset().left);
    offsetTop = parseInt($('#threeContainer').offset().top);
    $('body').css('background','#000');
    $('#threeContainer').css({'border-radius':10*scale,'box-shadow': 6*scale + 'px '+6*scale +'px '+ 20*scale +'px rgba(0,0,0,0.30)' });

    $('.zoom').css("zoom",scale);
}


//选中操作相关变量
var raycaster = new THREE.Raycaster(),
    plane = new THREE.Plane(),
    offset = new THREE.Vector3(),
    intersection = new THREE.Vector3(),
    mouse = new THREE.Vector2(),
    INTERSECTED = null;
var fullScreen=0,$threeCon = $('#threeContainer'),$obj = $('#threeContainer'),threeWidth = $obj.width(),threeHeight = $obj.height();

document.onselectstart=function(){
    return false;
};

var selectFunction = 0,valueA=1.5;
var opened=1,select1=0,select2=0,select3=0,select4=0;
var mousedownflag = 0;

function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var $obj = $('#threeContainer'),
        threeHeight = $obj.height(),
        threeWidth = $obj.width();

    var funcs=[null,null,null],textA=null,textB=null;
    var array1=[[0,0,0],[500,0,0],[500,500,0],[0,500,0]]; //A/B/C/D
    var array2=[[350,230,0],[265,350,0],[150,265,0],[230,150,0]]; //E/F/G/H
    var selectPoint=null,textE=null,textF=null,textG=null,textH=null,moveobjs=[],linea=null,lineb=null;


    $('.verticalCenter').css('margin-top',($('#controlContainer').height() -119 - $('.verticalCenter').height() )/2);

    var thiz = this;
    var sphere1=null,sphere2=null,selectobjs=[],selectobj=null,text=null;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
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
    this.controls = null;


    this.int = function () {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 1200;
        thiz.scene.position.x = -250;
        thiz.scene.position.y = -250;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
        // this.createGrid();
        // this.createAxis();

        var x=0.7,y;

        y = Math.sqrt(0.25 - Math.pow(x-0.5,2));


        array2[0][0] = x*500;
        array2[0][1] = y*500;

        array2[1][0] = (1-y)*500;
        array2[1][1] = (1-Math.pow(y,2)/x)*500;

        array2[2][0] = (1-x)*500;
        array2[2][1] = (1-y)*500;

        array2[3][0] = y*500;
        array2[3][1] = 500*Math.pow(y,2)/x;


        var vertices = [];
        vertices.push(new THREE.Vector3(array1[0][0],array1[0][1],array1[0][2]));
        vertices.push(new THREE.Vector3(array1[1][0],array1[1][1],array1[1][2]));
        var line = createLineMesh(vertices,'#4f81bd',3);
        thiz.scene.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(array1[2][0],array1[2][1],array1[2][2]));
        vertices.push(new THREE.Vector3(array1[1][0],array1[1][1],array1[1][2]));
        line = createLineMesh(vertices,'#4f81bd',3);
        thiz.scene.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(array1[2][0],array1[2][1],array1[2][2]));
        vertices.push(new THREE.Vector3(array1[3][0],array1[3][1],array1[3][2]));
        line = createLineMesh(vertices,'#4f81bd',3);
        thiz.scene.add(line);


        vertices = [];
        vertices.push(new THREE.Vector3(array1[0][0],array1[0][1],array1[0][2]));
        vertices.push(new THREE.Vector3(array1[3][0],array1[3][1],array1[3][2]));
        line = createLineMesh(vertices,'#4f81bd',3);
        thiz.scene.add(line);

        var textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};
        var text = new SpriteText2D('A', textStyle);
        text.position.x = array1[0][0] - 15;
        text.position.y = array1[0][1] - 15;
        thiz.scene.add(text);


        text = new SpriteText2D('B', textStyle);
        text.position.x = array1[1][0] + 15;
        text.position.y = array1[1][1] - 15;
        thiz.scene.add(text);

        text = new SpriteText2D('C', textStyle);
        text.position.x = array1[2][0] + 15;
        text.position.y = array1[2][1] + 15;
        thiz.scene.add(text);

        text = new SpriteText2D('D', textStyle);
        text.position.x = array1[3][0] - 15;
        text.position.y = array1[3][1] + 15;
        thiz.scene.add(text);

        selectPoint = this.createSphere([0,0,0],10,0x78cdf8);
        thiz.scene.add(selectPoint);
        selectobjs.push(selectPoint);

        textE = new SpriteText2D('E', textStyle);
        thiz.scene.add(textE);

        textF = new SpriteText2D('F', textStyle);
        thiz.scene.add(textF);

        textG = new SpriteText2D('G', textStyle);
        thiz.scene.add(textG);

        textH = new SpriteText2D('H', textStyle);
        thiz.scene.add(textH);


        textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#666', antialias: true};
        linea = new SpriteText2D('a', textStyle);
        thiz.scene.add(linea);
        lineb = new SpriteText2D('b', textStyle);
        thiz.scene.add(lineb);
        createChangePart();


    };
    this.objStyle = function (color, fontsize) {
        return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate =false;
        // this.controls.enablePan =false;
    };
    this.reback = function(){
        selectPoint.material.transparent = true;
        selectPoint.material.opacity = 1;
        threeDimensional.camera.position.x = 0;
        threeDimensional.camera.position.y = 0;
        threeDimensional.camera.position.z = 1200;
        array1=[[0,0,0],[500,0,0],[500,500,0],[0,500,0]]; //A/B/C/D
        array2=[[350,230,0],[265,350,0],[150,265,0],[230,150,0]]; //E/F/G/H
        createChangePart();

    };
    this.changeRange = function(){
        // countFunction();
        funcs[0].visible = funcs[1].visible = funcs[2].visible = sphere1.visible = sphere2.visible = changeLine.visible = textA.visible = textB.visible =  false;
        if(select1){
            funcs[0].visible = true;
        }
        if(select2){
            funcs[1].visible = true;
        }
        if(select3){
            funcs[2].visible = true;
        }
        if(select4){
            sphere1.visible = true;
            sphere2.visible = true;
            changeLine.visible =true;
            textA.visible = true;
            textB.visible = true;
            if(valueA == 1){
                sphere1.visible = false;
                sphere2.visible = false;
                changeLine.visible =false;
                textA.visible = false;
                textB.visible = false;
            }
        }
        sphere1.position.x = 50;
        sphere1.position.y = 0;

        sphere2.position.y = 50;
        sphere2.position.x = 0;

        textA.position.x = 50+50;
        textA.position.y = 0;
        textA.text = '(1,0)';

        textB.position.x = 50;
        textB.position.y = 50;
        textB.text = '(0,1)';
    };
    this.onDocumentMouseDown = function(event){
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
            intersects[0].object.material.transparent = true;
            intersects[0].object.material.opacity = 0.5;
            mousedownflag = true;
        }
    };
    this.onDocumentMouseMove = function(event){
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
        raycaster.setFromCamera(mouse, thiz.camera);
        if ( intersects.length > 0 ) {
            if ( INTERSECTED != intersects[ 0 ].object ) {
                INTERSECTED = intersects[ 0 ].object;
                plane.setFromNormalAndCoplanarPoint(thiz.camera.getWorldDirection( plane.normal ),INTERSECTED.position );
            }
        }
        if(mousedownflag){
            if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                var obj = intersection.sub( offset ),x,y;

                x = (obj.x+250)/500;
                y = obj.y/500;

                if((0.25 - Math.pow(x-0.5,2)) <0 ){ return;}
                y = Math.sqrt(0.25 - Math.pow(x-0.5,2));
                selectobj.position.x = obj.x;
                selectobj.position.y = y*500;


                array2[0][0] = x*500;
                array2[0][1] = y*500;

                array2[1][0] = (1-y)*500;
                array2[1][1] = (1-Math.pow(y,2)/x)*500;

                array2[2][0] = (1-x)*500;
                array2[2][1] = (1-y)*500;

                array2[3][0] = y*500;
                array2[3][1] = 500*Math.pow(y,2)/x;

                createChangePart();

            }
        }
    };
    this.onDocumentMouseUp = function(event){
        event.preventDefault();
        mousedownflag = false;
        selectobj.material.opacity = 1;
        selectobj = null;

    };
    this.onDocumentTouchStart = function(event){
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
            raycaster.setFromCamera(mouse, thiz.camera);
            var intersects = raycaster.intersectObjects(selectobjs);
            if (intersects.length > 0) {
                selectobj = intersects[0].object;
                intersects[0].object.material.transparent = true;
                intersects[0].object.material.opacity = 0.5;
                mousedownflag = true;
            }
        }
    };
    this.onDocumentTouchMove = function(event){
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
            raycaster.setFromCamera(mouse, thiz.camera);
            if ( intersects.length > 0 ) {
                if ( INTERSECTED != intersects[ 0 ].object ) {
                    INTERSECTED = intersects[ 0 ].object;
                    plane.setFromNormalAndCoplanarPoint(thiz.camera.getWorldDirection( plane.normal ),INTERSECTED.position );
                }
            }
            if(mousedownflag){
                if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                    var obj = intersection.sub( offset ),x,y;
                    x = (obj.x+250)/500;
                    y = obj.y/500;

                    if((0.25 - Math.pow(x-0.5,2)) <0 ){ return;}
                    y = Math.sqrt(0.25 - Math.pow(x-0.5,2));
                    selectobj.position.x = obj.x;
                    selectobj.position.y = y*500;


                    array2[0][0] = x*500;
                    array2[0][1] = y*500;

                    array2[1][0] = (1-y)*500;
                    array2[1][1] = (1-Math.pow(y,2)/x)*500;

                    array2[2][0] = (1-x)*500;
                    array2[2][1] = (1-y)*500;

                    array2[3][0] = y*500;
                    array2[3][1] = 500*Math.pow(y,2)/x;

                    createChangePart();

                }
            }
        }
    };
    this.onDocumentTouchEnd = function(event){
        event.preventDefault();
        mousedownflag = false;
        // threeDimensional.selectobj.material.transparent = true;
        // threeDimensional.selectobj.material.opacity = 1;
        selectobj = null;
    };
    this.createSphere = function (coordinate, radius,color) {
        var sphereG = new THREE.SphereGeometry(radius, 15, 15, 0, 2 * Math.PI, 0, 2 * Math.PI);
        var sphereM = new THREE.MeshBasicMaterial({color: color});
        var sphere = new THREE.Mesh(sphereG, sphereM),x,y;
        // if(angle1===0||angle1){
        //     x = radius*Math.cos(angle1);
        //     y = radius*Math.sin(angle1);
        //     x += coordinate[0];
        //     y += coordinate[1];
        // }else{
        x = coordinate[0];
        y = coordinate[1];
        // }
        sphere.position.x = x;
        sphere.position.y = y;
        sphere.position.z = coordinate[2];
        return sphere;
    };

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


    function createChangePart(){
        selectPoint.position.x = array2[0][0];
        selectPoint.position.y = array2[0][1];

        textE.position.x = array2[0][0] +15;
        textE.position.y = array2[0][1] +15;

        textF.position.x = array2[1][0] - 15;
        textF.position.y = array2[1][1] + 15;

        textG.position.x = array2[2][0] -15;
        textG.position.y = array2[2][1] -15;

        textH.position.x = array2[3][0] -15;
        textH.position.y = array2[3][1] -15;


        linea.position.x = (array1[0][0] + array2[0][0])/2;
        linea.position.y = (array1[0][1] + array2[0][1])/2;

        lineb.position.x = (array1[1][0] + array2[0][0])/2-5;
        lineb.position.y = (array1[1][1] + array2[0][1])/2;

        if(moveobjs!=null){
            thiz.scene.remove(moveobjs);
        }

        moveobjs = new THREE.Group();
        var vertices = [];
        vertices.push(new THREE.Vector3(array1[0][0],array1[0][1],array1[0][2]));
        vertices.push(new THREE.Vector3(array2[0][0],array2[0][1],array2[0][2]));
        var line = createLineMesh(vertices,'#4f81bd',3);
        moveobjs.add(line);


        vertices = [];
        vertices.push(new THREE.Vector3(array1[1][0],array1[1][1],array1[1][2]));
        vertices.push(new THREE.Vector3(array2[1][0],array2[1][1],array2[1][2]));
        line = createLineMesh(vertices,'#4f81bd',3);
        moveobjs.add(line);


        vertices = [];
        vertices.push(new THREE.Vector3(array1[2][0],array1[2][1],array1[2][2]));
        vertices.push(new THREE.Vector3(array2[2][0],array2[2][1],array2[2][2]));
        line = createLineMesh(vertices,'#4f81bd',3);
        moveobjs.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(array1[3][0],array1[3][1],array1[3][2]));
        vertices.push(new THREE.Vector3(array2[3][0],array2[3][1],array2[3][2]));
        line = createLineMesh(vertices,'#4f81bd',3);
        moveobjs.add(line);

        if(array2[0][0] < 250){
            vertices = [];
            vertices.push(new THREE.Vector3(array2[0][0],array2[0][1],array2[0][2]));
            vertices.push(new THREE.Vector3(array2[1][0],array2[1][1],array2[1][2]));
            line = createLineMesh(vertices,'#4f81bd',3);
            moveobjs.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(array2[2][0],array2[2][1],array2[2][2]));
            vertices.push(new THREE.Vector3(array2[1][0],array2[1][1],array2[1][2]));
            line = createLineMesh(vertices,'#4f81bd',3);
            moveobjs.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(array2[2][0],array2[2][1],array2[2][2]));
            vertices.push(new THREE.Vector3(array2[3][0],array2[3][1],array2[3][2]));
            line = createLineMesh(vertices,'#4f81bd',3);
            moveobjs.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(array2[0][0],array2[0][1],array2[0][2]));
            vertices.push(new THREE.Vector3(array2[3][0],array2[3][1],array2[3][2]));
            line = createLineMesh(vertices,'#4f81bd',3);
            moveobjs.add(line);

        }

        thiz.scene.add(moveobjs)
    }
}


var threeDimensional = new ThreeDimensional();
threeDimensional.int();

renderAll();
function renderAll(){
    threeDimensional.controls.update();
    requestAnimationFrame(renderAll);
    threeDimensional.renderer.render(threeDimensional.scene,threeDimensional.camera);
}


//鼠标点击，选中顶点
threeDimensional.renderer.domElement.addEventListener( 'mousedown', threeDimensional.onDocumentMouseDown, false );
threeDimensional.renderer.domElement.addEventListener( 'mouseup', threeDimensional.onDocumentMouseUp, false );
threeDimensional.renderer.domElement.addEventListener( 'mousemove', threeDimensional.onDocumentMouseMove, false );
threeDimensional.renderer.domElement.addEventListener( 'touchstart', threeDimensional.onDocumentTouchStart, false );
threeDimensional.renderer.domElement.addEventListener( 'touchmove', threeDimensional.onDocumentTouchMove, false );
threeDimensional.renderer.domElement.addEventListener( 'touchend', threeDimensional.onDocumentTouchEnd, false );

var $turnDiv = $('.turnDiv'), $turnRight = $('.turnRight');

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
function turnRight(){
    if($(this).parent().hasClass('on')){
        $(this).parent().removeClass('on').addClass('off');
        $(this).parent().find('.span2').text('' +'off');
    }else{
        $(this).parent().removeClass('off').addClass('on');
        $(this).parent().find('.span2').text('' +'on');
    }
}
function renew(){
    $turnDiv.removeClass('on').addClass('off');
    $turnDiv.find('.span2').text('' +'off');
    threeDimensional.reback();
}
if(isMob){
	$turnRight.on('touchstart',turnRight);
	$('#renew').on('touchstart',renew);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	$turnRight.on('click',turnRight);
	$('#renew').on('click',renew);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}

//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});

