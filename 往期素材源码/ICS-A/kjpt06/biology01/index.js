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
    var scale = 1,bodyWidth,bodyHeight,isMob = /iPad|Android/g.test(navigator.userAgent);
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
    }
    init_();
    window.onresize=function(){
        init_();
    }

    var TX,TY,num,num1,num2,dom,choose_no,t_left,t_top,flag=false,die_flag=false,move_flag=false,moveIn_flag=false,animate_flag=false;

    var inum=1,i_4=0;
    var flag_c={
        flag1:false,
        flag2:false,
        flag3:false,
        flag4:false
    }

    var title_H=$('.title').height();
    var top_min=title_H+parseInt($('#app').css('margin-top'));
    var top_max=(bodyHeight-$('.main_left div .tab_1').height())/scale;
    var left_min=-$('.main_left div .tab_1').width()*0.1;
    var left_max=bodyWidth/scale-$('.main_left div .tab_1').width()-left_min;

    // 位置坐标
    var choose_ymin=$('#choose1').offset().top;
    var choose_ymax=$('#choose1').offset().top+$('#choose1').height();
    var choose1_xmin=$('#choose1').offset().left;
    var choose2_xmin=$('#choose2').offset().left;
    var choose3_xmin=$('#choose3').offset().left;
    var choose4_xmin=$('#choose4').offset().left;
    var choose1_xmax=$('#choose1').offset().left+$('#choose1').width();
    var choose2_xmax=$('#choose2').offset().left+$('#choose1').width();
    var choose3_xmax=$('#choose3').offset().left+$('#choose1').width();
    var choose4_xmax=$('#choose4').offset().left+$('#choose4').width();

    var backp={
        tab1_x:$('.tab_1').offset().left,
        tab1_y:$('.tab_1').offset().top,
        tab2_x:$('.tab_2').offset().left,
        tab2_y:$('.tab_2').offset().top,
        tab3_x:$('.tab_3').offset().left,
        tab3_y:$('.tab_3').offset().top
    }
    
    function mouse_touchStart(e){
        var name=event.target.className
        var str=name.substring(0,name.length-1)
        num=name.substring(4);
        if(inum>5){
            return false;
        }
        if(str=='tab_'){
            flag=true;
            dom=$(event.target).clone();
            dom.attr('class','clone clone'+inum);
            dom.css({'backgroundImage':'url(image/'+num+'.png)','z-index':999+inum});
            dom.width($('.main_left div .tab_1').width()).height($('.main_left div .tab_1').height());
            $(event.target).parent().append(dom);
        }
    }

    function touchMove(e){
        if(flag){
            TX=event.touches[0].clientX;
            TY=event.touches[0].clientY;
            move_flag=true;
            posit();
        }
    }

    function mouseMove(e){
        if(flag){
            TX=event.clientX;
            TY=event.clientY;
            move_flag=true;
            posit();
        }
    }
    
    function mouse_touchEnd(e){
        if(flag){
            if(t_top>choose_ymin&&t_top<choose_ymax&&t_left>choose1_xmin&&t_left<choose1_xmax){
                if(!flag_c.flag1){
                    putIn(1);
                }
            }else if(t_top>choose_ymin&&t_top<choose_ymax&&t_left>choose2_xmin&&t_left<choose2_xmax){
                if(!flag_c.flag2){
                    putIn(2);
                }
            }else if(t_top>choose_ymin&&t_top<choose_ymax&&t_left>choose3_xmin&&t_left<choose3_xmax){
                if(!flag_c.flag3){
                    putIn(3);
                }
            }else if(t_top>choose_ymin&&t_top<choose_ymax&&t_left>choose4_xmin&&t_left<choose4_xmax){
                if(!flag_c.flag4){
                    i_4++;
                    moveIn_flag=true;
                    var left_w
                    if(i_4==2){
                        animate_flag=true;
                        choose_no=4;
                        i_4=0;
                        num2=num;
                        if(num==1){
                            left_w='44%';
                        }else if(num==2){
                            left_w='44%';
                        }else if(num==3){
                            left_w='42%';
                        }
                        $('#choose4').append($('.clone'+inum))
                        $('#choose4 .clone'+inum).css({'position':'absolute','margin':'auto 0','top':'10px','left':left_w,'bottom':0,'backgroundRepeat':'no-repeat','backgroundPosition':'center','backgroundSize':'contain'});
                        flag_c.flag4=true;
                    }else{
                        num1=num;
                        if(num==1){
                            left_w='-5.8%';
                        }else if(num==2){
                            left_w='-5.8%';
                        }else if(num==3){
                            left_w='-8%';
                        }
                        $('#choose4').append($('.clone'+inum))
                        $('#choose4 .clone'+inum).css({'position':'absolute','margin':'auto 0','top':'10px','left':left_w,'bottom':0,'backgroundRepeat':'no-repeat','backgroundPosition':'center','backgroundSize':'contain'});
                    }
                    inum++;
                }
            }
            if(!moveIn_flag){
                if(move_flag){
                    back(num);
                }else{
                    $('.clone'+inum).remove();
                }
            }else{
                if(animate_flag){
                    if(choose_no!=4){
                       if(num==1||num==3){
                            die_flag=false;
                        }else{
                            die_flag=true;
                        } 
                    }else{
                        if(num1==1&&num2==1||num1==3&&num2==3){
                            die_flag=false;
                        }else{
                            die_flag=true;
                        } 
                    }
                    result(choose_no,die_flag);
                }
            }
            moveIn_flag=false;
            flag=false;
            move_flag=false;
        }
    }

    function posit(){
        t_top=TY/scale;
        t_left=TX/scale;
        var top=TY/scale-dom.height()/2;
        var left=TX/scale-dom.width()/2;
        if(top<=top_min){
            top=top_min;
        }else if(top>=top_max){
            top=top_max;
        }
        if(left<left_min){
            left=left_min;
        }else if(left>=left_max){
            left=left_max;
        }
        $('#app .main .main_left>div span.clone'+inum).css({'position':'fixed','margin':0,'top':top+'px','left':left+'px'});
    }
    function putIn(n){
        moveIn_flag=true;
        animate_flag=true;
        choose_no=n;
        var top_w,left_w
        if(num==1){
            top_w=11;
            left_w=6;
        }else if(num==2){
            top_w=8;
            left_w=5;
        }else if(num==3){
            top_w=3;
            left_w=-1;
        }
        $('#choose'+n).append($('.clone'+inum))
        $('#choose'+n+' .clone'+inum).css({'position':'absolute','margin':'auto 0','top':top_w+'px','left':(($('#choose'+n).width()-$('#choose'+n+' .clone'+inum).width())/2+left_w)+'px','bottom':0,'backgroundRepeat':'no-repeat','backgroundPosition':'center','backgroundSize':'contain'});
        inum++;
        flag_c['flag'+n]=true;
    }
    function back(num){
        $('#app .main .main_left>div span.clone'+inum).animate({
            top:backp['tab'+num+'_y'],
            left:backp['tab'+num+'_x']
        },300,function(){
            $('.clone'+inum).remove();
        })
    }

    function result(no,die){
        animate_flag=false;
        if(die){
            $('.show_'+no+' .s5').css('backgroundImage','url(image/m2.png)');
            $('.show_'+no+' .s6 p').text('小鼠死亡');
        }else{
            $('.show_'+no+' .s5').css('backgroundImage','url(image/m1.png)');
            $('.show_'+no+' .s6 p').text('小鼠不死亡');
        }
        $('.show_'+no+' .s2').animate({
            'backgroundPositionY':'50%'
        },2500,function(){
            $('.show_'+no+' .s4').animate({
                'backgroundPositionY':'50%',
                opacity:'1'
            },3000,function(){
                $('.show_'+no+' .s5').fadeIn(2000,function(){
                    $('.show_'+no+' .s6').fadeIn(1000,function(){
                        if(die){
                            $('.show_'+no+' .s5').append('<img src="image/2.png"/>')
                        }
                    })
                })
            })
        })
    }

    function reset(){
        inum=1;
        i_4=0;
        flag_c={
            flag1:false,
            flag2:false,
            flag3:false,
            flag4:false
        }
        $(':animated').stop();
        $('.clone').remove();
        $('.s2').css({'backgroundPositionY':'-200%'});
        $('.s4').css({'backgroundPositionY':'-250%'});
        $('.s5').css({'display':'none'});
        $('.s5').empty();
        $('.s6').css({'display':'none'});
    }

    //鼠标点击，选中顶点
    $('body').on( 'mousedown', mouse_touchStart);
    $('body').on( 'mousemove', mouseMove);
    $('body').on( 'mouseup', mouse_touchEnd);
    $('body').on( 'touchstart', mouse_touchStart);
    $('body').on( 'touchmove', touchMove);
    $('body').on( 'touchend', mouse_touchEnd);

    if(isMob){
        $('.reset').on('touchstart',reset)
    }else{
        $('.reset').on('click',reset)
    }
}());

