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
$(".showheight").css("margin-top",marginTop - h2Height - h2MarginTop+45);
var fullScreen=0,$threeCon = $('#threeContainer'),$obj = $('#threeContainer'),threeWidth = $obj.width(),threeHeight = $obj.height();


//选中操作相关变量
var raycaster = new THREE.Raycaster(),
    plane = new THREE.Plane(),
    offset = new THREE.Vector3(),
    intersection = new THREE.Vector3(),
    mouse = new THREE.Vector2(),
    INTERSECTED = null;
document.onselectstart=function(){
    return false;
};

var selectFunction = 1,radioSelect = 0,move=0;
var aa=2;
var bb=-3;
var cc=5;
var lineMesh1=null;
var lineMesh2=null;
var plane1=null;
var vertices1=[];
var vertices2=[];
var type1=false;
var type2=false;
var dashtype=false;
var textgroup=null;
var geometryLine1 = null;
var geometryLine2 = null;

function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var $obj = $('#threeContainer'),
        threeHeight = $obj.height(),
        threeWidth = $obj.width();

    var axis={},funcMode=null,funcs=[null,null,null,null];

    $('.verticalCenter').css('margin-top',(threeHeight-119 - $('.verticalCenter').height() - 45)/2);

    var thiz = this;
    var grid=null;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();
    this.renderer = null;
    if(canWebgl){
        this.renderer = new THREE.WebGLRenderer({antialias:true});
    }else{
        this.renderer = new THREE.CanvasRenderer();
    }
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.controls = null;


    this.int = function () {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 2800;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
       // this.createGrid();
        this.createAxis();
        this.createLine1();
        this.showfangchen();


    };
    this.objStyle = function (color, fontsize) {
        return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate =false;
        this.controls.enablePan =false;
    };
    this.createGrid = function(){
        var geometry = new THREE.Geometry(), bottom = -0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( { color: 0x949494, transparent: true, opacity: 0.5 } );
        for ( var i = 0; i <= 20; i ++ ) {
            geometry.vertices.push( new THREE.Vector3( - 1000, bottom, i * step - 1000 ) );
            geometry.vertices.push( new THREE.Vector3(   1000, bottom, i * step - 1000 ) );

            geometry.vertices.push( new THREE.Vector3(i * step - 1000, bottom, -1000));
            geometry.vertices.push( new THREE.Vector3( i * step - 1000, bottom,  1000 ) );
        }
        grid = new THREE.LineSegments( geometry, lineMaterial, THREE.LinePieces );
        this.scene.add( grid );
        window.gridColor = 0x303030;
        grid.rotation.x = Math.PI/2;
    };
    this.createAxis = function(){
        axis = new THREE.Group();
        labelAxis(-1000, 200, 1000);
        drawAxisArrow(vec3( -1100, 0, 0 ), vec3( 1100, 0, 0 ), 0x000000,1);
        drawAxisArrow(vec3( 0, -1100, 0 ), vec3( 0, 1100, 0 ), 0x000000,2);
        this.scene.add( axis);
    };
    function createLineMesh(vertices, color, style) {
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
    }
    function drawAxisArrow(origin, dir, _color,style){
        var geometryLine = new THREE.Geometry();
        var vertices = [];
        vertices.push(origin);
        vertices.push(dir);
        geometryLine.vertices = vertices;
        var line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: _color}));
        axis.add(line);

        if(style == 1){
            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,-5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }else{

            vertices = [];
            vertices.push(new THREE.Vector3(5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(-5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);

        }
        // line = createLineMesh()

    }
    function labelAxis(start, stepSize, stop) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={};
        var vertice1=null,line=null;
        // label x axis:
        textStyle = {align: textAlign.center, font: '35px Cambria Math', fillStyle: '#000000', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i/100, textStyle);

            if(i == 0){
                text.position.x = i - 10;
            }else{
                text.position.x = i;
            }

            text.position.y = -20;
            axis.add(text);
            vertice1=[];
            vertice1.push(new THREE.Vector3(i,0,0));
            vertice1.push(new THREE.Vector3(i,20,0));

            line = createLineMesh(vertice1,'#000',3);
            axis.add(line);
        }
        // text = new SpriteText2D('x', textStyle);
        // text.position.x = stop+100;
        // text.position.y = -15;
        // axis.add(text);

        // label y axis:
        textStyle = {align: textAlign.center, font: '35px Cambria Math', fillStyle: '#000000', antialias: true};
        for( i = start; i <= stop; i = i+stepSize) {
            if(i == 0){ continue;}
            text = new SpriteText2D(i/100, textStyle);
            text.position.x = -20;
            text.position.y = i;
            text.position.z = 0.2;
            axis.add(text);
            vertice1 = [];
            vertice1.push(new THREE.Vector3(0,i,0));
            vertice1.push(new THREE.Vector3(20,i,0));

            line = createLineMesh(vertice1,'#000',3);
            axis.add(line);
        }
        // text = new SpriteText2D('y', textStyle);
        // text.position.x = -15;
        // text.position.y = stop+100;
        // text.position.z = 0.2;
        // axis.add(text);
    }
    function vec3(x,y,z){
        return new THREE.Vector3(x, y, z);
    }
    function createMesh(geom,color){//对象和材质融合，创建路径对象
        var wireFrameMat = new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:0.9});
        var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [ wireFrameMat]);
        return mesh;
    };
    function createLineMesh(vertices, color, style) {
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
    }

    this.createLine1=function(){
        if(lineMesh1){
            this.scene.remove(lineMesh1)
        }
        if(aa==0&&bb==0){
            return;
        }
        var resulty1=(-aa/bb)*(-10)-cc/bb;
        var resulty2=(-aa/bb)*10-cc/bb;
        var resultx1=(-bb/aa)*10-cc/aa;
        var resultx2=(-bb/aa)*(-10)-cc/aa;
        vertices1=[];
        vertices2=[];
        var demo=-aa/bb;
        if(demo>0){
            if(resulty1*100<-1001){
                vertices1.push(vec3(resultx2*100,-1001,0));
            }else{
                vertices1.push(vec3(-1001,resulty1*100,0));
            }
            if(resulty2*100>1001){
                vertices1.push(vec3(resultx1*100,1001,0));
            }
            else{
                vertices1.push(vec3(1001,resulty2*100,0));
            }
        }
        if(demo<0){
            if(resulty1*100>1001){
                vertices1.push(vec3(resultx1*100,1001,0));
            }
            else{
                vertices1.push(vec3(-1001,resulty1*100,0));
            }
            if(resulty2*100<-1001){
                vertices1.push(vec3(resultx2*100,-1001,0));
            }
            else{
                vertices1.push(vec3(1001,resulty2*100,0));
            }
         }
        if(aa==0||bb==0){
            vertices1=[];
            if(aa==0){
                vertices1.push(vec3(-1001,resulty1*100,0));
                vertices1.push(vec3(1001,resulty2*100,0));
            }
            if(bb==0){
                vertices1.push(vec3(resultx1*100,1001,0));
                vertices1.push(vec3(resultx2*100,-1001,0));
            }
        }
        geometryLine1 = new THREE.Geometry();
        geometryLine2 = new THREE.Geometry();
        geometryLine1.vertices = vertices1;
        geometryLine2.vertices = vertices1;
        geometryLine2.computeLineDistances();
        lineMesh2 = new THREE.Line(geometryLine2,new THREE.LineDashedMaterial( { color: 0x0000ff,opacity:0.9, dashSize: 5, gapSize: 5 } ));
        lineMesh1 = new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: 0x0091B9}));
        this.scene.add(lineMesh1);
    };
    this.createPlane=function(type){
        if(plane1!=null){
            this.scene.remove(plane1);
        }
        var resulty1=(-aa/bb)*(-10)-cc/bb;
        var resulty2=(-aa/bb)*10-cc/bb;
        var demo=-aa/bb;
        vertices2=[];
        for(var j=0;j<vertices1.length;j++){
            vertices2.push(vertices1[j]);
        }
        if(type==1){
            if(bb==0){
                vertices2.push(vec3(-1001,-1001,0));
                vertices2.push(vec3(-1001,1001,0));
                var s1=vertices2.length;
                var shape = new THREE.Shape();
                shape.moveTo(vertices2[0].x,vertices2[0].y);
                for(var i=1;i<s1;i++){
                    shape.lineTo(vertices2[i].x,vertices2[i].y);
                }
                plane1 =createMesh(new THREE.ShapeGeometry(shape),0xC4DCA0);
                plane1.position.z = -1;
                this.scene.add(plane1);
                return;
            }
            if(demo>0){
                if(resulty2*100<1001){
                    vertices2.push(vec3(1001,1001,0));
                    vertices2.push(vec3(-1001,1001,0));
                    if(resulty1*100<-1001){
                        vertices2.push(vec3(-1001,-1001,0));
                    }
                }
                else{
                    vertices2.push(vec3(-1001,1001,0));
                    if(resulty1*100<-1001){
                        vertices2.push(vec3(-1001,-1001,0));
                    }
                }
            }
            else if(demo<0){
                if(resulty2*100<-1001){
                    vertices2.push(vec3(1001,-1001,0));
                    vertices2.push(vec3(1001,1001,0));
                    if(resulty1*100<1001){
                        vertices2.push(vec3(-1001,1001,0));
                    }
                }
                else{
                    vertices2.push(vec3(1001,1001,0));
                    if(resulty1*100<1001){
                        vertices2.push(vec3(-1001,1001,0));
                    }
                }
            }
            else{
                if(aa==0){
                    if(resulty1*100>-1001){
                        vertices2.push(vec3(1001,1001,0));
                        vertices2.push(vec3(-1001,1001,0));
                    }
                }else if(bb==0){
                    return;
                }
            }
        }
        if(type==2){
            if(bb==0){
                vertices2.push(vec3(1001,-1001,0));
                vertices2.push(vec3(1001,1001,0));
                var s1=vertices2.length;
                var shape = new THREE.Shape();
                shape.moveTo(vertices2[0].x,vertices2[0].y);
                for(var i=1;i<s1;i++){
                    shape.lineTo(vertices2[i].x,vertices2[i].y);
                }
                plane1 =createMesh(new THREE.ShapeGeometry(shape),0xC4DCA0);
                plane1.position.z = -1;
                this.scene.add(plane1);
                return;
            }
            else{
                if(demo>0){
                    if(resulty2*100>=1001){
                        vertices2.push(vec3(1001,1001,0));
                        vertices2.push(vec3(1001,-1001,0));
                        if(resulty1*100<=-1001){

                        }else if(resulty1*100<1001){
                            vertices2.push(vec3(-1001,-1001,0));
                        }
                        else{

                        }
                    }
                    else{
                        vertices2.push(vec3(1001,-1001,0));
                        if(resulty1*100<=-1001){

                        }else if(resulty1*100<1001){
                            vertices2.push(vec3(-1001,-1001,0));
                        }
                        else{

                        }
                    }
                }else if(demo<0){
                    if(resulty2*100>-1001){
                        vertices2.push(vec3(1001,-1001,0));
                        if(resulty1*100>1001){
                            vertices2.push(vec3(-1001,-1001,0));
                            vertices2.push(vec3(-1001,1001,0));
                        }
                        else{
                            vertices2.push(vec3(-1001,-1001,0));
                        }
                    }
                    else{
                        if(resulty1*100>1001){
                            vertices2.push(vec3(-1001,-1001,0));
                            vertices2.push(vec3(-1001,1001,0));
                        }
                        else{
                            vertices2.push(vec3(-1001,-1001,0));
                        }
                    }

                }
                else{
                    if(aa==0){
                        if(resulty1*100>-1001){
                            vertices2.push(vec3(1001,-1001,0));
                            vertices2.push(vec3(-1001,-1001,0));
                        }
                    }else if(bb==0){
                        return;
                    }
                }
            }

        }
        var s1=vertices2.length;
        // console.log(vertices2);
        var shape = new THREE.Shape();
        shape.moveTo(vertices2[0].x,vertices2[0].y);
        for(var i=1;i<s1;i++){
            shape.lineTo(vertices2[i].x,vertices2[i].y);
        }
        plane1 =createMesh(new THREE.ShapeGeometry(shape),0xC4DCA0);
        plane1.position.z = -1;
        this.scene.add(plane1);

    };

    this.showfangchen=function(){
        if(textgroup!=null){
            this.scene.remove(textgroup);
        }
        a=aa;
        b=bb;
        c=cc,text=null;
        textgroup=new THREE.Group();
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = null;
        var position=0;
        if(a!=0){
            if(a==1){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '000', antialias: true};
                text = new SpriteText2D('x', textStyle);
                text.position.x = 0;
                textgroup.add(text);
                position+=25;
            }
            else if(a==-1){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('-x', textStyle);
                text.position.x = 0;
                textgroup.add(text);
                position+=30;
            }
            else if(a==-10 || a==10){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D(a+'x', textStyle);
                text.position.x = 0;
                textgroup.add(text);
                position+=50;
            }
            else{
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D(a+'x', textStyle);
                text.position.x = 0;
                textgroup.add(text);
                position+=40;
            }
        }
        if(b!=0){
            if(b>0){
                if(a!=0){
                    textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                    text = new SpriteText2D('+', textStyle);
                    text.position.x = position;
                    textgroup.add(text);
                    position+=35;
                    if(b==1){
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D('y', textStyle);
                        text.position.x = position;
                        textgroup.add(text);
                        position+=30;
                    }
                    else if(b==10){
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D(b+'y', textStyle);
                        text.position.x = position;
                        textgroup.add(text);
                        position+=50;
                    }
                    else{
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D(b+'y', textStyle);
                        text.position.x = position;
                        textgroup.add(text);
                        position+=40;
                    }
                }
                else {
                    if(b==1){
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D('y', textStyle);
                        text.position.x = position;
                        textgroup.add(text);
                        position+=35;
                    }
                    else if(b==10){
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D(b+'y', textStyle);
                        text.position.x = position;
                        textgroup.add(text);
                        position+=50;
                    }
                    else{
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D(b+'y', textStyle);
                        text.position.x = position;
                        textgroup.add(text);
                        position+=40;
                    }
                }
            }
                if(b<0){
                    textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                    text = new SpriteText2D('-', textStyle);
                    text.position.x = position;
                    textgroup.add(text);
                    position+=32;
                    if(b==-1){
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D('y', textStyle);
                        text.position.x = position;
                        textgroup.add(text);
                        position+=30;
                    }
                    else if(b==-10){
                        b=-b;
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D(b+'y', textStyle);
                        text.position.x = position;
                        textgroup.add(text);
                        position+=50;
                    }
                    else{
                        b=-b;
                        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                        text = new SpriteText2D(b+'y', textStyle);
                        text.position.x = position;
                        textgroup.add(text);
                        position+=40;
                    }
                }
        }
        if(c!=0){
            if(c>0){
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('+'+c, textStyle);
                text.position.x = position;
                textgroup.add(text);
                position+=60;
            }
            else{
                c=-c;
                textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
                text = new SpriteText2D('-'+c, textStyle);
                text.position.x = position;
                textgroup.add(text);
                position+=40;
            }
        }
        textStyle = {align: textAlign.center, font: '30px "Cambria Math"', fillStyle: '#000', antialias: true};
        text = new SpriteText2D('=0', textStyle);
        text.position.x = position;
        textgroup.add(text);
        position+=20;
        if(a==0 && b==0 &c==0){
            text.visible=false;
        }
        textgroup.position.x=500;
        textgroup.position.y=600;
        textgroup.position.z=800;
        this.scene.add(textgroup);

    };

    this.reback=function(){
        if($('#div1').hasClass('on')){
            $('#div1').removeClass('on').addClass('off');
            $('#div1').find('.span2').text('' +'off')
        }
        if($('#div2').hasClass('on')){
            $('#div2').removeClass('on').addClass('off');
            $('#div2').find('.span2').text('' +'off')
        }
        if($('#div3').hasClass('on')){
            $('#div3').removeClass('on').addClass('off');
            $('#div3').find('.span2').text('' +'off')
        }
        if($('#div4').hasClass('on')){
            $('#div4').removeClass('on').addClass('off');
            $('#div4').find('.span2').text('' +'off')
        }
        $('.slider1 .sliderLeft').css('width','246px');
        $('.slider2 .sliderLeft').css('width','124px');
        $('.slider3 .sliderLeft').css('width','308px');
        type1=false;
        type2=false;
        dashtype=false;
        $('#slider1').range2DSlider({
            template:'horizontal',
            value:[[2,0]],
            axis:[[-10,10]],
            showLegend:false,
            printLabel:function(val){
                return parseInt(val[0]);
            }

        });
        $('#slider2').range2DSlider({
            template:'horizontal',
            value:[[-3,0]],
            axis:[[-10,10]],
            showLegend:false,
            printLabel:function(val){
                return parseInt(val[0]);
            }
        });
        $('#slider3').range2DSlider({
            template:'horizontal',
            value:[[5,0]],
            axis:[[-10,10]],
            showLegend:false,
            printLabel:function(val){
                return parseInt(val[0]);
            }
        });
        if(lineMesh2!=null){
            threeDimensional.scene.remove(lineMesh2);
        }
        // threeDimensional.scene.remove(lineMesh1);
        threeDimensional.scene.remove(plane1);

        // threeDimensional.scene.remove(textgroup);
        threeDimensional.camera.position.x = 0;
        threeDimensional.camera.position.y = 0;
        threeDimensional.camera.position.z = 2800;
         aa=2;
         bb=-3;
         cc=5;
        threeDimensional.createLine1();
        threeDimensional.showfangchen()
    };
}


