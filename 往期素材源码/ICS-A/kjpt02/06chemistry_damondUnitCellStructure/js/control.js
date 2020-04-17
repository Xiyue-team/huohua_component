$(function(){
    $('.control-container').height($(window).height());
    $('.three').height($(window).height());
    $(".other-select").css("margin-top",$(window).height()/4);

});

var widthT = $("#WebGL-output-big").width();
var heightT = $(window).height();
var width = $("#WebGL-output-big").width();

var canWebgl = ( function () {
    try {
        var canvas = document.createElement( 'canvas' );
        return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
    } catch ( e ) {
        return false;
    }
} )();

var getParameter = {
    clear:5,
    angleJson:[],
    sides:4
};
var oriParameter = {
    clear:5
};
var aT=null;

var vertexs = false, faces = false, insides = false,show = false;
var dynamic = true;
var a = null;

//鼠标事件变量
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var offset = new THREE.Vector3();


var unitCell = {
    spheres:[],
    sticks:[],
    texts:[],
    init:function(){
        //var axis = new THREE.AxisHelper(500);
        //scene.add(axis);
        unitCell.getJson(200,4);
        unitCell.stick();
        unitCell.sphere();
        unitCell.createText();
        setTimeout(unitCell.dynamical,800);
    },
    getJson:function(l,n){
        var x,y;
        var h = l/Math.sin(Math.PI/180*45);
        for(var i=0;i<n;i++){
            x = Math.round(l * Math.sin((2*Math.PI/n)*i));
            y = Math.round(l * Math.cos((2*Math.PI/n)*i));
            getParameter.angleJson.push([x,0,y]);
        }
        for(i=0;i<n;i++){
            x = Math.round(l * Math.sin((2*Math.PI/n)*i));
            y = Math.round(l * Math.cos((2*Math.PI/n)*i));
            getParameter.angleJson.push([x,h,y]);
        }
    },
    vec3:function(x,y,z){
        return new THREE.Vector3(x,y,z);
    },
    createSphere:function(r,color){
        if(canWebgl){
            var material = new THREE.MeshPhongMaterial({color:color, transparent:true, opacity:1, side:THREE.DoubleSide});
        }else{
            material = new THREE.MeshBasicMaterial({color:color, transparent:true, opacity:1, side:THREE.DoubleSide});
        }

        var sphGeo = new THREE.SphereGeometry(r,32,32);
        var mesh = new THREE.Mesh(sphGeo,material);
        mesh.rotation = camera.rotation;
        scene.add(mesh);
        return mesh;
    },
    createStick:function(r,l,color){
        var material = new THREE.MeshBasicMaterial({color:color, transparent:true, opacity:1, side:THREE.DoubleSide});
        var cylGeo = new THREE.CylinderGeometry(r,r,l,4,4);
        var mesh = new THREE.Mesh(cylGeo,material);
        scene.add(mesh);
        return mesh;
    },
    addLight:function(){
        // add subtle ambient lighting
        var ambientLight = new THREE.AmbientLight(0x0c0c0c);
        scene.add(ambientLight);

        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(6000, 10000, 6000);
        spotLight.castShadow = true;
        scene.add(spotLight);

        var spotLight1 = new THREE.SpotLight(0xffffff);
        spotLight1.position.set(-6000, -10000, -6000);
        spotLight1.castShadow = true;
        scene.add(spotLight1);
    },

    stick:function(){
        var json = getParameter.angleJson;
        var x = json[0][2]/2;
        var h = json[0][2]/Math.sin(Math.PI/180*45);
        var h1 = h/356*154;
        for(var i=0;i<12;i++){
            var stick = unitCell.createStick(2,h,0x838383);
            stick.name = i;
            unitCell.sticks.push(stick);
        }
        //下底面
        unitCell.sticks[0].rotation.set(Math.PI/180*90,0,Math.PI/180*45);
        unitCell.sticks[0].position.set(x,0,x);
        unitCell.sticks[1].rotation.set(Math.PI/180*90,0,-Math.PI/180*45);
        unitCell.sticks[1].position.set(x,0,-x);
        unitCell.sticks[2].rotation.set(Math.PI/180*90,0,Math.PI/180*45);
        unitCell.sticks[2].position.set(-x,0,-x);
        unitCell.sticks[3].rotation.set(Math.PI/180*90,0,-Math.PI/180*45);
        unitCell.sticks[3].position.set(-x,0,x);
        //上底面
        unitCell.sticks[4].rotation.set(Math.PI/180*90,0,Math.PI/180*45);
        unitCell.sticks[4].position.set(x,h,x);
        unitCell.sticks[5].rotation.set(Math.PI/180*90,0,-Math.PI/180*45);
        unitCell.sticks[5].position.set(x,h,-x);
        unitCell.sticks[6].rotation.set(Math.PI/180*90,0,Math.PI/180*45);
        unitCell.sticks[6].position.set(-x,h,-x);
        unitCell.sticks[7].rotation.set(Math.PI/180*90,0,-Math.PI/180*45);
        unitCell.sticks[7].position.set(-x,h,x);
        //侧面
        unitCell.sticks[8].position.set(0,h/2,2*x);
        unitCell.sticks[9].position.set(2*x,h/2,0);
        unitCell.sticks[10].position.set(0,h/2,-2*x);
        unitCell.sticks[11].position.set(-2*x,h/2,0);
        //内部
        for(i=12;i<28;i++){
            stick = unitCell.createStick(2,h1,0x838383);
            stick.name = i;
            unitCell.sticks.push(stick);
        }
        unitCell.sticks[12].rotation.set(0,0,-Math.PI/180*54.74);
        unitCell.sticks[12].position.set(x/2,h/8,0);
        unitCell.sticks[13].rotation.set(0,0,Math.PI/180*54.74);
        unitCell.sticks[13].position.set(x/2*3,h/8,0);

        unitCell.sticks[14].rotation.set(Math.PI/180*54.74,0,0);
        unitCell.sticks[14].position.set(x,h/8*3,x/2);
        unitCell.sticks[15].rotation.set(-Math.PI/180*54.74,0,0);
        unitCell.sticks[15].position.set(x,h/8*3,-x/2);

        unitCell.sticks[16].rotation.set(0,0,Math.PI/180*54.74);
        unitCell.sticks[16].position.set(-x/2,h/8,0);
        unitCell.sticks[17].rotation.set(0,0,-Math.PI/180*54.74);
        unitCell.sticks[17].position.set(-x/2*3,h/8,0);

        unitCell.sticks[18].rotation.set(Math.PI/180*54.74,0,0);
        unitCell.sticks[18].position.set(-x,h/8*3,x/2);
        unitCell.sticks[19].rotation.set(-Math.PI/180*54.74,0,0);
        unitCell.sticks[19].position.set(-x,h/8*3,-x/2);

        unitCell.sticks[20].rotation.set(0,0,-Math.PI/180*54.74);
        unitCell.sticks[20].position.set(-x/2,h/8*5,x);
        unitCell.sticks[21].rotation.set(0,0,Math.PI/180*54.74);
        unitCell.sticks[21].position.set(x/2,h/8*5,x);

        unitCell.sticks[22].rotation.set(Math.PI/180*54.74,0,0);
        unitCell.sticks[22].position.set(0,h/8*7,x/2*3);
        unitCell.sticks[23].rotation.set(-Math.PI/180*54.74,0,0);
        unitCell.sticks[23].position.set(0,h/8*7,x/2);

        unitCell.sticks[24].rotation.set(0,0,-Math.PI/180*54.74);
        unitCell.sticks[24].position.set(-x/2,h/8*5,-x);
        unitCell.sticks[25].rotation.set(0,0,Math.PI/180*54.74);
        unitCell.sticks[25].position.set(x/2,h/8*5,-x);

        unitCell.sticks[26].rotation.set(-Math.PI/180*54.74,0,0);
        unitCell.sticks[26].position.set(0,h/8*7,-x/2*3);
        unitCell.sticks[27].rotation.set(Math.PI/180*54.74,0,0);
        unitCell.sticks[27].position.set(0,h/8*7,-x/2);
    },
    sphere:function(){
        //外部C原子
        for(var i=0;i<14;i++){
            var sph = unitCell.createSphere(20,0x0081e0);
            sph.name = i;
            unitCell.spheres.push(sph);
        }
        //内部C原子
        for(i=14;i<18;i++){
            sph = unitCell.createSphere(20,0x0081e0);
            sph.name = i;
            unitCell.spheres.push(sph);
        }

        var json = getParameter.angleJson;
        var x = json[0][2]/2;
        var h = json[0][2]/Math.sin(Math.PI/180*45);
        for(i=0;i<8;i++){
            unitCell.spheres[i].position.set(json[i][0],json[i][1],json[i][2]);
        }
        unitCell.spheres[8].position.set(x,h/2,x);
        unitCell.spheres[9].position.set(x,h/2,-x);
        unitCell.spheres[10].position.set(-x,h/2,-x);
        unitCell.spheres[11].position.set(-x,h/2,x);
        unitCell.spheres[12].position.set(0,h,0);

        unitCell.spheres[14].position.set(x,h/4,0);
        unitCell.spheres[15].position.set(-x,h/4,0);
        unitCell.spheres[16].position.set(0,h/4*3,-x);
        unitCell.spheres[17].position.set(0,h/4*3,x);

    },
    createText:function(){
        var x = getParameter.angleJson[0][2]/2;
        var h = getParameter.angleJson[0][2]/Math.sin(Math.PI/180*45);

        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '16px Arial', fillStyle: '#000000', antialias: true};

        var text = new SpriteText2D('0.356 nm', textStyle);
        text.position.set(x,20,x);
        unitCell.texts.push(text);
        //scene.add(text);

        text = new SpriteText2D('0.154 nm', textStyle);
        //text.rotation.z = -Math.PI/180*54.74;
        text.position.set(x/2*3,h/8,0);
        unitCell.texts.push(text);
        //scene.add(text);

        text = new SpriteText2D("109°28'", textStyle);
        //text.rotation.z = -Math.PI/180*54.74;
        text.position.set(x,h/4+50,0);
        unitCell.texts.push(text);
        //scene.add(text);
    },
    onMouseHover:function(event){
        if(dynamic){
            return;
        }
        mouse.x = (event.clientX / width ) * 2 - 1;
        mouse.y = -( event.clientY / heightT ) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(unitCell.spheres);
        var intersects1 = raycaster.intersectObjects(unitCell.sticks);
        if (intersects.length > 0 || intersects1.length>0) {
            for(var i=0;i<unitCell.texts.length;i++){
                scene.add(unitCell.texts[i]);
            }
            unitCell.sticks[13].material.color.set(0x333333);
            unitCell.sticks[0].material.color.set(0x14db14);
        }else{
            for(i=0;i<unitCell.texts.length;i++){
                scene.remove(unitCell.texts[i]);
            }
            unitCell.sticks[13].material.color.set(0x838383);
            unitCell.sticks[0].material.color.set(0x838383);
        }
    },
    dynamical:function(){
        dynamic = true;
        var l = camera.position.x/Math.sin(Math.PI/180*45);
        var n = 0;
        clearInterval(aT);
        aT = null;
        function rotate(){
            if(n>359){
                clearInterval(aT);
                dynamic = false;
                return;
            }
            if(canWebgl){
                n++;
            }else{
                n += 3;
            }

            var x = l*Math.cos(Math.PI/180*n + Math.PI/180*45) ;
            var y = camera.position.y;
            var z = l*Math.sin(Math.PI/180*n + Math.PI/180*45) ;
            camera.position.set(x,y,z);
        }
        aT = setInterval(rotate,50);
    },

    createTexts:function(texts,x,y,z,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '20px Arial', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = camera.rotation;
        text.position.set(x,y,z);
        scene.add(text);
        return text;
    },
    //显示键name
    createName2:function(){
        for(var i=0;i<unitCell.sticks.length;i++){
            unitCell.createTexts(unitCell.sticks[i].name, unitCell.sticks[i].position.x, unitCell.sticks[i].position.y+30, unitCell.sticks[i].position.z, '#000000');
        }
    }

};


