/**
 * Created by O2 on 2016/9/6.
 */
var scaling = 1;
var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
if(!(bodyWidth == 370 && bodyHeight == 246)) {
    var isMob = /iPad|Android/g.test(navigator.userAgent), offsetLeft = 0, offsetTop = 0;
    var $body = $("body");
    // if (isMob) {
        var bodyScale = scaling = bodyWidth / 1920;
        $('.body').css("zoom", bodyScale).height(1200);
        var marginTop = ($body.width() / bodyWidth * bodyHeight - 1200) / 2;
        $('.body').css("margin-top", '-600px');
        $('#threeContainer').css({
            'right': 686 * scaling,
            left: 33 * scaling,
            top: (69 * scaling + (bodyHeight - 1200 * scaling) / 2 ),
            bottom: (69 * scaling + (bodyHeight - 1200 * scaling) / 2 )
        });
    // } else {
    //     scaling = 0.6667;
    //     $(".body").css({"zoom": 0.6667, "margin-top": '0', "top": '0'});
    //     $('#threeContainer').css({'right': 686 * scaling, left: 33 * scaling, top: (69 * scaling ), bottom: (69 * scaling)});
    // }

    offsetLeft = parseInt($('#threeContainer').offset().left);
    offsetTop = parseInt($('#threeContainer').offset().top);
    $('body').css('background','#000');
    $('#threeContainer').css({'border-radius':10*scaling,'box-shadow': 6*scaling + 'px '+6*scaling +'px '+ 20*scaling +'px rgba(0,0,0,0.30)' });

    $('.zoom').css("zoom",scaling);
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


$(".xdsoft_legend").css("bottom","-10px").eq(1).text("2π");
var fullScreen=0,$threeCon = $('#threeContainer'),$obj = $('#threeContainer'),threeWidth = $obj.width(),threeHeight = $obj.height();


// 居中
var controlHeight = $("#controlContainer").height();
var conHeight = $(".con").height();
var h2Height = $("#controlContainer h2").height();
var h2MarginTop = parseInt($("#controlContainer h2").css("margin-top"));
var marginTop = (controlHeight - h2Height - h2MarginTop - conHeight)/2;
$(".slider").css("margin-top",marginTop);



/**
 *
 * @type {THREE.Raycaster}
 */
//选中操作相关变量
var raycaster = new THREE.Raycaster(),
    plane = new THREE.Plane(),
    offset = new THREE.Vector3(),
    intersection = new THREE.Vector3(),
    mouse = new THREE.Vector2(),
    INTERSECTED = null;
document.onselectstart=function(){return false;};

//初始参数
var radioSelect = 1;
var radius = 200;
var axis = new THREE.Group();
var axisArrow = new THREE.Group();
var value = 0;
var line31 = null,line32 = null,line33 = null;

function ThreeDimensional() {
    //文字相关变量
    var textAlign = THREE_Text.textAlign,
        SpriteText2D = THREE_Text.SpriteText2D;
    //位置相关
    var $obj = $('#threeContainer'),
        threeHeight = $obj.height(),
        threeWidth = $obj.width();




    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, threeWidth / threeHeight, 1, 10000);
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
        this.camera.position.z = 1500;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);

        this.createControls();
        this.createAxis();
        this.createCir();
        this.formula();

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

    this.createAxis = function(){
        this.labelAxis(0, 100, 400, -200, 200, 200);
        drawAxisArrow(vec3( -600, 0, 0 ), vec3( 600, 0, 0 ), 0x000000,1);
        drawAxisArrow(vec3( 0, -380, 0 ), vec3( 0, 380, 0 ), 0x000000,2);
        this.scene.add( axis,axisArrow);
    };
    this.createCir = function(){
        var vertices = [],x=0,y=0;
        for(var i=0;i<73;i++){
            x = Math.floor(Math.cos(Math.PI/180*i*5)*radius);
            y = Math.floor(Math.sin(Math.PI/180*i*5)*radius);
            vertices.push(vec3(x,y,0));
        }
        this.cir = createLineMesh(vertices,0x1161c8,3);
        this.cir.position.set(-(radius+100),0,0);

        var vertices1 = [];
        vertices1.push(vec3(-300,380,0),vec3(-300,-380,0));
        this.line1 = createLineMesh(vertices1,0x000000,3);

        this.scene.add(this.cir,this.line1);
    };
    this.formula = function(){
        var a = text("tanα",44,"#000000");
        var b = text("=",44,"#000000");
        var c = text("y",44,"#000000");
        var d = text("—",44,"#000000");
        var e = text("x",44,"#000000");
        var f = text("=",44,"#000000");
        var g = text("AT",44,"#000000");
        a.position.set(-66,22,0);
        b.position.set(0,22,0);
        c.position.set(52,52,0);
        d.position.set(52,22,0);
        e.position.set(52,-2,0);
        f.position.set(104,22,0);
        g.position.set(156,22,0);

        var group = new THREE.Object3D();
        group.add(a,b,c,d,e,f,g);
        group.position.set(this.cir.position.x,-400,0);
        this.scene.add(group);
    };
    this.dynamicalLine = function(value){
        this.scene.remove(this.lineGroup);
        this.lineGroup = new THREE.Object3D();
        var vertices1 = [];
        var vertices2 = [];
        var vertices31 = [];
        var vertices32 = [];
        var vertices33 = [];
        var vertices4 = [];
        var vertices5 = [];
        var vertices6 = [];
        var vertices7 = [];
        var vertices8 = [];
        var vertices9 = [];
        var vertices10 = [];
        vertices7.push(vec3(-(radius+100),0,0));
        vertices8.push(vec3(100,1000,0),vec3(100,-1000,0));
        vertices9.push(vec3(300,1000,0),vec3(300,-1000,0));
        var x = 0;var y = 0;var x1 = 0;var y1 = 0;

        var angle = value*18;
        var linex = -(radius+100-Math.cos(Math.PI/180*angle)*radius);
        var liney = Math.sin(Math.PI/180*angle)*radius;

        // |
        vertices5.push(vec3(linex,liney,0),vec3(linex,0,0));
        var line5 = createLineMesh(vertices5,0x000000,3);

        //角
        vertices6.push(vec3(20,0,0));
        for(var i=1;i<angle/9+1;i++){
            /*x = 10*i;
             y = Math.tan(Math.PI/180*9*i)*radius;
             vertices3.push(vec3(x,y,0));*/

            x1 = Math.cos(Math.PI/180*9*i)*20;
            y1 = Math.sin(Math.PI/180*9*i)*20;
            vertices6.push(vec3(x1,y1,0));
        }
        var line6 = createLineMesh(vertices6,0x1161c8,3);
        line6.position.set(-radius-100,0,0);

        var line7 = createLineMesh(vertices7,0x1161c8,3);


        //正切图
        var linex1 = 0,liney1 = 0;

        vertices31.push(vec3(0,0,0));
        if(angle < 90){
            for(var i=1;i<angle/9+1;i++){
                x = 10*i;
                y = Math.tan(Math.PI/180*9*i)*radius;
                vertices31.push(vec3(x,y,0));
            }
            line31 = createLineMesh(vertices31,0x000000,3);

            linex1 = vertices31[vertices31.length-1].x;
            liney1 = vertices31[vertices31.length-1].y;

            this.lineGroup.add(line31);

        }else if(angle>90 && angle<270){
            for(var i=1;i<10;i++){
                x = 10*i;
                y = Math.tan(Math.PI/180*9*i)*radius;
                vertices31.push(vec3(x,y,0));
            }
            line31 = createLineMesh(vertices31,0x000000,3);
            this.lineGroup.add(line31);

            for(i=11;i<angle/9+1;i++){
                x = 10*i;
                y = Math.tan(Math.PI/180*9*i)*radius;
                vertices32.push(vec3(x,y,0));
            }
            line32 = createLineMesh(vertices32,0x000000,3);

            linex1 = vertices32[vertices32.length-1].x;
            liney1 = vertices32[vertices32.length-1].y;

            var lineDash1 = createLineMesh(vertices8,0x000000,2);

            this.lineGroup.add(line31,line32,lineDash1);

        }else if(angle>270){
            for(var i=1;i<10;i++){
                x = 10*i;
                y = Math.tan(Math.PI/180*9*i)*radius;
                vertices31.push(vec3(x,y,0));
            }
            line31 = createLineMesh(vertices31,0x000000,3);
            this.lineGroup.add(line31);

            for(i=vertices31.length+2;i<30;i++){
                x = 10*i;
                y = Math.tan(Math.PI/180*9*i)*radius;
                vertices32.push(vec3(x,y,0));
            }
            line32 = createLineMesh(vertices32,0x000000,3);
            this.lineGroup.add(line31,line32);

            for(i=31;i<angle/9+1;i++){
                x = 10*i;
                y = Math.tan(Math.PI/180*9*i)*radius;
                vertices33.push(vec3(x,y,0));
            }
            line33 = createLineMesh(vertices33,0x000000,3);

            linex1 = vertices33[vertices33.length-1].x;
            liney1 = vertices33[vertices33.length-1].y;

            var lineDash1 = createLineMesh(vertices8,0x000000,2);
            var lineDash2 = createLineMesh(vertices9,0x000000,2);

            this.lineGroup.add(line31,line32,line33,lineDash1,lineDash2);

        }else if(angle == 90){
            for(var i=1;i<angle/9;i++){
                x = 10*i;
                y = Math.tan(Math.PI/180*9*i)*radius;
                vertices31.push(vec3(x,y,0));
            }
            line31 = createLineMesh(vertices31,0x000000,3);

            linex1 = vertices31[vertices31.length-1].x;
            liney1 = vertices31[vertices31.length-1].y;

            var lineDash1 = createLineMesh(vertices8,0x000000,2);

            this.lineGroup.add(line31,lineDash1);
        }else{
            for(var i=1;i<10;i++){
                x = 10*i;
                y = Math.tan(Math.PI/180*9*i)*radius;
                vertices31.push(vec3(x,y,0));
            }
            line31 = createLineMesh(vertices31,0x000000,3);
            this.lineGroup.add(line31);

            for(i=11;i<angle/9;i++){
                x = 10*i;
                y = Math.tan(Math.PI/180*9*i)*radius;
                vertices32.push(vec3(x,y,0));
            }
            line32 = createLineMesh(vertices32,0x000000,3);

            linex1 = vertices32[vertices32.length-1].x;
            liney1 = vertices32[vertices32.length-1].y;

            var lineDash1 = createLineMesh(vertices8,0x000000,2);
            var lineDash2 = createLineMesh(vertices9,0x000000,2);

            this.lineGroup.add(line31,line32,lineDash1,lineDash2);
        }

        // :|
        vertices4.push(vec3(linex1,liney1,0),vec3(linex1,0,0));
        var line4 = createLineMesh(vertices4,0xd43f3f,3);

        // 2:||  7://  10:虚线
        var liney2 = radius*Math.tan(Math.PI/180*angle);
        //vertices10.push(vec3(linex,liney,0),vec3(linex1,liney1));
        //var line10 = createLineMesh(vertices10,0x000000,3);
        if(angle>90 && angle<270){
            liney2 = -liney2;
            vertices2.push(vec3(-(2*radius+100),0,0));
            vertices2.push(vec3(-(2*radius+100),liney2,0));
            vertices10.push(vec3(-(2*radius+100),liney2,0));
            vertices7.push(vec3(-(2*radius+100),liney2,0));
        }else if(angle == 270){
            liney2 = -liney2;
            vertices2.push(vec3(-100,0,0));
            vertices2.push(vec3(-100,liney2,0));
            vertices10.push(vec3(-100,liney2,0));
            vertices7.push(vec3(-100,liney2,0));
        }else{
            vertices2.push(vec3(-100,0,0));
            vertices2.push(vec3(-100,liney2,0));
            vertices10.push(vec3(-100,liney2,0));
            vertices7.push(vec3(-100,liney2,0));
        }
        var line2 = createLineMesh(vertices2,0xcc0000,3);
        vertices10.push(vec3(linex1,liney1,0));
        var line10 = createLineMesh(vertices10,0x000000,2);

        // /
        vertices1.push(vec3(-(radius+100),0,0));
        vertices1.push(vec3(linex,liney,0));
        var line1 = createLineMesh(vertices1,0x1161c8,3);

        var r = text("r",33,"#000000");
        r.position.set(-(-linex+350)/2+20,liney/2+30,0);
        var af = text("α",33,"#000000");
        af.position.set(-radius-60,30,0);

        var xt = text("x",33,"#000000");
        xt.position.set((linex-350)/2+18,0,0);
        var yt = text("y",33,"#000000");
        yt.position.set(linex+20,liney/2+12,0);

        var t = text("T",33,"#000");
        t.position.set(vertices2[1].x,vertices2[1].y+40,vertices2[1].z);
        var at = text("A",33,"#000");
        at.position.set(vertices2[0].x,vertices2[0].y,vertices2[0].z);

        this.lineGroup.add(line1,line2,line4,line5,line6,line7,r,af,xt,yt,t,at);
        this.scene.add(this.lineGroup);
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
                opacity: 1,
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
        var line = createLineMesh(vertices,'#000',3);
        axisArrow.add(line);

        if(style == 1){
            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(dir.x-20,-5,0));
            vertices.push(new THREE.Vector3(dir.x,0,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);
        }else{

            vertices = [];
            vertices.push(new THREE.Vector3(5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

            vertices = [];
            vertices.push(new THREE.Vector3(-5,dir.y-20,0));
            vertices.push(new THREE.Vector3(0,dir.y,0));
            line = createLineMesh(vertices,'#000',3);
            axisArrow.add(line);

        }

    }
    this.labelAxis = function(startx, stepSizex, stopx, starty, stepSizey, stopy) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var text={};
        // label x axis:
        var textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for(var i = startx; i <= stopx; i = i+stepSizex) {
            var a = (i/stepSizex/2).toFixed(1);
            if(a == 1.0){
                a = "π";
            }else if(a == 0.0){
                a = 0;
            }else{
                a = a+"π"
            }
            text = new SpriteText2D(a, textStyle);
            if(i == 0){
                text.position.x = i - 20;
            }else{
                text.position.x = i;
            }
            text.position.y = -10;
            axis.add(text);

            var vertices = [];
            vertices.push(new THREE.Vector3(i,0,0));
            vertices.push(new THREE.Vector3(i,10,0));
            var line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        // text = new SpriteText2D('x', textStyle);
        // text.position.x = stop+100;
        // text.position.y = -15;
        // axis.add(text);

        // label y axis:
        textStyle = {align: textAlign.center, font: '26px Cambria Math', fillStyle: '#000000', antialias: true};
        for( i = starty; i <= stopy; i = i+stepSizey) {
            if(i == 0){ continue;}
            text = new SpriteText2D(i/stepSizey, textStyle);
            text.position.x = -20;
            text.position.y = i;
            text.position.z = 0.2;
            axis.add(text);

            vertices = [];
            vertices.push(new THREE.Vector3(0,i,0));
            vertices.push(new THREE.Vector3(-10,i,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
        // text = new SpriteText2D('y', textStyle);
        // text.position.x = -15;
        // text.position.y = stop+100;
        // text.position.z = 0.2;
        // axis.add(text);
    };
    this.labelAxis1 = function(startx, stepSizex, stopx, starty, stepSizey, stopy) {
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var text={};
        // label x axis:
        var textStyle = {align: textAlign.center, font: '26px "Cambria Math"', fillStyle: '#000000', antialias: true};
        for(var i = startx; i <= stopx; i = i+stepSizex) {
            var a = (i/stepSizex*90).toFixed(0);
            if(a == 0.0){
                a = 0 + "°";
            }else{
                a = a + "°";
            }
            text = new SpriteText2D(a, textStyle);

            if(i == 0){
                text.position.x = i - 20;
            }else{
                text.position.x = i;
            }

            text.position.y = -10;
            axis.add(text);

            var vertices = [];
            vertices.push(new THREE.Vector3(i,0,0));
            vertices.push(new THREE.Vector3(i,10,0));
            var line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }

        // label y axis:
        textStyle = {align: textAlign.center, font: '26px Cambria Math', fillStyle: '#000000', antialias: true};
        for( i = starty; i <= stopy; i = i+stepSizey) {
            if(i == 0){ continue;}
            text = new SpriteText2D(i/stepSizey, textStyle);
            text.position.x = -20;
            text.position.y = i;
            text.position.z = 0.2;
            axis.add(text);

            vertices = [];
            vertices.push(new THREE.Vector3(0,i,0));
            vertices.push(new THREE.Vector3(-10,i,0));
            line = createLineMesh(vertices,'#000',3);
            axis.add(line);
        }
    };
    function vec3(x,y,z){
        return new THREE.Vector3(x, y, z);
    }
    function text(font,size,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(font, textStyle);
        return text;
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



function radioChoose(){

    $('.radios').find('.radiocircle').removeClass('select');
    $(this).find('.radiocircle').addClass('select');
    radioSelect = parseInt($(this).attr('data-id'));
    $('.slider1').css('visibility','visible');
    $('.xdsoft_slider_label').css('display','block');

    returnRange();

    if(radioSelect == 1){
        $(".xdsoft_legend").eq(0).text("0").end().eq(1).text("2π");

        $('#slider1').range2DSlider({
            template:'horizontal',
            value:[[value,0]],
            round:true,
            axis:[[0,20]],
            printLabel:function( val ){
                var a = (val[0]/10).toFixed(1);
                if(a == 0.0){
                    return 0;
                }else if(a == 1.0){
                    return 1 + "π";
                }else{
                    return a + "π";
                }
            }
        });

        threeDimensional.scene.remove(axis);
        axis = new THREE.Object3D();
        threeDimensional.labelAxis(0,100,400,-200,200,200);
        threeDimensional.scene.add(axis);console.log(axis.children.length)

    }else{
        $(".xdsoft_legend").eq(0).text("0°").end().eq(1).text("360°");

        $('#slider1').range2DSlider({
            template:'horizontal',
            value:[[value,0]],
            round:true,
            axis:[[0,20]],
            printLabel:function( val ){
                return val[0]*18+"°";
            }
        });

        threeDimensional.scene.remove(axis);
        axis = new THREE.Object3D();
        threeDimensional.labelAxis1(0,100,400,-200,200,200);
        threeDimensional.scene.add(axis);
    }

}

function returnRange(){
    $('#slider1').attr('value','0|0');
    $('.sliderLeft').css('width','0px');
    $('.xdsoft_range2dslider_runner ').css('left','0px');

}


//滑动条
$("#slider1").change(function(){
    var para = parseInt($(this).val());
    value = para;
    threeDimensional.dynamicalLine(para);
});

//dynamic
var dynam = null;
function dynamic(){
    clearInterval(dynam);
    var para = 0;
    var perLength = 383/20;
    dynam = setInterval(dynamical,150);
    function dynamical(){
        if(para > 20){
            clearInterval(dynam);
            return false;
        }
        $(".sliderLeft").css("width",perLength*para);
        $(".xdsoft_range2dslider_runner").css("left",perLength*para);
        if(radioSelect == 1){
            var a = (para/10).toFixed(1);
            if(a == 0.0){
                a = 0;
            }else if(a == 1.0){
                a = 1 + "π";
            }else{
                a = a + "π";
            }
        }else{
            a = para*18+"°";
        }
        $(".xdsoft_slider_label").text(a);

        threeDimensional.dynamicalLine(para);
        value = para++;
    }
}

function renew(){
    if(dynam){
        clearInterval(dynam);
    }
    radioSelect = 1;
    value = 0;
    threeDimensional.scene.remove(axis);
    if(radioSelect == 1){
        $(".xdsoft_legend").eq(0).text("0").end().eq(1).text("2π");

        $('#slider1').range2DSlider({
            template:'horizontal',
            value:[[0,0]],
            round:true,
            axis:[[0,20]],
            printLabel:function( val ){
                var a = (val[0]/10).toFixed(1);
                if(a == 0.0){
                    return 0;
                }else if(a == 1.0){
                    return 1 + "π";
                }else{
                    return a + "π";
                }
            }
        });
        axis = new THREE.Object3D();
        threeDimensional.labelAxis(0,100,400,-200,200,200);
        threeDimensional.scene.add(axis);console.log(axis.children.length)
    }
    threeDimensional.scene.remove(threeDimensional.lineGroup);
    returnRange();
    $(".xdsoft_slider_label").text("0");
    if(!$(".radios1 .radiocircle").hasClass("select")){
        $(".radios1").find(".radiocircle").addClass("select").end().siblings().find(".radiocircle").removeClass("select");
    }
}

function scalef(){
    if(fullScreen){
        fullScreen = 0;
        $('#scale img').attr('src','images/icon/all.png');
        if(isMob){
            $threeCon.css({'right':686*scaling,left:33*scaling,top:(69*scaling + (bodyHeight-1200*scaling)/2 ),bottom:(69*scaling + (bodyHeight-1200*scaling)/2 )});
        }else{
            $threeCon.css({'right':686*scaling,left:33*scaling,top:(69*scaling ),bottom:(69*scaling)});
        }
        $('canvas').css({'position':'absolute','left':0,'top':0});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','visible');
        $('#threeContainer').css({'border-radius':10*scaling,'box-shadow': 6*scaling + 'px '+6*scaling +'px '+ 20*scaling +'px rgba(0,0,0,0.30)' });
    }else{
        fullScreen = 1;
        $('#scale img').attr('src','images/icon/back.png');
        $obj.css({'left':0,'top':0,'right':0,'bottom':0,'border-radius':'0'});
        $('canvas').css({'position':'absolute','left':(bodyWidth-threeWidth)/2,'top':(bodyHeight-threeHeight)/2});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','hidden');
    }
}

if(isMob){
    //弧度角度转换
    $('.radioChoose .radios').on('touchstart',radioChoose);
    //dynamic
    $(".dynamic").on('touchstart',dynamic);
    //重置
    $("#renew").on('touchstart',renew);

    /*全屏事件*/
    $('#scale').on('touchstart',scalef);
}else{
    //弧度角度转换
    $('.radioChoose .radios').on('click',radioChoose);
    //dynamic
    $(".dynamic").on('click',dynamic);
    //重置
    $("#renew").on('click',renew);

    /*全屏事件*/
    $('#scale').on('click',scalef);
}