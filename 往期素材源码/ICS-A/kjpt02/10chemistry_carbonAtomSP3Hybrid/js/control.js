$(function(){
    $('.control-container').height($(window).height());
    $('.three').height($(window).height());
    $(".other-select").css("margin-top",$(window).height()/4);
});

var widthT = $("#WebGL-output-big").width();
var heightT = $(window).height();
var width = $("#WebGL-output-big").width();

var a=null,b=null,c=null;
var dynamic = false;

var canWebgl = ( function () {
    try {
        var canvas = document.createElement( 'canvas' );
        return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
    } catch ( e ) {
        return false;
    }
} )();

var diamond = {
    shape:[],
    arGroup:[],
    texts:[],
    init:function(){
        /*var axis = new THREE.AxisHelper(500);
        scene.add(axis);*/

        diamond.Gstate();
        diamond.Animation();
        //diamond.addLight();

    },
    createSphere:function(r,color){
        if(canWebgl){
            var material = new THREE.MeshPhongMaterial({color:color,side:THREE.DoubleSide});
        }else{
            material = new THREE.MeshBasicMaterial({color:color,side:THREE.DoubleSide});
        }

        var sphGeo = new THREE.SphereGeometry(r,20,20);
        var sph = new THREE.Mesh(sphGeo,material);
        scene.add(sph);
        return sph;
    },
    createTrack:function(r,color){ // r 为 5 的倍数
        var spGroup = new THREE.Object3D();
        if(canWebgl){
            var material = new THREE.MeshPhongMaterial({color:color,side:THREE.DoubleSide,transparent:true, opacity:1});
        }else{
            material = new THREE.MeshBasicMaterial({color:color,side:THREE.DoubleSide,transparent:true, opacity:1});
        }


        var points = [];
        for(var i=0;i<r/5+1;i++){
            points.push(new THREE.Vector3(i*5,3*i*i+2*i,0));
        }
        var latheGeo = new THREE.LatheGeometry(points,36,0,Math.PI/180*360);
        var mesh = new THREE.Mesh(latheGeo, material);
        spGroup.add(mesh);

        i--;
        var sphGeo = new THREE.SphereGeometry(r,9,9, 0, Math.PI/180*360, 0, Math.PI/180*90);
        var sph = new THREE.Mesh(sphGeo,material);
        sph.position.set(0,3*i*i+2*i,0);
        spGroup.add(sph);
        return spGroup;
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
    createTexts:function(texts,size,x,y,z){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size+'px Arial', fillStyle: 'black', antialias: true};

        var text = new SpriteText2D(texts, textStyle);
        text.rotation = camera.rotation;
        text.position.set(x,y,z);
        diamond.texts.push(text);
        return text;
    },
    ver3:function(x,y,z){
        return new THREE.Vector3(x,y,z);
    },
    getJson:function(radius){
        var json = [];
        for(var i=0;i<3;i++){
            var x = Math.round(radius * Math.cos((2*Math.PI/3)*i));
            var y = Math.round(radius * Math.sin((2*Math.PI/3)*i));
            json.push([x,y,0]);
        }
        return json;
    },
    createLine:function(length,radius){
        var group = new THREE.Object3D();
        //长度
        var material1 = new THREE.LineBasicMaterial({color:0x333333,transparent:true,opacity:0.9});
        var geom1 = new THREE.Geometry();
        geom1.vertices.push(diamond.ver3(-length/2,0,0),diamond.ver3(length/2,0,0));
        var mesh1 = new THREE.Line(geom1,material1);

        //方向
        var json = diamond.getJson(radius);

        var material2 = new THREE.MeshBasicMaterial({color:0x333333,transparent:true,opacity:0.9});
        var geom2 = new THREE.Geometry();
        for(var i=0;i<json.length;i++){
            geom2.vertices.push(diamond.ver3(json[i][0],json[i][1],json[i][2]));
        }
        geom2.faces.push(new THREE.Face3(0,1,2));
        geom2.faces.push(new THREE.Face3(2,1,0));
        var mesh2 = new THREE.SceneUtils.createMultiMaterialObject(geom2,[material2]);
        mesh2.position.x = length/2+radius/2;

        group.add(mesh1,mesh2);
        return group;
    },
    drawAxisArrow:function(x,y,z) {

        var arGroup = new THREE.Object3D();

        var axis1 = diamond.createLine(300,5);
        var axis2 = diamond.createLine(300,5);
        var axis3 = diamond.createLine(300,5);
        axis2.rotation.z = Math.PI/2;
        axis3.rotation.y = Math.PI/2;
        arGroup.add(axis1,axis2,axis3);

        var texts = diamond.createAxis();
        for(var i=0;i<texts.length;i++){
            arGroup.add(texts[i]);
        }

        arGroup.position.set(x,y,z);
        scene.add(arGroup);
        diamond.arGroup.push(arGroup);

    },
    createAxis:function(){
        var texts = [];

        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '16px Arial', fillStyle: 'black', antialias: true};

        var text = new SpriteText2D('x', textStyle);
        text.rotation = camera.rotation;
        text.position.set(170,10,0);
        texts.push(text);

        text = new SpriteText2D('y', textStyle);
        text.rotation = camera.rotation;
        text.position.set(0,10,-170);
        texts.push(text);

        text = new SpriteText2D('z', textStyle);
        text.rotation = camera.rotation;
        text.position.set(0,180,0);
        texts.push(text);

        return texts;

    },


    Gstate:function(){
        for(var i=0;i<diamond.shape.length;i++){
            scene.remove(diamond.shape[i]);
            scene.remove(diamond.texts[i]);
            scene.remove(diamond.arGroup[i]);
        }
        diamond.shape = [];
        diamond.texts = [];
        diamond.arGroup = [];

        //Px
        var spGroup = new THREE.Object3D();
        var strack1 = diamond.createTrack(25,0x0081e0);
        var strack2 = diamond.createTrack(25,0x0081e0);
        strack1.rotation.z = Math.PI/180*90;
        strack2.rotation.z = -Math.PI/180*90;
        spGroup.add(strack1,strack2);
        spGroup.position.set(100,200,0);
        scene.add(spGroup);
        diamond.drawAxisArrow(spGroup.position.x,spGroup.position.y,spGroup.position.z);
        diamond.createTexts("Px",25,spGroup.position.x,spGroup.position.y-170,spGroup.position.z+20);
        diamond.shape.push(spGroup);

        //Py
        spGroup = new THREE.Object3D();
        strack1 = diamond.createTrack(25,0x0081e0);
        strack2 = diamond.createTrack(25,0x0081e0);
        strack1.rotation.z = Math.PI/180*90;
        strack2.rotation.z = -Math.PI/180*90;
        spGroup.add(strack1,strack2);
        spGroup.position.set(450,200,0);
        spGroup.rotation.set(0,Math.PI/180*90,0);
        scene.add(spGroup);
        diamond.drawAxisArrow(spGroup.position.x,spGroup.position.y,spGroup.position.z);
        diamond.createTexts("Py",25,spGroup.position.x,spGroup.position.y-170,spGroup.position.z+20);
        diamond.shape.push(spGroup);

        //S1
        var sph = diamond.createSphere(40,0xcec225);
        sph.position.set(-250,200,0);
        diamond.drawAxisArrow(sph.position.x,sph.position.y,sph.position.z);
        diamond.createTexts("S",25,sph.position.x,sph.position.y-170,sph.position.z+20);
        diamond.shape.push(sph);

        //S2
        sph = diamond.createSphere(40,0xcec225);
        sph.position.set(-600,200,0);
        diamond.drawAxisArrow(sph.position.x,sph.position.y,sph.position.z);
        diamond.createTexts("S",25,sph.position.x,sph.position.y-170,sph.position.z+20);
        diamond.shape.push(sph);

        for(i=0;i<diamond.texts.length;i++){
            scene.add(diamond.texts[i]);
        }

    },
    Animation:function(){
        dynamic = true;
        c = setTimeout(function(){
            for(var i=0;i<diamond.arGroup.length;i++){
                scene.remove(diamond.arGroup[i]);
                scene.remove(diamond.texts[i]);
            }
        },2000);
        b = setTimeout(function(){
            var n=60;
            var x = [];
            var x1=diamond.shape[0].position.x/n;
            var x2=diamond.shape[1].position.x/n;
            var x3=diamond.shape[2].position.x/n;
            var x4=diamond.shape[3].position.x/n;
            x.push(x1,x2,x3,x4);
            function animation(){
                if(diamond.shape[0].position.x < 0){
                    clearInterval(a);
                    dynamic = false;
                    return;
                }
                for(var i=0;i<diamond.shape.length;i++){
                    diamond.shape[i].position.x = diamond.shape[i].position.x-x[i];
                }
            }
            a = setInterval(animation,30);
        },2100);

    },

    Astate:function(){
        for(var i=0;i<diamond.shape.length;i++){
            scene.remove(diamond.shape[i]);
            scene.remove(diamond.texts[i]);
        }
        diamond.shape = [];
        diamond.texts = [];

        //Py
        var spGroup = new THREE.Object3D();
        var strack1 = diamond.createTrack(25,0x0081e0);
        var strack2 = diamond.createTrack(25,0x0081e0);
        strack1.rotation.z = Math.PI/180*90;
        strack2.rotation.z = -Math.PI/180*90;
        spGroup.add(strack1,strack2);
        spGroup.position.set(100,200,0);
        spGroup.rotation.set(0,Math.PI/180*90,0);
        scene.add(spGroup);

        diamond.createTexts("Py",25,spGroup.position.x,spGroup.position.y-170,spGroup.position.z+20);
        diamond.shape.push(spGroup);

        //Px
        spGroup = new THREE.Object3D();
        strack1 = diamond.createTrack(25,0x0081e0);
        strack2 = diamond.createTrack(25,0x0081e0);
        strack1.rotation.z = Math.PI/180*90;
        strack2.rotation.z = -Math.PI/180*90;
        spGroup.add(strack1,strack2);
        spGroup.position.set(-250,200,0);
        scene.add(spGroup);

        diamond.createTexts("Px",25,spGroup.position.x,spGroup.position.y-170,spGroup.position.z+20);
        diamond.shape.push(spGroup);

        //Pz
        spGroup = new THREE.Object3D();
        strack1 = diamond.createTrack(25,0x0081e0);
        strack2 = diamond.createTrack(25,0x0081e0);
        strack1.rotation.z = Math.PI/180*90;
        strack2.rotation.z = -Math.PI/180*90;
        spGroup.add(strack1,strack2);
        spGroup.position.set(450,200,0);
        spGroup.rotation.set(Math.PI/180*90,Math.PI/180*90,0);
        scene.add(spGroup);

        diamond.createTexts("Pz",25,spGroup.position.x,spGroup.position.y-170,spGroup.position.z+20);
        diamond.shape.push(spGroup);

        //S2
        var sph = diamond.createSphere(40,0xcec225);
        sph.position.set(-600,200,0);

        diamond.createTexts("S",25,sph.position.x,sph.position.y-170,sph.position.z+20);
        diamond.shape.push(sph);

        for(i=0;i<diamond.texts.length;i++){
            scene.add(diamond.texts[i]);
            scene.add(diamond.arGroup[i]);
        }
    },
    Hstate:function(){
        for(var i=0;i<diamond.shape.length;i++){
            scene.remove(diamond.shape[i]);
            scene.remove(diamond.texts[i]);
        }
        diamond.shape = [];
        diamond.texts = [];

        //SP3右一
        var spGroup = new THREE.Object3D();
        var strack1 = diamond.createTrack(25,0x39df39);
        var strack2 = diamond.createTrack(12,0x39df39);
        strack1.rotation.z = Math.PI/180*90;
        strack2.rotation.z = -Math.PI/180*90;
        spGroup.add(strack1,strack2);
        spGroup.position.set(100,200,0);
        spGroup.rotation.set(0,-Math.PI/180*150,Math.PI/180*19.47);
        scene.add(spGroup);

        diamond.createTexts("SP3",25,spGroup.position.x,spGroup.position.y-170,spGroup.position.z+20);
        diamond.shape.push(spGroup);

        //SP3右二
        spGroup = new THREE.Object3D();
        strack1 = diamond.createTrack(25,0x39df39);
        strack2 = diamond.createTrack(12,0x39df39);
        strack1.rotation.z = Math.PI/180*90;
        strack2.rotation.z = -Math.PI/180*90;
        spGroup.add(strack1,strack2);
        spGroup.position.set(450,200,0);
        spGroup.rotation.set(0,0,-Math.PI/180*90);
        scene.add(spGroup);

        diamond.createTexts("SP3",25,spGroup.position.x,spGroup.position.y-170,spGroup.position.z+20);
        diamond.shape.push(spGroup);

        //SP3左一
        spGroup = new THREE.Object3D();
        strack1 = diamond.createTrack(25,0x39df39);
        strack2 = diamond.createTrack(12,0x39df39);
        strack1.rotation.z = Math.PI/180*90;
        strack2.rotation.z = -Math.PI/180*90;
        spGroup.add(strack1,strack2);
        spGroup.position.set(-250,200,0);
        spGroup.rotation.set(0,-Math.PI/180*30,Math.PI/180*19.47);
        scene.add(spGroup);

        diamond.createTexts("SP3",25,spGroup.position.x,spGroup.position.y-170,spGroup.position.z+20);
        diamond.shape.push(spGroup);

        //SP3左二
        spGroup = new THREE.Object3D();
        strack1 = diamond.createTrack(25,0x39df39);
        strack2 = diamond.createTrack(12,0x39df39);
        strack1.rotation.z = Math.PI/180*90;
        strack2.rotation.z = -Math.PI/180*90;
        spGroup.add(strack1,strack2);
        spGroup.position.set(-600,200,0);
        spGroup.rotation.set(Math.PI/180*19.47,Math.PI/180*90,0);
        scene.add(spGroup);

        diamond.createTexts("SP3",25,spGroup.position.x,spGroup.position.y-170,spGroup.position.z+20);
        diamond.shape.push(spGroup);

        for(i=0;i<diamond.texts.length;i++){
            scene.add(diamond.texts[i]);
            scene.add(diamond.arGroup[i]);
        }
    }
};


