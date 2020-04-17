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
var bodyHeight = $(window).height(),timg;
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
// $(".con").css("margin-top",marginTop);
var $p = $('.formula-control p');



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
    threeWidth = $obj.width();


//控件取值结束
var axisFlag = false,totolJson =[],countTiming=0,animateFlag=0,oldShape=1,signShape=1,len;



var polygon ={
    sides:4,
    shape:1,
    angleJson:[]
};
var getParameter={
    sides:4,
    shape:1
};

var threeDimensional ={
    lines : [],
    textMesh : [],
    axis :new THREE.Group(),
    grid:null,
    mesh:null,
    vertices:[],
    controlrs:null,
    getStartJson:function(){
        //获取底面的参数
        var array=[],x,y,n =polygon.sides,sideLength = 100;;
        polygon.angleJson=[];
        for(var i=0;i<n;i++){
            x = Math.round(sideLength * Math.sin((2*Math.PI/n)*i));
            y = Math.round(sideLength * Math.cos((2*Math.PI/n)*i));
            array = [x,0,y];
            polygon.angleJson.push(array);
        }
    },
    getTopJson:function(sideLength){
        //获取底面的参数
        var array=[],x,y,n =polygon.sides,json=[];
        for(var i=0;i<n;i++){
            x = Math.round(sideLength * Math.sin((2*Math.PI/n)*i));
            y = Math.round(sideLength * Math.cos((2*Math.PI/n)*i));
            array = [x,100,y];
            json.push(array);
        }
        return json;
    },
    getPrismJson:function(){
        //获取所有的点
        totolJson=[];
        var i,num = polygon.sides;
        if(polygon.shape == 1){
            //最后为顶点
            for(i=0;i<num;i++){
                totolJson[i] = polygon.angleJson[i];
            }
            totolJson.push([0,100,0]);

        }else if(polygon.shape == 2){
            //顶点+下底面+上底面
            totolJson.push([0,200,0]);

            for(i=0;i<num;i++){
                totolJson.push([polygon.angleJson[i][0],0,polygon.angleJson[i][2]]);
            }
            for(i=0;i<num;i++){
                totolJson.push([Math.round(polygon.angleJson[i][0]/2),100,Math.round(polygon.angleJson[i][2]/2)]);
            }
        }else{
            //下底面+上底面
            for(i=0;i<num;i++){
                totolJson.push([polygon.angleJson[i][0],100,polygon.angleJson[i][2]]);
            }

        }

    },
    getGradualJson:function(){
        countTiming+=5;
        var i,num=polygon.sides,array=[];

        totolJson=[];
        totolJson.push([0,200,0]);
        signShape=2;
        for(i=0;i<num;i++){
            totolJson.push([polygon.angleJson[i][0],polygon.angleJson[i][1],polygon.angleJson[i][2]]);
        }



        if(polygon.shape == 1){


            if(oldShape == 2){

                len = 50-countTiming;

            }else{

                len = 100-countTiming*2;

            }

        }else if(polygon.shape == 2){


            if(oldShape == 1){

                len = countTiming;

            }else{

                len = 100-countTiming;

            }



        }else{

            if(oldShape ==1){

                len = countTiming*2;

            }else{

                len = 50+countTiming;

            }


        }
        array = threeDimensional.getTopJson(len);
        for(i=0;i<num;i++){
            totolJson.push(array[i]);
        }

    },
    labelAxis:function (start, stepSize, stop) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={};
        // label x axis:
        textStyle = {align: textAlign.center, font: '10px Cambria Math', fillStyle: 'red', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i, textStyle);
            text.rotation = cameraT.rotation;
            text.position.x = i;
            text.position.y = -5;
            threeDimensional.axis.add(text);
        }
        text = new SpriteText2D('x', textStyle);
        text.rotation = cameraT.rotation;
        text.position.x = stop+30;
        text.position.y = -5;
        threeDimensional.axis.add(text);

        // label z axis:
        textStyle = {align: textAlign.center, font: '10px Cambria Math', fillStyle: '#00F', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i, textStyle);
            text.position.z = i;
            text.position.x = -0.2;
            text.position.y = -5;
            threeDimensional.axis.add(text);
        }
        text = new SpriteText2D('z', textStyle);
        text.position.z = stop+30;
        text.position.x = -0.2;
        text.position.y = -5;
        threeDimensional.axis.add(text);
        // label y axis:
        textStyle = {align: textAlign.center, font: '10px Cambria Math', fillStyle: '#00FF00', antialias: true};
        for(var i = start; i <= stop; i = i+stepSize) {
            text = new SpriteText2D(i, textStyle);
            text.rotation = cameraT.rotation;
            text.position.x = 5;
            text.position.y = i;
            text.position.z = 0.2;
            threeDimensional.axis.add(text);
        }
        text = new SpriteText2D('y', textStyle);
        text.position.x = 5;
        text.position.y = stop+30;
        text.position.z = 0.2;
        threeDimensional.axis.add(text);
    },
    createLine:function(){//三维边线
        if( threeDimensional.lines.length){
            for(var i=0;i< threeDimensional.lines.length;i++){
                sceneT.remove(threeDimensional.lines[i]);
            }
        }
        threeDimensional.lines = [];
        var geometryLine1 = new THREE.Geometry();
        var geometryLine2 = new THREE.Geometry();
        var geometryLine3 = new THREE.Geometry();
        var vertices1 =[];
        var vertices2 =[];
        var vertices3 =[];
        var lineMesh=null;
        var json1=totolJson;
        var num = polygon.sides,json2=[],shape;

        if(countTiming){
            shape = signShape;
        }else{
            shape = polygon.shape;
        }

        if(shape == 1){
            if(num>=36){
                for(i=0;i<num;i++){
                    vertices2.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
                }
                vertices2.push(new THREE.Vector3(json1[0][0],json1[0][1],json1[0][2]));
            }else{
                for(i=0;i<num;i++){
                    vertices1.push(new THREE.Vector3(json1[num][0],json1[num][1],json1[num][2]));
                    vertices1.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
                    if(i<num-1){
                        vertices2.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
                        vertices2.push(new THREE.Vector3(json1[i+1][0],json1[i+1][1],json1[i+1][2]));
                    }else{
                        vertices2.push(new THREE.Vector3(json1[0][0],json1[0][1],json1[0][2]));
                        vertices2.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
                    }
                    geometryLine1.vertices = vertices1;
                    lineMesh = new THREE.LineSegments(geometryLine1, new THREE.LineBasicMaterial({color: '#F39800'}));
                    sceneT.add(lineMesh);
                    threeDimensional.lines.push(lineMesh);
                }
            }
            geometryLine2.vertices = vertices2;
            lineMesh = new THREE.Line(geometryLine2, new THREE.LineBasicMaterial({color: '#F39800'}));
            sceneT.add(lineMesh);
            threeDimensional.lines.push(lineMesh);
            return threeDimensional.lines;
        }else if(shape == 2){
            if(num>=36){
                for(i=1;i<num+1;i++){
                    vertices1.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
                    vertices2.push(new THREE.Vector3(json1[i+num][0],json1[i+num][1],json1[i+num][2]));
                }
            }else{
                for(i=1;i<num+1;i++){
                    vertices1.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
                    vertices2.push(new THREE.Vector3(json1[i+num][0],json1[i+num][1],json1[i+num][2]));

                    vertices3.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
                    vertices3.push(new THREE.Vector3(json1[i+num][0],json1[i+num][1],json1[i+num][2]));

                    geometryLine3.vertices = vertices3;
                    lineMesh = new THREE.LineSegments(geometryLine3, new THREE.LineBasicMaterial({color: '#F39800'}));
                    sceneT.add(lineMesh);
                    threeDimensional.lines.push(lineMesh);
                }
            }
            vertices1.push(new THREE.Vector3(json1[1][0],json1[1][1],json1[1][2]));
            vertices2.push(new THREE.Vector3(json1[num+1][0],json1[num+1][1],json1[num+1][2]));
            geometryLine1.vertices = vertices1;
            geometryLine2.vertices = vertices2;
            lineMesh = new THREE.Line(geometryLine1, new THREE.LineBasicMaterial({color: '#F39800'}));
            sceneT.add(lineMesh);
            threeDimensional.lines.push(lineMesh);
            lineMesh = new THREE.Line(geometryLine2, new THREE.LineBasicMaterial({color: '#F39800'}));
            sceneT.add(lineMesh);
            threeDimensional.lines.push(lineMesh);
            return threeDimensional.lines;

        }else {

            if (num >= 36) {
                threeDimensional.getPrismJson();
                json1 = polygon.angleJson;
                json2 = totolJson;
                for (i = 0; i < num + 1; i++) {
                    if (i < num) {
                        vertices1.push(new THREE.Vector3(json1[i][0], json1[i][1], json1[i][2]));
                        vertices2.push(new THREE.Vector3(json2[i][0], json2[i][1], json2[i][2]));
                    } else {
                        vertices1.push(new THREE.Vector3(json1[0][0], json1[0][1], json1[0][2]));
                        vertices2.push(new THREE.Vector3(json2[0][0], json2[0][1], json2[0][2]));
                    }
                }
            } else {
                json1 = polygon.angleJson;
                json2 = totolJson;
                vertices3 = [];
                for (i = 0; i < num + 1; i++) {
                    if (i < num) {
                        vertices1.push(new THREE.Vector3(json1[i][0], json1[i][1], json1[i][2]));
                        vertices2.push(new THREE.Vector3(json2[i][0], json2[i][1], json2[i][2]));
                        if (i % 2 == 0) {
                            vertices3.push(new THREE.Vector3(json1[i][0], json1[i][1], json1[i][2]));
                            vertices3.push(new THREE.Vector3(json2[i][0], json2[i][1], json2[i][2]));
                        } else {
                            vertices3.push(new THREE.Vector3(json2[i][0], json2[i][1], json2[i][2]));
                            vertices3.push(new THREE.Vector3(json1[i][0], json1[i][1], json1[i][2]));
                        }
                    } else {
                        vertices1.push(new THREE.Vector3(json1[0][0], json1[0][1], json1[0][2]));
                        vertices2.push(new THREE.Vector3(json2[0][0], json2[0][1], json2[0][2]));
                    }
                    geometryLine3.vertices = vertices3;
                    lineMesh = new THREE.LineSegments(geometryLine3, new THREE.LineBasicMaterial({color: '#F39800'}));
                    sceneT.add(lineMesh);
                    threeDimensional.lines.push(lineMesh);
                }
            }
            geometryLine1.vertices = vertices1;
            geometryLine2.vertices = vertices2;
            lineMesh = new THREE.Line(geometryLine1, new THREE.LineBasicMaterial({color: '#F39800'}));
            sceneT.add(lineMesh);
            threeDimensional.lines.push(lineMesh);
            lineMesh = new THREE.Line(geometryLine2, new THREE.LineBasicMaterial({color: '#F39800'}));
            sceneT.add(lineMesh);
            threeDimensional.lines.push(lineMesh);
            return threeDimensional.lines;
        }
    },
    createTextMesh:function(){
        if(threeDimensional.textMesh.length){
            for(var i=0;i<threeDimensional.textMesh.length;i++){
                sceneT.remove(threeDimensional.textMesh[i]);
            }
        }
        threeDimensional.textMesh=[];
        var num = totolJson.length;
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: '10px Cambria Math', fillStyle: '#000', antialias: true};
        var v3=[],text=null,x,y,flag,shape;
        if(countTiming){
            shape = signShape;
        }else{
            shape = polygon.shape;
        }
        if(polygon.sides>=36){
            if(shape == 1){
                v3 = totolJson[num-1];
                text = new SpriteText2D(v3[0] + ","  + v3[1]+","  + v3[2], textStyle);
                if(v3[1]>0){
                    text.position.set((v3[0]+5), (v3[1]+25), (v3[2]+5));
                }else{
                    if(v3[0] < 0){ x= v3[0]-20;}else{ x= v3[0]+20}
                    if(v3[2] < 0){ y= v3[2]-20;}else{ y= v3[2]+20}
                    text.position.set(x, v3[1], y);
                }
                sceneT.add(text);
                threeDimensional.textMesh.push(text);
            }
            return;}


        if(polygon.shape == 2 || signShape == 2){
            flag=1;
        }else{
            flag=0;
        }

        for(i=flag;i<num;i++){
            v3 = totolJson[i];
            text = new SpriteText2D(v3[0] + ","  + v3[1]+","  + v3[2], textStyle);
            if(v3[1]>0){
                text.position.set((v3[0]+5), (v3[1]+25), (v3[2]+5));
            }else{
                if(v3[0] < 0){ x= v3[0]-20;}else{ x= v3[0]+20}
                if(v3[2] < 0){ y= v3[2]-20;}else{ y= v3[2]+20}
                text.position.set(x, v3[1], y);
            }
            sceneT.add(text);
            threeDimensional.textMesh.push(text);
        }

        if(polygon.shape == 3 && !countTiming){
            for(i=0;i<num;i++){
                v3 = polygon.angleJson[i];
                text = new SpriteText2D(v3[0] + ","  + v3[1]+","  + v3[2], textStyle);
                if(v3[1]>0){
                    text.position.set((v3[0]+5), (v3[1]+25), (v3[2]+5));
                }else{
                    if(v3[0] < 0){ x= v3[0]-20;}else{ x= v3[0]+20}
                    if(v3[2] < 0){ y= v3[2]-20;}else{ y= v3[2]+20}
                    text.position.set(x, v3[1], y);
                }
                sceneT.add(text);
                threeDimensional.textMesh.push(text);
            }
        }
    },
    vec3:function(x,y,z){
        return new THREE.Vector3(x, y, z);
    },
    drawAxisArrow:function(origin, dir, _color) {
        var geometryLine = new THREE.Geometry();
        var vertices = [];
        vertices.push(origin);
        vertices.push(dir);
        geometryLine.vertices = vertices;
        var line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: _color}));
        threeDimensional.axis.add(line);

    },
    createGrid:function (){
        threeDimensional.grid=null;
        var geometry = new THREE.Geometry(), bottom = -0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( { color: 0x949494, transparent: true, opacity: 0.5 } );
        for ( var i = 0; i <= 12; i ++ ) {
            geometry.vertices.push( threeDimensional.vec3( - 300, bottom, i * step - 300 ) );
            geometry.vertices.push( threeDimensional.vec3(   300, bottom, i * step - 300 ) );

            geometry.vertices.push( threeDimensional.vec3( i * step - 300, bottom, -300 ) );
            geometry.vertices.push( threeDimensional.vec3( i * step - 300, bottom,  300 ) );
        }
        threeDimensional.grid = new THREE.LineSegments( geometry, lineMaterial, THREE.LinePieces );
        sceneT.add( threeDimensional.grid );
        window.gridColor = 0x303030;
    },
    createAxis:function(){
        threeDimensional.axis = new THREE.Group();
        threeDimensional.labelAxis(50, 50, 300);
        threeDimensional.drawAxisArrow(threeDimensional.vec3( 0, 0, 0 ), threeDimensional.vec3( 350, 0, 0 ), 0xFF0000);
        threeDimensional.drawAxisArrow(threeDimensional.vec3( 0, 0, 0 ), threeDimensional.vec3( 0, 350, 0 ), 0x00FF00);
        threeDimensional.drawAxisArrow(threeDimensional.vec3( 0, 0, 0 ), threeDimensional.vec3( 0, 0, 350 ), 0x0000FF);
        sceneT.add( threeDimensional.axis);
    },
    repaintMesh:function(){
        threeDimensional.getPrismJson();
        if(threeDimensional.mesh!==null){
            sceneT.remove(threeDimensional.mesh);
        }
        threeDimensional.createFaceMesh();
    },
    repaintGradualMesh:function(){
        threeDimensional.getGradualJson();
        if(threeDimensional.mesh!==null){
            sceneT.remove(threeDimensional.mesh);
        }
        threeDimensional.createFaceMesh();
    },
    createPrismVertices:function (){ //创建点
        threeDimensional.vertices = [];
        var json1 =totolJson,i,num=json1.length,shape;
        if(countTiming){
            shape = signShape;
        }else{
            shape = polygon.shape;
        }

        if(shape == 1){
            for(i=0;i<num;i++){
                threeDimensional.vertices.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
            }
        }else if(shape == 2){
            for(i=0;i<num;i++){
                threeDimensional.vertices.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
            }
        }else{
            json1 = polygon.angleJson;
            var json2 = totolJson;
            for(i=0;i<num;i++){
                threeDimensional.vertices.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
                threeDimensional.vertices.push(new THREE.Vector3(json2[i][0],json2[i][1],json2[i][2]));
            }
        }
    },
    createPrismFaces:function(){ //创建面
        var faces = [];
        var num = polygon.sides,i,shape;
        if(countTiming){
            shape = signShape;
        }else{
            shape = polygon.shape;
        }
        if(shape == 1){
            var peak = polygon.sides;
            for(i=0;i<peak-1;i++){
                faces.push(new THREE.Face3(peak, i, i+1));
                faces.push(new THREE.Face3( i+1, i,peak));
            }
            faces.push(new THREE.Face3(peak, 0, peak-1));
            for(i=0;i<(peak-2);i++){
                faces.push( new THREE.Face3(0,i+1,i+2));
                faces.push( new THREE.Face3(i+2,i+1,0));
            }
            return faces;
        }else if(shape == 2){

            for(i=1;i<num;i++){
                faces.push(new THREE.Face3(i, i+1, i+num));
                faces.push(new THREE.Face3(i+num, i+1, i));
                faces.push(new THREE.Face3(i+1, i+num, i+num+1));
                faces.push(new THREE.Face3( i+num+1, i+num,i+1));
            }

            faces.push(new THREE.Face3(1, 1+num, num));
            faces.push(new THREE.Face3(num,1+num, 1));
            faces.push(new THREE.Face3(1+num, num, num*2));
            faces.push(new THREE.Face3(num*2, num, 1+num));

            //底面
            for(i=0;i<num-2;i++){
                faces.push( new THREE.Face3(1,i+3,i+2));
                faces.push( new THREE.Face3(i+num+2,i+num+3,num+1));
            }
            return faces;


        }else{
            if(num ==3){
                faces.push( new THREE.Face3(0,2,4));
                faces.push( new THREE.Face3(1,3,5));
                faces.push( new THREE.Face3(0,2,1));
                faces.push( new THREE.Face3(1,2,3));
                faces.push( new THREE.Face3(2,3,4));
                faces.push( new THREE.Face3(3,5,4));
                faces.push( new THREE.Face3(4,5,0));
                faces.push( new THREE.Face3(0,5,1));
            }else{
                for( i=0;i<(num-1)*2;){
                    faces.push(new THREE.Face3(i+2, i, i+1));
                    faces.push(new THREE.Face3( i+2,i+1, i+3));
                    faces.push(new THREE.Face3(i+1, i, i+2));
                    faces.push(new THREE.Face3(i+3, i+1, i+2));
                    i=i+2;
                }
                faces.push( new THREE.Face3(0,  threeDimensional.vertices.length-1,1));
                faces.push( new THREE.Face3(0, threeDimensional.vertices.length-2, threeDimensional.vertices.length-1));
                faces.push( new THREE.Face3(1,  threeDimensional.vertices.length-1,0));
                faces.push( new THREE.Face3(threeDimensional.vertices.length-1, threeDimensional.vertices.length-2, 0));
                for( i=0;i<(num-2);i++){
                    faces.push( new THREE.Face3(1,(i+1)*2+1,(i+2)*2+1));
                    //console.log(1,(i+1)*2+1,(i+2)*2+1);
                    //faces.push( new THREE.Face3(0,(i+1)*2,(i+2)*2));
                    //console.log(0,(i+1)*2,(i+2)*2);
                    // faces.push( new THREE.Face3((i+2)*2+1,(i+1)*2+1,1));
                    faces.push( new THREE.Face3((i+2)*2,(i+1)*2,0));
                }
            }
            return faces;
        }

    },
    createFaceMesh:function(){
        //三维图形
        var geomM=null,geomG=null,faces = null,geom=null,shape;

        if(countTiming){
            shape = signShape;
        }else{
            shape = polygon.shape;
        }

        if(polygon.sides >=36){

            var radius1 = 0,radius2 = 100,height=100;
            if(countTiming){

                radius1 = len;

            }else{
                if(shape == 1){
                    radius1 = 0;
                }else if(shape == 2){
                    radius1 = 50;
                }else{
                    radius1 = 100;
                }
            }


            geomG = new THREE.CylinderGeometry(radius1,radius2,height,100,100);
            geomM = new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.2,transparent:true,side:THREE.DoubleSide});
            threeDimensional.mesh = new THREE.Mesh(geomG,geomM);
            threeDimensional.mesh.position.y = height/2;
            sceneT.add(threeDimensional.mesh);
            if(axisFlag){
                threeDimensional.createTextMesh();
            }
            threeDimensional.createLine();
            return;
        }
        threeDimensional.createPrismVertices();
        faces = threeDimensional.createPrismFaces();
        geom = new THREE.Geometry();
        geom.vertices = threeDimensional.vertices;
        geom.faces = faces;
        geom.computeFaceNormals();
        var materials = [
            new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.2,transparent:true})
        ];
        threeDimensional.mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials);
        sceneT.add(threeDimensional.mesh);
        if(axisFlag){
            threeDimensional.createTextMesh();
        }
        threeDimensional.createLine();
    },
    createControls:function(){
        threeDimensional.controls = new THREE.OrbitControls( cameraT, rendererT.domElement );
        //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
        threeDimensional.controls.enableDamping = true;
        threeDimensional.controls.dampingFactor = 0.25;
        threeDimensional.controls.enableZoom = true;
    },
    onGesturechange:function(event){
        var result = $('#sides-slider-value4').val();
        var value = parseInt(result.split('|')[1]);

        if(event.originalEvent.scale < eventScale){//缩小
            if(value <=1){
                return;
            }
            getParameter.clear = --value;
        }
        if(event.originalEvent.scale > eventScale){//增大
            if(value >=9){
                return;
            }
            getParameter.clear = ++value;
        }
        clearEvent(value);
        eventScale = event.originalEvent.scale;

    },
    int:function(){
        // threeDimensional.createGrid();
        // threeDimensional.createAxis();
        threeDimensional.getStartJson();
        threeDimensional.getPrismJson();
        threeDimensional.createFaceMesh();
        // threeDimensional.createTextMesh();
    },
    setAnimate:function(){
        if(countTiming>=50){
            clearTimeout(animateFlag);
            animateFlag=0;
            countTiming = 0;
            oldShape = polygon.shape;
            signShape = 0;
            threeDimensional.repaintMesh();
            return;
        }
        animateFlag= setTimeout(function(){
            threeDimensional.repaintGradualMesh();
            threeDimensional.setAnimate();
        },50);
    }
};

