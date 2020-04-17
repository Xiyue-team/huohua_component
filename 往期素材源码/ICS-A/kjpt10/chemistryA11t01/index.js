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
    $('#app .title h1').css('line-height',$('#app .title h1').height()+10+'px');
    $('#app .title div span').css('line-height',$('#app .title div span').height()+'px');
}
init_();
window.onresize=function(){
    init_();
}

var s1,s2,s3,s4,s5;
function choose(){
    var index=$(this).parent().index();
    var m=Math.random();
    var thiz=this;
    var imgM=new Image();
    imgM.src='image/'+(index+1)+'g.gif?'+m;
    imgM.onload=function () {
        $(thiz).parent().css('background-image','url(image/'+(index+1)+'g.gif?'+m+')');
        if(index==0){
            s1=setTimeout(function(){
                var img1=new Image();
                img1.src='image/1m.png';
                img1.onload=function () {
                    $(thiz).parent().css('background-image','url(image/1m.png)');
                }
            },5000)
        }else if(index==1){
            s2=setTimeout(function(){
                var img2=new Image();
                img2.src='image/2m.png';
                img2.onload=function () {
                    $(thiz).parent().css('background-image','url(image/2m.png)');
                }
            },5000)
        }else if(index==2){
            s3=setTimeout(function(){
                var img3=new Image();
                img3.src='image/3m.png';
                img3.onload=function () {
                    $(thiz).parent().css('background-image','url(image/3m.png)');
                }
            },5000)
        }else if(index==3){
            s4=setTimeout(function(){
                var img4=new Image();
                img4.src='image/4m.png';
                img4.onload=function () {
                    $(thiz).parent().css('background-image','url(image/4m.png)');
                }
            },5000)
        }else if(index==4){
            s5=setTimeout(function(){
                var img5=new Image();
                img5.src='image/5m.png';
                img5.onload=function () {
                    $(thiz).parent().css('background-image','url(image/5m.png)');
                }
            },5500)
        }
    }
}
function reset(){
    clearTimeout(s1);
    clearTimeout(s2);
    clearTimeout(s3);
    clearTimeout(s4);
    clearTimeout(s5);
    $('.m1').css('background-image','url(image/1.png)');
    $('.m2').css('background-image','url(image/2.png)');
    $('.m3').css('background-image','url(image/3.png)');
    $('.m4').css('background-image','url(image/4.png)');
    $('.m5').css('background-image','url(image/5.png)');
}
if(isMob){
    $('#app .main>div>div').on('touchstart',choose)
    $('.reset').on('touchstart',reset);
}else{
    $('.reset').on('click',reset);
    $('#app .main>div>div').on('click',choose)
}

