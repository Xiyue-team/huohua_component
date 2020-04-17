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
    //     $(".threeControl").css({"zoom":bodyScale/0.7,"right":30*bodyScale,"bottom":30*bodyScale});
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
    threeWidth = $obj.width();


//初始全局变量
var axisArrow = new THREE.Group();
var axis = new THREE.Group();
var normalLength = 100*Math.sqrt(2).toFixed(2),flag =0;

//多边形参数
var polygon = { //多边形参数
    sides:4,
    angleJson : [],
    height:300,
    area:4,
    radio:normalLength,
    clear:5,
    has:false
};
var getParameter ={ //显示和改变参数
    sides:4,
    angleJson : [],
    height:300,
    area:4,
    radio:normalLength,
    clear:5
};




var axisFlag = false,gridFlag=false,controlrs=null,injecting=0,injected = 0,timming=0,countNum=0,peak =[0,polygon.height,0],maxRadius,minRadius;

maxRadius = Math.round(Math.sqrt(20*2/(polygon.sides*Math.sin(2*Math.PI/polygon.sides)))*100);
minRadius = Math.round(Math.sqrt(2/(polygon.sides*Math.sin(2*Math.PI/polygon.sides)))*100);


var twoDimension = {
    spheres:[],
    lines:[],
    init:function(){
        shape = twoDimension.createMesh(new THREE.ShapeGeometry(twoDimension.drawShape()));
        twoDimension.scene.add(shape);
    },
    getJson:function(n,radiusBtm,radiusTop){
        var array=[],x,y;
        polygon.angleJson.push([0,polygon.height1,0]);

        //下底面
        for(var i=0;i<n;i++){
            x = Math.round(radiusBtm * Math.sin((2*Math.PI/n)*i));
            y = Math.round(radiusBtm * Math.cos((2*Math.PI/n)*i));
            array = [x,0,y];
            polygon.angleJson.push(array);
        }
        //上底面
        for(i=0;i<n;i++){
            x = Math.round(radiusTop * Math.sin((2*Math.PI/n)*i));
            y = Math.round(radiusTop * Math.cos((2*Math.PI/n)*i));
            array = [x,getParameter.height,y];
            polygon.angleJson.push(array);
        }
    },
    getJson2:function(n){
        var array=[],x,y;
        polygon.angleJson2 = [];
        polygon.angleJson2.push([0,300,0]);
        for(var i=1;i<n+1;i++){
            x = polygon.angleJson[i][0];
            y = polygon.angleJson[i][2];
            array = [x,0,y];
            polygon.angleJson2.push(array);
        }
        for(i=1;i<n+1;i++){
            x = 0;
            y = 0;
            array=[x,0,y];
            polygon.angleJson2.push(array);
        }
    }
};

twoDimension.getJson(polygon.sides,polygon.radiusBtm,polygon.radiusTop);

function ThreeAbout(){

    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    this.objStyle = function(color,fontsize){
        return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
    };
    /**
     * content:文字内容
     * coordinate：坐标点 数组
     */
    this.createText = function(content,coordinate,color,fontsize){
        if(!color){ color = '#000';}
        if(!fontsize){ fontsize = '10px Cambria Math'; }
        var textStyle = this.objStyle(color,fontsize),
            text = new SpriteText2D(content, textStyle);
        text.position.set(coordinate[0], coordinate[1], coordinate[2]);
        return text;

    };
    /**
     * length:边长
     */
    this.getJson = function(length,n,height){
        var array=[],x,y,sideLength = length,bottomJson=[];
        polygon.angleJson = [];
        if(!height){ height = 0;}
        if(!n){ n = 36;}
        for(var i=0;i<n;i++){
            x = Math.round(sideLength* Math.sin((2*Math.PI/n)*i +Math.PI/4));
            y = Math.round(sideLength* Math.cos((2*Math.PI/n)*i +Math.PI/4));
            array = [x,0,y];
            bottomJson.push(array);
        }
        polygon.angleJson = bottomJson;
    };
    this.createPeak = function(height){
        peak = [0,height,0]
    };
    /**
     * json:点数据
     */
    this.getLineVertices = function(json){
        var vertices = [];
        for(var i=0;i<json.length;i++){
            vertices.push(new THREE.Vector3(json[i][0],json[i][1],json[i][2]));
        }
        if(json.length>2){
            vertices.push(new THREE.Vector3(json[0][0],json[0][1],json[0][2]));
        }
        return vertices;
    };
    /**
     * vertices:点组合
     * color:边颜色
     * style:边种类
     */
    this.createLineMesh =function(vertices,color,style){
        var lineMesh=null,geometryLine = new THREE.Geometry();
        geometryLine.vertices = vertices;
        if(!color){ color = '#000';}
        if(!style){
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }else{
            geometryLine.computeLineDistances();
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({ color: color,opacity:0.5, dashSize: 5, gapSize: 5 }));
        }
        return lineMesh;
    };
}