var sceneT = new THREE.Scene();
var cameraT = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
cameraT.position.x = 0;
cameraT.position.y = 600;
cameraT.position.z = 1200;
cameraT.lookAt(sceneT.position);
sceneT.add(cameraT);
var canWebgl=(function(){
    try {
        var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
    } catch ( e ) {
        return false;
    }
})();
var rendererT = null;
if(canWebgl){
    rendererT = new THREE.WebGLRenderer({antialias:true});
}else{
    rendererT = new THREE.CanvasRenderer();
}
rendererT.setPixelRatio( window.devicePixelRatio );
rendererT.setClearColor(0xffffff);
rendererT.setSize(threeWidth,threeHeight);

threeDimensional.int();
threeDimensional.createControls();
var eventScale = 1;


$obj.append(rendererT.domElement);

renderAll();


//重置事件
function renderAll(){
    threeDimensional.controls.update();

    requestAnimationFrame(renderAll);
    rendererT.render(sceneT,cameraT);
};
renderAll();




$('#slider1').change(function(){
    if(countTiming){
        clearTimeout(animateFlag);
        animateFlag=0;
        countTiming = 0;
        oldShape = polygon.shape;
        signShape = 0;
        threeDimensional.repaintMesh();
    }
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;
    switch (value){
        case 1:realV=3;break;
        case 2:realV=4;break;
        case 3:realV=5;break;
        case 4:realV=6;break;
        case 5:realV=10;break;
        case 6:realV=36;break;
    }
    getParameter.sides = parseInt(realV);
    polygon.sides = getParameter.sides;
    threeDimensional.getStartJson();
    threeDimensional.repaintMesh();
});

