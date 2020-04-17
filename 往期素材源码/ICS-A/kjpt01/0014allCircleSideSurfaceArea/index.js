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
$(".con").css("margin-top",marginTop);
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


//初始全局变量
var axisArrow = new THREE.Group();
var axis = new THREE.Group();

var polygon = { //多边形参数
    clear:5,
    shape:2,
    opend:false,
    has:false
};
var getParameter ={ //显示和改变参数
    shape:2,
    clear:5,
    opend:false
};

var axisFlag = false,gridFlag=false,controlrs=null,countTiming=0,timming=0;

function ThreeAbout(){

    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    this.objStyle = function(color){
        return {align: textAlign.center, font: '10px Cambria Math', fillStyle: color, antialias: true};
    };

    /**
     * content:文字内容
     * coordinate：坐标点 数组
     */
    this.createText = function(content,coordinate,color){
        if(!color){ color = '#000';}
        var textStyle = this.objStyle(color),
            text = new SpriteText2D(content, textStyle);
        text.position.set(coordinate[0], coordinate[1], coordinate[2]);
        return text;

    };

    /**
     * length:边长
     */
    this.getJson = function(length,height){
        var array=[],x,y,n =36,sideLength = length,bottomJson=[];
        if(!height){ height =0;}
        for(var i=0;i<n;i++){
            x = Math.round(sideLength * Math.sin((2*Math.PI/n)*i));
            y = Math.round(sideLength * Math.cos((2*Math.PI/n)*i));
            array = [x,height,y];
            bottomJson.push(array);
        }
        return bottomJson;
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

function ThreeDimensional(){
    var lines=[], textMesh=[], axis =new THREE.Group(), grid =null,
        widthT = $('#WebGL-output-big').width(),
        heightT = window.innerHeight,faceMesh=null,
        height=200,
        topRadius=0,bottomRadius=80,middleRadius=50,
        radiusAbout=[],
        bottomCircle=null,topCircle=null,
        rect=null,
        pointTop = [],pointBottom =[],
        planeMesh=[];
    //圆台部分
    var h1 = Math.round(middleRadius*height/(bottomRadius-middleRadius)), //上边小圆锥的高
        h2 = h1+height,//总圆锥的高
        l1 = Math.round(Math.sqrt(Math.pow(middleRadius,2)+Math.pow(h1,2))),
        l2 = Math.round(Math.sqrt(Math.pow(bottomRadius,2)+Math.pow(h2,2)));

    pointTop.push([0,h2-l1,0]);
    pointBottom.push([0,h2-l2,0]);

    this.sceneT = new THREE.Scene();
    this.cameraT  = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
    var u = navigator.userAgent.toLowerCase();
    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();
    this.rendererT = null;
    if(canWebgl){
        this.rendererT = new THREE.WebGLRenderer({antialias:true});
    }else{
        this.rendererT = new THREE.CanvasRenderer();
    }
    this.rendererT.setPixelRatio( window.devicePixelRatio );

    this.int = function(){
        $('.three').height(heightT);
        this.cameraT.position.x = 600;
        this.cameraT.position.y = 600;
        this.cameraT.position.z = 600;
        this.cameraT.lookAt(this.sceneT.position);
        this.rendererT.setClearColor(0xffffff);
        // this.rendererT.setPixelRatio( window.devicePixelRatio );
        this.rendererT.setSize(threeWidth,threeHeight);

        this.createControls();

        $obj.append(this.rendererT.domElement);

        // this.createGrid();
        // this.createAxis();
        this.createClinderMesh();
        this.createLine();
        this.createTextMesh();

    };

    this.createClinderMesh = function(){
        if(polygon.shape == 2){
            topRadius = 50;
        }else if(polygon.shape == 3){
            topRadius = bottomRadius;
        }else{
            topRadius = 0;
        }
        var geoG = new THREE.CylinderGeometry(topRadius,bottomRadius,height,20,20);
        var geoM = new THREE.MeshBasicMaterial({color:'#F39800',opacity:0.3,transparent:true});
        faceMesh = new THREE.Mesh(geoG,geoM);
        faceMesh.position.y = height/2;
        this.sceneT.add(faceMesh);
    };
    this.createControls = function(){
        this.controls = new THREE.OrbitControls( this.cameraT, this.rendererT.domElement );
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
    };
    this.createGrid = function(){
        grid=null;
        var geometry = new THREE.Geometry(), bottom = -0.001, step = 50;
        var lineMaterial = new THREE.LineBasicMaterial( { color: 0x949494, transparent: true, opacity: 0.5 } );
        for ( var i = 0; i <= 12; i ++ ) {
            geometry.vertices.push( new THREE.Vector3( - 300, bottom, i * step - 300 ) );
            geometry.vertices.push( new THREE.Vector3(   300, bottom, i * step - 300 ) );

            geometry.vertices.push( new THREE.Vector3(i * step - 300, bottom, -300));
            geometry.vertices.push( new THREE.Vector3( i * step - 300, bottom,  300 ) );
        }
        grid = new THREE.LineSegments( geometry, lineMaterial, THREE.LinePieces );
        this.sceneT.add( grid );
        window.gridColor = 0x303030;
    };
    this.createAxis = function(){
        axis =new THREE.Group();
        this.labelAxis(50, 50, 300);
        this.drawAxisArrow(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 350, 0, 0 ), 0xFF0000);
        this.drawAxisArrow(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 350, 0 ), 0x00FF00);
        this.drawAxisArrow(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 350 ), 0x0000FF);
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

    this.onGesturechange = function(){
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
        var jsonL=[],jsonR=[],jsonr=[],textJson=[];
        if(polygon.shape == 1){
            topRadius=0;
            jsonR = [[0,0,0],[bottomRadius,0,0]];
            textJson.push([bottomRadius/2,-20,0]);
            jsonL = [[0,height,0],[bottomRadius,0,0]];
            textJson.push([(bottomRadius+topRadius)/2+10,height/2,0]);

            text = this.createText('l',textJson[1]);
            this.sceneT.add(text);
            radiusAbout.push(text);

        }else if(polygon.shape == 2){
            topRadius = 50;
            jsonR = [[0,0,0],[bottomRadius,0,0]];
            textJson.push([bottomRadius/2,-20,0]);
            jsonL = [[topRadius,height,0],[bottomRadius,0,0]];
            textJson.push([(bottomRadius+topRadius)/2+10,height/2,0]);
            jsonr = [[0,height,0],[topRadius,height,0]];
            textJson.push([topRadius/2,height+20,0]);

            text = this.createText('l',textJson[1]);
            this.sceneT.add(text);
            radiusAbout.push(text);
        }else{
            topRadius=80;
            jsonR = [[0,height,0],[bottomRadius,height,0]];
            jsonL = [[bottomRadius,height,0],[bottomRadius,0,0]];
            textJson.push([bottomRadius/2,height+20,0]);
            textJson.push([bottomRadius+20,height/2,0]);


            text = this.createText('h',textJson[1]);
            this.sceneT.add(text);
            radiusAbout.push(text);
        }

        //创建线条
        var vertices = this.getLineVertices(jsonL);
        var mesh = this.createLineMesh(vertices,'#666',1);
        this.sceneT.add(mesh);
        radiusAbout.push(mesh);

        var text = this.createText('r',textJson[0]);
        this.sceneT.add(text);
        radiusAbout.push(text);

        vertices=[];
        vertices = this.getLineVertices(jsonR);
        mesh = this.createLineMesh(vertices,'#666',1);
        this.sceneT.add(mesh);
        radiusAbout.push(mesh);



        if(polygon.shape == 2){
            vertices=[];
            vertices = this.getLineVertices(jsonr);
            mesh = this.createLineMesh(vertices,'#666',1);
            this.sceneT.add(mesh);
            radiusAbout.push(mesh);

            text = this.createText('r\'',textJson[2]);
            this.sceneT.add(text);
            radiusAbout.push(text);
        }



    };
    this.clearTextMesh = function(){
        if(radiusAbout.length>0){
            for(var i=0;i<radiusAbout.length;i++){
                this.sceneT.remove(radiusAbout[i]);
            }
            radiusAbout =[];
        }
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
    this.clearClinderMesh = function(){
        if(faceMesh!=undefined){
            this.sceneT.remove(faceMesh);
            faceMesh = null;
        }
    };

    this.createLine = function(){

        if(polygon.shape == 2){
            topRadius = 50;
        }else if(polygon.shape == 3){
            topRadius= bottomRadius;
        }else{
            topRadius=0;
        }
        var bottomJson = this.getJson(bottomRadius);
        var vertice = this.getLineVertices(bottomJson);
        var mesh = this.createLineMesh(vertice,'#F39800');
        this.sceneT.add(mesh);
        lines.push(mesh);

        if(polygon.shape == 1){ return;}
        var topJson = this.getJson(topRadius,height);
        vertice =[];
        vertice = this.getLineVertices(topJson);
        mesh = this.createLineMesh(vertice,'#F39800');
        this.sceneT.add(mesh);
        lines.push(mesh);

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
        this.clearClinderMesh();
        this.clearLine();
        this.clearTextMesh();
        this.createClinderMesh();
        this.createLine();
        this.createTextMesh();

    };
    this.createCircle = function(){

        var circle1G = new THREE.CircleGeometry(bottomRadius,40);
        var circle1M = new THREE.MeshBasicMaterial({color:'#F39800',side:THREE.DoubleSide});
        bottomCircle = new THREE.Mesh(circle1G,circle1M);
        bottomCircle.position.set(0,0,0);
        bottomCircle.rotation.x = -Math.PI/2 ;
        this.sceneT.add(bottomCircle);

        if(polygon.shape >1){
            var nowRadius = bottomRadius;
            if(polygon.shape == 2){  nowRadius = middleRadius;}
            var circle2G = new THREE.CircleGeometry(nowRadius,40);
            var circle2M = new THREE.MeshBasicMaterial({color:'#F39800',side:THREE.DoubleSide});
            topCircle = new THREE.Mesh(circle2G,circle2M);
            topCircle.position.set(0,height,0);
            topCircle.rotation.x = -Math.PI/2 ;
            this.sceneT.add(topCircle);
        }

    };
    this.scecondOpendBefore = function(){
        this.clearClinderMesh();
        this.clearTextMesh();
        this.clearLine();
    };
    this.changeOpend = function(){
        if(countTiming>=50){
            clearTimeout(timming);
            timming =0;
            this.scecondOpendBefore();
            this.secondOpend();
            return;
        }
        countTiming++;
        this.opendCircle();
        timming= setTimeout(function(){
            threeDimensional.changeOpend();
        },50);
    };
    this.opendCircle = function(){
        var radius = bottomRadius;
        var arc = countTiming*Math.PI/100,x,y,z;
        x =0;y=-Math.sin(arc)*radius;z=-radius + Math.cos(arc)*radius;
        if(bottomCircle){
            bottomCircle.rotation.x = -Math.PI/2 +arc;
            bottomCircle.position.set(x,y,z);
        }

        topRadius = 50;

        if(polygon.shape == 2){
            y=-Math.sin(arc)*topRadius;z=-topRadius + Math.cos(arc)*topRadius;
            if(topCircle!=null){
                topCircle.rotation.x = -Math.PI/2 -arc;
                topCircle.position.set(x,height-y,z);
            }
        }else if(polygon.shape == 3){
            if(topCircle!=null){
                topCircle.rotation.x = -Math.PI/2 -arc;
                topCircle.position.set(x,height-y,z);
            }
        }
    };
    this.secondOpend = function(){
        if(countTiming >=100){
            clearTimeout(timming);
            timming=0;
            countTiming =0;
            this.secondOpendAfter();
            $('.dynamic').removeClass('on');
            return;
        }
        countTiming++;
        threeDimensional.opendRect();
        timming = setTimeout(function(){
            threeDimensional.secondOpend();
        },50)
    };
    this.opendRect = function(){
        if(rect != undefined){
            this.sceneT.remove(rect);
            rect = null;
        }

        var r=bottomRadius,  rectJson=[],i,h=height,l = 2*Math.PI*r,step,nowStep;
        var shape = new THREE.Shape(),
            shapeM=new THREE.MeshBasicMaterial({color:'#F39800',side:THREE.DoubleSide}),shapeRect=null,R=316;

        if(polygon.shape == 1){
            R = Math.round(Math.sqrt(Math.pow(r,2)+Math.pow(h,2)));
            var allArc = 2*Math.PI*r/R;
            var inclination = Math.atan(r/h); //角度
            step = allArc/50;
            nowStep = (countTiming-50)*step;

            shapeRect = new THREE.CircleGeometry(R,100,0,nowStep);
            rect = new THREE.Mesh(shapeRect,shapeM);
            rect.position.x = 0;
            rect.position.y = h;
            rect.position.z = 0;

            rect.rotation.z = -Math.PI/2 - nowStep/2;
            rect.rotation.x = inclination;
            this.sceneT.add(rect);

        }else if(polygon.shape == 2){

            allArc = 2*Math.PI*bottomRadius/l2;
            step = allArc/50;
            nowStep = (countTiming-50)*step;
            var alpha1 =Math.atan(middleRadius/h1);

            var x1 = l2 * Math.sin(nowStep/2);
            var y1 = h2-l2 * Math.cos(nowStep/2);
            var x2 = l1 * Math.sin(nowStep/2);
            var y2 = h2-l1 * Math.cos(nowStep/2);

            pointTop.push([x2,y2]);
            pointBottom.push([x1,y1]);
            pointTop.unshift([-x2,y2]);
            pointBottom.unshift([-x1,y1]);

            for(i=0;i<pointTop.length;i++){
                if(i == 0){
                    shape.moveTo(pointTop[0][0],pointTop[0][1]);
                }else{
                    shape.lineTo(pointTop[i][0],pointTop[i][1]);
                }
            }
            for(i=pointBottom.length-1;i>=0;i--){
                shape.lineTo(pointBottom[i][0],pointBottom[i][1]);
            }
            shapeRect = new THREE.ShapeGeometry(shape);
            rect = THREE.SceneUtils.createMultiMaterialObject(shapeRect, [ shapeM]);
            rect.position.z = -bottomRadius;
            rect.position.y = l2-h2;
            rect.rotation.x = alpha1;
            this.sceneT.add(rect);

        }else{
            step = l/100;
            nowStep = (countTiming-50)*step;

            rectJson.push([nowStep,0,-r]);
            rectJson.push([nowStep,h,-r]);
            rectJson.push([-nowStep,h,-r]);
            rectJson.push([-nowStep,0,-r]);

            shape.moveTo(rectJson[0][0],rectJson[0][1]);
            for(i=1;i<4;i++){
                shape.lineTo(rectJson[i][0],rectJson[i][1]);
            }

            shapeRect = new THREE.ShapeGeometry(shape);

            rect = THREE.SceneUtils.createMultiMaterialObject(shapeRect, [ shapeM]);
            rect.position.z = -r;
            this.sceneT.add(rect);
        }
    };
    this.secondOpendAfter = function(){
        var json1=[],json2=[],textJson =[],text=null,vertices=null,mesh=null;
        if(polygon.shape == 2){
            json1.push([0,-bottomRadius,-bottomRadius],[bottomRadius,-bottomRadius,-bottomRadius]);
            json2.push([0,height+middleRadius,-middleRadius],[middleRadius,height+middleRadius,-middleRadius]);

            textJson.push([bottomRadius/2,-bottomRadius+10,-bottomRadius+10]);
            textJson.push([5,20,-bottomRadius+10]);
            textJson.push([0,height-10,-middleRadius+10]);
            textJson.push([middleRadius/2,height+middleRadius+10,-middleRadius+10]);
            textJson.push([Math.PI*bottomRadius-60,height-10,-middleRadius+10]);

            vertices = this.getLineVertices(json2);
            mesh = this.createLineMesh(vertices,'#666',1);
            this.sceneT.add(mesh);
            planeMesh.push(mesh);

            text = this.createText('2πr\'',textJson[2]);
            this.sceneT.add(text);
            planeMesh.push(text);

            text = this.createText('r\'',textJson[3]);
            this.sceneT.add(text);
            planeMesh.push(text);

            text = this.createText('l',textJson[4]);
            this.sceneT.add(text);
            planeMesh.push(text);


        }else if(polygon.shape == 3){

            json1.push([0,height+bottomRadius,-bottomRadius],[bottomRadius,height+bottomRadius,-bottomRadius]);

            textJson.push([bottomRadius/2,height+bottomRadius+10,-bottomRadius+10]);
            textJson.push([0,height-10,-bottomRadius+10]);
            textJson.push([-Math.PI*bottomRadius-10,height/2,-bottomRadius+10]);

            text = this.createText('h',textJson[2]);
            this.sceneT.add(text);
            planeMesh.push(text);


        }else{
            json1.push([0,-bottomRadius,-bottomRadius],[bottomRadius,-bottomRadius,-bottomRadius]);

            textJson.push([bottomRadius/2,-bottomRadius+10,-bottomRadius+10]);
            textJson.push([5,20,-bottomRadius+10]);
            textJson.push([-bottomRadius,height-10,0]);

            text = this.createText('l',textJson[2]);
            this.sceneT.add(text);
            planeMesh.push(text);

        }

        vertices = this.getLineVertices(json1);
        mesh = this.createLineMesh(vertices,'#666',1);
        this.sceneT.add(mesh);
        planeMesh.push(mesh);


        text = this.createText('r',textJson[0]);
        this.sceneT.add(text);
        planeMesh.push(text);

        text = this.createText('2πr',textJson[1]);
        this.sceneT.add(text);
        planeMesh.push(text);



    };
    this.clearPlaneObj = function(){
        if(planeMesh.length>0){
            for(var i=0;i<planeMesh.length;i++){
                this.sceneT.remove(planeMesh[i]);
            }
            planeMesh =[];
        }
        pointTop=[];
        pointBottom=[];

        pointTop.push([0,h2-l1,0]);
        pointBottom.push([0,h2-l2,0]);

        if(topCircle!=undefined){
            this.sceneT.remove(topCircle);
            topCircle=null;
        }

        if(bottomCircle!=undefined){
            this.sceneT.remove(bottomCircle);
            bottomCircle=null;
        }

        if(rect!=undefined){
            this.sceneT.remove(rect);
            rect=null;
        }


    }

}

ThreeDimensional.prototype = new ThreeAbout();

var threeDimensional = new ThreeDimensional();
threeDimensional.int();
renderAll();


//重置事件
function renderAll(){
    threeDimensional.controls.update();

    requestAnimationFrame(renderAll);
    threeDimensional.rendererT.render(threeDimensional.sceneT,threeDimensional.cameraT);
};
renderAll();




//on/off事件
function clickEve1(){

    if($(this).parent().parent().parent().hasClass('turnBox1')){

        if(countTiming){
            return;
        }

        var dataId = parseInt($(this).attr('data-id'));
        getParameter.shape = polygon.shape = dataId;
        $p.removeClass('red').eq(dataId-1).addClass('red');
        //threeDimensional.repaintMesh();
        threeDimensional.clearPlaneObj();
        threeDimensional.repaintMesh();
        $('.dynamic').removeClass('on');

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

$('#slider3').change(function(){
    var result = $(this).val();
    var value = parseInt(result.split('|')[0]),realV;

    getParameter.shape = polygon.shape = value;
    $p.removeClass('red').eq(value-1).addClass('red');
    threeDimensional.clearPlaneObj();
    threeDimensional.repaintMesh();
});




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


    clearTimeout(timming);


    polygon = { //多边形参数
        clear:5,
        shape:2,
        opend:false
    };
    getParameter ={ //显示和改变参数
        shape:2,
        clear:5,
        opend:false
    };


    $('.turn1').removeClass('on').addClass('off');
    $('.span2').text(''+'off');
    $('.turns').removeClass('off').addClass('on');
    $('.turns .span2').text(''+'on');

    threeDimensional.cameraT.position.x = 600;
    threeDimensional.cameraT.position.y = 600;
    threeDimensional.cameraT.position.z = 600;


    threeDimensional.clearPlaneObj();
    threeDimensional.repaintMesh();

    $p.removeClass('red').eq(1).addClass('red');
    countTiming=0;

    $('.dynamic').removeClass('on');

    $('.s3').find('.sliderLeft').css({'width':'205px'});
    $('.s3').find('.xdsoft_range2dslider_runner').css({'left':'205px'});
    $('.s3').find('.xdsoft_slider_label').text('圆台');
    $('#slider3').attr('value',''+2+'|0');
}
function dynamicEve(e){
    e.preventDefault();
    if($(this).hasClass('disabled')){
        return;
    }
    if(countTiming){
        return;
    }

    threeDimensional.clearPlaneObj();
    threeDimensional.repaintMesh();

    getParameter.opend = true;
    polygon.opend = getParameter.opend;
    threeDimensional.createCircle();
    threeDimensional.changeOpend();
    $('#open').addClass('disabled');
    $('#liquid-desc').addClass('on');
}



if(!isMob){
    $('#renew').on('click',renewEve);
    $('#scale').on('click',fullEve);
    $('#liquid-desc').on('click',dynamicEve);
    $('.turnRight').on('click',clickEve1);
}else{
    $('#renew').on('touchstart',renewEve);
    $('#scale').on('touchstart',fullEve);
    $('#liquid-desc').on('touchstart',dynamicEve);
    $('.turnRight').on('touchstart',clickEve1);
}