function TwoDimensional(){

    this.int = function(){

        this.getJson(polygon.radio,4,100);
    }


}

function ThreeDimensional(){
    var lines=[], textMesh=[], axis =new THREE.Group(), grid =null,texts=[],
        widthT = $('#WebGL-output-big').width(),
        heightT = window.innerHeight,faceMesh=null,mesh=null,
        vertices = [],faces =[],gradualMesh=null;


    //圆台部分

    this.sceneT = new THREE.Scene();
    this.sceneT.position.y = -400;
    this.cameraT  = new THREE.PerspectiveCamera(55, threeWidth / threeHeight, 1, 10000);
    this.rendererT = null;
    if(canWebgl){
        this.rendererT = new THREE.WebGLRenderer({antialias:true});
    }else{
        this.rendererT = new THREE.CanvasRenderer();
    }
    this.rendererT.setPixelRatio( window.devicePixelRatio );
    this.controls = null;

    this.int = function(){
        $('.three').height(heightT);
        this.cameraT.position.x = 800;
        this.cameraT.position.y = 800;
        this.cameraT.position.z = 800;
        this.cameraT.lookAt(this.sceneT.position);
        this.rendererT.setClearColor(0xffffff);
        this.rendererT.setSize(threeWidth,threeHeight);

        this.createControls();

        $obj.append(this.rendererT.domElement);

        this.createMesh();

    };

    this.createControls = function(){
        this.controls = new THREE.OrbitControls( this.cameraT, this.rendererT.domElement );
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
    };
    this.createGrid = function(){
        var geometry = new THREE.Geometry(), bottom = -0.001, step = 100;
        var lineMaterial = new THREE.LineBasicMaterial( { color: 0x949494, transparent: true, opacity: 0.5 } );
        for ( var i = 0; i <= 10; i ++ ) {
            geometry.vertices.push( new THREE.Vector3( - 500, bottom, i * step - 500 ) );
            geometry.vertices.push( new THREE.Vector3(   500, bottom, i * step - 500 ) );

            geometry.vertices.push( new THREE.Vector3(i * step - 500, bottom, -500));
            geometry.vertices.push( new THREE.Vector3( i * step - 500, bottom,  500 ) );
        }
        grid = new THREE.LineSegments( geometry, lineMaterial, THREE.LinePieces );
        this.sceneT.add( grid );
        window.gridColor = 0x303030;
    };
    this.createAxis = function(){
        axis =new THREE.Group();
        this.labelAxis(50, 50, 550);
        this.drawAxisArrow(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 600, 0, 0 ), 0xFF0000);
        this.drawAxisArrow(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 600, 0 ), 0x00FF00);
        this.drawAxisArrow(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 600 ), 0x0000FF);
        this.sceneT.add(axis);
    };
    this.labelAxis = function (start, stepSize, stop) {
        var text=null;
        // label x axis:
        for(var i = start; i <= stop; i = i+stepSize) {
            text = this.createText(i,[i,-5,0],'red');
            text.rotation = this.cameraT.rotation;
            axis.add(text);
        }

        text = this.createText('x',[stop+30,-5,0],'red');
        text.rotation = this.cameraT.rotation;
        axis.add(text);

        // label z axis:
        for(i = start; i <= stop; i = i+stepSize) {
            text = this.createText(i,[-0.2,-5,i],'red');
            text.rotation = this.cameraT.rotation;
            axis.add(text);
        }

        text = this.createText('z',[-0.2,-5,stop+30],'#00F');
        text.rotation = this.cameraT.rotation;
        axis.add(text);


        // label y axis:
        for(i = start; i <= stop; i = i+stepSize) {
            text = this.createText(i,[5,i,0.2],'#00FF00');
            text.rotation = this.cameraT.rotation;
            axis.add(text);
        }

        text = this.createText('y',[5,stop+30,0.2],'#00FF00');
        text.rotation = this.cameraT.rotation;
        axis.add(text);
    };
    this.drawAxisArrow = function(origin, dir, _color){
        var geometryLine = new THREE.Geometry();
        var vertices = [];
        vertices.push(origin);
        vertices.push(dir);
        geometryLine.vertices = vertices;
        var line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: _color}));
        axis.add(line);
    };

    this.onGesturechange = function(event){
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
    };

    this.createTextMesh = function(){
        if(!axisFlag){ return;}
        var json = polygon.angleJson,num = polygon.sides,v3=[],text=null,x,y,i;

        if(num<36){
            for(i=0;i<num;i++){
                v3 = json[i];
                if(v3[0] < 0){ x= v3[0]-20;}else{ x= v3[0]+20;}
                if(v3[2] < 0){ y= v3[2]-20;}else{ y= v3[2]+20;}
                text = this.createText(v3[0]/100 +","+ v3[1]/100+","  + v3[2]/100,[x,0,y],'#000','15px Arial');
                this.sceneT.add(text);
                texts.push(text);
            }
        }

        v3 = peak;
        text = this.createText(v3[0]/100 +","+ v3[1]/100+","  + v3[2]/100,[v3[0],v3[1]+30,v3[2]]);
        this.sceneT.add(text);
        texts.push(text);
    };

    this.clearGrid = function(){
        if(grid != undefined){
            this.sceneT.remove(grid);
            grid = null;
        }
    };
    this.clearAxis = function(){
        this.sceneT.remove(axis);
    };

    this.createLine = function(){
        var num = polygon.sides,i,vertices=[],lineMesh=null;
        var json=[],json1=[],json2 = polygon.angleJson;
        if(num >=36){
            this.getJson(polygon.radio);
            json2 = polygon.angleJson;
            for(i=0;i<num;i++){
                json.push(json2[i]);
            }
            json.push(json2[0]);

            vertices = this.getLineVertices(json);
            lineMesh = this.createLineMesh(vertices,'#F39800');
            this.sceneT.add(lineMesh);
            lines.push(lineMesh);


        }else{


            for(i=0;i<num;i++){
                json.push(json2[i]);
                json1.push(json2[i]);
                json1.push(peak);

                vertices = this.getLineVertices(json1);
                lineMesh = this.createLineMesh(vertices,'#F39800');
                this.sceneT.add(lineMesh);
                lines.push(lineMesh);

            }
            json.push(json2[0]);

            vertices = this.getLineVertices(json);
            lineMesh = this.createLineMesh(vertices,'#F39800');
            this.sceneT.add(lineMesh);
            lines.push(lineMesh);


        }

    };
    this.clearLine = function(){
        if(lines.length >0){
            for(var i=0;i<lines.length;i++){
                this.sceneT.remove(lines[i]);
            }
            lines = [];
        }
    };
    this.repaintMesh = function(){
        this.clearLine();
        this.clearTextMesh();
        this.clearMesh();
        this.createMesh();
    };
    this.createVertices = function(flag,json){
        vertices = [];
        var num = polygon.angleJson.length;
        var json1 = polygon.angleJson;
        if(!flag){
            for(var i=0;i<num;i++){
                vertices.push(new THREE.Vector3(json1[i][0],json1[i][1],json1[i][2]));
            }
            vertices.push(new THREE.Vector3(peak[0],peak[1],peak[2]));
        }else{
            for(i=0;i<json.length;i++){
                vertices.push(new THREE.Vector3(json[i][0],json[i][1],json[i][2]));
            }
        }
    };
    this.createFaces = function(flag){
        faces = [];
        var num = polygon.sides;

        if(!flag){
            for(var i=0;i<num-1;i++){
                faces.push(new THREE.Face3(num, i, i+1));
            }
            faces.push(new THREE.Face3(num, 0, num-1));
            for(i=0;i<num-2;i++){
                faces.push( new THREE.Face3(0,i+1,i+2));
            }
        }else{
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
        }

    };
    this.createMesh = function(){
        if(polygon.sides >= 36){
            var meshG = new THREE.CylinderGeometry(0,polygon.radio,polygon.height,20);
            var meshM = new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.3,transparent:true,side:THREE.DoubleSide});
            mesh = new THREE.Mesh(meshG,meshM);
            mesh.position.y = getParameter.height/2;
        }else{
            this.createVertices();
            this.createFaces();
            var geom = new THREE.Geometry();
            geom.vertices = vertices;
            geom.faces = faces;
            geom.computeFaceNormals();
            var materials = [
                //new THREE.MeshLambertMaterial({opacity:0.7,transparent:true}),
                new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.3,transparent:true,side:THREE.DoubleSide})
            ];
            mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials);
        }
        this.sceneT.add(mesh);

        this.createLine();
        this.createTextMesh();

    };
    this.clearMesh = function(){
        this.sceneT.remove(mesh);
        mesh = null;
    };
    this.clearTextMesh = function(){
        if(texts.length >0){
            for(var i=0;i<texts.length;i++){
                this.sceneT.remove(texts[i]);
            }
            texts = [];
        }
    };
    this.createGradualMesh = function(radius,height,json){
        if(polygon.sides >= 36){

            var meshG = new THREE.CylinderGeometry(radius,polygon.radio,height,20);
            var meshM = new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.3,transparent:true,side:THREE.DoubleSide});
            gradualMesh = new THREE.Mesh(meshG,meshM);
            gradualMesh.position.y = height/2;


        }else{

            this.createVertices(1,json);
            this.createFaces(1);
            var geom = new THREE.Geometry();
            geom.vertices = vertices;
            geom.faces = faces;
            geom.computeFaceNormals();
            var materials = [
                //new THREE.MeshLambertMaterial({opacity:0.7,transparent:true}),
                new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.3,transparent:true,side:THREE.DoubleSide})
            ];
            gradualMesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials);

        }

        this.sceneT.add(gradualMesh);
    };
    this.injectMesh = function(){
        if(countNum>=50){
            clearTimeout(timming);
            timming=0;
            $('.dynamic').removeClass('on').addClass('off');
            setTimeout(function(){
                countNum = 0;
            },100);
            return;
        }
        countNum++;
        timming = setTimeout(function(){

            threeDimensional.injectMesh();

            var height = countNum*polygon.height/50;
            if(polygon.sides >=36){
                var radius = (50-countNum)*polygon.radio/50;
            }

            var json = polygon.angleJson;
            var totolJson = [];
            var num = polygon.sides,i;
            var x,z;

            if(num<36){

                totolJson.push(peak);
                for(i=0;i<num;i++){
                    x = json[i][0];
                    z = json[i][2];

                    totolJson.push([x,0,z]);
                }

                var rate = (polygon.height - height)/polygon.height;
                for(i=0;i<num;i++){
                    x = peak[0] + (json[i][0] - peak[0])*rate;
                    z = peak[2] + (json[i][2] - peak[2])*rate;

                    totolJson.push([x,height,z]);
                }
            }
            threeDimensional.clearGradualMesh();

            threeDimensional.createGradualMesh(radius,height,totolJson);
            changeVolunme2();

        },100)
    };
    this.clearGradualMesh = function(){
        if(gradualMesh!= undefined){
            this.sceneT.remove(gradualMesh);
            gradualMesh = null;
        }
    }

}

