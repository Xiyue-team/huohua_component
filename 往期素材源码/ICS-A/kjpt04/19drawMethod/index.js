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
var scale = 1;
var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
if(!(bodyWidth == 370 && bodyHeight == 246)){
    var isMob = /iPad|Android/g.test(navigator.userAgent);
    var $body = $("body");
    // if(isMob){
        var bodyScale = scale = bodyWidth/1920;
        $('.body').css("zoom",bodyScale).height(1200);
        var marginTop = ($body.width()/bodyWidth*bodyHeight-1200)/2;
        $('.body').css("margin-top",'-600px');
        $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale + (bodyHeight-1200*scale)/2 ),bottom:(69*scale + (bodyHeight-1200*scale)/2 )});
        $(".threeControl").css({"zoom":bodyScale/0.7,"right":30*bodyScale,"bottom":30*bodyScale});
    // }else{
    //     scale = 0.6667;
    //     $(".body").css({"zoom":0.6667,"margin-top":'0',"top":'0'});
    //     $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale ),bottom:(69*scale)});
    // }
    $('.zoom').css("zoom",scale);
    $('body').css('background','#000');
}
$('.pageDiv').css({'top':120*scale,'bottom':140*scale});
$('.picTitle').css('line-height',$('.picTitle').height()+'px');
var cirle_w=$('.cirle').width();
$('.cirle').css({height:cirle_w+'px',lineHeight:cirle_w+'px',backgroundSize:(cirle_w-1)+'px '+(cirle_w-1)+'px'})

window.onresize=function(){
    cirle_w=$('.cirle').width();
    $('.cirle').css({height:cirle_w+'px',lineHeight:cirle_w+'px',backgroundSize:(cirle_w-1)+'px '+(cirle_w-1)+'px'})
}

// 控件区垂直居中居中
var controlHeight = $("#controlContainer").height();
var conHeight = $(".con").height();
var h2Height = $("#controlContainer h2").height();
var h2MarginTop = parseInt($("#controlContainer h2").css("margin-top"));
var marginTop = (controlHeight - h2Height - h2MarginTop - conHeight - 100)/2;
$(".con").css("margin-top",marginTop);

var flag1,value2_old=0,flag,value1,value2;
//滑动事件
$("#slider1").change(function(){
    $('.picContent ul').empty();
    cirle=$('.cirle').clone();
    var val = $(this).val().split(";");
    value2 = parseInt(val[1]);
    if(value2_old!=value2){
        if(value2_old<value2){
            flag1=true;
        }else{
            flag1=false;
        }
        value2_old=value2;
        cirle.attr('class','cirle'+value2);
        cirle.html(value2);
        if(flag1){
        	$('#cirle')[0].appendChild(cirle[0]);
            cirle_in(value2);
        }else{
            cirle_out(value2+1);
        }
    }
    value1=parseInt(val[0]);
    if(value1!=0){
        flag=true;
        $('.dynamic').removeClass('on');
    }else{
        flag=false;
        $('.dynamic').addClass('on');
    }
    if(value1>=value2){
    	var l=parseInt($('.xdsoft_range2dslider_runner0').css('left'));
        l-=6.4*(value1-value2);
        $('.xdsoft_range2dslider_runner0').css('left',l+'px');
        value1-=value1-value2; 
    }
    if(value2<=value1){
        var l=parseInt($('.xdsoft_range2dslider_runner0').css('left'));
        l-=6.4;
        $('.xdsoft_range2dslider_runner0').css('left',l+'px');
        value1--;
    }
    $(this).range2DSlider({
        template:'horizontal',
        value:[[value1,0],[value2,0]],
        width:320,
        showLegend:false,
        round:true,
        axis:[[0,50]],
        printLabel:function(val){
            return parseInt(val[0]);
        }
    });
});
function cirle_in(cirle_num){
    var L=27;
    var t=0;
    var T=0;
    var S=setInterval(function(){
        if(T>46){
            clearInterval(S);
            return false;
        }
        t+=0.05;
        L+=0.5;
        T =1/2*10*Math.pow(t,2);
        $('.cirle'+cirle_num).css({
            left:L+'%',
            top:(17+T)+'%'
        })
    },10);
}
function cirle_out(cirle_num){
    var L=49;
    var t=2.40;
    var S=setInterval(function(){
        if(L<=27){
            clearInterval(S);
            $('.cirle'+(cirle_num)).remove();
            return false;
        }
        t-=0.05;
        L-=0.45;
        T =1/2*10*Math.pow(t,2);
        $('.cirle'+cirle_num).css({
            left:L+'%',
            top:(17+T)+'%'
        })
       
    },10);
}

