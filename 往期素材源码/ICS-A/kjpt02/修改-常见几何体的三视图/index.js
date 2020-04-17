
//禁止选择
document.onselectstart=function(){return false;};
// 多面体切换事件
$(document).ready(function(){
  $("#rightControl div").click(function(){
    $("#rightControl div").removeClass("active");
    $(this).addClass("active");
    if (this.id === 'button1') {
        change(1);
    }else if (this.id === 'button2') {
        change(2);
    }else if (this.id === 'button3') {
        change(3);
    }else if (this.id === 'button4') {
        change(4);
    }else if (this.id === 'button5') {
        change(5);
    }else if (this.id === 'button6') {
        change(6);
    }else if (this.id === 'button7') {
        change(7);
    }else if (this.id === 'button8') {
        change(8);
    }else if (this.id === 'button9') {
        change(9);
    }
});
  // 视角切换事件
  $("#bottomControl div").click(function(){
    $("#bottomControl div").removeClass("active");
    $(this).addClass("active");
    if (this.id === 'positive') {
        clickPositive();
    }else if (this.id === 'side') {
        clickSide();
    }else if (this.id === 'top') {
        clickTop();
    }
});
});
// 重置事件
$("#reset").click(function(){
    $("#rightControl div").removeClass("active");
    $("#bottomControl div").removeClass("active");
    $("#button1").addClass("active");
    change(1);
    threeDimension.camera.position.set(1077,300,577);
    threeDimension.camera.zoom =1;
    threeDimension.camera.updateProjectionMatrix();
});
// 初始状态默认正四棱柱选中
$("#button1").addClass("active");
//视图区鼠标事件操作相关变量
var raycaster = new THREE.Raycaster(),
plane = new THREE.Plane(),
offset = new THREE.Vector3(),
intersection = new THREE.Vector3(),
mouse = new THREE.Vector2(),
INTERSECTED = null;
// var offsetLeft = parseInt($threeCon.offset().left);
// var offsetTop = parseInt($threeCon.offset().top);
var point1={
    1:[0,0,150],
    2:[150,0,0],
    3:[0,0,-150],
    4:[-150,0,0],
    5:[-150,345,0],
    6:[0,345,150],
    7:[150,345,0],
    8:[0,345,-150],
    21:[0,0,110],
    22:[190,0,0],
    23:[0,0,-110],
    24:[-190,0,0],
    25:[-190,345,0],
    26:[0,345,110],
    27:[190,345,0],
    28:[0,345,-110],
    31:[0,290,0],
    32:[-10,0,180],
    33:[160,0,-100],
    34:[-160,0,-100],
    41:[0,330,140],
    42:[125,330,-70],
    43:[-110,330,-70],
    51:[0,0,225],
    52:[230,0,5],
    53:[0,0,-230],
    54:[-230,0,0],
    55:[0,330,225],
    56:[230,330,5],
    57:[0,330,-230],
    58:[-230,330,0],
    61:[0,-160,0],
    62:[0,200,0],
    // 63:[0,-127,0],
    // 64:[0,173,0],
    71:[0,200,0],
    91:[0,0,0],
    // 92:[-2,23,0.5],
}