/**
 *创建场景
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, widthT / heightT, 1, 10000);
camera.position.set(0,300,1800);
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
controls.enableZoom = false;

diamond.init();
if(canWebgl){
    diamond.addLight();
}

/**
 * 事件函数
 */
//重绘
function renderAll(){
    controls.update();

    requestAnimationFrame(renderAll);
    renderer.render(scene,camera);
}
renderAll();



/**
 * 点击事件
 */
$("#Gstate").click(function(){
    if(dynamic){
        clearInterval(a);
        clearTimeout(b);
        clearTimeout(c);
        dynamic = false;
    }
    $(this).css("border-color","red").siblings(":not(#reset)").css("border-color","#666");
    $("#first-cont").css({"margin-right":"15px"}).find(".arr").css("border-right","2px solid blue").end().find("#arr2").css("display","inline").end().find("#arr1").css("left","0px");
    $("#arr3").css("display","none");

    var $num = $(".num");
    $num.eq(0).html("2S");$num.eq(1).html("2Px");$num.eq(2).html("2Py");$num.eq(3).html("2Pz");
    diamond.Gstate();
    diamond.Animation();
});
$("#Astate").click(function(){
    if(dynamic){
        clearInterval(a);
        clearTimeout(b);
        clearTimeout(c);
        dynamic = false;
    }
    $(this).css("border-color","red").siblings(":not(#reset)").css("border-color","#666");
    $("#first-cont").css({"margin-top":0,"margin-right":"15px"}).find(".arr").css("border-right","2px solid blue").end().find("#arr2").css("display","none").end().find("#arr1").css("left","7px");
    $("#arr3").css("display","inline");

    var $num = $(".num");
    $num.eq(0).html("2S");$num.eq(1).html("2Px");$num.eq(2).html("2Py");$num.eq(3).html("2Pz");

    diamond.Astate();
    diamond.Animation();
});
$("#Hstate").click(function(){
    if(dynamic){
        clearInterval(a);
        clearTimeout(b);
        clearTimeout(c);
        dynamic = false;
    }
    $(this).css("border-color","red").siblings(":not(#reset)").css("border-color","#666");
    $("#first-cont").css({"margin-top":0,"margin-right":0}).find(".arr").css("border-right","none").end().find("#arr2").css("display","none").end().find("#arr1").css("left","7px");
    $("#arr3").css("display","inline");

    $(".for-cont .num").html("<span>SP<sup>3</sup></span>");
    diamond.Hstate();
    diamond.Animation();
});

$("#reset").click(function(){
    if(dynamic){
        clearInterval(a);
        clearTimeout(b);
        clearTimeout(c);
        dynamic = false;
    }
    camera.position.set(0,300,1800);
    $(this).siblings().css("border-color","#666");
    $("#first-cont").css({"margin-right":"15px"}).find(".arr").css("border-right","2px solid blue").end().find("#arr2").css("display","inline").end().find("#arr1").css("left","0px");
    $("#arr3").css("display","none");
    var $num = $(".num");
    $num.eq(0).html("2S");$num.eq(1).html("2Px");$num.eq(2).html("2Py");$num.eq(3).html("2Pz");
    diamond.Gstate();

});