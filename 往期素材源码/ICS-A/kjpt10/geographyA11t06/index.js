//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});

var height=window.innerHeight-68;
var width = window.innerWidth;
var rate = height/width;
$('#main').height(height);
window.onresize=function(){
	height=window.innerHeight-68;
    width = window.innerWidth;
	$('#main').height(height);

    if(height/width > rate){
        height = width*rate;
        $('#main canvas').width(width).height(height);
    }else{
        width = height/rate;
        $('#main canvas').width(width).height(height);
    }
    $('#main canvas').css('margin-left',(window.innerWidth - width)/2)
};

var isMob = /iPad|Android/g.test(navigator.userAgent);
var container,camera, scene, renderer,controls;
var offsetTop = $('#main').offset().top,offsetLeft = $('#main').offset().left,
    threeHeight = $('#main').height(), threeWidth = $('#main').width();
var raycaster = new THREE.Raycaster(),
    plane = new THREE.Plane(),
    offset = new THREE.Vector3(),
    intersection = new THREE.Vector3(),
    mouse = new THREE.Vector2(),
    INTERSECTED = null;
var selectobj,selectobjs=[],mousedownflag=false;
var radiusRate = 30,radius = 300/radiusRate;
var textAlign = THREE_Text.textAlign,
    SpriteText2D = THREE_Text.SpriteText2D;

var pointA,pointAA,lineGroup,dashLineGroup,oldAngle,nowAngle,lineA,lineB,lineA1,lineB1,textB11,textA11,createOnce=[],textAngleA,textAngleB,cubeLine,cubeText;


