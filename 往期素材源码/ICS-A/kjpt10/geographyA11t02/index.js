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

    var index,flag=false;
    function step() {
        if(!flag){
            flag=true;
            $(this).css({'background':'#4990E2','color':'#fff'});
            imgLoad('image/'+(index+1)+'z.png',function (src) {
                $('.showImg').attr('src',src);
            });

        }else{
            flag=false;
            $(this).css({'background':'#FFF','color':'#000'});
            imgLoad('image/'+(index+1)+'.png',function (src) {
                $('.showImg').attr('src',src);
            });
        }
    }

    function reset() {
        flag=false;
        $('.start').hide().css({'background':'#FFF','color':'#000'});

        imgLoad('image/f.png',function (src) {
            $('.showImg').attr('src',src);
        });
        $('.earth img').css({'transform':'scale(1)','zIndex':'10'});
        imgLoad('image/s.png',function (src) {
            $('.sm').attr('src',src);
        });
        imgLoad('image/b.png',function (src) {
            $('.bm').attr('src',src);
        })
    }
    function choose() {
        index=$(this).index();
        var $that = $(this);
        flag=false;
        $('.start').hide().css({'background':'#FFF','color':'#000'});
        $('.earth img').css({'transform':'scale(1)','zIndex':'10'});
        imgLoad('image/s.png',function (src) {
            $('.sm').attr('src',src);
        });
        imgLoad('image/b.png',function (src) {
            $('.bm').attr('src',src);
        });
        if(index == 2 || index == 5 || index == 8 || index == 11){
            imgLoad('image/bl.png',function (src) {
                $that.attr('src',src).css('transform','scale(2)');
                $('.start').show();
            })
        }else{
            imgLoad('image/sl.png',function (src) {
                $that.attr('src',src).css('transform','scale(2.5)');
                $('.start').hide().css({'background':'#FFF','color':'#000'});
            })
        }
        imgLoad('image/'+(index+1)+'.png',function (src) {
            $('.showImg').attr('src',src);
        })
    }
    function imgLoad(src, callback) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            callback && callback(img.src);
        }
    }
    if(isMob){
        $('.earth img').on('touchstart',choose);
        $('.start').on('touchstart',step);
        $('.reset').on('touchstart',function () {
            $(this).css({'background':'#C6DFFD'});
            reset();
        });
        $('.reset').on('touchend',function () {
            $(this).css({'background':'#FFFFFF'});
        });
    }else{
        $('.earth img').on('click',choose);
        $('.start').on('click',step);
        $('.reset').on('click',reset);
        $('.reset').on('mousedown',function () {
            $(this).css({'background':'#C6DFFD'});
        });
        $('.reset').on('mouseup',function () {
            $(this).css({'background':'#FFFFFF'});
        });
    }
}());

