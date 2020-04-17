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
    sides:4,
    radius:100,
    h:100 //位移高度
};
var oriParameter = {
    clear:5
};

var color1 = 0x0081e0;
var color2 = 0xfb3a2f;

var dynamic = false;
var e1=null,e2=null,f1=null,f2=null;

//鼠标事件变量
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var offset = new THREE.Vector3();

var diamond = {
    spheres:[],
    sticks:[],
    texts:[],
    lines:[],
    line:[],
    init:function(){
        /*var axis = new THREE.AxisHelper(500);
        scene.add(axis);*/
        diamond.getJson(getParameter.radius,3);
        var json = getParameter.angleJson;
        var y2 = -json[0][2]*Math.tan(Math.PI/180*19.47)-json[0][2]/Math.cos(Math.PI/180*19.47);

        //diamond.addLight();
        diamond.createFour(0,0,0);
        diamond.createFour(json[2][0],y2,json[2][2]);
        diamond.createFour(json[1][0],y2,json[1][2]);
        diamond.createFour(json[0][0],y2,json[0][2]);
        diamond.createFour(2*json[2][0],2*y2,2*json[2][2]);
        diamond.createFour(2*json[1][0],2*y2,2*json[1][2]);
        diamond.createFour(2*json[0][0],2*y2,2*json[0][2]);
        diamond.createFour(0,2*y2,-json[0][2]);
        diamond.createFour(json[1][0],2*y2,-json[1][2]);
        diamond.createFour(json[2][0],2*y2,-json[2][2]);

        diamond.createText();
        diamond.createLines();
        f2 = setTimeout(diamond.structure,800);
        e2 = setTimeout(diamond.dynamical,12000);

        diamond.createCell();
        diamond.createUnitCellLines();

    },
    createSphere:function(r,color){
        if(canWebgl){
            var material = new THREE.MeshPhongMaterial({color:color, transparent:true, opacity:0, side:THREE.DoubleSide});
        }else{
            material = new THREE.MeshBasicMaterial({color:color, transparent:true, opacity:0, side:THREE.DoubleSide});
        }

        var sphGeo = new THREE.SphereGeometry(r,32,32);
        var mesh = new THREE.Mesh(sphGeo,material);
        scene.add(mesh);
        return mesh;
    },
    createStick:function(r,l,color){
        var material = new THREE.MeshBasicMaterial({color:color, transparent:true, opacity:0, side:THREE.DoubleSide});
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
    getJson:function(l,n){
        var x,y;
        for(var i=0;i<n;i++){
            x = Math.round(l * Math.sin((2*Math.PI/n)*i));
            y = Math.round(l * Math.cos((2*Math.PI/n)*i));
            getParameter.angleJson.push([x,0,-y]);
        }
    },
    createFour:function(x1,y1,z1){
        var json = getParameter.angleJson;
        var de = Math.PI/180;
        var sticks = [];
        var spheres = [];

        //创建原子
        var r = -json[0][2];
        for(var i=0;i<5;i++){
            var sph = diamond.createSphere(15,0x0081e0);
            sph.name = diamond.spheres.length;
            spheres.push(sph);
            diamond.spheres.push(sph);
        }
        spheres[0].position.set(json[0][0]+x1,json[0][1]-y1+getParameter.h,json[0][2]+z1);
        spheres[1].position.set(json[1][0]+x1,json[1][1]-y1+getParameter.h,json[1][2]+z1);
        spheres[2].position.set(json[2][0]+x1,json[2][1]-y1+getParameter.h,json[2][2]+z1);
        spheres[3].position.set(0+x1,r*Math.tan(de*19.47)-y1+getParameter.h,0+z1);
        spheres[4].position.set(0+x1,r*Math.tan(de*19.47) + r/Math.cos(de*19.47)-y1+getParameter.h,0+z1);

        //创建键
        var y = -json[0][2]*Math.tan(de*19.47)/2, z = -json[0][2]/2/2;
        var l = -json[0][2]/Math.cos(de*19.47); //C-C键长
        for(i=0;i<4;i++){
            var stick = diamond.createStick(2,l,0x838383);
            stick.name = diamond.sticks.length;
            sticks.push(stick);
            diamond.sticks.push(stick);
        }

        sticks[0].rotation.set(de*70.53,0,0);
        sticks[0].position.set(0+x1,y-y1+getParameter.h,json[0][2]/2+z1);

        sticks[1].rotation.set(0,-de*30,de*70.53);
        sticks[1].position.set(json[1][0]/2+x1,y-y1+getParameter.h,z+z1);

        sticks[2].rotation.set(0,de*30,-de*70.53);
        sticks[2].position.set(json[2][0]/2+x1,y-y1+getParameter.h,z+z1);

        sticks[3].position.set(0+x1,y*2+l/2-y1+getParameter.h,0+z1);
    },
    createText:function(){
        var json = getParameter.angleJson;
        var x = getParameter.angleJson[0][2]/2;
        var h = getParameter.angleJson[0][2]/Math.sin(Math.PI/180*45);

        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '16px Arial', fillStyle: '#000000', antialias: true};

        var text = new SpriteText2D('0.155 nm', textStyle);
        text.position.set(-20,-json[0][1]+50,json[0][2]);
        diamond.texts.push(text);
        //scene.add(text);

        text = new SpriteText2D("109°28'", textStyle);
        //text.rotation.z = -Math.PI/180*54.74;
        text.position.set(0,-json[0][2]*Math.tan(Math.PI/180*19.47)+120,-40);
        diamond.texts.push(text);
        //scene.add(text);
    },
    dynamical:function(){
        var l = camera.position.x/Math.sin(Math.PI/180*45);
        var n = 0;
        function rotate(){
            if(n>359){
                clearInterval(e1);
                dynamic = false;
                return;
            }
            if(canWebgl){
                n++;
            }else{
                n += 6;
            }

            var x = l*Math.cos(Math.PI/180*n + Math.PI/180*45) ;
            var y = camera.position.y;
            var z = l*Math.sin(Math.PI/180*n + Math.PI/180*45) ;
            camera.position.set(x,y,z);
        }
        e1 = setInterval(rotate,30);
    },
    structure:function(){
        dynamic = true;
        var num1 = 0, num2 = 0, num = 0;
        function str(){
            if(num>9){
                clearInterval(f1);
                return;
            }

            for(var i=num1;i<5+num1;i++){
                diamond.spheres[i].material.opacity = 1;
            }
            for(i=num2;i<4+num2;i++){
                diamond.sticks[i].material.opacity = 1;
            }
            num1 += 5;num2 += 4;num++;
        }
        f1 = setInterval(str,1000);
    },
    onMouseHover:function(event){
        if(dynamic){
            return;
        }
        mouse.x = (event.clientX / width ) * 2 - 1;
        mouse.y = -( event.clientY / heightT ) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(diamond.spheres);
        var intersects1 = raycaster.intersectObjects(diamond.sticks);
        if (intersects.length > 0 || intersects1.length>0) {
            for(var i=0;i<diamond.texts.length;i++){
                scene.add(diamond.texts[i]);
            }
            diamond.sticks[15].material.color.set(0x333333);
        }else{
            for(i=0;i<diamond.texts.length;i++){
                scene.remove(diamond.texts[i]);
            }
            diamond.sticks[15].material.color.set(0x838383);
        }
    },
    createLines:function(){
        var json = getParameter.angleJson;
        var material = new THREE.LineDashedMaterial({color:0x000000, gapSize:10, dashSize:10});
        var geom1 = new THREE.Geometry();
        var geom2 = new THREE.Geometry();
        for(var i=0;i<3;i++){
            geom1.vertices.push(new THREE.Vector3(json[i][0],json[i][1]+getParameter.h,json[i][2]));
            geom2.vertices.push(new THREE.Vector3(json[i][0],json[i][1]+getParameter.h,json[i][2]));
            geom2.vertices.push(new THREE.Vector3(0,-json[0][2]*Math.tan(Math.PI/180*19.47)-json[0][2]/Math.cos(Math.PI/180*19.47)+getParameter.h,0));
        }
        geom1.vertices.push(new THREE.Vector3(json[0][0],json[0][1]+getParameter.h,json[0][2]));
        geom1.computeLineDistances();
        geom2.computeLineDistances();
        var mesh = new THREE.Line(geom1,material);
        //scene.add(mesh);
        diamond.lines.push(mesh);
        mesh = new THREE.Line(geom2,material);
        //scene.add(mesh);
        diamond.lines.push(mesh);
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

    //显示原子name
    createName1:function(){
        var n = 10;
        for(var i=0;i<diamond.spheres.length;i++){
            n++;
            var n1 = Math.floor(n/10)*10;
            diamond.createTexts(diamond.spheres[i].name, diamond.spheres[i].position.x, diamond.spheres[i].position.y+30+n1, diamond.spheres[i].position.z, '#000000');
        }
    },
    //显示键name
    createName2:function(){
        for(var i=0;i<diamond.sticks.length;i++){
            diamond.createTexts(diamond.sticks[i].name, diamond.sticks[i].position.x, diamond.sticks[i].position.y+30, diamond.sticks[i].position.z, '#000000');
        }
    },

    //创建晶胞棱线
    createLine:function(a,b){
        var material = new THREE.LineDashedMaterial({color:0x333333, gapSize:10, dashSize:10});
        var geom = new THREE.Geometry();
        geom.vertices.push(a);
        geom.vertices.push(b);
        geom.computeLineDistances();
        var mesh = new THREE.Line(geom,material);
        diamond.line.push(mesh);
        //scene.add(mesh);
    },
    ver3:function(x,y,z){
        return new THREE.Vector3(x,y,z);
    },
    createCell:function(){
        var spheres = [];
        var sphs = diamond.spheres;
        for(var i=0;i<3;i++){
            var sph = diamond.createSphere(15,0x7ECAF0);
            scene.remove(sph);
            sph.name = diamond.spheres.length;
            spheres.push(sph);
            diamond.spheres.push(sph);
        }
        diamond.spheres[50].position.set(0, 2*sphs[6].position.y-sphs[46].position.y, 2*sphs[6].position.z-sphs[46].position.z);
        diamond.spheres[51].position.set(2*sphs[10].position.x-sphs[46].position.x, 2*sphs[10].position.y-sphs[46].position.y, 2*sphs[10].position.z-sphs[46].position.z);
        diamond.spheres[52].position.set(2*sphs[5].position.x-sphs[46].position.x, 2*sphs[5].position.y-sphs[46].position.y, 2*sphs[5].position.z-sphs[46].position.z);
    },
    createUnitCellLines:function(){
        var sph = diamond.spheres;
        diamond.createLine(diamond.ver3(sph[11].position.x, sph[11].position.y, sph[11].position.z), diamond.ver3(sph[46].position.x, sph[46].position.y, sph[46].position.z));

        diamond.createLine(diamond.ver3(sph[7].position.x, sph[7].position.y, sph[7].position.z), diamond.ver3(sph[46].position.x, sph[46].position.y, sph[46].position.z));
        diamond.createLine(diamond.ver3(sph[15].position.x, sph[15].position.y, sph[15].position.z), diamond.ver3(sph[46].position.x, sph[46].position.y, sph[46].position.z));

        diamond.createLine(diamond.ver3(0, 2*sph[6].position.y-sph[46].position.y, 2*sph[6].position.z-sph[46].position.z), diamond.ver3(0, sph[4].position.y, 0));

        diamond.createLine(diamond.ver3(2*sph[10].position.x-sph[46].position.x, 2*sph[10].position.y-sph[46].position.y, 2*sph[10].position.z-sph[46].position.z), diamond.ver3(0, sph[4].position.y, 0));

        diamond.createLine(diamond.ver3(2*sph[5].position.x-sph[46].position.x, 2*sph[5].position.y-sph[46].position.y, 2*sph[5].position.z-sph[46].position.z), diamond.ver3(0, sph[4].position.y, 0));

        diamond.createLine(diamond.ver3(0, 2*sph[6].position.y-sph[46].position.y, 2*sph[6].position.z-sph[46].position.z), diamond.ver3(sph[7].position.x, sph[7].position.y, sph[7].position.z));
        diamond.createLine(diamond.ver3(2*sph[5].position.x-sph[46].position.x, 2*sph[5].position.y-sph[46].position.y, 2*sph[5].position.z-sph[46].position.z), diamond.ver3(sph[7].position.x, sph[7].position.y, sph[7].position.z));

        diamond.createLine(diamond.ver3(0, 2*sph[6].position.y-sph[46].position.y, 2*sph[6].position.z-sph[46].position.z), diamond.ver3(sph[11].position.x, sph[11].position.y, sph[11].position.z));
        diamond.createLine(diamond.ver3(2*sph[10].position.x-sph[46].position.x, 2*sph[10].position.y-sph[46].position.y, 2*sph[10].position.z-sph[46].position.z), diamond.ver3(sph[11].position.x, sph[11].position.y, sph[11].position.z));

        diamond.createLine(diamond.ver3(2*sph[10].position.x-sph[46].position.x, 2*sph[10].position.y-sph[46].position.y, 2*sph[10].position.z-sph[46].position.z), diamond.ver3(sph[11].position.x, sph[11].position.y, sph[11].position.z));
        diamond.createLine(diamond.ver3(2*sph[10].position.x-sph[46].position.x, 2*sph[10].position.y-sph[46].position.y, 2*sph[10].position.z-sph[46].position.z), diamond.ver3(sph[15].position.x, sph[15].position.y, sph[15].position.z));

        diamond.createLine(diamond.ver3(2*sph[5].position.x-sph[46].position.x, 2*sph[5].position.y-sph[46].position.y, 2*sph[5].position.z-sph[46].position.z), diamond.ver3(sph[15].position.x, sph[15].position.y, sph[15].position.z));
    }
};


/**
 *创建场景
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, widthT / heightT, 1, 10000);
camera.position.set(800/Math.sin(Math.PI/180*45),0,800/Math.sin(Math.PI/180*45));
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

diamond.init();
if(canWebgl){
    diamond.addLight();
}

renderer.domElement.addEventListener( 'mousemove', diamond.onMouseHover, false );


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

/*function reset4(){
    for(var i=0;i<5;i++){
        diamond.spheres[i].material.color.set(color1);
    }
    diamond.spheres[9].material.color.set(color1);
    diamond.spheres[14].material.color.set(color1);
    diamond.spheres[19].material.color.set(color1);
}
function reset6(){
    diamond.spheres[5].material.color.set(color1);
    diamond.spheres[6].material.color.set(color1);
    diamond.spheres[8].material.color.set(color1);

    diamond.spheres[10].material.color.set(color1);
    diamond.spheres[12].material.color.set(color1);
    diamond.spheres[13].material.color.set(color1);

    diamond.spheres[16].material.color.set(color1);
    diamond.spheres[17].material.color.set(color1);
    diamond.spheres[18].material.color.set(color1);

    diamond.spheres[39].material.color.set(color1);
    diamond.spheres[44].material.color.set(color1);
    diamond.spheres[49].material.color.set(color1);
}
function reset10(){
    //六元环
    diamond.spheres[5].material.color.set(color1);
    diamond.spheres[6].material.color.set(color1);
    diamond.spheres[8].material.color.set(color1);

    diamond.spheres[10].material.color.set(color1);
    diamond.spheres[12].material.color.set(color1);
    diamond.spheres[13].material.color.set(color1);

    diamond.spheres[16].material.color.set(color1);
    diamond.spheres[17].material.color.set(color1);
    diamond.spheres[18].material.color.set(color1);

    diamond.spheres[39].material.color.set(color1);
    diamond.spheres[44].material.color.set(color1);
    diamond.spheres[49].material.color.set(color1);
    //其他四元
    for(var i=0;i<4;i++){
        diamond.spheres[i].material.color.set(color1);
    }
    diamond.spheres[9].material.color.set(color1);
    diamond.spheres[14].material.color.set(color1);
    diamond.spheres[19].material.color.set(color1);
}
function reset1(){
    for(var i=0;i<20;i++){
        diamond.spheres[i].material.color.set(color1);
    }
    for(i=0;i<3;i++){
        diamond.spheres[i+50].material.color.set(color1);
        diamond.spheres[5*i+24].material.color.set(color1);
        diamond.spheres[5*i+39].material.color.set(color1);
    }
    diamond.spheres[35].material.color.set(color1);
    diamond.spheres[42].material.color.set(color1);
    diamond.spheres[46].material.color.set(color1);

    for(i=0;i<3;i++){
        scene.remove(diamond.spheres[50+i]);
    }
    for(i=0;i<13;i++){
        scene.remove(diamond.line[i]);
    }
}*/
function repart(){
    for(var i=0;i<53;i++){
        diamond.spheres[i].material.color.set(color1);
    }
    for(i=0;i<3;i++){
        scene.remove(diamond.spheres[50+i]);
    }
    for(i=0;i<13;i++){
        scene.remove(diamond.line[i]);
    }
}

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

$("#rad1").click(function(){
    if(dynamic){
        clearTimeout(e2);
        clearTimeout(f2);
        clearInterval(e1);
        clearInterval(f1);
        for(var i=0;i<50;i++){
            diamond.spheres[i].material.opacity = 1;
        }
        for(i=0;i<40;i++){
            diamond.sticks[i].material.opacity = 1;
        }
        dynamic = false;
    }

    if(this.checked){
        repart();

        for(i=0;i<5;i++){
            diamond.spheres[i].material.color.set(color2);
        }
        diamond.spheres[9].material.color.set(color2);
        diamond.spheres[14].material.color.set(color2);
        diamond.spheres[19].material.color.set(color2);

    }

    //显示四面体棱线 3s
    for(i=0;i<diamond.lines.length;i++){
        scene.add(diamond.lines[i]);
    }

});

$("#rad2").click(function(){
    if(dynamic){
        clearTimeout(e2);
        clearTimeout(f2);
        clearInterval(e1);
        clearInterval(f1);
        for(var i=0;i<50;i++){
            diamond.spheres[i].material.opacity = 1;
        }
        for(i=0;i<40;i++){
            diamond.sticks[i].material.opacity = 1;
        }
        dynamic = false;
    }

    if(this.checked){
        repart();
        for(i=0;i<diamond.lines.length;i++){
            scene.remove(diamond.lines[i]);
        }

        diamond.spheres[5].material.color.set(color2);
        diamond.spheres[6].material.color.set(color2);
        diamond.spheres[8].material.color.set(color2);

        diamond.spheres[10].material.color.set(color2);
        diamond.spheres[12].material.color.set(color2);
        diamond.spheres[13].material.color.set(color2);

        diamond.spheres[16].material.color.set(color2);
        diamond.spheres[17].material.color.set(color2);
        diamond.spheres[18].material.color.set(color2);

        diamond.spheres[39].material.color.set(color2);
        diamond.spheres[44].material.color.set(color2);
        diamond.spheres[49].material.color.set(color2);

    }
});

$("#rad3").click(function(){
    if(dynamic){
        clearTimeout(e2);
        clearTimeout(f2);
        clearInterval(e1);
        clearInterval(f1);
        for(var i=0;i<50;i++){
            diamond.spheres[i].material.opacity = 1;
        }
        for(i=0;i<40;i++){
            diamond.sticks[i].material.opacity = 1;
        }
        dynamic = false;
    }

    if(this.checked){
        repart();
        for(i=0;i<diamond.lines.length;i++){
            scene.remove(diamond.lines[i]);
        }

        diamond.spheres[5].material.color.set(color2);
        diamond.spheres[6].material.color.set(color2);
        diamond.spheres[8].material.color.set(color2);

        diamond.spheres[10].material.color.set(color2);
        diamond.spheres[12].material.color.set(color2);
        diamond.spheres[13].material.color.set(color2);

        diamond.spheres[16].material.color.set(color2);
        diamond.spheres[17].material.color.set(color2);
        diamond.spheres[18].material.color.set(color2);

        diamond.spheres[39].material.color.set(color2);
        diamond.spheres[44].material.color.set(color2);
        diamond.spheres[49].material.color.set(color2);
        //其他四元
        for(i=0;i<4;i++){
            diamond.spheres[i].material.color.set(color2);
        }
        diamond.spheres[9].material.color.set(color2);
        diamond.spheres[14].material.color.set(color2);
        diamond.spheres[19].material.color.set(color2);
    }
});

$("#rad4").click(function(){
    if(dynamic){
        clearTimeout(e2);
        clearTimeout(f2);
        clearInterval(e1);
        clearInterval(f1);
        for(var i=0;i<50;i++){
            diamond.spheres[i].material.opacity = 1;
        }
        for(i=0;i<40;i++){
            diamond.sticks[i].material.opacity = 1;
        }
        dynamic = false;
    }
    for(i=0;i<diamond.lines.length;i++){
        scene.remove(diamond.lines[i]);
    }

    if(this.checked){
        repart();
        for(i=0;i<3;i++){
            scene.add(diamond.spheres[50+i]);
            diamond.spheres[50+i].material.opacity = 1;
        }
        for(i=0;i<13;i++){
            scene.add(diamond.line[i]);
        }

        for(i=0;i<20;i++){
            diamond.spheres[i].material.color.set(color2);
        }
        for(i=0;i<3;i++){
            diamond.spheres[i+50].material.color.set(color2);
            diamond.spheres[5*i+24].material.color.set(color2);
            diamond.spheres[5*i+39].material.color.set(color2);
        }
        diamond.spheres[35].material.color.set(color2);
        diamond.spheres[42].material.color.set(color2);
        diamond.spheres[46].material.color.set(color2);
    }
});

$("#reset").click(function(){
    if(dynamic){
        clearTimeout(e2);
        clearTimeout(f2);
        clearInterval(e1);
        clearInterval(f1);
        for(var i=0;i<50;i++){
            diamond.spheres[i].material.opacity = 1;
            diamond.spheres[i].material.color.set(color1);
        }
        for(i=0;i<40;i++){
            diamond.sticks[i].material.opacity = 1;
        }
        dynamic = false;
    }
    for(i=0;i<diamond.lines.length;i++){
        scene.remove(diamond.lines[i]);
    }

    /*reset4();reset6();reset10();reset1();*/repart();
    camera.position.set(800/Math.sin(Math.PI/180*45),0,800/Math.sin(Math.PI/180*45));
    clearEvent(5);
    $(".other-select").find("input").attr("checked",false);
    for(i=0;i<diamond.texts.length;i++){
        scene.remove(diamond.texts[i]);
    }

});


