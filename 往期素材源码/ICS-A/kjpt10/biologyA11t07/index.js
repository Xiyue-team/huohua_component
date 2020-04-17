//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});
var width=window.innerWidth;
var height=window.innerHeight;
$('#main').height((height-70)*0.92);
$('#step').height(height-70);
if(height-70>width/10*6.2){
	$('#img').width(width/10*6.2).height(width/10*6.2);
}else{
	$('#img').width((height-70)).height((height-70));
}
if(height-70>width/10*3.8){
	$('#text>div').width(width/10*3.8*0.7).height(width/10*3.8*0.7/43*50);
}else{
	$('#text>div').width((height-70)*0.7).height((height-70)*0.7/43*50);
}
$('#img span').width($('#img').width()*0.05).height($('#img').width()*0.05);
window.onresize=function(){
	width=window.innerWidth;
	height=window.innerHeight;
	$('#main').height((height-70)*0.92);
	$('#step').height(height-70);
	if(width<580){
		width=580;
	}
	if(height-70>width/10*6.2){
		$('#img').width(width/10*6.2).height(width/10*6.2);
	}else{
		$('#img').width((height-70)).height((height-70));
	}
	if(height-70>width/10*3.8){
		$('#text>div').width(width/10*3.8*0.7).height(width/10*3.8*0.7/43*50);
	}else{
		$('#text>div').width((height-70)*0.7).height((height-70)*0.7/43*50);
	}
	$('#img span').width($('#img').width()*0.05).height($('#img').width()*0.05);
}

var isMob = /iPad|Android/g.test(navigator.userAgent);
var text={
	'0':{
		'0':'镜筒',
		'1':'-显微镜的机械部分-',
		'2':'安放和转换物镜镜头。',
		'3':''
	},
	'1':{
		'0':'转换器',
		'1':'-显微镜的机械部分-',
		'2':'安放镜头，把目镜和物镜聚合起来。',
		'3':''
	},
	'2':{
		'0':'物镜',
		'1':'-显微镜的光学部分-',
		'2':'放大物像。',
		'3':'镜头上标有放大倍数，有低倍物镜和高倍物镜。'
	},
	'3':{
		'0':'载物台',
		'1':'-显微镜的机械部分-',
		'2':'安放玻片标本。',
		'3':''
	},
	'4':{
		'0':'通光孔',
		'1':'-显微镜的机械部分-',
		'2':'使光线通过。',
		'3':''
	},
	'5':{
		'0':'遮光器',
		'1':'-显微镜的机械部分-',
		'2':'调节通光量。',
		'3':''
	},
	'6':{
		'0':'反光镜',
		'1':'-显微镜的照明部分-',
		'2':'反射光线有平面镜、凹面镜两种。',
		'3':''
	},
	'7':{
		'0':'目镜',
		'1':'-显微镜的光学部分-',
		'2':'放大物像。',
		'3':'镜头上标有放大倍数。'
	},
	'8':{
		'0':'粗准焦螺旋',
		'1':'-显微镜的机械部分-',
		'2':'升降镜筒升降幅度较大。',
		'3':'逆时针旋转上升镜筒；顺时针旋转下降镜筒。'
	},
	'9':{
		'0':'细准焦螺旋',
		'1':'-显微镜的机械部分-',
		'2':'升降镜筒升降幅度较小。',
		'3':'逆时针旋转上升镜筒；顺时针旋转下降镜筒。'
	},
	'10':{
		'0':'镜臂',
		'1':'-显微镜的机械部分-',
		'2':'握镜作用。',
		'3':''
	},
	'11':{
		'0':'压片夹',
		'1':'-显微镜的机械部分-',
		'2':'固定玻片标本。',
		'3':''
	},
	'12':{
		'0':'镜柱',
		'1':'-显微镜的机械部分-',
		'2':'支持作用。',
		'3':''
	},
	'13':{
		'0':'镜座',
		'1':'-显微镜的机械部分-',
		'2':'稳定显微镜。',
		'3':''
	}
}
function view(){
	$('#view img').hide();
	var img=new Image();
	img.src='image/2.png?';
	img.onload=function(){
		$('#step').hide();
		$('#main').css('background-image','url('+img.src+')').show();
	}
}
function reset(){
	$('#title p span').css({'color':'#000','background':'#fff'});
	$('#main').hide();
	$('#step,#view img').show();
	$('#img span').css('background','#fff');
	$('#img .im1').css('background','#3FBFA2');
	$('#textT h1').html(text[0][0]);
	$('#textT h2').html(text[0][1]);
	$('#textM h2 .span2').html(text[0][2]);
	$('#textM p').html(text[0][3]);
}
function choose(){
	$('#img span').css('background','#fff');
	$(this).css('background','#3FBFA2');
	var index=$(this).index();
	console.log(text[index][0])
	$('#textT h1').html(text[index][0]);
	$('#textT h2').html(text[index][1]);
	$('#textM h2 .span2').html(text[index][2]);
	$('#textM p').html(text[index][3]);
}
if(isMob){
    $('#view img').on('touchstart',view);
    $('#reset img').on('touchstart',reset);
    $('#img span').on('touchstart',choose);
}else{
    $('#view img').on('click',view);
    $('#reset img').on('click',reset);
    $('#img span').on('click',choose);
}

