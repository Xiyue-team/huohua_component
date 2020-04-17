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
var h=height-250;
var w=$('#main').width()-150;
var wN,hN;
if(w/h>715/350){
    wN=h/350*715;
    $('.showPic').width(wN).height(h).css({'top':'20px','left':(w-wN)/2+75+'px'}); 
}else{
    hN=w/715*350;
    $('.showPic').width(w).height(hN).css({'top':(h-hN)/2+20+'px','left':'75px'});
}
window.onresize=function(){
	height=window.innerHeight;
	$('#main').height(height-76);
	h=height-250;
	w=$('#main').width()-120;
	if(w/h>715/350){
        wN=h/350*715;
        $('.showPic').width(wN).height(h).css({'top':'20px','left':(w-wN)/2+75+'px'}); 
    }else{
        hN=w/715*350;
        $('.showPic').width(w).height(hN).css({'top':(h-hN)/2+20+'px','left':'75px'});
    }
}

var isMob = /iPad|Android/g.test(navigator.userAgent);

function reset(){
    if($('#ctrl').css('display')=='block') return;
    $('#ctrl,.showPic').show();
    $('video').hide().attr('src','');
    played=false;
}
var played=false;
function choose(){
    $('#ctrl,.showPic').hide();
    var index=$(this).index()+1;
    $('video').attr('src','');
    $('video').attr('src','video/'+index+'.mp4').show();
    $('video')[0].play();
    played=true;
}
function playC(){
    if(played){
        $('video')[0].pause();
        played=false;
    }else{
        $('video')[0].play();
         played=true;
    }
}
$('video').on('ended',function(){
    played=false;
})
if(isMob){
    $('#reset img').on('touchstart',reset);
    $('#ctrl div').on('touchstart',choose);
    $('video').on('touchstart',playC);
}else{
    $('#reset img').on('click',reset);
    $('#ctrl div').on('click',choose);
    $('video').on('click',playC);
}

