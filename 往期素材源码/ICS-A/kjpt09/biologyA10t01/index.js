//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});

//设置不同屏幕缩放
var scale = 1,isMob = /iPad|Android/g.test(navigator.userAgent),bodyWidth,bodyHeight;
function init_(){
    bodyWidth = $(window).width();
    bodyHeight = $(window).height();
    scale=bodyWidth/1920;
    if(1200*scale>bodyHeight){
        scale=bodyHeight/1200;
        $('#app').width(1920).css("zoom",scale);
    }else{
        $('#app').height(1200).css("zoom",scale);
    }
    $('#app .title h1').css('line-height',$('#app .title h1').height()+'px');
    $('#app .title div span').css('line-height',$('#app .title div span').height()+'px');
}
init_();
window.onresize=function(){
    init_();
}
 

var text={
    0:'红眼雌果蝇与白眼雄果蝇杂交。',
    1:'F<sub>1</sub>代中全是红眼果蝇。',
    2:'<b>·</b>F<sub>1</sub>代中的雌雄交配；<br/><br/><b>·</b>F<sub>2</sub>代中红眼与白眼的比例为3:1；<br/><br/><b>·</b>F<sub>2</sub>代中的白眼全是雄蝇；',
    3:'<b>·</b>F<sub>1</sub>代中全是红眼；<br/><br/><b>·</b>F<sub>2</sub>代中红眼与白眼的比例为3:1；<br/><br/><b>·</b>F<sub>2</sub>代中的白眼全是雄蝇；'
}
$('.text2').html(text[0]);
posText();
//点击tab事件
function choose(){
    var n = $(this).index();
    $(this).addClass("selected").siblings().removeClass("selected");
    $('.text2').html(text[n]);
    posText();
    $('div:animated').stop();
    if(n==0){
        $('.b1').hide();
        $('#step1').css({'height':'100%','marginTop':'0','backgroundImage':'url(image/1.png)'});
        $("#step2,#step3,#step4,#step5,.x").css('opacity','0');
        $('#step3 .F').css({'opacity':'1'});
        $('#step3 .F12').css('left','0');
        $('#step3 .F13').css('right','0');
    }else if(n==1){
        $('.b1').show();
        $('#step1').css({'height':'100%','marginTop':'0','backgroundImage':'url(image/1.png)'});
        $("#step2,#step3,#step4,#step5,.x").css('opacity','0');
        $('#step3 .F').css({'opacity':'1'});
        $('#step3 .F12').css('left','0');
        $('#step3 .F13').css('right','0');
        $('#step1').animate({'height':'33%'},1000,function(){
            $('#step1 .x').animate({'opacity':'1'},800);
            $('#step2').animate({'opacity':'1'},800,function(){
                 $('#step3').animate({'opacity':'1'},800) 
            }) 
        }) 
    }else if(n==2){
        $('.b1').show();
        $('#step1').css({'height':'33%','marginTop':'0','backgroundImage':'url(image/1.png)'});
        $("#step2,#step3,#step3 .F,#step1 .x").css('opacity','1');
        $("#step4,#step5,#step3 .x").css('opacity','0');
        $('#step3 .F12').css('left','0');
        $('#step3 .F13').css('right','0');
        $('#step1').animate({'marginTop':'-40%'},1000,function(){
            $('#step3 .F11,#step3 .F14').animate({'opacity':'0'},800,function(){
                $('#step3 .F12').animate({'left':'-8%'},800);
                $('#step3 .F13').animate({'right':'-8%'},800,function(){
                	$('#step3 .x').animate({'opacity':'1'},800);
                    $('#step4').animate({'opacity':'1'},800,function(){
                         $('#step5').animate({'opacity':'1'},800) 
                    }) 
                });
            })
        }) 
    }else{
        $('.b1').hide();
        $('#step1').css({'height':'100%','marginTop':'0','backgroundImage':'url(image/z.png)'});
        $("#step2,#step3,#step4,#step5,.x").css('opacity','0');
        $('#step3 .F').css({'opacity':'1'});
    }
}
function posText(){
    var h=parseInt($('.text1').height())+parseInt($('.text2').height())+4*20;
    $('.text').height(h)
    $('.text').css('margin-top',($('.main_left').height()-h)/2+'px')
}
function reset(){
    $('.text2').html(text[0]);
    posText();
    $('div:animated').stop();
    $('.choose1').addClass("selected").siblings().removeClass("selected");
    $('#step1').css({'height':'100%','marginTop':'0','backgroundImage':'url(image/1.png)'});
    $("#step2,#step3,#step4,#step5,.x").css('opacity','0');
    $('.b1').hide();
}
if(isMob){
    $('.choose').on('touchstart',choose)
    $('.reset').on('touchstart',reset)
}else{
    $('.choose').on('click',choose)
    $('.reset').on('click',reset)
}

