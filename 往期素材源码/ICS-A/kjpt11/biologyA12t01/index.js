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
var width=window.innerWidth;
$('#main').height(height-120);
$('#bg').height(height-120-width*0.06);
// $('#main div').height(height-120-$('#main').width()*0.1);
// var w=$('#main div').width();
// var h=$('#main div').height();
// var imgW,imgH;
// if(w/h>810/616){
//     imgH=h;
//     imgW=h/616*810;
// }else{
//     imgW=w;
//     imgH=w/810*616;
// }
// $('#main #div1 img').width(imgW).height(imgH);
// $('#main #div1 #Btn').width(imgW*270/810).height(imgH);
window.onresize=function(){
	height=window.innerHeight;
	$('#main').height(height-120);
    width=window.innerWidth;
    $('#bg').height(height-120-width*0.06);
    // $('#main div').height(height-120-$('#main').width()*0.1);
    // w=$('#main div').width();
    // h=$('#main div').height();
    // if(w/h>810/616){
    //     imgH=h;
    //     imgW=h/616*810;
    // }else{
    //     imgW=w;
    //     imgH=w/810*616;
    // }
    // $('#main #div1 img').width(imgW).height(imgH);
    // $('#main #div1 #Btn').width(imgW*270/810).height(imgH);
}

var isMob = /iPad|Android/g.test(navigator.userAgent);
var chooseNum=0;
function choose(){
    // $('#main #div1 img,#main #div2').stop();
	$('#title p span').css({'color':'#000','background':'#fff'});
	$(this).css({'color':'#fff','background':'#5caefd'});
    // $('#main #div2').css({'opacity':'0'});
	var index=$(this).index()+2;
    if(chooseNum==index) return;
    var img=new Image();
    img.src='image/0'+index+'.png';
    img.onload=function(){
        // $('#main #div1 img').attr('src',img.src);
        // var left= ($('#main').width()-imgW)/2+240/810*imgW;
        // $('#main #div1 img').css({'left':left+'px','right':'auto'});
        // $('#main #div1 #Btn').show();
        // chooseNum=index;
        // startAF=false;
        $('#main #bg').css('background-image','url('+img.src+')');
    }
}
// var startAF=false;
// function startA(){
//     if(chooseNum==0||startAF) return;
//     startAF=true;
//     $('#main #div1 img').animate({'left':'0px','right':'0px'},1000,function(){
//         var img=new Image();
//         img.src='image/c'+chooseNum+'_1.png';
//         img.onload=function(){
//             $('#main #div2').css({'backgroundImage':'url('+img.src+')','opacity':'0'}).animate({'opacity':'1'},2000);
//             $('#main #div1 #Btn').hide();
//         }
//     });
// }
function reset(){
    // $('#main #div1 img,#main #div2').stop();
    // $('#main #div1 #Btn').hide();
	$('#title p span').css({'color':'#000','background':'#fff'});
    // $('#main #div2').css({'opacity':'0'});
    chooseNum=0;
    var img=new Image();
    img.src='image/01.png';
    img.onload=function(){
        // $('#main #div1 img').attr('src',img.src);
        // $('#main #div1 img').css({'left':'0px','right':'0px'});
        // startAF=false;
        $('#main #bg').css('background-image','url('+img.src+')');
    }
    
}
if(isMob){
    $('#title p span').on('touchstart',choose);
    // $('#main #div1 #Btn').on('touchstart',startA);
    $('#reset img').on('touchstart',reset);
}else{
    $('#title p span').on('click',choose);
    // $('#main #div1 #Btn').on('click',startA);
    $('#reset img').on('click',reset);
}

