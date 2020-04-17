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

var select1=0;
var opened=0;
var fullScreen=0,$threeCon = $('#threeContainer'),$obj = $('#threeContainer'),threeWidth = $obj.width(),threeHeight = $obj.height();


function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var $obj = $('#threeContainer'),
        threeHeight = $obj.height(),
        threeWidth = $obj.width();

    var objs=null,objs2=null,pointM=null,pointN=null,textM=null,textN = null,axis=null;

    $('.verticalCenter').css('margin-top',($('#controlContainer').height() -119 - $('.verticalCenter').height() )/2);


    var changePoint1 = [100,100,0],changePoint2 = [300,300,300];
    var signStart1 = [[1,1,1],[1,1,0],[1,0,1],[1,0,0],[0,1,1],[0,1,0],[0,0,1],[0,0,0]];
    var nowSignStart1 = [[1,1,0],[1,0,1],[1,0,0],[0,1,1],[0,1,0],[0,0,1],[0,0,0]];
    var count1=2;
    var signStart2 = [[1,1,1],[1,1,0],[1,0,1],[1,0,0],[0,1,1],[0,1,0],[0,0,1],[0,0,0]];
    var nowSignStart2 = [[1,1,0],[1,0,1],[1,0,0],[0,1,1],[0,1,0],[0,0,1],[0,0,0]];
    var count2=2,lineMN=null;

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
        this.camera.position.x = 1000;
        this.camera.position.y = 1000;
        this.camera.position.z = 1000;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
       // this.createGrid();
        this.createAxis('#000');

        var textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};
        textM =  new SpriteText2D('M', textStyle);
        thiz.scene.add(textM);
        // textM.visible =false;
        pointM = createSphere(changePoint1,10,0x78cdf8);
        thiz.scene.add(pointM);

        textN =  new SpriteText2D('N', textStyle);
        thiz.scene.add(textN);
        // textN.visible =false;
        pointN = createSphere(changePoint2,10,0x78cdf8);
        thiz.scene.add(pointN);


        createPointP();
        createFuzhuLines();
        createLengzhu();

    };
    this.objStyle = function (color, fontsize) {
        return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        // this.controls.enableRotate =false;
        // this.controls.enablePan =false;
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
    this.createAxis = function(color){
        axis = new THREE.Group();
        labelAxis(-500, 50, 500,color);
        drawAxisArrow(vec3( -550, 0, 0 ), vec3( 550, 0, 0 ), color,1);
        drawAxisArrow(vec3( 0, -550, 0 ), vec3( 0, 550, 0 ), color,2);
        drawAxisArrow(vec3( 0, 0, -550 ), vec3( 0, 0, 550 ), color,3);
        this.scene.add( axis);
    };
    this.reback = function(){
        select1 = 0;

        changePoint1 = [100,100,0];
        changePoint2 = [300,300,300];
        signStart1 = [[1,1,1],[1,1,0],[1,0,1],[1,0,0],[0,1,1],[0,1,0],[0,0,1],[0,0,0]];
        nowSignStart1 = [[1,1,0],[1,0,1],[1,0,0],[0,1,1],[0,1,0],[0,0,1],[0,0,0]];
        count1=2;
        signStart2 = [[1,1,1],[1,1,0],[1,0,1],[1,0,0],[0,1,1],[0,1,0],[0,0,1],[0,0,0]];
        nowSignStart2 = [[1,1,0],[1,0,1],[1,0,0],[0,1,1],[0,1,0],[0,0,1],[0,0,0]];
        count2=2;

        createPointP();
        createFuzhuLines();
        createLengzhu();
        this.camera.position.x = 1000;
        this.camera.position.y = 1000;
        this.camera.position.z = 1000;

    };
    this.clickEve = function(){
        if(opened == 1){//打开
            if(select1 == 1){
                objs.visible = true;
            }else if(select1 == 3){
                objs2.visible = true;
            }
        }else if(opened == 2){
            if(select1 == 1){
                objs.visible = false;
            }else if(select1 == 3){
                objs2.visible = false;
            }
        }

    };
    this.renewM  = function(){
        var i,array=[];
        count1++;

        var num = Math.floor(Math.random()*nowSignStart1.length);
        array= nowSignStart1[num];
        nowSignStart1.splice(num,1);

        for(i=0;i<3;i++){
            num = Math.round(Math.random()*10);
            if(array[i] == 1){
                changePoint1[i] = num*50;
            }else{
                changePoint1[i] = -num*50;
            }
        }
        createPointP();
        createFuzhuLines();
        createLengzhu();

        if(select1 == 1){
            objs.visible = true;
            objs2.visible = false;
        }else if(select1 == 3){
            objs.visible = false;
            objs2.visible = true;
        }else{
            objs.visible = false;
            objs2.visible = false;
        }

        if(count1 >8){
            count1 = 1;
            nowSignStart1=[];
            for(i=0;i<signStart1.length;i++){
                array = [signStart1[i][0],signStart1[i][1],signStart1[i][2]];
                nowSignStart1.push(array);
            }
        }
    };
    this.renewN = function(){
        var i,array=[];
        count2++;

        var num = Math.floor(Math.random()*nowSignStart2.length);
        array= nowSignStart2[num];
        nowSignStart2.splice(num,1);

        for(i=0;i<3;i++){
            num = Math.random()*10;
            if(array[i] == 1){
                changePoint2[i] = num*50;
            }else{
                changePoint2[i] = -num*50;
            }
        }
        createPointP();
        createFuzhuLines();
        createLengzhu();

        if(select1 == 1){
            objs.visible = true;
            objs2.visible = false;
        }else if(select1 == 3){
            objs.visible = false;
            objs2.visible = true;
        }else{
            objs.visible = false;
            objs2.visible = false;
        }

        if(count2 >8){
            count2 = 1;
            nowSignStart2=[];
            for(i=0;i<signStart2.length;i++){
                array = [signStart2[i][0],signStart2[i][1],signStart2[i][2]];
                nowSignStart2.push(array);
            }
        }
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
                dashSize: 10,
                gapSize: 10
            }));
        }else if( style == 3){
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }
        return lineMesh;
    }
    function drawAxisArrow(origin, dir, _color,style){
        var vertices = [];

        vertices.push(new THREE.Vector3(origin.x,origin.y,origin.z));
        vertices.push(new THREE.Vector3(dir.x,dir.y,dir.z));

        var line = createLineMesh(vertices,_color,3);
        axis.add(line);

        if(style == 1){
            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,_color,3);
            axis.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,-5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,_color,3);
            axis.add(line);
        }else if(style == 2){

            vertices = [];
            vertices.push(new THREE.Vector3(5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,_color,3);
            axis.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(-5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,_color,3);
            axis.add(line);

        }else{
            vertices = [];
            vertices.push(new THREE.Vector3(5,0,-dir.z+20));
            vertices.push(new THREE.Vector3(0,0,-dir.z));
            line = createLineMesh(vertices,_color,3);
            axis.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(-5,0,-dir.z+20));
            vertices.push(new THREE.Vector3(0,0,-dir.z));
            line = createLineMesh(vertices,_color,3);
            axis.add(line);
        }
        // line = createLineMesh()

    }
    function labelAxis(start, stepSize, stop,color) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={},line=null,vertices=null;
        // label x axis:
        textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            if(i == 0){
                text = new SpriteText2D('O', textStyle);
                text.position.x = i - 10;
                text.position.y = - 10;
                axis.add(text);
            }
            // text = new SpriteText2D(i/50, textStyle);
            //
            // if(i == 0){
            //     text = new SpriteText2D(i/50, textStyle);
            //     text.position.x = i - 10;
            // }else{
            //     text.position.x = i;
            // }
            //
            // text.position.y = -15;
            // axis.add(text);

            vertices = [];

            vertices.push(new THREE.Vector3(i,0,0));
            vertices.push(new THREE.Vector3(i,10,0));

            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        text = new SpriteText2D('x', textStyle);
        text.position.x = stop+50;
        text.position.y = -15;
        axis.add(text);

        // label y axis:
        textStyle = {align: textAlign.center, font: '21px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for( i = start; i <= stop; i = i+stepSize) {
            if(i == 0){ continue;}
            // text = new SpriteText2D(i/50, textStyle);
            // text.position.x = -30;
            // text.position.y = i+10;
            // text.position.z = 0.2;
            // axis.add(text);

            vertices = [];

            vertices.push(new THREE.Vector3(0,i,0));
            vertices.push(new THREE.Vector3(-10,i,0));

            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        text = new SpriteText2D('z', textStyle);
        text.position.x = -15;
        text.position.y = stop+50;
        text.position.z = 0.2;
        axis.add(text);

        for( i = start; i <= stop; i = i+stepSize) {
            if(i == 0){ continue;}
            // text = new SpriteText2D(i/50, textStyle);
            // text.position.y = -30;
            // text.position.z = i+10;
            // text.position.x = 0.2;
            // axis.add(text);

            vertices = [];

            vertices.push(new THREE.Vector3(0,10,i));
            vertices.push(new THREE.Vector3(0,0,i));

            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }

        text = new SpriteText2D('y', textStyle);
        text.position.x = 0;
        text.position.y = -15;
        text.position.z = -stop-50;
        axis.add(text);
    }
    function vec3(x,y,z){
        return new THREE.Vector3(x, y, z);
    }
    function createSphere(coordinate, radius,color) {
        var sphereG = new THREE.SphereGeometry(radius, 15, 15, 0, 2 * Math.PI, 0, 2 * Math.PI);
        var sphereM = new THREE.MeshBasicMaterial({color: color});
        var sphere = new THREE.Mesh(sphereG, sphereM),x,y;
        x = coordinate[0];
        y = coordinate[1];
        sphere.position.x = x;
        sphere.position.y = y;
        sphere.position.z = coordinate[2];
        return sphere;
    }

    function createPointP(){
        pointM.position.x = changePoint1[0];
        pointM.position.y = changePoint1[2];
        pointM.position.z = -changePoint1[1];

        pointN.position.x = changePoint2[0];
        pointN.position.y = changePoint2[2];
        pointN.position.z = -changePoint2[1];

        textM.text = 'M('+(changePoint1[0]/50).toFixed(0)+','+(changePoint1[1]/50).toFixed(0)+','+(changePoint1[2]/50).toFixed(0)+')';
        textN.text = 'N('+(changePoint2[0]/50).toFixed(0)+','+(changePoint2[1]/50).toFixed(0)+','+(changePoint2[2]/50).toFixed(0)+')';
        //
        //
        textM.position.x = changePoint1[0];
        textM.position.y =  changePoint1[2]+40;
        textM.position.z = -changePoint1[1];

        textN.position.x = changePoint2[0];
        textN.position.y =  changePoint2[2]+40;
        textN.position.z = -changePoint2[1];

        if(lineMN != null){
            thiz.scene.remove(lineMN);
        }

        var vertices=[];
        vertices.push(new THREE.Vector3(changePoint1[0],changePoint1[2],-changePoint1[1]));
        vertices.push(new THREE.Vector3(changePoint2[0],changePoint2[2],-changePoint2[1]));
        lineMN = createLineMesh(vertices,'#000',3);
        thiz.scene.add(lineMN);

    }
    function createFuzhuLines(){
        if(objs!=null){
            thiz.scene.remove(objs);
        }
        objs = new THREE.Group();

        var array1=[],array2=[],array=[0,0,0],vertices=[],line=null;

        // array[0] = changePoint2[0];
        // array[1] = changePoint2[2];
        // array[2] = -changePoint2[1];

        array[0] = changePoint1[0];
        array[1] = changePoint1[2];
        array[2] = -changePoint1[1];
        array1.push(array);
        array=[0,0,0];
        array[0] = changePoint2[0];
        array[1] = changePoint1[2];
        array[2] = -changePoint1[1];
        array1.push(array);
        array=[0,0,0];
        array[0] = changePoint2[0];
        array[1] = changePoint2[2];
        array[2] = -changePoint1[1];
        array1.push(array);
        array=[0,0,0];
        array[0] = changePoint1[0];
        array[1] = changePoint2[2];
        array[2] = -changePoint1[1];
        array1.push(array);


        array = [0,0,0];
        array[0] = changePoint1[0];
        array[1] = changePoint1[2];
        array[2] = -changePoint2[1];
        array2.push(array);
        array=[0,0,0];
        array[0] = changePoint2[0];
        array[1] = changePoint1[2];
        array[2] = -changePoint2[1];
        array2.push(array);
        array=[0,0,0];
        array[0] = changePoint2[0];
        array[1] = changePoint2[2];
        array[2] = -changePoint2[1];
        array2.push(array);
        array=[0,0,0];
        array[0] = changePoint1[0];
        array[1] = changePoint2[2];
        array[2] = -changePoint2[1];
        array2.push(array);


        //创建z轴

        vertices=[];
        vertices.push(new THREE.Vector3(array1[0][0],array1[0][1],array1[0][2]));
        vertices.push(new THREE.Vector3(0,0,array1[1][2]));
        line = createLineMesh(vertices,'red',2);
        objs.add(line);

        vertices=[];
        vertices.push(new THREE.Vector3(array2[2][0],array2[2][1],array2[2][2]));
        vertices.push(new THREE.Vector3(0,0,array2[1][2]));
        line = createLineMesh(vertices,'red',2);
        objs.add(line);

        vertices=[];
        vertices.push(new THREE.Vector3(0,0,array1[1][2]));
        vertices.push(new THREE.Vector3(0,0,array2[1][2]));
        line = createLineMesh(vertices,'red',3);
        objs.add(line);

        //创建x轴
        vertices=[];
        vertices.push(new THREE.Vector3(array2[2][0],array2[2][1],array2[2][2]));
        vertices.push(new THREE.Vector3(array2[2][0],0,0));
        line = createLineMesh(vertices,'blue',2);
        objs.add(line);

        vertices=[];
        vertices.push(new THREE.Vector3(array1[0][0],array1[0][1],array1[0][2]));
        vertices.push(new THREE.Vector3(array2[3][0],0,0));
        line = createLineMesh(vertices,'blue',2);
        objs.add(line);

        vertices=[];
        vertices.push(new THREE.Vector3(array2[2][0],0,0));
        vertices.push(new THREE.Vector3(array2[3][0],0,0));
        line = createLineMesh(vertices,'blue',3);
        objs.add(line);

        vertices = [];

        vertices.push(new THREE.Vector3(array1[0][0],array1[0][1],array1[0][2]));
        vertices.push(new THREE.Vector3(0,array1[1][1],0));
        line = createLineMesh(vertices,'green',2);
        objs.add(line);

        vertices = [];
        vertices.push(new THREE.Vector3(array2[2][0],array2[2][1],array2[2][2]));
        vertices.push(new THREE.Vector3(0,array2[2][1],0));
        line = createLineMesh(vertices,'green',2);
        objs.add(line);

        vertices=[];
        vertices.push(new THREE.Vector3(0,array2[1][1],0));
        vertices.push(new THREE.Vector3(0,array2[2][1],0));
        line = createLineMesh(vertices,'green',3);
        objs.add(line);

        thiz.scene.add(objs);
        if(select1 == 1){
            objs.visible = true;
        }else{
            objs.visible = false;
        }
    }
    function createLengzhu(){
        if(objs2!=null){
            thiz.scene.remove(objs2);
        }
        objs2 = new THREE.Group();

        var array1=[],array2=[],array=[0,0,0],vertices=[];

        array[0] = changePoint1[0];
        array[1] = changePoint1[2];
        array[2] = -changePoint1[1];
        array1.push(array);
        array=[0,0,0];
        array[0] = changePoint2[0];
        array[1] = changePoint1[2];
        array[2] = -changePoint1[1];
        array1.push(array);
        array=[0,0,0];
        array[0] = changePoint2[0];
        array[1] = changePoint2[2];
        array[2] = -changePoint1[1];
        array1.push(array);
        array=[0,0,0];
        array[0] = changePoint1[0];
        array[1] = changePoint2[2];
        array[2] = -changePoint1[1];
        array1.push(array);

        vertices=[];
        vertices.push(new THREE.Vector3(array1[0][0],array1[0][1],array1[0][2]));
        vertices.push(new THREE.Vector3(array1[1][0],array1[1][1],array1[1][2]));
        var line = createLineMesh(vertices,'#000',2);
        objs2.add(line);

        vertices=[];
        vertices.push(new THREE.Vector3(array1[1][0],array1[1][1],array1[1][2]));
        vertices.push(new THREE.Vector3(array1[2][0],array1[2][1],array1[2][2]));
        line = createLineMesh(vertices,'#000',2);
        objs2.add(line);


        vertices=[];
        vertices.push(new THREE.Vector3(array1[2][0],array1[2][1],array1[2][2]));
        vertices.push(new THREE.Vector3(array1[3][0],array1[3][1],array1[3][2]));
        line = createLineMesh(vertices,'#000',2);
        objs2.add(line);
        //
        vertices=[];
        vertices.push(new THREE.Vector3(array1[0][0],array1[0][1],array1[0][2]));
        vertices.push(new THREE.Vector3(array1[3][0],array1[3][1],array1[3][2]));
        line = createLineMesh(vertices,'#000',2);
        objs2.add(line);


        array = [0,0,0];
        array[0] = changePoint1[0];
        array[1] = changePoint1[2];
        array[2] = -changePoint2[1];
        array2.push(array);
        array=[0,0,0];
        array[0] = changePoint2[0];
        array[1] = changePoint1[2];
        array[2] = -changePoint2[1];
        array2.push(array);
        array=[0,0,0];
        array[0] = changePoint2[0];
        array[1] = changePoint2[2];
        array[2] = -changePoint2[1];
        array2.push(array);
        array=[0,0,0];
        array[0] = changePoint1[0];
        array[1] = changePoint2[2];
        array[2] = -changePoint2[1];
        array2.push(array);

        vertices=[];
        vertices.push(new THREE.Vector3(array2[0][0],array2[0][1],array2[0][2]));
        vertices.push(new THREE.Vector3(array2[1][0],array2[1][1],array2[1][2]));
        line = createLineMesh(vertices,'#000',2);
        objs2.add(line);

        vertices=[];
        vertices.push(new THREE.Vector3(array2[1][0],array2[1][1],array2[1][2]));
        vertices.push(new THREE.Vector3(array2[2][0],array2[2][1],array2[2][2]));
        line = createLineMesh(vertices,'#000',2);
        objs2.add(line);


        vertices=[];
        vertices.push(new THREE.Vector3(array2[2][0],array2[2][1],array2[2][2]));
        vertices.push(new THREE.Vector3(array2[3][0],array2[3][1],array2[3][2]));
        line = createLineMesh(vertices,'#000',2);
        objs2.add(line);
        //
        vertices=[];
        vertices.push(new THREE.Vector3(array2[0][0],array2[0][1],array2[0][2]));
        vertices.push(new THREE.Vector3(array2[3][0],array2[3][1],array2[3][2]));
        line = createLineMesh(vertices,'#000',2);
        objs2.add(line);


        vertices=[];
        vertices.push(new THREE.Vector3(array1[0][0],array1[0][1],array1[0][2]));
        vertices.push(new THREE.Vector3(array2[0][0],array2[0][1],array2[0][2]));
        line = createLineMesh(vertices,'#000',2);
        objs2.add(line);

        vertices=[];
        vertices.push(new THREE.Vector3(array1[1][0],array1[1][1],array1[1][2]));
        vertices.push(new THREE.Vector3(array2[1][0],array2[1][1],array2[1][2]));
        line = createLineMesh(vertices,'#000',2);
        objs2.add(line);


        vertices=[];
        vertices.push(new THREE.Vector3(array1[3][0],array1[3][1],array1[3][2]));
        vertices.push(new THREE.Vector3(array2[3][0],array2[3][1],array2[3][2]));
        line = createLineMesh(vertices,'#000',2);
        objs2.add(line);
        //
        vertices=[];
        vertices.push(new THREE.Vector3(array1[2][0],array1[2][1],array1[2][2]));
        vertices.push(new THREE.Vector3(array2[2][0],array2[2][1],array2[2][2]));
        line = createLineMesh(vertices,'#000',2);
        objs2.add(line);

        thiz.scene.add(objs2);
        if(select1 == 2){
            objs2.visible = true;
        }else{
            objs2.visible = false;
        }
    }

}


