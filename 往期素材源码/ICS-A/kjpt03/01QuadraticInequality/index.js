/**
 * Created by O2 on 2016/9/6.
 */

var scale = 1;
var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
if(!(bodyWidth == 370 && bodyHeight == 246)) {
    var isMob = /iPad|Android/g.test(navigator.userAgent), offsetLeft = 0, offsetTop = 0;
    var $body = $("body");
    // if (isMob) {
        var bodyScale = scale = bodyWidth / 1920;
        $('.body').css("zoom", bodyScale).height(1200);
        var marginTop = ($body.width() / bodyWidth * bodyHeight - 1200) / 2;
        $('.body').css("margin-top", '-600px');
        $('#threeContainer').css({
            'right': 686 * scale,
            left: 33 * scale,
            top: (69 * scale + (bodyHeight - 1200 * scale) / 2 ),
            bottom: (69 * scale + (bodyHeight - 1200 * scale) / 2 )
        });
    // } else {
    //     scale = 0.6667;
    //     $(".body").css({"zoom": 0.6667, "margin-top": '0', "top": '0'});
    //     $('#threeContainer').css({'right': 686 * scale, left: 33 * scale, top: (69 * scale ), bottom: (69 * scale)});
    // }

    offsetLeft = parseInt($('#threeContainer').offset().left);
    offsetTop = parseInt($('#threeContainer').offset().top);
    $('body').css('background','#000');
    $('#threeContainer').css({'border-radius':10*scale,'box-shadow': 6*scale + 'px '+6*scale +'px '+ 20*scale +'px rgba(0,0,0,0.30)' });

    $('.zoom').css("zoom",scale);
}

//showheight 居中
var conHeight = $("#controlContainer").height();
var showheight = $(".showheight").height();
var h2Height = $("#controlContainer h2").height();
var h2MarginTop = parseInt($("#controlContainer h2").css("margin-top"));
var marginTop = (conHeight - showheight)/2;
$(".showheight").css("margin-top",marginTop - h2Height - h2MarginTop+30);
var fullScreen=0,$threeCon = $('#threeContainer'),$obj = $('#threeContainer'),threeWidth = $obj.width(),threeHeight = $obj.height();



var widthT = $("#threeContainer").width();
var heightT = $("#threeContainer").height();

var grid = true;
var group = new THREE.Group();
var textgroup=null;
var sphere1=null;
var sphere2=null;
var showsphere=false;
var changecolor1=false;
var changecolor2=false;
var xiangdeng=false;

var canWebgl = ( function () {
    try {
        var canvas = document.createElement( 'canvas' );
        return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
    } catch ( e ) {
        return false;
    }
} )();

var getParameter = {
    a:1,
    b:-2,
    c:-2,
    abc:300,
    angle:0,
    color:false,
    type:0
};