var threeDimensional = new ThreeDimensional();
threeDimensional.int();

renderAll();
function renderAll(){
    threeDimensional.controls.update();
    requestAnimationFrame(renderAll);
    threeDimensional.renderer.render(threeDimensional.scene,threeDimensional.camera);
}

$("#slider1").change(function(){
    var s1 = parseInt(this.value);
    aa = s1;
    if(lineMesh2!=null){
        threeDimensional.scene.remove(lineMesh2);
    }
    threeDimensional.createLine1();
    threeDimensional.showfangchen();
    if(type1){
        if(bb<0){
            threeDimensional.createPlane(1);
        }else if(bb==0){
            if(aa>0){
                threeDimensional.createPlane(1);
            }else if(aa<0){
                threeDimensional.createPlane(2);
            }
        }else{
            threeDimensional.createPlane(2);
        }
    }
    if(type2){
        if(bb<0){
            threeDimensional.createPlane(2);
        }else if(bb==0){
            if(aa>0){
                threeDimensional.createPlane(2);
            }else if(aa<0){
                threeDimensional.createPlane(1);
            }
        }else{
            threeDimensional.createPlane(1);
        }
    }
    if(dashtype){
        if(lineMesh1!=null){
            threeDimensional.scene.remove(lineMesh1);
            threeDimensional.scene.add(lineMesh2);
        }
    }
    if(bb==0&&aa==0){
        cc=0;
        $('#slider3').range2DSlider({
            template:'horizontal',
            value:[[0,0]],
            axis:[[-10,10]],
            showLegend:false,
            printLabel:function(val){
                return parseInt(val[0]);
            }
        });
        if($('#div1').hasClass('on')){
            $('#div1').removeClass('on').addClass('off');
            $('#div1').find('.span2').text('' +'off')
        }
        if($('#div2').hasClass('on')){
            $('#div2').removeClass('on').addClass('off');
            $('#div2').find('.span2').text('' +'off')
        }
        if($('#div3').hasClass('on')){
            $('#div3').removeClass('on').addClass('off');
            $('#div3').find('.span2').text('' +'off')
        }
        if($('#div4').hasClass('on')){
            $('#div4').removeClass('on').addClass('off');
            $('#div4').find('.span2').text('' +'off')
        }
        $('.slider3 .sliderLeft').css('width','191px');
        type1=false;
        type2=false;
        dashtype=false;
        threeDimensional.scene.remove(lineMesh1);
        threeDimensional.scene.remove(lineMesh2);
        threeDimensional.scene.remove(plane1);
    }

});
$("#slider2").change(function(){
    var s2 = parseInt(this.value);
    bb = s2;
    if(lineMesh2!=null){
        threeDimensional.scene.remove(lineMesh2);
    }
    threeDimensional.createLine1();
    threeDimensional.showfangchen();
    if(type1){
        if(bb<0){
            threeDimensional.createPlane(1);
        }else if(bb==0){
            if(aa>0){
                threeDimensional.createPlane(1);
            }else if(aa<0){
                threeDimensional.createPlane(2);
            }
        }else{
            threeDimensional.createPlane(2);
        }
    }
    if(type2){
        if(bb<0){
            threeDimensional.createPlane(2);
        }else if(bb==0){
            if(aa>0){
                threeDimensional.createPlane(2);
            }else if(aa<0){
                threeDimensional.createPlane(1);
            }
        }else{
            threeDimensional.createPlane(1);
        }
    }
    if(dashtype){
        if(lineMesh1!=null){
            threeDimensional.scene.remove(lineMesh1);
            threeDimensional.scene.add(lineMesh2);
        }
    }
    if(bb==0&&aa==0){
        cc=0;
        $('#slider3').range2DSlider({
            template:'horizontal',
            value:[[0,0]],
            axis:[[-10,10]],
            showLegend:false,
            printLabel:function(val){
                return parseInt(val[0]);
            }
        });
        if($('#div1').hasClass('on')){
            $('#div1').removeClass('on').addClass('off');
            $('#div1').find('.span2').text('' +'off')
        }
        if($('#div2').hasClass('on')){
            $('#div2').removeClass('on').addClass('off');
            $('#div2').find('.span2').text('' +'off')
        }
        if($('#div3').hasClass('on')){
            $('#div3').removeClass('on').addClass('off');
            $('#div3').find('.span2').text('' +'off')
        }
        if($('#div4').hasClass('on')){
            $('#div4').removeClass('on').addClass('off');
            $('#div4').find('.span2').text('' +'off')
        }
        $('.slider3 .sliderLeft').css('width','191px');
        type1=false;
        type2=false;
        dashtype=false;
        threeDimensional.scene.remove(lineMesh1);
        threeDimensional.scene.remove(lineMesh2);
        threeDimensional.scene.remove(plane1);
    }
});
$("#slider3").change(function(){
    if(bb==0&&aa==0){
        $('.slider3 .xdsoft_range2dslider_runner').css('left','205px');
        $('.slider3 .sliderLeft').css('width','205px');
        $('#slider3').range2DSlider({
            template:'horizontal',
            value:[[0,0]],
            axis:[[-10,10]],
            showLegend:false,
            printLabel:function(val){
                return parseInt(val[0]);
            }
        });
        return;
    }
    if(lineMesh2!=null){
        threeDimensional.scene.remove(lineMesh2);
    }
    threeDimensional.createLine1();
    threeDimensional.showfangchen();
    if(type1){
        if(bb<0){
            threeDimensional.createPlane(1);
        }else if(bb==0){
            if(aa>0){
                threeDimensional.createPlane(1);
            }else if(aa<0){
                threeDimensional.createPlane(2);
            }
        }else{
            threeDimensional.createPlane(2);
        }
    }
    if(type2){
        if(bb<0){
            threeDimensional.createPlane(2);
        }else if(bb==0){
            if(aa>0){
                threeDimensional.createPlane(2);
            }else if(aa<0){
                threeDimensional.createPlane(1);
            }
        }else{
            threeDimensional.createPlane(1);
        }
    }
    if(dashtype){
        if(lineMesh1!=null){
            threeDimensional.scene.remove(lineMesh1);
            threeDimensional.scene.add(lineMesh2);
        }
    }
    var s3 = parseInt(this.value);
    cc = s3;
});

