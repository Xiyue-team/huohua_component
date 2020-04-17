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

/****** 位置相关 ******/
var $obj = $('#threeContainer'),
    threeHeight = $obj.height(),
    threeWidth = $obj.width();

var widthT = $("#threeContainer").width();
var heightT = $("#threeContainer").height();

$('.domE').css({'width':widthT+'px','height':heightT+'px'})
//判断是否支持webGL
var canWebgl = ( function () {
    try {
        var canvas = document.createElement( 'canvas' );
        return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
    } catch ( e ) {
        return false;
    }
} )();
var figure,num=0,p;
var content={
    1:0,
    2:0,
    3:0
};

var threeDimension = {
    //初始化
    init:function(){
        threeDimension.createScene();
        threeDimension.createControls();
        threeDimension.createAxis();
    },
    //创建场景于相机
    createScene:function(){
        threeDimension.scene = new THREE.Scene();
        threeDimension.scene.position.set(-425,-300,0)
        threeDimension.camera = new THREE.PerspectiveCamera(45, widthT / heightT, 1, 20000);
        threeDimension.camera.position.x = 0;
        threeDimension.camera.position.y = 0;
        threeDimension.camera.position.z = 1100;
        threeDimension.camera.lookAt(threeDimension.scene.position);
        // threeDimension.scene.add(threeDimension.camera);
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
    //定义鼠标控制
    createControls:function(){
        threeDimension.controls = new THREE.OrbitControls( threeDimension.camera, threeDimension.renderer.domElement );
        threeDimension.controls.enableDamping = true;
        threeDimension.controls.enableZoom=false;
        threeDimension.controls.dampingFactor = 0.25;
        threeDimension.controls.enableRotate =false;
        threeDimension.controls.enablePan =false;
    },
    vec3:function(x,y,z){
        return new THREE.Vector3(x, y, z);
    },
    createText:function(texts,x,y,z,color,size){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = threeDimension.camera.rotation;
        text.position.set(x,y,z);
        return text;
    },
    createTriangleFace:function(vertices,color){
        var material = new THREE.MeshBasicMaterial({color:color,opacity:1,overdraw : true});
        var geom = new THREE.Geometry();
        geom.faces.push(new THREE.Face3(0,1,2),new THREE.Face3(2,1,0));
        geom.vertices = vertices;
        var mesh = new THREE.SceneUtils.createMultiMaterialObject(geom,[material]);
        return mesh;
    },
    createAxis:function(){
        if(threeDimension.axis!=null){
            threeDimension.scene.remove(threeDimension.axis)
        }
        threeDimension.axis = new THREE.Group();
        threeDimension.labelAxis(0,80,800,90,90,450);
        threeDimension.drawAxisArrow(threeDimension.vec3( 0, 0, 0 ), threeDimension.vec3( 870, 0, 0 ), 0x000000,1);
        threeDimension.drawAxisArrow(threeDimension.vec3( 0, 0, 0 ), threeDimension.vec3( 0, 500, 0 ), 0x000000,2);
        threeDimension.scene.add( threeDimension.axis);
    },
    //坐标轴分度线
    labelAxis:function (startx,stepSizex,stopx,starty,stepSizey,stopy) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {};
        var text={},line=null,vertices=null;
        // label x axis:
        textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: 'black', antialias: true};
        for(var i = startx; i <=stopx; i = i+stepSizex) {
            text = new SpriteText2D(i/8+(num-num%100), textStyle);
            text.rotation = threeDimension.camera.rotation;
            text.position.x = i;
            text.position.y = -10;
            threeDimension.axis.add(text);
            vertices = [];
            vertices.push(threeDimension.vec3(i,0,0));
            vertices.push(threeDimension.vec3(i,10,0));

            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);
        }
        // label y axis:
        textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: 'black', antialias: true};
        for(var i = starty; i <= stopy; i = i+stepSizey) {
            text = new SpriteText2D(parseFloat(i/stepSizey*20/100).toFixed(2), textStyle);
            text.rotation = threeDimension.camera.rotation;
            text.position.x = -30;
            text.position.y = i+10;
            text.position.z = 0.2;
            threeDimension.axis.add(text);

            vertices = [];
            vertices.push(threeDimension.vec3(0,i,0));
            vertices.push(threeDimension.vec3(10,i,0));

            line = threeDimension.createLineMesh(vertices,'#000',3);
            threeDimension.axis.add(line);
        }
        threeDimension.axis.add(text);
    },
    //坐标轴
    drawAxisArrow:function(origin, dir,color,style) {
        var geometryLine = new THREE.Geometry();
        var vertices = [];
        vertices.push(origin);
        vertices.push(dir);
        geometryLine.vertices = vertices;
        var line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        vertices=[];
        vertices.push(threeDimension.vec3(0,112.5,0),threeDimension.vec3(850,112.5,0));
        var line1=threeDimension.createLineMesh(vertices, '#000', 2);
        vertices=[];
        vertices.push(threeDimension.vec3(0,225,0),threeDimension.vec3(850,225,0));
        var line2=threeDimension.createLineMesh(vertices, '#000', 2)
        threeDimension.axis.add(line,line1,line2);
        var text;
        var material = new THREE.MeshBasicMaterial({color:'#000',side:THREE.DoubleSide});
        if(style == 1){
            vertices=[];
            vertices.push(threeDimension.vec3(0,25,2),threeDimension.vec3(8,0,2),threeDimension.vec3(-8,0,2))
            var C=threeDimension.createTriangleFace(vertices,'#000');
            C.rotation.z=-Math.PI/2;
            C.position.x=dir.x-2;
            C.position.y=1;
            text=threeDimension.createText('投掷次数',dir.x+25,-25,0,'#000',26)
            threeDimension.axis.add(text,C);
            
        }else{
            vertices=[];
            vertices.push(threeDimension.vec3(0,25,2),threeDimension.vec3(8,0,2),threeDimension.vec3(-8,0,2))
            var C=threeDimension.createTriangleFace(vertices,'#000');
            C.position.y=dir.y-2;
            C.position.x=1;
            text=threeDimension.createText('频率',0,dir.y+55,0,'#000',26)
            threeDimension.axis.add(text,C);
        }
    },
    createLineMesh:function(vertices, color, style) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        if(style==2) {
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
    },
    createCircle:function(vertices,radius,color){
        var CircleG = new THREE.CircleGeometry(radius, 50, 0, 2 * Math.PI);
        var CircleM = new THREE.MeshBasicMaterial({color: color});
        var Circle = new THREE.Mesh(CircleG, CircleM);
        Circle.position.x = vertices[0]; 
        Circle.position.y = vertices[1];
        Circle.position.z = vertices[2];
        return Circle;
    },
    createObj:function(){
        if(num==1){
            threeDimension.Obj = new THREE.Group();
        }
        if(num!=1&&num/100!=0&&num%100==1||num==0){
            if(threeDimension.Obj!=null){
                threeDimension.scene.remove(threeDimension.Obj)
            }
            threeDimension.Obj = new THREE.Group();
            threeDimension.createAxis();
        }
        if(num>0){
            if(num%100!=0){
                vertices1=[];
                vertices1.push((num%100-1)*8+4,content[1]/num*450,1)
                vertices2=[];
                vertices2.push((num%100-1)*8+4,content[2]/num*450,1)
                vertices3=[];
                vertices3.push((num%100-1)*8+4,content[3]/num*450,1)
            }else{
                vertices1=[];
                vertices1.push(99*8+4,content[1]/num*450,1)  
                vertices2=[];
                vertices2.push(99*8+4,content[2]/num*450,1) 
                vertices3=[];
                vertices3.push(99*8+4,content[3]/num*450,1)             
            }
            var cir1=threeDimension.createCircle(vertices1, 4, '#EA1532');
            var cir2=threeDimension.createCircle(vertices2, 4, '#5471E9');
            var cir3=threeDimension.createCircle(vertices3, 4, '#ECA701');
            threeDimension.Obj.add(cir1,cir2,cir3);
            threeDimension.scene.add(threeDimension.Obj)
        } 
    }
}  
threeDimension.init();