var threeDimension = {
    lines : [],
    point1:[],
    point2:[],
    point3:[],
    axis :new THREE.Group(),
    grid:null,
    mesh:null,
    init:function(){
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.getJson(getParameter.length/2);
        threeDimension.createLine1();
        //threeDimension.createSphere();
        threeDimension.createAxis();
        threeDimension.showFangchen();

    },
    createScene:function(){
        threeDimension.scene = new THREE.Scene();
        threeDimension.camera = new THREE.PerspectiveCamera(45, widthT / heightT, 1, 10000);
        threeDimension.camera.position.x = 0;
        threeDimension.camera.position.y = 0;
        threeDimension.camera.position.z = 1200;
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
        threeDimension.renderer.setSize(widthT,heightT);
        $("#threeContainer").append(threeDimension.renderer.domElement);

    },
    createControls:function(){
        threeDimension.controls = new THREE.OrbitControls( threeDimension.camera, threeDimension.renderer.domElement );
        threeDimension.controls.enableDamping = true;
        threeDimension.controls.dampingFactor = 0.25;
        //threeDimension.controls.enableZoom = false;
        threeDimension.controls.enableRotate =false;
        threeDimension.controls.enablePan =false;
    },
    vec3:function(x,y,z){
        return new THREE.Vector3(x, y, z);
    },
    createText:function(texts,x,y,z,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x,y,z);
        return text;
    },
    getJson:function(length){
        var x,y;
        getParameter.angleJson = [];
        x = Math.round(length*Math.cos(getParameter.angle1));
        y = Math.round(length*Math.sin(getParameter.angle1));
        getParameter.angleJson.push([x,0,y]);
    },

    labelAxis:function (start, stepSize, stop) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={},line=null,vertices=null;
        // label x axis:
        textStyle = {align: textAlign.center, font: '18px "Cambria Math"', fillStyle: 'black', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/50, textStyle);
            text.rotation = threeDimension.camera.rotation;
            if(i==0){
                text.position.x = i+10;
            }
            else{
                text.position.x = i;
            }
            text.position.y = -5;
            threeDimension.axis.add(text);
            vertices = [];

            vertices.push(new THREE.Vector3(i,0,0));
            vertices.push(new THREE.Vector3(i,10,0));

            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);
        }


        // label y axis:
        textStyle = {align: textAlign.center, font: '18px "Cambria Math"', fillStyle: 'black', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            if(i==0){
                continue;
            }
            text = new SpriteText2D(i/50, textStyle);
            text.rotation = threeDimension.camera.rotation;
            text.position.x = -20;
            text.position.y = i+7;
            text.position.z = 0.2;
            threeDimension.axis.add(text);

            vertices = [];
            vertices.push(new THREE.Vector3(0,i,0));
            vertices.push(new THREE.Vector3(-10,i,0));

            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);
        }
        //text = new SpriteText2D('y', textStyle);
        //text.position.x = 5;
        //text.position.y = stop+30;
        //text.position.z = 0.2;
        threeDimension.axis.add(text);
    },
    createAxis:function(){
        threeDimension.axis = new THREE.Group();
        threeDimension.labelAxis(-400, 100, 400);
        threeDimension.drawAxisArrow(threeDimension.vec3( -500, 0, 0 ), threeDimension.vec3( 500, 0, 0 ), 0x000000,1);
        threeDimension.drawAxisArrow(threeDimension.vec3( 0, -500, 0 ), threeDimension.vec3( 0, 500, 0 ), 0x000000,2);
        //threeDimension.drawAxisArrow(threeDimension.vec3( 0, 0, 0 ), threeDimension.vec3( 0, 0, 400 ), 0x0000FF);
        threeDimension.scene.add( threeDimension.axis);
    },
    drawAxisArrow:function(origin, dir,color,style) {
        //var geometryLine = new THREE.Geometry();
        //var vertices = [];
        //vertices.push(origin);
        //vertices.push(dir);
        //geometryLine.vertices = vertices;
        //var line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        //threeDimension.axis.add(line);

        var geometryLine = new THREE.Geometry();
        var vertices = [];
        vertices.push(origin);
        vertices.push(dir);
        geometryLine.vertices = vertices;
        var line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        threeDimension.axis.add(line);

        if(style == 1){
            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,-5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);
        }else{

            vertices = [];
            vertices.push(new THREE.Vector3(5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(-5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);

        }

    },
    createLineMesh:function(vertices, color, style) {
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
                opacity: 0.8,
                dashSize: 20,
                gapSize: 20
            }));
        }else if( style == 3){
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }
        return lineMesh;
    },
    createLine1:function(){
        if(threeDimension.line1){
            threeDimension.scene.remove(threeDimension.line1);
            threeDimension.point1=[];
        }

        threeDimension.line1 = new THREE.Object3D();
        for(var i=-50;i<=50;i+=0.1){
            var result1=parseFloat(Math.pow(i,2)*getParameter.a);
            var result2=parseFloat(i*getParameter.b);
            var result3=parseFloat(getParameter.c);
            var resulty=parseFloat(result1+result2+result3).toFixed(2);
            threeDimension.point1.push(new THREE.Vector3(i*50,resulty*50,0));
        }
        var curve = new THREE.CatmullRomCurve3(threeDimension.point1);
        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(1000);
        var material = new THREE.LineBasicMaterial({color : 0x1161c8});
        threeDimension.line1 = new THREE.Line(geometry, material);
        threeDimension.scene.add(threeDimension.line1);
        //console.log(threeDimension.line1.material);
    },
    createLine2:function(){
        if(threeDimension.line2){
            threeDimension.scene.remove(threeDimension.line2);
            threeDimension.point2=[];
        }
        var x1=(-getParameter.b-Math.sqrt(Math.pow(getParameter.b,2)-4*getParameter.a*getParameter.c))/(2*getParameter.a);
        var x2=(-getParameter.b+Math.sqrt(Math.pow(getParameter.b,2)-4*getParameter.a*getParameter.c))/(2*getParameter.a);
        threeDimension.line2 = new THREE.Object3D();
        if(x1<x2){
            for(var i=x1;i<=x2;i+=0.01){
                var result1=parseFloat(Math.pow(i,2)*getParameter.a);
                var result2=parseFloat(i*getParameter.b);
                var result3=parseFloat(getParameter.c);
                var resulty=parseFloat(result1+result2+result3).toFixed(2);
                threeDimension.point2.push(new THREE.Vector3(i*50,resulty*50,0));
            }
        }
        if(x1>x2){
            for(var i=x2;i<=x1;i+=0.01){
                var result1=parseFloat(Math.pow(i,2)*getParameter.a);
                var result2=parseFloat(i*getParameter.b);
                var result3=parseFloat(getParameter.c);
                var resulty=parseFloat(result1+result2+result3).toFixed(2);
                threeDimension.point2.push(new THREE.Vector3(i*50,resulty*50,0));
            }
        }
        var curve = new THREE.CatmullRomCurve3(threeDimension.point2);
        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(80);
        var material = new THREE.LineBasicMaterial({color : 0x1161c8});
        threeDimension.line2 = new THREE.Line(geometry, material);
        threeDimension.scene.add(threeDimension.line2);
        threeDimension.line2.position.z=1;
    },
    changeColor1:function(){
        threeDimension.removeColor();
        if(getParameter.point1){
            threeDimension.point1=[];
        }
        if(getParameter.point2){
            threeDimension.point2=[];
        }
        if(getParameter.point3){
            threeDimension.point3=[];
        }
        var result=Math.pow(getParameter.b,2)-4*getParameter.a*getParameter.c;
        if(getParameter.a>0){
            if(result<=0){
                threeDimension.line1.material.color = new THREE.Color("red");
            }
            else{
                threeDimension.line1.material.color = new THREE.Color("red");
                threeDimension.createLine2();
            }
        }
        if(getParameter.a<0){
            if(result>0){
                threeDimension.createLine2();
                threeDimension.line2.material.color = new THREE.Color("red");

            }
        }

    },
    changeColor2:function(){
        threeDimension.removeColor();
        if(getParameter.point1){
            threeDimension.point1=[];
        }
        if(getParameter.point2){
            threeDimension.point2=[];
        }
        if(getParameter.point3){
            threeDimension.point3=[];
        }
        var result=Math.pow(getParameter.b,2)-4*getParameter.a*getParameter.c;
        if(getParameter.a>0){
            if(result>0){
                threeDimension.createLine2();
                threeDimension.line2.material.color = new THREE.Color("red");
            }
        }
        else{
            if(result<=0){
                threeDimension.line1.material.color = new THREE.Color("red");
            }
            else{
                threeDimension.line1.material.color = new THREE.Color("red");
                threeDimension.createLine2();
            }
        }

    },
    removeColor:function(){
        if(threeDimension.line2){
            threeDimension.line2.material.color = new THREE.Color("#0000ff");
        }
        threeDimension.line1.material.color = new THREE.Color("#0000ff");
        threeDimension.scene.remove(threeDimension.line2);
    },
    createMesh:function(geom){

        var meshMaterial = new THREE.MeshNormalMaterial();
        meshMaterial.side = THREE.DoubleSide;
        var wireFrameMat = new THREE.MeshBasicMaterial({color: 'red'});
        wireFrameMat.wireframe = true;

        var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

        return mesh;
    },
    createSphere:function(){
        if(sphere1){
            threeDimension.scene.remove(sphere1);
            threeDimension.scene.remove(sphere2);
        }
        sphere1=new THREE.Group();
        sphere2=new THREE.Group();
        var sphere11 = threeDimension.createMesh(new THREE.TorusGeometry(7,1,20,20));
        var sphere22 = threeDimension.createMesh(new THREE.TorusGeometry(7,1,20,20));
        var x1=(-getParameter.b-Math.sqrt(Math.pow(getParameter.b,2)-4*getParameter.a*getParameter.c))/(2*getParameter.a);
        var x2=(-getParameter.b+Math.sqrt(Math.pow(getParameter.b,2)-4*getParameter.a*getParameter.c))/(2*getParameter.a);
        if(x1>x2){
            sphere1.position.x = x2*50;
            sphere2.position.x = x1*50;
        }
        else{
            sphere1.position.x = x1*50;
            sphere2.position.x = x2*50;
        }
        if(xiangdeng){
            sphere1.position.x = -getParameter.b/(getParameter.a*2)*50;
        }
        var vertices1=[0,0,0];
        var sphere111=this.createqiu(vertices1,7);
        var sphere222=this.createqiu(vertices1,7);
        if(x1==x2||xiangdeng){
            var text1=this.createText("x",0,-20,0,"#ff0000");
        }
        else{
            var text1=this.createText("x1",0,-20,0,"#ff0000");
        }
        var text2=this.createText("x2",0,-20,0,"#ff0000");
        sphere1.add(sphere11,sphere111,text1);
        sphere2.add(sphere22,sphere222,text2);
        if(x1==x2||xiangdeng){
            threeDimension.scene.add(sphere1);
        }
        else{
            threeDimension.scene.add(sphere1);
            threeDimension.scene.add(sphere2);
        }
    },
    createLineMesh:function(vertices, color, style) {
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
            opacity: 0.8,
            dashSize: 20,
            gapSize: 20
        }));
    }else if( style == 3){
        geometryLine.vertices = vertices;
        lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
    }
    return lineMesh;
},
    showResult:function(){
        var result=Math.pow(getParameter.b,2)-4*getParameter.a*getParameter.c;
        if(result==0){
            $('.showtruth-div2').html('<img class="photo2" src="images/jie2.png" />');
            $('.showtruth-div1').html('<img src="images/panbieshi1.png" />')
        }
        if(result<0){
            $('.showtruth-div2').html("无实根");
            $('.showtruth-div1').html('<img src="images/panbieshi3.png" />' )
        }
        if(result>0){
            $('.showtruth-div2').html('<img src="images/tupian1.png" /><img src="images/tupian2.png" />');
            $('.showtruth-div1').html('<img src="images/panbieshi2.png" />');
        }
    },
    showResult1:function(){
        var result=Math.pow(getParameter.b,2)-4*getParameter.a*getParameter.c;
        if(getParameter.a>0){
            if(result>0){
                $('.turnshade1').html('<img class="huozhe" src="images/huo.png">');
                $('.turnshade2').html('<img  class="img2" src="images/gouxuanjieguo2.png">');
            }
            if(result==0){
                $('.turnshade1').html('<img class="img3" src="images/gouxuanjieguo3.png">');
                $('.turnshade2').html('<img class="img4" src="images/gouxuanjieguo4.png">');
            }
            if(result<0){
                $('.turnshade1').html('<img class="img5" src="images/gouxuanjieguo5.png">');
                $('.turnshade2').html('<img class="img4" src="images/gouxuanjieguo4.png">');
            }
        }
        else{
            if(result>0){
                $('.turnshade2').html('<img class="huozhe" src="images/huo.png">');
                $('.turnshade1').html('<img class="img2" src="images/gouxuanjieguo2.png">');
            }
            if(result==0){
                $('.turnshade2').html('<img class="img3" src="images/gouxuanjieguo3.png">');
                $('.turnshade1').html('<img class="img4" src="images/gouxuanjieguo4.png">');
            }
            if(result<0){
                $('.turnshade2').html('<img class="img5" src="images/gouxuanjieguo5.png">');
                $('.turnshade1').html('<img class="img4" src="images/gouxuanjieguo4.png">');
            }

        }
    },
    showFangchen:function(){
        if(textgroup!=null){
            threeDimension.scene.remove(textgroup);
        }
        var a=getParameter.a;
        var b=getParameter.b;
        var c=getParameter.c,text=null;
        textgroup=new THREE.Group();

        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = null;

        //var text = new SpriteText2D(texts, textStyle);

        textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000', antialias: true};
        text = new SpriteText2D('y=', textStyle);
        text.position.x = 0;
        textgroup.add(text);

        var position = 0;
        if(a!=1){
            if(a!=-1){
                position = 30;
                text = new SpriteText2D(a, textStyle);
                text.position.x = position;
                textgroup.add(text);
                position +=20;
            }else{
                position = 20;
                text = new SpriteText2D('-', textStyle);
                text.position.x = position;
                textgroup.add(text);
                position +=15;
            }

        }else{
            position = 35;
        }


        text = new SpriteText2D('x', textStyle);
        text.position.x = position;
        textgroup.add(text);
        position+=10;


        textStyle = {align: textAlign.center, font: '12px "Cambria Math"', fillStyle: '#000', antialias: true};
        text = new SpriteText2D('2', textStyle);
        text.position.x = position;
        text.position.y = 5;
        textgroup.add(text);
        position += 15;

        textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000', antialias: true};
        if(b !=0){
            if(b>0){
                text = new SpriteText2D('+', textStyle);
                text.position.x = position;
                textgroup.add(text);
                position+=30;
                if(b==1){
                    text = new SpriteText2D('x', textStyle);
                    text.position.x = position;
                    textgroup.add(text);
                    position+=40;
                }else{
                    text = new SpriteText2D(''+b+'x', textStyle);
                    text.position.x = position;
                    textgroup.add(text);
                    position+=40;
                }

            }else{

                text = new SpriteText2D('-', textStyle);
                text.position.x = position;
                textgroup.add(text);
                position+=30;
                b=-b;
                if(b==1){
                    text = new SpriteText2D('x', textStyle);
                    text.position.x = position;
                    textgroup.add(text);
                    position+=40;
                }else{
                    text = new SpriteText2D(''+b+'x', textStyle);
                    text.position.x = position;
                    textgroup.add(text);
                    position+=40;
                }
            }
        }

        if(c!=0){
            if(c>0){
                text = new SpriteText2D(' + '+c, textStyle);
                text.position.x = position;
                textgroup.add(text);
                position+=30;

            }else{
                c=-c;
                text = new SpriteText2D(' - '+c, textStyle);
                text.position.x = position;
                textgroup.add(text);
                position+=30;

            }
        }
        textgroup.position.x=250;
        textgroup.position.y=250;
        threeDimension.scene.add(textgroup);
    },
    createqiu:function(vertices,radius){
        var sphereG = new THREE.SphereGeometry(radius, 50, 50, 0, 2 * Math.PI, 0, 2 * Math.PI);
        var sphereM = new THREE.MeshBasicMaterial({color: 'white'});
        var sphere1 = new THREE.Mesh(sphereG, sphereM);
        sphere1.position.x = vertices[0];
        sphere1.position.y = vertices[1];
        sphere1.position.z = vertices[2];
        return sphere1;
    }

};

