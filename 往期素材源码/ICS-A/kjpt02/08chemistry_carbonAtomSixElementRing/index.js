/**
 * Created by O2 on 2016/9/6.
 */

$(function(){
    $('#WebGL-output-big').height($(window).height());
    if(window.innerHeight < $('.control').height()){
        $('.control').height(window.innerHeight).css('overflow-y','scroll');
    }
});

var selectValue = true;
var rate = 400,                             //放大rate倍
    clineLength = 0.154,                    //键与键之间的长度
    clineArc = (109+28/60).toFixed(2),      //角度的度数形式
    clineArc2 = Math.PI*clineArc/180,       //角度的π形式
    cradius = (Math.sqrt(3)*clineLength/8).toFixed(2);   //碳原子的半径

//选中操作相关变量
var raycaster = new THREE.Raycaster(),
    plane = new THREE.Plane(),
    offset = new THREE.Vector3(),
    intersection = new THREE.Vector3(),
    mouse = {x:0,y:0},
    INTERSECTED = null;
var group = new THREE.Group();
var rotationarc = 0,timg=0,sphereOutCount = 0,timg2 = 0;
var spheresOut = false,outed = false;
var ononon = 0,speed=1;
function ThreeDimensional(){
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var $obj = $('#WebGL-output-big'),
        offsetLeft = $obj.offset().left,
        offsetTop = $obj.offset().top,
        windowHeight = window.innerHeight,
        threeWidth = $obj.width();
    //选中物体相关
    var selectObjs=[],selectObj=null,tips=[];
    var thiz = this;
    //创建物体相关
    var bigMeshs=[];
    var threelen;


    //数据相关
    var floor1 = [];
    var floor2 =[];
    var floor3 = [];
    var floor4 = [];
    var floor5 =[];
    var floor6 =[];
    var floor7 =[];

    var anmate1 = [];
    var anmate1text = [];
    var anmate1cube = [];
    var animate1second = [[2,3,4,0,1,2,3],[0,3,4,0,2,0,3],[1,3,4,0,3,1,3],[1,2,3,1,3,1,2],[0,1,3,2,3,0,1],[0,2,3,1,2,0,2]];
    var animate1secondgroup = [];
    var lastsphere = null;
    var stopD = [];
    var startD = [];
    var othersphere = [];
    var sphereN = 0,cubeN = 0,colorCube,colorSphere;

    var animate2 =[[],[],[]];

    $('.three').height(windowHeight);
    var threeHeight = windowHeight;

    this.scene = new THREE.Scene();
    this.scene.position.y=-50;
    this.camera  = new THREE.PerspectiveCamera(45, threeWidth / windowHeight, 1, 10000);
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
        sphereN = 20;
        cubeN = 10;
        colorCube = 0x838383;
        colorSphere = 0x0081e0;
        speed =50;
    }else{
        this.renderer = new THREE.CanvasRenderer();
        sphereN = 10;
        cubeN = 3;
        colorSphere = 0x838383;
        colorCube = 0x0081e0;
        speed=25;
    }
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.controls = null;


    this.int = function(){
        this.camera.position.x = 0;
        this.camera.position.y = 300;
        this.camera.position.z = 1000;
        this.camera.lookAt(this.scene.position);
        this.renderer.setClearColor(0xeeeeee);
        this.renderer.setSize(threeWidth,windowHeight);
        this.renderer.sortObjects = false;
        $obj.append(this.renderer.domElement);

        this.createControls();
        if(canWebgl){
            this.addLight();
        }
        this.changeRate(300);
        this.createBigMesh();
        this.createTips();
        this.createanimate1group();
        return  this.camera;
    };
    this.objStyle = function(color,fontsize){
        return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
    };
    this.createLineMesh =function(vertices,color,style){
        var lineMesh=null,geometryLine = new THREE.Geometry();
        geometryLine.vertices = vertices;
        if(!color){ color = '#000';}
        if(!style){
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }else{
            geometryLine.computeLineDistances();
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({ color: color,opacity:0.1, dashSize: 10, gapSize: 5 }));
        }
        return lineMesh;
    };
    this.createText = function(content,coordinate,color,fontsize){
        if(!color){ color = '#000';}
        if(!fontsize){ fontsize = '10px Arial'; }
        var textStyle = this.objStyle(color,fontsize),
            text = new SpriteText2D(content, textStyle);
        text.position.set(coordinate[0], coordinate[1], coordinate[2]);
        return text;
    };
    this.createSphere = function(coordinate,radius){
        var sphereG = new THREE.SphereGeometry(radius,sphereN,sphereN,0,2*Math.PI,0,2*Math.PI);
        var sphereM=null;
        if(!canWebgl){
            sphereM = new THREE.MeshBasicMaterial({color: colorSphere});
        }else{
            sphereM = new THREE.MeshPhongMaterial({color: colorSphere});
        }
        var sphere = new THREE.Mesh(sphereG,sphereM);
        sphere.position.x=coordinate[0];
        sphere.position.y=coordinate[1];
        sphere.position.z=coordinate[2];
        return sphere;
        // this.scene.add(sphere);
        // selectObjs.push(sphere);
        // bigMeshs.push(sphere);
    };
    this.createCube = function(coordinate,rotate,radius,length){
        var cubeG = new THREE.CylinderGeometry(radius,radius,length,cubeN,cubeN,false);
        var cubeM=null;
        if(!canWebgl){
            cubeM = new THREE.MeshBasicMaterial({color: colorCube});
        }else{
            cubeM = new THREE.MeshPhongMaterial({color: colorCube});
        }
        var cube = new THREE.Mesh(cubeG,cubeM);
        cube.position.x = coordinate[0];
        cube.position.y = coordinate[1];
        cube.position.z = coordinate[2];
        cube.rotation.x = rotate[0];
        cube.rotation.y = rotate[1];
        cube.rotation.z = rotate[2];
        // this.scene.add(cube);
        // selectObjs.push(cube);
        // bigMeshs.push(cube);

        return cube;

    };
    this.addLight = function(){
        // add subtle ambient lighting
        var ambientLight = new THREE.AmbientLight(0x0c0c0c);
        this.scene.add(ambientLight);

        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(6000,10000,6000);
        spotLight.castShadow = true;
        this.scene.add(spotLight);

        var spotLight1 = new THREE.SpotLight(0xffffff);
        spotLight1.position.set(-6000,-10000,-6000);
        spotLight1.castShadow = true;
        this.scene.add(spotLight1);

    };
    this.onDocumentMouseMove = function(event){
        event.preventDefault();
        mouse.x = (event.clientX / threeWidth) * 2 - 1;
        mouse.y = -( event.clientY/ threeHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, thiz.camera);
        var intersects = raycaster.intersectObjects( selectObjs );
        if(rotationarc||sphereOutCount||outed){
            ononon =false;
            return;
        }
        if ( intersects.length > 0 ) {
            ononon = 1;
            // thiz.tips2();
            $obj.css('cursor','pointer');
        }else{
            ononon = 0;
            // thiz.tips1();
            $obj.css('cursor','auto');
        }
        raycaster.setFromCamera( mouse, thiz.camera );
    };
    this.onDocumentClick = function(event){
        event.preventDefault();
        if (event.touches.length === 1) {
            mouse.x = ((event.touches[0].pageX-offsetLeft) / threeWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-offsetTop) / threeWidth ) * 2 + 1;
            raycaster.setFromCamera(mouse, thiz.camera);
            var intersects = raycaster.intersectObjects(selectObjs);
            if(rotationarc||sphereOutCount||outed){
                ononon =false;
                return;
            }
            if ( intersects.length > 0 ) {
                ononon = 1;
                // thiz.tips2();
                $obj.css('cursor','pointer');
            }else{
                ononon = 0;
                // thiz.tips1();
                $obj.css('cursor','auto');
            }
        }
    };
    this.createControls = function(){
        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
    };
    this.changeRate = function(ratee){
        rate = ratee;
        clineLength = 0.154*rate;
        cradius = (Math.sqrt(3)*clineLength/8).toFixed(2);
    };
    this.createBigMesh = function(){
        var length1 = (2*clineLength*Math.sin(clineArc2/2)).toFixed(2);//底面键与键之间的距离

        var countx = parseFloat((length1*Math.cos(Math.PI/3)).toFixed(2));
        var countz = parseFloat((length1*Math.sin(Math.PI/3)).toFixed(2));

        this.createFloors(length1,countx,countz);
        this.createCubes();
        this.scene.add(group);
        group.position.z = threelen;
        for(var i=0;i<group.children.length;i++){
            selectObjs.push(group.children[i]);
        }

    };
    this.createTips = function(){
        var json1 = [],//写入键长
            json2 =[];//写入键角度
        tips=[];
        json1.push(floor4[1]);
        json1.push(floor5[1]);


        var vertices = [];
        vertices.push(new THREE.Vector3(json1[0][0],json1[0][1],json1[0][2]));
        vertices.push(new THREE.Vector3(json1[0][0]+30,json1[0][1],json1[0][2]));
        var line1 = this.createLineMesh(vertices,'#666');
        group.add(line1);
        tips.push(line1);

        vertices = [];
        vertices.push(new THREE.Vector3(json1[1][0],json1[1][1],json1[1][2]));
        vertices.push(new THREE.Vector3(json1[1][0]+30,json1[1][1],json1[1][2]));
        line1 = this.createLineMesh(vertices,'#666');
        group.add(line1);
        tips.push(line1);

        vertices = [];
        vertices.push(new THREE.Vector3(json1[1][0]+20,json1[1][1],json1[1][2]));
        vertices.push(new THREE.Vector3(json1[1][0]+20,json1[1][1]-clineLength/2+5,json1[1][2]));
        line1 = this.createLineMesh(vertices,'red');
        group.add(line1);
        tips.push(line1);

        vertices = [];
        vertices.push(new THREE.Vector3(json1[0][0]+20,json1[0][1],json1[0][2]));
        vertices.push(new THREE.Vector3(json1[0][0]+20,json1[0][1]+clineLength/2-5,json1[0][2]));
        line1 = this.createLineMesh(vertices,'red');
        group.add(line1);
        tips.push(line1);


        line1 = this.createText('1.55e-10 m',[json1[0][0]+20,json1[0][1]+clineLength/2+5,json1[0][2]],'blue');
        line1.scale.x = 0.7;
        line1.scale.y = 0.7;
        line1.scale.z = 0.7;
        group.add(line1);
        tips.push(line1);


        json2.push([(floor5[1][0]+floor6[0][0])/2,(floor5[1][1]+floor6[0][1])/2,(floor5[1][2]+floor6[0][2])/2]);
        json2.push([(floor7[0][0]+floor6[0][0])/2,(floor7[0][1]+floor6[0][1])/2,(floor7[0][2]+floor6[0][2])/2]);

        vertices = [];
        vertices.push(new THREE.Vector3(json2[0][0],json2[0][1],json2[0][2]));
        vertices.push(new THREE.Vector3((floor5[1][0] + floor7[0][0])/2,(floor5[1][1] + floor7[0][1])/2,(floor5[1][2] + floor7[0][2])/2));
        line1 = this.createLineMesh(vertices,'red');
        group.add(line1);
        tips.push(line1);

        vertices = [];
        vertices.push(new THREE.Vector3(json2[1][0],json2[1][1],json2[1][2]));
        vertices.push(new THREE.Vector3((floor5[1][0] + floor7[0][0])/2,(floor5[1][1] + floor7[0][1])/2,(floor5[1][2] + floor7[0][2])/2));
        line1 = this.createLineMesh(vertices,'red');
        group.add(line1);
        tips.push(line1);

        line1 = this.createText("109°28'",[(floor5[1][0] + floor7[0][0])/2,(floor5[1][1] + floor7[0][1])/2,(floor5[1][2] + floor7[0][2])/2],'blue');
        line1.scale.x = 0.7;
        line1.scale.y = 0.7;
        line1.scale.z = 0.7;
        group.add(line1);
        tips.push(line1);
        this.tips1();


        line1 = this.createText('1',[floor4[0][0]+10,(floor4[0][1]+floor5[0][1])/2,floor4[0][2]],'red');
        line1.scale.x = 0.7;
        line1.scale.y = 0.7;
        line1.scale.z = 0.7;
        group.add(line1);
        anmate1text.push(line1);

        line1 = this.createText('2',[(floor4[0][0]+floor3[2][0])/2,(floor4[0][1]+floor3[2][1])/2+15,(floor4[0][2]+floor3[2][2])/2],'red');
        line1.scale.x = 0.7;
        line1.scale.y = 0.7;
        line1.scale.z = 0.7;
        group.add(line1);
        anmate1text.push(line1);

        line1 = this.createText('3',[(floor4[0][0]+floor3[0][0])/2,(floor4[0][1]+floor3[0][1])/2+15,(floor4[0][2]+floor3[0][2])/2],'red');
        line1.scale.x = 0.7;
        line1.scale.y = 0.7;
        line1.scale.z = 0.7;
        group.add(line1);
        anmate1text.push(line1);

        line1 = this.createText('4',[(floor4[0][0]+floor3[1][0])/2,(floor4[0][1]+floor3[1][1])/2+15,(floor4[0][2]+floor3[1][2])/2],'red');
        line1.scale.x = 0.7;
        line1.scale.y = 0.7;
        line1.scale.z = 0.7;
        group.add(line1);
        anmate1text.push(line1);

        for(var i=0;i<anmate1text.length;i++){
            anmate1text[i].visible = false;
        }

    };
    this.tips1 = function(){
        for(var i=0;i<tips.length;i++){
            tips[i].visible = false;
        }
    };
    this.tips2 = function(){
        for(var i=0;i<tips.length;i++){
            tips[i].visible = true;
        }
    };
    this.createFloors = function(length1,countx,countz){
        var sphere =  this.createSphere([0,0,0],cradius);
        var sphere2 =null;
        var x,z,i;
        for(i=0;i<4;i++){
            x =i*countx;
            z = i*countz ;
            if(i==0){
                floor1.push([0,0,0]);
            }else if(i==1){
                floor1.push([x,0,-z]);
                floor1.push([-x,0,-z]);
            }else if(i==2){
                floor1.push([x,0,-z]);
                floor1.push([0,0,-z]);
                floor1.push([-x,0,-z]);
            }else{
                floor1.push([x,0,-z]);
                floor1.push([countx,0,-z]);
                floor1.push([-countx,0,-z]);
                floor1.push([-x,0,-z]);
            }
        }

        for(i=0;i<floor1.length;i++){
            sphere2 = sphere.clone();
            sphere2.position.x = floor1[i][0];
            sphere2.position.y = floor1[i][1];
            sphere2.position.z = floor1[i][2];
            group.add(sphere2);
            othersphere.push(sphere2);
        }

        var startz = parseFloat((clineLength*Math.cos((clineArc-90)*Math.PI/180)).toFixed(2)); // 长度
        var height =parseFloat((clineLength*Math.sin((clineArc-90)*Math.PI/180)).toFixed(2)) ; // 高度
        threelen = 3*startz;

        for(i=0;i<3;i++){
            x =i*countx;
            z = i*countz + startz;
            if(i==0){
                floor2.push([0,height,-startz]);

                floor3.push([0,height+clineLength,-startz]);
            }else if(i==1){
                floor2.push([x,height,-z]);
                floor2.push([-x,height,-z]);

                floor3.push([x,height+clineLength,-z]);
                floor3.push([-x,height+clineLength,-z]);
            }else if(i==2){
                floor2.push([x,height,-z]);
                floor2.push([0,height,-z]);
                floor2.push([-x,height,-z]);

                floor3.push([x,height+clineLength,-z]);
                floor3.push([0,height+clineLength,-z]);
                floor3.push([-x,height+clineLength,-z]);
            }
        }
        for(i=0;i<floor2.length;i++){
            sphere2 = sphere.clone();
            sphere2.position.x = floor2[i][0];
            sphere2.position.y = floor2[i][1];
            sphere2.position.z = floor2[i][2];
            group.add(sphere2);
            othersphere.push(sphere2);
        }
        for(i=0;i<floor3.length;i++){
            sphere2 = sphere.clone();
            sphere2.position.x = floor3[i][0];
            sphere2.position.y = floor3[i][1];
            sphere2.position.z = floor3[i][2];
            group.add(sphere2);
            if(i == 0||i==1||i==2){
                anmate1.push(sphere2);
            }else{
                othersphere.push(sphere2);
            }
        }


        height = 2*parseFloat((clineLength*Math.sin((clineArc-90)*Math.PI/180)).toFixed(2)) +clineLength; // 高度
        startz = 2*parseFloat((clineLength*Math.cos((clineArc-90)*Math.PI/180)).toFixed(2)); // 长度

        for(i=0;i<3;i++) {
            x = i * countx;
            z = i * countz + startz;
            if (i == 0) {
                floor4.push([0, height, -startz]);

                floor5.push([0, height + clineLength, -startz]);
            } else if (i == 1) {
                floor4.push([x, height, -z]);
                floor4.push([-x, height, -z]);

                floor5.push([x, height + clineLength, -z]);
                floor5.push([-x, height + clineLength, -z]);
            }
        }

        z =3*parseFloat((clineLength*Math.cos((clineArc-90)*Math.PI/180)).toFixed(2)); // 长度
        height = 3*parseFloat((clineLength*Math.sin((clineArc-90)*Math.PI/180)).toFixed(2)) + 2*clineLength;
        floor6.push([0, height, -z]);
        height = 3*parseFloat((clineLength*Math.sin((clineArc-90)*Math.PI/180)).toFixed(2)) + 3*clineLength;
        floor7.push([0, height , -z]);

        for(i=0;i<floor4.length;i++){
            sphere2 = sphere.clone();
            sphere2.position.x = floor4[i][0];
            sphere2.position.y = floor4[i][1];
            sphere2.position.z = floor4[i][2];
            group.add(sphere2);

            if(i == 0){
                anmate1.push(sphere2);
            }else{
                othersphere.push(sphere2);
            }
        }
        for(i=0;i<floor5.length;i++){
            sphere2 = sphere.clone();
            sphere2.position.x = floor5[i][0];
            sphere2.position.y = floor5[i][1];
            sphere2.position.z = floor5[i][2];
            group.add(sphere2);

            if(i == 0){
                anmate1.push(sphere2);
            }else{
                othersphere.push(sphere2);
            }
        }
        sphere2 = sphere.clone();
        sphere2.position.x = floor6[0][0];
        sphere2.position.y = floor6[0][1];
        sphere2.position.z = floor6[0][2];
        group.add(sphere2);
        othersphere.push(sphere2);

        sphere2 = sphere.clone();
        sphere2.position.x = floor7[0][0];
        sphere2.position.y = floor7[0][1];
        sphere2.position.z = floor7[0][2];
        group.add(sphere2);
        lastsphere = sphere2;
        othersphere.push(sphere2);
    };
    this.createCubes = function(){

        var i,j;
        var array1 =[[0,1,2],[1,3,4],[2,4,5],[3,6,7],[4,7,8],[5,8,9]];
        var temarray = [];
        var rotationx = Math.PI*(180-clineArc)/180;
        var rotationy = Math.PI*(clineArc/2)/180;
        var rotation1 = [-rotationx,0,0];
        var rotation2 = [rotationx,0,rotationy];
        var rotation3 = [rotationx,0,-rotationy];
        var rotation=[];
        var num,x,y,z;
        var len = floor2.length;
        var radius = Math.round(cradius/5);
        var cube = this.createCube([0,0,0],[0,0,0],radius,clineLength);
        var cube2 = null;
        for(i=0;i<len;i++){
            temarray = [];
            temarray = array1[i];
            for(j=0;j<3;j++){
                num = temarray[j];
                cube2 = cube.clone();
                x = Math.round((floor2[i][0]+floor1[num][0])/2);
                y = Math.round((floor2[i][1]+floor1[num][1])/2);
                z = Math.round((floor2[i][2]+floor1[num][2])/2);
                if(j==0) {
                    rotation = rotation1;
                }else if(j==1){
                    rotation = rotation2;
                }else{
                    rotation = rotation3;
                }
                cube2.position.x = x;
                cube2.position.y = y;
                cube2.position.z = z;
                cube2.rotation.x = rotation[0];
                cube2.rotation.y = rotation[1];
                cube2.rotation.z = rotation[2];
                group.add(cube2);

                if(i==2 && j==2 || i==5 && j==0){
                    animate2[0].push(cube2)
                }

                if(i==2 && j==1|| i==4 && j==0 || i==4 && j==2 || i==5 && j==1){
                    animate2[2].push(cube2)
                }

                othersphere.push(cube2);
            }
            rotation = [0,0,0];
            cube2 = cube.clone();
            x = Math.round((floor2[i][0]+floor3[i][0])/2);
            y = Math.round((floor2[i][1]+floor3[i][1])/2);
            z = Math.round((floor2[i][2]+floor3[i][2])/2);
            cube2.position.x = x;
            cube2.position.y = y;
            cube2.position.z = z;
            cube2.rotation.x = rotation[0];
            cube2.rotation.y = rotation[1];
            cube2.rotation.z = rotation[2];
            group.add(cube2);

            if(i==2||i==5){
                animate2[1].push(cube2);
            }
            othersphere.push(cube2);

        }
        len = floor4.length;
        for(i=0;i<len;i++){
            temarray = [];
            temarray = array1[i];

            for(j=0;j<3;j++){
                num = temarray[j];
                cube2 = cube.clone();
                x = (floor4[i][0]+floor3[num][0])/2;
                y = (floor4[i][1]+floor3[num][1])/2;
                z = (floor4[i][2]+floor3[num][2])/2;

                if(j==0) {
                    rotation = rotation1;
                }else if(j==1){
                    rotation = rotation2;
                }else{
                    rotation = rotation3;
                }
                cube2.position.x = x;
                cube2.position.y = y;
                cube2.position.z = z;
                cube2.rotation.x = rotation[0];
                cube2.rotation.y = rotation[1];
                cube2.rotation.z = rotation[2];
                group.add(cube2);
                anmate1cube.push(cube2);

                if(i==2&&j==0||i==2&&j==2){
                    animate2[1].push(cube2);
                }
                if(i!==0){
                    othersphere.push(cube2);
                }
            }
            rotation = [0,0,0];
            cube2 = cube.clone();
            x = (floor4[i][0]+floor5[i][0])/2;
            y = (floor4[i][1]+floor5[i][1])/2;
            z = (floor4[i][2]+floor5[i][2])/2;
            cube2.position.x = x;
            cube2.position.y = y;
            cube2.position.z = z;
            cube2.rotation.x = rotation[0];
            cube2.rotation.y = rotation[1];
            cube2.rotation.z = rotation[2];
            group.add(cube2);
            anmate1cube.push(cube2);
            if(i!==0){
                othersphere.push(cube2);
            }
        }
        len = floor6.length;
        for(i=0;i<len;i++){
            temarray = [];
            temarray = array1[i];

            for(j=0;j<3;j++){
                num = temarray[j];
                cube2 = cube.clone();
                x = (floor6[i][0]+floor5[num][0])/2;
                y = (floor6[i][1]+floor5[num][1])/2;
                z = (floor6[i][2]+floor5[num][2])/2;
                if(j==0) {
                    rotation = rotation1;
                }else if(j==1){
                    rotation = rotation2;
                }else{
                    rotation = rotation3;
                }
                cube2.position.x = x;
                cube2.position.y = y;
                cube2.position.z = z;
                cube2.rotation.x = rotation[0];
                cube2.rotation.y = rotation[1];
                cube2.rotation.z = rotation[2];
                group.add(cube2);
                othersphere.push(cube2);

            }


            rotation = [0,0,0];
            cube2 = cube.clone();
            x = (floor6[i][0]+floor7[i][0])/2;
            y = (floor6[i][1]+floor7[i][1])/2;
            z = (floor6[i][2]+floor7[i][2])/2;

            cube2.position.x = x;
            cube2.position.y = y;
            cube2.position.z = z;
            cube2.rotation.x = rotation[0];
            cube2.rotation.y = rotation[1];
            cube2.rotation.z = rotation[2];
            group.add(cube2);
            othersphere.push(cube2);
        }
    };
    this.changeanimate1 = function () {
        if(!selectValue){
            var sphereM = null,j,i;
            sphereOutCount=0;
            if(!canWebgl){
                sphereM = new THREE.MeshBasicMaterial({color: colorSphere});
            }else{
                sphereM = new THREE.MeshPhongMaterial({color: colorSphere});
            }
            for(i=0;i<animate2.length;i++){
                for(j=0;j<animate2[i].length;j++){
                    animate2[i][j].material = sphereM;

                }
            }
            if(!canWebgl){
                sphereM = new THREE.MeshBasicMaterial({color: 'red'});
            }else{
                sphereM = new THREE.MeshPhongMaterial({color: 'red'});
            }

            thiz.changeanimate1color(sphereM);

            var meterial1 =null;
            if(!canWebgl){
                meterial1 = new THREE.MeshBasicMaterial({color: colorCube});
            }else{
                meterial1 = new THREE.MeshPhongMaterial({color: colorCube});
            }

            for(i=0;i<animate2[0].length;i++){
                animate2[0][i].material = meterial1;
            }
            if(!canWebgl){
                meterial1 = new THREE.MeshBasicMaterial({color: colorCube});
            }else{
                meterial1 = new THREE.MeshPhongMaterial({color: colorCube});
            }
            for(i=0;i<animate2[1].length;i++){
                animate2[1][i].material = meterial1;
            }
            if(!canWebgl){
                meterial1 = new THREE.MeshBasicMaterial({color: colorCube});
            }else{
                meterial1 = new THREE.MeshPhongMaterial({color: colorCube});
            }
            for(i=0;i<animate2[2].length;i++){
                animate2[2][i].material = meterial1;
            }


            spheresOut = true;

            setTimeout(function(){

                for(var i=0;i<othersphere.length;i++){
                    othersphere[i].visible = true;
                }
            },1000);


            for(i=0;i<anmate1text.length;i++){
                anmate1text[i].visible = true;
            }

        }else{
            outed = false;
            for(i=0;i<othersphere.length;i++){
                othersphere[i].visible = true;
            }
            clearTimeout(timg2);
            sphereOutCount =0;
            if(!canWebgl){
                sphereM = new THREE.MeshBasicMaterial({color: colorSphere});
            }else{
                sphereM = new THREE.MeshPhongMaterial({color: colorSphere});
            }
            for(i=0;i<animate1secondgroup.length;i++){
                animate1secondgroup[i].visible = false;

                animate1secondgroup[i].position.x = startD[0][0];
                animate1secondgroup[i].position.y = startD[0][1];
                animate1secondgroup[i].position.z = startD[0][2];
            }
            for(i=0;i<anmate1text.length;i++){
                anmate1text[i].visible = false;
            }

            var meterial1 = null;
            if(!canWebgl){
                meterial1 = new THREE.MeshBasicMaterial({color: '#aa0398'});
            }else{
                meterial1 = new THREE.MeshPhongMaterial({color: '#aa0398'});
            }
            for(i=0;i<animate2[0].length;i++){
                animate2[0][i].material = meterial1;
            }
            if(!canWebgl){
                meterial1 = new THREE.MeshBasicMaterial({color: '#fa3c2f'});
            }else{
                meterial1 = new THREE.MeshPhongMaterial({color: '#fa3c2f'});
            }
            for(i=0;i<animate2[1].length;i++){
                animate2[1][i].material = meterial1;
            }
            if(!canWebgl){
                meterial1 = new THREE.MeshBasicMaterial({color: '#001ef5'});
            }else{
                meterial1 = new THREE.MeshPhongMaterial({color: '#001ef5'});
            }
            for(i=0;i<animate2[2].length;i++){
                animate2[2][i].material = meterial1;
            }
            //this.shack1();
        }


        for(i=0;i<anmate1.length;i++){
            anmate1[i].material = sphereM;
        }
    };
    this.changeanimate1color = function(o){
        var sphereM = o;
        for(var i=0;i<anmate1.length;i++){
            anmate1[i].material = sphereM;
        }
    };
    this.createanimate1group = function(){
        for(var i=0;i<animate1second.length;i++){
            var smallgroup = new THREE.Group();
            var sphere = anmate1[animate1second[i][0]].clone();
            smallgroup.add(sphere);
            sphere = anmate1[animate1second[i][1]].clone();
            smallgroup.add(sphere);
            sphere = anmate1[animate1second[i][2]].clone();
            smallgroup.add(sphere);
            var position=[];
            position.push(anmate1text[animate1second[i][3]].position.x);
            position.push(anmate1text[animate1second[i][3]].position.y);
            position.push(anmate1text[animate1second[i][3]].position.z);
            var content = animate1second[i][3]+1;
            var line1 = this.createText(''+content+'',position,'red');
            line1.scale.x = 0.7;
            line1.scale.y = 0.7;
            line1.scale.z = 0.7;
            smallgroup.add(line1);
            position=[];
            position.push(anmate1text[animate1second[i][4]].position.x);
            position.push(anmate1text[animate1second[i][4]].position.y);
            position.push(anmate1text[animate1second[i][4]].position.z);
            content = animate1second[i][4]+1;
            line1 = this.createText(''+content+'',position,'red');
            line1.scale.x = 0.7;
            line1.scale.y = 0.7;
            line1.scale.z = 0.7;
            smallgroup.add(line1);

            var cube = anmate1cube[animate1second[i][5]].clone();
            smallgroup.add(cube);
            cube = anmate1cube[animate1second[i][6]].clone();
            smallgroup.add(cube);

            stopD.push([-250+i*100,-100,250]);

            smallgroup.position.z = threelen;
            position = smallgroup.position;
            startD.push([position.x,position.y,position.z]);
            this.scene.add(smallgroup);
            animate1secondgroup.push(smallgroup);
        }

        for(i=0;i<animate1secondgroup.length;i++){
            animate1secondgroup[i].visible = false;
        }
    };
    this.reback = function(){

        var sphereM = null,i,j,sphereM1 = null;
        if(!canWebgl){
            sphereM = new THREE.MeshBasicMaterial({color: colorCube});
            sphereM1 = new THREE.MeshBasicMaterial({color: colorSphere});
        }else{
            sphereM = new THREE.MeshPhongMaterial({color: colorCube});
            sphereM1 = new THREE.MeshPhongMaterial({color: colorSphere});
        }

        for(i=0;i<animate2.length;i++){
            for(j=0;j<animate2[i].length;j++){
                animate2[i][j].material = sphereM;
            }
        }
        for(i=0;i<othersphere.length;i++){
            othersphere[i].visible = true;
        }
        for(i=0;i<animate1secondgroup.length;i++){
            animate1secondgroup[i].visible = false;
        }

        for(i=0;i<anmate1text.length;i++){
            anmate1text[i].visible = false;
        }

        for(i=0;i<anmate1.length;i++){
            anmate1[i].material = sphereM1;
        }

    };
    this.rotation = function(){
        if(rotationarc >=360){
            clearTimeout(timg);
            setTimeout(function(){
                rotationarc =0;
            },50);
            return;
        }
        rotationarc+=5;
        timg = setTimeout(function(){
            var arc1 = rotationarc*Math.PI/180;
            var length = 2*threelen*Math.sin(arc1/2);
            var x = length*Math.sin(arc1/2);
            var y = length*Math.cos(arc1/2);
            group.rotation.y = arc1;
            group.position.x = y;
            group.position.z = threelen-x;
            thiz.rotation();

        },100)
    };
    this.outSphere = function(){
        if(sphereOutCount >25){
            clearTimeout(timg2);
            for(var i=0;i<animate1secondgroup.length;i++){
                animate1secondgroup[i].scale.x = 0.7;
                animate1secondgroup[i].scale.y = 0.7;
                animate1secondgroup[i].scale.z = 0.7;
            }
            setTimeout(function(){
                sphereOutCount =0
            },10);
            return;
        }
        sphereOutCount++;
        if(sphereOutCount == 1){
            for(i=0;i<animate1secondgroup.length;i++){
                animate1secondgroup[i].visible = true;
                animate1secondgroup[i].scale.x = 1;
                animate1secondgroup[i].scale.y = 1;
                animate1secondgroup[i].scale.z = 1;
            }
            outed=true;
        }
        timg2 = setTimeout(function(){


            var nowx,nowy,nowz;


             nowy = sphereOutCount*(stopD[0][1] - startD[0][1])/speed;
             nowz = sphereOutCount*(stopD[0][2] - startD[0][2])/speed;

            for(var i=0;i<animate1secondgroup.length;i++){
                if(i!=2||i!=3){
                    var count;
                    if(sphereOutCount>=10){
                        count=10
                    }else{
                        count = sphereOutCount;
                    }
                    nowx = count*(stopD[i][0] - startD[i][0])/10;
                }else{
                    nowx = sphereOutCount*(stopD[i][0] - startD[i][0])/speed;
                }

                animate1secondgroup[i].position.x = nowx;
                animate1secondgroup[i].position.y = nowy;
                animate1secondgroup[i].position.z = startD[0][2]+nowz;

            }
            

            thiz.outSphere();

        },100);

    };
}



