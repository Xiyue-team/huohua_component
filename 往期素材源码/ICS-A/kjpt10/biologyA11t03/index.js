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
$('#main,#step').height(height-120);
if(height-120>width/4){
	$('#main>div>div').width(width/4*0.9).height(width/4*0.9).css('margin-top',(height-120-width/4*0.9)/2*0.8+'px');
}else{
	$('#main>div>div').width((height-120)*0.9).height((height-120)*0.9).css('margin-top',(height-120)*0.1/2*0.8+'px');
}
if(height-120>width/2){
	$('#img').width(width/2*0.9).height(width/2*0.9);
}else{
	$('#img').width((height-120)*0.9).height((height-120)*0.9);
}
$('#img>div').width($('#img').width()*0.9).height($('#img').width()*0.9*0.8);
$('#main>div>p').css('top',$('#main>div>div').height()*1.2+parseInt($('#main>div>div').css('margin-top'))+'px' );
$('#text>div').height($('#text>div>h3').height()+$('#text>div>#st').height()+$('#text>div>#bz').height()+40);
window.onresize=function(){
	width=window.innerWidth;
	height=window.innerHeight;
	$('#main,#step').height(height-120);
	if(width<580){
		width=580;
	}
	if(height-120>width/4){
		$('#main>div>div').width(width/4*0.9).height(width/4*0.9).css('margin-top',(height-120-width/4*0.9)/2*0.8+'px');
	}else{
		$('#main>div>div').width((height-120)*0.9).height((height-120)*0.9).css('margin-top',(height-120)*0.1/2*0.8+'px');
	}
	if(height-120>width/2){
		$('#img').width(width/2*0.9).height(width/2*0.9);
	}else{
		$('#img').width((height-120)*0.9).height((height-120)*0.9);
	}
	$('#main>div>p').css('top',$('#main>div>div').height()*1.2+parseInt($('#main>div>div').css('margin-top'))+'px' );
	$('#img>div').width($('#img').width()*0.9).height($('#img').width()*0.9*0.8);
	$('#text>div').height($('#text>div>h3').height()+$('#text>div>#st').height()+$('#text>div>#bz').height()+40);
}

var isMob = /iPad|Android/g.test(navigator.userAgent);
var text={
	'1':{
		'0':'1.向试管内注入2mL待测组织样液<br/>2.向试管内注入1mL斐林试剂(甲乙液等量混合均匀后再注入)<br/>3.将试管放入盛有50-65℃温水的大烧杯中加热约2min<br/>4.观察试管中出现的颜色变化',
		'1':'注：<br/>甲液：质量浓度为0.1g/mL的NaOH溶液<br/>乙液：质量浓度为0.05g/mL的CuSO4溶液'
	},
	'2':{
		'0':'1.用试管2mL，待检测组织样液<br/>2.向试管内滴加3滴苏丹Ⅲ染液，观察样液被染色的情况',
		'1':''
	},
	'3':{
		'0':'1.向试管内注入待测组织样液2mL<br/>2.向试管内注入双缩脲试剂A液1mL，摇匀<br/>3.向试管内注入B液4滴，摇匀<br/>4.可见组织样液变成紫色',
		'1':'注：<br/>A液：质量浓度为0.1g/mL的NaOH溶液<br/>B液：质量浓度为0.01g/mL的CuSO4溶液'
	},
	'4':{
		'0':'1.用试管2mL，待检测组织样液<br/>2.向试管内滴加2滴碘液，观察颜色变化',
		'1':''
	}
}
function choose(){
	$('#title p span').css({'color':'#000','background':'#fff'});
	$(this).css({'color':'#fff','background':'#5caefd'});
	$('#main').hide();
	$('#step').show();
	var index=$(this).index();
	var img=new Image();
	img.src='image/'+(index+1)+'.gif?'+Math.random();
	img.onload=function(){
		$('#img>div').css('background-image','url('+img.src+')');
	}
	$('#st').html(text[index+1][0]);
	$('#bz').html(text[index+1][1]);
	$('#text>div').height($('#text>div>h3').height()+$('#text>div>#st').height()+$('#text>div>#bz').height()+40);
}
function reset(){
	$('#title p span').css({'color':'#000','background':'#fff'});
	$('#main').show();
	$('#step').hide();
}
if(isMob){
    $('#title p span').on('touchstart',choose);
    $('#reset img').on('touchstart',reset);
}else{
    $('#title p span').on('click',choose);
    $('#reset img').on('click',reset);
}