/****** 位置相关 ******/
// console.log($obj.height(),$obj.width(),111);
// var canWebgl=(function(){
//     try {
//         var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
//     } catch ( e ) {
//         return false;
//     }
// })();
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
// 判断设备类型
var isMob = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/g.test(navigator.userAgent);
var threeDimension = {
    axis:new THREE.Object3D(),
    texts:[],
    mesh:null,
    loopInit() {
      if (!window.innerWidth || !window.innerHeight) {
        setTimeout(() => {
          threeDimension.loopInit();
        }, 200)
        return false;
      }
      threeDimension.init();
    },
    init:function(){
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.labelAxis(100,100,500);
        threeDimension.createAxis();
        threeDimension.createGrid();
        threeDimension.createOne();
        threeDimension.createShow();
        renderAll();
    },
    createScene:function(){
        var $obj = $('#threeContainer'),
        threeHeight = $obj.height(),
        threeWidth= $obj.width();
        threeDimension.scene = new THREE.Scene();
        threeDimension.scene.position.y=-150;
        threeDimension.camera = new THREE.OrthographicCamera(threeWidth/-1.5,threeWidth/1.5,threeHeight/1.5,threeHeight/-1.5,-100,10000);
        threeDimension.camera.position.set(1077,300,577);
        threeDimension.renderer = null;
        if(isMob && window.innerWidth < 850){
         threeDimension.camera = new THREE.OrthographicCamera(threeWidth/-0.8,threeWidth/0.8,threeHeight/0.8,threeHeight/-0.8,-100,10000);
         threeDimension.camera.position.set(1077,300,577);
     }
     // if(canWebgl){
        threeDimension.renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
    // }else{
    //     threeDimension.renderer = new THREE.CanvasRenderer();
    // }
    threeDimension.renderer.setPixelRatio( window.devicePixelRatio );
    threeDimension.renderer.setClearColor(0xFAFAFA, 1.0);
    threeDimension.renderer.setSize(threeWidth,threeHeight);
    $obj.append(threeDimension.renderer.domElement);
},
createControls:function(){
    threeDimension.controls = new THREE.OrbitControls( threeDimension.camera, threeDimension.renderer.domElement );
    threeDimension.controls.enableDamping = true;
    threeDimension.controls.dampingFactor = 0.25;
    threeDimension.controls.enableZoom = true;
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
        // threeDimension.scene.add(threeDimension.axis);
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
        // threeDimension.scene.add(threeDimension.grid);
        // console.log("grid",grid)
    },
    // createText:function(texts,x,y,z,color){
    //     var SpriteText2D = THREE_Text.SpriteText2D;
    //     var textAlign = THREE_Text.textAlign;
    //     var textStyle = {align: textAlign.center, font: '20px Arial', fillStyle: color, antialias: true};
    //     var text = new SpriteText2D(texts, textStyle);
    //     text.rotation = threeDimension.camera.rotation;
    //     text.position.set(x,y,z);
    //     return text;
    // },
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

            for(i=0;i<num-2;i++){
                faces.push( new THREE.Face3(0,i+2,i+1));
                faces.push( new THREE.Face3(i+num+1,i+num+2,num));
            }
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
    // 创建标志字母
    createText: function (vertices,font,size,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(font, textStyle);
        text.position.x=vertices[0].x;
        text.position.y=vertices[0].y;
        text.position.z=vertices[0].z;
        return text;
    },
    
    createTextPoint: function(n,font,o){
        var vertices=[];
        vertices.push(threeDimension.vec3(point1[n][0],point1[n][1],point1[n][2]));
        var text=threeDimension.createText(vertices,font,24,'#000');
        o.add(text);
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
        threeDimension.createTextPoint(1,'A',threeDimension.mesh);
        threeDimension.createTextPoint(2,'B',threeDimension.mesh);
        threeDimension.createTextPoint(3,'C',threeDimension.mesh);
        threeDimension.createTextPoint(4,'D',threeDimension.mesh);
        threeDimension.createTextPoint(5,'H',threeDimension.mesh);
        threeDimension.createTextPoint(6,'E',threeDimension.mesh);
        threeDimension.createTextPoint(7,'F',threeDimension.mesh);
        threeDimension.createTextPoint(8,'G',threeDimension.mesh);
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
        threeDimension.createTextPoint(21,'A',threeDimension.mesh);
        threeDimension.createTextPoint(22,'B',threeDimension.mesh);
        threeDimension.createTextPoint(23,'C',threeDimension.mesh);
        threeDimension.createTextPoint(24,'D',threeDimension.mesh);
        threeDimension.createTextPoint(25,'H',threeDimension.mesh);
        threeDimension.createTextPoint(26,'E',threeDimension.mesh);
        threeDimension.createTextPoint(27,'F',threeDimension.mesh);
        threeDimension.createTextPoint(28,'G',threeDimension.mesh);
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
        threeDimension.createTextPoint(31,'P',threeDimension.mesh);
        threeDimension.createTextPoint(32,'A',threeDimension.mesh);
        threeDimension.createTextPoint(33,'B',threeDimension.mesh);
        threeDimension.createTextPoint(34,'C',threeDimension.mesh);
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
        threeDimension.createTextPoint(32,'A',threeDimension.mesh);
        threeDimension.createTextPoint(33,'B',threeDimension.mesh);
        threeDimension.createTextPoint(34,'C',threeDimension.mesh);
        threeDimension.createTextPoint(41,'A₁',threeDimension.mesh);
        threeDimension.createTextPoint(42,'B₁',threeDimension.mesh);
        threeDimension.createTextPoint(43,'C₁',threeDimension.mesh);
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
        threeDimension.createTextPoint(51,'A',threeDimension.mesh);
        threeDimension.createTextPoint(52,'B',threeDimension.mesh);
        threeDimension.createTextPoint(53,'C',threeDimension.mesh);
        threeDimension.createTextPoint(54,'D',threeDimension.mesh);
        threeDimension.createTextPoint(55,'E',threeDimension.mesh);
        threeDimension.createTextPoint(56,'F',threeDimension.mesh);
        threeDimension.createTextPoint(57,'G',threeDimension.mesh);
        threeDimension.createTextPoint(58,'H',threeDimension.mesh);
        threeDimension.scene.add(threeDimension.mesh);
    },

    createGeo:function(radius1,radius2,n){
        var group = new THREE.Object3D();

        var material1 = new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.4,transparent:true,depthTest:true});
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
        threeDimension.createTextPoint(61,'O₁',threeDimension.mesh);
        threeDimension.createTextPoint(62,'O₂',threeDimension.mesh);
        // threeDimension.createTextPoint(63,'.',threeDimension.mesh);
        // threeDimension.createTextPoint(64,'.',threeDimension.mesh);
        threeDimension.createPoint(0,-150,0);
        threeDimension.createPoint(0,150,0);
    },
    //圆锥
    createSeven:function(){
        threeDimension.scene.remove(threeDimension.mesh);
        threeDimension.mesh = null;
        threeDimension.mesh = threeDimension.createGeo(getParameter.radius1,0,1);
        threeDimension.scene.add(threeDimension.mesh);
        threeDimension.createTextPoint(61,'O',threeDimension.mesh);
        // threeDimension.createTextPoint(63,'.',threeDimension.mesh);
        threeDimension.createTextPoint(71,'S',threeDimension.mesh);
        threeDimension.createPoint(0,-150,0);
    },
    //圆台
    createEight:function(){
        threeDimension.scene.remove(threeDimension.mesh);
        threeDimension.mesh = null;
        threeDimension.mesh = threeDimension.createGeo(getParameter.radius1,getParameter.radius2);
        threeDimension.scene.add(threeDimension.mesh);
        threeDimension.createTextPoint(61,'O₁',threeDimension.mesh);
        threeDimension.createTextPoint(62,'O₂',threeDimension.mesh);
        // threeDimension.createTextPoint(63,'.',threeDimension.mesh);
        // threeDimension.createTextPoint(64,'.',threeDimension.mesh);
        threeDimension.createPoint(0,-150,0);
        threeDimension.createPoint(0,150,0);
    },
    //球
    createSph:function(){
        var group = new THREE.Object3D();
        var material = new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.4,transparent:true,depthTest:false});
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
    //创建圆心点
    createPoint: function (x,y,z){
        var geometry = new THREE.SphereGeometry( 2, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0x000,depthTest:false} );
        var sphere = new THREE.Mesh( geometry, material );
        sphere.position.set(x,y,z);
        threeDimension.mesh.add(sphere);
    },
    //球
    createNine:function(){
        threeDimension.scene.remove(threeDimension.mesh);
        threeDimension.mesh = null;
        threeDimension.mesh = threeDimension.createSph();
        threeDimension.scene.add(threeDimension.mesh);
        threeDimension.createTextPoint(91,'O',threeDimension.mesh);
        threeDimension.createPoint(0,0,0);

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
        var material1 = new THREE.MeshBasicMaterial({color:0x000000,side:THREE.DoubleSide});
        var plane = new THREE.CylinderGeometry(1.5,1.5,length,36,36);
        var mesh1 = new THREE.Mesh(plane,material1);
        mesh1.rotation.z = -Math.PI/2;
        var plane1 = new THREE.CylinderGeometry(0,3,10,36,36);
        var mesh2 = new THREE.Mesh(plane1,material1);
        mesh2.position.x = length/2;
        mesh2.rotation.z = -Math.PI/2;
        group.add(mesh1,mesh2);
        return group;
        //方向
        // var json = threeDimension.getJson3(7);
        // var vertices = [];
        // for(var i=0;i<json.length;i++){
        //     vertices.push(threeDimension.vec3(json[i][0],json[i][1],json[i][2]));
        // }
        // var geom = new THREE.Geometry();
        // geom.vertices = vertices;
        // geom.faces.push(new THREE.Face3(0,1,2));
        // geom.faces.push(new THREE.Face3(2,1,0));
        // var mesh2 = new THREE.SceneUtils.createMultiMaterialObject(geom,[material1]);
        // mesh2.position.x = length/2;
    },
    //组合
    createShow:function(){
        var text1 = threeDimension.createTexts("正视图",20,-60,10,0);
        var arrow1 = threeDimension.createArrow();
        var group1 = new THREE.Object3D();
        group1.add(text1,arrow1);
        group1.position.set(0,getParameter.height/2,250);
        group1.rotation.y = Math.PI/2;

        threeDimension.show = new THREE.Object3D();
        threeDimension.show.add(group1);
        threeDimension.show.rotation.y = Math.PI/4;
        threeDimension.scene.add(threeDimension.show);
    }

};