$('#slider3').change(function(){
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;

    getParameter.shape = polygon.shape = value;
    $p.removeClass('red').eq(value-1).addClass('red');
    countTiming=1;
    threeDimensional.setAnimate();
});


//on/off事件
function clickEve1(){
    if($(this).parent().parent().parent().hasClass('turnBox1')){
        if(countTiming){
            return;
        }
        if(countTiming){
            return;
        }
        var dataId = parseInt($(this).attr('data-id'));
        getParameter.shape = polygon.shape = dataId;
        $p.removeClass('red').eq(dataId-1).addClass('red');
        countTiming=1;
        threeDimensional.setAnimate();

    }

    if($(this).parent().parent().hasClass('on')){
        $(this).parent().parent().removeClass('on').addClass('off');
        $(this).parent().parent().find('.span2').text('' +'off');
    }else{
        $(this).parent().parent().removeClass('off').addClass('on');
        $(this).parent().parent().find('.span2').text('' +'on');
        $(this).parent().parent().siblings().removeClass('on').addClass('off');
        $(this).parent().parent().siblings().find('.span2').text('' +'off');
    }

}


//重置
function resetPart(){
    $('.slider1').find('.sliderLeft').css({'width':'82px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'82px'});
    $('.slider1').find('.xdsoft_slider_label').text('4');
    $('#slider1').attr('value',''+4+'|0');

    $('.s3').find('.sliderLeft').css({'width':'0px'});
    $('.s3').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
    $('.s3').find('.xdsoft_slider_label').text('椎体');
    $('#slider3').attr('value',''+1+'|0');
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

    if(countTiming){
        clearTimeout(animateFlag);
        animateFlag=0;
        countTiming = 0;
        oldShape = 1;
        signShape = 0;
        threeDimensional.repaintMesh();
    }
    polygon ={
        sides:4,
        shape:1,
        angleJson:[]
    };
    getParameter={
        sides:4,
        shape:1
    };
    oldShape=1;

    resetPart();

    threeDimensional.getStartJson();
    threeDimensional.repaintMesh();

    // $('.turn1').removeClass('on').addClass('off');
    // $('.span2').text(''+'off');
    // $('.turns').removeClass('off').addClass('on');
    // $('.turns .span2').text(''+'on');
    $p.removeClass('red').eq(0).addClass('red');

    cameraT.position.x = 0;
    cameraT.position.y = 600;
    cameraT.position.z = 1200;
}



if(!isMob){
    $('#renew').on('click',renewEve);
    $('#scale').on('click',fullEve);
    $('.turnRight').on('click',clickEve1);
}else{
    $('#renew').on('touchstart',renewEve);
    $('#scale').on('touchstart',fullEve);
    $('.turnRight').on('touchstart',clickEve1);
}


