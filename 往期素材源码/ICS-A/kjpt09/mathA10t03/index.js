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
var scale = 1,isMob = /iPad|Android/g.test(navigator.userAgent),bodyWidth,bodyHeight;
function init_(){
    bodyWidth = $(window).width();
    bodyHeight = $(window).height();
    scale=bodyWidth/1920;
    if(1200*scale>bodyHeight){
        scale=bodyHeight/1200;
        $('#app').width(1920).css("zoom",scale);
    }else{
        $('#app').height(1200).css("zoom",scale);
    }
}
init_();
window.onresize=function(){
    init_();
}

var countLeft = (parseFloat($('#threeContainer').width()) - 380 - 1000)/2;
var countHeight = parseFloat($('#threeContainer').height()) - parseFloat($('.counting').height()) - 75 - 106;
$('.counting').css('left',countLeft);
/****** 位置相关 ******/
var $obj = $('#threeContainer');
    threeHeight = countHeight-50,
    threeWidth = 1000;
var isMoving = false;

var allBall = $('.ball'),timgs = [],click=false,click1= false;
var records ={
    person1:{
        whiteNum:0,
        totolNum:0,
        fre:0
    },
    person2:{
        whiteNum:0,
        totolNum:0,
        fre:0
    },
    person3:{
        whiteNum:0,
        totolNum:0,
        fre:0
    },
    person4:{
        whiteNum:0,
        totolNum:0,
        fre:0
    }
}
function ThreeDimensional() {
    var mousedownflag = false;
    var thiz = this;
    var selectobjs=[],selectobj=null;
    var axis = null,num=0;
    var self = this;
    var totolCount = 0,nowEnd=0,nowStart=0;
    var split = 450;
    var points = [],axisX=new THREE.Group();

    /****** 判断是否支持WebGL ******/
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
    this.renderer.autoClear = false;
    this.scene = new THREE.Scene();
    this.scene.position.x = -350;
    this.scene.position.y = -250;
    this.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
    //this.camera = new THREE.OrthographicCamera(threeWidth/-2.5,threeWidth/2.5,threeHeight/2.5,threeHeight/-2.5,-100,10000);

    this.controls = null;

    /****** 分割线 ******/
    this.int = function () {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 800;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);
        $('#threeContainer canvas').css({'left':countLeft,'margin-top':106+25,'margin-left':countLeft})
        this.createControls();
        this.createAxis();
        points = new THREE.Group();
        this.scene.add(points);
        this.scene.add(axisX);
    };
    this.roll1 = function(){
        isMoving = true;
        if(!click){
            click = true;
        }

        console.log('start','end','totolSize',nowStart,nowEnd)

        if((totolCount +1) > nowEnd ){
            createAxisX(nowEnd);
        }

        this.createObj1();
    };
    this.roll2 = function(){
        isMoving = true;
        if(!click1){
            click1 = true;
        }
        // console.log('start','end','totolSize',nowStart,nowEnd,totolCount);
        var surp = totolCount%100;
        if(surp == 0){
            createAxisX(totolCount);
            this.createObj2(1,100);
        }else{
            this.createObj2(1,100-surp);
        }

    };
    this.reset = function(){
        nowStart = 0;
        nowEnd =0;
        totolCount=0;
        this.scene.remove(axis);
        this.scene.remove(points);
        this.scene.remove(axisX);
        this.createAxis();
        points = new THREE.Group();
        this.scene.add(points);
        this.scene.add(axisX);
    }

    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = false;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = false;
    };

    this.createAxis = function(type){
        if(axis!=null){
            this.scene.remove(this.axis)
        }
        axis = new THREE.Group();
        labelAxis(0,80,700,90,90,450,type); ////type
        this.drawAxisArrow(vec3( 0, 0, 0 ), vec3( 700, 0, 0 ), 0x000000,1,type); //type
        this.drawAxisArrow(vec3( 0, 0, 0 ),vec3( 0, 500, 0 ), 0x000000,2,type);
        this.scene.add( axis);
    };

    this.drawAxisArrow = function(origin, dir,color,style,type) {
        var geometryLine = new THREE.Geometry();
        var vertices = [];
        vertices.push(origin);
        vertices.push(dir);
        geometryLine.vertices = vertices;
        var line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        vertices=[];
        vertices.push(vec3(0,225,0),vec3(700,225,0));
        var line1=self.createLineMesh(vertices, '#000', 2)
        axis.add(line,line1);
        var text;
        if(style == 1){
            vertices=[];
            vertices.push(vec3(0,25,2),vec3(8,0,2),vec3(-8,0,2))
            var C=createTriangleFace(vertices,'#000');
            C.rotation.z=-Math.PI/2;
            C.position.x=dir.x-2;
            C.position.y=1;
            text=createText('抓取次数',dir.x+25,-25,0,'#000',26)
            axis.add(text,C);
            
        }else{
            vertices=[];
            vertices.push(vec3(0,25,2),vec3(8,0,2),vec3(-8,0,2))
            var C=createTriangleFace(vertices,'#000');
            C.position.y=dir.y-2;
            C.position.x=1;
            text=createText('频率',0,dir.y+55,0,'#000',26)
            axis.add(text,C);
        }
    };
    /****** 事件函数 ******/
    this.createLineMesh = function(vertices, color, style) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        if (style == 1) {
            vertices.push(vec3(vertices[0].x,vertices[0].y-1,vertices[0].z));
            vertices.push(vec3(vertices[1].x,vertices[1].y-1,vertices[1].z));
            vertices.push(vec3(vertices[0].x+1,vertices[0].y,vertices[0].z));
            vertices.push(vec3(vertices[1].x+1,vertices[1].y,vertices[1].z));
            vertices.push(vec3(vertices[0].x-1,vertices[0].y,vertices[0].z));
            vertices.push(vec3(vertices[1].x-1,vertices[1].y,vertices[1].z));
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        } else if(style==2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 10,
                gapSize: 10,
                linewidth:3
            }));
        }else if( style == 3){
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }
        return lineMesh;
    }

    function vec3(x,y,z){
        return new THREE.Vector3(x, y, z);
    }
    function createTriangleFace(vertices,color){
        var material = new THREE.MeshBasicMaterial({color:color,opacity:1,overdraw : true});
        var geom = new THREE.Geometry();
        geom.faces.push(new THREE.Face3(0,1,2),new THREE.Face3(2,1,0));
        geom.vertices = vertices;
        var mesh = new THREE.SceneUtils.createMultiMaterialObject(geom,[material]);
        return mesh;
    }
    function createText(texts,x,y,z,color,size){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = self.camera.rotation;
        text.position.set(x,y,z);
        return text;
    }

    function createAxisX(startNum){
        self.scene.remove(axisX);
        self.scene.remove(points);
        axisX = new THREE.Group();
        points = new THREE.Group();
        self.scene.add(axisX);
        self.scene.add(points);
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {},stepSizex=120,startx = 0;
        var text={},line=null,vertices=null;
        // label x axis:
        textStyle = {align: textAlign.center, font: '18px "Cambria Math"', fillStyle: 'black', antialias: true};
        for(var i = 0; i <6; i++) {
            // console.log('startNum',startNum,i*20)
            text = new SpriteText2D(startNum+i*20, textStyle);
            //text.rotation = this.camera.rotation;
            text.position.x = startx + stepSizex*i;
            text.position.y = -5;
            axisX.add(text);

            if(i>=1){
                vertices = [];
                vertices.push(vec3(startx + stepSizex*i,0,0));
                vertices.push(vec3(startx + stepSizex*i,10,0));

                line = self.createLineMesh(vertices,'#000',3);
                axisX.add(line);
            }

        }
        nowStart = startNum;
        nowEnd = nowStart+5*20;
    }

    function labelAxis(startx,stepSizex,stopx,starty,stepSizey,stopy) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={},line=null,vertices=null;
        // label x axis:
        textStyle = {align: textAlign.center, font: '18px "Cambria Math"', fillStyle: 'black', antialias: true};
        createAxisX(0);

        textStyle = {align: textAlign.center, font: '18px "Cambria Math"', fillStyle: 'black', antialias: true};
        for(var i = starty; i <= stopy; i = i+stepSizey) {
            text = new SpriteText2D((i/stepSizey/5).toFixed(2), textStyle);
            //text.rotation = this.camera.rotation;
            text.position.x = -25;
            text.position.y = i+10;
            text.position.z = 0.2;
            axis.add(text);

            vertices = [];
            vertices.push(vec3(0,i,0));
            vertices.push(vec3(10,i,0));

            line = self.createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        axis.add(text);
    }

    /****** 其他事件 ******/

    this.result = function(num){
        if(!num) {num = 20}
        var res1 = 0,res2 = 0;
        for(var i=0;i<num;i++){
            var math = Math.random()*10;
            if(math >= 5){
                res2++;
            }else{
                res1++;
            }
        }
        return {white:res1,black:res2}
    };

    this.createObj1=function(){
        var colors = ['#EA1532','#5471E9','#00AAA3','#ECA701'];
        for(var i=1;i<5;i++){
            (function(i){
                var timg = setTimeout(function(){
                    var  res = self.result(1);
                    if(res.white){
                        records['person'+i]['whiteNum']++;
                    }
                    records['person'+i]['totolNum']++;
                    records['person'+i]['fre'] =(records['person'+i]['whiteNum']/records['person'+i]['totolNum']).toFixed(2) ;
                    if(res.white >= res.black){
                        allBall.addClass('hide');
                        $('.whiteGif').removeClass('hide');
                        var timg = setTimeout(function(){
                            $('.whiteGif').addClass('hide');
                            $('.whitePng').removeClass('hide');
                            $('.cols'+i).text(records['person'+i]['whiteNum'] +'');
                            $('.row'+i).text(records['person'+i]['fre'] +'');
                            var meshG = new THREE.CircleGeometry(3,12);
                            var meshM = new THREE.MeshBasicMaterial({color:colors[i-1]});
                            var mesh = new THREE.Mesh(meshG,meshM);
                            mesh.position.x =  (records['person'+i]['totolNum']-nowStart)*6 ;
                            mesh.position.y = 450*records['person'+i]['fre'];
                            mesh.position.z = 0;
                            points.add(mesh);
                        },1000);
                        timgs.push(timg);
                    }else{
                        allBall.addClass('hide');
                        $('.blackGif').removeClass('hide');
                        var timg = setTimeout(function(){
                            $('.blackGif').addClass('hide');
                            $('.blackPng').removeClass('hide');
                            $('.cols'+i).text(records['person'+i]['whiteNum'] +'');
                            $('.row'+i).text(records['person'+i]['fre'] +'');
                            var meshG = new THREE.CircleGeometry(3,12);
                            var meshM = new THREE.MeshBasicMaterial({color:colors[i-1]});
                            var mesh = new THREE.Mesh(meshG,meshM);
                            mesh.position.x =  (records['person'+i]['totolNum']-nowStart)*6 ;
                            mesh.position.y = 450*records['person'+i]['fre'];
                            mesh.position.z = 0;
                            points.add(mesh);
                        },1000);
                        timgs.push(timg);
                    }

                    if(i === 4){
                        totolCount++;
                        isMoving = false;
                    }

                },(i-1)*3000);
                timgs.push(timg);
            })(i)
        }
    };

    this.createObj2=function(num,steps){
        var colors = ['#EA1532','#5471E9','#00AAA3','#ECA701'];
        var color = colors[num-1];
        for(var i=1;i<(steps+1);i++){
            (function(i){
            var timg = setTimeout(function(){
                var res = self.result(1);
                if(res.white){
                    records['person'+num]['whiteNum']++;
                }
                records['person'+num]['totolNum']++;
                records['person'+num]['fre'] = (records['person'+num]['whiteNum']/records['person'+num]['totolNum']).toFixed(2);
                if(res.white){
                    setTimeout(function(){
                        $('.default').addClass('hide');
                        $('.blackPng').addClass('hide');
                        $('.whitePng').removeClass('hide');
                    },50)
                }else{
                    setTimeout(function(){
                        $('.default').addClass('hide');
                        $('.whitePng').addClass('hide');
                        $('.blackPng').removeClass('hide');
                    },50)
                }
                $('.cols'+num).text(records['person'+num]['whiteNum'] +'');
                $('.row'+num).text(records['person'+num]['fre'] +'');
                var meshG = new THREE.CircleGeometry(3,12);
                var meshM = new THREE.MeshBasicMaterial({color:color});
                var mesh = new THREE.Mesh(meshG,meshM);
                if(nowStart > 20){
                    mesh.position.x =  (records['person'+num]['totolNum']-nowStart)*6 ;
                }else{
                    mesh.position.x = 6*records['person'+num]['totolNum'];
                }
                mesh.position.y = 450*records['person'+num]['fre'];
                mesh.position.z = 0;
                points.add(mesh);
                if(i == steps){
                    if(num < 4){
                        $('.default').removeClass('hide');
                        $('.whitePng').addClass('hide');
                        $('.blackPng').addClass('hide');
                        num++;
                        self.createObj2(num,steps);
                    }else{
                        totolCount += steps;
                        isMoving = false;
                    }
                }

            },(i-1)*50);
            timgs.push(timg);
            })(i)
        }
    }
}


