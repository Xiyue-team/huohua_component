$(function(){
    $('.control-container').height($(window).height());
    $('.three').height($(window).height());
    $(".other-select").css("margin-top",$(window).height()/4);
});

var widthT = $("#WebGL-output-big").width();
var heightT = $(window).height();

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
    ratioR:Math.pow(9/5,1/3),
    ratioL:7/5
};
var oriParameter = {
    clear:5
};

var stickM = true;
var scaleM = false;
var x1 = 90*Math.sin(Math.PI/180*30);
var y1 = 90*Math.cos(Math.PI/180*30);
var x2 = 54*Math.sin(Math.PI/180*30);
var y2 = 54*Math.cos(Math.PI/180*30);


var stickModel = {
    spheres:[],
    sticks:[],
    init:function(){
        stickModel.sphere();
        stickModel.stick();
    },

    createSphere:function(r,color){
        if(canWebgl){
            var material = new THREE.MeshPhongMaterial({color:color, side:THREE.DoubleSide});
        }else{
            material = new THREE.MeshBasicMaterial({color:color, side:THREE.DoubleSide});
        }
        var sphGeo = new THREE.SphereGeometry(r,32,32);
        var mesh = new THREE.Mesh(sphGeo,material);
        //scene.add(mesh);
        return mesh;
    },
    createStick:function(r,l,color){
        var material = new THREE.MeshBasicMaterial({color:color, side:THREE.DoubleSide});
        var cylGeo = new THREE.CylinderGeometry(r,r,l,8,8);
        var mesh = new THREE.Mesh(cylGeo,material);
        //scene.add(mesh);
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

    sphere:function(){
        //C元素
        for(var i=0;i<2;i++){
            var sph = stickModel.createSphere(30,0x0081e0);
            sph.name = i;
            stickModel.spheres.push(sph);
        }
        //H元素
        for(i=2;i<6;i++){
            sph = stickModel.createSphere(30/getParameter.ratioR,0xfb3a2f);
            sph.name = i;
            stickModel.spheres.push(sph);
        }

        //C元素
        stickModel.spheres[0].position.set(53,0,0);
        stickModel.spheres[1].position.set(-53,0,0);
        //H元素
        stickModel.spheres[2].position.set(-53-x1,y1,0);
        stickModel.spheres[3].position.set(-53-x1,-y1,0);

        stickModel.spheres[4].position.set(53+x1,y1,0);
        stickModel.spheres[5].position.set(53+x1,-y1,0);


    },
    stick:function(){
        //C-C
        var stick = stickModel.createStick(5,106,0x838383);
        stick.name = 0;
        stickModel.sticks.push(stick);
        stickModel.sticks[0].rotation.z = Math.PI/2;
        stickModel.sticks[0].position.set(0,12,0);
		
        //C-H
        for(var i=1;i<5;i++){
            stick = stickModel.createStick(5,90,0x838383);
            stick.name = i;
            stickModel.sticks.push(stick);
        }

        stickModel.sticks[1].rotation.set(0,0,Math.PI/180*30);
        stickModel.sticks[1].position.set(-53-x1/2,y1/2,0);
        stickModel.sticks[2].rotation.set(0,0,-Math.PI/180*30);
        stickModel.sticks[2].position.set(-53-x1/2,-y1/2,0);

        stickModel.sticks[3].rotation.set(0,0,-Math.PI/180*30);
        stickModel.sticks[3].position.set(53+x1/2,y1/2,0);
        stickModel.sticks[4].rotation.set(0,0,Math.PI/180*30);
        stickModel.sticks[4].position.set(53+x1/2,-y1/2,0);
		
		//C-C 2th
		stick = stickModel.createStick(5,106,0x838383);
        stick.name = 5;
        stickModel.sticks.push(stick);
        stickModel.sticks[5].rotation.z = Math.PI/2;
        stickModel.sticks[5].position.set(0,-12,0);
		
    }

};

var scaleModel = {
    spheres:[],
    sticks:[],
    init:function(){
        scaleModel.sphere();
        scaleModel.stick();
    },

    sphere:function(){
        //C元素
        for(var i=0;i<2;i++){
            var sph = stickModel.createSphere(45.5,0x0081e0);
            sph.name = i;
            scaleModel.spheres.push(sph);
        }
        //H元素
        for(i=2;i<6;i++){
            sph = stickModel.createSphere(26.5,0xfb3a2f);
            sph.name = i;
            scaleModel.spheres.push(sph);
        }

        //C元素
        scaleModel.spheres[0].position.set(38.5,0,0);
        scaleModel.spheres[1].position.set(-38.5,0,0);
        //H元素
        scaleModel.spheres[2].position.set(-38.5-x2,y2,0);
        scaleModel.spheres[3].position.set(-38.5-x2,-y2,0);

        scaleModel.spheres[4].position.set(38.5+x2,y2,0);
        scaleModel.spheres[5].position.set(38.5+x2,-y2,0);


    },
    stick:function(){
        //C-C
        var stick = stickModel.createStick(5,77,0x838383);
        stick.name = 0;
        scaleModel.sticks.push(stick);
        scaleModel.sticks[0].rotation.z = Math.PI/2;
        //C-H
        for(var i=1;i<5;i++){
            stick = stickModel.createStick(5,54,0x838383);
            stick.name = i;
            scaleModel.sticks.push(stick);
        }

        scaleModel.sticks[1].rotation.set(0,0,Math.PI/180*30);
        scaleModel.sticks[1].position.set(-38.5-x2/2,y2/2,0);
        scaleModel.sticks[2].rotation.set(0,0,-Math.PI/180*30);
        scaleModel.sticks[2].position.set(-38.5-x2/2,-y2/2,0);

        scaleModel.sticks[3].rotation.set(0,0,-Math.PI/180*30);
        scaleModel.sticks[3].position.set(38.5+x2/2,y2/2,0);
        scaleModel.sticks[4].rotation.set(0,0,Math.PI/180*30);
        scaleModel.sticks[4].position.set(38.5+x2/2,-y2/2,0);


    }

};



/**
 *创建场景
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, widthT / heightT, 1, 10000);
camera.position.x = -600;
camera.position.y = 300;
camera.position.z = 600;
camera.lookAt(new THREE.Vector3(0,0,0));
scene.add(camera);
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

stickModel.init();
scaleModel.init();
if(canWebgl){
    stickModel.addLight();
}
for(var i=0;i<8;i++){
    scene.add(stickModel.spheres[i]);
}
for(i=0;i<7;i++){
    scene.add(stickModel.sticks[i]);
}


/**
 * 事件函数
 */
//重绘
function renderAll(){
    controls.update();
    if(oriParameter.clear != getParameter.clear){
        camera.position.x = -120*getParameter.clear;
        camera.position.y = 60*getParameter.clear;
        camera.position.z = 120*getParameter.clear;
        oriParameter.clear = getParameter.clear;
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



/**
 * 点击事件
 */
$('#clear-plus').on('click',function(){
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

$("#stickModel").click(function(){
    if(stickM){
        return;
    }
    for(var i=0;i<8;i++){
        scene.remove(scaleModel.spheres[i]);
        scene.add(stickModel.spheres[i]);
    }
    for(i=0;i<7;i++){
        scene.remove(scaleModel.sticks[i]);
        scene.add(stickModel.sticks[i]);
    }
    stickM = !stickM;
    scaleM = !scaleM;
    $(this).css("border-color","red");
    $("#scaleModel").css("border-color","#7ECAF0");
});
$("#scaleModel").click(function(){
    if(scaleM){
        return;
    }
    for(var i=0;i<8;i++){
        scene.remove(stickModel.spheres[i]);
        scene.add(scaleModel.spheres[i]);
    }
    for(i=0;i<7;i++){
        scene.remove(stickModel.sticks[i]);
        scene.add(scaleModel.sticks[i]);
    }
    scaleM = !scaleM;
    stickM = !stickM;
    $(this).css("border-color","red");
    $("#stickModel").css("border-color","#7ECAF0");
});

$("#sides-slider-value4").change(function(){
    var result = $('#sides-slider-value4').val();
    var value = parseInt(result.split('|')[1]);
    getParameter.clear = (10-value);
});