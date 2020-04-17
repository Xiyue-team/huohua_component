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
        var marginTop = ($body.width()/bodyWidth*bodyHeight-1200)/2;
        $('.body').css("margin-top",'-600px');
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


var moved=false,timg=0,timg1=0,storeArray=[[0,0,0],[0,0,0],[0,0,0]];

function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var thiz = this;



    var pointsStartArray =[[100,100,100],[100,0,1],[200,0,100]];
    var pointsCreateArray = [[100,100,100],[100,0,100],[200,0,100],[100,50,100],[200, -100, 100]]; //A、B、C、D、E点 D为ab的中点 E为C的另一个点与AB平行
    var pointA = null,textA=null,pointB=null,textB=null,lineAB=null,textlineAB=null,pointC=null,textC=null,pointD=null,textD=null,lineCD=null,textlineCD=null,pointE=null,textE=null,lineCE=null,textlineCE=null;
    var plane = null;

    var array=[],array1=[],array2=[],array3=[],array4=[];



    var grid=null,count=0,count1=0;

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
        this.camera.position.x = 1200;
        this.camera.position.y = 1200;
        this.camera.position.z = 1200;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
        this.createGrid();

        pointA = this.createSphere(pointsCreateArray[0],12);
        this.scene.add(pointA);
        array.push(pointA);

        textA = this.createText('A',pointsCreateArray[0],'#000');
        this.scene.add(textA);
        array.push(textA);

        pointB = this.createSphere(pointsCreateArray[1],12);
        this.scene.add(pointB);
        array.push(pointB);

        textB = this.createText('B',pointsCreateArray[1],'#000');
        this.scene.add(textB);
        array.push(textB);

        pointC = this.createSphere(pointsCreateArray[2],12);
        this.scene.add(pointC);
        array.push(pointC);

        textC = this.createText('C',pointsCreateArray[2],'#000');
        this.scene.add(textC);
        array.push(textC);

        pointD = this.createSphere([(pointsCreateArray[0][0]+pointsCreateArray[1][0])/2,(pointsCreateArray[0][1]+pointsCreateArray[1][1])/2,(pointsCreateArray[0][2]+pointsCreateArray[1][2])/2],18);
        this.scene.add(pointD);
        array3.push(pointD);

        textD = this.createText('D',pointsCreateArray[3],'#000');
        this.scene.add(textD);
        array3.push(textD);

        this.planeRotation();



        this.createLineAB();

        lineAB.visible = false;
        textlineAB.visible = false;
        pointD.visible = false;
        textD.visible = false;
        lineCD.visible = false;
        textlineCD.visible = false;
        //pointE.visible = false;
        // textE.visible = false;
        lineCE.visible = false;
        textlineCE.visible = false;


    };
    this.objStyle = function (color, fontsize) {
        return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
    };
    this.createLineMesh = function (vertices, color, style) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        //geometryLine.vertices = vertices;
        if (!color) {
            color = '#000';
        }
        if (!style) {
            vertices.push(new THREE.Vector3(vertices[0].x,vertices[0].y-2,vertices[0].z));
            vertices.push(new THREE.Vector3(vertices[1].x,vertices[1].y-2,vertices[1].z));
            vertices.push(new THREE.Vector3(vertices[0].x+2,vertices[0].y,vertices[0].z));
            vertices.push(new THREE.Vector3(vertices[1].x+2,vertices[1].y,vertices[1].z));
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        } else {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 5,
                gapSize: 5
            }));
        }
        return lineMesh;
    };
    this.createText = function (content, coordinate, color,ischange) {
        if (!color) {
            color = '#000';
        }
        var fontsize = '25px Cambria Math';

        var textStyle = this.objStyle(color, fontsize),
            text = new SpriteText2D(content, textStyle),x,y,z;


        if(ischange){
            text.position.set(coordinate[0], coordinate[1], coordinate[2]);
        }else{
            if(coordinate[0]>0){ x = coordinate[0]+40;}else{x = coordinate[0]-40; }
            if(coordinate[1]>0){ y = coordinate[1]+40;}else{y = coordinate[1]-40; }
            if(coordinate[2]>0){ z = coordinate[2]+40;}else{z = coordinate[2]-40; }
            text.position.set(x, y, z);
        }

        return text;
    };
    this.createSphere = function (coordinate, radius) {
        var sphereG = new THREE.SphereGeometry(radius, 32, 32, 0, 2 * Math.PI, 0, 2 * Math.PI);
        var sphereM = new THREE.MeshBasicMaterial({color: '#4c84bd'});
        var sphere = new THREE.Mesh(sphereG, sphereM);
        sphere.position.x = coordinate[0];
        sphere.position.y = coordinate[1]; 
        sphere.position.z = coordinate[2];
        return sphere;
    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
    };
    this.createGrid = function(){
        var geometry = new THREE.Geometry(), bottom = -0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( { color: 0x949494, transparent: true, opacity: 0.9 } );
        for ( var i = 0; i <= 20; i ++ ) {
            geometry.vertices.push( new THREE.Vector3( - 500, bottom, i * step - 500 ) );
            geometry.vertices.push( new THREE.Vector3(   500, bottom, i * step - 500 ) );

            geometry.vertices.push( new THREE.Vector3(i * step - 500, bottom, -500));
            geometry.vertices.push( new THREE.Vector3( i * step - 500, bottom,  500 ) );
        }
        grid = new THREE.LineSegments( geometry, lineMaterial, THREE.LinePieces );
        this.scene.add( grid );
        window.gridColor = 0x303030;
    };
    this.planeRotation = function(){

        if(plane!=undefined){
            this.scene.remove(plane);
        }

        var vertices = [],faces=[];

        vertices.push(new THREE.Vector3(pointsCreateArray[0][0],pointsCreateArray[0][1],pointsCreateArray[0][2]));
        vertices.push(new THREE.Vector3(pointsCreateArray[1][0],pointsCreateArray[1][1],pointsCreateArray[1][2]));
        vertices.push(new THREE.Vector3(pointsCreateArray[2][0],pointsCreateArray[2][1],pointsCreateArray[2][2]));
        vertices.push(new THREE.Vector3(pointsCreateArray[4][0],pointsCreateArray[4][1],pointsCreateArray[4][2]));

        faces.push( new THREE.Face3(0,1,2));
        // faces.push( new THREE.Face3(2,0,3));
        faces.push( new THREE.Face3(2,1,3));
        var geom = new THREE.Geometry();
        geom.vertices = vertices;
        geom.faces = faces;
        geom.computeFaceNormals();
        var materials = new THREE.MeshBasicMaterial({color:'#81CDF4',opacity:0,transparent:true,side:THREE.DoubleSide});

        plane = new THREE.Mesh(geom,materials);
        this.scene.add(plane);

        array1.push(plane);
        array2.push(plane);
        array3.push(plane);
        array4.push(plane);

        if(!styleValue){
            plane.visible = false;
        }else{
            plane.visible = true;
        }


    };
    this.reback = function(){
        var i,j;

        for(i=0;i<pointsStartArray.length;i++){
            for( j =0;j<3;j++){
                pointsCreateArray[i][j] = pointsStartArray[i][j];
            }
        }

        for( i=0;i<array1.length;i++){
            array1[i].visible = false;
        }
        for( i=0;i<array2.length;i++){
            array2[i].visible = false;
        }
        for( i=0;i<array3.length;i++){
            array3[i].visible = false;
        }
        for( i=0;i<array4.length;i++){
            array4[i].visible = true;
        }
        this.shackBack();
        this.reset();

        this.camera.position.x = 1200;
        this.camera.position.y = 1200;
        this.camera.position.z = 1200;


    };
    this.grid = function(){
        if(grid!=undefined){
            this.scene.remove(grid);
            grid = null;
        }else{
            this.createGrid();
        }

    };
    this.createPoints = function(){
        var point,num,i,j,array=[],count=0,newarray=[[0,0,0],[0,0,0],[0,0,0]];
        for( i=0;i<3;i++){
            array=[0,0,0];
            for( j=0;j<3;j++){
                if(j==1){
                    count = 3;
                }else{
                    count = 6;
                }
                point = Math.pow(-1,Math.ceil(Math.random()*10));
                num = point*Math.floor(Math.random()*count);
                array[j] = num;
            }
            newarray[i][0] = 100*array[0];
            newarray[i][1] = 100*array[1];
            newarray[i][2] = 100*array[2];
        }

        var result = this.checkPoints(newarray);
        if(!result){
            return;
        }
        pointsCreateArray[0] = newarray[0];
        pointsCreateArray[1] = newarray[1];
        pointsCreateArray[2] = newarray[2];


        this.reset();
    };
    this.reset = function(){
        pointsCreateArray[3][0] = (pointsCreateArray[0][0]+pointsCreateArray[1][0])/2;
        pointsCreateArray[3][1] = (pointsCreateArray[0][1]+pointsCreateArray[1][1])/2;
        pointsCreateArray[3][2] = (pointsCreateArray[0][2]+pointsCreateArray[1][2])/2;


        pointsCreateArray[4][0] = pointsCreateArray[1][0]-pointsCreateArray[0][0] + pointsCreateArray[2][0];
        pointsCreateArray[4][1] = pointsCreateArray[1][1]-pointsCreateArray[0][1] + pointsCreateArray[2][1];
        pointsCreateArray[4][2] = pointsCreateArray[1][2]-pointsCreateArray[0][2] + pointsCreateArray[2][2];

        pointA.position.x = textA.position.x = pointsCreateArray[0][0];
        pointA.position.y = textA.position.y = pointsCreateArray[0][1];
        pointA.position.z = textA.position.z = pointsCreateArray[0][2];

        pointB.position.x = textB.position.x = pointsCreateArray[1][0];
        pointB.position.y = textB.position.y = pointsCreateArray[1][1];
        pointB.position.z = textB.position.z = pointsCreateArray[1][2];
        pointC.position.x = textC.position.x = pointsCreateArray[2][0];
        pointC.position.y = textC.position.y = pointsCreateArray[2][1];
        pointC.position.z = textC.position.z = pointsCreateArray[2][2];
        pointD.position.x = textD.position.x = pointsCreateArray[3][0];
        pointD.position.y = textD.position.y = pointsCreateArray[3][1];
        pointD.position.z = textD.position.z = pointsCreateArray[3][2];

        this.planeRotation();
        this.createLineAB();
    };
    this.checkPoints = function(newarray){
        if((((newarray[1][0]-newarray[0][0])/(newarray[2][0]-newarray[1][0])) == ((newarray[1][1]-newarray[0][1])/(newarray[2][1]-newarray[1][1])) ==(newarray[1][2]-newarray[0][2])/(newarray[2][2]-newarray[1][2]) )){

            $('.mask').css('display','block');
            $('.tip').css('display','block');
            setTimeout(function(){
                $('.mask').css('display','none');
                $('.tip').css('display','none');
            },1000);

            return false;
        }else if(newarray[0][0] == newarray[1][0] && newarray[0][2] == newarray[1][2] && newarray[0][3] == newarray[1][3] || newarray[0][0] == newarray[2][0] && newarray[0][2] == newarray[2][2] && newarray[0][3] == newarray[2][3]||newarray[1][0] == newarray[2][0] && newarray[1][2] == newarray[2][2] && newarray[1][3] == newarray[2][3]){

            $('.mask').css('display','block');
            $('.tip').css('display','block');
            setTimeout(function(){
                $('.mask').css('display','none');
                $('.tip').css('display','none');
            },1000);

            return false;
        }else{
            return true;
        }



    };
    this.inputClick = function(){
        var i;
        if(styleValue == 1){
            for( i=0;i<array2.length;i++){
                array2[i].visible = false;
            }
            for( i=0;i<array3.length;i++){
                array3[i].visible = false;
            }
            for( i=0;i<array4.length;i++){
                array4[i].visible = false;
            }
            for( i=0;i<array1.length;i++){
                array1[i].visible = true;
            }

        }else if(styleValue == 2){

            for( i=0;i<array1.length;i++){
                array1[i].visible = false;
            }
            for( i=0;i<array3.length;i++){
                array3[i].visible = false;
            }
            for( i=0;i<array4.length;i++){
                array4[i].visible = false;
            }
            for( i=0;i<array2.length;i++){
                array2[i].visible = true;
            }

        }else if(styleValue == 3){

            for( i=0;i<array1.length;i++){
                array1[i].visible = false;
            }
            for( i=0;i<array2.length;i++){
                array2[i].visible = false;
            }
            for( i=0;i<array4.length;i++){
                array4[i].visible = false;
            }
            for( i=0;i<array3.length;i++){
                array3[i].visible = true;
            }

        }else{

            for( i=0;i<array1.length;i++){
                array1[i].visible = false;
            }
            for( i=0;i<array2.length;i++){
                array2[i].visible = false;
            }
            for( i=0;i<array3.length;i++){
                array3[i].visible = false;
            }
            for( i=0;i<array4.length;i++){
                array4[i].visible = true;
            }

        }
        count=0;
        count1 = 0;
        this.shackPlane();

    };
    this.shackPlane = function(){

        timg = setTimeout(function(){
            var shackplane = null,shacklineAB=null,shackpointC=null,shackpointD=null,shacklineCD,shacklineCE=null;
            if(timg%2 == 0){
                shacklineAB =  new THREE.LineBasicMaterial({color: 'red'});
                shackpointC = new THREE.MeshBasicMaterial({color: 'red'});
                shacklineCD = new THREE.LineBasicMaterial({color: 'red'});
                shacklineCE = new THREE.LineBasicMaterial({color: 'red'});
            }else{
                shacklineAB =  new THREE.LineBasicMaterial({color: 'green'});
                shackpointC = new THREE.MeshBasicMaterial({color: '#4c84bd'});
                shacklineCD = new THREE.LineBasicMaterial({color: 'green'});
                shacklineCE = new THREE.LineBasicMaterial({color: 'green'});
            }

            var opacityNum = count/10;

            if(count <10){
                shackplane = new THREE.MeshBasicMaterial({color:'#3eb4f1',opacity:opacityNum,transparent:true,side:THREE.DoubleSide});
            }else{
                shackplane = new THREE.MeshBasicMaterial({color:'#3eb4f1',opacity:1,transparent:false,side:THREE.DoubleSide});
            }

            if(count <=10){
                plane.material = shackplane;
            }

            if(count1 %5 == 0){
                if(styleValue == 1){
                }else if(styleValue == 2){
                    lineAB.material = shacklineAB;
                    pointC.material = shackpointC;
                }else if(styleValue == 3){
                    lineAB.material = shacklineAB;
                    lineCD.material = shacklineCD;
                }else{
                    lineAB.material = shacklineAB;
                    lineCE.material = shacklineCE;
                }
            }




            thiz.shackPlane();
        },100);

        count+=0.5;
        count1++;
    };
    this.shackBack = function(){
        clearTimeout(timg);
        timg = 0;

        plane.material = new THREE.MeshBasicMaterial({color:'#81CDF4',opacity:0,transparent:true,side:THREE.DoubleSide});
        lineAB.material = new THREE.LineBasicMaterial({color: 'green'});
        pointC.material = new THREE.MeshBasicMaterial({color: '#4c84bd'});
        lineCD.material = new THREE.LineBasicMaterial({color: 'green'});
    };
    this.createLineAB = function(){

        if(lineAB!=undefined){
            this.scene.remove(lineAB);
            this.scene.remove(textlineAB);
            this.scene.remove(lineCD);
            this.scene.remove(textlineCD);
            this.scene.remove(lineCE);
            this.scene.remove(textlineCE);
            lineAB=null;
            textlineAB=null;
            lineCD=null;
            textlineCD=null;
            lineCE=null;
            textlineCE=null;
        }

        var vertices = [];
        vertices.push(new THREE.Vector3(pointsCreateArray[0][0],pointsCreateArray[0][1],pointsCreateArray[0][2]));
        vertices.push(new THREE.Vector3(pointsCreateArray[1][0],pointsCreateArray[1][1],pointsCreateArray[1][2]));
        lineAB = this.createLineMesh(vertices,'green');
        this.scene.add(lineAB);
        array2.push(lineAB);
        array3.push(lineAB);
        array4.push(lineAB);

        textlineAB= this.createText('l1',[(pointsCreateArray[0][0]+pointsCreateArray[1][0])/2,(pointsCreateArray[0][1]+pointsCreateArray[1][1])/2,(pointsCreateArray[0][2]+pointsCreateArray[1][2])/2],'#000',1);
        this.scene.add(textlineAB);
        array2.push(textlineAB);



        vertices = [];
        vertices.push(new THREE.Vector3(pointsCreateArray[3][0],pointsCreateArray[3][1],pointsCreateArray[3][2]));
        vertices.push(new THREE.Vector3(pointsCreateArray[2][0],pointsCreateArray[2][1],pointsCreateArray[2][2]));
        lineCD = this.createLineMesh(vertices,'green');
        this.scene.add(lineCD);
        array3.push(lineCD);


        textlineCD = this.createText('l2',[(pointsCreateArray[3][0]+pointsCreateArray[2][0])/2,(pointsCreateArray[3][1]+pointsCreateArray[2][1])/2,(pointsCreateArray[3][2]+pointsCreateArray[2][2])/2],'#000');
        this.scene.add(textlineCD);
        array3.push(textlineCD);

        vertices = [];
        vertices.push(new THREE.Vector3(pointsCreateArray[4][0],pointsCreateArray[4][1],pointsCreateArray[4][2]));
        vertices.push(new THREE.Vector3(pointsCreateArray[2][0],pointsCreateArray[2][1],pointsCreateArray[2][2]));
        lineCE = this.createLineMesh(vertices,'green');
        this.scene.add(lineCE);
        array4.push(lineCE);

        textlineCE = this.createText('l3',[(pointsCreateArray[4][0]+pointsCreateArray[2][0])/2,(pointsCreateArray[4][1]+pointsCreateArray[2][1])/2,(pointsCreateArray[4][2]+pointsCreateArray[2][2])/2],'#000');
        this.scene.add(textlineCE);
        array4.push(textlineCE);


        var i;
        if(styleValue == 1){
            for( i=0;i<array2.length;i++){
                array2[i].visible = false;
            }
            for( i=0;i<array3.length;i++){
                array3[i].visible = false;
            }
            for( i=0;i<array4.length;i++){
                array4[i].visible = false;
            }
            for( i=0;i<array1.length;i++){
                array1[i].visible = true;
            }

        }else if(styleValue == 2){

            for( i=0;i<array1.length;i++){
                array1[i].visible = false;
            }
            for( i=0;i<array3.length;i++){
                array3[i].visible = false;
            }
            for( i=0;i<array4.length;i++){
                array4[i].visible = false;
            }
            for( i=0;i<array2.length;i++){
                array2[i].visible = true;
            }

        }else if(styleValue == 3){

            for( i=0;i<array1.length;i++){
                array1[i].visible = false;
            }
            for( i=0;i<array2.length;i++){
                array2[i].visible = false;
            }
            for( i=0;i<array4.length;i++){
                array4[i].visible = false;
            }
            for( i=0;i<array3.length;i++){
                array3[i].visible = true;
            }

        }else if(styleValue == 4){

            for( i=0;i<array1.length;i++){
                array1[i].visible = false;
            }
            for( i=0;i<array2.length;i++){
                array2[i].visible = false;
            }
            for( i=0;i<array3.length;i++){
                array3[i].visible = false;
            }
            for( i=0;i<array4.length;i++){
                array4[i].visible = true;
            }

        }else{
            for( i=0;i<array1.length;i++){
                array1[i].visible = false;
            }
            for( i=0;i<array2.length;i++){
                array2[i].visible = false;
            }
            for( i=0;i<array3.length;i++){
                array3[i].visible = false;
            }
            for( i=0;i<array4.length;i++){
                array4[i].visible = false;
            }
        }
    };
    this.getStoreArray = function(){
        storeArray[0] = pointsCreateArray[0];
        storeArray[1] = pointsCreateArray[1];
        storeArray[2] = pointsCreateArray[2];
    };
    this.storeStoreArray = function(array){
        for(var i=0;i<3;i++){
            for(var j=0;j<3;j++){
                pointsCreateArray[i][j] = pointsStartArray[i][j] = array[i][j];
            }
        }
        this.reset();
    };
    this.createLineMesh = function(vertices, color, style){
        var lineMesh = null, geometryLine = new THREE.Geometry();
        //geometryLine.vertices = vertices;
        if (!color) {
            color = '#000';
        }
        if (!style) {
            vertices.push(new THREE.Vector3(vertices[0].x,vertices[0].y,vertices[0].z));
            vertices.push(new THREE.Vector3(vertices[1].x,vertices[1].y,vertices[1].z));

            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));

        } else {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 5,
                gapSize: 5
            }));
        }
        return lineMesh;
    };
    this.createGradulGrid=function(){

        this.scene.remove(grid);
        grid = new THREE.Group();
        var num = 0,start = -500;

       /* timg1 = setInterval(function(){
            if(num>=20){
                num = 0;
                clearInterval(timg1);
                return;
            }
            createLines();
            num++;
        },100);*/
        for(var i=0;i<20;i++){
            createLines();
            num++;
        }
        var vertices = [];
        vertices.push(new THREE.Vector3(-500, 0, -500));
        vertices.push(new THREE.Vector3(500, 0, -500));
        var line = this.createLineMesh(vertices,0x949494);
        grid.add(line);

        function createLines(){
            var vertices = [];
            for(var i=0;i<=20;i++){
                vertices = [];
                vertices.push(new THREE.Vector3(start+i*50, 0, start+num*50));
                vertices.push(new THREE.Vector3(start+i*50, 0, start+(num+1)*50));
                var line = thiz.createLineMesh(vertices,0x949494);
                grid.add(line);
            }
            vertices = [];
            vertices.push(new THREE.Vector3(-500, 0, start+(num+1)*50));
            vertices.push(new THREE.Vector3(500, 0, start+(num+1)*50));
            line = thiz.createLineMesh(vertices,0x949494);
            grid.add(line);
        }

        this.scene.add(grid);

    };

}
var threeDimensional = new ThreeDimensional();
threeDimensional.int();


