//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});

var height=window.innerHeight-120,width = window.innerWidth,videoRate = 16/9,videoWidth,videoHeight,$video = $('#main video');
var rate = height/width;
$('#main').height(height);

if(width/height >videoRate){
    videoHeight = height;
    videoWidth = videoHeight * videoRate;
    $video.css({'top':0,'left':(width-videoWidth)/2});
}else{
    videoWidth = width;
    videoHeight = videoWidth/videoRate;
    $video.css({'left':0,'top':(height-videoHeight)/2});
}
$video.width(videoWidth).height(videoHeight);


window.onresize=function(){
    height= window.innerHeight-120;
    width = window.innerWidth;
    $('#main').height(height);

    if(height/width > rate){
        height = width*rate;
        $('#main canvas').width(width).height(height);
    }else{
        width = height/rate;
        $('#main canvas').width(width).height(height);
    }
    $('#main canvas').css('margin-left',(window.innerWidth - width)/2);

    var height1= window.innerHeight-120;
    var width1 = window.innerWidth;
    if(width1/height1 >videoRate){
        videoHeight = height1;
        videoWidth = videoHeight * videoRate;
        $video.css({'top':0,'left':(width1-videoWidth)/2});
    }else{
        videoWidth = width1;
        videoHeight = videoWidth/videoRate;
        $video.css({'left':0,'top':(height1-videoHeight)/2});
    }
    $video.width(videoWidth).height(videoHeight);
};

var isMob = /iPad|Android/g.test(navigator.userAgent),all=true;
var colors=['#c6c7fd','#fdc5c7','#fa5960','#c6c6c6','#92c7c6'];
var model = {
    'all':[{'dir':'D','objName':'Dx-y','x':0},{'dir':'D','objName':'Dz','x':0},{'dir':'D','objName':'Dxy','x':0},{'dir':'D','objName':'Dxz','x':0},{'dir':'D','objName':'Dyz','x':0}],
    'P':[{'dir':'P','objName':'Px','x':-100},{'dir':'P','objName':'Py','x':0,'rz':Math.PI/2},{'dir':'P','objName':'Pz','x':100,'ry':Math.PI/2}],
    'D':[{'dir':'D','objName':'Dx-y','x':-100},{'dir':'D','objName':'Dz','x':-50},{'dir':'D','objName':'Dyz','x':0},{'dir':'D','objName':'Dxz','x':50},{'dir':'D','objName':'Dxy','x':100}],
    'Px':null,
    'Py':null,
    'Pz':null,
    'Dx-y':null,
    'Dxy':null,
    'Dxz':null,
    'Dyz':null,
    'Dz':null
};
var container,camera, scene, renderer,controls;
var currentObj = [];
var offsetTop = $('#main').offset().top,offsetLeft = $('#main').offset().left,
    threeHeight = $('#main').height(), threeWidth = $('#main').width();
var raycaster = new THREE.Raycaster(),
    plane = new THREE.Plane(),
    offset = new THREE.Vector3(),
    intersection = new THREE.Vector3(),
    mouse = new THREE.Vector2(),
    INTERSECTED = null;
var selectobj,selectobjs=[],selectObjs=[],mousedownflag=false,oldPositionX,merge;
var clickTime;

// model导入
var onProgress = function ( xhr ) {
    if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
};
var onError = function ( xhr ) { console.log('加载出错') };
var mtlLoader = new THREE.MTLLoader();

