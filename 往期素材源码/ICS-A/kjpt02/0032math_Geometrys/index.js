//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});

//禁止选择
document.onselectstart=function(){return false;};

//判断设备类型进行缩放
var $threeCon = $('#threeContainer');
var scale = 1;
var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
if(!(bodyWidth == 370 && bodyHeight == 246)){
    var isMob = /iPad|Android/g.test(navigator.userAgent);
    var $body = $("body");
    // if(isMob){
        var bodyScale = scale = bodyWidth/1920;
        $('.body').css("zoom",bodyScale).height(1200);
        var marginTop = ($body.width()/bodyWidth*bodyHeight-1200)/2;$('.body').css("margin-top",'-600px');
        $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale + (bodyHeight-1200*scale)/2 ),bottom:(69*scale + (bodyHeight-1200*scale)/2 )});
        $(".threeControl").css({"zoom":bodyScale/0.7,"right":30*bodyScale,"bottom":30*bodyScale});
    // }else{
    //     scale = 0.6667;
    //     $(".body").css({"zoom":0.6667,"margin-top":'0',"top":'0'});
    //     $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale ),bottom:(69*scale)});
    // }
    $('.zoom').css("zoom",scale);
    $('body').css('background','#000');
}


// 控件区垂直居中居中
var controlHeight = $("#controlContainer").height();
var conHeight = $(".con").height();
var h2Height = $("#controlContainer h2").height();
var h2MarginTop = parseInt($("#controlContainer h2").css("margin-top"));
var marginTop = (controlHeight - h2Height - h2MarginTop - conHeight - 100)/2;
$(".con").css("margin-top",marginTop);
var checked =false;
var chk=[false,false,false,false,false,false,false];
var chk0 = false,chk1 = false,chk2 = false,chk3 = false,chk4 = false,chk5 = false,chk6 = false;
var a=null;
var flag = 0;

var canWebgl=(function(){
    try {
        var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
    } catch ( e ) {
        return false;
    }
})();

//视图区鼠标事件操作相关变量
var raycaster = new THREE.Raycaster(),
    plane = new THREE.Plane(),
    offset = new THREE.Vector3(),
    intersection = new THREE.Vector3(),
    mouse = new THREE.Vector2(),
    INTERSECTED = null;
var offsetLeft = parseInt($threeCon.offset().left);
var offsetTop = parseInt($threeCon.offset().top);

/****** 位置相关 ******/
var $obj = $('#threeContainer'),
    threeHeight = $obj.height(),
     threeWidth= $obj.width(),styleValue = 0;

var cameraType=1;

