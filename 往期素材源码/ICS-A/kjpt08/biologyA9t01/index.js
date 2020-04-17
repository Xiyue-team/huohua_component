//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});
(function(){
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
    }
    init_();
    window.onresize=function(){
        init_();
    }

    var text={
        t1:{
            1:'间期',
            2:'精原细胞的体积增大，染色体复制，成为初级精母细胞。复制后的每条染色体都由两条姐妹染色单体构成。这两条姐妹染色单体由同一个着丝点连接。'
        },
        t2:{
            1:'前期',
            2:'同源染色体两两配对，四分体中的非姐妹染色单体之间经常发生缠绕，并交换一部分片段。',
            3:'<strong>同源染色体：</strong>配对的两条染色体，形状和大小一般都相同，一条来自父方，一条来自母方。<br/><strong>联会：</strong>同源染色体两两配对的现象。<br/><strong>四分体：</strong>联会后的每对同源染色体含有四条染色单体。'
        },
        t3:{
            1:'中期',
            2:'各对同源染色体排列在赤道板上，每条染色体的着丝点都附着在纺锤丝上。'
        },
        t4:{
            1:'后期',
            2:'在纺锤丝的牵引下，配对的两条同源染色体彼此分离，分别向细胞的两极移动。'
        },
        t5:{
            1:'末期',
            2:'一个初级精母细胞分裂成了两个次级精母细胞，染色体数目减少一半。'
        },
        t6:{
            1:'前期',
            2:'核膜核仁消失，染色体不复制。'
        },
        t7:{
            1:'中期',
            2:'每条染色体的着丝点都排列在赤道板上。'
        },
        t8:{
            1:'后期',
            2:'每条染色体的着丝点分裂，两条姐妹染色单体彼此分开，成为两条染色体。在纺锤丝的牵引下，这两条染色体分别向细胞的两极移动。'
        },
        t9:{
            1:'末期',
            2:'每个次级精母细胞分裂成两个精细胞。'
        }
    }
    function choose1(){
        if($('.choose_1').css('display')=='block'){
            return;
        }
        $('.choose2').css({'background':'#3a4751','borderColor':'#fff'});
        $(this).css({'background':'#f59277','borderColor':'#f59277'});
        $('.choose span').removeClass('active');
        $('.c1').addClass('active');
        $('.text1').html(text.t1[1]);
        $('.text2').html(text.t1[2]);
        $('.text').show();
        $('.index').hide();
        posText();
        $('.background').fadeOut(500,function(){
            $('.background').height('85%').css({'backgroundImage':'url(image/01.png)','backgroundSize':'auto 60%'});
            $('.choose_1').show();
            $('.choose_2').hide();
            $('.background').fadeIn(500);
        })
    }
    function choose2(){
        if($('.choose_2').css('display')=='block'){
            return;
        }
        $('.choose1').css({'background':'#3a4751','borderColor':'#fff'});
        $(this).css({'background':'#f59277','borderColor':'#f59277'});
        $('.text').show();
        $('.index').hide();
        $('.choose span').removeClass('active');
        $('.c6').addClass('active');
        $('.text1').html(text.t6[1]);
        $('.text2').html(text.t6[2]);
        posText();
        $('.background').fadeOut(500,function(){
            $('.background').height('85%').css({'backgroundImage':'url(image/06.png)','backgroundSize':'auto 90%'});
            $('.choose_2').show();
            $('.choose_1').hide();
            $('.background').fadeIn(500);
        })
    }
    function choose(){
        if($(this).hasClass('active')){
            return;
        }
        $('.choose span').removeClass('active');
        var index=$(this).attr('class');
        index=parseInt(index.substr(index.length-1,1));
        $(this).addClass('active');
        $('.text1').html(text['t'+index][1]);
        $('.text2').html(text['t'+index][2]);
        if(index==2){
            $('.text3').show().html(text['t'+index][3]);
        }else{
            $('.text3').html('').hide();
        }
        posText();
        $('.background').fadeOut(500,function(){
            $('.background').css('background-image','url(image/0'+index+'.png)');
            if(index==1||index==2||index==3){
                $('.background').css('background-size','auto 60%');
            }else if(index==4){
                $('.background').css('background-size','auto 80%');
            }else{
                $('.background').css('background-size','auto 90%');
            }
            $('.background').fadeIn(500);
        })
    }
    function reset(){
        $('.choose_1,.choose_2,.text').hide();
        $('.choose1,.choose2').css({'background':'#3a4751','borderColor':'#fff'})
        $('.background').height('100%').css({'backgroundImage':'url(image/Group.png)','backgroundSize':'contain'});
        $('.index').show();
    }
    function posText(){
        var h=parseInt($('.text1').height())+parseInt($('.text2').height())+parseInt($('.text3').height())+6*20;
        $('.text').height(h)
        $('.text').css('margin-top',($('.main_left').height()-h)/2+'px')
    }
    if(isMob){
        $('.choose1').on('touchstart',choose1)
        $('.choose2').on('touchstart',choose2)
        $('.reset').on('touchstart',reset)
        $('.choose span').on('touchstart',choose)
    }else{
        $('.choose1').on('click',choose1)
        $('.choose2').on('click',choose2)
        $('.reset').on('click',reset)
        $('.choose span').on('click',choose)
    }
}());

