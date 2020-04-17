//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});

//禁止选择
document.onselectstart=function(){return false;};

var isMob = /iPad|Android/g.test(navigator.userAgent);
var wWidth=window.innerWidth;
var wHeight=window.innerHeight;
var zoom=1;
if(wHeight<580){
    zoom=0.8
    $('#main_right').css('zoom',zoom);
}
$('#main_left').width(wWidth-280*zoom);
var LW=$('#main_left').width();
var LH=$('#main_left').height();
LH=LH-60;
$('#main_left #bg').height(LH);
var scale=1;
if(LW/LH>1362/1212){
    scale=LH/1212;
    $('#main_left #bg>div').css('zoom',scale);
}else{
    scale=LW/1362;
    $('#main_left #bg>div').css('zoom',scale);
}
window.onresize=function(){
    wWidth=window.innerWidth;
    wHeight=window.innerHeight;
    if(wWidth<=580) wWidth=580;
    if(wHeight<580){
        zoom=0.8;
        $('#main_right').css('zoom',zoom);
    }else{
        zoom=1;
        $('#main_right').css('zoom',zoom);
    }
    $('#main_left').width(wWidth-280*zoom);
    LW=$('#main_left').width();
    LH=$('#main_left').height();
    LH=LH-60;
    $('#main_left #bg').height(LH);
    if(LW/LH>1362/1212){
        scale=LH/1212;
        $('#main_left #bg>div').css('zoom',scale);
    }else{
        scale=LW/1362;
        $('#main_left #bg>div').css('zoom',scale);
    }
}
function reset(){
    $('#step>div span').css('background','#f0f0f0');
    $('#result').css('background','#ECECEC');
    closeV();
    $('#resultF').css('background-image','none');
}
function step(){
    $('#step>div span').css('background','#f0f0f0');
    $(this).css('background','#5caefd');
    $(this).children().css('background','#fff');
    var index=$(this).parent().index()+1;
    $('#resultF').css('background-image','url(image/'+index+'.png)');
    var sl= document.createElement("audio");
    sl.preload="auto";
    if(index!=2){
        sl.src = "audio/no.wav";
        $('#result').css('background','#F8364E');
    }else{
        sl.src = "audio/yes.wav";
        $('#result').css('background','#7ED321');
    }
    sl.play();
}
function closeV(){
    $('#show').hide();
    playVF=false;
    $('#show video')[0].pause();
    $('#playV img').attr('src','image/play2.png');
    $('#playV p').text('播放');
    $('#show video').attr('src','');
    $('#show video').attr('src','video/1.webm');
}
var playVF=false;
function playV(){
    $('#show').show();
    $('#show video')[0].controls=false;
    if(playVF==false){
        playVF=true;
        $('#show video')[0].play();
        $('#playV img').attr('src','image/play1.png');
        $('#playV p').text('暂停');
    }else{
        playVF=false;
        $('#show video')[0].pause();
        $('#playV img').attr('src','image/play2.png');
        $('#playV p').text('播放');
    }
    
}
$('#show video').on('ended',function(){
    $('#playV img').attr('src','image/play2.png');
    $('#playV p').text('播放');
    closeV();
})

if(isMob){
    $('#step>div>span').on('touchstart',step);
    $('#reset img').on('touchstart',reset);
    $('#show img').on('touchstart',closeV);
    $('#playV img').on('touchstart',playV);
}else{
    $('#step>div>span').on('click',step);
    $('#reset img').on('click',reset);
    $('#show img').on('click',closeV);
    $('#playV img').on('click',playV);
}
