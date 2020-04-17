/**
 * Created by O2 on 2016/9/6.
 */


var changeCount = 0,timg=0,timg2=0,changing=false,changed =false,speed1=1,speed2=1;
//金刚石
var rate = 400,                             //放大rate倍
    clineLength = 0.154,                    //键与键之间的长度
    clineArc = (109+28/60).toFixed(2),      //角度的度数形式
    clineArc2 = Math.PI*clineArc/180,       //角度的π形式
    cradius = (Math.sqrt(3)*clineLength/8).toFixed(2),   //碳原子的半斤
    cstart={x:0,y:0,z:0},
    cheigth =0,
    cincline=0,
    csmalllength =0,
    clonglength=0;

//石墨
var mlineLength =0.142,
    mtopLength = 0.340,
    mlineArc = 120,
    mlineArc2 = Math.PI*mlineArc/180,
    mradius = cradius,
    mcenter={x:0,y:0,z:0},
    rotatelength = 0;


//选中操作相关变量
var raycaster = new THREE.Raycaster(),
    plane = new THREE.Plane(),
    offset = new THREE.Vector3(),
    intersection = new THREE.Vector3(),
    mouse = new THREE.Vector2(),
    INTERSECTED = null;
var group = new THREE.Group();
var group2 = new THREE.Group();

//旋转相关
var rotationarc=0,
    arc2=0;

window.onload = function(){
    if(window.innerHeight < $('.control').height()){
        $('.control').height(window.innerHeight).css('overflow-y','scroll');
    }
};

