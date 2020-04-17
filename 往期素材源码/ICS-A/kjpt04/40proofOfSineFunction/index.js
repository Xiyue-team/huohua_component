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
var fullScreen=0;

var value1=0,value2=0,value3=0;
var selectFun = 1;

function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var $obj = $('#threeContainer'),
        threeHeight = $obj.height(),
        threeWidth = $obj.width();

    var axis={},mousedownflag = false,triangleObj=null,changeSphere=null,startObj=null;

    var arr1 = [[2,3.46],[3.5,-1.93],[-2,-3.46]],obj1=null;
    var arrO2 =[[-2,3.46],[3.5,-1.93],[-2,-3.46]], arr2 = [[-2,3.46],[3.5,-1.93],[-2,-3.46]],moveObj1=null;
    var arrO3 =[[-4,-2],[4,-2],[2,2]], arr3 = [[-4,-2],[4,-2],[2,2]],moveObj2=null,obj2=null;
    var arrO4 =[[-4,-2],[4,-2],[2,2]], arr4 = [[-4,-2],[4,-2],[2,2]],moveObj3=null,obj3=null;

    $('.verticalCenter').css('margin-top',($('#controlContainer').height() -119 - $('.verticalCenter').height() )/2);

    var thiz = this;
    var grid=null,selectobjs=[],selectobj=null;
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
        // this.createAxis();


        changeSphere = this.createSphere([0,0,0],10,'#60b6f1');
        thiz.scene.add(changeSphere);
        selectobjs.push(changeSphere);


        startObj = new THREE.Group();

        var vertices1=[],obj=null,direct;
        for(var i = 0;i<3;i++){
            vertices1 = [];
            if(i != 2){
                vertices1.push(new THREE.Vector3(arr2[i][0]*50, arr2[i][1]*50, 0));
                vertices1.push(new THREE.Vector3(arr2[i+1][0]*50, arr2[i+1][1]*50, 0));
            }else{
                vertices1.push(new THREE.Vector3(arr2[i][0]*50, arr2[i][1]*50, 0));
                vertices1.push(new THREE.Vector3(arr2[0][0]*50, arr2[0][1]*50, 0));
            }
            obj = createLineMesh(vertices1,'#000',3);
            startObj.add(obj);
        }


        obj = createText("A",30,'#000');

        if(arr2[0][0] > 0){ direct = 20}else{ direct = -20; }
        obj.position.x = arr2[0][0]*50+direct;


        if(arr2[0][1] > 0){ direct = 20}else{ direct = -20; }
        obj.position.y = arr2[0][1]*50+direct;

        startObj.add(obj);

        obj = createText("B",30,'#000');
        obj.position.x = arr2[2][0]*50-20;
        obj.position.y = arr2[2][1]*50-20;
        startObj.add(obj);

        obj = createText("C",30,'#000');
        obj.position.x = arr2[1][0]*50+20;
        obj.position.y = arr2[1][1]*50-20;
        startObj.add(obj);


        obj = createText("a",30,'#000');
        obj.position.x = 50*(arr2[2][0]+arr2[1][0])/2;
        obj.position.y = 50*(arr2[2][1]+arr2[1][1])/2;
        startObj.add(obj);

        obj = createText("b",30,'#000');
        obj.position.x = 50*(arr2[0][0]+arr2[1][0])/2+40;
        obj.position.y = 50*(arr2[0][1]+arr2[1][1])/2;
        startObj.add(obj);

        obj = createText("c",30,'#000');
        obj.position.x = 50*(arr2[0][0]+arr2[2][0])/2-10;
        obj.position.y = 50*(arr2[0][1]+arr2[2][1])/2;
        startObj.add(obj);

        thiz.scene.add(startObj);
        startObj.rotation.z = -15*3.14/180;


        createObj2();
        createObj3();
        createObj1();
        obj1.visible = false;
        moveObj1.visible = false;
        obj2.visible = false;
        moveObj2.visible = false;
        obj3.visible = false;
        moveObj3.visible = false;
        changeSphere.visible =false;


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
    this.reback = function(){
        this.camera.position.z = 1300;
        this.clickEve();
    };
    this.clickEve = function(){
        var i;
        if(selectFun == 1){
            startObj.visible =false;
            obj2.visible = false;
            moveObj2.visible = false;
            obj3.visible = false;
            moveObj3.visible = false;
            changeSphere.visible = true;
            for(i =0;i<arrO2.length;i++){
                arr2[i][0] = arrO2[i][0];
                arr2[i][1] = arrO2[i][1];
            }
            createObj1();
        }else if(selectFun ==2){
            startObj.visible =false;
            obj1.visible = false;
            moveObj1.visible = false;
            obj3.visible = false;
            moveObj3.visible = false;
            changeSphere.visible = true;
            for(i =0;i<arrO3.length;i++){
                arr3[i][0] = arrO3[i][0];
                arr3[i][1] = arrO3[i][1];
            }
            createObj2();

        }else if(selectFun == 3){
            startObj.visible =false;
            obj1.visible = false;
            moveObj1.visible = false;
            obj2.visible = false;
            moveObj2.visible = false;
            changeSphere.visible = true;
            for(i =0;i<arrO4.length;i++){
                arr4[i][0] = arrO4[i][0];
                arr4[i][1] = arrO4[i][1];
            }
            createObj3();
        }else{
            startObj.visible =true;
            obj1.visible = false;
            moveObj1.visible = false;
            obj2.visible = false;
            moveObj2.visible = false;
            changeSphere.visible = false;
            obj3.visible = false;
            moveObj3.visible = false;
            changeSphere.visible = false;
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

                if(obj.x >=500){ obj.x = 500}
                if(obj.x <= -500){ obj.x = -500}

                x = obj.x/50;
                y = obj.y/50;
                x = parseFloat(x.toFixed(1));
                y = parseFloat(y.toFixed(1));


                if(selectFun == 1){

                    if(x > 3 || x< -3){
                        x = Math.sqrt(16 - Math.pow(y,2));
                        if(obj.x<0){x = -x;}
                    }else{
                        y = Math.sqrt(16 - Math.pow(x,2));
                        if(obj.y<0){ y = -y; }
                    }

                    arr2[0][0] = x;
                    arr2[0][1] = y;

                    changeSphere.position.x = x*50;
                    changeSphere.position.y = y*50;

                    createMoveObj1();

                }else if(selectFun == 2){
                    arr3[2][0] = x;


                    changeSphere.position.x = x*50;
                    changeSphere.position.y = 2*50;

                    createMoveObj2();
                }else if(selectFun == 3){
                    arr4[2][0] = x;


                    changeSphere.position.x = x*50;
                    changeSphere.position.y = 2*50;
                    createMoveObj3()
                }

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
                    if(obj.x >=500){ obj.x = 500}
                    if(obj.x <= -500){ obj.x = -500}

                    x = obj.x/50;
                    y = obj.y/50;
                    x = parseFloat(x.toFixed(1));
                    y = parseFloat(y.toFixed(1));

                    if(selectFun == 1){

                        if(x > 3 || x< -3){
                            x = Math.sqrt(16 - Math.pow(y,2));
                            if(obj.x<0){x = -x;}
                        }else{
                            y = Math.sqrt(16 - Math.pow(x,2));
                            if(obj.y<0){ y = -y; }
                        }

                        arr2[0][0] = x;
                        arr2[0][1] = y;

                        changeSphere.position.x = x*50;
                        changeSphere.position.y = y*50;

                        createMoveObj1();

                    }else if(selectFun == 2){
                        arr3[2][0] = x;


                        changeSphere.position.x = x*50;
                        changeSphere.position.y = 2*50;

                        createMoveObj2();
                    }else if(selectFun == 3){
                        arr4[2][0] = x;


                        changeSphere.position.x = x*50;
                        changeSphere.position.y = 2*50;
                        createMoveObj3()
                    }

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

    function createText(font,size,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
        return new SpriteText2D(font, textStyle);
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
        thiz.scene.remove(obj1);
        obj1 = new THREE.Group();
        var vertices1=[],vertices2=[],line = null;
        for(var i=-4;i<=4.0001;){
            y=Math.sqrt(16 - Math.pow(i,2));
            // if(y<=5&&y>=-5){
            vertices1.push(new THREE.Vector3(i*50, y*50, 0));
            vertices2.push(new THREE.Vector3(i*50, -y*50, 0));
            // }
            i = i+0.01;
        }
        var curve = new THREE.CatmullRomCurve3(vertices1);
        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        var material = new THREE.LineBasicMaterial({color : '#1161c8'});
        var obj = new THREE.Line(geometry, material);

        obj1.add(obj);

        curve = new THREE.CatmullRomCurve3(vertices2);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : '#1161c8'});
        obj = new THREE.Line(geometry, material);

        obj1.add(obj);

        for(i = 0;i<3;i++){
            vertices1 = [];
            if(i != 2){
                vertices1.push(new THREE.Vector3(arr1[i][0]*50, arr1[i][1]*50, 0));
                vertices1.push(new THREE.Vector3(arr1[i+1][0]*50, arr1[i+1][1]*50, 0));
            }else{
                vertices1.push(new THREE.Vector3(arr1[i][0]*50, arr1[i][1]*50, 0));
                vertices1.push(new THREE.Vector3(arr1[0][0]*50, arr1[0][1]*50, 0));
            }
            obj = createLineMesh(vertices1,'#000',2);
            obj1.add(obj)
        }

        obj = new THREE.Group();

        vertices1=[];
        vertices1.push(new THREE.Vector3(20, 0, 0));
        vertices1.push(new THREE.Vector3(20, 20, 0));
        line = createLineMesh(vertices1,'#000',3);
        obj.add(line);
        vertices1=[];
        vertices1.push(new THREE.Vector3(0, 20, 0));
        vertices1.push(new THREE.Vector3(20, 20, 0));
        line = createLineMesh(vertices1,'#000',3);
        obj.add(line);

        obj.position.x = arr1[1][0]*50;
        obj.position.y = arr1[1][1]*50;

        obj.rotation.z = 108*3.14/180;

        obj1.add(obj);

        obj = createText("B",30,'#000');
        obj.position.x = arr1[2][0]*50-20;
        obj.position.y = arr1[2][1]*50-20;
        obj1.add(obj);

        obj = createText("C",30,'#000');
        obj.position.x = arr1[1][0]*50+20;
        obj.position.y = arr1[1][1]*50-20;
        obj1.add(obj);

        obj = createText("O",30,'#000');
        obj.position.x = -20;
        obj.position.y = -20;
        obj1.add(obj);



        obj = thiz.createSphere([0,0,0],10,'#f39800');
        obj1.add(obj);

        thiz.scene.add(obj1);

        changeSphere.position.x = arr2[0][0]*50;
        changeSphere.position.y = arr2[0][1]*50;

        createMoveObj1();

    }
    function createMoveObj1(){
        thiz.scene.remove(moveObj1);
        moveObj1 = new THREE.Group();

        var vertices1=[],obj=null,direct;
        for(var i = 0;i<3;i++){
            vertices1 = [];
            if(i != 2){
                vertices1.push(new THREE.Vector3(arr2[i][0]*50, arr2[i][1]*50, 0));
                vertices1.push(new THREE.Vector3(arr2[i+1][0]*50, arr2[i+1][1]*50, 0));
            }else{
                vertices1.push(new THREE.Vector3(arr2[i][0]*50, arr2[i][1]*50, 0));
                vertices1.push(new THREE.Vector3(arr2[0][0]*50, arr2[0][1]*50, 0));
            }
            obj = createLineMesh(vertices1,'#000',3);
            moveObj1.add(obj);
        }


        obj = createText("A",30,'#000');

        if(arr2[0][0] > 0){ direct = 20}else{ direct = -20; }
        obj.position.x = arr2[0][0]*50+direct;


        if(arr2[0][1] > 0){ direct = 20}else{ direct = -20; }
        obj.position.y = arr2[0][1]*50+direct;

        moveObj1.add(obj);


        obj = createText("A'",30,'#000');
        obj.position.x = arr1[0][0]*50+20;
        obj.position.y = arr1[0][1]*50+20;

        if(arr2[0][0] == arr1[0][0]){
            if(arr2[0][1] < 0){
                moveObj1.add(obj);
            }
        }else{
            moveObj1.add(obj);
        }





        obj = createText("a",30,'#000');
        obj.position.x = 50*(arr2[2][0]+arr2[1][0])/2;
        obj.position.y = 50*(arr2[2][1]+arr2[1][1])/2;
        moveObj1.add(obj);

        obj = createText("b",30,'#000');
        obj.position.x = 50*(arr2[0][0]+arr2[1][0])/2;
        obj.position.y = 50*(arr2[0][1]+arr2[1][1])/2;
        moveObj1.add(obj);

        obj = createText("c",30,'#000');
        obj.position.x = 50*(arr2[0][0]+arr2[2][0])/2;
        obj.position.y = 50*(arr2[0][1]+arr2[2][1])/2;
        moveObj1.add(obj);



        thiz.scene.add(moveObj1);
    }
    function createObj2(){
        thiz.scene.remove(obj2);
        obj2 = new THREE.Group();


        var vertices1=[],vertices2=[],line = null;

        vertices1.push(new THREE.Vector3(-500, 100, 0));
        vertices1.push(new THREE.Vector3(500, 100, 0));
        line = createLineMesh(vertices1,'#000',2);
        obj2.add(line);


        changeSphere.position.x = arr3[2][0]*50;
        changeSphere.position.y = arr3[2][1]*50;



        line = createText("C",30,'#000');
        line.position.x = arr3[0][0]*50-10;
        line.position.y = arr3[0][1]*50;
        obj2.add(line);

        line = createText("B",30,'#000');
        line.position.x = arr3[1][0]*50+10;
        line.position.y = arr3[1][1]*50;
        obj2.add(line);

        line = createText("a",30,'#000');
        line.position.x = (arr3[1][0]*50 +arr3[0][0]*50)/2;
        line.position.y = arr3[1][1]*50 - 10;
        obj2.add(line);


        thiz.scene.add(obj2);

        createMoveObj2();

    }
    function createMoveObj2(){
        thiz.scene.remove(moveObj2);
        moveObj2 = new THREE.Group();
        var vertices1=[],vertices2=[],line = null;

        for(var i = 0;i<3;i++){
            vertices1 = [];
            if(i != 2){
                vertices1.push(new THREE.Vector3(arr3[i][0]*50, arr3[i][1]*50, 0));
                vertices1.push(new THREE.Vector3(arr3[i+1][0]*50, arr3[i+1][1]*50, 0));
            }else{
                vertices1.push(new THREE.Vector3(arr3[i][0]*50, arr3[i][1]*50, 0));
                vertices1.push(new THREE.Vector3(arr3[0][0]*50, arr3[0][1]*50, 0));
            }
            line = createLineMesh(vertices1,'#000',3);
            moveObj2.add(line);
        }


        line = createText("A",30,'#000');
        line.position.x = arr3[2][0]*50;
        line.position.y = arr3[2][1]*50 + 40;
        moveObj2.add(line);


        line = createText("b",30,'#000');
        line.position.x = (arr3[2][0]+arr3[0][0])/2*50 -40;
        line.position.y = (arr3[2][1]+arr3[0][1])/2*50;
        moveObj2.add(line);

        line = createText("c",30,'#000');
        line.position.x = (arr3[2][0]+arr3[1][0])/2*50 +40;
        line.position.y = (arr3[2][1]+arr3[1][1])/2*50;
        moveObj2.add(line);


        vertices1=[];

        vertices1.push(new THREE.Vector3(arr3[2][0]*50, -100, 0));
        vertices1.push(new THREE.Vector3(arr3[2][0]*50, 100, 0));
        line = createLineMesh(vertices1,'#000',2);
        moveObj2.add(line);

        vertices1=[];
        vertices2=[];
        if(arr3[2][0] < 0){
            vertices1.push(new THREE.Vector3(arr3[2][0]*50, -90, 0));
            vertices1.push(new THREE.Vector3(arr3[2][0]*50+10, -90, 0));

            vertices2.push(new THREE.Vector3(arr3[2][0]*50+10, -100, 0));
            vertices2.push(new THREE.Vector3(arr3[2][0]*50+10, -90, 0));
        }else{
            vertices1.push(new THREE.Vector3(arr3[2][0]*50, -90, 0));
            vertices1.push(new THREE.Vector3(arr3[2][0]*50-10, -90, 0));

            vertices2.push(new THREE.Vector3(arr3[2][0]*50-10, -100, 0));
            vertices2.push(new THREE.Vector3(arr3[2][0]*50-10, -90, 0));
        }
        line = createLineMesh(vertices1,'#000',3);
        moveObj2.add(line);

        line = createLineMesh(vertices2,'#000',3);
        moveObj2.add(line);

        if(arr3[2][0] > arr3[1][0]){
            vertices1=[];

            vertices1.push(new THREE.Vector3(arr3[2][0]*50, -100, 0));
            vertices1.push(new THREE.Vector3(arr3[1][0]*50, -100, 0));

            line = createLineMesh(vertices1,'#000',2);
            moveObj2.add(line);

        }

        if(arr3[2][0] < arr3[0][0]){
            vertices1=[];

            vertices1.push(new THREE.Vector3(arr3[2][0]*50, -100, 0));
            vertices1.push(new THREE.Vector3(arr3[0][0]*50, -100, 0));

            line = createLineMesh(vertices1,'#000',2);
            moveObj2.add(line);


        }

        if(arr3[2][0] == arr3[1][0]){

        }else if(arr3[2][0] == arr3[0][0]){

        }else{
            line = createText("D",30,'#000');
            line.position.x = arr3[2][0]*50;
            line.position.y = -120;
            moveObj2.add(line);
        }

        thiz.scene.add(moveObj2);
    }
    function createObj3(){
        thiz.scene.remove(obj3);
        obj3 = new THREE.Group();


        var vertices1=[],vertices2=[],line = null;

        vertices1.push(new THREE.Vector3(-500, 100, 0));
        vertices1.push(new THREE.Vector3(500, 100, 0));
        line = createLineMesh(vertices1,'#000',2);
        obj3.add(line);


        changeSphere.position.x = arr4[2][0]*50;
        changeSphere.position.y = arr4[2][1]*50;



        line = createText("C",30,'#000');
        line.position.x = arr4[0][0]*50-10;
        line.position.y = arr4[0][1]*50;
        obj3.add(line);

        line = createText("B",30,'#000');
        line.position.x = arr4[1][0]*50+10;
        line.position.y = arr4[1][1]*50;
        obj3.add(line);

        line = createText("a",30,'#000');
        line.position.x = (arr4[1][0]*50 +arr3[0][0]*50)/2;
        line.position.y = arr4[1][1]*50 - 10;
        obj3.add(line);

        line = createArrow();
        line.position.x = arr4[1][0]*50;
        line.position.y = arr4[1][1]*50;
        obj3.add(line);


        thiz.scene.add(obj3);

        createMoveObj3();
    }
    function createMoveObj3(){
        thiz.scene.remove(moveObj3);
        moveObj3 = new THREE.Group();
        var vertices1=[],line = null,angle;

        for(var i = 0;i<3;i++){
            vertices1 = [];
            if(i != 2){
                vertices1.push(new THREE.Vector3(arr4[i][0]*50, arr4[i][1]*50, 0));
                vertices1.push(new THREE.Vector3(arr4[i+1][0]*50, arr4[i+1][1]*50, 0));
            }else{
                vertices1.push(new THREE.Vector3(arr4[i][0]*50, arr4[i][1]*50, 0));
                vertices1.push(new THREE.Vector3(arr4[0][0]*50, arr4[0][1]*50, 0));
            }
            line = createLineMesh(vertices1,'#000',3);
            moveObj3.add(line);
        }


        line = createText("A",30,'#000');
        line.position.x = arr4[2][0]*50;
        line.position.y = arr4[2][1]*50 + 40;
        moveObj3.add(line);


        line = createText("b",30,'#000');
        line.position.x = (arr4[2][0]+arr4[0][0])/2*50 -40;
        line.position.y = (arr4[2][1]+arr4[0][1])/2*50;
        moveObj3.add(line);

        line = createText("c",30,'#000');
        line.position.x = (arr4[2][0]+arr4[1][0])/2*50 +40;
        line.position.y = (arr4[2][1]+arr4[1][1])/2*50;
        moveObj3.add(line);



        line = createArrow();
        angle = (arr4[2][1] - arr4[1][1])/(arr4[2][0] - arr4[1][0]);

        angle = Math.atan(angle);

        if(arr4[2][0] < arr4[1][0]){
            angle = angle+3.14;
        }

        line.rotation.z = angle;

        line.position.x = arr4[2][0]*50 -  10*Math.cos(angle);
        line.position.y = arr4[2][1]*50 -  10*Math.sin(angle);

        moveObj3.add(line);


        line = createArrow();
        angle = (arr4[2][1] - arr4[0][1])/(arr4[2][0] - arr4[0][0]);

        angle = Math.atan(angle);

        if(arr4[2][0] < arr4[0][0]){
            angle = angle+3.14;
        }

        line.rotation.z = angle;

        line.position.x = arr4[2][0]*50 -  10*Math.cos(angle);
        line.position.y = arr4[2][1]*50 -  10*Math.sin(angle);

        moveObj3.add(line);


        if( arr4[2][0] == arr4[1][0]){

        }else{
            vertices1 = [];
            vertices1.push(new THREE.Vector3(arr4[1][0]*50, arr4[1][1]*50, 0));
            vertices1.push(new THREE.Vector3(arr4[1][0]*50, 0, 0));

            line = createLineMesh(vertices1,'#666',2);
            moveObj3.add(line);

            line =  createArrow();
            line.rotation.z = Math.PI/2;
            line.position.x = arr4[1][0]*50;
            line.position.y = 0;
            moveObj3.add(line);

            line = createText("i",30,'#666');
            line.position.x = arr4[1][0]*50+20;
            line.position.y = -50;
            moveObj3.add(line);
        }

        thiz.scene.add(moveObj3);
    }

    function createArrow(){
        var arrow = new THREE.Shape();
        var material = new THREE.MeshBasicMaterial({'color':'#f39800'});
        arrow.moveTo(-8,8);
        arrow.lineTo(8,0);
        arrow.lineTo(-8,-8);
        return new THREE.Mesh(new THREE.ShapeGeometry(arrow),material);

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

function renew(){
    $('.radios').find('.radiocircle').removeClass('select');
    selectFun = 0;
    threeDimensional.reback();
}

//单选框事件
function radioChoose(){
    if( $(this).find('.radiocircle').hasClass('select')){
        $('.radios').find('.radiocircle').removeClass('select');
        selectFun = 0;
    }else{
        selectFun = parseInt($(this).attr('data-id'));
        $('.radios').find('.radiocircle').removeClass('select');
        $(this).find('.radiocircle').addClass('select');
    }
    threeDimensional.clickEve();
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
/*全屏事件*/
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
	$('#renew').on('touchstart',renew);
	$('.radioChoose .radios').on('touchstart',radioChoose);
	$('#scale').on('touchstart',scalef);
}else{
	$('#renew').on('click',renew);
	$('.radioChoose .radios').on('click',radioChoose);
	$('#scale').on('click',scalef);
}
	