//1：100
var getParameter = {
    clear:5,
    checked1:false,
    flag:1,
    radio1:0.5,
    radio2:0.5,
    sides:4,
    angleJson:[],
    angleJson2:[],
    length:200,
    length2:300,
    height:300,
    radius1:100,
    radius2:50,
    radius3:200
};
var oriParameter = {
    clear:5,
    flag:1
};
var threeDimension = {
    axis:new THREE.Object3D(),
    texts:[],
    mesh:null,
    init:function(){
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.labelAxis(100,100,500);
        threeDimension.createAxis();
        threeDimension.createGrid();
        threeDimension.createOne();
        threeDimension.createShow();
    },
    createScene:function(){
        threeDimension.scene = new THREE.Scene();
        threeDimension.scene.position.y=-150;
        // if(cameraType ==1){
            threeDimension.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
            threeDimension.camera1 = new THREE.OrthographicCamera(threeWidth/-1.5,threeWidth/1.5,threeHeight/1.5,threeHeight/-1.5,-100,10000);

        // }else{
        //    threeDimension.camera = new THREE.OrthographicCamera(threeWidth/-2,threeWidth/2,threeHeight/2,threeHeight/-2,-100,10000);
        //
        // }
        //threeDimension.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
         //threeDimension.camera = new THREE.OrthographicCamera(threeWidth/-2,threeWidth/2,threeHeight/2,threeHeight/-2,-100,10000);
        threeDimension.camera.position.x = 1077;
        threeDimension.camera.position.y = 0;
        threeDimension.camera.position.z = 1077;


        threeDimension.camera.position.x = 1077;
        threeDimension.camera.position.y = 0;
        threeDimension.camera.position.z = 1077;

        //threeDimension.scene.add(threeDimension.camera);
        threeDimension.renderer = null;
        if(canWebgl){
            threeDimension.renderer = new THREE.WebGLRenderer({antialias:true});
        }else{
            threeDimension.renderer = new THREE.CanvasRenderer();
        }
        threeDimension.renderer.setPixelRatio( window.devicePixelRatio );
        threeDimension.renderer.setClearColor(0xffffff);
        threeDimension.renderer.setSize(threeWidth,threeHeight);
        $obj.append(threeDimension.renderer.domElement);
    },
    createControls:function(){
        threeDimension.controls = new THREE.OrbitControls( threeDimension.camera, threeDimension.renderer.domElement );
        threeDimension.controls1 = new THREE.OrbitControls( threeDimension.camera1, threeDimension.renderer.domElement );
        threeDimension.controls.enableDamping = true;
        threeDimension.controls1.enableDamping = true;
        threeDimension.controls.dampingFactor = 0.25;
        threeDimension.controls1.dampingFactor = 0.25;
        threeDimension.controls.enableZoom = true;
        threeDimension.controls1.enableZoom = true;
    },
    vec3:function(x,y,z){
        return new THREE.Vector3(x, y, z);
    },
    labelAxis:function (start, stepSize, stop) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        // label x axis:
        var textStyle = {align: textAlign.center, font: '20px Cambria Math', fillStyle: 'red', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            var text = new SpriteText2D(i/100, textStyle);
            text.rotation = threeDimension.camera.rotation;
            text.position.x = i;
            text.position.y = -5;
            threeDimension.axis.add(text);
        }
        text = new SpriteText2D('x', textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.x = stop+50;
        text.position.y = -5;
        threeDimension.axis.add(text);

        // label z axis:
        textStyle = {align: textAlign.center, font: '20px Cambria Math', fillStyle: '#00F', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/100, textStyle);
            text.position.z = i;
            text.position.x = -0.2;
            text.position.y = -5;
            threeDimension.axis.add(text);
        }
        text = new SpriteText2D('z', textStyle);
        text.position.z = stop+50;
        text.position.x = -0.2;
        text.position.y = -5;
        threeDimension.axis.add(text);
        // label y axis:
        textStyle = {align: textAlign.center, font: '20px Cambria Math', fillStyle: '#00FF00', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/100, textStyle);
            text.rotation = threeDimension.camera.rotation;
            text.position.x = 5;
            text.position.y = i;
            text.position.z = 0.2;
            threeDimension.axis.add(text);
        }
        text = new SpriteText2D('y', textStyle);
        text.position.x = 5;
        text.position.y = stop+50;
        text.position.z = 0.2;
        threeDimension.axis.add(text);
    },
    createAxis:function(){
        var geom1 = new THREE.Geometry();
        var geom2 = new THREE.Geometry();
        var geom3 = new THREE.Geometry();
        geom1.vertices.push(threeDimension.vec3(0,0,0),threeDimension.vec3(550,0,0));
        geom2.vertices.push(threeDimension.vec3(0,0,0),threeDimension.vec3(0,550,0));
        geom3.vertices.push(threeDimension.vec3(0,0,0),threeDimension.vec3(0,0,550));
        var material1 = new THREE.LineBasicMaterial({color:0xff0000});
        var material2 = new THREE.LineBasicMaterial({color:0x00ff00});
        var material3 = new THREE.LineBasicMaterial({color:0x0000ff});
        var line1 = new THREE.Line(geom1,material1);
        var line2 = new THREE.Line(geom2,material2);
        var line3 = new THREE.Line(geom3,material3);
        threeDimension.axis.add(line1,line2,line3);
    },
    createGrid:function (){
        if(threeDimension.grid){
            threeDimension.scene.remove(threeDimension.grid);
        }
        threeDimension.grid = new THREE.Object3D();
        var geometry = new THREE.Geometry();
        var size=500, bottom = - 0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( {color : 0x949494, transparent: true, opacity: 0.9} );
        for(var i = 0;i < 21;i ++){
            geometry.vertices.push( threeDimension.vec3( - size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( size, bottom, i*step - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, - size ) );
            geometry.vertices.push( threeDimension.vec3( i*step - size, bottom, size ) );
        }
        var grid = new THREE.LineSegments( geometry, lineMaterial );

        threeDimension.grid.add(grid);
        //threeDimension.scene.add(threeDimension.grid);
    },
    createText:function(texts,x,y,z,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '20px Arial', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x,y,z);
        return text;
    },
    getJson:function(n,radius){
        getParameter.angleJson = [];
        var x,z;
        for(var i=0;i<n;i++){
            x = Math.round(radius*Math.sin((2*Math.PI/n)*i));
            z = Math.round(radius*Math.cos((2*Math.PI/n)*i));
            getParameter.angleJson.push([x,0,z]);
        }
        if(n>3 || flag1){
            for(i=0;i<n;i++){
                x = Math.round(radius*Math.sin((2*Math.PI/n)*i));
                z = Math.round(radius*Math.cos((2*Math.PI/n)*i));
                getParameter.angleJson.push([x,getParameter.height,z]);
            }
        }else{
            getParameter.angleJson.push([0,Math.sqrt(6)/3*getParameter.length,0]);
        }
    },
    //正三棱台
    getJson2:function(n){
        getParameter.angleJson = [];
        var x,z;
        var radius = getParameter.length/Math.sqrt(3);
        var radius2 = getParameter.length2/Math.sqrt(3);
        for(var i=0;i<n;i++){
            x = Math.round(radius2*Math.sin((2*Math.PI/n)*i));
            z = Math.round(radius2*Math.cos((2*Math.PI/n)*i));
            getParameter.angleJson.push([x,0,z]);
        }
        for(i=0;i<n;i++){
            x = Math.round(radius*Math.sin((2*Math.PI/n)*i));
            z = Math.round(radius*Math.cos((2*Math.PI/n)*i));
            getParameter.angleJson.push([x,getParameter.height,z]);
        }
    },
    getJson3:function(radius){
        var json = [];
        for(var i=0;i<3;i++){
            var x = Math.round(radius * Math.cos((2*Math.PI/3)*i));
            var y = Math.round(radius * Math.sin((2*Math.PI/3)*i));
            json.push([x,y,0]);
        }
        return json;
    },

    createLines:function(){
        var geometryLine1 = new THREE.Geometry();
        var geometryLine2 = new THREE.Geometry();
        var geometryLine3 = new THREE.Geometry();
        var vertices1 =[];
        var vertices2 =[];
        var vertices3 =[];
        var lines = new THREE.Object3D();
        var num = getParameter.sides;
        var json = getParameter.angleJson;

        if(getParameter.sides > 3 || flag1){
            for(var i=0;i<num;i++){
                vertices1.push(new THREE.Vector3(json[i][0],json[i][1],json[i][2]));
                vertices2.push(new THREE.Vector3(json[i+num][0],json[i+num][1],json[i+num][2]));

                vertices3.push(new THREE.Vector3(json[i][0],json[i][1],json[i][2]));
                vertices3.push(new THREE.Vector3(json[i+num][0],json[i+num][1],json[i+num][2]));

                geometryLine3.vertices = vertices3;
                var lineMesh3 = new THREE.LineSegments(geometryLine3, new THREE.LineBasicMaterial({color: '#F39800',side:THREE.DoubleSide}));
                lines.add(lineMesh3);
            }
            vertices2.push(new THREE.Vector3(json[num][0],json[num][1],json[num][2]));
            geometryLine2.vertices = vertices2;
            var lineMesh2 = new THREE.Line(geometryLine2, new THREE.LineBasicMaterial({color: '#F39800',side:THREE.DoubleSide}));
            lines.add(lineMesh2);

        }else{
            for(i=0;i<num;i++){
                vertices1.push(new THREE.Vector3(json[i][0],json[i][1],json[i][2]));
                vertices3.push(new THREE.Vector3(json[i][0],json[i][1],json[i][2]));
                vertices3.push(new THREE.Vector3(json[num][0],json[num][1],json[num][2]));

                geometryLine3.vertices = vertices3;
                lineMesh3 = new THREE.Line(geometryLine3, new THREE.LineBasicMaterial({color: '#F39800',side:THREE.DoubleSide}));
                lines.add(lineMesh3);
            }
        }
        vertices1.push(new THREE.Vector3(json[0][0],json[0][1],json[0][2]));
        geometryLine1.vertices = vertices1;
        var lineMesh1 = new THREE.Line(geometryLine1, new THREE.LineBasicMaterial({color: '#F39800',side:THREE.DoubleSide}));
        lines.add(lineMesh1);
        return lines;
    },
    createVertices:function (){
        var vertices = [];
        var num = getParameter.sides;
        if(num>3 || flag1){
            num = 2*num;
        }
        var json = getParameter.angleJson;
        for(var i=0;i<num;i++){
            vertices.push(new THREE.Vector3(json[i][0],json[i][1],json[i][2]));
        }
        if(!flag1){
            vertices.push(new THREE.Vector3(0,Math.sqrt(6)/3*getParameter.length,0));
        }
        return vertices;
    },
    createFaces:function(){
        var faces = [];
        var num = getParameter.sides;
        if(num > 3 || flag1){
            for(var i=0;i<num-1;i++){
                faces.push(new THREE.Face3(i, i+1, i+num));
                faces.push(new THREE.Face3(i+num, i+1, i));
                faces.push(new THREE.Face3(i+1, i+num, i+num+1));
                faces.push(new THREE.Face3( i+num+1, i+num,i+1));
            }

            faces.push(new THREE.Face3(0, num, num-1));
            faces.push(new THREE.Face3(num-1,num, 0));
            faces.push(new THREE.Face3(num, num-1, num*2-1));
            faces.push(new THREE.Face3(num*2-1, num-1, num));

            //底面
            for(i=0;i<num-2;i++){
                faces.push( new THREE.Face3(0,i+2,i+1));
                faces.push( new THREE.Face3(i+num+1,i+num+2,num));
            }
        }else{
            faces.push(new THREE.Face3(0,1,3));

            faces.push(new THREE.Face3(1,2,3));

            faces.push(new THREE.Face3(2,0,3));

            faces.push(new THREE.Face3(0,1,2));
        }
        return faces;
    },
    createFaceMesh:function(){
        var geom = new THREE.Geometry();
        geom.vertices = threeDimension.createVertices();
        geom.faces = threeDimension.createFaces();
        var materials = [new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.2,transparent:true})];
        var mesh =  THREE.SceneUtils.createMultiMaterialObject(geom, materials);
        return mesh;
    },
    //正四棱柱
    createOne:function(){
        flag1 = true;
        threeDimension.scene.remove(threeDimension.mesh);
        threeDimension.mesh = null;
        threeDimension.mesh = new THREE.Object3D();

        getParameter.sides = 4;
        getParameter.length = 200;
        var radius = getParameter.length*Math.cos(Math.PI/4);
        threeDimension.getJson(getParameter.sides,radius);

        var lines = threeDimension.createLines();
        var mesh = threeDimension.createFaceMesh();
        threeDimension.mesh.add(lines,mesh);
        threeDimension.scene.add(threeDimension.mesh);
    },
    //直四棱柱
    createTwo:function(){
        flag1 = true;
        threeDimension.scene.remove(threeDimension.mesh);
        threeDimension.mesh = null;
        threeDimension.mesh = new THREE.Object3D();

        getParameter.sides = 4;
        getParameter.length = 200;
        getParameter.angleJson = [];

        var x = getParameter.length/2*Math.sqrt(3);
        var z = getParameter.length/2;
        getParameter.angleJson.push([0,0,z]);
        getParameter.angleJson.push([x,0,0]);
        getParameter.angleJson.push([0,0,-z]);
        getParameter.angleJson.push([-x,0,0]);

        getParameter.angleJson.push([0,getParameter.height,z]);
        getParameter.angleJson.push([x,getParameter.height,0]);
        getParameter.angleJson.push([0,getParameter.height,-z]);
        getParameter.angleJson.push([-x,getParameter.height,0]);

        var lines = threeDimension.createLines();
        var mesh = threeDimension.createFaceMesh();
        threeDimension.mesh.add(lines,mesh);
        threeDimension.scene.add(threeDimension.mesh);
    },
    //正四面体
    createThree:function(){
        flag1 = false;
        threeDimension.scene.remove(threeDimension.mesh);
        threeDimension.mesh = null;
        threeDimension.mesh = new THREE.Object3D();

        getParameter.sides = 3;
        getParameter.length = 300;
        var radius = getParameter.length/Math.sqrt(3);
        threeDimension.getJson(getParameter.sides,radius);

        var lines = threeDimension.createLines();
        var mesh = threeDimension.createFaceMesh();
        threeDimension.mesh.add(lines,mesh);
        threeDimension.scene.add(threeDimension.mesh);
    },
    //正三棱台
    createFour:function(){
        flag1 = true;
        threeDimension.scene.remove(threeDimension.mesh);
        threeDimension.mesh = null;
        threeDimension.mesh = new THREE.Object3D();

        getParameter.sides = 3;
        getParameter.length = 200;
        getParameter.length2 = 300;
        threeDimension.getJson2(getParameter.sides);

        var lines = threeDimension.createLines();
        var mesh = threeDimension.createFaceMesh();
        threeDimension.mesh.add(lines,mesh);
        threeDimension.scene.add(threeDimension.mesh);
    },
    //正方体
    createFive:function(){
        flag1 = true;
        threeDimension.scene.remove(threeDimension.mesh);
        threeDimension.mesh = null;
        threeDimension.mesh = new THREE.Object3D();

        getParameter.sides = 4;
        getParameter.length = 300;
        var radius = getParameter.length*Math.cos(Math.PI/4);
        threeDimension.getJson(getParameter.sides,radius);

        var lines = threeDimension.createLines();
        var mesh = threeDimension.createFaceMesh();
        threeDimension.mesh.add(lines,mesh);
        threeDimension.scene.add(threeDimension.mesh);
    },

    createGeo:function(radius1,radius2,n){
        var group = new THREE.Object3D();

        var material1 = new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.4,transparent:true});
        var cyl = new THREE.CylinderGeometry(radius2,radius1,getParameter.height,36,36);
        var mesh = new THREE.Mesh(cyl,material1);

        var geometryLine1 =new THREE.Geometry(), geometryLine2 = new THREE.Geometry();
        var vertices1 =[], vertices2 =[];
        for(var i=0;i<37;i++){
            vertices1.push(new THREE.Vector3(radius1*Math.cos(i*10*Math.PI/180),-getParameter.height/2,radius1*Math.sin(i*10*Math.PI/180)));
            vertices2.push(new THREE.Vector3(radius2*Math.cos(i*10*Math.PI/180),getParameter.height/2,radius2*Math.sin(i*10*Math.PI/180)));
        }
        geometryLine1.vertices = vertices1;
        geometryLine2.vertices = vertices2;
        var lineMesh1 = new THREE.Line(geometryLine1, new THREE.LineBasicMaterial({color: '#F39800', side:THREE.DoubleSide}));
        var lineMesh2 = new THREE.Line(geometryLine2, new THREE.LineBasicMaterial({color: '#F39800', side:THREE.DoubleSide}));

        group.add(mesh,lineMesh1,lineMesh2);
        if(n==null){n=2};
        if(n == 1){group.remove(lineMesh2);}
        group.position.y = getParameter.height/2;
        return group;
    },

    //圆柱
    createSix:function(){
        threeDimension.scene.remove(threeDimension.mesh);
        threeDimension.mesh = null;

        threeDimension.mesh = threeDimension.createGeo(getParameter.radius1,getParameter.radius1);
        threeDimension.scene.add(threeDimension.mesh);
    },
    //圆锥
    createSeven:function(){
        threeDimension.scene.remove(threeDimension.mesh);
        threeDimension.mesh = null;

        threeDimension.mesh = threeDimension.createGeo(getParameter.radius1,0,1);
        threeDimension.scene.add(threeDimension.mesh);
    },
    //圆台
    createEight:function(){
        threeDimension.scene.remove(threeDimension.mesh);
        threeDimension.mesh = null;

        threeDimension.mesh = threeDimension.createGeo(getParameter.radius1,getParameter.radius2);
        threeDimension.scene.add(threeDimension.mesh);
    },
    //球
    createSph:function(){
        var group = new THREE.Object3D();

        var material = new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.4,transparent:true});
        var sph = new THREE.SphereGeometry(getParameter.radius3,36,36);
        var mesh = new THREE.Mesh(sph,material);

        var geometryLine1 =new THREE.Geometry(), geometryLine2 = new THREE.Geometry();
        var vertices1 =[], vertices2 =[];
        for(var i=0;i<37;i++){
            vertices1.push(new THREE.Vector3(getParameter.radius3*Math.cos(i*10*Math.PI/180),0,getParameter.radius3*Math.sin(i*10*Math.PI/180)));
            vertices2.push(new THREE.Vector3(getParameter.radius3*Math.cos(i*10*Math.PI/180),0,getParameter.radius3*Math.sin(i*10*Math.PI/180)));
        }
        geometryLine1.vertices = vertices1;
        geometryLine2.vertices = vertices2;
        geometryLine1.computeLineDistances();
        geometryLine2.computeLineDistances();
        var lineMesh1 = new THREE.Line(geometryLine1, new THREE.LineDashedMaterial({color: '#F39800', side:THREE.DoubleSide,dashSize: 10, gapSize: 5}));
        var lineMesh2 = new THREE.Line(geometryLine2, new THREE.LineDashedMaterial({color: '#F39800', side:THREE.DoubleSide,dashSize: 10, gapSize: 5}));
        lineMesh2.rotation.z = Math.PI/2;
        lineMesh2.rotation.y = -Math.PI/4;

        group.add(mesh,lineMesh1,lineMesh2);
        group.position.y = getParameter.radius3;

        return group;
    },
    //球
    createNine:function(){
        threeDimension.scene.remove(threeDimension.mesh);
        threeDimension.mesh = null;

        threeDimension.mesh = threeDimension.createSph();
        threeDimension.scene.add(threeDimension.mesh);
    },
    //显示视角
    //文字
    createTexts:function(texts,size,x,y,z){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size+'px Cambria Math', fillStyle: 'black', antialias: true};

        var text = new SpriteText2D(texts, textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x,y,z);
        threeDimension.texts.push(text);
        return text;
    },
    //箭头
    createArrow:function(){
        var group = new THREE.Object3D();
        //长度
        var length = 50;
        var material1 = new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:0.9});
        var plane = new THREE.CylinderGeometry(1.5,1.5,length,36,36);
        var mesh1 = new THREE.Mesh(plane,material1);
        mesh1.rotation.z = -Math.PI/2;
        //方向
        var json = threeDimension.getJson3(7);
        var vertices = [];
        for(var i=0;i<json.length;i++){
            vertices.push(threeDimension.vec3(json[i][0],json[i][1],json[i][2]));
        }

        var geom = new THREE.Geometry();
        geom.vertices = vertices;
        geom.faces.push(new THREE.Face3(0,1,2));
        geom.faces.push(new THREE.Face3(2,1,0));
        var mesh2 = new THREE.SceneUtils.createMultiMaterialObject(geom,[material1]);
        mesh2.position.x = length/2;

        group.add(mesh1,mesh2);
        return group;
    },
    //组合
    createShow:function(){
        var text1 = threeDimension.createTexts("正视角",20,-60,10,0);
        var arrow1 = threeDimension.createArrow();
        var group1 = new THREE.Object3D();
        group1.add(text1,arrow1);
        group1.position.set(0,getParameter.height/2,250);
        group1.rotation.y = Math.PI/2;

        var text2 = threeDimension.createTexts("侧视角",20,-60,10,0);
        var arrow2 = threeDimension.createArrow();
        var group2 = new THREE.Object3D();
        group2.add(text2,arrow2);
        group2.position.set(-250,getParameter.height/2,0);

        var text3 = threeDimension.createTexts("俯视角",20,-40,10,0);
        var arrow3 = threeDimension.createArrow();
        var group3 = new THREE.Object3D();
        group3.add(text3,arrow3);
        group3.position.set(0,450,0);
        group3.rotation.z = -Math.PI/2;

        threeDimension.show = new THREE.Object3D();
        threeDimension.show.add(group1,group2,group3);
        threeDimension.show.rotation.y = Math.PI/4;
        //threeDimension.scene.add(threeDimension.show);
    }

};

