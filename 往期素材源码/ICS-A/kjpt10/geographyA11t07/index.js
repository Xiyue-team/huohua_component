//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});
var height=window.innerHeight;
$('#main').height(height);
var L=$('#ion').width();
var positionT=[0,12,35,47,59];

for(var i=0;i<5;i++){
    var position = (positionT[i])/59;
    $('#ion .ion'+i).css('left',L*position-6+'px');
}
var h=height-240;
var w=$('.left').width()-100;
var wN,hN;
if(w/h>515/427){
    wN=h/427*515;
    $('.showPic').width(wN).height(h).css({'top':'90px','left':(w-wN)/2+50+'px'});
}else{
    hN=w/515*427;
    $('.showPic').width(w).height(hN).css({'top':(h-hN)/2+90+'px','left':'50px'});
}
window.onresize=function(){
	height=window.innerHeight;
	$('#main').height(height);
	L=$('#ion').width();
    for(var i=0;i<5;i++){
        var position = (positionT[i])/59;
        $('#ion .ion'+i).css('left',L*position-6+'px');
    }
    h=height-240;
    w=$('.left').width()-100;
    if(w/h>515/427){
        wN=h/427*515;
        $('.showPic').width(wN).height(h).css({'top':'90px','left':(w-wN)/2+50+'px'});
    }else{
        hN=w/515*427;
        $('.showPic').width(w).height(hN).css({'top':(h-hN)/2+90+'px','left':'50px'});
    }
};
var $image = $('.showPic img')[0],timg,oldValue,dir='len';

var isMob = /iPad|Android/g.test(navigator.userAgent);

$("#slider1").change(function(){
    if(timg){ clearTimeout(timg);}
    var result = $(this).val();
    result = parseInt(result.split('|')[0]);
    var lan_width = $('.sliderContainer').width()*result/60+'px';
    if(result >= 60){
        $('.ion4').css('background','#5caefd');
        $('.ion3').css('background','#5caefd');
        $('.ion2').css('background','#5caefd');
        $('.ion1').css('background','#5caefd');
    }else if(result < 60 && result >= 48){
        $('.ion4').css('background','#f0f0f0');
        $('.ion3').css('background','#5caefd');
    }else if(result < 48 && result >= 36){
        $('.ion4').css('background','#f0f0f0');
        $('.ion3').css('background','#f0f0f0');
        $('.ion2').css('background','#5caefd');
    }else if(result < 36 && result >= 13){
        $('.ion4').css('background','#f0f0f0');
        $('.ion3').css('background','#f0f0f0');
        $('.ion2').css('background','#f0f0f0');
        $('.ion1').css('background','#5caefd');
    }else {
       $('.ion4').css('background','#f0f0f0');
       $('.ion3').css('background','#f0f0f0');
       $('.ion2').css('background','#f0f0f0');
       $('.ion1').css('background','#f0f0f0');
   }
    $('.lan').css('width',lan_width);
    if(result<10){
        result = '0'+result;
    }
    removeCircle(parseInt(result));
    $image.src = './image/'+dir+'/'+result+'.png';
});

var renderer,camera,scene,width = 260,height=320;
var $rightTop = $('.right-top'),lineHpa,lineHpaOld,lineTmp,lineTmpOld,cicleHpa,circleTmp,arrHpa=[],arrTmp=[];
var textAlign = THREE_Text.textAlign, SpriteText2D = THREE_Text.SpriteText2D;

