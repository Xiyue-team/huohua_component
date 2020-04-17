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
$('#main').height(height-120);
if(height-120>width/2){
	$('#main>div>div').width(width/2*0.75).height(width/2*0.75).css('margin-top',(height-120-width/2*0.75)/2*0.8+'px');
}else{
	$('#main>div>div').width((height-120)*0.75).height((height-120)*0.75).css('margin-top',(height-120)*0.25/2*0.8+'px');
}
$('#main>div>p').css('top',$('#main>div>div').height()+parseInt($('#main>div>div').css('margin-top'))+'px' );
window.onresize=function(){
	width=window.innerWidth;
	height=window.innerHeight;
	if(width<580){
		width=580;
	}
	$('#main').height(height-120);
	if(height-120>width/2){
		$('#main>div>div').width(width/2*0.75).height(width/2*0.75).css('margin-top',(height-120-width/2*0.75)/2*0.8+'px');
	}else{
		$('#main>div>div').width((height-120)*0.75).height((height-120)*0.75).css('margin-top',(height-120)*0.25/2*0.8+'px');
	}
	$('#main>div>p').css('top',$('#main>div>div').height()+parseInt($('#main>div>div').css('margin-top'))+'px' );
}

var isMob = /iPad|Android/g.test(navigator.userAgent);

function choose(){
	$('#title p span').css({'color':'#000','background':'#fff'});
	$(this).css({'color':'#fff','background':'#5caefd'});
	var index=$(this).index();
	var img1=new Image();
	img1.src='image/x'+(index+1)+'.png';
	img1.onload=function(){
		$('#xj').css('background-image','url('+img1.src+')');
	}
	var img2=new Image();
	img2.src='image/l'+(index+1)+'.png';
	img2.onload=function(){
		$('#lz').css('background-image','url('+img2.src+')');
	}
}
function reset(){
	$('#title p span').css({'color':'#000','background':'#fff'});
	$('#xj').css('background-image','url(image/x.png)');
	$('#lz').css('background-image','url(image/l.png)');
}
if(isMob){
    $('#title p span').on('touchstart',choose);
    $('#reset img').on('touchstart',reset);
}else{
    $('#title p span').on('click',choose);
    $('#reset img').on('click',reset);
}