/**
 *创建场景
 */
var scene = new THREE.Scene();
scene.position.y=-100;
var camera = new THREE.PerspectiveCamera(45, widthT / heightT, 1, 10000);
camera.position.set(800,800,800);
camera.lookAt(new THREE.Vector3(0,0,0));
// scene.add(camera);
var renderer = null;
if(canWebgl){
    renderer = new THREE.WebGLRenderer({antialias:true});
}else{
    renderer = new THREE.CanvasRenderer();
}
renderer.setPixelRatio( window.devicePixelRatio );

renderer.setClearColor(0xeeeeee);
renderer.setSize(widthT,heightT);
$("#WebGL-output-big").append(renderer.domElement);

//鼠标拖动旋转
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

unitCell.init();
if(canWebgl){
    unitCell.addLight();
}


renderer.domElement.addEventListener( 'mousemove', unitCell.onMouseHover, false );


/**
 * 事件函数
 */
//重绘
function renderAll(){
    controls.update();
    if(oriParameter.clear != getParameter.clear){
        camera.position.x = 160*getParameter.clear;
        camera.position.y = 160*getParameter.clear;
        camera.position.z = 160*getParameter.clear;
        oriParameter.clear = getParameter.clear;
    }
    if(dynamic){
        controls.enabled = false;
    }else{
        controls.enabled = true;
    }
    requestAnimationFrame(renderAll);
    renderer.render(scene,camera);
}
renderAll();