var objStyle = function(color, fontsize){
    return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
};
var createText = function(content, coordinate, color,size,offset){
    if (!color) {
        color = '#000';
    }
    if(!size){
        size = 23;
    }
    var fontsize = size+'px Cambria Math';

    var textStyle = objStyle(color, fontsize),
        text = new SpriteText2D(content, textStyle),x,y,z;

    if(!offset){
        text.position.set(coordinate[0], coordinate[1], coordinate[2]);
    }else{
        if(coordinate[0]>0){ x = coordinate[0]+30;}else{x = coordinate[0]-30; }
        if(coordinate[1]>0){ y = coordinate[1]+30;}else{y = coordinate[1]-30; }
        if(coordinate[2]>0){ z = coordinate[2]+30;}else{z = coordinate[2]-30; }
        text.position.set(x, y, z);
    }

    return text;
};
var createLine = function(vertices, color, style){
    var lineMesh = null, geometryLine = new THREE.Geometry();
    geometryLine.vertices = vertices;
    if (!color) {
        color = '#000';
    }
    if (!style) {
        lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color,linewidth:2}));
    } else {
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
var removeCircle = function(num){
    if(lineHpa){
        scene.remove(lineHpa);
    }
    if(lineTmp){
        scene.remove(lineTmp);
    }
    var arr=[],i,color1,color2;
    if(dir == 'len'){
        color1 = '#24adfb';
        color2 = '#fb8681';
    }else if(dir == 'nuan'){
        color1 = '#fb8681';
        color2 = '#24adfb';
    }
    if(num === 60){
        num = arrHpa.length-1;
    }else{
        num = Math.floor(arrHpa.length*((num-1)/60));
    }

    cicleHpa.position.x = arrHpa[num]['x'];
    cicleHpa.position.y = arrHpa[num]['y'];
    if(num){
        for(i=0;i<num;i++){
            arr.push(arrHpa[i]);
        }
        var curve = new THREE.CatmullRomCurve3(arr);
        var geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        var material = new THREE.LineBasicMaterial({color : color1,linewidth:3});
        lineHpa = new THREE.Line(geometry, material);
        scene.add(lineHpa);
    }

    circleTmp.position.x = arrTmp[num]['x'];
    circleTmp.position.y = arrTmp[num]['y'];

    if(num){
        arr = [];
        for(i=0;i<num;i++){
            arr.push(arrTmp[i]);
        }
        curve = new THREE.CatmullRomCurve3(arr);
        geometry = new THREE.Geometry();
        geometry.vertices = curve.getPoints(100);
        material = new THREE.LineBasicMaterial({color : color2,linewidth:3});
        lineTmp = new THREE.Line(geometry, material);
        scene.add(lineTmp);
    }
};
function init() {
    container = document.getElementById('main');
    camera = new THREE.PerspectiveCamera( 45, width / height, 1, 2000 );
    camera.position.z = 1000;
    // scene
    scene = new THREE.Scene();
    //判断是否支持webGL
    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })(),m,g;
    renderer = new THREE.CanvasRenderer({antialias:true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );
    renderer.setClearColor(0xffffff);
    $rightTop[0].appendChild( renderer.domElement );

	var vertices = [],line,text,shape,material;
    vertices.push(new THREE.Vector3(-250,-300,0));
    vertices.push(new THREE.Vector3(250,-300,0));
	line = createLine(vertices,'#000');
	scene.add(line);

	vertices = [];
    vertices.push(new THREE.Vector3(-250,-300,0));
    vertices.push(new THREE.Vector3(-250,300,0));
    line = createLine(vertices,'#24adfb');
    scene.add(line);

    shape = new THREE.Shape();
    shape.moveTo(-250,300,0);
    shape.lineTo(-250-15,300-20);
    shape.lineTo(-250+15,300-20);

    material = new THREE.MeshBasicMaterial({color:'#24adfb'});
    line = new THREE.Mesh(new THREE.ShapeGeometry(shape),material);
    scene.add(line);

    vertices = [];
    vertices.push(new THREE.Vector3(250,-300,0));
    vertices.push(new THREE.Vector3(250,300,0));
    line = createLine(vertices,'#fb8681');
    scene.add(line);


    shape = new THREE.Shape();
    shape.moveTo(250,300,0);
    shape.lineTo(250-15,300-20);
    shape.lineTo(250+15,300-20);

    material = new THREE.MeshBasicMaterial({color:'#fb8681'});
    line = new THREE.Mesh(new THREE.ShapeGeometry(shape),material);
    scene.add(line);

    text = createText('气压(hpa)',[-250,360,0],'#000',35);
    scene.add(text);

    text = createText('气温(°C)',[250,360,0],'#000',35);
    scene.add(text);

    text = createText('t',[250+40,-300+20,0],'#000',35);
    scene.add(text);

    text = createText('t1',[-87,-300-5,0],'#000',35);
    scene.add(text);

    text = createText('t2',[20,-300-5,0],'#000',35);
    scene.add(text);

    text = createText('t3',[80,-300-5,0],'#000',35);
    scene.add(text);
    //0.5π-1.5π
    var  x,y;
    arrHpa = [];
    for(x = 0.5*Math.PI+0.01;x<1.5*Math.PI;x+=0.01){
        y = Math.tan(x);
        if((y*100 <= 255)&&(y*100 >= -255)){
            arrHpa.push(new THREE.Vector3(y*100,x*50-200,0));
        }
    }
    var curve = new THREE.CatmullRomCurve3(arrHpa);
    var geometry = new THREE.Geometry();
    geometry.vertices = curve.getPoints(100);
    material = new THREE.LineDashedMaterial({color : '#24adfb',linewidth:1,dashSize: 2,gapSize: 2});
    lineHpaOld = new THREE.Line(geometry, material);
    m = new THREE.CircleGeometry(12,10);
    g = new THREE.MeshBasicMaterial({color:'#24adfb'});
    cicleHpa = new THREE.Mesh(m,g);
    cicleHpa.position.x = arrHpa[0]['x'];
    cicleHpa.position.y = arrHpa[0]['y'];
    scene.add(cicleHpa);
    arrTmp=[];
    for(i=0;i<arrHpa.length;i++){
        var arr =new THREE.Vector3(-arrHpa[i]['x'],arrHpa[i]['y'],0);
        arrTmp.unshift(arr);
    }
    vertices.reverse();
    curve = new THREE.CatmullRomCurve3(arrTmp);
    geometry = new THREE.Geometry();
    geometry.vertices = curve.getPoints(100);
    material = new THREE.LineDashedMaterial({color : '#fb8681',linewidth:1,dashSize: 2,gapSize: 2});
    lineTmpOld = new THREE.Line(geometry, material);
    // scene.add(lineTmpOld);

    m = new THREE.CircleGeometry(12,10);
    g = new THREE.MeshBasicMaterial({color:'#fb8681'});
    circleTmp = new THREE.Mesh(m,g);
    circleTmp.position.x = arrTmp[0]['x'];
    circleTmp.position.y = arrTmp[0]['y'];
    scene.add(circleTmp);

}
function animate() {
    requestAnimationFrame( animate );
    render();
}
function render() {
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}

