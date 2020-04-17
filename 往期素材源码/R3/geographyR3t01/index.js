//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}
$(function () {
    FastClick.attach(document.body);
});

//禁止选择
document.onselectstart = function () {
    return false;
};

var isMob = /iPad|Android/g.test(navigator.userAgent);

var width = window.innerWidth;
var height = window.innerHeight;
var zoom = 1;
if (height < 580) {
    zoom = 0.8;
    $('#right').css('zoom', zoom);
}
$('#left').width(width - 280 * zoom);
$('#main').height(height-100);
$('.windDiv').height($('#main img').height()+'px');
window.onresize = function () {
    width = window.innerWidth;
    height = window.innerHeight;
    if (width <= 580) width = 580;
    if (height < 580) {
        zoom = 0.8;
        $('#right').css('zoom', zoom);
    } else {
        zoom = 1;
        $('#right').css('zoom', zoom);
    }
    $('#left').width(width - 280 * zoom);
    $('#main').height(height-100);
    $('.windDiv').height($('#main img').height()+'px');
};

function reset(){
    indexN=2;
    $('#center>p').removeClass('pActive').addClass('pNoActive');
    $('#check>span').css('background', '#F0F0F0').children().css({'left': '2px', 'right': 'auto'});
    checked = false;
    $('#center p.p2').removeClass('pNoActive').addClass('pActive');
    ImgL('images/2.png',function(){
        $('#main').css({'backgroundImage':'url(images/2.png)'});
    });
    $('#main>div').css({'backgroundImage':'none'});
}

//风带的移动
var checked = false;
function check(){
    if (checked) {
        $('#main>div').css({'backgroundImage':'none'});
        $(this).children('span').css('background', '#F0F0F0').children().css({'left': '2px', 'right': 'auto'});
        checked = false;
    } else {
        ImgL('images/'+indexN+'g.gif',function(){
            $('#main>div').css({'backgroundImage':'url(images/'+indexN+'g.gif)'});
        })
        $(this).children('span').css('background', '#5CAEFD').children().css({'right': '2px', 'left': 'auto'});
        checked = true;
    }
}
var indexN=2;
function choice() {
    $(this).removeClass('pNoActive').addClass('pActive');
    $(this).siblings().removeClass('pActive').addClass('pNoActive');
    var index = $(this).index()+1;
    ImgL('images/'+index+'.png',function(){
        $('#main').css({'backgroundImage':'url(images/'+index+'.png)'});
    });
    if(checked){
        ImgL('images/'+index+'g.gif',function(){
            $('#main>div').css({'backgroundImage':'url(images/'+index+'g.gif)'});
        });
    }else{
        $('#main>div').css({'backgroundImage':'none'});
    }
    indexN=index;
}
function ImgL(src,callback){
    var img=new Image();
    img.src=src;
    img.onload=function(){
        callback && callback();
    }
}
if(isMob){
    $('#reset').on('touchstart',reset);
    $('#center>p').on('touchstart',choice);
    $('#check').on('touchstart',check);
}else{
    $('#reset').on('click',reset);
    $('#center>p').on('click',choice);
    $('#check').on('click',check);
}