//缩放变量控制
function clearEvent(value){
    $('#sides-slider-value4').val('0|'+value);
    $('.xdsoft_range2dslider_runner').css('bottom',value*10);
    getParameter.clear = 10-value;
}

//移动端手势
function hammer(){
    var hammertime = new Hammer(document.getElementById("WebGL-output-big"));
    hammertime.add(new Hammer.Pinch());
    hammertime.on("pinchin pinchout", function(e){
        var result = $('#sides-slider-value4').val();
        var value = parseInt(result.split('|')[1]);

        if(e.type == 'pinchin'){//缩小
            if(value <=1){
                return;
            }
            getParameter.clear = --value;

        }
        if(e.type == 'pinchout'){//增大
            if(value >=9){
                return;
            }
            getParameter.clear = ++value;

        }
        clearEvent(getParameter.clear);
    });
}
hammer();
var isMob=/iPad|Android|Phone/g.test(navigator.userAgent);
var clickT='';
if(isMob){
    clickT='touchstart';
}else{
    clickT='click';
}

/**
 * 点击事件
 */
$('#clear-plus').on(clickT,function(){
    var result = $('#sides-slider-value4').val();
    var value = parseInt(result.split('|')[1]);
    if( value>=10){ return;}
    value++;
    clearEvent(value);
});
$('#clear-sub').on('click',function(){
    var result = $('#sides-slider-value4').val();
    var value = parseInt(result.split('|')[1]);
    if(value <=0 ){ return;}
    value--;
    clearEvent(value);

});

