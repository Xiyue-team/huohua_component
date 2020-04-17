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

var played=false;
function choose(){
    $('#title p span').css({'color':'#000','background':'#fff'});
    $(this).css({'color':'#fff','background':'#5caefd'});
    var index=$(this).index()+1;
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
function reset(){
    $('#title p span').css({'color':'#000','background':'#fff'});
    $('.showPic').show();
    $('video').hide().attr('src','');
    played=false;
}
if(isMob){
    $('#title p span').on('touchstart',choose);
    $('#reset img').on('touchstart',reset);
    $('video').on('touchstart',playC);
}else{
    $('#title p span').on('click',choose);
    $('#reset img').on('click',reset);
    $('video').on('click',playC);
}

