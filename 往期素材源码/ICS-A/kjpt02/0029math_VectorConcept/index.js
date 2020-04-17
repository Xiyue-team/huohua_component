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

var json3 =[[[-300,50,0],[300,50,0]],[[-300,-50,0],[300,-50,0]]],arra,arrb;


var getParameter = {
    angleJson:[],
    angleJson2:[],
    angleJson3:[],
    length:300,
    length2:300,
    radius1:25,
    radius2:6,
    angle:30,
    radius3:10
};

var threeDimension = {
    cir:[],
    angleTh:null,
    textAB:null,
    mesh1:null,
    mesh2:null,
    mesh3:null,
    gruop1:null,
    spheres1:[null,null,null,null],
    texts:[],
    init:function(){
        threeDimension.createScene();

        var materialCir = new THREE.MeshBasicMaterial({color:'#f39800',transparent:true,opacity:0.5});
        var cir = new THREE.CircleGeometry(16,36,36);
        threeDimension.spheres1[0] = new THREE.Mesh(cir,materialCir);
        threeDimension.scene.add(threeDimension.spheres1[0]);


        materialCir = new THREE.MeshBasicMaterial({color:'#f39800',transparent:false,opacity:1});
        cir = new THREE.CircleGeometry(8,36,36);
        threeDimension.spheres1[1] = new THREE.Mesh(cir,materialCir);
        threeDimension.scene.add(threeDimension.spheres1[1]);


        materialCir = new THREE.MeshBasicMaterial({color:'#f39800',transparent:true,opacity:0.5});
        cir = new THREE.CircleGeometry(16,36,36);
        threeDimension.spheres1[2] = new THREE.Mesh(cir,materialCir);
        threeDimension.scene.add(threeDimension.spheres1[2]);


        materialCir = new THREE.MeshBasicMaterial({color:'#f39800',transparent:false,opacity:1});
        cir = new THREE.CircleGeometry(8,36,36);
        threeDimension.spheres1[3] = new THREE.Mesh(cir,materialCir);
        threeDimension.scene.add(threeDimension.spheres1[3]);

        threeDimension.getJson2();
        threeDimension.getJson3();
        threeDimension.createVec();
        

        threeDimension.createAngle3();
        threeDimension.createAngle1();
        threeDimension.createAngle2();

        arra =  threeDimension.createLineArrow(1,[0,0,0],'#f39800',3);
        this.scene.add(arra);
        arra.visible =false;

        arrb =  threeDimension.createLineArrow(1,[0,0,0],'#6089ba',3);
        this.scene.add(arrb);
        arrb.visible =false;


        threeDimension.spheres1[0].visible = threeDimension.spheres1[1].visible = threeDimension.spheres1[2].visible = threeDimension.spheres1[3].visible = false;

    },
    createScene:function(){
        threeDimension.scene = new THREE.Scene();
        threeDimension.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
        threeDimension.camera.position.x = 0;
        threeDimension.camera.position.y = 0;
        threeDimension.camera.position.z = 1000;
        threeDimension.camera.lookAt(threeDimension.scene.position);
        threeDimension.scene.add(threeDimension.camera);
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
    vec3:function(x,y,z){
        return new THREE.Vector3(x, y, z);
    },
    createText:function(texts,x,y,z,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '18px Cambria Math', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x,y,z);
        return text;
    },
    getJson:function(radius){
        var json = [];
        var x,y;
        for(var i=0;i<3;i++){

            x = Math.round(radius * Math.cos((2*Math.PI/3)*i));
            y = Math.round(radius * Math.sin((2*Math.PI/3)*i));
            if(i==1){
                y -=2;
            }else if(i==2){
                y+=2;
            }
            json.push([x,y,0]);
        }
        return json;
    },
    //半圆参数
    getJson2:function(length,angle){
        var json=[];
        for(var i=0;i<angle;i++){
            var x = length*Math.cos(Math.PI/180*i);
            var y = length*Math.sin(Math.PI/180*i);
            json.push([x,y,0]);
        }
        return json;
    },
    getJson3:function(){
        getParameter.angleJson3 = [];
        var x = (getParameter.length+2)*Math.cos(Math.PI/180*getParameter.angle);
        var y = (getParameter.length+2)*Math.sin(Math.PI/180*getParameter.angle);
        getParameter.angleJson3.push([x,y,0]);
    },
    createLine:function(length,height,color,vertices,radius){
        var group = new THREE.Object3D();
        //长度
        var material1 = new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:0.9});
        var plane = new THREE.PlaneGeometry(6+length-radius*1.5-height,height*2,4,4);
        var mesh1 = new THREE.Mesh(plane,material1);
        //方向
        var material2 = new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:0.9});
        var geom = new THREE.Geometry();
        geom.vertices = vertices;
        geom.faces.push(new THREE.Face3(0,1,2));
        geom.faces.push(new THREE.Face3(2,1,0));
        var mesh2 = new THREE.SceneUtils.createMultiMaterialObject(geom,[material2]);
        mesh2.position.x = (6+length-radius*1.5-height)/2+radius/2-8;

        //起点
        var material3 = new THREE.MeshBasicMaterial({color:'#000000',transparent:true,opacity:0.9});
        var plane2 = new THREE.CircleBufferGeometry(height-2,0,2*Math.PI);

        var mesh3 = new THREE.Mesh(plane2,material3);
        mesh3.rotation.z = Math.PI/4;
        // var plane2 = new THREE.PlaneGeometry(height,height*2);
        // var mesh3 = new THREE.Mesh(plane2,material3);
        // mesh3.position.x = -((6+length-radius*1.5-height)/2+height/2);



        group.add(mesh1,mesh2,mesh3);


        return group;
    },
    createLine2:function(length,position,vertices,color){
        var color1;
        if(color){
            color1=color;
        }else{
            color1=0x328ad9;
        }
        var group = new THREE.Object3D();
        var material1 = new THREE.LineBasicMaterial({color:color1,transparent:true,opacity:0.9});
        //长度
        var geom1 = new THREE.Geometry();
        var geom2 = new THREE.Geometry();
        var geom3 = new THREE.Geometry();
        var vertices1=[];
        vertices1.push(threeDimension.vec3(0,0,0),threeDimension.vec3(length,0,0));
        geom1.vertices = vertices1;
        geom2.vertices = vertices1;
        geom3.vertices = vertices1;
        var line1 = new THREE.Line(geom1,material1);
        var line2 = new THREE.Line(geom2,material1);
        var line3 = new THREE.Line(geom3,material1);
        line1.position.y = 1;
        line2.position.y = -1;

        //方向
        var material2 = new THREE.MeshBasicMaterial({color:color1,transparent:true,opacity:0.9});
        var geom = new THREE.Geometry();
        geom.vertices = vertices;
        geom.faces.push(new THREE.Face3(0,1,2));
        geom.faces.push(new THREE.Face3(2,1,0));
        var mesh = new THREE.SceneUtils.createMultiMaterialObject(geom,[material2]);
        mesh.position.x = position;

        group.add(line1,line2,line3,mesh);

        return group;
    },
    createLineMesh : function (vertices, color, style) {
    var lineMesh = null, geometryLine = new THREE.Geometry();
    if (!color) {
        color = '#000';
    }
    if (style == 1) {
        vertices.push(new THREE.Vector3(vertices[0].x,vertices[0].y,vertices[0].z));
        vertices.push(new THREE.Vector3(vertices[1].x,vertices[1].y,vertices[1].z));
        // vertices.push(new THREE.Vector3(vertices[0].x+2,vertices[0].y,vertices[0].z));
        // vertices.push(new THREE.Vector3(vertices[1].x+2,vertices[1].y,vertices[1].z));
        // vertices.push(new THREE.Vector3(vertices[0].x-2,vertices[0].y,vertices[0].z));
        // vertices.push(new THREE.Vector3(vertices[1].x-2,vertices[1].y,vertices[1].z));
        geometryLine.vertices = vertices;
        lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
    } else if(style==2) {
        geometryLine.vertices = vertices;
        geometryLine.computeLineDistances();
        lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
            color: color,
            opacity: 0.8,
            dashSize: 5,
            gapSize: 5
        }));
    }else if( style == 3){
        geometryLine.vertices = vertices;
        lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
    }
    return lineMesh;
},

    /**
     * 向量
     */
    createVec:function(){
        threeDimension.gruop1 = new THREE.Group();

        var m = new THREE.MeshBasicMaterial({color:'orange',transparent:true,opacity:1});
        var g = new THREE.SphereGeometry(10,20,20,0,Math.PI);
        var mesh = new THREE.Mesh(g,m);
        mesh.rotation.y = Math.PI/2 +Math.PI;
        mesh.position.x = -210;
        threeDimension.gruop1.add(mesh);

        g = new THREE.CylinderBufferGeometry(10,10,430,20,20);
        mesh = new THREE.Mesh(g,m);
        mesh.rotation.z = Math.PI/2;
        threeDimension.gruop1.add(mesh);

        g = new THREE.CylinderBufferGeometry(10,10,80,20,20);
        mesh = new THREE.Mesh(g,m);
        mesh.rotation.z = Math.PI/4;
        mesh.position.x = 200;
        mesh.position.y = 30;
        threeDimension.gruop1.add(mesh);

        g = new THREE.CylinderBufferGeometry(10,10,80,20,20);
        mesh = new THREE.Mesh(g,m);
        mesh.rotation.z = -Math.PI/4;
        mesh.position.x = 200;
        mesh.position.y = -30;

        threeDimension.gruop1.add(mesh);

        g = new THREE.SphereGeometry(13,20,20,0,2*Math.PI);
        mesh = new THREE.Mesh(g,m);
        mesh.position.x = 225;
        threeDimension.gruop1.add(mesh);

        g = new THREE.SphereGeometry(10,20,20,0,2*Math.PI);
        mesh = new THREE.Mesh(g,m);
        mesh.position.x = 170;
        mesh.position.y = 60;
        threeDimension.gruop1.add(mesh);

        g = new THREE.SphereGeometry(10,20,20,0,2*Math.PI);
        mesh = new THREE.Mesh(g,m);
        mesh.position.x = 170;
        mesh.position.y = -60;
        threeDimension.gruop1.add(mesh);

        threeDimension.scene.add(threeDimension.gruop1);


        m = new THREE.MeshBasicMaterial({color:'#fff',transparent:true,opacity:1});
        g = new THREE.SphereGeometry(6,20,20,0,2*Math.PI);
        threeDimension.mesh1 = new THREE.Mesh(g,m);
        threeDimension.mesh1.position.z = 20;
        threeDimension.mesh1.position.x = -205;
        threeDimension.scene.add(threeDimension.mesh1);


        threeDimension.mesh2 = new THREE.Group();
        var vertices =[];
        vertices.push(new THREE.Vector3(-220,0,0));
        vertices.push(new THREE.Vector3(-220,-200,0));
        var line = threeDimension.createLineMesh(vertices,'orange',2);
        threeDimension.mesh2.add(line);

        vertices =[];
        vertices.push(new THREE.Vector3(239,0,0));
        vertices.push(new THREE.Vector3(239,-200,0));
        line = threeDimension.createLineMesh(vertices,'orange',2);
        threeDimension.mesh2.add(line);

        vertices =[];
        vertices.push(new THREE.Vector3(240,-200,0));
        vertices.push(new THREE.Vector3(-220,-200,0));
        line = threeDimension.createLineMesh(vertices,'orange',3);
        threeDimension.mesh2.add(line);

        line = threeDimension.createText('A',-240,0,0,'#000');
        threeDimension.mesh2.add(line);
        line = threeDimension.createText('B',260,0,0,'#000');
        threeDimension.mesh2.add(line);

        line = threeDimension.createText('|AB|',0,-220,0,'#000');
        threeDimension.mesh2.add(line);

        for(var i=-220;i<240;i++){
            vertices =[];
            vertices.push(new THREE.Vector3(i,-192,0));
            vertices.push(new THREE.Vector3(i,-200,0));
            line = threeDimension.createLineMesh(vertices,'orange',3);
            threeDimension.mesh2.add(line);
            threeDimension.scene.add(threeDimension.mesh2);
            i+=50;
        }

        threeDimension.scene.add(threeDimension.mesh2);


        threeDimension.mesh3 = new THREE.Group();

        vertices=[];
        vertices.push(new THREE.Vector3(200,-200,0));
        vertices.push(new THREE.Vector3(-180,-200,0));
        line = threeDimension.createLineMesh(vertices,'orange',2);
        threeDimension.mesh3.add(line);

        vertices=[];
        vertices.push(new THREE.Vector3(20,0,0));
        vertices.push(new THREE.Vector3(-10,8,0));
        vertices.push(new THREE.Vector3(-10,-8,0));
        var material2 = new THREE.MeshBasicMaterial({color:'orange',transparent:true,opacity:1});
        var geom = new THREE.Geometry();
        geom.vertices = vertices;
        geom.faces.push(new THREE.Face3(0,1,2));
        geom.faces.push(new THREE.Face3(2,1,0));

        var mesh2 = new THREE.SceneUtils.createMultiMaterialObject(geom,[material2]);

        mesh2.position.x = 200;
        mesh2.position.y = -200;
        threeDimension.mesh3.add(mesh2);

        threeDimension.scene.add(threeDimension.mesh3);


        threeDimension.mesh1.visible  = false;
        threeDimension.mesh2.visible  = false;
        threeDimension.mesh3.visible  = false;



    },


    /**
     * 向量夹角
     */
    createAngle1:function(){
        threeDimension.scene.remove(threeDimension.para);
        threeDimension.scene.remove(threeDimension.equal);
        threeDimension.scene.remove(threeDimension.angle);

        threeDimension.angle = new THREE.Object3D();
        //threeDimension.cir = [];
        //创建半圆
        var json2 = threeDimension.getJson2(getParameter.length+5,180);
        var material = new THREE.LineDashedMaterial({color:0x328ad9,gapSize:20,dashSize:5});
        var geom = new THREE.Geometry();
        for(var i=0;i<json2.length;i++){
            geom.vertices.push(threeDimension.vec3([json2[i][0]],json2[i][1],0));
        }
        //geom.computeLineDistances();
        threeDimension.dashed = new THREE.LineSegments(geom,material);

        var json = threeDimension.getJson(getParameter.radius3);
        var vertices = [];
        for(i=0;i<json.length;i++){
            vertices.push(threeDimension.vec3(json[i][0],json[i][1],json[i][2]));
        }
        //创建向量
        threeDimension.line1 = threeDimension.createLine(getParameter.length+7,3,'#f39800',vertices,getParameter.radius2);
        threeDimension.line1.position.x = Math.floor(getParameter.length/2*Math.cos(Math.PI/180*getParameter.angle));
        threeDimension.line1.position.y = Math.floor(getParameter.length/2*Math.sin(Math.PI/180*getParameter.angle));
        threeDimension.line1.rotation.z = Math.PI/180*getParameter.angle;

        threeDimension.text1.position.x = Math.floor(getParameter.length/2*Math.cos(Math.PI/180*getParameter.angle));
        if(getParameter.angle < 90){
            threeDimension.text1.position.y = Math.floor(getParameter.length/2*Math.sin(Math.PI/180*getParameter.angle)) + 30;
        }else{
            threeDimension.text1.position.y = Math.floor(getParameter.length/2*Math.sin(Math.PI/180*getParameter.angle)) - 5;
        }


        threeDimension.line2 = threeDimension.createLine(getParameter.length+7,3,'#f39800',vertices,getParameter.radius2);
        threeDimension.line2.position.x = getParameter.length/2;
        threeDimension.line2.position.y = 0;
        //创建圆点
        var materialCir = new THREE.MeshBasicMaterial({color:'#f39800',transparent:true,opacity:0.3});
        var cir = new THREE.CircleGeometry(24,36,36);
        var mesh1 = new THREE.Mesh(cir,materialCir);



        materialCir = new THREE.MeshBasicMaterial({color:'#f39800',transparent:true,opacity:0.3});
        cir = new THREE.CircleGeometry(24,36,36);
        var mesh2 = new THREE.Mesh(cir,materialCir);
        threeDimension.cir.push(mesh1,mesh2);



        for(i=0;i<2;i++){
            threeDimension.cir[i].position.set(getParameter.angleJson3[0][0]+3,getParameter.angleJson3[0][1]+3,3);
            threeDimension.cir[i].name = i;
        }

        threeDimension.spheres1[0].position.set(getParameter.angleJson3[0][0]+3,getParameter.angleJson3[0][1]+3,3);
        threeDimension.spheres1[1].position.set(getParameter.angleJson3[0][0]+3,getParameter.angleJson3[0][1]+3,3);


        var textA = new THREE.Group();
        var line = threeDimension.createText('a',0,0,0,'#000');
        textA.add(line);
        line = threeDimension.createText('→',0,10,0,'#000');
        textA.add(line);

        textA.position.set(getParameter.angleJson3[0][0]/2-40,getParameter.angleJson3[0][1]/2,0);


        var textB = new THREE.Group();
        line = threeDimension.createText('b',0,0,0,'#000');
        textB.add(line);
        line = threeDimension.createText('→',0,10,0,'#000');
        textB.add(line);

        textB.position.set(100,-20,0);

        threeDimension.texts =[];

        threeDimension.texts.push(textA);

        $('#angle').text('30°');



        threeDimension.angle.add(threeDimension.dashed,threeDimension.line1,threeDimension.line2,threeDimension.cir[0],textA,textB);
        //threeDimension.scene.add(threeDimension.angle);
    },
    //创建小圆表示角度
    createAngle2:function(){
        if(threeDimension.ang){
            threeDimension.scene.remove(threeDimension.ang);
        }
        var json = threeDimension.getJson2(30,getParameter.angle);
        var materialAng = new THREE.LineBasicMaterial({color:'#f39800'});
        var geom = new THREE.Geometry();
        for(var i=0;i<json.length;i++){
            geom.vertices.push(threeDimension.vec3([json[i][0]],json[i][1],0));
        }
        threeDimension.ang = new THREE.Line(geom,materialAng);
        //threeDimension.scene.add(threeDimension.ang);
    },
    createAngle3:function(){
        if(threeDimension.text1){
            threeDimension.scene.remove(threeDimension.text1);
        }
        if(threeDimension.text2){
            threeDimension.scene.remove(threeDimension.text2);
        }
        threeDimension.text2 = threeDimension.createText("b",150,-5,0,"#000000");
        threeDimension.text1 = threeDimension.createText("a",150,20,0,"#000000");

    },
    createThAn:function(){
        threeDimension.angleTh = threeDimension.createText("θ",40,20,0,"#f39800");
        threeDimension.scene.add(threeDimension.angleTh);
    },


    /**
     *平行向量
     */
    createPara:function(){
        threeDimension.scene.remove(threeDimension.angle,threeDimension.ang);
        threeDimension.scene.remove(threeDimension.equal);
        threeDimension.scene.remove(threeDimension.para);

        threeDimension.para = new THREE.Object3D();

        /*var json = threeDimension.getJson(getParameter.radius2);
         var vertices = [];
         for(var i=0;i<json.length;i++){
         vertices.push(threeDimension.vec3(json[i][0],json[i][1],json[i][2]));
         }
         threeDimension.line1 = threeDimension.createLine(getParameter.length*2,3,0x328ad9,vertices,getParameter.radius2);
         threeDimension.line1.position.y = -50;

         threeDimension.line2 = threeDimension.createLine(getParameter.length,3,0x328ad9,vertices,getParameter.radius2);
         threeDimension.line2.position.x = getParameter.length/2;
         threeDimension.line2.position.y = 0;*/

        var json = threeDimension.getJson(getParameter.radius3);
        var vertices = [];
        for(var i=0;i<json.length;i++){
            vertices.push(threeDimension.vec3(json[i][0],json[i][1],json[i][2]));
        }
        threeDimension.line1 = threeDimension.createLine2(getParameter.length2*2-1.5*getParameter.radius2,getParameter.length2*2-getParameter.radius2,vertices,'#328ad9');
        threeDimension.line1.position.x = -getParameter.length2;
        threeDimension.line1.position.y = -100;

        threeDimension.line2 = threeDimension.createLine2(getParameter.length2-1.5*getParameter.radius2,getParameter.length2-getParameter.radius2,vertices,'#f39800');

        threeDimension.cir[0].position.set(getParameter.length+10,0,0);
        threeDimension.spheres1[0].position.set(getParameter.length+10,0,0);
        threeDimension.spheres1[1].position.set(getParameter.length+10,0,0);

        if(threeDimension.text1){
            threeDimension.scene.remove(threeDimension.text1);
        }
        threeDimension.text1 = threeDimension.createText("a",150,20,0,"#f4a31a");
        threeDimension.text1.position.set(100,25,0);
        threeDimension.text2 = threeDimension.createText("b",150,20,0,"#328ad9");
        threeDimension.text2.position.set(0,-75,0);

        threeDimension.text3 = threeDimension.createText("→",150,20,0,"#f4a31a");
        threeDimension.text4 = threeDimension.createText("→",150,20,0,"#328ad9");
        threeDimension.text3.position.set(100,40,0);
        threeDimension.text4.position.set(0,-60,0);
        threeDimension.scene.add(threeDimension.text3);
        threeDimension.scene.add(threeDimension.text4);


        var material = new THREE.LineDashedMaterial({color:0x000000,gapSize:10,dashSize:5});
        var geom = new THREE.Geometry();
        geom.vertices.push(threeDimension.vec3(-700,0,0),threeDimension.vec3(700,0,0));
        geom.computeLineDistances();
        threeDimension.dashed2 = new THREE.Line(geom,material);

        threeDimension.para.add(threeDimension.line1,threeDimension.line2,threeDimension.text1,threeDimension.text2,threeDimension.cir[0],threeDimension.dashed2);
        threeDimension.scene.add(threeDimension.para);



    },

    /**
     *相等向量
     */
    createEqual:function(){
        threeDimension.scene.remove(threeDimension.angle,threeDimension.ang);
        threeDimension.scene.remove(threeDimension.para);
        threeDimension.scene.remove(threeDimension.equal);
        if(threeDimension.text1){
            threeDimension.scene.remove(threeDimension.text1);
            threeDimension.scene.remove(threeDimension.text2);
        }
        threeDimension.text1 = threeDimension.createText("a",150,20,0,"#f4a31a");
        threeDimension.text2 = threeDimension.createText("b",150,20,0,"#65a7e2");




        threeDimension.equal = new THREE.Object3D();

        var json = threeDimension.getJson(getParameter.radius2);
        var vertices = [];
        for(var i=0;i<json.length;i++){
            vertices.push(threeDimension.vec3(json[i][0],json[i][1],json[i][2]));
        }

        threeDimension.line1 = new THREE.Group();
        vertices = [];
        vertices.push(new THREE.Vector3(json3[0][0][0],json3[0][0][1],json3[0][0][2]));
        vertices.push(new THREE.Vector3(json3[0][1][0],json3[0][1][1],json3[0][1][2]));
        var line = threeDimension.createLineMesh(vertices,'#f39800',3);
        threeDimension.line1.add(line);


        threeDimension.line2 = new THREE.Group();
        vertices = [];
        vertices.push(new THREE.Vector3(json3[1][0][0],json3[1][0][1],json3[1][0][2]));
        vertices.push(new THREE.Vector3(json3[1][1][0],json3[1][1][1],json3[1][1][2]));
        var line = threeDimension.createLineMesh(vertices,0x328ad9,3);
        threeDimension.line2.add(line);

        threeDimension.cir[0].position.set(getParameter.length+15,50,0);
        threeDimension.cir[1].visible =true;
        threeDimension.cir[1].position.x = json3[0][0][0];
        threeDimension.cir[1].position.y = 50;


        threeDimension.spheres1[0].position.set(getParameter.length+15,50,0);
        threeDimension.spheres1[1].position.set(getParameter.length+15,50,0);
        threeDimension.spheres1[2].position.set(json3[0][0][0],50,0);
        threeDimension.spheres1[3].position.set(json3[0][0][0],50,0);

        //threeDimension.cir[1].position.set(getParameter.length,-50,0);
        threeDimension.text1.position.set(0,75,0);
        threeDimension.text2.position.set(0,-25,0);

        threeDimension.text3 = threeDimension.createText("→",0,90,0,"#f4a31a");
        threeDimension.text4 = threeDimension.createText("→",0,-10,0,"#65a7e2");
        // threeDimension.text3.position.set(0,40,0);
        // threeDimension.text4.position.set(0,-60,0);
        threeDimension.scene.add(threeDimension.text3);
        threeDimension.scene.add(threeDimension.text4);

        threeDimension.equal.add(threeDimension.line1,threeDimension.line2,threeDimension.text1,threeDimension.text2,threeDimension.cir[0],threeDimension.cir[1]);
        threeDimension.scene.add(threeDimension.equal);




    },
    onDocumentMouseDown:function(event){
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
        raycaster.setFromCamera(mouse, threeDimension.camera);
        var intersects = raycaster.intersectObjects(threeDimension.cir);
        if (intersects.length > 0) {
            threeDimension.selectSphere = intersects[0].object;
            intersects[0].object.material.opacity = 0.3;
        }
    },
    onDocumentMouseMove:function (event) { //鼠标移动事件，坐标转换
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

        var intersects = raycaster.intersectObjects( threeDimension.cir );
        if ( intersects.length > 0 ) {
            plane.setFromNormalAndCoplanarPoint(threeDimension.camera.getWorldDirection( plane.normal ),intersects[ 0 ].object.position );
        }
        raycaster.setFromCamera( mouse, threeDimension.camera );
        if(threeDimension.selectSphere){
            if ( raycaster.ray.intersectPlane( plane, intersection ) ) {

                if(flag == 1){

                    //圆点行为

                    x = intersection.x;
                    y = intersection.y;


                    if(x > 260 || x < -260){

                        if(y < 0){
                            y = 0;
                        }

                        x = Math.sqrt(Math.pow(getParameter.length+5,2) - Math.pow(y,2));
                        y = intersection.y;

                        if(intersection.x < 0){
                            x  = -x;
                        }
                    }else{
                        y = Math.sqrt(Math.pow(getParameter.length+5,2) - Math.pow(x,2));
                    }

                    if(y <0){
                        y = 0;
                    }


                    threeDimension.cir[0].position.set(x,y,10);
                    threeDimension.spheres1[0].position.set(x,y,10);
                    threeDimension.spheres1[1].position.set(x,y,10);


                     

                    //角度改变
                    var angle1 = Math.atan2(y,x)*180;
                    var angle = angle1/Math.PI;
                    threeDimension.texts[0].position.set(1.2*(getParameter.angleJson3[0][0]/2-40)*Math.cos(angle/180*Math.PI),1.2*(getParameter.angleJson3[0][0]/2-40)*Math.sin(angle/180*Math.PI)+30,0);

                    $('#angle').text(angle.toFixed(1)+'°');


                    getParameter.angle = angle;
                    $("#angle-num").text(getParameter.angle.toFixed(0));
                    threeDimension.createAngle2();
                    // threeDimension.angleTh.text = angle.toFixed(1)+'°';
                    threeDimension.angleTh.position.x = (30-x/10)/2+x/10;
                    threeDimension.angleTh.position.y = (30-y/10)/2+y/10;

                    threeDimension.line1.position.x = Math.floor(getParameter.length/2*Math.cos(Math.PI/180*getParameter.angle));
                    threeDimension.line1.position.y = Math.floor(getParameter.length/2*Math.sin(Math.PI/180*getParameter.angle));
                    threeDimension.line1.rotation.z = Math.PI/180*getParameter.angle;

                    threeDimension.text1.position.x = Math.floor(getParameter.length/2*Math.cos(Math.PI/180*getParameter.angle));
                    if(getParameter.angle < 90){
                        threeDimension.text1.position.y = Math.floor(getParameter.length/2*Math.sin(Math.PI/180*getParameter.angle)) + 30;
                    }else{
                        threeDimension.text1.position.y = Math.floor(getParameter.length/2*Math.sin(Math.PI/180*getParameter.angle)) - 5;
                    }

                    threeDimension.createAngle2();
                    threeDimension.scene.add(threeDimension.ang);

                }

                if(flag == 2){

                    if(intersection.x > 700){
                        intersection.x = 700;
                    }
                    if(intersection.x < -700){
                        intersection.x = -700;
                    }

                    threeDimension.para.remove(threeDimension.line2);
                    threeDimension.scene.remove(threeDimension.line2);
                    var json = threeDimension.getJson(getParameter.radius3);
                    var x1 = json[0][0],x2 = json[1][0],x3 = json[2][0];
                    if(intersection.x < 0){
                        json[0][0] = -x1;
                        json[1][0] = -x2;
                        json[2][0] = -x3;
                        var vertices = [];
                        for(var i=0;i<json.length;i++){
                            vertices.push(threeDimension.vec3(json[i][0],json[i][1],json[i][2]));
                        }
                        threeDimension.line2 = threeDimension.createLine2(intersection.x+1.5*getParameter.radius2,intersection.x+getParameter.radius2,vertices,'#f39800');
                        threeDimension.scene.add(threeDimension.line2);
                        threeDimension.cir[0].position.x = intersection.x-10;

                        threeDimension.spheres1[0].position.set(intersection.x-10,0,0);
                        threeDimension.spheres1[1].position.set(intersection.x-10,0,0);
                    }else if(intersection.x > 0){
                        json[0][0] = x1;
                        json[1][0] = x2;
                        json[2][0] = x3;
                        vertices = [];
                        for(i=0;i<json.length;i++){
                            vertices.push(threeDimension.vec3(json[i][0],json[i][1],json[i][2]));
                        }
                        threeDimension.line2 = threeDimension.createLine2(intersection.x-1.5*getParameter.radius2,intersection.x-getParameter.radius2,vertices,'#f39800');
                        threeDimension.scene.add(threeDimension.line2);
                        threeDimension.cir[0].position.x = intersection.x+10;
                        threeDimension.spheres1[0].position.set(intersection.x+10,0,0);
                        threeDimension.spheres1[1].position.set(intersection.x+10,0,0);

                    }else{

                        threeDimension.para.remove(threeDimension.line2);
                        threeDimension.scene.remove(threeDimension.line2);
                    }

                    threeDimension.text1.position.x = intersection.x/2;
                    threeDimension.text3.position.x = intersection.x/2;


                }

                if(flag == 3){

                    var x,y,angle;

                    threeDimension.equal.remove(threeDimension.line1);
                    threeDimension.equal.remove(threeDimension.line2);

                    if(threeDimension.selectSphere.name == '1'){ //左边
                        json3[0][0][0] = intersection.x;
                        json3[0][0][1] = intersection.y;

                        x = json3[0][0][0] - json3[1][0][0];
                        y = json3[0][0][1] - json3[1][0][1];

                        json3[1][1][0] = json3[0][1][0] -x;
                        json3[1][1][1] = json3[0][1][1] -y;


                    }else if(threeDimension.selectSphere.name == '0'){ //右
                        json3[0][1][0] = intersection.x;
                        json3[0][1][1] = intersection.y;


                        x = json3[0][0][0] - json3[1][0][0];
                        y = json3[0][0][1] - json3[1][0][1];

                        json3[1][1][0] = json3[0][1][0] -x;
                        json3[1][1][1] = json3[0][1][1] -y;
                    }

                    //var json3 =[[[-300,50,0],[300,50,0]],[[300,-50,0],[-300,-50,0]]];


                    var angle1 = Math.atan((json3[0][1][1]-json3[0][0][1])/(json3[0][1][0]-json3[0][0][0]));

                    if(json3[0][1][0] < json3[0][0][0]){
                        arrb.rotation.z = arra.rotation.z = Math.PI+angle1;
                        x = 15*Math.sin( Math.PI+angle1);
                        y = 15*Math.cos( Math.PI+angle1);
                    }else{
                        arrb.rotation.z = arra.rotation.z = angle1;
                        x = 15*Math.sin(angle1);
                        y = 15*Math.cos(angle1);
                    }


                    threeDimension.line1 = new THREE.Group();
                    vertices = [];
                    vertices.push(new THREE.Vector3(json3[0][0][0],json3[0][0][1],json3[0][0][2]));
                    vertices.push(new THREE.Vector3(json3[0][1][0]-y,json3[0][1][1]-x,json3[0][1][2]));
                    var line = threeDimension.createLineMesh(vertices,'#f39800',3);
                    threeDimension.line1.add(line);


                    threeDimension.line2 = new THREE.Group();
                    vertices = [];
                    vertices.push(new THREE.Vector3(json3[1][0][0],json3[1][0][1],json3[1][0][2]));
                    vertices.push(new THREE.Vector3(json3[1][1][0]-y,json3[1][1][1]-x,json3[1][1][2]));
                    line = threeDimension.createLineMesh(vertices,0x328ad9,3);
                    threeDimension.line2.add(line);


                    threeDimension.equal.add(threeDimension.line1,threeDimension.line2);


                    threeDimension.text1.position.x = json3[0][0][0] +(json3[0][1][0]-json3[0][0][0])/2;
                    threeDimension.text1.position.y = json3[0][0][1] +(json3[0][1][1]-json3[0][0][1])/2;
                    threeDimension.text3.position.x = json3[0][0][0] +(json3[0][1][0]-json3[0][0][0])/2;
                    threeDimension.text3.position.y = json3[0][0][1] +(json3[0][1][1]-json3[0][0][1])/2+10;


                    threeDimension.text2.position.x = json3[1][0][0] +(json3[1][1][0]-json3[1][0][0])/2;
                    threeDimension.text2.position.y = json3[1][0][1] +(json3[1][1][1]-json3[1][0][1])/2;
                    threeDimension.text4.position.x = json3[1][0][0] +(json3[1][1][0]-json3[1][0][0])/2;
                    threeDimension.text4.position.y = json3[1][0][1] +(json3[1][1][1]-json3[1][0][1])/2+10;






                    arra.position.x = json3[0][1][0]-y;
                    arra.position.y = json3[0][1][1]-x;

                    arrb.position.x = json3[1][1][0]-y;
                    arrb.position.y = json3[1][1][1]-x;




                    if(threeDimension.selectSphere.name == '1'){
                        threeDimension.cir[1].position.x = json3[0][0][0];
                        threeDimension.cir[1].position.y = json3[0][0][1];


                        threeDimension.spheres1[2].position.x = json3[0][0][0];
                        threeDimension.spheres1[2].position.y= json3[0][0][1];
                        threeDimension.spheres1[3].position.x = json3[0][0][0];
                        threeDimension.spheres1[3].position.y= json3[0][0][1];

                    }else{
                        threeDimension.cir[0].position.x = json3[0][1][0];
                        threeDimension.cir[0].position.y = json3[0][1][1];

                        threeDimension.spheres1[0].position.x = json3[0][1][0];
                        threeDimension.spheres1[0].position.y= json3[0][1][1];
                        threeDimension.spheres1[1].position.x = json3[0][1][0];
                        threeDimension.spheres1[1].position.y= json3[0][1][1];


                    }





                }

            }
        }

    },
    onDocumentMouseUp:function (event){ //鼠标离开obj或者up时的事件，移除透明度
        event.preventDefault();
        if(threeDimension.selectSphere){
            threeDimension.selectSphere.material.opacity = 0.3;
        }
        threeDimension.selectSphere = null;
    },
    onDocumentTouchStart:function(event){
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
            raycaster.setFromCamera(mouse, threeDimension.camera);
            var intersects = raycaster.intersectObjects(threeDimension.cir);
            if (intersects.length > 0) {
                threeDimension.selectSphere = intersects[0].object;
                intersects[0].object.material.opacity = 0.3;
            }
        }
    },
    onDocumentTouchMove:function (event) { //鼠标移动事件，坐标转换
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

            var intersects = raycaster.intersectObjects( threeDimension.cir );



            if ( intersects.length > 0 ) {
                plane.setFromNormalAndCoplanarPoint(threeDimension.camera.getWorldDirection( plane.normal ),intersects[ 0 ].object.position );
            }
            raycaster.setFromCamera( mouse, threeDimension.camera );
            if(threeDimension.selectSphere){
                if ( raycaster.ray.intersectPlane( plane, intersection ) ) {

                    if(flag == 1){
                        //圆点行为

                        x = intersection.x;
                        y = intersection.y;


                        if(x > 260 || x < -260){

                            if(y < 0){
                                y = 0;
                            }

                            x = Math.sqrt(Math.pow(getParameter.length+5,2) - Math.pow(y,2));
                            y = intersection.y;

                            if(intersection.x < 0){
                                x  = -x;
                            }
                        }else{
                            y = Math.sqrt(Math.pow(getParameter.length+5,2) - Math.pow(x,2));
                        }

                        if(y <0){
                            y = 0;
                        }


                        threeDimension.cir[0].position.set(x,y,10);
                        threeDimension.spheres1[0].position.set(x,y,10);
                        threeDimension.spheres1[1].position.set(x,y,10);


                        // threeDimension.texts[0].position.set(parseInt(intersection.x)/2-40,parseInt(y)/2,0);

                        //角度改变
                        var angle1 = Math.atan2(y,x)*180;
                        var angle = angle1/Math.PI;
                        threeDimension.texts[0].position.set(1.2*(getParameter.angleJson3[0][0]/2-40)*Math.cos(angle/180*Math.PI),1.2*(getParameter.angleJson3[0][0]/2-40)*Math.sin(angle/180*Math.PI)+30,0);

                        $('#angle').text(angle.toFixed(1)+'°');


                        getParameter.angle = angle;
                        $("#angle-num").text(getParameter.angle.toFixed(0));
                        threeDimension.createAngle2();
                        // threeDimension.angleTh.text = angle.toFixed(1)+'°';
                        threeDimension.angleTh.position.x = (30-x/10)/2+x/10;
                        threeDimension.angleTh.position.y = (30-y/10)/2+y/10;

                        threeDimension.line1.position.x = Math.floor(getParameter.length/2*Math.cos(Math.PI/180*getParameter.angle));
                        threeDimension.line1.position.y = Math.floor(getParameter.length/2*Math.sin(Math.PI/180*getParameter.angle));
                        threeDimension.line1.rotation.z = Math.PI/180*getParameter.angle;

                        threeDimension.text1.position.x = Math.floor(getParameter.length/2*Math.cos(Math.PI/180*getParameter.angle));
                        if(getParameter.angle < 90){
                            threeDimension.text1.position.y = Math.floor(getParameter.length/2*Math.sin(Math.PI/180*getParameter.angle)) + 30;
                        }else{
                            threeDimension.text1.position.y = Math.floor(getParameter.length/2*Math.sin(Math.PI/180*getParameter.angle)) - 5;
                        }

                        threeDimension.createAngle2();
                        threeDimension.scene.add(threeDimension.ang);

                    }

                    if(flag == 2){

                        if(intersection.x > 700){
                            intersection.x = 700;
                        }
                        if(intersection.x < -700){
                            intersection.x = -700;
                        }

                        threeDimension.para.remove(threeDimension.line2);
                        threeDimension.scene.remove(threeDimension.line2);
                        var json = threeDimension.getJson(getParameter.radius3);
                        var x1 = json[0][0],x2 = json[1][0],x3 = json[2][0];
                        if(intersection.x < 0){
                            json[0][0] = -x1;
                            json[1][0] = -x2;
                            json[2][0] = -x3;
                            var vertices = [];
                            for(var i=0;i<json.length;i++){
                                vertices.push(threeDimension.vec3(json[i][0],json[i][1],json[i][2]));
                            }
                            threeDimension.line2 = threeDimension.createLine2(intersection.x+1.5*getParameter.radius2,intersection.x+getParameter.radius2,vertices,'#f39800');
                            threeDimension.scene.add(threeDimension.line2);
                            threeDimension.cir[0].position.x = intersection.x-10;

                            threeDimension.spheres1[0].position.set(intersection.x-10,0,0);
                            threeDimension.spheres1[1].position.set(intersection.x-10,0,0);
                        }else if(intersection.x > 0){
                            json[0][0] = x1;
                            json[1][0] = x2;
                            json[2][0] = x3;
                            vertices = [];
                            for(i=0;i<json.length;i++){
                                vertices.push(threeDimension.vec3(json[i][0],json[i][1],json[i][2]));
                            }
                            threeDimension.line2 = threeDimension.createLine2(intersection.x-1.5*getParameter.radius2,intersection.x-getParameter.radius2,vertices,'#f39800');
                            threeDimension.scene.add(threeDimension.line2);
                            threeDimension.cir[0].position.x = intersection.x+10;
                            threeDimension.spheres1[0].position.set(intersection.x+10,0,0);
                            threeDimension.spheres1[1].position.set(intersection.x+10,0,0);

                        }else{

                            threeDimension.para.remove(threeDimension.line2);
                            threeDimension.scene.remove(threeDimension.line2);
                        }

                        threeDimension.text1.position.x = intersection.x/2;
                        threeDimension.text3.position.x = intersection.x/2;


                    }

                    if(flag == 3){

                        var x,y,angle;

                        threeDimension.equal.remove(threeDimension.line1);
                        threeDimension.equal.remove(threeDimension.line2);

                        if(threeDimension.selectSphere.name == '1'){ //左边
                            json3[0][0][0] = intersection.x;
                            json3[0][0][1] = intersection.y;

                            x = json3[0][0][0] - json3[1][0][0];
                            y = json3[0][0][1] - json3[1][0][1];

                            json3[1][1][0] = json3[0][1][0] -x;
                            json3[1][1][1] = json3[0][1][1] -y;


                        }else if(threeDimension.selectSphere.name == '0'){ //右
                            json3[0][1][0] = intersection.x;
                            json3[0][1][1] = intersection.y;


                            x = json3[0][0][0] - json3[1][0][0];
                            y = json3[0][0][1] - json3[1][0][1];

                            json3[1][1][0] = json3[0][1][0] -x;
                            json3[1][1][1] = json3[0][1][1] -y;
                        }

                        //var json3 =[[[-300,50,0],[300,50,0]],[[300,-50,0],[-300,-50,0]]];


                        var angle1 = Math.atan((json3[0][1][1]-json3[0][0][1])/(json3[0][1][0]-json3[0][0][0]));

                        if(json3[0][1][0] < json3[0][0][0]){
                            arrb.rotation.z = arra.rotation.z = Math.PI+angle1;
                            x = 15*Math.sin( Math.PI+angle1);
                            y = 15*Math.cos( Math.PI+angle1);
                        }else{
                            arrb.rotation.z = arra.rotation.z = angle1;
                            x = 15*Math.sin(angle1);
                            y = 15*Math.cos(angle1);
                        }


                        threeDimension.line1 = new THREE.Group();
                        vertices = [];
                        vertices.push(new THREE.Vector3(json3[0][0][0],json3[0][0][1],json3[0][0][2]));
                        vertices.push(new THREE.Vector3(json3[0][1][0]-y,json3[0][1][1]-x,json3[0][1][2]));
                        var line = threeDimension.createLineMesh(vertices,'#f39800',3);
                        threeDimension.line1.add(line);


                        threeDimension.line2 = new THREE.Group();
                        vertices = [];
                        vertices.push(new THREE.Vector3(json3[1][0][0],json3[1][0][1],json3[1][0][2]));
                        vertices.push(new THREE.Vector3(json3[1][1][0]-y,json3[1][1][1]-x,json3[1][1][2]));
                        line = threeDimension.createLineMesh(vertices,0x328ad9,3);
                        threeDimension.line2.add(line);


                        threeDimension.equal.add(threeDimension.line1,threeDimension.line2);


                        threeDimension.text1.position.x = json3[0][0][0] +(json3[0][1][0]-json3[0][0][0])/2;
                        threeDimension.text1.position.y = json3[0][0][1] +(json3[0][1][1]-json3[0][0][1])/2;
                        threeDimension.text3.position.x = json3[0][0][0] +(json3[0][1][0]-json3[0][0][0])/2;
                        threeDimension.text3.position.y = json3[0][0][1] +(json3[0][1][1]-json3[0][0][1])/2+10;


                        threeDimension.text2.position.x = json3[1][0][0] +(json3[1][1][0]-json3[1][0][0])/2;
                        threeDimension.text2.position.y = json3[1][0][1] +(json3[1][1][1]-json3[1][0][1])/2;
                        threeDimension.text4.position.x = json3[1][0][0] +(json3[1][1][0]-json3[1][0][0])/2;
                        threeDimension.text4.position.y = json3[1][0][1] +(json3[1][1][1]-json3[1][0][1])/2+10;






                        arra.position.x = json3[0][1][0]-y;
                        arra.position.y = json3[0][1][1]-x;

                        arrb.position.x = json3[1][1][0]-y;
                        arrb.position.y = json3[1][1][1]-x;




                        if(threeDimension.selectSphere.name == '1'){
                            threeDimension.cir[1].position.x = json3[0][0][0];
                            threeDimension.cir[1].position.y = json3[0][0][1];


                            threeDimension.spheres1[2].position.x = json3[0][0][0];
                            threeDimension.spheres1[2].position.y= json3[0][0][1];
                            threeDimension.spheres1[3].position.x = json3[0][0][0];
                            threeDimension.spheres1[3].position.y= json3[0][0][1];

                        }else{
                            threeDimension.cir[0].position.x = json3[0][1][0];
                            threeDimension.cir[0].position.y = json3[0][1][1];

                            threeDimension.spheres1[0].position.x = json3[0][1][0];
                            threeDimension.spheres1[0].position.y= json3[0][1][1];
                            threeDimension.spheres1[1].position.x = json3[0][1][0];
                            threeDimension.spheres1[1].position.y= json3[0][1][1];


                        }





                    }

                }
            }
        }
    },
    onDocumentTouchEnd:function (event){ //鼠标离开obj或者up时的事件，移除透明度
        event.preventDefault();
        if(threeDimension.selectSphere){
            threeDimension.selectSphere.material.opacity = 0.3;
        }
        threeDimension.selectSphere = null;
    },
    createLineArrow:function (arrow,coordinate,color){

        var vertices =[];
        if(arrow == 1){             //朝右
            vertices.push(new THREE.Vector3(-5,7,0));
            vertices.push(new THREE.Vector3(10,0,0));
            vertices.push(new THREE.Vector3(-5,-7,0));
        }

        var material2 = new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:0.9});
        var geom = new THREE.Geometry();
        geom.vertices = vertices;
        geom.faces.push(new THREE.Face3(0,1,2));
        geom.faces.push(new THREE.Face3(2,1,0));
        var obj = new THREE.SceneUtils.createMultiMaterialObject(geom,[material2]);

        obj.position.x = coordinate[0];
        obj.position.y = coordinate[1];
        obj.position.z = coordinate[2];

        return obj;
    }
    /**
     *
     */


};
threeDimension.init();