var three = new ThreeDimensional();
three.int();

renderAll();
function renderAll(){
    three.controls.update();
    requestAnimationFrame(renderAll);
    three.renderer.clear();
    three.renderer.render(three.scene,three.camera);
}

//页面操作
var $roll1 = $('#roll1'),$roll2 = $('#rollN'),$reset = $('#reset');

function reset(){
    three.reset();
    records ={
        person1:{
            whiteNum:0,
            totolNum:0,
            fre:0
        },
        person2:{
            whiteNum:0,
            totolNum:0,
            fre:0
        },
        person3:{
            whiteNum:0,
            totolNum:0,
            fre:0
        },
        person4:{
            whiteNum:0,
            totolNum:0,
            fre:0
        }
    };
    for(var i=0;i<timgs.length;i++){
        clearTimeout(timgs[i]);
    }
    timgs = [];
    $('table .cishu td').text('0');
    $('table .pinlv td').text('0.00');
    setTimeout(function(){
        allBall.addClass('hide');
        $('.default').removeClass('hide');
        click = false;
        click1 = false;
        isMoving = false;
    },300)

}
function roll1(){
    if(isMoving){ return;}
    three.roll1();
}
function roll2(){
    if(isMoving){ return;}
    three.roll2()
}

if(isMob){
    $reset.on('touchstart',reset);
    $roll1.on('touchstart',roll1);
    $roll2.on('touchstart',roll2);
}else{
    $reset.on('click',reset);
    $roll1.on('click',roll1);
    $roll2.on('click',roll2);
}