function ThreeDimensional() {
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
    var selectObjs1 = [], selectObjs2=[];
    var thiz = this;
    //创建物体相关
    var bigMeshs = [];
    var threelen;

    //石墨相关数据
    var mdata1, //一个圆环的横向的一半   sin
        mdata2; //角尖和旁边的竖直的高度 cos


    //数据相关
    var floor1 = [];
    var floor2 = [];
    var floor3 = [];
    var floor4 = [];
    var floor5 = [];
    var floor6 = [];

    var floorr1 = [];
    var floorr2 = [];
    var floorr3 = [];
    var floorr4 = [];
    var floorr5 = [];
    var floorr6 = [];


    //每个球有三个棍子，有四个差一个，共有50个棍子,初始情况
    var mcube12 =[]; //存放mcube
    var mcube34 =[];
    var mcube56 =[];
    var mstartCube12=[]; //x,y,z,rx,ry,rz
    var mstartCube34=[];
    var mstartCube56=[];

    var msphere12 =[];//存放msphere
    var msphere34 =[];
    var msphere56 =[];

    //转变后情况
    var ccube12position=[]; //x,y,z,rx,ry,rz
    var ccube34position=[];
    var ccube56position=[];
    var crectcube=[]; //竖直的棍子
    var height1=0,height2=0,height3=0; //转变第一步
    var stopheight1=0,stopheight3=0;

    var stopheight4=0,stopheight5=0,stopheight6=0;    //转变第二步

    var tips1=[],tips2=[];


    $('.three').height(windowHeight);
    var threeHeight = windowHeight;


    this.scene = new THREE.Scene();
    this.scene.position.y=-50;
    this.camera = new THREE.PerspectiveCamera(45, threeWidth / windowHeight, 1, 10000);
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
        speed1 = 180;
        speed2 = 20;
    }else{
        this.renderer = new THREE.CanvasRenderer();
        speed1 = 60;
        speed2 = 10;
    }
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.controls = null;


    this.int = function () {
        this.camera.position.x = 0;
        this.camera.position.y = 300;
        this.camera.position.z = 1000;
        this.camera.lookAt(this.scene.position);
        this.renderer.setClearColor(0xeeeeee);
        this.renderer.setSize(threeWidth, windowHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
        if(canWebgl){
            this.addLight();
        }

        this.changeRate(300);
        this.createBigMesh();
        this.createTips();
        return this.camera;
    };
    this.objStyle = function (color, fontsize) {
        return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
    };
    this.createLineMesh = function (vertices, color, style) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        geometryLine.vertices = vertices;
        if (!color) {
            color = '#000';
        }
        if (!style) {
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        } else {
            geometryLine.computeLineDistances();
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.1,
                dashSize: 10,
                gapSize: 5
            }));
        }
        return lineMesh;
    };
    this.createText = function (content, coordinate, color, fontsize) {
        if (!color) {
            color = '#000';
        }
        if (!fontsize) {
            fontsize = '10px Arial';
        }
        var textStyle = this.objStyle(color, fontsize),
            text = new SpriteText2D(content, textStyle);
        text.position.set(coordinate[0], coordinate[1], coordinate[2]);
        return text;
    };
    this.createSphere = function (coordinate, radius) {
        var sphereG = new THREE.SphereGeometry(radius, 32, 32, 0, 2 * Math.PI, 0, 2 * Math.PI);
        var sphereM = null;
        if(canWebgl){
            sphereM = new THREE.MeshPhongMaterial({color: '#0081e1'});
        }else{
            sphereM = new THREE.MeshBasicMaterial({color: '#0081e1'});
        }
        var sphere = new THREE.Mesh(sphereG, sphereM);
        sphere.position.x = coordinate[0];
        sphere.position.y = coordinate[1];
        sphere.position.z = coordinate[2];
        return sphere;
        // this.scene.add(sphere);
        // selectObjs.push(sphere);
        // bigMeshs.push(sphere);
    };
    this.createCube = function (coordinate, rotate, radius, length) {
        var cubeG = new THREE.CylinderGeometry(radius, radius, length, 3, 2, false);
        var cubeM = null;
        if(canWebgl){
            cubeM = new THREE.MeshPhongMaterial({color: '#838383'});
        }else{
            cubeM = new THREE.MeshBasicMaterial({color: '#838383'});
        }
        var cube = new THREE.Mesh(cubeG, cubeM);
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
    this.addLight = function () {
        // add subtle ambient lighting
        var ambientLight = new THREE.AmbientLight(0x0c0c0c);
        this.scene.add(ambientLight);

        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(6000, 10000, 6000);
        spotLight.castShadow = true;
        this.scene.add(spotLight);

        var spotLight1 = new THREE.SpotLight(0xffffff);
        spotLight1.position.set(-6000, -10000, -6000);
        spotLight1.castShadow = true;
        this.scene.add(spotLight1);

    };
    this.onDocumentMouseMove = function (event) {
        event.preventDefault();
        mouse.x = ((event.clientX - offsetLeft) / threeWidth ) * 2 - 1;
        mouse.y = -( (event.clientY - offsetTop) / threeHeight ) * 2 + 1;
        raycaster.setFromCamera(mouse, thiz.camera);
        var intersects = raycaster.intersectObjects(selectObjs1);
        if (intersects.length > 0) {
            if(changed){
                for(i=0;i<tips2.length;i++){
                    tips2[i].visible = true;
                }
            }else{
                for(var i=0;i<tips1.length;i++){
                    tips1[i].visible = true;
                }
            }

        } else {
            for(i=0;i<tips1.length;i++){
                tips1[i].visible = false;
            }
        }

        var  intersects2 = raycaster.intersectObjects(selectObjs2);
        if (intersects2.length > 0) {
            for(i=0;i<tips2.length;i++){
                tips2[i].visible = true;
            }
        } else {
            for(i=0;i<tips2.length;i++){
                tips2[i].visible = false;
            }
        }
        raycaster.setFromCamera(mouse, thiz.camera);
    };
    this.onDocumentTouchStart = function(event){
        event.preventDefault();
        if (event.touches.length === 1) {
            mouse.x = ((event.touches[0].pageX-offsetLeft) / threeWidth ) * 2 - 1;
            mouse.y = -( (event.touches[0].pageY-offsetTop) / threeWidth ) * 2 + 1;
            raycaster.setFromCamera(mouse, thiz.camera);
            var intersects = raycaster.intersectObjects(selectObjs1);
            if (intersects.length > 0) {
                if(changed){
                    for(i=0;i<tips2.length;i++){
                        tips2[i].visible = true;
                    }
                }else{
                    for(var i=0;i<tips1.length;i++){
                        tips1[i].visible = true;
                    }
                }
            } else {
                for(i=0;i<tips1.length;i++){
                    tips1[i].visible = false;
                }
            }
            var  intersects2 = raycaster.intersectObjects(selectObjs2);
            if (intersects2.length > 0) {
                for(i=0;i<tips2.length;i++){
                    tips2[i].visible = true;
                }
            } else {
                for(i=0;i<tips2.length;i++){
                    tips2[i].visible = false;
                }
            }
        }
    };
    this.onDocumentTouchEnd = function(event){
        event.preventDefault();

        for(var i=0;i<tips2.length;i++){
            tips2[i].visible = false;
        }

        for(i=0;i<tips1.length;i++){
            tips1[i].visible = false;
        }


    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
    };
    this.changeRate = function (ratee) {
        rate = ratee;
        clineLength = 0.154 * rate;
        cradius = (Math.sqrt(3) * clineLength / 8).toFixed(2);
        mlineLength = 0.142 * rate;
        mtopLength = 0.340 * rate;
        mradius = cradius;
        mdata1 = Math.sin((mlineArc/2)*Math.PI/180)*mlineLength;
        mdata2 = Math.cos((mlineArc/2)*Math.PI/180)*mlineLength;
        var x = 4*mdata1;
        var z = 2*mdata2+2*mlineLength;
        var y = mtopLength;
        mcenter.x = Math.round(x);
        mcenter.y =height2= Math.round(y);
        mcenter.z = -Math.round(z);
        cheigth = Math.round(clineLength*Math.sin((clineArc-90)*Math.PI/180)); //凸起的高度
        cincline = Math.round(clineLength*Math.cos((clineArc-90)*Math.PI/180));
        csmalllength = Math.round(cincline*Math.cos((60)*Math.PI/180));
        clonglength = Math.round(cincline*Math.sin((60)*Math.PI/180));
        x = 4*clonglength;
        z = 2*(csmalllength+cincline);
        y = clineLength+ 2*cheigth;
        cstart.x= Math.round(mcenter.x - x);
        cstart.y= stopheight1= Math.round(mcenter.y - y);
        cstart.z=Math.round(mcenter.z+z);
        rotatelength = Math.sqrt(Math.pow(mcenter.x,2)+Math.pow(mcenter.z,2));
        arc2 = Math.atan(Math.abs(mcenter.x/mcenter.y));
    };
    this.createBigMesh = function () {

        this.createFloors();
        this.createCubes();
        this.scene.add(group);
        group.position.x = -mcenter.x;
        group.position.z = -mcenter.z;
        this.createFloors2();
        this.createCubes2();
        this.scene.add(group2);
        group2.position.x = -mcenter.x;
        group2.position.z = -mcenter.z;
        this.floor2hide();
        for(var i=0;i<group.children.length;i++){
            selectObjs1.push(group.children[i]);
        }
        for( i=0;i<group2.children.length;i++){
            selectObjs2.push(group2.children[i]);
        }


    };
    this.createTips = function () {
        var json1 = [],//写入键长
            x,z,x1,z1;//写入键角度
        json1.push(floor1[4]);
        json1.push(floor3[4]);

        var vertices = [];
        vertices.push(new THREE.Vector3(json1[0][0], json1[0][1], json1[0][2]));
        vertices.push(new THREE.Vector3(json1[1][0],(json1[1][1]+json1[0][1])/2-10,json1[1][2]));
        var line1 = this.createLineMesh(vertices, '#fa3c2f');
        group.add(line1);
        tips1.push(line1);


        vertices = [];
        vertices.push(new THREE.Vector3(json1[0][0], json1[1][1], json1[0][2]));
        vertices.push(new THREE.Vector3(json1[1][0],(json1[1][1]+json1[0][1])/2+10,json1[1][2]));
        line1 = this.createLineMesh(vertices, '#fa3c2f');
        group.add(line1);
        tips1.push(line1);


        line1 = this.createText('335pm', [json1[1][0], (json1[1][1]+json1[0][1])/2+5, json1[1][2]], '#666');
        line1.scale.x = 0.7;
        line1.scale.y = 0.7;
        line1.scale.z = 0.7;
        group.add(line1);
        tips1.push(line1);


        x = mlineLength*Math.sin(30*Math.PI/180)/2;
        z = mlineLength*Math.cos(30*Math.PI/180)/2;
        json1=[];
        json1.push(floor2[3]);
        json1.push(floor1[4]);
        vertices = [];
        vertices.push(new THREE.Vector3(json1[0][0], json1[0][1], json1[0][2]));
        vertices.push(new THREE.Vector3(json1[0][0]-x, json1[0][1], json1[0][2]+z));
        line1 = this.createLineMesh(vertices, '#fa3c2f');
        group.add(line1);
        tips1.push(line1);

        vertices = [];
        vertices.push(new THREE.Vector3(json1[1][0], json1[1][1], json1[1][2]));
        vertices.push(new THREE.Vector3(json1[1][0]-x, json1[1][1], json1[1][2]+z));
        line1 = this.createLineMesh(vertices, '#fa3c2f');
        group.add(line1);
        tips1.push(line1);


        x = mlineLength*Math.sin(30*Math.PI/180)*3/8;
        z = mlineLength*Math.cos(30*Math.PI/180)*3/8;
        vertices = [];
        x1 = json1[1][0]-x;
        z1 = json1[1][2]+z;

        vertices.push(new THREE.Vector3(x1, json1[1][1], z1));

        vertices.push(new THREE.Vector3(x1-z, json1[1][1],z1-x));
        line1 = this.createLineMesh(vertices, '#fa3c2f');
        group.add(line1);
        tips1.push(line1);

        vertices = [];
        x1 = json1[0][0]-x;
        z1 = json1[0][2]+z;

        vertices.push(new THREE.Vector3(x1, json1[1][1], z1));

        vertices.push(new THREE.Vector3(x1+z, json1[1][1],z1+x));
        line1 = this.createLineMesh(vertices, '#fa3c2f');
        group.add(line1);
        tips1.push(line1);

        x = mlineLength*Math.sin(30*Math.PI/180)*4/8;
        z = mlineLength*Math.cos(30*Math.PI/180)*4/8;


        line1 = this.createText('142pm', [json1[1][0]-x-z, json1[1][1],json1[1][2]+z-x], '#666');
        line1.scale.x = 0.7;
        line1.scale.y = 0.7;
        line1.scale.z = 0.7;
        group.add(line1);
        tips1.push(line1);

        //石墨部分结束
        json1=[];
        json1.push(floorr3[4]);
        json1.push(floorr5[4]);


        vertices = [];
        vertices.push(new THREE.Vector3(json1[0][0], json1[0][1], json1[0][2]));
        vertices.push(new THREE.Vector3(json1[0][0]+30, json1[0][1], json1[0][2]));
        line1 = this.createLineMesh(vertices, '#fa3c2f');
        group2.add(line1);
        tips2.push(line1);

        vertices = [];
        vertices.push(new THREE.Vector3(json1[1][0], json1[1][1], json1[1][2]));
        vertices.push(new THREE.Vector3(json1[1][0]+30, json1[1][1], json1[1][2]));
        line1 = this.createLineMesh(vertices, '#fa3c2f');
        group2.add(line1);
        tips2.push(line1);

        vertices = [];
        vertices.push(new THREE.Vector3(json1[1][0]+20, json1[1][1], json1[1][2]));
        vertices.push(new THREE.Vector3(json1[1][0]+20, json1[1][1]-clineLength/2+5, json1[1][2]));
        line1 = this.createLineMesh(vertices, '#fa3c2f');
        group2.add(line1);
        tips2.push(line1);

        vertices = [];
        vertices.push(new THREE.Vector3(json1[0][0]+20, json1[0][1], json1[0][2]));
        vertices.push(new THREE.Vector3(json1[0][0]+20, json1[0][1]+clineLength/2-5, json1[0][2]));
        line1 = this.createLineMesh(vertices, 'red');
        group2.add(line1);
        tips2.push(line1);

        line1 = this.createText('155pm', [json1[1][0]+20, json1[1][1]-clineLength/2+3,json1[1][2]], '#666');
        line1.scale.x = 0.7;
        line1.scale.y = 0.7;
        line1.scale.z = 0.7;
        group2.add(line1);
        tips2.push(line1);

        json1=[];
        json1.push(floorr1[3]);
        json1.push(floorr2[3]);
        json1.push(floorr1[4]);

        vertices = [];
        vertices.push(new THREE.Vector3((json1[0][0]+json1[1][0])/2,(json1[0][1]+json1[1][1])/2,(json1[0][2]+json1[1][2])/2));
        vertices.push(new THREE.Vector3((json1[0][0]+json1[2][0])/2,(json1[0][1]+json1[2][1])/2,(json1[0][2]+json1[2][2])/2));
        line1 = this.createLineMesh(vertices, 'red');
        group2.add(line1);
        tips2.push(line1);

        vertices = [];
        vertices.push(new THREE.Vector3((json1[2][0]+json1[1][0])/2,(json1[2][1]+json1[1][1])/2,(json1[2][2]+json1[1][2])/2));
        vertices.push(new THREE.Vector3((json1[0][0]+json1[2][0])/2,(json1[0][1]+json1[2][1])/2,(json1[0][2]+json1[2][2])/2));
        line1 = this.createLineMesh(vertices, 'red');
        group2.add(line1);
        tips2.push(line1);

        line1 = this.createText('109°28', [(json1[0][0]+json1[2][0])/2, (json1[0][1]+json1[2][1])/2,(json1[0][2]+json1[2][2])/2], '#666');
        line1.scale.x = 0.7;
        line1.scale.y = 0.7;
        line1.scale.z = 0.7;
        group2.add(line1);
        tips2.push(line1);
        for(var i=0;i<tips1.length;i++){
            tips1[i].visible = false;
        }
        for( i=0;i<tips2.length;i++){
            tips2[i].visible = false;
        }
    };
    this.createFloors = function () {
        var sphere = this.createSphere([0, 0, 0], cradius);
        var sphere2 = null,sphereM=null;
        var x, z, i,j,num,start; //mdata1,mdata2
        for (i = 0; i < 5; i++) {
            if(i%2 == 0){ num=5; start=0;}else{ num=4;start=mdata1;}
            for(j=0;j<num;j++){
                x = 2*mdata1*j+start;
                z = (mdata2+mlineLength)*i;
                floor1.push([x, 0, -z]);
            }
        }
        for (i = 0; i < floor1.length; i++) {
            sphere2 = sphere.clone();
            sphere2.position.x = floor1[i][0];
            sphere2.position.y = floor1[i][1];
            sphere2.position.z = floor1[i][2];
            group.add(sphere2);
            msphere12.push(sphere2);
        }


        for (i = 0; i < 4; i++) {
            if(i%2 == 0){ num=4;start=mdata1;}else{ num=5; start=0;}
            for(j=0;j<num;j++){
                x = 2*mdata1*j+start;
                z = mdata2 + (mdata2+mlineLength)*i;
                floor2.push([x, 0, -z]);
            }
        }

        for (i = 0; i < floor2.length; i++) {
            sphere2 = sphere.clone();
            sphere2.position.x = floor2[i][0];
            sphere2.position.y = floor2[i][1];
            sphere2.position.z = floor2[i][2];
            if(canWebgl){
                sphereM = new THREE.MeshPhongMaterial({color: '#fa3c2f'});
            }else{
                sphereM = new THREE.MeshBasicMaterial({color: '#fa3c2f'});
            }
            group.add(sphere2);
            sphere2.material = sphereM;
            msphere12.push(sphere2);
        }


        for (i = 0; i < 5; i++) {
            if(i%2 == 0){ num=5; start=0;}else{ num=4;start=mdata1;}
            for(j=0;j<num;j++){
                x = 2*mdata1*j+start;
                z = (mdata2+mlineLength)*i;
                floor3.push([x, mtopLength, -z]);
            }
        }
        for (i = 0; i < floor3.length; i++) {
            sphere2 = sphere.clone();
            sphere2.position.x = floor3[i][0];
            sphere2.position.y = floor3[i][1];
            sphere2.position.z = floor3[i][2];
            group.add(sphere2);
            msphere34.push(sphere2);
        }

        for (i = 0; i < 4; i++) {
            if(i%2 == 0){ num=4;start=mdata1;}else{ num=5; start=0;}
            for(j=0;j<num;j++){
                x = 2*mdata1*j+start;
                z = mdata2 + (mdata2+mlineLength)*i;
                floor4.push([x, mtopLength, -z]);
            }
        }

        for (i = 0; i < floor4.length; i++) {
            sphere2 = sphere.clone();
            sphere2.position.x = floor4[i][0];
            sphere2.position.y = floor4[i][1];
            sphere2.position.z = floor4[i][2];
            group.add(sphere2);
            sphere2.material = sphereM;
            msphere34.push(sphere2);
        }

        for (i = 0; i < 5; i++) {
            if(i%2 == 0){ num=5; start=0;}else{ num=4;start=mdata1;}
            for(j=0;j<num;j++){
                x = 2*mdata1*j+start;
                z = (mdata2+mlineLength)*i;
                floor5.push([x, 2*mtopLength, -z]);
            }
        }
        for (i = 0; i < floor5.length; i++) {
            sphere2 = sphere.clone();
            sphere2.position.x = floor5[i][0];
            sphere2.position.y = floor5[i][1];
            sphere2.position.z = floor5[i][2];
            group.add(sphere2);
            msphere56.push(sphere2);
        }

        for (i = 0; i < 4; i++) {
            if(i%2 == 0){ num=4;start=mdata1;}else{ num=5; start=0;}
            for(j=0;j<num;j++){
                x = 2*mdata1*j+start;
                z = mdata2 + (mdata2+mlineLength)*i;
                floor6.push([x, 2*mtopLength, -z]);
            }
        }

        for (i = 0; i < floor6.length; i++) {
            sphere2 = sphere.clone();
            sphere2.position.x = floor6[i][0];
            sphere2.position.y = floor6[i][1];
            sphere2.position.z = floor6[i][2];
            group.add(sphere2);
            sphere2.material = sphereM;
            msphere56.push(sphere2);
        }
        height3 = 2*mtopLength;
    };
    this.createCubes = function () {
        var i, j;
        var array1 = [[0,1,5],[1,2,6],[2,3,7],[3,4,8],[-1,5,9],[5,6,10],[6,7,11],[7,8,12],[8,-1,13],[9,10,14],[10,11,15],[11,12,16],[12,13,17],[-1,14,18],[14,15,19],[15,16,20],[16,17,21],[17,-1,22]];
        var temarray = [];
        var rotationx = Math.PI * 90 / 180;
        var rotationy = Math.PI*60/180;
        var rotation1 = [rotationx, 0, rotationy];
        var rotation2 = [rotationx,0,-rotationy];
        var rotation3 = [rotationx,0,-0];
        var rotation = [0,0,0];
        var num, x, y, z;
        var len = floor2.length;
        var radius = Math.round(cradius /7);
        var cube = this.createCube([0, 0, 0], [0, 0, 0], radius, mlineLength);
        var cube2 = null,arrayc =[],arrays=[];
        for (i = 0; i < len; i++) {
            arrayc=[];
            arrays=[];
            temarray = [];
            temarray = array1[i];
            for (j = 0; j < 3; j++) {
                num = temarray[j];
                if(num<0){
                    arrayc.push(0);
                    arrays.push(0);
                    continue;
                }
                cube2 = cube.clone();
                x = Math.round((floor2[i][0] + floor1[num][0]) / 2);
                y = Math.round((floor2[i][1] + floor1[num][1]) / 2);
                z = Math.round((floor2[i][2] + floor1[num][2]) / 2);
                if (j == 0) {
                    rotation = rotation1;
                } else if (j == 1) {
                    rotation = rotation2;
                } else {
                    rotation = rotation3;
                }
                cube2.position.x = x;
                cube2.position.y = y;
                cube2.position.z = z;
                cube2.rotation.x = rotation[0];
                cube2.rotation.y = rotation[1];
                cube2.rotation.z = rotation[2];
                group.add(cube2);
                arrays.push([x,y,z,rotation[0],rotation[1],rotation[2]]);
                arrayc.push(cube2);
            }
            mcube12.push(arrayc);
            mstartCube12.push(arrays);
        }
        len = floor4.length;
        for (i = 0; i < len; i++) {
            temarray = [];
            temarray = array1[i];
            arrayc=[];
            arrays=[];
            for (j = 0; j < 3; j++) {
                num = temarray[j];
                if(num<0){
                    arrays.push(0);
                    arrayc.push(0);
                    continue;
                }
                cube2 = cube.clone();
                x = (floor4[i][0] + floor3[num][0]) / 2;
                y = (floor4[i][1] + floor3[num][1]) / 2;
                z = (floor4[i][2] + floor3[num][2]) / 2;

                if (j == 0) {
                    rotation = rotation1;
                } else if (j == 1) {
                    rotation = rotation2;
                } else {
                    rotation = rotation3;
                }
                cube2.position.x = x;
                cube2.position.y = y;
                cube2.position.z = z;
                cube2.rotation.x = rotation[0];
                cube2.rotation.y = rotation[1];
                cube2.rotation.z = rotation[2];
                group.add(cube2);
                arrays.push([x,y,z,rotation[0],rotation[1],rotation[2]]);
                arrayc.push(cube2);
            }
            mcube34.push(arrayc);
            mstartCube34.push(arrays);
        }
        len = floor6.length;
        for (i = 0; i < len; i++) {
            arrays=[];
            arrayc=[];
            temarray = [];
            temarray = array1[i];

            for (j = 0; j < 3; j++) {
                num = temarray[j];
                if(num<0){
                    arrays.push(0);
                    arrayc.push(0);
                    continue;
                }
                cube2 = cube.clone();
                x = (floor6[i][0] + floor5[num][0]) / 2;
                y = (floor6[i][1] + floor5[num][1]) / 2;
                z = (floor6[i][2] + floor5[num][2]) / 2;
                if (j == 0) {
                    rotation = rotation1;
                } else if (j == 1) {
                    rotation = rotation2;
                } else {
                    rotation = rotation3;
                }
                cube2.position.x = x;
                cube2.position.y = y;
                cube2.position.z = z;
                cube2.rotation.x = rotation[0];
                cube2.rotation.y = rotation[1];
                cube2.rotation.z = rotation[2];
                group.add(cube2);
                arrays.push([x,y,z,rotation[0],rotation[1],rotation[2]]);
                arrayc.push(cube2);
            }
            mstartCube56.push(arrays);
            mcube56.push(arrayc);
        }
    };
    this.rotation = function () {

        if (rotationarc >= 360) {
            clearTimeout(timg);
            timg = 0;
            gggroup.position.x =group.position.x=group2.position.x = -mcenter.x;
            gggroup.position.z =group.position.z=group2.position.z =-mcenter.z;
            gggroup.rotation.y =group.rotation.y=group2.rotation.y =0;

            setTimeout(function () {
                rotationarc = 0;
            },0);
            return;
        }
        rotationarc += 5;
        timg = setTimeout(function () {
            var arc1 = rotationarc * Math.PI / speed1;
            var length = 2 * rotatelength * Math.sin(arc1 / 2);
            var arc3 = Math.PI - arc2 - (Math.PI-arc1)/2;
            var x = length * Math.sin(arc3);
            var z = length * Math.cos(arc3);
            gggroup.rotation.y = arc1;
            gggroup.position.x = -mcenter.x + x;
            gggroup.position.z = -mcenter.z + z;
            thiz.rotation();
        }, 100);

    };
    this.createFloors2 =function(){
        var sphere = this.createSphere([0, 0, 0], cradius);
        var sphere2 = null,sphereM=null;
        var x,y, z, i,j,num,start;
        for (i = 0; i < 5; i++) {
            if(i%2 == 0){ num=5; start=0;}else{ num=4;start=clonglength;}
            for(j=0;j<num;j++){
                x = cstart.x + 2*clonglength*j+start;
                y = cstart.y;
                z = cstart.z - (csmalllength+clineLength)*i;
                floorr1.push([x, y, z]);
            }
        }
        for (i = 0; i < floorr1.length; i++) {
            sphere2 = sphere.clone();
            sphere2.position.x = floorr1[i][0];
            sphere2.position.y = floorr1[i][1];
            sphere2.position.z = floorr1[i][2];
            group2.add(sphere2);
        }

        for (i = 0; i < 4; i++) {
            if(i%2 == 0){ num=4;start=clonglength;}else{ num=5; start=0;}
            for(j=0;j<num;j++){
                x = cstart.x + 2*clonglength*j+start;
                y= cstart.y+cheigth;
                z =cstart.z - csmalllength - (csmalllength+clineLength)*i;
                floorr2.push([x, y, z]);
            }
        }
        stopheight4 = cstart.y+cheigth;
        for (i = 0; i < floorr2.length; i++) {
            sphere2 = sphere.clone();
            sphere2.position.x = floorr2[i][0];
            sphere2.position.y = floorr2[i][1];
            sphere2.position.z = floorr2[i][2];
            if(canWebgl){
                sphereM = new THREE.MeshPhongMaterial({color: '#fa3c2f'});
            }else{
                sphereM = new THREE.MeshBasicMaterial({color: '#fa3c2f'});
            }
            group2.add(sphere2);
            sphere2.material = sphereM;
        }

        for (i = 0; i < 5; i++) {
            if(i%2 == 0){ num=5; start=0;}else{ num=4;start=clonglength;}
            for(j=0;j<num;j++){
                x = cstart.x + 2*clonglength*j+start;
                y = cstart.y + 2*cheigth + clineLength;
                z = cstart.z - (csmalllength+clineLength)*i;
                floorr3.push([x, y, z]);
            }
        }
        for (i = 0; i < floorr3.length; i++) {
            sphere2 = sphere.clone();
            sphere2.position.x = floorr3[i][0];
            sphere2.position.y = floorr3[i][1];
            sphere2.position.z = floorr3[i][2];
            group2.add(sphere2);
        }

        for (i = 0; i < 4; i++) {
            if(i%2 == 0){ num=4;start=clonglength;}else{ num=5; start=0;}
            for(j=0;j<num;j++){
                x = cstart.x + 2*clonglength*j+start;
                y = cstart.y + cheigth + clineLength;
                z =cstart.z - csmalllength - (csmalllength+clineLength)*i;
                floorr4.push([x, y, z]);
            }
        }
        stopheight5 =y;
        for (i = 0; i < floorr4.length; i++) {
            sphere2 = sphere.clone();
            sphere2.position.x = floorr4[i][0];
            sphere2.position.y = floorr4[i][1];
            sphere2.position.z = floorr4[i][2];
            if(canWebgl){
                sphereM = new THREE.MeshPhongMaterial({color: '#fa3c2f'});
            }else{
                sphereM = new THREE.MeshBasicMaterial({color: '#fa3c2f'});
            }
            sphere2.material = sphereM;
            group2.add(sphere2);
        }

        for (i = 0; i < 4; i++) {
            if(i%2 == 0){ num=4;start=clonglength;}else{ num=5; start=0;}
            for(j=0;j<num;j++){
                x = cstart.x + 2*clonglength*j+start;
                y = cstart.y + 3*cheigth + 2*clineLength;
                z =cstart.z - csmalllength - (csmalllength+clineLength)*i;
                floorr6.push([x, y, z]);
            }
        }
        stopheight3 = cstart.y + 3*cheigth + 2*clineLength;

        for (i = 0; i < floorr6.length; i++) {
            sphere2 = sphere.clone();
            sphere2.position.x = floorr6[i][0];
            sphere2.position.y = floorr6[i][1];
            sphere2.position.z = floorr6[i][2];
            if(canWebgl){
                sphereM = new THREE.MeshPhongMaterial({color: '#fa3c2f'});
            }else{
                sphereM = new THREE.MeshBasicMaterial({color: '#fa3c2f'});
            }
            sphere2.material = sphereM;
            group2.add(sphere2);
        }

        for (i = 0; i < 5; i++) {
            if(i%2 == 0){ num=5; start=0;}else{ num=4;start=clonglength;}
            for(j=0;j<num;j++){
                x = cstart.x + 2*clonglength*j+start;
                y = cstart.y + 2*cheigth + 2*clineLength;
                z = cstart.z - (csmalllength+clineLength)*i;
                floorr5.push([x, y, z]);
            }
        }
        for (i = 0; i < floorr5.length; i++) {
            sphere2 = sphere.clone();
            sphere2.position.x = floorr5[i][0];
            sphere2.position.y = floorr5[i][1];
            sphere2.position.z = floorr5[i][2];
            group2.add(sphere2);
        }
        stopheight6 =cstart.y + 2*cheigth + 2*clineLength;
    };
    this.createCubes2 = function(){
        var array1 = [[0,1,5],[1,2,6],[2,3,7],[3,4,8],[-1,5,9],[5,6,10],[6,7,11],[7,8,12],[8,-1,13],[9,10,14],[10,11,15],[11,12,16],[12,13,17],[-1,14,18],[14,15,19],[15,16,20],[16,17,21],[17,-1,22]];
        var i,j;
        var temarray = [];
        var rotationx = Math.PI*(180-clineArc)/180;
        var rotationy = Math.PI*(clineArc/2)/180;
        var rotation1 = [-rotationx,0,-rotationy];
        var rotation2 = [-rotationx,0,rotationy];
        var rotation3 = [rotationx,0,-0];
        var rotation5 = [rotationx,0,rotationy];
        var rotation6 = [rotationx,0,-rotationy];
        var rotation7 = [-rotationx,0,0];
        var rotation=[];
        var num,x,y,z;
        var len = floorr2.length;
        var radius = Math.round(cradius/7);
        var cube = this.createCube([0,0,0],[0,0,0],radius,clineLength);
        var cube2 = null,array=[];

        for(i=0;i<len;i++){
            array=[];
            temarray = [];
            temarray = array1[i];
            for(j=0;j<3;j++){
                num = temarray[j];
                if(num<0){
                    array.push(0);
                    continue;
                }
                cube2 = cube.clone();
                x = Math.round((floorr2[i][0]+floorr1[num][0])/2);
                y = Math.round((floorr2[i][1]+floorr1[num][1])/2);
                z = Math.round((floorr2[i][2]+floorr1[num][2])/2);
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
                group2.add(cube2);
                array.push([x,y,z,rotation[0],rotation[1],rotation[2]]);
            }
            ccube12position.push(array);
            rotation = [0,0,0];
            cube2 = cube.clone();
            x = Math.round((floorr2[i][0]+floorr4[i][0])/2);
            y = Math.round((floorr2[i][1]+floorr4[i][1])/2);
            z = Math.round((floorr2[i][2]+floorr4[i][2])/2);
            cube2.position.x = x;
            cube2.position.y = y;
            cube2.position.z = z;
            cube2.rotation.x = rotation[0];
            cube2.rotation.y = rotation[1];
            cube2.rotation.z = rotation[2];
            group2.add(cube2);
            crectcube.push(cube2);
        }
        len = floorr4.length;
        for(i=0;i<len;i++){
            array=[];
            temarray = [];
            temarray = array1[i];
            for(j=0;j<3;j++){
                num = temarray[j];
                if(num<0){
                    array.push(0);
                    continue;
                }
                cube2 = cube.clone();
                x = Math.round((floorr4[i][0]+floorr3[num][0])/2);
                y = Math.round((floorr4[i][1]+floorr3[num][1])/2);
                z = Math.round((floorr4[i][2]+floorr3[num][2])/2);

                if(j==0) {
                    rotation = rotation5;
                }else if(j==1){
                    rotation = rotation6;
                }else{
                    rotation = rotation7;
                }
                cube2.position.x = x;
                cube2.position.y = y;
                cube2.position.z = z;
                cube2.rotation.x = rotation[0];
                cube2.rotation.y = rotation[1];
                cube2.rotation.z = rotation[2];
                group2.add(cube2);
                array.push([x,y,z,rotation[0],rotation[1],rotation[2]]);
            }
            ccube34position.push(array);
            rotation = [0,0,0];
            cube2 = cube.clone();
            x = Math.round((floorr3[i][0]+floorr5[i][0])/2);
            y = Math.round((floorr3[i][1]+floorr5[i][1])/2);
            z = Math.round((floorr3[i][2]+floorr5[i][2])/2);
            cube2.position.x = x;
            cube2.position.y = y;
            cube2.position.z = z;
            cube2.rotation.x = rotation[0];
            cube2.rotation.y = rotation[1];
            cube2.rotation.z = rotation[2];
            group2.add(cube2);
            crectcube.push(cube2);
        }

        rotation = [0,0,0];
        for(;i<23;i++) {
            cube2 = cube.clone();
            x = Math.round((floorr3[i][0] + floorr5[i][0]) / 2 );
            y = Math.round((floorr3[i][1] + floorr5[i][1]) / 2);
            z = Math.round((floorr3[i][2] + floorr5[i][2]) / 2);
            cube2.position.x = x;
            cube2.position.y = y;
            cube2.position.z = z;
            cube2.rotation.x = rotation[0];
            cube2.rotation.y = rotation[1];
            cube2.rotation.z = rotation[2];
            group2.add(cube2);
            crectcube.push(cube2);
        }


        len = floorr6.length;
        for(i=0;i<len;i++){
            array=[];
            temarray = [];
            temarray = array1[i];
            for(j=0;j<3;j++){
                num = temarray[j];
                if(num<0){
                    array.push(0);
                    continue;
                }
                cube2 = cube.clone();
                x = Math.round((floorr6[i][0]+floorr5[num][0])/2);
                y = Math.round((floorr6[i][1]+floorr5[num][1])/2);
                z = Math.round((floorr6[i][2]+floorr5[num][2])/2);
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
                group2.add(cube2);
                array.push([x,y,z,rotation[0],rotation[1],rotation[2]]);
            }
            ccube56position.push(array);
        }
    };
    this.reback = function(){
        clearTimeout(timg);
        timg = 0;
        clearTimeout(timg2);
        timg2 = 0;
        rotationarc = 0;
        threeDimensional.dimaondReback();
        threeDimensional.floor1show();
        threeDimensional.floor2hide();
        gggroup = group;
        rotating = 1;

        group.position.x =group.position.x=group2.position.x = -mcenter.x;
        group.position.z =group.position.z=group2.position.z =-mcenter.z;
        group.rotation.y =group.rotation.y=group2.rotation.y =0;


    };
    this.floor1hide = function(){
        var obj = group.children;
        for(var i=0;i<obj.length;i++){
            obj[i].visible = false;
        }
    };
    this.floor2hide = function(){
        var obj = group2.children;
        for(var i=0;i<obj.length;i++){
            obj[i].visible = false;
        }
    };
    this.floor1show = function(){
        var obj = group.children;
        for(var i=0;i<obj.length;i++){
            obj[i].visible = true;
        }
        for( i=0;i<tips1.length;i++){
            tips1[i].visible = false;
        }
    };
    this.floor2show = function(){
        var obj = group2.children;
        for(var i=0;i<obj.length;i++){
            obj[i].visible = true;
        }
        for( i=0;i<tips2.length;i++){
            tips2[i].visible = false;
        }
    };
    this.changeDiamond = function(){
        changed = true;
        if(changeCount>=speed2){
            clearTimeout(timg2);
            timg2=0;
            for(var i=0,j;i<msphere12.length;i++){
                if(i<23){
                    msphere12[i].position.x = floorr1[i][0];
                    msphere12[i].position.y = floorr1[i][1];
                    msphere12[i].position.z = floorr1[i][2];
                }else{
                    msphere12[i].position.x = floorr2[i-23][0];
                    msphere12[i].position.y = floorr2[i-23][1];
                    msphere12[i].position.z = floorr2[i-23][2];
                }

            }

            for(i=0;i<msphere34.length;i++){
                if(i<23){
                    msphere34[i].position.x = floorr3[i][0];
                    msphere34[i].position.y = floorr3[i][1];
                    msphere34[i].position.z = floorr3[i][2];
                }else{
                    msphere34[i].position.x = floorr4[i-23][0];
                    msphere34[i].position.y = floorr4[i-23][1];
                    msphere34[i].position.z = floorr4[i-23][2];
                }

            }

            for(i=0;i<msphere56.length;i++){
                if(i<23){
                    msphere56[i].position.x = floorr5[i][0];
                    msphere56[i].position.y = floorr5[i][1];
                    msphere56[i].position.z = floorr5[i][2];
                }else{
                    msphere56[i].position.x = floorr6[i-23][0];
                    msphere56[i].position.y = floorr6[i-23][1];
                    msphere56[i].position.z = floorr6[i-23][2];
                }

            }
            for(i=0;i<crectcube.length;i++){
                crectcube[i].visible = true;
            }


            for(i=0;i<mcube12.length;i++) {
                for (j = 0; j < 3; j++) {
                    if (mcube12[i][j]) {
                        mcube12[i][j].position.x = ccube12position[i][j][0];
                        mcube12[i][j].position.y = ccube12position[i][j][1];
                        mcube12[i][j].position.z = ccube12position[i][j][2];
                        mcube12[i][j].rotation.x = ccube12position[i][j][3];
                        mcube12[i][j].rotation.y = ccube12position[i][j][4];
                        mcube12[i][j].rotation.z = ccube12position[i][j][5];
                    }
                }
            }

            for(i=0;i<mcube34.length;i++) {
                for (j = 0; j < 3; j++) {
                    if (mcube34[i][j]) {
                        mcube34[i][j].position.x = ccube34position[i][j][0];
                        mcube34[i][j].position.y = ccube34position[i][j][1];
                        mcube34[i][j].position.z = ccube34position[i][j][2];
                        mcube34[i][j].rotation.x = ccube34position[i][j][3];
                        mcube34[i][j].rotation.y = ccube34position[i][j][4];
                        mcube34[i][j].rotation.z = ccube34position[i][j][5];
                    }
                }
            }

            for(i=0;i<mcube56.length;i++) {
                for (j = 0; j < 3; j++) {
                    if (mcube56[i][j]) {
                        mcube56[i][j].position.x = ccube56position[i][j][0];
                        mcube56[i][j].position.y = ccube56position[i][j][1];
                        mcube56[i][j].position.z = ccube56position[i][j][2];
                        mcube56[i][j].rotation.x = ccube56position[i][j][3];
                        mcube56[i][j].rotation.y = ccube56position[i][j][4];
                        mcube56[i][j].rotation.z = ccube56position[i][j][5];
                    }
                }
            }
            setTimeout(function(){
                changeCount=0;
            },10);
            return;
        }
        changeCount++;
        timg2 = setTimeout(function(){
            var heightchange1,heightchange2,heightchange3,i,x,y,z,rx,ry,rz,j;
            var half = speed2/2;
            if(changeCount < half){
                heightchange1 = changeCount*(stopheight1-height1)/half;
                heightchange2 = height3 + (changeCount)*(stopheight3-height3)/half;
                for(i=0;i<msphere12.length;i++){
                    msphere12[i].position.y = heightchange1;
                }
                for(i=0;i<msphere56.length;i++){
                    msphere56[i].position.y = heightchange2;
                }
                for(i=0;i<mcube12.length;i++){
                    for(j=0;j<3;j++){
                        if(mcube12[i][j]){
                            mcube12[i][j].position.y = heightchange1;
                        }
                    }
                }
                for(i=0;i<mcube56.length;i++){
                    for(j=0;j<3;j++){
                        if(mcube56[i][j]){
                            mcube56[i][j].position.y = heightchange2;
                        }
                    }
                }
            }else{

                heightchange1 = stopheight1+(changeCount-half)*(stopheight4-stopheight1)/half;
                heightchange2 = height2+(changeCount-half)*(stopheight5-height2)/half;
                heightchange3 = stopheight3+(changeCount-half)*(stopheight6-stopheight3)/half;


                for(i=0;i<floor2.length;i++){
                    msphere12[i+23].position.y = heightchange1;
                }
                for(i=0;i<floor2.length;i++){
                    msphere34[i+23].position.y = heightchange2;
                }
                for(i=0;i<floor1.length;i++){
                    msphere56[i].position.y = heightchange3;
                }

                for(i=0;i<mcube12.length;i++){
                    for(j=0;j<3;j++){
                        if(mcube12[i][j]){
                            x = (ccube12position[i][j][0] - mstartCube12[i][j][0])/half;
                            y = (ccube12position[i][j][1] - heightchange1)/half;
                            z = (ccube12position[i][j][2] - mstartCube12[i][j][2])/half;

                            mcube12[i][j].position.x = mstartCube12[i][j][0] + (changeCount-half)*x;
                            mcube12[i][j].position.y = heightchange1 + (changeCount-half)*y;
                            mcube12[i][j].position.z = mstartCube12[i][j][2] + (changeCount-half)*z;

                            rx = (ccube12position[i][j][3] - mstartCube12[i][j][3])/half;
                            ry = (ccube12position[i][j][4] - mstartCube12[i][j][4])/half;
                            rz = (ccube12position[i][j][5] - mstartCube12[i][j][5])/half;

                            if(j==0||j==1){
                                mcube12[i][j].rotation.x =-(mstartCube12[i][j][3]+rx);
                                mcube12[i][j].rotation.y =-(mstartCube12[i][j][4]+ry);
                                mcube12[i][j].rotation.z =-(mstartCube12[i][j][5]+rz);
                            }else{
                                mcube12[i][j].rotation.x =(mstartCube12[i][j][3]+rx)-changeCount*0.2/half;
                                mcube12[i][j].rotation.y =(mstartCube12[i][j][4]+ry);
                                mcube12[i][j].rotation.z =(mstartCube12[i][j][5]+rz);
                            }


                        }
                    }
                }

                for(i=0;i<mcube34.length;i++){
                    for(j=0;j<3;j++){
                        if(ccube34position[i][j]){

                            x = (ccube34position[i][j][0] - mstartCube34[i][j][0])/half;
                            y = (ccube34position[i][j][1] - heightchange2)/half;
                            z = (ccube34position[i][j][2] - mstartCube34[i][j][2])/half;

                            mcube34[i][j].position.x = mstartCube34[i][j][0] + (changeCount-half)*x;
                            mcube34[i][j].position.y = heightchange2 + (changeCount-half)*y;
                            mcube34[i][j].position.z = mstartCube34[i][j][2] + (changeCount-half)*z;

                            rx = (ccube34position[i][j][3] - mstartCube34[i][j][3])/half;
                            ry = (ccube34position[i][j][4] - mstartCube34[i][j][4])/half;
                            rz = (ccube34position[i][j][5] - mstartCube34[i][j][5])/half;


                            if(j==0||j==1){
                                mcube34[i][j].rotation.x =(mstartCube34[i][j][3]+rx)-changeCount*0.3/half;
                                mcube34[i][j].rotation.y =(mstartCube34[i][j][4]+ry);
                                mcube34[i][j].rotation.z =(mstartCube34[i][j][5]+rz);
                            }else{
                                mcube34[i][j].rotation.x =(mstartCube34[i][j][3]+rx)+changeCount*0.5/half;// ccube12position[i][j][3];
                                mcube34[i][j].rotation.y =(mstartCube34[i][j][4]+ry);// ccube12position[i][j][4];
                                mcube34[i][j].rotation.z =(mstartCube34[i][j][5]+rz);// ccube12position[i][j][5];
                            }



                        }
                    }
                }

                for(i=0;i<mcube56.length;i++){
                    for(j=0;j<3;j++){
                        if(mcube56[i][j]){

                            x = (ccube56position[i][j][0] - mstartCube56[i][j][0])/half;
                            y = (ccube56position[i][j][1] - heightchange3)/half;
                            z = (ccube56position[i][j][2] - mstartCube56[i][j][2])/half;

                            mcube56[i][j].position.x = mstartCube56[i][j][0] + (changeCount-half)*x;
                            mcube56[i][j].position.y = heightchange3 + (changeCount-half)*y;
                            mcube56[i][j].position.z = mstartCube56[i][j][2] + (changeCount-half)*z;

                            rx = (ccube56position[i][j][3] - mstartCube56[i][j][3])/half;
                            ry = (ccube56position[i][j][4] - mstartCube56[i][j][4])/half;
                            rz = (ccube56position[i][j][5] - mstartCube56[i][j][5])/half;


                            if(j==0||j==1){
                                mcube56[i][j].rotation.x =-(mstartCube56[i][j][3]+rx);// ccube12position[i][j][3];
                                mcube56[i][j].rotation.y =-(mstartCube56[i][j][4]+ry);// ccube12position[i][j][4];
                                mcube56[i][j].rotation.z =-(mstartCube56[i][j][5]+rz);// ccube12position[i][j][5];
                            }else{
                                mcube56[i][j].rotation.x =(mstartCube56[i][j][3]+rx)-changeCount*0.2/half;// ccube12position[i][j][3];
                                mcube56[i][j].rotation.y =(mstartCube56[i][j][4]+ry);// ccube12position[i][j][4];
                                mcube56[i][j].rotation.z =(mstartCube56[i][j][5]+rz);// ccube12position[i][j][5];
                            }
                        }
                    }
                }
            }
            thiz.changeDiamond();
        },50);
    };
    this.dimaondReback = function(){

        changeCount = 0;
        changed = false;
        for(var i=0;i<msphere12.length;i++){
            if(i<23){
                msphere12[i].position.x = floor1[i][0];
                msphere12[i].position.y = floor1[i][1];
                msphere12[i].position.z = floor1[i][2];
            }else{
                msphere12[i].position.x = floor2[i-23][0];
                msphere12[i].position.y = floor2[i-23][1];
                msphere12[i].position.z = floor2[i-23][2];
            }
        }

        for(i=0;i<msphere34.length;i++){
            if(i<23){
                msphere34[i].position.x = floor3[i][0];
                msphere34[i].position.y = floor3[i][1];
                msphere34[i].position.z = floor3[i][2];
            }else{
                msphere34[i].position.x = floor4[i-23][0];
                msphere34[i].position.y = floor4[i-23][1];
                msphere34[i].position.z = floor4[i-23][2];
            }
        }

        for(i=0;i<msphere56.length;i++){
            if(i<23){
                msphere56[i].position.x = floor5[i][0];
                msphere56[i].position.y = floor5[i][1];
                msphere56[i].position.z = floor5[i][2];
            }else{
                msphere56[i].position.x = floor6[i-23][0];
                msphere56[i].position.y = floor6[i-23][1];
                msphere56[i].position.z = floor6[i-23][2];
            }
        }

        for(i=0;i<mcube12.length;i++) {
            for (var j = 0; j < 3; j++) {
                if (mcube12[i][j]) {
                    mcube12[i][j].position.x = mstartCube12[i][j][0];
                    mcube12[i][j].position.y = mstartCube12[i][j][1];
                    mcube12[i][j].position.z = mstartCube12[i][j][2];
                    mcube12[i][j].rotation.x = mstartCube12[i][j][3];
                    mcube12[i][j].rotation.y = mstartCube12[i][j][4];
                    mcube12[i][j].rotation.z = mstartCube12[i][j][5];
                }
            }
        }

        for(i=0;i<mcube34.length;i++) {
            for (j = 0; j < 3; j++) {
                if (mcube34[i][j]) {
                    mcube34[i][j].position.x = mstartCube34[i][j][0];
                    mcube34[i][j].position.y = mstartCube34[i][j][1];
                    mcube34[i][j].position.z = mstartCube34[i][j][2];
                    mcube34[i][j].rotation.x = mstartCube34[i][j][3];
                    mcube34[i][j].rotation.y = mstartCube34[i][j][4];
                    mcube34[i][j].rotation.z = mstartCube34[i][j][5];
                }
            }
        }

        for(i=0;i<mcube56.length;i++) {
            for (j = 0; j < 3; j++) {
                if (mcube56[i][j]) {
                    mcube56[i][j].position.x = mstartCube56[i][j][0];
                    mcube56[i][j].position.y = mstartCube56[i][j][1];
                    mcube56[i][j].position.z = mstartCube56[i][j][2];
                    mcube56[i][j].rotation.x = mstartCube56[i][j][3];
                    mcube56[i][j].rotation.y = mstartCube56[i][j][4];
                    mcube56[i][j].rotation.z = mstartCube56[i][j][5];
                }
            }
        }

    };
}


