//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});
// var img=new Image();
// img.src='image/xibao.svg';
var height=window.innerHeight;
$('#main').height(height-266);
var isMob = /iPad|Android/g.test(navigator.userAgent);
var contentH=$('#main').height();
var contentW=$('#main').width();
if(contentH>contentW){
	$('#main .an').width(contentW).height(contentW*0.8);
	$('#xibao img').width(contentW).css('height','auto');
}else{
	$('#main .an').width(contentH).height(contentH*0.8);
	$('#xibao img').height(contentH*0.8).css('width','auto');
}
window.onresize=function(){
	height=window.innerHeight;
	$('#main').height(height-266);
	contentH=$('#main').height();
	contentW=$('#main').width();
	if(contentH>contentW){
		$('#main .an').width(contentW).height(contentW*0.8);
		$('#xibao img').width(contentW).css('height','auto');
	}else{
		$('#main .an').width(contentH).height(contentH*0.8);
		$('#xibao img').height(contentH*0.8).css('width','auto');
	}
	resizeF=true;
	setTimeout(function(){
		an();
	},1);
}

var index,index_old=3,S,resizeF=false;
function choose(){
	index=$(this).index()
	if(index==index_old) return;
	resizeF=false;
	$('#title p span').css({'color':'#000','background':'#fff'});
	$(this).css({'color':'#fff','background':'#5caefd'});
	// $('#xibao img').attr('src','image/xibao.svg');
	$('#main .an div').stop().css('opacity','0');
	$('#main.an').hide();
	$('#xibao').addClass('addw').addClass('add');
	clearTimeout(S);
	an();
	index_old=index;
}
function an(){
	var H=$('#main').height();
	var W=$('#main').width();
	var h=$('#xibao img').height();
	var w=$('#xibao img').width();
	var l=(W-w)/2;
	var t=(H-h)/2;
	if(index==0){
		$('#step1').show();
		$('.show').css('background-image','url(image/s1.png)');
		$('#foot').css({'backgroundImage':'url(image/1.png)','backgroundPosition':'9% 50%','backgroundSize':'50%'});
		var L=75/202*w+l;
		var T=124/160*h+t;
		$('#xibao').css('transform-origin',L+'px '+T+'px');
		if(resizeF) return;
		S=setTimeout(function(){
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
		},1000);
	}else if(index==1){
		$('#step2').show();
		$('.show').css('background-image','url(image/s2.png)');
		$('#foot').css({'backgroundImage':'url(image/2.png)','backgroundPosition':'9.6% 49%','backgroundSize':'55%'});
		var L=101/202*w+l;
		var T=143/160*h+t;
		$('#xibao').css('transform-origin',L+'px '+T+'px');
		if(resizeF) return;
		if(index_old==2){
			bb();
			return;
		}
		S=setTimeout(function(){
			bb();
		},800);
		function bb(){
			$('.b1,.b27,.b28,.b29,.b30').css({'opacity':'1'});
			$('.b4').animate({'opacity':'1'},1000);
			$('.b5').animate({'opacity':'1'},1000);
			$('.b6').animate({'opacity':'1'},1000);
			$('.b2').animate({'opacity':'1'},1000,function(){
				$('.b3').animate({'opacity':'1'},1000);
				$('.b7').animate({'opacity':'1'},1000,function(){
					$('.b8').animate({'opacity':'1'},500,function(){
						$('.b9').animate({'opacity':'1'},500,function(){
							$('.b11').animate({'opacity':'1'},500,function(){
		   						$('.b10').animate({'opacity':'1'},500,function(){
	   								$('.b12').animate({'opacity':'1'},1000,function(){
	   									$('.b16').animate({'opacity':'1'},1000,function(){
	   										$('.b13').animate({'opacity':'1'},1000);
	   										$('.b14').animate({'opacity':'1'},1000);
	   										$('.b15').animate({'opacity':'1'},1000,function(){
	   											$('.b17,.b18,.b19,.b20,.b21,.b22,.b23,.b24,.b25,.b26').animate({'opacity':'1'},1000);
	   										});
	   									});
	   								});
		   						});
		   					});
						});
					});
				});
			});
		}
	}else if(index==2){
		$('#step3').show();
		$('.show').css('background-image','url(image/s2.png)');
		$('#foot').css({'backgroundImage':'url(image/3.png)','backgroundPosition':'8.1% 48%','backgroundSize':'42%'});
		var L=101/202*w+l;
		var T=143/160*h+t;
		$('#xibao').css('transform-origin',L+'px '+T+'px');
		if(resizeF) return;
		if(index_old==1){
			aa();
			return;
		}
		S=setTimeout(function(){
			aa();
		},800);
		function aa(){
			$('.c1,.c2,.c3,.c4,.c5,.c7,.c8,.c9,.c10').css({'opacity':'1'});
			$('.c6').animate({'opacity':'1'},1000,function(){
				$('.c11').animate({'opacity':'1'},1000,function(){
					$('.c12').animate({'opacity':'1'},1000,function(){
						$('.c13').animate({'opacity':'1'},500,function(){
							$('.c14').animate({'opacity':'1'},500,function(){
								$('.c16').animate({'opacity':'1'},500,function(){
			   						$('.c15').animate({'opacity':'1'},500,function(){
		   								$('.c17').animate({'opacity':'1'},1000,function(){
		   									$('.c20').animate({'opacity':'1'},1000,function(){
		   										$('.c18').animate({'opacity':'1'},1000);
		   										$('.c19').animate({'opacity':'1'},1000);
		   									});
		   								});
			   						});
			   					});
							});
						});
					});
				});
			});
		}
	}
}
function reset(){
	index_old=3;
	resizeF=false;
	index=3;
	$('#title p span').css({'color':'#000','background':'#fff'});
	$('#foot').css({'backgroundImage':'url(image/z.png)','backgroundPosition':'5% 50%','backgroundSize':'50%'});
	$('.show').css('background-image','none');
	// $('#xibao img').attr('src','image/xibao.png');
	$('#xibao').removeClass('addw').removeClass('add');
	clearTimeout(S);
	$('#main .an div').stop().css('opacity','0');
	$('#main .an').hide();
}
if(isMob){
    $('#title p span').on('touchstart',choose);
    $('#reset img').on('touchstart',reset);
}else{
    $('#title p span').on('click',choose);
    $('#reset img').on('click',reset);
}

