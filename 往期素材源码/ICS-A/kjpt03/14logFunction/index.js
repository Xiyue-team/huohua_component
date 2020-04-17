/**
 * Created by O2 on 2016/9/6.
 */

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
document.onselectstart=function(){
    return false;
};
var fullScreen=0,$threeCon = $('#threeContainer'),$obj = $('#threeContainer'),threeWidth = $obj.width(),threeHeight = $obj.height();


var selectFunction = 5,valueA=1.5,valueB=1;
var opened=1,selectNum=1,selectFun = 5;

function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var $obj = $('#threeContainer'),
        threeHeight = $obj.height(),
        threeWidth = $obj.width();

    var axis={},funcs=[null,null,null,null,null,null],mousedownflag = false;
    var array0 = [],array1=[],array2=[[],[]],array3=[];

    $('.verticalCenter').css('margin-top',($('#controlContainer').height() -119 - $('.verticalCenter').height() )/2);

    var thiz = this;
    var grid=null,sphere1=null,selectobjs=[],selectobj=null,text=null;
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
        this.camera.position.z = 1500;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
       // this.createGrid();
        this.createAxis();

        countFunction();

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
    this.createGrid = function(){
        var geometry = new THREE.Geometry(), bottom = -0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( { color: 0x949494, transparent: true, opacity: 0.5 } );
        for ( var i = 0; i <= 20; i ++ ) {
            geometry.vertices.push( new THREE.Vector3( - 1000, bottom, i * step - 1000 ) );
            geometry.vertices.push( new THREE.Vector3(   1000, bottom, i * step - 1000 ) );

            geometry.vertices.push( new THREE.Vector3(i * step - 1000, bottom, -1000));
            geometry.vertices.push( new THREE.Vector3( i * step - 1000, bottom,  1000 ) );
        }
        grid = new THREE.LineSegments( geometry, lineMaterial, THREE.LinePieces );
        this.scene.add( grid );
        window.gridColor = 0x303030;
        grid.rotation.x = Math.PI/2;
    };
    this.createAxis = function(){
        axis = new THREE.Group();
        labelAxis(-500, 50, 500);
        drawAxisArrow(vec3( -600, 0, 0 ), vec3( 600, 0, 0 ), 0x000000,1);
        drawAxisArrow(vec3( 0, -600, 0 ), vec3( 0, 600, 0 ), 0x000000,2);
        this.scene.add( axis);
    };
    this.reback = function(){
        for(var i=0;i<funcs.length;i++){
            funcs[i].visible = false;
        }
        funcs[5].visible = true;
        this.camera.position.z = 1500;
        createChangeLine();
        funcs[4].visible = false;

    };
    this.changeRange = function(){
        createChangeLine();
        funcs[4].position.x = 50;
        funcs[4].position.y = 0;
        text.text = '(1,0)';
    };
    this.clickEve = function(){
        if(opened == 1){//打开

            funcs[selectFunction-1].visible = true;
            if(selectFunction == 5){
                funcs[selectFunction-1].position.x = 50;
                funcs[selectFunction-1].position.y = 0;
            }

            text.text = '(1.0,0)';

        }else if(opened == 2){
            funcs[selectFunction-1].visible = false;
        }

        if(selectNum != 1){
            funcs[4].visible =false;
        }

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
                x = obj.x/50;
                y = obj.y/50;
                x = parseFloat(x.toFixed(1));
                y = parseFloat(y.toFixed(1));

                if(x >=1){
                    if(x > 10 ){x = 10;}
                    if(x <= 0 ){x = 0.1;}

                    y=Math.log(x)/Math.log(valueA);
                    // if(selectFun == 1){
                    //     y=Math.log(x)/Math.log(2);
                    // }else if(selectFun == 2){
                    //     y=Math.log(x)/Math.log(3);
                    // }else if( selectFun == 3){
                    //     y=Math.log(x)/Math.log(0.5);
                    // }else if(selectFun == 4){
                    //     y=Math.log(x)/Math.log(1/3);
                    // }else if(selectFun == 5){
                    //     y=Math.log(x)/Math.log(valueA);
                    // }
                }else{
                    if(y >= 10 ){y = 10;}
                    if(y <= -10 ){y = -10;}

                    x = Math.pow(valueA,y);

                    // if(selectFun == 1){
                    //     x = Math.pow(2,y);
                    // }else if(selectFun == 2){
                    //     x = Math.pow(3,y);
                    // }else if( selectFun == 3){
                    //     x = Math.pow(0.5,y);
                    // }else if(selectFun == 4){
                    //     x = Math.pow(1/3,y);
                    // }else if(selectFun == 5){
                    //     x = Math.pow(valueA,y);
                    // }
                }


                funcs[4].position.x = x*50;
                funcs[4].position.y = y*50;


                x = x.toFixed(1);
                y = y.toFixed(1);
                //
                text.text = '('+ x+','+ y+')';
            }
        }
    };
    this.onDocumentMouseUp = function(event){
        event.preventDefault();
        if(selectobj!=undefined){
            mousedownflag = false;
            selectobj.material.opacity = 0.8;
        }
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
                    x = obj.x/50;
                    y = obj.y/50;
                    x = parseFloat(x.toFixed(1));
                    y = parseFloat(y.toFixed(1));

                    if(x >=1){
                        if(x > 10 ){x = 10;}
                        if(x <= 0 ){x = 0.1;}

                        y=Math.log(x)/Math.log(valueA);

                    }else{
                        if(y >= 10 ){y = 10;}
                        if(y <= -10 ){y = -10;}

                        x = Math.pow(valueA,y);
                    }


                    funcs[4].position.x = x*50;
                    funcs[4].position.y = y*50;


                    x = x.toFixed(1);
                    y = y.toFixed(1);
                    //
                    text.text = '('+ x+','+ y+')';
                }
            }
        }
    };
    this.onDocumentTouchEnd = function(event){
        event.preventDefault();
        if(selectobj!=undefined){
            mousedownflag = false;
            selectobj.material.opacity = 0.8;
        }
        selectobj = null;
    };
    this.createSphere = function (coordinate, radius,color) {
        var sphereG = new THREE.SphereGeometry(radius, 15, 15, 0, 2 * Math.PI, 0, 2 * Math.PI);
        var sphereM = new THREE.MeshBasicMaterial({color: color,opacity:0.8,transparent:true});
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

    function countFunction(){
        var i,y,array=[];
        array = [];
        for(i=0.01;i<=10.2;){
            y=Math.log(i)/Math.log(2);
            if(y<=10&&y>=-10){
                array.push(new THREE.Vector3(i*50, y*50, 0));
            }
            i = i+0.1;
        }

        var curve = new THREE.CatmullRomCurve3(array);
        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        var material = new THREE.LineBasicMaterial({color : '#1161c8'});
        funcs[0] = new THREE.Line(geometry, material);
        thiz.scene.add(funcs[0]);
        funcs[0].visible = false;

        array = [];
        for(i=0.01;i<10.2;){
            y=Math.log(i)/Math.log(3);
            if(y<=10&&y>=-10){
                array.push(new THREE.Vector3(i*50, y*50, 0));
            }
            i = i+0.01;
        }
        curve = new THREE.CatmullRomCurve3(array);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : '#7ed321'});
        funcs[1] = new THREE.Line(geometry, material);
        thiz.scene.add(funcs[1]);
        funcs[1].visible = false;

        array = [];
        for(i=0.01;i<10.2;){
            y=Math.log(i)/Math.log(0.5);
            if(y<=10&&y>=-10){
                array.push(new THREE.Vector3(i*50, y*50, 0));
            }

            i = i+0.1;
        }
        curve = new THREE.CatmullRomCurve3(array);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : '#000'});
        funcs[2] = new THREE.Line(geometry, material);
        thiz.scene.add(funcs[2]);
        funcs[2].visible = false;


        array = [];
        for(i=0.01;i<10.2;){
            y=Math.log(i)/Math.log(1/3);
            if(y<=10&&y>=-10){
                array.push(new THREE.Vector3(i*50, y*50, 0));
            }

            i = i+0.1;
        }

        curve = new THREE.CatmullRomCurve3(array);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : '#f39800'});
        funcs[3] = new THREE.Line(geometry, material);
        thiz.scene.add(funcs[3]);
        funcs[3].visible = false;



        funcs[4] = new THREE.Group();
        selectobj = thiz.createSphere([0,0,0],15,0x78cdf8);
        selectobjs.push(selectobj);
        funcs[4].add(selectobj);
        var vertices = [];
        vertices.push(new THREE.Vector3(200,0,0));
        vertices.push(new THREE.Vector3(-300,0,0));
        var line = createLineMesh(vertices,'#666',2);
        funcs[4].add(line);
        vertices=[];
        vertices.push(new THREE.Vector3(0,200,0));
        vertices.push(new THREE.Vector3(0,-200,0));
        line = createLineMesh(vertices,'#666',2);
        funcs[4].add(line);
        var textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};
        text = new SpriteText2D('(1.0,0)', textStyle);
        text.position.x = -35;
        text.position.y = 30;
        funcs[4].add(text);
        thiz.scene.add(funcs[4]);
        funcs[4].visible = false;

        
        
        // funcs[4].visible = false;
        funcs[4].position.x = 50;
        funcs[4].position.y = 0;
        funcs[4].position.z = 0;

        createChangeLine();

    }
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
                dashSize: 20,
                gapSize: 20
            }));
        }else if( style == 3){
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }
        return lineMesh;
    }
    function drawAxisArrow(origin, dir, _color,style){
        var vertices = [];

        vertices.push(new THREE.Vector3(origin.x,origin.y,origin.z));
        vertices.push(new THREE.Vector3(dir.x,dir.y,dir.z));

        var line = createLineMesh(vertices,'#000',3);
        axis.add(line);

        if(style == 1){
            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,-5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }else{

            vertices = [];
            vertices.push(new THREE.Vector3(5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(-5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);

        }
        // line = createLineMesh()

    }
    function labelAxis(start, stepSize, stop) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={},line=null,vertices=null;
        // label x axis:
        textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/50, textStyle);

            if(i == 0){
                text.position.x = i - 10;
            }else{
                text.position.x = i;
            }

            text.position.y = -15;
            axis.add(text);

            vertices = [];

            vertices.push(new THREE.Vector3(i,0,0));
            vertices.push(new THREE.Vector3(i,10,0));

            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        // text = new SpriteText2D('x', textStyle);
        // text.position.x = stop+100;
        // text.position.y = -15;
        // axis.add(text);

        // label y axis:
        textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for( i = start; i <= stop; i = i+stepSize) {
            if(i == 0){ continue;}
            text = new SpriteText2D(i/50, textStyle);
            text.position.x = -30;
            text.position.y = i+10;
            text.position.z = 0.2;
            axis.add(text);

            vertices = [];

            vertices.push(new THREE.Vector3(0,i,0));
            vertices.push(new THREE.Vector3(-10,i,0));

            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        // text = new SpriteText2D('y', textStyle);
        // text.position.x = -15;
        // text.position.y = stop+100;
        // text.position.z = 0.2;
        // axis.add(text);
    }
    function vec3(x,y,z){
        return new THREE.Vector3(x, y, z);
    }
    function createChangeLine(){
        if(funcs[5] != null){
            thiz.scene.remove(funcs[5]);
        }
        if(valueA == 0 || valueA == 1){
            return;
        }

        funcs[5] = new THREE.Group();
        var array = [],i,y;
        for(i=0.01;i<10;){
            y=Math.log(i)/Math.log(valueA);
            if(y<=10&&y>=-10){
                array.push(new THREE.Vector3(i*50, y*50, 0));
            }
            i = i+0.01;
        }

        var curve = new THREE.CatmullRomCurve3(array);
        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        var material = new THREE.LineBasicMaterial({color : '#ff0404'});
        var line = new THREE.Line(geometry, material);
        funcs[5].add(line);

        thiz.scene.add(funcs[5]);
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

var $turnDiv = $('.turnDiv'), $turnRight = $('.turnRight'),$slider = $('.slider');


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

function sliderChange(){
    var result = $(this).val();
    var value = parseFloat((result.split('|')[0])).toFixed(1);
    valueA = parseFloat(value);
    threeDimensional.changeRange();
}

$('#slider1').bind('change',sliderChange);

function returnRange(){
    $('#slider1').attr('value',''+1.5+'|0');
    $('.slider1 .xdsoft_slider_label').text(''+1.5);

    var perLength = 410;
    var value = 1.5/3;
    var left = parseInt(perLength*value);
    $('.slider1 .xdsoft_range2dslider_runner ').css('left',left);
    $('.slider1 .sliderLeft').css('width',left);
    valueA = 1.5;
}
function renew(){
    returnRange();
    selectFunction = 5;
    $turnDiv.removeClass('on').addClass('off');
    $turnDiv.find('.span2').text('' +'off');
    $('.turn6').removeClass('off').addClass('on');
    $('.turn6').find('.span2').text('' +'on');
    threeDimensional.reback();
}
function turnRight(){
    var dataId = $(this).attr('data-id');

    selectFunction = dataId;

    if($(this).parent().hasClass('on')){
        opened = 2;
        $(this).parent().removeClass('on').addClass('off');
        $(this).parent().find('.span2').text('' +'off');
    }else{
        opened = 1;
        $(this).parent().removeClass('off').addClass('on');
        $(this).parent().find('.span2').text('' +'on');
    }

    // selectNum = $('.on.turnDiv1').length;
    // if(selectNum > 1 || selectNum == 0){
    //     $('.turn5').removeClass('on').addClass('off');
    //     $('.turn5').find('.span2').text('' +'off');
    // }else if(selectNum == 1){
    //     selectFun = $('.turnDiv.on').find('.turnRight').attr('data-id');
    // }
    threeDimensional.clickEve();
}
if(isMob){
	$('#renew').on('touchstart',renew);
	$('.turnRight').on('touchstart',turnRight);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	$('#renew').on('click',renew);
	$('.turnRight').on('click',turnRight);
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






