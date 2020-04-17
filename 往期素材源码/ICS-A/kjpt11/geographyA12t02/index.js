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
$('#main').height(height-76);
var L=$('#ion').width();
var l=$('#text span').width();
var positionT=[0,9,19,29,39];
for(var i=0;i<5;i++){
    var position = (positionT[i])/39;
    $('#ion .ion'+(i+1)).css('left',L*position-6+'px');
    $('#text .t'+(i+1)).css('left',L*position-l/2+6+'px');
}
var h=height-256;
var w=$('#main').width()-120;
var wN,hN;
if(w/h>904/510){
	wN=h/510*904;
	$('.showPic').width(wN).height(h).css({'top':'20px','left':(w-wN)/2+40+'px','padding':'20px'});	
}else{
	hN=w/904*510;
	$('.showPic').width(w).height(hN).css({'top':(h-hN)/2+20+'px','left':'40px','padding':'20px'});
}
window.onresize=function(){
	height=window.innerHeight;
	$('#main').height(height-76);
	L=$('#ion').width();
	l=$('#text span').width();
    positionT=[0,9,19,29,39];
    for(var i=0;i<5;i++){
        var position = (positionT[i])/39;
        $('#ion .ion'+(i+1)).css('left',L*position-6+'px');
        $('#text .t'+(i+1)).css('left',L*position-l/2+6+'px');
    }
	h=height-256;
	w=$('#main').width()-120;
	if(w/h>904/510){
		wN=h/510*904;
		$('.showPic').width(wN).height(h).css({'top':'20px','left':(w-wN)/2+40+'px','padding':'20px'});	
	}else{
		hN=w/904*510;
		$('.showPic').width(w).height(hN).css({'top':(h-hN)/2+20+'px','left':'40px','padding':'20px'});
	}
}

var isMob = /iPad|Android/g.test(navigator.userAgent);

$("#slider1").change(function(){
    var index=parseInt(this.value);
    var img=new Image();
    img.src='image/'+index+'.jpg';
    img.onload=function () {
        $('.showPic').css('background-image','url('+img.src+')');
    }
});

function reset(){
	$('.xdsoft_range2dslider_runner').css('left','0');
    var img=new Image();
    img.src='image/1.jpg';
    img.onload=function () {
        $('.showPic').css('background-image','url('+img.src+')');
    }
}
if(isMob){
    $('#reset img').on('touchstart',reset);
}else{
    $('#reset img').on('click',reset);
}

