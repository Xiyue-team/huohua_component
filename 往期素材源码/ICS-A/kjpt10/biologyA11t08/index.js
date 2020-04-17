//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});
var isMob = /iPad|Android/g.test(navigator.userAgent);
var height=window.innerHeight;
var h=parseInt($('#ctrl').css('top'))+343;
var W=$('#main_right').width()*0.74;
var H=(height-h)*0.6;
if(W>height-h){
	$('#main_right .show').height(H*0.9).width(H).css('bottom',(height-h-H*0.9)/2+'px');
}else{
	$('#main_right .show').height(W*0.9).width(W).css('bottom',(height-h-W*0.9)/2+'px');
}

var contentH=$('.content').height();
var contentW=$('.content').width();
if(contentH>contentW/2){
	$('#main_left .content img').css({'width':contentW/2*0.8+'px','height':'auto'});
}else{
	$('#main_left .content img').css({'width':'auto','height':contentH*0.8+'px'});
}
if(contentH>contentW){
	$('#main_left .an').width(contentW*0.65).height(contentW*0.65);
}else{
	$('#main_left .an').width(contentH*0.65).height(contentH*0.65);
}
window.onresize=function(){
	height=window.innerHeight;
	h=parseInt($('#ctrl').css('top'))+343;
	W=$('#main_right').width()*0.74;
	H=(height-h)*0.6;
	if(W>height-h){
		$('#main_right .show').height(H*0.9).width(H).css('bottom',(height-h-H*0.9)/2+'px');
	}else{
		$('#main_right .show').height(W*0.9).width(W).css('bottom',(height-h-W*0.9)/2+'px');
	}
	contentH=$('.content').height();
	contentW=$('.content').width();
	if(!choose_ed){
		if(contentH>contentW/2){
			$('#main_left .content img').css({'width':contentW/2*0.8+'px','height':'auto'});
		}else{
			$('#main_left .content img').css({'width':'auto','height':contentH*0.8+'px'});
		}
		return;
	}else if(!step_ed){
		return;
	}
	if(contentH>contentW){
		$('#main_left .an').width(contentW*0.65).height(contentW*0.65);
	}else{
		$('#main_left .an').width(contentH*0.65).height(contentH*0.65);
	}
	$('#content1').removeClass('addw').removeClass('add1');
	$('#content2').removeClass('addw').removeClass('add2');
	resizeF=true;
	setTimeout(function(){
		an();
	},1);
}
var choose_index,choose_index_old=2,choose_ed=false,step_ed=false,index,S,resizeF=false;
function choose(){
	choose_index=$(this).index();
	if(choose_index_old==choose_index){
		return;
	}
	$('#main_left .an').hide();
	$('.content img,#main_left .an div').stop();
	$('#main_left .an div').css('opacity','0');
	clearTimeout(S);
	step_ed=false;
	resizeF=false;
	contentH=$('.content').height();
	contentW=$('.content').width();
	if(choose_index==0){
		$('#content1').css('z-index','666');
		$('#content2').css('z-index','555');
		$('#content2 img').css('height','auto');
		$('#gs').css('background-size','80%');
		if(contentH>contentW){
			$('#content1 img').css('height','auto');
			$('#content1 img').animate({'width':'60%','top':'0','right':'0','left':'0','bottom':'0'},500);
		}else{
			$('#content1 img').css('width','auto');
			$('#content1 img').animate({'height':'60%','top':'0','right':'0','left':'0','bottom':'0'},500);
		}
		$('#content2 img').animate({'width':'12%','left':'82%','right':'8%','top':'80%','bottom':'15%'},500);
	}else{
		$('#content2').css('z-index','666');
		$('#content1').css('z-index','555');
		$('#content1 img').css('height','auto');
		$('#gs').css('background-size','72%');
		if(contentH>contentW){
			$('#content2 img').css('height','auto');
			$('#content2 img').animate({'width':'60%','top':'0','right':'0','left':'0','bottom':'0'},500);
		}else{
			$('#content2 img').css('width','auto');
			$('#content2 img').animate({'height':'60%','top':'0','right':'0','left':'0','bottom':'0'},500);
		}
		$('#content1 img').animate({'width':'12%','left':'82%','right':'8%','top':'80%','bottom':'15%'},500);
	}
	$('#gs').css('background-image','url(image/s'+(choose_index+1)+'.png)');
	$('#step,.content,#gs').show();
	// $('#content1 img').attr('src','image/jm.png');
	// $('#content2 img').attr('src','image/rsj.png');
	$('#content1').show().removeClass('addw').removeClass('add1');
	$('#content2').show().removeClass('addw').removeClass('add2');
	$('.show').hide();
	choose_index_old=choose_index;
	var T=$('#content1').height();
   	var L=$('#content1').width();
	choose_ed=true;
	$('#choose div').css({'color':'#000','background':'#fff'});
	$(this).css({'color':'#fff','background':'#5caefd'});
	$('#step>div span').css('background','#f0f0f0');
}
function step(){
	step_ed=true;
	resizeF=false;
	$('.content img,#main_left .an div').stop();
	$('#main_left .an div').css('opacity','0');
	clearTimeout(S);
	$('#main_left .an').hide();
	$('#step>div span').css('background','#f0f0f0');
	$(this).children('span').css('background','#5caefd');
	$(this).children('span').children().css('background','#fff');
	index=$(this).index();
	var T=$('#content1').height();
   	var L=$('#content1').width();
	var img=new Image();
	img.src='image/suolue'+(choose_index+1)+'_'+(index+1)+'.png';
	img.onload=function(){
		$('.show').css('background-image','url('+img.src+')');
		$('.show').show();
	}
	an();
}
function an(){
	var left,top;
	var H=$('#content1').height();
	var W=$('#content1').width();
	if(choose_index==0){
		var h=$('#content1 img').height();
		var w=$('#content1 img').width();
		var l=(W-w)/2;
		var t=(H-h)/2;
		// $('#content1 img').attr('src','image/jm.svg');
		$('#content1').show().addClass('addw').addClass('add1');
		$('#content2').hide().removeClass('addw').removeClass('add2');
		if(index==0){
			var L=40/205*w+l;
	   		var T=130/220*h+t;
	   		$('#content1').css('transform-origin',L+'px '+T+'px');
	   		$('#gs').css({'background-image':'url(image/s1_'+(index+1)+'.png)','background-size':'55%'});
	   		if(resizeF) return;
	   		S=setTimeout(function(){
	   			$('#step1_1').show();
	   			$('.a1').css({'opacity':'1'});
	   			$('.a2').animate({'opacity':'1'},1000,function(){
	   				$('.a3').animate({'opacity':'1'},1000,function(){
	   					$('.a4').animate({'opacity':'1'},500,function(){
	   						$('.a5').animate({'opacity':'1'},500,function(){
	   							$('.a7').animate({'opacity':'1'},500,function(){
	   								$('.a6').animate({'opacity':'1'},500,function(){
   										$('.a8').animate({'opacity':'1'},1000,function(){
   											$('.a9').animate({'opacity':'1'},1000);
					   						$('.a10').animate({'opacity':'1'},1000,function(){
				   								$('.a11,.a12,.a13,.a14,.a15,.a16').animate({'opacity':'1'},1000);
					   						});
					   					});
	   								});
	   							});
	   						});
	   					});
	   				});
	   			});
	   		},1000)
		}else{
			var L=80/205*w+l;
	   		var T=187/220*h+t;
	   		$('#content1').css('transform-origin',L+'px '+T+'px');
	   		$('#gs').css({'background-image':'url(image/s1_'+(index+1)+'.png)','background-size':'55%'});
	   		if(resizeF) return;
	   		S=setTimeout(function(){
	   			$('#step1_2').show();
	   			$('.b1').css({'opacity':'1'});
	   			$('.b5').animate({'opacity':'1'},1000);
	   			$('.b6').animate({'opacity':'1'},1000);
	   			$('.b4').animate({'opacity':'1'},1000,function(){
	   				$('.b2').animate({'opacity':'1'},1000);
   					$('.b3').animate({'opacity':'1'},1000,function(){
   						$('.b7').animate({'opacity':'1'},1000);
						$('.b8').animate({'opacity':'1'},1000,function(){
	   						$('.b9,.b10').animate({'opacity':'1'},1000);
	   					});
   					});
	   			});
	   		},1000);
		}
	}else{
		var h=$('#content2 img').height();
		var w=$('#content2 img').width();
		var l=(W-w)/2;
		var t=(H-h)/2;
		// $('#content2 img').attr('src','image/rsj.svg');
		$('#content2').show().addClass('addw').addClass('add2');
		$('#content1').hide().removeClass('addw').removeClass('add1');
		if(index==0){
			var L=90/202*w+l;
	   		var T=55/254*h+t;
	   		$('#content2').css('transform-origin',L+'px '+T+'px');
	   		$('#gs').css({'background-image':'url(image/s2_'+(index+1)+'.png)','background-size':'55%'});
	   		if(resizeF) return;
	   		S=setTimeout(function(){
	   			$('#step1_1').show();
	   			$('.a1').css({'opacity':'1'});
	   			$('.a2').animate({'opacity':'1'},1000,function(){
	   				$('.a3').animate({'opacity':'1'},1000,function(){
	   					$('.a4').animate({'opacity':'1'},500,function(){
	   						$('.a5').animate({'opacity':'1'},500,function(){
	   							$('.a7').animate({'opacity':'1'},500,function(){
	   								$('.a6').animate({'opacity':'1'},500,function(){
   										$('.a8').animate({'opacity':'1'},1000,function(){
   											$('.a9').animate({'opacity':'1'},1000);
					   						$('.a10').animate({'opacity':'1'},1000,function(){
				   								$('.a11,.a12,.a13,.a14,.a15,.a16').animate({'opacity':'1'},1000);
					   						});
					   					});
	   								});
	   							});
	   						});
	   					});
	   				});
	   			});
	   		},1000)
		}else{
			var L=145/202*w+l;
	   		var T=75/254*h+t;
	   		$('#content2').css('transform-origin',L+'px '+T+'px');
	   		$('#gs').css({'background-image':'url(image/s2_'+(index+1)+'.png)','background-size':'50%'});
	   		if(resizeF) return;
			S=setTimeout(function(){
	   			$('#step2_2').show();
	   			$('.c1').css({'opacity':'1'});
	   			$('.c6').animate({'opacity':'1'},1000);
	   			$('.c5').animate({'opacity':'1'},1000);
	   			$('.c4').animate({'opacity':'1'},1000,function(){
	   				$('.c2').animate({'opacity':'1'},1000);
   					$('.c3').animate({'opacity':'1'},1000,function(){
						$('.c7').animate({'opacity':'1'},1000,function(){
	   						$('.c8').animate({'opacity':'1'},1000);
	   					});
   					});
	   			});
	   		},1000)
		}
	}
}
function reset(){
	choose_ed=false;
	step_ed=false;
	resizeF=false;
	$('#choose div').css({'color':'#000','background':'#fff'});
	$('#step>div span').css('background','#f0f0f0');
	choose_index_old=2;
	$('#step,.show,#gs,#main_left .an').hide();
	// $('#content1 img').attr('src','image/jm.png');
	// $('#content2 img').attr('src','image/rsj.png');
	$('#content1').show().removeClass('addw').removeClass('add1');
	$('#content2').show().removeClass('addw').removeClass('add2');
	contentH=$('.content').height();
	contentW=$('.content').width();
	if(contentH>contentW/2){
		$('#main_left .content img').css({'width':contentW/2*0.8+'px','height':'auto'});
	}else{
		$('#main_left .content img').css({'width':'auto','height':contentH*0.8+'px'});
	}
	$('#main_left #content1 img').css({'top':'15%','left':'8%','right':'auto','bottom':'auto'});
	$('#main_left #content2 img').css({'top':'auto','right':'8%','left':'auto','bottom':'10%'});
	$('.content img').stop();
	$('#main_left .an div').stop().css('opacity','0');
	clearTimeout(S);
}
if(isMob){
	$('#choose div').on('touchstart',choose);
	$('#step>div').on('touchstart',step);
    $('#reset img').on('touchstart',reset);
}else{
	$('#choose div').on('click',choose);
	$('#step>div').on('click',step);
    $('#reset img').on('click',reset);
}

