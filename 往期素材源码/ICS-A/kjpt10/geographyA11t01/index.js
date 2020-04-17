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
    var stepNum=0,S1,S2,S11,S22;
    function step() {
        if(stepNum==2){
            return;
        }
        stepNum++;
        $('.start').css('pointer-events','none');
        var m=Math.random();
        var img=new Image();
        img.src='image/'+stepNum+'.gif?'+m;
        img.onload=function () {
            $('#main_left div').css('background-image','url(image/'+stepNum+'.gif?'+m+')');
            if(stepNum==1){
            	var m1=Math.floor(Math.random()*60),m2=Math.floor(Math.random()*60);
                var i=m1<10?'0'+m1:m1;
                var j=m2<10?'0'+m2:m2;
                var k=0;
                k++;
                k=k<10?('0'+k):k;
                $('.fen').html(i);
                $('.miao').html(j);
                $('.shi').html(k);
                S11=setInterval(function () {
                    if(k==23){
                        clearInterval(S11);
                        $('.fen').html('56');
	                    $('.miao').html('04');
	                    $('.shi').html('23');
                        return;
                    }
                    k++;
                	k=k<10?('0'+k):k;
                	m1=Math.floor(Math.random()*60),m2=Math.floor(Math.random()*60);
                	i=m1<10?'0'+m1:m1;
					j=m2<10?'0'+m2:m2;
                    $('.fen').html(i);
                    $('.miao').html(j);
                    $('.shi').html(k);
                },100)
                S1=setTimeout(function () {
                    var img1=new Image();
                    img1.src='image/2.png';
                    img1.onload=function () {
                        $('#main_left div').css('background-image','url(image/2.png)');
                       $('.start').css('pointer-events','auto');
                       clearTimeout(S1);
                    }
                },4000);
            }else{
                S2=setTimeout(function () {
                    var img2=new Image();
                    img2.src='image/3.png';
                    img2.onload=function () {
                        $('#main_left div').css('background-image','url(image/3.png)');
                       $('.start').css('pointer-events','auto');
                       clearTimeout(S2);
                    }
                },3000);
                S22=setTimeout(function () {
                   $('.fen').html('00');
                    $('.miao').html('00');
                    $('.shi').html('24');
                    clearTimeout(S22);
                },500);
            }
        }
    }

    function reset() {
        stepNum=0;
        $('#main_left div').css('background-image','url(image/1.png)');
        $('.start').css('pointer-events','auto');
        clearTimeout(S1);
        clearTimeout(S2);
        clearTimeout(S22);
        clearInterval(S11);
        $('.fen').html('00');
        $('.miao').html('00');
        $('.shi').html('00');
    }

    if(isMob){
        $('.start').on('touchstart',function () {
            $(this).css({'background':'#90C1F9','borderColor':'#90C1F9'});
            step();
        });
        $('.start').on('touchend',function () {
            $(this).css({'background':'#4990E2','borderColor':'#4990E2'});
        });
        $('.reset').on('touchstart',function () {
            $(this).css({'background':'#C6DFFD'});
            reset();
        });
        $('.reset').on('touchend',function () {
            $(this).css({'background':'#FFFFFF'});
        });
    }else{
        $('.start').on('click',step);
        $('.start').on('mousedown',function () {
            $(this).css({'background':'#90C1F9','borderColor':'#90C1F9'});
        });
        $('.start').on('mouseup',function () {
            $(this).css({'background':'#4990E2','borderColor':'#4990E2'});
        });
        $('.reset').on('click',reset);
        $('.reset').on('mousedown',function () {
            $(this).css({'background':'#C6DFFD'});
        });
        $('.reset').on('mouseup',function () {
            $(this).css({'background':'#FFFFFF'});
        });
    }
}());