var flag1 = true;
var grid = false;
var axis = false;




var widthV = 400;
var heightV = 480;
var threeMini = {
    mesh:null,
    init:function(){
        threeMini.createScene();
        threeMini.createOne();
    },
    createScene:function(){
        threeMini.scene = new THREE.Scene();
        threeMini.camera = new THREE.PerspectiveCamera(45, widthV / heightV, 1, 10000);
        threeMini.camera.position.x = 400;
        threeMini.camera.position.y = 240;
        threeMini.camera.position.z = 200;
        threeMini.camera.lookAt(threeMini.scene.position);
        threeMini.renderer = new THREE.CanvasRenderer({antialias: true});
        threeMini.renderer.setClearColor(0xffffff);
        threeMini.renderer.setSize(widthV,heightV);
        $("#three-small-2").append(threeMini.renderer.domElement);
    },
    createOne:function(){
        threeMini.scene.remove(threeMini.mesh);
        threeMini.mesh = null;
        threeMini.mesh = new THREE.Object3D();

        var lines = threeDimension.createLines();
        var mesh = threeDimension.createFaceMesh();
        threeMini.mesh.add(lines,mesh);
        threeMini.mesh.scale.set(getParameter.radio1,getParameter.radio1,getParameter.radio1);
        threeMini.mesh.position.y = -80;
        threeMini.scene.add(threeMini.mesh);
    },
    createSix:function(){
        threeMini.scene.remove(threeMini.mesh);
        threeMini.mesh = null;

        threeMini.mesh = threeDimension.createGeo(getParameter.radius1,getParameter.radius1);
        threeMini.mesh.scale.set(getParameter.radio1,getParameter.radio1,getParameter.radio1);
        threeMini.mesh.position.y = -20;
        threeMini.scene.add(threeMini.mesh);
    },
    createSeven:function(){
        threeMini.scene.remove(threeMini.mesh);
        threeMini.mesh = null;

        threeMini.mesh = threeDimension.createGeo(getParameter.radius1,0,1);
        threeMini.mesh.scale.set(getParameter.radio1,getParameter.radio1,getParameter.radio1);
        threeMini.mesh.position.y = -20;
        threeMini.scene.add(threeMini.mesh);
    },
    createEight:function(){
        threeMini.scene.remove(threeMini.mesh);
        threeMini.mesh = null;

        threeMini.mesh = threeDimension.createGeo(getParameter.radius1,getParameter.radius2);
        threeMini.mesh.scale.set(getParameter.radio1,getParameter.radio1,getParameter.radio1);
        threeMini.mesh.position.y = -20;
        threeMini.scene.add(threeMini.mesh);
    },
    createNine:function(){
        threeMini.scene.remove(threeMini.mesh);
        threeMini.mesh = null;

        threeMini.mesh = threeDimension.createSph();
        threeMini.mesh.scale.set(getParameter.radio1,getParameter.radio1,getParameter.radio1);
        threeMini.mesh.position.y = -20;
        threeMini.scene.add(threeMini.mesh);
    }

};