//鼠标点击，选中顶点
threeDimension.renderer.domElement.addEventListener( 'mousedown', threeDimension.onDocumentMouseDown, false );
threeDimension.renderer.domElement.addEventListener( 'mousemove', threeDimension.onDocumentMouseMove, false );
threeDimension.renderer.domElement.addEventListener( 'mouseup', threeDimension.onDocumentMouseUp, false );
threeDimension.renderer.domElement.addEventListener( 'touchstart', threeDimension.onDocumentTouchStart, false );
threeDimension.renderer.domElement.addEventListener( 'touchmove', threeDimension.onDocumentTouchMove, false );
threeDimension.renderer.domElement.addEventListener( 'touchend', threeDimension.onDocumentTouchEnd, false );


//重置事件
function renderAll(){
    //threeDimension.controls.update();

    requestAnimationFrame(renderAll);
    threeDimension.renderer.render(threeDimension.scene,threeDimension.camera);
}
renderAll();

function repart(){
    threeDimension.gruop1.visible =false;
    threeDimension.mesh1.visible =false;
    threeDimension.mesh2.visible =false;
    threeDimension.mesh3.visible =false;
}

clearInterval(a);




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
function renewEve(){

    clearInterval(a);
    repart();
    for(var i=0;i<7;i++){
        chk[i]= false;
    }
    threeDimension.scene.remove(threeDimension.angle,threeDimension.ang,threeDimension.para,threeDimension.equal,threeDimension.text1,threeDimension.text2);
    threeDimension.scene.remove(threeDimension.angleTh);
    threeDimension.scene.remove(threeDimension.text3);
    threeDimension.scene.remove(threeDimension.text4);
    threeDimension.scene.remove(threeDimension.line2);

    threeDimension.gruop1.visible =true;
    threeDimension.mesh1.visible =true;
    threeDimension.mesh2.visible =false;
    threeDimension.mesh3.visible =false;


    $('.dynamic').removeClass('on');
    $('.dynamic1').addClass('on');



    arra.visible =false;
    arrb.visible =false;
}
function dynamicEve(){
    var dataId = $(this).attr('data-id');
    if($(this).hasClass('on') || (!dataId)){
        return;
    }else{
        $('.dynamic').removeClass('on');
        $(this).addClass('on');

        if(dataId == 1){
            clearInterval(a);

            for(var i=0;i<7;i++){
                chk[i]= false;
            }
            chk[1] = true;
            threeDimension.scene.remove(threeDimension.angle,threeDimension.ang,threeDimension.para,threeDimension.equal,threeDimension.text1,threeDimension.text2);
            threeDimension.scene.remove(threeDimension.angleTh);
            threeDimension.scene.remove(threeDimension.text3);
            threeDimension.scene.remove(threeDimension.text4);
            threeDimension.scene.remove(threeDimension.line2);

            arra.visible =false;
            arrb.visible =false;

            threeDimension.gruop1.visible =true;
            threeDimension.mesh1.visible =true;
            threeDimension.mesh2.visible =false;
            threeDimension.mesh3.visible =false;

            $('.angle').css('display','none');
            threeDimension.spheres1[0].visible = threeDimension.spheres1[1].visible = threeDimension.spheres1[2].visible = threeDimension.spheres1[3].visible = false;


            $('.title').text('向量的起点');
            $('.dynamic1').addClass('on');

        }else if(dataId == 2){
            clearInterval(a);

            for(var i=0;i<7;i++){
                chk[i]= false;
            }
            chk[2] = true;
            threeDimension.scene.remove(threeDimension.angle,threeDimension.ang,threeDimension.para,threeDimension.equal,threeDimension.text1,threeDimension.text2);
            threeDimension.scene.remove(threeDimension.angleTh);
            threeDimension.scene.remove(threeDimension.text3);
            threeDimension.scene.remove(threeDimension.text4);
            threeDimension.scene.remove(threeDimension.line2);


            arra.visible =false;
            arrb.visible =false;

            threeDimension.gruop1.visible =true;
            threeDimension.mesh1.visible =false;
            threeDimension.mesh2.visible =true;
            threeDimension.mesh3.visible =false;

            $('.angle').css('display','none');
            threeDimension.spheres1[0].visible = threeDimension.spheres1[1].visible = threeDimension.spheres1[2].visible = threeDimension.spheres1[3].visible = false;

            $('.title').text('向量的长度');
            $('.dynamic1').addClass('on');

        }else if(dataId == 3){
            clearInterval(a);

            for(var i=0;i<7;i++){
                chk[i]= false;
            }
            chk[3] = true;
            threeDimension.scene.remove(threeDimension.angle,threeDimension.ang,threeDimension.para,threeDimension.equal,threeDimension.text1,threeDimension.text2);
            threeDimension.scene.remove(threeDimension.angleTh);
            threeDimension.scene.remove(threeDimension.text3);
            threeDimension.scene.remove(threeDimension.text4);
            threeDimension.scene.remove(threeDimension.line2);

            threeDimension.gruop1.visible =true;
            threeDimension.mesh1.visible =false;
            threeDimension.mesh2.visible =false;
            threeDimension.mesh3.visible =true;

            threeDimension.spheres1[0].visible = threeDimension.spheres1[1].visible = threeDimension.spheres1[2].visible = threeDimension.spheres1[3].visible = false;
            arra.visible =false;
            arrb.visible =false;

            $('.angle').css('display','none');
            $('.title').text('向量的方向');
            $('.dynamic1').addClass('on');

        }else if(dataId == 4){
            flag = 1;
            clearInterval(a);
            repart();
            for(var i=0;i<7;i++){
                chk[i]= false;
            }
            chk[4] = true;

            getParameter.angle = 30;
            threeDimension.scene.remove(threeDimension.text3);
            threeDimension.scene.remove(threeDimension.text4);
            threeDimension.scene.remove(threeDimension.line2);
            threeDimension.createAngle3();
            threeDimension.createAngle1();
            threeDimension.createAngle2();
            threeDimension.createThAn();
            threeDimension.scene.add(threeDimension.angle);
            threeDimension.scene.add(threeDimension.ang);

            arra.visible =false;
            arrb.visible =false;

            threeDimension.spheres1[0].visible = threeDimension.spheres1[1].visible = true;
            threeDimension.spheres1[2].visible = threeDimension.spheres1[3].visible = false;

            $('.angle').css('display','block');
            $('.title').text('向量夹角');


        }else if(dataId == 5){
            flag = 2;
            clearInterval(a);
            repart();
            for(var i=0;i<7;i++){
                chk[i]= false;
            }
            chk[5] = true;

            threeDimension.scene.remove(threeDimension.angleTh);
            threeDimension.scene.remove(threeDimension.text3);
            threeDimension.scene.remove(threeDimension.text4);

            threeDimension.createPara();

            arra.visible =false;
            arrb.visible =false;

            $('.angle').css('display','none');

            threeDimension.spheres1[0].visible = threeDimension.spheres1[1].visible = true;
            threeDimension.spheres1[2].visible = threeDimension.spheres1[3].visible = false;

            $('.title').text('平行向量');

        }else if(dataId == 6){
            json3 =[[[-300,50,0],[300,50,0]],[[-300,-50,0],[300,-50,0]]];
            flag = 3;
            clearInterval(a);
            repart();
            for(var i=0;i<7;i++){
                chk[i]= false;
            }
            chk[6] = true;
            threeDimension.scene.remove(threeDimension.angleTh);
            threeDimension.scene.remove(threeDimension.text3);
            threeDimension.scene.remove(threeDimension.text4);
            threeDimension.scene.remove(threeDimension.line2);
            threeDimension.createEqual();



            threeDimension.spheres1[0].visible = threeDimension.spheres1[1].visible = threeDimension.spheres1[2].visible = threeDimension.spheres1[3].visible = true;

            arra.visible =true;
            arrb.visible =true;
            arra.position.x = json3[0][1][0];
            arra.position.y = json3[0][1][1];

            arrb.position.x = json3[1][1][0];
            arrb.position.y = json3[1][1][1];
            arrb.rotation.z = arra.rotation.z =0;

            $('.angle').css('display','none');

            $('.title').text('相等向量');
        }else if(dataId == 7){
            clearInterval(a);

            for(var i=0;i<7;i++){
                chk[i]= false;
            }

            threeDimension.scene.remove(threeDimension.angle,threeDimension.ang,threeDimension.para,threeDimension.equal,threeDimension.text1,threeDimension.text2);
            threeDimension.scene.remove(threeDimension.angleTh);
            threeDimension.scene.remove(threeDimension.text3);
            threeDimension.scene.remove(threeDimension.text4);
            threeDimension.scene.remove(threeDimension.line2);

            arra.visible =false;
            arrb.visible =false;

            threeDimension.gruop1.visible =true;
            threeDimension.mesh1.visible =false;
            threeDimension.mesh2.visible =false;
            threeDimension.mesh3.visible =false;

            $('.angle').css('display','none');
            threeDimension.spheres1[0].visible = threeDimension.spheres1[1].visible = threeDimension.spheres1[2].visible = threeDimension.spheres1[3].visible = false;


            $('.title').text('向量');
        }

    }
}

if(!isMob){
    $('#scale').on('click',fullEve);
    $('#renew').on('click',renewEve);
    $('.dynamic').on('click',dynamicEve);
}else{
    $('#scale').on('touchstart',fullEve);
    $('#renew').on('touchstart',renewEve);
    $('.dynamic').on('touchstart',dynamicEve);
}



