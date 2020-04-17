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

    var MS,SS;
    function chooseM(){
        reset();
        $(this).hide()
        $(this).next().fadeIn(2000);
        $(this).next()[0].play();
        var thiz=this;
        SS=setTimeout(function(){
            $('.index .m').hide()
        },50)
        MS=setTimeout(function(){
            $(thiz).next().next().show();
        },4330)
    }
    function loop(){
        if(!this.ended){
            return;
        }
        clearTimeout(MS,SS);
        $(this)[0].currentTime=0;
        $(this)[0].play();
        var thiz=this;
        SS=setTimeout(function(){
            $(thiz).next().hide();
        },50)
        MS=setTimeout(function(){
            $(thiz).next().show();
        },4330)
    }

    function reset(){
        clearTimeout(MS,SS);
        $('.index img').show();
        $('.index .m').hide();
        $('.index video').hide();
        $('.index video')[0].pause();
        $('.index video')[1].pause();
        $('.index video')[2].pause();
        $('.index video')[0].currentTime=0;
        $('.index video')[1].currentTime=0;
        $('.index video')[2].currentTime=0;
    }

    if(isMob){
        $('.reset').on('touchstart',reset)
        $('.index img').on('touchstart',chooseM)
        $('.index video').on('touchstart',loop)
    }else{
        $('.reset').on('click',reset)
        $('.index img').on('click',chooseM)
        $('.index video').on('click',loop)
    }
}());