threeDimension.init();
threeMini.init();



//重置事件
function renderAll(){
    threeDimension.controls1.update();
    threeDimension.controls.update();
    if(cameraType == 1){
        threeDimension.renderer.render(threeDimension.scene,threeDimension.camera);
    }else{
        threeDimension.renderer.render(threeDimension.scene,threeDimension.camera1);

    }
    requestAnimationFrame(renderAll);
    threeMini.renderer.render(threeMini.scene,threeMini.camera);
}
renderAll();


//on/off事件
function clickEve1(){
    var dataId = $(this).attr('data-id');
    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        if(dataId == 1){
            $(this).parent().parent().find('.span2').text('' +'off');
            threeDimension.scene.remove(threeDimension.show);
        }else{
            cameraType = 1;
        }
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        if(dataId == 1){
            $(this).parent().parent().find('.span2').text('' +'on');
            threeDimension.scene.add(threeDimension.show);
        }else{
            cameraType = 2;
        }
    }

}





function change(a){
    switch(a){
        case 1: threeDimension.createOne();threeMini.createOne();$("#select-label").text("正四棱柱");
            break;
        case 2: threeDimension.createTwo();threeMini.createOne();$("#select-label").text("直四棱柱");
            break;
        case 3: threeDimension.createThree();threeMini.createOne();$("#select-label").text("正四面体");
            break;
        case 4: threeDimension.createFour();threeMini.createOne();$("#select-label").text("正三棱台");
            break;
        case 5: threeDimension.createFive();threeMini.createOne();$("#select-label").text("正方体");
            break;
        case 6: threeDimension.createSix();threeMini.createSix();$("#select-label").text("圆柱");
            break;
        case 7: threeDimension.createSeven();threeMini.createSeven();$("#select-label").text("圆锥");
            break;
        case 8: threeDimension.createEight();threeMini.createEight();$("#select-label").text("圆台");
            break;
        case 9: threeDimension.createNine();threeMini.createNine();$("#select-label").text("球");
            break;
    }
}





