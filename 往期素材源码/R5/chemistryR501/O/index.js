//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});
var zoom;
(function () {
    var model={};
    var height=window.innerHeight;
    var width=window.innerWidth;
    var leftT=($('.tishi').width()-20)/2;
    $("#triangle-up").css('left',leftT+'px');
    $('#mengceng').width(width).height(height);
    zoom=1;
    if(height<710){
	    zoom=0.7
	    $('#main2').css('zoom',zoom);
	    $('#mengceng').css('zoom',1/zoom);
	}
	$('#main_left').width(width/zoom-280);
    $('#drag img').animate({'right':'180%','top':'-120%'},1500,function(){
        $('#drag img').css({'right':'55%','top':'50%'}).animate({'right':'180%','top':'-120%'},1500,function () {
            $('.ts').hide();
        });
    });
    var threeW=width/zoom-280;
    var threeH=height/zoom;
    window.onresize=function(){
        height=window.innerHeight;
        width=window.innerWidth;
        if(height<710){
	        zoom=0.7;
	       	$('#main2').css('zoom',zoom);
	        $('#mengceng').css('zoom',1/zoom);
	    }else{
	        zoom=1;
	        $('#main2').css('zoom',zoom);
	        $('#mengceng').css('zoom',1);
	    }
	    $('#main_left').width(width/zoom-280);
	    if(width<580) return;
        var cW=$('canvas').width();
        var cH=$('canvas').height();
        $('#show canvas,#mark').css({'left':($('#show').width()-cW)/2+'px','top':($('#show').height()-cH)/2+'px'});
        $('#mark').width($('canvas').width()).height($('canvas').height());
        $('#mark1').css({'left':cW/2+128+'px','top':cH/2+120+'px'});
        $('#mark2').css({'left':cW/2+232+'px','top':cH/2-152+'px'});
        $('#mark3').css({'left':cW/2+230+'px','top':cH/2-90+'px'});
        $('#mark4').css({'left':cW/2+167+'px','top':cH/2-218+'px'});
        $('#mark5').css({'left':cW/2+80+'px','top':cH/2+215+'px'});
    }
    window.onresize();
    var isMob = /iPad|Android/g.test(navigator.userAgent);

    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();
    var container , camera , renderer , scene ,scene2, controls;
    init();
    animate();
	//初始化three场景
    function init() {
        container = $('#show')[0];
        camera = new THREE.OrthographicCamera(threeW/-1,threeW/1,threeH/1,threeH/-1,1,2000);
        camera.position.set(300,300,750);

        // scene
        scene = new THREE.Scene();
        scene2 = new THREE.Scene();
        //light
        var dirLight1 = new THREE.DirectionalLight(0xf0f0f0, 1);
        dirLight1.position.set(600, 600, 300);
        var dirLight2 = new THREE.DirectionalLight(0xf0f0f0, 1);
        dirLight2.position.set(-600, -600, -300);
        scene.add(dirLight1,dirLight2);

        //判断是否支持webGL
        renderer = null;
        if(canWebgl){
            renderer = new THREE.WebGLRenderer({antialias:true});
        }else{
            renderer = new THREE.CanvasRenderer({antialias:true});
        }
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( threeW,threeH );
        renderer.setClearColor(0xffffff);
        renderer.autoClear = false;
        container.appendChild( renderer.domElement );

        //控制
        controls = new THREE.OrbitControls(camera, renderer.domElement );
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = false;
    }
    function animate() {
        requestAnimationFrame( animate );
        render();
    }
    function render() {
        controls.update();
        camera.lookAt( scene.position );
        renderer.clear();
        renderer.render( scene, camera );
        renderer.render( scene2, camera );
    }

    // 模型导入
    function modelPut(obj,color,type) {
        var onProgress = function ( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round(percentComplete, 2) + '% downloaded' );
            }
        };
        var onError = function ( xhr ) { };
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath( '../obj/' );
        var mtlB;
        if(type=='he'){
            mtlB='o.mtl';
        }else{
            mtlB='bs.mtl';
        }
        mtlLoader.load( mtlB, function( materials ) {
            materials.preload();
            if(type!='he'){
                for(i in materials.materials){
                    var material;
                    if(type.length==2||type=='bPz'){
                        material=new THREE.MeshPhongMaterial({color:color,transparent:true,opacity:0.5,side:THREE.BackSide,depthTest:false});
                    }else{
                        material=new THREE.MeshPhongMaterial({color:color,transparent:true,opacity:0.5,side:THREE.DoubleSide,depthTest:false});
                    }
                    materials.materials[i]=material;
                }
            }
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.setPath( '../obj/' );
            objLoader.load( obj, function ( object ) {
                if(type=='he'){
                    object.scale.x=15;
                    object.scale.y=15;
                    object.scale.z=15;
                    scene.add( object );
                }else{
                    object.scale.x=15;
                    object.scale.y=15;
                    object.scale.z=15;
                    if(type=='Py'){
                        object.rotation.y=Math.PI/2;
                    }else if(type=='Pz'){
                        object.rotation.z=Math.PI/2;
                    }else if(type=='bPy'){
                        object.rotation.y=Math.PI/2;
                    }else if(type=='bPz'){
                        object.rotation.z=Math.PI/2;
                    }else if(type=='s1'){
                        object.scale.x=6;
                        object.scale.y=6;
                        object.scale.z=6;
                    }else if(type=='s2'){
                        object.scale.x=10.05;
                        object.scale.y=10.05;
                        object.scale.z=10.05;
                    }else if(type=='bs1'){
                        object.scale.x=16.5;
                        object.scale.y=16.5;
                        object.scale.z=16.5;
                    }else if(type=='bs2'){
                        object.scale.x=26.6;
                        object.scale.y=26.6;
                        object.scale.z=26.6;
                    }
                }
                model[type]=object;
            }, onProgress, onError );
        });
    }

    // 创建球与半球
    function SphereG(r,color) {
        var bulbGeometry = new THREE.SphereGeometry( r,18,9 );
        var bulbMat = new THREE.MeshPhongMaterial( {
            emissive: color,
            color: color
        });
        var mesh=new THREE.Mesh( bulbGeometry, bulbMat );
        return mesh;
    }

    // 创建标示线与标示字
    function createBiaoz(vertices,texts,x,y,z,type) {
        var group=new THREE.Group();
        var geometryLine = new THREE.Geometry();
        geometryLine.vertices = vertices;
        var lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: '#1081ef',transparent:true,opacity:0.6}));
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: ' 36px "Cambria Math"', fillStyle: '#1081ef', antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.position.set(x,y,z);
        group.add(lineMesh,text);
        group.visible=false;
        model[type]=group;
    }

    function vec3(x,y,z){
        return new THREE.Vector3(x, y, z);
    }

    // 镜头复位动画
    var Sa;
    function rotate(callback){
        clearInterval(Sa);
        var position = camera.position;
        var x = 300 - position.x,
            y = 300 - position.y,
            z = 750 - position.z;
        if(Math.abs(x)<1 && Math.abs(y)<1 && Math.abs(z)<1){
            callback && callback();
            return false;
        }
        var n = 20, v1 = x/n, v2 = y/n, v3 = z/n;
        Sa = setInterval(function(){
            n--;
            if(n<0){
                clearInterval(Sa);
                callback && callback();
                return false;
            }
            position = camera.position;
            camera.position.set(position.x+v1,position.y+v2,position.z+v3);
        },20);
    }

    //电子随机位置生成
    function position1() {
        var x=Math.random()*75*(Math.random()*2>1?1:-1);
        var y=Math.random()*75*(Math.random()*2>1?1:-1);
        var z=Math.random()*75*(Math.random()*2>1?1:-1);
        var p=[x,y,z];
        return p;
    }
    function position2() {
        var x=Math.random()*180*(Math.random()*2>1?1:-1);
        var y=Math.random()*180*(Math.random()*2>1?1:-1);
        var z=Math.random()*180*(Math.random()*2>1?1:-1);
        var p=[x,y,z];
        return p;
    }
    function position3() {
        var x=Math.random()*360*(Math.random()*2>1?1:-1);
        var y=Math.random()*90*(Math.random()*2>1?1:-1);
        var z=Math.random()*90*(Math.random()*2>1?1:-1);
        var p=[x,y,z];
        return p;
    }
    function position4() {
        var x=Math.random()*75*(Math.random()*2>1?1:-1);
        var y=Math.random()*75*(Math.random()*2>1?1:-1);
        var z=Math.random()*330*(Math.random()*2>1?1:-1);
        var p=[x,y,z];
        return p;
    }
    function position5() {
        var x=Math.random()*75*(Math.random()*2>1?1:-1);
        var y=Math.random()*330*(Math.random()*2>1?1:-1);
        var z=Math.random()*75*(Math.random()*2>1?1:-1);
        var p=[x,y,z];
        return p;
    }
    modelPut('o.obj','#92c7c6','he');
    //导入／建立模型到模型池
    modelPut('Px.obj','#c6c7fd','Px');
    modelPut('Px.obj','#74f0fd','Py');
    modelPut('Px.obj','#fae28b','Pz');
    modelPut('bPx.obj','#c6c7fd','bPx');
    modelPut('bPx.obj','#74f0fd','bPy');
    modelPut('bPz.obj','#fae28b','bPz');
    modelPut('q.obj','#9b9b9b','s1');
    modelPut('q.obj','#92c7c6','s2');
    modelPut('s.obj','#9b9b9b','bs1');
    modelPut('s.obj','#92c7c6','bs2');
    model['1sd1']=SphereG(4,'#41ff00');
    model['1sd2']=SphereG(4,'#fff42f');
    model['2sd1']=SphereG(4,'#41ff00');
    model['2sd2']=SphereG(4,'#fff42f');
    model['Pxd1']=SphereG(4,'#41ff00');
    model['Pxd2']=SphereG(4,'#fff42f');
    model['Pyd1']=SphereG(4,'#41ff00');
    model['Pyd2']=SphereG(4,'#fff42f');
    model['Pzd1']=SphereG(4,'#41ff00');
    model['Pzd2']=SphereG(4,'#fff42f');
    var SetI=setInterval(function () {
        if(mk1num+mk2num+mk3num+mk4num+mk5num==0) return;
        var P;
        P=position1();
        model['1sd1'].position.set(P[0],P[1],P[2]);
        P=position1();
        model['1sd2'].position.set(P[0],P[1],P[2]);
        P=position2();
        model['2sd1'].position.set(P[0],P[1],P[2]);
        P=position2();
        model['2sd2'].position.set(P[0],P[1],P[2]);
        P=position3();
        model['Pxd1'].position.set(P[0],P[1],P[2]);
        P=position3();
        model['Pxd2'].position.set(P[0],P[1],P[2]);
        P=position4();
        model['Pyd1'].position.set(P[0],P[1],P[2]);
        P=position4();
        model['Pyd2'].position.set(P[0],P[1],P[2]);
        P=position5();
        model['Pzd1'].position.set(P[0],P[1],P[2]);
        P=position5();
        model['Pzd2'].position.set(P[0],P[1],P[2]);
    },100);

    //创建标示到模型池
    var vertices=[];
    vertices.push(vec3(300,0,0),vec3(420,165,0));
    createBiaoz(vertices,'2Px',450,215,0,'2Px');
    vertices=[];
    vertices.push(vec3(0,-360,0),vec3(90,-480,0));
    createBiaoz(vertices,'2Pz',126,-484,0,'2Pz');
    vertices=[];
    vertices.push(vec3(0,0,-390),vec3(90,240,-450));
    createBiaoz(vertices,'2Py',135,290,-450,'2Py');
    vertices=[];
    vertices.push(vec3(90,0,90),vec3(330,-135,300));
    createBiaoz(vertices,'1S',360,-145,300,'1S');
    vertices=[];
    vertices.push(vec3(120,0,-120),vec3(300,195,-300));
    createBiaoz(vertices,'2S',330,215,-330,'2S');

    // 选择／取消选择轨道模型
    var stepF=false,step1=false,step2=false,step3=false,step4=false,step5=false;
    function step(){
        if($(this).children('span').css('background-image')=='none'){
            $(this).children('span').css('background-image','url(../image/choose.png)');
            stepF=true;
        }else{
            $(this).children('span').css('background-image','none');
            stepF=false;
        }
        var index=$(this).index();
        switch (index){
            case 1:
                if(stepF){
                    if(play2F){
                        scene.add(model['s1']);
                    }else{
                        scene.add(model['bs1']);
                    }
                    scene.add(model['1S']);
                    step1=true;
                    $('#mark1').show();
                }else{
                    scene.remove(model['s1'],model['1S'],model['bs1']);
                    scene2.remove(model['1sd1'],model['1sd2'],model['2sd1'],model['2sd2'],model['Pxd1'],model['Pxd2'],model['Pyd1'],model['Pyd2'],model['Pzd1'],model['Pzd2']);
                    $('#mark1').hide();
                    Pt='';
                    mk1d1=false,mk1d2=false,mk2d1=false,mk2d2=false,mk3d1=false,mk3d2=false,mk4d1=false,mk4d2=false,mk5d1=false,mk5d2=false,step1=false;
                    mk1num=0,mk2num=0,mk3num=0,mk4num=0,mk5num=0;
                    $('#fenbu span').hide();
                }
                break;
            case 2:
                if(stepF){
                    if(play2F){
                        scene.add(model['s2']);
                    }else{
                        scene.add(model['bs2']);
                    }
                    step2=true;
                    scene.add(model['2S']);
                    $('#mark2').show();
                }else{
                    scene.remove(model['s2'],model['2S'],model['bs2']);
                    scene2.remove(model['2sd1'],model['2sd2'],model['Pxd1'],model['Pxd2'],model['Pyd1'],model['Pyd2'],model['Pzd1'],model['Pzd2']);
                    $('#mark2').hide();
                    Pt='';
                    mk2d1=false,mk2d2=false,mk3d1=false,mk3d2=false,mk4d1=false,mk4d2=false,mk5d1=false,mk5d2=false,step2=false;
                    mk2num=0,mk3num=0,mk4num=0,mk5num=0;
                    $('#fenbu span').hide();
                    if(mk1num!=0){
                        $('#fenbu .fb1').show();
                    }
                }
                break;
            case 4:
                if(stepF){
                    if(play2F){
                        scene.add(model['Px']);
                    }else{
                        scene.add(model['bPx']);
                    }
                    step3=true;
                    scene.add(model['2Px']);
                    $('#mark3').show();
                }else{
                    scene.remove(model['Px'],model['2Px'],model['bPx']);
                    scene2.remove(model['Pxd1'],model['Pxd2']);
                    $('#mark3').hide();
                    mk3d1=false,mk3d2=false,step3=false;
                    mk3num=0;
                    if(mk3num+mk4num+mk5num!=0){
                        $('#fenbu .fb3').show().children('sup').html(mk3num+mk4num+mk5num);
                    }else{
                        $('#fenbu .fb3').hide();
                    }
                }
                break;
            case 5:
                if(stepF){
                    if(play2F){
                        scene.add(model['Py']);
                    }else{
                        scene.add(model['bPy']);
                    }
                    step4=true;
                    scene.add(model['2Py']);
                    $('#mark4').show();
                }else{
                    scene.remove(model['Py'],model['2Py'],model['bPy']);
                    scene2.remove(model['Pyd1'],model['Pyd2']);
                    $('#mark4').hide();
                    mk4d1=false,mk4d2=false,step4=false;
                    mk4num=0;
                    if(mk3num+mk4num+mk5num!=0){
                        $('#fenbu .fb3').show().children('sup').html(mk3num+mk4num+mk5num);
                    }else{
                        $('#fenbu .fb3').hide();
                    }
                    if(mk4num+mk5num==0){
                        Pt='';
                    }
                }
                break;
            case 6:
                if(stepF){
                    if(play2F){
                        scene.add(model['Pz']);
                    }else{
                        scene.add(model['bPz']);
                    }
                    step5=true;
                    scene.add(model['2Pz']);
                    $('#mark5').show();
                }else{
                    scene.remove(model['Pz'],model['2Pz'],model['bPz']);
                    scene2.remove(model['Pzd1'],model['Pzd2']);
                    $('#mark5').hide();
                    mk5d1=false,mk5d2=false,step5=false;
                    mk5num=0;
                    if(mk3num+mk4num+mk5num!=0){
                        $('#fenbu .fb3').show().children('sup').html(mk3num+mk4num+mk5num);
                    }else{
                        $('#fenbu .fb3').hide();
                    }
                    if(mk4num+mk5num==0){
                        Pt='';
                    }
                }
                break;
        }
    }

    // 播放／暂停／局部／全局
    var play1F=true,play2F=true,checked=false;
    function playing(e){
        if(e.target.tagName=='SPAN') return;
        var index=$(this).index();
        if(index==0){
            if(play1F){
                play1F=false;
                clearInterval(SetI);
                loadImg('../image/play2.png',function(){
                    $('#play .play1').css('background-image','url(../image/play2.png)').children().html('播放');
                    model['1sd1'].position.set(-75,75,0);
                    model['1sd2'].position.set(75,-75,0);
                    model['2sd1'].position.set(-120,120,0);
                    model['2sd2'].position.set(120,-120,0);
                    model['Pxd1'].position.set(-300,0,0);
                    model['Pxd2'].position.set(300,0,0);
                    model['Pyd1'].position.set(0,0,-300);
                    model['Pyd2'].position.set(0,0,300);
                    model['Pzd1'].position.set(0,-300,0);
                    model['Pzd2'].position.set(0,300,0);
                });
            }else{
                play1F=true;
                loadImg('../image/play1.png',function(){
                    $('#play .play1').css('background-image','url(../image/play1.png)').children().html('暂停');
                    SetI=setInterval(function () {
                        var P;
                        P=position1();
                        model['1sd1'].position.set(P[0],P[1],P[2]);
                        P=position1();
                        model['1sd2'].position.set(P[0],P[1],P[2]);
                        P=position2();
                        model['2sd1'].position.set(P[0],P[1],P[2]);
                        P=position2();
                        model['2sd2'].position.set(P[0],P[1],P[2]);
                        P=position3();
                        model['Pxd1'].position.set(P[0],P[1],P[2]);
                        P=position3();
                        model['Pxd2'].position.set(P[0],P[1],P[2]);
                        P=position4();
                        model['Pyd1'].position.set(P[0],P[1],P[2]);
                        P=position4();
                        model['Pyd2'].position.set(P[0],P[1],P[2]);
                        P=position5();
                        model['Pzd1'].position.set(P[0],P[1],P[2]);
                        P=position5();
                        model['Pzd2'].position.set(P[0],P[1],P[2]);
                    },100);
                });
            }
        }else{
            if(play2F){
                play2F=false;
                loadImg('../image/play4.png',function(){
                    $('#play .play2').css('background-image','url(../image/play4.png)').children().html('全局');
                    if(step1){
                        scene.add(model['bs1']);
                        scene.remove(model['s1']);
                    }
                    if(step2){
                        scene.add(model['bs2']);
                        scene.remove(model['s2']);
                    }
                    if(step3){
                        scene.add(model['bPx']);
                        scene.remove(model['Px']);
                    }
                    if(step4){
                        scene.add(model['bPy']);
                        scene.remove(model['Py']);
                    }
                    if(step5){
                        scene.add(model['bPz']);
                        scene.remove(model['Pz']);
                    }
                });
            }else{
                play2F=true;
                loadImg('../image/play3.png',function(){
                    $('#play .play2').css('background-image','url(../image/play3.png)').children().html('局部');
                    if(step1){
                        scene.add(model['s1']);
                        scene.remove(model['bs1']);
                    }
                    if(step2){
                        scene.add(model['s2']);
                        scene.remove(model['bs2']);
                    }
                    if(step3){
                        scene.add(model['Px']);
                        scene.remove(model['bPx']);
                    }
                    if(step4){
                        scene.add(model['Py']);
                        scene.remove(model['bPy']);
                    }
                    if(step5){
                        scene.add(model['Pz']);
                        scene.remove(model['bPz']);
                    }
                });
            }
        }
    }

    //重置
    function reset(){
        $('#fenbu span').hide();
        checked=false;
        camera.position.set(300,300,750);
        model['1S'].visible=false;
        model['2S'].visible=false;
        model['2Px'].visible=false;
        model['2Py'].visible=false;
        model['2Pz'].visible=false;
        $('#check>span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
        for(var i in model){
            if(i!='he'){
                scene.remove(model[i]);
            }
        }
        for(var i in model){
            if(i!='he'){
                scene2.remove(model[i]);
            }
        }
        $('#step div span').css('background-image','none');
        $('#mark img').hide();
        stepF=false;
        $('#main_left>h3').hide();
        play1F=true;
        play2F=true;
        $('#play .play1').css('background-image','url(../image/play1.png)').children().html('暂停');
        $('#play .play2').css('background-image','url(../image/play3.png)').children().html('局部');
        mk1num=0,mk2num=0,mk3num=0,mk4num=0,mk5num=0;
        step1=false,step2=false,step3=false,step4=false,step5=false;
        mk1d1=false,mk1d2=false,mk2d1=false,mk2d2=false,mk3d1=false,mk3d2=false,mk4d1=false,mk4d2=false,mk5d1=false,mk5d2=false;
        clearInterval(SetI);
        SetI=setInterval(function () {
            if(mk1num+mk2num+mk3num+mk4num+mk5num==0) return;
            var P;
            P=position1();
            model['1sd1'].position.set(P[0],P[1],P[2]);
            P=position1();
            model['1sd2'].position.set(P[0],P[1],P[2]);
            P=position2();
            model['2sd1'].position.set(P[0],P[1],P[2]);
            P=position2();
            model['2sd2'].position.set(P[0],P[1],P[2]);
            P=position3();
            model['Pxd1'].position.set(P[0],P[1],P[2]);
            P=position3();
            model['Pxd2'].position.set(P[0],P[1],P[2]);
            P=position4();
            model['Pyd1'].position.set(P[0],P[1],P[2]);
            P=position4();
            model['Pyd2'].position.set(P[0],P[1],P[2]);
            P=position5();
            model['Pzd1'].position.set(P[0],P[1],P[2]);
            P=position5();
            model['Pzd2'].position.set(P[0],P[1],P[2]);
        },100);
    }
    //图片预加载
    function loadImg(src,callback){
        var img=new Image();
        img.src=src;
        img.onload=function(){
            callback && callback();
        }
    }
    // 开启关闭标示
    function check(){
        if(checked){
            $(this).children('span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
            $('#main_left>h3').hide();
            checked=false;
            model['1S'].visible=false;
            model['2S'].visible=false;
            model['2Px'].visible=false;
            model['2Py'].visible=false;
            model['2Pz'].visible=false;
        }else{
            $(this).children('span').css('background','#5CAEFD').children().css({'right':'2px','left':'auto'});
            $('#main_left>h3').show();
            checked=true;
            model['1S'].visible=true;
            model['2S'].visible=true;
            model['2Px'].visible=true;
            model['2Py'].visible=true;
            model['2Pz'].visible=true;
        }
    }

    // 拖拽电子
    $( ".draggable" ).draggable({
        revert: true,
        helper:"clone",
        start:function () {
            // rotate(function () {
            camera.position.set(300,300,750);
            $("#mark").show();
            model['1S'].visible=true;
            model['2S'].visible=true;
            model['2Px'].visible=true;
            model['2Py'].visible=true;
            model['2Pz'].visible=true;
            // })
        },
        stop:function () {
            $("#mark").hide();
            if(checked) return;
            model['1S'].visible=false;
            model['2S'].visible=false;
            model['2Px'].visible=false;
            model['2Py'].visible=false;
            model['2Pz'].visible=false;
        }
    });
    var Pt='',mk1num=0,mk2num=0,mk3num=0,mk4num=0,mk5num=0,mk1d1=false,mk1d2=false,mk2d1=false,mk2d2=false,mk3d1=false,mk3d2=false,mk4d1=false,mk4d2=false,mk5d1=false,mk5d2=false;
    $( "#mark img" ).droppable({
        accept: '.draggable',
        drop: function(event,ui) {
            var d=ui.draggable[0].id;
            var id=event.target.id;
            switch (id){
                case 'mark1':
                    if((mk1d1&&d=='d1')||(mk1d2&&d=='d2')){
                        return;
                    }
                    if(d=='d1'){
                        mk1d1=true;
                    }else{
                        mk1d2=true;
                    }
                    $('.ui-draggable-dragging').hide();
                    scene2.add(model['1s'+d]);
                    mk1num++;
                    $('#fenbu .fb1').show().children('sup').html(mk1num);
                    break;
                case 'mark2':
                    if((mk2d1&&d=='d1')||(mk2d2&&d=='d2')||mk1num<2){
                        return;
                    }
                    if(d=='d1'){
                        mk2d1=true;
                    }else{
                        mk2d2=true;
                    }
                    $('.ui-draggable-dragging').hide();
                    scene2.add(model['2s'+d]);
                    mk2num++;
                    $('#fenbu .fb2').show().children('sup').html(mk2num);
                    break;
                case 'mark3':
                    if(mk1num<2||mk2num<2||((mk4num==0 || mk5num==0) && mk3num>0)||mk3num+mk4num+mk5num==4){
                        return;
                    }
                    if(mk3num+mk4num+mk5num==3&&Pt==d){
                        return;
                    }
                    if(Pt==''){
                        Pt=d;
                    }else if(Pt!=''&&Pt!=d&&mk3num==0){
                        return;
                    }
                    if(d=='d1'){
                        mk3d1=true;
                    }else{
                        mk3d2=true;
                    }
                    $('.ui-draggable-dragging').hide();
                    scene2.add(model['Px'+d]);
                    mk3num++;
                    $('#fenbu .fb3').show().children('sup').html(mk3num+mk4num+mk5num);
                    break;
                case 'mark4':
                    if(mk1num<2||mk2num<2||((mk3num==0 || mk5num==0) && mk4num>0)||mk3num+mk4num+mk5num==4){
                        return;
                    }
                    if(mk3num+mk4num+mk5num==3&&Pt==d){
                        return;
                    }
                    if(Pt==''){
                        Pt=d;
                    }else if(Pt!=''&&Pt!=d&&mk4num==0){
                        return;
                    }
                    if(d=='d1'){
                        mk4d1=true;
                    }else{
                        mk4d2=true;
                    }
                    $('.ui-draggable-dragging').hide();
                    scene2.add(model['Py'+d]);
                    mk4num++;
                    $('#fenbu .fb3').show().children('sup').html(mk3num+mk4num+mk5num);
                    break;
                case 'mark5':
                    if(mk1num<2||mk2num<2||((mk4num==0 || mk3num==0) && mk5num>0)||mk3num+mk4num+mk5num==4){
                        return;
                    }
                    if(mk3num+mk4num+mk5num==3&&Pt==d){
                        return;
                    }
                    if(Pt==''){
                        Pt=d;
                    }else if(Pt!=''&&Pt!=d&&mk5num==0){
                        return;
                    }
                    if(d=='d1'){
                        mk5d1=true;
                    }else{
                        mk5d2=true;
                    }
                    $('.ui-draggable-dragging').hide();
                    scene2.add(model['Pz'+d]);
                    mk5num++;
                    $('#fenbu .fb3').show().children('sup').html(mk3num+mk4num+mk5num);
                    break;
            }
        }
    });
    function hideM(){
        $('.ts').hide();
    }
    function back() {
        window.location.href='../index.html';
    }
    if(isMob){
        $('#reset img').on('touchstart',reset);
        $('#back img').on('touchstart',back);
        $('#step>div').on('touchstart',step);
        $('#play div').on('touchstart',playing);
        $('#check').on('touchstart',check);
        $('#mengceng').on('touchstart',hideM);
    }else{
        $('#reset img').on('click',reset);
        $('#back img').on('click',back);
        $('#step>div').on('click',step);
        $('#play div').on('click',playing);
        $('#check').on('click',check);
        $('#mengceng').on('mousedown',hideM);
    }
})();