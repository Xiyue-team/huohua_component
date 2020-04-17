//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});

var isMob = /iPad|Android/g.test(navigator.userAgent);
var wWidth=window.innerWidth;
var wHeight=window.innerHeight;
var zoom=1;
if(wHeight<620){
    zoom=0.8;
    $('#main_right').css('zoom',zoom);
}
var W=wWidth-280*zoom-60;
var H=wHeight-220;
var scale=1;
if(W/H > 600/430){
    scale=H/430;
}else{
    scale=W/600;
}
$('#main').css('zoom',scale);
$('#main p').css('zoom',1/scale);
    $('#main_left').width(wWidth-280*zoom);
window.onresize=function(){
    wWidth=window.innerWidth;
    wHeight=window.innerHeight;
    if(wWidth<=580) wWidth=580;
    if(wHeight<620){
        zoom=0.8;
        $('#main_right').css('zoom',zoom);
    }else{
        zoom=1;
        $('#main_right').css('zoom',zoom);
    }
    $('#main_left').width(wWidth-280*zoom);
    W=wWidth-280*zoom-60;
    H=wHeight-220;
    if(W/H > 600/430){
        scale=H/430;
    }else{
        scale=W/600;
    }
    $('#main').css('zoom',scale);
    $('#main p').css('zoom',1/scale);
}

function reset(){
    $('.check>span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
    checked1=false;
    checked2=false;
    $('.line,.line5').hide();
    $('#show').find('i').removeClass('active2');
    $('#show > div').css('display','none');
}

var checked1=false,checked2=false;
function click1(){
    var index=$(this).index();
    if(index==0){
        if(checked1){
            $(this).children('span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
            checked1=false;
            $('.check1').css('display','none');
            $('.line1,.line2,.line3,.line4').hide();
            $('#show > div.check1 > i').removeClass('active2');
        }else{
            $(this).children('span').css('background','#5CAEFD').children().css({'right':'2px','left':'auto'});
            checked1=true;
            $('.check1').css('display','block');
        }
    }else{
        if(checked2){
            $(this).children('span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
            checked2=false;
            $('.check2').css('display','none');
            $('.line5,.line6,.line7').hide();
            $('#show > div.check2 > i').removeClass('active2');
        }else{
            $('.line5').show();
            $(this).children('span').css('background','#5CAEFD').children().css({'right':'2px','left':'auto'});
            checked2=true;
            $('.check2').css('display','block');
        }
    }
}
function check() {
    var index=$(this).index();
    clearTimeout(S);
    if(!$(this).children('i').hasClass('active2')){
        $(this).children('i').addClass('active2');
        $('.line').eq(index).show();
        if(index==5){
            $('.line').eq(index).show().css('background-image','url(image/8.gif?'+Math.random()+')');
            var S=setTimeout(function(){
                clearTimeout(S);
                imgL('image/7.png',function(){
                    $('.line').eq(index).css('background-image','url(image/7.png)');
                })
            },600);
        }
    }else{
        $(this).children('i').removeClass('active2');
        $('.line').eq(index).hide();
        if(index==5){
            $('.line').eq(index).css('background-image','none');
        }
    }
}

function imgL(src,callback){
    var img=new Image();
    img.src=src;
    img.onload=function(){
        callback && callback();
    }
}

if(isMob){
    $('#reset').on('touchstart',reset);
    $('.check').on('touchstart',click1);
    $('#show> div').on('touchstart',check);
}else{
    $('#reset').on('click',reset);
    $('.check').on('click',click1);
    $('#show > div').on('click',check);
}