function renderAll(){
    threeDimension.controls.update();
    requestAnimationFrame(renderAll);
    threeDimension.renderer.render(threeDimension.scene,threeDimension.camera);
}
renderAll();

function renew() {
    num=0;
    content={
        1:0,
        2:0,
        3:0
    };
    clearTimeout(S1);
    clearInterval(S2);
    $('table .cishu td:gt(0)').html('0');
    $('table .pinlv td:gt(0)').html('0.00');
    $('.dynamic1,.dynamic2').css('pointer-events','auto');
    $('.animate').css('background-image','url(images/1.png)');
    threeDimension.createAxis();
    threeDimension.scene.remove(threeDimension.Obj)
}
var S1,S2;
function dynamic1(){
    $('.dynamic1,.dynamic2').css('pointer-events','none');
    num++;
    figure=Math.ceil(Math.random()*4)
    $('.animate').css('background-image','url(images/d.gif?'+Math.random()+')');
    S1=setTimeout(function(){
        var index,nums;
        if(figure==2||figure==3){
            index=2;
            content[index]=content[index]+1;
        }else if(figure==4){
            index=3;
            content[index]=content[index]+1;
        }else{
            index=1;
            content[index]=content[index]+1;
        }
        $('table .cishu td').eq(index).html(content[index]);
        for(var i=1;i<4;i++){
            p=content[i]/num;
            $('table .pinlv td').eq(i).html((p/100).toFixed(2));
        }
        threeDimension.createObj()
        $('.animate').css('background-image','url(images/'+figure+'.png)');
        $('.dynamic1,.dynamic2').css('pointer-events','auto');
        clearTimeout(S1);
    },800)
}

function dynamic2(){
    $('.dynamic1,.dynamic2').css('pointer-events','none')
    var i=0;
    var numi=num%100;
    S2=setInterval(function(){
        num++;
        figure=Math.ceil(Math.random()*4)
        var index,nums;
        if(figure==2||figure==3){
            index=2;
            content[index]=content[index]+1;
        }else if(figure==4){
            index=3;
            content[index]=content[index]+1;
        }else{
            index=1;
            content[index]=content[index]+1;
        }
        $('table .cishu td').eq(index).html(content[index]);
        $('.animate').css('background-image','url(images/'+figure+'.png)');
        for(var j=1;j<4;j++){
            p=content[j]/num*100;
            $('table .pinlv td').eq(j).html((p/100).toFixed(2));
        }
        i++;
        threeDimension.createObj()
        if(i==100-numi){
            clearInterval(S2);
            $('.dynamic1,.dynamic2').css('pointer-events','auto')
        }
    },100)
}

if(isMob){
    //reset
    $('.reset').on('touchstart',renew);
    //投掷
    $('.dynamic1').on('touchstart',dynamic1);
    $('.dynamic2').on('touchstart',dynamic2);
}else{
    //reset
    $('.reset').on('click',renew);
    //投掷
    $('.dynamic1').on('click',dynamic1);
    $('.dynamic2').on('click',dynamic2);
}