var createLine = function(vertices, color, style){
    var lineMesh = null, geometryLine = new THREE.Geometry();
    geometryLine.vertices = vertices;
    if (!color) {
        color = '#000';
    }
    if (!style) {
        lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color,linewidth:3}));
    } else {
        geometryLine.computeLineDistances();
        lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
            color: color,
            opacity: 0.8,
            dashSize: 5,
            gapSize: 5,
            linewidth:2
        }));
    }
    return lineMesh;
};
var objStyle = function(color, fontsize){
    return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
};
var createText = function(content, coordinate, color,size,offset){
    if (!color) {
        color = '#000';
    }
    if(!size){
        size = 23;
    }
    var fontsize = size+'px Cambria Math';

    var textStyle = objStyle(color, fontsize),
        text = new SpriteText2D(content, textStyle),x,y,z;

    if(!offset){
        text.position.set(coordinate[0], coordinate[1], coordinate[2]);
    }else{
        if(coordinate[0]>0){ x = coordinate[0]+30;}else{x = coordinate[0]-30; }
        if(coordinate[1]>0){ y = coordinate[1]+30;}else{y = coordinate[1]-30; }
        if(coordinate[2]>0){ z = coordinate[2]+30;}else{z = coordinate[2]-30; }
        text.position.set(x, y, z);
    }

    return text;
};
// var lineColor='#000000';
var createSphere = function(coordinate, radius,color){
    if (!color) {
        color = '#000';
    }
    var sphereG = new THREE.SphereGeometry(radius, 10, 10, 0, 2 * Math.PI, 0, 2 * Math.PI);
    var sphereM = new THREE.MeshBasicMaterial({color: color,transparent:true,opacity:1});
    var sphere = new THREE.Mesh(sphereG, sphereM);
    sphere.position.x = coordinate[0];
    sphere.position.y = coordinate[1];
    sphere.position.z = coordinate[2];
    return sphere;
};
var createCuble = function(){
    if(cubeLine){
        scene.remove(cubeLine);
    }
    if(!nowAngle){
        return
    }
    var min = 40*Math.cos(nowAngle),y,arr=[];
    for(var x =40;x>min;x-=0.001){
        y = Math.sqrt(Math.pow(40,2) - Math.pow(x,2));
        arr.push(new THREE.Vector3(x,y,0))
    }


    try {
        var curve = new THREE.CatmullRomCurve3(arr);
        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        var material = new THREE.LineBasicMaterial({color : lineColor,linewidth:3});
        cubeLine = new THREE.Line(geometry, material);
        scene.add(cubeLine);
    }catch (e){

    }

};
var createLineAB = function(){
    // if(lineA){
    //     scene.remove(lineA);
    // }
    // if(lineB){
    //     scene.remove(lineB);
    // }

    var angle = Math.PI/2 - nowAngle,vertices = [];
    var x = Math.cos(angle)*radius*radiusRate;
    var y = Math.sin(angle)*radius*radiusRate;

    // vertices.push(new THREE.Vector3(x,y,0));
    // vertices.push(new THREE.Vector3(-x,y,0));
    // lineB = createLine(vertices,'#000');
    // scene.add(lineB);

    // textAngleB.position.x = x+50;
    // textAngleB.position.y = y+10;

    x = Math.cos(nowAngle)*radius*radiusRate;
    y = Math.sin(nowAngle)*radius*radiusRate;

    // vertices = [];
    // vertices.push(new THREE.Vector3(x,y,0));
    // vertices.push(new THREE.Vector3(-x,y,0));
    // lineA = createLine(vertices,'#000');
    // scene.add(lineA);
    var num = 180*nowAngle/Math.PI;
    var degree1 = parseInt(num);
    var degree2 = parseInt((num - degree1)*60);
    if(degree2){
        textAngleA.text = cubeText.text = degree1 + '°' + degree2 +'\'';
    }else{
        textAngleA.text = cubeText.text = degree1 + '°';
    }

    // num = 180*(Math.PI/2 - nowAngle)/Math.PI;
    // degree1 = parseInt(num);
    // degree2 = parseInt((num - degree1)*60);
    // if(degree2){
    //     textAngleB.text = degree1 + '°' + degree2 +'\'';
    // }else{
    //     textAngleB.text = degree1 + '°';
    // }


    createCuble()

};
var crateLIneA1B1 = function(){
    if(lineA1){
        scene.remove(lineA1);
    }
    if(lineB1){
        scene.remove(lineB1);
    }
    if(textA11){
        scene.remove(textA11);
    }
    if(textB11){
        scene.remove(textB11);
    }

    var angle = Math.PI/2 - oldAngle,vertices = [];
    var x = Math.cos(angle)*radius*radiusRate;
    var y = Math.sin(angle)*radius*radiusRate;

    vertices.push(new THREE.Vector3(x,y,0));
    vertices.push(new THREE.Vector3(-x,y,0));
    lineB1 = createLine(vertices,'#000','1');
    scene.add(lineB1);

    textB11 = createText('B\'\'',[x+20,y+15,0],'#000',18);
    scene.add(textB11);

    x = Math.cos(oldAngle)*radius*radiusRate;
    y = Math.sin(oldAngle)*radius*radiusRate;

    vertices = [];
    vertices.push(new THREE.Vector3(x,y,0));
    vertices.push(new THREE.Vector3(-x,y,0));
    lineA1 = createLine(vertices,'#000','1');
    scene.add(lineA1);

    textA11 = createText('A\'\'',[-x-20,y+15,0],'#000',18);
    scene.add(textA11);

    dashLineGroup.visible = false;


};
var objPoint = null;
var createBase = function(){
    if(objPoint!=null){
        scene.remove(objPoint);
    }
    var x,y,i,array =[],array1=[],line,text,geometry,material,vertices;
    for(i=0;i<=Math.PI;){
        x = radius*radiusRate*Math.cos(i);
        y = radius*radiusRate*Math.sin(i);
        array.push(new THREE.Vector3(x,y,0));
        i+=0.01;
    }
    for(i=array.length-1;i>-1;i--){
        x = array[i]['x'];
        y = -array[i]['y'];
        array1.push(new THREE.Vector3(x,y,0))
    }
    array = array.concat(array1);
    var curve = new THREE.CatmullRomCurve3(array);
    geometry = new THREE.Geometry();
    geometry.vertices = curve.getPoints(100);
    material = new THREE.LineBasicMaterial({color : '#000000',linewidth:3});
    line = new THREE.Line(geometry, material);
    scene.add(line);

    text = createText('南极',[0,-(radius*radiusRate+55),0],'#000',20);
    scene.add(text);

    text = createText('北极',[0,(radius*radiusRate+55),0],'#000',20);
    scene.add(text);

    vertices = [];
    vertices.push(new THREE.Vector3(0,radius*radiusRate,0));
    vertices.push(new THREE.Vector3(0,-radius*radiusRate,0));
    line = createLine(vertices,'#000');
    scene.add(line);

    text = createText('地轴',[0,-(radius*radiusRate-100),0],'#000',18);
    scene.add(text);


    vertices = [];
    vertices.push(new THREE.Vector3(radius*radiusRate,0,0));
    vertices.push(new THREE.Vector3(-radius*radiusRate,0,0));
    line = createLine(vertices,'#000');
    scene.add(line);

    text = createText('赤道',[-(radius*radiusRate-100),20,0],'#000',18);
    scene.add(text);

    nowAngle = (23 + 0.26*100/60)*Math.PI/180;
    y = Math.sin(nowAngle)*radius*radiusRate;
    x = Math.cos(nowAngle)*radius*radiusRate;

    vertices = [];
    vertices.push(new THREE.Vector3(-x,y,0));
    vertices.push(new THREE.Vector3(x,y,0));
    line = createLine(vertices,'#000');
    scene.add(line);

    text = createText('北回归线',[-(radius*radiusRate-100),y+20,0],'#000',18);
    scene.add(text);

    objPoint = new THREE.Group();
    pointAA = createSphere([0,0,0],30);
    pointAA.material.transparent = true;
    pointAA.material.opacity = 0;
    pointA= createSphere([0,0,0],8);
    objPoint.add(pointA,pointAA);
    objPoint.position.set(x,y,0);
    scene.add(objPoint);

    selectobjs.push(pointAA);
    lineGroup = new THREE.Group();

    vertices = [];
    vertices.push(new THREE.Vector3(0,0,0));
    vertices.push(new THREE.Vector3(radiusRate*radius,0,0));
    line = createLine(vertices,'#000');
    lineGroup.add(line);

    vertices = [];
    vertices.push(new THREE.Vector3(0,radiusRate*radius,0));
    vertices.push(new THREE.Vector3(0,-radiusRate*radius,0));
    line = createLine(vertices,'#000');
    lineGroup.add(line);

    text = createText('晨昏线',[0,radiusRate*radius+30,0],'#000',18);
    lineGroup.add(text);

    text = createText('A',[radiusRate*radius+20,0,0],'#000',18);
    lineGroup.add(text);

    textAngleA = createText('23°26\'',[radiusRate*radius+55,-5,0],'#000',18);
    lineGroup.add(textAngleA);

    // textAngleB = createText('23°26\'',[0,radiusRate*radius+10,0],'#000',18);
    // scene.add(textAngleB);

    text = createText('C',[0,-(radiusRate*radius+20),0],'#000',18);
    lineGroup.add(text);

    lineGroup.position.set( 0, 0, 0 );
    scene.add(lineGroup);

    oldAngle = (Math.PI*(23.26)/180);
    lineGroup.rotation.z = oldAngle;

    dashLineGroup = new THREE.Group();
    vertices = [];
    vertices.push(new THREE.Vector3(0,0,0));
    vertices.push(new THREE.Vector3(radiusRate*radius,0,0));
    line = createLine(vertices,'#000','1');
    dashLineGroup.add(line);

    vertices = [];
    vertices.push(new THREE.Vector3(0,radiusRate*radius,0));
    vertices.push(new THREE.Vector3(0,-radiusRate*radius,0));
    line = createLine(vertices,'#000','1');
    dashLineGroup.add(line);
    dashLineGroup.position.set( 0, 0, 0 );
    scene.add(dashLineGroup);

    text = createText('B\'',[0,radiusRate*radius+30,0],'#000',18);
    dashLineGroup.add(text);
    createOnce.push(text);

    text = createText('A\'',[radiusRate*radius+20,0,0],'#000',18);
    dashLineGroup.add(text);
    createOnce.push(text);

    text = createText('C\'',[0,-(radiusRate*radius+20),0],'#000',18);
    dashLineGroup.add(text);
    createOnce.push(text);

    dashLineGroup.rotation.z = oldAngle;
    dashLineGroup.visible = false;


    cubeText = createText('23°26\'',[100,20,0],'#000',18);
    scene.add(cubeText)


    createLineAB();
    crateLIneA1B1();
};
var aold = (23 + 0.26*100/60)*Math.PI/180;
var yold = Math.sin(aold)*radius*radiusRate;
var xold = Math.cos(aold)*radius*radiusRate;
var moveEvents = {
    onDocumentMouseDown:function(){
        event.preventDefault();
        var mouse={},position={x:0,y:0};
        offsetTop = $('#main canvas').offset().top;offsetLeft = $('#main canvas').offset().left;
        position.x =offsetLeft;
        position.y =offsetTop;
        threeHeight = parseInt($('#main canvas').css('height'));threeWidth = parseInt($('#main canvas').css('width'));
        mouse.x = ((event.clientX-position.x) / threeWidth ) * 2 - 1;
        mouse.y = -( (event.clientY-position.y) / threeHeight ) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(selectobjs);
        if (intersects.length > 0) {
            selectobj = intersects[0].object;
            mousedownflag = true;
            // dashLineGroup.rotation.z = oldAngle;
            // crateLIneA1B1();
        }
    },
    onDocumentMouseMove:function(){
        event.preventDefault();
        var mouse={},position={x:0,y:0};
            position.x =offsetLeft;
            position.y =offsetTop;
        mouse.x = ((event.clientX-position.x) / threeWidth ) * 2 - 1;
        mouse.y = -( (event.clientY-position.y) / threeHeight ) * 2 + 1;
        var intersects = raycaster.intersectObjects( selectobjs );
        raycaster.setFromCamera(mouse, camera);
        if ( intersects.length > 0 ) {
            if ( INTERSECTED != intersects[ 0 ].object ) {
                INTERSECTED = intersects[ 0 ].object;
                plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection( plane.normal ),INTERSECTED.position );
            }
        }
        if(mousedownflag){
            if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                var obj = intersection.sub( offset ),x,y;
                x = obj.x;
                y = obj.y;
                if(x >= radiusRate*radius){
                    x = radiusRate*radius;
                }
                if(x <= 0){
                    x = 0;
                }
                if(y >=  radiusRate*radius){
                    y = radiusRate*radius
                }
                if(y<=0){
                    y = 0;
                }
                if(x > (radiusRate*radius-10) || x< 10){
                    x =  Math.sqrt(Math.pow(radius*radiusRate,2) - Math.pow(y,2));
                }else{
                    y = Math.sqrt(Math.pow(radius*radiusRate,2) - Math.pow(x,2));
                }
                
                if(Math.abs(x-xold)>0.5&&Math.abs(y-yold)>0.5){
                	dashLineGroup.visible = true;
                	lineColor='#0000ff';
                }else{
                	dashLineGroup.visible = false;
                    lineColor='#000000';
                }
                objPoint.position.x = x;
                objPoint.position.y = y;
                selectobj.material.color.set(lineColor);
                selectobj.parent.children[0].material.color.set(lineColor);
                nowAngle = Math.atan(y/x);
                lineGroup.rotation.z = nowAngle;
                lineGroup.children[0].material.color.set(lineColor);
                lineGroup.children[1].material.color.set(lineColor);
                createLineAB();
            }
        }
    },
    onDocumentMouseUp:function(){
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;
        oldAngle = nowAngle;
    },
    onDocumentTouchStart:function(){
        event.preventDefault();
        if (event.touches.length === 1) {
            var mouse={},position={x:0,y:0};
            threeHeight = parseInt($('#main canvas').css('height'));threeWidth = parseInt($('#main canvas').css('width'));
            offsetTop = $('#main canvas').offset().top;offsetLeft = $('#main canvas').offset().left;
            position.x =offsetLeft;
            position.y =offsetTop;
            mouse.x = ((event.touches[0].pageX-position.x) / threeWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-position.y) / threeHeight ) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            var intersects = raycaster.intersectObjects(selectobjs);
            if (intersects.length > 0) {
                selectobj = intersects[0].object;
                mousedownflag = true;
                // dashLineGroup.rotation.z = oldAngle;
                // crateLIneA1B1();
            }
        }
    },
    onDocumentTouchMove:function(){
        event.preventDefault();
        if (event.touches.length === 1) {
            var mouse={},position={x:0,y:0};
            position.x =offsetLeft;
            position.y =offsetTop;
            mouse.x = ((event.touches[0].pageX-position.x) / threeWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-position.y) / threeHeight ) * 2 + 1;
            var intersects = raycaster.intersectObjects( selectobjs );
            raycaster.setFromCamera(mouse, camera);
            if ( intersects.length > 0 ) {
                if ( INTERSECTED != intersects[ 0 ].object ) {
                    INTERSECTED = intersects[ 0 ].object;
                    plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection( plane.normal ),INTERSECTED.position );
                }
            }
            if(mousedownflag){

                if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                    var obj = intersection.sub( offset ),x,y;
                    x = obj.x;
                    y = obj.y;
                    if(x >= radiusRate*radius){
                        x = radiusRate*radius;
                    }
                    if(x <= 0){
                        x = 0;
                    }
                    if(y >=  radiusRate*radius){
                        y = radiusRate*radius
                    }
                    if(y<=0){
                        y = 0;
                    }
                    if(x > (radiusRate*radius-10) || x< 10){
                        x =  Math.sqrt(Math.pow(radius*radiusRate,2) - Math.pow(y,2));
                    }else{
                        y = Math.sqrt(Math.pow(radius*radiusRate,2) - Math.pow(x,2));
                    }
                    if(Math.abs(x-xold)>0.5&&Math.abs(y-yold)>0.5){
                        dashLineGroup.visible = true;
                        lineColor='#0000ff';
                    }else{
                        dashLineGroup.visible = false;
                        lineColor='#000000';
                    }
                   objPoint.position.x = x;
                    objPoint.position.y = y;
                    selectobj.material.color.set(lineColor);
                    selectobj.parent.children[0].material.color.set(lineColor);
                    nowAngle = Math.atan(y/x);
                    lineGroup.rotation.z = nowAngle;
                    lineGroup.children[0].material.color.set(lineColor);
                    lineGroup.children[1].material.color.set(lineColor);

                    createLineAB();

                }
            }
        }
    },
    onDocumentTouchEnd:function(){
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;
        oldAngle = nowAngle;
    }
};