//视图选择




/*全屏事件*/
var fullScreen=0;
function fullEve(){
    if(fullScreen){
        fullScreen = 0;
        $('#scale img').attr('src','images/icon/all.png');
        if(isMob){
            $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale + (bodyHeight-1200*scale)/2 ),bottom:(69*scale + (bodyHeight-1200*scale)/2 )});
        }else{
            $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale ),bottom:(69*scale)});
        }
        $('#threeContainer canvas').css({'position':'absolute','left':0,'top':0});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','visible');
        $('#threeContainer').css({'border-radius':10*scale,'box-shadow': 6*scale + 'px '+6*scale +'px '+ 20*scale +'px rgba(0,0,0,0.30)' });
    }else{
        fullScreen = 1;
        $('#scale img').attr('src','images/icon/back.png');
        $obj.css({'left':0,'top':0,'right':0,'bottom':0,'border-radius':'0'});
        $('#threeContainer canvas').css({'position':'absolute','left':(bodyWidth-threeWidth)/2,'top':(bodyHeight-threeHeight)/2});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','hidden');
    }
}
function renewEve(){
    getParameter.checked1 = false;
    getParameter.flag = 1;
    cameraType=1;

    $('.turn1').removeClass('on').addClass('off');
    $('.turn11').find('.span2').text('' +'off');

    $('.dynamic').removeClass('on').addClass('off');
    $("#positive").addClass('on');

    threeDimension.createOne();
    /*threeDimension.createShow();*/
    threeMini.createOne();


    threeDimension.camera.position.set(1077,0,1077);
    threeDimension.camera1.position.set(1077,0,1077);

    threeDimension.scene.remove(threeDimension.show);
}
function clickPositive(){
    var r = 1523;
    var y = 0;
    switch(getParameter.flag){
        case 1:threeDimension.camera.position.set(1077,y,1077);
            threeDimension.camera1.position.set(1077,y,1077);
            break;
        case 2:threeDimension.camera.position.set(0,y,r);
            threeDimension.camera1.position.set(0,y,r);
            break;
        case 3:threeDimension.camera.position.set(r*Math.cos(Math.PI/6),y,r*Math.sin(Math.PI/6));
            threeDimension.camera1.position.set(r*Math.cos(Math.PI/6),y,r*Math.sin(Math.PI/6));
            break;
        case 4:threeDimension.camera.position.set(r*Math.cos(Math.PI/6),y,r*Math.sin(Math.PI/6));
            threeDimension.camera1.position.set(r*Math.cos(Math.PI/6),y,r*Math.sin(Math.PI/6));
            break;
        case 5:threeDimension.camera.position.set(1077,y,1077);
            threeDimension.camera1.position.set(1077,y,1077);
            break;
        case 6:threeDimension.camera.position.set(1077,y,1077);
            threeDimension.camera1.position.set(1077,y,1077);
            break;
        case 7:threeDimension.camera.position.set(1077,y,1077);
            threeDimension.camera1.position.set(1077,y,1077);
            break;
        case 8:threeDimension.camera.position.set(1077,y,1077);
            threeDimension.camera1.position.set(1077,y,1077);
            break;
        case 9:threeDimension.camera.position.set(1077,y,1077);
            threeDimension.camera1.position.set(1077,y,1077);
            break;
    }

    $('.dynamic').removeClass('on').addClass('off');
    $("#positive").addClass('on');
}
function clickSide(){
    var r = 1523;
    var y = 0;
    switch(getParameter.flag){
        case 1:threeDimension.camera.position.set(-1077,y,1077);
            threeDimension.camera1.position.set(-1077,y,1077);
            break;
        case 2:threeDimension.camera.position.set(r,0,0);
            threeDimension.camera1.position.set(r,0,0);
            break;
        case 3:threeDimension.camera.position.set(-r*Math.sin(Math.PI/6),y,r*Math.cos(Math.PI/6));
            threeDimension.camera1.position.set(-r*Math.sin(Math.PI/6),y,r*Math.cos(Math.PI/6));
            break;
        case 4:threeDimension.camera.position.set(-r*Math.sin(Math.PI/6),y,r*Math.cos(Math.PI/6));
            threeDimension.camera1.position.set(-r*Math.sin(Math.PI/6),y,r*Math.cos(Math.PI/6));
            break;
        case 5:threeDimension.camera.position.set(1077,y,1077);
            threeDimension.camera1.position.set(1077,y,1077);
            break;
        case 6:threeDimension.camera.position.set(1077,y,1077);
            threeDimension.camera1.position.set(1077,y,1077);
            break;
        case 7:threeDimension.camera.position.set(1077,y,1077);
            threeDimension.camera1.position.set(1077,y,1077);
            break;
        case 8:threeDimension.camera.position.set(1077,y,1077);
            threeDimension.camera1.position.set(1077,y,1077);
            break;
        case 9:threeDimension.camera.position.set(1077,y,1077);
            threeDimension.camera1.position.set(1077,y,1077);
            break;
    }
    $('.dynamic').removeClass('on').addClass('off');
    $("#side").addClass('on');
}
function clickTop(){
    threeDimension.camera.position.set(0,1523,0);
    threeDimension.camera1.position.set(0,1523,0);
    $('.dynamic').removeClass('on').addClass('off');
    $("#top").addClass('on');
}

