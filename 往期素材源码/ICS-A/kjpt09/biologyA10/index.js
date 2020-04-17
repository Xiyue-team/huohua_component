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
}
init_();
window.onresize=function(){
    init_();
}
var game1=false;
var game2=false;
var isOver=false;
var time1,time2,time3,time4,time5,time6,time7,time8;
$('.tianzikuang').css('visibility','hidden');
//字母填充盒子
function fixBox(t,callback){
    if(t==1){
        $('.tianzikuang .L-l').css({"left":"0","opacity":"1"});
        $('.tianzikuang .L-r').css({"left":"0","opacity":"1"});
        time6=setTimeout(function(){
            $('.tianzikuang .T-t').css({"top":"0","opacity":"1"});
            $('.tianzikuang .T-b').css({"top":"0","opacity":"1"});
            clearTimeout(time6);
        },700);
    }else{
        $('.tianzikuang2 .L-l').css({"left":"0","opacity":"1"});
        $('.tianzikuang2 .L-r').css({"left":"0","opacity":"1"});
        time7=setTimeout(function(){
            $('.tianzikuang2 .T-t').css({"top":"0","opacity":"1"});
            $('.tianzikuang2 .T-b').css({"top":"0","opacity":"1"});
            clearTimeout(time7);
        },700);
    }


    callback && callback();
}
//点击tab事件
function choose(d){
    if(d==1){
        $('#btn1').css('display','none');
        $('#btn2').css('display','block');
        //田字框显示
        $('.tianzikuang').css('visibility','visible');
        if($('.span1').text()=='D'){
            $('.fixed-D1').css({"top":"0",'left':'0',"opacity":"1"});
            $('.fixed-D2').css({"top":"0",'left':'0',"opacity":"1"});
            $('.fixed-d1').css({"top":"0","left":"0","opacity":"1"});
            $('.fixed-d2').css({"top":"0","left":"0","opacity":"1"});

            time5=setTimeout(function(){
                fixBox(1,function(){
                    clearTimeout(time5);
                    time1=setTimeout(function(){
                        $('.geneImg').css('visibility','hidden');
                        $('.final1').css('visibility','visible');
                        $('.accept-box').slideUp(400,function(){
                            game1=true;
                            clearTimeout(time1);
                        });
                    },1000)
                });
            },700)
        }else{
            $('.fixed-D1').css({"top":"0",'left':'0',"opacity":"1"});
            $('.fixed-D2').css({"top":"0",'left':'0',"opacity":"1"});
            $('.fixed-d1').css({"top":"0","left":"0","opacity":"1"});
            $('.fixed-d2').css({"top":"0","left":"0","opacity":"1"});
            time5=setTimeout(function(){
                fixBox(1,function(){
                    clearTimeout(time5);
                    time2=setTimeout(function(){
                        $('.geneImg').css('visibility','hidden');
                        $('.final1').css('visibility','visible');
                        $('.accept-box').slideUp(400,function(){
                            game1=true;
                            clearTimeout(time2);
                        });
                    },1000)
                });
            },700)
        }
    }else{
        $('#btn3').css('display','none');
        $('#btn4').css('display','block');
        $('#step2').css('margin-top','100px');
        $('#step1').slideUp(800,function(){
            $('.final1').append($('#final1_img').clone());
            $('.final1').find('img').eq(0).css('left','-150px');
            $('.final1').find('img').eq(1).css('left','150px');
            $('.final1').addClass('zajiao');
            $('.tianzikuang2').animate({'opacity':1},'slow',function(){

                //
                $('.tianzikuang2 .fixed-L1').css({"top":"0","opacity":"1"});
                $('.tianzikuang2 .fixed-L2').css({"top":"0","opacity":"1"});
                $('.tianzikuang2 .fixed-T1').css({"top":"0","left":"0","opacity":"1"});
                $('.tianzikuang2 .fixed-T2').css({"top":"0","left":"0","opacity":"1"});

                time3=setTimeout(function(){
                    fixBox(2,function(){
                        clearTimeout(time3);
                        time4=setTimeout(function(){
                            clearTimeout(time4);
                            $('.final1').slideUp(800, function () {
                                $('.final2>img').animate({'opacity':1},'slow',function(){
                                    isOver=false;
                                })
                            })
                        },1000)
                    });
                },1000)
            })

        })

    }

}
function reset(t,callback){
    //清理定时器
    game1=false;
    game2=false;
    isOver=false;
    $('#btn1').css('display','block');
    $('#btn2').css('display','none');
    $('#btn3').css('display','block');
    $('#btn4').css('display','none');
    if(time1){
        clearTimeout(time1);
    }
    if(time2){
        clearTimeout(time2);
    }
    if(time3){
        clearTimeout(time3);
    }
    if(time4){
        clearTimeout(time4);
    }
    if(time5){
        clearTimeout(time5);
    }
    if(time6){
        clearTimeout(time6);
    }
    if(time7){
        clearTimeout(time7);
    }
    //停止动画
    $('#span1-1').stop(true);
    $('.tianzikuang2').stop(true);
    $('.final2>img').stop(true);
    $('#span2-1').stop(true);
    $('.tianzikuang2').css('opacity','0');
    $('.final2').find('img').css('opacity','0');
    $('#step2').css('margin-top','200px');

    $('#box1').removeClass('ui-state-highlight');
    $('#box2').removeClass('ui-state-highlight');

    $('.box-word').find('span').css({"left":"0","bottom":"0"});

    if($('.final1').find('img').length>=1){
        $('.final1').find('img').eq(1).remove();
        $('.final1').removeClass('zajiao');
        $('.final1').find('img').eq(0).css('left','0');
    }
    $('.final1').css('visibility','hidden');

    $('.fixed-D').find('span').css('opacity',0);
    $('.fixed-d').find('span').css('opacity',0);
    $('.L-l').css({"left":"-140px","opacity":"0"});
    $('.L-r').css({"left":"-400px","opacity":"0"});
    $('.T-t').css({"top":"-75px","opacity":"0"});
    $('.T-b').css({"top":"-175px","opacity":"0"});

    $('.fixed-D1').css({"top":"-385px","opacity":"0"});
    $('.fixed-D2').css({"top":"-485px","opacity":"0"});
    $('.fixed-d1').css({"top":"-310px","left":"410px","opacity":"0"});
    $('.fixed-d2').css({"top":"-310px","left":"100px","opacity":"0"});

    if($('#box1').find('span').text()=='ddd'){
        $('.fixed-D1').css({"left":"510px"});
        $('.fixed-D2').css({"left":"510px"});
        $('.fixed-d1').css({"left":"-100px"});
        $('.fixed-d2').css({"left":"-410px"});
    }

    $('.tianzikuang2 .fixed-L1').css({"top":"-250px","opacity":"0"});
    $('.tianzikuang2 .fixed-L2').css({"top":"-350px","opacity":"0"});
    $('.tianzikuang2 .fixed-T1').css({"top":"-200px","left":"400px","opacity":"0"});
    $('.tianzikuang2 .fixed-T2').css({"top":"-200px","left":"100px","opacity":"0"});

    $('#step1').show();
    $('.accept-box').show();
    $('.final1').show();
    if(t==1){
        $('.geneImg').css('visibility','visible');
    }
    else{
        //点击切换回子一代 不执行的操作
        $('.tianzikuang').css('visibility','hidden');
        $( "#box1" ).droppable({ accept: ".gene-img" });
        $( "#box2" ).droppable({ accept: ".gene-img" });
        $( "#img1" ).css('pointer-events','auto');
        $( "#img2" ).css('pointer-events','auto');
        $('.geneImg').css('visibility','visible');
        $('.button-list').css('display','none');
        $('.img-word').css('visibility','visible');
        $('#img1').css({'left':0,'top':0});
        $('#img2').css({'left':0,'top':0});
        $('#box1').find('span').text('');
        $('#box2').find('span').text('');
        $('#img1').css('visibility','visible');
        $('#img2').css('visibility','visible');
        $('.box-img11').css('display','none');
        $('.box-img12').css('display','none');
        $('.box-img21').css('display','none');
        $('.box-img22').css('display','none');
    }
    callback&&callback();


}
if(isMob){
    $('#btn1').on('touchstart',ll1);
    $('#btn3').on('touchstart',ll2);
    $('.reset').on('touchstart',reset);
}else{
	$('#btn1').on('click',ll1);
    $('#btn3').on('click',ll2);
    $('.reset').on('click',reset);
}

function ll1(){
    if(game2==true){
        if(isOver){
            return;
        }
        reset(1,function(){
            $('#btn1').css('display','none');
            $('#btn2').css('display','block');
            time8=setTimeout(function(){
                choose(1);
                clearTimeout(time8);
            },500);
        });
    }else{
        choose(1);
    }

}
function ll2(){
    if(game1==false){
        return;
    }else{
        $('#btn1').css('display','block');
        $('#btn2').css('display','none');
        game2=true;
        isOver=true;
        choose(2);
    }
};