var importModel = function(obj){
    var dir,objName;
    if (currentObj.length){
        for(var i=0;i<currentObj.length;i++){
            scene.remove(currentObj[i]);
        }
        currentObj = [];
        selectobjs =[];
        selectObjs=[];
    }

    if(obj == 'S'){
        var sphereG =  new THREE.SphereGeometry(12,36,36);
        var sphereM = new THREE.MeshPhongMaterial({color:colors[0],overdraw:true});
        var sphere = new THREE.Mesh(sphereG,sphereM);
        sphere.name = 'S';
        sphere.parentName = 'S';
        scene.add(sphere);
        currentObj.push(sphere);
        selectObjs.push(sphere);
        merge = true;
        controls.enableRotate =true;
        return;
    }
    if(obj instanceof Array){
        var len = obj.length;
        if(all){
            controls.enableRotate =true;
        }else{
            controls.enableRotate =false;
        }

        merge = false;
        for(var j=0;j<len;j++){
            dir = obj[j]['dir'];
            objName = obj[j]['objName'];
            mtlLoader.setPath( dir+'/' );
            mtlLoader.load( objName+'.mtl', (function( objName ) {
                return function(materials){
                    materials.preload();
                    var objLoader = new THREE.OBJLoader();
                    objLoader.setMaterials( materials );
                    objLoader.setPath( dir +'/' );
                    objLoader.load( objName +'.obj', (
                        function ( objName ) {
                            return function(object){
                                currentObj.push(object);
                                var nowLen = currentObj.length - 1,j;
                                for(var i=0;i<model[dir].length;i++){
                                    if(model[dir][i]['objName'] == objName){
                                        nowLen = i;
                                        break;
                                    }
                                }
                                var children = object.children;
                                if(!(objName == model['D'][2]['objName'] || objName == model['P'][1]['objName'])){
                                    for(i=0;i<children.length;i++){
                                        children[i].parentName = objName;
                                        if(!all){
                                            selectobjs.push(children[i]);
                                            selectObjs.push(children[i]);
                                        }
                                        var m = new THREE.MeshPhongMaterial({color:colors[nowLen]});
                                        children[i].material = m;

                                    }
                                }else{
                                    for(i=0;i<children.length;i++){
                                        children[i].parentName = objName;
                                        if(!all){
                                            selectObjs.push(children[i]);
                                        }
                                        var m = new THREE.MeshPhongMaterial({color:colors[nowLen]});
                                        children[i].material = m;
                                    }
                                }
                                if(all){
                                    object.position.x = 0;
                                }else{
                                    object.position.x = model[dir][nowLen]['x'];
                                }
                                object.position.z = 0;
                                if(model[dir][nowLen]['rz']){
                                    object.rotation.z = model[dir][nowLen]['rz'];
                                }
                                if(model[dir][nowLen]['ry']){
                                    object.rotation.y = model[dir][nowLen]['ry'];
                                }
                                scene.add( object );
                                model[objName] = object;
                            }
                        }
                    )(objName), onProgress, onError );
                }
            })(objName));
        }
    }else{
        merge = true;
        controls.enableRotate =true;
        dir = obj['dir'];
        objName = obj['objName'];
        mtlLoader.setPath( dir+'/' );
        mtlLoader.load( objName+'.mtl', function( materials ) {
            materials.preload();
            for(var i in materials.materials){
                materials.materials[i].color.set('#ffff00');
                // materials.materials[i].transparent=true;
                // materials.materials[i].opacity=0.6;
                materials.materials[i].overdraw=true;
            }
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath( objName+'/' );
            objLoader.load( objName+'.obj', function ( object ) {
                var children = object.children;
                for(var j=0;j<children.length;j++){
                    children[j].parentName = objName;
                    selectObjs.push(children[j]);
                }
                object.name = objName;
                currentObj.push(object);
                scene.add( object );
            }, onProgress, onError );
        });
    }
};

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
        // if(merge){
        //     var intersects1 = raycaster.intersectObjects(selectObjs);
        //     if(intersects1.length>0){
        //         if(!clickTime){
        //             clickTime = new Date().getTime()
        //         }else{
        //             if((new Date().getTime() - clickTime) < 300){
        //                 var parentName = intersects1[0].object.parentName;
        //                 var path = parentName.substr(0,1);
        //                 $('.playPart ').removeClass('hide');
        //                 $('video').prop('src', './video/'+path+'.mp4').attr('autoplay',true);
        //             }else{
        //                 clickTime = new Date().getTime();
        //             }
        //         }
        //     }else{}
        // }else{
            var intersects = raycaster.intersectObjects(selectobjs);
            if (intersects.length > 0) {
                selectobj = intersects[0].object;
                mousedownflag = true;
                oldPositionX = event.clientX;
            }
        // }
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
                var obj = intersection.sub( offset );
                var parentName = selectobj['parentName'],i;
                var nowmodel = model[parentName];

                if(event.clientX > oldPositionX && !merge){
                    if(obj.x > -10 && obj.x < 10){
                        nowmodel.position.x = 0;
                    }else{
                        nowmodel.position.x = obj.x;
                    }
                }else if(event.clientX < oldPositionX && !merge){
                    if(obj.x <10  && obj.x >-10){
                        nowmodel.position.x = 0;
                    }else{
                        nowmodel.position.x = obj.x;
                    }
                }
                var dir = parentName.substring(0,1),needLen = model[dir].length, allZero = true;
                for( i=0;i<needLen;i++){
                    var childmodelName = model[dir][i]['objName'];
                    var childmodel = model[childmodelName];
                    if(childmodel.position.x != 0){
                        allZero = false;
                    }
                }
                if(allZero){
                    merge = dir;
                    controls.enableRotate = true;
                }else{
                    merge = false;
                    controls.enableRotate = false;
                }

                oldPositionX = event.clientX;
            }
        }
    },
    onDocumentMouseUp:function(){
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;
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

            // if(merge){
            //     var intersects1 = raycaster.intersectObjects(selectObjs);
            //     if(intersects1.length>0){
            //         if(!clickTime){
            //             clickTime = new Date().getTime()
            //         }else{
            //             if((new Date().getTime() - clickTime) < 300){
            //                 var parentName = intersects1[0].object.parentName;
            //                 var path = parentName.substr(0,1);
            //                 $('.playPart ').removeClass('hide');
            //                 $('video').prop('src', './video/'+path+'.mp4').attr('autoplay',true);
            //             }else{
            //                 clickTime = new Date().getTime();
            //             }
            //         }
            //     }else{}
            // }else{
                var intersects = raycaster.intersectObjects(selectobjs);
                if (intersects.length > 0) {
                    selectobj = intersects[0].object;

                    mousedownflag = true;
                    oldPositionX = event.touches[0].pageX;
                }
            // }
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
                    var obj = intersection.sub( offset );
                    var parentName = selectobj['parentName'],i;
                    var nowmodel = model[parentName];

                    if(event.touches[0].pageX > oldPositionX && !merge){
                        if(obj.x > -10 && obj.x < 10){
                            nowmodel.position.x = 0;
                        }else{
                            nowmodel.position.x = obj.x;
                        }
                    }else if(event.touches[0].pageX < oldPositionX && !merge){
                        if(obj.x <10  && obj.x >-10){
                            nowmodel.position.x = 0;
                        }else{
                            nowmodel.position.x = obj.x;
                        }
                    }
                    var dir = parentName.substring(0,1),needLen = model[dir].length, allZero = true;;
                    for( i=0;i<needLen;i++){
                        var childmodelName = model[dir][i]['objName'];
                        var childmodel = model[childmodelName];
                        if(childmodel.position.x != 0){
                            allZero = false;
                        }
                    }
                    if(allZero){
                        merge = dir;
                        controls.enableRotate = true;
                    }else{
                        merge = false;
                        controls.enableRotate = false;
                    }

                    oldPositionX = event.touches[0].pageX;
                }
            }
        }
    },
    onDocumentTouchEnd:function(){
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;
    }
}

