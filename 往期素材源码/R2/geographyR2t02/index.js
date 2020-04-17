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
var wWidth=window.innerWidth;
var wHeight=window.innerHeight;
var zoom=1;
if(wHeight<580){
    zoom=0.8;
    $('#main_right').css('zoom',zoom);
}
$('#main_left').width(wWidth-280*zoom);
window.onresize=function(){
    wWidth=window.innerWidth;
    wHeight=window.innerHeight;
    if(wWidth<=580) wWidth=580;
    if(wHeight<580){
        zoom=0.8;
        $('#main_right').css('zoom',zoom);
    }else{
        zoom=1;
        $('#main_right').css('zoom',zoom);
    }
    $('#main_left').width(wWidth-280*zoom);
}

var index,checked=false,chooseI=1;

function step(){
	$('#step>div span').css('background','#f0f0f0');
	$(this).children('span').css('background','#5caefd');
	var index=$(this).index()+1;
	chooseI=index;
	if(checked){
        imgLoad('image/'+index+''+index+'.png',function (src) {
            $('#show').attr('src',src);
        });

	}else{
        imgLoad('image/'+index+'.png',function (src) {
            $('#show').attr('src',src);
        });
	}
}
function reset(){
	chooseI=1;
	checked=false;
	$('#step>div span').css('background','#f0f0f0');
	$('#step1>span').css('background','#5caefd').children().css('background','#fff');
	$('#check>span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
    imgLoad('image/1.png',function (src) {
        $('#show').attr('src',src);
    });
}
function check(){
	if(checked){
		$(this).children('span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
		checked=false;
		if(chooseI==1){
            imgLoad('image/1.png',function (src) {
                $('#show').attr('src',src);
            });
		}else{
            imgLoad('image/2.png',function (src) {
                $('#show').attr('src',src);
            });
		}
	}else{
		$(this).children('span').css('background','#5CAEFD').children().css({'right':'2px','left':'auto'});
		checked=true;
		if(chooseI==1){
            imgLoad('image/11.png',function (src) {
                $('#show').attr('src',src);
            });
		}else{
            imgLoad('image/22.png',function (src) {
                $('#show').attr('src',src);
            });
		}
	}
}

function imgLoad(src, callback) {
	var img = new Image();
	img.src = src;
	img.onload = function () {
		callback && callback(img.src);
	}
}

if(isMob){
	$('#check').on('touchstart',check);
	$('#step>div').on('touchstart',step);
    $('#reset img').on('touchstart',reset);
}else{
	$('#check').on('click',check);
	$('#step>div').on('click',step);
    $('#reset img').on('click',reset);
}