var threeDimensional = new ThreeDimensional();
var  camera = threeDimensional.int();
var arc=360,totation=true;
renderAll();
function renderAll(){
    threeDimensional.controls.update();

    if(ononon){
       threeDimensional.tips2();
    }else{
        threeDimensional.tips1();
    }
    if(totation){
        threeDimensional.rotation();
        totation=false;
    }
    if(spheresOut){
        threeDimensional.outSphere();
        spheresOut=false;
    }
    requestAnimationFrame(renderAll);
    threeDimensional.renderer.render(threeDimensional.scene,threeDimensional.camera);
};

//鼠标点击，选中顶点
threeDimensional.renderer.domElement.addEventListener( 'mousemove', threeDimensional.onDocumentMouseMove, false );
threeDimensional.renderer.domElement.addEventListener( 'touchmove', threeDimensional.onDocumentClick, false );

$('input[name=method]').change(function(){
    if(this.id =='method1'){
        if(0<rotationarc<360){
            rotationarc = 360;
        }
        selectValue = false;
        $('.text').css('display','none');
    }else{
        selectValue = true;
        $('.text').css('display','block');
    }
    arc = 360;
    threeDimensional.changeanimate1();
});
var isMob=/iPad|Android|Phone/g.test(navigator.userAgent);
var clickT='';
if(isMob){
    clickT='touchstart';
}else{
    clickT='click';
}
$('#reback').on(clickT,function(){
    totation=true;
    $('.text').css('display','none');
    threeDimensional.reback();
    clearTimeout(timg);
    clearTimeout(timg2);
    camera.position.x = 0;
    camera.position.y = 300;
    camera.position.z = 1000;
    $('#method1').attr("checked",false);
    $('#method2').attr("checked",false);
    // $('.method-select').attr();
});
document.addEventListener('touchstart',function(e){e.preventDefault();},false);