//抽取事件
function getRandom(range,n){
    var arr = [];
    var num = 0;
    for(var i=0;i<n;i++){
        num = Math.floor(Math.random()*range+1);
        if(arr.indexOf(num)<0){
            arr.push(num);
        }else{
            i--;
        }
    }
    return arr;
}
function dynamic(){
	if(!flag){
        return false;
    }
    flag=false;
    var Fl=true;
    $('body').css('pointer-events','none');
    $('.picContent ul').empty();
    var arrs = getRandom(value2,value1);
    var i=0;
    var SC=setInterval(function(){
    	if(Fl){
    		Fl=false;
	        if(i>=arrs.length){
		        $('body').css('pointer-events','auto');
		        flag=true;
		        clearInterval(SC);
		        return;
		    }
	        var L=45;
	        var t=2.45;
	        $('.cirle').html(arrs[i])
	        var S=setInterval(function(){
	            t-=0.05;
	            L+=2;
	            T=1/2*10*Math.pow(t,2);
	            $('.cirle').css({
	                left:L+'%',
	                top:(10+T)+'%'
	            });
	            if(L>=95){
	                clearInterval(S);
	                var li=document.createElement('li');
	                $('.picContent ul')[0].appendChild(li);
	                $(li).html(arrs[i]);
	                var w=$('.picContent ul').width();
	                var W=Math.floor((w-1-w%6)/6);
	                $(li).css({width:W+'px',height:W+'px',lineHeight:W+'px',backgroundSize:W*0.7+'px',backgroundRepeat:'no-repeat',backgroundPosition:'center'})
	                $('.cirle').css({
	                    left:'27%',
	                    top:'17%'
	                });
	                i++;
	                Fl=true;
	            }
	        },10); 
        }
    },50);
}
function renew(){
   $('.dynamic').addClass('on');
   $('.picContent ul').empty();
   value2_old=0;
   $('#slider1').range2DSlider({
        template:'horizontal',
        value:[[0,0],[0,0]],
        width:320,
        showLegend:false,
        round:true,
        axis:[[0,50]],
        printLabel:function(val){
            return parseInt(val[0]);
        }
    });
}
var fullScreen=0;
function scalef(){
	if(fullScreen){
        fullScreen = 0;
        $('#scale img').attr('src','images/icon/all.png');
        if(isMob){
            $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale + (bodyHeight-1200*scale)/2 ),bottom:(69*scale + (bodyHeight-1200*scale)/2 )});
        }else{
            $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale ),bottom:(69*scale)});
        }
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','visible');
        $('#threeContainer').css({'border-radius':10*scale,'box-shadow': 6*scale + 'px '+6*scale +'px '+ 20*scale +'px rgba(0,0,0,0.30)' });
        $('.picTitle').css('line-height',$('.picTitle').height()+'px')
    }else{
        fullScreen = 1;
        $('#scale img').attr('src','images/icon/back.png');
        $('#threeContainer').css({'left':0,'top':0,'right':0,'bottom':0,'border-radius':'0'});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','hidden');
        $('.picTitle').css('line-height',$('.picTitle').height()+'px')
    }
}


if(isMob){
	//重置事件
	$("#renew").on('touchstart',renew);
	$(".dynamic").on('touchstart',dynamic);
	/*全屏事件*/
	$('#scale').on('touchstart',scalef);
}else{
	//重置事件
	$("#renew").on('click',renew);
	$(".dynamic").on('click',dynamic);
	/*全屏事件*/
	$('#scale').on('click',scalef);
}





