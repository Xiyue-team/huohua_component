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
$('#main').height(height-120);
window.onresize=function(){
	height=window.innerHeight;
	$('#main').height(height-120);
}

var isMob = /iPad|Android/g.test(navigator.userAgent);

function choose(){
	$('#title p span').css({'color':'#000','background':'#fff'});
	$(this).css({'color':'#fff','background':'#5caefd'});
	var index=$(this).index();
	var img=new Image();
	img.src='image/'+(index+1)+'.png';
	img.onload=function(){
		$('#main').css('background-image','url('+img.src+')');
	}
	
}
function reset(){
	$('#title p span').css({'color':'#000','background':'#fff'});
	$('#main').css('background-image','url(image/c.png)');
}
if(isMob){
    $('#title p span').on('touchstart',choose);
    $('#reset img').on('touchstart',reset);
}else{
    $('#title p span').on('click',choose);
    $('#reset img').on('click',reset);
}

