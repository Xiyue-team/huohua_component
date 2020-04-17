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
    }
    init_();
    window.onresize=function(){
        init_();
    }
    
    var step,stepNum,index;
    function choose(){
        step=0;
        index=$(this).index()+1;
        if(index==1||index==2){
            stepNum=4;
        }else if(index==3||index==4){
            stepNum=6;
        }
        $('.m,.main').hide();
        $('.ctrl,.m'+index).show();
        $('.m'+index+' div').css('opacity','0');
        $('.m'+index+' .ms').css('opacity','1');
    }
    function back(){
        $('.main').show();
        $('.ctrl,.m').hide();
    }
    function stepC(){
        step++;
        if(step<=stepNum){
            $('.m'+index+' .m'+index+'s'+step).css('opacity','1');
        }else{
            return;
        }
    }
    if(isMob){
        $('.c').on('touchstart',choose);
        $('.back').on('touchstart',back);
        $('.step').on('touchstart',stepC);
    }else{
        $('.c').on('click',choose);
        $('.back').on('click',back);
        $('.step').on('click',stepC);
    }
}());