var threeDimensional = new ThreeDimensional();
var creame = threeDimensional.int();
var rotating = 1;
var arc=360,totation=true;
var gggroup =group;
renderAll();
function renderAll(){
    threeDimensional.controls.update();

    if(rotating){
        rotating=0;
        rotationarc=0;
        clearTimeout(timg);
        timg=0;
        group.position.x =group.position.x=group2.position.x = -mcenter.x;
        group.position.z =group.position.z=group2.position.z =-mcenter.z;
        group.rotation.y =group.rotation.y=group2.rotation.y =0;
        threeDimensional.rotation();
    }
    requestAnimationFrame(renderAll);
    threeDimensional.renderer.render(threeDimensional.scene,threeDimensional.camera);
};

//鼠标点击，选中顶点
threeDimensional.renderer.domElement.addEventListener( 'mousemove', threeDimensional.onDocumentMouseMove, false );
threeDimensional.renderer.domElement.addEventListener( 'tarchmove', threeDimensional.onDocumentTouchStart, false );
threeDimensional.renderer.domElement.addEventListener( 'tarchend', threeDimensional.onDocumentTouchEnd, false );

var vallue=1;
var inputs = $('input[name=method]');
inputs.change(function(){
    var value = parseInt($(this).val());
    if(value == 1){
        if(0<rotationarc<360){
            rotationarc = 360;
        }
        if(0<changeCount<20){
            changeCount = 20;
        }
        threeDimensional.dimaondReback();
        threeDimensional.floor1show();
        threeDimensional.floor2hide();
        gggroup = group;
        rotating = 1;
    }else if(value ==2){
        if(0<rotationarc<360){
            rotationarc = 360;
        }
        if(0<changeCount<20){
            changeCount = 20;
        }
        threeDimensional.floor2show();
        threeDimensional.floor1hide();
        rotating = 1;
        gggroup = group2;
        threeDimensional.dimaondReback();
    }else if(value == 3){
        if(0<rotationarc<360){
            rotationarc = 360;
        }
        threeDimensional.dimaondReback();
        threeDimensional.floor1show();
        threeDimensional.floor2hide();
        threeDimensional.changeDiamond();
    }

});
var isMob=/iPad|Android|Phone/g.test(navigator.userAgent);
var clickT='';
if(isMob){
    clickT='touchstart';
}else{
    clickT='click';
}
$('#reback').on(clickT,function(){
    threeDimensional.reback();
    inputs.removeAttr('checked');
    inputs.eq(0).prop('checked','checked');
    creame.position.x = 0;
    creame.position.y = 300;
    creame.position.z = 1000;
});
document.addEventListener('touchstart',function(e){e.preventDefault();},false);