//重置事件
function renderAll(){
    threeDimensional.controls.update();

    requestAnimationFrame(renderAll);
    threeDimensional.renderer.render(threeDimensional.scene,threeDimensional.camera);
}
renderAll();


var checked =true;
//on/off事件
function clickEve1(){
    var dataId = $(this).attr('data-id');
    if($(this).parent().parent().hasClass('on')){
        return;
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
        $(this).parent().parent().siblings().find('.span2').text('' +'off');
    }
    styleValue=dataId;

    if(timg){
        threeDimensional.shackBack();
    }
    threeDimensional.inputClick();

}

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
    styleValue=0;
    threeDimensional.reback();
    clearInterval(timg1);
    threeDimensional.createGrid();


    $('.turn1').removeClass('on').addClass('off');
    $('.turn1').find('.span2').text('' +'off');
}

if(!isMob){
    $('#scale').on('click',fullEve);
    $('#renew').on('click',renewEve);
    $('.turnRight').on('click',clickEve1);
    $('.dynamic').on('click',function(){
        threeDimensional.createPoints();
    })
}else{
    $('#scale').on('touchstart',fullEve);
    $('#renew').on('touchstart',renewEve);
    $('.turnRight').on('touchstart',clickEve1);
    $('.dynamic').on('touchstart',function(){
        threeDimensional.createPoints();
    })
}