threeDimension.init();

function renderAll(){
    threeDimension.controls.update();

    if(getParameter.checked1){
        $('#formula').css('display','block');

    }else{
        $('#formula').css('display','none');
    }
    requestAnimationFrame(renderAll);
    threeDimension.renderer.render(threeDimension.scene,threeDimension.camera);
}
renderAll();

function reset(){
    $('.slider1 .sliderLeft').css('width','209px');
    $('.slider2 .sliderLeft').css('width','153px');
    $('.slider3 .sliderLeft').css('width','153px');
    if($('#div1').hasClass('on')){
        $('#div1').removeClass('on').addClass('off');
        $('#div1').find('.span2').text('' +'off')
    };
    showsphere=false;
    changecolor1=false;
    changecolor2=false;
    xiangdeng=false;
    if($('#div2').hasClass('on')){
        $('#div2').removeClass('on').addClass('off');
        $('#div2').find('.span2').text('' +'off')
    };
    threeDimension.removeColor();
    if(sphere1){
        threeDimension.scene.remove(sphere1);
        threeDimension.scene.remove(sphere2);
    }
    getParameter.a=1;
    getParameter.b=-2;
    getParameter.c=-2;
    threeDimension.camera.position.z = 1200;
    threeDimension.showFangchen();
    threeDimension.createLine1();
    //threeDimension.createSphere();
    $('.showtruth-div2').html('<img src="images/tupian1.png" /><img src="images/tupian2.png" />');

    $('#slider1').range2DSlider({
        template:'horizontal',
        value:[[1,0]],
//        onlyGridPoint:true,
//        round:true,
//        width:383,
        axis:[[-9.9,10]],
        showLegend:false,
        printLabel:function(val){
            var ss= parseFloat(val[0]).toFixed(1);
            if(ss <= 0){
                ss = (ss-0.1).toFixed(1);
            }
            var string = ss.slice(-1);
            if(string == 0){
                ss=parseInt(ss);
            }
            return ss;
        }

    });

    $('#slider2').range2DSlider({
        template:'horizontal',
        value:[[-2,0]],
//        onlyGridPoint:true,
//        round:true,
        axis:[[-10,10]],
        showLegend:false,
        printLabel:function(val){
            var ss= parseFloat(val[0]).toFixed(1);
            var string = ss.slice(-1);
            if(string == 0){
                ss=parseInt(ss);
            }
            return ss;
        }
    });

    $('#slider3').range2DSlider({
        template:'horizontal',
        value:[[-2,0]],
//        onlyGridPoint:true,
//        round:true,
        axis:[[-10,10]],
        showLegend:false,
        printLabel:function(val){
            var ss= parseFloat(val[0]).toFixed(1);
            var string = ss.slice(-1);
            if(string == 0){
                ss=parseInt(ss);
            }
            return ss;
        }
    });
}