if(!isMob){
    $('#scale').on('click',fullEve);
    $('#renew').on('click',renewEve);
    $('.turnRight').on('click',clickEve1);
    $("#positive").on("click",clickPositive);
    $("#side").on("click",clickSide);
    $("#top").on("click",clickTop);
    $("#select-left").on("click",function(){
        getParameter.flag--;
        if(getParameter.flag<1){
            getParameter.flag = 9;
        }
        change(getParameter.flag);

    });
    $("#select-right").on("click",function(){
        getParameter.flag++;
        if(getParameter.flag>9){
            getParameter.flag = 1;
        }
        change(getParameter.flag);
    });
}else{
    $('#scale').on('touchstart',fullEve);
    $('#renew').on('touchstart',renewEve);
    $('.turnRight').on('touchstart',clickEve1);
    $("#positive").on("touchstart",clickPositive);
    $("#side").on("touchstart",clickSide);
    $("#top").on("touchstart",clickTop);
    $("#select-left").on("touchstart",function(){
        getParameter.flag--;
        if(getParameter.flag<1){
            getParameter.flag = 9;
        }
        change(getParameter.flag);

    });
    $("#select-right").on("touchstart",function(){
        getParameter.flag++;
        if(getParameter.flag>9){
            getParameter.flag = 1;
        }
        change(getParameter.flag);
    });
}