ThreeDimensional.prototype = new ThreeAbout();
TwoDimensional.prototype = new ThreeAbout();


var twoDimensional = new TwoDimensional();
twoDimensional.int();
var threeDimensional = new ThreeDimensional();
threeDimensional.int();

//重置事件
function renderAll(){
    threeDimensional.controls.update();

    if(injecting){
        injecting = 0;

        threeDimensional.clearMesh();
        threeDimensional.injectMesh();
    }

    requestAnimationFrame(renderAll);
    threeDimensional.rendererT.render(threeDimensional.sceneT,threeDimensional.cameraT);
}
renderAll();
var s = 4;

$('#slider1').change(function(){
    if(countNum){
        changeInject();
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
    $('.dynamic').removeClass('on');

    if(getParameter.sides >= 36){
        maxRadius = Math.round(Math.sqrt(20/Math.PI)*100);
        minRadius = Math.round(Math.sqrt(1/Math.PI)*100);
    }else{
        maxRadius = Math.round(Math.sqrt(20*2/(s*Math.sin(2*Math.PI/s)))*100);
        minRadius = Math.round(Math.sqrt(2/(s*Math.sin(2*Math.PI/s)))*100);
    }

    changeArea();
    polygon.sides = getParameter.sides;
    twoDimensional.getJson(normalLength,getParameter.sides,polygon.height);
    threeDimensional.createPeak(polygon.height);
    if(injected){
        threeDimensional.clearGradualMesh();
        injected=0;
    }
    threeDimensional.repaintMesh();
    $('.formula-right').text(''+0);

});

$('#slider2').change(function(){
    if(countNum){
        changeInject();
    }
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]);
    $('.dynamic').removeClass('on');
    getParameter.area = value;
    polygon.area = getParameter.area;
    changeRadius(polygon.area);
    setTimeout(function(){
        if(injected){
            threeDimensional.clearGradualMesh();
            injected=0;
        }
        twoDimensional.getJson(polygon.radio,polygon.sides);
        threeDimensional.repaintMesh();
        $('.formula-right').text(''+0);
    },300)


});

