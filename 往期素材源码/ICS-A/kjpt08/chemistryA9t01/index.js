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
        set1();
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

    var choose_num;
    function choose(){
        var num=$(this).index()+1;
        choose_num=num;
        $('.choose span').css({'background':'#D7D7D7','borderColor':'#000','color':'#000'})
        $('.choose'+num).css({'background':'#F39800','borderColor':'#F39800','color':'#fff'})
        $('.index,.sp').hide();
        $('.sp'+num+',.control').show();
        $('.move').width($('.move').height());
        pL=$('.move').width(),rL=$('.ctrl').width();
        set2();
    }

    function set1(){
        clearTimeout(MS,SS);
        $('.index img').show();
        $('.index video').hide();
        $('.index video')[0].pause();
        $('.index video')[1].pause();
        $('.index video')[2].pause();
        $('.index video')[0].currentTime=0;
        $('.index video')[1].currentTime=0;
        $('.index video')[2].currentTime=0;
    }
	function set2(){
		$('.move').css({'left':'1.5%','pointer-events':'auto'});
        $('div:animated').stop();
        $('.sp>div').css('opacity','1')
        $('.sp11,.sp12,.sp21,.sp22,.sp31,.sp32').css({'background':"url('image/q.png') no-repeat center,url('image/ar.png') no-repeat center"})
        $('.sp33').css({'background':"url('image/fx.png') no-repeat center,url('image/ar.png') no-repeat center"})
        $('.sp23,.sp34').css({'background':"url('image/fy.png') no-repeat center,url('image/ar.png') no-repeat center"})
        $('.sp11,.sp21,.sp31').css({'right':''})
        $('.sp12,.sp23,.sp34').css({'left':''})
        $('.sp32').css({'left':'25%','right':''})
        $('.sp33').css({'left':'50%','right':''})
	}
    function reset(){
        set1();
        $('.control').hide();
        $('.index').show();
        $('.sp').hide();
        $('.index .m').hide();
        $('.choose span').css({'background':'#D7D7D7','borderColor':'#000','color':'#000'});
        set2();
    }

    var change=false;
    var change_old_num=1,change_num;
    function animate1(){
        if(!change){
            return;
        }
        $('div:animated').stop();
        $('.sp>div').css('opacity','1')
        if(choose_num==1){
            $('.sp11').css({'background':"url('image/q.png') no-repeat center,url('image/ar.png') no-repeat center"})
            $('.sp12').css({'background':"url('image/q.png') no-repeat center,url('image/ar.png') no-repeat center"})
            $('.sp11').css({'right':''})
            $('.sp12').css({'left':''})
        }else if(choose_num==2){
            $('.sp21,.sp22').css({'background':"url('image/q.png') no-repeat center,url('image/ar.png') no-repeat center"})
            $('.sp23').css({'background':"url('image/fy.png') no-repeat center,url('image/ar.png') no-repeat center"})
            $('.sp21').css({'right':''})
            $('.sp23').css({'left':''})
        }else if(choose_num==3){
            $('.sp31,.sp32').css({'background':"url('image/q.png') no-repeat center,url('image/ar.png') no-repeat center"})
            $('.sp33').css({'background':"url('image/fx.png') no-repeat center,url('image/ar.png') no-repeat center"})
            $('.sp34').css({'background':"url('image/fy.png') no-repeat center,url('image/ar.png') no-repeat center"})
            $('.sp31').css({'right':''})
            $('.sp32').css({'left':'25%','right':''})
            $('.sp33').css({'left':'50%','right':''})
            $('.sp34').css({'left':''})
        }
    }
    function animate2(){
        if(!change){
            return;
        }
        $('div:animated').stop();
        $('.sp>div').css('opacity','1')
        if(choose_num==1){
            $('.sp11').css({'background':"url('image/q.png') no-repeat center,url('image/ar.png') no-repeat center"})
            $('.sp12').css({'background':"url('image/q.png') no-repeat center,url('image/ar.png') no-repeat center"})
            $('.sp12').animate({'opacity':'0'},700,function () {
                $('.sp12').css({'background':"url('image/fx.png') no-repeat center,url('image/ar.png') no-repeat center"})
                $('.sp12').animate({'opacity':'1'},700)
            })
            $('.sp11').css({'right':''})
            $('.sp12').css({'left':''})
        }else if(choose_num==2){
            $('.sp21').css({'background':"url('image/q.png') no-repeat center,url('image/ar.png') no-repeat center"})
            $('.sp22').css({'background':"url('image/q.png') no-repeat center,url('image/ar.png') no-repeat center"})
            $('.sp22').animate({'opacity':'0'},700,function () {
                $('.sp22').css({'background':"url('image/fx.png') no-repeat center,url('image/ar.png') no-repeat center"})
                $('.sp22').animate({'opacity':'1'},700)
            })
            $('.sp23').css({'background':"url('image/fy.png') no-repeat center,url('image/ar.png') no-repeat center"})
            $('.sp21').css({'right':''})
            $('.sp23').css({'left':''})
        }else if(choose_num==3){
            $('.sp31').css({'background':"url('image/q.png') no-repeat center,url('image/ar.png') no-repeat center"})
            $('.sp32').css({'background':"url('image/q.png') no-repeat center,url('image/ar.png') no-repeat center"})
            $('.sp32').animate({'opacity':'0'},700,function () {
                $('.sp32').css({'background':"url('image/fz.png') no-repeat center,url('image/ar.png') no-repeat center"})
                $('.sp32').animate({'opacity':'1'},700)
            })
            $('.sp33').css({'background':"url('image/fx.png') no-repeat center,url('image/ar.png') no-repeat center"})
            $('.sp34').css({'background':"url('image/fy.png') no-repeat center,url('image/ar.png') no-repeat center"})
            $('.sp31').css({'right':''})
            $('.sp32').css({'left':'25%','right':''})
            $('.sp33').css({'left':'50%','right':''})
            $('.sp34').css({'left':''})
        }
    }
    function animate3(){
        if(!change){
            return;
        }
        $('div:animated').stop();
        $('.sp>div').css('opacity','1')
        if(choose_num==1){
            $('.sp12').css({'background':"url('image/fx.png') no-repeat center,url('image/ar.png') no-repeat center"})
            $('.sp11').animate({'right':'0'},1500)
            $('.sp12').animate({'left':'0'},1500,function(){
                $('.sp11').css({'background':"url('image/q.png') no-repeat center"})
                $('.sp11,.sp12').animate({'opacity':'0'},1500,function () {
                    $('.sp11').css({'background':"url('image/sp1d.png') no-repeat center"})
                    $('.sp12').css({'background':"none"})
                    $('.sp11,.sp12').animate({'opacity':'1'},1500)
                })
            })
        }else if(choose_num==2){
            $('.sp22').css({'background':"url('image/fx.png') no-repeat center,url('image/ar.png') no-repeat center"})
            $('.sp21').animate({'right':'0'},1500)
            $('.sp23').animate({'left':'0'},1500,function(){
                $('.sp21').css({'background':"url('image/q.png') no-repeat center"})
                $('.sp23').css({'background':"url('image/fy.png') no-repeat center"})
                $('.sp21,.sp22,.sp23').animate({'opacity':'0'},1500,function () {
                    $('.sp21').css({'background':"url('image/sp2d.png') no-repeat center"})
                    $('.sp22,.sp23').css({'background':"none"})
                    $('.sp21,.sp22,.sp23').animate({'opacity':'1'},1500)
                })
            })
        }else if(choose_num==3){
            $('.sp32').css({'background':"url('image/fz.png') no-repeat center,url('image/ar.png') no-repeat center"})
            $('.sp31').animate({'right':'0'},1500)
            $('.sp32,.sp33').animate({'left':'0','right':'0'},1500)
            $('.sp34').animate({'left':'0'},1500,function(){
                $('.sp31').css({'background':"url('image/q.png') no-repeat center"})
                $('.sp32').css({'background':"url('image/fz.png') no-repeat center"})
                $('.sp33').css({'background':"url('image/fx.png') no-repeat center"})
                $('.sp31,.sp32,.sp33,.sp34').animate({'opacity':'0'},1500,function () {
                    $('.sp31').css({'background':"url('image/sp3d.png') no-repeat center"})
                    $('.sp32,.sp33,.sp34').css({'background':"none"})
                    $('.sp31,.sp32,.sp33,.sp34').animate({'opacity':'1'},1500)
                })
            })
        }
    }

    var TX,TY,mX,mY,touch_flage=false;
    var L,pL,rL;
    function touchStart(e){
        TX=event.touches[0].clientX;
        TY=event.touches[0].clientY;
        L=parseInt($('.move').css('left'));
    }
    function touchMove(e){
        TX2=event.touches[0].clientX;
        TY2=event.touches[0].clientY;
        mX=TX2-TX;
        mY=TY2-TY;
        if(L+mX/scale<rL*0.015){
            $('.move').css('left','1.5%');
        }else if(L+mX/scale>rL*0.985-pL){
            $('.move').css('left',rL*0.985-pL);
        }else{
            $('.move').css('left',L+mX/scale);
        }
    }
    function touchEnd(e){
        if(L+mX/scale<=rL/4-pL/2){
            change_num=1;
            if(change_num==change_old_num){
                change=false;
            }else{
                change=true;
            }
            change_old_num=change_num
            $('.move').animate({'left':'1.5%'},200,animate1);
        }else if(L+mX/scale<rL*3/4-pL/2&&L+mX/scale>rL/4-pL/2){
            change_num=2;
            if(change_num==change_old_num){
                change=false;
            }else{
                change=true;
            }
            change_old_num=change_num
            $('.move').animate({'left':(rL-pL)/2},200,animate2);
        }else if(L+mX/scale>=rL*3/4-pL/2){
            change_num=3;
            if(change_num==change_old_num){
                change=false;
            }else{
                change=true;
            }
            change_old_num=change_num
            $('.move').animate({'left':rL*0.985-pL},200,animate3);
        }
    }
    function mouseDown(e){
        TX=event.clientX;
        TY=event.clientY;
        touch_flage=true;
        L=parseInt($('.move').css('left'))
    }
    function mouseMove(e){
        if(touch_flage){
            TX2=event.clientX;
            TY2=event.clientY;
            mX=TX2-TX
            mY=TY2-TY
            if(L+mX/scale<rL*0.015){
                $('.move').css('left','1.5%');
            }else if(L+mX/scale>rL*0.985-pL){
                $('.move').css('left',rL*0.985-pL);
            }else{
                $('.move').css('left',L+mX/scale);
            }
        }
    }
    function mouseUp(e){
        touch_flage=false;
        if(L+mX/scale<=rL/4-pL/2){
            change_num=1;
            if(change_num==change_old_num){
                change=false;
            }else{
                change=true;
            }
            change_old_num=change_num
            $('.move').animate({'left':'1.5%'},200,animate1);
        }else if(L+mX/scale<rL*3/4-pL/2&&L+mX/scale>rL/4-pL/2){
            change_num=2;
            if(change_num==change_old_num){
                change=false;
            }else{
                change=true;
            }
            change_old_num=change_num
            $('.move').animate({'left':(rL-pL)/2},200,animate2);
        }else if(L+mX/scale>=rL*3/4-pL/2){
            change_num=3;
            if(change_num==change_old_num){
                change=false;
            }else{
                change=true;
            }
            change_old_num=change_num
            $('.move').animate({'left':rL*0.985-pL},200,animate3);
        }
    }

    $('.move').on('touchstart',touchStart);
    $('.move').on('touchmove',touchMove);
    $('.move').on('touchend',touchEnd);
    $('.move').on('mousedown',mouseDown);
    $('.move').on('mousemove',mouseMove);
    $('.move').on('mouseup',mouseUp);


    if(isMob){
        $('.reset').on('touchstart',reset)
        $('.index img').on('touchstart',chooseM)
        $('.index video').on('touchstart',loop)
        $('.choose span').on('touchstart',choose)
    }else{
        $('.reset').on('click',reset)
        $('.index img').on('click',chooseM)
        $('.index video').on('click',loop)
        $('.choose span').on('click',choose)
    }
}());

