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
        $('.threeControl').css({'zoom':bodyScale/0.7,'right':30*scale,'bottom':30*scale});
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

var $obj = $('#threeContainer'),
    threeHeight = $obj.height(),
    threeWidth = $obj.width();
var $threeCon = $('#threeContainer');
var fullScreen=0,dragPositionX=0,dragPositionY=0;

var value1=0,value2=0,value3=0;
var opened=1,selectFun = 1, $dao1 = $('.d1');

function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var $obj = $('#threeContainer'),
        threeHeight = $obj.height(),
        threeWidth = $obj.width();

    var axis={},funcs=[],mousedownflag = false,obj1=[],obj2=null,obj3=null,daoshuLine=null,daoshuLine1=null,daoshuSphere=null,daoshuSphere1=null,spherePosition={x:1,y:1},spherePosition1={x:-1,y:-1},axis2=null;
    var xiaoLine = null,textP=null;


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
        this.camera.position.z = 1300;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);

        $obj.append(this.renderer.domElement);


        this.createControls();
        this.createAxis();
        this.createAxis2();
        createXiaoline();
        countFunction();
        createObj1();

        obj2.visible = obj3.visible = false;
        obj1.visible = axis2.visible = false;

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
        labelAxis(-250, 50, 250);
        drawAxisArrow(vec3( -300, 0, 0 ), vec3( 300, 0, 0 ), 0x000000,1);
        drawAxisArrow(vec3( 0, -300, 0 ), vec3( 0, 300, 0 ), 0x000000,2);
        this.scene.add( axis);
    };
    this.createAxis2 = function(){
        axis2 = new THREE.Group();

        drawAxisArrow(vec3( 200, -350, 0 ), vec3( 500, -350, 0 ), 0x000000,1,axis2,1);
        drawAxisArrow(vec3( 350, -500, 0 ), vec3( 350, -200, 0 ), 0x000000,2,axis2,1);

        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={},line=null,vertices=null;
        // label x axis:
        textStyle = {align: textAlign.center, font: '18px "Cambria Math"', fillStyle: '#000000', antialias: true};
        var x=-5;
        for(var i = 250; i <= 450; i = i+20) {
            text = new SpriteText2D(x, textStyle);

            if(i == 350){
                text.position.x = i - 10;
                text.position.y = -355;
            }else{
                text.position.x = i;
                text.position.y = -360;
            }


            axis2.add(text);

            vertices = [];

            vertices.push(new THREE.Vector3(i,-350,0));
            vertices.push(new THREE.Vector3(i,-355,0));

            line = createLineMesh(vertices,'#000',3);
            axis2.add(line);
            x++;
        }

        // label y axis
        x = -5;
        for( i = -450; i <= -250; i = i+20) {
            if(i == -350){  x++;continue;}
            text = new SpriteText2D(x, textStyle);
            text.position.x = 330;
            text.position.y = i+10;
            text.position.z = 0.2;
            axis2.add(text);

            vertices = [];

            vertices.push(new THREE.Vector3(345,i,0));
            vertices.push(new THREE.Vector3(350,i,0));

            line = createLineMesh(vertices,'#000',3);
            axis2.add(line);
            x++;
        }


        this.scene.add( axis2);
    };
    this.reback = function(){
        obj1.visible = axis2.visible = false;
        createXiaoline();
        thiz.clickEve();
        obj2.visible =false;
        textP.visible =false;
        thiz.camera.position.z = 1300;

    };
    this.clickEve = function(){
        for(var i=0;i<funcs.length;i++){
            funcs[i].visible =false;
        }
        funcs[selectFun-1].visible =true;
         daoshuLine.position.x = daoshuSphere.position.x = 50;
         daoshuLine.position.y = daoshuSphere.position.y = 50;
        daoshuSphere1.position.x = 50;
        daoshuSphere1.position.y = 50;
        spherePosition.x =1;
        spherePosition.y =1;

        spherePosition.x = spherePosition.y = 1;
        daoshuLine.position.x = daoshuLine.position.y = daoshuSphere.position.x = daoshuSphere.position.y = 50;

        createXiaoline();
        this.clickEEve();

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
        dragPositionX = event.clientX;
        dragPositionY = event.clientY;
        mouse.x = ((event.clientX-position.x) / threeWidth ) * 2 - 1;
        mouse.y = -( (event.clientY-position.y) / threeHeight ) * 2 + 1;
        raycaster.setFromCamera(mouse, thiz.camera);
        var intersects = raycaster.intersectObjects(selectobjs);
        if (intersects.length > 0) {
            selectobj = intersects[0].object;
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


                if(y >= 5){y = 5;}
                if(y <= -5){y = -5;}
                if(x >= 5){x = 5;}
                if(x <= -5){x = -5;}


                if(selectFun == 1){
                    if(y <0 ){ y= -y;}
                    x = Math.sqrt(y);
                    if(obj.x <=0 ){
                        x = -x;
                    }

                }else if(selectFun == 2){
                    if(x>=1){
                        x = Math.pow(y,1/3);
                    }else{
                        y = Math.pow(x,3);
                    }

                    if(y>5){ y = 5; x = Math.pow(5,1/3);}
                    if(y<-5){ y = -5; x = -Math.pow(5,1/3);}

                }else if(selectFun == 3){

                    var nowDragX = event.clientX,nowDragY = event.clientY;

                    if(x > 0.2 && x<5){
                        if(x>=1){
                            y = Math.pow(x,-1);
                        }else{
                            x = Math.pow(y,-1);
                        }
                    }else if(x <-0.2&& x>-5){
                        if(x>=-1){
                            x = Math.pow(y,-1);
                        }else{
                            y = Math.pow(x,-1);
                        }
                    }else if(x <= 0.2 && x>= -0.2){
                        if(nowDragX > dragPositionX){ // 向右
                            x = 0.2;
                            y = 5;
                        }else{  //向左
                            x = -0.2;
                            y = -5;
                        }
                    }else if( x <= -5 ){
                            x = -5;
                            y = -0.2;
                    }else if(x>=5){
                            x = 5;
                            y = 0.2;
                        }

                }

                daoshuSphere.position.x =  daoshuLine.position.x = x*50;
                daoshuSphere.position.y = daoshuLine.position.y = y*50;
                daoshuSphere1.position.x =  daoshuLine.position.x = x*50;
                daoshuSphere1.position.y = daoshuLine.position.y = y*50;

                spherePosition.x = x;
                spherePosition.y = y;
                rotateLine();

            }
        }
    };
    this.onDocumentMouseUp = function(event){
        event.preventDefault();
        if(selectobj!=undefined){
            mousedownflag = false;
            daoshuSphere.material.opacity = 0.8;
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
            dragPositionX = event.touches[0].pageX;
            dragPositionY = event.touches[0].pageY;
            mouse.x = ((event.touches[0].pageX-position.x) / threeWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-position.y) / threeHeight ) * 2 + 1;
            raycaster.setFromCamera(mouse, thiz.camera);
            var intersects = raycaster.intersectObjects(selectobjs);
            if (intersects.length > 0) {
                selectobj = intersects[0].object;
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


                    if(y >= 5){y = 5;}
                    if(y <= -5){y = -5;}
                    if(x >= 5){x = 5;}
                    if(x <= -5){x = -5;}


                    if(selectFun == 1){
                        if(y <0 ){ y= -y;}
                        x = Math.sqrt(y);
                        if(obj.x <=0 ){
                            x = -x;
                        }

                    }else if(selectFun == 2){
                        if(x>=1){
                            x = Math.pow(y,1/3);
                        }else{
                            y = Math.pow(x,3);
                        }

                        if(y>5){ y = 5; x = Math.pow(5,1/3);}
                        if(y<-5){ y = -5; x = -Math.pow(5,1/3);}

                    }else if(selectFun == 3){

                        var nowDragX = event.clientX,nowDragY = event.clientY;

                        if(x > 0.2 && x<5){
                            if(x>=1){
                                y = Math.pow(x,-1);
                            }else{
                                x = Math.pow(y,-1);
                            }
                        }else if(x <-0.2&& x>-5){
                            if(x>=-1){
                                x = Math.pow(y,-1);
                            }else{
                                y = Math.pow(x,-1);
                            }
                        }else if(x <= 0.2 && x>= -0.2){
                            if(nowDragX > dragPositionX){ // 向右
                                x = 0.2;
                                y = 5;
                            }else{  //向左
                                x = -0.2;
                                y = -5;
                            }
                        }else if( x <= -5 ){
                            x = -5;
                            y = -0.2;
                        }else if(x>=5){
                            x = 5;
                            y =0.2;
                        }

                    }

                    daoshuSphere.position.x =  daoshuLine.position.x = x*50;
                    daoshuSphere.position.y = daoshuLine.position.y = y*50;
                    daoshuSphere1.position.x =  daoshuLine.position.x = x*50;
                    daoshuSphere1.position.y = daoshuLine.position.y = y*50;

                    spherePosition.x = x;
                    spherePosition.y = y;
                    rotateLine();

                }
            }
        }
    };
    this.onDocumentTouchEnd = function(event){
        event.preventDefault();
        if(selectobj!=undefined){
            mousedownflag = false;
            daoshuSphere.material.opacity = 0.8;
        }
        selectobj = null;
    };
    this.createSphere = function (coordinate, radius,color) {
        var sphereG = new THREE.CircleGeometry(radius, 32);
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
    this.clickEEve = function(){

        if(value1){
            obj2.visible = true;
            if(selectFun == 3){
                obj3.visible = true;
            }else{
                obj3.visible = false;
            }
        }else{
            obj2.visible = obj3.visible = false;
        }


        if(value2){
            obj1.visible = axis2.visible = true;
        }else{
            obj1.visible = axis2.visible = false;
        }

        rotateLine();
        createXiaoline();

    };

    function createText(font,size,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
        return new SpriteText2D(font, textStyle);
    }
    function countFunction(){
        var i,y,array=[];
        array = [];
        for(i=-5;i<=5.01;){
            y=Math.pow(i,2);
            if(y<=5&&y>=-5){
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
        // funcs[0].visible = false;

        array = [];
        for(i=-5;i<=5.01;){
            y=Math.pow(i,3);
            if(y<=5&&y>=-5){
                array.push(new THREE.Vector3(i*50, y*50, 0));
            }
            i = i+0.01;
        }

        curve = new THREE.CatmullRomCurve3(array);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : '#1161c8'});
        funcs[1] = new THREE.Line(geometry, material);
        thiz.scene.add(funcs[1]);
        funcs[1].visible =false;

        array = [];
        funcs[2] = new THREE.Group();

        for(i=-5;i<0;){
            y=Math.pow(i,-1);
            if(y<=5&&y>=-5){
                array.push(new THREE.Vector3(i*50, y*50, 0));
            }
            i = i+0.01;
        }
        curve = new THREE.CatmullRomCurve3(array);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : '#1161c8'});
        var line = new THREE.Line(geometry, material);
        funcs[2].add(line);

        array = [];
        for(i=0;i<=5;){
            y=Math.pow(i,-1);
            if(y<=5&&y>=-5){
                array.push(new THREE.Vector3(i*50, y*50, 0));
            }
            i = i+0.01;
        }
        curve = new THREE.CatmullRomCurve3(array);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : '#1161c8'});
        line = new THREE.Line(geometry, material);
        funcs[2].add(line);
        funcs[2].visible =false;
        thiz.scene.add(funcs[2]);



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
                opacity: 5,
                dashSize: 5,
                gapSize: 5
            }));
        }else if( style == 3){
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }
        return lineMesh;
    }
    function drawAxisArrow(origin, dir, _color,style,obj,num){
        var vertices = [],varObj=null,tex=null;

        if(!obj){ varObj = axis;}else{varObj=obj; }
        vertices.push(new THREE.Vector3(origin.x,origin.y,origin.z));
        vertices.push(new THREE.Vector3(dir.x,dir.y,dir.z));

        var line = createLineMesh(vertices,'#000',3);
        varObj.add(line);

        if(style == 1){
            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,origin.y+5,0));
            vertices.push(new THREE.Vector3(dir.x,origin.y,0));
            line = createLineMesh(vertices,'#000',3);
            varObj.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,origin.y-5,0));
            vertices.push(new THREE.Vector3(dir.x,origin.y,0));
            line = createLineMesh(vertices,'#000',3);
            varObj.add(line);

            tex = createText('x',25,'#000');
            tex.position.x = (dir.x+20);
            tex.position.y = dir.y-10;
            tex.position.z = 0;
            varObj.add(tex);
        }else{

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x+5,dir.y-20,0));
            vertices.push(new THREE.Vector3(dir.x,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            varObj.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-5,dir.y-20,0));
            vertices.push(new THREE.Vector3(dir.x,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            varObj.add(line);

            if(!num){
                tex = createText('f(x)',25,'#000');
                tex.position.x = (dir.x-40);
                tex.position.y = dir.y+20;
                tex.position.z = 0;
                varObj.add(tex);
            }else{
                tex = createText("f'(x",25,'#000');
                tex.position.x = (dir.x-40);
                tex.position.y = dir.y+20;
                tex.position.z = 0;
                varObj.add(tex);

                tex = createText("p",20,'#000');
                tex.position.x = (dir.x-16);
                tex.position.y = dir.y+12;
                tex.position.z = 0;
                varObj.add(tex);

                tex = createText(")",25,'#000');
                tex.position.x = (dir.x-8);
                tex.position.y = dir.y+20;
                tex.position.z = 0;
                varObj.add(tex);
            }


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
            text = new SpriteText2D(i/stepSize, textStyle);

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

        // label y axis:
        textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for( i = start; i <= stop; i = i+stepSize) {
            if(i == 0){ continue;}
            text = new SpriteText2D(i/stepSize, textStyle);
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
    }
    function vec3(x,y,z){
        return new THREE.Vector3(x, y, z);
    }

    function createObj1(){
        //大图导数
        obj2 = new THREE.Group();
        daoshuSphere = thiz.createSphere([0,0,0],15,'#60b6f1');
        daoshuSphere1 = thiz.createSphere([0,0,0],40,'#60b6f1');
        daoshuSphere1.material.opacity = 0;
        obj2.add(daoshuSphere,daoshuSphere1);
        selectobjs.push(daoshuSphere1);

        daoshuSphere.position.x = 50;
        daoshuSphere.position.y = 50;
        daoshuSphere1.position.x = 50;
        daoshuSphere1.position.y = 50;
        var vertices = [];

        vertices.push(new THREE.Vector3(-5*50,0,0));
        vertices.push(new THREE.Vector3(5*50,0,0));

        daoshuLine = createLineMesh(vertices,'#d0021b',3);

        daoshuLine.position.x = 50;
        daoshuLine.position.y = 50;

        obj2.add(daoshuLine);

        thiz.scene.add(obj2);

        obj3 = new THREE.Group();

        rotateLine();
    }
    function rotateLine(){
        var x,y,angle;
        x = spherePosition.x;
        if(selectFun == 1){
            y = 2*x;
            angle = Math.atan(y);
            daoshuLine.rotation.z = angle;
        }else if(selectFun == 2){
            y = 3*Math.pow(x,2);
            angle = Math.atan(y);
            daoshuLine.rotation.z = angle;
        }else if(selectFun == 3){
            y = -1*Math.pow(x,-2);
            angle = Math.atan(y);
            daoshuLine.rotation.z = angle;
        }

        createObj2();
        createFuzhu();
        changeDao();
    }

    function createObj2(){  // 小图
        thiz.scene.remove(obj1);

        if(!value1){ return;}

        obj1= new THREE.Group();

        var line=null,x,xiel,y,vertices = [];
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};

        line = thiz.createSphere([0,0,0],5,'red');

        if(selectFun == 1){
            x = spherePosition.x;
            y = x*2;
            line.position.x =x*20 + 350;
            line.position.y = y*20 - 350;

            obj1.add(line);

            vertices.push(new THREE.Vector3(x*20 + 350,y*20 - 350,0));
            vertices.push(new THREE.Vector3(x*20 + 350,-350,0));

            line = createLineMesh(vertices,'#666',2);

            obj1.add(line);

            line =new SpriteText2D('p', textStyle);
            line.position.x = x*20 + 350 +10;
            line.position.y = y*20 - 350;

            obj1.add(line);


        }else if(selectFun == 2){
            x = spherePosition.x;

            y = 3*Math.pow(x,2);

            line.position.x =x*20 + 350;
            line.position.y = y*20 - 350;

            obj1.add(line);

            vertices.push(new THREE.Vector3(x*20 + 350,y*20 - 350,0));
            vertices.push(new THREE.Vector3(x*20 + 350,-350,0));

            line = createLineMesh(vertices,'#666',2);

            obj1.add(line);

            line =new SpriteText2D('p', textStyle);
            line.position.x = x*20 + 350 +10;
            line.position.y = y*20 - 350;

            obj1.add(line);


        }else if(selectFun == 3){


            x = spherePosition.x;
            y = -1*Math.pow(x,-2);


            line.position.x =x*20 + 350;
            line.position.y = y*20 - 350;

            obj1.add(line);


            vertices.push(new THREE.Vector3(x*20 + 350,y*20 - 350,0));
            vertices.push(new THREE.Vector3(x*20 + 350,-350,0));

            line = createLineMesh(vertices,'#666',2);

            obj1.add(line);

            line =new SpriteText2D('p', textStyle);
            line.position.x = x*20 + 350 +10;
            line.position.y = y*20 - 350;

            obj1.add(line);


            vertices=[];
            vertices.push(new THREE.Vector3(x*20 + 350,y*20 - 350,0));
            vertices.push(new THREE.Vector3(x*20 + 350,-350,0));

            line = createLineMesh(vertices,'#666',2);

            obj1.add(line);

        }

        thiz.scene.add(obj1);


        if(!value2){
            obj1.visible = false;
        }


    }
    function createFuzhu(){
        thiz.scene.remove(textP);


        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};



        textP = new THREE.Group();
        var line = null,vertices = [];


        vertices.push(new THREE.Vector3(spherePosition.x*50,spherePosition.y*50,0));
        vertices.push(new THREE.Vector3(spherePosition.x*50,0,0));

        line =createLineMesh(vertices,'#666',2);

        textP.add(line);

        line =new SpriteText2D("P", textStyle);

        line.position.x = spherePosition.x*50+20;
        line.position.y = spherePosition.y*50;
        textP.add(line);


        thiz.scene.add(textP);

        if(!value1){
            textP.visible = false;
        }

    }

    function createXiaoline(){
        thiz.scene.remove(xiaoLine);

        var vertices = [],i,y,curve=null,geometry=null,material=null;
        if(selectFun == 1){

            vertices = [];
            vertices.push(new THREE.Vector3(-2.5*20,-5*20,0));
            vertices.push(new THREE.Vector3(2.5*20,5*20,0));
            xiaoLine = createLineMesh(vertices,'#f39800',3);
            xiaoLine.position.x = 350;
            xiaoLine.position.y = -350;

        }else if(selectFun == 2){

            for(i=-5;i<=5.01;){
                y=3*Math.pow(i,2);
                if(y<=5&&y>=-5){
                    vertices.push(new THREE.Vector3(i*20, y*20, 0));
                }
                i = i+0.1;
            }

            curve = new THREE.CatmullRomCurve3(vertices);
            geometry = new THREE.Geometry();
            geometry.vertices = curve.getPoints(100);
            material = new THREE.LineBasicMaterial({color : '#f39800'});
            xiaoLine = new THREE.Line(geometry, material);
            xiaoLine.position.x = 350;
            xiaoLine.position.y = -350;

        }else if(selectFun == 3){
            xiaoLine = new THREE.Group();
            for(i=-5;i<0;){
                y=-1*Math.pow(i,-2);
                if(y<=5&&y>=-5){
                    vertices.push(new THREE.Vector3(i*20, y*20, 0));
                }
                i = i+0.1;
            }

            curve = new THREE.CatmullRomCurve3(vertices);
            geometry = new THREE.Geometry();
            geometry.vertices = curve.getPoints(100);
            material = new THREE.LineBasicMaterial({color : '#f39800'});
            var line = new THREE.Line(geometry, material);
            xiaoLine.add(line);

            vertices=[];
            for(i=0;i<5;){
                y=-1*Math.pow(i,-2);
                if(y<=5&&y>=-5){
                    vertices.push(new THREE.Vector3(i*20, y*20, 0));
                }
                i = i+0.1;
            }

            curve = new THREE.CatmullRomCurve3(vertices);
            geometry = new THREE.Geometry();
            geometry.vertices = curve.getPoints(100);
            material = new THREE.LineBasicMaterial({color : '#f39800'});
            line = new THREE.Line(geometry, material);
            xiaoLine.add(line);

            xiaoLine.position.x = 350;
            xiaoLine.position.y = -350;
        }

        thiz.scene.add(xiaoLine);

        if(!value2){
            xiaoLine.visible =false;
        }
    }
    function changeDao(){
        var x,y;
        if(selectFun == 1){
            x = spherePosition.x;
            y = x*2;
            $dao1.find('.dao').text(y.toFixed(1));
            if(y>0){
                $dao1.find('.comp').text('>');
                $dao1.find('.compare').text('单调递增');
            }else if(y==0){
                $dao1.find('.comp').text('=');
                $dao1.find('.compare').text('');
            }else{
                $dao1.find('.comp').text('<');
                $dao1.find('.compare').text('单调递减');
            }

        }else if(selectFun == 2){
            x = spherePosition.x;
            y = 3*Math.pow(x,2);
            $dao1.find('.dao').text(y.toFixed(1));

            if(y>0){
                $dao1.find('.comp').text('>');
                $dao1.find('.compare').text('单调递增');
            }else if(y==0){
                $dao1.find('.comp').text('=');
                $dao1.find('.compare').text('');
            }else{
                $dao1.find('.comp').text('<');
                $dao1.find('.compare').text('单调递减');
            }

        }else if(selectFun == 3){
            x = spherePosition.x;
            y = -1*Math.pow(x,-2);
            $dao1.find('.dao').text(y.toFixed(1));

            if(y>0){
                $dao1.find('.comp').text('>');
                $dao1.find('.compare').text('单调递增');
            }else if(y==0){
                $dao1.find('.comp').text('=');
                $dao1.find('.compare').text('');
            }else{
                $dao1.find('.comp').text('<');
                $dao1.find('.compare').text('单调递减');
            }

            x = spherePosition1.x;

            y = -1*Math.pow(x,-2);



        }
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



function turnRight(){
    var dataId = $(this).attr('data-id');

    if(dataId == 1){
        value1 = !value1;
    }else if(dataId == 2){
        value2 = !value2;
    }else if(dataId == 3){
        value3 = !value3;
    }

    if($(this).parent().hasClass('on')){
        $(this).parent().removeClass('on').addClass('off');
        $(this).parent().find('.span2').text('' +'off');
    }else{
        $(this).parent().removeClass('off').addClass('on');
        $(this).parent().find('.span2').text('' +'on');
    }
    threeDimensional.clickEEve();
}
function renew(){
    $('.turnDiv').removeClass('on').addClass('off');
    $('.turnRight').parent().find('.span2').text('' +'off');
    value1 = value2 = value3 = 0;
    selectFun = 1;
    $('.selectChoose').removeClass('open');
    $('.option').removeClass('choose')
    $('.option').eq(0).addClass('choose')
    $('.optionChoose').html('<p><img src="images/7.png" class="img1" /></p>');
    threeDimensional.reback();
}
function optionChoose(){
    if($(this).parent().hasClass('open')){
        $(this).parent().removeClass('open');
    }else{
        $(this).parent().addClass('open');
        $('.optionContainer').css('visibility','hidden');
        setTimeout(function(){
        	$('.optionContainer').css('visibility','visible');
        },50);
    }
}
function option(){
    selectFun = parseInt($(this).attr('data-id'));
    $(this).siblings().removeClass('choose').end().addClass('choose');
    $('.optionChoose').html($(this).html());
    $('.selectChoose').removeClass('open');
    threeDimensional.clickEve();
}
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


if(isMob){
	$('.turnRight').on('touchstart',turnRight);
	$('#renew').on('touchstart',renew);
	//下拉框事件
	$('.optionChoose,.arrow').on('touchstart',optionChoose);
	$('.option').on('touchstart',option);
	$('#scale').on('touchstart',scalef);
}else{
	$('.turnRight').on('click',turnRight);
	$('#renew').on('click',renew);
	//下拉框事件
	$('.optionChoose,.arrow').on('click',optionChoose);
	$('.option').on('click',option);
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








