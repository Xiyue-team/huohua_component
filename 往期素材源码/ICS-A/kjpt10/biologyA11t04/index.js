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
$('#main').height(height-80);
var L=$('#ion').width();
var l=$('#text span').width()-4;
for(var i=0;i<8;i++){
	$('#ion .ion'+(i+1)).css('left',(L/7*i-5)+'px');
}
for(var i=0;i<8;i++){
	$('#text .t'+(i+1)).css('left',-l/2+((L-l*7)/7+l)*i+'px');
}
window.onresize=function(){
	height=window.innerHeight;
	$('#main').height(height-80);
	L=$('#ion').width();
	l=$('#text span').width()-4;
	for(var i=0;i<8;i++){
		$('#ion .ion'+(i+1)).css('left',(L/7*i-5)+'px');
	}
	for(var i=0;i<8;i++){
		$('#text .t'+(i+1)).css('left',-l/2+((L-l*7)/7+l)*i+'px');
	}
}

var isMob = /iPad|Android/g.test(navigator.userAgent);

$("#slider1").change(function(){
    var index=parseInt(this.value);
    if(index==0){
    	$('#main').css({'backgroundSize':'50%','backgroundPosition':'center 30%'});
    }else{
    	$('#main').css({'backgroundSize':'contain','backgroundPosition':'center'});
    }
    $('#text span').css('color','#999');
    $('#text .t'+(index+1)).css('color','#000');
    var img=new Image();
	img.src='image/'+(index+1)+'.png';
	img.onload=function(){
		$('#main').css('background-image','url('+img.src+')');
	}
});

function reset(){
	$('#title p span').css({'color':'#000','background':'#fff'});
	$('#main').css({'backgroundSize':'50%','backgroundPosition':'center 30%','backgroundImage':'url(image/1.png)'});
	$('.xdsoft_range2dslider_runner').css('left','0');
}
if(isMob){
    $('#reset img').on('touchstart',reset);
}else{
    $('#reset img').on('click',reset);
}

