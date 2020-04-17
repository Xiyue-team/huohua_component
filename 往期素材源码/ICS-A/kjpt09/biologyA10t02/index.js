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
    $('#app .title div span').css('line-height',$('#app .title div span').height()+'px');
    $('.ml1 h1,.ml4 h1').css('line-height',$('.ml1 h1').height()+'px');
    $('.ml2 h1').css('line-height',$('.ml2 h1').height()+'px');
}
init_();
window.onresize=function(){
    init_();
}
var texts={
    t1:'',
    t2:'',
    t3:'',
    t4:''
};
var droppableT={
    0:'黄色圆粒',
    1:'黄色圆粒',
    2:'黄色皱粒',
    3:'黄色圆粒',
    4:'黄色圆粒',
    5:'黄色皱粒',
    6:'绿色圆粒',
    7:'绿色圆粒',
    8:'绿色皱粒'
};
var resultL={
    'YYRR':'黄色圆粒',
    'YYRr':'黄色圆粒',
    'YYrr':'黄色皱粒',
    'YyRR':'黄色圆粒',
    'YyRr':'黄色圆粒',
    'Yyrr':'黄色皱粒',
    'yyRR':'绿色圆粒',
    'yyRr':'绿色圆粒',
    'yyrr':'绿色皱粒'
};
var resultT={
    'YYRR':'hy',
    'YYRr':'hy',
    'YYrr':'hz',
    'YyRR':'hy',
    'YyRr':'hy',
    'Yyrr':'hz',
    'yyRR':'ly',
    'yyRr':'ly',
    'yyrr':'lz'
};
var c1Num='',chooseMax=0,c2Num=0;
$( ".draggable" ).draggable({revert: "invalid",helper:"clone"});
$( "#droppable1" ).droppable({
    accept: ".draggable",
    drop: function( event, ui ) {
        if($('.droppableT1').text()!=''){
            return;
        }
        chooseMax++;
        for(var i=1;i<=4;i++){
            $('.droppable1'+i).text(texts['t'+i]);
        }
        $(this).css('border-color','transparent').children('div').show();
        $('.droppableT1').text(droppableT[c1Num])
    }
});
$( "#droppable2" ).droppable({
    accept: ".draggable",
    drop: function( event, ui ) {
        if($('.droppableT2').text()!=''){
            return;
        }
        chooseMax++;
        for(var i=1;i<=4;i++){
            $('.droppable2'+i).text(texts['t'+i]);
        }
        $(this).css('border-color','transparent').children('div').show();
        $('.droppableT2').text(droppableT[c1Num]);
    }
});
var c2NumChoose=[];
function choose(){
    if(chooseMax<2){
        return;
    }
    c2Num++;
    var c2NumChoose1;
    if(c2NumChoose.length==0){
        c2NumChoose1=c2Num;
    }else{
        c2NumChoose1=c2NumChoose[c2NumChoose.length-1];
        c2NumChoose.splice(c2NumChoose.length-1,1)
    }
    $(this).css({'backgroundImage':'url(image/bta.png)','color':'#fff','pointerEvents':'none'});
    var index=$(this).index();
    var dId=$(this).attr('data-id');
    if(index%2==0){
        $(this).parent('div').children().eq(index+1).css({'opacity':'0.6','pointerEvents':'none'});
    }else{
        $(this).parent('div').children().eq(index-1).css({'opacity':'0.6','pointerEvents':'none'});
    }
    $('.a'+c2NumChoose1).text($(this).text()).attr('data-i',dId).show();
    if(c2Num==4){
        var result=[];
        for(var i=0;i<4;i++){
           result.push($('.mr3>div>div').eq(i).text());
        }
        var st1=sortY1(result);
        var st2=sortY2(result);
        var st3=sortR1(result);
        var st4=sortR2(result);
        var st=st1+st2+st3+st4;
        $('.jyResult').text(st);
        $('.mr4>div>span').text(resultL[st]);
        $('.mr4>div').css({"backgroundImage":"url(image/"+resultT[st]+".png)"});
    }
}
function sortY1(r){
    var newResult=[];
    for(i in r){
        if(r[i]=='Y'){
            newResult.push(r[i]);
        }
    }
    var result=newResult.join('');
    return result;
}
function sortY2(r){
    var newResult=[];
    for(i in r){
        if(r[i]=='y'){
            newResult.push(r[i]);
        }
    }
    var result=newResult.join('');
    return result;
}
function sortR1(r){
    var newResult=[];
    for(i in r){
        if(r[i]=='R'){
            newResult.push(r[i]);
        }
    }
    var result=newResult.join('');
    return result;
}
function sortR2(r){
    var newResult=[];
    for(i in r){
        if(r[i]=='r'){
            newResult.push(r[i]);
        }
    }
    var result=newResult.join('');
    return result;
}
function unchoose(){
    c2Num--;
    if(c2Num==0){
        c2NumChoose=[];
    }else{
        c2NumChoose.push($(this).index()+1);
    }
    $('.jyResult').text('');
    $('.mr4>div>span').text('');
    $('.mr4>div').css({'backgroundImage':'none'});
    var i=$(this).attr('data-i')-1;
    $('.drop div').eq(i).css({'opacity':'1','pointerEvents':'auto','backgroundImage':'url(image/bt.png)','color':'#3B4852'});
    if(i%2==0){
        $('.drop div').eq(i+1).css({'opacity':'1','pointerEvents':'auto'});
    }else{
        $('.drop div').eq(i-1).css({'opacity':'1','pointerEvents':'auto'});
    }
    $(this).text('').removeAttr('data-i').hide();
} 
function reset(){
    $('.drop').css('border-color','#ccc').children('div').text('').css({'backgroundImage':'url(image/bt.png)','color':'#3B4852','opacity':'1','pointerEvents':'auto'}).hide();
    $('.droppableT').text('');
    $('.mr3>div>div').text('').removeAttr('data-i').hide();
    $('.jyResult').text('');
    $('.mr4>div>span').text('');
    $('.mr4>div').css({'backgroundImage':'none'});
    c2Num=0;
    c2NumChoose=[];
    chooseMax=0;
}
function tText(){
    var v=$(this).text();
    c1Num=$(this).index();
    texts.t1=v.charAt(0);
    texts.t2=v.charAt(1);
    texts.t3=v.charAt(2);
    texts.t4=v.charAt(3);
}
if(isMob){
    $( ".draggable").on('touchstart',tText);
    $('.drop div').on('touchstart',choose);
    $('.reset').on('touchstart',reset);
    $('.mr3>div>div').on('touchstart',unchoose);
}else{
    $( ".draggable").on('mousedown',tText);
    $('.drop div').on('click',choose);
    $('.reset').on('click',reset);
    $('.mr3>div>div').on('click',unchoose);
}