function init() {
    container = document.getElementById('main');

    camera = new THREE.OrthographicCamera(window.innerWidth/-6,window.innerWidth/6,(window.innerHeight-120)/6,(window.innerHeight-120)/-6,1,2000);
    camera.position.z = 250;

    // scene
    scene = new THREE.Scene();
    //light
    var dirLight1 = new THREE.DirectionalLight(0xffffff, 1);
    dirLight1.position.set(200, 200, 100);
    var dirLight2 = new THREE.DirectionalLight(0xffffff, 1);
    dirLight2.position.set(-200, -200, -100);
    scene.add(dirLight1,dirLight2);

    //判断是否支持webGL
    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();


    renderer = null;
    if(canWebgl){
        renderer = new THREE.WebGLRenderer({antialias:true});
    }else{
        renderer = new THREE.CanvasRenderer({antialias:true});
    }
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
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    importModel(model['all']);
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

function choose(){
    if($(this).hasClass('active')){ return}
    $('#title span').removeClass('active');
    camera.position.set(0,0,250);
    // $('.playPart ').addClass('hide');
    // $('video').prop('src', '');
    all = false;
    if($(this).hasClass('p')){
        importModel(model['P']);
    }else if($(this).hasClass('s')){
        importModel('S');
    }else if($(this).hasClass('d')){
        importModel(model['D']);
    }
    $(this).addClass('active');
}
function reset(){
    camera.position.set(0,0,250);
    camera.zoom=1;
    camera.updateProjectionMatrix();
    // if( $('.playPart ').hasClass('hide')){
    all = true;
    importModel(model['all']);
    $('#title p span').removeClass('active');
    // }else{
    //     var activeDiv = $('#title p span.active');
    //     if(activeDiv.length > 0){
    //         all = false;
    //         // $('.playPart ').addClass('hide');
    //         $('#main canvas').removeClass('hide');
    //         // $('video').prop('src', '');
    //     }
    // }
}
if(isMob){
    $('#title p span').on('touchstart',choose);
    $('#reset img').on('touchstart',reset);
}else{
    $('#title p span').on('click',choose);
    $('#reset img').on('click',reset);
}