$('#slider4').change(function(){
    if(countNum){
        changeInject();
    }

    if(injected){
        threeDimensional.clearGradualMesh();
        injected=0;
    }
    $('.dynamic').removeClass('on');
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]);
    getParameter.height = value*100;

    peak[1] =  polygon.height = getParameter.height;
    threeDimensional.repaintMesh();
    $('.formula-right').text(''+0);

});




function changeVolunme2(){
    var allArea = polygon.area;
    var value = countNum*allArea/50;
    $('.formula-right').text(''+value);
}

function changeInject(){
    clearTimeout(timming);
    timming=0;
    $('#reback').removeClass('disabled');
    $('.open').removeClass('disabled');
    $('#store').removeClass('disabled');
    setTimeout(function(){
        countNum = 0;
    },100);
    threeDimensional.clearGradualMesh();
}
function changeArea(){
    var num = getParameter.sides,r = polygon.radio/100;
    if(num>=36){
        polygon.area = getParameter.area =  parseInt(Math.round(Math.PI*Math.pow(r,2)));
    }else{
        polygon.area = getParameter.area = Math.round(num*Math.pow(r,2)*Math.sin(2*Math.PI/num)/2);
    }
    var value = polygon.area-1;
    $('#sides-slider-value2').val(polygon.area);
    $('.area-select').find('.selected-bar').css('width',value*290/19);
    $('.area-select').find('.pointer.high').css('left',value*290/19-9);
    $('.area-select').find('.pointer-label.high').css('left',value*290/19).html('<span>'+polygon.area+'</span>');
}
function changeRadius(s){
    var num =getParameter.sides;
    if(num >=36){
        polygon.radio = Math.round(Math.sqrt(s/Math.PI)*100);
    }else{
        polygon.radio =  Math.round(Math.sqrt(s*2/(num*Math.sin(2*Math.PI/num)))*100);
    }
}