init();
animate();

function reset(){
    dir = 'len';
    $('.right-bottom span').removeClass('active');
    $('.right-bottom span.l').addClass('active');
    if(timg){
        clearTimeout(timg);
    }
    $('.slider1').find('.sliderLeft').css({'width':'0px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
    $('.slider1').find('.xdsoft_slider_label').text('0');
    $('.slider1').attr('value',''+0+'|0');
    $('.lan').css('width','0');
    $('.ion4').css('background','#f0f0f0');
    $('.ion3').css('background','#f0f0f0');
    $('.ion2').css('background','#f0f0f0');
    $('.ion1').css('background','#f0f0f0');
    oldValue = 0;
    $image.src = './image/'+dir+'/01.png';
    removeCircle(1);

    var m1 = new THREE.LineDashedMaterial({color : '#fb8681',linewidth:1,dashSize: 2,gapSize: 2});
    var m2 = new THREE.LineDashedMaterial({color : '#24adfb',linewidth:1,dashSize: 2,gapSize: 2});
    var mm1 = new THREE.MeshBasicMaterial({color:'#fb8681'});
    var mm2 =  new THREE.MeshBasicMaterial({color:'#24adfb'});
    if(dir == 'len'){
        lineTmpOld.material = m1;
        lineHpaOld.material = m2;
        circleTmp.material = mm1;
        cicleHpa.material = mm2;
    }else if(dir == 'nuan'){
        lineTmpOld.material = m2;
        lineHpaOld.material = m1;
        circleTmp.material = mm2;
        cicleHpa.material = mm1;
    }
}
function changeDir(){
    if($(this).hasClass('l')){
        dir = 'len';
        if($(this).hasClass('active')){
           return;
        }
    }else if($(this).hasClass('n')){
        dir = 'nuan';
        if($(this).hasClass('active')){
            return;
        }
    }
    $('.right-bottom span').removeClass('active');
    $(this).addClass('active');

    if(timg){
        clearTimeout(timg);
    }
    
    $('.slider1').find('.sliderLeft').css({'width':'0px'});
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
    $('.slider1').find('.xdsoft_slider_label').text('0');
    $('.slider1').attr('value',''+0+'|0');
    $('.lan').css('width','0');
    $('.ion4').css('background','#f0f0f0');
    $('.ion3').css('background','#f0f0f0');
    $('.ion2').css('background','#f0f0f0');
    $('.ion1').css('background','#f0f0f0');
    oldValue = 0;
    $image.src = './image/'+dir+'/01.png';
    var m1 = new THREE.LineDashedMaterial({color : '#fb8681',linewidth:1,dashSize: 2,gapSize: 2});
    var m2 = new THREE.LineDashedMaterial({color : '#24adfb',linewidth:1,dashSize: 2,gapSize: 2});
    var mm1 = new THREE.MeshBasicMaterial({color:'#fb8681'});
    var mm2 =  new THREE.MeshBasicMaterial({color:'#24adfb'});
    if(dir == 'len'){
        lineTmpOld.material = m1;
        lineHpaOld.material = m2;
        circleTmp.material = mm1;
        cicleHpa.material = mm2;
    }else if(dir == 'nuan'){
        lineTmpOld.material = m2;
        lineHpaOld.material = m1;
        circleTmp.material = mm2;
        cicleHpa.material = mm1;
    }
    removeCircle(1);
}
if(isMob){
    $('#reset img').on('touchstart',reset);
    $('.right-bottom span').on('touchstart',changeDir);
}else{
    $('#reset img').on('click',reset);
    $('.right-bottom span').on('click',changeDir);
}