function div1(){
	if(aa==0&&bb==0){
        return;
    }
    if($('#div1').hasClass('on')){
        dashtype=false;
        type2=false;
        if(lineMesh2!=null){
            threeDimensional.scene.remove(lineMesh2);
            threeDimensional.scene.add(lineMesh1);
        }
        threeDimensional.scene.remove(plane1);
        $('#div1').removeClass('on').addClass('off');
        $('#div1').find('.span2').text('' +'off')
    }else{
        type2=true;
        dashtype=true;
        if($('#div2').hasClass('on')){
            $('#div2').removeClass('on').addClass('off');
            $('#div2').find('.span2').text('' +'off');
        }
        if($('#div3').hasClass('on')){
            type1=false;
            $('#div3').removeClass('on').addClass('off');
            $('#div3').find('.span2').text('' +'off');
        }
        if($('#div4').hasClass('on')){
            type1=false;
            $('#div4').removeClass('on').addClass('off');
            $('#div4').find('.span2').text('' +'off');
        }
        if(lineMesh1!=null){
            threeDimensional.scene.remove(lineMesh1);
            threeDimensional.scene.add(lineMesh2);
        }
        threeDimensional.scene.remove(plane1);
        threeDimensional.createPlane(2);
        if(bb<0){
            threeDimensional.createPlane(2);
        }else if(bb==0){
            if(aa>0){
                threeDimensional.createPlane(2);
            }else if(aa<0){
                threeDimensional.createPlane(1);
            }
        }else{
            threeDimensional.createPlane(1);
        }
        $('#div1').removeClass('off').addClass('on');
        $('#div1').find('.span2').text('' +'on')
    }
}
function div2(){
	dashtype=false;
    if(aa==0&&bb==0){
        return;
    }
    if($('#div2').hasClass('on')){
        type2=false;
        threeDimensional.scene.remove(plane1);
        $('#div2').removeClass('on').addClass('off');
        $('#div2').find('.span2').text('' +'off')
    }else{
        type2=true;
        if($('#div1').hasClass('on')){
            $('#div1').removeClass('on').addClass('off');
            $('#div1').find('.span2').text('' +'off')
        }
        if($('#div3').hasClass('on')){
            type1=false;
            $('#div3').removeClass('on').addClass('off');
            $('#div3').find('.span2').text('' +'off')
        }
        if($('#div4').hasClass('on')){
            type1=false;
            $('#div4').removeClass('on').addClass('off');
            $('#div4').find('.span2').text('' +'off')
        }
        if(lineMesh2!=null){
            threeDimensional.scene.remove(lineMesh2);
            threeDimensional.scene.add(lineMesh1);
        }
        threeDimensional.scene.remove(plane1);
        if(bb<0){
            threeDimensional.createPlane(2);
        }else if(bb==0){
            if(aa>0){
                threeDimensional.createPlane(2);
            }else if(aa<0){
                threeDimensional.createPlane(1);
            }
        }else{
            threeDimensional.createPlane(1);
        }
        $('#div2').removeClass('off').addClass('on');
        $('#div2').find('.span2').text('' +'on')
    }
}
function div3(){
	if(aa==0&&bb==0){
        return;
    }
    if($('#div3').hasClass('on')){
        type1=false;
        dashtype=false;
        if(lineMesh2!=null){
            threeDimensional.scene.remove(lineMesh2);
            threeDimensional.scene.add(lineMesh1);
        }
        threeDimensional.scene.remove(plane1);
        $('#div3').removeClass('on').addClass('off');
        $('#div3').find('.span2').text('' +'off')
    }else{
        type1=true;
        dashtype=true;
        if($('#div1').hasClass('on')){
            type2=false;
            $('#div1').removeClass('on').addClass('off');
            $('#div1').find('.span2').text('' +'off')
        }
        if($('#div2').hasClass('on')){
            type2=false;
            $('#div2').removeClass('on').addClass('off');
            $('#div2').find('.span2').text('' +'off');
        }
        if($('#div4').hasClass('on')){
            $('#div4').removeClass('on').addClass('off');
            $('#div4').find('.span2').text('' +'off')
        }
        if(lineMesh1!=null){
            threeDimensional.scene.remove(lineMesh1);
            threeDimensional.scene.add(lineMesh2);
        }
        threeDimensional.scene.remove(plane1);
        if(bb<0){
            threeDimensional.createPlane(1);
        }else if(bb==0){
            if(aa>0){
                threeDimensional.createPlane(1);
            }else if(aa<0){
                threeDimensional.createPlane(2);
            }
        }else{
            threeDimensional.createPlane(2);
        }
        $('#div3').removeClass('off').addClass('on');
        $('#div3').find('.span2').text('' +'on')
    }
}
function div4(){
	dashtype=false;
    if(aa==0&&bb==0){
        return;
    }
    if($('#div4').hasClass('on')){
        type1=false;
        threeDimensional.scene.remove(plane1);
        $('#div4').removeClass('on').addClass('off');
        $('#div4').find('.span2').text('' +'off')
    }else{
        type1=true;
        if($('#div1').hasClass('on')){
            type2=false;
            $('#div1').removeClass('on').addClass('off');
            $('#div1').find('.span2').text('' +'off')
        }
        if($('#div2').hasClass('on')){
            type2=false;
            $('#div2').removeClass('on').addClass('off');
            $('#div2').find('.span2').text('' +'off');
        }
        if($('#div3').hasClass('on')){
            $('#div3').removeClass('on').addClass('off');
            $('#div3').find('.span2').text('' +'off')
        }
        if(lineMesh2!=null){
            threeDimensional.scene.remove(lineMesh2);
            threeDimensional.scene.add(lineMesh1);
        }
        threeDimensional.scene.remove(plane1);
        if(bb<0){
            threeDimensional.createPlane(1);
        }else if(bb==0){
            if(aa>0){
                threeDimensional.createPlane(1);
            }else if(aa<0){
                threeDimensional.createPlane(2);
            }
        }else{
            threeDimensional.createPlane(2);
        }
        $('#div4').removeClass('off').addClass('on');
        $('#div4').find('.span2').text('' +'on')
    }
}
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

if(isMob){
	$('#div1').on('touchstart',div1);
	$('#div2').on('touchstart',div2);
	$('#div3').on('touchstart',div3);
	$('#div4').on('touchstart',div4);
	$('#renew').on('touchstart',threeDimensional.reback);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	$('#div1').on('click',div1);
	$('#div2').on('click',div2);
	$('#div3').on('click',div3);
	$('#div4').on('click',div4);
	$('#renew').on('click',threeDimensional.reback);
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



