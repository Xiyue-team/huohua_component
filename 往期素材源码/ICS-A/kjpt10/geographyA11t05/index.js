//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});
var height=window.innerHeight;
$('#main').height(height);
var L=$('#ion').width();
var l=$('#text span').width()-4;
for(var i=0;i<14;i++){
	$('#ion .ion'+i).css('left',(L/13*i-5)+'px');
}
var h=height-275;
var w=$('.left').width();
$('.showPic').width(w).height(h);
window.onresize=function(){
	height=window.innerHeight;
	$('#main').height(height);
	L=$('#ion').width();
	for(var i=0;i<14;i++){
		$('#ion .ion'+i).css('left',(L/13*i-5)+'px');
	}
    h=height-275;
    w=$('.left').width();
    $('.showPic').width(w).height(h);
};
var arrNum = [1,5,10,15,20,25,30,35,40,45,50,55,60,65],$image = $('.showPic'),timg,oldValue;

var isMob = /iPad|Android/g.test(navigator.userAgent);

$("#slider1").change(function(){
    if(timg){ clearTimeout(timg);}
    var result = parseInt($(this).val()),start=0,end,count,num;
    if(result < oldValue){
        end = arrNum[result];
        oldValue = result;
        loadImg('image/'+end+'.png',function(){
            $image.css('background-image','url(image/'+end+'.png)');
        });
        return;
    }
    if(result<=0){
        start = 1;
        end = arrNum[1];
    }else{
        start = arrNum[result-1];
        end = arrNum[result];
    }
    count = start;
    count++;

    oldValue = result;
    var setTimeFun = function(){
        timg = setTimeout(function(){
            if(count>end){
                clearTimeout(timg);
            }else{
                num = count;
                loadImg('image/'+num+'.png',function(){
                    $image.css('background-image','url(image/'+num+'.png)');
                    count++;
                    setTimeFun();
                });
            }
        },100);
    };
    setTimeFun();
});
function loadImg(src,callback){
    var img=new Image();
    img.src=src;
    img.onload=function(){
        callback && callback();
    }
}
var checked=false;
function check(){
    if(checked){
        $(this).css({'color':'#333','background':'#fff'});
        $('.right-bottom div').hide();
        checked=false;
    }else{
        $(this).css({'color':'#fff','background':'#59a8f9'});
        $('.right-bottom div').show();
        checked=true;
    }
}
function reset(){

}
if(isMob){
    $('.right-bottom span').on('touchstart',check);
    // $('#reset img').on('touchstart',reset);
}else{
    $('.right-bottom span').on('click',check);
    // $('#reset img').on('click',reset);
}