$("#vertex").on(clickT,function(){

    vertexs = !vertexs;
    if(vertexs){
        for(var i=0;i<8;i++){
            unitCell.spheres[i].material.color.set(0xfb3a2f);
        }
        $(this).css("background-color","rgba(106,202,240,0.8)").next("span").css("display","inline");
    }else{
        for(i=0;i<8;i++){
            unitCell.spheres[i].material.color.set(0x0081e0);
        }
        $(this).css("background-color","rgba(106,202,240,0.3)").next("span").css("display","none");
    }

});
$("#face").on(clickT,function(){

    faces = !faces;

    if(faces){
        for(var i=8;i<14;i++){
            unitCell.spheres[i].material.color.set(0xfb3a2f);
        }
        $(this).css("background-color","rgba(106,202,240,0.8)").next("span").css("display","inline");
    }else{
        for(i=8;i<14;i++){
            unitCell.spheres[i].material.color.set(0x0081e0);
        }
        $(this).css("background-color","rgba(106,202,240,0.3)").next("span").css("display","none");
    }

});
$("#inside").on(clickT,function(){

    insides = !insides;

    if(insides){
        for(var i=14;i<18;i++){
            unitCell.spheres[i].material.color.set(0xfb3a2f);
        }
        $(this).css("background-color","rgba(106,202,240,0.8)").next("span").css("display","inline");
    }else{
        for(i=14;i<18;i++){
            unitCell.spheres[i].material.color.set(0x0081e0);
        }
        $(this).css("background-color","rgba(106,202,240,0.3)").next("span").css("display","none");
    }

});

$("#reset").on(clickT,function(){
    camera.position.set(800,800,800);
    unitCell.dynamical();
    vertexs = false; faces = false; insides = false;
    $("#vertex,#face,#inside").css("background-color","rgba(106,202,240,0.3)").next("span").css("display","none");
    for(var i=0;i<18;i++){
        unitCell.spheres[i].material.color.set(0x0081e0);
    }
    clearEvent(5);
    for(i=0;i<unitCell.texts.length;i++){
        scene.remove(unitCell.texts[i]);
    }

});