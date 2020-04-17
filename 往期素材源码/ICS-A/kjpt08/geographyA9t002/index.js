//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});

//禁止选择
document.onselectstart=function(){return false;};

//判断设备类型进行缩放
var $threeCon = $('#threeContainer');
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
//初始全局变量
function reset(){
	flag=false;
    $('.ctrl span').css({'background':'#4a4a4a','borderColor':'#fff','color':'#fff'});
	$('.c>div').css({'transform':'scale(1)','zIndex':'9','boxShadow':'none'});
    $('.step1,.step2').hide();
    $('div:animated').stop();
    $('.c1,.c2,.c3').show();
    $('.c1 .c11').css({'right':'50%','left':'0'});
    $('.c2 div').css('opacity','0');
    $('.c3 div').css('opacity','0');
    $('.O img').css('opacity','0');
    $('.c1').css({'left':'0','right':'70%'});
    $('.c2').css({'left':'30%','right':'30%'});
    $('.c3').css({'left':'70%','right':'0'});
}
var flag=false;
function choose1(){
	if(flag){
		return;
	}
	flag=true;
    var thiz=this;
    set(thiz);
    a1();
}
function a1(){
    $('.c2,.c3').hide();
    $('.c1').show();
    $('.O img').stop().css('opacity','0');
    $('.c1 .c11').stop().css({'right':'50%','left':'0'});
     $('.c1').css({'transform':'scale(1.25)','zIndex':'10','boxShadow':'rgb(74, 74, 74) 0px 1px 10px 2px'}).animate({'left':'0','right':'0'},500,function(){
        $('.c1 .c11').animate({'right':'0','left':'25%'},2000,function () {
            $('.O1').animate({'opacity':'1'},500,function(){
                 $('.O2').animate({'opacity':'1'},500,function(){
                     $('.O3').animate({'opacity':'1'},500,function(){
                         $('.c1').animate({'left':'0','right':'70%'},500,function(){
                         	$('.c1').css({'transform':'scale(0.9)','boxShadow':'none'});
                         	flag=false;
                         });
                    })
                });
            });
        });
     });
}

function choose2(){
	if(flag){
		return;
	}
	flag=true;
    var thiz=this;
    set(thiz);
    a2();
}
function a2(){
    $('.c1,.c3').hide();
    $('.c2').show();
    $('.c2>div').stop().css('opacity','0');
    $('.c2').css({'transform':'scale(1.25)','zIndex':'10','boxShadow':'rgb(74, 74, 74) 0px 1px 10px 2px'}).animate({'left':'0','right':'0'},500,function (){
        $('.c2 .c21').animate({'opacity':'1'},1000,function(){
            $('.c2 .c22').animate({'opacity':'1'},1500,function(){
                $('.c2 .c23').animate({'opacity':'1'},1500,function(){
                    $('.c2 .c24').animate({'opacity':'1'},1500,function(){
                         $('.c2').animate({'left':'30%','right':'30%'},500,function(){
                         	$('.c2').css({'transform':'scale(0.9)','boxShadow':'none'});
                         	$('.c1').css({'transform':'scale(0.9)'}).show();
                         	
                         	$('.c1 .c11').css({'right':'0','left':'25%'});
            				$('.O1,.O2,.O3').css({'opacity':'1'});
                         	
                            $('.step1').show();

                         	flag=false;
                         });
                    });
                })
            })
        })
    });
}

function choose3(){
	if(flag){
		return;
	}
	flag=true;
    var thiz=this;
    set(thiz);
    a3();
}
function a3(){
    $('.c1,.c2').hide();
    $('.c3').show();
    $('.c3>div').stop().css('opacity','0');
    $('.c3').css({'transform':'scale(1.25)','zIndex':'10','boxShadow':'rgb(74, 74, 74) 0px 1px 10px 2px'}).animate({'left':'0','right':'0'},500,function (){
        $('.c3 .c31').animate({'opacity':'1'},1500,function(){
            $('.c3 .c32').animate({'opacity':'1'},1500,function(){
                $('.c3').animate({'left':'70%','right':'0'},500,function(){
                 	$('.c3').css({'transform':'scale(0.9)','boxShadow':'none'});
                 	$('.c1,.c2').css({'transform':'scale(0.9)'}).show();
                 	
                 	$('.c1 .c11').css({'right':'0','left':'25%'});
            		$('.O1,.O2,.O3').css({'opacity':'1'});
                 	
                 	$('.c2 .c21,.c2 .c22,.c2 .c23,.c2 .c24').css({'opacity':'1'});

                    $('.step1,.step2').show();
                    
                 	flag=false;
                });
            })
        })
    });
}

function set(thiz){
    $('.ctrl span').css({'background':'#4a4a4a','borderColor':'#fff','color':'#fff'});
    $(thiz).css({'background':'#f39800','borderColor':'#f39800','color':'#fff'});
    $('.c>div').css({'zIndex':'9','boxShadow':'none'});
    $('.c>.step').css('zIndex','20').hide();
}
if(isMob){
    $('.choose1').on('touchstart',choose1);
    $('.choose2').on('touchstart',choose2);
    $('.choose3').on('touchstart',choose3);
    $('.reset').on('touchstart',reset);
}else{
    $('.choose1').on('click',choose1);
    $('.choose2').on('click',choose2);
    $('.choose3').on('click',choose3);
    $('.reset').on('click',reset);
}