$("#slider1").change(function(){
    var s1 = 0;
    var s11=parseFloat(this.value).toFixed(1);
    if(s11<=0){
        s1=parseFloat(s11-0.1).toFixed(1);
    }else{
        s1=s11
    }
    var string = s1.slice(-1);
    if(string == 0){
        s1=parseInt(s1);
    }
    getParameter.a = s1;
    threeDimension.createLine1();
    if(showsphere){
        if(changecolor1){
            threeDimension.changeColor1();
        }
        if(changecolor2){
            threeDimension.changeColor2();
        }
        threeDimension.createSphere();
    }
    // threeDimension.scene.remove(threeDimension.line1);

    threeDimension.showResult();
    threeDimension.showResult1();
    threeDimension.showFangchen();

});
$("#slider2").change(function(){
    threeDimension.removeColor();
    var s2 = parseFloat(this.value).toFixed(1);
    var string = s2.slice(-1);
    if(string == 0){
        s2=parseInt(s2);
    }
    getParameter.b = s2;
    threeDimension.createLine1();
    if(showsphere){
        if(changecolor1){
            threeDimension.changeColor1();
        }
        if(changecolor2){
            threeDimension.changeColor2();
        }
        threeDimension.createSphere();
    }
    // threeDimension.scene.remove(threeDimension.line1);
    threeDimension.showResult();
    threeDimension.showResult1();
    threeDimension.showFangchen();

});
$("#slider3").change(function(){
    threeDimension.removeColor();
    var s3 = parseFloat(this.value).toFixed(1);
    var string = s3.slice(-1);
    if(string == 0){
        s3=parseInt(s3);
    }
    getParameter.c = s3;
    threeDimension.createLine1();
    if(showsphere){
        threeDimension.createSphere();
        var x1=parseFloat(-getParameter.b/(2*getParameter.a)).toFixed(1);
        var y1=parseFloat(getParameter.a*Math.pow(x1,2));
        var y2=parseFloat(getParameter.b*x1);
        var y3=parseFloat(getParameter.c);
        var y4=parseFloat(y1+y2+y3).toFixed(1);
        y4=parseFloat(y4);
        if(y4<=0.1&&y4>=-0.1){
            xiangdeng=true;
            sphere1.position.x=parseFloat(x1*50);
            getParameter.c=parseFloat(-y1-y2).toFixed(1);
            threeDimension.createLine1();
            $('#slider3').range2DSlider({
                template:'horizontal',
                value:[[getParameter.c,0]],
                axis:[[-10,10]],
                showLegend:false,
                printLabel:function(val){
                    var ss= parseFloat(val[0]).toFixed(1);
                    var string = ss.slice(-1);
                    if(string == 0){
                        ss=parseInt(ss);
                    }
                    return ss;
                }
            });
            threeDimension.createSphere();
        }
        if(changecolor1){
            threeDimension.changeColor1();
        }
        if(changecolor2){
            threeDimension.changeColor2();
        }
        xiangdeng=false;
    }
    // threeDimension.scene.remove(threeDimension.line1);
    threeDimension.showResult();
    if(showsphere&&y4<=0.1&&y4>=-0.1){
        $('.showtruth-div2').html('<img class="photo2" src="images/jie2.png" />');
        $('.showtruth-div1').html('<img src="images/panbieshi1.png" />' )
    }
    threeDimension.showResult1();
    threeDimension.showFangchen();
});

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
function div1(){
    threeDimension.removeColor();
    if($('#div1').hasClass('on')){
        showsphere=false;
        changecolor1=false;
        if(sphere1){
            threeDimension.scene.remove(sphere1);
            threeDimension.scene.remove(sphere2);
        }
        $('#div1').removeClass('on').addClass('off');
        $('#div1').find('.span2').text('' +'off')
    }else{
        showsphere=true;
        changecolor1=true;
        if($('#div2').hasClass('on')){
            $('#div2').removeClass('on').addClass('off');
            $('#div2').find('.span2').text('' +'off')
            changecolor2=false;
        }
        threeDimension.showResult1();
        threeDimension.createSphere();
        threeDimension.changeColor1();
        $('.turnshade').css('visibility','visible');
        $('#div1').removeClass('off').addClass('on');
        $('#div1').find('.span2').text('' +'on')
    }
}
function div2(){
    threeDimension.removeColor();
    if($('#div2').hasClass('on')){
        showsphere=false;
        changecolor2=false;
        if(sphere1){
            threeDimension.scene.remove(sphere1);
            threeDimension.scene.remove(sphere2);
        }
        $('#div2').removeClass('on').addClass('off');
        $('#div2').find('.span2').text('' +'off')
    }else{
        showsphere=true;
        changecolor2=true;
        if($('#div1').hasClass('on')){
            changecolor1=false;
            $('#div1').removeClass('on').addClass('off');
            $('#div1').find('.span2').text('' +'off')
        }
        threeDimension.showResult1();
        threeDimension.changeColor2();
        threeDimension.createSphere();
        $('.turnshade').css('visibility','visible');
        $('#div2').removeClass('off').addClass('on');
        $('#div2').find('.span2').text('' +'on')
    }
}
if(isMob){
	$('#div1').on('touchstart',div1);
	$('#div2').on('touchstart',div2);
	$("#renew").on('touchstart',function(){
	    reset();
	    threeDimension.camera.position.set(0,0,1200);
	});
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	//点击单选按钮
	$('#div1').on('click',div1);
	$('#div2').on('click',div2);
	$("#renew").on('click',function(){
	    reset();
	    threeDimension.camera.position.set(0,0,1200);
	});
	/*全屏事件*/
	$('#scale').on('click',scalef);
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