function init() {
    container = document.getElementById('main');

    camera = new THREE.PerspectiveCamera( 45, width / height, 1, 2000 );
    camera.position.z = 1000;

    // scene
    scene = new THREE.Scene();

    //判断是否支持webGL
    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();


    renderer = null;
    // if(canWebgl){
    //     renderer = new THREE.WebGLRenderer({antialias:true});
    // }else{
        renderer = new THREE.CanvasRenderer({antialias:true});
    // }
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );
    renderer.setClearColor(0xffffff);
    container.appendChild( renderer.domElement );


    //鼠标点击，选中顶点
    renderer.domElement.addEventListener( 'mousedown', moveEvents.onDocumentMouseDown, false );
    renderer.domElement.addEventListener( 'mouseup', moveEvents.onDocumentMouseUp, false );
    renderer.domElement.addEventListener( 'mousemove', moveEvents.onDocumentMouseMove, false );
    renderer.domElement.addEventListener( 'touchstart', moveEvents.onDocumentTouchStart, false );
    renderer.domElement.addEventListener( 'touchmove', moveEvents.onDocumentTouchMove, false );
    renderer.domElement.addEventListener( 'touchend', moveEvents.onDocumentTouchEnd, false );

    //控制
    controls = new THREE.OrbitControls(camera, renderer.domElement );
    controls.enableRotate = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    //创建对象
    createBase();
}
function animate() {
    requestAnimationFrame( animate );
    render();
}
function render() {
    controls.update();
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}

init();
animate();

function reset(){
    camera.position.set(0,0,250);
    if( $('.playPart ').hasClass('hide')){

        $('#title p span').removeClass('active');
    }else{
        var activeDiv = $('#title p span.active');
        if(activeDiv.length > 0){
            $('.playPart ').addClass('hide');
            $('#main canvas').removeClass('hide');
            $('video').prop('src', '');
        }
    }
}
if(isMob){
    $('#reset img').on('touchstart',reset);
}else{
    $('#reset img').on('click',reset);
}