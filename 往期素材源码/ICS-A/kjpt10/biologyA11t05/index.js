//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});
$('.loading').css('line-height',window.innerHeight+'px');
var isMob = /iPad|Android/g.test(navigator.userAgent);
var img1F=false,img2F=false;
var img1=new Image();
img1.src='image/1.gif';
img1.onload=function(){
	img1F=true;
	if(img2F){
		$('.loading').hide();
	}
}
var img2=new Image();
img2.src='image/2.gif';
img2.onload=function(){
	img2F=true;
	if(img1F){
		$('.loading').hide();
	}
}
var SET=null;
var animateF1=false;
var animateF2=false;
function choose(){
	if(animateF1&&index==0){
		return;
	}
	if(animateF2&&index==1){
		return;
	}
	clearTimeout(SET);
	$('#title p span').css({'color':'#000','background':'#fff'});
	$(this).css({'color':'#fff','background':'#5caefd'});
	var index=$(this).index();
	var img=new Image();
	img.src='image/'+(index+1)+'.gif';
	// img.src='image/'+(index+1)+'.gif?'+Math.random();
	img.onload=function(){
		$('#main').css('background-image','url('+img.src+')');
		animateF=true;
		var time=6000;
		SET=setTimeout(function(){
			var img=new Image();
			img.src='image/'+(index+1)+'.png';
			img.onload=function(){
				$('#main').css('background-image','url('+img.src+')');
				animateF1=animateF2=false;
				clearTimeout(SET);
			}
		},time)
	}
}
function reset(){
	$('#title p span').css({'color':'#000','background':'#fff'});
	$('#main').css('background-image','url(image/c.png)');
	animateF1=animateF2=false;
	clearTimeout(SET);
}
if(isMob){
    $('#title p span').on('touchstart',choose);
    $('#reset img').on('touchstart',reset);
}else{
    $('#title p span').on('click',choose);
    $('#reset img').on('click',reset);
}

