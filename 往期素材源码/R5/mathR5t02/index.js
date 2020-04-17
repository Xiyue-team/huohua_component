//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}
$(function () {
    FastClick.attach(document.body);
});

//禁止选择
document.onselectstart = function () {
    return false;
};

var isMob = /iPad|Android/g.test(navigator.userAgent);
var wWidth = window.innerWidth;
var wHeight = window.innerHeight;
var leftC = 0;
var zoom = 1;
var $threeCon = $('#threeContainer');
if (wHeight < 580) {
    zoom = 0.8
    $('#main_right').css('zoom', zoom);
}
//$('#main_left').width(wWidth - 280 * zoom);
window.onresize = function () {
    wWidth = window.innerWidth;
    wHeight = window.innerHeight;
    if (wWidth <= 580) wWidth = 580;
    if (wHeight < 580) {
        zoom = 0.8;
        $('#main_right').css('zoom', zoom);
    } else {
        zoom = 1;
        $('#main_right').css('zoom', zoom);
    }
    //$('#main_left').width(wWidth - 280 * zoom);
    var cW = $('canvas').width();
    var cH = $('canvas').height();
    leftC = ($('#threeContainer').width() - cW) / 2;

};
var threeWidth = $('#threeContainer').width();
var threeHeight = $('#threeContainer').height();

//视图区鼠标事件操作相关变量
var raycaster = new THREE.Raycaster(),
    plane = new THREE.Plane(),
    offset = new THREE.Vector3(),
    intersection = new THREE.Vector3(),
    mouse = new THREE.Vector2(),
    INTERSECTED = null;
var offsetLeft = parseInt($threeCon.offset().left);
var offsetTop = parseInt($threeCon.offset().top);

var getParameter = {
    p1x:0,
    p1y:0,
    p2x:80,
    p2y:120,
    p3x:160,
    p3y:-80
};
var k1,k2,k3,k4;
var selectobjs=[],selectobj=null,mousedownflag,key=false;