function changeRange(slider,num){
    var rate,value;

    if(slider == 2){
        rate = 410/20;
    }else if(slider == 3){
        rate = 410/20;
    }else if(slider == 4){
        rate = 410/10;
    }

    value = rate*num;
    var obj = $('.slider'+slider);
    obj.find('.sliderLeft').css({'width':value+'px'});
    obj.find('.xdsoft_range2dslider_runner').css({'left':value+'px'});
    obj.find('.xdsoft_slider_label').text(''+num);
    $('#slider'+slider).attr('value',''+num+'|0');
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

    changeInject();
    injected=0;
    polygon = { //多边形参数
        sides:4,
        angleJson : [],
        height:300,
        area:4,
        radio:normalLength,
        clear:5
    };
    getParameter ={ //显示和改变参数
        sides:4,
        angleJson : [],
        height:300,
        area:4,
        radio:normalLength,
        clear:5
    };

    peak = [0,300,0];
    twoDimensional.getJson(normalLength,4,300);
    threeDimensional.repaintMesh();
    dynamic = false;
    state = false;

    changeRange(2,8);
    changeRange(4,3);

    $('.slider1').find('.sliderLeft').css({'width':'82px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'82px'});
    $('.slider1').find('.xdsoft_slider_label').text(''+4);
    $('#slider1').attr('value',''+4+'|0');


    $('.dynamic').removeClass('on');

    threeDimensional.cameraT.position.x = 800;
    threeDimensional.cameraT.position.y = 800;
    threeDimensional.cameraT.position.z = 800;

    $('.formula-right').text(''+0);
}
function dynamicEve(){
    if(!injecting){
        threeDimensional.clearGradualMesh();
        injecting = 1;
        injected =1;
        $('.dynamic').addClass('on');
    }
}



if(!isMob){
    $('#renew').on('click',renewEve);
    $('#scale').on('click',fullEve);
    $('#liquid-desc').on('click',dynamicEve);
}else{
    $('#renew').on('touchstart',renewEve);
    $('#scale').on('touchstart',fullEve);
    $('#liquid-desc').on('touchstart',dynamicEve);
}