threeDimension.loopInit();

//渲染事件
function renderAll(){
    threeDimension.controls.update();
    threeDimension.renderer.render(threeDimension.scene,threeDimension.camera);
    requestAnimationFrame(renderAll);
}
// renderAll();
// 点击切换多面体函数事件
var a;
function change(a){
    switch(a){
        case 1: threeDimension.createOne();
        break;
        case 2: threeDimension.createTwo();
        break;
        case 3: threeDimension.createThree();
        break;
        case 4: threeDimension.createFour();
        break;
        case 5: threeDimension.createFive();
        break;
        case 6: threeDimension.createSix();
        break;
        case 7: threeDimension.createSeven();
        break;
        case 8: threeDimension.createEight();
        break;
        case 9: threeDimension.createNine();
        break;
    }
}
// 正视图点击事件函数
function clickPositive(){
    clearInterval(a);
    rotate([1077,0,1077]);
}
// 点击侧视图触发事件函数
function clickSide(){
    clearInterval(a);
    rotate([-1077,0,1077]);
}
//点击俯视图触发事件函数
function clickTop(){
    clearInterval(a);
    rotate([0,1523,0.01]);
}
// 视角切换动画
function rotate(aim){
    var position = threeDimension.camera.position;
    var x = aim[0] - position.x,
    y = aim[1] - position.y,
    z = aim[2] - position.z;
    var n = 20, v1 = x/n, v2 = y/n, v3 = z/n;
    a = setInterval(function(){
        n--;
        if(n<0){
            clearInterval(a);
            return false;
        }
        position = threeDimension.camera.position;
        threeDimension.camera.position.set(position.x+v1,position.y+v2,position.z+v3);
    },40);
}