var threeDimension = {
    init: function () {
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.createAxis();
        threeDimension.createObj();
    },

    //创建场景于相机
    createScene: function () {
        threeDimension.scene = new THREE.Scene();
        threeDimension.camera = new THREE.PerspectiveCamera(50, threeWidth / threeHeight, 1, 10000);
        threeDimension.camera.position.x = 0;
        threeDimension.camera.position.y = 0;
        threeDimension.camera.position.z = 1200;
        threeDimension.camera.lookAt(threeDimension.scene.position);
        threeDimension.scene.add(threeDimension.camera);
        if (isMob) {
            threeDimension.renderer = new THREE.WebGLRenderer();
        } else {
            threeDimension.renderer = new THREE.CanvasRenderer();
        }
        threeDimension.renderer.setPixelRatio(window.devicePixelRatio);
        threeDimension.renderer.setClearColor(0xffffff);
        threeDimension.renderer.setSize(threeWidth, threeHeight);
        $("#threeContainer").append(threeDimension.renderer.domElement);

    },
    //定义鼠标控制
    createControls: function () {
        threeDimension.controls = new THREE.OrbitControls(threeDimension.camera, threeDimension.renderer.domElement);
        threeDimension.controls.enableDamping = true;
        threeDimension.controls.dampingFactor = 0.25;
        threeDimension.controls.enableRotate = false;
        threeDimension.controls.enablePan = false;
        threeDimension.controls.enableZoom = false;
    },
    vec3: function (x, y, z) {
        return new THREE.Vector3(x, y, z);
    },
    createText: function (texts, x, y, z, color, size) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {
            align: textAlign.center,
            font: size + 'px "STIXGeneral-Italic"',
            fillStyle: color,
            antialias: true
        };
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x, y, z);
        return text;
    },
    createTriangleFace: function (vertices, color) {
        var material = new THREE.MeshBasicMaterial({color: color});
        var geom = new THREE.Geometry();
        geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
        geom.vertices = vertices;
        var mesh = new THREE.Mesh(geom, material);
        return mesh;
    },
    createAxis: function () {
        threeDimension.axis = new THREE.Group();
        threeDimension.labelAxis(-400, 40, 400);
        threeDimension.drawAxisArrow(threeDimension.vec3(-450, 0, 0), threeDimension.vec3(450, 0, 0), 0x000000, 1);
        threeDimension.drawAxisArrow(threeDimension.vec3(0, -450, 0), threeDimension.vec3(0, 450, 0), 0x000000, 2);
        threeDimension.scene.add(threeDimension.axis);
    },
    //坐标轴分度线
    labelAxis: function (start, stepSize, stop) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '18px "Cambria Math"', fillStyle: '#000000', antialias: true};
        var text = {}, line = null, vertices = null;
        // label x axis:
        for (var i = start; i <= stop; i = i + stepSize) {
            if (i == 0) {
                continue;
            }
            text = new SpriteText2D(i / 40, textStyle);
            text.rotation = threeDimension.camera.rotation;
            if (i == 0) {
                text.position.x = i + 10;
            }
            else {
                text.position.x = i;
            }
            text.position.y = -5;
            threeDimension.axis.add(text);
            vertices = [];

            vertices.push(threeDimension.vec3(i, 0, 0));
            vertices.push(threeDimension.vec3(i, 10, 0));

            line = threeDimension.createLineMesh(vertices, '#000000', 3, 2);
            threeDimension.axis.add(line);
        }
        // label y axis:
        for (var i = start; i <= stop; i = i + stepSize) {
            if (i == 0) {
                continue;
            }
            text = new SpriteText2D(i / 40, textStyle);
            text.rotation = threeDimension.camera.rotation;
            text.position.x = -15;
            text.position.y = i + 7;
            text.position.z = 0.2;
            threeDimension.axis.add(text);

            vertices = [];
            vertices.push(threeDimension.vec3(0, i, 0));
            vertices.push(threeDimension.vec3(10, i, 0));

            line = threeDimension.createLineMesh(vertices, '#000000', 3, 2);
            threeDimension.axis.add(line);
        }
        threeDimension.axis.add(text);
    },
    //坐标轴
    drawAxisArrow: function (origin, dir, color, style) {
        var geometryLine = new THREE.Geometry();
        var vertices = [];
        vertices.push(origin);
        vertices.push(dir);
        geometryLine.vertices = vertices;
        var line = threeDimension.createLineMesh(geometryLine.vertices, color, 3, 2);
        threeDimension.axis.add(line);
        var text;
        if (style == 1) {
            vertices = [];
            vertices.push(threeDimension.vec3(dir.x - 10, 0, 0));
            vertices.push(threeDimension.vec3(dir.x - 13, 5, 0));
            vertices.push(threeDimension.vec3(dir.x + 5, 0, 0));
            var triangle1 = threeDimension.createTriangleFace(vertices, "#000");
            threeDimension.axis.add(triangle1);
            vertices = [];
            vertices.push(threeDimension.vec3(dir.x - 10, 0, 0));
            vertices.push(threeDimension.vec3(dir.x - 13, -5, 0));
            vertices.push(threeDimension.vec3(dir.x + 5, 0, 0));
            var triangle2 = threeDimension.createTriangleFace(vertices, "#000");
            threeDimension.axis.add(triangle2);
            text = threeDimension.createText('x', dir.x, -5, 0, '#000', 28);
            threeDimension.axis.add(text);
            text = threeDimension.createText('O', -14, -2, 0, '#000', 23);
            threeDimension.axis.add(text);
        } else {
            vertices = [];
            vertices.push(threeDimension.vec3(0, dir.y - 10, 0));
            vertices.push(threeDimension.vec3(5, dir.y - 13, 0));
            vertices.push(threeDimension.vec3(0, dir.y + 5, 0));
            var triangle1 = threeDimension.createTriangleFace(vertices, "#000");
            threeDimension.axis.add(triangle1);
            vertices = [];
            vertices.push(threeDimension.vec3(0, dir.y - 10, 0));
            vertices.push(threeDimension.vec3(-5, dir.y - 13, 0));
            vertices.push(threeDimension.vec3(0, dir.y + 5, 0));
            var triangle2 = threeDimension.createTriangleFace(vertices, "#000");
            threeDimension.axis.add(triangle2);
            text = threeDimension.createText('y', 20, dir.y + 10, 0, '#000', 28)
            threeDimension.axis.add(text);
        }
    },
    createLineMesh: function (vertices, color, style,width) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        if (style == 1) {
            vertices.push(threeDimension.vec3(vertices[0].x, vertices[0].y - 1, vertices[0].z));
            vertices.push(threeDimension.vec3(vertices[1].x, vertices[1].y - 1, vertices[1].z));
            vertices.push(threeDimension.vec3(vertices[0].x + 1, vertices[0].y, vertices[0].z));
            vertices.push(threeDimension.vec3(vertices[1].x + 1, vertices[1].y, vertices[1].z));
            vertices.push(threeDimension.vec3(vertices[0].x - 1, vertices[0].y, vertices[0].z));
            vertices.push(threeDimension.vec3(vertices[1].x - 1, vertices[1].y, vertices[1].z));
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        } else if (style == 2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 7,
                gapSize: 7,
                linewidth: width
            }));
        } else if (style == 3) {
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({
                color: color,
                linewidth: width,
                transparent: true,
                opacity: 0.7
            }));
        }
        return lineMesh;
    },
    createCircle: function (vertices, radius, color,opacity,end) {
        var CircleM = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 0.1});
        if (!end) {
            end = Math.PI * 2;
            var CircleM = new THREE.MeshBasicMaterial({color: color,transparent: true, opacity: 1});
            if(opacity == 0) {
                CircleM.opacity = 0;
            }
        }
        var CircleG = new THREE.CircleGeometry(radius, 50, 0, end);
        var Circle = new THREE.Mesh(CircleG, CircleM);
        Circle.position.x = vertices[0];
        Circle.position.y = vertices[1];
        Circle.position.z = vertices[2];
        return Circle;
    },
    createLine: function(point1,point2,lineK){
        var vertices = [];
        if(point1[0]-point2[0] == 0) {
            vertices.push(threeDimension.vec3(point1[0],400,0));
            vertices.push(threeDimension.vec3(point1[0],-400,0));
            if(lineK == "k1") {
                k1 = "不存在";
            }else if(lineK == "k2") {
                k2 = "不存在";
            } else if (lineK = "k3") {
                k3= "不存在";
            }
            return vertices;
        }

        var k = (point1[1]-point2[1])/(point1[0]-point2[0]);
        if(k>Math.tan(89*Math.PI/180)){
            k = Math.tan(89*Math.PI/180);
        }else if (k<Math.tan(91*Math.PI/180)) {
            k = Math.tan(91*Math.PI/180);
        }
        var y1=k*(440-point1[0])+point1[1];
        var y2=k*(-440-point1[0])+point1[1];
        //var y2 = -y1;
        var x1=(440-point1[1])/k+point1[0];
        var x2=(-440-point1[1])/k+point1[0];
        //var x2 = -x1;

        
       // console.log(y1+","+y2+","+x1+","+x2);
        


        if(lineK == "k1"){
            k1 = k.toFixed(2);
        }else if(lineK == "k2"){
            k2 = k.toFixed(2);
        }else if(lineK = "k3"){
            k3 =k.toFixed(2);
        }

        k4 = k.toFixed(2);

        //console.log(y1+","+y2+","+x1+","+x2);
        if(y1>=-440&&y1<=440){
            vertices.push(threeDimension.vec3(440,k*(440-point1[0])+point1[1],0));

        }else if(x1>=-440&&x1<=440){
            vertices.push(threeDimension.vec3((440-point1[1])/k+point1[0],440,0));
            
        }else if(y1>440||y1<-440){

            var y = k*(440-point1[0])+point1[1];
            if(y<-440||y>440){
                if(y<0){
                    vertices.push(threeDimension.vec3((-440-point1[1])/k+point1[0],-440,0));
                } 
             }else{
                
                vertices.push(threeDimension.vec3((-440-point1[1])/k+point1[0],-440,0));
             }

        }


        if(y2>=-440&&y2<=440){
            var y =k*(-440-point1[0])+point1[1];
            if(y>440||y<-440){
                if(y>0){
                    vertices.push(threeDimension.vec3((440-point1[1])/k+point1[0],440,0));
                }else{
                    vertices.push(threeDimension.vec3((-440-point1[1])/k+point1[0],-440,0));
                }
            }else{
                 vertices.push(threeDimension.vec3(-440,k*(-440-point1[0])+point1[1],0));
            }
           
        }else if(x2>=-440&&x2<=440){
            var x = (-440-point1[1])/k+point1[0];
            if(x>440||x<-440) {
                if(x>0){
                     vertices.push(threeDimension.vec3(-440,k*(440-point1[0])+point1[1],0));
                }else{
                     vertices.push(threeDimension.vec3(-440,k*(-440-point1[0])+point1[1],0));
                }
            }else{
                vertices.push(threeDimension.vec3((-440-point1[1])/k+point1[0],-440,0));
            }
        }else if(y2<-440||y2>440){
            var y = k*(440-point1[0])+point1[1];
            if(y<-440||y>440){
                if(y<0){
                    vertices.push(threeDimension.vec3((440-point1[1])/k+point1[0],440,0));
                } 
             }else{
                
                vertices.push(threeDimension.vec3((440-point1[1])/k+point1[0],440,0));
             }
        }
       // console.log(vertices);
       if(vertices[0].x<vertices[1].x) {
        vertices.reverse();
       }
        return vertices;

    },
    createObj: function(point){
        // if(P1Group != null ) {
        //     threeDimension.scene.remove(P1Group);
        // }
        if(threeDimension.Obj!=null){
            threeDimension.scene.remove(threeDimension.Obj);
            selectobjs=[];
        }
        var vertices;
        var line;
        var d;
        threeDimension.Obj = new THREE.Group();
        //p1点
        
        vertices = [];
        vertices.push(0,0,2);
        var P1=threeDimension.createCircle(vertices,5,'#6D6EFF');
        var P1Touch=threeDimension.createCircle(vertices,40,'#ff0000',0);
        P1Touch.name='p1';
        var P2 = threeDimension.createCircle(vertices,5,'#6D6EFF');
        var P2Touch = threeDimension.createCircle(vertices,40,'#ff0000',0);
        P2Touch.name = 'p2';
        var P3 = threeDimension.createCircle(vertices,5,'#6D6EFF');
        var P3Touch = threeDimension.createCircle(vertices,40,'#ff0000',0);
        P3Touch.name = 'p3';
        var P1Group = new THREE.Group();
        P1Group.add(P1,P1Touch);
        var vertices = [];
        for(var i=0;i<361;i=i+4){
            vertices.push(new THREE.Vector3(6*Math.cos(i*Math.PI/180),6*Math.sin(i*Math.PI/180),2));
        }
        var P1C = threeDimension.createLineMesh(vertices,'#000000',3,1);
        P1Group.add(P1C);
        P1Group.position.x = getParameter.p1x;
        P1Group.position.y = getParameter.p1y;

        var P2Group = new THREE.Group();
        P2Group.add(P2,P2Touch);
        var vertices = [];
        for(var i=0;i<361;i=i+4){
            vertices.push(new THREE.Vector3(6*Math.cos(i*Math.PI/180),6*Math.sin(i*Math.PI/180),2));
        }
        var P2C = threeDimension.createLineMesh(vertices,'#000000',3,1);
        P2Group.add(P2C);
        P2Group.position.x = getParameter.p2x;
        P2Group.position.y = getParameter.p2y;

        var P3Group = new THREE.Group();
        P3Group.add(P3,P3Touch);
        var vertices = [];
        for(var i=0;i<361;i=i+4){
            vertices.push(new THREE.Vector3(6*Math.cos(i*Math.PI/180),6*Math.sin(i*Math.PI/180),2));
        }
        var P3C = threeDimension.createLineMesh(vertices,'#000000',3,1);
        P3Group.add(P3C);
        P3Group.position.x = getParameter.p3x;
        P3Group.position.y = getParameter.p3y;

        //P2点
        // vertices = [];
        // vertices.push(getParameter.p2x,getParameter.p2y,1);
        // var P2=threeDimension.createCircle(vertices,5,'#6D6EFF');
        // P2.name='p2';
        // //P3点
        // vertices = [];
        // vertices.push(getParameter.p3x,getParameter.p3y,1);
        // var P3=threeDimension.createCircle(vertices,5,'#6D6EFF');
        // P3.name='p3';
        vertices = [];
        vertices = threeDimension.createLine([getParameter.p1x,getParameter.p1y],[getParameter.p2x,getParameter.p2y],"k1");
        var line1 = threeDimension.createLineMesh(vertices,"#299AED",3,4);

        var k1Length = "k ="+k1;

        if(k1 == "不存在") {
            k1Length = "111111111";
        } else if (k1<10&&k1>=0) {
            k1Length = "1111111";
        }

        // if(k1>=-1&&k1<0) {
        //     var textk1 = threeDimension.createText("k ="+k1,vertices[0].x+50,vertices[0].y,2,'#6D68FF',24);
        //     var textk11 = threeDimension.createText("1",vertices[0].x-k1Length.length/2*14+26+50,vertices[0].y-15,2,'#6D68FF',16);
        // } else {
            var textk1 = threeDimension.createText("k ="+k1,vertices[0].x+20,vertices[0].y+60,2,'#299AED',24);
            var xx=vertices[0].x-k1Length.length/2*14+25+40;
            xx=k1<0?xx+2.5:xx;
            var textk11 = threeDimension.createText("1",xx-20,vertices[0].y+45,2,'#299AED',16);
        // }
        vertices = [];
        vertices = threeDimension.createLine([getParameter.p1x,getParameter.p1y],[getParameter.p3x,getParameter.p3y],"k2");
        var line2 = threeDimension.createLineMesh(vertices,"#7ED321",3,4);

        var k2Length = "k ="+k2;
        if(k2 == "不存在") {
            k2Length = "111111111";
        } else if (k2<10&&k2>=0) {
            k2Length = "1111111";
        }

        // if(k2>=-1&&k2<0) {
        //     var textk2 = threeDimension.createText("k ="+k2,vertices[0].x+50,vertices[0].y,2,'#6D68FF',24);
        //     var textk22 = threeDimension.createText("2",vertices[0].x-k2Length.length/2*14+26+50,vertices[0].y-15,2,'#6D68FF',16);
        // } else {
            var textk2 = threeDimension.createText("k ="+k2,vertices[0].x-60,vertices[0].y+30,2,'#7ED321',24);
            var xx=vertices[0].x-k2Length.length/2*14+25+40;
            xx=k2<0?xx+2.5:xx;
            var textk22 = threeDimension.createText("2",xx-100,vertices[0].y+15,2,'#7ED321',16);
        // }
        vertices = [];
        vertices = threeDimension.createLine([getParameter.p2x,getParameter.p2y],[getParameter.p3x,getParameter.p3y],"k3");

        var k3Length = "k ="+k3;
        if(k3 == "不存在") {
            k3Length = "111111111";
        } else if (k3<10 && k3>0) {
            k3Length = "1111111";
        }

        // if(k3>=-1&&k3<0) {
        //     var textk3 = threeDimension.createText("k ="+k3,vertices[0].x+50,vertices[0].y,2,'#6D68FF',24);
        //     var textk33 = threeDimension.createText("3",vertices[0].x-k3Length.length/2*14+26+50,vertices[0].y-15,2,'#6D68FF',16);
        // } else {
            var textk3 = threeDimension.createText("k ="+k3,vertices[0].x+80,vertices[0].y+30,2,'#EF732C',24);
            var xx=vertices[0].x-k3Length.length/2*14+25+40;
            xx=k3<0?xx+2.5:xx;
            var textk33 = threeDimension.createText("3",xx+40,vertices[0].y+15,2,'#EF732C',16);
        // }
        var line3 = threeDimension.createLineMesh(vertices,"#EF732C",3,4);
        selectobjs.push(P1Touch,P2Touch,P3Touch);
        threeDimension.Obj.add(P1Group,P2Group,P3Group, line1,line2,line3,textk1,textk2,textk3,textk11,textk22,textk33);

        if(point == 1){
            var k =Math.abs(k1-k3);
            if((Math.abs(k3)<1&&k<0.05)||(Math.abs(k3)>1&&Math.abs(k3)<5&&k<0.2)||(Math.abs(k3)>5&&k<1)) {
                threeDimension.Obj.remove(line1,line2,line3,textk1,textk2,textk3,textk11,textk22,textk33);
                vertices = [];
                vertices = threeDimension.createLine([getParameter.p3x,getParameter.p3y],[getParameter.p2x,getParameter.p2y]);
                var line4 = threeDimension.createLineMesh(vertices,"#5CAEFD",3,5);
                var textk4 = threeDimension.createText("k="+k4,vertices[0].x+40,vertices[0].y+40,2,'#6D68FF',24);
                var y = k3*(getParameter.p1x-getParameter.p3x)+getParameter.p3y;
                P1Group.position.x = getParameter.p1x;
                P1Group.position.y = y;

                threeDimension.Obj.add(line4,textk4);
            }
            
        } else if(point == 2){
            var k =Math.abs(k1-k2);
            if((Math.abs(k2)<=1&&k<0.05)||(Math.abs(k2)>1&&Math.abs(k2)<=5&&k<0.2)||(Math.abs(k2)>5&&k<1)) {
                threeDimension.Obj.remove(line1,line2,line3,textk1,textk2,textk3,textk11,textk22,textk33);
                vertices = [];
                vertices = threeDimension.createLine([getParameter.p1x,getParameter.p1y],[getParameter.p3x,getParameter.p3y]);
                var line4 = threeDimension.createLineMesh(vertices,"#5CAEFD",3,5);
                var textk4 = threeDimension.createText("k="+k4,vertices[0].x+40,vertices[0].y+40,2,'#6D68FF',24);
                var y = k2*(getParameter.p2x-getParameter.p3x)+getParameter.p3y;

                P2Group.position.x = getParameter.p2x;
                P2Group.position.y = y;
                threeDimension.Obj.add(line4,textk4);
                
            }
            
        } else if(point == 3) {
            var k =Math.abs(k2-k1);
            if((Math.abs(k1)<=1&&k<0.05)||(Math.abs(k1)>1&&Math.abs(k1)<=5&&k<0.2)||(Math.abs(k1)>5&&k<1)) {
                threeDimension.Obj.remove(line1,line2,line3,textk1,textk2,textk3,textk11,textk22,textk33);
                vertices = [];
                vertices = threeDimension.createLine([getParameter.p1x,getParameter.p1y],[getParameter.p2x,getParameter.p2y]);
                var line4 = threeDimension.createLineMesh(vertices,"#5CAEFD",3,5);
                var textk4 = threeDimension.createText("k="+k4,vertices[0].x+40,vertices[0].y+40,2,'#6D68FF',24);
                var y = k1*(getParameter.p3x-getParameter.p2x)+getParameter.p2y;

                P3Group.position.x = getParameter.p3x;
                P3Group.position.y = y;
                threeDimension.Obj.add(line4,textk4);
            }
        }

        threeDimension.scene.add(threeDimension.Obj);
        
    },
    onDocumentMouseDown:function(event){
        event.preventDefault();
        var mouse={};
        mouse.x = ((event.clientX-offsetLeft) / threeWidth ) * 2 - 1;
        mouse.y = -( (event.clientY-offsetTop) / threeHeight ) * 2 + 1;
        raycaster.setFromCamera(mouse, threeDimension.camera);
        var intersects = raycaster.intersectObjects(selectobjs);
        if (intersects.length > 0) {
            selectobj = intersects[0].object;
            mousedownflag = true;
        }
    },
    onDocumentMouseMove:function(event){
        event.preventDefault();
        var mouse={};
        mouse.x = ((event.clientX-offsetLeft) / threeWidth ) * 2 - 1;
        mouse.y = -( (event.clientY-offsetTop) / threeHeight ) * 2 + 1;
        var intersects = raycaster.intersectObjects( selectobjs );
        raycaster.setFromCamera(mouse, threeDimension.camera);
        if ( intersects.length > 0 ) {
            if ( INTERSECTED != intersects[ 0 ].object ) {
                INTERSECTED = intersects[ 0 ].object;
                plane.setFromNormalAndCoplanarPoint(threeDimension.camera.getWorldDirection( plane.normal ),INTERSECTED.position );

            }
        }
        if(mousedownflag){
            if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                var obj = intersection.sub( offset ),x,y;
                x =obj.x;
                y = obj.y;
                if(Math.abs(x)>400){
                    if(x<0){
                        x=-400;
                    }else{
                        x=400;
                    }
                }
                if(Math.abs(y)>400){
                    if(y<0){
                        y=-400;
                    }else{
                        y=400;
                    }
                }
                if(selectobj.name=='p1'){
                    getParameter.p1x = (x/40).toFixed(1)*40;
                    getParameter.p1y = (y/40).toFixed(1)*40;
                    threeDimension.createObj(1);

                }else if(selectobj.name=='p2'){
                    getParameter.p2x = (x/40).toFixed(1)*40;
                    getParameter.p2y = (y/40).toFixed(1)*40;
                    threeDimension.createObj(2);
                }else if(selectobj.name == 'p3'){
                    getParameter.p3x = (x/40).toFixed(1)*40;
                    getParameter.p3y = (y/40).toFixed(1)*40;
                    threeDimension.createObj(3);
                }
                //threeDimension.createObj();
            }
        }
    },
    onDocumentMouseUp:function(event){
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;

    },
    onDocumentTouchStart:function(event){
        event.preventDefault();
        
        if (event.touches.length === 1) {
            var mouse={};
            mouse.x = ((event.touches[0].pageX-offsetLeft) / threeWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-offsetTop) / threeHeight ) * 2 + 1;
            raycaster.setFromCamera(mouse, threeDimension.camera);
            var intersects = raycaster.intersectObjects(selectobjs);
            if (intersects.length > 0) {
                selectobj = intersects[0].object;
                mousedownflag = true;
            }
        }
    },
    onDocumentTouchMove:function(event){
        event.preventDefault();
        if (event.touches.length === 1) {
            var mouse={};
            mouse.x = ((event.touches[0].pageX-offsetLeft) / threeWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-offsetTop) / threeHeight ) * 2 + 1;
            var intersects = raycaster.intersectObjects( selectobjs );
            raycaster.setFromCamera(mouse, threeDimension.camera);
            if ( intersects.length > 0 ) {
                if ( INTERSECTED != intersects[ 0 ].object ) {
                    INTERSECTED = intersects[ 0 ].object;
                    plane.setFromNormalAndCoplanarPoint(threeDimension.camera.getWorldDirection( plane.normal ),INTERSECTED.position );
                }
            }
            if(mousedownflag){
            if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
                var obj = intersection.sub( offset ),x,y;
                x =obj.x;
                y = obj.y;
                if(Math.abs(x)>400){
                    if(x<0){
                        x=-400;
                    }else{
                        x=400;
                    }
                }
                if(Math.abs(y)>400){
                    if(y<0){
                        y=-400;
                    }else{
                        y=400;
                    }
                }
                if(selectobj.name=='p1'){
                    getParameter.p1x = (x/40).toFixed(1)*40;
                    getParameter.p1y = (y/40).toFixed(1)*40;
                    threeDimension.createObj(1);

                }else if(selectobj.name=='p2'){
                    getParameter.p2x = (x/40).toFixed(1)*40;
                    getParameter.p2y = (y/40).toFixed(1)*40;
                    threeDimension.createObj(2);
                }else if(selectobj.name == 'p3'){
                    getParameter.p3x = (x/40).toFixed(1)*40;
                    getParameter.p3y = (y/40).toFixed(1)*40;
                    threeDimension.createObj(3);
                }
                //threeDimension.createObj();
            }
        }
        }
    },
    onDocumentTouchEnd:function(event){
        event.preventDefault();
        mousedownflag = false;
        selectobj = null;
    }
};

threeDimension.init();
function renderAll() {
    threeDimension.controls.update();
    requestAnimationFrame(renderAll);
    threeDimension.renderer.render(threeDimension.scene, threeDimension.camera);
}
renderAll();

threeDimension.renderer.domElement.addEventListener( 'mousedown', threeDimension.onDocumentMouseDown, false );
window.addEventListener( 'mouseup', threeDimension.onDocumentMouseUp, false );
threeDimension.renderer.domElement.addEventListener( 'mousemove', threeDimension.onDocumentMouseMove, false );
threeDimension.renderer.domElement.addEventListener( 'touchstart', threeDimension.onDocumentTouchStart, false );
threeDimension.renderer.domElement.addEventListener( 'touchmove', threeDimension.onDocumentTouchMove, false );
window.addEventListener( 'touchend', threeDimension.onDocumentTouchEnd, false );

function reset() {
    getParameter = {
        p1x:0,
        p1y:0,
        p2x:80,
        p2y:120,
        p3x:160,
        p3y:-80
    };
    threeDimension.createObj();
    threeDimension.camera.position.set(0, 0, 1200);
}

if (isMob) {
    $('#reset img').on('touchstart', reset);

} else {
    $('#reset img').on('click', reset);

}

