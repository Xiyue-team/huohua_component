//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});
(function(){
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
        t1:{
            1:'实验步骤',
            2:'在洁净的试管里加入10%的NaOH溶液2mL，滴入2%的CuSO<sub>4</sub>溶液4~6滴，得到新制的氢氧化铜。'
        },
        t2:{
            1:'实验步骤',
            2:'向新制氢氧化铜溶液中，加入乙醛溶液0.5mL，加热至沸腾。'
        }
    }
    function choose1(){
        $('.choose2').css({'background':'#364250','borderColor':'#fff'});
        $(this).css({'background':'#0083D7','borderColor':'#0083D7'});
        $('.main_left').show();
        $('.text1').html(text.t1[1]);
        $('.text2').html(text.t1[2]);
        posText();
        $('.main_right').css({'backgroundImage':'url(image/1.gif?'+Math.random()+')','width':'74%'});
    }
    function choose2(){
        $('.choose1').css({'background':'#364250','borderColor':'#fff'});
        $(this).css({'background':'#0083D7','borderColor':'#0083D7'});
        $('.main_left').show();
        $('.text1').html(text.t2[1]);
        $('.text2').html(text.t2[2]);
        posText();
        $('.main_right').css({'backgroundImage':'url(image/2.gif?'+Math.random()+')','width':'74%'});
    }
    
    function reset(){
        $('.choose1,.choose2').css({'background':'#364250','borderColor':'#fff'});
        $('.main_left').hide();
        $('.main_right').css({'backgroundImage':'url(image/z.png?'+Math.random()+')','width':'92%'});
    }
    function posText(){
        var h=parseInt($('.text1').height())+parseInt($('.text2').height())+4*20;
        $('.text').height(h)
        $('.text').css('margin-top',($('.main_left').height()-h)/2+'px')
    }
    if(isMob){
        $('.choose1').on('touchstart',choose1)
        $('.choose2').on('touchstart',choose2)
        $('.reset').on('touchstart',reset)
    }else{
        $('.choose1').on('click',choose1)
        $('.choose2').on('click',choose2)
        $('.reset').on('click',reset)
    }
}());