var threeDimensional = new ThreeDimensional();
threeDimensional.int();

renderAll();
function renderAll(){
    threeDimensional.controls.update();
    requestAnimationFrame(renderAll);
    threeDimensional.renderer.render(threeDimensional.scene,threeDimensional.camera);
}

var $turnDiv = $('.turnDiv');

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
function turnRight(){
    var dataId = $(this).attr('data-id');
    if($(this).parent().hasClass('on')){
        opened = 2;
        $(this).parent().removeClass('on').addClass('off');
        $(this).parent().find('.span2').text('' +'off');

        if(dataId == 1 || dataId == 3){
            select1 = dataId;
            threeDimensional.clickEve();
        }
    }else{
        opened = 1;
        $(this).parent().removeClass('off').addClass('on');
        $(this).parent().find('.span2').text('' +'on');

        if(dataId == 1){
            select1 = 1;
            threeDimensional.clickEve();
        }else if(dataId == 3){
            select1 = 3;
            threeDimensional.clickEve();
        }
    }
}
function renew(){
    $turnDiv.removeClass('on').addClass('off');
    $turnDiv.find('.span2').text('' +'off');
    select1 = 0;
    threeDimensional.reback();
}
if(isMob){
    $('.turnRight').on('touchstart',turnRight);
    $('#createM').on('touchstart',threeDimensional.renewM);
    $('#createN').on('touchstart',threeDimensional.renewN);
    $('#renew').on('touchstart',renew);
    /*全屏事件*/
    $('#scale').on('touchstart',scalef);
}else{
    $('.turnRight').on('click',turnRight);
    $('#createM').on('click',threeDimensional.renewM);
    $('#createN').on('click',threeDimensional.renewN);
    $('#renew').on('click',renew);
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


