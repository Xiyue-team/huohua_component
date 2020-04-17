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
var h=height-176;
var w=$('#main').width()-100;
var wN,hN;
if(w/h>1200/452){
    wN=h/452*1200;
    $('.showPic').width(wN).height(h).css({'top':'50px','left':(w-wN)/2+50+'px'}); 
}else{
    hN=w/1200*452;
    $('.showPic').width(w).height(hN).css({'top':(h-hN)/2+50+'px','left':'50px'});
}
window.onresize=function(){
	height=window.innerHeight;
	$('#main').height(height-76);
	h=height-176;
    w=$('#main').width()-100;
    if(w/h>1200/452){
        wN=h/452*1200;
        $('.showPic').width(wN).height(h).css({'top':'50px','left':(w-wN)/2+50+'px'}); 
    }else{
        hN=w/1200*452;
        $('.showPic').width(w).height(hN).css({'top':(h-hN)/2+50+'px','left':'50px'});
    }
}

var isMob = /iPad|Android/g.test(navigator.userAgent);

function reset(){
    if($('.showPic').css('display')=='block') return;
    $('.showPic').show();
    $('video').hide().attr('src','');
    played=false;
}
var played=false;
function choose(){
    var index=$(this).parent().index()+1;
    $('.showPic').hide();
    $('video').attr('src','');
    $('video').show().attr('src','video/'+index+'.mp4');
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
    $('.btn').on('touchstart',choose);
    $('video').on('touchstart',playC);
}else{
    $('#reset img').on('click',reset);
    $('.btn').on('click',choose);
    $('video').on('click',playC);
}

